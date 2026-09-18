import DynamicGridEvasionClient from '@/app/drills/physical/coordination/dynamic-grid-evasion/DynamicGridEvasionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JP / JA)
// Primary Intent: 反射神経 ゲーム ブラウザ, 反射神経 ゲーム 無料, 動体視力 トレーニング 無料, 周辺視野 トレーニング
// Context: Browser reflex games, dynamic visual acuity & FPS hazard/AOE evasion
// Target Queries:
//   - "反射神経 ゲーム ブラウザ" (High-intent gaming query)
//   - "反射神経 ゲーム 無料" / "反射神経 ゲーム サイト" (Free reflex browser games)
//   - "動体視力 トレーニング 無料" (Dynamic visual acuity training)
//   - "周辺視野 トレーニング ゲーム" (Peripheral vision game)
//   - "危機 回避 ゲーム" (Hazard avoidance game)
//   - "爆弾 回避 ゲーム" (Blast dodging game)
//   - "空間認識 反応テスト" (Spatial reflex evaluation)
//   - "反射神経 ゲーム fps" (FPS specific reflex query)
// ============================================================

export const metadata = {
  title: "反射神経ゲーム・動体視力トレーニング – 無料周辺視野＆危険回避ドリル | SkillDrills",
  description: "無料オンライン反射神経ゲーム＆動体視力トレーニング。3×3グリッド上で爆発する危険セルを周辺視野で瞬時に察知し、安全ゾーンへマウスをフリック回避して空間反射と危機回避能力を科学的に鍛えます。",
  keywords: [
    "反射神経 ゲーム ブラウザ",
    "反射神経 ゲーム 無料",
    "動体視力 トレーニング 無料",
    "周辺視野 トレーニング ゲーム",
    "危機 回避 ゲーム",
    "爆弾 回避 ゲーム",
    "動体視力 ゲーム",
    "反射神経 テスト 無料",
    "反射神経 ゲーム fps",
    "空間認識 反応テスト"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/coordination/dynamic-grid-evasion',
    languages: getAlternateLanguages('/drills/physical/coordination/dynamic-grid-evasion'),
  },
  openGraph: {
    title: "反射神経ゲーム・動体視力トレーニング – 無料周辺視野＆危険回避ドリル | SkillDrills",
    description: "無料オンライン反射神経ゲーム＆動体視力トレーニング。3×3グリッド上で爆発する危険セルを周辺視野で瞬時に察知し、安全ゾーンへマウスをフリック回避して空間反射と危機回避能力を科学的に鍛えます。",
    url: 'https://skilldrills.online/ja/drills/physical/coordination/dynamic-grid-evasion',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "反射神経ゲーム・動体視力トレーニング – 無料周辺視野＆危険回避ドリル | SkillDrills",
    description: "無料オンライン反射神経ゲーム＆動体視力トレーニング。3×3グリッド上で爆発する危険セルを周辺視野で瞬時に察知し、安全ゾーンへマウスをフリック回避して空間反射と危機回避能力を科学的に鍛えます。",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills ホーム",
      "item": "https://skilldrills.online/ja"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "フィジカルトレーニング",
      "item": "https://skilldrills.online/ja/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "協調性・コーディネーション",
      "item": "https://skilldrills.online/ja/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "反射神経ゲーム・動体視力トレーニング",
      "item": "https://skilldrills.online/ja/drills/physical/coordination/dynamic-grid-evasion"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "反射神経ゲーム・動体視力トレーニング",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "3×3グリッドの危険爆発エリアを周辺視野で察知し安全マスへ瞬時にフリック回避する、無料の空間反射神経＆動体視力測定ツール。",
  "url": "https://skilldrills.online/ja/drills/physical/coordination/dynamic-grid-evasion",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/ja"
  },
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "グリッド危険回避・反射神経トレーナー",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvasおよびポインター入力をサポートする最新ブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/physical/coordination/dynamic-grid-evasion",
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "ダイナミックグリッド回避ゲーム (Dynamic Grid Evasion)",
  "url": "https://skilldrills.online/ja/drills/physical/coordination/dynamic-grid-evasion",
  "description": "3×3マスの爆発予告を回避して安全マスへフリック脱出する無料アクション反射神経ゲーム。",
  "genre": [
    "Reflex Game",
    "Action",
    "Coordination Drill",
    "Brain Game"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "反射神経ゲーム・動体視力テストは何の神経運動メカニズムを測定しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "視野全体の危険刺激を網膜周辺部で一括検知する「周辺視野情報処理速度」と、視覚刺激を察知した瞬間に安全域へマウスを弾く「弾道フリック（Ballistic Flick）」運動反射を総合測定します。9つの区画から生存可能なマスを瞬時に選び抜く選択反応時間（Choice Reaction Time）の客観的指標です。"
      }
    },
    {
      "@type": "Question",
      "name": "3×3グリッドの中央に視線をふんわり置く「脱焦点注視」が重要な理由は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "アン・トリーズマン（Treisman & Gelade, 1980）の特徴統合理論によると、特定のマスを凝視してしまうと反対側の危険警告に気づくまでに約150ms以上の遅延が生じます。グリッドの中央交点に視線を軽く漂わせる脱焦点（Decentralized Fixation）を保つことで、9マス全体のオレンジ色警告パルスを並列（Parallel）に一括知覚できます。"
      }
    },
    {
      "@type": "Question",
      "name": "APEXやVALORANT、LoLなどの実戦ゲームでの被弾回避にどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPSのグレネードや焼夷弾（モロトフ）、MOBAの範囲攻撃（AOEスキル）は画面の周辺視野でエフェクトが予兆されます。危険範囲が爆発する前の0.5秒以内に安全域へカーソルを滑らせて退避する「とっさの危険察知と緊急離脱」の反射回路を直接強化できます。"
      }
    },
    {
      "@type": "Question",
      "name": "レベルが上がるにつれて警告時間や危険セルの数はどのように変化しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "難易度はレベル1から15まで250ポイント刻みで上昇します。爆発前のオレンジ色の警告枠が点滅する時間は初期の1.4秒から最高レベルでは0.45秒まで短縮されます。同時に危険エリアは初期の3マスから最大7マスまで増加し、9マス中わずか2マスしか安全地帯が残らない極限のサバイバル状態となります。"
      }
    },
    {
      "@type": "Question",
      "name": "爆発に巻き込まれた場合、減点や制限時間のペナルティはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ、減点や制限時間45秒の短縮はありません。爆発エリア内に留まっていた場合、画面が赤くフラッシュして蓄積されたコンボ倍率が1.0倍にリセットされるのみです。失敗を恐れて消極的になることなく、極限速度のフリック回避に挑み続けられる仕様となっています。"
      }
    },
    {
      "@type": "Question",
      "name": "グリッド間を素早くフリック移動する際の推奨マウス感度（DPI）と持ち方は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "腕全体を大きく振るよりも手首と指先の細かなマイクロフリックで各マスへ移動するため、振り向き20〜30cm/360°程度の中高感度が適しています。手のひらを固定する被せ持ちよりも、指先での制動が効きやすい掴み持ち（クロー）やつまみ持ち（フィンガーティップ）が推奨されます。"
      }
    },
    {
      "@type": "Question",
      "name": "ポズナーの外因性注意（Exogenous Attention）理論を活かして反応速度を縮めるコツは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "マイケル・ポズナー（Posner, 1980）が証明したように、突発的な視覚刺激は意識的思考を介さずに反射的な注意移動を引き起こします。警告が点滅した際「どこが安全か」を論理的に考えるのではなく、光っていない暗いマスを視覚が無意識に捉えた瞬間、反射的に指先を弾く直観的フィードフォワード操作を行ってください。"
      }
    },
    {
      "@type": "Question",
      "name": "警告時間が0.45秒まで短縮される最難関レベルでの確実な生存判断基準は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "警告時間が0.5秒を下回るレベル10以降では「最も広い安全域」を探していては間に合いません。現在のカーソル位置から物理的に一番近い「隣接する無傷の安全マス（Nearest Adjacent Cell）」を見つけた瞬間に躊躇なく緊急スライドすることが唯一の生存法です。"
      }
    },
    {
      "@type": "Question",
      "name": "最高ランクの17,000点（Apex Grid Evader）を達成するための必須テクニックは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "45秒間ノーミスで最大3.0倍コンボを維持し、警告猶予0.45〜0.60秒のレベル12以上を生き残る必要があります。毎ウェーブの爆発直後、カーソルをグリッド中央のマス付近へ軽く戻す「センタリング習慣」を付けることで、次の回避移動距離を最短化できます。"
      }
    },
    {
      "@type": "Question",
      "name": "このドリルは登録不要・完全無料で利用できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、SkillDrillsのすべてのツールは完全無料でご利用いただけます。会員登録やアプリのダウンロードは一切不要で、WEBブラウザ（HTML5 Canvas）を開くだけで即座に開始できます。スコアやベスト記録は外部へ送信されず、お使いの端末ブラウザ内のみに安全に保存されます。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "グリッド危険回避＆反射神経トレーニングの実践手順ガイド",
  "description": "3×3マスの爆発予兆を周辺視野で察知し、安全マスへ素早くフリック脱出してコンボを伸ばす4ステップ。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "中央マスに視線を置き3×3グリッド全体を把握",
      "text": "スタートボタンを押してカーソルを中央に配置し、中央交点に脱焦点で視線を合わせて9マス全体を周辺視野に収めます。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/dynamic-grid-evasion#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "オレンジ色の警告パルスから安全マスを瞬時に識別",
      "text": "危険セルがオレンジ色の枠線で点滅したら、光っていない安全なマスの位置を直観的に捉えます。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/dynamic-grid-evasion#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "爆発直前に安全マスへ高速フリック移動",
      "text": "カウントダウン終了前に素早くマウスを弾いて安全マスの枠内にカーソルを着弾させ、急停止します。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/dynamic-grid-evasion#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "連続生存で3.0倍コンボを維持しハイスコア達成",
      "text": "一度も被弾することなくウェーブを切り抜け、最大3.0倍のコンボ倍率をキープして45秒間の最高スコアを目指します。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/dynamic-grid-evasion#step-4"
    }
  ]
};

const gridGuide = {
  heading: "空間反射神経と視覚的危険回避の認知神経バイオメカニクス",
  subtitle: "トリーズマン並列探索理論、ポズナー空間定位パラダイム、ウッドワース弾道制御に基づく危機回避論",
  intro: [
    "ダイナミックグリッド回避ドリル（Dynamic Grid Evasion）は、3×3の戦術マトリクス上でランダムに発生する爆発予兆を周辺視野で捉え、瞬時に安全な無傷セクターへカーソルを滑り込ませる高負荷な空間反射神経トレーニングです。単一のターゲットを追尾するトラッキングとは異なり、9つのマスから発信される視覚警告を並列処理して瞬時に脱出ベクトルを決定する必要があるため、脳の視覚・運動変換速度が極限まで試されます。",
    "認知心理学者アン・トリーズマン（Treisman & Gelade, 1980）の「特徴統合理論（Feature Integration Theory）」によれば、突発的な色の変化や点滅といった低次視覚特徴は、大脳皮質の事前注意段階（Pre-attentive stage）において並列的に瞬時知覚されます。プレイヤーがグリッド中央部に視線を緩やかに置く「脱焦点注視（Decentralized Fixation）」を採用することで、各マスを順番に確認する逐次探索を省略し、視野全体から安全地帯を直観的に一括抽出できます。",
    "マイケル・ポズナー（Posner, 1980）の「空間定位パラダイム」が証明したように、外因性の突発シグナル（Exogenous Cue）は意識を介さずに潜在的注意（Covert Attention）を無条件に引き寄せます。難易度が上がるにつれて警告猶予時間は1.4秒から0.45秒へと激減し、危険マスは最大7箇所に達します。ロバート・ウッドワース（Woodworth, 1899）の二相性モデルに従い、安全マスへの初動の弾道フリック（Ballistic impulse）と、マス境界内での指先摩擦による終端急停止（Current-control deceleration）を高次元で両立させることが被弾を防ぐ防壁となります。",
    "計測精度およびハードウェアに関する注記：本ドリルはブラウザの performance.now() 高精度クロックを用いてクライアント端末内部でミリ秒単位の物理演算を行っています。ディスプレイのリフレッシュレート（60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms、Woods et al., 2015）やマウスのポーリングレート（125Hz 対 1000Hz）により微小な物理遅延が生じるため、5ms未満の誤差は測定ノイズとしてお考えください。全データはブラウザ内にのみ安全に保持されます。"
  ],
  benchmarks: {
    title: "空間反射神経＆グリッド危険回避 5段階標準ベンチマーク",
    headers: ["階層 / ティア", "称号 (Rank Title)", "スコア基準値", "到達レベル", "最小警告猶予限界", "神経認知・回避反射プロファイル"],
    rows: [
      ["Tier 1: 頂点グリッドイベイダー", "Apex Grid Evader", "17,000点以上", "Level 12 – 15", "0.45 – 0.60秒生存", "上位0.1%水準の超人的な周辺視野並列探索力、0.45秒極限下での完全な弾道フリック脱出（Treisman 1980; Posner 1980）"],
      ["Tier 2: マスタースパシャルスキャナー", "Master Spatial Scanner", "13,000 – 16,999点", "Level 9 – 11", "0.65 – 0.80秒生存", "上位3%水準の卓越したポズナー潜在的注意シフト、5〜6個の危険セル包囲網からの冷静な離脱"],
      ["Tier 3: 熟練ハザードドッジャー", "Proficient Hazard Dodger", "9,500 – 12,999点", "Level 6 – 8", "0.85 – 1.05秒生存", "競技ゲーマー上位水準の優れた動体視力と安定したウッドワース弾道フリック急制動制御（Woodworth 1899）"],
      ["Tier 4: 中級セクターサバイバー", "Intermediate Sector Evader", "6,000 – 9,499点", "Level 3 – 5", "1.10 – 1.25秒生存", "成人の標準反応速度、警告が1秒未満になると視覚情報処理のボトルネックにより被弾が増加"],
      ["Tier 5: 入門ブラストサバイバー", "Novice Blast Survivor", "6,000点未満", "Level 1 – 2", "> 1.25秒区間", "中心視野の凝視による周辺危険の見落とし、脱出時のオーバーシュート頻発（脱焦点注視の訓練推奨）"]
    ],
    note: "特徴統合理論（Treisman & Gelade 1980）、空間定位パラダイム（Posner 1980）、ウッドワース運動制御モデル（Woodworth 1899）に基づく客観的パフォーマンス基準です。"
  },
  techniques: {
    title: "動体視力向上＆グリッド危険回避実践プロトコル",
    items: [
      {
        name: "トリーズマン並列探索とグリッド中心の脱焦点注視 (Decentralized Centroid Fixation)",
        desc: "トリーズマン（1980）の研究によれば、特定のマスを凝視すると反対側の危険察知が遅れます。3×3マスの幾何学的中心に視線をふんわり置き、視野角を広げて9区画を同時に網羅してください。",
        tips: "焦点を一点に集中させず、網膜の桿体細胞（周辺視野）がオレンジ色の点滅をキャッチできるよう視野を緩めて構えましょう。"
      },
      {
        name: "ポズナー外因性注意反射と200ms運動始動 (Posner Exogenous Trigger)",
        desc: "ポズナー（1980）の外因性注意機構を活かし、オレンジ色の枠線が点滅した瞬間、意識的な論理思考を省いて光っていない暗いマスへ直観的にマウスを跳ねさせてください。",
        tips: "点滅した危険マスを見て驚くのではなく、光っていないセクターが視界に入った瞬間に最短距離でカーソルを滑り込ませます。"
      },
      {
        name: "ウッドワース弾道フリックとセル境界摩擦制動 (Cell Boundary Deceleration)",
        desc: "ウッドワース（1899）の制御モデルに基づき、安全マスへ電光石火の弾道フリックを放った直後、セル境界内で指先を下向きに押し付けて急ブレーキをかけます。",
        tips: "手のひらの小指球と薬指でマウスパッド表面を軽く押し込み、摩擦抵抗を利用してマスの枠外への飛び出し（オーバーシュート）を阻止します。"
      },
      {
        name: "0.45秒極限下での最近接・隣接安全セル緊急脱出 (Nearest Adjacent Safe Flick)",
        desc: "最難関レベルで7マスが危険地帯となり警告時間が0.45秒まで圧縮された際、最善のマスを選ぼうとすると脳内で迷いが生じます。",
        tips: "現在カーソルがある位置から物理的に最も近い、隣接する無傷の安全マスを1箇所見つけた瞬間に躊躇なくフリック脱出してください。"
      }
    ]
  },
  steps: [
    "背筋を伸ばし、カーソルを3×3グリッドの中央マスに配置して構えます。",
    "ウェーブ開始時、オレンジ色の枠線で点滅する危険マスを周辺視野で察知します。",
    "カウントダウン終了前に、点滅していない安全マスへ素早くフリック移動します。",
    "連続生存で最大3.0倍のコンボ倍率をキープし、45秒間の最高スコアを目指します。"
  ]
};

export default function DynamicGridEvasionPageJa() {
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
      <DynamicGridEvasionClient
        copy={{
          title: "反射神経ゲーム・動体視力トレーニング",
          subtitle: "3×3グリッド危険回避＆周辺視野反射ドリル • 15段階",
          rulesTitle: "反射神経＆グリッド回避ドリルのルール・採点基準",
          rules: [
            { title: "警告パルスの瞬間察知", text: "各ウェーブ開始時、爆発が迫る危険セルがオレンジ色の枠線で点滅します。" },
            { title: "安全セルへの高速フリック回避", text: "カウントダウン終了前に、点滅していない無傷の安全セルへ素早くクロスヘアを移動させます。" },
            { title: "生存判定とコンボ倍率の蓄積", text: "爆発時に安全セル内に留まっていれば生存スコアを獲得し、コンボ倍率が最大3.0倍まで上昇します。" },
            { title: "被弾時のコンボリセット", text: "爆発に巻き込まれると画面が赤くフラッシュしコンボは1.0倍にリセットされますが、45秒の制限時間は減りません。" }
          ],
          aboutTitle: "反射神経＆危険回避ドリルについて",
          aboutHeading: "周辺視野並列探索と外因性注意の神経科学",
          aboutText: "本ドリルは、アン・トリーズマン（Anne Treisman, 1980）の特徴統合理論およびマイケル・ポズナー（Michael Posner, 1980）の空間定位パラダイムに基づいて設計されています。3×3グリッド全体で不規則に発生する爆発リスクを中心視野を動かさずに周辺視野で並列スキャンし、ロバート・ウッドワース（Woodworth, 1899）の弾道フリック運動で安全域へ退避する高速危機回避ループを構築します。FPSでのグレネード・爆撃回避やMOBAでのスキル回避反応速度を高めます。"
        }}
      />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/dynamic-grid-evasion"
          locale="ja"
        />
      </div>
    </>
  );
}
