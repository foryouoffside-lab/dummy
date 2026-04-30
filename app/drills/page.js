'use client';

import Link from 'next/link';
import { Target, ArrowRight, Sparkles, Gamepad2, Brain, Eye, BookOpen, Timer, Hand, Dumbbell, Heart, Database } from 'lucide-react';

export default function DrillsPage() {
  const drillCategories = [
    { name: 'FPS Gaming', color: 'from-red-500 to-orange-600', icon: Gamepad2, description: 'Reaction speed, aim training & peripheral vision for competitive gamers', slug: 'fps' },
    { name: 'Cognitive', color: 'from-purple-500 to-indigo-600', icon: Brain, description: 'Memory, attention, focus & problem-solving training', slug: 'cognitive' },
    { name: 'Visual', color: 'from-blue-500 to-cyan-600', icon: Eye, description: 'Reaction speed, tracking accuracy, peripheral vision & visual recognition', slug: 'visual' },
    { name: 'Academic', color: 'from-yellow-500 to-amber-600', icon: BookOpen, description: 'Math speed, reading comprehension, writing speed & typing tests', slug: 'academic' },
    { name: 'Productivity', color: 'from-emerald-500 to-teal-600', icon: Timer, description: 'Pomodoro timer, task management, focus sessions & habit tracking', slug: 'productivity' },
    { name: 'Memory', color: 'from-violet-500 to-purple-600', icon: Database, description: 'Short-term, working, long-term, spatial & associative memory training', slug: 'memory' },
    { name: 'Motor', color: 'from-green-500 to-emerald-600', icon: Hand, description: 'Hand-eye coordination, timing accuracy, precision control & movement speed', slug: 'motor' },
    { name: 'Physical', color: 'from-orange-500 to-red-600', icon: Dumbbell, description: 'Balance training, reflex training, coordination & fitness exercises', slug: 'physical' },
    { name: 'Mental Fitness', color: 'from-pink-500 to-rose-600', icon: Heart, description: 'Stress control, mindfulness, meditation & breathing exercises', slug: 'mental-fitness' },
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
              Train Your Brain & Body
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Free training platform for everyone. No login required.
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {drillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link 
                key={index} 
                href={`/drills/${category.slug}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90`}></div>
                <div className="relative p-5 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                  <p className="text-white/90 text-xs mb-3 line-clamp-2">{category.description}</p>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition">
                    <span className="text-xs font-medium">View Drills</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
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

      {/* Visual Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Eye className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Visual Training</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Visual Drills</h2>
              <p className="text-blue-100 mb-6">
                Enhance reaction speed, tracking accuracy, peripheral vision, and visual recognition with specialized exercises.
              </p>
              <Link href="/drills/visual" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Visual Drills
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Reaction</p>
                    <p className="text-sm text-blue-200">Speed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Tracking</p>
                    <p className="text-sm text-blue-200">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Peripheral</p>
                    <p className="text-sm text-blue-200">Vision</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Recognition</p>
                    <p className="text-sm text-blue-200">Training</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Banner */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <BookOpen className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Academic Training</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Academic Drills</h2>
              <p className="text-yellow-100 mb-6">
                Improve math speed, reading comprehension, writing speed, and typing skills with structured academic exercises.
              </p>
              <Link href="/drills/academic" className="inline-flex items-center gap-2 bg-white text-yellow-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Academic Drills
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Math</p>
                    <p className="text-sm text-yellow-200">Speed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Reading</p>
                    <p className="text-sm text-yellow-200">Comprehension</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Writing</p>
                    <p className="text-sm text-yellow-200">Speed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Typing</p>
                    <p className="text-sm text-yellow-200">Tests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productivity Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Timer className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Productivity Tools</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Productivity Drills</h2>
              <p className="text-emerald-100 mb-6">
                Boost your efficiency with Pomodoro timer, task management, focus sessions, and habit tracking tools.
              </p>
              <Link href="/drills/productivity" className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Productivity Drills
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Pomodoro</p>
                    <p className="text-sm text-emerald-200">Timer</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Task</p>
                    <p className="text-sm text-emerald-200">Management</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Focus</p>
                    <p className="text-sm text-emerald-200">Sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Habit</p>
                    <p className="text-sm text-emerald-200">Tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Memory Banner */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Database className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Memory Training</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Memory Drills</h2>
              <p className="text-violet-100 mb-6">
                Train short-term, working, long-term, spatial, and associative memory with scientifically-designed drills.
              </p>
              <Link href="/drills/memory" className="inline-flex items-center gap-2 bg-white text-violet-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Memory Drills
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Short-Term</p>
                    <p className="text-sm text-violet-200">Memory</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Working</p>
                    <p className="text-sm text-violet-200">Memory</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Spatial</p>
                    <p className="text-sm text-violet-200">Memory</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Associative</p>
                    <p className="text-sm text-violet-200">Memory</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Motor Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Hand className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Motor Skills</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Motor Drills</h2>
              <p className="text-green-100 mb-6">
                Train hand-eye coordination, timing accuracy, precision control, and movement speed for better physical response.
              </p>
              <Link href="/drills/motor" className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Motor Drills
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Hand-Eye</p>
                    <p className="text-sm text-green-200">Coordination</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Timing</p>
                    <p className="text-sm text-green-200">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Precision</p>
                    <p className="text-sm text-green-200">Control</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Movement</p>
                    <p className="text-sm text-green-200">Speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Physical Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Dumbbell className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Physical Training</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Physical Drills</h2>
              <p className="text-orange-100 mb-6">
                Train balance, reflexes, coordination, and fitness with structured physical exercises for better body control.
              </p>
              <Link href="/drills/physical" className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Physical Drills
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Balance</p>
                    <p className="text-sm text-orange-200">Training</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Reflex</p>
                    <p className="text-sm text-orange-200">Training</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Coordination</p>
                    <p className="text-sm text-orange-200">Exercises</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Fitness</p>
                    <p className="text-sm text-orange-200">Drills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mental Fitness Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Heart className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Mental Wellness</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Mental Fitness Drills</h2>
              <p className="text-pink-100 mb-6">
                Train stress control, mindfulness, meditation, and breathing techniques for better mental resilience.
              </p>
              <Link href="/drills/mental-fitness" className="inline-flex items-center gap-2 bg-white text-pink-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Mental Fitness Drills
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Stress</p>
                    <p className="text-sm text-pink-200">Control</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Mindfulness</p>
                    <p className="text-sm text-pink-200">Practice</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Meditation</p>
                    <p className="text-sm text-pink-200">Training</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">Breathing</p>
                    <p className="text-sm text-pink-200">Exercises</p>
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
            <p className="text-gray-400 text-xs mt-2">Free training platform - FPS, Cognitive, Visual, Academic, Productivity, Memory, Motor, Physical & Mental Fitness Training | No login required</p>
          </div>
        </div>
      </footer>
    </div>
  );
}