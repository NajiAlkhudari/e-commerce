


import { NextResponse } from 'next/server'; 
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { middleware as jwtMiddleware } from "@/middleware"; 
import mongoose from 'mongoose';

export const GET = async (req) => {
  try {
    await connectDB(); 

    // await jwtMiddleware(req);  

    const products = await Product.find(); 
    return NextResponse.json({ products }, { status: 200 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
};




export async function PUT(request) {
  try {
    await connectDB(); 
    
    const { _id, isVisibility } = await request.json(); 

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json({ error: 'Invalid product ID.' }, { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { isVisibility },
      { new: true }  
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json({ updatedProduct }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}


