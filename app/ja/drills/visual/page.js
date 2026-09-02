import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '視覚認識・深度知覚オンライントレーナー | SkillDrills',
  description: '距離感・深度判断、周辺視野の異常検知、高速ビジュアルサーチ。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual',
    languages: getAlternateLanguages('/ja/drills/visual'),
  },
  openGraph: {
    title: '視覚認識・深度知覚オンライントレーナー | SkillDrills',
    description: '距離感・深度判断、周辺視野の異常検知、高速ビジュアルサーチ。',
    url: 'https://skilldrills.online/ja/drills/visual',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function LocalizedVisualDrillsClientPage() {
  return <VisualDrillsClient />;
}
