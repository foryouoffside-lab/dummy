import SelectiveAttentionClient from './SelectiveAttentionClient';

export const metadata = {
  title: 'Selective Attention Drill - Visual Search & Target Identification Training',
  description: 'Train your selective attention by finding items matching BOTH color and shape among distractors. Adaptive 2000-900ms round speed. 60-second challenge with 5 lives, combo streaks, and visual search improvement.',
  keywords: [
    'selective attention', 'visual search training', 'target identification',
    'cognitive training', 'attention drill', 'visual discrimination',
    'color shape matching', 'focus training', 'concentration drill',
    'visual scanning', 'attention test', 'cognitive assessment',
    'brain training game', 'distractor filtering'
  ],
  openGraph: {
    title: 'Selective Attention Drill - Visual Search & Target Identification',
    description: 'Find items matching both color and shape among distractors. Adaptive speed tightens from 2000ms to 900ms with correct answers. 60-second challenge with lives system and combo streaks.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/attention/selective-attention',
  },
};

export default function SelectiveAttentionPage() {
  return <SelectiveAttentionClient />;
}