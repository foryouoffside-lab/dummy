import ConcentrationGridClient from '@/app/drills/cognitive/focus/concentration-grid/ConcentrationGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (concentration-grid)
// PRIMARY:  "シュルテテーブル"                — Top Japanese query (9 Google suggestions)
//           "シュルテテーブル アプリ"          — High volume search intent
// SECONDARY / LSI:
//           "シュルテテーブル 効果"            — Informational / benefit query
//           "シュルテテーブル やり方"          — How-to intent query
//           "周辺視野 トレーニング"            — Core cognitive capability
//           "速読 トレーニング 数字"          — Speed reading association
//           "集中力 トレーニング ゲーム"        — Casual / educational intent
// ============================================================

export const metadata = {
  title: "シュルテテーブル – 無料ブラウザ周辺視野・集中力トレーニング | SkillDrills",
  description: "無料のオンラインシュルテテーブル（Schulte Table）練習ツール。拡大するグリッド（3×3〜8×8）上の数字を連続タップし、速読に必要な周辺視野拡大、視覚探索速度、持続的集中力を鍛えます。",
  keywords: [
    "シュルテテーブル",
    "シュルテテーブル 効果",
    "シュルテテーブル やり方",
    "シュルテテーブル アプリ",
    "周辺視野 トレーニング",
    "速読 トレーニング 数字",
    "視野拡大 トレーニング",
    "集中力 グリッド",
    "サッカード 眼球運動",
    "無料 脳トレ 数字",
    "シュルテテーブル 5x5 練習",
    "オンライン 集中力 測定 テスト"
  ],
  openGraph: {
    title: "シュルテテーブル – 無料ブラウザ周辺視野・集中力トレーニング | SkillDrills",
    description: "無料のオンラインシュルテテーブル（Schulte Table）練習ツール。拡大するグリッド（3×3〜8×8）上の数字を連続タップし、速読に必要な周辺視野拡大、視覚探索速度、持続的集中力を鍛えます。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/cognitive/focus/concentration-grid",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "シュルテテーブル – 無料ブラウザ周辺視野・集中力トレーニング | SkillDrills",
    description: "無料のオンラインシュルテテーブル（Schulte Table）練習ツール。拡大するグリッド（3×3〜8×8）上の数字を連続タップし、速読に必要な周辺視野拡大、視覚探索速度、持続的集中力を鍛えます。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/cognitive/focus/concentration-grid",
    languages: getAlternateLanguages('/drills/cognitive/focus/concentration-grid'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "認知・脳機能トレーニング", "item": "https://skilldrills.online/ja/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "シュルテテーブル", "item": "https://skilldrills.online/ja/drills/cognitive/focus/concentration-grid" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "シュルテテーブル (Schulte Table / Concentration Grid)",
  "url": "https://skilldrills.online/ja/drills/cognitive/focus/concentration-grid",
  "description": "拡大するグリッド上の連続する数字を素早くタップする、認知機能・周辺視野・視覚探索速度トレーニング用Webアプリ。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11",
  "educationalUse": ["視覚探索速度", "周辺視野拡大", "サッケード効率", "持続的注意集中"]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "シュルテテーブル (Schulte Table / Concentration Grid)",
  "url": "https://skilldrills.online/ja/drills/cognitive/focus/concentration-grid",
  "description": "拡大するグリッド上の連続する数字を素早くタップする、認知機能・周辺視野・視覚探索速度トレーニング用Webアプリ。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "シュルテテーブル (Schulte Table / Concentration Grid)",
  "url": "https://skilldrills.online/ja/drills/cognitive/focus/concentration-grid",
  "description": "拡大するグリッド上の連番数字を素早く見つけてタップし、周辺視野の拡大と視覚探索速度、持続的集中力を鍛える無料ブラウザトレーニングツール。",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["認知トレーニング", "周辺視野", "シュルテテーブル", "集中力グリッド"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "シュルテテーブルで周辺視野を鍛える4つのステップ",
  "description": "視覚探索速度・周辺視野・持続的集中力を向上させるための効果的な実践ステップ。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ja/drills/cognitive/focus/concentration-grid#step-1",
      "name": "グリッドの中心に視線を固定する",
      "text": "視線を個々のマスへ激しく動かさず、中心部に緩やかに固定して全体を捉えます。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ja/drills/cognitive/focus/concentration-grid#step-2",
      "name": "1から順番に素早くタップする",
      "text": "1から始まる連続した昇順で迷いなく高速にタップします。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ja/drills/cognitive/focus/concentration-grid#step-3",
      "name": "周辺視野で次の数字を先行捕捉する",
      "text": "現在の数字をタップしながら、周辺視野で次の2〜3個の数字の配置を同時に捉えます。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ja/drills/cognitive/focus/concentration-grid#step-4",
      "name": "拡大・回転グリッドに適応する",
      "text": "クリアするごとに3x3から4x4、5x5、最大8x8へと拡大し数字も回転する環境で45秒間集中力を維持します。"
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
      "name": "シュルテテーブル（Schulte Table）とは何ですか？どのような効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "シュルテテーブルとは、ドイツの精神科医ヴァルター・シュルテが考案した視覚探索テストです。マス目状にランダム配置された数字を1から順に探すことで、周辺視野の拡大、視覚情報処理速度、眼球跳躍運動（サッカード）、持続的集中力の向上が期待されます。"
      }
    },
    {
      "@type": "Question",
      "name": "シュルテテーブルが速読に効果的と言われる理由は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "通常の読書では視線を中心視（中心窩）だけで一文字ずつ追いますが、シュルテテーブルを習慣化すると副中心窩・周辺視野が広がり、一行や複数単語を一度の視線停止（固視）で瞬時に捉えられるようになるためです（Rayner, 1998）。"
      }
    },
    {
      "@type": "Question",
      "name": "正しいトレーニングのコツや視線の使い方は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "最も重要なのは「目を激しくキョロキョロ動かさない」ことです。盤面の中央付近をぼんやり見つめ、視野の端に映る数字の影を意識しながら周辺視野で次の数字を探すのが科学的に最も効果的なやり方です（Lu et al., 2022）。"
      }
    },
    {
      "@type": "Question",
      "name": "何秒でクリアできれば優秀ですか？基準タイムは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "標準的な5×5グリッド（25マス）の場合、25秒未満でクリアできれば上級者レベルです。本ドリルの45秒タイムアタックでは、6×6や7×7に到達し6,000点以上を獲得できればプロアスリート水準の視野と判断力を備えています。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜマス目が大きくなったり数字が回転したりするのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "盤面が広がることでより広い周辺視野が強制され、数字の回転ノイズが加わることで脳の腹側視覚路が形状の本質的特徴を抽出する認知負荷が高まり、実戦的な集中維持力が鍛えられるためです（Treisman & Gelade, 1980）。"
      }
    },
    {
      "@type": "Question",
      "name": "スポーツ選手やeスポーツプレイヤーもこの訓練を行っていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。F1レーサー、パイロット、FPSプロゲーマーなど、視界の隅の敵や障害物をコンマ数秒で察知する必要がある多くの競技者が視野訓練として導入しています。"
      }
    },
    {
      "@type": "Question",
      "name": "1日にどのくらい練習するのが効果的ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1日5〜10分程度（3〜5回）で十分です。目の筋肉の疲労は眼球運動の精度を落とすため、長時間ダラダラ行うよりも毎日短時間のルーティンを継続することが神経可塑性を促します。"
      }
    },
    {
      "@type": "Question",
      "name": "間違えた数字をタップすると制限時間が減りますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "制限時間は減りませんが、画面がフラッシュして注意を促し、最終的な正答率（Accuracy %）が低下します。焦って適当に連打するのではなく、正確な視野確認が評価されます。"
      }
    },
    {
      "@type": "Question",
      "name": "スマートフォンやタブレットのタッチ操作でも使えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、完全対応しています。スマホ画面を両手持ちして親指でタップしたり、タブレットを机に置いて人差し指でタップしたりと直感的な操作が可能です。"
      }
    },
    {
      "@type": "Question",
      "name": "利用は無料ですか？アプリのダウンロードは必要ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "完全無料です。アプリのインストールやアカウント登録、課金などは一切不要で、Webブラウザを開くだけで即座に無制限でトレーニングできます。"
      }
    }
  ]
};

const concentrationGridGuideJa = {
  heading: "シュルテテーブル完全ガイド＆周辺視野・視覚探索の認知科学",
  intro: [
    "シュルテテーブル（Schulte Table / Concentration Grid）は、視覚認知心理学および眼球運動研究において最も広く採用されている周辺視野・注意力診断ツールです。ドイツの精神医学者ヴァルター・シュルテ（1962）によって開発され、5×5のマス目に無作為に配置された1から25までの数字を、中心への視線固定を保ちながら昇順に素早く見つけ出す伝統的なプロトコルに基づいています。",
    "スポーツ心理学の領域では「コンセントレーショングリッド」（Harris & Harris, 1984）として発展し、テニス、モータースポーツ、野球などのトップアスリートが視覚探索速度と極限状態での注意持続力を鍛えるために採用してきました。8〜11歳の子どもを対象とした事象関連電位（ERP）研究では、順序探索は単一探索よりも大きな認知負荷を伴い、色ノイズの追加によって脳波の潜時が有意に遅延することが確認されています（Lu et al., 2022）。",
    "SkillDrillsのシュルテテーブルトレーナーは、この古典的課題を現代的な持続的実行課題（Continuous Performance Task）へと進化させました。固定された1枚の盤面ではなく、クリアするごとに3×3から最大8×8へと盤面が段階的に拡大し、5×5以降は数字の回転ノイズが発生。45秒の制限時間内で有効視野の限界と中心窩・周辺視野の協調運動を限界まで刺激します（Treisman & Gelade, 1980; Wolfe, 2007）。",
    "精密測定クロノメトリー：すべてのタップ操作はブラウザの高精度 performance.now() タイマーを用いてミリ秒単位でクライアント側で直接計測されます。ブラウザのSpectre対策（約1msの量子化）やディスプレイのリフレッシュレート（60Hzで約16.7ms、Woods et al., 2015）を考慮し、同一ハードウェア環境下での長期的な自己記録更新を重視することを推奨します。",
    "データプライバシー：SkillDrillsはユーザーのスコアデータを外部サーバーへ送信・収集しません。すべての成績や設定はブラウザのローカルストレージ（localStorage）にのみ保存されます。",
    "本ドリルは視覚探索力と集中力の向上を目的とした無料のトレーニングゲームであり、ADHDや発達障害、視覚機能障害の臨床診断や治療を目的とした医療機器ではありません。健康上のご懸念がある場合は、専門の医療機関にご相談ください。"
  ],
  benchmarks: {
    title: "周辺視野・集中力スコア基準＆パフォーマンス階層（45秒セッション）",
    headers: ["評価ランク", "スコア (45秒)", "到達グリッド", "探索潜時", "認知神経科学的評価"],
    rows: [
      ["S+（エリート）", "8,000点以上", "7×7以上 (49マス+)", "300ミリ秒未満 / 文字", "世界水準の視覚スキャン速度、極めて広大な周辺視野、即時の回転不変性を獲得した状態。"],
      ["S（マスター）", "6,000 – 7,999点", "6×6 (36マス)", "300 – 450ミリ秒 / 文字", "卓越した視覚探索効率。淀みのない副中心窩先読み（Lookahead）と最小限の固視停止。"],
      ["A（上級）", "4,500 – 5,999点", "5×5 (25マス)", "450 – 600ミリ秒 / 文字", "高度な視野情報処理。中密度グリッドにおける連続したペア・チャンキングの維持。"],
      ["B（中級・熟練）", "3,000 – 4,499点", "4×4 (16マス)", "600 – 800ミリ秒 / 文字", "平均以上の探索規律。盤面が拡大した際に中心への再固定によるわずかな減速が発生。"],
      ["C（初中級）", "1,800 – 2,999点", "3×3 (9マス)", "800 – 1,100ミリ秒 / 文字", "標準的な基本探索力。数字から数字へ目を大きく往復させる中心窩サッカードに依存。"],
      ["D（発展・基礎）", "1,800点未満", "3×3 (一部未達)", "1,100ミリ秒超 / 文字", "視覚的混雑（クラウディング）の干渉を受けやすく、サッカード回数が多く探索が停滞。"]
    ],
    note: "これらの評価基準は視覚探索と注意力に関する認知科学文献（Lu et al., 2022; Treisman & Gelade, 1980; Rayner, 1998; Wolfe, 2007）に基づく指標です。スコアは画面のリフレッシュレート、入力デバイス、眼精疲労度によって変動します。"
  },
  techniques: {
    title: "科学的エビデンスに基づく4大視覚探索テクニック",
    items: [
      {
        name: "中心固定注視と周辺視野解放",
        desc: "盤面の中央に視線を柔らかく置き、目を個別のマス目へ動かさずに周辺視野で周囲の数字を捉えます。頭や目を動かさないことで疲労を防ぎ、探索速度が跳ね上がります（Lu et al., 2022）。",
        tips: "視線を固定し、視野全体を写真のようにぼんやりと捉える意識を持ちましょう。"
      },
      {
        name: "先読みチャンキング（Lookahead Technique）",
        desc: "「3」を探している最中に「4」が目に入ったら、その座標を空間作業記憶（ワーキングメモリ）に保持します。「3」を押した瞬間、ノータイムで「4」へ移動します（Rayner, 1998）。",
        tips: "常に1〜2個先の数字の位置を頭の地図にストックしながらタップを繋げてください。"
      },
      {
        name: "特徴統合と誘導探索（Wolfe, 2007）",
        desc: "次に探す数字の幾何学的形状（丸み、直線、角）を意識することで、視覚野の特徴検出器が活性化し、無作為な探索を排除してターゲットが自然と浮き上がって見えるようになります。",
        tips: "探す数字の形を心の中で強くイメージしてから盤面をスキャンします。"
      },
      {
        name: "回転不変性の抽出",
        desc: "傾いた数字は脳の形状テンプレートと一致しにくくなります。数字全体ではなく、ループ（輪）や交差線など固有の不変特徴に注目することで回転ノイズを瞬時に見破ります。",
        tips: "数字を頭の中で回転させて直そうとせず、特徴的なパーツで判断します。"
      }
    ]
  },
  steps: [
    "グリッドの中央に視点をリラックスさせて置きます。",
    "「1」を見つけてタップし、カウントを開始します。",
    "現在の数字を押しながら、周辺視野で次の数字を探してタップを連続させます。",
    "5×5、6×6、7×7へと拡大する盤面をテンポよく突破していきます。",
    "回転する数字の干渉を退けながら、45秒間の集中を持続させます。"
  ],
  audience: "速読を習得したい読書家、受験生、パイロット志望者、FPSなどの反射神経を鍛えたい競技プレイヤー、脳の活性化を目指す全ての人。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('lu2022', 'treisman1980', 'rayner1998', 'rayner2016', 'wolfe2007', 'woods2015'),
  related: [
    { href: "/ja/drills/cognitive/focus/distraction-fighter", label: "ストループテスト (Stroop Test)" },
    { href: "/drills/cognitive/attention/concentration-stamina", label: "持続的注意集中力テスト" },
    { href: "/drills/cognitive/attention/divided-attention", label: "分割的注意テスト" },
    { href: "/drills/cognitive/processing-speed/rsvp-reader", label: "速読スピードテスト" },
    { href: "/drills/cognitive/processing-speed/symbol-matching", label: "符号数字変換テスト" },
    { href: "/drills/cognitive/processing-speed/reaction-time", label: "神経反応速度テスト" }
  ]
};

const copyJa = {
  h1Keyword: "シュルテテーブル",
  h1Suffix: " – 無料オンライン周辺視野・集中力グリッド",
  caption: "拡大するシュルテテーブル上で連続する数字を素早くタップ。速読に必要な周辺視野の拡大、視覚探索速度、持続的集中力をトレーニングします。",
  statScore: "スコア",
  statTime: "残り時間",
  statGridSize: "グリッド",
  statBest: "自己ベスト",
  hudTarget: "次の数字:",
  startTitle: "シュルテテーブル Pro",
  startSubtitle: "連番数字探索 • 拡大シュルテグリッド • 周辺視野拡張",
  startButtonText: "トレーニング開始",
  getReady: "構えてください",
  statPoints: "スコア",
  statAccuracy: "正確度",
  statGridsCleared: "クリア盤面",
  statPeakGrid: "最大グリッド",
  playAgainText: "もう一度挑戦",
  shareText: "スコアをシェア",
  exitText: "終了",
  stageCaption: "制限時間内に拡大するグリッド上の数字を1から順に素早く見つけてタップしてください。",
  rulesTitle: "ドリルルールとスコアシステム",
  rulesItems: [
    { title: "連番探索", text: "1から順に一番大きい数字まで、連続する数字を正確にタップしていきます。" },
    { title: "拡大グリッド", text: "盤面をクリアするごとにサイズが拡大（3×3 → 4×4 → 5×5...）し、より広い周辺視野が要求されます。" },
    { title: "45秒ワンセッション", text: "45秒間の固定タイムアタック。盤面をクリアしても時計は増えず、純粋な集中持久力が試されます。" },
    { title: "正確性重視", text: "誤タップは警告フラッシュが光り正確度が下がりますが、時間は止まりません。落ち着いて探しましょう。" }
  ],
  aboutTitle: "シュルテテーブルと集中力グリッドについて",
  aboutLead: "シュルテテーブルは、周辺視野の有効範囲を広げ、視覚スキャン中の視線停止遅延を短縮するために開発された心理診断グリッドです（Lu et al., 2022; Rayner, 1998）。",
  aboutCards: [
    { title: "対象プレイヤー", text: "速読をマスターしたい読書家、受験生、F1レーサー、eスポーツ選手など、一瞬で広範囲の視覚情報を処理したい方。", color: "bg-blue-600" },
    { title: "鍛えられる能力", text: "視覚探索スピード、衝動性眼球運動（サッカード）効率、空間走査規律、持続的集中力。", color: "bg-emerald-600" },
    { title: "周辺視野の拡大", text: "盤面が広がるほど網膜の周辺視野を使わざるを得なくなり、視点を動かさずに捉えられる視野角が拡大します。", color: "bg-purple-600" }
  ]
};

export default function ConcentrationGridPageJa() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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

      <ConcentrationGridClient copy={copyJa} />
      <DrillGuide guide={concentrationGridGuideJa} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="/drills/cognitive/focus/concentration-grid" locale="ja" />
      </div>
    </>
  );
}
