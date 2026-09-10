'use client';

import React, { useRef, useEffect } from 'react';

/**
 * AgilityLadderPreview
 *
 * Autonomous HTML5 canvas simulation replicating live MotorSequencingClient:
 * - Twin vertical steel guide rails descending smoothly through the arena
 * - 4-step alternating agility ladder sequences (Left -> Right -> Left -> Right)
 * - Autonomous tactical reticle executing rhythmic, metronomic crosshair sweeps
 * - Emerald hit reactions, stepping particle bursts, and completion checkmark flares
 * - Zero in-preview text, badges, or telemetry pills
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function AgilityLadderPreview() {
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
      ladders: [],
      particles: [],
      completions: [],
      scrollSpeed: 68, // px/s
      reticle: {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        scale: 1.0,
      },
    };

    const spawnParticles = (x, y, color = '#10b981', count = 10) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 2.8;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.025 + Math.random() * 0.03,
          size: 1.5 + Math.random() * 2.0,
          color,
        });
      }
    };

    class PreviewLadder {
      constructor(yPos, railOffset) {
        this.y = yPos;
        this.spacing = 30; // vertical spacing between rungs
        this.railOffset = railOffset;
        this.boxSize = 15;
        this.currentRungIndex = 0;
        this.completed = false;
        this.rungs = [
          { side: 'left', x: -railOffset, stepped: false },
          { side: 'right', x: railOffset, stepped: false },
          { side: 'left', x: -railOffset, stepped: false },
          { side: 'right', x: railOffset, stepped: false },
        ];
      }

      getRungPos(idx, centerX) {
        const rung = this.rungs[idx];
        return {
          x: centerX + rung.x,
          y: this.y + idx * this.spacing,
        };
      }
    }

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;

      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const centerX = width / 2;
      const railOffset = Math.min(width * 0.18, 44);

      // Initialize ladders if empty
      if (state.ladders.length === 0) {
        state.ladders = [
          new PreviewLadder(height * 0.15, railOffset),
          new PreviewLadder(height * 0.15 - 165, railOffset),
        ];
        state.reticle.x = centerX - railOffset;
        state.reticle.y = height * 0.15;
        state.reticle.targetX = centerX - railOffset;
        state.reticle.targetY = height * 0.15;
      }
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

      const centerX = width / 2;
      const railOffset = Math.min(width * 0.18, 44);

      // 1. Update Ladders
      for (let i = state.ladders.length - 1; i >= 0; i--) {
        const ladder = state.ladders[i];
        ladder.y += state.scrollSpeed * dt;

        // Check if ladder has scrolled off screen
        if (ladder.y > height + 100) {
          state.ladders.splice(i, 1);
        }
      }

      // Spawn new ladder if highest ladder descends low enough
      if (state.ladders.length < 3) {
        const highestY = Math.min(...state.ladders.map((l) => l.y), 9999);
        if (highestY > -50) {
          state.ladders.push(new PreviewLadder(highestY - 175, railOffset));
        }
      }

      // 2. Find Current Active Target Rung for Reticle
      // Sort ladders from bottom to top, find first incomplete ladder with visible rungs
      let activeLadder = null;
      let activeRungPos = null;

      for (const ladder of state.ladders) {
        if (!ladder.completed && ladder.currentRungIndex < 4) {
          const rungPos = ladder.getRungPos(ladder.currentRungIndex, centerX);
          if (rungPos.y > -20 && rungPos.y < height + 40) {
            activeLadder = ladder;
            activeRungPos = rungPos;
            break;
          }
        }
      }

      if (activeLadder && activeRungPos) {
        state.reticle.targetX = activeRungPos.x;
        state.reticle.targetY = activeRungPos.y;

        // Smooth seeking toward active target rung with metronomic cadence
        const seekSpeed = 16.0;
        state.reticle.x += (state.reticle.targetX - state.reticle.x) * Math.min(1.0, seekSpeed * dt);
        state.reticle.y += (state.reticle.targetY - state.reticle.y) * Math.min(1.0, seekSpeed * dt);

        // Check step contact
        const dist = Math.hypot(state.reticle.x - activeRungPos.x, state.reticle.y - activeRungPos.y);
        if (dist < 8) {
          const currentRung = activeLadder.rungs[activeLadder.currentRungIndex];
          if (!currentRung.stepped) {
            currentRung.stepped = true;
            activeLadder.currentRungIndex++;
            state.reticle.scale = 0.82; // micro-click depression
            spawnParticles(activeRungPos.x, activeRungPos.y, '#10b981', 8);

            // If ladder completed
            if (activeLadder.currentRungIndex >= 4) {
              activeLadder.completed = true;
              const checkY = activeLadder.y + 1.5 * activeLadder.spacing;
              state.completions.push({
                x: centerX,
                y: checkY,
                life: 1.0,
              });
              spawnParticles(centerX, checkY, '#34d399', 16);
            }
          }
        }
      } else {
        // Natural resting movement down with scroll
        state.reticle.y += state.scrollSpeed * dt;
      }

      // Recover reticle scale
      state.reticle.scale += (1.0 - state.reticle.scale) * Math.min(1.0, 14.0 * dt);

      // Update completion rings/checkmarks
      for (let i = state.completions.length - 1; i >= 0; i--) {
        const c = state.completions[i];
        c.y += state.scrollSpeed * dt;
        c.life -= dt * 1.8;
        if (c.life <= 0) {
          state.completions.splice(i, 1);
        }
      }

      // Update particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy + state.scrollSpeed * 0.3 * dt;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life -= p.decay;
        if (p.life <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // ── DRAWING ──
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Subtle vertical coordinate guidelines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height);
      ctx.stroke();

      // Continuous Twin Steel Guide Rails
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX - railOffset, 0); ctx.lineTo(centerX - railOffset, height);
      ctx.moveTo(centerX + railOffset, 0); ctx.lineTo(centerX + railOffset, height);
      ctx.stroke();

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX - railOffset, 0); ctx.lineTo(centerX - railOffset, height);
      ctx.moveTo(centerX + railOffset, 0); ctx.lineTo(centerX + railOffset, height);
      ctx.stroke();

      // Draw Ladders
      for (const ladder of state.ladders) {
        if (ladder.y > height + 80 || ladder.y < -150) continue;

        const ladderTopY = ladder.y - 12;
        const ladderBottomY = ladder.y + 3 * ladder.spacing + 12;

        // Active ladder rail highlight
        if (!ladder.completed) {
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.18)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(centerX - railOffset, ladderTopY);
          ctx.lineTo(centerX - railOffset, ladderBottomY);
          ctx.moveTo(centerX + railOffset, ladderTopY);
          ctx.lineTo(centerX + railOffset, ladderBottomY);
          ctx.stroke();
        }

        // Draw horizontal rung connectors between rails
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.45)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
          const ry = ladder.y + i * ladder.spacing;
          ctx.beginPath();
          ctx.moveTo(centerX - railOffset, ry);
          ctx.lineTo(centerX + railOffset, ry);
          ctx.stroke();
        }

        // Draw individual step target boxes
        for (let i = 0; i < 4; i++) {
          const rung = ladder.rungs[i];
          const pos = ladder.getRungPos(i, centerX);
          const size = ladder.boxSize;
          const isCurrentTarget = !ladder.completed && i === ladder.currentRungIndex;

          ctx.save();
          ctx.translate(pos.x, pos.y);

          if (rung.stepped) {
            // Stepped: Solid emerald with soft glow
            ctx.fillStyle = '#10b981';
            ctx.shadowColor = '#10b981';
            ctx.shadowBlur = 8;
            ctx.fillRect(-size / 2, -size / 2, size, size);

            // Inner core
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-size / 4, -size / 4, size / 2, size / 2);
          } else if (isCurrentTarget) {
            // Current Target: Pulsing emerald outline
            const pulse = (Math.sin(now * 0.009) + 1) / 2;
            ctx.fillStyle = `rgba(16, 185, 129, ${0.12 + pulse * 0.16})`;
            ctx.fillRect(-size / 2, -size / 2, size, size);

            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#10b981';
            ctx.shadowBlur = 6;
            ctx.strokeRect(-size / 2, -size / 2, size, size);

            // Inset target pip
            ctx.fillStyle = '#10b981';
            ctx.fillRect(-2, -2, 4, 4);
          } else {
            // Inactive rung box: Slate gray
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(-size / 2, -size / 2, size, size);

            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(-size / 2, -size / 2, size, size);
          }

          ctx.restore();
        }
      }

      // Draw Completions (Checkmark + Expanding Ring)
      for (const comp of state.completions) {
        ctx.save();
        ctx.globalAlpha = comp.life;

        // Completion shockwave ring
        const ringRadius = (1 - comp.life) * 28 + 10;
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(comp.x, comp.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Emerald Checkmark
        ctx.beginPath();
        ctx.moveTo(comp.x - 7, comp.y);
        ctx.lineTo(comp.x - 2, comp.y + 6);
        ctx.lineTo(comp.x + 8, comp.y - 6);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        ctx.stroke();

        ctx.restore();
      }

      // Draw Particles
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

      // Draw Tactical Reticle
      ctx.save();
      ctx.translate(state.reticle.x, state.reticle.y);
      ctx.scale(state.reticle.scale, state.reticle.scale);

      // Outer reticle ring
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.stroke();

      // Cardinal crosshair ticks
      ctx.lineWidth = 1.5;
      const gap = 4;
      const tickLen = 11;
      ctx.beginPath();
      ctx.moveTo(0, -tickLen); ctx.lineTo(0, -gap);
      ctx.moveTo(0, tickLen); ctx.lineTo(0, gap);
      ctx.moveTo(-tickLen, 0); ctx.lineTo(-gap, 0);
      ctx.moveTo(tickLen, 0); ctx.lineTo(gap, 0);
      ctx.stroke();

      // Center laser dot
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
      ctx.fill();

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

