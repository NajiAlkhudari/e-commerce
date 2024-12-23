import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { createToken } from "@/lib/jwt";
import cookie from 'cookie';

export const POST = async (req) => {
  await connectDB();

  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = createToken(user);

    const cookieOptions = {
      httpOnly: true,  
      secure: process.env.NODE_ENV === "production",  
      sameSite: "Strict", 
      maxAge: 60 * 60 * 24, 
      path: '/', 
    };


    const res = NextResponse.json({
      message: "Login successful",
      user: { 
        id : user.id,
        name: user.name, 
        email: user.email, 
        role: user.role  
      },
      token: token
    }, { status: 200 });

    res.cookies.set('token', token, cookieOptions);

    return res;

  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { message: "Error logging in user" },
      { status: 500 }
    );
  }
};
