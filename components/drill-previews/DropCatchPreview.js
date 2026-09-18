'use client';

import React, { useRef, useEffect } from 'react';

/**
 * DropCatchPreview
 *
 * Autonomous HTML5 canvas simulation replicating live DropCatchClient:
 * - Falling targets with vertical gravitational acceleration
 * - Stimulus discrimination: valid emerald catch targets vs. deceptive crimson decoys with inscribed cross
 * - Autonomous reticle demonstrating inhibitory impulse control: ignoring decoys, flicking to catch emerald targets
 * - Mid-air interception with explosive emerald shockwave and spark particle bursts
 * - Zero in-preview text, badges, or telemetry pills
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function DropCatchPreview() {
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
      balls: [],
      particles: [],
      hitWaves: [],
      screenShake: 0,
      spawnTimer: 0,
      reticle: {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        scale: 1.0,
      },
    };

    const spawnParticles = (x, y, color = '#10b981', count = 14) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 3.8;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.025 + Math.random() * 0.03,
          size: 1.6 + Math.random() * 2.2,
          color,
        });
      }
    };

    const spawnCycle = (w) => {
      // Spawn a paired set: one valid green target and one red decoy on separate vertical lanes
      const laneL = w * 0.32;
      const laneR = w * 0.68;

      const greenOnLeft = Math.random() > 0.5;
      const greenX = greenOnLeft ? laneL : laneR;
      const redX = greenOnLeft ? laneR : laneL;

      // Green valid target
      state.balls.push({
        x: greenX,
        y: -30,
        r: 18,
        speed: 135 + Math.random() * 25,
        isFake: false,
        caught: false,
      });

      // Red decoy target (offset slightly vertically)
      state.balls.push({
        x: redX,
        y: -55,
        r: 18,
        speed: 130 + Math.random() * 25,
        isFake: true,
        caught: false,
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

      state.reticle.x = width * 0.5;
      state.reticle.y = height * 0.65;
      state.reticle.targetX = width * 0.5;
      state.reticle.targetY = height * 0.65;

      state.balls = [];
      spawnCycle(width, height);
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

      // Update Balls
      for (let i = state.balls.length - 1; i >= 0; i--) {
        const b = state.balls[i];
        b.y += b.speed * dt;

        // Off screen cleanup
        if (b.y - b.r > height + 40) {
          state.balls.splice(i, 1);
        }
      }

      // Spawn new wave if all balls cleared or enough time passed
      state.spawnTimer += dt;
      if (state.balls.length === 0 || state.spawnTimer >= 1.6) {
        state.spawnTimer = 0;
        spawnCycle(width, height);
      }

      // 2. Reticle Kinematics: Find the active falling valid green target
      const greenTarget = state.balls.find((b) => !b.isFake && !b.caught && b.y > 0 && b.y < height * 0.85);

      if (greenTarget) {
        // Intercept target: track down toward predicted catch position
        state.reticle.targetX = greenTarget.x;
        state.reticle.targetY = greenTarget.y;

        const flickSpeed = 14.0;
        state.reticle.x += (state.reticle.targetX - state.reticle.x) * Math.min(1.0, flickSpeed * dt);
        state.reticle.y += (state.reticle.targetY - state.reticle.y) * Math.min(1.0, flickSpeed * dt);

        // Check catch hit
        const dist = Math.hypot(state.reticle.x - greenTarget.x, state.reticle.y - greenTarget.y);
        if (dist < greenTarget.r + 6 && greenTarget.y > height * 0.35) {
          greenTarget.caught = true;
          state.reticle.scale = 0.8; // click depression
          state.screenShake = 3;

          state.hitWaves.push({
            x: greenTarget.x,
            y: greenTarget.y,
            radius: greenTarget.r,
            life: 1.0,
          });

          spawnParticles(greenTarget.x, greenTarget.y, '#10b981', 16);
          spawnParticles(greenTarget.x, greenTarget.y, '#ffffff', 6);
        }
      } else {
        // Return smoothly toward center resting position
        const restX = width * 0.5;
        const restY = height * 0.65;
        state.reticle.x += (restX - state.reticle.x) * Math.min(1.0, 4.0 * dt);
        state.reticle.y += (restY - state.reticle.y) * Math.min(1.0, 4.0 * dt);
      }

      // Recover reticle scale
      state.reticle.scale += (1.0 - state.reticle.scale) * Math.min(1.0, 16.0 * dt);

      // Update hit waves
      for (let i = state.hitWaves.length - 1; i >= 0; i--) {
        const hw = state.hitWaves[i];
        hw.life -= dt * 2.4;
        if (hw.life <= 0) {
          state.hitWaves.splice(i, 1);
        }
      }

      // Update particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life -= p.decay;
        if (p.life <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // Screen shake decay
      let shakeX = 0;
      let shakeY = 0;
      if (state.screenShake > 0.2) {
        shakeX = (Math.random() - 0.5) * state.screenShake;
        shakeY = (Math.random() - 0.5) * state.screenShake;
        state.screenShake *= 0.85;
      } else {
        state.screenShake = 0;
      }

      // ── DRAWING ──
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Tactical Arena Background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      if (shakeX !== 0 || shakeY !== 0) {
        ctx.translate(shakeX, shakeY);
      }

      // Vertical Guide Lanes
      const laneL = width * 0.32;
      const laneR = width * 0.68;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(laneL, 0); ctx.lineTo(laneL, height);
      ctx.moveTo(laneR, 0); ctx.lineTo(laneR, height);
      ctx.stroke();

      // Catch Baseline / Threshold Zone near bottom
      const catchLineY = height * 0.78;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(0, catchLineY);
      ctx.lineTo(width, catchLineY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Falling Balls
      for (const b of state.balls) {
        if (b.caught) continue;

        ctx.save();
        ctx.translate(b.x, b.y);

        const targetColor = b.isFake ? '#ef4444' : '#10b981';

        // Outer ghost ring
        ctx.strokeStyle = targetColor;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, b.r + 4, 0, Math.PI * 2);
        ctx.stroke();

        // Outer tactical ring
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, b.r, 0, Math.PI * 2);
        ctx.stroke();

        // Filled body with glow
        ctx.globalAlpha = 0.88;
        ctx.shadowColor = targetColor;
        ctx.shadowBlur = 12;
        ctx.fillStyle = targetColor;
        ctx.beginPath();
        ctx.arc(0, 0, b.r * 0.82, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Specular highlight
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-b.r * 0.22, -b.r * 0.22, b.r * 0.28, 0, Math.PI * 2);
        ctx.fill();

        // White core dot
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(2.5, b.r * 0.2), 0, Math.PI * 2);
        ctx.fill();

        // If decoy: Draw white tactical ✕ marker
        if (b.isFake) {
          const crossSize = b.r * 0.36;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(-crossSize, -crossSize); ctx.lineTo(crossSize, crossSize);
          ctx.moveTo(crossSize, -crossSize); ctx.lineTo(-crossSize, crossSize);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Hit Waves
      for (const hw of state.hitWaves) {
        ctx.save();
        ctx.globalAlpha = hw.life;
        const currentR = hw.radius + (1 - hw.life) * 32;
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(hw.x, hw.y, currentR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Spark Particles
      for (const p of state.particles) {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Tactical Reticle
      ctx.save();
      ctx.translate(state.reticle.x, state.reticle.y);
      ctx.scale(state.reticle.scale, state.reticle.scale);

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.stroke();

      const gap = 4;
      const tickLen = 11;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -tickLen); ctx.lineTo(0, -gap);
      ctx.moveTo(0, tickLen); ctx.lineTo(0, gap);
      ctx.moveTo(-tickLen, 0); ctx.lineTo(-gap, 0);
      ctx.moveTo(tickLen, 0); ctx.lineTo(gap, 0);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
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

