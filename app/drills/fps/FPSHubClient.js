"use client";

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { ArrowLeft, Clock, Play, Target, Crosshair, Star, Zap, Eye, Brain, Gamepad2, Home, ChevronRight, Cpu, Monitor, MousePointer, Smartphone } from "lucide-react";

// Mapping: drill folderName → drillId (for tier badge display)
const FOLDER_TO_DRILL_ID = {
  'flick-shot-training': 'pro-flick',
  'micro-flick-burst': 'micro-flick-burst',
  'micro-flick-precision': 'micro-flick-precision',
  'headshot-micro-adjust': 'headshot-reflex',
  'target-acquisition': 'target-acquisition',
  'pro-tracking': 'pro-tracking',
  'strafe-tracking': 'strafe-tracking',
  'reactive-sphere-tracking': 'reactive-sphere',
  'pro-smooth-pursuit': 'pro-smooth-pursuit',
  'evasive-slide-track': 'evasive-slide-track',
  'vertical-air-pursuit': 'vertical-air-pursuit',
  'vertical-air-track': 'vertical-air-track',
  'recoil-control': 'recoil-control',
  'pubg-dmr-rhythm': 'pubg-dmr-rhythm',
  'counter-strafe-trainer': 'counter-strafe',
  'deadzone-jiggle-snap': 'deadzone-jiggle-snap',
  'target-switching-swarm': 'target-switching-swarm',
  'target-prioritization': 'target-prioritization',
  'angle-hold-trainer': 'angle-hold',
  'prefire-corner-clearer': 'prefire-corner',
  '180-degree-awareness': '180-awareness',
  'sound-spatial-reflex': 'sound-spatial',
  'instant-response': 'instant-response',
  'high-speed-kinetic-trainer': 'kinetic-trainer',
  'pubg-drive-by': 'pubg-drive-by',
  'pubg-lead-drop': 'pubg-lead-drop',
  'parabolic-air-track': 'parabolic-air-track',
  'pixel-hold-swing': 'pixel-hold-swing',
};


const fpsCategories = [
  {
    name: "Precision Clicking",
    folderName: "fps",
    icon: Crosshair,
    color: "red",
    bgColor: "bg-red-500/10 border-red-500/20 text-red-400",
    textColor: "text-red-400",
    description: "Master flick shots, precision clicking, and cognitive prioritization",
    drills: [
      { name: "Flick Shot Training", folderName: "flick-shot-training", difficulty: "Advanced", duration: "60s", description: "One-tap flick shots with adaptive target windows (150-1000ms) and timer ring feedback" },
      { name: "Micro-Flick Control", folderName: "target-acquisition", difficulty: "Intermediate", duration: "90s", description: "Click 5 targets in brightness order (opacity 1.0→0.4). +1 per set, -1 wrong click." },
      { name: "Target Prioritization Swarm", folderName: "target-prioritization", difficulty: "Advanced", duration: "60s", description: "Clear targets in order of priority: Red (Critical, high value), Blue (Standard), avoid Yellow decoys" },
      { name: "Target Switching Swarm", folderName: "target-switching-swarm", difficulty: "Advanced", duration: "60s", description: "Gridshot speed flick switching: click neon targets as fast as they spawn in a moving dynamic swarm" },
      
    ]
  },
  {
    name: "Tracking & Switching",
    folderName: "fps",
    icon: Eye,
    color: "blue",
    bgColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    textColor: "text-blue-400",
    description: "Smooth aim, reactive tracking, and multi-target flick-switching",
    drills: [
      { name: "Unpredictable Strafe Tracking", folderName: "strafe-tracking", difficulty: "Advanced", duration: "60s", description: "Maintain cursor lock-on targets executing unpredictable, high-rate strafing maneuvers" },
      { name: "Smooth Pursuit Lab", folderName: "pro-smooth-pursuit", difficulty: "Advanced", duration: "60s", description: "Lissajous curve target at 360Hz refresh. +1pt/1.0s on target. Green when tracked." },
      { name: "Vertical Air-Track", folderName: "vertical-air-track", difficulty: "Expert", duration: "60s", description: "Practice vertical and parabolic tracking of targets launched high into air flight paths subject to gravity" },
      { name: "Reactive Sphere Tracking", folderName: "reactive-sphere-tracking", difficulty: "Expert", duration: "60s", description: "Reactive 3D sphere tracking under sudden, unpredictable evasive direction changes" },
      { name: "S+ Parabolic Air-Track", folderName: "parabolic-air-track", difficulty: "Expert", duration: "60s", description: "S+ Elite: track vertical gravity-affected arcs under abrupt mid-air wind drifts" },
    
      
    ]
  },
  {
    name: "Movement & Recoil",
    folderName: "fps",
    icon: Gamepad2,
    color: "green",
    bgColor: "bg-green-500/10 border-green-500/20 text-green-400",
    textColor: "text-green-400",
    description: "Strafing-shooting synchronization, cover peeking, and spray patterns",
    drills: [
      { name: "Counter-Strafe Trainer", folderName: "counter-strafe-trainer", difficulty: "Expert", duration: "60s", description: "Train strafing-shooting sync: click targets exactly at the zero-velocity point of A/D counter-strafes" },
      { name: "Recoil Control Lab", folderName: "recoil-control", difficulty: "Advanced", duration: "60s", description: "Esports recoil control spray simulator: pull down mouse to counter spray vertical S-curve" },
      { name: "Angle Hold & Peek Trainer", folderName: "angle-hold-trainer", difficulty: "Expert", duration: "60s", description: "Train reaction times and crosshair placement against cover peeking, wide swings, and jiggle movements" },
      { name: "Prefire Corner Clearer", folderName: "prefire-corner-clearer", difficulty: "Expert", duration: "60s", description: "Clear defensive angles and corners using A/D strafing controls: shooting while moving incurs error penalties" }
    ]
  },
  {
    name: "Reflex & Awareness",
    folderName: "fps",
    icon: Zap,
    color: "amber",
    bgColor: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    textColor: "text-amber-400",
    description: "Instant reflex response, extreme-speed prediction, and peripheral vision",
    drills: [
      { name: "Instant Reflex Test", folderName: "instant-response", difficulty: "Beginner", duration: "60s", description: "Center-flash targets at random 0.8-2.5s with 80-1200ms adaptive window" },
      { name: "180° Peripheral Scan", folderName: "180-degree-awareness", difficulty: "Intermediate", duration: "60s", description: "Targets spawn at extreme screen edges every 250ms with 5 lives system" }
    ]
  }
];

export default function FPSHubClient() {
  const [isClient, setIsClient] = useState(false);
  const [drillTiers, setDrillTiers] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Detect mobile/touch devices
    const checkMobile = () => {
      const hasTouchScreen = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
      const isSmallScreen = window.innerWidth < 1024;
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsMobile(hasTouchScreen || (isSmallScreen && isMobileUserAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    try {
      const { getAllDrillTiers } = require("../../../lib/adaptiveDifficulty");
      setDrillTiers(getAllDrillTiers());
    } catch (e) {}
  }, [isClient]);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Precision Clicking': return 'from-red-500 to-orange-500';
      case 'Tracking & Switching': return 'from-blue-500 to-cyan-500';
      case 'Movement & Recoil': return 'from-green-500 to-emerald-500';
      case 'Reflex & Awareness': return 'from-amber-500 to-yellow-500';
      default: return 'from-red-500 to-orange-500';
    }
  };

  const getCategoryIconBg = (category) => {
    switch(category) {
      case 'Precision Clicking': return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'Tracking & Switching': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'Movement & Recoil': return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'Reflex & Awareness': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      default: return 'bg-red-500/10 border-red-500/20 text-red-400';
    }
  };

  const getCategoryCardBorder = (category) => {
    switch(category) {
      case 'Precision Clicking': return 'hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]';
      case 'Tracking & Switching': return 'hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]';
      case 'Movement & Recoil': return 'hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]';
      case 'Reflex & Awareness': return 'hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]';
      default: return 'hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]';
    }
  };

  const totalDrills = fpsCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "FPS Aim Training Drills",
    "url": "https://skilldrills.online/drills/fps",
    "description": `${totalDrills} free FPS aim training drills for Valorant, CS2, Apex Legends, Overwatch 2 and all FPS games. 4 categories: Aim Accuracy, Tracking, Reaction Speed, and Awareness.`,
    "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
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
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-400 font-mono tracking-widest uppercase animate-pulse">Initializing Combat Core...</p>
        </div>
      </div>
    );
  }

  // Mobile Lock Screen
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans flex items-center justify-center relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.45)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.45)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
          {/* Warning Icon */}
          <div className="mb-8 relative">
            <div className="w-24 h-24 mx-auto bg-red-500/10 border-2 border-red-500/30 rounded-full flex items-center justify-center animate-pulse">
              <Monitor className="w-12 h-12 text-red-400" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 border-2 border-red-500/20 rounded-full animate-ping" />
            </div>
          </div>

          {/* Main Message */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MousePointer className="w-5 h-5 text-red-400" />
              <h2 className="text-xl font-extrabold text-white uppercase tracking-wider font-mono">
                Desktop Required
              </h2>
              <MousePointer className="w-5 h-5 text-red-400" />
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              This FPS Aim Training sector requires a <span className="text-red-400 font-bold">mouse and keyboard</span> setup 
              with precise cursor control. Mobile touchscreens are not supported for these drills.
            </p>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 mb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 font-mono">
                Minimum Requirements
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <Monitor className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-slate-300">Desktop or Laptop Computer</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MousePointer className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-slate-300">Physical Mouse (not trackpad)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Smartphone className="w-4 h-4 text-red-400 shrink-0 line-through" />
                  <span className="text-slate-500 line-through">Mobile / Tablet Device</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link 
                href="/"
                className="block w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 font-bold rounded-lg transition-all text-sm uppercase tracking-wider font-mono"
              >
                ← Return to Headquarters
              </Link>
              <Link 
                href="/drills"
                className="block w-full py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-500 font-bold rounded-lg transition-all text-xs uppercase tracking-wider font-mono"
              >
                Browse Other Drill Sectors
              </Link>
            </div>

            <p className="text-[10px] text-slate-600 mt-6 font-mono uppercase">
              Detected: Touch/Mobile Device • Access Restricted
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-red-500/30 selection:text-red-350 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.45)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.45)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <li><Link href="/" className="flex items-center gap-1.5 hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /><span>HQ</span></Link></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li><Link href="/drills" className="hover:text-red-400 transition-colors">Drills</Link></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li><span className="text-red-400 font-bold" aria-current="page">FPS Sector</span></li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 shadow-inner shrink-0">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">FPS Aim & Reflex</h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                Hone mouse raw-input reflexes, smooth target tracking, and extreme 180° awareness indicators.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start md:self-center">
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-350 rounded-md text-xs font-mono font-semibold">🔫 VALORANT</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-350 rounded-md text-xs font-mono font-semibold">💣 CS2_AIM</span>
          </div>
        </div>

        {/* Drills Stats */}
        <div className="mb-12">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center lg:text-left backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">DRILLS_CONNECTED</span>
                <Cpu className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-4xl font-extrabold text-white tracking-tight">{totalDrills}</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Esports Portals Loaded</p>
            </div>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {fpsCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.name} className="mb-14 relative">
              
              <div className="flex items-center gap-2 mb-6 border-b border-slate-900 pb-3">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category.name)}`} />
                <h2 className="text-lg font-bold uppercase tracking-wider text-white font-mono">{category.name}</h2>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-500">
                  {category.drills.length} DRILL{category.drills.length > 1 ? 'S' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => {
                  const drillPath = `/drills/${category.folderName}/${drill.folderName}`;
                  const drillId = FOLDER_TO_DRILL_ID[drill.folderName];
                  const tierInfo = drillId && drillTiers[drillId] ? drillTiers[drillId] : null;
                  return (
                    <Link 
                      key={index} 
                      href={drillPath} 
                      className={`group relative overflow-hidden bg-slate-950/80 border border-slate-900 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-red-500/50 ${getCategoryCardBorder(category.name)}`}
                      aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2.5 rounded-lg border ${getCategoryIconBg(category.name)}`}>
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            {/* Tier Badge */}
                            {tierInfo && tierInfo.tier !== 'silver' && (
                              <div className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border ${tierInfo.display.bgColor} ${tierInfo.display.borderColor} ${tierInfo.display.textColor}`}>
                                {tierInfo.display.icon} {tierInfo.display.label}
                              </div>
                            )}
                            <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide border uppercase ${getDifficultyColor(drill.difficulty)}`}>
                              {drill.difficulty}
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors uppercase tracking-tight font-mono">
                          {drill.name}
                        </h3>
                        
                        <p className="text-xs text-slate-400 mb-4 leading-relaxed min-h-[48px]">
                          {drill.description}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-4 text-[10px] font-mono text-slate-500 border-b border-slate-900 pb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{drill.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Cpu className="w-3.5 h-3.5" />
                            <span>Aim Engine</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{category.name}</span>
                          <div className="flex items-center gap-1 text-red-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
                            <span>EXEC_DRILL</span>
                            <Play className="w-3.5 h-3.5 fill-current" />
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

        {/* Training Guide Section */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 mt-12 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 font-mono">
            RECOMMENDED TRAINING PROTOCOLS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
              <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                <span>🌅</span> Phase 01: Warm-Up
              </h4>
              <ul className="text-[11px] font-mono text-slate-400 space-y-2">
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Single Target Track (2 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Instant Response (2 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Pro Smooth Pursuit (1 run)</li>
              </ul>
            </div>
            <div className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
              <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                <span>🎯</span> Phase 02: Core Load
              </h4>
              <ul className="text-[11px] font-mono text-slate-400 space-y-2">
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Flick Shot Training (3 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Reactive Tracking (3 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Peripheral Awareness (2 runs)</li>
              </ul>
            </div>
            <div className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
              <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                <span>⚡</span> Phase 03: Overload
              </h4>
              <ul className="text-[11px] font-mono text-slate-400 space-y-2">
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> 360Hz Pro Tracking (2 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Predictive Tracking (2 runs)</li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Kinetic Trainer (2 runs)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Explore Related Categories */}
        <div className="mt-16 mb-8 border-t border-slate-900 pt-12">
          <h2 className="text-lg font-bold tracking-widest text-center text-white font-mono uppercase mb-8">Explore Adjacent Sectors</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/drills/cognitive" className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)] transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">🧠</div>
              <h3 className="font-bold text-slate-200 group-hover:text-purple-400 transition-colors uppercase text-xs tracking-wider font-mono">Cognitive</h3>
              <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">Memory, focus & solving</p>
            </Link>
            <Link href="/drills/visual" className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">👁️</div>
              <h3 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors uppercase text-xs tracking-wider font-mono">Visual</h3>
              <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">Reaction, tracking & fov</p>
            </Link>
            <Link href="/drills/motor" className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">✋</div>
              <h3 className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors uppercase text-xs tracking-wider font-mono">Motor Skills</h3>
              <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">Hand-eye coordination</p>
            </Link>
            <Link href="/drills/memory" className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.05)] transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="text-2xl mb-2">💾</div>
              <h3 className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors uppercase text-xs tracking-wider font-mono">Memory</h3>
              <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">Working & sequence recall</p>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}