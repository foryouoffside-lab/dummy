'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Clock, Zap, Play, Dumbbell, 
  Activity, Hand, Heart,
  Home, ChevronRight, Cpu, Sparkles
} from 'lucide-react';

export default function PhysicalDrillsClient() {
  const [isClient, setIsClient] = useState(false);

  // Directional Key reflex widget state
  const [activeDir, setActiveDir] = useState(null); // 'UP', 'DOWN', 'LEFT', 'RIGHT'
  const [calibState, setCalibState] = useState("idle"); // idle, running, finished
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Energy speed pulses background animation
  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const streams = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.15 + 0.05
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      streams.forEach((s) => {
        ctx.strokeStyle = `rgba(249, 115, 22, ${s.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.length, s.y + s.length * 0.5); // diagonal speed line
        ctx.stroke();

        s.x += s.speed;
        s.y += s.speed * 0.5;

        if (s.x > canvas.width || s.y > canvas.height) {
          s.x = -s.length;
          s.y = Math.random() * canvas.height - s.length;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [isClient]);

  const startReflexTest = () => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    setCalibState("running");
    setScore(0);
    setAttempts(0);
    setTimeLeft(10);
    pickDirection();

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCalibState("finished");
          setActiveDir(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pickDirection = () => {
    const dirs = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    const rand = dirs[Math.floor(Math.random() * dirs.length)];
    setActiveDir(rand);
  };

  // Keyboard handler for arrow keys
  useEffect(() => {
    if (calibState !== "running") return;

    const handleKeyDown = (e) => {
      let pressed = null;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") pressed = 'UP';
      else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") pressed = 'DOWN';
      else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") pressed = 'LEFT';
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") pressed = 'RIGHT';

      if (pressed) {
        setAttempts((prev) => prev + 1);
        if (pressed === activeDir) {
          setScore((prev) => prev + 1);
          pickDirection();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [calibState, activeDir]);

  const handleArrowClick = (dir) => {
    if (calibState !== "running") return;
    setAttempts((prev) => prev + 1);
    if (dir === activeDir) {
      setScore((prev) => prev + 1);
      pickDirection();
    }
  };

  // Categories with exact folder names
  const categories = [
    { 
      name: 'Balance Training', 
      folderName: 'balance-training',
      icon: Activity,
      color: 'purple',
      bgColor: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      textColor: 'text-purple-400',
      description: 'Improve stability, equilibrium, and motor control',
      drills: [
        { name: 'Dynamic Balance', folderName: 'dynamic-balance', difficulty: 'Hard', duration: '60s', description: 'Track a Lissajous-trajectory target with cursor for sustained tracking points' },
        { name: 'Single Leg Hold', folderName: 'single-leg-hold', difficulty: 'Medium', duration: '60s', description: 'Maintain link with bouncing anchor point for balance stability scoring' },
        { name: 'Stability Challenge', folderName: 'stability-challenge', difficulty: 'Medium', duration: '60s', description: 'Resist wind forces to keep cursor centered with adaptive difficulty' }
      ]
    },
    { 
      name: 'Coordination', 
      folderName: 'coordination',
      icon: Hand,
      color: 'green',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      textColor: 'text-emerald-400',
      description: 'Improve bilateral coordination and motor patterning',
      drills: [
        { name: 'Complex Pattern', folderName: 'complex-pattern', difficulty: 'Hard', duration: '60s', description: 'Memorize and draw path patterns from memory with shape-based scoring' },
        { name: 'Cross Body Movement', folderName: 'cross-body-movement', difficulty: 'Medium', duration: '60s', description: 'Connect nodes across screen along straight vector paths for +5 points each' },
        { name: 'Dynamic Grid Evasion', folderName: 'dynamic-grid-evasion', difficulty: 'Hard', duration: '40s', description: 'Tactical 3x3 grid evasion game to train rapid directional muscle memory' }
      ]
    },
    { 
      name: 'Fitness', 
      folderName: 'fitness',
      icon: Heart,
      color: 'red',
      bgColor: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      textColor: 'text-rose-400',
      description: 'Build agility, speed, and precision movement skills',
      drills: [
        { name: 'Agility Ladder', folderName: 'agility-ladder', difficulty: 'Medium', duration: '60s', description: 'Step rungs Left→Right→Left→Right on scrolling ladders with adaptive speed' },
        { name: 'Jump Sequence', folderName: 'jump-sequence', difficulty: 'Hard', duration: '60s', description: 'Charge and launch ball toward targets with mid-air steering control' },
        { name: 'Speed Drill', folderName: 'speed-drill', difficulty: 'Medium', duration: '60s', description: 'Click shrinking rings before they vanish with velocity scaling to 5.0x' }
      ]
    },
    { 
      name: 'Reflex Training', 
      folderName: 'reflex-training',
      icon: Zap,
      color: 'yellow',
      bgColor: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
      textColor: 'text-yellow-400',
      description: 'Enhance reaction speed, evasion, and impulse control',
      drills: [
        { name: 'Drop Catch', folderName: 'drop-catch', difficulty: 'Easy', duration: '60s', description: 'Catch green falling balls while avoiding red decoy balls with X markers' },
        { name: 'Quick Dodge', folderName: 'quick-dodge', difficulty: 'Medium', duration: '60s', description: 'Dodge red homing obstacles with adaptive speed and fullscreen chaos mode' },
        { name: 'Reaction Chain', folderName: 'reaction-chain', difficulty: 'Hard', duration: '60s', description: 'Stop cursor on moving nodes to arrest them with no miss penalties' },
        { name: 'Visual Rhythm Intercept', folderName: 'visual-rhythm-intercept', difficulty: 'Medium', duration: '30s', description: 'DDR-style orbital timing intercept trainer utilizing rhythmic input coordination' },
        { name: 'Peripheral Threat Sweeper', folderName: 'peripheral-threat-sweeper', difficulty: 'Hard', duration: '45s', description: 'Radial perimeter sweeper to train reactive peripheral vision target acquisition' }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Hard': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Balance Training': return 'from-purple-500 to-violet-500';
      case 'Reflex Training': return 'from-amber-500 to-yellow-500';
      case 'Coordination': return 'from-emerald-500 to-green-500';
      case 'Fitness': return 'from-rose-500 to-red-500';
      default: return 'from-orange-500 to-red-500';
    }
  };

  const getCategoryCardBorder = (category) => {
    switch(category) {
      case 'Balance Training': return 'hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]';
      case 'Reflex Training': return 'hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]';
      case 'Coordination': return 'hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]';
      case 'Fitness': return 'hover:border-rose-500/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]';
      default: return 'hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]';
    }
  };

  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-orange-400 font-mono tracking-widest uppercase animate-pulse">Initializing Kinetic Core...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-300 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />
      <canvas style={{ touchAction: 'none' }} ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.45)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.45)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* SEO structured schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Physical Drills - Agility, Coordination & Balance Training",
            "url": "https://skilldrills.online/drills/physical",
            "description": "11 free interactive physical reflex, balance, and coordination training drills. No login required.",
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Physical Motor Training" },
            "numberOfItems": 11,
            "itemListElement": categories.flatMap(cat => 
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
                "url": `https://skilldrills.online/drills/physical/${drill.categoryFolder}/${drill.folderName}`,
                "description": drill.description,
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web"
              }
            }))
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <li>
              <Link href="/" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><Link href="/drills" className="hover:text-orange-400 transition-colors">Drills</Link></li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><span className="text-orange-400 font-bold" aria-current="page">Physical Sector</span></li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-400 shadow-inner shrink-0">
              <Dumbbell className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 text-orange-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Activity className="w-3 h-3 animate-pulse" />
                KINETIC REFLEX HQ
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Physical Sector</h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                Tune gross and fine motor coordination, reflex evasion speeds, and static balance stability margins.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start md:self-center">
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">⚡ REFLEX_MS</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">🏃 AGILITY</span>
          </div>
        </div>

        {/* Telemetry Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center lg:text-left backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">DRILS_LINKED</span>
                <Cpu className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-4xl font-extrabold text-white tracking-tight">{totalDrills}</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Calibrators Loaded</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-900 text-xs text-slate-400 leading-relaxed font-mono">
              Key directional inputs measure somatic reflex times and track trajectory deviations in milliseconds.
            </div>
          </div>

          {/* Arrow Key Reflex Response calibrator widget */}
          <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3 text-orange-400 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Arrow Key Reflex Response Calibrator</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">TIMER: {timeLeft}s</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="grid grid-cols-3 grid-rows-3 gap-2 w-28 h-28 shrink-0">
                <div />
                <button 
                  onClick={() => handleArrowClick('UP')}
                  className={`border font-mono font-bold text-xs rounded flex items-center justify-center transition
                    ${activeDir === 'UP' ? 'bg-orange-500 border-orange-400 text-slate-950 shadow-[0_0_15px_rgba(249,115,22,0.6)]' : 'bg-slate-950 border-slate-800 text-slate-600'}
                  `}
                >
                  ↑
                </button>
                <div />
                
                <button 
                  onClick={() => handleArrowClick('LEFT')}
                  className={`border font-mono font-bold text-xs rounded flex items-center justify-center transition
                    ${activeDir === 'LEFT' ? 'bg-orange-500 border-orange-400 text-slate-950 shadow-[0_0_15px_rgba(249,115,22,0.6)]' : 'bg-slate-950 border-slate-800 text-slate-600'}
                  `}
                >
                  ←
                </button>
                <button 
                  onClick={() => handleArrowClick('DOWN')}
                  className={`border font-mono font-bold text-xs rounded flex items-center justify-center transition
                    ${activeDir === 'DOWN' ? 'bg-orange-500 border-orange-400 text-slate-950 shadow-[0_0_15px_rgba(249,115,22,0.6)]' : 'bg-slate-950 border-slate-800 text-slate-600'}
                  `}
                >
                  ↓
                </button>
                <button 
                  onClick={() => handleArrowClick('RIGHT')}
                  className={`border font-mono font-bold text-xs rounded flex items-center justify-center transition
                    ${activeDir === 'RIGHT' ? 'bg-orange-500 border-orange-400 text-slate-950 shadow-[0_0_15px_rgba(249,115,22,0.6)]' : 'bg-slate-950 border-slate-800 text-slate-600'}
                  `}
                >
                  →
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-3">
                <p className="text-xs text-slate-400">
                  Tap the glowing arrow key on your keyboard (WASD / Arrows) or screen as fast as possible.
                </p>

                {calibState === "idle" && (
                  <button 
                    onClick={startReflexTest}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-mono text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-lg transition shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  >
                    Engage Reflex Check
                  </button>
                )}

                {calibState === "running" && (
                  <div className="font-mono text-xs text-slate-300">
                    HITS: <span className="text-orange-400 font-extrabold">{score}</span> // ACC: <span className="text-orange-400 font-extrabold">{attempts > 0 ? Math.round((score / attempts) * 100) : 100}%</span>
                  </div>
                )}

                {calibState === "finished" && (
                  <div className="space-y-2">
                    <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest">CALIBRATION COMPLETE</p>
                    <p className="text-xs text-slate-300">Total hits: {score} // Accuracy: {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%</p>
                    <button 
                      onClick={startReflexTest}
                      className="bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-mono text-[10px] uppercase tracking-wider px-4 py-2 rounded-lg transition"
                    >
                      RESTART
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {categories.map((category) => {
          const categoryDrills = category.drills;
          const styles = getCategoryCardBorder(category.name);
          const gradient = getCategoryGradient(category.name);
          const Icon = category.icon;

          return (
            <div key={category.name} className="mb-14 relative">
              
              <div className="flex items-center gap-2 mb-6 border-b border-slate-900 pb-3">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${gradient}`} />
                <h2 className="text-lg font-bold uppercase tracking-wider text-white font-mono">{category.name}</h2>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-500">
                  {categoryDrills.length} DRILL{categoryDrills.length > 1 ? 'S' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill, index) => (
                  <Link 
                    key={index} 
                    href={`/drills/physical/${category.folderName}/${drill.folderName}`} 
                    className={`group relative overflow-hidden bg-slate-950/80 border border-slate-900 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-orange-500/50 ${styles}`}
                    aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 rounded-lg border ${category.bgColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide border uppercase ${getDifficultyColor(drill.difficulty)}`}>
                          {drill.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-orange-400 transition-colors uppercase tracking-tight font-mono">
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
                          <span>Physical Loop</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{category.name}</span>
                        <div className="flex items-center gap-1 text-orange-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
                          <span>EXEC_DRILL</span>
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Benefits Grid */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 mt-12 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 font-mono">
            <Sparkles className="w-5 h-5 text-orange-400" />
            PHYSICAL PERFORMANCE IMPROVEMENT VECTORS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-sans">
            {[
              { emoji: "🧎", title: "Balance Stability", desc: "Sharpen ciliary muscular equilibrium and static stability coefficients." },
              { emoji: "⚡", title: "Reflex Velocity", desc: "Compress reaction time delay in high-speed Dodge/Catch intervals." },
              { emoji: "🌀", title: "Motor Patterning", desc: "Construct durable motor tracing pathways across complex coordinate grids." },
              { emoji: "🏃", title: "Agility Cadence", desc: "Train bilateral coordination sequencing under high velocity metrics." }
            ].map((benefit, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
                <h4 className="font-bold text-orange-400 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                  <span className="text-sm">{benefit.emoji}</span>{benefit.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Related Sectors */}
        <div className="mt-16 mb-8 border-t border-slate-900 pt-12">
          <h2 className="text-lg font-bold tracking-widest text-center text-white font-mono uppercase mb-8">Explore Adjacent Sectors</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { href: "/drills/cognitive", emoji: "🧠", title: "Cognitive Sector", desc: "Focus & reaction speed" },
              { href: "/drills/cognitive", emoji: "⏱️", title: "Productivity", desc: "Pomodoro focus timelines" },
              { href: "/drills/memory", emoji: "💾", title: "Memory Sector", desc: "Sequence span tests" },
              { href: "/drills/fps", emoji: "🎮", title: "Tactical Aim", desc: "Aim Flick & Smooth Pursuit" }
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href} 
                className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.05)] transition-all duration-200 hover:-translate-y-1 text-center"
              >
                <div className="text-2xl mb-2">{link.emoji}</div>
                <h3 className="font-bold text-slate-200 group-hover:text-orange-400 transition-colors uppercase text-xs tracking-wider font-mono">{link.title}</h3>
                <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">{link.desc}</p>
              </Link>
            ))}
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