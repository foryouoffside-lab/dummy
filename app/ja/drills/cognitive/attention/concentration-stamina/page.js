import ConcentrationStaminaClient from '@/app/drills/cognitive/attention/concentration-stamina/ConcentrationStaminaClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "集中力テスト・持続的注意測定 – 集中力持続スタミナ診断 | SkillDrills",
  description: "無料ブラウザ完結の集中力持続テスト（CPT）。長時間の刺激提示に対するビジランス低下、抑制機能、ルール切り替え耐性を精密測定。ADHD傾向の把握や仕事・勉強前の集中ウォームアップに。",
  keywords: ["集中力テスト", "持続的注意テスト", "CPTテスト オンライン", "集中力 測定", "ビジランス テスト", "注意持続力 診断", "集中力 診断 無料", "注意欠陥 テスト", "脳 集中力 ゲーム", "抑制機能 テスト",
    "持続的注意 検査",
    "集中力 測定 アプリ"],
  openGraph: {
    title: "集中力テスト・持続的注意測定 – 集中力持続スタミナ診断 | SkillDrills",
    description: "無料ブラウザ完結の集中力持続テスト（CPT）。長時間の刺激提示に対するビジランス低下、抑制機能、ルール切り替え耐性を精密測定。ADHD傾向の把握や仕事・勉強前の集中ウォームアップに。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "集中力テスト・持続的注意測定 – 集中力持続スタミナ診断 | SkillDrills",
    description: "無料ブラウザ完結の集中力持続テスト（CPT）。長時間の刺激提示に対するビジランス低下、抑制機能、ルール切り替え耐性を精密測定。ADHD傾向の把握や仕事・勉強前の集中ウォームアップに。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina',
    languages: getAlternateLanguages('/drills/cognitive/attention/concentration-stamina'),
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
      "name": "集中力テスト",
      "item": "https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "集中力持続テスト・持続的注意診断ツール",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "description": "無料ブラウザ完結の集中力持続テスト（CPT）。長時間の刺激提示に対するビジランス低下、抑制機能、ルール切り替え耐性を精密測定。ADHD傾向の把握や仕事・勉強前の集中ウォームアップに。",
  "url": "https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina",
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
  "name": "集中力テスト・持続的注意測定 – 集中力持続スタミナ診断",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "url": "https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina",
  "inLanguage": "ja-JP",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "集中力テスト – 持続的注意＆抑制コントロールゲーム",
  "url": "https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina",
  "description": "無料ブラウザ完結の集中力持続テスト（CPT）。長時間の刺激提示に対するビジランス低下、抑制機能、ルール切り替え耐性を精密測定。ADHD傾向の把握や仕事・勉強前の集中ウォームアップに。",
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
      "name": "集中力持続テスト（Concentration Stamina / CPT）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "次々と点滅する刺激の中から、特定の条件に合致するターゲットのみを長期間見逃さず正確に押し分ける持続的注意（ビジランス）評価ツールです。"
      }
    },
    {
      "@type": "Question",
      "name": "マックワースのビジランス低下現象（Mackworth, 1948）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "レーダー監視員の研究において、単調な刺激監視を始めてから20〜30分で目標信号の見逃し率が急増することを発見した認知疲労の法則です。"
      }
    },
    {
      "@type": "Question",
      "name": "ルール切り替え（母音と素数）が脳に与える負荷は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "10秒ごとに判定基準が反転するため、作業記憶の更新と前頭前野のタスクセット切り替え（Monsell, 2003）を休みなく行う必要があります。"
      }
    },
    {
      "@type": "Question",
      "name": "選択的注意と持続的注意の違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "選択的注意が特定の瞬間に雑音を遮断する能力であるのに対し（Broadbent, 1958）、持続的注意はその集中状態を長時間落とさず維持する耐久力です。"
      }
    },
    {
      "@type": "Question",
      "name": "フォールスアラーム（お手つき）が多いのはなぜですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "衝動性を抑える前頭前野の抑制コントロール（Inhibitory Control）が低下しているサインです（Robertson et al., 1997）。"
      }
    },
    {
      "@type": "Question",
      "name": "集中力スタミナはトレーニングで鍛えられますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、段階的に難易度を上げる持続集中セッションを反復することで、脳の注意ネットワークの耐疲労性が向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "運動や水分補給は集中持続に有効ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "軽度の有酸素運動は脳血流を改善し、適切な水分摂取は脱水による認知機能低下を効果的に防ぎます。"
      }
    },
    {
      "@type": "Question",
      "name": "ハードウェア環境が測定に与える影響は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "144Hz以上の高周波ディスプレイは刺激の点滅表示のジッターを最小化し（Woods et al., 2015）、正確な反応潜時を保証します。"
      }
    },
    {
      "@type": "Question",
      "name": "推奨される練習頻度は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "仕事や勉強の直前に10分程度行うことで、脳を即座に深い集中モード（ディープワーク）へ誘導できます。"
      }
    },
    {
      "@type": "Question",
      "name": "完全無料で測定できますか？",
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
  "name": "集中力テスト・持続的注意測定",
  "description": "無料ブラウザ完結の集中力持続テスト（CPT）。長時間の刺激提示に対するビジランス低下、抑制機能、ルール切り替え耐性を精密測定。ADHD傾向の把握や仕事・勉強前の集中ウォームアップに。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "画面中央への注視と初期ルールの確認",
      "text": "中央の刺激表示エリアに視線を固定し、現在有効なルール（母音または素数）を確認します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "合致ターゲットの瞬時識別",
      "text": "次々と切り替わる文字・数字の中から、アクティブルールに一致する標的を即座に見極めます。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "誤答の抑制と的確な打鍵",
      "text": "一致した時のみスペースキーまたは画面タップで反応し、非ターゲットには一切触れず抑制します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "10秒ごとのルール反転への適応",
      "text": "ルールが切り替わった瞬間に頭をリセットし、新たな基準でミスのない連続判定を継続します。",
      "url": "https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('mackworth1948', 'parasuraman1979', 'robertson1997', 'monsell2003', 'broadbent1958', 'woods2015'),
  intro: {
    title: "集中力テスト・持続的注意測定 – 集中力持続スタミナ診断",
    paragraphs: [
      "無料ブラウザ完結の集中力持続テスト（CPT）。長時間の刺激提示に対するビジランス低下、抑制機能、ルール切り替え耐性を精密測定。ADHD傾向の把握や仕事・勉強前の集中ウォームアップに。",
      "レーダー監視員の研究において、単調な刺激監視を始めてから20〜30分で目標信号の見逃し率が急増することを発見した認知疲労の法則です。",
      "10秒ごとに判定基準が反転するため、作業記憶の更新と前頭前野のタスクセット切り替え（Monsell, 2003）を休みなく行う必要があります。",
    ],
  },
  benchmarks: {
    title: '認知パフォーマンス標準評価（ベンチマーク）',
    headers: ['等級 (Tier)', '称号 (Rank)', '評価基準', '到達ランク', '正答率', 'パーセンタイル'],
    rows: [
      { tier: 'Tier 1', rank: 'グランドマスター / 最上位エリート', stat: '上位 1%', level: 'マスタリー（極限）', accuracy: '98% 以上', percentile: '上位 1%' },
      { tier: 'Tier 2', rank: 'アドバンス・フォーカス', stat: '上位 5%', level: 'ダイヤモンド（優秀）', accuracy: '94–97%', percentile: '上位 5%' },
      { tier: 'Tier 3', rank: '熟練オペレーター', stat: '上位 15%', level: 'プラチナ（熟練）', accuracy: '88–93%', percentile: '上位 15%' },
      { tier: 'Tier 4', rank: '一般成人標準', stat: '上位 50%', level: 'ゴールド（標準）', accuracy: '78–87%', percentile: '上位 50%' },
      { tier: 'Tier 5', rank: '入門・初期基準値', stat: '基準値（基礎）', level: 'シルバー（基礎）', accuracy: '78% 未満', percentile: '基準値（下位）' },
    ],
  },
  protocols: {
    title: '脳の処理速度と集中力を高める4大トレーニングプロトコル',
    description: '神経心理学および持続的注意検査（CPT）の研究に基づく、前頭前野の集中力・抑制機能を高める科学的プロトコルです。',
    items: [
      { title: "画面中央への注視と初期ルールの確認", description: "中央の刺激表示エリアに視線を固定し、現在有効なルール（母音または素数）を確認します。" },
      { title: "合致ターゲットの瞬時識別", description: "次々と切り替わる文字・数字の中から、アクティブルールに一致する標的を即座に見極めます。" },
      { title: "誤答の抑制と的確な打鍵", description: "一致した時のみスペースキーまたは画面タップで反応し、非ターゲットには一切触れず抑制します。" },
      { title: "10秒ごとのルール反転への適応", description: "ルールが切り替わった瞬間に頭をリセットし、新たな基準でミスのない連続判定を継続します。" },
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
      <ConcentrationStaminaClient copy={{ title: "集中力テスト・持続的注意測定 – 集中力持続スタミナ診断" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/ja/drills/cognitive/attention/concentration-stamina" />
      </div>
    </>
  );
}
