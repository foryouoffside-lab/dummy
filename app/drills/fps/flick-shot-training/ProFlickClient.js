'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Check, Crosshair,
  Lock, AlertCircle, RefreshCw, ArrowRight,
  GraduationCap, Lightbulb, TrendingUp, Clock,
  BookOpen, Brain, Hash, Code2, Keyboard
} from 'lucide-react';

const TARGET_SIZE = 50;
const TARGET_DURATION_START = 700;
const TARGET_DURATION_END = 600;
const SPAWN_INTERVAL = 800;

const GAME_MULTIPLIERS = {
  valorant: 0.07, cs2: 1, overwatch: 0.0066, apex: 0.022, fortnite: 0.01, quake: 0.022
};

export default function ProFlickClient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bestReaction, setBestReaction] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [lives, setLives] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [currentTargetDuration, setCurrentTargetDuration] = useState(TARGET_DURATION_START);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(0.35);
  const [gameType, setGameType] = useState('valorant');
  const [cmPer360, setCmPer360] = useState(0);
  const sensitivityMultiplierRef = useRef(1);
  const [analyticsData, setAnalyticsData] = useState({
    overshoots: 0, undershoots: 0, totalShots: 0,
    reactionTimes: [], motorTimes: [],
    pathEfficiency: 0, averageDeviation: 0,
    anglePerformance: Array(8).fill(null).map(() => ({ hits: 0, misses: 0 }))
  });
  
  const targetRef = useRef(null);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const lastSpawnTimeRef = useRef(0);
  const timeLeftRef = useRef(60);
  const livesRef = useRef(5);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const bestComboRef = useRef(0);
  const currentTargetDurationRef = useRef(TARGET_DURATION_START);
  const movementHistoryRef = useRef([]);
  const crosshairInitializedRef = useRef(false);

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('proFlickBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  useEffect(() => {
    const multiplier = GAME_MULTIPLIERS[gameType] || 0.07;
    const counts = 360 / (multiplier * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));
    sensitivityMultiplierRef.current = 51.4 / cm;
    try { localStorage.setItem('proFlickDpi', dpi.toString()); localStorage.setItem('proFlickSens', inGameSens.toString()); localStorage.setItem('proFlickGame', gameType); } catch (e) {}
  }, [dpi, inGameSens, gameType]);

  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 1500); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);

  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const ctx = initAudio(); if (!ctx) return; const o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); const now = ctx.currentTime; const f = { success: 880, fail: 440, combo: 1046, penalty: 220 }; o.frequency.setValueAtTime(f[type] || 440, now); g.gain.setValueAtTime(type==='combo'?0.12:type==='penalty'?0.15:0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.15); o.start(now); o.stop(now+0.15); } catch (e) {} }, [soundEnabled, initAudio]);
  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('proFlickBestScore') || '0', 10); if (fs > c) { localStorage.setItem('proFlickBestScore', fs.toString()); setBestScore(fs); } } catch (e) {} }, []);

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const requestPointerLock = useCallback(() => { if (!lockCooldown && canvasRef.current) canvasRef.current.requestPointerLock(); }, [lockCooldown]);

  useEffect(() => {
    const handlePointerChange = () => { const locked = document.pointerLockElement === canvasRef.current; setPointerLocked(locked); if (locked) crosshairInitializedRef.current = true; else if (gameState === 'playing') { setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); } };
    const handlePointerError = () => { setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); };
    document.addEventListener('pointerlockchange', handlePointerChange); document.addEventListener('pointerlockerror', handlePointerError);
    return () => { document.removeEventListener('pointerlockchange', handlePointerChange); document.removeEventListener('pointerlockerror', handlePointerError); };
  }, [gameState]);

  useEffect(() => { const canvas = canvasRef.current; if (!canvas) return; const handleCanvasClick = () => { if (gameState === 'playing' && !pointerLocked && !lockCooldown) requestPointerLock(); }; canvas.addEventListener('click', handleCanvasClick); return () => canvas.removeEventListener('click', handleCanvasClick); }, [gameState, pointerLocked, requestPointerLock, lockCooldown]);

  const calculateTargetDuration = useCallback((tr) => { const progress = (60 - tr) / 60; return Math.round(TARGET_DURATION_START - (progress * (TARGET_DURATION_START - TARGET_DURATION_END))); }, []);
  function spawnTarget() { const c = canvasRef.current; if (!c) return null; const pad = TARGET_SIZE; return { x: Math.random() * (c.width - pad * 2) + pad, y: Math.random() * (c.height - pad * 2) + pad, startTime: performance.now() }; }

  const analyzeShot = useCallback((targetPos, clickPos, reactionTime) => {
    const distance = Math.hypot(clickPos.x - targetPos.x, clickPos.y - targetPos.y);
    const angle = Math.atan2(clickPos.y - targetPos.y, clickPos.x - targetPos.x) * (180 / Math.PI);
    const normalizedAngle = ((angle + 360) % 360); const angleSector = Math.floor(normalizedAngle / 45) % 8;
    setAnalyticsData(prev => {
      const newData = { ...prev }; newData.totalShots++; newData.anglePerformance = [...prev.anglePerformance]; newData.anglePerformance[angleSector] = { ...newData.anglePerformance[angleSector] };
      if (distance <= TARGET_SIZE / 2) { newData.anglePerformance[angleSector].hits++; newData.reactionTimes = [...prev.reactionTimes, reactionTime].slice(-50); }
      else { if (distance < TARGET_SIZE / 2) newData.undershoots++; else newData.overshoots++; newData.anglePerformance[angleSector].misses++; }
      newData.averageDeviation = ((prev.averageDeviation * (prev.totalShots)) + distance) / (prev.totalShots + 1);
      const pathLength = movementHistoryRef.current.reduce((acc, move, i, arr) => { if (i === 0) return acc; return acc + Math.hypot(move.x - arr[i-1].x, move.y - arr[i-1].y); }, 0);
      newData.pathEfficiency = Math.hypot(clickPos.x - targetPos.x, clickPos.y - targetPos.y) / (pathLength || 1);
      return newData;
    });
  }, []);

  const handleShot = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current || !crosshairInitializedRef.current) return;
    const currentTarget = targetRef.current; const now = performance.now(); const clickPos = { ...virtualCrosshair.current };
    if (currentTarget) { const elapsed = now - currentTarget.startTime; const currentDuration = currentTargetDurationRef.current; const distance = Math.hypot(currentTarget.x - clickPos.x, currentTarget.y - clickPos.y);
      if (elapsed < currentDuration) {
        if (distance < TARGET_SIZE / 2) { scoreRef.current += 1; setScore(scoreRef.current); hitsRef.current++; setSuccessfulHits(hitsRef.current); comboRef.current++; setCombo(comboRef.current); if (comboRef.current > bestComboRef.current) { bestComboRef.current = comboRef.current; setBestCombo(comboRef.current); } if (bestReaction === 0 || elapsed < bestReaction) setBestReaction(Math.round(elapsed)); playSound('success'); if (comboRef.current % 5 === 0) { playSound('combo'); showFeedback(`🔥 ${comboRef.current} Combo! (${Math.round(elapsed)}ms)`, 'success'); } else showFeedback(`✓ +1 | ${Math.round(elapsed)}ms`, 'success'); targetRef.current = null; analyzeShot(currentTarget, clickPos, elapsed); }
        else { missesRef.current++; setMissedHits(missesRef.current); comboRef.current = 0; setCombo(0); if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); playSound('fail'); showFeedback(`⚠️ Missed! (${distance.toFixed(0)}px) -1 life`, 'error'); } else { scoreRef.current = Math.max(0, scoreRef.current-1); setScore(scoreRef.current); playSound('penalty'); showFeedback('💔 No lives! -1 point', 'error'); } targetRef.current = null; analyzeShot(currentTarget, clickPos, elapsed); }
      } else { comboRef.current = 0; setCombo(0); if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); playSound('fail'); showFeedback('⏰ Too slow! -1 life', 'error'); } else { scoreRef.current = Math.max(0, scoreRef.current-1); setScore(scoreRef.current); playSound('penalty'); showFeedback('💔 No lives! -1 point', 'error'); } targetRef.current = null; }
    } else { comboRef.current = 0; setCombo(0); if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); playSound('fail'); showFeedback('❌ No target! -1 life', 'error'); } else { scoreRef.current = Math.max(0, scoreRef.current-1); setScore(scoreRef.current); playSound('penalty'); showFeedback('💔 No lives! -1 point', 'error'); } }
  }, [playSound, showFeedback, analyzeShot, bestReaction]);

  useEffect(() => { const handleMouseDown = (e) => { if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return; if (gameState === 'playing') { e.preventDefault(); handleShot(); } }; document.addEventListener('mousedown', handleMouseDown); return () => document.removeEventListener('mousedown', handleMouseDown); }, [gameState, handleShot]);

  const startTimer = useCallback(() => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); timerIntervalRef.current = setInterval(() => { if (gameStateRef.current === 'playing' && isActiveRef.current) { timeLeftRef.current -= 1; setTimeLeft(timeLeftRef.current); currentTargetDurationRef.current = calculateTargetDuration(timeLeftRef.current); setCurrentTargetDuration(currentTargetDurationRef.current); if (timeLeftRef.current <= 0) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; const total = hitsRef.current + missesRef.current; setAccuracy(total===0?100:Math.round((hitsRef.current/total)*100)); updateBestScore(scoreRef.current); document.exitPointerLock(); } } }, 1000); }, [updateBestScore, calculateTargetDuration]);

  useEffect(() => {
    if (gameState !== 'playing') return; const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');
    const updateSize = () => { const cr = containerRef.current; if (!cr) return; const rr = cr.getBoundingClientRect(); let w = rr.width, h = w * (9/16); if (h > rr.height) { h = rr.height; w = h * (16/9); } cvs.width = w; cvs.height = h; canvasSizeRef.current = { width: w, height: h }; cvs.style.position = 'absolute'; cvs.style.left = `${(rr.width-w)/2}px`; cvs.style.top = `${(rr.height-h)/2}px`; if (!crosshairInitializedRef.current) virtualCrosshair.current = { x: w/2, y: h/2 }; };
    updateSize(); lastSpawnTimeRef.current = performance.now();
    function draw(ct) { if (!isActiveRef.current) { animationRef.current = requestAnimationFrame(draw); return; } ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height); ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1; for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      if (!targetRef.current && gameStateRef.current === 'playing') { if (ct - lastSpawnTimeRef.current >= SPAWN_INTERVAL) { targetRef.current = spawnTarget(); lastSpawnTimeRef.current = ct; } }
      if (targetRef.current) { const elapsed = ct - targetRef.current.startTime; const dur = currentTargetDurationRef.current; if (elapsed < dur) { const opacity = Math.max(0.3, 1 - (elapsed/dur) * 0.7); ctx.shadowBlur = 15; ctx.shadowColor = "#00ff88"; ctx.fillStyle = `rgba(0,255,136,${opacity})`; ctx.beginPath(); ctx.arc(targetRef.current.x, targetRef.current.y, TARGET_SIZE/2, 0, Math.PI*2); ctx.fill(); ctx.strokeStyle = `rgba(255,255,255,${opacity})`; ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.arc(targetRef.current.x, targetRef.current.y, TARGET_SIZE/6, 0, Math.PI*2); ctx.fillStyle = `rgba(255,255,255,${opacity})`; ctx.fill(); ctx.shadowBlur = 0; } else targetRef.current = null; }
      const ch = virtualCrosshair.current; if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) { ctx.strokeStyle = pointerLocked ? "#00ff88" : "#ff4444"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(ch.x-24, ch.y); ctx.lineTo(ch.x-10, ch.y); ctx.moveTo(ch.x+10, ch.y); ctx.lineTo(ch.x+24, ch.y); ctx.moveTo(ch.x, ch.y-24); ctx.lineTo(ch.x, ch.y-10); ctx.moveTo(ch.x, ch.y+10); ctx.lineTo(ch.x, ch.y+24); ctx.stroke(); ctx.fillStyle = pointerLocked ? "#00ff88" : "#ff4444"; ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI*2); ctx.fill(); } animationRef.current = requestAnimationFrame(draw); }
    animationRef.current = requestAnimationFrame(draw); const hr = () => { cancelAnimationFrame(animationRef.current); updateSize(); animationRef.current = requestAnimationFrame(draw); }; window.addEventListener('resize', hr); const ro = new ResizeObserver(() => hr()); if (containerRef.current) ro.observe(containerRef.current);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', hr); ro.disconnect(); targetRef.current = null; };
  }, [gameState, isBoxDarkMode, pointerLocked]);

  const startGame = useCallback(() => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); setAnalyticsData({ overshoots: 0, undershoots: 0, totalShots: 0, reactionTimes: [], motorTimes: [], pathEfficiency: 0, averageDeviation: 0, anglePerformance: Array(8).fill(null).map(() => ({ hits: 0, misses: 0 })) }); setGameState('playing'); gameStateRef.current = 'playing'; setScore(0); setSuccessfulHits(0); setMissedHits(0); setCombo(0); setBestCombo(0); timeLeftRef.current = 60; setTimeLeft(60); setBestReaction(0); setAccuracy(100); setLives(5); setFeedback(''); isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0; livesRef.current = 5; hitsRef.current = 0; missesRef.current = 0; targetRef.current = null; lastSpawnTimeRef.current = performance.now(); currentTargetDurationRef.current = TARGET_DURATION_START; setCurrentTargetDuration(TARGET_DURATION_START); crosshairInitializedRef.current = false; movementHistoryRef.current = []; startTimer(); setTimeout(() => requestPointerLock(), 300); setTimeout(() => { crosshairInitializedRef.current = true; }, 500); }, [startTimer, requestPointerLock]);
  const resetGame = useCallback(() => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); isActiveRef.current = false; setGameState('start'); gameStateRef.current = 'start'; targetRef.current = null; setFeedback(''); setFeedbackType(''); crosshairInitializedRef.current = false; document.exitPointerLock(); setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); }, []);
  useEffect(() => () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); if (animationRef.current) cancelAnimationFrame(animationRef.current); }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Pro Flick Training Tool | SkillDrills', text: 'Train flick shots with raw mouse input. Free!', url: 'https://skilldrills.online/drills/fps/pro-smooth-pursuit' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/fps/pro-smooth-pursuit'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/fps/pro-smooth-pursuit'); alert('Link copied!'); };

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>);

  const avgReaction = analyticsData.reactionTimes.length > 0 ? Math.round(analyticsData.reactionTimes.reduce((a,b) => a+b, 0) / analyticsData.reactionTimes.length) : 0;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
              <li><Link href="/drills/fps" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>FPS Drills</Link></li>
              <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
              <li className={`font-medium ${isDarkMode?'text-green-400':'text-green-600'}`}>Pro Flick Trainer</li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl"><Crosshair className="w-6 h-6 text-white" /></div>
              <div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Pro Flick Trainer</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>{pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas to lock'} • {cmPer360}cm/360 • {gameType} • Free aim training</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Theme">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Box theme"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Fullscreen">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
              <button onClick={pointerLocked ? () => { document.exitPointerLock(); setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); } : requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked?'bg-green-500 border-green-600 text-white':isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Pointer lock"><Lock className="w-5 h-5" /></button>
            </div>
          </div>
        )}
        
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Free Pro Flick Training Tool - Raw Mouse Input Aim Trainer for Valorant CS2 Apex Overwatch</h2>
          <p>Train your flick shots with raw mouse input and sensitivity matching for Valorant CS2 Apex Legends Overwatch and more. 60 second challenge with dynamic target speed 700ms to 600ms. Features pointer lock API for no acceleration raw input shot analysis including overshoots undershoots reaction time and path efficiency. 5 lives system with combo streaks and performance tracking. Free no sign-up required.</p>
        </section>

        {!isFullscreen && (
          <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" dark={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" dark={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft<=10?'text-red-600':'text-green-600'} />} value={timeLeft} label="Time" unit="s" dark={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={combo} label="Combo" dark={isDarkMode} />
            <StatCard icon={<Check className="text-green-500" />} value={successfulHits} label="Hits" dark={isDarkMode} />
            <StatCard icon={<Activity className="text-purple-500" />} value={currentTargetDuration} label="Speed" unit="ms" dark={isDarkMode} />
            <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" dark={isDarkMode} />
          </div>
        )}
        
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':'bg-red-500'}`}>{feedback || '\u00A0'}</div></div>
        
        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?"#020202":"#fff",aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb',overflow:'hidden'}}>
          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-20 pointer-events-none"><span className="text-white/40 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">Press <span className="text-white/70 font-bold">ESC</span> to exit fullscreen</span></div>)}
          <canvas ref={canvasRef} style={{display:'block',position:'absolute',cursor:'none'}} />
          
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><Crosshair className="w-16 h-16 text-green-500 mx-auto mb-4" /><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Pro Flick Trainer</h2><p className={`mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Raw mouse input • Sensitivity matched • 60s challenge</p><div className={`mb-4 p-3 rounded-lg ${isBoxDarkMode?'bg-gray-700':'bg-gray-50'}`}><p className={`text-sm ${isBoxDarkMode?'text-gray-400':'text-gray-600'}`}>{cmPer360}cm/360 • {gameType} • {dpi} DPI • {inGameSens} sens</p></div><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Free Drill</button></div></div>)}
          
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" /><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete</h2></div><div className="grid grid-cols-2 gap-3 mb-4"><RCard label="Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" dark={isBoxDarkMode} /><RCard label="Best" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" dark={isBoxDarkMode} /><RCard label="Hits" value={successfulHits} icon={<Check className="w-4 h-4" />} color="emerald" dark={isBoxDarkMode} /><RCard label="Combo" value={bestCombo} icon={<Zap className="w-4 h-4" />} color="orange" dark={isBoxDarkMode} /><RCard label="Reaction" value={bestReaction||'-'} unit="ms" icon={<Timer className="w-4 h-4" />} color="cyan" dark={isBoxDarkMode} /><RCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" dark={isBoxDarkMode} /></div>
            {analyticsData.totalShots > 0 && (<div className={`mb-4 p-3 rounded-lg border ${isBoxDarkMode?'border-gray-600 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><h3 className={`text-sm font-semibold mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-700'}`}>Shot Analysis</h3><div className="grid grid-cols-2 gap-2"><div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Overshoots</p><p className="text-lg font-bold text-red-400">{analyticsData.overshoots}</p></div><div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Undershoots</p><p className="text-lg font-bold text-blue-400">{analyticsData.undershoots}</p></div><div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Avg Reaction</p><p className="text-lg font-bold">{avgReaction}ms</p></div><div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Path Efficiency</p><p className="text-lg font-bold text-purple-400">{(analyticsData.pathEfficiency*100).toFixed(0)}%</p></div></div></div>)}
            {analyticsData.overshoots > analyticsData.undershoots * 1.5 && (<div className={`mb-4 p-2 rounded-lg text-sm ${isBoxDarkMode?'bg-red-900/20 border border-red-800 text-red-400':'bg-red-50 border border-red-200 text-red-600'}`}>💡 You're overshooting - lower sensitivity may help</div>)}
            <div className="flex gap-3"><Link href="/drills/fps" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300':'bg-gray-200 text-gray-700'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold">Train Again →</button></div></div></div>)}
        </div>
        
        {/* DRILL RULES */}
        {!isFullscreen && (<footer className="mt-6"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-green-400':'text-green-600'}`} /><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Scoring</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Click <span className="font-semibold text-green-500">green targets</span> before they disappear</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Hit: <span className="font-semibold text-blue-500">+1 point</span> • Every 5 hits = combo</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Miss: <span className="font-semibold text-red-500">-1 life</span> • After 0 lives: -1 point</p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Targets: <span className="font-semibold text-purple-500">700ms → 600ms</span> over 60s</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Raw input via <span className="font-semibold text-yellow-500">Pointer Lock API</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Sensitivity matched: <span className="font-semibold text-orange-500">{cmPer360}cm/360</span></p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}><span>🎯 Pro-grade flick training • Shot analysis included</span><span>🏆 Best Score saves locally • Free forever</span></div></div></div></footer>)}

        {/* ABOUT THIS DRILL */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this pro flick trainer">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Pro Flick Trainer</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This free pro flick training tool uses raw mouse input via the Pointer Lock API for no-acceleration aim practice. Sensitivity is matched to your game (Valorant, CS2, Overwatch, Apex, Fortnite, Quake) with real-time cm/360 calculation. Dynamic target speed scales from 700ms to 600ms over 60 seconds.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Competitive FPS players (Valorant, CS2, Overwatch, Apex, Fortnite, Quake) wanting to improve flick shot accuracy with sensitivity-matched training.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Flick shot accuracy, target acquisition speed, mouse control precision, reaction time, and path efficiency.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><Activity className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, hits, combo streaks, reaction time, accuracy, overshoots/undershoots, path efficiency, and angle performance.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Use Raw Input Training?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><Check className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Eliminates Windows mouse acceleration</li><li className="flex items-start gap-2"><Check className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Sensitivity matched to your game</li><li className="flex items-start gap-2"><Check className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Builds true 1:1 muscle memory</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span> Set your game's sensitivity and DPI</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span> Click canvas to lock cursor for raw input</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span> Click green targets as they appear</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span> Practice 10-15 minutes daily for best results</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related training drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-green-500 to-emerald-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/fps/flick-shot-training" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><Crosshair className="w-4 h-4 text-green-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} transition-colors`}>Flick Shot Training</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Standard flick training with adjustable target size and speed.</p><div className="flex items-center gap-1 mt-3 text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/reactive-tracking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Target className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Reactive Tracking</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Track targets that change direction randomly.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/360fps-reflex" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Zap className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>360 FPS Reflex</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Ultra-fast reflex training at 360 FPS for high refresh rate.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/headshot-trainer" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Crosshair className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Headshot Trainer</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Practice headshot-only aiming with smaller hitboxes.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/visual/reaction-speed/light-reaction" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-yellow-500' : 'bg-white border-gray-200 hover:border-yellow-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center"><Timer className="w-4 h-4 text-yellow-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-yellow-400' : 'text-gray-900 group-hover:text-yellow-600'} transition-colors`}>Reaction Time Test</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Test and improve your visual reaction speed.</p><div className="flex items-center gap-1 mt-3 text-yellow-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/motor/hand-eye-coordination/aim-trainer" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Target className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Hand-Eye Coordination</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>General aim trainer for hand-eye coordination.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
            </div>
          </section>
        )}

        {/* GLOBAL FOOTER */}
        {!isFullscreen && (<footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps/headshot-trainer" className="hover:text-white transition-colors">Headshot Trainer</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-white" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free pro flick training tool with raw mouse input and sensitivity matching for Valorant CS2 Overwatch Apex Legends Fortnite and Quake. Dynamic target speed 700-600ms with shot analysis overshoots undershoots reaction time and path efficiency tracking. No registration required. More free drills at skilldrills.online.</p><div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button><a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a><a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a><a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', dark }) {
  return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${dark?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${dark?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${dark?'text-gray-400':'text-gray-500'}`}>{label}</p></div>);
}

function RCard({ label, value, unit = '', icon, color, dark }) {
  const m = { blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500', orange:'bg-orange-500/10 border-orange-500/30 text-orange-500', purple:'bg-purple-500/10 border-purple-500/30 text-purple-500', cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' };
  const c = m[color] || m.blue; const [bg, border, text] = c.split(' ');
  return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{icon}</div><span className={`text-xs sm:text-sm truncate ${dark?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{value}{unit}</span></div>);
}