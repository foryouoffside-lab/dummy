import DistractionFighterClient from '@/app/drills/cognitive/focus/distraction-fighter/DistractionFighterClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'ストループテスト - 無料オンライン認知干渉・抑制機能テスト | SkillDrills',
  description: '無料オンラインのストループテスト（Stroop Test）。文字の意味と異なるインクの色を瞬時に判断してタップ。選択的注意力、衝動抑制、認知柔軟性を鍛える脳トレドリル。登録不要ですぐにプレイ可能。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter',
    languages: getAlternateLanguages('/ja/drills/cognitive/focus/distraction-fighter'),
  },
  openGraph: {
    title: 'ストループテスト - 無料オンライン認知干渉・抑制機能テスト | SkillDrills',
    description: '無料オンラインのストループテスト（Stroop Test）。文字の意味と異なるインクの色を瞬時に判断してタップ。選択的注意力、衝動抑制、認知柔軟性を鍛える脳トレドリル。',
    url: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ストループテスト - 無料オンライン認知干渉・抑制機能テスト | SkillDrills',
    description: '無料オンラインのストループテスト。文字の意味と異なるインクの色を瞬時に判別し、認知抑制力を測定・トレーニング。',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "認知機能", "item": "https://skilldrills.online/ja/drills/cognitive" },
    { "@type": "ListItem", "position": 4, "name": "ストループテスト", "item": "https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ストループテスト — 無料オンライン認知干渉・抑制機能テスト | SkillDrills",
  "url": "https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter",
  "description": "無料オンラインのストループ効果テスト。色名単語のインク色を瞬時に判別し、認知抑制力と情報処理速度を測定・トレーニングします。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "JavaScript対応の最新Webブラウザが必要。",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "ストループ効果, 認知的抑制, 選択的注意, 情報処理速度, 前頭前野機能"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "ストループテストの測定手順",
  "description": "ブラウザ上で文字のインク色を素早く判断して認知抑制力を測定する方法。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "単語のインク色を確認",
      "text": "画面中央に表示される文字のフォント色（インク色）に視線を集中させます。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "正しい色ボタンを選択",
      "text": "文字の意味（単語の読み）を無視し、インク色に一致する選択肢ボタンを素早くクリックまたはタップします。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "衝動的タップを回避",
      "text": "焦りは禁物です。正確な回答で制限時間が延長され、誤答やタイムアウトはコンボがリセットされます。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "レベル進行とスピード向上",
      "text": "連続正解によりレベルが上がり、制限時間がよりシビアになる中で認知的抑制の限界に挑戦します。"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ストループテストとは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ストループテスト（Stroop test）は、文字の意味とインクの色が異なる刺激（例：「あか」という文字が青色で表示される）を用いて、脳の認知的葛藤と抑制機能を測定する代表的な心理学テストです。文字を無意識に読んでしまう自動的反応を抑え、インク色を素早く判断する能力を評価します。"
      }
    },
    {
      "@type": "Question",
      "name": "ストループ効果が起きる理由は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "人間にとって文字を読む処理（言語処理）は高度に自動化されているため、色を識別する視覚処理よりも速く脳内で活性化します。意味と色が一致しない場合、脳の前頭前野や前帯状皮質が自動的な読みの衝動を抑制しなければならず、判断の遅延（干渉）が生じます。"
      }
    },
    {
      "@type": "Question",
      "name": "認知的抑制機能（インヒビション）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "認知的抑制機能とは、無関係な刺激や自動的な衝動を抑制し、目的に沿った適切な行動を選択・維持するための実行機能（エグゼクティブ・ファンクション）の一つです。集中力の維持、マルチタスク、誘惑への抵抗、仕事やゲームのパフォーマンスに直結します。"
      }
    },
    {
      "@type": "Question",
      "name": "ストループテストで良いスコアを出すコツはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "単語全体を読もうとせず、文字の輪郭や色そのものに視線を集中させることが効果的です。焦って誤タップするとコンボが途切れるため、最初は正確性を重視し、徐々にテンポを上げていくのがハイスコアへの近道です。"
      }
    },
    {
      "@type": "Question",
      "name": "このドリルはスマートフォンのタッチ操作にも対応していますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。PCのマウスクリックだけでなく、スマートフォンやタブレットのタッチスクリーンにも完全対応しています。ブラウザ上でインストール不要ですぐにプレイできます。"
      }
    },
    {
      "@type": "Question",
      "name": "ストループテストの利用は無料ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、完全無料です。アカウント登録やダウンロードは不要で、ブラウザからいつでも何度でもトレーニングできます。"
      }
    }
  ]
};

export default function JapaneseDistractionFighterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DistractionFighterClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
