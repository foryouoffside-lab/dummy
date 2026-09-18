import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const reactionDrills = DRILLS.filter((d) => d.category === 'reaction-speed');

export const metadata = {
  title: '反射神経テスト・反応速度測定 – 無料反射神経ゲーム | SkillDrills',
  description: 'ブラウザで無料測定できる反射神経テスト＆反応速度トレーニング。緑画面の単純反応から動体視力、サッカード眼球運動まで8種類の本格ドリルを今すぐ開始。',
  keywords: [
    '反射神経 テスト', '反応速度 測定', '反射神経 鍛える ゲーム',
    '動体視力 トレーニング', 'エイム 反応速度 上げる', '単純反応時間 測定',
    '選択反応時間 テスト', 'サッカード 眼球運動 練習', 'FPS 反射神経 ミリ秒',
    'クリック 反応速度 テスト', '手と目の協調 トレーニング', '周辺視野 トレーニング',
    'ゲーミングモニター 遅延 反応速度', 'インプットラグ 削減', 'ブラウザ 反射神経 測定 無料'
  ],
  openGraph: {
    title: '反射神経テスト・反応速度測定 – 無料反射神経ゲーム | SkillDrills',
    description: 'ブラウザで無料測定できる反射神経テスト＆反応速度トレーニング。緑画面の単純反応から動体視力、サッカード眼球運動まで8種類の本格ドリルを今すぐ開始。',
    type: 'website',
    url: 'https://skilldrills.online/ja/drills/reaction-speed',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'オンライン反射神経テスト＆反応速度測定' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '反射神経テスト・反応速度測定 – 無料反射神経ゲーム | SkillDrills',
    description: '単純反応から動体視力、サッカードまで8種類の本格反射神経ドリルをブラウザで今すぐ無料体験。',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed',
    languages: getAlternateLanguages('/ja/drills/reaction-speed'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "全ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "反射神経・反応速度トレーニング", "item": "https://skilldrills.online/ja/drills/reaction-speed" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "無料 反射神経テスト・反応速度測定総合ドリル一覧",
  "url": "https://skilldrills.online/ja/drills/reaction-speed",
  "description": "ミリ秒単位の単純反応時間測定から動体視力追従、視線跳躍（サッカード）まで、科学的根拠に基づいた8種類の反射神経トレーニングを提供します。",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": reactionDrills.map((drill) => {
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
      "name": "単純反応時間（Simple RT）と選択反応時間（Choice RT）の決定的な違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "単純反応時間（Simple Reaction Time）とは、「画面が赤から緑に変わったらクリックする」というように、単一の明確な視覚刺激に対してあらかじめ決定された単一の運動を反射的に実行するまでの時間（健常成人で約200〜250ms）を指します。一方、選択反応時間（Choice Reaction Time）は、複数現れる刺激の中から特定のターゲットを瞬時に識別し、どの行動をとるべきか判断する認知処理が含まれます（ヒックの法則により選択肢が増えるほど遅延し、300〜450ms以上を要します）。実戦のFPSや格闘ゲームでは、単なる反射よりも敵味方の識別や回避方向を選択する「選択反応時間」の短縮が勝敗を左右します。"
      }
    },
    {
      "@type": "Question",
      "name": "人間の視覚反応速度の平均は何ミリ秒（ms）ですか？プロゲーマーレベルまで短縮できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "一般的な成人の視覚刺激に対する平均単純反応時間は約240〜270ms（ミリ秒）です。これには網膜の光受容体の光電変換（約20〜40ms）、視神経から大脳後頭葉の視覚野への情報伝達（約60〜80ms）、運動野から脊髄を経て指先筋肉を収縮させる運動指令伝達（約50〜70ms）という生理学的な伝達経路が含まれます。しかし、系統的な反射神経ドリルと神経可塑性トレーニングを継続することで、プロゲーマーやトップアスリート基準である150〜180ms台まで大幅に短縮することが可能です。"
      }
    },
    {
      "@type": "Question",
      "name": "動体視力（DVA）とサッカード眼球運動（視線跳躍）の訓練は反応速度にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "反応速度は単に手首や指を動かす速さだけでなく、「眼が対象をいかに速く捉えられるか」という視覚入力速度に直結しています。動く標的を滑らかに追い続ける追従性眼球運動（Smooth Pursuit）と、ある点から別の点へ瞬時に視線を飛ばす跳躍性眼球運動（Saccades）を鍛えることで、外眼筋の協調性が向上します。これにより、標的の像を網膜の中心窩（解像度が最も高い部位）に捉えるまでの時間を数十ミリ秒短縮でき、脳の判断開始タイミングを劇的に前倒しできます。"
      }
    },
    {
      "@type": "Question",
      "name": "測定時のモニターリフレッシュレート（Hz）やマウスのポーリングレートは結果に影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ハードウェアの入力遅延（システムレイテンシ）は測定結果に決定的な影響を与えます。60Hzの標準モニターでは1フレーム表示に16.6msを要しますが、144Hz（約6.9ms）や240Hz（約4.1ms）の高リフレッシュレートモニターでは表示遅延が極限まで削減されます。さらに、1000Hz以上のポーリングレートを持つゲーミングマウスとW3C Pointer Lock APIを採用したWebブラウザ環境を併用することで、OSのマウス加速やバッファリング遅延を排除し、純粋な生体反応速度を1ミリ秒単位の精度で正確に計測できます。"
      }
    },
    {
      "@type": "Question",
      "name": "睡眠不足、カフェイン摂取、脱水症状は反射神経にどのような影響を与えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "神経科学の研究によると、わずか2時間の睡眠不足でも中枢神経系の情報処理効率が低下し、反応速度が30〜50ms程度遅延します（これは微量のアルコールを摂取した状態に匹敵します）。適量のカフェイン（100〜200mg）はアデノシン受容体をブロックして一時的に10〜15msの反応短縮をもたらしますが、過剰摂取は手指の微小振戦（トレマー）を引き起こしクリック精度を損ないます。また、体内の水分が2%減少するだけでも脳の前頭葉機能が低下し、反応抑制や正確な意思決定が鈍ることが確認されています。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲームにおいて、ネット回線のPING値と生体反応速度はどのように相関しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "敵を視認してから弾丸判定がゲームサーバーに到達するまでの総遅延は「生体反応時間 ＋ システム入力遅延 ＋ ネットワークPING」の合算です。例えば、プレイヤーの反応時間が200ms、PC遅延が15ms、PINGが35msの場合、合計は250msとなります。もし相手プレイヤーより回線PINGで20ms不利であっても、日々の反射ドリルで自身の反応時間を30ms短縮できれば、ネットワークのハンディキャップを相殺して撃ち合いで先に弾を命中させることが可能です。"
      }
    },
    {
      "@type": "Question",
      "name": "反応速度を最も効率的に伸ばすための1日の推奨練習時間と頻度は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "中枢神経系は極度の集中を伴う反射練習において急速に疲労します。神経疲労が蓄積した状態で長時間のトレーニングを行うと、遅延した反応パターンが脳に記憶されてしまい逆効果です。最も効果的なプロトコルは、1セッション15〜20分程度の超集中ドリルを、週4〜5日継続することです。トレーニング前に手首や指のストレッチを行い血流を促すこと、セッション間に1〜2分のアイレスト（眼球の休息）を設けることが、シナプス伝達効率を最大化する秘訣です。"
      }
    },
    {
      "@type": "Question",
      "name": "SkillDrillsの反射神経テストやドリルはスマートフォン（スマホ）でも正確に測定できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrillsの全ドリルはスマートフォンのタッチ操作とPCのマウスクリックの両方に完全対応しています。ただし、スマートフォンの静電容量方式タッチパネルは、ハードウェアの特性上20〜40ms程度のタッチ入力遅延（Touch Latency）が物理的に発生します。そのため、厳密なミリ秒単位の絶対的な反応速度計測やミリ単位のマウス操作反射を鍛えたい場合は、144Hz以上のPC環境を推奨します。スマートフォンでは移動中や就寝前の日常的な認知反射ウォーミングアップとして最適にご活用いただけます。"
      }
    }
  ]
};

export default function JapaneseReactionHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ReactionSpeedDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

