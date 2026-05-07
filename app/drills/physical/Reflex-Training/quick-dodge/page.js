import QuickDodgeClient from './QuickDodgeClient';

export const metadata = {
  title: 'Quick Dodge Elite - Evasion Reflex & Spatial Awareness Training',
  description: 'Dodge red homing obstacles that track your cursor. +1 point per successful dodge, -5 points on hit. Adaptive speed increases with streaks. Fullscreen mode adds 50% more obstacles for extra challenge.',
  keywords: [
    'quick dodge game', 'evasion reflex training', 'spatial awareness drill',
    'dodge obstacles game', 'cursor evasion practice', 'reflex dodge training',
    'homing obstacle dodger', 'reaction evasion test', 'free dodge game',
    'hand-eye coordination dodge', 'spatial avoidance training', 'reflex challenge',
    'dodge master game', 'obstacle avoidance drill', 'fullscreen dodge challenge'
  ],
  openGraph: {
    title: 'Quick Dodge Elite - Evasion Reflex & Spatial Awareness',
    description: 'Dodge red homing obstacles tracking your cursor. +1 per dodge, -5 on hit. Adaptive speed with streaks. Fullscreen mode for 50% more chaos. 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Reflex-Training/quick-dodge',
  },
};

export default function QuickDodgePage() {
  return <QuickDodgeClient />;
}