import DualTargetFlowClient from '@/app/drills/cognitive/attention/multi-tasking/DualTargetFlowClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "マルチタスクテスト・二重ターゲット追従 – 並行処理能力診断 | SkillDrills",
  description: "無料ブラウザ完結のマルチタスクテスト。対向方向に流れる2つの独立した図形ストリームを両視野で同時に監視し、タスク切り替えコストと大脳半球間の協調処理能力を精密測定。",
  keywords: ["マルチタスク 練習", "マルチタスク テスト", "二重ターゲット 追従", "並行処理 能力 測定", "タスク切り替え コスト", "認知的柔軟性 テスト", "両視野 追従 訓練", "脳トレ マルチタスク", "注意配分 テスト", "大脳半球 協調 検査", "視覚ストリーム 処理", "情報処理速度 測定"],
  openGraph: {
    title: "マルチタスクテスト・二重ターゲット追従 – 並行処理能力診断 | SkillDrills",
    description: "無料ブラウザ完結のマルチタスクテスト。対向方向に流れる2つの独立した図形ストリームを両視野で同時に監視し、タスク切り替えコストと大脳半球間の協調処理能力を精密測定。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "マルチタスクテスト・二重ターゲット追従 – 並行処理能力診断 | SkillDrills",
    description: "無料ブラウザ完結のマルチタスクテスト。対向方向に流れる2つの独立した図形ストリームを両視野で同時に監視し、タスク切り替えコストと大脳半球間の協調処理能力を精密測定。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking',
    languages: getAlternateLanguages('/drills/cognitive/attention/multi-tasking'),
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
      "name": "マルチタスクテスト",
      "item": "https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "マルチタスク二重ターゲット追従診断ツール",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "description": "無料ブラウザ完結のマルチタスクテスト。対向方向に流れる2つの独立した図形ストリームを両視野で同時に監視し、タスク切り替えコストと大脳半球間の協調処理能力を精密測定。",
  "url": "https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking",
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
  "name": "マルチタスクテスト・二重ターゲット追従 – 並行処理能力診断",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "url": "https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking",
  "inLanguage": "ja-JP",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "マルチタスクテスト – 対向ストリーム並行追従ゲーム",
  "url": "https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking",
  "description": "無料ブラウザ完結のマルチタスクテスト。対向方向に流れる2つの独立した図形ストリームを両視野で同時に監視し、タスク切り替えコストと大脳半球間の協調処理能力を精密測定。",
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
      "name": "マルチタスクテスト（Dual-Target Flow）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "反対方向に流れる2つの図形ストリームを左右の両眼・両半球視野で同時に監視し、指定された形状のみを正確にタップする並行処理能力測定ゲームです。"
      }
    },
    {
      "@type": "Question",
      "name": "タスク切り替えコスト（Switch Cost, Rogers & Monsell, 1995）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "異なる作業ルール間を行き来する際、前頭葉の認知リセットに伴って生じる反応速度の低下とエラー増加のことです。"
      }
    },
    {
      "@type": "Question",
      "name": "人間は本当に完全なマルチタスクが可能ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "高度な注意を要する作業では、脳は並列処理ではなく高速な時分割シリアル処理（Pashler, 1994）を行っています。"
      }
    },
    {
      "@type": "Question",
      "name": "メディア・マルチタスクの落とし穴（Ophir et al., 2009）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "過度なマルチタスク習慣は注意散漫を招き、無関係な刺激をフィルタリングする能力を低下させることが実証されています。"
      }
    },
    {
      "@type": "Question",
      "name": "両視野追従で鍛えられる脳の部位は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "後頭葉・頭頂葉の空間視覚経路と、左右の脳梁（Corpus Callosum）を通じた両半球間情報伝達が強化されます。"
      }
    },
    {
      "@type": "Question",
      "name": "高スコアを出すための視線使いのコツは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "一方のストリームを直視せず、両ストリームの中間地点にソフトフォーカス（広い視野）を置き、周辺視野で照合を行うことです。"
      }
    },
    {
      "@type": "Question",
      "name": "レベルが上がるとどう難しくなりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ストリームの流速が加速し、ターゲット図形の種類が複雑化して許容判定時間が短縮されます。"
      }
    },
    {
      "@type": "Question",
      "name": "入力遅延はスコアに影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "高速スクロール時の輪郭視認性には高リフレッシュレート（144Hz+）が有利に働きます（Woods et al., 2015）。"
      }
    },
    {
      "@type": "Question",
      "name": "1回の練習時間はどれくらいが適切ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "極度の認知疲労を避けるため、1回10〜15分のセッションが推奨されます。"
      }
    },
    {
      "@type": "Question",
      "name": "スマートフォンでもプレイできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、縦画面モード（上下フロー）と横画面モード（左右フロー）の両方に完全対応しています。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "マルチタスクテスト・二重ターゲット追従",
  "description": "無料ブラウザ完結のマルチタスクテスト。対向方向に流れる2つの独立した図形ストリームを両視野で同時に監視し、タスク切り替えコストと大脳半球間の協調処理能力を精密測定。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "両ストリーム中央への視線配置",
      "text": "画面中央に視線を落ち着かせ、左右（または上下）の両方の流れを同時に視野に収めます。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "ターゲット図形の確認",
      "text": "上部HUDに表示されているTOPおよびBOTTOMの目標図形テンプレートを記憶します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "一致図形の高速タップ",
      "text": "流れてくる図形の中でターゲットと一致するもののみを、通過する前に素早くタップします。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "加速するフローへの同調",
      "text": "速度が上昇してもパニックを起こさず、一定のリズムを保ってコンボを積み上げます。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rogers1995', 'monsell2003', 'pashler1994', 'wickens2002', 'ophir2009', 'woods2015'),
  intro: {
    title: "マルチタスクテスト・二重ターゲット追従 – 並行処理能力診断",
    paragraphs: [
      "無料ブラウザ完結のマルチタスクテスト。対向方向に流れる2つの独立した図形ストリームを両視野で同時に監視し、タスク切り替えコストと大脳半球間の協調処理能力を精密測定。",
      "異なる作業ルール間を行き来する際、前頭葉の認知リセットに伴って生じる反応速度の低下とエラー増加のことです。",
      "高度な注意を要する作業では、脳は並列処理ではなく高速な時分割シリアル処理（Pashler, 1994）を行っています。",
    ],
  },
  benchmarks: {
    title: '認知パフォーマンス標準評価（ベンチマーク）',
    headers: ['等級 (Tier)', '称号 (Rank)', '評価基準', '到達ランク', '正答率', 'パーセンタイル'],
    rows: [
      { tier: 'Tier 1', rank: 'グランドマスター / マルチタスクエリート', stat: '上位 1%', level: 'マスタリー（極限）', accuracy: '98% 以上', percentile: '上位 1%' },
      { tier: 'Tier 2', rank: 'アドバンス・並行処理スペシャリスト', stat: '上位 5%', level: 'ダイヤモンド（優秀）', accuracy: '94–97%', percentile: '上位 5%' },
      { tier: 'Tier 3', rank: '熟練オペレーター', stat: '上位 15%', level: 'プラチナ（熟練）', accuracy: '88–93%', percentile: '上位 15%' },
      { tier: 'Tier 4', rank: '一般成人標準', stat: '上位 50%', level: 'ゴールド（標準）', accuracy: '78–87%', percentile: '上位 50%' },
      { tier: 'Tier 5', rank: '入門・初期基準値', stat: '基準値（基礎）', level: 'シルバー（基礎）', accuracy: '78% 未満', percentile: '基準値（下位）' },
    ],
  },
  protocols: {
    title: '脳の処理速度と集中力を高める4大トレーニングプロトコル',
    description: 'タスク切り替えコスト（Rogers & Monsell, 1995）の最小化と、大脳半球間の情報統合能力を最大化する科学的マルチタスクトレーニングプロトコルです。',
    items: [
      { title: "両ストリーム中央への視線配置", description: "画面中央に視線を落ち着かせ、左右（または上下）の両方の流れを同時に視野に収めます。" },
      { title: "ターゲット図形の確認", description: "上部HUDに表示されているTOPおよびBOTTOMの目標図形テンプレートを記憶します。" },
      { title: "一致図形の高速タップ", description: "流れてくる図形の中でターゲットと一致するもののみを、通過する前に素早くタップします。" },
      { title: "加速するフローへの同調", description: "速度が上昇してもパニックを起こさず、一定のリズムを保ってコンボを積み上げます。" },
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
      <DualTargetFlowClient copy={{ title: "マルチタスクテスト・二重ターゲット追従 – 並行処理能力診断" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/ja/drills/cognitive/attention/multi-tasking" />
      </div>
    </>
  );
}
