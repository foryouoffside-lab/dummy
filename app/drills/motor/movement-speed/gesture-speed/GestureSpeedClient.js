'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Move, Heart, RefreshCw,
  GraduationCap, Lightbulb, TrendingUp, CheckCircle2, Star, ArrowRight, Share2, Copy,
  Lock, AlertCircle, Crosshair
} from 'lucide-react';

export default function GestureSpeedClient() {
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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [successfulRecoils, setSuccessfulRecoils] = useState(0);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  const gateRef = useRef({ active: false, x: 0, y: 0, angle: 0, timer: 0.35 });
  const stateRef = useRef('CENTER');
  const particlesRef = useRef([]);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const livesRef = useRef(3);
  const totalAttemptsRef = useRef(0);
  const successfulRecoilsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const limitRef = useRef(0.35);
  const gateHitProcessedRef = useRef(false);
  const cycleCompletedRef = useRef(false);

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('vectorRecoilBest'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('vectorRecoilBest') || '0', 10); if (fs > c) { localStorage.setItem('vectorRecoilBest', fs.toString()); setBestScore(fs); } } catch (e) {} }, []);
  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const ctx = initAudio(); if (!ctx) return; const o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); const n = ctx.currentTime; const f = { gateHit: 880, success: 1200, fail: 300, streak: 1500, penalty: 200, click: 660 }; o.frequency.setValueAtTime(f[type] || 660, n); g.gain.setValueAtTime(type === 'penalty' ? 0.15 : type === 'streak' ? 0.1 : 0.08, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.15); o.start(n); o.stop(n + 0.15); } catch (e) {} }, [soundEnabled, initAudio]);

  // Pointer Lock
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

  const addPenalty = useCallback((reason) => { if (!isActiveRef.current) return; streakRef.current = 0; setStreak(0); if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); showFeedback(`✗ ${reason}! -1 life`, 'error'); playSound('penalty'); if (livesRef.current === 0) showFeedback('No lives left! Penalties active!', 'warning'); } else { scoreRef.current = Math.max(0, scoreRef.current - 1); setScore(scoreRef.current); playSound('penalty'); showFeedback(`✗ ${reason}! -1 point`, 'error'); } }, [showFeedback, playSound]);

  const initParticles = useCallback((cvs) => { const p = []; for (let i = 0; i < 40; i++) p.push({ a: Math.random() * Math.PI * 2, r: 150 + Math.random() * 150 }); particlesRef.current = p; }, []);

  const spawnGate = useCallback((cvs) => { const cx = cvs.width / 2, cy = cvs.height / 2; const angle = Math.random() * Math.PI * 2; const dist = 220 + Math.random() * 80; gateRef.current = { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist, angle: angle, timer: limitRef.current, active: true }; stateRef.current = 'FLICKING'; gateHitProcessedRef.current = false; cycleCompletedRef.current = false; }, []);

  // Shot handler using virtual crosshair
  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState !== 'playing' || !isActiveRef.current || !crosshairInitRef.current) return;
      const ch = virtualCrosshair.current; const cvs = canvasRef.current; if (!cvs) return;
      const cx = cvs.width / 2, cy = cvs.height / 2;
      const onCenter = Math.hypot(ch.x - cx, ch.y - cy) < 20;

      if (stateRef.current === 'FLICKING' && gateRef.current.active && !gateHitProcessedRef.current) {
        const gate = gateRef.current;
        const distToGate = Math.hypot(ch.x - gate.x, ch.y - gate.y);
        if (distToGate < 35) { gateHitProcessedRef.current = true; playSound('gateHit'); showFeedback('✓ Gate hit! Return to center', 'success'); gateRef.current.active = false; stateRef.current = 'RETURNING'; return; }
        if (distToGate < 60 && distToGate >= 35) addPenalty('Near miss');
        else if (distToGate >= 60 && !onCenter) { addPenalty('Miss'); playSound('click'); }
      }
    };
    document.addEventListener('mousedown', h);
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => { document.removeEventListener('mousedown', h); document.removeEventListener('contextmenu', (e) => e.preventDefault()); };
  }, [gameState, addPenalty, playSound, showFeedback]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    timerIntervalRef.current = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); updateBestScore(scoreRef.current); document.exitPointerLock(); return 0; } return prev - 1; }); }, 1000);
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [gameState, updateBestScore]);

  // Render loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');
    const updateCanvasSize = () => { const cr = containerRef.current; if (!cr) return; const rr = cr.getBoundingClientRect(); let w = rr.width, h = w * (9 / 16); if (h > rr.height) { h = rr.height; w = h * (16 / 9); } cvs.width = w; cvs.height = h; cvs.style.position = 'absolute'; cvs.style.left = `${(rr.width - w) / 2}px`; cvs.style.top = `${(rr.height - h) / 2}px`; if (!crosshairInitRef.current) virtualCrosshair.current = { x: w / 2, y: h / 2 }; initParticles(cvs); };
    const ro = new ResizeObserver(updateCanvasSize); if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    let lft = performance.now();

    function updateGame(dt) {
      if (!isActiveRef.current) return;
      const cx = cvs.width / 2, cy = cvs.height / 2;
      const ch = virtualCrosshair.current;
      const onCenter = Math.hypot(ch.x - cx, ch.y - cy) < 20;
      if (stateRef.current === 'CENTER') { if (onCenter) spawnGate(cvs); }
      else if (stateRef.current === 'FLICKING') { if (gateRef.current.active) { if (!onCenter) gateRef.current.timer -= dt; if (gateRef.current.timer <= 0) { addPenalty('Timeout'); gateRef.current.active = false; stateRef.current = 'CENTER'; gateHitProcessedRef.current = false; cycleCompletedRef.current = false; } } }
      else if (stateRef.current === 'RETURNING') { if (onCenter && gateHitProcessedRef.current && !cycleCompletedRef.current) { cycleCompletedRef.current = true; totalAttemptsRef.current++; successfulRecoilsRef.current++; setSuccessfulRecoils(successfulRecoilsRef.current); streakRef.current++; setStreak(streakRef.current); if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); } scoreRef.current += 1; setScore(scoreRef.current); playSound('success'); if (streakRef.current % 5 === 0) { playSound('streak'); showFeedback(`🔥 ${streakRef.current} STREAK!`, 'success'); } else showFeedback('✓ Complete cycle! +1', 'success'); stateRef.current = 'CENTER'; gateHitProcessedRef.current = false; } }
    }

    function draw() { const now = performance.now(); const dt = Math.min(0.033, (now - lft) / 1000); lft = now; updateGame(dt);
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      const cx = cvs.width / 2, cy = cvs.height / 2;
      const ch = virtualCrosshair.current;
      const onCenter = Math.hypot(ch.x - cx, ch.y - cy) < 20;

      ctx.strokeStyle = isBoxDarkMode ? "#1a1a1a" : "#e0e0e0"; ctx.lineWidth = 1;
      particlesRef.current.forEach(p => { p.a += 0.005; const px = cx + Math.cos(p.a) * p.r; const py = cy + Math.sin(p.a) * p.r; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 4, py + 4); ctx.stroke(); });

      ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      if (onCenter || stateRef.current === 'CENTER') { ctx.fillStyle = "#00ff88"; ctx.shadowColor = "#00ff88"; ctx.shadowBlur = 10; }
      else { ctx.fillStyle = "rgba(0,255,136,0.3)"; ctx.shadowBlur = 0; }
      ctx.fill(); ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.strokeStyle = onCenter ? "#00ff88" : "rgba(0,255,136,0.5)"; ctx.lineWidth = 2; ctx.stroke();

      const gate = gateRef.current;
      if (gate.active && stateRef.current === 'FLICKING') {
        const tp = gate.timer / limitRef.current;
        ctx.beginPath(); ctx.arc(gate.x, gate.y, 30, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * tp)); ctx.strokeStyle = tp > 0.3 ? "#00ff88" : "#ff4444"; ctx.lineWidth = 3; ctx.stroke();
        ctx.beginPath(); ctx.arc(gate.x, gate.y, 25, 0, Math.PI * 2);
        const distToGate = Math.hypot(ch.x - gate.x, ch.y - gate.y);
        const isHoveringGate = distToGate < 35;
        if (isHoveringGate) { ctx.fillStyle = "rgba(0,255,136,0.15)"; ctx.fill(); ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 3.5; }
        else { ctx.strokeStyle = `rgba(0,255,136,${gate.timer})`; ctx.lineWidth = 2.5; }
        ctx.stroke();
        ctx.beginPath(); ctx.arc(gate.x, gate.y, 8, 0, Math.PI * 2); ctx.fillStyle = isHoveringGate ? "#00ff88" : "rgba(0,255,136,0.5)"; ctx.fill();
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(gate.angle) * 50, cy + Math.sin(gate.angle) * 50); ctx.strokeStyle = "rgba(0,255,136,0.2)"; ctx.lineWidth = 2; ctx.stroke();
        const ax = cx + Math.cos(gate.angle) * 50, ay = cy + Math.sin(gate.angle) * 50;
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax - Math.cos(gate.angle - 0.8) * 12, ay - Math.sin(gate.angle - 0.8) * 12); ctx.lineTo(ax - Math.cos(gate.angle + 0.8) * 12, ay - Math.sin(gate.angle + 0.8) * 12); ctx.closePath(); ctx.fillStyle = "rgba(0,255,136,0.3)"; ctx.fill();
        if (isHoveringGate) { ctx.fillStyle = "#00ff88"; ctx.font = "bold 10px monospace"; ctx.textAlign = "center"; ctx.fillText('CLICK', gate.x, gate.y - 35); }
      }
      if (stateRef.current === 'RETURNING') { ctx.beginPath(); ctx.moveTo(ch.x, ch.y); ctx.lineTo(cx, cy); ctx.strokeStyle = "rgba(0,255,136,0.4)"; ctx.lineWidth = 2; ctx.setLineDash([8, 6]); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = "#00ff88"; ctx.font = "bold 10px monospace"; ctx.textAlign = "center"; ctx.fillText('Return to center for +1', cx, cy - 40); }

      // Original crosshair style preserved
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 10, 0, Math.PI * 2); ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 4, 0, Math.PI * 2); ctx.fillStyle = "#00ff88"; ctx.fill();
        ctx.strokeStyle = "rgba(0,255,136,0.3)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(ch.x - 20, ch.y); ctx.lineTo(ch.x - 14, ch.y); ctx.moveTo(ch.x + 14, ch.y); ctx.lineTo(ch.x + 20, ch.y);
        ctx.moveTo(ch.x, ch.y - 20); ctx.lineTo(ch.x, ch.y - 14); ctx.moveTo(ch.x, ch.y + 14); ctx.lineTo(ch.x, ch.y + 20); ctx.stroke();
      }

      ctx.fillStyle = "#00ff88"; ctx.font = "bold 11px monospace"; ctx.textAlign = "center";
      if (stateRef.current === 'FLICKING') ctx.fillText('→ CLICK THE GATE (0.35s) →', cvs.width / 2, 35);
      else if (stateRef.current === 'RETURNING') ctx.fillText('← RETURN TO CENTER FOR +1 ←', cvs.width / 2, 35);
      else if (stateRef.current === 'CENTER' && onCenter) ctx.fillText('✓ ON CENTER - GATE SPAWNING', cvs.width / 2, 35);
      animationRef.current = requestAnimationFrame(draw);
    }
    animationRef.current = requestAnimationFrame(draw);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, pointerLocked, addPenalty, spawnGate, initParticles, playSound, showFeedback]);

  const startGame = useCallback(() => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); setGameState('playing'); gameStateRef.current = 'playing'; setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(60); setLives(3); setFeedback(''); setSuccessfulRecoils(0); isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0; livesRef.current = 3; totalAttemptsRef.current = 0; successfulRecoilsRef.current = 0; stateRef.current = 'CENTER'; gateRef.current = { active: false, x: 0, y: 0, angle: 0, timer: 0.35 }; gateHitProcessedRef.current = false; cycleCompletedRef.current = false; crosshairInitRef.current = false; if (canvasRef.current) initParticles(canvasRef.current); setTimeout(() => requestPointerLock(), 200); setTimeout(() => { crosshairInitRef.current = true; }, 400); showFeedback('0.35s to click gate!', 'success'); }, [initParticles, requestPointerLock, showFeedback]);

  const resetGame = useCallback(() => { if (animationRef.current) cancelAnimationFrame(animationRef.current); isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setGameState('start'); gameStateRef.current = 'start'; setFeedback(''); setFeedbackType(''); crosshairInitRef.current = false; document.exitPointerLock(); }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Vector Recoil | SkillDrills', text: 'Train flick-and-return mouse gestures!', url: 'https://skilldrills.online/drills/motor/movement-speed/gesture-speed' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/motor/movement-speed/gesture-speed'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/motor/movement-speed/gesture-speed'); };

  useEffect(() => () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); document.exitPointerLock(); }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (<nav className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li><Link href="/drills/motor" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li className={`font-medium ${isDarkMode?'text-blue-400':'text-blue-600'}`}>Vector Recoil</li></ol></nav>)}
        
        {!isFullscreen && (<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl"><Move className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Vector Recoil Trainer</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>{pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • 0.35s gate • Return to center</p></div></div><div className="flex gap-2">{gameState==='playing'&&<button onClick={resetGame} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><RefreshCw className="w-5 h-5" /></button>}<button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5"/></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen?<Minimize2 className="w-5 h-5"/>:<Maximize2 className="w-5 h-5"/>}</button><button onClick={pointerLocked?()=>document.exitPointerLock():requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked?'bg-green-500 border-green-600 text-white':isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Lock className="w-5 h-5"/></button></div></div>)}

        {!isFullscreen && (<div className="grid grid-cols-7 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} /><StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" d={isDarkMode} /><StatCard icon={<Timer className={timeLeft<15?'text-red-600':'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} /><StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" d={isDarkMode} /><StatCard icon={<Trophy className="text-amber-600" />} value={bestStreak} label="Best Stk" d={isDarkMode} /><StatCard icon={<Move className="text-cyan-600" />} value={successfulRecoils} label="Cycles" d={isDarkMode} /><StatCard icon={<Heart className={lives>0?'text-red-500':'text-gray-500'} />} value={lives} label="Lives" d={isDarkMode} /></div>)}

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':feedbackType==='warning'?'bg-yellow-500':'bg-red-500'}`}>{feedback||'\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?"#020202":"#fff",aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb',overflow:'hidden'}}>
          {isFullscreen&&gameState==='playing'&&(<div className="absolute top-4 right-4 z-20 opacity-0 pointer-events-none"><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70"><Minimize2 className="w-5 h-5"/></button></div>)}
          <canvas ref={canvasRef} style={{display:'block',position:'absolute',cursor:'none'}} />
          
          {gameState==='start'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><Move className="w-16 h-16 text-blue-500 mx-auto mb-4" /><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Vector Recoil Trainer</h2><p className={`mb-4 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Raw input • 0.35s gate • Return to center</p><div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode?'border-yellow-600 bg-yellow-900/20':'border-yellow-200 bg-yellow-50'}`}><div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500" /><p className={`text-sm font-medium ${isBoxDarkMode?'text-yellow-400':'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div><p className={`text-xs ${isBoxDarkMode?'text-gray-400':'text-gray-600'}`}>Click gate then return to center. ESC to unlock. Click canvas to re-lock.</p></div><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button></div></div>)}
          
          {gameState==='gameOver'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" /><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete</h2></div><div className="grid grid-cols-2 gap-3 mb-4"><RC label="Score" v={score} i={<Target className="w-4 h-4" />} c="blue" d={isBoxDarkMode} /><RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4" />} c="yellow" d={isBoxDarkMode} /><RC label="Streak" v={bestStreak} i={<Zap className="w-4 h-4" />} c="orange" d={isBoxDarkMode} /><RC label="Cycles" v={successfulRecoils} i={<Move className="w-4 h-4" />} c="green" d={isBoxDarkMode} /><RC label="Lives" v={lives} i={<Heart className="w-4 h-4" />} c="red" d={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/motor" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300':'bg-gray-200 text-gray-700'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold">Play Again →</button></div></div></div>)}
        </div>

        {/* Drill Rules */}
        {!isFullscreen&&(<footer className="mt-6"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-blue-400':'text-blue-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Professional Features</h2></div></div><div className="p-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}><Move className="w-5 h-5" />How to Play</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-blue-400">Start Training</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-blue-400">raw input</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Hover center to <span className="font-semibold text-blue-400">spawn gate</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Click gate within <span className="font-semibold">0.35s</span></span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-green-400':'text-green-600'}`}><Trophy className="w-5 h-5" />Scoring</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-green-400">Complete cycle</span> = +1 point</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-red-400">Miss/Timeout</span> = -1 life</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-orange-400">0 lives</span> = -1 point</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span><span><span className="font-semibold text-purple-400">5 streak</span> combo bonus</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}><Zap className="w-5 h-5" />Pro Features</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li><li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-blue-400">Timer ring</span> - Visual countdown</span></li><li className="flex items-start gap-2"><Crosshair className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-orange-400">Direction</span> arrow guide</span></li></ul></div></div></div></div></footer>)}

        {/* About Section - Preserved (from original drill structure) */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode?'text-blue-400':'text-blue-600'}`} /><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>About This Free Vector Recoil Drill</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode?'text-gray-300':'text-gray-600'}`}>This free Vector Recoil drill trains flick-and-return mouse gestures with raw input via Pointer Lock API. Hover the center to spawn a gate, click it within 350ms, then return to center to complete the cycle and earn +1 point. Timer ring and direction arrow guide your movements.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-blue-50 border-blue-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Gamers wanting faster flick-and-return movements, anyone improving gesture speed and precision.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Flick speed, return accuracy, gesture precision, movement speed, rapid motor control.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Score, streak, cycles completed, lives remaining, and best performance records.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Why Practice Gesture Speed?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Essential for FPS recoil control and quick flicks</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Builds muscle memory for flick-and-return patterns</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Timer ring builds time-pressure performance skills</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Hover center until gate spawns with direction arrow</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Flick to gate and click within 350ms</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Return to center quickly to complete the cycle</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 10-15 minutes daily for best improvement</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Drills - Preserved (from original drill structure) */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-cyan-600"></div><h2 className={`text-xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Explore Related Drills</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/drills/motor/hand-eye-coordination/aim-trainer", color: "red", icon: <Target className="w-4 h-4 text-red-600" />, cat: "Motor", title: "Aim Trainer", desc: "Dynamic shrinking targets with streak tracking." },
                { href: "/drills/motor/movement-speed/finger-sequencing", color: "emerald", icon: <Star className="w-4 h-4 text-emerald-600" />, cat: "Motor", title: "Fractal Link", desc: "Click nodes from largest to smallest in sequence." },
                { href: "/drills/motor/hand-eye-coordination/click-accuracy", color: "green", icon: <Star className="w-4 h-4 text-green-600" />, cat: "Motor", title: "Click Accuracy", desc: "Single teleporting target with shrinking size." },
                { href: "/drills/fps/flick-shot-training", color: "orange", icon: <Star className="w-4 h-4 text-orange-600" />, cat: "FPS", title: "Flick Shot Trainer", desc: "Raw input flick training with shot analytics." },
                { href: "/drills/motor/precision-control/steady-hand", color: "blue", icon: <Star className="w-4 h-4 text-blue-600" />, cat: "Motor", title: "Steady Hand", desc: "Navigate tight paths without touching edges." },
                { href: "/drills/motor/timing-accuracy/rhythm-tap", color: "cyan", icon: <Zap className="w-4 h-4 text-cyan-600" />, cat: "Motor", title: "Rhythm Tap", desc: "Tap in sync with rhythmic beats." },
                { href: "/drills/motor/precision-control/tracing", color: "red", icon: <Star className="w-4 h-4 text-red-600" />, cat: "Motor", title: "Wave Tracing", desc: "Follow the red wave filament smoothly." },
                { href: "/drills/cognitive/memory/card-matching", color: "indigo", icon: <Activity className="w-4 h-4 text-indigo-600" />, cat: "Cognitive", title: "Card Matching", desc: "Classic memory card game for concentration." }
              ].map((d, i) => {
                const cm = { red:'hover:border-red-500', emerald:'hover:border-emerald-500', green:'hover:border-green-500', orange:'hover:border-orange-500', blue:'hover:border-blue-500', cyan:'hover:border-cyan-500', red:'hover:border-red-500', indigo:'hover:border-indigo-500' };
                return (<Link key={i} href={d.href} className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 ' + cm[d.color] : 'bg-white border-gray-200 ' + cm[d.color]}`}><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className={`w-8 h-8 rounded-lg bg-${d.color}-100 flex items-center justify-center`}>{d.icon}</div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>{d.cat}</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-'+d.color+'-400':'text-gray-900 group-hover:text-'+d.color+'-600'} transition-colors`}>{d.title}</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>{d.desc}</p><div className="flex items-center gap-1 mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>);
              })}
            </div>
          </section>
        )}

        {/* Footer - Preserved (simplified) */}
        {!isFullscreen && (<footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All FPS Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Cognitive Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Aim Trainer</Link></li><li><Link href="/drills/motor/precision-control/steady-hand" className="hover:text-white transition-colors">Steady Hand</Link></li><li><Link href="/drills/motor/movement-speed/gesture-speed" className="hover:text-white transition-colors">Vector Recoil</Link></li><li><Link href="/drills/motor" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Motor Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Visual Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-white" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free vector recoil drill with raw mouse input. Flick-and-return gesture training with 350ms gate windows.</p><div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-5 h-5" /></button></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', d }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d?'text-gray-400':'text-gray-500'}`}>{label}</p></div>); }
function RC({ label, v, unit = '', i, c, d }) { const m = { blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', orange:'bg-orange-500/10 border-orange-500/30 text-orange-500', green:'bg-green-500/10 border-green-500/30 text-green-500', red:'bg-red-500/10 border-red-500/30 text-red-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }