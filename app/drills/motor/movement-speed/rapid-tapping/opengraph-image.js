import { ImageResponse } from 'next/og';

export const alt = 'Click Speed Test (CPS Test) — free online rapid tapping and finger speed trainer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const ACCENT = '#d946ef';

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
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(217,70,239,0.22) 0%, rgba(5,5,8,0) 70%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', zIndex: 10 }}>
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
              MOTOR SKILLS
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontSize: 88,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.05,
                letterSpacing: -2,
              }}
            >
              Click Speed Test
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                fontSize: 32,
                color: '#9ca3af',
                lineHeight: 1.35,
                maxWidth: 940,
              }}
            >
              Test and maximize your Clicks Per Second (CPS). Practice jitter clicking,
              butterfly clicking, and finger tapping endurance online.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {['CPS TEST ONLINE', 'ENDLESS SURVIVAL', 'JITTER & BUTTERFLY', 'FREE — NO SIGN-UP'].map((label) => (
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
      </div>
    ),
    { ...size }
  );
}
