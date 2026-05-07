import DropCatchClient from './DropCatchClient';

export const metadata = {
  title: 'Reflex Drop Catch - Reaction Speed & Visual Discrimination Training',
  description: 'Catch falling green balls (+1pt) while avoiding red decoy balls. 3-life protection system with adaptive speed. 60-second reflex challenge testing reaction time and visual discrimination.',
  keywords: [
    'reflex drop catch', 'reaction speed game', 'visual discrimination training',
    'falling ball catch', 'reflex training drill', 'click reaction game',
    'drop catch practice', 'reflex test online', 'free reaction game',
    'hand-eye coordination catch', 'speed reflex drill', 'visual processing game',
    'catch the ball game', 'reaction time improvement', 'reflex challenge'
  ],
  openGraph: {
    title: 'Reflex Drop Catch - Reaction Speed & Visual Discrimination',
    description: 'Catch green falling balls (+1pt). Avoid red decoy balls with X markers. 3 lives protect your score. Adaptive speed increases with skill. 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Reflex-Training/drop-catch',
  },
};

export default function DropCatchPage() {
  return <DropCatchClient />;
}