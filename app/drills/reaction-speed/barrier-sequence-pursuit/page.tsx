import BarrierSequencePursuitWrapper from './BarrierSequencePursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Jiggle Peek Trainer - Free Cover Peeking Reflex Drill",
  description: "Free jiggle peek trainer online. Train defensive angle holding, counter peeker's advantage, and master crosshair offsetting for CS2 and Valorant.",
  keywords: ["jiggle peek trainer", "cover peeking reflex drill", "counter peekers advantage", "angle holding drill", "crosshair placement trainer", "how to jiggle peek valorant", "how to jiggle peek cs2", "peeker's advantage counter", "fps reaction trainer"],
  openGraph: {
    title: "Jiggle Peek Trainer - Free Cover Peeking Reflex Drill",
    description: "Free jiggle peek trainer online. Train defensive angle holding, counter peeker's advantage, and master crosshair offsetting for CS2 and Valorant.",
    type: 'article',
    url: 'https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jiggle Peek Trainer - Free Cover Peeking Reflex Drill",
    description: "Free jiggle peek trainer online. Train defensive angle holding, counter peeker's advantage, and master crosshair offsetting for CS2 and Valorant.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/barrier-sequence-pursuit'),
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
      "name": "Reaction Speed",
      "item": "https://skilldrills.online/drills/reaction-speed"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Jiggle Peek Trainer",
      "item": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Jiggle Peek Trainer — Cover Peeking Reflex Drill",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free jiggle peek trainer online. Train defensive angle holding, counter peeker's advantage, and master crosshair offsetting for CS2 and Valorant.",
  "url": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit",
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
  "name": "Jiggle Peek Trainer",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas, modern web browser with Pointer Lock support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit",
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jiggle Peek Trainer – Cover Peeking & Angle Holding Game",
  "url": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit",
  "description": "Free jiggle peek trainer online. Train defensive angle holding, counter peeker's advantage, and master crosshair offsetting for CS2 and Valorant.",
  "genre": [
    "Action",
    "Aim Trainer",
    "Tactical FPS"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop"
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
      "name": "What is a jiggle peek trainer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A jiggle peek trainer is an esports reaction tool designed to simulate counter-strafing, rapid shoulder peeking from behind cover, and holding narrow defensive angles against aggressive attackers."
      }
    },
    {
      "@type": "Question",
      "name": "What is peeker's advantage in tactical shooters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Peeker's advantage is the latency differential created by network ping and client-server interpolation (deWet & Straily, 2020), allowing an active peeker to see a stationary defender before the defender's client receives the packet."
      }
    },
    {
      "@type": "Question",
      "name": "How do you hold an angle to counter peeker's advantage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never place your crosshair flush against the wall edge. Offset your crosshair by 100–150 ms of human reaction distance so that the enemy runs directly into your crosshair as you click."
      }
    },
    {
      "@type": "Question",
      "name": "What does Donders' mental chronometry (1868) say about peeking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Donders established that choice reaction time involves stimulus detection, stimulus discrimination, and motor response selection, creating a baseline delay of ~200–250 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Why is shoulder peeking effective?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shoulder peeking exposes only the player's arm or shoulder for 50–100 ms to bait out defensive sniper or rifle fire without exposing the critical head hitbox."
      }
    },
    {
      "@type": "Question",
      "name": "What is counter-strafing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Counter-strafing is instantly cancelling movement momentum by tapping the opposing directional movement key (e.g., tapping D while moving left with A) to achieve instant 100% weapon accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "How does crosshair pre-placement save reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pre-placing your crosshair eliminates the motor submovement latency required to flick to a target, converting a complex 2D flick into a simple 1-button timing problem."
      }
    },
    {
      "@type": "Question",
      "name": "How does display latency impact angle holding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Display quantization delay (16.7 ms at 60 Hz vs. 4.1 ms at 240 Hz, Woods et al., 2015) reduces the reaction budget available before the peeker finishes their strafe."
      }
    },
    {
      "@type": "Question",
      "name": "What is the optimal training routine for jiggle peeking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Practice 10 minutes of jiggle peeking drills daily, alternating between holding tight off-angles and aggressive peek-and-retreat timing."
      }
    },
    {
      "@type": "Question",
      "name": "Is this jiggle peek drill free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills' Jiggle Peek Trainer runs directly in modern browsers for free with no account or installation."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Jiggle Peek Trainer",
  "description": "Free jiggle peek trainer online. Train defensive angle holding, counter peeker's advantage, and master crosshair offsetting for CS2 and Valorant.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Select Angle Width and Barrier Depth",
      "text": "Configure barrier geometry to match the chokepoints and angles of your competitive game.",
      "url": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Offset Crosshair for Human Reaction Time",
      "text": "Set your crosshair placement slightly off the barrier edge to account for visual processing latency.",
      "url": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Detect Enemy Emergence Cues",
      "text": "Maintain tight peripheral vigilance on the barrier boundary for target break-out cues.",
      "url": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Execute Instant Click upon Exposure",
      "text": "Trigger the firing click the millisecond the target crosses your crosshair plane without over-aiming.",
      "url": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('donders1868', 'dewet2020', 'kosinski2008', 'woods2015'),
  intro: {
    title: "Jiggle Peek Trainer",
    paragraphs: [
      "Free jiggle peek trainer online. Train defensive angle holding, counter peeker's advantage, and master crosshair offsetting for CS2 and Valorant.",
      "Peeker's advantage is the latency differential created by network ping and client-server interpolation (deWet & Straily, 2020), allowing an active peeker to see a stationary defender before the defender's client receives the packet.",
      "Never place your crosshair flush against the wall edge. Offset your crosshair by 100–150 ms of human reaction distance so that the enemy runs directly into your crosshair as you click.",
    ],
  },
  benchmarks: {
    title: 'Standardized Performance Benchmarks',
    headers: ['Tier', 'Rank', 'Rating', 'Accuracy', 'Percentile'],
    rows: [
      { tier: 'Tier 1', rank: 'Grandmaster / Pro', stat: 'Top 1%', level: 'Elite', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Master', stat: 'Top 5%', level: 'Diamond', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Pro', stat: 'Top 15%', level: 'Platinum', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Intermediate', stat: 'Top 50%', level: 'Gold', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Novice', stat: 'Base', level: 'Silver', accuracy: '<78%', percentile: 'Novice' },
    ],
  },
  protocols: {
    title: 'Core Performance Training Protocols',
    description: 'Evidence-based cognitive and neuromuscular enhancement routines.',
    items: [
      { title: "Select Angle Width and Barrier Depth", description: "Configure barrier geometry to match the chokepoints and angles of your competitive game." },
      { title: "Offset Crosshair for Human Reaction Time", description: "Set your crosshair placement slightly off the barrier edge to account for visual processing latency." },
      { title: "Detect Enemy Emergence Cues", description: "Maintain tight peripheral vigilance on the barrier boundary for target break-out cues." },
      { title: "Execute Instant Click upon Exposure", description: "Trigger the firing click the millisecond the target crosses your crosshair plane without over-aiming." },
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
      <BarrierSequencePursuitWrapper copy={{ title: "Jiggle Peek Trainer" }} />
      <DrillGuide {...guideProps} />
    </>
  );
}
