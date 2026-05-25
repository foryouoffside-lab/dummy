'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Zap, Star, Play, Eye, Target, Activity, Home, ChevronRight } from 'lucide-react';

export default function VisualDrillsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const drills = [
    // Reaction Speed Drills
    { id: 1, name: 'Strobe-Latency Lab', folderName: 'light-reaction', category: 'Reaction Speed', subcategory: 'reaction-speed', difficulty: 'Beginner', duration: '60s', description: 'Click when the center ball flashes white. Adaptive 100-200ms window tightens with speed.', enabled: true },
    { id: 2, name: 'Neuro-Switch', folderName: 'sound-reaction', category: 'Reaction Speed', subcategory: 'reaction-speed', difficulty: 'Beginner', duration: '60s', description: 'High pitch = click GREEN. Low pitch = click RED. Audio-cued reaction training.', enabled: true },
    { id: 3, name: 'Chroma-Sync Lab', folderName: 'go/no-go', category: 'Reaction Speed', subcategory: 'reaction-speed', difficulty: 'Intermediate', duration: '60s', description: 'Click GREEN balls only. Avoid RED balls. Train impulse control and selective response.', enabled: true },
    
    // Tracking Accuracy Drills
    { id: 4, name: 'Kinetic Intercept', folderName: 'moving-target', category: 'Tracking Accuracy', subcategory: 'tracking-accuracy', difficulty: 'Intermediate', duration: '60s', description: 'Click fast-moving white targets spawning from edges at 12-22 speed.', enabled: true },
    { id: 5, name: 'Auto-Pursuit', folderName: 'pursuit-tracker', category: 'Tracking Accuracy', subcategory: 'tracking-accuracy', difficulty: 'Advanced', duration: '60s', description: 'Keep cursor on a randomly moving target. +1pt every 0.5s of continuous tracking.', enabled: true },
    { id: 6, name: 'Ghost-Link Tracking', folderName: 'multiple-targets', category: 'Tracking Accuracy', subcategory: 'tracking-accuracy', difficulty: 'Expert', duration: '60s', description: 'Memorize 4 green targets among 11 balls. Track for 60s, then identify them. +5 per correct.', enabled: true },
    
    // Peripheral Vision Drills
    { id: 7, name: 'Peripheral Flash', folderName: 'peripheral-flash', category: 'Peripheral Vision', subcategory: 'peripheral-vision', difficulty: 'Intermediate', duration: '60s', description: 'Detect green flashes in 8 directions while fixating on center. Keep eyes on the red dot.', enabled: true },
    { id: 8, name: 'Wide Field Awareness', folderName: 'wide-field', category: 'Peripheral Vision', subcategory: 'peripheral-vision', difficulty: 'Advanced', duration: '60s', description: 'Recall characters flashed in 4 corners while fixating on center + symbol.', enabled: true },
    
    // Visual Recognition Drills
    { id: 9, name: 'Neural Shape ID', folderName: 'rapid-object-id', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Intermediate', duration: '60s', description: 'Circle = Left. Square = Right. Adaptive 50-300ms flash. Keyboard: A/← D/→.', enabled: true },
    { id: 10, name: 'Difference Spotter', folderName: 'difference-spotter', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Intermediate', duration: '60s', description: 'Study 5 objects, find which one changed position or color after a blink.', enabled: true },
    { id: 11, name: 'Visual Search', folderName: 'visual-search', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Advanced', duration: '60s', description: 'Find the letter C among 160 O distractors in a 16×10 grid. +1 per find, -1 wrong.', enabled: true },
    { id: 12, name: 'Entropic Grid', folderName: 'entropic-grid', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Advanced', duration: '90s', description: 'Find the 2-char target in a 10×10 grid. Cells randomly corrupt every 800ms. Stamina system with 90s challenge.', enabled: true },
    { id: 13, name: 'Rhythm Anomaly', folderName: 'rhythm-anomaly', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Advanced', duration: '90s', description: 'Find the faster-pulsing cell (1.4s) among steady cells (2s) in a 6×6 grid. Stamina system.', enabled: true },
    
    // Depth Perception Drills
    { id: 14, name: 'Distance Judgment Lab', folderName: 'distance-judgment', category: 'Depth Perception', subcategory: 'depth-perception', difficulty: 'Intermediate', duration: '60s', description: 'Intercept a moving sphere at the target depth. Perfect <5%, Close <15%, Far ≥15% error.', enabled: true },
  ];

  const categories = ['Reaction Speed', 'Tracking Accuracy', 'Peripheral Vision', 'Visual Recognition', 'Depth Perception'];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-50 text-green-600 border-green-200';
      case 'Intermediate': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Advanced': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Expert': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Reaction Speed': return 'from-blue-500 to-blue-600';
      case 'Tracking Accuracy': return 'from-cyan-500 to-teal-600';
      case 'Peripheral Vision': return 'from-indigo-500 to-purple-600';
      case 'Visual Recognition': return 'from-violet-500 to-pink-600';
      case 'Depth Perception': return 'from-sky-500 to-cyan-600';
      default: return 'from-blue-500 to-cyan-600';
    }
  };

  const getCategoryBgColor = (category) => {
    switch(category) {
      case 'Reaction Speed': return 'bg-blue-50';
      case 'Tracking Accuracy': return 'bg-cyan-50';
      case 'Peripheral Vision': return 'bg-indigo-50';
      case 'Visual Recognition': return 'bg-violet-50';
      case 'Depth Perception': return 'bg-sky-50';
      default: return 'bg-blue-50';
    }
  };

  const getCategoryTextColor = (category) => {
    switch(category) {
      case 'Reaction Speed': return 'text-blue-600';
      case 'Tracking Accuracy': return 'text-cyan-600';
      case 'Peripheral Vision': return 'text-indigo-600';
      case 'Visual Recognition': return 'text-violet-600';
      case 'Depth Perception': return 'text-sky-600';
      default: return 'text-blue-600';
    }
  };

  const getCategoryHoverColor = (category) => {
    switch(category) {
      case 'Reaction Speed': return 'group-hover:text-blue-600';
      case 'Tracking Accuracy': return 'group-hover:text-cyan-600';
      case 'Peripheral Vision': return 'group-hover:text-indigo-600';
      case 'Visual Recognition': return 'group-hover:text-violet-600';
      case 'Depth Perception': return 'group-hover:text-sky-600';
      default: return 'group-hover:text-blue-600';
    }
  };

  const totalDrills = drills.filter(d => d.enabled).length;

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading visual drills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Visual Drills - Reaction Speed, Tracking & Vision Training",
            "url": "https://skilldrills.online/drills/visual",
            "description": "14 free visual training drills across Reaction Speed, Tracking Accuracy, Peripheral Vision, Visual Recognition, and Depth Perception categories.",
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Visual Skill Training" },
            "numberOfItems": 14,
            "itemListElement": drills.filter(d => d.enabled).map((drill, index) => ({
              "@type": "ListItem", "position": index + 1,
              "item": { "@type": "WebApplication", "name": drill.name, "url": `https://skilldrills.online/drills/visual/${drill.subcategory}/${drill.folderName}`, "description": drill.description, "applicationCategory": "EducationalApplication", "operatingSystem": "Web" }
            }))
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors"><Home className="w-4 h-4" /><span>Home</span></Link></li>
            <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
            <li><Link href="/drills" className="hover:text-blue-600 transition-colors">Drills</Link></li>
            <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
            <li><span className="text-blue-600 font-medium" aria-current="page">Visual Training</span></li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Visual Drills</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Train your reaction speed, tracking accuracy, and visual perception with 14 free drills</p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Visual drills overview">
          <h2>Visual Training Drills Overview</h2>
          <p>
            Access 14 free visual training drills across 5 categories.
            Reaction Speed: Strobe-Latency Lab, Neuro-Switch, and Chroma-Sync Lab.
            Tracking Accuracy: Kinetic Intercept, Auto-Pursuit, and Ghost-Link Tracking.
            Peripheral Vision: Peripheral Flash and Wide Field Awareness.
            Visual Recognition: Neural Shape ID, Difference Spotter, Visual Search, Entropic Grid, and Rhythm Anomaly.
            Depth Perception: Distance Judgment Lab.
            All drills are free with no login required.
          </p>
        </section>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">⚡ Reaction Speed</span>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">🎯 Tracking Accuracy</span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">👀 Peripheral Vision</span>
          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium">🔍 Visual Recognition</span>
          <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium">📏 Depth Perception</span>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2"><p className="text-sm text-gray-500">Available Drills</p><Target className="w-4 h-4 text-green-500" /></div>
            <p className="text-2xl font-bold text-gray-900">{totalDrills}</p>
            <p className="text-xs text-gray-500 mt-1">Ready to train</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2"><p className="text-sm text-gray-500">Categories</p><Eye className="w-4 h-4 text-blue-500" /></div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Visual skill areas</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2"><p className="text-sm text-gray-500">Free Access</p><Star className="w-4 h-4 text-yellow-500" /></div>
            <p className="text-2xl font-bold text-gray-900">100%</p>
            <p className="text-xs text-gray-500 mt-1">No login required</p>
          </div>
        </div>

        {/* Drills Grid by Category */}
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
                  const drillPath = `/drills/visual/${drill.subcategory}/${drill.folderName}`;
                  const hoverColor = getCategoryHoverColor(category);
                  
                  return (
                    <Link
                      key={drill.id}
                      href={drillPath}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${getCategoryBgColor(category)}`}>
                            <Eye className={`w-5 h-5 ${getCategoryTextColor(category)}`} />
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
                          <div className="flex items-center gap-1"><Clock className="w-3 h-3" /><span>{drill.duration}</span></div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{drill.category}</span>
                          <div className={`flex items-center gap-1 ${getCategoryTextColor(category)} group-hover:gap-2 transition-all`}>
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

        {/* Visual Training Tips Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Eye className="w-6 h-6" />Visual Training Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><h4 className="font-semibold mb-2">Warm Up Your Eyes</h4><p className="text-sm text-blue-100">Start with easier drills to activate your visual system before tackling more challenging exercises.</p></div>
            <div><h4 className="font-semibold mb-2">Progressive Overload</h4><p className="text-sm text-blue-100">Gradually increase speed and complexity as your visual processing improves for optimal adaptation.</p></div>
            <div><h4 className="font-semibold mb-2">Eye Rest Matters</h4><p className="text-sm text-blue-100">Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.</p></div>
          </div>
        </div>

        {/* Explore Related Categories */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Explore Related Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/fps" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"><div className="text-3xl mb-3">🎮</div><h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition">FPS Training</h3><p className="text-xs text-gray-500 mt-1">Aim trainer, reflex & tracking drills</p></Link>
            <Link href="/drills/motor" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"><div className="text-3xl mb-3">✋</div><h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition">Motor Skills</h3><p className="text-xs text-gray-500 mt-1">Hand-eye coordination & precision</p></Link>
            <Link href="/drills/cognitive" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"><div className="text-3xl mb-3">🧠</div><h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition">Cognitive Training</h3><p className="text-xs text-gray-500 mt-1">Memory, focus & problem solving</p></Link>
            <Link href="/drills/memory" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"><div className="text-3xl mb-3">💾</div><h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">Memory Drills</h3><p className="text-xs text-gray-500 mt-1">Working memory & spatial recall</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
}