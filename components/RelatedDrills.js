'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Related Drills component for internal linking
 * @param {Object} props
 * @param {string} props.currentDrill - Current drill slug
 * @param {string} props.category - Drill category
 * @param {Array} props.drills - Related drills [{name, slug, description}]
 */
export default function RelatedDrills({ currentDrill, category, drills = [] }) {
  if (!drills || drills.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related Drills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drills
          .filter(d => d.slug !== currentDrill)
          .slice(0, 6)
          .map((drill) => (
            <Link
              key={drill.slug}
              href={`/drills/${category}/${drill.slug}`}
              className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-1">
                {drill.name}
              </h3>
              {drill.description && (
                <p className="text-sm text-gray-500 line-clamp-2">
                  {drill.description}
                </p>
              )}
              <div className="flex items-center gap-1 mt-2 text-sm text-teal-500 font-medium">
                <span>Try this drill</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}