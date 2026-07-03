import FPSHubClient from './FPSHubClient';

export const metadata = {
  title: 'Free FPS Aim Trainer - Best Online Aim Training Hub | SkillDrills',
  description: 'Free FPS aim trainer hub. 12 professional aim training drills — flick shots, tracking aim, recoil control, reaction time, strafe tracking, and more. Valorant, CS2, Apex compatible. No sign-up.',
  keywords: [
    'free fps aim trainer', 'fps aim trainer online', 'best aim trainer',
    'aim trainer online', 'free aim trainer', 'aim training online',
    'fps training online', 'free fps training', 'fps aim training',
    'Valorant aim trainer', 'CS2 aim training', 'Apex Legends aim trainer',
    'Overwatch aim training', 'Rainbow Six aim trainer', 'Fortnite aim practice',
    'flick shot training', 'tracking aim trainer', 'recoil control training',
    'reaction time test fps', 'strafe tracking aim', 'crosshair placement training',
    'target switching aim', 'target acquisition training', 'vertical tracking aim',
    '180 degree awareness', 'mouse accuracy test', 'aim training game',
    'esports aim training', 'competitive fps training', 'pro aim training',
    'raw mouse input aim', 'pointer lock aim trainer', 'fps sensitivity training',
    'gaming aim practice', 'mouse precision fps', 'aim improvement game',
    'skilldrills fps', 'skilldrills aim trainer', 'free online aim practice',
    'no download aim trainer', 'browser aim trainer', 'instant aim training',
    '12 fps drills', 'professional aim training', 'comprehensive aim trainer',
  ],
  openGraph: {
    title: 'Free FPS Aim Trainer - Best Online Aim Training Hub | SkillDrills',
    description: 'Free FPS aim trainer hub. 12 professional aim training drills — flick shots, tracking, recoil control, reaction time. Valorant, CS2, Apex. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free FPS Aim Trainer - Online Aim Training Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free FPS Aim Trainer - Best Online Aim Training Hub | SkillDrills',
    description: 'Free FPS aim trainer. 12 professional drills — flick shots, tracking, recoil control, reaction time. Valorant, CS2, Apex. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/fps' },
};

export default function FPSHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free FPS Aim Trainer - Best Online Aim Training Hub",
        "url": "https://skilldrills.online/drills/fps",
        "description": "Free FPS aim trainer hub with 12 professional aim training drills. Flick shots, tracking aim, recoil control, reaction time tests, strafe tracking, crosshair placement, target acquisition, and more. Valorant, CS2, Apex Legends compatible. No sign-up required.",
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": [
          { "@type": "WebApplication", "name": "FPS Aim Training - 180 Degree Awareness", "url": "https://skilldrills.online/drills/fps/180-degree-awareness" },
          { "@type": "WebApplication", "name": "Crosshair Placement Training - Angle Hold Drill", "url": "https://skilldrills.online/drills/fps/angle-hold-trainer" },
          { "@type": "WebApplication", "name": "Flick Shot Training - FPS Aim Trainer", "url": "https://skilldrills.online/drills/fps/flick-shot-training" },
          { "@type": "WebApplication", "name": "Reaction Time Test FPS - Raw Reflex Drill", "url": "https://skilldrills.online/drills/fps/instant-response" },
          { "@type": "WebApplication", "name": "Tracking Aim Trainer - Smooth Pursuit Drill", "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit" },
          { "@type": "WebApplication", "name": "Anti-Zigzag Movement Trainer - FPS Aim Training", "url": "https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer" },
          { "@type": "WebApplication", "name": "Recoil Control Training - CS2 & Valorant Spray", "url": "https://skilldrills.online/drills/fps/recoil-control" },
          { "@type": "WebApplication", "name": "Strafe Tracking Aim - Movement Tracking Drill", "url": "https://skilldrills.online/drills/fps/strafe-tracking" },
          { "@type": "WebApplication", "name": "Target Acquisition Training - Priority Aim Drill", "url": "https://skilldrills.online/drills/fps/target-acquisition" },
          { "@type": "WebApplication", "name": "Target Prioritization Game - Swarm Focus Drill", "url": "https://skilldrills.online/drills/fps/target-prioritization" },
          { "@type": "WebApplication", "name": "Target Switching Aim - Multi-Target Speed Drill", "url": "https://skilldrills.online/drills/fps/target-switching-swarm" },
          { "@type": "WebApplication", "name": "Vertical Tracking Aim - Air Target Training", "url": "https://skilldrills.online/drills/fps/vertical-air-track" }
        ]
      })}} />
      <FPSHubClient />
    </>
  );
}