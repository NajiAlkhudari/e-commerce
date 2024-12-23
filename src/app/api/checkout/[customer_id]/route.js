import connectDB from "@/lib/db";
import ShoppingCart from "@/models/ShoppingCart";
import CartItem from "@/models/CartItem";
import Product from "@/models/Product";
import Order from "@/models/Order";
import OrderItem from "@/models/OrderItem";

export async function POST(req, { params }) {
  const { customer_id } = params; // الحصول على معرف العميل

  try {
    console.log("Customer ID:", customer_id);

    // الاتصال بقاعدة البيانات
    await connectDB();

    // جلب عربة التسوق مع البيانات
    const cart = await ShoppingCart.findOne({ customer_id }).populate({
      path: "cart_items",
      populate: {
        path: "product_id",
        select: "name price", // جلب الحقول المطلوبة من المنتج
      },
    });

    console.log("Found Cart:", cart);

    if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
      return new Response(JSON.stringify({ message: "Cart is empty or invalid" }), { status: 400 });
    }

    // حساب المجموع الكلي
    const total_price = cart.cart_items.reduce((total, item) => {
      if (!item.product_id) {
        throw new Error(`Product data missing for cart item: ${item._id}`);
      }
      return total + item.product_id.price * item.quantity;
    }, 0);

    // إنشاء الطلب
    const newOrder = await Order.create({
      customer_id,
      total_price,
      order_date: new Date(),
      status: "processing",
      payment_status: "pending",
    });

    // إنشاء تفاصيل الطلب
    const orderItems = await Promise.all(
      cart.cart_items.map(async (item) => {
        // التأكد من حساب total_price لكل item في OrderItem
        const itemTotalPrice = item.product_id.price * item.quantity;

        return await OrderItem.create({
          order_id: newOrder._id,
          product_id: item.product_id._id,
          quantity: item.quantity,
          price: item.product_id.price,
          total_price: itemTotalPrice,  // إضافة total_price
        });
      })
    );

    // إفراغ عربة التسوق
    cart.cart_items = [];
    await cart.save();

    return new Response(
      JSON.stringify({
        message: "Checkout successful",
        order_id: newOrder._id,
        order_items: orderItems,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), {
      status: 500,
    });
  }
}
