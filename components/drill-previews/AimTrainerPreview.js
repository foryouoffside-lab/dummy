'use client';

import React, { useRef, useEffect } from 'react';

/**
 * AimTrainerPreview
 *
 * Autonomous HTML5 canvas simulation accurately replicating live AimTrainerClient:
 * - Dark tactical arena (#050508) with subtle emerald grid
 * - Multiple moving tactical targets with authentic multi-layer rendering:
 *     1. Ghost outer ring
 *     2. Tactical ring with pulse ring expansion
 *     3. Glowing emerald body with highlight sheen
 *     4. Crisp white center core pip
 * - Autonomous crosshair executing rapid snap acquisitions, flicks, and click impacts
 * - White expanding '✕' hit markers and emerald kinetic spark bursts on each pop
 * - Zero in-preview title tags, badges, or fake score text
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function AimTrainerPreview() {
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
      targetCount: 3,
      currentTargetIndex: 0,
      phase: 'flick', // 'flick' | 'dwell'
      phaseTimer: 0,
      cursor: {
        x: 0,
        y: 0,
      },
      particles: [],
      hitMarkers: [],
      hitRings: [],
      screenShake: 0,
    };

    const spawnTarget = (w, h) => {
      const radius = 13 + Math.random() * 3;
      const pad = radius + 24;
      const angle = Math.random() * Math.PI * 2;
      const speed = 25 + Math.random() * 25;
      return {
        x: pad + Math.random() * Math.max(10, w - pad * 2),
        y: pad + Math.random() * Math.max(10, h - pad * 2),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
        age: Math.random() * 0.8,
        ttl: 2.2 + Math.random() * 0.8,
        color: '#00ff88',
      };
    };

    const spawnHitBurst = (x, y) => {
      const colors = ['#00ff88', '#22c55e', '#86efac', '#ffffff'];
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 2.8;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.026 + Math.random() * 0.024,
          size: 1.3 + Math.random() * 1.6,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      state.hitRings.push({
        x,
        y,
        r: 14,
        life: 1.0,
        color: '#00ff88',
      });

      state.hitMarkers.push({
        x,
        y,
        life: 1.0,
      });
    };

    const initArena = (w, h) => {
      state.targets = [];
      for (let i = 0; i < state.targetCount; i++) {
        state.targets.push(spawnTarget(w, h));
      }
      state.currentTargetIndex = 0;
      state.cursor.x = w * 0.5;
      state.cursor.y = h * 0.5;
      state.phase = 'flick';
      state.phaseTimer = 0;
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

      if (width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      // 1. Move Tactical Targets & Bounce within Bounds
      for (let i = 0; i < state.targets.length; i++) {
        const tgt = state.targets[i];
        tgt.x += tgt.vx * dt;
        tgt.y += tgt.vy * dt;

        const pad = tgt.radius + 12;
        if (tgt.x < pad) { tgt.x = pad; tgt.vx *= -1; }
        if (tgt.x > width - pad) { tgt.x = width - pad; tgt.vx *= -1; }
        if (tgt.y < pad) { tgt.y = pad; tgt.vy *= -1; }
        if (tgt.y > height - pad) { tgt.y = height - pad; tgt.vy *= -1; }

        tgt.age += dt;
        if (tgt.age >= tgt.ttl) {
          tgt.age = 0;
        }
      }

      // 2. Simulated Autonomous Crosshair Snaps
      state.phaseTimer += dt;
      const cur = state.cursor;
      const target = state.targets[state.currentTargetIndex];

      if (state.phase === 'flick' && target) {
        const dx = target.x - cur.x;
        const dy = target.y - cur.y;
        const dist = Math.hypot(dx, dy);

        // Fast ballistic flick snap towards target center
        const flickSpeed = Math.min(1.0, 11.5 * dt);
        cur.x += dx * flickSpeed;
        cur.y += dy * flickSpeed;

        if (dist < 3.0 || state.phaseTimer > 0.42) {
          // Snap & click hit!
          cur.x = target.x;
          cur.y = target.y;
          spawnHitBurst(target.x, target.y);
          state.screenShake = 2.4;

          // Respawn popped target elsewhere
          state.targets[state.currentTargetIndex] = spawnTarget(width, height);

          // Select next target in cycle
          state.currentTargetIndex = (state.currentTargetIndex + 1) % state.targets.length;
          state.phase = 'dwell';
          state.phaseTimer = 0;
        }
      } else if (state.phase === 'dwell') {
        // Human-like micro-dwell (50ms) between clicks
        if (state.phaseTimer >= 0.06) {
          state.phase = 'flick';
          state.phaseTimer = 0;
        }
      }

      // Update particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vx *= 0.95;
        pt.vy *= 0.95;
        pt.life -= pt.decay;
        if (pt.life <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // Update hit markers
      for (let i = state.hitMarkers.length - 1; i >= 0; i--) {
        const hm = state.hitMarkers[i];
        hm.life -= dt * 4.2;
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

      // Subtle atmospheric emerald grid (matching client)
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // 1. Draw Moving Tactical Targets (matching client drawTacticalTarget & drawPulseRing)
      for (const tgt of state.targets) {
        const progress = Math.min(1, tgt.age / tgt.ttl);
        const radius = tgt.radius;
        const color = tgt.color;

        ctx.save();

        // Target Pulse Ring
        if (progress > 0 && progress < 1) {
          const pulseRadius = radius + progress * 14;
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
        ctx.arc(tgt.x, tgt.y, radius + 4, 0, Math.PI * 2);
        ctx.stroke();

        // Tactical outer ring
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Filled body with subtle glow
        ctx.globalAlpha = 0.88;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, radius * 0.82, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Highlight sheen
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tgt.x - radius * 0.2, tgt.y - radius * 0.2, radius * 0.28, 0, Math.PI * 2);
        ctx.fill();

        // Bright white center core
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, Math.max(2.2, radius * 0.18), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 2. Draw Hit Markers (white ✕ markers from client)
      for (const hm of state.hitMarkers) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, hm.life);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        const s = 4.5 + (1 - hm.life) * 7;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Draw Particles
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
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(hr.x, hr.y, hr.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Draw Tactical Crosshair (matching client exact crosshair geometry)
      const chX = cur.x;
      const chY = cur.y;
      const chColor = '#22c55e';

      ctx.save();
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
