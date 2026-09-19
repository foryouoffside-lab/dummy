import BarrierSequencePursuitClient from '@/app/drills/reaction-speed/barrier-sequence-pursuit/BarrierSequencePursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – ja-JP (reaction-speed / barrier-sequence-pursuit)
// PRIMARY DOMESTIC: "置きエイム 練習" / "ジグルピーク トレーナー"
// SECONDARY / LSI:
//   "飛び出し 反応 訓練" / "ピーク有利 対策"
//   "ショルダーピーク エイム" / "カウンターストレイフ 練習"
// ============================================================

export const metadata = {
  title: '置きエイム練習 – ジグルピーク＆飛び出し反応 | SkillDrills',
  description: '無料の置きエイム＆ジグルピーク訓練ツール。遮蔽物からの飛び出しに対する反射速度と、ピーク有利を克服するクロスヘアオフセット技術をブラウザで測定・強化。',
  keywords: [
    '置きエイム 練習',
    'ジグルピーク トレーナー',
    '飛び出し 反応 訓練',
    'ピーク有利 対策',
    'ショルダーピーク エイム',
    'カウンターストレイフ 練習',
    '射線 固定 反応速度',
    'クロスヘア 配置',
    '遮蔽物 ピーク 反応',
    'タクティカル エイム 練習',
    'プリエイム オフセット',
    'FPS 反応速度 測定',
  ],
  openGraph: {
    title: '置きエイム練習 – ジグルピーク＆飛び出し反応 | SkillDrills',
    description: '無料の置きエイム＆ジグルピーク訓練ツール。遮蔽物からの飛び出しに対する反射速度と、ピーク有利を克服するクロスヘアオフセット技術をブラウザで測定・強化。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '置きエイム練習 – ジグルピーク＆飛び出し反応 | SkillDrills',
    description: '無料の置きエイム＆ジグルピーク訓練ツール。遮蔽物からの飛び出しに対する反射速度と、ピーク有利を克服するクロスヘアオフセット技術をブラウザで測定・強化。',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/barrier-sequence-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: 'ドリル一覧', item: 'https://skilldrills.online/ja/drills' },
    { '@type': 'ListItem', position: 3, name: '反応速度', item: 'https://skilldrills.online/ja/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '置きエイム練習', item: 'https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '置きエイム練習 – ジグルピーク＆射線管理トレーナー',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description: '防衛的な射線管理、ピーク有利への対策、および遮蔽物からの飛び出し標的への反射神経を鍛えるオンラインツール。',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'ja-JP',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '置きエイム＆ジグルピーク トレーナー',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, ポインターロック対応ブラウザ',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  url: 'https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit',
  inLanguage: 'ja-JP',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jiggle Peek Trainer – 遮蔽物ピーク＆置きエイムゲーム',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit',
  description: 'FPSの角待ち、カウンターストレイフ、およびクロスヘアの間隔管理を極めるブラウザゲーム。',
  genre: ['Action', 'エイムトレーナー', 'タクティカルFPS'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'ジグルピーク（Jiggle Peeking）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '遮蔽物の角から一瞬だけ肩や体をチラ見せし、すぐに反対キーを押して戻る機動技術です。敵の射撃を誘発したり情報を安全に取るために使われます。',
      },
    },
    {
      '@type': 'Question',
      name: 'ピーク有利（Peeker’s Advantage）の科学的理由は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '通信ラグ（Ping）とサーバーの補間処理により、自ら動いて角を飛び出す攻撃者の方が、待機している防衛者よりも相手を数ミリ秒早く視認できる現象です（deWet & Straily, 2020）。',
      },
    },
    {
      '@type': 'Question',
      name: 'ピーク有利に対抗する置きエイムのコツは？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'クロスヘアを壁のキワに密着させず、人間の反応時間（約150〜200ms）で相手が進む距離分だけ壁から離して置く「オフセット配置」が必須です。',
      },
    },
    {
      '@type': 'Question',
      name: 'ドンダース（Donders, 1868）の反応理論は置きエイムにどう関わりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '視覚刺激の受容から指先の発射命令までに約200msの神経生理学的遅延が生じるため、オフセットなしでは飛び出す敵に人間の反射速度が物理的に追いつきません。',
      },
    },
    {
      '@type': 'Question',
      name: 'ショルダーピーク（肩ピーク）が効果的な理由は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '頭部（ヘッドショット判定）を出さずに肩の端だけを50〜100ミリ秒見せることで、相手のスナイパー弾を無駄撃ちさせ安全に射撃権を奪うことができます。',
      },
    },
    {
      '@type': 'Question',
      name: 'カウンターストレイフ（逆キー入力）の仕組みは？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '移動方向と逆のキーを一瞬タップしてキャラクターの移動慣性をゼロにし、瞬時に初弾の集弾精度を100%に回復させるテクニックです。',
      },
    },
    {
      '@type': 'Question',
      name: '適切なクロスヘア配置が反応時間を短縮する理由は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '事前に敵の出現予測線上に照準を置いておくことで、敵視認後のフリック操作（筋肉の微小運動）を完全に省略し、1クリックのタイミング勝負に簡略化できるためです。',
      },
    },
    {
      '@type': 'Question',
      name: '240Hzディスプレイは置きエイムにどのような効果をもたらしますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '毎フレームの更新間隔が4.1msと極小になるため（60Hzは16.7ms；Woods et al., 2015）、敵が角から飛び出した初動のピクセル変化をいち早く知覚できます。',
      },
    },
    {
      '@type': 'Question',
      name: '置きエイムの推奨練習時間は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '毎日10分程度、狭い射線の固定待ちとジグルピークの反復練習を行うことで、実戦での無駄なフリックミスを防ぐ筋肉記憶が定着します。',
      },
    },
    {
      '@type': 'Question',
      name: 'この練習ツールは無料で使えますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、SkillDrillsはすべてのエイムツールを完全無料で提供しており、インストールや登録不要でブラウザから即座に利用可能です。',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '置きエイム＆ジグルピーク訓練手順',
  description: '遮蔽物の設定、クロスヘアのオフセット配置、および飛び出し標的の迎撃を習得する4ステップ。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '遮蔽物の構造と交戦角度の調整',
      text: 'プレイするタイトルの代表的なチョークポイントに合わせて、壁の角と交戦射線の幅を設定します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '反応時間を加味したクロスヘアオフセット配置',
      text: '照準を壁のキワに密着させず、人間の反応遅延（150〜200ms）で敵が進む距離分だけ離して固定します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '壁の境界からの初動変化を凝視',
      text: '遮蔽物のエッジに意識を集中し、敵標的のシルエットが飛び出す瞬間を鋭敏に察知します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '照準線を通過する瞬間の即座クリック',
      text: '敵標的が配置したクロスヘアの平面を横切る瞬間に、余計なフリックを挟まず即座にクリックして撃破します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'dewet2020', 'kosinski2008', 'woods2015'),
  intro: {
    title: '置きエイム練習＆ジグルピーク射線管理ガイド',
    paragraphs: [
      'VALORANTやカウンターストライクなどの競技シーンにおいて、防衛側が陥りやすい最大の罠が「壁のキワへの照準密着」です。人間の反応速度の限界と、通信ラグに起因するピーク有利（Peeker’s Advantage；deWet & Straily, 2020）により、壁に貼り付けた照準は飛び出す敵に必ず撃ち負けます。',
      'ドンダース（Donders, 1868）の精神年代測定研究が示す通り、視覚的な刺激から筋肉の運動出力までには約200ミリ秒の不可避な遅延が存在します。一流選手はこの時間差の間に敵が移動する距離をあらかじめ計算し、壁から少し離れた位置に照準を配置（オフセット）します。',
      'このトレーニングは高駆動モニター環境（Woods et al., 2015）で遮蔽物からの飛び出しに対する迎撃タイミングを体に刷り込み、敵が自らのクロスヘアへ飛び込んでくる完璧な置きエイムを完成させます。',
    ],
  },
  benchmarks: {
    title: '置きエイム＆飛び出し迎撃パフォーマンス基準表',
    headers: ['階級（ティア）', 'ランク区分', '置きエイム反応時間', '着弾精度', 'パーセンタイル'],
    rows: [
      ['Tier 1', '神域・プロ（Grandmaster / Pro）', '< 150 ms', '98 %+', '上位 1 %'],
      ['Tier 2', 'エリート（Master / Diamond）', '150 – 190 ms', '94 – 97 %', '上位 5 %'],
      ['Tier 3', '実力者（Platinum / Gold）', '191 – 240 ms', '88 – 93 %', '上位 15 %'],
      ['Tier 4', '中級者（Silver / Bronze）', '241 – 310 ms', '78 – 87 %', '上位 50 %'],
      ['Tier 5', '初級者（Novice / Iron）', '> 310 ms', '< 78 %', '基準値'],
    ],
    note: '神経生理学的反応時間（Donders, 1868; Kosinski, 2008）およびネットコード遅延モデル（deWet & Straily, 2020）に基づき算出された基準値です。',
  },
  protocols: {
    title: '科学的4段階置きエイム訓練プロトコル',
    description: '飛び出し標的をブレずに迎撃する防衛的エイム反射の習得手順。',
    items: [
      {
        title: '遮蔽物の構造と交戦角度の調整',
        description: 'プレイするタイトルの代表的なチョークポイントに合わせて、壁の角と交戦射線の幅を設定します。',
      },
      {
        title: '反応時間を加味したクロスヘアオフセット配置',
        description: '照準を壁のキワに密着させず、人間の反応遅延（150〜200ms）で敵が進む距離分だけ離して固定します。',
      },
      {
        title: '壁の境界からの初動変化を凝視',
        description: '遮蔽物のエッジに意識を集中し、敵標的のシルエットが飛び出す瞬間を鋭敏に察知します。',
      },
      {
        title: '照準線を通過する瞬間の即座クリック',
        description: '敵標的が配置したクロスヘアの平面を横切る瞬間に、余計なフリックを挟まず即座にクリックして撃破します。',
      },
    ],
  },
  faqs: {
    title: 'よくある質問 (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function JapaneseBarrierSequencePursuitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BarrierSequencePursuitClient copy={{ title: '置きエイム練習' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/ja/drills/reaction-speed/barrier-sequence-pursuit"
        />
      </div>
      <DrillFooter />
    </>
  );
}
