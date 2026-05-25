'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Clock, Zap, Play, Coffee, Target, 
  GitBranch, Timer, Star, 
  Workflow, Brain, TrendingUp, Home, ChevronRight
} from 'lucide-react';

export default function ProductivityDrillsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const drills = [
    {
      id: 1, 
      name: 'Context Switch Lab', 
      folderName: 'context-switch',
      category: 'Task Switching', 
      categorySlug: 'task-switching',
      difficulty: 'Medium', 
      duration: '60s',
      description: 'Rapid rule switching between parity and magnitude with 1.5s per question',
      enabled: true
    },
    { 
      id: 2, 
      name: 'Dual-Target Flow', 
      folderName: 'multi-tasking',
      category: 'Task Switching', 
      categorySlug: 'task-switching',
      difficulty: 'Hard', 
      duration: '60s',
      description: 'Track two simultaneous shape streams with different targets changing every 30s',
      enabled: true
    },
    { 
      id: 3, 
      name: 'Switch-Cost Integrator', 
      folderName: 'switch-cost',
      category: 'Task Switching', 
      categorySlug: 'task-switching',
      difficulty: 'Expert', 
      duration: '60s',
      description: 'Direct vs Opposite mode orb tracking with adaptive 1000-400ms speed',
      enabled: true
    },
    { 
      id: 4, 
      name: 'Temporal Precision', 
      folderName: 'time-estimation',
      category: 'Time Management', 
      categorySlug: 'time-management',
      difficulty: 'Medium', 
      duration: '60s',
      description: 'Pure time estimation with no visual timer - hold and release within 120ms accuracy',
      enabled: true
    },
    { 
      id: 5, 
      name: 'Pomodoro Sync', 
      folderName: 'pomodoro-timer',
      category: 'Time Management', 
      categorySlug: 'time-management',
      difficulty: 'Easy', 
      duration: 'Untimed',
      description: '25min focus / 5min break cycles with focus scoring and streak tracking',
      enabled: true
    },
    { 
      id: 6, 
      name: 'Priority Sorting', 
      folderName: 'priority-sorting',
      category: 'Time Management', 
      categorySlug: 'time-management',
      difficulty: 'Medium', 
      duration: '60s',
      description: 'Click color-coded priority targets with rules changing every 3-4 seconds',
      enabled: true
    },
    { 
      id: 7, 
      name: 'Deep Work Lab', 
      folderName: 'deep-work',
      category: 'Focus Endurance', 
      categorySlug: 'focus-endurance',
      difficulty: 'Medium', 
      duration: '60s',
      description: 'Track a moving ring with your cursor - +1pt/sec focus, -1pt distraction',
      enabled: true
    },
    { 
      id: 8, 
      name: 'Constant Prime', 
      folderName: 'concentration-stamina',
      category: 'Focus Endurance', 
      categorySlug: 'focus-endurance',
      difficulty: 'Hard', 
      duration: '60s',
      description: 'Alternating Vowels/Primes rules with adaptive 800-400ms speed',
      enabled: true
    },
    { 
      id: 9, 
      name: 'Flow Induction', 
      folderName: 'flow-state',
      category: 'Focus Endurance', 
      categorySlug: 'focus-endurance',
      difficulty: 'Expert', 
      duration: '60s',
      description: 'Track the ring to enter flow state with streak-speed scaling and double ring at 60%+',
      enabled: true
    },
    { 
      id: 10, 
      name: 'Batch Processing', 
      folderName: 'batch-processing',
      category: 'Work Efficiency', 
      categorySlug: 'work-efficiency',
      difficulty: 'Medium', 
      duration: '60s',
      description: 'Process color-coded batches in 2s windows with progressive difficulty levels',
      enabled: true
    },
  ];

  const categories = ['Task Switching', 'Time Management', 'Focus Endurance', 'Work Efficiency'];

  const getDrillPath = (drill) => {
    return `/drills/productivity/${drill.categorySlug}/${drill.folderName}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-50 text-green-600 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Hard': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Expert': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Task Switching': return <GitBranch className="w-5 h-5 text-purple-600" />;
      case 'Time Management': return <Timer className="w-5 h-5 text-blue-600" />;
      case 'Focus Endurance': return <Brain className="w-5 h-5 text-green-600" />;
      case 'Work Efficiency': return <Workflow className="w-5 h-5 text-orange-600" />;
      default: return <Coffee className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryBgColor = (category) => {
    switch(category) {
      case 'Task Switching': return 'bg-purple-50';
      case 'Time Management': return 'bg-blue-50';
      case 'Focus Endurance': return 'bg-green-50';
      case 'Work Efficiency': return 'bg-orange-50';
      default: return 'bg-gray-50';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Task Switching': return 'from-purple-500 to-purple-600';
      case 'Time Management': return 'from-blue-500 to-cyan-600';
      case 'Focus Endurance': return 'from-green-500 to-emerald-600';
      case 'Work Efficiency': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryHoverColor = (category) => {
    switch(category) {
      case 'Task Switching': return 'group-hover:text-purple-600';
      case 'Time Management': return 'group-hover:text-blue-600';
      case 'Focus Endurance': return 'group-hover:text-green-600';
      case 'Work Efficiency': return 'group-hover:text-orange-600';
      default: return 'group-hover:text-gray-600';
    }
  };

  const totalDrills = drills.filter(d => d.enabled).length;

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading productivity drills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Productivity Drills - Task Switching, Time Management & Focus Training",
            "url": "https://skilldrills.online/drills/productivity",
            "description": "10 free productivity training drills covering Task Switching, Time Management, Focus Endurance, and Work Efficiency.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "SkillDrills",
              "url": "https://skilldrills.online"
            },
            "numberOfItems": 10,
            "itemListElement": drills.filter(d => d.enabled).map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/productivity/${drill.categorySlug}/${drill.folderName}`,
                "description": drill.description,
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web"
              }
            }))
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-orange-600 transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link href="/drills" className="hover:text-orange-600 transition-colors">
                Drills
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <span className="text-orange-600 font-medium" aria-current="page">Productivity</span>
            </li>
          </ol>
        </nav>

        <section className="sr-only" aria-label="Productivity drills overview">
          <h2>Productivity Training Drills Overview</h2>
          <p>
            Access 10 free productivity training drills across 4 categories.
            Task Switching: Context Switch Lab, Dual-Target Flow, and Switch-Cost Integrator.
            Time Management: Temporal Precision, Pomodoro Sync, and Priority Sorting.
            Focus Endurance: Deep Work Lab, Constant Prime, and Flow Induction.
            Work Efficiency: Batch Processing for task grouping and workflow optimization.
            All drills are free with no login required.
          </p>
        </section>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Productivity Drills</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Train your task switching, time management, focus endurance, and work efficiency with 10 free drills</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">🔀 Task Switching</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">⏰ Time Management</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">🎯 Focus Endurance</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">⚡ Work Efficiency</span>
        </div>

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
              <Coffee className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Productivity areas</p>
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

        {categories.map((category) => {
          const categoryDrills = drills.filter(d => d.category === category && d.enabled);
          if (categoryDrills.length === 0) return null;
          
          return (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category)}`}></div>
                <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                <span className="text-xs text-gray-400">({categoryDrills.length} drills)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill) => {
                  const hoverColor = getCategoryHoverColor(category);
                  
                  return (
                    <Link
                      key={drill.id}
                      href={getDrillPath(drill)}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${getCategoryBgColor(category)}`}>
                            {getCategoryIcon(category)}
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(drill.difficulty)}`}>
                            {drill.difficulty}
                          </div>
                        </div>
                        
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${hoverColor} transition-colors`}>
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
                          <span className="text-xs text-gray-400">{category}</span>
                          <div className="flex items-center gap-1 text-orange-600 group-hover:gap-2 transition-all">
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

        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Productivity Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Task Batching</h4>
              <p className="text-sm text-orange-100">Group similar tasks together to reduce context switching costs and improve efficiency.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Pomodoro Technique</h4>
              <p className="text-sm text-orange-100">Work in focused 25-minute intervals followed by 5-minute breaks for optimal productivity.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Deep Work</h4>
              <p className="text-sm text-orange-100">Eliminate distractions and focus intensely on cognitively demanding tasks for maximum output.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Explore Related Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/cognitive" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition">Cognitive Training</h3>
              <p className="text-xs text-gray-500 mt-1">Memory, focus & problem solving</p>
            </Link>
            <Link href="/drills/academic" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition">Academic Drills</h3>
              <p className="text-xs text-gray-500 mt-1">Reading, math & typing speed</p>
            </Link>
            <Link href="/drills/mental-fitness" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">🧘</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition">Mental Fitness</h3>
              <p className="text-xs text-gray-500 mt-1">Stress control & breathing exercises</p>
            </Link>
            <Link href="/drills/memory" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <div className="text-3xl mb-3">💾</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">Memory Drills</h3>
              <p className="text-xs text-gray-500 mt-1">Working memory & spatial recall</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}