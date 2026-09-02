import PhysicalDrillsClient from '@/app/drills/physical/PhysicalDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Reflejos Físicos y Coordinación Motriz | SkillDrills',
  description: 'Entrena reflejos rápidos y coordinación mano-ojo en tu navegador.',
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical',
    languages: getAlternateLanguages('/es/drills/physical'),
  },
  openGraph: {
    title: 'Reflejos Físicos y Coordinación Motriz | SkillDrills',
    description: 'Entrena reflejos rápidos y coordinación mano-ojo en tu navegador.',
    url: 'https://skilldrills.online/es/drills/physical',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function LocalizedPhysicalDrillsClientPage() {
  return <PhysicalDrillsClient />;
}
