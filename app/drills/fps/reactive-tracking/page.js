import ReactiveTrackingClient from './ReactiveTrackingClient';

export const metadata = {
  title: 'Reactive Tracking Drill - Single Ball Smooth Aim & Prediction Training',
  description: 'Track a single bouncing ball with directional arrows and adaptive crosshair. +1 point per 350ms of 60%+ tracking accuracy. Jitter movement adds unpredictability. Green ring shows tracking lock-on. No penalties - pure positive tracking practice.',
  keywords: [
    'reactive tracking', 'single ball tracking', 'smooth aim training',
    'bouncing ball aim', 'tracking prediction drill', 'FPS tracking practice',
    'adaptive crosshair tracking', 'jitter movement aim', 'mouse tracking drill',
    'smooth tracking FPS', 'directional arrow tracking', 'free tracking trainer',
    'tracking lock-on indicator', 'reactive aim practice'
  ],
  openGraph: {
    title: 'Reactive Tracking Drill - Single Ball Smooth Aim Training',
    description: 'Track a bouncing ball with unpredictable jitter movement. Directional arrow shows velocity. Green ring and crosshair indicate tracking lock-on. +1pt per 350ms above 60% accuracy. No penalties.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/reactive-tracking',
  },
};

export default function ReactiveTrackingPage() {
  return <ReactiveTrackingClient />;
}