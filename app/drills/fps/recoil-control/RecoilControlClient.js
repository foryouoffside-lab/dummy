'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { 
  Crosshair, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Lock, AlertCircle, RefreshCw,
  Home, ChevronRight, Calculator, Sparkles, Cpu, Award, Play
} from 'lucide-react';

const WEAPON_PROFILES = {
  ak47: {
    name: "AK-47 (CS2 Style S-Curve)",
    magazine: 30,
    fireRate: 100, // 100ms per shot (600 RPM)
    recoilScale: 1.6,
    pattern: [
      {x: 0, y: 0}, {x: 0, y: -10}, {x: 1, y: -22}, {x: -1, y: -34}, {x: -3, y: -45},
      {x: -5, y: -55}, {x: -4, y: -63}, {x: -1, y: -69}, {x: 3, y: -73}, {x: 8, y: -76},
      {x: 12, y: -77}, {x: 15, y: -77}, {x: 16, y: -77}, {x: 13, y: -77}, {x: 8, y: -77},
      {x: 1, y: -77}, {x: -6, y: -77}, {x: -12, y: -77}, {x: -17, y: -77}, {x: -21, y: -77},
      {x: -23, y: -77}, {x: -21, y: -77}, {x: -16, y: -77}, {x: -10, y: -77}, {x: -2, y: -77},
      {x: 6, y: -77}, {x: 12, y: -77}, {x: 17, y: -77}, {x: 20, y: -77}, {x: 18, y: -77}
    ],
    inaccuracy: 1.5 // base bloom radius
  },
  vandal: {
    name: "Vandal (Valorant Style T-Sweep)",
    magazine: 25,
    fireRate: 105, // ~571 RPM
    recoilScale: 1.8,
    pattern: [
      {x: 0, y: 0}, {x: 0, y: -12}, {x: 1, y: -26}, {x: 2, y: -38}, {x: 1, y: -48},
      {x: -1, y: -57}, {x: -3, y: -63}, {x: -6, y: -67}, {x: -9, y: -68}, {x: -10, y: -68},
      {x: -8, y: -68}, {x: -4, y: -68}, {x: 1, y: -68}, {x: 6, y: -68}, {x: 9, y: -68},
      {x: 10, y: -68}, {x: 8, y: -68}, {x: 4, y: -68}, {x: -1, y: -68}, {x: -6, y: -68},
      {x: -9, y: -68}, {x: -10, y: -68}, {x: -7, y: -68}, {x: -2, y: -68}, {x: 3, y: -68}
    ],
    inaccuracy: 1.0
  },
  m4a4: {
    name: "M4A4 (CS2 Style Tight T)",
    magazine: 30,
    fireRate: 90, // 666 RPM
    recoilScale: 1.4,
    pattern: [
      {x: 0, y: 0}, {x: 0, y: -8}, {x: 0, y: -17}, {x: 0.5, y: -26}, {x: 1, y: -35},
      {x: 1.5, y: -43}, {x: 1, y: -50}, {x: -1, y: -55}, {x: -3, y: -58}, {x: -6, y: -60},
      {x: -9, y: -61}, {x: -11, y: -61}, {x: -10, y: -61}, {x: -7, y: -61}, {x: -2, y: -61},
      {x: 3, y: -61}, {x: 8, y: -61}, {x: 11, y: -61}, {x: 12, y: -61}, {x: 9, y: -61},
      {x: 5, y: -61}, {x: 0, y: -61}, {x: -5, y: -61}, {x: -9, y: -61}, {x: -11, y: -61},
      {x: -10, y: -61}, {x: -6, y: -61}, {x: -1, y: -61}, {x: 4, y: -61}, {x: 8, y: -61}
    ],
    inaccuracy: 1.2
  },
  phantom: {
    name: "Phantom (Valorant Style Tight)",
    magazine: 30,
    fireRate: 90,
    recoilScale: 1.2,
    pattern: [
      {x: 0, y: 0}, {x: 0, y: -6}, {x: 0.5, y: -14}, {x: 1, y: -22}, {x: 0.8, y: -29},
      {x: 0, y: -35}, {x: -1, y: -40}, {x: -3, y: -43}, {x: -5, y: -44}, {x: -6, y: -44},
      {x: -4, y: -44}, {x: -1, y: -44}, {x: 2, y: -44}, {x: 5, y: -44}, {x: 6, y: -44},
      {x: 5, y: -44}, {x: 2, y: -44}, {x: -1, y: -44}, {x: -4, y: -44}, {x: -6, y: -44},
      {x: -5, y: -44}, {x: -2, y: -44}, {x: 1, y: -44}, {x: 4, y: -44}, {x: 5, y: -44},
      {x: 4, y: -44}, {x: 1, y: -44}, {x: -2, y: -44}, {x: -4, y: -44}, {x: -5, y: -44}
    ],
    inaccuracy: 0.9
  },
  r99: {
    name: "R-99 SMG (Apex Style Fast Vertical)",
    magazine: 27,
    fireRate: 55,
    recoilScale: 1.1,
    pattern: [
      {x: 0, y: 0}, {x: 0, y: -5}, {x: 0.5, y: -12}, {x: -0.5, y: -20}, {x: -1, y: -28},
      {x: -0.8, y: -35}, {x: 0.5, y: -42}, {x: 1.5, y: -48}, {x: 2, y: -54}, {x: 1.8, y: -59},
      {x: 0.8, y: -64}, {x: -0.5, y: -68}, {x: -1.5, y: -72}, {x: -2, y: -76}, {x: -2.2, y: -80},
      {x: -1.8, y: -84}, {x: -0.8, y: -87}, {x: 0.5, y: -89}, {x: 1.5, y: -91}, {x: 2, y: -93},
      {x: 1.8, y: -95}, {x: 0.8, y: -97}, {x: -0.5, y: -98}, {x: -1.5, y: -99}, {x: -2, y: -100},
      {x: -1.8, y: -101}, {x: -0.8, y: -102}
    ],
    inaccuracy: 1.6
  },
  soldier76: {
    name: "Heavy Pulse Rifle (Overwatch Style)",
    magazine: 30,
    fireRate: 110,
    recoilScale: 0.9,
    pattern: [
      {x: 0, y: 0}, {x: 0, y: -3}, {x: 0, y: -8}, {x: 0, y: -14}, {x: 0, y: -20},
      {x: 0, y: -26}, {x: 0, y: -32}, {x: 0, y: -37}, {x: 0.5, y: -41}, {x: 0.8, y: -44},
      {x: 0.5, y: -46}, {x: 0, y: -48}, {x: -0.5, y: -49}, {x: -0.8, y: -49}, {x: -0.5, y: -49},
      {x: 0, y: -49}, {x: 0.5, y: -49}, {x: 0.8, y: -49}, {x: 0.5, y: -49}, {x: 0, y: -49},
      {x: -0.5, y: -49}, {x: -0.8, y: -49}, {x: -0.5, y: -49}, {x: 0, y: -49}, {x: 0.5, y: -49},
      {x: 0.8, y: -49}, {x: 0.5, y: -49}, {x: 0, y: -49}, {x: -0.5, y: -49}, {x: -0.8, y: -49}
    ],
    inaccuracy: 0.6
  },
  flatline: {
    name: "Flatline (Apex Style Staircase)",
    magazine: 30,
    fireRate: 100,
    recoilScale: 1.5,
    pattern: [
      {x: 0, y: 0}, {x: -2, y: -8}, {x: -5, y: -18}, {x: -8, y: -28}, {x: -9, y: -38},
      {x: -6, y: -46}, {x: -2, y: -52}, {x: 2, y: -58}, {x: 6, y: -64}, {x: 9, y: -70},
      {x: 11, y: -75}, {x: 9, y: -79}, {x: 6, y: -82}, {x: 2, y: -85}, {x: -2, y: -88},
      {x: -6, y: -90}, {x: -9, y: -92}, {x: -11, y: -94}, {x: -12, y: -96}, {x: -10, y: -98},
      {x: -6, y: -100}, {x: -1, y: -102}, {x: 4, y: -104}, {x: 8, y: -106}, {x: 10, y: -108},
      {x: 11, y: -110}, {x: 9, y: -112}, {x: 6, y: -114}, {x: 2, y: -116}, {x: -2, y: -118}
    ],
    inaccuracy: 1.4
  },
  voltsmg: {
    name: "Volt SMG (Apex Style Diagonal)",
    magazine: 26,
    fireRate: 75,
    recoilScale: 1.1,
    pattern: [
      {x: 0, y: 0}, {x: 1, y: -7}, {x: 2.5, y: -15}, {x: 4, y: -23}, {x: 5, y: -30},
      {x: 5.5, y: -37}, {x: 5, y: -43}, {x: 4, y: -49}, {x: 2.5, y: -55}, {x: 1, y: -60},
      {x: -1, y: -65}, {x: -2.5, y: -70}, {x: -4, y: -75}, {x: -5, y: -80}, {x: -5.5, y: -84},
      {x: -5, y: -88}, {x: -4, y: -92}, {x: -2.5, y: -95}, {x: -1, y: -98}, {x: 1, y: -100},
      {x: 2.5, y: -102}, {x: 4, y: -104}, {x: 5, y: -106}, {x: 5.5, y: -108}, {x: 5, y: -110},
      {x: 4, y: -112}
    ],
    inaccuracy: 1.1
  },
  m4a1s: {
    name: "M4A1-S (CS2 Style Tight Vertical)",
    magazine: 20,
    fireRate: 100,
    recoilScale: 1.1,
    pattern: [
      {x: 0, y: 0}, {x: 0, y: -5}, {x: 0, y: -12}, {x: 0.2, y: -19}, {x: 0.4, y: -26},
      {x: 0.5, y: -33}, {x: 0.3, y: -39}, {x: 0, y: -44}, {x: -0.4, y: -48}, {x: -0.8, y: -51},
      {x: -1.0, y: -53}, {x: -0.8, y: -55}, {x: -0.4, y: -57}, {x: 0, y: -59}, {x: 0.4, y: -61},
      {x: 0.8, y: -63}, {x: 1.0, y: -65}, {x: 0.8, y: -67}, {x: 0.4, y: -69}, {x: 0, y: -71}
    ],
    inaccuracy: 0.8
  }
};

const DRILL_DURATION = 60; // 60 seconds

export default function RecoilControlClient() {
const GAME_YAWS = {
  valorant: 0.07,
  cs2: 0.022,
  apex: 0.022,
  overwatch: 0.0066,
  siege: 0.0057,
  fortnite: 0.01,
  cod: 0.022,
  pubg: 0.002222,
  destiny2: 0.0066,
  halo: 0.022,
  battlefield: 0.022,
  tf2: 0.022
};


  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);
  
  const [gameState, setGameState] = useState('start'); // start, playing, gameOver
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState('ak47');
  const [showPatternGuide, setShowPatternGuide] = useState(true);
  
  // Cross-game sensitivity settings
  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(0.35);
  const [gameType, setGameType] = useState('valorant');
  const [cmPer360, setCmPer360] = useState(0);
  const sensitivityMultiplierRef = useRef(1);
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const isFiring = useRef(false);
  
  // Recoil tracking state
  const bulletIndex = useRef(0);
  const lastShotTime = useRef(0);
  const sprayStartTime = useRef(0);
  const recoilOffset = useRef({ x: 0, y: 0 });
  const targetRef = useRef(null); // active target
  const decalsRef = useRef([]); // bullet hole coordinates
  const feedMessagesRef = useRef([]);
  const [feedMessages, setFeedMessages] = useState([]);
  
  const scoreRef = useRef(0);
  const timeLeftRef = useRef(DRILL_DURATION);
  const timerIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const crosshairInitializedRef = useRef(false);

  // S+ AI Coach Performance Tracking & Sensitivity Auto-Adjustment States
  const [activeCoach, setActiveCoach] = useState(null);
  const [coachSubtitle, setCoachSubtitle] = useState('');
  const [coachSpeaking, setCoachSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [sensAdjustedAlert, setSensAdjustedAlert] = useState(null);

  const speakText = useCallback((text, priority = false) => {
    if (typeof window === 'undefined') return;
    try {
      const coachId = localStorage.getItem('activeFpCoach') || 'athena';
      const coachObj = COACHES.find(c => c.id === coachId) || COACHES[0];
      setActiveCoach(coachObj);
      
      handleCoachFeedback(text, {
        inGameSens,
        setInGameSens,
        gameType,
        dpi,
        coachId,
        voiceEnabled,
        priority,
        setCoachSubtitle,
        setCoachSpeaking
      });
    } catch (e) {
      console.error("Coach speakText error:", e);
    }
  }, [voiceEnabled, inGameSens, gameType, dpi]);

  const checkSensitivityAdjustment = useCallback((type, extra = {}) => {
    const currentGameState = typeof gameState !== 'undefined' ? gameState : 'playing';
    if (currentGameState !== 'playing') return;
    try {
      const coachId = localStorage.getItem('activeFpCoach') || 'athena';
      handleCoachFeedback(type, {
        inGameSens,
        setInGameSens,
        gameType,
        dpi,
        coachId,
        voiceEnabled,
        extra,
        setSensAdjustedAlert
      });
    } catch (e) {
      console.error("Coach checkSensitivityAdjustment error:", e);
    }
  }, [inGameSens, gameState, gameType, dpi, voiceEnabled]);


  // Auto-save user calibration preferences
  useEffect(() => {
    if (gameState === 'playing') return;
    try {
      localStorage.setItem('proSens', inGameSens.toString());
      localStorage.setItem('proDpi', dpi.toString());
      localStorage.setItem('proGame', gameType);
      if (gameType === 'pubg') {
        localStorage.setItem('pubgSens', inGameSens.toString());
      }
    } catch (e) {}
  }, [inGameSens, dpi, gameType, gameState]);


  // S+ AI Coach Performance Tracking & Sensitivity Auto-Adjustment States
  

  

  


  // Auto-save user calibration preferences
  useEffect(() => {
    if (gameState === 'playing') return;
    try {
      localStorage.setItem('proSens', inGameSens.toString());
      localStorage.setItem('proDpi', dpi.toString());
      localStorage.setItem('proGame', gameType);
      if (gameType === 'pubg') {
        localStorage.setItem('pubgSens', inGameSens.toString());
      }
    } catch (e) {}
  }, [inGameSens, dpi, gameType, gameState]);

  
  // Drill analytics tracking
  const [analytics, setAnalytics] = useState({
    targetsEliminated: 0,
    totalShots: 0,
    headshots: 0,
    bodyshots: 0,
    misses: 0,
    accuracy: 100,
    avgTimeToKill: 0,
    weaponUsed: ''
  });
  
  const analyticsRef = useRef({
    targetsEliminated: 0,
    totalShots: 0,
    headshots: 0,
    bodyshots: 0,
    misses: 0,
    spawnTimes: [],
    killTimes: []
  });

  // Client-side initialization
  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('recoilBestScore');
      if (savedScore) {
        const parsed = parseInt(savedScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
      const savedDpi = localStorage.getItem('proDpi');
      if (savedDpi) setDpi(parseInt(savedDpi, 10));
      const savedGameLocal = localStorage.getItem('proGame') || 'valorant';
      const savedSens = localStorage.getItem(savedGameLocal === 'pubg' ? 'pubgSens' : 'proSens');
      if (savedSens) setInGameSens(parseFloat(savedSens));
      const savedGame = localStorage.getItem('proGame');
      if (savedGame) {
        setGameType(savedGame);
      }
    } catch (e) {}
  }, []);

  // Sensitivity configuration
  useEffect(() => {
    const yaw = GAME_YAWS[gameType] || 0.07;
    const counts = 360 / (yaw * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));
    
    // Matched screen multiplier
    sensitivityMultiplierRef.current = 45.0 / cm;
  }, [dpi, inGameSens, gameType]);

  // Audio system
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
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (type === 'shoot') {
        // Rifle punch sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.09);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'dink') {
        // Metallic headshot dink
        osc.frequency.setValueAtTime(2200, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'kill') {
        // Eliminated sweep note
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'click') {
        // Empty magazine click
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      }
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const showFeedMessage = useCallback((text, type) => {
    const id = Math.random().toString(36).substr(2, 9);
    feedMessagesRef.current.push({ id, text, type });
    setFeedMessages([...feedMessagesRef.current]);
    
    setTimeout(() => {
      feedMessagesRef.current = feedMessagesRef.current.filter(f => f.id !== id);
      setFeedMessages([...feedMessagesRef.current]);
    }, 1200);
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('recoilBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('recoilBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) {}
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const el = pageRef.current;
        if (el?.requestFullscreen) {
          el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (!active && gameState === 'playing') {
        resetGame();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [gameState, resetGame]);

  const requestPointerLock = useCallback(() => {
    canvasRef.current?.requestPointerLock();
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (gameState === 'playing' && !document.pointerLockElement) {
      canvasRef.current?.requestPointerLock();
    }
  }, [gameState]);

  useEffect(() => {
    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(locked);
      if (locked) {
        crosshairInitializedRef.current = true;
      } else if (gameState === 'playing') {
        isFiring.current = false;
        showFeedMessage('CURSOR UNLOCKED - Click Canvas to Lock', 'error');
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, [gameState, showFeedMessage]);

  // Mouse drag handler during pointer lock
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.pointerLockElement !== canvasRef.current) return;
      
      const sens = sensitivityMultiplierRef.current;
      const dx = (e.movementX || 0) * sens;
      const dy = (e.movementY || 0) * sens;
      
      virtualCrosshair.current.x += dx;
      virtualCrosshair.current.y += dy;
      
      const cvs = canvasRef.current;
      if (cvs) {
        virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x));
        virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y));
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Firing trigger
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      
      if (gameState === 'playing') {
        if (!pointerLocked) {
          requestPointerLock();
        } else {
          isFiring.current = true;
          sprayStartTime.current = performance.now();
          lastShotTime.current = 0;
          bulletIndex.current = 0;
        }
      }
    };

    const handleMouseUp = (e) => {
      isFiring.current = false;
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gameState, pointerLocked, requestPointerLock]);

  // Target spawning
  const spawnTarget = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return null;
    
    const pad = 80;
    const tX = Math.random() * (cvs.width - pad * 2) + pad;
    const tY = Math.random() * (cvs.height - pad * 2) + pad;
    
    analyticsRef.current.spawnTimes.push(performance.now());
    
    return {
      x: tX,
      y: tY,
      health: 100,
      maxHealth: 100
    };
  }, []);

  // Fire bullet function
  const fireBullet = useCallback((wp) => {
    if (bulletIndex.current >= wp.magazine) {
      playSound('click');
      isFiring.current = false;
      return;
    }

    const idx = bulletIndex.current;
    const currentRecoil = wp.pattern[idx] || wp.pattern[wp.pattern.length - 1];
    
    // Recoil offsets
    let rx = 0;
    let ry = 0;
    
    if (idx > 0) {
      const prevRecoil = wp.pattern[idx - 1];
      rx = (currentRecoil.x - prevRecoil.x) * wp.recoilScale;
      ry = (currentRecoil.y - prevRecoil.y) * wp.recoilScale;
    } else {
      rx = currentRecoil.x * wp.recoilScale;
      ry = currentRecoil.y * wp.recoilScale;
    }
    
    // Accumulate recoil offsets on crosshair (recoil pushes reticle up/sideways)
    recoilOffset.current.x += rx;
    recoilOffset.current.y += ry;
    
    virtualCrosshair.current.x += rx;
    virtualCrosshair.current.y += ry;
    
    // Add inaccuracy bloom deviation
    const bloomAngle = Math.random() * Math.PI * 2;
    const bloomDist = Math.random() * wp.inaccuracy;
    
    const bulletX = virtualCrosshair.current.x + Math.cos(bloomAngle) * bloomDist;
    const bulletY = virtualCrosshair.current.y + Math.sin(bloomAngle) * bloomDist;
    
    playSound('shoot');
    analyticsRef.current.totalShots++;
    
    // Calculate hits on Humanoid hitbox
    const target = targetRef.current;
    let hitType = 'miss';
    
    if (target) {
      // 1. Head hitbox: circle centered at (target.x, target.y - 25), radius 12
      const headDist = Math.hypot(bulletX - target.x, bulletY - (target.y - 25));
      
      // 2. Chest hitbox: rounded rect centered at (target.x, target.y + 15), width 35, height 40
      const inChestX = Math.abs(bulletX - target.x) <= 18;
      const inChestY = bulletY >= (target.y - 5) && bulletY <= (target.y + 35);
      
      // 3. Limbs hitbox: rect centered at (target.x, target.y + 45), width 25, height 30
      const inLimbsX = Math.abs(bulletX - target.x) <= 12;
      const inLimbsY = bulletY > (target.y + 35) && bulletY <= (target.y + 65);
      
      if (headDist <= 12) {
        hitType = 'head';
        target.health -= 100; // instant headshot kill
        analyticsRef.current.headshots++;
        playSound('dink');
        showFeedMessage('🎯 CRITICAL HEADSHOT! -100HP', 'success');
      } else if (inChestX && inChestY) {
        hitType = 'chest';
        target.health -= 35;
        analyticsRef.current.bodyshots++;
        showFeedMessage('✓ chest hit -35HP', 'info');
      } else if (inLimbsX && inLimbsY) {
        hitType = 'limbs';
        target.health -= 20;
        analyticsRef.current.bodyshots++;
        showFeedMessage('• limb hit -20HP', 'warn');
      } else {
        analyticsRef.current.misses++;
      }
      
      // Target death check
      if (target.health <= 0) {
        playSound('kill');
        scoreRef.current++;
        setScore(scoreRef.current);
        analyticsRef.current.targetsEliminated++;
        analyticsRef.current.killTimes.push(performance.now());
        
        targetRef.current = spawnTarget();
        decalsRef.current = []; // clear current spray holes on kill
      }
    } else {
      analyticsRef.current.misses++;
    }
    
    // Add bullet decal
    decalsRef.current.push({
      x: bulletX,
      y: bulletY,
      time: performance.now(),
      type: hitType
    });
    
    bulletIndex.current++;
  }, [playSound, showFeedMessage, spawnTarget]);

  // Main game timer
  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    timeLeftRef.current = DRILL_DURATION;
    setTimeLeft(DRILL_DURATION);
    
    timerIntervalRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      
      if (timeLeftRef.current <= 0) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        setGameState('gameOver');
        document.exitPointerLock();
        updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('recoil-control', {
        score: scoreRef.current,
        accuracy: null,
        reactionTimeMs: null,
        trackingAccuracy: null,
        comboMax: 0,
        overshoots: 0,
        undershoots: 0,
        sensitivity: inGameSens,
        dpi,
        gameType,
        duration: DRILL_DURATION
      });
    } catch (e) {}

        
        // Finalize analytics calculations
        const tShots = analyticsRef.current.totalShots || 1;
        const totalHits = analyticsRef.current.headshots + analyticsRef.current.bodyshots;
        
        // Calculate average time to kill (spawn to kill)
        let totalTtk = 0;
        let killCount = 0;
        for (let i = 0; i < analyticsRef.current.killTimes.length; i++) {
          if (analyticsRef.current.spawnTimes[i]) {
            totalTtk += (analyticsRef.current.killTimes[i] - analyticsRef.current.spawnTimes[i]) / 1000;
            killCount++;
          }
        }
        
        setAnalytics({
          targetsEliminated: analyticsRef.current.targetsEliminated,
          totalShots: analyticsRef.current.totalShots,
          headshots: analyticsRef.current.headshots,
          bodyshots: analyticsRef.current.bodyshots,
          misses: analyticsRef.current.misses,
          accuracy: Math.round((totalHits / tShots) * 100),
          avgTimeToKill: killCount > 0 ? (totalTtk / killCount).toFixed(2) : 0,
          weaponUsed: WEAPON_PROFILES[selectedWeapon].name
        });
      }
    }, 1000);
  }, [selectedWeapon, updateBestScore]);

  // Start game protocol
  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('recoil-control');

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    try {
      const el = pageRef.current;
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
        setIsFullscreen(true);
      }
    } catch (e) {
      console.warn("Fullscreen request blocked", e);
    }

    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    
    // Reset stats
    analyticsRef.current = {
      targetsEliminated: 0,
      totalShots: 0,
      headshots: 0,
      bodyshots: 0,
      misses: 0,
      spawnTimes: [],
      killTimes: []
    };
    
    decalsRef.current = [];
    feedMessagesRef.current = [];
    setFeedMessages([]);
    
    recoilOffset.current = { x: 0, y: 0 };
    isFiring.current = false;
    bulletIndex.current = 0;
    
    targetRef.current = spawnTarget();
    startTimer();
    
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitializedRef.current = true;
  }, [startTimer, requestPointerLock, spawnTarget]);


  // Core render loop and recoil decay physics
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    
    const updateSize = () => {
      const cr = containerRef.current;
      if (!cr) return;
      const rect = cr.getBoundingClientRect();
      
      let w = rect.width;
      let h = w * (9 / 16);
      if (h > rect.height) {
        h = rect.height;
        w = h * (16 / 9);
      }
      cvs.width = w;
      cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rect.width - w) / 2}px`;
      cvs.style.top = `${(rect.height - h) / 2}px`;
      
      if (w > 0 && h > 0 && (!crosshairInitializedRef.current || (virtualCrosshair.current.x === 0 && virtualCrosshair.current.y === 0))) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
        crosshairInitializedRef.current = true;
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    let lastFrameTime = performance.now();
    
    const run = (timestamp) => {
      if (gameState !== 'playing') return;
      
      let dt = (timestamp - lastFrameTime) / 1000;
      lastFrameTime = timestamp;
      if (dt > 0.1) dt = 0.1;
      
      const wp = WEAPON_PROFILES[selectedWeapon];
      
      // 1. UPDATE RECOIL FIRING / DECAY
      if (isFiring.current) {
        const timeSinceStart = timestamp - sprayStartTime.current;
        const nextShotDue = bulletIndex.current * wp.fireRate;
        
        if (timeSinceStart >= nextShotDue) {
          fireBullet(wp);
        }
      } else {
        // Recover recoil back to 0 (crosshair snap back)
        const recoveryRate = 12.0; // Snapback speed coefficient
        const decayX = recoilOffset.current.x * (1 - Math.exp(-recoveryRate * dt));
        const decayY = recoilOffset.current.y * (1 - Math.exp(-recoveryRate * dt));
        
        recoilOffset.current.x -= decayX;
        recoilOffset.current.y -= decayY;
        
        // Drag crosshair coordinates back as well
        virtualCrosshair.current.x -= decayX;
        virtualCrosshair.current.y -= decayY;
      }
      
      // 2. RENDER STAGE
      ctx.fillStyle = '#080d1a';
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.05)';
      ctx.lineWidth = 1;
      const gSpacing = 60;
      for (let x = 0; x < cvs.width; x += gSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, cvs.height); ctx.stroke();
      }
      for (let y = 0; y < cvs.height; y += gSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cvs.width, y); ctx.stroke();
      }
      
      // Render human target silhouette
      const target = targetRef.current;
      if (target) {
        // Silhouette shadow glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.15)';
        
        // 1. Outer bounds / Torso-chest: rounded rect centered at (target.x, target.y + 15), width 35, height 40
        ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        const rx = target.x - 17.5;
        const ry = target.y - 5;
        const rw = 35;
        const rh = 40;
        const radius = 8;
        ctx.moveTo(rx + radius, ry);
        ctx.lineTo(rx + rw - radius, ry);
        ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + radius);
        ctx.lineTo(rx + rw, ry + rh - radius);
        ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - radius, ry + rh);
        ctx.lineTo(rx + radius, ry + rh);
        ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - radius);
        ctx.lineTo(rx, ry + radius);
        ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        
        // 2. Head circle: centered at (target.x, target.y - 25), radius 12
        ctx.beginPath();
        ctx.arc(target.x, target.y - 25, 12, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        
        // 3. Limbs / Legs rect: centered at (target.x, target.y + 45), width 25, height 30
        ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.beginPath();
        ctx.rect(target.x - 12.5, target.y + 35, 25, 30);
        ctx.fill(); ctx.stroke();
        
        ctx.shadowBlur = 0;
        
        // Draw target Health Bar
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(target.x - 20, target.y - 50, 40, 4);
        
        const healthPercent = Math.max(0, target.health / target.maxHealth);
        ctx.fillStyle = healthPercent > 0.4 ? '#ef4444' : '#ffaa00';
        ctx.fillRect(target.x - 20, target.y - 50, 40 * healthPercent, 4);
      }
      
      // Draw Ghost Spray Pattern Guide above target (if toggled)
      if (showPatternGuide && target) {
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        
        ctx.beginPath();
        wp.pattern.forEach((pt, i) => {
          // The pattern shows where the crosshair drifts.
          // To counteract, the user drags the mouse downwards/sideways.
          // The line shows where the bullets drift if they target the chest center.
          const x = target.x + pt.x * wp.recoilScale;
          const y = target.y + pt.y * wp.recoilScale;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw current expected bullet guide point
        if (isFiring.current && bulletIndex.current < wp.pattern.length) {
          const pt = wp.pattern[bulletIndex.current];
          ctx.fillStyle = 'rgba(0, 255, 136, 0.6)';
          ctx.beginPath();
          ctx.arc(target.x + pt.x * wp.recoilScale, target.y + pt.y * wp.recoilScale, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw Bullet Holes (Decals)
      decalsRef.current.forEach((d) => {
        const age = timestamp - d.time;
        const opacity = Math.max(0.1, 1 - (age / 8000)); // fade decals over 8 seconds
        
        if (d.type === 'head') {
          ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`; // Neon green for headshots
        } else if (d.type === 'chest' || d.type === 'limbs') {
          ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`; // Red for body hits
        } else {
          ctx.fillStyle = `rgba(255, 187, 0, ${opacity})`; // Yellow for misses
        }
        
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // 3. DRAW CROSSHAIR
      const ch = virtualCrosshair.current;
      const crosshairColor = pointerLocked ? '#00ff88' : '#ffbb00';
      
      ctx.strokeStyle = crosshairColor;
      ctx.lineWidth = 1.5;
      
      // Dynamic recoil inaccuracy indicator ring
      const baseInaccuracyRadius = 5;
      const currentInaccuracyRadius = baseInaccuracyRadius + (isFiring.current ? bulletIndex.current * 0.7 : 0);
      
      ctx.beginPath();
      ctx.arc(ch.x, ch.y, currentInaccuracyRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)';
      ctx.stroke();
      
      ctx.strokeStyle = crosshairColor;
      ctx.beginPath();
      const gap = 3;
      const length = 9;
      // L
      ctx.moveTo(ch.x - gap, ch.y); ctx.lineTo(ch.x - gap - length, ch.y);
      // R
      ctx.moveTo(ch.x + gap, ch.y); ctx.lineTo(ch.x + gap + length, ch.y);
      // T
      ctx.moveTo(ch.x, ch.y - gap); ctx.lineTo(ch.x, ch.y - gap - length);
      // B
      ctx.moveTo(ch.x, ch.y + gap); ctx.lineTo(ch.x, ch.y + gap + length);
      ctx.stroke();
      
      ctx.fillStyle = crosshairColor;
      ctx.beginPath(); ctx.arc(ch.x, ch.y, 1.5, 0, Math.PI * 2); ctx.fill();
      
      // Capture notice
      if (!pointerLocked) {
        ctx.fillStyle = 'rgba(8, 13, 26, 0.85)';
        ctx.fillRect(cvs.width / 2 - 170, cvs.height / 2 - 25, 340, 50);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.strokeRect(cvs.width / 2 - 170, cvs.height / 2 - 25, 340, 50);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK CANVAS TO CAPTURE & COMMENCE', cvs.width / 2, cvs.height / 2 + 4);
      }
      
      animationRef.current = requestAnimationFrame(run);
    };
    
    animationRef.current = requestAnimationFrame(run);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, pointerLocked, selectedWeapon, showPatternGuide]);

  const avgTTK = analytics.avgTimeToKill;

  return (
    <div ref={pageRef} className={`min-h-screen select-none font-mono ${isDarkMode ? 'bg-[#080d1a] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(239,68,68,0.03)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {/* Navigation Breadcrumb */}
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors">HQ</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-red-400 font-bold">Recoil Control Lab</span></li>
            </ol>
          </nav>
        )}

        {/* Drill Header */}
        {!isFullscreen && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-950/30 border border-red-500/20 text-red-400 rounded-xl">
                <Crosshair className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Recoil Spray Control Lab
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURED' : '🔴 LOCK CURSOR TO BEGIN'} • {cmPer360} cm/360 • RIFLE SPRAY PATTERNS
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setShowPatternGuide(!showPatternGuide)} 
                className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition ${
                  showPatternGuide ? 'border-green-500/30 bg-green-950/20 text-green-400' : 'border-slate-800 bg-[#0c1224] text-slate-355 hover:border-slate-750'
                }`}
              >
                <span>SPRAYS GUIDE: {showPatternGuide ? 'ON' : 'OFF'}</span>
              </button>
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)} 
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-300 hover:border-slate-700 text-xs flex items-center gap-1.5 transition"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>SOUNDS</span>
              </button>
              <button 
                onClick={toggleFullscreen} 
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-300 hover:border-slate-700 text-xs flex items-center gap-1.5 transition"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>FULLSCREEN</span>
              </button>
              {true && (
                <button 
                  onClick={resetGame} 
                  className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-950/20 text-red-400 hover:bg-red-950/40 text-xs flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>RESET</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Instructions */}
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-4 h-4" />
                  DRILL PROTOCOLS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">1.</span>
                    <span>Hold down left-click to begin firing. The automatic spray recoil will push your crosshair away.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">2.</span>
                    <span>Counter-steer the climb! Drag your mouse in the exact opposite direction to keep bullets landing on target.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">3.</span>
                    <span>Practice spray transfers. Headshots (dinks) kill targets instantly. Chest / body hits require multiple bullets.</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-400">
                    <span className="text-green-400 font-bold">★</span>
                    <span>Tapping is fine, but this laboratory is designed to train full 30-round automatic spray adjustments.</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-500 leading-normal">
                Features detailed weapon physics configurations. Recoil snapshot plots generated after drill termination.
              </div>
            </div>

            {/* Right Form Configuration */}
            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Cpu className="w-4 h-4 text-red-400" />
                  WEAPON CHAMBER & CONFIGS
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Weapon Pattern Profile</label>
                    <select 
                      value={selectedWeapon}
                      onChange={(e) => setSelectedWeapon(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono"
                    >
                      <option value="ak47">AK-47 (CS2 S-Curve climb)</option>
                      <option value="vandal">Vandal (Valorant T-Sweep climb)</option>
                      <option value="m4a4">M4A4 (CS2 Tight vertical T)</option>
                      <option value="phantom">Phantom (Valorant Tight Spray)</option>
                      <option value="r99">R-99 SMG (Apex Fast Vertical)</option>
                      <option value="soldier76">Soldier:76 Pulse Rifle (OW Style)</option>
                      <option value="flatline">Flatline (Apex Staircase)</option>
                      <option value="voltsmg">Volt SMG (Apex Diagonal)</option>
                      <option value="m4a1s">M4A1-S (CS2 Tight Vertical)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Sensitivity Game profile</label>
                    <select 
                      value={gameType}
                      onChange={(e) => setGameType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono"
                    >
                      <option value="valorant">Valorant</option>
                      <option value="cs2">CS2 / Global Offensive</option>
                      <option value="apex">Apex Legends</option>
                      <option value="overwatch">Overwatch 2</option>
                      <option value="siege">Rainbow Six Siege</option>
                      <option value="fortnite">Fortnite</option>
                      <option value="cod">Call of Duty / Warzone</option>
                      <option value="pubg">PUBG</option>
                      <option value="destiny2">Destiny 2</option>
                      <option value="halo">Halo Infinite</option>
                      <option value="battlefield">Battlefield 2042</option>
                      <option value="tf2">Team Fortress 2</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Sensitivity Multiplier</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={inGameSens}
                      onChange={(e) => setInGameSens(Math.max(0.01, parseFloat(e.target.value) || 0.1))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Hardware DPI</label>
                    <input 
                      type="number"
                      step="100"
                      value={dpi}
                      onChange={(e) => setDpi(Math.max(100, parseInt(e.target.value, 10) || 800))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-950/80 rounded border border-slate-900 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Matched 360 Distance</span>
                    <span className="text-white font-bold text-sm">{cmPer360} cm</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase">Profile Magazine</span>
                    <span className="text-red-400 font-bold">{WEAPON_PROFILES[selectedWeapon].magazine} Rounds</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-6">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Personal Best Record</span>
                  <span className="text-white font-bold text-lg flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    {bestScore} Kills
                  </span>
                </div>
                
                <button
                  onClick={startGame}
                  className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 uppercase tracking-wider transition"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Initiate Spray Control Lab
                </button>
              </div>
            </div>

          </div>
          </div>
        )}

        {/* Playing HUD Overlay & Canvas */}
        {true && (
          <div className={isFullscreen ? "w-full h-full" : "relative"}>
            

            {/* Interactive Canvas container */}
            <div 
              ref={containerRef} 
              className={isFullscreen 
                ? "w-full h-full bg-slate-950 relative overflow-hidden flex items-center justify-center cursor-none" 
                : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
            >
              <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            


              
              
              {/* Live Damage Feed overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-end items-start p-4 gap-1.5 overflow-hidden select-none z-10">
                {feedMessages.map((f) => (
                  <div 
                    key={f.id} 
                    className={`px-3 py-1.5 rounded border text-[10px] font-bold shadow-md uppercase tracking-wider backdrop-blur-sm ${
                      f.type === 'success' 
                        ? 'bg-green-950/80 border-green-500/20 text-green-400' 
                        : f.type === 'warn'
                          ? 'bg-yellow-950/80 border-yellow-500/20 text-yellow-400'
                          : f.type === 'info'
                            ? 'bg-blue-950/80 border-blue-500/20 text-blue-400'
                            : 'bg-red-950/80 border-red-500/20 text-red-400'
                    }`}
                  >
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Firing state helper tip */}
            <div className="mt-4 text-center text-[10px] text-slate-550 flex items-center justify-center gap-4">
              <span>🖱 Left-click & Hold to spray</span>
              <span>• Pull mouse DOWN/OPPOSITE to counter recoil</span>
              <span>• Release click to snap back reticle</span>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-red-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              LAB REPORT: RECOIL RESULTS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Left Column summary */}
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-550 uppercase">Targets Eliminated</span>
                    <span className="text-white font-bold text-lg">{analytics.targetsEliminated} Kills</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Total Shots</span>
                    <span className="text-white font-bold text-sm">{analytics.totalShots}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Spray Accuracy</span>
                    <span className="text-white font-bold text-sm">{analytics.accuracy}%</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-550 uppercase">Average Time-to-Kill</span>
                    <span className="text-red-400 font-bold">{avgTTK}s</span>
                  </div>
                  <div className="text-[10px] text-slate-500 leading-normal">
                    Calculated from the exact moment a target spawns until its health pool reaches 0HP.
                  </div>
                </div>
              </div>

              {/* Right Column hitboxes analysis */}
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    HITBOX LANDINGS SPECIFICS
                  </h4>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Critical Headshots (1-Tap):</span>
                      <span className="text-green-400 font-bold">{analytics.headshots}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Body / Torso landings:</span>
                      <span className="text-blue-400 font-bold">{analytics.bodyshots}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Stray / Missed Bullets:</span>
                      <span className="text-red-500 font-bold">{analytics.misses}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-900 pt-2 mt-2">
                      <span className="text-slate-400">Weapon calibrated:</span>
                      <span className="text-slate-200 font-bold uppercase">{selectedWeapon}</span>
                    </div>
                  </div>
                </div>
                
              </div>

            </div>

            {/* AI Coach Diagnostic Board */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-red-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                COACH PERFORMANCE DIAGNOSIS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                <div className="space-y-2.5 border-r border-slate-900 pr-6">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Skill Index Analysis:</p>
                  <ul className="space-y-2 list-disc pl-4">
                    {analytics.accuracy >= 70 ? (
                      <li className="text-green-400">🔥 Elite Recoil Control: Your mouse drag speeds closely match the weapon S-curve displacement.</li>
                    ) : analytics.accuracy >= 45 ? (
                      <li className="text-yellow-400">⚠️ Spray Compensation Drift: Your crosshair is floating high during the mid-spray phase. Pull down faster.</li>
                    ) : (
                      <li className="text-red-400">🚨 Recoil Desync: Aim is drifting completely out of bounds. Reduce sensitivity or practice in shorter bursts.</li>
                    )}
                    {analytics.headshots >= (analytics.targetsEliminated * 0.4) ? (
                      <li className="text-green-400">🔥 High-Precision Tapping: Consistently targeting head/neck hitboxes first. Excellent crosshair placement.</li>
                    ) : (
                      <li className="text-slate-400">👤 Bodyshot Dominant: Center aim on the green head circle (instant kill dinks) instead of the chest.</li>
                    )}
                    {parseFloat(avgTTK) <= 1.3 ? (
                      <li className="text-green-400">⚡ Sub-Second Transfer Speed: Rapid target re-acquisition times. Great reaction pacing.</li>
                    ) : (
                      <li className="text-slate-400">⏳ Slow Spray Transfer: Target switching and target locked lock-on speeds are lagging.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1.5">Actionable Esports Training Prescription:</p>
                    <p className="text-slate-350 leading-relaxed font-sans">
                      {analytics.accuracy < 60 ? (
                        "Your mouse velocity is struggling to control the horizontal sway. Decreasing your in-game sensitivity by 8% will provide finer micro-adjustment stability. Run 3 sessions with the M4A4 (tight vertical climb) to lock in vertical drag rhythm before retrying AK-47."
                      ) : (
                        "Recoil compensation has stabilized. Challenge your micro-adjustment limits by training with the Vandal (wide Valorant T-sweep climb) or shifting your game profile to Apex SMG (ultra-fast vertical tracking spray)."
                      )}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-block bg-red-950/40 text-red-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-red-500/20 shadow-md">
                      ESPORTS AIM PERFORMANCE LEVEL: {Math.round(score * (analytics.accuracy / 100) * 10)} INDEX POINTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              <button
                onClick={startGame}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <RefreshCw className="w-4.5 h-4.5" />
                Retrain Spray
              </button>
              <Link href="/drills/fps" className="w-full sm:w-auto">
                <button
                  className="w-full px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  Return to Sector
                </button>
              </Link>
            </div>
          </div>
          </div>
        )}

      </div>
    </div>
  );
}
