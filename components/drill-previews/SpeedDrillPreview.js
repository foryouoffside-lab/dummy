'use client';

import React, { useRef, useEffect } from 'react';

/**
 * SpeedDrillPreview
 *
 * Autonomous HTML5 canvas simulation replicating live SpeedDrillClient:
 * - High-speed tactical target disk darting across the arena on dynamic velocity vectors
 * - Target continuous shrink decay modeling Fitts's Law speed-accuracy tradeoff
 * - Autonomous ballistic flick kinematics snapping reticle onto target before decay
 * - Explosive hit shockwave ripple and radial spark particle burst upon acquisition
 * - Zero in-preview text, badges, or telemetry pills
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function SpeedDrillPreview() {
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
      phase: 'tracking', // 'tracking' | 'hit' | 'cooldown'
      phaseTimer: 0,
      target: {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 26,
        initialR: 26,
        color: '#eab308',
      },
      reticle: {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
        flickElapsed: 0,
        flickDuration: 0.28,
        scale: 1.0,
      },
      particles: [],
      hitWaves: [],
      screenShake: 0,
    };

    const spawnParticles = (x, y, color = '#eab308', count = 14) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.4 + Math.random() * 4.0;
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

    const spawnNewTarget = (w, h) => {
      const pad = 36;
      const rx = pad + Math.random() * (w - pad * 2);
      const ry = pad + Math.random() * (h - pad * 2);

      const angle = Math.random() * Math.PI * 2;
      const speed = 130 + Math.random() * 60;

      state.target.x = rx;
      state.target.y = ry;
      state.target.vx = Math.cos(angle) * speed;
      state.target.vy = Math.sin(angle) * speed;
      state.target.initialR = 25;
      state.target.r = 25;
      state.target.color = Math.random() > 0.4 ? '#eab308' : '#38bdf8';

      // Set reticle flick starting parameters
      state.reticle.startX = state.reticle.x;
      state.reticle.startY = state.reticle.y;
      state.reticle.flickElapsed = 0;
      state.reticle.flickDuration = 0.26 + Math.random() * 0.06;

      state.phase = 'tracking';
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

      state.reticle.x = width * 0.25;
      state.reticle.y = height * 0.75;
      state.reticle.startX = width * 0.25;
      state.reticle.startY = height * 0.75;
      spawnNewTarget(width, height);
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

      const t = state.target;
      const ret = state.reticle;

      state.phaseTimer += dt;

      if (state.phase === 'tracking') {
        // 1. Target kinematics & rapid shrinking
        t.x += t.vx * dt;
        t.y += t.vy * dt;

        // Shrink rate: decays from initialR down to 9px over ~1.1s
        t.r = Math.max(8, t.r - 14 * dt);

        // Boundary bounce
        const pad = 24;
        if (t.x - t.r < pad && t.vx < 0) t.vx *= -1;
        if (t.x + t.r > width - pad && t.vx > 0) t.vx *= -1;
        if (t.y - t.r < pad && t.vy < 0) t.vy *= -1;
        if (t.y + t.r > height - pad && t.vy > 0) t.vy *= -1;

        // 2. Ballistic Reticle Flick
        // Reaction latency: 0.08s
        const latency = 0.08;
        if (state.phaseTimer > latency) {
          ret.flickElapsed += dt;
          const progress = Math.min(1.0, ret.flickElapsed / ret.flickDuration);
          // Ballistic cubic ease-out
          const ease = 1 - Math.pow(1 - progress, 3);
          ret.x = ret.startX + (t.x - ret.startX) * ease;
          ret.y = ret.startY + (t.y - ret.startY) * ease;

          // Target acquisition when within strike zone
          const dist = Math.hypot(ret.x - t.x, ret.y - t.y);
          if (progress >= 0.95 || dist < t.r + 4) {
            // Hit execution!
            state.phase = 'hit';
            state.phaseTimer = 0;
            state.screenShake = 4;
            ret.scale = 0.78; // click depression

            // Hit wave pulse ring
            state.hitWaves.push({
              x: t.x,
              y: t.y,
              radius: t.r,
              color: t.color,
              life: 1.0,
            });

            spawnParticles(t.x, t.y, t.color, 16);
            spawnParticles(t.x, t.y, '#ffffff', 6);
          }
        }
      } else if (state.phase === 'hit') {
        // Lingering hit burst
        if (state.phaseTimer >= 0.22) {
          state.phase = 'cooldown';
          state.phaseTimer = 0;
        }
      } else if (state.phase === 'cooldown') {
        if (state.phaseTimer >= 0.12) {
          spawnNewTarget(width, height);
        }
      }

      // Recover reticle scale
      ret.scale += (1.0 - ret.scale) * Math.min(1.0, 16 * dt);

      // Update hit waves
      for (let i = state.hitWaves.length - 1; i >= 0; i--) {
        const hw = state.hitWaves[i];
        hw.life -= dt * 2.6;
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

      // Subtle atmospheric grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Tactical Target
      if (state.phase === 'tracking') {
        ctx.save();
        ctx.translate(t.x, t.y);

        // Ghost outer ring
        ctx.strokeStyle = t.color;
        ctx.globalAlpha = 0.22;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, t.r + 5, 0, Math.PI * 2);
        ctx.stroke();

        // Outer tactical ring
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, t.r, 0, Math.PI * 2);
        ctx.stroke();

        // Glowing filled body
        ctx.globalAlpha = 0.88;
        ctx.shadowColor = t.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = t.color;
        ctx.beginPath();
        ctx.arc(0, 0, t.r * 0.82, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Specular highlight sheen
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-t.r * 0.22, -t.r * 0.22, t.r * 0.28, 0, Math.PI * 2);
        ctx.fill();

        // White core dot
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(2.5, t.r * 0.2), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Hit Wave Shockwaves
      for (const hw of state.hitWaves) {
        ctx.save();
        ctx.globalAlpha = hw.life;
        const currentR = hw.radius + (1 - hw.life) * 32;
        ctx.strokeStyle = hw.color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = hw.color;
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
      ctx.translate(ret.x, ret.y);
      ctx.scale(ret.scale, ret.scale);

      const retColor = state.phase === 'hit' ? '#10b981' : '#eab308';
      ctx.strokeStyle = retColor;
      ctx.fillStyle = retColor;

      const chRadius = 11;
      const gap = 4;
      const tickLen = 11;

      // Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with gap
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(0, -tickLen); ctx.lineTo(0, -gap);
      ctx.moveTo(0, tickLen); ctx.lineTo(0, gap);
      ctx.moveTo(-tickLen, 0); ctx.lineTo(-gap, 0);
      ctx.moveTo(tickLen, 0); ctx.lineTo(gap, 0);
      ctx.stroke();

      // Center laser dot
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
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

