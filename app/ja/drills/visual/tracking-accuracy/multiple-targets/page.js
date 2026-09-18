import GhostLinkClient from '@/app/drills/visual/tracking-accuracy/multiple-targets/GhostLinkClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "MOTテスト: 多目標追跡＆周辺視野トレーニング | SkillDrills",
  description: "無料オンラインMOT（複数物体追跡）テスト。動く複数の標的を同時に追従し、周辺視野の広さ、分割的視覚注意、空間作業記憶を科学的に測定・強化します。",
  keywords: [
    "周辺視野 トレーニング",
    "多目標追従 MOT",
    "複数物体追跡 テスト",
    "動体視覚追跡",
    "MOT テスト 無料",
    "分割的視覚注意",
    "空間ワーキングメモリ",
    "動体視力 トレーニング",
    "パイロット 視野検査",
    "FPS 視野の広さ"
  ],
  openGraph: {
    title: "MOTテスト: 多目標追跡＆周辺視野トレーニング | SkillDrills",
    description: "認知心理学の標準MOT課題を活用した無料オンライン周辺視野トレーニング。同一形状の高速移動球の中から指定ターゲットを同時に追尾し、分割的視覚注意と空間作業記憶を鍛えます。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/visual/tracking-accuracy/multiple-targets',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MOTテスト: 多目標追跡＆周辺視野トレーニング | SkillDrills",
    description: "認知心理学の標準MOT課題を活用した無料オンライン周辺視野トレーニング。視野の広さと空間ワーキングメモリを科学的に測定。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual/tracking-accuracy/multiple-targets',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/multiple-targets'),
  },
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
      "name": "訓練ハブ",
      "item": "https://skilldrills.online/ja/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "視覚・動体視力トレーニング",
      "item": "https://skilldrills.online/ja/drills/visual"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "動体追従・トラッキング",
      "item": "https://skilldrills.online/ja/drills/visual/tracking-accuracy"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "多目標追従 MOT テスト (周辺視野トレーニング)",
      "item": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/multiple-targets"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrills 周辺視野トレーニング・多目標追従 MOT 測定器",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "browserRequirements": "HTML5 Canvas対応の最新ウェブブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "description": "認知科学の標準MOT（Multiple Object Tracking）パラダイムに基づき、複数目標の同時追跡能力、視野の広さ、空間ワーキングメモリ容量を厳密に測定する無料オンライントレーニング。"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "無料オンライン多目標追従 MOT テスト",
  "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/multiple-targets",
  "applicationCategory": "GameApplication",
  "genre": ["周辺視野トレーニング", "多目標追跡", "視覚的注意検査", "動体視力ゲーム"],
  "browserRequirements": "Requires HTML5 Canvas and JavaScript",
  "inLanguage": "ja-JP"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "多目標追従 MOT チャレンジ (GhostLink Multiple Targets)",
  "description": "画面内を跳ね回る複数の同一球体の中から指定されたターゲット群を同時に見失わずに追尾する本格ビジョントレーニングゲーム。",
  "genre": ["Vision Training", "Esports Reaction", "Cognitive Drill"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "MOT（Multiple Object Tracking / 複数物体追跡）テストとはどのような検査ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "認知心理学者ゼノン・ピリシン（Zenon Pylyshyn, 1988）が提唱した視覚的注意の基礎研究課題です。画面上の同一形状をした複数のオブジェクトのうち、最初に点滅などで指定された複数の『目標』を、ランダムに動き回る多数の『妨害球』と交差しながらも同時に見失わずに追跡し続ける能力を測定します。単一の物体を目で追う通常の動体視力とは異なり、脳内の空間的ワーキングメモリと注意の並列分配能力が直接評価されます。"
      }
    },
    {
      "@type": "Question",
      "name": "健常成人が同時に追尾できる物体の限界数はいくつですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "認知科学の広範な実証データによれば、一般的な成人の追跡限界容量は3個から4個とされています（Cavanagh & Alvarez, 2005）。これを超える負荷では注意のリソースが飽和し、オブジェクト交差時に追跡が外れやすくなります。しかし、アクションビデオゲームの熟練プレイヤーやプロ球技アスリート、航空管制官などは、5個から6個のターゲットを同時に追尾できる卓越した視覚ワーキングメモリ容量を示すことが確認されています（Green & Bavelier, 2006; Faubert, 2013）。"
      }
    },
    {
      "@type": "Question",
      "name": "1個ずつ順番に視線を動かして確認する方法（順次サッケード）では失敗する理由は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "眼球を特定の目標から別の目標へとジャンプさせる『サッケード（急速眼球運動）』には、約200msの神経生理学的遅延（潜時）が発生します。さらにサッケードの跳躍中には一時的な視覚マスキング（サッケード抑制）が生じます。時速数百ピクセルで移動する物体を順番に見ていると、視線を外した瞬間に交差した別のターゲットを見失うため、個別の注視ではなく視野全体を均一に捉える並列処理が不可欠となります。"
      }
    },
    {
      "@type": "Question",
      "name": "重心注視法（Centroid Strategy）とはどのようなテクニックですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "追尾対象となる複数の目標球が形成する仮想の多角形の幾何学的中心（重心：Centroid）に視線の焦点をリラックスして置き、個々の球を中心窩ではなく高感度な『周辺視野（Peripheral Vision）』で捉える高度な追跡技法です。視線を動かさずに多角形の外枠の変形をゲシュタルト的に知覚することで、サッケードによる視覚中断を防ぎ、交差時にもターゲットを見失う確率を劇的に低減させます。"
      }
    },
    {
      "@type": "Question",
      "name": "左半球と右半球の視野分離（Hemifield Independence）はどのように活用すべきですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "神経科学の研究（Alvarez & Cavanagh, 2005）により、左視野の情報は右脳で、右視野の情報は左脳で独立して処理される『半球間リソース独立性』が実証されています。ターゲットが左右どちらか片側の視野に偏るよりも、画面の左右にバランス良く分散している方が追跡精度が向上します。画面の中央縦軸を意識し、左右の脳へ均等にタスクを分配する感覚を持つことが極めて効果的です。"
      }
    },
    {
      "@type": "Question",
      "name": "サッカー、バスケ、バレーボールなどの球技スポーツで周辺視野がどう活かされますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "球技における『コートビジョン（広い視野）』の本体はまさにこのMOT能力です。一流のミッドフィールダーやポイントガードは、ボールを保持しながらも視線を一点に固定せず、周囲を走る味方と敵ディフェンダーの複数人のポジショニング変化を同時に把握しています。Faubert (2013) の研究では、エリートプロアスリートは一般人と比較してMOTの学習曲線と限界速度が有意に高いことが証明されています。"
      }
    },
    {
      "@type": "Question",
      "name": "VALORANT、Apex Legends、OverwatchなどFPSゲームにおける実戦的メリットは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "照準（クロスヘア）を中心視野で敵に合わせつつ、ミニマップの戦況変化、アビリティ投擲物の飛来、味方の射線、周囲の足音ベクトルを周辺視野で同時に処理できるようになります。いわゆる『視野が狭いトンネルビジョン』を克服し、乱戦時の状況判断速度（Situational Awareness）と生存率が飛躍的に高まります。"
      }
    },
    {
      "@type": "Question",
      "name": "球体が重なって交差（オクルージョン）する瞬間に見失わないための秘訣は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "接触の瞬間を見つめるのではなく、衝突直前の『進行ベクトルの運動慣性』を脳内でシミュレーションします。物理的に直線運動を維持して交差を通り抜けるベクトルをあらかじめ予測しておくことで、交差直後にターゲットとは異なる妨害球に注意が吸着されてしまう『アイデンティティ・スワップ（誤認エラー）』を防ぐことができます。"
      }
    },
    {
      "@type": "Question",
      "name": "周辺視野とMOT能力を高めるための推奨練習頻度とセッション時間は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "多目標追跡は頭頂葉のワーキングメモリをフル稼働させるため、過度の疲労が蓄積しやすい認知タスクです。1日10〜15分（5〜8ラウンド程度）を週4〜5日継続するのが最も神経可塑性を高めるプロトコルです。疲労を感じた状態で無理に続けると注意が散漫になり誤ったサッケード癖がつくため、集中力が高い状態で行うことが推奨されます。"
      }
    },
    {
      "@type": "Question",
      "name": "測定データやテスト記録は安全に管理されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、完全にお使いのブラウザ（localStorage）内でのみ完結します。追尾スコア、最大追跡数、反応履歴などが外部サーバーに送信されたり収集されたりすることは一切ありません。完全無料かつログイン不要で安心してご利用いただけます。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "周辺視野トレーニング・多目標追従 MOT テストの攻略ステップ",
  "description": "複数の移動ターゲットを同時に見失わずに追跡し、最高スコアと周辺視野認知能力を獲得するための4段階実践ガイド。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "指定ターゲットの幾何学的グループ化",
      "text": "開始時にハイライト表示されるターゲット球同士を結ぶ仮想の多角形（三角形や四角形）を脳内でイメージし、ひとつの面として認識します。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/multiple-targets#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "視線を中央重心に固定（ソフトフォーカス）",
      "text": "個別の球を凝視せず、ターゲット群の幾何学的重心に焦点を緩やかに置き、周辺視野を最大開放して全体の広がりを捉えます。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/multiple-targets#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "交差時の慣性ベクトル予測補完",
      "text": "妨害球とターゲットが複雑に交差する瞬間、直前の運動ベクトルの方向を予測し、交差後の離脱コースを冷静に追尾します。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/multiple-targets#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "停止後の正確な全ターゲット選択",
      "text": "運動が停止した瞬間、記憶に保持された注意アンカーを再確認し、迷いなく正解の球を順にクリックして回答します。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/multiple-targets#step-4"
    }
  ]
};

const guideData = {
  eyebrow: "視覚認知心理学＆周辺視野神経科学ガイド",
  heading: "多目標追従 MOT テスト – 周辺視野と空間作業記憶の並列処理機構",
  intro: [
    "多目標追従課題（Multiple Object Tracking, MOT）は、認知心理学者ゼノン・ピリシン（Zenon Pylyshyn, 1988）によって考案された、人間の並列的視覚情報処理の限界を測る金字塔的パラダイムです。外見が完全に同一の複数の移動オブジェクト群の中で、事前に指定された複数の目標（ターゲット）を、ランダムな交差運動を繰り返す多数の妨害刺激（ディストラクター）の中から一度も見失うことなく追尾し続ける能力を評価します。",
    "認知神経科学の研究によると、MOTの遂行は大脳皮質の広範な注意ネットワーク、特に後頭頂皮質（Intraparietal Sulcus: IPS）、前頭眼野（Frontal Eye Fields: FEF）、上丘の協調的な同期発火によって支えられています（Cavanagh & Alvarez, 2005）。人間は個々の物体を言語的・特徴的に記憶しているのではなく、網膜上の座標とは独立した注意のポインタ（FINST: Feature-blind Visual Index）を同時に最大3〜4箇所へ投射することで並列追跡を可能にしています。",
    "さらに重要な知見として、左視野と右視野は独立した脳半球（右脳と左脳）の注意リソースによって別々に並列処理される『半球間独立性（Hemifield Independence）』が実証されています（Alvarez & Cavanagh, 2004）。物体を1つずつ視線で追う逐次的なサッケード運動（急速眼球運動）を行っていると、約200msのサッケード潜時とサッケード抑制によって情報が脱落します。トップアスリートや卓越したeスポーツプレイヤーは、複数のターゲットが作る多角形の幾何学的重心に視線を置き、周辺視野で全体の変形を捉える『重心注視法（Centroid Strategy）』を実践しています（Green & Bavelier, 2006; Faubert, 2013）。",
    "本テストは、最新のHTML5 Canvasグラフィックパイプラインを用い、オブジェクト数、移動速度、交差頻度をミリ秒単位で動的に制御します。日々のシステマティックなMOTトレーニングは、視野狭窄（トンネルビジョン）を解消し、球技スポーツにおけるコートビジョン、FPSゲームでの索敵・乱戦状況判断力（Situational Awareness）、さらには日常の自動車運転における危険察知速度を劇的に向上させます。"
  ],
  benchmarks: {
    title: "多目標追従・動体視覚追尾ベンチマーク基準",
    headers: ["評価ランク / 階級", "同時追尾可能ターゲット数", "最大追跡速度適応", "正答率 / 精度", "神経生理学的到達レベル"],
    rows: [
      ["神業 / プロ特級 (Top 1%)", "5 – 6個", "高速（400 px/s以上）", "92% 以上", "幾何学的重心固定と大脳半球リソースの完全分離並列処理 (Cavanagh & Alvarez, 2005)"],
      ["上級視覚認知 (Top 5%)", "4 – 5個", "中高速（300 – 400 px/s）", "82 – 91%", "高密度交差時の一時的予測補完と安定した周辺視野アンカリング"],
      ["中級標準水準 (Top 25%)", "3 – 4個", "中速（200 – 300 px/s）", "72 – 81%", "標準的な成人視覚認知限界。緩やかな軌道での複数把握が可能"],
      ["初級一般段階 (Top 50%)", "2 – 3個", "低中速（150 – 200 px/s）", "60 – 71%", "視線の順次サッケードによる情報脱落（単一オブジェクトへの注視固執）"],
      ["未熟練 / 基礎段階 (Baseline)", "2個 未満", "低速（150 px/s未満）", "60% 未満", "交差直後のターゲット識別混乱と視空間ワーキングメモリの過負荷"]
    ],
    note: "認知神経科学およびスポーツ視覚認知文献（Pylyshyn 1988; Cavanagh & Alvarez 2005; Green & Bavelier 2006; Faubert 2013）に基づく客観的パフォーマンス基準です。"
  },
  techniques: {
    title: "多目標追従能力を飛躍させる4大実践アプローチ",
    items: [
      {
        name: "幾何学的重心注視ソフトフォーカス法 (Centroid Soft-Focus Fixation)",
        desc: "個々のターゲット球を凝視するのではなく、ターゲット群が形成する多角形（ポリゴン）の空間的中心点に視線を緩やかに固定し、周辺視野全体で境界線の拡縮を知覚します。",
        tips: "画面の特定の一点に焦点を凝らさず、ディスプレイ全体を一枚の絵としてリラックスして眺める視野感覚を意識してください。"
      },
      {
        name: "視野半球間リソース分散 (Hemifield Resource Allocation)",
        desc: "左視野と右視野は別々の脳半球で独立処理されるため、ターゲットが画面の左右にバランス良く分散している状態を保つよう意識の配分を調整します。",
        tips: "画面中央の垂直ラインを意識し、左半球と右半球の注意リソースを均等に稼働させるイメージを持ちましょう。"
      },
      {
        name: "交差衝突ベクトル予測補完モデル (Collision Vector Extrapolation)",
        desc: "ターゲット同士、または妨害球とターゲットが重なり合う瞬間、直前の進行方向と運動量を脳内で線形予測し、交差後の離脱軌道を先回りして把握します。",
        tips: "球体が接触した瞬間を見るのではなく、通り抜けた後の空間へ注意のアンカーをあらかじめ逃がします。"
      },
      {
        name: "注意アンカーの能動的リフレッシュ (Attentional Anchor Active Refresh)",
        desc: "追跡中に注意の保持強度が低下してきたと感じたら、心の中でターゲット群の輪郭を素早く1巡スキャンし、各オブジェクトのIDポインタを再同期します。",
        tips: "視線を激しく動かすのではなく、心的な注意のスポットライトだけをミリ秒単位で素早く巡回させます。"
      }
    ]
  },
  steps: [
    "テスト開始ボタンを押し、画面上に点滅表示される指定ターゲット群の位置と配置を記憶します。",
    "ターゲットが通常の球体と同化して動き始めたら、ターゲット群の中心（重心）に視線を固定します。",
    "視線を動かさずに周辺視野を活用し、他の妨害球との交差運動を冷静にトラッキングし続けます。",
    "球体の運動が完全に停止したら、記憶しているターゲット球を正確に順番にクリック（タップ）します。",
    "正解率、追尾ターゲット数、到達ランクを確認し、毎日の周辺視野トレーニングとして継続します。"
  ],
  audience: "VALORANT、Apex Legends、CS2、Overwatchで索敵力と乱戦状況判断を高めたいFPSプレイヤー、サッカー・バスケ・テニス・モータースポーツ等で広い視野（コートビジョン）を養いたいアスリート、およびパイロット・航空管制官志望者全般。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('pylyshyn1988', 'cavanagh2005', 'alvarez2004', 'green2006', 'faubert2013', 'woods2015'),
  related: [
    { href: "/ja/drills/visual/tracking-accuracy/moving-target", label: "動体視力テスト (移動目標迎撃)" },
    { href: "/ja/drills/visual/visual-recognition/visual-search", label: "視覚探索テスト (周辺視野スキャン)" },
    { href: "/ja/drills/visual/depth-perception/distance-judgment", label: "深視力検査 (三桿法立体視)" },
    { href: "/ja/drills/reaction-speed/visual-tracking-speed-test", label: "視覚追従スピードテスト" }
  ]
};

export default function LocalizedMultipleTargetsJaPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <GhostLinkClient copy={{ title: "周辺視野トレーニング・多目標追従 MOT テスト", subtitle: "複数目標同時追跡＆動体視覚注意検査" }} />
      <DrillGuide guide={guideData} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ja/drills/visual/tracking-accuracy/multiple-targets" />
      </div>
    </>
  );
}
