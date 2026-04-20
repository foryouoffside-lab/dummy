'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Zap, Star, Play, Eye, Target, Lock, Activity } from 'lucide-react';

export default function VisualDrillsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    }
    setLoading(false);
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drills...</p>
        </div>
      </div>
    );
  }

  const drills = [
    // Reaction Speed Drills
    { id: 1, name: 'Light Reaction', category: 'Reaction Speed', subcategory: 'reaction-speed', difficulty: 'Beginner', duration: '1 min', points: 60, description: 'Click as fast as you can when the light appears', enabled: true },
    { id: 2, name: 'Sound Reaction', category: 'Reaction Speed', subcategory: 'reaction-speed', difficulty: 'Beginner', duration: '1 min', points: 60, description: 'React to audio cues as quickly as possible', enabled: true },
    { id: 3, name: 'Go/No-Go', category: 'Reaction Speed', subcategory: 'reaction-speed', difficulty: 'Intermediate', duration: '2 min', points: 100, description: 'Respond only to correct signals, ignore distractors', enabled: true },
    
    // Tracking Accuracy Drills
    { id: 4, name: 'Moving Target', category: 'Tracking Accuracy', subcategory: 'tracking-accuracy', difficulty: 'Intermediate', duration: '2 min', points: 120, description: 'Track and click on moving targets', enabled: true },
    { id: 5, name: 'Pursuit Tracker', category: 'Tracking Accuracy', subcategory: 'tracking-accuracy', difficulty: 'Advanced', duration: '3 min', points: 180, description: 'Follow a moving object with your cursor', enabled: true },
    { id: 6, name: 'Multiple Targets', category: 'Tracking Accuracy', subcategory: 'tracking-accuracy', difficulty: 'Expert', duration: '3 min', points: 200, description: 'Track multiple moving objects simultaneously', enabled: true },
    
    // Peripheral Vision Drills
    { id: 7, name: 'Peripheral Flash', category: 'Peripheral Vision', subcategory: 'peripheral-vision', difficulty: 'Intermediate', duration: '2 min', points: 100, description: 'Detect flashes in your peripheral vision', enabled: true },
    { id: 8, name: 'Wide Field', category: 'Peripheral Vision', subcategory: 'peripheral-vision', difficulty: 'Advanced', duration: '3 min', points: 150, description: 'Monitor wide area for changes', enabled: true },
    
    // Visual Recognition Drills
    { id: 9, name: 'Rapid Object ID', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Intermediate', duration: '2 min', points: 100, description: 'Identify objects quickly from brief glimpses', enabled: true },
    { id: 10, name: 'Difference Spotter', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Intermediate', duration: '2 min', points: 120, description: 'Find differences between similar images', enabled: true },
    { id: 11, name: 'Visual Search', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Advanced', duration: '3 min', points: 150, description: 'Find specific targets among many distractors', enabled: true },
    
    // Depth Perception Drills
    { id: 12, name: 'Distance Judgment', category: 'Depth Perception', subcategory: 'depth-perception', difficulty: 'Intermediate', duration: '2 min', points: 100, description: 'Judge distances between objects accurately', enabled: true },
  ];

  const categories = ['Reaction Speed', 'Tracking Accuracy', 'Peripheral Vision', 'Visual Recognition', 'Depth Perception'];

  // Helper function to get the correct URL path based on drill name and category
  const getDrillPath = (drill) => {
    const slug = drill.name.toLowerCase().replace(/ /g, '-');
    const subcategoryMap = {
      'Reaction Speed': 'reaction-speed',
      'Tracking Accuracy': 'tracking-accuracy',
      'Peripheral Vision': 'peripheral-vision',
      'Visual Recognition': 'visual-recognition',
      'Depth Perception': 'depth-perception'
    };
    const subcategory = subcategoryMap[drill.category];
    return `/drills/visual/${subcategory}/${slug}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Visual Drills</h1>
              <p className="text-gray-500 mt-1">Train your reaction speed, tracking, and visual perception</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Drills Completed</p>
              <Target className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Start your first drill</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Average Score</p>
              <Zap className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">0%</p>
            <p className="text-xs text-gray-500 mt-1">Complete drills to see scores</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total XP Earned</p>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Earn XP from each drill</p>
          </div>
        </div>

        {/* Drills Grid */}
        {categories.map((category) => {
          const categoryDrills = drills.filter(d => d.category === category);
          if (categoryDrills.length === 0) return null;
          
          return (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill) => (
                  <Link
                    key={drill.id}
                    href={getDrillPath(drill)}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Eye className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          drill.difficulty === 'Beginner' ? 'bg-green-50 text-green-600' :
                          drill.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-600' :
                          drill.difficulty === 'Advanced' ? 'bg-orange-50 text-orange-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {drill.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                        {drill.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{drill.description}</p>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{drill.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          <span>{drill.points} XP</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400">{drill.category}</span>
                        <div className="flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all">
                          <span className="text-sm font-medium">Start</span>
                          <Play className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}