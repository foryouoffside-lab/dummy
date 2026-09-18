import ReactionTimeTestWrapper from '@/app/drills/reaction-speed/reaction-time-test/ReactionTimeTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (reaction-speed / reaction-time-test)
// PRIMARY DOMESTIC: "反射神経テスト" — 2,526 exact / 2,681 broad searches/mo (Domestic #1 winner)
//                    "反応速度テスト" — 1,811 exact / 1,811 broad searches/mo (Domestic #2 winner)
//                    Combined >4,330 searches/mo
// SECONDARY / LSI:
//                    "反射神経 ゲーム"  — 680+ searches/mo
//                    "反応速度 測定"    — 320+ searches/mo
//                    "反射神経 測定"    — 240+ searches/mo
//                    "ミリ秒 測定"      — 180+ searches/mo
//                    "fps 反応速度"    — FPS/VALORANT/Apex high-intent
//                    "動体視力 反応速度" — Visual chronometry queries
// DUAL-WINNER TITLE: 反射神経テスト・反応速度テスト – 無料ミリ秒(ms)測定＆診断ゲーム | SkillDrills
// ============================================================

export const metadata = {
  title: '反射神経テスト・反応速度テスト – 無料ミリ秒(ms)測定＆診断ゲーム | SkillDrills',
  description:
    '無料オンライン反射神経テスト・反応速度テスト。合図に合わせてクリックし、視覚反射スピードをミリ秒(ms)単位で高精度測定。平均タイム比較、ゲーマーランク判定表（VALORANT・Apex）、科学的反射神経メカニズムを解説。',
  keywords: [
    '反射神経テスト',
    '反応速度テスト',
    '反射神経',
    '反応速度',
    '反射神経 ゲーム',
    '反応速度 測定',
    '反射神経 測定',
    'ミリ秒 測定',
    'fps 反応速度',
    'エイム 反応速度',
    '動体視力 反応速度',
    '反射速度',
    'リアクションタイム テスト',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-time-test'),
  },
  openGraph: {
    title: '反射神経テスト・反応速度テスト – 無料ミリ秒(ms)測定＆診断ゲーム | SkillDrills',
    description:
      '無料オンライン反射神経テスト・反応速度テスト。合図に合わせてクリックし、視覚反射スピードをミリ秒(ms)単位で高精度測定。平均タイムやランク判定も完備。',
    url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '反射神経テスト・反応速度テスト – 無料ミリ秒(ms)測定＆診断ゲーム | SkillDrills',
    description:
      '無料オンライン反射神経テスト・反応速度テスト。ミリ秒単位で視覚反射スピードを測定し、平均と比較。',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: '訓練ハブ', item: 'https://skilldrills.online/ja/drills' },
    { '@type': 'ListItem', position: 3, name: '反射神経・反応速度', item: 'https://skilldrills.online/ja/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '反射神経テスト・反応速度テスト', item: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '反射神経テスト・反応速度テスト – 無料ミリ秒(ms)測定＆診断ツール',
  alternateName: ['反射神経テスト', '反応速度テスト', '視覚反射測定器', 'FPS反応速度チェッカー'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description:
    'ブラウザ上でミリ秒(ms)単位の視覚反応速度を測定するオンライン診断ツール。神経科学的ベンチマーク、ゲーマーランク判定、コンボ倍率スコアリングに対応。',
  browserRequirements: 'JavaScript対応の最新Webブラウザ（Chrome, Edge, Safari, Firefox）',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '反射神経テスト・反応速度テスト — ミリ秒(ms) 視覚反射測定ツール | SkillDrills',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test',
  description:
    '無料オンライン視覚反応速度・反射神経テストツール。画面の刺激に合わせてクリックし、ミリ秒単位で反応遅延を測定します。',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'JavaScript対応の最新Webブラウザが必要。',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: '反応速度, 反射神経, 視覚情報処理速度, 神経筋反応時間, メンタルクロノメトリー',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '反射神経テスト・反応速度測定ゲーム',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test',
  description: '反射神経テスト・反応速度測定ゲーム',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '反射神経テスト・反応速度テストの測定手順',
  description: 'ブラウザ上で画面の刺激に合わせて最速でクリックし、ミリ秒単位で視覚反応速度を測定する方法。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'テスト画面の起動',
      text: '「トレーニング開始」ボタンを押して全画面の反応速度測定モードを立ち上げます。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '目標インターバルの把握',
      text: '画面中央に表示される目標ミリ秒インターバルとシグナル待機状態を確認します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '刺激出現の瞬間に即クリック',
      text: 'ターゲット刺激が現れた瞬間に、最も速くマウスクリックまたは画面タップを行います。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'ミリ秒遅延とランク診断の確認',
      text: 'セッション完了後、ミリ秒平均誤差、正確度、eスポーツ換算ランク（レディアント／プレデター等）を確認します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test#step-4'
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: '人間の平均的な反応速度は何ミリ秒ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '視覚刺激に対する健康な成人の平均反応速度は約200〜250ミリ秒（ms）です（Kosinski, 2008）。200ms未満は極めて優秀であり、180ms以下はプロeスポーツ選手やF1ドライバーに匹敵する上位数パーセントのエリート水準です。',
      },
    },
    {
      '@type': 'Question',
      name: '反射神経テスト（反応速度テスト）はどのように測定されますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '画面上に視覚刺激が現れた瞬間から、ユーザーがマウスをクリックまたは画面をタップするまでの経過時間を、ブラウザの高精度 performance.now() API（1ミリ秒以下の高分解能クロック）を用いてクライアント側で直接計測します（Woods et al., 2015）。',
      },
    },
    {
      '@type': 'Question',
      name: '反応速度はトレーニングや反復練習で速くなりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。日常的な反応反復ドリルを行うことで、視覚刺激を検知してから運動野へ指令を送る神経経路が活性化し、15〜30ミリ秒程度の反応時間短縮と入力のブレ（標準偏差）の抑制が期待できます（Dye, Green, & Bavelier, 2009）。',
      },
    },
    {
      '@type': 'Question',
      name: 'なぜ人や日によって反応速度にばらつきが出るのですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '睡眠時間、サーカディアンリズム（体内時計の覚醒度）、精神的疲労、年齢、集中状態、カフェイン摂取、および使用デバイスの入力遅延やディスプレイのリフレッシュレートによって日々変動します。',
      },
    },
    {
      '@type': 'Question',
      name: 'モニターのリフレッシュレート（Hz）は測定結果に影響しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '大きく影響します。一般的な60Hzモニターは1フレーム表示に16.67msのバッファ遅延が発生しますが、144Hz（約6.94ms）や240Hz（約4.17ms）のゲーミングモニターは視覚刺激をより早く目に届けるため、計測値が約10〜12ms改善することが科学的に実証されています（Woods et al., 2015）。',
      },
    },
    {
      '@type': 'Question',
      name: '「反射」と「反応時間」の違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '膝蓋腱反射などの「反射」は脊髄レベルの回路を通り大脳を介さないため約20〜50msで生じます。一方「反応時間」は大脳の視覚皮質で刺激を認知し、判断を経て運動野から筋肉へ信号を送る随意運動であるため、通常150〜250ms以上の時間を要します。',
      },
    },
    {
      '@type': 'Question',
      name: 'なぜ視覚より聴覚刺激のほうが反応速度が速いのですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '音の刺激は耳から脳幹・聴覚皮質へ約8〜10msで到達するのに対し、網膜の光電変換と視覚皮質への伝達には20〜40msかかります。そのため、人間の聴覚反応速度（約140〜160ms）は視覚反応速度よりも常に30〜50ms高速です（Shelton & Kumar, 2010; Jain et al., 2015）。',
      },
    },
    {
      '@type': 'Question',
      name: '年齢を重ねると反応速度は低下しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '単純反応速度は18〜24歳頃にピークを迎え、その後10年ごとに約2〜6msずつ緩やかに遅延する傾向があります（Der & Deary, 2006）。ただし、定期的な運動やエイムトレーニング・反応ドリルを継続することで神経伝達速度の維持が可能です。',
      },
    },
    {
      '@type': 'Question',
      name: 'カフェインを摂取すると反応速度は上がりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '適量のカフェイン（コーヒーやエナジードリンク）は中枢神経系のアデノシン受容体をブロックして大脳の覚醒度を高め、反応速度を一時的に10〜20ms向上させることが確認されています（Smith, 2002）。',
      },
    },
    {
      '@type': 'Question',
      name: '一般的なHuman BenchmarkとSkillDrillsの違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '単純な赤から緑への色変化クリックのみを測る従来のベンチマークとは異なり、SkillDrillsではミリ秒インターバルの時間予測（メンタルクロノメトリー）、過剰な先走りクリックの抑制、および難易度に応じた連続コンボ倍率を統合し、実戦に即した神経制御力を鍛えます。',
      },
    },
    {
      '@type': 'Question',
      name: 'VALORANTやApexなどのFPSゲームで反応速度はどう活きますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '敵が遮蔽物から飛び出してくるピーク（置きエイム）に対する撃ち合い勝率、敵のフラッシュやスモークへの即応、接近戦での初弾命中率に直結します。20msの差が撃ち合いの勝敗を分けます。',
      },
    },
    {
      '@type': 'Question',
      name: 'スマートフォンやタブレットでも測定できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。スマートフォンやタブレットのタッチスクリーンにも完全最適化されており、縦画面・横画面のどちらでもインストール不要・完全無料で即座に測定可能です。',
      },
    },
  ],
};

const reactionGuide = {
  heading: '反射神経テスト・反応速度テスト ガイド＆ランク判定基準',
  intro: [
    '反射神経テスト（反応速度テスト）は、視覚刺激を捉えてから脳の視覚皮質で知覚し、運動野から指先へクリック指令を伝達するまでのミリ秒（ms）単位のレイテンシを精密に測定するツールです。',
    'VALORANT、CS2、Apex Legends、League of Legendsなどの競技eスポーツやモータースポーツにおいて、コンマ数秒のミリ秒差が撃ち合いの勝敗や危険回避の成否を決定づけます。',
    '高精度測定の仕組み：本ツールはブラウザの performance.now() API を使用し、1ミリ秒未満の高精度クロックでタイムスタンプを記録します。測定スコアはローカル環境（ブラウザ内）で完結し、外部サーバーへの通信ラグは一切排除されています。',
    'ハードウェア遅延への考慮：60Hzの通常モニターでは描画更新により最大約16.7msの遅延が生じますが、144Hz（約6.9ms）や240Hz（約4.2ms）のゲーミングモニターを使用し、ポーリングレート1000Hzのマウスで測定することで、より純粋な生体神経反射時間を測定できます（Woods et al., 2015）。',
  ],
  benchmarks: {
    title: '反射神経・反応速度ベンチマーク＆ゲーマーランク判定表',
    headers: ['反応速度 (ms)', 'ランク区分', '上位割合', 'ゲーム換算ランク', '神経反応の特徴'],
    rows: [
      ['< 150 ms', '神レベル・異次元 (Godlike)', '上位 1%', 'F1ドライバー / 国内トッププロ', '極限の先読み・事前シナプス活性化、人体の神経伝達限界'],
      ['150 – 190 ms', 'プロ・最高峰 (Elite)', '上位 5%', 'レディアント / プレデター', '極めて高速な視覚情報処理と無駄のない即時筋収縮'],
      ['190 – 240 ms', '上級ゲーマー (Advanced)', '上位 25%', 'ダイヤ / アセンダント / マスター', '鋭い刺激弁別と安定したクロスヘア発射タイミング'],
      ['240 – 280 ms', '一般平均 (Average)', '中央値 50%', 'ゴールド / プラチナ', '標準的な健康成人の視覚反射スピード（60Hz環境標準）'],
      ['> 300 ms', '初級 / カジュアル (Developing)', '下位 20%', 'シルバー / ブロンズ', '疲労・睡眠不足、またはモニター・機器の入力遅延過多'],
    ],
    note: '本評価基準はヒト生体測定学の科学的文献（Kosinski, 2008; Woods et al., 2015）を基にした指標です。60Hzディスプレイでは1フレームあたり約16.7msの表示バッファ遅延が発生します。',
  },
  techniques: {
    title: '感覚別の反応限界と科学的メカニズム',
    items: [
      {
        name: '視覚刺激の伝達遅延 (~200–250ms)',
        desc: '網膜の光受容体が光を電気信号へ変換し、視神経を通って大脳の一次視覚野（V1）へ送られ、運動野から指先へクリック指令が到達するまでの物理的所要時間です（Kosinski, 2008）。',
        tips: '目に力を入れすぎずリラックスした広い視野を保つことで、周辺視野の桿体細胞が刺激変化を最速で捉えられます。',
      },
      {
        name: '聴覚刺激の優位性 (~140–170ms)',
        desc: '音刺激は脳幹から聴覚皮質に至る経路が短いため、一般に視覚刺激よりも40〜80msほど高速に反応できます（Shelton & Kumar, 2010; Jain et al., 2015）。',
        tips: 'FPSゲームでは視覚で敵を確認する前に、足音やリロード音などのサウンド情報に先行して反応することが極めて有利です。',
      },
      {
        name: '触覚・体性感覚の反射ループ (~130–160ms)',
        desc: '物理的な振動や触覚刺激は複雑な視覚認識処理をバイパスするため、最も素早い筋肉反応を引き起こします。',
        tips: 'タクタイル感の明確なメカニカルスイッチを使用することで、クリック入力のトリガー遅延を最小化できます。',
      },
      {
        name: 'ディスプレイとデバイスの入力遅延最適化',
        desc: '60Hzモニターの描画待ち時間は16.7msですが、240Hzモニターでは4.1msに短縮されます（Woods et al., 2015）。',
        tips: '1000Hzポーリングレートのゲーミングマウス使用および垂直同期（V-Sync）のオフ設定を推奨します。',
      },
    ],
  },
  steps: [
    '「トレーニング開始」を押して全画面の反応速度測定モードを起動します。',
    '画面中央の目標時間とシグナル待機状態を確認します。',
    'ターゲットが現れた瞬間、最速でマウスをクリックまたは画面をタップします。',
    '複数回試行してミリ秒平均値、正確度、およびゲーマーランク判定を確認します。',
  ],
  audience: 'FPS/MOBA競技ゲーマー（VALORANT, Apex, CS2, LoL）、格闘ゲーム競技者、モータースポーツドライバー、視覚反射能力を測定・強化したい全ての方。',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kosinski2008', 'woods2015', 'jain2015', 'shelton2010', 'dye2009', 'der2006', 'smith2002'),
  related: [
    { href: '/ja/drills/reaction-speed', label: '反射神経ハブ' },
    { href: '/ja/drills/reaction-speed/reflex-training-drill', label: '反射神経ゲーム' },
    { href: '/ja/drills/reaction-speed/fps-tracking-trainer', label: 'FPS追従エイムトレーナー' },
    { href: '/ja/drills/motor/movement-speed/rapid-tapping', label: '連打測定・CPSテスト' },
    { href: '/ja/drills/fps/flick-shot-training', label: 'フリックショット練習' },
  ],
};

export default function JapaneseReactionTimeTestPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
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
      <ReactionTimeTestWrapper copy={{ title: '反射神経テスト・反応速度テスト' }} />
      <DrillGuide guide={reactionGuide} />
    </>
  );
}
