import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '認知能力・集中力持続トレーニングドリル | SkillDrills',
  description: '注意力の持続、ルール切り替え耐性、マルチタスク処理能力を鍛える脳トレドリル。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/cognitive',
    languages: getAlternateLanguages('/ja/drills/cognitive'),
  },
  openGraph: {
    title: '認知能力・集中力持続トレーニングドリル | SkillDrills',
    description: '注意力の持続、ルール切り替え耐性、マルチタスク処理能力を鍛える脳トレドリル。',
    url: 'https://skilldrills.online/ja/drills/cognitive',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function LocalizedCognitiveHubClientPage() {
  return <CognitiveHubClient />;
}
