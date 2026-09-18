import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (rapid-tapping / motor)
// PRIMARY DOMESTIC: "連打測定"             — 1,534 exact Bing searches/mo (Domestic #1 query)
//                    "連打ツール"           — 1,634 exact Bing searches/mo
//                    "cps 測定" / "cps測定" — 1,076 + 293 = 1,369 exact searches/mo
//                    "連打" / "連打ゲーム"   — 687 + 692 = 1,379 exact searches/mo
// SECONDARY / LSI:
//                    "クリック速度測定"     — 306 exact searches/mo
//                    "cps test" / "CPSテスト"— 206 + 124 exact searches/mo
//                    "連打力測定"           — 120 exact searches/mo
//                    "クリック速度"         — 109 exact searches/mo
//                    "マイクラ 連打" / "マイクラ cps" — Minecraft PvP high-intent
//                    "ジッタークリック" / "バタフライクリック" — Specialized technique queries
// NATIVE TITLE:      連打測定・CPSテスト – 無料クリック速度測定＆連打力診断ツール | SkillDrills
// ============================================================

export const metadata = {
  title: '連打測定・CPSテスト – 無料クリック速度測定＆連打力診断ツール | SkillDrills',
  description:
    'ブラウザ上で今すぐ測定できる無料の連打測定・CPSテストツール。1秒間のクリック速度（CPS）、秒間連打数、ジッタークリックやバタフライクリックの速度と前腕の筋持久力を45秒間で精密診断。マインクラフトPvPやFPSの連射練習に最適。',
  keywords: [
    '連打測定',
    '連打 測定',
    '連打ツール',
    'cps 測定',
    'cps測定',
    'CPSテスト',
    'cps テスト',
    'クリック速度測定',
    '連打力測定',
    '連打テスト',
    'クリックテスト',
    '秒間クリック数',
    'クリック速度',
    'マイクラ 連打',
    'マイクラ cps',
    'ジッタークリック',
    'バタフライクリック',
    '連打ゲーム',
  ],
  openGraph: {
    title: '連打測定・CPSテスト – 無料クリック速度測定＆連打力診断ツール | SkillDrills',
    description:
      'ブラウザ上で今すぐ測定できる無料の連打測定・CPSテストツール。1秒間のクリック速度（CPS）、秒間連打数、ジッタークリックやバタフライクリックの速度と前腕の筋持久力を45秒間で精密診断。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '連打測定・CPSテスト – 無料クリック速度測定＆連打力診断ツール | SkillDrills',
    description:
      'ブラウザ上で今すぐ測定できる無料の連打測定・CPSテストツール。1秒間のクリック速度（CPS）、秒間連打数、ジッタークリックやバタフライクリックの速度と前腕の筋持久力を45秒間で精密診断。',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/drills/motor/movement-speed/rapid-tapping'),
  },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: '訓練ハブ', item: 'https://skilldrills.online/ja/drills' },
    { '@type': 'ListItem', position: 3, name: '運動・操作トレーニング', item: 'https://skilldrills.online/ja/drills/motor' },
    { '@type': 'ListItem', position: 4, name: '連打測定・CPSテスト', item: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '連打測定・CPSテスト – クリック速度測定＆連打持久力診断ツール',
  alternateName: ['連打測定', 'CPSテスト', 'クリック速度測定', '連打ツール', '秒間クリック数測定'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description:
    'ブラウザ完結の無料連打測定・CPSテストツール。1本指単打、ジッタークリック、バタフライクリックの秒間連打速度と、加速するターゲット縮小に対する神経筋持久力を45秒間で精密測定します。',
  url: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'ja-JP',
  dateModified: '2026-09-11',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '連打測定・CPSテスト',
  alternateName: ['連打測定', 'CPS 測定', 'クリックテスト'],
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvasおよび高周波ポインター入力をサポートする最新のウェブブラウザ',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  url: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping',
  inLanguage: 'ja-JP',
  dateModified: '2026-09-11',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'CPSテスト – 秒間クリック数測定・連打速度測定ツール',
  url: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping',
  description: 'CPSテスト – 秒間クリック数測定・連打速度測定ツール',
  genre: ['Clicker Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' }
};


const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '連打測定（CPSテスト）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '連打測定（CPSテスト、Clicks Per Second）とは、1秒間にマウスまたはタッチスクリーンを何回クリックできるかを測定するデジタル運動能力診断ツールです。高周波の神経筋伝達速度、指の腱の反復振動速度、および前腕筋群の持続的な筋持久力をミリ秒単位の精度で評価します。',
      },
    },
    {
      '@type': 'Question',
      name: 'ゲーマーの平均CPS（連打速度）の基準値はどれくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '一般的なPCユーザーやカジュアルゲーマーが人差し指で普通にクリックした場合の平均値は5.0〜6.5 CPSです。ゲーム操作に熟練したプレイヤーは単打で8.0〜10.5 CPSに達し、マインクラフトPvPや競技音ゲーマーはジッタークリックで12.0〜16.0+ CPS、バタフライクリックで16.0〜20.0+ CPSを記録します。',
      },
    },
    {
      '@type': 'Question',
      name: 'ジッタークリック（Jitter Clicking）とは何ですか？その生理学的仕組みは？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ジッタークリックとは、前腕の屈筋群と伸筋群を同時に緊張させて等尺性共収縮（アイソメトリック収縮）を起こし、腕全体に発生させた微小な痙攣振動を手首を経由して人差し指先端へと伝える連打技術です。指を独立して上下運動させずに11〜15 CPS以上の超高速クリックを実現します。',
      },
    },
    {
      '@type': 'Question',
      name: 'バタフライクリック（Butterfly Clicking）とジッタークリックの違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'バタフライクリックは、マウスの左ボタンスイッチに対して人差し指と中指を交互に振り下ろして連打する二連打法です。腕全体を硬直させるジッタークリックと比べて筋肉への負担が少なく、チャタリング検出時間（デバウンスタイム）が短いゲーミングマウスを使用することで16〜22+ CPS以上の圧倒的な連打速度を発揮できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'マインクラフト（Minecraft）PvPで高いCPSが重要なのはなぜですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '特にマインクラフトの1.8戦闘システムでは、クリック速度が速いほど相手への攻撃ヒット判定（ヒットレジストレーション）が優先され、相手に与えるノックバックを最大化できます。さらに自身が受けるノックバックを軽減できるため、相手を空中に浮かせたまま一方的に攻撃し続ける「コンボ」を維持するために高いCPSが不可欠です。',
      },
    },
    {
      '@type': 'Question',
      name: 'VALORANTやCS2などのタクティカルFPSでも連打速度は重要ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'タクティカルFPSではクロスヘアの配置と精密なエイムが最優先されますが、クラシックやGhost、USP-Sなどのセミオートマチック（単発）ハンドガンを使用するピストルラウンドでは、視点をブレさせずに素早くタップ撃ちする連打能力と指先の安定性が撃ち合いの勝率を直接左右します。',
      },
    },
    {
      '@type': 'Question',
      name: '人間の人差し指単打における生理学的な限界速度は何CPSですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ward Halstead（1947）やTodor & Kyprie（1980）の神経心理学研究によると、人間の大脳皮質運動野からの自発的運動指令には不応期が存在するため、利き手人差し指の単独随意収縮による限界は秒間5.5〜7.0Hz（10秒間で約55回）とされています。10 CPSを超える打鍵は、前腕の筋共鳴振動や複数指の交互運動といった生体力学的適応によって可能になります。',
      },
    },
    {
      '@type': 'Question',
      name: '当サイトの45秒連打測定ドリルはどのように難易度が上がりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '一般的な5秒間の短時間クリック測定とは異なり、本ドリルは45秒間の持久力テストです。クリックするたびにターゲット球が拡大しますが、スコアが上がるにつれて毎秒最大600ピクセルの勢いで球が自動縮小します。球が消滅（半径0）するとペナルティが発生するため、瞬間的な連打力だけでなく持続的なペース配分が試されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'クリック速度を向上させ、前腕の疲労や腱鞘炎を防ぐにはどうすればよいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '45秒間の全力連打の後に60秒間の完全脱力休息を挟むインターバルトレーニングが効果的です。腕全体でマウスを強く押し付けるのではなく、中手指節関節（MCP関節）を支点とした脱力タップを意識し、練習前後に前腕屈筋群のストレッチを行うことで腱鞘炎や反復性疲労障害（RSI）を予防できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'スマートフォンやタブレットのタッチパネルでも測定できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、本ツールはPointer Events APIによるマルチタッチ入力に対応しており、スマートフォンやタブレットの画面を直接指で連打してタップ速度を測定できます。タッチデバイスでの2本指交互タップやモバイル音ゲーの打鍵速度テストにも最適です。',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'CPSテスト – 秒間クリック数測定・連打速度測定ツール',
  description: 'CPSテスト – 秒間クリック数測定・連打速度測定ツール',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'マウスグリップと指の配置',
      text: '手首をマウスパッドに安定させ、人差し指または中指をメインボタンスイッチの上に構えます。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '45秒クリック測定の開始',
      text: '「訓練開始」をクリックし、カウントダウン終了と同時に最高速でターゲットボールを連打します。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '収縮エンジンへの対抗',
      text: 'クリックごとにボールが拡大します。時間が経つにつれ加速する縮小速度に負けないよう高ケイデンスを維持します。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '平均CPSと最高連打速度の分析',
      text: '終了画面で平均CPS（秒間クリック回数）、5秒ピーク連打速度、疲労耐性スコアを分析します。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/rapid-tapping#step-4'
    }
  ],
};

const guideProps = {
  sources: pickSources('halstead1947', 'todor1980', 'keele1968', 'woods2015'),
  intro: {
    title: 'クリック速度（CPS）の測定原理と科学的背景',
    paragraphs: [
      'CPSテスト（Clicks Per Second）は、1秒間にマウスボタンをクリックできる回数を測定する指標です。1本指による持続的な単独タップは約5〜7 CPSが上限となり、これは健康な成人の利き手人差し指における標準タッピング試験の基準値（10秒あたり約50〜55回）に一致します（Halstead, 1947; Todor & Kyprie, 1980）。これを超える高い数値は1打ごとに意識的な筋指令を出すのではなく、事前プログラムされた運動連鎖（オープンループ制御）として実行されます（Keele, 1968）。',
      '測定精度と表示の量子化について：ブラウザ内の計時はperformance.now()クロックに基づいており、Spectre脆弱性対策として約1ミリ秒に丸められています。またディスプレイはリフレッシュレートに応じて画面を更新します（60Hzで約16.7ms、144Hzで約6.9ms、240Hzで約4.1ms、Woods et al., 2015）。マウスのポーリングレートは125Hzで約8ms、1000Hzで約1msの遅延を生じさせます。そのため約5ms未満の微小な差異は測定ノイズとして扱い、他者の環境と比較するよりも、同一のハードウェア環境における自身の成長記録を重視してください。SkillDrillsはすべての記録をブラウザ内にローカル保存し、外部収集は行いません。',
    ],
  },
  benchmark: {
    title: '連打測定・CPSランク判定表＆公式パーセンタイル基準',
    description: '自身の測定結果を客観的に評価するための公式基準表です。単打基準は神経心理学の運動生理データ（Halstead 1947; Todor & Kyprie 1980）に基づいており、ジッター・バタフライ行は競技ゲーマーの打鍵データに基づきます。瞬間バースト速度と45秒持続CPSを総合評価しています。',
    columns: ['ランク階層', '公式称号', '平均CPS', '瞬間最高CPS (5秒)', '推奨連打技術', '競技評価'],
    rows: [
      {
        tier: 'Tier 1',
        rank: '神速クリッカー (Apex Tapper)',
        stat: '16.0+ CPS',
        level: '20.0+ CPS',
        accuracy: 'バタフライ / ドラッグクリック',
        percentile: '上位0.1% 超人級',
      },
      {
        tier: 'Tier 2',
        rank: 'プロクリッカー (Pro Competitor)',
        stat: '12.0–15.9 CPS',
        level: '15.0–19.0 CPS',
        accuracy: 'ジッタークリック習熟',
        percentile: '上位3% 上級競技者',
      },
      {
        tier: 'Tier 3',
        rank: '一般ゲーマー (Competitive Gamer)',
        stat: '9.0–11.9 CPS',
        level: '11.0–14.0 CPS',
        accuracy: '高速単打 / 緊張連打',
        percentile: '上位15% 熟練',
      },
      {
        tier: 'Tier 4',
        rank: '標準プレイヤー (Proficient Casual)',
        stat: '6.0–8.9 CPS',
        level: '7.5–10.0 CPS',
        accuracy: '通常単打',
        percentile: '上位50% 標準',
      },
      {
        tier: 'Tier 5',
        rank: 'ビギナー (Novice Tapper)',
        stat: '6.0 CPS未満',
        level: '7.5 CPS未満',
        accuracy: '未訓練の単打',
        percentile: '下位20% 基礎訓練推奨',
      },
    ],
  },
  protocols: {
    title: 'クリック速度と連打持久力を高める4大トレーニングプロトコル',
    description: '運動単位の動員速度を高め、腱の弾性を強化し、前腕の筋疲労を最小限に抑える科学的な打鍵練習法です。',
    items: [
      {
        title: 'プロトコル1: ハルステッド運動リズム校正（中手指節関節の脱力ピボット）',
        description: '標準的な人差し指単打では、手首をマウスパッドに軽く固定し、中手指節関節（MCP関節：指の付け根）のみを支点として動かします。前腕の無駄な力みを抜くことで、長時間の連打でもエイムのクロスヘアがブレなくなります。',
      },
      {
        title: 'プロトコル2: トドール・キプリー高周波バースト・インターバル（マイクロレスト緩急走）',
        description: '最大速度での5秒間全力連打と、3秒間のリラックスした巡航連打を交互に繰り返します。この高低差トレーニングにより、神経系が高頻度の運動放電を維持できるようになり、乳酸の蓄積を遅らせることができます。',
      },
      {
        title: 'プロトコル3: 等尺性前腕微小振動（ジッタークリック安定化技術）',
        description: '前腕屈筋群と伸筋群を軽く共収縮させ、腕の微細な震えを手首から人差し指へと伝えます。マウスの底面をマウスパッドに強く押し付けず、センサーの追従性を保ったまま高CPSを維持できるように練習します。',
      },
      {
        title: 'プロトコル4: 運動学的複指交互打鍵（バタフライクリックのドラミング）',
        description: '人差し指と中指を左クリックスイッチの上に水平に配置し、太鼓を叩くように交互にタップします。マウスのデバウンスタイムを最短（0〜4ms）に設定することで、物理スイッチの跳ね返りを活かした最速連打が可能になります。',
      },
    ],
  },
  faqs: {
    title: '連打測定・CPSテスト よくある質問 (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function JapaneseRapidTappingPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <RapidTappingClient />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/rapid-tapping" />
      </div>
    </>
  );
}

