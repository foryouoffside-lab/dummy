'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Zap, Star, Play, Hand, Target, 
  MousePointer, Timer, Move, Gauge, Activity, 
  GitBranch, Crosshair, Droplets, Sparkles, Home, ChevronRight, Cpu
} from 'lucide-react';

export default function MotorDrillsClient() {
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Rotate Your Device");

  useEffect(() => {
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

  const [isClient, setIsClient] = useState(false);

  // Click Calibrator State
  const [calibState, setCalibState] = useState("idle"); // idle, playing, finished
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Aim coordinate pointer track background animation
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

    let mouse = { x: -100, y: -100 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle tracer dots
    const trail = [];
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update trail
      if (mouse.x > 0 && mouse.y > 0) {
        trail.push({ x: mouse.x, y: mouse.y, age: 0 });
      }
      if (trail.length > 20) trail.shift();

      // Draw cursor reticle coordinate crosshairs
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, canvas.height);
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(canvas.width, mouse.y);
        ctx.stroke();

        ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw trail dots
      trail.forEach((p) => {
        p.age += 1;
        const opacity = Math.max(0, 1 - p.age / 20) * 0.15;
        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isClient]);

  const startCalibrator = () => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    setCalibState("playing");
    setScore(0);
    setClicks(0);
    setTimeLeft(10);
    moveTarget();
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCalibState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const moveTarget = () => {
    const randomX = Math.floor(Math.random() * 80) + 10; // 10% to 90%
    const randomY = Math.floor(Math.random() * 80) + 10;
    setTargetPos({ x: randomX, y: randomY });
  };

  const handleContainerClick = () => {
    if (calibState === "playing") {
      setClicks((prev) => prev + 1);
    }
  };

  const handleTargetClick = (e) => {
    e.stopPropagation();
    if (calibState === "playing") {
      setScore((prev) => prev + 1);
      setClicks((prev) => prev + 1);
      moveTarget();
    }
  };

  // Categories with exact folder names
  const categories = [
    { 
      name: 'Hand-Eye Coordination', 
      folderName: 'hand-eye-coordination',
      icon: MousePointer,
      color: 'emerald',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      textColor: 'text-emerald-400',
      description: 'Train aim, click accuracy, and drag-and-drop precision',
      drills: [
        { name: 'Aim Trainer', folderName: 'aim-trainer', difficulty: 'Hard', duration: '60s', description: 'Dynamic targets that shrink with streak and lives system' },
        { name: 'Click Accuracy', folderName: 'click-accuracy', difficulty: 'Medium', duration: '60s', description: 'Single teleporting target with shrinking size on streak' },
        { name: 'Drag and Drop', folderName: 'drag-and-drop', difficulty: 'Easy', duration: '60s', description: 'Drag ball into ring within 3s with teleporting positions' }
      ]
    },
    { 
      name: 'Timing Accuracy', 
      folderName: 'timing-accuracy',
      icon: Timer,
      color: 'purple',
      bgColor: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      textColor: 'text-purple-400',
      description: 'Develop precise timing, rhythm, and synchronization',
      drills: [
        { name: 'Rhythm Tap', folderName: 'rhythm-tap', difficulty: 'Medium', duration: '60s', description: 'Tap in sync with a dynamic BPM pulse (50-140 range)' },
        { name: 'Stopwatch Click', folderName: 'stopwatch-click', difficulty: 'Hard', duration: '60s', description: 'Click at exact memorized target time (1-8 seconds)' },
        { name: 'Synchronization', folderName: 'synchronization', difficulty: 'Expert', duration: '60s', description: 'Click when converging bars align at center line' }
      ]
    },
    { 
      name: 'Precision Control', 
      folderName: 'precision-control',
      icon: Crosshair,
      color: 'orange',
      bgColor: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
      textColor: 'text-orange-400',
      description: 'Master fine motor skills and precise cursor movements',
      drills: [
        { name: 'Steady Hand', folderName: 'steady-hand', difficulty: 'Hard', duration: '60s', description: 'Trace a winding path corridor with shrinking width on streak' },
        { name: 'Fine Motor', folderName: 'fine-motor', difficulty: 'Medium', duration: '60s', description: 'Track a scrolling wave path through Dynamic and Extreme phases' },
        { name: 'Tracing', folderName: 'tracing', difficulty: 'Medium', duration: '60s', description: 'Follow a red wave filament with auto-pause and resume' }
      ]
    },
    { 
      name: 'Movement Speed', 
      folderName: 'movement-speed',
      icon: Gauge,
      color: 'green',
      bgColor: 'bg-green-500/10 border-green-500/20 text-green-400',
      textColor: 'text-green-400',
      description: 'Increase movement speed, sequencing, and gesture velocity',
      drills: [
        { name: 'Rapid Tapping', folderName: 'rapid-tapping', difficulty: 'Easy', duration: 'Untimed', description: 'Endless survival clicking with escalating difficulty' },
        { name: 'Finger Sequencing', folderName: 'finger-sequencing', difficulty: 'Medium', duration: '60s', description: 'Click 3 nodes from largest to smallest with 2s timer' },
        { name: 'Gesture Speed', folderName: 'gesture-speed', difficulty: 'Medium', duration: '60s', description: 'Flick to gate within 350ms then return to center' }
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
      case 'Hand-Eye Coordination': return 'from-emerald-500 to-cyan-500';
      case 'Timing Accuracy': return 'from-purple-500 to-violet-500';
      case 'Precision Control': return 'from-orange-500 to-red-500';
      case 'Movement Speed': return 'from-green-500 to-emerald-500';
      default: return 'from-emerald-500 to-green-500';
    }
  };

  const getCategoryCardBorder = (category) => {
    switch(category) {
      case 'Hand-Eye Coordination': return 'hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]';
      case 'Timing Accuracy': return 'hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]';
      case 'Precision Control': return 'hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]';
      case 'Movement Speed': return 'hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]';
      default: return 'hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]';
    }
  };

  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-400 font-mono tracking-widest uppercase animate-pulse">Initializing Motor Circuits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />
      <canvas style={{ touchAction: 'none' }} ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.45)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.45)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* SEO structured schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Motor Skills Drills - Hand-Eye Coordination, Timing, Precision & Speed",
            "url": "https://skilldrills.online/drills/motor",
            "description": "12 free motor skills training drills covering Hand-Eye Coordination, Timing Accuracy, Precision Control, and Movement Speed. Improve mouse aim, timing, steady hand, and reaction speed.",
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Motor Skill Training" },
            "numberOfItems": 12,
            "itemListElement": categories.flatMap(cat => cat.drills).map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/motor/${cat.folderName}/${drill.folderName}`,
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
              <Link href="/" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><Link href="/drills" className="hover:text-emerald-400 transition-colors">Drills</Link></li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><span className="text-emerald-400 font-bold" aria-current="page">Motor Sector</span></li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-inner shrink-0">
              <Hand className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Activity className="w-3 h-3 animate-pulse" />
                HAND-EYE KINEMATICS HQ
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Motor Sector</h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                Refine micro-aim adjustments, drag mechanics, target intercept precision, and click cadence ratios.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start md:self-center">
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">🎯 ACC_LOCK</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">🖱️ VELOCITY</span>
          </div>
        </div>

        {/* Telemetry Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center lg:text-left backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">DRIL_CHANNELS</span>
                <Cpu className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-4xl font-extrabold text-white tracking-tight">{totalDrills}</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Calibrators Standing By</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-900 text-xs text-slate-400 leading-relaxed font-mono">
              Trajectory sensors record path deviations to calculate raw-input mouse timing scores.
            </div>
          </div>

          {/* Aim precision clicker widget */}
          <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3 text-emerald-400 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Crosshair className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Aim click accuracy calibrator</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">SEC_REMAIN: {timeLeft}s</span>
            </div>

            <div 
              ref={containerRef}
              onClick={handleContainerClick}
              className="flex-1 flex flex-col items-center justify-center min-h-[140px] rounded-xl border border-slate-900 bg-slate-950 relative overflow-hidden cursor-crosshair"
            >
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
          <Link href="/drills/motor">
            <button className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </Link>
        </div>
      )}

              {calibState === "idle" && (
                <div className="text-center z-10 p-4">
                  <p className="text-xs font-mono text-slate-400 mb-3">Benchmark your click accuracy in 10s sprint.</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      startCalibrator();
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-mono text-xs uppercase tracking-wider font-bold px-5 py-2 rounded-lg transition shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    Initiate Aim Sprint
                  </button>
                </div>
              )}

              {calibState === "playing" && (
                <button
                  onClick={handleTargetClick}
                  className="absolute w-6 h-6 -ml-3 -mt-3 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_10px_rgba(16,185,129,0.8)] z-10"
                  style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
                >
                  <span className="w-2 h-2 bg-white rounded-full block animate-ping" />
                </button>
              )}

              {calibState === "finished" && (
                <div className="text-center z-10 p-4">
                  <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">CALIBRATION COMPLETE</p>
                  <p className="text-sm text-slate-300 mb-3">Target hits: {score} // Accuracy: {clicks > 0 ? Math.round((score / clicks) * 100) : 0}%</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      startCalibrator();
                    }}
                    className="bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-mono text-[10px] uppercase tracking-wider px-4 py-2 rounded-lg transition"
                  >
                    Restart
                  </button>
                </div>
              )}
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
                    href={`/drills/motor/${category.folderName}/${drill.folderName}`} 
                    className={`group relative overflow-hidden bg-slate-950/80 border border-slate-900 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 ${styles}`}
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
                      
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors uppercase tracking-tight font-mono">
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
                          <span>Motor Loop</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{category.name}</span>
                        <div className="flex items-center gap-1 text-emerald-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 font-mono">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            MOTOR SYSTEM IMPROVEMENT PORTALS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-sans">
            {[
              { emoji: "🖱️", title: "Target Precision", desc: "Augment fine muscle controls to hold mouse trajectories steady." },
              { emoji: "⚡", title: "Click Cadence", desc: "Train optimal finger sequencing for rapid tapping thresholds." },
              { emoji: "🎯", title: "Synchronization", desc: "Perfect coordination timing triggers on visual alignment events." },
              { emoji: "🧬", title: "Reflex Calibration", desc: "Reduce sensory-motor delay margins in dynamic intercept zones." }
            ].map((benefit, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
                <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
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
              { href: "/drills/cognitive", emoji: "🧠", title: "Cognitive Sector", desc: "Neural reaction speed" },
              { href: "/drills/productivity", emoji: "⏱️", title: "Productivity", desc: "Pomodoro focus timelines" },
              { href: "/drills/memory", emoji: "💾", title: "Memory Hub", desc: "Sequence span tests" },
              { href: "/drills/fps", emoji: "🎮", title: "Tactical Aim", desc: "Aim Flick & Smooth Pursuit" }
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href} 
                className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-200 hover:-translate-y-1 text-center"
              >
                <div className="text-2xl mb-2">{link.emoji}</div>
                <h3 className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors uppercase text-xs tracking-wider font-mono">{link.title}</h3>
                <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}