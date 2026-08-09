'use client';

import React, { useEffect } from 'react';
import { drillAudio } from '@/lib/drillAudio';

export default function DrillCountdown({ value, subtitle = '', accent = '#00ff88' }) {
  useEffect(() => {
    if (value === 'GO' || value === 'START' || value === '0' || value === 0) {
      drillAudio.playGo();
    } else if (value !== null && value !== undefined && value !== '') {
      drillAudio.playCountdownTick();
    }
  }, [value]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black font-sans">
      {subtitle ? (
        <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
          {subtitle}
        </span>
      ) : null}
      <div 
        className="relative w-28 h-28 rounded-full border-[3px] flex items-center justify-center"
        style={{ borderColor: `${accent}33` }}
      >
        <div 
          className="absolute -inset-[3px] rounded-full border-[3px] border-transparent animate-spin" 
          style={{ 
            animationDuration: '0.7s',
            borderTopColor: accent,
            borderRightColor: accent
          }} 
        />
        <span key={value} className="animate-in zoom-in-50 fade-in duration-150 text-5xl font-black text-white">
          {value}
        </span>
      </div>
    </div>
  );
}
