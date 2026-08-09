// lib/canvasFx.js

/**
 * Get device pixel ratio capped at 2 to avoid huge rendering costs on high-DPI mobile screens.
 */
export function getCanvasDpr() {
  if (typeof window === 'undefined') return 1;
  return Math.min(2, window.devicePixelRatio || 1);
}

export const canvasDpr = getCanvasDpr;

/**
 * Create or update an offscreen canvas cache for static backdrops.
 */
export function createBackdropCache(width, height, drawFn) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  const dpr = getCanvasDpr();
  canvas.width = Math.ceil(width * dpr);
  canvas.height = Math.ceil(height * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.scale(dpr, dpr);
  drawFn(ctx, width, height);
  return canvas;
}

/**
 * Draw the canonical "tactical sphere" target: ghost ring, tactical ring,
 * glowing filled body, highlight sheen, and a bright white core dot.
 * Matches the reaction-speed category's target look (e.g. fps-tracking-trainer),
 * parameterized by color so callers can keep a user-selectable target color.
 */
export function drawTacticalTarget(ctx, x, y, radius, color = '#ef4444', glow = true) {
  ctx.save();

  // Ghost outer ring
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
  ctx.stroke();

  // Tactical outer ring
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Filled body with subtle glow
  ctx.globalAlpha = 0.88;
  ctx.shadowColor = color;
  ctx.shadowBlur = glow ? 14 : 0;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.82, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Highlight sheen
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x - radius * 0.2, y - radius * 0.2, radius * 0.28, 0, Math.PI * 2);
  ctx.fill();

  // Bright white center core
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, Math.max(2.5, radius * 0.18), 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Draw target pulse ring
 */
export function drawPulseRing(ctx, x, y, radius, color = '#3b82f6', progress = 0) {
  if (progress <= 0 || progress >= 1) return;
  const pulseRadius = radius + progress * 20;
  const alpha = (1 - progress) * 0.6;

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}
