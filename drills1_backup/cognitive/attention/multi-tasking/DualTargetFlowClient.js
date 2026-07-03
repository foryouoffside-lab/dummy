'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Activity, RefreshCw, GraduationCap, Lightbulb, 
  TrendingUp, BarChart3, CheckCircle2, ArrowRight, Share2, 
  Clock, Brain, XCircle, RotateCcw, Copy, Info, Star, ChevronRight,Play,Users,
  LogOut, Hash, Search, Layers
} from 'lucide-react';

export default function DualTargetFlowClient() {
  // === UI & Environment State ===
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // === Game State (Visual Sync) ===
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60.0);
  const [level, setLevel] = useState(1);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [feedback, setFeedback] = useState({ id: 0, text: '', type: 'success', visible: false });
  const [isNewBest, setIsNewBest] = useState(false);
  
  const [leftTarget, setLeftTarget] = useState('▲');
  const [rightTarget, setRightTarget] = useState('▲');

  // === Absolute Truth Refs (For Zero-Latency Logic) ===
  const containerRef = useRef(null);
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  
  const scoreRef = useRef(0);
  const timeRef = useRef(60.0);
  const levelRef = useRef(1);
  const hitsRef = useRef(0);
  const missRef = useRef(0);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  
  const leftTargetRef = useRef('▲');
  const rightTargetRef = useRef('▲');
  const isDifferentTargetsRef = useRef(false);

  // === Scaling Refs ===
  const speedRef = useRef(3.0); // Higher is faster moving
  const spawnRateRef = useRef(1000); // ms between spawns

  // === Timers & Audio ===
  const timerIntervalRef = useRef(null);
  const leftSpawnTimerRef = useRef(null);
  const rightSpawnTimerRef = useRef(null);
  const targetChangeIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const animationFramesRef = useRef(new Set());
  const shapesRef = useRef(['▲', '●', '■', '★', '◆', '⬣', '❖', '⏣']);

  // ============================================================
  // INITIALIZATION & ENVIRONMENT
  // ============================================================
  useEffect(() => { 
    setIsClient(true); 
    const timer = setTimeout(() => setLoading(false), 100); 
    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    try { 
      const savedBest = localStorage.getItem('dualTargetFlowBestScoreV4'); 
      if (savedBest) setBestScore(parseInt(savedBest, 10)); 
    } catch (e) {}
  }, []);

  // Mobile Guard & Landscape Detection
  useEffect(() => {
    const checkOrientationAndSize = () => {
      if (typeof window === 'undefined') return;
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '') || window.innerWidth < 768;
      
      if (!isMobile) { 
        setShowRotateWarning(false); 
        setIsMobileLandscape(false);
        return; 
      }
      
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
          setShowRotateWarning(true);
          setIsMobileLandscape(false);
      } else {
          setShowRotateWarning(false);
          setIsMobileLandscape(true); 
      }
    };
    
    checkOrientationAndSize();
    window.addEventListener('resize', checkOrientationAndSize);
    window.addEventListener('orientationchange', checkOrientationAndSize);
    return () => {
      window.removeEventListener('resize', checkOrientationAndSize);
      window.removeEventListener('orientationchange', checkOrientationAndSize);
    };
  }, []);

  // Fullscreen Handler
  useEffect(() => { 
    const handleFs = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', handleFs); 
    return () => document.removeEventListener('fullscreenchange', handleFs); 
  }, []);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen && containerRef.current) await containerRef.current.requestFullscreen(); 
      else if (document.fullscreenElement) await document.exitFullscreen(); 
    } catch (e) {} 
  }, [isFullscreen]);

  const handleExit = useCallback(async () => {
    if (isFullscreen) {
      try { await document.exitFullscreen(); } catch (e) {}
    }
    
    // Clear active timeouts and end game gracefully
    isActiveRef.current = false;
    if (leftSpawnTimerRef.current) clearTimeout(leftSpawnTimerRef.current);
    if (rightSpawnTimerRef.current) clearTimeout(rightSpawnTimerRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (targetChangeIntervalRef.current) clearInterval(targetChangeIntervalRef.current);
    animationFramesRef.current.forEach(id => cancelAnimationFrame(id));
    animationFramesRef.current.clear();

    setGameState('start');
    gameStateRef.current = 'start';
    setTimeLeft(60.0);
    setScore(0);
    setAccuracy(100);
    setSuccessfulHits(0);
    setMisses(0);
    setLevel(1);
  }, [isFullscreen]);

  // Social Sharing Actions
  const sharePage = useCallback(() => {
    const url = 'https://skilldrills.online/drills/cognitive/attention/dual-target-flow';
    if (navigator.share) {
      navigator.share({ title: 'Dual-Target Flow Drill', text: 'Train your divided attention with high-speed multi-tracking! Free training.', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
    }
  }, []);
  
  const copyPageLink = () => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); };

  // ============================================================
  // AUDIO & FEEDBACK SYSTEM
  // ============================================================
  const initAudio = useCallback(() => { 
    try { 
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); 
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); 
      return audioCtxRef.current; 
    } catch (e) { return null; } 
  }, []);

  const playSound = useCallback((type) => { 
    if (!soundEnabled) return; 
    try { 
      const ctx = initAudio(); 
      if (!ctx) return; 
      const osc = ctx.createOscillator(); 
      const gain = ctx.createGain(); 
      osc.connect(gain); gain.connect(ctx.destination); 
      const now = ctx.currentTime; 
      
      if (type === 'hit') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(880, now); osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1);
        gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
      } else if (type === 'miss') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, now); osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
        gain.gain.setValueAtTime(0.15, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
      }
    } catch (e) {} 
  }, [soundEnabled, initAudio]);

  const triggerFeedback = useCallback((text, type = 'success') => {
    setFeedback({ id: Date.now(), text, type, visible: true });
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback(prev => ({ ...prev, visible: false }));
    }, 600);
  }, []);

  // ============================================================
  // DYNAMIC DIFFICULTY SCALING
  // ============================================================
  const updateDifficulty = useCallback(() => {
    const hits = hitsRef.current;
    
    const newLevel = Math.max(1, Math.floor(hits / 10) + 1);
    levelRef.current = newLevel;
    setLevel(newLevel);

    if (newLevel >= 3 && !isDifferentTargetsRef.current) {
      isDifferentTargetsRef.current = true;
      triggerFeedback('🧠 Difficulty Up! Targets Diverging!', 'warning');
      const shuffled = [...shapesRef.current].sort(() => 0.5 - Math.random());
      leftTargetRef.current = shuffled[0];
      rightTargetRef.current = shuffled[1];
      setLeftTarget(shuffled[0]);
      setRightTarget(shuffled[1]);
    } else if (newLevel < 3 && isDifferentTargetsRef.current) {
      // Revert to synchronized targets if difficulty drops
      isDifferentTargetsRef.current = false;
      triggerFeedback('Speed Reduced. Targets Synced.', 'success');
      const newTarget = leftTargetRef.current;
      rightTargetRef.current = newTarget;
      setRightTarget(newTarget);
    }

    speedRef.current = Math.min(7.0, 3.0 + (newLevel * 0.4));
    spawnRateRef.current = Math.max(400, 1000 - (newLevel * 60));
  }, [triggerFeedback]);

  const setRandomTargets = useCallback(() => {
    const shuffled = [...shapesRef.current].sort(() => 0.5 - Math.random());
    const newLeft = shuffled[0];
    const newRight = isDifferentTargetsRef.current ? shuffled[1] : newLeft;
    
    leftTargetRef.current = newLeft;
    rightTargetRef.current = newRight;
    setLeftTarget(newLeft);
    setRightTarget(newRight);
  }, []);

  // ============================================================
  // GAME MECHANICS
  // ============================================================
  const endGame = useCallback(() => {
    isActiveRef.current = false;
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    
    if (scoreRef.current > bestScore && scoreRef.current > 0) {
      setIsNewBest(true);
      setBestScore(scoreRef.current);
      try { localStorage.setItem('dualTargetFlowBestScoreV4', scoreRef.current.toString()); } catch (e) {}
    }
    
    if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
    if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';
    
    if (leftSpawnTimerRef.current) clearTimeout(leftSpawnTimerRef.current);
    if (rightSpawnTimerRef.current) clearTimeout(rightSpawnTimerRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (targetChangeIntervalRef.current) clearInterval(targetChangeIntervalRef.current);
    
    animationFramesRef.current.forEach(id => cancelAnimationFrame(id));
    animationFramesRef.current.clear();
  }, [bestScore]);

  const applyHit = useCallback((side) => {
    if (!isActiveRef.current) return;
    playSound('hit');
    
    scoreRef.current += 10;
    timeRef.current = Math.min(60.0, timeRef.current + 7.0); // +7 Seconds, Max 60
    hitsRef.current += 1;
    
    setScore(scoreRef.current);
    setTimeLeft(timeRef.current);
    setSuccessfulHits(hitsRef.current);
    
    updateDifficulty();
    triggerFeedback('Target! +10 PTS | +7s', 'success');
    
    const total = hitsRef.current + missRef.current;
    if (total > 0) setAccuracy(Math.round((hitsRef.current / total) * 100));
  }, [playSound, triggerFeedback, updateDifficulty]);

  const applyPenalty = useCallback((reason) => {
    if (!isActiveRef.current) return;
    playSound('miss');
    
    scoreRef.current = Math.max(0, scoreRef.current - 5);
    timeRef.current -= 3.0; // -3 Seconds
    missRef.current += 1;
    
    // Decrease difficulty on penalty
    hitsRef.current = Math.max(0, hitsRef.current - 1);
    
    setScore(scoreRef.current);
    setTimeLeft(Math.max(0, timeRef.current));
    setMisses(missRef.current);
    
    updateDifficulty();
    triggerFeedback(`Penalty! ${reason} -5 PTS | -3s`, 'error');
    
    const total = hitsRef.current + missRef.current;
    if (total > 0) setAccuracy(Math.round((hitsRef.current / total) * 100));
    
    if (timeRef.current <= 0) {
      timeRef.current = 0;
      setTimeLeft(0);
      endGame();
    }
  }, [playSound, triggerFeedback, endGame, updateDifficulty]);

  // ============================================================
  // DOM ANIMATION ENGINE (Zero-Latency Spawning)
  // ============================================================
  const createShape = useCallback((side) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    const container = side === 'left' ? leftContainerRef.current : rightContainerRef.current;
    if (!container) return;

    const targetGlyph = side === 'left' ? leftTargetRef.current : rightTargetRef.current;

    const el = document.createElement('div');
    el.style.position = 'absolute';
    
    // Mobile adaptive sizing including landscape check
    const isMobile = window.innerWidth < 768;
    const isLandscape = window.innerWidth > window.innerHeight;
    
    el.style.fontSize = isMobile ? (isLandscape ? '2.2rem' : '3.5rem') : '6.8rem';
    
    el.style.color = isBoxDarkMode ? '#d1d5db' : '#4a5568';
    el.style.cursor = 'pointer';
    el.style.lineHeight = '1';
    el.style.willChange = 'transform, left';
    el.style.textShadow = '0 0 6px rgba(209, 213, 219, 0.2)';
    el.style.touchAction = 'none'; 
    el.style.zIndex = '10';

    // PREVENT TEXT HIGHLIGHTING/COPYING
    el.style.userSelect = 'none';
    el.style.webkitUserSelect = 'none';
    el.style.MozUserSelect = 'none';
    el.setAttribute('unselectable', 'on');

    const isTarget = Math.random() < 0.35;
    const shapes = shapesRef.current;
    let glyph = isTarget ? targetGlyph : shapes[Math.floor(Math.random() * shapes.length)];
    if (!isTarget && glyph === targetGlyph) glyph = shapes.find(s => s !== targetGlyph) || '■';
    el.textContent = glyph;

    const containerRect = container.getBoundingClientRect();
    const startX = side === 'left' ? containerRect.width : -100;
    const endX = side === 'left' ? -100 : containerRect.width;
    
    const topSafeOffset = isMobile ? (isLandscape ? 60 : 80) : 150;
    const top = Math.random() * (containerRect.height - topSafeOffset);
    
    el.style.top = `${top}px`;
    el.style.left = `${startX}px`;
    container.appendChild(el);

    const duration = 4000 / speedRef.current;
    const startTime = performance.now();
    let isHandled = false;

    const handleInteraction = (e) => {
      if (e) {
        e.stopPropagation(); e.preventDefault();
        if (e.target.setPointerCapture && e.pointerId) e.target.setPointerCapture(e.pointerId);
      }
      if (isHandled || !isActiveRef.current) return;
      isHandled = true;

      const currentTarget = side === 'left' ? leftTargetRef.current : rightTargetRef.current;

      if (glyph === currentTarget) {
        el.style.color = '#60a5fa';
        el.style.textShadow = '0 0 20px #60a5fa';
        el.style.transform = 'scale(1.2)';
        el.style.transition = 'all 0.1s ease';
        applyHit(side);
        setTimeout(() => { if (el.isConnected) el.remove(); }, 150);
      } else {
        applyPenalty('WRONG SHAPE');
        el.style.color = '#ef4444';
        setTimeout(() => { if (el.isConnected) el.remove(); }, 150);
      }
    };

    el.onpointerdown = handleInteraction;

    let animId;
    function animate(currentTime) {
      if (!el.isConnected || !isActiveRef.current) return;
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        const currentX = startX + (endX - startX) * progress;
        el.style.left = `${currentX}px`;
        animId = requestAnimationFrame(animate);
        animationFramesRef.current.add(animId);
      } else {
        el.remove();
        const currentTarget = side === 'left' ? leftTargetRef.current : rightTargetRef.current;
        if (glyph === currentTarget && !isHandled && isActiveRef.current) {
          applyPenalty('MISSED');
        }
      }
    }
    animId = requestAnimationFrame(animate);
    animationFramesRef.current.add(animId);
  }, [isBoxDarkMode, applyHit, applyPenalty]);

  // Infinite Spawning Loops
  const scheduleLeftSpawn = useCallback(() => {
    if (!isActiveRef.current) return;
    createShape('left');
    leftSpawnTimerRef.current = setTimeout(scheduleLeftSpawn, spawnRateRef.current);
  }, [createShape]);

  const scheduleRightSpawn = useCallback(() => {
    if (!isActiveRef.current) return;
    createShape('right');
    rightSpawnTimerRef.current = setTimeout(scheduleRightSpawn, spawnRateRef.current);
  }, [createShape]);

  // ============================================================
  // GAME START ROUTINE
  // ============================================================
  const startGame = useCallback(async () => {
    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {}
    
    if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
    if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';
    animationFramesRef.current.forEach(id => cancelAnimationFrame(id));
    animationFramesRef.current.clear();
    if (leftSpawnTimerRef.current) clearTimeout(leftSpawnTimerRef.current);
    if (rightSpawnTimerRef.current) clearTimeout(rightSpawnTimerRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (targetChangeIntervalRef.current) clearInterval(targetChangeIntervalRef.current);

    scoreRef.current = 0;
    timeRef.current = 60.0;
    levelRef.current = 1;
    hitsRef.current = 0;
    missRef.current = 0;
    speedRef.current = 3.0;
    spawnRateRef.current = 1000;
    isDifferentTargetsRef.current = false;
    isActiveRef.current = true;
    gameStateRef.current = 'playing';

    setGameState('playing');
    setScore(0);
    setTimeLeft(60.0);
    setLevel(1);
    setSuccessfulHits(0);
    setMisses(0);
    setAccuracy(100);
    setIsNewBest(false);
    setRandomTargets();

    scheduleLeftSpawn();
    setTimeout(scheduleRightSpawn, 300); 

    targetChangeIntervalRef.current = setInterval(() => {
      if (isActiveRef.current) {
        setRandomTargets();
        triggerFeedback('🔄 TARGETS CHANGED!', 'warning');
      }
    }, 25000);

    // Precise 100ms decoupled timer for smooth float tracking
    timerIntervalRef.current = setInterval(() => {
      if (!isActiveRef.current) return;
      timeRef.current -= 0.1;
      
      if (timeRef.current <= 0) {
        timeRef.current = 0;
        setTimeLeft(0);
        endGame();
      } else {
        setTimeLeft(timeRef.current);
      }
    }, 100);

    initAudio();
  }, [scheduleLeftSpawn, scheduleRightSpawn, setRandomTargets, triggerFeedback, initAudio, endGame]);

  // ============================================================
  // RENDER
  // ============================================================
  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300 font-sans`} style={{ WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/drills/cognitive" className="hover:text-blue-400 transition-colors">Cognitive</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Attention</li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-blue-500 font-medium">Dual-Target Flow</li>
            </ol>
          </nav>
        )}

        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dual-Target Flow</h1>
                <p className="text-sm mt-1 font-medium text-gray-500">Cognitive Dual-Task Sprints • Adaptive Difficulty</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {gameState === 'playing' && (
                <button onClick={() => { endGame(); setGameState('start'); }} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95" title="Reset">
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95">
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95">
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {/* Dynamic HUD */}
        {!isFullscreen && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-2 h-auto py-1">
            <StatCard icon={<Target className="text-blue-500" />} value={score} label="Score" isDark={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-green-500'} />} value={timeLeft.toFixed(1)} label="Time" unit="s" isDark={isDarkMode} />
            <StatCard icon={<Zap className="text-yellow-500" />} value={`Lv.${level}`} label="Speed" isDark={isDarkMode} />
            <StatCard icon={<Activity className="text-purple-500" />} value={`${accuracy}%`} label="Accuracy" isDark={isDarkMode} />
            <StatCard icon={<XCircle className="text-red-500" />} value={misses} label="Penalties" isDark={isDarkMode} />
            <StatCard icon={<Trophy className="text-orange-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          </div>
        )}

        {/* Dynamic Feedback Popups */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {feedback.visible && (
            <div className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full font-black tracking-widest text-sm shadow-xl ${
              feedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 
              feedback.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20' : 
              'bg-red-500/20 text-red-400 border border-red-500/50 shadow-red-500/20'
            }`}>
              {feedback.text}
            </div>
          )}
        </div>

        {/* GAME CONTAINER: Adaptive Scale */}
        <div ref={containerRef} 
             onContextMenu={(e) => { if(gameStateRef.current === 'playing') e.preventDefault(); }}
             className={`relative overflow-hidden transition-all duration-100 flex flex-col items-center justify-center ${isFullscreen ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] rounded-none' : 'rounded-2xl border shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[60vh] md:min-h-[500px] md:aspect-video'} ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`} 
             style={{ background: isBoxDarkMode ? "#050505" : "#f3f4f6", touchAction: 'none', overscrollBehavior: gameState === 'playing' ? 'none' : 'auto' }}>
          
          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: `linear-gradient(${isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

          {/* Mobile Rotation Enforcer Overlay */}
          {showRotateWarning && gameState !== 'playing' && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-center p-6 backdrop-blur-sm">
              <div className="animate-bounce mb-6 text-blue-500"><RotateCcw className="w-16 h-16 mx-auto" /></div>
              <h3 className="text-2xl font-bold text-white mb-3">Rotate Device</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">Please rotate your device to landscape mode for the best playing experience.</p>
            </div>
          )}

          {/* Time Progress Bar */}
          {gameState === 'playing' && (
            <div className={`absolute top-0 left-0 right-0 h-1.5 z-[60] pointer-events-none ${isBoxDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
              <div className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} style={{ width: `${Math.min(100, (timeLeft / 60) * 100)}%` }} />
            </div>
          )}

          {/* In-Game HUD Targets (Cornered & Adaptive Size) */}
          {gameState === 'playing' && (
            <>
              {/* Left Target */}
              <div className={`absolute z-20 pointer-events-none flex flex-col items-start gap-0.5 sm:gap-1 ${isMobileLandscape ? 'top-2 left-2' : 'top-4 left-6 sm:top-6 sm:left-24'}`}>
                <span className={`tracking-widest font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded ${isMobileLandscape ? 'text-[8px]' : 'text-[9px] sm:text-xs'} ${isBoxDarkMode ? 'text-gray-400 bg-gray-900/80 border border-gray-800' : 'text-gray-600 bg-white/80 border border-gray-200'}`}>
                  LEFT TARGET
                </span>
                <span className={`leading-none mt-1 ${isMobileLandscape ? 'text-2xl' : 'text-3xl sm:text-7xl'} ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ textShadow: '0 0 20px rgba(96,165,250,0.5)' }}>
                  {leftTarget}
                </span>
              </div>
              
              {/* Right Target */}
              <div className={`absolute z-20 pointer-events-none flex flex-col items-end gap-0.5 sm:gap-1 ${isMobileLandscape ? 'top-2 right-2' : 'top-4 right-6 sm:top-6 sm:right-24'}`}>
                <span className={`tracking-widest font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded ${isMobileLandscape ? 'text-[8px]' : 'text-[9px] sm:text-xs'} ${isBoxDarkMode ? 'text-gray-400 bg-gray-900/80 border border-gray-800' : 'text-gray-600 bg-white/80 border border-gray-200'}`}>
                  RIGHT TARGET
                </span>
                <span className={`leading-none mt-1 ${isMobileLandscape ? 'text-2xl' : 'text-3xl sm:text-7xl'} ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ textShadow: '0 0 20px rgba(96,165,250,0.5)' }}>
                  {rightTarget}
                </span>
              </div>
            </>
          )}

          {/* Dividing Line & Spawning Containers */}
          {gameState === 'playing' && (
            <>
              <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent z-10 pointer-events-none" />
              <div ref={leftContainerRef} className="absolute top-0 left-0 w-1/2 h-full overflow-hidden" onPointerDown={() => gameState === 'playing' && applyPenalty('BACKGROUND CLICK')} />
              <div ref={rightContainerRef} className="absolute top-0 right-0 w-1/2 h-full overflow-hidden" onPointerDown={() => gameState === 'playing' && applyPenalty('BACKGROUND CLICK')} />
            </>
          )}

          {/* In-Game Fullscreen Controls - Hidden on Mobile Landscape to clear screen */}
          {isFullscreen && gameState === 'playing' && !isMobileLandscape && (
            <div className="absolute top-4 right-4 z-30 flex gap-2">
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); endGame(); startGame(); }} className="p-2.5 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); }} className="p-2.5 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onPointerDown={e => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="p-2.5 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          {/* Start Screen */}
          {gameState === 'start' && !showRotateWarning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-40 overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
              <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 border border-gray-700 bg-gray-900 shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                {!isMobileLandscape && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] pointer-events-none rotate-3">
                    <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                )}
                <h2 className="text-xl sm:text-3xl font-black mb-2 tracking-tight text-white pointer-events-none">Dual-Target Flow</h2>
                <p className="text-sm sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">Time-Attack multi-tracking. Starts easy with matching targets, diverges as speed increases.</p>
                
                <button onPointerDown={e => e.stopPropagation()} onClick={startGame} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0">
                  <Play className="w-5 h-5 fill-white" /> START DRILL
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/95 backdrop-blur-sm z-[70] animate-in fade-in duration-300 overflow-y-auto px-4 py-6" onPointerDown={e => e.stopPropagation()}>
               <div className="rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 bg-gray-950 flex flex-col max-h-[95vh] overflow-y-auto my-auto">
                 <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl text-center">
                   <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                   <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
                   <div className="relative z-10 flex flex-col items-center">
                     {isNewBest && (
                       <div className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                         ⭐ New Personal Best
                       </div>
                     )}
                     <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Time's Up!</h2>
                     <p className="text-blue-400 font-medium text-xs sm:text-sm">Dual-Target Flow • Peak Level {level}</p>
                   </div>
                 </div>

                 <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                   <div className="flex justify-between items-center mb-4 sm:mb-6">
                     <div className="flex flex-col">
                       <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                       <div className="flex items-end gap-1">
                         <span className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tighter">{score}</span>
                         <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">PTS</span>
                       </div>
                     </div>
                     
                     <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                       <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                         <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                         <path className={`${accuracy >= 80 ? 'text-green-500' : accuracy >= 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} strokeWidth="3" strokeDasharray="100" strokeDashoffset={`${100 - accuracy}`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className={`text-base sm:text-xl font-black ${accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</span>
                         <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Accuracy</span>
                       </div>
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-2 sm:gap-3">
                     <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                       <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Target Hits</div>
                       <div className="text-base sm:text-xl font-black text-green-400">{successfulHits}</div>
                     </div>
                     <div className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-800">
                       <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Mistakes</div>
                       <div className="text-base sm:text-xl font-black text-red-400">{misses}</div>
                     </div>
                   </div>
                 </div>

                 <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                   <button onPointerDown={e => e.stopPropagation()} onClick={() => { endGame(); startGame(); }} className="flex-1 py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-black tracking-wide hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-sm sm:text-base">
                     <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> PLAY AGAIN
                   </button>
                   <button onPointerDown={e => e.stopPropagation()} onClick={sharePage} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                     <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                   </button>
                   <button onPointerDown={e => e.stopPropagation()} onClick={handleExit} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                     <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                   </button>
                 </div>
               </div>
             </div>
          )}
        </div>

        {/* Instructions Below Fold */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className={`rounded-2xl border overflow-hidden shadow-xl pointer-events-none ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className={`px-6 py-5 border-b flex items-center gap-3 ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                <Info className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h2 className={`font-bold text-lg tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Instructions & Mechanics</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <RuleItem num="1" color="green" text="Correct Target" highlight="+10 PTS | +7s" result="Difficulty Up" isDark={isDarkMode} />
                  <RuleItem num="2" color="cyan" text="Avoid distractors & let them" highlight="Flow Out" result="Safe" isDark={isDarkMode} />
                  <RuleItem num="3" color="red" text="Wrong / Missed Target" highlight="-5 PTS | -3s" result="Difficulty Down" isDark={isDarkMode} />
                </div>
                <div className="space-y-4">
                  <RuleItem num="4" color="purple" text="Starts easy with" highlight="Matching Targets" result="Lv 1-2" isDark={isDarkMode} />
                  <RuleItem num="5" color="orange" text="Targets diverge & speed increases at" highlight="Lv 3+" result="Hardcore" isDark={isDarkMode} />
                  <RuleItem num="6" color="yellow" text="Targets Scramble" highlight="Every 25s" result="Stay Alert" isDark={isDarkMode} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About This Drill Section */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this dual-target flow drill">
            <div className={`rounded-2xl border overflow-hidden shadow-xl ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className={`px-6 py-5 border-b flex items-center gap-3 ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                <GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
                <h2 className={`font-bold text-lg tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About Dual-Target Flow</h2>
              </div>
              <div className="p-6 sm:p-8">
                <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This professional-grade cognitive drill tests <strong className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>divided attention</strong> and <strong className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>multi-target tracking</strong> by presenting two simultaneous streams of flowing shapes. The screen is divided into LEFT and RIGHT zones, each with an assigned target shape. You must click only shapes matching your assigned target for each side while ignoring distractors. The difficulty curve automatically adapts: as you succeed, the targets diverge and speeds increase dramatically.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-blue-50 border-blue-100'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gamers tracking multiple maps, students listening while processing notes, professionals managing complex workflows, and anyone improving multitasking under pressure.</p>
                  </div>
                  <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-green-50 border-green-100'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Divided attention, visual discrimination, parallel processing, impulse control, and sustained attention across independent visual streams.</p>
                  </div>
                  <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Net Score, precision accuracy, specific correct hits vs. total mistakes, and dynamic speed level adaptation.</p>
                  </div>
                </div>

                <div className={`p-5 rounded-xl border mb-8 ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-yellow-50 border-yellow-100'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div>
                    <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3>
                  </div>
                  <ul className={`text-xs space-y-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" /><strong>Peripheral Anchoring:</strong> Keep your gaze relatively centered. Rely on your peripheral vision to track incoming shapes instead of chasing them individually.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" /><strong>Inhibitory Control:</strong> Wait for visual confirmation before clicking. High-speed distractors will bait you into impulse taps.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" /><strong>Survival Mechanics:</strong> You must maintain accuracy to add time (+7s) and score (+10 PTS) back to your clock. Misses actively drain the clock (-3s). The max time ceiling is 60 seconds.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-blue-50 border-blue-100'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Info className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>How does the difficulty adapt?</h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>The engine maps directly to your precision. Every successful target scales the presentation speed upward. At Level 3, the targets diverge (e.g., Triangle on left, Star on right). If you miss or false-alarm, the engine dynamically reduces the difficulty level to allow you to recover your rhythm.</p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>What happens during a target scramble?</h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Every 25 seconds, the assigned target shapes randomize. This forcibly clears your working memory and tests extreme cognitive flexibility, demanding rapid adaptation to new rules while avoiding panic.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* Explore Related Drills Section */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Related drills">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-500 to-cyan-600"></div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/cognitive/attention/divided-attention" title="Divided Attention" desc="Manage dual-task streams with visual targets and math equations." color="blue" icon={<Eye className="w-4 h-4" />} isDark={isDarkMode} />
              <RelatedCard href="/drills/cognitive/attention/selective-attention" title="Selective Attention" desc="Focus on relevant information while ignoring visual distractors." color="cyan" icon={<Target className="w-4 h-4" />} isDark={isDarkMode} />
              <RelatedCard href="/drills/cognitive/attention/switch-cost" title="Context Switch Lab" desc="Dual-rule task switching between parity and magnitude." color="purple" icon={<Brain className="w-4 h-4" />} isDark={isDarkMode} />
              <RelatedCard href="/drills/memory/working-memory/n-back" title="N-Back Training" desc="Classic working memory task up to 3-back difficulty." color="orange" icon={<Star className="w-4 h-4" />} isDark={isDarkMode} />
            </div>
          </section>
        )}

        {/* Extended Footer */}
        {!isFullscreen && (
          <footer className={`mt-16 rounded-3xl py-12 px-8 border shadow-xl ${isDarkMode ? 'bg-gray-950 text-gray-400 border-gray-800' : 'bg-white text-gray-600 border-gray-200'}`} role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
                <div>
                  <h3 className={`font-bold mb-4 text-sm tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cognitive Training</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-blue-500 transition-colors">Divided Attention</Link></li>
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-blue-500 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-500 hover:text-blue-400 font-medium transition-colors mt-2 block">All 16 Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-4 text-sm tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Productivity</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/cognitive/attention/switch-cost" className="hover:text-blue-500 transition-colors">Context Switch Lab</Link></li>
                    <li><Link href="/drills/cognitive/problem-solving/priority-sorting" className="hover:text-blue-500 transition-colors">Priority Sorting</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-500 hover:text-blue-400 font-medium transition-colors mt-2 block">All 10 Productivity Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-4 text-sm tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Visual & Motor</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-blue-500 transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/visual/tracking-accuracy/multiple-targets" className="hover:text-blue-500 transition-colors">Ghost-Link Tracking</Link></li>
                    <li><Link href="/drills/visual" className="text-blue-500 hover:text-blue-400 font-medium transition-colors mt-2 block">All 14 Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-4 text-sm tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>FPS Training</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-blue-500 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps/target-acquisition" className="hover:text-blue-500 transition-colors">Target Acquisition</Link></li>
                    <li><Link href="/drills/fps" className="text-blue-500 hover:text-blue-400 font-medium transition-colors mt-2 block">All 21 FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-4 text-sm tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>More Sections</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/drills/academic" className="hover:text-blue-500 transition-colors">Academic (12 drills)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-blue-500 transition-colors">Mental Fitness (6 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-blue-500 transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className={`border-t pt-10 text-center ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className={`font-black text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SkillDrills</span>
                </div>
                <p className={`text-sm mb-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className={`text-xs max-w-2xl mx-auto leading-relaxed mb-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Free online dual-target flow drill. Train your divided attention by managing multiple visual streams simultaneously in an adaptive, high-speed Time-Attack challenge.
                </p>
                
                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Twitter / X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full shadow-md transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// ============================================================
// UI SUBCOMPONENTS
// ============================================================
function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl border p-2 sm:p-3 text-center flex flex-col justify-center h-full pointer-events-none transition-colors ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="mb-1 flex justify-center scale-90">{icon}</div>
      <p className={`text-sm sm:text-xl font-black tracking-tighter truncate leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {value}<span className="text-[10px] font-bold ml-0.5 text-gray-500">{unit}</span>
      </p>
      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result, isDark }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500 text-blue-600', 
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500 text-cyan-600', 
    red: 'bg-red-600 text-red-300 border-red-500 text-red-600', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500 text-purple-600',
    orange: 'bg-orange-600 text-orange-300 border-orange-500 text-orange-600',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500 text-yellow-600',
    green: 'bg-green-600 text-green-300 border-green-500 text-green-600'
  };
  const c = colorMap[color];
  const [bg, txtDark, border, txtLight] = c.split(' ');
  const txt = isDark ? txtDark : txtLight;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border ${isDark ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
      <div className={`w-8 h-8 rounded-xl ${bg} border flex items-center justify-center text-white font-black shadow-lg flex-shrink-0`}>{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{text} <span className={`font-black ${txt}`}>{highlight}</span></p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg border ${border} ${txt} whitespace-nowrap shadow-inner ${isDark ? 'bg-gray-900' : 'bg-white'}`}>{result}</div>
      </div>
    </div>
  );
}

function RelatedCard({ href, title, desc, color, icon, isDark }) {
  const gradients = {
    blue: 'from-blue-500 to-indigo-500',
    cyan: 'from-cyan-500 to-teal-500',
    purple: 'from-purple-500 to-violet-500',
    orange: 'from-orange-500 to-amber-500',
    green: 'from-green-500 to-emerald-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDark ? 'bg-gray-900 border-gray-800 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors shadow-inner ${isDark ? 'bg-black border-gray-700 text-gray-400 group-hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-500 group-hover:text-gray-900'}`}>
            {icon}
          </div>
        </div>
        <h3 className={`font-bold text-base mb-1.5 transition-colors tracking-tight ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>{title}</h3>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-blue-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}