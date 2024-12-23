

import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";  
export const middleware = async (req) => {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { message: "Authorization token is missing" },
      { status: 401 }
    );
  }

  try {
    // التحقق من التوكن
    const decoded = await verifyToken(token);

    // التحقق من الدور
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: You don't have the required role" },
        { status: 403 }
      );
    }

    req.user = decoded;
    return NextResponse.next();  

  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    );
  }
};

export const config = {
  matcher: ["/api/another-protected-route"],  
}
