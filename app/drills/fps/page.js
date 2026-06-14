import FPSHubClient from './FPSHubClient';

export const metadata = {
  title: 'FPS Aim Training - 28 Esports Drills | SkillDrills',
  description: '28 professional FPS aim training drills across 4 categories: Precision Clicking, Tracking & Switching, Movement & Recoil, and Reflex & Awareness. Improve flick shots, tracking, and reaction times.',
  keywords: [
    'FPS aim training', 'aim trainer', 'flick shot practice', 'tracking drills',
    'free aim trainer', 'Valorant aim training', 'CS2 aim practice',
    'FPS reaction speed', 'peripheral awareness FPS', 'target tracking',
    'pro smooth pursuit', 'flick shot training', '360Hz tracking',
    'orbital tracking', 'clinical gray grid', 'headshot trainer',
    'Apex Legends aim', 'Overwatch 2 training', 'free FPS drills',
    'target acquisition', 'predictive tracking', 'anchor flick',
    'instant response', 'map prediction', 'neural tracker',
    'multi-target tracking', '180 degree awareness', 'reactive strafe',
    '240fps reaction', 'high-speed kinetic', 'single target track',
    'skilldrills FPS', 'skilldrills aim trainer',
  ],
  openGraph: {
    title: 'FPS Aim Training - 28 Esports Drills | SkillDrills',
    description: '28 professional FPS aim training drills across 4 categories: Precision Clicking, Tracking & Switching, Movement & Recoil, and Reflex & Awareness. Improve flick shots, tracking, and reaction times.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'FPS Aim Training Drills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FPS Aim Training - 28 Esports Drills | SkillDrills',
    description: '28 professional FPS aim training drills across 4 categories: Precision Clicking, Tracking & Switching, Movement & Recoil, and Reflex & Awareness. Improve flick shots, tracking, and reaction times.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps',
  },
};

export default function FPSHubPage() {
  return (
    <>
      
      <FPSHubClient />
    </>
  );
}