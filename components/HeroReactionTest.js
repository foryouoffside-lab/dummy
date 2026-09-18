'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

const MIN_WAIT_MS = 1200;
const MAX_WAIT_MS = 4200;

function reactionLabel(ms) {
  if (ms < 180) return 'ELITE';
  if (ms < 220) return 'FAST';
  if (ms < 280) return 'AVERAGE';
  if (ms < 350) return 'SLOW';
  return 'WARM UP';
}

const circleStyles = {
  idle: 'bg-red-500/15 border-red-500/50 text-red-200 shadow-[0_0_50px_-12px_rgba(239,68,68,0.65)]',
  waiting: 'bg-red-500/25 border-red-500/60 text-red-100 shadow-[0_0_60px_-10px_rgba(239,68,68,0.8)]',
  go: 'bg-emerald-500/25 border-emerald-400/70 text-emerald-100 shadow-[0_0_70px_-8px_rgba(16,185,129,0.9)]',
  result: 'bg-emerald-500/15 border-emerald-400/50 text-emerald-100 shadow-[0_0_50px_-12px_rgba(16,185,129,0.6)]',
  early: 'bg-amber-500/15 border-amber-400/50 text-amber-100 shadow-[0_0_50px_-12px_rgba(245,158,11,0.6)]',
};

export default function HeroReactionTest() {
  const [phase, setPhase] = useState('idle'); // idle | waiting | go | result | early
  const [reaction, setReaction] = useState(null);
  const [best, setBest] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const timerRef = useRef(null);
  const goAtRef = useRef(0);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const arm = useCallback(() => {
    clearTimeout(timerRef.current);
    setReaction(null);
    setPhase('waiting');
    const delay = MIN_WAIT_MS + Math.random() * (MAX_WAIT_MS - MIN_WAIT_MS);
    timerRef.current = setTimeout(() => {
      goAtRef.current = performance.now();
      setPhase('go');
    }, delay);
  }, []);

  const handleCircle = useCallback(() => {
    if (phase === 'waiting') {
      clearTimeout(timerRef.current);
      setPhase('early');
      return;
    }
    if (phase === 'go') {
      const ms = Math.round(performance.now() - goAtRef.current);
      setReaction(ms);
      setBest((prev) => (prev === null || ms < prev ? ms : prev));
      setAttempts((a) => a + 1);
      setPhase('result');
      return;
    }
    arm();
  }, [phase, arm]);

  const headline = {
    idle: 'CLICK TO START',
    waiting: 'WAIT FOR GREEN',
    go: 'CLICK!',
    result: `${reaction} ms`,
    early: 'TOO SOON',
  }[phase];

  const subline = {
    idle: 'Red now — click the moment it turns green',
    waiting: 'Hold steady…',
    go: 'Now!',
    result: reactionLabel(reaction ?? 0),
    early: 'You clicked before the green flash',
  }[phase];

  return (
    <div className="bg-surface-1/90 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
      {/* Top ambient accent glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 opacity-60" />

      {/* Cockpit header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/5 text-2xs font-mono text-ink-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold text-ink-2 tracking-wider uppercase">Latency Telemetry</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-white/5 text-ink-3 border border-white/10 uppercase tracking-widest text-[10px]">
          Live Module
        </span>
      </div>

      {/* Reaction circle button */}
      <button
        type="button"
        onClick={handleCircle}
        aria-label={
          phase === 'go'
            ? 'Click now'
            : phase === 'waiting'
              ? 'Wait for the circle to turn green'
              : 'Start the reaction test'
        }
        className={`relative aspect-square w-full max-w-[280px] mx-auto flex flex-col items-center justify-center rounded-full border-2 transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-[0.98] ${circleStyles[phase]}`}
      >
        <div className="absolute inset-3 rounded-full border border-white/10 pointer-events-none" />
        <span
          className={`font-black tracking-tight tabular-nums transition-transform ${phase === 'result' ? 'text-5xl text-white' : 'text-2xl text-white'}`}
        >
          {headline}
        </span>
        <span className="mt-2 px-4 text-2xs font-mono uppercase tracking-widest text-ink-2">
          {subline}
        </span>
      </button>

      <p aria-live="polite" className="sr-only">
        {phase === 'result' ? `Reaction time ${reaction} milliseconds` : ''}
      </p>

      {/* Readout + retry */}
      <div className="mt-6 bg-canvas/90 rounded-2xl border border-white/10 p-4 flex items-center gap-4">
        <div className="flex-1 font-mono text-2xs space-y-2 text-ink-3 min-w-0">
          <p className="flex justify-between gap-2">
            <span className="text-cyan-400 font-semibold">&gt; LAST:</span>
            <span className="text-emerald-400 font-bold tabular-nums">
              {reaction !== null ? `${reaction} ms` : '—'}
            </span>
          </p>
          <p className="flex justify-between gap-2">
            <span className="text-cyan-400 font-semibold">&gt; BEST:</span>
            <span className="text-white font-bold tabular-nums">
              {best !== null ? `${best} ms` : '—'}
            </span>
          </p>
          <p className="flex justify-between gap-2">
            <span className="text-cyan-400 font-semibold">&gt; ATTEMPTS:</span>
            <span className="text-cyan-300 font-bold tabular-nums">{attempts}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={arm}
          className="shrink-0 inline-flex items-center gap-2 bg-surface-2 border border-white/10 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-surface-1 hover:border-white/20 active:scale-[0.98] transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  );
}
