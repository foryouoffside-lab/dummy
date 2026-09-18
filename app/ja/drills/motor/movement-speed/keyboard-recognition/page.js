import KeyboardRecognitionClient from '@/app/drills/motor/movement-speed/keyboard-recognition/KeyboardRecognitionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'キーボード練習 – ブラインドタッチと打鍵反応速度テスト | SkillDrills',
  description: '無料のオンラインキーボード練習ツール。画面のプロンプトに合わせて手元を見ずに打鍵し、キーボード配列の把握力、ブラインドタッチ、打鍵反応速度を測定・訓練。登録不要で即プレイ。',
  keywords: [
    'キーボード練習',
    'ブラインドタッチ 練習',
    'キーボード配列',
    'キーボード練習 無料',
    'キーバインド 練習',
    'キーボード 反応速度 テスト',
    '打鍵 速度 測定',
    'キー 反応速度',
    'ゲーミング キーバインド',
    '選択反応時間 テスト',
    'タイピング 反応速度',
    '指先 運動制御',
  ],
  openGraph: {
    title: 'キーボード練習 – ブラインドタッチと打鍵反応速度テスト | SkillDrills',
    description: '無料のオンラインキーボード練習ツール。画面のプロンプトに合わせて手元を見ずに打鍵し、キーボード配列の把握力、ブラインドタッチ、打鍵反応速度を測定・訓練。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/motor/movement-speed/keyboard-recognition',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'キーボード練習 – ブラインドタッチと打鍵反応速度テスト | SkillDrills',
    description: '無料のオンラインキーボード練習ツール。画面のプロンプトに合わせて手元を見ずに打鍵。',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor/movement-speed/keyboard-recognition',
    languages: getAlternateLanguages('/drills/motor/movement-speed/keyboard-recognition'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: '運動制御トレーニング', item: 'https://skilldrills.online/ja/drills/motor' },
    { '@type': 'ListItem', position: 3, name: '動作速度', item: 'https://skilldrills.online/ja/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'キーボード練習', item: 'https://skilldrills.online/ja/drills/motor/movement-speed/keyboard-recognition' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'キーボード練習 – ブラインドタッチと打鍵反応速度テスト',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description: 'ブラウザで動作する無料のキーボード反応速度測定・キーバインド練習ツール。選択反応時間（Choice RT）、空間認識、誤打鍵抑制能力を測定。',
  url: 'https://skilldrills.online/ja/drills/motor/movement-speed/keyboard-recognition',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'キーボード練習ツール',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 CanvasおよびJavaScriptのサポートが必要',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  url: 'https://skilldrills.online/ja/drills/motor/movement-speed/keyboard-recognition',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'キーボード練習 – キーバインド反応速度テスト',
  url: 'https://skilldrills.online/ja/drills/motor/movement-speed/keyboard-recognition',
  description: 'ヒックの法則に基づき、プロンプトに対応する選択打鍵反応速度を測定します。',
  genre: ['Keyboard Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'キーボード反応速度テストとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '画面に表示されたキーのプロンプトを視認してから、手元の対応する物理キーを押し切るまでの所要時間（遅延）をミリ秒単位で測定するツールです。キーボード配列の把握力、選択反応速度、誤打鍵の抑制能力を総合診断します。',
      },
    },
    {
      '@type': 'Question',
      name: 'FPSなどのゲームでキーバインド練習が重要な理由は何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Apex LegendsやVALORANTなどの対戦シューターでは、射撃中のアビリティ発動や武器切り替えを手元を見ずに瞬時に行う必要があります。運動野の筋肉記憶を鍛えることで、乱戦時の迷いや誤打鍵をなくせます。',
      },
    },
    {
      '@type': 'Question',
      name: '選択反応時間（Choice RT）とヒックの法則とは？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ヒックの法則（Hick 1952）によれば、選択肢の数が増えるほど反応時間は対数的に長くなります。キーバインドの反復練習によって判断プロセスが自動化され、単純反射に近い速度まで短縮されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'トラップ（偽プロンプト）機能は何を訓練するものですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ローガン（Logan 1984）の停止信号課題に基づく運動抑制能力の訓練です。偽の指令に対して反射的にキーを押してしまうのを前頭葉で抑制し、冷静な入力判断力を養成します。',
      },
    },
    {
      '@type': 'Question',
      name: 'ゲーマーの平均的な単一キー反応速度はどれくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '一般的なPCユーザーの選択反応速度は380〜480ミリ秒程度ですが、訓練されたゲーマーは240〜300ミリ秒を記録します。プロ層は240ミリ秒未満を維持します。',
      },
    },
    {
      '@type': 'Question',
      name: 'シーケンス打鍵モードのメリットは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '3〜5個の連続キーを素早く入力するモードで、ワーキングメモリと運動チャンキングを鍛えます。各キーを個別に入力するのではなく、一連の流れとして一括処理する脳の回路を活性化します。',
      },
    },
    {
      '@type': 'Question',
      name: '正確なテストに適した推奨キーボードは？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'リニアタイプのメカニカルスイッチ、光学式、または磁気ホールエフェクトスイッチ（ラピッドトリガー対応）を搭載し、1000Hz以上のUSBポーリングレートを持つモデルが最適です。',
      },
    },
    {
      '@type': 'Question',
      name: '1日の推奨トレーニング時間はどれくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1日10〜15分程度、休憩を挟みながら3〜4セット行うのが効果的です。精神的な疲労が溜まると抑制能力が落ちて誤入力が増えるため、短時間集中が推奨されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'MOBAや格闘ゲームなど他のジャンルにも効果はありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。LoLのスキルコンボや格闘ゲームのコマンド入力など、手元を見ずに正確なキーを打鍵する全てのゲームにおいて即座に恩恵があります。',
      },
    },
    {
      '@type': 'Question',
      name: 'KPM（1分間あたりのキー数）と正確度はどう計算されますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KPMは有効な正打数を分単位の経過時間で割った値です。正確度はミス打鍵やトラップ失敗を含む全打鍵数に対する正しい打鍵の割合（％）です。',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'キーボード反応速度とキーバインド反射のトレーニング方法',
  description: 'キーボードの打鍵速度、手元を見ないブラインド操作、および反応抑制力を高める手順。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'ホームポジションの確保',
      text: '左手を普段のゲーム基本ポジション（WASDなど）に軽く置き、指先を各キートップに待機させます。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/keyboard-recognition#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'プロンプトの視覚的認識',
      text: '手元を見ずに画面中央の表示を注視し、出現したキーの文字を瞬間的に認識します。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/keyboard-recognition#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '弾道的打鍵またはブレーキ制動',
      text: '指示されたキーを素早く底まで押し込みます。偽のトラップが表示された場合は指先を直前で静止させます。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/keyboard-recognition#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '反応時間とKPMのスコア診断',
      text: '終了画面で単一キー反応時間、打鍵速度KPM、トラップ抑制精度を確認し、自分の弱点を把握します。',
      url: 'https://skilldrills.online/ja/drills/motor/movement-speed/keyboard-recognition#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'hick1952', 'logan1984', 'sternberg1966', 'woods2015'),
  intro: {
    title: 'キーボード反応速度測定の科学的根拠',
    paragraphs: [
      'キーボード打鍵速度はドンデルス（1868）の選択反応時間理論およびヒック（1952）の選択肢対数法則に基づきます。視覚刺激の受容から運動野への指令伝達には約200〜250msを要しますが、反復練習によって刺激と運動の結合が自動化され、思考による遅延が排除されます。',
      'ブラウザ環境における注意点: performance.now() タイマーやモニターの垂直同期（60Hz=16.7ms、240Hz=4.1ms）による時間量子化を受けます。5ms未満のブレは測定誤差として扱い、同一環境での成長を比較してください。',
    ],
  },
  benchmark: {
    title: 'キーボード打鍵速度＆キーバインド反応ベンチマーク',
    description: '単一キー選択反応時間、シーケンス分間打鍵数（KPM）、トラップ抑制精度に基づく総合評価基準です。',
    columns: ['ランク帯', '呼称', '単一キー反応速度', 'シーケンス打鍵速度', '誤打鍵抑制率', '評価レベル'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Keybinder',
        stat: '240 ms未満',
        level: '320+ KPM',
        accuracy: '98–100%',
        percentile: '上位1%（プロ級マッスルメモリー）',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Tactician',
        stat: '240–300 ms',
        level: '260–319 KPM',
        accuracy: '95–97%',
        percentile: '上位5%（上級オペレーター）',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Operator',
        stat: '300–380 ms',
        level: '200–259 KPM',
        accuracy: '90–94%',
        percentile: '上位20%（実力派ゲーマー）',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Typist',
        stat: '380–480 ms',
        level: '140–199 KPM',
        accuracy: '80–89%',
        percentile: '一般的な平均値',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Keybinder',
        stat: '480 ms超過',
        level: '140 KPM未満',
        accuracy: '80%未満',
        percentile: 'ビギナー水準',
      },
    ],
  },
  protocols: {
    title: '打鍵スピード向上トレーニングプロトコル',
    description: '皮質脊髄路の伝達効率を高め、判断遅延を圧縮するための実践手法。',
    items: [
      {
        title: 'プロトコル 1: 視線固定ブラインド打鍵 (Donders 1868)',
        description: '手元を見ずに画面中央だけを見つめ、固有感覚のみを頼りに目的キーを打鍵します。目視確認の遅れを排除します。',
      },
      {
        title: 'プロトコル 2: キー配置の機能的ゾーン化 (Hick 1952)',
        description: 'キーボードを移動系（WASD）、アビリティ系（QECX）、数字列（1〜4）などのゾーンに脳内で分類し、選択肢を整理します。',
      },
      {
        title: 'プロトコル 3: トラップ停止信号の抑制制御 (Logan 1984)',
        description: '偽のプロンプトが現れた瞬間に、指の押し込み動作を脳の前頭前野で即座にキャンセルする訓練を重ねます。',
      },
      {
        title: 'プロトコル 4: 連続シーケンスのチャンキング (Sternberg 1966)',
        description: '複数キーの連続入力を個別の打鍵として認識せず、1つの統合された指の波としてまとめて実行します。',
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

export default function JapaneseKeyboardRecognitionPage() {
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
      <KeyboardRecognitionClient />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/keyboard-recognition" />
      </div>
    </>
  );
}
