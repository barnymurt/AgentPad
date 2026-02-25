import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createJob, getJob, getUserById, getUserByEmail, incrementValidationPackCount, canGenerateValidationPack, getRemainingPacks, getResetTime } from '@/lib/db';
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
    const body = await request.json();
    const { skillId, input, answers, email, getQuestions } = body;
    
    if (!skillId) {
      return NextResponse.json(
        { error: 'Missing required field: skillId' },
        { status: 400 }
      );
    }
    
    const isValidationPack = VALIDATION_PACK_SKILLS.includes(skillId);
    const isMvpSkill = MVP_SKILLS.includes(skillId);
    
    // If just getting questions, run synchronously without job
    if (getQuestions && isValidationPack && input) {
      const { spawn } = await import('child_process');
      
      const executionDir = path.join(process.cwd(), '..', 'execution');
      const scriptPath = path.join(executionDir, 'run_skill.py');
      
      return new Promise<NextResponse>((resolve) => {
        const pythonProcess = spawn('python', [scriptPath, skillId, input], {
          cwd: executionDir,
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
          try {
            const result = JSON.parse(stdout);
            resolve(NextResponse.json({
              questions: result.questions || [],
              hasApiKey: result.hasApiKey || false,
            }));
          } catch (e) {
            resolve(NextResponse.json({ questions: [], error: 'Failed to parse questions' }));
          }
        });
        
        pythonProcess.on('error', (error) => {
          resolve(NextResponse.json({ questions: [], error: error.message }));
        });
        
        setTimeout(() => {
          if (pythonProcess.exitCode === null) {
            pythonProcess.kill();
            resolve(NextResponse.json({ questions: [], error: 'Timeout' }));
          }
        }, 120000);
      });
    }
    
    let user = null;
    let session = null;
    
    try {
      session = await auth();
    } catch (e) {
      // Auth might fail, continue
    }
    
    if (session?.user) {
      user = getUserById(session.user.id);
    } else if (email) {
      user = getUserByEmail(email);
    }
    
// For validation pack - run instant and spawn background job (no auth required for free tier)
    if (isValidationPack) {
      const { createJob } = await import('@/lib/db');
      
      // Create background job for full 7-skill pack
      const fullJobInput = input || 'Generate Full Validation Pack';
      const fullJob = createJob(user?.id || null, 'validation-pack-full', fullJobInput);
      
      // Run instant validation synchronously first
      const executionDir = path.join(process.cwd(), '..', 'execution');
      const scriptPath = path.join(executionDir, 'run_skill.py');
      
      // Get instant result first (fast)
      return new Promise<NextResponse>((resolve) => {
        const pythonProcess = spawn('python', [scriptPath, 'validation-pack', input, JSON.stringify(answers || {})], {
          cwd: executionDir,
        });
        
        let stdout = '';
        
        pythonProcess.stdout.on('data', (data) => {
          stdout += data.toString();
        });
        
        pythonProcess.stderr.on('data', (data) => {
          console.error('Python stderr:', data.toString());
        });
        
        pythonProcess.on('close', (code) => {
          let instantResult;
          try {
            instantResult = JSON.parse(stdout);
          } catch (e) {
            instantResult = { error: 'Failed to parse result', success: false };
          }
          
          // Spawn background job for full pack (don't wait)
          executeSkillAsync(fullJob.id, 'validation-pack-full', fullJobInput, answers);
          
          // Build instant result with robust fallback
          const instant = instantResult.instant || {};
          const recommendation = instant.recommendation || instantResult.overview?.recommendation || 'PIVOT';
          const score = instant.score || instantResult.overview?.score || 50;
          const devilAdvocateSummary = instant.devilAdvocateSummary || instantResult.overview?.summary || 'Validation analysis complete. Check the full report for detailed insights.';
          const validationSummary = instant.validationSummary || instantResult.overview?.summary || 'Your idea has been analyzed. The full validation pack provides comprehensive analysis across 7 key dimensions.';
          
          resolve(NextResponse.json({
            instant: {
              recommendation,
              score,
              devilAdvocateSummary,
              validationSummary,
              strengths: instant.strengths || [],
              considerations: instant.considerations || [],
              firstStep: instant.firstStep || 'Review the full validation pack for next steps.'
            },
            fullPackJobId: fullJob.id,
            fullPackProgress: 0,
            emailCapture: true,
            message: 'Full 7-skill validation pack being prepared'
          }));
        });
        
        pythonProcess.on('error', (error) => {
          // Still spawn background job
          executeSkillAsync(fullJob.id, 'validation-pack-full', fullJobInput, answers);
          
          resolve(NextResponse.json({
            instant: {
              recommendation: 'PIVOT',
              score: 50,
              devilAdvocateSummary: 'Unable to generate instant validation',
              validationSummary: 'Please check back later for full results'
            },
            fullPackJobId: fullJob.id,
            fullPackProgress: 0,
            emailCapture: true,
            error: error.message
          }));
        });
        
        setTimeout(() => {
          if (pythonProcess.exitCode === null) {
            pythonProcess.kill();
            // Still return with background job
            executeSkillAsync(fullJob.id, 'validation-pack-full', fullJobInput, answers);
            resolve(NextResponse.json({
              instant: {
                recommendation: 'PIVOT',
                score: 50,
                devilAdvocateSummary: 'Validation timed out',
                validationSummary: 'Full pack being generated in background'
              },
              fullPackJobId: fullJob.id,
              fullPackProgress: 0,
              emailCapture: true
            }));
          }
        }, 30000);
      });
    }
    
    // Non-validation-pack skills require auth
    if (!user) {
      return NextResponse.json(
        { error: 'unauthorized', message: 'Please sign in to run skills' },
        { status: 403 }
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
    
    const skillInput = input || `Generate ${isValidationPack ? 'Validation Pack' : skillId} for user idea`;
    const job = createJob(user.id, skillId, skillInput);
    
    executeSkillAsync(job.id, skillId, skillInput, answers);
    
    if (isValidationPack) {
      incrementValidationPackCount(user.id);
    }
    
    return NextResponse.json({
      jobId: job.id,
      status: job.status,
      message: 'Skill execution started',
      userId: user.id,
    });
  } catch (error) {
    console.error('Error starting skill execution:', error);
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    );
  }
}

async function executeSkillAsync(jobId: string, skillId: string, input: string, answers?: Record<string, string>) {
  const { updateJobStatus } = await import('@/lib/db');
  
  updateJobStatus(jobId, 'running');
  
  const executionDir = path.join(process.cwd(), '..', 'execution');
  const scriptPath = path.join(executionDir, 'run_skill.py');
  
  if (!fs.existsSync(scriptPath)) {
    updateJobStatus(jobId, 'failed', undefined, 'Execution script not found');
    return;
  }
  
  const args = [scriptPath, skillId, input];
  if (answers && Object.keys(answers).length > 0) {
    args.push(JSON.stringify(answers));
  }
  
  const pythonProcess = spawn('python', args, {
    cwd: executionDir,
    timeout: 120000,
  });
  
  let stdout = '';
  let stderr = '';
  
  pythonProcess.stdout.on('data', (data) => {
    stdout += data.toString();
  });
  
  pythonProcess.stderr.on('data', (data) => {
    const msg = data.toString();
    stderr += msg;
    
    const progressMatch = msg.match(/Progress: (\d+)%/);
    if (progressMatch) {
      const progress = parseInt(progressMatch[1], 10);
      updateJobStatus(jobId, 'running', undefined, `Progress: ${progress}%`);
    }
  });
  
  pythonProcess.on('close', (code) => {
    const hasValidOutput = stdout.includes('"success": true') && stdout.includes('skillResults');
    if (code === 0 || hasValidOutput) {
      updateJobStatus(jobId, 'completed', stdout);
    } else {
      const hasPartialResults = stdout.includes('"success": true') && stdout.includes('skillResults');
      if (hasPartialResults) {
        updateJobStatus(jobId, 'completed', stdout, 'Completed with partial results');
      } else {
        updateJobStatus(jobId, 'failed', undefined, stderr || `Process exited with code ${code}`);
      }
    }
  });
  
  pythonProcess.on('error', (error) => {
    updateJobStatus(jobId, 'failed', undefined, error.message);
  });
  
  setTimeout(() => {
    if (pythonProcess.exitCode === null) {
      pythonProcess.kill();
      const hasPartialResults = stdout.includes('"success": true') && stdout.includes('skillResults');
      if (hasPartialResults) {
        updateJobStatus(jobId, 'completed', stdout, 'Timed out - partial results available');
      } else {
        updateJobStatus(jobId, 'failed', undefined, 'Execution timed out after 120 seconds');
      }
    }
  }, 120000);
}
