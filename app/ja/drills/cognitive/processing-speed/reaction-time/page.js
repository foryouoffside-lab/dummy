import EliteNeuroSwitchClient from '@/app/drills/cognitive/processing-speed/reaction-time/EliteNeuroSwitchClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "選択反応時間テスト・判断速度測定 – ヒックの法則診断 | SkillDrills",
  description: "無料ブラウザ完結の選択反応時間（CRT）測定ツール。動的に反転する色ルールを瞬時に判別して正しい標的をクリックし、意思決定潜時と前頭葉の認知柔軟性をミリ秒単位で精密診断。",
  keywords: ["選択反応時間 テスト", "判断速度 測定", "ヒックの法則 テスト", "反応速度 テスト 無料", "認知 処理速度 測定", "意思決定 速度 診断", "反射神経 測定 オンライン", "選択反応 課題", "認知的柔軟性 テスト", "脳 反応時間",
    "ドンデルス反応時間",
    "選択反応時間 平均"],
  openGraph: {
    title: "選択反応時間テスト・判断速度測定 – ヒックの法則診断 | SkillDrills",
    description: "無料ブラウザ完結の選択反応時間（CRT）測定ツール。動的に反転する色ルールを瞬時に判別して正しい標的をクリックし、意思決定潜時と前頭葉の認知柔軟性をミリ秒単位で精密診断。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "選択反応時間テスト・判断速度測定 – ヒックの法則診断 | SkillDrills",
    description: "無料ブラウザ完結の選択反応時間（CRT）測定ツール。動的に反転する色ルールを瞬時に判別して正しい標的をクリックし、意思決定潜時と前頭葉の認知柔軟性をミリ秒単位で精密診断。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/reaction-time'),
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
      "name": "選択反応時間テスト",
      "item": "https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "選択反応時間・判断速度診断ツール",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "description": "無料ブラウザ完結の選択反応時間（CRT）測定ツール。動的に反転する色ルールを瞬時に判別して正しい標的をクリックし、意思決定潜時と前頭葉の認知柔軟性をミリ秒単位で精密診断。",
  "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time",
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
  "name": "選択反応時間テスト・判断速度測定 – ヒックの法則診断",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time",
  "inLanguage": "ja-JP",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "選択反応時間テスト – 動的ルール判別＆反射神経ゲーム",
  "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time",
  "description": "無料ブラウザ完結の選択反応時間（CRT）測定ツール。動的に反転する色ルールを瞬時に判別して正しい標的をクリックし、意思決定潜時と前頭葉の認知柔軟性をミリ秒単位で精密診断。",
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
      "name": "選択反応時間（Choice Reaction Time: CRT）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "複数の刺激の中から正しいターゲットを識別・判断し、それに対応する正しい運動命令を出力するまでにかかる総合的な意思決定時間です。"
      }
    },
    {
      "@type": "Question",
      "name": "単純反応時間（SRT）との決定的な違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "単純反応（約200ms）が単一の刺激に即座に反応するのに対し、選択反応（約250〜350ms）は「刺激の弁別」と「反応の選択」という大脳皮質の判断ステージが加わります（Donders, 1868）。"
      }
    },
    {
      "@type": "Question",
      "name": "ヒックの法則（Hick's Law, 1952）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "選択肢の数が増えるほど、反応時間は対数関数的に増加するという数理法則です（RT = a + b * log2(n)）。"
      }
    },
    {
      "@type": "Question",
      "name": "人間の平均的な選択反応時間の基準値は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "一般成人の平均は280〜350msです。高度に訓練されたプロゲーマーやトップアスリートは180〜230msに達します（Der & Deary, 2006）。"
      }
    },
    {
      "@type": "Question",
      "name": "ルール反転が加わることの意義は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ターゲット色が赤と青で交互に切り替わるため、前頭前野が直前の習慣的反応を抑制し、新しい規則へ適応する認知的柔軟性を試します。"
      }
    },
    {
      "@type": "Question",
      "name": "選択反応速度はトレーニングで速くなりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、刺激の視覚弁別と運動出力の神経回路が反復によって強化され、判断の迷いが削ぎ落とされます。"
      }
    },
    {
      "@type": "Question",
      "name": "年齢による反応速度の変化は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "20代前半をピークに加齢とともに年間約1〜2msずつ低下しますが、継続的な認知トレーニングで維持が可能です。"
      }
    },
    {
      "@type": "Question",
      "name": "ハードウェアによる遅延の誤差は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "144Hzモニターと1000Hzマウスは入力・表示遅延を最小化します（Woods et al., 2015）。5ms以内の微差は計測ノイズとして扱われます。"
      }
    },
    {
      "@type": "Question",
      "name": "推奨される日常トレーニング時間は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1日10〜15分、実戦ゲームや運転の前に行うことで神経伝達が目覚めます。"
      }
    },
    {
      "@type": "Question",
      "name": "完全無料で測定できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、SkillDrillsは完全無料・登録不要でブラウザ上ですぐに診断可能です。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "選択反応時間テスト・判断速度測定",
  "description": "無料ブラウザ完結の選択反応時間（CRT）測定ツール。動的に反転する色ルールを瞬時に判別して正しい標的をクリックし、意思決定潜時と前頭葉の認知柔軟性をミリ秒単位で精密診断。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "アクティブルール表示の確認",
      "text": "画面上部に表示されている現在のターゲット色（TAP RED または TAP BLUE）を把握します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "出現ターゲットの瞬時弁別",
      "text": "画面に現れるターゲット群の中から、現在の指定色と一致するノードを目で素早く識別します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "的確な打鍵の実行",
      "text": "誤ったノードを避け、正しい色のノードを消滅する前にミリ秒単位のスピードでクリックします。",
      "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "ルール反転への瞬間順応",
      "text": "上部のルール表示が切り替わった瞬間、即座に旧ルールを抑制して新ルール色へと照準を移します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('donders1969', 'hick1952', 'hyman1953', 'der2006', 'woods2015'),
  intro: {
    title: "選択反応時間テスト・判断速度測定 – ヒックの法則診断",
    paragraphs: [
      "無料ブラウザ完結の選択反応時間（CRT）測定ツール。動的に反転する色ルールを瞬時に判別して正しい標的をクリックし、意思決定潜時と前頭葉の認知柔軟性をミリ秒単位で精密診断。",
      "単純反応（約200ms）が単一の刺激に即座に反応するのに対し、選択反応（約250〜350ms）は「刺激の弁別」と「反応の選択」という大脳皮質の判断ステージが加わります（Donders, 1868）。",
      "選択肢の数が増えるほど、反応時間は対数関数的に増加するという数理法則です（RT = a + b * log2(n)）。",
    ],
  },
  benchmarks: {
    title: '認知パフォーマンス標準評価（ベンチマーク）',
    headers: ['等級 (Tier)', '称号 (Rank)', '評価基準', '到達ランク', '正答率', 'パーセンタイル'],
    rows: [
      { tier: 'Tier 1', rank: 'グランドマスター / 超高速判断エリート', stat: '上位 1%', level: 'マスタリー（極限）', accuracy: '98% 以上', percentile: '上位 1%' },
      { tier: 'Tier 2', rank: '上級認知弁別スペシャリスト', stat: '上位 5%', level: 'ダイヤモンド（優秀）', accuracy: '94–97%', percentile: '上位 5%' },
      { tier: 'Tier 3', rank: '熟練オペレーター', stat: '上位 15%', level: 'プラチナ（熟練）', accuracy: '88–93%', percentile: '上位 15%' },
      { tier: 'Tier 4', rank: '一般成人標準', stat: '上位 50%', level: 'ゴールド（標準）', accuracy: '78–87%', percentile: '上位 50%' },
      { tier: 'Tier 5', rank: '入門・初期基準値', stat: '基準値（基礎）', level: 'シルバー（基礎）', accuracy: '78% 未満', percentile: '基準値（下位）' },
    ],
  },
  protocols: {
    title: '脳の処理速度と集中力を高める4大トレーニングプロトコル',
    description: 'ヒックの法則（Hick, 1952）とドンデルス減算法（Donders, 1969）に基づく、視覚弁別速度と神経決定潜時を極限まで短縮する科学的選択反応時間トレーニングプロトコルです。',
    items: [
      { title: "アクティブルール表示の確認", description: "画面上部に表示されている現在のターゲット色（TAP RED または TAP BLUE）を把握します。" },
      { title: "出現ターゲットの瞬時弁別", description: "画面に現れるターゲット群の中から、現在の指定色と一致するノードを目で素早く識別します。" },
      { title: "的確な打鍵の実行", description: "誤ったノードを避け、正しい色のノードを消滅する前にミリ秒単位のスピードでクリックします。" },
      { title: "ルール反転への瞬間順応", description: "上部のルール表示が切り替わった瞬間、即座に旧ルールを抑制して新ルール色へと照準を移します。" },
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
      <EliteNeuroSwitchClient copy={{ title: "選択反応時間テスト・判断速度測定 – ヒックの法則診断" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/ja/drills/cognitive/processing-speed/reaction-time" />
      </div>
    </>
  );
}
