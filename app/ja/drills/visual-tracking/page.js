import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const trackingDrills = DRILLS.filter((d) => d.category === 'visual-tracking');

export const metadata = {
  title: '動体視力トレーニング & 視覚追跡 – 無料の眼球運動ドリル | SkillDrills',
  description: 'ブラウザで今すぐできる無料の動体視力トレーニング・視覚追跡ドリル。滑動性追従眼球運動（Smooth Pursuit）、弾道軌道予測、周辺視野拡大など14種類の本格ビジョントレーニング。',
  keywords: [
    '動体視力 トレーニング', '動体視力 鍛え方', '動体視力 テスト 無料',
    '滑動性追従眼球運動', '追従性眼球運動 練習', '跳躍性眼球運動 ドリル',
    'エイム トラッキング 練習', '視覚追跡 トレーニング', '周辺視野 トレーニング',
    '野球 動体視力 トレーニング', 'ビジョントレーニング 自宅', '視線安定性 前庭動眼反射',
    '弾道予測 トレーニング', '眼球運動 ストレッチ', '動体視力 アプリ ブラウザ'
  ],
  openGraph: {
    title: '動体視力トレーニング & 視覚追跡 – 無料の眼球運動ドリル | SkillDrills',
    description: 'ブラウザで今すぐできる無料の動体視力トレーニング・視覚追跡ドリル。滑動性追従眼球運動（Smooth Pursuit）、弾道軌道予測、周辺視野拡大など14種類の本格ビジョントレーニング。',
    type: 'website',
    url: 'https://skilldrills.online/ja/drills/visual-tracking',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '無料の動体視力トレーニング・視覚追跡ドリル一覧' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '動体視力トレーニング & 視覚追跡 – 無料の眼球運動ドリル | SkillDrills',
    description: '滑動性追従眼球運動から弾道予測まで14種類の専門眼球運動ドリルをブラウザで無料体験。',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual-tracking',
    languages: getAlternateLanguages('/ja/drills/visual-tracking'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "全ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "動体視力・視覚追跡", "item": "https://skilldrills.online/ja/drills/visual-tracking" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "無料の動体視力トレーニング・視覚追跡(Visual Tracking)ドリル一覧",
  "url": "https://skilldrills.online/ja/drills/visual-tracking",
  "description": "滑動性追従眼球運動（Smooth Pursuit）、正弦波トラッキング、無限軌道、弾道予測、周辺視野など14種類の本格ビジョントレーニングを無料提供。",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": trackingDrills.map((drill) => {
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
      "name": "滑動性追従眼球運動（Smooth Pursuit）と衝動性・跳躍性眼球運動（Saccade）の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "滑動性追従眼球運動（Smooth Pursuit Eye Movement: SPEM）は、移動するボールやゲーム内の敵キャラクターを網膜の中心窩（解像度が最も高い領域）に捉え続けるため、眼球が滑らかに連続追従する自律的運動です。一方、衝動性眼球運動（サッカード: Saccades）は、静止した2点間を秒速最大900度で瞬間的に視線ジャンプさせる弾道性の運動です。野球、テニス、FPSゲームで高速移動する対象を正確に捕捉し続けるには、優れた滑動性追従運動が不可欠です。"
      }
    },
    {
      "@type": "Question",
      "name": "動体視力（Dynamic Visual Acuity）を鍛えることで、スポーツやFPSゲームにどのような効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "通常の静止視力が高くても、高速で動く対象の輪郭を鮮明に認識できなければ正確な打撃や射撃はできません。動体視力トレーニングは、眼球を取り囲む6つの外眼筋の連動性を強化し、高速で飛来するボールや移動する敵の視覚情報を中心窩に維持します。これにより視覚皮質の情報処理遅延を約50〜80ミリ秒短縮でき、野球では球種の判別余裕が生まれ、FPSでは正確なトラッキングエイム（追いエイム）の吸い付きが格段に向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "予測的視覚追跡（Predictive Pursuit）とはどのような能力で、標的が障害物に隠れた時にどう機能しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "予測的視覚追跡とは、標的が障害物の陰に隠れたり瞬間的に消失した場合（オクルージョン）でも、脳の小脳が対象の直前の速度や加速度から軌道を推定し、視線をあらかじめ進行方向へ先回りさせる高度な認知機能です。標的隠蔽ドリルを継続することで、敵が遮蔽物から飛び出してくる瞬間を予測して正確な置きエイムや偏差射撃を決めることができるようになります。"
      }
    },
    {
      "@type": "Question",
      "name": "標的を追従する際に視線がガタつく「追いつきサッカード（Catch-up Saccade）」の原因と改善策は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "追いつきサッカードは、眼球の追従速度が標的の移動速度に追いつかず遅れてしまい（追従ゲイン < 1.0）、視線を中心窩に戻そうと目が小刻みにジャンプしてブレる現象です。これにより視野が揺れ、精密なトラッキングが阻害されます。改善には、低速の等速追従（Constant Slow Pursuit）や滑らかな正弦波曲線ドリルから始め、目の力みを抜いてリラックスした状態で対象の中心を見つめ続ける練習が効果的です。"
      }
    },
    {
      "@type": "Question",
      "name": "ビジョントレーニング（視機能訓練）や脳震盪後のリハビリに動体視力・眼球運動は有効ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、神経眼科学やスポーツ医学の現場では、脳震盪後症候群（PCS）や軽度頭部外傷後の視機能障害に対して、滑動性追従眼球運動と視線安定化トレーニングがリハビリプログラムとして処方されています。規則的な視覚追跡ドリルは脳幹や小脳を再活性化し、両眼の協調運動を回復させ、頭痛、めまい、読書時の焦点調節障害の緩和に寄与します。"
      }
    },
    {
      "@type": "Question",
      "name": "視線安定性（Gaze Stability）と前庭動眼反射（VOR: Vestibulo-Ocular Reflex）の関係とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "視線安定性とは、頭部や身体が激しく動いている最中でも視界を揺らさず標的を鮮明に見続ける能力です。これは内耳の前庭器官が頭部の回転を感知し、頭の動きと真逆の方向へ眼球を同一速度で回転させる「前庭動眼反射（VOR）」によって制御されています。視覚追跡ドリルで外眼筋の微細な制御力を養うことで、自身のキャラクターが激しく移動しながらでも照準がブレない安定した視界を維持できます。"
      }
    },
    {
      "@type": "Question",
      "name": "動体視力や眼球追跡トレーニングは1日に何分程度行うのが適切ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "外眼筋は非常に繊細な小さな筋肉の集合体であるため、疲労しやすい特性があります。最適な練習時間は1回あたり10〜15分、週に3〜5日程度が推奨されます。長時間の過度なトレーニングは眼精疲労や調節緊張（スマホ老眼のようなピントフリーズ）を引き起こす可能性があるため、20分ごとに20フィート（約6m）先を20秒間遠く眺める「20-20-20ルール」を取り入れながら無理なく継続してください。"
      }
    },
    {
      "@type": "Question",
      "name": "動体視力トレーニングにおいて高リフレッシュレートモニター（144Hz〜360Hz）が推奨される理由は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "標準的な60Hzモニターではフレーム更新が16.7ミリ秒ごとなのに対し、144Hzでは6.9ミリ秒、240Hzでは4.2ミリ秒、360Hzでは2.8ミリ秒と飛躍的にコマ数が増加します。高速移動する標的の残像（ゴースト）やコマ送りのようなカクつきが解消され、標的の微細な軌道変化を外眼筋が自然かつ滑らかに追従できるため、生理学的に正しい滑動性運動を身につけることができます。"
      }
    }
  ]
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VisualTrackingDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
