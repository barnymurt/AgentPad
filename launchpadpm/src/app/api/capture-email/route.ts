import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createUser, getUserByEmail, getUserById, canGenerateValidationPack, getRemainingPacks, getResetTime } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    const existingUser = getUserByEmail(email);
    
    let user;
    if (existingUser) {
      user = existingUser;
    } else {
      user = createUser(email);
    }
    
    const packInfo = {
      canGenerate: canGenerateValidationPack(user),
      remaining: getRemainingPacks(user),
      resetTime: getResetTime(user),
    };
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        tier: user.tier,
      },
      validationPack: packInfo,
      message: existingUser ? 'Welcome back!' : 'Email captured successfully',
    });
  } catch (error) {
    console.error('Error capturing email:', error);
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const user = getUserById(session.user.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        tier: user.tier,
        validationPacksGenerated: user.validationPacksGenerated,
        lastValidationPackDate: user.lastValidationPackDate,
      },
      validationPack: {
        canGenerate: canGenerateValidationPack(user),
        remaining: getRemainingPacks(user),
        resetTime: getResetTime(user),
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    );
  }
}
