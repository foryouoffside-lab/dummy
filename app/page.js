'use client';

import Link from 'next/link';
import { Target, ArrowRight, Zap, Trophy, BarChart3, Sparkles, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const features = [
    { icon: Zap, title: 'Real-time Feedback', description: 'Get instant performance metrics during drills', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { icon: BarChart3, title: 'Performance Tracking', description: 'See your scores and track improvement', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Trophy, title: 'Challenge Yourself', description: 'Beat your personal best scores', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: Sparkles, title: 'Skill Development', description: 'Practice and improve specific abilities', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: Target, title: 'Focused Training', description: 'Target specific skill areas with dedicated drills', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: TrendingUp, title: 'Track Progress', description: 'Monitor your improvement over time', color: 'text-pink-500', bg: 'bg-pink-50' },
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/drills" className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
                Browse All Drills
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 max-w-2xl mx-auto">
              <div>
                <p className="text-3xl font-bold text-white">2</p>
                <p className="text-sm text-blue-100">Training Categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">Free</p>
                <p className="text-sm text-blue-100">No Registration</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">0</p>
                <p className="text-sm text-blue-100">Login Required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Features</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Everything you need to practice and improve your skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition group">
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              );
            })}
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
          <Link href="/drills" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            View All Drills
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