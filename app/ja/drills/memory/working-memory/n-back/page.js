import NBackClient from '@/app/drills/memory/working-memory/n-back/NBackClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (n-back)
// PRIMARY:  "nバック課題"                — Top Japanese query (13 Google suggestions: ブラウザ, 効果, アプリ)
//           "デュアルnバック"            — High volume search intent (15 Google suggestions: 効果, ブラウザ)
// SECONDARY / LSI:
//           "nバック課題 ブラウザ"        — Web browser specific intent
//           "nバック課題 効果"            — Cognitive benefit query
//           "デュアルnバック ブラウザ"    — Web browser dual n-back query
//           "n-back テスト"              — Assessment query
//           "ワーキングメモリ 訓練"      — Core cognitive capability
// ============================================================

export const metadata = {
  title: "nバック課題・デュアルnバック – ワーキングメモリ訓練 | SkillDrills",
  description: "無料のオンラインnバック課題（N-Back Test / デュアルnバック）ツール。連続する文字刺激のN個前の一致を判定し、ワーキングメモリ（作業記憶）の更新能力、実行機能、流動性知能をブラウザで測定・強化。",
  keywords: ['nバック課題', 'デュアルnバック', 'nバック課題 ブラウザ', 'ワーキングメモリ 訓練', 'n-back テスト', '作業記憶 トレーニング', '流動性知能 向上', '実行機能 検査', '情報更新 能力', '脳トレ ワーキングメモリ', 'nバック オンライン', '認知機能 測定'],
  openGraph: {
    title: "nバック課題（デュアルnバック）- 無料ブラウザワーキングメモリ訓練 | SkillDrills",
    description: "無料のオンラインnバック課題（N-Back Test / デュアルnバック）ツール。連続する文字刺激のN個前の一致を判定し、ワーキングメモリ（作業記憶）の更新能力、実行機能、流動性知能をブラウザで測定・強化。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/memory/working-memory/n-back",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "nバック課題（デュアルnバック）- 無料ブラウザワーキングメモリ訓練 | SkillDrills",
    description: "無料のオンラインnバック課題（N-Back Test / デュアルnバック）ツール。連続する文字刺激のN個前の一致を判定し、ワーキングメモリ（作業記憶）の更新能力、実行機能、流動性知能をブラウザで測定・強化。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/memory/working-memory/n-back",
    languages: getAlternateLanguages('/drills/memory/working-memory/n-back'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "記憶力トレーニング", "item": "https://skilldrills.online/ja/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "ワーキングメモリ", "item": "https://skilldrills.online/ja/drills/memory/working-memory" },
    { "@type": "ListItem", "position": 4, "name": "nバック課題", "item": "https://skilldrills.online/ja/drills/memory/working-memory/n-back" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "nバック課題（デュアルnバック）ワーキングメモリ訓練",
  "url": "https://skilldrills.online/ja/drills/memory/working-memory/n-back",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11",
  "educationalUse": ["ワーキングメモリ容量", "連続情報更新", "エグゼクティブ・コントロール", "流動性知能"]
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "nバック課題 – 無料オンライン脳機能トレーニング",
  "url": "https://skilldrills.online/ja/drills/memory/working-memory/n-back",
  "description": "連続表示される文字刺激がN個前と一致するかを瞬時に判定する無料ブラウザnバック課題ゲーム。",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Cognitive Training", "Working Memory", "Brain Training", "N-Back"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "nバック課題 (デュアルnバック)",
  "url": "https://skilldrills.online/ja/drills/memory/working-memory/n-back",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "nバック課題でワーキングメモリ更新能力を鍛える方法",
  "description": "認知心理学・神経科学に基づくnバック課題の4ステップ実践トレーニングプロトコル。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ja/drills/memory/working-memory/n-back#step-1",
      
      "name": "内言語的リハーサルでスライディングバッファを維持する",
      "text": "提示される文字系列を心の中で時系列順に小さく呟き（内言語的リハーサル）、直近N個の文字を頭の中に循環キューとして保持します。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ja/drills/memory/working-memory/n-back#step-2",
      
      "name": "現在の刺激とN個前の記憶を照合する",
      "text": "新たな文字が表示された瞬間、保持しているキューの最も古い文字（ちょうどN歩前に出現した文字）と一致するか瞬時に照合します。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ja/drills/memory/working-memory/n-back#step-3",
      
      "name": "最古の情報を破棄し最新の文字をキューに挿入する",
      "text": "判定後、即座に最も古い文字を意識から追い出し、新しい文字をキューの先頭へ追加してワーキングメモリの内容を動的に更新します。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ja/drills/memory/working-memory/n-back#step-4",
      
      "name": "ミスを引きずらず一定の注意リズムを維持する",
      "text": "判定ミスを悔やんで立ち止まると後続のバッファが崩壊します。見失った場合は次の文字から直ちに新しいキューを再構築してください。"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "nバック課題（N-Back Test）とはどのようなテストですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "nバック課題は、認知心理学および神経科学で最も広く使われているワーキングメモリ（作業記憶）の連続更新タスクです。連続して提示される刺激（文字や位置）を監視し、現在の刺激が「N個前」に提示されたものと一致するかをリアルタイムに判定します。"
      }
    },
    {
      "@type": "Question",
      "name": "nバック課題は誰が考案し、当初は何のために開発されましたか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1958年に心理学者ウェイン・K・カーシュナー（Wayne K. Kirchner）が考案しました。目まぐるしく変化する動的情報の短期保持における加齢の影響を調査する実験の中で誕生し、高齢者において動的情報更新が大きなボトルネックとなることが実証されました。"
      }
    },
    {
      "@type": "Question",
      "name": "nバック課題はどのような脳機能を測定・向上させますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "主として前頭前野（特に背外側前頭前皮質 / DLPFC）が司る実行機能（エグゼクティブ・コントロール）、作業記憶の動的更新能、干渉抑制力、持続的注意力を評価・強化します。"
      }
    },
    {
      "@type": "Question",
      "name": "単純な数字記憶（デジットスパン）とnバック課題の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "デジットスパンなどの受動的スパン検査は「静的な一時保管」を測定します。これに対しnバック課題は、新しい刺激が入るたびに最古の項目を捨てて最新項目を追加するという「動的加工・操作（Manipulation & Updating）」を常に要求する点が決定的に異なります。"
      }
    },
    {
      "@type": "Question",
      "name": "nバック課題のトレーニングで流動性知能（IQ）は向上しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Susanne M. Jaeggiら（2008年、米国科学アカデミー紀要 PNAS）の先駆的研究により、適応型Nバック訓練が非言語的推論課題で測定される流動性知能（Gf）を有意に向上させることが報告され世界的な注目を集めました。転移効果の大きさには議論があるものの、ワーキングメモリ容量と注意力制御が強固に鍛えられることは実証されています。"
      }
    },
    {
      "@type": "Question",
      "name": "一般的な成人における3-Backテストの平均スコアはどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "健常な若年成人の標準的な3-Back課題における平均正答率は65%〜80%程度です。85%以上の正答率を安定して維持したり、4-Back課題をクリアできる場合は上位パーセンタイルの優れた実行機能を有しているとみなされます。"
      }
    },
    {
      "@type": "Question",
      "name": "シングルnバックとデュアルnバック（Dual N-Back）の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "シングルnバックは視覚文字など1種類の刺激系列を追跡します。デュアルnバックは「視覚的な画面上の位置」と「聴覚的な音声文字」の2つの独立した感覚入力を同時に提示し、両方の感覚モダリティで並行してN個前の一致を判定する高度な分割注意・作業記憶更新タスクです。"
      }
    },
    {
      "@type": "Question",
      "name": "頭の中で呟く内言語的リハーサルはnバックでどのように役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "内言語による呟きは、バドリーの作業記憶モデルにおける「音韻ループ（Phonological Loop）」を作動させます。直近の文字（例：「B・M・T」）を頭の中でリズムよく反復することで、急速な記憶減退を防ぎながら照合精度を劇的に向上させることができます。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜ4-Backや5-Backになると急激に難易度が跳ね上がるのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ネルソン・カウワン（Nelson Cowan, 2001）の作業記憶理論によると、人間の意識的な注意の焦点（Focus of Attention）の容量限界は約4±1チャンクです。4-Backや5-Backはこの生物学的限界を超えるため、情報の干渉や脱落が急増します。"
      }
    },
    {
      "@type": "Question",
      "name": "ワーキングメモリの更新能力は実生活や競技でどう活かされますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "複雑なプログラミングのデバッグ、多変数を扱う戦略的金融分析、文章の読解力向上、そしてFPSや格闘ゲームなどのeスポーツにおいて刻一刻と変化する戦況（敵の位置・リソース管理）をリアルタイムに把握・判断する能力に直結します。"
      }
    }
  ]
};

const nBackClientCopyJa = {
  h1Keyword: "nバック課題",
  h1Suffix: "（デュアルnバック）ワーキングメモリ訓練",
  caption: "nバック課題は、現在の刺激がN個前のものと一致するかを判定する認知心理学の標準タスクです。Baddeley & Hitch（1974）のワーキングメモリモデルに基づき、情報の「短期保持」と「動的更新」を同時に要求します。",
  statScore: "スコア",
  statTime: "残り時間",
  statLevel: "難易度",
  statBest: "自己ベスト",
  hudScore: "スコア",
  hudTime: "残り時間",
  modeSuffix: "-BACK 訓練",
  memorizingText: "最初の {n} 文字を記憶中...",
  btnMatch: "一致 (MATCH)",
  btnNoMatch: "不一致 (NO MATCH)",
  startTitle: "nバック課題 プロ",
  startSubtitle: "ワーキングメモリ・連続情報更新トレーニング",
  countdownSubtitle: "準備してください",
  newBest: "新記録",
  pointsLabel: "獲得ポイント",
  statAccuracy: "正答率",
  statPeakLevel: "最高到達レベル",
  statPerfects: "パーフェクト判定",
  btnPlayAgain: "もう一度プレイ",
  rulesTitle: "ルールとスコアリングシステム",
  rulesItems: [
    { num: "1", text: "一致・不一致判定 (N個前)", highlight: "+150 PTS", result: "正答ごとに即時加点" },
    { num: "2", text: "レベル昇格", highlight: "3-Back → 4-Back+", result: "1,200点獲得ごとに難易度アップ" },
    { num: "3", text: "表示速度の加速", highlight: "2,000ms → 最短1,200ms", result: "高難度ほど高速な情報処理を要求" },
    { num: "4", text: "タイムアウト（無回答）", highlight: "減点なし", "result": "スコアや時間の没収なし" },
    { num: "5", text: "誤判定（ミス）", highlight: "ストリークリセット", result: "残り時間の減少なし・制限時間45秒完走" }
  ]
};

const guideJa = {
  heading: "nバック課題ガイド & ワーキングメモリ能力基準",
  intro: [
    "nバック課題（N-Back Task）は、刻一刻と変化する動的情報の連続更新能、前頭前野による実行機能制御、そして時間的プレッシャー下での記憶維持能力を測定・評価するための認知神経科学におけるゴールドスタンダードです。1958年にWayne K. Kirchnerが発表した画期的な老化・情報更新研究を端緒とし、現在では脳機能トレーニングや認知アセスメントに不可欠な基盤パラダイムとなっています。",
    "静的な記憶容量のみを測定する従来の記憶スパンテストとは異なり、nバック課題では常に変化する内部バッファの動的更新が求められます。画面上に次々と出現するアルファベットを見つめながら、現在の文字がちょうどN歩前（標準の3-Backから始まり、成績に応じて4-Back、5-Backへと進展）の文字と一致するかを判断し、古い記憶を消去しながら新しい刺激を絶え間なくエンコードしていきます。",
    "測定方法について：すべてのイベントはブラウザの performance.now() 高精度タイマーによって完全にローカル環境（デバイス上）でミリ秒単位で計測されます。サーバーへのスコア送信は一切行われません。なお、Spectre脆弱性対策としてブラウザタイマーには通常約1msの量子化が施されており、ディスプレイのリフレッシュレート（60Hz環境で約16.7ms）による描画遅延も生じます。5ms未満の差異は計測上のノイズとして扱い、同一ハードウェア環境下での自己記録比較を行ってください。",
    "データの透明性：SkillDrillsはお客様の個人成績データを収集しません。スコアおよび設定情報はブラウザのlocalStorageにのみ保存され、外部送信されません。本ページに記載されているベンチマークや基準値は、すべて下部の参考文献に掲載された学術論文に準拠しています。",
    "本ドリルは練習と自己研鑽を目的とした無料のブラウザゲームです。医療機器や診断ツールではなく、いかなる認知的障害や疾患のスクリーニングや治療を目的としたものでもありません。健康や認知機能に関してご懸念がある場合は、専門の医師や臨床心理士にご相談ください。"
  ],
  metrics: [
    { label: "最高到達 N-Back レベル", desc: "セッション中に到達した最高の深度（3-Back 基準、4-Back 上級、5-Back以上 エリート）。" },
    { label: "総合獲得スコア", desc: "45秒間のセッションで蓄積された合計ポイント（正解判定ごとに+150点、ペナルティなし）。" },
    { label: "ターゲット判定正答率", desc: "セッション全体における一致・不一致の正解率（フォールスアラームや見落としエラーに対する正確性）。" },
    { label: "作業記憶更新速度", desc: "刺激提示ウィンドウ内での意思決定速度および反応潜時（実行処理効率の指標）。" }
  ],
  benchmarks: [
    { tier: "Tier 1: 卓越した作業記憶 (Executive Elite / 上位1%)", range: "4-Back 〜 5-Back+ (1,200点以上)", desc: "エリート水準。脳内に4〜5個の先入れ先出し（FIFO）キューを維持し、瞬時のトークン更新と600ms未満の反応速度、92%以上の正答率を達成。" },
    { tier: "Tier 2: 優秀水準 (Strong Updating Control / 上位5〜15%)", range: "安定した3-Backから4-Back遷移 (900 〜 1,199点)", desc: "成人の平均を大きく上回る。ルアー干渉エラーを最小限に抑えて安定した3-Back更新を維持し、4-Back試行へ突入。正答率80%〜91%。" },
    { tier: "Tier 3: 成人標準基準値 (50th Percentile Normal)", range: "堅実な3-Back (600 〜 899点)", desc: "標準的な成人基準値（Kirchner, 1958; Jaeggi et al., 2008）。3項目の内言語バッファを維持するが、高速提示時に最古トークンの脱落が散発。正答率65%〜79%。" },
    { tier: "Tier 4: 平均未満 (Executive Buffer Decay / 下位15〜30%)", range: "不安定な3-Back (400 〜 599点)", desc: "連続的な3項目FIFO更新に苦戦。2-Backと3-Backの混同（類似性ルアーエラー）が多発し、一致試行での正答率が50%〜64%に低下。" },
    { tier: "Tier 5: 改善が必要 (< 15th Percentile)", range: "3-Back未満 (< 400点)", desc: "作業記憶更新の深刻なボトルネック。刺激遷移において3つの連続項目をアクティブバッファに保持できず、タイムアウトが頻発。" }
  ],
  science: [
    { title: "Wayne K. Kirchner (1958): nバックパラダイムの起源", body: "カーシュナーは、急速に変化する情報の保持における加齢の影響を調べた1958年の研究でnバック課題を導入しました。受動的な短期保持が保たれていても、動的な項目破棄と新規追加の要求によって認知的ボトルネックが浮き彫りになることを発見しました。" },
    { title: "Alan Baddeley (1986, 2000): 中央実行系の制御機構", body: "バドリーの多要素作業記憶モデルにおいて、nバックは「中央実行系（Central Executive）」を直接評価する代表的パラダイムです。音韻ループによるリハーサルと背外側前頭前皮質（DLPFC）における注意ゲーティングの同時調整を要求します。" },
    { title: "Adele Diamond (2013): 実行機能の三要素", body: "ダイヤモンドは作業記憶の更新、抑制制御、認知的柔軟性を人間の実行機能の基礎的三要素と定義しました。nバック課題はバッファ更新、直近ルアーの抑制、柔軟な精神的再構成を同時に要求することでこの三要素すべてを強力に負荷します。" },
    { title: "Susanne M. Jaeggi et al. (2008): 流動性知能への転移効果 (PNAS)", body: "イェギらの著名なPNAS論文は、適応型nバック課題の集中訓練がレーヴン漸進的マトリックスで測定される流動性知能（Gf）を有意に向上させることを示し、作業記憶容量が可塑的で訓練可能であることを実証しました。" },
    { title: "Nelson Cowan (2001, 2010): 4±1の容量制約", body: "カウワンの理論は、意識的な焦点注意が保持できる非チャンク化項目数が約4個であることを示しています。3-Backから4-Backへの移行はこの生物学的制約の境界線に位置し、チャンキングやリハーサルの質が問われます。" },
    { title: "David L. Woods et al. (2015): 認知的クロノメトリーと信号検出理論", body: "ウッズらはコンピュータ化された認知測定基準を検証し、ヒューマンファクターにおけるヒット率、フォールスアラーム率、感度指標（d'）の算出法と performance.now() によるミリ秒精度測定を標準化しました。" }
  ],
  protocols: [
    { title: "循環キューの内言語的リハーサル (Baddeley 1986)", body: "頭の中で常に3文字の言語ループ（例：「B・M・T」）を一定のリズムで反復します。新しい文字が入ったら先頭文字と照合し、先頭を捨てて末尾に新文字を加えます（「M・T・R」）。" },
    { title: "類似性ルアーに対する抑制制御 (Diamond 2013)", body: "「ちょうどN歩前」ではなく「1歩前」や「2歩前」に出現した文字（ルアー刺激）に惑わされないよう注意してください。直感的な「見覚えがある」という衝動を前頭葉で能動的に抑制します。" },
    { title: "音韻空間二重符号化", body: "頭の中の言葉のループに加え、目の前に3つのスロットが並んでいる空間イメージを描き、文字が左へスライドしていく様子を視覚化します。音韻と空間の二重符号化が記憶痕跡を強固にします。" },
    { title: "見失った際の即時リセット", body: "途中で記憶系列を見失ってもパニックになって過去を思い出そうとしてはいけません。直ちに次に来る文字を「ステップ1」と割り切り、続く2文字で即座に新しい3項目バッファを組み直してください。" }
  ],
  sources: pickSources('baddeley1974', 'baddeley1986', 'cowan2001', 'woods2015'),
  faqs: [
    { q: "nバック課題（N-Back Test）とはどのようなテストですか？", a: "nバック課題は、認知心理学および神経科学で最も広く使われているワーキングメモリ（作業記憶）の連続更新タスクです。連続して提示される刺激を監視し、現在の刺激が「N個前」に提示されたものと一致するかをリアルタイムに判定します。" },
    { q: "nバック課題は誰が考案し、当初は何のために開発されましたか？", a: "1958年に心理学者ウェイン・K・カーシュナー（Wayne K. Kirchner）が考案しました。目まぐるしく変化する動的情報の短期保持における加齢の影響を調査する実験の中で誕生しました。" },
    { q: "nバック課題はどのような脳機能を測定・向上させますか？", a: "主として前頭前野（特に背外側前頭前皮質 / DLPFC）が司る実行機能（エグゼクティブ・コントロール）、作業記憶の動的更新能、干渉抑制力、持続的注意力を評価・強化します。" },
    { q: "単純な数字記憶（デジットスパン）とnバック課題の違いは何ですか？", a: "受動的スパン検査は「静的な一時保管」を測定します。これに対しnバック課題は、新しい刺激が入るたびに最古の項目を捨てて最新項目を追加するという「動的加工・操作」を常に要求します。" },
    { q: "nバック課題のトレーニングで流動性知能（IQ）は向上しますか？", a: "Jaeggiら（2008年、PNAS）の研究により、適応型Nバック訓練が流動性知能（Gf）を有意に向上させることが報告され世界的な注目を集めました。" },
    { q: "一般的な成人における3-Backテストの平均スコアはどのくらいですか？", a: "健常な若年成人の標準的な3-Back課題における平均正答率は65%〜80%程度です。85%以上を維持できれば優れた実行機能を有しているとみなされます。" },
    { q: "シングルnバックとデュアルnバック（Dual N-Back）の違いは何ですか？", a: "シングルnバックは文字など1種類の刺激を追跡します。デュアルnバックは「視覚的位置」と「聴覚的文字」の2つの感覚入力を同時に並行して追跡・更新する高度なタスクです。" },
    { q: "頭の中で呟く内言語的リハーサルはnバックでどのように役立ちますか？", a: "内言語による呟きは「音韻ループ」を作動させます。直近の項目をリズムよく反復することで、急速な記憶減退を防ぎながら照合精度を維持できます。" },
    { q: "なぜ4-Backや5-Backになると急激に難易度が跳ね上がるのですか？", a: "ネルソン・カウワン（2001）の理論によると、人間の意識的な注意の焦点の容量限界は約4±1項目です。4-Backや5-Backはこの生物学的限界を超えるためです。" },
    { q: "ワーキングメモリの更新能力は実生活や競技でどう活かされますか？", a: "複雑なプログラミング、金融データの分析、文章読解力、そしてeスポーツやスポーツにおける刻一刻と変化する戦況判断力に直結します。" }
  ],
  related: [
    { href: "/ja/drills/memory/spatial-memory/path-tracing", title: "空間パストレーシング記憶テスト", desc: "動的経路を記憶し拡大マトリックス上で空間作業記憶を鍛える。" },
    { href: "/ja/drills/memory/spatial-memory/grid-memorization", title: "視覚グリッド記憶テスト", desc: "市松模様の空間パターンを記憶し視覚キャッシュ容量を評価。" },
    { href: "/ja/drills/memory/spatial-memory/object-location", title: "物体位置記憶テスト", desc: "複数象限マップ上での空間関係結合と配置記憶を測定。" },
    { href: "/ja/drills/memory/short-term-memory/digit-span", title: "デジットスパン記憶テスト", desc: "順唱による数値短期記憶容量と音韻ループのリハーサルを評価。" },
    { href: "/ja/drills/memory/short-term-memory/word-recall", title: "言語性記憶リコールテスト", desc: "時間制限下での即時言語再生と意味的クラスタリング能を測定。" },
    { href: "/ja/drills/memory/short-term-memory/color-sequence", title: "カラーシーケンス記憶ゲーム", desc: "加速する色彩点滅シーケンスの保持と順序記憶力を鍛える。" }
  ]
};

export default function NBackPageJa() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <NBackClient copy={nBackClientCopyJa} />

      <DrillGuide
        lead={guideJa.lead}
        metrics={guideJa.metrics}
        benchmarks={guideJa.benchmarks}
        science={guideJa.science}
        protocols={guideJa.protocols}
        sources={guideJa.sources}
        faqs={guideJa.faqs}
        related={guideJa.related}
      />

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="memory" currentHref="/drills/memory/working-memory/n-back" locale="ja" />
      </div>
    </>
  );
}
