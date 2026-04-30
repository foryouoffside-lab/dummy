'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Move, Heart, RefreshCw
} from 'lucide-react';

export default function VectorRecoilPage() {
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
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [successfulRecoils, setSuccessfulRecoils] = useState(0);
  
  const gateRef = useRef({ active: false, x: 0, y: 0, angle: 0, timer: 0.35 });
  const stateRef = useRef('CENTER'); // CENTER, FLICKING, RETURNING
  const particlesRef = useRef([]);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const livesRef = useRef(3);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const totalAttemptsRef = useRef(0);
  const successfulRecoilsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const limitRef = useRef(0.35); // 350 milliseconds
  const gateHitProcessedRef = useRef(false);
  const cycleCompletedRef = useRef(false);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('vectorRecoilBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('vectorRecoilBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('vectorRecoilBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 500);
  };

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'gateHit') {
        osc.frequency.value = 880;
        gain.gain.value = 0.08;
      } else if (type === 'success') {
        osc.frequency.value = 1200;
        gain.gain.value = 0.1;
      } else if (type === 'fail') {
        osc.frequency.value = 300;
        gain.gain.value = 0.12;
      } else if (type === 'streak') {
        osc.frequency.value = 1500;
        gain.gain.value = 0.1;
      } else if (type === 'penalty') {
        osc.frequency.value = 200;
        gain.gain.value = 0.15;
      } else if (type === 'click') {
        osc.frequency.value = 660;
        gain.gain.value = 0.05;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          updateBestScore(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  const addPenalty = (reason) => {
    if (!isActiveRef.current) return;
    
    const penaltyPoints = 1;
    
    streakRef.current = 0;
    setStreak(0);
    
    // Lose 1 life on mistake
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      showFeedback(`✗ ${reason}! -1 life (${livesRef.current} lives left)`, 'error');
      playSound('penalty');
      
      // When lives become 0, start applying point penalty
      if (livesRef.current === 0) {
        showFeedback(`⚠️ No lives left! Now penalties will deduct points!`, 'warning');
      }
    } else {
      // Lives are 0 - apply point penalty
      scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(`✗ ${reason}! -${penaltyPoints} point penalty`, 'error');
    }
  };

  const initParticles = (cvs) => {
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({ 
        a: Math.random() * Math.PI * 2, 
        r: 150 + Math.random() * 150 
      });
    }
    particlesRef.current = particles;
  };

  const spawnGate = (cvs) => {
    const cx = cvs.width / 2;
    const cy = cvs.height / 2;
    const angle = Math.random() * Math.PI * 2;
    const dist = 220 + Math.random() * 80;
    
    gateRef.current = {
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      angle: angle,
      timer: limitRef.current, // 0.35 seconds
      active: true
    };
    stateRef.current = 'FLICKING';
    gateHitProcessedRef.current = false;
    cycleCompletedRef.current = false;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width;
      const scaleY = cvs.height / rect.height;
      mousePositionRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle mouse click for gate hit only
  useEffect(() => {
    const handleMouseDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      
      const mouse = mousePositionRef.current;
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      const distToCenter = Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);
      const onCenter = distToCenter < 20;

      // Check if clicking on gate during FLICKING state
      if (stateRef.current === 'FLICKING' && gateRef.current.active && !gateHitProcessedRef.current) {
        const gate = gateRef.current;
        const distToGate = Math.sqrt((mouse.x - gate.x) ** 2 + (mouse.y - gate.y) ** 2);
        
        if (distToGate < 35) {
          // Successful gate hit! - Mark gate hit, but NO point yet (will get point on return)
          gateHitProcessedRef.current = true;
          
          playSound('gateHit');
          showFeedback(`✓ Gate hit! Now return to center`, 'success');
          
          // Gate disappears, go to RETURNING state
          gateRef.current.active = false;
          stateRef.current = 'RETURNING';
          
          return; // Exit early
        }
      }
      
      // Only process misses if gate is active
      if (stateRef.current === 'FLICKING' && gateRef.current.active && !gateHitProcessedRef.current) {
        const gate = gateRef.current;
        const distToGate = Math.sqrt((mouse.x - gate.x) ** 2 + (mouse.y - gate.y) ** 2);
        
        if (distToGate < 60 && distToGate >= 35) {
          // Near miss - penalty
          addPenalty('Near miss');
        } else if (distToGate >= 60 && !onCenter) {
          // Complete miss - penalty (not when clicking center)
          addPenalty('Miss');
          playSound('click');
        }
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, []);

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

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
      if (height > containerRect.height) {
        height = containerRect.height;
        width = height * (16 / 9);
      }
      cvs.width = width;
      cvs.height = height;
      cvs.style.position = 'absolute';
      cvs.style.left = `${(containerRect.width - width) / 2}px`;
      cvs.style.top = `${(containerRect.height - height) / 2}px`;
      initParticles(cvs);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let lastFrameTime = performance.now();

    function update(dt) {
      if (!isActiveRef.current) return;
      
      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      const mouse = mousePositionRef.current;
      const distToCenter = Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);
      const onCenter = distToCenter < 20;

      if (stateRef.current === 'CENTER') {
        if (onCenter) {
          spawnGate(cvs);
        }
      } else if (stateRef.current === 'FLICKING') {
        // Countdown timer during FLICKING state
        if (gateRef.current.active) {
          // Only count down if cursor has left center
          if (!onCenter) {
            gateRef.current.timer -= dt;
          }
          
          // Timeout check
          if (gateRef.current.timer <= 0) {
            addPenalty('Timeout');
            gateRef.current.active = false;
            stateRef.current = 'CENTER';
            gateHitProcessedRef.current = false;
            cycleCompletedRef.current = false;
          }
        }
      } else if (stateRef.current === 'RETURNING') {
        // Check if cursor returned to center
        if (onCenter && gateHitProcessedRef.current && !cycleCompletedRef.current) {
          // Success! Complete cycle - GIVE 1 POINT for full cycle
          cycleCompletedRef.current = true;
          totalAttemptsRef.current++;
          successfulRecoilsRef.current++;
          setSuccessfulRecoils(successfulRecoilsRef.current);
          
          const cyclePoints = 1;
          const newStreak = streakRef.current + 1;
          streakRef.current = newStreak;
          setStreak(newStreak);
          
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
          }
          
          scoreRef.current += cyclePoints;
          setScore(scoreRef.current);
          
          playSound('success');
          
          let feedbackMsg = `✓ Complete cycle! +${cyclePoints}`;
          if (newStreak % 5 === 0) feedbackMsg += ` 🔥${newStreak}x`;
          showFeedback(feedbackMsg, 'success');
          
          if (newStreak % 5 === 0) {
            playSound('streak');
            showFeedback(`🔥 ${newStreak} STREAK!`, 'success');
          }
          
          stateRef.current = 'CENTER';
          gateHitProcessedRef.current = false;
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

      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      const mouse = mousePositionRef.current;
      const distToCenter = Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);
      const onCenter = distToCenter < 20;

      // Rotational Slate Noise
      ctx.strokeStyle = isBoxDarkMode ? "#1a1a1a" : "#e0e0e0";
      ctx.lineWidth = 1;
      particlesRef.current.forEach(p => {
        p.a += 0.005;
        const px = cx + Math.cos(p.a) * p.r;
        const py = cy + Math.sin(p.a) * p.r;
        ctx.beginPath(); 
        ctx.moveTo(px, py); 
        ctx.lineTo(px + 4, py + 4); 
        ctx.stroke();
      });

      // Center Anchor
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      if (onCenter || stateRef.current === 'CENTER') {
        ctx.fillStyle = "#00ff88";
        ctx.shadowColor = "#00ff88";
        ctx.shadowBlur = 15;
      } else {
        ctx.fillStyle = "rgba(0, 255, 136, 0.3)";
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Center ring
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.strokeStyle = onCenter ? "#00ff88" : "rgba(0, 255, 136, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Vector Gate - only show in FLICKING state
      const gate = gateRef.current;
      if (gate.active && stateRef.current === 'FLICKING') {
        // Timer ring around gate
        const timerPercent = gate.timer / limitRef.current;
        ctx.beginPath();
        ctx.arc(gate.x, gate.y, 30, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * timerPercent));
        ctx.strokeStyle = timerPercent > 0.3 ? "#00ff88" : "#ff4444";
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Gate circle
        ctx.beginPath();
        ctx.arc(gate.x, gate.y, 25, 0, Math.PI * 2);
        
        const distToGate = Math.sqrt((mouse.x - gate.x) ** 2 + (mouse.y - gate.y) ** 2);
        const isHoveringGate = distToGate < 35;
        
        if (isHoveringGate) {
          ctx.fillStyle = "rgba(0, 255, 136, 0.15)";
          ctx.fill();
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 3.5;
        } else {
          ctx.strokeStyle = `rgba(0, 255, 136, ${gate.timer})`;
          ctx.lineWidth = 2.5;
        }
        ctx.stroke();
        
        // Inner dot
        ctx.beginPath();
        ctx.arc(gate.x, gate.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = isHoveringGate ? "#00ff88" : "rgba(0, 255, 136, 0.5)";
        ctx.fill();
        
        // Directional Vector from center
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(gate.angle) * 50, cy + Math.sin(gate.angle) * 50);
        ctx.strokeStyle = "rgba(0, 255, 136, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Arrow head
        const arrowX = cx + Math.cos(gate.angle) * 50;
        const arrowY = cy + Math.sin(gate.angle) * 50;
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - Math.cos(gate.angle - 0.8) * 12, arrowY - Math.sin(gate.angle - 0.8) * 12);
        ctx.lineTo(arrowX - Math.cos(gate.angle + 0.8) * 12, arrowY - Math.sin(gate.angle + 0.8) * 12);
        ctx.closePath();
        ctx.fillStyle = "rgba(0, 255, 136, 0.3)";
        ctx.fill();
        
        // Show points on hover
        if (isHoveringGate) {
          ctx.fillStyle = "#00ff88";
          ctx.font = "bold 10px monospace";
          ctx.textAlign = "center";
          ctx.fillText(`CLICK`, gate.x, gate.y - 35);
        }
      }
      
      // Returning indicator
      if (stateRef.current === 'RETURNING') {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = "rgba(0, 255, 136, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Show points for return
        ctx.fillStyle = "#00ff88";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`Return to center for +1`, cx, cy - 40);
      }

      // Rounded Cursor Circle
      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        // Outer ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff88";
        ctx.fill();
        
        // Crosshair lines
        ctx.strokeStyle = "rgba(0, 255, 136, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 20, mouse.y); ctx.lineTo(mouse.x - 14, mouse.y);
        ctx.moveTo(mouse.x + 14, mouse.y); ctx.lineTo(mouse.x + 20, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 20); ctx.lineTo(mouse.x, mouse.y - 14);
        ctx.moveTo(mouse.x, mouse.y + 14); ctx.lineTo(mouse.x, mouse.y + 20);
        ctx.stroke();
      }
      
      // State indicator text
      if (stateRef.current === 'FLICKING') {
        ctx.fillStyle = "#00ff88";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText('→ CLICK THE GATE (0.35s) →', cvs.width / 2, 35);
      } else if (stateRef.current === 'RETURNING') {
        ctx.fillStyle = "#00ff88";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText('← RETURN TO CENTER FOR +1 ←', cvs.width / 2, 35);
      } else if (stateRef.current === 'CENTER' && onCenter) {
        ctx.fillStyle = "#00ff88";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText('✓ ON CENTER - GATE SPAWNING', cvs.width / 2, 35);
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode]);

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setLives(3);
    setFeedback('');
    setSuccessfulRecoils(0);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    livesRef.current = 3;
    totalAttemptsRef.current = 0;
    successfulRecoilsRef.current = 0;
    stateRef.current = 'CENTER';
    gateRef.current = { active: false, x: 0, y: 0, angle: 0, timer: 0.35 };
    gateHitProcessedRef.current = false;
    cycleCompletedRef.current = false;
    
    if (canvasRef.current) {
      initParticles(canvasRef.current);
    }
    
    showFeedback('60 seconds • 0.35s to click gate!', 'success');
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setLives(3);
    setFeedback('');
    setSuccessfulRecoils(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/motor" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Motor Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                <Move className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Vector Recoil</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click gate (0.35s) & return • +1 per cycle • 3  • 60s</p>
              </div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} title="Reset session">
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-amber-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Move className="text-cyan-600" />} value={successfulRecoils} label="Cycles" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Canvas Box */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#020202" : "#ffffff",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden',
            cursor: 'none'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Move className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Vector Recoil</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>0.35s to click gate • Return to center for +1 point</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                </div>
                
                <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60 seconds completed!
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Cycles" value={successfulRecoils} icon={<Move className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Lives Left" value={lives} icon={<Heart className="w-4 h-4" />} color="text-red-500" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/motor" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hover over <span className="font-semibold text-blue-500">center</span> to spawn a gate</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click the gate <span className="font-semibold text-green-500">within 0.35 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Return to center = <span className="font-semibold text-emerald-500">+1 point for complete cycle</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Miss/Near miss/Timeout: <span className="font-semibold text-red-500">-1 life</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-pink-500">3  protection</span> • No score penalty until lives reach 0</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>After lives reach 0 → <span className="font-semibold text-yellow-500">-1 point penalty</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Complete cycle (gate click + return) = 1 point</span>
                  <span>⚡ 350ms window • Best Score saves locally</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-3 text-center flex flex-col justify-center h-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center">{icon}</div>
      <p className={`text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const bgColor = color === 'text-blue-500' ? 'bg-blue-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' : 'bg-purple-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}{unit}</span>
    </div>
  );
}