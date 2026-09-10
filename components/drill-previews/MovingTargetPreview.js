'use client';

import React, { useRef, useEffect } from 'react';

/**
 * MovingTargetPreview
 * Authentic HTML5 <canvas> simulation of Kinetic Intercept.
 * Matches KineticInterceptClient.js:
 *
 * Simulates:
 * - Deep tactical #050508 arena with coordinate grid.
 * - Orange (#f97316) tactical target with layered rendering (ghost ring, outer ring,
 *   filled body with glow, highlight sheen, white core pip).
 * - Linear motion with wall bounce physics.
 * - Countdown relocation arc depleting around the target.
 * - Periodic relocation to new random position/velocity.
 * - Cyan pursuit reticle with cardinal tick marks and human-latency tracking.
 * - Hit feedback: emerald shockwave + particles on intercept.
 * - Zero in-preview title pills/badges.
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function MovingTargetPreview() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isVisible = true;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateDimensions();
    requestAnimationFrame(() => { updateDimensions(); });

    const resizeObserver = new ResizeObserver(() => { updateDimensions(); });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Target state
    const targetRadius = 18;
    let target = { x: 0, y: 0, vx: 0, vy: 0 };
    let relocateTimer = 0;
    const relocateInterval = 2.2;

    // Reticle
    let reticle = { x: 0, y: 0, clickScale: 1.0 };

    // Effects
    let shockwaves = [];
    let particles = [];

    // State: 'tracking' -> 'hit' -> 'relocating'
    let state = 'tracking';
    let stateTimer = 0;
    let hitAlpha = 0;

    const randomizeTarget = () => {
      const pad = targetRadius + 15;
      const w = Math.max(80, width);
      const h = Math.max(60, height);
      target.x = pad + Math.random() * (w - pad * 2);
      target.y = pad + Math.random() * (h - pad * 2);
      const angle = Math.random() * Math.PI * 2;
      const speed = 55 + Math.random() * 35;
      target.vx = Math.cos(angle) * speed;
      target.vy = Math.sin(angle) * speed;
      relocateTimer = 0;

      // Position reticle nearby but offset
      reticle.x = target.x + (Math.random() - 0.5) * 50;
      reticle.y = target.y + (Math.random() - 0.5) * 50;
    };

    randomizeTarget();

    const triggerHit = (cx, cy) => {
      shockwaves.push({ x: cx, y: cy, radius: 10, maxRadius: 50, alpha: 1.0, color: '#10b981' });
      shockwaves.push({ x: cx, y: cy, radius: 6, maxRadius: 65, alpha: 0.75, color: '#ffffff' });
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const spd = 45 + Math.random() * 55;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
          alpha: 1.0, decay: 1.8 + Math.random() * 0.8,
          size: 2 + Math.random() * 1.5,
          color: Math.random() > 0.3 ? '#10b981' : '#f97316',
        });
      }
    };

    // Draw tactical target (inline version of drawTacticalTarget from canvasFx.js)
    const drawTarget = (cx, cy, r) => {
      ctx.save();
      // Ghost outer ring
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 5, 0, Math.PI * 2);
      ctx.stroke();

      // Tactical outer ring
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Filled body with glow
      ctx.globalAlpha = 0.88;
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Highlight sheen
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - r * 0.2, cy - r * 0.2, r * 0.28, 0, Math.PI * 2);
      ctx.fill();

      // Bright white center core
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(2.5, r * 0.18), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!width || !height) return;

      // Background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Tactical grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      if (!prefersReducedMotion) {
        stateTimer += dt;
        relocateTimer += dt;

        if (state === 'tracking') {
          // Move target with wall bounce
          target.x += target.vx * dt;
          target.y += target.vy * dt;
          const r = targetRadius;
          if (target.x - r <= 0) { target.x = r; target.vx = Math.abs(target.vx); }
          if (target.x + r >= width) { target.x = width - r; target.vx = -Math.abs(target.vx); }
          if (target.y - r <= 0) { target.y = r; target.vy = Math.abs(target.vy); }
          if (target.y + r >= height) { target.y = height - r; target.vy = -Math.abs(target.vy); }

          // Reticle pursues target with human-latency spring
          const lerpSpeed = 6;
          reticle.x += (target.x - reticle.x) * Math.min(1, dt * lerpSpeed);
          reticle.y += (target.y - reticle.y) * Math.min(1, dt * lerpSpeed);

          // Check for intercept after some tracking time
          if (stateTimer >= 1.5) {
            const dx = reticle.x - target.x;
            const dy = reticle.y - target.y;
            if (Math.sqrt(dx * dx + dy * dy) < targetRadius * 1.2) {
              state = 'hit';
              stateTimer = 0;
              hitAlpha = 1.0;
              reticle.clickScale = 0.82;
              triggerHit(target.x, target.y);
            }
          }
        } else if (state === 'hit') {
          reticle.clickScale += (1.0 - reticle.clickScale) * Math.min(1, dt * 10);
          hitAlpha = Math.max(0, 1.0 - stateTimer * 2.0);
          reticle.x = target.x;
          reticle.y = target.y;

          if (stateTimer >= 0.5) {
            state = 'relocating';
            stateTimer = 0;
          }
        } else if (state === 'relocating') {
          if (stateTimer >= 0.2) {
            randomizeTarget();
            state = 'tracking';
            stateTimer = 0;
          }
        }

        // Update effects
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const s = shockwaves[i];
          s.radius += (s.maxRadius - s.radius) * Math.min(1, dt * 10);
          s.alpha -= dt * 1.8;
          if (s.alpha <= 0) shockwaves.splice(i, 1);
        }
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * dt; p.y += p.vy * dt;
          p.vx *= 0.94; p.vy *= 0.94;
          p.alpha -= dt * p.decay;
          if (p.alpha <= 0) particles.splice(i, 1);
        }
      }

      // Draw countdown relocation arc around target
      const progress = Math.min(1, relocateTimer / relocateInterval);
      const outerR = targetRadius + 6;
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + (1 - progress) * Math.PI * 2;

      // Background ring
      ctx.beginPath();
      ctx.arc(target.x, target.y, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Depleting arc
      ctx.beginPath();
      ctx.arc(target.x, target.y, outerR, startAngle, endAngle, false);
      ctx.strokeStyle = progress > 0.75 ? '#ef4444' : '#f97316';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = progress > 0.75 ? '#ef4444' : '#f97316';
      ctx.shadowBlur = 5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw target
      if (hitAlpha > 0) {
        ctx.globalAlpha = 0.5 + hitAlpha * 0.5;
      }
      drawTarget(target.x, target.y, targetRadius);
      ctx.globalAlpha = 1.0;

      // Draw shockwaves
      for (const s of shockwaves) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.strokeStyle = s.color === '#ffffff'
          ? `rgba(255,255,255,${Math.max(0, s.alpha)})`
          : `rgba(16,185,129,${Math.max(0, s.alpha)})`;
        ctx.lineWidth = s.color === '#ffffff' ? 1.5 : 2;
        ctx.stroke();
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Draw reticle
      const rx = reticle.x;
      const ry = reticle.y;
      const scale = reticle.clickScale || 1.0;
      const ringR = 15 * scale;
      const isLock = state === 'hit';

      ctx.save();
      ctx.translate(rx, ry);

      ctx.beginPath();
      ctx.arc(0, 0, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = isLock ? '#10b981' : 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 1.5;
      if (isLock) { ctx.shadowColor = '#10b981'; ctx.shadowBlur = 10; }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Cardinal ticks
      const tickLen = 4;
      ctx.strokeStyle = isLock ? '#10b981' : 'rgba(56, 189, 248, 0.9)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, -ringR - 1); ctx.lineTo(0, -ringR - tickLen); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, ringR + 1); ctx.lineTo(0, ringR + tickLen); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-ringR - 1, 0); ctx.lineTo(-ringR - tickLen, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ringR + 1, 0); ctx.lineTo(ringR + tickLen, 0); ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    };

    renderFrame(performance.now());

    const loop = (now) => {
      if (isVisible) renderFrame(now);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-[#050508] select-none pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}

