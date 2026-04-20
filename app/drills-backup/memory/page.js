'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Brain, Zap, Clock, Award, 
  RotateCcw, Volume2, VolumeX, Maximize2, 
  Sun, Moon, Activity, ShieldCheck, 
  ChevronRight, Layers, Target, Eye
} from 'lucide-react';

export default function NBackMemoryDrill() {
  
  // Drill Configuration
  const [nValue, setNValue] = useState(2); // The "N" in N-Back
  const [sequence, setSequence] = useState([]);
  const [gameState, setGameState] = useState('idle'); // idle, playing, results
  
  // Performance Metrics
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0); // Correct matches identified
  const [misses, setMisses] = useState(0); // Failed to identify a match
  const [falseAlarms, setFalseAlarms] = useState(0); // Identified a match where none existed
  const [reactionTimes, setReactionTimes] = useState([]);
  
  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCell, setActiveCell] = useState(null);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);

  const cleanButtonClass = "outline-none focus:outline-none ring-0 select-none active:scale-95 transition-all duration-200";

  // ——————————————————————————————————————————————————————————————————————————
  // Core Neuro-Logic: Sequence Control
  // ——————————————————————————————————————————————————————————————————————————
  
  const generateSequence = (length = 30) => {
    const seq = [];
    for (let i = 0; i < length; i++) {
      // 30% chance of a "Match" to ensure enough targets
      if (i >= nValue && Math.random() < 0.3) {
        seq.push(seq[i - nValue]);
      } else {
        seq.push(Math.floor(Math.random() * 9));
      }
    }
    return seq;
  };

  const startDrill = () => {
    const newSeq = generateSequence();
    setSequence(newSeq);
    setGameState('playing');
    setCurrentIndex(0);
    setHits(0);
    setMisses(0);
    setFalseAlarms(0);
    setScore(0);
    setReactionTimes([]);
    runSequence(newSeq);
  };

  const runSequence = async (seq) => {
    for (let i = 0; i < seq.length; i++) {
      if (gameState === 'results') break;
      
      const stimulus = seq[i];
      setActiveCell(stimulus);
      startTimeRef.current = Date.now();
      
      // Stimulus Duration (1s)
      await new Promise(r => setTimeout(r, 1000));
      setActiveCell(null);
      
      // Inter-stimulus Interval (1.5s) - Time for user to respond
      await new Promise(r => setTimeout(r, 1500));
      
      // Check if user missed a match
      if (i >= nValue && seq[i] === seq[i - nValue]) {
        // If we reached here and haven't recorded a hit for this index
        // it means the user missed the target
        setMisses(prev => prev + 1);
      }
      
      setCurrentIndex(prev => prev + 1);
    }
    setGameState('results');
  };

  const handleMatchTrigger = () => {
    if (gameState !== 'playing' || activeCell === null) return;

    const rt = Date.now() - startTimeRef.current;
    const isMatch = sequence[currentIndex] === sequence[currentIndex - nValue];

    if (isMatch) {
      setHits(prev => prev + 1);
      setScore(prev => prev + (nValue * 100));
      setReactionTimes(prev => [...prev, rt]);
      playTone(880); // Success
    } else {
      setFalseAlarms(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 50));
      playTone(220); // Error
    }
  };

  const playTone = (freq) => {
    if (!soundEnabled) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
    osc.stop(ctx.currentTime + 0.1);
  };

  if (status === 'loading') return null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'} transition-colors duration-700`}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Professional Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-500/20">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase">N-Back Cognitive Lab</h1>
              <p className="text-indigo-500 font-bold text-xs tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> FLUID INTELLIGENCE PROTOCOL v5.0
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${cleanButtonClass}`}>
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-zinc-300" />}
            </button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${cleanButtonClass}`}>
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-zinc-500" />}
            </button>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Current Load" value={`${nValue}-BACK`} icon={<Brain className="text-indigo-500" />} />
          <MetricCard label="Accuracy (Hits)" value={hits} icon={<Target className="text-emerald-500" />} />
          <MetricCard label="Signal Misses" value={misses} icon={<Activity className="text-rose-500" />} />
          <MetricCard label="Latency (Avg)" value={reactionTimes.length > 0 ? `${Math.round(reactionTimes.reduce((a,b)=>a+b)/reactionTimes.length)}ms` : '--'} icon={<Clock className="text-blue-500" />} />
        </div>

        {/* The Drill Zone */}
        <div className={`relative min-h-[500px] rounded-[3.5rem] p-12 flex flex-col items-center justify-center transition-all ${
          isDarkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white shadow-2xl border border-white'
        }`}>
          
          {gameState === 'idle' && (
            <div className="text-center max-w-sm animate-in fade-in zoom-in">
              <Eye className="w-20 h-20 text-indigo-600 mx-auto mb-6" />
              <h2 className="text-3xl font-black mb-4">Set Working Memory Depth</h2>
              <div className="flex justify-center gap-4 mb-10">
                {[1, 2, 3, 4].map(v => (
                  <button 
                    key={v}
                    onClick={() => setNValue(v)}
                    className={`w-14 h-14 rounded-2xl font-black text-xl flex items-center justify-center transition-all ${
                      nValue === v ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                    } ${cleanButtonClass}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <button 
                onClick={startDrill}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all active:scale-95"
              >
                START PROTOCOL
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="w-full flex flex-col items-center">
              <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-12">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i}
                    className={`aspect-square rounded-3xl transition-all duration-150 ${
                      activeCell === i 
                        ? 'bg-indigo-600 shadow-2xl shadow-indigo-500/50 scale-105' 
                        : isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onMouseDown={handleMatchTrigger}
                className="w-full max-w-md py-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[2rem] font-black text-3xl shadow-2xl active:scale-90 transition-all"
              >
                MATCH FOUND [SPACE]
              </button>
              <p className="mt-6 text-zinc-400 font-bold uppercase tracking-widest text-xs">
                Target: Position from {nValue} steps ago
              </p>
            </div>
          )}

          {gameState === 'results' && (
            <div className="text-center animate-in zoom-in">
              <Award className="w-24 h-24 text-amber-500 mx-auto mb-6" />
              <h2 className="text-5xl font-black mb-4">Session Analysis</h2>
              <p className="text-zinc-500 mb-10">Performance at {nValue}-Back intensity</p>
              
              <div className="grid grid-cols-3 gap-8 mb-12">
                <ResultStat label="Hits" value={hits} color="text-emerald-500" />
                <ResultStat label="Misses" value={misses} color="text-rose-500" />
                <ResultStat label="Accuracy" value={`${Math.round((hits / (hits + misses + falseAlarms)) * 100 || 0)}%`} color="text-indigo-500" />
              </div>

              <button 
                onClick={() => setGameState('idle')}
                className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-6 h-6" /> NEW SESSION
              </button>
            </div>
          )}
        </div>

        {/* Clinical Note */}
        <div className="mt-10 p-8 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900/50 flex gap-6 items-start border border-transparent dark:border-zinc-800">
          <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm text-indigo-600">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-2">Neuro-Adaptive Stress</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              The N-Back task is unique because it forces your brain to perform <strong>"Interference Control."</strong> As the sequence moves forward, you must actively inhibit the memory of old positions while holding the recent positions in a sliding window. Mastering the 3-Back is considered a peak cognitive achievement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon }) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
        <p className="text-xl font-black">{value}</p>
      </div>
    </div>
  );
}

function ResultStat({ label, value, color }) {
  return (
    <div>
      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-4xl font-black ${color}`}>{value}</p>
    </div>
  );
}