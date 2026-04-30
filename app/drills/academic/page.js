'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Play, BookOpen, Target, 
  TrendingUp, Award, BarChart3, Brain, Eye, PenTool, 
  FileText, Calculator, Type, Headphones, Star
} from 'lucide-react';

export default function AcademicDrillsPage() {
  // Categories with exact folder names from your tree structure
  const categories = [
    {
      name: 'Math Speed',
      slug: 'math-speed',
      folderName: 'math-speed',
      icon: Calculator,
      description: 'Test and improve your mental arithmetic speed',
      color: 'from-red-500 to-orange-500',
      bg: 'bg-red-50',
      textColor: 'text-red-600',
      drillCount: 4
    },
    {
      name: 'Reading Speed',
      slug: 'reading-speed',
      folderName: 'reading-speed',
      icon: Eye,
      description: 'Increase your words-per-minute reading rate',
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      textColor: 'text-blue-600',
      drillCount: 3
    },
    {
      name: 'Writing Speed',
      slug: 'writing-speed',
      folderName: 'writing-speed',
      icon: PenTool,
      description: 'Improve typing speed and accuracy',
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      textColor: 'text-green-600',
      drillCount: 2
    },
    {
      name: 'Comprehension',
      slug: 'comprehension',
      folderName: 'comprehension',
      icon: Brain,
      description: 'Enhance reading and listening comprehension',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      textColor: 'text-purple-600',
      drillCount: 3
    }
  ];

  // All drills with exact folder names matching your structure
  const drills = [
    // Math Speed Drills
    { 
      id: 1, 
      name: 'Arithmetic Race', 
      folderName: 'arithmetic-race',
      category: 'Math Speed', 
      difficulty: 'Medium', 
      duration: '1 min', 
      description: 'Solve arithmetic problems as quickly as possible',
      enabled: true
    },
    { 
      id: 2, 
      name: 'Math Reaction', 
      folderName: 'Math-Reaction',
      category: 'Math Speed', 
      difficulty: 'Hard', 
      duration: '1 min', 
      description: 'React quickly to math problems under time pressure',
      enabled: true
    },
    { 
      id: 3, 
      name: 'Multiplication Tables', 
      folderName: 'multiplication-tables',
      category: 'Math Speed', 
      difficulty: 'Easy', 
      duration: '1 min', 
      description: 'Test your multiplication table recall speed',
      enabled: true
    },
    { 
      id: 4, 
      name: 'Mental Math', 
      folderName: 'mental-math',
      category: 'Math Speed', 
      difficulty: 'Hard', 
      duration: '1 min', 
      description: 'Calculate complex problems without writing',
      enabled: true
    },
    
    // Reading Speed Drills
    { 
      id: 5, 
      name: 'Speed Reader', 
      folderName: 'speed-reader',
      category: 'Reading Speed', 
      difficulty: 'Medium', 
      duration: '1 min', 
      description: 'Practice reading at increasing speeds',
      enabled: true
    },
    { 
      id: 6, 
      name: 'RSVP Reader', 
      folderName: 'rsvp-reader',
      category: 'Reading Speed', 
      difficulty: 'Medium', 
      duration: '∞', 
      description: 'Rapid Serial Visual Presentation reading technique',
      enabled: true
    },
    { 
      id: 7, 
      name: 'Peripheral Reader', 
      folderName: 'peripheral-reader',
      category: 'Reading Speed', 
      difficulty: 'Hard', 
      duration: '1 min', 
      description: 'Use peripheral vision to read faster',
      enabled: true
    },
    
    // Writing Speed Drills
    { 
      id: 8, 
      name: 'Typing Test', 
      folderName: 'typing-test',
      category: 'Writing Speed', 
      difficulty: 'Medium', 
      duration: '1 min', 
      description: 'Test your typing speed and accuracy',
      enabled: true
    },
    { 
      id: 9, 
      name: 'Code Typing', 
      folderName: 'code-typing',
      category: 'Writing Speed', 
      difficulty: 'Hard', 
      duration: '∞', 
      description: 'Type code with special characters accurately',
      enabled: true
    },
    
    // Comprehension Drills
    { 
      id: 10, 
      name: 'Reading Comprehension', 
      folderName: 'reading-comprehension',
      category: 'Comprehension', 
      difficulty: 'Medium', 
      duration: '∞', 
      description: 'Read passages and answer questions correctly',
      enabled: true
    },
    { 
      id: 11, 
      name: 'Listening Comprehension', 
      folderName: 'listening-comprehension',
      category: 'Comprehension', 
      difficulty: 'Medium', 
      duration: '1 min', 
      description: 'Listen and recall important information',
      enabled: true
    },
    { 
      id: 12, 
      name: 'Inference Drill', 
      folderName: 'inference-drill',
      category: 'Comprehension', 
      difficulty: 'Hard', 
      duration: '1 min', 
      description: 'Draw logical conclusions from given information',
      enabled: true
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-50 text-green-600';
      case 'Medium': return 'bg-yellow-50 text-yellow-600';
      case 'Hard': return 'bg-orange-50 text-orange-600';
      case 'Expert': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Math Speed': return <Calculator className="w-5 h-5 text-red-600" />;
      case 'Reading Speed': return <Eye className="w-5 h-5 text-blue-600" />;
      case 'Writing Speed': return <PenTool className="w-5 h-5 text-green-600" />;
      case 'Comprehension': return <Brain className="w-5 h-5 text-purple-600" />;
      default: return <BookOpen className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryBgColor = (category) => {
    switch(category) {
      case 'Math Speed': return 'bg-red-50';
      case 'Reading Speed': return 'bg-blue-50';
      case 'Writing Speed': return 'bg-green-50';
      case 'Comprehension': return 'bg-purple-50';
      default: return 'bg-gray-50';
    }
  };

  const getCategoryHoverColor = (category) => {
    switch(category) {
      case 'Math Speed': return 'group-hover:text-red-600';
      case 'Reading Speed': return 'group-hover:text-blue-600';
      case 'Writing Speed': return 'group-hover:text-green-600';
      case 'Comprehension': return 'group-hover:text-purple-600';
      default: return 'group-hover:text-gray-600';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Math Speed': return 'from-red-500 to-orange-600';
      case 'Reading Speed': return 'from-blue-500 to-cyan-600';
      case 'Writing Speed': return 'from-green-500 to-emerald-600';
      case 'Comprehension': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const totalDrills = drills.filter(d => d.enabled).length;
  const categoryNames = categories.map(c => c.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Academic Drills</h1>
              <p className="text-gray-500 mt-1">Train your math, reading, writing, and comprehension skills</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
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
              <BookOpen className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{categoryNames.length}</p>
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

        {/* Drills Grid by Category */}
        {categories.map((category) => {
          const categoryDrills = drills.filter(d => d.category === category.name && d.enabled);
          if (categoryDrills.length === 0) return null;
          
          return (
            <div key={category.name} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category.name)}`}></div>
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <span className="text-xs text-gray-400">({categoryDrills.length} drills)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill) => {
                  const drillPath = `/drills/academic/${category.folderName}/${drill.folderName}`;
                  const hoverColor = getCategoryHoverColor(category.name);
                  
                  return (
                    <Link
                      key={drill.id}
                      href={drillPath}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${getCategoryBgColor(category.name)}`}>
                            {getCategoryIcon(category.name)}
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(drill.difficulty)}`}>
                            {drill.difficulty}
                          </div>
                        </div>
                        
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${hoverColor} transition`}>
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
                          <span className="text-xs text-gray-400">{category.name}</span>
                          <div className={`flex items-center gap-1 ${category.textColor} group-hover:gap-2 transition-all`}>
                            <span className="text-sm font-medium">Start</span>
                            <Play className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Academic Training Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Practice Daily</h4>
              <p className="text-sm text-yellow-100">Consistent short practice sessions are more effective than long, infrequent ones.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Track Your Progress</h4>
              <p className="text-sm text-yellow-100">Monitor your speed and accuracy to see improvement over time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Challenge Yourself</h4>
              <p className="text-sm text-yellow-100">Gradually increase difficulty levels to continuously improve your skills.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}