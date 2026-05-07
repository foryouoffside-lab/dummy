'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, GitBranch, RefreshCw, Heart
} from 'lucide-react';

export default function FingerSequencingClient() {
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
  const [misses, setMisses] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [accuracy, setAccuracy] = useState(100);
  const [sequencesCompleted, setSequencesCompleted] = useState(0);
  const [sequenceTimer, setSequenceTimer] = useState(2.0);
  const [isClient, setIsClient] = useState(false);
  
  const chainRef = useRef([]);
  const activeIndexRef = useRef(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const livesRef = useRef(3);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const totalAttemptsRef = useRef(0);
  const successfulHitsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const sequenceTimerRef = useRef(2.0);
  const maxSequenceTimeRef = useRef(2.0);
  const sequenceActiveRef = useRef(true);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);

  const PENALTY = 1;

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score from localStorage
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('fractalLinkBestScore');
      const savedBestStreak = localStorage.getItem('fractalLinkBestStreak');
      if (savedBestScore) { const p = parseInt(savedBestScore, 10); if (!isNaN(p)) setBestScore(p); }
      if (savedBestStreak) { const p = parseInt(savedBestStreak, 10); if (!isNaN(p)) setBestStreak(p); }
    } catch (e) { /* localStorage not available */ }
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

  const updateAccuracy = useCallback(() => {
    const total = totalAttemptsRef.current;
    setAccuracy(total > 0 ? Math.round((successfulHitsRef.current / total) * 100) : 100);
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('fractalLinkBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('fractalLinkBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
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
      const freqMap = { hit: 1200, complete: 1500, miss: 440, timeout: 330, streak: 1046.5, lifeLost: 330 };
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'lifeLost' ? 0.15 : type === 'streak' ? 0.12 : 0.08, now);
      const dur = type === 'lifeLost' ? 0.2 : 0.1;
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.start(now); osc.stop(now + dur);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver'); gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          updateBestScore(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [gameState, updateBestScore]);

  const generateChain = useCallback((cvs) => {
    if (!cvs || !isActiveRef.current) return;
    const chain = [];
    const baseX = 200 + Math.random() * (cvs.width - 400);
    const baseY = 150 + Math.random() * (cvs.height - 300);
    for (let i = 0; i < 3; i++) {
      chain.push({
        x: baseX + (Math.random() - 0.5) * 200,
        y: baseY + (Math.random() - 0.5) * 200,
        r: 22 - (i * 4),
        opacity: 1.0 - (i * 0.2)
      });
    }
    chainRef.current = chain;
    activeIndexRef.current = 0;
    sequenceTimerRef.current = maxSequenceTimeRef.current;
    setSequenceTimer(maxSequenceTimeRef.current);
    sequenceActiveRef.current = true;
  }, []);

  const handleTimeout = useCallback(() => {
    if (!isActiveRef.current) return;
    totalAttemptsRef.current++; setMisses(prev => prev + 1);
    playSound('timeout'); streakRef.current = 0; setStreak(0);
    if (livesRef.current > 0) {
      livesRef.current--; setLives(livesRef.current);
      if (livesRef.current === 0) { playSound('lifeLost'); showFeedback('⚠️ Out of lives! Penalty now active!', 'warning'); }
      else showFeedback(`⏰ Timeout! No penalty • ${livesRef.current} lives left`, 'error');
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - PENALTY); setScore(scoreRef.current);
      showFeedback(`⏰ Timeout! -${PENALTY} point penalty`, 'error');
    }
    updateAccuracy();
    if (canvasRef.current) generateChain(canvasRef.current);
  }, [PENALTY, updateAccuracy, generateChain, playSound, showFeedback]);

  // Mouse tracking
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

  // Click handler
  useEffect(() => {
    const handleMouseDown = () => {
      if (gameStateRef.current !== 'playing' || !isActiveRef.current || !sequenceActiveRef.current) return;
      const mouse = mousePositionRef.current;
      const chain = chainRef.current;
      const activeIndex = activeIndexRef.current;
      const target = chain[activeIndex];
      if (!target) return;
      const dist = Math.hypot(mouse.x - target.x, mouse.y - target.y);
      
      if (dist < target.r + 10) {
        playSound('hit');
        activeIndexRef.current++;
        if (activeIndexRef.current >= chain.length) {
          totalAttemptsRef.current++; successfulHitsRef.current++;
          setSequencesCompleted(prev => prev + 1);
          const pointsEarned = 1;
          scoreRef.current += pointsEarned; setScore(scoreRef.current);
          const newStreak = streakRef.current + 1;
          streakRef.current = newStreak; setStreak(newStreak);
          if (newStreak > bestStreakRef.current) {
            bestStreakRef.current = newStreak; setBestStreak(newStreak);
            try { localStorage.setItem('fractalLinkBestStreak', newStreak.toString()); } catch (e) {}
          }
          playSound('complete');
          if (newStreak % 5 === 0 && newStreak > 0) { playSound('streak'); showFeedback(`🔥 ${newStreak} Streak! +1`, 'success'); }
          else showFeedback('✓ Chain complete! +1 point', 'success');
          updateAccuracy();
          if (canvasRef.current) generateChain(canvasRef.current);
        }
      } else {
        totalAttemptsRef.current++; setMisses(prev => prev + 1);
        playSound('miss'); streakRef.current = 0; setStreak(0);
        if (livesRef.current > 0) {
          livesRef.current--; setLives(livesRef.current);
          if (livesRef.current === 0) { playSound('lifeLost'); showFeedback('⚠️ Out of lives! Penalty now active!', 'warning'); }
          else showFeedback(`✗ Wrong spot! No penalty • ${livesRef.current} lives left`, 'error');
        } else {
          scoreRef.current = Math.max(0, scoreRef.current - PENALTY); setScore(scoreRef.current);
          showFeedback(`✗ Wrong spot! -${PENALTY} point penalty`, 'error');
        }
        updateAccuracy();
      }
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [PENALTY, updateAccuracy, generateChain, playSound, showFeedback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, []);

  // Canvas rendering
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
      cvs.style.position = 'absolute';
      cvs.style.left = `${(containerRect.width - width) / 2}px`;
      cvs.style.top = `${(containerRect.height - height) / 2}px`;
      generateChain(cvs);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let lastFrameTime = performance.now();

    function update(dt) {
      if (sequenceActiveRef.current && isActiveRef.current) {
        sequenceTimerRef.current -= dt;
        setSequenceTimer(Math.max(0, sequenceTimerRef.current));
        if (sequenceTimerRef.current <= 0) { sequenceActiveRef.current = false; handleTimeout(); }
      }
    }

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now; update(dt);
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Timer ring
      const timerPercent = sequenceTimerRef.current / maxSequenceTimeRef.current;
      ctx.beginPath(); ctx.arc(cvs.width - 40, 40, 25, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * timerPercent));
      ctx.strokeStyle = timerPercent > 0.3 ? "#00ff88" : "#ff4444"; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = timerPercent > 0.3 ? "#00ff88" : "#ff4444";
      ctx.font = "bold 12px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(sequenceTimerRef.current.toFixed(1) + "s", cvs.width - 40, 40);
      
      const chain = chainRef.current;
      const activeIndex = activeIndexRef.current;
      
      // Dashed guide lines
      ctx.beginPath(); ctx.strokeStyle = isBoxDarkMode ? "rgba(80, 80, 80, 0.4)" : "rgba(0, 0, 0, 0.15)";
      ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
      for (let i = 0; i < chain.length - 1; i++) { ctx.moveTo(chain[i].x, chain[i].y); ctx.lineTo(chain[i + 1].x, chain[i + 1].y); }
      ctx.stroke(); ctx.setLineDash([]);

      // Draw nodes
      chain.forEach((node, i) => {
        if (i < activeIndex) return; // Hide completed
        ctx.beginPath(); ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        if (i === activeIndex) {
          const pulse = Math.sin(now * 0.01) * 2;
          ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 4; ctx.stroke();
          ctx.fillStyle = "rgba(0, 255, 136, 0.15)"; ctx.fill();
          ctx.beginPath(); ctx.arc(node.x, node.y, node.r + 5 + pulse, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(0, 255, 136, 0.4)"; ctx.lineWidth = 2; ctx.stroke();
          ctx.beginPath(); ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#00ff88"; ctx.fill();
        } else {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r);
          if (isBoxDarkMode) { gradient.addColorStop(0, `rgba(255,255,255,${node.opacity * 0.3})`); gradient.addColorStop(1, `rgba(255,255,255,${node.opacity * 0.1})`); }
          else { gradient.addColorStop(0, `rgba(0,0,0,${node.opacity * 0.2})`); gradient.addColorStop(1, `rgba(0,0,0,${node.opacity * 0.05})`); }
          ctx.fillStyle = gradient; ctx.fill();
          ctx.strokeStyle = isBoxDarkMode ? `rgba(255,255,255,${node.opacity})` : `rgba(0,0,0,${node.opacity})`;
          ctx.lineWidth = 2.5; ctx.stroke();
        }
      });

      // Crosshair cursor
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.beginPath(); ctx.arc(m.x, m.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff88"; ctx.fill();
        ctx.strokeStyle = "rgba(0, 255, 136, 0.3)"; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(m.x - 20, m.y); ctx.lineTo(m.x - 14, m.y);
        ctx.moveTo(m.x + 14, m.y); ctx.lineTo(m.x + 20, m.y);
        ctx.moveTo(m.x, m.y - 20); ctx.lineTo(m.x, m.y - 14);
        ctx.moveTo(m.x, m.y + 14); ctx.lineTo(m.x, m.y + 20); ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode, handleTimeout, generateChain]);

  const startGame = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setTimeLeft(60); setLives(3); setMisses(0);
    setFeedback(''); setAccuracy(100); setSequencesCompleted(0); setSequenceTimer(2.0);
    isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0;
    bestStreakRef.current = bestStreak; livesRef.current = 3;
    totalAttemptsRef.current = 0; successfulHitsRef.current = 0;
    if (canvasRef.current) generateChain(canvasRef.current);
    showFeedback('60 seconds • Click largest to smallest!', 'success');
  }, [bestStreak, generateChain, showFeedback]);

  const resetGame = useCallback(() => {
    isActiveRef.current = false;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start'); gameStateRef.current = 'start';
    setFeedback(''); setFeedbackType('');
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading finger sequencing drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Fractal Link - Finger Sequencing Drill",
        "url": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing",
        "description": "Rapid finger sequencing drill. Click 3 nodes from largest to smallest within 2 seconds per chain. Active node pulses green with dashed guide lines. 60-second challenge with 3 lives and streak bonuses.",
        "applicationCategory": "GameApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Global Drill System" },
        "educationalUse": ["Finger Sequencing", "Motor Control", "Rapid Clicking", "Precision Training"],
        "learningResourceType": "Interactive Exercise", "timeRequired": "PT60S",
        "interactivityType": "active", "inLanguage": "en-US",
        "teaches": ["Sequencing Speed", "Ordered Clicking", "Visual Processing", "Motor Planning"]
      })}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li><Link href="/drills/motor" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Movement Speed</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-current="page">Fractal Link</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex-shrink-0"><GitBranch className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Fractal Link</h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click largest→smallest • +1 per chain • 2s timer • 3 lives • 60s challenge</p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset session" aria-label="Reset finger sequencing drill"><RefreshCw className="w-5 h-5" /></button>}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Drill description"><h2>Fractal Link - Finger Sequencing Training</h2><p>Train rapid finger sequencing by clicking 3 nodes from largest to smallest within 2 seconds per chain. Active node pulses green with dashed guide lines. +1 point per completed chain. 3-life protection: mistakes cost lives first, then -1pt penalty. 60-second timed challenge with accuracy and streak tracking. Best scores saved locally.</p></section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives === 0 ? 'text-yellow-500' : 'text-red-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-amber-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div>
        </div>

        {/* Game Canvas */}
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'none' }}>
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} aria-label="Finger sequencing canvas. Click nodes from largest to smallest." />
          
          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4"><GitBranch className="w-16 h-16 text-emerald-500 mx-auto" aria-hidden="true" /></div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Fractal Link</h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click largest to smallest • +1pt per chain</p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>3 nodes per chain, 2 seconds each. Active node pulses green with dashed guide lines. 3 lives protect your score.</p>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" aria-label="Start finger sequencing training">Start Training</button>
              </div>
            </div>
          )}
          
          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time&apos;s Up!</h2></div>
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve your sequencing speed and accuracy.</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Chains Done" value={sequencesCompleted} icon={<GitBranch className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} />
                  <ResultCard label="Misses" value={misses} icon={<Activity className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                </div>
                <div className="flex gap-3">
                  <Link href="/drills/motor" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Motor</button></Link>
                  <button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">Play Again →</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2></div></div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click nodes from <span className="font-semibold text-emerald-500">largest to smallest</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">+1 point per completed chain</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">-1 point penalty</span> ONLY when out of lives</p></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Each chain has <span className="font-semibold text-cyan-500">2 seconds</span> to complete</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-pink-500">3 lives protection</span> • No score penalty until lives reach 0</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-purple-500">60 seconds</span> • Best Score saves locally</p></div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>🎯 Active node pulses green • Follow dashed guide lines</span><span>⚡ 5x streak bonus notification</span></div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ icon, value, label, unit = '', isDark }) {
  return <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>;
}
function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' }, cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' } };
  const colors = colorMap[color] || colorMap.yellow;
  return <div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}><div className="flex items-center gap-2 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span></div>;
}