import MarketDoorsPursuitWrapper from './MarketDoorsPursuitWrapper';

export const metadata = {
  title: "Reaction Speed Training - Market Doors Pursuit Reflex Drill | SkillDrills",
  description: "Train your reaction time, gaming reflexes, and visual tracking with Market Doors Purs... Play free in your browser with no downloads or registration required.",
  keywords: [
    "market doors pursuit",
    "market doors pursuit training",
    "market doors pursuit game",
    "market doors pursuit test",
    "market doors pursuit online",
    "free market doors pursuit",
    "visual reaction speed test",
    "reflex latency test online",
    "average reaction time test",
    "click reaction speed light",
    "reflex training games",
    "gaming reflex trainer",
    "saccadic latency check",
    "latency calibration online",
    "auditory reaction time"
],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/market-doors-pursuit',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Reaction Speed Training - Market Doors Pursuit Reflex Drill | SkillDrills",
    description: "Train your reaction time, gaming reflexes, and visual tracking with Market Doors Purs... Play free in your browser with no downloads or registration required.",
    url: 'https://skilldrills.online/drills/reaction-speed/market-doors-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Reaction Speed Training - Market Doors Pursuit Reflex Drill | SkillDrills",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Reaction Speed Training - Market Doors Pursuit Reflex Drill | SkillDrills",
    description: "Train your reaction time, gaming reflexes, and visual tracking with Market Doors Purs... Play free in your browser with no downloads or registration required.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function MarketDoorsPursuitPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://skilldrills.online',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Drills Hub',
        item: 'https://skilldrills.online/drills',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Reaction Speed',
        item: 'https://skilldrills.online/drills/reaction-speed',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Market Doors Pursuit',
        item: 'https://skilldrills.online/drills/reaction-speed/market-doors-pursuit',
      },
    ],
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Market Doors Pursuit Trainer',
    url: 'https://skilldrills.online/drills/reaction-speed/market-doors-pursuit',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    isAccessibleForFree: true,
    description: 'Train reaction speed, visual pursuit tracking, and saccadic eye movements. A free device-adaptive visual reflex simulator for mobile and desktop.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'SkillDrills',
    },
  };

  const educationalSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalApplication',
    name: 'Market Doors Pursuit Trainer',
    description: 'Isolates and trains foveal scanning, rapid target acquisition, visual pursuit, and hand-eye reaction speed across multiple entry points.',
    applicationCategory: 'EducationalGame',
    operatingSystem: 'Web Browser',
    isAccessibleForFree: true,
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Train Market Doors Pursuit Reflexes',
    description: 'Improve horizontal eye sweeps and threat recognition speed against visual targets popping up behind five shifting entry doors.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Launch the Drill',
        text: 'Click the Start reflex drill button to enter the fullscreen viewport. Choose your preferred target color preset.',
      },
      {
        '@type': 'HowToStep',
        name: 'Scan the Five Entry Doors',
        text: 'Keep your gaze alert across the horizontal line of doors, anticipating target sweeps and exposures.',
      },
      {
        '@type': 'HowToStep',
        name: 'Track and Eliminate Targets',
        text: 'As a target flashes inside an open door, click or tap it immediately before it goes out of view.',
      },
      {
        '@type': 'HowToStep',
        name: 'Maintain a Clean Streak',
        text: 'Avoid miss clicks or timeouts to prevent losing time. Surpass level thresholds to unlock faster transitions.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Market Doors Pursuit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Market Doors Pursuit is a reaction speed training game designed to improve visual scanning and target acquisition. Players scan five entry points horizontally and react immediately as targets peek out behind doors.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does this improve reaction speed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'By conditioning your visual processing speed and ocular muscles. The game shortens the time required for your brain to recognize a stimulus and coordinate a physical mouse click or screen tap response.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does this improve gaming performance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It sharpens threat checking, saccadic eye movements, and spatial awareness. Gamers learn to check multiple entry points or visual sectors rapidly and stabilize their crosshairs on emerging targets.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this help Valorant players?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. In Valorant, clearing sites and holding angles involves checking multiple entry routes sequentially. This drill simulates sweeping entry spots and catching peeking enemies instantly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this help CS2 players?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. It develops visual agility for scanning choke points and entry paths. It builds fast reflexes for reacting to rapid shoulder-peeks and sudden encounters.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this improve visual tracking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The horizontal layouts and rapid sector switches stimulate smooth pursuit and saccadic eye movements, training your eyes to lock onto moving targets with high accuracy.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does score-based progression work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Difficulty automatically scales with your score. As you hit targets and score points, you progress from Level 1 to Level 6+, which shortens the target visibility duration and speeds up door transitions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I play on mobile?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The game fully supports mobile touch, trackpad, stylus, and mouse controls. It recommends landscape mode for an optimal visual layout and includes auto-fullscreen support.',
        },
      },
    ],
  };

  return (
    <>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Market Doors Pursuit drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A free interactive exercise designed to train specialized cognitive and motor skills. This drill measures your performance, speed, and accuracy in real-time, helping you build core neural pathways."
      }
    },
    {
      "@type": "Question",
      "name": "How does the scoring system work in Market Doors Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You receive points for correct inputs and actions, with penalties applied for errors or misses. The goal is to maximize your accuracy and speed within the time limit to set a high score."
      }
    },
    {
      "@type": "Question",
      "name": "What skills does this training routine improve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This drill is specifically designed to target and improve your reaction-speed capabilities, including reaction latency, visual search efficiency, spatial coordination, and fine motor precision."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Market Doors Pursuit drill completely free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all training games on SkillDrills are 100% free, run directly in your desktop browser without any ads, and require no account registration or sign-up."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For optimal skill transfer, we recommend a short daily warm-up session of 10 to 15 minutes. Consistent daily practice yields much better cognitive and muscle-memory retention than infrequent long sessions."
      }
    },
    {
      "@type": "Question",
      "name": "Can this drill improve my in-game competitive performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. By targeting fundamental reflexes, spatial awareness, and cognitive processing speed, the skills developed here translate directly to faster decision-making and mechanical execution in fast-paced games."
      }
    },
    {
      "@type": "Question",
      "name": "What are the system requirements for this online game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This drill runs entirely in your web browser. A standard desktop computer, modern browser, and a stable mouse or keyboard input are all that is required for optimal performance."
      }
    },
    {
      "@type": "Question",
      "name": "Do you collect or track my telemetry data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Your data, scores, and reaction times are processed locally inside your web browser. No personal telemetry is transmitted to our servers."
      }
    }
  ]
})
        }}
      />
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MarketDoorsPursuitWrapper />

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 mt-8 border-t border-slate-900" aria-label="Frequently Asked Questions">
        <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">What is the Market Doors Pursuit drill?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">A free interactive exercise designed to train specialized cognitive and motor skills. This drill measures your performance, speed, and accuracy in real-time, helping you build core neural pathways.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the scoring system work in Market Doors Pursuit?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">You receive points for correct inputs and actions, with penalties applied for errors or misses. The goal is to maximize your accuracy and speed within the time limit to set a high score.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">What skills does this training routine improve?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">This drill is specifically designed to target and improve your reaction-speed capabilities, including reaction latency, visual search efficiency, spatial coordination, and fine motor precision.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">Is the Market Doors Pursuit drill completely free?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes, all training games on SkillDrills are 100% free, run directly in your desktop browser without any ads, and require no account registration or sign-up.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">How often should I practice this drill?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">For optimal skill transfer, we recommend a short daily warm-up session of 10 to 15 minutes. Consistent daily practice yields much better cognitive and muscle-memory retention than infrequent long sessions.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">Can this drill improve my in-game competitive performance?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes. By targeting fundamental reflexes, spatial awareness, and cognitive processing speed, the skills developed here translate directly to faster decision-making and mechanical execution in fast-paced games.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">What are the system requirements for this online game?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">This drill runs entirely in your web browser. A standard desktop computer, modern browser, and a stable mouse or keyboard input are all that is required for optimal performance.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">Do you collect or track my telemetry data?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">No. Your data, scores, and reaction times are processed locally inside your web browser. No personal telemetry is transmitted to our servers.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
