import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '滑動性追従・視覚トラッキングエイムトレーナー | SkillDrills',
  description: '滑らかな眼球運動、弾道予測、動く標的への連続エイムロックオン能力を強化。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual-tracking',
    languages: getAlternateLanguages('/ja/drills/visual-tracking'),
  },
  openGraph: {
    title: '滑動性追従・視覚トラッキングエイムトレーナー | SkillDrills',
    description: '滑らかな眼球運動、弾道予測、動く標的への連続エイムロックオン能力を強化。',
    url: 'https://skilldrills.online/ja/drills/visual-tracking',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return <VisualTrackingDrillsClient />;
}
