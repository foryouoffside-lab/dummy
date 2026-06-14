'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Clock, Star, Play, Heart, Target, 
  Brain, Wind, Shield, Home, ChevronRight, Activity, Cpu, Sparkles
} from 'lucide-react';

export default function MentalFitnessClient() {
  const [isClient, setIsClient] = useState(false);

  // Breathing pacer state
  const [pacerState, setPacerState] = useState("idle"); // idle, inhale, holdIn, exhale, holdOut
  const [pacerText, setPacerText] = useState("BEGIN RESPIRATORY PACER");
  const [timerCount, setTimerCount] = useState(4);
  const pacerTimerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (pacerTimerRef.current) clearInterval(pacerTimerRef.current);
    };
  }, []);

  // Respiration sinus wave animation
  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(236, 72, 153, 0.08)";
      ctx.lineWidth = 2;

      // Draw two offset waves representing respiration and cardiac rhythms
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height * 0.5 + Math.sin(x * 0.005 + offset) * 35 + Math.cos(x * 0.002) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = "rgba(6, 182, 212, 0.05)";
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height * 0.52 + Math.sin(x * 0.004 - offset * 0.8) * 45;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Control wave speed depending on state
      let speed = 0.01;
      if (pacerState === "inhale") speed = 0.025;
      else if (pacerState === "exhale") speed = 0.02;
      else if (pacerState === "holdIn" || pacerState === "holdOut") speed = 0.003;
      offset += speed;

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [isClient, pacerState]);

  const startPacer = () => {
    setPacerState("inhale");
    setPacerText("INHALE...");
    setTimerCount(4);
  };

  useEffect(() => {
    if (pacerState === "idle") return;

    if (pacerTimerRef.current) clearInterval(pacerTimerRef.current);

    pacerTimerRef.current = setInterval(() => {
      setTimerCount((prev) => {
        if (prev <= 1) {
          if (pacerState === "inhale") {
            setPacerState("holdIn");
            setPacerText("HOLD...");
            return 4;
          } else if (pacerState === "holdIn") {
            setPacerState("exhale");
            setPacerText("EXHALE...");
            return 4;
          } else if (pacerState === "exhale") {
            setPacerState("holdOut");
            setPacerText("HOLD...");
            return 4;
          } else {
            setPacerState("inhale");
            setPacerText("INHALE...");
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(pacerTimerRef.current);
  }, [pacerState]);

  const stopPacer = () => {
    setPacerState("idle");
    setPacerText("BEGIN RESPIRATORY PACER");
    setTimerCount(4);
    if (pacerTimerRef.current) clearInterval(pacerTimerRef.current);
  };

  const categories = [
    { 
      name: 'Breathing Exercises', 
      folderName: 'breathing-exercises',
      icon: Wind,
      color: 'pink',
      bgColor: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
      textColor: 'text-pink-400',
      description: 'Master evidence-based breathing techniques for relaxation, energy, and vagal tone',
      drills: [
        { name: '4-7-8 Vagal Brake', folderName: '4-7-8', difficulty: 'Easy', duration: 'Untimed', description: 'Inhale 4s, hold 7s, exhale 8s to activate vagus nerve for deep relaxation' },
        { name: 'Box Breathing', folderName: 'box-breathing', difficulty: 'Easy', duration: 'Untimed', description: '4-4-4-4 tactical square breathing used by Navy SEALs for focus and calm' },
        { name: 'Wim Hof Method', folderName: 'wim-hof', difficulty: 'Medium', duration: '30 Breaths', description: '30 rapid power breaths for oxygenation, energy, and immune system activation' }
      ]
    },
    { 
      name: 'Stress Control', 
      folderName: 'stress-control',
      icon: Shield,
      color: 'red',
      bgColor: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      textColor: 'text-rose-400',
      description: 'Build cognitive resilience and maintain coherence under pressure and distraction',
      drills: [
        { name: 'Coherence Breathing', folderName: 'biofeedback', difficulty: 'Medium', duration: '5 min', description: '5:6 resonance frequency breathing to optimize heart rate variability and vagal tone' },
        { name: 'Calm Under Pressure', folderName: 'calm-under-pressure', difficulty: 'Hard', duration: '3 min', description: 'Dual-task training: maintain breathing while random numbers flash as cognitive distraction' },
        { name: 'Stress Inoculation', folderName: 'stress-inoculation', difficulty: 'Hard', duration: '5 min', description: 'Controlled stress exposure with red visual strobe and audio induction to build resilience' }
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
      case 'Stress Control': return 'from-rose-500 to-red-500';
      case 'Breathing Exercises': return 'from-pink-500 to-indigo-500';
      default: return 'from-pink-500 to-indigo-500';
    }
  };

  const getCategoryCardBorder = (category) => {
    switch(category) {
      case 'Stress Control': return 'hover:border-rose-500/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]';
      case 'Breathing Exercises': return 'hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]';
      default: return 'hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]';
    }
  };

  const totalDrills = categories.reduce((acc, cat) => acc + cat.drills.length, 0);

  const buildSchemaItems = () => {
    let position = 1;
    const items = [];
    categories.forEach(cat => {
      cat.drills.forEach(drill => {
        items.push({
          "@type": "ListItem",
          "position": position,
          "item": {
            "@type": "WebApplication",
            "name": drill.name,
            "url": `https://skilldrills.online/drills/mental-fitness/${cat.folderName}/${drill.folderName}`,
            "description": drill.description,
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web"
          }
        });
        position++;
      });
    });
    return items;
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-400 font-mono tracking-widest uppercase animate-pulse">Initializing Biometric Core...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-pink-500/30 selection:text-pink-300 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />

      <canvas style={{ touchAction: 'none' }} ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.45)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.45)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Mental Fitness Drills - Breathing Exercises & Stress Control Training",
            "url": "https://skilldrills.online/drills/mental-fitness",
            "description": "6 free mental fitness drills covering breathing exercises and stress control. Practice 4-7-8 breathing, box breathing, Wim Hof method, coherence biofeedback, stress inoculation, and calm under pressure training.",
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Mental Fitness Training" },
            "numberOfItems": totalDrills,
            "itemListElement": buildSchemaItems()
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <li>
              <Link href="/" className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><Link href="/drills" className="hover:text-pink-400 transition-colors">Drills</Link></li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><span className="text-pink-400 font-bold" aria-current="page">Mental Fitness Sector</span></li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-2xl text-pink-400 shadow-inner shrink-0">
              <Heart className="w-8 h-8 animate-pulse text-pink-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-pink-500/15 border border-pink-500/30 text-pink-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Activity className="w-3 h-3 animate-pulse" />
                BIOMETRIC REGULATION HQ
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Mental Fitness</h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                Control ciliary neural tension, optimize heart rate variability (HRV), and sustain composure in high-friction settings.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start md:self-center">
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">🌬️ HRV_RES</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">🛡️ STRESS_INOC</span>
          </div>
        </div>

        {/* Telemetry Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center lg:text-left backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">TACTICAL_PORTALS</span>
                <Cpu className="w-4 h-4 text-pink-400" />
              </div>
              <p className="text-4xl font-extrabold text-white tracking-tight">{totalDrills}</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Calibrators Connected</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-900 text-xs text-slate-400 leading-relaxed font-mono">
              Respiration sync monitors respiratory sinus arrhythmia (RSA) and calms ciliary muscle contractions.
            </div>
          </div>

          {/* Animated Box Breathing pacing biofeedback widget */}
          <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3 text-pink-400 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Box Breathing Rhythm Biofeedback</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">CYCLE: 4s EQUAL SQUARE</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center py-2">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-slate-950 border border-slate-900 shadow-inner shrink-0">
                <div 
                  className={`absolute rounded-full border border-pink-500/30 transition-all duration-1000 ease-in-out
                    ${pacerState === "idle" ? "w-4 h-4 bg-slate-800" : ""}
                    ${pacerState === "inhale" ? "w-28 h-28 bg-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.4)]" : ""}
                    ${pacerState === "holdIn" ? "w-28 h-28 bg-pink-500/10 border-pink-500/40" : ""}
                    ${pacerState === "exhale" ? "w-8 h-8 bg-pink-500/5" : ""}
                    ${pacerState === "holdOut" ? "w-4 h-4 bg-slate-900 border-slate-800" : ""}
                  `}
                />
                <span className="relative font-mono font-extrabold text-lg text-white z-10">{timerCount}s</span>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-3">
                <p className="text-sm font-mono text-slate-300 font-bold uppercase tracking-widest">{pacerText}</p>
                <p className="text-xs text-slate-400 max-w-sm">
                  Navy SEAL square breathing method: 4s inhale, 4s hold, 4s exhale, 4s hold. Equalizes heart rhythm.
                </p>
                
                <div className="flex gap-3 justify-center sm:justify-start">
                  {pacerState === "idle" ? (
                    <button 
                      onClick={startPacer}
                      className="bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-mono text-xs uppercase tracking-wider font-bold px-6 py-2 rounded-lg transition shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                    >
                      ENGAGE
                    </button>
                  ) : (
                    <button 
                      onClick={stopPacer}
                      className="bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-mono text-xs uppercase tracking-wider px-5 py-2 rounded-lg transition"
                    >
                      STOP PACER
                    </button>
                  )}
                </div>
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
                    href={`/drills/mental-fitness/${category.folderName}/${drill.folderName}`} 
                    className={`group relative overflow-hidden bg-slate-950/80 border border-slate-900 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-pink-500/50 ${styles}`}
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
                      
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-pink-400 transition-colors uppercase tracking-tight font-mono">
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
                          <span>Vagal Loop</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{category.name}</span>
                        <div className="flex items-center gap-1 text-pink-400 group-hover:gap-2 transition-all font-bold text-xs uppercase tracking-widest font-mono">
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 font-mono">
            <Sparkles className="w-5 h-5 text-pink-400" />
            MENTAL FITNESS PERFORMANCE TARGETS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-sans">
            {[
              { emoji: "🌬️", title: "RSA Resonance", desc: "Sync respiratory sinus arrhythmia to activate parasympathetic breaks." },
              { emoji: "🛡️", title: "Arousal Control", desc: "Inhibit adrenaline spikes to preserve micro-aiming steady hands." },
              { emoji: "⚡", title: "Strobe Immunity", desc: "Build spatial target locks during chaotic sensory/audio strobe noise." },
              { emoji: "🧬", title: "Composure Index", desc: "Maximize target conversion rate under dual cognitive load pressure." }
            ].map((benefit, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
                <h4 className="font-bold text-pink-400 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
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
              { href: "/drills/cognitive", emoji: "🧠", title: "Cognitive Sector", desc: "Neural latency & focus" },
              { href: "/drills/productivity", emoji: "⏱️", title: "Productivity", desc: "Eisenhower time management" },
              { href: "/drills/memory", emoji: "💾", title: "Memory Sector", desc: "Digit span buffer checks" },
              { href: "/drills/fps", emoji: "🎮", title: "Tactical Aim", desc: "Reflex & flick calibrators" }
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href} 
                className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.05)] transition-all duration-200 hover:-translate-y-1 text-center"
              >
                <div className="text-2xl mb-2">{link.emoji}</div>
                <h3 className="font-bold text-slate-200 group-hover:text-pink-400 transition-colors uppercase text-xs tracking-wider font-mono">{link.title}</h3>
                <p className="text-[10px] text-slate-500 uppercase mt-1 font-mono">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}