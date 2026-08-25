import RSVPReaderClient from './RSVPReaderClient';

export const metadata = {
  title: 'Reading Speed Test - Free RSVP Speed Reading Trainer',
  description: 'Train visual processing speed with RSVP target-detection. Words flash at the Optimal Recognition Point across 5 progressive levels, 250-850 WPM.',
  keywords: [
    'RSVP reader', 'speed reading tool', 'rapid serial visual presentation',
    'optimal recognition point training', 'reading speed training', 'WPM improvement',
    'speed reading practice', 'visual reading drill', 'fast reading practice online',
    'RSVP training', 'reading comprehension speed', 'cognitive reading',
    'free speed reading app', 'online RSVP reader',
    'word flashing reader', 'single point reading', 'fixation reading',
    'eye movement reduction', 'reading speed booster',
    'speed reading technique', 'rapid reading method', 'visual word recognition',
    'reading fluency training', 'text processing speed', 'reading efficiency',
    'speed reading for students', 'speed reading for professionals', 'exam reading prep',
    'IELTS reading practice', 'TOEFL reading speed', 'GRE verbal practice',
    'GMAT reading comprehension', 'SAT reading improvement',
    'speed reading for adults', 'beginner speed reading',
    'advanced speed reading', 'reading speed tracker', 'WPM calculator',
    'words per minute test', 'reading pace trainer', 'speed reading online free',
    'skilldrills RSVP', 'skilldrills speed reader', 'skilldrills reading drill',
    'free online reading tool', 'browser speed reader', 'no download RSVP',
  ],
  openGraph: {
    title: 'Reading Speed Test - Free RSVP Speed Reading Trainer',
    description: 'Train visual processing speed with RSVP target-detection. Words flash at the Optimal Recognition Point across 5 progressive levels, 250-850 WPM.',
    type: 'website',
    url: 'https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader',
    siteName: 'SkillDrills',
    locale: 'en_US',
    // No `images` here on purpose — opengraph-image.js in this folder generates a
    // proper 1200x630 card at build time and Next injects og:image automatically.
    // A manually hardcoded 512x512 icon here would be the wrong aspect ratio and
    // silently downgrade the twitter summary_large_image card.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reading Speed Test - Free RSVP Speed Reading Trainer',
    description: 'Train visual processing speed with RSVP target-detection. Words flash at the Optimal Recognition Point across 5 progressive levels, 250-850 WPM.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader',
  },
};

export default function RSVPReaderPage() {
  return (
    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Processing Speed", "item": "https://skilldrills.online/drills/cognitive/processing-speed" },
              { "@type": "ListItem", "position": 4, "name": "RSVP Speed Reader" }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "RSVP Speed Reader",
            "applicationCategory": "GameApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Free interactive RSVP target-detection drill. Words flash at the Optimal Recognition Point across 5 progressive levels from 250 to 850 WPM.",
            "genre": "Cognitive Training / Processing Speed",
            "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader",
            "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": "RSVP Speed Reader",
            "gamePlatform": "Web Browser",
            "genre": ["Cognitive Training", "Processing Speed Trainer"],
            "playMode": "SinglePlayer",
            "applicationCategory": "Game",
            "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
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
                "name": "How does the target word system work in RSVP Speed Reader?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The banner at top center displays an upcoming target word. Watch the focal stream as words flash. The moment the target word appears, tap 'TARGET DETECTED'. Once detected or passed, a new upcoming target word is assigned."
                }
              },
              {
                "@type": "Question",
                "name": "What is an RSVP speed reader?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RSVP (Rapid Serial Visual Presentation) displays words one at a time at a single focal point, eliminating saccadic eye movements. Words flash at the Optimal Recognition Point (ORP) for maximum reading throughput."
                }
              },
              {
                "@type": "Question",
                "name": "What are the 5 difficulty levels?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Level 1 (250 WPM), Level 2 (350 WPM), Level 3 (480 WPM), Level 4 (650 WPM), and Level 5 (850 WPM). Level increases progressively up to Level 5 as you hit target words with high precision."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Optimal Recognition Point (ORP)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The ORP is the position within a word where the human visual cortex can recognize it most efficiently — typically just left of center, weighted toward the beginning. Aligning each word at its ORP lets your eyes stay fixed at one point while still decoding the full word, accelerating visual token decoding."
                }
              },
              {
                "@type": "Question",
                "name": "Why do saccadic eye movements slow down normal reading?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In conventional reading, the eyes don't move smoothly across a line — they jump between fixation points (saccades) and pause briefly at each word. Research suggests up to 80% of reading time is spent on these jumps and pauses rather than actual word recognition. RSVP removes the jumps entirely by bringing the words to a fixed focal point instead."
                }
              },
              {
                "@type": "Question",
                "name": "Can RSVP training actually increase my reading speed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RSVP reliably increases raw word-recognition throughput because it removes eye-movement overhead, and regular practice measurably improves how quickly your visual cortex parses each flashed word. Comprehension at very high WPM tiers depends on the material and the reader, which is why this drill also tracks accuracy alongside speed rather than raw WPM alone."
                }
              },
              {
                "@type": "Question",
                "name": "Is RSVP the same technique used in speed-reading apps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. RSVP is the core mechanism behind most commercial speed-reading apps and browser extensions. This drill isolates the technique as a trainable cognitive skill — a target-detection task — rather than a passive reading tool, so you get a measurable score and progression instead of just a WPM counter."
                }
              },
              {
                "@type": "Question",
                "name": "What is a good WPM score for this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The average adult reads prose at 200-300 WPM with full comprehension. Reaching Level 3 (480 WPM) with high accuracy is a strong result; sustaining Level 5 (850 WPM) while still catching target words reliably puts you in elite speed-reading territory."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits most from RSVP training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Students processing dense reading loads, professionals who read large volumes of text daily, and competitive gamers who need to parse on-screen information streams quickly all benefit from sharper visual word-recognition speed."
                }
              },
              {
                "@type": "Question",
                "name": "Is this RSVP speed reader free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. SkillDrills RSVP Speed Reader is 100% free with no ads, downloads, or registration required. It runs entirely in your browser on desktop and mobile."
                }
              }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Play RSVP Speed Reader",
            "description": "Step-by-step instructions for training reading speed and processing speed with the SkillDrills RSVP trainer.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Watch the Word Stream",
                "text": "Words flash rapidly at a single focal point (Optimal Recognition Point) in the central display."
              },
              {
                "@type": "HowToStep",
                "name": "Track the Target Word",
                "text": "A designated target word is assigned at the start of each passage segment — watch the stream closely for it."
              },
              {
                "@type": "HowToStep",
                "name": "Tap on Detection",
                "text": "Tap 'Target Detected' immediately when the designated target word flashes. Every 200 points earned increases your level and reading speed, up to 850 WPM. Wrong taps and missed targets cost 1 of your 5 lives."
              }
            ]
          })
        }}
      />

      <RSVPReaderClient />
    </>
  );
}