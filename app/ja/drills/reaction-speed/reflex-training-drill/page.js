import ReflexTrainingDrillWrapper from '@/app/drills/reaction-speed/reflex-training-drill/ReflexTrainingDrillWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (reaction-speed / reflex-training-drill)
// PRIMARY DOMESTIC: "反射神経ゲーム" — 732 exact Bing searches/mo (Domestic #1 winner)
//                    "反射神経テスト" — 2,526 exact / 2,681 broad searches/mo
// SECONDARY / LSI:
//                    "反射神経 鍛える" — 85 exact / 85 broad searches/mo
//                    "反射神経測定"    — 176 searches/mo
//                    "動体視力 ゲーム"  — Visual reflex query
//                    "分割注意力"      — Divided attention / cognitive query
// WINNER TITLE:      反射神経ゲーム – 複数ターゲット瞬間認識・反射神経測定ドリル | SkillDrills
// ============================================================

export const metadata = {
  title: '反射神経ゲーム – 複数ターゲット瞬間認識・反射神経測定ドリル | SkillDrills',
  description:
    '無料オンライン反射神経ゲーム。次々に画面上に同時出現するターゲットを瞬時に判断してタップ・クリック。ヒックの法則と分割注意力を鍛え、動体視力と反射神経をミリ秒単位で強化。',
  keywords: [
    '反射神経ゲーム',
    '反射神経テスト',
    '反射神経',
    '反射神経 鍛える',
    '動体視力 ゲーム',
    '分割注意力',
    'fps 反応速度',
    'エイム 反応',
    '反射速度',
    'リアクションゲーム',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill',
    languages: getAlternateLanguages('/drills/reaction-speed/reflex-training-drill'),
  },
  openGraph: {
    title: '反射神経ゲーム – 複数ターゲット瞬間認識・反射神経測定ドリル | SkillDrills',
    description:
      '無料オンライン反射神経ゲーム。次々に現れるターゲットを瞬時に判断してタップ・クリック。動体視力と分割注意力を鍛えるオンライントレーニング。',
    url: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '反射神経ゲーム – 複数ターゲット瞬間認識・反射神経測定ドリル | SkillDrills',
    description:
      '無料の反射神経ゲーム。複数ターゲットを素早く消去して反射神経と分割注意力を鍛えよう。',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: '訓練ハブ', item: 'https://skilldrills.online/ja/drills' },
    { '@type': 'ListItem', position: 3, name: '反射神経・反応速度', item: 'https://skilldrills.online/ja/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '反射神経ゲーム', item: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '反射神経ゲーム – 複数ターゲット瞬間認識・反射神経測定ドリル',
  alternateName: ['反射神経ゲーム', '反射神経ドリル', 'マルチターゲット反射テスト', '分割注意力ゲーム'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description:
    'ブラウザ上で複数ターゲットの連続出現に対する瞬時反応と分割注意力を測定・訓練する無料ゲームツール。',
  browserRequirements: 'JavaScript対応の最新Webブラウザ（Chrome, Edge, Safari, Firefox）',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '反射神経ゲーム — 複数ターゲット瞬間認識・反射ドリル | SkillDrills',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill',
  description:
    '無料オンライン反射神経ゲーム。複数ターゲットを制限時間内に素早くクリックして反射神経を鍛えます。',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'JavaScript対応の最新Webブラウザが必要。',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: '反射神経, 分割注意力, 視覚判断力, マウスエイム精度, サッケード眼球運動',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '動体視力・反射神経トレーニングゲーム',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill',
  description: '動体視力・反射神経トレーニングゲーム',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '反射神経ゲームのプレイ手順',
  description: 'ブラウザ上で複数ターゲットを素早く消去して反射神経を鍛える方法。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'ゲームの開始',
      text: '「トレーニング開始」ボタンを押して全画面の反射神経測定モードを起動します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'ターゲット群の視野把握',
      text: '画面内に同時に現れる複数ターゲットと、各ターゲット周囲のカウントダウンリングに素早く視線を配ります。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '優先順位を決めて即クリック',
      text: '消滅時間が迫っているターゲットを優先し、正確に中心をクリックまたはタップします。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'コンボの継続とレベルアップ',
      text: 'ミスを避け連続で消去することでレベルが上昇し、より多くのターゲットが高速に出現します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill#step-4'
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: '反射神経ゲームとはどのようなトレーニングですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '画面上にランダムかつ同時に出現する複数のターゲットを、消滅する前に素早く認識して順次クリックしていく実践的な認知・反射統合ドリルです。',
      },
    },
    {
      '@type': 'Question',
      name: '反射神経はトレーニングで向上させることができますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。末梢神経の伝達速度そのものは生物学的に一定ですが、視覚的空間把握、刺激の弁別速度、および運動プログラム選択に要する脳内処理時間（選択反応時間）は反復練習により劇的に短縮できます（Donders, 1868）。',
      },
    },
    {
      '@type': 'Question',
      name: '「単純反応時間」と「選択反応時間」の違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '単純反応時間はあらかじめ決まった1つの刺激に即座に反応する動作（約180〜220ms）です。選択反応時間は複数の刺激から適切な対象を判断・選択して反応するため、通常50〜150ms以上の判断遅延が加わります。',
      },
    },
    {
      '@type': 'Question',
      name: 'ヒックの法則（Hick\'s Law）は反射速度にどう影響しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ヒックの法則（Hick, 1952）によれば、選択肢の数が増えるにつれて反応時間は対数関数的に増加します（RT = a + b * log2(n + 1)）。複数ターゲットドリルを継続することで、ターゲット群を幾何学的パターンとして一括知覚し、判断の遅延を圧縮できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'ゲームにおける「分割注意力（Divided Attention）」とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '視野狭窄（トンネルビジョン）に陥ることなく、広い視野内で同時に発生する複数の視覚情報を並行して監視・処理する能力です。FPSにおける索敵や複数戦での生存率に直結します。',
      },
    },
    {
      '@type': 'Question',
      name: '複数ターゲットを効率よく消去するコツは？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '最も近いものを適当にクリックするのではなく、消滅リングが狭まっているターゲットを最優先し、ターゲット間を結ぶ最短の移動ライン（一筆書きのイメージ）を意識してカーソルを走らせることが重要です。',
      },
    },
    {
      '@type': 'Question',
      name: 'なぜ乱戦になると反応が遅れてしまうのですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '脳の認知過負荷や「心理的不応期（Psychological Refractory Period）」（Welford, 1952）により、直前の刺激を処理している最中に現れた次の刺激に対して脳の処理が一時的に保留されるためです。',
      },
    },
    {
      '@type': 'Question',
      name: 'モニターのリフレッシュレートは成績に影響しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。60Hz（16.7ms）に比べ、144Hz（6.9ms）や240Hz（4.2ms）のモニターはターゲット出現のアニメーションを滑らかかつ早期に表示するため、視覚的な遅延が最小化されます（Woods et al., 2015）。',
      },
    },
    {
      '@type': 'Question',
      name: '1日どのくらいトレーニングすれば効果がありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1日10〜15分間の集中したセッションが神経系の適応に最も効果的です。疲労した状態での長時間の過剰プレイは腱や手首への負担となるため避けてください。',
      },
    },
    {
      '@type': 'Question',
      name: 'この反射神経ゲームは無料・インストール不要ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。完全無料で、会員登録やアプリのダウンロードなしでブラウザ上ですぐにプレイ可能です。スマートフォンやタブレットのタッチ操作にも対応しています。',
      },
    },
  ],
};

const reflexDrillGuide = {
  heading: '反射神経ゲーム ガイド：複数ターゲット認識と分割注意力の強化',
  intro: [
    '反射神経ゲームは、単一の光に反応する「単純反応時間」から一歩進み、複雑な環境下で複数の脅威を瞬時に選別する「選択反応時間」を鍛える本格的な認知トレーニングです。',
    'VALORANT、CS2、Apex LegendsなどのFPSや格闘ゲーム、モータースポーツの実戦では、常に複数の要素が視界に飛び込んできます。ターゲットの優先順位を素早く見極め、淀みなく撃破する能力が勝敗を分けます。',
    '科学的背景：Donders (1868) の精神時間測定法によれば、選択反応（Type B）には刺激の弁別と運動の選択という認知過程が含まれます。さらにヒックの法則（Hick, 1952）により、選択肢の増加に伴って反応時間は増大します。本ドリルはこれらの認知的ボトルネックを実践的に圧縮します。',
    '測定メカニズム：本ゲームはHTML5 Canvasとブラウザの requestAnimationFrame ループにより、クライアント側でミリ秒単位の高精度タイムスタンプ（performance.now()）を用いて正確に動作します（Woods et al., 2015）。',
  ],
  benchmarks: {
    title: '複数ターゲット反射速度ベンチマーク表',
    headers: ['ターゲット平均処理時間', 'ランク区分', '選択遅延特性', '認知プロファイル', '推奨トレーニング着眼点'],
    rows: [
      ['< 250 ms / 目標', '頂点・プロ (Apex / Pro)', '選択遅延ほぼゼロ', '瞬間的な空間クラスタ認識と滑らかなサッケード', '最高レベルでの同時出現密度維持'],
      ['250 – 320 ms / 目標', 'エリート (Elite)', '圧縮された判断遅延', '迅速な優先順位判断と目標間のブレない視線移動', 'クリック間の硬直時間（Dwell Time）の削減'],
      ['321 – 400 ms / 目標', '上級者 (Advanced)', '標準的な多肢選択反応', '確実な初弾認識と端のターゲットに対するわずかな迷い', '周辺視野を活用した外側ノードの早期察知'],
      ['401 – 500 ms / 目標', '中級者 (Intermediate)', '認知負荷の増大', '単一目標には強いが密集バースト時に一瞬のフリーズ', '消滅リングの狭い目標から優先処理する訓練'],
      ['> 500 ms / 目標', '初級・育成 (Developing)', '高い決定遅延', '心理的不応期と視覚探索の迷いが顕著', '無理に急がず最短経路の幾何学的移動を意識'],
    ],
    note: '本基準はヒト選択反応時間および精神時間測定学の文献（Donders, 1868; Hick, 1952）に基づく指標です。',
  },
  techniques: {
    title: 'マルチターゲット反射神経の最適化テクニック',
    items: [
      {
        name: 'トリアージ（優先順位付け）と最短経路移動',
        desc: 'バーストが出現した際、画面上を無作為に往復するのではなく、消滅寸前のターゲットから順に線や円弧を描くように移動します。',
        tips: '個々の点を別々に追うのではなく、クラスタ全体を1つの幾何学的図形として捉えましょう。',
      },
      {
        name: '周辺視野による次弾ターゲット登録',
        desc: 'クリックの中心は中心視野で捉えますが、次のターゲットの出現位置は周辺視野の桿体細胞で感知します。',
        tips: 'カーソルだけを目で追わず、視野の中心をターゲット群の重心付近に保ちましょう。',
      },
      {
        name: '決定的な急制動（ストッピング力）',
        desc: 'ターゲットを行き過ぎて戻るマイクロ補正は50〜100msのロスを生みます。目標中心でピタリと止まるマウス操作を意識します。',
        tips: '滑りすぎるマウスパッドより、適度な摩擦と制動力のあるコントロール系パッドが適しています。',
      },
      {
        name: 'ウォームアップと神経系の覚醒',
        desc: '反射速度は睡眠状態や身体のウォームアップに左右されます。実戦マッチ前に5〜10分本ドリルを行うことで即戦力を引き出せます。',
        tips: '手先が冷えていると神経伝導速度が低下するため、手を温めてからプレイしましょう。',
      },
    ],
  },
  steps: [
    '「トレーニング開始」を押して全画面のゲームモードを起動します。',
    '画面中央付近に視線をリラックスさせて配置します。',
    'ターゲット群が出現したら、瞬時に配置をスキャンして撃破順を決定します。',
    '各ターゲットが消滅する前に、中心を素早く正確にクリックまたはタップします。',
  ],
  audience: 'VALORANT, CS2, Apex LegendsなどのFPSプレイヤー、格闘ゲーム競技者、反射神経と分割注意力を向上させたいすべての方。',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'dye2009', 'shelton2010', 'jain2015'),
  related: [
    { href: '/ja/drills/reaction-speed', label: '反射神経ハブ' },
    { href: '/ja/drills/reaction-speed/reaction-time-test', label: '反射神経テスト・反応速度テスト' },
    { href: '/ja/drills/reaction-speed/fps-tracking-trainer', label: 'FPS追従エイムトレーナー' },
    { href: '/ja/drills/motor/movement-speed/rapid-tapping', label: '連打測定・CPSテスト' },
    { href: '/ja/drills/fps/flick-shot-training', label: 'フリックショット練習' },
  ],
};

export default function JapaneseReflexTrainingDrillPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReflexTrainingDrillWrapper copy={{ title: '反射神経ゲーム' }} />
      <DrillGuide guide={reflexDrillGuide} />
    </>
  );
}
