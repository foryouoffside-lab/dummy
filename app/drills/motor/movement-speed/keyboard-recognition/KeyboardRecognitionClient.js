'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Activity, ArrowRight, ChevronRight, 
  Clock, Cpu, GraduationCap, Info, Lightbulb, 
  Play, RefreshCw, Target, Timer, TrendingUp, Trophy, 
  Volume2, VolumeX, Zap, Shield, Sparkles, Flame, Share2, Keyboard, Save, Trash2, Edit3, Settings,
  Maximize2, Minimize2
} from 'lucide-react';

// ============================================================
// ZERO-LATENCY AUDIO SYNTHESIZER
// ============================================================
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  playSuccess(combo = 0) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const freq = Math.min(1600, 880 + (combo * 20)); // Scales pitch aggressively with combo
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.15, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playPenalty() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }

  playCombo() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 880.00].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.10, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.20);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.20);
      });
    } catch (e) {}
  }

  playHighScore() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; 
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.10, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.25);
      });
    } catch (e) {}
  }

  playTick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

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

const getLevelConfig = (score) => {
  if (score >= 3500) return { level: 6, color: 'text-fuchsia-400', name: 'Grandmaster' };
  if (score >= 2200) return { level: 5, color: 'text-red-400', name: 'Master' };
  if (score >= 1400) return { level: 4, color: 'text-orange-400', name: 'Diamond' };
  if (score >= 700)  return { level: 3, color: 'text-yellow-400', name: 'Platinum' };
  if (score >= 300)  return { level: 2, color: 'text-blue-400', name: 'Gold' };
  return { level: 1, color: 'text-emerald-400', name: 'Silver' };
};

const calculateRank = (score, accuracy) => {
  if (score >= 3500 && accuracy >= 95) return { rank: 'Grandmaster', color: 'text-fuchsia-400' };
  if (score >= 2200 && accuracy >= 90) return { rank: 'Master', color: 'text-red-400' };
  if (score >= 1400 && accuracy >= 85) return { rank: 'Diamond', color: 'text-orange-400' };
  if (score >= 700 && accuracy >= 80) return { rank: 'Platinum', color: 'text-yellow-400' };
  if (score >= 300 && accuracy >= 75) return { rank: 'Gold', color: 'text-blue-400' };
  if (score >= 100 && accuracy >= 65) return { rank: 'Silver', color: 'text-slate-300' };
  return { rank: 'Bronze', color: 'text-orange-700' };
};

export default function KeyboardRecognitionClient() {
  const [gameState, setGameState] = useState('start');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionTime, setSessionTime] = useState(60);
  const [isSurvival, setIsSurvival] = useState(false);

  const [trainingMode, setTrainingMode] = useState('dynamic');
  const [difficultySetting, setDifficultySetting] = useState('adaptive');

  const [enabledKeys, setEnabledKeys] = useState(Object.values(PRESETS_ANNOTATED.Valorant).flat());
  const [profiles, setProfiles] = useState({});
  const [selectedProfile, setSelectedProfile] = useState('Valorant');

  const [uiScore, setUiScore] = useState(0);
  const [uiCombo, setUiCombo] = useState(0);
  const [uiLevel, setUiLevel] = useState(1);
  const [uiTimeLeft, setUiTimeLeft] = useState(60);
  const [uiAccuracy, setUiAccuracy] = useState(100);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  const [promptDisplay, setPromptDisplay] = useState(null);
  const [promptStatus, setPromptStatus] = useState('neutral');

  const [analytics, setAnalytics] = useState({
    reactionTimesList: [], rankData: null, weakKeys: [], strongKeys: []
  });

  const containerRef = useRef(null);

  const engine = useRef({
    score: 0, combo: 0, maxCombo: 0, timeLeft: 60, activeTime: 60,
    hits: 0, misses: 0, missedPrompts: 0, totalKeypresses: 0, correctKeypresses: 0,
    reactionTimes: [], combosRecord: [],
    adaptiveMultiplier: 1.0, recentHits: [],
    keyPerformance: {},
    activePrompt: null, typedIndex: 0, isMemoryMemorize: false,
    promptTimer: null, promptDuration: 2000, promptStartedAt: 0,
    totalPromptsCount: 0, correctSequencesCount: 0, failedSequencesCount: 0, fakeIgnoredCount: 0, fakeFailsCount: 0
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const localHighScore = localStorage.getItem('kb_drill_high_score_v7');
    if (localHighScore) setBestScore(parseInt(localHighScore, 10));

    const savedProfiles = localStorage.getItem('kb_drill_custom_profiles_v7');
    if (savedProfiles) {
      try { setProfiles(JSON.parse(savedProfiles)); } catch (e) {}
    }

    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const toggleFullscreen = async () => {
    try {
      const el = containerRef.current || document.documentElement;
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.error('Fullscreen request failed:', e);
    }
  };

  const handleLoadPreset = (name) => {
    if (PRESETS_ANNOTATED[name]) {
      setEnabledKeys(Object.values(PRESETS_ANNOTATED[name]).flat());
      setSelectedProfile(name);
    }
  };

  const getKeyLabel = (code) => {
    const found = ALL_KEYS.find(k => k.code === code);
    return found ? found.label : code.replace('Key', '').replace('Digit', '');
  };

  const recordKeyTelemetry = (code, isCorrect, rtTime = null) => {
    const perf = engine.current.keyPerformance;
    if (!perf[code]) perf[code] = { hits: 0, misses: 0, reactionTimes: [] };
    if (isCorrect) {
      perf[code].hits += 1;
      if (rtTime !== null) perf[code].reactionTimes.push(rtTime);
    } else {
      perf[code].misses += 1;
    }
  };

  const updateAdaptiveParams = (isCorrect, rtTime = 0) => {
    const adaptive = engine.current.recentHits;
    adaptive.push(isCorrect);
    if (adaptive.length > 5) adaptive.shift();

    const hitsCount = adaptive.filter(Boolean).length;
    const accuracy = (hitsCount / Math.max(1, adaptive.length)) * 100;
    let multiplier = engine.current.adaptiveMultiplier;

    // Aggressive speed scaling for high performers
    if (accuracy < 80) multiplier *= 1.15;
    else if (accuracy >= 100 && rtTime > 0 && rtTime < 600) multiplier *= 0.85;

    const consecutiveErrors = adaptive.slice(-2).filter(h => !h).length;
    if (consecutiveErrors >= 2) multiplier *= 1.25;

    engine.current.adaptiveMultiplier = Math.max(0.20, Math.min(2.50, multiplier));
  };

  const generatePrompt = useCallback(() => {
    const activeLevel = getLevelConfig(engine.current.score);
    let pool = [...enabledKeys];
    if (pool.length === 0) pool = ['KeyW'];

    let isAdaptive = difficultySetting === 'adaptive';
    let speedMulti = 1.0, seqLimit = 3, fakeChance = 0.15;

    // Infinite Exponential Scoring Speed Reduction
    const scoreScale = Math.max(0.20, 1.0 - (engine.current.score / 8000));

    if (isAdaptive) {
      speedMulti = engine.current.adaptiveMultiplier * scoreScale;
      seqLimit = 3 + Math.floor(engine.current.score / 800);
      fakeChance = 0.10 + (engine.current.score / 5000) * 0.15;
    } else {
      const config = DIFFICULTY_CONFIG[difficultySetting] || DIFFICULTY_CONFIG.medium;
      speedMulti = config.speedMultiplier * scoreScale;
      seqLimit = config.seqLimit;
      fakeChance = config.fakeChance;
    }
    seqLimit = Math.max(2, Math.min(6, seqLimit));
    fakeChance = Math.max(0, Math.min(0.35, fakeChance));

    let type = 'single';
    if (trainingMode === 'dynamic') {
      const roll = Math.random();
      if (roll < fakeChance) type = 'fake';
      else if (activeLevel.level >= 5 && Math.random() < 0.35) type = 'memory';
      else if (activeLevel.level >= 3 && Math.random() < 0.45) type = Math.random() < 0.5 ? 'sequence' : 'combo';
      else type = 'single';
    } else {
      type = ['short_seq', 'long_seq'].includes(trainingMode) ? 'sequence' : trainingMode === 'memory' ? 'memory' : trainingMode === 'fake' ? 'fake' : 'single';
    }

    let selectedKeys = [];
    let displayString = '';
    let modifier = null;

    if (type === 'single') {
      let filtered = [...pool];
      if (trainingMode === 'letters') filtered = pool.filter(k => ALL_KEYS.find(ak => ak.code === k)?.category === 'letter') || pool;
      else if (trainingMode === 'numbers') filtered = pool.filter(k => ALL_KEYS.find(ak => ak.code === k)?.category === 'number') || pool;
      else if (trainingMode === 'mix') filtered = pool.filter(k => ['letter', 'number'].includes(ALL_KEYS.find(ak => ak.code === k)?.category || '')) || pool;
      else if (trainingMode === 'gaming') filtered = pool.filter(k => Object.values(PRESETS_ANNOTATED.Valorant).flat().includes(k)) || pool;
      
      if(filtered.length === 0) filtered = pool;
      const randomCode = filtered[Math.floor(Math.random() * filtered.length)];
      selectedKeys = [randomCode];
      displayString = getKeyLabel(randomCode);
    }
    else if (type === 'combo') {
      const modifiers = ['ShiftLeft', 'ControlLeft', 'AltLeft'];
      const activeMods = modifiers.filter(m => pool.includes(m));
      modifier = activeMods.length > 0 ? activeMods[Math.floor(Math.random() * activeMods.length)] : 'ShiftLeft';
      const targets = pool.filter(k => ['letter', 'number'].includes(ALL_KEYS.find(ak => ak.code === k)?.category || ''));
      const targetCode = targets.length > 0 ? targets[Math.floor(Math.random() * targets.length)] : 'KeyW';
      selectedKeys = [targetCode];
      const modLabel = modifier === 'ShiftLeft' ? 'Shift' : modifier === 'ControlLeft' ? 'Ctrl' : 'Alt';
      displayString = `${modLabel} + ${getKeyLabel(targetCode)}`;
    }
    else if (type === 'sequence' || type === 'memory') {
      let len = type === 'memory' ? 3 : (trainingMode === 'long_seq' ? Math.max(3, seqLimit) : 2);
      for (let i = 0; i < len; i++) {
        // 25% chance to repeat exact same key sequentially for complexity
        if (i > 0 && Math.random() < 0.25) {
          selectedKeys.push(selectedKeys[i - 1]);
        } else {
          selectedKeys.push(pool[Math.floor(Math.random() * pool.length)]);
        }
      }
      displayString = selectedKeys.map(k => getKeyLabel(k)).join('  ');
    }
    else if (type === 'fake') {
      const trapsAvailable = ALL_KEYS.filter(k => !pool.includes(k.code) && !k.category.includes('advanced'));
      if (trapsAvailable.length > 0) {
        displayString = trapsAvailable[Math.floor(Math.random() * trapsAvailable.length)].label;
      } else {
        displayString = 'Insert';
      }
    }

    let baseTime = 2000;
    if (type === 'sequence') baseTime = selectedKeys.length * 800;
    if (type === 'combo') baseTime = 2200;
    if (type === 'memory') baseTime = selectedKeys.length * 900;
    if (type === 'fake') baseTime = 1300;

    const activeDuration = baseTime * speedMulti;

    engine.current.activePrompt = { type, keys: selectedKeys, displayString, modifier, duration: activeDuration };
    engine.current.typedIndex = 0;
    engine.current.promptDuration = activeDuration;
    engine.current.promptStartedAt = performance.now();
    engine.current.totalPromptsCount += 1;

    setPromptStatus('neutral');

    if (type === 'memory') {
      engine.current.isMemoryMemorize = true;
      setPromptDisplay({ type, text: displayString, textList: selectedKeys.map(k => getKeyLabel(k)), typedCount: 0, isMemoryActive: true, showMemoryContent: true });
      if (engine.current.promptTimer) clearTimeout(engine.current.promptTimer);
      engine.current.promptTimer = setTimeout(() => {
        engine.current.isMemoryMemorize = false;
        setPromptDisplay((prev) => prev ? { ...prev, showMemoryContent: false } : null);
        engine.current.promptStartedAt = performance.now();
        startPromptTimeoutTimer(activeDuration);
      }, Math.max(450, 1000 * speedMulti));
    } else {
      engine.current.isMemoryMemorize = false;
      setPromptDisplay({ type, text: displayString, textList: selectedKeys.map(k => getKeyLabel(k)), typedCount: 0, isMemoryActive: false, showMemoryContent: true });
      startPromptTimeoutTimer(activeDuration);
    }
  }, [enabledKeys, trainingMode, difficultySetting]);

  const startPromptTimeoutTimer = (duration) => {
    if (engine.current.promptTimer) clearTimeout(engine.current.promptTimer);
    engine.current.promptTimer = setTimeout(() => handlePromptTimeout(), duration);
  };

  const handlePromptTimeout = () => {
    const prompt = engine.current.activePrompt;
    if (!prompt) return;

    if (prompt.type === 'fake') {
      if (soundEnabled) audioSynth?.playSuccess(engine.current.combo);
      engine.current.score += 200;
      engine.current.combo += 1;
      engine.current.maxCombo = Math.max(engine.current.maxCombo, engine.current.combo);
      engine.current.fakeIgnoredCount += 1;
      updateAdaptiveParams(true);
      setUiScore(engine.current.score);
      setUiCombo(engine.current.combo);
      setPromptStatus('correct');
      if (engine.current.combo > 0 && engine.current.combo % 10 === 0) audioSynth?.playCombo();
      setTimeout(() => generatePrompt(), 100);
    } else {
      if (soundEnabled) audioSynth?.playPenalty();
      if (engine.current.combo > 0) engine.current.combosRecord.push(engine.current.combo);
      engine.current.combo = 0;
      engine.current.missedPrompts += 1;
      prompt.keys.forEach((k) => recordKeyTelemetry(k, false));
      updateAdaptiveParams(false);
      setUiCombo(0);
      setPromptStatus('incorrect');
      setTimeout(() => generatePrompt(), 150);
    }
  };

  const handleSuccess = (reactionTime) => {
    if (engine.current.promptTimer) clearTimeout(engine.current.promptTimer);
    if (soundEnabled) audioSynth?.playSuccess(engine.current.combo);

    const speedRatio = Math.max(0.1, 1 - (reactionTime / engine.current.promptDuration));
    const pointsEarned = Math.round(120 * speedRatio * (1 + Math.floor(engine.current.combo / 5) * 0.15));

    engine.current.score += pointsEarned;
    engine.current.combo += 1;
    engine.current.maxCombo = Math.max(engine.current.maxCombo, engine.current.combo);
    engine.current.hits += 1;
    engine.current.reactionTimes.push(reactionTime);
    
    engine.current.activePrompt.keys.forEach((k) => recordKeyTelemetry(k, true, reactionTime));
    if (['sequence', 'memory'].includes(engine.current.activePrompt.type)) engine.current.correctSequencesCount += 1;

    updateAdaptiveParams(true, reactionTime);
    setUiScore(engine.current.score);
    setUiCombo(engine.current.combo);
    setUiLevel(getLevelConfig(engine.current.score).level);
    setPromptStatus('correct');
    
    if (engine.current.combo > 0 && engine.current.combo % 10 === 0) audioSynth?.playCombo();
    setTimeout(() => generatePrompt(), 100);
  };

  const handleFailure = () => {
    if (engine.current.promptTimer) clearTimeout(engine.current.promptTimer);
    if (soundEnabled) audioSynth?.playPenalty();

    if (engine.current.combo > 0) engine.current.combosRecord.push(engine.current.combo);
    engine.current.combo = 0;
    engine.current.misses += 1;

    const prompt = engine.current.activePrompt;
    if (prompt) {
      if (prompt.type === 'fake') engine.current.fakeFailsCount += 1;
      else {
        if (['sequence', 'memory'].includes(prompt.type)) engine.current.failedSequencesCount += 1;
        prompt.keys.forEach((k) => recordKeyTelemetry(k, false));
      }
    }
    updateAdaptiveParams(false);
    setUiCombo(0);
    setPromptStatus('incorrect');
    setTimeout(() => generatePrompt(), 150);
  };

  const handleKeyDown = useCallback((e) => {
    if (document.activeElement?.tagName === 'INPUT') return;
    if (e.repeat) return;
    
    // Aggressive shortcut interception while playing
    if (engine.current.activePrompt) {
       // Only allow DevTools F12 through, block everything else so user doesn't refresh/exit randomly
       if (e.code !== 'F12') {
         e.preventDefault();
       }
    }

    const curPrompt = engine.current.activePrompt;
    if (!curPrompt) return;

    const isModifierKey = ['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight'].includes(e.code);
    
    const matchesCode = (expected, actual) => {
      if (expected === 'ShiftLeft') return actual === 'ShiftLeft' || actual === 'ShiftRight';
      if (expected === 'ControlLeft') return actual === 'ControlLeft' || actual === 'ControlRight';
      if (expected === 'AltLeft') return actual === 'AltLeft' || actual === 'AltRight';
      if (expected === 'Enter') return actual === 'Enter' || actual === 'NumpadEnter';
      if (expected.startsWith('Digit') && actual.startsWith('Numpad')) {
        return expected.replace('Digit', '') === actual.replace('Numpad', '');
      }
      return expected === actual;
    };

    let expectingModifierStandalone = false;
    if (curPrompt.type === 'single' && matchesCode(curPrompt.keys[0], e.code)) expectingModifierStandalone = true;
    else if (['sequence', 'memory'].includes(curPrompt.type) && matchesCode(curPrompt.keys[engine.current.typedIndex], e.code)) expectingModifierStandalone = true;

    if (isModifierKey && !expectingModifierStandalone && curPrompt.type === 'combo') return;

    if (soundEnabled) audioSynth?.playClick();
    engine.current.totalKeypresses += 1;
    const reactionTime = performance.now() - engine.current.promptStartedAt;

    if (curPrompt.type === 'fake' || (curPrompt.type === 'memory' && engine.current.isMemoryMemorize)) {
      handleFailure(); return;
    }

    if (curPrompt.type === 'combo') {
      let modifierHeld = false;
      if (curPrompt.modifier === 'ShiftLeft') modifierHeld = e.shiftKey;
      else if (curPrompt.modifier === 'ControlLeft') modifierHeld = e.ctrlKey;
      else if (curPrompt.modifier === 'AltLeft') modifierHeld = e.altKey;

      if (matchesCode(curPrompt.keys[0], e.code) && modifierHeld) {
        engine.current.correctKeypresses += 1; handleSuccess(reactionTime);
      } else handleFailure();
    }
    else if (curPrompt.type === 'single') {
      if (matchesCode(curPrompt.keys[0], e.code)) { engine.current.correctKeypresses += 1; handleSuccess(reactionTime); }
      else handleFailure();
    }
    else if (['sequence', 'memory'].includes(curPrompt.type)) {
      if (matchesCode(curPrompt.keys[engine.current.typedIndex], e.code)) {
        engine.current.correctKeypresses += 1;
        engine.current.typedIndex += 1;
        setPromptDisplay((prev) => prev ? { ...prev, typedCount: engine.current.typedIndex } : null);
        if (engine.current.typedIndex === curPrompt.keys.length) handleSuccess(reactionTime);
      } else handleFailure();
    }
  }, [soundEnabled, generatePrompt]);

  useEffect(() => {
    if (gameState === 'playing') window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleKeyDown]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    engine.current.timeLeft = sessionTime === 'survival' ? 30 : parseInt(sessionTime, 10);
    setIsSurvival(sessionTime === 'survival');
    setUiTimeLeft(engine.current.timeLeft);
    engine.current.activeTime = 0;

    const interval = setInterval(() => {
      engine.current.activeTime += 1;
      engine.current.timeLeft = Math.max(0, engine.current.timeLeft - 1);
      setUiTimeLeft(engine.current.timeLeft);
      if (engine.current.timeLeft <= 5 && engine.current.timeLeft > 0 && soundEnabled) audioSynth?.playTick();
      if (engine.current.timeLeft <= 0) { clearInterval(interval); endGame(); }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, sessionTime, soundEnabled]);

  const startGame = async () => {
    if (audioSynth) audioSynth.init();
    if (document.activeElement) document.activeElement.blur();
    
    try {
      const el = containerRef.current || document.documentElement;
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (e) {
      console.error('Fullscreen request blocked.');
    }

    engine.current = { ...engine.current, score: 0, combo: 0, maxCombo: 0, hits: 0, misses: 0, missedPrompts: 0, totalKeypresses: 0, correctKeypresses: 0, reactionTimes: [], highestLevel: 1, combosRecord: [], keyPerformance: {}, totalPromptsCount: 0, correctSequencesCount: 0, failedSequencesCount: 0, fakeIgnoredCount: 0, fakeFailsCount: 0, adaptiveMultiplier: 1.0, recentHits: [] };
    
    setUiScore(0); setUiCombo(0); setUiLevel(1); setUiAccuracy(100); setPromptStatus('neutral'); setIsNewBest(false);
    setGameState('playing');
    generatePrompt();
  };

  const endGame = () => {
    if (engine.current.promptTimer) clearTimeout(engine.current.promptTimer);
    if (engine.current.combo > 0) engine.current.combosRecord.push(engine.current.combo);

    const correct = engine.current.hits + engine.current.fakeIgnoredCount;
    const wrong = engine.current.misses + engine.current.fakeFailsCount;
    const accuracy = engine.current.totalKeypresses > 0 ? Math.round((engine.current.correctKeypresses / engine.current.totalKeypresses) * 100) : 100;
    
    const rTimes = engine.current.reactionTimes;
    const avgReact = rTimes.length > 0 ? Math.round(rTimes.reduce((a, b) => a + b, 0) / rTimes.length) : 0;
    const kpmVal = Math.round(engine.current.correctKeypresses / (Math.max(1, engine.current.activeTime) / 60));
    
    const weak = [];
    const strong = [];
    Object.entries(engine.current.keyPerformance).forEach(([code, data]) => {
      const total = data.hits + data.misses;
      if (total >= 2) {
        const acc = (data.hits / total) * 100;
        if (acc < 80) weak.push(getKeyLabel(code));
        else if (acc >= 95) strong.push(getKeyLabel(code));
      }
    });

    if (engine.current.score > bestScore) {
      localStorage.setItem('kb_drill_high_score_v7', engine.current.score.toString());
      setBestScore(engine.current.score);
      setIsNewBest(true);
      if(soundEnabled) audioSynth?.playHighScore();
    }

    setAnalytics({
      accuracy, kpm: kpmVal, avgReaction: avgReact, maxCombo: engine.current.maxCombo,
      averageCombo: engine.current.combosRecord.length ? Math.round(engine.current.combosRecord.reduce((a,b)=>a+b,0)/engine.current.combosRecord.length) : 0,
      rankData: calculateRank(engine.current.score, accuracy),
      weakKeys: weak.slice(0, 3), strongKeys: strong.slice(0, 3), reactionTimesList: rTimes.slice(-30),
      fakeIgnored: engine.current.fakeIgnoredCount, fakeFails: engine.current.fakeFailsCount, incorrectInputs: wrong, missedPrompts: engine.current.missedPrompts
    });
    setGameState('gameOver');
  };

  return (
    <div ref={containerRef} className={`relative select-none text-white font-sans ${isFullscreen ? 'bg-[#030509] p-0 m-0 w-full h-full' : 'min-h-screen bg-[#050508]'}`}>
      
      {/* ABSOLUTE TOP TIMING BAR (FULLSCREEN ONLY) */}
      {gameState === 'playing' && isFullscreen && (
        <div className="fixed top-0 left-0 right-0 h-2 bg-slate-900 z-[9999]">
          <div className={`h-full transition-all ease-linear ${uiTimeLeft <= 10 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (uiTimeLeft / (isSurvival ? 60 : sessionTime)) * 100)}%` }} />
        </div>
      )}

      {/* FULLSCREEN IN-GAME HUD */}
      {isFullscreen && gameState === 'playing' && (
        <div className="fixed top-6 right-4 z-[9999] flex items-center gap-4 text-xs font-mono bg-black/70 border border-slate-800 shadow-2xl rounded-xl px-4 py-2">
          <div className="flex items-center gap-1.5 border-r border-slate-700 pr-3">
            <Trophy className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-white font-bold">{uiScore}</span>
          </div>
          <div className="flex items-center gap-1.5 border-r border-slate-700 pr-3">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-bold">Lv.{uiLevel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Timer className={`w-3.5 h-3.5 ${uiTimeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-blue-400'}`} />
            <span className={`font-bold ${uiTimeLeft <= 10 ? 'text-rose-500' : 'text-white'}`}>{uiTimeLeft}s</span>
          </div>
          <button onClick={() => setSoundEnabled(v => !v)} className="ml-4 text-slate-400 hover:text-emerald-400 transition-colors">
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button onClick={toggleFullscreen} className="ml-2 text-slate-400 hover:text-rose-400 transition-colors">
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className={isFullscreen ? 'w-full h-full flex flex-col justify-center' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
        
        {/* HEADER NAV */}
        {!isFullscreen && (
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-5">
            <div>
              <nav className="mb-2">
                <ol className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  <li><Link href="/" className="hover:text-emerald-400">Home</Link></li>
                  <li><ChevronRight className="w-3 h-3 text-gray-700" /></li>
                  <li><Link href="/drills/motor" className="hover:text-emerald-400">Motor Skills</Link></li>
                  <li><ChevronRight className="w-3 h-3 text-gray-700" /></li>
                  <li className="text-emerald-400 font-bold">Keyboard Recognition</li>
                </ol>
              </nav>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Keyboard className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-white uppercase font-mono">Keyboard Recognition Pro</h1>
                  <p className="text-xs text-gray-400 mt-0.5">Gaming Keybind Precision & Response Inhibition Calibration</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 rounded-lg border border-slate-800 bg-[#070b13] text-gray-400 hover:text-white transition-all active:scale-95">
                {soundEnabled ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-slate-800 bg-[#070b13] text-gray-400 hover:text-white transition-all active:scale-95">
                <Maximize2 className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        )}

        {/* METRICS HUD */}
        {!isFullscreen && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-6">
            <StatCard icon={<Trophy className="text-yellow-400" />} value={uiScore} label="Score" />
            <StatCard icon={<TrendingUp className={getLevelConfig(uiScore).color} />} value={`Lv. ${uiLevel}`} label="Level" />
            <StatCard icon={<Timer className={uiTimeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'} />} value={Math.floor(uiTimeLeft)} label="Time" unit={isSurvival ? "Surv" : "s"} />
            <StatCard icon={<Target className="text-blue-400" />} value={`${uiAccuracy}%`} label="Accuracy" />
            <StatCard icon={<Flame className={uiCombo >= 10 ? "text-orange-500 animate-pulse" : "text-gray-500"} />} value={uiCombo} label="Combo" highlight={uiCombo >= 10} />
            <StatCard icon={<Sparkles className="text-yellow-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        {/* MAIN LAYOUT */}
        <div className={`grid grid-cols-1 ${!isFullscreen && gameState !== 'playing' ? 'lg:grid-cols-3' : ''} gap-6`}>
          
          <div className={`${!isFullscreen && gameState !== 'playing' ? 'lg:col-span-2' : 'w-full h-full'} flex flex-col`}>
            
            {/* Play Container: Borderless in Fullscreen */}
            <div className={`relative flex flex-col items-center justify-center bg-[#030509] shadow-2xl transition-colors ${isFullscreen ? 'w-full h-screen fixed inset-0 z-10 border-none rounded-none' : 'w-full min-h-[460px] rounded-2xl border border-slate-900'}`}>
              
              {/* GAME ACTIVE: TRUE FULLSCREEN NO BORDERS / PURE MINIMALIST */}
              {gameState === 'playing' && promptDisplay && (
                <div className={`w-full h-full flex items-center justify-center select-none z-10 transition-colors duration-150 ${
                    promptStatus === 'correct' ? 'bg-emerald-500/10' :
                    promptStatus === 'incorrect' ? 'bg-rose-500/10' :
                    promptDisplay.type === 'fake' ? 'bg-amber-500/10' :
                    promptDisplay.type === 'memory' && promptDisplay.isMemoryActive ? 'bg-cyan-500/10' : ''
                  }`}>
                  
                  <div className="w-[95%] max-w-5xl flex items-center justify-center flex-wrap">
                    
                    {/* TRAP KEY */}
                    {promptDisplay.type === 'fake' && (
                       <div className={`text-6xl md:text-8xl lg:text-[9rem] font-black uppercase text-amber-500 font-sans tracking-wide drop-shadow-[0_0_20px_rgba(245,158,11,0.4)] whitespace-nowrap`}>
                          {promptDisplay.text}
                       </div>
                    )}

                    {/* MEMORY KEYS */}
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

                    {/* SEQUENCE KEYS */}
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

                    {/* SINGLE & COMBO KEYS */}
                    {['single', 'combo'].includes(promptDisplay.type) && (
                      <div className="text-5xl md:text-7xl lg:text-[8rem] font-mono font-black text-white tracking-widest drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] whitespace-nowrap overflow-visible">
                        {promptDisplay.text}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GAME IDLE SCREEN */}
              {gameState === 'start' && (
                <div className="absolute inset-0 bg-[#05070e]/95 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto backdrop-blur-md">
                  <div className="max-w-md w-full text-center py-6">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <Keyboard className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-2 font-mono">
                      Keyboard Pro Trainer
                    </h2>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-8 leading-relaxed">
                      Calibrate mechanical muscle memory & cognitive inhibition limits
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-8 text-left font-mono">
                      <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold mb-1">Session Mode</span>
                        <span className="text-xs font-black text-white capitalize truncate">{trainingMode.replace('_', ' ')}</span>
                      </div>
                      <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold mb-1">Difficulty</span>
                        <span className="text-xs font-black text-emerald-400 uppercase">{difficultySetting}</span>
                      </div>
                      <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold mb-1">Target Profile</span>
                        <span className="text-xs font-black text-blue-400 truncate block">{selectedProfile}</span>
                      </div>
                      <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold mb-1">Time Limit</span>
                        <span className="text-xs font-black text-purple-400 uppercase">{sessionTime === 'survival' ? 'Survival' : `${sessionTime}s`}</span>
                      </div>
                    </div>

                    <button onClick={startGame} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] uppercase tracking-widest transition-all duration-200 active:scale-95 mx-auto">
                      <Play className="w-4 h-4 fill-white" /> BEGIN DRILL (FULLSCREEN)
                    </button>
                  </div>
                </div>
              )}

              {/* GAME OVER SCREEN */}
              {gameState === 'gameOver' && analytics.rankData && (
                <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto backdrop-blur-md">
                  <div className="max-w-xl w-full text-center py-4">
                    {isNewBest && <div className="inline-block bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce font-mono">⭐ NEW PERSONAL BEST!</div>}
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-2 font-mono">Session Complete</h2>
                    <div className="text-2xl text-yellow-400 tracking-widest mb-6 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
                      {"★".repeat(uiScore >= 3500 && analytics.accuracy >= 94 ? 5 : uiScore >= 2200 && analytics.accuracy >= 88 ? 4 : uiScore >= 1400 && analytics.accuracy >= 82 ? 3 : uiScore >= 700 && analytics.accuracy >= 70 ? 2 : 1).padEnd(5, "☆")}
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-5 text-left font-mono">
                      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl"><span className="text-[9px] text-slate-500 block uppercase font-bold mb-0.5">Final Score</span><span className="text-xl font-black text-white">{uiScore}</span></div>
                      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl"><span className="text-[9px] text-slate-500 block uppercase font-bold mb-0.5">Accuracy</span><span className="text-xl font-black text-white">{analytics.accuracy}%</span></div>
                      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl"><span className="text-[9px] text-slate-500 block uppercase font-bold mb-0.5">KPM</span><span className="text-xl font-black text-white">{analytics.kpm}</span></div>
                      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl"><span className="text-[9px] text-slate-500 block uppercase font-bold mb-0.5">Avg Reaction</span><span className="text-xl font-black text-white">{analytics.avgReaction}ms</span></div>
                      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl"><span className="text-[9px] text-slate-500 block uppercase font-bold mb-0.5">Max Combo</span><span className="text-xl font-black text-white">{analytics.maxCombo}x</span></div>
                      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex flex-col justify-center"><span className="text-[9px] text-slate-500 block uppercase font-bold mb-0.5">Assigned Rank</span><span className={`text-[14px] font-black ${analytics.rankData.color} truncate block`}>{analytics.rankData.rank}</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5 text-left font-mono text-[10px]">
                      <div className="bg-[#0b0f19] border border-slate-800 p-3 rounded-xl"><span className="text-slate-500 block uppercase font-bold text-[9px] mb-2">Strongest Nodes</span><div className="flex gap-1.5 flex-wrap">{analytics.strongKeys.map((k) => <span key={k} className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">{k}</span>)}</div></div>
                      <div className="bg-[#0b0f19] border border-slate-800 p-3 rounded-xl"><span className="text-slate-500 block uppercase font-bold text-[9px] mb-2">Weakest Nodes</span><div className="flex gap-1.5 flex-wrap">{analytics.weakKeys.map((k) => <span key={k} className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded text-[10px] font-bold">{k}</span>)}</div></div>
                    </div>

                    <div className="bg-[#0b0f19] border border-slate-800 p-4 rounded-xl mb-6 text-left text-xs text-slate-300 font-sans shadow-inner">
                      <div className="flex items-center gap-1.5 text-[11px] font-black text-white uppercase mb-2 font-mono"><Sparkles className="w-4 h-4 text-emerald-500" /> Coaching Evaluation:</div>
                      <p className="leading-relaxed">
                        {analytics.accuracy >= 96 ? "Phenomenal dexterity and response inhibition! Your cognitive processing and keyboard muscle memory are elite." :
                         analytics.fakeFails > 2 ? "You are failing fake prompts. Work on response inhibition—when you see an invalid prompt trap, freeze and keep your fingers still." :
                         analytics.missedPrompts > analytics.incorrectInputs ? "You are letting prompts expire without responding. Speed up your visual recognition and search pathways." :
                         analytics.incorrectInputs > analytics.missedPrompts ? "Your accuracy is dropping due to mistyped keys. Slow down slightly and prioritize precision. Speed will follow." :
                         "Solid execution! Continue practicing to build faster recognition speeds and longer sequence tolerances."}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={startGame} className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95 font-mono"><RefreshCw className="w-4 h-4" /> Play Again</button>
                      <button onClick={async () => {
                        const text = `⌨️ I scored ${uiScore} PTS (${analytics.rankData?.rank}) on Keyboard Recognition Speed Trainer! KPM: ${analytics.kpm} | Accuracy: ${analytics.accuracy}%. Beat me at skilldrills.online!`;
                        if (typeof navigator !== 'undefined' && navigator.clipboard) { navigator.clipboard.writeText(text); alert('Score card copied!'); }
                      }} className="p-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95" title="Share Session"><Share2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          {!isFullscreen && gameState !== 'playing' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-900 bg-[#090b11] p-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4"><div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-emerald-400" /><h3 className="font-bold text-white uppercase text-[11px] tracking-wider font-mono">Engine Config</h3></div></div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider block mb-2">Gameplay Mode</label>
                    <select value={trainingMode} onChange={(e) => setTrainingMode(e.target.value)} className="w-full text-xs font-bold bg-[#05070e] border border-slate-850 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                      <option value="dynamic">Dynamic Mixed Progression</option><option value="single">Single Key Recognition</option>
                      <option value="letters">Letters Only (A-Z)</option><option value="numbers">Numbers Only (0-9)</option>
                      <option value="mix">Letters + Numbers Mix</option><option value="gaming">Gaming Keys Only</option>
                      <option value="short_seq">Short Sequences</option><option value="long_seq">Long Sequences</option>
                      <option value="memory">Memory Recall Mode</option><option value="fake">Inhibition Traps</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider block mb-2">Difficulty</label>
                    <select value={difficultySetting} onChange={(e) => setDifficultySetting(e.target.value)} className="w-full text-xs font-bold bg-[#05070e] border border-slate-850 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                      <option value="adaptive">Adaptive Engine</option><option value="easy">Easy (1.5x Time)</option>
                      <option value="medium">Medium (1.0x Time)</option><option value="hard">Hard (0.75x Time)</option>
                      <option value="expert">Expert (0.55x extreme)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider block mb-2">Time Limit</label>
                    <select value={sessionTime} onChange={(e) => setSessionTime(e.target.value === 'survival' ? 'survival' : parseInt(e.target.value, 10))} className="w-full text-xs font-bold bg-[#05070e] border border-slate-850 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                      <option value="30">30 Seconds</option><option value="60">60 Seconds</option>
                      <option value="90">90 Seconds</option><option value="survival">Survival</option>
                    </select>
                  </div>

                  <div className="pt-2 border-t border-slate-850">
                    <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider block mb-3">Esports Presets</span>
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      {Object.keys(PRESETS_ANNOTATED).map(pName => (
                        <button key={pName} onClick={() => handleLoadPreset(pName)} className={`py-1.5 px-1 rounded text-[9px] font-mono font-bold border transition-colors ${selectedProfile === pName ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 bg-[#05070e] text-slate-400 hover:text-white'}`}>{pName}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-900 bg-[#090b11] p-5 shadow-xl">
                <div className="flex items-center gap-2 border-b border-slate-850 pb-3 mb-4"><Keyboard className="w-4 h-4 text-emerald-400" /><h3 className="font-bold text-white uppercase text-[11px] tracking-wider font-mono">Quick Keys</h3></div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {['letters', 'numbers', 'symbols', 'modifier'].map(type => (
                    <button key={type} onClick={() => { setSelectedProfile('Custom'); setEnabledKeys(ALL_KEYS.filter(k => k.category.includes(type === 'letters' ? 'letter' : type === 'numbers' ? 'number' : type === 'symbols' ? 'symbol' : 'essential') && (type !== 'modifier' || ['ShiftLeft', 'ControlLeft', 'AltLeft'].includes(k.code))).map(k => k.code)); }} className="py-2 bg-[#05070e] border border-slate-850 text-slate-300 font-mono text-[9px] uppercase tracking-wider rounded-lg hover:border-slate-700 transition-all">{type} Only</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CUSTOM KEYBOARD SELECTOR */}
        {!isFullscreen && gameState !== 'playing' && (
          <section className="mt-8">
            <div className="rounded-2xl border border-slate-900 bg-[#070a10] p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-850 pb-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-bold text-white text-sm tracking-wide uppercase font-mono">Active Key Bindings Map</h2>
                </div>
                <span className="px-3 py-1 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400">Selected Keys: {enabledKeys.length}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {[
                  { title: "Letters (A-Z)", list: ALL_KEYS.filter(k => k.category === 'letter') },
                  { title: "Numbers (0-9)", list: ALL_KEYS.filter(k => k.category === 'number') },
                  { title: "Essential Modifiers", list: ALL_KEYS.filter(k => k.category === 'essential') },
                  { title: "Symbols", list: ALL_KEYS.filter(k => k.category === 'symbol') }
                ].map(group => (
                  <div key={group.title} className="bg-[#040609] p-4 rounded-xl border border-slate-850 shadow-inner flex flex-col">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3 pb-1 border-b border-slate-900 block">{group.title}</span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-1.5">
                      {group.list.map(key => {
                        const isEnabled = enabledKeys.includes(key.code);
                        return (
                          <button key={key.code} onClick={() => { setSelectedProfile('Custom'); setEnabledKeys(prev => prev.includes(key.code) ? (prev.length > 1 ? prev.filter(k => k !== key.code) : prev) : [...prev, key.code]); }} className={`py-2 px-1 rounded-md font-mono text-xs font-bold border transition-colors ${isEnabled ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 bg-[#070b13] text-slate-600 hover:border-slate-700'}`}>{key.label}</button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RULES */}
        {!isFullscreen && (
          <section className="mt-12">
            <div className="rounded-2xl border border-slate-900 overflow-hidden bg-slate-950/40 shadow-2xl">
              <div className="px-6 py-5 border-b border-slate-900 bg-[#05070e] flex items-center gap-3">
                <Info className="w-5 h-5 text-emerald-400" />
                <h2 className="font-bold text-white text-sm tracking-wide uppercase font-mono">Progression & Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <RuleItem num="1" color="green" text="Correct Input" highlight="+120 Points Base" result="Increases adaptive speed" />
                <RuleItem num="2" color="blue" text="Fake Prompts (e.g. invalid key)" highlight="DO NOT PRESS" result="Ignore = +200 PTS" />
                <RuleItem num="3" color="red" text="Wrong Key / Fail Trap" highlight="Resets Combo" result="Lowers adaptive difficulty" />
                <RuleItem num="4" color="orange" text="Combos & Sequences" highlight="Multipliers" result="Huge score bonuses" />
              </div>
            </div>
          </section>
        )}

        {/* ABOUT & FAQ */}
        {!isFullscreen && (
          <article className="mt-12">
            <div className="rounded-2xl border border-slate-900 overflow-hidden bg-[#070b13] shadow-xl">
              <div className="px-6 py-5 border-b border-slate-850 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Keyboard Recognition Training</h2>
              </div>
              <div className="p-8 space-y-8">
                <section>
                  <p className="text-sm leading-relaxed text-slate-400 font-sans">
                    The **Keyboard Recognition & Keybind Speed Trainer** is an advanced neuro-motor training tool designed to bridge the gap between visual prompt recognition and physical keybind execution. Unlike traditional typists who rely on static continuous typing models, competitive gamers must trigger disparate bindings instantly from any finger coordinate. This trainer isolates these specific neural pathways to optimize muscle memory for titles like Valorant, League of Legends, and Fortnite.
                  </p>
                </section>
                <div className="bg-[#040609] border border-slate-850 p-8 rounded-xl font-sans">
                  <div className="flex items-center gap-3 mb-6"><Lightbulb className="w-6 h-6 text-yellow-400" /><h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FAQItem q="How does this help my muscle memory?" a="By repeatedly bridging the visual stimulus to keybind translation loop, it moves mechanical finger coordinates from conscious search to reflexes." />
                    <FAQItem q="What is Adaptive Difficulty?" a="An intelligent engine that tracks your performance in real time, increasing speed and complexity when you make streaks, and slowing down when you struggle." />
                    <FAQItem q="How do fake prompts train response inhibition?" a="Instead of letters you selected, the engine throws random invalid keys. Pressing keys during a fake prompt triggers an immediate penalty, forcing you to verify before pressing." />
                    <FAQItem q="Is it compatible with custom keyboard layouts?" a="Yes! The engine captures standard JavaScript event code signals, meaning it works accurately regardless of your physical keyboard layout or key positions." />
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-14">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-emerald-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Explore Motor Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer Elite" desc="Time-survival moving target click test." color="emerald" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/movement-speed/finger-sequencing" title="Finger Sequencing" desc="Scale clicks from largest to smallest." color="green" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/precision-control/steady-hand" title="Steady Hand Game" desc="Trace narrow winding path corridors." color="orange" icon={<Shield className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/timing-accuracy/synchronization" title="Synchronization" desc="Trigger click on bar converge." color="purple" icon={<Timer className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER WITH SOCIAL LINKS */}
        {!isFullscreen && (
          <footer className="mt-16 bg-[#030407] border border-slate-900 text-slate-500 rounded-2xl py-10 px-6 font-mono text-[10px]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8 text-left">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-emerald-400">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/motor/movement-speed/keyboard-recognition" className="text-emerald-400 font-bold hover:text-emerald-300">Keyboard Trainer</Link></li>
                    <li><Link href="/drills/motor" className="hover:text-emerald-400 font-bold">All Motor Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-emerald-400">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-emerald-400">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="hover:text-emerald-400 font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-emerald-400">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-emerald-400">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="hover:text-emerald-400 font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-emerald-400">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-emerald-400">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="hover:text-emerald-400 font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-emerald-400">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-emerald-400">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <Keyboard className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-black tracking-widest text-sm uppercase">SkillDrills</span>
                </div>
                <p className="text-[10px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[10px] max-w-2xl mx-auto leading-relaxed mb-6">Free browser-based keyboard reaction and response inhibition simulator.</p>
                
                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// === Subcomponents ===

function StatCard({ icon, value, label, unit = '', highlight = false }) {
  return (
    <div className={`group rounded-xl border ${highlight ? 'border-orange-500/50 bg-orange-500/5' : 'border-slate-900 bg-[#070b13]'} p-2.5 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800`}>
      <div className="mb-1.5 flex justify-center transition-transform duration-300 group-hover:scale-110">{icon}</div>
      <p className="text-sm font-extrabold tracking-tight truncate text-white">{value} <span className="text-[10px] font-semibold text-slate-500">{unit}</span></p>
      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    green: 'bg-green-600 text-green-300 border-green-500',
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500'
  };
  const colors = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500';
  const [bg, txt, border] = colors.split(' ');
  return (
    <div className="flex items-center gap-4 bg-[#0a0d16] p-4 rounded-xl border border-slate-800 shadow-sm">
      <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0`}>{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
        <p className="text-xs font-bold text-slate-300">{text}{highlight && <span className={`font-black ${txt}`}> {highlight}</span>}</p>
        <div className={`text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#050811] border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center`}>{result}</div>
      </div>
    </div>
  );
}

function RelatedCard({ href, title, desc, color, icon }) {
  const gradients = { emerald: 'from-emerald-500 to-green-500', green: 'from-green-500 to-emerald-500', orange: 'from-orange-500 to-amber-500', purple: 'from-purple-500 to-fuchsia-500' };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-900 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-emerald-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white mb-3 shadow-inner">{icon}</div>
      <h3 className="font-bold text-sm mb-1.5 text-white group-hover:text-emerald-400 transition-colors">{title}</h3>
      <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">{desc}</p>
      <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">Start Drill <ArrowRight className="w-3.5 h-3.5" /></div>
    </Link>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-slate-900 rounded-xl p-5 hover:border-slate-800 transition-colors">
      <h4 className="text-xs font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-[11px] text-gray-400 leading-relaxed">{a}</p>
    </div>
  );
}