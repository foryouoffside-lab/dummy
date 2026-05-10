'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Move,
  Lock, AlertCircle
} from 'lucide-react';

const SCORE_INTERVAL = 800; // +1 point every 800ms of tracking

export default function PeripheralTrackingClient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [trackingScore, setTrackingScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [trackingAccuracy, setTrackingAccuracy] = useState(100);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [trackingCombo, setTrackingCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const targetsRef = useRef([]);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const trackingIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const bestComboRef = useRef(0);
  const bestAccuracyRef = useRef(0);
  const trackingAccumulatorRef = useRef(0);

  useEffect(() => { 
    setIsClient(true); 
    const timer = setTimeout(() => setLoading(false), 300); 
    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    try { 
      const saved = localStorage.getItem('peripheralTrackingBestScore'); 
      if (saved) { 
        const p = parseInt(saved, 10); 
        if (!isNaN(p)) setBestScore(p); 
      } 
    } catch (e) {
      // Silently handle localStorage errors
    }
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try { 
      const current = parseInt(localStorage.getItem('peripheralTrackingBestScore') || '0', 10); 
      if (finalScore > current) { 
        localStorage.setItem('peripheralTrackingBestScore', finalScore.toString()); 
        setBestScore(finalScore); 
      } 
    } catch (e) {
      // Silently handle localStorage errors
    }
  }, []);

  useEffect(() => { 
    gameStateRef.current = gameState; 
  }, [gameState]);

  const initAudio = useCallback(() => {
    try { 
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); 
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume(); 
      }
      return audioCtxRef.current; 
    } catch (e) { 
      return null; 
    }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try { 
      const ctx = initAudio(); 
      if (!ctx) return; 
      const o = ctx.createOscillator();
      const g = ctx.createGain(); 
      o.connect(g); 
      g.connect(ctx.destination); 
      const now = ctx.currentTime; 
      const f = { score: 880, combo: 1046 }; 
      o.frequency.setValueAtTime(f[type] || 880, now); 
      g.gain.setValueAtTime(0.08, now); 
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.1); 
      o.start(now); 
      o.stop(now + 0.1); 
    } catch (e) {
      // Silently handle audio errors
    }
  }, [soundEnabled, initAudio]);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if (!isFullscreen) { 
        const el = containerRef.current; 
        if (el?.requestFullscreen) { 
          await el.requestFullscreen(); 
        } 
      } else { 
        if (document.fullscreenElement) {
          await document.exitFullscreen(); 
        }
      } 
    } catch (e) {
      // Silently handle fullscreen errors
    } 
  }, [isFullscreen]);

  useEffect(() => { 
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', handleFullscreenChange); 
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange); 
  }, []);

  const requestPointerLock = useCallback(() => { 
    if (!lockCooldown && canvasRef.current) {
      canvasRef.current.requestPointerLock(); 
    }
  }, [lockCooldown]);

  useEffect(() => {
    const handlePointerLockChange = () => { 
      const locked = document.pointerLockElement === canvasRef.current; 
      setPointerLocked(locked); 
      if (!locked && gameState === 'playing') { 
        setLockCooldown(true); 
        setTimeout(() => setLockCooldown(false), 1000); 
      } 
    };
    
    const handlePointerLockError = () => { 
      setLockCooldown(true); 
      setTimeout(() => setLockCooldown(false), 1000); 
    };
    
    document.addEventListener('pointerlockchange', handlePointerLockChange); 
    document.addEventListener('pointerlockerror', handlePointerLockError);
    
    return () => { 
      document.removeEventListener('pointerlockchange', handlePointerLockChange); 
      document.removeEventListener('pointerlockerror', handlePointerLockError); 
    };
  }, [gameState]);

  useEffect(() => { 
    const canvas = canvasRef.current; 
    if (!canvas) return; 
    
    const handleCanvasClick = () => { 
      if (gameState === 'playing' && !pointerLocked && !lockCooldown) {
        requestPointerLock(); 
      }
    }; 
    
    canvas.addEventListener('click', handleCanvasClick); 
    return () => canvas.removeEventListener('click', handleCanvasClick); 
  }, [gameState, pointerLocked, requestPointerLock, lockCooldown]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = canvasRef.current; 
      if (!canvas) return;
      
      if (document.pointerLockElement === canvas) { 
        virtualCrosshair.current.x += e.movementX || 0; 
        virtualCrosshair.current.y += e.movementY || 0; 
      }
      
      virtualCrosshair.current.x = Math.max(0, Math.min(canvas.width, virtualCrosshair.current.x));
      virtualCrosshair.current.y = Math.max(0, Math.min(canvas.height, virtualCrosshair.current.y));
    };
    
    window.addEventListener('mousemove', handleMouseMove); 
    return () => window.removeEventListener('mousemove', handleMouseMove); 
  }, []);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    timerIntervalRef.current = setInterval(() => { 
      if (gameStateRef.current === 'playing' && isActiveRef.current) { 
        timeLeftRef.current -= 1; 
        setTimeLeft(timeLeftRef.current); 
        
        if (timeLeftRef.current <= 0) { 
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current); 
            timerIntervalRef.current = null; 
          }
          if (trackingIntervalRef.current) {
            clearInterval(trackingIntervalRef.current);
          }
          
          setGameState('gameOver'); 
          gameStateRef.current = 'gameOver'; 
          isActiveRef.current = false; 
          updateBestScore(scoreRef.current); 
          document.exitPointerLock(); 
        } 
      } 
    }, 1000);
  }, [updateBestScore]);

  useEffect(() => {
    if (gameState !== 'playing') { 
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current); 
        trackingIntervalRef.current = null;
      }
      return; 
    }
    
    trackingIntervalRef.current = setInterval(() => {
      if (!isActiveRef.current) return;
      
      const ch = virtualCrosshair.current;
      let totalDist = 0;
      let totalPossible = 0;
      
      targetsRef.current.forEach(t => {
        const d = Math.hypot(t.x - ch.x, t.y - ch.y);
        totalDist += Math.max(0, 100 - (d / 200) * 100);
        totalPossible += 100;
      });
      
      const accuracy = totalPossible > 0 ? Math.round(totalDist / totalPossible) : 0;
      setTrackingAccuracy(accuracy);
      
      if (accuracy > bestAccuracyRef.current) { 
        bestAccuracyRef.current = accuracy; 
        setBestAccuracy(accuracy); 
      }
      
      const nearAnyTarget = targetsRef.current.some(t => 
        Math.hypot(t.x - ch.x, t.y - ch.y) < 150
      );
      
      if (nearAnyTarget) {
        trackingAccumulatorRef.current += 50;
        
        while (trackingAccumulatorRef.current >= SCORE_INTERVAL) {
          scoreRef.current += 1;
          setTrackingScore(scoreRef.current);
          trackingAccumulatorRef.current -= SCORE_INTERVAL;
          comboRef.current += 1;
          setTrackingCombo(comboRef.current);
          
          if (comboRef.current > bestComboRef.current) { 
            bestComboRef.current = comboRef.current; 
            setBestCombo(comboRef.current); 
          }
          
          if (comboRef.current % 5 === 0) {
            playSound('combo');
          }
        }
      } else {
        trackingAccumulatorRef.current = 0;
        if (comboRef.current > 0) { 
          comboRef.current = 0; 
          setTrackingCombo(0); 
        }
      }
    }, 50);
    
    return () => { 
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current); 
        trackingIntervalRef.current = null;
      }
    };
  }, [gameState, playSound]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const canvas = canvasRef.current; 
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let resizeObserver = null;

    const updateCanvasSize = () => {
      const container = containerRef.current; 
      if (!container) return;
      
      const cr = container.getBoundingClientRect();
      let w = cr.width;
      let h = w * (9/16);
      
      if (h > cr.height) { 
        h = cr.height; 
        w = h * (16/9); 
      }
      
      canvas.width = w; 
      canvas.height = h; 
      canvasSizeRef.current = { width: w, height: h };
      canvas.style.position = 'absolute'; 
      canvas.style.left = `${(cr.width - w)/2}px`; 
      canvas.style.top = `${(cr.height - h)/2}px`;
      
      virtualCrosshair.current = { x: w/2, y: h/2 };
      
      if (targetsRef.current.length === 0) {
        targetsRef.current = [
          { x: w/2, y: h/2 - 80, r: 28, baseV: 15, currentV: 15, dir: 1, color: '#00f2ff', isPrimary: true },
          { x: w/2, y: h/2 + 80, r: 28, baseV: 21, currentV: 21, dir: -1, color: '#ff00ff', isPrimary: false }
        ];
      }
    };

    resizeObserver = new ResizeObserver(() => updateCanvasSize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    function updateTargets(dtf) {
      if (!isActiveRef.current) return;
      
      targetsRef.current.forEach(t => {
        if (Math.random() < 0.035) t.dir *= -1;
        t.currentV = t.baseV * (1 + (Math.random() - 0.5) * 0.20);
        t.x += t.currentV * t.dir * dtf;
        
        if (t.x < t.r || t.x > canvas.width - t.r) { 
          t.dir *= -1; 
          t.x = Math.max(t.r, Math.min(canvas.width - t.r, t.x)); 
        }
      });
    }

    function draw() {
      ctx.fillStyle = isBoxDarkMode ? '#020202' : '#f9fafb'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; 
      ctx.lineWidth = 1;
      
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      
      targetsRef.current.forEach(t => {
        // Track lines
        ctx.beginPath(); 
        ctx.moveTo(0, t.y); 
        ctx.lineTo(canvas.width, t.y);
        ctx.strokeStyle = t.isPrimary 
          ? (isBoxDarkMode ? 'rgba(0,242,255,0.08)' : 'rgba(0,200,255,0.08)') 
          : (isBoxDarkMode ? 'rgba(255,0,255,0.05)' : 'rgba(255,0,255,0.05)');
        ctx.lineWidth = t.isPrimary ? 2 : 1; 
        ctx.stroke();
        
        // Target
        ctx.shadowBlur = t.isPrimary ? 30 : 20; 
        ctx.shadowColor = t.color;
        ctx.beginPath(); 
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        
        const g = ctx.createLinearGradient(t.x - 12, t.y - 12, t.x + 12, t.y + 12);
        g.addColorStop(0, t.color); 
        g.addColorStop(1, t.color + (t.isPrimary ? 'ff' : 'cc'));
        ctx.fillStyle = g; 
        ctx.fill();
        
        ctx.beginPath(); 
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.strokeStyle = t.isPrimary ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'; 
        ctx.lineWidth = t.isPrimary ? 2.5 : 1.5; 
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Direction arrow
        const ax = t.x + t.dir * 15;
        ctx.beginPath(); 
        ctx.moveTo(t.x + t.dir * 5, t.y); 
        ctx.lineTo(ax, t.y);
        ctx.strokeStyle = t.isPrimary ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)'; 
        ctx.lineWidth = t.isPrimary ? 2.5 : 1.5; 
        ctx.stroke();
        
        ctx.beginPath(); 
        ctx.moveTo(ax, t.y); 
        ctx.lineTo(ax - t.dir * 6, t.y - 5); 
        ctx.lineTo(ax - t.dir * 6, t.y + 5); 
        ctx.closePath();
        ctx.fillStyle = t.isPrimary ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)'; 
        ctx.fill();
        
        // Labels
        ctx.font = t.isPrimary ? 'bold 14px monospace' : '12px monospace';
        ctx.fillStyle = t.isPrimary ? '#00f2ff' : '#ff00ff'; 
        ctx.textAlign = 'center';
        ctx.fillText(t.isPrimary ? 'FOCUS' : 'PERIPHERAL', t.x, t.y - 40);
      });
      
      // Crosshair
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < canvas.width && ch.y > 0 && ch.y < canvas.height) {
        let closestDistance = Infinity;
        
        targetsRef.current.forEach(t => {
          const d = Math.hypot(t.x - ch.x, t.y - ch.y);
          if (d < closestDistance) closestDistance = d;
        });
        
        const crosshairColor = closestDistance < 150 ? '#00ff88' : 'rgba(255,255,255,0.6)';
        const lineColor = pointerLocked ? crosshairColor : 'rgba(255,255,255,0.4)';
        
        ctx.strokeStyle = lineColor; 
        ctx.lineWidth = 2;
        
        ctx.beginPath(); 
        ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); 
        ctx.stroke();
        
        ctx.beginPath(); 
        ctx.moveTo(ch.x - 24, ch.y); 
        ctx.lineTo(ch.x - 10, ch.y); 
        ctx.moveTo(ch.x + 10, ch.y); 
        ctx.lineTo(ch.x + 24, ch.y); 
        ctx.moveTo(ch.x, ch.y - 24); 
        ctx.lineTo(ch.x, ch.y - 10); 
        ctx.moveTo(ch.x, ch.y + 10); 
        ctx.lineTo(ch.x, ch.y + 24); 
        ctx.stroke();
        
        ctx.fillStyle = lineColor; 
        ctx.beginPath(); 
        ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); 
        ctx.fill();
        
        // Connection lines
        targetsRef.current.forEach(t => {
          const d = Math.hypot(t.x - ch.x, t.y - ch.y);
          if (d < 150) {
            ctx.beginPath(); 
            ctx.moveTo(ch.x, ch.y); 
            ctx.lineTo(t.x, t.y);
            ctx.strokeStyle = t.isPrimary 
              ? `rgba(0,255,136,${0.4 * (1 - d/150)})` 
              : `rgba(255,0,255,${0.2 * (1 - d/150)})`; 
            ctx.lineWidth = t.isPrimary ? 2 : 1.5; 
            ctx.stroke();
          }
        });
      }
    }

    let lastTime = 0;
    
    function loop(currentTime) {
      if (!lastTime) lastTime = currentTime;
      const dtf = Math.min((currentTime - lastTime) / 16.67, 4);
      lastTime = currentTime;
      
      updateTargets(dtf);
      draw();
      
      animationRef.current = requestAnimationFrame(loop);
    }
    
    animationRef.current = requestAnimationFrame(loop);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      window.removeEventListener('resize', updateCanvasSize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      targetsRef.current = [];
    };
  }, [gameState, isBoxDarkMode, pointerLocked]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) { 
      clearInterval(timerIntervalRef.current); 
      timerIntervalRef.current = null; 
    }
    
    targetsRef.current = [];
    setGameState('playing'); 
    gameStateRef.current = 'playing';
    setTrackingScore(0); 
    setTrackingAccuracy(100); 
    setBestAccuracy(0); 
    setTrackingCombo(0); 
    setBestCombo(0);
    timeLeftRef.current = 60; 
    setTimeLeft(60);
    
    isActiveRef.current = true; 
    scoreRef.current = 0; 
    comboRef.current = 0; 
    bestComboRef.current = 0; 
    bestAccuracyRef.current = 0;
    trackingAccumulatorRef.current = 0;
    
    setTimeout(() => requestPointerLock(), 300);
    startTimer();
  }, [startTimer, requestPointerLock]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) { 
      clearInterval(timerIntervalRef.current); 
      timerIntervalRef.current = null; 
    }
    if (trackingIntervalRef.current) {
      clearInterval(trackingIntervalRef.current);
      trackingIntervalRef.current = null;
    }
    
    isActiveRef.current = false;
    setGameState('start'); 
    gameStateRef.current = 'start';
    setTrackingScore(0); 
    setTrackingAccuracy(100); 
    setBestAccuracy(0); 
    setTrackingCombo(0); 
    setBestCombo(0);
    timeLeftRef.current = 60; 
    setTimeLeft(60);
    
    document.exitPointerLock();
    setLockCooldown(true); 
    setTimeout(() => setLockCooldown(false), 1000);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
        trackingIntervalRef.current = null;
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      // Close AudioContext if it exists
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      
      document.exitPointerLock();
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb navigation */}
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link href="/" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                  Home
                </Link>
              </li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li>
                <Link href="/drills/fps" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                  FPS Drills
                </Link>
              </li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li className={`font-medium ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                Peripheral Tracking
              </li>
            </ol>
          </nav>
        )}
        
        {/* Header with controls */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl">
                <Move className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Peripheral Tracking Trainer
                </h1>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • +1pt/800ms • Dual target
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} 
                className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
                aria-label="Toggle game area theme"
              >
                <Eye className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)} 
                className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
                aria-label="Toggle sound"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={toggleFullscreen} 
                className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={pointerLocked ? () => {
                  document.exitPointerLock();
                  setLockCooldown(true);
                  setTimeout(() => setLockCooldown(false), 1000);
                } : requestPointerLock} 
                className={`p-2 rounded-lg border ${
                  pointerLocked 
                    ? 'bg-green-500 border-green-600 text-white' 
                    : isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-300' 
                      : 'bg-white border-gray-200 text-gray-700'
                }`}
                aria-label="Toggle pointer lock"
              >
                <Lock className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* Stats cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={trackingScore} label="Score" d={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} />
            <StatCard icon={<Activity className="text-green-500" />} value={trackingAccuracy} label="Accuracy" unit="%" d={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={trackingCombo} label="Combo" d={isDarkMode} />
          </div>
        )}
        
        {/* Game area */}
        <div 
          ref={containerRef} 
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{
            background: isBoxDarkMode ? "#020202" : "#ffffff",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden',
            cursor: 'none'
          }}
        >
          {/* Fullscreen hint */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="text-white/40 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
                Press <span className="text-white/70 font-bold">ESC</span> to exit fullscreen
              </span>
            </div>
          )}
          
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />
          
          {/* Start screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Move className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Peripheral Tracking Trainer
                </h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Raw input • +1pt/800ms • Dual target • ~75 max
                </p>
                
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <p className={`text-sm font-medium ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                      Raw Input via Pointer Lock
                    </p>
                  </div>
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Track cyan (focus) and magenta (peripheral). +1pt/800ms near targets. Press ESC to unlock.
                  </p>
                </div>
                
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full"
                >
                  Start Training
                </button>
                

              </div>
            </div>
          )}
          
          {/* Game over screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Trophy className="w-10 h-10 text-yellow-500" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Training Complete
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <ResultCard 
                    label="Score" 
                    value={trackingScore} 
                    icon={<Target className="w-4 h-4" />} 
                    color="blue" 
                    isDark={isBoxDarkMode} 
                  />
                  <ResultCard 
                    label="Best" 
                    value={bestScore} 
                    icon={<Trophy className="w-4 h-4" />} 
                    color="yellow" 
                    isDark={isBoxDarkMode} 
                  />
                  <ResultCard 
                    label="Accuracy" 
                    value={bestAccuracy} 
                    unit="%" 
                    icon={<Activity className="w-4 h-4" />} 
                    color="emerald" 
                    isDark={isBoxDarkMode} 
                  />
                  <ResultCard 
                    label="Combo" 
                    value={bestCombo} 
                    icon={<Zap className="w-4 h-4" />} 
                    color="orange" 
                    isDark={isBoxDarkMode} 
                  />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/fps" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      ← Back
                    </button>
                  </Link>
                  
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold"
                  >
                    Track Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer with instructions */}
        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <h2 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Drill Rules & Professional Features
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      How to Play
                    </h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>• Focus on cyan target</li>
                      <li>• Track magenta peripherally</li>
                      <li>• Cursor locks for raw input</li>
                      <li>• Score near either target</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      Scoring
                    </h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>• +1 point every 800ms</li>
                      <li>• ~75 max with perfect tracking</li>
                      <li>• Combo every 5 ticks</li>
                      <li>• No penalties</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                      Pro Features
                    </h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>• Pointer Lock API</li>
                      <li>• Dual target tracking</li>
                      <li>• Peripheral vision training</li>
                      <li>• Best score saved</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, value, label, unit = '', d }) { 
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${d ? 'text-white' : 'text-gray-900'}`}>
        {value}{unit}
      </p>
      <p className={`text-[10px] sm:text-xs truncate ${d ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </p>
    </div>
  ); 
}

// Result Card Component
function ResultCard({ label, value, unit = '', icon, color, isDark }) { 
  const colorMap = {
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-500',
    yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',
    orange: 'bg-orange-500/10 border-orange-500/30 text-orange-500'
  };
  
  const classes = colorMap[color] || colorMap.blue;
  const [bg, border, text] = classes.split(' ');
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}>
      <div className="flex items-center gap-2">
        <div className={text}>{icon}</div>
        <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {label}
        </span>
      </div>
      <span className={`font-bold text-base sm:text-lg ${text}`}>
        {value}{unit}
      </span>
    </div>
  ); 
}