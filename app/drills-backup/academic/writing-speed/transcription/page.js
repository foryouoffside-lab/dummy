'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Dna, Zap, Clock, Award, RotateCcw, 
  Sun, Moon, ShieldCheck, Activity, 
  Target, Microscope, Binary, FlaskConical
} from 'lucide-react';

/**
 * BIOCHEMICAL TRANSCRIPTION PROTOCOL v3.0
 * Objective: Zero-Latency DNA-to-RNA Synthesis
 */

export default function TranscriptionDrill() {
  const [gameState, setGameState] = useState('idle'); 
  const [dnaSequence, setDnaSequence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [difficulty, setDifficulty] = useState('PRO'); // BASIC, PRO, GENOMIC
  
  // Metrics
  const [startTime, setStartTime] = useState(null);
  const [solvedCount, setSolvedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [latencyLog, setLatencyLog] = useState([]);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const timerRef = useRef(null);
  const inputRef = useRef(null);

  // Mapping Logic: DNA Template (3'->5') to mRNA (5'->3')
  const MAP = { 'A': 'U', 'T': 'A', 'C': 'G', 'G': 'C' };

  const generateSequence = useCallback(() => {
    const bases = ['A', 'T', 'C', 'G'];
    const length = difficulty === 'BASIC' ? 4 : difficulty === 'PRO' ? 8 : 12;
    let seq = '';
    for (let i = 0; i < length; i++) {
      seq += bases[Math.floor(Math.random() * 4)];
    }
    setDnaSequence(seq);
    setUserInput('');
    setStartTime(Date.now());
  }, [difficulty]);

  const handleStart = () => {
    setSolvedCount(0);
    setErrorCount(0);
    setLatencyLog([]);
    setGameState('playing');
    generateSequence();
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    if (!['A', 'U', 'C', 'G', 'BACKSPACE'].includes(key)) return;

    if (key === 'BACKSPACE') {
      setUserInput(prev => prev.slice(0, -1));
      return;
    }

    const currentIndex = userInput.length;
    const expectedRna = MAP[dnaSequence[currentIndex]];

    if (key === expectedRna) {
      const nextInput = userInput + key;
      setUserInput(nextInput);
      
      // Completion Logic
      if (nextInput.length === dnaSequence.length) {
        setLatencyLog(prev => [...prev, Date.now() - startTime]);
        setSolvedCount(prev => prev + 1);
        setFeedback('correct');
        setTimeout(() => {
          setFeedback(null);
          generateSequence();
        }, 150);
      }
    } else {
      setErrorCount(prev => prev + 1);
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 200);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'} transition-colors duration-500 font-mono`}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-blue-600 rounded-3xl shadow-xl shadow-blue-500/20">
              <Dna className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase italic">Polymerase Lab</h1>
              <p className="text-blue-500 font-bold text-xs tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> TRANSCRIPTION FIDELITY v3.0
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex bg-zinc-200 dark:bg-zinc-800 p-1 rounded-xl">
              {['BASIC', 'PRO', 'GENOMIC'].map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${difficulty === d ? 'bg-blue-600 text-white' : 'text-zinc-500'}`}
                >
                  {d}
                </button>
              ))}
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-zinc-500" />}
            </button>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Latency/Chain" value={latencyLog.length > 0 ? `${Math.round(latencyLog.reduce((a,b)=>a+b)/latencyLog.length)}ms` : '--'} icon={<Clock className="text-blue-500" />} />
          <MetricCard label="Fidelity" value={solvedCount + errorCount > 0 ? `${Math.round((solvedCount / (solvedCount + errorCount)) * 100)}%` : '--'} icon={<Target className="text-emerald-500" />} />
          <MetricCard label="Synthesized" value={`${solvedCount} Units`} icon={<FlaskConical className="text-purple-500" />} />
          <MetricCard label="Complexity" value={difficulty} icon={<Microscope className="text-orange-500" />} />
        </div>

        {/* The Synthesis Chamber */}
        <div className={`relative min-h-[400px] rounded-[3.5rem] p-12 flex flex-col items-center justify-center transition-all duration-300 ${
          isDarkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white shadow-2xl border border-white'
        } ${feedback === 'wrong' ? 'ring-8 ring-rose-500/20' : ''}`}>
          
          {gameState === 'idle' ? (
            <div className="text-center max-w-sm animate-in fade-in zoom-in">
              <Binary className="w-20 h-20 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-black mb-4 uppercase italic">Initiate Transcription</h2>
              <p className="text-zinc-500 mb-10 font-medium">Map DNA to RNA complements. Uracil (U) replaces Thymine (T) in mRNA synthesis.</p>
              <button onClick={handleStart} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-all active:scale-95">
                START SYNTHESIS
              </button>
            </div>
          ) : (
            <div className="w-full max-w-2xl text-center">
              <div className="mb-12">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-4">DNA Template (3&apos; &rarr; 5&apos;)</p>
                <div className="flex justify-center gap-3">
                  {dnaSequence.split('').map((char, i) => (
                    <div key={i} className={`w-16 h-20 flex items-center justify-center rounded-2xl text-4xl font-black border-2 transition-all ${
                      i === userInput.length ? 'border-blue-500 bg-blue-500/10 scale-110 shadow-lg' : 'border-zinc-200 dark:border-zinc-800 opacity-50'
                    }`}>
                      {char}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4">mRNA Transcript (5&apos; &rarr; 3&apos;)</p>
                <div className="flex justify-center gap-3 h-20">
                  {userInput.split('').map((char, i) => (
                    <div key={i} className="w-16 h-20 flex items-center justify-center rounded-2xl text-4xl font-black bg-emerald-500 text-white animate-in zoom-in">
                      {char}
                    </div>
                  ))}
                  {/* Blinking Cursor for next input */}
                  {userInput.length < dnaSequence.length && (
                    <div className="w-16 h-20 flex items-center justify-center rounded-2xl text-4xl font-black border-2 border-dashed border-zinc-300 dark:border-zinc-700 animate-pulse">
                      ?
                    </div>
                  )}
                </div>
              </div>

              <input
                ref={inputRef}
                type="text"
                onKeyDown={handleKeyDown}
                className="opacity-0 absolute"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Clinical Note */}
        <div className="mt-10 p-8 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900/50 flex gap-6 items-start border border-transparent dark:border-zinc-800">
          <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm text-blue-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-2">The Complementary Protocol</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              Transcription involves RNA Polymerase binding to a promoter and synthesizing mRNA. The fundamental rule trained here is <strong>Watson-Crick Base Pairing</strong>. In RNA, Adenine (A) pairs with Uracil (U) instead of Thymine (T). Mastery of this drill creates a subconscious mapping for bioinformatics and genomic analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon }) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-4 hover:scale-[1.02] transition-transform">
      <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
        <p className="text-lg font-black tracking-tight">{value}</p>
      </div>
    </div>
  );
}