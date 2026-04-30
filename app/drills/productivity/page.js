'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Play, Coffee, Target, 
  GitBranch, Timer, Battery, Gauge, BarChart3, 
  Workflow, Layers, Activity, TrendingUp, Hourglass,
  Focus, Brain, Crosshair, Star
} from 'lucide-react';

export default function ProductivityDrillsPage() {
  const drills = [
    // Task Switching Drills
    { 
      id: 1, 
      name: 'Context Switch', 
      folderName: 'context-switch',
      category: 'Task Switching', 
      categorySlug: 'task-switching',
      difficulty: 'Medium', 
      duration: '1 min', 
      description: 'Flash questioning • 1.5s per question • Switch between rules',
      enabled: true
    },
    { 
      id: 2, 
      name: 'Multi Tasking', 
      folderName: 'multi-tasking',
      category: 'Task Switching', 
      categorySlug: 'task-switching',
      difficulty: 'Hard', 
      duration: '1 min', 
      description: '4-zone rule switching • 2 sec per question',
      enabled: true
    },
    { 
      id: 3, 
      name: 'Switch Cost', 
      folderName: 'switch-cost',
      category: 'Task Switching', 
      categorySlug: 'task-switching',
      difficulty: 'Expert', 
      duration: '1 min', 
      description: 'Simultaneous tasks • 1 sec per round • Dual tasks',
      enabled: true
    },
    
    // Time Management Drills
    { 
      id: 4, 
      name: 'Time Estimation', 
      folderName: 'time-estimation',
      category: 'Time Management', 
      categorySlug: 'time-management',
      difficulty: 'Medium', 
      duration: '1 min', 
      description: 'Match target duration • Hold and release timing',
      enabled: true
    },
    { 
      id: 5, 
      name: 'Pomodoro Timer', 
      folderName: 'pomodoro-timer',
      category: 'Time Management', 
      categorySlug: 'time-management',
      difficulty: 'Easy', 
      duration: '∞', 
      description: '25min focus • 5min break • 1 min = 1 point',
      enabled: true
    },
    { 
      id: 6, 
      name: 'Priority Sorting', 
      folderName: 'priority-sorting',
      category: 'Time Management', 
      categorySlug: 'time-management',
      difficulty: 'Medium', 
      duration: '1 min', 
      description: 'Click priority items • Rule changes every 3-4s',
      enabled: true
    },
    
    // Focus Endurance Drills
    { 
      id: 7, 
      name: 'Deep Work', 
      folderName: 'deep-work',
      category: 'Focus Endurance', 
      categorySlug: 'focus-endurance',
      difficulty: 'Medium', 
      duration: '1 min', 
      description: 'Track the moving ring • 1 sec focus = +1 point',
      enabled: true
    },
    { 
      id: 8, 
      name: 'Concentration Stamina', 
      folderName: 'concentration-stamina',
      category: 'Focus Endurance', 
      categorySlug: 'focus-endurance',
      difficulty: 'Hard', 
      duration: '1 min', 
      description: 'Keep cursor in the pulsing ring • Build stamina',
      enabled: true
    },
    { 
      id: 9, 
      name: 'Flow State', 
      folderName: 'flow-state',
      category: 'Focus Endurance', 
      categorySlug: 'focus-endurance',
      difficulty: 'Expert', 
      duration: '1 min', 
      description: 'Track the ring • 1 sec flow = +1 point + streak bonus',
      enabled: true
    },
    
    // Work Efficiency Drills
    { 
      id: 10, 
      name: 'Batch Processing', 
      folderName: 'batch-processing',
      category: 'Work Efficiency', 
      categorySlug: 'work-efficiency',
      difficulty: 'Medium', 
      duration: '1 min', 
      description: '3 sec per batch • Level up • Auto-refresh',
      enabled: true
    },
  ];

  const categories = ['Task Switching', 'Time Management', 'Focus Endurance', 'Work Efficiency'];

  const getDrillPath = (drill) => {
    return `/drills/productivity/${drill.categorySlug}/${drill.folderName}`;
  };

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
      case 'Task Switching': return <GitBranch className="w-5 h-5 text-purple-600" />;
      case 'Time Management': return <Timer className="w-5 h-5 text-blue-600" />;
      case 'Focus Endurance': return <Brain className="w-5 h-5 text-green-600" />;
      case 'Work Efficiency': return <Workflow className="w-5 h-5 text-orange-600" />;
      default: return <Coffee className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryBgColor = (category) => {
    switch(category) {
      case 'Task Switching': return 'bg-purple-50';
      case 'Time Management': return 'bg-blue-50';
      case 'Focus Endurance': return 'bg-green-50';
      case 'Work Efficiency': return 'bg-orange-50';
      default: return 'bg-gray-50';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Task Switching': return 'from-purple-500 to-purple-600';
      case 'Time Management': return 'from-blue-500 to-cyan-600';
      case 'Focus Endurance': return 'from-green-500 to-emerald-600';
      case 'Work Efficiency': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryHoverColor = (category) => {
    switch(category) {
      case 'Task Switching': return 'group-hover:text-purple-600';
      case 'Time Management': return 'group-hover:text-blue-600';
      case 'Focus Endurance': return 'group-hover:text-green-600';
      case 'Work Efficiency': return 'group-hover:text-orange-600';
      default: return 'group-hover:text-gray-600';
    }
  };

  const totalDrills = drills.filter(d => d.enabled).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Productivity Drills</h1>
              <p className="text-gray-500 mt-1">Train your task switching, time management, focus endurance, and work efficiency</p>
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
              <Coffee className="w-4 h-4 text-blue-500" />
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

        {/* Drills Grid by Category */}
        {categories.map((category) => {
          const categoryDrills = drills.filter(d => d.category === category && d.enabled);
          if (categoryDrills.length === 0) return null;
          
          return (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category)}`}></div>
                <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                <span className="text-xs text-gray-400">({categoryDrills.length} drills)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill) => {
                  const hoverColor = getCategoryHoverColor(category);
                  
                  return (
                    <Link
                      key={drill.id}
                      href={getDrillPath(drill)}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${getCategoryBgColor(category)}`}>
                            {getCategoryIcon(category)}
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
                          <span className="text-xs text-gray-400">{category}</span>
                          <div className="flex items-center gap-1 text-orange-600 group-hover:gap-2 transition-all">
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

        {/* Productivity Tips Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Productivity Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Task Batching</h4>
              <p className="text-sm text-orange-100">Group similar tasks together to reduce context switching costs and improve efficiency.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Pomodoro Technique</h4>
              <p className="text-sm text-orange-100">Work in focused 25-minute intervals followed by 5-minute breaks for optimal productivity.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Deep Work</h4>
              <p className="text-sm text-orange-100">Eliminate distractions and focus intensely on cognitively demanding tasks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}