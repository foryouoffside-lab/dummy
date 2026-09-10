'use client';

// Multi-Tasking (Dual Target Flow) — animated card preview.
// The drill's own board: two lanes either side of the violet seam, glyphs
// streaming outward from it, and one target in each lane getting tapped:
//   • left lane hunts ★, right lane hunts ● — the drill's two-target rule
//   • a tapped target flashes blue-400 with its glow, scales up and is gone
//   • everything else just flies out past the edge and expires

const FLIGHTS = [
  { cls: 'dt-prev-l1', glyph: '▲' },
  { cls: 'dt-prev-r1', glyph: '◆' },
  { cls: 'dt-prev-l2', glyph: '★', hit: true },
  { cls: 'dt-prev-r2', glyph: '●', hit: true },
  { cls: 'dt-prev-l3', glyph: '■' },
  { cls: 'dt-prev-r3', glyph: '▲' },
  { cls: 'dt-prev-l4', glyph: '◆' },
  { cls: 'dt-prev-r4', glyph: '■' },
];

export default function MultiTaskingPreview() {
  return (
    <div className="dt-prev" aria-hidden="true">
      <span className="dt-prev-seam" />
      {FLIGHTS.map(f => (
        <span key={f.cls} className={`dt-prev-fly ${f.cls}`}>
          <i className={f.hit ? 'dt-prev-g dt-prev-hit' : 'dt-prev-g'}>{f.glyph}</i>
        </span>
      ))}
    </div>
  );
}
