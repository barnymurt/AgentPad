'use client';

import { useState } from 'react';

interface ValidationPackData {
  userInput: string;
  target?: string;
  industry?: string;
  productType?: string;
}

interface ValidationPackDisplayProps {
  output: string;
  userInput: string;
}

export default function ValidationPackDisplay({ output, userInput }: ValidationPackDisplayProps) {
  const [showFullReport, setShowFullReport] = useState(false);

  // Parse the output into sections
  const sections = parseOutput(output);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">🎯 Validation Pack</h2>
            <p className="text-blue-100 text-lg">{userInput}</p>
            <p className="text-blue-200 text-sm mt-2">Generated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-white font-semibold">✅ Complete</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <div className="text-2xl mb-1">👥</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Target</div>
          <div className="font-semibold text-gray-900 dark:text-white">{sections.target || 'General Consumers'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <div className="text-2xl mb-1">🏭</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Industry</div>
          <div className="font-semibold text-gray-900 dark:text-white">{sections.industry || 'Various'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm col-span-2 md:col-span-1">
          <div className="text-2xl mb-1">📱</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Product</div>
          <div className="font-semibold text-gray-900 dark:text-white">{sections.productType || 'Solution'}</div>
        </div>
      </div>

      {/* Requirements Card */}
      <SectionCard icon="📋" title="Requirements">
        <p className="text-gray-700 dark:text-gray-300 mb-4">{userInput}</p>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Assumptions</h4>
            <ul className="space-y-1">
              {sections.requirements?.assumptions?.map((a: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{a}</span>
                </li>
              ))}
              {(!sections.requirements?.assumptions || sections.requirements.assumptions.length === 0) && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>This problem is painful enough to pay for</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Your solution actually solves it</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Target users will adopt new technology</span>
                  </li>
                </>
              )}
            </ul>
          </div>
          {sections.requirements?.mvp && (
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">MVP Features</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{sections.requirements.mvp}</p>
            </div>
          )}
        </div>
      </SectionCard>

      {/* User Persona Card */}
      <SectionCard icon="👤" title="User Persona">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <span className="font-semibold">Primary User:</span> {sections.target || 'General Consumers'}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Goals</h4>
            <ul className="space-y-1">
              {sections.persona?.goals?.map((g: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{g}</span>
                </li>
              ))}
              {(!sections.persona?.goals || sections.persona.goals.length === 0) && (
                <li className="text-sm text-gray-400 italic">Define through user research</li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Pain Points</h4>
            <ul className="space-y-1">
              {sections.persona?.painPoints?.map((p: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-red-500 mt-1">•</span>
                  <span>{p}</span>
                </li>
              ))}
              {(!sections.persona?.painPoints || sections.persona.painPoints.length === 0) && (
                <li className="text-sm text-gray-400 italic">Discover through user interviews</li>
              )}
            </ul>
          </div>
        </div>
        {sections.persona?.quote && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{sections.persona.quote}"</p>
          </div>
        )}
      </SectionCard>

      {/* Competition Card */}
      <SectionCard icon="🏢" title="Competition">
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Direct Competitors</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {sections.competition?.competitors || 'Research competitors in your space'}
          </p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Your Unique Position</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {sections.competition?.uniquePosition || 'Define what gap your idea fills'}
          </p>
        </div>
      </SectionCard>

      {/* Business Case Card */}
      <SectionCard icon="💰" title="Business Case">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">TAM</div>
            <div className="font-semibold text-gray-900 dark:text-white">{sections.business?.tam || '$[Estimate]'}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">SAM</div>
            <div className="font-semibold text-gray-900 dark:text-white">{sections.business?.sam || '$[Estimate]'}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">SOM</div>
            <div className="font-semibold text-gray-900 dark:text-white">{sections.business?.som || '$[Estimate]'}</div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Revenue Model</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {sections.business?.revenue || 'Define pricing strategy'}
          </p>
        </div>
      </SectionCard>

      {/* Risk Analysis Card */}
      <SectionCard icon="⚠️" title="Risk Analysis">
        <div className="space-y-3 mb-4">
          {sections.risks?.map((r: string, i: number) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-orange-500 font-bold">{i + 1}.</span>
              <span>{r}</span>
            </div>
          ))}
          {(!sections.risks || sections.risks.length === 0) && (
            <>
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-orange-500 font-bold">1.</span>
                <span>Problem isn't real - Validate with user interviews</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-orange-500 font-bold">2.</span>
                <span>Can't reach customers - Test acquisition channels</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-orange-500 font-bold">3.</span>
                <span>Competition - Define your moat</span>
              </div>
            </>
          )}
        </div>
        {sections.riskKillCondition && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
            <span className="text-sm text-red-700 dark:text-red-300">Kill Condition: {sections.riskKillCondition}</span>
          </div>
        )}
      </SectionCard>

      {/* Feature Priority Card */}
      <SectionCard icon="⭐" title="Feature Priority">
        <div className="mb-4">
          <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">MVP (Build First)</h4>
          <ul className="space-y-1">
            {sections.priority?.mvp?.map((f: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-green-500">✓</span>
                <span>{f}</span>
              </li>
            ))}
            {(!sections.priority?.mvp || sections.priority.mvp.length === 0) && (
              <li className="text-sm text-gray-400 italic">Define your MVP features</li>
            )}
          </ul>
        </div>
        {sections.priority?.phase2 && (
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Phase 2</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{sections.priority.phase2}</p>
          </div>
        )}
      </SectionCard>

      {/* User Journey Card */}
      <SectionCard icon="🗺️" title="User Journey">
        <div className="space-y-4">
          {['Awareness', 'Consideration', 'Decision', 'Onboarding', 'Retention'].map((stage, i) => {
            const stageData = sections.journey?.[stage.toLowerCase()];
            return (
              <div key={stage} className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{stage}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stageData || `Define ${stage.toLowerCase()} stage`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Scorecard - EMPHASIZED */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">✅ Validation Scorecard</h2>
          <p className="text-blue-100">Based on your inputs</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-3xl mb-1">✅</div>
            <div className="font-semibold">GO</div>
            <p className="text-xs text-blue-100 mt-1">Ready to build</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-3xl mb-1">⏸️</div>
            <div className="font-semibold">PAUSE</div>
            <p className="text-xs text-blue-100 mt-1">Need validation</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-3xl mb-1">❌</div>
            <div className="font-semibold">KILL</div>
            <p className="text-xs text-blue-100 mt-1">Reconsider</p>
          </div>
        </div>

        <div className="bg-white/20 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2">Recommendation</h3>
          <p className="text-blue-100">Complete the action items below to finalize your scorecard</p>
        </div>

        <div className="space-y-2">
          {['Interview 5 target users', 'Build landing page', 'Test with $100 in ads', 'Get 10 pre-sales', 'Define MVP features', 'Deep competitor research'].map((action, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
              <div className="w-6 h-6 border-2 border-white/30 rounded flex-shrink-0"></div>
              <span className="text-sm">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Download CTA */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center">
        <div className="text-4xl mb-3">📥</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Get Your Full Validation Pack</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Download the complete report with templates and frameworks</p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700">
          Enter Email to Download
        </button>
      </div>
    </div>
  );
}

// Section Card Component
function SectionCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// Parse the raw output into structured data
function parseOutput(output: string) {
  const sections: any = {};
  
  // Try to extract target, industry, product from the output
  const targetMatch = output.match(/Target Audience.*?\|.*?(\w+)/i) || output.match(/For Who\?\s*(\w+)/i);
  if (targetMatch) sections.target = targetMatch[1];
  
  const industryMatch = output.match(/Industry.*?\|.*?(\w+)/i);
  if (industryMatch) sections.industry = industryMatch[1];
  
  const productMatch = output.match(/Product Type.*?\|.*?(\w+)/i);
  if (productMatch) sections.productType = productMatch[1];
  
  // Parse Requirements section
  if (output.includes('# 1. Requirements')) {
    sections.requirements = {
      assumptions: [],
      mvp: ''
    };
  }
  
  // Parse sections
  sections.target = extractSection(output, 'Target Audience') || 'General Consumers';
  sections.industry = extractSection(output, 'Industry') || 'Various Industries';
  sections.productType = extractSection(output, 'Product Type') || 'Solution';
  
  return sections;
}

function extractSection(output: string, sectionName: string): string {
  const lines = output.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(sectionName)) {
      // Try to get the value from table format
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if (lines[j].includes('|') && lines[j].includes(sectionName)) {
          const parts = lines[j].split('|').filter(p => p.trim());
          if (parts.length >= 2) {
            return parts[parts.length - 1].trim();
          }
        }
      }
    }
  }
  return '';
}
