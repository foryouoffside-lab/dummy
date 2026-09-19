import FPSTrackingTrainerClient from '@/app/drills/reaction-speed/fps-tracking-trainer/FPSTrackingTrainerWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – ja-JP (reaction-speed / fps-tracking-trainer)
// PRIMARY DOMESTIC: "トラッキングエイム 練習" / "追いエイム トレーナー"
// SECONDARY / LSI:
//   "スムーズエイム 測定" / "エイムのブレ 改善"
//   "ストレイフ 追いエイム" / "Apex 追いエイム 練習"
// ============================================================

export const metadata = {
  title: 'トラッキングエイム練習 – 追いエイム測定 | SkillDrills',
  description: '無料のトラッキングエイム（追いエイム）練習ツール。動く標的への滑らかなマウス追従と視線追従を鍛え、エイムのブレやガタつきをブラウザで解消。',
  keywords: [
    'トラッキングエイム 練習',
    '追いエイム トレーナー',
    'スムーズエイム 測定',
    'エイムのブレ 改善',
    'ストレイフ 追いエイム',
    'Apex 追いエイム 練習',
    'マウス 追従 トレーニング',
    '動体視力 エイム',
    '滑らかなエイム やり方',
    'FPS 照準 安定化',
    '反応型 エイム練習',
    'スムーズパシュート 訓練',
  ],
  openGraph: {
    title: 'トラッキングエイム練習 – 追いエイム測定 | SkillDrills',
    description: '無料のトラッキングエイム（追いエイム）練習ツール。動く標的への滑らかなマウス追従と視線追従を鍛え、エイムのブレやガタつきをブラウザで解消。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'トラッキングエイム練習 – 追いエイム測定 | SkillDrills',
    description: '無料のトラッキングエイム（追いエイム）練習ツール。動く標的への滑らかなマウス追従と視線追従を鍛え、エイムのブレやガタつきをブラウザで解消。',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer',
    languages: getAlternateLanguages('/drills/reaction-speed/fps-tracking-trainer'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: 'ドリル一覧', item: 'https://skilldrills.online/ja/drills' },
    { '@type': 'ListItem', position: 3, name: '反応速度', item: 'https://skilldrills.online/ja/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'トラッキングエイム練習', item: 'https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'トラッキングエイム練習 – スムーズエイム＆追いエイム測定',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description: 'FPSプレイヤー向けのブラウザ完結型トラッキングエイム訓練ツール。動く標的への滑らかな照準追従とマウス操作の安定性を強化。',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'ja-JP',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'トラッキングエイム トレーナー',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, ポインターロック対応ブラウザ',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  url: 'https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer',
  inLanguage: 'ja-JP',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'FPS Tracking Trainer – 連続標的追従エイムゲーム',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer',
  description: 'スムーズパシュート眼球運動と滑らかなマウス制御を極め、不規則に動く標的を正確に撃ち続けるブラウザゲーム。',
  genre: ['Action', 'エイムトレーナー', 'eスポーツ視覚訓練'],
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
      name: 'FPSトラッキングエイム（追いエイム）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '激しく左右に動く敵キャラクターに対し、照準をズレや引っかかりなく滑らかに乗せ続けるエイム技術です。眼球のスムーズパシュートと手指の微細制御が連動します。',
      },
    },
    {
      '@type': 'Question',
      name: '追いエイムを安定させるための3つの基本原則は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'マウスの握り込みすぎを抑えて微振動を防ぐこと、敵の切り返しを予測せず実際の移動速度ベクトルを目で追うこと、そして手首（微調整）と腕（大きな滑走）を柔軟に連携させることです。',
      },
    },
    {
      '@type': 'Question',
      name: '追いエイム時に照準が細かくガタつく（Shaky Aim）原因は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '筋肉の過度な緊張、微細な震えを拡大してしまう高センシ設定、あるいは滑らかな追従ではなく細かいフリック操作で無理にズレを修正しようとすることが原因です。',
      },
    },
    {
      '@type': 'Question',
      name: 'トラッキング中はクロスヘアと敵のどちらを見るべきですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '敵のキャラクターモデルを直接注視してください。視覚心理学（Krauzlis, 2004）によれば、標的の速度情報に意識を集中することで、脳が正確な速度差を計算して修正できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'スムーズパシュート（滑動性眼球運動）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '動く対象の速度に目の角速度を一致させ、網膜の中心窩に対象を結像させ続ける眼球運動です（Rashbass, 1961）。',
      },
    },
    {
      '@type': 'Question',
      name: 'トラッキングエイムに適したマウス感度（センシ）は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '振り向き28cm〜45cm程度の中感度が最適とされています。遠距離の微細なコントロール精度を保ちつつ、近距離の切り返しにも腕を大きく使って追従できます。',
      },
    },
    {
      '@type': 'Question',
      name: '高リフレッシュレートモニターは追いエイムに有効ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '極めて有効です。240Hzディスプレイは表示遅延を4.1msに低減し（Woods et al., 2015）、残像感を大幅に減らすことで敵の減速や切り返しの初動を早く認識できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'ストレイフ（左右切り返し）への追従精度を上げる練習法は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ランダムに方向転換するリアクティブ設定で練習し、切り返しのタイミングをヤマ勘で先読みせず、目で確認してから冷静にマウスを切り替える習慣をつけます。',
      },
    },
    {
      '@type': 'Question',
      name: 'トラッキングエイムの推奨練習時間は1日何分ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1日15〜25分が最適です。45分以上の連続練習は筋疲労を招き、不要な力みや雑なフリック癖の原因となるため避けてください。',
      },
    },
    {
      '@type': 'Question',
      name: 'このトラッキング測定ツールは無料で利用できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、SkillDrillsはすべてのエイムドリルを完全無料で提供しており、ダウンロードやログイン不要でブラウザから高精度に測定できます。',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'トラッキングエイム＆追いエイム訓練手順',
  description: '感度の最適化、標的への視線集中、および滑らかなマウス追従を習得する4ステップ。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '感度調整とフルスクリーン化',
      text: '自分のゲーム環境に合わせたDPIを設定し、画面を最大化してブラウザ枠による視界の阻害を排除します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '移動する標的そのものに視線を固定',
      text: '自分のクロスヘアを注視するのではなく、動いている標的の中心に意識と視線を完全に合わせます。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '滑らかなマウス滑走（スムーズパシュート）',
      text: '手首の力を抜き、標的の等速移動に合わせてマウスを引っかかりなく滑らかに動かし続けます。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '標的の切り返しに冷静に追従',
      text: '標的が進行方向を反転させた際、焦ってフリックせず、目視確認後に落ち着いてマウス軌道を修正します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('krauzlis2004', 'rashbass1961', 'green2003', 'woods2015'),
  intro: {
    title: 'トラッキングエイム練習＆スムーズエイム攻略ガイド',
    paragraphs: [
      'Apex Legendsやオーバーウォッチなど機動力が高いFPSにおいて、最も安定した火力を発揮するために欠かせないのが「トラッキングエイム（追いエイム）」です。単発のフリック射撃と異なり、トラッキングは視覚入力と筋運動のリアルタイムな連続同期を要求します。',
      '神経眼科学的には、動く対象の速度に目を同調させる「スムーズパシュート（滑動性眼球運動；Rashbass, 1961）」に基づいています。照準がズレた際に細かいフリックで強引に合わせようとするとエイムが震えるため、脱力して一定のスピードでマウスを滑らせることが鉄則です。',
      '高リフレッシュレートモニター（Woods et al., 2015）で練習を重ねることで、敵の機動変化をいち早く察知（Krauzlis, 2004; Green & Bavelier, 2003）し、標的に吸い付くような高精度の照準コントロールが身につきます。',
    ],
  },
  benchmarks: {
    title: 'トラッキング精度＆有効追従率パフォーマンス基準表',
    headers: ['階級（ティア）', 'ランク区分', '追従精度（命中率）', '有効トラッキング率', 'パーセンタイル'],
    rows: [
      ['Tier 1', '神域・プロ（Grandmaster / Pro）', '95 %+', '90 %+ 維持率', '上位 1 %'],
      ['Tier 2', 'エリート（Master / Diamond）', '88 – 94 %', '80 – 89 % 維持率', '上位 5 %'],
      ['Tier 3', '実力者（Platinum / Gold）', '78 – 87 %', '68 – 79 % 維持率', '上位 15 %'],
      ['Tier 4', '中級者（Silver / Bronze）', '65 – 77 %', '50 – 67 % 維持率', '上位 50 %'],
      ['Tier 5', '初級者（Novice / Iron）', '< 65 %', '< 50 % 維持率', '基準値'],
    ],
    note: '滑動性眼球運動および速度誤差補正の研究（Rashbass, 1961; Krauzlis, 2004）と最新ゲーム機器環境（Woods et al., 2015）をもとに算出した基準値です。',
  },
  protocols: {
    title: '科学的4段階トラッキング訓練プロトコル',
    description: 'エイムのブレをなくし、吸い付くような照準追従を習得するための体系的手順。',
    items: [
      {
        title: '感度調整とフルスクリーン化',
        description: '自分のゲーム環境に合わせたDPIを設定し、画面を最大化してブラウザ枠による視界の阻害を排除します。',
      },
      {
        title: '移動する標的そのものに視線を固定',
        description: '自分のクロスヘアを注視するのではなく、動いている標的の中心に意識と視線を完全に合わせます。',
      },
      {
        title: '滑らかなマウス滑走（スムーズパシュート）',
        description: '手首の力を抜き、標的の等速移動に合わせてマウスを引っかかりなく滑らかに動かし続けます。',
      },
      {
        title: '標的の切り返しに冷静に追従',
        description: '標的が進行方向を反転させた際、焦ってフリックせず、目視確認後に落ち着いてマウス軌道を修正します。',
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

export default function JapaneseFPSTrackingTrainerPage() {
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
      <FPSTrackingTrainerClient copy={{ title: 'トラッキングエイム練習' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/ja/drills/reaction-speed/fps-tracking-trainer"
        />
      </div>
      <DrillFooter />
    </>
  );
}
