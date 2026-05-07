'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Radio, Brain, X, Trophy, Info, Check, Heart, RefreshCw
} from 'lucide-react';

export default function NeuroSwitchClient() {
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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [bestReaction, setBestReaction] = useState(0);
  const [windowTime, setWindowTime] = useState(1000);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [greenHits, setGreenHits] = useState(0);
  const [redHits, setRedHits] = useState(0);
  const [currentCommand, setCurrentCommand] = useState('');
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const stateRef = useRef("IDLE");
  const activeCommandRef = useRef("");
  const startTimeRef = useRef(0);
  const windowTimeRef = useRef(1000);
  const minWindowTime = 300;
  const maxWindowTime = 1000;
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const greenBallRef = useRef({ x: 0, y: 0, r: 22 });
  const redBallRef = useRef({ x: 0, y: 0, r: 22 });
  const audioCtxRef = useRef(null);
  const timeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const currentSoundRef = useRef(null);
  const canClickRef = useRef(true);
  const waitingForNextRef = useRef(false);
  const bestStreakRef = useRef(0);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('neuroSwitchBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('neuroSwitchBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('neuroSwitchBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element?.requestFullscreen) { await element.requestFullscreen(); setIsFullscreen(true); }
      } else {
        if (document.fullscreenElement) { await document.exitFullscreen(); }
        setIsFullscreen(false);
      }
    } catch (error) { console.error('Fullscreen error:', error); }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 500);
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
      if (currentSoundRef.current) { try { currentSoundRef.current.stop(); } catch (e) {} }
      const audioCtx = initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const now = audioCtx.currentTime;
      const config = { green: [1200, 'sine', 0.15], red: [250, 'sawtooth', 0.15], streak: [1046.5, 'sine', 0.12], fail: [440, 'sine', 0.1], penalty: [220, 'square', 0.08] };
      const [freq, wave, vol] = config[type] || [440, 'sine', 0.1];
      osc.frequency.setValueAtTime(freq, now);
      osc.type = wave;
      gain.gain.setValueAtTime(vol, now);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); currentSoundRef.current = osc;
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      setTimeout(() => { try { osc.stop(); } catch (e) {}; currentSoundRef.current = null; }, 200);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const clearAllTimeouts = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
  }, []);

  const moveToNextRound = useCallback(() => {
    if (waitingForNextRef.current) return;
    waitingForNextRef.current = true;
    clearAllTimeouts();
    stateRef.current = "FEEDBACK";
    setTimeout(() => { if (isActiveRef.current && gameStateRef.current === 'playing') spawn(); }, 300);
  }, [clearAllTimeouts]);

  const applyPenalty = useCallback(() => {
    scoreRef.current = Math.max(0, scoreRef.current - 1);
    setScore(scoreRef.current);
    setPenaltyCount(prev => prev + 1);
    showFeedback(' -1 point penalty!', 'warning');
    playSound('penalty');
  }, [showFeedback, playSound]);

  const fail = useCallback((reason) => {
    if (!isActiveRef.current || !canClickRef.current) return;
    clearAllTimeouts(); canClickRef.current = false;
    streakRef.current = 0; setStreak(0);
    if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); showFeedback(`✗ ${reason}! -1 life`, 'error'); playSound('fail'); }
    else { applyPenalty(); }
    windowTimeRef.current = Math.min(maxWindowTime, windowTimeRef.current + 50); setWindowTime(windowTimeRef.current);
    stateRef.current = "FEEDBACK";
    setTimeout(() => { if (isActiveRef.current && gameStateRef.current === 'playing') spawn(); }, 500);
  }, [clearAllTimeouts, showFeedback, playSound, applyPenalty]);

  const handleSuccess = useCallback(() => {
    if (!isActiveRef.current || !canClickRef.current) return;
    clearAllTimeouts(); canClickRef.current = false;
    const reaction = Math.floor(performance.now() - startTimeRef.current);
    setSuccessfulHits(prev => prev + 1);
    if (activeCommandRef.current === "GREEN") setGreenHits(prev => prev + 1); else setRedHits(prev => prev + 1);
    if (bestReaction === 0 || reaction < bestReaction) setBestReaction(reaction);
    const newStreak = streakRef.current + 1; streakRef.current = newStreak; setStreak(newStreak);
    if (newStreak > bestStreakRef.current) { bestStreakRef.current = newStreak; setBestStreak(newStreak); }
    scoreRef.current += 1; setScore(scoreRef.current);
    if (newStreak % 5 === 0 && newStreak > 0) { playSound('streak'); showFeedback(`🔥 ${newStreak} Streak! +1 point`, 'success'); }
    else { showFeedback(`✓ Correct! +1 point (${reaction}ms)`, 'success'); }
    windowTimeRef.current = Math.max(minWindowTime, windowTimeRef.current - 25); setWindowTime(windowTimeRef.current);
    moveToNextRound();
  }, [bestReaction, moveToNextRound, showFeedback, playSound, clearAllTimeouts]);

  const spawn = useCallback(() => {
    clearAllTimeouts();
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const pad = 80; const minDistance = 80;
    greenBallRef.current.x = pad + Math.random() * (cvs.width - pad * 2);
    greenBallRef.current.y = pad + Math.random() * (cvs.height - pad * 2);
    let attempts = 0; let validPosition = false;
    while (!validPosition && attempts < 50) {
      redBallRef.current.x = pad + Math.random() * (cvs.width - pad * 2);
      redBallRef.current.y = pad + Math.random() * (cvs.height - pad * 2);
      if (Math.hypot(greenBallRef.current.x - redBallRef.current.x, greenBallRef.current.y - redBallRef.current.y) >= minDistance) validPosition = true;
      attempts++;
    }
    if (Math.random() > 0.5) { activeCommandRef.current = "GREEN"; setCurrentCommand("GREEN"); playSound('green'); }
    else { activeCommandRef.current = "RED"; setCurrentCommand("RED"); playSound('red'); }
    stateRef.current = "ACTIVE"; startTimeRef.current = performance.now(); canClickRef.current = true; waitingForNextRef.current = false;
    timeoutRef.current = setTimeout(() => { if (stateRef.current === "ACTIVE" && isActiveRef.current && !waitingForNextRef.current) { stateRef.current = "IDLE"; moveToNextRound(); } }, windowTimeRef.current);
  }, [clearAllTimeouts, moveToNextRound, playSound]);

  const handleClick = useCallback((e) => {
    if (gameState !== 'playing' || !isActiveRef.current || stateRef.current !== "ACTIVE" || !canClickRef.current || waitingForNextRef.current) return;
    const cvs = canvasRef.current; if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (cvs.width / rect.width);
    const mouseY = (e.clientY - rect.top) * (cvs.height / rect.height);
    mousePositionRef.current = { x: mouseX, y: mouseY };
    const hitRadius = greenBallRef.current.r + 5;
    if (Math.hypot(mouseX - greenBallRef.current.x, mouseY - greenBallRef.current.y) <= hitRadius) { e.preventDefault(); e.stopPropagation(); activeCommandRef.current === "GREEN" ? handleSuccess() : fail("WRONG BALL"); return; }
    if (Math.hypot(mouseX - redBallRef.current.x, mouseY - redBallRef.current.y) <= hitRadius) { e.preventDefault(); e.stopPropagation(); activeCommandRef.current === "RED" ? handleSuccess() : fail("WRONG BALL"); }
  }, [gameState, handleSuccess, fail]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) { canvas.addEventListener('mousedown', handleClick); return () => canvas.removeEventListener('mousedown', handleClick); }
  }, [handleClick]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cvs = canvasRef.current; if (!cvs) return;
      const rect = cvs.getBoundingClientRect();
      mousePositionRef.current = { x: (e.clientX - rect.left) * (cvs.width / rect.width), y: (e.clientY - rect.top) * (cvs.height / rect.height) };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; clearAllTimeouts(); updateBestScore(scoreRef.current); if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, timeLeft, updateBestScore, clearAllTimeouts]);

  // Canvas rendering
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');
    const updateCanvasSize = () => {
      const container = containerRef.current; if (!container) return;
      const rect = container.getBoundingClientRect();
      let w = rect.width, h = w * (9/16);
      if (h > rect.height) { h = rect.height; w = h * (16/9); }
      cvs.width = w; cvs.height = h;
      cvs.style.position = 'absolute'; cvs.style.left = `${(rect.width - w)/2}px`; cvs.style.top = `${(rect.height - h)/2}px`;
    };
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    function draw() {
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      if (stateRef.current === "ACTIVE" || stateRef.current === "FEEDBACK") {
        ctx.beginPath(); ctx.arc(greenBallRef.current.x, greenBallRef.current.y, greenBallRef.current.r, 0, Math.PI * 2); ctx.fillStyle = "#4CAF50"; ctx.fill(); ctx.strokeStyle = "#2E7D32"; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(redBallRef.current.x, redBallRef.current.y, redBallRef.current.r, 0, Math.PI * 2); ctx.fillStyle = "#E53935"; ctx.fill(); ctx.strokeStyle = "#B71C1C"; ctx.lineWidth = 2; ctx.stroke();
      }
      if (stateRef.current === "ACTIVE") { ctx.font = "bold 20px Arial"; ctx.textAlign = "center"; ctx.fillStyle = activeCommandRef.current === "GREEN" ? "#4CAF50" : "#E53935"; ctx.fillText(`CLICK ${activeCommandRef.current} CIRCLE`, cvs.width / 2, 50); }
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(m.x - 15, m.y); ctx.lineTo(m.x + 15, m.y); ctx.moveTo(m.x, m.y - 15); ctx.lineTo(m.x, m.y + 15); ctx.stroke();
        ctx.beginPath(); ctx.arc(m.x, m.y, 20, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)'; ctx.stroke();
        ctx.fillStyle = '#00ff88'; ctx.fillRect(m.x - 2, m.y - 2, 4, 4);
      }
      animationRef.current = requestAnimationFrame(draw);
    }
    animationRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); resizeObserver.disconnect(); };
  }, [gameState, isBoxDarkMode]);

  const startGame = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setBestReaction(0); setWindowTime(1000);
    setTimeLeft(60); setLives(3); setSuccessfulHits(0); setGreenHits(0); setRedHits(0); setFeedback(''); setCurrentCommand(''); setPenaltyCount(0);
    isActiveRef.current = true; stateRef.current = "IDLE"; windowTimeRef.current = 1000; streakRef.current = 0; scoreRef.current = 0; livesRef.current = 3; bestStreakRef.current = 0;
    activeCommandRef.current = ""; canClickRef.current = true; waitingForNextRef.current = false;
    clearAllTimeouts(); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    setTimeout(() => { if (isActiveRef.current) { initAudio(); spawn(); } }, 300);
  }, [clearAllTimeouts, initAudio, spawn]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false; clearAllTimeouts();
    if (currentSoundRef.current) { try { currentSoundRef.current.stop(); } catch (e) {}; currentSoundRef.current = null; }
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setStreak(0); setBestStreak(0); setBestReaction(0); setWindowTime(1000); setTimeLeft(60); setLives(3);
    setSuccessfulHits(0); setGreenHits(0); setRedHits(0); setFeedback(''); setPenaltyCount(0);
    stateRef.current = "IDLE"; windowTimeRef.current = 1000; streakRef.current = 0; scoreRef.current = 0; livesRef.current = 3; bestStreakRef.current = 0;
  }, [clearAllTimeouts]);

  useEffect(() => { return () => { isActiveRef.current = false; clearAllTimeouts(); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (currentSoundRef.current) { try { currentSoundRef.current.stop(); } catch (e) {} } }; }, [clearAllTimeouts]);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading sound reaction drill...</p></div></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Neuro-Switch - Sound Reaction Training", "url": "https://skilldrills.online/drills/visual/reaction-speed/sound-reaction", "description": "Auditory reaction speed training. High pitch (1200Hz) = click GREEN circle, Low pitch (250Hz) = click RED circle. Adaptive 300-1000ms window. 60s challenge with 3 lives and streak bonuses.", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "author": { "@type": "Organization", "name": "Global Drill System" }, "educationalUse": ["Auditory Processing", "Reaction Speed", "Cognitive Flexibility", "Sound Discrimination"], "learningResourceType": "Interactive Exercise", "timeRequired": "PT60S", "interactivityType": "active", "inLanguage": "en-US", "teaches": ["Sound Reaction", "Pitch Discrimination", "Auditory Cues", "Cognitive Switching"] }) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/visual" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Reaction Speed</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">Neuro-Switch</li></ol></nav>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0"><Radio className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Neuro-Switch</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Audio-cued • High pitch = Green / Low pitch = Red</p></div></div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset session" aria-label="Reset drill session"><RefreshCw className="w-5 h-5" /></button>}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={isDarkMode ? 'Light mode' : 'Dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle drill area theme" title="Toggle drill area theme"><Eye className="w-5 h-5" /></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} title={soundEnabled ? 'Mute' : 'Unmute'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>
        <section className="sr-only" aria-label="Drill description for search engines"><h2>Neuro-Switch - Sound Reaction Speed Training</h2><p>Train auditory reaction speed by responding to high and low pitch cues. High pitch (1200Hz) = click GREEN circle. Low pitch (250Hz) = click RED circle. Audio cue plays once, then both circles appear. Adaptive 300-1000ms window tightens with success. 60-second challenge with 3 lives, 5-streak bonuses, and reaction time tracking.</p></section>
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<Radio className="text-gray-500" />} value={greenHits} label="Green" isDark={isDarkMode} />
        </div>
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div></div>
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (<><div className="absolute top-4 right-4 z-20 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session" aria-label="Reset drill session"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div><div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">Score: <span className="text-yellow-400 font-bold">{score}</span> | Command: <span style={{color: currentCommand === 'GREEN' ? '#4CAF50' : '#E53935'}} className="font-bold">{currentCommand || 'WAIT'}</span></div></>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} aria-hidden="true" />
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Radio className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Neuro-Switch</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>React to audio cues and click the matching circle</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>High pitch = Green circle. Low pitch = Red circle. Adaptive window 300-1000ms.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" aria-label="Start sound reaction training">Start Training</button></div></div>)}
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time&apos;s Up!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve your auditory reaction speed and cognitive flexibility.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Green Hits" value={greenHits} icon={<Radio className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} /><ResultCard label="Red Hits" value={redHits} icon={<Radio className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Best Reaction" value={bestReaction || '-'} unit="ms" icon={<Timer className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>
        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules and scoring information"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How Neuro-Switch Works</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">High pitch (1200Hz) = Click GREEN</span> circle</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">Low pitch (250Hz) = Click RED</span> circle</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Correct click: +1 point</span></p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">Wrong click = -1 life</span> (3 lives total)</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">0 lives = -1 point penalty</span> per mistake</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">Missing the click = No penalty</span> • 5-streak bonus</p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>🔊 High pitch = Green • Low pitch = Red • Window: 300-1000ms</span><span>⚡ Best Score saves locally</span></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>); }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' }, emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' }, cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' } }; const colors = colorMap[color] || colorMap.blue; return (<div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}><div className="flex items-center gap-2 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span></div>); }