import StopwatchClickClient from './StopwatchClickClient';

export const metadata = {
  title: "Stopwatch Click Test - Free Stopwatch Game | SkillDrills",
  description: "Test your timing reflexes with our free online stopwatch game. Challenge yourself with the 10-second timing accuracy test and measure your mental chronometry.",
  keywords: [
    "stopwatch game",
    "10 second stopwatch game",
    "stopwatch timing test",
    "mental chronometry test",
    "stopwatch accuracy test",
    "stopwatch reaction test",
    "stopwatch challenge online",
    "stop at 10 seconds game",
    "reaction time test stopwatch",
    "cognitive processing speed test",
    "time estimation test",
    "time perception test",
    "precision timing game"
  ],
  openGraph: {
    title: "Stopwatch Click Test - Free Stopwatch Game | SkillDrills",
    description: "Test your timing reflexes with our free online stopwatch game. Challenge yourself with the 10-second timing accuracy test and measure your mental chronometry.",
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Stopwatch Click Test - Free Stopwatch Game',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Stopwatch Click Test - Free Stopwatch Game | SkillDrills",
    description: "Test your timing reflexes with our free online stopwatch game. Challenge yourself with the 10-second timing accuracy test and measure your mental chronometry.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click',
  },
};

export default function StopwatchClickPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Timing Accuracy", "item": "https://skilldrills.online/drills/motor/timing-accuracy" },
      { "@type": "ListItem", "position": 4, "name": "Stopwatch Timing Test", "item": "https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Stopwatch Click Test - Free Stopwatch Game",
    "url": "https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click",
    "description": "Free mental chronometry and stopwatch timing game. Memorize dynamic target times and click exactly when the duration elapses using only your internal clock. Features adaptive difficulty and endless survival mechanics.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires a modern web browser with JavaScript support.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "SkillDrills" },
    "isAccessibleForFree": true,
    "learningResourceType": "Educational Game",
    "teaches": "Mental Chronometry, Time Estimation, Rhythm Synchronization, Internal Clock Calibration, Focus"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Stopwatch Click game?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Stopwatch Click is an online reaction and timing game where you test your motor coordination and temporal estimation by stopping a running stopwatch at precise intervals, similar to the viral 10-second stopwatch challenge."
        }
      },
      {
        "@type": "Question",
        "name": "How does this stopwatch timing test measure reaction speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By recording the millisecond difference between the target time and your actual click time, this stopwatch timing test evaluates your visual-motor anticipation and mental chronometry (cognitive processing speed)."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this game to improve my mental chronometry and reflexes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Regular practice on timing accuracy drills helps train visual-motor anticipation, neural processing speed, and motor output control, leading to faster and more consistent reaction times."
        }
      },
      {
        "@type": "Question",
        "name": "What is Mental Chronometry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mental chronometry is the scientific study of processing speed and internal time perception. It measures how accurately a human brain can estimate elapsed time without external visual or auditory cues."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is the human internal clock?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For short durations (under 2 seconds), humans are generally accurate within 100-200 milliseconds. For longer durations (5+ seconds), the error variance increases significantly without rhythmic subdivisions."
        }
      },
      {
        "@type": "Question",
        "name": "Is this useful for musicians?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Musicians, especially drummers, rely heavily on internal tempo. This drill acts as a strict metronome test, forcing you to subdivide time mentally without an audible click track."
        }
      },
      {
        "@type": "Question",
        "name": "Can gamers benefit from a Stopwatch Timing Test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, highly competitive gamers use internal timing for tracking ability cooldowns, respawn timers, and weapon reload cycles in games like Overwatch, League of Legends, and Valorant."
        }
      },
      {
        "@type": "Question",
        "name": "How does the survival scoring work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You start with 60 seconds. Accurate clicks reward you with additional time (up to +10s) and combo multipliers. Misses deduct 3 seconds from your clock. The game ends when your time runs out."
        }
      },
      {
        "@type": "Question",
        "name": "How does the difficulty increase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As your score increases, the game levels up. Target times become longer and more unpredictable, the memorization phase shortens, and transitions become significantly faster, creating intense mental pressure."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Internal Timing Accuracy",
    "description": "Step-by-step instructions to train time estimation and stopwatch click reflexes.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Memorize the target duration",
        "text": "Press Start. Look at the display to register the target interval target time (e.g. 5.00 seconds)."
      },
      {
        "@type": "HowToStep",
        "name": "Trigger internal clock countdown",
        "text": "When the watch disappears or begins counting, track the milliseconds mentally using rhythmic subdivisions."
      },
      {
        "@type": "HowToStep",
        "name": "Click at the exact target millisecond",
        "text": "Tap the click target at the exact moment you estimate the target duration has elapsed to score a perfect combo."
      }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <StopwatchClickClient />
    </>
  );
}