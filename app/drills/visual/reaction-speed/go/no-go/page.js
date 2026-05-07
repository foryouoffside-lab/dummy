import ChromaSyncClient from './ChromaSyncClient';

export const metadata = {
  title: 'Chroma-Sync Lab - Go/No-Go Reaction Time & Impulse Control Training',
  description: 'Train impulse control and reaction speed with the Go/No-Go paradigm. Click GREEN balls (+1pt), avoid RED balls (-1 life). Adaptive 80-400ms display window. 60-second challenge with 3 lives and streak tracking.',
  keywords: [
    'go no-go test', 'impulse control training', 'reaction time drill',
    'go no-go paradigm', 'inhibitory control', 'response inhibition',
    'cognitive control training', 'reaction speed test', 'green red test',
    'impulse control game', 'selective response training', 'brain training',
    'free go no-go test', 'chroma sync drill'
  ],
  openGraph: {
    title: 'Chroma-Sync Lab - Go/No-Go Reaction Training',
    description: 'Click GREEN balls, avoid RED balls. Adaptive display window (80-400ms). 60-second challenge with 3 lives, streak bonuses, and reaction time tracking. Train impulse control.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/reaction-speed/go/no-go',
  },
};

export default function ChromaSyncPage() {
  return <ChromaSyncClient />;
}