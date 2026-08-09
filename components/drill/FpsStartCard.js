'use client';

import React from 'react';
import { AlertCircle, Play, Sliders } from 'lucide-react';

// Static, fully-literal per-accent Tailwind classes — never string-concatenated at
// runtime, so Tailwind's content scanner picks up every variant regardless of which
// accent a given drill actually passes in. Add more keys here as new drills need them.
const ACCENTS = {
  emerald: {
    badgeGradient: 'from-emerald-600 to-teal-600',
    badgeGlow: 'shadow-[0_0_28px_rgba(16,185,129,.4)]',
    ring: 'border-emerald-500/20',
    ringInner: 'border-emerald-500/10',
    ambient: 'rgba(16,185,129,.18)',
    subtitleText: 'text-emerald-400/80',
    chipBg: 'bg-emerald-500/10',
    chipBorder: 'border-emerald-500/20',
    chipText: 'text-emerald-400',
    barGradient: 'from-emerald-400 to-teal-600',
    sliderAccent: 'accent-emerald-500',
    buttonGradient: 'from-emerald-600 to-teal-600',
    buttonGlow: 'shadow-[0_0_20px_rgba(16,185,129,.3)]',
  },
  orange: {
    badgeGradient: 'from-orange-500 to-amber-600',
    badgeGlow: 'shadow-[0_0_28px_rgba(249,115,22,.4)]',
    ring: 'border-orange-500/20',
    ringInner: 'border-orange-500/10',
    ambient: 'rgba(249,115,22,.18)',
    subtitleText: 'text-orange-400/80',
    chipBg: 'bg-orange-500/10',
    chipBorder: 'border-orange-500/20',
    chipText: 'text-orange-400',
    barGradient: 'from-orange-400 to-amber-600',
    sliderAccent: 'accent-orange-500',
    buttonGradient: 'from-orange-500 to-amber-600',
    buttonGlow: 'shadow-[0_0_20px_rgba(249,115,22,.3)]',
  },
  red: {
    badgeGradient: 'from-red-600 to-rose-600',
    badgeGlow: 'shadow-[0_0_28px_rgba(239,68,68,.4)]',
    ring: 'border-red-500/20',
    ringInner: 'border-red-500/10',
    ambient: 'rgba(239,68,68,.18)',
    subtitleText: 'text-red-400/80',
    chipBg: 'bg-red-500/10',
    chipBorder: 'border-red-500/20',
    chipText: 'text-red-400',
    barGradient: 'from-red-400 to-rose-600',
    sliderAccent: 'accent-red-500',
    buttonGradient: 'from-red-600 to-rose-600',
    buttonGlow: 'shadow-[0_0_20px_rgba(239,68,68,.3)]',
  },
  blue: {
    badgeGradient: 'from-blue-600 to-cyan-600',
    badgeGlow: 'shadow-[0_0_28px_rgba(59,130,246,.4)]',
    ring: 'border-blue-500/20',
    ringInner: 'border-blue-500/10',
    ambient: 'rgba(59,130,246,.18)',
    subtitleText: 'text-blue-400/80',
    chipBg: 'bg-blue-500/10',
    chipBorder: 'border-blue-500/20',
    chipText: 'text-blue-400',
    barGradient: 'from-blue-400 to-cyan-600',
    sliderAccent: 'accent-blue-500',
    buttonGradient: 'from-blue-600 to-cyan-600',
    buttonGlow: 'shadow-[0_0_20px_rgba(59,130,246,.3)]',
  },
  purple: {
    badgeGradient: 'from-purple-600 to-fuchsia-600',
    badgeGlow: 'shadow-[0_0_28px_rgba(168,85,247,.4)]',
    ring: 'border-purple-500/20',
    ringInner: 'border-purple-500/10',
    ambient: 'rgba(168,85,247,.18)',
    subtitleText: 'text-purple-400/80',
    chipBg: 'bg-purple-500/10',
    chipBorder: 'border-purple-500/20',
    chipText: 'text-purple-400',
    barGradient: 'from-purple-400 to-fuchsia-600',
    sliderAccent: 'accent-purple-500',
    buttonGradient: 'from-purple-600 to-fuchsia-600',
    buttonGlow: 'shadow-[0_0_20px_rgba(168,85,247,.3)]',
  },
  redOrange: {
    badgeGradient: 'from-red-600 to-orange-600',
    badgeGlow: 'shadow-[0_0_28px_rgba(239,68,68,.4)]',
    ring: 'border-red-500/20',
    ringInner: 'border-red-500/10',
    ambient: 'rgba(239,68,68,.18)',
    subtitleText: 'text-red-400/80',
    chipBg: 'bg-red-500/10',
    chipBorder: 'border-red-500/20',
    chipText: 'text-red-400',
    barGradient: 'from-red-500 to-orange-600',
    sliderAccent: 'accent-red-500',
    buttonGradient: 'from-red-600 to-orange-600',
    buttonGlow: 'shadow-[0_0_20px_rgba(239,68,68,.3)]',
  },
  cyan: {
    badgeGradient: 'from-cyan-500 to-blue-600',
    badgeGlow: 'shadow-[0_0_28px_rgba(6,182,212,.4)]',
    ring: 'border-cyan-500/20',
    ringInner: 'border-cyan-500/10',
    ambient: 'rgba(6,182,212,.18)',
    subtitleText: 'text-cyan-400/80',
    chipBg: 'bg-cyan-500/10',
    chipBorder: 'border-cyan-500/20',
    chipText: 'text-cyan-400',
    barGradient: 'from-cyan-400 to-blue-600',
    sliderAccent: 'accent-cyan-500',
    buttonGradient: 'from-cyan-500 to-blue-600',
    buttonGlow: 'shadow-[0_0_20px_rgba(6,182,212,.3)]',
  },
  amber: {
    badgeGradient: 'from-amber-500 to-orange-600',
    badgeGlow: 'shadow-[0_0_28px_rgba(245,158,11,.4)]',
    ring: 'border-amber-500/20',
    ringInner: 'border-amber-500/10',
    ambient: 'rgba(245,158,11,.18)',
    subtitleText: 'text-amber-400/80',
    chipBg: 'bg-amber-500/10',
    chipBorder: 'border-amber-500/20',
    chipText: 'text-amber-400',
    barGradient: 'from-amber-400 to-orange-600',
    sliderAccent: 'accent-amber-500',
    buttonGradient: 'from-amber-500 to-orange-600',
    buttonGlow: 'shadow-[0_0_20px_rgba(245,158,11,.3)]',
  },
  indigo: {
    badgeGradient: 'from-blue-500 to-indigo-600',
    badgeGlow: 'shadow-[0_0_28px_rgba(59,130,246,.4)]',
    ring: 'border-blue-500/20',
    ringInner: 'border-blue-500/10',
    ambient: 'rgba(59,130,246,.18)',
    subtitleText: 'text-blue-400/80',
    chipBg: 'bg-blue-500/10',
    chipBorder: 'border-blue-500/20',
    chipText: 'text-blue-400',
    barGradient: 'from-blue-400 to-indigo-600',
    sliderAccent: 'accent-blue-500',
    buttonGradient: 'from-blue-500 to-indigo-600',
    buttonGlow: 'shadow-[0_0_20px_rgba(59,130,246,.3)]',
  },
  green: {
    badgeGradient: 'from-emerald-500 to-green-600',
    badgeGlow: 'shadow-[0_0_28px_rgba(34,197,94,.4)]',
    ring: 'border-green-500/20',
    ringInner: 'border-green-500/10',
    ambient: 'rgba(34,197,94,.18)',
    subtitleText: 'text-green-400/80',
    chipBg: 'bg-green-500/10',
    chipBorder: 'border-green-500/20',
    chipText: 'text-green-400',
    barGradient: 'from-emerald-400 to-green-600',
    sliderAccent: 'accent-green-500',
    buttonGradient: 'from-emerald-500 to-green-600',
    buttonGlow: 'shadow-[0_0_20px_rgba(34,197,94,.3)]',
  },
  slate: {
    badgeGradient: 'from-slate-500 to-slate-700',
    badgeGlow: 'shadow-[0_0_28px_rgba(148,163,184,.35)]',
    ring: 'border-slate-400/20',
    ringInner: 'border-slate-400/10',
    ambient: 'rgba(148,163,184,.16)',
    subtitleText: 'text-slate-300/80',
    chipBg: 'bg-white/10',
    chipBorder: 'border-white/15',
    chipText: 'text-slate-200',
    barGradient: 'from-slate-400 to-slate-600',
    sliderAccent: 'accent-slate-400',
    buttonGradient: 'from-slate-500 to-slate-700',
    buttonGlow: 'shadow-[0_0_20px_rgba(148,163,184,.25)]',
  },
};

function getAccent(name) {
  return ACCENTS[name] || ACCENTS.emerald;
}

function RuleRow({ icon: Icon, accent = 'emerald', title }) {
  const a = getAccent(accent);
  return (
    <div className="relative flex items-center gap-2.5 bg-white/[0.03] border border-white/5 rounded-xl pl-3.5 pr-3 py-2.5 text-left overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${a.barGradient}`} />
      <div className={`w-8 h-8 rounded-lg ${a.chipBg} border ${a.chipBorder} flex items-center justify-center flex-shrink-0`}>
        {Icon && <Icon className={`w-4 h-4 ${a.chipText}`} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11.5px] font-bold text-white leading-tight">{title}</p>
      </div>
    </div>
  );
}

/**
 * Universal premium FPS drill start card — extracted from 180° Awareness Pro
 * so every FPS drill can share one look instead of hand-rolling its own modal.
 * Self-contained: owns the full-screen overlay/backdrop, not just the card body.
 * Drop it in wherever `gameState === 'start'`.
 *
 * @param {React.ComponentType} icon - main badge icon
 * @param {keyof ACCENTS} accent - card-wide theme (badge, subtitle, slider, button)
 * @param {string} title
 * @param {string} subtitle
 * @param {Array<{icon, accent, title}>} rules - instructional rows, each independently themed
 * @param {{value:number, onChange:(v:number)=>void, cmPer360:string}|null} sensitivity - omit to hide the slider block
 * @param {boolean} isTouchOnlyDevice
 * @param {() => void} onStart
 */
export default function FpsStartCard({
  icon: Icon,
  accent = 'emerald',
  title,
  subtitle,
  rules = [],
  sensitivity = null,
  isTouchOnlyDevice = false,
  onStart,
  maxWidthClassName = 'max-w-[360px]',
}) {
  const a = getAccent(accent);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-md p-2 sm:p-3 overflow-y-auto"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className={`relative w-full ${maxWidthClassName} max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0d0d18] to-[#0a0a13] shadow-[0_20px_60px_rgba(0,0,0,.7)] my-auto mx-auto font-sans`}>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36 rounded-t-[24px]"
          style={{ background: `radial-gradient(ellipse 220px 130px at 50% 0%, ${a.ambient}, transparent 70%)` }}
        />

        <div className="relative px-5 sm:px-6 pt-6 pb-5 flex flex-col gap-3 text-center">

          {Icon && (
            <div className="relative w-16 h-16 mx-auto mb-0.5 flex-shrink-0">
              <div className={`absolute inset-0 rounded-full border ${a.ring} animate-spin`} style={{ animationDuration: '10s' }} />
              <div className={`absolute inset-[6px] rounded-full border ${a.ringInner}`} />
              <div className={`absolute inset-3 rounded-2xl bg-gradient-to-br ${a.badgeGradient} flex items-center justify-center ${a.badgeGlow}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          )}

          <div>
            <h2 className="text-[19px] font-black tracking-tight text-white leading-tight">{title}</h2>
            {subtitle && (
              <p className={`text-[10px] ${a.subtitleText} uppercase tracking-[0.15em] font-semibold mt-1`}>{subtitle}</p>
            )}
          </div>

          {rules.length > 0 && (
            <div className="flex flex-col gap-1.5 mt-0.5">
              {rules.map((rule, i) => <RuleRow key={i} {...rule} />)}
            </div>
          )}

          {sensitivity && (
            <div className="bg-black/40 border border-white/5 p-3 rounded-xl text-left text-xs mt-0.5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-md ${a.chipBg} flex items-center justify-center`}>
                    <Sliders className={`w-3 h-3 ${a.chipText}`} />
                  </div>
                  Universal Sens
                </span>
                <span className={`${a.chipText} font-bold text-xs ${a.chipBg} border ${a.chipBorder} rounded-md px-2 py-0.5`}>
                  {sensitivity.value.toFixed(2)}x <span className="text-[9px] text-slate-500">({sensitivity.cmPer360} cm/360)</span>
                </span>
              </div>
              <input
                type="range" min="0.1" max="3.0" step="0.05"
                value={sensitivity.value}
                onChange={(e) => sensitivity.onChange(parseFloat(e.target.value))}
                className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${a.sliderAccent}`}
              />
            </div>
          )}

          {isTouchOnlyDevice ? (
            <div className="w-full py-2.5 rounded-[13px] bg-red-950/60 border border-red-500/30 font-bold text-[11px] text-red-400 flex items-center justify-center gap-2 mt-0.5">
              <AlertCircle className="w-4 h-4 text-red-400" /> Mouse Required for Pointer Lock
            </div>
          ) : (
            <button
              onClick={onStart}
              className={`w-full py-[11px] rounded-[13px] bg-gradient-to-r ${a.buttonGradient} font-bold text-[12.5px] tracking-wide active:scale-[0.97] transition-transform ${a.buttonGlow} cursor-pointer text-white flex items-center justify-center gap-2 mt-0.5`}
            >
              <Play className="w-4 h-4 fill-white" /> START DRILL
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
