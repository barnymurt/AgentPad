import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/settings/notion?error=' + error, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/settings/notion?error=no_code', request.url));
  }

  try {
    const NOTION_CLIENT_ID = process.env.NOTION_CLIENT_ID;
    const NOTION_CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
    const NOTION_REDIRECT_URI = process.env.NOTION_REDIRECT_URI || 'http://localhost:3000/api/notion/callback';

    const credentials = Buffer.from(
      `${NOTION_CLIENT_ID}:${NOTION_CLIENT_SECRET}`
    ).toString('base64');

    const tokenResponse = await fetch('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: NOTION_REDIRECT_URI
      })
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      return NextResponse.redirect(new URL('/settings/notion?error=' + (error.error_description || 'auth_failed'), request.url));
    }

    const tokenData = await tokenResponse.json();
    const ENCRYPTION_KEY = process.env.NOTION_ENCRYPTION_KEY || 'default-dev-key-change-in-production';
    
    const crypto = require('crypto');
    const encrypt = (text: string): string => {
      const iv = crypto.randomBytes(16);
      const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return iv.toString('hex') + ':' + encrypted;
    };

    const encryptedToken = encrypt(tokenData.access_token);
    const cookieStore = await cookies();
    
    cookieStore.set('notion_access_token', encryptedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    });
    
    cookieStore.set('notion_workspace_name', tokenData.workspace_name || 'Workspace', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    });
    
    cookieStore.set('notion_workspace_id', tokenData.workspace_id || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    });

    return NextResponse.redirect(new URL('/settings/notion?success=true', request.url));

  } catch (err) {
    console.error('OAuth callback error:', err);
    return NextResponse.redirect(new URL('/settings/notion?error=callback_failed', request.url));
  }
}
