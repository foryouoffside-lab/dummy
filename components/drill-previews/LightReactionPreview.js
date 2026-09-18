'use client';

import React, { useRef, useEffect } from 'react';

/**
 * LightReactionPreview
 * Authentic HTML5 <canvas> simulation of Strobe-Latency Lab / Light Reaction.
 * Matches StrobeLatencyClient.js:
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Central precision 2D strobe lamp pod with tactical bezel and inner detailing.
 * - Realistic armed state with subtle readiness charge indicator.
 * - Sudden blinding flash burst event (#FFFFFF body with high-intensity bloom).
 * - Instant reactive reticle snap with human-like latency delay (~150ms).
 * - Kinetic hit reaction: dual expanding shockwave rings and radial particle sparks.
 * - Zero in-preview title pills/badges (removed legacy STROBE LATENCY pill & 164ms tag).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function LightReactionPreview() {
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

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // HiDPI / Resize management
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

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    // Pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Strobe Cycle Simulation State
    // States: 'waiting' -> 'flashing' -> 'hit' -> 'cooling'
    let state = 'waiting';
    let stateTimer = 0;
    let waitDuration = 1.3; // Random wait before flash
    let particles = [];
    let shockwaves = [];
    let reticle = { x: 0, y: 0, targetX: 0, targetY: 0, clickScale: 1.0 };
    let initialized = false;

    let lastTime = performance.now();

    const spawnHitEffects = (cx, cy) => {
      // Expanding dual shockwaves
      shockwaves.push({ x: cx, y: cy, radius: 10, maxRadius: 55, alpha: 1.0, color: '#ffffff' });
      shockwaves.push({ x: cx, y: cy, radius: 8, maxRadius: 75, alpha: 0.85, color: '#38bdf8' });

      // Radial particle sparks
      const count = 12;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const speed = 65 + Math.random() * 85;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: 1.5 + Math.random() * 1.5,
          color: i % 2 === 0 ? '#ffffff' : '#38bdf8',
        });
      }
    };

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isVisible && !prefersReducedMotion && initialized) {
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (width === 0 || height === 0) {
        updateDimensions();
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      const cx = width * 0.5;
      const cy = height * 0.5;
      const podRadius = Math.max(22, Math.min(width, height) * 0.18);

      if (!initialized) {
        reticle.x = cx + podRadius * 1.2;
        reticle.y = cy - podRadius * 0.8;
        reticle.targetX = reticle.x;
        reticle.targetY = reticle.y;
        initialized = true;
      }

      // State machine transitions
      if (!prefersReducedMotion) {
        stateTimer += dt;

        if (state === 'waiting') {
          // Hover reticle near pod with micro-drift
          const t = now * 0.002;
          reticle.targetX = cx + Math.sin(t) * (podRadius * 0.7);
          reticle.targetY = cy + Math.cos(t * 1.3) * (podRadius * 0.5);

          if (stateTimer >= waitDuration) {
            state = 'flashing';
            stateTimer = 0;
          }
        } else if (state === 'flashing') {
          // Flash triggered! After ~160ms latency, reticle snaps and intercepts
          if (stateTimer >= 0.16 && state !== 'hit') {
            state = 'hit';
            stateTimer = 0;
            reticle.targetX = cx;
            reticle.targetY = cy;
            reticle.clickScale = 1.4;
            spawnHitEffects(cx, cy);
          }
        } else if (state === 'hit') {
          if (stateTimer >= 0.32) {
            state = 'cooling';
            stateTimer = 0;
          }
        } else if (state === 'cooling') {
          if (stateTimer >= 0.7) {
            state = 'waiting';
            stateTimer = 0;
            waitDuration = 1.1 + Math.random() * 0.5;
          }
        }

        // Smooth reticle movement
        const snapRate = state === 'hit' || state === 'flashing' ? 18 : 6.5;
        reticle.x += (reticle.targetX - reticle.x) * dt * snapRate;
        reticle.y += (reticle.targetY - reticle.y) * dt * snapRate;

        // Decay click scale
        if (reticle.clickScale > 1.0) {
          reticle.clickScale = Math.max(1.0, reticle.clickScale - dt * 2.5);
        }

        // Update shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const sw = shockwaves[i];
          sw.radius += (sw.maxRadius - sw.radius) * dt * 7.5;
          sw.alpha -= dt * 2.2;
          if (sw.alpha <= 0) shockwaves.splice(i, 1);
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= dt * 2.0;
          if (p.alpha <= 0) particles.splice(i, 1);
        }
      }

      // --- Draw Canvas ---
      // 1. Deep Space Background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // 2. Coordinate Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      const isFlashing = state === 'flashing' || (state === 'hit' && stateTimer < 0.1);

      // 3. Strobe Ambient Radial Bloom (when flashing)
      if (isFlashing) {
        ctx.save();
        const bloomGradient = ctx.createRadialGradient(cx, cy, podRadius * 0.4, cx, cy, podRadius * 2.8);
        bloomGradient.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        bloomGradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.20)');
        bloomGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = bloomGradient;
        ctx.beginPath();
        ctx.arc(cx, cy, podRadius * 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Strobe Pod Housing Bezel
      ctx.save();
      ctx.strokeStyle = isFlashing ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.14)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx, cy, podRadius + 4, 0, Math.PI * 2);
      ctx.stroke();

      // Outer Readiness Arc (Charges when waiting)
      if (state === 'waiting') {
        const chargeFrac = Math.min(1.0, stateTimer / waitDuration);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(cx, cy, podRadius + 4, -Math.PI / 2, -Math.PI / 2 + chargeFrac * Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // 5. Strobe Pod Lamp Body (Matches draw2dLightTarget in StrobeLatencyClient)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, podRadius, 0, Math.PI * 2);

      if (isFlashing) {
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 32;
        ctx.shadowColor = '#FFFFFF';
      } else if (state === 'cooling') {
        const coolFrac = stateTimer / 0.7;
        ctx.fillStyle = `rgb(${Math.round(255 * (1 - coolFrac) * 0.3 + 20)}, ${Math.round(255 * (1 - coolFrac) * 0.3 + 20)}, ${Math.round(255 * (1 - coolFrac) * 0.3 + 22)})`;
      } else {
        ctx.fillStyle = '#141416';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner Detailing Ring
      ctx.beginPath();
      ctx.arc(cx, cy, podRadius - 3, 0, Math.PI * 2);
      ctx.strokeStyle = isFlashing ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Center Dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = isFlashing ? '#000000' : '#333338';
      ctx.fill();
      ctx.restore();

      // 6. Expanding Shockwave Rings
      for (const sw of shockwaves) {
        ctx.save();
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 7. Kinetic Radial Particles
      for (const p of particles) {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 8. Tactical Crosshair Reticle (matching FPS drill exact crosshair geometry)
      ctx.save();
      const chColor = state === 'hit' ? '#10b981' : '#38bdf8';
      ctx.strokeStyle = chColor;
      ctx.fillStyle = chColor;

      const chRadius = 11;
      const gap = 4;
      const tickLen = 11;

      // Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(reticle.x, reticle.y, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with gap (inward from ring to gap)
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(reticle.x, reticle.y - tickLen); ctx.lineTo(reticle.x, reticle.y - gap);
      ctx.moveTo(reticle.x, reticle.y + tickLen); ctx.lineTo(reticle.x, reticle.y + gap);
      ctx.moveTo(reticle.x - tickLen, reticle.y); ctx.lineTo(reticle.x - gap, reticle.y);
      ctx.moveTo(reticle.x + tickLen, reticle.y); ctx.lineTo(reticle.x + gap, reticle.y);
      ctx.stroke();

      // Central Aim Pip
      ctx.beginPath();
      ctx.arc(reticle.x, reticle.y, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    // Guarantee immediate first frame
    renderFrame(performance.now());
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(renderFrame);
    }

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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}

