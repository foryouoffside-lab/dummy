import AgilityLadderClient from './AgilityLadderClient';

export const metadata = {
  title: 'Monochrome Agility Ladder - Sequence Coordination & Speed Training',
  description: 'Step on rungs in sequence (Left→Right→Left→Right) as ladders scroll upward. Adaptive speed increases with each completed ladder. 60-second challenge with scoring and penalty system.',
  keywords: [
    'agility ladder', 'sequence coordination', 'ladder drill training',
    'motor sequencing practice', 'speed coordination game', 'agility training',
    'footwork pattern drill', 'sequential movement training', 'ladder exercise',
    'coordination speed test', 'free agility drill', 'motor pattern practice',
    'reaction sequence training', 'adaptive speed ladder', 'monochrome agility'
  ],
  openGraph: {
    title: 'Monochrome Agility Ladder - Sequence Coordination Training',
    description: 'Navigate scrolling ladders by stepping on rungs in the correct Left→Right→Left→Right sequence. Adaptive speed increases with completion. 60-second challenge with penalties.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Fitness/agility-ladder',
  },
};

export default function AgilityLadderPage() {
  return <AgilityLadderClient />;
}