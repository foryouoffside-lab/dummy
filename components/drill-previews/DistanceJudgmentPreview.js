'use client';

import React, { useRef, useEffect } from 'react';

/**
 * DistanceJudgmentPreview
 * Authentic HTML5 <canvas> simulation of Distance Judgment Lab (Depth Perception).
 * Matches DistanceJudgmentClient.js:
 *
 * Simulates:
 * - Deep tactical #050508 3D perspective tunnel with rectangular depth rings & vanishing lines.
 * - Cyan dashed Target Intercept Plane ring positioned at variable target Z-depths (e.g., 55%).
 * - Continuous 3D Approaching Sphere expanding along the Z-axis with authentic radial gradient lighting,
 *   ambient cyan glow, rim light, and specular highlight.
 * - Perfect timing intercept when the sphere exactly aligns with the target depth ring:
 *   * Ring flashes solid emerald (#10b981) with glow shadow.
 *   * Dual shockwave rings and radial spark bursts emit from the intercept plane.
 *   * Smooth cycle reset with randomized next target depth.
 * - Zero in-preview title pills/badges/text overlays.
 * - Guaranteed first-frame draw + HiDPI scaling + ResizeObserver + IntersectionObserver auto-pause.
 */
export default function DistanceJudgmentPreview() {
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
    requestAnimationFrame(() => {
      updateDimensions();
    });

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

    // Simulation state
    let targetZ = 55; // Target depth percentage (35% to 75%)
    let currentZ = 12; // Approaching sphere current depth percentage
    let isApproaching = true;
    let interceptState = 'approaching'; // 'approaching' | 'hit' | 'reset'
    let stateTimer = 0;
    const approachSpeed = 38; // Z-units per second

    let shockwaves = [];
    let particles = [];

    const triggerIntercept = (cx, cy, r) => {
      shockwaves.push({ x: cx, y: cy, r: r, maxR: r + 38, alpha: 1.0, color: '#10b981' });
      shockwaves.push({ x: cx, y: cy, r: r - 6, maxR: r + 24, alpha: 0.8, color: '#ffffff' });
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const spd = 35 + Math.random() * 45;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          alpha: 1.0,
          decay: 2.2,
          size: 1.8 + Math.random() * 1.4,
        });
      }
    };

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!width || !height) return;

      const centerX = width / 2;
      const centerY = height / 2;
      const baseDim = Math.min(width, height);

      // Deep tactical background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // --- 3D PERSPECTIVE TUNNEL GRID ---
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.14)';
      ctx.lineWidth = 1;

      // Concentric depth rectangles
      for (let depth = 15; depth <= 100; depth += 17) {
        const scale = depth / 100;
        const rw = width * 0.85 * scale;
        const rh = height * 0.85 * scale;
        ctx.strokeRect(centerX - rw / 2, centerY - rh / 2, rw, rh);
      }

      // 4 Vanishing lines from corners to perspective center
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(centerX - width * 0.425 * 0.15, centerY - height * 0.425 * 0.15);
      ctx.moveTo(width, 0); ctx.lineTo(centerX + width * 0.425 * 0.15, centerY - height * 0.425 * 0.15);
      ctx.moveTo(0, height); ctx.lineTo(centerX - width * 0.425 * 0.15, centerY + height * 0.425 * 0.15);
      ctx.moveTo(width, height); ctx.lineTo(centerX + width * 0.425 * 0.15, centerY + height * 0.425 * 0.15);
      ctx.stroke();

      if (!prefersReducedMotion) {
        stateTimer += dt;

        if (interceptState === 'approaching') {
          currentZ += approachSpeed * dt;

          // Check for depth intercept alignment
          if (currentZ >= targetZ) {
            currentZ = targetZ;
            interceptState = 'hit';
            stateTimer = 0;
            const targetRadius = (baseDim * 0.36) * (targetZ / 100);
            triggerIntercept(centerX, centerY, targetRadius);
          }
        } else if (interceptState === 'hit') {
          if (stateTimer >= 0.55) {
            interceptState = 'reset';
            stateTimer = 0;
          }
        } else if (interceptState === 'reset') {
          if (stateTimer >= 0.25) {
            // Pick new random target depth
            const depths = [45, 55, 65, 50, 60];
            targetZ = depths[Math.floor(Math.random() * depths.length)];
            currentZ = 12;
            interceptState = 'approaching';
            stateTimer = 0;
          }
        }

        // Update shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const s = shockwaves[i];
          s.r += (s.maxR - s.r) * Math.min(1, dt * 9);
          s.alpha -= dt * 1.8;
          if (s.alpha <= 0) shockwaves.splice(i, 1);
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.alpha -= dt * p.decay;
          if (p.alpha <= 0) particles.splice(i, 1);
        }
      }

      // --- TARGET DEPTH RING ---
      const targetScale = targetZ / 100;
      const targetRadius = (baseDim * 0.36) * targetScale;
      const isHit = interceptState === 'hit';

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, targetRadius, 0, Math.PI * 2);

      if (isHit) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 12;
      } else {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 6]);
      }
      ctx.stroke();
      ctx.restore();

      // --- APPROACHING 3D SPHERE ---
      const sphereScale = Math.max(0.1, currentZ / 100);
      const sphereRadius = (baseDim * 0.36) * sphereScale;

      if (sphereRadius > 1) {
        ctx.save();

        // Ambient glow behind sphere
        ctx.beginPath();
        ctx.arc(centerX, centerY, sphereRadius + 10, 0, Math.PI * 2);
        ctx.fillStyle = isHit ? 'rgba(16, 185, 129, 0.25)' : 'rgba(6, 182, 212, 0.22)';
        ctx.fill();

        // 3D lit sphere body
        const lightX = centerX - sphereRadius * 0.35;
        const lightY = centerY - sphereRadius * 0.35;
        const sphereGradient = ctx.createRadialGradient(
          lightX, lightY, sphereRadius * 0.05,
          centerX, centerY, sphereRadius
        );

        if (isHit) {
          sphereGradient.addColorStop(0, '#e6fffa');
          sphereGradient.addColorStop(0.35, '#34d399');
          sphereGradient.addColorStop(0.75, '#059669');
          sphereGradient.addColorStop(1, '#064e3b');
        } else {
          sphereGradient.addColorStop(0, '#e0f7ff');
          sphereGradient.addColorStop(0.35, '#38bdf8');
          sphereGradient.addColorStop(0.75, '#0891b2');
          sphereGradient.addColorStop(1, '#0e3a4d');
        }

        ctx.beginPath();
        ctx.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
        ctx.fillStyle = sphereGradient;
        ctx.fill();

        // Rim light
        ctx.lineWidth = Math.max(1, sphereRadius * 0.04);
        ctx.strokeStyle = isHit ? 'rgba(230, 255, 250, 0.6)' : 'rgba(224, 247, 255, 0.5)';
        ctx.stroke();

        // Specular highlight
        ctx.beginPath();
        ctx.arc(lightX, lightY, sphereRadius * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        ctx.restore();
      }

      // --- SHOCKWAVES ---
      for (const s of shockwaves) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.lineWidth = 2;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // --- PARTICLES ---
      for (const p of particles) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.restore();
      }
    };

    renderFrame(performance.now());

    const loop = (now) => {
      if (isVisible) {
        renderFrame(now);
      }
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

