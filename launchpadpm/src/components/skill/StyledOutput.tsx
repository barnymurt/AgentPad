'use client';

import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { getSkillCategory, getSkillConfig, CONTENT_EXTRACTION_ORDER, type SkillCategory, type OutputType, type CategoryConfig } from '@/lib/skillOutputTypes';

interface StyledOutputProps {
  content: string;
  skillId?: string;
  className?: string;
}

// ============ CONTENT EXTRACTION ============

function extractContent(input: string, skillId?: string): { 
  markdown: string; 
  extracted: boolean;
  structured?: Record<string, any>;
  isWireframeJSON?: boolean;
} {
  if (!input || typeof input !== 'string') {
    return { markdown: '', extracted: false };
  }
  
  let text = input.trim();
  
  // ALWAYS try to parse as JSON first
  if (text.startsWith('{')) {
    try {
      const parsed = JSON.parse(text);
      
      // Case 1: It's a skill wrapper {"skill": "...", "output": "..."}
      if (parsed.skill && parsed.output) {
        const outputStr = parsed.output;
        
        // Try to parse the output field as JSON
        try {
          const innerParsed = JSON.parse(outputStr);
          
          // Check for wireframe flow format
          if (innerParsed.flow?.screens || innerParsed.screens) {
            return {
              markdown: '',
              extracted: true,
              structured: innerParsed.flow || innerParsed,
              isWireframeJSON: true
            };
          }
          // Check for IA format
          if (innerParsed.siteMap || innerParsed.navigation) {
            return { markdown: '', extracted: true, structured: innerParsed };
          }
          // Check for responsive patterns
          if (innerParsed.breakpoints || innerParsed.patterns) {
            return { markdown: '', extracted: true, structured: innerParsed };
          }
          // Check for design system
          if (innerParsed.tokens || innerParsed.components) {
            return { markdown: '', extracted: true, structured: innerParsed };
          }
        } catch {
          // Output is not JSON - treat as markdown
          return { markdown: fixMarkdownContent(outputStr), extracted: false };
        }
      }
      
      // Case 2: Raw JSON (not wrapped)
      
      // Check for wireframe flow
      if (parsed.flow?.screens || parsed.screens) {
        return {
          markdown: '',
          extracted: true,
          structured: parsed.flow || parsed,
          isWireframeJSON: true
        };
      }
      
      // Check for IA
      if (parsed.siteMap || parsed.navigation) {
        return { markdown: '', extracted: true, structured: parsed };
      }
      
      // Check for responsive patterns
      if (parsed.breakpoints || parsed.patterns) {
        return { markdown: '', extracted: true, structured: parsed };
      }
      
      // Check for design system
      if (parsed.tokens || parsed.components) {
        return { markdown: '', extracted: true, structured: parsed };
      }
      
      // Unknown JSON format - stringify it
      return { 
        markdown: '```json\n' + JSON.stringify(parsed, null, 2) + '\n```', 
        extracted: false,
        structured: parsed 
      };
    } catch {
      // Not valid JSON, fall through to markdown
    }
  }
  
  // Default: treat as markdown
  return { 
    markdown: fixMarkdownContent(text), 
    extracted: false 
  };
}

// ============ CONTENT EXTRACTION - HELPERS ============

function extractStructuredData(obj: any, depth = 0): Record<string, any> | null {
  if (!obj || typeof obj !== 'object' || depth > 3) return null;
  
  // Try to find content using extraction order
  for (const field of CONTENT_EXTRACTION_ORDER) {
    if (obj[field] && typeof obj[field] === 'string') {
      return {
        content: obj[field],
        skill: obj.skill,
        success: obj.success,
        score: obj.score,
        metrics: obj.metrics,
        recommendations: obj.recommendations,
        sections: obj.sections
      };
    }
  }
  
  // Look for nested structures
  const nested = obj.validation || obj.result || obj.data;
  if (nested && typeof nested === 'object') {
    return extractStructuredData(nested, depth + 1);
  }
  
  return null;
}

function fixMarkdownContent(text: string): string {
  // Detect if content contains wireframe ASCII art (box drawing characters)
  const hasWireframe = /[├┌┐└┘├┤┬┴┼─│╔╗╚╝║═]/.test(text);
  
  // If it's a wireframe, wrap in special markers
  if (hasWireframe) {
    // Keep wireframe content intact but ensure it's in a code block
    return '\n```wireframe\n' + text + '\n```\n';
  }
  
  text = text.replace(/\\n/g, '\n').replace(/\\r/g, '').replace(/\\t/g, '\t');
  text = text.replace(/^```json\n?/gi, '').replace(/^```\n?/gi, '').replace(/\n```$/gi, '');
  text = text.replace(/(\|[^\n]+\|)\s{2,}(\|)/g, '$1\n$2');
  return text.trim();
}

// ============ UI COMPONENTS ============

function SectionHeader({ level, children, className = '' }: { level: number; children?: React.ReactNode; className?: string }) {
  const styles = {
    1: 'text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b-2 border-blue-500',
    2: 'text-xl font-semibold text-gray-800 mt-6 mb-3 pb-1 border-b border-gray-200',
    3: 'text-lg font-medium text-gray-800 mt-4 mb-2',
    4: 'text-base font-medium text-gray-700 mt-3 mb-2',
  };
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={`${styles[level as keyof typeof styles]} ${className}`}>{children}</Tag>;
}

function InfoCard({ children, type = 'info', title }: { children?: React.ReactNode; type?: 'info' | 'warning' | 'success' | 'danger' | 'tip'; title?: string }) {
  const styles = {
    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: '💡', text: 'text-blue-800' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '⚠️', text: 'text-yellow-800' },
    success: { bg: 'bg-green-50', border: 'border-green-200', icon: '✅', text: 'text-green-800' },
    danger: { bg: 'bg-red-50', border: 'border-red-200', icon: '❌', text: 'text-red-800' },
    tip: { bg: 'bg-purple-50', border: 'border-purple-200', icon: '💡', text: 'text-purple-800' },
  };
  
  const style = styles[type];
  
  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 my-4`}>
      {title && <div className={`font-semibold ${style.text} mb-2`}>{title}</div>}
      <div className={`text-sm ${style.text}`}>{children}</div>
    </div>
  );
}

// Design-specific components
function ColorSwatch({ color, name }: { color: string; name: string }) {
  const isHex = color.startsWith('#');
  const isRgb = color.startsWith('rgb');
  
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-gray-200">
      <div 
        className="w-12 h-12 rounded-lg border border-gray-200 shadow-sm"
        style={{ backgroundColor: isHex ? color : isRgb ? color : undefined }}
      />
      <div>
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-xs text-gray-500 font-mono">{color}</div>
      </div>
    </div>
  );
}

function TokenDisplay({ tokens }: { tokens: Record<string, string> }) {
  const entries = Object.entries(tokens).slice(0, 8);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
      {entries.map(([name, value]) => (
        <ColorSwatch key={name} color={value} name={name} />
      ))}
    </div>
  );
}

function ComponentSpec({ name, description, code }: { name: string; description?: string; code?: string }) {
  return (
    <div className="my-4 rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-900">{name}</span>
        {description && <span className="text-xs text-gray-500 ml-2">{description}</span>}
      </div>
      {code && (
        <pre className="bg-white  p-4 text-xs font-mono text-gray-900 dark:text-gray-100 overflow-x-auto">
          {code}
        </pre>
      )}
    </div>
  );
}

function VisualExample({ title, content }: { title?: string; content: string }) {
  return (
    <div className="my-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
      {title && <div className="text-sm font-medium text-gray-700  mb-2">{title}</div>}
      <div className="text-sm text-gray-600">{content}</div>
    </div>
  );
}

// Professional Wireframe Renderer - Industry Standard with Flow Support
function WireframeRenderer({ data, html }: { data?: Record<string, any>; html?: string }) {
  if (html) {
    return (
      <div className="my-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Interactive Wireframe</h3>
          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">HTML</span>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div 
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">This HTML can be opened in any browser to view the wireframe</p>
      </div>
    );
  }
  
  // Handle new flow-based structure
  const flowData = data?.flow || data;
  if (flowData?.screens) {
    return <FlowRenderer flow={flowData} />;
  }
  
  if (!data?.screens) return null;
  
  // Render a single wireframe element
  const renderElement = (el: any, viewportWidth: number) => {
    const widthPct = (el.width / viewportWidth) * 100;
    const leftPct = (el.x / viewportWidth) * 100;
    
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${leftPct}%`,
      width: `${widthPct}%`,
    };
    
    switch (el.type) {
      case 'button':
        return (
          <div key={el.id} style={{ ...baseStyle, top: el.y, height: el.height }}>
            <div className="w-full h-full bg-gray-800 dark:bg-gray-600 rounded-md flex items-center justify-center text-white text-sm font-medium">
              {el.props?.label || 'Button'}
            </div>
          </div>
        );
        
      case 'input':
        return (
          <div key={el.id} style={{ ...baseStyle, top: el.y, height: el.height }}>
            <div className="w-full h-full bg-white  border-2 border-gray-300 rounded-md flex items-center px-3">
              <span className="text-gray-400 text-sm">
                {el.props?.placeholder || el.props?.label || 'Input'}
              </span>
            </div>
          </div>
        );
        
      case 'text':
        return (
          <div key={el.id} style={{ ...baseStyle, top: el.y, height: el.height }} className="flex items-center">
            <span 
              className="text-gray-800 dark:text-gray-200" 
              style={{ 
                fontSize: el.props?.fontSize || 14,
                fontWeight: el.props?.fontWeight || 'normal',
              }}
            >
              {el.props?.content || 'Text'}
            </span>
          </div>
        );
        
      case 'image':
        return (
          <div key={el.id} style={{ ...baseStyle, top: el.y, height: el.height }}>
            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        );
        
      case 'link':
        return (
          <div key={el.id} style={{ ...baseStyle, top: el.y, height: el.height }} className="flex items-center">
            <span className="text-blue-600 dark:text-blue-400 text-sm underline">
              {el.props?.content || 'Link'}
            </span>
          </div>
        );
        
      case 'divider':
        return (
          <div key={el.id} style={{ ...baseStyle, top: el.y, height: el.height }} className="flex items-center justify-center">
            <span className="text-gray-400 text-xs">{el.props?.content || 'OR'}</span>
          </div>
        );
        
      default:
        return (
          <div key={el.id} style={{ ...baseStyle, top: el.y, height: el.height }}>
            <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
              <span className="text-gray-400 text-xs">{el.type}</span>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="my-6 space-y-8">
      {data.screens.map((screen: any, idx: number) => {
        const viewportWidth = screen.viewport?.width || 375;
        const viewportHeight = screen.viewport?.height || 812;
        
        return (
          <div key={idx} className="bg-white  rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{screen.name}</h3>
                <div className="flex gap-2 mt-1">
                  {screen.priority && (
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      screen.priority === 'P0' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      screen.priority === 'P1' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-gray-100 text-gray-600  '
                    }`}>{screen.priority}</span>
                  )}
                  {screen.fidelity && (
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded">{screen.fidelity}</span>
                  )}
                  {screen.viewport && (
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded">
                      {screen.viewport.width}×{screen.viewport.height}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Wireframe Canvas */}
            <div className="flex justify-center">
              <div 
                className="bg-white rounded-xl shadow-2xl overflow-hidden"
                style={{ 
                  width: Math.min(viewportWidth, 400),
                  height: Math.min(viewportHeight, 700),
                  position: 'relative',
                  border: '1px solid #e5e7eb'
                }}
              >
                {/* Status Bar Mock */}
                <div className="h-6 bg-gray-100 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between px-3">
                  <div className="w-12 h-2 bg-gray-300 rounded" />
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-gray-300 rounded" />
                    <div className="w-4 h-2 bg-gray-300 rounded" />
                  </div>
                </div>
                
                {/* Screen Content */}
                <div className="p-3" style={{ height: Math.min(viewportHeight, 700) - 24 }}>
                  {screen.elements?.map((el: any, elIdx: number) => renderElement(el, viewportWidth))}
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-300 rounded-full" />
              </div>
            </div>
            
            {/* Interactions */}
            {screen.interactions && screen.interactions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700  mb-2">User Flows</h4>
                <div className="flex flex-wrap gap-2">
                  {screen.interactions.map((int: any, intIdx: number) => (
                    <div key={intIdx} className="flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border border-gray-200">
                      <span className="font-mono text-blue-600 dark:text-blue-400">{int.element}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium text-purple-600 dark:text-purple-400">{int.action}</span>
                      {int.target && (
                        <>
                          <span className="text-gray-400">→</span>
                          <span className="font-mono text-green-600 dark:text-green-400">{int.target}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Element Legend */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700  mb-3">Element Key</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { type: 'button', label: 'Button', style: 'bg-gray-800 rounded' },
            { type: 'input', label: 'Input Field', style: 'border-2 border-gray-300 rounded' },
            { type: 'text', label: 'Text', style: 'text-gray-800' },
            { type: 'image', label: 'Image/Icon', style: 'bg-gray-200 rounded' },
          ].map((item) => (
            <div key={item.type} className="flex items-center gap-2 text-xs">
              <div className={`w-4 h-4 ${item.style}`} />
              <span className="text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Flow Renderer - Shows connected screens with user flow
function FlowRenderer({ flow }: { flow: any }) {
  const screens = flow.screens || [];
  const connections = flow.connections || [];
  
  return (
    <div className="my-6 space-y-8">
      {/* Flow Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold">{flow.name || 'User Flow'}</h3>
        {flow.description && <p className="text-sm opacity-90 mt-1">{flow.description}</p>}
        <div className="flex gap-3 mt-3">
          <span className="text-xs bg-white/20 px-2 py-1 rounded">{screens.length} screens</span>
          <span className="text-xs bg-white/20 px-2 py-1 rounded">{connections.length} connections</span>
        </div>
      </div>
      
      {/* Flow Diagram */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-4 min-w-max px-4">
          {screens.map((screen: any, idx: number) => {
            const viewportWidth = screen.viewport?.width || 375;
            const viewportHeight = screen.viewport?.height || 812;
            
            // Find connections from this screen
            const outgoing = connections.filter((c: any) => c.from === screen.id || c.from === screen.name?.toLowerCase().replace(/\s+/g, '_'));
            
            return (
              <div key={idx} className="flex items-center">
                {/* Screen Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200" style={{ width: 280 }}>
                  {/* Screen Header */}
                  <div className="bg-gray-50  px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 text-sm">{screen.name}</h4>
                      {screen.priority && (
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          screen.priority === 'P0' ? 'bg-red-100 text-red-700' : 
                          screen.priority === 'P1' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                        }`}>{screen.priority}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Screen Preview */}
                  <div className="p-3 bg-white ">
                    <div 
                      className="mx-auto bg-white rounded-lg shadow overflow-hidden"
                      style={{ width: Math.min(viewportWidth, 240), height: Math.min(viewportHeight, 300) }}
                    >
                      {/* Phone frame */}
                      <div className="h-4 bg-gray-200  flex items-center px-2">
                        <div className="w-8 h-1 bg-gray-300 rounded-full" />
                      </div>
                      <div className="p-2 relative" style={{ height: Math.min(viewportHeight, 300) - 16 }}>
                        {screen.elements?.slice(0, 5).map((el: any, elIdx: number) => {
                          const scale = Math.min(viewportWidth, 240) / viewportWidth;
                          return (
                            <div
                              key={elIdx}
                              className="absolute bg-gray-100 rounded"
                              style={{
                                left: el.x * scale,
                                top: el.y * scale * 0.3,
                                width: Math.max(el.width * scale, 30),
                                height: Math.max(el.height * scale * 0.3, 12),
                              }}
                            />
                          );
                        })}
                        {screen.elements?.length > 5 && (
                          <div className="absolute bottom-1 right-1 text-xs text-gray-400">
                            +{screen.elements.length - 5} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactions from this screen */}
                  {outgoing.length > 0 && (
                    <div className="px-4 py-2 bg-gray-50 /50 border-t border-gray-200 dark:border-gray-600">
                      <div className="text-xs text-gray-500 mb-1">Flows to:</div>
                      {outgoing.map((conn: any, cIdx: number) => (
                        <div key={cIdx} className="flex items-center gap-1 text-xs">
                          <span className="font-mono text-blue-600 dark:text-blue-400">{conn.via}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-purple-600 dark:text-purple-400">{conn.to}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Arrow to next screen */}
                {idx < screens.length - 1 && (
                  <div className="flex items-center justify-center w-8">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Connection Legend */}
      {connections.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700  mb-3">Flow Connections</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {connections.map((conn: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-xs bg-white px-3 py-2 rounded-lg border border-gray-200">
                <span className="font-medium text-blue-600 dark:text-blue-400">{conn.from}</span>
                <span className="text-gray-400">→</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">{conn.to}</span>
                {conn.label && <span className="text-gray-500">({conn.label})</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Information Architecture Renderer - Site Map and Navigation
function IARenderer({ data }: { data?: Record<string, any> }) {
  if (!data?.siteMap && !data?.navigation) return null;
  
  const { siteMap, navigation, labels, searchStrategy, validation } = data;
  
  const renderNodes = (nodes: any[], level = 0): React.ReactNode => {
    if (!nodes) return null;
    return nodes.map((node, idx) => (
      <div key={idx} style={{ marginLeft: level * 20 }}>
        <div className="flex items-center gap-2 py-1">
          {level > 0 && <span className="text-gray-300">├─</span>}
          <span className="text-sm text-gray-700 ">
            {node.name}
            {node.path && <span className="text-gray-400 ml-2 text-xs">{node.path}</span>}
          </span>
          {node.children?.length > 0 && (
            <span className="text-xs text-blue-500">({node.children.length})</span>
          )}
        </div>
        {node.children?.length > 0 && renderNodes(node.children, level + 1)}
      </div>
    ));
  };
  
  return (
    <div className="my-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold">Information Architecture</h3>
        {siteMap?.name && <p className="text-sm opacity-90 mt-1">{siteMap.name}</p>}
        <div className="flex gap-3 mt-3">
          {siteMap?.depth && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Depth: {siteMap.depth}</span>
          )}
          {siteMap?.complexity && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Complexity: {siteMap.complexity}</span>
          )}
        </div>
      </div>
      
      {/* Site Map */}
      {siteMap?.nodes && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Site Map</h4>
          <div className="font-mono text-sm">
            {renderNodes(siteMap.nodes)}
          </div>
        </div>
      )}
      
      {/* Navigation */}
      {navigation && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(navigation).map(([navType, items]: [string, any]) => (
            <div key={navType} className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 capitalize">
                {navType} Navigation
              </h4>
              <div className="space-y-2">
                {Array.isArray(items) && items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-gray-700 ">{item.label}</span>
                    <span className={`px-1.5 py-0.5 rounded ${
                      item.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-gray-100 text-gray-600  '
                    }`}>{item.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Labels */}
      {labels && Object.keys(labels).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Label Glossary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(labels).map(([key, desc]: [string, any]) => (
              <div key={key} className="flex items-start gap-2 text-xs">
                <span className="font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded">{key}</span>
                <span className="text-gray-600">{String(desc)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Search Strategy */}
      {searchStrategy && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Search Strategy</h4>
          <div className="flex flex-wrap gap-2">
            {searchStrategy.enabled && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded">Enabled</span>
            )}
            {searchStrategy.type && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded">Type: {searchStrategy.type}</span>
            )}
            {searchStrategy.suggestions && (
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded">Suggestions</span>
            )}
          </div>
        </div>
      )}
      
      {/* Validation */}
      {validation && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-4">
          <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Validation</h4>
          <p className="text-xs text-yellow-700 dark:text-yellow-300">{validation.notes}</p>
        </div>
      )}
    </div>
  );
}

// Responsive Patterns Renderer
function ResponsivePatternsRenderer({ data }: { data?: Record<string, any> }) {
  if (!data?.breakpoints && !data?.patterns) return null;
  
  const { breakpoints, patterns, testing } = data;
  
  return (
    <div className="my-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold">Responsive Patterns</h3>
        <div className="flex gap-3 mt-3">
          {breakpoints?.length > 0 && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">{breakpoints.length} breakpoints</span>
          )}
          {patterns?.length > 0 && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">{patterns.length} patterns</span>
          )}
        </div>
      </div>
      
      {/* Breakpoints */}
      {breakpoints?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Breakpoints</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {breakpoints.map((bp: any, idx: number) => (
              <div key={idx} className="bg-white  rounded-lg p-3 text-center">
                <div className="font-medium text-gray-900 capitalize">{bp.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {bp.min || 0}px {bp.max ? `- ${bp.max}px` : '+'}
                </div>
                {bp.default && (
                  <span className="text-xs text-blue-500 mt-1 block">Default</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Patterns */}
      {patterns?.length > 0 && (
        <div className="space-y-4">
          {patterns.map((pattern: any, idx: number) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900">{pattern.name}</h4>
              </div>
              <p className="text-xs text-gray-500 mb-3">{pattern.description}</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(pattern).filter(([k]) => !['name', 'description'].includes(k)).map(([bpName, bpConfig]: [string, any], iIdx: number) => (
                    <div key={iIdx} className="bg-white  rounded-lg p-2">
                    <div className="text-xs font-medium text-blue-600 dark:text-blue-400 capitalize mb-1">{bpName}</div>
                    <pre className="text-xs text-gray-600 overflow-x-auto">
                      {JSON.stringify(bpConfig, null, 1)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Testing */}
      {testing && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Testing Plan</h4>
          {testing.devices && (
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-500">Devices: </span>
              <span className="text-xs text-gray-700 ">{testing.devices.join(', ')}</span>
            </div>
          )}
          {testing.browsers && (
            <div>
              <span className="text-xs font-medium text-gray-500">Browsers: </span>
              <span className="text-xs text-gray-700 ">{testing.browsers.join(', ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Design System Renderer
function DesignSystemRenderer({ data }: { data?: Record<string, any> }) {
  if (!data?.tokens && !data?.components) return null;
  
  const { tokens, components, themes, documentation } = data;
  
  return (
    <div className="my-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold">Design System</h3>
        <div className="flex gap-3 mt-3">
          {tokens?.colors && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">{Object.keys(tokens.colors).length} color groups</span>
          )}
          {components?.length > 0 && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">{components.length} components</span>
          )}
          {themes && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">{Object.keys(themes).length} themes</span>
          )}
        </div>
      </div>
      
      {/* Colors */}
      {tokens?.colors && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Color Tokens</h4>
          <div className="space-y-4">
            {Object.entries(tokens.colors).map(([colorName, colorValue]: [string, any]) => (
              <div key={colorName}>
                <div className="text-xs font-medium text-gray-500 mb-2 capitalize">{colorName}</div>
                <div className="flex flex-wrap gap-2">
                  {typeof colorValue === 'object' && colorValue !== null ? (
                    Object.entries(colorValue).map(([shade, hex]: [string, any]) => (
                      <div key={shade} className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                          style={{ backgroundColor: hex }}
                        />
                        <div className="text-xs">
                          <div className="text-gray-600">{shade}</div>
                          <div className="font-mono text-gray-500">{hex}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                        style={{ backgroundColor: colorValue }}
                      />
                      <div className="text-xs font-mono text-gray-500">{colorValue}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Typography */}
      {tokens?.typography && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Typography</h4>
          {tokens.typography.fontFamily?.sans && (
            <div className="mb-3">
              <span className="text-xs text-gray-500">Font: </span>
              <span className="text-xs text-gray-700  font-mono">{tokens.typography.fontFamily.sans}</span>
            </div>
          )}
          <div className="space-y-2">
            {tokens.typography.heading && Object.entries(tokens.typography.heading).map(([tag, style]: [string, any]) => (
              <div key={tag} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                <span className="text-sm font-medium text-gray-700 ">{tag}</span>
                <span className="text-xs text-gray-500 font-mono">{style}</span>
              </div>
            ))}
            {tokens.typography.body && Object.entries(tokens.typography.body).map(([tag, style]: [string, any]) => (
              <div key={tag} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                <span className="text-sm text-gray-700 ">{tag}</span>
                <span className="text-xs text-gray-500 font-mono">{style}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Components */}
      {components?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Components</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {components.map((comp: any, idx: number) => (
              <div key={idx} className="bg-white  rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 text-sm">{comp.name}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {comp.variants?.slice(0, 4).map((v: string, i: number) => (
                    <span key={i} className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded">{v}</span>
                  ))}
                  {comp.variants?.length > 4 && (
                    <span className="text-xs text-gray-400">+{comp.variants.length - 4}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{comp.usage}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Themes */}
      {themes && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(themes).map(([themeName, themeValues]: [string, any]) => (
            <div key={themeName} className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 capitalize">{themeName} Theme</h4>
              <div className="space-y-2">
                {themeValues.background && Object.entries(themeValues.background).map(([key, val]: [string, any]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: val }} />
                    <span className="text-xs text-gray-600">{key}: </span>
                    <span className="text-xs font-mono text-gray-500">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MetricBadge({ value, label, trend }: { value: string; label: string; trend?: 'up' | 'down' | 'neutral' }) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600', 
    neutral: 'text-gray-600'
  };
  
  return (
    <div className="inline-flex flex-col items-center px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
      {trend && <span className={`text-xs ${trendColors[trend]}`}>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>}
    </div>
  );
}

function PriorityTag({ priority }: { priority: 'high' | 'medium' | 'low' }) {
  const colors = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[priority]}`}>
      {priority.toUpperCase()}
    </span>
  );
}

// ============ CATEGORY-AWARE RENDERER ============

function useCategoryComponents(category: SkillCategory, config: CategoryConfig) {
  return useMemo(() => ({
    h1: ({ children }: { children?: React.ReactNode }) => <SectionHeader level={1}>{children}</SectionHeader>,
    h2: ({ children }: { children?: React.ReactNode }) => <SectionHeader level={2}>{children}</SectionHeader>,
    h3: ({ children }: { children?: React.ReactNode }) => <SectionHeader level={3}>{children}</SectionHeader>,
    h4: ({ children }: { children?: React.ReactNode }) => <SectionHeader level={4}>{children}</SectionHeader>,
    
    p: ({ children }: { children?: React.ReactNode }) => {
      const text = children?.toString() || '';
      const lower = text.toLowerCase();
      
      if (lower.includes('baseline metric') || lower.includes('required:') || lower.includes('needed:')) {
        return <InfoCard type="warning">{children}</InfoCard>;
      }
      if (lower.includes('next steps') || lower.includes('recommendation:') || lower.includes('action:')) {
        return <InfoCard type="tip" title="Next Steps">{children}</InfoCard>;
      }
      if (lower.includes('success criteria') || lower.includes('decision:')) {
        return <InfoCard type="success">{children}</InfoCard>;
      }
      if (lower.includes('risk') || lower.includes('warning') || lower.includes('caution')) {
        return <InfoCard type="danger">{children}</InfoCard>;
      }
      
      return <p className="text-sm text-gray-700  mb-4 leading-relaxed">{children}</p>;
    },
    
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 space-y-1 list-decimal list-inside">{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => {
      const text = children?.toString() || '';
      
      if (text.match(/^(IF |THEN |BECAUSE |WHEN |WHERE |HOW )/i)) {
        return <li className="text-sm text-gray-700  ml-4 bg-slate-100 dark:bg-slate-800 p-2 rounded my-1 font-mono text-xs">{children}</li>;
      }
      if (text.match(/^(\* \[ \] |\- \[ \] |\[ \] )/)) {
        return <li className="text-sm text-gray-700  flex items-start gap-2">{children}</li>;
      }
      
      return <li className="text-sm text-gray-700 ">{children}</li>;
    },
    
    strong: ({ children }: { children?: React.ReactNode }) => {
      const text = children?.toString() || '';
      const lower = text.toLowerCase();
      
      if (lower.includes('success') || lower.includes('ship') || lower.includes('win') || lower.includes('go')) {
        return <span className="font-bold text-green-600 dark:text-green-400">{children}</span>;
      }
      if (lower.includes('fail') || lower.includes('lose') || lower.includes('kill') || lower.includes('stop')) {
        return <span className="font-bold text-red-600 dark:text-red-400">{children}</span>;
      }
      if (lower.includes('warning') || lower.includes('caution') || lower.includes('risk')) {
        return <span className="font-bold text-yellow-600 dark:text-yellow-400">{children}</span>;
      }
      if (lower.includes('priority')) {
        return <span className="font-bold text-blue-600 dark:text-blue-400">{children}</span>;
      }
      
      return <strong className="font-semibold text-gray-900">{children}</strong>;
    },
    
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-gray-600">{children}</em>
    ),
    
    // Enhanced table rendering
    table: ({ children }: { children?: React.ReactNode }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
      <thead className="bg-gray-100">{children}</thead>
    ),
    tbody: ({ children }: { children?: React.ReactNode }) => (
      <tbody className="divide-y divide-gray-100 dark:divide-gray-700">{children}</tbody>
    ),
    tr: ({ children }: { children?: React.ReactNode }) => (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">{children}</tr>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600  uppercase tracking-wider border-r border-gray-200 dark:border-gray-600">
        {children}
      </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => {
      const text = children?.toString() || '';
      let className = 'px-4 py-3 text-sm text-gray-700  border-r border-gray-100 dark:border-gray-700';
      
      const lower = text.toLowerCase();
      if (text.includes('✅') || lower.includes('pass') || lower.includes('yes') || lower.includes('complete') || lower.includes('high')) {
        className += ' bg-green-50/50 dark:bg-green-900/10';
      } else if (text.includes('❌') || lower.includes('fail') || lower.includes('no') || lower.includes('incomplete') || lower.includes('low')) {
        className += ' bg-red-50/50 dark:bg-red-900/10';
      } else if (text.includes('⚠️') || lower.includes('medium') || lower.includes('warning')) {
        className += ' bg-yellow-50/50 dark:bg-yellow-900/10';
      }
      
      return <td className={className}>{children}</td>;
    },
    
    // Blockquotes become info cards
    blockquote: ({ children }: { children?: React.ReactNode }) => {
      const text = children?.toString() || '';
      const lower = text.toLowerCase();
      let type: 'info' | 'warning' | 'success' | 'danger' = 'info';
      
      if (lower.includes('warning') || lower.includes('caution') || lower.includes('risk')) type = 'warning';
      else if (lower.includes('success') || lower.includes('ship') || lower.includes('recommend')) type = 'success';
      else if (lower.includes('fail') || lower.includes('do not') || lower.includes('avoid')) type = 'danger';
      
      return <InfoCard type={type}>{children}</InfoCard>;
    },
    
    code: ({ className: codeClass, children }: { className?: string; children?: React.ReactNode }) => {
      const isInline = !codeClass;
      const isWireframe = codeClass?.includes('wireframe');
      
      if (isInline) {
        return <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-pink-600 dark:text-pink-400">{children}</code>;
      }
      
      if (isWireframe) {
        return (
          <div className="my-6 rounded-lg border border-blue-500/30 overflow-hidden">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 border-b border-blue-500/30">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Wireframe</span>
            </div>
            <pre className="bg-gray-100  p-4 overflow-x-auto text-xs font-mono text-green-700 dark:text-green-400 leading-relaxed">
              {children}
            </pre>
          </div>
        );
      }
      
      return <code className={`${codeClass} block bg-gray-100  p-4 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-100 overflow-x-auto my-4`}>{children}</code>;
    },
    pre: ({ children }: { children?: React.ReactNode }) => {
      // Check if this is a wireframe by checking child content
      const childText = children?.toString() || '';
      const isWireframe = /[├┌┐└┘├┤┬┴┼─│╔╗╚╝║═]/.test(childText);
      
      if (isWireframe) {
        return (
          <div className="my-6 rounded-lg border border-blue-500/30 overflow-hidden">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 border-b border-blue-500/30">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Wireframe</span>
            </div>
            <pre className="bg-gray-100  p-4 overflow-x-auto text-xs font-mono text-green-700 dark:text-green-400 leading-relaxed">
              {children}
            </pre>
          </div>
        );
      }
      
      return (
        <pre className="bg-gray-100  p-4 rounded-lg overflow-x-auto my-4 text-xs font-mono text-gray-700 dark:text-gray-100">
          {children}
        </pre>
      );
    },
    hr: () => <hr className="my-8 border-gray-200" />,
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  }), [category, config]);
}

// ============ MAIN COMPONENT ============

export default function StyledOutput({ content, skillId, className = '' }: StyledOutputProps) {
  const category = getSkillCategory(skillId || '');
  const config = getSkillConfig(skillId || '');
  
  const { markdown, extracted, structured, isWireframeJSON } = useMemo(
    () => extractContent(content, skillId),
    [content, skillId]
  );
  
  const components = useCategoryComponents(category, config);
  
  // Handle wireframe JSON format
  if (isWireframeJSON && structured) {
    // DEBUG: Log what's happening
    console.log('[StyledOutput] Wireframe detected:', JSON.stringify(structured).substring(0, 200));
    return (
      <div className={className}>
        {/* Header */}
        {process.env.NODE_ENV === 'development' && skillId && (
          <div className="text-xs text-gray-400 mb-2 capitalize">
            {category} • {config.primaryOutput}
          </div>
        )}
        
        {/* Wireframe or HTML */}
        <WireframeRenderer 
          data={structured.screens ? structured : undefined} 
          html={structured.html}
        />
        
        {/* Show any additional markdown if present */}
        {structured.annotations && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Annotations</h4>
            <ReactMarkdown components={components}>
              {structured.annotations.map((a: any, idx: number) => 
                `**${a.element}**: ${a.note}`
              ).join('\n\n')}
            </ReactMarkdown>
          </div>
        )}
      </div>
    );
  }
  
  // Handle IA JSON format (siteMap)
  if (structured?.siteMap || structured?.navigation) {
    return (
      <div className={className}>
        {process.env.NODE_ENV === 'development' && skillId && (
          <div className="text-xs text-gray-400 mb-2 capitalize">
            {category} • {config.primaryOutput}
          </div>
        )}
        <IARenderer data={structured} />
      </div>
    );
  }
  
  // Handle Responsive Patterns JSON format (breakpoints)
  if (structured?.breakpoints || structured?.patterns) {
    return (
      <div className={className}>
        {process.env.NODE_ENV === 'development' && skillId && (
          <div className="text-xs text-gray-400 mb-2 capitalize">
            {category} • {config.primaryOutput}
          </div>
        )}
        <ResponsivePatternsRenderer data={structured} />
      </div>
    );
  }
  
  // Handle Design System JSON format (tokens)
  if (structured?.tokens || structured?.components) {
    return (
      <div className={className}>
        {process.env.NODE_ENV === 'development' && skillId && (
          <div className="text-xs text-gray-400 mb-2 capitalize">
            {category} • {config.primaryOutput}
          </div>
        )}
        <DesignSystemRenderer data={structured} />
      </div>
    );
  }
  
  // Handle HTML wireframe
  if (extracted && !markdown && structured?.html) {
    return (
      <div className={className}>
        <WireframeRenderer html={structured.html} />
      </div>
    );
  }

  // Catch-all: If we have structured data but no markdown, show as JSON
  if (!markdown && structured) {
    console.log('[StyledOutput] Falling back to JSON display. isWireframeJSON:', isWireframeJSON, 'structured keys:', Object.keys(structured));
    return (
      <div className={className}>
        {process.env.NODE_ENV === 'development' && skillId && (
          <div className="text-xs text-gray-400 mb-2 capitalize">
            {category} • {config.primaryOutput}
          </div>
        )}
        <pre className="bg-gray-100  text-green-700 dark:text-green-400 p-4 rounded-lg overflow-x-auto text-xs">
          {JSON.stringify(structured, null, 2)}
        </pre>
      </div>
    );
  }

  if (!markdown) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No output available</p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Category indicator for debugging */}
      {process.env.NODE_ENV === 'development' && skillId && (
        <div className="text-xs text-gray-400 mb-2 capitalize">
          {category} • {config.primaryOutput}
        </div>
      )}
      
      {/* Structured data summary if extracted */}
      {extracted && structured && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex flex-wrap gap-2">
            {structured.skill && (
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                Skill: {structured.skill}
              </span>
            )}
            {structured.success !== undefined && (
              <span className={`text-xs font-medium ${structured.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                Status: {structured.success ? 'Success' : 'Failed'}
              </span>
            )}
            {structured.score && (
              <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                Score: {structured.score}
              </span>
            )}
          </div>
        </div>
      )}
      
      <ReactMarkdown components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
