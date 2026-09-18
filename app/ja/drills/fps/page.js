import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const fpsDrills = DRILLS.filter((d) => d.category === 'fps');

export const metadata = {
  title: '無料エイム練習 – VALORANT・CS2・Apex エイムトレーナー | SkillDrills',
  description: 'ブラウザでインストール不要の無料FPSエイム練習サイト。VALORANT、CS2、Apex対応の15種類の本格ドリル（フリック、追いエイム、反動制御、反射神経）。',
  keywords: [
    'エイム練習 無料', 'VALORANT エイム練習', 'Apex エイム練習',
    'CS2 エイム練習', '無料 エイムトレーナー', 'フリックエイム 練習',
    '追いエイム 練習', 'トラッキング エイム', 'プリエイム 練習',
    'ヘッドライン 合わせ方', '反動制御 練習', '反射神経 テスト',
    '腕エイム 手首エイム', 'eDPI 感度設定', 'ブラウザ エイム練習'
  ],
  openGraph: {
    title: '無料エイム練習 – VALORANT・CS2・Apex エイムトレーナー | SkillDrills',
    description: 'ブラウザでインストール不要の無料FPSエイム練習サイト。VALORANT、CS2、Apex対応の15種類の本格ドリル（フリック、追いエイム、反動制御、反射神経）。',
    type: 'website',
    url: 'https://skilldrills.online/ja/drills/fps',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '無料FPSエイム練習ハブ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '無料エイム練習 – VALORANT・CS2・Apex エイムトレーナー | SkillDrills',
    description: 'ブラウザでインストール不要の無料FPSエイム練習サイト。15種類の本格ドリル。',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/fps',
    languages: getAlternateLanguages('/ja/drills/fps'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "全ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "FPS エイム練習", "item": "https://skilldrills.online/ja/drills/fps" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "無料FPSエイム練習 – オンラインエイムトレーナー総合ハブ",
  "url": "https://skilldrills.online/ja/drills/fps",
  "description": `15種類の専門FPSエイムトレーニングドリル。フリックショット、追いエイム（トラッキング）、リコイル制御、180度振り向き。VALORANT、CS2、Apex Legends完全対応。登録不要・ブラウザ即時プレイ。`,
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": fpsDrills.map((drill) => {
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
      "name": "VALORANTやCS2のようなタクティカルFPSにおいて、ブラウザでのエイム練習はどのように役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VALORANTやCS2はキルタイム（TTK）が200ms未満と極めて短いため、遭遇時の初弾ヘッドショット精度と微小な修正（マイクロアジャストメント）が勝敗を決定します。実戦のデスマッチではリスポーン待ちや移動の無駄時間が多いのに対し、専用のエイム練習ドリルでは10分間に数百回もの純粋なフリックと制動動作を反復できます。これにより大脳運動皮質の筋記憶を自動化し、実戦においてプリエイムや立ち回りといった認知的判断に余裕を持たせることができます。"
      }
    },
    {
      "@type": "Question",
      "name": "フリックエイム、追いエイム（トラッキング）、ターゲットスイッチングの違いと重要性は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPSエイムの3大基礎要素は以下の通りです：1）フリックエイム：静止状態から標的へ瞬時にカーソルを飛ばして撃ち抜く技術で、ヴァンダルやAK-47のワンタップ撃ちに直結します。2）追いエイム（トラッキング）：敵の不規則な移動ベクトルに合わせて照準を吸い付かせる技術で、Apex LegendsやOverwatch 2のフルオート射撃に必須です。3）ターゲットスイッチング：複数出現する敵の間を最高速で切り替えて倒す技術で、1対複数の乱戦やクラッチ状況で決定的な役割を果たします。"
      }
    },
    {
      "@type": "Question",
      "name": "エイム練習では腕エイム、手首エイム、指先エイムのどれを使うべきですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "競技シーンで推奨されるのは、腕・手首・指先を複合的に連動させるハイブリッドエイムです。前腕と肘（腕エイム）で180度の大きな画面旋回やクリアリングを行い、手首で中距離のターゲット捕捉を担い、指先でヘッドラインの微調整や微小なリコイル制御を行います。手首のみに過度に依存すると可動域が制限され腱鞘炎のリスクが高まり、腕のみでは微細なピクセル単位の精密エイムが困難になります。"
      }
    },
    {
      "@type": "Question",
      "name": "自分に最適なeDPIおよび振り向き（cm/360）感度はどのように見つければよいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "感度はマウスパッド上で真後ろ（360度）を向くために必要な移動距離（cm/360）で管理するのが最も正確です。VALORANTやCS2などのタクティカルシューターでは、微細なヘッドライン維持のため35〜55cm/360（eDPI 200〜320前後）のローセンシが標準的です。一方、ApexやOW2のような激しいトラッキングが求められるタイトルでは24〜38cm/360のミドルセンシが適しています。左右にレレレ移動（ストレイフ）しながら静止した的に照準をブレずに固定し続けられる感度を基準に調整してください。"
      }
    },
    {
      "@type": "Question",
      "name": "エイムが震えたり、敵を行き過ぎる（オーバーシュート）原因と改善策は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "エイムのブレや行き過ぎの主な原因は、前腕の過剰な力み（緊張）、マウスを握る圧力が強すぎること、または自身の制動筋力に対して感度が高すぎることです。改善策として：1）マウスパッドの摩擦面を活用し、停止時にマウスをパッドへ軽く押し込むストッピング技術（制動メカニズム）を練習する、2）スムースパースート（滑らかな視線追従）ドリルで脱力したエイム動作を身につける、3）感度を10〜15%下げて許容誤差範囲を広げることが極めて効果的です。"
      }
    },
    {
      "@type": "Question",
      "name": "ブラウザ型のエイム練習サイトは、Steam等のダウンロード版ソフトと同等の応答性がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。SkillDrillsはW3C標準のRaw Pointer Lock APIを採用しており、WindowsやMacのOSマウス加速曲線やデスクトップ境界を完全にバイパスしてハードウェア未加工の移動量（movementX / movementY）を直接処理します。さらに描画とは独立した固定タイムステップ物理演算を搭載しているため、144Hz、240Hz、360Hzのゲーミングモニター環境でもフレーム落ちや入力遅延（Input Lag）なく、ネイティブゲーム同等の1:1ハードウェア操作感を実現しています。"
      }
    },
    {
      "@type": "Question",
      "name": "プリエイム（ヘッドライン維持）と純粋なフリックエイムは実戦でどちらが重要ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "タクティカルシューターにおける撃ち合いの約70%は、あらかじめ敵の頭の高さと出現位置に照準を置いて飛び出すプリエイム（クロスヘアプレイスメント）で決まります。しかし、敵が予測不可能なオフアングルに陣取っている場合や、ワイドピーク・多人数カバーの状況ではプリエイムだけでは対応できません。その残りの30%の不規則なピンチを制し、200ms以内で逆転ヘッドショットを奪う能力こそが純粋なフリック精度とマイクロアジャスト速度です。"
      }
    },
    {
      "@type": "Question",
      "name": "エイム練習は1日あたり何分くらい行うのが最も効果的ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "運動学習および神経科学の知見では、精密な手指の微細運動トレーニングは集中開始から約30〜35分を経過すると神経疲労により学習効率が低下します。そのため、1日15〜25分の高密度な集中練習を週4〜6日継続することが最も効果的です。週末に数時間まとめて練習するよりも、短時間の負荷をかけた後に質の高い睡眠をとることで、神経の髄鞘化（ミエリン形成）が促され、確固たる筋記憶として定着します。"
      }
    }
  ]
};

export default function JapaneseFPSHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FPSHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

