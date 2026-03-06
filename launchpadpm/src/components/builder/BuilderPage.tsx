'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';

interface PhaseOutput {
  skillId: string;
  output: string;
  summary: string;
  qualityScore: number;
  completedAt: string;
  retryCount: number;
}

interface QualityScore {
  score: number;
  passed: boolean;
  confidence: number;
  issues: string[];
  reviewedBy: string;
  reviewedAt: string;
  reviewDetails?: string;
}

interface Approval {
  phase: string;
  approved: boolean;
  approver: string;
  comment?: string;
  approvedAt: string;
}

interface BuilderProject {
  id: string;
  name: string;
  description: string;
  currentPhase: string;
  phaseStatus: string;
  progress: number;
  completedPhases: string[];
  qualityThreshold: number;
  phaseOutputs: Record<string, PhaseOutput>;
  qualityScores: Record<string, QualityScore>;
  approvals: Approval[];
  lastError?: string;
  createdAt: string;
  updatedAt: string;
}

const PHASES = [
  { id: 'validation', label: 'Validation', description: 'Validate your idea' },
  { id: 'discovery', label: 'Discovery', description: 'Define your vision' },
  { id: 'research', label: 'Research', description: 'Research market & users' },
];

export default function BuilderPage() {
  const { isDarkMode } = useAppLayout();
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id');
  
  const [projects, setProjects] = useState<BuilderProject[]>([]);
  const [currentProject, setCurrentProject] = useState<BuilderProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showUserInput, setShowUserInput] = useState(false);
  const [userContext, setUserContext] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (initialId) {
      const project = projects.find(p => p.id === initialId);
      if (project) setCurrentProject(project);
    }
  }, [initialId, projects]);

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/builder');
      if (!res.ok) {
        console.error('Failed to load projects:', res.status);
        return;
      }
      const text = await res.text();
      if (!text) return;
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        setProjects(data);
        if (data.length > 0 && !initialId) {
          setCurrentProject(data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!newProjectName.trim() || !newProjectDescription.trim()) return;
    
    setCreating(true);
    try {
      const res = await fetch('/api/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProjectName,
          description: newProjectDescription,
        }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to create project:', res.status, errorText);
        alert('Failed to create project: ' + errorText);
        return;
      }
      
      const text = await res.text();
      if (!text) return;
      const project = JSON.parse(text);
      setProjects(prev => [project, ...prev]);
      setCurrentProject(project);
      setShowNewProject(false);
      setNewProjectName('');
      setNewProjectDescription('');
    } catch (err) {
      console.error('Failed to create project:', err);
    } finally {
      setCreating(false);
    }
  };

  const startPhase = async (phase: string, userContext?: string) => {
    if (!currentProject) return;
    
    setActionLoading(true);
    try {
      const res = await fetch('/api/builder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start_phase',
          projectId: currentProject.id,
          phase,
          userContext: userContext || currentProject.description,
        }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to start phase:', res.status, errorText);
        alert('Failed to start phase: ' + errorText);
        return;
      }
      
      const text = await res.text();
      if (!text) {
        console.error('Empty response from server');
        return;
      }
      
      const updated = JSON.parse(text);
      setCurrentProject(updated);
      loadProjects();
    } catch (err) {
      console.error('Failed to start phase:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const approvePhase = async (phase: string, approved: boolean, comment?: string) => {
    if (!currentProject) return;
    
    setActionLoading(true);
    try {
      const res = await fetch('/api/builder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          projectId: currentProject.id,
          phase,
          approved,
          comment,
        }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to approve:', res.status, errorText);
        alert('Failed to approve: ' + errorText);
        return;
      }
      
      const text = await res.text();
      if (!text) return;
      const updated = JSON.parse(text);
      setCurrentProject(updated);
      loadProjects();
    } catch (err) {
      console.error('Failed to approve:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const adjustThreshold = async (threshold: number) => {
    if (!currentProject) return;
    
    try {
      const res = await fetch('/api/builder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'adjust_threshold',
          projectId: currentProject.id,
          threshold,
        }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to adjust threshold:', res.status, errorText);
        return;
      }
      
      const text = await res.text();
      if (!text) return;
      const updated = JSON.parse(text);
      setCurrentProject(updated);
    } catch (err) {
      console.error('Failed to adjust threshold:', err);
    }
  };

  // Poll for updates when phase is running
  useEffect(() => {
    if (!currentProject || currentProject.phaseStatus !== 'running') return;
    
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/builder?id=${currentProject.id}`);
        if (res.ok) {
          const updated = await res.json();
          setCurrentProject(updated);
        }
      } catch (err) {
        console.error('Failed to refresh project:', err);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentProject?.id, currentProject?.phaseStatus]);

  const retryPhase = async (phase: string) => {
    if (!currentProject) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/builder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start_phase',
          projectId: currentProject.id,
          phase,
          userContext: currentProject.description,
        }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to retry phase:', res.status, errorText);
        alert('Failed to start phase: ' + errorText);
        return;
      }
      
      const text = await res.text();
      if (!text) {
        console.error('Empty response from server');
        return;
      }
      
      const updated = JSON.parse(text);
      setCurrentProject(updated);
    } catch (err) {
      console.error('Failed to retry phase:', err);
      alert('Failed to retry phase. Check console for details.');
    } finally {
      setActionLoading(false);
    }
  };

  const cardBg = isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = isDarkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const inputBg = isDarkMode ? 'bg-[#0f0f1a]' : 'bg-gray-100';
  const inputBorder = isDarkMode ? 'border-[#2a2a3e]' : 'border-gray-300';

  const getPhaseStatus = (phase: string) => {
    if (!currentProject) return 'pending';
    if (currentProject.completedPhases.includes(phase)) return 'completed';
    if (currentProject.currentPhase === phase) return currentProject.phaseStatus;
    const phaseIndex = PHASES.findIndex(p => p.id === phase);
    const currentIndex = PHASES.findIndex(p => p.id === currentProject.currentPhase);
    return phaseIndex < currentIndex ? 'completed' : 'pending';
  };

  const getStatusGuidance = (phase: string, status: string): { title: string; message: string; action?: string } => {
    const phaseConfig = PHASES.find(p => p.id === phase);
    
    if (status === 'running') {
      if (phase === 'validation') {
        return {
          title: 'Running Validation Pack',
          message: 'Analyzing your idea using 7 validation skills including competitor research, user personas, and market analysis...',
          action: undefined
        };
      }
      if (phase === 'discovery') {
        return {
          title: 'Defining Product Vision',
          message: 'Creating your product vision, mission statement, and stakeholder analysis...',
          action: undefined
        };
      }
      if (phase === 'research') {
        return {
          title: 'Conducting Market Research',
          message: 'Building user personas, analyzing competitors, mapping user journeys, and eliciting requirements...',
          action: undefined
        };
      }
      return {
        title: 'Processing',
        message: 'Working on your request...',
        action: undefined
      };
    }
    
    if (status === 'failed') {
      if (phase === 'validation') {
        return {
          title: 'Validation Failed',
          message: 'The validation phase encountered an issue. This could be due to API limits, unclear idea description, or external service timeouts.',
          action: 'retry'
        };
      }
      if (phase === 'discovery') {
        return {
          title: 'Discovery Failed',
          message: 'The discovery phase encountered an issue. Try providing more context about your product in the project description.',
          action: 'retry'
        };
      }
      if (phase === 'research') {
        return {
          title: 'Research Failed',
          message: 'The research phase encountered an issue. This may require more detailed information about your target market.',
          action: 'retry'
        };
      }
      return {
        title: 'Phase Failed',
        message: 'An error occurred. You can try running the phase again.',
        action: 'retry'
      };
    }
    
    if (status === 'waiting_approval') {
      return {
        title: 'Review Required',
        message: 'This phase has completed. Please review the output and approve to continue to the next phase.',
        action: undefined
      };
    }
    
    if (status === 'rejected') {
      return {
        title: 'Changes Requested',
        message: 'You requested changes to this phase. You can retry with adjustments or proceed to the next phase with the current output.',
        action: 'retry'
      };
    }
    
    return {
      title: phaseConfig?.label || phase,
      message: phaseConfig?.description || 'Ready to start',
      action: undefined
    };
  };

  const canStartPhase = (phase: string) => {
    if (!currentProject) return false;
    const status = getPhaseStatus(phase);
    return status === 'pending' || status === 'waiting_approval';
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-gray-500/20 text-gray-400',
      running: 'bg-blue-500/20 text-blue-400',
      needs_input: 'bg-purple-500/20 text-purple-400',
      waiting_approval: 'bg-yellow-500/20 text-yellow-400',
      approved: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400',
      failed: 'bg-red-500/20 text-red-400',
    };
    return styles[status] || styles.pending;
  };

  return (
    <AppLayout title="AI Builder">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`${textColor} font-semibold text-2xl`}>AI Builder</h1>
            <p className={mutedColor}>Build your product from idea to production</p>
          </div>
          <button
            onClick={() => setShowNewProject(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            New Project
          </button>
        </div>

        {/* Project List */}
        {projects.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => setCurrentProject(project)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-colors ${
                  currentProject?.id === project.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : `${cardBg} ${cardBorder} ${textColor} hover:border-blue-500`
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : !currentProject ? (
          <div className={`${cardBg} ${cardBorder} border rounded-xl p-8 text-center`}>
            <p className={mutedColor}>No AI Builder projects yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Phase Timeline */}
            <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
              <h2 className={`${textColor} font-semibold mb-4`}>Progress</h2>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className={mutedColor}>Overall Progress</span>
                  <span className={textColor}>{currentProject.progress}%</span>
                </div>
                <div className={`h-2 rounded-full ${isDarkMode ? 'bg-[#2a2a3e]' : 'bg-gray-200'}`}>
                  <div 
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${currentProject.progress}%` }}
                  />
                </div>
              </div>

              {/* Phase List */}
              <div className="space-y-3">
                {PHASES.map((phase, index) => {
                  const status = getPhaseStatus(phase.id);
                  const qualityScore = currentProject.qualityScores[phase.id];
                  
                  return (
                    <div 
                      key={phase.id}
                      className={`p-3 rounded-lg border ${
                        currentProject.currentPhase === phase.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : cardBorder
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            status === 'approved' ? 'bg-green-500 text-white' :
                            status === 'completed' ? 'bg-green-500/50 text-white' :
                            status === 'running' ? 'bg-blue-500 text-white' :
                            isDarkMode ? 'bg-[#2a2a3e] text-gray-400' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {status === 'approved' ? '✓' : index + 1}
                          </span>
                          <span className={`${textColor} font-medium text-sm`}>{phase.label}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded ${getStatusBadge(status)}`}>
                          {status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      {qualityScore && (
                        <div className="ml-8 mt-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className={mutedColor}>Quality:</span>
                            <span className={qualityScore.passed ? 'text-green-400' : 'text-yellow-400'}>
                              {qualityScore.score}/100
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quality Threshold */}
              <div className={`mt-6 pt-4 border-t ${cardBorder}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`${textColor} text-sm`}>Quality Threshold</span>
                  <span className={mutedColor}>{currentProject.qualityThreshold}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={currentProject.qualityThreshold}
                  onChange={(e) => adjustThreshold(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Phase */}
              <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`${textColor} font-semibold text-lg`}>
                    {PHASES.find(p => p.id === currentProject.currentPhase)?.label}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusBadge(currentProject.phaseStatus)}`}>
                    {currentProject.phaseStatus.replace('_', ' ')}
                  </span>
                </div>

                <p className={mutedColor}>{currentProject.description}</p>

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    {currentProject.phaseStatus === 'pending' && (
                      <>
                        <button
                          onClick={() => setShowUserInput(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                        >
                          Start Phase
                        </button>
                      </>
                    )}
                    
                    {currentProject.phaseStatus === 'failed' && (
                      <div className="space-y-3">
                        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'} border`}>
                          <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                            {currentProject.lastError || getStatusGuidance(currentProject.currentPhase, 'failed').message}
                          </p>
                        </div>
                        <button
                          onClick={() => retryPhase(currentProject.currentPhase)}
                          disabled={actionLoading}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                        >
                          {actionLoading ? 'Retrying...' : 'Retry Phase'}
                        </button>
                      </div>
                    )}
                    
                    {currentProject.phaseStatus === 'running' && (
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'} border`}>
                        <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                          {getStatusGuidance(currentProject.currentPhase, 'running').message}
                        </p>
                      </div>
                    )}
                    
                    {currentProject.phaseStatus === 'waiting_approval' && (
                    <>
                      <button
                        onClick={() => approvePhase(currentProject.currentPhase, true)}
                        disabled={actionLoading}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                      >
                        Approve & Continue
                      </button>
                      <button
                        onClick={() => approvePhase(currentProject.currentPhase, false)}
                        disabled={actionLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                      >
                        Request Changes
                      </button>
                    </>
                  )}
                </div>
                
                {/* User Input Modal for Phase Context */}
                {showUserInput && (
                  <div className="mt-4 p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
                    <h3 className={`${textColor} font-medium mb-2`}>
                      {currentProject.currentPhase === 'validation' 
                        ? 'Provide context for Validation' 
                        : `Provide context for ${currentProject.currentPhase}`}
                    </h3>
                    <p className={`text-sm ${mutedColor} mb-3`}>
                      {currentProject.currentPhase === 'validation' 
                        ? 'To get the best validation results, please provide details about your idea. What problem are you solving? Who are your target users?'
                        : 'Add any additional context that might help with this phase.'}
                    </p>
                    <textarea
                      value={userContext}
                      onChange={(e) => setUserContext(e.target.value)}
                      placeholder={currentProject.currentPhase === 'validation' 
                        ? 'e.g., B2B SaaS for project management. Target: small marketing teams. Problem: scattered spreadsheets, missed deadlines...'
                        : 'Enter additional context...'}
                      rows={4}
                      className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3`}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          await startPhase(currentProject.currentPhase, userContext);
                          setShowUserInput(false);
                          setUserContext('');
                        }}
                        disabled={actionLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                      >
                        {actionLoading ? 'Starting...' : 'Run Phase'}
                      </button>
                      <button
                        onClick={() => {
                          setShowUserInput(false);
                          setUserContext('');
                        }}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Phase Output */}
              {currentProject.phaseOutputs[currentProject.currentPhase] && (
                <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
                  <h3 className={`${textColor} font-semibold mb-4`}>Latest Output</h3>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#0f0f1a]' : 'bg-gray-50'} max-h-96 overflow-auto`}>
                    <pre className={`text-sm ${textColor} whitespace-pre-wrap font-mono`}>
                      {currentProject.phaseOutputs[currentProject.currentPhase].summary}
                    </pre>
                  </div>
                </div>
              )}

              {/* Devil's Advocate Review */}
              {currentProject.qualityScores[currentProject.currentPhase]?.reviewDetails && (
                <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
                  <h3 className={`${textColor} font-semibold mb-4 flex items-center gap-2`}>
                    <span>Devil's Advocate Review</span>
                  </h3>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50'} border ${isDarkMode ? 'border-purple-500/20' : 'border-purple-200'}`}>
                    <p className={`text-sm ${textColor}`}>
                      {currentProject.qualityScores[currentProject.currentPhase].reviewDetails}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* New Project Modal */}
        {showNewProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className={`${cardBg} border ${cardBorder} rounded-xl shadow-xl max-w-md w-full p-6`}>
              <h2 className={`text-lg font-semibold ${textColor} mb-4`}>Start New AI Builder Project</h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm ${mutedColor} mb-2`}>Project Name</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="My SaaS Product"
                    className={`w-full px-4 py-2 rounded-lg border ${inputBorder} ${inputBg} ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm ${mutedColor} mb-2`}>Describe your idea</label>
                  <textarea
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                    placeholder="A B2B SaaS for..."
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border ${inputBorder} ${inputBg} ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={createProject}
                  disabled={creating || !newProjectName.trim() || !newProjectDescription.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Project'}
                </button>
                <button
                  onClick={() => setShowNewProject(false)}
                  className={`px-4 py-2 ${isDarkMode ? 'bg-[#2a2a3e] text-white hover:bg-[#3a3a4e]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} rounded-lg`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
