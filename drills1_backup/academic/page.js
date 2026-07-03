import AcademicDrillsClient from './AcademicDrillsClient';

export const metadata = {
  title: 'Academic Drills - Math, Reading & Typing | SkillDrills',
  description: 'Master academic skills with 12 free interactive drills. Improve mental math, speed reading, typing speed, and comprehension. No sign-up required.',
  keywords: [
    'academic drills', 'math practice online', 'speed reading training', 'typing test free',
    'comprehension training', 'mental arithmetic practice', 'multiplication tables drill',
    'RSVP reader online', 'code typing practice free',
    'listening comprehension test', 'inference drills', 'critical reasoning practice',
    'free educational games', 'brain training academic', 'academic skills improvement',
    'math speed test', 'reading speed test', 'writing speed practice',
    'arithmetic race', 'math reaction drill', 'mental math online',
    'times tables practice', 'speed reader free',
    'RSVP speed reader', 'code typing JavaScript Python HTML',
    'typing speed test online', 'WPM test free', 'reading comprehension quiz',
    'listening skills test', 'inference analytics', 'logical reasoning practice',
    'LSAT practice free', 'GMAT verbal practice', 'GRE preparation',
    'free student resources', 'online learning tools', 'educational drills free',
    'skilldrills academic', 'skilldrills math drills', 'skilldrills reading',
    'free academic practice', 'online study tools', 'exam preparation free',
  ],
  openGraph: {
    title: 'Academic Drills - Math, Reading & Typing | SkillDrills',
    description: '12 free interactive academic drills. Improve math, reading, typing, and comprehension.',
    type: 'website',
    url: 'https://skilldrills.online/drills/academic',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Academic Training Drills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Academic Drills - Math, Reading & Typing | SkillDrills',
    description: '12 free drills for math, reading, typing, and comprehension.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic',
  },
};

export default function AcademicDrillsPage() {
  return (
    <>
      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" }, { "@type": "ListItem", "position": 2, "name": "Academic Training Drills" } ] }) }} />

      {/* CollectionPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", "name": "Academic Training Drills", "url": "https://skilldrills.online/drills/academic", "description": "12 free interactive academic skill training drills covering math speed, reading speed, writing speed, and comprehension.", "provider": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" }, "isAccessibleForFree": true, "hasPart": [ { "@type": "WebApplication", "name": "Arithmetic Race", "url": "https://skilldrills.online/drills/academic/math-speed/arithmetic-race" }, { "@type": "WebApplication", "name": "Math Reaction", "url": "https://skilldrills.online/drills/academic/math-speed/Math-Reaction" }, { "@type": "WebApplication", "name": "Mental Math", "url": "https://skilldrills.online/drills/academic/math-speed/mental-math" }, { "@type": "WebApplication", "name": "Multiplication Tables", "url": "https://skilldrills.online/drills/academic/math-speed/multiplication-tables" }, { "@type": "WebApplication", "name": "Peripheral Reader", "url": "https://skilldrills.online/drills/academic/reading-speed/peripheral-reader" }, { "@type": "WebApplication", "name": "RSVP Speed Reader", "url": "https://skilldrills.online/drills/academic/reading-speed/rsvp-reader" }, { "@type": "WebApplication", "name": "Speed Reader", "url": "https://skilldrills.online/drills/academic/reading-speed/speed-reader" }, { "@type": "WebApplication", "name": "Code Typing", "url": "https://skilldrills.online/drills/academic/writing-speed/code-typing" }, { "@type": "WebApplication", "name": "Typing Speed Test", "url": "https://skilldrills.online/drills/academic/writing-speed/typing-test" }, { "@type": "WebApplication", "name": "Inference Analytics", "url": "https://skilldrills.online/drills/academic/comprehension/inference-drill" }, { "@type": "WebApplication", "name": "Listening Comprehension", "url": "https://skilldrills.online/drills/academic/comprehension/listening-comprehension" }, { "@type": "WebApplication", "name": "Reading Comprehension", "url": "https://skilldrills.online/drills/academic/comprehension/reading-comprehension" } ] }) }} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "What academic drills are available?", "acceptedAnswer": { "@type": "Answer", "text": "SkillDrills offers 12 free academic training drills across 4 categories: Math Speed, Reading Speed, Writing Speed, and Comprehension. All drills are free with no sign-up required." } }, { "@type": "Question", "name": "Are these helpful for exam preparation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Helps with LSAT, GMAT, GRE, SAT, ACT, CAT, UPSC, SSC, and banking exams." } }, { "@type": "Question", "name": "Do I need to create an account?", "acceptedAnswer": { "@type": "Answer", "text": "No registration or login required. All 12 academic drills are completely free and work instantly in your browser." } } ] }) }} />

      <AcademicDrillsClient />
    </>
  );
}