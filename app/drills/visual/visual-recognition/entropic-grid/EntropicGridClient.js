'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Award, Activity, BarChart3, Search, RefreshCw
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
const GAME_DURATION = 60; // Changed from 90 to 60

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

  // Mark as client-side
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('entropicGridBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score when game ends
  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('entropicGridBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('entropicGridBestScore', finalScore.toString());
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
    } catch (e) { /* Audio not supported */ }
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

  // Timer
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
    showFeedback('60 seconds • Find the target!', 'success'); // Updated message
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
        "name": "Entropic Grid", 
        "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid", 
        "description": "Visual search with entropy and stamina system. Find 2-character targets in a 100-cell grid while entropy corrupts cells. 60s challenge with stamina-based gameplay.", 
        "applicationCategory": "EducationalApplication", 
        "operatingSystem": "Web", 
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, 
        "author": { "@type": "Organization", "name": "Global Drill System" }, 
        "educationalUse": ["Visual Search", "Sustained Attention", "Cognitive Stamina", "Processing Speed"], 
        "learningResourceType": "Interactive Exercise", 
        "timeRequired": "PT60S", 
        "interactivityType": "active", 
        "inLanguage": "en-US", 
        "teaches": ["Visual Search", "Sustained Attention", "Cognitive Control", "Pattern Recognition"] 
      }) }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li>
            <li><Link href="/drills/visual" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li>
            <li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`}>Visual Recognition</li>
            <li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode?'text-blue-400':'text-blue-600'}`} aria-current="page">Entropic Grid</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex-shrink-0">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Entropic Grid</h1>
              <p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Find target • Stamina system • 60s challenge</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2 flex-shrink-0">
            {gameState==='playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700':'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset" 
                aria-label="Reset"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={()=>setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} 
              aria-label={isDarkMode?'Light mode':'Dark mode'}
            >
              {isDarkMode?<Sun className="w-5 h-5" />:<Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} 
              aria-label="Theme"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={()=>setSoundEnabled(!soundEnabled)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} 
              aria-label="Sound"
            >
              {soundEnabled?<Volume2 className="w-5 h-5" />:<VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={toggleFullscreen} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} 
              aria-label="Fullscreen"
            >
              {isFullscreen?<Minimize2 className="w-5 h-5" />:<Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* SEO Section */}
        <section className="sr-only">
          <h2>Entropic Grid - Visual Search with Stamina System</h2>
          <p>Find 2-character targets in a 100-cell grid. Entropy randomly corrupts 3 cells every 800ms. Stamina system: +5 for correct hits, -15 for wrong clicks, -0.5/s natural decay. Target changes every 15 seconds with memory flush. Stamina reaches 0 = Game Over. 60-second challenge with streak bonuses and accuracy tracking.</p>
        </section>

        {/* Stats Row */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft<20?'text-red-600':'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className={stamina<30?'text-red-500':'text-blue-500'} />} value={Math.round(stamina)} label="Stamina" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-green-500" />} value={totalHits} label="Hits" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-purple-500" />} value={getAccuracy()} label="Acc" unit="%" isDark={isDarkMode} />
        </div>

        {/* Feedback */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':feedbackType==='warning'?'bg-yellow-500':'bg-red-500'}`} 
            role="status" 
            aria-live="polite" 
            aria-atomic="true"
          >
            {feedback||'\u00A0'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef} 
          className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} 
          style={{
            background:isBoxDarkMode?"#050505":"#ffffff",
            aspectRatio:isFullscreen?'auto':'16/9',
            maxWidth:'100%',
            margin:'0 auto',
            borderColor:isDarkMode?'#374151':'#e5e7eb',
            overflow:'hidden'
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState==='playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset" aria-label="Reset">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Dark mode">
                {isDarkMode?<Sun className="w-5 h-5" />:<Moon className="w-5 h-5" />}
              </button>
              <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Theme">
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={()=>setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Sound">
                {soundEnabled?<Volume2 className="w-5 h-5" />:<VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Game Area */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-4">
              <p className={`text-xs font-bold tracking-wider ${isBoxDarkMode?'text-gray-500':'text-gray-400'}`}>
                FIND TARGET
              </p>
              <p 
                className={`text-4xl font-bold ${isBoxDarkMode?'text-blue-400':'text-blue-600'}`} 
                style={{letterSpacing:'5px'}}
              >
                {gameState==='playing'?target:'--'}
              </p>
            </div>
            
            {/* Grid */}
            <div 
              ref={gridRef} 
              className="grid gap-1" 
              style={{
                display:'grid',
                gridTemplateColumns:`repeat(${COLS},1fr)`,
                maxWidth:isFullscreen?'600px':'500px',
                width:'100%'
              }} 
            />
          </div>

          {/* Start Screen */}
          {gameState==='start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Search className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Entropic Grid</h2>
                <p className={`mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>60-second challenge • Stamina system</p>
                <p className={`mb-6 text-sm ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Find the 2-char target. Entropy corrupts cells. Wrong clicks drain stamina.</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
                  aria-label="Start entropic grid"
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState==='gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Session Complete!</h2>
                </div>
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Keep practicing to improve your visual search stamina and accuracy.</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Hits" value={totalHits} icon={<Award className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Misses" value={totalMisses} icon={<Target className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/visual" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode?'bg-gray-700 text-gray-300 hover:bg-gray-600':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Footer */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode?'text-blue-400':'text-blue-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>How Entropic Grid Works</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-blue-500">Find the 2-character target</span> displayed at top</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-green-500">+1 point, +5 stamina</span> per correct find</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-red-500">Wrong click: -15 stamina</span> • Resets streak</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-orange-500">Entropy corrupts 3 cells every 800ms</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-purple-500">Target changes every 15s</span> • Memory flush</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-yellow-500">Stamina = 0 = Game Over</span> • Natural decay -0.5/s</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t text-xs text-center ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}>
                  🔵 Blue glow = hit • 🔴 Red flash = miss • Entropy scrambles grid
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