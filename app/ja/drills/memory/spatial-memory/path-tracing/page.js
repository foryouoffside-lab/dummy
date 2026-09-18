import PathTracingClient from '@/app/drills/memory/spatial-memory/path-tracing/PathTracingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "順番記憶テスト・コルシブロック課題 – 空間系列再生 | SkillDrills",
  description: "無料の順番記憶テスト（コルシブロックテスト / Path Tracing）。点灯するタイルの移動軌跡を記憶し、提示された正確な順序でなぞることで空間系列記憶とインナー・スクライブの作業記憶スパンを測定・強化。登録不要。",
  keywords: ['順番記憶テスト', '順番記憶', '順番記憶 ゲーム', 'コルシブロックテスト', '空間系列記憶', 'パストレーシング テスト', '移動軌跡 記憶', '空間ワーキングメモリ 検査', '視空間系列 課題', 'インナースクライブ 訓練', '短期系列記憶 測定', '脳トレ 順序記憶'],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/memory/spatial-memory/path-tracing",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/path-tracing', 'ja'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "順番記憶テスト (コルシブロック課題) - 無料認知トレーニング | SkillDrills",
    description: "無料の順番記憶テスト（コルシブロックテスト / Path Tracing）。点灯するタイルの移動軌跡を記憶し、提示された正確な順序でなぞることで空間系列記憶とインナー・スクライブの作業記憶スパンを測定・強化。登録不要。",
    url: "https://skilldrills.online/ja/drills/memory/spatial-memory/path-tracing",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "順番記憶テスト (コルシブロック課題) - 無料認知トレーニング | SkillDrills",
    description: "無料の順番記憶テスト（コルシブロックテスト / Path Tracing）。点灯するタイルの移動軌跡を記憶し、提示された正確な順序でなぞることで空間系列記憶とインナー・スクライブの作業記憶スパンを測定・強化。登録不要。",
  },
};

export const dynamic = 'force-static';

export default function LocalizedPathTracingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "記憶力トレーニング", "item": "https://skilldrills.online/ja/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "空間記憶", "item": "https://skilldrills.online/ja/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "順番記憶テスト", "item": "https://skilldrills.online/ja/drills/memory/spatial-memory/path-tracing" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "順番記憶テスト (コルシブロック課題・パストレーシング)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "光るタイルの移動軌跡を記憶し正確な順番でなぞることで、空間系列記憶、方向ベクトルチャンキング、およびインナー・スクライブの作業記憶スパンを測定する無料ブラウザ神経心理学テスト。",
    "genre": "Cognitive Assessment / Spatial Memory",
    "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/path-tracing",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "順番記憶テスト (コルシブロック課題・パストレーシング)",
    "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/path-tracing",
    "description": "光るタイルの移動軌跡を記憶し正確な順番でなぞることで、空間系列記憶、方向ベクトルチャンキング、およびインナー・スクライブの作業記憶スパンを測定する無料ブラウザ神経心理学テスト。",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "順番記憶テスト (コルシブロック課題・パストレーシング)",
    "description": "光るタイルの移動軌跡を記憶し正確な順番でなぞることで、空間系列記憶、方向ベクトルチャンキング、およびインナー・スクライブの作業記憶スパンを測定する無料ブラウザ神経心理学テスト。",
    "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/path-tracing",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Sequence Memory"],
    "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "value": 1
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
            "@type": "Question",
            "name": "順番記憶テスト（Path Tracing Memory Test）とは何ですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "画面上のグリッド内で順番に点灯するタイルの移動軌跡を記憶し、提示された時系列の通りに正確になぞって再現する空間系列記憶（Sequential Spatial Working Memory）評価テストです。"
            }
      },
      {
            "@type": "Question",
            "name": "コルシブロック課題（Corsi Block-Tapping Task）とは何ですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "1972年にピエトロ・コルシが開発した神経心理学の世界標準検査です。検者が不規則に配置されたブロックを順に指差し、被験者が同じ順序（または逆順）で再現することで、非言語性の空間作業記憶スパンを測定します。"
            }
      },
      {
            "@type": "Question",
            "name": "作業記憶における「インナー・スクライブ（Inner Scribe）」とは何ですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ロバート・ロギー（Logie, 1995）が提唱した概念で、視空間スケッチパッドのうち静的な視覚イメージを保持する「視覚キャッシュ」とは異なり、動的な運動軌跡や空間的推移を能動的にリハーサル・保持する神経機構です。"
            }
      },
      {
            "@type": "Question",
            "name": "一般的な成人の空間系列記憶スパン（Corsi Span）の平均はどのくらいですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kesselsら（2000）の標準化研究によると、健常な成人の順唱空間スパンの平均は5.4 ± 0.9項目です。8ステップ以上の軌跡を正確に保持できる人は極めて高い空間チャンキング能力を有しています。"
            }
      },
      {
            "@type": "Question",
            "name": "方向ベクトルチャンキングとはどのような記憶術ですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "独立したマス目の座標を個別に覚えるのではなく、『右上へ斜め2つ、左へ1つ』のように連続した動きの矢印（幾何学パターン）として情報を圧縮する技法です。これによりコーワン限界（4項目）の制約を突破できます。"
            }
      },
      {
            "@type": "Question",
            "name": "静的な瞬間記憶テスト（Visual Matrix）との違いは何ですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "静的グリッドテストは全マスが同時に光るため一枚の静止画像（視覚キャッシュ）として記憶できます。一方、パストレーシングは「時間の順序情報（時間的順序符号化）」を保持し続ける必要があるため、インナー・スクライブが不可欠です。"
            }
      },
      {
            "@type": "Question",
            "name": "ステップ数が長くなると急激に難しくなるのはなぜですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ネルソン・コーワン（2001）が示したように、未加工の情報に対する焦点化ワーキングメモリの容量は厳密に4項目前後に制限されているためです。5ステップを超えるとチャンキングなしでは記憶痕跡が急速に忘却されます。"
            }
      },
      {
            "@type": "Question",
            "name": "空間系列記憶は日常生活やゲームのどのような場面で使われますか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "街中の道順の記憶、ダンスやスポーツの振り付け・連続動作の習得、ゲーム（FPSやMOBA）における巡回ルートやスキル連携の最適化など、一連の空間的順序を正確にたどるあらゆる場面で活用されます。"
            }
      },
      {
            "@type": "Question",
            "name": "タップを間違えた場合のペナルティはありますか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "いいえ。間違ったセルをタップしてもスコアの減点や制限時間の短縮はありません。現在のレベルの難易度のまま新たな軌跡で再挑戦できるため、落ち着いてチャンキング技術を磨くことができます。"
            }
      },
      {
            "@type": "Question",
            "name": "順番記憶力は練習によって向上させることができますか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい。継続的なトレーニングによってインナー・スクライブの運動シミュレーション効率が向上し、方向ベクトルのパターン化（幾何学的チャンク化）が自動化され、より長い経路を瞬時に保持できるようになります。"
            }
      }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "順番記憶テストで空間系列スパンを拡張する方法",
    "description": "方向ベクトルチャンキングと運動前野による内的リハーサルを活用し、経路軌跡の記憶スパンを伸ばすための4段階実践プロトコル。",
    "step": [
      {
            "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/path-tracing#step-1",
            
            "name": "始点への注視と大局的視野の確保",
            "text": "最初に光る始点セルに視線を置きつつ、個々のセルを目で追うのではなくグリッド全体を視野に収めて軌跡の方向性を捉えます。"
      },
      {
            "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/path-tracing#step-2",
            
            "name": "方向ベクトルへのチャンキング圧縮",
            "text": "個別の座標ではなく、『右へ2マス、上へ1マス』『L字カーブ』のように方向ベクトルとしてひとまとめ（チャンク化）にして記憶します。"
      },
      {
            "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/path-tracing#step-3",
            
            "name": "インナー・スクライブによる運動リハーサル",
            "text": "刺激提示後のわずかな保持期間中に、指を動かすイメージを脳内で連続的になぞり、運動記憶痕跡の減衰を防ぎます。"
      },
      {
            "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/path-tracing#step-4",
            
            "name": "リズミカルな等拍タップでの再生",
            "text": "迷って一時停止すると系列記憶が急速に薄れるため、まとめたベクトルを一息のリズムで淀みなくタップして回答します。"
      }
]
  };

  const pathTracingGuide = {
    intro: [
      "順番記憶テスト（Path Tracing Memory Test）は、空間系列作業記憶、動的経路保持、および方向軌跡の再構成能力を評価・トレーニングするために設計された神経心理学ドリルです。ブレンダ・ミルナー（Milner, 1971）およびピエトロ・コルシ（Corsi, 1972）による記念碑的なコルシブロック課題と、ロバート・ロギー（Logie, 1995）の「インナー・スクライブ」モデルに立脚し、静的な図形記憶とは独立した動的な時空間運動符号化能力を測定します。",
      "各試行において、拡大する3×3〜7×7のグリッド上でタイルが一定のリズム（約500ms間隔）で順番に点灯します。参加者は空間座標と時間的提示順序の両方を同時に脳内で符号化し、消灯後に同じ順番で経路を完全にたどる必要があります。",
      "作業記憶の理論的枠組みにおいて、ロギー（Logie, 1995）とアラン・バドリー（Baddeley, 2000）は、連続した運動推移が「インナー・スクライブ」と呼ばれる空間的リハーサル機構によって保持されることを実証しました。またジョージ・ミラー（Miller, 1956）とハーバート・サイモン（Simon, 1974）は系列課題におけるチャンキング（情報圧縮）の重要性を証明し、ネルソン・コーワン（Cowan, 2001）は補助を用いない焦点化短期記憶の容量限界が約4項目であることを突き止めました。",
      "コンピュータ化コルシ課題に関する標準規範研究（Kessels et al., 2000）において、健常成人の平均空間スパンは5.4 ± 0.9ステップと規定されており、空間系列記憶が疲労や睡眠不足、前頭葉の実行機能の状態に極めて敏感に反応することが示されています。",
      "測定の仕組み：すべてのイベントはブラウザの performance.now() 高精度クロックを用いてミリ秒単位で完全にデバイス上で計測され、外部サーバーへスコアが送信されることはありません。Spectre対策によりブラウザタイマーは約1ミリ秒に丸められ、ディスプレイのリフレッシュレート（60Hz環境で約16.7ms）によってフレーム描画が量子化されます（Woods et al., 2015）。5ミリ秒未満の微小な差異は測定ノイズとして扱い、同一ハードウェア上でのスコア推移を追跡してください。",
      "データ透明性：SkillDrillsは集約データを一切収集しません。スコアと設定はお使いのブラウザのlocalStorageにのみ保存され、外部送信されないため、当サイトがユーザー平均値や順位、プレイヤー数を公表することはありません。本ページに記載されたすべての数値は、下記の参考文献に掲載された学術研究に基づいています。",
      "本ドリルは練習と興味を目的とした無料のブラウザゲームです。医療機器、診断ツール、または疾患のスクリーニングや治療を目的としたものではなく、ここでのスコアが医学的な健康状態や記憶力を証明するものではありません。記憶力や認知機能に関して不安がある場合は、専門の医師または医療機関にご相談ください。"
],
    benchmarks: {
      title: "空間系列記憶スパン・コルシブロック課題の標準規範ベンチマーク",
      headers: ["パフォーマンス層", "スパン長 & グリッド規模", "ドリルスコア", "認知プロファイル & 軌跡保持特性"],
      rows: [
        [
                "第1層（極めて優秀 / 上位1%水準）",
                "スパン 10 – 14+ ステップ（6×6〜7×7グリッド）",
                "1,200点以上",
                "視空間系列エリート水準。複雑な長大ルートを2〜3個の方向マクロベクトルに分解；卓越したインナー・スクライブ保持力；400ms未満の高速等拍タップ"
        ],
        [
                "第2層（優秀 / 上位15%水準）",
                "スパン 8 – 9 ステップ（5×5〜6×6グリッド）",
                "900 – 1,199点",
                "一般成人の平均を大きく超過。幾何学的チャンキング（L字折れ曲がり、ジグザグ走査）を安定駆使；系列干渉に高い耐性；400〜600msのタップ速度"
        ],
        [
                "第3層（標準的成人平均 / 50パーセンタイル）",
                "スパン 5 – 7 ステップ（4×4〜5×5グリッド）",
                "600 – 899点",
                "健常成人の標準規範値（Corsi, 1972; Kessels et al., 2000, 5.4 ± 0.9スパン）。5〜6ステップを安定再現；5×5グリッドの中間折れ曲がり点で欠落が発生；600〜850ms"
        ],
        [
                "第4層（平均未満 / 系列減衰）",
                "スパン 4 ステップ（3×3〜4×4グリッド）",
                "400 – 599点",
                "未加工ワーキングメモリ限界付近（Cowan, 2001）。ベクトル化を行わず個別の点として記憶しようとするため容量超過が生じる；850〜1,100ms"
        ],
        [
                "第5層（要トレーニング / 短期スパン限界）",
                "スパン 4 ステップ未満（3×3グリッド）",
                "400点未満",
                "時間的記憶痕跡の急速な減衰；順序の取り違え（転置エラー）が頻発；3ステップを超える保持に苦慮；タップ間隔1,100ms超過"
        ]
],
      note: "スパン長およびグリッド規模は45秒セッション内で到達した最高難易度を反映。Corsi Block-Tapping標準規範に準拠。"
    },
    techniques: {
      title: "空間系列記憶スパンを拡張する認知戦略",
      items: [
        {
                "name": "方向ベクトルチャンキング（Vector Chunking）",
                "desc": "連続する移動ステップを『右へ2、上へ1、左へ2』のように方向のマクロ矢印としてまとめます（Miller, 1956; Simon, 1974）。独立したマス目ではなく幾何学的ストロークとして知覚することで、記憶負荷を60%以上低減できます。",
                "tips": "点ではなく、L字型や三角形、階段状の線画パターンを探してください。"
        },
        {
                "name": "インナー・スクライブ運動シミュレーション",
                "desc": "タイルが光る間、指先を動かす内的イメージを脳の運動前野でトレースします（Logie, 1995）。運動計画回路をあらかじめ励起させることで、視覚的記憶痕跡を運動感覚で強力にバックアップします。",
                "tips": "画面をタップする前に、手の中で軌跡の動きの感触を先取りしてイメージしましょう。"
        },
        {
                "name": "グリッド中央への周辺視固定（Parafoveal Anchoring）",
                "desc": "光るタイルごとに素早く目を走らせる（サッケード）のではなく、グリッドの中央付近に焦点を緩やかに固定し、周辺視野で全体の動きの流れを捉えます。視線の跳躍による抑制ラグを防げます。",
                "tips": "頭や視線を揺らさず、視野全体に広がる光の軌跡を映画のスクリーンのように見渡します。"
        },
        {
                "name": "リズミカルな等拍タップ（Rhythmical Pacing）",
                "desc": "再現時は迷って途中で指を止めず、均一なテンポで一気にタップします。タップ間の躊躇は後半ステップの記憶痕跡の忘却（時間的減衰）を招くため、一つの流れるような運動バーストとして出力します。",
                "tips": "一歩ずつ悩まず、頭の中のメロディのように一定のリズムで打ち込みましょう。"
        }
]
    },
    steps: [
      "グリッドの中央に視線を安定させ、点灯するタイルの移動シーケンスを観察します。",
      "タイルの点灯を個別の点ではなく、連続する方向ベクトル（矢印や図形）としてまとめます。",
      "提示終了後のわずかな合間に、インナー・スクライブ（内的運動イメージ）で経路をなぞります。",
      "記憶した順序通りに、淀みのないリズミカルなタップで正確に再現します。",
      "3×3から7×7へと拡大するグリッドを攻略し、空間系列作業記憶のスパンを極限まで鍛え上げます。"
],
    audience: "マップルートやスキルローテーションの把握を極めたい競技ゲーマー（FPS/MOBA）、ダンスやスポーツの連続動作を記憶するパフォーマー、STEM学生、および空間系列作業記憶を高めたいすべての方。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('corsi1972', 'milner1971', 'logie1995', 'cowan2001', 'baddeley2000', 'miller1956', 'simon1974', 'kessels2000', 'woods2015'),
    related: [
      {
            "href": "/drills/memory/spatial-memory/grid-memorization",
            "label": "瞬間記憶テスト (Visual Memory Test)"
      },
      {
            "href": "/drills/memory/spatial-memory/object-location",
            "label": "空間記憶テスト (Object Location Test)"
      },
      {
            "href": "/drills/memory/short-term-memory/digit-span",
            "label": "数唱テスト (Digit Span)"
      },
      {
            "href": "/drills/memory/short-term-memory/word-recall",
            "label": "単語記憶テスト (Verbal Memory)"
      },
      {
            "href": "/drills/memory/working-memory/n-back",
            "label": "nバック課題 (Dual N-Back)"
      }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <PathTracingClient
        copy={{
        "h1Keyword": "順番記憶テスト",
        "h1Suffix": " (コルシブロック課題)",
        "subtitle": "空間スパンは、順序通りに再現できる最長の移動シーケンスです。標準的な神経心理学指標であるコルシブロック課題では健常な成人の平均スパンは約5〜7ステップであり（Milner, 1971; Corsi, 1972）、言語性の数唱とは異なる脳内領域で処理されます（Logie, 1995）。",
        "statScore": "スコア",
        "statTime": "残り時間",
        "statLevel": "レベル",
        "statBestScore": "ベストスコア",
        "levelPrefix": "Lv.",
        "startTitle": "順番記憶 Pro",
        "startSubtitle": "空間系列記憶 • コルシブロック課題",
        "countdownSubtitle": "準備してください",
        "newBest": "自己新記録",
        "pointsLabel": "ポイント",
        "statAccuracy": "正解率",
        "statPeakLevel": "最高レベル",
        "statPerfects": "パーフェクト",
        "btnPlayAgain": "もう一度プレイ",
        "rulesTitle": "ドリルルール & スコア算出方法",
        "aboutTitle": "順番記憶（Path Tracing / コルシブロック）について",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "軌跡の記憶と順序再現",
                        "highlight": "+150 PTS",
                        "result": "光ったタイルの移動順序を覚え、消灯後に同じ順番でタップ"
                },
                {
                        "num": "2",
                        "text": "レベル進行とスパン拡張",
                        "highlight": "3x3 → 7x7",
                        "result": "レベル上昇に伴いグリッド規模とステップ数が自然に拡大"
                },
                {
                        "num": "3",
                        "text": "ミス・時間切れ",
                        "highlight": "ペナルティなし",
                        "result": "減点や制限時間の減少はなく、同レベルを即座に再試行"
                },
                {
                        "num": "4",
                        "text": "難易度は維持",
                        "highlight": "レベル降下なし",
                        "result": "失敗してもレベルは下がらず、空間チャンキング戦略の確立に専念可能"
                }
        ]
}}
      />
      <DrillGuide guide={pathTracingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/path-tracing"
          locale="ja"
        />
      </div>
    </>
  );
}
