'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Clock, Play, BookOpen, Target, 
  Award, Calculator, Eye, PenTool, Brain,
  Star, Home, ChevronRight
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
      {/* SEO Structured Data - safe inside client component with dangerouslySetInnerHTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Academic Drills - Free Math, Reading, Writing & Comprehension Training",
            "url": "https://skilldrills.online/drills/academic",
            "description": "12 free academic skill training drills covering Math Speed, Reading Speed, Writing Speed, and Comprehension. No login required.",
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Academic Skill Training" },
            "numberOfItems": 12,
            "itemListElement": drills.map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/academic/${drill.category.toLowerCase().replace(' ', '-')}/${drill.folderName}`,
                "description": drill.description,
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web"
              }
            }))
          })
        }}
      />
      
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Academic Drills</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Train your math, reading, writing, and comprehension skills with 12 free drills</p>
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
          <h2>Academic Training Drills Overview</h2>
          <p>
            Access 12 free academic skill training drills across 4 categories.
            Math Speed: Arithmetic Race, Math Reaction, Multiplication Tables, and Mental Math.
            Reading Speed: Speed Reader, RSVP Reader, and Peripheral Reader.
            Writing Speed: Typing Test and Code Typing.
            Comprehension: Reading Comprehension, Listening Comprehension, and Inference Drill.
            All drills are free with no login required. Best scores save locally.
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
              <p className="text-sm text-yellow-100">Consistent short practice sessions are more effective than long, infrequent ones.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Track Your Progress</h4>
              <p className="text-sm text-yellow-100">Monitor your speed and accuracy to see improvement over time. Best scores save locally.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Challenge Yourself</h4>
              <p className="text-sm text-yellow-100">Gradually increase difficulty levels and target speeds to continuously improve your skills.</p>
            </div>
          </div>
        </section>

        {/* Explore Related Categories */}
        <section className="mt-12 mb-8" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-bold text-gray-900 text-center mb-8">Explore Related Categories</h2>
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
      </div>
    </div>
  );
}