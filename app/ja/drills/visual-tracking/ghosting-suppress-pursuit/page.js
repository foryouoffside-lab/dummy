import GhostingSuppressPursuitClient from '@/app/drills/visual-tracking/ghosting-suppress-pursuit/GhostingSuppressPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// JAPANESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "残像 抑制 トレーニング" / "動体視力 残像" (Ghosting suppression gaze fixation training)
// Secondary:    "固視微動 トレーニング", "視線固視 安定性", "アイトラッキング 残像抑制"
// LSI / Domain:  "モーションスミア 抑制", "中心窩 ロック", "動体視力 ブレない目",
//               "マイクロサッケード 視線", "エイム 視線固定", "動的視覚ノイズ 除去", "FPS 動体視力 鮮明化"
// Authentic Domain Terms: 残像抑制（Ghosting Suppression）, モーションスミア（Motion Smear）, 固視微動（Microsaccades）, 中心窩固視（Foveal Fixation）, 滑動性追従（Smooth Pursuit）, 前庭動眼反射抑制（VOR Suppression）
// ============================================================

export const metadata = {
  title: "残像抑制固視トレーニング・動体視力視線安定性テスト – 中心窩ロック＆モーションスミア抑制 | SkillDrills",
  description: "網膜残像や動的ゴースティング（ブレ）を大脳視覚野で能動的に抑制し、移動標的の中心窩ロックと固視微動安定性を極限まで高めるアイトラッキング練習。無料・登録不要。",
  keywords: [
    "残像 抑制 トレーニング",
    "動体視力 残像",
    "固視微動 トレーニング",
    "視線固視 安定性",
    "アイトラッキング 残像抑制",
    "モーションスミア 抑制",
    "中心窩 ロック",
    "動体視力 ブレない目",
    "マイクロサッケード 視線",
    "エイム 視線固定",
    "動的視覚ノイズ 除去",
    "FPS 動体視力 鮮明化"
  ],
  openGraph: {
    title: "残像抑制固視トレーニング・動体視力視線安定性テスト – 中心窩ロック＆モーションスミア抑制 | SkillDrills",
    description: "網膜残像や動的ゴースティング（ブレ）を大脳視覚野で能動的に抑制し、移動標的の中心窩ロックと固視微動安定性を極限まで高めるアイトラッキング練習。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "残像抑制固視トレーニング・動体視力視線安定性テスト – 中心窩ロック＆モーションスミア抑制 | SkillDrills",
    description: "動的残像やモーションスミアを脳内で能動的に抑制し、中心窩固視安定性を鍛える無料オンライントレーニング。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/ghosting-suppress-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "視覚追従・アイトラッキング", "item": "https://skilldrills.online/ja/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "残像抑制固視トレーニング (ゴースト抑制訓練)", "item": "https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "残像抑制固視トレーニング・動体視力視線安定性テスト (Ghosting Suppress Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "移動標的の背後に発生する動的残像リングや視覚ノイズを能動的に抑制し、中心窩での安定固視を鍛える無料ブラウザ完結型アイトラッキング測定ツール。",
  "featureList": [
    "疑似モーションスミア・残像リングを生成する高精度キャンバスレンダリング",
    "0.5倍速〜9.0倍速の可変スピード設定と壁面反射バウンド運動シミュレーション",
    "ターゲットサイズ・発光（Glow）・CRT走査線エフェクトの表示カスタマイズ",
    "外部サーバー通信一切なしの完全クライアントサイドローカルデータ管理"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "残像抑制固視トレーニング – 動体視力視線安定性 オンライントレーナー | SkillDrills",
  "alternateName": "Ghosting Suppress Pursuit Japan",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit",
  "dateModified": "2026-09-15",
  "description": "無料オンライン動体視力・視線安定性トレーニング。残像や視覚的乱気流下でも中心視野をターゲットの中心核にロックし続ける神経固視ドリル。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応の最新モダンウェブブラウザ",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "残像抑制, 中心窩固視安定性, マイクロサッケード制御, モーションスミア遮断, 動体視力明瞭化"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "残像抑制固視トレーニング・動体視力視線安定性テスト (Ghosting Suppress Pursuit)",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit",
  "description": "残像を引き連れて移動するターゲットを眼球でブレずにロックし続ける無料アイトラッキングゲーム。視線ブレの抑制と動体視力の解像度を高めます。",
  "genre": ["Eye Tracking", "Visual Training", "Aim Trainer"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "残像抑制固視・視線安定性向上の正しい練習手順",
  "dateModified": "2026-09-15",
  "description": "移動標的の残像ノイズを無視し、中心核に焦点を絞り続けて固視精度を極限まで高めるための公式手順ガイド。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "速度倍率とセッション時間の設定",
      "text": "最初は残像に目を慣らし中心核を捉えるため、1.0倍速の基準速度と60秒のセッション時間を選択します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "頭部静止と標的中心核への視線アンカー",
      "text": "画面から50〜70cm離れて頭部を固定し、移動標的の中心にある高輝度コアにのみ中心窩の焦点を集中させます。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "後方残像リングの能動的認知遮断",
      "text": "標的の後方に引き連れられる残像リングやスミアに視線を引っ張られないよう、中心核だけを凝視して滑動追従を維持します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "壁面反射バウンド時の即座の中心窩再ロック",
      "text": "標的が画面端で跳ね返った際も視界を泳がせず、瞬時の微小補正で新ベクトルの中心核を即座に再ロックします。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-15",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "残像抑制固視追従テスト（Ghosting Suppress Pursuit）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "残像抑制固視追従テストは、背後に動的残像リング（ゴースティング）やモーションスミアを引き連れて移動するターゲットを追跡し、視線が残像に引っ張られるのを能動的に抑制して標的中心核のみに中心窩焦点を維持し続ける眼球運動ドリルです（Burr, 1980; Martinez-Conde et al., 2004）。"
      }
    },
    {
      "@type": "Question",
      "name": "視覚運動中に生じる「モーションスミア（動的残像）」とはどのような現象ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "網膜の光受容細胞（錐体・桿体）の光化学反応には有限の減衰時間（数十ミリ秒）があり、また液晶ディスプレイの画素応答速度の遅延も加わることで、移動する物体の背後に残像（スミア）が尾を引く現象です。この残像に注意が奪われると、標的の実位置に対する知覚エラーが発生します。"
      }
    },
    {
      "@type": "Question",
      "name": "人間の脳は動的残像をどのように能動的に抑制しているのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "大脳皮質の初期視覚野（V1野）および中側頭視覚野（MT/V5野）には、物体が運動している間、その進行軌跡の背後に残る残像信号を能動的に減衰させる「時間的マスキング抑制機構」が存在します（Burr, 1980）。本ドリルはこの皮質抑制回路を刺激・強化します。"
      }
    },
    {
      "@type": "Question",
      "name": "固視微動（マイクロサッケード）は移動標的の追従においてどのような役割を果たしますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "マイクロサッケードは、一見静止して見える固視中にも毎秒1〜3回発生する極小の不随意眼球運動です。網膜光受容体の受容野を微小振動させて視覚情報の退色（Troxler消失）を防ぎ、微細な視線ドリフトをミリ秒単位で補正して中心窩解像度を最高水準に保ちます（Martinez-Conde et al., 2004; Rolfs, 2009）。"
      }
    },
    {
      "@type": "Question",
      "name": "低速追従（Constant Slow Pursuit）と本残像抑制ドリルの違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "低速追従はクリーンなリサージュ軌道に沿って純粋な滑動追従ゲインを滑らかに維持することを主眼とします。一方、残像抑制ドリルは意図的に背後へ視覚ノイズリングを発生させ、視覚的注意の妨害をシャットアウトする「ディストラクター抑制力」と「高コントラスト中心核への固視アンカー力」を集中的に鍛えます。"
      }
    },
    {
      "@type": "Question",
      "name": "競技FPS（Apex Legends, Overwatch, VALORANT）のエイムにどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "激しい銃撃戦では、マズルフラッシュ、スモーク、爆発エフェクト、画面揺れなどの視覚ノイズが標的周辺に大量に発生します。残像抑制力が高いプレイヤーは周辺の視覚的撹乱に惑わされず、敵モデルの中心（ヒットボックス）に視線を固定し続けられるため、トラッキングエイムのブレが劇的に減少します（Yang et al., 2025）。"
      }
    },
    {
      "@type": "Question",
      "name": "野球、テニス、卓球などの高速球技スポーツにどのような効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "超高速で回転しながら飛来するボール（トップスピンやスライス）の縫い目や回転軸、あるいは相手プレイヤーの複雑なフェイント動作に対して、ブレのないクリアな中心視力を維持し、正確なインパクトタイミングを捉える動体視力基礎を養います（Appelbaum & Erickson, 2018）。"
      }
    },
    {
      "@type": "Question",
      "name": "頭部を固定して目だけで追う必要があるのはなぜですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "頭部を動かすと前庭動眼反射（VOR）が働き、外眼筋自体の微細制御や皮質下の固視回路に十分な負荷がかかりません（Leigh & Zee, 2015）。眼球単独の微細運動協調と網膜スリップ抑制力を純粋に分離・強化するため、頭部静止が必須となります。"
      }
    },
    {
      "@type": "Question",
      "name": "ディスプレイの画素応答速度（GtG）やリフレッシュレートは残像にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "応答速度が遅い液晶（VAや旧型IPS）では物理的なパネル残像（ハードウェアゴースト）が発生し、生物学的な残像と重なって視認性を低下させます。高速IPSやOLED、144Hz以上の高リフレッシュレートディスプレイを使用することで、物理遅延を排除し純粋な神経学的固視能力を測定できます（Woods et al., 2015）。"
      }
    },
    {
      "@type": "Question",
      "name": "1日の推奨練習時間と効果的なセッション頻度はどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1セッション60秒を、間に30秒の目を休めるインターバルを挟んで5〜8セット（計5〜10分）行うのが理想的です。視覚的ノイズへの集中凝視は眼筋疲労を招きやすいため、適度な休憩を取りながら毎日規則正しく継続することが推奨されます。"
      }
    }
  ]
};

const guideProps = {
  heading: "動的残像抑制と中心窩固視安定性の神経眼科学基準",
  intro: [
    "残像抑制固視追従（Ghosting Suppress Pursuit）とは、移動物体の背後に生じる網膜残光や視覚的スミア（モーションスミア）を大脳皮質レベルで能動的にフィルタリングし、標的中心核に対する中心窩固視（Foveal Fixation）を安定維持する高度なアイトラッキング課題です。刺激が網膜上を移動する際、受容野の時間遅延によって必然的に生じる視覚的乱気流を排除し、鮮明な輪郭知覚を担保する神経機構を限界まで追い込みます（Burr, 1980）。",
    "皮質能動的抑制と固視微動（マイクロサッケード）のメカニズム：標的が約30°/秒以上の速度で移動すると網膜スリップが発生し、後方に軌跡の残像が形成されます（Krauzlis, 2004）。通常、この後方ノイズは視線を後ろへ引っ張るディストラクターとして作用しますが、初期視覚野（V1/MT）の時間的抑制機構が機能することで残像が消去されます（Burr, 1980）。同時に、毎秒1〜3回発生する固視微動（マイクロサッケード）が中心窩受容野を微細更新し、視覚情報の消失（Troxler効果）を防ぎながら標的中心への強固なロックを維持します（Martinez-Conde, Macknik, & Hubel, 2004; Rolfs, 2009）。",
    "競技eスポーツおよび高速スポーツにおける実戦応用：FPSゲームにおけるマズルフラッシュやスモーク、爆発パーティクルが飛び交う戦場、あるいはテニスや野球における超高速ボールの追跡では、周辺の視覚ノイズに惑わされず標的コアを凝視し続ける能力が命中率を直結で左右します（Yang et al., 2025; Appelbaum & Erickson, 2018）。本ドリルは意図的に背後残像リングを発生させることで、視覚的ノイズ耐性と中心窩アンカー精度を飛躍的に向上させます。",
    "ハードウェア環境の標準化と前庭反射の抑制：ディスプレイの画素応答速度（GtG）が遅い環境では物理的なゴースティングが重畳して神経測定に誤差を生むため、144Hz以上の高駆動・低残像モニターでの実施が推奨されます（Woods et al., 2015）。また、頭部を完全に静止させて前庭動眼反射（VOR）を抑え込むことで、純粋な外眼筋の微小運動制御と大脳皮質の固視維持回路を独立して鍛錬できます（Leigh & Zee, 2015）。すべてのセッション結果はローカルストレージに安全に保管されます。"
  ],
  benchmarks: {
    title: "残像抑制固視安定性・中心窩ロック評価基準（エディトリアルガイド）",
    headers: ["習熟度ティア", "設定速度帯 (Speed Multiplier)", "残像・視覚ノイズ下での固視維持特性", "神経反応・視線安定性プロファイル"],
    rows: [
      ["ティア1：神速・絶対固視ロック (Apex Fixation)", "2.0x 以上の超高速域", "激しい残像リングや反射バウンド下でも視線が一切後方へ吸い寄せられず、標的中心に完全密着。", "初期視覚野の卓越したモーションスミア抑制とマイクロサッケード制御。プロeスポーツ選手・トップアスリート水準。"],
      ["ティア2：卓越・高精度ロック (Superior Steadiness)", "1.4x – 1.9x 高速域", "高速移動時も残像に惑わされず輪郭を鮮明に捕捉。壁面反射直後もわずかなブレで即座に安定。", "優れた外眼筋の微細運動協調と視覚的注意フィルタリング能力。激しい視覚効果下でも高精度エイムを維持。"],
      ["ティア3：標準・健常成人基準 (Solid Baseline)", "1.0x – 1.3x 標準域", "標準速度の移動標的を安定追従。急激なバウンド時や高残像時に瞬間的な視線の迷いが発生。", "健常な成人の標準的固視安定性水準。日常のスポーツやカジュアルゲームに十分な視線保持力。"],
      ["ティア4：視線ブレ・要反復 (Developing Control)", "0.7x – 0.9x 低速域", "移動に伴う後方残像に視線が引っ張られ、標的中心から視線が後方へ遅延・脱落しやすい。", "視覚的ノイズに対する皮質抑制の遅れ。低速域で標的中心のみを凝視し続ける反復トレーニングが必要。"],
      ["ティア5：固視崩壊・初学者 (High Drift)", "0.7x 未満", "残像のノイズに視界が眩惑され、標的を見失って視線が無秩序に泳いでしまう。", "まずは低速で頭部を完全に静止させ、明瞭な標的中心点だけをじっと見つめ続ける基礎からスタート。"]
    ],
    note: "本基準値は動的残像抑制および固視微動（マイクロサッケード）の神経眼科学研究（Burr, 1980; Martinez-Conde et al., 2004; Rolfs, 2009; Krauzlis, 2004）に基づき策定された編集基準です。"
  },
  techniques: {
    title: "動的残像を抑制し中心窩ロックを強化する4大テクニック",
    items: [
      {
        name: "標的中心コア（高輝度中心部）への意識的アンカー固定",
        desc: "Martinez-Conde et al.（2004）が解明したように、動的刺激の中心核に焦点を集中させることでマイクロサッケードが適切に誘発され、固視精度が最大化されます。",
        tips: "外側の残像リングを見るのではなく、常に発光する中心のコアだけをピンポイントで射抜く意識を持ちましょう。"
      },
      {
        name: "大脳視覚野によるモーションスミアの能動的抑制",
        desc: "Burr（1980）が示す通り、後方に流れる残像は脳内で減衰可能です。『残像は無視すべきノイズである』と意識的に割り切ることが重要です。",
        tips: "尾を引く残像の軌跡を視野の周辺（ぼんやりとした背景）として処理し、意識のフォーカスを中心核だけに絞り込みます。"
      },
      {
        name: "頭部完全静止による前庭動眼反射（VOR）の遮断",
        desc: "Leigh & Zee（2015）の通り、首や頭を動かすと前庭反射が混入し、外眼筋の微細な固視安定回路が鍛えられません。",
        tips: "顎を引き、首筋を完全に固定した状態で、眼球のみの独立したモーターコントロールで移動目標をロックします。"
      },
      {
        name: "高速応答ディスプレイ（OLED / Fast IPS）による物理残像の最小化",
        desc: "Woods et al.（2015）が指摘するように、モニターの応答遅延によるハードウェアゴーストを排除することで、純粋な視覚固視力を正確に評価できます。",
        tips: "高リフレッシュレート（144Hz以上）かつ画素応答速度の速いディスプレイを使用し、快適な室内照明で実施してください。"
      }
    ]
  },
  steps: [
    "速度倍率（0.5x〜2.0x）と時間（60秒）を設定し、ドリルを開始します。",
    "画面から約50〜70cm離れ、頭部を完全に動かさない姿勢を確立します。",
    "移動を開始したターゲットの『中心核』にのみ視線をロックします。",
    "後方に生じる残像リングやスミアを能動的に無視し、壁面バウンド時も中心核から視線を外さないよう維持します。",
    "セッション終了後、残像に引っ張られずに中心を捉え続けられた時間割合を振り返り、次回セッションに活かします。"
  ],
  audience: "競技FPS（Apex Legends, Overwatch, VALORANT, CS2）プレイヤー、格闘ゲーム選手、高速球技アスリート（テニス、卓球、野球、バドミントン）、視線ブレを抑制し動体視力の解像度を極限まで高めたいすべてのトレーニング実践者。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('burr1980', 'martinezConde2004', 'rolfs2009', 'krauzlis2004', 'leigh2015', 'woods2015'),
  related: [
    { href: "/ja/drills/visual-tracking/constant-slow-pursuit", label: "低速追従眼球運動トレーニング (Constant Slow)" },
    { href: "/ja/drills/visual-tracking/directional-chaos-pursuit", label: "カオス方向追従テスト (Directional Chaos)" },
    { href: "/ja/drills/visual-tracking/dynamic-evasion-pursuit", label: "リアクティブ追従訓練 (Dynamic Evasion)" },
    { href: "/ja/drills/visual-tracking/sine-wave-pursuit", label: "正弦波追従トレーニング (Sine Wave)" },
    { href: "/ja/drills/visual-tracking/infinity-pursuit", label: "8の字ループ追従運動 (Infinity)" },
    { href: "/ja/drills/visual-tracking/predictive-pursuit", label: "予測アイトラッキング (Predictive)" }
  ]
};

export default function LocalizedPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GhostingSuppressPursuitClient
        copy={{
          title: "残像抑制固視トレーニング・動体視力視線安定性テスト",
          subtitle: "中心窩ロック＆モーションスミア抑制訓練",
          description: "高速で移動する標的を追尾する際、網膜の光受容体の時間的残光やディスプレイの応答遅延により動的残像（ゴースティング）が発生します（Burr, 1980）。本ドリルは初期視覚野（V1/MT）の能動的抑制機構と固視微動（マイクロサッケード）を活性化し、背後の視覚ノイズを無視して標的中心を高精度に中心窩でロックし続ける視線安定性を鍛えます（Martinez-Conde et al., 2004; Rolfs, 2009）。"
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/ghosting-suppress-pursuit" />
      </div>
    </>
  );
}
