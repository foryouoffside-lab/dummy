import Link from 'next/link';
import { Target, ArrowRight, Sparkles, Gamepad2, Brain, Eye, BookOpen, Timer, Hand, Dumbbell, Heart, Database, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'All Training Drills - 149+ Free Exercises | SkillDrills',
  description: 'Browse 149+ free training drills across 10 categories. FPS aim trainer, cognitive brain training, visual tracking, memory games, and mental fitness. No sign-up.',
  keywords: [
    'training drills', 'brain training', 'FPS aim trainer', 'cognitive exercises',
    'free drills online', 'skilldrills', 'all drills', 'free training',
    'FPS gaming', 'memory training', 'visual training', 'academic drills',
    'productivity tools', 'motor skills', 'physical training', 'mental fitness',
  ],
  openGraph: {
    title: 'All Training Drills - 149+ Free Exercises | SkillDrills',
    description: '149+ free interactive drills for gaming, cognitive, and motor skills training. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'All Training Drills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Training Drills | SkillDrills',
    description: '149+ free drills across 10 categories. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills',
  },
};


const drillCategories = [
  { name: 'FPS Gaming', color: 'from-red-500 to-orange-600', icon: Gamepad2, description: 'Reaction speed, aim training, flick shots, tracking and peripheral vision for competitive FPS gamers', slug: 'fps', drills: '15 drills', keywords: 'aim trainer, flick shots, Valorant, CS2, Overwatch' },
  { name: 'Cognitive', color: 'from-purple-500 to-indigo-600', icon: Brain, description: 'Memory, attention, focus, problem-solving and processing speed brain training exercises', slug: 'cognitive', drills: '16 drills', keywords: 'brain training, memory games, attention exercises' },
  { name: 'Visual', color: 'from-blue-500 to-cyan-600', icon: Eye, description: 'Reaction speed, tracking accuracy, peripheral vision, depth perception and visual recognition drills', slug: 'visual', drills: '14 drills', keywords: 'visual training, reaction time, eye tracking' },
  { name: 'Visual Tracking', color: 'from-cyan-500 to-blue-600', icon: Eye, description: 'Smooth pursuit, visual velocity estimation, gaze stability, trajectory prediction and saccadic training', slug: 'visual-tracking', drills: '25 drills', keywords: 'smooth pursuit, eye tracking, gaze stability' },
  { name: 'Academic', color: 'from-yellow-500 to-amber-600', icon: BookOpen, description: 'Math speed, reading comprehension, writing speed, typing tests and inference practice', slug: 'academic', drills: '12 drills', keywords: 'typing test, speed reading, math practice' },
  { name: 'Productivity', color: 'from-emerald-500 to-teal-600', icon: Timer, description: 'Pomodoro timer, task management, focus sessions, deep work and habit tracking tools', slug: 'productivity', drills: '10 drills', keywords: 'pomodoro timer, focus tools, productivity apps' },
  { name: 'Memory', color: 'from-violet-500 to-purple-600', icon: Database, description: 'Short-term, working, long-term, spatial and associative memory training with scientific methods', slug: 'memory', drills: '15 drills', keywords: 'memory training, working memory, n-back' },
  { name: 'Motor Skills', color: 'from-green-500 to-emerald-600', icon: Hand, description: 'Hand-eye coordination, timing accuracy, precision control, finger sequencing and movement speed', slug: 'motor', drills: '12 drills', keywords: 'hand-eye coordination, motor skills, precision' },
  { name: 'Physical', color: 'from-orange-500 to-red-600', icon: Dumbbell, description: 'Balance training, reflex training, coordination drills, fitness exercises and agility ladder', slug: 'physical', drills: '11 drills', keywords: 'balance training, reflex drills, fitness' },
  { name: 'Mental Fitness', color: 'from-pink-500 to-rose-600', icon: Heart, description: 'Stress control, mindfulness, meditation, breathing exercises and biofeedback training', slug: 'mental-fitness', drills: '6 drills', keywords: 'breathing exercises, stress relief, meditation' },
];

export default function DrillsPage() {
  return (
    <div 
      className="min-h-screen bg-[#050508] text-gray-100 selection:bg-blue-500/20 selection:text-blue-400 font-sans relative overflow-hidden"
      style={{ 
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(20, 24, 38, 0.4) 0%, rgba(5, 5, 8, 1) 85%), linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)', 
        backgroundSize: '100% 100%, 48px 48px, 48px 48px' 
      }}
    >
      <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: "0" }}>All Training Drills - 90+ Free Exercises Across 9 Categories</h1>
      
      {/* SEO Content */}
      <section className="sr-only" aria-label="Drills directory for search engines">
        <h2>All Training Drills - 149+ Free Exercises Across 10 Categories</h2>
        <p>
          Browse all free training drills on SkillDrills. 10 categories including FPS gaming aim trainer, visual tracking, cognitive brain training,
          visual reaction speed tests, academic typing and reading drills, productivity tools, memory exercises, motor skills training,
          physical fitness drills, and mental wellness exercises. All drills are completely free with no registration required.
        </p>
      </section>

      {/* HEADER */}
      <header className="fixed top-4 left-4 right-4 z-50 bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl max-w-7xl mx-auto" role="banner">
        <div className="px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group"
              aria-label="SkillDrills Home"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Target className="w-5.5 h-5.5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                SkillDrills<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 ml-1 font-bold">Pro</span>
              </span>
            </Link>
            <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-6">
              <Link href="/drills/fps" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">FPS</Link>
              <Link href="/drills/cognitive" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Cognitive</Link>
              <Link href="/drills/memory" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Memory</Link>
              <Link href="/drills/academic" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Academic</Link>
              <Link href="/" className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all font-semibold">Home</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-36 pb-16" aria-labelledby="drills-hero-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 shadow-inner">
            <Sparkles className="w-4 h-4 text-yellow-400" aria-hidden="true" />
            <span className="text-xs text-blue-300 font-bold uppercase tracking-wider">Diagnostic Matrix Catalog</span>
          </div>
          <h2 id="drills-hero-heading" className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Diagnostic Drills Database
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Configure your mechanical and cognitive vectors. Select a sub-sector below to load specialized training algorithms.
          </p>
          <nav aria-label="Breadcrumb" className="flex justify-center">
            <ol className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-400" aria-current="page">All Sectors</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="categories-heading">
        <div className="text-center mb-12">
          <h2 id="categories-heading" className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Training Sectors</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm mt-1">
            Browse through 10 specialized category modules comprising 149+ distinct performance diagnostic tasks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {drillCategories.map((category) => {
            const Icon = category.icon;
            // Define borders & glows depending on category
            const neonBorderHover = {
              fps: 'hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]',
              cognitive: 'hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]',
              visual: 'hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]',
              'visual-tracking': 'hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]',
              academic: 'hover:border-green-500/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]',
              productivity: 'hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]',
              memory: 'hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]',
              motor: 'hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]',
              physical: 'hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]',
              'mental-fitness': 'hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.1)]',
            }[category.slug] || 'hover:border-blue-500/40';

            return (
              <Link key={category.slug} href={`/drills/${category.slug}`} className={`group relative overflow-hidden bg-[#0E111A]/60 rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 ${neonBorderHover}`}
                aria-label={`${category.name} - ${category.drills}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">{category.name}</h3>
                    <span className="text-[10px] bg-white/5 border border-white/10 text-gray-400 rounded-full px-2.5 py-0.5 font-bold uppercase">{category.drills}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{category.description}</p>
                  <p className="text-gray-600 text-xs mb-6 italic tracking-wide">{category.keywords}</p>
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs uppercase tracking-wider group-hover:text-blue-300">
                    <span>Explore Routine</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FPS BANNER */}
      <section className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-8 overflow-hidden bg-[#0E111A]/60 border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-red-500" />
        <div className="max-w-7xl mx-auto px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1">
                <Gamepad2 className="w-4 h-4 text-red-400" />
                <span className="text-xs text-red-300 font-bold uppercase tracking-wider">Tactical Hub</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">FPS Aim & Reflex Sector</h2>
              <p className="text-gray-400 max-w-lg leading-relaxed">Train reaction speed, flick shots, tracking stability, and wide-angle awareness. Optimized for Valorant, CS2, Overwatch 2, and Apex Legends.</p>
              <Link href="/drills/fps" className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-red-500/20 transition">
                Load FPS Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-black text-white">15</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">FPS Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">1:1</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Mouse Raw Input</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">360Hz</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Hz Optimized</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">FREE</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">No Sign-Up</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COGNITIVE BANNER */}
      <section className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-8 overflow-hidden bg-[#0E111A]/60 border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-purple-500" />
        <div className="max-w-7xl mx-auto px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-purple-300 font-bold uppercase tracking-wider">Neural Lab</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Cognitive Function Sector</h2>
              <p className="text-gray-400 max-w-lg leading-relaxed">Boost working memory capacity, focus stamina, pattern inference, and structural logic reasoning with scientific puzzles.</p>
              <Link href="/drills/cognitive" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/20 transition">
                Load Cognitive Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-black text-white">16</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Diagnostic Tasks</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Brain</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Focus Training</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Neuro</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Adapting</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">100%</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Unrestricted</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL BANNER */}
      <section className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-8 overflow-hidden bg-[#0E111A]/60 border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-blue-500" />
        <div className="max-w-7xl mx-auto px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-blue-300 font-bold uppercase tracking-wider">Ocular Sector</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Visual Processing Hub</h2>
              <p className="text-gray-400 max-w-lg leading-relaxed">Optimize tracking precision, peripheral light detection, strobe latency recognition, and distance/depth estimation parameters.</p>
              <Link href="/drills/visual" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition">
                Load Ocular Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-black text-white">13</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Ocular Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Speed</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Response Tests</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Radar</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Eye Pursuit</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">FREE</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">No Login</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMIC BANNER */}
      <section className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-8 overflow-hidden bg-[#0E111A]/60 border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-green-500" />
        <div className="max-w-7xl mx-auto px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                <BookOpen className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-300 font-bold uppercase tracking-wider">Education Lab</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Academic Skills Sector</h2>
              <p className="text-gray-400 max-w-lg leading-relaxed">Sharpen arithmetic race calculations, RSVP speed reading blocks, WPM code typing, and syntactic text inference comprehension.</p>
              <Link href="/drills/academic" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/20 transition">
                Load Academic Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-black text-white">12</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Logic Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">WPM</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Code Typing</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Mental</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Math Race</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">FREE</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">No Sign-Up</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTIVITY BANNER */}
      <section className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-8 overflow-hidden bg-[#0E111A]/60 border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-emerald-500" />
        <div className="max-w-7xl mx-auto px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                <Timer className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Efficiency Lab</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Productivity Control Sector</h2>
              <p className="text-gray-400 max-w-lg leading-relaxed">Condition concentration endurance, multi-tasking flow, Pomodoro synchronization, and temporal cost context-switching parameters.</p>
              <Link href="/drills/productivity" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition">
                Load Efficiency Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-black text-white">10</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Flow Utilities</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">POMO</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Sync Clocks</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Focus</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Stamina Indices</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">FREE</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">No Login</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMORY BANNER */}
      <section className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-8 overflow-hidden bg-[#0E111A]/60 border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-indigo-500" />
        <div className="max-w-7xl mx-auto px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
                <Database className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Memory Sector</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Information Storage Hub</h2>
              <p className="text-gray-400 max-w-lg leading-relaxed">Strengthen short-term color sequencers, working N-back grids, and paired-associate story recall storage algorithms.</p>
              <Link href="/drills/memory" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/20 transition">
                Load Storage Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-black text-white">15</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Storage Tasks</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">N-Back</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Fluid IQ</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Recall</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Tier Scaling</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">FREE</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">No Sign-Up</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTOR SKILLS BANNER */}
      <section className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-8 overflow-hidden bg-[#0E111A]/60 border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-yellow-500" />
        <div className="max-w-7xl mx-auto px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-3 py-1">
                <Hand className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-yellow-300 font-bold uppercase tracking-wider">Kinetic Lab</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Motor Control Sector</h2>
              <p className="text-gray-400 max-w-lg leading-relaxed">Train hand-eye coordination accuracy, fine-motor precision, rhythm synchronization timing, and sequence response limits.</p>
              <Link href="/drills/motor" className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/20 transition">
                Load Kinetic Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-black text-white">12</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Coordination Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Sync</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Tempo Training</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Rhythm</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Tactile Precision</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">FREE</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">No Login</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHYSICAL BANNER */}
      <section className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-8 overflow-hidden bg-[#0E111A]/60 border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-orange-500" />
        <div className="max-w-7xl mx-auto px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
                <Dumbbell className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-orange-300 font-bold uppercase tracking-wider">Aero Hub</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Physical Agility Sector</h2>
              <p className="text-gray-400 max-w-lg leading-relaxed">Challenge dynamic center-of-gravity balance, cross-body coordination patterns, and fast foot agility ladder routines.</p>
              <Link href="/drills/physical" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/20 transition">
                Load Physical Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-black text-white">11</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Agility Tasks</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Reflex</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Ladder Patterns</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Balance</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Dynamic Equilibrium</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">FREE</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">No Sign-Up</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENTAL FITNESS BANNER */}
      <section className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-8 overflow-hidden bg-[#0E111A]/60 border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-pink-500" />
        <div className="max-w-7xl mx-auto px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-3 py-1">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-pink-300 font-bold uppercase tracking-wider">Resilience Hub</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Mental Conditioning Sector</h2>
              <p className="text-gray-400 max-w-lg leading-relaxed">Optimize parasympathetic vagal brake breathing, coherent box tempos, and stress-inoculation pressure exercises.</p>
              <Link href="/drills/mental-fitness" className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-pink-500/20 transition">
                Load Resonance Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-black text-white">6</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Resilience Utilities</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Breathing</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Coherence Waves</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">Calm</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Under Pressure</p></div>
                  <div className="text-center"><p className="text-3xl font-black text-white">FREE</p><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">No Login</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Initialize Routine</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-base">90+ distinct performance diagnostic tasks. Completely free. Instantly loaded.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/drills/fps" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition transform hover:scale-105">
              Launch FPS Aim Sectors <Gamepad2 className="w-5 h-5" />
            </Link>
            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition">
              Return Home <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030305] border-t border-white/5 text-gray-500 py-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            <div>
              <h3 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">FPS Training</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li>
                <li><Link href="/drills/fps/headshot-trainer" className="hover:text-white transition-colors">Headshot Trainer</Link></li>
                <li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li>
                <li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">All 15 FPS Drills</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">Cognitive</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><Link href="/drills/cognitive/memory" className="hover:text-white transition-colors">Memory Games</Link></li>
                <li><Link href="/drills/cognitive/attention" className="hover:text-white transition-colors">Attention Drills</Link></li>
                <li><Link href="/drills/cognitive/problem-solving" className="hover:text-white transition-colors">Problem Solving</Link></li>
                <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">All 16 Cognitive Drills</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">Academic</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li>
                <li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">All 12 Academic Drills</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">Visual and Motor</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li>
                <li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li>
                <li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">All Visual Drills</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">More Categories</h3>
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
            <p className="text-sm text-gray-500 mb-2">&copy; 2026 SkillDrills. Elite Performance Training.</p>
            <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed">
              SkillDrills is a free online training platform with 90+ drills across 9 categories. Train FPS aim, cognitive skills, memory, typing speed, and mental fitness. No registration required. Start training instantly at skilldrills.online.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}