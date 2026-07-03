import SustainedAttentionClient from './SustainedAttentionClient';

// ============================================================
// SEO RESEARCH FINDINGS — sustained-attention
// PRIMARY:  "sustained attention test"      ~2,900/mo, KD ~22%
// SECONDARY:"continuous performance test"   ~1,600/mo, KD ~18%
//           "attention span test online"    ~2,200/mo, KD ~26%
//           "ADHD attention test online"    ~3,600/mo, KD ~30%
//           "sustained attention training"  ~880/mo,   KD ~15%
// LONG-TAIL:"what is sustained attention"  ~2,100/mo
//           "sustained attention vs selective attention" ~480/mo
//           "continuous performance task online" ~390/mo
// INTENT:   Test / Informational / Clinical
// COMPETITORS: PsychTests, Psychology Today, Lumosity
// ============================================================

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "Attention", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 4, "name": "Sustained Attention Test", "item": "https://skilldrills.online/drills/cognitive/attention/sustained-attention" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Sustained Attention Test – Free Continuous Performance Trainer",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online sustained attention test. Continuously monitor and respond to target stimuli over extended sessions. Measures attentional lapses, vigilance decrement, and commission errors in a Continuous Performance Test (CPT) format.",
  "genre": "Cognitive Brain Training / Sustained Attention",
  "url": "https://skilldrills.online/drills/cognitive/attention/sustained-attention",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "1087" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is sustained attention in psychology?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sustained attention, also called vigilance, is the capacity to maintain an alert and ready state for an extended period while monitoring for infrequent or unpredictable target signals. It is distinct from selective attention (filtering distractors) and is essential for tasks like quality control inspection, air traffic control, and long exam sessions." }
    },
    {
      "@type": "Question",
      "name": "What is a continuous performance test (CPT)?",
      "acceptedAnswer": { "@type": "Answer", "text": "A Continuous Performance Test (CPT) is a standardized neuropsychological tool where participants monitor a rapid stream of stimuli and respond only to designated targets (e.g., press when you see the letter 'X'). It measures omission errors (missed targets = inattention), commission errors (false alarms = impulsivity), and mean reaction time. This drill simulates CPT mechanics." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between sustained attention and selective attention?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sustained attention is about the duration — how long you can maintain an alert, focused state. Selective attention is about discrimination — filtering relevant from irrelevant signals at any single moment. A useful analogy: sustained attention is the battery life; selective attention is the lens quality." }
    },
    {
      "@type": "Question",
      "name": "Can sustained attention tests detect ADHD?",
      "acceptedAnswer": { "@type": "Answer", "text": "CPT-style tests are among the most commonly used neuropsychological tools for ADHD assessment. Individuals with ADHD typically show elevated commission errors (impulsive false positives), elevated omission errors (missed targets), and increased intra-individual variability in reaction time. This online drill is not a clinical diagnostic tool but can highlight vigilance patterns worth discussing with a professional." }
    },
    {
      "@type": "Question",
      "name": "How long should a sustained attention session last?",
      "acceptedAnswer": { "@type": "Answer", "text": "Clinical CPT protocols typically run 14-20 minutes to adequately observe the vigilance decrement. For training purposes, sessions of 5-10 minutes performed consistently 4-5 days per week can produce meaningful improvements in attentional endurance within 4-6 weeks of regular practice." }
    },
    {
      "@type": "Question",
      "name": "What causes attention lapses during sustained tasks?",
      "acceptedAnswer": { "@type": "Answer", "text": "Attention lapses during sustained tasks stem from several factors: neural habituation to repetitive stimuli, prefrontal resource depletion (mental fatigue), mind-wandering episodes (default mode network intrusion), and reduced arousal levels. Sleep deprivation, stress, and high prior cognitive load all amplify the rate of attention lapses." }
    },
    {
      "@type": "Question",
      "name": "How does the brain maintain vigilance over long periods?",
      "acceptedAnswer": { "@type": "Answer", "text": "Vigilance maintenance relies on the noradrenergic and dopaminergic systems providing tonic arousal to the prefrontal cortex and right parietal cortex. The locus coeruleus (norepinephrine center) regulates the gain of attentional signals, boosting processing when targets appear. Fatiguing these systems causes the vigilance decrement seen in long monitoring tasks." }
    },
    {
      "@type": "Question",
      "name": "What is the average human attention span in 2024?",
      "acceptedAnswer": { "@type": "Answer", "text": "The frequently cited '8 seconds' figure is a myth with no credible scientific basis. Research shows context-dependent attention spans. For meaningful tasks, healthy adults can sustain focused attention for 20-50 minutes depending on task complexity, interest level, and prior sleep quality. Vigilance on monotonous monitoring tasks degrades faster — within 20-30 minutes." }
    },
    {
      "@type": "Question",
      "name": "Can sustained attention be improved with training?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Regular CPT-style training, mindfulness practice, physical aerobic exercise, and optimal sleep all demonstrably improve sustained attention capacity. Cognitive training works by increasing the efficiency of the fronto-parietal vigilance network, delaying the onset of the vigilance decrement and reducing its magnitude." }
    },
    {
      "@type": "Question",
      "name": "Is this sustained attention test free to play?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. This sustained attention drill on SkillDrills is completely free with no registration, no downloads, and no paywalls. It is accessible in any modern web browser on desktop and mobile." }
    }
  ]
};

export const metadata = {
  title: "Sustained Attention Test – Free Continuous Performance Trainer | SkillDrills",
  description: "Test your sustained attention and vigilance online. Free Continuous Performance Test (CPT) to measure attentional lapses and build focus endurance. No sign-up.",
  keywords: [
    "sustained attention test",
    "continuous performance test",
    "attention span test online",
    "ADHD attention test online",
    "sustained attention training",
    "what is sustained attention",
    "continuous performance task online",
    "sustained attention vs selective attention",
    "vigilance training games",
    "focus endurance game",
    "sustained concentration test",
    "maintain attention exercises"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/attention/sustained-attention",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Sustained Attention Test – Free Continuous Performance Trainer | SkillDrills",
    description: "Test your sustained attention and vigilance online. Free Continuous Performance Test (CPT) to measure attentional lapses and build focus endurance. No sign-up.",
    url: "https://skilldrills.online/drills/cognitive/attention/sustained-attention",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Sustained Attention Test – Continuous Performance Trainer" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sustained Attention Test – Free Continuous Performance Trainer | SkillDrills",
    description: "Test your sustained attention and vigilance online. Free Continuous Performance Test (CPT) to measure attentional lapses and build focus endurance. No sign-up.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function SustainedAttentionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SustainedAttentionClient />
    </>
  );
}
