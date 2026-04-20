'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Maximize2, Minimize2, Sun, Moon, 
  Eye, Volume2, VolumeX, Info, Activity, Target, Shield, Clock, Zap, Award, Trophy
} from 'lucide-react';

export default function HighVisibilityStressPage() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [anchorSize, setAnchorSize] = useState(22);
  const [bestAnchorSize, setBestAnchorSize] = useState(22);
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);
  const [isHighIntensity, setIsHighIntensity] = useState(false);
  const [pulseTimer, setPulseTimer] = useState(0);
  const [nodesActivated, setNodesActivated] = useState(0);
  const [highIntensityNodes, setHighIntensityNodes] = useState(0);
  const [survivalTime, setSurvivalTime] = useState(0);
  
  // Original game variables
  const gameStateRef = useRef({
    anchorSize: 22,
    nodes: [],
    ghosts: [],
    activeNode: -1,
    isHighIntensity: false,
    timer: 0,
    mousePosition: { x: 0, y: 0 },
    lastTime: performance.now(),
    isGameActive: false,
    nodesActivatedCount: 0,
    highIntensityCount: 0,
    survivalSeconds: 0
  });

  const survivalIntervalRef = useRef(null);

  // Load best anchor size from localStorage
  useEffect(() => {
    const savedBest = localStorage.getItem('highVisibilityStressBestAnchor');
    if (savedBest) {
      setBestAnchorSize(parseFloat(savedBest));
    }
  }, []);

  // Check authentication
  useEffect(() => {
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

  const initGame = useCallback((canvas) => {
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    canvas.width = containerRect.width;
    canvas.height = containerRect.height;
    
    const state = gameStateRef.current;
    state.nodes = [];
    for(let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      state.nodes.push({ x: Math.cos(angle) * 260, y: Math.sin(angle) * 260 });
    }
    
    state.ghosts = [];
    for(let i = 0; i < 5; i++) {
      state.ghosts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        r: 10 + Math.random() * 20
      });
    }
    
    state.anchorSize = 22;
    state.nodesActivatedCount = 0;
    state.highIntensityCount = 0;
    state.survivalSeconds = 0;
    
    setAnchorSize(22);
    setNodesActivated(0);
    setHighIntensityNodes(0);
    setSurvivalTime(0);
  }, []);

  const triggerPulse = useCallback(() => {
    const state = gameStateRef.current;
    if (!state.nodes.length) return;
    
    state.activeNode = Math.floor(Math.random() * state.nodes.length);
    state.isHighIntensity = Math.random() > 0.70;
    state.timer = 0.35 + Math.random() * 0.45;
    state.nodesActivatedCount++;
    
    setActiveNodeIndex(state.activeNode);
    setIsHighIntensity(state.isHighIntensity);
    setPulseTimer(state.timer);
    setNodesActivated(state.nodesActivatedCount);
    
    if (state.isHighIntensity) {
      state.highIntensityCount++;
      setHighIntensityNodes(state.highIntensityCount);
    }
  }, []);

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false, desynchronized: true });

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
    initGame(cvs);
    triggerPulse();

    // Survival timer
    survivalIntervalRef.current = setInterval(() => {
      if (gameStateRef.current.isGameActive) {
        gameStateRef.current.survivalSeconds++;
        setSurvivalTime(gameStateRef.current.survivalSeconds);
      }
    }, 1000);

    function update(dt) {
      const state = gameStateRef.current;
      if (!state.isGameActive) return;
      
      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      const distToCenter = Math.sqrt((state.mousePosition.x - cx)**2 + (state.mousePosition.y - cy)**2);

      state.ghosts.forEach(g => {
        g.x += g.vx; g.y += g.vy;
        if (g.x < 0 || g.x > cvs.width) g.vx *= -1;
        if (g.y < 0 || g.y > cvs.height) g.vy *= -1;
      });

      state.timer -= dt;
      
      if (state.timer <= 0) {
        if (state.isHighIntensity) {
          state.anchorSize = Math.max(5, state.anchorSize - 2);
        }
        triggerPulse();
      }

      if (state.isHighIntensity && state.activeNode !== -1) {
        const nodeX = cx + state.nodes[state.activeNode]?.x || 0;
        const nodeY = cy + state.nodes[state.activeNode]?.y || 0;
        if (Math.sqrt((state.mousePosition.x - nodeX)**2 + (state.mousePosition.y - nodeY)**2) < 50) {
          state.anchorSize = Math.min(35, state.anchorSize + 1.2);
          state.isHighIntensity = false;
          setIsHighIntensity(false);
        }
      } else if (!state.isHighIntensity && distToCenter > state.anchorSize + 15) {
        state.anchorSize = Math.max(5, state.anchorSize - 2.5);
      }
      
      setAnchorSize(Math.round(state.anchorSize * 10) / 10);
      
      if (state.anchorSize > bestAnchorSize) {
        setBestAnchorSize(Math.round(state.anchorSize * 10) / 10);
        localStorage.setItem('highVisibilityStressBestAnchor', state.anchorSize.toString());
      }
    }

    function draw() {
      const state = gameStateRef.current;
      const now = performance.now();
      const dt = (now - state.lastTime) / 1000;
      state.lastTime = now;
      
      if (state.isGameActive) {
        update(dt);
      }

      // Base background - uses current isBoxDarkMode value directly from state
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Procedural Static Grain
      for (let i = 0; i < 500; i++) {
        ctx.fillStyle = isBoxDarkMode 
          ? `rgba(255, 255, 255, ${Math.random() * 0.03})`
          : `rgba(0, 0, 0, ${Math.random() * 0.03})`;
        ctx.fillRect(Math.random() * cvs.width, Math.random() * cvs.height, 1, 1);
      }

      const cx = cvs.width / 2;
      const cy = cvs.height / 2;

      // Visible Phantom Orbits
      state.ghosts.forEach(g => {
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.fillStyle = isBoxDarkMode 
          ? "rgba(0, 255, 0, 0.08)" 
          : "rgba(0, 150, 0, 0.05)";
        ctx.fill();
      });

      // Peripheral Nodes
      state.nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(cx + n.x, cy + n.y, 8, 0, Math.PI * 2);
        if (i === state.activeNode) {
          ctx.fillStyle = state.isHighIntensity 
            ? (isBoxDarkMode ? "#FFF" : "#000") 
            : (isBoxDarkMode ? "#222" : "#ccc");
        } else {
          ctx.fillStyle = isBoxDarkMode ? "#0D0D0D" : "#e5e7eb";
        }
        ctx.fill();
      });

      // Central Anchor
      ctx.beginPath();
      ctx.arc(cx, cy, state.anchorSize, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "#FFF" : "#000";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Neural Ball (Cursor)
      ctx.beginPath();
      ctx.arc(state.mousePosition.x, state.mousePosition.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = isBoxDarkMode ? "#FFF" : "#000";
      ctx.fill();

      animationRef.current = requestAnimationFrame(draw);
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = cvs.getBoundingClientRect();
      gameStateRef.current.mousePosition.x = e.clientX - rect.left;
      gameStateRef.current.mousePosition.y = e.clientY - rect.top;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
      if (survivalIntervalRef.current) clearInterval(survivalIntervalRef.current);
    };
  }, [gameState, isBoxDarkMode, initGame, triggerPulse, bestAnchorSize]);

  const startGame = () => {
    setGameState('playing');
    const state = gameStateRef.current;
    state.isGameActive = true;
    state.survivalSeconds = 0;
    state.lastTime = performance.now();
  };

  const resetGame = () => {
    gameStateRef.current.isGameActive = false;
    setGameState('start');
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (survivalIntervalRef.current) {
      clearInterval(survivalIntervalRef.current);
      survivalIntervalRef.current = null;
    }
    
    // Reset state
    const state = gameStateRef.current;
    state.anchorSize = 22;
    state.nodes = [];
    state.ghosts = [];
    state.activeNode = -1;
    state.isHighIntensity = false;
    state.timer = 0;
    state.nodesActivatedCount = 0;
    state.highIntensityCount = 0;
    state.survivalSeconds = 0;
    
    setAnchorSize(22);
    setActiveNodeIndex(-1);
    setIsHighIntensity(false);
    setPulseTimer(0);
    setNodesActivated(0);
    setHighIntensityNodes(0);
    setSurvivalTime(0);
  };

  // Loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

    return null;
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/productivity" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Productivity Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>High Visibility Stress</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track nodes • Maintain anchor • Endless survival</p>
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
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={anchorSize} label="Anchor Size" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestAnchorSize} label="Best Anchor" isDark={isDarkMode} />
          <StatCard icon={<Shield className={isHighIntensity ? 'text-red-500' : 'text-green-600'} />} value={isHighIntensity ? 'HIGH' : 'Normal'} label="Intensity" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={highIntensityNodes} label="High Nodes" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-purple-600" />} value={nodesActivated} label="Total Nodes" isDark={isDarkMode} />
          <StatCard icon={<Clock className="text-cyan-600" />} value={survivalTime} label="Survival" unit="s" isDark={isDarkMode} />
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
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">
                  <Eye className="w-5 h-5" />
                </button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
                Anchor: <span className="text-green-400">{anchorSize}</span> | 
                Intensity: <span className={isHighIntensity ? 'text-red-400' : 'text-green-400'}>{isHighIntensity ? 'HIGH' : 'Normal'}</span> | 
                Time: <span className="text-blue-400">{survivalTime}s</span>
              </div>
            </>
          )}

          <canvas
            ref={canvasRef}
            style={{ 
              display: 'block',
              position: 'absolute',
              cursor: 'none',
              width: '100%',
              height: '100%'
            }}
          />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Activity className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>High Visibility Stress</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Endless survival • Track nodes • Build anchor</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Anchor" value={anchorSize} icon={<Target className="w-4 h-4" />} color="text-blue-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Anchor" value={bestAnchorSize} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Survival Time" value={survivalTime} unit="s" icon={<Clock className="w-4 h-4" />} color="text-cyan-500" isDark={isBoxDarkMode} />
                  <ResultCard label="High Nodes" value={highIntensityNodes} icon={<Zap className="w-4 h-4" />} color="text-orange-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Total Nodes" value={nodesActivated} icon={<Activity className="w-4 h-4" />} color="text-purple-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Peak Intensity" value={highIntensityNodes > 0 ? 'Reached' : 'None'} icon={<Shield className="w-4 h-4" />} color="text-red-500" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={resetGame} 
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Keep your cursor <span className="font-semibold text-green-500">inside the central anchor</span> to maintain size
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        When nodes turn <span className="font-semibold text-red-500">bright white (HIGH intensity)</span>, move to them quickly
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Missing high intensity nodes causes <span className="font-semibold text-orange-500">anchor shrinkage (-2)</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Hitting high intensity nodes <span className="font-semibold text-blue-500">increases anchor size (+1.2)</span> up to max 35
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Staying outside anchor causes <span className="font-semibold text-purple-500">continuous decay (-2.5/sec)</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Green phantoms are <span className="font-semibold text-gray-400">visual noise</span> - ignore them completely
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Nodes pulse every 0.35-0.80 seconds • 70% normal / 30% high intensity</span>
                  <span>⚡ Best Anchor saves locally • Endless survival mode</span>
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
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
                   'bg-red-500/10';
  
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