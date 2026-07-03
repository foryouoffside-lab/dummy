'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  Zap, 
  Eye, 
  Target, 
  Activity, 
  Home, 
  ChevronRight, 
  ShieldAlert, 
  Sparkles, 
  Cpu, 
  Award,
  Play
} from 'lucide-react';

export default function ReactionSpeedDrillsClient() {
  const [isClient, setIsClient] = useState(false);

  // Calibration Widget States
  const [calibrationActive, setCalibrationActive] = useState(false);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [spawnTime, setSpawnTime] = useState<number | null>(null);
  const [reactions, setReactions] = useState<{ latency: number; accuracy: number }[]>([]);
  const [targetsCleared, setTargetsCleared] = useState(0);
  const [avgReaction, setAvgReaction] = useState<number | null>(null);
  const [saccadicScore, setSaccadicScore] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const reactiveDrills = [
    { 
      id: 3, 
      name: 'Saccadic Gallery', 
      folderName: 'saccadic-gallery', 
      category: 'Reaction Speed', 
      subcategory: 'reaction-speed', 
      difficulty: 'Intermediate', 
      duration: '60s', 
      description: 'Sequence-based ballistic eye shifts. Click glowing targets flashing in a zig-zag gallery pattern.', 
      enabled: true 
    },
    { 
      id: 4, 
      name: 'Saccadic Reaction Simulator', 
      folderName: 'reaction-simulator', 
      category: 'Reaction Speed', 
      subcategory: 'reaction-speed', 
      difficulty: 'Intermediate', 
      duration: '60s', 
      description: 'Track and click falling targets along parallel lanes to calibrate vertical reaction limits.', 
      enabled: true 
    },
    { 
      id: 5, 
      name: 'Reaction Time Test', 
      folderName: 'reaction-time-test', 
      category: 'Reaction Speed', 
      subcategory: 'reaction-speed', 
      difficulty: 'Beginner', 
      duration: '60s', 
      description: 'Calibrate focus acquisition with target points snapping randomly across the viewport. Tap fast!', 
      enabled: true 
    },
    { 
      id: 16, 
      name: 'FPS Tracking Trainer', 
      folderName: 'fps-tracking-trainer', 
      category: 'Reaction Speed', 
      subcategory: 'reaction-speed', 
      difficulty: 'Advanced', 
      duration: '60s', 
      description: 'Stabilize gaze and click targets executing erratic, human-like horizontal strafes.', 
      enabled: true 
    },
    { 
      id: 19, 
      name: 'Barrier Sequence Pursuit', 
      folderName: 'barrier-sequence-pursuit', 
      category: 'Reaction Speed', 
      subcategory: 'reaction-speed', 
      difficulty: 'Advanced', 
      duration: '60s', 
      description: 'Acquire and click targets flashing behind sequential barrier gates at 4 corners.', 
      enabled: true 
    },
    { 
      id: 20, 
      name: 'Market Doors Pursuit', 
      folderName: 'market-doors-pursuit', 
      category: 'Reaction Speed', 
      subcategory: 'reaction-speed', 
      difficulty: 'Advanced', 
      duration: '60s', 
      description: 'Train horizontal saccadic sweeps by clicking targets that flash behind 5 centered doors.', 
      enabled: true 
    },
    { 
      id: 26, 
      name: 'Visual Tracking Speed Test', 
      folderName: 'visual-tracking-speed-test', 
      category: 'Reaction Speed', 
      subcategory: 'reaction-speed', 
      difficulty: 'Advanced', 
      duration: '60s', 
      description: 'Click target slides that undergo sudden high-speed burst dash accelerations.', 
      enabled: true 
    },
    { 
      id: 27, 
      name: 'Reflex Training Drill', 
      folderName: 'reflex-training-drill', 
      category: 'Reaction Speed', 
      subcategory: 'reaction-speed', 
      difficulty: 'Advanced', 
      duration: '60s', 
      description: 'Click a target that rests in position and executes rapid ease-out dashes to random locations.', 
      enabled: true 
    }
  ];

  const getDifficultyStyles = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

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
    const x = Math.floor(Math.random() * 70) + 15;
    const y = Math.floor(Math.random() * 70) + 15;
    setTargetPos({ x, y });
    setSpawnTime(performance.now());
  };

  const handleTargetClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!calibrationActive || !spawnTime) return;
    
    const clickTime = performance.now();
    const latency = Math.round(clickTime - spawnTime);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const targetXPixel = (rect.width * targetPos.x) / 100;
    const targetYPixel = (rect.height * targetPos.y) / 100;
    
    const dist = Math.sqrt(Math.pow(clickX - targetXPixel, 2) + Math.pow(clickY - targetYPixel, 2));
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

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-400 font-mono tracking-widest uppercase animate-pulse">Initializing Reflex Gateway...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-amber-500/30">
      
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-slate-955 to-slate-955 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.4)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.4)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-mono">
            <li>
              <Link href="/" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Home className="w-4 h-4" />
                <span>HQ</span>
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-slate-600" /></li>
            <li>
              <Link href="/drills" className="hover:text-amber-400 transition-colors">
                DRILLS
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-slate-600" /></li>
            <li>
              <span className="text-amber-400 font-semibold uppercase tracking-wider" aria-current="page">
                REACTION SPEED
              </span>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#0e1629]/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/20 border border-amber-500/30 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.15)] shrink-0">
                <Zap className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md uppercase">
                    Reflex Lab
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-md uppercase">
                    Mobile First
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Reaction Speed Drills
                </h1>
                <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Train your cognitive response time, visual reflex speed, foveal clicks, and precision tapping with 8 adaptive, touch-optimized reflex drills.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto font-mono text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-center">
                <p className="text-slate-500 uppercase tracking-widest">DRILL_CAPACITY</p>
                <p className="text-xl font-bold text-amber-400 mt-1">8</p>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-center">
                <p className="text-slate-500 uppercase tracking-widest">INTERACTION</p>
                <p className="text-xl font-bold text-orange-400 mt-1">ACTIVE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reflex Calibrator Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="lg:col-span-2 relative p-6 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Reflex Speed Test Calibrator
                </h2>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Latency &amp; Click Precision
              </span>
            </div>

            {/* Target Area Canvas */}
            <div 
              onClick={handleTargetClick}
              className={`relative h-64 bg-slate-950 border border-slate-900 rounded-xl overflow-hidden cursor-crosshair transition-all duration-300 ${
                calibrationActive ? 'border-amber-500/20' : 'hover:border-slate-800'
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-850 font-mono text-xl select-none pointer-events-none">
                +
              </div>

              {/* Calibration Start Button Overlay */}
              {!calibrationActive && countdown === null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 z-20 p-4 text-center">
                  <Zap className="w-10 h-10 text-amber-400/80 mb-3 animate-pulse" />
                  <p className="text-sm font-semibold text-slate-200 max-w-sm mb-4">
                    Test visual reflex speed by tapping 5 peripheral targets as fast as possible.
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      startCalibration();
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-mono text-xs tracking-wider uppercase font-bold rounded-lg transition shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  >
                    Initiate Calibration
                  </button>
                </div>
              )}

              {/* Countdown Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/95 z-20">
                  <div className="text-center">
                    <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">Target Locking</p>
                    <p className="text-4xl font-extrabold text-white animate-ping">{countdown}</p>
                  </div>
                </div>
              )}

              {/* Glowing Target Node */}
              {calibrationActive && (
                <button
                  className="absolute w-8 h-8 -ml-4 -mt-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center transition-all duration-75 border-2 border-white/40 shadow-[0_0_15px_rgba(245,158,11,0.8)] z-10"
                  style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
                >
                  <span className="w-2.5 h-2.5 bg-white rounded-full block animate-ping" />
                </button>
              )}
            </div>

            {/* Target Area Status Footer */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${calibrationActive ? 'bg-amber-500 animate-pulse' : 'bg-slate-700'}`} />
                {calibrationActive ? `TARGET ${targetsCleared + 1} / 5 ACTIVE` : 'MODULE STANDBY'}
              </span>
              <span>REFLEX SCAN CALIBRATOR V1.5</span>
            </div>
          </div>

          {/* Telemetry Metrics Panel */}
          <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Calib_Telemetry
                </h3>
                <Activity className="w-4 h-4 text-amber-400" />
              </div>

              {avgReaction !== null ? (
                <div className="space-y-5 py-2">
                  <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                    <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">Reaction Latency</p>
                    <p className="text-3xl font-extrabold text-white mt-1">
                      {avgReaction} <span className="text-sm font-normal text-slate-400">ms</span>
                    </p>
                  </div>

                  <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl">
                    <p className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Tap Click Precision</p>
                    <p className="text-3xl font-extrabold text-white mt-1">
                      {saccadicScore}%
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-400">System Rating:</span>
                    <span className="text-amber-400 font-bold uppercase">
                      {avgReaction < 200 ? 'Lightning Reflex' : avgReaction < 300 ? 'Intermediate' : 'Standard'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500">
                  <ShieldAlert className="w-8 h-8 text-slate-700 mb-2 animate-bounce" />
                  <p className="text-xs font-mono">No calibration metrics loaded.</p>
                  <p className="text-[10px] text-slate-650 mt-1 max-w-[200px]">Run the reflex check module to benchmark visual clicking speed.</p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-900 pt-4 mt-4">
              <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                Reaction tests assess your speed to tap spawning targets. Training in active grids speeds foveal acquisition and cognitive trigger processing.
              </p>
            </div>
          </div>
        </div>

        {/* ============ REACTIVE DRILLS SECTION ============ */}
        <div className="space-y-12">
          <div className="relative">
            <div className="flex items-center justify-between mb-6 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-amber-500 to-orange-600" />
                <Zap className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white tracking-wide font-mono uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  Reflex Speed Training Drills
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400 font-bold">
                  8 DRILLS
                </span>
              </div>
              <span className="text-[10px] font-mono hidden sm:inline-block tracking-widest text-amber-400">
                SECTOR // ACTIVE_REACTION
              </span>
            </div>

            {/* Reactive Drills Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {reactiveDrills.map((drill) => {
                const drillPath = `/drills/reaction-speed/${drill.folderName}`;
                
                return (
                  <Link
                    key={drill.id}
                    href={drillPath}
                    className="group relative bg-slate-950/80 border border-slate-900 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  >
                    <div className="p-6">
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                          <Zap className="w-5 h-5" />
                        </div>
                        <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold rounded-full border uppercase tracking-wider ${getDifficultyStyles(drill.difficulty)}`}>
                          {drill.difficulty}
                        </span>
                      </div>

                      {/* Drill details */}
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors mb-2 font-mono uppercase tracking-wide">
                        {drill.name}
                      </h3>
                      
                      <p className="text-xs text-slate-400 leading-relaxed min-h-[48px] mb-6">
                        {drill.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-slate-900/60 pt-4 text-[10px] font-mono text-slate-500">
                        <span className="flex items-center gap-1.5 uppercase font-bold text-amber-400 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded">
                          <Clock className="w-3.5 h-3.5" />
                          {drill.duration}
                        </span>
                        <span className="flex items-center gap-1 group-hover:text-amber-400 transition-colors uppercase font-bold text-[10px]">
                          LOAD ENGINE
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 border-t border-slate-900 pt-6">
          <Link 
            href="/drills"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to All Sectors
          </Link>
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
