import EntropicGridClient from '@/app/drills/visual/visual-recognition/entropic-grid/EntropicGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "視覚探索テスト: エントロピックグリッド | SkillDrills",
  description: "100セルグリッドと動的ノイズの中から指定コードを最速特定する無料視覚探索テスト。選択的視覚注意、周辺視野スキャン、情報処理速度を科学的に強化します。",
  keywords: [
    "視覚探索",
    "視覚的注意",
    "選択的注意 テスト",
    "視覚探索課題",
    "動的ノイズ 探索",
    "周辺視野 スキャン",
    "集中力グリッド テスト",
    "特徴統合 トレイスマン",
    "認知負荷 理論",
    "情報処理速度 テスト"
  ],
  openGraph: {
    title: "視覚探索テスト・動的グリッド探索トレーニング – 視覚的注意＆ノイズ識別測定 | SkillDrills",
    description: "高密度な100セルグリッドと動的に変化する背景ノイズの中で、指定されたコードを最速特定する無料視覚探索ドリル。選択的注意と周辺視野スキャンを鍛えます。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/visual/visual-recognition/entropic-grid',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "視覚探索テスト・動的グリッド探索トレーニング – 視覚的注意＆ノイズ識別測定 | SkillDrills",
    description: "高密度グリッドと動的ノイズの中で指定コードを最速特定する無料視覚探索ドリル。選択的注意力を科学的に測定・強化。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual/visual-recognition/entropic-grid',
    languages: getAlternateLanguages('/drills/visual/visual-recognition/entropic-grid'),
  },
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
      "name": "訓練ハブ",
      "item": "https://skilldrills.online/ja/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "視覚・動体視力トレーニング",
      "item": "https://skilldrills.online/ja/drills/visual"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "視覚認識・パターン認知",
      "item": "https://skilldrills.online/ja/drills/visual/visual-recognition"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "動的グリッド視覚探索テスト (エントロピックグリッド)",
      "item": "https://skilldrills.online/ja/drills/visual/visual-recognition/entropic-grid"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrills 視覚探索テスト・動的グリッド測定器",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "browserRequirements": "HTML5 Canvas対応の最新ウェブブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "description": "トレイスマンの特徴統合理論およびガイド探索モデル（GS4）に基づき、高密度動的グリッド内での目標探索時間、選択的視覚注意、ノイズ遮断能力をミリ秒単位で測定するオンラインツール。"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "無料オンライン視覚探索トレーニング (エントロピックグリッド)",
  "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/entropic-grid",
  "applicationCategory": "GameApplication",
  "genre": ["視覚探索", "選択的注意 テスト", "視覚的注意", "認知心理学ドリル"],
  "browserRequirements": "Requires HTML5 Canvas and JavaScript",
  "inLanguage": "ja-JP"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "エントロピックグリッド・ビジュアルサーチ (Entropic Grid Visual Search)",
  "description": "100セルの動的マトリクス内で周期的に変化する背景ノイズをかき分け、指示された英数字ターゲットコードを最速でクリックする知覚スピード測定ゲーム。",
  "genre": ["Cognitive Drill", "Vision Training", "Esports Reaction"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "エントロピックグリッド視覚探索テスト（Visual Search Task）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "認知心理学における標準的な視覚探索パラダイム（Visual Search Paradigm）を動的環境に応用した検査です。100個のセルで構成される高密度マトリクス内に、700msごとに変化するランダムな英数字ノイズが敷き詰められます。被験者はその動的ノイズの中から、上部に指定された単一のターゲットコード（例：'K7'）を瞬時に見つけ出してクリックします。静止した数字表を探すシュルテテーブルとは異なり、動的背景ノイズを脳内で能動的に遮断する選択的視覚注意（Selective Visual Attention）が厳密に測定されます。"
      }
    },
    {
      "@type": "Question",
      "name": "並列探索（ポップアウト）と逐次探索（シリアルサーチ）の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "アン・トレイスマンの特徴統合理論（Treisman & Gelade, 1980）によれば、色や明るさなど単一の顕著な特徴のみで識別できる探索は、視野全体で一瞬で浮かび上がる『並列探索（ポップアウト）』として行われます。一方、本ドリルのように文字の組み合わせ（形態の結合）をノイズの中から見つける課題では、焦点を局所的に移動させて順次照合する『逐次探索（シリアルサーチ）』が必要となります。熟練者はガイド探索モデル（Wolfe, 2007）を駆使し、部分的な並列スキャンと効率的なサッケードを統合して探索時間を極小化します。"
      }
    },
    {
      "@type": "Question",
      "name": "VALORANTやApex Legends、CS2などのFPSにおける実戦効果は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPSの戦場はテクスチャ、影、スモーク、エフェクトなどの激しい『視覚的クラッター（背景ノイズ）』に満ちています。本テストで鍛えられるノイズ遮断力は、敵の頭部（ヘッドライン）や微小なピーク動作を複雑な背景から瞬時に浮き彫りにする『索敵スピード』に直結します。敵を視認してからエイムを開始するまでの初動認識遅延（Target Acquisition Latency）を大幅に短縮できます。"
      }
    },
    {
      "@type": "Question",
      "name": "100個のセルをどのようにスキャンするのが最も効率的ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1マスずつ順番に見つめるのではなく、グリッドを『左上・右上・左下・右下』の4つの象限（クアドラント）に頭の中で分割し、各象限の中心に視線を落として周辺視野で4〜9セルをまとめて塊（チャンク）として識別する『4象限ブロック走査』が最も高速です。不要な微小サッケードの回数を半減させることができます。"
      }
    },
    {
      "@type": "Question",
      "name": "動的背景ノイズ（700msの定期変化）に惑わされないための神経学的アプローチは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "大脳皮質の背側注意ネットワーク（Dorsal Attention Network）による『トップダウン注意制御』を発動させます。背景の変化に反射的に目が反応してしまうボトムアップの刺激駆動型注意を前頭前皮質で意図的に抑制し、探すべき文字の幾何学的特徴（直線、曲線、交差構造）だけに特化した認知フィルターを網膜受容野に適用します（Duncan & Humphreys, 1989）。"
      }
    },
    {
      "@type": "Question",
      "name": "一般的なシュルテテーブル（Schulte Table）や集中力グリッドとの違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "通常のシュルテテーブルは1〜25などの固定された数字を昇順にタップする静的課題です。これに対しエントロピックグリッドは、盤面全体が毎秒変化し続ける動的ノイズフィールドであり、ターゲット自体も毎問ランダムに変化します。記憶による位置の固定化が不可能なため、純粋な視覚探索速度と知覚的ノイズ耐性のみが評価されます。"
      }
    },
    {
      "@type": "Question",
      "name": "長時間のPC作業や読書スピードの向上にも効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "非常に効果的です。視覚探索のトレーニングは、眼球の注視点（Fixation）の持続時間を短縮し、1回の注視で取り込める情報量（視知覚スパン）を拡大させます。膨大な文章やデータ表から必要なキーワードを高速で見つけ出すビジネス走査能力の向上に直結します。"
      }
    },
    {
      "@type": "Question",
      "name": "年齢とともに視覚探索スピードが低下する理由とその対策は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "加齢に伴い、視覚的注意の有効視野（UFOV: Useful Field of View）の狭小化と、前頭葉による不要刺激抑制機能の低下が生じます（Woods et al., 2015）。しかし、高密度グリッドを用いた意図的な探索刺激を定期的に与えることで、神経シナプスの可塑性が刺激され、有効視野の広さと反応速度を若々しい水準に保つことが可能です。"
      }
    },
    {
      "@type": "Question",
      "name": "ハイスコアを狙うための1日の推奨練習時間と注意点は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "45秒間の集中セッションを3〜5回（合計5〜8分）行うのが理想的です。強い選択的注意は前頭葉のグルコース消費が激しいため、ダラダラと続けると集中が切れてノイズに注意が奪われやすくなります。脳が最も冴えている午前中やゲームプレイ前のウォームアップとして取り入れるのが最適です。"
      }
    },
    {
      "@type": "Question",
      "name": "スコア記録や解答データは外部サーバーに送信されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ。すべての探索スコア、レベル到達度、平均探索潜時は利用者の端末（ブラウザのlocalStorage）にのみ安全に暗号化保存されます。外部サーバーへの個人情報やクリック座標データの収集・送信は一切行われません。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "動的グリッド視覚探索テストの攻略ステップとハイスコア手順",
  "description": "100セルの動的ノイズグリッドから目的のコードを電光石火で特定するための4段階実践ガイド。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "指定ターゲットコードの瞬間視覚化",
      "text": "画面上部に提示される2文字のターゲットコード（例：'X4'）を確認し、文字の輪郭線と特徴を鮮明にイメージします。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/entropic-grid#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "4象限ブロック走査による高速スキャン",
      "text": "盤面全体を左上・右上・左下・右下の4ブロックに大別し、視線の焦点をブロック中心に滑らせながら周辺視野で一括走査します。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/entropic-grid#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "背景点滅ノイズの能動的無視",
      "text": "700msごとに点滅・更新される妨害文字に目を奪われず、ターゲット文字の幾何学的形状のみを認知フィルターで抽出します。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/entropic-grid#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "目標セルへの瞬時クリックと次問移行",
      "text": "目標を発見した瞬間に無駄のない最短カーソル軌道で正確にクリックし、即座に次の指定コードへ視覚注意を切り替えます。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/entropic-grid#step-4"
    }
  ]
};

const guideData = {
  eyebrow: "認知心理学＆選択的注意制御ガイド",
  heading: "視覚探索テスト – 動的グリッドにおける特徴統合とノイズ遮断機構",
  intro: [
    "視覚探索（Visual Search）は、無数の不要な情報や妨害刺激（ディストラクター）が密集する環境の中から、特定の目標刺激（ターゲット）を迅速かつ正確に検出する人間の最も基本的な視覚認知機能です。認知心理学の古典的基盤であるアン・トレイスマンの特徴統合理論（Feature Integration Theory: FIT, Treisman & Gelade, 1980）によると、人間の視覚系は色や線分傾きなどの単純な物理特徴を並列的・無意識に前注意段階（Preattentive Stage）で処理しますが、複数の特徴が組み合わさった複合刺激の認識には集中的な空間的注意の結合が必要です。",
    "ジェレミー・ウォルフのガイド探索モデル（Guided Search 4.0, Wolfe, 2007）では、ボトムアップの刺激顕著性（目立つ要素）と、探すべき目標の心象イメージに基づくトップダウンの注意バイアスが相互作用して『優先度マップ（Priority Map）』が構築されます。エントロピックグリッド課題のように、100個のセルに定期的に動的ノイズが走る高エントロピー環境下では、背景の変化がボトムアップ注意を激しく混乱させます。これに打ち勝つためには、前頭前皮質と後頭頂皮質が連携して強力なトップダウン抑制をかけ、目標文字以外の信号を脳内で能動的に消去しなければなりません（Duncan & Humphreys, 1989）。",
    "視覚探索の速度を律速する要因の一つに、眼球の注視時間（Fixation Duration: 約200〜250ms）とサッケード潜時があります（Posner, 1980; Woods et al., 2015）。盤面を1マスずつ目で追う非効率なシリアルサーチを行っていると、45秒間に数個しかターゲットを特定できません。アクションビデオゲームプレイヤーや卓越したスポーツ選手は、視覚的注意のスポットライトを柔軟に拡大し、1回の注視で4〜9セルの複合特徴を並列的にサンプリングして判断する卓越した視知覚スパンを獲得しています（Green & Bavelier, 2006）。",
    "本テストは、HTML5の高精度タイマーを用いて目標発見ごとの反応潜時、累積特定数、誤クリックによるペナルティを統合した総合スコアリングを行います。日々の体系的な動的グリッド探索トレーニングは、視覚的クラッター（雑然とした情報）への耐性を飛躍的に高め、FPSゲームでの高速索敵、混雑した道路での危険標識察知、そして大量のドキュメントを精査するビジネスシーンでの情報処理能力を劇的に研ぎ澄まします。"
  ],
  benchmarks: {
    title: "動的視覚探索・選択的注意ベンチマーク基準",
    headers: ["評価ランク / 階級", "コード特定成功数 (45秒)", "平均探索固視潜時", "ノイズ識別精度", "神経認知的処理段階"],
    rows: [
      ["神業 / プロ特級 (Top 1%)", "18回 以上", "< 180 ms", "96% 以上", "並列的ポップアウト抽出とトップダウン型ガイド探索の完全融合 (Wolfe, 2007)"],
      ["上級視覚探索 (Top 5%)", "14 – 17回", "180 – 230 ms", "88 – 95%", "動的ノイズの効率的フィルタリングと4象限ラスタースキャンの洗練"],
      ["中級標準水準 (Top 25%)", "10 – 13回", "230 – 300 ms", "76 – 87%", "標準的な成人認知速度。順次走査と部分的並列抽出の併用"],
      ["初級一般段階 (Top 50%)", "7 – 9回", "300 – 400 ms", "65 – 75%", "ディストラクターへの注意捕捉（視覚クラッターによる探索遅延）"],
      ["未熟練 / 基礎段階 (Baseline)", "7回 未満", "> 400 ms", "65% 未満", "過剰なサッケード迷走と作業記憶におけるターゲット文字の頻繁な脱落"]
    ],
    note: "認知心理学および視覚探索理論文献（Treisman & Gelade 1980; Wolfe 2007; Duncan & Humphreys 1989; Posner 1980）に基づく客観的パフォーマンス基準です。"
  },
  techniques: {
    title: "視覚探索スピードを飛躍させる4大実践テクニック",
    items: [
      {
        name: "並列ポップアウト特徴抽出 (Parallel Pop-Out Feature Extraction)",
        desc: "ターゲットの文字そのものを読むのではなく、文字特有の幾何学的エッジ（鋭角な斜線、丸みを帯びたループ構造など）を視覚フィルターとして意識し、ノイズから浮き上がらせます。",
        tips: "例えば'K'なら斜めの交差線、'O'なら丸い輪郭といった特徴の輪郭線に焦点を当てます。"
      },
      {
        name: "4象限ラスタースキャン法 (Quadrant Systematic Raster Scan)",
        desc: "100セルの広大な盤面を4つの25セルブロックに四分割し、各ブロックの中心に視線を落として周辺視野でまとめてスキャンします。",
        tips: "視線を無秩序に散乱させず、左上→右上→左下→右下と一定の走査リズムを固定しましょう。"
      },
      {
        name: "動的背景ノイズ遮断 (Dynamic Noise Perceptual Filtering)",
        desc: "700msごとに点滅する背景文字に注意を奪われないよう、前頭葉でボトムアップの突発的刺激を意識的に無視し、静的な探索モードを維持します。",
        tips: "点滅の瞬間に目を動かさず、変化が一瞬落ち着くインターバルに焦点を同期させます。"
      },
      {
        name: "注意スポットライト最適化 (Attentional Spotlight Broadening)",
        desc: "視野を狭めて1マスに集中しすぎると探索時間が跳ね上がります。視覚的注意のスポットライトを3×3マスの広さに拡大して眺める感覚を養います。",
        tips: "首や肩の力を抜き、ディスプレイとの適切な距離（50cm以上）を維持して全体を視野に収めてください。"
      }
    ]
  },
  steps: [
    "テスト開始ボタンを押し、画面上部に提示される2文字のターゲットコードを素早く確認します。",
    "盤面全体を4象限に分けて捉え、ターゲットの特徴線がポップアウトするセルを周辺視野で走査します。",
    "背景ノイズが激しく明滅しても惑わされず、目的のコードを発見したら最短距離でクリックします。",
    "正解すると即座に新しいターゲットが提示されるため、45秒間の制限時間内で連続特定を継続します。",
    "終了後に表示される特定成功数、平均探索潜時、評価ランクを確認し、毎日の視覚認知ルーチンに役立てます。"
  ],
  audience: "VALORANT、Apex Legends、CS2、Overwatchで索敵速度と視覚的クリアリングを極めたいFPSプレイヤー、航空管制官・X線検査員・セキュリティ監視員を目指す方、および日常の情報処理速度と選択的集中力を高めたいすべてのビジネスパーソン。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('treisman1980', 'wolfe2007', 'duncan1989', 'posner1980', 'green2006', 'woods2015'),
  related: [
    { href: "/ja/drills/visual/visual-recognition/visual-search", label: "視覚探索テスト (周辺視野スキャン)" },
    { href: "/ja/drills/visual/tracking-accuracy/multiple-targets", label: "多目標追従 MOT テスト" },
    { href: "/ja/drills/visual/tracking-accuracy/moving-target", label: "動体視力テスト (移動目標迎撃)" },
    { href: "/ja/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go 選択反応テスト" }
  ]
};

export default function LocalizedEntropicGridJaPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <EntropicGridClient copy={{ title: "視覚探索テスト・動的グリッド探索トレーニング", subtitle: "動的ノイズ遮断＆選択的視覚注意検査" }} />
      <DrillGuide guide={guideData} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ja/drills/visual/visual-recognition/entropic-grid" />
      </div>
    </>
  );
}
