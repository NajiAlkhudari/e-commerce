
import { NextResponse } from 'next/server'; 
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import fs from "fs";
import path from "path";



export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ isVisibility: 1 });
    return NextResponse.json({ products }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}




export const config = {
  api: {
    bodyParser: false, 
  },
};

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const name = formData.get("name");
//     const price = formData.get("price");
//     const stock = formData.get("stock");
//     const image = formData.get("image");
//     const description = formData.get("description");
//     const isVisibility = formData.get("isVisibility");

//     if (!name || !price || !stock || !image || !isVisibility || !description) {
//       return NextResponse.json(
//         { error: "Missing required fields." },
//         { status: 400 }
//       );
//     }

//     const dateFolder = new Date().toISOString().split("T")[0];
//     const uploadPath = path.join("./public/uploads", dateFolder);
//     fs.mkdirSync(uploadPath, { recursive: true });

//     const filename = `${Date.now()}-${Math.random() * 1e9}.jpg`;
//     const filePath = path.join(uploadPath, filename);

//     const buffer = Buffer.from(await image.arrayBuffer());
//     await fs.promises.writeFile(filePath, buffer);

//     const fileUrl = `/uploads/${dateFolder}/${filename}`;

//     const newProduct = new Product({
//       name,
//       price,
//       stock,
//       isVisibility,
//       image: fileUrl,
//     });
//     await newProduct.save();

//     return NextResponse.json({ product: newProduct }, { status: 200 });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     );
//   }
// }


export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const image = formData.get("image");
    const description = formData.get("description");
    const isVisibility = formData.get("isVisibility");

    if (!name || !price || !stock || !image || !isVisibility || !description) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const uploadPath = path.join(process.cwd(), "public", "uploads");

    fs.mkdirSync(uploadPath, { recursive: true });

    const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
    const filePath = path.join(uploadPath, filename);

    const buffer = Buffer.from(await image.arrayBuffer());
    await fs.promises.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;

    const newProduct = new Product({
      name,
      price,
      stock,
      isVisibility,
      image: fileUrl,
      description, 
    });
    await newProduct.save();

    return NextResponse.json({ product: newProduct }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
