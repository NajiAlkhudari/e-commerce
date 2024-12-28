import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ShoppingCart from "@/models/ShoppingCart"; 
import CartItem from "@/models/CartItem"; 

export const GET = async (req) => {
  await connectDB();

  try {
    const url = new URL(req.url);
    const customer_id = url.searchParams.get("customer_id");


    if (!customer_id) {
      return NextResponse.json({ message: "Customer ID is required" }, { status: 400 });
    }

    const carts = await ShoppingCart.find({ customer_id })
    .select("-_id")
      .populate({
        path: "cart_items", 
        model: "CartItem",   
        select: "-cart_id -_id  -__v", 

        populate: {
          path: "product_id", 
          model: "Product", 
          select: "-stock -isVisibility  -__v", 

        },
      });

    console.log("Found carts: ", carts); 

    if (carts.length === 0) {
      return NextResponse.json({ message: "No shopping carts found for this customer" }, { status: 404 });
    }

    return NextResponse.json({ carts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching shopping carts:", error);
    return NextResponse.json({ error: `Something went wrong: ${error.message}` }, { status: 500 });
  }
};





export const POST = async (req) => {
  await connectDB();

  try {
    const { customer_id } = await req.json();

    const existingCart = await ShoppingCart.findOne({ customer_id });
    if (existingCart) {
      return NextResponse.json({ message: "Shopping cart already exists" }, { status: 400 });
    }

    const newCart = new ShoppingCart({
      customer_id,
    });
    await newCart.save();

    return NextResponse.json(newCart, { status: 201 });
  } catch (error) {
    console.error("Error creating shopping cart:", error);
    return NextResponse.json({ message: "Error creating shopping cart" }, { status: 500 });
  }
};






export const DELETE = async (req) => {
  try {
    const { customerId } = await req.json();

    const cart = await ShoppingCart.findOne({ customer_id: customerId });

    if (!cart) {
      return new Response(JSON.stringify({ message: "Cart not found" }), {
        status: 404,
      });
    }

    await CartItem.deleteMany({ cart_id: cart._id });

    await cart.deleteOne();

    return new Response(
      JSON.stringify({ message: "Shopping cart deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error deleting shopping cart", error }),
      { status: 500 }
    );
  }
};




