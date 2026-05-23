import InferenceDrillClient from './InferenceDrillClient';

export const metadata = {
  title: 'Inference Drill - Critical Reasoning & Logical Thinking | SkillDrills',
  description: 'Master critical reasoning with 12 unique passages. Practice logical flaws, causal analysis, inference drawing, and argument evaluation. LSAT & GMAT style. No sign-up.',
  keywords: [
    'inference drill', 'inference practice', 'inference test', 'critical reasoning drill',
    'logical reasoning practice', 'reading comprehension drill',
    'LSAT logical reasoning practice', 'GMAT critical reasoning practice',
    'GRE verbal reasoning practice', 'CLAT logical reasoning',
    'logical flaws practice', 'causal reasoning exercises', 'argument analysis practice',
    'paradox resolution drill', 'flawed analogy practice', 'method of reasoning',
    'sufficient assumption practice', 'necessary assumption practice',
    'parallel reasoning questions', 'main point identification',
    'critical thinking exercises online', 'analytical reasoning practice free',
    'verbal reasoning test free', 'comprehension skills training',
    'how to improve logical reasoning', 'improve critical thinking skills',
    'practice inference questions online', 'free reasoning test online',
    'logical reasoning questions with answers', 'critical reasoning questions and explanations',
    'skilldrills inference', 'skilldrills critical reasoning',
    'online inference drill free', 'best critical reasoning practice',
    'free LSAT practice online', 'free GMAT verbal practice',
    'logical reasoning for competitive exams', 'SSC reasoning practice',
    'UPSC logical reasoning', 'CAT logical reasoning',
    'free reading comprehension test', 'inference based questions',
    'statement and assumption practice', 'cause and effect reasoning',
    'verbal ability test', 'english comprehension practice',
    'aptitude test reasoning', 'analytical ability test',
    'free online reasoning quiz', 'daily reasoning practice',
  ],
  openGraph: {
    title: 'Inference Drill - Critical Reasoning Practice | SkillDrills',
    description: '12 unique critical reasoning passages with detailed rationales. LSAT & GMAT style. Free, no sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/comprehension/inference-drill',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Inference Analytics Drill - Critical Reasoning Practice',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inference Drill - Critical Reasoning | SkillDrills',
    description: 'Master critical reasoning with 12 passages and detailed rationales. Free, no sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/comprehension/inference-drill',
  },
};

export default function InferenceDrillPage() {
  return (
    <>
      <noscript>
        <h1>Inference Drill - Critical Reasoning & Logical Thinking Practice</h1>
        <p>Free interactive inference drill with 12 unique critical reasoning passages. LSAT & GMAT style. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Academic Drills", "item": "https://skilldrills.online/drills/academic" },
              { "@type": "ListItem", "position": 3, "name": "Comprehension", "item": "https://skilldrills.online/drills/academic/comprehension" },
              { "@type": "ListItem", "position": 4, "name": "Inference Drill" }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Inference Drill",
            "url": "https://skilldrills.online/drills/academic/comprehension/inference-drill",
            "description": "Free interactive inference drill with 12 unique critical reasoning passages covering logical flaws, causal analysis, paradox resolution, and argument evaluation. LSAT & GMAT style timed 60-second challenge with detailed answer rationales.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "isAccessibleForFree": true
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the Inference Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free interactive critical reasoning exercise with 12 unique passages covering logical flaws, causal analysis, paradox resolution, and argument evaluation. Each question includes detailed answer rationales."
                }
              },
              {
                "@type": "Question",
                "name": "Is this drill helpful for LSAT and GMAT preparation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The drill mirrors logical reasoning sections found on LSAT, GMAT, GRE, and CLAT. Question types including logical flaws, necessary assumptions, and parallel reasoning directly correspond to these exams."
                }
              },
              {
                "@type": "Question",
                "name": "How is the inference drill scored?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each correct answer earns +1 point. Wrong answers incur -1 point (score never goes below zero). Every 3 consecutive correct answers trigger a combo. Best score saves locally in your browser."
                }
              },
              {
                "@type": "Question",
                "name": "Is registration required?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration, no sign-up, and no login required. The inference drill is completely free and works instantly in your browser. Just visit and start practicing."
                }
              }
            ]
          })
        }}
      />

      <InferenceDrillClient />
    </>
  );
}