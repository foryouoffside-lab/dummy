import ReflexTrainingDrillWrapper from '@/app/drills/reaction-speed/reflex-training-drill/ReflexTrainingDrillWrapper';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '反射神経ゲーム - 複数ターゲット瞬間認識・反射ドリル | SkillDrills',
  description: '無料の反射神経ゲーム。次々に現れるターゲットを瞬時に判断してタップ・クリック。動体視力と分割注意力を鍛えるオンライントレーニング。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill',
    languages: getAlternateLanguages('/ja/drills/reaction-speed/reflex-training-drill'),
  },
  openGraph: {
    title: '反射神経ゲーム - 複数ターゲット瞬間認識・反射ドリル | SkillDrills',
    description: '無料の反射神経ゲーム。次々に現れるターゲットを瞬時に判断してタップ・クリック。動体視力と分割注意力を鍛えるオンライントレーニング。',
    url: 'https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '反射神経ゲーム - 複数ターゲット瞬間認識・反射ドリル | SkillDrills',
    description: '無料の反射神経ゲーム。複数ターゲットを素早く消去して反射神経を鍛えよう。',
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
    { "@type": "ListItem", "position": 4, "name": "反射神経ゲーム", "item": "https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "反射神経ゲーム — 複数ターゲット瞬間認識・反射ドリル | SkillDrills",
  "url": "https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill",
  "description": "無料オンライン反射神経ゲーム。複数ターゲットを制限時間内に素早くクリックして反射神経を鍛えます。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "JavaScript対応の最新Webブラウザが必要。",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "反射神経, 分割注意力, 視覚判断力, マウスエイム精度"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "反射神経ゲームのプレイ手順",
  "description": "ブラウザ上で複数ターゲットを消去して反射神経を鍛える方法。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "ゲームの開始",
      "text": "「トレーニング開始」ボタンを押してドリルを開始します。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "ターゲットの出現",
      "text": "画面上に複数のターゲットがバースト状に出現します。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "素早くクリア",
      "text": "周囲のタイマーリングが消える前にすべてのターゲットを素早くクリックまたはタップしてクリアします。"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "反射神経ゲームで高スコアを出すコツは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "出現したターゲットの周囲にあるカウントダウンサークル（消滅タイマー）を瞬時に確認し、最も制限時間が短いターゲットから優先してクリック・タップすることです。"
      }
    },
    {
      "@type": "Question",
      "name": "スマートフォンやタブレットのタッチ操作に対応していますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。大型のタッチ判定領域とレスポンシブ配置に対応しており、スマホの画面タップでも快適に反射神経を鍛えられます。"
      }
    },
    {
      "@type": "Question",
      "name": "このゲームはFPSゲームのエイム力や立ち回りに効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "非常に高い効果があります。複数ターゲットを同時に把握する「分割注意力（Divided Attention）」と、素早くカーソルを合わせる「マイクロフリック」を同時に反復練習できます。"
      }
    }
  ]
};

const reflexGuide = {
  heading: "反射神経ゲーム攻略ガイド＆スコア基準",
  intro: [
    "反射神経ゲームは、画面上に連続して出現する複数のターゲットを、タイムアウトする前に素早くクリック・タップして消去していくインタラクティブドリルです。",
    "単一の光に反応する単純反応とは異なり、視野全体から複数の標的を捉えて優先順位を判断する「選択反応」と「分割注意力」を同時に鍛えます。"
  ],
  benchmarks: {
    title: "反射神経ゲーム スコア判定基準",
    headers: ["獲得スコア", "ランク", "上位割合", "ゲーム内での評価", "スキル特徴"],
    rows: [
      ["10,000+ 点", "神速・エリート (Elite)", "上位 1%", "プロ競技レベル", "周辺視野での複数ターゲット即時把握と高速エイム処理"],
      ["6,000 – 9,999 点", "達人・上級 (Master)", "上位 10%", "ダイヤ〜アセンダント", "タイマー残量の的確な優先度判断と無駄のないフリック"],
      ["3,000 – 5,999 点", "標準・中級 (Intermediate)", "上位 50%", "ゴールド〜プラチナ", "平均以上の反射神経と良好な手眼協調"],
      ["< 3,000 点", "初級・練習生 (Novice)", "下位 40%", "シルバー〜ブロンズ", "画面全体への視野配分とクリック精度の向上が必要"]
    ],
    note: "45秒間の連続プレイで測定されます。ミスなく連続でクリアするとコンボボーナスが加算されます。"
  },
  techniques: {
    title: "複数ターゲット反射における重要スキル",
    items: [
      {
        name: "視野の拡大と分割注意力 (Divided Attention)",
        desc: "1点だけを凝視するのではなく、画面中央に焦点を置きながら周辺視野でターゲット全体の出現位置を素早く捉えます。",
        tips: "画面から適切な距離（腕1本分程度）を取ることで、画面全体の把握が格段に容易になります。"
      },
      {
        name: "消滅カウントダウンの優先度判断",
        desc: "カーソルから一番近いターゲットではなく、リングが縮んで今にも消えそうなターゲットを最優先で処理します。",
        tips: "ターゲットの消滅を防ぐことでコンボが継続し、スコアが飛躍的に伸びます。"
      },
      {
        name: "マウス感度・タッチ入力の最適化",
        desc: "広範囲のフリックが必要となるため、適切なマウスDPI設定（800〜1600DPI）や画面を広く使える指先の構えが重要です。",
        tips: "手首だけでなく前腕を使ったスムーズなマウス移動を意識しましょう。"
      }
    ]
  },
  steps: [
    "「トレーニング開始」を押してゲームを開始します。",
    "画面上に複数のターゲットがバースト出現します。",
    "タイマーが切れる前にすべてのターゲットを素早くクリックまたはタップします。",
    "制限時間45秒間でどこまでスコアを伸ばせるか挑戦します。"
  ],
  audience: "VALORANT、CS2、Apex、FORTNITE等のFPS/TPSプレイヤー、音ゲーマー、反射神経をゲーム感覚で楽しく鍛えたい全ての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  related: [
    { href: "/ja/drills/reaction-speed", label: "反射神経ハブ" },
    { href: "/ja/drills/reaction-speed/reaction-time-test", label: "反応速度テスト" }
  ]
};

export default function JapaneseReflexTrainingDrillPage() {
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
      <ReflexTrainingDrillWrapper />
      <DrillGuide guide={reflexGuide} />
    </>
  );
}
