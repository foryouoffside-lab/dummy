'use client';

import Link from 'next/link';
import { Target, ArrowRight, Zap, Trophy, BarChart3, Sparkles, TrendingUp, Star } from 'lucide-react';

export default function HomePage() {
  const features = [
    { icon: Zap, title: 'Real-time Feedback', description: 'Get instant performance metrics', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { icon: BarChart3, title: 'Skill Analysis', description: 'Understand your strengths and weaknesses', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Trophy, title: 'Challenge Yourself', description: 'Beat your personal best scores', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: Sparkles, title: 'Adaptive Learning', description: 'Drills that grow with you', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: Target, title: 'Focused Training', description: 'Target specific skill areas', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: TrendingUp, title: 'Skill Growth', description: 'See immediate improvement', color: 'text-pink-500', bg: 'bg-pink-50' },
  ];

  const drillCategories = [
    { name: 'Cognitive', drills: 45, color: 'from-blue-500 to-cyan-500', icon: '🧠' },
    { name: 'FPS Training', drills: 22, color: 'from-red-500 to-orange-500', icon: '🎯' },
    { name: 'Motor Skills', drills: 18, color: 'from-green-500 to-emerald-500', icon: '✋' },
    { name: 'Visual', drills: 15, color: 'from-purple-500 to-pink-500', icon: '👁️' },
    { name: 'Academic', drills: 12, color: 'from-yellow-500 to-amber-500', icon: '📚' },
    { name: 'Productivity', drills: 10, color: 'from-indigo-500 to-violet-500', icon: '⚡' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Cognitive & Motor Skills
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              The ultimate free platform for human performance training. Start training instantly - no login required!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/drills" className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
                Start Training Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#drill-categories" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
                Explore Drills
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 max-w-2xl mx-auto">
              <div>
                <p className="text-3xl font-bold text-white">120+</p>
                <p className="text-sm text-blue-100">Interactive Drills</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">8</p>
                <p className="text-sm text-blue-100">Skill Categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="text-sm text-blue-100">Free Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drill Categories Section */}
      <div id="drill-categories" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Training Category</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Select from 120+ drills across 8 categories. All drills are completely free!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drillCategories.map((category, index) => (
              <Link 
                key={index} 
                href={`/drills/${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90`}></div>
                <div className="relative p-6 text-white">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm mb-4">{category.drills} drills available</p>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition">
                    <span className="text-sm">Start Training</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Global Drill System?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Everything you need to improve your performance in one place - completely free
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Popular Drills Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Drills</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Try our most popular drills used by thousands of users worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Reaction Time Test', category: 'Visual', difficulty: 'Beginner', color: 'from-green-500 to-emerald-500' },
              { name: 'Memory Sequence', category: 'Cognitive', difficulty: 'Intermediate', color: 'from-blue-500 to-cyan-500' },
              { name: 'Flick Shot Training', category: 'FPS', difficulty: 'Advanced', color: 'from-red-500 to-orange-500' },
              { name: 'Typing Speed Test', category: 'Academic', difficulty: 'Beginner', color: 'from-purple-500 to-pink-500' },
            ].map((drill, index) => (
              <Link 
                key={index}
                href={`/drills/${drill.category.toLowerCase()}/${drill.name.toLowerCase().replace(/ /g, '-')}`}
                className="group bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${drill.color} mb-4`}></div>
                <h3 className="font-semibold text-gray-900 mb-1">{drill.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{drill.category}</p>
                <span className="inline-block text-xs px-2 py-1 bg-white rounded-full text-gray-600 border border-gray-200">
                  {drill.difficulty}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Skills?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start training immediately with our free drills. No registration, no credit card required!
          </p>
          <Link href="/drills" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Browse All Drills
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">© 2024 Global Drill System. All rights reserved.</p>
            <p className="text-gray-400 text-xs mt-2">Free training platform - No login required</p>
          </div>
        </div>
      </footer>
    </div>
  );
}