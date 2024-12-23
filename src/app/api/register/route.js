

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { createToken } from "@/lib/jwt";

export const POST = async (req) => {
  await connectDB();

  try {
    const { name, email, password, role = "user" } = await req.json();  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed:", hashedPassword);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, 
    });

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
