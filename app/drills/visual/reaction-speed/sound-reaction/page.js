import NeuroSwitchClient from './NeuroSwitchClient';

export const metadata = {
  title: 'Neuro-Switch Drill - Sound Reaction Speed Training | SkillDrills',
  description: 'Train auditory reaction speed with dual pitch cues. High pitch (1200Hz) = Green, Low pitch (250Hz) = Red. Adaptive 300-1000ms window. No sign-up.',
  keywords: [
    'sound reaction test', 'audio reaction speed', 'auditory cue training',
    'sound reaction drill', 'pitch discrimination', 'audio reflex training',
    'sound response test', 'high pitch low pitch', 'neuro switch drill',
    'auditory processing speed', 'reaction to sound', 'free sound reaction test',
    'audio stimulus training', 'cognitive flexibility drill',
    'neuro switch free', 'sound reaction drill free', 'audio cue game',
    'dual pitch training', 'auditory reaction game', 'sound response speed',
    'pitch response drill', 'audio reflex test', 'sound cue reaction',
    'skilldrills neuro switch', 'skilldrills sound reaction', 'skilldrills auditory',
    'green circle red circle', 'audio command training', 'sound discrimination drill',
    'reaction time audio', 'auditory processing drill', 'sound switch game',
  ],
  openGraph: {
    title: 'Neuro-Switch Drill - Sound Reaction Speed | SkillDrills',
    description: 'High pitch = Green. Low pitch = Red. Adaptive window. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/reaction-speed/sound-reaction',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Neuro-Switch Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neuro-Switch Drill | SkillDrills',
    description: 'High pitch = Green. Low pitch = Red. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/reaction-speed/sound-reaction',
  },
};

export default function NeuroSwitchPage() {
  return (
    <>
      <noscript>
        <h1>Neuro-Switch Drill - Sound Reaction Speed & Audio Cue Training</h1>
        <p>Free auditory reaction drill with dual pitch cues. High pitch = Green, Low pitch = Red. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/visual/reaction-speed" },
              { "@type": "ListItem", "position": 4, "name": "Neuro-Switch" }
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
            "name": "Neuro-Switch Drill",
            "url": "https://skilldrills.online/drills/visual/reaction-speed/sound-reaction",
            "description": "Free auditory reaction drill. High pitch (1200Hz) = Green circle. Low pitch (250Hz) = Red circle. Adaptive 300-1000ms window. 3 lives.",
            "applicationCategory": "EducationalApplication",
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
                "name": "What is the Neuro-Switch Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free auditory reaction exercise. High pitch (1200Hz sine) = Green. Low pitch (250Hz sawtooth) = Red. Adaptive 300-1000ms response window."
                }
              },
              {
                "@type": "Question",
                "name": "How does pitch-to-color mapping work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Listen to the audio cue. High tone = click GREEN circle. Low tone = click RED circle. Circles appear after the sound. Command shown as text."
                }
              },
              {
                "@type": "Question",
                "name": "What cognitive skills improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Auditory reaction speed, pitch discrimination, cognitive flexibility, dual processing, and response inhibition."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This sound reaction drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <NeuroSwitchClient />
    </>
  );
}