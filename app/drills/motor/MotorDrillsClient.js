'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Star, Play, Hand, Target, 
  MousePointer, Timer, Move, Gauge, Activity, 
  GitBranch, Crosshair, Droplets, Sparkles, Home, ChevronRight
} from 'lucide-react';

export default function MotorDrillsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Categories with exact folder names
  const categories = [
    { 
      name: 'Hand-Eye Coordination', 
      folderName: 'hand-eye-coordination',
      icon: MousePointer,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Train aim, click accuracy, and drag-and-drop precision',
      drills: [
        { name: 'Aim Trainer', folderName: 'aim-trainer', difficulty: 'Hard', duration: '60s', description: 'Dynamic targets that shrink with streak and lives system' },
        { name: 'Click Accuracy', folderName: 'click-accuracy', difficulty: 'Medium', duration: '60s', description: 'Single teleporting target with shrinking size on streak' },
        { name: 'Drag and Drop', folderName: 'drag-and-drop', difficulty: 'Easy', duration: '60s', description: 'Drag ball into ring within 3s with teleporting positions' }
      ]
    },
    { 
      name: 'Timing Accuracy', 
      folderName: 'timing-accuracy',
      icon: Timer,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: 'Develop precise timing, rhythm, and synchronization',
      drills: [
        { name: 'Rhythm Tap', folderName: 'rhythm-tap', difficulty: 'Medium', duration: '60s', description: 'Tap in sync with a dynamic BPM pulse (50-140 range)' },
        { name: 'Stopwatch Click', folderName: 'stopwatch-click', difficulty: 'Hard', duration: '60s', description: 'Click at exact memorized target time (1-8 seconds)' },
        { name: 'Synchronization', folderName: 'synchronization', difficulty: 'Expert', duration: '60s', description: 'Click when converging bars align at center line' }
      ]
    },
    { 
      name: 'Precision Control', 
      folderName: 'precision-control',
      icon: Crosshair,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      description: 'Master fine motor skills and precise cursor movements',
      drills: [
        { name: 'Steady Hand', folderName: 'steady-hand', difficulty: 'Hard', duration: '60s', description: 'Trace a winding path corridor with shrinking width on streak' },
        { name: 'Fine Motor', folderName: 'fine-motor', difficulty: 'Medium', duration: '60s', description: 'Track a scrolling wave path through Dynamic and Extreme phases' },
        { name: 'Tracing', folderName: 'tracing', difficulty: 'Medium', duration: '60s', description: 'Follow a red wave filament with auto-pause and resume' }
      ]
    },
    { 
      name: 'Movement Speed', 
      folderName: 'movement-speed',
      icon: Gauge,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Increase movement speed, sequencing, and gesture velocity',
      drills: [
        { name: 'Rapid Tapping', folderName: 'rapid-tapping', difficulty: 'Easy', duration: 'Untimed', description: 'Endless survival clicking with escalating difficulty' },
        { name: 'Finger Sequencing', folderName: 'finger-sequencing', difficulty: 'Medium', duration: '60s', description: 'Click 3 nodes from largest to smallest with 2s timer' },
        { name: 'Gesture Speed', folderName: 'gesture-speed', difficulty: 'Medium', duration: '60s', description: 'Flick to gate within 350ms then return to center' }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-50 text-green-600 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Hard': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Expert': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Hand-Eye Coordination': return 'from-blue-500 to-cyan-600';
      case 'Timing Accuracy': return 'from-purple-500 to-violet-600';
      case 'Precision Control': return 'from-orange-500 to-red-600';
      case 'Movement Speed': return 'from-green-500 to-emerald-600';
      default: return 'from-green-500 to-emerald-600';
    }
  };

  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading motor drills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Motor Skills Drills - Hand-Eye Coordination, Timing, Precision & Speed",
            "url": "https://skilldrills.online/drills/motor",
            "description": "12 free motor skills training drills covering Hand-Eye Coordination, Timing Accuracy, Precision Control, and Movement Speed. Improve mouse aim, timing, steady hand, and reaction speed.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Global Drill System",
              "url": "https://skilldrills.online"
            },
            "about": { "@type": "Thing", "name": "Motor Skill Training" },
            "numberOfItems": 12,
            "itemListElement": categories.flatMap(cat => cat.drills).map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/motor/${categories.find(c => c.drills.includes(drill)).folderName}/${drill.folderName}`,
                "description": drill.description,
                "applicationCategory": "GameApplication",
                "operatingSystem": "Web"
              }
            }))
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-green-600 transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </li>
            <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
            <li>
              <Link href="/drills" className="hover:text-green-600 transition-colors">Drills</Link>
            </li>
            <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
            <li><span className="text-green-600 font-medium" aria-current="page">Motor Skills</span></li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <Hand className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Motor Skills Drills</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Train your hand-eye coordination, timing, precision control, and movement speed with 12 free drills</p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Motor drills overview">
          <h2>Motor Skills Training Drills Overview</h2>
          <p>
            Access 12 free motor skills training drills across 4 categories.
            Hand-Eye Coordination: Aim Trainer, Click Accuracy, and Drag and Drop for visual-motor integration.
            Timing Accuracy: Rhythm Tap, Stopwatch Click, and Synchronization for precise timing skills.
            Precision Control: Steady Hand, Fine Motor, and Tracing for fine cursor control.
            Movement Speed: Rapid Tapping, Finger Sequencing, and Gesture Speed for fast motor responses.
            All drills are free with no login required. Track your progress and best scores saved locally.
          </p>
        </section>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">🎯 Hand-Eye</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">⏱️ Timing</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">🔍 Precision</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">⚡ Speed</span>
        </div>

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
              <Hand className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Motor skill areas</p>
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

        {/* Drills Grid by Category */}
        {categories.map((category) => {
          const CategoryIcon = category.icon;
          
          return (
            <div key={category.name} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category.name)}`}></div>
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <span className="text-xs text-gray-400">({category.drills.length} drills)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => {
                  const drillPath = `/drills/motor/${category.folderName}/${drill.folderName}`;
                  
                  return (
                    <Link
                      key={index}
                      href={drillPath}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${category.bgColor}`}>
                            <CategoryIcon className={`w-5 h-5 ${category.textColor}`} />
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(drill.difficulty)}`}>
                            {drill.difficulty}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {drill.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{drill.description}</p>
                        
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{drill.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{category.name}</span>
                          <div className="flex items-center gap-1 text-green-600 group-hover:gap-2 transition-all">
                            <span className="text-sm font-medium">Start Drill</span>
                            <Play className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Motor Skill Training Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Start Slow, Build Speed</h4>
              <p className="text-sm text-green-100">Focus on accuracy first, then gradually increase your speed for better long-term results.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Consistent Practice</h4>
              <p className="text-sm text-green-100">Daily short sessions (5-10 min) are more effective than long, infrequent practice sessions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Track Your Progress</h4>
              <p className="text-sm text-green-100">Monitor your scores and completion times to see improvement over time. Best scores save locally.</p>
            </div>
          </div>
        </div>

        {/* Explore Related Categories */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Explore Related Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/fps" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition">FPS Training</h3>
              <p className="text-xs text-gray-500 mt-1">Aim trainer, reflex & tracking drills</p>
            </Link>
            <Link href="/drills/visual" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">👁️</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">Visual Training</h3>
              <p className="text-xs text-gray-500 mt-1">Reaction speed & peripheral vision</p>
            </Link>
            <Link href="/drills/physical" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">💪</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition">Physical Training</h3>
              <p className="text-xs text-gray-500 mt-1">Balance, coordination & reflex drills</p>
            </Link>
            <Link href="/drills/cognitive" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition">Cognitive Training</h3>
              <p className="text-xs text-gray-500 mt-1">Memory, focus & problem solving</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}