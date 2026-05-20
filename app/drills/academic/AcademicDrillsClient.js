'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Clock, Play, BookOpen, Target, 
  Award, Calculator, Eye, PenTool, Brain,
  Star, Home, ChevronRight, Crosshair, Dumbbell, Database, Users, Share2, Copy
} from 'lucide-react';

export default function AcademicDrillsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = useMemo(() => [
    {
      name: 'Math Speed',
      folderName: 'math-speed',
      icon: Calculator,
      description: 'Mental arithmetic, multiplication, and calculation speed drills',
      gradient: 'from-red-500 to-orange-600',
      bg: 'bg-red-50',
      textColor: 'text-red-600',
      tagBg: 'bg-red-100 text-red-700'
    },
    {
      name: 'Reading Speed',
      folderName: 'reading-speed',
      icon: Eye,
      description: 'RSVP, peripheral vision, and columnar reading techniques',
      gradient: 'from-blue-500 to-cyan-600',
      bg: 'bg-blue-50',
      textColor: 'text-blue-600',
      tagBg: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Writing Speed',
      folderName: 'writing-speed',
      icon: PenTool,
      description: 'Typing speed tests and code syntax typing practice',
      gradient: 'from-green-500 to-emerald-600',
      bg: 'bg-green-50',
      textColor: 'text-green-600',
      tagBg: 'bg-green-100 text-green-700'
    },
    {
      name: 'Comprehension',
      folderName: 'comprehension',
      icon: Brain,
      description: 'Reading, listening, and inference comprehension training',
      gradient: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-50',
      textColor: 'text-purple-600',
      tagBg: 'bg-purple-100 text-purple-700'
    }
  ], []);

  const drills = useMemo(() => [
    { id: 1, name: 'Arithmetic Race', folderName: 'arithmetic-race', category: 'Math Speed', difficulty: 'Medium', duration: '1 min', description: 'Solve addition, subtraction & multiplication with 4-option multiple choice' },
    { id: 2, name: 'Math Reaction', folderName: 'Math-Reaction', category: 'Math Speed', difficulty: 'Hard', duration: '1 min', description: 'Identify odd/even results under adaptive time pressure with lives system' },
    { id: 3, name: 'Multiplication Tables', folderName: 'multiplication-tables', category: 'Math Speed', difficulty: 'Easy', duration: '1 min', description: 'Master times tables up to 20×20 with intelligent high-friction number focus' },
    { id: 4, name: 'Mental Math', folderName: 'mental-math', category: 'Math Speed', difficulty: 'Hard', duration: '1 min', description: 'Calculate arithmetic problems across 3 difficulty tiers with combo streaks' },
    { id: 5, name: 'Speed Reader', folderName: 'speed-reader', category: 'Reading Speed', difficulty: 'Medium', duration: '1 min', description: '10 rotating text columns at adjustable 100-800 WPM with width control' },
    { id: 6, name: 'RSVP Reader', folderName: 'rsvp-reader', category: 'Reading Speed', difficulty: 'Medium', duration: '1 min', description: 'Rapid Serial Visual Presentation with Optimal Recognition Point alignment' },
    { id: 7, name: 'Peripheral Reader', folderName: 'peripheral-reader', category: 'Reading Speed', difficulty: 'Hard', duration: '1 min', description: 'Train extrafoveal word recognition with random recall questions' },
    { id: 8, name: 'Typing Test', folderName: 'typing-test', category: 'Writing Speed', difficulty: 'Medium', duration: '1 min', description: 'Type 30 unique quotes across Easy/Medium/Hard levels with WPM tracking' },
    { id: 9, name: 'Code Typing', folderName: 'code-typing', category: 'Writing Speed', difficulty: 'Hard', duration: '1 min', description: 'Practice JavaScript, Python & HTML syntax with character-level feedback' },
    { id: 10, name: 'Reading Comprehension', folderName: 'reading-comprehension', category: 'Comprehension', difficulty: 'Medium', duration: '1 min', description: 'Fresh passages every session with scored quizzes across 3 difficulty levels' },
    { id: 11, name: 'Listening Comprehension', folderName: 'listening-comprehension', category: 'Comprehension', difficulty: 'Medium', duration: '1 min', description: '9 audio passages with male/female voices and transcript option' },
    { id: 12, name: 'Inference Drill', folderName: 'inference-drill', category: 'Comprehension', difficulty: 'Hard', duration: '1 min', description: '12 critical reasoning passages with detailed answer rationales' }
  ], []);

  const totalDrills = drills.length;

  const getDifficultyStyles = (difficulty) => {
    const map = {
      'Easy': 'bg-green-50 text-green-600 border-green-200',
      'Medium': 'bg-yellow-50 text-yellow-600 border-yellow-200',
      'Hard': 'bg-orange-50 text-orange-600 border-orange-200',
    };
    return map[difficulty] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const getCategoryIcon = (category) => {
    const map = {
      'Math Speed': <Calculator className="w-5 h-5 text-red-600" />,
      'Reading Speed': <Eye className="w-5 h-5 text-blue-600" />,
      'Writing Speed': <PenTool className="w-5 h-5 text-green-600" />,
      'Comprehension': <Brain className="w-5 h-5 text-purple-600" />
    };
    return map[category] || <BookOpen className="w-5 h-5 text-gray-600" />;
  };

  const getCategoryStyles = (category) => {
    const map = {
      'Math Speed': { bg: 'bg-red-50', hover: 'group-hover:text-red-600', gradient: 'from-red-500 to-orange-600' },
      'Reading Speed': { bg: 'bg-blue-50', hover: 'group-hover:text-blue-600', gradient: 'from-blue-500 to-cyan-600' },
      'Writing Speed': { bg: 'bg-green-50', hover: 'group-hover:text-green-600', gradient: 'from-green-500 to-emerald-600' },
      'Comprehension': { bg: 'bg-purple-50', hover: 'group-hover:text-purple-600', gradient: 'from-purple-500 to-pink-600' }
    };
    return map[category] || { bg: 'bg-gray-50', hover: 'group-hover:text-gray-600', gradient: 'from-gray-500 to-gray-600' };
  };

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Academic Training Drills | SkillDrills', text: '12 free drills for math, reading, typing, and comprehension!', url: 'https://skilldrills.online/drills/academic' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/academic'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/academic'); alert('Link copied!'); };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading academic drills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-orange-600 transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li><Link href="/drills" className="hover:text-orange-600 transition-colors">Drills</Link></li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li><span className="text-orange-600 font-medium" aria-current="page">Academic</span></li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Academic Training Drills</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">12 free drills for math, reading, writing, and comprehension. Perfect for students, exam prep, and lifelong learners.</p>
            </div>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <a
              key={cat.name}
              href={`#${cat.folderName}`}
              className={`px-3 py-1 rounded-full text-xs font-medium transition hover:scale-105 ${cat.tagBg}`}
            >
              {cat.name}
            </a>
          ))}
        </div>

        {/* Screen-reader SEO Content */}
        <section className="sr-only" aria-label="Academic drills overview">
          <h2>Free Academic Training Drills - Math, Reading, Writing & Comprehension</h2>
          <p>
            Access 12 free academic skill training drills across 4 categories: Math Speed with Arithmetic Race, Math Reaction, Multiplication Tables, and Mental Math. Reading Speed with Speed Reader, RSVP Reader, and Peripheral Reader. Writing Speed with Typing Test and Code Typing. Comprehension with Reading Comprehension, Listening Comprehension, and Inference Drill. All drills are completely free with no registration required. Best scores save locally in your browser. Start practicing instantly at skilldrills.online.
          </p>
        </section>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Available Drills</p>
              <Target className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalDrills}</p>
            <p className="text-xs text-gray-500 mt-1">Ready to train</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Categories</p>
              <BookOpen className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Skill areas</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Free Access</p>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">100%</p>
            <p className="text-xs text-gray-500 mt-1">No login required</p>
          </div>
        </div>

        {/* Drills by Category */}
        {categories.map(category => {
          const categoryDrills = drills.filter(d => d.category === category.name);
          if (categoryDrills.length === 0) return null;
          const styles = getCategoryStyles(category.name);
          
          return (
            <section key={category.name} id={category.folderName} className="mb-12" aria-labelledby={`heading-${category.folderName}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${styles.gradient}`}></div>
                <h2 id={`heading-${category.folderName}`} className="text-xl font-bold text-gray-900">{category.name}</h2>
                <span className="text-xs text-gray-400">({categoryDrills.length} drills)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map(drill => {
                  const drillPath = `/drills/academic/${category.folderName}/${drill.folderName}`;
                  
                  return (
                    <Link
                      key={drill.id}
                      href={drillPath}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${styles.bg}`}>
                            {getCategoryIcon(category.name)}
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyStyles(drill.difficulty)}`}>
                            {drill.difficulty}
                          </div>
                        </div>
                        
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${styles.hover} transition-colors`}>
                          {drill.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{drill.description}</p>
                        
                        <div className="flex items-center mb-4 text-sm text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{drill.duration}</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{category.name}</span>
                          <div className={`flex items-center gap-1 ${category.textColor} group-hover:gap-2 transition-all`}>
                            <span className="text-sm font-medium">Start</span>
                            <Play className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Tips Section */}
        <section className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 mt-8 text-white" aria-labelledby="tips-heading">
          <h3 id="tips-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Academic Training Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Practice Daily</h4>
              <p className="text-sm text-yellow-100">Consistent short practice sessions are more effective than long, infrequent ones. Aim for 10-15 minutes daily.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Track Your Progress</h4>
              <p className="text-sm text-yellow-100">Monitor your speed and accuracy to see improvement over time. All best scores are saved locally in your browser.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Challenge Yourself</h4>
              <p className="text-sm text-yellow-100">Gradually increase difficulty levels and target speeds. Push beyond your comfort zone for maximum improvement.</p>
            </div>
          </div>
        </section>

        {/* Explore Related Categories */}
        <section className="mt-12 mb-8" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-bold text-gray-900 text-center mb-8">Explore More Free Training Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { href: '/drills/cognitive', emoji: '🧠', title: 'Cognitive Training', desc: 'Memory, focus, attention & problem solving', hoverColor: 'group-hover:text-purple-600', ringColor: 'focus:ring-purple-500' },
              { href: '/drills/productivity', emoji: '⏱️', title: 'Productivity', desc: 'Focus endurance & time management', hoverColor: 'group-hover:text-emerald-600', ringColor: 'focus:ring-emerald-500' },
              { href: '/drills/memory', emoji: '💾', title: 'Memory Drills', desc: 'Working memory, spatial & long-term recall', hoverColor: 'group-hover:text-indigo-600', ringColor: 'focus:ring-indigo-500' },
              { href: '/drills/fps', emoji: '🎮', title: 'FPS Training', desc: 'Aim trainer, reflex & tracking drills', hoverColor: 'group-hover:text-red-600', ringColor: 'focus:ring-red-500' }
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 ${item.ringColor} focus:ring-offset-2`}
                aria-label={`${item.title} - ${item.desc}`}
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className={`font-semibold text-gray-900 ${item.hoverColor} transition`}>{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Global Footer */}
        <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
              <div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div>
              <div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div>
              <div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li></ul></div>
              <div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div>
              <div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
              <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
              <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online academic training drills for math speed reading comprehension and typing. 12 interactive exercises covering mental arithmetic multiplication tables RSVP reading peripheral vision code typing and critical reasoning. Perfect for students competitive exam preparation and lifelong learners. No registration required. More free drills at skilldrills.online.</p>
              <div className="flex items-center justify-center gap-5 flex-wrap">
                <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this page" aria-label="Share Academic Drills"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button>
                <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy Academic Drills link"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button>
                <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}