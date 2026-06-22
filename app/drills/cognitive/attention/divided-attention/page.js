import DividedAttentionClient from './DividedAttentionClient';

export const metadata = {
  // your metadata
};

export default function DividedAttentionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://skilldrills.online"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Cognitive Drills",
                "item": "https://skilldrills.online/drills/cognitive"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Attention",
                "item": "https://skilldrills.online/drills/cognitive/attention"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Divided Attention Test"
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
            "@type": "WebApplication",
            "name": "Divided Attention Test",
            "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention",
            "description":
              "Free divided attention test combining visual tracking and number recognition for multitasking, focus, cognitive flexibility, and attention control training.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "isAccessibleForFree": true,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "SkillDrills",
              "url": "https://skilldrills.online"
            }
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
                "name": "What is a divided attention test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "A divided attention test measures how effectively a person can perform multiple cognitive tasks simultaneously while maintaining speed and accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "How does dual task training improve attention?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Dual task training forces the brain to process multiple streams of information at the same time, improving multitasking, focus, attention control, and cognitive flexibility."
                }
              },
              {
                "@type": "Question",
                "name": "Can divided attention be improved?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Yes. Regular divided attention exercises can improve multitasking ability, visual attention, task switching, and processing speed."
                }
              },
              {
                "@type": "Question",
                "name": "Is this divided attention drill free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Yes. The SkillDrills Divided Attention Test is completely free and requires no sign up or download."
                }
              }
            ]
          })
        }}
      />

      <DividedAttentionClient />
    </>
  );
}