'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  Zap, Volume2, VolumeX, Maximize2, Minimize2,
  FileText, Target, Timer, Columns, RefreshCw, ChevronUp, ChevronDown, Gauge,
  BarChart3, Info, Share2, LogOut,
  GraduationCap, Lightbulb, TrendingUp, ArrowRight,
  BookOpen, Brain, Code2, Hash, Headphones, Keyboard, Eye
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

let audioSynth = null;
if (typeof window !== 'undefined') audioSynth = new AudioSynthesizer();

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SpeedReaderClient() {
  const [isMobile, setIsMobile] = useState(false);

  // Screen size detection 
  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('orientationchange', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('orientationchange', checkSize);
    };
  }, []);

  const [gameState, setGameState] = useState('start');
  const [wpm, setWpm] = useState(300);
  const [activeColumn, setActiveColumn] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [columnWidth, setColumnWidth] = useState(300);
  
  // Timer runs continuously from 0s once started
  const [timeElapsed, setTimeElapsed] = useState(0); 
  
  const textColumns = useMemo(() => [
    "Speed reading transforms how we process written information by eliminating subvocalization and expanding visual span. When you read traditionally, your eyes jump from word to word in a process called saccades, pausing on each word for a fraction of a second. These pauses add up, significantly slowing your overall reading rate.",
    "Neuroplasticity enables the brain to form new neural pathways through dedicated reading practice every day. By consistently exposing your visual cortex to high-speed text formats like columnar reading, you train your brain to recognize word patterns instantly rather than decoding them phonetically one by one.",
    "Peripheral vision captures information beyond the focal point for simultaneous multi-word processing. A well-trained reader doesn't look at individual words; they look at chunks of text, allowing their peripheral vision to feed context into their working memory without moving their pupils.",
    "Research shows average readers process two hundred to three hundred words per minute, but training can double that speed. The limitation isn't your brain's processing power, but rather the mechanical inefficiency of your eye movements and the habit of 'saying' the words in your head.",
    "Columnar reading reduces horizontal eye movements by presenting text in narrow vertical blocks. Because the width of the column perfectly matches the span of your foveal and parafoveal vision, you simply move your eyes straight down the center line, absorbing whole lines at once.",
    "The human brain processes images faster than text by treating words as visual symbols. When you train for speed reading, you transition from auditory reading to visual reading. You see the word 'apple' and instantly conceptualize the fruit, bypassing the mental pronunciation.",
    "Cognitive load theory explains why traditional reading is inefficient due to subvocalization limits. Your inner voice can only speak at roughly 250 words per minute. If you tie your reading speed to your speaking speed, you hit an artificial ceiling that halts progress.",
    "Professional speed readers use meta-guiding techniques to pace their eyes and maintain rhythm. While fingers or pens are commonly used for physical books, digital columnar reading automates the pacing for you, forcing your eyes to keep up with the predetermined presentation speed.",
    "Comprehension and speed are not mutually exclusive with proper layered processing techniques. Many assume reading faster means understanding less. However, by reading in thought-groups rather than individual words, comprehension often increases because the brain receives full concepts instead of fragmented pieces.",
    "Regular practice with digital reading technology produces lasting neuroplastic changes in the brain. After just a few weeks of consistent training, users report that their new visual span and reduced saccadic movements naturally transfer over to standard reading formats like emails and books."
  ], []);
  
  const getRandomColumns = useCallback(() => {
    const shuffled = [...textColumns].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [textColumns]);
  
  const [columns, setColumns] = useState([]);
  const [wordsRead, setWordsRead] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);

  const timerRef = useRef(null);
  const streamTimerRef = useRef(null);
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  
  const wpmRef = useRef(wpm);
  const columnsRef = useRef(columns);
  const activeColumnRef = useRef(activeColumn);
  const wordsReadRef = useRef(wordsRead);
  const isPlayingRef = useRef(isPlaying);
  const gameStateRef = useRef(gameState);
  const mountedRef = useRef(false);

  // Initialize
  useEffect(() => { 
    setIsClient(true);
    mountedRef.current = true;
    setColumns(getRandomColumns());
    
    // Adaptive starting width based on device
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setWpm(250);
      setColumnWidth(260); 
    } else {
      setWpm(400);
      setColumnWidth(340);
    }
    
    const t = setTimeout(() => { if (mountedRef.current) setLoading(false); }, 200);
    return () => { mountedRef.current = false; clearTimeout(t); };
  }, [getRandomColumns]);

  // Sync refs
  useEffect(() => { wpmRef.current = wpm; }, [wpm]);
  useEffect(() => { columnsRef.current = columns; }, [columns]);
  useEffect(() => { activeColumnRef.current = activeColumn; }, [activeColumn]);
  useEffect(() => { wordsReadRef.current = wordsRead; }, [wordsRead]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { if (audioSynth) audioSynth.setEnabled(soundEnabled); }, [soundEnabled]);
  
  // Fullscreen listener
  useEffect(() => { 
    const h = () => setIsFullscreen(!!document.fullscreenElement); 
    document.addEventListener('fullscreenchange', h); 
    return () => document.removeEventListener('fullscreenchange', h); 
  }, []);

  // Computed values
  const effectiveWPM = useMemo(() => 
    timeElapsed > 0 ? Math.round((wordsRead / timeElapsed) * 60) : 0, 
  [timeElapsed, wordsRead]);
  
  const progress = useMemo(() => 
    columns.length > 0 ? Math.round((activeColumn / columns.length) * 100) : 0, 
  [columns.length, activeColumn]);

  // Fullscreen handlers
  const enterFullscreen = useCallback(async () => { 
    try { 
      const el = containerRef.current; 
      if (el && el.requestFullscreen && !document.fullscreenElement) {
        await el.requestFullscreen(); 
      }
    } catch (err) {} 
  }, []);
  
  const exitFullscreen = useCallback(async () => { 
    try { 
      if (document.fullscreenElement) await document.exitFullscreen(); 
    } catch (err) {} 
  }, []);
  
  const toggleFullscreen = useCallback(async () => { 
    if (isFullscreen) await exitFullscreen(); 
    else await enterFullscreen(); 
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Feedback
  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { 
      if (mountedRef.current) { setFeedback(''); setFeedbackType(''); } 
    }, 800);
  }, []);

  // End game handler
  const endGame = useCallback(async () => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false); 
    isPlayingRef.current = false;
    
    // Add final column words to wordsRead
    if (activeColumnRef.current < columnsRef.current.length) {
      const finalColWords = columnsRef.current[activeColumnRef.current].split(/\s+/).filter(w => w.length > 0).length;
      wordsReadRef.current += finalColWords;
      setWordsRead(wordsReadRef.current);
    }
    
    if (audioSynth) audioSynth.playComplete();
    setGameState('gameOver'); 
    gameStateRef.current = 'gameOver';
    await exitFullscreen();
  }, [exitFullscreen]);

  const handleExit = async () => {
    await exitFullscreen();
    resetGame();
  };

  // Start drill
  const startDrill = useCallback(async () => {
    if (audioSynth) audioSynth.init();
    await enterFullscreen();
    if (columns.length === 0) return;
    
    setGameState('playing'); 
    gameStateRef.current = 'playing';
    setIsPlaying(true); 
    isPlayingRef.current = true;
    setActiveColumn(0); 
    activeColumnRef.current = 0;
    setTimeElapsed(0); 
    setWordsRead(0); 
    wordsReadRef.current = 0;
    
    if (audioSynth) audioSynth.playStart();
    showFeedback(`Reading at ${wpm} WPM`, 'success');
  }, [columns.length, wpm, showFeedback, enterFullscreen]);

  // Reset game
  const resetGame = useCallback(() => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setIsPlaying(false); 
    isPlayingRef.current = false;
    setGameState('start'); 
    gameStateRef.current = 'start';
    setActiveColumn(0); 
    activeColumnRef.current = 0;
    setTimeElapsed(0); 
    setWordsRead(0); 
    wordsReadRef.current = 0;
    setFeedback('');
    
    const nc = getRandomColumns(); 
    setColumns(nc); 
    columnsRef.current = nc;
  }, [getRandomColumns]);

  // Speed/Width controls
  const handleWpmUp = useCallback(() => setWpm(w => Math.min(1000, w + 25)), []);
  const handleWpmDown = useCallback(() => setWpm(w => Math.max(100, w - 25)), []);
  
  // Adjusted boundaries for width controls so mobile doesn't overflow
  const handleWidthUp = useCallback(() => setColumnWidth(w => Math.min(isMobile ? 320 : 600, w + 20)), [isMobile]);
  const handleWidthDown = useCallback(() => setColumnWidth(w => Math.max(isMobile ? 200 : 280, w - 20)), [isMobile]);

  // ============================================================
  // COLUMN ROTATION TIMER
  // ============================================================
  useEffect(() => {
    const runColumnRotation = () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      if (!isPlayingRef.current || gameStateRef.current !== 'playing') return;
      
      const currentCol = activeColumnRef.current;
      const cols = columnsRef.current;
      if (currentCol >= cols.length) return;
      
      const currentText = cols[currentCol];
      const wordCount = currentText?.split(/\s+/).filter(w => w.length > 0).length || 6;
      const speedWPM = Math.max(100, wpmRef.current);
      const displayTime = (wordCount / (speedWPM / 60)) * 1000;
      
      streamTimerRef.current = setTimeout(() => {
        if (gameStateRef.current !== 'playing') return;
        
        // Count words from current column
        if (activeColumnRef.current < columnsRef.current.length) {
          const colWords = columnsRef.current[activeColumnRef.current].split(/\s+/).filter(w => w.length > 0).length;
          wordsReadRef.current += colWords;
          setWordsRead(wordsReadRef.current);
        }
        
        const nextIndex = activeColumnRef.current + 1;
        
        if (nextIndex >= columnsRef.current.length) {
          endGame();
          return;
        }
        
        activeColumnRef.current = nextIndex;
        setActiveColumn(nextIndex);
        runColumnRotation();
      }, displayTime);
    };
    
    if (isPlaying && gameState === 'playing') {
      runColumnRotation();
    }
    
    return () => {
      if (streamTimerRef.current) clearTimeout(streamTimerRef.current);
    };
  }, [isPlaying, gameState, endGame]);

  // ============================================================
  // ELAPSED TIMER (Counts Up from 0)
  // ============================================================
  useEffect(() => {
    if (isPlaying && gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, gameState]);

  // Cleanup
  useEffect(() => { 
    return () => { 
      if (timerRef.current) clearInterval(timerRef.current); 
      if (streamTimerRef.current) clearTimeout(streamTimerRef.current); 
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); 
    }; 
  }, []);

  // Share
  const sharePage = async () => {
    const url = 'https://skilldrills.online/drills/academic/reading-speed/speed-reader';
    if (navigator.share) {
      try { await navigator.share({ title: 'Column Scanner Speed Reading | SkillDrills', text: 'Train columnar reading to reduce saccades and read faster. Free!', url }); } catch (e) {} 
    } else {
      navigator.clipboard.writeText(url).then(() => showFeedback('Link copied!', 'success')).catch(() => {});
    }
  };

  // Loading state
  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen select-none bg-[#0a0a0a] text-white font-sans" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-4 hidden xs:block" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link></li>
            <li className="text-gray-600"><ArrowRight className="w-3.5 h-3.5" /></li>
            <li><Link href="/drills/academic" className="text-gray-500 hover:text-gray-300 transition-colors">Academic</Link></li>
            <li className="text-gray-600"><ArrowRight className="w-3.5 h-3.5" /></li>
            <li className="hidden sm:inline text-gray-500">Reading Speed</li>
            <li className="hidden sm:inline text-gray-600"><ArrowRight className="w-3.5 h-3.5" /></li>
            <li className="text-emerald-400 font-medium">Column Scanner</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Columns className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Column Scanner</h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Speed Reading • Saccade Reduction • Endless Mode</p>
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
          <StatCard icon={<Zap className="text-emerald-400" />} value={effectiveWPM} label="Eff. WPM" />
          <StatCard icon={<Timer className="text-blue-400" />} value={timeElapsed} label="Time" unit="s" />
          <StatCard icon={<FileText className="text-purple-400" />} value={`${wordsRead}`} label="Words Read" />
          <StatCard icon={<Columns className="text-orange-400" />} value={`${activeColumn}/${columns.length}`} label="Columns" />
        </div>

        {/* Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none">
          {feedback && (
            <div className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl transition-all duration-200 ${
              feedbackType === 'success' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
            }`}>
              {feedback}
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* ADAPTIVE GAME CONTAINER */}
        {/* ============================================================ */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden flex flex-col transition-all duration-100 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 w-[100vw] h-[100vh] bg-[#0a0a0a]' 
              : 'w-full rounded-2xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[65vh] md:min-h-[550px] md:aspect-video'
          }`}
          style={{ backgroundColor: '#0a0a0a' }}
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-emerald-900/10" />

          {/* Fullscreen HUD Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[60] flex gap-2">
              <button onClick={resetGame} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2.5 sm:p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              <button onClick={endGame} className="p-2.5 sm:p-3 bg-red-900/40 border border-red-700/50 rounded-xl text-red-400 hover:bg-red-900/60 transition-colors"><LogOut className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 h-full w-full relative overflow-y-auto overflow-x-hidden">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto">
                <div className="rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full mx-auto my-auto border border-gray-700 bg-gray-900 shadow-2xl flex flex-col shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 rotate-3 pointer-events-none shadow-[0_0_30px_rgba(16,185,129,0.3)] shrink-0">
                    <Columns className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-3" />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black mb-2 pointer-events-none tracking-tight">
                    Column Scanner
                  </h2>
                  <p className="text-xs sm:text-base mb-6 text-gray-400 leading-relaxed pointer-events-none">
                    Read straight down the center. Eliminate horizontal eye movements.
                  </p>
                  
                  {/* Settings Controls */}
                  <div className="flex flex-col gap-3 mb-6 p-4 rounded-xl bg-black/40 border border-gray-700">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Adjust Settings</span>
                    
                    <div className="flex items-center justify-between gap-2 mt-2 bg-gray-800 p-2 rounded-xl">
                      <span className="text-xs font-bold text-gray-400 ml-2 w-12 text-left">WPM</span>
                      <button onClick={handleWpmDown} className="p-2 sm:p-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all active:scale-95"><ChevronDown className="w-4 h-4" /></button>
                      <span className="text-lg font-black text-white w-12 text-center">{wpm}</span>
                      <button onClick={handleWpmUp} className="p-2 sm:p-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all active:scale-95"><ChevronUp className="w-4 h-4" /></button>
                    </div>

                    <div className="flex items-center justify-between gap-2 bg-gray-800 p-2 rounded-xl">
                      <span className="text-xs font-bold text-gray-400 ml-2 w-12 text-left">Width</span>
                      <button onClick={handleWidthDown} className="p-2 sm:p-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all active:scale-95"><ChevronDown className="w-4 h-4" /></button>
                      <span className="text-lg font-black text-white w-12 text-center">{columnWidth}</span>
                      <button onClick={handleWidthUp} className="p-2 sm:p-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all active:scale-95"><ChevronUp className="w-4 h-4" /></button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={startDrill}
                    className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black text-base sm:text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(16,185,129,0.3)] focus:outline-none shrink-0"
                  >
                    <Maximize2 className="w-5 h-5" /> START DRILL
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING STATE ============ */}
            {gameState === 'playing' && columns[activeColumn] && (
              <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-300 px-2 sm:px-0">
                {/* Mobile-Optimized Column Box:
                  - Uses max-w-full to prevent cutoff on very small screens regardless of set pixel width.
                  - Scales text size fluidly based on screen size (text-base -> text-2xl).
                */}
                <div 
                  className="text-center transition-all duration-300 px-3 sm:px-6 py-6 sm:py-8 bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl relative" 
                  style={{ 
                    width: `${columnWidth}px`,
                    maxWidth: '100%', 
                    minWidth: '200px'
                  }}
                >
                  {/* Faint center guideline */}
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-emerald-500/10 -translate-x-1/2 pointer-events-none" />

                  <div 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-relaxed text-gray-200 relative z-10"
                    style={{ 
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                      textAlign: 'center'
                    }}
                  >
                    {columns[activeColumn]}
                  </div>
                </div>
                
                {/* Progress indicator */}
                <div className="mt-10 w-full max-w-xs sm:max-w-sm mx-auto pointer-events-none">
                  <div className="h-1.5 rounded-full bg-gray-800">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mt-3 text-center">
                    Column {activeColumn + 1} of {columns.length}
                  </p>
                </div>
              </div>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 z-[70] bg-black/95 animate-in fade-in duration-300 overflow-y-auto flex flex-col p-4">
                <div className="rounded-3xl max-w-md w-full mx-auto my-auto shadow-2xl border border-gray-800 bg-gray-950 flex flex-col shrink-0">
                  
                  <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 p-4 sm:p-6 border-b border-gray-800 relative overflow-hidden pointer-events-none shrink-0 rounded-t-3xl">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">Session Complete!</h2>
                      <p className="text-emerald-400 font-medium text-xs sm:text-sm">Column Scanner • Speed Reading Test</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pointer-events-none shrink-0">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Effective Speed</span>
                        <div className="flex items-end gap-1">
                          <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">{effectiveWPM}</span>
                          <span className="text-sm sm:text-lg text-gray-500 font-bold mb-1">WPM</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <EndStat label="Total Words" value={wordsRead} color="green" />
                      <EndStat label="Time Elapsed" value={`${timeElapsed}s`} color="blue" />
                      <EndStat label="Target WPM" value={wpm} color="emerald" />
                      <EndStat label="Column Width" value={`${columnWidth}px`} color="purple" />
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 bg-gray-900/50 border-t border-gray-800 flex gap-2 sm:gap-3 rounded-b-3xl shrink-0">
                    <button onClick={resetGame} className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black tracking-wide hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] text-sm sm:text-base">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" /> READ AGAIN
                    </button>
                    <button onClick={sharePage} className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all active:scale-95 border border-gray-700 flex items-center justify-center" title="Share Drill">
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

        {/* ============================================================ */}
        {/* ABOUT SECTION (hidden in fullscreen) */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Column Scanner Training</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Standard reading relies on saccades—the rapid horizontal eye movements that bounce from word to word. This process is inherently slow and exhausts visual stamina. Columnar scanning restructures text into narrow vertical columns matching your foveal vision span. By eliminating horizontal eye tracking, you simply drag your eyes straight down the center line, absorbing entire chunks of text simultaneously.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <InfoCard 
                    icon={<Columns className="w-4 h-4 text-white" />} 
                    title="Who It's For" 
                    desc="Students, researchers, and professionals who need to process heavy reading volumes efficiently." 
                    color="blue" 
                  />
                  <InfoCard 
                    icon={<Brain className="w-4 h-4 text-white" />} 
                    title="Skills Optimized" 
                    desc="Peripheral text absorption, saccade reduction, and reading stamina." 
                    color="green" 
                  />
                  <InfoCard 
                    icon={<BarChart3 className="w-4 h-4 text-white" />} 
                    title="Metrics Tracked" 
                    desc="Effective Speed (WPM), Total Words Processed, and overall Time Taken." 
                    color="purple" 
                  />
                </div>

                {/* How to Practice Effectively */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                  </div>
                  <ul className="text-sm leading-relaxed space-y-3 pl-2 text-gray-400">
                    <li><strong className="text-gray-200">Adjust the Width:</strong> Shrink the column width until the text fits comfortably inside your forward vision without moving your eyes left to right.</li>
                    <li><strong className="text-gray-200">Look Down the Middle:</strong> Keep your eyes locked perfectly in the horizontal center of the column. Do not read lines left-to-right. Let your peripheral vision gather the words on the edges.</li>
                    <li><strong className="text-gray-200">Don't Subvocalize:</strong> The engine forces the text down fast enough to prevent you from "speaking" the words in your head. Trust visual processing.</li>
                    <li><strong className="text-gray-200">Focus on the Flow:</strong> 10 columns will automatically stream. If you stumble, skip it and focus on catching the next block.</li>
                  </ul>
                </div>

                {/* FAQ */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How is my Effective WPM calculated?</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Effective WPM is calculated by taking the total number of words you read and dividing it by the exact time you spent reading them. It’s a pure reflection of actual reading speed.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why isn't there a countdown timer?</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        This is an open-ended speed test. You read until the 10 columns are finished. Your speed is determined by how fast you clear the text, not by surviving a ticking clock.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Does it auto-fullscreen?</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Yes! Clicking START DRILL automatically enters fullscreen mode to eliminate visual distractions and guarantee the columns map correctly to your foveal vision field.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* RELATED DRILLS */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-emerald-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/academic/reading-speed/rsvp-reader" title="RSVP Speed Reader" desc="Rapid single word focal presentation." color="teal" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/reading-speed/peripheral-reader" title="Peripheral Vision" desc="Expand visual span for faster reading." color="purple" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/comprehension/reading-comprehension" title="Reading Comprehension" desc="Passages with scored analytical quizzes." color="blue" icon={<BookOpen className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/comprehension/inference-drill" title="Inference Analytics" desc="Critical reasoning passages with logic mapping." color="indigo" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/writing-speed/typing-test" title="Typing Speed Test" desc="WPM assessment across rigorous levels." color="rose" icon={<Keyboard className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/writing-speed/code-typing" title="Code Typing" desc="Practice JS, Python & HTML syntax." color="orange" icon={<Code2 className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/memory/number-recall" title="Number Recall" desc="Memorize and reproduce number sequences." color="red" icon={<Hash className="w-4 h-4" />} />
              <RelatedCard href="/drills/productivity/focus-endurance/deep-work" title="Deep Work Timer" desc="Structured sessions for maximum cognitive output." color="emerald" icon={<Timer className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* FOOTER */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/comprehension/reading-comprehension" className="hover:text-emerald-400 transition-colors">Reading Comprehension</Link></li>
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-emerald-400 transition-colors">Typing Speed</Link></li>
                    <li><Link href="/drills/academic" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-emerald-400 transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-emerald-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS & Motor</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-emerald-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-emerald-400 transition-colors">Aim Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Visual Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-emerald-400 transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-emerald-400 transition-colors">Visual Search</Link></li>
                    <li><Link href="/drills/visual" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All Visual Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory" className="hover:text-emerald-400 transition-colors">Memory (15)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-emerald-400 transition-colors">Mental Fitness (6)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-emerald-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/25 to-teal-500/25 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                    <Columns className="w-3.5 h-3.5 text-emerald-400" />
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
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800 backdrop-blur-sm pointer-events-none">
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
    orange: 'text-orange-400',
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
    purple: 'bg-purple-600'
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
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:-translate-y-1 hover:border-emerald-500/50`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-emerald-500 to-teal-500'}`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-emerald-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-emerald-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}