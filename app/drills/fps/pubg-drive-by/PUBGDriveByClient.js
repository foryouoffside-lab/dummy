'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2,
  Info, Activity, Check, Crosshair,
  AlertCircle, RefreshCw, Home, ChevronRight, Calculator, Sparkles,
  Play, Award, MessageSquare
} from 'lucide-react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';

import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

const DRILL_DURATION = 60;
const BASE_VEHICLE_SPEED = 400; // pixels per second horizontally
const TARGET_HITBOX_RADIUS = 15;

export default function PUBGDriveByClient() {


  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');

  // Pure 2D Universal Standard States
  const [universalSens, setUniversalSens] = useState(1.0);

  // Stubs to preserve telemetry and coaching dependencies
  const gameType = 'universal';
  const setGameType = () => {};
  const dpi = 800;
  const setDpi = () => {};
  const inGameSens = universalSens;
  const setInGameSens = setUniversalSens;
  const cmPer360 = (30 / universalSens).toFixed(1);
  const setCmPer360 = () => {};
  const sensitivityMultiplierRef = { current: universalSens };

  // Load saved settings
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('universalSens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
    } catch (e) {}
  }, []);

  // Auto-save user preferences
  useEffect(() => {
    if (gameState === 'playing') return;
    try {
      localStorage.setItem('universalSens', universalSens.toString());
    } catch (e) {}
  }, [universalSens, gameState]);

  // Pointer Lock Safety Cleanup
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined' && document.pointerLockElement) {
        document.exitPointerLock();
      }
    };
  }, []);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [accuracy, setAccuracy] = useState(100);
  const [lives, setLives] = useState(5);
  const [pointerLocked, setPointerLocked] = useState(false);
          
  // Telemetry metrics
  const [trackingCoherence, setTrackingCoherence] = useState(100); // % frames cursor kept on target
  const [stabilityIndex, setStabilityIndex] = useState(100); // % stability under weapon fire + bump jitter

  const [analyticsData, setAnalyticsData] = useState({
    activeTrackingFrames: 0,
    onTargetFrames: 0,
    bumpMistakesCount: 0,
    totalDummiesCleared: 0,
    totalShotsFired: 0
  });
  
  const targetsRef = useRef([]); // list of dummies in world coordinates
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const worldOffsetRef = useRef(0); // vehicle horizontal displacement
  const vehicleJitterRef = useRef(0); // vehicle vertical bump offset
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  
  const scoreRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  const livesRef = useRef(5);
  const clearedDummiesRef = useRef(0);
  
  const trackingTotalFramesRef = useRef(0);
  const trackingOnTargetFramesRef = useRef(0);
  const isShootingRef = useRef(false);

  // Parallax background offsets
  const skyOffsetRef = useRef(0);
  const mountainOffsetRef = useRef(0);
  const fenceOffsetRef = useRef(0);
  
  // Feed overlay state
  const feedbacksRef = useRef([]);
  const [feedbacks, setFeedbacks] = useState([]);

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
  


  // S+ AI Coach Performance Tracking & Sensitivity Auto-Adjustment States
  

  

  


  // Auto-save user calibration preferences
  


  
  
  
  
  
  

  // Redefine speakText to route through active coach templates
  

  useEffect(() => {
    try {
      const s = localStorage.getItem('pubgDriveByBestScore');
      if (s) {
        const p = parseInt(s, 10);
        if (!isNaN(p)) setBestScore(p);
      }
            } catch (e) {}
  }, []);
  
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Compute sensitivity
  // Compute sensitivity using GAME_YAWS
  

  const showFeedbackText = useCallback((text, type) => {
    const id = Math.random().toString(36).substr(2, 9);
    feedbacksRef.current.push({ id, text, type });
    setFeedbacks([...feedbacksRef.current]);
    
    setTimeout(() => {
      feedbacksRef.current = feedbacksRef.current.filter(f => f.id !== id);
      setFeedbacks([...feedbacksRef.current]);
    }, 1200);
  }, []);

  const initAudio = useCallback(() => { 
    try { 
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); 
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); 
      return audioCtxRef.current; 
    } catch (e) { return null; } 
  }, []);

  const playSound = useCallback((type) => { 
    if (!soundEnabled) return; 
    try { 
      const ctx = initAudio(); if (!ctx) return; 
      const o = ctx.createOscillator(), g = ctx.createGain(); 
      o.connect(g); g.connect(ctx.destination); 
      const now = ctx.currentTime; 
      const f = { success: 1200, fail: 220, bump: 110, trackingTick: 900 }; 
      o.frequency.setValueAtTime(f[type] || 440, now); 
      
      if (type === 'trackingTick') {
        g.gain.setValueAtTime(0.04, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        o.start(now); o.stop(now + 0.05);
      } else {
        g.gain.setValueAtTime(type==='bump'?0.12:0.06, now); 
        g.gain.exponentialRampToValueAtTime(0.001, now+0.1); 
        o.start(now); o.stop(now+0.1); 
      }
    } catch (e) {} 
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((fs) => { 
    try { 
      const c = parseInt(localStorage.getItem('pubgDriveByBestScore') || '0', 10); 
      if (fs > c) { 
        localStorage.setItem('pubgDriveByBestScore', fs.toString()); 
        setBestScore(fs); 
      } 
    } catch (e) {} 
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    targetsRef.current = [];
    isShootingRef.current = false;
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (!active && gameStateRef.current === 'playing') {
        resetGame();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [resetGame]);

  const handleCanvasClick = useCallback(() => {
    if (gameState === 'playing' && !document.pointerLockElement) {
      canvasRef.current?.requestPointerLock();
    }
  }, [gameState]);

  useEffect(() => {
    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(locked);
      if (!locked && gameStateRef.current === 'playing') {
        showFeedbackText('CURSOR UNLOCKED - Click Canvas to Lock', 'warn');
        speakText('Cursor unlocked. Recapture mouse control.');
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, [showFeedbackText, speakText]);

  // Handle pointer locked mouse movements
  useEffect(() => {
    const handleMouseMove = (e) =>  {
      if (document.pointerLockElement !== canvasRef.current && !document.pointerLockElement) return;
      const dx = (e.movementX || 0) * universalSens;
      const dy = (e.movementY || 0) * universalSens;
      const c = canvasRef.current;
      if (c) {
        virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x + dx));
        virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y + dy));
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle tracking spray mouse hold
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (document.pointerLockElement === canvasRef.current && gameStateRef.current === 'playing') {
        isShootingRef.current = true;
      }
    };
    const handleMouseUp = (e) => {
      isShootingRef.current = false;
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const spawnDummy = (worldX) => {
    const cvs = canvasRef.current;
    if (!cvs) return null;
    
    // Standing dummy at fixed roadside height
    return {
      worldX: worldX,
      y: cvs.height - 180, // roadside standing lane
      health: 100, // required tracking frames
      cleared: false
    };
  };

  const endGame = useCallback(() => {
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    isActiveRef.current = false;
    updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('pubg-drive-by', {
        score: scoreRef.current,
        accuracy: accuracy,
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

    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    let advice = `Drive-by tracking complete. Final score is ${scoreRef.current} points with ${trackingCoherence}% tracking coherence. `;
    if (trackingCoherence < 65) {
      advice += "Your motion compensation coherence is low. Drag your mouse counter to the vehicle translation direction to lock your tracking sweep. ";
    } else {
      advice += "Excellent vehicle speed compensation and recoil stabilization. ";
    }

    if (stabilityIndex < 70) {
      advice += "You are suffering from off-road bump jitter. Prescribed roadmap: Spend 10 minutes in Smooth Pursuit Lab to build micro-adjust tracking, then retry.";
    } else {
      advice += "You are ready for competitive PUBG lobby drive-by scrims. Keep practicing to maintain reflexes.";
    }

    speakText(advice, true);
  }, [updateBestScore, trackingCoherence, stabilityIndex, speakText]);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      if (gameStateRef.current === 'playing' && isActiveRef.current) {
        timeLeftRef.current -= 1;
        setTimeLeft(timeLeftRef.current);
        if (timeLeftRef.current <= 0) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          endGame();
        }
      }
    }, 1000);
  }, [endGame]);

  // Main Canvas Loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false });
    
    const updateSize = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9/16);
      if (h > rr.height) { h = rr.height; w = h * (16/9); }
      
      cvs.width = w; cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width - w)/2}px`;
      cvs.style.top = `${(rr.height - h)/2}px`;
      
      if (w > 0 && h > 0) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    let lt = performance.now();
    let bumpTimeRef = 0;
    
    // Spawn initial dummies spaced along the road
    worldOffsetRef.current = 0;
    targetsRef.current = [
      spawnDummy(800),
      spawnDummy(1400),
      spawnDummy(2000),
      spawnDummy(2600),
      spawnDummy(3200)
    ];

    function draw(ct) {
      if (!isActiveRef.current) { animationRef.current = requestAnimationFrame(draw); return; }
      
      let dt = (ct - lt) / 1000;
      lt = ct;
      if (dt > 0.1) dt = 0.1;

      // Update vehicle translation displacement
      worldOffsetRef.current += BASE_VEHICLE_SPEED * dt;

      // Skyline & Far mountain parallax calculation
      skyOffsetRef.current = (worldOffsetRef.current * 0.05) % cvs.width;
      mountainOffsetRef.current = (worldOffsetRef.current * 0.15) % cvs.width;
      fenceOffsetRef.current = (worldOffsetRef.current * 0.8) % cvs.width;

      // Vehicle bump generator (periodic off-road bumps)
      const bumpCycle = Math.sin(ct * 0.004);
      let isBumping = false;
      if (bumpCycle > 0.75) {
        isBumping = true;
        // high frequency jitter
        vehicleJitterRef.current = Math.sin(ct * 0.08) * 8;
        if (ct - bumpTimeRef > 3000) {
          playSound('bump');
          showFeedbackText('⚠️ OFF-ROAD BUMP JITTER', 'error');
          speakText('Off road bumps active. Stabilize tracking.', false);
          bumpTimeRef = ct;
          setAnalyticsData(prev => ({ ...prev, bumpMistakesCount: prev.bumpMistakesCount + 1 }));
        }
      } else {
        vehicleJitterRef.current = 0;
      }

      // Rifle Recoil viewport shaker
      let recoilShakeY = 0;
      let recoilShakeX = 0;
      if (isShootingRef.current) {
        recoilShakeY = (Math.random() - 0.5) * 5;
        recoilShakeX = (Math.random() - 0.5) * 4;
        setAnalyticsData(prev => ({ ...prev, totalShotsFired: prev.totalShotsFired + 1 }));
      }

      // DRAW SCENERY LAYER (Parallax background)
      ctx.fillStyle = "#090d16"; // deep dark sky
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Sky stars/glow (slowest)
      ctx.fillStyle = "#0c1527";
      ctx.fillRect(0, 100, cvs.width, cvs.height - 100);

      // Parallax Mountains/City outline
      ctx.fillStyle = "#0e182c";
      for (let m = 0; m < 3; m++) {
        const mx = -mountainOffsetRef.current + m * cvs.width;
        ctx.beginPath();
        ctx.moveTo(mx, cvs.height - 120);
        ctx.lineTo(mx + 200, cvs.height - 240);
        ctx.lineTo(mx + 400, cvs.height - 120);
        ctx.fill();
      }

      // Draw Road & Ground
      ctx.fillStyle = "#03050a";
      ctx.fillRect(0, cvs.height - 140, cvs.width, 140);
      ctx.fillStyle = "#0d1421";
      ctx.fillRect(0, cvs.height - 140, cvs.width, 4);

      // Parallax Fence lines (fast roadside references)
      ctx.strokeStyle = "rgba(239, 68, 68, 0.05)";
      ctx.lineWidth = 2;
      for (let f = 0; f < 25; f++) {
        const fx = -fenceOffsetRef.current + f * 100;
        ctx.beginPath();
        ctx.moveTo(fx, cvs.height - 140);
        ctx.lineTo(fx - 20, cvs.height);
        ctx.stroke();
      }

      // Draw Vehicle HUD boundary line (representing passenger car window)
      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(50, cvs.height - 30);
      ctx.lineTo(cvs.width - 50, cvs.height - 30);
      ctx.stroke();

      // Enforce spawning of dummies ahead of vehicle offset
      const lastDummy = targetsRef.current[targetsRef.current.length - 1];
      if (!lastDummy || lastDummy.worldX - worldOffsetRef.current < cvs.width) {
        const nextWorldX = lastDummy ? lastDummy.worldX + 600 : worldOffsetRef.current + 800;
        targetsRef.current.push(spawnDummy(nextWorldX));
      }

      // Update & Draw Roadside Dummies
      const remainingTargets = [];
      const ch = virtualCrosshair.current;

      targetsRef.current.forEach((t) => {
        // Screen position translated by vehicle displacement + vehicle vertical bump jitter
        const screenX = t.worldX - worldOffsetRef.current;
        const screenY = t.y + vehicleJitterRef.current + recoilShakeY;
        
        if (screenX < -50) {
          // Dummy passed by (missed if not cleared)
          if (!t.cleared) {
            missesRef.current += 1;
            setMissedHits(missesRef.current);
            playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
            showFeedbackText('⚠️ DUMMY ESCAPED', 'error');
            speakText('Target missed. Focus track sweep.');
            
            livesRef.current -= 1;
            setLives(livesRef.current);
            if (livesRef.current <= 0) {
              playSound('penalty'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
              // endGame();
            }
          }
        } else {
          remainingTargets.push(t);

          if (!t.cleared) {
            // Draw Dummy board
            ctx.shadowBlur = t.health < 40 ? 15 : 8;
            ctx.shadowColor = t.health < 40 ? "#ef4444" : "#10b981";
            ctx.fillStyle = t.health < 40 ? "rgba(239, 68, 68, 0.4)" : "rgba(16, 185, 129, 0.3)";
            ctx.strokeStyle = t.health < 40 ? "#ef4444" : "#10b981";
            ctx.lineWidth = 1.5;
            
            // Draw standing dummy body
            ctx.beginPath();
            ctx.rect(screenX - 12, screenY - 35, 24, 60);
            ctx.fill();
            ctx.stroke();

            // Head hitbox
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(screenX, screenY - 45, 10, 0, Math.PI*2);
            ctx.fill();

            // Tracking progress bar
            ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
            ctx.fillRect(screenX - 16, screenY + 32, 32, 4);
            ctx.fillStyle = "#10b981";
            ctx.fillRect(screenX - 16, screenY + 32, 32 * (1 - t.health/100), 4);
            
            ctx.shadowBlur = 0;

            // Tracking hit detection
            if (isShootingRef.current) {
              // Check alignment to dummy center (offsetted by recoil)
              const actualCrosshairX = ch.x + recoilShakeX;
              const actualCrosshairY = ch.y;

              const distance = Math.hypot(actualCrosshairX - screenX, actualCrosshairY - (screenY - 20));
              trackingTotalFramesRef.current += 1;

              if (distance <= TARGET_HITBOX_RADIUS) {
                // Tracking success tick
                trackingOnTargetFramesRef.current += 1;
                t.health = Math.max(0, t.health - 2.5); // deplete dummy health
                
                scoreRef.current += 5;
                setScore(scoreRef.current);
                
                if (Math.random() < 0.15) {
                  playSound('trackingTick');
                }

                if (t.health <= 0) {
                  t.cleared = true;
                  clearedDummiesRef.current += 1;
                  setSuccessfulHits(clearedDummiesRef.current);
                  scoreRef.current += 200; // dummy cleared bonus
                  setScore(scoreRef.current);
                  playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
                  showFeedbackText('🔥 DUMMY ELIMINATED', 'success');
                  speakText('Target down.');
                }
              }
            }
          } else {
            // Draw destroyed/cleared sparks
            ctx.fillStyle = "rgba(148, 163, 184, 0.2)";
            ctx.font = "bold 9px monospace";
            ctx.fillText("CLEARED", screenX, screenY);
          }
        }
      });
      targetsRef.current = remainingTargets;

      // Update telemetry indicators
      if (trackingTotalFramesRef.current > 0) {
        setTrackingCoherence(Math.round((trackingOnTargetFramesRef.current / trackingTotalFramesRef.current) * 100));
      }
      
      const jitterStability = isBumping ? 60 : 100;
      setStabilityIndex(jitterStability);

      // Sniper Scope Crosshair Reticle (Exact Pure 2D design)
      {
        const ch = virtualCrosshair.current;
        if (ch && ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
          const activeColor = pointerLocked ? '#00ff88' : '#ffbb00';
          ctx.strokeStyle = activeColor;
          
          // Outer Scope Ring
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ch.x, ch.y, 20, 0, Math.PI * 2);
          ctx.stroke();

          // Inner Scope Crosshairs
          ctx.beginPath();
          ctx.lineWidth = 1.5;
          const innerGap = 8;
          ctx.moveTo(ch.x, ch.y - 20); ctx.lineTo(ch.x, ch.y - innerGap); // Top
          ctx.moveTo(ch.x, ch.y + 20); ctx.lineTo(ch.x, ch.y + innerGap); // Bottom
          ctx.moveTo(ch.x - 20, ch.y); ctx.lineTo(ch.x - innerGap, ch.y); // Left
          ctx.moveTo(ch.x + 20, ch.y); ctx.lineTo(ch.x + innerGap, ch.y); // Right
          ctx.stroke();
          
          // Center Dot
          ctx.fillStyle = activeColor;
          ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
        }
      }

      // Draw vehicle muzzle flash if shooting
      if (isShootingRef.current) {
        ctx.fillStyle = "rgba(253, 224, 71, 0.4)";
        ctx.beginPath();
        ctx.arc(cvs.width / 2, cvs.height - 40, 20 + Math.random()*15, 0, Math.PI*2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    }
    animationRef.current = requestAnimationFrame(draw);
    return () => { 
      cancelAnimationFrame(animationRef.current); 
      window.removeEventListener('resize', updateSize); 
    };
  }, [gameState, pointerLocked]);

  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('pubg-drive-by');

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
    
    setAnalyticsData({ activeTrackingFrames: 0, onTargetFrames: 0, bumpMistakesCount: 0, totalDummiesCleared: 0, totalShotsFired: 0 });
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setSuccessfulHits(0); setMissedHits(0);
    setTrackingCoherence(100); setStabilityIndex(100);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    setAccuracy(100); setLives(5);
    isActiveRef.current = true; scoreRef.current = 0; clearedDummiesRef.current = 0; livesRef.current = 5;
    trackingTotalFramesRef.current = 0; trackingOnTargetFramesRef.current = 0;
    isShootingRef.current = false;
    targetsRef.current = [
      spawnDummy(800),
      spawnDummy(1400),
      spawnDummy(2000),
      spawnDummy(2600),
      spawnDummy(3200)
    ];
    worldOffsetRef.current = 0;
    
    startTimer();
    
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {}
    }
    speakText("Drive-by tracking initialized. Hold left click to spray down roadside dummies while compensating for vehicle motion.", true);
  }, [startTimer, speakText]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      
      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-red-400 font-bold">S+ PUBG Passenger Drive-By</span></li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-950/30 border border-blue-500/25 text-blue-400 rounded-xl shadow-lg shadow-blue-500/10">
                <Crosshair className="w-7 h-7 animate-pulse text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-blue-500 via-white to-slate-400 bg-clip-text text-transparent">
                  S+ PUBG Passenger Drive-By
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 animate-pulse">
                  {pointerLocked ? '🟢 ELITE CALIBRATION ACTIVE' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • DRIVE-BY TRACK
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
            
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-blue-500 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-4 h-4" />
                  DRIVE-BY MOTION PHYSICS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">1.</span>
                    <span>Hold **Left Click** to fire your rifle spray. Viewport recoil rattle will shake your crosshair.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">2.</span>
                    <span>The vehicle is moving at **400 px/s**. Stationary dummies fly past. Drag mouse in opposite direction to track them.</span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-300 animate-pulse">
                    <span className="text-blue-500 font-bold">★</span>
                    <span>Keep cursor locked on dummies to deplete their health. Clearing a dummy awards a **200pt bonus**.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between items-center text-[10px]">
                <span className="text-slate-550 uppercase">Voice Guide:</span>
                <button 
                  onClick={() => setVoiceEnabled(!voiceEnabled)} 
                  className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition ${voiceEnabled ? 'bg-green-950 text-green-400 border border-green-500/30' : 'bg-slate-900 text-slate-550 border border-slate-800'}`}
                >
                  {voiceEnabled ? 'SPEAK_ON' : 'SPEAK_OFF'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Calculator className="w-4 h-4 text-blue-500" />
                  CALIBRATE VEHICLE Aim SENSITIVITY
                </h3>
                
                <div className="mb-6 p-4 bg-slate-950/45 rounded border border-slate-900">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Universal Sens</label>
                    <span className="text-green-400 font-mono text-xs font-bold">{universalSens.toFixed(2)}x</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="3.0" step="0.05" 
                    value={universalSens} 
                    onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500" 
                  />
                </div>

                <div className="p-4 bg-slate-950/80 rounded border border-slate-900 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-550 block uppercase">360° Physical Distance</span>
                    <span className="text-white font-bold text-sm">{cmPer360} cm / 360°</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-550 block uppercase">Vehicle Translation Velocity</span>
                    <span className="text-blue-400 font-bold">400 px/s (Constant)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-6">
                <div>
                  <span className="text-[10px] text-slate-550 block uppercase">Personal Best Record</span>
                  <span className="text-white font-bold text-lg flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    {bestScore} Points
                  </span>
                </div>
                <button
                  onClick={startGame}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 uppercase tracking-wider transition animate-pulse"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Launch Drive-By Training
                </button>
              </div>
            </div>
          </div>
          </div>
        )}

        {/* Playing Screen */}
        <div className={isFullscreen ? "w-full h-full" : "block"}>
          {gameState === 'playing' && (
            <div className="flex justify-between items-center bg-slate-950/90 border border-slate-800 rounded-lg p-3 mb-3 text-[11px] uppercase tracking-wider font-mono">
              <div className="flex gap-4">
                <span>Score: <strong className="text-blue-400">{score}</strong></span>
                <span>Time: <strong className="text-white">{timeLeft}s</strong></span>
                <span>Lives: <strong className="text-red-500">{'♥'.repeat(Math.max(0, lives))}</strong></span>
              </div>
              <div className="flex gap-4">
                <span>Dummies Cleared: <strong className="text-yellow-500">{successfulHits}</strong></span>
                <span>Tracking Coherence: <strong className={trackingCoherence >= 70 ? "text-green-400" : "text-red-400"}>{trackingCoherence}%</strong></span>
                <span>Off-Road Jitter: <strong className={stabilityIndex >= 80 ? "text-green-400" : "text-red-400 animate-pulse"}>{stabilityIndex === 100 ? 'NONE' : 'HEAVY BUMPS'}</strong></span>
              </div>
            </div>
          )}

          <div 
            ref={containerRef} 
            className={isFullscreen 
              ? "w-full h-full bg-[#020306] relative overflow-hidden flex items-center justify-center cursor-none" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#020306] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD */}
            {gameState === 'playing' && (
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-3 bg-slate-950/85 border border-slate-850 rounded-xl px-4 py-3 backdrop-blur-md max-w-xs sm:max-w-sm transition-all duration-300 shadow-xl">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activeCoach?.avatarColor || 'from-cyan-600 to-blue-700'} flex items-center justify-center text-xl shrink-0 border border-white/10 shadow-md ${coachSpeaking ? 'ring-2 ring-red-500/50 scale-105 animate-pulse' : 'opacity-80'}`}>
                  {activeCoach?.avatarText || '🤖'}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-red-500 font-extrabold uppercase tracking-widest flex items-center gap-1">
                    🟢 COACH {activeCoach?.name || 'ATHENA'} GUIDANCE
                  </span>
                  <p className="text-[10px] font-mono text-slate-350 leading-relaxed mt-0.5 max-w-[220px]">
                    {coachSubtitle ? `"${coachSubtitle}"` : '"Awaiting vehicle tracking start..."'}
                  </p>
                </div>
              </div>
            )}

            {/* Feed Notifications overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center gap-2 overflow-hidden select-none z-10">
              {feedbacks.map((f) => (
                <div 
                  key={f.id} 
                  className={`px-5 py-2.5 rounded border text-sm font-extrabold animate-bounce shadow-lg uppercase tracking-wider backdrop-blur-sm ${
                    f.type === 'success' 
                      ? 'bg-green-950/90 border-green-500/30 text-green-400' 
                      : f.type === 'warn'
                        ? 'bg-yellow-950/90 border-yellow-500/30 text-yellow-400'
                        : 'bg-red-950/90 border-red-500/30 text-red-400'
                  }`}
                >
                  {f.text}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center text-[10px] text-slate-550 flex items-center justify-center gap-4">
            <span>🖱 Hold Left Click to spray-track roadside dummies. Exit using <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd>.</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/85 border border-blue-500/20 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto w-full shadow-2xl">
            <h2 className="text-xl font-bold text-blue-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse">
              <Award className="w-5 h-5 text-yellow-500" />
              S+ PUBG DRIVE-BY TRACKING COMPLETE
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-550 block uppercase">Final Score:</span>
                    <span className="text-white font-bold text-xl">{score} PTS</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Dummies Cleared</span>
                    <span className="text-white font-bold text-sm">{successfulHits}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Accuracy %</span>
                    <span className="text-white font-bold text-sm">{accuracy}%</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-550 uppercase">Tracking Coherence</span>
                    <span className="text-green-400 font-bold">{trackingCoherence}%</span>
                  </div>
                  <div className="text-[10px] text-slate-550 leading-normal">
                    Percentage of frames keeping the crosshair directly inside the moving roadside hitboxes.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    VEHICLE BUMP DIAGNOSTICS
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-550">Off-Road Bumps Encountered:</span>
                      <span className="text-red-400 font-bold">{analyticsData.bumpMistakesCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Rifle Spray Shots Fired:</span>
                      <span className="text-white font-bold">{analyticsData.totalShotsFired}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* S+ AI Assistant Coach Performance Diagnostics */}
            <div className="bg-[#080d1a] border border-blue-500/10 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                S+ AI COACH TELEMETRY DIAGNOSTICS & ROADMAP
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                <div className="space-y-2 border-r border-slate-900 pr-6">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Dynamic Motion Diagnostics:</p>
                  <ul className="space-y-2 list-disc pl-4">
                    {trackingCoherence >= 70 ? (
                      <li className="text-green-400">🔥 Motion Locking: Exceptional tracking coherence. You sweep drag rate aligns perfectly with relative vehicle translation.</li>
                    ) : (
                      <li className="text-red-400">⚠️ Motion Deficit: Coherence of {trackingCoherence}% indicates cursor drag drift. Drag against vehicle speed with consistent force.</li>
                    )}
                    {analyticsData.bumpMistakesCount < 3 ? (
                      <li className="text-green-400">🔥 Stabilizer Coherence: Excellent vertical jitter absorption during off-road vehicle bumps.</li>
                    ) : (
                      <li className="text-yellow-500">⚠️ Jitter Absorption Deficit: Suffered accuracy losses during rough off-road sections. Avoid tensing wrist during bump shakes.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Prescribed Practice Roadmap:</p>
                    <p className="text-slate-350 leading-relaxed font-sans">
                      {trackingCoherence < 70 ? (
                        "Roadmap Prescribed: Spend 10 minutes in Unpredictable Strafe Tracking to lock in linear compensation vectors, then return to drive-bys."
                      ) : (
                        "Roadmap Prescribed: Drive-by calibration fully complete. Practice PUBG Bullet Lead and Drop next to balance projectile drop with target movement vectors."
                      )}
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-block bg-blue-950/40 text-blue-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-blue-550/20 shadow-md animate-pulse">
                      S+ PERFORMANCE OVERALL: {(score * (trackingCoherence / 100) * 1.5).toFixed(0)} INDEX PTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              <button
                onClick={startGame}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/20"
              >
                <RefreshCw className="w-4.5 h-4.5" />
                Train Again
              </button>
              
              <Link href="/drills/fps" className="w-full sm:w-auto">
                <button
                  className="w-full px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  Return to Sector HQ
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
