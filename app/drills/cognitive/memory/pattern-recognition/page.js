import PatternRecognitionClient from './PatternRecognitionClient';

// ============================================================
// SEO RESEARCH FINDINGS — pattern-recognition
// PRIMARY:  "pattern recognition test"      ~6,600/mo, KD ~22%
// SECONDARY:"pattern recognition games"     ~4,400/mo, KD ~18%
//           "visual pattern test online"    ~3,600/mo, KD ~20%
//           "matrix reasoning test"         ~2,900/mo, KD ~24%
//           "spatial reasoning test"        ~12,100/mo, KD ~30%
// LONG-TAIL:"pattern recognition cognitive test free" ~880/mo
//           "spatial pattern memory game"   ~590/mo
//           "find the pattern game online"  ~1,600/mo
// INTENT:   Test / Informational / IQ-style
// COMPETITORS: IQ test sites, Mensa practice tests, Lumosity
// ============================================================

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "Memory", "item": "https://skilldrills.online/drills/memory" },
    { "@type": "ListItem", "position": 4, "name": "Pattern Recognition Test", "item": "https://skilldrills.online/drills/cognitive/memory/pattern-recognition" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pattern Recognition Test – Visual Spatial Matrix & Sequences Game",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online pattern recognition test. Identify and recall spatial matrix patterns, visual sequences, and geometric configurations. Trains fluid intelligence, inductive reasoning, and visuospatial working memory.",
  "genre": "Cognitive Brain Training / Pattern Recognition",
  "url": "https://skilldrills.online/drills/cognitive/memory/pattern-recognition",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "1654" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is pattern recognition in cognitive psychology?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pattern recognition is the brain's ability to match incoming sensory information with templates stored in long-term memory, identifying recurring spatial configurations, sequences, or relationships. It is a fundamental cognitive process underlying reading, music perception, face recognition, mathematical reasoning, and scientific discovery." }
    },
    {
      "@type": "Question",
      "name": "Can you improve pattern recognition?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Neuroplasticity allows pattern recognition abilities to improve through deliberate practice. Exposure to varied matrix layouts, geometric sequences, and visual logic puzzles builds denser neural templates in the visual cortex and prefrontal cortex. Expert chess players, radiologists, and experienced scientists all show dramatically enhanced pattern recognition in their domain of expertise." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between pattern recognition and spatial reasoning?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pattern recognition focuses on identifying repeating structures, configurations, or rules within visual information — it is primarily a matching and comparison process. Spatial reasoning involves mentally manipulating objects in space — rotating, folding, or transforming them. Both are components of fluid intelligence and are tested in IQ assessments like the Raven's Progressive Matrices." }
    },
    {
      "@type": "Question",
      "name": "How does the brain recognize visual patterns?",
      "acceptedAnswer": { "@type": "Answer", "text": "Visual pattern recognition begins in the primary visual cortex (V1) detecting basic edges and orientations. Higher visual areas (V2-V4) integrate these into shapes and textures. The inferotemporal cortex handles object recognition. The prefrontal cortex applies top-down knowledge and rules to interpret complex configurations. Gestalt principles — proximity, similarity, symmetry, continuity — guide how raw visual data is grouped into meaningful patterns." }
    },
    {
      "@type": "Question",
      "name": "Is pattern recognition related to IQ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pattern recognition is one of the best predictors of general intelligence (g). The Raven's Progressive Matrices — a pure pattern completion test — is one of the most valid measures of fluid intelligence. Research consistently shows that individuals with higher pattern recognition speed and accuracy score higher on standardized IQ measures, particularly the performance/matrix reasoning subtests." }
    },
    {
      "@type": "Question",
      "name": "What is inductive reasoning and how does pattern recognition train it?",
      "acceptedAnswer": { "@type": "Answer", "text": "Inductive reasoning is the ability to infer general rules from specific examples. When you look at a sequence of shapes and deduce the underlying rule, you are using inductive reasoning. Pattern recognition training exposes you to diverse rule structures, building your brain's library of logical pattern templates and improving your ability to rapidly infer new rules." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between pattern recognition and sequence memory?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pattern recognition focuses on simultaneous spatial configurations — understanding the overall layout and the rule governing a matrix at a single point in time. Sequence memory is temporal — remembering the chronological order of events across time. Pattern recognition is more about logic and spatial relationships; sequence memory is about temporal order retention." }
    },
    {
      "@type": "Question",
      "name": "How does pattern recognition help with STEM subjects?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pattern recognition is foundational in mathematics (identifying algebraic structures, proof patterns), science (recognizing experimental patterns in data), programming (identifying code patterns and algorithms), and engineering (analyzing structural failure patterns). Training pattern recognition directly accelerates problem-solving speed in all quantitative disciplines." }
    },
    {
      "@type": "Question",
      "name": "What is matrix reasoning in cognitive testing?",
      "acceptedAnswer": { "@type": "Answer", "text": "Matrix reasoning presents a partially completed visual matrix and asks you to identify the missing piece that completes the pattern. It is included in major intelligence tests (WAIS, WISC, Raven's) as a measure of fluid intelligence and non-verbal reasoning. This pattern recognition game trains the same cognitive skills in an interactive, gamified format." }
    },
    {
      "@type": "Question",
      "name": "Is this pattern recognition test free to play?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Pattern Recognition drill on SkillDrills is completely free. No registration, downloads, or subscriptions needed. Play directly in your browser on desktop or mobile." }
    }
  ]
};

export const metadata = {
  title: "Pattern Recognition Test – Free Visual Spatial Matrix Game | SkillDrills",
  description: "Test your pattern recognition online. Identify and recall visual spatial patterns and matrix sequences in this free cognitive intelligence game. No sign-up needed.",
  keywords: [
    "pattern recognition test",
    "pattern recognition games",
    "visual pattern test online",
    "matrix reasoning test",
    "spatial reasoning test",
    "find the pattern game online",
    "spatial pattern memory game",
    "pattern recognition cognitive test",
    "inductive reasoning test online",
    "visual matrix game",
    "Raven's progressive matrices practice",
    "pattern matching brain training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/memory/pattern-recognition",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pattern Recognition Test – Free Visual Spatial Matrix Game | SkillDrills",
    description: "Test your pattern recognition online. Identify and recall visual spatial patterns and matrix sequences in this free cognitive intelligence game. No sign-up needed.",
    url: "https://skilldrills.online/drills/cognitive/memory/pattern-recognition",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Pattern Recognition Test – Visual Spatial Matrix Game" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pattern Recognition Test – Free Visual Spatial Matrix Game | SkillDrills",
    description: "Test your pattern recognition online. Identify and recall visual spatial patterns and matrix sequences in this free cognitive intelligence game. No sign-up needed.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function PatternRecognitionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PatternRecognitionClient />
    </>
  );
}
