import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { notionExportService, SquadExportData } from '@/lib/notion/export-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      squadId, 
      squadName, 
      projectName, 
      pages,
      format = 'zip' 
    } = body;

    if (!squadId || !squadName || !projectName) {
      return NextResponse.json(
        { error: 'Missing required fields: squadId, squadName, projectName' },
        { status: 400 }
      );
    }

    const exportData: SquadExportData = {
      squadId,
      squadName,
      projectName,
      pages: pages || []
    };

    const exportDir = await notionExportService.generateExport(exportData);

    if (format === 'zip') {
      const zipPath = await notionExportService.createZipArchive(exportDir);
      
      const zipBuffer = fs.readFileSync(zipPath);
      
      return new NextResponse(zipBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${projectName}_${squadName}.zip"`
        }
      });
    }

    return NextResponse.json({
      success: true,
      exportDir,
      message: 'Export created successfully'
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const squadId = searchParams.get('squadId');
  const squadName = searchParams.get('squadName');
  
  if (!squadId || !squadName) {
    return NextResponse.json(
      { error: 'Missing squadId or squadName' },
      { status: 400 }
    );
  }

  const templates = notionExportService.getTemplatesForSquad(squadId);
  
  return NextResponse.json({
    squadId,
    squadName,
    availablePages: templates
  });
}
