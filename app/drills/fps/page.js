import FPSHubClient from './FPSHubClient';

export const metadata = {
  title: 'FPS Aim Training Drills - Free Aim Trainer for Valorant, CS2 & All FPS Games',
  description: '19 free FPS aim training drills across 4 categories: Aim Accuracy, Tracking, Reaction Speed, and Awareness. Improve flick shots, smooth tracking, reflexes, and peripheral vision. No login required.',
  keywords: [
    'FPS aim training', 'aim trainer', 'flick shot practice', 'tracking drills',
    'free aim trainer', 'Valorant aim training', 'CS2 aim practice',
    'FPS reaction speed', 'peripheral awareness FPS', 'target tracking',
    'pro smooth pursuit', 'flick shot training', '360Hz tracking',
    'orbital tracking', 'clinical gray grid', 'headshot trainer',
    'Apex Legends aim', 'Overwatch 2 training', 'free FPS drills'
  ],
  openGraph: {
    title: 'FPS Aim Training - 19 Free Drills for Valorant, CS2 & All FPS Games',
    description: 'Master flick shots, smooth tracking, reaction speed, and peripheral awareness with 19 free FPS aim training drills. No login required. Train for Valorant, CS2, Apex Legends, and all FPS games.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps',
  },
};

export default function FPSHubPage() {
  return <FPSHubClient />;
}