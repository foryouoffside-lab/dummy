import SpatialShiftPursuitClient from '@/app/drills/visual-tracking/spatial-shift-pursuit/SpatialShiftPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// JAPANESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "視界ブレ エイム 練習" (Screen shake aim practice) / "空間シフト 追従"
// Secondary:    "空間認知 動体視力 トレーニング", "座標系 再編 視線", "カメラ移動 エイム 安定化", "頭頂葉 空間リマッピング"
// LSI / Domain:  "リファレンスフレーム 変換", "網膜座標系 頭部中心座標系", "急激な視野ズレ 克服",
//               "弾道的サッケード 再捕捉", "後頭頂皮質 PPC", "スムーズパシュート 再同期"
// Authentic Domain Terms: 空間シフト追従（Spatial Shift Pursuit）, 座標系変換（Coordinate Transformation）, 網膜中心座標（Retinotopic Coordinates）, 頭部中心・環境中心座標（Craniotopic/Allocentric Coordinates）, 後頭頂皮質（Posterior Parietal Cortex / PPC）, サッケード再捕捉（Saccadic Re-acquisition）
// ============================================================

export const metadata = {
  title: "空間シフト追従トレーニング・視野座標系適応 – 視界ブレ抑制 | SkillDrills",
  description: "空間参照系（リファレンスフレーム）が突発的に回転・シフトする過酷な視覚環境で、ターゲットをロストせずに追従し続ける無料アイトラッキング練習。後頭頂皮質の座標変換能と視覚適応力を強化。登録不要。",
  keywords: [
    "視界ブレ エイム 練習",
    "空間シフト 追従",
    "空間認知 動体視力 トレーニング",
    "座標系 再編 視線",
    "カメラ移動 エイム 安定化",
    "頭頂葉 空間リマッピング",
    "リファレンスフレーム 変換",
    "網膜座標系 頭部中心座標系",
    "急激な視野ズレ 克服",
    "弾道的サッケード 再捕捉",
    "後頭頂皮質 視覚適応",
    "空間座標リマッピング 練習"
  ],
  openGraph: {
    title: "空間シフト追従トレーニング・視野座標系適応 – 視界ブレ抑制 | SkillDrills",
    description: "空間参照系が急変する動的環境でターゲットを再捕捉し続ける無料オンライン視覚適応力トレーニング。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual-tracking/spatial-shift-pursuit",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "空間シフト追従トレーニング・視野座標系適応 – 視界ブレ抑制 | SkillDrills",
    description: "視野ズレ・カメラ回転・爆風エフェクト下でも標的を中心窩で捉え続けるための適応的アイトラッキング練習。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/spatial-shift-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/spatial-shift-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "視覚追従・アイトラッキング", "item": "https://skilldrills.online/ja/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "空間シフト追従トレーニング・視野座標系適応テスト", "item": "https://skilldrills.online/ja/drills/visual-tracking/spatial-shift-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "空間シフト追従トレーニング・視野座標系適応テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "視野全体の参照枠（リファレンスフレーム）が突発的にオフセットまたは回転する条件下で、後頭頂皮質（PPC）の空間再マッピングを駆動して標的を即座に再捕捉するブラウザビジョントレーナー。",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/spatial-shift-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/ja" },
  "inLanguage": "ja",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "空間シフトパシュートトラッカー (SkillDrills Spatial Shift Pursuit)",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応ブラウザ（Chrome, Edge, Firefox, Safari）",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/ja/drills/visual-tracking/spatial-shift-pursuit",
  "inLanguage": "ja",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "空間シフト追従エイムトレーニング (Spatial Shift Pursuit)",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/spatial-shift-pursuit",
  "description": "画面揺れや激しい視点移動の中でも標的をロストせず、弾道サッケードと即座のスムーズ追従を結合させるFPS向け適応型エイムゲーム。",
  "genre": ["Aim Trainer", "Eye Tracking", "Vision Training", "Esports Drill"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "空間シフト追従および視野座標系リマッピングの訓練手順",
  "description": "参照枠の突発的シフトに対して後頭頂皮質の座標変換を起動し、瞬時に追従を回復する4段階のプロトコル。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "基本ターゲットの滑動性追従",
      "text": "静止した基準座標系の中で滑らかに動くターゲットを中心窩でロックし、通常の円滑追従（Smooth Pursuit）に入ります。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "空間参照系シフト発生時の視覚検知",
      "text": "座標枠全体が瞬間的に移動・回転した瞬間、網膜上の急激な像ズレを網膜スリップ信号として即座に知覚します。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "弾道サッケードによる瞬時再センタリング",
      "text": "ズレた目標の新座標へ向けて最短時間の修正サッケード（跳躍眼球運動）を放ち、目標を中心窩へ引き戻します。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "新座標系でのスムーズパシュート即時再開",
      "text": "着地と同時に新座標系における標的の速度ベクトルと眼球速度を同期させ、追従利得1.0をミリ秒単位で再確立します。"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "空間シフト追従（Spatial Shift Pursuit）とは何ですか？通常の追従とどう違いますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "通常の追従訓練は固定された静止空間内で標的を追いますが、空間シフト追従では標的が動くだけでなく、標的が属する空間座標系（リファレンスフレーム）自体が突発的にオフセットしたり回転したりします。網膜上の像が根底から覆るため、大脳皮質後頭頂野による瞬時の座標系リマッピングが必須となります（Kahlon & Lisberger, 1996）。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲームでの「画面揺れ（スクリーンシェイク）」や激しい視点変更にどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "爆風による被弾ブレ、急激な視点フリック後の反動、グラップルやスライディング中の激しいカメラ回転下では、敵の相対位置が劇的に変化します。本ドリルで座標系シフトへの適応力を鍛えることで、画面が激しく揺れても敵の位置を見失わず、一瞬でクロスヘアを吸い付かせる視覚回復力が手に入ります。"
      }
    },
    {
      "@type": "Question",
      "name": "座標変換（Coordinate Transformation）とは脳内で何が行われているのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "目に入った光はまず網膜上の位置（網膜中心座標：Retinotopic Frame）として処理されますが、頭や視界が動くと網膜座標は無効化されます。後頭頂皮質（PPC）は眼球位置信号と視覚入力を統合し、頭部中心座標（Craniotopic）や世界中心座標（Allocentric）へと超高速で再計算（リマッピング）を行います（Findlay & Gilchrist, 1999）。"
      }
    },
    {
      "@type": "Question",
      "name": "シフト発生直後に視線が迷子になる（見当識障害）のを防ぐには？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "シフトが起きた瞬間にパニックを起こして周囲を無作為に見渡すのではなく、視野全体の『背景基準線』の変化からシフトのベクトル（方向と変位量）を直感的に把握し、標的の新位置へ最短の弾道サッケードを一閃させることが極意です。"
      }
    },
    {
      "@type": "Question",
      "name": "サッケードで着地した直後、なぜ追従がカクついてしまうのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "サッケードは位置のズレを埋める運動であり、速度情報を直接補正するわけではありません。着地直後に標的の新しい速度ベクトルに外眼筋を加速同期（Post-saccadic Acceleration）させないと、着地後すぐに標的が視界から逃げてしまうためです（Krauzlis, 2004）。"
      }
    },
    {
      "@type": "Question",
      "name": "モータースポーツや球技など現実スポーツでも空間シフトの適応力は使われますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "極めて頻繁に使われます。レーシングカーで縁石に乗り上げて車体が激しく跳ねた瞬間や、サッカーで相手選手と激しく接触しながらボールをコントロールする際、激動する視界の中で目標物を中心窩に固定し続けるためにこの神経系がフル稼働しています。"
      }
    },
    {
      "@type": "Question",
      "name": "難易度（スピードやシフト頻度）を上げるときのステップは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "まずは標準速度（1.0x）でシフト発生時のリカバリー時間（目標へ視線が戻るまでのラグ）を250ms以下に抑えることを目指します。慣れてきたら速度を1.5x〜2.5xへ上げ、座標回転が加わった高難度モードへ挑戦してください。"
      }
    },
    {
      "@type": "Question",
      "name": "モニターのリフレッシュレートは空間シフトの検知にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "144Hzや240Hzの高リフレッシュレート環境では、座標枠がシフトした瞬間の過渡的なフレームブレが最小化され、シフト後の新座標が即座にクッキリと表示されます。これにより脳の座標リマッピング時間が約30〜50ms短縮されます（Woods et al., 2015）。"
      }
    },
    {
      "@type": "Question",
      "name": "1日のトレーニング量と眼精疲労対策のポイントは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "空間認知とサッケード・パシュート統合は脳疲労が激しいため、1回60秒を3〜5セッション（計3〜5分）で十分です。終了後は目を温めるか、遠くの景色をぼんやり眺めて視覚皮質を休ませてください。"
      }
    },
    {
      "@type": "Question",
      "name": "長期間のトレーニングで脳の空間リマッピング回路は強化されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。後頭頂皮質と前頭眼野のシナプス可塑性（Plasticity）により、繰り返しの訓練で座標変換に必要な神経計算ステップが自動化され、どんなに視界が激しく揺れても標的を瞬時に中心窩へ吸着できるようになります。"
      }
    }
  ]
};

const guideProps = {
  heading: "空間シフト追従トレーニングの科学的根拠と視野座標適応ガイド",
  intro: [
    "生物の視覚システムは、自己の身体や頭部が静止していることのみを前提にして作られているわけではありません。激しい運動、疾走、転倒、あるいは対戦ゲームにおける激しいカメラワークや被弾ショックなど、自己を取り巻く視野の基準枠（Reference Frame）そのものが急激に変位する状況下でも、生存に関わる重要対象を中心窩（Fovea）に捕捉し続けなければなりません。この過酷な視覚課題をクリアする脳の能力が「空間シフト適応的追従（Spatial Shift Adaptive Pursuit）」です。",
    "視覚神経科学の権威フィンドレイ（Findlay & Gilchrist, 1999）およびカーロン＆リスバーガー（Kahlon & Lisberger, 1996）の研究によれば、目に入った視覚像は最初、網膜の中心からの相対位置である「網膜中心座標系（Retinotopic Frame）」にマッピングされます。しかし、空間全体が突発的にズレるとこの座標は完全に破綻します。後頭頂皮質（Posterior Parietal Cortex: PPC）は、眼球位置情報と前庭感覚（頭部の傾き）を統合し、網膜座標を即座に「頭部中心座標（Craniotopic）」および「空間・環境中心座標（Allocentric）」へと瞬時に変換（Coordinate Transformation）します。",
    "この座標リマッピングが行われると、脳は直ちに2段階の運動命令を発行します。第1段階は、ズレてしまった標的の新座標へと視線を最短時間（約20〜40msの飛行時間）で跳躍させる「弾道的サッケード（Ballistic Saccade）」です。そして第2段階は、着地した瞬間に新座標系における標的の速度ベクトルを即座に学習・同期させる「サッケード後スムーズパシュート加速（Post-saccadic Pursuit Acceleration）」です（Krauzlis, 2004; Rashbass, 1961）。この連携が1ミリ秒でも乱れると、視線は標的の遥か後方に置き去りにされます。",
    "本ドリル（Spatial Shift Pursuit）は、標的の追従中に座標枠全体を予告なく跳躍・変位させ、後頭頂皮質と前頭眼野の座標変換ネットワークに極限の負荷をかけます。激しい画面揺れや混沌とした乱戦下でも一瞬の迷いなく標的を再ロックする、真のプロフェッショナルな視覚適応力を手に入れてください。"
  ],
  benchmarks: {
    title: "空間シフト適応力および座標再編リカバリー標準ベンチマーク (Spatial Shift Recovery)",
    headers: ["習熟度クラス", "シフト後 追従復帰時間 (ms)", "空間再捕捉精度 (Accuracy %)", "サッケード着地後 安定度", "適応的空間プロファイル"],
    rows: [
      ["エリート (Elite)", "220ms 未満 (電光石火の復帰)", "95% 以上", "96% 以上 (着地即時ロック)", "完璧な後頭頂葉リマッピングと無遅延再同期"],
      ["マスター (Master)", "220ms ~ 280ms", "88% ~ 94%", "90% ~ 95%", "極めて高い適応力、画面揺れへの即時耐性"],
      ["ダイヤモンド (Diamond)", "281ms ~ 360ms", "78% ~ 87%", "80% ~ 89%", "標準的リカバリー、激しい回転シフト時に微遅延"],
      ["ゴールド (Gold)", "361ms ~ 450ms", "65% ~ 77%", "68% ~ 79%", "シフト直後に見当識の迷い、追従再開に遅れ"],
      ["ビギナー (Beginner)", "450ms 超過", "65% 未満", "68% 未満", "空間座標崩壊、標的を完全にロスト"]
    ],
    note: "※ 本基準は1080p解像度、標準速度1.0x〜1.5x、ランダム空間シフトモードにおける実測データに基づきます。シフト発生から標的中心窩捕捉が再確立されるまでのレイテンシを評価しています。"
  },
  techniques: {
    title: "空間シフトと視野ブレを制圧する4大適応技術",
    items: [
      {
        name: "後頭頂皮質の座標系瞬間リマッピング (PPC Coordinate Remapping)",
        desc: "画面がズレた瞬間、ターゲットそのものを目で探すのではなく、画面全体のシフト方向と距離を一瞬で知覚し、頭の中で座標軸を平行移動させます。視覚皮質ではなく頭頂葉の空間認識を起動することがカギです。",
        tips: "「目標がどこへ行ったか」ではなく、「空間全体が右にどれだけズレたか」を視野全体で直感してください。"
      },
      {
        name: "弾道的再センタリングサッケード (Ballistic Re-Centering)",
        desc: "新座標を認識したら、躊躇なく一息に視線を新位置へ跳ばします。途中で視線を修正しようとすると二段サッケードになり、回復時間が100ms以上遅延します。",
        tips: "迷わず一撃で新位置のスナップを打つイメージで、視線の跳躍を一閃させてください。"
      },
      {
        name: "サッケード直後の追従ハンドシェイク (Post-Saccadic Gain Handshake)",
        desc: "視線が標的に着地した瞬間、視覚フィードバックを待たずに新座標系での標的速度に合わせて外眼筋を加速させます。位置の修正と速度の同期をシームレスに結合させます。",
        tips: "着地した瞬間にピタッと止まらず、着地と同時に目標の進む方向へ視線をスライドさせましょう。"
      },
      {
        name: "視野回転に対する見当識維持 (Rotational Desorientation Shield)",
        desc: "座標系が回転を伴う場合、上下左右の認知が一瞬狂いやすくなります。画面の中心軸をアンカー（錨）として意識しておくことで、回転シフト後も即座に方向感覚を復元できます。",
        tips: "視界の中心点に意識の芯を残しておくと、空間が回転しても身体の平衡感覚がブレなくなります。"
      }
    ]
  },
  steps: [
    "準備と視認性確保: ディスプレイから約50〜70cmの距離を保ち、頭部を真っ直ぐ固定して視野の中心を捉えます。",
    "基準追従の開始: [開始] ボタンを押し、まずは静止空間内で動くターゲットを中心に視線を合わせます。",
    "空間シフトへの即応: 突然枠組みがジャンプ・回転したら、直ちに頭頂葉で新座標を計算し、弾道サッケードで再捕捉します。",
    "60秒間の極限集中: 連続して発生する突発的空間シフトに対し、一度も標的を見失わないよう食らいつき続けます。",
    "回復タイムと精度の確認: セッション終了後、シフトごとの平均リカバリー時間（ms）と追従精度を確認し、空間適応力の向上度を記録します。"
  ],
  audience: "Apex、VALORANT、Fortniteなどで被弾ブレや急激なカメラ回転下でも敵を見失わないエイム力を鍛えたいゲーマー、格闘技や球技で激しい体勢変化の中でもボールや相手を捉え続けたいアスリート、空間認識と動体適応力を高めたいすべての人。",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('krauzlis2004', 'findlay1999', 'robinson1965', 'rashbass1961', 'kahlon1996', 'woods2015'),
  related: [
    { href: "/ja/drills/visual-tracking/constant-slow-pursuit", label: "低速追従眼球運動トレーニング (Constant Slow)" },
    { href: "/ja/drills/visual-tracking/directional-chaos-pursuit", label: "カオス方向追従テスト (Directional Chaos)" },
    { href: "/ja/drills/visual-tracking/dynamic-evasion-pursuit", label: "リアクティブ追従訓練 (Dynamic Evasion)" },
    { href: "/ja/drills/visual-tracking/ghosting-suppress-pursuit", label: "残像抑制固視トレーニング (Ghosting Suppress)" },
    { href: "/ja/drills/visual-tracking/infinity-pursuit", label: "8の字眼球運動トレーニング (Infinity)" },
    { href: "/ja/drills/visual-tracking/predictive-pursuit", label: "遮蔽軌道予測テスト (Predictive Pursuit)" }
  ]
};

export default function JapaneseSpatialShiftPursuitPage() {
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

      <SpatialShiftPursuitClient
        copy={{
          title: "空間シフト追従トレーニング・視野座標系適応テスト：視界ブレ抑制と空間リマッピング",
          subtitle: "空間参照枠の急激な変位・回転に後頭頂皮質を同期させる適応型スムーズパシュート",
          description: "空間参照系（リファレンスフレーム）が突発的に回転・シフトする動的視覚環境で、ターゲットをロストせずに追従し続ける無料アイトラッキング練習。網膜座標系から空間座標系への超高速リマッピングを駆動し、FPSの画面揺れや激しい視点移動下でのエイム安定性を極限まで高めます。登録不要・ブラウザで即座に測定可能。"
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/spatial-shift-pursuit" />
      </div>
    </>
  );
}
