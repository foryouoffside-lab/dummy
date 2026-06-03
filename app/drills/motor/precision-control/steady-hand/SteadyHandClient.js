'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Route, Repeat, RefreshCw,
  Crosshair, Dumbbell, Database, Keyboard, Star, Users,
  GraduationCap, Lightbulb, TrendingUp, ArrowRight,
  CheckCircle2, Lock, AlertCircle
} from 'lucide-react';

export default function SteadyHandClient() {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
  const [pointerLocked, setPointerLocked] = useState(false);
  
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

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('steadyHandBest'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('steadyHandBest') || '0', 10); if (fs > c) { localStorage.setItem('steadyHandBest', fs.toString()); setBestScore(fs); } } catch (e) {} }, []);
  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const a = initAudio(); if (!a) return; const o = a.createOscillator(), g = a.createGain(); o.connect(g); g.connect(a.destination); const n = a.currentTime; const fm = { lap: 880, fail: 300, streak: 1046.5, start: 660, penalty: 200, bestLap: 1318.5 }; o.frequency.setValueAtTime(fm[type] || 660, n); g.gain.setValueAtTime(type === 'penalty' || type === 'fail' ? 0.12 : 0.1, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.15); o.start(n); o.stop(n + 0.15); } catch (e) {} }, [soundEnabled, initAudio]);

  const requestPointerLock = useCallback(() => { canvasRef.current?.requestPointerLock(); }, []);
  
  useEffect(() => {
    const h = () => { const l = document.pointerLockElement === canvasRef.current; setPointerLocked(l); if (l) crosshairInitRef.current = true; else if (gameState === 'playing') showFeedback('Cursor unlocked - Click canvas', 'error'); };
    document.addEventListener('pointerlockchange', h);
    document.addEventListener('pointerlockerror', () => showFeedback('Lock failed', 'error'));
    return () => { document.removeEventListener('pointerlockchange', h); };
  }, [gameState, showFeedback]);

  useEffect(() => { const c = canvasRef.current; if (!c) return; const h = () => { if (gameState === 'playing' && !pointerLocked) requestPointerLock(); }; c.addEventListener('click', h); return () => c.removeEventListener('click', h); }, [gameState, pointerLocked, requestPointerLock]);

  useEffect(() => {
    const h = (e) => { if (document.pointerLockElement !== canvasRef.current) return; virtualCrosshair.current.x += e.movementX || 0; virtualCrosshair.current.y += e.movementY || 0; const c = canvasRef.current; if (c) { virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x)); virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y)); } };
    document.addEventListener('mousemove', h);
    return () => document.removeEventListener('mousemove', h);
  }, []);

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const generatePath = useCallback((cvs) => { if (!cvs) return; const path = []; let curY = cvs.height / 2; const segments = 45; const startX = stripOffset + stripW; const endX = cvs.width - (stripOffset + stripW); const step = (endX - startX) / segments; for (let i = 0; i <= segments; i++) { if (i === 0 || i === segments) curY = cvs.height / 2; else { curY += (Math.random() - 0.5) * 300; curY = Math.max(150, Math.min(cvs.height - 150, curY)); } path.push({ x: startX + i * step, y: curY }); } pathRef.current = path; }, []);

  const applyPenalty = useCallback(() => { if (!isActiveRef.current) return; scoreRef.current = Math.max(0, scoreRef.current - 15); setScore(scoreRef.current); playSound('penalty'); showFeedback('✗ Mistake! -15 points', 'error'); }, [playSound, showFeedback]);

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
      scoreRef.current += 15;
      setScore(scoreRef.current);
      if (scoreRef.current > bestScore) setBestScore(scoreRef.current);
      if (streakRef.current % 5 === 0 && streakRef.current > 0) {
        playSound('streak');
        showFeedback(`🔥 ${streakRef.current} Lap Streak! +15`, 'success');
      } else {
        playSound('lap');
        showFeedback(`✓ Lap ${lapsRef.current} Complete! +15`, 'success');
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
        ctx.fillText(failMsgRef.current, cvs.width / 2, cvs.height / 2);
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
    document.exitPointerLock();
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
    document.exitPointerLock();
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
              <button onClick={pointerLocked ? () => document.exitPointerLock() : requestPointerLock} 
                className={`p-2 rounded-lg border ${pointerLocked ? 'bg-green-500 border-green-600 text-white' : isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                <Lock className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {!isFullscreen && (
          <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
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
          
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-20 opacity-0 pointer-events-none">
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />
          
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Route className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Steady Hand Trainer</h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raw input • 15pts/lap • Corridor shrinks</p>
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <p className={`text-sm font-medium ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>Raw Input via Pointer Lock</p>
                  </div>
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