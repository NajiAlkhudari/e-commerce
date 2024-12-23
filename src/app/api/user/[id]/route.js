import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export const PUT = async (req, { params }) => {
  await connectDB();

  try {
    const { id } = params;  
    const { name, email, password } = await req.json();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  await connectDB();

  try {
    const { id } = params;  

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
  }
};




