'use client';

import React, { useRef, useEffect } from 'react';

/**
 * JumpSequencePreview
 *
 * Autonomous HTML5 canvas simulation matching live JumpSequenceClient:
 * - Clean tactical dark background with subtle cyan grid
 * - Full-width cyan ground baseline
 * - Vertical impulse charge bar on the left HUD area
 * - Dynamic aerial target with concentric emerald rings and center pip
 * - Pure player state transitions: Emerald (idle) -> Amber (cursor hover) -> Red (charge) -> Cyan glow (ballistic flight)
 * - Red tactical crosshair cursor executing approach, charge, launch, and mid-air steering
 * - Interception explosion with emerald particles and subtle camera shake
 * - Zero in-preview title tags, badges, or fake score texts
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function JumpSequencePreview() {
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
      phase: 'approach', // 'approach' | 'charge' | 'flight' | 'hit' | 'land'
      phaseTimer: 0,
      groundY: 0,
      chargeVal: 0, // 0..100
      player: {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 8.5,
      },
      target: {
        x: 0,
        y: 0,
        r: 16,
        vx: 38,
        vy: 16,
      },
      crosshair: {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      },
      particles: [],
      hitRings: [],
      screenShake: 0,
    };

    const spawnHitParticles = (x, y) => {
      const colors = ['#10b981', '#34d399', '#6ee7b7'];
      for (let i = 0; i < 18; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 3.2;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.024 + Math.random() * 0.024,
          size: 1.5 + Math.random() * 1.8,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      state.hitRings.push({
        x,
        y,
        r: state.target.r,
        life: 1.0,
        color: '#10b981',
      });
    };

    const spawnChargeParticles = (x, y) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      const speed = 0.5 + Math.random() * 1.2;
      state.particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.8,
        decay: 0.04,
        size: 1.2,
        color: '#ef4444',
      });
    };

    const resetTarget = (w, h) => {
      const padX = w * 0.22;
      state.target.x = padX + Math.random() * (w - padX * 2);
      state.target.y = h * 0.2 + Math.random() * (h * 0.28);
      const angle = Math.random() * Math.PI * 2;
      const speed = 30 + Math.random() * 25;
      state.target.vx = Math.cos(angle) * speed;
      state.target.vy = Math.sin(angle) * speed;
    };

    const initRound = (w, h, nextPlayerX = null) => {
      state.groundY = h - 26;
      state.player.x = nextPlayerX !== null ? nextPlayerX : w * 0.3 + Math.random() * (w * 0.4);
      state.player.y = state.groundY - state.player.radius;
      state.player.vx = 0;
      state.player.vy = 0;
      state.chargeVal = 0;

      resetTarget(w, h);

      // Start crosshair offset so it has to move toward player
      state.crosshair.x = state.target.x + (Math.random() - 0.5) * 40;
      state.crosshair.y = state.target.y + 20;

      state.phase = 'approach';
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

      initRound(width, height);
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

      const p = state.player;
      const t = state.target;
      const ch = state.crosshair;
      const groundY = state.groundY;

      // 1. Target Organic Drift (bouncing within upper aerial zone)
      t.x += t.vx * dt;
      t.y += t.vy * dt;
      const minTX = width * 0.16;
      const maxTX = width * 0.84;
      const minTY = height * 0.16;
      const maxTY = height * 0.56;

      if (t.x < minTX || t.x > maxTX) t.vx *= -1;
      if (t.y < minTY || t.y > maxTY) t.vy *= -1;

      state.phaseTimer += dt;

      // 2. Simulated Gameplay State Machine
      if (state.phase === 'approach') {
        // Crosshair smoothly glides toward player on the ground
        const dx = p.x - ch.x;
        const dy = p.y - ch.y;
        const dist = Math.hypot(dx, dy);

        ch.x += dx * Math.min(1.0, 7.5 * dt);
        ch.y += dy * Math.min(1.0, 7.5 * dt);

        // Once hovering close enough to player dot
        if (dist < p.radius + 10 || state.phaseTimer > 1.2) {
          state.phase = 'charge';
          state.phaseTimer = 0;
        }
      } else if (state.phase === 'charge') {
        // Player clicks and holds down: accumulation of vertical launch charge
        state.chargeVal = Math.min(100, state.chargeVal + 130 * dt);

        // Slight micro-jitter to crosshair while holding
        ch.x = p.x + (Math.random() - 0.5) * 1.5;
        ch.y = p.y + (Math.random() - 0.5) * 1.5;

        if (Math.random() < 0.25) {
          spawnChargeParticles(p.x, groundY - 2);
        }

        // When charge reaches desired jump power (~0.65s)
        if (state.chargeVal >= 88 || state.phaseTimer >= 0.7) {
          // Release! Launch vertically into the air
          state.phase = 'flight';
          state.phaseTimer = 0;

          // Compute launch vertical velocity to reach target altitude with gravity
          const gravity = 480;
          const deltaY = groundY - t.y;
          const launchVy = -Math.sqrt(2 * gravity * Math.max(30, deltaY + 12));
          p.vy = launchVy;

          // Initial horizontal impulse towards target
          const timeToApex = Math.abs(launchVy) / gravity;
          p.vx = (t.x - p.x) / Math.max(0.3, timeToApex);

          // Swiftly move crosshair towards target
          ch.vx = (t.x - ch.x) * 4.0;
          ch.vy = (t.y - ch.y) * 4.0;
        }
      } else if (state.phase === 'flight') {
        const gravity = 480;
        p.vy += gravity * dt;
        p.y += p.vy * dt;

        // Crosshair tracks and leads dynamic target
        ch.x += (t.x - ch.x) * Math.min(1.0, 6.5 * dt);
        ch.y += (t.y - ch.y) * Math.min(1.0, 6.5 * dt);

        // Mid-Air Steering: player laterally corrects towards crosshair (Kawato 1999)
        p.x += (ch.x - p.x) * 4.5 * dt;
        p.x = Math.max(16, Math.min(width - 16, p.x));

        // Interception detection
        const distToTarget = Math.hypot(p.x - t.x, p.y - t.y);
        if (distToTarget < t.r + p.radius) {
          // Clean intercept!
          state.phase = 'hit';
          state.phaseTimer = 0;
          state.screenShake = 4.5;
          spawnHitParticles(t.x, t.y);
        } else if (p.y >= groundY - p.radius && p.vy > 0) {
          // Landed back on ground without intercept
          p.y = groundY - p.radius;
          p.vy = 0;
          p.vx = 0;
          state.phase = 'land';
          state.phaseTimer = 0;
        }
      } else if (state.phase === 'hit') {
        // Player continues ballistic arc while particles disperse
        const gravity = 480;
        p.vy += gravity * dt;
        p.y += p.vy * dt;
        p.x += p.vx * 0.6 * dt;

        if (p.y >= groundY - p.radius && p.vy > 0) {
          p.y = groundY - p.radius;
          p.vy = 0;
          p.vx = 0;
        }

        if (state.phaseTimer >= 0.5) {
          const nextX = Math.max(width * 0.2, Math.min(width * 0.8, p.x));
          initRound(width, height, nextX);
        }
      } else if (state.phase === 'land') {
        if (state.phaseTimer >= 0.3) {
          const nextX = Math.max(width * 0.2, Math.min(width * 0.8, p.x));
          initRound(width, height, nextX);
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
      if (state.screenShake > 0.2) {
        shakeX = (Math.random() - 0.5) * state.screenShake;
        shakeY = (Math.random() - 0.5) * state.screenShake;
        state.screenShake *= 0.82;
      } else {
        state.screenShake = 0;
      }

      // ── DRAWING ──
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Dark tactical arena background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      if (shakeX !== 0 || shakeY !== 0) {
        ctx.translate(shakeX, shakeY);
      }

      // Subtle atmospheric grid (matching client createBackdropCache)
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Ground Baseline (Cyan line matching client)
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Left HUD Charge Bar (matching client e.chargeVal display)
      if (state.phase === 'charge' || state.chargeVal > 0) {
        const bx = 14;
        const by = groundY - 60;
        const bw = 7;
        const bh = 50;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(bx, by, bw, bh);

        const chg = (state.chargeVal / 100) * bh;
        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(bx, by + bh - chg, bw, chg);
      }

      // Dynamic Target (Matching client: outer #10b981, inner #34d399, center pip)
      if (state.phase !== 'hit' || state.phaseTimer < 0.15) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r * 0.4, 0, Math.PI * 2);
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 1.3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(t.x, t.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
        ctx.restore();
      }

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

      // Player Dot
      // Hover detection matching client: !isJumping && !isCharging && hypot < p.radius + 18
      const isHovering =
        state.phase === 'approach' &&
        Math.hypot(ch.x - p.x, ch.y - p.y) < p.radius + 14;

      const isAirborne = state.phase === 'flight' || state.phase === 'hit';
      const isCharging = state.phase === 'charge';

      const playerColor = isHovering
        ? '#f59e0b'
        : isAirborne
        ? '#06b6d4'
        : isCharging
        ? '#ef4444'
        : '#10b981';

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = playerColor;

      if (isAirborne) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#06b6d4';
      }
      ctx.fill();
      ctx.restore();

      // Tactical Crosshair Cursor (matching client exact geometry)
      const chRadius = 11;
      const gap = 3.5;
      const tickLen = 11;
      const crosshairColor = isAirborne ? '#06b6d4' : '#ef4444';

      ctx.save();
      ctx.strokeStyle = crosshairColor;
      ctx.lineWidth = 1.6;

      // Outer circle
      ctx.beginPath();
      ctx.arc(ch.x, ch.y, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with center gap
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(ch.x, ch.y - tickLen);
      ctx.lineTo(ch.x, ch.y - gap);
      ctx.moveTo(ch.x, ch.y + tickLen);
      ctx.lineTo(ch.x, ch.y + gap);
      ctx.moveTo(ch.x - tickLen, ch.y);
      ctx.lineTo(ch.x - gap, ch.y);
      ctx.moveTo(ch.x + tickLen, ch.y);
      ctx.lineTo(ch.x + gap, ch.y);
      ctx.stroke();

      // Center pip
      ctx.fillStyle = crosshairColor;
      ctx.beginPath();
      ctx.arc(ch.x, ch.y, 1.8, 0, Math.PI * 2);
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
