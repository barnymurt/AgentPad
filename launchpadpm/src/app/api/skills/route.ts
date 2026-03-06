import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const skillsDir = path.join(process.cwd(), '..', 'skills');
    const mvpSkillsFile = path.join(process.cwd(), '..', 'data-sources', 'mvp-skills.json');
    
    let mvpSkills: string[] = [];
    try {
      const mvpData = fs.readFileSync(mvpSkillsFile, 'utf-8');
      mvpSkills = JSON.parse(mvpData).mvpSkills || [];
    } catch (e) {
      console.error('Error loading MVP skills:', e);
    }
    
    const skills: Array<{
      id: string;
      name: string;
      description: string;
      lifecycle?: string;
      category?: string;
      specialization?: string;
      isMvp: boolean;
    }> = [];
    
    if (fs.existsSync(skillsDir)) {
      const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const skillDir = path.join(skillsDir, entry.name);
          const skillMdPath = path.join(skillDir, 'SKILL.md');
          
          if (fs.existsSync(skillMdPath)) {
            const content = fs.readFileSync(skillMdPath, 'utf-8');
            const metadata = parseFrontmatter(content);
            
            skills.push({
              id: entry.name,
              name: metadata.name || entry.name,
              description: metadata.description || '',
              lifecycle: metadata.lifecycle || 'build',
              category: metadata.category || 'product',
              specialization: metadata.specialization || '',
              isMvp: mvpSkills.includes(entry.name),
            });
          }
        }
      }
    }
    
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error loading skills:', error);
    return NextResponse.json({ error: 'Failed to load skills' }, { status: 500 });
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
