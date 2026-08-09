'use client';

import React from 'react';
import { Play, RotateCw, Sun, Moon, Sliders, Ruler, Palette, SlidersHorizontal } from 'lucide-react';

const COLOR_PRESETS = [
  { name: 'Cyber Red', value: '#ef4444' },
  { name: 'Emerald Green', value: '#10b981' },
  { name: 'Neon Blue', value: '#38bdf8' },
  { name: 'Laser Orange', value: '#f97316' },
  { name: 'High-Vis Yellow', value: '#eab308' },
  { name: 'Pure White', value: '#ffffff' },
];

const DURATIONS = [30, 45, 60, 90, 120];
const SPEED_PRESETS = [0.5, 1.0, 2.0, 3.0, 5.0, 7.0, 9.0];

function Toggle({ checked, onChange, activeClass = 'bg-red-500' }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer flex-shrink-0 ${
        checked ? activeClass : 'bg-slate-800'
      }`}
    >
      <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 ${checked ? 'transform translate-x-4' : ''}`} />
    </button>
  );
}

/**
 * Premium settings-only start card for Zig-Zag Path Pursuit — same visual
 * language as FpsStartCard (ambient glow, animated ring badge, rounded shell)
 * but built around this drill's tuning controls instead of rule rows.
 */
export default function ZigZagPathPursuitStartCard({
  selectedDuration,
  onDurationChange,
  speedMultiplier,
  onSpeedChange,
  targetSize,
  onTargetSizeChange,
  targetColor,
  onTargetColorChange,
  mathInvisible,
  onMathInvisibleToggle,
  randomSpeed,
  onRandomSpeedToggle,
  trailEffect,
  onTrailEffectToggle,
  glowEffect,
  onGlowEffectToggle,
  scanlinesActive,
  onScanlinesToggle,
  dayMode,
  onDayModeToggle,
  isMobile,
  onStart,
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-md p-2 sm:p-3 overflow-y-auto"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="relative w-full max-w-[380px] max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0d0d18] to-[#0a0a13] shadow-[0_20px_60px_rgba(0,0,0,.7)] my-auto mx-auto font-sans">

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36 rounded-t-[24px]"
          style={{ background: 'radial-gradient(ellipse 220px 130px at 50% 0%, rgba(239,68,68,.18), transparent 70%)' }}
        />

        <div className="relative px-5 sm:px-6 pt-6 pb-5 flex flex-col gap-3">

          {/* Badge */}
          <div className="relative w-16 h-16 mx-auto mb-0.5 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border border-red-500/20 animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute inset-[6px] rounded-full border border-red-500/10" />
            <div className="absolute inset-3 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-[0_0_28px_rgba(239,68,68,.4)]">
              <Sliders className="w-6 h-6 text-white" />
            </div>
          </div>

          <p className="text-[10px] text-red-400/80 uppercase tracking-[0.15em] font-semibold text-center -mt-1">
            Drill Setup
          </p>

          {/* Session Duration */}
          <div className="bg-white/[0.03] border border-white/5 p-3 rounded-xl text-left">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              Session Time
            </span>
            <div className="grid grid-cols-5 gap-1">
              {DURATIONS.map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => onDurationChange(dur)}
                  className={`py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                    selectedDuration === dur
                      ? 'bg-red-600 text-white border-red-500 shadow-sm'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {dur}s
                </button>
              ))}
            </div>
          </div>

          {/* Target Speed */}
          <div className="bg-white/[0.03] border border-white/5 p-3 rounded-xl text-left">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center">
                  <SlidersHorizontal className="w-3 h-3 text-red-400" />
                </div>
                Target Speed
              </span>
              <span className="text-red-400 font-bold text-xs bg-red-500/10 border border-red-500/20 rounded-md px-2 py-0.5">
                {speedMultiplier.toFixed(1)}x
              </span>
            </div>
            <input
              type="range" min="0.5" max="9.0" step="0.1"
              value={speedMultiplier}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500 mb-1.5"
            />
            <div className="grid grid-cols-7 gap-0.5">
              {SPEED_PRESETS.map((sm) => (
                <button
                  key={sm}
                  type="button"
                  onClick={() => onSpeedChange(sm)}
                  className={`py-0.5 rounded text-[8px] font-bold border transition cursor-pointer ${
                    speedMultiplier === sm
                      ? 'bg-red-950/60 text-red-400 border-red-500/50'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {sm.toFixed(1)}x
                </button>
              ))}
            </div>
          </div>

          {/* Size & Color */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="bg-white/[0.03] border border-white/5 p-3 rounded-xl">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center">
                    <Ruler className="w-3 h-3 text-red-400" />
                  </div>
                  Size
                </span>
                <span className="text-red-400 font-bold text-[11px]">{targetSize}px</span>
              </div>
              <input
                type="range" min="10" max="50" step="1"
                value={targetSize}
                onChange={(e) => onTargetSizeChange(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            <div className="bg-white/[0.03] border border-white/5 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center">
                  <Palette className="w-3 h-3 text-red-400" />
                </div>
                Color
              </span>
              <div className="flex items-center justify-between">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => onTargetColorChange(c.value)}
                    className="w-4 h-4 rounded-full border transition-all relative flex items-center justify-center cursor-pointer"
                    style={{ backgroundColor: c.value, borderColor: targetColor === c.value ? '#ffffff' : 'transparent' }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="bg-white/[0.03] border border-white/5 p-3 rounded-xl flex flex-col gap-2 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-300 uppercase">Hide Line</span>
              <Toggle checked={mathInvisible} onChange={onMathInvisibleToggle} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-300 uppercase">Random Speed</span>
              <Toggle checked={randomSpeed} onChange={onRandomSpeedToggle} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-300 uppercase">Gaze Trail</span>
              <Toggle checked={trailEffect} onChange={onTrailEffectToggle} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-300 uppercase">Neon Glow</span>
              <Toggle checked={glowEffect} onChange={onGlowEffectToggle} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-300 uppercase">Scanlines</span>
              <Toggle checked={scanlinesActive} onChange={onScanlinesToggle} />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
                {dayMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
                Day Mode
              </span>
              <Toggle checked={dayMode} onChange={onDayModeToggle} activeClass="bg-amber-500" />
            </div>
          </div>

          {/* Start Button */}
          <button
            type="button"
            onClick={onStart}
            className="w-full py-[11px] rounded-[13px] bg-gradient-to-r from-red-600 to-rose-600 font-bold text-[12.5px] tracking-wide active:scale-[0.97] transition-transform shadow-[0_0_20px_rgba(239,68,68,.3)] cursor-pointer text-white flex items-center justify-center gap-2 mt-0.5"
          >
            <Play className="w-4 h-4 fill-white" /> START DRILL
          </button>

          {isMobile && (
            <div className="text-[10px] font-medium text-amber-400/90 flex items-center justify-center gap-1.5 text-center">
              <RotateCw className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Rotate mobile for a better experience</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
