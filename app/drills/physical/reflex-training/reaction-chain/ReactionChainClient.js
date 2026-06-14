'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Crosshair, Brain, Trophy, Info, Timer, TrendingUp, RefreshCw,
  Dumbbell, Database, Keyboard, Star, Users,
  GraduationCap, Lightbulb, ArrowRight, BookOpen, Hash, Code2, CheckCircle2, BarChart3, Heart,
  Lock, AlertCircle
} from 'lucide-react';

export default function ReactionChainClient() {
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
  
  // ============ ALL STATE ============
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [cursorSpeed, setCursorSpeed] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(400);
  const [arrestsCount, setArrestsCount] = useState(0);
  const [misses, setMisses] = useState(0);
  const [activeNodes, setActiveNodes] = useState(1);
  const pointerLocked = true;
  
  // ============ ALL REFS ============
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const crosshairInitRef = useRef(false);
  const nodesRef = useRef([]);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const cursorVelRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const speedRef = useRef(400);
  const arrestCountRef = useRef(0);
  const missesRef = useRef(0);
  const isFullscreenRef = useRef(false);
  const bestStreakRef = useRef(0);

  // ============ EFFECTS ============
  useEffect(() => { setIsClient(true); const timer = setTimeout(() => setLoading(false), 0); return () => clearTimeout(timer); }, []);
  useEffect(() => { try { const savedBestScore = localStorage.getItem('kineticArrestBestScore'); if (savedBestScore) { const parsed = parseInt(savedBestScore, 10); if (!isNaN(parsed)) setBestScore(parsed); } } catch (e) {} }, []);
  useEffect(() => { isFullscreenRef.current = isFullscreen; setActiveNodes(isFullscreen ? 2 : 1); }, [isFullscreen]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // ============ CALLBACKS ============
  const updateBestScore = useCallback((finalScore) => { try { const currentBest = parseInt(localStorage.getItem('kineticArrestBestScore') || '0', 10); if (finalScore > currentBest) { localStorage.setItem('kineticArrestBestScore', finalScore.toString()); setBestScore(finalScore); } } catch (e) {} }, []);
  const showFeedback = useCallback((message, type) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(message); setFeedbackType(type); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 800); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) { audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); } if (audioCtxRef.current.state === 'suspended') { audioCtxRef.current.resume(); } return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const audioCtx = initAudio(); if (!audioCtx) return; const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain(); osc.connect(gain); gain.connect(audioCtx.destination); const now = audioCtx.currentTime; const freqMap = { arrest: 880, miss: 330, streak: 1046.5, speedup: 1318.5 }; osc.frequency.setValueAtTime(freqMap[type] || 880, now); gain.gain.setValueAtTime(type === 'miss' ? 0.1 : 0.08, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15); osc.start(now); osc.stop(now + 0.15); } catch (e) {} }, [soundEnabled, initAudio]);

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const element = containerRef.current; if (element?.requestFullscreen) { await element.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) { await document.exitFullscreen(); } setIsFullscreen(false); } } catch (error) { console.error('Fullscreen error:', error); } }, [isFullscreen]);
  useEffect(() => { const handleFullscreenChange = () => { setIsFullscreen(!!document.fullscreenElement); }; document.addEventListener('fullscreenchange', handleFullscreenChange); return () => document.removeEventListener('fullscreenchange', handleFullscreenChange); }, []);

  // Pointer Lock
  const requestPointerLock = useCallback(() => {}, []);
  
  

  // Raw input
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

  // Timer
  useEffect(() => { if (gameState === 'playing' && timeLeft > 0) { timerIntervalRef.current = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; const finalScore = Math.floor(scoreRef.current); updateBestScore(finalScore); if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; }  return 0; } return prev - 1; }); }, 1000); } return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } }; }, [gameState, updateBestScore]);

  const spawnNode = useCallback((cvs) => { if (!cvs) return null; const side = Math.floor(Math.random() * 4); const isFullscreenMode = isFullscreenRef.current; const baseSpeed = isFullscreenMode ? 600 : 400; const scoreBonus = Math.min(scoreRef.current * 20, 500); const streakBonus = Math.min(streakRef.current * 15, 300); const speed = baseSpeed + scoreBonus + streakBonus; speedRef.current = speed; setCurrentSpeed(Math.round(speed)); let node; if (side === 0) { node = { x: -20, y: Math.random() * cvs.height, vx: speed, vy: 0, active: true }; } else if (side === 1) { node = { x: cvs.width + 20, y: Math.random() * cvs.height, vx: -speed, vy: 0, active: true }; } else if (side === 2) { node = { x: Math.random() * cvs.width, y: -20, vx: 0, vy: speed, active: true }; } else { node = { x: Math.random() * cvs.width, y: cvs.height + 20, vx: 0, vy: -speed, active: true }; } return node; }, []);

  const handleMiss = useCallback((nodeIndex) => { if (!isActiveRef.current) return; streakRef.current = 0; setStreak(0); missesRef.current += 1; setMisses(missesRef.current); if (nodeIndex !== undefined) { nodesRef.current.splice(nodeIndex, 1); } showFeedback('✗ Miss! Streak reset', 'warning'); playSound('miss'); setTimeout(() => { if (isActiveRef.current) { const isFullscreenMode = isFullscreenRef.current; const maxNodes = isFullscreenMode ? 2 : 1; while (nodesRef.current.length < maxNodes && isActiveRef.current) { const newNode = spawnNode(canvasRef.current); if (newNode) nodesRef.current.push(newNode); } } }, 300); }, [showFeedback, playSound, spawnNode]);

  const handleArrest = useCallback((nodeIndex) => { if (!isActiveRef.current) return; arrestCountRef.current += 1; setArrestsCount(arrestCountRef.current); const newStreak = streakRef.current + 1; streakRef.current = newStreak; setStreak(newStreak); if (newStreak > bestStreakRef.current) { bestStreakRef.current = newStreak; setBestStreak(newStreak); } const pointsEarned = 1 + Math.floor(newStreak / 5); scoreRef.current += pointsEarned; setScore(Math.floor(scoreRef.current)); nodesRef.current.splice(nodeIndex, 1); if (newStreak % 5 === 0 && newStreak > 0) { playSound('streak'); showFeedback(`🔥 ${newStreak} Streak! +${pointsEarned}`, 'success'); } else if (newStreak % 10 === 0 && newStreak > 0) { playSound('speedup'); showFeedback(`⚡ Speed increasing! +${pointsEarned}`, 'success'); } else { playSound('arrest'); showFeedback(`✓ Arrested! +${pointsEarned}`, 'success'); } setTimeout(() => { if (isActiveRef.current) { const isFullscreenMode = isFullscreenRef.current; const maxNodes = isFullscreenMode ? 2 : 1; while (nodesRef.current.length < maxNodes && isActiveRef.current) { const newNode = spawnNode(canvasRef.current); if (newNode) nodesRef.current.push(newNode); } } }, 150); }, [playSound, showFeedback, spawnNode]);

  // ============ RENDER LOOP ============
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const updateCanvasSize = () => { const container = containerRef.current; if (!container) return; const containerRect = container.getBoundingClientRect(); let width = containerRect.width; let height = width * (9 / 16); if (height > containerRect.height) { height = containerRect.height; width = height * (16 / 9); } cvs.width = width; cvs.height = height; canvasSizeRef.current = { width: width, height: height }; cvs.style.position = 'absolute'; cvs.style.left = `${(containerRect.width - width) / 2}px`; cvs.style.top = `${(containerRect.height - height) / 2}px`; if(!crosshairInitRef.current) virtualCrosshair.current = { x: width/2, y: height/2 }; if (isActiveRef.current) { const isFullscreenMode = isFullscreenRef.current; const maxNodes = isFullscreenMode ? 2 : 1; nodesRef.current = []; for (let i = 0; i < maxNodes; i++) { const newNode = spawnNode(cvs); if (newNode) nodesRef.current.push(newNode); } } };
    const resizeObserver = new ResizeObserver(updateCanvasSize); if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    function draw() { const now = performance.now(); const dt = (now - lastTimeRef.current) / 1000; lastTimeRef.current = now; const ch = virtualCrosshair.current; const velX = ch.x - lastMouseRef.current.x; const velY = ch.y - lastMouseRef.current.y; cursorVelRef.current = Math.hypot(velX, velY); setCursorSpeed(Math.round(cursorVelRef.current * 10) / 10); lastMouseRef.current.x = ch.x; lastMouseRef.current.y = ch.y; if (isActiveRef.current) { const isFullscreenMode = isFullscreenRef.current; const maxNodes = isFullscreenMode ? 2 : 1; while (nodesRef.current.length > maxNodes) { nodesRef.current.pop(); } while (nodesRef.current.length < maxNodes) { const newNode = spawnNode(cvs); if (newNode) nodesRef.current.push(newNode); } } for (let i = nodesRef.current.length - 1; i >= 0; i--) { const node = nodesRef.current[i]; if (!node || !node.active) continue; node.x += node.vx * dt; node.y += node.vy * dt; const dist = Math.hypot(ch.x - node.x, ch.y - node.y); if (dist < 20 && isActiveRef.current) { if (cursorVelRef.current < 1.5) { handleArrest(i); break; } else { handleMiss(i); break; } } const padding = 100; if (node.x < -padding || node.x > cvs.width + padding || node.y < -padding || node.y > cvs.height + padding) { handleMiss(i); break; } } ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height); ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'; ctx.lineWidth = 1; for (let i = 0; i < cvs.width; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke(); } ctx.fillStyle = isBoxDarkMode ? "#0a0a0a" : "#e5e7eb"; ctx.font = "bold 120px Courier New"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; // ctx.fillText(scoreRef.current, cvs.width / 2, cvs.height / 2); nodesRef.current.forEach(node => { if (!node || !node.active) return; const speedIntensity = Math.min(1, (speedRef.current - 400) / 800); ctx.beginPath(); ctx.arc(node.x, node.y, 10, 0, Math.PI * 2); if (speedIntensity > 0.5) { const g = Math.floor(255 * (1 - speedIntensity)); ctx.fillStyle = `rgb(255, ${g}, 0)`; ctx.strokeStyle = `rgb(255, ${g}, 0)`; } else { ctx.fillStyle = "#00ff88"; ctx.strokeStyle = "#00ff88"; } ctx.fill(); const angle = Math.atan2(node.vy, node.vx); ctx.beginPath(); ctx.moveTo(node.x, node.y); ctx.lineTo(node.x - Math.cos(angle) * 15, node.y - Math.sin(angle) * 15); ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 2; ctx.stroke(); ctx.beginPath(); ctx.arc(node.x, node.y, 20, 0, Math.PI * 2); ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + speedIntensity * 0.4})`; ctx.lineWidth = 1; ctx.stroke(); }); if (isFullscreenRef.current && isActiveRef.current) { ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; ctx.font = '12px monospace'; ctx.textAlign = 'left'; ctx.fillText('FULLSCREEN MODE • 2x NODES • HIGH SPEED • NO PENALTY', 10, 20); }
      // Professional crosshair
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) { const isStill = cursorVelRef.current < 1.5; ctx.beginPath(); ctx.arc(ch.x, ch.y, 15, 0, Math.PI * 2); ctx.strokeStyle = pointerLocked ? (isStill ? "#00ff88" : "rgba(255,255,255,0.6)") : "#ff4444"; ctx.lineWidth = 2; ctx.stroke(); ctx.beginPath(); ctx.arc(ch.x, ch.y, 20, 0, Math.PI * 2); ctx.strokeStyle = pointerLocked ? (isStill ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.15)') : 'rgba(255,68,68,0.3)'; ctx.lineWidth = 1; ctx.stroke(); ctx.beginPath(); ctx.moveTo(ch.x - 24, ch.y); ctx.lineTo(ch.x - 10, ch.y); ctx.moveTo(ch.x + 10, ch.y); ctx.lineTo(ch.x + 24, ch.y); ctx.moveTo(ch.x, ch.y - 24); ctx.lineTo(ch.x, ch.y - 10); ctx.moveTo(ch.x, ch.y + 10); ctx.lineTo(ch.x, ch.y + 24); ctx.strokeStyle = pointerLocked ? (isStill ? "#00ff88" : "rgba(255,255,255,0.6)") : "#ff4444"; ctx.stroke(); ctx.fillStyle = pointerLocked ? (isStill ? "#00ff88" : "rgba(255,255,255,0.6)") : "#ff4444"; ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill(); ctx.font = "10px monospace"; ctx.textAlign = "center"; ctx.fillStyle = pointerLocked ? (isStill ? "#00ff88" : "rgba(255,255,255,0.6)") : "#ff4444"; ctx.fillText(isStill ? "ARREST READY" : `VEL: ${cursorVelRef.current.toFixed(1)}`, ch.x, ch.y - 25); } animationRef.current = requestAnimationFrame(draw); }
    animationRef.current = requestAnimationFrame(draw);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); resizeObserver.disconnect(); };
  }, [gameState, isBoxDarkMode, pointerLocked, spawnNode, handleArrest, handleMiss]);

  const startGame = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}
 if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); setGameState('playing'); gameStateRef.current = 'playing'; setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(60); setFeedback(''); setCursorSpeed(0); setCurrentSpeed(isFullscreenRef.current ? 600 : 400); setArrestsCount(0); setMisses(0); setActiveNodes(isFullscreenRef.current ? 2 : 1); isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0; speedRef.current = isFullscreenRef.current ? 600 : 400; arrestCountRef.current = 0; missesRef.current = 0; nodesRef.current = []; crosshairInitRef.current = false; if (canvasRef.current) { const maxNodes = isFullscreenRef.current ? 2 : 1; for (let i = 0; i < maxNodes; i++) { const newNode = spawnNode(canvasRef.current); if (newNode) nodesRef.current.push(newNode); } } setTimeout(()=>requestPointerLock(),200); setTimeout(()=>{crosshairInitRef.current=true;},400); }, [spawnNode, requestPointerLock]);
  const resetGame = useCallback(() => { if (animationRef.current) cancelAnimationFrame(animationRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); isActiveRef.current = false; setGameState('start'); gameStateRef.current = 'start'; setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(60); setFeedback(''); setCursorSpeed(0); setCurrentSpeed(400); setArrestsCount(0); setMisses(0); setActiveNodes(1); nodesRef.current = []; crosshairInitRef.current = false;  }, []);
  useEffect(() => { return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);  }; }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Reaction Chain Drill | SkillDrills', text: 'Train precision stopping and impulse control. Free!', url: 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/physical/reflex-training/reaction-chain'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/physical/reflex-training/reaction-chain'); alert('Link copied!'); };

  if (loading || !isClient) { return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading reaction chain drill...</p></div></div>); }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li><Link href="/drills/physical" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Physical Drills</Link></li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Reflex Training</li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} aria-current="page">Reaction Chain</li>
            </ol>
          </nav>
        )}
        
        {/* Header */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex-shrink-0"><Crosshair className="w-6 h-6 text-white" /></div>
              <div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reaction Chain</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}> Precision stopping • Impulse control</p></div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {gameState === 'playing' && (<button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset session" aria-label="Reset reaction chain drill"><RefreshCw className="w-5 h-5" /></button>)}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={isDarkMode ? 'Light mode' : 'Dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle drill area theme" title="Toggle drill area theme"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} title={soundEnabled ? 'Mute' : 'Unmute'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
              
            </div>
          </div>
        )}

        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Free Reaction Chain Drill - Precision Stopping & Impulse Control Training for Reflex Development</h2>
          <p>Train precision stopping and impulse control with this free kinetic arrest drill. Nodes travel across the screen at speeds from 400 to 1400 px per second scaling with your score and streak. Stop your cursor completely when a node passes under it to arrest it. Each arrest earns base points plus streak bonuses. No penalties for misses only streak resets. Fullscreen mode doubles active nodes and base speed. Perfect for reflex training motor inhibition and cognitive control development. No registration required.</p>
        </section>

        {/* Stats Grid */}
        {!isFullscreen && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-4 h-auto min-h-[88px] py-1">
            <StatCard icon={<Target className="text-green-500" />} value={score} label="Score" isDark={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
            <StatCard icon={<TrendingUp className="text-orange-500" />} value={currentSpeed} label="Speed" unit="px/s" isDark={isDarkMode} />
            <StatCard icon={<Zap className="text-purple-500" />} value={streak} label="Streak" isDark={isDarkMode} />
            <StatCard icon={<Activity className="text-blue-500" />} value={`${activeNodes}x`} label="Nodes" isDark={isDarkMode} />
          </div>
        )}

        {/* Feedback */}
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-orange-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div></div>

        {/* Game Container */}
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'none' }}>
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
          <Link href="/drills/physical">
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
            <div className="absolute top-4 right-4 z-20">
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', touchAction: 'none' }} aria-label="Reaction chain canvas - stop cursor on moving nodes to arrest them" />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4"><Crosshair className="w-16 h-16 text-green-500 mx-auto" aria-hidden="true" /></div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Reaction Chain</h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raw input • Stop cursor on nodes • No penalties</p>
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}>
                  
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Stop cursor on moving nodes. ESC to unlock. Click canvas to re-lock.</p>
                </div>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" aria-label="Start free reaction chain training">Start Free Drill</button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h2></div>
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Regular reaction chain training improves impulse control and precision stopping for gaming and daily tasks.</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Arrests" value={arrestsCount} icon={<Crosshair className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Peak Speed" value={currentSpeed} unit="px/s" icon={<TrendingUp className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                  <ResultCard label="Misses" value={misses} icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                </div>
                <div className="flex gap-3">
                  <Link href="/drills/physical" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link>
                  <button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Play Again →</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============ 1. DRILL RULES & INSTRUCTIONS ============ */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h2></div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Stop cursor completely</span> when node passes under it</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-blue-500">No penalties!</span> • Miss only resets streak</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ring turns <span className="font-semibold text-green-500">green</span> when still enough to arrest</p></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fullscreen = <span className="font-semibold text-orange-500">2x simultaneous nodes</span> + higher speed</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5-streak = <span className="font-semibold text-cyan-500">+1 bonus point</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Node colors: <span className="font-semibold text-green-500">Green→Orange→Red</span> as speed increases</p></div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🎯 Green ring = Arrest Ready • Red ring = Moving too fast</span>
                  <span>⚡ Speed: 400-1400 px/s • Pure skill-based scoring • Free forever</span>
                </div>
              </div>
            </div>
          </footer>
        )}

        {/* ============ 2. ABOUT THIS DRILL ============ */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this reaction chain drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Reaction Chain Drill</h2></div>
              </div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This free reaction chain drill trains precision stopping and impulse control by having you arrest moving nodes with your cursor. Nodes travel at speeds from 400 to 1400 px/s that scale with your performance. Stop your cursor completely when a node passes under it to score. No penalties for misses - only streak resets. Fullscreen mode doubles the challenge.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gamers wanting better mouse control, anyone improving impulse inhibition, and those seeking precision motor training.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-emerald-50 border-emerald-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Precision stopping, impulse control, motor inhibition, cursor control, and reaction decision-making.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, arrests, streak, misses, peak speed, and best performance across sessions.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Impulse Control?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Essential for precise mouse movements in FPS games</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Builds motor inhibition for better cursor control</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> No penalties encourage risk-free practice</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span> Watch the cursor ring - green means ready to arrest</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span> Stop completely when a node approaches your cursor</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span> Build streaks for bonus points and higher speeds</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span> Practice 2-3 times daily for best improvement in 1-2 weeks</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============ 3. RELATED DRILLS ============ */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related training drills and resources">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-green-500 to-emerald-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/physical/reflex-training/drop-catch" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><Target className="w-4 h-4 text-green-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Reflex Training</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} transition-colors`}>Drop Catch</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Test visual reaction speed by catching falling objects before they hit the ground.</p><div className="flex items-center gap-1 mt-3 text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/physical/reflex-training/quick-dodge" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Zap className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Reflex Training</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Quick Dodge</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Dodge incoming obstacles with rapid directional movements and quick reactions.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/motor/hand-eye-coordination/aim-trainer" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Crosshair className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor Skills</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Aim Trainer</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Hand-eye coordination training with target acquisition and precision clicking.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/flick-shot-training" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Target className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS Training</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Flick Shot Training</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Improve one-tap accuracy for Valorant, CS2, and competitive FPS games.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/processing-speed/reaction-time" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Timer className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Processing Speed</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Reaction Time</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Test and improve visual reaction speed with simple click response.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/motor/precision-control/steady-hand" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Activity className="w-4 h-4 text-teal-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Precision Control</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Steady Hand</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Navigate through narrow paths without touching the walls.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/reactive-tracking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center"><Crosshair className="w-4 h-4 text-indigo-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS Training</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} transition-colors`}>Reactive Tracking</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Track targets that change direction randomly for reactive aim skills.</p><div className="flex items-center gap-1 mt-3 text-indigo-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/productivity/focus-endurance/deep-work" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-rose-500' : 'bg-white border-gray-200 hover:border-rose-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center"><Brain className="w-4 h-4 text-rose-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Productivity</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-rose-400' : 'text-gray-900 group-hover:text-rose-600'} transition-colors`}>Deep Work Timer</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Build focus endurance with structured deep work sessions.</p><div className="flex items-center gap-1 mt-3 text-rose-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
            </div>
          </section>
        )}

        {/* ============ 4. GLOBAL FOOTER ============ */}
        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online reaction chain drill for precision stopping and impulse control training. Arrest moving nodes by stopping your cursor with adaptive speed 400-1400 px/s. No penalties for misses. Perfect for FPS gaming mouse control motor inhibition and reflex development. No registration required. More free drills at skilldrills.online.</p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free reaction chain drill"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button>
                  <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button>
                  <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>);
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = { emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' } };
  const colors = colorMap[color] || colorMap.emerald;
  return (<div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}><div className="flex items-center gap-2 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span></div>);
}