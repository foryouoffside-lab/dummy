'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  Zap, 
  Star, 
  Play, 
  Eye, 
  Target, 
  Activity, 
  Home, 
  ChevronRight, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  Cpu, 
  Crosshair,
  Award
} from 'lucide-react';

export default function VisualDrillsClient() {
  const [isClient, setIsClient] = useState(false);

  // Calibration Widget States
  const [calibrationActive, setCalibrationActive] = useState(false);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [spawnTime, setSpawnTime] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [targetsCleared, setTargetsCleared] = useState(0);
  const [avgReaction, setAvgReaction] = useState(null);
  const [saccadicScore, setSaccadicScore] = useState(null);
  const [countdown, setCountdown] = useState(null);

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
    { id: 11, name: 'Visual Search', folderName: 'visual-search', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Advanced', duration: '60s', description: 'Find the letter C among 160 O distractors in a 16x10 grid. +1 per find, -1 wrong.', enabled: true },
    { id: 12, name: 'Entropic Grid', folderName: 'entropic-grid', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Advanced', duration: '90s', description: 'Find the 2-char target in a 10x10 grid. Cells randomly corrupt every 800ms. Stamina system with 90s challenge.', enabled: true },
    { id: 13, name: 'Rhythm Anomaly', folderName: 'rhythm-anomaly', category: 'Visual Recognition', subcategory: 'visual-recognition', difficulty: 'Advanced', duration: '90s', description: 'Find the faster-pulsing cell (1.4s) among steady cells (2s) in a 6x6 grid. Stamina system.', enabled: true },
    
    // Depth Perception Drills
    { id: 14, name: 'Distance Judgment Lab', folderName: 'distance-judgment', category: 'Depth Perception', subcategory: 'depth-perception', difficulty: 'Intermediate', duration: '60s', description: 'Intercept a moving sphere at the target depth. Perfect <5%, Close <15%, Far ≥15% error.', enabled: true },
  ];

  const categories = ['Reaction Speed', 'Tracking Accuracy', 'Peripheral Vision', 'Visual Recognition', 'Depth Perception'];

  const getDifficultyStyles = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryStyles = (category) => {
    switch(category) {
      case 'Reaction Speed': return {
        glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)] border-blue-500/30',
        gradient: 'from-blue-500 to-indigo-600',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        badge: 'bg-blue-500/20 text-blue-300'
      };
      case 'Tracking Accuracy': return {
        glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)] border-cyan-500/30',
        gradient: 'from-cyan-500 to-blue-600',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        badge: 'bg-cyan-500/20 text-cyan-300'
      };
      case 'Peripheral Vision': return {
        glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)] border-purple-500/30',
        gradient: 'from-purple-500 to-pink-600',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        badge: 'bg-purple-500/20 text-purple-300'
      };
      case 'Visual Recognition': return {
        glow: 'shadow-[0_0_15px_rgba(236,72,153,0.15)] border-pink-500/30',
        gradient: 'from-pink-500 to-rose-600',
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        badge: 'bg-pink-500/20 text-pink-300'
      };
      case 'Depth Perception': return {
        glow: 'shadow-[0_0_15px_rgba(14,165,233,0.15)] border-sky-500/30',
        gradient: 'from-sky-500 to-cyan-600',
        text: 'text-sky-400',
        bg: 'bg-sky-500/10',
        badge: 'bg-sky-500/20 text-sky-300'
      };
      default: return {
        glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)] border-blue-500/30',
        gradient: 'from-blue-500 to-indigo-600',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        badge: 'bg-blue-500/20 text-blue-300'
      };
    }
  };

  // Calibration Logic
  const startCalibration = () => {
    setCountdown(3);
    setReactions([]);
    setTargetsCleared(0);
    setAvgReaction(null);
    setSaccadicScore(null);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCountdown(null);
      setCalibrationActive(true);
      spawnNextTarget();
    }
  }, [countdown]);

  const spawnNextTarget = () => {
    const x = Math.floor(Math.random() * 70) + 15; // keep inside boundaries
    const y = Math.floor(Math.random() * 70) + 15;
    setTargetPos({ x, y });
    setSpawnTime(performance.now());
  };

  const handleTargetClick = (e) => {
    if (!calibrationActive || !spawnTime) return;
    
    const clickTime = performance.now();
    const latency = Math.round(clickTime - spawnTime);
    
    // Calculate click precision relative to the target container
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const targetXPixel = (rect.width * targetPos.x) / 100;
    const targetYPixel = (rect.height * targetPos.y) / 100;
    
    const dist = Math.sqrt(Math.pow(clickX - targetXPixel, 2) + Math.pow(clickY - targetYPixel, 2));
    
    // Center accuracy (100% on target center, dropping to 0% at 30px off-center)
    const accuracy = Math.max(0, Math.round(100 - (dist * 3.33)));
    
    const updatedReactions = [...reactions, { latency, accuracy }];
    setReactions(updatedReactions);
    
    const nextCount = targetsCleared + 1;
    setTargetsCleared(nextCount);
    
    if (nextCount >= 5) {
      setCalibrationActive(false);
      const avgLat = Math.round(updatedReactions.reduce((sum, r) => sum + r.latency, 0) / updatedReactions.length);
      const avgAcc = Math.round(updatedReactions.reduce((sum, r) => sum + r.accuracy, 0) / updatedReactions.length);
      setAvgReaction(avgLat);
      setSaccadicScore(avgAcc);
    } else {
      spawnNextTarget();
    }
  };

  const totalDrills = drills.filter(d => d.enabled).length;

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-mono tracking-widest uppercase animate-pulse">Initializing Neural Gateway...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-cyan-500/30">
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
      
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.4)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.4)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-mono">
            <li>
              <Link href="/" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Home className="w-4 h-4" />
                <span>HQ</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-slate-600" /></li>
            <li>
              <Link href="/drills" className="hover:text-cyan-400 transition-colors">
                DRILLS
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-slate-600" /></li>
            <li>
              <span className="text-cyan-400 font-semibold uppercase tracking-wider" aria-current="page">
                VISUAL SYSTEM
              </span>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#0e1629]/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/20 border border-cyan-500/30 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.15)] shrink-0">
                <Eye className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-md uppercase">
                    Cognitive Hub
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-md uppercase">
                    Esports Grade
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Visual Training System
                </h1>
                <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Calibrate and overclock your foveal detection, tracking speed, and spatial awareness with 14 professional neural conditioning drills.
                </p>
              </div>
            </div>
            
            {/* Visual Quick Stats */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto font-mono text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-center">
                <p className="text-slate-500 uppercase tracking-widest">DRIL_CAPACITY</p>
                <p className="text-xl font-bold text-cyan-400 mt-1">{totalDrills}</p>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-center">
                <p className="text-slate-500 uppercase tracking-widest">PERC_SECTORS</p>
                <p className="text-xl font-bold text-blue-400 mt-1">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Neural & Saccadic Calibrator Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="lg:col-span-2 relative p-6 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Saccadic Calibration Module
                </h2>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                System Latency & Scan Precision
              </span>
            </div>

            {/* Target Area Canvas */}
            <div 
              onClick={handleTargetClick}
              className={`relative h-64 bg-slate-950 border border-slate-900 rounded-xl overflow-hidden cursor-crosshair transition-all duration-300 ${
                calibrationActive ? 'border-cyan-500/20' : 'hover:border-slate-800'
              }`}
            >
              {/* Grid Overlay Lines */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-10 pointer-events-none">
                <div className="border border-slate-700" />
                <div className="border border-slate-700" />
                <div className="border border-slate-700" />
                <div className="border border-slate-700" />
                <div className="border border-slate-700" />
                <div className="border border-slate-700" />
                <div className="border border-slate-700" />
                <div className="border border-slate-700" />
                <div className="border border-slate-700" />
              </div>

              {/* Fixation Cross (Center) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-800 font-mono text-xl select-none pointer-events-none">
                +
              </div>

              {/* Calibration Start Button Overlay */}
              {!calibrationActive && countdown === null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 z-20 p-4 text-center">
                  <Eye className="w-10 h-10 text-cyan-400/80 mb-3 animate-pulse" />
                  <p className="text-sm font-semibold text-slate-200 max-w-sm mb-4">
                    Test visual saccadic speed by tapping 5 peripheral targets as fast as possible.
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      startCalibration();
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs tracking-wider uppercase font-bold rounded-lg transition shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    Initiate Calibration
                  </button>
                </div>
              )}

              {/* Countdown Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/95 z-20">
                  <div className="text-center">
                    <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">Target Locking</p>
                    <p className="text-4xl font-extrabold text-white animate-ping">{countdown}</p>
                  </div>
                </div>
              )}

              {/* Glowing Target Node */}
              {calibrationActive && (
                <button
                  className="absolute w-8 h-8 -ml-4 -mt-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center transition-all duration-75 border-2 border-white/40 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10"
                  style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
                >
                  <span className="w-2.5 h-2.5 bg-white rounded-full block animate-ping" />
                </button>
              )}
            </div>

            {/* Target Area Status Footer */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${calibrationActive ? 'bg-cyan-500 animate-pulse' : 'bg-slate-700'}`} />
                {calibrationActive ? `TARGET ${targetsCleared + 1} / 5 ACTIVE` : 'MODULE STANDBY'}
              </span>
              <span>FOV SCAN CALIBRATOR V1.2</span>
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Calib_Telemetry
                </h3>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>

              {avgReaction !== null ? (
                <div className="space-y-5 py-2">
                  <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-xl">
                    <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Saccadic Latency</p>
                    <p className="text-3xl font-extrabold text-white mt-1">
                      {avgReaction} <span className="text-sm font-normal text-slate-400">ms</span>
                    </p>
                  </div>

                  <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                    <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Saccadic Click Precision</p>
                    <p className="text-3xl font-extrabold text-white mt-1">
                      {saccadicScore}%
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-400">System Rating:</span>
                    <span className="text-cyan-400 font-bold uppercase">
                      {avgReaction < 200 ? 'Cyber-Reflex' : avgReaction < 300 ? 'High Tier' : 'Standard'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500">
                  <ShieldAlert className="w-8 h-8 text-slate-700 mb-2 animate-bounce" />
                  <p className="text-xs font-mono">No calibration metrics loaded.</p>
                  <p className="text-[10px] text-slate-600 mt-1 max-w-[200px]">Run the saccadic check module to benchmark visual speed.</p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-900 pt-4 mt-4">
              <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                Saccades are rapid, conjugate eye movements between fixation points. In esports, optimizing visual saccade response leads to instant target re-acquisition and heightened peripheral responsiveness.
              </p>
            </div>
          </div>

        </div>

        {/* Sectors Grid */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryDrills = drills.filter(d => d.category === category && d.enabled);
            if (categoryDrills.length === 0) return null;
            
            const styles = getCategoryStyles(category);

            return (
              <div key={category} className="relative">
                
                {/* Sector Header */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-900 pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${styles.gradient}`} />
                    <h2 className="text-lg font-bold text-white tracking-wide font-mono uppercase">
                      {category}
                    </h2>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {categoryDrills.length} DRILL{categoryDrills.length > 1 ? 'S' : ''}
                    </span>
                  </div>
                  
                  <span className={`text-[10px] font-mono hidden sm:inline-block tracking-widest ${styles.text}`}>
                    SECTOR // {category.toUpperCase().replace(' ', '_')}
                  </span>
                </div>

                {/* Drills Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryDrills.map((drill) => {
                    const drillPath = `/drills/visual/${drill.subcategory}/${drill.folderName}`;
                    
                    return (
                      <Link
                        key={drill.id}
                        href={drillPath}
                        className={`group relative bg-slate-950/80 border border-slate-900 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 ${styles.glow} focus:outline-none focus:ring-1 focus:ring-cyan-500/50`}
                        aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                      >
                        <div className="p-6">
                          
                          {/* Card Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${styles.bg}`}>
                              <Eye className={`w-5 h-5 ${styles.text}`} />
                            </div>
                            <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border ${getDifficultyStyles(drill.difficulty)}`}>
                              {drill.difficulty}
                            </span>
                          </div>

                          {/* Drill Meta details */}
                          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                            {drill.name}
                          </h3>
                          
                          <p className="text-xs text-slate-400 leading-relaxed min-h-[48px] mb-4">
                            {drill.description}
                          </p>

                          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono mb-4 border-b border-slate-900 pb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{drill.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity className="w-3.5 h-3.5" />
                              <span>Stamina Mode</span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-600 font-mono tracking-wider uppercase">
                              Start Training
                            </span>
                            <div className={`flex items-center gap-1 ${styles.text} text-xs font-mono font-bold group-hover:gap-2 transition-all`}>
                              <span>EXEC_DRILL</span>
                              <Play className="w-3 h-3 fill-current" />
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
        </div>

        {/* Dynamic Warning Alert banner */}
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

        {/* Visual Training Tips Panel */}
        <div className="mt-16 p-8 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-xl font-extrabold text-white mb-6 flex items-center gap-2 tracking-wide font-mono">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            VISUAL PERFORMANCE STRATEGIES
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-900 hover:border-slate-800 transition">
              <h4 className="font-bold text-slate-200 mb-2 text-sm">1. Saccadic Fixation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prioritize peripheral target acquisition drills to minimize target re-fixation times. Always calibrate under stable ambient lighting.
              </p>
            </div>
            <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-900 hover:border-slate-800 transition">
              <h4 className="font-bold text-slate-200 mb-2 text-sm">2. Contrast Sensitivity</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Overloading visual search pathways with entropic grid training improves object isolation in low-contrast, chaotic game scenarios.
              </p>
            </div>
            <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-900 hover:border-slate-800 transition">
              <h4 className="font-bold text-slate-200 mb-2 text-sm">3. Dynamic Rest Cycle</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Apply the 20-20-20 technique between intense drills to prevent ciliary muscle strain and maintain high kinetic reaction rates.
              </p>
            </div>
          </div>
        </div>

        {/* Explore Related Categories Portal */}
        <div className="mt-16 mb-8 border-t border-slate-900 pt-12">
          <h2 className="text-lg font-bold text-white tracking-widest text-center font-mono uppercase mb-8">
            Explore Related Training Hubs
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            
            <Link 
              href="/drills/fps" 
              className="group p-5 bg-slate-950/80 rounded-xl border border-slate-900 hover:border-red-500/40 text-center transition-all duration-200 hover:-translate-y-1 shadow-[0_0_15px_rgba(239,68,68,0.02)]"
            >
              <div className="text-2xl mb-2 text-red-500">🎮</div>
              <h3 className="font-bold text-sm text-slate-200 group-hover:text-red-400 transition font-mono uppercase">
                FPS Training
              </h3>
              <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase">
                Sens calibration & flicks
              </p>
            </Link>

            <Link 
              href="/drills/motor" 
              className="group p-5 bg-slate-950/80 rounded-xl border border-slate-900 hover:border-emerald-500/40 text-center transition-all duration-200 hover:-translate-y-1 shadow-[0_0_15px_rgba(16,185,129,0.02)]"
            >
              <div className="text-2xl mb-2 text-emerald-500">✋</div>
              <h3 className="font-bold text-sm text-slate-200 group-hover:text-emerald-400 transition font-mono uppercase">
                Motor Skills
              </h3>
              <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase">
                Accuracy & click reflexes
              </p>
            </Link>

            <Link 
              href="/drills/cognitive" 
              className="group p-5 bg-slate-950/80 rounded-xl border border-slate-900 hover:border-purple-500/40 text-center transition-all duration-200 hover:-translate-y-1 shadow-[0_0_15px_rgba(168,85,247,0.02)]"
            >
              <div className="text-2xl mb-2 text-purple-500">🧠</div>
              <h3 className="font-bold text-sm text-slate-200 group-hover:text-purple-400 transition font-mono uppercase">
                Cognitive Hub
              </h3>
              <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase">
                Decision & priority speed
              </p>
            </Link>

            <Link 
              href="/drills/memory" 
              className="group p-5 bg-slate-950/80 rounded-xl border border-slate-900 hover:border-indigo-500/40 text-center transition-all duration-200 hover:-translate-y-1 shadow-[0_0_15px_rgba(99,102,241,0.02)]"
            >
              <div className="text-2xl mb-2 text-indigo-500">💾</div>
              <h3 className="font-bold text-sm text-slate-200 group-hover:text-indigo-400 transition font-mono uppercase">
                Memory Drills
              </h3>
              <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase">
                Spatial recall & sequences
              </p>
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