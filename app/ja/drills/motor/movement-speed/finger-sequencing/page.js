import FingerSequencingClient from '@/app/drills/motor/movement-speed/finger-sequencing/FingerSequencingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'シーケンスエイム練習・連続クリック速度測定 – 指先運動制御診断 | SkillDrills',
  description: '番号順に素早くターゲットをクリックするシーケンスエイム練習＆連続クリック速度診断ツール。視覚的順序認識と運動計画、指先と手首の連続打鍵スピードを総合測定。',
  keywords: [
    'シーケンス エイム 練習',
    '連続ターゲット クリック',
    '番号順 クリック テスト',
    'シーケンス クリック',
    'マウス 連続 操作',
    'ターゲット スイッチング 練習',
    '指先 スピード テスト',
    'クリック 速度 測定',
    'エイム 反応速度 テスト',
    'FPS ターゲット切り替え',
    'エイム 精度 トレーニング',
    '運動制御 診断',
  ],
  openGraph: {
    title: 'シーケンスエイム練習・連続クリック速度測定 – 指先運動制御診断 | SkillDrills',
    description: '番号順に素早くターゲットをクリックするシーケンスエイム練習＆連続クリック速度診断ツール。視覚的順序認識と運動計画、指先と手首の連続打鍵スピードを総合測定。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/motor/movement-speed/finger-sequencing',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'シーケンスエイム練習・連続クリック速度測定 – 指先運動制御診断 | SkillDrills',
    description: '番号順に素早くターゲットをクリックするシーケンスエイム練習＆連続クリック速度診断ツール。',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor/movement-speed/finger-sequencing',
    languages: getAlternateLanguages('/drills/motor/movement-speed/finger-sequencing'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: '運動制御トレーニング', item: 'https://skilldrills.online/ja/drills/motor' },
    { '@type': 'ListItem', position: 3, name: '動作速度', item: 'https://skilldrills.online/ja/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'シーケンスエイム練習', item: 'https://skilldrills.online/ja/drills/motor/movement-speed/finger-sequencing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'シーケンスエイム練習・連続クリック速度測定',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description: '無料のブラウザ型シーケンスエイムトレーナー。番号順ターゲット切り替え、軌道最適化、指先の連打と正確性を測定。',
  url: 'https://skilldrills.online/ja/drills/motor/movement-speed/finger-sequencing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'シーケンス エイム トレーナー',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 CanvasおよびJavaScriptのサポートが必要',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  url: 'https://skilldrills.online/ja/drills/motor/movement-speed/finger-sequencing',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'シーケンス エイム トレーナー – 指先スピードテスト',
  url: 'https://skilldrills.online/ja/drills/motor/movement-speed/finger-sequencing',
  description: '連続運動プログラム理論に基づき、指定順序での標的切り替え速度を測定します。',
  genre: ['Aim Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'シーケンスエイムトレーナーとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '画面上に表示された複数のターゲットを、指定された番号順（サイズが大きい順）に正確かつ迅速にクリックしていく運動制御ドリルです。弾道的なフリック操作と視覚的な先読み能力を鍛えます。',
      },
    },
    {
      '@type': 'Question',
      name: 'Apex LegendsやVALORANTなどのFPSでどのような効果がありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '乱戦時や複数ターゲットとの交戦では、敵の位置を瞬時に認識し優先順位に沿って素早くエイムを切り替える（ターゲットスイッチング）必要があります。運動チャンキング（Lashley 1951）により標的間の迷いやオーバーシュートを防ぎます。',
      },
    },
    {
      '@type': 'Question',
      name: '通常のクリック速度（CPS）テストと何が違いますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '単純なCPSテストは静止した1点での連打力を測定するだけです。一方、シーケンスエイムはフィッツの法則（Fitts’s Law）に支配される空間的なカーソル移動、減速制御、正確なクリックタイミングが融合した複合的なトレーニングです。',
      },
    },
    {
      '@type': 'Question',
      name: 'なぜターゲットの大きさが順番に小さくなっていくのですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '実戦の射撃感覚を忠実に再現するためです。最初の大きな標的（胴体）へは高速な大まかなフリックを行い、続く縮小ノード（頭部ヒットボックス）には手首や指先の微小なブレーキと修正を加える開ループ・閉ループ制御を養います。',
      },
    },
    {
      '@type': 'Question',
      name: '最適なマウス感度（センシ）はどれくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '普段プレイしているメインFPSタイトルの実戦センシ（振り向き25cm〜45cm程度を推奨）をそのまま使用してください。一貫した環境で反復することで、運動野の筋肉記憶が本番にそのまま生かされます。',
      },
    },
    {
      '@type': 'Question',
      name: '運動チャンキング（Motor Chunking）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '複数の個別の動作を脳内でひとまとまりの統合プログラムとして処理する神経心理学的プロセスです（Lashley 1951）。ターゲットごとに逐次判断するのではなく、一連の軌道として一括実行することで反応遅延を大幅に削減します。',
      },
    },
    {
      '@type': 'Question',
      name: '1日の理想的な練習時間はどれくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1日10〜15分程度、60秒のインターバルを挟みながら3〜4セット実施するのが最も効果的です。疲労状態で無理に続けるとフォームが崩れ、微細なコントロール精度を損なう原因になります。',
      },
    },
    {
      '@type': 'Question',
      name: 'osu!などの音ゲーにも練習効果はありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、非常に高い転移効果があります。出現するオブジェを視覚的に先読みし、一定のリズムと正確なカーソル位置で順番にタップするスキルはリズムゲームの判定精度と直接直結しています。',
      },
    },
    {
      '@type': 'Question',
      name: '最も正確に測定するための推奨動作環境は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '144Hz以上の高リフレッシュレートモニター、1000Hz以上のポーリングレートのマウス、Windowsの「ポインターの精度を高める（マウス加速）」をOFFにした1:1リニアトラッキング環境が推奨されます。',
      },
    },
    {
      '@type': 'Question',
      name: '精度（Accuracy）はどのように算出されますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '総クリック数に対する、順序通りに命中したノード数の比率で計算されます。空クリックや順序間違いはペナルティとなり、高速レベル進行下で95%以上の精度を保つことが上級者の基準となります。',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'シーケンスエイムと指先速度のトレーニング手順',
  description: '順序付けられたターゲット切り替えと連続クリックを極めるためのステップバイステップガイド。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'ターゲット配置の全体スキャン',
      text: '出現した番号付きノードの位置関係を素早く見渡し、最も効率的な移動ルートを頭の中で描きます。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/finger-sequencing#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '1番ターゲットへの即時着弾',
      text: '最も大きな1番ターゲットへ素早くフリックしてクリックし、タイマーチェーンを作動させます。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/finger-sequencing#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '数字順に淀みなく連続タップ',
      text: '1番から順に流れるようなリズムでターゲット間を移動し、ノード間の滞留時間を最小限に抑えます。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/finger-sequencing#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '指標とレイテンシーの確認',
      text: '結果カードに表示されるノード間遷移速度、完了タイム、精度データを振り返り、弱点を特定します。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/finger-sequencing#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('lashley1951', 'keele1968', 'fitts1954', 'mackenzie1992', 'woods2015'),
  intro: {
    title: 'シーケンスエイム測定の科学的根拠',
    paragraphs: [
      '順序指定エイム（シーケンシング）は、単に最寄りの標的を狙うのではなく、決められた順序でターゲットを捕捉する高次の運動制御です。ノード間の移動時間はフィッツの法則（Fitts, 1954）によって規定され、その順序は事前に運動野にプログラムされた運動単位として実行されます（Lashley, 1951）。',
      'ブラウザ環境における測定特性: performance.now() タイマーおよびモニターのリフレッシュレート（60Hz=16.7ms、240Hz=4.1ms）による時間量子化を受けます。5ms未満の微小なブレは測定ノイズとして扱い、同一のハードウェア環境での自己記録比較を行ってください。',
    ],
  },
  benchmark: {
    title: '運動制御パフォーマンス標準評価（ベンチマーク）',
    description: 'ターゲット間の移行遅延時間（Inter-Tap Latency）、到達レベル、命中精度に基づくスキル基準表です。',
    columns: ['Tier', 'ランク', 'ノード間レイテンシー', '到達レベル', 'チェーン精度', '評価基準'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'エイペックス・シークエンサー (Apex Sequencer)',
        stat: '180 ms未満',
        level: 'レベル 12+',
        accuracy: '98–100%',
        percentile: '上位1%（プロ・エリート級）',
      },
      {
        tier: 'Tier 2',
        rank: 'マスター・タクティシャン (Master Tactician)',
        stat: '180–230 ms',
        level: 'レベル 9–11',
        accuracy: '95–97%',
        percentile: '上位5%（上級マスター）',
      },
      {
        tier: 'Tier 3',
        rank: 'プロフィシェント・オペレーター (Proficient Operator)',
        stat: '230–300 ms',
        level: 'レベル 6–8',
        accuracy: '90–94%',
        percentile: '上位20%（中上級実力者）',
      },
      {
        tier: 'Tier 4',
        rank: 'インターミディエイト・クリッカー (Intermediate Clicker)',
        stat: '300–400 ms',
        level: 'レベル 3–5',
        accuracy: '82–89%',
        percentile: '一般的な平均値',
      },
      {
        tier: 'Tier 5',
        rank: 'ノービス・シークエンサー (Novice Sequencer)',
        stat: '400 ms超過',
        level: 'レベル 1–2',
        accuracy: '82%未満',
        percentile: '初心者レベル',
      },
    ],
  },
  protocols: {
    title: '実践トレーニングプロトコル',
    description: '神経筋の順応とターゲット切り替え速度を最大化する段階別トレーニング。',
    items: [
      {
        title: 'プロトコル 1: 階層的運動チャンキング (Lashley 1951)',
        description: '最初のクリック前に全体配置を把握し、一連のルートを1つの運動プログラムとして脳に定着させます。ターゲットごとの迷いをゼロにします。',
      },
      {
        title: 'プロトコル 2: 開ループ弾道ペーシング (Keele 1968)',
        description: '離れた標的へは視覚的フィードバックを待たずに最高速度でフリックし、境界付近で一気に制動をかけます。',
      },
      {
        title: 'プロトコル 3: 段階的縮小ノードの精密ブレーキ制御',
        description: '標的サイズが小さくなるにつれて減速圧力を細かく調整します。大きな腕の移動から指先・手首の微小修正へスムーズに移行します。',
      },
      {
        title: 'プロトコル 4: コンボリズムのメトロノーム同期',
        description: '一定の規則正しいクリックテンポを維持します。焦ってクリックを急ぐとミス判定と時間ペナルティを招くため、安定したビートが重要です。',
      },
    ],
  },
  faqs: {
    title: 'よくある質問（FAQ）',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function JapaneseFingerSequencingPage() {
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
      <FingerSequencingClient copy={{ title: 'シーケンスエイム練習' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/finger-sequencing" />
      </div>
    </>
  );
}
