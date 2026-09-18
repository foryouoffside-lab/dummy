import FineMotorClient from '@/app/drills/motor/precision-control/tracing/TracingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'マウストレースゲーム – 精密軌跡追従・スムーストラッキング診断',
  description: '動くライン軌跡にマウスカーソルを沿わせ続けるマウストレースゲーム。スムーズパシュート眼球運動と手の協調、微細な手首コントロールと脱線防止精度を測定。',
  keywords: ["マウス トレース ゲーム", "マウス 軌跡 なぞり 練習", "精密マウス操作 テスト", "マウストラッキング 練習", "スムーズパシュート 練習", "手振れ防止 テスト", "マウス 手首 コントロール", "カーソル 追従 測定", "マウス 精密 制御", "FPS トラッキング 練習"],
  openGraph: {
    title: 'マウストレースゲーム – 精密軌跡追従・スムーストラッキング診断 | SkillDrills',
    description: '動くライン軌跡にマウスカーソルを沿わせ続けるマウストレースゲーム。スムーズパシュート眼球運動と手の協調、微細な手首コントロールと脱線防止精度を測定。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/motor/precision-control/tracing',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'マウストレースゲーム – 精密軌跡追従・スムーストラッキング診断 | SkillDrills',
    description: '動くライン軌跡にマウスカーソルを沿わせ続けるマウストレースゲーム。スムーズパシュート眼球運動と手の協調、微細な手首コントロールと脱線防止精度を測定。',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor/precision-control/tracing',
    languages: getAlternateLanguages('/drills/motor/precision-control/tracing'),
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
      "name": "運動・操作トレーニング",
      "item": "https://skilldrills.online/ja/drills/motor"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "マウストレースゲーム",
      "item": "https://skilldrills.online/ja/drills/motor/precision-control/tracing"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "マウストレース精密軌跡追従テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "description": "動くライン軌跡にマウスカーソルを沿わせ続けるマウストレースゲーム。スムーズパシュート眼球運動と手の協調、微細な手首コントロールと脱線防止精度を測定。",
  "url": "https://skilldrills.online/ja/drills/motor/precision-control/tracing",
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
  "name": "マウストレースゲーム・精密軌跡追従テスト – スムーストラッキング診断",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas, Pointer Lock API, modern web browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "url": "https://skilldrills.online/ja/drills/motor/precision-control/tracing",
  "inLanguage": "ja-JP",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "マウストレースゲーム – 連続波形ライン精密追従ゲーム",
  "url": "https://skilldrills.online/ja/drills/motor/precision-control/tracing",
  "description": "動くライン軌跡にマウスカーソルを沿わせ続けるマウストレースゲーム。スムーズパシュート眼球運動と手の協調、微細な手首コントロールと脱線防止精度を測定。",
  "genre": [
    "Action",
    "Aim Trainer",
    "Esports Training"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop"
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
      "name": "マウストレースゲーム（Mouse Tracing Game）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "リアルタイムに動く連続した波形ラインの上にマウスカーソルを脱線させず乗せ続け、連続的な微細運動制御能力（トラッキング精度）を測定するゲームです。"
      }
    },
    {
      "@type": "Question",
      "name": "単発のクリック測定と軌跡追従（トラッキング）の違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "クリック測定が瞬間的な位置合わせであるのに対し、トラッキングは時々刻々と変化する目標速度に合わせて手の速度を同調させ続ける連続閉ループ制御です。"
      }
    },
    {
      "@type": "Question",
      "name": "スムーズパシュート眼球運動（Krauzlis, 2004）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "動く物体を滑らかに網膜の中心（中心窩）に捉え続ける目の追従運動です。秒間約30度を超える速度になると目が追いつかなくなり、衝動性サッカードが発生します。"
      }
    },
    {
      "@type": "Question",
      "name": "ラシュバスのステップランプ実験（Rashbass, 1961）の意義は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "眼球運動系が物体の「位置のズレ」と「動く速度」を独立したメカニズムで処理し、速度に追従した滑らかな運動を出力することを証明しました。"
      }
    },
    {
      "@type": "Question",
      "name": "操縦の法則（Steering Law, Accot & Zhai, 1997）との関係は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "狭いカーブやラインから逸脱せずにカーソルを進める限界速度は、ラインの曲率と幅に物理的に拘束されるという法則です。"
      }
    },
    {
      "@type": "Question",
      "name": "ラインから脱線（Off-Path）した際のスコアペナルティは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ラインを外れるとフロー状態ゲージが急減し、画面が警告点滅してスコア加算が一時停止します。"
      }
    },
    {
      "@type": "Question",
      "name": "手首のブレを抑えて滑らかにカーソルを動かすコツは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "マウスを強く握りすぎず、手首と前腕をマウスパッドに均等に密着させて安定した摩擦支点を作ることが大切です。"
      }
    },
    {
      "@type": "Question",
      "name": "競技FPSにおけるトラッキングエイム向上に役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、Apex LegendsやOverwatchなど、高速移動する敵に照準を合わせ続ける「追いエイム（Tracking Aim）」の基礎体力作りに直結します。"
      }
    },
    {
      "@type": "Question",
      "name": "マウスのDPIやセンサー感度はどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "センサーのジッター（揺らぎ）が少ない高精度センサーマウスと、滑らかなコントロール系マウスパッドを使用すると微小追従が容易になります。"
      }
    },
    {
      "@type": "Question",
      "name": "完全無料で測定できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、一切の料金や会員登録なしで、いつでもウェブブラウザ上ですぐに診断・練習を行うことができます。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "マウストレースゲーム・精密軌跡追従テスト – スムーストラッキング診断",
  "description": "動くライン軌跡にマウスカーソルを沿わせ続けるマウストレースゲーム。スムーズパシュート眼球運動と手の協調、微細な手首コントロールと脱線防止精度を測定。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "カーソルのポインターロックと初期位置合わせ",
      "text": "画面をクリックしてマウスカーソルをロックし、動く波形ラインの先頭に照準を合わせます。",
      "url": "https://skilldrills.online/ja/drills/motor/precision-control/tracing#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "波形速度に合わせた同調トラッキング",
      "text": "ラインの進行速度とカーソル速度を一致させ、線の中心帯から逸脱しないよう滑らかに手首を動かします。",
      "url": "https://skilldrills.online/ja/drills/motor/precision-control/tracing#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "急激なカーブでの微細速度調整",
      "text": "波の頂点や谷の急峻なカーブでは前腕と指先の筋肉を繊細にコントロールし、オーバーシュートを防ぎます。",
      "url": "https://skilldrills.online/ja/drills/motor/precision-control/tracing#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "スーパーフローストリークの維持",
      "text": "脱線ゼロのパーフェクトトラッキングを長時間持続し、連続ボーナス加点と最高フロー評価を獲得します。",
      "url": "https://skilldrills.online/ja/drills/motor/precision-control/tracing#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('accot1997', 'krauzlis2004', 'rashbass1961', 'woodworth1899', 'woods2015'),
  intro: {
    title: "マウストレースゲーム・精密軌跡追従テスト – スムーストラッキング診断",
    paragraphs: [
      "動くライン軌跡にマウスカーソルを沿わせ続けるマウストレースゲーム。スムーズパシュート眼球運動と手の協調、微細な手首コントロールと脱線防止精度を測定。",
      "クリック測定が瞬間的な位置合わせであるのに対し、トラッキングは時々刻々と変化する目標速度に合わせて手の速度を同調させ続ける連続閉ループ制御です。",
      "動く物体を滑らかに網膜の中心（中心窩）に捉え続ける目の追従運動です。秒間約30度を超える速度になると目が追いつかなくなり、衝動性サッカードが発生します。",
    ],
  },
  benchmarks: {
    title: '運動制御パフォーマンス標準評価（ベンチマーク）',
    headers: ['等級 (Tier)', '称号 (Rank)', '評価基準', '到達ランク', '正答率', 'パーセンタイル'],
    rows: [
      { tier: 'Tier 1', rank: 'グランドマスター / 超精密軌跡オペレーター', stat: '上位 1%', level: 'エリート（極限）', accuracy: '98% 以上', percentile: '上位 1%' },
      { tier: 'Tier 2', rank: 'マスター / 精密追従スペシャリスト', stat: '上位 5%', level: 'ダイヤモンド（優秀）', accuracy: '94–97%', percentile: '上位 5%' },
      { tier: 'Tier 3', rank: 'プロ / 熟練トラッカー', stat: '上位 15%', level: 'プラチナ（熟練）', accuracy: '88–93%', percentile: '上位 15%' },
      { tier: 'Tier 4', rank: '一般 / 中級オペレーター', stat: '上位 50%', level: 'ゴールド（標準）', accuracy: '78–87%', percentile: '上位 50%' },
      { tier: 'Tier 5', rank: '入門・初期基準値', stat: '基準値（基礎）', level: 'シルバー（基礎）', accuracy: '78% 未満', percentile: '基準値（下位）' },
    ],
  },
  protocols: {
    title: 'マウス操作精度を高める4大トレーニングプロトコル',
    description: 'ステアリングの法則（Accot-Zhai, 1997）および滑動性眼球運動（Smooth Pursuit, Krauzlis, 2004）に基づく、連続軌跡一致度と手首の微細筋協調を最適化する科学的運動制御プロトコルです。',
    items: [
      { title: "カーソルのポインターロックと初期位置合わせ", description: "画面をクリックしてマウスカーソルをロックし、動く波形ラインの先頭に照準を合わせます。" },
      { title: "波形速度に合わせた同調トラッキング", description: "ラインの進行速度とカーソル速度を一致させ、線の中心帯から逸脱しないよう滑らかに手首を動かします。" },
      { title: "急激なカーブでの微細速度調整", description: "波の頂点や谷の急峻なカーブでは前腕と指先の筋肉を繊細にコントロールし、オーバーシュートを防ぎます。" },
      { title: "スーパーフローストリークの維持", description: "脱線ゼロのパーフェクトトラッキングを長時間持続し、連続ボーナス加点と最高フロー評価を獲得します。" },
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

export default function LocalizedMotorPage() {
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
      <FineMotorClient copy={{ title: "マウストレースゲーム・精密軌跡追従テスト – スムーストラッキング診断" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="https://skilldrills.online/ja/drills/motor/precision-control/tracing" />
      </div>
    </>
  );
}
