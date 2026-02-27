'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';

interface Skill {
  id: string;
  name: string;
  description: string;
}

export default function SkillDetailPage() {
  const params = useParams();
  const skillId = params.skill as string;
  const { darkMode } = useAppLayout();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        const found = data.find((s: any) => s.id === skillId);
        if (found) {
          setSkill(found);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [skillId]);

  const handleRun = async () => {
    if (!input.trim()) return;
    setRunning(true);
    
    try {
      const response = await fetch('/api/run-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId,
          input,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Skill started successfully!');
        setInput('');
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
  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-white';
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
                onClick={handleRun}
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

        {/* Quick Info */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h2 className={`${textColor} font-semibold mb-4`}>About This Skill</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className={`${mutedColor} text-sm mb-1`}>Skill ID</p>
              <p className={textColor}>{skill.id}</p>
            </div>
            <div>
              <p className={`${mutedColor} text-sm mb-1`}>Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
