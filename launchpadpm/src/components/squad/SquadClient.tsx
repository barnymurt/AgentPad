'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';

interface Squad {
  id: string;
  name: string;
  description: string;
  skills: string[];
}

interface Skill {
  id: string;
  name: string;
  description: string;
}

export default function SquadPage({ squadId }: { squadId: string }) {
  const { isDarkMode } = useAppLayout();
  const [squad, setSquad] = useState<Squad | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/squads').then(r => r.json()),
      fetch('/api/skills').then(r => r.json())
    ])
      .then(([squadsData, skillsData]) => {
        const found = squadsData.find((s: any) => s.id === squadId);
        if (found) {
          setSquad(found);
          const squadSkills = found.skills || [];
          const filtered = skillsData.filter((s: any) => squadSkills.includes(s.id));
          setSkills(filtered);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [squadId]);

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = isDarkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const inputBg = isDarkMode ? 'bg-[#0f0f1a]' : 'bg-gray-100';

  if (loading) {
    return (
      <AppLayout title="Loading...">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </AppLayout>
    );
  }

  if (!squad) {
    return (
      <AppLayout title="Squad Not Found">
        <div className="text-center py-12">
          <p className={`${mutedColor} mb-4`}>Squad "{squadId}" not found</p>
          <Link href="/dashboard" className="text-blue-500 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`${squad.name} Squad`}>
      <div className="space-y-6">
        {/* Squad Info */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h2 className={`${textColor} font-semibold text-xl mb-2`}>{squad.name}</h2>
          <p className={mutedColor}>{squad.description}</p>
        </div>

        {/* Run Skill Section */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h2 className={`${textColor} font-semibold mb-4`}>Run a Skill</h2>
          <form className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${mutedColor} mb-2`}>
                Describe what you want to do
              </label>
              <textarea
                placeholder={`e.g., Help me with ${squad.name.toLowerCase()} for my startup...`}
                className={`w-full px-4 py-3 rounded-lg border ${cardBorder} ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Run Skill
            </button>
          </form>
        </div>

        {/* Skills List */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h2 className={`${textColor} font-semibold mb-4`}>Available Skills ({skills.length})</h2>
          
          {skills.length === 0 ? (
            <p className={mutedColor}>No skills available for this squad</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <Link
                  key={skill.id}
                  href={`/skills/${skill.id}`}
                  className={`block p-4 rounded-lg border ${cardBorder} hover:border-blue-500 transition-colors`}
                >
                  <h3 className={`${textColor} font-medium mb-1`}>
                    {(skill.name || '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <p className={`${mutedColor} text-sm line-clamp-2`}>
                    {skill.description || 'No description'}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
