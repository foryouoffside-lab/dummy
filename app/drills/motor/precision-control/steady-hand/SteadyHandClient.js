'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Route, Repeat, RefreshCw,
  Crosshair, Dumbbell, Database, Keyboard, Star, Users,
  GraduationCap, Lightbulb, TrendingUp, ArrowRight,
  CheckCircle2, Lock, AlertCircle, Share2, Copy
} from 'lucide-react';

export default function SteadyHandClient() {
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Rotate Your Device");

  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua) || 
                       (navigator.maxTouchPoints > 0 && 
                        window.screen && Math.max(window.screen.width, window.screen.height) < 1024);
      if (isMobile) {
        setShowRotateWarning(true);
        setWarningMessage("This drill cannot be played on mobile phones");
        return;
      }
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

  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [laps, setLaps] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestLapStreak, setBestLapStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [corridorWidth, setCorridorWidth] = useState(50);
  const [lapTime, setLapTime] = useState(45);
  const [bestLapTime, setBestLapTime] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const pointerLocked = true;
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  const pathRef = useRef([]);
  const lapsRef = useRef(0);
  const streakRef = useRef(0);
  const bestLapStreakRef = useRef(0);
  const scoreRef = useRef(0);
  const corridorWidthRef = useRef(50);
  const lapTimeRef = useRef(45);
  const bestLapTimeRef = useRef(0);
  const stateRef = useRef('WAITING');
  const failMsgRef = useRef("");
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const stripW = 20;
  const stripH = 120;
  const stripOffset = 40;
  const LAP_TIME_LIMIT = 45;

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 0); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('steadyHandBest'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('steadyHandBest') || '0', 10); if (fs > c) { localStorage.setItem('steadyHandBest', fs.toString()); setBestScore(fs); } } catch (e) {} }, []);
  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const a = initAudio(); if (!a) return; const o = a.createOscillator(), g = a.createGain(); o.connect(g); g.connect(a.destination); const n = a.currentTime; const fm = { lap: 880, fail: 300, streak: 1046.5, start: 660, penalty: 200, bestLap: 1318.5 }; o.frequency.setValueAtTime(fm[type] || 660, n); g.gain.setValueAtTime(type === 'penalty' || type === 'fail' ? 0.12 : 0.1, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.15); o.start(n); o.stop(n + 0.15); } catch (e) {} }, [soundEnabled, initAudio]);

  const requestPointerLock = useCallback(() => {}, []);
  
  

  

  useEffect(() => {
    const h = (e) => {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const scaleX = c.width / c.clientWidth;
      const scaleY = c.height / c.clientHeight;
      virtualCrosshair.current = {
        x: Math.max(0, Math.min(c.width, x * scaleX)),
        y: Math.max(0, Math.min(c.height, y * scaleY))
      };
    };
    document.addEventListener('mousemove', h);
    document.addEventListener('touchmove', h, { passive: true });
    document.addEventListener('touchstart', h, { passive: true });
    return () => {
      document.removeEventListener('mousemove', h);
      document.removeEventListener('touchmove', h);
      document.removeEventListener('touchstart', h);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const generatePath = useCallback((cvs) => { if (!cvs) return; const path = []; let curY = cvs.height / 2; const segments = 45; const startX = stripOffset + stripW; const endX = cvs.width - (stripOffset + stripW); const step = (endX - startX) / segments; for (let i = 0; i <= segments; i++) { if (i === 0 || i === segments) curY = cvs.height / 2; else { curY += (Math.random() - 0.5) * 300; curY = Math.max(150, Math.min(cvs.height - 150, curY)); } path.push({ x: startX + i * step, y: curY }); } pathRef.current = path; }, []);

  const applyPenalty = useCallback(() => { if (!isActiveRef.current) return; scoreRef.current = Math.max(0, scoreRef.current - 55); setScore(scoreRef.current); playSound('penalty'); showFeedback('✗ Mistake! -55 points', 'error'); }, [playSound, showFeedback]);

  const triggerFail = useCallback((msg, cvs) => {
    if (stateRef.current === 'FAIL') return;
    stateRef.current = 'FAIL';
    failMsgRef.current = msg;
    streakRef.current = 0;
    setStreak(0);
    corridorWidthRef.current = 50;
    setCorridorWidth(50);
    playSound('fail');
    applyPenalty();
    setTimeout(() => {
      if (cvs && isActiveRef.current) {
        stateRef.current = 'WAITING';
        failMsgRef.current = "";
        generatePath(cvs);
      }
    }, 1000);
  }, [playSound, applyPenalty, generatePath]);

  const checkCollision = useCallback((cvs) => {
    if (stateRef.current !== 'ACTIVE') return;
    if (lapTimeRef.current <= 0) {
      triggerFail("TIME EXPIRED", cvs);
      return;
    }
    
    const ch = virtualCrosshair.current;
    const startX = stripOffset + stripW;
    const endX = cvs.width - (stripOffset + stripW);
    
    // Allow cursor to be on start strip area
    if (ch.x <= startX) {
      return;
    }
    
    // Check if lap complete (reached right strip)
    if (ch.x >= endX) {
      lapsRef.current++;
      setLaps(lapsRef.current);
      const lct = LAP_TIME_LIMIT - lapTimeRef.current;
      if (bestLapTimeRef.current === 0 || lct < bestLapTimeRef.current) {
        bestLapTimeRef.current = lct;
        setBestLapTime(lct);
        playSound('bestLap');
        showFeedback(`🏆 Best Lap! ${lct.toFixed(1)}s`, 'success');
      }
      streakRef.current++;
      setStreak(streakRef.current);
      if (streakRef.current > bestLapStreakRef.current) {
        bestLapStreakRef.current = streakRef.current;
        setBestLapStreak(streakRef.current);
      }
      scoreRef.current += 55;
      setScore(scoreRef.current);
      if (scoreRef.current > bestScore) setBestScore(scoreRef.current);
      if (streakRef.current % 5 === 0 && streakRef.current > 0) {
        playSound('streak');
        showFeedback(`🔥 ${streakRef.current} Lap Streak! +55`, 'success');
      } else {
        playSound('lap');
        showFeedback(`✓ Lap ${lapsRef.current} Complete! +55`, 'success');
      }
      corridorWidthRef.current = Math.max(12, 50 - (streakRef.current * 2));
      setCorridorWidth(corridorWidthRef.current);
      stateRef.current = 'WAITING';
      generatePath(cvs);
      return;
    }
    
    // Check if cursor is on the path (within corridor)
    let onPath = false;
    
    for (let i = 0; i < pathRef.current.length - 1; i++) {
      const p1 = pathRef.current[i];
      const p2 = pathRef.current[i + 1];
      
      // Check if cursor X is within this segment's X range (with buffer)
      if (ch.x < p1.x - 5 || ch.x > p2.x + 5) {
        continue;
      }
      
      // Calculate Y position on the path at cursor's X
      const dx = p2.x - p1.x;
      if (dx === 0) continue; // Skip vertical segments (shouldn't happen)
      
      const t = (ch.x - p1.x) / dx;
      const pathY = p1.y + t * (p2.y - p1.y);
      
      // Check if cursor Y is within half corridor width of the path
      const halfWidth = corridorWidthRef.current / 2;
      if (Math.abs(ch.y - pathY) <= halfWidth) {
        onPath = true;
        break;
      }
    }
    
    if (!onPath) {
      triggerFail("OFF PATH", cvs);
      return;
    }
  }, [bestScore, generatePath, playSound, showFeedback, triggerFail]);

  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState !== 'playing' || !isActiveRef.current || !crosshairInitRef.current) return;
      const cvs = canvasRef.current;
      if (!cvs) return;
      const ch = virtualCrosshair.current;
      
      // Check if clicking on the left strip
      const isOnStartStrip = ch.x >= stripOffset && 
                             ch.x <= stripOffset + stripW && 
                             ch.y >= cvs.height / 2 - stripH / 2 && 
                             ch.y <= cvs.height / 2 + stripH / 2;
      
      if (stateRef.current === 'WAITING' && isOnStartStrip) {
        stateRef.current = 'ACTIVE';
        lapTimeRef.current = LAP_TIME_LIMIT;
        setLapTime(LAP_TIME_LIMIT);
        playSound('start');
        showFeedback('▶ Lap Started!', 'success');
      }
    };
    document.addEventListener('mousedown', h);
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => { document.removeEventListener('mousedown', h); document.removeEventListener('contextmenu', (e) => e.preventDefault()); };
  }, [gameState, playSound, showFeedback]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    
    const updateCanvasSize = () => {
      const cr = containerRef.current;
      if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9 / 16);
      if (h > rr.height) { h = rr.height; w = h * (16 / 9); }
      cvs.width = w;
      cvs.height = h;
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width - w) / 2}px`;
      cvs.style.top = `${(rr.height - h) / 2}px`;
      if (!crosshairInitRef.current) virtualCrosshair.current = { x: w / 2, y: h / 2 };
      generatePath(cvs);
    };
    
    const ro = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let lft = performance.now();
    
    function updateGame(dt) {
      if (!isActiveRef.current) return;
      if (stateRef.current === 'ACTIVE') {
        lapTimeRef.current -= dt;
        setLapTime(Math.max(0, lapTimeRef.current));
        checkCollision(cvs);
      }
    }
    
    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lft) / 1000);
      lft = now;
      updateGame(dt);
      
      // Background - ORIGINAL COLOR
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Grid - ORIGINAL STYLE
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, cvs.height);
        ctx.stroke();
      }
      
      // Draw path - ORIGINAL COLORS
      if (stateRef.current === 'ACTIVE' || stateRef.current === 'FAIL') {
        // Outer corridor - ORIGINAL COLOR
        ctx.beginPath();
        ctx.strokeStyle = stateRef.current === 'FAIL' 
          ? (isBoxDarkMode ? "#400" : "#fee") 
          : (isBoxDarkMode ? "#800" : "#fca5a5");
        ctx.lineWidth = corridorWidthRef.current;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(pathRef.current[0]?.x, pathRef.current[0]?.y);
        for (let i = 1; i < pathRef.current.length; i++) {
          ctx.lineTo(pathRef.current[i].x, pathRef.current[i].y);
        }
        ctx.stroke();
        
        // Center line - ORIGINAL COLOR
        ctx.beginPath();
        ctx.strokeStyle = stateRef.current === 'ACTIVE' 
          ? (isBoxDarkMode ? "#ff4444" : "#dc2626") 
          : (isBoxDarkMode ? "#200" : "#fecaca");
        ctx.lineWidth = 2;
        ctx.moveTo(pathRef.current[0]?.x, pathRef.current[0]?.y);
        for (let i = 1; i < pathRef.current.length; i++) {
          ctx.lineTo(pathRef.current[i].x, pathRef.current[i].y);
        }
        ctx.stroke();
      }
      
      // CROSSHAIR - ORIGINAL STYLE WITH VISIBILITY CIRCLE
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        const cc = pointerLocked ? '#00ff88' : '#ff4444';
        
        // Visibility circle (subtle outer ring for appearance)
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = pointerLocked ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 68, 68, 0.15)';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Outer circle - ORIGINAL
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = cc;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner dot - ORIGINAL
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = cc;
        ctx.fill();
        
        // Cross lines - ORIGINAL
        ctx.beginPath();
        ctx.moveTo(ch.x - 5, ch.y);
        ctx.lineTo(ch.x + 5, ch.y);
        ctx.moveTo(ch.x, ch.y - 5);
        ctx.lineTo(ch.x, ch.y + 5);
        ctx.strokeStyle = cc;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Start/End strips - ORIGINAL COLOR (white/black)
      const sY = cvs.height / 2 - stripH / 2;
      ctx.fillStyle = isBoxDarkMode ? "#ffffff" : "#000000";
      ctx.fillRect(stripOffset, sY, stripW, stripH);
      ctx.fillRect(cvs.width - (stripOffset + stripW), sY, stripW, stripH);
      
      // Timer bar - ORIGINAL
      if (stateRef.current === 'ACTIVE') {
        const barH = 3;
        const tp = lapTimeRef.current / LAP_TIME_LIMIT;
        ctx.fillStyle = lapTimeRef.current < 5 ? "#ff4444" : "#00ff88";
        ctx.fillRect(0, 0, cvs.width * tp, barH);
      }
      
      // Status text - ORIGINAL
      if (stateRef.current === 'WAITING') {
        ctx.fillStyle = isBoxDarkMode ? "#ffffff" : "#000000";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`LAP ${lapsRef.current + 1} READY`, cvs.width / 2, cvs.height / 2 - 20);
        ctx.fillStyle = isBoxDarkMode ? "#888" : "#666";
        ctx.font = "11px monospace";
        ctx.fillText("CLICK LEFT STRIP TO START", cvs.width / 2, cvs.height / 2 + 15);
      }
      
      if (stateRef.current === 'FAIL') {
        ctx.fillStyle = "#ff4444";
        ctx.font = "bold 18px monospace";
        ctx.textAlign = "center";
        // ctx.fillText(failMsgRef.current, cvs.width / 2, cvs.height / 2);
      }
      
      animationRef.current = requestAnimationFrame(draw);
    }
    
    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
      ro.disconnect();
    };
  }, [gameState, isBoxDarkMode, pointerLocked, checkCollision, generatePath]);

  const startGame = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLaps(0);
    setStreak(0);
    setBestLapStreak(0);
    setCorridorWidth(50);
    setLapTime(LAP_TIME_LIMIT);
    setBestLapTime(0);
    setFeedback('');
    isActiveRef.current = true;
    scoreRef.current = 0;
    lapsRef.current = 0;
    streakRef.current = 0;
    bestLapStreakRef.current = 0;
    corridorWidthRef.current = 50;
    lapTimeRef.current = LAP_TIME_LIMIT;
    bestLapTimeRef.current = 0;
    stateRef.current = 'WAITING';
    crosshairInitRef.current = false;
    if (canvasRef.current) generatePath(canvasRef.current);
    setTimeout(() => requestPointerLock(), 200);
    setTimeout(() => { crosshairInitRef.current = true; }, 400);
  }, [generatePath, requestPointerLock]);

  const resetGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false;
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setLaps(0);
    setStreak(0);
    setBestLapStreak(0);
    setCorridorWidth(50);
    setLapTime(LAP_TIME_LIMIT);
    setBestLapTime(0);
    setFeedback('');
    crosshairInitRef.current = false;
    
  }, []);

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Steady Hand Circuit | SkillDrills',
          text: 'Test your precision with this free path tracking challenge!',
          url: 'https://skilldrills.online/drills/motor/precision-control/steady-hand'
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText('https://skilldrills.online/drills/motor/precision-control/steady-hand');
    }
  };
  
  const copyPageLink = () => {
    navigator.clipboard.writeText('https://skilldrills.online/drills/motor/precision-control/steady-hand');
  };

  useEffect(() => () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
              <li><Link href="/drills/motor" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li>
              <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
              <li className={`font-medium ${isDarkMode?'text-red-400':'text-red-600'}`}>Steady Hand Circuit</li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
                <Route className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Steady Hand Trainer</h1>
                <p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>
                  {pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • 15pts/lap • 45s limit • Corridor shrinks
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button onClick={resetGame} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              
            </div>
          </div>
        )}

        {!isFullscreen && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-4 h-auto min-h-[88px] py-1">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" d={isDarkMode} />
            <StatCard icon={<Repeat className="text-green-600" />} value={laps} label="Laps" d={isDarkMode} />
            <StatCard icon={<Timer className={lapTime < 5 ? 'text-red-600' : 'text-cyan-600'} />} 
              value={lapTime.toFixed(1)} label="Lap Time" unit="s" d={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" d={isDarkMode} />
            <StatCard icon={<Clock className="text-purple-600" />} 
              value={bestLapTime > 0 ? bestLapTime.toFixed(1) : '-'} label="Best Lap" unit="s" d={isDarkMode} />
          </div>
        )}

        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 
            ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
            ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}>
            {feedback || '\u00A0'}
          </div>
        </div>

        <div ref={containerRef} 
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{
            background: isBoxDarkMode ? "#020202" : "#fff",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}>
          {/* Mobile Rotate Device Warning Overlay */}
      {showRotateWarning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-6" aria-hidden="true">
          <div className="animate-bounce mb-4 text-blue-500">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{warningMessage}</h3>
          <p className="text-sm text-gray-400 mb-6">{warningMessage === "This drill cannot be played on mobile phones" ? "This drill requires a physical mouse or keyboard and cannot be played on touchscreen devices." : "Please use landscape orientation or fullscreen mode for the best training experience."}</p>
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

          
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-20 opacity-0 pointer-events-none">
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none', touchAction: 'none' }} />
          
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Route className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Steady Hand Trainer</h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raw input • 15pts/lap • Corridor shrinks</p>
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}>
                  
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Click left strip to start. ESC to unlock. Click canvas to re-lock.</p>
                </div>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">
                  Start Training
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drill Rules - ORIGINAL */}
        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-red-400':'text-red-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Professional Features</h2></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-red-400':'text-red-600'}`}><Route className="w-5 h-5" />How to Play</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-red-400">Start Training</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-red-400">raw input</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Click left strip to <span className="font-semibold text-red-400">start lap</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Follow the <span className="font-semibold">red path</span> to right strip</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}><Trophy className="w-5 h-5" />Scoring</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+15</span><span><span className="font-semibold text-blue-400">Lap complete</span> = +15 points</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-15</span><span><span className="font-semibold text-red-400">Off path</span> = -15 points</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-15</span><span><span className="font-semibold text-orange-400">Timeout</span> = -15 points</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span><span><span className="font-semibold text-green-400">5 streak</span> combo bonus</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}><Zap className="w-5 h-5" />Pro Features</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li>
                      <li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-blue-400">Shrinking</span> corridor 50→12px</span></li>
                      <li className="flex items-start gap-2"><Timer className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-orange-400">Best lap</span> time tracking</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode?'text-red-400':'text-red-600'}`}/><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>About This Steady Hand Trainer</h2></div></div>
              <div className="p-5"><p className={`text-sm leading-relaxed mb-5 ${isDarkMode?'text-gray-300':'text-gray-600'}`}>This steady hand trainer drill develops hand-eye coordination, fine motor control, and path precision by challenging you to guide your cursor through a winding corridor from the start strip to the end strip. Guiding the cursor off path or timing out resets the lap. The corridor progressively shrinks under higher difficulty settings, testing your motor stability to the absolute limit. Perfect for surgical students, artists, gamers, and anyone looking to achieve precise fine-motor cursor movement control.</p><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5"><div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-red-50 border-red-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white"/></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Esports players, graphic designers, digital artists, and individuals seeking to improve hand stability and reduce hand tremors.</p></div><div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-blue-50 border-blue-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white"/></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Fine motor control, hand stability, path-tracking precision, spatial awareness, and mouse sensitivity mastery.</p></div><div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white"/></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Score, best score, streak count, completed laps, and best lap times.</p></div></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white"/></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Why Practice Steady Hand?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Builds precise cursor control for high-stakes scenarios</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Improves hand-eye coordination and spatial awareness</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Reduces hand tremors and improves motor stability</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white"/></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span> Start on Easy mode and focus on completing loops cleanly</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span> Hold the mouse with a relaxed grip to reduce muscle tension</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span> Slowly increase difficulty as your stability increases</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span> Train 5-10 minutes daily for optimal muscle memory development</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-red-500 to-orange-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/motor/precision-control/fine-motor" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><Crosshair className="w-4 h-4 text-emerald-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-emerald-400' : 'text-gray-900 group-hover:text-emerald-600'} transition-colors`}>Fine Motor Control</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Guiding cursor through narrow tracks without touching walls.</p><div className="flex items-center gap-1 mt-3 text-emerald-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/motor/precision-control/tracing" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Route className="w-4 h-4 text-teal-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Tracing Precision</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Trace complex geometrical shapes with accuracy and speed feedback.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/motor/hand-eye-coordination/aim-trainer" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Target className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Aim Trainer Elite</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Dynamic shrinking targets with streak tracking and 3-life protection system.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/motor/hand-eye-coordination/click-accuracy" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Target className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Click Accuracy</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Test and train click accuracy with variable target sizes and timing.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/processing-speed/reaction-time" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Zap className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Cognitive</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Reaction Time</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Visual response speed test to simple changes.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/motor/movement-speed/finger-sequencing" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Keyboard className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Finger Sequencing</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Test finger coordination by pressing corresponding keyboard keys rapidly.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/motor/movement-speed/gesture-speed" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Activity className="w-4 h-4 text-cyan-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>Gesture Speed</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Perform swift drag gestures to match indicators as fast as possible.</p><div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/flick-shot-training" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-pink-500' : 'bg-white border-gray-200 hover:border-pink-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center"><Crosshair className="w-4 h-4 text-pink-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-pink-400' : 'text-gray-900 group-hover:text-pink-600'} transition-colors`}>Flick Shot Trainer</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Raw input flick training with adaptive target windows.</p><div className="flex items-center gap-1 mt-3 text-pink-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
            </div>
          </section>
        )}
        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div><h3 className="text-white font-semibold mb-3 text-sm">Motor & FPS</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/motor/precision-control/steady-hand" className="hover:text-white transition-colors">Steady Hand Trainer</Link></li><li><Link href="/drills/motor/precision-control/fine-motor" className="hover:text-white transition-colors">Fine Motor Control</Link></li><li><Link href="/drills/motor" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Motor Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Memory</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory/working-memory/n-back" className="hover:text-white transition-colors">3-Back Training</Link></li><li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-white transition-colors">Color Sequence</Link></li><li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Memory Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Cognitive Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Academic Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">More</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual" className="hover:text-white transition-colors">Visual (14)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11)</Link></li></ul></div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online steady hand trainer with raw mouse input via Pointer Lock API. Guide cursor through shrinking paths to improve precision. No registration required.</p>
                <div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free drill"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button><a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a><a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a><a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a></div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', d }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${d?'text-white':'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${d?'text-gray-400':'text-gray-500'}`}>{label}</p>
    </div>
  );
}