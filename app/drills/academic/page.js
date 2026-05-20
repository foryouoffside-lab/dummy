import AcademicDrillsClient from './AcademicDrillsClient';

export const metadata = {
  title: 'Free Academic Training Drills - Math Speed Reading Typing & Comprehension Practice | SkillDrills',
  description: 'Master academic skills with 12 free interactive training drills. Improve mental math arithmetic multiplication tables speed reading RSVP peripheral vision reading comprehension listening comprehension inference critical reasoning code typing and typing speed. Perfect for students competitive exam preparation and lifelong learners. No sign-up required start practicing instantly.',
  keywords: [
    'academic drills', 'math practice online', 'speed reading training', 'typing test free',
    'comprehension training', 'mental arithmetic practice', 'multiplication tables drill',
    'RSVP reader online', 'peripheral vision training', 'code typing practice free',
    'listening comprehension test', 'inference drills', 'critical reasoning practice',
    'free educational games', 'brain training academic', 'academic skills improvement',
    'math speed test', 'reading speed test', 'writing speed practice',
    'arithmetic race', 'math reaction drill', 'mental math online',
    'factor recall', 'times tables practice', 'speed reader free',
    'column scanner reading', 'RSVP speed reader', 'code typing JavaScript Python HTML',
    'typing speed test online', 'WPM test free', 'reading comprehension quiz',
    'listening skills test', 'inference analytics', 'logical reasoning practice',
    'LSAT practice free', 'GMAT verbal practice', 'GRE preparation',
    'SAT reading practice', 'ACT prep drills', 'CAT exam practice',
    'UPSC preparation', 'SSC exam practice', 'banking exam training',
    'free student resources', 'online learning tools', 'educational drills free',
    'skilldrills academic', 'skilldrills math drills', 'skilldrills reading',
    'free academic practice', 'online study tools', 'exam preparation free',
  ],
  openGraph: {
    title: 'Free Academic Training Drills - Math Speed Reading Typing & Comprehension | SkillDrills',
    description: '12 free interactive academic drills. Math, reading, writing, comprehension. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/academic',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Academic Training Drills - Math Reading Writing Comprehension',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Academic Training Drills | SkillDrills',
    description: '12 free drills for math, reading, typing, and comprehension.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic',
    languages: {
      'en': 'https://skilldrills.online/drills/academic',
      'en-US': 'https://skilldrills.online/drills/academic',
      'x-default': 'https://skilldrills.online/drills/academic',
    },
  },
  verification: {
    google: 'bf3e19be4c41802b',
  },
};

export default function AcademicDrillsPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Academic Training Drills" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Academic Training Drills - Math Reading Writing & Comprehension",
            "url": "https://skilldrills.online/drills/academic",
            "description": "12 free interactive academic skill training drills covering math speed, reading speed, writing speed, and comprehension. Improve mental arithmetic, multiplication tables, RSVP reading, peripheral vision, code typing, typing speed, listening comprehension, inference, and critical reasoning.",
            "provider": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "isAccessibleForFree": true,
            "hasPart": [
              { "@type": "WebApplication", "name": "Arithmetic Race", "url": "https://skilldrills.online/drills/academic/math-speed/arithmetic-race", "description": "Speed math drill with addition subtraction and multiplication" },
              { "@type": "WebApplication", "name": "Math Reaction", "url": "https://skilldrills.online/drills/academic/math-speed/Math-Reaction", "description": "Odd even parity reaction training" },
              { "@type": "WebApplication", "name": "Mental Math", "url": "https://skilldrills.online/drills/academic/math-speed/mental-math", "description": "Advanced mental calculation challenges" },
              { "@type": "WebApplication", "name": "Multiplication Tables", "url": "https://skilldrills.online/drills/academic/math-speed/multiplication-tables", "description": "Times tables practice with intelligent prioritization" },
              { "@type": "WebApplication", "name": "Peripheral Vision", "url": "https://skilldrills.online/drills/academic/reading-speed/peripheral-reader", "description": "Extrafoveal vision training for reading" },
              { "@type": "WebApplication", "name": "RSVP Speed Reader", "url": "https://skilldrills.online/drills/academic/reading-speed/rsvp-reader", "description": "Rapid Serial Visual Presentation training" },
              { "@type": "WebApplication", "name": "Column Scanner", "url": "https://skilldrills.online/drills/academic/reading-speed/speed-reader", "description": "Columnar reading with adjustable speed and width" },
              { "@type": "WebApplication", "name": "Code Typing", "url": "https://skilldrills.online/drills/academic/writing-speed/code-typing", "description": "JavaScript Python HTML syntax practice" },
              { "@type": "WebApplication", "name": "Typing Speed Test", "url": "https://skilldrills.online/drills/academic/writing-speed/typing-test", "description": "WPM test with 30 quotes across 3 levels" },
              { "@type": "WebApplication", "name": "Inference Analytics", "url": "https://skilldrills.online/drills/academic/comprehension/inference-drill", "description": "Critical reasoning and logical thinking" },
              { "@type": "WebApplication", "name": "Listening Comprehension", "url": "https://skilldrills.online/drills/academic/comprehension/listening-comprehension", "description": "Audio memory and auditory processing" },
              { "@type": "WebApplication", "name": "Reading Comprehension", "url": "https://skilldrills.online/drills/academic/comprehension/reading-comprehension", "description": "RSVP reading with comprehension quizzes" }
            ]
          })
        }}
      />
      <AcademicDrillsClient />
    </>
  );
}