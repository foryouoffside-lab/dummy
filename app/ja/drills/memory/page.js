import MemoryClient from '@/app/drills/memory/MemoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const memoryDrills = DRILLS.filter((d) => d.category === 'memory');

export const metadata = {
  title: '記憶力テスト＆ワーキングメモリ訓練 – 無料脳トレゲーム | SkillDrills',
  description: 'ブラウザで今すぐできる無料の記憶力テスト＆脳トレ。短期記憶、ワーキングメモリ(N-Back)、数列記憶(デジットスパン)、空間グリッド記憶など7つの科学的ドリル。',
  keywords: [
    '記憶力 テスト 無料', 'ワーキングメモリ 鍛える ゲーム', '短期記憶 トレーニング 無料',
    '数字 記憶 テスト', 'nバック 課題 無料 オンライン', '空間記憶力 テスト',
    '脳トレ 記憶力 ゲーム', '視覚記憶 トレーニング', 'グリッド 記憶 テスト',
    '大人の物忘れ 改善 脳トレ', 'チャンキング 記憶術 練習', '認知機能 記憶力 検査',
    '受験生 記憶力 アップ 脳トレ', '認知症予防 記憶力 ゲーム 無料', 'eスポーツ マップ把握 空間記憶'
  ],
  openGraph: {
    title: '記憶力テスト＆ワーキングメモリ訓練 – 無料脳トレゲーム | SkillDrills',
    description: 'ブラウザで今すぐできる無料の記憶力テスト＆脳トレ。短期記憶、ワーキングメモリ(N-Back)、数列記憶(デジットスパン)、空間グリッド記憶など7つの科学的ドリル。',
    type: 'website',
    url: 'https://skilldrills.online/ja/drills/memory',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '記憶力テスト＆ワーキングメモリ訓練一覧' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '記憶力テスト＆ワーキングメモリ訓練 – 無料脳トレゲーム | SkillDrills',
    description: '短期記憶、ワーキングメモリ(N-Back)、数列記憶、空間グリッド記憶：7つの科学的脳トレドリルを無料体験。',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/memory',
    languages: getAlternateLanguages('/ja/drills/memory'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "全ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "記憶力・ワーキングメモリ訓練", "item": "https://skilldrills.online/ja/drills/memory" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "記憶力テスト＆ワーキングメモリ訓練（7種類のドリル）",
  "url": "https://skilldrills.online/ja/drills/memory",
  "description": "短期記憶、ワーキングメモリ(N-Back)、数列逆唱記憶、視空間グリッドおよび経路記憶を鍛える7種類の科学的トレーニング。",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": memoryDrills.map((drill) => {
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
      "name": "短期記憶とワーキングメモリ（作業記憶）の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "短期記憶は、見聞きした情報を15〜30秒ほど受動的に保持しておく一時的なストレージです。一方、ワーキングメモリ（作業記憶）は、前頭前野の実行機能によって情報を一時保持しながら同時に整理・操作・更新し、問題解決や意思決定に活用する能動的な脳内ワークスペースです。暗算を行う際や、ゲームプレイ中に敵のスキルクールダウンや位置情報を計算・保持する際にフル稼働します。"
      }
    },
    {
      "@type": "Question",
      "name": "Nバック課題（N-Back）は本当に知能や作業記憶を高めますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。認知神経科学の研究（Jaeggiらによる研究など）において、継続的なNバック課題やデュアルNバック訓練は、前頭頭頂ネットワークのシナプス可塑性を促進することが実証されています。過去の刺激を連続的に更新しながら古い干渉刺激を抑制するプロセスにより、ワーキングメモリ容量の拡大と、未知の論理課題を解く流動性知能（Gf）への汎化効果が期待できます。"
      }
    },
    {
      "@type": "Question",
      "name": "成人の平均的な数字記憶スパン（デジットスパン）と伸ばす方法は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ミラーの法則（Miller's Law）によれば、成人の順唱スパンは「7±2桁」、より負荷の高い逆唱スパンは「5±1桁」が正常範囲です。現代の認知心理学モデルでは、純粋な非チャンク化保持容量は約4項目とされています。スコアを劇的に伸ばすには、数字を3〜4桁ごとに区切ってリズムよく音韻ループで復唱する「チャンキング（体制化）」技法が極めて有効です。"
      }
    },
    {
      "@type": "Question",
      "name": "空間記憶（グリッド記憶や経路追跡）は日常やゲームにどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "空間記憶トレーニングは、海馬、頭頂葉、および視空間スケッチパッドを集中的に刺激します。マス目の点滅位置を覚えたり、障害物を避ける移動ルートを逆算する能力は、日常生活での道順把握や空間把握だけでなく、FPSやMOBAゲームにおけるミニマップの瞬間把握、敵の射線の予測、3次元的な立ち回り判断の精度向上に直結します。"
      }
    },
    {
      "@type": "Question",
      "name": "記憶の「チャンキング（塊化・体制化）」とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "チャンキングとは、バラバラの情報を意味のあるまとまりや規則的なグループに束ねることで、ワーキングメモリの限られたスロットを効率化する記憶方略です。脳が一度に保持できるスロット数は限られていますが、1スロットあたりの情報密度に制限はありません。そのため、12桁の数字を「1984-2024-0315」のように年号や日付に変換して圧縮することで、認知的負荷を増やさずに大量の情報を保持できます。"
      }
    },
    {
      "@type": "Question",
      "name": "毎日の記憶力トレーニングは物忘れ改善や認知症予防に効果的ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。定期的な記憶力ドリルは神経可塑性を刺激し、シナプスの接続強度を高めて「認知予備能（コグニティブ・リザーブ）」を構築します。認知予備能を高めておくことで、加齢に伴う自然な脳機能低下に対する抵抗力が高まり、中年期の物忘れ予防や高齢期の自立した認知機能の維持に大きく貢献します。"
      }
    },
    {
      "@type": "Question",
      "name": "最大の効果を得るための推奨されるトレーニング時間と頻度は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1回あたり15〜20分程度の集中したセッションを、週に3〜5日継続するのが最も推奨されます。ワーキングメモリ訓練は脳のエネルギー消費が非常に激しいため、25分以上の過度な連続実施は脳疲労を招き効率が低下します。適度な負荷をかけた後、十分なノンレム睡眠をとることで記憶の固定化（コンソリデーション）が完了します。"
      }
    },
    {
      "@type": "Question",
      "name": "ブラウザ上で手軽にできる記憶力テストの測定精度は信頼できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrillsの記憶力ドリルは、ウェクスラー成人知能検査の数唱課題（Digit Span）、コルシ・ブロック叩き課題（Corsi Block）、カービーNバックなど、神経心理学分野で長年確立された標準検査プロトコルを忠実にWeb上で再現しています。ミリ秒単位の描画・入力レイテンシ制御により、アプリのインストール不要で実験室レベルの厳密な認知測定が可能です。"
      }
    }
  ]
};

export default function LocalizedMemoryClientPage() {
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
      <MemoryClient faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))} />
    </>
  );
}

