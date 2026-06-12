'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Target, ArrowRight, Zap, Trophy, BarChart3, Sparkles, 
  TrendingUp, Brain, Crosshair, Eye, Timer, Keyboard, 
  Dumbbell, Database, Star, Shield, Users, Lock
} from 'lucide-react';

const categories = [
  { 
    name: 'FPS Training', 
    description: 'Aim trainer, flick shots, tracking and reflex drills for competitive gaming', 
    icon: Crosshair, 
    href: '#', 
    gradient: 'from-red-500 via-rose-500 to-orange-500',
    iconBg: 'bg-gradient-to-br from-red-500 to-orange-500',
    drills: '21 drills',
    featured: true,
    locked: true
  },
  { 
    name: 'Cognitive', 
    description: 'Memory, attention, focus and problem solving exercises', 
    icon: Brain, 
    href: '/drills/cognitive', 
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    drills: '16 drills',
    locked: false
  },
  { 
    name: 'Visual', 
    description: 'Peripheral vision, tracking accuracy and reaction speed', 
    icon: Eye, 
    href: '/drills/visual', 
    gradient: 'from-purple-500 via-violet-500 to-pink-500',
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    drills: '14 drills',
    locked: false
  },
  { 
    name: 'Academic', 
    description: 'Reading comprehension, math speed, typing and writing', 
    icon: Keyboard, 
    href: '/drills/academic', 
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    drills: '11 drills',
    locked: false
  },
  { 
    name: 'Memory', 
    description: 'Working memory, spatial recall and long-term retention', 
    icon: Database, 
    href: '/drills/memory', 
    gradient: 'from-indigo-500 via-purple-500 to-fuchsia-500',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    drills: '15 drills',
    locked: false
  },
  { 
    name: 'Mental Fitness', 
    description: 'Breathing exercises, stress control and biofeedback', 
    icon: Timer, 
    href: '/drills/mental-fitness', 
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    iconBg: 'bg-gradient-to-br from-teal-500 to-cyan-500',
    drills: '6 drills',
    locked: false
  },
  { 
    name: 'Motor Skills', 
    description: 'Hand-eye coordination, precision control and timing', 
    icon: Target, 
    href: '/drills/motor', 
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    drills: '12 drills',
    locked: false
  },
  { 
    name: 'Productivity', 
    description: 'Focus endurance, time management and work efficiency', 
    icon: BarChart3, 
    href: '/drills/productivity', 
    gradient: 'from-lime-500 via-green-500 to-emerald-500',
    iconBg: 'bg-gradient-to-br from-lime-500 to-emerald-500',
    drills: '10 drills',
    locked: false
  },
  { 
    name: 'Physical', 
    description: 'Balance training, coordination drills and reflex exercises', 
    icon: Dumbbell, 
    href: '/drills/physical', 
    gradient: 'from-rose-500 via-red-500 to-orange-500',
    iconBg: 'bg-gradient-to-br from-rose-500 to-red-500',
    drills: '11 drills',
    locked: false
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
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    try {
      const keys = Object.keys(localStorage);
      let totalDrillsPlayed = 0;
      let totalLevel = 0;
      let maxLevel = 1;
      let totalXp = 0;
      let drillCount = 0;
      let totalBestScore = 0;
      
      const sectorStats = {
        fps: { name: 'FPS Aim', count: 0, levels: 0, games: 0 },
        cognitive: { name: 'Cognitive', count: 0, levels: 0, games: 0 },
        memory: { name: 'Memory', count: 0, levels: 0, games: 0 },
        academic: { name: 'Academic', count: 0, levels: 0, games: 0 },
        visual: { name: 'Visual', count: 0, levels: 0, games: 0 },
        motor: { name: 'Motor Skills', count: 0, levels: 0, games: 0 },
        productivity: { name: 'Productivity', count: 0, levels: 0, games: 0 },
        physical: { name: 'Physical', count: 0, levels: 0, games: 0 },
        'mental-fitness': { name: 'Mental Fitness', count: 0, levels: 0, games: 0 }
      };
      
      keys.forEach(key => {
        if (key.endsWith('_progression')) {
          const data = localStorage.getItem(key);
          if (data) {
            try {
              const parsed = JSON.parse(data);
              totalDrillsPlayed += parsed.totalGames || 0;
              totalLevel += parsed.level || 1;
              totalXp += parsed.xp || 0;
              if (parsed.level > maxLevel) maxLevel = parsed.level;
              drillCount++;
              
              for (const sector in sectorStats) {
                if (key.includes('/' + sector + '/')) {
                  sectorStats[sector].count++;
                  sectorStats[sector].levels += parsed.level || 1;
                  sectorStats[sector].games += parsed.totalGames || 0;
                  break;
                }
              }
            } catch (e) {}
          }
        }
      });
      
      keys.forEach(key => {
        if (key.endsWith('BestScore') || key.endsWith('Best') || key.endsWith('HighScore')) {
          const val = localStorage.getItem(key);
          if (val) {
            const score = parseInt(val, 10);
            if (!isNaN(score)) {
              totalBestScore += score;
            }
          }
        }
      });

      if (totalDrillsPlayed > 0 || drillCount > 0) {
        setProfile({
          gamesPlayed: totalDrillsPlayed,
          avgLevel: drillCount > 0 ? Math.round(totalLevel / drillCount) : 1,
          maxLevel,
          drillsCount: drillCount,
          totalXp,
          fitnessRating: Math.min(100, Math.round((totalLevel * 5) + (totalBestScore / 200) + (totalDrillsPlayed * 2))),
          sectors: sectorStats
        });
      }
    } catch (e) {}
  }, []);

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
    <div 
      className="min-h-screen bg-[#050508] text-gray-100 selection:bg-blue-500/20 selection:text-blue-400 font-sans relative overflow-hidden"
      style={{ 
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(20, 24, 38, 0.4) 0%, rgba(5, 5, 8, 1) 85%), linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)', 
        backgroundSize: '100% 100%, 48px 48px, 48px 48px' 
      }}
    >
      {/* Decorative Blur Shapes */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full filter blur-[150px] pointer-events-none" />

      {/* HEADER */}
      <header className="fixed top-4 left-4 right-4 z-50 bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl max-w-7xl mx-auto" role="banner">
        <div className="px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group"
              aria-label="SkillDrills Home - Free Brain Training Platform"
              title="SkillDrills - Free FPS and Cognitive Training"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Target className="w-5.5 h-5.5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase bg-clip-text">
                SkillDrills<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 ml-1 font-bold">Pro</span>
              </span>
            </Link>
            
            <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-6">
              <span className="text-sm text-gray-600 font-medium flex items-center gap-1 cursor-not-allowed">
                <Lock className="w-3 h-3" /> FPS
              </span>
              <Link href="/drills/cognitive" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Cognitive</Link>
              <Link href="/drills/memory" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Memory</Link>
              <Link href="/drills/academic" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Academic</Link>
              <Link href="/drills/visual" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Visual</Link>
              <Link href="/drills" className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all font-semibold">All Drills</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* SEO Content */}
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

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="hero-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4.5 py-1.5 mx-auto lg:mx-0 shadow-inner">
              <Sparkles className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span className="text-xs text-blue-300 font-bold uppercase tracking-wider">Esports & Cognitive Training Hub</span>
            </div>
            
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white uppercase">
              Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Mind</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-pulse">Mechanics</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Elevate your visual processing, mechanical aim, and working memory. Leverage 115+ scientific, zero-latency training drills. No installations. No credit cards.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/drills" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/25 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Access All Drills
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <span className="inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md text-gray-500 border border-white/10 px-8 py-4 rounded-xl font-bold cursor-not-allowed">
                <Lock className="w-4 h-4" />
                Aim Trainer - Coming Soon
              </span>
            </div>
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0 pt-8 border-t border-white/5">
              <div className="text-left">
                <p className="text-3xl font-black text-white tracking-tight">115+</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Free Drills</p>
              </div>
              <div className="text-left">
                <p className="text-3xl font-black text-white tracking-tight">9</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Sectors</p>
              </div>
              <div className="text-left">
                <p className="text-3xl font-black text-white tracking-tight">240Hz</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Optimized</p>
              </div>
            </div>
          </div>

          {/* Right Simulation Widget Column */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative bg-gradient-to-br from-slate-950/60 to-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-60" />
              
              {/* Aiming Radar Interface */}
              <div className="relative aspect-square max-w-[320px] mx-auto bg-black/40 rounded-full border border-blue-500/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-2 border border-blue-500/10 rounded-full" />
                <div className="absolute inset-16 border border-blue-500/10 rounded-full" />
                <div className="absolute inset-32 border border-blue-500/5 rounded-full" />
                
                {/* Radar sweep */}
                <div className="absolute w-[2px] h-1/2 bg-gradient-to-t from-blue-500 to-transparent top-0 left-1/2 origin-bottom animate-[spin_4s_linear_infinite]" />
                
                {/* Glowing target nodes */}
                <div className="absolute w-3.5 h-3.5 bg-green-400 rounded-full top-1/4 left-1/3 animate-ping shadow-[0_0_12px_#4ade80]" />
                <div className="absolute w-2 h-2 bg-green-500 rounded-full top-1/4 left-1/3 shadow-[0_0_8px_#22c55e]" />
                
                <div className="absolute w-3 h-3 bg-red-400 rounded-full bottom-1/3 right-1/4 animate-ping shadow-[0_0_10px_#f87171]" style={{ animationDelay: '1s' }} />
                <div className="absolute w-1.5 h-1.5 bg-red-500 rounded-full bottom-1/3 right-1/4 shadow-[0_0_6px_#ef4444]" />

                <div className="absolute w-4 h-4 bg-purple-400 rounded-full top-1/2 right-1/3 animate-ping shadow-[0_0_14px_#c084fc]" style={{ animationDelay: '2.5s' }} />
                <div className="absolute w-2 h-2 bg-purple-500 rounded-full top-1/2 right-1/3 shadow-[0_0_8px_#a855f7]" />
                
                {/* Center crosshair */}
                <div className="absolute text-blue-400 w-8 h-8 flex items-center justify-center font-light"><Crosshair className="w-6 h-6 animate-pulse" /></div>
              </div>

              {/* Telemetry Log */}
              <div className="mt-6 bg-black/50 rounded-xl border border-white/5 p-4 font-mono text-[10px] space-y-2 text-gray-400">
                <p className="flex justify-between"><span className="text-cyan-400">&gt; NEURAL_LATENCY:</span> <span className="text-green-400 font-bold">142ms (EXCELLENT)</span></p>
                <p className="flex justify-between"><span className="text-cyan-400">&gt; AIM_MATCHING:</span> <span className="text-white">DPI_800 | SENS_0.35</span></p>
                <p className="flex justify-between"><span className="text-cyan-400">&gt; STABILITY_INDEX:</span> <span className="text-cyan-300 font-bold">98.6%</span></p>
                <div className="h-1 bg-white/5 rounded overflow-hidden mt-1">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[92%] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE SECTION */}
      {profile && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Brain className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Your Diagnostic Profile</h2>
                  <p className="text-xs sm:text-sm text-gray-400">Lifetime training metrics aggregated across all diagnostic sectors</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
                <div className="bg-black/40 border border-white/5 p-4 rounded-2xl text-center">
                  <p className="text-2xl font-black text-white">{profile.gamesPlayed}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Sessions</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-2xl text-center">
                  <p className="text-2xl font-black text-white">{profile.drillsCount}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Drills</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-2xl text-center">
                  <p className="text-2xl font-black text-white">Lvl {profile.avgLevel}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Avg Level</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-2xl text-center bg-gradient-to-br from-yellow-500/5 to-amber-500/5 hover:border-yellow-500/20 transition-all">
                  <p className="text-2xl font-black text-yellow-400 flex items-center justify-center gap-1">
                    <Trophy className="w-5 h-5" />
                    {profile.fitnessRating}%
                  </p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Fitness Rating</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Neuro-Adaptation Progress</span>
                <span className="text-blue-400 font-black">{profile.totalXp} Cumulative XP</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-1000" 
                  style={{ width: `${Math.min(100, (profile.totalXp / 1000) * 100)}%` }}
                />
              </div>
            </div>

            {profile.sectors && Object.keys(profile.sectors).some(s => profile.sectors[s].games > 0) && (
              <div className="mt-8 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Sector Diagnostic Breakdown</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {Object.keys(profile.sectors).map(sector => {
                    const stats = profile.sectors[sector];
                    if (stats.games === 0) return null;
                    const avgLvl = Math.round(stats.levels / stats.count);
                    return (
                      <div key={sector} className="bg-black/40 border border-white/5 p-4 rounded-2xl flex flex-col justify-between hover:border-blue-500/20 transition-all">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">{stats.name}</span>
                        <div className="mt-3 flex justify-between items-end">
                          <span className="text-xl font-black text-white">Lvl {avgLvl}</span>
                          <span className="text-[10px] font-semibold text-blue-400">{stats.games} games</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CATEGORIES SECTION */}
      <section className="py-20 relative border-t border-white/5 bg-black/20" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 id="categories-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Training Sectors
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Select a cognitive or mechanical vector to begin your diagnostic training program.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              const isLocked = category.locked;

              if (isLocked) {
                return (
                  <div key={category.name} className="group relative bg-[#0E111A]/60 rounded-2xl border border-white/5 p-6 opacity-50 cursor-not-allowed overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-2 py-1 flex items-center gap-1 z-10">
                      <Lock className="w-3 h-3 text-yellow-400" />
                      <span className="text-[10px] font-bold text-yellow-400 uppercase">Locked</span>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mb-5 shadow-lg shadow-black/40`}>
                      <Icon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-500 uppercase tracking-tight">{category.name}</h3>
                      {category.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400/50 text-[10px] font-bold uppercase rounded-full">Popular</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-2">{category.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs font-bold text-gray-600 tracking-wider bg-white/5 px-3 py-1 rounded-lg">{category.drills}</span>
                      <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs uppercase tracking-wider">
                        <Lock className="w-3 h-3" />
                        <span>Coming Soon</span>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative bg-[#0E111A]/60 rounded-2xl border border-white/5 p-6 hover:border-white/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  title={`${category.name} - ${category.description}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className={`w-12 h-12 rounded-xl ${category.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-black/40`}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      {category.name}
                    </h3>
                    {category.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-bold uppercase rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-2">{category.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs font-bold text-gray-400 tracking-wider bg-white/5 px-3 py-1 rounded-lg">
                      {category.drills}
                    </span>
                    <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs uppercase tracking-wider group-hover:text-blue-300">
                      <span>Enter</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY TRAIN WITH US (FEATURES) */}
      <section className="py-20 relative border-t border-white/5" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 id="features-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Engine Diagnostics
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our training architecture maps real performance indexes to maximize structural neurological development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article 
                  key={index} 
                  className="group bg-[#0B0D13]/60 rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-5.5 h-5.5 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* AUDIENCE TARGETS */}
      <section className="py-20 relative border-t border-white/5 bg-black/10" aria-labelledby="audience-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 id="audience-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Profile Adaptation
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              SkillDrills adapts vectors directly matching your target environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {audienceData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="group text-center p-8 bg-[#0E111A]/40 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/50`}>
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative overflow-hidden border-t border-white/5" aria-labelledby="cta-heading">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase mb-4">
            Initialize Diagnostics
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-base">
            No accounts. No payments. Bypasses browser latency to record raw physical parameters instantly.
          </p>
          <Link 
            href="/drills" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4.5 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/20 transition transform hover:-translate-y-0.5"
          >
            Start Core Routine
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030305] border-t border-white/5 text-gray-500 py-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            <div>
              <h3 className="text-white font-bold tracking-wider mb-4 text-xs uppercase flex items-center gap-2">
                FPS Training <Lock className="w-3 h-3 text-yellow-400" />
              </h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><span className="cursor-not-allowed">Flick Shot Trainer</span></li>
                <li><span className="cursor-not-allowed">Target Acquisition</span></li>
                <li><span className="cursor-not-allowed">Reactive Tracking</span></li>
                <li><span className="text-gray-500 font-semibold cursor-not-allowed">Coming Soon</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">Cognitive Hub</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li>
                <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li>
                <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li>
                <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">All 16 Cognitive Drills →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">Academic Hub</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li>
                <li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">All 12 Academic Drills →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">Visual & Motor</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li>
                <li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li>
                <li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">All 14 Visual Drills →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">Sector Catalog</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li>
                <li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li>
                <li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li>
                <li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Target className="w-5.5 h-5.5 text-white" aria-hidden="true" />
              </div>
              <span className="text-white font-black text-xl tracking-tight uppercase">SkillDrills <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Pro</span></span>
            </div>
            <p className="text-sm text-gray-500 mb-3">&copy; 2026 SkillDrills. Elite Performance Training.</p>
            <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              SkillDrills is a free high-performance training platform with 115+ interactive drills across 9 categories including FPS aim training, cognitive brain games, memory exercises, typing speed tests, mental math, speed reading, visual tracking, hand-eye coordination, breathing exercises, and productivity tools. No registration required. Start training instantly at skilldrills.online.
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
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