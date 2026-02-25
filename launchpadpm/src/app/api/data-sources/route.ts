import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_SOURCES_DIR = path.join(process.cwd(), '..', 'data-sources');
const REGISTRY_FILE = path.join(DATA_SOURCES_DIR, 'registry.json');

export async function GET() {
  try {
    if (!fs.existsSync(REGISTRY_FILE)) {
      return NextResponse.json({ data_sources: [] });
    }
    
    const data = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'));
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, location, squads, authType, apiKey, username, password } = body;

    if (!name || !type) {
      return NextResponse.json(
        { error: 'Name and type are required' },
        { status: 400 }
      );
    }

    // Load existing registry
    let registry = { version: '1.0', description: '', data_sources: [], metadata: {} };
    if (fs.existsSync(REGISTRY_FILE)) {
      registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'));
    }

    // Build auth object (only store what was provided)
    const auth: Record<string, string> = {};
    if (authType && authType !== 'none') {
      auth.type = authType;
      if (apiKey) auth.apiKey = apiKey;
      if (username) auth.username = username;
      if (password) auth.password = password;
    }

    // Add new data source
    const newSource = {
      id: `ds_${Date.now()}`,
      name,
      type,
      location: location || '',
      squads: squads || [],
      auth: Object.keys(auth).length > 0 ? auth : undefined,
      created_at: new Date().toISOString(),
    };

    registry.data_sources.push(newSource);
    registry.metadata.updated_at = new Date().toISOString();

    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));

    // Return without sensitive data
    const safeSource = { ...newSource };
    delete (safeSource as any).auth;
    
    return NextResponse.json({ success: true, data_source: safeSource });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    if (!fs.existsSync(REGISTRY_FILE)) {
      return NextResponse.json({ error: 'No data sources found' }, { status: 404 });
    }

    const registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'));
    const filtered = registry.data_sources.filter((ds: any) => ds.id !== id);

    if (filtered.length === registry.data_sources.length) {
      return NextResponse.json({ error: 'Data source not found' }, { status: 404 });
    }

    registry.data_sources = filtered;
    registry.metadata.updated_at = new Date().toISOString();

    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
