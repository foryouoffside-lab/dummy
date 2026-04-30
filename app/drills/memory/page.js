"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Play, Brain, Target, Star } from "lucide-react";

const memoryCategories = [
  {
    name: "Short-Term Memory",
    folderName: "short-term-memory",
    icon: Brain,
    color: "purple",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    description: "Improve your ability to hold information temporarily",
    drills: [
      { name: "Digit Span", folderName: "digit-span", difficulty: "Easy", duration: "1 min", description: "Remember sequences of numbers" },
      { name: "Word Recall", folderName: "word-recall", difficulty: "Medium", duration: "1 min", description: "Memorize and reproduce word lists" },
      { name: "Color Sequence", folderName: "color-sequence", difficulty: "Easy", duration: "1 min", description: "Track and repeat color patterns" }
    ]
  },
  {
    name: "Working Memory",
    folderName: "working-memory",
    icon: Brain,
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    description: "Enhance your ability to manipulate information in mind",
    drills: [
      { name: "N-Back Training", folderName: "n-back", difficulty: "Hard", duration: "1 min", description: "Match items from N steps back" },
      { name: "Mental Arithmetic", folderName: "mental-arithmetic", difficulty: "Medium", duration: "1 min", description: "Solve problems while holding numbers" },
      { name: "Sentence Span", folderName: "sentence-span", difficulty: "Medium", duration: "1 min", description: "Process sentences & remember words" }
    ]
  },
  {
    name: "Long-Term Memory",
    folderName: "long-term-memory",
    icon: Brain,
    color: "teal",
    bgColor: "bg-teal-50",
    textColor: "text-teal-600",
    description: "Build lasting memory associations and recall",
    drills: [
      { name: "Story Recall", folderName: "story-recall", difficulty: "Medium", duration: "1 min", description: "Read and recall story details" },
      { name: "Image Association", folderName: "image-association", difficulty: "Easy", duration: "1 min", description: "Link items with related concepts" },
      { name: "Paired Associates", folderName: "paired-associates", difficulty: "Medium", duration: "1 min", description: "Learn and recall word pairs" }
    ]
  },
  {
    name: "Spatial Memory",
    folderName: "spatial-memory",
    icon: Brain,
    color: "orange",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    description: "Train your ability to remember locations and spaces",
    drills: [
      { name: "Grid Memorization", folderName: "grid-memorization", difficulty: "Medium", duration: "1 min", description: "Remember patterns on a grid" },
      { name: "Path Tracing", folderName: "path-tracing", difficulty: "Hard", duration: "1 min", description: "Retrace paths through dots" },
      { name: "Object Location", folderName: "object-location", difficulty: "Medium", duration: "1 min", description: "Find where objects were placed" }
    ]
  },
  {
    name: "Associative Memory",
    folderName: "associative-memory",
    icon: Brain,
    color: "violet",
    bgColor: "bg-violet-50",
    textColor: "text-violet-600",
    description: "Strengthen connections between related information",
    drills: [
      { name: "Name-Face", folderName: "name-face", difficulty: "Hard", duration: "1 min", description: "Match names with faces and roles" },
      { name: "Concept Linking", folderName: "concept-linking", difficulty: "Medium", duration: "1 min", description: "Connect concepts in sequence" },
      { name: "Sound Pattern", folderName: "sound-pattern", difficulty: "Medium", duration: "1 min", description: "Reproduce rhythmic patterns" }
    ]
  }
];

export default function MemoryPage() {
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
      case 'Short-Term Memory': return 'from-purple-500 to-pink-600';
      case 'Working Memory': return 'from-blue-500 to-cyan-600';
      case 'Long-Term Memory': return 'from-teal-500 to-green-600';
      case 'Spatial Memory': return 'from-orange-500 to-red-600';
      case 'Associative Memory': return 'from-violet-500 to-purple-600';
      default: return 'from-purple-500 to-pink-600';
    }
  };

  const totalDrills = memoryCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Memory Training</h1>
              <p className="text-gray-500 mt-1">Train your short-term, working, long-term, spatial, and associative memory</p>
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
              <Brain className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{memoryCategories.length}</p>
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
        {memoryCategories.map((category) => {
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
                  const drillPath = `/drills/memory/${category.folderName}/${drill.folderName}`;
                  
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
                          <span className="text-xs text-gray-400">{category.name}</span>
                          <div className="flex items-center gap-1 text-purple-600 group-hover:gap-2 transition-all">
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
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Memory Training Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Practice Daily</h4>
              <p className="text-sm text-purple-100">Consistent short sessions are more effective than long, infrequent practice for memory improvement.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Use Association</h4>
              <p className="text-sm text-purple-100">Connect new information with existing knowledge to create stronger memory traces.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Sleep Well</h4>
              <p className="text-sm text-purple-100">Quality sleep is essential for memory consolidation and recall performance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}