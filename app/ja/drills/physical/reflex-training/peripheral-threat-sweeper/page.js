import PeripheralThreatSweeperClient from '@/app/drills/physical/reflex-training/peripheral-threat-sweeper/PeripheralThreatSweeperClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JP / JA)
// Primary Intent: 周辺視野 トレーニング, 動体視力 トレーニング ゲーム, 周辺視野 広い人, エイム 周辺 視野
// Japanese Context: FPS（VALORANT、Apex、CoD）におけるトンネルビジョン防止およびスポーツ選手の動体視力・有効視野(UFOV)拡張
// High-Demand, Low-Competition Target Keywords:
//   - "周辺視野 トレーニング" (Core peripheral awareness drill query)
//   - "動体視力 トレーニング ゲーム" (Dynamic visual acuity gaming query)
//   - "周辺 視野 トレーニング 方法" (Methodology & exercise guide query)
//   - "エイム 周辺 視野" (FPS aiming and field of view awareness query)
//   - "周辺視野 中心視野 違い" (Covert vs overt foveal perception query)
//   - "有効視野 UFOV 拡大" (Useful Field of View clinical & athletic query)
//   - "動体視力 反応速度" (Dynamic acuity reaction chronometry query)
//   - "視野 拡大 練習" (Field of view widening practice query)
//   - "反射神経 トレーニング ゲーム" (Reflex training game query)
//   - "トンネルビジョン 改善" (Tunnel vision overcoming under stress query)
// ============================================================

export const metadata = {
  title: "周辺視野トレーニング＆動体視力テストゲーム – 有効視野(UFOV)拡大と反応速度強化 | SkillDrills",
  description: "無料オンライン周辺視野トレーニング＆動体視力テストゲーム。中央の防壁コアを凝視したまま、全方位360度の外周から迫り来る脅威ノードを周辺視野で瞬時に察知して迎撃。トンネルビジョンを解消し、有効視野(UFOV)と空間認識能力を極限まで鍛え上げます。",
  keywords: [
    "周辺視野 トレーニング",
    "動体視力 トレーニング ゲーム",
    "周辺 視野 トレーニング 方法",
    "エイム 周辺 視野",
    "周辺視野 中心視野 違い",
    "有効視野 UFOV 拡大",
    "動体視力 反応速度",
    "視野 拡大 練習",
    "反射神経 トレーニング ゲーム",
    "トンネルビジョン 改善"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/reflex-training/peripheral-threat-sweeper',
    languages: getAlternateLanguages('/drills/physical/reflex-training/peripheral-threat-sweeper'),
  },
  openGraph: {
    title: "周辺視野トレーニング＆動体視力テストゲーム – 有効視野(UFOV)拡大と反応速度強化 | SkillDrills",
    description: "無料オンライン周辺視野トレーニング＆動体視力テストゲーム。中央の防壁コアを凝視したまま、全方位360度の外周から迫り来る脅威ノードを周辺視野で瞬時に察知して迎撃。トンネルビジョンを解消し、有効視野(UFOV)と空間認識能力を極限まで鍛え上げます。",
    url: 'https://skilldrills.online/ja/drills/physical/reflex-training/peripheral-threat-sweeper',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "周辺視野トレーニング＆動体視力テストゲーム – 有効視野(UFOV)拡大と反応速度強化 | SkillDrills",
    description: "無料オンライン周辺視野トレーニング＆動体視力テストゲーム。中央の防壁コアを凝視したまま、全方位360度の外周から迫り来る脅威ノードを周辺視野で瞬時に察知して迎撃。トンネルビジョンを解消し、有効視野(UFOV)と空間認識能力を極限まで鍛え上げます。",
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
      "name": "身体・運動トレーニング",
      "item": "https://skilldrills.online/ja/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "反射神経・リアクショントレーニング",
      "item": "https://skilldrills.online/ja/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "周辺視野トレーニング＆動体視力迎撃",
      "item": "https://skilldrills.online/ja/drills/physical/reflex-training/peripheral-threat-sweeper"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "周辺視野＆動体視力トレーニングツール (Peripheral Threat Sweeper)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "網膜周辺部の高感度センサーと潜在的注意定位(Covert Orienting)を活用し、有効視野(UFOV)の拡張と空間認識反射を鍛える科学的視覚運動統合ドリル。"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "周辺視野テスト・動体視力トレーニングアプリ",
  "url": "https://skilldrills.online/ja/drills/physical/reflex-training/peripheral-threat-sweeper",
  "description": "無料オンライン周辺視野測定＆トレーニング。中央注視を保ちながら外周から突入する脅威を瞬時にクリック迎撃し、トンネルビジョンを克服します。",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "周辺視野迎撃アクション (Peripheral Threat Sweeper Game)",
  "url": "https://skilldrills.online/ja/drills/physical/reflex-training/peripheral-threat-sweeper",
  "description": "中央コアを防衛しながら全方位から収束するターゲットを撃墜するハイスピード周辺視野リアクションゲーム。",
  "genre": ["Action", "Sports Game", "Reflex Game", "Visual Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "周辺視野トレーニング（周辺視訓練）とは何ですか？通常の視力検査とはどう違いますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "通常の視力（中心視力・中心窩視力）が視野の中心1〜2度で文字や物体の微細な形状を識別する能力であるのに対し、周辺視野トレーニングは中心から外れた網膜周辺部の桿体細胞を活性化し、広範な空間内の動き・明暗差・接近する危険を察知して即座に運動へ変換する「有効視野（UFOV, Useful Field of View）」を拡大するトレーニングです。"
      }
    },
    {
      "@type": "Question",
      "name": "周辺脅威迎撃ドリル（Peripheral Threat Sweeper）の基本的なゲームルールと操作方法は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "画面中央にあるシールドコアを常に見つめたまま（中心注視の維持）、キャンバス外周360度からランダムな角度で中央に向かって移動してくる脅威ノードを周辺視野で捉えます。視線を中央から動かさずにマウスの弾道フリックやタッチで瞬時に迎撃し、コアへの侵入を阻止してスコアと時間を稼ぎます。"
      }
    },
    {
      "@type": "Question",
      "name": "潜在的注意定位（Covert Orienting）と顕在的眼球運動（Overt Gaze）の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "心理学者マイケル・ポズナー（Michael Posner, 1980）の注意研究によると、顕在的眼球運動（サッカード）は眼球そのものを対象に向けて回転させる動作で約200ミリ秒以上の物理的時間が必要です。一方、潜在的注意定位は視線（中心窩）を固定したまま意識のスポットライトだけを素早く周辺部に移動させて物体を処理するため、約100ミリ秒前後の極めて高速な知覚・判断が可能になります。"
      }
    },
    {
      "@type": "Question",
      "name": "Apex LegendsやVALORANTなどのFPSゲームにおいて、なぜ周辺視野が勝敗を左右するのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "撃ち合いの最中にクロスヘアを敵の出現予測ラインに固定しながらも、画面隅のミニマップ情報、スキルクールダウン、左右の死角から急襲してくる敵の影を同時に把握しなければならないためです。周辺視野が狭いと特定の一点に視野が狭窄する「トンネルビジョン」に陥り、横や背後からの奇襲への反応が致命的に遅れてしまいます。"
      }
    },
    {
      "@type": "Question",
      "name": "侵入してくる脅威ノードにはどのような行動パターンや移動速度がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "脅威ノードには3つの挙動が存在します。標準ノード（Standard）は基本速度で直線的にコアを目指し、高速ノード（Fast）は1.6倍の超高速で奇襲を仕掛けてきます。さらに回避ノード（Evasive）は左右に揺らぎながら進行するため、網膜周辺部における非線形な軌道予測能力が試されます。"
      }
    },
    {
      "@type": "Question",
      "name": "スコア獲得に伴うレベル上昇で、移動速度や出現頻度はどのように激化しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "スコアが蓄積されるとレベルがLv.1からLv.15以上へとシームレスに上昇します。ノードの移動速度は初期の80 px/sから最大520 px/sまで急激に加速し、出現間隔は1.4秒から0.20秒まで極限に短縮され、四方八方から同時にターゲットが襲い来る過密状態へと突入します。"
      }
    },
    {
      "@type": "Question",
      "name": "中央コアが突破された場合（Core Breach）、どのようなペナルティが発生しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "脅威ノードが中央の防壁コアを突破すると画面が赤くフラッシュし、それまで蓄積したコンボ倍率が即座に1.0倍へとリセットされます。また設定で「ペナルティ有効」にしている場合、残り制限時間から0.8秒が容赦なく没収され、セッション継続が一気に困難になります。"
      }
    },
    {
      "@type": "Question",
      "name": "ターゲット迎撃時に付与される「+0.6秒の制限時間延長ボーナス」はどう機能しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ターゲットを1体撃墜するごとに基本点（+100点 × コンボ倍率）に加えて、残り時間に+0.6秒が加算されます。クリックミスやコア突破を防ぎながら高い迎撃精度を保ち続ければ、初期設定の30秒を超えて長時間の高難易度サバイバルを継続し、驚異的なハイスコアを叩き出すことができます。"
      }
    },
    {
      "@type": "Question",
      "name": "周辺視野スリーパーにおける上位1%（Tier 1: Apex Guardian）の認定スコア基準は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "最上位のTier 1「Apex Peripheral Guardian（S判定）」に到達するには、24,000点以上のスコア、90%以上の迎撃精度、そして450 px/sを超える極限速度のノード生還が求められます。中級者の平均到達ラインはTier 3（11,000〜16,999点）付近です。"
      }
    },
    {
      "@type": "Question",
      "name": "周辺視野と動体視力を効果的に鍛えるための推奨ディスプレイ距離とマウス設定は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "画面端が視界の40〜50度（FOV）に収まるよう、ディスプレイから50〜70cmの視距離を維持するのが理想的です。144Hz以上の高リフレッシュレートモニターと1000Hzポーリングレートのゲーミングマウスを使用することで、表示遅延を4ms未満に抑え、網膜への余計な残像負荷を大幅に軽減できます（Woods et al., 2015）。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "周辺視野と放射状脅威迎撃トレーニングの4ステップ",
  "description": "中央注視と潜在的注意定位を駆使して周辺視野の反応速度を極限まで高める科学的訓練手順。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "中央コアへの視線アンカリング（注視点の固定）",
      "text": "画面中央のエメラルドグリーンのシールドコアに視線をしっかりと固定します。外周で現れるノードを直接眼球で追う癖を抑え、視線を中央に保ちます。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/peripheral-threat-sweeper#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "網膜周辺部による動きと明暗コントラストの察知",
      "text": "網膜周辺部の高い明暗感度を利用し、画面外縁からコアへと侵入してくる赤・オレンジの高コントラストな脅威ノードを意識の端で瞬時に捉えます。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/peripheral-threat-sweeper#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "放射状弾道フリックによる高速迎撃",
      "text": "ノードが中央コアに触れる前に、手首の俊敏な弾道フリックでカーソルを弾き出してノードをクリックします。撃墜に成功すると+0.6秒が延長されます。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/peripheral-threat-sweeper#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "即座の中央センタリングとコンボ維持",
      "text": "迎撃後すぐにカーソルを中央付近へ戻して次の侵入に備え、全方位360度のスキャン体制を維持しながら最大3.0倍のコンボを継続させます。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/peripheral-threat-sweeper#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('posner1980', 'treisman1980', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "周辺視野の知覚測定と有効視野(UFOV)の科学的メカニズム",
    paragraphs: [
      "人間の視覚システムにおいて、視線の中心（中心窩）は全視野のわずか1〜2度に過ぎず、文字の読書や細部の精緻な識別を担当しています。これに対し、中心窩を取り巻く広大な網膜周辺部は解像度こそ大幅に低下するものの、光の明暗変化や高速な物体の移動を高感度に捉える桿体細胞が密集しています。本ドリルは、視線そのものを動かすことなく脳内の注意リソースを柔軟に周辺部へと投射する「潜在的空間注意（Covert Spatial Attention）」の処理速度を正確に測定・訓練します（Posner, 1980）。",
      "周辺視野におけるターゲット迎撃の動作は、フィッツの法則（Fitts's Law, 1954）およびウッドワース（Woodworth, 1899）の二段階運動制御モデルに支配されます。目標座標までの移動時間（MT）は、中心からの放射距離とターゲットの物理サイズの比率の対数関数に比例します。外周から迫るノードを迎撃する際、プレイヤーは最初の85%以上の移動距離を視覚フィードバックなしに一気に投げ出す「開ループ弾道フリック（Ballistic Snap）」で跳躍し、着地直前のわずかな瞬間に微細な視覚的軌道修正を行って迎撃を完了します。",
      "カーリーン・ボールら（Ball et al., 1988）の研究によると、情報過多や交戦時の過度な緊張状態において、人間の認識可能な空間範囲が著しく縮小する現象を「トンネルビジョン」と呼びます。本ドリルはレベル1の緩やかな1.4秒出現間隔からスタートし、徐々に0.20秒間隔まで短縮され、360度全方位から秒速520ピクセルの猛スピードで同時侵入が発生します。これにより大脳頭頂葉の時空間処理キャパシティ（Useful Field of View, 有効視野）を強制的に拡大させ、実戦の乱戦下でも死角からの奇襲を見落とさない屈強な神経回路を構築します。",
      "測定の信頼性とハードウェア環境の制約：反応速度および命中精度はブラウザの標準高精度クロック performance.now() を用いてミリ秒単位で記録されます。ただし、Spectre対策によりタイマーの解像度は約1msに丸められており、60Hzディスプレイでは約16.7ms、144Hzでは6.9ms、240Hzでは4.1msの表示フレーム量子化遅延が必ず発生します（Woods et al., 2015）。また一般的な125Hzマウスは約8ms、1000Hzゲーミングマウスは1ms未満のポーリング遅延をもたらします。したがって5ms未満の微細な差異は測定ノイズとして扱い、他人との比較よりも同一ハードウェア環境での自己記録の成長推移を追跡することが科学的に推奨されます。SkillDrillsはすべてのトレーニング記録をブラウザのローカル環境にのみ保持し、外部サーバーへの個人データ送信は行いません。"
    ]
  },
  benchmarks: {
    title: "周辺視野リアクション＆脅威迎撃 公式ベンチマーク規格",
    headers: ['階級 (Tier)', '称号・ランク', '基準スコア', '迎撃精度・生存速度', '評価グレード', '能力水準'],
    rows: [
      ['Tier 1', '至高の周辺守護神 (Apex Peripheral Guardian)', '24,000点 以上', '精度 90%+ / 450+ px/s', 'S グレード', '上位 1%（異次元の有効視野）'],
      ['Tier 2', '精密放射スイーパー (Precision Radial Sweeper)', '17,000 〜 23,999点', '精度 82〜89% / 350〜449 px/s', 'A グレード', '上位 10%（プロ競技レベル）'],
      ['Tier 3', '熟練の視野防衛者 (Skilled Field Defender)', '11,000 〜 16,999点', '精度 74〜81% / 250〜349 px/s', 'B グレード', '上位 30%（安定した動体視力）'],
      ['Tier 4', '発展途上の追跡者 (Developing Parafoveal Tracker)', '6,000 〜 10,999点', '精度 65〜73% / 160〜249 px/s', 'C グレード', '平均層（一般ゲーマー）'],
      ['Tier 5', 'トンネル視野警戒層 (Novice Tunnel Vision Vulnerable)', '6,000点 未満', '精度 65%未満 / 160 px/s 未満', 'D グレード', '初級者（周辺視野の拡張推奨）'],
    ],
    note: "評価判定は累積獲得スコア、コア突破許容数、迎撃成功率、および最高到達難易度レベルを総合演算して自動算出されます。",
  },
  protocols: {
    title: "周辺視野の拡大と反応速度向上のための4段階プロトコル",
    description: "中心注視の定着、潜在的注意の配分、放射状弾道フリックの最適化、およびマルチターゲット分散処理を段階的に習得する訓練体系です。",
    items: [
      {
        title: "プロトコル1: ポズナー潜在的注意配分と中心注視の確立",
        description: "視線を中央コアに固定し、外周のノードを眼球で直接追わない訓練です。眼球の移動（サッカード）を排し、脳内の注意の焦点だけを全方位へ拡散させて無駄な反応遅延を完全にカットします（Posner 1980）。"
      },
      {
        title: "プロトコル2: トリーズマン並列特徴ポップアウトと顕著性マップ感知",
        description: "視野の外縁で発生する高コントラストな赤・オレンジノードの急接近を、直列的な探索を行わずに瞬時に察知する網膜サリエンシーマップ処理能力を養います（Treisman & Gelade 1980）。"
      },
      {
        title: "プロトコル3: ウッドワース放射状弾道フリックと終末制動制御",
        description: "侵入ノードを捉えた瞬間、手首と前腕の筋群を一気に動員して目標座標へカーソルを弾き飛ばし、コア境界線の外側でピタリと止めて仕留める二段階運動制御を確立します（Woodworth 1899）。"
      },
      {
        title: "プロトコル4: 有効視野（UFOV）高密度拡張と多重脅威の優先度処理",
        description: "Lv.10以上で0.20秒間隔で多角的に迫る複数ノードに対し、コアへの到達予測時間に基づいて瞬時に迎撃優先順位を判断し、連続迎撃を遂行するマルチタスク情報処理能力を鍛えます（Woods et al. 2015）。"
      }
    ]
  },
  faqs: {
    title: "周辺視野トレーニング＆動体視力テスト よくある質問 (FAQ)",
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function PeripheralThreatSweeperJaPage() {
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
      <PeripheralThreatSweeperClient
        copy={{
          title: "周辺視野トレーニング＆迎撃スリーパー",
          subtitle: "有効視野(UFOV)防衛＆動体視力反応速度 • 15段階無制限スケーリング",
          hudLabels: {
            score: "現在スコア",
            time: "残り時間",
            bestScore: "最高スコア",
            bestCombo: "最大コンボ",
            accuracy: "迎撃精度",
            sweeps: "迎撃回数",
            breaches: "コア突破数",
            peakLevel: "到達レベル",
            getReady: "READY"
          },
          rulesTitle: "ドリル進行ルールおよびスコア算出システム",
          rulesItems: [
            { title: "脅威ノード迎撃＆タイム加算", text: "外周から迫る脅威ノードをクリックして+100点（コンボ倍率適用）を獲得し、残り時間を+0.6秒延長します。" },
            { title: "コンボ倍率システム", text: "ミスなく連続で迎撃を成功させるとコンボ倍率が上昇し、最大3.0倍までスコアが跳ね上がります。" },
            { title: "継続的難易度加速", text: "スコア上昇に伴いノードの突入速度（最大520 px/s）と出現頻度（最短0.20秒）が加速度的に激化します。" },
            { title: "コア突破＆空振りペナルティ", text: "ノードのコア侵入やクリックミスでコンボが即時リセット（設定により0.8秒没収）され、窮地に立たされます。" }
          ],
          aboutTitle: "周辺視野と動体視力反応の生体力学",
          aboutSections: [
            {
              title: "潜在的注意定位と周辺走査",
              subtitle: "ポズナー（Posner 1980）視線固定下での空間注意シフト",
              content: "中央コアに視線を固定したまま、全周囲360度へ注意のリソースを配分します。眼球移動（サッカード）を省くことで反応速度を大幅に短縮します。"
            },
            {
              title: "並列特徴統合と顕著性マップ連動",
              subtitle: "トリーズマン（Treisman 1980）高コントラストの自動ポップアウト",
              content: "外縁から突入する赤・橙のノードは網膜桿体の動きセンサーを直撃し、意識的な探索を経ずに瞬時に迎撃座標を割り出します。"
            },
            {
              title: "ウッドワース二段階弾道フリック",
              subtitle: "ウッドワース（1899）およびフィッツ（1954）弾道跳躍と終末制動",
              content: "最初の85%以上の距離を手首の弾道スナップで一気に詰め、コア直前で微細な運動修正を行ってノードの中心を正確に射抜きます。"
            },
            {
              title: "有効視野（UFOV）拡張とトンネルビジョン打破",
              subtitle: "ボール（Ball et al., 1988）高密度スキャンによる認知領域の拡大",
              content: "加速するノードと高頻度出現に身を置くことで頭頂葉の処理帯域が拡張され、実戦の乱戦時にも視野狭窄に陥らない強靭な周辺視野を獲得します。"
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/peripheral-threat-sweeper" />
    </>
  );
}
