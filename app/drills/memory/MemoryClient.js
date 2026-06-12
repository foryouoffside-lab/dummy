"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Play, Brain, Target, Star, Home, ChevronRight, Activity, Cpu, Sparkles } from "lucide-react";

const memoryCategories = [
  {
    name: "Short-Term Memory",
    folderName: "short-term-memory",
    icon: Brain,
    color: "purple",
    bgColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    textColor: "text-purple-400",
    description: "Improve your ability to hold information temporarily in conscious awareness",
    drills: [
      { name: "Digit Span", folderName: "digit-span", difficulty: "Easy", duration: "60s", description: "Memorize and recall growing sequences of random digits" },
      { name: "Word Recall", folderName: "word-recall", difficulty: "Medium", duration: "60s", description: "Study word lists then type all words you remember" },
      { name: "Color Sequence", folderName: "color-sequence", difficulty: "Easy", duration: "60s", description: "Watch and reproduce color patterns in correct order" }
    ]
  },
  {
    name: "Working Memory",
    folderName: "working-memory",
    icon: Brain,
    color: "blue",
    bgColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    textColor: "text-blue-400",
    description: "Enhance your ability to manipulate and process information mentally",
    drills: [
      { name: "3-Back Training", folderName: "n-back", difficulty: "Hard", duration: "60s", description: "Compare current letter with one from 3 steps back" },
      { name: "Mental Arithmetic", folderName: "mental-arithmetic", difficulty: "Medium", duration: "60s", description: "Solve math problems while tracking difficulty scaling" },
      { name: "Sentence Span", folderName: "sentence-span", difficulty: "Medium", duration: "60s", description: "Read sentences then recall key nouns from each one" }
    ]
  },
  {
    name: "Long-Term Memory",
    folderName: "long-term-memory",
    icon: Brain,
    color: "teal",
    bgColor: "bg-teal-500/10 border-teal-500/20 text-teal-400",
    textColor: "text-teal-400",
    description: "Build lasting memory associations through structured recall practice",
    drills: [
      { name: "Story Recall", folderName: "story-recall", difficulty: "Medium", duration: "60s", description: "Read short stories then answer detailed questions" },
      { name: "Image Association", folderName: "image-association", difficulty: "Easy", duration: "60s", description: "Link emoji items with 5 associated words each" },
      { name: "Paired Associates", folderName: "paired-associates", difficulty: "Medium", duration: "60s", description: "Learn and recall word pairs across 5 difficulty tiers" }
    ]
  },
  {
    name: "Spatial Memory",
    folderName: "spatial-memory",
    icon: Brain,
    color: "orange",
    bgColor: "bg-orange-500/10 border-orange-500/20 text-orange-400",
    textColor: "text-orange-400",
    description: "Train your ability to remember positions, paths, and spatial layouts",
    drills: [
      { name: "Grid Memorization", folderName: "grid-memorization", difficulty: "Medium", duration: "60s", description: "Memorize lit cell patterns on 4×4 to 5×5 grids" },
      { name: "Path Tracing", folderName: "path-tracing", difficulty: "Hard", duration: "60s", description: "Watch animated dot paths then retrace in exact order" },
      { name: "Object Location", folderName: "object-location", difficulty: "Medium", duration: "60s", description: "Remember where emoji objects are placed on expanding grids" }
    ]
  },
  {
    name: "Associative Memory",
    folderName: "associative-memory",
    icon: Brain,
    color: "violet",
    bgColor: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    textColor: "text-violet-400",
    description: "Strengthen connections between related pieces of information",
    drills: [
      { name: "Name-Face Memory", folderName: "name-face", difficulty: "Hard", duration: "60s", description: "Match emoji faces with names and professional roles" },
      { name: "Concept Linking", folderName: "concept-linking", difficulty: "Medium", duration: "60s", description: "Memorize and recall sequential concept chains" },
      { name: "Sound Pattern", folderName: "sound-pattern", difficulty: "Medium", duration: "60s", description: "Listen to rhythmic beat patterns then reproduce them" }
    ]
  }
];

export default function MemoryClient() {
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

  // Digit Span Calibrator State
  const [level, setLevel] = useState(4); // Start with 4 digits
  const [sequence, setSequence] = useState("");
  const [userInput, setUserInput] = useState("");
  const [calibState, setCalibState] = useState("idle"); // idle, showing, typing, success, fail
  const [highScore, setHighScore] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Binary data grid background animation
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

    const columns = Math.floor(canvas.width / 24);
    const dropPositions = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(8, 13, 26, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "rgba(99, 102, 241, 0.12)";
      ctx.font = "12px monospace";

      dropPositions.forEach((y, x) => {
        const text = Math.random() > 0.5 ? "1" : "0";
        const xCoord = x * 24;
        ctx.fillText(text, xCoord, y);

        if (y > canvas.height && Math.random() > 0.985) {
          dropPositions[x] = 0;
        } else {
          dropPositions[x] = y + 16;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Smooth frame pacing
    const interval = setInterval(draw, 45);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [isClient]);

  const generateSequence = (len) => {
    let seq = "";
    for (let i = 0; i < len; i++) {
      seq += Math.floor(Math.random() * 10).toString();
    }
    return seq;
  };

  const startCalibrator = () => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    const seq = generateSequence(level);
    setSequence(seq);
    setCalibState("showing");
    setUserInput("");
    
    // Show sequence for level * 800ms
    setTimeout(() => {
      setCalibState("typing");
    }, level * 800);
  };

  const checkResponse = () => {
    if (userInput === sequence) {
      setCalibState("success");
      const nextLevel = level + 1;
      setLevel(nextLevel);
      if (level > highScore) {
        setHighScore(level);
      }
    } else {
      setCalibState("fail");
      setLevel(4); // Reset to base level
    }
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

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Short-Term Memory': return 'from-purple-500 to-pink-500';
      case 'Working Memory': return 'from-blue-500 to-cyan-500';
      case 'Long-Term Memory': return 'from-teal-500 to-emerald-500';
      case 'Spatial Memory': return 'from-orange-500 to-red-500';
      case 'Associative Memory': return 'from-violet-500 to-purple-500';
      default: return 'from-indigo-500 to-cyan-500';
    }
  };

  const getCategoryCardBorder = (category) => {
    switch(category) {
      case 'Short-Term Memory': return 'hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]';
      case 'Working Memory': return 'hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]';
      case 'Long-Term Memory': return 'hover:border-teal-500/30 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)]';
      case 'Spatial Memory': return 'hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]';
      case 'Associative Memory': return 'hover:border-violet-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]';
      default: return 'hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]';
    }
  };

  const totalDrills = memoryCategories.reduce((acc, cat) => acc + cat.drills.length, 0);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-400 font-mono tracking-widest uppercase animate-pulse">Initializing Memory Matrix...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-300 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />
          {/* Mobile Rotate Device Warning Overlay */}
      {showRotateWarning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-6" aria-hidden="true">
          <div className="animate-bounce mb-4 text-blue-500">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{warningMessage}</h3>
          <p className="text-sm text-gray-400">Please use landscape orientation or fullscreen mode for the best training experience.</p>
        </div>
      )}

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.4)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.4)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Memory Training Drills - Free Brain Memory Exercises",
            "url": "https://skilldrills.online/drills/memory",
            "description": "15 free memory training drills across 5 categories: Short-Term, Working, Long-Term, Spatial, and Associative Memory. No login required.",
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Memory Training & Cognitive Enhancement" },
            "numberOfItems": 15,
            "itemListElement": memoryCategories.flatMap(category =>
              category.drills.map((drill, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "WebApplication",
                  "name": drill.name,
                  "url": `https://skilldrills.online/drills/memory/${category.folderName}/${drill.folderName}`,
                  "description": drill.description,
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "Web"
                }
              }))
            )
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <li>
              <Link href="/" className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><Link href="/drills" className="hover:text-indigo-400 transition-colors">Drills</Link></li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><span className="text-indigo-400 font-bold" aria-current="page">Memory Sector</span></li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 shadow-inner shrink-0">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Activity className="w-3 h-3 animate-pulse" />
                MEMORY STACK CONTROLLER
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Memory Sector</h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                Overclock working memory recall buffers, digit recall thresholds, and spatial layout memory traces.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start md:self-center">
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">💾 RAM_STK</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">🧬 SYMBOLS</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">⚡ N_BACK</span>
          </div>
        </div>

        {/* Telemetry Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center lg:text-left backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">DRILLS_ONLINE</span>
                <Cpu className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-4xl font-extrabold text-white tracking-tight">{totalDrills}</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Ready for Execution</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-900 text-xs text-slate-400 leading-relaxed font-mono">
              Working memory buffers dynamically scale sequence complexity triggers to match retention capacities.
            </div>
          </div>

          {/* Digit Span Calibrator Widget */}
          <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3 text-indigo-400 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Digit Span Memory Calibrator</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">CALIB_MODE: {level} DIGITS</span>
            </div>

            <div className="flex-1 flex flex-col justify-center min-h-[140px] rounded-xl border border-slate-900 bg-slate-950 p-4 relative">
              {calibState === "idle" && (
                <div className="text-center">
                  <p className="text-xs font-mono text-slate-400 mb-4">Benchmark your sensory buffer stack depth.</p>
                  <button 
                    onClick={startCalibrator}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-mono text-xs uppercase tracking-wider font-bold px-6 py-2.5 rounded-lg transition shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                  >
                    Start Recall Span Check
                  </button>
                </div>
              )}

              {calibState === "showing" && (
                <div className="text-center">
                  <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-2">Recall sequence below</p>
                  <p className="text-3xl font-extrabold text-white tracking-widest animate-pulse">{sequence}</p>
                </div>
              )}

              {calibState === "typing" && (
                <div className="text-center max-w-xs mx-auto">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3">Input sequence</p>
                  <input 
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter digits..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-lg px-4 py-2 text-center text-lg font-mono text-white tracking-widest focus:outline-none transition mb-3"
                  />
                  <button 
                    onClick={checkResponse}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider py-2 rounded-lg transition"
                  >
                    SUBMIT
                  </button>
                </div>
              )}

              {calibState === "success" && (
                <div className="text-center">
                  <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">SUCCESS // SEQUENCE MATCHED</p>
                  <p className="text-sm text-slate-300 mb-4">Calibrator complexity upgraded to {level} digits.</p>
                  <button 
                    onClick={startCalibrator}
                    className="bg-slate-900 border border-slate-800 text-white font-mono text-xs uppercase tracking-wider px-5 py-2 rounded-lg transition hover:bg-slate-800"
                  >
                    Next Tier
                  </button>
                </div>
              )}

              {calibState === "fail" && (
                <div className="text-center">
                  <p className="text-rose-500 font-mono text-xs uppercase tracking-widest mb-2">FAILURE // CONFLICT DETECTED</p>
                  <p className="text-sm text-slate-400 mb-4">Correct sequence was: <span className="font-mono text-white font-bold">{sequence}</span></p>
                  <button 
                    onClick={startCalibrator}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-lg transition"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {memoryCategories.map((category) => {
          const categoryDrills = category.drills;
          const styles = getCategoryCardBorder(category.name);
          const gradient = getCategoryGradient(category.name);

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
                    href={`/drills/memory/${category.folderName}/${drill.folderName}`} 
                    className={`group relative overflow-hidden bg-slate-950/80 border border-slate-900 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 ${styles}`}
                    aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 rounded-lg border ${category.bgColor}`}>
                          <Brain className="w-5 h-5" />
                        </div>
                        <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide border uppercase ${getDifficultyColor(drill.difficulty)}`}>
                          {drill.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors uppercase tracking-tight font-mono">
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
                          <span>Memory Bank</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{category.name}</span>
                        <div className="flex items-center gap-1 text-indigo-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 font-mono">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            MEMORY STACK IMPROVEMENT VECTORS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-sans">
            {[
              { emoji: "💾", title: "Working Buffer", desc: "Augment sensory sequence mapping and pattern retention grids." },
              { emoji: "🎯", title: "Spatial Tracing", desc: "Sharpen layout memory recall and path tracking resolution." },
              { emoji: "🧬", title: "Recall Streaks", desc: "Build durable concept connections across non-adjacent recall points." },
              { emoji: "⚡", title: "N-Back Endurance", desc: "Maximize mental data processing rates under progressive cognitive loads." }
            ].map((benefit, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
                <h4 className="font-bold text-indigo-400 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
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
              { href: "/drills/cognitive", emoji: "🧠", title: "Cognitive Sector", desc: "Focus & reaction speed" },
              { href: "/drills/productivity", emoji: "⏱️", title: "Productivity Sector", desc: "Pomodoro focus metrics" },
              { href: "/drills/academic", emoji: "📚", title: "Academic Hub", desc: "Reading & writing speeds" },
              { href: "/drills/fps", emoji: "🎮", title: "Tactical Aim", desc: "Target tracking mechanics" }
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href} 
                className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.05)] transition-all duration-200 hover:-translate-y-1 text-center"
              >
                <div className="text-2xl mb-2">{link.emoji}</div>
                <h3 className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors uppercase text-xs tracking-wider font-mono">{link.title}</h3>
                <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}