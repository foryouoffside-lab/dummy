'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  Zap,
  Volume2, VolumeX, Maximize2, Minimize2,
  Play, Pause, Eye, FileText, Target, Timer,
  BarChart3, Info, BookOpen, ChevronUp, ChevronDown, RefreshCw,
  GraduationCap, Lightbulb, TrendingUp, ArrowRight,
  Brain, Code2, Hash, Headphones, Keyboard, Share2, LogOut ,ChevronRight
} from 'lucide-react';

// ============================================================
// AUDIO SYNTHESIZER
// ============================================================
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  
  init() {
    if (!this.ctx) {
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  playStart() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.25);
    } catch(e) {}
  }

  playComplete() {
    if (!this.enabled || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.12 + 0.2);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.12);
        osc.stop(this.ctx.currentTime + i * 0.12 + 0.2);
      });
    } catch(e) {}
  }

  setEnabled(status) { this.enabled = status; }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function RSVPReaderClient() {
  // === UI State ===
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // === Game State ===
  const [gameState, setGameState] = useState('start');
  const [wpm, setWpm] = useState(300);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const defaultText = useMemo(() => `Neuroplasticity is the brain's remarkable ability to reorganize itself by forming new neural connections throughout life. This extraordinary process allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or to changes in their environment. The human brain contains approximately eighty-six billion neurons, each capable of forming thousands of synaptic connections with other neurons. This vast network is constantly being reshaped by our experiences, thoughts, and learning. Rapid Serial Visual Presentation represents a revolutionary approach to reading that leverages the brain's natural plasticity. Traditional reading involves saccadic eye movements where the eyes jump from word to word, fixating on each for approximately two hundred to two hundred fifty milliseconds. These constant movements create significant cognitive overhead and limit reading speed to around two hundred to three hundred words per minute for most educated adults. RSVP technology eliminates these inefficient eye movements entirely. By presenting words sequentially at a fixed focal point, RSVP allows the visual cortex to process lexical tokens at a rate significantly higher than standard reading methods permit. Research conducted at leading universities has demonstrated that with proper training, individuals can achieve reading speeds exceeding one thousand words per minute while maintaining comprehension levels comparable to traditional reading. This represents a three to four fold increase in information processing capacity. The key to RSVP's effectiveness lies in the Optimal Recognition Point theory. Each word has a specific letter position where the brain most efficiently recognizes and processes it. For most English words, this point falls slightly left of center. By aligning this ORP consistently, the brain can process words with minimal cognitive effort. Regular practice with RSVP technology has been shown to produce lasting changes in the brain's reading networks.`, []);
  
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [wordsRead, setWordsRead] = useState(0);
  
  // === Feedback State ===
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  // === Refs ===
  const timerRef = useRef(null);
  const streamTimerRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const gameStateRef = useRef('start');
  const isPlayingRef = useRef(false);
  const mountedRef = useRef(false);
  
  const words = useMemo(() => defaultText.trim().split(/\s+/).filter(w => w.length > 0), [defaultText]);
  const effectiveWPM = useMemo(() => timeElapsed > 0 ? Math.round((wordsRead / timeElapsed) * 60) : 0, [timeElapsed, wordsRead]);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  
  useEffect(() => { 
    setIsClient(true); mountedRef.current = true;
    const t = setTimeout(() => { if (mountedRef.current) setLoading(false); }, 200);
    return () => { mountedRef.current = false; clearTimeout(t); };
  }, []);

  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);

  useEffect(() => { 
    const h = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', h); 
    return () => document.removeEventListener('fullscreenchange', h); 
  }, []);

  const enterFullscreen = useCallback(async () => { 
    try { 
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen(); 
      }
    } catch (err) {} 
  }, []);

  const exitFullscreen = useCallback(async () => { 
    try { 
      if (document.fullscreenElement) {
        await document.exitFullscreen(); 
      }
    } catch (err) {} 
  }, []);

  const toggleFullscreen = useCallback(async () => { 
    if (isFullscreen) await exitFullscreen(); 
    else await enterFullscreen(); 
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  const showFeedbackMsg = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { if (mountedRef.current) { setFeedback(''); setFeedbackType(''); } }, 800);
  }, []);

  const getORP = useCallback((word) => {
    if (!word) return { prefix: '', pivot: '', suffix: '' };
    const l = word.length;
    if (l <= 1) return { prefix: '', pivot: word, suffix: '' };
    if (l <= 3) return { prefix: word[0], pivot: word[1], suffix: word.slice(2) };
    const pi = Math.floor(l / 2.5);
    return { prefix: word.substring(0, pi), pivot: word.charAt(pi), suffix: word.substring(pi + 1) };
  }, []);

  const startReading = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    await enterFullscreen();
    if (words.length === 0) return;
    
    setGameState('playing'); 
    gameStateRef.current = 'playing';
    setIsPlaying(true); 
    isPlayingRef.current = true;
    setWordIndex(0); 
    setTimeElapsed(0); 
    setWordsRead(0);
    
    if (audioSynth) audioSynth.playStart();
    showFeedbackMsg(`Reading started at ${wpm} WPM`, 'success');
  }, [words.length, wpm, showFeedbackMsg, enterFullscreen]);

  const pauseReading = useCallback(() => { 
    setIsPlaying(false); 
    isPlayingRef.current = false; 
    if (streamTimerRef.current) { 
      clearInterval(streamTimerRef.current); 
      streamTimerRef.current = null; 
    } 
  }, []);

  const resumeReading = useCallback(() => { 
    setIsPlaying(true); 
    isPlayingRef.current = true; 
  }, []);

  const resetGame = useCallback(() => {
    setIsPlaying(false); 
    isPlayingRef.current = false;
    setGameState('start'); 
    gameStateRef.current = 'start';
    setWordIndex(0); 
    setTimeElapsed(0); 
    setWordsRead(0); 
    setFeedback('');
    
    if (streamTimerRef.current) { clearInterval(streamTimerRef.current); streamTimerRef.current = null; }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  }, []);

  const handleExit = async () => {
    await exitFullscreen();
    resetGame();
  };

  const handleSpeedUp = useCallback(() => setWpm(w => Math.min(1000, w + 50)), []);
  const handleSpeedDown = useCallback(() => setWpm(w => Math.max(100, w - 50)), []);

  // Word stream timer
  useEffect(() => {
    if (isPlaying && gameState === 'playing' && wordIndex < words.length) {
      const cw = words[wordIndex];
      const mpw = (60 / wpm) * 1000;
      const len = cw?.length || 5;
      const wt = len > 8 ? 1.2 : len < 4 ? 0.9 : 1.0;
      
      streamTimerRef.current = setInterval(() => {
        setWordIndex((prev) => {
          const ni = prev + 1;
          setWordsRead(ni);
          
          if (ni >= words.length) {
            if (streamTimerRef.current) { clearInterval(streamTimerRef.current); streamTimerRef.current = null; }
            if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
            setIsPlaying(false); 
            isPlayingRef.current = false;
            
            if (audioSynth) audioSynth.playComplete();
            setGameState('gameOver'); 
            gameStateRef.current = 'gameOver';
            return prev;
          }
          return ni;
        });
      }, mpw * wt);
    }
    return () => { 
      if (streamTimerRef.current) { clearInterval(streamTimerRef.current); streamTimerRef.current = null; } 
    };
  }, [isPlaying, wpm, words, wordIndex, gameState]);

  // Elapsed timer
  useEffect(() => {
    if (isPlaying && gameState === 'playing') {
      timerRef.current = setInterval(() => { setTimeElapsed(prev => prev + 1); }, 1000);
    }
    return () => { 
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } 
    };
  }, [isPlaying, gameState]);

  // Space bar handler for Desktop
  useEffect(() => {
    const h = (e) => {
      if (gameStateRef.current === 'playing' && e.code === 'Space') {
        e.preventDefault();
        if (isPlayingRef.current) pauseReading();
        else resumeReading();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [pauseReading, resumeReading]);

  useEffect(() => { 
    return () => { 
      if (timerRef.current) clearInterval(timerRef.current); 
      if (streamTimerRef.current) clearInterval(streamTimerRef.current); 
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); 
    }; 
  }, []);

  const { prefix, pivot, suffix } = useMemo(() => getORP(words[wordIndex] || ''), [getORP, words, wordIndex]);
  const progress = useMemo(() => words.length > 0 ? Math.round((wordIndex / words.length) * 100) : 0, [words.length, wordIndex]);

  const shareDrillLink = async () => {
    const url = 'https://skilldrills.online/drills/academic/reading-speed/rsvp-reader';
    if (navigator.share) {
      try { await navigator.share({ title: 'RSVP Speed Reader | SkillDrills', text: 'Read 3-4x faster with RSVP technology. Free!', url }); } catch (e) {}
    } else {
      navigator.clipboard.writeText(url).then(() => showFeedbackMsg('Link copied!', 'success')).catch(() => {});
    }
  };

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(139,92,246,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen select-none bg-[#0a0a0a] text-white font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-4" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/drills/academic" className="text-gray-500 hover:text-gray-300 transition-colors">Academic</Link></li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-gray-500">Reading Speed</li>
            <li className="text-gray-600"><ChevronRight className="w-4 h-4" /></li>
            <li className="text-violet-400 font-medium">RSVP Speed Reader</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">RSVP Speed Reader</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Rapid Serial Visual Presentation • Focal Alignment</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {gameState !== 'start' && (
              <button onClick={resetGame} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Reset">
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Sound">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-500 transition-all active:scale-95" title="Toggle Fullscreen">
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3 mb-2 h-auto py-1">
          <StatCard icon={<Zap className="text-violet-400" />} value={effectiveWPM} label="Eff. WPM" />
          <StatCard icon={<Target className="text-purple-400" />} value={wpm} label="Target WPM" />
          <StatCard icon={<FileText className="text-green-400" />} value={`${wordsRead}/${words.length}`} label="Words Read" />
          <StatCard icon={<Timer className="text-blue-400" />} value={timeElapsed} label="Time" unit="s" />
        </div>

        {/* Dynamic Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {feedback && (
            <div className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl transition-all duration-200 ${
              feedbackType === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'
            }`}>
              {feedback}
            </div>
          )}
        </div>

        {/* Game Container */}
        <div ref={containerRef} 
          className={`relative overflow-hidden flex flex-col transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#0a0a0a]' 
              : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[65vh] md:min-h-[550px] md:aspect-video'
          }`}
          style={{ backgroundColor: '#0a0a0a' }}>
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-violet-900/10" />

          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onClick={resetGame} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 h-full w-full relative overflow-y-auto overflow-x-hidden">
            
            {/* START SCREEN */}
            {gameState === 'start' && (
              <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-sm overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-auto my-auto border border-gray-700 bg-gray-900 shadow-2xl flex flex-col shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(139,92,246,0.3)] shrink-0">
                    <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight">RSVP Speed Reader</h2>
                  <p className="text-xs sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">
                    Words flash at the Optimal Recognition Point for maximum comprehension.
                  </p>
                  
                  {/* Speed Controls inside Start Modal */}
                  <div className="flex flex-col gap-3 mb-6 p-4 rounded-xl bg-black/40 border border-gray-700">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Target Speed</span>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <button onClick={handleSpeedDown} className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all active:scale-95 border border-gray-600" aria-label="Decrease speed"><ChevronDown className="w-5 h-5" /></button>
                      <div className="flex flex-col items-center min-w-[80px]">
                        <span className="text-2xl sm:text-3xl font-black text-white leading-none">{wpm}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">WPM</span>
                      </div>
                      <button onClick={handleSpeedUp} className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all active:scale-95 border border-gray-600" aria-label="Increase speed"><ChevronUp className="w-5 h-5" /></button>
                    </div>
                  </div>

                  <button onClick={startReading} className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(139,92,246,0.3)] focus:outline-none shrink-0">
                    <Play className="w-5 h-5 fill-white" />
                    START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* PLAYING STATE */}
            {gameState === 'playing' && (
              <div 
                className="text-center w-full my-auto flex flex-col justify-center cursor-pointer outline-none animate-in fade-in duration-300" 
                onClick={() => isPlaying ? pauseReading() : resumeReading()} 
                role="button" 
                tabIndex={0} 
                aria-label={isPlaying ? 'Click to pause' : 'Click to resume'}
              >
                {/* Visual Alignment Guides */}
                <div className="flex flex-col items-center gap-2 mb-4 opacity-30 pointer-events-none" aria-hidden="true">
                  <div className="w-0.5 h-8 sm:h-12 bg-violet-500 rounded-full" />
                </div>
                
                {/* Word Display */}
                <div className="h-24 sm:h-32 flex items-center justify-center">
                  <div className="text-4xl sm:text-6xl md:text-7xl font-black flex justify-center items-baseline w-full">
                    <span className="text-right flex-1 text-gray-400">{prefix}</span>
                    <span className="text-violet-400 px-1">{pivot}</span>
                    <span className="text-left flex-1 text-white">{suffix}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2 mt-4 opacity-30 pointer-events-none" aria-hidden="true">
                  <div className="w-0.5 h-8 sm:h-12 bg-violet-500 rounded-full" />
                </div>
                
                {/* Progress Bar */}
                <div className="mt-12 w-full max-w-md mx-auto pointer-events-none">
                  <div className="h-2 rounded-full bg-gray-800">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-300" 
                      style={{ width: `${progress}%` }} 
                      role="progressbar" 
                      aria-valuenow={progress} 
                      aria-valuemin={0} 
                      aria-valuemax={100} 
                    />
                  </div>
                </div>
                
                {/* Controls */}
                <div className="mt-10 flex gap-4 justify-center items-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); isPlaying ? pauseReading() : resumeReading(); }} 
                    className="p-5 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white transition-all active:scale-95 shadow-lg" 
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); resetGame(); }} 
                    className="p-5 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white transition-all active:scale-95 shadow-lg" 
                    aria-label="Restart Drill"
                  >
                    <RefreshCw className="w-6 h-6" />
                  </button>
                </div>
                <p className="mt-6 text-xs font-bold tracking-widest uppercase text-gray-500">Tap screen or press SPACE to {isPlaying ? 'pause' : 'resume'}</p>
              </div>
            )}

            {/* GAME OVER SCREEN */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 z-[70] bg-black/95 animate-in fade-in duration-300 overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl max-w-md w-full mx-auto my-auto shadow-2xl border border-gray-800 bg-gray-950 flex flex-col shrink-0">
                  
                  <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-black/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Reading Complete!</h2>
                      <p className="text-white/80 font-medium text-xs sm:text-sm">RSVP Speed Reader</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Effective WPM</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tighter">{effectiveWPM}</span>
                          <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">WPM</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <EndStat label="Target Speed" value={wpm} color="violet" />
                      <EndStat label="Total Words" value={words.length} color="green" />
                      <EndStat label="Time Taken" value={`${timeElapsed}s`} color="blue" />
                      <EndStat label="Words Read" value={wordsRead} color="emerald" />
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onClick={startReading} className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-black tracking-wide hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> READ AGAIN
                    </button>
                    <button onClick={shareDrillLink} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onClick={handleExit} className="px-4 sm:px-5 py-3 sm:py-4 bg-red-900/30 text-red-400 rounded-xl font-bold hover:bg-red-900/50 transition-all active:scale-95 border border-red-900/50 flex items-center justify-center" title="Exit Drill">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-violet-400" /><h2 className="font-bold text-white text-lg tracking-tight">Drill Instructions</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem color="violet" text="Set Target Speed" highlight="100-1000 WPM" result="Controls Word Rate" />
                  <RuleItem color="green" text="Fixate on Center" highlight="Highlighted Letter" result="ORP Alignment" />
                </div>
                <div className="space-y-5">
                  <RuleItem color="blue" text="Effective WPM" highlight="Words / Time" result="Tracks Output" />
                  <RuleItem color="purple" text="Playback Controls" highlight="Click / SPACE" result="Pause & Resume" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT SECTION */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-violet-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About RSVP Speed Reading</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Rapid Serial Visual Presentation (RSVP) is a scientifically validated reading methodology that eliminates saccadic eye movements. Traditional reading forces your eyes to jump from word to word, wasting cognitive energy and physical time. RSVP streams words sequentially at a fixed focal point, specifically aligning them at the Optimal Recognition Point (ORP)—the exact letter where your brain processes the word fastest. 
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <InfoCard icon={<Zap className="w-4 h-4 text-white" />} title="Who It's For" desc="Students, analysts, and candidates for IELTS, TOEFL, GRE, GMAT, CAT, and UPSC exams." color="violet" />
                  <InfoCard icon={<Brain className="w-4 h-4 text-white" />} title="Skills Optimized" desc="Visual processing speed, working memory retention, and rapid semantic comprehension." color="green" />
                  <InfoCard icon={<BarChart3 className="w-4 h-4 text-white" />} title="Metrics Tracked" desc="Effective Words Per Minute (WPM), Total Words Read, and Elapsed Time." color="purple" />
                </div>

                {/* How to Practice Effectively Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Start Slightly Above Comfort:</strong> If your standard reading speed is 250 WPM, set the RSVP target to 300 WPM. The goal is to gently push your cognitive processing ceiling.</li>
                    <li><strong className="text-gray-200">Suppress Subvocalization:</strong> RSVP is designed to bypass the "inner voice". Do not try to "say" the words in your head as they flash; simply look at the purple highlighted letter and absorb the meaning.</li>
                    <li><strong className="text-gray-200">Trust the Focal Point:</strong> Do not move your eyes. Keep your pupils locked dead center on the vertical alignment guides.</li>
                    <li><strong className="text-gray-200">Pause for Comprehension:</strong> If you lose the narrative thread, hit the SPACE bar to pause, recalibrate your focus, and resume. Effective WPM accounts for your paused time.</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-violet-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <FAQItem question="What is Effective WPM?" answer="While you may set the engine to flash words at 500 WPM, if you pause the drill multiple times to process the text, your overall time increases. Effective WPM calculates the actual total words read divided by the total active time you spent completing the session." />
                    <FAQItem question="Why are some letters highlighted in purple?" answer="That is the Optimal Recognition Point (ORP). Research shows that the brain identifies words fastest when fixating slightly left of center. The engine calculates and highlights this pivot letter for every single word to maximize your processing speed." />
                    <FAQItem question="Does this automatically enter fullscreen?" answer="Yes! Clicking START DRILL automatically enters fullscreen mode to eliminate visual distractions and guarantee the words map correctly to your foveal vision field." />
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-violet-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/academic/reading-speed/peripheral-reader" title="Peripheral Vision" desc="Expand visual span for faster reading." color="purple" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/reading-speed/speed-reader" title="Speed Reader" desc="Column scanning for vertical efficiency." color="emerald" icon={<BookOpen className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/comprehension/reading-comprehension" title="Reading Comprehension" desc="Passages with scored analytical quizzes." color="blue" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/comprehension/inference-drill" title="Inference Analytics" desc="Critical reasoning passages with logic mapping." color="indigo" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/writing-speed/typing-test" title="Typing Speed Test" desc="WPM assessment across rigorous levels." color="rose" icon={<Keyboard className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/writing-speed/code-typing" title="Code Typing" desc="Practice JS, Python & HTML syntax." color="orange" icon={<Code2 className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/reaction-speed/light-reaction" title="Reaction Time Test" desc="Raw millisecond reaction speed mapping." color="teal" icon={<Timer className="w-4 h-4" />} />
              <RelatedCard href="/drills/productivity/focus-endurance/deep-work" title="Deep Work Timer" desc="Structured sessions for cognitive output." color="red" icon={<Timer className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/comprehension/reading-comprehension" className="hover:text-violet-400 transition-colors">Reading Comprehension</Link></li>
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-violet-400 transition-colors">Typing Speed</Link></li>
                    <li><Link href="/drills/academic" className="text-violet-450 hover:text-violet-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-violet-400 transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-violet-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive" className="text-violet-450 hover:text-violet-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-violet-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-violet-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-violet-450 hover:text-violet-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-violet-400 transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-violet-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-violet-450 hover:text-violet-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory" className="hover:text-violet-400 transition-colors">Memory (15)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-violet-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-violet-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-violet-500/25 to-purple-500/25 border border-violet-500/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[10px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[10px] max-w-2xl mx-auto leading-relaxed mb-8">
                  Open-source telemetry training platform. Free forever. No downloads required.
                </p>
                
                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Twitter / X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// ============================================================
// HELPER COMPONENTS
// ============================================================

function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-1.5 sm:p-3 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800 backdrop-blur-sm pointer-events-none">
      <div className="mb-0.5 flex justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{icon}</div>
      <p className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight truncate text-white">
        {value}<span className="text-[10px] sm:text-xs font-semibold ml-0.5 opacity-80 text-slate-400">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">{label}</p>
    </div>
  );
}

function EndStat({ label, value, color }) {
  const colors = {
    emerald: 'text-emerald-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400',
    violet: 'text-violet-400',
    green: 'text-green-400'
  };
  return (
    <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 text-center border border-gray-800">
      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">{label}</div>
      <div className={`text-base sm:text-xl font-black ${colors[color] || 'text-white'}`}>{value}</div>
    </div>
  );
}

function InfoCard({ icon, title, desc, color }) {
  const bgColors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    violet: 'bg-violet-600'
  };
  return (
    <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg ${bgColors[color]} flex items-center justify-center`}>{icon}</div>
        <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
      </div>
      <p className="text-xs leading-relaxed text-gray-400">{desc}</p>
    </div>
  );
}

function RuleItem({ color, text, highlight = '', result }) {
  const colorMap = { 
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500', 
    pink: 'bg-pink-600 text-pink-300 border-pink-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    green: 'bg-green-600 text-green-300 border-green-500',
    blue: 'bg-blue-600 text-blue-300 border-blue-500',
    violet: 'bg-violet-600 text-violet-300 border-violet-500',
    purple: 'bg-purple-600 text-purple-300 border-purple-500'
  };
  const colors = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-[#0b0f19]/40 p-4 rounded-xl border border-slate-800 shadow-sm">
      <div className={`w-3 h-3 rounded-full ${bg} shadow-lg flex-shrink-0`}></div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-300">
          {text}{highlight && <span className={`font-black ${txt}`}> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left`}>
          {result}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-200 tracking-tight">{question}</h4>
      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{answer}</p>
    </div>
  );
}

function RelatedCard({ href, title, desc, color, icon }) {
  const gradients = {
    blue: 'from-blue-500 to-indigo-500',
    cyan: 'from-cyan-500 to-teal-500',
    purple: 'from-purple-500 to-violet-500',
    rose: 'from-rose-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    emerald: 'from-emerald-500 to-green-500',
    indigo: 'from-indigo-500 to-blue-500',
    teal: 'from-teal-500 to-cyan-500'
  };
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:-translate-y-1 hover:border-violet-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-violet-500 to-purple-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-violet-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-violet-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}