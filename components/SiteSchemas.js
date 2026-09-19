'use client';

import { useTranslation } from '@/lib/i18n/useTranslation';
import { LOCALE_META } from '@/lib/i18n/locales';

const NAV_ITEMS = [
  { key: 'fps', href: '/drills/fps' },
  { key: 'cognitive', href: '/drills/cognitive' },
  { key: 'memory', href: '/drills/memory' },
  { key: 'visual', href: '/drills/visual' },
  { key: 'tracking', href: '/drills/visual-tracking' },
  { key: 'motor', href: '/drills/motor' },
  { key: 'physical', href: '/drills/physical' },
  { key: 'reaction', href: '/drills/reaction-speed' },
];

// Organization/WebSite/SiteNavigationElement JSON-LD for the whole site. Locale-aware:
// the slogan, inLanguage and nav labels switch with the URL (via useTranslation's
// usePathname-based locale detection, same mechanism SiteHeader already uses for its
// visible nav), everything else stays identical across locales. English is untouched —
// it's the fallback DICTIONARIES.en already was before this component existed.
export default function SiteSchemas({ totalDrillsCount }) {
  const { locale, t, localizeHref } = useTranslation();
  const siteUrl = locale === 'en' ? 'https://skilldrills.online' : `https://skilldrills.online/${locale}`;
  const inLanguage = LOCALE_META[locale]?.code?.split('-')[0] || 'en';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SkillDrills',
    url: siteUrl,
    logo: 'https://skilldrills.online/icons/icon-512x512.png',
    description: `Free online platform with ${totalDrillsCount} training drills for FPS gaming skills, cognitive enhancement, brain training, memory improvement, typing speed, and mental fitness.`,
    email: 'support@skilldrills.online',
    foundingDate: '2026',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@skilldrills.online',
      contactType: 'customer support',
      availableLanguage: ['English'],
    },
    subjectOf: {
      '@type': 'AboutPage',
      url: 'https://skilldrills.online/about',
    },
    slogan: t('schema.slogan', 'Master Your Mind & Mechanics'),
    areaServed: { '@type': 'World', name: 'Worldwide' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://skilldrills.online/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SkillDrills',
    url: siteUrl,
    inLanguage,
    isAccessibleForFree: true,
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://skilldrills.online/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'SkillDrills Main Navigation',
    url: siteUrl,
    hasPart: NAV_ITEMS.map((item, i) => ({
      '@type': 'SiteNavigationElement',
      position: i + 1,
      name: t(`header.${item.key}`, item.key),
      url: `https://skilldrills.online${localizeHref(item.href)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />
    </>
  );
}
