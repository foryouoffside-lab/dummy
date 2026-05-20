'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Award, Activity, BarChart3, Search, RefreshCw,
  GraduationCap, Lightbulb, TrendingUp, CheckCircle2, Star, ArrowRight, Share2, Copy
} from 'lucide-react';

const CHARS = "ABCDEF0123456789";
const GRID_SIZE = 100;
const COLS = 10;
const STAMINA_MAX = 100;
const STAMINA_DECAY = 0.5;
const STAMINA_CORRECT_BONUS = 5;
const STAMINA_WRONG_PENALTY = 15;
const ENTROPY_CORRUPT_COUNT = 3;
const ENTROPY_INTERVAL = 800;
const TARGET_REFRESH_INTERVAL = 15000;
const GAME_DURATION = 60;

function getRandomChar() { return CHARS[Math.floor(Math.random() * CHARS.length)]; }
function getRandomString() { return getRandomChar() + getRandomChar(); }

export default function EntropicGridClient() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [stamina, setStamina] = useState(STAMINA_MAX);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [target, setTarget] = useState('--');
  const [totalHits, setTotalHits] = useState(0);
  const [totalMisses, setTotalMisses] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const cellsRef = useRef([]);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const staminaRef = useRef(STAMINA_MAX);
  const targetRef = useRef('--');
  const entropyIntervalRef = useRef(null);
  const targetRefreshIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const totalHitsRef = useRef(0);
  const totalMissesRef = useRef(0);
  const bestStreakRef = useRef(0);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('entropicGridBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('entropicGridBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('entropicGridBestScore', finalScore.toString());
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
      const ctx = initAudio(); if (!ctx) return;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      const f = { correct: 880, wrong: 440, streak: 1046.5, depleted: 220 };
      o.frequency.setValueAtTime(f[type] || 440, now);
      g.gain.setValueAtTime(type === 'depleted' ? 0.15 : type === 'wrong' ? 0.08 : 0.1, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      o.start(now); o.stop(now + 0.15);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const clearAllIntervals = useCallback(() => {
    if (entropyIntervalRef.current) clearInterval(entropyIntervalRef.current);
    if (targetRefreshIntervalRef.current) clearInterval(targetRefreshIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }, []);

  const entropy = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    for (let i = 0; i < ENTROPY_CORRUPT_COUNT; i++) {
      const idx = Math.floor(Math.random() * GRID_SIZE);
      const cell = cellsRef.current[idx];
      if (cell && !cell.classList.contains('hit')) {
        cell.textContent = (Math.random() > 0.05) ? getRandomString() : targetRef.current;
      }
    }
    staminaRef.current -= STAMINA_DECAY;
    setStamina(staminaRef.current);
    if (staminaRef.current <= 0) {
      staminaRef.current = 0; setStamina(0);
      setGameState('gameOver'); gameStateRef.current = 'gameOver';
      isActiveRef.current = false; clearAllIntervals();
      updateBestScore(scoreRef.current);
      playSound('depleted'); showFeedback('Neural Depletion! Game Over', 'error');
    }
  }, [clearAllIntervals, updateBestScore, playSound, showFeedback]);

  const initGrid = useCallback(() => {
    const newTarget = getRandomString();
    targetRef.current = newTarget; setTarget(newTarget);
    if (gridRef.current) {
      gridRef.current.innerHTML = ''; cellsRef.current = [];
      for (let i = 0; i < GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        Object.assign(cell.style, { 
          width:'100%', 
          aspectRatio:'1', 
          display:'flex', 
          alignItems:'center', 
          justifyContent:'center', 
          fontSize:'1.2rem', 
          cursor:'pointer', 
          transition:'background 0.1s, color 0.1s', 
          border:isBoxDarkMode?'1px solid #1a1a1a':'1px solid #ddd', 
          borderRadius:'4px', 
          userSelect:'none' 
        });
        cell.textContent = (Math.random() > 0.08) ? getRandomString() : newTarget;
        cell.addEventListener('click', () => checkCell(cell));
        gridRef.current.appendChild(cell); 
        cellsRef.current.push(cell);
      }
      updateCellColors();
    }
  }, [isBoxDarkMode]);

  const updateCellColors = useCallback(() => {
    cellsRef.current.forEach(cell => {
      cell.style.background = isBoxDarkMode ? '#0a0a0a' : '#f5f5f5';
      cell.style.color = isBoxDarkMode ? '#888' : '#333';
    });
  }, [isBoxDarkMode]);

  const checkCell = useCallback((cell) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    if (cell.textContent === targetRef.current) {
      cell.classList.add('hit'); 
      cell.style.color = '#3b82f6'; 
      cell.style.textShadow = '0 0 10px #3b82f6'; 
      cell.textContent = "++";
      scoreRef.current += 1; 
      setScore(scoreRef.current);
      totalHitsRef.current++; 
      setTotalHits(totalHitsRef.current);
      streakRef.current++; 
      setStreak(streakRef.current);
      if (streakRef.current > bestStreakRef.current) { 
        bestStreakRef.current = streakRef.current; 
        setBestStreak(streakRef.current); 
      }
      staminaRef.current = Math.min(STAMINA_MAX, staminaRef.current + STAMINA_CORRECT_BONUS); 
      setStamina(staminaRef.current);
      playSound('correct');
      if (streakRef.current % 5 === 0) { 
        playSound('streak'); 
        showFeedback(`🔥 ${streakRef.current} Streak! +1`, 'success'); 
      }
      else showFeedback('✓ Found! +1', 'success');
      setTimeout(() => { 
        if (isActiveRef.current) { 
          cell.textContent = getRandomString(); 
          cell.classList.remove('hit'); 
          cell.style.color = isBoxDarkMode ? '#888' : '#333'; 
          cell.style.textShadow = 'none'; 
        } 
      }, 500);
    } else {
      staminaRef.current -= STAMINA_WRONG_PENALTY; 
      setStamina(staminaRef.current);
      totalMissesRef.current++; 
      setTotalMisses(totalMissesRef.current);
      streakRef.current = 0; 
      setStreak(0);
      cell.classList.add('miss'); 
      cell.style.color = '#ef4444';
      playSound('wrong'); 
      showFeedback(`✗ Wrong! -${STAMINA_WRONG_PENALTY} stamina`, 'error');
      setTimeout(() => { 
        cell.classList.remove('miss'); 
        cell.style.color = isBoxDarkMode ? '#888' : '#333'; 
      }, 300);
      if (staminaRef.current <= 0) { 
        staminaRef.current = 0; 
        setStamina(0); 
        setGameState('gameOver'); 
        gameStateRef.current = 'gameOver'; 
        isActiveRef.current = false; 
        clearAllIntervals(); 
        updateBestScore(scoreRef.current); 
        playSound('depleted'); 
        showFeedback('Neural Depletion! Game Over', 'error'); 
      }
    }
  }, [isBoxDarkMode, clearAllIntervals, updateBestScore, playSound, showFeedback]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => { 
        setTimeLeft(p => { 
          if (p <= 1) { 
            setGameState('gameOver'); 
            gameStateRef.current = 'gameOver'; 
            isActiveRef.current = false; 
            clearAllIntervals(); 
            updateBestScore(scoreRef.current); 
            if (timerIntervalRef.current) { 
              clearInterval(timerIntervalRef.current); 
              timerIntervalRef.current = null; 
            } 
            return 0; 
          } 
          return p - 1; 
        }); 
      }, 1000);
    }
    return () => { 
      if (timerIntervalRef.current) { 
        clearInterval(timerIntervalRef.current); 
        timerIntervalRef.current = null; 
      } 
    };
  }, [gameState, timeLeft, updateBestScore, clearAllIntervals]);

  const startGame = useCallback(() => {
    clearAllIntervals();
    setGameState('playing'); 
    gameStateRef.current = 'playing';
    setScore(0); 
    setStreak(0); 
    setBestStreak(0); 
    setStamina(STAMINA_MAX);
    setTimeLeft(GAME_DURATION); 
    setTotalHits(0); 
    setTotalMisses(0); 
    setFeedback('');
    isActiveRef.current = true; 
    scoreRef.current = 0; 
    streakRef.current = 0; 
    bestStreakRef.current = 0;
    staminaRef.current = STAMINA_MAX; 
    totalHitsRef.current = 0; 
    totalMissesRef.current = 0;
    initGrid();
    entropyIntervalRef.current = setInterval(() => entropy(), ENTROPY_INTERVAL);
    targetRefreshIntervalRef.current = setInterval(() => { 
      if (isActiveRef.current && gameStateRef.current === 'playing') { 
        initGrid(); 
        showFeedback('🔄 New target! Memory flush', 'warning'); 
      } 
    }, TARGET_REFRESH_INTERVAL);
    showFeedback('60 seconds • Find the target!', 'success');
  }, [clearAllIntervals, initGrid, entropy, showFeedback]);

  const resetGame = useCallback(() => {
    clearAllIntervals(); 
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false; 
    setGameState('start'); 
    gameStateRef.current = 'start';
    if (gridRef.current) gridRef.current.innerHTML = '';
    setFeedback(''); 
    setFeedbackType('');
  }, [clearAllIntervals]);

  const getAccuracy = useCallback(() => { 
    const t = totalHits + totalMisses; 
    return t > 0 ? Math.round((totalHits / t) * 100) : 100; 
  }, [totalHits, totalMisses]);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Entropic Grid Visual Search Drill | SkillDrills', text: 'Train visual search with entropy and stamina system. Free!', url: 'https://skilldrills.online/drills/visual/visual-recognition/entropic-grid' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/visual/visual-recognition/entropic-grid'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/visual/visual-recognition/entropic-grid'); alert('Link copied!'); };

  useEffect(() => { 
    return () => { 
      clearAllIntervals(); 
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); 
    }; 
  }, [clearAllIntervals]);

  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading entropic grid drill...</p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ 
        "@context": "https://schema.org", 
        "@type": "WebApplication", 
        "name": "Entropic Grid Drill - Visual Search & Cognitive Stamina Training", 
        "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid", 
        "description": "Free visual search drill with entropy and stamina system. Find 2-character targets in a 100-cell grid while entropy corrupts 3 cells every 800ms. Stamina depletes naturally -0.5/s with +5 bonus for correct hits and -15 penalty for wrong clicks. Target changes every 15s with memory flush. 60-second timed challenge with streak tracking.", 
        "applicationCategory": "EducationalApplication", 
        "operatingSystem": "All", 
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" }, 
        "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" }, 
        "publisher": { "@type": "Organization", "name": "SkillDrills" }, 
        "educationalUse": ["Visual Search Training", "Sustained Attention", "Cognitive Stamina", "Processing Speed", "Visual Discrimination"], 
        "learningResourceType": ["Interactive Exercise", "Visual Drill", "Search Training"], 
        "timeRequired": "PT60S", 
        "interactivityType": "active", 
        "inLanguage": "en-US", 
        "teaches": ["Visual Search", "Sustained Attention", "Cognitive Control", "Pattern Recognition", "Processing Speed"], 
        "educationalLevel": "All Levels", 
        "typicalAgeRange": "10-80", 
        "datePublished": "2026-05-14", 
        "dateModified": new Date().toISOString().split('T')[0], 
        "version": "1.0", 
        "isAccessibleForFree": true, 
        "accessMode": ["visual"], 
        "accessModeSufficient": ["visual"] 
      }) }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (<nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/visual" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li><li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`}>Visual Recognition</li><li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode?'text-blue-400':'text-blue-600'}`} aria-current="page">Entropic Grid</li></ol></nav>)}
        
        {!isFullscreen && (<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex-shrink-0"><Search className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Entropic Grid</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Free visual search drill • Stamina system • 60s challenge</p></div></div><div className="flex gap-2 flex-shrink-0">{gameState==='playing' && (<button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700':'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button>)}<button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode?'Light mode':'Dark mode'}>{isDarkMode?<Sun className="w-5 h-5" />:<Moon className="w-5 h-5" />}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Theme"><Eye className="w-5 h-5" /></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Sound">{soundEnabled?<Volume2 className="w-5 h-5" />:<VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Fullscreen">{isFullscreen?<Minimize2 className="w-5 h-5" />:<Maximize2 className="w-5 h-5" />}</button></div></div>)}
        <section className="sr-only"><h2>Entropic Grid - Visual Search with Stamina System</h2><p>Find 2-character targets in a 100-cell grid. Entropy randomly corrupts 3 cells every 800ms. Stamina system: +5 for correct hits, -15 for wrong clicks, -0.5/s natural decay. Target changes every 15 seconds with memory flush. Stamina reaches 0 = Game Over. 60-second challenge with streak bonuses and accuracy tracking.</p></section>
        {!isFullscreen && (<div className="grid grid-cols-7 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} /><StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} /><StatCard icon={<Timer className={timeLeft<20?'text-red-600':'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} /><StatCard icon={<BarChart3 className={stamina<30?'text-red-500':'text-blue-500'} />} value={Math.round(stamina)} label="Stamina" unit="%" isDark={isDarkMode} /><StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} /><StatCard icon={<Award className="text-green-500" />} value={totalHits} label="Hits" isDark={isDarkMode} /><StatCard icon={<Activity className="text-purple-500" />} value={getAccuracy()} label="Acc" unit="%" isDark={isDarkMode} /></div>)}
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':feedbackType==='warning'?'bg-yellow-500':'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback||'\u00A0'}</div></div>
        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?"#050505":"#ffffff",aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb',overflow:'hidden'}}>
          {isFullscreen && gameState==='playing' && (<div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button><button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Dark mode">{isDarkMode?<Sun className="w-5 h-5" />:<Moon className="w-5 h-5" />}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Theme"><Eye className="w-5 h-5" /></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Sound">{soundEnabled?<Volume2 className="w-5 h-5" />:<VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div>)}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4"><div className="text-center mb-4"><p className={`text-xs font-bold tracking-wider ${isBoxDarkMode?'text-gray-500':'text-gray-400'}`}>FIND TARGET</p><p className={`text-4xl font-bold ${isBoxDarkMode?'text-blue-400':'text-blue-600'}`} style={{letterSpacing:'5px'}}>{gameState==='playing'?target:'--'}</p></div><div ref={gridRef} className="grid gap-1" style={{display:'grid',gridTemplateColumns:`repeat(${COLS},1fr)`,maxWidth:isFullscreen?'600px':'500px',width:'100%'}} /></div>
          {gameState==='start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="mb-4"><Search className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Entropic Grid</h2><p className={`mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>60-second challenge • Stamina system</p><p className={`mb-6 text-sm ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Find the 2-char target. Entropy corrupts cells. Wrong clicks drain stamina.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Start entropic grid">Start Free Drill</button></div></div>)}
          {gameState==='gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Session Complete!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Keep practicing to improve your visual search stamina and accuracy.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} /><ResultCard label="Hits" value={totalHits} icon={<Award className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Misses" value={totalMisses} icon={<Target className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode?'bg-gray-700 text-gray-300 hover:bg-gray-600':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>
        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-blue-400':'text-blue-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>How Entropic Grid Works</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-blue-500">Find the 2-character target</span> displayed at top</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-green-500">+1 point, +5 stamina</span> per correct find</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-red-500">Wrong click: -15 stamina</span> • Resets streak</p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-orange-500">Entropy corrupts 3 cells every 800ms</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-purple-500">Target changes every 15s</span> • Memory flush</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-yellow-500">Stamina = 0 = Game Over</span> • Natural decay -0.5/s</p></div></div></div><div className={`mt-4 pt-3 border-t text-xs text-center ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}>🔵 Blue glow = hit • 🔴 Red flash = miss • Entropy scrambles grid</div></div></div></footer>)}

        {!isFullscreen && (
          <section className="mt-8" aria-label="About this entropic grid visual search drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode?'text-blue-400':'text-blue-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>About This Free Entropic Grid Drill</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode?'text-gray-300':'text-gray-600'}`}>This free Entropic Grid drill trains visual search and cognitive stamina through a unique entropy-based gameplay system. A 100-cell grid displays 2-character alphanumeric codes with one target code shown at the top. Every 800ms entropy corrupts 3 random cells replacing them with new codes, creating constant visual noise that requires sustained attention. The stamina system adds strategic depth: correct hits restore 5 stamina while wrong clicks drain 15 stamina, and natural decay removes 0.5 stamina per second. When stamina reaches zero, the game ends immediately regardless of time remaining. Targets change every 15 seconds with a memory flush requiring re-orientation. Perfect for developing sustained visual attention, processing speed under cognitive load, and strategic decision-making about when to click versus when to keep searching.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-blue-50 border-blue-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Anyone wanting to improve sustained visual attention, processing speed under distraction, cognitive stamina, and visual search efficiency in cluttered environments.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Visual search speed, sustained attention, cognitive stamina, processing under distraction, strategic decision-making, and pattern recognition in noisy visual environments.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Score, stamina percentage with color warning, hits, misses, accuracy, streak count, and best performance records saved locally.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Why Practice with Entropy?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Trains visual search in realistic noisy environments similar to real-world scanning</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Stamina system builds cognitive endurance for prolonged attention tasks</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Strategic depth from stamina management adds decision-making challenge</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Focus on accuracy first to maintain stamina before building speed</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Scan systematically row by row rather than jumping randomly</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Note the new target immediately when it changes every 15 seconds</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 10-15 minutes daily for best visual search improvement</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="Related visual and cognitive drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600"></div><h2 className={`text-xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Explore Related Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/visual/visual-recognition/difference-spotter" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-blue-500':'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Eye className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-blue-400':'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Difference Spotter</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Study objects then spot which one changed position or color after a blink.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/visual/tracking-accuracy/moving-target" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-green-500':'bg-white border-gray-200 hover:border-green-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><Target className="w-4 h-4 text-green-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-green-400':'text-gray-900 group-hover:text-green-600'} transition-colors`}>Kinetic Intercept</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Click fast-moving targets spawning from edges with green cursor feedback.</p><div className="flex items-center gap-1 mt-3 text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/working-memory/n-back" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-purple-500':'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Brain className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-purple-400':'text-gray-900 group-hover:text-purple-600'} transition-colors`}>3-Back Training</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Classic N-Back working memory task at 3-back with 60 letters per round.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/short-term-memory/color-sequence" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-orange-500':'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Star className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-orange-400':'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Color Sequence</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Watch color sequences then tap colors in order with progressive difficulty.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/spatial-memory/path-tracing" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-cyan-500':'bg-white border-gray-200 hover:border-cyan-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Star className="w-4 h-4 text-cyan-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-cyan-400':'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>Path Tracing</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Watch animated dot paths then retrace them in exact order on expanding grids.</p><div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/associative-memory/concept-linking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-red-500':'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Brain className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-red-400':'text-gray-900 group-hover:text-red-600'} transition-colors`}>Concept Linking</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Memorize and recall concept chains step by step with adaptive length.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/flick-shot-training" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-teal-500':'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Target className="w-4 h-4 text-teal-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>FPS</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-teal-400':'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Flick Shot Trainer</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Improve aim with raw mouse input flick training and adaptive target windows.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/memory/card-matching" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-indigo-500':'bg-white border-gray-200 hover:border-indigo-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center"><Activity className="w-4 h-4 text-indigo-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Cognitive</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-indigo-400':'text-gray-900 group-hover:text-indigo-600'} transition-colors`}>Card Matching</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Classic memory card game to improve visual memory and concentration.</p><div className="flex items-center gap-1 mt-3 text-indigo-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div><h3 className="text-white font-semibold mb-3 text-sm">Visual Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-white transition-colors">Entropic Grid</Link></li><li><Link href="/drills/visual/visual-recognition/difference-spotter" className="hover:text-white transition-colors">Difference Spotter</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Kinetic Intercept</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Memory</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory/working-memory/n-back" className="hover:text-white transition-colors">3-Back Training</Link></li><li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-white transition-colors">Color Sequence</Link></li><li><Link href="/drills/memory/spatial-memory/path-tracing" className="hover:text-white transition-colors">Path Tracing</Link></li><li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 15 Memory Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic" className="hover:text-white transition-colors">Academic (12 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online entropic grid drill for visual search training. 100-cell grid with entropy corruption and stamina management system. Find 2-character targets while grid scrambles every 800ms. No registration required. More free drills at skilldrills.online.</p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share" aria-label="Share"><Share2 className="w-5 h-5" /></button>
                  <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy" aria-label="Copy"><Copy className="w-5 h-5" /></button>
                  <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Twitter" aria-label="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Instagram" aria-label="Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="YouTube" aria-label="YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Pinterest" aria-label="Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
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
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${isDark?'text-white':'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark?'text-gray-400':'text-gray-500'}`}>{label}</p>
    </div>
  ); 
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) { 
  const colorMap = { 
    blue: {bg:'bg-blue-500/10', border:'border-blue-500/30', text:'text-blue-500', icon:'text-blue-500'}, 
    yellow: {bg:'bg-yellow-500/10', border:'border-yellow-500/30', text:'text-yellow-500', icon:'text-yellow-500'}, 
    orange: {bg:'bg-orange-500/10', border:'border-orange-500/30', text:'text-orange-500', icon:'text-orange-500'}, 
    purple: {bg:'bg-purple-500/10', border:'border-purple-500/30', text:'text-purple-500', icon:'text-purple-500'}, 
    green: {bg:'bg-green-500/10', border:'border-green-500/30', text:'text-green-500', icon:'text-green-500'}, 
    emerald: {bg:'bg-emerald-500/10', border:'border-emerald-500/30', text:'text-emerald-500', icon:'text-emerald-500'}, 
    red: {bg:'bg-red-500/10', border:'border-red-500/30', text:'text-red-500', icon:'text-red-500'} 
  }; 
  const c = colorMap[color] || colorMap.blue; 
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={c.icon} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm truncate ${isDark?'text-gray-300':'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>{value}{unit}</span>
    </div>
  ); 
}