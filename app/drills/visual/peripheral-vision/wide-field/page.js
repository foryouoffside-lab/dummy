import WideFieldClient from './WideFieldClient';

export const metadata = {
  title: 'Wide Field Awareness - Peripheral Vision & Character Recall Training',
  description: 'Train your peripheral vision by recalling characters flashed in 4 corner positions while fixating on center. Random 1-3 character recall quizzes with streak bonuses and 3 lives. 60-second challenge.',
  keywords: [
    'wide field awareness', 'peripheral vision training', 'character recall',
    'visual field test', 'peripheral character detection', 'vision span training',
    'visual memory drill', 'peripheral awareness test', 'eye training',
    'visual attention training', 'field of view training', 'vision exercise',
    'free peripheral vision test', 'visual cognition drill'
  ],
  openGraph: {
    title: 'Wide Field Awareness - Peripheral Vision & Character Recall',
    description: 'Characters flash in 4 corners while you fixate on center. Random recall quizzes test 1-3 characters. 60-second challenge with 3 lives, streak bonuses, and score tracking.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/peripheral-vision/wide-field',
  },
};

export default function WideFieldPage() {
  return <WideFieldClient />;
}