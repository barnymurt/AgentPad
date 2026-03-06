import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserById, type User } from '@/lib/db';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skill_id, user_input, answers, create_deliverable, mcp_options } = body;
    
    if (!skill_id || !user_input) {
      return NextResponse.json(
        { error: 'Missing required fields: skill_id and user_input' },
        { status: 400 }
      );
    }
    
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }
    
    const executionDir = path.join(process.cwd(), '..', 'execution');
    const scriptPath = path.join(executionDir, 'execute_with_mcp.py');
    
    // Build command arguments
    const args = [scriptPath, skill_id, user_input];
    if (create_deliverable === false) {
      args.push('--no-deliverable');
    }
    
    // Run the skill execution with MCP
    return new Promise<NextResponse>((resolve) => {
      const pythonProcess = spawn('python', args, {
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
        if (code !== 0 && stderr) {
          console.error('Skill execution error:', stderr);
        }
        
        try {
          const result = stdout ? JSON.parse(stdout) : {};
          
          resolve(NextResponse.json({
            success: true,
            skill_name: result.skill_name || skill_id,
            skill_output: result.skill_output || '',
            deliverable: result.deliverable || null,
            has_deliverable: result.has_deliverable || false,
            message: result.has_deliverable 
              ? `Created deliverable via ${result.deliverable?.mcp_used || 'MCP'}`
              : 'Skill executed successfully'
          }));
        } catch (e) {
          resolve(NextResponse.json({
            success: true,
            skill_name: skill_id,
            skill_output: stdout,
            deliverable: null,
            has_deliverable: false,
            message: 'Skill executed (deliverable creation may have failed)'
          }));
        }
      });
    });
    
  } catch (error) {
    console.error('BobAI execution error:', error);
    return NextResponse.json(
      { error: 'Failed to execute skill with MCP' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check MCP availability
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const executionDir = path.join(process.cwd(), '..', 'execution');
    const scriptPath = path.join(executionDir, 'mcp_orchestrator.py');
    
    // Import and check MCP status
    const { get_available_mcps } = await import(path.join(executionDir, 'mcp_orchestrator.js'));
    
    // For now, return known status
    const mcps = {
      notion: { available: false, required_env: 'NOTION_API_KEY' },
      google_sheets: { available: false, required_env: 'GOOGLE_SHEETS_CREDENTIALS' },
      google_docs: { available: false, required_env: 'GOOGLE_SHEETS_CREDENTIALS' },
      figma: { available: false, required_env: 'FIGMA_API_KEY' },
      miro: { available: false, required_env: 'MIRO_API_KEY' },
      linear: { available: false, required_env: 'LINEAR_API_KEY' },
    };
    
    return NextResponse.json({
      mcps,
      message: 'Configure API keys in .env to enable MCPs'
    });
    
  } catch (error) {
    console.error('MCP status error:', error);
    return NextResponse.json(
      { error: 'Failed to get MCP status' },
      { status: 500 }
    );
  }
}
