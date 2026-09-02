import MotorDrillsClient from '@/app/drills/motor/MotorDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Coordenação Motora e Teste de CPS | SkillDrills',
  description: 'Meça sua velocidade de clique (CPS), jitter clicking e coordenação motora fina.',
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/motor',
    languages: getAlternateLanguages('/pt/drills/motor'),
  },
  openGraph: {
    title: 'Coordenação Motora e Teste de CPS | SkillDrills',
    description: 'Meça sua velocidade de clique (CPS), jitter clicking e coordenação motora fina.',
    url: 'https://skilldrills.online/pt/drills/motor',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function LocalizedMotorDrillsClientPage() {
  return <MotorDrillsClient />;
}
