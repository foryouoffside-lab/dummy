'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Move, Brain, BarChart3, Timer, Trophy, Info, Heart, RefreshCw
} from 'lucide-react';

export default function DragAndDropClient() {
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
  const [margin, setMargin] = useState(10);
  const [timer, setTimer] = useState(3.0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [accuracy, setAccuracy] = useState(100);
  const [successfulDrops, setSuccessfulDrops] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const ballRef = useRef({ x: 0, y: 0, r: 15, dragging: false });
  const bucketRef = useRef({ x: 0, y: 0, r: 25 });
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const timerRef = useRef(3.0);
  const maxTimeRef = useRef(3.0);
  const activeRef = useRef(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const totalAttemptsRef = useRef(0);
  const successfulDropsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const teleportIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const livesRef = useRef(3);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  // Load best score from localStorage
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('extremeConvergenceBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element?.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) { console.error('Fullscreen error:', error); }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Calculate accuracy
  useEffect(() => {
    if (totalAttemptsRef.current > 0) {
      setAccuracy(Math.round((successfulDropsRef.current / totalAttemptsRef.current) * 100));
    } else {
      setAccuracy(100);
    }
  }, [score]);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('extremeConvergenceBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('extremeConvergenceBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
      return audioCtxRef.current;
    } catch (e) { return null; }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      const freqMap = { drag: 660, drop: 880, miss: 440, streak: 1046.5, penalty: 330, teleport: 523.25 };
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'streak' || type === 'penalty' ? 0.12 : 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now); osc.stop(now + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const applyPenalty = useCallback((reason) => {
    if (!isActiveRef.current) return;
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      showFeedback(`${reason}! -1 life (${livesRef.current} lives left)`, 'error');
      playSound('miss');
      if (livesRef.current === 0) {
        showFeedback('⚠️ No lives left! Now penalties deduct points!', 'warning');
      }
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(`${reason}! -1 point penalty (No lives left)`, 'error');
    }
    streakRef.current = 0;
    setStreak(0);
    activeRef.current = false;
    ballRef.current.dragging = false;
  }, [showFeedback, playSound]);

  const resetPositions = useCallback((cvs, attemptCount = 0) => {
    if (!cvs || !isActiveRef.current) return;
    if (attemptCount > 20) {
      ballRef.current.x = cvs.width * 0.25;
      ballRef.current.y = cvs.height * 0.5;
      bucketRef.current.x = cvs.width * 0.75;
      bucketRef.current.y = cvs.height * 0.5;
    } else {
      const padding = 120;
      ballRef.current.x = padding + Math.random() * (cvs.width - padding * 2);
      ballRef.current.y = padding + Math.random() * (cvs.height - padding * 2);
      bucketRef.current.x = padding + Math.random() * (cvs.width - padding * 2);
      bucketRef.current.y = padding + Math.random() * (cvs.height - padding * 2);
    }
    ballRef.current.dragging = false;
    const currentStreak = streakRef.current;
    const marginValue = Math.max(1, Math.min(10, 10 - (currentStreak * 0.4)));
    bucketRef.current.r = ballRef.current.r + marginValue;
    setMargin(parseFloat(marginValue.toFixed(1)));
    const distance = Math.hypot(ballRef.current.x - bucketRef.current.x, ballRef.current.y - bucketRef.current.y);
    if (attemptCount <= 20 && distance < 250) {
      resetPositions(cvs, attemptCount + 1);
      return;
    }
    timerRef.current = maxTimeRef.current;
    setTimer(timerRef.current);
    activeRef.current = true;
  }, []);

  const teleportPositions = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    if (ballRef.current.dragging) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const padding = 120;
    ballRef.current.x = padding + Math.random() * (cvs.width - padding * 2);
    ballRef.current.y = padding + Math.random() * (cvs.height - padding * 2);
    bucketRef.current.x = padding + Math.random() * (cvs.width - padding * 2);
    bucketRef.current.y = padding + Math.random() * (cvs.height - padding * 2);
    const distance = Math.hypot(ballRef.current.x - bucketRef.current.x, ballRef.current.y - bucketRef.current.y);
    if (distance < 200) { teleportPositions(); return; }
    playSound('teleport');
    showFeedback('🌀 Teleported!', 'warning');
  }, [playSound, showFeedback]);

  // Timer & teleport intervals
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver'); gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          if (teleportIntervalRef.current) clearInterval(teleportIntervalRef.current);
          updateBestScore(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    if (teleportIntervalRef.current) clearInterval(teleportIntervalRef.current);
    teleportIntervalRef.current = setInterval(() => { teleportPositions(); }, 3000);
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (teleportIntervalRef.current) clearInterval(teleportIntervalRef.current);
    };
  }, [gameState, updateBestScore, teleportPositions]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width;
      const scaleY = cvs.height / rect.height;
      const canvasX = (e.clientX - rect.left) * scaleX;
      const canvasY = (e.clientY - rect.top) * scaleY;
      mousePositionRef.current = { x: canvasX, y: canvasY };
      if (ballRef.current.dragging) {
        ballRef.current.x = canvasX;
        ballRef.current.y = canvasY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const swapBucket = useCallback((cvs) => {
    if (!cvs) return;
    const padding = 120;
    bucketRef.current.x = padding + Math.random() * (cvs.width - padding * 2);
    bucketRef.current.y = padding + Math.random() * (cvs.height - padding * 2);
  }, []);

  // Mouse down/up handlers
  useEffect(() => {
    const handleMouseDown = () => {
      if (gameStateRef.current !== 'playing' || !isActiveRef.current || !activeRef.current) return;
      const mouse = mousePositionRef.current;
      const ball = ballRef.current;
      const dist = Math.hypot(mouse.x - ball.x, mouse.y - ball.y);
      if (dist < ball.r + 15) {
        ballRef.current.dragging = true;
        playSound('drag');
        if (canvasRef.current) swapBucket(canvasRef.current);
      }
    };
    
    const handleMouseUp = () => {
      if (gameStateRef.current !== 'playing' || !isActiveRef.current || !ballRef.current.dragging) return;
      const ball = ballRef.current;
      const bucket = bucketRef.current;
      const dist = Math.hypot(ball.x - bucket.x, ball.y - bucket.y);
      const marginValue = bucket.r - ball.r;
      
      if (dist < marginValue) {
        totalAttemptsRef.current++;
        successfulDropsRef.current++;
        setSuccessfulDrops(successfulDropsRef.current);
        const pointsEarned = 1;
        scoreRef.current += pointsEarned;
        setScore(scoreRef.current);
        const newStreak = streakRef.current + 1;
        streakRef.current = newStreak;
        setStreak(newStreak);
        if (newStreak > bestStreakRef.current) {
          bestStreakRef.current = newStreak;
          setBestStreak(newStreak);
        }
        if (newStreak % 5 === 0 && newStreak > 0) {
          playSound('streak');
          showFeedback(`🔥 ${newStreak} Streak! +${pointsEarned}`, 'success');
        } else {
          playSound('drop');
          showFeedback(`✓ +${pointsEarned}`, 'success');
        }
        ballRef.current.dragging = false;
        if (canvasRef.current) resetPositions(canvasRef.current, 0);
      } else {
        applyPenalty('Miss');
        totalAttemptsRef.current++;
        if (canvasRef.current) {
          setTimeout(() => { if (isActiveRef.current) resetPositions(canvasRef.current, 0); }, 800);
        }
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [applyPenalty, playSound, showFeedback, swapBucket, resetPositions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (teleportIntervalRef.current) clearInterval(teleportIntervalRef.current);
    };
  }, []);

  // Canvas rendering
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const updateCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      let width = containerRect.width;
      let height = width * (9 / 16);
      if (height > containerRect.height) { height = containerRect.height; width = height * (16 / 9); }
      cvs.width = width; cvs.height = height;
      cvs.style.position = 'absolute';
      cvs.style.left = `${(containerRect.width - width) / 2}px`;
      cvs.style.top = `${(containerRect.height - height) / 2}px`;
      resetPositions(cvs, 0);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let lastFrameTime = performance.now();

    function update(dt) {
      if (activeRef.current && isActiveRef.current) {
        timerRef.current -= dt;
        setTimer(Math.max(0, timerRef.current));
        if (timerRef.current <= 0) {
          applyPenalty('Timeout');
          totalAttemptsRef.current++;
          if (canvasRef.current) {
            setTimeout(() => { if (isActiveRef.current) resetPositions(canvasRef.current, 0); }, 800);
          }
        }
      }
    }

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      update(dt);
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }
      
      // Bucket/Ring
      const bucket = bucketRef.current;
      ctx.beginPath();
      ctx.arc(bucket.x, bucket.y, bucket.r, 0, Math.PI * 2);
      ctx.strokeStyle = activeRef.current ? "#00ff88" : "#444";
      ctx.lineWidth = 2; ctx.stroke();
      
      // Ball
      const ball = ballRef.current;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      if (ball.dragging) ctx.fillStyle = "#00FFFF";
      else if (activeRef.current) ctx.fillStyle = "#00ff88";
      else ctx.fillStyle = "#444";
      ctx.fill();
      
      // Connection line
      if (ball.dragging) {
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y); ctx.lineTo(bucket.x, bucket.y);
        ctx.strokeStyle = "rgba(0, 255, 136, 0.3)";
        ctx.lineWidth = 1.5; ctx.stroke();
      }

      // Crosshair
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x - 12, m.y); ctx.lineTo(m.x + 12, m.y);
        ctx.moveTo(m.x, m.y - 12); ctx.lineTo(m.x, m.y + 12); ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)'; ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode, applyPenalty, resetPositions]);

  const startGame = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setMargin(10);
    setTimer(3.0); setTimeLeft(60); setLives(3); setFeedback('');
    setAccuracy(100); setSuccessfulDrops(0);
    isActiveRef.current = true; scoreRef.current = 0;
    streakRef.current = 0; bestStreakRef.current = 0;
    livesRef.current = 3; timerRef.current = 3.0;
    activeRef.current = true; totalAttemptsRef.current = 0;
    successfulDropsRef.current = 0; ballRef.current.dragging = false;
    if (canvasRef.current) resetPositions(canvasRef.current, 0);
  }, [resetPositions]);

  const resetGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (teleportIntervalRef.current) clearInterval(teleportIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false; activeRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setStreak(0); setBestStreak(0); setMargin(10);
    setTimer(3.0); setTimeLeft(60); setLives(3); setFeedback('');
    setAccuracy(100); setSuccessfulDrops(0);
    ballRef.current.dragging = false;
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drag and drop drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Extreme Convergence - Drag & Drop Precision Drill",
        "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop",
        "description": "Precision drag and drop training. Drag a ball into a shrinking target ring within 3 seconds. Positions teleport every 3 seconds. Margin shrinks with streak for increasing difficulty. 60-second challenge with 3 lives.",
        "applicationCategory": "GameApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Global Drill System" },
        "educationalUse": ["Hand-Eye Coordination", "Mouse Precision", "Fine Motor Control", "Drag Accuracy"],
        "learningResourceType": "Interactive Exercise", "timeRequired": "PT60S",
        "interactivityType": "active", "inLanguage": "en-US",
        "teaches": ["Mouse Dragging", "Precision Movement", "Spatial Awareness", "Speed Control"]
      })}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li><Link href="/drills/motor" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Hand-Eye Coordination</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-current="page">Extreme Convergence</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex-shrink-0">
              <Move className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Extreme Convergence</h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Drag ball into ring • 3 sec per drop • Teleports every 3s • 60s challenge</p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset session" aria-label="Reset drag and drop drill"><RefreshCw className="w-5 h-5" /></button>}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={isDarkMode ? 'Light mode' : 'Dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle canvas theme" title="Toggle canvas theme"><Eye className="w-5 h-5" /></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} title={soundEnabled ? 'Mute' : 'Unmute'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Extreme Convergence - Drag & Drop Precision Training</h2>
          <p>Master precision mouse control by dragging a ball into a shrinking target ring within 3 seconds. Positions teleport every 3 seconds. Margin shrinks from 10px to 1px as streak increases. Earn +1 point per successful drop. 3-life protection: misses cost 1 life first, then -1pt after lives exhausted. 60-second timed challenge with accuracy and streak tracking.</p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-amber-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-cyan-600" />} value={margin} label="Margin" unit="px" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div>
        </div>

        {/* Game Canvas */}
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} aria-label="Drag and drop canvas. Drag the green ball into the ring target." />
          
          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4"><Move className="w-16 h-16 text-cyan-500 mx-auto" aria-hidden="true" /></div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Extreme Convergence</h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>3 seconds to drop • Teleports every 3s • +1pt per drop • 3 lives</p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Drag the green ball into the ring within 3 seconds. Margin shrinks as your streak grows. Misclicks cost lives first, then -1pt.</p>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2" aria-label="Start drag and drop training">Start Training</button>
              </div>
            </div>
          )}
          
          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h2></div>
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve your drag precision and speed.</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Drops" value={successfulDrops} icon={<Move className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Margin" value={`+${margin}px`} icon={<Target className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  <ResultCard label="Lives Left" value={lives} icon={<Heart className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                </div>
                <div className="flex gap-3">
                  <Link href="/drills/motor" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Motor</button></Link>
                  <button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">Play Again →</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h2></div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click & drag the <span className="font-semibold text-cyan-500">green ball</span> into the ring</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Drop: <span className="font-semibold text-green-500">+1 point</span> (must be within 3 seconds)</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Miss/Timeout: <span className="font-semibold text-red-500">-1 life first, then -1pt</span></p></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">Teleports every 3 seconds!</span> Stay alert</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Margin <span className="font-semibold text-blue-500">shrinks with streak</span> (10px → 1px)</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5x streak <span className="font-semibold text-yellow-500">bonus notification</span></p></div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>⚡ 3 seconds to drop • Teleports every 3 seconds</span><span>❤️ 3 lives • Penalty only when lives = 0 • Best Score saves locally</span></div>
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
  const colorMap = { yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' }, cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' }, blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' } };
  const colors = colorMap[color] || colorMap.yellow;
  return <div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}><div className="flex items-center gap-2 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span></div>;
}