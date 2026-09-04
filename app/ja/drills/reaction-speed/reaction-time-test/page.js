import ReactionTimeTestWrapper from '@/app/drills/reaction-speed/reaction-time-test/ReactionTimeTestWrapper';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '反応速度テスト - ミリ秒(ms) 視覚反射測定ツール | SkillDrills',
  description: '無料オンライン反応速度テスト。合図に合わせてクリックし、視覚反射神経をミリ秒(ms)単位で高精度測定。平均タイムやランク判定も完備。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test',
    languages: getAlternateLanguages('/ja/drills/reaction-speed/reaction-time-test'),
  },
  openGraph: {
    title: '反応速度テスト - ミリ秒(ms) 視覚反射測定ツール | SkillDrills',
    description: '無料オンライン反応速度テスト。合図に合わせてクリックし、視覚反射神経をミリ秒(ms)単位で高精度測定。平均タイムやランク判定も完備。',
    url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '反応速度テスト - ミリ秒(ms) 視覚反射測定ツール | SkillDrills',
    description: '無料オンライン反応速度テスト。ミリ秒単位で視覚反射スピードを測定し、平均と比較。',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "反射神経", "item": "https://skilldrills.online/ja/drills/reaction-speed" },
    { "@type": "ListItem", "position": 4, "name": "反応速度テスト", "item": "https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "反応速度テスト — ミリ秒(ms) 視覚反射測定ツール | SkillDrills",
  "url": "https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test",
  "description": "無料オンライン視覚反応速度テストツール。画面の刺激に合わせてクリックし、ミリ秒単位で反応遅延を測定します。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "JavaScript対応の最新Webブラウザが必要。",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "反応速度, 反射神経, 視覚情報処理速度, 神経筋反応時間"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "反応速度テストの測定手順",
  "description": "ブラウザ上でクリックして視覚反応速度を測定する方法。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "テストの開始",
      "text": "「トレーニング開始」ボタンを押してテスト画面を起動します。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "画面へ集中",
      "text": "画面のキャンバス中央に視線を集中し、刺激が出現するのを待ちます。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "素早くクリック",
      "text": "ターゲットが出現した瞬間に最速でマウスクリックまたはタッチ操作を行います。遅延がミリ秒単位で計算されます。"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "人間の平均反応速度は何ミリ秒ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "視覚刺激に対する人間の平均反応速度は約200〜250ミリ秒（ms）です。200ms未満は非常に優秀で、170ms以下はプロゲーマー級の上位1%に相当します。"
      }
    },
    {
      "@type": "Question",
      "name": "反応速度テストの測定方法は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "画面上に視覚刺激（色の変化やターゲット）が現れた瞬間から、マウスのクリックや画面タップがブラウザに検知されるまでの時間をミリ秒（1/1000秒）単位で正確に計測します。"
      }
    },
    {
      "@type": "Question",
      "name": "反応速度はトレーニングで速くなりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。定期的な反復練習により、刺激を認識するまでの視覚処理速度の向上や神経伝達の最適化が進み、15〜30ミリ秒程度のタイム短縮が期待できます。"
      }
    },
    {
      "@type": "Question",
      "name": "モニターのリフレッシュレートは測定スコアに影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "影響します。標準的な60Hzモニターは約16.7msの描画遅延が発生しますが、144Hz（約6.9ms）や240Hz（約4.2ms）のゲーミングモニターを使用するとハードウェア遅延が減少し、より正確な測定が可能です。"
      }
    }
  ]
};

const reactionGuide = {
  heading: "反応速度テスト解説ガイド＆ランク判定基準",
  intro: [
    "反応速度テストは、視覚刺激を捉えてから脳で判断し、指先を動かしてクリックするまでの一連の遅延時間をミリ秒（ms）単位で測定するツールです。",
    "VALORANT、CS2、Apex Legends、League of Legendsなどの競技ゲームにおいて、敵の飛び出しに素早く対応し撃ち勝つための基礎指標となります。"
  ],
  benchmarks: {
    title: "反応速度ベンチマーク＆ゲーマーランク判定表",
    headers: ["反応速度(ms)", "ランク区分", "上位割合", "ゲーム換算ランク", "神経反応の特徴"],
    rows: [
      ["150 – 190 ms", "プロ・最高峰 (Elite)", "上位 5%", "イモータル / レディアント", "極めて高速な視覚情報処理と事前待機による即時シナプス発火"],
      ["190 – 240 ms", "上級ゲーマー (Advanced)", "上位 25%", "ダイヤ / アセンダント", "鋭い刺激弁別と安定したクロスヘア発射タイミング"],
      ["240 – 280 ms", "一般平均 (Average)", "中央値 50%", "ゴールド / プラチナ", "標準的な健康成人の視覚反射スピード"],
      ["> 300 ms", "初級 / カジュアル (Developing)", "下位 20%", "シルバー / ブロンズ", "疲労、睡眠不足、またはディスプレイ・機器の入力遅延"]
    ],
    note: "標準の60Hzディスプレイでは1フレームあたり約16.6msの表示バッファ遅延が発生します。144Hzや240Hzディスプレイではより低遅延な値が計測されます。"
  },
  techniques: {
    title: "感覚別の反応限界と科学的メカニズム",
    items: [
      {
        name: "視覚刺激の伝達遅延 (~200–250ms)",
        desc: "網膜の光受容体が光を電気信号へ変換し、視神経を通って大脳の一次視覚野（V1）へ送られ、運動野から指先へクリック指令が到達するまでの物理的所要時間です。",
        tips: "目に力を入れすぎずリラックスした広い視野を保つことで、周辺視野の桿体細胞が刺激変化を素早く捉えられます。"
      },
      {
        name: "聴覚刺激の優位性 (~140–170ms)",
        desc: "音刺激は脳幹から聴覚野に至る経路が短いため、一般に視覚刺激よりも40〜80msほど高速に反応できます。",
        tips: "FPSゲームでは視覚で敵を確認する前に、足音やリロード音などのサウンド情報に先行して反応することが極めて有利です。"
      },
      {
        name: "ハードウェア・入力遅延の最適化",
        desc: "60Hzモニターの描画待ち時間は16.7msですが、240Hzモニターでは4.1msに短縮されます。",
        tips: "1000Hzポーリングレートのゲーミングマウス使用および垂直同期（V-Sync）のオフ設定を推奨します。"
      }
    ]
  },
  steps: [
    "「トレーニング開始」を押して全画面の反応速度測定モードを起動します。",
    "画面中央のキャンバスに集中し、ターゲット出現の合図を待ちます。",
    "ターゲットが現れた瞬間、最速でマウスをクリックまたは画面をタップします。",
    "複数回試行して平均タイムと標準偏差（安定度）を確認します。"
  ],
  audience: "FPS/MOBAプレイヤー、格闘ゲーム競技者、モータースポーツドライバー、視覚反射能力を測定・強化したい全ての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  related: [
    { href: "/ja/drills/reaction-speed", label: "反射神経ハブ" },
    { href: "/ja/drills/reaction-speed/reflex-training-drill", label: "反射神経ゲーム" }
  ]
};

export default function JapaneseReactionTimeTestPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReactionTimeTestWrapper />
      <DrillGuide guide={reactionGuide} />
    </>
  );
}
