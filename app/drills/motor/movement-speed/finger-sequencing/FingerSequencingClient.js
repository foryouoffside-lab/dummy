'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, GitBranch, RefreshCw, Heart,
  GraduationCap, Lightbulb, TrendingUp, CheckCircle2, Star, ArrowRight, Share2, Copy
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

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('fractalLinkBestScore');
      const savedBestStreak = localStorage.getItem('fractalLinkBestStreak');
      if (savedBestScore) { const p = parseInt(savedBestScore, 10); if (!isNaN(p)) setBestScore(p); }
      if (savedBestStreak) { const p = parseInt(savedBestStreak, 10); if (!isNaN(p)) setBestStreak(p); }
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
      const freqMap = { hit: 1200, complete: 1500, miss: 440, timeout: 330, streak: 1046.5, lifeLost: 330 };
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'lifeLost' ? 0.15 : type === 'streak' ? 0.12 : 0.08, now);
      const dur = type === 'lifeLost' ? 0.2 : 0.1;
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.start(now); osc.stop(now + dur);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

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

  useEffect(() => {
    return () => { isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, []);

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
      
      const timerPercent = sequenceTimerRef.current / maxSequenceTimeRef.current;
      ctx.beginPath(); ctx.arc(cvs.width - 40, 40, 25, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * timerPercent));
      ctx.strokeStyle = timerPercent > 0.3 ? "#00ff88" : "#ff4444"; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = timerPercent > 0.3 ? "#00ff88" : "#ff4444";
      ctx.font = "bold 12px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(sequenceTimerRef.current.toFixed(1) + "s", cvs.width - 40, 40);
      
      const chain = chainRef.current;
      const activeIndex = activeIndexRef.current;
      
      ctx.beginPath(); ctx.strokeStyle = isBoxDarkMode ? "rgba(80, 80, 80, 0.4)" : "rgba(0, 0, 0, 0.15)";
      ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
      for (let i = 0; i < chain.length - 1; i++) { ctx.moveTo(chain[i].x, chain[i].y); ctx.lineTo(chain[i + 1].x, chain[i + 1].y); }
      ctx.stroke(); ctx.setLineDash([]);

      chain.forEach((node, i) => {
        if (i < activeIndex) return;
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

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Free Fractal Link Finger Sequencing Drill | SkillDrills',
          text: 'Train rapid finger sequencing by clicking nodes from largest to smallest. Free!',
          url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing'
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText('https://skilldrills.online/drills/motor/movement-speed/finger-sequencing');
      alert('Link copied!');
    }
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText('https://skilldrills.online/drills/motor/movement-speed/finger-sequencing');
    alert('Link copied!');
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Fractal Link - Finger Sequencing & Motor Planning Training",
        "url": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing",
        "description": "Free rapid finger sequencing drill with 3 nodes per chain to click from largest to smallest within 2 seconds. Active node pulses green with dashed guide lines and timer ring. 3-life protection system with streak bonuses. 60-second timed challenge.",
        "applicationCategory": "GameApplication", "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
        "publisher": { "@type": "Organization", "name": "SkillDrills" },
        "educationalUse": ["Finger Sequencing Training", "Motor Control Practice", "Rapid Clicking Development", "Precision Movement Training", "Motor Skill Enhancement"],
        "learningResourceType": ["Interactive Exercise", "Motor Drill", "Sequencing Training"],
        "timeRequired": "PT60S", "interactivityType": "active", "inLanguage": "en-US",
        "teaches": ["Sequencing Speed", "Ordered Clicking", "Visual Processing", "Motor Planning", "Rapid Finger Control"],
        "educationalLevel": "All Levels", "typicalAgeRange": "10-80",
        "datePublished": "2026-05-14", "dateModified": new Date().toISOString().split('T')[0],
        "version": "1.0", "isAccessibleForFree": true,
        "accessMode": ["visual"], "accessModeSufficient": ["visual"]
      })}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
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
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex-shrink-0"><GitBranch className="w-6 h-6 text-white" /></div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Fractal Link</h1>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Free finger sequencing drill • Largest→smallest • +1 per chain • 2s timer • 60s</p>
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
        )}

        <section className="sr-only" aria-label="Drill description"><h2>Fractal Link - Finger Sequencing Training</h2><p>Train rapid finger sequencing by clicking 3 nodes from largest to smallest within 2 seconds per chain. Active node pulses green with dashed guide lines. +1 point per completed chain. 3-life protection: mistakes cost lives first, then -1pt penalty. 60-second timed challenge with accuracy and streak tracking. Best scores saved locally.</p></section>

        {!isFullscreen && (
          <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
            <StatCard icon={<Heart className={lives === 0 ? 'text-yellow-500' : 'text-red-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
            <StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
            <StatCard icon={<Award className="text-amber-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          </div>
        )}

        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div>
        </div>

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
          
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4"><GitBranch className="w-16 h-16 text-emerald-500 mx-auto" aria-hidden="true" /></div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Fractal Link</h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click largest to smallest • +1pt per chain</p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>3 nodes per chain, 2 seconds each. Active node pulses green with dashed guide lines. 3 lives protect your score.</p>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" aria-label="Start finger sequencing training">Start Free Drill</button>
              </div>
            </div>
          )}
          
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

        {!isFullscreen && (
          <section className="mt-8" aria-label="About this finger sequencing drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Fractal Link Drill</h2>
                </div>
              </div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This free fractal link drill trains rapid finger sequencing and motor planning by challenging you to click 3 nodes from largest to smallest within 2 seconds per chain. Each chain features progressively smaller nodes connected by dashed guide lines showing the correct sequence path. The active node pulses green making it easy to identify your next target. A timer ring in the top-right corner shows remaining time per chain turning from green to red as time runs out. The 3-life protection system allows beginners to practice without immediate score penalties while providing accountability for experienced users. Perfect for gamers improving clicking speed and order, musicians developing finger dexterity, and anyone wanting faster more accurate sequential motor control.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-emerald-50 border-emerald-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Gamers improving clicking speed and ordered targeting, musicians developing finger dexterity and sequence execution, and anyone wanting faster more accurate sequential motor control and planning.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Sequencing speed, ordered clicking accuracy, visual processing for size discrimination, motor planning, rapid finger control, and the ability to execute ordered motor sequences under time pressure.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Score, accuracy percentage, streak count, chains completed, misses count, lives remaining, and best performance records saved locally.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Finger Sequencing?</h3>
                    </div>
                    <ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Develops ordered motor execution essential for gaming and music
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Dashed guide lines and pulsing nodes provide clear visual cues
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Timer ring with color change builds time-pressure performance skills
                      </li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3>
                    </div>
                    <ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                        Scan all three nodes quickly before starting your clicks
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                        Follow the dashed guide lines for the correct sequence path
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                        Watch the timer ring color change from green to red as time runs out
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                        Practice 10-15 minutes daily for best sequencing speed improvement
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="Related motor and memory drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-500 to-teal-600"></div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Motor & Memory Drills</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/motor/hand-eye-coordination/aim-trainer" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Target className="w-4 h-4 text-blue-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Aim Trainer Elite</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Dynamic shrinking targets with streak tracking and 3-life protection system.</p>
                  <div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/motor/hand-eye-coordination/click-accuracy" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><Star className="w-4 h-4 text-green-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} transition-colors`}>Click Accuracy Elite</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Single teleporting target drill with shrinking size and reaction tracking.</p>
                  <div className="flex items-center gap-1 mt-3 text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/motor/hand-eye-coordination/drag-and-drop" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Star className="w-4 h-4 text-purple-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Extreme Convergence</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Drag ball into shrinking ring within 3 seconds with teleporting positions.</p>
                  <div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/fps/flick-shot-training" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Star className="w-4 h-4 text-orange-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Flick Shot Trainer</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Raw input flick training with adaptive target windows and shot analytics.</p>
                  <div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/working-memory/n-back" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Brain className="w-4 h-4 text-cyan-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>3-Back Training</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Gold standard N-Back working memory task at 3-back difficulty level.</p>
                  <div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/short-term-memory/color-sequence" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Star className="w-4 h-4 text-red-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Color Sequence</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Watch color sequences then tap colors in order with progressive difficulty.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/long-term-memory/paired-associates" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Heart className="w-4 h-4 text-teal-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Paired Associates</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize word pairs then select the correct match from 3 options with adaptive rounds.</p>
                  <div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/cognitive/memory/card-matching" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center"><Activity className="w-4 h-4 text-indigo-600" /></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Cognitive</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} transition-colors`}>Card Matching</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Classic memory card game to improve visual memory and concentration skills.</p>
                  <div className="flex items-center gap-1 mt-3 text-indigo-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Motor Training</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/motor/movement-speed/finger-sequencing" className="hover:text-white transition-colors">Fractal Link</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/click-accuracy" className="hover:text-white transition-colors">Click Accuracy Elite</Link></li>
                    <li><Link href="/drills/motor" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Motor Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Memory Training</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-white transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-white transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory/spatial-memory/grid-memorization" className="hover:text-white transition-colors">Grid Memorization</Link></li>
                    <li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 15 Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Academic</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/visual" className="hover:text-white transition-colors">Visual (14 drills)</Link></li>
                    <li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white font-bold text-lg">SkillDrills</span>
                </div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">
                  Free online fractal link drill for finger sequencing and motor planning training. 3 nodes per chain clicked largest to smallest within 2 seconds. Timer ring with color change and dashed guide lines. Perfect for gamers musicians and anyone wanting faster sequential motor control. No registration required. More free drills at skilldrills.online.
                </p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free finger sequencing drill">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard">
                    <Copy className="w-5 h-5" />
                  </button>
                  <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
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

function StatCard({ icon, value, label, unit = '', isDark }) {
  return <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>;
}
function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' }, cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' } };
  const colors = colorMap[color] || colorMap.yellow;
  return <div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}><div className="flex items-center gap-2 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span></div>;
}