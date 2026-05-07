// app/structured-data.js
// Reusable structured data components for all drill pages

const BASE_URL = 'https://skilldrills.online';

/**
 * Organization Schema - Use ONCE on homepage
 */
export function OrganizationSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SkillDrills',
    url: BASE_URL,
    logo: `${BASE_URL}/icons/icon-512x512.png`,
    description: 'Free scientific brain training platform with 90+ drills for FPS gaming skills, cognitive enhancement, memory, and mental fitness.',
    sameAs: [
      // Add your social links here when ready
      // 'https://twitter.com/skilldrills',
      // 'https://youtube.com/@skilldrills',
      // 'https://discord.gg/skilldrills',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@skilldrills.online',
      availableLanguage: ['English'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Breadcrumb Schema - Use on every drill page
 */
export function BreadcrumbSchema({ items }) {
  // items = [{ name: 'Home', url: '/' }, { name: 'FPS Drills', url: '/drills/fps' }, { name: 'Flick Shot Training' }]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${BASE_URL}${item.url}` : undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * WebApplication Schema - Use on every drill page
 */
export function WebApplicationSchema({ 
  name, 
  description, 
  url, 
  educationalUse = [], 
  teaches = [],
  timeRequired = 'PT60S',
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: name,
    url: `${BASE_URL}${url}`,
    description: description,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'SkillDrills',
      url: BASE_URL,
    },
    educationalUse: educationalUse.length > 0 ? educationalUse : ['Brain Training', 'Cognitive Exercise', 'Skill Development'],
    learningResourceType: 'Interactive Exercise',
    timeRequired: timeRequired,
    interactivityType: 'active',
    inLanguage: 'en-US',
    teaches: teaches.length > 0 ? teaches : ['Focus', 'Speed', 'Accuracy'],
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * FAQ Schema - Use on drill pages with common questions
 */
export function FAQSchema({ questions }) {
  // questions = [{ question: 'What is this drill?', answer: 'This drill helps...' }]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * HowTo Schema - Use on drill pages with step-by-step instructions
 */
export function HowToSchema({ name, description, steps }) {
  // steps = [{ name: 'Step 1', text: 'Do this...' }]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    totalTime: 'PT60S',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * SiteNavigationElement Schema - Use on main navigation pages
 */
export function SiteNavigationSchema({ categories }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'SkillDrills Main Navigation',
    url: BASE_URL,
    hasPart: categories.map((cat, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: cat.name,
      url: `${BASE_URL}${cat.url}`,
      description: cat.description,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}