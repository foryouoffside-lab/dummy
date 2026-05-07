import DigitSpanClient from './DigitSpanClient';

export const metadata = {
  title: 'Digit Span Drill - Short-Term Memory & Number Sequence Training',
  description: 'Train numerical short-term memory by memorizing and recalling digit sequences. Progressive difficulty with infinite levels - sequence length = level + 2. 3-second memorization then type recall. 60-second timed challenge.',
  keywords: [
    'digit span', 'number memory', 'digit sequence recall', 'short term memory numbers',
    'digit span test', 'numerical memory training', 'number sequence memory',
    'digit recall drill', 'working memory digits', 'memory span test',
    'number memory game', 'digit span practice', 'free memory drill',
    'numerical short term memory', 'digit sequence test'
  ],
  openGraph: {
    title: 'Digit Span Drill - Numerical Short-Term Memory Training',
    description: 'Train digit span memory with infinite progressive levels. 3-second memorization phase then type the sequence. Points = number of digits. Penalty matches correct score. 60-second timed challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/short-term-memory/digit-span',
  },
};

export default function DigitSpanPage() {
  return <DigitSpanClient />;
}