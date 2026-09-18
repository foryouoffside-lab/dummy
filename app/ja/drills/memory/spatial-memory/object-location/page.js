import ObjectLocationClient from '@/app/drills/memory/spatial-memory/object-location/ObjectLocationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "空間記憶テスト・物体位置記憶検査 – 空間配置再生 | SkillDrills",
  description: "無料の空間記憶テスト（Object Location Memory Test / 物体位置記憶課題）。拡大する3×3〜7×7グリッド上の絵文字物体の配置を1.5秒で瞬間記憶し、指定された目標の座標を正確に特定。空間位置記憶と視覚特徴結合能を測定・鍛える認知ドリル。登録不要。",
  keywords: ['空間記憶テスト', '空間記憶', '物体位置記憶', '空間ワーキングメモリ', '位置記憶 検査', '視空間記憶 トレーニング', 'オブジェクトロケーション テスト', '配置記憶 ゲーム', '空間認知能力 測定', '脳トレ 空間記憶', 'シルバーマン イールズ 課題', '視覚特徴結合 テスト'],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/memory/spatial-memory/object-location",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/object-location', 'ja'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "空間記憶テスト (物体位置記憶テスト) - 無料認知トレーニング | SkillDrills",
    description: "無料の空間記憶テスト（Object Location Memory Test / 物体位置記憶課題）。拡大する3×3〜7×7グリッド上の絵文字物体の配置を1.5秒で瞬間記憶し、指定された目標の座標を正確に特定。空間位置記憶と視覚特徴結合能を測定・鍛える認知ドリル。登録不要。",
    url: "https://skilldrills.online/ja/drills/memory/spatial-memory/object-location",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "空間記憶テスト (物体位置記憶テスト) - 無料認知トレーニング | SkillDrills",
    description: "無料の空間記憶テスト（Object Location Memory Test / 物体位置記憶課題）。拡大する3×3〜7×7グリッド上の絵文字物体の配置を1.5秒で瞬間記憶し、指定された目標の座標を正確に特定。空間位置記憶と視覚特徴結合能を測定・鍛える認知ドリル。登録不要。",
  },
};

export const dynamic = 'force-static';

export default function LocalizedObjectLocationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "記憶力トレーニング", "item": "https://skilldrills.online/ja/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "空間記憶", "item": "https://skilldrills.online/ja/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "空間記憶テスト", "item": "https://skilldrills.online/ja/drills/memory/spatial-memory/object-location" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "空間記憶テスト (物体位置記憶テスト)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "拡大グリッド上の物体配置を瞬間記憶し目標座標を特定することで、空間位置記憶、視覚特徴結合、および認知地図形成能力を測定する無料ブラウザ神経心理学テスト。",
    "genre": "Cognitive Assessment / Spatial Memory",
    "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/object-location",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "空間記憶テスト (物体位置記憶テスト)",
    "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/object-location",
    "description": "拡大グリッド上の物体配置を瞬間記憶し目標座標を特定することで、空間位置記憶、視覚特徴結合、および認知地図形成能力を測定する無料ブラウザ神経心理学テスト。",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "空間記憶テスト (物体位置記憶テスト)",
    "description": "拡大グリッド上の物体配置を瞬間記憶し目標座標を特定することで、空間位置記憶、視覚特徴結合、および認知地図形成能力を測定する無料ブラウザ神経心理学テスト。",
    "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/object-location",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Memory"],
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
            "name": "空間記憶テスト（Object Location Memory Test）とは何ですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "物体そのものの視覚的特徴（『何であるか』）と、それが配置されていた空間座標（『どこにあるか』）を同時に脳内で統合・保持する能力（特徴結合 / Feature Binding）を測定・評価するための神経心理学的認知テストです。"
            }
      },
      {
            "@type": "Question",
            "name": "このドリルの仕組みとルールはどうなっていますか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "3×3から7×7へと拡大するグリッド上に複数の絵文字物体が1.5秒間表示されます。グリッドがクリアされた後、画面上部に指定された単一の目標物体が表示されるため、その物体が配置されていた元のマスを正確にタップして回答します。"
            }
      },
      {
            "@type": "Question",
            "name": "エールズ＆シルバーマン（Silverman-Eals）の物体位置記憶課題とは何ですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "1994年にマリオン・エールズとアーウィン・シルバーマンが発表した著名な神経心理学パラダイムです。空間認知において、ユークリッド幾何学的な空間回転能力とは独立して、偶発的な物体の位置記憶を司る特異な認知機構が存在することを実証しました。"
            }
      },
      {
            "@type": "Question",
            "name": "認知神経科学における「特徴結合（Object-Location Binding）」とは何ですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "脳の腹側皮質視覚路（『何』を処理する経路）と背側皮質視覚路（『どこ』を処理する空間経路）からの情報が、海馬および海馬傍回において単一のエピソード的表象として統合・結合される神経プロセスです。"
            }
      },
      {
            "@type": "Question",
            "name": "物体位置記憶テストにおける一般的な成人の平均スコアはどのくらいですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "CANTAB PAL（対連合学習）などの臨床評価基準では、健常な成人は中間規模のグリッドで約4〜6個の物体位置を正確に特定できます。本ドリルは独自のグリッド配置と時間制限を採用したゲーム形式であるため、臨床検査結果との直接比較ではなく自己向上の指標として活用してください。"
            }
      },
      {
            "@type": "Question",
            "name": "単純なグリッド瞬間記憶テスト（Visual Matrix）との違いは何ですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "純粋なグリッド記憶テストはどのマスが光ったかというバイナリの位置情報のみを記憶するため、幾何学的な図形としてまとめる（チャンキング）ことが可能です。一方、物体位置記憶テストは『どの物体がどの座標にあったか』という特徴の組み合わせ（Conjunction）を保持する必要があり、より高度な認知処理を要求します。"
            }
      },
      {
            "@type": "Question",
            "name": "なぜ単純な図形パターンよりも物体の位置を記憶する方が難しいのですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "作業記憶において特徴の結合（Conjunction）は単一特徴の保持よりも高い注意資源と認知コストを消費するためです（Luck & Vogel, 1997）。脳は物体認識と空間座標という2つの異なる次元を同時に保持しなければならないため負荷が倍増します。"
            }
      },
      {
            "@type": "Question",
            "name": "物体位置記憶を担う主な脳領域はどこですか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "両側の海馬、海馬傍回、後頭頂皮質、および空間座標の能動的保持を担う背外側前頭前野（DLPFC）が主要な神経基盤を構成しています。"
            }
      },
      {
            "@type": "Question",
            "name": "誤ったマスをタップした場合のペナルティはありますか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "いいえ。誤答してもスコアの減点や残り時間の減少といったペナルティは一切ありません。現在のレベルで再試行が行われるため、落ち着いて空間アンカー戦略を洗練させることができます。"
            }
      },
      {
            "@type": "Question",
            "name": "物体位置記憶の向上は日常生活やゲームプレイにどのように役立ちますか？",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "鍵やスマートフォンを置いた場所、駐車位置などの日常的な記憶が強化されるだけでなく、FPSやMOBAなどのゲームにおいてマップ上の敵やアイテム、スキルの配置を瞬間的に把握する空間認識力の向上に直結します。"
            }
      }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "空間記憶テストで物体位置記憶と視覚特徴結合を高める方法",
    "description": "象限分割スキャンとランドマーク固定法を活用し、拡大するグリッド上で物体の位置と特徴を正確に結合・保持するための4段階実践プロトコル。",
    "step": [
      {
            "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/object-location#step-1",
            
            "name": "グリッドの象限分割スキャン",
            "text": "物体が表示された最初の500ミリ秒で、グリッドを直感的に4つの象限（左上・右上・左下・右下）に分割して大まかな分布を把握します。"
      },
      {
            "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/object-location#step-2",
            
            "name": "固定ランドマークへのアンカー設定",
            "text": "各物体を4隅の角、外枠の境界、中央のマスといった目立つ幾何学的ランドマークと結びつけて記憶を固定します。"
      },
      {
            "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/object-location#step-3",
            
            "name": "意味と空間の連想ペアリング形成",
            "text": "物体の視覚的特徴（絵文字）と位置を結びつける即時の言語ラベルやイメージを形成します（例：『星は右上角』『鍵は中央下』）。"
      },
      {
            "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/object-location#step-4",
            
            "name": "目標物体の座標特定とタップ",
            "text": "グリッドが消え目標アイコンが提示されたら、脳内の認知地図を検索して該当するマスを迷わずタップします。"
      }
]
  };

  const objectLocationGuide = {
    intro: [
      "空間記憶テスト（Object Location Memory Test）は、空間位置記憶、視覚的物体位置結合（Object-Location Binding）、および配置再生能力を測定・強化するために設計された神経心理学的認知評価ツールです。単に光ったマスの位置を覚えるだけの単純なグリッド記憶とは異なり、個々の視覚的トークンと正確な空間座標を脳内で統合する高度な認知処理を評価します。",
      "物体位置記憶の臨床的基盤は、マリオン・エールズとアーウィン・シルバーマン（Eals & Silverman, 1994）による空間認知研究によって確立されました。彼らは物体の位置記憶が、メンタルローテーション（心的回転）などの空間操作とは独立した進化的適応機構として機能することを証明しました。さらに古くは、エドワード・トールマン（Tolman, 1948）が認知地図（Cognitive Map）の概念を提唱し、生物が環境の内的空間モデルをどのように形成するかを示しました。",
      "作業記憶の理論的枠組みにおいて、ロバート・ロギー（Logie, 1995）およびアラン・バドリー（Baddeley, 2000）は、物体位置の結合がエピソード・バッファ（Episodic Buffer）によって調整され、視覚キャッシュ（物体の特徴）とインナー・スクライブ（空間座標）からの入力を統合していることを明らかにしました。スティーブン・ラックとエドワード・フォーゲル（Luck & Vogel, 1997）は特徴結合が大きな注意負荷を要求することを実証し、ネルソン・コーワン（Cowan, 2001）は焦点化された作業記憶の容量限界が厳密に3〜4組の項目・位置ペアに制限されることを示しました。",
      "Woodsら（2015）が提唱した時間計測基準に準拠し、本ドリルは固定された1.5秒間の記憶フェーズと、3×3から7×7へと段階的に拡大する適応型難易度階段（Adaptive Staircase）を用いて、あなたの空間結合限界を精密に測定します。",
      "測定の仕組み：すべてのイベントはブラウザの performance.now() 高精度クロックを用いてミリ秒単位で完全にデバイス上で計測され、外部サーバーへスコアが送信されることはありません。Spectre対策によりブラウザタイマーは約1ミリ秒に丸められ、ディスプレイのリフレッシュレート（60Hz環境で約16.7ms）によってフレーム描画が量子化されます（Woods et al., 2015）。5ミリ秒未満の微小な差異は測定ノイズとして扱い、他者の環境と比較するのではなく、同一ハードウェア上でのスコア推移を追跡してください。",
      "データ透明性：SkillDrillsは集約データを一切収集しません。スコアと設定はお使いのブラウザのlocalStorageにのみ保存され、外部送信されないため、当サイトがユーザー平均値や順位、プレイヤー数を公表することはありません。本ページに記載されたすべての数値は、下記の参考文献に掲載された学術研究に基づいています。",
      "本ドリルは練習と興味を目的とした無料のブラウザゲームです。医療機器、診断ツール、または疾患のスクリーニングや治療を目的としたものではなく、ここでのスコアが医学的な健康状態や記憶力を証明するものではありません。記憶力や思考力に関して不安がある場合は、専門の医師または医療機関にご相談ください。"
],
    benchmarks: {
      title: "物体位置記憶・空間特徴結合の標準規範ベンチマーク",
      headers: ["パフォーマンス層", "物体数 & グリッド規模", "ドリルスコア", "認知特徴結合 & 空間マッピング特性"],
      rows: [
        [
                "第1層（極めて優秀 / 上位1%水準）",
                "レベル 8 – 10+（8〜10個以上、6×6〜7×7グリッド）",
                "1,000点以上",
                "視覚空間エリート水準。迅速な象限分割とランドマーク固定を駆使し、8組以上の物体位置ペアを容易に結合。500ミリ秒未満で目標座標を特定"
        ],
        [
                "第2層（優秀 / 上位15%水準）",
                "レベル 6 – 7（6〜7個、5×5〜6×6グリッド）",
                "750 – 999点",
                "標準的な成人の平均を大きく超過。強固な意味・空間ペアリングを展開し、拡大するグリッドにおける視覚的逆向干渉に高い耐性を示す。特定時間500〜700ミリ秒"
        ],
        [
                "第3層（標準的成人平均 / 50パーセンタイル）",
                "レベル 4 – 5（4〜5個、4×4〜5×5グリッド）",
                "450 – 749点",
                "一般的な成人の標準値（Eals & Silverman, 1994）。コーワン限界に相当する4組の結合を安定処理。5×5グリッドの中央付近の物体で忘却が発生。特定時間700〜950ミリ秒"
        ],
        [
                "第4層（平均未満 / 特徴結合ボトルネック）",
                "レベル 3（3個、3×3〜4×4グリッド）",
                "250 – 449点",
                "2〜3個の孤立した物体のみ保持可能。隣接するセルの座標混同が発生し、妨害刺激の増加に脆弱。特定時間950〜1,300ミリ秒"
        ],
        [
                "第5層（要トレーニング / 短期記憶減衰）",
                "レベル 1 – 2（2個、3×3グリッド）",
                "250点未満",
                "急速な視覚痕跡の忘却。物体と位置の結合不全が生じ、1.5秒の短い遅延でも目標座標の検索に苦慮。特定時間1,300ミリ秒超過"
        ]
],
      note: "物体数およびグリッド規模は45秒セッション内で到達した最高難易度を反映。Silverman-Eals OLMおよびCANTAB PAL標準基準に準拠。"
    },
    techniques: {
      title: "物体位置記憶の結合限界を拡張する認知戦略",
      items: [
        {
                "name": "相対的ランドマーク固定法（Landmark Anchoring）",
                "desc": "4隅の角、中央マス、外枠の辺といった不変の幾何学的ランドマークを基準にして目標物体の位置を固定します（Tolman, 1948）。『ダイヤが左上角にある』のように目立つ標識と紐づけることで、複雑な座標計算を省略できます。",
                "tips": "表示直後の500ミリ秒で、どの物体が角や外枠に位置しているかを最優先で確認してください。"
        },
        {
                "name": "意味的・空間的連想ペアリング（Semantic-Spatial Pairing）",
                "desc": "物体の持つ意味やイメージと、その空間的位置を結びつける即時のナラティブ（連想）を作成します（Baddeley, 2000）。例えば上部にある『星』を夜空、下部にある『鍵』を隠し引き出しのように関連付けます。",
                "tips": "物体の名称と空間的な方向を組み合わせた短い言語ラベル（例：『星は上、鍵は下』）を心の中で即座に唱えましょう。"
        },
        {
                "name": "象限分割スキャン法（Quadrantal Zoning）",
                "desc": "5×5や7×7の大きなグリッドを4つの象限（左上、右上、左下、右下）に頭の中で分割します。各エリアに何個の物体が存在するかを把握することで、目標検索時の探索空間を一気に絞り込めます。",
                "tips": "まずエリアごとの個数を素早くカウントし、その後に各エリア内の具体的な位置を精緻化します。"
        },
        {
                "name": "中心注視と周辺視野スキャン（Parafoveal Sweep）",
                "desc": "視線をグリッドの中央に固定して周辺視野（傍中心窩視）で全体の分布を大まかに捉え、その後に1〜2回の正確な微小サッケード（急速眼球運動）を行って曖昧なアイコンを確定します。",
                "tips": "目を激しくあちこち動かすのではなく、視線を安定させて滑らかに視野全体へ意識を広げてください。"
        }
]
    },
    steps: [
      "グリッドの中央に視線を合わせ、物体の全体的な配置に注意を集中します。",
      "1.5秒間の提示中に、各物体をランドマーク（角、辺、中央）に素早く結びつけます。",
      "物体のアイコンと空間位置を関連付ける意味的・空間的ペアを瞬時に形成します。",
      "グリッドが消え目標アイコンが表示されたら、頭の中の認知地図から該当のマスをタップします。",
      "3×3から7×7へと段階的に難易度を上げ、大容量の視覚特徴結合能力を鍛え上げます。"
],
    audience: "FPSやMOBAでミニマップとリソース配置の把握力を高めたいゲーマー、医療画像の読影スキルを磨く放射線技師、STEM分野の学生、および空間認知能力・視覚ワーキングメモリを高めたいすべての方。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'luck1997', 'tolman1948', 'eals1994', 'woods2015'),
    related: [
      {
            "href": "/drills/memory/spatial-memory/grid-memorization",
            "label": "瞬間記憶テスト (Visual Memory Test)"
      },
      {
            "href": "/drills/memory/spatial-memory/path-tracing",
            "label": "パストレーシング記憶テスト (Path Tracing)"
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
      <ObjectLocationClient
        copy={{
        "h1Keyword": "空間記憶テスト",
        "h1Suffix": " (物体位置記憶テスト)",
        "subtitle": "物体位置記憶（Object-location memory）は「何がどこにあったか」を保持する能力です。Eals & Silverman (1994) は物体配列を用いてこれを測定し、他の視覚性作業記憶課題と同様に約4項目の容量限界に直面することを明らかにしました（Luck & Vogel, 1997）。",
        "statScore": "スコア",
        "statTime": "残り時間",
        "statLevel": "レベル",
        "statBestScore": "ベストスコア",
        "levelPrefix": "Lv.",
        "memorizePrompt": "物体の配置を記憶してください",
        "targetPrompt": "目標:",
        "startTitle": "物体位置記憶 Pro",
        "startSubtitle": "空間位置記憶 • 配置再生テスト",
        "countdownSubtitle": "準備してください",
        "newBest": "自己新記録",
        "pointsLabel": "ポイント",
        "statAccuracy": "正解率",
        "statPeakLevel": "最高レベル",
        "statPerfects": "パーフェクト",
        "btnPlayAgain": "もう一度プレイ",
        "rulesTitle": "ドリルルール & スコア算出方法",
        "aboutTitle": "物体位置記憶（Object Location Training）について",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "配置記憶と目標特定",
                        "highlight": "+150 PTS",
                        "result": "1.5秒で絵文字配置を覚え、消去後に指定目標の位置をタップ"
                },
                {
                        "num": "2",
                        "text": "難易度の上昇",
                        "highlight": "3x3 → 7x7",
                        "result": "レベルが上がるごとにグリッド規模と物体数が自動拡大"
                },
                {
                        "num": "3",
                        "text": "ミス・時間切れ",
                        "highlight": "ペナルティなし",
                        "result": "減点や制限時間の減少はなく、同レベルを再試行"
                },
                {
                        "num": "4",
                        "text": "難易度は維持",
                        "highlight": "レベル降下なし",
                        "result": "誤答してもレベルは下がらず、空間記憶の定着をサポート"
                }
        ]
}}
      />
      <DrillGuide guide={objectLocationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/object-location"
          locale="ja"
        />
      </div>
    </>
  );
}
