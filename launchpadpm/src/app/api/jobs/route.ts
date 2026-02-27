import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), '..', 'data-sources', 'app-db.json');

interface Job {
  id: string;
  userId: string | null;
  skillId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  input: string;
  output: string | null;
  createdAt: string;
  completedAt: string | null;
  error?: string;
}

function loadDb(): { jobs: Job[] } {
  try {
    if (fs.existsSync(DB_PATH)) {
      return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
  return { jobs: [] };
}

export async function GET() {
  try {
    const db = loadDb();
    const jobs = db.jobs
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 20)
      .map(job => ({
        id: job.id,
        skillId: job.skillId,
        status: job.status,
        input: job.input,
        createdAt: job.createdAt,
        completedAt: job.completedAt,
      }));
    
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load jobs' }, { status: 500 });
  }
}
