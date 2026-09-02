import MotorDrillsClient from '@/app/drills/motor/MotorDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Motorik & Klick-Geschwindigkeit (CPS) | SkillDrills',
  description: 'Klickgeschwindigkeit (CPS), Jitter-Clicking und Hand-Auge-Feinkoordination.',
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor',
    languages: getAlternateLanguages('/de/drills/motor'),
  },
  openGraph: {
    title: 'Motorik & Klick-Geschwindigkeit (CPS) | SkillDrills',
    description: 'Klickgeschwindigkeit (CPS), Jitter-Clicking und Hand-Auge-Feinkoordination.',
    url: 'https://skilldrills.online/de/drills/motor',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedMotorDrillsClientPage() {
  return <MotorDrillsClient />;
}
