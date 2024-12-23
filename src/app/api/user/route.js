import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { createToken } from "@/lib/jwt";

export const GET = async (req) => {
  await connectDB();

  try {
    const users = await User.find();
    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  await connectDB(); 

  try {
    const { name, email, password } = await req.json(); 

    
    const sameUser = await User.findOne({ email });
    if (sameUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new User({ name, email, password });
    await newUser.save(); 
    
    const token = createToken(newUser);

    
    return NextResponse.json({ user: newUser, token }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error); 

    
    return NextResponse.json(
      {
        message: "Error creating user",
        error: error.message || "Unknown error", 
      },
      { status: 500 }
    );
  }
};
