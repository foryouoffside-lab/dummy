import SymbolMatchingClient from '@/app/drills/cognitive/processing-speed/symbol-matching/SymbolMatchingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "符号テストSDMT・記号数字置換 – 情報処理速度診断 | SkillDrills",
  description: "無料ブラウザ完結の符号テスト（Symbol Digit Modalities Test / SDMT）。記号と数字の対応マトリックスを照合して即座に入力し、情報処理速度、視覚スキャン効率、短期連想記憶を精密測定。",
  keywords: ["符号テスト SDMT", "情報処理速度 検査", "記号 数字 置換 テスト", "SDMT テスト 無料", "DSST テスト オンライン", "視覚走査 測定", "短期連想記憶 訓練", "認知機能 処理速度", "ウェクスラー 符号 検査", "脳トレ 記号合わせ",
    "符号検査 オンライン",
    "記号照合 脳トレ"],
  openGraph: {
    title: "符号テストSDMT・記号数字置換 – 情報処理速度診断 | SkillDrills",
    description: "無料ブラウザ完結の符号テスト（Symbol Digit Modalities Test / SDMT）。記号と数字の対応マトリックスを照合して即座に入力し、情報処理速度、視覚スキャン効率、短期連想記憶を精密測定。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "符号テストSDMT・記号数字置換 – 情報処理速度診断 | SkillDrills",
    description: "無料ブラウザ完結の符号テスト（Symbol Digit Modalities Test / SDMT）。記号と数字の対応マトリックスを照合して即座に入力し、情報処理速度、視覚スキャン効率、短期連想記憶を精密測定。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/symbol-matching'),
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
      "name": "認知・集中力トレーニング",
      "item": "https://skilldrills.online/ja/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "符号テスト SDMT",
      "item": "https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "符号テストSDMT・情報処理速度診断ツール",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "description": "無料ブラウザ完結の符号テスト（Symbol Digit Modalities Test / SDMT）。記号と数字の対応マトリックスを照合して即座に入力し、情報処理速度、視覚スキャン効率、短期連想記憶を精密測定。",
  "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "inLanguage": "ja-JP",
  "dateModified": "2026-09-11"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "符号テストSDMT・記号数字置換 – 情報処理速度診断",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching",
  "inLanguage": "ja-JP",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "符号テスト SDMT – 記号数字高速照合ゲーム",
  "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching",
  "description": "無料ブラウザ完結の符号テスト（Symbol Digit Modalities Test / SDMT）。記号と数字の対応マトリックスを照合して即座に入力し、情報処理速度、視覚スキャン効率、短期連想記憶を精密測定。",
  "genre": [
    "Action",
    "Brain Game",
    "Cognitive Training"
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
    "priceCurrency": "JPY"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "符号テスト（Symbol Digit Modalities Test: SDMT）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aaron Smith（1973）によって開発された、記号と数字の対応関係を素早く読み取って入力する標準的な神経心理学的情報処理速度テストです。"
      }
    },
    {
      "@type": "Question",
      "name": "DSST（Wechsler符号問題）との違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DSSTが数字を見て記号を書くのに対し、SDMTは記号を見て数字を入力するため、手の運動器用さによる影響を減らして純粋な脳の認知処理速度を測定できます。"
      }
    },
    {
      "@type": "Question",
      "name": "このテストで測定される認知領域は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "(1)情報処理速度、(2)視覚スキャン効率、(3)短期の対連合学習・記憶、(4)持続的注意力の4領域です。"
      }
    },
    {
      "@type": "Question",
      "name": "正常成人の平均スコア基準は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "臨床データにおいて、20〜34歳の健常成人は90秒間に平均65〜75個の正しい置換を達成します（Smith, 1973; Der & Deary, 2006）。"
      }
    },
    {
      "@type": "Question",
      "name": "これは医学的な診断テストですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ。本ツールは同じ科学的パラダイムに基づいて作成された認知トレーニングゲームであり、医療診断や病気のスクリーニングを行うものではありません。"
      }
    },
    {
      "@type": "Question",
      "name": "マトリックスの暗記はスコアにどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "記号と数字のペアを短期記憶に定着させることで、毎回上部の凡例を見る視線移動時間がゼロになり、大幅にスコアが向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "視線の効率的な動かし方は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "凡例とターゲットの間を行き来する距離を最小限にし、2〜3個の記号をまとめてチャンク化して処理するのがコツです。"
      }
    },
    {
      "@type": "Question",
      "name": "加齢に伴う処理速度の変化は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "情報処理速度は成人期早期以降に緩やかに低下しますが、日々の訓練や有酸素運動で低下を防ぐことができます。"
      }
    },
    {
      "@type": "Question",
      "name": "おすすめのトレーニング頻度は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1日10分間集中して行うことで、視覚探索速度と作業記憶の呼び出し効率が向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "スマートフォンでも測定できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、画面下部に押しやすい1〜6のテンキーが配置され、スマホ・PC両方で快適に操作できます。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "符号テストSDMT・記号数字置換",
  "description": "無料ブラウザ完結の符号テスト（Symbol Digit Modalities Test / SDMT）。記号と数字の対応マトリックスを照合して即座に入力し、情報処理速度、視覚スキャン効率、短期連想記憶を精密測定。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "上部凡例キーマトリックスの確認",
      "text": "ヘッダーに並ぶ6つの固有記号と数字（1〜6）の対応関係を素早く把握します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "中央ターゲット記号の瞬間認識",
      "text": "中央プロンプトに出現する記号を瞬時に視認します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "対応数字キーの即時タップ",
      "text": "記憶または素早い凡例スキャンに基づいて、対応する数字キー（1〜6）をタップします。",
      "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "流れるような連想リズムの維持",
      "text": "視線移動を減らして記号と数字の結合を自動化し、制限時間内に最大スコアを目指します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('smith1973', 'der2006', 'woods2015'),
  intro: {
    title: "符号テストSDMT・記号数字置換 – 情報処理速度診断",
    paragraphs: [
      "無料ブラウザ完結の符号テスト（Symbol Digit Modalities Test / SDMT）。記号と数字の対応マトリックスを照合して即座に入力し、情報処理速度、視覚スキャン効率、短期連想記憶を精密測定。",
      "DSSTが数字を見て記号を書くのに対し、SDMTは記号を見て数字を入力するため、手の運動器用さによる影響を減らして純粋な脳の認知処理速度を測定できます。",
      "(1)情報処理速度、(2)視覚スキャン効率、(3)短期の対連合学習・記憶、(4)持続的注意力の4領域です。",
    ],
  },
  benchmarks: {
    title: '認知パフォーマンス標準評価（ベンチマーク）',
    headers: ['等級 (Tier)', '称号 (Rank)', '評価基準', '到達ランク', '正答率', 'パーセンタイル'],
    rows: [
      { tier: 'Tier 1', rank: 'グランドマスター / 超高速記号連想エリート', stat: '上位 1%', level: 'マスタリー（極限）', accuracy: '98% 以上', percentile: '上位 1%' },
      { tier: 'Tier 2', rank: '上級記号照合スペシャリスト', stat: '上位 5%', level: 'ダイヤモンド（優秀）', accuracy: '94–97%', percentile: '上位 5%' },
      { tier: 'Tier 3', rank: '熟練視覚スキャナー', stat: '上位 15%', level: 'プラチナ（熟練）', accuracy: '88–93%', percentile: '上位 15%' },
      { tier: 'Tier 4', rank: '一般成人標準', stat: '上位 50%', level: 'ゴールド（標準）', accuracy: '78–87%', percentile: '上位 50%' },
      { tier: 'Tier 5', rank: '入門・初期基準値', stat: '基準値（基礎）', level: 'シルバー（基礎）', accuracy: '78% 未満', percentile: '基準値（下位）' },
    ],
  },
  protocols: {
    title: '脳の処理速度と集中力を高める4大トレーニングプロトコル',
    description: 'スミス記号数字様式検査（SDMT, Smith, 1973）および神経心理学的処理速度基準に基づく、視覚記号の瞬間対連合と作業記憶変換を極限まで高める科学的認知トレーニングプロトコルです。',
    items: [
      { title: "上部凡例キーマトリックスの確認", description: "ヘッダーに並ぶ6つの固有記号と数字（1〜6）の対応関係を素早く把握します。" },
      { title: "中央ターゲット記号の瞬間認識", description: "中央プロンプトに出現する記号を瞬時に視認します。" },
      { title: "対応数字キーの即時タップ", description: "記憶または素早い凡例スキャンに基づいて、対応する数字キー（1〜6）をタップします。" },
      { title: "流れるような連想リズムの維持", description: "視線移動を減らして記号と数字の結合を自動化し、制限時間内に最大スコアを目指します。" },
    ],
  },
  faqs: {
    title: 'よくある質問 (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function LocalizedCognitivePage() {
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
      <SymbolMatchingClient copy={{ title: "符号テストSDMT・記号数字置換 – 情報処理速度診断" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/ja/drills/cognitive/processing-speed/symbol-matching" />
      </div>
    </>
  );
}
