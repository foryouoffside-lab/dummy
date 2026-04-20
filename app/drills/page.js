'use client';

import Link from 'next/link';
import { Target, ArrowRight, Sparkles, Gamepad2, Brain } from 'lucide-react';

export default function DrillsPage() {
  const drillCategories = [
    { name: 'FPS Gaming', color: 'from-red-500 to-orange-600', icon: Gamepad2, description: 'Reaction speed, aim training & peripheral vision for competitive gamers', slug: 'fps' },
    { name: 'Cognitive', color: 'from-purple-500 to-indigo-600', icon: Brain, description: 'Memory, attention, focus & problem-solving training', slug: 'cognitive' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Global Drill System</h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white">Free Training Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Master Your{' '}
              <span className="text-white">
                FPS & Cognitive Skills
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Practice with specialized drills for gamers and cognitive exercises for memory and focus. No login required.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Training Categories</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Choose from specialized categories to improve your skills
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {drillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link 
                key={index} 
                href={`/drills/${category.slug}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90`}></div>
                <div className="relative p-8 text-white">
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 text-sm mb-4">{category.description}</p>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition">
                    <span className="text-sm font-medium">View Drills</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* FPS Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Gamepad2 className="w-4 h-4 text-white" />
                <span className="text-sm text-white">For Gamers</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">FPS Gaming Drills</h2>
              <p className="text-orange-100 mb-6">
                Train reaction speed, peripheral vision, and aim tracking designed for competitive first-person shooters.
              </p>
              <Link href="/drills/fps" className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore FPS Drills
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">240</p>
                    <p className="text-sm text-orange-200">FPS Optimized</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">0.1s</p>
                    <p className="text-sm text-orange-200">Reaction Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">180°</p>
                    <p className="text-sm text-orange-200">Peripheral Vision</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Aim</p>
                    <p className="text-sm text-orange-200">Training</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cognitive Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Brain className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Brain Training</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Cognitive Drills</h2>
              <p className="text-purple-100 mb-6">
                Improve memory, attention span, focus, and problem-solving abilities with structured exercises.
              </p>
              <Link href="/drills/cognitive" className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Cognitive Drills
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Memory</p>
                    <p className="text-sm text-purple-200">Training</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Focus</p>
                    <p className="text-sm text-purple-200">& Attention</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Problem</p>
                    <p className="text-sm text-purple-200">Solving</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Reaction</p>
                    <p className="text-sm text-purple-200">Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Training?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            All drills are completely free. No registration, no credit card required.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Back to Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">© 2026 Global Drill System. All rights reserved.</p>
            <p className="text-gray-400 text-xs mt-2">Free training platform - FPS & Cognitive Training | No login required</p>
          </div>
        </div>
      </footer>
    </div>
  );
}