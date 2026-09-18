import SteadyHandClient from '@/app/drills/motor/precision-control/steady-hand/SteadyHandClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — steady-hand (Japanese: イライラ棒)
// PRIMARY:  "イライラ棒"                    — 185 Google Suggest queries in JP
//           "イライラ棒 ゲーム"              — High volume gaming intent
// SECONDARY / LSI:
//           "イライラ棒 ゲーム 無料"          — Commercial free-to-play intent
//           "イライラ棒 ゲーム ブラウザ"       — Browser HTML5 canvas demand
//           "電撃イライラ棒 ゲーム"           — Cultural legacy query
//           "イライラ棒 オンライン"           — Web app search
//           "マウス 精度 テスト"              — Precision benchmark query
//           "手ぶれ 測定"                    — Physiological tremor assessment
//           "ステアリングの法則"              — Accot-Zhai Steering Law
// ============================================================

export const metadata = {
  title: 'イライラ棒 – 無料オンライン電撃イライラ棒・マウス精度テスト',
  description: 'ブラウザで遊べる無料イライラ棒ゲーム。周回ごとに狭まる電撃コースを壁に触れずクリアし、マウス操作の精度と手ブレを測定。Accot-Zhaiのステアリング法則準拠。',
  keywords: [
    'イライラ棒',
    'イライラ棒 ゲーム',
    'イライラ棒 ゲーム 無料',
    'イライラ棒 ゲーム ブラウザ',
    '電撃イライラ棒 ゲーム',
    'イライラ棒 オンライン',
    'マウス 精度 テスト',
    '手ぶれ 測定',
    'マウス 操作 練習',
    'ステアリングの法則',
    'エイム 練習 マウス',
    '微細運動 テスト',
  ],
  openGraph: {
    title: 'イライラ棒 – 無料オンライン電撃イライラ棒・マウス精度テスト | SkillDrills',
    description: 'ブラウザで遊べる無料イライラ棒ゲーム。周回ごとに狭まる電撃コースを壁に触れずクリアし、マウス操作の精度と手ブレを測定。Accot-Zhaiのステアリング法則準拠。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/motor/precision-control/steady-hand',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'イライラ棒 – 無料オンライン電撃イライラ棒・マウス精度テスト | SkillDrills',
    description: 'ブラウザで遊べる無料イライラ棒ゲーム。周回ごとに狭まる電撃コースを壁に触れずクリアし、マウス操作の精度と手ブレを測定。Accot-Zhaiのステアリング法則準拠。',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor/precision-control/steady-hand',
    languages: getAlternateLanguages('/drills/motor/precision-control/steady-hand'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: 'モータートレーニング', item: 'https://skilldrills.online/ja/drills/motor' },
    { '@type': 'ListItem', position: 3, name: '精度コントロール', item: 'https://skilldrills.online/ja/drills/motor/precision-control' },
    { '@type': 'ListItem', position: 4, name: 'イライラ棒', item: 'https://skilldrills.online/ja/drills/motor/precision-control/steady-hand' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'イライラ棒 – マウス精度・手ブレ測定ゲーム',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description: 'ブラウザで遊べる無料のオンライン電撃イライラ棒ゲーム。周回クリアごとに狭小化するコースを壁に触れずに進み、手の震え（生理的手振戦）の抑制とマウス微細運動精度を科学的に評価。',
  url: 'https://skilldrills.online/ja/drills/motor/precision-control/steady-hand',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/ja' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '電撃イライラ棒 オンライン',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 CanvasおよびPointer Events APIに対応した最新のWebブラウザ',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  url: 'https://skilldrills.online/ja/drills/motor/precision-control/steady-hand',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'イライラ棒・ステディハンド精密マウス操作ゲーム',
  url: 'https://skilldrills.online/ja/drills/motor/precision-control/steady-hand',
  description: '壁に触れずにカーソルを進めるオンラインイライラ棒ゲーム。微細運動制御と手の震え耐性を測定・強化。',
  genre: ['Precision Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' }
};


const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'イライラ棒ゲームとは何ですか？どのような運動能力を測定しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'イライラ棒（電撃イライラ棒）は、狭い通路の壁に接触することなくカーソルを中心線に沿って移動させる微細運動精度テストです。単なる反応速度ではなく、視覚フィードフォワード制御、手ブレ（生理的手振戦）の抑制能力、および通路の狭小化に伴う連続的な軌道修正の安定性を測定します。',
      },
    },
    {
      '@type': 'Question',
      name: '狭い通路を移動する際のマウス操作はどのような科学法則に基づいていますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '境界で制約された狭い通路を通過する運動時間は、ジョニー・アコットとシュミン・ジャイ（1997年）が提唱した「ステアリングの法則（Accot-Zhai Steering Law）」によって規定されます。ステアリング時間は通路の長さを通路幅で積分した値に比例するため、通路幅が半分になると接触せずに通過するために要する時間は数学的に約2倍になります。',
      },
    },
    {
      '@type': 'Question',
      name: '壁に触れるとカーソルがスタート地点に戻るのはなぜですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本ドリルでは、カーソル座標と通路中心線とのユークリッド距離を毎フレームミリ秒単位で判定しています。許容半幅（中心線から壁までの距離）を超えた瞬間に境界接触（ミス）と判定され、妥協のないゼロトレランスの微細運動制御を徹底するためスタート地点へ即時リセットされます。',
      },
    },
    {
      '@type': 'Question',
      name: '周回（ラップ）を重ねると難易度はどのように変化しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '第1周目は許容幅50ピクセルの広い通路からスタートしますが、周回をクリアするごとに通路幅が段階的に狭まり、レベル12以降では12ピクセルの極小スリットへと変化します。また、屈曲セグメント数と振幅も増加し、高度な微細筋制御が要求されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'マウス操作中に手が震える原因は何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '健康な人でも筋肉の運動単位の同期発火や四肢の機械的共振によって8〜12Hzの「生理的手振戦（手ブレ）」が生じます。マウスを過剰に強く握りしめる（拮抗筋の過緊張）、心理的プレッシャー、カフェイン摂取や疲労などによってこの振戦振幅が増大し、壁接触の原因となります。',
      },
    },
    {
      '@type': 'Question',
      name: 'イライラ棒に最適なマウスの持ち方やDPI設定はありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '前腕のスムーズな滑りと指先による微細修正を両立できる、脱力したつまみ持ちまたは浅いつかみ持ちが推奨されます。DPIは400〜800 DPI程度の低〜中感度に設定することで、生理的微細振動によるカーソルの跳ねを物理的に軽減し、滑らかな閉ループ軌道追従が可能になります。',
      },
    },
    {
      '@type': 'Question',
      name: 'ウッドワースの二成分運動モデル（1899年）はイライラ棒にどう関係していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ロバート・ウッドワースの研究によれば、目標に向かう手の動きは最初の「初期弾道衝動」と、その後の視覚フィードバックによる「現在制御（Current Control）」で構成されます。イライラ棒では壁接触を回避するため、視覚で常に現在位置と壁の距離を確認しながら微修正を加える閉ループ現在制御が不可欠です。',
      },
    },
    {
      '@type': 'Question',
      name: 'イライラ棒の練習はゲームのエイムや精密作業に効果がありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。FPSゲームでのトラッキングエイムやマイクロフリック、デジタルイラストの線画ペン入れ、さらには外科手術の腹腔鏡器具操作など、狭い許容範囲でぶれずにポインターを制御するあらゆる領域で、微細運動協調性と筋緊張コントロールの向上が期待できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'プレイ中の手の疲労や腱鞘炎・筋痙攣を防ぐコツはありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '肘を約90度に曲げてデスクに腕を安定させ、マウスソールを過度にデスクへ押し付けないことが重要です。コーナーの手前で意識的に息を吐いて肩の力を抜き、1セッションごとに手首のストレッチと60秒程度のインターバルを挟んでください。',
      },
    },
    {
      '@type': 'Question',
      name: 'トラックボールや液晶ペンタブレットでもプレイできますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。本システムはモダンブラウザのPointer Events APIに準拠しているため、一般的な光学式マウスはもちろん、トラックボールやペンタブレットのスタイラスペンでも直接操作して手ブレ安定性を測定できます。',
      },
    },
  ],
};


const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'イライラ棒でマウス精度と手ブレ抑制をトレーニングする手順',
  description: '狭小化するコースをぶれずに完走し、ステアリング効率と微細運動精度を最大化するための段階的プロトコル。',
  step: [
    {
      '@type': 'HowToStep',
      "position": 1,
      "url": "https://skilldrills.online/ja/drills/motor/precision-control/steady-hand#step-1",
      name: 'スタートゾーンにカーソルを配置',
      text: '「イライラ棒を開始」をクリックし、左側のスタート安全地帯（グリーン領域）にポインターを置くことでコースと45秒タイマーが起動します。',
    },
    {
      '@type': 'HowToStep',
      "position": 2,
      "url": "https://skilldrills.online/ja/drills/motor/precision-control/steady-hand#step-2",
      name: '等速かつ滑らかな軌道でコースを進む',
      text: '発光する青い電撃コースに沿ってカーソルを滑らせます。制限時間と壁接触リスクのバランスを取りながら、一定の速度で前進します。',
    },
    {
      '@type': 'HowToStep',
      "position": 3,
      "url": "https://skilldrills.online/ja/drills/motor/precision-control/steady-hand#step-3",
      name: 'ヘアピンコーナーでの事前減速と視線先読み',
      text: '急な屈曲部に差し掛かる直前に速度を約40%落とし、カーソルの20〜30px先を注視して視覚的フィードバック修正を間に合わせます。',
    },
    {
      '@type': 'HowToStep',
      "position": 4,
      "url": "https://skilldrills.online/ja/drills/motor/precision-control/steady-hand#step-4",
      name: 'ゴール到達で狭小化レベルアップ',
      text: '右側のゴール安全地帯に到達すると周回クリア。タイマーがリセットされ、通路幅が12pxまで段階的に狭まる高難度ステージへ移行します。',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: '手ブレと微細運動精度の測定方法と限界',
    paragraphs: [
      '測定精度とディスプレイの特性について：本ドリルにおける時間計測はブラウザの performance.now() API（Spectre緩和策により約1ミリ秒分解能に制限）を用いています。また画面表示はディスプレイのリフレッシュレート（60Hzで約16.7ms、144Hzで約6.9ms、240Hzで約4.1ms）単位で量子化されます（Woods et al., 2015）。マウスのポーリングレート（125Hzで約8ms、1000Hzで約1msの遅延）も入力軌跡のサンプリング密度に影響します。約5ミリ秒未満の差は測定ノイズとして解釈し、他人の環境と比較するのではなく、同一デバイス上での自己記録の推移を追跡してください。SkillDrillsではすべてのスコアをお使いの端末のブラウザ（LocalStorage）にのみ安全に保存し、外部サーバーへの個人データ収集は一切行いません。',
    ],
  },
  benchmark: {
    title: 'イライラ棒（ステアリング操舵精度）目安基準表',
    description: 'ご自身のスコアを読み解くための編集基準値です。外部の母集団規範データではありません。通路モデルはAccot & Zhai（1997）のステアリング法則に準拠し、到達レベル・通路幅・平均中心線偏差から総合的な手の安定性を判定します。',
    columns: ['ランク', '称号', '到達レベル', '通路幅', '平均偏差', '判定帯'],
    rows: [
      {
        tier: 'Tier 1',
        rank: '神業外科医 (Apex Surgeon)',
        stat: 'レベル 12以上',
        level: '12–15 px',
        accuracy: '< 2.5 px',
        percentile: '卓越した微細制御',
      },
      {
        tier: 'Tier 2',
        rank: '免許皆伝 (Master Navigator)',
        stat: 'レベル 9–11',
        level: '16–22 px',
        accuracy: '< 4.0 px',
        percentile: '極めて高精度',
      },
      {
        tier: 'Tier 3',
        rank: '熟練操舵者 (Proficient Steerer)',
        stat: 'レベル 6–8',
        level: '23–32 px',
        accuracy: '< 6.5 px',
        percentile: '安定したコントロール',
      },
      {
        tier: 'Tier 4',
        rank: '一般プレイヤー (Intermediate)',
        stat: 'レベル 3–5',
        level: '33–42 px',
        accuracy: '< 9.0 px',
        percentile: '標準的なマウス操作',
      },
      {
        tier: 'Tier 5',
        rank: '入門・手ブレ警戒 (Novice)',
        stat: 'レベル 1–2',
        level: '43–50 px',
        accuracy: '> 9.0 px',
        percentile: '基礎訓練推奨',
      },
    ],
  },
  protocols: {
    title: 'イライラ棒攻略と手ブレ抑制トレーニングプロトコル',
    description: '運動生理学およびヒューマンコンピュータインタラクション（HCI）モデルに基づく、手の震えを最小限に抑えステアリング通過効率を高める実践メソッド。',
    items: [
      {
        title: 'プロトコル1：Accot-Zhaiステアリング法則に基づく動的速度配分（トンネル幅ペーシング）',
        description: 'Accot & Zhai（1997）のステアリング法則が示す通り、制約されたトンネルを通過する所要時間は通路幅に反比例します。幅が広い直線区間では加速して制限時間のマージンを稼ぎ、屈曲部や狭窄区間に入る直前に意図的に速度を40%低下させるメリハリのある速度制御を徹底してください。',
      },
      {
        title: 'プロトコル2：ウッドワースの現在制御を活かす視線先読み（フィードフォワード追従）',
        description: 'Robert S. Woodworth（1899）の二成分運動モデルに基づき、カーソルそのものではなくカーソルの約20〜30ピクセル前方へ視線を置きます。この先読みにより、視覚皮質が約150ミリ秒のフィードバック遅延を克服し、壁接触に至る前に微細な軌道修正衝動を筋肉へ伝達できます。',
      },
      {
        title: 'プロトコル3：生理的手振戦（8〜12Hz）の抑制と関節の機能分離',
        description: '大きなカーブ軌道は肘および前腕のスライドで描き、指先は微細なセンタリング修正のみに限定します。マウスを強く握りしめすぎると主動筋と拮抗筋の同時収縮が生じ、8〜12Hzの生理的振戦（手の震え）が増幅されて壁接触の原因となります。常に脱力を意識してください。',
      },
      {
        title: 'プロトコル4：動的狭窄に対するコーナーアペックス（頂点）アプローチ',
        description: 'レベル6以降（通路幅30px未満）では、前進速度よりも幾何学的なコース中央キープを最優先します。カーブではわずかにイン側の頂点（エイペックス）寄りにコースを取ることで、急転回時の遠心的なカーソル膨らみに対する接触バッファを最大化できます。',
      },
    ],
  },
  faqs: {
    title: 'イライラ棒・マウス精度テストに関するよくある質問（FAQ）',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const jaCopy = {
  h1Keyword: 'イライラ棒',
  h1Suffix: ' (Steady Hand Game)',
  caption: 'イライラ棒ゲームは、壁に一度も触れずに狭い電撃コースに沿ってカーソルをゴールまで導くことで、反射速度ではなく微細運動の安定性を精密に測定します。難易度はステアリングの法則（Accot & Zhai, 1997）に支配されており、通路の通過時間は長さを通路幅で割った値に比例します。中心線上をキープする動作は閉ループ課題であり、運動中も視覚が絶え間なく手の軌道を修正し続けます（Woodworth, 1899）。',
  statLaps: 'クリア周回数',
  statTime: '残り時間',
  statStreak: '連続クリア',
  statBest: '自己ベスト',
  pausedTitle: '一時停止中',
  pausedPrompt: '画面をクリックしてカーソルを固定し、再開してください。',
  startTitle: '電撃イライラ棒',
  startSubtitle: 'マウス微細運動精度・狭窄コース追従 • 45秒制限',
  startBtn: 'イライラ棒を開始',
  countdownSubtitle: 'コースに集中',
  newBest: '新記録達成',
  errorsLabel: '壁接触回数',
  maxStreakLabel: '最大連続周回',
  difficultyLabel: '到達レベル',
  trainAgain: 'もう一度挑戦',
  shareTitle: 'スコアをシェア',
  exitTitle: '終了して戻る',
  rulesTitle: '操作方法とスコア算出ルール',
  rule1Text: '発光する青い',
  rule1Highlight: '電撃コースを正確に追従',
  rule1Result: 'ゴール到達で45秒にリセット',
  rule2Text: '周回クリア',
  rule2Highlight: '無限難易度上昇',
  rule2Result: '通路が狭窄化＆屈曲増加',
  rule3Text: '壁への接触',
  rule3Highlight: 'スタート地点へ即リセット',
  rule3Result: '周回ペナルティ＆エラー加算',
  rule4Text: '高精度マウス操作',
  rule4Highlight: 'PCブラウザ推奨',
  rule4Result: '1:1生ポインター入力対応',
  aboutTitle: 'イライラ棒（Steady Hand Game）について',
  aboutHeading: '連続軌道の追従精度と手の震え（生理的手振戦）の抑制',
  aboutP1: 'イライラ棒（電撃イライラ棒）は、手と目の協調性、微細な手指の運動制御、および滑らかなポインター追従の安定性を鍛える本格的トレーニングツールです。複雑にうねる狭小コースの境界壁に触れることなくカーソルを導くことで、マウスの正確なエイミングに不可欠な手首および前腕の微小スタビライザー筋肉群をピンポイントで刺激します。',
  aboutP2: 'Johnny Accot & Shumin Zhai（1997）による「ステアリングの法則」に基づき、幅の狭いトンネルの通過時間は通路の長さを幅で割った積分値に依存します。周回を重ねるごとに通路幅は50pxから極小の12pxまで絞り込まれ、視覚フィードバックによるリアルタイムの軌道修正（Woodworth 1899）と、不要な筋緊張による手ブレの徹底的な抑制が求められます。',
  aboutCard1Title: '対象ユーザー',
  aboutCard1Text: 'FPS・MOBAの競技ゲーマー、デジタルイラストレーター、外科医、およびマウスの手ブレやカーソルの震えを改善したいすべての方。',
  aboutCard2Title: '鍛えられる能力',
  aboutCard2Text: '微細運動協調性、手の静止安定性、コーナーでのスムーズな速度制御、および拮抗筋の過緊張防止。',
  aboutCard3Title: '動的狭小化システム',
  aboutCard3Text: 'クリアごとにコース幅が段階的に狭まり、屈曲角が急峻化。妥協のないミリ単位のマウスコントロールを養成します。',
  gradeLabels: {
    'S+': '神業の安定性 (Grandmaster)',
    'S': '達人級の操舵 (Master)',
    'A': '精密エイム (Diamond)',
    'B': '良好な安定性 (Platinum)',
    'C': '基礎クリア (Gold)',
  },
  shareDrillName: 'イライラ棒',
  shareUrl: 'https://skilldrills.online/ja/drills/motor/precision-control/steady-hand',
  shareTextTemplate: '🖐️ {drillName}で {laps} 周クリア（精度: {acc}）を達成！マウスの微細運動精度と手ブレ測定は skilldrills.online で無料診断！',
  copiedAlert: 'スコアがクリップボードにコピーされました！',
};

export default function JapaneseSteadyHandPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <SteadyHandClient copy={jaCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/precision-control/steady-hand" locale="ja" />
      </div>
    </>
  );
}
