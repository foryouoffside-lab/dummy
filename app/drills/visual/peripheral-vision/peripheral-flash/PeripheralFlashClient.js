'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Award, Activity, BarChart3, RefreshCw, ScanEye,
  Circle, Square, Triangle, GraduationCap, Lightbulb, TrendingUp,
  CheckCircle2, Star, ArrowRight, Share2, Copy, Heart, Clock
} from 'lucide-react';

const FLASH_DURATION = 300;
const FLASH_GAP = 400;
const SEQUENCE_GAP_MIN = 1500;
const SEQUENCE_GAP_MAX = 2500;
const FLASHES_MIN = 5;
const FLASHES_MAX = 6;
const GAME_DURATION = 60;
const CORRECT_BONUS = 1;
const WRONG_PENALTY = 1;
const STREAK_BONUS_THRESHOLD = 3;

const SHAPES = ['circle', 'square', 'triangle', 'diamond'];
const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function PeripheralFlashClient() {
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Rotate Your Device");

  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua) || 
                       (navigator.maxTouchPoints > 0 && 
                        window.screen && Math.max(window.screen.width, window.screen.height) < 1024);
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
  const containerRef = useRef(null);
  const gameAreaRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [totalHits, setTotalHits] = useState(0);
  const [totalMisses, setTotalMisses] = useState(0);
  const [totalPasses, setTotalPasses] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashData, setFlashData] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [flashCount, setFlashCount] = useState(0);
  const [totalFlashesInSequence, setTotalFlashesInSequence] = useState(0);
  const [showSequenceIndicator, setShowSequenceIndicator] = useState(false);
  const [centerFeedback, setCenterFeedback] = useState('');
  const [centerFeedbackType, setCenterFeedbackType] = useState('');
  
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const flashSequenceTimeoutRef = useRef(null);
  const sequenceGapTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const centerFeedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const totalHitsRef = useRef(0);
  const totalMissesRef = useRef(0);
  const totalPassesRef = useRef(0);
  const bestStreakRef = useRef(0);
  const currentSequenceRef = useRef([]);
  const currentFlashIndexRef = useRef(0);
  const flashAnimationRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('peripheralFlashBestScore');
      if (savedBestScore) { const p = parseInt(savedBestScore, 10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('peripheralFlashBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('peripheralFlashBestScore', finalScore.toString());
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
        if (document.fullscreenElement) await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) { console.error('Fullscreen error:', error); }
  }, [isFullscreen]);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 2000);
  }, []);

  const showCenterFeedback = useCallback((message, type) => {
    if (centerFeedbackTimeoutRef.current) clearTimeout(centerFeedbackTimeoutRef.current);
    setCenterFeedback(message); setCenterFeedbackType(type);
    centerFeedbackTimeoutRef.current = setTimeout(() => { setCenterFeedback(''); setCenterFeedbackType(''); }, 1500);
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
      const ctx = initAudio(); if (!ctx) return;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      const f = { correct: 880, wrong: 440, streak: 1046.5, flash: 660, pass: 330 };
      o.frequency.setValueAtTime(f[type] || 440, now);
      g.gain.setValueAtTime(type === 'wrong' ? 0.05 : 0.08, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      o.start(now); o.stop(now + 0.2);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const clearAllIntervals = useCallback(() => {
    if (flashSequenceTimeoutRef.current) clearTimeout(flashSequenceTimeoutRef.current);
    if (sequenceGapTimeoutRef.current) clearTimeout(sequenceGapTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (flashAnimationRef.current) cancelAnimationFrame(flashAnimationRef.current);
  }, []);

  const generateFlashSequence = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    const numFlashes = Math.floor(Math.random() * (FLASHES_MAX - FLASHES_MIN + 1)) + FLASHES_MIN;
    setTotalFlashesInSequence(numFlashes);
    setShowSequenceIndicator(numFlashes > 1 && !isFullscreen);
    const sequence = [];
    const usedPositions = new Set();
    for (let i = 0; i < numFlashes; i++) {
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      let position;
      do {
        const area = Math.floor(Math.random() * 8);
        let x, y;
        switch(area) {
          case 0: x = 20 + Math.random() * 60; y = 5 + Math.random() * 20; break;
          case 1: x = 70 + Math.random() * 25; y = 5 + Math.random() * 20; break;
          case 2: x = 80 + Math.random() * 15; y = 20 + Math.random() * 60; break;
          case 3: x = 70 + Math.random() * 25; y = 80 + Math.random() * 15; break;
          case 4: x = 20 + Math.random() * 60; y = 80 + Math.random() * 15; break;
          case 5: x = 5 + Math.random() * 25; y = 80 + Math.random() * 15; break;
          case 6: x = 5 + Math.random() * 15; y = 20 + Math.random() * 60; break;
          case 7: x = 5 + Math.random() * 25; y = 5 + Math.random() * 20; break;
        }
        position = `${Math.round(x)},${Math.round(y)}`;
      } while (usedPositions.has(position) && usedPositions.size < 8);
      usedPositions.add(position);
      const [posX, posY] = position.split(',').map(Number);
      sequence.push({ shape, color, x: posX, y: posY });
    }
    currentSequenceRef.current = sequence;
    currentFlashIndexRef.current = 0;
    flashSequenceTimeoutRef.current = setTimeout(() => { showNextFlash(); }, 300);
  }, [isFullscreen]);

  const showNextFlash = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    const sequence = currentSequenceRef.current;
    const index = currentFlashIndexRef.current;
    if (index >= sequence.length) {
      setIsFlashing(false); setFlashData(null); setShowSequenceIndicator(false);
      flashSequenceTimeoutRef.current = setTimeout(() => { if (isActiveRef.current && gameStateRef.current === 'playing') setShowResponse(true); }, 150);
      return;
    }
    const flash = sequence[index];
    setFlashData(flash); setIsFlashing(true); setFlashCount(index + 1); playSound('flash');
    flashSequenceTimeoutRef.current = setTimeout(() => {
      if (flashAnimationRef.current) cancelAnimationFrame(flashAnimationRef.current);
      setFlashData(null); setIsFlashing(false);
      currentFlashIndexRef.current++;
      if (currentFlashIndexRef.current < sequence.length) {
        flashSequenceTimeoutRef.current = setTimeout(() => { showNextFlash(); }, FLASH_GAP);
      } else {
        setShowSequenceIndicator(false);
        flashSequenceTimeoutRef.current = setTimeout(() => { if (isActiveRef.current && gameStateRef.current === 'playing') setShowResponse(true); }, 150);
      }
    }, FLASH_DURATION);
  }, [playSound]);

  const handleResponse = useCallback((response) => {
    if (!isActiveRef.current) return;
    const sequence = currentSequenceRef.current;
    const targetFlash = sequence[sequence.length - 1];
    const correct = response === targetFlash.shape;
    if (correct) {
      scoreRef.current += CORRECT_BONUS; setScore(scoreRef.current);
      totalHitsRef.current++; setTotalHits(totalHitsRef.current);
      streakRef.current++; setStreak(streakRef.current);
      if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); }
      playSound('correct'); showCenterFeedback('✓ Correct!', 'correct');
      if (streakRef.current % STREAK_BONUS_THRESHOLD === 0) { playSound('streak'); showFeedback(`🔥 ${streakRef.current} Streak! +1`, 'success'); }
      else showFeedback(`✓ Correct! +1`, 'success');
    } else {
      totalMissesRef.current++; setTotalMisses(totalMissesRef.current);
      streakRef.current = 0; setStreak(0);
      if (response === 'pass') {
        totalPassesRef.current++; setTotalPasses(totalPassesRef.current);
        playSound('pass'); showCenterFeedback(`Passed - Was ${targetFlash.shape}`, 'pass');
        showFeedback(`Passed - Shape was ${targetFlash.shape}`, 'warning');
      } else {
        if (scoreRef.current > 0) { scoreRef.current -= WRONG_PENALTY; setScore(scoreRef.current); playSound('wrong'); showCenterFeedback(`✗ Wrong! -1 (Was ${targetFlash.shape})`, 'wrong'); showFeedback(`Wrong! -1 (Was ${targetFlash.shape})`, 'error'); }
        else { playSound('wrong'); showCenterFeedback(`✗ Wrong - Was ${targetFlash.shape}`, 'wrong'); showFeedback(`Wrong! Score at 0 (Was ${targetFlash.shape})`, 'error'); }
      }
    }
    if (scoreRef.current < 0) { scoreRef.current = 0; setScore(0); }
    updateBestScore(scoreRef.current);
    setShowResponse(false); currentSequenceRef.current = []; setFlashCount(0); setTotalFlashesInSequence(0);
    scheduleNextSequence();
  }, [playSound, showFeedback, showCenterFeedback, updateBestScore]);

  const scheduleNextSequence = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    const delay = Math.random() * (SEQUENCE_GAP_MAX - SEQUENCE_GAP_MIN) + SEQUENCE_GAP_MIN;
    sequenceGapTimeoutRef.current = setTimeout(() => { generateFlashSequence(); }, delay);
  }, [generateFlashSequence]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(p => {
          if (p <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; clearAllIntervals(); updateBestScore(scoreRef.current); setShowResponse(false); setIsFlashing(false); setFlashData(null); if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } return 0; }
          return p - 1;
        });
      }, 1000);
    }
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, timeLeft, updateBestScore, clearAllIntervals]);

  const startGame = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    clearAllIntervals();
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(GAME_DURATION);
    setTotalHits(0); setTotalMisses(0); setTotalPasses(0);
    setFeedback(''); setCenterFeedback(''); setCenterFeedbackType('');
    setShowResponse(false); setFlashData(null); setIsFlashing(false);
    setFlashCount(0); setTotalFlashesInSequence(0); setShowSequenceIndicator(false);
    isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0;
    bestStreakRef.current = 0; totalHitsRef.current = 0; totalMissesRef.current = 0; totalPassesRef.current = 0;
    currentSequenceRef.current = []; currentFlashIndexRef.current = 0;
    showFeedback('Focus on center • Detect shapes in periphery', 'success');
    setTimeout(() => generateFlashSequence(), 1000);
  }, [clearAllIntervals, generateFlashSequence, showFeedback]);

  const resetGame = useCallback(() => {
    clearAllIntervals();
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (centerFeedbackTimeoutRef.current) clearTimeout(centerFeedbackTimeoutRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setFeedback(''); setFeedbackType(''); setCenterFeedback(''); setCenterFeedbackType('');
    setShowResponse(false); setFlashData(null); setIsFlashing(false);
    setFlashCount(0); setTotalFlashesInSequence(0); setShowSequenceIndicator(false);
  }, [clearAllIntervals]);

  const getAccuracy = useCallback(() => {
    const t = totalHits + totalMisses;
    return t > 0 ? Math.round((totalHits / t) * 100) : 0;
  }, [totalHits, totalMisses]);

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Free Peripheral Flash Vision Training | SkillDrills',
          text: 'Train peripheral vision with controlled flash sequences. Free!',
          url: 'https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash'
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText('https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash');
      alert('Link copied!');
    }
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText('https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash');
    alert('Link copied!');
  };

  useEffect(() => { return () => { clearAllIntervals(); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); if (centerFeedbackTimeoutRef.current) clearTimeout(centerFeedbackTimeoutRef.current); }; }, [clearAllIntervals]);

  const renderShapeSVG = (shape, color = '#6366f1', size = 48) => {
    const strokeWidth = 3;
    switch(shape) {
      case 'circle': return (<svg width={size} height={size} viewBox="0 0 48 48"><defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle cx="24" cy="24" r="20" fill={color} opacity="0.9" filter="url(#glow)"/><circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/></svg>);
      case 'square': return (<svg width={size} height={size} viewBox="0 0 48 48"><defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect x="4" y="4" width="40" height="40" rx="4" fill={color} opacity="0.9" filter="url(#glow)"/><rect x="4" y="4" width="40" height="40" rx="4" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/></svg>);
      case 'triangle': return (<svg width={size} height={size} viewBox="0 0 48 48"><defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><polygon points="24,4 44,44 4,44" fill={color} opacity="0.9" filter="url(#glow)"/><polygon points="24,4 44,44 4,44" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/></svg>);
      case 'diamond': return (<svg width={size} height={size} viewBox="0 0 48 48"><defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><polygon points="24,4 44,24 24,44 4,24" fill={color} opacity="0.9" filter="url(#glow)"/><polygon points="24,4 44,24 24,44 4,24" fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.8"/></svg>);
      default: return null;
    }
  };

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Preparing peripheral vision training...</p></div></div>);

  return (
    <div className={`min-h-screen select-none transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ 
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Peripheral Flash - Vision Training & Peripheral Awareness Drill",
        "url": "https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash",
        "description": "Free peripheral vision training with controlled flash sequences of 5-6 shapes at 300ms each. Keep eyes fixed on center while detecting shapes in periphery. +1 correct -1 wrong scoring. 60-second timed challenge.",
        "applicationCategory": "EducationalApplication", "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
        "publisher": { "@type": "Organization", "name": "SkillDrills" },
        "educationalUse": ["Peripheral Vision Training", "Visual Awareness Development", "Visual Processing Practice", "Attention Training"],
        "learningResourceType": ["Interactive Exercise", "Visual Drill", "Perception Training"],
        "timeRequired": "PT60S", "interactivityType": "active", "inLanguage": "en-US",
        "teaches": ["Peripheral Vision", "Visual Detection", "Shape Recognition", "Peripheral Awareness"],
        "educationalLevel": "All Levels", "typicalAgeRange": "10-80",
        "datePublished": "2026-05-14", "dateModified": new Date().toISOString().split('T')[0],
        "version": "1.0", "isAccessibleForFree": true,
        "accessMode": ["visual"], "accessModeSufficient": ["visual"]
      }) }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li><Link href="/drills/visual" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Peripheral Vision</li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">Peripheral Flash</li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex-shrink-0 shadow-lg"><ScanEye className="w-6 h-6 text-white" /></div>
              <div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Peripheral Flash</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Free peripheral vision training • 5-6 Flash sequences • 60s rounds</p></div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {gameState==='playing' && <button onClick={resetGame} className={`p-2.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700':'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button>}
              <button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode?'Light mode':'Dark mode'}>{isDarkMode?<Sun className="w-5 h-5" />:<Moon className="w-5 h-5" />}</button>
              <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle game area theme"><Eye className="w-5 h-5" /></button>
              <button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled?'Mute sound':'Enable sound'}>{soundEnabled?<Volume2 className="w-5 h-5" />:<VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen?'Exit fullscreen':'Enter fullscreen'}>{isFullscreen?<Minimize2 className="w-5 h-5" />:<Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        <section className="sr-only"><h2>Peripheral Flash - Vision Training</h2><p>Train peripheral vision with controlled flash sequences. 5-6 shapes appear at 300ms each in peripheral field. Keep eyes on center while detecting shapes. +1 correct -1 wrong scoring. 60-second challenge.</p></section>

        {!isFullscreen && (
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mb-4">
            <StatCard icon={<Target className="w-4 h-4" />} value={score} label="Score" color="blue" isDark={isDarkMode} />
            <StatCard icon={<Trophy className="w-4 h-4" />} value={bestScore} label="Best" color="yellow" isDark={isDarkMode} />
            <StatCard icon={<Timer className="w-4 h-4" />} value={timeLeft} label="Time" unit="s" color={timeLeft<20?'red':'green'} isDark={isDarkMode} />
            <StatCard icon={<Zap className="w-4 h-4" />} value={streak} label="Streak" color="orange" isDark={isDarkMode} />
            <StatCard icon={<Award className="w-4 h-4" />} value={totalHits} label="Hits" color="emerald" isDark={isDarkMode} className="hidden sm:block" />
            <StatCard icon={<Activity className="w-4 h-4" />} value={getAccuracy()} label="Accuracy" unit="%" color="purple" isDark={isDarkMode} className="hidden sm:block" />
            <StatCard icon={<ScanEye className="w-4 h-4" />} value={totalPasses} label="Passed" color="pink" isDark={isDarkMode} className="hidden sm:block" />
          </div>
        )}

        <div className="h-12 mb-2 flex justify-center items-center">
          <div className={`px-4 py-2 rounded-lg text-white font-semibold text-sm transition-all duration-300 ${feedback ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} ${feedbackType==='success'?'bg-green-500':''}${feedbackType==='warning'?'bg-yellow-500':''}${feedbackType==='error'?'bg-red-500':''}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div>
        </div>

        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-2xl border-2 shadow-2xl'}`} style={{ background: isBoxDarkMode ? 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0a0a1a 100%)' : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)', aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'default' }}>
          {/* Mobile Rotate Device Warning Overlay */}
      {showRotateWarning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-6" aria-hidden="true">
          <div className="animate-bounce mb-4 text-blue-500">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{warningMessage}</h3>
          <p className="text-sm text-gray-400">Please use landscape orientation or fullscreen mode for the best training experience.</p>
        </div>
      )}

          <div className="absolute inset-0 opacity-5"><div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at center, ${isBoxDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div></div>
          <div ref={gameAreaRef} className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" className="drop-shadow-lg" aria-hidden="true">
                  <defs><filter id="plusGlow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                  <rect x="2" y="11" width="24" height="6" rx="1" fill="url(#plusGradient)" filter="url(#plusGlow)"/>
                  <rect x="11" y="2" width="6" height="24" rx="1" fill="url(#plusGradient)" filter="url(#plusGlow)"/>
                  <defs><linearGradient id="plusGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-8 h-8 border-2 border-purple-400/30 rounded-full animate-ping" /></div>
                {gameState === 'playing' && !isFlashing && !showResponse && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                    {centerFeedback ? (<span className={`font-semibold px-3 py-1 rounded-full ${centerFeedbackType === 'correct' ? 'bg-green-500/20 text-green-400' : centerFeedbackType === 'wrong' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{centerFeedback}</span>) : (<span className={isBoxDarkMode?'text-gray-400':'text-gray-500'}></span>)}
                  </div>
                )}
              </div>
            </div>
            {gameState === 'playing' && showSequenceIndicator && totalFlashesInSequence > 1 && !isFullscreen && (<div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${isBoxDarkMode ? 'bg-white/10 text-white/80' : 'bg-black/10 text-black/80'}`}>Flash {flashCount} of {totalFlashesInSequence}</div>)}
            {isFlashing && flashData && (<div className="absolute transition-all duration-200 ease-out" style={{ left: `${flashData.x}%`, top: `${flashData.y}%`, transform: 'translate(-50%, -50%) scale(1)', opacity: 1, animation: 'flashAppear 0.2s ease-out' }}><style jsx>{`@keyframes flashAppear { from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } to { transform: translate(-50%, -50%) scale(1); opacity: 1; } }`}</style>{renderShapeSVG(flashData.shape, flashData.color, 56)}</div>)}
            {showResponse && !isFlashing && gameState === 'playing' && (<div className="absolute inset-0 flex items-center justify-center z-20 animate-in fade-in zoom-in duration-300"><div className={`rounded-2xl p-6 shadow-2xl border backdrop-blur-xl ${isBoxDarkMode ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'} max-w-md mx-4`}><p className={`text-sm mb-1 text-center font-medium ${isBoxDarkMode?'text-gray-300':'text-gray-700'}`}>What was the <strong className="text-purple-500">last</strong> shape?</p>{totalFlashesInSequence > 1 && (<p className={`text-xs mb-4 text-center ${isBoxDarkMode?'text-gray-500':'text-gray-400'}`}>{totalFlashesInSequence} shapes were shown in sequence</p>)}<div className="grid grid-cols-2 gap-3 mb-4">{SHAPES.map(shape => (<button key={shape} onClick={() => handleResponse(shape)} className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 active:scale-95 ${isBoxDarkMode ? 'bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-white/10' : 'bg-gray-50 border-gray-200 hover:border-purple-400 hover:bg-purple-50'}`} aria-label={`Select ${shape}`}><div className="flex justify-center mb-2">{renderShapeSVG(shape, '#8b5cf6', 36)}</div><p className={`text-xs capitalize text-center font-medium ${isBoxDarkMode?'text-gray-300':'text-gray-700'}`}>{shape}</p></button>))}</div><button onClick={() => handleResponse('pass')} className={`w-full py-2.5 rounded-lg border transition-all hover:bg-opacity-80 text-sm ${isBoxDarkMode ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:bg-white/5' : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:bg-gray-50'}`} aria-label="Skip this one">Skip (No penalty)</button></div></div>)}
          </div>
          {gameState==='start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-2xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-2xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="mb-6"><div className="relative inline-block"><ScanEye className="w-20 h-20 text-purple-500 mx-auto" aria-hidden="true" /><div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full"></div></div></div><h2 className={`text-3xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Peripheral Flash</h2><p className={`mb-3 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Professional Vision Training</p><p className={`mb-6 text-sm leading-relaxed ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Train your peripheral vision to detect and identify shapes appearing in controlled flash sequences. Keep your eyes fixed on the center plus sign while shapes appear in your peripheral field.</p><div className={`mb-6 p-4 rounded-xl ${isBoxDarkMode?'bg-gray-700/30':'bg-gray-50'} border ${isBoxDarkMode?'border-gray-600':'border-gray-200'}`}><p className={`font-semibold mb-3 text-sm ${isBoxDarkMode?'text-gray-300':'text-gray-700'}`}>Scoring: +1 Correct | -1 Wrong (min 0) | 0 Skip</p><div className="grid grid-cols-4 gap-3">{SHAPES.map(shape => (<div key={shape} className="flex flex-col items-center">{renderShapeSVG(shape, '#8b5cf6', 32)}<span className={`text-xs mt-1 capitalize ${isBoxDarkMode?'text-gray-400':'text-gray-600'}`}>{shape}</span></div>))}</div></div><div className={`mb-6 text-xs text-left space-y-2 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div><span>5-6 flashes per sequence</span></div><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div><span>300ms per flash with 400ms gaps</span></div><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div><span>Identify the LAST shape</span></div><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div><span>-1 penalty for wrong answers (stops at 0)</span></div></div><button onClick={startGame} className="w-full px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800" aria-label="Start peripheral flash training">Start Free Drill</button></div></div>)}
          {gameState==='gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-2xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-2xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-6"><div className="p-2 bg-green-500/10 rounded-full"><Trophy className="w-10 h-10 text-green-500" aria-hidden="true" /></div></div><h2 className={`text-2xl font-bold text-center mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Session Complete!</h2><p className={`text-center text-sm mb-6 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Great job training your peripheral vision</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} /><ResultCard label="Hits" value={totalHits} icon={<Award className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Passed" value={totalPasses} icon={<ScanEye className="w-4 h-4" />} color="pink" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-3 rounded-lg font-semibold transition-all ${isDarkMode?'bg-gray-700 text-gray-300 hover:bg-gray-600':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link><button onClick={startGame} className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Train Again →</button></div></div></div>)}
        </div>

        {!isFullscreen && (<footer className="mt-6"><div className={`rounded-xl border overflow-hidden shadow-lg ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-5 py-4 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-5 h-5 ${isDarkMode?'text-purple-400':'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Training Protocol</h2></div></div><div className="p-5"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div><h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}><Target className="w-4 h-4" />Setup</h3><ul className="space-y-2 text-sm"><li className="flex items-start gap-2"><span className="text-purple-500 mt-1">•</span><span className={isDarkMode?'text-gray-300':'text-gray-600'}>Position yourself at a comfortable distance from the screen</span></li><li className="flex items-start gap-2"><span className="text-purple-500 mt-1">•</span><span className={isDarkMode?'text-gray-300':'text-gray-600'}>Keep your eyes fixed on the center plus sign (+) at all times</span></li><li className="flex items-start gap-2"><span className="text-purple-500 mt-1">•</span><span className={isDarkMode?'text-gray-300':'text-gray-600'}>Use fullscreen mode for best results</span></li></ul></div><div><h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}><ScanEye className="w-4 h-4" />The Flash Sequence</h3><ul className="space-y-2 text-sm"><li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span><span className={isDarkMode?'text-gray-300':'text-gray-600'}>5-6 shapes appear randomly in your peripheral vision</span></li><li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span><span className={isDarkMode?'text-gray-300':'text-gray-600'}>Each shape shown for 300ms with 400ms gaps</span></li><li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span><span className={isDarkMode?'text-gray-300':'text-gray-600'}>Focus on detecting without moving your eyes</span></li></ul></div><div><h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode?'text-green-400':'text-green-600'}`}><Award className="w-4 h-4" />Response & Scoring</h3><ul className="space-y-2 text-sm"><li className="flex items-start gap-2"><span className="text-green-500 mt-1">•</span><span className={isDarkMode?'text-gray-300':'text-gray-600'}>Identify the LAST shape in the sequence</span></li><li className="flex items-start gap-2"><span className="text-green-500 mt-1">•</span><span className={isDarkMode?'text-gray-300':'text-gray-600'}>+1 point for correct answer</span></li><li className="flex items-start gap-2"><span className="text-red-500 mt-1">•</span><span className={isDarkMode?'text-gray-300':'text-gray-600'}>-1 point for wrong answer (minimum 0)</span></li><li className="flex items-start gap-2"><span className="text-yellow-500 mt-1">•</span><span className={isDarkMode?'text-gray-300':'text-gray-600'}>0 points for skip</span></li></ul></div></div><div className={`mt-5 pt-4 border-t text-xs text-center ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}><strong>Scoring:</strong> +1 Correct | -1 Wrong (min 0) | 0 Skip • <strong> Pro Tip:</strong> Focus on the last shape in each sequence for best results.</div></div></div></footer>)}

        {!isFullscreen && (
          <section className="mt-8" aria-label="About this peripheral flash drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Peripheral Flash Drill</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This free peripheral flash drill trains peripheral vision and visual awareness by challenging you to detect and identify shapes appearing in your peripheral field while keeping your eyes fixed on a center point. Sequences of 5-6 shapes flash for 300ms each at random positions around the screen with 400ms gaps between flashes. You must identify the last shape in each sequence without moving your eyes from the center plus sign. Perfect for athletes improving court vision drivers enhancing peripheral awareness gamers developing screen-wide visual processing and anyone wanting better peripheral detection skills.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Athletes improving court vision, drivers enhancing peripheral awareness, gamers developing screen-wide processing, and anyone wanting better visual detection skills.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Peripheral vision, visual detection speed, shape recognition without direct focus, visual attention, and the ability to process peripheral information accurately.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, accuracy percentage, hits count, streak, passes count, and best performance records saved locally.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Peripheral Vision?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Essential for sports driving and any activity requiring wide-field awareness</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />300ms flashes simulate real-world brief peripheral events</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Skip option allows strategic decision-making without penalty</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Keep eyes locked on center plus sign throughout each sequence</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Focus on identifying only the last shape in each sequence</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Use skip when uncertain to avoid penalty points</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 10-15 minutes daily for best peripheral vision improvement</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="Related visual and cognitive drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Visual & Cognitive Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/visual/depth-perception/distance-judgment" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Star className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Distance Judgment</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Intercept moving spheres at target depth with color and blur feedback.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/spatial-memory/grid-memorization" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><Star className="w-4 h-4 text-green-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} transition-colors`}>Grid Memorization</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize lit cell positions on progressive grids with instant fail on wrong clicks.</p><div className="flex items-center gap-1 mt-3 text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/spatial-memory/path-tracing" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Star className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Path Tracing</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Watch animated dot paths on expanding grids then retrace in exact order.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/motor/hand-eye-coordination/aim-trainer" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Target className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Aim Trainer Elite</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Dynamic shrinking targets with streak tracking and 3-life protection system.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/short-term-memory/color-sequence" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Star className="w-4 h-4 text-cyan-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>Color Sequence</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Watch color sequences then tap colors in order with progressive difficulty.</p><div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/long-term-memory/paired-associates" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Heart className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Paired Associates</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize word pairs then select the correct match from 3 options with adaptive rounds.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/memory/card-matching" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Activity className="w-4 h-4 text-teal-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Cognitive</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Card Matching</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Classic memory card game to improve visual memory and concentration skills.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div><h3 className="text-white font-semibold mb-3 text-sm">Visual Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/peripheral-vision/peripheral-flash" className="hover:text-white transition-colors">Peripheral Flash</Link></li><li><Link href="/drills/visual/depth-perception/distance-judgment" className="hover:text-white transition-colors">Distance Judgment</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Memory Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory/spatial-memory/grid-memorization" className="hover:text-white transition-colors">Grid Memorization</Link></li><li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-white transition-colors">Color Sequence</Link></li><li><Link href="/drills/memory/long-term-memory/paired-associates" className="hover:text-white transition-colors">Paired Associates</Link></li><li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 15 Memory Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Motor & FPS</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Aim Trainer Elite</Link></li><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/motor" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Motor Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic" className="hover:text-white transition-colors">Academic (12 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><ScanEye className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online peripheral flash drill for vision training. 5-6 shape sequences at 300ms in peripheral field. Keep eyes on center while detecting shapes. Perfect for athletes drivers and gamers. No registration required. More free drills at skilldrills.online.</p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free peripheral flash drill"><Share2 className="w-5 h-5" /></button>
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

function StatCard({ icon, value, label, unit = '', color, isDark, className = '' }) { 
  const colorMap = { blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' }, yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' }, orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' }, purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' }, green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' }, emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' }, red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' }, pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' } };
  const c = colorMap[color] || colorMap.blue;
  return (<div className={`rounded-xl shadow-sm border p-3 text-center flex flex-col justify-center h-full transition-all hover:scale-[1.02] ${c.bg} ${c.border} ${className}`}><div className={`mb-1 flex justify-center ${c.text}`} aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark?'text-gray-400':'text-gray-500'}`}>{label}</p></div>); 
}
function ResultCard({ label, value, unit = '', icon, color, isDark }) { 
  const colorMap = { blue: {bg:'bg-blue-500/10', border:'border-blue-500/20', text:'text-blue-400', icon:'text-blue-400'}, yellow: {bg:'bg-yellow-500/10', border:'border-yellow-500/20', text:'text-yellow-400', icon:'text-yellow-400'}, orange: {bg:'bg-orange-500/10', border:'border-orange-500/20', text:'text-orange-400', icon:'text-orange-400'}, purple: {bg:'bg-purple-500/10', border:'border-purple-500/20', text:'text-purple-400', icon:'text-purple-400'}, emerald: {bg:'bg-emerald-500/10', border:'border-emerald-500/20', text:'text-emerald-400', icon:'text-emerald-400'}, pink: {bg:'bg-pink-500/10', border:'border-pink-500/20', text:'text-pink-400', icon:'text-pink-400'} }; 
  const c = colorMap[color] || colorMap.blue; 
  return (<div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}><div className="flex items-center gap-2 min-w-0"><div className={c.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>{value}{unit}</span></div>); 
}