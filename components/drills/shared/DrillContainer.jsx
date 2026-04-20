'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function DrillContainer({ 
  children, 
  title, 
  category, 
  description,
  difficulty,
  onDifficultyChange,
  showInstructions = true
}) {
  
  const [showDetails, setShowDetails] = useState(false);
  
  const difficulties = [
    { id: 'beginner', name: 'Beginner', color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'intermediate', name: 'Intermediate', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { id: 'advanced', name: 'Advanced', color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: 'expert', name: 'Expert', color: 'text-red-600', bg: 'bg-red-100' }
  ];
  
  const currentDifficulty = difficulties.find(d => d.id === difficulty) || difficulties[1];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href={`/drills/${category}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to {category.charAt(0).toUpperCase() + category.slice(1)} Drills
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-500 mt-1">{description}</p>
            </div>
            
            {onDifficultyChange && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Difficulty:</span>
                <select
                  value={difficulty}
                  onChange={(e) => onDifficultyChange(e.target.value)}
                  className={`px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 ${currentDifficulty.bg} ${currentDifficulty.color} font-medium`}
                >
                  {difficulties.map(d => (
                    <option key={d.id} value={d.id} className="bg-white text-gray-900">
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          {children}
        </div>
        
        {/* Instructions Toggle */}
        {showInstructions && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Instructions & Tips</span>
              </div>
              {showDetails ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            
            {showDetails && (
              <div className="p-4 pt-0 border-t border-gray-100">
                <div className="prose prose-sm max-w-none">
                  <p>Complete the drill to earn points and improve your skills.</p>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Accuracy and speed both affect your score</li>
                    <li>• Higher difficulty levels offer more points</li>
                    <li>• Track your progress in the dashboard</li>
                    <li>• Earn achievements for reaching milestones</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}