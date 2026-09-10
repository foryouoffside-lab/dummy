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
import InstantResponsePreview from '../drill-previews/InstantResponsePreview';
import Awareness180Preview from '../drill-previews/Awareness180Preview';
import FlowStatePreview from '../drill-previews/FlowStatePreview';
import TargetAcquisitionPreview from '../drill-previews/TargetAcquisitionPreview';
import AntiZigzagPreview from '../drill-previews/AntiZigzagPreview';
import FlickShotPreview from '../drill-previews/FlickShotPreview';
import MicroCorrectionPreview from '../drill-previews/MicroCorrectionPreview';
import ProSmoothPursuitPreview from '../drill-previews/ProSmoothPursuitPreview';
import RecoilControlPreview from '../drill-previews/RecoilControlPreview';
import StrafeTrackingPreview from '../drill-previews/StrafeTrackingPreview';
import TargetPrioritizationPreview from '../drill-previews/TargetPrioritizationPreview';
import TargetSwitchingSwarmPreview from '../drill-previews/TargetSwitchingSwarmPreview';
import AngleHoldPreview from '../drill-previews/AngleHoldPreview';
import AntiStrafeJitterPreview from '../drill-previews/AntiStrafeJitterPreview';
import VerticalAirTrackPreview from '../drill-previews/VerticalAirTrackPreview';
import DistractionFighterPreview from '../drill-previews/DistractionFighterPreview';
import ConcentrationGridPreview from '../drill-previews/ConcentrationGridPreview';
import MultiTaskingPreview from '../drill-previews/MultiTaskingPreview';
import ReactionTimePreview from '../drill-previews/ReactionTimePreview';
import RsvpReaderPreview from '../drill-previews/RsvpReaderPreview';
import DividedAttentionPreview from '../drill-previews/DividedAttentionPreview';
import SymbolMatchingPreview from '../drill-previews/SymbolMatchingPreview';
import ConcentrationStaminaPreview from '../drill-previews/ConcentrationStaminaPreview';
import GridMemorizationPreview from '../drill-previews/GridMemorizationPreview';
import ColorSequencePreview from '../drill-previews/ColorSequencePreview';
import DigitSpanPreview from '../drill-previews/DigitSpanPreview';
import WordRecallPreview from '../drill-previews/WordRecallPreview';
import ObjectLocationPreview from '../drill-previews/ObjectLocationPreview';
import PathTracingPreview from '../drill-previews/PathTracingPreview';
import NBackPreview from '../drill-previews/NBackPreview';
import AimTrainerPreview from '../drill-previews/AimTrainerPreview';
import DragAndDropPreview from '../drill-previews/DragAndDropPreview';
import PrecisionFlickShotPreview from '../drill-previews/PrecisionFlickShotPreview';
import FingerSequencingPreview from '../drill-previews/FingerSequencingPreview';
import KeyboardRecognitionPreview from '../drill-previews/KeyboardRecognitionPreview';
import RapidTappingPreview from '../drill-previews/RapidTappingPreview';
import SteadyHandPreview from '../drill-previews/SteadyHandPreview';
import TracingPreview from '../drill-previews/TracingPreview';
import QuickDodgePreview from '../drill-previews/QuickDodgePreview';
import StabilityChallengePreview from '../drill-previews/StabilityChallengePreview';
import ComplexPatternPreview from '../drill-previews/ComplexPatternPreview';
import CrossBodyMovementPreview from '../drill-previews/CrossBodyMovementPreview';
import DynamicGridEvasionPreview from '../drill-previews/DynamicGridEvasionPreview';
import AgilityLadderPreview from '../drill-previews/AgilityLadderPreview';
import JumpSequencePreview from '../drill-previews/JumpSequencePreview';
import SpeedDrillPreview from '../drill-previews/SpeedDrillPreview';
import DropCatchPreview from '../drill-previews/DropCatchPreview';
import PeripheralThreatSweeperPreview from '../drill-previews/PeripheralThreatSweeperPreview';
import ReactionChainPreview from '../drill-previews/ReactionChainPreview';
import MovingTargetPreview from '../drill-previews/MovingTargetPreview';
import DistanceJudgmentPreview from '../drill-previews/DistanceJudgmentPreview';
import GoNoGoPreview from '../drill-previews/GoNoGoPreview';
import LightReactionPreview from '../drill-previews/LightReactionPreview';
import MultipleTargetsPreview from '../drill-previews/MultipleTargetsPreview';
import PursuitTrackerPreview from '../drill-previews/PursuitTrackerPreview';
import EntropicGridPreview from '../drill-previews/EntropicGridPreview';
import RhythmAnomalyPreview from '../drill-previews/RhythmAnomalyPreview';
import VisualSearchPreview from '../drill-previews/VisualSearchPreview';
import ConstantSlowPursuitPreview from '../drill-previews/ConstantSlowPursuitPreview';
import DirectionalChaosPursuitPreview from '../drill-previews/DirectionalChaosPursuitPreview';
import DynamicEvasionPursuitPreview from '../drill-previews/DynamicEvasionPursuitPreview';
import GhostingSuppressPursuitPreview from '../drill-previews/GhostingSuppressPursuitPreview';
import InfinityPursuitPreview from '../drill-previews/InfinityPursuitPreview';
import MomentumTeleportPursuitPreview from '../drill-previews/MomentumTeleportPursuitPreview';
import PeripheralPingPursuitPreview from '../drill-previews/PeripheralPingPursuitPreview';
import PredictivePursuitPreview from '../drill-previews/PredictivePursuitPreview';
import SineWavePursuitPreview from '../drill-previews/SineWavePursuitPreview';
import SpatialShiftPursuitPreview from '../drill-previews/SpatialShiftPursuitPreview';
import SplitScreenTrackingPreview from '../drill-previews/SplitScreenTrackingPreview';
import StaircaseStepPreview from '../drill-previews/StaircaseStepPreview';
import StrobePredictionPursuitPreview from '../drill-previews/StrobePredictionPursuitPreview';
import TriangularPursuitPreview from '../drill-previews/TriangularPursuitPreview';
import ZigZagPathPursuitPreview from '../drill-previews/ZigZagPathPursuitPreview';
import BarrierSequencePursuitPreview from '../drill-previews/BarrierSequencePursuitPreview';
import FPSTrackingTrainerPreview from '../drill-previews/FPSTrackingTrainerPreview';
import MarketDoorsPursuitPreview from '../drill-previews/MarketDoorsPursuitPreview';
import ReactionGamePreview from '../drill-previews/ReactionGamePreview';
import ReactionTimeTestPreview from '../drill-previews/ReactionTimeTestPreview';
import ReflexTrainingDrillPreview from '../drill-previews/ReflexTrainingDrillPreview';
import SaccadicGalleryPreview from '../drill-previews/SaccadicGalleryPreview';
import VisualTrackingSpeedTestPreview from '../drill-previews/VisualTrackingSpeedTestPreview';

const DEDICATED_PREVIEWS = {
  '/drills/fps/instant-response': InstantResponsePreview,
  '/drills/fps/180-degree-awareness': Awareness180Preview,
  '/drills/fps/flow-state': FlowStatePreview,
  '/drills/fps/target-acquisition': TargetAcquisitionPreview,
  '/drills/fps/anti-zigzag-movement-trainer': AntiZigzagPreview,
  '/drills/fps/flick-shot-training': FlickShotPreview,
  '/drills/fps/micro-correction-precision': MicroCorrectionPreview,
  '/drills/fps/pro-smooth-pursuit': ProSmoothPursuitPreview,
  '/drills/fps/recoil-control': RecoilControlPreview,
  '/drills/fps/strafe-tracking': StrafeTrackingPreview,
  '/drills/fps/target-prioritization': TargetPrioritizationPreview,
  '/drills/fps/target-switching-swarm': TargetSwitchingSwarmPreview,
  '/drills/fps/angle-hold-trainer': AngleHoldPreview,
  '/drills/fps/anti-strafe-jitter-duel': AntiStrafeJitterPreview,
  '/drills/fps/vertical-air-track': VerticalAirTrackPreview,

  // Cognitive Drills
  '/drills/cognitive/focus/distraction-fighter': DistractionFighterPreview,
  '/drills/cognitive/focus/concentration-grid': ConcentrationGridPreview,
  '/drills/cognitive/attention/multi-tasking': MultiTaskingPreview,
  '/drills/cognitive/processing-speed/reaction-time': ReactionTimePreview,
  '/drills/cognitive/processing-speed/rsvp-reader': RsvpReaderPreview,
  '/drills/cognitive/attention/divided-attention': DividedAttentionPreview,
  '/drills/cognitive/processing-speed/symbol-matching': SymbolMatchingPreview,
  '/drills/cognitive/attention/concentration-stamina': ConcentrationStaminaPreview,

  // Memory Drills
  '/drills/memory/spatial-memory/grid-memorization': GridMemorizationPreview,
  '/drills/memory/short-term-memory/color-sequence': ColorSequencePreview,
  '/drills/memory/short-term-memory/digit-span': DigitSpanPreview,
  '/drills/memory/short-term-memory/word-recall': WordRecallPreview,
  '/drills/memory/spatial-memory/object-location': ObjectLocationPreview,
  '/drills/memory/spatial-memory/path-tracing': PathTracingPreview,
  '/drills/memory/working-memory/n-back': NBackPreview,

  // Motor Drills
  '/drills/motor/hand-eye-coordination/aim-trainer': AimTrainerPreview,
  '/drills/motor/hand-eye-coordination/drag-and-drop': DragAndDropPreview,
  '/drills/motor/hand-eye-coordination/precision-flick-shot': PrecisionFlickShotPreview,
  '/drills/motor/movement-speed/finger-sequencing': FingerSequencingPreview,
  '/drills/motor/movement-speed/keyboard-recognition': KeyboardRecognitionPreview,
  '/drills/motor/movement-speed/rapid-tapping': RapidTappingPreview,
  '/drills/motor/precision-control/steady-hand': SteadyHandPreview,
  '/drills/motor/precision-control/tracing': TracingPreview,

  // Physical Drills
  '/drills/physical/balance-training/stability-challenge': StabilityChallengePreview,
  '/drills/physical/coordination/complex-pattern': ComplexPatternPreview,
  '/drills/physical/coordination/cross-body-movement': CrossBodyMovementPreview,
  '/drills/physical/coordination/dynamic-grid-evasion': DynamicGridEvasionPreview,
  '/drills/physical/fitness/agility-ladder': AgilityLadderPreview,
  '/drills/physical/fitness/jump-sequence': JumpSequencePreview,
  '/drills/physical/fitness/speed-drill': SpeedDrillPreview,
  '/drills/physical/reflex-training/drop-catch': DropCatchPreview,
  '/drills/physical/reflex-training/peripheral-threat-sweeper': PeripheralThreatSweeperPreview,
  '/drills/physical/reflex-training/quick-dodge': QuickDodgePreview,
  '/drills/physical/reflex-training/reaction-chain': ReactionChainPreview,

  // Visual Drills
  '/drills/visual/depth-perception/distance-judgment': DistanceJudgmentPreview,
  '/drills/visual/reaction-speed/go/no-go': GoNoGoPreview,
  '/drills/visual/reaction-speed/light-reaction': LightReactionPreview,
  '/drills/visual/tracking-accuracy/moving-target': MovingTargetPreview,
  '/drills/visual/tracking-accuracy/multiple-targets': MultipleTargetsPreview,
  '/drills/visual/tracking-accuracy/pursuit-tracker': PursuitTrackerPreview,
  '/drills/visual/visual-recognition/entropic-grid': EntropicGridPreview,
  '/drills/visual/visual-recognition/rhythm-anomaly': RhythmAnomalyPreview,
  '/drills/visual/visual-recognition/visual-search': VisualSearchPreview,

  // Visual Tracking Drills
  '/drills/visual-tracking/constant-slow-pursuit': ConstantSlowPursuitPreview,
  '/drills/visual-tracking/directional-chaos-pursuit': DirectionalChaosPursuitPreview,
  '/drills/visual-tracking/dynamic-evasion-pursuit': DynamicEvasionPursuitPreview,
  '/drills/visual-tracking/ghosting-suppress-pursuit': GhostingSuppressPursuitPreview,
  '/drills/visual-tracking/infinity-pursuit': InfinityPursuitPreview,
  '/drills/visual-tracking/momentum-teleport-pursuit': MomentumTeleportPursuitPreview,
  '/drills/visual-tracking/peripheral-ping-pursuit': PeripheralPingPursuitPreview,
  '/drills/visual-tracking/predictive-pursuit': PredictivePursuitPreview,
  '/drills/visual-tracking/sine-wave-pursuit': SineWavePursuitPreview,
  '/drills/visual-tracking/spatial-shift-pursuit': SpatialShiftPursuitPreview,
  '/drills/visual-tracking/split-screen-tracking': SplitScreenTrackingPreview,
  '/drills/visual-tracking/staircase-step': StaircaseStepPreview,
  '/drills/visual-tracking/strobe-prediction-pursuit': StrobePredictionPursuitPreview,
  '/drills/visual-tracking/triangular-pursuit': TriangularPursuitPreview,
  '/drills/visual-tracking/zig-zag-path-pursuit': ZigZagPathPursuitPreview,

  // Reaction Speed Drills
  '/drills/reaction-speed/barrier-sequence-pursuit': BarrierSequencePursuitPreview,
  '/drills/reaction-speed/fps-tracking-trainer': FPSTrackingTrainerPreview,
  '/drills/reaction-speed/market-doors-pursuit': MarketDoorsPursuitPreview,
  '/drills/reaction-speed/reaction-game': ReactionGamePreview,
  '/drills/reaction-speed/reaction-time-test': ReactionTimeTestPreview,
  '/drills/reaction-speed/reflex-training-drill': ReflexTrainingDrillPreview,
  '/drills/reaction-speed/saccadic-gallery': SaccadicGalleryPreview,
  '/drills/reaction-speed/visual-tracking-speed-test': VisualTrackingSpeedTestPreview,
};

// stroke drives the scene's marks; dim is the grid it draws them on; glow and
// faint are the two stops of the lit floor painted under every scene.
const ACCENT_COLORS = {
  purple: { stroke: '#a855f7', dim: 'rgba(168, 85, 247, 0.12)', glow: 'rgba(168, 85, 247, 0.13)', faint: 'rgba(168, 85, 247, 0.04)' },
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

function DrillPreviewComponent({ href, accent = 'amber', icon: Icon, className = '', showcase = false }) {
  const previewConfig = getDrillPreview(href);
  const DedicatedPreview = DEDICATED_PREVIEWS[href];
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const wrapperClass = `relative w-full aspect-[16/9] overflow-hidden ring-1 ring-inset ring-white/[0.04] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-200 ${
    showcase ? 'rounded-t-2xl bg-black' : 'rounded-xl bg-surface-2 border border-hairline'
  } ${className}`;

  useEffect(() => {
    if (!previewConfig || DedicatedPreview) return;
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
  }, [href, accent, previewConfig, DedicatedPreview]);

  if (DedicatedPreview) {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        tabIndex={-1}
        className={wrapperClass}
      >
        <DedicatedPreview />
      </div>
    );
  }

  if (!previewConfig) {
    return null;
  }

  const FallbackIcon = Icon || Play;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      tabIndex={-1}
      className={wrapperClass}
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
