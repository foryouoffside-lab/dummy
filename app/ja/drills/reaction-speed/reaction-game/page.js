import ReactionSimulatorWrapper from '@/app/drills/reaction-speed/reaction-game/ReactionSimulatorWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (reaction-speed / reaction-game)
// PRIMARY DOMESTIC: "反射神経ゲーム" — Gaming reflex winner in Japan
//                   "動体視力 ゲーム" — Visual tracking & reflex query
// SECONDARY / LSI:  "リアクションゲーム" — Action reaction query
//                   "反射神経 鍛える" — Training search
//                   "落下ターゲット 反射" — Falling target reflex query
// WINNER TITLE:     反射神経ゲーム – 無料オンライン動体視力測定 | SkillDrills
// ============================================================

export const metadata = {
  title: '反射神経ゲーム – 無料オンライン動体視力測定 | SkillDrills',
  description:
    '無料オンライン反射神経ゲーム。落下するターゲットを素早く迎撃し、動体視力と縦方向の追跡能力、手と目の協調性をブラウザで測定・トレーニング。',
  keywords: [
    '反射神経ゲーム',
    '反射神経テスト',
    'リアクションゲーム',
    '動体視力 ゲーム',
    '反射神経 鍛える',
    'fps 反応速度',
    '落下ターゲット',
    '反射速度',
    'エイム 反応',
    'オンライン 反射ゲーム',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-game',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-game'),
  },
  openGraph: {
    title: '反射神経ゲーム – 無料オンライン動体視力測定 | SkillDrills',
    description:
      '無料オンライン反射神経ゲーム。落下するターゲットを素早く迎撃し、動体視力と縦方向の追跡能力、手と目の協調性をブラウザで測定・トレーニング。',
    url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-game',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '反射神経ゲーム – 無料オンライン動体視力測定 | SkillDrills',
    description:
      '無料ブラウザ反射神経ゲーム。加速落下するターゲットを瞬時に撃破して動体視力と反射速度を測定。',
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
    { '@type': 'ListItem', position: 3, name: '反応速度・反射神経', item: 'https://skilldrills.online/ja/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '反射神経ゲーム', item: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-game' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '反射神経ゲーム – オンライン動体視力・反射速度測定ツール',
  alternateName: ['反射神経ゲーム', '動体視力ゲーム', 'リアクションゲーム', 'エイム反応チェッカー'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description:
    'ブラウザ上で落下ターゲットを迎撃し、縦方向の動体視力追跡と手と目の協調性を鍛える無料の反射神経ゲーム。',
  browserRequirements: 'JavaScript対応の最新Webブラウザ（Chrome, Edge, Safari, Firefox）',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '反射神経ゲーム — 無料オンライン動体視力測定 | SkillDrills',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-game',
  description:
    '無料オンライン反射神経ゲーム。落下するターゲットを迎撃して動体視力と反射速度を測定します。',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'JavaScript対応の最新Webブラウザが必要。',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: '反射神経, 反応速度, 動体視力, 縦方向トラッキング, 手と目の協調性',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '反射神経ゲーム - 落下ターゲット迎撃トレーニング',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-game',
  description: '加速落下する円形ターゲットを素早く迎撃し、反射速度と動体視力を測定するゲーム。',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '反射神経ゲームのプレイ手順',
  description: '落下するターゲットを捕捉・迎撃して反射速度を鍛える4つのステップ。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'ゲーム開始',
      text: '「トレーニング開始」ボタンを押して全画面の反射ゲームアリーナを起動します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-game#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'ターゲットの出現を感知',
      text: '画面上部に広い視野を保ち、落下する球体が出現した瞬間を素早く感知します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-game#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '画面上部で即時迎撃',
      text: 'ターゲットが加速する前に画面上部でクリックし、タイムボーナスを最大化します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-game#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'コンボ倍率の維持とスコア判定',
      text: 'ミスを避け連続で撃破し、3.0倍コンボを維持して最終ランクを確認します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-game#step-4'
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-15',
  mainEntity: [
    {
      '@type': 'Question',
      name: '反射神経ゲームとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '反射神経ゲームは、動的な視覚刺激に対して大脳での認知と筋肉の運動出力を連動させ、反射速度、視覚追尾、手と目の協調性を測定・訓練するインタラクティブなトレーニングツールです。',
      },
    },
    {
      '@type': 'Question',
      name: '人間の平均的な反応時間はどれくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '単一の視覚刺激に対する単純反応時間は平均200〜250msです（Kosinski, 2008）。複数ラインから落下位置を判別する選択反応時間（Choice Reaction Time）は、ヒックの法則（Hick, 1952）により250〜350msに増加します。',
      },
    },
    {
      '@type': 'Question',
      name: 'FPSにおいて縦方向の視覚追尾（Vertical Tracking）が重要な理由は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Apex LegendsやOverwatch 2等では敵が高所から落下したりジャンプパッドで跳躍します。縦方向のY軸トラッキングを安定させることで、急激な上下運動に対しても照準ブレを起こさず即座に迎撃できます。',
      },
    },
    {
      '@type': 'Question',
      name: '反射神経ゲームで実際の反射速度を向上させることは可能ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。動的ターゲットの迎撃訓練を反復することで視覚野の情報処理が効率化され、神経伝達遅延を15〜30ms短縮できることが科学的に実証されています（Dye et al., 2009）。',
      },
    },
    {
      '@type': 'Question',
      name: '単純反応時間と選択反応時間の違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '単純反応時間はあらかじめ決まった単一の合図に反応する時間です。一方、選択反応時間は複数の選択肢の中からターゲットを瞬時に識別して適切な運動を実行するため、大脳での処理時間が加算されます。',
      },
    },
    {
      '@type': 'Question',
      name: '反射神経ゲームで高得点を出すコツは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ターゲットが下部に落ちるのを待たず、出現直後の画面上部1/3エリアで即座にクリックすることで高いタイムボーナスと最大3.0倍のコンボ倍率をキープできます。',
      },
    },
    {
      '@type': 'Question',
      name: 'プロゲーマーの反応速度はどれくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VALORANTやCS2のトッププロは単純反応時間で150〜180ms、選択反応環境でも200ms前後の驚異的な数値を維持しています。',
      },
    },
    {
      '@type': 'Question',
      name: '日によって反応速度にムラがある原因は何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '睡眠不足、脳の疲労、体内時計（概日リズム）、カフェイン摂取状態、およびモニターの表示遅延やマウスのポーリングレート等の環境要因が複合的に影響します。',
      },
    },
    {
      '@type': 'Question',
      name: '高リフレッシュレートモニター（144Hz/240Hz）の効果はありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。60Hz（16.7ms）に対して144Hz（6.9ms）や240Hz（4.1ms）モニターは刺激を物理的に早く描画するため、実質的な測定スコアが10ms以上向上します（Woods et al., 2015）。',
      },
    },
    {
      '@type': 'Question',
      name: 'スマートフォンやタブレットのタッチ操作でも遊べますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。タッチスクリーンに完全最適化されたレスポンシブキャンバスを採用しており、モバイルブラウザからアプリ不要ですぐにプレイできます。',
      },
    },
    {
      '@type': 'Question',
      name: '動的難易度調整（Adaptive Difficulty）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'スコアとコンボが続くにつれてレベルが上昇し、ターゲットの落下加速度の上昇、出現間隔の短縮、判定範囲の縮小が自動的に行われます。',
      },
    },
    {
      '@type': 'Question',
      name: '効果的な練習頻度はどれくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'プレイ前のウォーミングアップとして毎日5〜10分程度行うのが最適です。手に過度な負担をかけずに視覚と運動神経の連動性を維持できます。',
      },
    },
    {
      '@type': 'Question',
      name: '反射神経や反応速度を測定するゲームにはどのような種類がありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '画面の色変化に素早く反応する単純反応テスト、落下するターゲットを迎撃する動的反射ゲーム、テンポの速い音ゲー（リズムゲーム）、FPS向けのエイム練習ツールなどがあり、それぞれ求められる神経処理段階が異なります。',
      },
    },
    {
      '@type': 'Question',
      name: '手と目の協調性（Hand-Eye Coordination）を高めるにはどんなゲームが適していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '垂直落下ターゲットの迎撃ゲームやリズムアクション、高速トラッキングエイム訓練が最適です。視覚の注視点とマウスカーソルの空間位置を瞬時に一致させる能力を集中的に鍛えることができます。',
      },
    },
    {
      '@type': 'Question',
      name: 'この反射神経ゲームは完全無料で利用できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。SkillDrillsの反射神経ゲームは完全無料であり、会員登録やアプリのダウンロード、煩わしいポップアップ広告なしで、Webブラウザから直接ご利用いただけます。',
      },
    },
  ],
};

const reactionGameGuideJa = {
  heading: '反射神経ゲーム ガイド：縦方向トラッキングと運動迎撃メカニズム',
  intro: [
    '反射神経ゲームは、動的な視覚刺激に対して大脳での認知と筋肉の運動出力を連動させ、反射速度、視覚追尾、手と目の協調性を測定・訓練するインタラクティブなトレーニングツールです。',
    '単一ボタンの単純クリック測定とは異なり、複数ラインから落下する球体を捕捉する本ゲームはヒックの法則（Hick, 1952）に基づく選択反応時間（Choice Reaction Time）を要求します。大脳は重力加速度による落下軌道を瞬時に予測し、滑動性眼球運動（Smooth Pursuit）と跳躍性眼球運動（Saccade）を組み合わせて正確な迎撃を行います（Carpenter, 1988）。',
    '高精度測定の仕組み：本ツールはブラウザの高精度 performance.now() APIを活用し、サーバーへの通信ラグなしで端末内の純粋な入力をミリ秒単位で記録します。標準の60Hzモニターでは最大16.7msのフレーム遅延がありますが、144Hz（6.9ms）や240Hz（4.1ms）のゲーミングモニターを使用することで遅延を最小化できます（Woods et al., 2015）。',
    '測定精度とハードウェアの影響：すべてのイベントはブラウザの performance.now() 高精度クロックを用いて端末内で直接タイムスタンプ処理され、サーバーへのデータ送信は行われません。Spectre対策によりタイマー分解能は約1msに丸められており、ディスプレイのリフレッシュレートによっても刺激提示が量子化されます（60Hzで約16.7ms、144Hzで約6.9ms、240Hzで約4.1ms；Woods et al., 2015）。またマウスのポーリングレート（125Hzで約8ms、1000Hzで約1ms）も影響します。5ms未満の微小な差異は測定ノイズとして捉え、経時変化を比較する際は同一ハードウェア環境で測定してください。',
  ],
  benchmarks: {
    title: '反射神経ゲーム パフォーマンス基準＆スコア判定表 (45秒測定)',
    headers: ['スコア範囲', '難易度帯', 'スキルプロファイル', '推奨トレーニング着眼点'],
    rows: [
      ['15,000点以上', 'グランドマスター / プロ級', '中心窩での瞬間捕捉とマイクロ秒単位のクリック判断', '複数ターゲットの同時落下時にも冷静なコンボ維持'],
      ['10,000 – 14,999点', 'エリート', '高度な落下軌道予測とミス判定の極小化', '画面上部での迎撃を徹底しタイムボーナスを獲得'],
      ['6,000 – 9,999点', '上級者', '安定した反射神経と一定の加速ウェーブ対応力', '個別追跡よりも周辺視野での出現察知を意識'],
      ['2,500 – 5,999点', '中級者 / 一般平均', '単一目標は安定するが複数ライン同時出現で失点', 'カーソルを中央付近に保ち移動距離を最小化'],
      ['2,500点未満', '初級者 / ビギナー', '見てから動かす遅延が大きく焦りによるミス多発', '速度よりも確実な命中を優先しリズムを構築'],
    ],
    note: 'このスコア基準表は精神物理学および視覚的運動迎撃の科学文献（Hick, 1952; Carpenter, 1988; Woods et al., 2015）を基に作成されています。60Hz環境では約16.7msの表示遅延が発生します。',
  },
  techniques: {
    title: '運動迎撃メカニズムと反射最適化テクニック',
    items: [
      {
        name: '画面上部での先制迎撃（High-Screen Interception）',
        desc: '落下し始めたターゲットを上部1/3のエリアで素早く叩くことで、タイムボーナスを最大化しターゲットが最高速に達する前に安全に処理できます。',
        tips: 'マウスカーソルを画面中央よりやや上方に待機させ、出現した瞬間に最小移動で迎撃しましょう。',
      },
      {
        name: '軌道予測と先読みクリック（Trajectory Projection）',
        desc: '落下するターゲットを後追いで追跡するのではなく、100〜150ms先に到達する位置へカーソルを先回りさせる予測エイムを活用します（Carpenter, 1988）。',
        tips: '大脳運動皮質の事前運動計画を働かせることで、マウスの行き過ぎやブレを大幅に抑制できます。',
      },
      {
        name: '周辺視野を活用した出現察知',
        desc: '1本のラインに視線を固定すると隣接する出現を見落とします。視野を広く保ち、網膜周辺部の桿体細胞による素早い動き感知を活用しましょう。',
        tips: '画面上部の中央付近に柔らかく焦点を置くことで、左右の出現を均等に察知できます。',
      },
      {
        name: 'ハードウェア遅延の最小化',
        desc: '60Hzモニターは毎フレーム約16.7msのバッファ遅延を生みますが、240Hzディスプレイでは4.1msにまで低減されます（Woods et al., 2015）。',
        tips: '1000Hzポーリングレートのゲーミングマウスを使用し、ブラウザの垂直同期を無効化してください。',
      },
    ],
  },
  steps: [
    '「トレーニング開始」ボタンを押して全画面モードを起動します。',
    'マウスカーソルをアリーナの上部中央にリラックスして構えます。',
    '広い視野で上部の出現ラインを捉え、ターゲットが現れた瞬間に感知します。',
    'ターゲットが加速する前に画面上部で正確にクリックします。',
    '連続ヒットでコンボ倍率をキープし、終了後にスコアとランク判定を確認します。',
  ],
  audience: 'Apex Legends、Overwatch、VALORANTなど瞬時の迎撃エイムが求められるゲーマー、動体視力と反射速度を向上させたいスポーツ選手および全てのユーザー。',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('hick1952', 'carpenter1988', 'woods2015', 'kosinski2008'),
  related: [
    { href: '/ja/drills/reaction-speed/reaction-time-test', label: '反射神経テスト・反応速度測定' },
    { href: '/ja/drills/reaction-speed/reflex-training-drill', label: '反射神経トレーニング' },
    { href: '/ja/drills/reaction-speed/fps-tracking-trainer', label: 'FPSトラッキングエイム練習' },
    { href: '/ja/drills/motor/movement-speed/rapid-tapping', label: 'CPSテスト・連打測定' },
  ],
};

export default function JapaneseReactionGamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ReactionSimulatorWrapper copy={{ title: '反射神経ゲーム' }} />
      <DrillGuide guide={reactionGameGuideJa} />
      <DrillFooter />
    </>
  );
}
