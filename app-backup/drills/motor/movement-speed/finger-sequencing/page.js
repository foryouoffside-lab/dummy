'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, GitBranch
} from 'lucide-react';

export default function FractalLinkPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
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
  const [missedSequences, setMissedSequences] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [accuracy, setAccuracy] = useState(100);
  const [sequencesCompleted, setSequencesCompleted] = useState(0);
  const [sequenceTimer, setSequenceTimer] = useState(2.0);
  
  const chainRef = useRef([]);
  const activeIndexRef = useRef(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const totalSequencesRef = useRef(0);
  const successfulSequencesRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const sequenceTimerRef = useRef(2.0);
  const maxSequenceTimeRef = useRef(2.0);
  const sequenceActiveRef = useRef(true);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const missedCountRef = useRef(0);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('fractalLinkBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

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

  // Calculate accuracy
  useEffect(() => {
    if (totalSequencesRef.current > 0) {
      const acc = (successfulSequencesRef.current / totalSequencesRef.current) * 100;
      setAccuracy(Math.round(acc));
    } else {
      setAccuracy(100);
    }
  }, [sequencesCompleted, missedSequences]);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('fractalLinkBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('fractalLinkBestScore', finalScore.toString());
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
    }, 400);
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
      
      if (type === 'hit') {
        osc.frequency.value = 1200;
        gain.gain.value = 0.08;
      } else if (type === 'complete') {
        osc.frequency.value = 1500;
        gain.gain.value = 0.1;
      } else if (type === 'miss') {
        osc.frequency.value = 300;
        gain.gain.value = 0.1;
      } else if (type === 'timeout') {
        osc.frequency.value = 200;
        gain.gain.value = 0.12;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
      osc.stop(audioCtx.currentTime + 0.1);
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

  const addMissedSequence = () => {
    if (!isActiveRef.current) return;
    
    totalSequencesRef.current++;
    missedCountRef.current++;
    setMissedSequences(missedCountRef.current);
    
    playSound('timeout');
    showFeedback('⏱️ Timeout!', 'error');
    
    streakRef.current = 0;
    setStreak(0);
    
    // Check if 5 missed sequences - reset score
    if (missedCountRef.current >= 5) {
      setScore(0);
      scoreRef.current = 0;
      missedCountRef.current = 0;
      setMissedSequences(0);
      showFeedback('⚠️ Score reset! 5 misses!', 'warning');
    }
    
    if (canvasRef.current) {
      generateChain(canvasRef.current);
    }
  };

  const generateChain = (cvs) => {
    if (!cvs || !isActiveRef.current) return;
    
    const chain = [];
    const baseX = 200 + Math.random() * (cvs.width - 400);
    const baseY = 150 + Math.random() * (cvs.height - 300);

    // Create 3 nodes in sequence with visual size cues
    for (let i = 0; i < 3; i++) {
      chain.push({
        x: baseX + (Math.random() - 0.5) * 200,
        y: baseY + (Math.random() - 0.5) * 200,
        r: 22 - (i * 4), // Bigger size difference for visual order
        opacity: 1.0 - (i * 0.2)
      });
    }
    
    chainRef.current = chain;
    activeIndexRef.current = 0;
    sequenceTimerRef.current = maxSequenceTimeRef.current;
    setSequenceTimer(maxSequenceTimeRef.current);
    sequenceActiveRef.current = true;
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

  useEffect(() => {
    const handleMouseDown = () => {
      if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      if (!sequenceActiveRef.current) return;
      
      const mouse = mousePositionRef.current;
      const chain = chainRef.current;
      const activeIndex = activeIndexRef.current;
      
      const target = chain[activeIndex];
      if (!target) return;
      
      const dist = Math.sqrt((mouse.x - target.x) ** 2 + (mouse.y - target.y) ** 2);

      if (dist < target.r + 10) {
        // Correct click
        playSound('hit');
        
        activeIndexRef.current++;
        
        if (activeIndexRef.current >= chain.length) {
          // Sequence complete!
          totalSequencesRef.current++;
          successfulSequencesRef.current++;
          setSequencesCompleted(prev => prev + 1);
          
          // Fast click scoring - more points for faster completion
          const timeRemaining = sequenceTimerRef.current;
          const speedBonus = Math.floor(timeRemaining * 10);
          const pointsEarned = 5 + speedBonus;
          
          scoreRef.current += pointsEarned;
          setScore(scoreRef.current);
          
          const newStreak = streakRef.current + 1;
          streakRef.current = newStreak;
          setStreak(newStreak);
          
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
          }
          
          // Reset missed counter on success
          missedCountRef.current = 0;
          setMissedSequences(0);
          
          playSound('complete');
          showFeedback(`✓ +${pointsEarned} (${(2.0 - timeRemaining).toFixed(2)}s)`, 'success');
          
          if (canvasRef.current) {
            generateChain(canvasRef.current);
          }
        }
      } else {
        // Clicked wrong spot
        playSound('miss');
        showFeedback('✗ Miss!', 'error');
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [bestStreak]);

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
      generateChain(cvs);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let lastFrameTime = performance.now();

    function update(dt) {
      if (sequenceActiveRef.current && isActiveRef.current) {
        sequenceTimerRef.current -= dt;
        setSequenceTimer(Math.max(0, sequenceTimerRef.current));
        
        if (sequenceTimerRef.current <= 0) {
          sequenceActiveRef.current = false;
          addMissedSequence();
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
      
      // Draw timer ring
      const timerPercent = sequenceTimerRef.current / maxSequenceTimeRef.current;
      ctx.beginPath();
      ctx.arc(cvs.width - 40, 40, 25, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * timerPercent));
      ctx.strokeStyle = timerPercent > 0.3 ? "#00ff88" : "#ff4444";
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Show timer text
      ctx.fillStyle = timerPercent > 0.3 ? "#00ff88" : "#ff4444";
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sequenceTimerRef.current.toFixed(1) + "s", cvs.width - 40, 40);
      
      const chain = chainRef.current;
      const activeIndex = activeIndexRef.current;
      
      // Draw Links between nodes with direction indicator
      ctx.beginPath();
      ctx.strokeStyle = isBoxDarkMode ? "rgba(80, 80, 80, 0.4)" : "rgba(0, 0, 0, 0.15)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      for (let i = 0; i < chain.length - 1; i++) {
        // Draw arrow direction
        const from = chain[i];
        const to = chain[i + 1];
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Nodes - without numbers
      chain.forEach((node, i) => {
        if (i < activeIndex) return; // Hide completed nodes
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        
        if (i === activeIndex) {
          // Active node - pulsing effect
          const pulse = Math.sin(now * 0.01) * 2;
          ctx.strokeStyle = "#00ff88";
          ctx.lineWidth = 4;
          ctx.stroke();
          
          ctx.fillStyle = "rgba(0, 255, 136, 0.15)";
          ctx.fill();
          
          // Draw pulsing ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r + 5 + pulse, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(0, 255, 136, 0.4)";
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Inner dot for active node
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#00ff88";
          ctx.fill();
        } else {
          // Future nodes - gradient based on order
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r);
          if (isBoxDarkMode) {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${node.opacity * 0.3})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${node.opacity * 0.1})`);
          } else {
            gradient.addColorStop(0, `rgba(0, 0, 0, ${node.opacity * 0.2})`);
            gradient.addColorStop(1, `rgba(0, 0, 0, ${node.opacity * 0.05})`);
          }
          ctx.fillStyle = gradient;
          ctx.fill();
          
          ctx.strokeStyle = isBoxDarkMode ? `rgba(255, 255, 255, ${node.opacity})` : `rgba(0, 0, 0, ${node.opacity})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }
      });

      // Crosshair
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.beginPath();
        ctx.arc(m.x, m.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff88";
        ctx.fill();
        
        ctx.strokeStyle = "rgba(0, 255, 136, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x - 18, m.y); ctx.lineTo(m.x + 18, m.y);
        ctx.moveTo(m.x, m.y - 18); ctx.lineTo(m.x, m.y + 18);
        ctx.stroke();
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
    setMissedSequences(0);
    setFeedback('');
    setAccuracy(100);
    setSequencesCompleted(0);
    setSequenceTimer(2.0);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    totalSequencesRef.current = 0;
    successfulSequencesRef.current = 0;
    missedCountRef.current = 0;
    
    if (canvasRef.current) {
      generateChain(canvasRef.current);
    }
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setMissedSequences(0);
    setFeedback('');
    setAccuracy(100);
    setSequencesCompleted(0);
    setSequenceTimer(2.0);
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (status === 'unauthenticated') return null;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/motor" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Motor Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Fractal Link</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click sequence by size - 2 sec per chain</p>
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
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-amber-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-red-500" />} value={`${missedSequences}/5`} label="Misses" isDark={isDarkMode} />
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

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <GitBranch className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Fractal Link</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click largest to smallest • 2 sec per chain</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Chains Done" value={sequencesCompleted} icon={<GitBranch className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Misses" value={missedSequences} icon={<Activity className="w-4 h-4" />} color="text-red-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/motor" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click nodes from <span className="font-semibold text-emerald-500">largest to smallest</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Each chain has <span className="font-semibold text-red-500">2 seconds</span> to complete</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Base score: <span className="font-semibold text-orange-500">5 points</span> per chain</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Faster clicks = <span className="font-semibold text-blue-500">speed bonus</span> (up to +20)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-purple-500">60 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">5 misses reset score</span> to 0</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Active node has pulsing green ring • Follow dashed lines</span>
                  <span>🏆 Best Score saves locally</span>
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
                   color === 'text-red-500' ? 'bg-red-500/10' : 'bg-blue-500/10';
  
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