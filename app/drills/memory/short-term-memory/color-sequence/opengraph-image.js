import { ImageResponse } from 'next/og';

// Next.js App Router file convention: this generates the og:image at build time
// and injects og:image / og:image:width / og:image:height / twitter:image
// automatically. Nothing to design, nothing to keep in sync, and the dimensions
// are guaranteed correct.
//
// Satori (the renderer behind ImageResponse) supports FLEXBOX ONLY — no CSS grid,
// and every element with more than one child needs an explicit `display: flex`.

export const alt = 'Color Sequence — free browser Memory Training drill on SkillDrills';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const ACCENT = '#6366f1'; // memory category accent

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#050508',
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(5,5,8,0) 70%)',
            display: 'flex',
          }}
        />

        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: ACCENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 900,
              color: '#050508',
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: '#ffffff', letterSpacing: 2 }}>
            SKILLDRILLS
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#4b5563' }}>/</div>
          <div style={{ display: 'flex', fontSize: 22, color: ACCENT, letterSpacing: 3, fontWeight: 700 }}>
            MEMORY TRAINING
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {"Color Sequence"}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 30,
              color: '#9ca3af',
              lineHeight: 1.35,
              maxWidth: 980,
            }}
          >
            {"Watch and reproduce color patterns in correct order"}
          </div>
        </div>

        {/* Stat strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {['45S DRILL', 'EASY', 'MEMORY TRAINING', 'FREE — NO SIGN-UP'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                padding: '12px 22px',
                borderRadius: 9999,
                border: '1px solid rgba(255,255,255,0.10)',
                background: 'rgba(255,255,255,0.03)',
                fontSize: 20,
                fontWeight: 700,
                color: '#d1d5db',
                letterSpacing: 1,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
