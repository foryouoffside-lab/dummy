'use client';

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { 
  ArrowLeft, Clock, Play, Target, Crosshair, Star, Zap, Eye, Brain, 
  Gamepad2, Home, ChevronRight, Cpu, Monitor, MousePointer, Smartphone,
  AlertTriangle, AlertCircle, MessageSquare, Lightbulb
} from "lucide-react";

// Mapping: drill folderName → drillId (for tier badge display)
const FOLDER_TO_DRILL_ID = {
  'flick-shot-training': 'pro-flick',
  'target-acquisition': 'target-acquisition',
  'strafe-tracking': 'strafe-tracking',
  'pro-smooth-pursuit': 'pro-smooth-pursuit',
  'vertical-air-track': 'vertical-air-track',
  'reactive-sphere-tracking': 'reactive-sphere-tracking',
  'recoil-control': 'recoil-control',
  'target-switching-swarm': 'target-switching-swarm',
  'target-prioritization': 'target-prioritization',
  'angle-hold-trainer': 'angle-hold',
  '180-degree-awareness': '180-awareness',
  'instant-response': 'instant-response',
  'flow-state': 'flow-state',
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
      { name: "Reactive Sphere Tracking", folderName: "reactive-sphere-tracking", difficulty: "Intermediate", duration: "60s", description: "Track a reactive sphere that dynamically evades your cursor with physics-based movement and adaptive speed" },
      { name: "Smooth Pursuit Lab", folderName: "pro-smooth-pursuit", difficulty: "Advanced", duration: "60s", description: "Lissajous curve target at 360Hz refresh. +1pt/1.0s on target. Green when tracked." },
      { name: "Vertical Air-Track", folderName: "vertical-air-track", difficulty: "Expert", duration: "60s", description: "Practice vertical and parabolic tracking of targets launched high into air flight paths subject to gravity" },
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
      { name: "Recoil Control Lab", folderName: "recoil-control", difficulty: "Advanced", duration: "60s", description: "Esports recoil control spray simulator: pull down mouse to counter spray vertical S-curve" },
      { name: "Angle Hold & Peek Trainer", folderName: "angle-hold-trainer", difficulty: "Expert", duration: "60s", description: "Train reaction times and crosshair placement against cover peeking, wide swings, and jiggle movements" },
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
      { name: "180° Peripheral Scan", folderName: "180-degree-awareness", difficulty: "Intermediate", duration: "60s", description: "Targets spawn at extreme screen edges every 250ms with 5 lives system" },
      { name: "Aim Flow State", folderName: "flow-state", difficulty: "Intermediate", duration: "Untimed", description: "Continuous aim flow state practice. Maintain rhythm across sequential spawning targets." }
    ]
  }
];

export default function FPSHubClient() {
  const [isClient, setIsClient] = useState(false);
  const [drillTiers, setDrillTiers] = useState({});
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Rotate Your Device");

  // Notice Modal State - Default false to prevent hydration mismatch
  const [showBetaNotice, setShowBetaNotice] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Session Storage Check for Beta Notice
    const noticeShown = sessionStorage.getItem('fps_beta_notice_shown');
    if (!noticeShown) {
      setShowBetaNotice(true);
    }

    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua) || 
                       (navigator.maxTouchPoints > 0 && 
                        window.screen && Math.max(window.screen.width, window.screen.height) < 1024);
      if (!isMobile) {
        setShowRotateWarning(false);
        return;
      }
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        if (window.innerWidth < 768) {
          setShowRotateWarning(true);
          setWarningMessage("Rotate Your Device");
          return;
        }
      } else {
        if (window.innerHeight < 320) {
          setShowRotateWarning(true);
          setWarningMessage("Screen height too small. Try entering Fullscreen mode.");
          return;
        }
      }
      setShowRotateWarning(false);
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('orientationchange', checkSize);
    
    return () => {
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('orientationchange', checkSize);
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;
    try {
      // Safely load adaptive difficulty if available
      const { getAllDrillTiers } = require("../../../lib/adaptiveDifficulty");
      setDrillTiers(getAllDrillTiers());
    } catch (e) {}
  }, [isClient]);

  const handleDismissNotice = () => {
    sessionStorage.setItem('fps_beta_notice_shown', 'true');
    setShowBetaNotice(false);
  };

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
    "itemListElement": fpsCategories.flatMap(cat => 
      cat.drills.map(drill => ({
        ...drill,
        categoryFolder: cat.folderName
      }))
    ).map((drill, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "WebApplication",
        "name": drill.name,
        "url": `https://skilldrills.online/drills/${drill.categoryFolder}/${drill.folderName}`,
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

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-red-500/30 selection:text-red-300 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.45)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.45)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* BETA / DESKTOP REQUIREMENT MODAL (Session-based) */}
      {showBetaNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0b101e] border border-red-500/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_40px_rgba(239,68,68,0.2)] relative overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white mb-5 flex items-center gap-3 font-mono tracking-tight uppercase">
              <AlertTriangle className="text-red-500 w-7 h-7 shrink-0" />
              Notice / Beta Phase
            </h2>
            
            <div className="space-y-4 text-sm text-slate-300 mb-8">
              <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl">
                <Monitor className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p><strong>Desktop/Laptop Only:</strong> FPS Aim Drills heavily rely on hardware pointer-lock and raw mouse inputs. They will not function correctly on mobile devices. Please use a PC.</p>
              </div>

              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p><strong>Testing Phase:</strong> The platform is currently in testing. Due to lack of extensive testing facilities, you might encounter some timing discrepancies or physics bugs.</p>
              </div>

              <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
                <MessageSquare className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <p><strong>We Need Your Feedback:</strong> Sorry if you encounter any issues! Please cooperate and inform me via Instagram or Facebook (links in the footer below). Your feedback is vital.</p>
              </div>

              <div className="flex items-start gap-3 bg-purple-500/10 border border-purple-500/20 p-3 rounded-xl">
                <Lightbulb className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <p><strong>Request a Specific Drill:</strong> Want a custom FPS scenario? If there is a specific aim routine you'd like to see added, reach out to me on social media through the footer!</p>
              </div>
            </div>
            
            <button 
              onClick={handleDismissNotice}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-orange-600 hover:brightness-110 text-white font-black rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest text-sm"
            >
              I Understand, Let's Train
            </button>
          </div>
        </div>
      )}

      {/* Mobile Rotate Device Warning Overlay */}
      {showRotateWarning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-6" aria-hidden="true">
          <div className="animate-bounce mb-4 text-blue-500">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{warningMessage}</h3>
          <p className="text-sm text-gray-400 mb-6">Please use landscape orientation or fullscreen mode for the best training experience.</p>
          <Link href="/drills">
            <button className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </Link>
        </div>
      )}

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
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">🔫 VALORANT</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">💣 CS2_AIM</span>
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
                <li className="flex items-start gap-1"><span className="text-red-500">•</span> Target Swarm (2 runs)</li>
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
              <div className="text-2xl mb-2">🖐️</div>
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

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 flex-wrap mt-8 mb-4">
          <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="X / Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
          <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg></a>
        </div>
      </div>
    </div>
  );
}