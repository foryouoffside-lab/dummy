import VisualTrackingSpeedTestWrapper from '@/app/drills/reaction-speed/visual-tracking-speed-test/VisualTrackingSpeedTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (reaction-speed / visual-tracking-speed-test)
// PRIMARY DOMESTIC: "動体視力テスト" / "動体視力 トレーニング" / "動体視力 測定"
// SECONDARY / LSI:
//   "視覚追従" / "眼球運動 トレーニング" / "滑動性眼球運動"
//   "サッケード" / "手と目の協調性" / "エイム 反応速度"
// ============================================================

export const metadata = {
  title: '動体視力テスト – 無料オンライン視覚追従＆反応速度測定 | SkillDrills',
  description:
    '無料オンライン動体視力テスト。視野内を移動する標的を目で追い、瞬時にクリックして動体視力と視覚追従速度を測定。滑動性眼球運動と反応速度を強化。',
  keywords: [
    '動体視力テスト',
    '動体視力 トレーニング',
    '動体視力',
    '動体視力 測定',
    '視覚追従',
    '眼球運動 トレーニング',
    '滑動性眼球運動',
    'サッケード',
    '手と目の協調性',
    'エイム 反応速度',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/reaction-speed/visual-tracking-speed-test',
    languages: getAlternateLanguages('/drills/reaction-speed/visual-tracking-speed-test'),
  },
  openGraph: {
    title: '動体視力テスト – 無料オンライン視覚追従＆反応速度測定 | SkillDrills',
    description:
      '無料オンライン動体視力テスト。移動する標的を目で追い、瞬時にクリックして動体視力と視覚追従速度を測定。',
    url: 'https://skilldrills.online/ja/drills/reaction-speed/visual-tracking-speed-test',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '動体視力テスト – 無料オンライン視覚追従＆反応速度測定 | SkillDrills',
    description:
      '無料の動体視力テスト。眼球運動と反射速度を鍛えるオンライントレーニング。',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: 'ドリル一覧', item: 'https://skilldrills.online/ja/drills' },
    { '@type': 'ListItem', position: 3, name: '反応速度', item: 'https://skilldrills.online/ja/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '動体視力テスト', item: 'https://skilldrills.online/ja/drills/reaction-speed/visual-tracking-speed-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '動体視力テスト – オンライン視覚追従測定ツール',
  alternateName: ['動体視力測定アプリ', '視覚追従テスト', '眼球反応測定ドリル'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description:
    '高速移動する標的の軌道を眼球で捉え、急激な方向転換への再捕捉速度をミリ秒単位で測定する動体視力トレーニングツール。',
  browserRequirements: '最新のウェブブラウザ（Chrome, Edge, Safari, Firefox）',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '動体視力テスト — 無料オンライン視覚追従＆反応速度測定 | SkillDrills',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/visual-tracking-speed-test',
  description:
    '無料オンライン動体視力テスト。移動する標的を滑らかに追い、方向変化を瞬時に捉える視覚追従能力を測定します。',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'JavaScript対応の最新ブラウザが必要。',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: '動体視力, 滑動性眼球運動, 補正サッケード, 視覚追従速度, 手と目の協調性',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '動体視力テスト - 視覚追従＆眼球反応ドリル',
  url: 'https://skilldrills.online/ja/drills/reaction-speed/visual-tracking-speed-test',
  description: 'ブラウザで手軽にプレイできる動体視力測定＆反射神経トレーニングゲーム。',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '動体視力および視覚追従速度のトレーニング方法',
  description: '移動ターゲットへの眼球追従性と補正サッケード反応速度を高めるステップ。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'ドリルを開始',
      text: '「ドリル開始」をクリックして全画面の動体視力キャンバスを起動します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/visual-tracking-speed-test#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '移動ターゲットを注視',
      text: '視線の中心（中心窩）を移動する球体に合わせ、滑らかに追従します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/visual-tracking-speed-test#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '急な方向変化を捉えてクリック',
      text: '標的が不意に加速または反射した瞬間に即座に視線を飛ばし、カーソルを標的中心に合わせます。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/visual-tracking-speed-test#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '再捕捉潜時を確認',
      text: '平均再捕捉遅延時間（ミリ秒）と追従安定性スコアを確認して結果を分析します。',
      url: 'https://skilldrills.online/ja/drills/reaction-speed/visual-tracking-speed-test#step-4',
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
      name: '動体視力テストでは何を測定しているのですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '動く対象を目で滑らかに追尾する能力（滑動性眼球運動）と、対象が急に加速や方向転換した際に素早く視線を捉え直す再捕捉遅延時間（ミリ秒）を正確に測定します。',
      },
    },
    {
      '@type': 'Question',
      name: '「滑動性眼球運動」と「サッケード」の違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '滑動性眼球運動（Smooth Pursuit）は一定速度（約30°–60°/秒）で動く対象を中心窩に捉え続ける連続的な眼球の動きです（Krauzlis, 2004）。一方サッケードは、対象が急激に動いた際に200°–700°/秒の高速ジャンプで視線を瞬時に修正する跳躍性眼球運動です（Rashbass, 1961）。',
      },
    },
    {
      '@type': 'Question',
      name: '通常の視力検査（1.0や1.5）で動体視力は分かりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '分かりません。一般的な視力検査は止まっている文字を識別する「静止視力」を測るものです。動く標的を捉える動体視力（DVA）や外眼筋の協調反応は、専用の動的測定が必要です。',
      },
    },
    {
      '@type': 'Question',
      name: '動体視力が低下する主な原因は何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '長時間の画面凝視による外眼筋の疲労、ドライアイ、睡眠不足、および脳中枢の視覚処理機能の疲弊などが主な原因となります。',
      },
    },
    {
      '@type': 'Question',
      name: '動体視力はゲームやスポーツにどのように影響しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '野球、テニス、モータースポーツ、およびVALORANTやApex LegendsなどのFPSにおいて、相手の不規則な動きを視認して照準を瞬時に同期させる決定的なスピードを左右します（Land & McLeod, 2000）。',
      },
    },
    {
      '@type': 'Question',
      name: '動体視力や視覚追従能力はトレーニングで向上しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。反復的な動的追尾トレーニングにより、中側頭視覚野（MT/V5）、前頭眼野（FEF）、小脳間の神経経路が強化され、サッケードの潜時短縮と捕捉精度の向上が得られます。',
      },
    },
    {
      '@type': 'Question',
      name: '補正サッケード（キャッチアップサッケード）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ターゲットが滑動性追従の限界速度を超えて急激に動いたとき、網膜の中心窩から像が外れます。そのズレを瞬時に埋めて標的を視界の中央に戻す反射的な高速眼球運動です（Rashbass, 1961）。',
      },
    },
    {
      '@type': 'Question',
      name: 'モニターのリフレッシュレート（Hz）は測定に影響しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '大きく影響します。60Hzの画面更新間隔は16.7msですが、144Hzでは6.9ms、240Hzでは4.1msに短縮されます（Woods et al., 2015）。高リフレッシュレート環境では残像が消え、軌道変化をより早く認識できます。',
      },
    },
    {
      '@type': 'Question',
      name: '1日にどれくらいトレーニングするのが効果的ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1回3〜5分程度の集中した練習を1日1〜2回行うのが理想的です。眼筋の過労を防ぎながら、神経系の鋭敏さを最適に保つことができます。',
      },
    },
    {
      '@type': 'Question',
      name: 'この動体視力テストは無料で利用できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。SkillDrillsの動体視力テストは完全無料です。ダウンロード不要でブラウザ上で動作し、High Resolution Time API（performance.now()）による精密測定を提供します。',
      },
    },
  ],
};

const visualTrackingGuide = {
  heading: '動体視力テスト解説：滑動性眼球運動と再捕捉メカニズムの科学',
  intro: [
    '動体視力（Dynamic Visual Acuity）は、視野内を高速移動する対象を目で滑らかに追跡し、不意な軌道の変化を感知して視線を瞬時に修正する眼球運動機能の指標です（Krauzlis, 2004; Land & McLeod, 2000）。',
    '本テストは、予測不能なダッシュや反射角の急変に対する視覚運動反応を測定します。標的が滑らかに移動している間は滑動性眼球運動（Smooth Pursuit）が維持されますが、急な進路変更によって追尾が崩れると、脳は瞬時に補正サッケード（Catch-up Saccade）を発動します（Rashbass, 1961）。本システムは performance.now() 高精度クロックにより、標的を再捕捉するまでの時間をミリ秒単位で正確に記録します。',
    '測定精度とハードウェアの影響：すべての測定はブラウザ上でローカルに実行されます。ブラウザタイマーはセキュリティ上約1msに丸められ、モニターの更新間隔（60Hzで約16.7ms、240Hzで約4.1ms；Woods et al., 2015）やマウスのポーリングレートが加わります。そのため5ms未満の微小な差は計測ノイズとして解釈してください。',
    '同一のPC・モニター環境下で継続的に測定し、自身の動体視力と視覚反射の向上傾向を追跡することが推奨されます。',
  ],
  benchmarks: {
    title: '動体視力・再捕捉反応速度ベンチマーク表',
    headers: ['再捕捉反応時間', '眼球運動評価区分', '追従＆サッケード特性', '実戦での優位性', '推奨トレーニング着眼点'],
    rows: [
      ['< 180 ms', '超高速予測捕捉 (Apex / Pro)', '中心窩への瞬時再配置；軌道予測の一致率極大', 'プロレーサー / 戦闘機パイロット / プロゲーマー (Land & McLeod, 2000)', '長時間の連続試技でも視野の緊張を解く練習'],
      ['180 – 230 ms', '高速動的追従 (Elite)', 'サッケード遅延最小限；標的加速への鋭い同調', '上位球技選手 / 高ランクゲーマー (Krauzlis, 2004)', '周辺視野を活用し行き過ぎ（オーバーシュート）を抑滅'],
      ['231 – 290 ms', '標準的正常追従 (Advanced)', '健康な成人の典型的な視覚再捕捉反応速度', '健常成人の基準レベル', '外眼筋の疲労耐性と方向転換のスムーズさ強化'],
      ['291 – 360 ms', '遅延・眼精疲労 (Intermediate)', 'サッケード発動の遅れ；標的の後追いが顕著', '長時間の画面作業、ドライアイ、低コントラスト', '20-20-20ルールの実践と画面リフレッシュ設定の確認'],
      ['> 360 ms', '眼球運動調整期 (Developing)', '標的を捉え直すまでに複数の微小サッケードが発生', '眼球運動の未調整または視覚的散漫', '焦って急ぐより滑らかな軌道一致の習慣化を優先'],
    ],
    note: '本基準は神経眼球運動学文献（Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000）を基に、ウェブ環境の表示遅延（Woods et al., 2015）を考慮して策定された実戦指標です。',
  },
  techniques: {
    title: '動体視力と視覚反応速度を高める実践テクニック',
    items: [
      {
        name: '滑動追従と補正サッケードの使い分け',
        desc: '標的が緩やかに移動している間は滑らかな視線移動を保ち、急激な方向転換が起きた瞬間だけ素早くサッケードを発動します。',
        tips: '標的より先に視線を跳ばそうと焦らず、標的の実際の軌道を見届けましょう。',
      },
      {
        name: '予測注視（Anticipatory Gaze）',
        desc: '標的の真後ろを追うのではなく、標的の進行方向のわずか前方に視線ウィンドウを置くことで、衝突後の迎撃が格段に早くなります。',
        tips: '壁にぶつかる角度を勝手に推測せず、反射後の進路ベクトルを確認してください。',
      },
      {
        name: '手首と前腕の脱力',
        desc: 'マウスを強く握りすぎると微細な調整筋が硬直してしまいます。適度にリラックスした状態を保ちましょう。',
        tips: '試技の合間に手首を軽く回し、深い呼吸を意識してください。',
      },
      {
        name: '視覚環境の最適化',
        desc: '部屋の明暗差を減らして目の疲労を防ぎ、モニターのリフレッシュレートを最高設定にして残像感を低減させます。',
        tips: '高FPS・高Hzモニターを使用すると、動体追尾の正確性が大きく向上します。',
      },
    ],
  },
  steps: [
    '画面から腕の長さ（約50〜70cm）ほど離れた快適な位置に座ります。',
    '「ドリル開始」をクリックし、動き始める球体に視線を合わせます。',
    '球体が一定の速度で移動している間、滑らかに目で追跡します。',
    '標的が急激に方向転換した瞬間、素早くカーソルを標的中心に合わせてクリックします。',
    '制限時間終了後、平均再捕捉時間と追従スコアを確認します。',
  ],
  audience: 'FPS・アクションゲームプレイヤー、球技系スポーツ選手、モータースポーツ選手、および動体視力や反応速度を鍛えたいすべての方。',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('krauzlis2004', 'rashbass1961', 'land2000', 'woods2015'),
  related: [
    { href: '/ja/drills/reaction-speed', label: '反応速度 ハブ' },
    { href: '/ja/drills/reaction-speed/reaction-time-test', label: '反応速度テスト' },
    { href: '/ja/drills/reaction-speed/reflex-training-drill', label: '反射神経ゲーム (瞬間認識ドリル)' },
    { href: '/ja/drills/reaction-speed/reaction-game', label: 'リアクションゲーム' },
  ],
};

export default function JapaneseVisualTrackingSpeedTestPage() {
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
      <VisualTrackingSpeedTestWrapper copy={{ title: '動体視力テスト' }} />
      <DrillGuide guide={visualTrackingGuide} />
    </>
  );
}
