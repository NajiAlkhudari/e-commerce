// import connectDB from "@/lib/db";
// import Order from "@/models/Order";
// import OrderItem from "@/models/OrderItem";

// // دالة GET لجلب الطلبات بناءً على customer_id من الـ URL
// export async function GET(req, { params }) {
//   const { customer_id } = params; // الحصول على معرف العميل من الـ URL

//   // تحقق من أن الـ customer_id موجود
//   if (!customer_id) {
//     return new Response(JSON.stringify({ message: "Customer ID is required" }), { status: 400 });
//   }

//   try {
//     console.log("Customer ID:", customer_id);

//     // الاتصال بقاعدة البيانات
//     await connectDB();

//     // جلب جميع الطلبات الخاصة بالعميل
//     const orders = await Order.find({ customer_id })
//       .populate({
//         path: "order_items", // ربط عناصر الطلب
//         populate: {
//           path: "product_id", // ربط المنتج داخل عناصر الطلب
//           select: "name price image", // جلب الحقول المطلوبة من المنتج
//         },
//       });

//     if (!orders || orders.length === 0) {
//       return new Response(JSON.stringify({ message: "No orders found" }), { status: 404 });
//     }

//     return new Response(
//       JSON.stringify({ message: "Orders fetched successfully", orders }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ message: "Server error", error: error.message }), { status: 500 });
//   }
// }


import connectDB from "@/lib/db";
import Order from "@/models/Order";
import OrderItem from "@/models/OrderItem";

export async function GET(req, { params }) {
  const { customer_id } = params; // الحصول على معرف العميل من الـ URL

  // تحقق من أن الـ customer_id موجود
  if (!customer_id) {
    return new Response(JSON.stringify({ message: "Customer ID is required" }), { status: 400 });
  }

  try {
    console.log("Customer ID:", customer_id);

    // الاتصال بقاعدة البيانات
    await connectDB();

    // جلب جميع الطلبات الخاصة بالعميل
    const orders = await Order.find({ customer_id })
      .populate({
        path: "order_items", // ربط عناصر الطلب
        populate: {
          path: "product_id", // ربط المنتج داخل عناصر الطلب
          select: "name price image", // جلب الحقول المطلوبة من المنتج
        },
      });

    if (!orders || orders.length === 0) {
      return new Response(JSON.stringify({ message: "No orders found" }), { status: 404 });
    }

    // تحقق من وجود عناصر في الطلبات
    orders.forEach((order) => {
      if (order.order_items.length === 0) {
        console.log(`Order ${order._id} has no items`);
      }
    });

    return new Response(
      JSON.stringify({ message: "Orders fetched successfully", orders }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), { status: 500 });
  }
}
