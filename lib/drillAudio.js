'use client';

const SOUND_STORAGE_KEY = 'skilldrills_sound_enabled';

class DrillAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(SOUND_STORAGE_KEY);
        if (saved !== null) this.enabled = saved === '1';
      } catch (e) {}
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      } catch (e) {}
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      try { this.ctx.resume(); } catch (e) {}
    }
  }

  isEnabled() {
    return this.enabled;
  }

  setEnabled(v) {
    this.enabled = Boolean(v);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(SOUND_STORAGE_KEY, this.enabled ? '1' : '0');
      } catch (e) {}
    }
  }

  tone(freq, dur, type = 'sine', vol = 0.15, sweepTo = null, delay = 0, attackMs = 0, pan = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (sweepTo) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, sweepTo), now + dur);
      }

      const peakVol = Math.min(0.17, vol);
      if (attackMs > 0) {
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(peakVol, now + (attackMs / 1000));
      } else {
        gain.gain.setValueAtTime(peakVol, now);
      }
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(gain);

      let lastNode = gain;
      if (pan !== 0 && typeof this.ctx.createStereoPanner === 'function') {
        const panner = this.ctx.createStereoPanner();
        panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), now);
        gain.connect(panner);
        lastNode = panner;
      }

      lastNode.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + dur);
    } catch (e) {}
  }

  chimeVoice(freq, startAt, dur, vol, filterFreq = 2600) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t0 = startAt;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterFreq, t0);
      filter.Q.setValueAtTime(0.5, t0);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(vol, t0 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      [-4, 4].forEach((cents) => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t0);
        osc.detune.setValueAtTime(cents, t0);
        osc.connect(filter);
        osc.start(t0);
        osc.stop(t0 + dur);
      });
    } catch (e) {}
  }

  // ── CANONICAL EVENT SOUNDS ──

  playBeep(freq, type = 'sine', vol = 0.08, dur = 0.05) {
    this.tone(freq, dur, type, vol);
  }

  playHit() {
    // 880 Hz sine -> sweep 1760 Hz, 0.12 s, vol 0.16
    this.tone(880, 0.12, 'sine', 0.16, 1760);
  }

  playPenalty() {
    // Smooth 220/165 Hz sine, vol 0.12, 0.08s, 60ms apart, 10ms attack
    this.tone(220, 0.08, 'sine', 0.12, null, 0, 10);
    this.tone(165, 0.08, 'sine', 0.12, null, 0.06, 10);
  }

  playCountdownTick() {
    // 440 Hz sine, 0.09 s, vol 0.12
    this.tone(440, 0.09, 'sine', 0.12);
  }

  playTick() {
    // 600 Hz sine, 0.05 s, vol 0.08
    this.tone(600, 0.05, 'sine', 0.08);
  }

  playGo() {
    // C5 -> G5 (523.25 -> 784 Hz), 0.18 s, vol 0.17 triangle
    this.tone(523.25, 0.18, 'triangle', 0.17, 784);
  }

  playSessionEnd() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t0 = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        this.chimeVoice(freq, t0 + i * 0.08, 0.24, 0.13, 3200);
      });
      this.chimeVoice(1046.50, t0 + 0.26, 0.6, 0.16, 4200);
    } catch (e) {}
  }

  // ── EXCEPTION MECHANIC CUE (180-degree-awareness only) ──
  playSpatialCue(panValue = 0) {
    // 550 -> 700 Hz sine, 0.08 s, vol 0.06, panned via StereoPannerNode
    this.tone(550, 0.08, 'sine', 0.06, 700, 0, 0, panValue);
  }
}

export const drillAudio = typeof window !== 'undefined' ? new DrillAudio() : new DrillAudio();
