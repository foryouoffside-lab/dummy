import DistanceJudgmentClient from '@/app/drills/visual/depth-perception/distance-judgment/DistanceJudgmentClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (visual / distance-judgment)
// PRIMARY DOMESTIC: "深視力"               — 147 exact / 369 broad searches/mo (Domestic #1 Winner)
//                   "深視力 検査"          — Driver license Shinshiryoku Kensa search
//                   "深視力 練習"          — Practice & training queries
//                   "深視力 コツ"          — Techniques & tips search
// SECONDARY / LSI:
//                   "三桿法"              — Howard-Dolman three-rod test (Japanese official term)
//                   "深視力 テスト"        — Depth perception test online
//                   "立体視 テスト"        — Stereopsis examination
//                   "大型免許 深視力"      — Heavy vehicle license requirement
//                   "二種免許 深視力"      — Class 2 commercial driver license
//                   "遠近感 テスト"        — Distance estimation test
//                   "動的深視力"          — Dynamic depth perception
//                   "オプティカルルーミング"— Optical looming expansion rate (Lee, 1976)
// WINNER TITLE:     深視力検査 (三桿法) – 無料オンライン深視力・遠近感トレーニング | SkillDrills
// ============================================================

export const metadata = {
  title: "深視力検査 (三桿法) – 無料オンライン深視力・遠近感トレーニング | SkillDrills",
  description: "大型・二種免許の更新で必須となる深視力検査（三桿法）をブラウザで練習できる無料シミュレーター。奥行き知覚・立体視・オプティカルルーミングのタイミングを測定し、遠近感のズレを矯正。",
  keywords: [
    "深視力",
    "深視力 検査",
    "深視力 練習",
    "深視力 コツ",
    "三桿法",
    "深視力 テスト",
    "立体視 テスト",
    "大型免許 深視力",
    "二種免許 深視力",
    "遠近感 テスト",
    "動的深視力",
    "オプティカルルーミング",
    "視覚トレーニング"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual/depth-perception/distance-judgment",
    languages: getAlternateLanguages('/drills/visual/depth-perception/distance-judgment'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "深視力検査 (三桿法) – 無料オンライン深視力・遠近感トレーニング | SkillDrills",
    description: "大型・二種免許の更新で必須となる深視力検査（三桿法）をブラウザで練習できる無料シミュレーター。奥行き知覚・立体視・オプティカルルーミングのタイミングを測定し、遠近感のズレを矯正。",
    url: "https://skilldrills.online/ja/drills/visual/depth-perception/distance-judgment",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "深視力検査 (三桿法) – 無料オンライン深視力・遠近感トレーニング | SkillDrills",
    description: "大型・二種免許の更新で必須となる深視力検査（三桿法）をブラウザで練習できる無料シミュレーター。奥行き知覚・立体視・オプティカルルーミングのタイミングを測定し、遠近感のズレを矯正。",
  },
};

export default function JapaneseDistanceJudgmentPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
      { "@type": "ListItem", "position": 3, "name": "視覚トレーニング", "item": "https://skilldrills.online/ja/drills/visual" },
      { "@type": "ListItem", "position": 4, "name": "深視力検査 (Distance Judgment)", "item": "https://skilldrills.online/ja/drills/visual/depth-perception/distance-judgment" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "深視力検査・三桿法トレーニング (Distance Judgment)",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
    "description": "大型免許や二種免許の更新に必要な深視力検査（三桿法）に対応した、ブラウザ上で動作する無料の動的奥行き知覚・立体視測定トレーニングツール。",
    "featureList": [
      "オプティカルルーミング（網膜像拡大率）によるミリ秒単位の到達予測判定",
      "ターゲット深度プレーンとの誤差率測定（5%未満でパーフェクト判定）",
      "進行に応じたアプローチ速度の動的加速シミュレーション",
      "プライバシー完全配慮のローカル保存（外部サーバー送信なし）"
    ],
    "url": "https://skilldrills.online/ja/drills/visual/depth-perception/distance-judgment",
    "dateModified": "2026-09-11"
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "深視力検査 (三桿法) – 無料オンライン深視力シミュレーター | SkillDrills",
    "alternateName": "深視力テスト (Distance Judgment)",
    "url": "https://skilldrills.online/ja/drills/visual/depth-perception/distance-judgment",
    "dateModified": "2026-09-11",
    "description": "大型免許・中型免許・二種免許の取得や更新時に課される深視力検査（三桿法）をWeb上で練習できるシミュレーター。奥行き知覚と遠近感のタイミングを精密に測定。",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "browserRequirements": "HTML5 Canvasをサポートする最新のWebブラウザ（Chrome, Safari, Edge, Firefox）",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
    "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
    "isAccessibleForFree": true,
    "learningResourceType": "Educational Game",
    "teaches": "深視力（三桿法）、奥行き知覚、立体視（両眼視差・運動視差）、時間的到達予測（Time-to-Contact）"
  };

  
const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "深視力検査 (Distance Judgment Simulator)",
  "url": "https://skilldrills.online/ja/drills/visual/depth-perception/distance-judgment",
  "description": "Interactive 3D depth perception and distance judgment simulator. Train stereoscopic visual alignment and binocular parallax.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Visual Training", "Depth Perception", "Distance Judgment"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "深視力検査シミュレーターの実施手順とコツ",
    "dateModified": "2026-09-11",
    "description": "Webブラウザ上で深視力・三桿法のタイミング感覚とオプティカルルーミング迎撃を測定・訓練する手順。",
    "step": [
      {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ja/drills/visual/depth-perception/distance-judgment#step-1",
        
        "name": "基準深度リングへの視線固定（アンカリング）",
        "text": "コリドー（通路）中央に表示されているシアン色の基準深度リングに視線をしっかりと固定します。"
      },
      {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ja/drills/visual/depth-perception/distance-judgment#step-2",
        
        "name": "接近する3Dターゲットの光学的拡大を注視",
        "text": "仮想空間の奥から手前に向かって接近してくる球体ターゲットの輪郭拡大率（オプティカルルーミング）を周辺視で捉えます。"
      },
      {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ja/drills/visual/depth-perception/distance-judgment#step-3",
        
        "name": "同一平面（基準リングと球体外周が一致）の瞬間に迎撃",
        "text": "拡大する球体の外周が基準リングの直径とぴったり一致した瞬間、画面タップ、マウスクリック、またはスペースキーを押して迎撃します。"
      },
      {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ja/drills/visual/depth-perception/distance-judgment#step-4",
        
        "name": "加速する速度と深度誤差フィードバックへの適応",
        "text": "スコアの上昇に伴って接近速度が加速します。各試行ごとの深度誤差率（5%未満でパーフェクト）を確認し、早押しや遅れを補正します。"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-11",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "深視力検査とは何ですか？どのような免許で必要ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "深視力検査とは、物体の遠近感・立体感・奥行き感を正しく把握できるかを測定する視力検査です。日本の道路交通法に基づき、大型自動車免許、中型自動車免許（8t限定解除含む）、準中型免許、牽引（けん引）免許、および第二種運転免許（タクシー・バス・運転代行）の取得時および更新時に受検が義務付けられています。"
        }
      },
      {
        "@type": "Question",
        "name": "運転免許試験の「三桿法（さんかんほう）」の合格基準は何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "三桿法（Howard-Dolman装置の原理に基づく検査）では、並んだ3本の棒のうち両端が固定され、真ん中の1本が前後に動きます。3本が横一列に並んだと感じた瞬間にスイッチを押し、3回測定した平均誤差が20mm（2.0cm）以内であれば合格となります。"
        }
      },
      {
        "@type": "Question",
        "name": "深視力検査で不合格になる主な原因は何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "左右の視力差（不同視・ガチャ目）、乱視の未矯正、斜位や斜視による両眼視機能の低下、加齢による調節力・動体視力の減退、睡眠不足や眼精疲労が主な原因です。また、検査機の動くスピードに焦って早押ししてしまうタイミングのズレも多く見られます。"
        }
      },
      {
        "@type": "Question",
        "name": "三桿法に合格するためのコツはありますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "動く真ん中の棒を直接凝視して追うのではなく、固定されている左右の棒に視線を置き、その隙間や太さの変化、影の重なりを周辺視で捉えるのが有効です。また、棒が最も太く見える瞬間、あるいは往復運動の折り返し地点からの中間タイミングを体感で掴む練習が効果的です。"
        }
      },
      {
        "@type": "Question",
        "name": "このブラウザ深視力シミュレーターは三桿法の練習になりますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい。本シミュレーターは、奥から接近するターゲットが特定深度の基準リングに合致する瞬間を捉える「動的深度プレーン一致テスト」です。接近に伴う光学的拡大率（オプティカルルーミング）と到達余裕時間（Time-to-Contact）の知覚を鍛えるため、三桿法における前後位置の判定感覚を研ぎ澄ますトレーニングとして最適です。"
        }
      },
      {
        "@type": "Question",
        "name": "オプティカルルーミング（光学的拡大率）とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "物体が観察者に接近する際、網膜上に投影される像が加速度的に拡大していく現象のことです。生態学的視覚理論（Lee, 1976; Regan & Beverley, 1978）では、脳は距離や速度を個別に意識することなく、網膜像の拡大率（τ変数）から直接「あと何秒で到達するか」を瞬時に計算していることが証明されています。"
        }
      },
      {
        "@type": "Question",
        "name": "本シミュレーターで免許更新の合否を診断できますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "いいえ。本ツールはWebブラウザ上で奥行き判定感覚と動的時間予測能力をトレーニングするための補助ツールです。眼科医療機関や運転免許試験場の実機（偏光・プリズム・物理ロッドを用いた三桿法測定器）による公式な医学的診断や検査結果を代替するものではありません。"
        }
      },
      {
        "@type": "Question",
        "name": "深視力を改善するための効果的なトレーニング方法は？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "パソコン画面での動的追従練習に加え、日常で両眼視差を刺激するトレーニング（ペンシルプッシュアップ＝ペン先を両目で追う寄り目訓練）、親指を前後に並べて交互に焦点を合わせる遠近フォーカス体操、テニスボールやキャッチボールなどの球技による立体追従運動が推奨されます。"
        }
      },
      {
        "@type": "Question",
        "name": "ディスプレイのリフレッシュレート（Hz）は測定に影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい。一般的な60Hzディスプレイでは1フレームあたり約16.7msの表示遅延とカクつきが生じ、高速接近時にターゲットの輪郭が跳ぶ現象が起こります。144Hz（約6.9ms）や240Hz（約4.1ms）の高リフレッシュレートモニターを使用すると、ルーミングの拡大が極めて滑らかになり、より正確な深度判定が可能です（Woods et al., 2015）。"
        }
      },
      {
        "@type": "Question",
        "name": "この深視力テストは完全無料で利用できますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい、完全無料です。会員登録、アプリのインストール、課金などは一切不要で、パソコン・スマートフォン・タブレットのWebブラウザからいつでも何度でも練習可能です。"
        }
      }
    ]
  };

  const distanceGuideJa = {
    heading: "深視力検査（三桿法）の合格基準・測定原理・トレーニング完全ガイド",
    intro: [
      "深視力（奥行き知覚・立体視・遠近感）とは、対象物がどれだけ離れているか、また空間内でどちらが手前にありどちらが奥にあるかという相対的な距離の差を三次元的に正確に把握する高度な視覚認知機能です。日本の道路交通法では、車体が大きく死角の多い大型車や、多数の乗客を乗せるバス・タクシー等の安全運行において極めて重要な能力と定められており、大型第一種・第二種免許、中型免許、準中型免許、牽引免許の取得・更新時に三桿法（さんかんほう）による深視力検査が厳格に義務付けられています。",
      "本ドリルは、Harvey J. Howard（1919）が航空適性検査のために考案した三桿法装置（Howard-Dolman apparatus）の幾何学的原理と、David N. Lee（1976）やDavid Regan & Kenneth I. Beverley（1978）が提唱した生態学的光学的拡大理論（オプティカルルーミングおよび接触余裕時間τ）をWebブラウザ上で忠実にシミュレーション化したものです。遠景から接近する3Dターゲットが中央の基準深度リングと完全に同一平面上に達した瞬間を迎撃することで、視覚皮質における動的奥行き判定能力と運動タイミング制御を集中的に鍛え上げます。",
      "測定精度とディスプレイハードウェア特性について：迎撃時の深度ズレはクライアント端末の高精度タイマーAPI（performance.now()）によってミリ秒単位でリアルタイム記録され、基準直径に対する相対誤差率（|実測値 - 基準値| / 基準値）として即時算出されます。通常の60Hzモニターでは約16.7msのフレーム更新間隔が生じるため、可能であれば144Hz（約6.9ms）以上のゲーミングモニターで練習すると、より精密な網膜像拡大勾配が得られ、正確なタイミング感覚を養うことができます（Woods et al., 2015）。",
      "プライバシーとデータ保護方針：SkillDrillsでは利用者の個人情報、検査スコア、眼科的指標などを外部サーバーに送信または収集することは一切ありません。すべての練習スコア、セッション履歴、レベル進捗は利用者の端末内（ブラウザのローカルストレージ）にのみ安全に保持されます。"
    ],
    benchmarks: {
      title: "深視力判定および深度誤差基準（エディトリアルガイド）",
      headers: ["評価ランク", "平均深度誤差率", "スコア・到達レベル", "視覚・神経認知的プロファイル"],
      rows: [
        ["ランクS (免許試験合格確実水準)", "誤差 5.0% 未満", "スコア: 1,500+ | レベル 7以上", "極めて研ぎ澄まされた立体視とルーミング検知力。三桿法の20mm基準（平均誤差2cm以内）を余裕をもってクリアできる卓越した遠近感と神経反射バランス。"],
        ["ランクA (良好・安定域)", "誤差 5.0% – 9.9%", "スコア: 1,100 – 1,499 | レベル 5–6", "安定した空間知覚能力。ターゲットの接近速度が加速しても冷静に基準面を見極められ、実車運転や球技スポーツでも高い動的視覚パフォーマンスを発揮可能。"],
        ["ランクB (標準成人基準)", "誤差 10.0% – 15.9%", "スコア: 750 – 1,099 | レベル 3–4", "健康な成人の平均的な奥行き知覚水準。低速から中速の接近では安定しているが、高速域でわずかな焦りや早押しのズレが生じるため本番前の反復練習が推奨される。"],
        ["ランクC (要練習・早押し注意)", "誤差 16.0% – 25.0%", "スコア: 450 – 749 | レベル 2", "早押しや見切り発車の傾向あり。本番の運転免許試験場や更新センターの緊張下で不合格判定を受けるリスクがあるため、視線固定と脱力のトレーニングが必要。"],
        ["ランクD (不同視・要眼科相談)", "誤差 25.0% 超", "スコア: 450 未満 | レベル 1", "著しい遠近感のズレ。左右の度数バランス（不同視・ガチャ目）や乱視の未矯正、斜位が疑われるため、眼鏡の度数再調整や眼科専門医への相談を強く推奨。"]
      ],
      note: "本ベンチマークは視覚心理物理学（Howard, 1919; Lee, 1976; Julesz, 1971）に基づき策定された練習指標です。実際の運転免許試験場での三桿法測定器（機械式ロッド）とは表示方式が異なります。"
    },
    techniques: {
      title: "深視力・三桿法を克服するための4大テクニック",
      items: [
        {
          name: "基準深度リングへの視線固定（アンカリング技術）",
          desc: "接近してくるターゲットそのものを目で追いかけてしまうと、衝動性眼球運動（サッケード）や網膜像のスリップが発生し、基準面との相対的な距離感が狂ってしまいます。",
          tips: "中央に固定されているシアン色の基準リングに両目の焦点をしっかりと固定し、そのリングの輪郭枠の中にターゲットが収まり重なり合う瞬間を周辺視野で捉えるようにしてください。"
        },
        {
          name: "オプティカルルーミング（輪郭拡大率）の変化を感知",
          desc: "物体が手前に近づくにつれて、網膜上の像は線形ではなく加速度的に急激に拡大（ルーミング）します（Lee, 1976; Regan & Beverley, 1978）。",
          tips: "ターゲットの表面模様や色ではなく『外周エッジの急激な広がり』に意識を集中させ、拡大の加速度が基準リングの円周とピタリと重なる臨界タイミングを体感で覚えます。"
        },
        {
          name: "早押し焦燥感の排除とトリガーディシプリン（自制心）",
          desc: "高速で球体が迫ってくると、脳が『間に合わない』と錯覚して基準面の手前で早押ししてしまう心理的エラー（見切り発車）が頻発します（Woods et al., 2015）。",
          tips: "指先の余分な力を抜き、深呼吸を行いながら、ターゲットが基準リングを完全に満たすまで0.1秒だけ待つ意識を持つと、パーフェクト判定（誤差5%未満）の確率が格段に向上します。"
        },
        {
          name: "ディスプレイ環境の最適化と適切な視距離の確保",
          desc: "画面に顔を近づけすぎると視野角が広がりすぎてルーミングの把握が困難になります。また低リフレッシュレートではコマ落ちによる空間スキップが生じます。",
          tips: "ディスプレイから約50〜70cmの適切な視聴距離を保ち、画面と目線が水平になるよう姿勢を整え、可能な限り60Hz以上の滑らかなモニター環境で練習してください。"
        }
      ]
    },
    steps: [
      "「検査・訓練を開始」ボタンを押して45秒間の深視力測定セッションをスタートします。",
      "画面中央に配置されたシアン色の基準深度リングに両眼の焦点を合わせます。",
      "仮想コリドーの奥から手前に向かってアプローチしてくる3Dターゲットを注視します。",
      "ターゲットの外周が基準リングの直径と完全に一致した瞬間、画面タップまたはクリックします。",
      "各回の深度誤差率（5%未満でパーフェクト）を確認しながら、段階的に増速するターゲットに適応していきます。"
    ],
    audience: "大型自動車・中型自動車・牽引・第二種運転免許の取得や更新を控えているドライバー、フォークリフト等の重機作業員、野球・テニス等の球技アスリート、立体視や遠近感の維持・改善を目指す方。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('howard1919', 'lee1976', 'regan1978', 'julesz1971', 'woods2015'),
    related: [
      { href: "/drills/visual/tracking-accuracy/moving-target", label: "移動ターゲット追従訓練" },
      { href: "/drills/visual/reaction-speed/light-reaction", label: "光反応スピードテスト" },
      { href: "/drills/visual/tracking-accuracy/multiple-targets", label: "マルチオブジェクト動体視力" },
      { href: "/drills/visual/tracking-accuracy/pursuit-tracker", label: "滑動性眼球運動トラッカー" },
      { href: "/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go 衝動制御テスト" },
      { href: "/drills/visual/visual-recognition/entropic-grid", label: "エントロピック視覚探索テスト" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DistanceJudgmentClient
        copy={{
          title: "深視力検査 (Distance Judgment)",
          subtitle: "深視力 練習・三桿法シミュレーター (奥行き・遠近感テスト)",
          caption: "深視力（奥行き知覚）とは、空間内の物体がどれだけ離れているか、前後の位置関係を正確に把握する視覚機能です。網膜像の両眼視差（Julesz, 1971）と、接近する物体の輪郭拡大率（オプティカル・ルーミングによる接触余裕時間τの算出: Lee, 1976; Regan & Beverley, 1978）が中枢神経系で処理されます。平面ディスプレイ上では両眼視差が一定となるため、本ドリルは運動視差と光学的拡大率による動的距離判定能力（Howard, 1919の三桿法に連動）を集中的に測定・強化します。",
          statScore: "スコア",
          statTime: "残り時間",
          statLevel: "レベル",
          statBestScore: "ハイスコア",
          startTitle: "深視力検査 (三桿法)",
          startSubtitle: "3D奥行き判定・オプティカルルーミング迎撃トレーニング",
          startBtn: "検査・訓練を開始",
          getReady: "準備してください",
          newBest: "自己ベスト更新",
          statPoints: "獲得ポイント",
          statAccuracy: "精度 (Accuracy)",
          statPeakLevel: "到達レベル",
          statIntercepts: "完全一致数",
          playAgain: "もう一度プレイ",
          shareScore: "結果を共有",
          returnOptions: "終了",
          rulesTitle: "検査ルールとスコア採点基準",
          rule1Text: "パーフェクト迎撃（完全一致）",
          rule1Highlight: "+150 PTS",
          rule1Result: "深度誤差 5%未満",
          rule2Text: "ニアミス迎撃（許容範囲）",
          rule2Highlight: "+100 PTS",
          rule2Result: "深度誤差 12%未満",
          rule3Text: "アプローチ速度の段階加速",
          rule3Highlight: "高速度への適応",
          rule3Result: "レベル上昇に伴い球体の移動速度が上昇",
          rule4Text: "見逃し・タイムアウト",
          rule4Highlight: "減点なし",
          rule4Result: "得点加算なしで次のターゲットへ",
          aboutTitle: "深視力検査と三桿法トレーニングについて",
          overviewTitle: "深視力検査（三桿法）とは何か？",
          overviewLead: "深視力とは、物体の遠近感や立体感、動く物との距離の差を正しく把握する視力のことです。日本の道路交通法では、大型自動車免許、中型免許、牽引免許、第二種免許（タクシー・バス）の取得および更新時に、三桿法（さんかんほう）と呼ばれる深視力検査が義務付けられています。",
          overviewBody: "三桿法では、2.5m離れた位置から覗き込み、3本の棒のうち中央の棒が前後に移動します。3本が一直線に並んだと感じた瞬間にボタンを押し、3回の平均誤差が20mm（2cm）以内であれば合格となります。本シミュレーターは、奥から接近するターゲットが特定深度の基準リングに合致する瞬間を捉える動的迎撃方式を採用しており、三桿法で最も重要となるオプティカルルーミング（光学的拡大率）の知覚を徹底的に訓練できます。",
          aboutCards: [
            { iconBg: "bg-blue-600", title: "対象者", text: "大型・中型・二種免許の更新を控えているドライバー、フォークリフト等の重機オペレーター、球技アスリート、立体視に不安のある方。" },
            { iconBg: "bg-cyan-600", title: "鍛えられる能力", text: "奥行き知覚、接近物体の輪郭拡大率（ルーミング）の検知力、動体認知速度、タイミングの再現性。" },
            { iconBg: "bg-purple-600", title: "合格のコツ", text: "ターゲットそのものを凝視せず、基準リングの縁とターゲットの境界線が完全に重なり合う瞬間を周辺視で捉えてボタンを押すこと。" }
          ],
          aboutSections: [
            {
              title: "なぜ深視力検査で落ちる人が多いのか？",
              paragraphs: [
                "普段の生活で両目の視力に不自由を感じていなくても、深視力検査で突然不合格になるケースは珍しくありません。主な原因は、左右の視力バランスの崩れ（不同視）、乱視の未矯正、長時間のスマホ使用による眼精疲労、そして検査機械の独特な動きに対する焦りです。",
                "立体視は両目から送られるわずかなズレ（両眼視差）を脳で統合することで生まれますが、疲労や度数の不一致があるとこの統合処理に遅延が生じ、前後の距離感が狂ってしまいます。"
              ]
            },
            {
              title: "オプティカルルーミングと到達予測（Time-to-Contact）",
              paragraphs: [
                "物体が自分に向かって接近してくる時、網膜上の像は線形ではなく加速度的に拡大します。脳はこの拡大率（τ変数）を計算して『あと何ミリ秒で到達するか』を予測しています（Lee, 1976）。",
                "本ドリルで加速するターゲットの到達タイミングを繰り返し体感することで、視覚皮質におけるルーミング処理速度が向上し、三桿法の実機でも落ち着いて並びを判定できるようになります。"
              ]
            }
          ]
        }}
      />
      <DrillGuide guide={distanceGuideJa} />
      <RelatedDrills currentCategory="visual" currentHref="/drills/visual/depth-perception/distance-judgment" locale="ja" />
    </>
  );
}
