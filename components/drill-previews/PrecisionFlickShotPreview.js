'use client';

import React, { useRef, useEffect } from 'react';

/**
 * PrecisionFlickShotPreview
 *
 * Autonomous HTML5 canvas simulation accurately replicating live PrecisionFlickShotClient:
 * - Dark tactical arena (#050508) with subtle white grid lines
 * - Exactly two tactical targets simultaneously on field:
 *     - 1 Active Target (emerald #00ff88) decaying with expanding pulse rings
 *     - 1 Standby Target (electric cyan #38bdf8)
 * - Multi-layer tactical target styling:
 *     1. Ghost outer ring
 *     2. Tactical outer ring
 *     3. Glowing filled core with highlight sheen
 *     4. Crisp solid white bulls-eye center pip
 * - Ballistic snap flick crosshair (cyan #06b6d4) snapping at high velocity onto targets
 * - Expanding white '✕' hit markers and dual-tone emerald/cyan spark bursts upon impact
 * - Zero in-preview title tags, badges, or fake score text
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function PrecisionFlickShotPreview() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Simulation State
    const state = {
      targets: [],
      activeIndex: 0,
      crosshair: { x: 0, y: 0 },
      phase: 'dwell', // 'dwell' | 'flick'
      phaseTimer: 0,
      flickStart: { x: 0, y: 0 },
      particles: [],
      hitMarkers: [],
      hitRings: [],
      screenShake: 0,
    };

    const spawnTarget = (w, h, existingTargets = []) => {
      const maxRadius = 18;
      const pad = maxRadius + 24;
      let x = pad + Math.random() * Math.max(10, w - pad * 2);
      let y = pad + Math.random() * Math.max(10, h - pad * 2);

      for (let attempts = 0; attempts < 12; attempts++) {
        let tooClose = false;
        for (const other of existingTargets) {
          if (other && Math.hypot(x - other.x, y - other.y) < maxRadius * 3.6) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) break;
        x = pad + Math.random() * Math.max(10, w - pad * 2);
        y = pad + Math.random() * Math.max(10, h - pad * 2);
      }

      return {
        x,
        y,
        maxRadius,
        radius: maxRadius,
        decayRate: 14,
      };
    };

    const spawnHitBurst = (x, y, isEmerald) => {
      const colors = isEmerald
        ? ['#00ff88', '#22c55e', '#a7f3d0', '#ffffff']
        : ['#38bdf8', '#0284c7', '#bae6fd', '#ffffff'];

      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 3.2;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.028 + Math.random() * 0.022,
          size: 1.2 + Math.random() * 1.6,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      state.hitRings.push({
        x,
        y,
        r: 16,
        life: 1.0,
        color: '#eab308',
      });

      state.hitMarkers.push({
        x,
        y,
        life: 1.0,
      });
    };

    const initArena = (w, h) => {
      state.targets = [];
      // Spawn two non-overlapping tactical targets
      const t1 = spawnTarget(w, h, []);
      const t2 = spawnTarget(w, h, [t1]);
      state.targets = [t1, t2];
      state.activeIndex = 0;

      // Start crosshair at center
      state.crosshair.x = w * 0.5;
      state.crosshair.y = h * 0.5;
      state.flickStart.x = state.crosshair.x;
      state.flickStart.y = state.crosshair.y;
      state.phase = 'dwell';
      state.phaseTimer = 0.1;
    };

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;

      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initArena(width, height);
    };

    updateDimensions();
    const rafId = requestAnimationFrame(() => updateDimensions());

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lastTimestamp = performance.now();

    const render = (now) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      if (!isVisible || prefersReducedMotion) {
        if (!prefersReducedMotion) {
          animId = requestAnimationFrame(render);
          return;
        }
      }

      if (width === 0 || height === 0 || state.targets.length < 2) {
        animId = requestAnimationFrame(render);
        return;
      }

      // 1. Decay targets dynamically
      const activeTgt = state.targets[state.activeIndex];
      const standbyIdx = 1 - state.activeIndex;
      const standbyTgt = state.targets[standbyIdx];

      if (activeTgt) {
        activeTgt.radius = Math.max(10, activeTgt.radius - activeTgt.decayRate * dt);
      }
      if (standbyTgt) {
        standbyTgt.radius = Math.max(11, standbyTgt.radius - standbyTgt.decayRate * 0.5 * dt);
      }

      // 2. Ballistic Flick & Dwell State Machine
      state.phaseTimer += dt;

      if (state.phase === 'dwell') {
        // Human-like pause and micro-adjustment between ballistic flicks (~180ms)
        if (state.phaseTimer >= 0.18 && activeTgt) {
          state.phase = 'flick';
          state.phaseTimer = 0;
          state.flickStart.x = state.crosshair.x;
          state.flickStart.y = state.crosshair.y;
        }
      } else if (state.phase === 'flick' && activeTgt) {
        // High-acceleration ballistic snap flick (~110ms)
        const flickDuration = 0.11;
        const progress = Math.min(1.0, state.phaseTimer / flickDuration);

        // Explosive quartic ease-out curve matching real esports mouse flicks
        const ease = 1 - Math.pow(1 - progress, 4);

        state.crosshair.x = state.flickStart.x + (activeTgt.x - state.flickStart.x) * ease;
        state.crosshair.y = state.flickStart.y + (activeTgt.y - state.flickStart.y) * ease;

        if (progress >= 1.0) {
          // Snap impact on target center!
          state.crosshair.x = activeTgt.x;
          state.crosshair.y = activeTgt.y;

          spawnHitBurst(activeTgt.x, activeTgt.y, true);
          state.screenShake = 2.6;

          // Respawn hit target with fresh radius
          state.targets[state.activeIndex] = spawnTarget(width, height, [standbyTgt]);

          // Switch active target to standby target for next flick!
          state.activeIndex = standbyIdx;
          state.phase = 'dwell';
          state.phaseTimer = 0;
        }
      }

      // 3. Update kinetic particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vx *= 0.94;
        pt.vy *= 0.94;
        pt.life -= pt.decay;
        if (pt.life <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // 4. Update hit markers
      for (let i = state.hitMarkers.length - 1; i >= 0; i--) {
        const hm = state.hitMarkers[i];
        hm.life -= dt * 4.5;
        if (hm.life <= 0) {
          state.hitMarkers.splice(i, 1);
        }
      }

      for (let i = state.hitRings.length - 1; i >= 0; i--) {
        const hr = state.hitRings[i];
        hr.r += dt * 45;
        hr.life -= dt * 3.2;
        if (hr.life <= 0) {
          state.hitRings.splice(i, 1);
        }
      }

      // 5. Screen shake impulse
      let shakeX = 0;
      let shakeY = 0;
      if (state.screenShake > 0.1) {
        shakeX = (Math.random() - 0.5) * state.screenShake;
        shakeY = (Math.random() - 0.5) * state.screenShake;
        state.screenShake *= 0.82;
      } else {
        state.screenShake = 0;
      }

      // ── CANVAS RENDERING ──
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Arena background (#050508)
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      if (shakeX !== 0 || shakeY !== 0) {
        ctx.translate(shakeX, shakeY);
      }

      // Subtle atmospheric grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // 1. Render Tactical Targets (Active emerald #00ff88, Standby cyan #38bdf8)
      for (let i = 0; i < state.targets.length; i++) {
        const tgt = state.targets[i];
        const isActive = (i === state.activeIndex);
        const color = isActive ? '#00ff88' : '#38bdf8';
        const progress = Math.max(0, Math.min(1, 1 - (tgt.radius / tgt.maxRadius)));
        const radius = tgt.radius;

        ctx.save();

        // Expanding countdown pulse ring
        if (progress > 0 && progress < 1) {
          const pulseRadius = radius + progress * 16;
          const pulseAlpha = (1 - progress) * 0.55;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.globalAlpha = pulseAlpha;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }

        // Ghost outer ring
        ctx.globalAlpha = 0.22;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, radius + 4.5, 0, Math.PI * 2);
        ctx.stroke();

        // Tactical outer ring
        ctx.globalAlpha = 0.55;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Glowing filled body
        ctx.globalAlpha = 0.88;
        ctx.shadowColor = color;
        ctx.shadowBlur = isActive ? 12 : 6;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, radius * 0.82, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Highlight sheen
        ctx.globalAlpha = 0.32;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tgt.x - radius * 0.2, tgt.y - radius * 0.2, radius * 0.28, 0, Math.PI * 2);
        ctx.fill();

        // Bright white center bulls-eye core dot
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, Math.max(2.4, radius * 0.18), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 2. Render White '✕' Hit Markers
      for (const hm of state.hitMarkers) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, hm.life);
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 1.8;
        const s = 4.5 + (1 - hm.life) * 8;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Render Particles
      for (const pt of state.particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (const hr of state.hitRings) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, hr.life * 0.8);
        ctx.strokeStyle = hr.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(hr.x, hr.y, hr.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Render Ballistic Crosshair Reticle (matching client exact crosshair geometry)
      const chX = state.crosshair.x;
      const chY = state.crosshair.y;
      const chColor = '#06b6d4';

      ctx.save();
      ctx.strokeStyle = chColor;
      ctx.fillStyle = chColor;

      const chRadius = 12;
      const gap = 4.5;
      const tickLen = 12;

      // Reticle Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(chX, chY, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Tactical Crosshair ticks with center gap
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(chX, chY - tickLen); ctx.lineTo(chX, chY - gap);
      ctx.moveTo(chX, chY + tickLen); ctx.lineTo(chX, chY + gap);
      ctx.moveTo(chX - tickLen, chY); ctx.lineTo(chX - gap, chY);
      ctx.moveTo(chX + tickLen, chY); ctx.lineTo(chX + gap, chY);
      ctx.stroke();

      // Center Core Dot
      ctx.beginPath();
      ctx.arc(chX, chY, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.restore();

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#050508',
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
