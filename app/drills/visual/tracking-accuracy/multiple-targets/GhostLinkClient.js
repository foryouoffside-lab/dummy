'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  Zap, ZapOff, Volume2, VolumeX,
  RefreshCw, GraduationCap,
  TrendingUp, Share2, Brain, AlertTriangle,
  LogOut
} from 'lucide-react';
import useDrillFlash from '../../../../../lib/useDrillFlash';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import DrillFlashOverlay from '../../../../../components/drill/DrillFlashOverlay';
import DrillRuleItem from '../../../../../components/drill/DrillRuleItem';
import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
import { drawTacticalTarget } from '../../../../../lib/canvasFx';
import { getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

const STORAGE_KEY = 'skilldrills_visual_multiple_targets_v1';
const LEGACY_BEST_KEY = 'ghostLinkBestScore'; // pre-migration key — read once so returning players keep their best score
const ELITE_SCORE = 60; // TARGET_COUNT(3) * HIT_POINTS(20), a perfect round

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { bestScore: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
    const legacyBest = parseInt(localStorage.getItem(LEGACY_BEST_KEY) || '0', 10) || 0;
    return { bestScore: legacyBest, bestLevel: Math.max(1, Math.floor(legacyBest / 30) + 1), totalSessions: 0 };
  } catch (e) {
    return { bestScore: 0, bestLevel: 1, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// ==========================================
// ERROR BOUNDARY
// ==========================================
class GameErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('Ghost-Link Error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/95 rounded-xl z-50 border border-purple-500/30">
          <div className="text-center p-6 max-w-sm">
            <AlertTriangle className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white text-lg font-bold mb-2">Memory Engine Desync</h3>
            <p className="text-gray-400 text-sm mb-4">The visual engine encountered a frame error. Let&apos;s reboot the runtime.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]">Restart Sequence</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function GhostLinkClient({ copy } = {}) {
  // === UI State ===
  const [openAccordion, setOpenAccordion] = useState(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // === Drill State Machine (matches every other drill: start -> countdown -> playing -> gameOver) ===
  const [gameState, setGameState] = useState('start');
  const [countdownValue, setCountdownValue] = useState(3);
  const [bestScore, setBestScore] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    correctCount: 0,
    errors: 0,
    finalLevel: 1,
    grade: null,
  });
  const countdownTimeoutsRef = useRef([]);
  const bestScoreRef = useRef(0);
  useEffect(() => { bestScoreRef.current = bestScore; }, [bestScore]);

  // === Drill Configurations ===
  const [drillDuration, setDrillDuration] = useState(60);
  const [ballSpeed, setBallSpeed] = useState(5);
  const [totalBalls, setTotalBalls] = useState(8);

  // === Game State (Synchronized with Refs for 60FPS loop) ===
  const [customScore, setCustomScore] = useState(0);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(60);
  const [phase, setPhase] = useState("MEMORIZE");
  const [accuracy, setAccuracy] = useState(100);

  // Sync Bridges (Solves tearing during re-renders)
  const [selectedBalls, setSelectedBalls] = useState([]);
  const selectedBallsRef = useRef([]);
  const handleSetSelectedBalls = useCallback((val) => {
    const newVal = typeof val === 'function' ? val(selectedBallsRef.current) : val;
    selectedBallsRef.current = newVal;
    setSelectedBalls(newVal);
  }, []);

  const [showResults, setShowResults] = useState(false);
  const showResultsRef = useRef(false);
  const handleSetShowResults = useCallback((val) => {
    showResultsRef.current = val;
    setShowResults(val);
  }, []);

  const [correctCount, setCorrectCount] = useState(0);
  const correctCountRef = useRef(0);
  const handleSetCorrectCount = useCallback((val) => {
    correctCountRef.current = val;
    setCorrectCount(val);
  }, []);

  // === Standard Refs ===
  const customScoreRef = useRef(0);
  const localTimeRef = useRef(60);

  const ballsRef = useRef([]);
  const targetIndicesRef = useRef([]);
  const phaseRef = useRef("MEMORIZE");
  const memorizeTimerRef = useRef(2.0);
  
  const timerIntervalRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const isActiveRef = useRef(false);
  const hasInitializedRoundRef = useRef(false);
  const { flashes, triggerFlash } = useDrillFlash();

  // Updated Rules Constants
  const TARGET_COUNT = 3;
  const HIT_POINTS = 20;
  const MISS_PENALTY = 0;

  const gameStateRef = useRef(gameState);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  useEffect(() => {
    const saved = getSavedData();
    setBestScore(saved.bestScore || 0);
    setBestLevel(saved.bestLevel || 1);
  }, []);

  // Sound profiles mapped onto the shared canonical drillAudio calls.
  const playDrillSound = useCallback((profile) => {
    if (profile === 'select' || profile === 'memorize') {
      drillAudio.playCountdownTick();
    } else if (profile === 'deselect') {
      drillAudio.playTick();
    } else if (profile === 'bonus') {
      drillAudio.playHit();
    } else if (profile === 'fail') {
      drillAudio.playPenalty();
      triggerFlash();
    }
  }, [triggerFlash]);

  const setPhaseState = useCallback((newPhase) => {
    phaseRef.current = newPhase;
    setPhase(newPhase);
  }, []);

  const triggerIdentificationPhase = useCallback(() => {
    setPhaseState("IDENTIFY");
    isActiveRef.current = false;
    playDrillSound('select');
  }, [playDrillSound, setPhaseState]);

  // === Custom Clock Loop ===
  useEffect(() => {
    if (gameState !== 'playing') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      if (phaseRef.current === "TRACKING") {
        setLocalTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            triggerIdentificationPhase();
            localTimeRef.current = 0;
            return 0;
          }
          localTimeRef.current = prev - 1;
          return prev - 1;
        });
      }
    }, 1000);

    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [gameState, triggerIdentificationPhase]);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isActiveRef.current = false;

    setIsFullscreen(false);
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // === Core Drill Mechanics ===
  const initDrillVariables = useCallback((w, h) => {
    ballsRef.current = [];
    targetIndicesRef.current = [];
    handleSetSelectedBalls([]);
    handleSetShowResults(false);
    handleSetCorrectCount(0);

    setCustomScore(0);
    customScoreRef.current = 0;

    // Scale difficulty based on high score. Ball count is soft-capped (not removed
    // outright) because collisions are checked pairwise every frame — an unbounded
    // count would degrade FPS on lower-end devices well before it made the drill
    // meaningfully harder. 20 gives skilled players real headroom over the old cap of 13.
    const bestSc = bestScoreRef.current || 0;
    const dynamicBallsCount = Math.min(20, totalBalls + Math.floor(bestSc / 30));

    // Dynamic Size Optimization for Mobile Devices
    const currentRadius = w < 768 ? 12 : 22;

    const indices = [];
    while (indices.length < TARGET_COUNT) { 
      const idx = Math.floor(Math.random() * dynamicBallsCount); 
      if (!indices.includes(idx)) indices.push(idx); 
    }
    targetIndicesRef.current = indices;
    
    for (let i = 0; i < dynamicBallsCount; i++) { 
      const angle = Math.random() * Math.PI * 2; 
      ballsRef.current.push({ 
        x: currentRadius + Math.random() * (w - currentRadius * 2), 
        y: currentRadius + Math.random() * (h - currentRadius * 2), 
        r: currentRadius, 
        dx: Math.cos(angle), 
        dy: Math.sin(angle), 
        isTarget: targetIndicesRef.current.includes(i) 
      }); 
    }
    
    setPhaseState("MEMORIZE"); 
    memorizeTimerRef.current = 2.0;
    playDrillSound('memorize');
  }, [playDrillSound, totalBalls, setPhaseState, handleSetSelectedBalls, handleSetShowResults, handleSetCorrectCount]);

  // End Game Management & Grade Evaluation — mirrors every other drill's endGame shape
  const endGame = useCallback((finalScore, correct, errorCount) => {
    gameStateRef.current = 'gameOver';
    setGameState('gameOver');

    const finalAccuracy = Math.round((correct / TARGET_COUNT) * 100);
    const rating = getFpsScoreGrade(finalScore, ELITE_SCORE);
    const grade = {
      letter: rating.grade || rating.letter || 'C',
      label: rating.label || 'Master Tracker',
      color: rating.color || 'text-purple-400',
    };

    setAnalytics({
      accuracy: finalAccuracy,
      correctCount: correct,
      errors: errorCount,
      finalLevel: Math.max(1, Math.floor(finalScore / 30) + 1),
      grade,
    });

    const prevSaved = getSavedData();
    const isNewHigh = finalScore > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const newBestScore = Math.max(prevSaved.bestScore, finalScore);
    const updatedData = {
      bestScore: newBestScore,
      bestLevel: Math.max(prevSaved.bestLevel, Math.floor(newBestScore / 30) + 1),
      totalSessions: (prevSaved.totalSessions || 0) + 1,
    };
    saveData(updatedData);
    setBestScore(updatedData.bestScore);
    setBestLevel(updatedData.bestLevel);

    drillAudio.playSessionEnd();
  }, []);

  const calculateResults = useCallback(() => {
    let cCount = 0;
    let errors = 0;

    selectedBallsRef.current.forEach(idx => {
      if (targetIndicesRef.current.includes(idx)) cCount++;
      else errors++;
    });

    const netScore = Math.max(0, (cCount * HIT_POINTS) - (errors * MISS_PENALTY));

    handleSetCorrectCount(cCount);
    setCustomScore(netScore);
    customScoreRef.current = netScore;
    setAccuracy(Math.round((cCount / TARGET_COUNT) * 100));
    handleSetShowResults(true);

    if (netScore > 0) playDrillSound('bonus');
    else playDrillSound('fail');

    setTimeout(() => {
      markIntentionalExit();
      endGame(netScore, cCount, errors);
    }, 2500);
  }, [playDrillSound, handleSetCorrectCount, handleSetShowResults, markIntentionalExit, endGame]);

  // === Unified Input Pointer Handler ===
  const handleInputStrikes = useCallback((e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (gameStateRef.current !== 'playing' || phaseRef.current !== 'IDENTIFY' || showResultsRef.current) return;
    
    e.stopPropagation();

    const cvs = canvasRef.current;
    if (!cvs) return;
    
    const rect = cvs.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (cvs.width / rect.width);
    const clickY = (e.clientY - rect.top) * (cvs.height / rect.height);

    const currentSelected = selectedBallsRef.current;

    // Check Ball Click (+20px padding prevents mobile fat-finger misses)
    ballsRef.current.forEach((b, i) => {
      if (Math.hypot(clickX - b.x, clickY - b.y) <= b.r + 20) {
        if (currentSelected.includes(i)) {
          handleSetSelectedBalls(prev => prev.filter(item => item !== i));
          playDrillSound('deselect');
        } else if (currentSelected.length < TARGET_COUNT) {
          handleSetSelectedBalls(prev => [...prev, i]);
          playDrillSound('select');
        }
      }
    });
  }, [calculateResults, playDrillSound, handleSetSelectedBalls]);

  // === Native Structural Render & Physics Loop ===
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    let lastTime = performance.now();

    const scaleLayoutFrame = () => {
      const container = containerRef.current; if (!container) return;
      
      const w = container.clientWidth;
      const h = container.clientHeight;
      
      cvs.width = w;
      cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;

      if (hasInitializedRoundRef.current && ballsRef.current.length > 0) {
        ballsRef.current.forEach(b => {
          if (b.x > w - b.r) b.x = w - b.r;
          if (b.x < b.r) b.x = b.r;
          if (b.y > h - b.r) b.y = h - b.r;
          if (b.y < b.r) b.y = b.r;
        });
      }

      if (!hasInitializedRoundRef.current) {
        initDrillVariables(w, h);
        hasInitializedRoundRef.current = true;
      }
    };

    const trackingObserver = new ResizeObserver(scaleLayoutFrame);
    if (containerRef.current) trackingObserver.observe(containerRef.current);
    window.addEventListener('resize', scaleLayoutFrame);
    scaleLayoutFrame();

    const executionRenderingGraph = (now) => {
      let dt = (now - lastTime) / 1000;
      if (dt > 0.05) dt = 0.05; // clamp
      lastTime = now;

      // --- TIMERS ---
      if (isActiveRef.current && phaseRef.current === "MEMORIZE") {
        memorizeTimerRef.current -= dt;
        if (memorizeTimerRef.current <= 0) {
          setPhaseState("TRACKING");
          playDrillSound('select');
        }
      }

      // --- PHYSICS (2D Elastic Collisions) ---
      if (isActiveRef.current && phaseRef.current === "TRACKING") {
        const balls = ballsRef.current;
        const w = cvs.width;
        const h = cvs.height;
        const bestSc = bestScoreRef.current || 0;
        const dynamicSpeed = ballSpeed + (bestSc / 30); // no ceiling — speed scales forever with skill
        const speedMultiplier = dynamicSpeed * 60 * dt; 

        // Move & Wall Bounce
        for (let i = 0; i < balls.length; i++) {
          let b = balls[i];
          b.x += b.dx * speedMultiplier;
          b.y += b.dy * speedMultiplier;

          if (b.x <= b.r) { b.x = b.r; b.dx *= -1; }
          else if (b.x >= w - b.r) { b.x = w - b.r; b.dx *= -1; }
          
          if (b.y <= b.r) { b.y = b.r; b.dy *= -1; }
          else if (b.y >= h - b.r) { b.y = h - b.r; b.dy *= -1; }
        }

        // Ball-to-Ball Elastic Collisions
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            let b1 = balls[i];
            let b2 = balls[j];
            
            let dx = b2.x - b1.x;
            let dy = b2.y - b1.y;
            let dist = Math.hypot(dx, dy);
            let minDist = b1.r + b2.r;

            if (dist < minDist) {
              if (dist === 0) { dx = 1; dist = 1; } // Safety against NaN coordinates
              let overlap = minDist - dist;
              let nx = dx / dist;
              let ny = dy / dist;
              
              b1.x -= nx * (overlap / 2);
              b1.y -= ny * (overlap / 2);
              b2.x += nx * (overlap / 2);
              b2.y += ny * (overlap / 2);

              let kx = b1.dx - b2.dx;
              let ky = b1.dy - b2.dy;
              let p = 2 * (nx * kx + ny * ky) / 2;
              
              b1.dx -= p * nx;
              b1.dy -= p * ny;
              b2.dx += p * nx;
              b2.dy += p * ny;
            }
          }
        }
      }

      // --- RENDER ---
      ctx.fillStyle = isBoxDarkMode ? "#050508" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.strokeStyle = isBoxDarkMode ? "rgba(168,85,247,0.03)" : "rgba(0,0,0,0.03)";
      ctx.lineWidth = 1;
      for (let w = 0; w < cvs.width; w += 50) { ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(w, cvs.height); ctx.stroke(); }
      for (let h = 0; h < cvs.height; h += 50) { ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(cvs.width, h); ctx.stroke(); }

      // Draw Balls — tactical-sphere look (matches barrier-sequence-pursuit's target)
      ballsRef.current.forEach((b, i) => {
        const isSelected = selectedBallsRef.current.includes(i);
        let color;
        let glow;

        if (phaseRef.current === "IDENTIFY") {
          if (showResultsRef.current) {
            color = b.isTarget ? "#00ff88" : (isBoxDarkMode ? "#1f1f2e" : "#e2e8f0");
            glow = b.isTarget;
          } else {
            color = isSelected ? "#f97316" : (isBoxDarkMode ? "#334155" : "#cbd5e1");
            glow = isSelected;
          }
        } else if (phaseRef.current === "MEMORIZE") {
          color = b.isTarget ? "#00ff88" : (isBoxDarkMode ? "#1f1f2e" : "#e2e8f0");
          glow = b.isTarget;
        } else {
          // TRACKING PHASE — deliberately uniform: the task is remembering which
          // ball was a target, so no color/glow may leak that during this phase.
          color = isBoxDarkMode ? "#e2e8f0" : "#334155";
          glow = false;
        }

        drawTacticalTarget(ctx, b.x, b.y, b.r, color, glow);

        // Selection Checkmark
        if (phaseRef.current === "IDENTIFY" && !showResultsRef.current && isSelected) {
          ctx.font = "bold 16px Arial";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("✓", b.x, b.y + 1);
        }
      });

      animationRef.current = requestAnimationFrame(executionRenderingGraph);
    };

    animationRef.current = requestAnimationFrame(executionRenderingGraph);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', scaleLayoutFrame);
      trackingObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode, ballSpeed, totalBalls, playDrillSound, initDrillVariables, setPhaseState]);

  // === Enter Drill (Full Screen -> 321GO Countdown with Sound -> Playing) ===
  const enterDrill = useCallback(async () => {
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    drillAudio.init();
    setIsNewBest(false);

    // Explicit sync-wipes fixes the Restart button not properly restarting the simulation
    setCustomScore(0);
    customScoreRef.current = 0;
    setLocalTimeRemaining(drillDuration);
    localTimeRef.current = drillDuration;
    hasInitializedRoundRef.current = false;
    isActiveRef.current = false;

    setIsFullscreen(true);

    // Countdown sequence: 3 -> 2 -> 1 -> GO with Audio Cues
    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => {
      setCountdownValue(2);
      drillAudio.playCountdownTick();
    }, 700);

    const t2 = setTimeout(() => {
      setCountdownValue(1);
      drillAudio.playCountdownTick();
    }, 1400);

    const t3 = setTimeout(() => {
      setCountdownValue('GO');
      drillAudio.playGo();
    }, 2100);

    const t4 = setTimeout(() => {
      gameStateRef.current = 'playing';
      setGameState('playing');
      isActiveRef.current = true;

      // Force exact variable initialization synchronously
      if (containerRef.current && canvasRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        initDrillVariables(w, h);
        hasInitializedRoundRef.current = true;
      }
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [drillDuration, initDrillVariables]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets';
    try {
      const canvas = generateShareCard({
        score: customScoreRef.current,
        bestScore: bestScore || 0,
        accuracy,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Master Tracker', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Multiple Targets',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${customScoreRef.current} PTS with ${accuracy}% accuracy on Multiple Targets! Grade: ${analytics.grade?.letter || 'C'}. Try it here: ${url}`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My SkillDrills Visual Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [accuracy, bestScore, analytics.grade, isNewBest]);

  const gradeLetter = analytics.grade?.letter || 'C';
  const rankName = analytics.grade?.label || 'Master Tracker';
  const rankColor = analytics.grade?.color || 'text-purple-400';

  let diagnostics = "Outstanding multiple object tracking capacity! Your visual attention spans smoothly across active vectors.";
  if (correctCount < 2) {
diagnostics = "Low target identification accuracy. Anchor your gaze centrally and track target coordinates peripherally to avoid losing targets during collisions.";
  } else if (accuracy < 60) {
    diagnostics = "Low precision rates. Take your time during the identification phase to prevent false selections.";
  } else if (customScore < 40) {
    diagnostics = "Improve your score by tracking all 3 target indices successfully to earn the maximum 60-point bonus.";
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title & AIO Snippet */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              <span data-seo-kw="1">{copy?.title || "Multiple Object Tracking Test"}</span>
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              A multiple object tracking (MOT) test asks you to follow several moving targets among identical moving distractors, then identify them at the end. Most people can track about four or five independent targets at once, and accuracy falls away sharply beyond that (Pylyshyn &amp; Storm, 1988). The limit is attentional rather than optical &mdash; the eyes cannot fixate five things at once, so the tracking is done by attention split across locations (Cavanagh &amp; Alvarez, 2005).
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: 'Score', value: customScore, color: 'text-purple-400' },
              { label: 'Time', value: phase === 'TRACKING' ? `${localTimeRemaining}s` : '-', color: localTimeRemaining <= 10 && phase === 'TRACKING' ? 'text-red-400 animate-pulse' : 'text-white' },
              { label: 'Phase', value: phase === 'IDENTIFY' ? 'WAIT' : phase, color: 'text-cyan-400' },
              { label: 'Best Score', value: bestScore || 0, color: 'text-amber-400' },
            ].map((card) => (
              <div key={card.label} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[10px] font-bold tracking-wider uppercase text-slate-500">{card.label}</div>
                <div className={`text-base sm:text-lg font-black tabular-nums ${card.color || 'text-white'}`}>{card.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Game Stage Container */}
        <GameErrorBoundary>
          <div 
            ref={containerRef} 
            onPointerDown={handleInputStrikes}
            className={
              isFullscreen ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center' : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
            } 
            style={{ touchAction: 'none' }}
          >
            {/* IN-BOX OVERLAY HUD */}
            {(gameState === 'playing' || gameState === 'countdown') && (
              <>
                <div className="absolute top-4 left-4 z-30 pointer-events-none">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-tight">{customScore}</p>
                </div>
                <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time Left</p>
                  <p className={`text-2xl sm:text-3xl font-black tabular-nums leading-tight ${localTimeRemaining <= 10 && phase === 'TRACKING' ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                    {phase === 'TRACKING' ? `${localTimeRemaining}s` : '-'}
                  </p>
                </div>
              </>
            )}

            {/* IN-GAME HUD SOUND + FLASH TOGGLES */}
            {(gameState === 'playing' || gameState === 'countdown') && (
              <div className="absolute bottom-4 right-4 z-40 flex items-center gap-2">
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlashEnabled((v) => {
                      drillFlash.setEnabled(!v);
                      return !v;
                    });
                  }}
                  className="p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Toggle Miss Flash"
                >
                  {flashEnabled ? <Zap className="w-4 h-4 text-red-400" /> : <ZapOff className="w-4 h-4 text-slate-500" />}
                </button>
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSoundEnabled((v) => {
                      drillAudio.setEnabled(!v);
                      return !v;
                    });
                  }}
                  className="p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Toggle Sound"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                </button>
              </div>
            )}

            {/* CANVAS LAYER */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair z-0" />

            <DrillFlashOverlay flashes={flashes} />

            {/* PHASE HUD & ACTION BUTTONS OVER CANVAS */}
            {gameState === 'playing' && phase !== 'TRACKING' && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
                <div className={`px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-lg ${
                  phase === 'MEMORIZE' ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 animate-pulse' :
                  'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                }`}>
                  {phase === 'MEMORIZE' && `TRACK THE GREEN TARGETS`}
                  {phase === 'IDENTIFY' && `SELECT ${TARGET_COUNT} TARGETS (${selectedBalls.length}/${TARGET_COUNT})`}
                </div>
              </div>
            )}

            {/* CONFIRM BUTTON IN IDENTIFY PHASE */}
            {gameState === 'playing' && phase === 'IDENTIFY' && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={calculateResults}
                  disabled={selectedBalls.length !== TARGET_COUNT}
                  className={`px-6 py-3 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 ${
                    selectedBalls.length === TARGET_COUNT
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-pointer active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed'
                  }`}
                >
                  Confirm ({selectedBalls.length}/{TARGET_COUNT})
                </button>
              </div>
            )}

            {/* START CARD */}
            {gameState === 'start' && (
              <FpsStartCard
                icon={Brain}
                accent="purple"
                title="Multiple Targets"
                subtitle="Multi-Object Tracking • Visual Working Memory"
                isTouchOnlyDevice={false}
                onStart={enterDrill}
              />
            )}

            {/* COUNTDOWN OVERLAY */}
            {gameState === 'countdown' && (
              <DrillCountdown value={countdownValue} subtitle="GET READY" />
            )}

            {/* END SCREEN */}
            {gameState === 'gameOver' && analytics.grade && (
              <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>

                {/* Left Grade Panel */}
                <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(168,85,247,.12), transparent 70%)' }}>
                  {isNewBest && (
                    <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse font-mono">
                      NEW BEST
                    </span>
                  )}
                  <div className={`text-5xl sm:text-6xl font-black leading-none ${rankColor}`}>
                    {gradeLetter}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                    {rankName}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                    {customScore}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-500">Points</div>
                </div>

                {/* Right Stats & Actions Panel */}
                <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                  
                  {/* 4 Stat Tiles */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                      <p className="text-sm sm:text-base font-black text-white">{accuracy}%</p>
                      <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Accuracy</p>
                    </div>
                    <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                      <p className="text-sm sm:text-base font-black text-emerald-400">{correctCount}</p>
                      <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Correct</p>
                    </div>
                    <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                      <p className="text-sm sm:text-base font-black text-red-400">{TARGET_COUNT - correctCount}</p>
                      <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Errors</p>
                    </div>
                    <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                      <p className="text-sm sm:text-base font-black text-amber-400">{bestScore || 0}</p>
                      <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Best Score</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        enterDrill();
                      }}
                      className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5 relative z-50 pointer-events-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Play Again
                    </button>
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        shareScore();
                      }}
                      className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform relative z-50 pointer-events-auto"
                      title="Share Score"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExitDrill();
                      }}
                      className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform relative z-50 pointer-events-auto"
                      title="Return to Options"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        </GameErrorBoundary>

        {/* ACCORDIONS */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Scoring System"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DrillRuleItem num="1" text="Track & Identify Targets" highlight="Memorize Highlighted Targets" result="Track through dynamic movement" />
                <DrillRuleItem num="2" text="Multi-Object Tracking" highlight="Select Highlighted Targets" result="+20 PTS per target" />
                <DrillRuleItem num="3" text="False Identification" highlight="Clicking wrong ball" result="0 PTS penalty" />
                <DrillRuleItem num="4" text="True 2D Collisions" highlight="Physics Deflections" result="Dynamic Speed & Angles" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Multiple Targets"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-400" /> What Is Multi-Object Tracking?
                  </h3>
                  <p className="text-sm leading-relaxed mb-3 text-slate-300">
                    <strong>Multiple Object Tracking (MOT)</strong> forces the brain to isolate, store, and continuously update spatial coordinates of multiple identical moving objects in real time, even through chaotic bouncing collisions.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    By expanding peripheral visual focus and maintaining tracking resolution, you sharpen divided attention required for esports, driving, and fast-paced sports.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><GraduationCap className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">Who Should Use This?</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">MOBA & FPS players, tactical operators, and trainees seeking superior visual working memory capacity.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">Skills Improved</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Divided visual attention, working memory capacity, spatial tracking resolution, and motion prediction.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-pink-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">Pro Tip</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Anchor your visual gaze near the centroid of all target balls rather than chasing individual balls with your eyes.</p>
                  </div>
                </div>

              </div>
            </DrillAccordion>
          </div>
        )}

        {/* SITE FOOTER */}
        {!isFullscreen && <DrillFooter />}

      </main>
    </div>
  );
}
