import SpeedReaderClient from './SpeedReaderClient';

export const metadata = {
  title: "Column Scanner - Academic Training & Focus Drill | SkillDrills",
  description: "Train columnar reading with 10 rotating text columns. Adjustable 100-800 WPM speed and 200-500px column width. 60-second challenge. No sign-up.",
  keywords: [
    "speed reader",
    "speed reader training",
    "speed reader game",
    "speed reader test",
    "speed reader online",
    "free speed reader",
    "speed reading training online",
    "RSVP reader tool",
    "typing speed test",
    "mental math drills",
    "academic skills improvement",
    "improve reading speed",
    "words per minute test",
    "comprehension exercises",
    "WPM booster online"
],
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/speed-reader',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Column Scanner - Academic Training & Focus Drill | SkillDrills",
    description: "Train columnar reading with 10 rotating text columns. Adjustable 100-800 WPM speed and 200-500px column width. 60-second challenge. No sign-up.",
    url: 'https://skilldrills.online/drills/academic/speed-reader',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Column Scanner - Academic Training & Focus Drill | SkillDrills",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Column Scanner - Academic Training & Focus Drill | SkillDrills",
    description: "Train columnar reading with 10 rotating text columns. Adjustable 100-800 WPM speed and 200-500px column width. 60-second challenge. No sign-up.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function SpeedReaderPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Academic Drills", "item": "https://skilldrills.online/drills/academic" },
              { "@type": "ListItem", "position": 3, "name": "Reading Speed", "item": "https://skilldrills.online/drills/academic/reading-speed" },
              { "@type": "ListItem", "position": 4, "name": "Column Scanner" }
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
            "name": "Column Scanner Speed Reader",
            "url": "https://skilldrills.online/drills/academic/reading-speed/speed-reader",
            "description": "Free interactive column scanner with 10 rotating text columns. Adjustable speed 100-800 WPM and column width 200-500px. 60-second timed challenge.",
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
      "name": "What is the Speed Reader drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A free interactive exercise designed to train specialized cognitive and motor skills. This drill measures your performance, speed, and accuracy in real-time, helping you build core neural pathways."
      }
    },
    {
      "@type": "Question",
      "name": "How does the scoring system work in Speed Reader?",
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
        "text": "This drill is specifically designed to target and improve your academic capabilities, including reaction latency, visual search efficiency, spatial coordination, and fine motor precision."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Speed Reader drill completely free?",
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

      <SpeedReaderClient />

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 mt-8 border-t border-slate-900" aria-label="Frequently Asked Questions">
        <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">What is the Speed Reader drill?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">A free interactive exercise designed to train specialized cognitive and motor skills. This drill measures your performance, speed, and accuracy in real-time, helping you build core neural pathways.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">How does the scoring system work in Speed Reader?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">You receive points for correct inputs and actions, with penalties applied for errors or misses. The goal is to maximize your accuracy and speed within the time limit to set a high score.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">What skills does this training routine improve?</h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">This drill is specifically designed to target and improve your academic capabilities, including reaction latency, visual search efficiency, spatial coordination, and fine motor precision.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200 tracking-tight">Is the Speed Reader drill completely free?</h4>
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