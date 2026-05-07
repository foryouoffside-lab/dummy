import ProSmoothPursuitClient from './ProSmoothPursuitClient';

export const metadata = {
  title: 'Pro Smooth Pursuit - 360Hz Lissajous Tracking & Precision Aim Training',
  description: 'Professional smooth pursuit tracking with Lissajous curve movement at 360Hz refresh rate. Keep cursor on the moving target. +1 point every 0.5s on target. 60-second FPS aim challenge with accuracy and streak tracking.',
  keywords: [
    'pro smooth pursuit', 'Lissajous tracking', 'precision aim trainer',
    '360Hz aim drill', 'professional FPS training', 'smooth pursuit aim',
    'tracking accuracy drill', 'pro level tracking', 'continuous aim training',
    'mouse precision drill', 'FPS aim practice', 'competitive gaming training',
    'free aim trainer', 'high refresh tracking'
  ],
  openGraph: {
    title: 'Pro Smooth Pursuit - 360Hz Lissajous Tracking & Precision Aim',
    description: 'Track a Lissajous curve target at 360Hz refresh rate. +1pt every 0.5s on target. 60-second FPS aim challenge with accuracy, streak bonuses, and precision crosshair.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/pro-smooth-pursuit',
  },
};

export default function ProSmoothPursuitPage() {
  return <ProSmoothPursuitClient />;
}