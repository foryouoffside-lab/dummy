'use client';

// Path Tracing — animated card preview.
// 3×3 grid matrix showcasing path demonstration and numbered sequential recall.
// Timeline:
//   1. Demonstration: Amber trail flashes sequentially across nodes (0 -> 4 -> 6 -> 7).
//   2. Drawing Recall: Progress dots illuminate as user retraces nodes 1, 2, 3, 4.
//   3. Success: All 4 path nodes pulse in unison with emerald confirmation.
// Pure CSS (see `.pt-prev*` in styles/globals.css).

const PATH_NODES = [
  { index: 0, step: 1 },
  { index: 4, step: 2 },
  { index: 6, step: 3 },
  { index: 7, step: 4 },
];

export default function PathTracingPreview() {
  return (
    <div className="pt-prev" aria-hidden="true">
      {/* 4 Step Progress Dots */}
      <div className="pt-prev-dots">
        {PATH_NODES.map((n) => (
          <span key={n.step} className={`pt-dot pt-dot-${n.step}`} />
        ))}
      </div>

      {/* 3x3 Grid of Nodes */}
      <div className="pt-prev-grid">
        {Array.from({ length: 9 }).map((_, i) => {
          const match = PATH_NODES.find((n) => n.index === i);
          const isPath = !!match;

          return (
            <div
              key={i}
              className={`pt-cell ${isPath ? `pt-cell-path pt-step-${match.step}` : 'pt-cell-idle'}`}
            >
              {isPath && (
                <span className={`pt-step-num pt-num-${match.step}`}>
                  {match.step}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
