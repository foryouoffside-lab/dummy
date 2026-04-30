'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Star, Play, Dumbbell, Target, 
  Activity, Eye, Hand, TrendingUp, Battery, Gauge, 
  GitBranch, Timer, BarChart3, Award, Heart, Brain
} from 'lucide-react';

export default function PhysicalDrillsPage() {
  // Categories with exact folder names (case-sensitive)
  const categories = [
    { 
      name: 'Balance Training', 
      folderName: 'Balance-Training', // Exact folder name with capital B and T
      icon: Activity,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: 'Improve stability and body control',
      drills: [
        { name: 'Single Leg Hold', folderName: 'single-leg-hold', difficulty: 'Medium', duration: '1 min' },
        { name: 'Dynamic Balance', folderName: 'dynamic-balance', difficulty: 'Hard', duration: '1 min' },
        { name: 'Stability Challenge', folderName: 'stability-challenge', difficulty: 'Medium', duration: '1 min' }
      ]
    },
    { 
      name: 'Reflex Training', 
      folderName: 'Reflex-Training', // Exact folder name with capital R and T
      icon: Zap,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      description: 'Enhance reaction speed and response time',
      drills: [
        { name: 'Drop Catch', folderName: 'drop-catch', difficulty: 'Easy', duration: '1 min' },
        { name: 'Quick Dodge', folderName: 'quick-dodge', difficulty: 'Medium', duration: '1 min' },
        { name: 'Reaction Chain', folderName: 'reaction-chain', difficulty: 'Hard', duration: '1 min' }
      ]
    },
    { 
      name: 'Coordination', 
      folderName: 'Coordination', // Exact folder name with capital C
      icon: Hand,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Improve hand-eye and body coordination',
      drills: [
        { name: 'Cross Body Movement', folderName: 'cross-body-movement', difficulty: 'Medium', duration: '1 min' },
        { name: 'Complex Pattern', folderName: 'complex-pattern', difficulty: 'Hard', duration: '1 min' }
      ]
    },
    { 
      name: 'Fitness', 
      folderName: 'Fitness', // Exact folder name with capital F
      icon: Heart,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      description: 'Build strength, agility and endurance',
      drills: [
        { name: 'Agility Ladder', folderName: 'agility-ladder', difficulty: 'Medium', duration: '1 min' },
        { name: 'Jump Sequence', folderName: 'jump-sequence', difficulty: 'Hard', duration: '1 min' },
        { name: 'Speed Drill', folderName: 'speed-drill', difficulty: 'Medium', duration: '1 min' }
      ]
    }
  ];

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-50 text-green-600';
      case 'Medium': return 'bg-yellow-50 text-yellow-600';
      case 'Hard': return 'bg-orange-50 text-orange-600';
      case 'Expert': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Calculate total drills
  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Physical Drills</h1>
              <p className="text-gray-500 mt-1">Train your balance, reflexes, coordination, and fitness</p>
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
              <Dumbbell className="w-4 h-4 text-blue-500" />
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
          const CategoryIcon = category.icon;
          
          return (
            <div key={category.name} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-red-500 to-orange-600"></div>
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <span className="text-xs text-gray-400">({category.drills.length} drills)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => {
                  // Build the correct path with capital letters in folder name
                  const drillPath = `/drills/physical/${category.folderName}/${drill.folderName}`;
                  
                  return (
                    <Link
                      key={index}
                      href={drillPath}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${category.bgColor}`}>
                            <CategoryIcon className={`w-5 h-5 ${category.textColor}`} />
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(drill.difficulty)}`}>
                            {drill.difficulty}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition">
                          {drill.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          {drill.name === 'Single Leg Hold' && 'Maintain balance on one leg while performing tasks'}
                          {drill.name === 'Dynamic Balance' && 'Maintain stability during movement'}
                          {drill.name === 'Stability Challenge' && 'React to perturbations while staying balanced'}
                          {drill.name === 'Drop Catch' && 'Catch falling objects as quickly as possible'}
                          {drill.name === 'Quick Dodge' && 'Dodge incoming obstacles rapidly'}
                          {drill.name === 'Reaction Chain' && 'Respond to a sequence of rapid stimuli'}
                          {drill.name === 'Cross Body Movement' && 'Coordinate opposite limbs simultaneously'}
                          {drill.name === 'Complex Pattern' && 'Execute complex movement sequences'}
                          {drill.name === 'Agility Ladder' && 'Quick footwork through agility patterns'}
                          {drill.name === 'Jump Sequence' && 'Perform precise jumping patterns'}
                          {drill.name === 'Speed Drill' && 'Maximum speed movement exercises'}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{drill.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{category.name}</span>
                          <div className="flex items-center gap-1 text-red-600 group-hover:gap-2 transition-all">
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
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Dumbbell className="w-6 h-6" />
            Physical Training Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Warm Up First</h4>
              <p className="text-sm text-orange-100">Always perform light stretching and warm-up exercises before starting any physical drill.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Proper Form</h4>
              <p className="text-sm text-orange-100">Focus on maintaining correct posture and form to prevent injury and maximize benefits.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Stay Hydrated</h4>
              <p className="text-sm text-orange-100">Drink water before, during, and after your training sessions for optimal performance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}