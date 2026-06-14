'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Clock, Zap, Play, Coffee, Target, 
  GitBranch, Timer, Star, 
  Workflow, Brain, TrendingUp, Home, ChevronRight, Activity, Cpu, Sparkles
} from 'lucide-react';

export default function ProductivityDrillsClient() {
  const [isClient, setIsClient] = useState(false);

  // Pomodoro widget state
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionType, setSessionType] = useState("Work"); // Work or Break
  const timerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Workflow timeline background animation
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

    const bars = [];
    const count = 15;
    for (let i = 0; i < count; i++) {
      bars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 100 + 50,
        height: 4,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.12 + 0.04
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bars.forEach((b) => {
        ctx.fillStyle = `rgba(20, 184, 166, ${b.opacity})`;
        ctx.fillRect(b.x, b.y, b.width, b.height);

        b.y += b.speed;
        if (b.y > canvas.height) {
          b.y = -b.height;
          b.x = Math.random() * canvas.width;
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

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (sessionType === "Work") {
              setSessionType("Break");
              return 300; // 5 min
            } else {
              setSessionType("Work");
              return 1500; // 25 min
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning, sessionType]);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSessionType("Work");
    setTimeLeft(1500);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const drills = [
    {
      id: 1, 
      name: 'Context Switch Lab', 
      folderName: 'context-switch',
      category: 'Task Switching', 
      categorySlug: 'task-switching',
      difficulty: 'Medium', 
      duration: '60s',
      description: 'Rapid rule switching between parity and magnitude with 1.5s per question',
      enabled: true
    },
    { 
      id: 2, 
      name: 'Dual-Target Flow', 
      folderName: 'multi-tasking',
      category: 'Task Switching', 
      categorySlug: 'task-switching',
      difficulty: 'Hard', 
      duration: '60s',
      description: 'Track two simultaneous shape streams with different targets changing every 30s',
      enabled: true
    },
    { 
      id: 3, 
      name: 'Switch-Cost Integrator', 
      folderName: 'switch-cost',
      category: 'Task Switching', 
      categorySlug: 'task-switching',
      difficulty: 'Expert', 
      duration: '60s',
      description: 'Direct vs Opposite mode orb tracking with adaptive 1000-400ms speed',
      enabled: true
    },
    { 
      id: 4, 
      name: 'Temporal Precision', 
      folderName: 'time-estimation',
      category: 'Time Management', 
      categorySlug: 'time-management',
      difficulty: 'Medium', 
      duration: '60s',
      description: 'Pure time estimation with no visual timer - hold and release within 120ms accuracy',
      enabled: true
    },
    { 
      id: 5, 
      name: 'Pomodoro Sync', 
      folderName: 'pomodoro-timer',
      category: 'Time Management', 
      categorySlug: 'time-management',
      difficulty: 'Easy', 
      duration: 'Untimed',
      description: '25min focus / 5min break cycles with focus scoring and streak tracking',
      enabled: true
    },
    { 
      id: 6, 
      name: 'Priority Sorting', 
      folderName: 'priority-sorting',
      category: 'Time Management', 
      categorySlug: 'time-management',
      difficulty: 'Medium', 
      duration: '60s',
      description: 'Click color-coded priority targets with rules changing every 3-4 seconds',
      enabled: true
    },
    { 
      id: 7, 
      name: 'Deep Work Lab', 
      folderName: 'deep-work',
      category: 'Focus Endurance', 
      categorySlug: 'focus-endurance',
      difficulty: 'Medium', 
      duration: '60s',
      description: 'Track a moving ring with your cursor - +1pt/sec focus, -1pt distraction',
      enabled: true
    },
    { 
      id: 8, 
      name: 'Constant Prime', 
      folderName: 'concentration-stamina',
      category: 'Focus Endurance', 
      categorySlug: 'focus-endurance',
      difficulty: 'Hard', 
      duration: '60s',
      description: 'Alternating Vowels/Primes rules with adaptive 800-400ms speed',
      enabled: true
    },
    { 
      id: 9, 
      name: 'Flow Induction', 
      folderName: 'flow-state',
      category: 'Focus Endurance', 
      categorySlug: 'focus-endurance',
      difficulty: 'Expert', 
      duration: '60s',
      description: 'Track the ring to enter flow state with streak-speed scaling and double ring at 60%+',
      enabled: true
    },
    { 
      id: 10, 
      name: 'Batch Processing', 
      folderName: 'batch-processing',
      category: 'Work Efficiency', 
      categorySlug: 'work-efficiency',
      difficulty: 'Medium', 
      duration: '60s',
      description: 'Process color-coded batches in 2s windows with progressive difficulty levels',
      enabled: true
    },
  ];

  const categories = ['Task Switching', 'Time Management', 'Focus Endurance', 'Work Efficiency'];

  const getDrillPath = (drill) => {
    return `/drills/productivity/${drill.categorySlug}/${drill.folderName}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Hard': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Task Switching': return <GitBranch className="w-5 h-5" />;
      case 'Time Management': return <Timer className="w-5 h-5" />;
      case 'Focus Endurance': return <Target className="w-5 h-5" />;
      case 'Work Efficiency': return <Workflow className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getCategoryStyles = (category) => {
    switch(category) {
      case 'Task Switching': return { bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400', hover: 'group-hover:text-blue-400', gradient: 'from-blue-500 to-indigo-500', cardHover: 'hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]' };
      case 'Time Management': return { bg: 'bg-teal-500/10 border-teal-500/20 text-teal-400', hover: 'group-hover:text-teal-400', gradient: 'from-teal-500 to-cyan-500', cardHover: 'hover:border-teal-500/30 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)]' };
      case 'Focus Endurance': return { bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400', hover: 'group-hover:text-purple-400', gradient: 'from-purple-500 to-violet-500', cardHover: 'hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]' };
      case 'Work Efficiency': return { bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', hover: 'group-hover:text-emerald-400', gradient: 'from-emerald-500 to-green-500', cardHover: 'hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]' };
      default: return { bg: 'bg-slate-500/10 border-slate-500/20 text-slate-400', hover: 'group-hover:text-slate-400', gradient: 'from-slate-500 to-slate-600', cardHover: 'hover:border-slate-800' };
    }
  };

  const totalDrills = drills.filter(d => d.enabled).length;

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-teal-400 font-mono tracking-widest uppercase animate-pulse">Initializing Efficiency Module...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-300 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />

      <canvas style={{ touchAction: 'none' }} ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.45)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.45)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* SEO structured schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Productivity Drills - Focus, Time Management & Task Switching Training",
            "url": "https://skilldrills.online/drills/productivity",
            "description": "10 free interactive training drills covering Task Switching, Time Management, Focus Endurance, and Work Efficiency. Maximize deep work capacities. No login required.",
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Productivity & Focus Training" },
            "numberOfItems": 10,
            "itemListElement": drills.filter(d => d.enabled).map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/productivity/${drill.categorySlug}/${drill.folderName}`,
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
              <Link href="/" className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><Link href="/drills" className="hover:text-teal-400 transition-colors">Drills</Link></li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><span className="text-teal-400 font-bold" aria-current="page">Productivity Sector</span></li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-teal-400 shadow-inner shrink-0">
              <Clock className="w-8 h-8 text-teal-400 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal-500/15 border border-teal-500/30 text-teal-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Activity className="w-3 h-3 animate-pulse" />
                WORKFLOW OPTIMIZATION HQ
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Productivity Sector</h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                Overclock deep focus stamina thresholds, mitigate context-switching costs, and master micro-time estimations.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start md:self-center">
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">⏱️ DEEP_WORK</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">🔄 rule_sw</span>
          </div>
        </div>

        {/* Telemetry Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center lg:text-left backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">DRILS_ONLINE</span>
                <Cpu className="w-4 h-4 text-teal-400" />
              </div>
              <p className="text-4xl font-extrabold text-white tracking-tight">{totalDrills}</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Calibrators Linked</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-900 text-xs text-slate-400 leading-relaxed font-mono">
              Work efficiency sensors record context switch delay curves to index sustained attention streaks.
            </div>
          </div>

          {/* Pomodoro Focus Sprint timer calibrator widget */}
          <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3 text-teal-400 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Pomodoro Focus Sprint Timer</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">STATUS: {sessionType.toUpperCase()}_SESSION</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center py-2">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-slate-950 border border-slate-900 shadow-inner shrink-0">
                <span className="font-mono font-extrabold text-2xl text-white z-10">{formatTime(timeLeft)}</span>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-3">
                <p className="text-[11px] font-mono text-slate-400">
                  Establish cognitive alignment cycles. 25-minute sprints with 5-minute mental release phases.
                </p>
                
                <div className="flex gap-3 justify-center sm:justify-start">
                  <button 
                    onClick={toggleTimer}
                    className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-mono text-xs uppercase tracking-wider font-bold px-6 py-2 rounded-lg transition shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                  >
                    {timerRunning ? "PAUSE" : "START SPRINT"}
                  </button>
                  <button 
                    onClick={resetTimer}
                    className="bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-mono text-xs uppercase tracking-wider px-5 py-2 rounded-lg transition"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {categories.map((category) => {
          const categoryDrills = drills.filter(d => d.category === category && d.enabled);
          if (categoryDrills.length === 0) return null;
          
          const styles = getCategoryStyles(category);

          return (
            <div key={category} className="mb-14 relative">
              
              <div className="flex items-center gap-2 mb-6 border-b border-slate-900 pb-3">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${styles.gradient}`} />
                <h2 className="text-lg font-bold uppercase tracking-wider text-white font-mono">{category}</h2>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-500">
                  {categoryDrills.length} DRILL{categoryDrills.length > 1 ? 'S' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill) => (
                  <Link 
                    key={drill.id} 
                    href={getDrillPath(drill)} 
                    className={`group relative overflow-hidden bg-slate-950/80 border border-slate-900 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-teal-500/50 ${styles.cardHover}`}
                    aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 rounded-lg border ${styles.bg}`}>
                          {getCategoryIcon(category)}
                        </div>
                        <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide border uppercase ${getDifficultyColor(drill.difficulty)}`}>
                          {drill.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-teal-400 transition-colors uppercase tracking-tight font-mono">
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
                          <span>Efficiency Loop</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{category}</span>
                        <div className={`flex items-center gap-1 ${styles.hover} text-xs font-mono font-bold group-hover:gap-2 transition-all`}>
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 font-mono">
            <Sparkles className="w-5 h-5 text-teal-400" />
            WORKFLOW METRIC TARGETS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-sans">
            {[
              { emoji: "🔄", title: "Rule Switching", desc: "Minimize cognitive lag cycles when switching priorities." },
              { emoji: "🎯", title: "Focus Stamina", desc: "Extend duration within deep flow states under distraction." },
              { emoji: "⏱️", title: "Time Integration", desc: "Refine dynamic microsecond estimations of elapsed intervals." },
              { emoji: "📦", title: "Batch Processing", desc: "Maximize workflow processing rates in structured time boxes." }
            ].map((benefit, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
                <h4 className="font-bold text-teal-400 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
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
              { href: "/drills/cognitive", emoji: "🧠", title: "Cognitive Sector", desc: "Focus & neural latency" },
              { href: "/drills/memory", emoji: "💾", title: "Memory Hub", desc: "Digit span sequence recall" },
              { href: "/drills/academic", emoji: "📚", title: "Academic Sector", desc: "WPM reading & writing" },
              { href: "/drills/fps", emoji: "🎮", title: "Tactical Aim", desc: "Precision flick shooting" }
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href} 
                className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-teal-500/40 hover:shadow-[0_0_20px_rgba(20,184,166,0.05)] transition-all duration-200 hover:-translate-y-1 text-center"
              >
                <div className="text-2xl mb-2">{link.emoji}</div>
                <h3 className="font-bold text-slate-200 group-hover:text-teal-400 transition-colors uppercase text-xs tracking-wider font-mono">{link.title}</h3>
                <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}