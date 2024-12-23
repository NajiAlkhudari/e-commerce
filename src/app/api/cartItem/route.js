import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CartItem from "@/models/CartItem";
import ShoppingCart from "@/models/ShoppingCart";
import Product from "@/models/Product";



export const GET = async (req) => {
  await connectDB();

  try {
    const { cartId } = req.query;

    if (!cartId) {
      return NextResponse.json({ message: "Cart ID is required" }, { status: 400 });
    }

    const cartItems = await CartItem.find({ cart_id: cartId }).populate('product_id');
    if (cartItems.length === 0) {
      return NextResponse.json({ message: "No items found in the cart" }, { status: 404 });
    }

    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json({ message: "Error fetching cart items" }, { status: 500 });
  }
};





export const POST = async (req) => {
  try {
    const { customerId, productId, quantity } = await req.json();

    let cart = await ShoppingCart.findOne({ customer_id: customerId });

    if (!cart) {
      cart = new ShoppingCart({
        customer_id: customerId,
        cart_items: [],
      });
      await cart.save();
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const existingCartItem = await CartItem.findOne({
      cart_id: cart._id,
      product_id: productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.total_price = existingCartItem.quantity * product.price; 
      await existingCartItem.save();

      return NextResponse.json(
        { message: "Product quantity updated", cartItem: existingCartItem },
        { status: 200 }
      );
    } else {
      const totalPrice = product.price * quantity;

      const newCartItem = new CartItem({
        cart_id: cart._id,
        product_id: productId,
        quantity,
        total_price: totalPrice,
      });

      await newCartItem.save();

      cart.cart_items.push(newCartItem._id);
      await cart.save();

      return NextResponse.json(
        { message: "Item added to cart", cartItem: newCartItem },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { message: "Error adding item to cart", error: error.message },
      { status: 500 }
    );
  }
};





export const DELETE = async (req) => {
  await connectDB();

  try {
    const { customer_id, product_id } = await req.json();

    if (!customer_id || !product_id) {
      return NextResponse.json({ message: "Customer ID and Product ID are required" }, { status: 400 });
    }

    const cart = await ShoppingCart.findOne({ customer_id });

    if (!cart) {
      return NextResponse.json({ message: "Shopping cart not found" }, { status: 404 });
    }

    const cartItem = await CartItem.findOne({ cart_id: cart._id, product_id });

    if (!cartItem) {
      return NextResponse.json({ message: "Product not found in shopping cart" }, { status: 404 });
    }

    cart.cart_items.pull(cartItem._id);
    await cart.save();

    await cartItem.deleteOne();

    return NextResponse.json({ message: "Product removed from shopping cart" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product from shopping cart:", error);
    return NextResponse.json({ message: "Error deleting product from shopping cart" }, { status: 500 });
  }
};




export const PUT = async (req) => {
  await connectDB();

  try {
    const { customer_id, product_id, quantity } = await req.json(); 
    if (!customer_id || !product_id || !quantity) {
      return NextResponse.json({ message: "Customer ID, Product ID, and Quantity are required" }, { status: 400 });
    }

    if (quantity <= 0) {
      return NextResponse.json({ message: "Quantity must be greater than 0" }, { status: 400 });
    }

    const cart = await ShoppingCart.findOne({ customer_id });

    if (!cart) {
      return NextResponse.json({ message: "Shopping cart not found" }, { status: 404 });
    }

    const cartItem = await CartItem.findOne({ cart_id: cart._id, product_id });

    if (!cartItem) {
      return NextResponse.json({ message: "Product not found in shopping cart" }, { status: 404 });
    }

    const product = await Product.findById(product_id);
    if (!product || isNaN(product.price) || product.price <= 0) {
      return NextResponse.json({ message: "Invalid product price" }, { status: 400 });
    }

    cartItem.quantity = quantity;
    cartItem.total_price = product.price * quantity; 
    await cartItem.save();

    return NextResponse.json({ message: "Product updated in shopping cart", cartItem }, { status: 200 });
  } catch (error) {
    console.error("Error updating product in shopping cart:", error);
    return NextResponse.json({ message: "Error updating product in shopping cart" }, { status: 500 });
  }
};


