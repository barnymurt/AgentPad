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
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {skillCount} skills
          </span>
          <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
            View skills →
          </span>
        </div>
        {exampleDataSources && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Example data: {exampleDataSources}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
