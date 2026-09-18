import ConcentrationStaminaClient from './ConcentrationStaminaClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Attention Span Test – Concentration Stamina | SkillDrills",
  description: "Free attention span test online: Measure continuous visual focus, vigilance decay, and rule-switching stamina under speed pressure in this cognitive drill.",
  keywords: ["attention span test", "concentration stamina", "focus test online", "continuous performance test", "vigilance test", "sustained attention test", "cpt test online", "concentration span test", "mental stamina test", "executive control test", "adhd focus test", "cognitive endurance drill"],
  openGraph: {
    title: "Attention Span Test – Concentration Stamina | SkillDrills",
    description: "Free attention span test online: Measure continuous visual focus, vigilance decay, and rule-switching stamina under speed pressure in this cognitive drill.",
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/attention/concentration-stamina',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Attention Span Test – Concentration Stamina | SkillDrills",
    description: "Free attention span test online: Measure continuous visual focus, vigilance decay, and rule-switching stamina under speed pressure in this cognitive drill.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/attention/concentration-stamina',
    languages: getAlternateLanguages('/drills/cognitive/attention/concentration-stamina'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://skilldrills.online"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Drills Hub",
      "item": "https://skilldrills.online/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cognitive Drills",
      "item": "https://skilldrills.online/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Concentration Stamina",
      "item": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Concentration Stamina — Continuous Performance Attention Test",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free attention span test online. Measure continuous visual focus, vigilance decay, and rule-switching stamina under speed pressure in this cognitive stamina drill.",
  "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Concentration Stamina – Attention Span Test",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina",
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Concentration Stamina – Sustained Vigilance & Focus Game",
  "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina",
  "description": "Free attention span test online. Measure continuous visual focus, vigilance decay, and rule-switching stamina under speed pressure in this cognitive stamina drill.",
  "genre": [
    "Action",
    "Brain Game",
    "Cognitive Training"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Attention Span Test (Concentration Stamina)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This is a digital Continuous Performance Test (CPT) designed to measure sustained attention, vigilance decrement, and task-set switching endurance over high-density visual stimulus sequences."
      }
    },
    {
      "@type": "Question",
      "name": "What is vigilance decrement (Mackworth, 1948)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Norman Mackworth discovered during radar watch studies that human signal detection efficiency systematically degrades after 20-30 minutes of continuous monitoring due to habituation and cognitive resource depletion."
      }
    },
    {
      "@type": "Question",
      "name": "How does dynamic rule switching challenge mental stamina?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 10 seconds the target classification rule shifts between Vowels and Prime Numbers, forcing the prefrontal cortex to clear working memory buffers and overcome task-set inertia (Monsell, 2003)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between selective and sustained attention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selective attention filters out distractions to focus on one target at a specific instant (Broadbent, 1958), whereas sustained attention is the endurance required to maintain that vigilance over prolonged operational periods."
      }
    },
    {
      "@type": "Question",
      "name": "What does false alarm rate indicate in CPT tests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A high false alarm rate (tapping on non-target stimuli) indicates impulsive responding and deficient inhibitory control in the prefrontal cortex (Robertson et al., 1997)."
      }
    },
    {
      "@type": "Question",
      "name": "How can cognitive endurance be trained?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gradually extending high-concentration intervals with progressive difficulty conditioning trains the central executive network to resist fatigue and maintain vigilance."
      }
    },
    {
      "@type": "Question",
      "name": "Does caffeine or physical exercise improve attention span?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Moderate aerobic exercise enhances cerebral perfusion and executive vigilance, while controlled caffeine intake elevates central arousal without jitter."
      }
    },
    {
      "@type": "Question",
      "name": "How does hardware latency impact continuous performance testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High-resolution timers and consistent 144Hz+ displays eliminate stimulus onset jitter (Woods et al., 2015), ensuring accurate latency scoring."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice concentration stamina?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "10 to 15 minutes daily before deep work or study sessions provides peak neural priming."
      }
    },
    {
      "@type": "Question",
      "name": "Is this tool free and accessible on all devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills provides this test completely free directly in modern desktop and mobile browsers."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Attention Span Test",
  "description": "Free attention span test online. Measure continuous visual focus, vigilance decay, and rule-switching stamina under speed pressure in this cognitive stamina drill.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch Drill and Calibrate Focal Vision",
      "text": "Center your vision on the central display and observe the active rule banner.",
      "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Discriminate Target Stimuli",
      "text": "Evaluate each flashing symbol against the active rule (e.g., Vowels: A, E, I, O, U or Primes: 2, 3, 5, 7).",
      "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute Precise Inhibitory Control",
      "text": "Tap spacebar or click immediately on valid targets while actively suppressing responses to distractors.",
      "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Adapt Instantly to Rule Switches",
      "text": "When the rule flips every 10 seconds, clear working memory immediately and apply the new criterion.",
      "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('mackworth1948', 'parasuraman1979', 'robertson1997', 'monsell2003', 'broadbent1958', 'woods2015'),
  intro: {
    title: "Concentration Stamina – Attention Span Test",
    paragraphs: [
      "Free attention span test online. Measure continuous visual focus, vigilance decay, and rule-switching stamina under speed pressure in this cognitive stamina drill.",
      "Norman Mackworth discovered during radar watch studies that human signal detection efficiency systematically degrades after 20-30 minutes of continuous monitoring due to habituation and cognitive resource depletion.",
      "Every 10 seconds the target classification rule shifts between Vowels and Prime Numbers, forcing the prefrontal cortex to clear working memory buffers and overcome task-set inertia (Monsell, 2003).",
    ],
  },
  benchmarks: {
    title: 'Cognitive Performance Standards & Benchmarks',
    headers: ['Tier', 'Rank', 'Rating', 'Accuracy', 'Percentile'],
    rows: [
      { tier: 'Tier 1', rank: 'Grandmaster / Elite', stat: 'Top 1%', level: 'Mastery', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Advanced Focus', stat: 'Top 5%', level: 'Diamond', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Proficient Operator', stat: 'Top 15%', level: 'Platinum', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Standard Adult', stat: 'Top 50%', level: 'Gold', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Novice Baseline', stat: 'Base', level: 'Silver', accuracy: '<78%', percentile: 'Baseline' },
    ],
  },
  protocols: {
    title: 'Core Neuroplastic Optimization Protocols',
    description: 'Scientifically validated executive function enhancement protocols.',
    items: [
      { title: "Launch Drill and Calibrate Focal Vision", description: "Center your vision on the central display and observe the active rule banner." },
      { title: "Discriminate Target Stimuli", description: "Evaluate each flashing symbol against the active rule (e.g., Vowels: A, E, I, O, U or Primes: 2, 3, 5, 7)." },
      { title: "Execute Precise Inhibitory Control", description: "Tap spacebar or click immediately on valid targets while actively suppressing responses to distractors." },
      { title: "Adapt Instantly to Rule Switches", description: "When the rule flips every 10 seconds, clear working memory immediately and apply the new criterion." },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function EnhancedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ConcentrationStaminaClient copy={{ title: "Concentration Stamina – Attention Span Test" }} />
      <DrillGuide {...guideProps} />
    </>
  );
}
