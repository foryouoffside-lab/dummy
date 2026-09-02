import MotorDrillsClient from '@/app/drills/motor/MotorDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Coordinación Motora y Test de CPS Online | SkillDrills',
  description: 'Mide tu velocidad de clics (CPS), precisión del mouse y destreza de dedos.',
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor',
    languages: getAlternateLanguages('/es/drills/motor'),
  },
  openGraph: {
    title: 'Coordinación Motora y Test de CPS Online | SkillDrills',
    description: 'Mide tu velocidad de clics (CPS), precisión del mouse y destreza de dedos.',
    url: 'https://skilldrills.online/es/drills/motor',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function LocalizedMotorDrillsClientPage() {
  return <MotorDrillsClient />;
}
