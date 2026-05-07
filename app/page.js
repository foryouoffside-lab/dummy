import Link from 'next/link';
import { 
  Target, ArrowRight, Zap, Trophy, BarChart3, Sparkles, 
  TrendingUp, Brain, Crosshair, Eye, Timer, Keyboard, 
  Dumbbell, Database, Star, Shield, Users
} from 'lucide-react';

export const metadata = {
  title: 'SkillDrills - Free FPS Gaming and Cognitive Brain Training Platform',
  description: 'Master your mind and mechanics. 90+ free drills for FPS aim training, reaction time, memory, cognitive skills, typing speed, and mental fitness. No sign-up required. Start training instantly.',
  keywords: [
    'brain training', 'FPS aim trainer', 'free aim trainer', 'reaction time test',
    'memory games', 'cognitive training', 'typing speed test', 'mental fitness',
    'online aim trainer', 'speed reading', 'free brain games', 'skill drills', 'skilldrills'
  ],
  openGraph: {
    title: 'SkillDrills - Free FPS Gaming and Cognitive Brain Training',
    description: 'Master your mind and mechanics. 90+ free drills. No registration required.',
    url: 'https://skilldrills.online',
    siteName: 'SkillDrills',
    images: [{ url: '/icons/icon-512x512.png', width: 512, height: 512, alt: 'SkillDrills' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillDrills - FPS and Cognitive Training',
    description: '90+ free brain training drills. No sign-up needed.',
    images: ['/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online' },
};

const categories = [
  { 
    name: 'FPS Training', 
    description: 'Aim trainer, flick shots, tracking and reflex drills for competitive gaming', 
    icon: Crosshair, 
    href: '/drills/fps', 
    gradient: 'from-red-500 via-rose-500 to-orange-500',
    iconBg: 'bg-gradient-to-br from-red-500 to-orange-500',
    drills: '22 drills',
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
    drills: '12 drills' 
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
    description: 'Target specific skill areas with 90+ specialized drills across 9 categories', 
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
    description: 'Boost memory retention by 40%, double your reading speed, and master mental math for academic excellence.' 
  },
  { 
    icon: BarChart3, 
    gradient: 'from-emerald-500 to-green-500',
    title: 'Professionals', 
    description: 'Enhance productivity, focus endurance, and cognitive flexibility for peak workplace performance.' 
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* ============ HEADER ============ */}
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

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* SEO Content */}
      <section className="sr-only" aria-label="Platform description">
        <h2>SkillDrills - Free Brain Training and FPS Aim Trainer Platform</h2>
        <p>
          SkillDrills is a completely free online training platform offering 90+ interactive drills across 9 categories: 
          FPS aim training for Valorant, CS2, Overwatch, Apex Legends and more. 
          Cognitive brain training including memory games, attention exercises, focus training and problem-solving puzzles. 
          Academic skills practice with typing tests, speed reading, mental math drills and reading comprehension. 
          Mental fitness through breathing exercises, stress control and biofeedback training. 
          Motor skills development for hand-eye coordination, precision control and timing accuracy. 
          Visual training for peripheral vision, depth perception, reaction speed and visual recognition. 
          Productivity tools for focus endurance, task switching and time management. 
          Physical training with balance exercises, coordination drills and reflex training. 
          No registration, no login, no credit card required. Start training instantly for free.
        </p>
      </section>

      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600" aria-labelledby="hero-heading">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" aria-hidden="true" />
              <span className="text-sm text-white">Free Training Platform</span>
            </div>
            
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Train Your Brain & Body
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              Free training platform for everyone. No login required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/drills" 
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                Browse All Drills
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link 
                href="/drills/fps" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                <Crosshair className="w-5 h-5" aria-hidden="true" />
                FPS Trainer
              </Link>
            </div>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 max-w-2xl mx-auto">
              <div>
                <p className="text-3xl font-bold text-white">9</p>
                <p className="text-sm text-blue-200">Training Categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">Free</p>
                <p className="text-sm text-blue-200">No Registration</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">0</p>
                <p className="text-sm text-blue-200">Login Required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES SECTION ============ */}
      <section className="bg-white py-16" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="categories-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Training Categories
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Choose from 9 categories with 90+ free drills designed to improve your gaming, cognitive, and fitness skills
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

      {/* ============ FEATURES SECTION ============ */}
      <section className="bg-gray-50 py-16" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Features
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Everything you need to practice and improve your skills
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

      {/* ============ AUDIENCE SECTION ============ */}
      <section className="bg-white py-16" aria-labelledby="audience-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="audience-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Who Uses SkillDrills?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our free training platform is designed for gamers, students, professionals, and anyone wanting to improve
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

      {/* ============ CTA SECTION ============ */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold text-white mb-4">
            Ready to Start Training?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            All drills are completely free. No registration, no credit card required.
          </p>
          <Link 
            href="/drills" 
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            View All Drills
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
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
            <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-4">
              SkillDrills is a free online training platform with 90+ drills across 9 categories. Train FPS aim, cognitive skills, memory, typing speed, and mental fitness. No registration required. Start training instantly at skilldrills.online.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://github.com/foryouoffside-lab/skilldrills" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}