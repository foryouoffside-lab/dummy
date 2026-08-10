'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  AlertCircle, ArrowRight, ChevronRight, Cpu,
  GraduationCap, Lightbulb, Play, RefreshCw, Target,
  Timer, Trophy, Volume2, VolumeX, Zap, ZapOff, Share2,
  Keyboard, Settings, LogOut, Award, Flame, TrendingUp
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '@/components/ShareScoreCard';
import { getPlayerName } from '@/lib/leaderboard';
import { drillAudio } from '@/lib/drillAudio';
import { drillFlash } from '@/lib/drillFlash';
import { drillTimeout } from '@/lib/drillTimeout';
import { getComboMultiplier } from '@/lib/scoringEngine';
import useUnexpectedExitGuard from '@/lib/useUnexpectedExitGuard';
import DrillFooter from '@/components/drill/DrillFooter';
import DrillCountdown from '@/components/drill/DrillCountdown';
import DrillAccordion from '@/components/drill/DrillAccordion';
import FpsStartCard from '@/components/drill/FpsStartCard';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 60; // 60-second session
const STORAGE_KEY = 'skilldrills_motor_keyboard_recognition_v3';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestAccuracy: 0, totalSessions: 0 };
    return { bestScore: 0, bestAccuracy: 0, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestAccuracy: 0, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// ============================================================
// KEYBOARD SYSTEM CONFIGURATIONS
// ============================================================
const ALL_KEYS = [
  { label: 'A', code: 'KeyA', category: 'letter' }, { label: 'B', code: 'KeyB', category: 'letter' },
  { label: 'C', code: 'KeyC', category: 'letter' }, { label: 'D', code: 'KeyD', category: 'letter' },
  { label: 'E', code: 'KeyE', category: 'letter' }, { label: 'F', code: 'KeyF', category: 'letter' },
  { label: 'G', code: 'KeyG', category: 'letter' }, { label: 'H', code: 'KeyH', category: 'letter' },
  { label: 'I', code: 'KeyI', category: 'letter' }, { label: 'J', code: 'KeyJ', category: 'letter' },
  { label: 'K', code: 'KeyK', category: 'letter' }, { label: 'L', code: 'KeyL', category: 'letter' },
  { label: 'M', code: 'KeyM', category: 'letter' }, { label: 'N', code: 'KeyN', category: 'letter' },
  { label: 'O', code: 'KeyO', category: 'letter' }, { label: 'P', code: 'KeyP', category: 'letter' },
  { label: 'Q', code: 'KeyQ', category: 'letter' }, { label: 'R', code: 'KeyR', category: 'letter' },
  { label: 'S', code: 'KeyS', category: 'letter' }, { label: 'T', code: 'KeyT', category: 'letter' },
  { label: 'U', code: 'KeyU', category: 'letter' }, { label: 'V', code: 'KeyV', category: 'letter' },
  { label: 'W', code: 'KeyW', category: 'letter' }, { label: 'X', code: 'KeyX', category: 'letter' },
  { label: 'Y', code: 'KeyY', category: 'letter' }, { label: 'Z', code: 'KeyZ', category: 'letter' },
  { label: '1', code: 'Digit1', category: 'number' }, { label: '2', code: 'Digit2', category: 'number' },
  { label: '3', code: 'Digit3', category: 'number' }, { label: '4', code: 'Digit4', category: 'number' },
  { label: '5', code: 'Digit5', category: 'number' }, { label: '6', code: 'Digit6', category: 'number' },
  { label: '7', code: 'Digit7', category: 'number' }, { label: '8', code: 'Digit8', category: 'number' },
  { label: '9', code: 'Digit9', category: 'number' }, { label: '0', code: 'Digit0', category: 'number' },
  { label: 'Space', code: 'Space', category: 'essential' }, { label: 'Shift', code: 'ShiftLeft', category: 'essential' },
  { label: 'Ctrl', code: 'ControlLeft', category: 'essential' }, { label: 'Alt', code: 'AltLeft', category: 'essential' },
  { label: 'Tab', code: 'Tab', category: 'essential' }, { label: 'Enter', code: 'Enter', category: 'essential' },
  { label: '`', code: 'Backquote', category: 'symbol' }, { label: '-', code: 'Minus', category: 'symbol' },
  { label: '=', code: 'Equal', category: 'symbol' }, { label: '[', code: 'BracketLeft', category: 'symbol' },
  { label: ']', code: 'BracketRight', category: 'symbol' }, { label: '\\', code: 'Backslash', category: 'symbol' },
  { label: ';', code: 'Semicolon', category: 'symbol' }, { label: '\'', code: 'Quote', category: 'symbol' },
  { label: ',', code: 'Comma', category: 'symbol' }, { label: '.', code: 'Period', category: 'symbol' },
  { label: '/', code: 'Slash', category: 'symbol' },
  { label: 'F1', code: 'F1', category: 'advanced_function' }, { label: 'F2', code: 'F2', category: 'advanced_function' },
  { label: 'F3', code: 'F3', category: 'advanced_function' }, { label: 'F4', code: 'F4', category: 'advanced_function' },
  { label: 'F5', code: 'F5', category: 'advanced_function' }, { label: 'F6', code: 'F6', category: 'advanced_function' },
  { label: '▲', code: 'ArrowUp', category: 'advanced_arrow' }, { label: '◀', code: 'ArrowLeft', category: 'advanced_arrow' },
  { label: '▼', code: 'ArrowDown', category: 'advanced_arrow' }, { label: '▶', code: 'ArrowRight', category: 'advanced_arrow' }
];

const PRESETS_ANNOTATED = {
  Valorant: {
    Movement: ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft', 'ControlLeft'],
    Abilities: ['KeyQ', 'KeyE', 'KeyC', 'KeyX'],
    Hotkeys: ['Digit1', 'Digit2', 'Digit3', 'Digit4'],
    Use: ['KeyF'],
    Reload: ['KeyR'],
    Drop: ['KeyG'],
    Ping: ['KeyZ']
  },
  CS2: {
    Movement: ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft', 'ControlLeft'],
    Action: ['KeyE', 'KeyR', 'KeyG', 'KeyF', 'KeyQ'],
    Weapons: ['Digit1', 'Digit2', 'Digit3'],
    Grenades: ['Digit4', 'Digit5']
  },
  Fortnite: {
    Movement: ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft', 'ControlLeft'],
    Hotkeys: ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'],
    Action: ['KeyQ', 'KeyE', 'KeyR', 'KeyF', 'KeyC', 'KeyX', 'KeyV', 'KeyZ']
  },
  Minecraft: {
    Movement: ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft'],
    Action: ['KeyE', 'KeyQ', 'KeyF'],
    Hotbar: ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9']
  },
  LeagueOfLegends: {
    Abilities: ['KeyQ', 'KeyW', 'KeyE', 'KeyR'],
    Spells: ['KeyD', 'KeyF'],
    Items: ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6'],
    Action: ['KeyB', 'KeyP', 'Tab', 'KeyA', 'KeyS']
  },
  ApexLegends: {
    Movement: ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft', 'ControlLeft'],
    Abilities: ['KeyQ', 'KeyZ'],
    Action: ['KeyE', 'KeyR', 'KeyG', 'KeyV', 'Tab'],
    Hotkeys: ['Digit1', 'Digit2', 'Digit4']
  }
};

const DIFFICULTY_CONFIG = {
  easy: { speedMultiplier: 1.5, seqLimit: 2, fakeChance: 0.0, label: 'Easy' },
  medium: { speedMultiplier: 1.0, seqLimit: 3, fakeChance: 0.12, label: 'Medium' },
  hard: { speedMultiplier: 0.75, seqLimit: 4, fakeChance: 0.22, label: 'Hard' },
  expert: { speedMultiplier: 0.55, seqLimit: 5, fakeChance: 0.32, label: 'Expert' }
};

const getRankForScore = (score, accuracy) => {
  if (score >= 3500 && accuracy >= 95) return { letter: 'S+', label: 'Grandmaster', color: 'text-fuchsia-400' };
  if (score >= 2200 && accuracy >= 90) return { letter: 'S', label: 'Master', color: 'text-red-400' };
  if (score >= 1400 && accuracy >= 85) return { letter: 'A', label: 'Diamond', color: 'text-orange-400' };
  if (score >= 700 && accuracy >= 80) return { letter: 'B', label: 'Platinum', color: 'text-yellow-400' };
  if (score >= 300 && accuracy >= 75) return { letter: 'C', label: 'Gold', color: 'text-blue-400' };
  if (score >= 100 && accuracy >= 65) return { letter: 'D', label: 'Silver', color: 'text-slate-300' };
  return { letter: 'F', label: 'Bronze', color: 'text-orange-700' };
};


// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { title: "Correct Input", text: "Match key prompt before sequence timer expires to score +120 PTS." },
  { title: "Fake Prompts (Traps)", text: "Ignore fake invalid prompts to score +200 PTS & build response inhibition." },
  { title: "Wrong Key / Fail Trap", text: "Pressing wrong key or falling for fake prompt trap resets active combo." },
  { title: "Combos & Sequences", text: "Chain unbroken prompt matches to build score multipliers and adaptive speed." }
];

const ABOUT_TEXT = `The Keyboard Recognition & Keybind Speed Trainer is an advanced neuro-motor training tool designed to bridge the gap between visual prompt recognition and physical keybind execution. Unlike static typing drills, competitive gamers must trigger disparate bindings instantly from any finger coordinate — this drill isolates that exact neural pathway for titles like Valorant, CS2, and Fortnite.

The adaptive difficulty engine tracks your performance in real time, increasing prompt speed on streaks and slowing down when you struggle.

Fake prompts require you to freeze rather than react, training the same response inhibition and self-control needed to avoid panic inputs in clutch rounds.`;

const FAQ_ITEMS = [
  { q: "What is the Keyboard Recognition & Keybind Speed Trainer?", a: "It is a premium cognitive-motor training drill that displays key binds, sequences, or fake prompts at the center of the screen. You must type the matching inputs as quickly and accurately as possible while avoiding invalid commands." },
  { q: "How does keybind training improve gaming performance?", a: "By reinforcing the subconscious link between a tactical visual event (like needing to cast a spell, reload, or deploy a wall) and the physical key location on your keyboard, you reduce input latency and bypass conscious search time, developing pure muscle memory." },
  { q: "What custom options are available?", a: "You can select exactly which keys are enabled using our visual keyboard layout, choose from 10 gameplay modes (including Gaming Keys, Sequences, and Memory Sequences), and pick a difficulty from Adaptive Engine to Expert. Your best score and accuracy are automatically saved in your browser." },
  { q: "What gaming presets are pre-loaded?", a: "We provide pre-loaded profiles for top competitive titles: Valorant, CS2, Fortnite, Minecraft, League of Legends, and Apex Legends, equipping you with the standard layouts of each game immediately." },
  { q: "How does Fake Prompt Mode train response inhibition?", a: "It displays commands like 'Fire', 'Jump', or invalid characters that you must actively ignore. Pressing any key fails the prompt. This trains cognitive self-control, helping you avoid panic inputs in intense clutch situations." }
];

const RELATED_DRILLS = [
  { id: "finger-sequencing", name: "Sequence Aim Trainer", cat: "Motor Speed", desc: "Train multi-target ordered clicking and finger dexterity under time pressure.", href: "/drills/motor/movement-speed/finger-sequencing" },
  { id: "rapid-tapping", name: "Rapid Tapping Test", cat: "Motor Speed", desc: "Test finger tapping velocity and neuromuscular speed.", href: "/drills/motor/movement-speed/rapid-tapping" },
  { id: "drag-and-drop", name: "Drag & Drop Precision", cat: "Motor Coordination", desc: "Master mouse spatial drag control and release timing.", href: "/drills/motor/hand-eye-coordination/drag-and-drop" },
  { id: "aim-trainer", name: "Aim Trainer Elite", cat: "Motor Coordination", desc: "Dynamic targets that shrink with streak and lives system.", href: "/drills/motor/hand-eye-coordination/aim-trainer" },
  { id: "steady-hand", name: "Steady Hand Trainer", cat: "Motor Control", desc: "Trace a winding path corridor with shrinking width on streak.", href: "/drills/motor/precision-control/steady-hand" },
  { id: "tracing", name: "Tracing Control", cat: "Motor Control", desc: "Precision cursor tracking and path stability trainer.", href: "/drills/motor/precision-control/tracing" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function KeyboardRecognitionClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [flashes, setFlashes] = useState([]);

  const [trainingMode, setTrainingMode] = useState('dynamic');
  const [difficultySetting, setDifficultySetting] = useState('adaptive');
  const [enabledKeys, setEnabledKeys] = useState(Object.values(PRESETS_ANNOTATED.Valorant).flat());
  const [selectedProfile, setSelectedProfile] = useState('Valorant');

  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [uiAccuracy, setUiAccuracy] = useState(100);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  const [promptDisplay, setPromptDisplay] = useState(null);
  const [promptStatus, setPromptStatus] = useState('neutral');

  const [analytics, setAnalytics] = useState({
    accuracy: 100, kpm: 0, avgReaction: 0, maxCombo: 0, grade: null
  });

  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);
  const gameActiveRef = useRef(false);
  const startingRef = useRef(false);
  const countdownTimeoutsRef = useRef([]);

  const engine = useRef({
    score: 0, combo: 0, maxCombo: 0, timeLeft: DRILL_DURATION, activeTime: 0,
    hits: 0, misses: 0, missedPrompts: 0, totalKeypresses: 0, correctKeypresses: 0,
    reactionTimes: [], combosRecord: [],
    adaptiveMultiplier: 1.0, recentHits: [],
    keyPerformance: {},
    activePrompt: null, typedIndex: 0, isMemoryMemorize: false,
    promptTimer: null, promptDuration: 2000, promptStartedAt: 0,
    totalPromptsCount: 0, correctSequencesCount: 0, failedSequencesCount: 0, fakeIgnoredCount: 0, fakeFailsCount: 0
  });

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
    }
  }, []);

  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
      if (engine.current.promptTimer) clearTimeout(engine.current.promptTimer);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (engine.current.promptTimer) clearTimeout(engine.current.promptTimer);
    startingRef.current = false;

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    setGameState('start');
  }, []);

  // Stop the drill if the player leaves any way other than the in-app Exit
  // button (back gesture, tab switch, Esc) instead of running invisibly.
  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  const handleLoadPreset = (presetName) => {
    setSelectedProfile(presetName);
    if (PRESETS_ANNOTATED[presetName]) {
      const keys = Object.values(PRESETS_ANNOTATED[presetName]).flat();
      setEnabledKeys([...new Set(keys)]);
    }
  };

  const getFilteredKeys = useCallback(() => {
    if (trainingMode === 'letters') return ALL_KEYS.filter(k => k.category === 'letter' && enabledKeys.includes(k.code));
    if (trainingMode === 'numbers') return ALL_KEYS.filter(k => k.category === 'number' && enabledKeys.includes(k.code));
    if (trainingMode === 'mix') return ALL_KEYS.filter(k => ['letter', 'number'].includes(k.category) && enabledKeys.includes(k.code));
    if (trainingMode === 'gaming') return ALL_KEYS.filter(k => enabledKeys.includes(k.code));
    return ALL_KEYS.filter(k => enabledKeys.includes(k.code));
  }, [trainingMode, enabledKeys]);

  const generateNextPrompt = useCallback(() => {
    const pool = getFilteredKeys();
    if (!pool.length) return null;

    let baseDuration = 1800;
    let fakeChance = 0.0;
    let maxSeq = 1;

    if (difficultySetting === 'adaptive') {
      const mult = engine.current.adaptiveMultiplier;
      baseDuration = Math.max(700, Math.round(1800 * mult));
      fakeChance = 0.15;
      maxSeq = 3;
    } else {
      const cfg = DIFFICULTY_CONFIG[difficultySetting];
      baseDuration = Math.round(1800 * cfg.speedMultiplier);
      fakeChance = cfg.fakeChance;
      maxSeq = cfg.seqLimit;
    }

    let pType = 'single';
    if (trainingMode === 'fake') pType = 'fake';
    else if (trainingMode === 'short_seq') pType = 'sequence';
    else if (trainingMode === 'long_seq') pType = 'sequence';
    else if (trainingMode === 'memory') pType = 'memory';
    else if (trainingMode === 'single') pType = 'single';
    else {
      const rand = Math.random();
      if (rand < fakeChance) pType = 'fake';
      else if (rand < fakeChance + 0.3) pType = 'sequence';
      else if (rand < fakeChance + 0.45) pType = 'memory';
      else pType = 'single';
    }

    if (pType === 'fake') {
      const disabledKeys = ALL_KEYS.filter(k => !enabledKeys.includes(k.code));
      const trapPool = disabledKeys.length ? disabledKeys : ALL_KEYS;
      const trapKey = trapPool[Math.floor(Math.random() * trapPool.length)];
      return {
        type: 'fake',
        text: trapKey.label,
        code: trapKey.code,
        duration: Math.round(baseDuration * 0.95),
        expectedKeys: []
      };
    }

    if (pType === 'sequence') {
      const seqLen = trainingMode === 'long_seq' ? 5 : trainingMode === 'short_seq' ? 3 : Math.min(maxSeq, 2 + Math.floor(Math.random() * 2));
      const seqKeys = [];
      for (let i = 0; i < seqLen; i++) {
        seqKeys.push(pool[Math.floor(Math.random() * pool.length)]);
      }
      return {
        type: 'sequence',
        textList: seqKeys.map(k => k.label),
        text: seqKeys.map(k => k.label).join(' '),
        expectedKeys: seqKeys.map(k => k.code),
        duration: baseDuration + (seqLen - 1) * 600,
        typedCount: 0
      };
    }

    if (pType === 'memory') {
      const memLen = 3;
      const memKeys = [];
      for (let i = 0; i < memLen; i++) {
        memKeys.push(pool[Math.floor(Math.random() * pool.length)]);
      }
      return {
        type: 'memory',
        textList: memKeys.map(k => k.label),
        text: memKeys.map(k => k.label).join(' '),
        expectedKeys: memKeys.map(k => k.code),
        duration: baseDuration + 1400,
        typedCount: 0,
        showMemoryContent: true,
        isMemoryActive: false
      };
    }

    const keyObj = pool[Math.floor(Math.random() * pool.length)];
    return {
      type: 'single',
      text: keyObj.label,
      code: keyObj.code,
      expectedKeys: [keyObj.code],
      duration: baseDuration
    };
  }, [getFilteredKeys, difficultySetting, trainingMode, enabledKeys]);

  const handlePromptTimeout = useCallback(() => {
    const e = engine.current;
    if (!gameActiveRef.current || !e.activePrompt) return;

    if (!drillTimeout.isEnabled()) {
      e.promptTimer = setTimeout(() => handlePromptTimeout(), e.promptDuration || 2000);
      return;
    }

    setPromptStatus('incorrect');
    setTimeout(() => setPromptStatus('neutral'), 180);

    if (e.activePrompt.type === 'fake') {
      e.fakeIgnoredCount++;
      e.score += 200;
      setUiScore(e.score);
      drillAudio.playHit();
    } else {
      e.missedPrompts++;
      e.failedSequencesCount++;
      e.combo = 0;
      e.adaptiveMultiplier = Math.min(1.4, e.adaptiveMultiplier + 0.08);
      triggerFlash();
      drillAudio.playPenalty();
    }

    spawnNextPrompt();
  }, [triggerFlash]);

  const spawnNextPrompt = useCallback(() => {
    if (!gameActiveRef.current) return;
    if (engine.current.promptTimer) clearTimeout(engine.current.promptTimer);

    const nextP = generateNextPrompt();
    if (!nextP) return;

    const e = engine.current;
    e.activePrompt = nextP;
    e.typedIndex = 0;
    e.totalPromptsCount++;
    e.promptDuration = nextP.duration;
    e.promptStartedAt = performance.now();

    setPromptDisplay(nextP);
    setPromptStatus('neutral');

    if (nextP.type === 'memory') {
      nextP.isMemoryActive = false;
      nextP.showMemoryContent = true;

      setTimeout(() => {
        if (!gameActiveRef.current || e.activePrompt !== nextP) return;
        nextP.showMemoryContent = false;
        nextP.isMemoryActive = true;
        setPromptDisplay({ ...nextP });

        e.promptTimer = setTimeout(() => {
          handlePromptTimeout();
        }, nextP.duration);
      }, 1000);
    } else {
      e.promptTimer = setTimeout(() => {
        handlePromptTimeout();
      }, nextP.duration);
    }
  }, [generateNextPrompt, handlePromptTimeout]);

  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');

    if (engine.current.promptTimer) clearTimeout(engine.current.promptTimer);

    const e = engine.current;
    const totalKp = e.totalKeypresses;
    const finalAccuracy = totalKp > 0 ? Math.round((e.correctKeypresses / totalKp) * 100) : 100;

    const sessionMinutes = (DRILL_DURATION - e.timeLeft) / 60;
    const kpm = sessionMinutes > 0 ? Math.round(totalKp / sessionMinutes) : 0;

    const sumRx = e.reactionTimes.reduce((a, b) => a + b, 0);
    const avgRx = e.reactionTimes.length > 0 ? Math.round(sumRx / e.reactionTimes.length) : 0;

    const grade = getRankForScore(e.score, finalAccuracy);

    setAnalytics({
      accuracy: finalAccuracy,
      kpm,
      avgReaction: avgRx,
      maxCombo: e.maxCombo,
      grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestAccuracy: Math.max(prevSaved.bestAccuracy || 0, finalAccuracy),
      totalSessions: (prevSaved.totalSessions || 0) + 1
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    drillAudio.playSessionEnd();
  }, []);

  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (engine.current.promptTimer) clearTimeout(engine.current.promptTimer);

    drillAudio.init();

    setIsNewBest(false);
    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    setUiAccuracy(100);
    lastTimeRef.current = DRILL_DURATION;

    engine.current = {
      score: 0, combo: 0, maxCombo: 0, timeLeft: DRILL_DURATION, activeTime: 0,
      hits: 0, misses: 0, missedPrompts: 0, totalKeypresses: 0, correctKeypresses: 0,
      reactionTimes: [], combosRecord: [],
      adaptiveMultiplier: 1.0, recentHits: [],
      keyPerformance: {},
      activePrompt: null, typedIndex: 0, isMemoryMemorize: false,
      promptTimer: null, promptDuration: 2000, promptStartedAt: 0,
      totalPromptsCount: 0, correctSequencesCount: 0, failedSequencesCount: 0, fakeIgnoredCount: 0, fakeFailsCount: 0
    };

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}

    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => { setCountdownValue(2); drillAudio.playCountdownTick(); }, 700);
    const t2 = setTimeout(() => { setCountdownValue(1); drillAudio.playCountdownTick(); }, 1400);
    const t3 = setTimeout(() => { setCountdownValue('GO'); drillAudio.playGo(); }, 2100);
    const t4 = setTimeout(() => {
      gameActiveRef.current = true;
      startingRef.current = false;
      setGameState('playing');
      spawnNextPrompt();
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [spawnNextPrompt]);

  // Global Keyboard Listener for Gameplay Inputs
  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (gameState !== 'playing' || !gameActiveRef.current) return;
      if (['Tab', 'AltLeft', 'AltRight', 'Space'].includes(evt.code)) {
        evt.preventDefault();
      }

      const e = engine.current;
      const prompt = e.activePrompt;
      if (!prompt) return;

      if (prompt.type === 'memory' && prompt.showMemoryContent) return;

      const pressedCode = evt.code;
      e.totalKeypresses++;

      if (prompt.type === 'fake') {
        e.fakeFailsCount++;
        e.combo = 0;
        e.adaptiveMultiplier = Math.min(1.4, e.adaptiveMultiplier + 0.1);

        setPromptStatus('incorrect');
        setTimeout(() => setPromptStatus('neutral'), 180);

        triggerFlash();
        drillAudio.playPenalty();

        if (e.promptTimer) clearTimeout(e.promptTimer);
        spawnNextPrompt();
        return;
      }

      const targetCode = prompt.expectedKeys[e.typedIndex];

      if (pressedCode === targetCode) {
        e.correctKeypresses++;
        e.typedIndex++;

        const rx = performance.now() - e.promptStartedAt;
        e.reactionTimes.push(rx);

        setPromptStatus('correct');
        setTimeout(() => setPromptStatus('neutral'), 150);

        if (prompt.type === 'sequence' || prompt.type === 'memory') {
          prompt.typedCount = e.typedIndex;
          setPromptDisplay({ ...prompt });
          drillAudio.playBeep(480 + e.typedIndex * 80, 'sine', 0.04);
        }

        if (e.typedIndex >= prompt.expectedKeys.length) {
          e.hits++;
          e.correctSequencesCount++;
          e.combo++;
          if (e.combo > e.maxCombo) e.maxCombo = e.combo;

          e.adaptiveMultiplier = Math.max(0.45, e.adaptiveMultiplier - 0.04);

          const mult = getComboMultiplier(e.combo);
          const pts = Math.round(120 * mult * (prompt.type === 'memory' ? 1.8 : prompt.type === 'sequence' ? 1.4 : 1.0));
          e.score += pts;
          setUiScore(e.score);

          drillAudio.playHit();

          if (e.promptTimer) clearTimeout(e.promptTimer);
          spawnNextPrompt();
        }
      } else {
        e.misses++;
        e.combo = 0;
        e.adaptiveMultiplier = Math.min(1.4, e.adaptiveMultiplier + 0.08);

        setPromptStatus('incorrect');
        setTimeout(() => setPromptStatus('neutral'), 180);

        triggerFlash();
        drillAudio.playPenalty();

        if (e.promptTimer) clearTimeout(e.promptTimer);
        spawnNextPrompt();
      }

      const acc = Math.round((e.correctKeypresses / e.totalKeypresses) * 100);
      setUiAccuracy(acc);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, triggerFlash, spawnNextPrompt]);

  // Main Animation / Timer Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time) => {
      if (isIdleFrameSkippable(gameState === 'playing', time, lastTime)) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      }
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(deltaTimeMs / 1000, 0.1);
      const e = engine.current;

      if (gameState === 'playing') {
        if (e.timeLeft > 0) e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          endGame();
          return;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setUiTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }
      }

      if (gameState !== 'gameOver') {
        animationRef.current = requestAnimationFrame(loop);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationRef.current);
  }, [gameState, endGame]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Keyboard Recognition',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS on Keyboard Recognition Pro! Accuracy: ${analytics.accuracy}%. Test your reflexes at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Keyboard Recognition Pro Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── HEADER / BREADCRUMB ── */}
      {!isFullscreen && (
        <header className="border-b border-white/5 bg-[#080811]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/drills/motor" className="hover:text-white transition-colors">Motor</Link>
              <span>/</span>
              <span className="text-emerald-400 font-medium">Keyboard Recognition Pro</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  drillAudio?.setEnabled?.(next);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
              <button
                onClick={() => {
                  const next = !flashEnabled;
                  setFlashEnabled(next);
                  drillFlash?.setEnabled?.(next);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={flashEnabled ? "Disable Miss Flash" : "Enable Miss Flash"}
              >
                {flashEnabled ? <Zap className="w-4 h-4 text-red-400" /> : <ZapOff className="w-4 h-4 text-red-400" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent uppercase">
              Keyboard Recognition Pro
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Keybind Muscle Memory &amp; Response Inhibition • 45s Timer
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Accuracy</div>
              <div className="text-lg sm:text-xl font-black text-emerald-400 tabular-nums">{uiAccuracy}%</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{bestScore}</div>
            </div>
          </div>
        )}

        {/* Game Stage Container */}
        <div 
          ref={containerRef} 
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen 
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center' 
              : 'w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col'
          }`}
        >
          {/* DOM Flash Overlay */}
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{uiTimeLeft}s</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* PROMPT DISPLAY AREA */}
          {gameState === 'playing' && promptDisplay && (
            <div className={`absolute inset-0 z-10 w-full h-full flex items-center justify-center select-none transition-colors duration-150 ${
                promptStatus === 'correct' ? 'bg-emerald-500/10' :
                promptStatus === 'incorrect' ? 'bg-rose-500/10' :
                promptDisplay.type === 'fake' ? 'bg-amber-500/10' :
                promptDisplay.type === 'memory' && promptDisplay.isMemoryActive ? 'bg-cyan-500/10' : ''
              }`}>

              <div className="w-[95%] max-w-5xl flex items-center justify-center flex-wrap">

                {promptDisplay.type === 'fake' && (
                  <div className="text-6xl md:text-8xl lg:text-[9rem] font-black uppercase text-amber-500 font-sans tracking-wide drop-shadow-[0_0_20px_rgba(245,158,11,0.4)] whitespace-nowrap">
                    {promptDisplay.text}
                  </div>
                )}

                {promptDisplay.type === 'memory' && (
                  <div className="flex gap-4 md:gap-8 items-center justify-center flex-wrap">
                    {promptDisplay.showMemoryContent ? (
                      promptDisplay.textList.map((ch, i) => (
                        <span key={i} className="font-mono font-black text-cyan-400 text-6xl md:text-8xl lg:text-9xl drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">{ch}</span>
                      ))
                    ) : (
                      promptDisplay.textList.map((ch, i) => {
                        const isTyped = i < promptDisplay.typedCount;
                        return (
                          <span key={i} className={`w-20 h-24 md:w-28 md:h-32 rounded-3xl border-[3px] flex items-center justify-center font-black font-mono transition-all text-5xl md:text-6xl ${isTyped ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-dashed border-slate-700 text-slate-700'}`}>
                            {isTyped ? ch : ''}
                          </span>
                        );
                      })
                    )}
                  </div>
                )}

                {promptDisplay.type === 'sequence' && (
                  <div className="flex gap-4 md:gap-8 items-center justify-center flex-wrap">
                    {promptDisplay.textList.map((ch, i) => {
                      const isTyped = i < promptDisplay.typedCount;
                      const isCurrent = i === promptDisplay.typedCount;
                      return (
                        <span key={i} className={`w-20 h-24 md:w-28 md:h-32 rounded-3xl border-[3px] flex items-center justify-center font-black font-mono transition-all text-4xl md:text-6xl ${isTyped ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-95' : isCurrent ? 'border-white bg-slate-800 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-110' : 'border-slate-800 bg-slate-900 text-slate-600'}`}>
                          {ch}
                        </span>
                      );
                    })}
                  </div>
                )}

                {['single', 'combo'].includes(promptDisplay.type) && (
                  <div className="text-5xl md:text-7xl lg:text-[8rem] font-mono font-black text-white tracking-widest drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] whitespace-nowrap overflow-visible">
                    {promptDisplay.text}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Keyboard}
              accent="emerald"
              title="Keyboard Recognition Pro"
              subtitle="Keybind Muscle Memory & Response Inhibition • 60s Timer"
              rules={[
                { icon: Target, accent: 'emerald', title: 'Match Prompt Before Timeout', text: 'Press the matching key on your physical keyboard before target timer expires' },
                { icon: Zap, accent: 'red', title: 'Incorrect Key Penalty', text: 'Pressing the wrong key or timing out resets your streak' },
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Keyboard, label: 'Keys Active', value: enabledKeys.length, color: 'text-emerald-400', accent: 'emerald' },
                { icon: Timer, label: 'Duration', value: '60s', color: 'text-blue-400', accent: 'blue' },
              ]}
              isTouchOnlyDevice={isTouchOnlyDevice}
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(16,185,129,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade.color}`}>
                  {analytics.grade.letter}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {uiScore}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Points</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                
                {/* 4 Stat Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.avgReaction}<span className="text-[10px] text-gray-500">ms</span></p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Avg Reaction</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.maxCombo}x</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Max Combo</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.kpm}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">KPM</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button 
                    onClick={shareScore} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4 text-emerald-400" />
                  </button>
                  <button 
                    onClick={handleExitDrill} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Exit Fullscreen & Return"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* ── SESSION CONFIGURATION ── */}
        {!isFullscreen && (
          <section className="mt-4">
            <div className="rounded-2xl border border-white/10 bg-[#080811] p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <h2 className="font-bold text-white text-xs tracking-wide uppercase font-mono">Session Configuration</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider block mb-1.5">Gameplay Mode</label>
                  <select value={trainingMode} onChange={(e) => setTrainingMode(e.target.value)} className="w-full text-xs font-bold bg-[#040609] border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                    <option value="dynamic">Dynamic Mixed Progression</option><option value="single">Single Key Recognition</option>
                    <option value="letters">Letters Only (A-Z)</option><option value="numbers">Numbers Only (0-9)</option>
                    <option value="mix">Letters + Numbers Mix</option><option value="gaming">Gaming Keys Only</option>
                    <option value="short_seq">Short Sequences</option><option value="long_seq">Long Sequences</option>
                    <option value="memory">Memory Recall Mode</option><option value="fake">Inhibition Traps</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider block mb-1.5">Difficulty</label>
                  <select value={difficultySetting} onChange={(e) => setDifficultySetting(e.target.value)} className="w-full text-xs font-bold bg-[#040609] border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                    <option value="adaptive">Adaptive Engine</option><option value="easy">Easy (1.5x Time)</option>
                    <option value="medium">Medium (1.0x Time)</option><option value="hard">Hard (0.75x Time)</option>
                    <option value="expert">Expert (0.55x extreme)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider block mb-1.5">Esports Presets</label>
                  <div className="grid grid-cols-3 gap-1">
                    {Object.keys(PRESETS_ANNOTATED).map(pName => (
                      <button key={pName} onClick={() => handleLoadPreset(pName)} className={`py-1 px-1 rounded text-[9px] font-mono font-bold border transition-colors ${selectedProfile === pName ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-white/10 bg-[#040609] text-slate-400 hover:text-white'}`}>{pName}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3 pt-2 border-t border-white/5">
                <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Active Key Bindings Map</h3>
                <span className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-slate-300">Selected Keys: {enabledKeys.length}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { title: "Letters (A-Z)", list: ALL_KEYS.filter(k => k.category === 'letter') },
                  { title: "Numbers (0-9)", list: ALL_KEYS.filter(k => k.category === 'number') },
                  { title: "Essential Modifiers", list: ALL_KEYS.filter(k => k.category === 'essential') },
                  { title: "Symbols", list: ALL_KEYS.filter(k => k.category === 'symbol') }
                ].map(group => (
                  <div key={group.title} className="bg-[#040609] p-3 rounded-xl border border-white/5 flex flex-col">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2 pb-1 border-b border-white/5 block">{group.title}</span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-1">
                      {group.list.map(key => {
                        const isEnabled = enabledKeys.includes(key.code);
                        return (
                          <button key={key.code} onClick={() => { setSelectedProfile('Custom'); setEnabledKeys(prev => prev.includes(key.code) ? (prev.length > 1 ? prev.filter(k => k !== key.code) : prev) : [...prev, key.code]); }} className={`py-1.5 px-1 rounded font-mono text-[11px] font-bold border transition-colors ${isEnabled ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-white/5 bg-[#080811] text-slate-500 hover:border-white/15'}`}>{key.label}</button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── ACCORDIONS ── */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Scoring System"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {RULES_ITEMS.map((item, i) => (
                  <div key={i} className="bg-black p-4 rounded-xl border border-white/10">
                    <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-gray-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Keyboard Recognition Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-4">
                {ABOUT_TEXT.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-gray-300">{para}</p>
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="faq"
              title="Frequently Asked Questions"
              isOpen={openAccordion === 'faq'}
              onToggle={() => setOpenAccordion(openAccordion === 'faq' ? null : 'faq')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="bg-[#05060b] border border-gray-800 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-gray-200 mb-2">{item.q}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* ── RELATED MOTOR DRILLS ── */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-sans">
              Related Motor &amp; Speed Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-emerald-400 mt-3 flex items-center gap-1 transition-colors">
                    Train Drill <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── FOOTER ── */}
        {!isFullscreen && <DrillFooter />}

      </main>
    </div>
  );
}
