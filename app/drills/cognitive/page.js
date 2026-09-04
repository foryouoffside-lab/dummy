import CognitiveHubClient from './CognitiveHubClient';
import { DRILLS } from '../../../lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';

const cognitiveDrills = DRILLS.filter((d) => d.category === 'cognitive');
const cognitiveDrillCount = cognitiveDrills.length;

export const metadata = {
  // GSC (180d): train your brain online (pos 70.5) and processing speed games
  // online (pos 87) both land here; neither phrase contained "online".
  title: 'Free Brain Games Online - Focus, Attention & Speed',
  description: `Free cognitive training online. ${cognitiveDrillCount} science-based drills for attention, focus, and processing speed. No sign-up. Play instantly in your browser.`,
  keywords: [
    'cognitive training online', 'free cognitive training', 'cognitive training drills',
    'brain training games', 'free brain training', 'brain training online',
    'attention training', 'attention span test', 'divided attention game',
    'selective attention test', 'concentration training',
    'focus training', 'focus concentration game', 'distraction fighter game',
    'symbol matching game', 'rsvp speed reading', 'processing speed test',
    'cognitive speed training', 'reaction time cognitive',
    'cognitive flexibility game', 'executive function training', 'attention games',
    'brain cognitive exercises', 'mental agility training', 'cognitive performance',
    'cognitive skills improvement', 'cognitive ability test online',
    'esports cognitive training', 'gamer brain training', 'fps cognitive drills',
    'skilldrills cognitive', 'free online cognitive drills', 'no download brain games',
    'attention focus reaction speed game', 'brain performance training',
  ],
  openGraph: {
    title: 'Free Brain Games Online - Attention, Focus & Processing Speed | SkillDrills',
    description: `Free cognitive training online. ${cognitiveDrillCount} science-based drills for attention, focus, and processing speed.`,
    type: 'website',
    url: 'https://skilldrills.online/drills/cognitive',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free Cognitive Training Online - Brain Training Drills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Brain Games Online - Attention, Focus & Processing Speed | SkillDrills',
    description: `Free cognitive training online. ${cognitiveDrillCount} drills — attention, focus, processing speed. No sign-up.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive',
    languages: getAlternateLanguages('/drills/cognitive'),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is cognitive training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cognitive training consists of structured mental exercises designed to challenge and maintain core executive functions, including selective attention, working memory, processing speed, and cognitive flexibility."
      }
    },
    {
      "@type": "Question",
      "name": "Can cognitive drills improve processing speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Targeted cognitive drills—such as rapid symbol matching and choice reaction tasks—can improve task-specific processing speed and psychomotor coordination. Repeated practice reinforces the neural pathways involved in identifying visual stimuli and executing motor decisions."
      }
    },
    {
      "@type": "Question",
      "name": "How does attention training differ from focus training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Attention training focuses on allocating cognitive resources, such as splitting focus across simultaneous stimuli (divided attention) or ignoring irrelevant distractors (selective attention). Focus training emphasizes sustained attention, training the ability to maintain vigilance on a single task over prolonged periods."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Stroop effect and how does it measure inhibition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Stroop effect occurs when there is a conflict between the semantic meaning of a word (e.g. the word 'RED') and the ink color it is displayed in (e.g. green). Naming the display color requires active cognitive inhibition in the prefrontal cortex to suppress the automatic impulse to read the word."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Schulte table used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Schulte table is a grid of randomly distributed numbers (typically 1 to 25) used to train visual search speed, peripheral awareness, and mental concentration. Users locate and tap numbers in ascending order while keeping their gaze centered on the grid."
      }
    },
    {
      "@type": "Question",
      "name": "How often should you practice cognitive drills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most cognitive training protocols recommend short, consistent sessions of 10 to 15 minutes per day, 3 to 5 days per week. Regular brief sessions provide consistent stimulation for neuroplastic adaptation while avoiding mental fatigue."
      }
    },
    {
      "@type": "Question",
      "name": "Do cognitive skills transfer to gaming and daily performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skills like rapid visual scanning, visual target discrimination, and inhibitory control transfer directly to high-demand environments, including competitive esports (tactical shooters and battle royales) and complex workplace tasks requiring fast switching and distractor suppression."
      }
    }
  ]
};

export default function CognitiveDrillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free Cognitive Training Online - Attention, Focus & Reaction Speed Drills",
        "url": "https://skilldrills.online/drills/cognitive",
        "description": `${cognitiveDrillCount} free cognitive training drills online. Attention, focus, and processing speed exercises. No sign-up required.`,
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": cognitiveDrills.map((drill) => ({
          "@type": "WebApplication",
          "name": drill.name,
          "url": `https://skilldrills.online${drill.href}`
        }))
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CognitiveHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}