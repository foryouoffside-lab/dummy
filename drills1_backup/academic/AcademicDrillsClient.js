'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { 
  Clock, Play, BookOpen, Target, 
  Award, Calculator, Eye, PenTool, Brain,
  Star, Home, ChevronRight, Activity, Terminal, Sparkles, Cpu
} from 'lucide-react';

export default function AcademicDrillsClient() {
  const [isClient, setIsClient] = useState(false);

  // Typing speed calibrator state
  const testPhrase = "quantum computing accelerates machine learning algorithms";
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpmResult, setWpmResult] = useState(null);
  const [accResult, setAccResult] = useState(null);
  const [testFinished, setTestFinished] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Floating equations and characters background animation
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

    const mathSymbols = ["f(x)", "dy/dx", "Ï€", "Î£", "xÂ²", "a+b", "∫", "WPM", "101", "log(n)", "Î»", "Î¸", "√x", "Code"];
    const items = [];
    const count = 25;
    for (let i = 0; i < count; i++) {
      items.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
        vy: -(Math.random() * 0.2 + 0.1),
        fontSize: Math.floor(Math.random() * 6) + 10,
        opacity: Math.random() * 0.15 + 0.05
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(245, 158, 11, 0.4)";
      
      items.forEach((item) => {
        ctx.font = `bold ${item.fontSize}px monospace`;
        ctx.fillStyle = `rgba(245, 158, 11, ${item.opacity})`;
        ctx.fillText(item.text, item.x, item.y);
        item.y += item.vy;

        if (item.y < -20) {
          item.y = canvas.height + 20;
          item.x = Math.random() * canvas.width;
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

  const handleTypingInput = (e) => {
    const val = e.target.value;
    if (!startTime) {
      setStartTime(performance.now());
    }
    setTyped(val);

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === testPhrase[i]) correct++;
    }
    const acc = val.length > 0 ? Math.round((correct / val.length) * 100) : 100;
    setAccResult(acc);

    if (val === testPhrase) {
      const endTime = performance.now();
      const timeSecs = (endTime - startTime) / 1000;
      const wordCount = testPhrase.split(" ").length;
      const calculatedWpm = Math.round((wordCount / timeSecs) * 60);
      setWpmResult(calculatedWpm);
      setTestFinished(true);
    }
  };

  const resetTypingTest = () => {
    setTyped("");
    setStartTime(null);
    setWpmResult(null);
    setAccResult(null);
    setTestFinished(false);
  };

  const categories = useMemo(() => [
    {
      name: 'Math Speed',
      folderName: 'math-speed',
      icon: Calculator,
      description: 'Mental arithmetic, multiplication, and calculation speed drills',
      gradient: 'from-red-500 to-orange-500',
      bg: 'bg-red-500/10 border-red-500/20 text-red-400',
      textColor: 'text-red-400',
      tagBg: 'bg-red-500/10 border-red-500/20 text-red-400'
    },
    {
      name: 'Reading Speed',
      folderName: 'reading-speed',
      icon: Eye,
      description: 'RSVP, peripheral vision, and columnar reading techniques',
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      textColor: 'text-blue-400',
      tagBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400'
    },
    {
      name: 'Writing Speed',
      folderName: 'writing-speed',
      icon: PenTool,
      description: 'Typing speed tests and code syntax typing practice',
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-green-500/10 border-green-500/20 text-green-400',
      textColor: 'text-green-400',
      tagBg: 'bg-green-500/10 border-green-500/20 text-green-400'
    },
    {
      name: 'Comprehension',
      folderName: 'comprehension',
      icon: Brain,
      description: 'Reading and inference comprehension training',
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      textColor: 'text-purple-400',
      tagBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400'
    }
  ], []);

  const drills = useMemo(() => [
    { id: 1, name: 'Math Reaction', folderName: 'Math-Reaction', category: 'Math Speed', difficulty: 'Hard', duration: '1 min', description: 'Identify odd/even results under adaptive time pressure with lives system' },
    { id: 2, name: 'Mental Math', folderName: 'mental-math', category: 'Math Speed', difficulty: 'Hard', duration: '1 min', description: 'Calculate arithmetic problems across 3 difficulty tiers with combo streaks' },
    { id: 3, name: 'Speed Reader', folderName: 'speed-reader', category: 'Reading Speed', difficulty: 'Medium', duration: '1 min', description: '10 rotating text columns at adjustable 100-800 WPM with width control' },
    { id: 4, name: 'RSVP Reader', folderName: 'rsvp-reader', category: 'Reading Speed', difficulty: 'Medium', duration: '1 min', description: 'Rapid Serial Visual Presentation with Optimal Recognition Point alignment' },
    { id: 5, name: 'Peripheral Reader', folderName: 'peripheral-reader', category: 'Reading Speed', difficulty: 'Hard', duration: '1 min', description: 'Train extrafoveal word recognition with random recall questions' },
    { id: 6, name: 'Typing Test', folderName: 'typing-test', category: 'Writing Speed', difficulty: 'Medium', duration: '1 min', description: 'Type 30 unique quotes across Easy/Medium/Hard levels with WPM tracking' },
    { id: 7, name: 'Reading Comprehension', folderName: 'reading-comprehension', category: 'Comprehension', difficulty: 'Medium', duration: '1 min', description: 'Fresh passages every session with scored quizzes across 3 difficulty levels' },
    { id: 8, name: 'Inference Drill', folderName: 'inference-drill', category: 'Comprehension', difficulty: 'Hard', duration: '1 min', description: '12 critical reasoning passages with detailed answer rationales' }
  ], []);

  const totalDrills = drills.length;

  const getDifficultyStyles = (difficulty) => {
    const map = {
      'Easy': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'Medium': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'Hard': 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    return map[difficulty] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const getCategoryIcon = (category) => {
    const map = {
      'Math Speed': <Calculator className="w-5 h-5" />,
      'Reading Speed': <Eye className="w-5 h-5" />,
      'Writing Speed': <PenTool className="w-5 h-5" />,
      'Comprehension': <Brain className="w-5 h-5" />
    };
    return map[category] || <BookOpen className="w-5 h-5" />;
  };

  const getCategoryStyles = (category) => {
    const map = {
      'Math Speed': { bg: 'bg-red-500/10 border-red-500/20 text-red-400', hover: 'group-hover:text-red-400', gradient: 'from-red-500 to-orange-500', cardHover: 'hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]' },
      'Reading Speed': { bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400', hover: 'group-hover:text-blue-400', gradient: 'from-blue-500 to-cyan-500', cardHover: 'hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]' },
      'Writing Speed': { bg: 'bg-green-500/10 border-green-500/20 text-green-400', hover: 'group-hover:text-green-400', gradient: 'from-green-500 to-emerald-500', cardHover: 'hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]' },
      'Comprehension': { bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400', hover: 'group-hover:text-purple-400', gradient: 'from-purple-500 to-pink-500', cardHover: 'hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]' }
    };
    return map[category] || { bg: 'bg-slate-500/10 border-slate-500/20 text-slate-400', hover: 'group-hover:text-slate-400', gradient: 'from-slate-500 to-slate-600', cardHover: 'hover:border-slate-800' };
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-400 font-mono tracking-widest uppercase animate-pulse">Initializing Scholastic Archives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-300 relative overflow-hidden">
      
      {/* Background visual styles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-slate-950 to-slate-950 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.45)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.45)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <canvas style={{ touchAction: 'none' }} ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />

      {/* SEO structured schema - Updated to reflect 8 drills */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Academic Training Drills - Speed Reading, Writing & Math",
            "url": "https://skilldrills.online/drills/academic",
            "description": "Improve your math speed, reading comprehension, writing speed, and critical typing with 8 free academic performance drills.",
            "isPartOf": { "@type": "WebSite", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "about": { "@type": "Thing", "name": "Academic Training" },
            "numberOfItems": 8,
            "itemListElement": drills.map((drill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/academic/${drill.category.toLowerCase().replace(' ', '-')}/${drill.folderName}`,
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
              <Link href="/" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>HQ</span>
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><Link href="/drills" className="hover:text-amber-400 transition-colors">Drills</Link></li>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <li><span className="text-amber-400 font-bold font-mono" aria-current="page">Academic Sector</span></li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="mb-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 shadow-inner shrink-0">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Activity className="w-3 h-3 animate-pulse" />
                SCHOLASTIC COGNITION
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Academic Sector</h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
                Accelerate mental multiplication rates, optimize RSVP reading speeds, and refine logical text synthesis.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start md:self-center">
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">🧮 MATH_RT</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">📖 RSVP</span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono font-semibold">⌨️ WPM</span>
          </div>
        </div>

        {/* Telemetry Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center lg:text-left backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">DRILLS_LOADED</span>
                <Cpu className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-4xl font-extrabold text-white tracking-tight">{totalDrills}</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Intelligence Portals</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-900 text-xs text-slate-400 leading-relaxed font-mono">
              Academic precision scaling monitors key strike intervals and RSVP focus indexes in active runtime memory.
            </div>
          </div>

          {/* Typing WPM Calibrator Widget */}
          <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3 text-amber-400 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Dynamic Writing Speed Calibrator</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">TEST_RUN // WPM_CALIBRATOR</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed select-none">
                <span className="text-amber-500/40 mr-2">PHRASE:</span>
                {testPhrase.split("").map((char, index) => {
                  let color = "text-slate-500";
                  if (index < typed.length) {
                    color = typed[index] === char ? "text-emerald-400 font-bold" : "text-rose-500 font-bold underline bg-rose-500/10";
                  }
                  return <span key={index} className={color}>{char}</span>;
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <input 
                  type="text"
                  value={typed}
                  onChange={handleTypingInput}
                  disabled={testFinished}
                  placeholder="Click here and begin typing..."
                  className="flex-1 w-full bg-slate-950 border border-slate-900 focus:border-amber-500/50 rounded-lg px-4 py-2 text-xs sm:text-sm font-mono text-white placeholder-slate-600 focus:outline-none transition"
                />
                
                {testFinished ? (
                  <button 
                    onClick={resetTypingTest}
                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition"
                  >
                    RESET
                  </button>
                ) : (
                  <div className="flex gap-4 text-xs font-mono text-slate-500 min-w-[120px] justify-center sm:justify-start">
                    <div>ACC: <span className="text-amber-400 font-bold">{accResult !== null ? `${accResult}%` : '--'}</span></div>
                  </div>
                )}
              </div>

              {wpmResult !== null && (
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between font-mono text-xs text-emerald-400">
                  <span>VELOCITY RATIO: {wpmResult} WPM</span>
                  <span>ACCURACY RATE: {accResult}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Drills Grid by Category */}
        {categories.map((categoryGroup) => {
          const categoryDrills = drills.filter(d => d.category === categoryGroup.name);
          if (categoryDrills.length === 0) return null;
          
          const styles = getCategoryStyles(categoryGroup.name);

          return (
            <div key={categoryGroup.name} className="mb-14 relative">
              
              <div className="flex items-center gap-2 mb-6 border-b border-slate-900 pb-3">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${styles.gradient}`} />
                <h2 className="text-lg font-bold uppercase tracking-wider text-white font-mono">{categoryGroup.name}</h2>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-500">
                  {categoryDrills.length} DRILL{categoryDrills.length > 1 ? 'S' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDrills.map((drill) => (
                  <Link 
                    key={drill.id} 
                    href={`/drills/academic/${categoryGroup.folderName}/${drill.folderName}`} 
                    className={`group relative overflow-hidden bg-slate-950/80 border border-slate-900 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${styles.cardHover}`}
                    aria-label={`${drill.name} - ${drill.description}. Difficulty: ${drill.difficulty}. Duration: ${drill.duration}.`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 rounded-lg border ${styles.bg}`}>
                          {getCategoryIcon(categoryGroup.name)}
                        </div>
                        <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide border uppercase ${getDifficultyStyles(drill.difficulty)}`}>
                          {drill.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors uppercase tracking-tight font-mono">
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
                          <span>Foveal Path</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{categoryGroup.name}</span>
                        <div className={`flex items-center gap-1 ${styles.textColor} text-xs font-mono font-bold group-hover:gap-2 transition-all`}>
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 font-mono">
            <Sparkles className="w-5 h-5 text-amber-400" />
            ACADEMIC COGNITION VECTORS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-sans">
            {[
              { emoji: "🧮", title: "Quantitative Speed", desc: "Unlock microsecond mental conversion pathways and index matrices." },
              { emoji: "📖", title: "RSVP Subvocalization", desc: "Reduce subvocalization loops to bypass limits of standard reading speeds." },
              { emoji: "⌨️", title: "Syntax Precision", desc: "Refine typing finger-sequencing to decrease key delay margins." },
              { emoji: "📚", title: "Semantic Synthesis", desc: "Construct higher-order logical summaries of dense text payloads rapidly." }
            ].map((benefit, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition rounded-xl p-5">
                <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2 uppercase text-xs tracking-wider font-mono">
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
              { href: "/drills/cognitive", emoji: "🧠", title: "Cognitive Sector", desc: "Reaction & focus metrics" },
              { href: "/drills/cognitive", emoji: "⏱️", title: "Productivity", desc: "Pomodoro deep work" },
              { href: "/drills/memory", emoji: "💾", title: "Memory Hub", desc: "N-back sequence grids" },
              { href: "/drills/fps", emoji: "🎮", title: "FPS Target Lab", desc: "Flick shot & sens calibrations" }
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href} 
                className="group bg-slate-950/80 border border-slate-900 rounded-xl p-5 hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] transition-all duration-200 hover:-translate-y-1 text-center"
              >
                <div className="text-2xl mb-2">{link.emoji}</div>
                <h3 className="font-bold text-slate-200 group-hover:text-amber-400 transition-colors uppercase text-xs tracking-wider font-mono">{link.title}</h3>
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