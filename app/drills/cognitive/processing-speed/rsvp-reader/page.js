import RSVPReaderClient from './RSVPReaderClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "RSVP Speed Reader – Reading Speed Test | SkillDrills",
  description: "Free RSVP speed reader and reading speed test. Test visual token processing speed, eliminate saccadic eye movements, and train reading speed up to 850 WPM.",
  keywords: ["reading speed test", "rsvp speed reader", "rapid serial visual presentation", "speed reading test online", "wpm reading test", "words per minute test", "lexical processing speed", "optimal recognition point", "visual reading speed",
    "speed reading app free",
    "reading comprehension speed",
    "text processing drill"],
  openGraph: {
    title: "RSVP Speed Reader – Reading Speed Test | SkillDrills",
    description: "Free RSVP speed reader and reading speed test. Test visual token processing speed, eliminate saccadic eye movements, and train reading speed up to 850 WPM.",
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "RSVP Speed Reader – Reading Speed Test | SkillDrills",
    description: "Free RSVP speed reader and reading speed test. Test visual token processing speed, eliminate saccadic eye movements, and train reading speed up to 850 WPM.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/rsvp-reader'),
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
      "name": "RSVP Speed Reader",
      "item": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "RSVP Speed Reader — Reading Speed & Lexical Test",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free RSVP speed reader and reading speed test. Test visual token processing speed, eliminate saccadic eye movements, and train rapid lexical comprehension up to 850 WPM.",
  "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader",
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
  "name": "Reading Speed Test",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader",
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "RSVP Speed Reader – High-Throughput Lexical Presentation Game",
  "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader",
  "description": "Free RSVP speed reader and reading speed test. Test visual token processing speed, eliminate saccadic eye movements, and train rapid lexical comprehension up to 850 WPM.",
  "genre": [
    "Educational",
    "Brain Game",
    "Reading Training"
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
      "name": "What is RSVP (Rapid Serial Visual Presentation)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RSVP is a reading technique where words flash one at a time at a single focal point, eliminating the time required for saccadic eye movements and allowing speeds exceeding 800 WPM."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Optimal Recognition Point (ORP)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ORP is the specific character location within a word (typically just left of center) where the eye can identify the full lexical token with minimal fixation time (Rayner, 1998)."
      }
    },
    {
      "@type": "Question",
      "name": "Why does traditional reading have a speed limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional reading is constrained by eye movement mechanics: up to 80% of reading time is spent executing 20–40ms saccades and correcting for regressions (Rayner, 2016)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the average reading speed for adults?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average adult reading speed on printed text is 200–250 words per minute (WPM). Trained speed readers can process 400–600 WPM with good comprehension."
      }
    },
    {
      "@type": "Question",
      "name": "What speed tiers are available in this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Level 1 starts at 250 WPM, progressing through Level 2 (350 WPM), Level 3 (480 WPM), Level 4 (650 WPM), up to Level 5 (850 WPM)."
      }
    },
    {
      "@type": "Question",
      "name": "How does target word detection verify comprehension?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Requiring users to tap when an upcoming target word appears proves that lexical identity is actively decoded rather than passively blurred past."
      }
    },
    {
      "@type": "Question",
      "name": "Can RSVP improve cognitive processing speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, RSVP exercises the working memory phonological loop and strengthens rapid visual token decoding in the visual word form area (VWFA)."
      }
    },
    {
      "@type": "Question",
      "name": "Does screen refresh rate affect RSVP reading?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High refresh rates (144Hz+) ensure consistent frame presentation timing without dropped word intervals (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Who benefits most from RSVP training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students, researchers, executives reading heavy documentation loads, and gamers seeking faster on-screen UI scanning."
      }
    },
    {
      "@type": "Question",
      "name": "Is this RSVP speed reader free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills provides this reading speed test 100% free with no account or installation required."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "RSVP Speed Reader",
  "description": "Free RSVP speed reader and reading speed test. Test visual token processing speed, eliminate saccadic eye movements, and train rapid lexical comprehension up to 850 WPM.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Inspect the Upcoming Target Word",
      "text": "Note the designated target word displayed in the top banner.",
      "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Fixate on the Central ORP Anchor",
      "text": "Keep your eyes locked on the colored pivot character at the focal center with zero saccades.",
      "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Process High-Velocity Lexical Tokens",
      "text": "Allow words to stream across your fovea while maintaining semantic comprehension.",
      "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Trigger Target Detection Instantly",
      "text": "Tap Target Detected the exact moment the active word flashes into the focal stream.",
      "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rayner1998', 'rayner2016', 'woods2015'),
  intro: {
    title: "Reading Speed Test",
    paragraphs: [
      "Free RSVP speed reader and reading speed test. Test visual token processing speed, eliminate saccadic eye movements, and train rapid lexical comprehension up to 850 WPM.",
      "The ORP is the specific character location within a word (typically just left of center) where the eye can identify the full lexical token with minimal fixation time (Rayner, 1998).",
      "Traditional reading is constrained by eye movement mechanics: up to 80% of reading time is spent executing 20–40ms saccades and correcting for regressions (Rayner, 2016).",
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
      { title: "Inspect the Upcoming Target Word", description: "Note the designated target word displayed in the top banner." },
      { title: "Fixate on the Central ORP Anchor", description: "Keep your eyes locked on the colored pivot character at the focal center with zero saccades." },
      { title: "Process High-Velocity Lexical Tokens", description: "Allow words to stream across your fovea while maintaining semantic comprehension." },
      { title: "Trigger Target Detection Instantly", description: "Tap Target Detected the exact moment the active word flashes into the focal stream." },
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
      <RSVPReaderClient copy={{ title: "Reading Speed Test" }} />
      <DrillGuide {...guideProps} />
    </>
  );
}
