'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { 
  Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Check, ScanEye,
  Lock, AlertCircle, RefreshCw,
  Crosshair, Cpu, Award, Play, ChevronRight, Home, Calculator, Sparkles
} from 'lucide-react';

const DRILL_DURATION = 60; // 60 seconds

export default function AwarenessDrillClient() {



  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);

  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [targetsHit, setTargetsHit] = useState(0);
  const [missedTargets, setMissedTargets] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [bestReaction, setBestReaction] = useState(0);
  const [avgReaction, setAvgReaction] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [lives, setLives] = useState(3);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [universalSens, setUniversalSens] = useState(1.0);
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

  const [currentTargetSize, setCurrentTargetSize] = useState(28);
   // valorant, cs2, apex, overwatch, fortnite
  
  
  
  
  // High-performance mutable refs (Esports Grade)
  const virtualCrosshair = useRef({ x: 0, y: 0, expand: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const crosshairInitRef = useRef(false);
  
  
  // Game Logic Refs
  const targetRef = useRef({ x: 0, y: 0, r: 22, active: false, maxTtl: 850 });
  const lastSpawnSideRef = useRef(null); // Force alternating left/right 180s
  const spawnTimerRef = useRef(0);
  const targetSpawnTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  const livesRef = useRef(3);
  const bestComboRef = useRef(0);
  const targetsHitRef = useRef(0);
  const missedTargetsRef = useRef(0);
  const totalReactionTimeRef = useRef(0);

  // VFX Refs
  const particlesRef = useRef([]);
  const floatingTextsRef = useRef([]);
  const hitMarkersRef = useRef([]);
  const screenShakeRef = useRef(0);
  
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
        universalSens,
        setUniversalSens,
        'universal',
        800,
        coachId,
        voiceEnabled,
        priority,
        setCoachSubtitle,
        setCoachSpeaking
      });
    } catch (e) {
      console.error("Coach speakText error:", e);
    }
  }, [voiceEnabled, universalSens, 'universal', 800]);

  const checkSensitivityAdjustment = useCallback((type, extra = {}) => {
    const currentGameState = typeof gameState !== 'undefined' ? gameState : 'playing';
    if (currentGameState !== 'playing') return;
    try {
      const coachId = localStorage.getItem('activeFpCoach') || 'athena';
      handleCoachFeedback(type, {
        universalSens,
        setUniversalSens,
        'universal',
        800,
        coachId,
        voiceEnabled,
        extra,
        setSensAdjustedAlert
      });
    } catch (e) {
      console.error("Coach checkSensitivityAdjustment error:", e);
    }
  }, [universalSens, gameState, 'universal', 800, voiceEnabled]);


  // Auto-save user calibration preferences
  

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if(!isFullscreen){
        const el = pageRef.current;
        if(el?.requestFullscreen){
          el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
          setIsFullscreen(true);
        }
      } else {
        if(document.fullscreenElement) await document.exitFullscreen();
        setIsFullscreen(false);
      } 
    } catch(e){} 
  }, [isFullscreen]);

  const resetGame = useCallback(() => { 
    if(timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    if(animationRef.current) cancelAnimationFrame(animationRef.current); 
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start'; 
    setScore(0); setTargetsHit(0); setMissedTargets(0); setCombo(0); setBestCombo(0); 
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION); setBestReaction(0); setAccuracy(100); setLives(3);
    targetRef.current = {x:0, y:0, r:22, active:false, maxTtl: 850}; crosshairInitRef.current = false;
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

  // End Game Calculation
  const endGame = useCallback(() => {
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    isActiveRef.current = false;
    const t = targetsHitRef.current + missedTargetsRef.current;
    setAccuracy(t === 0 ? 100 : Math.round((targetsHitRef.current / t) * 100));
    setAvgReaction(targetsHitRef.current === 0 ? 0 : Math.round(totalReactionTimeRef.current / targetsHitRef.current));
    updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('180-awareness', {
        score: scoreRef.current,
        accuracy: accuracy,
        reactionTimeMs: avgReaction || null,
        trackingAccuracy: null,
        comboMax: bestCombo,
        overshoots: 0,
        undershoots: 0,
        sensitivity: universalSens,
        800,
        'universal',
        duration: DRILL_DURATION
      });
    } catch (e) {}

    document.exitPointerLock();
  }, [updateBestScore]);

  const startTimer = useCallback(() => { 
    if(timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    timerIntervalRef.current = setInterval(() => {
      if(gameStateRef.current === 'playing' && isActiveRef.current){
        timeLeftRef.current -= 1;
        setTimeLeft(timeLeftRef.current);
        if(timeLeftRef.current <= 0){
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          endGame();
        }
      }
    }, 1000); 
  }, [endGame]);

  // VFX
  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color
      });
    }
  };

  const createFloatingText = (x, y, text, color) => {
    floatingTextsRef.current.push({ x, y, text, color, life: 1.0, vy: -1.4 });
  };

  const createHitMarker = (x, y) => {
    hitMarkersRef.current.push({ x, y, life: 1.0 });
  };

  const handleMiss = useCallback((r) => { 
    if(!isActiveRef.current) return; 
    
    screenShakeRef.current = 12; 
    missedTargetsRef.current++;
    setMissedTargets(missedTargetsRef.current);
    comboRef.current = 0;
    setCombo(0); 
    
    if(livesRef.current > 0){
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
      showFeedbackText(`✗ ${r}`, 'error');
    } 
    
    if(livesRef.current === 0){
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      playSound('penalty'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
      showFeedbackText('✗ LIFE OUT! -1 Point', 'error');
    } 
  }, [playSound, showFeedbackText]);

  const handleShot = useCallback(() => { 
    if(gameStateRef.current !== 'playing' || !isActiveRef.current || !crosshairInitRef.current) return; 
    
    virtualCrosshair.current.expand = 8;
    const ch = virtualCrosshair.current, t = targetRef.current; 
    
    if(t.active){ 
      const hitTolerance = t.r + 15; 
      const dist = Math.hypot(ch.x - t.x, ch.y - t.y); 
      
      if(dist < hitTolerance){ 
        const rt = performance.now() - targetSpawnTimeRef.current; 
        totalReactionTimeRef.current += rt;

        scoreRef.current += 1;
        setScore(scoreRef.current);
        targetsHitRef.current++;
        setTargetsHit(targetsHitRef.current); 
        comboRef.current++;
        setCombo(comboRef.current);
        
        if(comboRef.current > bestComboRef.current){
          bestComboRef.current = comboRef.current;
          setBestCombo(comboRef.current);
        } 
        if(bestReaction === 0 || rt < bestReaction) setBestReaction(Math.round(rt)); 
        
        createExplosion(t.x, t.y, '#00ff88');
        createHitMarker(ch.x, ch.y);
        createFloatingText(t.x, t.y, `${Math.round(rt)}ms`, '#ffffff');

        playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
        
        if(comboRef.current % 5 === 0){
          playSound('combo');
          showFeedbackText(`🔥 COMBO STREAK x${comboRef.current}!`, 'success');
        } 
        
        t.active = false;
        spawnTimerRef.current = 0; 
      } else { 
        handleMiss('Aim Slip (Missed)'); 
        createExplosion(ch.x, ch.y, '#ff4444');
      } 
    } else { 
      handleMiss('Prefire (No Active Target)'); 
    } 
  }, [bestReaction, handleMiss, playSound, showFeedbackText]);

  useEffect(() => { 
    const h = (e) => { 
      if(e.target.tagName === 'BUTTON' || e.target.closest('button')) return; 
      if(gameState === 'playing' && document.pointerLockElement) {
        e.preventDefault(); 
        handleShot();
      } 
    }; 
    document.addEventListener('mousedown', h); 
    return () => document.removeEventListener('mousedown', h); 
  }, [gameState, handleShot]);

  // Main Render Loop
  useEffect(() => { 
    if(gameState !== 'playing') return; 
    const cvs = canvasRef.current; if(!cvs) return; 
    const ctx = cvs.getContext('2d', { alpha: false });
    
    const update = () => {
      const cr = containerRef.current; if(!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9/16);
      if(h > rr.height){ h = rr.height; w = h * (16/9); }
      cvs.width = w; cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width - w) / 2}px`;
      cvs.style.top = `${(rr.height - h) / 2}px`;
      if (w > 0 && h > 0 && (!crosshairInitRef.current || (virtualCrosshair.current.x === 0 && virtualCrosshair.current.y === 0))) {
        virtualCrosshair.current = { x: w/2, y: h/2, expand: 0 };
        crosshairInitRef.current = true;
      };
    }; 
    
    update(); 
    window.addEventListener('resize', update); 
    let lt = performance.now(); 
    
    const loop = (now) => {
      if(!isActiveRef.current) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      } 
      
      const dt = (now - lt) / 1000; 
      lt = now; 
      const { width: cw, height: ch } = canvasSizeRef.current;

      // Update Screen Shake
      if (targetRef.current.active) {
        const timeAlive = now - targetSpawnTimeRef.current;
        if (timeAlive > targetRef.current.maxTtl) {
           handleMiss('Target Expired (Too Slow)');
           createExplosion(targetRef.current.x, targetRef.current.y, '#ff4444');
           createFloatingText(targetRef.current.x, targetRef.current.y, "TIMEOUT", '#ff4444');
           targetRef.current.active = false;
           spawnTimerRef.current = 0;
        }
      }

      // Spawner logic (alternating 180s)
      if(!targetRef.current.active && cw > 0){
        spawnTimerRef.current += dt;
        if(spawnTimerRef.current > 0.18){ // 180ms delay
          let side;
          if (lastSpawnSideRef.current === null) {
            side = Math.random() > 0.5 ? 0.08 : 0.92;
          } else {
            side = lastSpawnSideRef.current === 0.08 ? 0.92 : 0.08;
          }
          lastSpawnSideRef.current = side;

          targetRef.current.x = cw * side;
          targetRef.current.y = ch * (0.2 + Math.random() * 0.6);
          
          let targetRadius = 22;
          let baseTtl = 850;
          
          if ('universal' === 'valorant' || 'universal' === 'cs2') {
            targetRadius = 10; // small headshot target
            baseTtl = 700; // tighter timing
          } else if ('universal' === 'apex' || 'universal' === 'overwatch') {
            targetRadius = 18;
            baseTtl = 1100;
          } else { // fortnite
            targetRadius = 14;
            baseTtl = 850;
          }

          targetRef.current.r = targetRadius;
          const speedModifier = Math.min(300, comboRef.current * 10);
          targetRef.current.maxTtl = baseTtl - speedModifier; 
          
          targetRef.current.active = true;
          targetSpawnTimeRef.current = performance.now();
          playSound('spawn');
          spawnTimerRef.current = 0;
        }
      } 

      // RENDER
      ctx.save();
      if (screenShakeRef.current > 0) {
        const sx = (Math.random() - 0.5) * screenShakeRef.current;
        const sy = (Math.random() - 0.5) * screenShakeRef.current;
        ctx.translate(sx, sy);
        screenShakeRef.current *= 0.85;
        if (screenShakeRef.current < 0.5) screenShakeRef.current = 0;
      }

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cw, ch); 

      // Perspective Grid lines
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.04)';
      ctx.lineWidth = 1; 
      const centerX = cw / 2;
      const centerY = ch / 2;
      ctx.beginPath();
      for(let i = -8; i <= 8; i++) {
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + i * 220, ch);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + i * 220, 0);
      }
      ctx.stroke();

      // Spawn zones indicators
      ctx.fillStyle = 'rgba(0, 255, 136, 0.02)';
      ctx.fillRect(0, 0, cw * 0.12, ch);
      ctx.fillRect(cw * 0.88, 0, cw * 0.12, ch);

      // Center visual threshold line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.setLineDash([5, 15]);
      ctx.beginPath();
      ctx.moveTo(cw / 2, 0); ctx.lineTo(cw / 2, ch);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw active target
      if(targetRef.current.active){ 
        const t = targetRef.current; 
        const timeAlive = now - targetSpawnTimeRef.current;
        const timeRatio = 1 - Math.min(1, timeAlive / t.maxTtl);

        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff88'; 
        ctx.fillStyle = '#0a0d16';
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0; 
        
        ctx.fillStyle = '#00ff88';
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r * 0.35, 0, Math.PI * 2);
        ctx.fill();

        // TTK indicator outer ring
        const ringColor = timeRatio > 0.5 ? '#00ff88' : (timeRatio > 0.25 ? '#fbbf24' : '#ef4444');
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r + 4 + (timeRatio * 10), 0, Math.PI*2);
        ctx.stroke();
      } 

      // Render VFX particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.2;
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      }

      // Render hit markers
      ctx.lineWidth = 2;
      for (let i = hitMarkersRef.current.length - 1; i >= 0; i--) {
        const hm = hitMarkersRef.current[i];
        hm.life -= dt * 3.5;
        if (hm.life <= 0) {
          hitMarkersRef.current.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = hm.life;
        ctx.strokeStyle = '#ffffff';
        const s = 6 + (1 - hm.life) * 6;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Render Floating Text
      ctx.font = 'bold 13px Inter, monospace';
      ctx.textAlign = 'center';
      for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatingTextsRef.current[i];
        ft.y += ft.vy;
        ft.life -= dt * 1.5;
        if (ft.life <= 0) {
          floatingTextsRef.current.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = ft.life;
        ctx.fillStyle = ft.color;
        ctx.fillText(ft.text, ft.x, ft.y);
      }
      ctx.globalAlpha = 1.0;

      // Draw custom reticle
      const chRef = virtualCrosshair.current; 
      if(chRef.expand > 0) chRef.expand -= dt * 45;
      if(chRef.expand < 0) chRef.expand = 0;

      if (chRef && canvasRef.current && chRef.x > 0 && chRef.x < canvasRef.current.width && chRef.y > 0 && chRef.y < canvasRef.current.height) {
        const color = pointerLocked ? '#00ff88' : '#ffbb00';
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(chRef.x, chRef.y, 8, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(chRef.x - 15, chRef.y); ctx.lineTo(chRef.x - 5, chRef.y);
        ctx.moveTo(chRef.x + 5, chRef.y); ctx.lineTo(chRef.x + 15, chRef.y);
        ctx.moveTo(chRef.x, chRef.y - 15); ctx.lineTo(chRef.x, chRef.y - 5);
        ctx.moveTo(chRef.x, chRef.y + 5); ctx.lineTo(chRef.x, chRef.y + 15);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(chRef.x, chRef.y, 2, 0, Math.PI * 2); ctx.fill();
      } 
      
      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    }; 
    
    animationRef.current = requestAnimationFrame(loop); 
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', update);
    }; 
  }, [gameState, pointerLocked, handleMiss, 'universal']);

  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('180-awareness');
 
    if(timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    
    try {
      const el = pageRef.current;
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
        setIsFullscreen(true);
      }
    } catch(e) {
      console.warn("Fullscreen request blocked", e);
    }
    
    setGameState('playing');
    gameStateRef.current = 'playing'; 
    setScore(0); setTargetsHit(0); setMissedTargets(0); setCombo(0); setBestCombo(0); 
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION); setBestReaction(0); setAccuracy(100); setAvgReaction(0);
    setLives(3);
    
    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0; livesRef.current = 3; 
    targetsHitRef.current = 0; missedTargetsRef.current = 0; totalReactionTimeRef.current = 0;
    lastSpawnSideRef.current = null;
    
    targetRef.current = {x:0, y:0, r:22, active:false, maxTtl: 850};
    spawnTimerRef.current = 0; crosshairInitRef.current = false; 
    
    particlesRef.current = [];
    floatingTextsRef.current = [];
    hitMarkersRef.current = [];

    startTimer(); 
    
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitRef.current = true; 
  }, [startTimer, requestPointerLock]);

  const avgReactionTimeValue = avgReaction || 0;

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(0,255,136,0.03)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {/* Navigation Breadcrumb */}
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-red-400 font-bold">180° Awareness Pro</span></li>
            </ol>
          </nav>
        )}

        {/* Drill Header */}
        {!isFullscreen && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-950/30 border border-green-500/20 text-green-400 rounded-xl">
                <Target className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  180° Awareness Pro
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURING' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • ALTERNATING THREAT SPANS
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
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
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-green-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-4 h-4" />
                  DRILL MECHANICS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">1.</span>
                    <span>Hold your mouse at the center dashboard. Targets spawn strictly at 8% and 92% screen bounds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">2.</span>
                    <span>Flick and shoot the target immediately. The outer ring decays showing remaining time.</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-300">
                    <span className="text-green-400 font-bold">★</span>
                    <span>**Visual threat sorting**: Use pure peripheral vision to detect spawning nodes. Force long sweeps.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-550 leading-normal">
                Trains wide-angle snap coordination and reaction thresholds.
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Calculator className="w-4 h-4 text-green-400" />
                  TACTICAL SENSITIVITY CALIBRATION
                </h3>
                  <div className="mb-6 p-4 bg-slate-950/45 rounded border border-slate-900">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Sensitivity</label>
                      <span className="text-red-400 font-mono text-xs font-bold">{universalSens.toFixed(2)}x</span>
                    </div>
                    <input type="range" min="0.1" max="3.0" step="0.05" value={universalSens} onChange={(e) => setUniversalSens(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg accent-red-500 cursor-pointer" />
                  </div>

                  <div className="mb-6 p-4 bg-slate-950/45 rounded border border-slate-900">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Target Size</label>
                      <span className="text-red-400 font-mono text-xs font-bold">{currentTargetSize}px</span>
                    </div>
                    <input type="range" min="10" max="50" step="2" value={currentTargetSize} onChange={(e) => setCurrentTargetSize(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg accent-red-500 cursor-pointer" />
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
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 uppercase tracking-wider transition animate-pulse"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Launch Fullscreen Training
                </button>
              </div>
            </div>
          </div>
          </div>
        )}

        {/* Playing Screen */}
        <div className={isFullscreen ? "w-full h-full" : "block"}>
          {/* Large Esports HUD Telemetry */}
          

          <div 
            ref={containerRef} 
            className={isFullscreen 
              ? "w-full h-full bg-[#050811] relative overflow-hidden flex items-center justify-center cursor-none" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#050811] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            


            

            {/* Feed Overlay */}
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

          <div className="mt-4 text-center text-[10px] text-slate-500 flex items-center justify-center gap-4">
            <span>🖱 Alternate snapping between screen edges.</span>
            <span>• Hit targets before the timer ring shrinks to zero.</span>
            <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded font-sans text-[10px]">ESC</kbd> to exit.</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-green-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              180° THREAT EVALUATION COMPLETED
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-550 block uppercase">Final Hits Score:</span>
                    <span className="text-white font-bold text-xl">{score} PTS</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Max Combo</span>
                    <span className="text-white font-bold text-sm">{bestCombo} Hits</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Accuracy %</span>
                    <span className="text-white font-bold text-sm">{accuracy}%</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-550 uppercase">Avg Reaction Time</span>
                    <span className="text-green-400 font-bold">{avgReactionTimeValue} ms</span>
                  </div>
                  <div className="text-[10px] text-slate-550 leading-normal">
                    Flicking 180 degrees requires long physical sweep coordination. Pro athletes average under 220ms.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    COMPASS METRICS
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-550">Successful Hits:</span>
                      <span className="text-green-400 font-bold">{targetsHit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Missed Flicks:</span>
                      <span className="text-red-400 font-bold">{missedTargets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Best Reaction Speed:</span>
                      <span className="text-cyan-400 font-bold">{bestReaction || '-'} ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Coach Performance Diagnosis */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-green-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-500 animate-pulse" />
                AI COACH DIAGNOSTIC Prescript
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                <div className="space-y-2 border-r border-slate-900 pr-6">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Sensory Index:</p>
                  <ul className="space-y-2 list-disc pl-4">
                    {accuracy >= 80 ? (
                      <li className="text-green-400">🔥 Elite Saccadic Vision: Outstanding spatial location acquisition on targets spawning at peripheral bounds.</li>
                    ) : (
                      <li className="text-yellow-400">⚠️ Peripheral Blurring: Your accuracy is dropping when scanning extreme sides. Slow down flicks to secure targets.</li>
                    )}
                    {avgReactionTimeValue > 0 && avgReactionTimeValue <= 250 ? (
                      <li className="text-green-400">⚡ Hyper-Fast Snaps: Long movement reflex speeds match Tier-1 professional baseline metrics.</li>
                    ) : (
                      <li className="text-slate-450">⏳ Snap Inertia: Slower average reaction on edge targets. Focus on moving wrist in one linear swipe.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Esports Conditioning Prescription:</p>
                    <p className="text-slate-350 leading-relaxed font-sans">
                      {accuracy < 80 ? (
                        "Do not try to move your eyes back and forth. Lock your gaze strictly on the center visual threshold, and use peripheral cues to guide your wrist coordinates."
                      ) : (
                        "Excellent wide flicks. Upgrade the calibration index to Apex Legends or Overwatch modes to train muscle control at higher velocity movement scales."
                      )}
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-block bg-green-950/40 text-green-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-green-500/20 shadow-md">
                      AWARENESS INDEX: {Math.round(score * (accuracy / 100) * 10)} INDEX PTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              <button
                onClick={startGame}
                className="w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
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