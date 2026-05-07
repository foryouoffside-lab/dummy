import SustainedAttentionClient from './SustainedAttentionClient';

export const metadata = {
  title: 'Sustained Attention Drill - Vigilance & Target Detection Training',
  description: 'Train sustained attention by clicking only when the flashing number matches your memorized target. Adaptive 500-300ms flash speed. 60-second vigilance challenge with 5 lives, combo streaks, and response accuracy tracking.',
  keywords: [
    'sustained attention', 'vigilance training', 'target detection',
    'attention span', 'focus endurance', 'concentration drill',
    'continuous performance test', 'CPT training', 'attention maintenance',
    'cognitive vigilance', 'response inhibition', 'sustained focus',
    'brain training game', 'attention assessment'
  ],
  openGraph: {
    title: 'Sustained Attention Drill - Vigilance & Target Detection',
    description: 'Memorize a target number and click only when it appears among rapidly flashing digits. Adaptive speed from 500ms to 300ms. 60-second vigilance challenge with lives system and combo streaks.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/attention/sustained-attention',
  },
};

export default function SustainedAttentionPage() {
  return <SustainedAttentionClient />;
}