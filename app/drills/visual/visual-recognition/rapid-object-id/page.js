import RapidObjectIdClient from './RapidObjectIdClient';

export const metadata = {
  title: 'Neural Shape ID - Rapid Object Recognition & Visual Processing Training',
  description: 'Train rapid visual recognition by identifying flashing shapes. Circle = Click LEFT, Square = Click RIGHT. Adaptive 50-300ms flash duration. 60-second challenge with 3 lives, streak bonuses, and reaction tracking.',
  keywords: [
    'rapid object recognition', 'shape identification', 'visual processing speed',
    'object recognition drill', 'circle square test', 'rapid visual processing',
    'shape detection training', 'visual discrimination test', 'quick shape id',
    'visual cognition drill', 'object classification speed', 'brain training',
    'free shape recognition test', 'neural shape id'
  ],
  openGraph: {
    title: 'Neural Shape ID - Rapid Object Recognition Training',
    description: 'Circle = Left, Square = Right. Shapes flash at 50-300ms. Adaptive speed tightens with success. 60-second challenge with 3 lives, 5-streak bonuses, and reaction time tracking.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/rapid-object-id',
  },
};

export default function RapidObjectIdPage() {
  return <RapidObjectIdClient />;
}