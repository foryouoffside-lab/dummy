import ProTrackingClient from './ProTrackingClient';

export const metadata = {
  title: '360Hz Pro Tracking Drill - Multi-Target Switching & Speed Aim Training',
  description: 'Track a green target among 6 bouncing white decoy balls. Target switches every 1.5s with increasing speed (+10 per switch). 1 second of tracking = +5 points. Red crosshair for visibility. Speed scales infinitely. 60-second FPS challenge.',
  keywords: [
    'pro tracking drill', '360Hz tracking', 'multi target switching',
    'speed aim training', 'target switch practice', 'FPS tracking drill',
    'high speed tracking', 'target acquisition speed', 'adaptive speed tracking',
    'professional aim trainer', 'switching targets FPS', 'free tracking trainer',
    'red crosshair tracking', 'speed scaling aim drill'
  ],
  openGraph: {
    title: '360Hz Pro Tracking Drill - Multi-Target Switching & Speed Training',
    description: '6 balls, 1 green target that switches every 1.5s with increasing speed. +5 points per second of tracking. Red crosshair for contrast. Speed scales infinitely. Professional FPS aim training.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/pro-tracking',
  },
};

export default function ProTrackingPage() {
  return <ProTrackingClient />;
}