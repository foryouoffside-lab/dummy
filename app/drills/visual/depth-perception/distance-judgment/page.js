import DistanceJudgmentClient from './DistanceJudgmentClient';

export const metadata = {
  title: 'Distance Judgment Lab - Depth Perception & Spatial Awareness Training',
  description: 'Train your depth perception and spatial judgment. Intercept a moving sphere at the target depth with perfect, close, and far accuracy ratings. 60-second challenge with 3 lives, auto-leveling speed, and combo tracking.',
  keywords: [
    'distance judgment', 'depth perception training', 'spatial awareness',
    'depth interception', 'visual depth drill', 'spatial judgment test',
    'distance estimation', 'depth perception test', 'visual training',
    '3D perception drill', 'spatial cognition', 'depth accuracy training',
    'free depth perception test', 'visual spatial skills'
  ],
  openGraph: {
    title: 'Distance Judgment Lab - Depth Perception Training',
    description: 'Intercept a moving sphere at the target depth. Perfect (<5%), Close (<15%), and Far (≥15%) accuracy ratings. 60-second challenge with 3 lives, auto-leveling, and score tracking.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/depth-perception/distance-judgment',
  },
};

export default function DistanceJudgmentPage() {
  return <DistanceJudgmentClient />;
}