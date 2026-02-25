'use client';

import { useState, useEffect } from 'react';
import SquadCard from '@/components/SquadCard';
import PaywallModal from '@/components/PaywallModal';
import ValidationPackDisplay from '@/components/ValidationPackDisplay';
import InstantScorecard from '@/components/InstantScorecard';
import DataSourceManager from '@/components/DataSourceManager';
import { signIn, signOut, useSession } from 'next-auth/react';

interface Squad {
  id: string;
  name: string;
  description: string;
  example_data_sources: string;
  skills: string[];
}

export default function Home() {
  const { data: session } = useSession();
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [jobOutput, setJobOutput] = useState<any>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [capturedEmail, setCapturedEmail] = useState<string | null>(null);
  const [paywallSkill, setPaywallSkill] = useState({ name: 'Validation Pack', id: 'validation-pack' });
  const [showSignIn, setShowSignIn] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [fullPackProgress, setFullPackProgress] = useState(0);
  
  // Qualifying questions flow
  const [showQuestions, setShowQuestions] = useState(false);
  const [qualifyingAnswers, setQualifyingAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isGeneratingValidation, setIsGeneratingValidation] = useState(false);
  const [qualifyingQuestions, setQualifyingQuestions] = useState<{id: string, question: string, placeholder: string}[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/squads')
      .then(res => res.json())
      .then(data => {
        setSquads(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load squads:', err);
        setLoading(false);
      });
  }, []);

  // Start validation - show qualifying questions first
  const handleStartValidation = async () => {
    if (!userInput.trim()) return;
    
    // Fetch dynamic questions from the API
    setQuestionsLoading(true);
    try {
      const response = await fetch('/api/run-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId: 'validation-pack',
          input: userInput,
          getQuestions: true, // Signal to just get questions
        }),
      });
      
      const data = await response.json();
      
      if (data.questions && Array.isArray(data.questions)) {
        setQualifyingQuestions(data.questions);
      } else {
        // Fallback to default questions
        setQualifyingQuestions([
          { id: 'problem', question: 'What specific problem does your idea solve?', placeholder: 'e.g., Helping dyslexic users spellcheck messages' },
          { id: 'existing', question: 'How do people solve this problem today?', placeholder: 'e.g., Using built-in spellcheck' },
          { id: 'uniqueness', question: 'What makes your solution different or better?', placeholder: 'e.g., Real-time integration' },
          { id: 'market', question: 'Who is your target customer?', placeholder: 'e.g., Dyslexia communities' },
          { id: 'revenue', question: 'How will you make money?', placeholder: 'e.g., Freemium model' }
        ]);
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      // Fallback questions
      setQualifyingQuestions([
        { id: 'problem', question: 'What specific problem does your idea solve?', placeholder: 'e.g., Helping dyslexic users spellcheck messages' },
        { id: 'existing', question: 'How do people solve this problem today?', placeholder: 'e.g., Using built-in spellcheck' },
        { id: 'uniqueness', question: 'What makes your solution different or better?', placeholder: 'e.g., Real-time integration' },
        { id: 'market', question: 'Who is your target customer?', placeholder: 'e.g., Dyslexia communities' },
        { id: 'revenue', question: 'How will you make money?', placeholder: 'e.g., Freemium model' }
      ]);
    }
    
    setQuestionsLoading(false);
    setShowQuestions(true);
    setCurrentQuestion(0);
    setQualifyingAnswers({});
  };

  const handleAnswerSubmit = async () => {
    if (currentQuestion < qualifyingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All 3 questions answered - generate validation pack
      setShowQuestions(false);
      generateValidationPack();
    }
  };

  const generateValidationPack = async () => {
    setIsGeneratingValidation(true);
    setIsExecuting(true);
    setJobOutput(null);
    setJobStatus(null);
    setValidationResult(null);

    try {
      const response = await fetch('/api/run-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId: 'validation-pack',
          input: userInput,
          answers: qualifyingAnswers,
          email: capturedEmail,
        }),
      });

      const data = await response.json();

      if (response.status === 403) {
        if (data.error === 'email_required' || data.error === 'limit_reached') {
          setShowPaywall(true);
          setIsExecuting(false);
          setIsGeneratingValidation(false);
          return;
        }
        if (data.error === 'upgrade_required') {
          setShowPaywall(true);
          setIsExecuting(false);
          setIsGeneratingValidation(false);
          return;
        }
      }

      // Handle instant response (new format)
      if (data.instant) {
        setValidationResult(data);
        setIsExecuting(false);
        setIsGeneratingValidation(false);
        
        // Start polling for full pack if job ID provided
        if (data.fullPackJobId) {
          setJobId(data.fullPackJobId);
          pollJobStatus(data.fullPackJobId);
        }
        return;
      }

      // Fallback to old format
      if (data.jobId) {
        setJobId(data.jobId);
        pollJobStatus(data.jobId);
      } else if (data.output) {
        // Direct output returned
        setJobOutput(data);
        setJobStatus('completed');
        setIsExecuting(false);
        setIsGeneratingValidation(false);
      }
    } catch (err) {
      console.error('Error starting skill:', err);
      setIsExecuting(false);
      setIsGeneratingValidation(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent, email?: string) => {
    e?.preventDefault();
    // Start with qualifying questions instead of immediate generation
    handleStartValidation();
  };

  const pollJobStatus = async (id: string) => {
    const poll = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const jobData = await res.json();
        setJobStatus(jobData.status);

        // Extract progress from error field (format: "Progress: X%")
        if (jobData.error) {
          const progressMatch = jobData.error.match(/Progress: (\d+)%/);
          if (progressMatch) {
            setFullPackProgress(parseInt(progressMatch[1], 10));
          }
        }

        if (jobData.status === 'completed') {
          setFullPackProgress(100);
          // Try to parse as JSON if it's the new format
          let displayOutput;
          try {
            displayOutput = JSON.parse(jobData.output);
          } catch {
            displayOutput = jobData.output;
          }
          setJobOutput(displayOutput);
          setIsExecuting(false);
        } else if (jobData.status === 'failed') {
          // Check if there are partial results despite failure
          if (jobData.output && jobData.output.includes('"success": true')) {
            setFullPackProgress(100);
            try {
              setJobOutput(JSON.parse(jobData.output));
            } catch {
              setJobOutput(jobData.output);
            }
          } else {
            setJobOutput(jobData.error || 'Skill execution failed');
          }
          setIsExecuting(false);
        } else {
          setTimeout(poll, 2000);
        }
      } catch (err) {
        console.error('Error polling job:', err);
        setTimeout(poll, 2000);
      }
    };
    poll();
  };

  const handleEmailSubmit = async (email: string) => {
    const response = await fetch('/api/capture-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.success) {
      setCapturedEmail(email);
      setShowPaywall(false);
      // Start validation with questions
      handleStartValidation();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              LaunchPadPM
            </h1>
            <nav className="flex items-center gap-4">
              <a href="#squads" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Squads
              </a>
              <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Skills
              </a>
              {session ? (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowPayment(true)}
                    className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-full hover:from-purple-700 hover:to-blue-700"
                  >
                    Upgrade to Pro
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {session.user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <button 
                      onClick={() => signOut()}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowSignIn(true)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Data Sources - Higher up */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Connect Your Data
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Add research, analytics, or credentials to enhance analysis
                </p>
              </div>
              <DataSourceManager />
            </div>
          </div>
        </section>

        {/* Hero / Conversation */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              What would you like to build?
            </h2>
            
            {/* Conversation Input */}
            <form className="relative" onSubmit={(e) => handleSubmit(e)}>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder='Try "I have an idea to validate" or "I want to build a SaaS product"'
                className="w-full px-4 py-3 pr-28 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isExecuting || questionsLoading}
                rows={2}
                style={{ minHeight: '60px' }}
              />
              <button 
                type="submit" 
                disabled={isExecuting || questionsLoading}
                className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {questionsLoading ? 'Loading...' : isExecuting ? 'Running...' : 'Validate Now'}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Or browse squads below to get started
              </p>
              <button 
                onClick={() => setShowPreview(true)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Preview Validation Pack →
              </button>
            </div>
          </div>

          {/* Loading State - Generating Questions */}
          {questionsLoading && !showQuestions && (
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analyzing your idea...</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Generating tailored questions to validate your concept</p>
              </div>
            </div>
          )}

          {/* Qualifying Questions Modal */}
          {showQuestions && (
            <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤔</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Devil's Advocate Review</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Let's dig deeper into your idea</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {qualifyingQuestions.length} questions
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {currentQuestion + 1}
                  </div>
                  <span className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {qualifyingQuestions.length}
                  </span>
                </div>
                
                <label className="block text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {qualifyingQuestions[currentQuestion].question}
                </label>
                
                <textarea
                  value={qualifyingAnswers[qualifyingQuestions[currentQuestion].id] || ''}
                  onChange={(e) => setQualifyingAnswers({
                    ...qualifyingAnswers,
                    [qualifyingQuestions[currentQuestion].id]: e.target.value
                  })}
                  placeholder={qualifyingQuestions[currentQuestion].placeholder}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    if (confirm('Skip questions? Your validation will have less context and may be less accurate.')) {
                      setShowQuestions(false);
                      generateValidationPack();
                    }
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Skip all questions
                </button>
                <button
                  onClick={handleAnswerSubmit}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
                >
                  {currentQuestion < qualifyingQuestions.length - 1 ? 'Next Question' : 'Generate Report'}
                </button>
              </div>
            </div>
          )}

          {/* Loading State - Generating Validation */}
          {isGeneratingValidation && !jobStatus && !jobOutput && (
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Validating your idea...</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Running AI analysis and generating your validation report</p>
              </div>
            </div>
          )}

          {/* Results Display */}
          {(jobStatus || jobOutput) && (
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      {jobStatus === 'completed' ? '🎉 Your Validation Pack is Ready!' : jobStatus === 'failed' ? '❌ Error' : '⏳ Processing...'}
                    </h3>
                    <p className="text-blue-100 text-sm">AI-powered validation analysis</p>
                  </div>
                  {jobStatus === 'completed' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const content = typeof jobOutput === 'string' ? jobOutput : JSON.stringify(jobOutput, null, 2);
                          const blob = new Blob([content], { type: 'text/markdown' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `validation-pack-${Date.now()}.md`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-1"
                      >
                        ⬇ Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {validationResult ? (
                  <InstantScorecard 
                    result={validationResult} 
                    userInput={userInput || 'Your idea'}
                    onEmailCapture={(email) => setCapturedEmail(email)}
                    onUpgrade={() => setShowPayment(true)}
                    progress={fullPackProgress}
                  />
                ) : jobOutput ? (
                  <ValidationPackDisplay 
                    output={jobOutput} 
                    userInput={userInput || 'Your idea'} 
                  />
                ) : jobStatus === 'failed' ? (
                  <div className="text-center py-8">
                    <div className="text-red-500 mb-4">⚠️</div>
                    <p className="text-red-600 dark:text-red-400 mb-4">Something went wrong. Please try again.</p>
                    <button 
                      onClick={() => {
                        setJobOutput(null);
                        setJobStatus(null);
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                      <p className="text-gray-500 dark:text-gray-400">Running 7 validation skills...</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">This usually takes 10-20 seconds</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Squads Grid */}
        <section id="squads" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Squads
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {loading ? 'Loading...' : `${squads.length} squads available`}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading squads...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {squads.map((squad) => (
                <SquadCard
                  key={squad.id}
                  id={squad.id}
                  name={squad.name}
                  description={squad.description}
                exampleDataSources={squad.example_data_sources}
                skillCount={squad.skills.length}
              />
            ))}
          </div>
          )}
        </section>

        {/* Skills Preview */}
        <section id="skills" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Skills Library
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Browse {squads.reduce((acc, s) => acc + s.skills.length, 0)}+ skills across {squads.length} squads.
              Click on any squad above to see its skills.
            </p>
            <a href="#squads" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              View all squads →
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            LaunchPadPM - AI-Powered Product Development Platform
          </p>
        </div>
      </footer>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        skillName={paywallSkill.name}
        skillId={paywallSkill.id}
        onEmailSubmit={handleEmailSubmit}
      />

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  What's Included in the Validation Pack?
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Requirements Elicitation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Extract and document functional requirements from your idea</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">User Persona Creation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Build detailed user personas to understand target customers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Competitor Research</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Map competitive landscape and identify market gaps</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Business Case Modeling</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Model TAM/SAM/SOM, revenue scenarios, and unit economics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Devil's Advocate</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Stress-test assumptions and model customer objections</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm flex-shrink-0">6</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Feature Prioritization</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Score features using RICE framework into build/validate/park tiers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm flex-shrink-0">7</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">User Journey Mapping</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Map MVP features through user journey stages</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Your Deliverable Includes:</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>✓ GO/PAUSE/KILL Validation Scorecard</li>
                  <li>✓ Importance vs. Proof Matrix</li>
                  <li>✓ Risk-Value Assessment</li>
                  <li>✓ Impact-Effort Roadmap</li>
                  <li>✓ Competitive Positioning Map</li>
                  <li>✓ MVP Scope Definition</li>
                </ul>
              </div>

              <div className="flex gap-4">
                {capturedEmail ? (
                  <button
                    onClick={handleStartValidation}
                    disabled={isExecuting}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
                  >
                    {isExecuting ? 'Generating...' : 'Generate My Validation Pack'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowPreview(false);
                      setShowPaywall(true);
                    }}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Get My Validation Pack - Free
                  </button>
                )}
              </div>
              
              {capturedEmail && (
                <p className="mt-3 text-center text-sm text-gray-500">
                  Signed in as {capturedEmail}
                </p>
              )}
              
              <p className="mt-4 text-center text-sm text-gray-500">
                Or <button onClick={() => { setShowPreview(false); setShowSignIn(true); }} className="text-blue-600 hover:underline">sign in</button> if you're already a member
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <button
                onClick={() => setShowSignIn(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Continue with Google</span>
              </button>

              <button 
                onClick={() => signIn('apple', { callbackUrl: '/' })}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Continue with Apple</span>
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-500 mb-4">Or enter your email</p>
              <form onSubmit={(e) => { e.preventDefault(); setShowSignIn(false); setShowPaywall(true); }}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full mt-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Continue with Email
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upgrade to Pro
                </h2>
                <p className="text-sm text-gray-500 mt-1">Unlock unlimited access</p>
              </div>
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">Pro Plan</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">$29<span className="text-sm font-normal text-gray-500">/mo</span></span>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Unlimited skill executions
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  All 78+ skills unlocked
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Export to Notion
                </li>
              </ul>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVC</label>
                  <input type="text" placeholder="123" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <button type="submit" className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 font-medium">
                Start Pro Trial
              </button>
              <p className="text-xs text-center text-gray-500">7-day free trial, then $29/mo. Cancel anytime.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
