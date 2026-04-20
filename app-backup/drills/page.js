'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Target, Brain, Eye, Hand, BookOpen, Coffee, Heart, 
  ArrowRight, Zap, Trophy, BarChart3, LogOut, 
  Dumbbell, MemoryStick, Lock, Gamepad2, 
  Crosshair, ScanEye, Gauge, Sparkles
} from 'lucide-react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const categories = [
    // FPS GAMING CATEGORY - New addition for gamers
    { name: 'FPS Gaming', slug: 'fps', icon: Gamepad2, description: '240fps/360fps reaction speed, peripheral vision & aim training for competitive gamers', color: 'from-red-500 to-orange-600', bgColor: 'bg-red-50', textColor: 'text-red-600', locked: false, featured: true },
    { name: 'Memory', slug: 'memory', icon: MemoryStick, description: 'Short-term, working memory & recall exercises', color: 'from-indigo-500 to-purple-600', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600', locked: false },
    { name: 'Cognitive', slug: 'cognitive', icon: Brain, description: 'Attention, focus, problem-solving & decision making', color: 'from-purple-500 to-indigo-600', bgColor: 'bg-purple-50', textColor: 'text-purple-600', locked: false },
    { name: 'Visual', slug: 'visual', icon: Eye, description: 'Reaction speed, tracking, and recognition', color: 'from-blue-500 to-cyan-600', bgColor: 'bg-blue-50', textColor: 'text-blue-600', locked: false },
    { name: 'Motor', slug: 'motor', icon: Hand, description: 'Hand-eye coordination and precision control', color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50', textColor: 'text-green-600', locked: false },
    { name: 'Academic', slug: 'academic', icon: BookOpen, description: 'Math, reading, writing & comprehension', color: 'from-yellow-500 to-orange-600', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600', locked: false },
    { name: 'Productivity', slug: 'productivity', icon: Coffee, description: 'Task switching, time management & efficiency', color: 'from-orange-500 to-red-600', bgColor: 'bg-orange-50', textColor: 'text-orange-600', locked: false },
    { name: 'Mental Fitness', slug: 'mental-fitness', icon: Heart, description: 'Stress control, mindfulness & meditation', color: 'from-pink-500 to-rose-600', bgColor: 'bg-pink-50', textColor: 'text-pink-600', locked: false },
    { name: 'Physical', slug: 'physical', icon: Dumbbell, description: 'Balance, reflex, coordination & fitness', color: 'from-red-500 to-orange-600', bgColor: 'bg-red-50', textColor: 'text-red-600', locked: false },
  ];

  const features = [
    { icon: Target, title: '100+ Drills', description: 'Comprehensive training across 9 skill domains', color: 'text-blue-600' },
    { icon: BarChart3, title: 'Track Progress', description: 'Detailed analytics and performance metrics', color: 'text-green-600' },
    { icon: Trophy, title: 'Leaderboards', description: 'Compete with users worldwide', color: 'text-yellow-600' },
  ];

  const handleCategoryClick = (categorySlug, isLocked) => {
    if (isLocked) {
      return;
    }
    
    if (!session) {
      sessionStorage.setItem('redirectAfterLogin', `/drills/${categorySlug}`);
      router.push('/login');
    } else {
      router.push(`/drills/${categorySlug}`);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Global Drill System</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Dashboard
                  </Link>
                  <button onClick={handleSignOut} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Sign In
                  </Link>
                  <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white">NEW: FPS Gaming Drills for Competitive Gamers!</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Complete Human Skill Training
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Train like a pro with specialized FPS drills for gamers, plus cognitive, visual, and motor skills
              </p>
              {!session ? (
                <Link href="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link href="/dashboard" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Training Categories</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Choose from 9 specialized categories to improve your skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              const isLocked = category.locked;
              const isFeatured = category.featured;
              
              return (
                <div
                  key={category.name}
                  onClick={() => handleCategoryClick(category.slug, isLocked)}
                  className={`group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 ${
                    !isLocked ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : 'opacity-60 cursor-not-allowed'
                  } ${isFeatured ? 'ring-2 ring-red-500 relative' : ''}`}
                >
                  {isFeatured && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Gamepad2 className="w-3 h-3" />
                      For Gamers
                    </div>
                  )}
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center mb-4 relative`}>
                      <Icon className={`w-6 h-6 ${category.textColor}`} />
                      {isLocked && (
                        <div className="absolute -top-1 -right-1 bg-gray-500 rounded-full p-0.5">
                          <Lock className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{category.description}</p>
                    <div className="flex items-center gap-1 font-medium text-sm">
                      {isLocked ? (
                        <span className="text-gray-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Coming Soon
                        </span>
                      ) : (
                        <span className="text-blue-600">
                          {session ? 'Start Training' : 'Sign in to access'}
                          <ArrowRight className="w-4 h-4 inline ml-1 group-hover:translate-x-1 transition" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FPS Gaming Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                  <Gamepad2 className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">For Competitive Gamers</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">FPS Gaming Drills</h2>
                <p className="text-orange-100 mb-6">
                  Train specifically for first-person shooters with drills designed for 240fps/360fps reaction speeds, 
                  peripheral vision, and aim tracking used by pro gamers.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                    <Gauge className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">240fps / 360fps</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                    <Crosshair className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Aim Training</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                    <ScanEye className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Peripheral Vision</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">240</p>
                      <p className="text-sm text-orange-200">FPS Reaction</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">360</p>
                      <p className="text-sm text-orange-200">FPS Tracking</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">0.1</p>
                      <p className="text-sm text-orange-200">Second Response</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">180°</p>
                      <p className="text-sm text-orange-200">Field of View</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Train With Us?</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Everything you need to track and improve your performance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center p-6">
                    <div className={`w-16 h-16 rounded-xl ${feature.color.replace('text', 'bg')}-50 flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-500">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {!session && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are improving their skills every day
              </p>
              <Link href="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">© 2026 Global Drill System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}