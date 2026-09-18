import SaccadicGalleryClient from '@/app/drills/reaction-speed/saccadic-gallery/SaccadicGalleryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (reaction-speed / saccadic-gallery)
// PRIMARY DOMESTIC: "サッケード トレーニング" / "跳躍性眼球運動"
// SECONDARY / LSI:
//   "眼球運動 練習" / "動体視力 トレーニング" / "サッカード 訓練"
//   "視覚反応測定" / "中心窩 視線移動" / "周辺視野 練習"
// ============================================================

export const metadata = {
  title: 'サッケードトレーニング – 跳躍性眼球運動＆反応測定 | SkillDrills',
  description:
    '無料のサッケード眼球運動トレーニング。ランダム点滅する標的へ瞬時に視線を飛ばし、跳躍性眼球運動の速度と着弾精度をブラウザで測定・強化。',
  keywords: [
    'サッケード トレーニング',
    '跳躍性眼球運動',
    '眼球運動 練習',
    '動体視力 トレーニング',
    'サッカード 訓練',
    '視覚反応測定',
    '中心窩 視線移動',
    '周辺視野 練習',
    'エイム 反応',
    '視覚走査',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed/saccadic-gallery',
    languages: getAlternateLanguages('/drills/reaction-speed/saccadic-gallery'),
  },
  openGraph: {
    title: 'サッケードトレーニング – 跳躍性眼球運動＆反応測定 | SkillDrills',
    description:
      '無料ブラウザ完結のサッケード眼球運動トレーニング。視線を瞬時に飛ばして着弾精度と反応速度を測定。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/reaction-speed/saccadic-gallery',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'サッケードトレーニング – 跳躍性眼球運動＆反応測定 | SkillDrills',
    description:
      '無料のサッケードトレーニング。跳躍性眼球運動の着弾精度と反応速度を鍛えよう。',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: 'ドリル一覧', item: 'https://skilldrills.online/ja/drills' },
    { '@type': 'ListItem', position: 3, name: '反応速度', item: 'https://skilldrills.online/ja/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'サッケードトレーニング', item: 'https://skilldrills.online/ja/drills/reaction-speed/saccadic-gallery' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'サッケードトレーニング – 跳躍性眼球運動測定ツール',
  alternateName: ['サッカード 訓練アプリ', '眼球跳躍運動測定器', '視覚走査ドリル'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description:
    '視野周辺部で点滅する標的へ視線を素早くジャンプさせ、中心窩捕捉の潜時と着弾精度を測定する専門トレーニングツール。',
  browserRequirements: '最新のウェブブラウザ（Chrome, Edge, Safari, Firefox）',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'サッケードトレーニング — 跳躍性眼球運動＆反応測定 | SkillDrills',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/saccadic-gallery',
  description:
    '無料オンラインサッケードトレーニング。跳躍性眼球運動速度と周辺視野の捕捉能力を高めるブラウザリアクションゲーム。',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'JavaScript対応の最新ブラウザが必要。',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'サッケード, 跳躍性眼球運動, 視線移動速度, 中心窩捕捉, 動体視力',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'サッケードトレーニング - 跳躍性眼球反応ドリル',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/saccadic-gallery',
  description: 'ブラウザで手軽に跳躍性眼球運動の速度と精度を鍛えるリアクショントレーニング。',
  genre: ['Vision Training', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'サッケード眼球運動と視線移動速度のトレーニング手順',
  description: '周辺視野の標的へ素早く視線を飛ばし中心窩で捕捉するステップバイステップガイド。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '姿勢調整と中央への注視',
      text: '画面から約50〜70cm離れて着席し、中央の基準マークに視線を置きます。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/saccadic-gallery#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '周辺視野での点滅知覚',
      text: '頭を動かさず、周辺視野のどこかで点滅するターゲットを即座に感知します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/saccadic-gallery#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '弾道的な視線ジャンプ（サッケード）の実行',
      text: '迷いなく視軸をターゲット中心座標へ一瞬で跳躍させます。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/saccadic-gallery#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '中心窩捕捉とクリック確認',
      text: '標的中心を鮮明に捉えてクリックし、反応潜時を記録します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/saccadic-gallery#step-4',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-15',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'サッケード眼球運動（跳躍性眼球運動）トレーニングとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '視野内の特定の固視点から別の目標へと視線を瞬間的にジャンプさせる能力（サッケード）の速度、精度、潜時を鍛える眼球運動トレーニングです。',
      },
    },
    {
      '@type': 'Question',
      name: '人間の眼球運動においてサッケードの速度はどれくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'サッケードの最大角速度は毎秒200〜700度に達し、人体で最も高速な生体運動の一つとして知られています（Rayner, 1998）。',
      },
    },
    {
      '@type': 'Question',
      name: 'エクスプレス・サッケード（Express Saccades）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'エクスプレス・サッケード（Fischer & Boch, 1984）は約100〜120ミリ秒という極めて短い潜時で発動する超高速ジャンプで、大脳皮質を迂回して中脳上丘の直接経路から引き起こされます。',
      },
    },
    {
      '@type': 'Question',
      name: 'サッケードトレーニングはFPSゲームにどう役立ちますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VALORANTやCS2において、クリアリングやミニマップ確認、突発的に現れた敵への視線合わせにおいて視覚抑制時間を最小化し、初弾着弾を早めます。',
      },
    },
    {
      '@type': 'Question',
      name: 'サッケード抑制（Saccadic Suppression）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '眼球が高速移動する20〜40ミリ秒の間、脳が視覚情報処理を一時停止し、視界のブレやモーションブラーを感じさせないようにする神経防御現象です。',
      },
    },
    {
      '@type': 'Question',
      name: 'サッケード測定異常（Saccadic Dysmetria）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '目標の手前で視線が止まる「過小跳躍」や目標を行き過ぎる「過大跳躍」を起こし、焦点を合わせるために余分な修正サッケードが必要になる状態です。',
      },
    },
    {
      '@type': 'Question',
      name: 'モニターのリフレッシュレートはサッケード測定に影響しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '大きく影響します。144Hzや240Hzの高リフレッシュレート環境ではフレーム遅延が4〜7msに抑えられ（Woods et al., 2015）、標的の出現をいち早く網膜で捉えられます。',
      },
    },
    {
      '@type': 'Question',
      name: 'サッケード運動は読書速度や集中力にも良い影響がありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。正確なサッケード制御は行から行への視線移動をスムーズにし、読み戻り（リグレッション）を減らして文章認識速度を高めます。',
      },
    },
    {
      '@type': 'Question',
      name: '1日にどれくらい練習するのが効果的ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1回5〜10分程度の集中練習が最適です。目の外眼筋の疲労を防ぐため、長時間のやりすぎを避け、短時間で鋭いセッションを重ねることが推奨されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'この眼球運動トレーニングは無料で使えますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。SkillDrillsのサッケードトレーニングは完全無料です。インストール不要でブラウザ上で動作し、High Resolution Time API（performance.now()）による高精度測定を行います。',
      },
    },
  ],
};

const saccadicGuide = {
  heading: 'サッケード（跳躍性眼球運動）解説：高速視線移動と捕捉精度の科学',
  intro: [
    'サッケード（跳躍性眼球運動）は、視線の固視点をある目標から次の目標へと瞬時に弾道式にジャンプさせる極めて重要な視覚機能です（Rayner, 1998; Fischer & Boch, 1984）。',
    '最大角速度が毎秒700度にも達するサッケードの最中、脳は視覚情報処理を一時停止して像のブレを防ぐ「サッケード抑制」を発動しています。視線が目標へ正確に着弾しないと、修正サッケードが発生して決定的な遅延が生じます。本ドリルは修正サッケードを最小化し、一撃で目標の中心窩に焦点を合わせる精度を鍛えます。',
    '測定精度とハードウェア要因：測定はすべてブラウザ上でローカルに行われます。セキュリティ上のタイマー丸め（約1ms）やモニター更新間隔（60Hzで約16.7ms、240Hzで約4.1ms；Woods et al., 2015）、マウスポーリングレートが加わります。5ms未満の微細な差は計測ノイズとして扱ってください。',
    '同一の表示環境下で継続してトレーニングし、眼球制御の敏捷性と反応時間の向上を定期的に確認してください。',
  ],
  benchmarks: {
    title: '跳躍性眼球運動（サッケード）潜時ベンチマーク表',
    headers: ['サッケード潜時（反応時間）', 'ランク区分', '跳躍メカニズム特性', '実戦での適応分野', '推奨トレーニング着眼点'],
    rows: [
      ['< 130 ms', '神域・エクスプレス (Apex / Pro)', '中脳上丘直結のサブコーティカル跳躍；固視抑制遅延極小', 'プロeスポーツ選手 / 戦闘機パイロット (Fischer & Boch, 1984)', '広角跳躍時の着弾安定性維持'],
      ['130 – 170 ms', 'エリート (Elite)', '極めて素早い皮質発動；固視解除の淀みほぼゼロ', '高ランク競技プレイヤー / トップアスリート', '着弾時のオーバーシュート抑止練習'],
      ['171 – 220 ms', '上級者・標準 (Advanced)', '健康な成人の標準的な跳躍性眼球運動潜時', '健常成人の基準レベル (Rayner, 1998)', '周辺視野の認識可能範囲の拡張'],
      ['221 – 280 ms', '中級者 (Intermediate)', '固視抑制の解除遅延；わずかな探索の迷いが発生', '一時的な眼精疲労や集中低下', '20-20-20ルールで適度な眼球休憩を導入'],
      ['> 280 ms', '初級・測定異常期 (Developing)', '顕著な測定異常と頻繁な二次修正サッケード', '外眼筋の過労または視覚的散漫', 'スピードよりも一発着弾の正確性を最優先'],
    ],
    note: '本基準は神経眼科学の文献（Rayner, 1998; Fischer & Boch, 1984; Leigh & Zee, 2015）を基に、デジタル画面の表示遅延（Woods et al., 2015）を考慮して策定されています。',
  },
  techniques: {
    title: '視線跳躍速度を極限まで高める実践テクニック',
    items: [
      {
        name: '頭部の固定と純粋な眼球運動',
        desc: '頭を動かさず眼球だけを独立して素早く動かします。眼球のみの跳躍は頭部連動より2倍以上高速です。',
        tips: '必要に応じて顎に軽く手を添え、頭部が動いていないか確認しましょう。',
      },
      {
        name: '周辺視野による事前位置察知',
        desc: '画面中央をぼんやり視野に入れつつ、網膜周辺部でターゲットの点滅を素早く察知してから跳躍を開始します。',
        tips: '視野を狭めず、全体を柔らかく見渡す意識を持ちましょう。',
      },
      {
        name: '一発着弾の制動力（Stopping Power）',
        desc: 'ターゲットを行き過ぎたり手前で止まったりせず、中心座標にピタリと視線を止める制動力が反応速度を劇的に縮めます。',
        tips: '無駄な修正動作を省くため、正確な着弾を意識してください。',
      },
      {
        name: '目のリラックスと意識的なまばたき',
        desc: '集中しすぎて瞬きが減るとドライアイになり、眼筋の微細運動が低下します。',
        tips: 'セッションの間隔ごとに意識的にまばたきし、遠くを眺めて目を休めましょう。',
      },
    ],
  },
  steps: [
    '画面中央から約60cm離れて正面に座ります。',
    'ドリルを開始し、中央のスタートマーカーを注視します。',
    '画面のどこかで標的が点滅した瞬間、目だけを素早く飛ばします。',
    '標的中心に焦点を合わせ、即座にクリックして反応を記録します。',
    '制限時間終了後、平均サッケード潜時と着弾精度を確認します。',
  ],
  audience: 'FPSプレイヤー、球技系スポーツ選手、モータースポーツ選手、および視覚探索速度や読書速度を向上させたいすべての方。',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rayner1998', 'fischer1984', 'leigh2015', 'woods2015'),
  related: [
    { href: '/ja/drills/reaction-speed', label: '反応速度 ハブ' },
    { href: '/ja/drills/reaction-speed/reaction-time-test', label: '反応速度テスト' },
    { href: '/ja/drills/reaction-speed/reflex-training-drill', label: '反射神経ゲーム (瞬間認識ドリル)' },
    { href: '/ja/drills/reaction-speed/visual-tracking-speed-test', label: '動体視力テスト' },
  ],
};

export default function JapaneseSaccadicGalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SaccadicGalleryClient copy={{ title: 'サッケードトレーニング' }} />
      <DrillGuide guide={saccadicGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="reaction-speed" currentHref="https://skilldrills.online/ja/drills/reaction-speed/saccadic-gallery" />
      </div>
    </>
  );
}
