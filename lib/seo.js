// lib/seo.js
// Reusable SEO utility for generating drill-specific metadata

const BASE_URL = 'https://skilldrills.online';

/**
 * Generates drill-specific metadata for SEO
 * @param {Object} drill - Drill configuration
 * @returns {Object} Next.js metadata object
 */
export function generateDrillMetadata(drill) {
  const { name, description, category, subCategory, slug, keywords = [] } = drill;
  const url = `${BASE_URL}/drills/${category}/${subCategory}/${slug}`;
  const title = `${name} | SkillDrills`;
  const imageUrl = `${BASE_URL}/icons/icon-512x512.png`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: 'SkillDrills',
      type: 'article',
      locale: 'en_US',
      images: [{ url: imageUrl, width: 512, height: 512, alt: name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: url },
  };
}

/**
 * Generates breadcrumb JSON-LD schema
 * @param {Array} items - Breadcrumb items [{name, path}]
 * @returns {Object} JSON-LD object
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${BASE_URL}${item.path}` } : {}),
    })),
  };
}

/**
 * Generates WebApplication schema for drill pages
 * @param {Object} drill - Drill configuration
 * @returns {Object} JSON-LD object
 */
export function generateWebAppSchema(drill) {
  const { name, description, category, subCategory, slug } = drill;
  const url = `${BASE_URL}/drills/${category}/${subCategory}/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: 'SkillDrills' },
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript',
  };
}

/**
 * Generates FAQ schema
 * @param {Array} faqs - [{question, answer}]
 * @returns {Object} JSON-LD object
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates ExercisePlan schema for drills (for rich snippets)
 * @param {Object} drill - Drill configuration
 * @returns {Object} JSON-LD object
 */
export function generateExercisePlanSchema(drill) {
  const { name, description, category, subCategory, slug, difficulty = 'Beginner' } = drill;
  const url = `${BASE_URL}/drills/${category}/${subCategory}/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ExercisePlan',
    name,
    description,
    url,
    image: `${BASE_URL}/icons/icon-512x512.png`,
    category: `${category} > ${subCategory}`,
    difficulty,
    author: { '@type': 'Organization', name: 'SkillDrills' },
    isAccessibleForFree: true,
  };
}

/**
 * Schema script component helper for drill pages
 * @param {Array} schemas - Array of schema objects
 * @returns {string} HTML script tags
 */
export function SchemaScripts({ schemas }) {
  return schemas.map((schema, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ));
}

/**
 * Category helper - maps category slugs to display names
 */
export const CATEGORY_MAP = {
  fps: { name: 'FPS Training', icon: '🎯', path: '/drills/fps' },
  cognitive: { name: 'Cognitive Training', icon: '🧠', path: '/drills/cognitive' },
  memory: { name: 'Memory Training', icon: '💾', path: '/drills/memory' },
  academic: { name: 'Academic Drills', icon: '📚', path: '/drills/academic' },
  visual: { name: 'Visual Training', icon: '👁️', path: '/drills/visual' },
  motor: { name: 'Motor Skills', icon: '🤚', path: '/drills/motor' },
  productivity: { name: 'Productivity', icon: '⚡', path: '/drills/productivity' },
  'mental-fitness': { name: 'Mental Fitness', icon: '🧘', path: '/drills/mental-fitness' },
  physical: { name: 'Physical Training', icon: '💪', path: '/drills/physical' },
};

export const SUBCATEGORY_MAP = {
  attention: { name: 'Attention', path: '/drills/cognitive/attention' },
  focus: { name: 'Focus', path: '/drills/cognitive/focus' },
  'problem-solving': { name: 'Problem Solving', path: '/drills/cognitive/problem-solving' },
  'processing-speed': { name: 'Processing Speed', path: '/drills/cognitive/processing-speed' },
  'short-term-memory': { name: 'Short Term Memory', path: '/drills/memory/short-term-memory' },
  'working-memory': { name: 'Working Memory', path: '/drills/memory/working-memory' },
  'long-term-memory': { name: 'Long Term Memory', path: '/drills/memory/long-term-memory' },
  'spatial-memory': { name: 'Spatial Memory', path: '/drills/memory/spatial-memory' },
  'associative-memory': { name: 'Associative Memory', path: '/drills/memory/associative-memory' },
};

/**
 * Converts slug to display name
 * @param {string} slug - URL slug
 * @returns {string} Display name
 */
export function slugToTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}