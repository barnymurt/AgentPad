'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';
import ReactMarkdown from 'react-markdown';

interface Example {
  input: string;
  output: string;
  context?: string;
}

interface WorkflowStep {
  step: string;
  description: string;
}

interface SkillExamples {
  useWhen: string[];
  workflow: string | WorkflowStep[];
  examples: Example[];
}

interface Skill {
  id: string;
  name: string;
  description: string;
  examples?: SkillExamples;
}

export default function SkillDetailPage() {
  const params = useParams();
  const skillId = params.skill as string;
  const { darkMode } = useAppLayout();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [expandedExample, setExpandedExample] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/skills/${skillId}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setSkill(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [skillId]);

  const handleRun = async (exampleInput?: string) => {
    const runInput = exampleInput || input;
    if (!runInput.trim()) return;
    setRunning(true);
    
    try {
      const response = await fetch('/api/run-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId,
          input: runInput,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Skill started successfully!');
        if (!exampleInput) {
          setInput('');
        }
      } else {
        alert(data.error || 'Failed to run skill');
      }
    } catch (err) {
      console.error('Error:', err);
    }
    
    setRunning(false);
  };

  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-100';
  const inputBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-300';

  if (loading) {
    return (
      <AppLayout title="Loading..." key={darkMode ? 'dark' : 'light'}>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </AppLayout>
    );
  }

  if (!skill) {
    return (
      <AppLayout title="Skill Not Found" key={darkMode ? 'dark' : 'light'}>
        <div className="text-center py-12">
          <p className={`${mutedColor} mb-4`}>Skill "{skillId}" not found</p>
          <Link href="/skills" className="text-blue-500 hover:underline">
            Back to Skills
          </Link>
        </div>
      </AppLayout>
    );
  }

  const skillName = skill.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <AppLayout title={skillName} key={darkMode ? 'dark' : 'light'}>
      <div className="space-y-6">
        {/* Skill Info */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h2 className={`${textColor} font-semibold text-xl mb-2`}>{skillName}</h2>
          <p className={mutedColor}>{skill.description}</p>
        </div>

        {/* When to Use */}
        {skill.examples?.useWhen && skill.examples.useWhen.length > 0 && (
          <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <h3 className={`${textColor} font-semibold mb-3`}>When to Use This Skill</h3>
            <div className="flex flex-wrap gap-2">
              {skill.examples.useWhen.map((use, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Workflow */}
        {skill.examples?.workflow && (
          <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <h3 className={`${textColor} font-semibold mb-4`}>Workflow</h3>
            
            {/* Check if workflow is array or string */}
            {Array.isArray(skill.examples.workflow) ? (
              <div className="flex flex-nowrap justify-center items-stretch gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx>{`
                  div::-webkit-scrollbar { display: none; }
                `}</style>
                {skill.examples.workflow.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center flex-shrink-0">
                    <div className={`${darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-100'} rounded-lg p-4 min-w-[160px] max-w-[200px] text-center`}>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-medium">
                          {idx + 1}
                        </div>
                        <span className="font-medium text-purple-400 text-sm">{item.step}</span>
                      </div>
                      <p className={`text-xs ${mutedColor}`}>{item.description}</p>
                    </div>
                    {idx < skill.examples.workflow.length - 1 && (
                      <svg className={`w-5 h-5 ${mutedColor} mx-2 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                {skill.examples.workflow.split(' → ').map((step, idx, arr) => (
                  <div key={idx} className="flex items-center">
                    <span className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm">
                      {step.trim()}
                    </span>
                    {idx < arr.length - 1 && (
                      <svg className={`w-4 h-4 ${mutedColor} mx-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Examples */}
        {skill.examples?.examples && skill.examples.examples.length > 0 && (
          <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <h3 className={`${textColor} font-semibold mb-4`}>Examples</h3>
            <div className="space-y-4">
              {skill.examples.examples.map((example, idx) => (
                <div key={idx} className={`border ${cardBorder} rounded-lg overflow-hidden`}>
                  {/* Example Header */}
                  <button
                    onClick={() => setExpandedExample(expandedExample === idx ? null : idx)}
                    className={`w-full p-4 flex items-center justify-between ${darkMode ? 'hover:bg-[#252540]' : 'hover:bg-gray-50'} transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-200'
                      } ${textColor}`}>
                        Example {idx + 1}
                      </span>
                      {example.context && (
                        <span className={`text-sm ${mutedColor}`}>{example.context}</span>
                      )}
                    </div>
                    <svg
                      className={`w-5 h-5 ${mutedColor} transition-transform ${expandedExample === idx ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Example Content */}
                  {expandedExample === idx && (
                    <div className={`border-t ${cardBorder}`}>
                      {/* Input */}
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm font-medium ${mutedColor}`}>Input</span>
                          <button
                            onClick={() => handleRun(example.input)}
                            disabled={running}
                            className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                          >
                            Run with this input
                          </button>
                        </div>
                        <pre className={`text-sm ${textColor} font-mono whitespace-pre-wrap bg-transparent`}>
                          {example.input}
                        </pre>
                      </div>

                      {/* Output */}
                      <div className="p-4">
                        <span className={`text-sm font-medium ${mutedColor} block mb-2`}>Sample Output</span>
                        <div className={`w-full rounded-lg overflow-x-auto max-h-96 ${darkMode ? 'prose prose-invert max-w-none' : 'prose max-w-none'} ${darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-50'} p-4`}>
                          <ReactMarkdown>{example.output}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Run Skill */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h2 className={`${textColor} font-semibold mb-4`}>Run This Skill</h2>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${mutedColor} mb-2`}>
                Describe what you want to accomplish
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`e.g., Help me with ${skillName.toLowerCase()} for my startup...`}
                className={`w-full px-4 py-3 rounded-lg border ${inputBorder} ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                rows={4}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleRun()}
                disabled={!input.trim() || running}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {running ? 'Running...' : 'Run Skill'}
              </button>
              <Link
                href="/skills"
                className={`px-6 py-2.5 rounded-lg font-medium border ${inputBorder} ${mutedColor} hover:${textColor} transition-colors`}
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
