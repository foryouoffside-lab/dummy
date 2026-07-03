"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Brain, Target, Star, Clock, Play, Eye, Zap, Puzzle, Home, ChevronRight, Activity, Cpu, Sparkles } from "lucide-react";

const cognitiveCategories = [
  {
    name: "Attention Training",
    folderName: "attention",
    icon: Eye,
    color: "blue",
    bgColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    textColor: "text-blue-400",
    description: "Divided, selective, and sustained attention exercises based on cognitive psychology research",
    drills: [
      { name: "Divided Attention", folderName: "divided-attention", difficulty: "Intermediate", duration: "60s", description: "Dual-task training: track moving balls while matching even numbers simultaneously" },
      { name: "Selective Attention", folderName: "selective-attention", difficulty: "Intermediate", duration: "60s", description: "Visual search: find items matching both color and shape among distractors" },
      { name: "Sustained Attention", folderName: "sustained-attention", difficulty: "Beginner", duration: "60s", description: "Vigilance training: click only when the flashing number matches your memorized target" },
      { name: "Batch Processing", folderName: "batch-processing", difficulty: "Intermediate", duration: "60s", description: "Process RED, BLUE, GREEN batches in 2-second windows with progressive difficulty" },
      { name: "Multi-Tasking", folderName: "multi-tasking", difficulty: "Advanced", duration: "60s", description: "Juggle multiple cognitive tasks simultaneously with increasing complexity" },
      { name: "Concentration Stamina", folderName: "concentration-stamina", difficulty: "Advanced", duration: "60s", description: "Rule-switching endurance: alternate between VOWELS and PRIMES every 10 seconds" },
      { name: "Switch Cost", folderName: "switch-cost", difficulty: "Advanced", duration: "60s", description: "Measure cognitive penalty when switching between different task types" },
    ]
  },
  {
    name: "Focus & Concentration",
    folderName: "focus",
    icon: Target,
    color: "purple",
    bgColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    textColor: "text-purple-400",
    description: "Build deep work stamina, resist distractions, and enter flow state more easily",
    drills: [
      { name: "Concentration Grid", folderName: "concentration-grid", difficulty: "Intermediate", duration: "60s", description: "Sequential search: find numbers on expanding 3x3 to 8x8 grids with level bonuses" },
      { name: "Distraction Fighter", folderName: "distraction-fighter", difficulty: "Advanced", duration: "60s", description: "Stroop test: identify ink colors while ignoring conflicting word meanings" },
    ]
  },
  {
    name: "Memory Games",
    folderName: "memory",
    icon: Brain,
    color: "indigo",
    bgColor: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    textColor: "text-indigo-400",
    description: "Working memory, spatial recall, pattern recognition, and sequence memory exercises",
    drills: [
      { name: "Card Matching", folderName: "card-matching", difficulty: "Beginner", duration: "60s", description: "Visual memory: match icon pairs on expanding 12 to 32+ card grids with 15+ unique icons" },
      { name: "Memory Sequence", folderName: "memory-sequence", difficulty: "Intermediate", duration: "60s", description: "Spatial recall: repeat sequences on 4x4 to 7x7 grids with Memory Master achievement" },
      { name: "Pattern Recognition", folderName: "pattern-recognition", difficulty: "Intermediate", duration: "60s", description: "5 pattern types: arithmetic, geometric, squares, Fibonacci, and alternating sequences" },
    ]
  },
  {
    name: "Problem Solving",
    folderName: "problem-solving",
    icon: Puzzle,
    color: "orange",
    bgColor: "bg-orange-500/10 border-orange-500/20 text-orange-400",
    textColor: "text-orange-400",
    description: "Logic puzzles, strategic planning, recursive thinking, and critical reasoning",
    drills: [
      { name: "Logic Puzzles", folderName: "logic-puzzles", difficulty: "Advanced", duration: "60s", description: "8 puzzle types including sequences, algebra, PEMDAS, percentages & number manipulation" },
      { name: "Priority Sorting", folderName: "priority-sorting", difficulty: "Intermediate", duration: "60s", description: "Organize and prioritize tasks based on urgency and importance matrices" },
      { name: "Sudoku", folderName: "sudoku", difficulty: "Intermediate", duration: "60s", description: "Progressive 4x4 to 7x7 Sudoku with adaptive box constraints & Master achievement" },
      { name: "Tower of Hanoi", folderName: "tower-of-hanoi", difficulty: "Expert", duration: "60s", description: "Classic recursive puzzle: 3-8 disk levels with perfect move celebrations & no penalties" },
    ]
  },
  {
    name: "Processing Speed",
    folderName: "processing-speed",
    icon: Zap,
    color: "emerald",
    bgColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    textColor: "text-emerald-400",
    description: "Reaction time tests, cognitive flexibility, and symbol matching exercises",
    drills: [
      { name: "Reaction Time", folderName: "reaction-time", difficulty: "Beginner", duration: "60s", description: "Neuro-switch: click RED targets only, ignore BLUE - targets reposition every 950ms" },
      { name: "Symbol Matching", folderName: "symbol-matching", difficulty: "Advanced", duration: "75s", description: "Cognitive flexibility: match Greek symbols to numbers with keys that change every answer" },
    ]
  },
];

export default function CognitiveHubClient() {
  const [isClient, setIsClient] = useState(false);

  // Neural Latency Tester State
  const [testState, setTestState] = useState("idle"); // idle, waiting, flash, done, fail
  const [latencyText, setLatencyText] = useState("MEASURE NEURAL LATENCY");
  const [score, setScore] = useState(null);
  const timerRef = useRef(null);
  const flashTimeRef = useRef(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Neural connection background animation
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

    const particles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(168, 85, 247, 0.25)";
      ctx.strokeStyle = "rgba(168, 85, 247, 0.05)";

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
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

  const startLatencyTest = () => {
    setTestState("waiting");
    setLatencyText("WAIT FOR GREEN SYNAPSE...");
    setScore(null);
    
    const delay = Math.random() * 2000 + 1500; // 1.5s - 3.5s
    timerRef.current = setTimeout(() => {
      setTestState("flash");
      setLatencyText("CLICK NOW!");
      flashTimeRef.current = performance.now();
    }, delay);
  };

  const handleAreaClick = () => {
    if (testState === "waiting") {
      clearTimeout(timerRef.current);
      setTestState("fail");
      setLatencyText("NEURAL PRE-FIRE! RELOAD TESTER.");
    } else if (testState === "flash") {
      const clickTime = performance.now();
      const difference = Math.round(clickTime - flashTimeRef.current);
      setScore(difference);
      setTestState("done");
      
      let rating = "";
      if (difference < 180) rating = "Hyper-Cognitive Class";
      else if (difference < 220) rating = "Elite Focus Class";
      else if (difference < 260) rating = "Optimal Class";
      else rating = "Standard Performance Class";

      setLatencyText(`${difference}ms // ${rating}`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Attention Training': return 'from-blue-500 to-cyan-500';
      case 'Focus & Concentration': return 'from-purple-500 to-violet-500';
      case 'Memory Games': return 'from-indigo-500 to-purple-500';
      case 'Problem Solving': return 'from-orange-500 to-red-500';
      case 'Processing Speed': return 'from-emerald-500 to-teal-500';
      default: return 'from-purple-500 to-indigo-500';
    }
  };

  const getCategoryCardBorder = (category) => {
    switch(category) {
      case 'Attention Training': return 'hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]';
      case 'Focus & Concentration': return 'hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]';
      case 'Memory Games': return 'hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]';
      case 'Problem Solving': return 'hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]';
      case 'Processing Speed': return 'hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]';
      default: return 'hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]';
    }
  };

  const totalDrills = cognitiveCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-400 font-mono tracking-widest uppercase animate-pulse">Initializing Synaptic Core...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-purple-500/30 selection:text-purple-300 relative overflow-hidden">
      
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.45)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.45)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <canvas style={{ touchAction: 'none' }} ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />

      {/* Structured SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Cognitive Brain Training - Free Drills",
            "url": "https://skilldrills.online/drills/cognitive",
            "description": "Science-based cognitive training with free drills across 5 domains: Attention, Focus, Memory, Problem Solving, and Processing Speed. No login required.",
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Cognitive Training" },
            "numberOfItems": totalDrills,
            "itemListElement": cognitiveCategories.flatMap(category =>
              category.drills.map(drill => ({
                ...drill,
                categoryFolder: category.folderName
              }))
            ).map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/cognitive/${drill.categoryFolder}/${drill.folderName}`,
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
          <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <li><Link href="/" className="flex items-center gap-1.5 hover:text-purple-400 transition-colors"><Home className="w-3.5 h-3.5" /><span>HQ</span></Link></li>
            <li className="text-slate-600" aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
            <li><Link href="/drills" className="hover:text-purple-400 transition-colors">Drills</Link></li>
            <li className="text-slate-600" aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
            <li><span className="text-purple-400 font-bold" aria-current="page">Cognitive Sector</span></li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400 shadow-inner shrink-0">
              <Brain className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-purple-500/15 border border-purple-500/30 text-purple-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Activity className="w-3 h-3 animate-pulse" />
                NEURAL COGNITION HQ
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Cognitive Sector</h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                Overclock working memory metrics, reaction speeds, and selective attention thresholds using scientific cognitive modules.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start md:self-center">
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold tracking-wide">ATTN</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold tracking-wide">FOCUS</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold tracking-wide">MEM</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold tracking-wide">LOGIC</span>
          </div>
        </div>

        {/* Telemetry Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Capacity Diagnostic Panel */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center lg:text-left backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">COGNITIVE_NODES</span>
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-4xl font-extrabold text-white tracking-tight">{totalDrills}</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Sectors Active</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-900 text-xs text-slate-400 leading-relaxed font-mono">
              Diagnostic simulation parameters auto-adjust speed vectors based on historical completion coefficients.
            </div>
          </div>

          {/* Neural Latency Tester Widget */}
          <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3 text-purple-400 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Neural Synaptic Latency Calibrator</h3>
              </div>
              {testState !== "idle" && testState !== "done" && testState !== "fail" && (
                <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-ping" />
              )}
            </div>

            <div 
              onClick={handleAreaClick}
              className={`flex-1 flex flex-col items-center justify-center min-h-[140px] rounded-xl border cursor-pointer transition-all duration-150 relative overflow-hidden select-none
                ${testState === "idle" ? "bg-slate-950 border-slate-800 hover:border-slate-700" : ""}
                ${testState === "waiting" ? "bg-yellow-500/5 border-yellow-500/20" : ""}
                ${testState === "flash" ? "bg-emerald-500 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] text-black" : ""}
                ${testState === "done" ? "bg-purple-500/5 border-purple-500/20" : ""}
                ${testState === "fail" ? "bg-rose-500/5 border-rose-500/20" : ""}
              `}
            >
              <div className="text-center p-4">
                <p className={`font-mono font-bold uppercase tracking-widest text-xs sm:text-sm ${testState === "flash" ? "text-slate-900" : "text-slate-100"}`}>
                  {latencyText}
                </p>
                {testState === "idle" && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      startLatencyTest();
                    }}
                    className="mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs uppercase tracking-wider font-bold px-5 py-2 rounded-lg transition shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    Calibrate Latency
                  </button>
                )}
                {(testState === "done" || testState === "fail") && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      startLatencyTest();
                    }}
                    className="mt-3 bg-slate-900/50 border border-slate-800 text-slate-300 hover:text-white font-mono text-[10px] uppercase tracking-wider px-4 py-2 rounded-lg transition hover:bg-slate-800"
                  >
                    Recalibrate
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {cognitiveCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.name} className="mb-14 relative">
              
              {/* Category Segment Title */}
              <div className="flex items-center gap-2 mb-6 border-b border-slate-900 pb-3">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${getCategoryGradient(category.name)}`} />
                <h2 className="text-lg font-bold uppercase tracking-wider text-white font-mono">{category.name}</h2>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-500">
                  {category.drills.length} DRILL{category.drills.length > 1 ? 'S' : ''}
                </span>
              </div>

              {/* Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.drills.map((drill, index) => (
                  <Link 
                    key={index} 
                    href={`/drills/cognitive/${category.folderName}/${drill.folderName}`} 
                    className={`group relative overflow-hidden bg-slate-950/80 rounded-xl border border-slate-900 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-purple-500/50 ${getCategoryCardBorder(category.name)}`}
                    aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 rounded-lg border ${category.bgColor}`}>
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide border uppercase ${getDifficultyColor(drill.difficulty)}`}>
                          {drill.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-400 transition-colors uppercase tracking-tight font-mono">
                        {drill.name}
                      </h3>
                      
                      <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2 min-h-[32px]">
                        {drill.description}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-4 text-[10px] font-mono text-slate-500 border-b border-slate-900 pb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{drill.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>Neural Path</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{category.name}</span>
                        <div className="flex items-center gap-1 text-purple-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 font-mono">
            <Sparkles className="w-5 h-5 text-purple-400" />
            SYNAPTIC CORE IMPROVEMENT METRICS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: "\uD83E\uDDE0", title: "Working Memory", desc: "Augment sensory sequence mapping and pattern retention matrices." },
              { emoji: "\uD83C\uDFAF", title: "Focus Inhibition", desc: "Suppress cognitive ambient noise to preserve high focus waveforms." },
              { emoji: "\u26A1", title: "Synapse Speed", desc: "Optimize dual-task response coefficients under split-load tests." },
              { emoji: "\uD83E\uDDE9", title: "Logical Deduction", desc: "Maximize structural planning capability and recursive analysis vectors." }
            ].map((benefit, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
                <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
                  <span className="text-sm">{benefit.emoji}</span>{benefit.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Related Categories */}
        <div className="mt-16 mb-8 border-t border-slate-900 pt-12">
          <h2 className="text-lg font-bold tracking-widest text-center text-white font-mono uppercase mb-8">Explore Adjacent Sectors</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { href: "/drills/memory", emoji: "\uD83D\uDCBE", title: "Memory Sector", desc: "Working & spatial recall" },
              { href: "/drills/cognitive", emoji: "\u23F1\uFE0F", title: "Productivity", desc: "Pomodoro focus metrics" },
              { href: "/drills/academic", emoji: "\uD83D\uDCDA", title: "Academic Hub", desc: "Reading speed & equations" },
              { href: "/drills/fps", emoji: "\uD83C\uDFAE", title: "Tactical Aim", desc: "Crosshair tracking labs" }
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href} 
                className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)] transition-all duration-200 hover:-translate-y-1 text-center"
              >
                <div className="text-2xl mb-2">{link.emoji}</div>
                <h3 className="font-bold text-slate-200 group-hover:text-purple-400 transition-colors uppercase text-xs tracking-wider font-mono">{link.title}</h3>
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