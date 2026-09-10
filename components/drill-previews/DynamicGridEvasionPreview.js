'use client';

import React, { useRef, useEffect } from 'react';

/**
 * DynamicGridEvasionPreview
 *
 * Autonomous HTML5 canvas simulation replicating the live DynamicGridEvasionClient:
 * - 3x3 tactical arena grid with subtle background matrix accents
 * - Alternating threat phases: amber warning pulses -> crimson AOE blasts + screen shake + spark particles
 * - Autonomous tactical reticle executing ballistic flick evasions into designated safe cells
 * - Emerald safe-zone perimeter pulse upon blast survival
 * - Zero in-preview text, badges, or telemetry pills
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function DynamicGridEvasionPreview() {
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
      phase: 'warning', // 'warning' | 'explosion' | 'cooldown'
      phaseTimer: 0,
      warningDuration: 1.35,
      explosionDuration: 0.38,
      cooldownDuration: 0.25,
      dangerCells: [0, 1, 3, 4, 7], // 3x3 indices (0..8)
      safeCells: [2, 5, 6, 8],
      targetSafeCell: 2,
      lastSafeCell: 4,
      // Reticle coordinate state
      reticle: {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
        targetX: 0,
        targetY: 0,
        moveProgress: 1.0,
        moveDuration: 0.32,
      },
      // Screen shake offset
      screenShake: 0,
      // Particle system
      particles: [],
      // Safe wave pulse
      safePulse: 0,
      safeCellIndex: 2,
    };

    const spawnParticles = (cx, cy, color, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 3.8;
        state.particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.02 + Math.random() * 0.03,
          size: 1.5 + Math.random() * 2.2,
          color,
        });
      }
    };

    const getCellCenter = (cellIndex, gridX, gridY, cellW, cellH) => {
      const col = cellIndex % 3;
      const row = Math.floor(cellIndex / 3);
      return {
        x: gridX + col * cellW + cellW / 2,
        y: gridY + row * cellH + cellH / 2,
      };
    };

    const startNewWave = (w, h) => {
      // Pick 4 to 6 random danger cells out of 9
      const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const threatCount = 4 + Math.floor(Math.random() * 3); // 4, 5, or 6 threats

      // Shuffle indices
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      state.dangerCells = indices.slice(0, threatCount);
      state.safeCells = indices.slice(threatCount);

      // Pick target safe cell (prefer different from current cell)
      const currentCell = state.safeCellIndex;
      const otherSafeCells = state.safeCells.filter((c) => c !== currentCell);
      const chosenSafeCell = otherSafeCells.length > 0
        ? otherSafeCells[Math.floor(Math.random() * otherSafeCells.length)]
        : state.safeCells[Math.floor(Math.random() * state.safeCells.length)];

      state.lastSafeCell = currentCell;
      state.safeCellIndex = chosenSafeCell;

      const pad = 12;
      const gridW = w - pad * 2;
      const gridH = h - pad * 2;
      const cellW = gridW / 3;
      const cellH = gridH / 3;

      const targetPos = getCellCenter(chosenSafeCell, pad, pad, cellW, cellH);

      state.reticle.startX = state.reticle.x;
      state.reticle.startY = state.reticle.y;
      state.reticle.targetX = targetPos.x;
      state.reticle.targetY = targetPos.y;
      state.reticle.moveProgress = 0;
      state.reticle.moveDuration = 0.28 + Math.random() * 0.08;

      state.phase = 'warning';
      state.phaseTimer = 0;
      state.warningDuration = 1.25 + Math.random() * 0.25;
      state.safePulse = 0;
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

      // Initialize reticle position to center cell if uninitialized
      if (state.reticle.x === 0 && state.reticle.y === 0) {
        const pad = 12;
        const gridW = width - pad * 2;
        const gridH = height - pad * 2;
        const center = getCellCenter(4, pad, pad, gridW / 3, gridH / 3);
        state.reticle.x = center.x;
        state.reticle.y = center.y;
        state.reticle.startX = center.x;
        state.reticle.startY = center.y;
        state.reticle.targetX = center.x;
        state.reticle.targetY = center.y;
        startNewWave(width, height);
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

      const pad = 12;
      const gridW = width - pad * 2;
      const gridH = height - pad * 2;
      const cellW = gridW / 3;
      const cellH = gridH / 3;

      // Update Phase State Machine
      state.phaseTimer += dt;

      if (state.phase === 'warning') {
        // Ballistic Reticle Flick Evasion
        // Add small human-like reaction latency before flick starts
        const latency = 0.12;
        if (state.phaseTimer > latency && state.reticle.moveProgress < 1.0) {
          const moveElapsed = state.phaseTimer - latency;
          const progress = Math.min(1.0, moveElapsed / state.reticle.moveDuration);
          state.reticle.moveProgress = progress;

          // Ballistic cubic ease-out
          const ease = 1 - Math.pow(1 - progress, 3);
          state.reticle.x = state.reticle.startX + (state.reticle.targetX - state.reticle.startX) * ease;
          state.reticle.y = state.reticle.startY + (state.reticle.targetY - state.reticle.startY) * ease;
        }

        if (state.phaseTimer >= state.warningDuration) {
          // Transition to explosion!
          state.phase = 'explosion';
          state.phaseTimer = 0;
          state.screenShake = 6; // screen shake intensity
          state.safePulse = 1.0;

          // Spawn explosion spark particles in all danger cells
          state.dangerCells.forEach((cIdx) => {
            const center = getCellCenter(cIdx, pad, pad, cellW, cellH);
            spawnParticles(center.x, center.y, '#ef4444', 14);
          });
        }
      } else if (state.phase === 'explosion') {
        if (state.phaseTimer >= state.explosionDuration) {
          state.phase = 'cooldown';
          state.phaseTimer = 0;
        }
      } else if (state.phase === 'cooldown') {
        if (state.phaseTimer >= state.cooldownDuration) {
          startNewWave(width, height);
        }
      }

      // Update particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
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
        state.screenShake *= 0.86;
      } else {
        state.screenShake = 0;
      }

      // Clear Canvas
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Apply shake
      if (shakeX !== 0 || shakeY !== 0) {
        ctx.translate(shakeX, shakeY);
      }

      // 1. Grid Background & Cells
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const idx = row * 3 + col;
          const x = pad + col * cellW;
          const y = pad + row * cellH;
          const isDanger = state.dangerCells.includes(idx);
          const isSafe = !isDanger;
          const isTargetSafe = idx === state.safeCellIndex;

          // Default cell floor
          ctx.fillStyle = '#0a0a14';
          ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);

          // Danger Cell Rendering
          if (isDanger) {
            if (state.phase === 'warning') {
              // Accelerating warning pulse frequency
              const speedMult = 8 + (state.phaseTimer / state.warningDuration) * 16;
              const pulse = (Math.sin(now * 0.001 * speedMult) + 1) / 2;
              const alpha = 0.12 + pulse * 0.16;

              ctx.fillStyle = `rgba(245, 158, 11, ${alpha})`;
              ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);

              // Inset warning border
              ctx.strokeStyle = `rgba(245, 158, 11, ${0.4 + pulse * 0.5})`;
              ctx.lineWidth = 1.5;
              ctx.strokeRect(x + 4, y + 4, cellW - 8, cellH - 8);

              // Tactical corner brackets in danger cells
              const cornerLen = 6;
              ctx.strokeStyle = '#f59e0b';
              ctx.lineWidth = 2;
              // Top-left
              ctx.beginPath();
              ctx.moveTo(x + 4, y + 4 + cornerLen);
              ctx.lineTo(x + 4, y + 4);
              ctx.lineTo(x + 4 + cornerLen, y + 4);
              ctx.stroke();
              // Bottom-right
              ctx.beginPath();
              ctx.moveTo(x + cellW - 4, y + cellH - 4 - cornerLen);
              ctx.lineTo(x + cellW - 4, y + cellH - 4);
              ctx.lineTo(x + cellW - 4 - cornerLen, y + cellH - 4);
              ctx.stroke();
            } else if (state.phase === 'explosion') {
              // High-intensity explosion fill
              ctx.fillStyle = 'rgba(239, 68, 68, 0.42)';
              ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);

              ctx.strokeStyle = '#ef4444';
              ctx.lineWidth = 2.5;
              ctx.strokeRect(x + 3, y + 3, cellW - 6, cellH - 6);

              // Center burst flare
              const cx = x + cellW / 2;
              const cy = y + cellH / 2;
              const blastGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, cellW * 0.5);
              blastGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
              blastGrad.addColorStop(0.3, 'rgba(239, 68, 68, 0.5)');
              blastGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
              ctx.fillStyle = blastGrad;
              ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);
            }
          } else if (isSafe) {
            // Subtle ambient safe cell tone
            if (state.phase === 'warning') {
              ctx.fillStyle = 'rgba(16, 185, 129, 0.04)';
              ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);
            } else if (state.phase === 'explosion' && isTargetSafe) {
              // Highlighting safe cell with emerald glow during blast
              ctx.fillStyle = 'rgba(16, 185, 129, 0.16)';
              ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);

              ctx.strokeStyle = 'rgba(16, 185, 129, 0.8)';
              ctx.lineWidth = 2;
              ctx.strokeRect(x + 3, y + 3, cellW - 6, cellH - 6);
            }
          }
        }
      }

      // 2. Tactical Grid Divider Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
      ctx.lineWidth = 1.5;
      for (let c = 1; c < 3; c++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(pad + c * cellW, pad);
        ctx.lineTo(pad + c * cellW, pad + gridH);
        ctx.stroke();

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(pad, pad + c * cellH);
        ctx.lineTo(pad + gridW, pad + c * cellH);
        ctx.stroke();
      }

      // Outer Arena Border with subtle corner bevels
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 2;
      ctx.strokeRect(pad, pad, gridW, gridH);

      // 3. Safe Evasion Shield Pulse
      if (state.safePulse > 0.01) {
        state.safePulse = Math.max(0, state.safePulse - dt * 2.2);
        const center = getCellCenter(state.safeCellIndex, pad, pad, cellW, cellH);
        const radius = (1 - state.safePulse) * (cellW * 0.65);

        ctx.save();
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${state.safePulse * 0.85})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // 4. Explosion Spark Particles
      for (let i = 0; i < state.particles.length; i++) {
        const p = state.particles[i];
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // 5. Tactical Crosshair / Reticle
      const rx = state.reticle.x;
      const ry = state.reticle.y;

      const isSafeReticle = !state.dangerCells.includes(
        Math.min(2, Math.floor((ry - pad) / cellH)) * 3 +
        Math.min(2, Math.floor((rx - pad) / cellW))
      );

      const reticleColor = state.phase === 'explosion'
        ? (isSafeReticle ? '#10b981' : '#ef4444')
        : '#14b8a6';

      ctx.save();
      ctx.translate(rx, ry);

      // Reticle Outer Ring with subtle glow
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.strokeStyle = reticleColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = reticleColor;
      ctx.shadowBlur = 6;
      ctx.stroke();

      // Cardinal crosshair ticks with center gap
      ctx.lineWidth = 1.5;
      const gap = 4;
      const tickLen = 12;

      ctx.beginPath();
      // Top
      ctx.moveTo(0, -tickLen); ctx.lineTo(0, -gap);
      // Bottom
      ctx.moveTo(0, tickLen); ctx.lineTo(0, gap);
      // Left
      ctx.moveTo(-tickLen, 0); ctx.lineTo(-gap, 0);
      // Right
      ctx.moveTo(tickLen, 0); ctx.lineTo(gap, 0);
      ctx.stroke();

      // Center laser dot
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 4;
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
