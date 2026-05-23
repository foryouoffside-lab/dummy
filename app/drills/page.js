import Link from 'next/link';
import { Target, ArrowRight, Sparkles, Gamepad2, Brain, Eye, BookOpen, Timer, Hand, Dumbbell, Heart, Database, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'All Training Drills - 90+ Free Exercises | SkillDrills',
  description: 'Browse 90+ free training drills across 9 categories. FPS aim trainer, cognitive brain training, visual reaction speed, memory games, typing tests, and mental fitness. No sign-up.',
  keywords: [
    'training drills', 'brain training', 'FPS aim trainer', 'cognitive exercises',
    'free drills online', 'skilldrills', 'all drills', 'free training',
    'FPS gaming', 'memory training', 'visual training', 'academic drills',
    'productivity tools', 'motor skills', 'physical training', 'mental fitness',
  ],
  openGraph: {
    title: 'All Training Drills - 90+ Free Exercises | SkillDrills',
    description: '90+ free interactive drills for gaming, cognitive, and motor skills training. No sign-up.',
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
    description: '90+ free drills across 9 categories. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills',
  },
};

const drillCategories = [
  { name: 'FPS Gaming', color: 'from-red-500 to-orange-600', icon: Gamepad2, description: 'Reaction speed, aim training, flick shots, tracking and peripheral vision for competitive FPS gamers', slug: 'fps', drills: '22 drills', keywords: 'aim trainer, flick shots, Valorant, CS2, Overwatch' },
  { name: 'Cognitive', color: 'from-purple-500 to-indigo-600', icon: Brain, description: 'Memory, attention, focus, problem-solving and processing speed brain training exercises', slug: 'cognitive', drills: '16 drills', keywords: 'brain training, memory games, attention exercises' },
  { name: 'Visual', color: 'from-blue-500 to-cyan-600', icon: Eye, description: 'Reaction speed, tracking accuracy, peripheral vision, depth perception and visual recognition drills', slug: 'visual', drills: '13 drills', keywords: 'visual training, reaction time, eye tracking' },
  { name: 'Academic', color: 'from-yellow-500 to-amber-600', icon: BookOpen, description: 'Math speed, reading comprehension, writing speed, typing tests and inference practice', slug: 'academic', drills: '12 drills', keywords: 'typing test, speed reading, math practice' },
  { name: 'Productivity', color: 'from-emerald-500 to-teal-600', icon: Timer, description: 'Pomodoro timer, task management, focus sessions, deep work and habit tracking tools', slug: 'productivity', drills: '10 drills', keywords: 'pomodoro timer, focus tools, productivity apps' },
  { name: 'Memory', color: 'from-violet-500 to-purple-600', icon: Database, description: 'Short-term, working, long-term, spatial and associative memory training with scientific methods', slug: 'memory', drills: '15 drills', keywords: 'memory training, working memory, n-back' },
  { name: 'Motor Skills', color: 'from-green-500 to-emerald-600', icon: Hand, description: 'Hand-eye coordination, timing accuracy, precision control, finger sequencing and movement speed', slug: 'motor', drills: '12 drills', keywords: 'hand-eye coordination, motor skills, precision' },
  { name: 'Physical', color: 'from-orange-500 to-red-600', icon: Dumbbell, description: 'Balance training, reflex training, coordination drills, fitness exercises and agility ladder', slug: 'physical', drills: '11 drills', keywords: 'balance training, reflex drills, fitness' },
  { name: 'Mental Fitness', color: 'from-pink-500 to-rose-600', icon: Heart, description: 'Stress control, mindfulness, meditation, breathing exercises and biofeedback training', slug: 'mental-fitness', drills: '6 drills', keywords: 'breathing exercises, stress relief, meditation' },
];

export default function DrillsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Content */}
      <section className="sr-only" aria-label="Drills directory for search engines">
        <h2>All Training Drills - 90+ Free Exercises Across 9 Categories</h2>
        <p>
          Browse all free training drills on SkillDrills. 9 categories including FPS gaming aim trainer, cognitive brain training,
          visual reaction speed tests, academic typing and reading drills, productivity tools, memory exercises, motor skills training,
          physical fitness drills, and mental wellness exercises. All drills are completely free with no registration required.
        </p>
      </section>

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3" aria-label="SkillDrills Home">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-gray-900">SkillDrills</span>
            </Link>
            <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-6">
              <Link href="/drills/fps" className="text-sm text-gray-600 hover:text-blue-600 font-medium">FPS</Link>
              <Link href="/drills/cognitive" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Cognitive</Link>
              <Link href="/drills/memory" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Memory</Link>
              <Link href="/drills/academic" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Academic</Link>
              <Link href="/" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">Home</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600" aria-labelledby="drills-hero-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" aria-hidden="true" />
              <span className="text-sm text-white font-medium">90+ Free Drills</span>
            </div>
            <h1 id="drills-hero-heading" className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              All Training Drills
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Browse 90+ free interactive drills across 9 training categories. Improve FPS aim, cognitive skills, memory, typing speed, and more. No login required.
            </p>
            <nav aria-label="Breadcrumb" className="flex justify-center mb-8">
              <ol className="flex items-center gap-2 text-sm text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium" aria-current="page">All Drills</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="categories-heading">
        <div className="text-center mb-12">
          <h2 id="categories-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Training Categories</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Choose from 9 specialized categories with 90+ drills designed to improve your skills
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {drillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={`/drills/${category.slug}`} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                aria-label={`${category.name} - ${category.drills}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
                <div className="relative p-6 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold">{category.name}</h3>
                    <span className="text-xs bg-white/20 rounded-full px-2.5 py-1 font-medium">{category.drills}</span>
                  </div>
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">{category.description}</p>
                  <p className="text-white/50 text-xs mb-3 italic">{category.keywords}</p>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition">
                    <span className="text-sm font-medium">Browse Drills</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FPS BANNER */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Gamepad2 className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Most Popular</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">FPS Gaming Drills</h2>
              <p className="text-orange-100 mb-6 max-w-lg">Train reaction speed, flick shots, headshot accuracy, peripheral vision, and target tracking. Designed for competitive FPS games like Valorant, CS2, Overwatch 2, and Apex Legends.</p>
              <Link href="/drills/fps" className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore FPS Drills <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-bold text-white">22</p><p className="text-sm text-orange-200">FPS Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Aim</p><p className="text-sm text-orange-200">Trainer</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">240</p><p className="text-sm text-orange-200">FPS Optimized</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Free</p><p className="text-sm text-orange-200">Forever</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COGNITIVE BANNER */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Brain className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Brain Training</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Cognitive Drills</h2>
              <p className="text-purple-100 mb-6 max-w-lg">Improve memory retention, attention span, mental focus, and problem-solving abilities with scientifically-designed brain training exercises.</p>
              <Link href="/drills/cognitive" className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Cognitive Drills <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-bold text-white">16</p><p className="text-sm text-purple-200">Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Brain</p><p className="text-sm text-purple-200">Training</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Focus</p><p className="text-sm text-purple-200">and Memory</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Free</p><p className="text-sm text-purple-200">Forever</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL BANNER */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Eye className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Visual Training</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Visual Drills</h2>
              <p className="text-blue-100 mb-6 max-w-lg">Enhance reaction speed, moving target tracking, peripheral vision awareness, and visual recognition with specialized eye training exercises.</p>
              <Link href="/drills/visual" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Visual Drills <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-bold text-white">13</p><p className="text-sm text-blue-200">Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Reaction</p><p className="text-sm text-blue-200">Speed</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Target</p><p className="text-sm text-blue-200">Tracking</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Free</p><p className="text-sm text-blue-200">Forever</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMIC BANNER */}
      <section className="bg-gradient-to-r from-yellow-500 to-amber-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <BookOpen className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Academic Skills</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Academic Drills</h2>
              <p className="text-yellow-100 mb-6 max-w-lg">Math speed, reading comprehension, writing speed, typing tests and inference practice. Boost your academic performance with timed exercises.</p>
              <Link href="/drills/academic" className="inline-flex items-center gap-2 bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Academic Drills <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-bold text-white">12</p><p className="text-sm text-yellow-200">Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Typing</p><p className="text-sm text-yellow-200">Test</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Speed</p><p className="text-sm text-yellow-200">Reading</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Free</p><p className="text-sm text-yellow-200">Forever</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTIVITY BANNER */}
      <section className="bg-gradient-to-r from-emerald-500 to-teal-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Timer className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Work Smarter</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Productivity Tools</h2>
              <p className="text-emerald-100 mb-6 max-w-lg">Pomodoro timer, task management, focus sessions, deep work and habit tracking tools to maximize your efficiency and get more done.</p>
              <Link href="/drills/productivity" className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Productivity Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-bold text-white">10</p><p className="text-sm text-emerald-200">Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Pomodoro</p><p className="text-sm text-emerald-200">Timer</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Deep</p><p className="text-sm text-emerald-200">Work</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Free</p><p className="text-sm text-emerald-200">Forever</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMORY BANNER */}
      <section className="bg-gradient-to-r from-violet-500 to-purple-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Database className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Memory Training</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Memory Drills</h2>
              <p className="text-violet-100 mb-6 max-w-lg">Short-term, working, long-term, spatial and associative memory training with scientific methods. Boost your recall ability.</p>
              <Link href="/drills/memory" className="inline-flex items-center gap-2 bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Memory Drills <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-bold text-white">15</p><p className="text-sm text-violet-200">Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Working</p><p className="text-sm text-violet-200">Memory</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">N-Back</p><p className="text-sm text-violet-200">Training</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Free</p><p className="text-sm text-violet-200">Forever</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTOR SKILLS BANNER */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Hand className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Motor Skills</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Motor Skills Drills</h2>
              <p className="text-green-100 mb-6 max-w-lg">Hand-eye coordination, timing accuracy, precision control, finger sequencing and movement speed training for fine motor development.</p>
              <Link href="/drills/motor" className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Motor Drills <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-bold text-white">12</p><p className="text-sm text-green-200">Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Hand-Eye</p><p className="text-sm text-green-200">Coordination</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Precision</p><p className="text-sm text-green-200">Control</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Free</p><p className="text-sm text-green-200">Forever</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHYSICAL BANNER */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Dumbbell className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Physical Training</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Physical Drills</h2>
              <p className="text-orange-100 mb-6 max-w-lg">Balance training, reflex training, coordination drills, fitness exercises and agility ladder workouts for physical conditioning.</p>
              <Link href="/drills/physical" className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Physical Drills <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-bold text-white">11</p><p className="text-sm text-orange-200">Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Balance</p><p className="text-sm text-orange-200">Training</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Reflex</p><p className="text-sm text-orange-200">Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Free</p><p className="text-sm text-orange-200">Forever</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENTAL FITNESS BANNER */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-600 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Heart className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Mental Wellness</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Mental Fitness</h2>
              <p className="text-pink-100 mb-6 max-w-lg">Stress control, mindfulness, meditation, breathing exercises and biofeedback training for mental wellness and emotional balance.</p>
              <Link href="/drills/mental-fitness" className="inline-flex items-center gap-2 bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Mental Fitness <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-bold text-white">6</p><p className="text-sm text-pink-200">Drills</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Breathing</p><p className="text-sm text-pink-200">Exercises</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Stress</p><p className="text-sm text-pink-200">Control</p></div>
                  <div className="text-center"><p className="text-3xl font-bold text-white">Free</p><p className="text-sm text-pink-200">Forever</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Start Training Now</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">90+ drills. 9 categories. Completely free. No registration required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/drills/fps" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
              Try FPS Trainer <Gamepad2 className="w-5 h-5" />
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition">
              Back to Home <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li>
                <li><Link href="/drills/fps/headshot-trainer" className="hover:text-white transition-colors">Headshot Trainer</Link></li>
                <li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li>
                <li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 22 FPS Drills</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/drills/cognitive/memory" className="hover:text-white transition-colors">Memory Games</Link></li>
                <li><Link href="/drills/cognitive/attention" className="hover:text-white transition-colors">Attention Drills</Link></li>
                <li><Link href="/drills/cognitive/problem-solving" className="hover:text-white transition-colors">Problem Solving</Link></li>
                <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Academic</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li>
                <li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Visual and Motor</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li>
                <li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li>
                <li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Visual Drills</Link></li>
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
            <p className="text-xs max-w-2xl mx-auto leading-relaxed">
              SkillDrills is a free online training platform with 90+ drills across 9 categories. Train FPS aim, cognitive skills, memory, typing speed, and mental fitness. No registration required. Start training instantly at skilldrills.online.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}