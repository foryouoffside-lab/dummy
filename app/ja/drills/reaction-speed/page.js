import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '反射神経テスト - 無料オンライン反応速度測定',
  description: '視覚刺激に対する反射神経をミリ秒（ms）単位で正確に測定。プロゲーマーの平均データと比較可能。',
  keywords: ['反射神経テスト', 'リアクションタイム測定', '反応速度テスト', '視覚反応テスト', 'ミリ秒 テスト'],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed',
    languages: getAlternateLanguages('/ja/drills/reaction-speed'),
  },
  openGraph: {
    title: '反射神経テスト - ミリ秒測定オンライン無料リアクションタイムテスト',
    description: '視覚刺激に対する反射神経をミリ秒（ms）単位で正確に測定。',
    url: 'https://skilldrills.online/ja/drills/reaction-speed',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function JapaneseReactionHubPage() {
  return <ReactionSpeedDrillsClient />;
}
