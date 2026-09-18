import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const visualDrills = DRILLS.filter((d) => d.category === 'visual');

export const metadata = {
  title: '動体視力テスト・深視力検査・視覚トレーニング | SkillDrills',
  description: '動体視力トレーニング、深視力検査（三桿法）、光反応速度、多目標追従（MOT）、視覚探索など9種類の科学的視覚機能検査と眼球運動ドリル。無料ブラウザ測定。',
  keywords: [
    '動体視力テスト', '動体視力トレーニング', '深視力検査',
    '深視力コツ三桿法', '眼球運動トレーニング', '光反応速度測定',
    '視覚反射神経テスト', '周辺視野トレーニング', '多目標追従テスト',
    '視覚探索課題', 'ビジョントレーニング無料', 'スムーズパシュート眼球運動',
    '視覚的注意検査', '動体追従能力測定', 'スポーツビジョントレーニング'
  ],
  openGraph: {
    title: '動体視力テスト・深視力検査・視覚トレーニング | SkillDrills',
    description: '動体視力トレーニング、深視力検査（三桿法）、光反応速度、多目標追従（MOT）、視覚探索など9種類の科学的視覚機能検査と眼球運動ドリル。無料ブラウザ測定。',
    type: 'website',
    url: 'https://skilldrills.online/ja/drills/visual',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'SkillDrills 視覚機能・動体視力トレーニング' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '動体視力テスト・深視力検査・視覚トレーニング | SkillDrills',
    description: '動体視力トレーニング、深視力検査、多目標追従（MOT）、視覚探索など9種類の無料視覚認知ドリル。',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual',
    languages: getAlternateLanguages('/ja/drills/visual'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "パフォーマンストレーニング", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "視覚認知 & 動体視力", "item": "https://skilldrills.online/ja/drills/visual" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "視覚機能トレーニング & 動体視力検査 (9種目)",
  "url": "https://skilldrills.online/ja/drills/visual",
  "description": "動体視力、深視力検査、光反応速度、多目標追従、視覚探索、時間分解能を鍛える9種類の視覚認知ドリル。",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": visualDrills.map((drill) => {
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
      "name": "動体視力（DVA）の向上は野球やテニス、FPSゲームの反応にどのような効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "静止視力と異なり、動体視力は高速移動する物体の像を網膜中心窩（fovea）にブレずに保持し続ける視覚機能です。移動物体の弾道予測と網膜への像固定ドリルを反復することで外眼筋と視覚皮質の連係が強化され、野球や卓球のインパクトタイミングやFPSにおけるトラッキングエイムの精度が飛躍的に高まります。"
      }
    },
    {
      "@type": "Question",
      "name": "三桿法による深視力検査（Distance Judgment）とは何を測定しているのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "三桿法は左右の網膜に生じる視差（両眼視差）を手がかりに、前後に移動する棒が中央で並んだ瞬間を捉えて遠近感・立体感を測る検査です。大型免許や二種免許の合格基準（平均誤差20mm以内）を満たすだけでなく、高速道路走行時の車間距離把握や球技の距離感判断に不可欠な立体視機能を鍛えます。"
      }
    },
    {
      "@type": "Question",
      "name": "多目標追従（MOT: Multiple Object Tracking）はなぜ周辺視野やゲームの状況判断に効くのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MOT課題は頭頂葉（Parietal Lobe）が司る空間的分割注意と視覚性ワーキングメモリを極限まで刺激します。視野中央に固定視線を保ちながら周囲を不規則に飛び回る複数のターゲットを同時追尾することで有効視野（UFOV）が拡大し、集団球技でのパスコース把握やFPSの多方向クリアリングが迅速になります。"
      }
    },
    {
      "@type": "Question",
      "name": "スムーズパシュート（滑動性追従眼球運動）とは何ですか？サッケード跳躍との違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "スムーズパシュートは滑らかに移動する対象を視線が跳躍（サッケード）することなく連続的に追従する眼球運動です。対象の速度変化やノイズに対してサッケードによる視界のブラックアウトを防ぎ、ターゲットの細部や回転を常に鮮明に視認し続けるために不可欠な基礎眼球機能です。"
      }
    },
    {
      "@type": "Question",
      "name": "光反応速度測定（Light Reaction）と通常のボタン押し反射テストの違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "一般的な反射神経テストは色の弁別や形状認識の認知判断が介在しますが、光反応テストはストロボ閃光刺激による網膜の光電変換から運動野の筋収縮指令に至る純粋な光受容・神経伝達遅延（Visual-Motor Latency）をミリ秒単位で測定し、視覚反射の基礎限界値を明らかにします。"
      }
    },
    {
      "@type": "Question",
      "name": "高密度な視覚探索（Visual Search）ドリルは脳のどの認知プロセスを活性化させますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "視覚探索課題は多数の妨害刺激（ディストラクター）の中から特定の結合特徴を持つ標的を瞬間特定する訓練です。視覚野の特徴統合（Feature Integration）と前頭前野のノイズ抑制メカニズムを同時に動員するため、乱雑な視覚情報から瞬時に重要な対象だけを拾い上げる情報処理速度が向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "視覚トレーニングを行う際の最適な頻度と1回のセッション時間はどれくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "視覚機能と外眼筋は非常に繊細で高エネルギーを消費するため、1回あたり15〜20分、週3〜5回のセッションが最も推奨されます。30分以上の過度な連続トレーニングは毛様体筋の疲労や眼精疲労を招き、パフォーマンスの低下につながるため、短時間の集中反復が効果的です。"
      }
    },
    {
      "@type": "Question",
      "name": "ブラウザベースのビジョントレーニングは実用的なスポーツビジョン訓練として有効ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。特殊な医療機器や大型機器を用いずとも、高リフレッシュレート対応のHTML5キャンバスにより、サブピクセル単位の眼球運動・光反応・周辺視野刺激を日常的に反復可能です。スポーツ現場や運転免許試験対策における自主トレーニングツールとして極めて高い実用性を誇ります。"
      }
    }
  ]
};

export default function VisualDrillsPage() {
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
      <VisualDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
