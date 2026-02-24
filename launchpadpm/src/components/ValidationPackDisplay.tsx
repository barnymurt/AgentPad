'use client';

import { useState } from 'react';

interface ValidationPackDisplayProps {
  output: any;
  userInput: string;
}

export default function ValidationPackDisplay({ output, userInput }: ValidationPackDisplayProps) {
  const [showFullReport, setShowFullReport] = useState(false);

  // Check if output is the new structured format or old string format
  const isStructured = output && typeof output === 'object' && output.overview;
  
  if (isStructured) {
    return <StructuredValidationPack output={output} userInput={userInput} />;
  }
  
  // Fallback for old string format
  return <LegacyValidationPack output={output} userInput={userInput} />;
}

function StructuredValidationPack({ output, userInput }: { output: any; userInput: string }) {
  const { overview, insights, devilAdvocate, nextSteps } = output;
  
  return (
    <div className="space-y-6">
      {/* Header with Score */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">🎯 Validation Pack</h2>
            <p className="text-blue-100 text-lg">{userInput}</p>
            <p className="text-blue-200 text-sm mt-2">Generated: {output.timestamp || new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-1">{overview.recommendationEmoji}</div>
            <div className="text-2xl font-bold">{overview.recommendation}</div>
          </div>
        </div>
      </div>

      {/* Score Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Validation Score</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{overview.score}/100</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full ${overview.score >= 70 ? 'bg-green-500' : overview.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${overview.score}%` }}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl mb-1">👥</div>
          <div className="text-xs text-gray-500 uppercase">Target</div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">{overview.target}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl mb-1">🏭</div>
          <div className="text-xs text-gray-500 uppercase">Industry</div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">{overview.industry}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl mb-1">📱</div>
          <div className="text-xs text-gray-500 uppercase">Product</div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">{overview.product}</div>
        </div>
      </div>

      {/* Your Answers */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <h3 className="font-semibold text-gray-900 dark:text-white">Your Answers</h3>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Problem</div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{insights.problem}</p>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Existing Solutions</div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{insights.existingSolution}</p>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Your Edge</div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{insights.uniqueness}</p>
          </div>
        </div>
      </div>

      {/* Devil's Advocate - Risks */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800 overflow-hidden">
        <div className="bg-red-100 dark:bg-red-900/30 px-4 py-3 border-b border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">😈</span>
            <h3 className="font-semibold text-red-900 dark:text-red-200">Devil's Advocate Review</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Critical questions to stress-test your idea:</p>
          <div className="space-y-2">
            {devilAdvocate.challengingQuestions.map((q: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-red-500 font-bold">?</span>
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-green-100 dark:bg-green-900/30 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="font-semibold text-green-900 dark:text-green-200">Opportunities</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {devilAdvocate.opportunities.map((opp: string, i: number) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span>
              <span>{opp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <h3 className="font-semibold text-gray-900 dark:text-white">Next Steps</h3>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {nextSteps.map((step: string, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-medium flex-shrink-0">
                {i + 1}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scorecard */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">Validation Scorecard</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className={`text-center p-4 rounded-lg ${overview.recommendation === 'GO' ? 'bg-white/30' : 'bg-white/10'}`}>
            <div className="text-3xl mb-1">✅</div>
            <div className="font-semibold">GO</div>
            <p className="text-xs text-blue-100 mt-1">Ready to build</p>
          </div>
          <div className={`text-center p-4 rounded-lg ${overview.recommendation === 'PAUSE' ? 'bg-white/30' : 'bg-white/10'}`}>
            <div className="text-3xl mb-1">⏸️</div>
            <div className="font-semibold">PAUSE</div>
            <p className="text-xs text-blue-100 mt-1">Need validation</p>
          </div>
          <div className={`text-center p-4 rounded-lg ${overview.recommendation === 'KILL' ? 'bg-white/30' : 'bg-white/10'}`}>
            <div className="text-3xl mb-1">❌</div>
            <div className="font-semibold">KILL</div>
            <p className="text-xs text-blue-100 mt-1">Reconsider</p>
          </div>
        </div>
      </div>

      {/* Download CTA */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center">
        <div className="text-4xl mb-3">📥</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Get Your Full Validation Pack</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Download the complete report with all 7 skills deeply analyzed</p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700">
          Enter Email to Download
        </button>
      </div>
    </div>
  );
}

function LegacyValidationPack({ output, userInput }: { output: string; userInput: string }) {
  // Fallback for old string format - show as-is
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">{output}</pre>
    </div>
  );
}
