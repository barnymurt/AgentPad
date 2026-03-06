'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';
import StyledOutput from './StyledOutput';
import { getSkillCategory, getSkillConfig, CATEGORY_CONFIG } from '@/lib/skillOutputTypes';

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
  lifecycle?: string;
  category?: string;
  specialization?: string;
  relatedBefore?: string[];
  relatedAfter?: string[];
  outputSummary?: string;
  nextSteps?: string;
  examples?: SkillExamples;
}

export default function SkillDetailPage() {
  const params = useParams();
  const skillId = params.skill as string;
  const { isDarkMode } = useAppLayout();
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

  if (loading) {
    return (
      <AppLayout title="Loading...">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </AppLayout>
    );
  }

  if (!skill) {
    return (
      <AppLayout title="Skill Not Found">
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">Skill "{skillId}" not found</p>
          <Link href="/skills" className="text-blue-500 hover:underline">
            Back to Skills
          </Link>
        </div>
      </AppLayout>
    );
  }

  const skillName = skill.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = isDarkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const inputBg = isDarkMode ? 'bg-[#0f0f1a]' : 'bg-gray-100';
  const inputBorder = isDarkMode ? 'border-[#2a2a3e]' : 'border-gray-300';

  const lifecycleConfig: Record<string, { label: string; color: string; description: string }> = {
    discovery: { label: 'Discovery', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', description: 'Understand your users and market' },
    build: { label: 'Build', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', description: 'Create and develop your product' },
    launch: { label: 'Launch', color: 'bg-green-500/20 text-green-400 border-green-500/30', description: 'Get your product to market' },
    iterate: { label: 'Iterate', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', description: 'Measure and improve' },
  };

  const categoryConfig: Record<string, { label: string; icon: React.ReactNode }> = {
    product: { label: 'Product', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    design: { label: 'Design', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
    research: { label: 'Research', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    engineering: { label: 'Engineering', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
    growth: { label: 'Growth', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
  };

  const specializationConfig: Record<string, { label: string; color: string }> = {
    frontend: { label: 'Frontend', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
    backend: { label: 'Backend', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    qa: { label: 'QA', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    fullstack: { label: 'Full-Stack', color: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
  };

  const formatSkillName = (id: string) => id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const lifecycle = skill.lifecycle || 'build';
  const category = skill.category || 'product';
  const specialization = skill.specialization || '';
  const lifecycleInfo = lifecycleConfig[lifecycle] || lifecycleConfig.build;
  const categoryInfo = categoryConfig[category] || categoryConfig.product;
  const specializationInfo = specializationConfig[specialization];

  return (
    <AppLayout title={skillName}>
      <div className="space-y-6">
        {/* Skill Info */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h2 className={`${textColor} font-semibold text-xl mb-2`}>{skillName}</h2>
          <p className={mutedColor}>{skill.description}</p>
        </div>

        {/* Run This Skill */}
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

        {/* Combined How to Use This Skill Panel */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h3 className={`${textColor} font-semibold text-lg mb-4 flex items-center gap-2`}>
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to Use This Skill
          </h3>
          
          {/* Lifecycle & Category Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${lifecycleInfo.color}`}>
              {lifecycleInfo.label} Phase
            </span>
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-[#2a2a3e] border-[#3a3a4e] text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'} flex items-center gap-1.5`}>
              {categoryInfo.icon}
              {categoryInfo.label}
            </span>
            {specializationInfo && (
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${specializationInfo.color}`}>
                {specializationInfo.label}
              </span>
            )}
          </div>
          
          <p className={`${mutedColor} text-sm mb-6`}>
            {lifecycleInfo.description}
          </p>

          {/* When to Use This Skill */}
          {skill.examples?.useWhen && skill.examples?.useWhen.length > 0 && (
            <div className="mb-6">
              <h4 className={`text-sm font-medium ${textColor} mb-2`}>When to use this skill:</h4>
              <div className="flex flex-wrap gap-2">
                {skill.examples?.useWhen?.map((use, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {use}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* What this skill outputs */}
          {skill.outputSummary && (
            <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-[#0f0f1a]' : 'bg-gray-50'}`}>
              <h4 className={`text-sm font-medium ${textColor} mb-1`}>What this skill outputs:</h4>
              <p className={`${mutedColor} text-sm mb-3`}>{skill.outputSummary}</p>
              
              {/* Output format hint */}
              {(() => {
                const category = getSkillCategory(skillId);
                const config = getSkillConfig(skillId);
                return (
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300`}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300`}>
                      Primary: {config.primaryOutput}
                    </span>
                    {config.secondaryOutputs.map((out) => (
                      <span key={out} className={`px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400`}>
                        {out}
                      </span>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Related Skills */}
          {(skill.relatedBefore?.length || skill.relatedAfter?.length) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {skill.relatedBefore?.length ? (
                <div>
                  <h4 className={`text-sm font-medium ${textColor} mb-2`}>Run this before:</h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.relatedBefore.map((sid) => (
                      <Link
                        key={sid}
                        href={`/skills/${sid}`}
                        className={`px-2.5 py-1 rounded-lg text-xs border transition-colors ${
                          isDarkMode ? 'bg-[#2a2a3e] border-[#3a3a4e] text-gray-300 hover:border-blue-500 hover:text-blue-400' : 'bg-gray-100 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                        }`}
                      >
                        {formatSkillName(sid)}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
              {skill.relatedAfter?.length ? (
                <div>
                  <h4 className={`text-sm font-medium ${textColor} mb-2`}>Run this after:</h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.relatedAfter.map((sid) => (
                      <Link
                        key={sid}
                        href={`/skills/${sid}`}
                        className={`px-2.5 py-1 rounded-lg text-xs border transition-colors ${
                          isDarkMode ? 'bg-[#2a2a3e] border-[#3a3a4e] text-gray-300 hover:border-blue-500 hover:text-blue-400' : 'bg-gray-100 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                        }`}
                      >
                        {formatSkillName(sid)}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Workflow */}
          {skill.examples?.workflow && (
            <div className="mb-6">
              <h4 className={`text-sm font-medium ${textColor} mb-3`}>Workflow:</h4>
              {Array.isArray(skill.examples?.workflow) ? (
                <div className="flex flex-nowrap justify-between items-stretch gap-2 overflow-x-auto pb-2 w-full">
                      {skill.examples?.workflow?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center flex-1 min-w-0">
                      <div className={`${isDarkMode ? 'bg-[#0f0f1a]' : 'bg-gray-100'} rounded-lg p-3 w-full text-center`}>
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-medium flex-shrink-0">
                            {idx + 1}
                          </div>
                          <span className="font-medium text-purple-400 text-xs truncate">{item.step}</span>
                        </div>
                        <p className={`text-xs ${mutedColor} line-clamp-2`}>{item.description}</p>
                      </div>
                      {idx < (skill.examples?.workflow?.length || 0) - 1 && (
                        <svg className={`w-4 h-4 ${mutedColor} mx-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  {skill.examples?.workflow?.split(' → ').map((step, idx, arr) => (
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

          {/* Next Steps */}
          {skill.nextSteps && (
            <div className={`pt-4 border-t ${cardBorder}`}>
              <h4 className={`text-sm font-medium ${textColor} mb-1`}>Next steps:</h4>
              <p className={`${mutedColor} text-sm`}>{skill.nextSteps}</p>
            </div>
          )}
        </div>

        {/* Examples */}
        {skill.examples?.examples && skill.examples?.examples.length > 0 && (
          <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <h3 className={`${textColor} font-semibold mb-4`}>Examples</h3>
            <div className="space-y-4">
              {skill.examples?.examples?.map((example, idx) => (
                <div key={idx} className={`border ${cardBorder} rounded-lg overflow-hidden`}>
                  <button
                    onClick={() => setExpandedExample(expandedExample === idx ? null : idx)}
                    className={`w-full p-4 flex items-center justify-between ${isDarkMode ? 'hover:bg-[#252540]' : 'hover:bg-gray-50'} transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${isDarkMode ? 'bg-[#0f0f1a]' : 'bg-gray-200'} ${textColor}`}>
                        Example {idx + 1}
                      </span>
                      {example.context && (
                        <span className={`text-sm ${mutedColor}`}>{example.context}</span>
                      )}
                    </div>
                    <svg className={`w-5 h-5 ${mutedColor} transition-transform ${expandedExample === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {expandedExample === idx && (
                    <div className={`border-t ${cardBorder}`}>
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

                      <div className="p-4">
                        <span className={`text-sm font-medium ${mutedColor} block mb-2`}>Sample Output</span>
                        <div className={`w-full rounded-lg overflow-x-auto max-h-96 ${isDarkMode ? 'bg-[#0f0f1a]' : 'bg-gray-50'} p-4`}>
                          <StyledOutput content={example.output} skillId={skillId} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
