'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Star, Play, Heart, Target, 
  Brain, Wind, Shield, Infinity
} from 'lucide-react';

export default function MentalFitnessDrillsPage() {
  // Categories with exact folder names from your tree structure
  const categories = [
    { 
      name: 'Stress Control', 
      folderName: 'stress-control',
      icon: Shield,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      description: 'Learn to manage and control stress effectively',
      drills: [
        { name: 'Biofeedback', folderName: 'biofeedback', difficulty: 'Medium', duration: '5 min', description: 'Learn to control your heart rate and breathing' },
        { name: 'Stress Inoculation', folderName: 'stress-inoculation', difficulty: 'Hard', duration: '5 min', description: 'Build resilience against stressful situations' },
        { name: 'Calm Under Pressure', folderName: 'calm-under-pressure', difficulty: 'Medium', duration: '5 min', description: 'Practice maintaining calm in challenging scenarios' },
        { name: 'Stress Control', folderName: 'stress-control', difficulty: 'Medium', duration: '3 min', description: 'Start mastering stress management techniques' }
      ]
    },
    { 
      name: 'Breathing', 
      folderName: 'breathing-exercises',
      icon: Wind,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Master breathing techniques for relaxation and energy',
      drills: [
        { name: 'Box Breathing', folderName: 'box-breathing', difficulty: 'Easy', duration: '∞', description: 'Practice the 4-4-4-4 breathing technique' },
        { name: 'Wim Hof Method', folderName: 'wim-hof', difficulty: 'Hard', duration: '∞', description: 'Advanced breathing technique for energy and focus' },
        { name: '4-7-8 Breathing', folderName: '4-7-8', difficulty: 'Easy', duration: '∞', description: 'Relaxation breathing technique' }
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

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Stress Control': return 'from-red-500 to-red-600';
      case 'Breathing': return 'from-blue-500 to-cyan-600';
      default: return 'from-pink-500 to-rose-600';
    }
  };

  // Calculate total drills
  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mental Fitness Drills</h1>
              <p className="text-gray-500 mt-1">Train your stress control and breathing techniques</p>
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
              <Heart className="w-4 h-4 text-pink-500" />
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
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category.name)}`}></div>
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <span className="text-xs text-gray-400">({category.drills.length} drills)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => {
                  const drillPath = `/drills/mental-fitness/${category.folderName}/${drill.folderName}`;
                  
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
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition">
                          {drill.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">{drill.description}</p>
                        
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            {drill.duration === '∞' ? (
                              <Infinity className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            <span>{drill.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{category.name}</span>
                          <div className="flex items-center gap-1 text-pink-600 group-hover:gap-2 transition-all">
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
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Mental Fitness Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Consistency Matters</h4>
              <p className="text-sm text-pink-100">Even 5 minutes of daily practice can significantly improve your mental resilience.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Start Small</h4>
              <p className="text-sm text-pink-100">Begin with easier drills and gradually increase difficulty as you build your mental fitness.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Breathe Deeply</h4>
              <p className="text-sm text-pink-100">Focus on slow, controlled breathing to activate your parasympathetic nervous system.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}