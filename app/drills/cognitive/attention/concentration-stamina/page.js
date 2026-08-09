import ConcentrationStaminaClient from './ConcentrationStaminaClient';

// ============================================================
// SEO RESEARCH FINDINGS — concentration-stamina
// PRIMARY:  "concentration test online"     ~5,400/mo, KD ~28%
// SECONDARY:"focus test online"             ~3,200/mo, KD ~24%
//           "sustained focus training"      ~880/mo,   KD ~16%
//           "mental stamina test"           ~720/mo,   KD ~18%
//           "attention span test online"    ~2,200/mo, KD ~26%
// LONG-TAIL:"how to test concentration online free" ~390/mo
//           "vigilance decrement test"       ~210/mo
//           "brain stamina game"             ~180/mo
// INTENT:   Test / Training
// COMPETITORS: Human Benchmark, Lumosity, Cambridge Brain Sciences
// ============================================================

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "Attention", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 4, "name": "Concentration Stamina", "item": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Concentration Stamina Test – Mental Focus Endurance Brain Game",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online concentration stamina test. Maintain focus and discriminate targets over extended periods. Measure vigilance decrement and build mental endurance for sports, study, and work.",
  "genre": "Cognitive Brain Training / Sustained Attention",
  "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "742" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is concentration stamina and why does it matter?",
      "acceptedAnswer": { "@type": "Answer", "text": "Concentration stamina, or cognitive endurance, is your brain's capacity to sustain single-task engagement and accurate performance over extended periods without succumbing to fatigue or distraction. It is critical for high-demand professions, sports performance, and academic settings where lapses cost significant consequences." }
    },
    {
      "@type": "Question",
      "name": "What is the vigilance decrement?",
      "acceptedAnswer": { "@type": "Answer", "text": "The vigilance decrement is the progressive deterioration in signal detection performance during sustained monitoring tasks. Over time, your brain habituates to repetitive stimuli and your ability to detect rare targets drops. Mackworth's Clock Test (1948) was the first systematic study of this phenomenon. This drill tracks your personal decrement curve." }
    },
    {
      "@type": "Question",
      "name": "How can I test my concentration level online?",
      "acceptedAnswer": { "@type": "Answer", "text": "This free online concentration test measures your target discrimination accuracy and response consistency over an extended session. It tracks when and how sharply your accuracy drops relative to your peak early-session performance, giving you a real-time vigilance curve as your cognitive endurance metric." }
    },
    {
      "@type": "Question",
      "name": "Why does focus deteriorate during long study sessions?",
      "acceptedAnswer": { "@type": "Answer", "text": "Mental fatigue depletes glucose and neurotransmitter resources in the prefrontal cortex, the brain region responsible for executive control and target engagement. Once these resources are taxed, your attentional gate weakens, letting irrelevant stimuli through and reducing your discrimination accuracy — this is exactly what this drill quantifies." }
    },
    {
      "@type": "Question",
      "name": "How do athletes train mental stamina?",
      "acceptedAnswer": { "@type": "Answer", "text": "Elite athletes use concentration grids, target discrimination drills, and sustained attention tasks to strengthen their mental endurance. The goal is to push the threshold at which vigilance decrement begins, allowing athletes to maintain focus and decision accuracy during the final minutes of high-pressure competition." }
    },
    {
      "@type": "Question",
      "name": "What does target discrimination measure in cognitive tests?",
      "acceptedAnswer": { "@type": "Answer", "text": "Target discrimination measures your ability to correctly identify and respond to specific target stimuli while ignoring non-target distractors in a rapid stream of stimuli. It requires both perceptual speed (detecting the target) and response inhibition (ignoring the distractors), both of which degrade under prolonged cognitive load." }
    },
    {
      "@type": "Question",
      "name": "How long can the average person concentrate without a break?",
      "acceptedAnswer": { "@type": "Answer", "text": "Research suggests the average adult can maintain intense focused concentration for 20-45 minutes before cognitive performance begins to noticeably decline. Elite performers (surgeons, air traffic controllers, pilots) achieve 90+ minutes through specific training protocols and planned micro-rest cycles." }
    },
    {
      "@type": "Question",
      "name": "What is a good score on a concentration stamina test?",
      "acceptedAnswer": { "@type": "Answer", "text": "A strong performance means maintaining above 90% accuracy throughout the full session with minimal decrement. If your accuracy falls below 80% in the final third of the drill compared to your opening accuracy, your concentration stamina has significant room for improvement through regular practice." }
    },
    {
      "@type": "Question",
      "name": "Is this focus endurance test suitable for students and gamers?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Students preparing for long exams, competitive gamers who need sustained accuracy in extended match sessions, and anyone whose work demands prolonged focus will find this drill directly applicable. Regular practice directly translates to better late-session performance." }
    },
    {
      "@type": "Question",
      "name": "Is this concentration stamina test free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. This drill is completely free on SkillDrills with no sign-up, no downloads, and no paywalls. It runs entirely in your web browser and works on both desktop and mobile devices." }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Measure Your Attention Span and Concentration Stamina",
  "description": "Test and train your sustained concentration, target discrimination, and rules integration speed.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Note the Rule Class",
      "text": "At the start and during the session, look at the active rule name at the top (e.g. VOWELS or PRIMES)."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Identify Target Characters",
      "text": "Register the character appearing on the center of the screen and match it with the active rule (e.g., A is a Vowel, 3 is a Prime)."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Tap the Screen or Spacebar",
      "text": "Tapping/clicking or pressing the Spacebar/Enter key triggers a selection. Only select targets and ignore distractors."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintain Focus under Switch Cost",
      "text": "Every 10 seconds, the active rule class changes accompanied by an audio indicator. Keep scoring to extend your duration."
    }
  ]
};

export const metadata = {
  title: "Free Focus Test Online: Measure Your Concentration & Attention Span | SkillDrills",
  description: "Worried about your attention span? Take our free focus test online to measure your concentration levels, challenge your brain, and see how you score against the average!",
  keywords: [
    "focus test online",
    "concentration test online",
    "concentration test",
    "attention span test",
    "measure focus",
    "test my attention",
    "how to improve focus",
    "attention span training",
    "sustained focus training",
    "mental stamina test",
    "attention span test online",
    "concentration stamina test",
    "vigilance decrement game",
    "target discrimination test",
    "focus endurance training",
    "cognitive fatigue test",
    "brain stamina training",
    "mental focus game free"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/attention/concentration-stamina",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free Focus Test Online: Measure Your Concentration & Attention Span | SkillDrills",
    description: "Worried about your attention span? Take our free focus test online to measure your concentration levels, challenge your brain, and see how you score against the average!",
    url: "https://skilldrills.online/drills/cognitive/attention/concentration-stamina",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Focus Test Online: Measure Your Concentration & Attention Span | SkillDrills",
    description: "Worried about your attention span? Take our free focus test online to measure your concentration levels, challenge your brain, and see how you score against the average!",
  },
};

export default function ConcentrationStaminaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <ConcentrationStaminaClient />
    </>
  );
}
