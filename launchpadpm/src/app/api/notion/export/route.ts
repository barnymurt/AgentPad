import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { notionExportService, SquadExportData } from '@/lib/notion/export-service';
import { notionClient } from '@/lib/notion/notion-client';

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

    if (format === 'notion') {
      try {
        const createdPages = await notionClient.createPagesInSection(
          projectName,
          squadName,
          pages.map((p: any) => ({
            title: p.title,
            content: p.sections?.map((s: any) => `## ${s.heading}\n\n${s.content}`).join('\n\n') || p.content || ''
          }))
        );

        return NextResponse.json({
          success: true,
          notionUrl: createdPages[0]?.url || null,
          pagesCreated: createdPages.length,
          message: `Created ${createdPages.length} pages in Notion`
        });
      } catch (notionError) {
        console.error('Notion API error:', notionError);
        return NextResponse.json(
          { error: `Notion sync failed: ${notionError instanceof Error ? notionError.message : 'Unknown error'}` },
          { status: 500 }
        );
      }
    }

    const exportData: SquadExportData = {
      squadId,
      squadName,
      projectName,
      pages: pages.map((p: any) => ({
        title: p.title,
        content: p.sections?.map((s: any) => `## ${s.heading}\n\n${s.content}`).join('\n\n') || p.content || '',
        sections: p.sections || []
      }))
    };

    const exportDir = await notionExportService.generateExport(exportData);

    if (format === 'zip') {
      const zipPath = await notionExportService.createZipArchive(exportDir);
      
      const zipBuffer = fs.readFileSync(zipPath);
      
      return new NextResponse(zipBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${projectName.replace(/[^a-zA-Z0-9]/g, '_')}_${squadName.replace(/[^a-zA-Z0-9]/g, '_')}.zip"`
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
