import { ImageResponse } from 'next/og';

export const alt = 'Pro Smooth Pursuit Trainer — free browser smooth pursuit trainer for Apex Legends and Overwatch 2';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const ACCENT = '#10b981';

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
            background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(5,5,8,0) 70%)',
            display: 'flex',
          }}
        />

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
              color: '#ffffff',
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: '#ffffff', letterSpacing: 2 }}>
            SKILLDRILLS
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#4b5563' }}>/</div>
          <div style={{ display: 'flex', fontSize: 22, color: ACCENT, letterSpacing: 3, fontWeight: 700 }}>
            FPS TRAINING
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 92,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Pro Smooth Pursuit
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
            Improve smooth pursuit aiming, curve trajectory reading, and forearm tracking stability for competitive FPS games.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {['45-SECOND DRILL', '15 DIFFICULTY LEVELS', 'RAW MOUSE INPUT', 'FREE — NO SIGN-UP'].map((label) => (
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
