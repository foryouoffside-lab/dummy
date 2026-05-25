'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Star, Play, Dumbbell, Target, 
  Activity, Eye, Hand, TrendingUp, Battery, Gauge, 
  GitBranch, Timer, BarChart3, Award, Heart, Brain,
  Home, ChevronRight
} from 'lucide-react';

export default function PhysicalDrillsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Categories with exact folder names
  const categories = [
    { 
      name: 'Balance Training', 
      folderName: 'Balance-Training',
      icon: Activity,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: 'Improve stability, equilibrium, and motor control',
      drills: [
        { name: 'Dynamic Balance Elite', folderName: 'dynamic-balance', difficulty: 'Hard', duration: '60s', description: 'Track a Lissajous-trajectory target with cursor for sustained tracking points' },
        { name: 'Single Leg Hold', folderName: 'single-leg-hold', difficulty: 'Medium', duration: '60s', description: 'Maintain link with bouncing anchor point for balance stability scoring' },
        { name: 'Stability Challenge', folderName: 'stability-challenge', difficulty: 'Medium', duration: '60s', description: 'Resist wind forces to keep cursor centered with adaptive difficulty' }
      ]
    },
    { 
      name: 'Reflex Training', 
      folderName: 'Reflex-Training',
      icon: Zap,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      description: 'Enhance reaction speed, evasion, and impulse control',
      drills: [
        { name: 'Drop Catch', folderName: 'drop-catch', difficulty: 'Easy', duration: '60s', description: 'Catch green falling balls while avoiding red decoy balls with X markers' },
        { name: 'Quick Dodge', folderName: 'quick-dodge', difficulty: 'Medium', duration: '60s', description: 'Dodge red homing obstacles with adaptive speed and fullscreen chaos mode' },
        { name: 'Kinetic Arrest', folderName: 'reaction-chain', difficulty: 'Hard', duration: '60s', description: 'Stop cursor on moving nodes to arrest them with no miss penalties' }
      ]
    },
    { 
      name: 'Coordination', 
      folderName: 'Coordination',
      icon: Hand,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Improve bilateral coordination and motor patterning',
      drills: [
        { name: 'Cross Body Movement', folderName: 'cross-body-movement', difficulty: 'Medium', duration: '60s', description: 'Connect nodes across screen along straight vector paths for +5 points each' },
        { name: 'Complex Pattern', folderName: 'complex-pattern', difficulty: 'Hard', duration: '60s', description: 'Memorize and draw path patterns from memory with shape-based scoring' }
      ]
    },
    { 
      name: 'Fitness', 
      folderName: 'Fitness',
      icon: Heart,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      description: 'Build agility, speed, and precision movement skills',
      drills: [
        { name: 'Agility Ladder', folderName: 'agility-ladder', difficulty: 'Medium', duration: '60s', description: 'Step rungs Left→Right→Left→Right on scrolling ladders with adaptive speed' },
        { name: 'Jump Sequence', folderName: 'jump-sequence', difficulty: 'Hard', duration: '60s', description: 'Charge and launch ball toward targets with mid-air steering control' },
        { name: 'Speed Drill', folderName: 'speed-drill', difficulty: 'Medium', duration: '60s', description: 'Click shrinking rings before they vanish with velocity scaling to 5.0x' }
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
      case 'Balance Training': return 'from-purple-500 to-violet-600';
      case 'Reflex Training': return 'from-yellow-500 to-amber-600';
      case 'Coordination': return 'from-green-500 to-emerald-600';
      case 'Fitness': return 'from-red-500 to-rose-600';
      default: return 'from-red-500 to-orange-600';
    }
  };

  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading physical drills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Physical Training Drills - Balance, Reflex, Coordination & Fitness",
            "url": "https://skilldrills.online/drills/physical",
            "description": "11 free physical skill training drills covering Balance Training, Reflex Training, Coordination, and Fitness. Improve stability, reaction speed, motor control, and agility.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "SkillDrills",
              "url": "https://skilldrills.online"
            },
            "about": {
              "@type": "Thing",
              "name": "Physical Skill Training"
            },
            "numberOfItems": totalDrills,
            "itemListElement": categories.flatMap(cat => cat.drills).map((drill, index) => {
              const parentCategory = categories.find(c => c.drills.includes(drill));
              return {
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "WebApplication",
                  "name": drill.name,
                  "url": `https://skilldrills.online/drills/physical/${parentCategory.folderName}/${drill.folderName}`,
                  "description": drill.description,
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Web"
                }
              };
            })
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-red-600 transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link href="/drills" className="hover:text-red-600 transition-colors">
                Drills
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <span className="text-red-600 font-medium" aria-current="page">Physical Training</span>
            </li>
          </ol>
        </nav>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Physical drills overview">
          <h2>Physical Training Drills Overview</h2>
          <p>
            Access 11 free physical skill training drills across 4 categories.
            Balance Training: Dynamic Balance Elite, Single Leg Hold, and Stability Challenge for equilibrium and motor control.
            Reflex Training: Drop Catch, Quick Dodge, and Kinetic Arrest for reaction speed and impulse control.
            Coordination: Cross Body Movement and Complex Pattern for bilateral coordination and motor patterning.
            Fitness: Agility Ladder, Jump Sequence, and Speed Drill for agility, precision, and speed.
            All drills are free with no login required. Track your progress and best scores saved locally.
          </p>
        </section>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Physical Drills</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Train your balance, reflexes, coordination, and fitness with 11 free drills</p>
            </div>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">⚖️ Balance Training</span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">⚡ Reflex Training</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">🤝 Coordination</span>
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">💪 Fitness</span>
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
              <Dumbbell className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Fitness areas</p>
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
                  const drillPath = `/drills/physical/${category.folderName}/${drill.folderName}`;
                  
                  return (
                    <Link
                      key={index}
                      href={drillPath}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
                        
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 group-hover:text-${category.color === 'purple' ? 'purple' : category.color === 'yellow' ? 'amber' : category.color === 'green' ? 'green' : 'red'}-600 transition-colors`}>
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
                          <div className={`flex items-center gap-1 text-${category.color === 'purple' ? 'purple' : category.color === 'yellow' ? 'amber' : category.color === 'green' ? 'green' : 'red'}-600 group-hover:gap-2 transition-all`}>
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
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Dumbbell className="w-6 h-6" />
            Physical Training Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Warm Up First</h4>
              <p className="text-sm text-orange-100">Always perform light stretching and warm-up exercises before starting any physical drill.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Proper Form</h4>
              <p className="text-sm text-orange-100">Focus on maintaining correct posture and form to prevent injury and maximize benefits.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Stay Hydrated</h4>
              <p className="text-sm text-orange-100">Drink water before, during, and after your training sessions for optimal performance.</p>
            </div>
          </div>
        </div>

        {/* Explore Related Categories */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Explore Related Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/motor" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">✋</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition">Motor Skills</h3>
              <p className="text-xs text-gray-500 mt-1">Hand-eye coordination & precision control</p>
            </Link>
            <Link href="/drills/mental-fitness" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">🧘</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition">Mental Fitness</h3>
              <p className="text-xs text-gray-500 mt-1">Stress control & breathing exercises</p>
            </Link>
            <Link href="/drills/fps" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition">FPS Training</h3>
              <p className="text-xs text-gray-500 mt-1">Aim trainer, reflex & tracking drills</p>
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