'use client';

// Renders the flashes produced by lib/useDrillFlash.js. Drop this once inside
// the drill's game-stage container, anywhere above the gameplay layer.
export default function DrillFlashOverlay({ flashes }) {
  return flashes.map((f) => (
    <div key={f.id} className={`fx-flash fx-flash-${f.variant || 'red'}`} />
  ));
}
