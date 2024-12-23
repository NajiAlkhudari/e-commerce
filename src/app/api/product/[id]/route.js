



import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';


export const GET = async (req, { params }) => {
  await connectDB(); 

  try {
    const { id } = await params; 

    if (!id) {
      return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid product ID' }, { status: 400 });
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ message: 'Error fetching product', error: error.message }, { status: 500 });
  }
};


export const PUT = async (req, { params }) => {
  await connectDB(); 

  try {
    const { id } = params;  

    const data = await req.json();  

    const { name, price, stock, image, description, isVisibility } = data;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid product ID' }, { status: 400 });
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    console.log('isVisibility:', isVisibility); 

    if (image) {
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (description) product.description = description;
    if (isVisibility !== undefined) product.isVisibility = isVisibility;  // Check for undefined

    console.log('Updated product:', product);

    await product.save();

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ message: 'Error updating product', error: error.message }, { status: 500 });
  }
};


export const DELETE = async (req, { params }) => {
  await connectDB(); 

  const { id } = await params; 
  
  if (!id) {
    return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
  }

  try {
    const product = await Product.findByIdAndDelete(id); 
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
  }
};