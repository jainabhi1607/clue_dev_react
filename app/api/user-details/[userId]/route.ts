import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UserDetails from '@/models/UserDetails';

// GET user details by userId
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await connectDB();
    const { userId } = await params;

    const userDetails = await UserDetails.findOne({ userId }).populate('userId', '-password');

    if (!userDetails) {
      return NextResponse.json(
        { success: false, error: 'User details not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: userDetails }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user details' },
      { status: 400 }
    );
  }
}
