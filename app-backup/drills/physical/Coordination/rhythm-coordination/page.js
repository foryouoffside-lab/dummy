'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Music
} from 'lucide-react';

export default function RhythmCoordinationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bpm, setBpm] = useState(60);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bpmRef = useRef(60);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastBeatRef = useRef(performance.now());
  const lastTempoShiftRef = useRef(performance.now());
  const feedbackColorRef = useRef("#111");
  const feedbackTimerRef = useRef(0);
  const startTimeRef = useRef(0);

  const cleanButtonClass = "outline-none focus:outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus:ring-transparent select-none active:outline-none shadow-none";

  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    } else if (status === 'loading') {
      setLoading(true);
    }
  }, [status, router]);

  // Toggle fullscreen
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

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'hit') {
      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.1;
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'miss') {
      oscillator.frequency.value = 440;
      gainNode.gain.value = 0.1;
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.15);
      oscillator.stop(audioContext.currentTime + 0.15);
    } else if (type === 'tempo') {
      oscillator.frequency.value = 660;
      gainNode.gain.value = 0.08;
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.12);
      oscillator.stop(audioContext.currentTime + 0.12);
    }
  };

  // Track mouse position
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
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle mouse clicks for rhythm synchronization
  useEffect(() => {
    const handleMouseDown = () => {
      if (gameState !== 'playing') return;
      
      const now = performance.now();
      const interval = 60000 / bpmRef.current;
      const timeInCycle = (now - lastBeatRef.current) % interval;
      const error = Math.min(timeInCycle, interval - timeInCycle);
      
      if (error < 60) { // 60ms Elite Threshold
        scoreRef.current += 100;
        streakRef.current++;
        setScore(scoreRef.current);
        setStreak(streakRef.current);
        
        if (streakRef.current > bestStreak) {
          setBestStreak(streakRef.current);
        }
        
        feedbackColorRef.current = "#FFF";
        playSound('hit');
      } else {
        scoreRef.current = Math.max(0, scoreRef.current - 50);
        streakRef.current = 0;
        setScore(scoreRef.current);
        setStreak(0);
        feedbackColorRef.current = "#FF3E3E";
        playSound('miss');
      }
      feedbackTimerRef.current = 0.2;
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [gameState, bestStreak]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const cvs = canvasRef.current;
    if (!cvs) return;

    const ctx = cvs.getContext('2d', { alpha: false, desynchronized: true });

    // Get the 16:9 container dimensions
    const updateCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      
      let width = containerWidth;
      let height = width * (9 / 16);
      
      if (height > containerHeight) {
        height = containerHeight;
        width = height * (16 / 9);
      }
      
      cvs.width = width;
      cvs.height = height;
      
      cvs.style.position = 'absolute';
      cvs.style.left = `${(containerWidth - width) / 2}px`;
      cvs.style.top = `${(containerHeight - height) / 2}px`;
    };

    const resizeObserver = new ResizeObserver(() => updateCanvasSize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    startTimeRef.current = Date.now();
    let lastFrameTime = performance.now();

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      
      const interval = 60000 / bpmRef.current;
      
      // Tempo shift every ~10 beats
      if (now - lastTempoShiftRef.current > interval * 10) {
        const newBpm = 50 + Math.random() * 80;
        bpmRef.current = newBpm;
        setBpm(Math.floor(newBpm));
        lastTempoShiftRef.current = now;
        lastBeatRef.current = now;
        playSound('tempo');
      }
      
      // Background
      ctx.fillStyle = isDarkMode ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      const targetR = isFullscreen ? 160 : 120;
      
      // Outer ring - feedback color (exactly like HTML)
      ctx.beginPath();
      ctx.arc(cx, cy, targetR, 0, Math.PI * 2);
      ctx.strokeStyle = feedbackTimerRef.current > 0 ? feedbackColorRef.current : (isDarkMode ? "#151515" : "#e0e0e0");
      ctx.lineWidth = feedbackTimerRef.current > 0 ? (isFullscreen ? 4 : 3) : (isFullscreen ? 2 : 1);
      ctx.stroke();
      
      if (feedbackTimerRef.current > 0) {
        feedbackTimerRef.current -= dt;
      }
      
      // Pulse ring - exactly like HTML: progress ring that expands
      const progress = ((now - lastBeatRef.current) % interval) / interval;
      const pulseR = targetR * progress;
      
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      const isNearBeat = progress > 0.88;
      ctx.strokeStyle = isNearBeat ? (isDarkMode ? "#FFF" : "#000") : (isDarkMode ? "#222" : "#ccc");
      ctx.lineWidth = isNearBeat ? (isFullscreen ? 3 : 2) : (isFullscreen ? 2 : 1);
      ctx.stroke();
      
      // HUD - exactly like HTML
      ctx.fillStyle = isDarkMode ? "#1a1a1a" : "#e0e0e0";
      ctx.textAlign = "center";
      ctx.font = `${isFullscreen ? '14px' : '12px'} monospace`;
      ctx.fillText(`TEMPO: ${Math.floor(bpmRef.current)} BPM | SYNC: ${Math.floor(scoreRef.current)}`, cx, cvs.height - (isFullscreen ? 50 : 40));
      
      // Time elapsed
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setTotalTime(Math.floor(elapsed));
      
      // Crosshair - exactly like HTML
      const mouse = mousePositionRef.current;
      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        const crossSize = isFullscreen ? 16 : 12;
        ctx.strokeStyle = isDarkMode ? "#555" : "#ccc";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(mouse.x - crossSize, mouse.y);
        ctx.lineTo(mouse.x + crossSize, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - crossSize);
        ctx.lineTo(mouse.x, mouse.y + crossSize);
        ctx.stroke();
      }
      
      // Update last beat reference for timing
      if (progress < 0.05) {
        lastBeatRef.current = now;
      }
      
      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  }, [gameState, isDarkMode, isFullscreen]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setBpm(60);
    setStreak(0);
    setBestStreak(0);
    setTotalTime(0);
    
    // Reset refs
    scoreRef.current = 0;
    streakRef.current = 0;
    bpmRef.current = 60;
    startTimeRef.current = Date.now();
    lastBeatRef.current = performance.now();
    lastTempoShiftRef.current = performance.now();
    feedbackTimerRef.current = 0;
  };

  // Show loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/cognitive" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 outline-none">
            <ArrowLeft className="w-4 h-4" />
            Back to Cognitive Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Attenix | Rhythm Coordination Elite</h1>
                <p className="text-gray-500">Auditory-motor synchronization & timing precision</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 bg-white rounded-lg hover:bg-gray-100 transition text-gray-700 shadow-sm border border-gray-200 ${cleanButtonClass}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 bg-white rounded-lg hover:bg-gray-100 transition text-gray-700 shadow-sm border border-gray-200 ${cleanButtonClass}`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 bg-white rounded-lg hover:bg-gray-100 transition text-gray-700 shadow-sm border border-gray-200 ${cleanButtonClass}`}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
            <Target className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{score}</p>
            <p className="text-xs text-gray-500">Sync Score</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
            <Zap className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-orange-600">{bpm}</p>
            <p className="text-xs text-gray-500">BPM</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
            <Award className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-yellow-600">{bestStreak}</p>
            <p className="text-xs text-gray-500">Best Streak</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`mx-auto hover:opacity-70 transition ${cleanButtonClass}`}>
              {soundEnabled ? <Volume2 className="w-5 h-5 text-gray-600" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
            </button>
            <p className="text-xs text-gray-500 mt-1">Sound</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
            <button onClick={toggleFullscreen} className={`mx-auto hover:opacity-70 transition ${cleanButtonClass}`}>
              <Maximize2 className="w-5 h-5 text-gray-600" />
            </button>
            <p className="text-xs text-gray-500 mt-1">Fullscreen</p>
          </div>
        </div>

        {/* Game Container - No border */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
          style={{ 
            background: isDarkMode ? '#000000' : '#ffffff',
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-20 flex gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white ${cleanButtonClass}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white ${cleanButtonClass}`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 bg-black/50 rounded-lg hover:bg-black/70 transition text-white ${cleanButtonClass}`}
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          )}

          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
              <div className="flex gap-4">
                <span>Score: <span className="text-yellow-400 font-bold">{score}</span></span>
                <span>BPM: <span className="text-orange-400 font-bold">{bpm}</span></span>
                <span>Streak: <span className="text-green-400 font-bold">{streak}</span></span>
              </div>
            </div>
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
            <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl z-10">
              <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4 border border-gray-200 shadow-xl">
                <Music className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Rhythm Coordination Elite</h3>
                <p className="text-gray-600 mb-4">Auditory-motor synchronization & timing precision</p>
                <div className="text-left text-sm text-gray-600 mb-6 space-y-2">
                  <p>🎵 <span className="font-semibold">Follow the rhythm</span> - Expanding ring indicates beat timing</p>
                  <p>🖱️ <span className="font-semibold">Click on the beat</span> - Synchronize with the visual pulse</p>
                  <p>⚡ <span className="font-semibold">60ms elite threshold</span> - Perfect timing = +100 points</p>
                  <p>🔄 <span className="font-semibold">Dynamic tempo changes</span> - BPM shifts every ~10 beats (50-130 BPM)</p>
                  <p>📊 <span className="font-semibold">Scoring</span> - +100 for perfect hit, -50 for miss</p>
                  <p>🏆 <span className="font-semibold">Streak system</span> - Consecutive perfect hits build streak</p>
                </div>
                <button
                  onClick={startGame}
                  className={`px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 w-full ${cleanButtonClass}`}
                >
                  Begin Rhythm Training
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl z-10">
              <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4 border border-gray-200 shadow-xl">
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Session Complete!</h3>
                <div className="space-y-2 mb-6 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sync Score:</span>
                    <span className="font-bold text-yellow-600">{score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Streak:</span>
                    <span className="font-bold text-orange-600">{bestStreak}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training Duration:</span>
                    <span className="font-bold text-blue-600">{totalTime} seconds</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className={`flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition ${cleanButtonClass}`}
                  >
                    Train Again
                  </button>
                  <Link
                    href="/drills/cognitive"
                    className={`flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition text-center ${cleanButtonClass}`}
                  >
                    Back
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}