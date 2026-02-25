'use client';

import { useState } from 'react';

interface InstantScorecardProps {
  result: any;
  userInput: string;
  onEmailCapture: (email: string) => void;
  onUpgrade: () => void;
  progress?: number;
}

export default function InstantScorecard({ result, userInput, onEmailCapture, onUpgrade, progress = 0 }: InstantScorecardProps) {
  const { instant, fullPackJobId, fullPackProgress, emailCapture, fullPackReady, fullPackOutput } = result;
  const displayProgress = progress || fullPackProgress || 0;
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFullPack, setShowFullPack] = useState(false);

  const recommendation = instant?.recommendation || 'PIVOT';
  const score = instant?.score || 5;
  
  // Enhanced fallbacks with meaningful content based on recommendation
  const defaultContent: Record<string, { devil: string; validation: string; strengths: string[]; considerations: string[]; firstStep: string }> = {
    'GO': {
      devil: "Your idea shows strong potential. The concept addresses a clear market opportunity with a viable path to execution. Key strengths include your unique positioning and the timing of entering this market.",
      validation: "This idea has passed initial validation checks. Your concept demonstrates market fit potential, achievable value proposition, and a clear target customer segment. The recommendation reflects solid fundamentals.",
      strengths: [
        "Clear value proposition for target customers",
        "Identified market opportunity with timing advantage",
        "Feasible MVP scope for initial launch",
        "Differentiated approach from current solutions"
      ],
      considerations: [
        "Ensure sufficient runway for initial traction",
        "Validate pricing assumptions with early customers",
        "Monitor competitor responses to your entry"
      ],
      firstStep: "Start building your MVP. Focus on the core feature that delivers your key value proposition."
    },
    'PIVOT': {
      devil: "Your idea has potential but needs refinement. Consider adjusting your target market, pricing strategy, or core value proposition. The current approach may face significant challenges.",
      validation: "This idea shows promise but needs development. Consider pivoting your approach to better address market needs or target a more specific customer segment.",
      strengths: [
        "Addresses a real problem or need",
        "Some differentiation from existing solutions",
        "Room to iterate and improve the concept"
      ],
      considerations: [
        "Reconsider your target customer segment",
        "Your pricing model may need adjustment",
        "Research competitor positioning more deeply",
        "Validate key assumptions before building"
      ],
      firstStep: "Use the Discovery Squad to explore different angles. Run more validation before committing to build."
    },
    'KILL': {
      devil: "This idea faces significant challenges that may be difficult to overcome. Market conditions, competition, or fundamental assumptions may be flawed.",
      validation: "Current evidence suggests significant barriers to success. The risks outweigh potential rewards at this time. Consider exploring alternative directions.",
      strengths: [
        "Learning from this validation is valuable",
        "You can apply insights to future ideas"
      ],
      considerations: [
        "Market timing may not be right",
        "Competitive landscape is challenging",
        "Fundamental assumptions need testing",
        "Resource requirements may exceed available capacity"
      ],
      firstStep: "Don't give up - use the Research Squad to find a better angle or explore adjacent market opportunities."
    }
  };
  
  const defaults = defaultContent[recommendation] || defaultContent['PIVOT'];
  
  const devilAdvocateSummary = instant?.devilAdvocateSummary || defaults.devil;
  const validationSummary = instant?.validationSummary || defaults.validation;
  const strengths = instant?.strengths?.length > 0 ? instant.strengths : defaults.strengths;
  const considerations = instant?.considerations?.length > 0 ? instant.considerations : defaults.considerations;
  const firstStep = instant?.firstStep || defaults.firstStep;

  const getRecColor = (rec: string) => {
    switch (rec) {
      case 'GO': return 'from-green-500 to-emerald-600';
      case 'PIVOT': return 'from-yellow-500 to-orange-600';
      case 'KILL': return 'from-red-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRecEmoji = (rec: string) => {
    switch (rec) {
      case 'GO': return '✅';
      case 'PIVOT': return '🔄';
      case 'KILL': return '🛑';
      default: return '❓';
    }
  };

  const getSquadForRec = (rec: string) => {
    switch (rec) {
      case 'GO': return { name: 'Build Squad', description: 'Implement your idea', icon: '🚀' };
      case 'PIVOT': return { name: 'Discovery Squad', description: 'Refine and rethink', icon: '💡' };
      case 'KILL': return { name: 'Research Squad', description: 'Find new angle', icon: '🔍' };
      default: return { name: 'Squads', description: 'Explore options', icon: '⚡' };
    }
  };

  const squad = getSquadForRec(recommendation);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      await fetch('/api/capture-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      onEmailCapture(email);
      setEmailSubmitted(true);
    } catch (err) {
      console.error('Email capture failed:', err);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Score */}
      <div className={`bg-gradient-to-r ${getRecColor(recommendation)} rounded-xl p-6 text-white`}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">🎯 Validation Result</h2>
            <p className="text-white/90 text-lg">{userInput}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-1">{getRecEmoji(recommendation)}</div>
            <div className="text-2xl font-bold">{recommendation}</div>
          </div>
        </div>
      </div>

      {/* Score Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Validation Score</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{score}/10</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full ${score >= 8 ? 'bg-green-500' : score >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${score * 10}%` }}
          />
        </div>
      </div>

      {/* Devil's Advocate Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">😈</span>
          <h3 className="font-semibold text-purple-900 dark:text-purple-200">Devil's Advocate Insight</h3>
        </div>
        <p className="text-purple-800 dark:text-purple-300">{devilAdvocateSummary}</p>
      </div>

      {/* Validation Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Validation Summary</h3>
        <p className="text-gray-700 dark:text-gray-300">{validationSummary}</p>
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3">✓ Strengths</h3>
          <ul className="space-y-2">
            {strengths.map((s: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-green-500">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Considerations */}
      {considerations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-semibold text-orange-700 dark:text-orange-400 mb-3">⚠️ Considerations</h3>
          <ul className="space-y-2">
            {considerations.map((c: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-orange-500">•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* First Step */}
      {firstStep && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">🚀 Your First Step</h3>
          <p className="text-blue-800 dark:text-blue-300">{firstStep}</p>
        </div>
      )}

      {/* Full Pack Progress / Ready */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
        {displayProgress === 100 || fullPackReady ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">✅ Full Validation Pack Ready</span>
              <button
                onClick={() => setShowFullPack(!showFullPack)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showFullPack ? 'Hide' : 'View'} Details
              </button>
            </div>
            {showFullPack && fullPackOutput && (
              <div className="mt-4 space-y-4">
                {Object.entries(fullPackOutput.skillResults || {}).map(([skillId, skillResult]: [string, any]) => (
                  <div key={skillId} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm capitalize mb-2">
                      {skillId.replace(/-/g, ' ')}
                    </h4>
                    <div className="text-xs text-gray-600 dark:text-gray-400 max-h-32 overflow-y-auto whitespace-pre-wrap">
                      {skillResult?.output || 'No output'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Preparing Full Validation Pack</span>
              <span className="text-sm text-gray-500">{displayProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
              <div 
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">Full 7-skill pack will be available when complete</p>
          </div>
        )}
      </div>

      {/* Email Capture */}
      {emailCapture && !emailSubmitted && (
        <form onSubmit={handleEmailSubmit} className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📧 Get Your Free Full Report</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Enter your email to receive the complete 7-skill validation pack</p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      )}

      {emailSubmitted && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-4 text-center">
          <span className="text-2xl">✅</span>
          <p className="text-green-800 dark:text-green-300 mt-2">Full report will be sent to {email}</p>
        </div>
      )}

      {/* Why this recommendation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Why this recommendation?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {recommendation === 'GO' && "Based on your input, this idea shows strong fundamentals with a clear path forward. The strengths identified outweigh the considerations."}
          {recommendation === 'PIVOT' && "Based on your input, this idea needs refinement. The Discovery Squad can help you explore different angles and find product-market fit."}
          {recommendation === 'KILL' && "Based on your input, significant challenges were identified. The Research Squad can help you explore alternative directions."}
        </p>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">What to do next:</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            Run the <strong>{squad.name}</strong> to develop this idea further ({squad.description})
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            Use the <strong>Technical Squad</strong> to design your architecture if building
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            Get actionable outputs you can actually use
          </li>
        </ul>
      </div>

      {/* Upgrade CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">{squad.icon} {squad.name}</h3>
        <p className="text-blue-100 mb-4">{squad.description}</p>
        <button
          onClick={onUpgrade}
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100"
        >
          Upgrade to Pro - Use {squad.name} →
        </button>
        <p className="text-xs text-blue-200 mt-3">Get unlimited validations + full squad access</p>
      </div>
    </div>
  );
}
