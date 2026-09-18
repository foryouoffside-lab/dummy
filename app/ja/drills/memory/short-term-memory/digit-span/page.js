import DigitSpanClient from '@/app/drills/memory/short-term-memory/digit-span/DigitSpanClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "数唱テスト・デジットスパン – 音韻ループ・数字記憶測定 | SkillDrills",
  description: "無料のオンライン数唱課題（Digit Span Test / 数唱検査）。ランダムに点滅する数字シーケンスを記憶し、音韻ループ容量と短期記憶スパンを測定・トレーニング。",
  keywords: [
    "数唱課題",
    "数唱テスト",
    "デジットスパン",
    "音韻ループ テスト",
    "作業記憶 測定",
    "数字 記憶 ゲーム",
    "短期記憶 スパン 検査",
    "チャンキング 記憶術",
    "脳トレ 数字記憶",
    "WAIS 数唱検査",
    "記憶容量 測定",
    "系列位置効果 テスト"
  ],
  openGraph: {
    title: "数唱テスト・デジットスパン – 音韻ループ・数字記憶測定 | SkillDrills",
    description: "無料のオンライン数唱課題（Digit Span Test / 数唱検査）。ランダムに点滅する数字シーケンスを記憶し、音韻ループ容量と短期記憶スパンを測定・トレーニング。",
    type: 'website',
    url: 'https://skilldrills.online/ja/drills/memory/short-term-memory/digit-span',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "数唱テスト・デジットスパン – 音韻ループ・数字記憶測定 | SkillDrills",
    description: "無料のオンライン数唱課題（Digit Span Test / 数唱検査）。ランダムに点滅する数字シーケンスを記憶し、音韻ループ容量と短期記憶スパンを測定・トレーニング。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/memory/short-term-memory/digit-span',
    languages: getAlternateLanguages('/drills/memory/short-term-memory/digit-span'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "記憶力トレーニング", "item": "https://skilldrills.online/ja/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "短期記憶", "item": "https://skilldrills.online/ja/drills/memory/short-term-memory" },
    { "@type": "ListItem", "position": 4, "name": "数唱課題", "item": "https://skilldrills.online/ja/drills/memory/short-term-memory/digit-span" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "数唱課題・数唱テスト（デジットスパン）",
  "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/digit-span",
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
  "name": "数唱課題・数唱テスト（デジットスパン）",
  "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/digit-span",
  "description": "提示される数字シーケンスを記憶して順方向に正確に入力し、音韻ループ容量と短期記憶スパンを測定する無料ブラウザ神経心理学テスト。",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Working Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "数唱課題・数唱テスト (Digit Span)",
  "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/digit-span",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "数唱課題で数字短期記憶スパンを鍛える方法",
  "description": "音韻ループとリズミカルなチャンキング（塊化）を活用し、数字記憶スパンを限界まで拡張するための4段階実践プロトコル。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/digit-span#step-1",
      
      "name": "中心画面への視線集中",
      "text": "3秒間の提示ウィンドウ中に画面中央を注視し、出現する数字シーケンスを視野全体で確実に知覚・符号化します。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/digit-span#step-2",
      
      "name": "リズムによる3桁チャンキング",
      "text": "電話番号のように数字を2〜3桁のまとまり（例：'739-281'）に区切り、リズムに乗せて情報単位を圧縮します。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/digit-span#step-3",
      
      "name": "内言語リハーサル（音韻ループ）の維持",
      "text": "声に出さず頭の中で素早く呪文のように数字列を反復し、1.5〜2秒で消滅する音韻痕跡の減衰を防ぎます。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ja/drills/memory/short-term-memory/digit-span#step-4",
      
      "name": "キーパッドによる迅速なシーケンス入力",
      "text": "入力画面に切り替わったら、音韻記憶の残響が消える前に一定の打鍵リズムを保って数字を順方向に入力します。"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "数唱課題（デジットスパンテスト）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "言語性短期記憶、作業記憶（ワーキングメモリ）容量、および注意力を測定するための最も代表的な神経心理学検査です。提示される一連のランダムな数字を記憶し、同じ順序（順唱）で正確に再生・入力します。"
      }
    },
    {
      "@type": "Question",
      "name": "数唱テストの一般的な成人の平均スコアはどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "健常な成人の平均順唱スパンは5〜7桁です（標準偏差1〜2）。7桁の成績はジョージ・ミラーの古典的マジカルナンバー『7±2』に一致し、9桁以上を記憶できる人は高度な認知的チャンキング技術を駆使しています。"
      }
    },
    {
      "@type": "Question",
      "name": "順唱（Forward）と逆唱（Backward）の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "順唱は受動的な短期記憶保管庫と音韻ループ容量を測定します。一方、逆唱は記憶した数字を頭の中で逆順に並び替える心的操作が必要となるため、中央実行系（エグゼクティブ・コントロール）を直接動員する真の作業記憶検査となります。"
      }
    },
    {
      "@type": "Question",
      "name": "WAIS知能検査における数唱下位検査とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ウェクスラー成人知能検査（WAIS-IV）の中核下位検査の一つで、ワーキングメモリ指標（WMI）の算出に使用されます。継次処理能力、注意の持続力、心的操作の柔軟性を総合的に評価します。"
      }
    },
    {
      "@type": "Question",
      "name": "音韻ループ（Phonological Loop）は数唱成績にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "アラン・バドリーのモデルによると、数字は『音韻ストア（内耳）』に保持され、『構音リハーサル（内言語）』によって維持されます。音響痕跡は約1.5〜2秒で急速に減衰するため、頭の中で素早く反復唱和できる速度が記憶スパンの長さを直接決定します。"
      }
    },
    {
      "@type": "Question",
      "name": "ミラーの法則とマジカルナンバー7（7±2）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "心理学者ジョージ・ミラーが1956年に提唱した法則で、人間の直接的記憶容量は約7±2個の情報項目に制限されると主張しました。現代の認知モデル（Cowan, 2001）では、チャンキングなしの純粋な焦点容量は約4個であり、7桁以上は塊化によって達成されることが証明されています。"
      }
    },
    {
      "@type": "Question",
      "name": "チャンキング（塊化）によってなぜ数字記憶が向上するのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "個々の数字を『839 - 241』のように電話番号のリズムで2〜3桁ずつの意味ある塊（チャンク）にまとめることで、6個の独立した項目を2個の情報単位に圧縮し、4個のワーキングメモリ容量制限を容易に突破できます。"
      }
    },
    {
      "@type": "Question",
      "name": "ミスした後に提示される桁数が1桁減るのはなぜですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "本ドリルは1-up / 1-down適応型階段法（Staircase Protocol）を採用しています。間違えた際に桁数を下げることで、過度な疲労を防ぎながら、あなたの真の記憶限界スパンを統計的に正確に特定します。"
      }
    },
    {
      "@type": "Question",
      "name": "数唱トレーニングは日常の集中力や認知機能を向上させますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "定期的な数唱課題の訓練は、持続的注意制御を強化し、マインドワンダリング（注意散漫）を低減させ、プログラミングや暗算、学習全般に役立つ情報圧縮・処理の習慣を脳に定着させます。"
      }
    },
    {
      "@type": "Question",
      "name": "このオンライン数唱テストは無料でブラウザ完結ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。SkillDrillsの数唱課題は完全無料で、アカウント登録やアプリのインストールは一切不要です。ブラウザ上でミリ秒精度のデジタル時間計測を用いて即座にプレイ・自己測定が可能です。"
      }
    }
  ]
};

const digitSpanGuide = {
  intro: [
  "数唱課題・数唱テスト（Digit Span Memory Test）は、言語性短期記憶、ワーキングメモリ容量、および音韻処理能力を測定・訓練するための世界標準の神経心理学アセスメントです。1世紀以上にわたり認知心理学および臨床知能検査で中核的役割を果たしてきました。",
  "数唱研究の理論的基盤は、ジョージ・ミラー（George A. Miller, 1956）の名著『マジカルナンバー7±2』に始まります。デイヴィッド・ウェクスラー（David Wechsler, 1939, 1955, 2008）は順唱・逆唱・並び替え数唱をWAIS知能検査に統合し、ワーキングメモリ指標（WMI）を測定する臨床的ゴールドスタンダードとして確立しました。",
  "アラン・バドリー（Alan Baddeley, 1974, 2000）のワーキングメモリモデルにおいて、提示された数字列は『音韻ループ（Phonological Loop）』で処理されます。音韻ストア内の音響痕跡は約1.5〜2.0秒で急速に消失するため、内言語による構音リハーサルが不可欠です。またネルソン・カウアン（Nelson Cowan, 2001）の研究が示す通り、未処理の純粋な容量はわずか4±1個に過ぎず、長大な数字列を記憶するにはリズミカルな空間・音声チャンキングが決定的に重要です。",
  "本ドリルは高精度デジタル時間計測（Woods et al., 2015）を搭載し、標準化された3秒間の瞬間提示と適応型階段進行により、あなたの真の数字短期記憶スパンを測定します。",
  "測定の仕組み：すべてのイベントはブラウザの performance.now() 高精度クロックを用いてローカル環境でミリ秒単位で処理され、外部へのデータ送信は一切行われません。Spectre対策によりタイマーは約1msに丸められ、ディスプレイのリフレッシュレート（60Hz環境で約16.7ms）に同期して描画されます（Woods et al., 2015）。5ms未満の微小な差は環境ノイズと捉え、同一デバイスでの推移を観察してください。",
  "データ透明性：SkillDrillsは個人データや集計データを一切収集しません。スコアや設定はお使いのブラウザのlocalStorageにのみ保存され、ユーザー平均値の勝手な推計などは行いません。記載されている基準値はすべて学術論文に基づいています。",
  "本ドリルは認知機能の理解と訓練のための無料ブラウザゲームであり、医療機器や臨床的診断ツールではありません。認知機能に関する医学的な懸念がある場合は、必ず専門の医療機関にご相談ください。"
],
  benchmarks: {
    title: "数唱スパンと作業記憶の標準ベンチマーク",
    headers: ["パフォーマンス階層", "数唱スパン (桁数)", "WAIS換算評価点", "認知的ストレージ & 処理プロファイル"],
    rows: [
  [
    "Tier 1（極めて優秀 / 上位1%）",
    "9 〜 12+ 桁",
    "評価点 16 〜 19",
    "記憶術の達人水準。3〜4桁のリズミカルなチャンキングを即座に実行。音韻ループの保持が完璧で、キー入力間隔は350ms未満。"
  ],
  [
    "Tier 2（優秀 / 上位15%〜5%）",
    "7 〜 8 桁",
    "評価点 12 〜 15",
    "ミラーの古典的基準値（7桁）を達成。安定した2〜3桁の塊を構築し、時間的減衰に対して極めて強固。入力間隔350〜500ms。"
  ],
  [
    "Tier 3（成人平均ベースライン / 50%）",
    "5 〜 6 桁",
    "評価点 8 〜 11",
    "健常成人の一般的な標準平均。基本的なペアの塊化を処理可能。6桁を超えると音響的混同や減衰が生じ始める。入力間隔500〜700ms。"
  ],
  [
    "Tier 4（平均以下 / 容量限界）",
    "4 桁",
    "評価点 5 〜 7",
    "カウアンの生容量限界（4項目）付近で作動。内言語リハーサルを怠ると4桁を超える数字列で脱落。入力間隔700〜950ms。"
  ],
  [
    "Tier 5（要トレーニング / 低スパン）",
    "3 桁",
    "評価点 1 〜 4",
    "3桁の連続保持にも困難を感じる状態。注意散漫や即時減衰の影響を極めて受けやすい。入力間隔950ms超。"
  ]
],
    note: "数唱スパンはエラーなく完全に入力できた最大数字長を示します。WAIS評価点換算は成人標準化データ（Wechsler, 2008; Woods et al., 2015）に準拠。"
  },
  techniques: {
    title: "数字記憶スパンを飛躍的に拡張する科学的アプローチ",
    items: [
  {
    "name": "音声リズムと3桁チャンキング",
    "desc": "数字列を電話番号のように3桁ずつのまとまり（例：'739 - 281 - 405'）に分割します（Miller, 1956）。9個の独立した数字が3個のチャンクに圧縮され、カウアンの4項目制限内に無理なく収まります。",
    "tips": "各まとまりの最初の数字の心内ピッチを少し上げることで、チャンクの境界が明確になります。"
  },
  {
    "name": "構音ループ（内言語反復）の超高速同期",
    "desc": "頭の中で数字列を早口言葉のように素早くループ唱和します（Baddeley, 1986）。音韻ストアの痕跡は2秒足らずで消滅するため、高速に反復することで信号の減衰を未然に防ぎます。",
    "tips": "数字を1文字ずつ孤立して言うのではなく、複数桁をひとつの単語のように滑らかに唱和してください。"
  },
  {
    "name": "テンキーの運動感覚的軌跡の視覚化",
    "desc": "数字列をテンキー（3×3配置）上の指の移動ルートとして空間的に結びつけます（Logie, 1995）。聴覚ループに加えて運動野の空間シミュレーションを動員し、記憶の二重符号化を図ります。",
    "tips": "数字が提示される際、テンキー上をジグザグに走る幾何学的な線を思い描いてください。"
  },
  {
    "name": "初頭効果と親近効果の活用",
    "desc": "系列位置効果により、最初の数字は先行リハーサル（初頭効果）で強固になり、最後の2桁は直前の残響（親近効果）で鮮明に残ります。意識的なリハーサルは中央の数字に集中させてください。",
    "tips": "最初の3桁を即座に固定し、最後の2桁は直後の耳の残響に頼ることで中央の忘却を防げます。"
  }
]
  },
  steps: [
  "画面中央の表示枠に視線を合わせ、3秒間の数字提示フェーズを待ちます。",
  "数字が表示されたら、瞬時に2〜3桁ずつのリズミカルなグループに分割します。",
  "頭の中で数字のまとまりを呪文のように反復唱和し、音韻減衰を防ぎます。",
  "入力フェーズに入ったら、画面上またはテンキーを使って正確な順番で素早く入力します。",
  "適応型階段スケーリングにより、自身の限界スパンを継続的に更新します。"
],
  audience: "記憶力や計算力を向上させたい学生、WAISや公務員・適性検査の対策を行う受験者、暗算や集中力を高めたいすべての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'baddeley2000', 'logie1995', 'woods2015'),
  related: [
  {
    "href": "/drills/memory/working-memory/n-back",
    "label": "3-Back ワーキングメモリ課題"
  },
  {
    "href": "/drills/memory/spatial-memory/grid-memorization",
    "label": "瞬間記憶テスト（グリッド記憶）"
  },
  {
    "href": "/drills/cognitive/focus/concentration-grid",
    "label": "シュルテテーブル（集中力グリッド）"
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

export default function LocalizedDigitSpanPage() {
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
      <DigitSpanClient copy={{
        "h1Keyword": "数唱課題・数唱テスト",
        "h1Suffix": " – 無料デジットスパン数字記憶ゲーム",
        "caption": "次々と表示される数字シーケンスを記憶し、同じ順番で正確に入力してください。",
        "statScore": "スコア",
        "statTime": "残り時間",
        "statSpan": "スパン",
        "digitsUnit": "桁",
        "statBest": "ベストスコア",
        "hudScore": "スコア",
        "hudTime": "時間",
        "memorizeTitle": "数字シーケンスを記憶",
        "evaluating": "判定中...",
        "startTitle": "数唱課題 Pro",
        "startSubtitle": "数字短期記憶 • シーケンス再生テスト",
        "countdownSubtitle": "準備してください",
        "newBest": "自己新記録",
        "pointsLabel": "ポイント",
        "statAccuracy": "正解率",
        "statPeakSpan": "最大スパン",
        "statPerfects": "パーフェクト",
        "btnPlayAgain": "もう一度プレイ",
        "rulesTitle": "ドリルルール & スコア算出方法",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "数字シーケンス再生",
                        "highlight": "+100 PTS",
                        "result": "点滅表示される数字を記憶しオンスクリーンキーパッドで入力"
                },
                {
                        "num": "2",
                        "text": "桁数ボーナス",
                        "highlight": "最大+120% PTS",
                        "result": "スパン（桁数）が長くなるほど獲得スコアが大幅増加"
                },
                {
                        "num": "3",
                        "text": "ミス・時間切れ",
                        "highlight": "-1 桁",
                        "result": "減点や残り時間の減少はなく、難易度が1桁下がって再挑戦"
                },
                {
                        "num": "4",
                        "text": "適応型スパン測定",
                        "highlight": "自動昇降",
                        "result": "正解・不正解に応じて真の記憶スパン閾値へ自然に収束"
                }
        ]
}} />
      <DrillGuide guide={digitSpanGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/digit-span"
          locale="ja"
        />
      </div>
    </>
  );
}
