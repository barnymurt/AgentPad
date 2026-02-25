import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ squad: string }> }
) {
  try {
    const { squad: squadId } = await params;
    const body = await request.json();
    const { input, skills, context } = body;

    if (!input) {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      );
    }

    const skillsToRun = skills || [];
    
    if (skillsToRun.length === 0) {
      return NextResponse.json(
        { error: 'No skills selected' },
        { status: 400 }
      );
    }

    const results: Record<string, any> = {};
    const errors: string[] = [];

    for (const skillId of skillsToRun) {
      try {
        const result = await runSkill(skillId, input, context || {});
        results[skillId] = result;
      } catch (err: any) {
        errors.push(`${skillId}: ${err.message}`);
        results[skillId] = { 
          skill: skillId, 
          output: `Error: ${err.message}`, 
          success: false 
        };
      }
    }

    return NextResponse.json({
      success: true,
      squad: squadId,
      input,
      skillsRun: skillsToRun,
      results,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Squad execution error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to execute squad' },
      { status: 500 }
    );
  }
}

function runSkill(skillId: string, input: string, context: Record<string, string>): Promise<any> {
  return new Promise((resolve, reject) => {
    const executionDir = path.join(process.cwd(), '..', 'execution');
    const scriptPath = path.join(executionDir, 'run_skill.py');

    if (!fs.existsSync(scriptPath)) {
      reject(new Error('Execution script not found'));
      return;
    }

    const args = [scriptPath, skillId, input];
    
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
      stderr += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(stdout);
          resolve(result);
        } catch {
          resolve({
            skill: skillId,
            output: stdout,
            success: true
          });
        }
      } else {
        reject(new Error(stderr || `Process exited with code ${code}`));
      }
    });

    pythonProcess.on('error', (error) => {
      reject(error);
    });
  });
}
