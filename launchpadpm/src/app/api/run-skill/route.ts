import { NextRequest, NextResponse } from 'next/server';
import { auth, canRunValidationPack } from '@/lib/auth';
import { createJob, getJob, getUserById, incrementValidationPackCount, canGenerateValidationPack } from '@/lib/db';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const MVP_SKILLS = [
  'requirements-elicitation',
  'user-persona-creation',
  'competitor-research',
  'business-case-modeling',
  'devils-advocate',
  'feature-prioritization',
  'user-journey-mapping',
];

const VALIDATION_PACK_SKILLS = ['validation-pack'];

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    const body = await request.json();
    const { skillId, input } = body;
    
    if (!skillId || !input) {
      return NextResponse.json(
        { error: 'Missing required fields: skillId, input' },
        { status: 400 }
      );
    }
    
    const isValidationPack = VALIDATION_PACK_SKILLS.includes(skillId);
    const isMvpSkill = MVP_SKILLS.includes(skillId);
    
    if (!session?.user) {
      if (isValidationPack) {
        return NextResponse.json(
          { error: 'email_required', message: 'Please enter your email to generate a Validation Pack' },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: 'unauthorized', message: 'Please sign in to run skills' },
        { status: 403 }
      );
    }
    
    const user = getUserById(session.user.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'user_not_found' },
        { status: 404 }
      );
    }
    
    if (user.tier !== 'paid' && !isValidationPack) {
      return NextResponse.json(
        { error: 'upgrade_required', message: 'Upgrade to Pro to run this skill' },
        { status: 403 }
      );
    }
    
    if (isValidationPack && user.tier !== 'paid') {
      const canGenerate = canGenerateValidationPack(user);
      if (!canGenerate) {
        return NextResponse.json(
          { 
            error: 'limit_reached', 
            message: 'You have reached your Validation Pack limit',
            remaining: 0,
            resetTime: getResetTime(user),
          },
          { status: 403 }
        );
      }
    }
    
    const job = createJob(user.id, skillId, input);
    
    executeSkillAsync(job.id, skillId, input);
    
    incrementValidationPackCount(user.id);
    
    return NextResponse.json({
      jobId: job.id,
      status: job.status,
      message: 'Skill execution started',
    });
  } catch (error) {
    console.error('Error starting skill execution:', error);
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    );
  }
}

function getResetTime(user: ReturnType<typeof getUserById>) {
  if (!user || !user.lastValidationPackDate) return null;
  const resetTime = new Date(user.lastValidationPackDate);
  resetTime.setHours(resetTime.getHours() + 24);
  return resetTime > new Date() ? resetTime.toISOString() : null;
}

async function executeSkillAsync(jobId: string, skillId: string, input: string) {
  const { updateJobStatus } = await import('@/lib/db');
  
  updateJobStatus(jobId, 'running');
  
  const executionDir = path.join(process.cwd(), '..', 'execution');
  const scriptPath = path.join(executionDir, 'run_skill.py');
  
  if (!fs.existsSync(scriptPath)) {
    updateJobStatus(jobId, 'failed', undefined, 'Execution script not found');
    return;
  }
  
  const pythonProcess = spawn('python', [scriptPath, skillId, input], {
    cwd: executionDir,
    timeout: 30000,
  });
  
  let stdout = '';
  let stderr = '';
  
  pythonProcess.stdout.on('data', (data) => {
    stdout += data.toString();
  });
  
  pythonProcess.stderr.on('data', (data) => {
    stderr += data.toString();
  });
  
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      updateJobStatus(jobId, 'completed', stdout);
    } else {
      updateJobStatus(jobId, 'failed', undefined, stderr || `Process exited with code ${code}`);
    }
  });
  
  pythonProcess.on('error', (error) => {
    updateJobStatus(jobId, 'failed', undefined, error.message);
  });
  
  setTimeout(() => {
    if (pythonProcess.exitCode === null) {
      pythonProcess.kill();
      updateJobStatus(jobId, 'failed', undefined, 'Execution timed out after 30 seconds');
    }
  }, 30000);
}
