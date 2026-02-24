'use client';

import { useState, useEffect } from 'react';
import SquadCard from '@/components/SquadCard';
import PaywallModal from '@/components/PaywallModal';

interface Squad {
  id: string;
  name: string;
  description: string;
  example_data_sources: string;
  skills: string[];
}

export default function Home() {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [jobOutput, setJobOutput] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallSkill, setPaywallSkill] = useState({ name: 'Validation Pack', id: 'validation-pack' });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsExecuting(true);
    setJobOutput(null);
    setJobStatus(null);

    try {
      const response = await fetch('/api/run-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId: 'validation-pack',
          input: userInput,
        }),
      });

      const data = await response.json();

      if (response.status === 403) {
        if (data.error === 'email_required' || data.error === 'limit_reached') {
          setShowPaywall(true);
          setIsExecuting(false);
          return;
        }
        if (data.error === 'upgrade_required') {
          setShowPaywall(true);
          setIsExecuting(false);
          return;
        }
      }

      if (data.jobId) {
        setJobId(data.jobId);
        pollJobStatus(data.jobId);
      }
    } catch (err) {
      console.error('Error starting skill:', err);
      setIsExecuting(false);
    }
  };

  const pollJobStatus = async (id: string) => {
    const poll = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const jobData = await res.json();
        setJobStatus(jobData.status);

        if (jobData.status === 'completed') {
          setJobOutput(jobData.output);
          setIsExecuting(false);
        } else if (jobData.status === 'failed') {
          setJobOutput(jobData.error || 'Skill execution failed');
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

    if (data.success && userInput) {
      setShowPaywall(false);
      handleSubmit(new Event('submit') as any);
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
            <nav className="flex gap-4">
              <a href="#squads" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Squads
              </a>
              <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Skills
              </a>
              <a href="#data-sources" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Data Sources
              </a>
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                Add Data
              </button>
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
            <form className="relative" onSubmit={handleSubmit}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder='Try "I have an idea to validate" or "I want to build a SaaS product"'
                className="w-full px-4 py-3 pr-28 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isExecuting}
              />
              <button 
                type="submit" 
                disabled={isExecuting || !userInput.trim()}
                className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExecuting ? 'Running...' : 'Validate Now'}
              </button>
            </form>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Or browse squads below to get started
            </p>
          </div>

          {/* Results Display */}
          {(jobStatus || jobOutput) && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {jobStatus === 'completed' ? 'Results' : jobStatus === 'failed' ? 'Error' : 'Processing...'}
                </h3>
                {jobStatus && jobStatus !== 'completed' && jobStatus !== 'failed' && (
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {jobStatus === 'pending' ? 'Queued' : 'Running'}
                  </span>
                )}
              </div>
              {jobOutput ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 max-h-96 overflow-auto">
                    {jobOutput}
                  </pre>
                </div>
              ) : jobStatus === 'failed' ? (
                <p className="text-red-600 dark:text-red-400 text-sm">Something went wrong. Please try again.</p>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Processing your request...</span>
                </div>
              )}
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
    </div>
  );
}
