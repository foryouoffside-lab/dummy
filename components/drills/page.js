'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function DrillsPage() {
  const categories = [
    { name: 'Cognitive', slug: 'cognitive', icon: '🧠', description: 'Memory, attention, focus, and problem-solving', count: 24 },
    { name: 'Visual', slug: 'visual', icon: '👁️', description: 'Reaction speed, tracking, and recognition', count: 18 },
    { name: 'Motor', slug: 'motor', icon: '✋', description: 'Hand-eye coordination and precision', count: 15 },
    { name: 'Academic', slug: 'academic', icon: '📚', description: 'Math, reading, and comprehension', count: 20 },
    { name: 'Productivity', slug: 'productivity', icon: '⚡', description: 'Task switching and time management', count: 12 },
    { name: 'Mental Fitness', slug: 'mental-fitness', icon: '🧘', description: 'Stress control and mindfulness', count: 10 },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 mb-4">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Drill Library</h1>
            <p className="text-gray-600 mt-2">Choose a category to start your training</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/drills/${category.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 group"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <p className="text-sm text-blue-600 font-semibold">{category.count} drills available →</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}