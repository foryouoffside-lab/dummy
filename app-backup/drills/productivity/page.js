'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Play, Coffee, Target, 
  GitBranch, Timer, Battery, Gauge, BarChart3, 
  Workflow, Layers, Activity, TrendingUp, Hourglass,
  Focus, Brain, Crosshair
} from 'lucide-react';

export default function ProductivityDrillsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading productivity drills...</p>
        </div>
      </div>
    );
  }

  const drills = [
    // Task Switching Drills
    { 
      id: 1, 
      name: 'Context Switch Lab', 
      path: '/drills/productivity/context-switch',
      category: 'Task Switching', 
      difficulty: 'Medium', 
      duration: '60s', 
      description: 'Flash questioning • 1.5s per question • Switch between rules',
      icon: GitBranch
    },
    { 
      id: 2, 
      name: 'Quad-Zone Switcher', 
      path: '/drills/productivity/quad-zone-switcher',
      category: 'Task Switching', 
      difficulty: 'Hard', 
      duration: '60s', 
      description: '4-zone rule switching • 2 sec per question',
      icon: Crosshair
    },
    { 
      id: 3, 
      name: 'Dual-Stream Spatial', 
      path: '/drills/productivity/dual-stream-spatial',
      category: 'Task Switching', 
      difficulty: 'Expert', 
      duration: '60s', 
      description: 'Simultaneous tasks • 1 sec per round • Dual tasks',
      icon: Activity
    },
    
    // Time Management Drills
    { 
      id: 4, 
      name: 'Temporal Precision', 
      path: '/drills/productivity/temporal-precision',
      category: 'Time Management', 
      difficulty: 'Medium', 
      duration: '60s', 
      description: 'Match target duration • Hold and release timing',
      icon: Hourglass
    },
    { 
      id: 5, 
      name: 'Pomodoro Sync', 
      path: '/drills/productivity/pomodoro-sync',
      category: 'Time Management', 
      difficulty: 'Easy', 
      duration: '∞', 
      description: '25min focus • 5min break • 1 min = 1 point',
      icon: Timer
    },
    { 
      id: 6, 
      name: 'Priority Sorting', 
      path: '/drills/productivity/priority-sorting',
      category: 'Time Management', 
      difficulty: 'Medium', 
      duration: '60s', 
      description: 'Click priority items • Rule changes every 3-4s',
      icon: BarChart3
    },
    
    // Focus Endurance Drills
    { 
      id: 7, 
      name: 'Deep Work Lab', 
      path: '/drills/productivity/deep-work-lab',
      category: 'Focus Endurance', 
      difficulty: 'Medium', 
      duration: '60s', 
      description: 'Track the moving ring • 1 sec focus = +1 point',
      icon: Focus
    },
    { 
      id: 8, 
      name: 'Concentration Stamina', 
      path: '/drills/productivity/concentration-stamina',
      category: 'Focus Endurance', 
      difficulty: 'Hard', 
      duration: '60s', 
      description: 'Keep cursor in the pulsing ring • Build stamina',
      icon: Gauge
    },
    { 
      id: 9, 
      name: 'Flow Induction', 
      path: '/drills/productivity/flow-induction',
      category: 'Focus Endurance', 
      difficulty: 'Expert', 
      duration: '60s', 
      description: 'Track the ring • 1 sec flow = +1 point + streak bonus',
      icon: TrendingUp
    },
    { 
      id: 10, 
      name: 'High Visibility Stress', 
      path: '/drills/productivity/high-visibility-stress',
      category: 'Focus Endurance', 
      difficulty: 'Hard', 
      duration: '∞', 
      description: 'Track nodes • Maintain anchor • Endless survival',
      icon: Brain
    },
    
    // Work Efficiency Drills
    { 
      id: 11, 
      name: 'Batch Processing', 
      path: '/drills/productivity/batch-processing',
      category: 'Work Efficiency', 
      difficulty: 'Medium', 
      duration: '60s', 
      description: '3 sec per batch • Level up • Auto-refresh',
      icon: Layers
    },
  ];

  const categories = [
    { name: 'Task Switching', icon: GitBranch, color: 'purple', bgColor: 'bg-purple-50', textColor: 'text-purple-600', description: 'Improve your ability to switch between tasks efficiently' },
    { name: 'Time Management', icon: Timer, color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600', description: 'Master time estimation and prioritization skills' },
    { name: 'Focus Endurance', icon: Brain, color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-600', description: 'Build sustained concentration and achieve flow state' },
    { name: 'Work Efficiency', icon: Workflow, color: 'orange', bgColor: 'bg-orange-50', textColor: 'text-orange-600', description: 'Optimize your workflow and eliminate bottlenecks' }
  ];

  // Helper function to get icon component
  const getIcon = (IconComponent, className) => {
    return <IconComponent className={className} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Productivity Drills</h1>
              <p className="text-gray-500 mt-1">Train your task switching, time management, focus endurance, and work efficiency</p>
            </div>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {categories.map((category) => {
          const categoryDrills = drills.filter(d => d.category === category.name);
          if (categoryDrills.length === 0) return null;
          
          const CategoryIcon = category.icon;
          
          return (
            <div key={category.name} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                  <CategoryIcon className={`w-5 h-5 ${category.textColor}`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill) => (
                  <Link
                    key={drill.id}
                    href={drill.path}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg ${category.bgColor}`}>
                          {getIcon(drill.icon, `w-5 h-5 ${category.textColor}`)}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          drill.difficulty === 'Easy' ? 'bg-green-50 text-green-600' :
                          drill.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                          drill.difficulty === 'Hard' ? 'bg-orange-50 text-orange-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {drill.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition">
                        {drill.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{drill.description}</p>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{drill.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          <span>{drill.difficulty}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400">{drill.category}</span>
                        <div className="flex items-center gap-1 text-orange-600 group-hover:gap-2 transition-all">
                          <span className="text-sm font-medium">Start</span>
                          <Play className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Available Drills Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Coffee className="w-5 h-5 text-orange-600" />
            Available Productivity Drills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <GitBranch className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-purple-900">Task Switching</p>
              <p className="text-xs text-purple-600 mt-1">3 drills available</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <Timer className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium text-blue-900">Time Management</p>
              <p className="text-xs text-blue-600 mt-1">3 drills available</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <Brain className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-medium text-green-900">Focus Endurance</p>
              <p className="text-xs text-green-600 mt-1">4 drills available</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <Workflow className="w-6 h-6 text-orange-600 mb-2" />
              <p className="font-medium text-orange-900">Work Efficiency</p>
              <p className="text-xs text-orange-600 mt-1">1 drill available</p>
            </div>
          </div>
        </div>

        {/* Productivity Tips Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
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
              <p className="text-sm text-orange-100">Eliminate distractions and focus intensely on cognitively demanding tasks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}