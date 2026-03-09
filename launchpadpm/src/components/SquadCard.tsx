'use client';

import Link from 'next/link';

interface SquadCardProps {
  id: string;
  name: string;
  description: string;
  exampleDataSources: string;
  skillCount: number;
}

export default function SquadCard({
  id,
  name,
  description,
  exampleDataSources,
  skillCount,
}: SquadCardProps) {
  return (
    <Link href={`/squads/${id}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-card hover:border-blue-200 transition-all cursor-pointer">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {skillCount} skills
          </span>
          <span className="text-blue-600 text-sm font-medium">
            View skills →
          </span>
        </div>
        {exampleDataSources && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Example data: {exampleDataSources}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
