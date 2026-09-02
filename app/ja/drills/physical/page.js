import PhysicalDrillsClient from '@/app/drills/physical/PhysicalDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '身体反射・瞬発力トレーニングドリル | SkillDrills',
  description: '手眼協調タイミング、動的障害物回避、全身瞬発力トレーニング。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical',
    languages: getAlternateLanguages('/ja/drills/physical'),
  },
  openGraph: {
    title: '身体反射・瞬発力トレーニングドリル | SkillDrills',
    description: '手眼協調タイミング、動的障害物回避、全身瞬発力トレーニング。',
    url: 'https://skilldrills.online/ja/drills/physical',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function LocalizedPhysicalDrillsClientPage() {
  return <PhysicalDrillsClient />;
}
