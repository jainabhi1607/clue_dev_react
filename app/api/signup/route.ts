import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import UserDetails from '@/models/UserDetails';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      directorFirstName,
      directorLastName,
      contactPhone,
      contactEmail,
      abn,
      companyName,
      address,
      state,
      postcode,
      entityType,
      industryType
    } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!directorFirstName || !directorLastName || !contactPhone || !contactEmail ||
        !abn || !companyName || !address || !state || !postcode || !entityType || !industryType) {
      return NextResponse.json(
        { success: false, error: 'All business details are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with name from director's full name
    const name = `${directorFirstName} ${directorLastName}`;
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      companyName,
    });

    // Create user details record
    const userDetails = await UserDetails.create({
      userId: user._id,
      directorFirstName,
      directorLastName,
      contactPhone,
      contactEmail,
      abn: abn.replace(/\s/g, ''), // Remove spaces from ABN before saving
      companyName,
      address,
      state,
      postcode,
      entityType,
      industryType,
    });

    // Return user without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      companyName: user.companyName,
      createdAt: user.createdAt,
      details: {
        directorFirstName: userDetails.directorFirstName,
        directorLastName: userDetails.directorLastName,
        companyName: userDetails.companyName,
        abn: userDetails.abn,
        state: userDetails.state,
        entityType: userDetails.entityType,
        industryType: userDetails.industryType,
      }
    };

    return NextResponse.json(
      { success: true, data: userResponse },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
}
