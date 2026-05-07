"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowLeft, Clock, Play, Target, Crosshair, Star, Zap, Eye, Brain, Gamepad2, Home, ChevronRight } from "lucide-react";

const fpsCategories = [
  {
    name: "Aim Accuracy",
    folderName: "fps",
    icon: Crosshair,
    color: "red",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    description: "Master flick shots, precision clicking, and target acquisition",
    drills: [
      { name: "Flick Shot Training", folderName: "flick-shot-training", difficulty: "Advanced", duration: "60s", description: "One-tap flick shots with adaptive target windows (150-1000ms) and timer ring feedback" },
      { name: "Flick Shot 240FPS", folderName: "flick-shot-240fps", difficulty: "Beginner", duration: "60s", description: "High-refresh-rate flick training with timer ring and precision hit detection" },
      { name: "Anchor Flick Drill", folderName: "flick-training", difficulty: "Expert", duration: "60s", description: "Click anchor to spawn target, then flick to hit it with distance tracking" },
      { name: "Clinical Gray Grid", folderName: "clinical-gray-grid", difficulty: "Advanced", duration: "60s", description: "16-cell grid with red flash targets and 450ms window for minimalist precision" },
      { name: "Target Acquisition", folderName: "target-acquisition", difficulty: "Intermediate", duration: "90s", description: "Click 5 targets in brightness order (opacity 1.0→0.4). +1 per set, -1 wrong click." },
      { name: "240FPS Click Test", folderName: "240fps-click-test", difficulty: "Intermediate", duration: "60s", description: "Center target lights up for 200ms at random 0.8-2.0s intervals for click speed" }
    ]
  },
  {
    name: "Tracking",
    folderName: "fps",
    icon: Eye,
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    description: "Smooth aim, reactive tracking, and multi-target management",
    drills: [
      { name: "360Hz Pro Tracking", folderName: "pro-tracking", difficulty: "Advanced", duration: "60s", description: "6 bouncing balls with target switching every 1.5s and +5pts/s scoring" },
      { name: "Pro Smooth Pursuit", folderName: "pro-smooth-pursuit", difficulty: "Advanced", duration: "60s", description: "Lissajous curve target at 360Hz refresh. +1pt/0.5s on target. Green when tracked." },
      { name: "Reactive Tracking", folderName: "reactive-tracking", difficulty: "Intermediate", duration: "60s", description: "Single bouncing ball with unpredictable directional jitter, +1pt/350ms on target" },
      { name: "Single Target Track", folderName: "single-target-track", difficulty: "Beginner", duration: "60s", description: "Track a single target that glows green on lock-on, +1pt/200ms of continuous tracking" },
      { name: "Multi-Target Tracking", folderName: "multi-target-tracking", difficulty: "Advanced", duration: "60s", description: "Memorize 3 targets from 9 bouncing balls, identify them after tracking phase" },
      { name: "Orbital Tracking", folderName: "orbital-tracking-drill", difficulty: "Intermediate", duration: "60s", description: "Target orbits center with changing radius (100-300px) and variable speed" },
      { name: "Predictive Tracking", folderName: "predictive-tracking", difficulty: "Advanced", duration: "60s", description: "Click the green prediction circle 12 frames ahead of the ghost target path" },
      { name: "Neural Tracker", folderName: "neural-tracker", difficulty: "Expert", duration: "60s", description: "5 balls with collision physics, track only the green one for +1pt/2s" },
      { name: "Chaos Tracking", folderName: "chaos-tracking", difficulty: "Expert", duration: "60s", description: "Multiple targets with chaotic movement patterns for advanced tracking practice" }
    ]
  },
  {
    name: "Reaction Speed",
    folderName: "fps",
    icon: Zap,
    color: "amber",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    description: "Reflex tests, click speed, and instant response training",
    drills: [
      { name: "Instant Response", folderName: "instant-response", difficulty: "Beginner", duration: "60s", description: "Center-flash targets at random 0.8-2.5s with 80-1200ms adaptive window" },
      { name: "360FPS Reflex", folderName: "360fps-reflex", difficulty: "Advanced", duration: "60s", description: "Ultra-high refresh reflex training with 360FPS target detection and response" },
      { name: "Kinetic Trainer", folderName: "high-speed-kinetic-trainer", difficulty: "Expert", duration: "60s", description: "Bouncing green target with teleports, combo streaks, and speed acceleration" }
    ]
  },
  {
    name: "Awareness",
    folderName: "fps",
    icon: Brain,
    color: "green",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    description: "Peripheral vision, 180° awareness, and map prediction",
    drills: [
      { name: "180° Awareness", folderName: "180-degree-awareness", difficulty: "Intermediate", duration: "60s", description: "Targets spawn at extreme screen edges every 250ms with 5 lives system" },
      { name: "Peripheral Awareness", folderName: "peripheral-awareness", difficulty: "Beginner", duration: "60s", description: "Edge targets with center crosshair fixation and directional arrow indicators" },
      { name: "Map Prediction", folderName: "map-prediction", difficulty: "Advanced", duration: "60s", description: "Dashed directional trails show movement path, target appears at predicted endpoint" }
    ]
  }
];

export default function FPSHubClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      case 'Aim Accuracy': return 'from-red-500 to-orange-600';
      case 'Tracking': return 'from-blue-500 to-cyan-600';
      case 'Reaction Speed': return 'from-amber-500 to-yellow-600';
      case 'Awareness': return 'from-green-500 to-emerald-600';
      default: return 'from-red-500 to-orange-600';
    }
  };

  const getCategoryIconBg = (category) => {
    switch(category) {
      case 'Aim Accuracy': return 'bg-red-50';
      case 'Tracking': return 'bg-blue-50';
      case 'Reaction Speed': return 'bg-amber-50';
      case 'Awareness': return 'bg-green-50';
      default: return 'bg-red-50';
    }
  };

  const totalDrills = fpsCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading FPS training hub...</p>
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
            "name": "FPS Aim Training Drills",
            "url": "https://skilldrills.online/drills/fps",
            "description": `${totalDrills} free FPS aim training drills for Valorant, CS2, Apex Legends, Overwatch 2 and all FPS games. 4 categories: Aim Accuracy, Tracking, Reaction Speed, and Awareness.`,
            "isPartOf": { "@type": "WebSite", "name": "Global Drill System", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "FPS Gaming Aim Training" },
            "numberOfItems": totalDrills,
            "itemListElement": fpsCategories.flatMap(cat => cat.drills).map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/fps/${drill.folderName}`,
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
            <li><Link href="/" className="flex items-center gap-1 hover:text-red-600 transition-colors"><Home className="w-4 h-4" /><span>Home</span></Link></li>
            <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
            <li><Link href="/drills" className="hover:text-red-600 transition-colors">Drills</Link></li>
            <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
            <li><span className="text-red-600 font-medium" aria-current="page">FPS Training</span></li>
          </ol>
        </nav>

        {/* SEO Content */}
        <section className="sr-only" aria-label="FPS training drills overview">
          <h2>FPS Aim Training Drills for All Games</h2>
          <p>Access {totalDrills} free FPS aim training drills across 4 categories: Aim Accuracy (6 drills), Tracking (9 drills), Reaction Speed (3 drills), and Awareness (3 drills). Perfect for Valorant, CS2, Apex Legends, Overwatch 2, and all FPS games. No login required.</p>
        </section>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">FPS Aim Training</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Improve flick shots, tracking, reaction speed, and peripheral awareness with {totalDrills} free drills</p>
            </div>
          </div>
        </div>

        {/* Game Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">🎯 Valorant</span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">🔫 CS2</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">⚡ Apex Legends</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">🛡️ Overwatch 2</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">🎮 All FPS Games</span>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2"><p className="text-sm text-gray-500">Available Drills</p><Target className="w-4 h-4 text-green-500" /></div>
            <p className="text-2xl font-bold text-gray-900">{totalDrills}</p>
            <p className="text-xs text-gray-500 mt-1">Ready to train</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2"><p className="text-sm text-gray-500">Categories</p><Crosshair className="w-4 h-4 text-red-500" /></div>
            <p className="text-2xl font-bold text-gray-900">{fpsCategories.length}</p>
            <p className="text-xs text-gray-500 mt-1">Skill areas</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-between mb-2"><p className="text-sm text-gray-500">Free Access</p><Star className="w-4 h-4 text-yellow-500" /></div>
            <p className="text-2xl font-bold text-gray-900">100%</p>
            <p className="text-xs text-gray-500 mt-1">No login required</p>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {fpsCategories.map((category) => {
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
                  const drillPath = `/drills/${category.folderName}/${drill.folderName}`;
                  return (
                    <Link key={index} href={drillPath} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${getCategoryIconBg(category.name)}`}><CategoryIcon className={`w-5 h-5 ${category.textColor}`} /></div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(drill.difficulty)}`}>{drill.difficulty}</div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{drill.name}</h3>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{drill.description}</p>
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500"><div className="flex items-center gap-1"><Clock className="w-3 h-3" /><span>{drill.duration}</span></div></div>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{category.name}</span>
                          <div className="flex items-center gap-1 text-red-600 group-hover:gap-2 transition-all"><span className="text-sm font-medium">Start Drill</span><Play className="w-4 h-4" /></div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Training Guide Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 mt-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Target className="w-6 h-6" />Recommended Training Routine</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2"><span className="text-lg">🌅</span> Warm-Up (5 mins)</h4>
              <ul className="text-sm text-orange-100 space-y-1"><li>• Single Target Track</li><li>• Instant Response</li><li>• Pro Smooth Pursuit</li></ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2"><span className="text-lg">🎯</span> Main Session (15 mins)</h4>
              <ul className="text-sm text-orange-100 space-y-1"><li>• Flick Shot Training</li><li>• Reactive Tracking</li><li>• 240FPS Click Test</li><li>• Peripheral Awareness</li></ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2"><span className="text-lg">⚡</span> Challenge (10 mins)</h4>
              <ul className="text-sm text-orange-100 space-y-1"><li>• 360Hz Pro Tracking</li><li>• Predictive Tracking</li><li>• Kinetic Trainer</li></ul>
            </div>
          </div>
        </div>

        {/* Explore Related Categories */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Explore Related Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/cognitive" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-purple-500"><div className="text-3xl mb-3">🧠</div><h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Cognitive Training</h3><p className="text-xs text-gray-500 mt-1">Memory, focus, attention & problem solving</p></Link>
            <Link href="/drills/visual" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"><div className="text-3xl mb-3">👁️</div><h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Visual Training</h3><p className="text-xs text-gray-500 mt-1">Reaction speed, tracking & peripheral vision</p></Link>
            <Link href="/drills/motor" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"><div className="text-3xl mb-3">✋</div><h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Motor Skills</h3><p className="text-xs text-gray-500 mt-1">Hand-eye coordination & precision control</p></Link>
            <Link href="/drills/memory" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"><div className="text-3xl mb-3">💾</div><h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">Memory Drills</h3><p className="text-xs text-gray-500 mt-1">Working memory, spatial & long-term recall</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
}