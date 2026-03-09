'use client';

import Link from 'next/link';

interface SkillCardProps {
  name: string;
  description: string;
}

export default function SkillCard({ name, description }: SkillCardProps) {
  return (
    <Link href={`/skills/${name}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-card hover:border-blue-200 transition-all cursor-pointer">
        <h4 className="font-semibold text-gray-900 mb-2 text-lg">
          {name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
