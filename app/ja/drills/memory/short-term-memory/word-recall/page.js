import WordRecallClient from '@/app/drills/memory/short-term-memory/word-recall/WordRecallClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "単語記憶テスト・言語性記憶検査 – 単語再生能力測定 | SkillDrills",
  description: "無料のオンライン単語記憶テスト（単語自由再生課題）。提示される単語リストを記憶し、系列位置効果と意味的チャンキングを活用して言語性短期記憶を測定・トレーニング。",
  keywords: [
    "単語記憶テスト",
    "単語記憶",
    "単語記憶ゲーム",
    "言語性記憶 検査",
    "単語自由再生 課題",
    "系列位置効果 テスト",
    "意味的チャンキング",
    "言語性 ワーキングメモリ",
    "短期記憶 単語",
    "語彙記憶力 測定",
    "脳トレ 単語記憶",
    "自由再生法 検査"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/memory/short-term-memory/word-recall",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/word-recall', 'ja'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "単語記憶テスト・言語性記憶検査 – 単語再生能力測定 | SkillDrills",
    description: "無料のオンライン単語記憶テスト（単語自由再生課題）。提示される単語リストを記憶し、系列位置効果と意味的チャンキングを活用して言語性短期記憶を測定・トレーニング。",
    url: "https://skilldrills.online/ja/drills/memory/short-term-memory/word-recall",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "単語記憶テスト・言語性記憶検査 – 単語再生能力測定 | SkillDrills",
    description: "無料のオンライン単語記憶テスト（単語自由再生課題）。提示される単語リストを記憶し、系列位置効果と意味的チャンキングを活用して言語性短期記憶を測定・トレーニング。",
  },
};

export const dynamic = 'force-static';

export default function LocalizedWordRecallPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "記憶力トレーニング", "item": "https://skilldrills.online/ja/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "短期記憶", "item": "https://skilldrills.online/ja/drills/memory/short-term-memory" },
      { "@type": "ListItem", "position": 4, "name": "単語記憶テスト", "item": "https://skilldrills.online/ja/drills/memory/short-term-memory/word-recall" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "単語記憶テスト・単語再生テスト（Verbal Memory Test）",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "提示された単語リストを記憶し自由再生で入力することで、言語性短期記憶、作業記憶容量、および意味的符号化効率を測定する無料ブラウザ神経心理学テスト。",
    "genre": "Cognitive Assessment / Verbal Memory",
    "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/word-recall",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "単語記憶テスト・単語再生テスト（Verbal Memory Test）",
    "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/word-recall",
    "description": "提示された単語リストを記憶し自由再生で入力することで、言語性短期記憶、作業記憶容量、および意味的符号化効率を測定する無料ブラウザ神経心理学テスト。",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "単語記憶テスト・単語再生テスト（Verbal Memory Test）",
    "description": "提示された単語リストを記憶し自由再生で入力することで、言語性短期記憶、作業記憶容量、および意味的符号化効率を測定する無料ブラウザ神経心理学テスト。",
    "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/word-recall",
    "genre": ["Memory Game", "Cognitive Training", "Brain Game"],
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
        "name": "単語記憶テスト（Verbal Memory Test）とは何ですか？",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "言語性短期記憶、作業記憶（ワーキングメモリ）スパン、および即時自由再生能力を測定するための代表的な神経心理学評価です。被験者は一連の単語リストを記憶し、提示順序に縛られることなく覚えている単語を自由に再生・入力します。"
        }
    },
    {
        "@type": "Question",
        "name": "自由再生（Free Recall）と再認（Recognition）の違いは何ですか？",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "再認は提示された単語を見て『見たことがあるか』を判断する受動的課題です。一方、自由再生は手がかりなしに記憶痕跡を自発的に検索・復元する必要があり、認知負荷がはるかに高く、真の記憶容量を正確に反映します。"
        }
    },
    {
        "@type": "Question",
        "name": "一般的な成人の単語記憶テストの平均スコアはどのくらいですか？",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "臨床標準の単語リスト検査（RAVLTなど）では、未学習のリスト初回試行における健康な成人の即時再生平均は約4〜6語です。本ドリルは異なる単語数と時間設定を用いているため、スコアは医学的診断結果ではなく個人的な練習指標として活用してください。"
        }
    },
    {
        "@type": "Question",
        "name": "レイ聴性言語学習検査（RAVLT）とは何ですか？",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "1958年にスイスの心理学者アンドレ・レイによって開発された世界標準の言語性記憶検査です。15語のリストを複数回提示し、即時記憶スパン、順向・逆向干渉、および遅延再生能力を定量評価します。"
        }
    },
    {
        "@type": "Question",
        "name": "系列位置効果（Serial Position Effect）とは何ですか？",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "ベネット・マードック（1962）が数理モデル化した現象で、リストの最初（初頭効果：長期記憶への定着）と最後（新近効果：感覚反響記憶の残存）の単語の再生率が高く、中央部の単語が最も忘れられやすいというU字型の記憶曲線を示します。"
        }
    },
    {
        "@type": "Question",
        "name": "なぜ真ん中の単語を最も忘れやすいのですか？",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "リスト中央部の単語は、先に出現した単語による『順向干渉』と、後から提示される単語による『逆向干渉』の両方を同時に受けるため、ワーキングメモリ内で最大の情報競合・忘却が発生します。"
        }
    },
    {
        "@type": "Question",
        "name": "物語連想法（ナラティブ・チャンキング）はなぜ記憶を劇的に伸ばすのですか？",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "クレイグ＆ロックハート（1972）の処理水準モデルが示すように、単なる機械的暗唱よりも深い意味的処理を行うことで、複数の独立した単語が一つの強固なエピソード記憶スキーマに統合され、検索成功率が飛躍的に高まります。"
        }
    },
    {
        "@type": "Question",
        "name": "自由再生テストにおいて入力する順番は関係ありますか？",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "いいえ。自由再生パラダイムでは、思い出した順序で入力して構いません。提示順序に縛られないことで、順序追跡の負荷を排除し、純粋な言語記憶の保持容量と検索効率を測定できます。"
        }
    },
    {
        "@type": "Question",
        "name": "単語記憶の練習は日常の記憶力を向上させますか？",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "本ドリルで習得する連想ストーリー化や意味的クラスタリングなどの記憶方略（ニーモニック）は、買い物リストや試験勉強など他の記憶場面に応用可能です。ただし全般的な脳機能向上を保証するものではなく、医療機器や診断ツールではありません。"
        }
    },
    {
        "@type": "Question",
        "name": "このオンライン単語記憶テストは無料で利用できますか？",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい、SkillDrillsの単語記憶テストは完全無料です。ソフトウェアのダウンロードや会員登録は一切不要で、ブラウザ内でミリ秒精度の測定と適応型トレーニングを即座に体験できます。"
        }
    }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "単語記憶テストで言語性自由再生能力を高める方法",
    "description": "物語連想法（ナラティブ・チャンキング）と新近効果の即時解放を組み合わせ、単語記憶スパンを拡張するための4段階実践プロトコル。",
    "step": [
    {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/word-recall#step-1",
        "name": "単語の視覚的受容と内言語化",
        "text": "記憶フェーズ中に画面上に提示された単語を視認し、心の中で明瞭に発音しながら具体的なイメージを脳裏に思い浮かべます。"
    },
    {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/word-recall#step-2",
        "name": "連想ストーリー（ナラティブ）の構築",
        "text": "無関係な単語同士を奇抜で鮮明な一つのミニストーリーに結びつけ（例：'騎士が山でランタンを掲げた'）、情報単位を圧縮します。"
    },
    {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/word-recall#step-3",
        "name": "末尾の新近単語（Recency）の即時入力",
        "text": "入力フェーズが始まったら、数秒で減衰する直前の末尾2〜3単語を、頭に残る音韻残響から最優先で一気に入力します。"
    },
    {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/word-recall#step-4",
        "name": "冒頭ストーリーの展開と送信",
        "text": "新近単語を吐き出したら、構築した連想ストーリーを頭から再生して初頭の単語を順に入力し、Enterキーで送信します。"
    }
]
  };

  const wordRecallGuide = {
    heading: "単語記憶テスト ガイド & 言語性自由再生の科学",
    intro: [
      "単語記憶テスト（Verbal Memory Test）は、言語性短期記憶、意味的符号化、および即時自由再生能力を測定・強化するために設計された本格的な認知トレーニングです。外部の手がかりなしに頭の中の記憶痕跡を検索する自由再生は、人間の認知機能において最も負荷の高い課題の一つです。",
      "言語性記憶の科学的探求はヘルマン・エビングハウス（1885）の忘却曲線と系列学習の研究に始まります。1958年にはアンドレ・レイがレイ聴性言語学習検査（RAVLT）を提唱し、即時スパンと干渉の影響を客観的に評価する標準プロトコルを確立しました。",
      "1962年、ベネット・マードックは自由再生における系列位置効果を定式化し、長期記憶に転送される初頭効果と感覚反響に残る新近効果の相互作用を解明しました。さらにクレイグ＆ロックハート（1972）は『処理水準アプローチ』を提唱し、物語構築などの深い意味的処理が単純な反復暗記を圧倒することを実証しました。",
      "本ドリルはブラウザの高精度タイムスタンプ（performance.now()）を活用し、適応型階段法によりあなたの真の言語記憶スパンへ自然に収束します。外部へのデータ送信は一切行われず、結果はすべてローカルブラウザ内で安全に完結します。"
],
    benchmarks: {
      title: "言語性自由再生 & 単語スパンの標準ベンチマーク",
      headers: ["パフォーマンス階層", "単語スパン（語数）", "自由再生スコア", "認知的特性 & 検索プロファイル"],
      rows: [
        [
                "Tier 1（優秀 / 上位1%水準）",
                "8 〜 11語以上",
                "1,100+ ポイント",
                "記憶術の達人。深い物語連想を瞬時に構築し、逆向干渉を完全に克服。1語あたり800ms未満の高速想起を実現"
        ],
        [
                "Tier 2（上位平均 / 上位15%水準）",
                "6 〜 7語",
                "850 〜 1,099 ポイント",
                "成人の標準平均を超過。単語を2〜3語ずつの意味の塊にまとめ、時間制限下でも安定した自由再生を維持"
        ],
        [
                "Tier 3（標準成人水準 / 50%水準）",
                "4 〜 5語",
                "550 〜 849 ポイント",
                "未学習リスト初回試行の一般平均。典型的な系列位置効果を示し、中間部の単語が脱落しやすい"
        ],
        [
                "Tier 4（境界域 / 言語記憶ボトルネック）",
                "3語",
                "350 〜 549 ポイント",
                "意味的符号化を行わず音韻反響のみに依存。新近記憶バッファを超える単語の保持に困難を示す"
        ],
        [
                "Tier 5（スパン低下水準）",
                "3語未満",
                "350ポイント未満",
                "記憶痕跡の減衰が極めて速く、強い順向干渉を受ける。外部の手がかりなしでは想起が困難"
        ]
],
      note: "単語スパンは適応型階段法で達成された最大エラーフリー長です。標準スコアは成人の自由再生試行1ベースライン（Rey, 1964; Murdock, 1962; Woods et al., 2015）を反映しています。"
    },
    techniques: {
      title: "言語性自由再生スパンを拡大するための実証プロトコル",
      items: [
        {
                "name": "物語連想結合法（ナラティブ・チェーン）",
                "desc": "無関係な単語を突飛で鮮明な一つの心象ストーリーに紡ぎます（Craik & Lockhart, 1972）。『鷲』『城』『ランタン』を『ランタンをくわえた鷲が城の屋根に舞い降りた』と統合することで、3つの要素が1つのエピソード記憶に変換されます。",
                "tips": "イメージが誇張され、色彩豊かで、非現実的であるほど脳の記憶痕跡は強固になります。"
        },
        {
                "name": "二重符号化法（視覚イメージ ＋ 音韻反響）",
                "desc": "アラン・ペイビオの二重符号化説を活用し、単語の文字を心の中で発音すると同時に、その物体の形状や質感を視覚化します。視覚と聴覚の2系統の神経経路で同時に保存することで想起率が倍増します。",
                "tips": "単語を発音する際、0.5秒間その物体の色やディテールを具体的に思い浮かべます。"
        },
        {
                "name": "意味的クラスタリング（カテゴリー分類）",
                "desc": "提示された単語を提示順序にかかわらず概念カテゴリー（自然、建築、宝物、道具など）に頭の中で再分類します（Tulving, 1962）。同カテゴリーの単語が相互に想起の引き金となります。",
                "tips": "『城・神殿＝建物』『ダイヤ・金＝財宝』のように共通タグを付与します。"
        },
        {
                "name": "新近単語の先行ダンピング戦略",
                "desc": "入力フェーズ開始直後に、最後に表示された2〜3単語を即座に入力します（Murdock, 1962）。直前の単語は3〜5秒で消滅する反響記憶にあるため、先に吐き出すことで脳の容量を物語想起に集中できます。",
                "tips": "最後に見た単語をまず打鍵し、息を整えてから物語の冒頭を順にたどります。"
        }
]
    },
    steps: [
      "提示エリアの中心に視線を固定し、単語の出現に全注意を集中させます。",
      "単語が表示されたら、瞬時に次の単語と結びつけて一つの鮮やかな物語を紡ぎます。",
      "各単語の具体的イメージを心に描き、視覚と内言語の二重符号化を確立します。",
      "入力欄が開いたら、直前の単語を即座に入力してからストーリーを展開します。",
      "適応型難易度調整により、あなたの言語性記憶の限界スパンを安全に拡大します。"
],
    audience: "試験勉強の暗記効率を高めたい学生、プレゼンや会話での言語想起力を鍛えたい社会人、および言語性ワーキングメモリの維持・向上を目指すすべての方。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('craik1972', 'murdock1962', 'tulving1962', 'woods2015'),
    related: [
      { href: "/drills/memory/short-term-memory/digit-span", label: "Digit Span Memory Test" },
      { href: "/drills/memory/short-term-memory/color-sequence", label: "Color Memory Game" },
      { href: "/drills/memory/spatial-memory/grid-memorization", label: "Visual Memory Test" },
      { href: "/drills/memory/spatial-memory/object-location", label: "Object Location Memory Test" },
      { href: "/drills/memory/working-memory/n-back", label: "3-Back Working Memory Test" }
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
      <WordRecallClient copy={{
          "h1Keyword": "単語記憶テスト・単語再生テスト",
          "h1Suffix": " – 無料言語性記憶ゲーム",
          "subtitle": "単語リストの自由再生は均一ではありません。初頭と末尾の単語が最も記憶に残り、中間部は忘却しやすいという系列位置効果（Murdock, 1962）が生じます。凝視時間よりも深い意味的処理（Craik & Lockhart, 1972）が保持を決定します。",
          "statScore": "スコア",
          "statTime": "残り時間",
          "statWords": "単語数",
          "wordsUnit": "語",
          "statBestScore": "ベストスコア",
          "memorizePhase": "単語を記憶してください",
          "btnSkip": "スキップ",
          "inputPhase": "記憶した単語を入力",
          "inputPlaceholder": "覚えている単語をスペース区切りで入力...",
          "btnSubmit": "回答を送信",
          "inputHint": "Enterキーで送信できます",
          "feedbackPhase": "再生結果の判定",
          "extraWordsLabel": "余分または誤って入力された単語:",
          "startTitle": "単語記憶 Pro",
          "startSubtitle": "言語性短期記憶 • 単語自由再生テスト",
          "countdownSubtitle": "準備してください",
          "newBest": "自己新記録",
          "pointsLabel": "ポイント",
          "statAccuracy": "正解率",
          "statPeakWords": "最大単語数",
          "statPerfects": "パーフェクト",
          "btnPlayAgain": "もう一度プレイ",
          "rulesTitle": "ドリルルール & スコア算出方法",
          "aboutTitle": "単語記憶テスト（Verbal Memory）について",
          "rulesItems": [
                    {
                              "num": "1",
                              "text": "単語リストの再生",
                              "highlight": "+150 PTS",
                              "result": "記憶フェーズで単語を覚え、入力フェーズで正確に入力"
                    },
                    {
                              "num": "2",
                              "text": "レベルボーナス",
                              "highlight": "最大+135% PTS",
                              "result": "単語数（スパン）が増えるほど1問あたりのスコアが大幅上昇"
                    },
                    {
                              "num": "3",
                              "text": "ミス・時間切れ",
                              "highlight": "-1 単語",
                              "result": "減点や制限時間の減少はなく、単語数が1減って適応再挑戦"
                    },
                    {
                              "num": "4",
                              "text": "適応型スパン測定",
                              "highlight": "自動昇降",
                              "result": "正解・不正解に応じて真の言語性記憶限界へ自然に収束"
                    }
          ],
          "wordBank": [
                    "りんご",
                    "城",
                    "橋",
                    "ダイヤ",
                    "鷲",
                    "森",
                    "庭園",
                    "金槌",
                    "島",
                    "密林",
                    "騎士",
                    "灯台",
                    "山",
                    "針",
                    "海",
                    "宮殿",
                    "女王",
                    "ロケット",
                    "夕日",
                    "神殿",
                    "傘",
                    "渓谷",
                    "窓",
                    "シマウマ",
                    "ろうそく",
                    "ドラゴン",
                    "羽",
                    "銀",
                    "金",
                    "大理石",
                    "水晶",
                    "青銅",
                    "影",
                    "魂",
                    "知恵",
                    "名誉",
                    "栄光",
                    "夢",
                    "嵐",
                    "川",
                    "雲",
                    "炎",
                    "石",
                    "雷",
                    "虹",
                    "不死鳥",
                    "時計",
                    "鏡",
                    "帽子"
          ]
}} />
      <DrillGuide guide={wordRecallGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/word-recall"
          locale="ja"
        />
      </div>
    </>
  );
}
