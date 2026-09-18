'use client';

import React, { useRef, useEffect } from 'react';

/**
 * RapidTappingPreview
 *
 * Autonomous HTML5 canvas simulation accurately replicating live RapidTappingClient:
 * - Clean dark tactical arena (#050508) with subtle magenta grid
 * - Maximum safe bounds boundary ring (rgba(255, 255, 255, 0.08))
 * - Dynamic central target ball shrinking under continuous decay pressure
 * - Responsive color shift: vibrant magenta (#d946ef) when healthy, warning red (#ef4444) when depleted
 * - Concentric radial gradient fill, crisp perimeter rim, and solid white core pip
 * - Authentic FPS reticle cursor with 4 tick marks, outer tracking ring, and center dot
 * - High-cadence click cadence simulation (jitter/butterfly bursts) with tactile ripples, hit markers, and sparks
 * - Zero in-preview title tags, badges, or fake CPS text
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function RapidTappingPreview() {
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
      cx: 0,
      cy: 0,
      radius: 28,
      minRadius: 8,
      maxRadius: 52,
      shrinkRate: 24,
      expandPerTap: 4.8,
      burstTimer: 0,
      tapInterval: 0.085, // ~12 CPS burst
      tapTimer: 0,
      isBursting: true,
      cycleDuration: 0,
      cursor: {
        x: 0,
        y: 0,
        baseX: 0,
        baseY: 0,
      },
      particles: [],
      hitMarkers: [],
      ripples: [],
      screenShake: 0,
    };

    const spawnTapEffects = (x, y, isLow) => {
      const color = isLow ? '#ef4444' : '#d946ef';
      const colors = isLow
        ? ['#ef4444', '#f87171', '#fca5a5']
        : ['#d946ef', '#e879f9', '#f0abfc', '#ffffff'];

      // Expanding ripple ring
      state.ripples.push({
        x,
        y,
        r: state.radius + 2,
        life: 1.0,
        color,
      });

      // Hit marker
      state.hitMarkers.push({
        x,
        y,
        life: 0.22,
        color,
      });

      // Sparks
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 2.5;
        state.particles.push({
          x: x + Math.cos(angle) * (state.radius * 0.4),
          y: y + Math.sin(angle) * (state.radius * 0.4),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.035 + Math.random() * 0.035,
          size: 1.2 + Math.random() * 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
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

      state.cx = width / 2;
      state.cy = height / 2;
      state.maxRadius = Math.min(width, height) * 0.28;
      state.minRadius = state.maxRadius * 0.16;
      state.radius = state.maxRadius * 0.55;

      state.cursor.baseX = state.cx;
      state.cursor.baseY = state.cy;
      state.cursor.x = state.cx;
      state.cursor.y = state.cy;
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

      const cx = state.cx;
      const cy = state.cy;

      // 1. Target Ball Continuous Shrink Pressure
      state.radius = Math.max(state.minRadius, state.radius - state.shrinkRate * dt);

      // 2. High-Cadence Click Cadence Simulation
      state.cycleDuration += dt;
      state.tapTimer += dt;

      // Alternates between rapid tapping bursts (1.4s) and micro-rest decay dips (0.6s)
      if (state.isBursting) {
        if (state.tapTimer >= state.tapInterval) {
          state.tapTimer = 0;

          // Expand ball radius on each registered click
          state.radius = Math.min(state.maxRadius, state.radius + state.expandPerTap);

          // Subtle cursor micro-jitter from tapping force
          state.cursor.x = cx + (Math.random() - 0.5) * 4;
          state.cursor.y = cy + (Math.random() - 0.5) * 4;

          const fillPercent = state.radius / state.maxRadius;
          spawnTapEffects(state.cursor.x, state.cursor.y, fillPercent < 0.28);
          state.screenShake = 1.2;
        }

        if (state.cycleDuration >= 1.35) {
          state.isBursting = false;
          state.cycleDuration = 0;
        }
      } else {
        // Micro-pause / decay phase: ball shrinks down towards warning threshold
        state.cursor.x += (cx - state.cursor.x) * Math.min(1.0, 10.0 * dt);
        state.cursor.y += (cy - state.cursor.y) * Math.min(1.0, 10.0 * dt);

        if (state.cycleDuration >= 0.55 || state.radius <= state.maxRadius * 0.26) {
          state.isBursting = true;
          state.cycleDuration = 0;
        }
      }

      // Update ripples
      for (let i = state.ripples.length - 1; i >= 0; i--) {
        const rp = state.ripples[i];
        rp.r += dt * 55;
        rp.life -= dt * 2.8;
        if (rp.life <= 0) {
          state.ripples.splice(i, 1);
        }
      }

      // Update hit markers
      for (let i = state.hitMarkers.length - 1; i >= 0; i--) {
        const hm = state.hitMarkers[i];
        hm.life -= dt;
        if (hm.life <= 0) {
          state.hitMarkers.splice(i, 1);
        }
      }

      // Update particles
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

      // Screen shake decay
      let shakeX = 0;
      let shakeY = 0;
      if (state.screenShake > 0.1) {
        shakeX = (Math.random() - 0.5) * state.screenShake;
        shakeY = (Math.random() - 0.5) * state.screenShake;
        state.screenShake *= 0.8;
      } else {
        state.screenShake = 0;
      }

      // ── DRAWING ──
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Arena background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      if (shakeX !== 0 || shakeY !== 0) {
        ctx.translate(shakeX, shakeY);
      }

      // Subtle atmospheric magenta grid (matching client createBackdropCache)
      ctx.strokeStyle = 'rgba(217, 70, 239, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Maximum Safe Bounds Ring (matching client radius bounds)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(cx, cy, state.maxRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Dynamic Target Ball
      const fillPercent = Math.max(0, state.radius / state.maxRadius);
      const isLow = fillPercent < 0.28;
      const primaryColor = isLow ? '#ef4444' : '#d946ef';

      // Concentric radial gradient body
      ctx.save();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(2, state.radius));
      if (isLow) {
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.88)');
        grad.addColorStop(1, 'rgba(239, 68, 68, 0.22)');
      } else {
        grad.addColorStop(0, 'rgba(217, 70, 239, 0.88)');
        grad.addColorStop(1, 'rgba(217, 70, 239, 0.22)');
      }

      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(2, state.radius), 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Sharp perimeter rim
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.restore();

      // Expanding Tactile Ripple Rings
      for (const rp of state.ripples) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, rp.life);
        ctx.strokeStyle = rp.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Center Dot Pip
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Particles
      for (const pt of state.particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Hit Markers (✕ markers matching client)
      for (const hm of state.hitMarkers) {
        ctx.save();
        const progress = Math.max(0, hm.life / 0.22);
        ctx.globalAlpha = progress;
        ctx.strokeStyle = hm.color;
        ctx.lineWidth = 1.8;
        const sz = 6 * (1 - progress);
        ctx.beginPath();
        ctx.moveTo(hm.x - sz, hm.y - sz); ctx.lineTo(hm.x + sz, hm.y + sz);
        ctx.moveTo(hm.x + sz, hm.y - sz); ctx.lineTo(hm.x - sz, hm.y + sz);
        ctx.stroke();
        ctx.restore();
      }

      // Professional FPS Gaming Reticle Cursor (matching client exact reticle geometry)
      const px = state.cursor.x;
      const py = state.cursor.y;
      const chColor = primaryColor;

      ctx.save();
      ctx.strokeStyle = chColor;
      ctx.fillStyle = chColor;

      const chRadius = 11;
      const gap = 4;
      const tickLen = 11;

      // Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(px, py, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with gap
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(px, py - tickLen); ctx.lineTo(px, py - gap);
      ctx.moveTo(px, py + tickLen); ctx.lineTo(px, py + gap);
      ctx.moveTo(px - tickLen, py); ctx.lineTo(px - gap, py);
      ctx.moveTo(px + tickLen, py); ctx.lineTo(px + gap, py);
      ctx.stroke();

      // Center pip
      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
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
