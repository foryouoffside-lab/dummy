import ReactionDrillClient from './ReactionDrillClient';

export const metadata = {
  title: '240FPS Reaction Drill - Click Timing & Reflex Training for FPS Gaming',
  description: 'Train your click timing and reflex speed with a 200ms flash window. 5 lives system with penalty scoring. Track reaction time in milliseconds, combo streaks, and accuracy. 60-second FPS reflex challenge.',
  keywords: [
    '240fps reaction', 'click timing test', 'FPS reflex training', 'reaction time drill',
    'click reflex test', 'gaming reaction speed', '200ms reaction window',
    'reflex training FPS', 'aim reaction drill', 'click speed test',
    'reaction time training', 'FPS click drill', 'free reaction test',
    'gaming reflexes practice'
  ],
  openGraph: {
    title: '240FPS Reaction Drill - FPS Click Timing & Reflex Training',
    description: 'Target flashes white for 200ms - click during the window. 5 lives system, combo streaks, and millisecond reaction tracking. Essential FPS reflex training.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/240fps-click-test',
  },
};

export default function ReactionDrillPage() {
  return <ReactionDrillClient />;
}