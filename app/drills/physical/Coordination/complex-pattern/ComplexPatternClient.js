'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, GitBranch, Brain, TrendingUp, Trophy, Info, Timer, AlertCircle, RefreshCw
} from 'lucide-react';

export default function ComplexPatternClient() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
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
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [patternsCompleted, setPatternsCompleted] = useState(0);
  const [currentComplexity, setCurrentComplexity] = useState(3);
  const [phase, setPhase] = useState('memorize');
  const [isClient, setIsClient] = useState(false);
  
  const targetPattern = useRef([]);
  const userDrawing = useRef([]);
  const isDrawing = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const scoreValue = useRef(0);
  const streakValue = useRef(0);
  const complexityValue = useRef(3);
  const memorizeStartTime = useRef(0);
  const resultStartTime = useRef(0);
  const animationId = useRef(null);
  const timerInterval = useRef(null);
  const audioCtx = useRef(null);
  const bestStreakValue = useRef(0);
  const gameStateRef = useRef('start');

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('complexPatternBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            if (timerInterval.current) clearInterval(timerInterval.current);
            if (animationId.current) cancelAnimationFrame(animationId.current);
            const finalScore = Math.floor(scoreValue.current);
            try {
              const savedBest = parseInt(localStorage.getItem('complexPatternBestScore') || '0', 10);
              if (finalScore > savedBest) {
                localStorage.setItem('complexPatternBestScore', finalScore.toString());
                setBestScore(finalScore);
              }
            } catch (e) { /* localStorage not available */ }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
    };
  }, [gameState]);

  const generatePattern = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const numWaypoints = Math.min(6, Math.max(1, Math.floor(complexityValue.current) - 1));
    const pattern = [];
    const padding = 100;
    
    pattern.push({
      x: padding + Math.random() * (canvas.width - padding * 2),
      y: padding + Math.random() * (canvas.height - padding * 2),
      type: 'start',
      order: 0
    });
    
    for (let i = 0; i < numWaypoints; i++) {
      pattern.push({
        x: padding + Math.random() * (canvas.width - padding * 2),
        y: padding + Math.random() * (canvas.height - padding * 2),
        type: 'waypoint',
        order: i + 1
      });
    }
    
    pattern.push({
      x: padding + Math.random() * (canvas.width - padding * 2),
      y: padding + Math.random() * (canvas.height - padding * 2),
      type: 'end',
      order: pattern.length
    });
    
    targetPattern.current = pattern;
  }, []);

  const startNewPattern = useCallback(() => {
    generatePattern();
    setPhase('memorize');
    memorizeStartTime.current = performance.now();
    userDrawing.current = [];
    isDrawing.current = false;
  }, [generatePattern]);

  const calculatePathSimilarity = useCallback(() => {
    if (targetPattern.current.length === 0 || userDrawing.current.length < 2) {
      return { accurate: false, similarity: 0, error: 100 };
    }
    
    const resamplePath = (path, numPoints) => {
      if (path.length < 2) return path;
      
      let totalLength = 0;
      const segmentLengths = [];
      for (let i = 1; i < path.length; i++) {
        const dist = Math.hypot(path[i].x - path[i-1].x, path[i].y - path[i-1].y);
        segmentLengths.push(dist);
        totalLength += dist;
      }
      
      const resampled = [];
      const stepSize = totalLength / (numPoints - 1);
      let accumulatedLength = 0;
      let segmentIndex = 0;
      
      resampled.push({ x: path[0].x, y: path[0].y });
      
      for (let i = 1; i < numPoints - 1; i++) {
        const targetDistance = i * stepSize;
        
        while (accumulatedLength + segmentLengths[segmentIndex] < targetDistance && segmentIndex < segmentLengths.length - 1) {
          accumulatedLength += segmentLengths[segmentIndex];
          segmentIndex++;
        }
        
        const remainingDistance = targetDistance - accumulatedLength;
        const segmentLength = segmentLengths[segmentIndex] || 1;
        const t = Math.min(1, Math.max(0, remainingDistance / segmentLength));
        
        const p1 = path[segmentIndex];
        const p2 = path[segmentIndex + 1] || p1;
        
        resampled.push({
          x: p1.x + (p2.x - p1.x) * t,
          y: p1.y + (p2.y - p1.y) * t
        });
      }
      
      resampled.push({ x: path[path.length - 1].x, y: path[path.length - 1].y });
      
      return resampled;
    };
    
    const normalizePath = (path) => {
      let cx = 0, cy = 0;
      path.forEach(p => { cx += p.x; cy += p.y; });
      cx /= path.length;
      cy /= path.length;
      
      const centered = path.map(p => ({ x: p.x - cx, y: p.y - cy }));
      
      let maxDist = 0;
      centered.forEach(p => {
        const dist = Math.hypot(p.x, p.y);
        if (dist > maxDist) maxDist = dist;
      });
      
      if (maxDist > 0) {
        return centered.map(p => ({ x: p.x / maxDist, y: p.y / maxDist }));
      }
      return centered;
    };
    
    const targetResampled = resamplePath(targetPattern.current, 100);
    const drawnResampled = resamplePath(userDrawing.current, 100);
    
    const targetNormalized = normalizePath(targetResampled);
    const drawnNormalized = normalizePath(drawnResampled);
    
    let totalPointDistance = 0;
    for (let i = 0; i < targetNormalized.length; i++) {
      const dist = Math.hypot(
        targetNormalized[i].x - drawnNormalized[i].x,
        targetNormalized[i].y - drawnNormalized[i].y
      );
      totalPointDistance += dist;
    }
    
    const avgPointDistance = totalPointDistance / targetNormalized.length;
    
    const getAngles = (path) => {
      const angles = [];
      for (let i = 1; i < path.length; i++) {
        const dx = path[i].x - path[i-1].x;
        const dy = path[i].y - path[i-1].y;
        angles.push(Math.atan2(dy, dx));
      }
      return angles;
    };
    
    const targetAngles = getAngles(targetResampled);
    const drawnAngles = getAngles(drawnResampled);
    
    let totalAngleDiff = 0;
    const minAngleCount = Math.min(targetAngles.length, drawnAngles.length);
    for (let i = 0; i < minAngleCount; i++) {
      let diff = Math.abs(targetAngles[i] - drawnAngles[i]);
      if (diff > Math.PI) diff = 2 * Math.PI - diff;
      totalAngleDiff += diff;
    }
    
    const avgAngleDiff = totalAngleDiff / minAngleCount;
    
    const startDist = Math.hypot(
      targetPattern.current[0].x - userDrawing.current[0].x,
      targetPattern.current[0].y - userDrawing.current[0].y
    );
    const endDist = Math.hypot(
      targetPattern.current[targetPattern.current.length - 1].x - userDrawing.current[userDrawing.current.length - 1].x,
      targetPattern.current[targetPattern.current.length - 1].y - userDrawing.current[userDrawing.current.length - 1].y
    );
    
    const pointScore = Math.max(0, 100 - (avgPointDistance * 100));
    const angleScore = Math.max(0, 100 - (avgAngleDiff * (100 / Math.PI)));
    const startEndPenalty = (startDist > 30 ? 10 : 0) + (endDist > 30 ? 10 : 0);
    
    const similarity = Math.max(0, Math.min(100, 
      (pointScore * 0.6) + (angleScore * 0.3) + (100 - startEndPenalty) * 0.1
    ));
    
    const accurate = similarity >= 60 && startDist < 50 && endDist < 50;
    
    return { accurate, similarity, startDist, endDist };
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.current.state === 'suspended') {
        audioCtx.current.resume();
      }
      const osc = audioCtx.current.createOscillator();
      const gain = audioCtx.current.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.current.destination);
      
      const now = audioCtx.current.currentTime;
      
      if (type === 'success') {
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.1, now);
      } else {
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.1, now);
      }
      osc.start(now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.stop(now + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled]);

  const showFeedback = useCallback((message, type) => {
    setFeedback(message);
    setFeedbackType(type);
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  }, []);

  const applyPenalty = useCallback(() => {
    const penaltyAmount = 1;
    scoreValue.current = Math.max(0, scoreValue.current - penaltyAmount);
    setScore(scoreValue.current);
    playSound('fail');
    showFeedback(`✗ Failed! -${penaltyAmount} point penalty`, 'error');
  }, [playSound, showFeedback]);

  const submitDrawing = useCallback(() => {
    const result = calculatePathSimilarity();
    
    if (result.accurate) {
      streakValue.current++;
      const pointsEarned = 1;
      scoreValue.current += pointsEarned;
      complexityValue.current = Math.min(8, complexityValue.current + 0.5);
      
      setScore(scoreValue.current);
      setStreak(streakValue.current);
      setCurrentComplexity(Math.floor(complexityValue.current));
      setPatternsCompleted(prev => prev + 1);
      
      if (streakValue.current > bestStreakValue.current) {
        bestStreakValue.current = streakValue.current;
        setBestStreak(bestStreakValue.current);
      }
      
      playSound('success');
      showFeedback(`✓ ${Math.round(result.similarity)}% shape match! +${pointsEarned}`, 'success');
    } else {
      streakValue.current = 0;
      setStreak(0);
      complexityValue.current = Math.max(2, complexityValue.current - 0.5);
      setCurrentComplexity(Math.floor(complexityValue.current));
      
      if (result.startDist >= 50 || result.endDist >= 50) {
        showFeedback('✗ Must start/end near correct points!', 'error');
      } else {
        showFeedback(`✗ ${Math.round(result.similarity)}% match - need 60%`, 'error');
      }
      
      applyPenalty();
    }
    
    setPhase('result');
    resultStartTime.current = performance.now();
  }, [calculatePathSimilarity, playSound, showFeedback, applyPenalty]);

  // Phase timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const checkPhaseTimer = setInterval(() => {
      if (phase === 'memorize') {
        const elapsed = (performance.now() - memorizeStartTime.current) / 1000;
        if (elapsed >= 2.0) {
          setPhase('draw');
        }
      } else if (phase === 'result') {
        const elapsed = (performance.now() - resultStartTime.current) / 1000;
        if (elapsed >= 1.0) {
          startNewPattern();
        }
      }
    }, 50);
    
    return () => clearInterval(checkPhaseTimer);
  }, [gameState, phase, startNewPattern]);

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      mousePos.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
      
      if (phase === 'draw' && isDrawing.current && gameStateRef.current === 'playing') {
        userDrawing.current.push({ ...mousePos.current });
      }
    };
    
    const handleMouseDown = () => {
      if (gameStateRef.current === 'playing' && phase === 'draw') {
        isDrawing.current = true;
        userDrawing.current = [];
      }
    };
    
    const handleMouseUp = () => {
      if (gameStateRef.current === 'playing' && phase === 'draw' && isDrawing.current) {
        isDrawing.current = false;
        if (userDrawing.current.length > 5) {
          submitDrawing();
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [phase, submitDrawing]);

  // Canvas rendering
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let width = rect.width;
      let height = width * (9 / 16);
      if (height > rect.height) {
        height = rect.height;
        width = height * (16 / 9);
      }
      canvas.width = width;
      canvas.height = height;
      canvas.style.position = 'absolute';
      canvas.style.left = `${(rect.width - width) / 2}px`;
      canvas.style.top = `${(rect.height - height) / 2}px`;
      
      if (targetPattern.current.length === 0) {
        startNewPattern();
      }
    };
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    resizeCanvas();
    
    const draw = () => {
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }
      
      // Always show START and END points
      if (targetPattern.current.length > 0) {
        const startPoint = targetPattern.current.find(p => p.type === 'start');
        const endPoint = targetPattern.current.find(p => p.type === 'end');
        
        if (startPoint) {
          ctx.beginPath();
          ctx.arc(startPoint.x, startPoint.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = "#00FFFF";
          ctx.fill();
        }
        
        if (endPoint) {
          ctx.beginPath();
          ctx.arc(endPoint.x, endPoint.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = "#FF00FF";
          ctx.fill();
        }
      }
      
      if (phase === 'memorize') {
        if (targetPattern.current.length > 0) {
          ctx.beginPath();
          ctx.moveTo(targetPattern.current[0].x, targetPattern.current[0].y);
          for (let i = 1; i < targetPattern.current.length; i++) {
            ctx.lineTo(targetPattern.current[i].x, targetPattern.current[i].y);
          }
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 3;
          ctx.stroke();
          
          targetPattern.current.forEach((point) => {
            if (point.type === 'waypoint') {
              ctx.beginPath();
              ctx.arc(point.x, point.y, 7, 0, Math.PI * 2);
              ctx.fillStyle = "#00ff88";
              ctx.fill();
            }
          });
        }
      } else if (phase === 'draw') {
        if (userDrawing.current.length > 1) {
          ctx.beginPath();
          ctx.moveTo(userDrawing.current[0].x, userDrawing.current[0].y);
          for (let i = 1; i < userDrawing.current.length; i++) {
            ctx.lineTo(userDrawing.current[i].x, userDrawing.current[i].y);
          }
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      } else if (phase === 'result') {
        if (targetPattern.current.length > 0) {
          ctx.beginPath();
          ctx.moveTo(targetPattern.current[0].x, targetPattern.current[0].y);
          for (let i = 1; i < targetPattern.current.length; i++) {
            ctx.lineTo(targetPattern.current[i].x, targetPattern.current[i].y);
          }
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 2;
          ctx.stroke();
          
          targetPattern.current.forEach((point) => {
            if (point.type === 'waypoint') {
              ctx.beginPath();
              ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
              ctx.fillStyle = "#00ff88";
              ctx.fill();
            }
          });
        }
        
        if (userDrawing.current.length > 1) {
          ctx.beginPath();
          ctx.moveTo(userDrawing.current[0].x, userDrawing.current[0].y);
          for (let i = 1; i < userDrawing.current.length; i++) {
            ctx.lineTo(userDrawing.current[i].x, userDrawing.current[i].y);
          }
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      
      // Crosshair
      const mouse = mousePos.current;
      if (mouse.x > 0 && mouse.x < canvas.width && mouse.y > 0 && mouse.y < canvas.height) {
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 14, mouse.y); ctx.lineTo(mouse.x + 14, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 14); ctx.lineTo(mouse.x, mouse.y + 14);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.stroke();
      }
      
      animationId.current = requestAnimationFrame(draw);
    };
    
    animationId.current = requestAnimationFrame(draw);
    
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      resizeObserver.disconnect();
    };
  }, [gameState, phase, isBoxDarkMode, startNewPattern]);

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
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [isFullscreen]);

  const resetGame = useCallback(() => {
    if (animationId.current) cancelAnimationFrame(animationId.current);
    if (timerInterval.current) clearInterval(timerInterval.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setFeedback('');
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCurrentComplexity(3);
    setTimeLeft(60);
    setFeedback('');
    setPatternsCompleted(0);
    
    scoreValue.current = 0;
    streakValue.current = 0;
    bestStreakValue.current = 0;
    complexityValue.current = 3;
    targetPattern.current = [];
    userDrawing.current = [];
    setPhase('memorize');
    memorizeStartTime.current = performance.now();
    
    setTimeout(() => {
      if (canvasRef.current) {
        startNewPattern();
      }
    }, 100);
  }, [startNewPattern]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading complex pattern drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Complex Pattern Elite",
            "url": "https://skilldrills.online/drills/physical/Coordination/complex-pattern",
            "description": "Memorize and replicate complex path patterns with your mouse. Shape-based scoring compares drawing to original. Adaptive complexity increases with success. 60-second pattern recognition challenge.",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "Global Drill System"
            },
            "educationalUse": ["Pattern Memory", "Motor Coordination", "Spatial Memory", "Visual Memory"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Pattern Recognition", "Motor Control", "Spatial Memory", "Visual-Motor Integration"]
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Home
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li>
              <Link href="/drills/physical" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Physical Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Coordination
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-current="page">
              Complex Pattern Elite
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex-shrink-0">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Complex Pattern Elite
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Memorize & draw patterns • Shape-based scoring • 60s challenge
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset pattern drill"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label="Toggle drill area theme"
              title="Toggle drill area theme"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={toggleFullscreen} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Complex Pattern Elite - Pattern Memory & Motor Coordination Training</h2>
          <p>
            Train your spatial memory and fine motor control by memorizing and replicating complex path patterns.
            Each round shows a pattern with waypoints for 2 seconds, then you draw it from memory.
            Shape-based scoring compares your drawing to the original using Procrustes analysis.
            Adaptive complexity increases with successful reproductions and decreases with failures.
            Cyan dot marks the start point, Magenta dot marks the end point.
            60-second timed challenge with best score saved locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<GitBranch className="text-cyan-600" />} value={currentComplexity} label="Complexity" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* Game Canvas */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#020202" : "#ffffff",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset pattern drill"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme">
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} aria-label="Pattern drawing canvas - memorize the pattern, then click and drag to draw" />

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <GitBranch className="w-16 h-16 text-cyan-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Complex Pattern Elite
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60-second challenge • Memorize and draw patterns
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Study the pattern for 2 seconds, then draw it from Cyan (start) to Magenta (end). Shape-based scoring with adaptive complexity.
                </p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  aria-label="Start complex pattern training"
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Session Complete!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Regular pattern practice improves spatial memory and fine motor coordination.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Completed" value={patternsCompleted} icon={<GitBranch className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  <ResultCard label="Peak Complexity" value={currentComplexity} icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Avg/Pattern" value={patternsCompleted > 0 ? (score / patternsCompleted).toFixed(1) : "0"} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/physical" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Memorize the full pattern shown for <span className="font-semibold text-cyan-500">2 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Only <span className="font-semibold text-green-500">Cyan (start) and Magenta (end)</span> points remain visible</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click and drag to draw the <span className="font-semibold text-orange-500">exact path</span> from start to end</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Scoring compares <span className="font-semibold text-purple-500">path shape + direction</span> to original</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success (≥60% match): <span className="font-semibold text-emerald-500">+1 point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Failure: <span className="font-semibold text-red-500">-1 point penalty</span> • Complexity adjusts</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🟢 Cyan = Start • 🟣 Magenta = End • Green dots = Waypoints (visual guides)</span>
                  <span>⚡ Shape-based analysis • Best Score saves locally</span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = {
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
  };
  
  const colors = colorMap[color] || colorMap.yellow;
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={colors.icon} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span>
    </div>
  );
}