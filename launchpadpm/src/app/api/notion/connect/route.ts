import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function getClientId(req: NextRequest): string {
  return process.env.NOTION_CLIENT_ID || req.cookies.get('notion-client-id')?.value || '';
}

function getClientSecret(req: NextRequest): string {
  return process.env.NOTION_CLIENT_SECRET || req.cookies.get('notion-client-secret')?.value || '';
}

const NOTION_REDIRECT_URI = process.env.NOTION_REDIRECT_URI || 'http://localhost:3000/api/notion/callback';
const ENCRYPTION_KEY = process.env.NOTION_ENCRYPTION_KEY || 'default-dev-key-change-in-production';

function encrypt(text: string): string {
  const crypto = require('crypto');
  const iv = crypto.randomBytes(16);
  const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text: string): string {
  const crypto = require('crypto');
  const [ivHex, encrypted] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');
  
  const NOTION_CLIENT_ID = getClientId(request);
  const NOTION_CLIENT_SECRET = getClientSecret(request);

  if (action === 'connect') {
    if (!NOTION_CLIENT_ID || !NOTION_CLIENT_SECRET) {
      return NextResponse.redirect('/settings/notion?error=credentials_required');
    }
    
    const state = Math.random().toString(36).substring(7);
    const authUrl = `https://api.notion.com/oauth2/authorize?` +
      `client_id=${NOTION_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(NOTION_REDIRECT_URI)}&` +
      `response_type=code&` +
      `owner=user&` +
      `integration_name=AgentPad&` +
      `state=${state}`;

    const cookieStore = await cookies();
    cookieStore.set('notion_oauth_state', state, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600
    });

    return NextResponse.redirect(authUrl);
  }

  if (action === 'disconnect') {
    const cookieStore = await cookies();
    cookieStore.delete('notion_access_token');
    cookieStore.delete('notion_workspace_name');
    cookieStore.delete('notion_workspace_id');
    
    return NextResponse.json({
      connected: false,
      message: 'Disconnected from Notion'
    });
  }

  if (action === 'status') {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('notion_access_token');
    const configured = !!(NOTION_CLIENT_ID && NOTION_CLIENT_SECRET);
    
    if (accessToken) {
      return NextResponse.json({
        connected: true,
        configured,
        workspaceName: cookieStore.get('notion_workspace_name')?.value || 'Workspace',
        message: 'Connected'
      });
    }
    
    return NextResponse.json({
      connected: false,
      configured,
      message: NOTION_CLIENT_ID ? 'Ready to connect' : 'Not configured'
    });
  }

  return NextResponse.json(
    { error: 'Invalid action' },
    { status: 400 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const NOTION_CLIENT_ID = getClientId(request);
    const NOTION_CLIENT_SECRET = getClientSecret(request);
    
    const body = await request.json();
    const { code, state } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code required' },
        { status: 400 }
      );
    }

    if (!NOTION_CLIENT_ID || !NOTION_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'Notion credentials not configured' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const savedState = cookieStore.get('notion_oauth_state')?.value;
    
    if (state && state !== savedState) {
      return NextResponse.json(
        { error: 'Invalid state parameter - please try again' },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { error: `Notion auth failed: ${error.error_description || 'Unknown error'}` },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();

    const encryptedToken = encrypt(tokenData.access_token);
    
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

    cookieStore.delete('notion_oauth_state');

    return NextResponse.json({
      success: true,
      connected: true,
      workspaceName: tokenData.workspace_name
    });

  } catch (error) {
    console.error('Notion connect error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to Notion' },
      { status: 500 }
    );
  }
}
