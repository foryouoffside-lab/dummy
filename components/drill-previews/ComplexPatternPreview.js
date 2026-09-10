'use client';

import React, { useRef, useEffect } from 'react';

/**
 * ComplexPatternPreview
 * Authentic HTML5 <canvas> simulation of Complex Pattern (Physical Coordination & Memory Tracing).
 * Matches ComplexPatternClient.js:
 *
 * Simulates:
 * - Deep tactical #050508 arena with coordinate grid.
 * - Multi-phase spatial memory reconstruction:
 *   1. MEMORIZE (1.4s): Geometric multi-waypoint blueprint path illuminated in vivid purple (#a855f7),
 *      anchored by a cyan start node (#06b6d4) and pink end node (#ec4899).
 *   2. DRAW (2.0s): Blueprint vanishes; only start/end hints pulse. Crosshair sweeps along the memorized
 *      trajectory drawing a fluid amber/gold trail (#eab308).
 *   3. RESULT (1.2s): Original blueprint re-illuminates in solid emerald (#10b981), nodes emit shockwave
 *      rings and spark particles confirming successful pattern reconstruction.
 * - Autonomous regeneration cycle with randomized geometric waypoint positions.
 * - Zero in-preview title pills/badges/text overlays.
 * - Guaranteed first-frame draw + HiDPI scaling + ResizeObserver + IntersectionObserver auto-pause.
 */
export default function ComplexPatternPreview() {
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

    // Waypoint pattern definitions (normalized coordinates 0..1)
    const patterns = [
      [
        { x: 0.18, y: 0.72, type: 'start' },
        { x: 0.32, y: 0.26, type: 'mid' },
        { x: 0.68, y: 0.22, type: 'mid' },
        { x: 0.82, y: 0.68, type: 'mid' },
        { x: 0.50, y: 0.84, type: 'end' },
      ],
      [
        { x: 0.20, y: 0.30, type: 'start' },
        { x: 0.50, y: 0.18, type: 'mid' },
        { x: 0.80, y: 0.35, type: 'mid' },
        { x: 0.65, y: 0.80, type: 'mid' },
        { x: 0.35, y: 0.75, type: 'end' },
      ],
      [
        { x: 0.16, y: 0.50, type: 'start' },
        { x: 0.40, y: 0.22, type: 'mid' },
        { x: 0.78, y: 0.30, type: 'mid' },
        { x: 0.48, y: 0.78, type: 'mid' },
        { x: 0.84, y: 0.72, type: 'end' },
      ],
    ];

    let patternIndex = 0;
    let phase = 'memorize'; // 'memorize' | 'draw' | 'result'
    let phaseTimer = 0;

    let userDrawing = [];
    let crosshair = { x: 50, y: 50 };
    let shockwaves = [];
    let particles = [];

    const drawTacticalSphere = (cx, cy, r, color, glow) => {
      ctx.save();
      // Outer tactical ring
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Filled body with glow
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;
      if (glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
      }
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.75, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Specular highlight
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(cx - r * 0.22, cy - r * 0.22, r * 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Center core pip
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const triggerCompletion = (nodes) => {
      nodes.forEach((n) => {
        shockwaves.push({ x: n.px, y: n.py, r: 10, maxR: 36, alpha: 1.0, color: '#10b981' });
        for (let i = 0; i < 4; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = 25 + Math.random() * 35;
          particles.push({
            x: n.px,
            y: n.py,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            alpha: 1.0,
            decay: 2.2,
          });
        }
      });
    };

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!width || !height) return;

      // Map current pattern normalized nodes to absolute pixels
      const rawNodes = patterns[patternIndex % patterns.length];
      const nodes = rawNodes.map((n) => ({
        ...n,
        px: n.x * width,
        py: n.y * height,
      }));

      // Deep tactical background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Coordinate grid
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 26;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      if (!prefersReducedMotion) {
        phaseTimer += dt;

        if (phase === 'memorize') {
          userDrawing = [];
          crosshair.x = nodes[0].px;
          crosshair.y = nodes[0].py;

          if (phaseTimer >= 1.4) {
            phase = 'draw';
            phaseTimer = 0;
            userDrawing = [{ x: nodes[0].px, y: nodes[0].py }];
          }
        } else if (phase === 'draw') {
          // Crosshair sweeps along waypoints from 0 to N-1
          const drawDuration = 1.9;
          const progress = Math.min(1, phaseTimer / drawDuration);
          const totalSegments = nodes.length - 1;
          const currentSegment = Math.min(totalSegments - 1, Math.floor(progress * totalSegments));
          const segT = (progress * totalSegments) - currentSegment;

          const p1 = nodes[currentSegment];
          const p2 = nodes[currentSegment + 1];

          crosshair.x = p1.px + (p2.px - p1.px) * segT;
          crosshair.y = p1.py + (p2.py - p1.py) * segT;

          userDrawing.push({ x: crosshair.x, y: crosshair.y });

          if (progress >= 1) {
            phase = 'result';
            phaseTimer = 0;
            triggerCompletion(nodes);
          }
        } else if (phase === 'result') {
          if (phaseTimer >= 1.2) {
            // Next pattern
            patternIndex++;
            phase = 'memorize';
            phaseTimer = 0;
            userDrawing = [];
          }
        }

        // Update shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const s = shockwaves[i];
          s.r += (s.maxR - s.r) * Math.min(1, dt * 8);
          s.alpha -= dt * 1.8;
          if (s.alpha <= 0) shockwaves.splice(i, 1);
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= dt * p.decay;
          if (p.alpha <= 0) particles.splice(i, 1);
        }
      }

      // --- RENDER BLUEPRINT GEOMETRY (Memorize & Result phases) ---
      if (phase === 'memorize' || phase === 'result') {
        const isCompleted = phase === 'result';
        const lineColor = isCompleted ? 'rgba(16, 185, 129, 0.85)' : 'rgba(168, 85, 247, 0.75)';

        // Connecting blueprint path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(nodes[0].px, nodes[0].py);
        for (let i = 1; i < nodes.length; i++) {
          ctx.lineTo(nodes[i].px, nodes[i].py);
        }
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Subtle dashed guide
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // Render all nodes
        nodes.forEach((node) => {
          let nodeColor = isCompleted ? '#10b981' : '#a855f7';
          if (!isCompleted && node.type === 'start') nodeColor = '#06b6d4';
          if (!isCompleted && node.type === 'end') nodeColor = '#ec4899';

          const radius = node.type === 'start' || node.type === 'end' ? 12 : 8;
          drawTacticalSphere(node.px, node.py, radius, nodeColor, true);
        });
      }

      // --- RENDER START & END HINTS DURING DRAW PHASE ---
      if (phase === 'draw') {
        const startNode = nodes[0];
        const endNode = nodes[nodes.length - 1];

        // Cyan Start Node
        ctx.save();
        ctx.beginPath();
        ctx.arc(startNode.px, startNode.py, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
        drawTacticalSphere(startNode.px, startNode.py, 12, '#06b6d4', true);

        // Pink End Node
        ctx.save();
        ctx.beginPath();
        ctx.arc(endNode.px, endNode.py, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
        drawTacticalSphere(endNode.px, endNode.py, 12, '#ec4899', true);
      }

      // --- RENDER USER DRAWN TRAIL ---
      if (userDrawing.length > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(userDrawing[0].x, userDrawing[0].y);
        for (let i = 1; i < userDrawing.length; i++) {
          ctx.lineTo(userDrawing[i].x, userDrawing[i].y);
        }
        ctx.strokeStyle = phase === 'result' ? '#10b981' : '#eab308';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = phase === 'result' ? '#10b981' : '#eab308';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      }

      // --- RENDER SHOCKWAVES ---
      for (const s of shockwaves) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.lineWidth = 2;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      }

      // --- RENDER PARTICLES ---
      for (const p of particles) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.restore();
      }

      // --- RENDER PURSUIT / DRAWING CROSSHAIR ---
      if (phase === 'draw') {
        ctx.save();
        ctx.translate(crosshair.x, crosshair.y);

        const chColor = '#eab308';
        ctx.strokeStyle = chColor;
        ctx.fillStyle = chColor;

        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, 13, 0, Math.PI * 2);
        ctx.stroke();

        const gap = 4;
        const r = 13;
        ctx.beginPath();
        ctx.moveTo(0, -r); ctx.lineTo(0, -gap);
        ctx.moveTo(0, r); ctx.lineTo(0, gap);
        ctx.moveTo(-r, 0); ctx.lineTo(-gap, 0);
        ctx.moveTo(r, 0); ctx.lineTo(gap, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
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

