import GhostLinkClient from './GhostLinkClient';

export const metadata = {
  title: 'Ghost-Link Tracking - Multi-Object Visual Memory & Tracking Training',
  description: 'Train multi-object tracking and visual working memory. Memorize 4 green targets, track them among 11 moving balls for 60 seconds, then identify them. +5 points per correct ball. Maximum 20 points.',
  keywords: [
    'multi-object tracking', 'visual memory training', 'multiple target tracking',
    'ghost link tracking', 'visual working memory', 'object tracking drill',
    'MOT training', 'attention tracking', 'visual cognition test',
    'multiple ball tracking', 'memory and tracking', 'cognitive training',
    'free MOT test', 'visual attention drill'
  ],
  openGraph: {
    title: 'Ghost-Link Tracking - Multi-Object Visual Memory Training',
    description: 'Memorize 4 green targets among 11 moving balls. Track them for 60 seconds, then identify. +5 points per correct ball. Tests visual working memory and multi-object tracking.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets',
  },
};

export default function GhostLinkPage() {
  return <GhostLinkClient />;
}