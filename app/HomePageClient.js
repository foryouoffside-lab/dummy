'use client';

import Link from 'next/link';
import { 
  Target, ArrowRight, Zap, Trophy, BarChart3, Sparkles, 
  TrendingUp, Brain, Crosshair, Eye, Timer, Keyboard, 
  Dumbbell, Database, Star, Shield, Users
} from 'lucide-react';

const categories = [
  { 
    name: 'FPS Training', 
    description: 'Aim trainer, flick shots, tracking and reflex drills for competitive gaming', 
    icon: Crosshair, 
    href: '/drills/fps', 
    gradient: 'from-red-500 via-rose-500 to-orange-500',
    iconBg: 'bg-gradient-to-br from-red-500 to-orange-500',
    drills: '21 drills',
    featured: true 
  },
  { 
    name: 'Cognitive', 
    description: 'Memory, attention, focus and problem solving exercises', 
    icon: Brain, 
    href: '/drills/cognitive', 
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    drills: '16 drills' 
  },
  { 
    name: 'Visual', 
    description: 'Peripheral vision, tracking accuracy and reaction speed', 
    icon: Eye, 
    href: '/drills/visual', 
    gradient: 'from-purple-500 via-violet-500 to-pink-500',
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    drills: '14 drills' 
  },
  { 
    name: 'Academic', 
    description: 'Reading comprehension, math speed, typing and writing', 
    icon: Keyboard, 
    href: '/drills/academic', 
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    drills: '12 drills' 
  },
  { 
    name: 'Memory', 
    description: 'Working memory, spatial recall and long-term retention', 
    icon: Database, 
    href: '/drills/memory', 
    gradient: 'from-indigo-500 via-purple-500 to-fuchsia-500',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    drills: '15 drills' 
  },
  { 
    name: 'Mental Fitness', 
    description: 'Breathing exercises, stress control and biofeedback', 
    icon: Timer, 
    href: '/drills/mental-fitness', 
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    iconBg: 'bg-gradient-to-br from-teal-500 to-cyan-500',
    drills: '6 drills' 
  },
  { 
    name: 'Motor Skills', 
    description: 'Hand-eye coordination, precision control and timing', 
    icon: Target, 
    href: '/drills/motor', 
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    drills: '12 drills' 
  },
  { 
    name: 'Productivity', 
    description: 'Focus endurance, time management and work efficiency', 
    icon: BarChart3, 
    href: '/drills/productivity', 
    gradient: 'from-lime-500 via-green-500 to-emerald-500',
    iconBg: 'bg-gradient-to-br from-lime-500 to-emerald-500',
    drills: '10 drills' 
  },
  { 
    name: 'Physical', 
    description: 'Balance training, coordination drills and reflex exercises', 
    icon: Dumbbell, 
    href: '/drills/physical', 
    gradient: 'from-rose-500 via-red-500 to-orange-500',
    iconBg: 'bg-gradient-to-br from-rose-500 to-red-500',
    drills: '11 drills' 
  },
];

const features = [
  { 
    icon: Zap, 
    title: 'Real-time Feedback', 
    description: 'Get instant performance metrics and visual feedback during every drill session', 
    gradient: 'from-amber-400 to-yellow-500',
    bgGradient: 'from-amber-50 to-yellow-50'
  },
  { 
    icon: BarChart3, 
    title: 'Performance Analytics', 
    description: 'Track scores, accuracy rates, and improvement trends with detailed charts', 
    gradient: 'from-blue-400 to-indigo-500',
    bgGradient: 'from-blue-50 to-indigo-50'
  },
  { 
    icon: Trophy, 
    title: 'Achievement System', 
    description: 'Earn badges and beat personal records across all training categories', 
    gradient: 'from-orange-400 to-red-500',
    bgGradient: 'from-orange-50 to-red-50'
  },
  { 
    icon: Shield, 
    title: 'Science-Backed', 
    description: 'Drills designed using cognitive science and professional gaming principles', 
    gradient: 'from-purple-400 to-violet-500',
    bgGradient: 'from-purple-50 to-violet-50'
  },
  { 
    icon: Target, 
    title: 'Focused Training', 
    description: 'Target specific skill areas with 115+ specialized drills across 9 categories', 
    gradient: 'from-emerald-400 to-green-500',
    bgGradient: 'from-emerald-50 to-green-50'
  },
  { 
    icon: Users, 
    title: 'Community Driven', 
    description: 'Join thousands of gamers and learners improving their skills daily', 
    gradient: 'from-pink-400 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50'
  },
];

const audienceData = [
  { 
    icon: Crosshair, 
    gradient: 'from-red-500 to-orange-500',
    title: 'Competitive Gamers', 
    description: 'Dominate in Valorant, CS2, Overwatch, and Apex Legends with pro-level aim training, flick shots, and tracking drills.' 
  },
  { 
    icon: Brain, 
    gradient: 'from-blue-500 to-indigo-500',
    title: 'Students & Learners', 
    description: 'Boost memory retention, double your reading speed, and master mental math for academic excellence.' 
  },
  { 
    icon: BarChart3, 
    gradient: 'from-emerald-500 to-green-500',
    title: 'Professionals', 
    description: 'Enhance productivity, focus endurance, and cognitive flexibility for peak workplace performance.' 
  },
];

export default function HomePageClient() {
  const copyPageLink = () => {
    navigator.clipboard.writeText('https://skilldrills.online');
    alert('Link copied to clipboard! Share SkillDrills with your friends.');
  };

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SkillDrills - Free FPS Aim Trainer & Brain Training',
          text: '115+ free drills for FPS gaming, cognitive skills, memory, and mental fitness. No sign-up!',
          url: 'https://skilldrills.online',
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      copyPageLink();
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group"
              aria-label="SkillDrills Home - Free Brain Training Platform"
              title="SkillDrills - Free FPS and Cognitive Training"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                SkillDrills
              </span>
            </Link>
            
            <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-6">
              <Link href="/drills/fps" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">FPS</Link>
              <Link href="/drills/cognitive" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">Cognitive</Link>
              <Link href="/drills/memory" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">Memory</Link>
              <Link href="/drills/academic" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">Academic</Link>
              <Link href="/drills/visual" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">Visual</Link>
              <Link href="/drills" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">All Drills</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="h-16" />

      <section className="sr-only" aria-label="Platform description">
        <h2>SkillDrills - Free Brain Training and FPS Aim Trainer Platform</h2>
        <p>
          SkillDrills is a completely free online training platform offering 115+ interactive drills across 9 categories. 
          FPS aim training for Valorant, CS2, Overwatch, Apex Legends and all competitive shooters. 
          Cognitive brain training including memory games, attention exercises, focus training and problem-solving puzzles. 
          Academic skills practice with typing tests, speed reading, mental math drills and reading comprehension. 
          Mental fitness through breathing exercises, stress control and biofeedback training. 
          Motor skills development for hand-eye coordination, precision control and timing accuracy. 
          Visual training for peripheral vision, depth perception, reaction speed and visual recognition. 
          Productivity tools for focus endurance, task switching and time management. 
          Physical training with balance exercises, coordination drills and reflex training. 
          No registration, no login, no credit card required. Start training instantly for free at skilldrills.online.
        </p>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600" aria-labelledby="hero-heading">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" aria-hidden="true" />
              <span className="text-sm text-white">100% Free Training Platform</span>
            </div>
            
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Master Your Mind & Mechanics
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              115+ free interactive drills for FPS gaming, cognitive skills, memory, typing, and mental fitness. No sign-up required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/drills" 
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                Browse All 115+ Drills
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link 
                href="/drills/fps" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                <Crosshair className="w-5 h-5" aria-hidden="true" />
                FPS Aim Trainer
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 max-w-2xl mx-auto">
              <div>
                <p className="text-3xl font-bold text-white">9</p>
                <p className="text-sm text-blue-200">Training Categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">115+</p>
                <p className="text-sm text-blue-200">Free Drills</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">0</p>
                <p className="text-sm text-blue-200">Sign-Up Required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="categories-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Explore Training Categories
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Choose from 9 categories with 115+ free drills designed to improve your gaming, cognitive, academic, and fitness skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative bg-white rounded-xl border-2 border-gray-100 p-5 sm:p-6 hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
                  title={`${category.name} - ${category.description}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    {category.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-semibold rounded-full">
                        <Star className="w-3 h-3 fill-white" />
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-3">{category.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full group-hover:bg-blue-100 transition-colors">
                      {category.drills}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Why Train With SkillDrills
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Science-backed drills with real-time feedback, performance tracking, and achievement systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article 
                  key={index} 
                  className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16" aria-labelledby="audience-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="audience-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Who Benefits From SkillDrills
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our free training platform is built for competitive gamers, students, professionals, and lifelong learners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {audienceData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="group text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold text-white mb-4">
            Start Training Free Today
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            115+ drills across 9 categories. No registration, no credit card, no download required. Start improving your skills instantly.
          </p>
          <Link 
            href="/drills" 
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            Explore All 115+ Free Drills
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li>
                <li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li>
                <li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li>
                <li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li>
                <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li>
                <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li>
                <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Academic</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li>
                <li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li>
                <li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li>
                <li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li>
                <li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li>
                <li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li>
                <li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-white font-bold text-lg">SkillDrills</span>
            </div>
            <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
            <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">
              SkillDrills is a free online training platform with 115+ interactive drills across 9 categories including FPS aim training, cognitive brain games, memory exercises, typing speed tests, mental math, speed reading, visual tracking, hand-eye coordination, breathing exercises, and productivity tools. No registration required. Start training instantly at skilldrills.online.
            </p>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share SkillDrills" aria-label="Share SkillDrills with friends">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              </button>
              <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy Link" aria-label="Copy SkillDrills link to clipboard">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
              </button>
             
              <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter" aria-label="Follow SkillDrills on Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}