import InferenceDrillClient from './InferenceDrillClient';

export const metadata = {
  title: 'Critical Reasoning Practice Test - LSAT & GMAT Logic Questions | SkillDrills',
  description:
    'Practice critical reasoning with logical flaws, assumptions, argument evaluation, causal reasoning, inference questions, and LSAT-style logic problems. Free online critical thinking test with explanations.',
  keywords: [
    'critical reasoning practice',
    'logical reasoning questions',
    'logical reasoning practice test',
    'critical thinking exercises',
    'critical reasoning questions and answers',
    'logical inference questions',
    'argument analysis practice',
    'LSAT logical reasoning practice',
    'GMAT critical reasoning practice',
    'GRE verbal reasoning practice',
    'logical reasoning test online',
    'critical thinking test',
    'logical fallacies practice',
    'cause and effect reasoning questions',
    'necessary assumption questions',
    'sufficient assumption questions',
    'strengthen weaken argument questions',
    'parallel reasoning questions',
    'main point questions',
    'reading comprehension inference questions',
    'argument evaluation practice',
    'analytical reasoning questions',
    'logical deduction exercises',
    'free logical reasoning test',
    'free critical reasoning practice',
    'online reasoning questions',
    'reasoning aptitude test',
    'critical thinking skills practice',
    'logical analysis exercises',
    'verbal reasoning practice',
    'critical reasoning drill',
    'logical reasoning drill',
    'LSAT practice questions',
    'GMAT verbal reasoning',
    'critical thinking games',
    'argument evaluation questions',
    'logical flaw questions',
    'inference practice test',
    'reading comprehension reasoning',
    'analytical thinking exercises',
    'free aptitude reasoning test',
    'competitive exam reasoning practice',
    'UPSC reasoning questions',
    'CAT logical reasoning',
    'CLAT critical reasoning',
    'SSC reasoning practice',
    'reasoning questions with answers',
    'critical reasoning online test',
    'best logical reasoning practice'
  ],

  openGraph: {
    title: 'Critical Reasoning Practice Test - LSAT & GMAT Logic Questions',
    description:
      'Train logical reasoning, argument analysis, assumptions, logical flaws, inference, and critical thinking with interactive LSAT and GMAT style questions.',
    url: 'https://skilldrills.online/drills/academic/comprehension/inference-drill',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Critical Reasoning Practice Test'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Critical Reasoning Practice Test - Free Online Reasoning Drill',
    description:
      'Improve logical reasoning, argument evaluation, assumptions, and critical thinking skills with free interactive practice questions.',
    images: ['https://skilldrills.online/icons/icon-512x512.png']
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },

  alternates: {
    canonical:
      'https://skilldrills.online/drills/academic/comprehension/inference-drill'
  }
};

export default function InferenceDrillPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://skilldrills.online'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Academic Drills',
                item: 'https://skilldrills.online/drills/academic'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Comprehension',
                item: 'https://skilldrills.online/drills/academic/comprehension'
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Critical Reasoning Practice Test',
                item: 'https://skilldrills.online/drills/academic/comprehension/inference-drill'
              }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Critical Reasoning Practice Test',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            url: 'https://skilldrills.online/drills/academic/comprehension/inference-drill',
            description:
              'Free critical reasoning practice test featuring logical flaws, assumptions, inference questions, causal reasoning, argument evaluation, parallel reasoning, and LSAT-style logical reasoning exercises.',
            isAccessibleForFree: true,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            author: {
              '@type': 'Organization',
              name: 'SkillDrills',
              url: 'https://skilldrills.online'
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is critical reasoning practice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Critical reasoning practice develops the ability to evaluate arguments, identify assumptions, detect logical flaws, draw valid conclusions, and analyze evidence.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is this drill useful for LSAT and GMAT preparation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The drill includes logical flaws, assumptions, strengthen and weaken arguments, inference questions, and parallel reasoning similar to LSAT, GMAT, GRE, CLAT, CAT, and aptitude exams.'
                }
              },
              {
                '@type': 'Question',
                name: 'How can I improve critical reasoning skills?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Consistent practice with logical reasoning questions, argument evaluation, assumptions, causal reasoning, and inference exercises improves critical thinking and analytical reasoning skills.'
                }
              },
              {
                '@type': 'Question',
                name: 'What exams use critical reasoning questions?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Critical reasoning questions commonly appear in LSAT, GMAT, GRE, CAT, CLAT, UPSC aptitude sections, SSC exams, and corporate aptitude assessments.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the difference between logical reasoning and critical reasoning?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Logical reasoning focuses on deductions and formal logic structures, while critical reasoning evaluates assumptions, evidence, arguments, conclusions, and reasoning quality.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is the critical reasoning practice test free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. SkillDrills provides this critical reasoning practice test completely free with no sign-up, registration, or downloads required.'
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
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Critical Reasoning Practice Test',
            description:
              'Free online logical reasoning and critical thinking practice test with explanations.',
            url: 'https://skilldrills.online/drills/academic/comprehension/inference-drill',
            inLanguage: 'en',
            isPartOf: {
              '@type': 'WebSite',
              name: 'SkillDrills',
              url: 'https://skilldrills.online'
            }
          })
        }}
      />

      <InferenceDrillClient />
    </>
  );
}