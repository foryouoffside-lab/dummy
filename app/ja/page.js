import HomePageClient from '../HomePageClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '無料エイム練習＆反射神経・脳トレトレーナー',
  description: '登録不要・ブラウザで今すぐプレイ可能な80以上の無料トレーニングドリル。VALORANTやCS2向けのエイム練習、反射神経テスト、CPSテスト。',
  keywords: [
    'エイム練習', '無料 エイムトレーナー', '反射神経テスト', 'CPSテスト', '脳トレ 無料 ゲーム', 'VALORANT エイム練習', 'Apex エイム練習'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja',
    languages: getAlternateLanguages('/ja'),
  },
  openGraph: {
    title: 'SkillDrills - 無料エイム練習＆反射神経・脳トレオンライントレーナー',
    description: '登録不要・ブラウザで今すぐプレイ可能な80以上の無料エイム＆反射神経トレーニングドリル。',
    url: 'https://skilldrills.online/ja',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function JapaneseHomePage() {
  return <HomePageClient />;
}
