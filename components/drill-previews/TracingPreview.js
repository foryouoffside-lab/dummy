'use client';

import React, { useRef, useEffect } from 'react';

/**
 * TracingPreview
 *
 * Autonomous HTML5 canvas simulation accurately replicating live TracingClient:
 * - Dark tactical arena (#05060b) with subtle rose grid lines
 * - Continuous progressive sinusoidal wave filament with harmonic oscillation scrolling horizontally
 * - Authentic in-game visual states:
 *     1. On-path locked tracking: Neon rose wave (#f43f5e) with ambient bloom, vibrant emerald cursor (#10b981) with tracking ring and flow particles
 *     2. Brief micro-deviation: Alert red wave (#ef4444), slate cursor (#64748b), smooth re-engagement
 * - Authentic crosshair: 4 precision cross lines, inner indicator core, and green lock ring
 * - Zero in-preview title tags, badges, or fake 'LOCKED-IN FLOW' pills
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function TracingPreview() {
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
      offset: 0,
      speed: 55, // horizontal wave scroll speed in px/s
      cursor: {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
      },
      isOffPath: false,
      flowTimer: 0,
      deviationTimer: 0,
      particles: [],
    };

    const getWaveY = (xOnScreen, w, h, scrollOffset) => {
      const worldX = xOnScreen + scrollOffset;
      const wavelength = Math.max(220, w * 0.75);
      const mainFreq = (Math.PI * 2) / wavelength;
      const harmonicFreq = mainFreq * 2.2;

      const mainAmp = h * 0.28;
      const harmonicAmp = h * 0.05;

      const mainWave = Math.sin(worldX * mainFreq) * mainAmp;
      const harmonicWave = Math.sin(worldX * harmonicFreq + 0.8) * harmonicAmp;

      return h / 2 + mainWave + harmonicWave;
    };

    const spawnFlowParticle = (x, y) => {
      state.particles.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: -20 - Math.random() * 25,
        vy: (Math.random() - 0.5) * 12,
        life: 1.0,
        decay: 0.035 + Math.random() * 0.025,
        size: 1.4 + Math.random() * 1.4,
        color: Math.random() < 0.65 ? '#10b981' : '#34d399',
      });
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

      // Station cursor at roughly 38% width along the wave
      state.cursor.x = width * 0.38;
      state.cursor.y = getWaveY(state.cursor.x, width, height, state.offset);
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

      if (width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      // 1. Advance Scrolling Wave Filament
      state.offset += state.speed * dt;

      // 2. Continuous Tracking & Autonomous Path Dynamics
      state.flowTimer += dt;
      const targetWaveY = getWaveY(state.cursor.x, width, height, state.offset);

      // Natural motor tracking: ~3.2s of locked-in smooth tracking, followed by a brief ~0.5s micro-deviation
      if (!state.isOffPath) {
        // Tight, smooth tracking along wave path
        state.cursor.y += (targetWaveY - state.cursor.y) * Math.min(1.0, 16.0 * dt);

        if (Math.random() < 0.4) {
          spawnFlowParticle(state.cursor.x, state.cursor.y);
        }

        if (state.flowTimer >= 3.6) {
          // Trigger slight micro-deviation off path
          state.isOffPath = true;
          state.deviationTimer = 0;
          state.flowTimer = 0;
        }
      } else {
        // Micro-deviation: drifts slightly above/below wave
        state.deviationTimer += dt;
        const driftOffset = Math.sin(state.deviationTimer * 10) * 16;
        state.cursor.y += (targetWaveY + driftOffset - state.cursor.y) * Math.min(1.0, 6.0 * dt);

        if (state.deviationTimer >= 0.5) {
          // Smoothly re-engage path
          state.isOffPath = false;
          state.deviationTimer = 0;
          state.flowTimer = 0;
        }
      }

      // Update flow particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.life -= pt.decay;
        if (pt.life <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // ── DRAWING ──
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Arena background
      ctx.fillStyle = '#05060b';
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric grid (matching client)
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // 1. Draw Wave Filament (matching client rendering loop)
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 2.4;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const isOffPath = state.isOffPath;
      ctx.strokeStyle = isOffPath ? '#ef4444' : '#f43f5e';

      const step = 3;
      for (let x = 0; x <= width; x += step) {
        const y = getWaveY(x, width, height, state.offset);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      if (!isOffPath) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#f43f5e';
      }
      ctx.stroke();
      ctx.restore();

      // 2. Draw Flow Energy Particles
      for (const pt of state.particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Draw Crosshair (matching client exact crosshair geometry)
      const chX = state.cursor.x;
      const chY = state.cursor.y;

      ctx.save();
      const chColor = isOffPath ? '#64748b' : '#10b981';
      ctx.strokeStyle = chColor;
      ctx.fillStyle = chColor;

      const chRadius = 11;
      const gap = 4;
      const tickLen = 11;

      // Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(chX, chY, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with gap
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(chX, chY - tickLen); ctx.lineTo(chX, chY - gap);
      ctx.moveTo(chX, chY + tickLen); ctx.lineTo(chX, chY + gap);
      ctx.moveTo(chX - tickLen, chY); ctx.lineTo(chX - gap, chY);
      ctx.moveTo(chX + tickLen, chY); ctx.lineTo(chX + gap, chY);
      ctx.stroke();

      // Center pip
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
        background: '#05060b',
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
