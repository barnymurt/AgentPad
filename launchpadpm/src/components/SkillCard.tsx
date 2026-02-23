'use client';

import Link from 'next/link';

interface SkillCardProps {
  name: string;
  description: string;
}

export default function SkillCard({ name, description }: SkillCardProps) {
  return (
    <Link href={`/skills/${name}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer">
        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
          {name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
