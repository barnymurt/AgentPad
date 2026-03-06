import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: skillId } = await params;
    
    const skillsDir = path.join(process.cwd(), '..', 'skills');
    const mvpSkillsFile = path.join(process.cwd(), '..', 'data-sources', 'mvp-skills.json');
    const skillDir = path.join(skillsDir, skillId);
    const skillMdPath = path.join(skillDir, 'SKILL.md');
    
    if (!fs.existsSync(skillMdPath)) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }
    
    let mvpSkills: string[] = [];
    try {
      const mvpData = fs.readFileSync(mvpSkillsFile, 'utf-8');
      mvpSkills = JSON.parse(mvpData).mvpSkills || [];
    } catch (e) {
      console.error('Error loading MVP skills:', e);
    }
    
    const content = fs.readFileSync(skillMdPath, 'utf-8');
    const metadata = parseFrontmatter(content);
    
    // Try to load examples.json
    let examples = null;
    const examplesPath = path.join(skillDir, 'examples.json');
    if (fs.existsSync(examplesPath)) {
      try {
        const examplesContent = fs.readFileSync(examplesPath, 'utf-8');
        examples = JSON.parse(examplesContent);
      } catch (e) {
        console.error('Error loading examples:', e);
      }
    }
    
    return NextResponse.json({
      id: skillId,
      name: metadata.name || skillId,
      description: metadata.description || '',
      lifecycle: metadata.lifecycle || 'build',
      category: metadata.category || 'product',
      specialization: metadata.specialization || '',
      relatedBefore: metadata.relatedBefore ? metadata.relatedBefore.split(',').map((s: string) => s.trim()) : [],
      relatedAfter: metadata.relatedAfter ? metadata.relatedAfter.split(',').map((s: string) => s.trim()) : [],
      outputSummary: metadata.outputSummary || '',
      nextSteps: metadata.nextSteps || '',
      content,
      isMvp: mvpSkills.includes(skillId),
      examples,
    });
  } catch (error) {
    console.error('Error loading skill:', error);
    return NextResponse.json({ error: 'Failed to load skill' }, { status: 500 });
  }
}

function parseFrontmatter(content: string): Record<string, string> {
  const metadata: Record<string, string> = {};
  const lines = content.split('\n');
  let inFrontmatter = false;
  
  for (const line of lines) {
    if (line.trim() === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
        continue;
      } else {
        break;
      }
    }
    
    if (inFrontmatter && line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      metadata[key.trim()] = valueParts.join(':').trim();
    }
  }
  
  return metadata;
}
