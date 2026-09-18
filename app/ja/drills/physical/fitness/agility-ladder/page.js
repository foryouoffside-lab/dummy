import MotorSequencingClient from '@/app/drills/physical/fitness/agility-ladder/MotorSequencingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JP / JA)
// Primary Intent: ラダートレーニング メニュー, ラダートレーニング 効果, アジリティ トレーニング, フットワーク 練習
// Japanese Context: サッカー/バスケ/テニスのフットワーク俊敏性＆FPSレレレ撃ち切り返しリズム
// High-Demand, Low-Competition Target Keywords:
//   - "ラダートレーニング メニュー" (High-intent sports ladder training query)
//   - "ラダートレーニング 効果" (Benefits and neuro-adaptation query)
//   - "アジリティ トレーニング" (Agility and footwork conditioning)
//   - "フットワーク 練習 メニュー" (Footwork agility exercise plan)
//   - "敏捷性 トレーニング" (Nimbleness & quickness training)
//   - "レレレ撃ち コツ" (Counter-strafing / AD strafe rhythm in FPS)
//   - "ステップ ワーク 練習" (Step work motor mechanics)
//   - "アジリティ ラダー 練習" (Agility ladder drills)
//   - "両側性運動協調" (Bilateral motor coordination)
//   - "反射神経 フットワーク" (Reflex footwork timing)
// ============================================================

export const metadata = {
  title: "ラダートレーニングメニュー＆アジリティ練習 – 無料フットワーク敏捷性ゲーム | SkillDrills",
  description: "無料オンラインのラダートレーニング・アジリティ練習ゲーム。スクロールするラダーの左右ステップをリズムよく正確に捉え、両側性運動プログラミング、フットワークの俊敏性、レレレ撃ちの切り返しリズムを科学的に鍛えます。",
  keywords: [
    "ラダートレーニング メニュー",
    "ラダートレーニング 効果",
    "アジリティ トレーニング",
    "フットワーク 練習 メニュー",
    "敏捷性 トレーニング",
    "レレレ撃ち コツ",
    "ステップ ワーク 練習",
    "アジリティ ラダー 練習",
    "両側性運動協調",
    "反射神経 フットワーク"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/fitness/agility-ladder',
    languages: getAlternateLanguages('/drills/physical/fitness/agility-ladder'),
  },
  openGraph: {
    title: "ラダートレーニングメニュー＆アジリティ練習 – 無料フットワーク敏捷性ゲーム | SkillDrills",
    description: "無料オンラインのラダートレーニング・アジリティ練習ゲーム。スクロールするラダーの左右ステップをリズムよく正確に捉え、両側性運動プログラミング、フットワークの俊敏性、レレレ撃ちの切り返しリズムを科学的に鍛えます。",
    url: 'https://skilldrills.online/ja/drills/physical/fitness/agility-ladder',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ラダートレーニングメニュー＆アジリティ練習 – 無料フットワーク敏捷性ゲーム | SkillDrills",
    description: "無料オンラインのラダートレーニング・アジリティ練習ゲーム。スクロールするラダーの左右ステップをリズムよく正確に捉え、両側性運動プログラミング、フットワークの俊敏性、レレレ撃ちの切り返しリズムを科学的に鍛えます。",
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
      "name": "身体機能トレーニング",
      "item": "https://skilldrills.online/ja/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "フィットネス＆敏捷性",
      "item": "https://skilldrills.online/ja/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "ラダートレーニング＆アジリティ練習",
      "item": "https://skilldrills.online/ja/drills/physical/fitness/agility-ladder"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ラダートレーニング＆アジリティ練習ドリル",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "スクロールするラダーの左右ステップを交互に正確に捉え、両側性運動プログラミングとフットワークリズムを鍛える無料オンラインドリル。",
  "url": "https://skilldrills.online/ja/drills/physical/fitness/agility-ladder",
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
  "name": "ラダートレーニング Web アプリケーション",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas およびポインターロックをサポートする最新ブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/physical/fitness/agility-ladder",
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "アジリティラダー・運動シークエンシングゲーム",
  "url": "https://skilldrills.online/ja/drills/physical/fitness/agility-ladder",
  "description": "下降するラダーステップを左右交互に高速通過してフットワーク敏捷性と反射神経を鍛える無料ブラウザアクション。",
  "genre": [
    "Fitness Game",
    "Coordination",
    "Rhythm Game",
    "Agility"
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
      "name": "ラダートレーニング（アジリティ練習）を画面上のマウス操作で行うことにどんな運動効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "大脳皮質の運動野、大脳基底核、小脳からなる中枢神経運動回路は、手先と足先の筋肉制御で同じ神経タイミング機構を共有しています。画面上を一定のメトロノームリズムで下降するラダーの左右ステップを正確にインターセプトする訓練は、時間的リズム同期能力（Temporal Cadence）を高め、実際のフィールドでのフットワークの俊敏性やステップ切り替え能力を向上させます。"
      }
    },
    {
      "@type": "Question",
      "name": "カール・ラシュレー（Karl Lashley, 1951）の直列運動秩序化理論と運動チャンキングとは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "カール・ラシュレーは、超高速の連続運動では各動作ごとに感覚フィードバックを待って反応することは神経伝達時間的に不可能であり、一連の動作が「運動チャンク（Motor Chunk）」として事前に一括プログラムされて発火することを実証しました。ラダーの4ステップ（左-右-左-右）を単一の運動塊として脳に事前構築することで、フィードバック遅延に邪魔されずに高速クリアが可能になります。"
      }
    },
    {
      "@type": "Question",
      "name": "リチャード・シュミット（Schmidt, 1975）の一般化運動プログラム（GMP）における「相対的タイミング不変性」とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "一般化運動プログラム（GMP）理論によると、熟練した動作では全体のスピードが150 px/sから750 px/sへと5倍加速しても、各ステップを踏む時間比率（1:1:1:1）は一定に保たれます。慌ててリズムを崩すのではなく、運動全体の出力パラメータのみを均等に増幅させて規則正しいリズム構造を維持することが上達の絶対条件です。"
      }
    },
    {
      "@type": "Question",
      "name": "APEXやVALORANTの「レレレ撃ち」（切り返しストレイフ）やエイムの安定性にどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPSの実戦におけるレレレ撃ち（ADキーの高速切り返し）やピーク動作では、横移動中の惰性を打ち消す正確なブレーキ制御と左右のリズム感覚が不可欠です。本ドリルで下降するステップを左右交互に鋭く捉える運動は、撃ち合い中の無駄な力みや手首のブレを抑制し、クロスヘアを一定のヘッドラインに固定するメトロノーム感覚を養います。"
      }
    },
    {
      "@type": "Question",
      "name": "スコア獲得によるレベル進行と、スクロール速度・ステップ判定（ヒットボックス）の変化は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "250点獲得ごとにレベルが1段階上昇し、最大レベル15まで難易度が進行します。ラダーの下降速度は初期の150 px/sから最高750 px/sまで加速し、ステップの有効判定幅は18pxから10pxへと段階的に縮小します。レベル4以上では左右の配置オフセットがランダムに変化し、予測迎撃の難易度が極限まで跳ね上がります。"
      }
    },
    {
      "@type": "Question",
      "name": "ステップを踏み外したりラダーを見送った場合、減点や制限時間の減少はありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "減点や45秒の制限時間減少ペナルティはありません。ステップの踏み外しや見送りが発生するとコンボ倍率のみが1.0xにリセットされ、画面に赤い視覚フラッシュが表示されます。失敗を恐れずに最高速度での高速フリックに挑戦できるよう設計されています。"
      }
    },
    {
      "@type": "Question",
      "name": "ラダートレーニングでの推奨マウス感度（DPI）と最適な持ち方（グリップ）は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "左右約80pxの幅を機敏に往復するため、腕全体を大きく動かすよりも指先と手首のスナップで微調整が効く「つかみ持ち（Claw Grip）」または「つまみ持ち（Fingertip Grip）」が最も適しています。感度はマウスパッド中央で指先の軽い弾き動作だけで左右80pxをカバーできる中感度（ミドルセンシ）を推奨します。"
      }
    },
    {
      "@type": "Question",
      "name": "ラダーが高速落下する最難関レベルで、リズムを崩さないための視線制御のコツは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "各ステップを目玉で1つずつ追うと眼球跳躍運動（サッカード）による30〜50msの知覚遅延が発生します。視線はラダーが通過する画面中央の垂直軸線上に柔らかく固定（脱焦点注視）し、周辺視野で左右のステップの下降を俯瞰して手首を機械的にリズム振動させるのが最良の戦略です。"
      }
    },
    {
      "@type": "Question",
      "name": "ゲーミングモニターの高リフレッシュレート（144Hz/240Hz）はインターセプト精度に影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ラダーが750 px/sで下降する際、一般的な60Hzモニターではフレームごとに約12.5pxの表示飛び（テレポート現象）が生じ、10px幅の微細ステップをすり抜けやすくなります。一方、144Hz（5.2px）や240Hz（3.1px）の高周波ディスプレイでは滑らかな軌跡が描かれ、フィッツの法則（Fitts 1954）に基づく正確なインターセプトが可能になります。"
      }
    },
    {
      "@type": "Question",
      "name": "練習中にマウス操作データや個人情報が外部サーバーへ送信されることはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ、一切ありません。SkillDrillsの全ての計算、フレーム補間、コンボ処理はブラウザのperformance.now()を用いて100%クライアント側で完結しています。ベストスコア等の記録はお使いのブラウザのlocalStorageにのみ安全に保存され、外部サーバーへの通信やデータ収集は存在しません。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "ラダートレーニング＆アジリティ練習 4段階実戦プロトコル",
  "description": "スクロールするラダーステップを左右交互に正確にクリアし、両側性運動シークエンシングとフットワーク敏捷性を高める体系的方法。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "中央垂直軸への視線固定とポインターロック",
      "text": "スタートボタンを押してポインターロックを有効化し、視線を中央軸線上に置いて最初のラダーの下降を待ち受けます。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/agility-ladder#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "最上段1番ステップの迎撃と左右切り返し",
      "text": "最上段左側のステップ1へシャープにマウスをフリックして通過させ、即座に右側ステップ2への切り返しを開始します。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/agility-ladder#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "4ステップ一括クリアとラダー通過",
      "text": "ステップ3（左）、ステップ4（右）まで一度の淀みもない単一の運動リズムチャンクで駆け抜け、グリーンの完了チェックを点灯させます。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/agility-ladder#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "3.0倍コンボ維持と750 px/s極限加速",
      "text": "連続クリアでコンボ倍率を3.0倍まで高め、最高速度750 px/sのレベル15極限ゾーンを45秒間生き抜きます。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/agility-ladder#step-4"
    }
  ]
};

const ladderGuide = {
  heading: "ラダートレーニング及び直列運動シークエンシング生体力学ガイド",
  subtitle: "ラシュレー直列運動秩序化理論、シュミット一般化運動プログラム（GMP）、フィッツ迎撃モデルに基づく敏捷性論",
  intro: [
    "ラダートレーニング（Agility Ladder Drill）は、陸上競技、サッカー、バスケットボール、ボクシングなど俊敏性が求められる多くの一流スポーツでフットワークの敏捷性を高めるために広く採用されている基本ドリルです。本デジタル版では、地面のラダーを画面上の垂直スクロールマトリックスとして再構築し、下降する4段ステップを左右交互に高速インターセプトする両側性運動シークエンシング（Bilateral Motor Sequencing）神経回路を科学的に刺激します。",
    "認知神経科学の先駆者カール・ラシュレー（Karl Lashley, 1951）の「行動における直列順序の問題（The Problem of Serial Order in Behavior）」によると、高速で連続する運動はステップごとの感覚フィードバックを介在させていては間に合いません。運動皮質はラダーの4ステップ（左-右-左-右）を個別の運動ではなく単一の統合された「下位運動チャンク（Sub-Movement Chunk）」として事前プログラムし、一気に発火させることで反応遅延を克服します。",
    "リチャード・シュミット（Richard A. Schmidt, 1975）の「一般化運動プログラム（GMP）」は、優れたアスリートが速度の変化に晒されても動作内の相対的タイミング不変性（Invariant Relative Timing）を保つことを示しました。ラダーのスクロール速度が150 px/sから750 px/sへと跳ね上がっても、左右の往復比率（1:1:1:1）を乱さず正確なケイデンス（歩調・リズム）を刻み続ける能力こそが、本物の敏捷性と切り返し精度の証明です。",
    "測定精度およびハードウェアに関する注記: 本ドリルはブラウザのperformance.now()高解像度タイマーを利用し、クライアント端末内でミリ秒単位で計測されます。モニターのリフレッシュレート（60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms）やマウスのポーリングレート（125Hz vs 1000Hz）により物理的な遅延差が生じるため、5ms未満の微細な差は測定ノイズとしてご理解ください。すべてのスコアはブラウザ内にのみ安全に保持されます。"
  ],
  benchmarks: {
    title: "ラダートレーニング＆両側性運動シークエンシング 5段階標準ベンチマーク",
    headers: ["階層・ランク", "称号 (Rank Title)", "基準スコア", "到達レベル", "最高スクロール速度", "神経生体力学プロファイル"],
    rows: [
      ["Tier 1: 頂点ラダーマスター", "Apex Ladder Master", "17,000点以上", "Level 12 – 15", "600 – 750 px/s", "上位0.1%水準の完璧なラシュレー4ステップチャンキング及び750 px/s極限速度下での無欠損メトロノームリズム (Lashley 1951; Schmidt 1975)"],
      ["Tier 2: エリートスプリンター", "Elite Rhythm Sprinter", "13,000 – 16,999点", "Level 9 – 11", "480 – 599 px/s", "上位3%水準の卓越した両側性切り返し速度、10〜12px縮小ステップにおける精密なフィッツ迎撃減速軌道の完遂"],
      ["Tier 3: 熟練ステップシークエンサー", "Proficient Step Sequencer", "9,500 – 12,999点", "Level 6 – 8", "350 – 479 px/s", "競技ゲーマー及びアスリート標準、優れた左右往復フットワークリズムと安定した手首のスナップ制御"],
      ["Tier 4: 中級ケイデンス学習者", "Intermediate Cadence Learner", "6,000 – 9,499点", "Level 3 – 5", "230 – 349 px/s", "一般的な成人の平均水準、速度350 px/s超過時に感覚フィードバックの遅延によりステップ踏み外しが頻発"],
      ["Tier 5: 初級ラダークライマー", "Novice Rung Climber", "6,000点未満", "Level 1 – 2", "< 230 px/s", "ステップごとの視覚追従によるリズム断絶、中心軸固定とチャンキング動作の事前プログラミング練習を推奨"]
    ],
    note: "直列運動秩序化理論(Lashley 1951)、一般化運動プログラム(Schmidt 1975)、フィッツ迎撃法則(Fitts 1954)に基づく統合評価指標です。"
  },
  techniques: {
    title: "ラダートレーニング敏捷性＆運動シークエンシング実戦プロトコル",
    items: [
      {
        name: "ラシュレー4ステップ一括運動プログラミング (Lashley Serial Chunking)",
        desc: "ラダーの4つのステップを1つずつ見てから反応しようとしないでください。「左-右-左-右」の4連続スイングをひと続きの動作としてあらかじめ脳内でパッケージ化し、最初のステップ接触と同時に一連の軌道として一気に放出しましょう。",
        tips: "ステップ間で毎回視覚確認のために手を止めず、単一のジグザグ曲線を描くようにクロスヘアを流れるように動かしてください。"
      },
      {
        name: "シュミット相対的リズム不変性制御 (GMP Invariant Rhythm)",
        desc: "ラダーのスクロール速度が加速しても焦って不規則に手をバタつかせないでください。各ステップ間を刻む時間比率（1:1:1:1）は一定に保ち、手首の全体的な振り抜きパワーのみを均等に引き上げましょう。",
        tips: "心の中で「イチ・ニ・サン・シ」と一定のメトロノームカウントを刻み、その拍子に合わせてスイングの勢いだけを増幅させてください。"
      },
      {
        name: "フィッツ下降オフセット予測迎撃カーブ (Moving Target Interception)",
        desc: "ラダーは真下へスクロールしているため、ステップの現在の位置を狙うとクロスヘアが上空を切って空振りします。移動時間中にステップが下降する予測到達点を見越し、わずかに下向きの斜め角度で進入してください。",
        tips: "ステップの中心よりも2〜3px下側のフチを狙って飛び込むと、スクロールの下降によって自然にジャスト中央でヒットします。"
      },
      {
        name: "750 px/s超高速域での中心軸脱焦点ペーシング (Metronomic Fixation)",
        desc: "レベル10を超えて550 px/sを上回ると、目でカーソルやステップを追尾した瞬間に知覚処理がパンクします。視線は画面中央の垂直軸線上に柔らかく据えてください。",
        tips: "左右のステップの点滅を周辺視野でぼんやり感じ取りながら、手首の周期的な左右振動運動だけでラダーをくぐり抜けさせましょう。"
      }
    ]
  },
  steps: [
    "姿勢を整え、クロスヘアを中央の垂直軸線上に配置します。",
    "最初のラダーが下降してきたら、最上段の1番ステップ（左）へ鋭くスナップします。",
    "2番（右）、3番（左）、4番（右）ステップを単一のリズムチャンクで素早くくぐり抜けます。",
    "連続クリアで3.0倍コンボを維持し、45秒間でハイスコア記録を更新します。"
  ],
  audience: "サッカー、バスケ、テニス、ボクシングのフットワーク俊敏性を強化したいアスリート、及びVALORANTやAPEXでレレレ撃ちや安定したヘッドライン制御を極めたいFPSプレイヤー。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('lashley1951', 'schmidt1975', 'fitts1954', 'woodworth1899', 'woods2015')
};

export default function AgilityLadderPageJa() {
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
      <MotorSequencingClient
        copy={{
          title: "ラダートレーニング＆アジリティ練習",
          subtitle: "両側性運動シークエンシング＆フットワーク敏捷性ドリル • 15段階",
          rulesTitle: "ラダートレーニングのルールと採点システム",
          rules: [
            { title: "4段ステップの順次クリア", text: "スクロールするラダーのステップを左右交互の順序（1→2→3→4）で正確に通過します。" },
            { title: "コンボ倍率の蓄積", text: "ラダーを連続でノーミスクリアするとコンボ倍率が最大3.0倍まで上昇し、高得点を獲得できます。" },
            { title: "速度加速と判定縮小", text: "250点獲得ごとにレベルが上昇し、ラダーのスクロール速度が加速、ステップ幅が狭くなります。" },
            { title: "ミス時のコンボリセット", text: "ステップを見送るか踏み外すとコンボ倍率が1.0倍にリセットされますが、時間は減少しません。" }
          ],
          aboutTitle: "ラダートレーニングについて",
          aboutHeading: "両側性運動シークエンシングとリズム制御の神経生体力学",
          aboutText: "ラダートレーニング（Motor Sequencing）は、敏捷性、両側性協調、そして規則的な運動パターンの実行能力を鍛える科学的ドリルです。カール・ラシュレー（1951）の直列順序化原理とリチャード・シュミット（1975）の一般化運動プログラム（GMP）に基づいて開発され、150 px/sから750 px/sへと加速するスクロール環境下で完全な時間的リズム不変性を維持するよう神経系を適応させます。APEXやVALORANTでのレレレ撃ちやフットワークの切り返し精度を劇的に向上させます。"
        }}
      />
      <DrillGuide guide={ladderGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/agility-ladder"
          locale="ja"
        />
      </div>
    </>
  );
}
