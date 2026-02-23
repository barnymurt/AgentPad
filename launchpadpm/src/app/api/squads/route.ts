import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const squadsFile = path.join(process.cwd(), '..', 'data-sources', 'squads.json');
    const data = fs.readFileSync(squadsFile, 'utf-8');
    const squadsData = JSON.parse(data);
    
    const squads = Object.entries(squadsData.squads).map(([id, squad]: [string, any]) => ({
      id,
      ...squad,
    }));
    
    return NextResponse.json(squads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load squads' }, { status: 500 });
  }
}
