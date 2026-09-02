import MemoryClient from '@/app/drills/memory/MemoryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Juegos de Memoria de Trabajo y Retención Espacial',
  description: 'Entrena tu memoria a corto plazo, digit span y retención espacial gratis.',
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/memory',
    languages: getAlternateLanguages('/es/drills/memory'),
  },
  openGraph: {
    title: 'Juegos de Memoria de Trabajo y Retención Espacial | SkillDrills',
    description: 'Entrena tu memoria a corto plazo, digit span y retención espacial gratis.',
    url: 'https://skilldrills.online/es/drills/memory',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function LocalizedMemoryClientPage() {
  return <MemoryClient />;
}
