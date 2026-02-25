'use client';

import { useState, use } from 'react';
import Link from 'next/link';

interface Skill {
  name: string;
  description: string;
}

interface SquadPageProps {
  squad: {
    id: string;
    name: string;
    description: string;
    example_data_sources: string;
    skills: string[];
  };
  skills: Skill[];
}

export default function SquadRunClient({ squad, skills }: SquadPageProps) {
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [input, setInput] = useState('');
  const [context, setContext] = useState('');
  const [dataSources, setDataSources] = useState<any[]>([]);
  const [showContextPrompt, setShowContextPrompt] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<Record<string, any> | null>(null);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/data-sources')
      .then(res => res.json())
      .then(data => setDataSources(data.data_sources || []))
      .catch(() => setDataSources([]));
  }, []);

  const toggleSkill = (skillName: string) => {
    const newSelected = new Set(selectedSkills);
    if (newSelected.has(skillName)) {
      newSelected.delete(skillName);
    } else {
      newSelected.add(skillName);
    }
    setSelectedSkills(newSelected);
  };

  const toggleResult = (skillName: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(skillName)) {
      newExpanded.delete(skillName);
    } else {
      newExpanded.add(skillName);
    }
    setExpandedResults(newExpanded);
  };

  const selectAll = () => {
    setSelectedSkills(new Set(skills.map(s => s.name)));
  };

  const deselectAll = () => {
    setSelectedSkills(new Set());
  };

  const runSquad = async () => {
    if (!input.trim()) {
      setError('Please enter what you want to build');
      return;
    }
    if (selectedSkills.size === 0) {
      setError('Please select at least one skill');
      return;
    }

    // Check if context or data sources exist
    const hasContext = context.trim().length > 0;
    const hasDataSources = dataSources.length > 0;
    
    if (!hasContext && !hasDataSources) {
      setShowContextPrompt(true);
      return;
    }

    setIsRunning(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`/api/squads/${squad.id}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: input,
          context: context,
          skills: Array.from(selectedSkills),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to run squad');
      } else {
        setResults(data.results);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {squad.name} Squad
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Squad Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {squad.description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">Example data sources:</span> {squad.example_data_sources}
          </p>
        </div>

        {/* Run Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Run {squad.name} Squad
          </h2>
          
          {/* Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What do you want to build?
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`e.g., I want to build a ${squad.name.toLowerCase()} for my startup...`}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              disabled={isRunning}
            />
          </div>

          {/* Context from Validation */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center gap-2">
                Context (optional)
                <span className="text-xs text-gray-500 font-normal">Paste validation pack insights or research notes</span>
              </span>
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Paste validation results, target user insights, risks identified, or any context from your validation pack..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              disabled={isRunning}
            />
          </div>

          {/* Skill Selection */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select skills to run ({selectedSkills.size}/{skills.length})
              </label>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-xs text-blue-600 hover:underline"
                  disabled={isRunning}
                >
                  Select all
                </button>
                <button
                  onClick={deselectAll}
                  className="text-xs text-gray-500 hover:underline"
                  disabled={isRunning}
                >
                  Deselect all
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-2">
              {skills.map((skill) => (
                <label
                  key={skill.name}
                  className={`flex items-start gap-2 p-2 rounded cursor-pointer text-sm ${
                    selectedSkills.has(skill.name)
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.has(skill.name)}
                    onChange={() => toggleSkill(skill.name)}
                    disabled={isRunning}
                    className="mt-0.5 rounded"
                  />
                  <div className="min-w-0">
                    <span className="font-medium block truncate">{skill.name.replace(/-/g, ' ')}</span>
                    <span className="text-xs opacity-70 block truncate">{skill.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Context Prompt */}
          {showContextPrompt && (
            <div className="mb-4 p-4 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg">
              <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                Context needed for better results
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                For more accurate suggestions, add context from a validation pack or connect your data sources.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="/"
                  className="px-3 py-1.5 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700"
                >
                  Run Validation Pack
                </a>
                <button
                  onClick={() => setShowContextPrompt(false)}
                  className="px-3 py-1.5 border border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 text-sm rounded-lg"
                >
                  Add Context Manually
                </button>
                <button
                  onClick={() => setShowContextPrompt(false)}
                  className="px-3 py-1.5 text-orange-600 dark:text-orange-400 text-sm underline"
                >
                  Continue without context
                </button>
              </div>
            </div>
          )}

          {/* Run Button */}
          <button
            onClick={runSquad}
            disabled={isRunning || !input.trim() || selectedSkills.size === 0}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Running {selectedSkills.size} skill{selectedSkills.size !== 1 ? 's' : ''}...
              </>
            ) : (
              `Run ${selectedSkills.size} Skill${selectedSkills.size !== 1 ? 's' : ''}`
            )}
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Results ({Object.keys(results).length} skills)
            </h2>
            
            {Object.entries(results).map(([skillName, result]: [string, any]) => {
              const isExpanded = expandedResults.has(skillName);
              return (
                <div key={skillName} className="mb-4 last:mb-0 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleResult(skillName)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white capitalize">
                      {skillName.replace(/-/g, ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                      ) : (
                        <span className="text-xs text-red-600 dark:text-red-400">✗</span>
                      )}
                      <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="p-4 bg-white dark:bg-gray-800">
                      {result.success ? (
                        result.needs_context ? (
                          <div>
                            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-4">
                              {result.output}
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>Tip:</strong> For better results, either:
                              </p>
                              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 list-disc list-inside">
                                <li>Run a Validation Pack first, then use that context here</li>
                                <li>Paste your research notes or target user insights in the Context field above</li>
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                            {result.output}
                          </div>
                        )
                      ) : (
                        <div className="text-red-600 dark:text-red-400">
                          Failed: {result.output}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Skills List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Skills in this squad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white capitalize mb-2">
                  {skill.name.replace(/-/g, ' ')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
