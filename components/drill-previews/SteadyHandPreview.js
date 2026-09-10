'use client';

import React, { useRef, useEffect } from 'react';

/**
 * SteadyHandPreview
 *
 * Autonomous HTML5 canvas simulation accurately replicating live SteadyHandClient:
 * - Dark tactical arena (#050508) with subtle cyan coordinate grid
 * - Tinted zone corridors:
 *     - Start Zone (left): Translucent emerald tint (rgba(0, 255, 136, 0.1)) with dashed border
 *     - Goal Zone (right): Translucent electric cyan tint (rgba(59, 130, 246, 0.1)) with luminous border
 * - Glowing winding neon cyan track line (#06b6d4) with ambient shadow blur and corridor envelope
 * - Autonomous cursor (#00ff88) tracing smoothly along the track with realistic human micro-steering
 * - Goal entry impact: emerald flash bloom, dual expanding shockwave rings, and kinetic spark bursts
 * - Dynamic regeneration of randomized path geometry on each completed lap
 * - Zero in-preview START/GOAL badges or fake pill text
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function SteadyHandPreview() {
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
      path: [],
      startZoneW: 42,
      endZoneW: 42,
      progress: 0, // 0 to 1
      speed: 0.38, // traverse speed in cycles per second
      cursor: { x: 0, y: 0 },
      dwellTimer: 0,
      phase: 'trace', // 'trace' | 'goal'
      goalFlash: 0,
      particles: [],
      shockwaves: [],
      screenShake: 0,
    };

    const generatePath = (w, h) => {
      const szW = Math.max(38, w * 0.12);
      const ezW = Math.max(38, w * 0.12);
      state.startZoneW = szW;
      state.endZoneW = ezW;

      const startX = szW;
      const endX = w - ezW;
      const segments = 6;
      const step = (endX - startX) / segments;
      const midY = h * 0.5;
      const maxAmp = h * 0.32;

      const points = [];
      for (let i = 0; i <= segments; i++) {
        if (i === 0 || i === segments) {
          points.push({ x: startX + i * step, y: midY });
        } else {
          const offset = (Math.random() - 0.5) * 2 * maxAmp;
          const clampedY = Math.max(h * 0.18, Math.min(h * 0.82, midY + offset));
          points.push({ x: startX + i * step, y: clampedY });
        }
      }
      return points;
    };

    const spawnGoalBurst = (x, y) => {
      const colors = ['#00ff88', '#10b981', '#38bdf8', '#ffffff'];
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 2.8;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.026 + Math.random() * 0.022,
          size: 1.2 + Math.random() * 1.6,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      state.shockwaves.push({
        x,
        y,
        r: 6,
        maxR: 32,
        life: 1.0,
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

      state.path = generatePath(width, height);
      state.progress = 0;
      state.phase = 'trace';
      state.dwellTimer = 0;
      state.cursor.x = state.startZoneW * 0.5;
      state.cursor.y = height * 0.5;
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

    // Helper: interpolate coordinates along multi-segment polyline
    const getPointAlongPath = (points, t) => {
      if (!points.length) return { x: 0, y: 0 };
      if (points.length === 1) return points[0];

      // Calculate total segment lengths
      let totalLength = 0;
      const segLengths = [];
      for (let i = 0; i < points.length - 1; i++) {
        const d = Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y);
        segLengths.push(d);
        totalLength += d;
      }

      if (totalLength === 0) return points[0];

      const targetDist = t * totalLength;
      let accum = 0;

      for (let i = 0; i < segLengths.length; i++) {
        if (accum + segLengths[i] >= targetDist) {
          const segT = (targetDist - accum) / segLengths[i];
          return {
            x: points[i].x + (points[i + 1].x - points[i].x) * segT,
            y: points[i].y + (points[i + 1].y - points[i].y) * segT,
          };
        }
        accum += segLengths[i];
      }

      return points[points.length - 1];
    };

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

      if (width === 0 || height === 0 || !state.path.length) {
        animId = requestAnimationFrame(render);
        return;
      }

      // State Progression
      if (state.phase === 'trace') {
        state.progress += state.speed * dt;

        if (state.progress >= 1.0) {
          // Reached Goal Zone!
          state.progress = 1.0;
          state.phase = 'goal';
          state.dwellTimer = 0;
          state.goalFlash = 1.0;
          state.screenShake = 2.4;

          const goalX = width - state.endZoneW * 0.5;
          const goalY = state.path[state.path.length - 1].y;
          spawnGoalBurst(goalX, goalY);
        } else {
          // Micro-steering tremor along the path (human closed-loop stabilization)
          const pt = getPointAlongPath(state.path, state.progress);
          const microTremor = Math.sin(now * 0.03) * 0.6;
          state.cursor.x = pt.x;
          state.cursor.y = pt.y + microTremor;
        }
      } else if (state.phase === 'goal') {
        state.dwellTimer += dt;
        state.goalFlash = Math.max(0, state.goalFlash - dt * 3.5);

        // Reset to start of new randomized path after brief dwell (~220ms)
        if (state.dwellTimer >= 0.22) {
          state.path = generatePath(width, height);
          state.progress = 0;
          state.phase = 'trace';
          state.cursor.x = state.startZoneW * 0.5;
          state.cursor.y = height * 0.5;
        }
      }

      // Update Particles
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

      // Update Shockwaves
      for (let i = state.shockwaves.length - 1; i >= 0; i--) {
        const sw = state.shockwaves[i];
        sw.r += dt * 42;
        sw.life -= dt * 3.0;
        if (sw.life <= 0) {
          state.shockwaves.splice(i, 1);
        }
      }

      // Screen Shake Decay
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

      // Subtle atmospheric cyan coordinate grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // 1. Start Zone (Left Column) - Emerald Translucent Fill
      ctx.fillStyle = 'rgba(0, 255, 136, 0.08)';
      ctx.fillRect(0, 0, state.startZoneW, height);

      ctx.strokeStyle = 'rgba(0, 255, 136, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(state.startZoneW, 0);
      ctx.lineTo(state.startZoneW, height);
      ctx.stroke();

      // 2. Goal Zone (Right Column) - Cyan Translucent Fill + Flash Glow
      const goalAlpha = 0.08 + state.goalFlash * 0.25;
      ctx.fillStyle = `rgba(59, 130, 246, ${goalAlpha})`;
      ctx.fillRect(width - state.endZoneW, 0, state.endZoneW, height);

      ctx.strokeStyle = state.goalFlash > 0 ? 'rgba(0, 255, 136, 0.6)' : 'rgba(59, 130, 246, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(width - state.endZoneW, 0);
      ctx.lineTo(width - state.endZoneW, height);
      ctx.stroke();

      // 3. Safe Corridor Outer Boundary Envelope
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 16;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.moveTo(state.path[0].x, state.path[0].y);
      for (let i = 1; i < state.path.length; i++) {
        ctx.lineTo(state.path[i].x, state.path[i].y);
      }
      ctx.stroke();
      ctx.restore();

      // 4. Glowing Neon Cyan Track Line (#06b6d4)
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#06b6d4';
      ctx.moveTo(state.path[0].x, state.path[0].y);
      for (let i = 1; i < state.path.length; i++) {
        ctx.lineTo(state.path[i].x, state.path[i].y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 5. Tracing Cursor (#00ff88)
      const curX = state.cursor.x;
      const curY = state.cursor.y;

      ctx.save();
      // Outer subtle cursor halo
      ctx.beginPath();
      ctx.arc(curX, curY, 8.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 136, 0.2)';
      ctx.fill();

      // Cursor solid core pip
      ctx.beginPath();
      ctx.arc(curX, curY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff88';
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();

      // 6. Expanding Shockwave Rings
      for (const sw of state.shockwaves) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.life);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 7. Kinetic Spark Particles
      for (const pt of state.particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

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

