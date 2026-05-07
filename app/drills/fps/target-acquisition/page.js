import TargetAcquisitionClient from './TargetAcquisitionClient';

export const metadata = {
  title: 'Target Acquisition - Luminance-Based Priority Clicking FPS Drill',
  description: 'Train visual priority processing by clicking targets in brightness order (highest opacity first). 5 targets per set with luminance-based ranking. 90-second FPS challenge with 5 lives, streak bonuses, and adaptive penalty system.',
  keywords: [
    'target acquisition', 'luminance training', 'brightness priority',
    'target acquisition drill', 'visual priority processing', 'FPS target clicking',
    'opacity-based targeting', 'visual discrimination FPS', 'priority aiming',
    'brightness ranking drill', 'target selection training', 'free FPS drill',
    'visual hierarchy drill', 'FPS aim training'
  ],
  openGraph: {
    title: 'Target Acquisition - Luminance Priority FPS Training',
    description: 'Click 5 targets in brightness order (highest opacity first). +1pt per completed set. 90-second challenge with 5 lives, streak bonuses, and penalty system. Train visual priority processing.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/target-acquisition',
  },
};

export default function TargetAcquisitionPage() {
  return <TargetAcquisitionClient />;
}