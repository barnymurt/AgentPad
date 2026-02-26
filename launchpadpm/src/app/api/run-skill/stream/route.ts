import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skillId, input, answers, dataSourceIds } = body;
    
    if (!skillId || !input) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    
    const executionDir = path.join(process.cwd(), '..', 'execution');
    const scriptPath = path.join(executionDir, 'run_skill.py');
    
    // Build context object
    const context: Record<string, any> = {};
    if (answers && Object.keys(answers).length > 0) {
      context.answers = answers;
    }
    if (dataSourceIds && dataSourceIds.length > 0) {
      context.dataSourceIds = dataSourceIds;
    }
    
    const args = [scriptPath, skillId, input];
    
    // Add context as JSON
    if (Object.keys(context).length > 0) {
      args.push(JSON.stringify(context));
    }
    
    // Add streaming flag
    args.push('--stream');
    
    // Create a readable stream from the Python process
    const pythonProcess = spawn('python', args, {
      cwd: executionDir,
    });
    
    // Create a streaming response
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      start(controller) {
        pythonProcess.stdout.on('data', (data) => {
          const lines = data.toString().split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const parsed = JSON.parse(line.substring(6));
                if (parsed.type === 'token') {
                  // Send token updates as SSE
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'token', content: parsed.content })}\n\n`));
                } else if (parsed.type === 'complete') {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'complete', validation: parsed.validation })}\n\n`));
                }
              } catch {
                // Not JSON, ignore
              }
            }
          }
        });
        
        pythonProcess.stderr.on('data', (data) => {
          // Log errors but don't send to client
          console.error('Python stderr:', data.toString());
        });
        
        pythonProcess.on('close', (code) => {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        });
        
        pythonProcess.on('error', (error) => {
          controller.error(error);
        });
      },
      cancel() {
        pythonProcess.kill();
      }
    });
    
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Streaming error:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
