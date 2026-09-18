import MotorDrillsClient from '@/app/drills/motor/MotorDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const motorDrills = DRILLS.filter((d) => d.category === 'motor');

export const metadata = {
  title: 'マウス精度＆エイム練習・CPS連打測定テスト | SkillDrills',
  description: 'ブラウザで今すぐできる無料のマウス精度＆エイム練習テスト。秒間クリック連打測定（CPSテスト）、手ブレ抑制、キーボード打鍵速度など9つの科学的ドリル。',
  keywords: [
    'マウス精度 テスト 無料', 'エイム 練習 無料 ブラウザ', 'cps テスト オンライン',
    '連打測定 ツール', 'マウス 手ブレ テスト', 'キーボード 反応速度 テスト',
    'キーボード 同時押し テスト', 'キーボード チャタリング テスト', '手眼協調性 トレーニング',
    'マウス 微小操作 練習', 'ジッタークリック 測定', 'バタフライクリック 練習',
    'イライラ棒 ゲーム 無料', 'fps エイム 安定化 練習', 'マウス 感度 edpi 調整'
  ],
  openGraph: {
    title: 'マウス精度＆エイム練習・CPS連打測定テスト | SkillDrills',
    description: 'ブラウザで今すぐできる無料のマウス精度＆エイム練習テスト。秒間クリック連打測定（CPSテスト）、手ブレ抑制、キーボード打鍵速度など9つの科学的ドリル。',
    type: 'website',
    url: 'https://skilldrills.online/ja/drills/motor',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'マウス精度およびモーター制御トレーニング図鑑' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'マウス精度＆エイム練習・CPS連打測定テスト | SkillDrills',
    description: '秒間クリック数（CPS）、精密エイム練習、手ブレ抑制、キーボード打鍵速度訓練：9つの科学的モーター制御ドリルをブラウザで今すぐ無料測定。',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor',
    languages: getAlternateLanguages('/ja/drills/motor'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "全ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "モーター制御・マウス精度", "item": "https://skilldrills.online/ja/drills/motor" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "マウス精度＆運動制御ドリル（9種目）",
  "url": "https://skilldrills.online/ja/drills/motor",
  "description": "秒間クリック数（CPS）、精密エイム練習、手ブレ抑制、キーボード同時押し・チャタリング検査など9つの科学的モーター制御テスト。",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": motorDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'ja', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/ja${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
      "description": loc.tagline || drill.description,
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "オンラインのモーター制御ドリルはどのように手眼協調性（目と手の連携）を鍛えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "網膜が捉えた視覚情報が視覚野から頭頂葉を経て小脳および一次運動野へ送られ、指先や腕の筋肉へ収縮信号を伝達する「視覚-運動ループ」を反復刺激します。ミリ秒単位のターゲット捕捉と微小なエイム修正を繰り返すことで、神経筋接合部の伝達遅延を最小化し、180ms未満での正確な運動実行を可能にします。"
      }
    },
    {
      "@type": "Question",
      "name": "一般的なCPS（秒間クリック数）の平均値と主な連打テクニックは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "通常の指先タッピングにおける一般的な平均CPSは毎秒6〜8回です。eスポーツやゲーミング分野では、前腕の筋肉を緊張・痙攣させて微振動を生み出す「ジッタークリック」（10〜14 CPS）や、人差し指と中指を交互に叩き込む「バタフライクリック」（15〜22 CPS）などが用いられます。ただし、指や手首の腱鞘炎を防ぐためには、無理な過緊張を避け、脱力したリズミカルな連打コントロールが推奨されます。"
      }
    },
    {
      "@type": "Question",
      "name": "マウストレーシングや手ブレ制御ドリルはどのようにエイムのブレを抑制しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ターゲットを行き過ぎる「オーバーシュート」や微細なエイムの震えは、主導筋に対して急停止をかける「拮抗筋」の減速制御不足から生じます。狭まる通路を進むイライラ棒や連続曲線トレーシングは、ピクセル単位での精密なカーソル保持を強いるため、手首と前腕のスタビライザー筋線維が鍛えられ、不要なマイクロトレマー（微細振動）が劇的に抑制されます。"
      }
    },
    {
      "@type": "Question",
      "name": "フィッツの法則（Fitts's Law）とは何ですか？エイム速度と正確性にどう関係しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "フィッツの法則は、「目標に到達するまでの移動時間は、目標までの距離と目標の幅（サイズ）の比率の対数に比例する」という人間工学・運動制御の基本原則です。高精度のエイムは、距離の80〜90%を一気に詰める第1段階の「高速弾道性移動」と、直前で減速してブレなく中央を射抜く第2段階の「微小フィードバック修正」の2段階で構成され、この切り替えのスムーズさが命中率を決定づけます。"
      }
    },
    {
      "@type": "Question",
      "name": "キーボードの打鍵速度と独立動作性がゲームプレイにおいて重要な理由は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "人間の手の構造上、薬指と小指は腱（屈筋腱）が一部結合しており、独立して動かすことが解剖学的に困難です。キーボード練習や認識ドリルは、指ごとの運動野マップを大脳皮質内で明瞭に分離し、誤入力やキーの同時押し遅延を解消して、極限のAPM（分間アクション数）下でも正確なキーストロークを実現します。"
      }
    },
    {
      "@type": "Question",
      "name": "ブラウザ上で動作するマウスやキーボードの測定精度はどの程度ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrillsはWebブラウザ標準のperformance.now() APIを活用し、サブミリ秒（0.1ms単位）の高分解能タイマーで入力を計測します。測定結果はディスプレイのリフレッシュレート（144Hzなら約6.9ms、240Hzなら約4.1ms）やマウス/キーボードのポーリングレート（1000Hzなら1ms）の物理制約を忠実に反映しており、ハードウェア検証や実力向上に十分な信頼性を提供します。"
      }
    },
    {
      "@type": "Question",
      "name": "マウス感度（DPIおよびゲーム内感度）とeDPIは運動制御にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "マウスの物理読み取り解像度(DPI)と感度の積であるeDPIは、手首・指先の「小筋群」と腕・肩の「大筋群」のどちらを主動させるかを決定します。ハイセンシ（高感度）は素早い反転に適しますが微小な手ブレが増幅されやすく、ローセンシ（低感度）は軌道のブレが抑制され安定したトラッキングが可能です。一定のeDPIで訓練を重ねることで、小脳内の内部運動モデル（マッスルメモリー）が正確に定着します。"
      }
    },
    {
      "@type": "Question",
      "name": "キーボードのチャタリング（Chattering）やゴーストキーは打鍵にどのような悪影響を与えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "チャタリングとはキースイッチ接点の物理的バウンスによって1回の打鍵が複数回連続入力されてしまうハードウェア不良であり、ゴーストは基板マトリックスの干渉で意図しないキーが誤認される現象です。SkillDrillsのキーボードテストは各キーの接点安定性とNキーロールオーバー（全キー同時押し）をリアルタイム判定し、入力遅延やハードウェア誤動作のない万全の環境を確認できます。"
      }
    }
  ]
};

export default function JapaneseMotorHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MotorDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

