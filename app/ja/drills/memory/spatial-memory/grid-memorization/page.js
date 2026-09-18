import GridMemorizationClient from '@/app/drills/memory/spatial-memory/grid-memorization/GridMemorizationClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "瞬間記憶テスト・視覚記憶検査 – グリッドパターン記憶ゲーム | SkillDrills",
  description: "無料の瞬間記憶テスト（視覚記憶検査）。4×4から5×5の拡張グリッドパターンを1.5秒で記憶し、視覚キャッシュ容量と空間チャンキング能力を測定・トレーニング。",
  keywords: ['瞬間記憶テスト', '視覚記憶 テスト', '瞬間記憶 トレーニング', 'グリッド記憶', '視覚的作業記憶', 'パターン記憶 テスト', '空間記憶 検査', 'メモリーマトリクス', '視覚キャッシュ 容量', '短期視覚記憶 ゲーム', '空間チャンキング', '脳トレ 記憶力 テスト'],
  openGraph: {
    title: "瞬間記憶テスト（視覚記憶テスト）- 無料ブラウザグリッドパターン記憶 | SkillDrills",
    description: "無料の瞬間記憶テスト（Visual Memory Test / 視覚記憶検査）。4×4から5×5の拡張グリッドパターンを1.5秒で瞬間記憶し、視覚キャッシュ容量と空間チャンキング能力を測定・トレーニング。登録不要・ブラウザですぐプレイ可能。",
    type: 'website',
    url: 'https://skilldrills.online/ja/drills/memory/spatial-memory/grid-memorization',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "瞬間記憶テスト（視覚記憶テスト）- 無料ブラウザグリッドパターン記憶 | SkillDrills",
    description: "無料の瞬間記憶テスト（Visual Memory Test / 視覚記憶検査）。4×4から5×5の拡張グリッドパターンを1.5秒で瞬間記憶し、視覚キャッシュ容量と空間チャンキング能力を測定・トレーニング。登録不要・ブラウザですぐプレイ可能。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/memory/spatial-memory/grid-memorization',
    languages: getAlternateLanguages('/drills/memory/spatial-memory/grid-memorization'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "記憶力トレーニング", "item": "https://skilldrills.online/ja/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "空間記憶", "item": "https://skilldrills.online/ja/drills/memory/spatial-memory" },
    { "@type": "ListItem", "position": 4, "name": "瞬間記憶テスト", "item": "https://skilldrills.online/ja/drills/memory/spatial-memory/grid-memorization" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "瞬間記憶テスト（視覚記憶・グリッド記憶）",
  "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/grid-memorization",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "瞬間記憶テスト（視覚記憶・グリッド記憶）",
  "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/grid-memorization",
  "description": "4×4から5×5の拡張マトリックス上で瞬間点灯するグリッドパターンを記憶・再現し、視覚キャッシュ容量と空間チャンキング能力を測定する無料ブラウザ神経認知テスト。",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Spatial Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "瞬間記憶テスト (Visual Memory Test)",
  "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/grid-memorization",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "グリッド瞬間記憶テストで視覚作業記憶を鍛える方法",
  "description": "視覚性ワーキングメモリのボトルネックを克服し、瞬間提示されたグリッドパターンを効率的に記憶・再構成するための4段階実践プロトコル。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/grid-memorization#step-1",
      
      "name": "中心視野に視線を固定",
      "text": "パターン点灯前にグリッドの中心点に焦点を置き、周辺視野・傍中心窩視野を活用してグリッド全体の幾何学的トポロジーを一度に捉えます。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/grid-memorization#step-2",
      
      "name": "ゲシュタルト形状チャンキングの実行",
      "text": "個別の座標をバラバラに暗記しようとせず、隣接する点灯マスを幾何学的クラスター（直線、L字、正方形、三角など）として統合します。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/grid-memorization#step-3",
      
      "name": "運動空間軌跡の心内トレース",
      "text": "1.5秒の点灯時間内に点灯マスを一筆書きの軌跡として心内でなぞり、運動野の空間シミュレーション（インナースクライブ）を活性化させます。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ja/drills/memory/spatial-memory/grid-memorization#step-4",
      
      "name": "体系的なマトリックス再構成",
      "text": "記憶が鮮明なうちにグループ化した幾何学的塊を優先的にクリックし、その後に残った単独のマスを埋めていきます。"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "瞬間記憶テスト（視覚記憶テスト）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "視覚性作業記憶（Visuospatial Working Memory）の能力を評価する検査です。言語的な音声リハーサル（内言語）に頼ることなく、視覚的なパターンや空間配置を瞬時に知覚・符号化し、短期的に保持・再現する脳の純粋な視覚記憶容量を測定します。"
      }
    },
    {
      "@type": "Question",
      "name": "グリッド瞬間記憶ドリルの仕組みはどうなっていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "4×4または5×5のグリッド上に複数の一致セルが1.5秒間白く点灯します。点灯が消えた後、記憶を頼りに光っていたマスをすべてクリックして正確に再現します。正解すると難易度とマトリックスサイズが段階的に上昇します。"
      }
    },
    {
      "@type": "Question",
      "name": "視覚パターン検査（Visual Patterns Test / VPT）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1997年にセルジオ・デラ・サラ（Sergio Della Sala）やロバート・ロギー（Robert H. Logie）らが開発した神経心理学検査です。2次元の正方形マトリックスを用いて、連続的な身体運動に依存しない純粋な静的視覚短期記憶の容量（スパン）を正確に測定するゴールドスタンダードです。"
      }
    },
    {
      "@type": "Question",
      "name": "コルシブロックテスト（Corsi Block-Tapping Test）との違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "コルシブロックテスト（Corsi, 1972）はブロックが順番に叩かれる動的な時間的系列（空間経路）を記憶するテストで「インナースクライブ（能動的空間リハーサル）」を用います。一方、このグリッド記憶テストは全セルが同時に提示され、静的な形態や配置を保持する「視覚キャッシュ」の容量を独立して評価します。"
      }
    },
    {
      "@type": "Question",
      "name": "マトリックス記憶テストの成人の平均スコアはどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Della Salaら（1997, 1999）の成人標準化データによると、健常な成人の平均的な瞬間視覚パターン記憶容量は4×4〜5×5グリッドで6〜8マスです。10〜14マス以上を記憶できる上位層は、高度な空間幾何学的チャンキングを駆使しています。"
      }
    },
    {
      "@type": "Question",
      "name": "空間チャンキング（塊化）によってなぜ記憶力が向上するのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "人間の視覚性作業記憶には約3〜4個の独立した対象しか同時に保持できないという厳格な認知的制約があります（Luck & Vogel, 1997; Cowan, 2001）。隣接するマスを正方形や直線、アルファベットなどの意味ある図形（チャンク）にまとめることで、1つの情報単位に圧縮し容量制限を突破できます。"
      }
    },
    {
      "@type": "Question",
      "name": "視覚キャッシュ（Visual Cache）とインナースクライブ（Inner Scribe）の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ロギー（Logie, 1995）の視空間ワーキングメモリモデルにおいて、視覚キャッシュは物体の色・形状・静止配置情報を受動的に保持する保管庫であり、インナースクライブは空間的な移動経路や順序情報を能動的にリハーサル・更新する処理機構です。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜグリッドパターンは1.5秒経過すると急速に消えてしまうのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "網膜に映る超短期のアイコニック記憶（感覚記憶）はわずか250〜500ミリ秒で急速に減衰します。1.5秒の間に空間チャンキングや運動軌跡化によって作業記憶へ能動的に転送・定着させないと、視覚痕跡は消失してしまいます。"
      }
    },
    {
      "@type": "Question",
      "name": "間違ったマスをクリックした場合にスコア減点ペナルティはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ、誤ったマスをクリックしてもスコアの減点や残りセッション時間の減少はありません。現在の難易度レベルのまま即座に次のラウンドが始まり、限界突破を目指して安全に練習を継続できます。"
      }
    },
    {
      "@type": "Question",
      "name": "視覚記憶の向上は実生活やゲームにどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPSやタクティカルシューター（VALORANT、CS2、Apex）におけるミニマップの瞬間索敵と敵配置把握、チェスや将棋の盤面認識、建築図面やUIレイアウトの迅速な把握、STEM分野における空間認識・3Dメンタルローテーション能力に直結します。"
      }
    }
  ]
};

const gridGuide = {
  intro: [
  "瞬間記憶テスト（Visual Memory Test / グリッド記憶）は、視空間ワーキングメモリ、瞬間パターン符号化能力、および静的マトリックス短期記憶を科学的に測定・トレーニングするための神経認知ドリルです。音声言語による反芻に依存する言語性記憶検査とは異なり、脳の純粋な非言語性視覚アーキテクチャを正確に分離して測定します。",
  "視空間記憶スパンの臨床的研究はピエトロ・コルシ（Pietro Corsi, 1972）のコルシブロックテストに始まり、視空間記憶が言語性の数唱記憶とは解剖学的・機能的に独立した脳内システムであることが実証されました（Milner, 1971）。1997年にはセルジオ・デラ・サラ（Sergio Della Sala）やロバート・ロギー（Robert H. Logie）らが、動的な運動系列から静的マトリックスパターンの保持を分離する「視覚パターン検査（Visual Patterns Test / VPT）」を確立しました。",
  "現代の認知神経科学において、ロギー（Logie, 1995）およびアラン・バドリー（Alan Baddeley, 2000）は視空間スケッチパッドを「視覚キャッシュ（色・形・静止配置を保持する受動的保管庫）」と「インナースクライブ（運動計画と空間的更新を担う能動的機構）」に再定義しました。さらにLuck & Vogel（1997）およびCowan（2001）の研究が示す通り、未処理の視覚記憶容量は3〜4個の独立した項目に制限されます。マトリックス記憶スパンを拡張するには、点灯したマスをゲシュタルト図形としてまとめる「空間チャンキング」が不可欠です。",
  "本ドリルは高精度デジタル時間計測（Woods et al., 2015）に基づいて設計され、1.5秒間の標準化された瞬間提示と適応型難易度スケーリングにより、高速度条件下におけるあなたの視空間記憶の限界値を正確に測定します。",
  "測定の仕組み：すべてのイベントはブラウザの performance.now() 高精度クロックを用いてローカル環境でミリ秒単位で処理され、サーバーへの送信は一切行われません。Spectre脆弱性対策のためブラウザタイマーは約1msに丸められ、ディスプレイのリフレッシュレート（60Hz環境で約16.7ms）によって描画が同期されます（Woods et al., 2015）。5ms未満の微細な差は環境ノイズとして捉え、他人の記録と比較するのではなく同一環境での自己記録の推移を追跡してください。",
  "データ透明性：SkillDrillsは個人データや集計データを一切収集しません。スコアや設定はお使いのブラウザのlocalStorageにのみ保存され、ユーザー平均値の勝手な推計などは行いません。記載されている基準値はすべて学術論文に基づいています。",
  "本ドリルは認知機能の理解と興味のための無料ブラウザゲームであり、医療機器や臨床的診断ツールではありません。認知機能に関する医学的な懸念がある場合は、必ず専門の医療機関にご相談ください。"
],
  benchmarks: {
    title: "視空間パターン記憶スパンの標準ベンチマーク",
    headers: ["パフォーマンス階層", "パターンスパン (マス数)", "ドリルスコア", "認知ストレージ & チャンキング特性"],
    rows: [
  [
    "Tier 1（極めて優秀 / 上位1%）",
    "10 〜 14+ マス",
    "1,150+ 点",
    "卓越した視空間記憶。複雑なパターンを2〜3個の幾何学的ゲシュタルト単位に即座に分解。視覚キャッシュの保持が極めて強固で、450ms未満の打鍵間隔を維持。"
  ],
  [
    "Tier 2（優秀 / 上位15%〜5%）",
    "8 〜 9 マス",
    "850 〜 1,149 点",
    "一般成人の平均基準を大幅に超過。L字やトリプレットなどの迅速な形状チャンキングを実行。視覚的干渉に強く、450〜650msの正確なクリック間隔。"
  ],
  [
    "Tier 3（成人平均ベースライン / 50%）",
    "6 〜 7 マス",
    "550 〜 849 点",
    "健常成人の一般的な標準値（Della Sala et al., 1997）。ペアになった単純な塊を処理可能。5×5グリッドで周辺部のマスを取りこぼし始める。650〜900ms間隔。"
  ],
  [
    "Tier 4（平均以下 / 認知的ボトルネック）",
    "5 マス",
    "350 〜 549 点",
    "チャンキングを活用できない純粋な生容量の限界付近（Cowan, 2001）。図形化せずマスを個別に覚えようとする傾向。900〜1,200ms間隔。"
  ],
  [
    "Tier 5（要トレーニング / 低スパン）",
    "5 マス未満",
    "350 点未満",
    "視覚痕跡の減衰が極めて速い。視覚的ノイズに弱く、1.5秒の遅延中に4マスを超えるパターンを保持するのが困難。クリック間隔1,200ms超。"
  ]
],
    note: "パターンスパンは45秒セッション中に完全にクリアした最大セル構成を示します。パーセンタイル値は視覚パターン検査（VPT）の標準化データ（Della Sala et al., 1997; Luck & Vogel, 1997）に準拠。"
  },
  techniques: {
    title: "マトリックス視覚記憶容量を拡張するエビデンスベースの技法",
    items: [
  {
    "name": "ゲシュタルト空間形状チャンキング",
    "desc": "隣接する点灯マスを、三角形、直線、正方形、あるいは見慣れたアルファベットなどの幾何学的基本形状として心内でグループ化します（Wertheimer, 1923; Della Sala et al., 1999）。7個の独立した座標を2つの図形にまとめることで、認知負荷を60%以上圧縮できます。",
    "tips": "孤立したマスを1個ずつ見るのではなく、連結した線や角のブロックを最優先で視覚探索してください。"
  },
  {
    "name": "ネガティブスペース（消去法）の活用",
    "desc": "特定の領域に点灯マスが密集している場合は、点灯していない「空きマス（穴）」の配置を記憶します。6マスのブロック内で点灯している4マスを覚えるよりも、消えている2マスの位置を記憶する方が情報保持効率が劇的に高まります。",
    "tips": "あるブロックがほとんど点灯している場合、暗い「穴」の座標だけを意識的に記憶してください。"
  },
  {
    "name": "運動感覚的スクライブ（一筆書き）トレース",
    "desc": "1.5秒の点灯時間内に、点灯マスを一本の線でつなぐように視線と心内シミュレーションでなぞり「インナースクライブ」（Logie, 1995）を刺激します。運動野の経路計画が受動的な視覚キャッシュの保持を強化します。",
    "tips": "左上から右下へ流れるような一貫した走査順序を保つと、パターンに方向性が生まれ記憶が定着しやすくなります。"
  },
  {
    "name": "中心視野の固定と傍中心窩スナップショット",
    "desc": "ラウンド開始時はグリッドの幾何学的中心に視線を固定します。個別のマスへ視線を激しく動かす（サッケード）と像がブレるため、傍中心窩視野を活用して全体の空間トポロジーを一度に捉えます。",
    "tips": "焦点のピントをわずかに和らげ、パターン全体を一枚のシルエット写真のように網膜に焼き付ける意識を持ってください。"
  }
]
  },
  steps: [
  "グリッドの中心に視線を合わせ、パターンの瞬間点灯を待ちます。",
  "1.5秒の点灯中に、光ったマスを即座に2〜3個の幾何学的形状（チャンク）にグループ化します。",
  "密集した領域では空いているマス（ネガティブスペース）に注目し、情報量を最小化します。",
  "点灯が消えたら、記憶した幾何学的チャンクをグリッド上に素早くタップして再現します。",
  "4×4から5×5の拡大グリッドへと進み、自身の視覚性作業記憶の上限値を継続的に更新します。"
],
  audience: "FPSゲームでミニマップ状況把握を極めたいゲーマー、幾何学や立体図面を扱う理系学生、放射線科医、チェス・将棋プレイヤー、非言語性視覚記憶と集中力を高めたいすべての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'corsi1972', 'luck1997', 'milner1971', 'woods2015'),
  related: [
  {
    "href": "/drills/memory/working-memory/n-back",
    "label": "3-Back ワーキングメモリ課題"
  },
  {
    "href": "/drills/cognitive/focus/concentration-grid",
    "label": "シュルテテーブル（集中力グリッド）"
  },
  {
    "href": "/drills/memory/short-term-memory/digit-span",
    "label": "数唱記憶スパンテスト"
  },
  {
    "href": "/drills/reaction-speed/reaction-time-test",
    "label": "反射神経・反応速度テスト"
  },
  {
    "href": "/drills/reaction-speed/reflex-training-drill",
    "label": "反射神経ゲーム"
  }
]
};

export default function LocalizedGridMemorizationPage() {
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
      <GridMemorizationClient copy={{
        "h1Keyword": "瞬間記憶テスト",
        "h1Suffix": " – 無料グリッドパターン視覚記憶ゲーム",
        "caption": "視覚性作業記憶（ワーキングメモリ）は一度に約4つの独立したオブジェクトを保持でき、その制限は詳細度ではなくオブジェクトの個数に依存します（Luck & Vogel, 1997）。静的なグリッドパターンは形態と配置の受動的保持領域である視覚キャッシュ（Visual Cache）を直接測定・テストします（Logie, 1995）。",
        "statScore": "スコア",
        "statTime": "残り時間",
        "statGridSize": "グリッドサイズ",
        "statBest": "ベストスコア",
        "hudScore": "スコア",
        "hudTime": "時間",
        "startTitle": "グリッド瞬間記憶 Pro",
        "startSubtitle": "空間短期記憶 • パターン再生トレーニング",
        "countdownSubtitle": "準備してください",
        "newBest": "自己新記録",
        "pointsLabel": "ポイント",
        "statAccuracy": "正解率",
        "cellsUnit": "マス",
        "statPeakPattern": "最大パターン",
        "statPerfects": "パーフェクト",
        "btnPlayAgain": "もう一度プレイ",
        "rulesTitle": "ドリルルール & スコア算出方法",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "パターン記憶",
                        "highlight": "+150 PTS",
                        "result": "点灯したマスの位置を記憶し、タップして正確に再現"
                },
                {
                        "num": "2",
                        "text": "レベル進行",
                        "highlight": "4x4 → 5x5",
                        "result": "正解するごとにマトリックスと難易度が自然に拡大"
                },
                {
                        "num": "3",
                        "text": "ミス・時間切れ",
                        "highlight": "ペナルティなし",
                        "result": "減点や制限時間の減少はありません"
                },
                {
                        "num": "4",
                        "text": "レベル維持",
                        "highlight": "現在レベルをキープ",
                        "result": "ミスしてもレベルは下がらず、同じレベルで再挑戦"
                }
        ]
}} />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/grid-memorization"
          locale="ja"
        />
      </div>
    </>
  );
}
