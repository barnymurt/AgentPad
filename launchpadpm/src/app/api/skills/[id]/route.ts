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
    
    return NextResponse.json({
      id: skillId,
      name: metadata.name || skillId,
      description: metadata.description || '',
      content,
      isMvp: mvpSkills.includes(skillId),
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
