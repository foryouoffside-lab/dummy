import NumberRecallClient from './NumberRecallClient';

export const metadata = {
  title: 'Number Recall Drill - Digit Span & Working Memory Training',
  description: 'Train your digit span memory by watching and recalling progressively longer number sequences (4 to 49 digits). 60-second challenge with 5 levels, 3 lives, combo streaks, and Memory Master achievement.',
  keywords: [
    'number recall', 'digit span', 'working memory training',
    'number memory', 'digit recall', 'memory span test',
    'numerical memory', 'sequence memory', 'digit memory game',
    'working memory exercise', 'number sequence training',
    'cognitive memory drill', 'free memory test', 'digit span practice'
  ],
  openGraph: {
    title: 'Number Recall Drill - Digit Span & Working Memory Training',
    description: 'Memorize and recall progressively longer digit sequences from 4 to 49 digits across 5 levels. 60-second challenge with lives system, combo streaks, and Memory Master achievement at level 5.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/memory/number-recall',
  },
};

export default function NumberRecallPage() {
  return <NumberRecallClient />;
}