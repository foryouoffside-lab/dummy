import PhysicalDrillsClient from '@/app/drills/physical/PhysicalDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Treinos de Reflexos Físicos e Coordenação | SkillDrills',
  description: 'Treine reflexos físicos, velocidade de reação rápida e coordenação motora.',
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical',
    languages: getAlternateLanguages('/pt/drills/physical'),
  },
  openGraph: {
    title: 'Treinos de Reflexos Físicos e Coordenação | SkillDrills',
    description: 'Treine reflexos físicos, velocidade de reação rápida e coordenação motora.',
    url: 'https://skilldrills.online/pt/drills/physical',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function LocalizedPhysicalDrillsClientPage() {
  return <PhysicalDrillsClient />;
}
