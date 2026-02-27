import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail, updateUserPassword, getUserById, updateUserTier, type User } from '@/lib/db';
import { auth, signIn } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name, tier, userId } = body;

    switch (action) {
      case 'register': {
        if (!email || !password) {
          return NextResponse.json(
            { error: 'Email and password are required' },
            { status: 400 }
          );
        }

        const existingUser = getUserByEmail(email);
        if (existingUser) {
          return NextResponse.json(
            { error: 'User already exists' },
            { status: 400 }
          );
        }

        // In production, hash the password with bcrypt
        const user = createUser(email, {
          name: name || email.split('@')[0],
          passwordHash: password, // Hash in production!
        });

        return NextResponse.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            tier: user.tier,
          },
        });
      }

      case 'update-password': {
        if (!userId || !password) {
          return NextResponse.json(
            { error: 'User ID and password are required' },
            { status: 400 }
          );
        }

        const user = updateUserPassword(userId, password); // Hash in production!
        if (!user) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }

        return NextResponse.json({ success: true });
      }

      case 'update-tier': {
        if (!userId || !tier) {
          return NextResponse.json(
            { error: 'User ID and tier are required' },
            { status: 400 }
          );
        }

        const validTiers = ['free', 'premium', 'admin'];
        if (!validTiers.includes(tier)) {
          return NextResponse.json(
            { error: 'Invalid tier' },
            { status: 400 }
          );
        }

        const user = updateUserTier(userId, tier);
        if (!user) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            tier: user.tier,
          },
        });
      }

      case 'check-usage': {
        const session = await auth();
        if (!session?.user?.id) {
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
          tier: user.tier,
          validationsUsed: user.validationsUsed,
          skillsUsed: user.skillsUsed,
          canRunValidation: user.tier === 'premium' || user.tier === 'admin' || user.validationsUsed < 3,
          canRunSkill: user.tier === 'premium' || user.tier === 'admin' || user.skillsUsed < 3,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
      tier: session.user.tier,
    },
  });
}
