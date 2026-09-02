import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '無料エイム練習 - FPSエイムトレーナー＆反射神経ドリル',
  description: 'VALORANT、Apex Legends、CS2向けブラウザ無料エイム練習サイト。フリックショット、追いエイム（トラッキング）、反射神経を鍛える。',
  keywords: ['エイム練習', '無料 エイムトレーナー', 'VALORANT エイム練習', 'Apex エイム練習', 'エイム練習 サイト', 'フリック練習'],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/fps',
    languages: getAlternateLanguages('/ja/drills/fps'),
  },
  openGraph: {
    title: '無料エイム練習 オンライン - FPSエイムトレーナー',
    description: 'VALORANT、Apex Legends、CS2向けブラウザ無料エイム練習サイト。',
    url: 'https://skilldrills.online/ja/drills/fps',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function JapaneseFPSHubPage() {
  return <FPSHubClient />;
}
