'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Play, Target, Gamepad2, Gauge, Crosshair, ScanEye, Eye, Activity, Move, GitBranch, Wind, Timer, Compass, TrendingUp } from 'lucide-react';

export default function FPSDrillsPage() {
  const drills = [
    // 240fps Reaction Speed Drills
    { id: 1, name: '240fps Click Test', category: '240fps Reaction Speed', difficulty: 'Pro', duration: '1 min', description: 'Test your reaction time at 240fps speed', enabled: true },
    { id: 2, name: 'Target Acquisition', category: '240fps Reaction Speed', difficulty: 'Pro', duration: '1 min', description: 'Train target acquisition speed with fading targets. Click during the 150-550ms window!', enabled: true, path: 'target-acquisition' },
    { id: 3, name: 'Flick Shot Training', category: '240fps Reaction Speed', difficulty: 'Elite', duration: '1 min', description: 'Flick to white targets appearing randomly on screen for 400ms. Train your flick shots and reaction time!', enabled: true, path: 'flick-shot-training' },
    { id: 4, name: 'Pro-Reaction: Clinical Gray Grid', category: '240fps Reaction Speed', difficulty: 'Elite', duration: '1 min', description: 'Professional 4x4 grid reaction training. Click the red target when it appears! Random delays (500-1500ms) with 450ms target window.', enabled: true, path: 'clinical-gray-grid' },
    
    // 360fps Reaction Speed Drills
    { id: 5, name: '360fps Reflex', category: '360fps Reaction Speed', difficulty: 'Elite', duration: '1 min', description: 'Ultra-fast reflex training for 360fps', enabled: true },
    { id: 6, name: 'Instant Response', category: '360fps Reaction Speed', difficulty: 'Elite', duration: '1 min', description: 'Train sub-100ms reaction times', enabled: true },
    
    // Peripheral Vision Drills
    { id: 7, name: 'Peripheral Awareness', category: 'Peripheral Vision', difficulty: 'Pro', duration: '1 min', description: 'Train peripheral vision by clicking edge targets while focusing on center crosshair. Builds essential FPS awareness!', enabled: true, path: 'peripheral-awareness' },
    { id: 8, name: '180° Awareness', category: 'Peripheral Vision', difficulty: 'Pro', duration: '1 min', description: 'Train 180-degree peripheral awareness with extreme edge targets. Click targets that spawn at screen edges!', enabled: true, path: '180-degree-awareness' },
    
    // Aim Training Drills
    { id: 9, name: 'Tracking Predictor', category: 'Aim Training', difficulty: 'Pro', duration: '1 min', description: 'Predictive tracking training. Click the prediction zone (15 frames ahead) to hit moving targets!', enabled: true, path: 'predictive-tracking' },
    { id: 10, name: 'Headshot Trainer 240FPS', category: 'Aim Training', difficulty: 'Elite', duration: '1 min', description: 'Precision headshot training with dynamic speed scaling. Hit the inner white core for maximum points!', enabled: true, path: 'headshot-trainer' },
    
    // Target Tracking Drills
    { id: 11, name: 'Single Target Track', category: 'Target Tracking', difficulty: 'Intermediate', duration: '1 min', description: 'Track a single moving target', enabled: true },
    { id: 12, name: 'Multi-Target Tracking', category: 'Target Tracking', difficulty: 'Advanced', duration: '1 min', description: 'Track multiple targets at once', enabled: true },
    { id: 13, name: 'Chaos Tracking', category: 'Target Tracking', difficulty: 'Pro', duration: '1 min', description: 'Track targets in chaotic environments', enabled: true },
    { id: 14, name: 'Reactive Tracking', category: 'Target Tracking', difficulty: 'Pro', duration: '1 min', description: 'Track a bouncing ball with random direction changes and jitter', enabled: true, path: 'reactive-tracking' },
    { id: 15, name: '360Hz Pro Tracking', category: 'Target Tracking', difficulty: 'Elite', duration: '1 min', description: 'Track the neon green target among white decoys with increasing speed', enabled: true, path: 'pro-tracking' },
    { id: 16, name: 'Smooth Tracking', category: 'Target Tracking', difficulty: 'Legendary', duration: '1 min', description: 'Physics-based tracking with realistic ball collisions and teleport swaps', enabled: true, path: 'neural-tracker' },
    { id: 17, name: 'Kinetic Trainer', category: 'Target Tracking', difficulty: 'Elite', duration: '1 min', description: 'Extreme speed reaction training with teleport mechanics for 360Hz displays', enabled: true, path: 'high-speed-kinetic-trainer' },
    { id: 18, name: 'Anchor Flick Drill', category: 'Target Tracking', difficulty: 'Elite', duration: '1 min', description: 'Flick to white targets appearing randomly on screen for 400ms. Train your flick shots and reaction time!', enabled: true, path: 'flick-training' },
    { id: 19, name: 'Orbital Tracking Drill', category: 'Target Tracking', difficulty: 'Pro', duration: '1 min', description: 'Track an orbiting target with changing angular speed and orbital radius. Train circular tracking precision!', enabled: true, path: 'orbital-tracking-drill' },
  ];

  const categories = ['240fps Reaction Speed', '360fps Reaction Speed', 'Peripheral Vision', 'Aim Training', 'Target Tracking'];

  const getDrillPath = (drill) => {
    if (drill.path) {
      return `/drills/fps/${drill.path}`;
    }
    const slug = drill.name.toLowerCase().replace(/ /g, '-').replace(/°/g, '');
    return `/drills/fps/${slug}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-50 text-green-600';
      case 'Intermediate': return 'bg-yellow-50 text-yellow-600';
      case 'Advanced': return 'bg-orange-50 text-orange-600';
      case 'Pro': return 'bg-blue-100 text-blue-700';
      case 'Elite': return 'bg-purple-100 text-purple-700';
      case 'Legendary': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case '240fps Reaction Speed': return <Gauge className="w-5 h-5 text-red-600" />;
      case '360fps Reaction Speed': return <TrendingUp className="w-5 h-5 text-purple-600" />;
      case 'Peripheral Vision': return <ScanEye className="w-5 h-5 text-blue-600" />;
      case 'Aim Training': return <Crosshair className="w-5 h-5 text-green-600" />;
      case 'Target Tracking': return <Target className="w-5 h-5 text-yellow-600" />;
      default: return <Gamepad2 className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryBgColor = (category) => {
    switch(category) {
      case '240fps Reaction Speed': return 'bg-red-50';
      case '360fps Reaction Speed': return 'bg-purple-50';
      case 'Peripheral Vision': return 'bg-blue-50';
      case 'Aim Training': return 'bg-green-50';
      case 'Target Tracking': return 'bg-yellow-50';
      default: return 'bg-gray-50';
    }
  };

  const totalDrills = drills.filter(d => d.enabled).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/drills" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Drills
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FPS Gaming Drills</h1>
              <p className="text-gray-500 mt-1">Train your reaction speed, aim tracking, and peripheral vision for competitive gaming</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total Drills</p>
              <Target className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalDrills}</p>
            <p className="text-xs text-gray-500 mt-1">Available to train</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Categories</p>
              <Gamepad2 className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Skill areas</p>
          </div>
        </div>

        {/* Drills Grid */}
        {categories.map((category) => {
          const categoryDrills = drills.filter(d => d.category === category && d.enabled);
          if (categoryDrills.length === 0) return null;
          
          return (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-red-500 to-orange-600"></div>
                <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                <span className="text-xs text-gray-400">({categoryDrills.length} drills)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill) => (
                  <Link
                    key={drill.id}
                    href={getDrillPath(drill)}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg ${getCategoryBgColor(category)}`}>
                          {getCategoryIcon(category)}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(drill.difficulty)}`}>
                          {drill.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition">
                        {drill.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{drill.description}</p>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{drill.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400">{category}</span>
                        <div className="flex items-center gap-1 text-red-600 group-hover:gap-2 transition-all">
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

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Gamepad2 className="w-6 h-6" />
            Pro Gamer Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Monitor Refresh Rate</h4>
              <p className="text-sm text-orange-100">240Hz monitors provide smoother motion and faster response times. 360Hz gives competitive edge in pro play.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Peripheral Vision</h4>
              <p className="text-sm text-orange-100">Train your peripheral awareness to spot enemies without moving your crosshair.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Consistent Practice</h4>
              <p className="text-sm text-orange-100">15 minutes of aim training daily improves muscle memory and reaction times significantly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}