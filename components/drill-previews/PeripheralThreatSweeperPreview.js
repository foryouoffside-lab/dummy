'use client';

import React, { useRef, useEffect } from 'react';

/**
 * PeripheralThreatSweeperPreview
 *
 * Autonomous HTML5 canvas simulation replicating live PeripheralThreatSweeperClient:
 * - Central tactical defense core and emerald shield perimeter
 * - Multi-directional incoming radial threats creeping inward across 360-degree periphery
 * - Autonomous reticle executing rapid outward radial flick sweeps to intercept threats before core breach
 * - High-speed target explosions, shockwave ripples, and radial spark particles
 * - Zero in-preview text, badges, or telemetry pills
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function PeripheralThreatSweeperPreview() {
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
      threats: [],
      particles: [],
      shockwaves: [],
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

    const spawnParticles = (x, y, color = '#ef4444', count = 14) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 3.6;
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

    const spawnThreat = (w, h) => {
      const angle = Math.random() * Math.PI * 2;
      const radarLimit = Math.min(w, h) * 0.44;

      const rand = Math.random();
      const type = rand < 0.25 ? 'fast' : (rand < 0.5 ? 'wobble' : 'standard');
      const color = type === 'fast' ? '#f97316' : (type === 'wobble' ? '#a855f7' : '#ef4444');
      const speed = (type === 'fast' ? 70 : 45) + Math.random() * 15;

      state.threats.push({
        angle,
        distance: radarLimit,
        speed,
        type,
        color,
        radius: 13,
        wobbleOffset: Math.random() * Math.PI * 2,
        hit: false,
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

      const cx = width / 2;
      const cy = height / 2;

      state.reticle.x = cx;
      state.reticle.y = cy;
      state.reticle.targetX = cx;
      state.reticle.targetY = cy;

      state.threats = [];
      spawnThreat(width, height);
      spawnThreat(width, height);
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

      const cx = width / 2;
      const cy = height / 2;
      const shieldRadius = Math.min(width, height) * 0.18;

      // 1. Update Inward Moving Threats
      for (let i = state.threats.length - 1; i >= 0; i--) {
        const t = state.threats[i];
        t.distance -= t.speed * dt;

        if (t.type === 'wobble') {
          t.wobbleOffset += dt * 4.0;
          t.angle += Math.sin(t.wobbleOffset) * 0.015;
        }

        // Breached core cleanup
        if (t.distance <= shieldRadius - 4) {
          state.threats.splice(i, 1);
        }
      }

      // Dynamic Spawn Cycle: maintain 2-3 active threats
      state.spawnTimer += dt;
      if (state.threats.length < 3 && state.spawnTimer >= 0.85) {
        state.spawnTimer = 0;
        spawnThreat(width, height);
      }

      // 2. Reticle Kinematics: Find closest inward threat
      let closestThreat = null;
      let closestDist = 9999;

      for (const t of state.threats) {
        if (!t.hit && t.distance > shieldRadius && t.distance < closestDist) {
          closestDist = t.distance;
          closestThreat = t;
        }
      }

      if (closestThreat) {
        const tx = cx + Math.cos(closestThreat.angle) * closestThreat.distance;
        const ty = cy + Math.sin(closestThreat.angle) * closestThreat.distance;

        state.reticle.targetX = tx;
        state.reticle.targetY = ty;

        const flickSpeed = 15.0;
        state.reticle.x += (state.reticle.targetX - state.reticle.x) * Math.min(1.0, flickSpeed * dt);
        state.reticle.y += (state.reticle.targetY - state.reticle.y) * Math.min(1.0, flickSpeed * dt);

        // Intercept check
        const dist = Math.hypot(state.reticle.x - tx, state.reticle.y - ty);
        if (dist < closestThreat.radius + 6) {
          closestThreat.hit = true;
          state.reticle.scale = 0.78; // click depression
          state.screenShake = 3;

          state.shockwaves.push({
            x: tx,
            y: ty,
            radius: closestThreat.radius,
            color: closestThreat.color,
            life: 1.0,
          });

          spawnParticles(tx, ty, closestThreat.color, 14);
          spawnParticles(tx, ty, '#ffffff', 5);

          // Remove threat
          const idx = state.threats.indexOf(closestThreat);
          if (idx !== -1) state.threats.splice(idx, 1);
        }
      } else {
        // Recover toward central core hub
        state.reticle.x += (cx - state.reticle.x) * Math.min(1.0, 5.0 * dt);
        state.reticle.y += (cy - state.reticle.y) * Math.min(1.0, 5.0 * dt);
      }

      // Recover reticle scale
      state.reticle.scale += (1.0 - state.reticle.scale) * Math.min(1.0, 16.0 * dt);

      // Update shockwaves
      for (let i = state.shockwaves.length - 1; i >= 0; i--) {
        const sw = state.shockwaves[i];
        sw.life -= dt * 2.6;
        if (sw.life <= 0) {
          state.shockwaves.splice(i, 1);
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

      // Concentric Radar Rings
      const maxRadar = Math.min(width, height) * 0.44;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, maxRadar * 0.65, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, maxRadar, 0, Math.PI * 2); ctx.stroke();

      // Cardinal Coordinate Axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.moveTo(cx - maxRadar, cy); ctx.lineTo(cx + maxRadar, cy);
      ctx.moveTo(cx, cy - maxRadar); ctx.lineTo(cx, cy + maxRadar);
      ctx.stroke();

      // Central Shield Ring & Core Hub
      ctx.save();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(cx, cy, shieldRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(16, 185, 129, 0.06)';
      ctx.beginPath();
      ctx.arc(cx, cy, shieldRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core Hub Dot
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Radial Threats
      for (const t of state.threats) {
        const tx = cx + Math.cos(t.angle) * t.distance;
        const ty = cy + Math.sin(t.angle) * t.distance;

        ctx.save();
        ctx.translate(tx, ty);

        // Outer threat warning pulse
        const progress = Math.max(0, Math.min(1, 1 - (t.distance / maxRadar)));
        const pulseR = t.radius + progress * 8;
        ctx.strokeStyle = t.color;
        ctx.globalAlpha = 0.25 + progress * 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        // Tactical outer ring
        ctx.globalAlpha = 0.65;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, t.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Glowing body fill
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = t.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = t.color;
        ctx.beginPath();
        ctx.arc(0, 0, t.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Specular highlight
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-t.radius * 0.2, -t.radius * 0.2, t.radius * 0.28, 0, Math.PI * 2);
        ctx.fill();

        // White center core
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Shockwaves
      for (const sw of state.shockwaves) {
        ctx.save();
        ctx.globalAlpha = sw.life;
        const currentR = sw.radius + (1 - sw.life) * 28;
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, currentR, 0, Math.PI * 2);
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

