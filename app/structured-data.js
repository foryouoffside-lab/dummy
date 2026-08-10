// app/structured-data.js
// Reusable SEO schema components for all SkillDrills pages
// Creates rich results in Google: breadcrumbs, FAQs, how-to steps, app badges

import { DRILLS } from '@/lib/drillsRegistry';

const BASE_URL = 'https://skilldrills.online';
const ORG_NAME = 'SkillDrills';
const ORG_DESCRIPTION = `Free online training platform with ${DRILLS.length}+ interactive drills for FPS gaming skills, cognitive enhancement, brain training, memory improvement, typing speed, visual tracking, and mental fitness.`;
const TODAY = new Date().toISOString().split('T')[0];

// ============================================
// ORGANIZATION SCHEMA
// Use: ONCE on homepage (app/page.js)
// Shows: Knowledge panel in Google with logo & social links
// ============================================
export function OrganizationSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    alternateName: 'Skill Drills',
    url: BASE_URL,
    logo: `${BASE_URL}/icons/icon-512x512.png`,
    image: `${BASE_URL}/icons/icon-512x512.png`,
    description: ORG_DESCRIPTION,
    email: 'support@skilldrills.online',
    foundingDate: '2026-05-20',
    slogan: 'Master Your Mind & Mechanics',
    areaServed: {
      '@type': 'World',
      name: 'Worldwide',
    },
    knowsAbout: [
      'FPS Aim Training',
      'Cognitive Development',
      'Brain Training',
      'Memory Improvement',
      'Typing Speed',
      'Mental Fitness',
      'Reaction Time Training',
      'Focus Enhancement',
      'Visual Perception',
      'Hand-Eye Coordination',
    ],
    keywords: 'brain training, FPS aim trainer, cognitive exercises, memory games, typing test, reaction time, mental fitness, free online drills',
    sameAs: [
      // Add social links when created:
      // 'https://twitter.com/skilldrills',
      // 'https://youtube.com/@skilldrills',
      // 'https://discord.gg/skilldrills',
      // 'https://github.com/skilldrills',
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ============================================
// WEBSITE SCHEMA
// Use: ONCE in layout.js (site-wide)
// Shows: Sitelinks search box in Google results
// ============================================
export function WebsiteSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    alternateName: 'Skill Drills - Free Brain & FPS Training',
    url: BASE_URL,
    description: ORG_DESCRIPTION,
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    copyrightYear: 2026,
    dateCreated: '2026-05-20',
    dateModified: TODAY,
    isAccessibleForFree: true,
    keywords: 'brain training, FPS aim, cognitive exercises, memory games, free drills',
    about: {
      '@type': 'Thing',
      name: 'Online Training Platform',
      description: 'Free browser-based interactive drills for cognitive and gaming skills development',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ============================================
// BREADCRUMB SCHEMA
// Use: On EVERY drill page
// Shows: Navigation path in Google results
// Example: Home > FPS Training > Flick Shot Training
// ============================================
export function BreadcrumbSchema({ items }) {
  // items = [
  //   { name: 'Home', url: '/' },
  //   { name: 'FPS Training', url: '/drills/fps' },
  //   { name: 'Flick Shot Training' },  // No URL = current page
  // ]
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

// ============================================
// WEB APPLICATION SCHEMA
// Use: On EVERY drill page
// Shows: "Free Educational App" badge in results
// ============================================
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
    applicationSubCategory: 'Interactive Drill',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
    },
    author: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
    },
    educationalUse: educationalUse.length > 0 
      ? educationalUse 
      : ['Brain Training', 'Cognitive Exercise', 'Skill Development'],
    learningResourceType: ['Interactive Exercise', 'Drill', 'Practice Test'],
    timeRequired: timeRequired,
    interactivityType: 'active',
    inLanguage: 'en-US',
    teaches: teaches.length > 0 
      ? teaches 
      : ['Focus', 'Speed', 'Accuracy'],
    educationalLevel: 'All Levels',
    typicalAgeRange: '12-80',
    datePublished: '2026-05-20',
    dateModified: TODAY,
    version: '1.0',
    isAccessibleForFree: true,
    accessMode: ['visual', 'textual'],
    accessModeSufficient: ['textual'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ============================================
// FAQ SCHEMA
// Use: On drill pages with common questions
// Shows: Expandable Q&A in Google (takes 2x space)
// ============================================
export function FAQSchema({ questions }) {
  // questions = [
  //   { question: 'What is this drill?', answer: 'This drill helps...' },
  //   { question: 'How do I improve?', answer: 'Practice daily...' },
  // ]
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

// ============================================
// HOW-TO SCHEMA
// Use: On drill pages with step-by-step guides
// Shows: Step carousel in Google results
// ============================================
export function HowToSchema({ name, description, steps, totalTime = 'PT5M', imageUrl = null }) {
  // steps = [
  //   { name: 'Step 1: Position', text: 'Place your mouse...' },
  //   { name: 'Step 2: Start', text: 'Click the start button...' },
  // ]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    totalTime: totalTime,
    image: imageUrl || `${BASE_URL}/icons/icon-512x512.png`,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image || `${BASE_URL}/icons/icon-512x512.png`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ============================================
// SITE NAVIGATION SCHEMA
// Use: On homepage & category hub pages
// Shows: Navigation structure to search engines
// ============================================
export function SiteNavigationSchema({ categories }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: `${ORG_NAME} Main Navigation`,
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

// ============================================
// ITEM LIST SCHEMA
// Use: On category pages to list all drills
// Shows: Carousel of related items in Google
// ============================================
export function ItemListSchema({ name, items }) {
  // items = [
  //   { name: 'Drill Name', url: '/drills/...', description: '...' },
  // ]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebApplication',
        name: item.name,
        url: `${BASE_URL}${item.url}`,
        description: item.description,
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

// ============================================
// SOFTWARE APPLICATION SCHEMA
// Use: Alternative to WebApplication for gaming drills
// Shows: App-style rich result
// ============================================
export function SoftwareAppSchema({ name, description, url, category = 'GamingApplication' }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    url: `${BASE_URL}${url}`,
    description: description,
    applicationCategory: category,
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: ORG_NAME,
    },
    datePublished: '2026-05-20',
    dateModified: TODAY,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ============================================
// SEARCH ACTION SCHEMA
// Use: In layout.js for site-wide search
// Shows: Sitelinks searchbox in Google
// ============================================
export function SearchActionSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ============================================
// QUICK USAGE GUIDE:
// ============================================
// 
// Homepage (app/page.js):
//   <OrganizationSchema />
//   <SiteNavigationSchema categories={categories} />
//   <FAQSchema questions={homepageFaqs} />
//
// Category Hub (app/drills/fps/page.js):
//   <BreadcrumbSchema items={breadcrumbs} />
//   <ItemListSchema name="FPS Drills" items={fpsDrills} />
//   <FAQSchema questions={categoryFaqs} />
//
// Individual Drill (app/drills/fps/flick-shot-training/page.js):
//   <BreadcrumbSchema items={breadcrumbs} />
//   <WebApplicationSchema name="..." description="..." url="..." ... />
//   <FAQSchema questions={drillFaqs} />
//   <HowToSchema name="..." description="..." steps={steps} />
//
// Layout (app/layout.js):
//   <WebsiteSchema />
//
// ============================================