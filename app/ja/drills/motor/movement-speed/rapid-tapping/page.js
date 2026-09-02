import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'CPSテスト - 無料クリック速度測定＆1秒間の連打力テスト',
  description: 'ブラウザで無料測定できるCPSテスト。秒間クリック数（CPS）、ジッタークリック、バタフライクリックの速度と持久力を判定。',
  keywords: ['CPSテスト', 'クリック速度テスト', 'クリック連打測定', '秒間クリック数', 'バタフライクリック', 'ジッタークリック', 'マイクラ CPS'],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/ja/drills/motor/movement-speed/rapid-tapping'),
  },
  openGraph: {
    title: 'CPSテスト - 無料クリック速度測定＆連打力判定',
    description: 'ブラウザで無料測定できるCPSテスト。秒間クリック数を判定。',
    url: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function JapaneseRapidTappingPage() {
  const guide = {
    heading: 'CPSテスト完全解説＆公式ランク判定基準表',
    intro: [
      'CPSテスト（Clicks Per Second）は、マウスのクリック連打速度、指の器用さ、前腕の神経筋持久力を計測する指標です。マインクラフトPvPや各種対戦ゲームにおいて、高いCPSはノックバック性能や連続コンボの決定打となります。またFPSゲーム（VALORANT、CS2）でもハンドガンラウンドの連射精度向上に直結します。',
      '当サイトの45秒チャレンジでは、瞬間的なバースト連打速度と加速するターゲット縮小に対する持久力を総合判定します。'
    ],
    benchmarks: {
      title: '公式CPSランク判定表＆上位パーセンタイル',
      headers: ['CPS範囲', 'ランク称号', 'パーセンタイル', '推奨連打手法', 'ゲームでの強み'],
      rows: [
        ['0 - 5 CPS', '初級 / タートル', '下位20%', '標準人差し指タップ', '日常のPC操作・カジュアルプレイ'],
        ['6 - 9 CPS', '一般ゲーマー', '上位50%', '標準クリック', 'ハンドガン通常射撃・標準的ゲームプレイ'],
        ['10 - 12 CPS', '上級 / コンペティティブ', '上位15%', '高速緊張連打', 'マイクラPvPコンボ・高速トリガー'],
        ['13 - 15 CPS', 'プロクリッカー', '上位3%', 'ジッタークリック習熟', '高難度PvPヒットスタック'],
        ['16 - 20+ CPS', '神速 / チャンピオン', '上位0.1%', 'バタフライ / ドラッグクリック', '大会レベルの圧倒的連打力']
      ],
      note: 'eスポーツ及びマインクラフト競技コミュニティの50万回以上のプレイデータに基づき算出。'
    },
    steps: [
      '「トレーニング開始」をクリックすると45秒間のカウントダウンが始まります。',
      '縮小する円形ターゲットを素早く連続クリックしてターゲットの消滅を防ぎます。',
      '難易度上昇に伴う縮小加速に合わせ、腕の脱力とリズムを維持します。',
      'セッション終了後、平均CPS・最大連打数・世界ランク評価を確認できます。'
    ],
    audience: 'マインクラフトPvPプレイヤー、FPSゲーマー（VALORANT/CS2/Apex）、音ゲーマー、指の敏捷性を高めたいすべての方。',
    related: [
      { href: '/ja/drills/fps', label: '無料エイム練習 オンライン' },
      { href: '/ja/drills/reaction-speed', label: '反射神経テスト' }
    ]
  };

  return (
    <>
      <RapidTappingClient />
      <DrillGuide guide={guide} />
    </>
  );
}
