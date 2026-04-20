'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Zap, Star, Play, Brain, Target, Lock, Gamepad2, Crosshair, ScanEye, Gauge, Eye, Activity, Trophy, Move, Circle, GitBranch, Wind, Timer, Flame, Compass, Grid, MousePointer, TrendingUp } from 'lucide-react';

export default function FPSDrillsPage() {
  const drills = [
    // 240fps Reaction Speed Drills
    { id: 1, name: '240fps Click Test', category: '240fps Reaction Speed', subcategory: '240fps', difficulty: 'Pro', duration: '1 min', points: 100, description: 'Test your reaction time at 240fps speed', enabled: true, icon: 'Gauge' },
    { id: 2, name: 'Target Acquisition', category: '240fps Reaction Speed', subcategory: '240fps', difficulty: 'Pro', duration: 'Unlimited', points: 200, description: 'Train target acquisition speed with fading targets. Click during the 150-550ms window!', enabled: true, icon: 'Target', path: 'target-acquisition' },
    { id: 3, name: 'Flick Shot Training', category: '240fps Reaction Speed', subcategory: '240fps', difficulty: 'Elite', duration: 'Unlimited', points: 250, description: 'Flick to white targets appearing randomly on screen for 400ms. Train your flick shots and reaction time!', enabled: true, icon: 'Crosshair', path: 'flick-shot-training' },
    { id: 4, name: 'Pro-Reaction: Clinical Gray Grid', category: '240fps Reaction Speed', subcategory: '240fps', difficulty: 'Elite', duration: 'Unlimited', points: 350, description: 'Professional 4x4 grid reaction training. Click the red target when it appears! Random delays (500-1500ms) with 450ms target window. Clinical gray aesthetic for focused training.', enabled: true, icon: 'Grid', path: 'clinical-gray-grid' },
    
    // 360fps Reaction Speed Drills
    { id: 5, name: '360fps Reflex', category: '360fps Reaction Speed', subcategory: '360fps', difficulty: 'Elite', duration: '1 min', points: 120, description: 'Ultra-fast reflex training for 360fps', enabled: true, icon: 'Gauge' },
    { id: 6, name: 'Instant Response', category: '360fps Reaction Speed', subcategory: '360fps', difficulty: 'Elite', duration: '1.5 min', points: 180, description: 'Train sub-100ms reaction times', enabled: true, icon: 'Zap' },
    
    // Peripheral Vision Drills
    { id: 7, name: 'Peripheral Awareness', category: 'Peripheral Vision', subcategory: 'peripheral-vision', difficulty: 'Pro', duration: 'Unlimited', points: 200, description: 'Train peripheral vision by clicking edge targets while focusing on center crosshair. Builds essential FPS awareness!', enabled: true, icon: 'ScanEye', path: 'peripheral-awareness' },
    { id: 8, name: '180° Awareness', category: 'Peripheral Vision', subcategory: 'peripheral-vision', difficulty: 'Pro', duration: 'Unlimited', points: 200, description: 'Train 180-degree peripheral awareness with extreme edge targets. Click targets that spawn at screen edges!', enabled: true, icon: 'Eye', path: '180-degree-awareness' },
    
    // Aim Training Drills
    { id: 9, name: 'Tracking Predictor', category: 'Aim Training', subcategory: 'aim-training', difficulty: 'Pro', duration: 'Unlimited', points: 220, description: 'Predictive tracking training. Click the prediction zone (15 frames ahead) to hit moving targets!', enabled: true, icon: 'TrendingUp', path: 'predictive-tracking' },
    { id: 10, name: 'Headshot Trainer 240FPS', category: 'Aim Training', subcategory: 'aim-training', difficulty: 'Elite', duration: 'Unlimited', points: 280, description: 'Precision headshot training with dynamic speed scaling. Hit the inner white core for maximum points! Fast headshots = faster spawns down to 180ms.', enabled: true, icon: 'Target', path: 'headshot-trainer' },
    { id: 11, name: 'Flick Shot 240FPS', category: 'Aim Training', subcategory: 'aim-training', difficulty: 'Elite', duration: 'Unlimited', points: 300, description: 'Dynamic flick shot training with speed scaling. Fast clicks = faster spawns down to 150ms elite threshold!', enabled: true, icon: 'Zap', path: 'flick-shot-240fps' },
    
    // Target Tracking Drills
    { id: 12, name: 'Single Target Track', category: 'Target Tracking', subcategory: 'target-tracking', difficulty: 'Intermediate', duration: '2 min', points: 100, description: 'Track a single moving target', enabled: true, icon: 'Eye' },
    { id: 13, name: 'Multi-Target Tracking', category: 'Target Tracking', subcategory: 'target-tracking', difficulty: 'Advanced', duration: '3 min', points: 160, description: 'Track multiple targets at once', enabled: true, icon: 'Activity' },
    { id: 14, name: 'Chaos Tracking', category: 'Target Tracking', subcategory: 'target-tracking', difficulty: 'Pro', duration: '3 min', points: 200, description: 'Track targets in chaotic environments', enabled: true, icon: 'Target' },
    { id: 16, name: 'Reactive Tracking', category: 'Target Tracking', subcategory: 'target-tracking', difficulty: 'Pro', duration: 'Unlimited', points: 250, description: 'Track a bouncing ball with random direction changes and jitter', enabled: true, icon: 'Move', path: 'reactive-tracking' },
    { id: 17, name: '360Hz Pro Tracking', category: 'Target Tracking', subcategory: 'target-tracking', difficulty: 'Elite', duration: 'Unlimited', points: 300, description: 'Track the neon green target among white decoys with increasing speed', enabled: true, icon: 'Crosshair', path: 'pro-tracking' },
    { id: 18, name: '360Hz Neural Tracker', category: 'Target Tracking', subcategory: 'target-tracking', difficulty: 'Legendary', duration: 'Unlimited', points: 350, description: 'Physics-based tracking with realistic ball collisions and teleport swaps', enabled: true, icon: 'GitBranch', path: 'neural-tracker' },
    { id: 19, name: 'High-Speed Kinetic Trainer', category: 'Target Tracking', subcategory: 'target-tracking', difficulty: 'Elite', duration: 'Unlimited', points: 280, description: 'Extreme speed reaction training with teleport mechanics for 360Hz displays', enabled: true, icon: 'Wind', path: 'high-speed-kinetic-trainer' },
    { id: 20, name: '360Hz Pro Flick Drill', category: 'Target Tracking', subcategory: 'target-tracking', difficulty: 'Elite', duration: 'Unlimited', points: 320, description: 'Flick to white targets appearing randomly on screen for 400ms. Train your flick shots and reaction time!', enabled: true, icon: 'Timer', path: 'flick-training' },
    { id: 21, name: 'Reactive Flick Training', category: 'Target Tracking', subcategory: 'target-tracking', difficulty: 'Elite', duration: 'Unlimited', points: 300, description: 'Flick to the green target as it teleports faster and faster! Speed ramps from 800ms to 380ms over 20 seconds.', enabled: true, icon: 'Flame', path: 'reactive-flick-training' },
    { id: 22, name: 'Orbital Tracking Drill', category: 'Target Tracking', subcategory: 'target-tracking', difficulty: 'Pro', duration: 'Unlimited', points: 280, description: 'Track an orbiting target with changing angular speed and orbital radius. Train circular tracking precision!', enabled: true, icon: 'Compass', path: 'orbital-tracking-drill' },
    
    // Spatial Awareness Drills
    { id: 23, name: 'Map Prediction', category: 'Spatial Awareness', subcategory: 'spatial-awareness', difficulty: 'Pro', duration: '3 min', points: 180, description: 'Predict enemy positions on maps', enabled: true, icon: 'Brain' },
  ];

  const categories = ['240fps Reaction Speed', '360fps Reaction Speed', 'Peripheral Vision', 'Aim Training', 'Target Tracking', 'Spatial Awareness'];

  // Helper function to get icon component
  const getIcon = (iconName, className) => {
    switch(iconName) {
      case 'Gauge': return <Gauge className={className} />;
      case 'Target': return <Target className={className} />;
      case 'Crosshair': return <Crosshair className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Trophy': return <Trophy className={className} />;
      case 'ScanEye': return <ScanEye className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Brain': return <Brain className={className} />;
      case 'Move': return <Move className={className} />;
      case 'Circle': return <Circle className={className} />;
      case 'GitBranch': return <GitBranch className={className} />;
      case 'Wind': return <Wind className={className} />;
      case 'Timer': return <Timer className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Grid': return <Grid className={className} />;
      case 'MousePointer': return <MousePointer className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      default: return <Gamepad2 className={className} />;
    }
  };

  // Helper function to get category color
  const getCategoryColor = (category) => {
    switch(category) {
      case '240fps Reaction Speed': return 'from-red-500 to-orange-600';
      case '360fps Reaction Speed': return 'from-purple-500 to-pink-600';
      case 'Peripheral Vision': return 'from-blue-500 to-cyan-600';
      case 'Aim Training': return 'from-green-500 to-emerald-600';
      case 'Target Tracking': return 'from-yellow-500 to-orange-600';
      case 'Spatial Awareness': return 'from-indigo-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // Helper function to get category bg color
  const getCategoryBgColor = (category) => {
    switch(category) {
      case '240fps Reaction Speed': return 'bg-red-50';
      case '360fps Reaction Speed': return 'bg-purple-50';
      case 'Peripheral Vision': return 'bg-blue-50';
      case 'Aim Training': return 'bg-green-50';
      case 'Target Tracking': return 'bg-yellow-50';
      case 'Spatial Awareness': return 'bg-indigo-50';
      default: return 'bg-gray-50';
    }
  };

  // Helper function to get category text color
  const getCategoryTextColor = (category) => {
    switch(category) {
      case '240fps Reaction Speed': return 'text-red-600';
      case '360fps Reaction Speed': return 'text-purple-600';
      case 'Peripheral Vision': return 'text-blue-600';
      case 'Aim Training': return 'text-green-600';
      case 'Target Tracking': return 'text-yellow-600';
      case 'Spatial Awareness': return 'text-indigo-600';
      default: return 'text-gray-600';
    }
  };

  // Helper function to get the correct URL path
  const getDrillPath = (drill) => {
    if (drill.path) {
      return `/drills/fps/${drill.path}`;
    }
    const slug = drill.name.toLowerCase().replace(/ /g, '-').replace(/°/, '');
    return `/drills/fps/${slug}`;
  };

  const fpsStats = [
    { label: "240fps", value: "4.16ms", description: "Frame time" },
    { label: "360fps", value: "2.78ms", description: "Frame time" },
    { label: "Pro Average", value: "150ms", description: "Reaction time" },
    { label: "Elite", value: "100ms", description: "Reaction time" },
  ];

  const totalDrills = drills.filter(d => d.enabled).length;
  const totalPoints = drills.filter(d => d.enabled).reduce((sum, drill) => sum + drill.points, 0);

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
              <p className="text-gray-500 mt-1">Train like a pro - 240fps/360fps reaction speed, aim training & peripheral vision</p>
            </div>
          </div>
        </div>

        {/* FPS Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {fpsStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total Drills</p>
              <Target className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalDrills}</p>
            <p className="text-xs text-gray-500 mt-1">Available to train</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Categories</p>
              <Zap className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Skill areas</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total Points</p>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
            <p className="text-xs text-gray-500 mt-1">Points to earn</p>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {categories.map((category) => {
          const categoryDrills = drills.filter(d => d.category === category && d.enabled);
          if (categoryDrills.length === 0) return null;
          
          return (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${getCategoryBgColor(category)}`}>
                  {getIcon(categoryDrills[0].icon, `w-5 h-5 ${getCategoryTextColor(category)}`)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                  <p className="text-sm text-gray-500">
                    {category === '240fps Reaction Speed' && 'Train for ultra-fast reactions at 240 frames per second'}
                    {category === '360fps Reaction Speed' && 'Elite-level reaction training for 360fps competitive play'}
                    {category === 'Peripheral Vision' && 'Expand your field of view and detect threats at the edges'}
                    {category === 'Aim Training' && 'Precision aiming for competitive shooters'}
                    {category === 'Target Tracking' && 'Track multiple moving targets simultaneously'}
                    {category === 'Spatial Awareness' && 'Map awareness and enemy position prediction'}
                  </p>
                </div>
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
                          {getIcon(drill.icon, `w-5 h-5 ${getCategoryTextColor(category)}`)}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          drill.difficulty === 'Beginner' ? 'bg-green-50 text-green-600' :
                          drill.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-600' :
                          drill.difficulty === 'Advanced' ? 'bg-orange-50 text-orange-600' :
                          drill.difficulty === 'Pro' ? 'bg-blue-100 text-blue-700' :
                          drill.difficulty === 'Elite' ? 'bg-purple-100 text-purple-700' :
                          drill.difficulty === 'Legendary' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {drill.difficulty || 'Standard'}
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
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          <span>{drill.points} pts</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400">FPS Training</span>
                        <div className="flex items-center gap-1 text-red-600 group-hover:gap-2 transition-all">
                          <span className="text-sm font-medium">Start Training</span>
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

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6" />
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