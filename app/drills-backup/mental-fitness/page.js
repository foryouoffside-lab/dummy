'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Star, Play, Heart, Target, 
  Brain, Wind, Flower2, Activity, Eye, Shield, Sparkles, 
  Droplets, Compass, Sun, Moon 
} from 'lucide-react';

export default function MentalFitnessDrillsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    }
    setLoading(false);
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading mental fitness drills...</p>
        </div>
      </div>
    );
  }

  const drills = [
    // Stress Control Drills - matching folder structure
    { 
      id: 1, 
      name: 'Biofeedback', 
      path: '/drills/mental-fitness/stress-control/biofeedback',
      category: 'Stress Control', 
      difficulty: 'Medium', 
      duration: '5 min', 
      points: 120, 
      description: 'Learn to control your heart rate and breathing',
      icon: Activity
    },
    { 
      id: 2, 
      name: 'Stress Inoculation', 
      path: '/drills/mental-fitness/stress-control/stress-inoculation',
      category: 'Stress Control', 
      difficulty: 'Hard', 
      duration: '10 min', 
      points: 200, 
      description: 'Build resilience against stressful situations',
      icon: Shield
    },
    { 
      id: 3, 
      name: 'Calm Under Pressure', 
      path: '/drills/mental-fitness/stress-control/calm-under-pressure',
      category: 'Stress Control', 
      difficulty: 'Medium', 
      duration: '8 min', 
      points: 150, 
      description: 'Practice maintaining calm in challenging scenarios',
      icon: Compass
    },
    
    // Mindfulness Drills - matching folder structure
    { 
      id: 4, 
      name: 'Body Scan', 
      path: '/drills/mental-fitness/mindfulness/body-scan',
      category: 'Mindfulness', 
      difficulty: 'Easy', 
      duration: '10 min', 
      points: 100, 
      description: 'Guided body awareness meditation',
      icon: Sun
    },
    { 
      id: 5, 
      name: 'Mindful Breathing', 
      path: '/drills/mental-fitness/mindfulness/mindful-breathing',
      category: 'Mindfulness', 
      difficulty: 'Easy', 
      duration: '5 min', 
      points: 80, 
      description: 'Focus on your breath for relaxation',
      icon: Wind
    },
    { 
      id: 6, 
      name: 'Sensory Awareness', 
      path: '/drills/mental-fitness/mindfulness/sensory-awareness',
      category: 'Mindfulness', 
      difficulty: 'Medium', 
      duration: '8 min', 
      points: 120, 
      description: 'Heighten your sensory perception',
      icon: Eye
    },
    
    // Meditation Drills - matching folder structure
    { 
      id: 7, 
      name: 'Guided Meditation', 
      path: '/drills/mental-fitness/meditation/guided-meditation',
      category: 'Meditation', 
      difficulty: 'Easy', 
      duration: '15 min', 
      points: 150, 
      description: 'Follow guided meditation sessions',
      icon: Moon
    },
    { 
      id: 8, 
      name: 'Transcendental', 
      path: '/drills/mental-fitness/meditation/transcendental',
      category: 'Meditation', 
      difficulty: 'Hard', 
      duration: '20 min', 
      points: 250, 
      description: 'Advanced meditation technique',
      icon: Star
    },
    { 
      id: 9, 
      name: 'Loving-Kindness', 
      path: '/drills/mental-fitness/meditation/loving-kindness',
      category: 'Meditation', 
      difficulty: 'Medium', 
      duration: '12 min', 
      points: 180, 
      description: 'Cultivate compassion and positive emotions',
      icon: Heart
    },
    
    // Breathing Exercises - matching folder structure
    { 
      id: 10, 
      name: 'Box Breathing', 
      path: '/drills/mental-fitness/breathing-exercises/box-breathing',
      category: 'Breathing', 
      difficulty: 'Easy', 
      duration: '4 min', 
      points: 60, 
      description: 'Practice the 4-4-4-4 breathing technique',
      icon: Droplets
    },
    { 
      id: 11, 
      name: 'Wim Hof Method', 
      path: '/drills/mental-fitness/breathing-exercises/wim-hof',
      category: 'Breathing', 
      difficulty: 'Hard', 
      duration: '15 min', 
      points: 200, 
      description: 'Advanced breathing technique for energy and focus',
      icon: Zap
    },
    { 
      id: 12, 
      name: '4-7-8 Breathing', 
      path: '/drills/mental-fitness/breathing-exercises/4-7-8',
      category: 'Breathing', 
      difficulty: 'Easy', 
      duration: '5 min', 
      points: 70, 
      description: 'Relaxation breathing technique',
      icon: Flower2
    },
  ];

  const categories = [
    { name: 'Stress Control', icon: Shield, color: 'red', bgColor: 'bg-red-50', textColor: 'text-red-600' },
    { name: 'Mindfulness', icon: Flower2, color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { name: 'Meditation', icon: Brain, color: 'purple', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { name: 'Breathing', icon: Wind, color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600' }
  ];

  // Helper function to get icon component
  const getIcon = (IconComponent, className) => {
    return <IconComponent className={className} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mental Fitness Drills</h1>
              <p className="text-gray-500 mt-1">Train your stress control, mindfulness, and meditation skills</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Drills Completed</p>
              <Target className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Start your first drill</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Average Score</p>
              <Zap className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">0%</p>
            <p className="text-xs text-gray-500 mt-1">Complete drills to see scores</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total XP Earned</p>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Earn XP from each drill</p>
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
                  <p className="text-sm text-gray-500">
                    {category.name === 'Stress Control' && 'Learn to manage and control stress effectively'}
                    {category.name === 'Mindfulness' && 'Practice present-moment awareness and focus'}
                    {category.name === 'Meditation' && 'Deepen your meditation practice for mental clarity'}
                    {category.name === 'Breathing' && 'Master breathing techniques for relaxation and energy'}
                  </p>
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
                          'bg-red-50 text-red-600'
                        }`}>
                          {drill.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition">
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
                        <span className="text-xs text-gray-400">{drill.category}</span>
                        <div className="flex items-center gap-1 text-pink-600 group-hover:gap-2 transition-all">
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

        {/* Folder Structure Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-pink-600" />
            Available Drill Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-50 rounded-lg p-4">
              <Shield className="w-6 h-6 text-red-600 mb-2" />
              <p className="font-medium text-red-900">Stress Control</p>
              <p className="text-xs text-red-600 mt-1">3 drills available</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <Flower2 className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-medium text-green-900">Mindfulness</p>
              <p className="text-xs text-green-600 mt-1">3 drills available</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <Brain className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-purple-900">Meditation</p>
              <p className="text-xs text-purple-600 mt-1">3 drills available</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <Wind className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium text-blue-900">Breathing</p>
              <p className="text-xs text-blue-600 mt-1">3 drills available</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Mental Fitness Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Consistency Matters</h4>
              <p className="text-sm text-pink-100">Even 5 minutes of daily practice can significantly improve your mental resilience.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Start Small</h4>
              <p className="text-sm text-pink-100">Begin with easier drills and gradually increase difficulty as you build your mental fitness.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Track Progress</h4>
              <p className="text-sm text-pink-100">Monitor your scores and completion rates to see your improvement over time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// FolderTree component since it wasn't imported
function FolderTree({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7l-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
    </svg>
  );
}