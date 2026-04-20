'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Star, Play, Hand, Target, 
  MousePointer, Timer, Move, Gauge, Activity, 
  GitBranch, Crosshair, Droplets, Sparkles
} from 'lucide-react';

export default function MotorDrillsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    }
    setLoading(false);
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading motor drills...</p>
        </div>
      </div>
    );
  }

  // Categories with exact folder names from your tree structure
  const categories = [
    { 
      name: 'Hand-Eye Coordination', 
      folderName: 'hand-eye-coordination',
      icon: MousePointer,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Improve coordination between your hands and visual input',
      drills: [
        { name: 'Aim Trainer', folderName: 'aim-trainer', difficulty: 'Hard', duration: '3 min', points: 150, description: 'Improve your aiming accuracy and speed' },
        { name: 'Click Accuracy', folderName: 'click-accuracy', difficulty: 'Medium', duration: '2 min', points: 100, description: 'Click on targets as accurately as possible' },
        { name: 'Drag and Drop', folderName: 'drag-and-drop', difficulty: 'Easy', duration: '2 min', points: 80, description: 'Drag objects to precise locations' }
      ]
    },
    { 
      name: 'Timing Accuracy', 
      folderName: 'timing-accuracy',
      icon: Timer,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: 'Develop precise timing and rhythm skills',
      drills: [
        { name: 'Rhythm Tap', folderName: 'rhythm-tap', difficulty: 'Medium', duration: '2 min', points: 100, description: 'Tap in time with the beat' },
        { name: 'Stopwatch Click', folderName: 'stopwatch-click', difficulty: 'Hard', duration: '2 min', points: 120, description: 'Stop the timer at exactly the right moment' },
        { name: 'Synchronization', folderName: 'synchronization', difficulty: 'Expert', duration: '3 min', points: 180, description: 'Synchronize your actions with visual cues' }
      ]
    },
    { 
      name: 'Precision Control', 
      folderName: 'precision-control',
      icon: Crosshair,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      description: 'Master fine motor skills and precise movements',
      drills: [
        { name: 'Steady Hand', folderName: 'steady-hand', difficulty: 'Hard', duration: '3 min', points: 150, description: 'Navigate a maze without touching the walls' },
        { name: 'Fine Motor', folderName: 'fine-motor', difficulty: 'Medium', duration: '2 min', points: 110, description: 'Perform precise fine motor movements' },
        { name: 'Tracing', folderName: 'tracing', difficulty: 'Medium', duration: '2 min', points: 100, description: 'Trace complex shapes accurately' }
      ]
    },
    { 
      name: 'Movement Speed', 
      folderName: 'movement-speed',
      icon: Gauge,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Increase the speed of your movements and reactions',
      drills: [
        { name: 'Rapid Tapping', folderName: 'rapid-tapping', difficulty: 'Easy', duration: '1 min', points: 70, description: 'Tap as quickly as you can' },
        { name: 'Finger Sequencing', folderName: 'finger-sequencing', difficulty: 'Medium', duration: '2 min', points: 100, description: 'Press keys in the correct sequence quickly' },
        { name: 'Gesture Speed', folderName: 'gesture-speed', difficulty: 'Medium', duration: '2 min', points: 110, description: 'Perform gestures as quickly as possible' }
      ]
    }
  ];

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-50 text-green-600';
      case 'Medium': return 'bg-yellow-50 text-yellow-600';
      case 'Hard': return 'bg-orange-50 text-orange-600';
      case 'Expert': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  // Calculate total drills
  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);
  const totalXP = categories.reduce((acc, cat) => acc + cat.drills.reduce((sum, drill) => sum + drill.points, 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <Hand className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Motor Drills</h1>
              <p className="text-gray-500 mt-1">Train your hand-eye coordination, timing, precision control, and movement speed</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total Drills</p>
              <Target className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalDrills}</p>
            <p className="text-xs text-gray-500 mt-1">Available to train</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Categories</p>
              <Zap className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Skill areas</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total XP Available</p>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalXP}</p>
            <p className="text-xs text-gray-500 mt-1">Earnable XP</p>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {categories.map((category) => {
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
                {category.drills.map((drill, index) => {
                  // Build the correct path matching your folder structure
                  const drillPath = `/drills/motor/${category.folderName}/${drill.folderName}`;
                  
                  return (
                    <Link
                      key={index}
                      href={drillPath}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${category.bgColor}`}>
                            <CategoryIcon className={`w-5 h-5 ${category.textColor}`} />
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(drill.difficulty)}`}>
                            {drill.difficulty}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition">
                          {drill.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">{drill.description}</p>
                        
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{drill.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>{drill.points} XP</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{category.name}</span>
                          <div className="flex items-center gap-1 text-green-600 group-hover:gap-2 transition-all">
                            <span className="text-sm font-medium">Start</span>
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

        {/* Category Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Hand className="w-5 h-5 text-green-600" />
            Available Motor Skill Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <MousePointer className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium text-blue-900">Hand-Eye Coordination</p>
              <p className="text-xs text-blue-600 mt-1">3 drills available</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <Timer className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-purple-900">Timing Accuracy</p>
              <p className="text-xs text-purple-600 mt-1">3 drills available</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <Crosshair className="w-6 h-6 text-orange-600 mb-2" />
              <p className="font-medium text-orange-900">Precision Control</p>
              <p className="text-xs text-orange-600 mt-1">3 drills available</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <Gauge className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-medium text-green-900">Movement Speed</p>
              <p className="text-xs text-green-600 mt-1">3 drills available</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Motor Skill Training Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Start Slow, Build Speed</h4>
              <p className="text-sm text-green-100">Focus on accuracy first, then gradually increase your speed for better results.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Consistent Practice</h4>
              <p className="text-sm text-green-100">Daily short sessions are more effective than long, infrequent practice sessions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Track Your Progress</h4>
              <p className="text-sm text-green-100">Monitor your scores and completion times to see improvement over time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}