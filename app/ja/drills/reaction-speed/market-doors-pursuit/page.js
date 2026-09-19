import MarketDoorsPursuitClient from '@/app/drills/reaction-speed/market-doors-pursuit/MarketDoorsPursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – ja-JP (reaction-speed / market-doors-pursuit)
// PRIMARY DOMESTIC: "クリアリング 練習" / "コーナーチェック エイム"
// SECONDARY / LSI:
//   "パイ スライス 射撃" / "索敵 速度 測定"
//   "射線 管理 トレーニング" / "ドア 突破 エイム"
// ============================================================

export const metadata = {
  title: 'クリアリング練習 – コーナーチェック＆索敵訓練 | SkillDrills',
  description: '無料のクリアリング＆コーナーチェック訓練ツール。開口部や死角から出現する標的を瞬時に索敵・迎撃する反応速度と視覚走査能力をブラウザで測定・強化。',
  keywords: [
    'クリアリング 練習',
    'コーナーチェック エイム',
    'パイ スライス 射撃',
    '索敵 速度 測定',
    '射線 管理 トレーニング',
    'ドア 突破 エイム',
    'FPS クリアリング 反応速度',
    '死角 索敵 訓練',
    'プリエイム 練習',
    'タクティカル エイム',
    'サッケード 視線移動 訓練',
    '動体視力 ドアウェイ 測定',
  ],
  openGraph: {
    title: 'クリアリング練習 – コーナーチェック＆索敵訓練 | SkillDrills',
    description: '無料のクリアリング＆コーナーチェック訓練ツール。開口部や死角から出現する標的を瞬時に索敵・迎撃する反応速度と視覚走査能力をブラウザで測定・強化。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'クリアリング練習 – コーナーチェック＆索敵訓練 | SkillDrills',
    description: '無料のクリアリング＆コーナーチェック訓練ツール。開口部や死角から出現する標的を瞬時に索敵・迎撃する反応速度と視覚走査能力をブラウザで測定・強化。',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/market-doors-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: 'ドリル一覧', item: 'https://skilldrills.online/ja/drills' },
    { '@type': 'ListItem', position: 3, name: '反応速度', item: 'https://skilldrills.online/ja/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'クリアリング練習', item: 'https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'クリアリング練習 – コーナーチェック＆索敵トレーナー',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description: '角のクリアリング、パイ・スライシング、および開口部から突如現れる標的への索敵・エイム反応をブラウザ上で鍛える特化型ツール。',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'ja-JP',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'クリアリング＆コーナーチェック トレーナー',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, ポインターロック対応の最新ブラウザ',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  url: 'https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit',
  inLanguage: 'ja-JP',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Corner Checking Trainer – 開口部クリアリング＆索敵エイムゲーム',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit',
  description: 'FPSのドア進入や角の索敵において、跳躍性眼球運動と射撃反応時間を極限まで研ぎ澄ますブラウザゲーム。',
  genre: ['Action', '戦術トレーニング', 'eスポーツ視覚訓練'],
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
      name: 'タクティカルシューターにおける「クリアリング（コーナーチェック）」とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '曲がり角や部屋に入る際、複数の射線に同時に晒されないよう、幾何学的に角度を細かく確認しながら常に1対1の有利な状況を作り出す索敵・射撃技術です。',
      },
    },
    {
      '@type': 'Question',
      name: 'パイ・スライシング（Slicing the Pie）の戦術的メリットは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '壁の角を起点に円を描くように少しずつ角度を広げて視界を確保する技術です。部屋全体の敵に一度に見つかるリスクを防ぎ、孤立した敵を安全に排除できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'サッケード（跳躍性眼球運動）はクリアリングにどう影響しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '新しい射線が見えるたびに、眼球は20〜40ミリ秒の超高速跳躍運動（Rayner, 1998）を行い、即座に中心窩を合わせて脅威の有無を識別します。',
      },
    },
    {
      '@type': 'Question',
      name: '角の飛び出し（ピーク）時に撃ち負ける主な原因は何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '角度を刻まずに体を大きく晒してしまう「オーバーピーク」や、空間の奥行きを眼球でスキャンせずクロスヘアの中心だけを凝視してしまうことが原因です。',
      },
    },
    {
      '@type': 'Question',
      name: 'プリエイム（クロスヘア配置）とクリアリングの関係は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '壁越しに敵の頭部がある位置を予測してクロスヘアを配置したまま角を通過することで、視覚確認後のフリック移動が不要になり、反応時間が劇的に短縮されます。',
      },
    },
    {
      '@type': 'Question',
      name: '動的ドアウェイ索敵ドリルはどのような効果がありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '連続するドア枠の隙間から不規則に出現する標的に対し、即座に角度を識別してエイムをピタリと止めるストッピング反応力を実践的に鍛えます。',
      },
    },
    {
      '@type': 'Question',
      name: 'ドンダース（Donders, 1868）の選択反応時間はクリアリングとどう関係しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '単一の刺激に反応する単純反応時間（約200ms）と異なり、複数のドアのどこから敵が出るか識別する状況は選択反応（Choice RT）となり、脳の認知処理負荷が増加します。',
      },
    },
    {
      '@type': 'Question',
      name: '144Hzや240Hzの高リフレッシュレートモニターの利点は何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '高駆動ディスプレイはフレーム遅延を4〜7ms未満に短縮します（Woods et al., 2015）。ドアの影から飛び出す敵の輪郭を素早く察知し、初弾を早く撃つことができます。',
      },
    },
    {
      '@type': 'Question',
      name: 'クリアリング練習の推奨時間は1日何分ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'マッチ開始前に10〜15分間行うのが最も効果的です。正しい視覚スキャンと角の確認ルーティンを脳に刷り込み、無謀な飛び出しを防ぎます。',
      },
    },
    {
      '@type': 'Question',
      name: 'このクリアリングツールは無料で利用できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、SkillDrillsはすべてのトレーニングツールを完全無料で提供しており、インストールやアカウント登録なしでブラウザですぐに測定可能です。',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'クリアリング＆コーナーチェック訓練手順',
  description: '開口部の幾何学把握、パイ・スライシング、および突発的標的の撃墜をマスターする4ステップ。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '開口部の構造分析とサッケード準備',
      text: '侵入するドアや角の角度関係を素早く把握し、確認すべき射線の優先度を頭の中で整理します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'パイ・スライシングで角度を少しずつ刻む',
      text: '角を一気に曲がらず、弧を描くように移動しながら視界を薄い扇状に少しずつ広げていきます。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'ドア枠からの突発出現を瞬時に視認',
      text: '開口部から敵シルエットが現れた瞬間、首を振らずに眼球の跳躍で即座に中心窩を合わせます。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '確実な中心着弾とエイム静止',
      text: '標的が射線外へ抜ける前に、中央へ正確なクリックを行いブレずにエイムをストップさせます。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('rayner1998', 'donders1868', 'woods2015'),
  intro: {
    title: 'クリアリング練習＆コーナーチェック索敵ガイド',
    paragraphs: [
      'VALORANTやCS2などのタクティカルシューターにおいて、勝率を決定づける最重要技術は闇雲な突入ではなく徹底した「クリアリング（角度の確認）」です。角を不用意に曲がると複数の敵射線に同時に晒され、撃ち合う前に排除されます。',
      'パイ・スライシング（Slicing the Pie）は、障害物を軸にして扇状に角度を刻みながら侵入する戦術的基礎です。この際、視覚系は超高速の跳躍性眼球運動（サッケード；Rayner, 1998）と中心窩への結像を繰り返し、死角の敵を識別します。',
      '認知心理学的には、敵の有無を判別して射撃を行う「選択反応時間（Choice RT；Donders, 1868）」に分類されます。高リフレッシュレート環境（Woods et al., 2015）で反復練習することで、死角からの飛び出しに対する初動判断とエイムの制動力が極限まで高まります。',
    ],
  },
  benchmarks: {
    title: 'クリアリング＆コーナー索敵パフォーマンス基準表',
    headers: ['階級（ティア）', 'ランク区分', '角度識別反応時間', '着弾精度', 'パーセンタイル'],
    rows: [
      ['Tier 1', '神域・プロ（Grandmaster / Pro）', '< 160 ms', '98 %+', '上位 1 %'],
      ['Tier 2', 'エリート（Master / Diamond）', '160 – 210 ms', '94 – 97 %', '上位 5 %'],
      ['Tier 3', '実力者（Platinum / Gold）', '211 – 270 ms', '88 – 93 %', '上位 15 %'],
      ['Tier 4', '中級者（Silver / Bronze）', '271 – 350 ms', '78 – 87 %', '上位 50 %'],
      ['Tier 5', '初級者（Novice / Iron）', '> 350 ms', '< 78 %', '基準値'],
    ],
    note: '跳躍性視覚走査および選択反応時間に関する研究（Rayner, 1998; Donders, 1868）と最新ゲーム機器環境（Woods et al., 2015）を統合した基準値です。',
  },
  protocols: {
    title: '科学的4段階クリアリング訓練プロトコル',
    description: '実践的な索敵習慣を無意識レベルで再現するための体系的手順。',
    items: [
      {
        title: '開口部の構造分析とサッケード準備',
        description: '侵入するドアや角の角度関係を素早く把握し、確認すべき射線の優先度を頭の中で整理します。',
      },
      {
        title: 'パイ・スライシングで角度を少しずつ刻む',
        description: '角を一気に曲がらず、弧を描くように移動しながら視界を薄い扇状に少しずつ広げていきます。',
      },
      {
        title: 'ドア枠からの突発出現を瞬時に視認',
        description: '開口部から敵シルエットが現れた瞬間、首を振らずに眼球の跳躍で即座に中心窩を合わせます。',
      },
      {
        title: '確実な中心着弾とエイム静止',
        description: '標的が射線外へ抜ける前に、中央へ正確なクリックを行いブレずにエイムをストップさせます。',
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

export default function JapaneseMarketDoorsPursuitPage() {
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
      <MarketDoorsPursuitClient copy={{ title: 'クリアリング練習' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/ja/drills/reaction-speed/market-doors-pursuit"
        />
      </div>
      <DrillFooter />
    </>
  );
}
