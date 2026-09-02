import MemoryClient from '@/app/drills/memory/MemoryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'ワーキングメモリ・短期記憶力トレーニングゲーム | SkillDrills',
  description: '空間記憶スパン、逆唱数列記憶、視覚パターン保持能力を鍛える無料ゲーム。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/memory',
    languages: getAlternateLanguages('/ja/drills/memory'),
  },
  openGraph: {
    title: 'ワーキングメモリ・短期記憶力トレーニングゲーム | SkillDrills',
    description: '空間記憶スパン、逆唱数列記憶、視覚パターン保持能力を鍛える無料ゲーム。',
    url: 'https://skilldrills.online/ja/drills/memory',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function LocalizedMemoryClientPage() {
  return <MemoryClient />;
}
