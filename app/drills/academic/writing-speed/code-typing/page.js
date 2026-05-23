import CodeTypingClient from './CodeTypingClient';

export const metadata = {
  title: 'Code Typing Speed Test - JS, Python & HTML Practice | SkillDrills',
  description: 'Improve coding speed with real JavaScript, Python, and HTML snippets. 70+ snippets, dynamic timer, WPM tracking, and accuracy stats. No sign-up.',
  keywords: [
    'code typing test', 'coding speed test', 'programming typing practice',
    'JavaScript typing practice', 'Python typing test', 'HTML typing drill',
    'developer typing speed', 'syntax typing practice', 'code typing drill online',
    'coding accuracy test', 'programming practice online', 'typing speed for coders',
    'code snippet typing', 'coding WPM test', 'free code typing test',
    'web developer typing', 'software engineer typing', 'coding bootcamp practice',
    'learn to code faster', 'improve coding speed', 'type code faster',
    'programming keyboard skills', 'code syntax practice', 'real code typing',
    'JavaScript syntax drill', 'Python syntax practice', 'HTML syntax typing',
    'frontend typing practice', 'backend typing drill',
    'coding interview preparation', 'technical interview typing',
    'WPM for programmers', 'coding accuracy improvement', 'keyboard speed developer',
    'skilldrills code typing', 'skilldrills coding drill', 'free programming practice',
    'online coding exercise', 'browser code typing', 'no download code practice',
  ],
  openGraph: {
    title: 'Code Typing Speed Test - JS, Python & HTML | SkillDrills',
    description: 'Type real code in JS, Python, HTML. 70+ snippets, WPM tracking. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/writing-speed/code-typing',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Code Typing Speed Test',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Typing Speed Test | SkillDrills',
    description: 'Type real JS, Python, HTML code. Track WPM & accuracy. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/writing-speed/code-typing',
  },
};

export default function CodeTypingPage() {
  return (
    <>
      <noscript>
        <h1>Code Typing Speed Test - JavaScript, Python & HTML Practice</h1>
        <p>Free code typing drill with 70+ real code snippets across 3 programming languages. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Writing Speed", "item": "https://skilldrills.online/drills/academic/writing-speed" },
              { "@type": "ListItem", "position": 4, "name": "Code Typing" }
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
            "name": "Code Typing Speed Test",
            "url": "https://skilldrills.online/drills/academic/writing-speed/code-typing",
            "description": "Free interactive code typing test with 70+ real code snippets in JavaScript, Python, and HTML. Dynamic timer, WPM tracking, and accuracy stats.",
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
                "name": "What is the Code Typing Speed Test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free drill with 70+ real code snippets in JavaScript, Python, and HTML. Each snippet has a dynamic 15-45 second timer. Track WPM, accuracy, and combo streaks."
                }
              },
              {
                "@type": "Question",
                "name": "What programming languages are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "JavaScript (25 snippets), Python (23 snippets), and HTML (22 snippets). Switch languages anytime between sessions."
                }
              },
              {
                "@type": "Question",
                "name": "Is this helpful for coding interviews?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Technical interviews require coding under time pressure. This drill builds typing fluency and syntax accuracy for interview success."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This code typing test is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <CodeTypingClient />
    </>
  );
}