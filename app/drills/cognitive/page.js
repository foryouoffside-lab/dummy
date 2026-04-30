'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Play, Brain, Target, Star } from 'lucide-react';

export default function CognitiveDrillsPage() {
  const drills = [
    // Memory Drills
    { id: 1, name: 'Memory Sequence', category: 'Memory', subcategory: 'memory', difficulty: 'Intermediate', duration: '1 min', description: 'Watch the sequence of colors and repeat it in order', enabled: true },
    { id: 2, name: 'Number Recall', category: 'Memory', subcategory: 'memory', difficulty: 'Intermediate', duration: '1 min', description: 'Remember and repeat number sequences', enabled: true },
    { id: 3, name: 'Pattern Recognition', category: 'Memory', subcategory: 'memory', difficulty: 'Advanced', duration: '1 min', description: 'Identify patterns and complete the sequence', enabled: true },
    { id: 4, name: 'Card Matching', category: 'Memory', subcategory: 'memory', difficulty: 'Beginner', duration: '1 min', description: 'Match pairs of cards to test your visual memory', enabled: true },
    
    // Attention Drills
    { id: 5, name: 'Sustained Attention', category: 'Attention', subcategory: 'attention', difficulty: 'Intermediate', duration: '1 min', description: 'Maintain focus over extended periods', enabled: true },
    { id: 6, name: 'Selective Attention', category: 'Attention', subcategory: 'attention', difficulty: 'Advanced', duration: '1 min', description: 'Focus on relevant information while ignoring distractions', enabled: true },
    { id: 7, name: 'Divided Attention', category: 'Attention', subcategory: 'attention', difficulty: 'Expert', duration: '1 min', description: 'Handle multiple tasks simultaneously', enabled: true },
    
    // Processing Speed Drills
    { id: 8, name: 'Reaction Time', category: 'Processing', subcategory: 'processing-speed', difficulty: 'Beginner', duration: '1 min', description: 'Click as fast as you can when the screen changes color', enabled: true },
    { id: 9, name: 'Quick Math', category: 'Processing', subcategory: 'processing-speed', difficulty: 'Intermediate', duration: '1 min', description: 'Solve math problems under time pressure', enabled: true },
    { id: 10, name: 'Symbol Matching', category: 'Processing', subcategory: 'processing-speed', difficulty: 'Intermediate', duration: '1 min', description: 'Match symbols quickly and accurately', enabled: true },
    
    // Focus Drills
    { id: 11, name: 'Focus Timer', category: 'Focus', subcategory: 'focus', difficulty: 'Beginner', duration: '5 min', description: 'Practice sustained focus with timed sessions', enabled: true },
    { id: 12, name: 'Distraction Fighter', category: 'Focus', subcategory: 'focus', difficulty: 'Intermediate', duration: '1 min', description: 'Stay focused despite interruptions', enabled: true },
    { id: 13, name: 'Concentration Grid', category: 'Focus', subcategory: 'focus', difficulty: 'Advanced', duration: '1 min', description: 'Find numbers in sequence under pressure', enabled: true },
    
    // Problem Solving Drills
    { id: 14, name: 'Tower of Hanoi', category: 'Problem Solving', subcategory: 'problem-solving', difficulty: 'Advanced', duration: '1 min', description: 'Solve the classic tower puzzle', enabled: true },
    { id: 15, name: 'Sudoku', category: 'Problem Solving', subcategory: 'problem-solving', difficulty: 'Medium', duration: '1 min', description: 'Complete the Sudoku grid', enabled: true },
    { id: 16, name: 'Logic Puzzles', category: 'Problem Solving', subcategory: 'problem-solving', difficulty: 'Hard', duration: '1 min', description: 'Solve complex logic puzzles', enabled: true },
  ];

  // Only show categories that have enabled drills
  const categories = ['Memory', 'Attention', 'Processing', 'Focus', 'Problem Solving'];

  // Helper function to get the correct URL path based on drill name and category
  const getDrillPath = (drill) => {
    const slug = drill.name.toLowerCase().replace(/ /g, '-');
    const subcategoryMap = {
      'Memory': 'memory',
      'Attention': 'attention',
      'Processing': 'processing-speed',
      'Focus': 'focus',
      'Problem Solving': 'problem-solving'
    };
    const subcategory = subcategoryMap[drill.category];
    return `/drills/cognitive/${subcategory}/${slug}`;
  };

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-50 text-green-600';
      case 'Intermediate': return 'bg-yellow-50 text-yellow-600';
      case 'Advanced': return 'bg-orange-50 text-orange-600';
      case 'Expert': return 'bg-red-50 text-red-600';
      case 'Hard': return 'bg-red-50 text-red-600';
      case 'Medium': return 'bg-yellow-50 text-yellow-600';
      default: return 'bg-purple-50 text-purple-600';
    }
  };

  // Calculate total drills
  const totalDrills = drills.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cognitive Drills</h1>
              <p className="text-gray-500 mt-1">Train your memory, attention, processing speed, focus, and problem-solving skills</p>
            </div>
          </div>
        </div>

        {/* Stats Overview - Updated to 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Available Drills</p>
              <Target className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalDrills}</p>
            <p className="text-xs text-gray-500 mt-1">Ready to train</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Categories</p>
              <Brain className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Skill areas</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Free Access</p>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">100%</p>
            <p className="text-xs text-gray-500 mt-1">No login required</p>
          </div>
        </div>

        {/* Drills Grid */}
        {categories.map((category) => {
          const categoryDrills = drills.filter(d => d.category === category);
          if (categoryDrills.length === 0) return null;
          
          return (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600"></div>
                <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                <span className="text-xs text-gray-400">({categoryDrills.length} drills)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill) => (
                  <Link
                    key={drill.id}
                    href={getDrillPath(drill)}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <Brain className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(drill.difficulty)}`}>
                          {drill.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                        {drill.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{drill.description}</p>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{drill.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400">{drill.category}</span>
                        <div className="flex items-center gap-1 text-purple-600 group-hover:gap-2 transition-all">
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

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Cognitive Training Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Train Consistently</h4>
              <p className="text-sm text-purple-100">Short daily sessions are more effective than long weekly sessions for cognitive improvement.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Challenge Yourself</h4>
              <p className="text-sm text-purple-100">Gradually increase difficulty to keep your brain adapting and growing.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Rest and Recover</h4>
              <p className="text-sm text-purple-100">Take breaks between sessions to allow neural connections to strengthen.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}