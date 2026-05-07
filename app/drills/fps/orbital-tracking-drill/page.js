import OrbitalTrackingClient from './OrbitalTrackingClient';

export const metadata = {
  title: 'Orbital Tracking Drill - Dynamic Orbit Target Following & FPS Aim Training',
  description: 'Track a target orbiting in dynamically changing circular paths. +1 point for 60%+ tracking accuracy, +2 bonus for direct cursor-on-target hits. Speed and radius adapt with combos. No penalties - pure positive training.',
  keywords: [
    'orbital tracking drill', 'orbit target tracking', 'circular aim training',
    'dynamic orbit aim', 'FPS tracking practice', 'orbital aim trainer',
    'circle tracking drill', 'adaptive radius tracking', 'smooth tracking FPS',
    'orbital movement aim', 'target orbit practice', 'free tracking trainer',
    'dynamic path tracking', 'orbital FPS drill'
  ],
  openGraph: {
    title: 'Orbital Tracking Drill - Dynamic Orbit Target Following',
    description: 'Target orbits center with changing radius (100-300px) and speed. +1pt for 60%+ accuracy, +2pt direct hits. Speed increases 40% with combos. No penalties.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/orbital-tracking-drill',
  },
};

export default function OrbitalTrackingPage() {
  return <OrbitalTrackingClient />;
}