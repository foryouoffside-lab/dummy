'use client';

import React, { useRef, useEffect } from 'react';

/**
 * ReactionGamePreview
 * Authentic HTML5 <canvas> simulation of the Reaction Game / Reaction Simulator drill.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid and vertical lane guides.
 * - Falling tactical targets descending under vertical velocity.
 * - Bottom danger threshold dashed intercept line.
 * - Real in-game target styling: concentric tactical red rings, glowing red core with shadow blur,
 *   specular highlight sheen, and bright white central core pip.
 * - Interception crosshair rapidly snapping to descending targets before threshold breach.
 * - Dynamic hit reactions: expanding shockwave rings, radiant red/white particle sparks,
 *   and floating +100 score popups.
 * - Zero in-preview title pills/badges (no fake title tags or threshold badges).
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function ReactionGamePreview() {
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

    // Simulation state
    let targets = [];
    let crosshair = { x: 0, y: 0, fromX: 0, fromY: 0, toX: 0, toY: 0, moveProgress: 1 };
    let rings = [];
    let particles = [];
    let popups = [];
    let nextSpawnTime = 0;
    let targetId = 1;

    const spawnTarget = (now) => {
      const radius = Math.max(9, Math.min(width, height) * 0.075);
      const margin = width * 0.16;
      const spawnX = margin + Math.random() * (width - margin * 2);
      const fallSpeed = 65 + Math.random() * 35;

      targets.push({
        id: targetId++,
        x: spawnX,
        y: -radius - 5,
        radius,
        vy: fallSpeed,
        spawnTime: now,
      });

      nextSpawnTime = now + 900 + Math.random() * 400;
    };

    // Crosshair lock & ballistic flick to lowest active target
    let activeTargetId = null;

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isVisible && !prefersReducedMotion) {
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (width === 0 || height === 0) {
        updateDimensions();
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      // --- Background ---
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 28;
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

      // Subtle vertical lane guides (3 parallel drop lanes)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      const lane1 = width * 0.30;
      const lane2 = width * 0.50;
      const lane3 = width * 0.70;
      ctx.beginPath();
      ctx.moveTo(lane1, 0); ctx.lineTo(lane1, height);
      ctx.moveTo(lane2, 0); ctx.lineTo(lane2, height);
      ctx.moveTo(lane3, 0); ctx.lineTo(lane3, height);
      ctx.stroke();

      // Bottom Intercept Threshold line (Danger zone)
      const dangerY = height * 0.84;
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(width * 0.08, dangerY);
      ctx.lineTo(width * 0.92, dangerY);
      ctx.stroke();
      ctx.restore();

      if (prefersReducedMotion) {
        // Static frame for reduced motion
        const r = Math.max(9, Math.min(width, height) * 0.075);
        const staticX = width * 0.5;
        const staticY = height * 0.45;

        ctx.save();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(staticX, staticY, r * 0.82, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(staticX, staticY, r * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      // --- Spawn Targets ---
      if (now >= nextSpawnTime || targets.length === 0) {
        spawnTarget(now);
      }

      // --- Update Falling Targets ---
      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        t.y += t.vy * dt;

        // Clean up targets that fall past bottom
        if (t.y > height + t.radius + 10) {
          targets.splice(i, 1);
          if (activeTargetId === t.id) activeTargetId = null;
        }
      }

      // --- Crosshair Acquisition Logic ---
      // Pick the lowest falling target that is above the danger line
      let lowestTarget = null;
      for (const t of targets) {
        if (t.y > 15 && t.y < dangerY + 15) {
          if (!lowestTarget || t.y > lowestTarget.y) {
            lowestTarget = t;
          }
        }
      }

      if (lowestTarget && activeTargetId !== lowestTarget.id) {
        activeTargetId = lowestTarget.id;
        crosshair.fromX = crosshair.x;
        crosshair.fromY = crosshair.y;
        crosshair.toX = lowestTarget.x;
        crosshair.toY = lowestTarget.y;
        crosshair.moveProgress = 0;
      }

      // Move crosshair
      if (crosshair.moveProgress < 1) {
        crosshair.moveProgress += dt * 4.5;
        if (crosshair.moveProgress >= 1) {
          crosshair.moveProgress = 1;
          crosshair.x = crosshair.toX;
          crosshair.y = crosshair.toY;

          // Crosshair arrived at target -> Trigger hit!
          const targetIndex = targets.findIndex((t) => t.id === activeTargetId);
          if (targetIndex !== -1) {
            const hitT = targets[targetIndex];

            // Shockwave ring
            rings.push({
              x: hitT.x,
              y: hitT.y,
              startR: hitT.radius * 0.4,
              maxR: hitT.radius * 2.5,
              life: 0.35,
              maxLife: 0.35,
              color: '#ef4444',
            });

            // Spark particles
            for (let i = 0; i < 11; i++) {
              const angle = Math.random() * Math.PI * 2;
              const spd = 35 + Math.random() * 85;
              particles.push({
                x: hitT.x,
                y: hitT.y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color: Math.random() > 0.3 ? '#ef4444' : '#ffffff',
                life: 0.42,
                maxLife: 0.42,
              });
            }

            // Score popup
            popups.push({
              x: hitT.x,
              y: hitT.y - hitT.radius * 0.6,
              text: '+100',
              life: 0.55,
              maxLife: 0.55,
            });

            targets.splice(targetIndex, 1);
            activeTargetId = null;
          }
        } else {
          // Ballistic cubic easing
          const tVal = crosshair.moveProgress;
          const ease = tVal < 0.5
            ? 4 * tVal * tVal * tVal
            : 1 - Math.pow(-2 * tVal + 2, 3) / 2;
          crosshair.x = crosshair.fromX + (crosshair.toX - crosshair.fromX) * ease;
          crosshair.y = crosshair.fromY + (crosshair.toY - crosshair.fromY) * ease;
        }
      } else if (lowestTarget) {
        // Track target downwards as it falls
        crosshair.x = lowestTarget.x;
        crosshair.y = lowestTarget.y;
      }

      // --- Draw Falling Targets ---
      for (const t of targets) {
        const r = t.radius;
        ctx.save();

        // 1. Ghost outer ring
        ctx.globalAlpha = 0.22;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(t.x, t.y, r + 4, 0, Math.PI * 2);
        ctx.stroke();

        // 2. Tactical outer ring
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // 3. Glowing red body
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(t.x, t.y, r * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // 4. Highlight sheen
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(t.x - r * 0.22, t.y - r * 0.22, r * 0.26, 0, Math.PI * 2);
        ctx.fill();

        // 5. Bright white center core pip
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(t.x, t.y, Math.max(2.5, r * 0.18), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // --- Ring Bursts ---
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.life -= dt;
        if (ring.life <= 0) {
          rings.splice(i, 1);
          continue;
        }
        const progress = 1 - ring.life / ring.maxLife;
        const curR = ring.startR + (ring.maxR - ring.startR) * progress;
        ctx.save();
        ctx.globalAlpha = (ring.life / ring.maxLife) * 0.8;
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, curR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // --- Particles ---
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        ctx.save();
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // --- Score Popups (+100) ---
      for (let i = popups.length - 1; i >= 0; i--) {
        const pop = popups[i];
        pop.life -= dt;
        if (pop.life <= 0) {
          popups.splice(i, 1);
          continue;
        }
        pop.y -= dt * 25;
        const alpha = pop.life / pop.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pop.text, pop.x, pop.y);
        ctx.restore();
      }

      // --- Tactical Crosshair ---
      ctx.save();
      const chX = crosshair.x || width * 0.5;
      const chY = crosshair.y || height * 0.5;
      const chColor = '#f59e0b';
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

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-[#050508] select-none pointer-events-none rg-prev"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

