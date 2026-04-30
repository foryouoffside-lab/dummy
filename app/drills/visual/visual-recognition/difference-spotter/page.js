'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, AlertCircle, Brain, X,
  BarChart3, Trophy, Info, CheckCircle2, Heart
} from 'lucide-react';

export default function DifferenceSpotterPage() {
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
  const [bestDetection, setBestDetection] = useState(0);
  const [totalDetections, setTotalDetections] = useState(0);
  const [lives, setLives] = useState(3);
  const [studyTime, setStudyTime] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const stateRef = useRef("IDLE");
  const objectsRef = useRef([]);
  const changedObjectIndexRef = useRef(-1);
  const originalObjectsRef = useRef([]);
  const startTimeRef = useRef(0);
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const studyTimeRef = useRef(5);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const timeoutRefs = useRef([]);
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const isActiveRef = useRef(false);
  const timeLeftRef = useRef(60);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('differenceSpotterBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
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

  // Update best score when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('differenceSpotterBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('differenceSpotterBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  // Timer for 60 seconds
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            isActiveRef.current = false;
            clearAllTimeouts();
            updateBestScore(scoreRef.current);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, timeLeft]);

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
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'penalty') {
        osc.frequency.value = 220;
        gain.gain.value = 0.15;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  };

  const spawnObjects = (width, height) => {
    const objects = [];
    for (let i = 0; i < 5; i++) {
      objects.push({
        x: 150 + Math.random() * (width - 300),
        y: 100 + Math.random() * (height - 200),
        size: 30,
        color: Math.random() > 0.5 ? "#FFFFFF" : "#AAAAAA"
      });
    }
    return objects;
  };

  const makeChange = (objects) => {
    const changedObjects = objects.map(obj => ({ ...obj }));
    const targetIndex = Math.floor(Math.random() * changedObjects.length);
    const target = changedObjects[targetIndex];
    
    if (Math.random() > 0.3) {
      target.x += (Math.random() > 0.5 ? 80 : -80);
      target.x = Math.max(50, Math.min(canvasRef.current.width - 50, target.x));
    } else {
      target.color = target.color === "#FFFFFF" ? "#FF3333" : "#FFFFFF";
    }
    
    return { changedObjects, changedIndex: targetIndex };
  };

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
  };

  const startCycle = () => {
    if (!isActiveRef.current) return;
    
    clearAllTimeouts();
    
    const cvs = canvasRef.current;
    if (!cvs) return;
    
    objectsRef.current = spawnObjects(cvs.width, cvs.height);
    originalObjectsRef.current = objectsRef.current.map(obj => ({ ...obj }));
    stateRef.current = "STUDY";
    
    const studyTimeout = setTimeout(() => {
      if (!isActiveRef.current) return;
      stateRef.current = "BLINK";
      
      const blinkTimeout = setTimeout(() => {
        if (!isActiveRef.current) return;
        const { changedObjects, changedIndex } = makeChange(objectsRef.current);
        objectsRef.current = changedObjects;
        changedObjectIndexRef.current = changedIndex;
        
        stateRef.current = "TEST";
        startTimeRef.current = performance.now();
        
        const failTimeout = setTimeout(() => {
          if (stateRef.current === "TEST" && isActiveRef.current) {
            fail("TIMEOUT");
          }
        }, 3000);
        timeoutRefs.current.push(failTimeout);
      }, 100);
      
      timeoutRefs.current.push(blinkTimeout);
    }, studyTimeRef.current * 1000);
    
    timeoutRefs.current.push(studyTimeout);
  };

  const fail = (reason) => {
    if (!isActiveRef.current) return;
    clearAllTimeouts();
    
    streakRef.current = 0;
    setStreak(0);
    
    // Check if we have lives left
    if (livesRef.current > 0) {
      // Use one life
      livesRef.current -= 1;
      setLives(livesRef.current);
      showFeedback(`✗ ${reason}! -1 life`, 'error');
      playSound('wrong');
      
      // If this was the last life, apply penalty
      if (livesRef.current === 0) {
        const penaltyPoints = 1;
        scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
        setScore(scoreRef.current);
        showFeedback(`⚠️ No lives left! -${penaltyPoints} point penalty!`, 'warning');
        playSound('penalty');
      }
    } else {
      // No lives left, apply penalty directly
      const penaltyPoints = 1;
      scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
      setScore(scoreRef.current);
      showFeedback(`✗ ${reason}! -${penaltyPoints} point penalty!`, 'error');
      playSound('penalty');
    }
    
    // Adjust study time (increase on mistake)
    studyTimeRef.current = Math.min(5, studyTimeRef.current + 0.3);
    setStudyTime(Math.round(studyTimeRef.current * 10) / 10);
    
    stateRef.current = "FEEDBACK";
    
    const nextTimeout = setTimeout(() => {
      if (isActiveRef.current && gameState === 'playing') startCycle();
    }, 600);
    timeoutRefs.current.push(nextTimeout);
  };

  const handleSuccess = (reactionTime) => {
    if (!isActiveRef.current) return;
    clearAllTimeouts();
    
    setTotalDetections(prev => prev + 1);
    setSuccessfulHits(prev => prev + 1);
    
    if (bestDetection === 0 || reactionTime < bestDetection) {
      setBestDetection(reactionTime);
    }
    
    const newStreak = streakRef.current + 1;
    streakRef.current = newStreak;
    setStreak(newStreak);
    
    if (newStreak > bestStreak) {
      setBestStreak(newStreak);
    }
    
    // Simplified scoring: 1 point per correct detection
    const pointsEarned = 1;
    
    scoreRef.current += pointsEarned;
    setScore(scoreRef.current);
    showFeedback(`✓ Found! ${reactionTime}ms | +${pointsEarned} point`, 'success');
    playSound('correct');
    
    if (newStreak % 5 === 0) {
      playSound('streak');
      showFeedback(`🔥 ${newStreak} Streak!`, 'success');
    }
    
    // Adjust study time based on reaction speed
    if (reactionTime < 800) {
      studyTimeRef.current = Math.max(2, studyTimeRef.current - 0.2);
    } else if (reactionTime > 1500) {
      studyTimeRef.current = Math.min(5, studyTimeRef.current + 0.1);
    }
    setStudyTime(Math.round(studyTimeRef.current * 10) / 10);
    
    stateRef.current = "FEEDBACK";
    
    const nextTimeout = setTimeout(() => {
      if (isActiveRef.current && gameState === 'playing') startCycle();
    }, 400);
    timeoutRefs.current.push(nextTimeout);
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (gameState !== 'playing' || !isActiveRef.current) return;
      
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width;
      const scaleY = cvs.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;
      
      if (stateRef.current === "TEST") {
        const reactionTime = Math.floor(performance.now() - startTimeRef.current);
        const changedObj = objectsRef.current[changedObjectIndexRef.current];
        
        if (changedObj) {
          const dist = Math.hypot(clickX - changedObj.x, clickY - changedObj.y);
          
          if (dist < changedObj.size + 10) {
            handleSuccess(reactionTime);
          } else {
            let clickedOnObject = false;
            for (let i = 0; i < objectsRef.current.length; i++) {
              if (i === changedObjectIndexRef.current) continue;
              const obj = objectsRef.current[i];
              const objDist = Math.hypot(clickX - obj.x, clickY - obj.y);
              if (objDist < obj.size + 10) {
                clickedOnObject = true;
                break;
              }
            }
            if (clickedOnObject) {
              fail("WRONG OBJECT");
            }
          }
        }
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [gameState]);

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

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      clearAllTimeouts();
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
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
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    function draw() {
      if (stateRef.current === "BLINK") {
        ctx.fillStyle = isBoxDarkMode ? "#1a1a1a" : "#d0d0d0";
      } else {
        ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      }
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }

      if (stateRef.current === "STUDY" || stateRef.current === "TEST") {
        objectsRef.current.forEach((obj) => {
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
          ctx.fillStyle = obj.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = obj.color === "#FFFFFF" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });
      }

      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x - 12, m.y); ctx.lineTo(m.x + 12, m.y);
        ctx.moveTo(m.x, m.y - 12); ctx.lineTo(m.x, m.y + 12);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.stroke();
      }

      const cx = cvs.width / 2;
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      
      if (stateRef.current === "STUDY") {
        ctx.fillStyle = isBoxDarkMode ? "#888" : "#666";
        ctx.fillText(`🔍 MEMORIZE - ${studyTimeRef.current.toFixed(1)}s`, cx, 35);
      } else if (stateRef.current === "BLINK") {
        ctx.fillStyle = isBoxDarkMode ? "#aaa" : "#888";
        ctx.fillText("⚡ BLINK...", cx, 35);
      } else if (stateRef.current === "TEST") {
        ctx.fillStyle = "#00ff88";
        ctx.fillText("❓ CLICK THE CHANGED OBJECT!", cx, 35);
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
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setBestDetection(0);
    setTotalDetections(0);
    setLives(3);
    setStudyTime(5);
    setSuccessfulHits(0);
    setFeedback('');
    setTimeLeft(60);
    timeLeftRef.current = 60;
    
    isActiveRef.current = true;
    stateRef.current = "IDLE";
    streakRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = 3; // Start with 3 lives, no regeneration
    studyTimeRef.current = 5;
    
    clearAllTimeouts();
    
    setTimeout(() => startCycle(), 100);
  };

  const resetGame = () => {
    isActiveRef.current = false;
    clearAllTimeouts();
    setGameState('start');
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setBestDetection(0);
    setTotalDetections(0);
    setLives(3);
    setStudyTime(5);
    setSuccessfulHits(0);
    setFeedback('');
    setTimeLeft(60);
  };

  const getAccuracy = () => {
    const total = successfulHits + (3 - lives);
    return total === 0 ? 100 : Math.round((successfulHits / total) * 100);
  };

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/visual" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Visual Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Difference Spotter</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Spot the change • 60 second challenge</p>
              </div>
            </div>
            <div className="flex gap-2">
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
          <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<Clock className="text-cyan-600" />} value={bestDetection || '-'} label="Best RT" unit="ms" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Acc" unit="%" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#020202" : "#ffffff",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
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

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen - Clean without rules */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Eye className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Difference Spotter</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Spot the change</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Successful Hits" value={successfulHits} icon={<CheckCircle2 className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Best Detection" value={bestDetection || '-'} unit="ms" icon={<Clock className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Final Study Time" value={`${studyTime}s`} icon={<Timer className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Lives Lost" value={3 - lives} icon={<Heart className="w-4 h-4" />} color="text-red-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/visual" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Section - Below game container */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Study <span className="font-semibold text-purple-500">5 objects</span> for 5 seconds</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-green-500">+1 point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong object/Timeout: <span className="font-semibold text-red-500">-1 life</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Study time <span className="font-semibold text-blue-500">adapts (5s → 2s)</span> based on speed</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5x Streak: <span className="font-semibold text-orange-500">bonus notification</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">No lives left = -1 point penalty</span> • Lives do NOT regenerate</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Fast detection = faster study time reduction</span>
                  <span>⚡ 60 second challenge • Lives do NOT regenerate</span>
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

function ResultCard({ label, value, unit = '', icon, color }) {
  const bgColor = color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' : 'bg-blue-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}{unit}</span>
    </div>
  );
}