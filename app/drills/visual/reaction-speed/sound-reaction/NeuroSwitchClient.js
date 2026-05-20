'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Radio, Brain, X, Trophy, Info, Check, Heart, RefreshCw,
  GraduationCap, Lightbulb, TrendingUp, BarChart3, CheckCircle2, Star, ArrowRight, Share2, Copy
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

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('neuroSwitchBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('neuroSwitchBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('neuroSwitchBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) {}
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
    } catch (e) {}
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

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Free Neuro-Switch Sound Reaction Drill | SkillDrills',
          text: 'Train auditory reaction speed with high/low pitch cues. Free!',
          url: 'https://skilldrills.online/drills/visual/reaction-speed/sound-reaction'
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText('https://skilldrills.online/drills/visual/reaction-speed/sound-reaction');
      alert('Link copied!');
    }
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText('https://skilldrills.online/drills/visual/reaction-speed/sound-reaction');
    alert('Link copied!');
  };

  useEffect(() => { return () => { isActiveRef.current = false; clearAllTimeouts(); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (currentSoundRef.current) { try { currentSoundRef.current.stop(); } catch (e) {} } }; }, [clearAllTimeouts]);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading sound reaction drill...</p></div></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Neuro-Switch Drill - Auditory Reaction Speed & Cognitive Flexibility Training", "url": "https://skilldrills.online/drills/visual/reaction-speed/sound-reaction", "description": "Free auditory reaction speed drill with dual pitch discrimination. High pitch 1200Hz means click GREEN circle low pitch 250Hz means click RED circle. Adaptive 300-1000ms window tightens with success and expands on failure. 60-second challenge with 3 lives system and 5-streak bonuses. Green and red hit tracking with reaction time measurement.", "applicationCategory": "EducationalApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" }, "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" }, "publisher": { "@type": "Organization", "name": "SkillDrills" }, "educationalUse": ["Auditory Processing Training", "Reaction Speed Practice", "Cognitive Flexibility Exercise", "Sound Discrimination", "Dual-Task Training"], "learningResourceType": ["Interactive Exercise", "Reaction Drill", "Auditory Training"], "timeRequired": "PT60S", "interactivityType": "active", "inLanguage": "en-US", "teaches": ["Sound Reaction", "Pitch Discrimination", "Auditory Cues", "Cognitive Switching", "Dual Processing", "Response Inhibition"], "educationalLevel": "All Levels", "typicalAgeRange": "8-80", "datePublished": "2026-05-14", "dateModified": new Date().toISOString().split('T')[0], "version": "1.0", "isAccessibleForFree": true, "accessMode": ["auditory", "visual"], "accessModeSufficient": ["auditory", "visual"] }) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (<nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/visual" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Reaction Speed</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">Neuro-Switch</li></ol></nav>)}
        {!isFullscreen && (<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0"><Radio className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Neuro-Switch</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Free audio-cued reaction drill • High pitch = Green / Low pitch = Red</p></div></div><div className="flex gap-2 flex-shrink-0">{gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset session" aria-label="Reset drill session"><RefreshCw className="w-5 h-5" /></button>}<button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={isDarkMode ? 'Light mode' : 'Dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle drill area theme" title="Toggle drill area theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} title={soundEnabled ? 'Mute' : 'Unmute'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button></div></div>)}
        <section className="sr-only" aria-label="Drill description for search engines"><h2>Neuro-Switch - Sound Reaction Speed Training</h2><p>Train auditory reaction speed by responding to high and low pitch cues. High pitch (1200Hz) = click GREEN circle. Low pitch (250Hz) = click RED circle. Audio cue plays once, then both circles appear. Adaptive 300-1000ms window tightens with success. 60-second challenge with 3 lives, 5-streak bonuses, and reaction time tracking.</p></section>
        {!isFullscreen && (<div className="grid grid-cols-6 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} /><StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} /><StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} /><StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} /><StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" isDark={isDarkMode} /><StatCard icon={<Radio className="text-gray-500" />} value={greenHits} label="Green" isDark={isDarkMode} /></div>)}
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div></div>
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (<><div className="absolute top-4 right-4 z-20 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session" aria-label="Reset drill session"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div><div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">Score: <span className="text-yellow-400 font-bold">{score}</span> | Command: <span style={{color: currentCommand === 'GREEN' ? '#4CAF50' : '#E53935'}} className="font-bold">{currentCommand || 'WAIT'}</span></div></>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} aria-hidden="true" />
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Radio className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Neuro-Switch</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>React to audio cues and click the matching circle</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>High pitch = Green circle. Low pitch = Red circle. Adaptive window 300-1000ms.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" aria-label="Start sound reaction training">Start Free Drill</button></div></div>)}
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time&apos;s Up!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve your auditory reaction speed and cognitive flexibility.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Green Hits" value={greenHits} icon={<Radio className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} /><ResultCard label="Red Hits" value={redHits} icon={<Radio className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Best Reaction" value={bestReaction || '-'} unit="ms" icon={<Timer className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>
        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules and scoring information"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How Neuro-Switch Works</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">High pitch (1200Hz) = Click GREEN</span> circle</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">Low pitch (250Hz) = Click RED</span> circle</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Correct click: +1 point</span></p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">Wrong click = -1 life</span> (3 lives total)</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">0 lives = -1 point penalty</span> per mistake</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">Missing the click = No penalty</span> • 5-streak bonus</p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>🔊 High pitch = Green • Low pitch = Red • Window: 300-1000ms</span><span>⚡ Best Score saves locally</span></div></div></div></footer>)}

        {!isFullscreen && (
          <section className="mt-8" aria-label="About this neuro-switch sound reaction drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Neuro-Switch Drill</h2>
                </div>
              </div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This free Neuro-Switch drill trains auditory reaction speed and cognitive flexibility by challenging you to respond to dual pitch audio cues. A single sound plays at either high pitch (1200Hz sine wave) or low pitch (250Hz sawtooth wave). High pitch means click the GREEN circle, low pitch means click the RED circle. Both circles appear simultaneously in random positions on the canvas with a minimum distance between them. The adaptive window starts at 1000ms and tightens by 25ms with each successful hit down to 300ms, expanding by 50ms on failures. With 3 lives and a penalty system, the drill tracks green hits, red hits, reaction times, and streaks. Perfect for gamers improving audio cue response, musicians enhancing pitch discrimination, and anyone wanting faster auditory reaction speed and cognitive switching ability.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gamers improving audio cue response, musicians enhancing pitch discrimination, athletes training reaction speed, and anyone wanting faster auditory processing and cognitive switching between high and low pitch commands.</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}>
                    <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3></div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Auditory reaction speed, pitch discrimination, cognitive flexibility, response inhibition, dual processing, and the ability to quickly map sound cues to visual targets under adaptive time pressure.</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, green hits, red hits, best reaction time, streak count, lives remaining, adaptive window time, penalty count, and best performance records saved locally.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}>
                    <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Neuro-Switch?</h3></div>
                    <ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Builds rapid audio-to-action response critical for gaming and sports</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Dual pitch discrimination exercises cognitive flexibility and switching</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Adaptive window ensures continuous challenge at your current skill level</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}>
                    <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3></div>
                    <ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Listen carefully to the single audio cue before moving your cursor</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Focus on accuracy first as speed develops naturally with practice</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Build streaks to tighten the adaptive window for faster responses</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 10-15 minutes daily for best auditory reaction improvement</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="Related visual and reaction drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/visual/reaction-speed/light-reaction" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Zap className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Light Reaction</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Test and improve visual reaction speed with simple light-based click response.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/flick-shot-training" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><Target className="w-4 h-4 text-green-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} transition-colors`}>Flick Shot Trainer</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Improve aim with raw mouse input flick training and adaptive target windows.</p><div className="flex items-center gap-1 mt-3 text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/working-memory/n-back" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Brain className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>3-Back Training</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Classic N-Back working memory task at 3-back difficulty with 60 letters per round.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/working-memory/mental-arithmetic" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Star className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Mental Arithmetic</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Solve timed math problems with 4 operations across 8 adaptive difficulty levels.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/visual/tracking-accuracy/moving-target" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Target className="w-4 h-4 text-cyan-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>Moving Target</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Track and click moving targets to improve visual tracking accuracy and precision.</p><div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/reactive-tracking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Activity className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Reactive Tracking</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Track targets that change direction randomly to build reactive aim skills.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/short-term-memory/color-sequence" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Star className="w-4 h-4 text-teal-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Color Sequence</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Watch color sequences then tap colors in order with progressive difficulty.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/memory/card-matching" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center"><Activity className="w-4 h-4 text-indigo-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Cognitive</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} transition-colors`}>Card Matching</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Classic memory card game to improve visual memory and concentration skills.</p><div className="flex items-center gap-1 mt-3 text-indigo-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div><h3 className="text-white font-semibold mb-3 text-sm">Reaction Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/sound-reaction" className="hover:text-white transition-colors">Neuro-Switch</Link></li><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Light Reaction</Link></li><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Memory</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory/working-memory/n-back" className="hover:text-white transition-colors">3-Back Training</Link></li><li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-white transition-colors">Color Sequence</Link></li><li><Link href="/drills/memory/working-memory/mental-arithmetic" className="hover:text-white transition-colors">Mental Arithmetic</Link></li><li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 15 Memory Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">FPS & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic" className="hover:text-white transition-colors">Academic (12 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online neuro-switch drill for auditory reaction speed training. Dual pitch discrimination with high pitch 1200Hz green circle and low pitch 250Hz red circle. Adaptive 300-1000ms window with 3 lives system. Perfect for gamers musicians and anyone wanting faster audio cue response. No registration required. More free drills at skilldrills.online.</p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free neuro-switch drill"><Share2 className="w-5 h-5" /></button>
                  <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard"><Copy className="w-5 h-5" /></button>
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

function StatCard({ icon, value, label, unit = '', isDark }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>); }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' }, emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' }, cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' } }; const colors = colorMap[color] || colorMap.blue; return (<div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}><div className="flex items-center gap-2 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span></div>); }