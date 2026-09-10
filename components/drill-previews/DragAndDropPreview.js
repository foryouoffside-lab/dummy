'use client';

import React, { useRef, useEffect } from 'react';

/**
 * DragAndDropPreview
 *
 * Autonomous HTML5 canvas simulation accurately replicating live DragAndDropClient:
 * - Dark tactical arena (#050508) with subtle white coordinate grid
 * - Moving hollow bucket target with outer radial countdown timer arc and pulse ring
 * - Draggable solid blue ball with crisp border stroke (no fake glow or white centers)
 * - Tactical crosshair cursor executing authentic drag-and-drop mechanics:
 *     1. Glide to ball position
 *     2. Grip / click-hold (color brightens to #00f0ff)
 *     3. Transport / drag toward moving container
 *     4. Clean release drop inside hollow bucket
 *     5. Blue kinetic particle explosion + expanding '✕' hit marker
 * - Zero in-preview badges, pills, or fake score text
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function DragAndDropPreview() {
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
      phase: 'approach', // 'approach' | 'drag' | 'drop' | 'respawn'
      phaseTimer: 0,
      lifeTimer: 3.2,
      maxLife: 3.2,
      bucket: {
        x: 0,
        y: 0,
        r: 22,
        tx: 0,
        ty: 0,
        vx: 0,
        vy: 0,
        speed: 36,
      },
      ball: {
        x: 0,
        y: 0,
        r: 7.5,
        isDragging: false,
      },
      cursor: {
        x: 0,
        y: 0,
      },
      particles: [],
      hitMarkers: [],
      screenShake: 0,
    };

    const spawnExplosion = (x, y) => {
      const colors = ['#38bdf8', '#00f0ff', '#60a5fa', '#93c5fd'];
      for (let i = 0; i < 16; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 2.8;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.024 + Math.random() * 0.02,
          size: 1.5 + Math.random() * 1.8,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const spawnNewTarget = (w, h) => {
      const pad = state.bucket.r + 28;
      state.bucket.tx = pad + Math.random() * Math.max(10, w - pad * 2);
      state.bucket.ty = pad + Math.random() * Math.max(10, h - pad * 2);
      const angle = Math.atan2(state.bucket.ty - state.bucket.y, state.bucket.tx - state.bucket.x);
      state.bucket.vx = Math.cos(angle) * state.bucket.speed;
      state.bucket.vy = Math.sin(angle) * state.bucket.speed;
      state.lifeTimer = state.maxLife;
    };

    const initRound = (w, h, preserveBucket = false) => {
      if (!preserveBucket) {
        state.bucket.x = w * 0.7 + (Math.random() - 0.5) * (w * 0.2);
        state.bucket.y = h * 0.4 + (Math.random() - 0.5) * (h * 0.25);
        spawnNewTarget(w, h);
      }

      // Spawn ball on the opposite / alternative quadrant
      const ballPad = 32;
      const isLeft = state.bucket.x > w * 0.5;
      const minX = isLeft ? ballPad : w * 0.55;
      const maxX = isLeft ? w * 0.45 : w - ballPad;
      state.ball.x = minX + Math.random() * (maxX - minX);
      state.ball.y = ballPad + Math.random() * (h - ballPad * 2);
      state.ball.isDragging = false;

      // Start cursor slightly offset from ball
      state.cursor.x = state.ball.x + (Math.random() - 0.5) * 35;
      state.cursor.y = state.ball.y + (Math.random() - 0.5) * 35;

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

      const b = state.bucket;
      const ball = state.ball;
      const cur = state.cursor;

      // 1. Moving Bucket Target
      const distToWaypoint = Math.hypot(b.tx - b.x, b.ty - b.y);
      if (distToWaypoint < 12) {
        spawnNewTarget(width, height);
      } else {
        const angle = Math.atan2(b.ty - b.y, b.tx - b.x);
        b.vx = Math.cos(angle) * b.speed;
        b.vy = Math.sin(angle) * b.speed;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }

      // Life timer countdown
      state.lifeTimer = Math.max(0, state.lifeTimer - dt * 0.7);

      state.phaseTimer += dt;

      // 2. Simulated Player Cursor Routine
      if (state.phase === 'approach') {
        // Smooth cursor movement toward the ball
        const dx = ball.x - cur.x;
        const dy = ball.y - cur.y;
        const dist = Math.hypot(dx, dy);

        cur.x += dx * Math.min(1.0, 8.5 * dt);
        cur.y += dy * Math.min(1.0, 8.5 * dt);

        if (dist < 3.0 || state.phaseTimer > 1.0) {
          // Grip ball
          cur.x = ball.x;
          cur.y = ball.y;
          ball.isDragging = true;
          state.phase = 'drag';
          state.phaseTimer = 0;
        }
      } else if (state.phase === 'drag') {
        // Drags the ball smoothly towards the moving bucket center
        const dx = b.x - cur.x;
        const dy = b.y - cur.y;
        const dist = Math.hypot(dx, dy);

        // Human-like curved dragging motion with slight acceleration
        const dragSpeed = Math.min(1.0, (5.0 + state.phaseTimer * 4.0) * dt);
        cur.x += dx * dragSpeed;
        cur.y += dy * dragSpeed;

        ball.x = cur.x;
        ball.y = cur.y;

        // Check if ball entered the bucket rim
        if (dist <= b.r + ball.r * 0.4 || state.phaseTimer > 1.6) {
          // Drop inside bucket!
          ball.isDragging = false;
          state.phase = 'drop';
          state.phaseTimer = 0;
          state.screenShake = 3.5;

          spawnExplosion(b.x, b.y);
          state.hitMarkers.push({ x: b.x, y: b.y, life: 1.0 });
        }
      } else if (state.phase === 'drop') {
        if (state.phaseTimer >= 0.35) {
          spawnNewTarget(width, height);
          initRound(width, height, true);
        }
      }

      // Update particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vx *= 0.96;
        pt.vy *= 0.96;
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

      // Arena background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      if (shakeX !== 0 || shakeY !== 0) {
        ctx.translate(shakeX, shakeY);
      }

      // Subtle atmospheric grid (matching client createBackdropCache)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // 1. Draw Moving Hollow Bucket Target (matching client drawHollowBucketTarget & drawPulseRing)
      const lifeRatio = Math.max(0, state.lifeTimer / state.maxLife);
      const timerColor = lifeRatio < 0.25 ? '#ef4444' : '#60a5fa';
      const primaryBlue = '#38bdf8';

      // Pulse ring
      const pulsePulse = (1 - lifeRatio);
      const pulseRadius = b.r + pulsePulse * 8;
      ctx.save();
      ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, 0.35 * (1 - pulsePulse))})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(b.x, b.y, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Hollow inside gradient
      ctx.save();
      const insideGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      insideGrad.addColorStop(0, 'rgba(56, 189, 248, 0.09)');
      insideGrad.addColorStop(0.75, 'rgba(56, 189, 248, 0.02)');
      insideGrad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
      ctx.fillStyle = insideGrad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      // Inner subtle drop-zone guide ring
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(b.x, b.y, Math.max(4, b.r * 0.7), 0, Math.PI * 2);
      ctx.stroke();

      // Main Solid Blue Bucket Rim
      ctx.strokeStyle = primaryBlue;
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.stroke();

      // Radial Timer Ring Arc around Bucket Rim
      ctx.strokeStyle = timerColor;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r + 5.5, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * lifeRatio);
      ctx.stroke();
      ctx.restore();

      // 2. Draw Hit Markers (✕ markers from client)
      for (const hm of state.hitMarkers) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, hm.life);
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2.0;
        const s = 5 + (1 - hm.life) * 8;
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

      // 4. Draw Small Blue Ball (matching client drawSmallBlueBall)
      if (state.phase !== 'drop' || state.phaseTimer < 0.1) {
        ctx.save();
        const baseBlue = ball.isDragging ? '#00f0ff' : '#38bdf8';
        ctx.fillStyle = baseBlue;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Draw Tactical Crosshair (matching client exact crosshair geometry)
      ctx.save();
      const crosshairColor = ball.isDragging ? '#00f0ff' : '#38bdf8';
      ctx.strokeStyle = crosshairColor;
      ctx.fillStyle = crosshairColor;

      const chRadius = 11;
      const gap = 4;
      const tickLen = 11;

      // Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cur.x, cur.y, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with gap
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(cur.x, cur.y - tickLen); ctx.lineTo(cur.x, cur.y - gap);
      ctx.moveTo(cur.x, cur.y + tickLen); ctx.lineTo(cur.x, cur.y + gap);
      ctx.moveTo(cur.x - tickLen, cur.y); ctx.lineTo(cur.x - gap, cur.y);
      ctx.moveTo(cur.x + tickLen, cur.y); ctx.lineTo(cur.x + gap, cur.y);
      ctx.stroke();

      // Center pip
      ctx.beginPath();
      ctx.arc(cur.x, cur.y, 1.8, 0, Math.PI * 2);
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
