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
    <div className="bg-surface-1 border border-hairline rounded-3xl p-6 shadow-2xl">
      {/* Reaction circle */}
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
        className={`relative aspect-square w-full max-w-[300px] mx-auto flex flex-col items-center justify-center rounded-full border-2 transition-colors duration-100 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${circleStyles[phase]}`}
      >
        <div className="absolute inset-4 rounded-full border border-white/5" />
        <span
          className={`font-black tracking-tight tabular-nums ${phase === 'result' ? 'text-5xl' : 'text-2xl'}`}
        >
          {headline}
        </span>
        <span className="mt-2 px-4 text-2xs font-mono uppercase tracking-widest opacity-80">
          {subline}
        </span>
      </button>

      <p aria-live="polite" className="sr-only">
        {phase === 'result' ? `Reaction time ${reaction} milliseconds` : ''}
      </p>

      {/* Readout + retry */}
      <div className="mt-5 bg-canvas/90 rounded-xl border border-hairline p-4 flex items-center gap-4">
        <div className="flex-1 font-mono text-2xs space-y-2 text-ink-3 min-w-0">
          <p className="flex justify-between gap-2">
            <span className="text-cyan-400">&gt; LAST:</span>
            <span className="text-emerald-400 font-bold tabular-nums">
              {reaction !== null ? `${reaction} ms` : '—'}
            </span>
          </p>
          <p className="flex justify-between gap-2">
            <span className="text-cyan-400">&gt; BEST:</span>
            <span className="text-ink-1 font-bold tabular-nums">
              {best !== null ? `${best} ms` : '—'}
            </span>
          </p>
          <p className="flex justify-between gap-2">
            <span className="text-cyan-400">&gt; ATTEMPTS:</span>
            <span className="text-cyan-300 font-bold tabular-nums">{attempts}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={arm}
          className="shrink-0 inline-flex items-center gap-2 bg-surface-2 border border-hairline text-ink-1 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-surface-1 hover:border-hairline-2 active:scale-[0.98] transition-all"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Retry
        </button>
      </div>

    </div>
  );
}
