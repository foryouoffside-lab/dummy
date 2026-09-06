'use client';

/**
 * components/drill/DrillPreview.js
 * Host component for live, silent drill card previews.
 *
 * Renders an autonomous, non-interactive canvas preview driven by a shared 30fps
 * singleton ticker. CLS = 0 (aspect-16/9 wrapper), pauses offscreen (IntersectionObserver),
 * respects prefers-reduced-motion, and falls back gracefully to permanent floor icon.
 */

import React, { useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { previewTicker } from '@/lib/previewTicker';
import { getDrillPreview } from '@/lib/drillPreviews';
import { getScene } from './previews/scenes';

// stroke drives the scene's marks; dim is the grid it draws them on; glow and
// faint are the two stops of the lit floor painted under every scene.
const ACCENT_COLORS = {
  amber: { stroke: '#f59e0b', dim: 'rgba(245, 158, 11, 0.12)', glow: 'rgba(245, 158, 11, 0.13)', faint: 'rgba(245, 158, 11, 0.04)' },
  red: { stroke: '#ef4444', dim: 'rgba(239, 68, 68, 0.12)', glow: 'rgba(239, 68, 68, 0.13)', faint: 'rgba(239, 68, 68, 0.04)' },
  violet: { stroke: '#8b5cf6', dim: 'rgba(139, 92, 246, 0.12)', glow: 'rgba(139, 92, 246, 0.13)', faint: 'rgba(139, 92, 246, 0.04)' },
  emerald: { stroke: '#10b981', dim: 'rgba(16, 185, 129, 0.12)', glow: 'rgba(16, 185, 129, 0.13)', faint: 'rgba(16, 185, 129, 0.04)' },
  cyan: { stroke: '#06b6d4', dim: 'rgba(6, 182, 212, 0.12)', glow: 'rgba(6, 182, 212, 0.13)', faint: 'rgba(6, 182, 212, 0.04)' },
  fuchsia: { stroke: '#d946ef', dim: 'rgba(217, 70, 239, 0.12)', glow: 'rgba(217, 70, 239, 0.13)', faint: 'rgba(217, 70, 239, 0.04)' },
  rose: { stroke: '#f43f5e', dim: 'rgba(244, 63, 94, 0.12)', glow: 'rgba(244, 63, 94, 0.13)', faint: 'rgba(244, 63, 94, 0.04)' },
  indigo: { stroke: '#6366f1', dim: 'rgba(99, 102, 241, 0.12)', glow: 'rgba(99, 102, 241, 0.13)', faint: 'rgba(99, 102, 241, 0.04)' },
};

function getSeedFromHref(href) {
  if (!href) return 0;
  let hash = 0;
  for (let i = 0; i < href.length; i++) {
    hash = (hash * 31 + href.charCodeAt(i)) | 0;
  }
  return Math.abs(hash % 1000) / 1000;
}

function DrillPreviewComponent({ href, accent = 'amber', icon: Icon, className = '' }) {
  const previewConfig = getDrillPreview(href);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!previewConfig) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const scene = getScene(previewConfig.scene);
    if (!scene) return;

    const seed = getSeedFromHref(href);
    const speed = previewConfig.speed || 1.0;
    const colorPair = ACCENT_COLORS[accent] || ACCENT_COLORS.amber;

    let dpr = 1;
    let cssWidth = 0;
    let cssHeight = 0;
    // Quarter-scale scratch buffer for the bloom pass. Downscale-then-upscale is
    // the cheap bloom: the browser's bilinear filter does the blurring for free,
    // so a lit target costs one extra small drawImage per frame instead of a
    // full-size ctx.filter blur that would not hold 30fps on a phone.
    const bloomCanvas = document.createElement('canvas');
    const bloomCtx = bloomCanvas.getContext('2d');
    const BLOOM_SCALE = 0.25;
    let isVisible = false;
    let isReducedMotion = false;
    let unsubscribeTicker = null;

    // Media query listener for prefers-reduced-motion
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion = mql.matches;

    const handleMotionChange = (e) => {
      isReducedMotion = e.matches;
      updateSubscription();
    };
    if (mql.addEventListener) {
      mql.addEventListener('change', handleMotionChange);
    } else if (mql.addListener) {
      mql.addListener(handleMotionChange);
    }

    // Paint single frame.
    //
    // The scene draw is sandwiched between a lit floor and two post passes
    // (bloom, then vignette). The scenes themselves stay flat 1px vector work —
    // depth is added here once, so all ~40 of them gain it together and none of
    // them has to know about it.
    const paintFrame = (elapsedMs) => {
      if (!ctx || cssWidth <= 0 || cssHeight <= 0) return;

      ctx.save();
      // Scale to logical CSS coordinates
      ctx.scale(dpr, dpr);

      // Floor: near-black base with a soft accent-tinted pool of light behind
      // the action, so the card reads as a lit arena rather than a flat swatch.
      ctx.fillStyle = '#07080d';
      // +1 covers the sub-pixel seam left when canvas.width rounds up off cssWidth * dpr.
      ctx.fillRect(0, 0, cssWidth + 1, cssHeight + 1);
      const glowRadius = Math.max(cssWidth, cssHeight) * 0.72;
      const floor = ctx.createRadialGradient(
        cssWidth * 0.5, cssHeight * 0.44, 0,
        cssWidth * 0.5, cssHeight * 0.44, glowRadius
      );
      floor.addColorStop(0, colorPair.glow);
      floor.addColorStop(0.55, colorPair.faint);
      floor.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = floor;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      scene.draw(ctx, {
        t: elapsedMs * speed,
        w: cssWidth,
        h: cssHeight,
        accent: colorPair.stroke,
        dim: colorPair.dim,
        seed,
      });

      ctx.restore();

      // Bloom: additive halo around everything bright. The floor is dark enough
      // that adding it back to itself is invisible; only the targets light up.
      if (bloomCtx && bloomCanvas.width > 0 && bloomCanvas.height > 0) {
        bloomCtx.clearRect(0, 0, bloomCanvas.width, bloomCanvas.height);
        bloomCtx.drawImage(canvas, 0, 0, bloomCanvas.width, bloomCanvas.height);
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = 0.55;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(bloomCanvas, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      // Vignette: pulls the corners down so the bloom has somewhere to fall off
      // and the card's rounded edge does not glow into the surface behind it.
      ctx.save();
      ctx.scale(dpr, dpr);
      const vignette = ctx.createRadialGradient(
        cssWidth * 0.5, cssHeight * 0.5, Math.min(cssWidth, cssHeight) * 0.25,
        cssWidth * 0.5, cssHeight * 0.5, Math.max(cssWidth, cssHeight) * 0.72
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, cssWidth, cssHeight);
      ctx.restore();
    };

    // Update ticker subscription according to visibility and reduced motion
    const updateSubscription = () => {
      if (isVisible && !isReducedMotion) {
        if (!unsubscribeTicker) {
          unsubscribeTicker = previewTicker.subscribe(paintFrame);
        }
      } else {
        if (unsubscribeTicker) {
          unsubscribeTicker();
          unsubscribeTicker = null;
        }
        // Repaint poster frame at t = 0
        paintFrame(0);
      }
    };

    // ResizeObserver: backing store sized to clientWidth * min(dpr, 2)
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          dpr = Math.min(window.devicePixelRatio || 1, 2);
          cssWidth = width;
          cssHeight = height;
          canvas.width = Math.round(width * dpr);
          canvas.height = Math.round(height * dpr);
          bloomCanvas.width = Math.max(1, Math.round(canvas.width * BLOOM_SCALE));
          bloomCanvas.height = Math.max(1, Math.round(canvas.height * BLOOM_SCALE));
          if (bloomCtx) {
            bloomCtx.imageSmoothingEnabled = true;
            bloomCtx.imageSmoothingQuality = 'high';
          }

          // Paint poster frame on resize
          paintFrame(0);
        }
      }
    });
    resizeObserver.observe(container);

    // IntersectionObserver: >= 25% visible threshold
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
          updateSubscription();
        }
      },
      { threshold: [0, 0.25, 0.5] }
    );
    intersectionObserver.observe(container);

    // Initial poster frame
    paintFrame(0);

    return () => {
      if (unsubscribeTicker) {
        unsubscribeTicker();
        unsubscribeTicker = null;
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleMotionChange);
      } else if (mql.removeListener) {
        mql.removeListener(handleMotionChange);
      }
    };
  }, [href, accent, previewConfig]);

  if (!previewConfig) {
    return null;
  }

  const FallbackIcon = Icon || Play;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      tabIndex={-1}
      className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-surface-2 border border-hairline pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-200 ${className}`}
    >
      {/* Permanent floor under canvas for SSR / No-JS */}
      <div className="absolute inset-0 flex items-center justify-center bg-surface-2/60 pointer-events-none">
        <FallbackIcon className="w-8 h-8 text-ink-3/30" />
      </div>

      {/* 30fps Autonomous Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}

export const DrillPreview = React.memo(DrillPreviewComponent);
export default DrillPreview;
