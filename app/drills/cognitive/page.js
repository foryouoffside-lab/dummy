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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Cognitive Training", "item": "https://skilldrills.online/drills/cognitive" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Free Cognitive Training Online - Attention, Focus & Reaction Speed Drills",
  "url": "https://skilldrills.online/drills/cognitive",
  "description": `${cognitiveDrillCount} free science-based cognitive training drills online covering attention, focus, and processing speed exercises. No sign-up required.`,
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "hasPart": [
    // Attention Training (3 Drills)
    { "@type": "WebApplication", "name": "Concentration Stamina - Sustained Attention & Continuous Vigilance Test", "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina" },
    { "@type": "WebApplication", "name": "Divided Attention Test - Dual-Task Cognitive Interference Assessment", "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention" },
    { "@type": "WebApplication", "name": "Multitasking Test - Rapid Task Switching & Attention Allocation Drill", "url": "https://skilldrills.online/drills/cognitive/attention/multi-tasking" },
    // Focus & Concentration (2 Drills)
    { "@type": "WebApplication", "name": "Schulte Table Trainer - Peripheral Vision & Visual Search Grid", "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid" },
    { "@type": "WebApplication", "name": "Distraction Fighter - Selective Attention & Stroop Inhibition Trainer", "url": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter" },
    // Processing Speed (3 Drills)
    { "@type": "WebApplication", "name": "Reaction Time Test - Visual Processing Speed & Psychomotor Latency", "url": "https://skilldrills.online/drills/cognitive/processing-speed/reaction-time" },
    { "@type": "WebApplication", "name": "RSVP Speed Reader - Rapid Serial Visual Presentation Reading Trainer", "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader" },
    { "@type": "WebApplication", "name": "Symbol Matching Test - Perceptual Speed & Pattern Recognition Drill", "url": "https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching" }
  ]
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
        "text": "Cognitive training consists of targeted mental exercises designed to strengthen executive functions governed primarily by the prefrontal cortex. Rather than memorizing static facts, cognitive drills stress core neural faculties: selective attention, working memory capacity, mental set-shifting, and visual processing speed. By repeatedly challenging these frontoparietal control networks through structured task constraints, training promotes neuroplastic efficiency in synaptic signaling and information routing during demanding mental tasks."
      }
    },
    {
      "@type": "Question",
      "name": "Can cognitive drills improve processing speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, focused drills accelerate processing speed by reinforcing the efficiency of visual-motor loops connecting the visual cortex, parietal association areas, and motor execution circuits. When identifying visual targets and executing responses under timed conditions, repeated activation streamlines neural transmission and reduces synaptic decision hesitation. Practice optimizes the top-down filtering of sensory inputs, enabling faster perceptual discrimination and quicker motor command initiation without sacrificing decision accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "How does attention training differ from focus training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Attention training targets resource distribution across the brain's dorsal and ventral attention networks, conditioning your capacity to divide focus between simultaneous stimuli or rapidly switch mental sets. Focus training, by contrast, targets sustained vigilance—the ability of the locus coeruleus-norepinephrine system and prefrontal cortex to maintain continuous concentration on a single target over extended periods while suppressing internal mind-wandering and external sensory distractions."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Stroop effect and how does it measure inhibition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Stroop effect illustrates interference between automated processing (word reading) and deliberate executive control (color naming). When a color word is printed in mismatched ink, the brain's anterior cingulate cortex (ACC) detects the conflict, requiring the dorsolateral prefrontal cortex (DLPFC) to actively suppress the automatic reading reflex. The latency difference measures inhibitory control—the mental capacity to override prepotent impulses under cognitive competition."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Schulte table used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Schulte table is a numerical search grid originally developed in aviation psychology to evaluate and train visual search efficiency, speed reading, and parafoveal field expansion. Practicing by scanning numbers in sequence while maintaining central fixation trains the peripheral retina and visual cortex to extract spatial information across wider angles, cutting the number of saccadic eye jumps needed to locate critical targets."
      }
    },
    {
      "@type": "Question",
      "name": "How often should you practice cognitive drills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Neurocognitive research indicates that short, consistent sessions produce the greatest adaptations while avoiding mental fatigue. An optimal routine consists of 10 to 15 minutes of training per session, 3 to 5 days per week. Because high-demand executive function exercises heavily consume prefrontal metabolic resources, extending sessions beyond 20 minutes often leads to cognitive fatigue, which degrades focus mechanics and yields diminishing neuroplastic returns."
      }
    },
    {
      "@type": "Question",
      "name": "Do cognitive skills transfer to gaming and daily performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. In high-tempo environments like competitive gaming, esports, and complex professional work, performance relies heavily on rapid target acquisition, set-shifting, and distractor suppression. Conditioning the frontoparietal attention network to filter visual clutter and minimize choice-response latency allows players and professionals to maintain situational awareness, make precise split-second inputs under pressure, and recover quickly from unexpected visual perturbations."
      }
    },
    {
      "@type": "Question",
      "name": "Do brain-training games actually work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The scientific consensus on brain training highlights the distinction between near transfer and far transfer. Drills reliably produce robust 'near transfer'—meaning you measurably improve at the specific trained mechanics, such as visual scanning speed, selective attention filtering, and Stroop inhibitory control. While claims of broad 'far transfer' to general intelligence (IQ) remain unsupported, targeted drills successfully condition the precise perceptual and motor timing networks required for specialized high-tempo performance."
      }
    }
  ]
};

export default function CognitiveDrillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CognitiveHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}