'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Brain, Target, Trophy, X, Info, Check, Heart, RefreshCw,
  GraduationCap, Lightbulb, TrendingUp, BarChart3, CheckCircle2, Star, ArrowRight, Share2, Copy
} from 'lucide-react';

export default function WideFieldClient() {
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

  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const [currentChar, setCurrentChar] = useState('A');
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashPosition, setFlashPosition] = useState({ top: '20%', left: '20%' });
  const [isRecallMode, setIsRecallMode] = useState(false);
  const [recallInput, setRecallInput] = useState('');
  const [recallResults, setRecallResults] = useState([]);
  const [totalFlashes, setTotalFlashes] = useState(0);
  const [recallCount, setRecallCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const flashTimeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const flashHistoryRef = useRef([]);
  const isRecallActiveRef = useRef(false);
  const flashesSinceLastRecallRef = useRef(0);
  const bestStreakRef = useRef(0);
  
  const positions = useRef([
    { top: '12%', left: '12%' },
    { top: '12%', left: '88%' },
    { top: '88%', left: '12%' },
    { top: '88%', left: '88%' }
  ]).current;
  
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('wideFieldBestScore');
      if (savedBestScore) { const p = parseInt(savedBestScore, 10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('wideFieldBestScore') || '0', 10);
      if (finalScore > currentBestScore) { localStorage.setItem('wideFieldBestScore', finalScore.toString()); setBestScore(finalScore); }
    } catch (e) {}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) { const element = containerRef.current; if (element?.requestFullscreen) { await element.requestFullscreen(); setIsFullscreen(true); } }
      else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); }
    } catch (error) { console.error('Fullscreen error:', error); }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => { setIsFullscreen(!!document.fullscreenElement); };
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
      const audioCtx = initAudio(); if (!audioCtx) return;
      const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      const freqMap = { correct: 880, miss: 440, streak: 1046.5, recall: 660 };
      osc.frequency.setValueAtTime(freqMap[type] || 440, now);
      gain.gain.setValueAtTime(type === 'miss' ? 0.08 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now); osc.stop(now + 0.12);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; isRecallActiveRef.current = false; if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current); if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current); if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } updateBestScore(scoreRef.current); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, timeLeft, updateBestScore]);

  const continueFlashing = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
    if (isRecallActiveRef.current) return;
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    cycleTimeoutRef.current = setTimeout(() => { flashCharacter(); }, 400);
  }, []);

  const closeRecallAndContinue = useCallback(() => {
    isRecallActiveRef.current = false; setIsRecallMode(false); setRecallResults([]);
    flashesSinceLastRecallRef.current = 0;
    if (isActiveRef.current && gameStateRef.current === 'playing') continueFlashing();
  }, [continueFlashing]);

  const startRecallMode = useCallback(() => {
    if (!isActiveRef.current) return;
    if (isRecallActiveRef.current) return;
    const historyLength = flashHistoryRef.current.length;
    let askCount = 1;
    if (historyLength >= 3) askCount = Math.floor(Math.random() * 3) + 1;
    else if (historyLength === 2) askCount = Math.floor(Math.random() * 2) + 1;
    else askCount = 1;
    setRecallCount(askCount); isRecallActiveRef.current = true; setIsRecallMode(true); setRecallInput(''); setRecallResults([]); playSound('recall');
    setTimeout(() => { const input = document.getElementById('recall-input'); if (input) input.focus(); }, 100);
  }, [playSound]);

  const checkRecallAnswer = useCallback(() => {
    const historyLength = flashHistoryRef.current.length;
    const askCount = Math.min(recallCount, historyLength);
    const lastFlashes = flashHistoryRef.current.slice(-askCount);
    const userChars = recallInput.toUpperCase().split('').slice(0, askCount);
    const results = lastFlashes.map((flash, idx) => ({ correct: flash.char, user: userChars[idx] || '', isCorrect: userChars[idx] === flash.char }));
    setRecallResults(results);
    const correctCount = results.filter(r => r.isCorrect).length;
    const allCorrect = correctCount === askCount;
    if (allCorrect) {
      const pointsEarned = askCount * 10; scoreRef.current += pointsEarned; setScore(scoreRef.current);
      const newStreak = streakRef.current + 1; streakRef.current = newStreak; setStreak(newStreak);
      if (newStreak > bestStreakRef.current) { bestStreakRef.current = newStreak; setBestStreak(bestStreakRef.current); }
      if (newStreak % 5 === 0 && newStreak > 0) { playSound('streak'); showFeedback(`🔥 ${newStreak} Streak! +${pointsEarned}`, 'success'); }
      else { playSound('correct'); showFeedback(`✓ Perfect! +${pointsEarned}`, 'success'); }
    } else if (correctCount > 0) {
      const pointsEarned = correctCount * 5; scoreRef.current += pointsEarned; setScore(scoreRef.current);
      streakRef.current = 0; setStreak(0); playSound('miss'); showFeedback(`✗ ${correctCount}/${askCount} correct! +${pointsEarned}`, 'warning');
    } else { streakRef.current = 0; setStreak(0); playSound('miss'); showFeedback('✗ Incorrect! Streak reset', 'error'); }
    setTimeout(() => { closeRecallAndContinue(); }, 1500);
  }, [recallCount, recallInput, playSound, showFeedback, closeRecallAndContinue]);

  const handleRecallKeyPress = useCallback((e) => { if (e.key === 'Enter') checkRecallAnswer(); }, [checkRecallAnswer]);

  const flashCharacter = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
    if (isRecallActiveRef.current) return;
    const pos = positions[Math.floor(Math.random() * positions.length)];
    const char = characters[Math.floor(Math.random() * characters.length)];
    setFlashPosition(pos); setCurrentChar(char); setIsFlashing(true);
    const flashData = { char, timestamp: Date.now() };
    flashHistoryRef.current.push(flashData);
    if (flashHistoryRef.current.length > 10) flashHistoryRef.current.shift();
    setTotalFlashes(prev => prev + 1); flashesSinceLastRecallRef.current++;
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => {
      setIsFlashing(false);
      const hasEnoughFlashes = flashesSinceLastRecallRef.current >= 3;
      const shouldRecall = !isRecallActiveRef.current && flashHistoryRef.current.length >= 1 && hasEnoughFlashes && Math.random() < 0.12;
      if (shouldRecall && !isRecallActiveRef.current) startRecallMode();
      else if (!isRecallActiveRef.current) continueFlashing();
    }, 400);
  }, [positions, characters, startRecallMode, continueFlashing]);

  const startGame = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(60); setFeedback('');
    setIsFlashing(false); setIsRecallMode(false); setRecallInput(''); setRecallResults([]); setTotalFlashes(0);
    streakRef.current = 0; scoreRef.current = 0; bestStreakRef.current = 0; flashHistoryRef.current = [];
    isActiveRef.current = true; isRecallActiveRef.current = false; flashesSinceLastRecallRef.current = 0;
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    setTimeout(() => { if (isActiveRef.current && gameStateRef.current === 'playing') flashCharacter(); }, 300);
  }, [flashCharacter]);

  const resetGame = useCallback(() => {
    isActiveRef.current = false; isRecallActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(60); setFeedback('');
    setIsFlashing(false); setIsRecallMode(false); setRecallInput(''); setRecallResults([]); setTotalFlashes(0);
    streakRef.current = 0; scoreRef.current = 0; bestStreakRef.current = 0; flashHistoryRef.current = []; flashesSinceLastRecallRef.current = 0;
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  }, []);

  const sharePage = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Free Wide Field Awareness Drill | SkillDrills', text: 'Train peripheral vision by recalling characters at screen corners. Free!', url: 'https://skilldrills.online/drills/visual/peripheral-vision/wide-field' }); } catch (e) {}
    } else { navigator.clipboard.writeText('https://skilldrills.online/drills/visual/peripheral-vision/wide-field'); alert('Link copied!'); }
  };

  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/visual/peripheral-vision/wide-field'); alert('Link copied!'); };

  useEffect(() => { return () => { if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current); if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); }; }, []);

  const placeholderText = "_".repeat(recallCount);

  if (loading || !isClient) { return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading wide field awareness drill...</p></div></div>); }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Wide Field Awareness - Peripheral Vision & Character Recall Training",
        "url": "https://skilldrills.online/drills/visual/peripheral-vision/wide-field",
        "description": "Free peripheral vision training with characters flashing in 4 corners while fixating on center. Random recall quizzes test 1-3 characters in order. Perfect recall 10pts per char partial 5pts. 60-second timed challenge.",
        "applicationCategory": "EducationalApplication", "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
        "publisher": { "@type": "Organization", "name": "SkillDrills" },
        "educationalUse": ["Peripheral Vision Training", "Visual Memory Development", "Character Recognition Practice", "Wide Field Awareness", "Focus Training"],
        "learningResourceType": ["Interactive Exercise", "Visual Drill", "Perception Training"],
        "timeRequired": "PT60S", "interactivityType": "active", "inLanguage": "en-US",
        "teaches": ["Wide Field Awareness", "Peripheral Character Detection", "Visual Memory", "Focus Training", "Recall Accuracy"],
        "educationalLevel": "All Levels", "typicalAgeRange": "10-80",
        "datePublished": "2026-05-14", "dateModified": new Date().toISOString().split('T')[0],
        "version": "1.0", "isAccessibleForFree": true,
        "accessMode": ["visual"], "accessModeSufficient": ["visual"]
      })}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (<nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/visual" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Peripheral Vision</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">Wide Field Awareness</li></ol></nav>)}
        
        {!isFullscreen && (<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0"><Eye className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Wide Field Awareness</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Free peripheral vision drill • Focus on center • 4 corner positions • 60s</p></div></div><div className="flex gap-2 flex-shrink-0">{gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset session" aria-label="Reset drill session"><RefreshCw className="w-5 h-5" /></button>}<button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={isDarkMode ? 'Light mode' : 'Dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle drill area theme" title="Toggle drill area theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} title={soundEnabled ? 'Mute' : 'Unmute'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button></div></div>)}

        <section className="sr-only" aria-label="Drill description"><h2>Wide Field Awareness - Peripheral Vision & Character Recall Training</h2><p>Train peripheral vision by recalling characters flashed in 4 corner positions while fixating on a center cross. Characters appear for 400ms. Random recall quizzes test 1-3 characters in order. Perfect recall scores 10 points per character. 60-second timed challenge.</p></section>

        {!isFullscreen && (<div className="grid grid-cols-5 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} /><StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} /><StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} /><StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} /><StatCard icon={<Eye className="text-cyan-500" />} value={totalFlashes} label="Flashes" isDark={isDarkMode} /></div>)}

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
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

          {isFullscreen && gameState === 'playing' && (<><div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session" aria-label="Reset drill session"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div><div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">Score: <span className="text-yellow-400 font-bold">{score}</span> | Flashes: <span className="text-cyan-400 font-bold">{totalFlashes}</span></div></>)}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '40px', color: isBoxDarkMode ? '#ffffff' : '#000000', fontFamily: 'monospace', userSelect: 'none', pointerEvents: 'none', zIndex: 10, opacity: 0.7 }} aria-hidden="true">+</div>
          {!isRecallMode && isFlashing && (<div style={{ position: 'absolute', fontFamily: 'monospace', fontSize: '60px', fontWeight: 'bold', color: isBoxDarkMode ? '#00ff88' : '#00cc66', userSelect: 'none', pointerEvents: 'none', zIndex: 20, textShadow: isBoxDarkMode ? '0 0 30px rgba(0,255,136,0.6)' : 'none', top: flashPosition.top, left: flashPosition.left, transform: flashPosition.left === '88%' ? 'translateX(-100%)' : 'none' }} aria-hidden="true">{currentChar}</div>)}
          {isRecallMode && recallResults.length === 0 && (<div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40"><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-3"><Brain className="w-12 h-12 text-purple-500 mx-auto" aria-hidden="true" /></div><h3 className={`text-xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Recall Last {recallCount} Character{recallCount > 1 ? 's' : ''}</h3><p className={`mb-4 text-sm ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Enter the last {recallCount} character{recallCount > 1 ? 's' : ''} in order as they appeared</p><input id="recall-input" type="text" value={recallInput} onChange={(e) => setRecallInput(e.target.value.toUpperCase())} onKeyPress={handleRecallKeyPress} maxLength={recallCount} className={`w-full px-4 py-3 text-center text-2xl font-mono tracking-widest rounded-xl border outline-none transition ${isBoxDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' : 'bg-gray-100 border-gray-300 text-gray-900 focus:border-purple-500'}`} placeholder={placeholderText} autoFocus aria-label={`Enter the last ${recallCount} characters`} /><button onClick={checkRecallAnswer} className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" aria-label="Submit recall answer">Submit</button></div></div>)}
          {isRecallMode && recallResults.length > 0 && (<div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40"><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><h3 className={`text-xl font-bold mb-4 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Results</h3><div className="flex justify-center gap-6 mb-4">{recallResults.map((result, idx) => (<div key={idx} className="text-center"><div className={`text-3xl font-mono font-bold ${result.isCorrect ? 'text-green-500' : 'text-red-500'}`}>{result.correct}</div><div className={`text-lg font-mono ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{result.user || '—'}</div></div>))}</div><p className={`text-sm mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{recallResults.filter(r => r.isCorrect).length}/{recallResults.length} correct</p><button onClick={closeRecallAndContinue} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" aria-label="Continue training">Continue</button></div></div>)}
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Eye className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Wide Field Awareness</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Focus on center +</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Characters flash in 4 corners. Random recall quizzes test 1-3 characters. Use peripheral vision only.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" aria-label="Start wide field awareness training">Start Free Drill</button></div></div>)}
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time&apos;s Up!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to expand your wide field awareness and visual memory.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Total Flashes" value={totalFlashes} icon={<Eye className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>

        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How Wide Field Awareness Works</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">Fixate on the center + symbol</span> at all times</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Characters flash in 4 corners</span> for 400ms each</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">Random recall quizzes (1-3 chars)</span> after every 3+ flashes</p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">Perfect recall: 10 points per char</span> and streak bonus</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">Partial recall: 5 points per char</span>, streak resets</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">5-Streak bonus notification</span> • Best Score saves locally</p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>👁️ 4 corner positions • Use peripheral vision only</span><span>⚡ 400ms flash duration • Enter key to submit recall</span></div></div></div></footer>)}

        {!isFullscreen && (<section className="mt-8" aria-label="About this wide field awareness drill"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Wide Field Awareness Drill</h2></div></div><div className="p-5"><p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This free wide field awareness drill trains peripheral vision and visual memory by flashing characters in 4 corner positions while you maintain center fixation. Characters appear for 400ms at random corners with random recall quizzes testing 1-3 characters in order. Perfect recall earns 10 points per character while partial recall earns 5 points. Perfect for athletes expanding court vision drivers improving peripheral hazard detection and anyone wanting better wide-field visual awareness and character recognition in their peripheral field.</p><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5"><div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Athletes expanding court vision, drivers improving peripheral hazard detection, and anyone wanting better wide-field visual awareness and character recognition.</p></div><div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Peripheral vision, visual memory, character recognition without direct focus, wide field awareness, and recall accuracy under time pressure.</p></div><div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, streak, total flashes, best streak, and best performance records saved locally.</p></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Wide Field Awareness?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Essential for sports driving and any activity requiring wide-field awareness</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Random recall quizzes provide active testing of peripheral memory</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Center fixation requirement ensures true peripheral vision training</li></ul></div><div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Keep eyes locked on center + symbol throughout</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Use peripheral vision only to detect characters</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Type characters in exact order for perfect recall bonus</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 10-15 minutes daily for best peripheral vision improvement</li></ol></div></div></div></div></section>)}

        {!isFullscreen && (<section className="mt-8" aria-label="Related visual and cognitive drills"><div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Visual & Cognitive Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/drills/visual/peripheral-vision/peripheral-flash" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Star className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Peripheral Flash</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>5-6 shape sequences at 300ms in peripheral field with center fixation.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
          <Link href="/drills/visual/depth-perception/distance-judgment" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><Star className="w-4 h-4 text-green-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} transition-colors`}>Distance Judgment</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Intercept moving spheres at target depth with color and blur feedback.</p><div className="flex items-center gap-1 mt-3 text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
          <Link href="/drills/memory/spatial-memory/grid-memorization" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Star className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Grid Memorization</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize lit cell positions on progressive grids with instant fail on wrong clicks.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
          <Link href="/drills/motor/hand-eye-coordination/aim-trainer" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Target className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Aim Trainer Elite</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Dynamic shrinking targets with streak tracking and 3-life protection system.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
          <Link href="/drills/memory/short-term-memory/color-sequence" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Star className="w-4 h-4 text-cyan-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>Color Sequence</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Watch color sequences then tap colors in order with progressive difficulty.</p><div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
          <Link href="/drills/memory/long-term-memory/paired-associates" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Heart className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Paired Associates</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize word pairs then select the correct match from 3 options with adaptive rounds.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
          <Link href="/drills/cognitive/memory/card-matching" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Activity className="w-4 h-4 text-teal-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Cognitive</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Card Matching</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Classic memory card game to improve visual memory and concentration skills.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
        </div></section>)}

        {!isFullscreen && (<footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">Visual Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/peripheral-vision/wide-field" className="hover:text-white transition-colors">Wide Field Awareness</Link></li><li><Link href="/drills/visual/peripheral-vision/peripheral-flash" className="hover:text-white transition-colors">Peripheral Flash</Link></li><li><Link href="/drills/visual/depth-perception/distance-judgment" className="hover:text-white transition-colors">Distance Judgment</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Memory Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory/spatial-memory/grid-memorization" className="hover:text-white transition-colors">Grid Memorization</Link></li><li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-white transition-colors">Color Sequence</Link></li><li><Link href="/drills/memory/long-term-memory/paired-associates" className="hover:text-white transition-colors">Paired Associates</Link></li><li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 15 Memory Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Motor & FPS</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Aim Trainer Elite</Link></li><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/motor" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Motor Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic" className="hover:text-white transition-colors">Academic (12 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Eye className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online wide field awareness drill for peripheral vision training. Characters flash in 4 corners while fixating on center. Random recall quizzes test 1-3 characters. Perfect for athletes drivers and anyone wanting better peripheral awareness. No registration required. More free drills at skilldrills.online.</p><div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free wide field awareness drill"><Share2 className="w-5 h-5" /></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard"><Copy className="w-5 h-5" /></button><a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a><a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a><a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>); }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' }, cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' }, emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' } }; const colors = colorMap[color] || colorMap.blue; return (<div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}><div className="flex items-center gap-2 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span></div>); }