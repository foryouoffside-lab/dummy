import MultiTargetTrackingClient from './MultiTargetTrackingClient';

export const metadata = {
  title: 'Ghost-Link Multi-Target Tracking - Visual Memory & Object Tracking Drill',
  description: 'Memorize 3 green targets, then track all 9 bouncing balls for 60 seconds. Identify your original targets for +5 points each (max 15). Tests visual working memory and multi-object tracking essential for FPS gaming.',
  keywords: [
    'multi target tracking', 'ghost link tracking', 'visual memory drill',
    'object tracking FPS', 'multi object tracking', 'visual working memory',
    'target memorization drill', 'FPS awareness training', 'tracking memory test',
    'multiple ball tracking', 'visual cognition drill', 'free tracking trainer',
    'MOT task FPS', 'spatial memory training'
  ],
  openGraph: {
    title: 'Ghost-Link Multi-Target Tracking - Visual Memory & Object Tracking',
    description: 'Memorize 3 green targets from 9 bouncing balls. Track them for 60 seconds, then identify your targets. +5 points per correct ball (max 15). Tests FPS multi-target awareness.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/multi-target-tracking',
  },
};

export default function MultiTargetTrackingPage() {
  return <MultiTargetTrackingClient />;
}