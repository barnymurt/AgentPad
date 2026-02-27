import { NextRequest, NextResponse } from 'next/server';

const NOTION_CLIENT_ID = process.env.NOTION_CLIENT_ID;
const NOTION_CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
const NOTION_REDIRECT_URI = process.env.NOTION_REDIRECT_URI || 'http://localhost:3000/api/notion/callback';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');

  if (action === 'connect') {
    const authUrl = `https://api.notion.com/oauth2/authorize?` +
      `client_id=${NOTION_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(NOTION_REDIRECT_URI)}&` +
      `response_type=code&` +
      `owner=user&` +
      `integration_name=AgentPad`;

    return NextResponse.redirect(authUrl);
  }

  if (action === 'disconnect') {
    return NextResponse.json({
      connected: false,
      message: 'Disconnected from Notion'
    });
  }

  if (action === 'status') {
    return NextResponse.json({
      connected: false,
      configured: !!(NOTION_CLIENT_ID && NOTION_CLIENT_SECRET),
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
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code required' },
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

    return NextResponse.json({
      success: true,
      connected: true,
      workspaceName: tokenData.workspace_name,
      workspaceId: tokenData.workspace_id,
      botId: tokenData.bot_id,
      accessToken: tokenData.access_token
    });

  } catch (error) {
    console.error('Notion connect error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to Notion' },
      { status: 500 }
    );
  }
}
