import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '全81以上の無料エイム練習＆脳トレドリル一覧 | SkillDrills',
  description: '8つの主要分野・81以上の無料ドリル一覧。VALORANTやApex向けエイム練習、反射神経テスト、記憶力トレーニング。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills',
    languages: getAlternateLanguages('/ja/drills'),
  },
  openGraph: {
    title: '全81以上の無料エイム練習＆脳トレドリル一覧 | SkillDrills',
    description: '8つの主要分野・81以上の無料ドリル一覧。VALORANTやApex向けエイム練習、反射神経テスト、記憶力トレーニング。',
    url: 'https://skilldrills.online/ja/drills',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function LocalizedDrillsDirectoryPage() {
  return <DrillsDirectoryClient />;
}
