'use client';

import React, { useRef, useEffect } from 'react';

/**
 * GoNoGoPreview
 * Authentic HTML5 <canvas> simulation of Chroma-Sync Lab / Go / No-Go.
 * Matches ChromaSyncClient.js:
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Central precision 2D target pod with tactical bezel and inner detailing.
 * - Alternating GO (Emerald Green #10b981) and NO-GO (Crimson Red #ef4444) stimuli.
 * - On GO: rapid reaction snap, contact click, expanding emerald shockwave rings, and particle sparks.
 * - On NO-GO: inhibitory motor suppression, reticle holds steady with amber inhibitor ring (zero click).
 * - Smooth transition, readiness charge indicators, and cooling dissipation.
 * - Zero in-preview title pills/badges (removed legacy INHIBITORY OVERRIDE pill & CLICK!/HOLD! tags).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function GoNoGoPreview() {
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

    // Simulation State
    // State machine: 'waiting' -> 'stimulus' -> 'hit' -> 'cooling'
    let state = 'waiting';
    let stateTimer = 0;
    let waitDuration = 1.1;
    let stimulusType = 'GO'; // 'GO' (Green) or 'NO_GO' (Red)
    let cycleCount = 0;

    let shockwaves = [];
    let particles = [];
    let reticle = { x: 0, y: 0, targetX: 0, targetY: 0, clickScale: 1.0, inhibitPulse: 0 };
    let initialized = false;

    let lastTime = performance.now();

    const spawnGoEffects = (cx, cy) => {
      // Expanding emerald shockwaves
      shockwaves.push({ x: cx, y: cy, radius: 12, maxRadius: 58, alpha: 1.0, color: '#10b981' });
      shockwaves.push({ x: cx, y: cy, radius: 8, maxRadius: 78, alpha: 0.75, color: '#ffffff' });

      // Radial emerald particles
      const count = 12;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const speed = 70 + Math.random() * 80;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: 1.6 + Math.random() * 1.6,
          color: i % 2 === 0 ? '#10b981' : '#ffffff',
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
        reticle.x = cx + podRadius * 1.1;
        reticle.y = cy - podRadius * 0.7;
        reticle.targetX = reticle.x;
        reticle.targetY = reticle.y;
        initialized = true;
      }

      // Physics & State Transitions
      if (!prefersReducedMotion) {
        stateTimer += dt;

        if (state === 'waiting') {
          // Hover reticle nearby with micro-drift
          const t = now * 0.002;
          reticle.targetX = cx + Math.sin(t) * (podRadius * 0.65);
          reticle.targetY = cy + Math.cos(t * 1.4) * (podRadius * 0.45);

          if (stateTimer >= waitDuration) {
            state = 'stimulus';
            stateTimer = 0;
            // Alternate GO and NO_GO
            cycleCount++;
            stimulusType = cycleCount % 2 === 1 ? 'GO' : 'NO_GO';
          }
        } else if (state === 'stimulus') {
          if (stimulusType === 'GO') {
            // GO response: Rapid snap and click after ~140ms human latency
            if (stateTimer >= 0.14 && state !== 'hit') {
              state = 'hit';
              stateTimer = 0;
              reticle.targetX = cx;
              reticle.targetY = cy;
              reticle.clickScale = 1.38;
              spawnGoEffects(cx, cy);
            }
          } else {
            // NO_GO response: INHIBIT! Reticle resists snapping, holds steady / backs off
            reticle.inhibitPulse = Math.min(1.0, reticle.inhibitPulse + dt * 4.0);
            reticle.targetX = cx + podRadius * 0.95;
            reticle.targetY = cy - podRadius * 0.6;

            if (stateTimer >= 0.45) {
              state = 'cooling';
              stateTimer = 0;
            }
          }
        } else if (state === 'hit') {
          if (stateTimer >= 0.32) {
            state = 'cooling';
            stateTimer = 0;
          }
        } else if (state === 'cooling') {
          reticle.inhibitPulse = Math.max(0, reticle.inhibitPulse - dt * 2.5);

          if (stateTimer >= 0.65) {
            state = 'waiting';
            stateTimer = 0;
            waitDuration = 1.0 + Math.random() * 0.4;
          }
        }

        // Smooth reticle animation
        const snapSpeed = state === 'hit' ? 20 : 7.0;
        reticle.x += (reticle.targetX - reticle.x) * dt * snapSpeed;
        reticle.y += (reticle.targetY - reticle.y) * dt * snapSpeed;

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

      const isStimActive = state === 'stimulus' || (state === 'hit' && stateTimer < 0.12);

      // 3. Ambient Radial Bloom
      if (isStimActive) {
        ctx.save();
        const bloomColor = stimulusType === 'GO' ? 'rgba(16, 185, 129, ' : 'rgba(239, 68, 68, ';
        const bloomGrad = ctx.createRadialGradient(cx, cy, podRadius * 0.3, cx, cy, podRadius * 2.8);
        bloomGrad.addColorStop(0, `${bloomColor}0.38)`);
        bloomGrad.addColorStop(0.5, `${bloomColor}0.14)`);
        bloomGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = bloomGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, podRadius * 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Pod Housing Outer Bezel
      ctx.save();
      ctx.strokeStyle = isStimActive
        ? stimulusType === 'GO' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'
        : 'rgba(255, 255, 255, 0.14)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx, cy, podRadius + 4, 0, Math.PI * 2);
      ctx.stroke();

      // Readiness Charging Arc
      if (state === 'waiting') {
        const chargeFrac = Math.min(1.0, stateTimer / waitDuration);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(cx, cy, podRadius + 4, -Math.PI / 2, -Math.PI / 2 + chargeFrac * Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // 5. Target Pod Lamp Body (Matches draw2dChromaTarget in ChromaSyncClient)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, podRadius, 0, Math.PI * 2);

      if (isStimActive) {
        if (stimulusType === 'GO') {
          ctx.fillStyle = '#10b981'; // Emerald Green
          ctx.shadowBlur = 30;
          ctx.shadowColor = '#10b981';
        } else {
          ctx.fillStyle = '#ef4444'; // Crimson Red
          ctx.shadowBlur = 30;
          ctx.shadowColor = '#ef4444';
        }
      } else if (state === 'cooling') {
        const coolFrac = stateTimer / 0.65;
        const baseR = stimulusType === 'GO' ? 16 : 239;
        const baseG = stimulusType === 'GO' ? 185 : 68;
        const baseB = stimulusType === 'GO' ? 129 : 68;
        ctx.fillStyle = `rgb(${Math.round(baseR * (1 - coolFrac) * 0.25 + 20)}, ${Math.round(baseG * (1 - coolFrac) * 0.25 + 20)}, ${Math.round(baseB * (1 - coolFrac) * 0.25 + 22)})`;
      } else {
        ctx.fillStyle = '#141416';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner Detailing Ring
      ctx.beginPath();
      ctx.arc(cx, cy, podRadius - 3, 0, Math.PI * 2);
      ctx.strokeStyle = isStimActive ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Center Dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = isStimActive ? '#000000' : '#333338';
      ctx.fill();
      ctx.restore();

      // 6. Expanding Shockwave Rings (on GO hit)
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

      // 8. Tactical Clicker / Crosshair Reticle with Inhibitory Mode Indicator
      ctx.save();
      const reticleR = 14 * reticle.clickScale;
      const isHolding = reticle.inhibitPulse > 0.05;

      ctx.strokeStyle = isHolding
        ? `rgba(245, 158, 11, ${0.75 + reticle.inhibitPulse * 0.25})` // Amber inhibitor lock
        : state === 'hit'
        ? 'rgba(16, 185, 129, 0.95)'
        : 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = isHolding ? '#f59e0b' : state === 'hit' ? '#10b981' : '#38bdf8';
      ctx.shadowBlur = state === 'hit' ? 10 : isHolding ? 8 : 4;

      // Reticle Circle
      ctx.beginPath();
      ctx.arc(reticle.x, reticle.y, reticleR, 0, Math.PI * 2);
      ctx.stroke();

      // Outer Inhibitor Guard Ring (shown when holding on NO-GO)
      if (isHolding) {
        ctx.save();
        ctx.strokeStyle = `rgba(245, 158, 11, ${reticle.inhibitPulse * 0.6})`;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(reticle.x, reticle.y, reticleR + 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4 Cardinal Ticks
      const tickLen = 5;
      ctx.beginPath();
      // Top
      ctx.moveTo(reticle.x, reticle.y - reticleR);
      ctx.lineTo(reticle.x, reticle.y - reticleR - tickLen);
      // Bottom
      ctx.moveTo(reticle.x, reticle.y + reticleR);
      ctx.lineTo(reticle.x, reticle.y + reticleR + tickLen);
      // Left
      ctx.moveTo(reticle.x - reticleR, reticle.y);
      ctx.lineTo(reticle.x - reticleR - tickLen, reticle.y);
      // Right
      ctx.moveTo(reticle.x + reticleR, reticle.y);
      ctx.lineTo(reticle.x + reticleR + tickLen, reticle.y);
      ctx.stroke();

      // Central Pip
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(reticle.x, reticle.y, 2, 0, Math.PI * 2);
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
