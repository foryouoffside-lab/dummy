import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const cognitiveDrills = DRILLS.filter((d) => d.category === 'cognitive');

export const metadata = {
  title: '脳トレ・認知機能トレーニング – 無料の集中力・処理速度ドリル | SkillDrills',
  description: 'ブラウザで今すぐできる無料の脳トレ・認知機能トレーニング。持続的集中力、情報処理速度、ストループ効果、シュルテテーブルなど8種類の科学的ドリル。',
  keywords: [
    '脳トレ 無料 ゲーム', '認知機能 トレーニング', '集中力 トレーニング オンライン',
    '情報処理速度 テスト', '注意散漫 改善 トレーニング', 'シュルテテーブル 無料',
    'ストループ効果 テスト', '注意分割機能 検査', 'ワーキングメモリ 鍛える',
    '前頭前野 活性化 トレーニング', '大人の発達障害 集中力 改善', 'マルチタスク 脳トレ',
    'eスポーツ 認知能力 向上', '動体認知 反応速度', '高齢者 認知症予防 ゲーム 無料'
  ],
  openGraph: {
    title: '脳トレ・認知機能トレーニング – 無料の集中力・処理速度ドリル | SkillDrills',
    description: 'ブラウザで今すぐできる無料の脳トレ・認知機能トレーニング。持続的集中力、情報処理速度、ストループ効果、シュルテテーブルなど8種類の科学的ドリル。',
    type: 'website',
    url: 'https://skilldrills.online/ja/drills/cognitive',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '無料オンライン脳トレ・認知機能トレーニング一覧' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '脳トレ・認知機能トレーニング – 無料の集中力・処理速度ドリル | SkillDrills',
    description: '持続的集中力、情報処理速度、ストループ効果、シュルテテーブルなど8種類の認知ドリルをブラウザで無料体験。',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/cognitive',
    languages: getAlternateLanguages('/ja/drills/cognitive'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "全ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "脳トレ・認知機能トレーニング", "item": "https://skilldrills.online/ja/drills/cognitive" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "無料オンライン脳トレ & 認知機能トレーニングドリル一覧 (8 Drills)",
  "url": "https://skilldrills.online/ja/drills/cognitive",
  "description": "集中力持続、注意分割、情報処理速度、ストループ抑制制御、シュルテテーブルなど8種類の神経科学に基づく認知トレーニングを提供。",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": cognitiveDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'ja', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/ja${drill.href}`
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "認知機能トレーニング（脳トレ）とは何ですか？脳にどのような生理学的変化をもたらしますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "認知機能トレーニングは、大脳の前頭前野（Prefrontal Cortex）が司る高次実行機能（実行制御）を集中的に鍛える神経科学的エクササイズです。単なる知識の記憶ではなく、選択的注意、ワーキングメモリ、認知柔軟性（タスク切り替え）、情報処理速度を負荷をかけて刺激します。適切な認知的ストレスを与えることで、前頭葉と頭頂葉を結ぶ前頭頭頂ネットワークの神経可塑性（Neuroplasticity）が活性化され、シナプス伝達効率と情報処理の並列化が促進されます。"
      }
    },
    {
      "@type": "Question",
      "name": "脳トレゲームによって情報処理速度（Processing Speed）は実際に速くなりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、視覚刺激を瞬時に識別して正確な運動出力を要求するタイムアタックドリルは、視覚野から頭頂連合野、運動野へと至る神経伝達の遅延を短縮します。反復練習により不要なシナプスの迷いや意思決定の停滞が除去され、トップダウンの知覚フィルタリングが最適化されるため、判断の正確性を保ったまま刺激認識から指先への入力開始までの反応時間が15〜30%短縮されます。"
      }
    },
    {
      "@type": "Question",
      "name": "持続的集中力（Sustained Attention）と注意分割能力（Divided Attention）の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "持続的集中力（警戒持続力）は、青斑核ノルアドレナリン系と前頭前野が外部の誘惑や雑念を遮断し、単一の対象に対して長時間の没頭状態を維持する能力です。一方、注意分割能力（デュアルタスク処理）は、背側および腹側注意ネットワークを駆使して、同時に提示される2つ以上の独立した情報源に注意資源を最適配分したり、瞬時に注意を切り替えるマルチタスク制御能力を指します。"
      }
    },
    {
      "@type": "Question",
      "name": "ストループ効果（Stroop Effect）とは何ですか？認知抑制制御能力はどのように測定されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ストループ効果とは、無意識に自動化された処理（文字の読み取り）と、意識的な実行制御（文字色の識別）が競合した際に発生する認知的干渉現象です。例えば、赤色のインクで「あお」と書かれている場合、前帯状皮質（ACC）が葛藤を感知し、背外側前頭前野（DLPFC）が文字を読もうとする反射的衝動を抑制しなければなりません。一致条件と不一致条件の反応時間の差（干渉時間）によって、衝動抑制力と認知の柔軟性を精密に測定します。"
      }
    },
    {
      "@type": "Question",
      "name": "シュルテテーブル（Schulte Table）訓練は周辺視野や視覚探索速度にどのような効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "シュルテテーブルは航空パイロットの視覚探索効率や速読能力の評価のために考案された5×5の数字マス目ツールです。画面中央を凝視したまま視線を激しく動かさず、周辺視野を活用して1から25までの数字を昇順に探索します。網膜周辺部の空間解像度処理が拡張されるため、画面内の重要情報を察知する際に必要なサッカード（視線ジャンプ）回数が半減し、探索速度が飛躍的に向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "脳トレゲームのトレーニング効果は、eスポーツや日常の仕事・学習能力に転移（Transfer）しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "神経科学の研究では、訓練した特定機能における「近位転移（Near Transfer）」が明確に証明されています。視覚探索速度、選択的注意によるノイズ遮断、干渉抑制能力は、ゲーム内のミニマップ把握、敵の優先順位付け、複雑なマルチタスク業務での見落とし防止に直接転移します。単にIQが急上昇するという誇大広告とは異なり、プレッシャー下での脳の安定性と判断速度が確実に強化されます。"
      }
    },
    {
      "@type": "Question",
      "name": "脳トレ・認知機能トレーニングは1日に何分程度行うのが最も効果的ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "前頭前野のブドウ糖代謝は非常に激しいため、1回あたり10〜15分、週に3〜5回のセッションが黄金律とされています。20分を超えて過度な高負荷マルチタスクを継続すると、中枢神経疲労（メンタルファティーグ）が蓄積し、かえって集中力低下や判断ミスを招きます。短時間の深い集中と十分な休息を組み合わせることが、脳の可塑性を引き出す秘訣です。"
      }
    },
    {
      "@type": "Question",
      "name": "大人のADHDや注意散漫の改善、認知症予防に脳トレドリルは役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、認知抑制制御や注意分割ドリルは、ADHDに見られるドーパミンおよびノルアドレナリン神経回路を活性化し、衝動性や注意散漫を軽減する非薬物的なトレーニングとして広く活用されています。また、加齢に伴い低下しやすい情報処理速度とワーキングメモリを定期的に刺激することは、脳の認知的予備能（Cognitive Reserve）を高め、認知症予防や加齢による機能低下を遅らせる上で極めて有益です。"
      }
    }
  ]
};

export default function LocalizedCognitiveHubClientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CognitiveHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
