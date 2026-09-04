import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '反射神経テスト & トレーニング - 反応速度向上総合ハブ | SkillDrills',
  description: '無料オンライン反射神経テスト＆トレーニング。単純反応時間から複数ターゲット認識、動体追従まで8種類の反射神経ドリルを網羅。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed',
    languages: getAlternateLanguages('/ja/drills/reaction-speed'),
  },
  openGraph: {
    title: '反射神経テスト & トレーニング - 反応速度向上総合ハブ | SkillDrills',
    description: '無料オンライン反射神経テスト＆トレーニング。単純反応時間から複数ターゲット認識、動体追従まで8種類の反射神経ドリルを網羅。',
    url: 'https://skilldrills.online/ja/drills/reaction-speed',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function JapaneseReactionHubPage() {
  return <ReactionSpeedDrillsClient />;
}
