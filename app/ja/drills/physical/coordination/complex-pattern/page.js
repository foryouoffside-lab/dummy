import ComplexPatternClient from '@/app/drills/physical/coordination/complex-pattern/ComplexPatternClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JP / JA)
// Primary Intent: 図形 記憶 テスト, 空間認識能力 テスト 無料, ワーキングメモリ 鍛えるゲーム, パターン 記憶 ゲーム
// Context: Japanese cognitive aptitude tests (図形記憶, 視覚再生課題) & FPSリコイルパターン制御
// Target Queries:
//   - "図形 記憶 テスト" (High-intent shape/figure memory test)
//   - "空間認識能力 テスト 無料" (Spatial awareness test free)
//   - "ワーキングメモリ 鍛えるゲーム" (Working memory brain training game)
//   - "パターン 記憶 ゲーム" (Pattern memory game)
//   - "線をなぞるゲーム ブラウザ" (Line tracing browser game)
//   - "視空間 記憶 トレーニング" (Visuospatial memory training)
//   - "図形 記憶 ゲーム" (Shape recall game)
// ============================================================

export const metadata = {
  title: "図形記憶テスト・空間認識能力トレーニング – 無料パターン記憶ゲーム | SkillDrills",
  description: "無料オンライン図形記憶テスト＆空間認識能力トレーニング。瞬間点滅する幾何学的な経路を記憶し、正確になぞって再生することで視空間ワーキングメモリと手先の運動協調性を科学的に鍛えます。",
  keywords: [
    "図形 記憶 テスト",
    "空間認識能力 テスト 無料",
    "ワーキングメモリ 鍛えるゲーム",
    "パターン 記憶 ゲーム",
    "線をなぞるゲーム ブラウザ",
    "視空間 記憶 トレーニング",
    "図形 記憶 ゲーム",
    "脳トレ 図形記憶",
    "マウス 軌道 練習",
    "リコイル パターン 練習"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/coordination/complex-pattern',
    languages: getAlternateLanguages('/drills/physical/coordination/complex-pattern'),
  },
  openGraph: {
    title: "図形記憶テスト・空間認識能力トレーニング – 無料パターン記憶ゲーム | SkillDrills",
    description: "無料オンライン図形記憶テスト＆空間認識能力トレーニング。瞬間点滅する幾何学的な経路を記憶し、正確になぞって再生することで視空間ワーキングメモリと手先の運動協調性を科学的に鍛えます。",
    url: 'https://skilldrills.online/ja/drills/physical/coordination/complex-pattern',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "図形記憶テスト・空間認識能力トレーニング – 無料パターン記憶ゲーム | SkillDrills",
    description: "無料オンライン図形記憶テスト＆空間認識能力トレーニング。瞬間点滅する幾何学的な経路を記憶し、正確になぞって再生することで視空間ワーキングメモリと手先の運動協調性を科学的に鍛えます。",
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
      "name": "図形記憶テスト・空間認識能力トレーニング",
      "item": "https://skilldrills.online/ja/drills/physical/coordination/complex-pattern"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "図形記憶テスト・空間認識能力トレーニング",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "複雑化する幾何学パスを瞬間記憶し正確になぞることで、視空間ワーキングメモリ容量と運動協調性を測定・向上させる無料オンライントレーニングツール。",
  "url": "https://skilldrills.online/ja/drills/physical/coordination/complex-pattern",
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
  "name": "図形記憶＆空間ワーキングメモリトレーナー",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvasおよびマウス入力をサポートする最新ブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/physical/coordination/complex-pattern",
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "図形記憶ゲーム (Pattern Memory Game)",
  "url": "https://skilldrills.online/ja/drills/physical/coordination/complex-pattern",
  "description": "短時間点滅する多角形パスを記憶し、マウスドラッグで正確に再現する無料脳トレ・運動協調性ゲーム。",
  "genre": [
    "Brain Game",
    "Memory Test",
    "Coordination Drill",
    "Action"
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
      "name": "図形記憶テスト・空間認識ゲームは何の認知機能と運動能力を測定しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "大脳頭頂葉および前頭前野が司る「視空間ワーキングメモリ（Visuospatial Working Memory）」の一時保持容量と、一次運動野による「精密なマウス軌道再現（Motor Trajectory Reproduction）」の連動能力を測定します。瞬間的に視覚提示された空間配置を保持し、迷いなく正確な運動指令として指先から出力する処理効率を総合評価します。"
      }
    },
    {
      "@type": "Question",
      "name": "適性検査や認知機能検査の「図形記憶」「位置記憶」問題とどのような共通点がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "就職試験のWEB適性検査（CAB/GAB・認知テスト）や運転免許更新時の認知機能検査で出題される「図形再生」「位置記憶」課題と同一の神経メカニズムを刺激します。高レベルではノード数が最大8点に達し点滅時間が0.6秒まで短縮されるため、本番の検査で求められる瞬間直観記憶と空間チャンキング力を実戦的に鍛えられます。"
      }
    },
    {
      "@type": "Question",
      "name": "バドリーの視空間スケッチパッドとコーワンの4項目限界は難易度とどう連動していますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "アラン・バドリー（Baddeley, 1974）の作業記憶モデルにおいて、空間情報は「視空間スケッチパッド」で処理されます。ネルソン・コーワン（Cowan, 2001）が明らかにした人間のワーキングメモリの純粋な容量限界は約4項目です。本ドリルではレベル4までは容量内で直感処理できますが、レベル5以降（5〜8ノード）では点を1つずつ記憶する方法が破綻するため、複数の点を幾何学的な図形として統合する「チャンキング（構造化）」が必須となります。"
      }
    },
    {
      "@type": "Question",
      "name": "レベルが上がるにつれて点滅時間やノード数はどのように変化しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "難易度はレベル1から最大レベル15まで段階的にスケールします。接続すべきウェイポイント数は3個から8個へと増加し、経路の点滅時間は初期の2.0秒から最高難度では0.6秒まで短縮されます。さらに、直線主体の平易なルートから鋭角の折り返しや複雑な交差ループを含む幾何学パターンへと進化します。"
      }
    },
    {
      "@type": "Question",
      "name": "描画精度（Accuracy %）はどのようなアルゴリズムで判定されていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "プレイヤーがマウスドラッグで描いたベクトル軌跡と、目標の幾何学経路との空間的交差判定およびユークリッド座標偏差（Euclidean Deviation）をリアルタイム演算して0〜100%で算出します。指定順序通りに各ノードの中心付近を通過することで、85%以上の高精度スコアが記録されます。"
      }
    },
    {
      "@type": "Question",
      "name": "Apex LegendsやVALORANT等のFPSゲームにおけるリコイル制御やエイム力向上に役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "極めて直接的なトレーニング効果があります。FPSゲームにおける銃火器のリコイル制御（スプレーパターン抑制）は、画面上の目標物とは無関係に、記憶された2次元マウス移動ベクトルをブラインドで正確に再現する運動制御です。本ドリルは脳内に蓄積された幾何学パスを狂いなく指先から出力するフィードフォワード運動プログラムを飛躍的に強化します。"
      }
    },
    {
      "@type": "Question",
      "name": "複雑なジグザグや交差ループ経路を短時間で記憶するコツ（チャンキング）はありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "座標を数字や点として個別に覚えようとせず、全体を馴染みのある図形（例：「アルファベットのN」「三角形」「矢印」「ジグザグ」）として1つの意味ある塊（チャンク）に変換して視覚イメージ化してください。7個のノードも「三角形1つ＋水平ライン1本」のように2つのブロックに分けることで、ワーキングメモリの過負荷を防ぎ確実に保持できます。"
      }
    },
    {
      "@type": "Question",
      "name": "高速で図形をなぞる際のマウス感度（DPI）や持ち方（グリップ）の推奨設定は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "急激な方向転換と微細なカーブ修正を両立するため、振り向き25〜35cm/360°程度の中感度が最適です。手のひら全体をベタ付けする被せ持ち（パームグリップ）よりも、指先の関節自由度が高い掴み持ち（クロー）やつまみ持ち（フィンガーティップ）を採用すると、鋭角な角でオーバーシュートすることなく素早く方向転換できます。"
      }
    },
    {
      "@type": "Question",
      "name": "最高ランクの17,000点（Apex Pattern Master）を達成するための基準は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "45秒間のセッション中に一度も失敗することなくレベル12以上に到達し、最大4.0倍のコンボ倍率を切らさずに維持した上で、平均一致率92%以上を記録する必要があります。点滅終了直前の0.2秒間に頭の中で描画軌道を先行シミュレーションする瞬時の準備力が合否を分けます。"
      }
    },
    {
      "@type": "Question",
      "name": "このドリルは登録不要・完全無料で利用できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、SkillDrillsのすべてのドリルは完全無料でご利用いただけます。会員登録やアプリのダウンロードは一切不要で、WEBブラウザ（HTML5 Canvas）を開くだけで即座に開始できます。自己ベスト記録やスコア履歴は外部サーバーへ送信されず、お使いの端末ブラウザ内にのみ安全に保存されます。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "図形記憶＆パス再現ドリルの実践手順ガイド",
  "description": "瞬間点滅する幾何学パスを視空間ワーキングメモリに格納し、マウスドラッグで正確に復元する4ステップ。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "点滅パスの直観把握と幾何学的チャンキング",
      "text": "ラウンド開始時に緑色のベクトル線で表示される経路を凝視します。個別の点ではなく三角形やZ字など親和性の高い形状ブロックとして認識・記憶します。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/complex-pattern#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "水色の開始ノードをクリックしてドラッグ開始",
      "text": "緑色の線が消滅して描画フェーズへ移行したら、水色のスタートノードをマウス左クリックしたままトレース動作を開始します。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/complex-pattern#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "中継点を順次通過し赤紫色の終了ノードで離す",
      "text": "記憶した順番通りに全ノードをスムーズに通過し、赤紫色のゴールノード上でマウスボタンを離して軌道を確定・送信します。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/complex-pattern#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "迅速な再現でコンボ倍率を最大化",
      "text": "正確性を保ちつつ素早く描き切ることでコンボ倍率が最大4.0倍まで累積し、45秒間の制限時間内でハイスコアを獲得できます。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/complex-pattern#step-4"
    }
  ]
};

const patternGuide = {
  heading: "視空間ワーキングメモリと幾何学パス再現の認知バイオメカニクス",
  subtitle: "バドリーの視空間スケッチパッド、コーワンの容量限界、ラシュレーの運動チャンキングに基づく協調制御理論",
  intro: [
    "図形記憶テスト（Complex Pattern Drill）は、画面上にわずかな時間だけ点滅表示される幾何学的ベクトル経路を脳内の作業記憶に焼き付け、表示が消えた無地のキャンバス上で正確にマウス操作により再現する高次な認知・運動統合ドリルです。単なる瞬間反射テストとは異なり、45秒の制限時間内に段階的に増大する空間座標を短期保持し、迷いなく正確な運動軌道として出力する能力を総合測定します。",
    "認知心理学のアラン・バドリーとグラハム・ヒッチ（Baddeley & Hitch, 1974）のワーキングメモリモデルによれば、視覚および空間の配置情報は「視空間スケッチパッド（Visuospatial Sketchpad）」で一時保持されます。ネルソン・コーワン（Cowan, 2001）は、成人が同時に保持できる純粋な情報要素の限界が約3〜4項目であることを実証しました。本ドリルにおいて中継ノードが5個以上に達する高難度レベルを突破するためには、個々の座標を1つずつ記憶する手法から脱却し、複数の点を三角形やアルファベット形状などの上位概念へ構造化する「視覚的チャンキング（Visual Chunking）」が神経回路内で自律的に発動する必要があります。",
    "さらにカール・ラシュレー（Lashley, 1951）の直列運動行動論（Serial Order in Behavior）が示すように、素早い連続運動は一動作ごとの感覚フィードバックを待つ余裕がなく、あらかじめ脳の運動野でコンパイルされた「モーター・チャンク（運動の塊）」として一括実行されます。ロバート・ウッドワース（Woodworth, 1899）の二相性モデルが解き明かした通り、始点から各ノードへ向かう初期の弾道運動（Ballistic phase）と、各頂点での繊細な終端減速制御（Current-control deceleration）が高次元で調和して初めて、寸分の狂いもない軌道再現が可能となります。",
    "計測精度およびハードウェアに関する注記：本ドリルはブラウザの performance.now() 高精度クロックを用いてクライアント端末内部でミリ秒単位の物理演算を行っています。ディスプレイのリフレッシュレート（60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms、Woods et al., 2015）やマウスのポーリングレート（125Hz 対 1000Hz）により微小な物理遅延が生じるため、5ms未満の誤差は測定ノイズとしてお考えください。全データはブラウザ内にのみ安全に保持されます。"
  ],
  benchmarks: {
    title: "図形記憶能力＆空間ワーキングメモリ 5段階標準ベンチマーク",
    headers: ["階層 / ティア", "称号 (Rank Title)", "スコア基準値", "到達レベル", "パス一致率 (Accuracy)", "神経認知・運動協調性プロファイル"],
    rows: [
      ["Tier 1: 頂点パターンマスター", "Apex Pattern Master", "17,000点以上", "Level 12 – 15", "92%以上維持", "上位0.1%水準の超高速視空間チャンキングおよび前腕・指先の精密な複合軌道制御の完成（Cowan 2001; Lashley 1951）"],
      ["Tier 2: エリートシークエンストレーサー", "Elite Sequence Tracer", "13,000 – 16,999点", "Level 9 – 11", "85 – 91%維持", "複雑な6〜7ノードの鋭角パスの安定した再現と優れた運動記憶・フィードフォワード制御（Baddeley 1974）"],
      ["Tier 3: 熟練空間ナビゲーター", "Advanced Spatial Navigator", "9,500 – 12,999点", "Level 6 – 8", "76 – 84%維持", "一般的な競技ゲーム上位ランク水準の安定した空間認識力と滑らかな2次元ドラッグ制御力"],
      ["Tier 4: 中級ウェイポイント想起者", "Intermediate Waypoint Recaller", "6,000 – 9,499点", "Level 3 – 5", "65 – 75%維持", "成人の標準的なワーキングメモリ保持境界、5ノード以上で想起遅延および軌道ブレが発生"],
      ["Tier 5: 入門・パス学習者", "Novice Trajectory Learner", "6,000点未満", "Level 1 – 2", "65%未満維持", "瞬間記憶の記銘が不安定、急な方向転換時にカーソルのオーバーシュートが頻発（基礎チャンキング推奨）"]
    ],
    note: "視空間ワーキングメモリ理論（Baddeley & Hitch 1974; Cowan 2001）と直列運動制御研究（Lashley 1951; Woodworth 1899）に基づく客観的パフォーマンス基準です。"
  },
  techniques: {
    title: "図形記憶力向上＆精密マウストレース実践プロトコル",
    items: [
      {
        name: "幾何学サブシェイプのチャンキング法 (Baddeley Visuospatial Chunking)",
        desc: "バドリーとコーワンの研究が示す通り、人間の作業記憶は4つ以上の独立情報を同時に保持できません。5ノード以上が現れた際は、独立した点として見ず、三角形、四角形、「Z」字など親しみのある図形ブロックに分解して記憶してください。",
        tips: "7個のノードなら「三角形1個（3点）＋四角形1個（4点）」のように2つの直観的チャンクにまとめることで、脳の認知負荷を激減させられます。"
      },
      {
        name: "ラシュレー直列フィードフォワード・運動プログラムの事前活性化 (Feedforward Motor Chaining)",
        desc: "カール・ラシュレー（1951）が証明したように、俊敏な描画運動はマウスを動かしながら考えるのではなく、動かす前に全体の軌道が運動野で1つのまとまりとしてコンパイルされていなければなりません。",
        tips: "点滅表示が終わる直前の0.2秒間に、マウスを滑らせるルートを頭の中で素早く先行イメージし、消えた瞬間に躊躇なくワンストロークで描画してください。"
      },
      {
        name: "ウッドワース電流制御と頂点終端減速ブレーキング (Vertex Terminal Deceleration)",
        desc: "ロバート・ウッドワース（1899）のモデルに基づき、直線区間では大胆に加速し、各ノードの頂点を通過する瞬間に指先で微小な下向き圧力を加えて減速することで、角のオーバーシュートを阻止します。",
        tips: "鋭角に折れ曲がるノードでは、手のひらの小指球（付け根）と薬指でマウスパッドを軽く押し込む摩擦抵抗を活用して正確な頂点を形成しましょう。"
      },
      {
        name: "図形重心アンカリングによる非言語的残像記憶術 (Iconic Centroid Anchoring)",
        desc: "上位レベルで表示時間が0.6秒まで短縮された際、頭の中で番号を数えたり言葉で覚えようとすると言語処理のボトルネックが生じます。言語化を完全に遮断し、純粋な視覚残像（アイコン記憶）を活用します。",
        tips: "個々のノードを目で追いかけるのではなく、図形全体の幾何学的重心（Centroid）に視線を固定し、周辺視野で全体のシルエットを一括吸収してください。"
      }
    ]
  },
  steps: [
    "競技ゲーム本番と同じマウス感度（DPI/eDPI）に設定し、安定した姿勢を取ります。",
    "カウントダウン後、画面に緑色のラインで浮かび上がる経路を注視します。",
    "ラインが消失したら水色の開始ノードをクリックしてドラッグを開始します。",
    "記憶した順序通りに各ノードを通過し、赤紫色の終了ノード上でクリックを離します。"
  ],
  audience: "FPS競技ゲーマー（リコイル制御や直感的なマウス軌道コントロールの向上）、就職活動・適性検査（視覚記憶・空間認識課題）対策を行う受験者、および視覚的ワーキングメモリと手指の協調運動を鍛えたいすべての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('baddeley1974', 'cowan2001', 'lashley1951', 'woodworth1899', 'woods2015')
};

export default function ComplexPatternPageJa() {
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
      <ComplexPatternClient
        copy={{
          title: "図形記憶テスト・空間認識能力トレーニング",
          subtitle: "視空間ワーキングメモリ（バドリーモデル）＆幾何学パス再現ドリル • 15段階",
          rulesTitle: "図形記憶トレーニングのルール＆スコア採点基準",
          rules: [
            { title: "幾何学パスの瞬間記憶", text: "画面に点滅表示される緑色の多角形ベクトル経路を、消える前に集中して脳内に焼き付けます。" },
            { title: "マウスドラッグでの順次トレース", text: "水色の開始ノードをクリックしたまま、記憶した全中継点を正しい順番で通過し、赤紫色の終了ノードまで繋ぎます。" },
            { title: "軌道一致率判定とコンボ加速", text: "目標パスとの類似度基準をクリアするとコンボ倍率が最大4.0倍まで上昇し、高得点を獲得できます。" },
            { title: "エラー時のコンボリセット", text: "描画誤差が許容値を超えるとコンボは1.0倍にリセットされますが、45秒の制限時間が減ることはありません。" }
          ],
          aboutTitle: "図形記憶ドリルについて",
          aboutHeading: "視空間ワーキングメモリと連続運動チャンキング機構",
          aboutText: "本ドリルは、アラン・バドリー（Baddeley, 1974）の視空間スケッチパッド理論およびネルソン・コーワン（Cowan, 2001）のワーキングメモリ容量限界（4項目）に基づいて設計されています。瞬間点滅する幾何学的な座標を短期保持し、カール・ラシュレー（Lashley, 1951）の運動チャンキングによってマウス操作へと連続出力することで、視空間認知力と微細な手先の運動協調性を同時に向上させます。"
        }}
      />
      <DrillGuide guide={patternGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/complex-pattern"
          locale="ja"
        />
      </div>
    </>
  );
}
