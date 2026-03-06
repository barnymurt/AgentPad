import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { 
  createBuilderProject, 
  getBuilderProject, 
  getUserBuilderProjects,
  updateBuilderProject,
  updateBuilderProjectPhase,
  addBuilderApproval,
  adjustQualityThreshold,
  rollbackBuilderProject,
  deleteBuilderProject,
  type BuilderProject,
  type Phase,
  type PhaseStatus
} from '@/lib/db';
import { spawn } from 'child_process';
import path from 'path';

// Phase order for MVP
const PHASE_ORDER: Phase[] = ['validation', 'discovery', 'research'];
const PHASE_CREDITS: Record<Phase, number> = {
  validation: 10,
  discovery: 15,
  research: 20,
  build: 30,
  launch: 15,
  production_ready: 25,
  iterate: 10,
};

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');

    if (projectId) {
      const project = getBuilderProject(projectId);
      if (!project || project.userId !== session.user.id) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json(project);
    }

    const projects = getUserBuilderProjects(session.user.id);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching builder projects:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, qualityThreshold } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const project = createBuilderProject(
      session.user.id,
      name,
      description,
      qualityThreshold || 75
    );

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating builder project:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, projectId, ...params } = body;

    const project = getBuilderProject(projectId);
    if (!project || project.userId !== session.user.id) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    switch (action) {
      case 'start_phase': {
        const { phase, userContext } = params;
        const updated = updateBuilderProjectPhase(projectId, phase as Phase, 'running');
        if (!updated) {
          return NextResponse.json({ error: 'Failed to start phase' }, { status: 500 });
        }
        // Trigger async phase execution with user context
        executePhaseAsync(projectId, phase, userContext);
        return NextResponse.json(updated);
      }

      case 'approve': {
        const { phase, approved, comment } = params;
        const updated = addBuilderApproval(projectId, phase as Phase, approved, 'user', comment);
        if (!updated) {
          return NextResponse.json({ error: 'Failed to process approval' }, { status: 500 });
        }
        
        // If approved, auto-advance to next phase
        if (approved) {
          const phaseIndex = PHASE_ORDER.indexOf(phase as Phase);
          if (phaseIndex < PHASE_ORDER.length - 1) {
            const nextPhase = PHASE_ORDER[phaseIndex + 1];
            setTimeout(() => executePhaseAsync(projectId, nextPhase), 1000);
          }
        }
        
        return NextResponse.json(updated);
      }

      case 'adjust_threshold': {
        const { threshold, phase } = params;
        const updated = adjustQualityThreshold(projectId, threshold, phase);
        if (!updated) {
          return NextResponse.json({ error: 'Failed to adjust threshold' }, { status: 500 });
        }
        return NextResponse.json(updated);
      }

      case 'rollback': {
        const { targetPhase } = params;
        const updated = rollbackBuilderProject(projectId, targetPhase as Phase);
        if (!updated) {
          return NextResponse.json({ error: 'Failed to rollback' }, { status: 500 });
        }
        return NextResponse.json(updated);
      }

      case 'delete': {
        const deleted = deleteBuilderProject(projectId);
        if (!deleted) {
          return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
        }
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating builder project:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

async function executePhaseAsync(projectId: string, phase: Phase, userContext?: string) {
  const { updateBuilderProjectPhase, getBuilderProject } = await import('@/lib/db');
  
  const project = getBuilderProject(projectId);
  if (!project) return;
  
  // Combine project description with user-provided context
  const fullContext = userContext 
    ? `${project.description}\n\nAdditional context: ${userContext}`
    : project.description;
  
  updateBuilderProjectPhase(projectId, phase, 'running');
  
  const executionDir = path.join(process.cwd(), '..', 'execution');
  const scriptPath = path.join(executionDir, 'orchestrator.py');
  
  // Pass context as a JSON-encoded argument
  const args = [scriptPath, projectId, phase, '--context', fullContext];
  
  const pythonProcess = spawn('python', args, {
    cwd: executionDir,
    env: { ...process.env },
  });

  let stdout = '';
  let stderr = '';

  pythonProcess.stdout.on('data', (data) => {
    stdout += data.toString();
    console.log('[Orchestrator]', data.toString());
  });

  pythonProcess.stderr.on('data', (data) => {
    stderr += data.toString();
    console.error('[Orchestrator Error]', data.toString());
  });

  pythonProcess.on('close', async (code) => {
    const { updateBuilderProjectPhase, getBuilderProject } = await import('@/lib/db');
    const project = getBuilderProject(projectId);
    
    if (!project) return;

    try {
      const result = stdout ? JSON.parse(stdout) : {};
      
      if (result.success) {
        // Save phase output
        updateBuilderProjectPhase(projectId, phase, 'waiting_approval', {
          skillId: result.skillId || phase,
          output: result.output || '',
          summary: result.summary || '',
          qualityScore: result.qualityScore || 0,
          completedAt: new Date().toISOString(),
          retryCount: result.retryCount || 0,
        }, {
          score: result.qualityScore || 0,
          passed: (result.qualityScore || 0) >= project.qualityThreshold,
          confidence: 5,
          issues: result.issues || [],
          reviewedBy: 'system',
          reviewedAt: new Date().toISOString(),
        });
      } else {
        const errorMsg = result.error || 'Phase execution did not complete successfully';
        updateBuilderProjectPhase(projectId, phase, 'failed', undefined, undefined, errorMsg);
      }
    } catch (e) {
      console.error('Error parsing orchestrator result:', e);
      const errorMsg = e instanceof Error ? e.message : 'Unknown error occurred';
      updateBuilderProjectPhase(projectId, phase, 'failed', undefined, undefined, errorMsg);
    }
  });

  pythonProcess.on('error', async (error) => {
    console.error('Orchestrator error:', error);
    const { updateBuilderProjectPhase } = await import('@/lib/db');
    updateBuilderProjectPhase(projectId, phase, 'failed', undefined, undefined, error.message);
  });

  setTimeout(async () => {
    if (pythonProcess.exitCode === null) {
      pythonProcess.kill();
      const { updateBuilderProjectPhase } = await import('@/lib/db');
      updateBuilderProjectPhase(projectId, phase, 'failed', undefined, undefined, 'Phase timed out after 30 minutes');
    }
  }, 1800000); // 30 minute timeout
}
