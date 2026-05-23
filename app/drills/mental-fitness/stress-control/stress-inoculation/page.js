import StressInoculationClient from './StressInoculationClient';

export const metadata = {
  title: 'Stress Inoculation Drill - Controlled Exposure & Resilience | SkillDrills',
  description: 'Build stress resilience with controlled exposure. Maintain 5:6 breathing while red strobe and 880Hz audio challenge focus. 2x points under stress. No sign-up.',
  keywords: [
    'stress inoculation drill', 'stress resilience training', 'controlled stress exposure',
    'stress tolerance drill', 'mental toughness training', 'stress management practice',
    'coherence under stress', 'red strobe stress training', 'audio stress induction',
    'resilience building', 'focus under pressure', 'stress adaptation training',
    'free stress training', 'vagal tone stress', 'parasympathetic recovery',
    'coherence breathing', 'stress inoculation training', 'mental resilience drill',
    'stress exposure therapy', 'controlled stress practice', 'resilience drill online',
    'stress tolerance building', 'emotional regulation training', 'stress recovery drill',
    'free mental fitness', 'stress management online', 'resilience training free',
    'skilldrills stress', 'skilldrills resilience', 'free stress drill',
    'stress inoculation for professionals', 'stress training for students', 'stress training for athletes',
    'anxiety management drill', 'pressure tolerance training', 'stress hardiness',
    'psychological resilience', 'stress coping skills', 'stress inoculation online',
    'free resilience practice', 'browser stress drill', 'no download stress training',
  ],
  openGraph: {
    title: 'Stress Inoculation Drill - Resilience Training | SkillDrills',
    description: 'Build stress resilience with controlled exposure. 5:6 breathing, red strobe. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/mental-fitness/stress-control/stress-inoculation',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Stress Inoculation Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stress Inoculation Drill | SkillDrills',
    description: 'Build stress resilience with controlled exposure. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/stress-control/stress-inoculation',
  },
};

export default function StressInoculationPage() {
  return (
    <>
      <noscript>
        <h1>Stress Inoculation Drill - Controlled Stress Exposure & Resilience Training</h1>
        <p>Free stress inoculation drill with 5:6 breathing under red strobe and audio stress induction. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Mental Fitness", "item": "https://skilldrills.online/drills/mental-fitness" },
              { "@type": "ListItem", "position": 3, "name": "Stress Control", "item": "https://skilldrills.online/drills/mental-fitness/stress-control" },
              { "@type": "ListItem", "position": 4, "name": "Stress Inoculation" }
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
            "name": "Stress Inoculation Drill",
            "url": "https://skilldrills.online/drills/mental-fitness/stress-control/stress-inoculation",
            "description": "Free stress inoculation drill with controlled exposure. Maintain 5:6 breathing during red strobe and 880Hz audio stress. 2x points during 90s stress phase.",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
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
                "name": "What is stress inoculation training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A psychological technique building resilience through controlled stress exposure. Red strobe and 880Hz audio combined with 5:6 coherence breathing."
                }
              },
              {
                "@type": "Question",
                "name": "How does the stress phase work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Activates 30s-120s into session. Red strobe at 2.5Hz and 880Hz tone play while you continue breathing. 2x points for coherence under stress."
                }
              },
              {
                "@type": "Question",
                "name": "Is this suitable for anxiety?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, builds tolerance to stress signals through controlled exposure. Not a replacement for professional mental health treatment."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This stress inoculation drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <StressInoculationClient />
    </>
  );
}