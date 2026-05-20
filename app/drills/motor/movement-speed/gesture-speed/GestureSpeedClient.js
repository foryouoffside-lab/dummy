'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Move, Heart, RefreshCw,
  GraduationCap, Lightbulb, TrendingUp, CheckCircle2, Star, ArrowRight, Share2, Copy
} from 'lucide-react';

export default function GestureSpeedClient() {
  const [loading, setLoading] = useState(true);
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
  const [isClient, setIsClient] = useState(false);
  
  const gateRef = useRef({ active: false, x: 0, y: 0, angle: 0, timer: 0.35 });
  const stateRef = useRef('CENTER');
  const particlesRef = useRef([]);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const livesRef = useRef(3);
  const mousePositionRef = useRef({ x: 0, y: 0 });
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

  useEffect(() => {
    setIsClient(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('vectorRecoilBestScore');
      if (savedBestScore) { const p = parseInt(savedBestScore, 10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) {}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element?.requestFullscreen) { await element.requestFullscreen(); setIsFullscreen(true); }
      } else {
        if (document.fullscreenElement) await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) { console.error('Fullscreen error:', error); }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('vectorRecoilBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('vectorRecoilBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) {}
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600);
  }, []);

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
      const audioCtx = initAudio(); if (!audioCtx) return;
      const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      const freqMap = { gateHit: 880, success: 1200, fail: 300, streak: 1500, penalty: 200, click: 660 };
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'penalty' ? 0.15 : type === 'streak' ? 0.1 : 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now); osc.stop(now + 0.15);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); updateBestScore(scoreRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [gameState, updateBestScore]);

  const addPenalty = useCallback((reason) => {
    if (!isActiveRef.current) return;
    const penaltyPoints = 1;
    streakRef.current = 0; setStreak(0);
    if (livesRef.current > 0) {
      livesRef.current -= 1; setLives(livesRef.current);
      showFeedback(`✗ ${reason}! -1 life (${livesRef.current} lives left)`, 'error');
      playSound('penalty');
      if (livesRef.current === 0) showFeedback('⚠️ No lives left! Now penalties deduct points!', 'warning');
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints); setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(`✗ ${reason}! -${penaltyPoints} point penalty`, 'error');
    }
  }, [showFeedback, playSound]);

  const initParticles = useCallback((cvs) => {
    const particles = [];
    for (let i = 0; i < 40; i++) particles.push({ a: Math.random() * Math.PI * 2, r: 150 + Math.random() * 150 });
    particlesRef.current = particles;
  }, []);

  const spawnGate = useCallback((cvs) => {
    const cx = cvs.width / 2; const cy = cvs.height / 2;
    const angle = Math.random() * Math.PI * 2;
    const dist = 220 + Math.random() * 80;
    gateRef.current = { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist, angle: angle, timer: limitRef.current, active: true };
    stateRef.current = 'FLICKING';
    gateHitProcessedRef.current = false;
    cycleCompletedRef.current = false;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cvs = canvasRef.current; if (!cvs) return;
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width; const scaleY = cvs.height / rect.height;
      mousePositionRef.current = { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e) => {
      e.preventDefault(); e.stopPropagation();
      if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      const mouse = mousePositionRef.current; const cvs = canvasRef.current; if (!cvs) return;
      const cx = cvs.width / 2; const cy = cvs.height / 2;
      const distToCenter = Math.hypot(mouse.x - cx, mouse.y - cy);
      const onCenter = distToCenter < 20;

      if (stateRef.current === 'FLICKING' && gateRef.current.active && !gateHitProcessedRef.current) {
        const gate = gateRef.current;
        const distToGate = Math.hypot(mouse.x - gate.x, mouse.y - gate.y);
        if (distToGate < 35) {
          gateHitProcessedRef.current = true;
          playSound('gateHit');
          showFeedback('✓ Gate hit! Now return to center', 'success');
          gateRef.current.active = false;
          stateRef.current = 'RETURNING';
          return;
        }
      }
      if (stateRef.current === 'FLICKING' && gateRef.current.active && !gateHitProcessedRef.current) {
        const gate = gateRef.current;
        const distToGate = Math.hypot(mouse.x - gate.x, mouse.y - gate.y);
        if (distToGate < 60 && distToGate >= 35) addPenalty('Near miss');
        else if (distToGate >= 60 && !onCenter) { addPenalty('Miss'); playSound('click'); }
      }
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => { window.removeEventListener('mousedown', handleMouseDown); window.removeEventListener('contextmenu', (e) => e.preventDefault()); };
  }, [addPenalty, playSound, showFeedback]);

  useEffect(() => { return () => { isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); }; }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const updateCanvasSize = () => {
      const container = containerRef.current; if (!container) return;
      const containerRect = container.getBoundingClientRect();
      let width = containerRect.width; let height = width * (9 / 16);
      if (height > containerRect.height) { height = containerRect.height; width = height * (16 / 9); }
      cvs.width = width; cvs.height = height;
      cvs.style.position = 'absolute'; cvs.style.left = `${(containerRect.width - width) / 2}px`; cvs.style.top = `${(containerRect.height - height) / 2}px`;
      initParticles(cvs);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    let lastFrameTime = performance.now();

    function update(dt) {
      if (!isActiveRef.current) return;
      const cx = cvs.width / 2; const cy = cvs.height / 2;
      const mouse = mousePositionRef.current;
      const onCenter = Math.hypot(mouse.x - cx, mouse.y - cy) < 20;

      if (stateRef.current === 'CENTER') { if (onCenter) spawnGate(cvs); }
      else if (stateRef.current === 'FLICKING') {
        if (gateRef.current.active) {
          if (!onCenter) gateRef.current.timer -= dt;
          if (gateRef.current.timer <= 0) { addPenalty('Timeout'); gateRef.current.active = false; stateRef.current = 'CENTER'; gateHitProcessedRef.current = false; cycleCompletedRef.current = false; }
        }
      } else if (stateRef.current === 'RETURNING') {
        if (onCenter && gateHitProcessedRef.current && !cycleCompletedRef.current) {
          cycleCompletedRef.current = true; totalAttemptsRef.current++; successfulRecoilsRef.current++;
          setSuccessfulRecoils(successfulRecoilsRef.current);
          const cyclePoints = 1;
          const newStreak = streakRef.current + 1; streakRef.current = newStreak; setStreak(newStreak);
          if (newStreak > bestStreakRef.current) { bestStreakRef.current = newStreak; setBestStreak(newStreak); }
          scoreRef.current += cyclePoints; setScore(scoreRef.current);
          playSound('success');
          if (newStreak % 5 === 0) { playSound('streak'); showFeedback(`🔥 ${newStreak} STREAK!`, 'success'); }
          else showFeedback(`✓ Complete cycle! +${cyclePoints}`, 'success');
          stateRef.current = 'CENTER'; gateHitProcessedRef.current = false;
        }
      }
    }

    function draw() {
      const now = performance.now(); const dt = Math.min(0.033, (now - lastFrameTime) / 1000); lastFrameTime = now; update(dt);
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      const cx = cvs.width / 2; const cy = cvs.height / 2;
      const mouse = mousePositionRef.current;
      const onCenter = Math.hypot(mouse.x - cx, mouse.y - cy) < 20;

      ctx.strokeStyle = isBoxDarkMode ? "#1a1a1a" : "#e0e0e0"; ctx.lineWidth = 1;
      particlesRef.current.forEach(p => { p.a += 0.005; const px = cx + Math.cos(p.a) * p.r; const py = cy + Math.sin(p.a) * p.r; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 4, py + 4); ctx.stroke(); });

      ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      if (onCenter || stateRef.current === 'CENTER') { ctx.fillStyle = "#00ff88"; ctx.shadowColor = "#00ff88"; ctx.shadowBlur = 15; }
      else { ctx.fillStyle = "rgba(0, 255, 136, 0.3)"; ctx.shadowBlur = 0; }
      ctx.fill(); ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.strokeStyle = onCenter ? "#00ff88" : "rgba(0, 255, 136, 0.5)"; ctx.lineWidth = 2; ctx.stroke();

      const gate = gateRef.current;
      if (gate.active && stateRef.current === 'FLICKING') {
        const timerPercent = gate.timer / limitRef.current;
        ctx.beginPath(); ctx.arc(gate.x, gate.y, 30, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * timerPercent));
        ctx.strokeStyle = timerPercent > 0.3 ? "#00ff88" : "#ff4444"; ctx.lineWidth = 3; ctx.stroke();
        ctx.beginPath(); ctx.arc(gate.x, gate.y, 25, 0, Math.PI * 2);
        const distToGate = Math.hypot(mouse.x - gate.x, mouse.y - gate.y);
        const isHoveringGate = distToGate < 35;
        if (isHoveringGate) { ctx.fillStyle = "rgba(0, 255, 136, 0.15)"; ctx.fill(); ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 3.5; }
        else { ctx.strokeStyle = `rgba(0, 255, 136, ${gate.timer})`; ctx.lineWidth = 2.5; }
        ctx.stroke();
        ctx.beginPath(); ctx.arc(gate.x, gate.y, 8, 0, Math.PI * 2); ctx.fillStyle = isHoveringGate ? "#00ff88" : "rgba(0, 255, 136, 0.5)"; ctx.fill();
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(gate.angle) * 50, cy + Math.sin(gate.angle) * 50);
        ctx.strokeStyle = "rgba(0, 255, 136, 0.2)"; ctx.lineWidth = 2; ctx.stroke();
        const arrowX = cx + Math.cos(gate.angle) * 50; const arrowY = cy + Math.sin(gate.angle) * 50;
        ctx.beginPath(); ctx.moveTo(arrowX, arrowY); ctx.lineTo(arrowX - Math.cos(gate.angle - 0.8) * 12, arrowY - Math.sin(gate.angle - 0.8) * 12);
        ctx.lineTo(arrowX - Math.cos(gate.angle + 0.8) * 12, arrowY - Math.sin(gate.angle + 0.8) * 12); ctx.closePath();
        ctx.fillStyle = "rgba(0, 255, 136, 0.3)"; ctx.fill();
        if (isHoveringGate) { ctx.fillStyle = "#00ff88"; ctx.font = "bold 10px monospace"; ctx.textAlign = "center"; ctx.fillText('CLICK', gate.x, gate.y - 35); }
      }

      if (stateRef.current === 'RETURNING') {
        ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(cx, cy);
        ctx.strokeStyle = "rgba(0, 255, 136, 0.4)"; ctx.lineWidth = 2; ctx.setLineDash([8, 6]); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = "#00ff88"; ctx.font = "bold 10px monospace"; ctx.textAlign = "center"; ctx.fillText('Return to center for +1', cx, cy - 40);
      }

      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2); ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2); ctx.fillStyle = "#00ff88"; ctx.fill();
        ctx.strokeStyle = "rgba(0, 255, 136, 0.3)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(mouse.x - 20, mouse.y); ctx.lineTo(mouse.x - 14, mouse.y); ctx.moveTo(mouse.x + 14, mouse.y); ctx.lineTo(mouse.x + 20, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 20); ctx.lineTo(mouse.x, mouse.y - 14); ctx.moveTo(mouse.x, mouse.y + 14); ctx.lineTo(mouse.x, mouse.y + 20); ctx.stroke();
      }

      ctx.fillStyle = "#00ff88"; ctx.font = "bold 11px monospace"; ctx.textAlign = "center";
      if (stateRef.current === 'FLICKING') ctx.fillText('→ CLICK THE GATE (0.35s) →', cvs.width / 2, 35);
      else if (stateRef.current === 'RETURNING') ctx.fillText('← RETURN TO CENTER FOR +1 ←', cvs.width / 2, 35);
      else if (stateRef.current === 'CENTER' && onCenter) ctx.fillText('✓ ON CENTER - GATE SPAWNING', cvs.width / 2, 35);

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); resizeObserver.disconnect(); };
  }, [gameState, isBoxDarkMode, addPenalty, spawnGate, initParticles, playSound, showFeedback]);

  const startGame = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(60); setLives(3); setFeedback(''); setSuccessfulRecoils(0);
    isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0;
    livesRef.current = 3; totalAttemptsRef.current = 0; successfulRecoilsRef.current = 0;
    stateRef.current = 'CENTER'; gateRef.current = { active: false, x: 0, y: 0, angle: 0, timer: 0.35 };
    gateHitProcessedRef.current = false; cycleCompletedRef.current = false;
    if (canvasRef.current) initParticles(canvasRef.current);
    showFeedback('60 seconds • 0.35s to click gate!', 'success');
  }, [initParticles, showFeedback]);

  const resetGame = useCallback(() => {
    isActiveRef.current = false;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start'); gameStateRef.current = 'start'; setFeedback(''); setFeedbackType('');
  }, []);

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Free Vector Recoil Gesture Speed Drill | SkillDrills',
          text: 'Train flick-and-return mouse gestures with 350ms gate clicking. Free!',
          url: 'https://skilldrills.online/drills/motor/movement-speed/gesture-speed'
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText('https://skilldrills.online/drills/motor/movement-speed/gesture-speed');
      alert('Link copied!');
    }
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText('https://skilldrills.online/drills/motor/movement-speed/gesture-speed');
    alert('Link copied!');
  };

  if (loading || !isClient) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading gesture speed drill...</p></div></div>;
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Vector Recoil - Gesture Speed & Flick Movement Training",
        "url": "https://skilldrills.online/drills/motor/movement-speed/gesture-speed",
        "description": "Free flick-and-return gesture speed training with 350ms gate clicking windows. Hover center to spawn gate click it within time limit then return to center for +1 point per cycle. Direction arrow and timer ring with color change. 3-life protection system. 60-second timed challenge.",
        "applicationCategory": "GameApplication", "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
        "publisher": { "@type": "Organization", "name": "SkillDrills" },
        "educationalUse": ["Gesture Speed Training", "Flick Movement Practice", "Rapid Targeting Development", "Motor Speed Enhancement"],
        "learningResourceType": ["Interactive Exercise", "Motor Drill", "Speed Training"],
        "timeRequired": "PT60S", "interactivityType": "active", "inLanguage": "en-US",
        "teaches": ["Flick Speed", "Return Accuracy", "Gesture Precision", "Movement Speed", "Rapid Motor Control"],
        "educationalLevel": "All Levels", "typicalAgeRange": "10-80",
        "datePublished": "2026-05-14", "dateModified": new Date().toISOString().split('T')[0],
        "version": "1.0", "isAccessibleForFree": true,
        "accessMode": ["visual"], "accessModeSufficient": ["visual"]
      })}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/motor" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Movement Speed</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-current="page">Vector Recoil</li></ol></nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex-shrink-0"><Move className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Vector Recoil</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Free gesture speed drill • 0.35s gate • Return to center • 60s</p></div></div>
            <div className="flex gap-2 flex-shrink-0">
              {gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset gesture speed drill"><RefreshCw className="w-5 h-5" /></button>}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        <section className="sr-only"><h2>Vector Recoil - Gesture Speed Training</h2><p>Flick-and-return mouse gesture training. Hover center to spawn a gate, click it within 350ms, then return to center for +1 point. 3-life protection. 60-second challenge with streak bonuses.</p></section>

        {!isFullscreen && (
          <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
            <StatCard icon={<Award className="text-amber-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
            <StatCard icon={<Move className="text-cyan-600" />} value={successfulRecoils} label="Cycles" isDark={isDarkMode} />
            <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          </div>
        )}

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite">{feedback || '\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'none' }}>
          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} aria-label="Gesture speed canvas. Click gates and return to center." />
          
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Move className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Vector Recoil</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>0.35s to click gate • Return to center for +1 point • 3 lives</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Hover center to spawn gate. Click gate within 350ms. Return to center to complete cycle and earn +1 point.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Start gesture speed training">Start Free Drill</button></div></div>)}
          
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time&apos;s Up!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve your gesture speed and accuracy.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Cycles" value={successfulRecoils} icon={<Move className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} /><ResultCard label="Lives Left" value={lives} icon={<Heart className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/motor" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Motor</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>

        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hover over <span className="font-semibold text-blue-500">center</span> to spawn a gate</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click the gate <span className="font-semibold text-green-500">within 0.35 seconds</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Return to center = <span className="font-semibold text-emerald-500">+1 point</span></p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Miss/Timeout: <span className="font-semibold text-red-500">-1 life first, then -1pt</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-pink-500">3 lives protection</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5x streak <span className="font-semibold text-yellow-500">bonus notification</span></p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>🎯 Complete cycle (gate + return) = 1 point</span><span>⚡ 350ms window • Best Score saves locally</span></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>; }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500' } }; const c = colorMap[color] || colorMap.yellow; return <div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}><div className="flex items-center gap-2 min-w-0"><div className={c.text} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>{value}{unit}</span></div>; }