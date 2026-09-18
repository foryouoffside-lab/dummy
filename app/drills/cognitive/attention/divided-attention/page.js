import DividedAttentionClient from './DividedAttentionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Divided Attention Test – Dual-Task Focus | SkillDrills",
  description: "Test your divided attention and dual-task capacity online. Track moving visual targets while processing numerical streams in this free split-focus drill.",
  keywords: ["divided attention test", "divided attention test online", "dual task test", "dual task training", "split attention test", "divided attention task", "divided attention training", "split focus brain game", "cognitive multitasking test", "dual visual tracking test", "multimodal attention test", "simultaneous processing test", "psychological refractory period test", "attention training online", "free cognitive brain games"],
  openGraph: {
    title: "Divided Attention Test – Dual-Task Focus | SkillDrills",
    description: "Test your divided attention and dual-task capacity online. Track moving visual targets while processing numerical streams in this free split-focus drill.",
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/attention/divided-attention',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Divided Attention Test – Dual-Task Focus | SkillDrills",
    description: "Test your divided attention and dual-task capacity online. Track moving visual targets while processing numerical streams in this free split-focus drill.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/attention/divided-attention',
    languages: getAlternateLanguages('/drills/cognitive/attention/divided-attention'),
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
      "name": "Divided Attention Test",
      "item": "https://skilldrills.online/drills/cognitive/attention/divided-attention"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Divided Attention Test — Dual-Task Split Focus Drill",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test your divided attention and dual-task capacity online. Track moving visual targets while processing numerical streams in this free split-focus drill.",
  "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention",
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
  "name": "Divided Attention Test",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention",
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Divided Attention Test – Dual-Stream Focus & Tracking Game",
  "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention",
  "description": "Test your divided attention and dual-task capacity online. Track moving visual targets while processing numerical streams in this free split-focus drill.",
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
      "name": "What is divided attention and what does this test measure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divided attention is the cognitive ability to allocate mental resources across two or more independent information channels concurrently. This test measures your ability to simultaneously track moving visuospatial targets while categorizing a continuous numerical stream, quantifying cross-channel accuracy, response latency, and dual-task degradation under time pressure."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Psychological Refractory Period (PRP)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Psychological Refractory Period (Pashler, 1994) is the brief delay in processing that occurs when a second stimulus is presented shortly after a first. Because executive central bottleneck resources cannot be fully shared across two demanding decision stages, response time on the secondary task slows down significantly."
      }
    },
    {
      "@type": "Question",
      "name": "What does Wickens' Multiple Resources Theory tell us about divided attention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Christopher Wickens (2002) demonstrated that humans can divide attention far more effectively when concurrent tasks use distinct sensory modalities and processing codes. By pairing a visual-spatial target task with an auditory or verbal classification task, interference is mitigated compared to two identical visual tasks."
      }
    },
    {
      "@type": "Question",
      "name": "Can you actually improve divided attention or multitasking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Studies by Spelke, Hirst & Neisser (1976) proved that extensive deliberate practice can automatize perceptual classification, drastically reducing central bottleneck interference and allowing near-simultaneous execution without significant error escalation."
      }
    },
    {
      "@type": "Question",
      "name": "How does this test differ from general multitasking in daily life?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike casual workplace multitasking which often involves rapid serial task-switching rather than true concurrent processing, this drill requires real-time simultaneous sensory gating — keeping visual focal tracking engaged while continuously evaluating numeric stream values."
      }
    },
    {
      "@type": "Question",
      "name": "What is considered an elite score on this test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scores above 15,000 points with an overall accuracy above 92% represent top 1% cognitive bandwidth, reflecting superior prefrontal executive control and high working memory throughput."
      }
    },
    {
      "@type": "Question",
      "name": "How does fatigue affect divided attention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sleep deprivation and mental fatigue disproportionately degrade central executive bandwidth, widening the Psychological Refractory Period and causing tunneling (visual neglect of secondary streams)."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate influence dual-task scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, high-refresh displays (144Hz+) provide crisper motion vectors (Woods et al., 2015), allowing the brain to compute spatial tracking positions faster and freeing up cognitive cycles for numeric discrimination."
      }
    },
    {
      "@type": "Question",
      "name": "What is the recommended daily training routine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 10-to-15 minute daily session provides optimal neuroplastic stimulus without inducing central fatigue."
      }
    },
    {
      "@type": "Question",
      "name": "Is this divided attention test free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills provides this test 100% free with no registration, downloads, or payment required."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Divided Attention Test",
  "description": "Test your divided attention and dual-task capacity online. Track moving visual targets while processing numerical streams in this free split-focus drill.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Initiate the Dual Stream",
      "text": "Click Start Drill to activate both the primary visuospatial target field and the concurrent numerical side panel.",
      "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track and Tap Moving Visual Targets",
      "text": "Monitor the canvas for moving blue target circles and tap each before its decay timer expires (+0.6s).",
      "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Classify the Numerical Stream Simultaneously",
      "text": "Simultaneously scan the right panel; when an EVEN number appears, tap the MATCH button immediately and ignore odd numbers.",
      "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintain Dual Channel Accuracy",
      "text": "Sustain clean hits on both channels to build your combo multiplier without dropping targets.",
      "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('pashler1994', 'wickens2002', 'strayer2001', 'spelke1976', 'woods2015'),
  intro: {
    title: "Divided Attention Test",
    paragraphs: [
      "Test your divided attention and dual-task capacity online. Track moving visual targets while processing numerical streams in this free split-focus drill.",
      "The Psychological Refractory Period (Pashler, 1994) is the brief delay in processing that occurs when a second stimulus is presented shortly after a first. Because executive central bottleneck resources cannot be fully shared across two demanding decision stages, response time on the secondary task slows down significantly.",
      "Christopher Wickens (2002) demonstrated that humans can divide attention far more effectively when concurrent tasks use distinct sensory modalities and processing codes. By pairing a visual-spatial target task with an auditory or verbal classification task, interference is mitigated compared to two identical visual tasks.",
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
      { title: "Initiate the Dual Stream", description: "Click Start Drill to activate both the primary visuospatial target field and the concurrent numerical side panel." },
      { title: "Track and Tap Moving Visual Targets", description: "Monitor the canvas for moving blue target circles and tap each before its decay timer expires (+0.6s)." },
      { title: "Classify the Numerical Stream Simultaneously", description: "Simultaneously scan the right panel; when an EVEN number appears, tap the MATCH button immediately and ignore odd numbers." },
      { title: "Maintain Dual Channel Accuracy", description: "Sustain clean hits on both channels to build your combo multiplier without dropping targets." },
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
      <DividedAttentionClient copy={{ title: "Divided Attention Test" }} />
      <DrillGuide {...guideProps} />
    </>
  );
}
