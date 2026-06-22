import CognitiveHubClient from './CognitiveHubClient';

export const metadata = {
  title: 'Free Cognitive Training Online - Attention, Memory, Focus & Logic Drills | SkillDrills',
  description: 'Free cognitive training online. 18 science-based drills for attention, working memory, focus, problem solving, and processing speed. No sign-up. Play instantly in your browser.',
  keywords: [
    'cognitive training online', 'free cognitive training', 'cognitive training drills',
    'brain training games', 'free brain training', 'brain training online',
    'attention training', 'attention span test', 'divided attention game',
    'selective attention test', 'sustained attention drill', 'concentration training',
    'working memory training', 'working memory test', 'memory training games',
    'focus training', 'focus concentration game', 'distraction fighter game',
    'problem solving game', 'logic puzzles online', 'sudoku free online',
    'tower of hanoi game', 'symbol matching game', 'pattern recognition game',
    'processing speed test', 'cognitive speed training', 'reaction time cognitive',
    'cognitive flexibility game', 'executive function training', 'attention games',
    'brain cognitive exercises', 'mental agility training', 'cognitive performance',
    'cognitive skills improvement', 'cognitive ability test online',
    'esports cognitive training', 'gamer brain training', 'fps cognitive drills',
    'skilldrills cognitive', 'free online cognitive drills', 'no download brain games',
    '16 cognitive drills', 'attention focus memory game', 'brain performance training',
  ],
  openGraph: {
    title: 'Free Cognitive Training Online - Attention, Memory, Focus & Logic Drills | SkillDrills',
    description: 'Free cognitive training online. 18 science-based drills for attention, working memory, focus, problem solving, and processing speed.',
    type: 'website',
    url: 'https://skilldrills.online/drills/cognitive',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free Cognitive Training Online - Brain Training Drills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cognitive Training Online - Attention, Memory, Focus & Logic Drills | SkillDrills',
    description: 'Free cognitive training online. 18 drills — attention, focus, working memory, problem solving. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/cognitive' },
};

export default function CognitiveDrillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free Cognitive Training Online - Attention, Memory, Focus & Logic Drills",
        "url": "https://skilldrills.online/drills/cognitive",
        "description": "18 free cognitive training drills online. Attention, working memory, focus, problem solving, and processing speed exercises. No sign-up required.",
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": [
          { "@type": "WebApplication", "name": "Divided Attention Drill", "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention" },
          { "@type": "WebApplication", "name": "Selective Attention Test", "url": "https://skilldrills.online/drills/cognitive/attention/selective-attention" },
          { "@type": "WebApplication", "name": "Sustained Attention Training", "url": "https://skilldrills.online/drills/cognitive/attention/sustained-attention" },
          { "@type": "WebApplication", "name": "Batch Processing", "url": "https://skilldrills.online/drills/cognitive/attention/batch-processing" },
          { "@type": "WebApplication", "name": "Concentration Stamina", "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina" },
          { "@type": "WebApplication", "name": "Concentration Grid Game", "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid" },
          { "@type": "WebApplication", "name": "Distraction Fighter Game", "url": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter" },
          { "@type": "WebApplication", "name": "Focus Timer Training", "url": "https://skilldrills.online/drills/cognitive/focus/focus-timer" },
          { "@type": "WebApplication", "name": "Card Matching Memory Game", "url": "https://skilldrills.online/drills/cognitive/memory/card-matching" },
          { "@type": "WebApplication", "name": "Memory Sequence Training", "url": "https://skilldrills.online/drills/cognitive/memory/memory-sequence" },
          { "@type": "WebApplication", "name": "Number Recall Game", "url": "https://skilldrills.online/drills/cognitive/memory/number-recall" },
          { "@type": "WebApplication", "name": "Pattern Recognition Game", "url": "https://skilldrills.online/drills/cognitive/problem-solving/pattern-recognition" },
          { "@type": "WebApplication", "name": "Logic Puzzles Online", "url": "https://skilldrills.online/drills/cognitive/problem-solving/logic-puzzles" },
          { "@type": "WebApplication", "name": "Free Sudoku Online", "url": "https://skilldrills.online/drills/cognitive/problem-solving/sudoku" },
          { "@type": "WebApplication", "name": "Tower of Hanoi Game", "url": "https://skilldrills.online/drills/cognitive/problem-solving/tower-of-hanoi" },
          { "@type": "WebApplication", "name": "Symbol Matching Game", "url": "https://skilldrills.online/drills/cognitive/problem-solving/symbol-matching" }
        ]
      })}} />
      <CognitiveHubClient />
    </>
  );
}