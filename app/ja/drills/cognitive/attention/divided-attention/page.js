import DividedAttentionClient from '@/app/drills/cognitive/attention/divided-attention/DividedAttentionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "注意分割テスト・二重課題トレーニング – デュアルタスク能力測定 | SkillDrills",
  description: "無料ブラウザ完結の注意分割テスト・デュアルタスク訓練ツール。動くターゲットの視覚追従と数字ストリームの偶数判定を同時に処理し、心理的不応期（PRP）と脳の認知ボトルネック処理能力を精密測定。",
  keywords: ["注意分割テスト", "二重課題 トレーニング", "デュアルタスク 練習", "注意の分割", "マルチタスク 脳トレ", "二重課題 テスト", "心理的不応期", "認知ボトルネック", "注意配分 テスト", "動体追従 数字処理",
    "二重課題 認知テスト",
    "注意分割 訓練 無料"],
  openGraph: {
    title: "注意分割テスト・二重課題トレーニング – デュアルタスク能力測定 | SkillDrills",
    description: "無料ブラウザ完結の注意分割テスト・デュアルタスク訓練ツール。動くターゲットの視覚追従と数字ストリームの偶数判定を同時に処理し、心理的不応期（PRP）と脳の認知ボトルネック処理能力を精密測定。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/cognitive/attention/divided-attention',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "注意分割テスト・二重課題トレーニング – デュアルタスク能力測定 | SkillDrills",
    description: "無料ブラウザ完結の注意分割テスト・デュアルタスク訓練ツール。動くターゲットの視覚追従と数字ストリームの偶数判定を同時に処理し、心理的不応期（PRP）と脳の認知ボトルネック処理能力を精密測定。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/cognitive/attention/divided-attention',
    languages: getAlternateLanguages('/drills/cognitive/attention/divided-attention'),
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
      "name": "注意分割テスト",
      "item": "https://skilldrills.online/ja/drills/cognitive/attention/divided-attention"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "注意分割テスト・デュアルタスク訓練ツール",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "description": "無料ブラウザ完結の注意分割テスト・デュアルタスク訓練ツール。動くターゲットの視覚追従と数字ストリームの偶数判定を同時に処理し、心理的不応期（PRP）と脳の認知ボトルネック処理能力を精密測定。",
  "url": "https://skilldrills.online/ja/drills/cognitive/attention/divided-attention",
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
  "name": "注意分割テスト・二重課題トレーニング – デュアルタスク能力測定",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "url": "https://skilldrills.online/ja/drills/cognitive/attention/divided-attention",
  "inLanguage": "ja-JP",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "注意分割テスト – 二重課題視覚追従＆数字照合ゲーム",
  "url": "https://skilldrills.online/ja/drills/cognitive/attention/divided-attention",
  "description": "無料ブラウザ完結の注意分割テスト・デュアルタスク訓練ツール。動くターゲットの視覚追従と数字ストリームの偶数判定を同時に処理し、心理的不応期（PRP）と脳の認知ボトルネック処理能力を精密測定。",
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
      "name": "注意分割テスト（Divided Attention Test）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "複数の感覚チャンネルや独立した情報源へ同時に注意資源を配分し、並行して処理・判断を下す能力を測定する認知心理学テストです。"
      }
    },
    {
      "@type": "Question",
      "name": "心理的不応期（Psychological Refractory Period: PRP）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2つの刺激が短い時間間隔で連続提示された際、中枢の決定ボトルネック（Pashler, 1994）によって2番目の反応が大幅に遅延する生理的現象です。"
      }
    },
    {
      "@type": "Question",
      "name": "ウィッケンズの多重資源理論（Wickens, 2002）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "視覚・空間処理と聴覚・言語処理など、異なる感覚モダリティを用いる課題同士であれば、同一モダリティ同士よりも注意の競合が少なく効率的に分割できるという理論です。"
      }
    },
    {
      "@type": "Question",
      "name": "デュアルタスク訓練で並行処理能力は向上しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、Spelkeら（1976）の研究が示すように、反復訓練によって一方の処理が自動化されると、中枢ボトルネックの干渉が減少し処理速度が飛躍的に向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "日常生活やゲームにおける注意分割の重要性は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "運転中の標識確認とステアリング制御、FPSゲームでの敵エイムとミニマップ情報の同時処理など、安全と勝敗に直結します。"
      }
    },
    {
      "@type": "Question",
      "name": "エリートスコアの目安はどれくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "15,000点以上、正答率92%以上が上位1%のエリート領域で、優れた前頭葉実行機能を示します。"
      }
    },
    {
      "@type": "Question",
      "name": "疲労が注意分割に与える影響は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "睡眠不足や精神的疲労は中枢実行系の帯域幅を縮小させ、一方のチャンネルを完全に見落とす「注意のトンネル化」を引き起こします。"
      }
    },
    {
      "@type": "Question",
      "name": "モニターのリフレッシュレートは関係しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "144Hz以上のモニターは動く標的の描画ブレを抑え（Woods et al., 2015）、空間追従にかかる脳の計算負荷を軽減します。"
      }
    },
    {
      "@type": "Question",
      "name": "推奨されるトレーニング時間は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1日10〜15分間の集中プレイが、脳の過疲労を防ぎつつ神経可塑性を促すのに最適です。"
      }
    },
    {
      "@type": "Question",
      "name": "完全無料で使えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、SkillDrillsは完全無料・登録不要で、いつでもブラウザから即座に利用可能です。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "注意分割テスト・二重課題トレーニング",
  "description": "無料ブラウザ完結の注意分割テスト・デュアルタスク訓練ツール。動くターゲットの視覚追従と数字ストリームの偶数判定を同時に処理し、心理的不応期（PRP）と脳の認知ボトルネック処理能力を精密測定。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "デュアルストリームの始動",
      "text": "スタートボタンを押して視覚追従フィールドと右側の数字ストリームを同時に開始します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/divided-attention#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "動くターゲットの追従タップ",
      "text": "画面上を漂うターゲットサークルを監視し、消滅する前にクリックして制限時間を延長します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/divided-attention#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "数字ストリームの並行照合",
      "text": "右側パネルに偶数（0, 2, 4, 6, 8）が出現した瞬間にすばやくMATCHボタンをタップします。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/divided-attention#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "両チャンネルの精度維持",
      "text": "どちらかのチャンネルを見落とさず均等に処理を続け、コンボ倍率を最大化します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/divided-attention#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('pashler1994', 'wickens2002', 'strayer2001', 'spelke1976', 'woods2015'),
  intro: {
    title: "注意分割テスト・二重課題トレーニング – デュアルタスク能力測定",
    paragraphs: [
      "無料ブラウザ完結の注意分割テスト・デュアルタスク訓練ツール。動くターゲットの視覚追従と数字ストリームの偶数判定を同時に処理し、心理的不応期（PRP）と脳の認知ボトルネック処理能力を精密測定。",
      "2つの刺激が短い時間間隔で連続提示された際、中枢の決定ボトルネック（Pashler, 1994）によって2番目の反応が大幅に遅延する生理的現象です。",
      "視覚・空間処理と聴覚・言語処理など、異なる感覚モダリティを用いる課題同士であれば、同一モダリティ同士よりも注意の競合が少なく効率的に分割できるという理論です。",
    ],
  },
  benchmarks: {
    title: '認知パフォーマンス標準評価（ベンチマーク）',
    headers: ['等級 (Tier)', '称号 (Rank)', '評価基準', '到達ランク', '正答率', 'パーセンタイル'],
    rows: [
      { tier: 'Tier 1', rank: 'グランドマスター / 並行処理エリート', stat: '上位 1%', level: 'マスタリー（極限）', accuracy: '98% 以上', percentile: '上位 1%' },
      { tier: 'Tier 2', rank: 'アドバンス・デュアルタスカー', stat: '上位 5%', level: 'ダイヤモンド（優秀）', accuracy: '94–97%', percentile: '上位 5%' },
      { tier: 'Tier 3', rank: '熟練オペレーター', stat: '上位 15%', level: 'プラチナ（熟練）', accuracy: '88–93%', percentile: '上位 15%' },
      { tier: 'Tier 4', rank: '一般成人標準', stat: '上位 50%', level: 'ゴールド（標準）', accuracy: '78–87%', percentile: '上位 50%' },
      { tier: 'Tier 5', rank: '入門・初期基準値', stat: '基準値（基礎）', level: 'シルバー（基礎）', accuracy: '78% 未満', percentile: '基準値（下位）' },
    ],
  },
  protocols: {
    title: '脳の処理速度と集中力を高める4大トレーニングプロトコル',
    description: '認知心理学の多重資源理論（Wickens, 2002）および心理的不応期（PRP）克服に基づく、科学的デュアルタスク訓練プロトコルです。',
    items: [
      { title: "デュアルストリームの始動", description: "スタートボタンを押して視覚追従フィールドと右側の数字ストリームを同時に開始します。" },
      { title: "動くターゲットの追従タップ", description: "画面上を漂うターゲットサークルを監視し、消滅する前にクリックして制限時間を延長します。" },
      { title: "数字ストリームの並行照合", description: "右側パネルに偶数（0, 2, 4, 6, 8）が出現した瞬間にすばやくMATCHボタンをタップします。" },
      { title: "両チャンネルの精度維持", description: "どちらかのチャンネルを見落とさず均等に処理を続け、コンボ倍率を最大化します。" },
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
      <DividedAttentionClient copy={{ title: "注意分割テスト・二重課題トレーニング – デュアルタスク能力測定" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/ja/drills/cognitive/attention/divided-attention" />
      </div>
    </>
  );
}
