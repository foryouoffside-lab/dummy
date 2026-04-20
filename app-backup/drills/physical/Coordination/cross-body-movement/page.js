'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Move, Brain, TrendingUp, Trophy, Info, Timer, AlertCircle
} from 'lucide-react';

export default function LinearCrossBodyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
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
  const [connectionsCompleted, setConnectionsCompleted] = useState(0);
  const [penaltyCount, setPenaltyCount] = useState(0);
  
  // Game refs
  const nodeA = useRef({ x: 0, y: 0, active: true });
  const nodeB = useRef({ x: 0, y: 0, active: true });
  const mousePos = useRef({ x: 0, y: 0 });
  const isConnecting = useRef(false);
  const isPenalty = useRef(false);
  const animationId = useRef(null);
  const timerInterval = useRef(null);
  const audioCtx = useRef(null);
  const scoreValue = useRef(0);
  const streakValue = useRef(0);
  const penaltyValue = useRef(0);
  const connectionsValue = useRef(0);

  // Load best score
  useEffect(() => {
    const saved = localStorage.getItem('linearCrossBodyBestScore');
    if (saved) setBestScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            if (timerInterval.current) clearInterval(timerInterval.current);
            if (animationId.current) cancelAnimationFrame(animationId.current);
            const finalScore = Math.floor(scoreValue.current);
            const savedBest = parseInt(localStorage.getItem('linearCrossBodyBestScore') || '0', 10);
            if (finalScore > savedBest) {
              localStorage.setItem('linearCrossBodyBestScore', finalScore.toString());
              setBestScore(finalScore);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, [gameState]);

  // Spawn nodes on opposite sides
  const spawnNodes = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const padding = 100;
    const side = Math.random() > 0.5;
    
    nodeA.current = {
      x: side ? padding : canvas.width - padding,
      y: Math.random() * (canvas.height - 200) + 100,
      active: true
    };
    
    nodeB.current = {
      x: !side ? padding : canvas.width - padding,
      y: Math.random() * (canvas.height - 200) + 100,
      active: true
    };
    
    isConnecting.current = false;
  };

  // Distance from point to line segment
  const getDistToSegment = (px, py, x1, y1, x2, y2) => {
    const l2 = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
  };

  const playSound = (type) => {
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
      
      if (type === 'success') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'fail') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'connect') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.current.currentTime + 0.15);
      osc.stop(audioCtx.current.currentTime + 0.15);
    } catch (e) {}
  };

  const showFeedback = (message, type) => {
    setFeedback(message);
    setFeedbackType(type);
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  };

  // Update game logic
  const updateGame = () => {
    const mouse = mousePos.current;
    const distA = Math.hypot(mouse.x - nodeA.current.x, mouse.y - nodeA.current.y);
    const distB = Math.hypot(mouse.x - nodeB.current.x, mouse.y - nodeB.current.y);

    // Start connection at Node A
    if (distA < 15 && !isConnecting.current) {
      isConnecting.current = true;
      playSound('connect');
    }

    if (isConnecting.current) {
      // Check if cursor stays on the 10px straight-line vector
      const offPathDist = getDistToSegment(mouse.x, mouse.y, nodeA.current.x, nodeA.current.y, nodeB.current.x, nodeB.current.y);
      
      if (offPathDist > 6) { // Penalty threshold
        isConnecting.current = false;
        isPenalty.current = true;
        
        // Apply penalty
        streakValue.current = 0;
        const penaltyAmount = 20;
        scoreValue.current = Math.max(0, scoreValue.current - penaltyAmount);
        penaltyValue.current++;
        
        setScore(scoreValue.current);
        setStreak(0);
        setPenaltyCount(penaltyValue.current);
        
        playSound('fail');
        showFeedback(`✗ Off path! -${penaltyAmount}`, 'error');
        
        setTimeout(() => { 
          isPenalty.current = false; 
        }, 200);
      }

      // Complete connection at Node B
      if (distB < 15) {
        // Success!
        streakValue.current++;
        const pointsEarned = 50;
        scoreValue.current += pointsEarned;
        connectionsValue.current++;
        
        setScore(scoreValue.current);
        setStreak(streakValue.current);
        setConnectionsCompleted(connectionsValue.current);
        
        if (streakValue.current > bestStreak) {
          setBestStreak(streakValue.current);
        }
        
        playSound('success');
        showFeedback(`✓ Connection complete! +${pointsEarned}`, 'success');
        
        // Spawn new nodes
        spawnNodes();
        isConnecting.current = false;
      }
    }
  };

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
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation and drawing
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
      
      // Spawn initial nodes
      if (nodeA.current.x === 0) {
        spawnNodes();
      }
    };
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    resizeCanvas();
    
    const draw = () => {
      updateGame();
      
      const ctx = canvas.getContext('2d');
      
      // Background
      ctx.fillStyle = isPenalty.current ? "#1a0000" : (isBoxDarkMode ? "#020202" : "#f9fafb");
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Midline
      ctx.strokeStyle = isBoxDarkMode ? "#080808" : "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      
      // Target Nodes
      ctx.lineWidth = 2;
      
      // Node A
      ctx.beginPath();
      ctx.arc(nodeA.current.x, nodeA.current.y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = isConnecting.current ? "#00ff88" : (isBoxDarkMode ? "#FFF" : "#333");
      ctx.stroke();
      
      // Node B
      ctx.beginPath();
      ctx.arc(nodeB.current.x, nodeB.current.y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = isConnecting.current ? "#00ff88" : (isBoxDarkMode ? "#FFF" : "#333");
      ctx.stroke();
      
      // The Vector Path (connection line)
      ctx.beginPath();
      ctx.moveTo(nodeA.current.x, nodeA.current.y);
      ctx.lineTo(nodeB.current.x, nodeB.current.y);
      ctx.lineWidth = 10;
      ctx.strokeStyle = isConnecting.current 
        ? "rgba(0, 255, 136, 0.2)" 
        : (isBoxDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)");
      ctx.stroke();
      
      // Current drawing line
      if (isConnecting.current) {
        ctx.beginPath();
        ctx.moveTo(nodeA.current.x, nodeA.current.y);
        ctx.lineTo(mousePos.current.x, mousePos.current.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#00ff88";
        ctx.stroke();
      }
      
      // Cursor (crosshair)
      const mouse = mousePos.current;
      if (mouse.x > 0 && mouse.x < canvas.width && mouse.y > 0 && mouse.y < canvas.height) {
        ctx.strokeStyle = isPenalty.current ? "#ff0000" : "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 14, mouse.y); ctx.lineTo(mouse.x + 14, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 14); ctx.lineTo(mouse.x, mouse.y + 14);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = isPenalty.current ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 136, 0.3)";
        ctx.stroke();
      }
      
      animationId.current = requestAnimationFrame(draw);
    };
    
    animationId.current = requestAnimationFrame(draw);
    
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode]);

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

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setFeedback('');
    setConnectionsCompleted(0);
    setPenaltyCount(0);
    
    scoreValue.current = 0;
    streakValue.current = 0;
    penaltyValue.current = 0;
    connectionsValue.current = 0;
    isConnecting.current = false;
    isPenalty.current = false;
    
    setTimeout(() => {
      if (canvasRef.current) {
        spawnNodes();
      }
    }, 100);
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          <Link href="/drills/physical" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Physical Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <Move className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Linear Cross-Body Drill</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Connect the nodes along the vector path - 60 seconds</p>
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

        {/* Drill-specific stats board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Current Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time Left" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Move className="text-purple-600" />} value={connectionsCompleted} label="Connections" isDark={isDarkMode} />
          <StatCard icon={<AlertCircle className="text-red-500" />} value={penaltyCount} label="Penalties" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Canvas */}
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
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none', width: '100%', height: '100%' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Move className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Linear Cross-Body Drill</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Connect nodes along the vector</p>
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
              <div className={`rounded-2xl p-8 shadow-xl border w-[520px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Connections" value={connectionsCompleted} icon={<Move className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Total Penalties" value={penaltyCount} icon={<AlertCircle className="w-4 h-4" />} color="text-red-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/physical" className="flex-1">
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

        {/* Rules */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click and drag from the <span className="font-semibold text-cyan-500">first node</span> to the second node</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Stay within the <span className="font-semibold text-green-500">10px wide vector path</span> between nodes</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete the connection at the <span className="font-semibold text-orange-500">second node</span> to score</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success: <span className="font-semibold text-purple-500">+50 points</span> and streak increases</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Leaving the path: <span className="font-semibold text-red-500">-20 point penalty</span> and streak reset</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60 second timer - Complete as many connections as possible</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 White nodes = Connection points • Green path = Active connection</span>
                  <span>⚡ Stay on the vector line to avoid penalties</span>
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
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-red-500' ? 'bg-red-500/10' : 'bg-green-500/10';
  
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