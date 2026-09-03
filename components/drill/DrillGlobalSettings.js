'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Zap, ZapOff, Timer, TimerOff, MousePointer2 } from 'lucide-react';
import { drillAudio } from '@/lib/drillAudio';
import { drillFlash } from '@/lib/drillFlash';
import { drillTimeout } from '@/lib/drillTimeout';
import { drillSensitivity, cmPer360, SENS_MIN, SENS_MAX, SENS_STEP, SENS_DEFAULT } from '@/lib/drillSensitivity';

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-blue-600' : 'bg-surface-2 border border-hairline-2'
      }`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? 'translate-x-[22px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  );
}

function SettingRow({ icon: OnIcon, offIcon: OffIcon, label, description, checked, onChange }) {
  const Icon = checked ? OnIcon : OffIcon;
  return (
    <div className="flex items-center gap-3 py-3 px-4 flex-1 min-w-0">
      <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${checked ? 'bg-blue-500/10 text-blue-400' : 'bg-surface-2 text-ink-3'}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-ink-1">{label}</div>
        <div className="text-2xs text-ink-3 truncate">{description}</div>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

export default function DrillGlobalSettings() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [timeoutEnabled, setTimeoutEnabled] = useState(true);
  const [sens, setSens] = useState(SENS_DEFAULT);
  // Touch-only devices tap the target directly — there is no cursor to speed up,
  // so the slider never renders for them. Same test the drills use to decide
  // whether a pointer-lock drill is playable at all.
  const [hasMousePointer, setHasMousePointer] = useState(false);

  useEffect(() => {
    setSoundEnabled(drillAudio.isEnabled());
    setFlashEnabled(drillFlash.isEnabled());
    setTimeoutEnabled(drillTimeout.isEnabled());
    setSens(drillSensitivity.get());
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setHasMousePointer(!(isTouchCapable && !hasFinePointer));
  }, []);

  return (
    <div className="rounded-2xl border border-hairline bg-surface-1/80 backdrop-blur-xl overflow-hidden">
      <div className="px-4 pt-3 pb-1">
        <span className="text-2xs font-mono font-bold text-ink-3 uppercase tracking-wider">Session Settings</span>
      </div>
      <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-hairline">
        <SettingRow
          icon={Volume2}
          offIcon={VolumeX}
          label="Sound Effects"
          description="Hit, miss & countdown cues"
          checked={soundEnabled}
          onChange={(v) => { setSoundEnabled(v); drillAudio.setEnabled(v); }}
        />
        <SettingRow
          icon={Zap}
          offIcon={ZapOff}
          label="Red Flash"
          description="Screen flash on wrong click"
          checked={flashEnabled}
          onChange={(v) => { setFlashEnabled(v); drillFlash.setEnabled(v); }}
        />
        <SettingRow
          icon={Timer}
          offIcon={TimerOff}
          label="Target Timeouts"
          description="Targets expire if not clicked in time"
          checked={timeoutEnabled}
          onChange={(v) => { setTimeoutEnabled(v); drillTimeout.setEnabled(v); }}
        />
      </div>

      {hasMousePointer && (
        <div className="flex items-center gap-3 py-3 px-4 border-t border-hairline">
          <div className="shrink-0 w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <MousePointer2 className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-ink-1">Mouse Sensitivity</div>
                <div className="text-2xs text-ink-3 truncate">Cursor speed in every mouse-aimed drill</div>
              </div>
              <span className="shrink-0 font-mono text-2xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-md px-2 py-0.5">
                {sens.toFixed(2)}x <span className="text-ink-3 font-normal">({cmPer360(sens)} cm/360)</span>
              </span>
            </div>
            <input
              type="range"
              min={SENS_MIN}
              max={SENS_MAX}
              step={SENS_STEP}
              value={sens}
              aria-label="Mouse sensitivity"
              onChange={(e) => { const v = parseFloat(e.target.value); setSens(v); drillSensitivity.set(v); }}
              className="w-full h-1.5 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
