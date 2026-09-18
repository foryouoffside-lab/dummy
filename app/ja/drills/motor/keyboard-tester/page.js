import { pickSources } from '@/lib/drillSources';
import KeyboardTesterClient from '@/app/drills/motor/keyboard-tester/KeyboardTesterClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: 'キーボードテスト – オンラインで全キー動作確認・チャタリング検査 | SkillDrills',
  description:
    'ブラウザ上で今すぐ使える無料キーボードテスト。キーの反応・チャタリング（二重入力）・Nキーロールオーバー（同時押し）・故障をインストール不要で即座に診断します。日本語配列（JIS）対応。',
  keywords: [
    'キーボードテスト',
    'キーボード テスト',
    'キーボードテスト 日本語配列',
    'キーボードチェック',
    'キーボードチェッカー',
    'キーボード検査',
    'キーボードテスト オンライン',
    'キーボード 入力 テスト',
    'キーボード チャタリング テスト',
    'キーボード 同時押し テスト',
    'キー入力 確認',
    'ノートパソコン キーボード テスト',
  ],
  openGraph: {
    title: 'キーボードテスト – オンラインで全キー動作確認・チャタリング検査 | SkillDrills',
    description:
      'ブラウザ上で今すぐ使える無料キーボードテスト。キーの反応・チャタリング（二重入力）・Nキーロールオーバー（同時押し）・故障を即座に診断。日本語配列（JIS）対応。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/motor/keyboard-tester',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'キーボードテスト – オンラインで全キー動作確認・チャタリング検査 | SkillDrills',
    description:
      'ブラウザ上で今すぐ使える無料キーボードテスト。キーの反応・チャタリング（二重入力）・Nキーロールオーバー（同時押し）・故障を即座に診断。日本語配列（JIS）対応。',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor/keyboard-tester',
    languages: getAlternateLanguages('/drills/motor/keyboard-tester'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills ホーム', item: 'https://skilldrills.online/ja' },
    {
      '@type': 'ListItem',
      position: 2,
      name: '訓練ハブ',
      item: 'https://skilldrills.online/ja/drills',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'モータートレーニング',
      item: 'https://skilldrills.online/ja/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'キーボードテスト',
      item: 'https://skilldrills.online/ja/drills/motor/keyboard-tester',
    },
    {
      '@type': 'Question',
      name: 'JIS配列（日本語キーボード）の半角/全角キーや無変換・変換キーもテストできますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。JIS日本語レイアウトに完全対応しており、半角/全角、無変換、変換、カタカナ/ひらがなキーも正確に検出・点灯表示します。',
      },
    },
    {
      '@type': 'Question',
      name: 'キーボードテスト中に入力した文字やパスワードが外部に送信される心配はありませんか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '一切ありません。入力イベントはブラウザのローカル環境内でのみ処理され、外部サーバーへの通信や保存は行われません。',
      },
    },
    {
      '@type': 'Question',
      name: 'メカニカル、メンブレン、静電容量無接点方式など全てのキーボードに対応していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。OSが認識する全てのキーボード（USB有線、Bluetooth、無線2.4GHz、ノートPC内蔵）に対応しています。',
      },
    },
    {
      '@type': 'Question',
      name: 'キーボードの応答速度や遅延（レイテンシ）を測定することはできますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'キー押下からブラウザがイベントを受け取るまでのリアルタイムタイムスタンプを表示し、入力遅延の有無を簡易チェックできます。',
      },
    },
    {
      '@type': 'Question',
      name: 'event.codeとevent.keyの違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'event.codeはキーボードの物理的なキー位置を示し、event.keyは実際に生成された文字（日本語入力状態など）を示します。',
      },
    },
    {
      '@type': 'Question',
      name: 'このキーボードテストツールは無料で利用できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '完全無料です。インストールや会員登録も不要で、いつでもブラウザ上ですぐにキーボード診断を行えます。',
      },
    },
  ],
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'オンライン キーボードテスト',
  alternateName: ['キーボードテスト', 'キーボードチェッカー', 'キーボード検査', 'キーボード動作確認'],
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  browserRequirements: '最新ウェブブラウザおよび物理キーボードが必要',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description:
    '無料ブラウザ型キーボードテストツール。キーの入力認識、反応不良、Nキーロールオーバー同時押し、チャタリング（二重入力）をプログラムインストール不要でリアルタイム診断します。日本語配列（JIS）完全対応。',
  url: 'https://skilldrills.online/ja/drills/motor/keyboard-tester',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'ja-JP',
  dateModified: '2026-09-11',
};


const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'キーボードテスト (Keyboard Tester Online)',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description: 'ブラウザ上で動作する無料キーボードテストツール。JIS日本語配列対応、チャタリング検出、同時押し確認。',
  url: 'https://skilldrills.online/ja/drills/motor/keyboard-tester',
  dateModified: '2026-09-11',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' }
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'キーボードテスト & キーロールオーバー確認ツール',
  url: 'https://skilldrills.online/ja/drills/motor/keyboard-tester',
  description: '全キーの動作確認とNキーロールオーバーをブラウザで診断するWebアプリ。',
  dateModified: '2026-09-11',
  gamePlatform: 'Web Browser',
  genre: ['キーボードテスト', 'ユーティリティ', 'ハードウェア診断'],
  playMode: 'SinglePlayer',
  applicationCategory: 'Game',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'オンラインキーボードテストの4つの診断手順',
  description: 'キーの反応確認、チャタリングの検出、同時押しロールオーバーの診断手順。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/ja/drills/motor/keyboard-tester#step-1',
      name: 'キーを1つずつ押して認識を確認する',
      text: 'キーボードのすべてのキーを順番に押します。押下中は青色、正常に入力されると緑色に点灯します。'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/ja/drills/motor/keyboard-tester#step-2',
      name: '複数キーの同時押し（ロールオーバー）をテストする',
      text: 'ゲームで頻繁に使うキー（WASD、Shift、Spaceなど）を同時に押し、キーの取りこぼし（ゴースティング）がないか確認します。'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/ja/drills/motor/keyboard-tester#step-3',
      name: '入力テレメトリ情報（event.code）を照合する',
      text: '画面下部の情報パネルでevent.codeやevent.keyの値を確認し、物理スイッチの不具合や二重入力（チャタリング）を特定します。'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/ja/drills/motor/keyboard-tester#step-4',
      name: '診断結果を確認しリセットする',
      text: '点灯しなかったキーを特定してハードウェア故障の有無を判断し、必要に応じてリセットボタンを押して再テストします。'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'キーボードのキーが正常に反応しているか確認する方法は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本ページの仮想キーボード画面を開き、手元の物理キーを順に押してください。押されたキーがシアン色に点灯し、離した後に緑色で保持されれば、スイッチとOS信号は正常です。何度強く押しても点灯しないキーは、ハードウェアの故障または接触不良が疑われます。',
      },
    },
    {
      '@type': 'Question',
      name: 'キーボードのチャタリング（二重入力）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'チャタリングとは、物理キーを1回しか押していないにもかかわらず、スイッチ内部の金属接点の劣化や汚れによって微小なバウンスが発生し、2回以上連続で入力されてしまう故障現象です。本ツールのイベント確認エリアで、1回の打鍵に対して複数回のキーイベントが受信されていないか確認できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'キーボードの同時押し（ロールオーバー）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ロールオーバーとは、複数のキーを同時に押したときにキーボードが認識できるキーの最大数です。一般的な事務用キーボードは2〜6キーまでしか認識せず、それ以上の同時入力は無視されます（ゴースト現象）。ゲーミングキーボードのNキーロールオーバー（NKRO）対応モデルでは、すべてのキーの同時入力が正しく認識されます。',
      },
    },
    {
      '@type': 'Question',
      name: '一部のキー（Alt+TabやCtrl+Alt+Del）が反応しないのはなぜですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WindowsやmacOSなどのオペレーティングシステム（OS）が優先して捕捉するシステムショートカットは、セキュリティ保護のためブラウザにイベントが渡されません。また、F5（更新）、F11（全画面）、F12（開発ツール）はブラウザ操作を妨げないよう基本動作を保持しています。これらが光らないのは仕様であり故障ではありません。',
      },
    },
  ],
};

const JAPANESE_COPY = {
  title: 'キーボードテスト',
  subtitle: '無料オンライン キーボード動作確認・チャタリング検査 (JIS日本語配列対応)',
  intro:
    'キーボードのすべてのキーを押してテストしてください。入力が認識されたキーはリアルタイムで点灯し、正常に動作したキーは緑色のまま保持されます。何度押しても反応しないキーは、スイッチの故障や接触不良の可能性があります。個人情報の送信や保存は一切行われません。',
  keysConfirmed: '確認済みキー',
  rollover: '同時押し',
  capturing: '検知中',
  paused: '一時停止',
  reset: 'リセット',
  captureNotice:
    'キー入力検知が有効です。ブラウザショートカットは無効化されています（Shift + Esc または検知中ボタンで解除）。',
  lastKeyEvent: '最新キーイベント',
  eventCode: 'event.code (物理位置)',
  eventKey: 'event.key (入力文字)',
  keyCode: 'keyCode',
  location: 'location',
  autoRepeat: '連続入力 (Repeat)',
  yes: 'はい',
  no: 'いいえ',
  space: '(スペース)',
  pressAnyKey: 'キーを押すと、ブラウザが受信した詳細データが表示されます。',
  keysNotOnLayout: '標準レイアウト外のキー',
  notYetConfirmed: '未確認のキー',
  allConfirmed: 'レイアウト上のすべてのキーが正常に認識されました。キーボードは正常に動作しています。',
  untestedSingular: '個のキーが未確認です。しっかりと押しても反応しないキーがある場合は詳細を点検してください。',
  untestedPlural: '個のキーが未確認です。しっかりと押しても反応しないキーがある場合は詳細を点検してください。',
  mobileWarning:
    'このテストには物理キーボードが必要です。デスクトップPCまたはノートパソコンで開くか、外部キーボードを接続してください。',
  howTitle: 'キーボードテストの使い方',
  howStep1: 'キーボードのキーを左上から順に1つずつ押していきます。',
  howStep2: '押している間はシアン色に点灯し、入力が確認されると緑色に変わります。',
  howStep3: '「未確認のキー」リストが空になるまで全キーを押して確認します。',
  howStep4: '複数のキーを同時に長押しすると、最大同時押し数（ロールオーバー）を測定できます。',
  rolloverTitle: '同時押し（ロールオーバー）とゴースト',
  rolloverP1:
    'ロールオーバーとは、キーボードが同時に認識できるキーの最大数です。一般的なメンブレン式キーボードでは2〜6キー程度で制限され、それ以上のキー入力が無視される現象を「ゴースト」と呼びます。全キー同時押し（NKRO）対応キーボードではすべてのキーが同時に認識されます。',
  rolloverP2:
    'いくつかのキーを同時に長押しし、上記の「同時押し」の数値を確認してください。3〜4キーで止まる場合はキーボードハードウェアの仕様制限です。',
  limitsTitle: 'ブラウザテストの制限事項について',
  limitsP1:
    'このテストはウェブブラウザが受信した最終信号を判定しています。スイッチ、基板、ケーブル、OSドライバのどこかで信号が遮断された場合、ブラウザには届きません。',
  limitsP2:
    'OSが占有するショートカットキー（Alt+Tab、Ctrl+Alt+Deleteなど）はブラウザに届かないのが正常です。また、F5（更新）、F11（全画面）、F12（開発ツール）はブラウザの基本操作保護のためそのまま通過します。これらが光らないのは仕様であり故障ではありません。',
};

const guideProps = {
  intro: {
    title: "キーボードテストツールが実際に検証する内容",
    sources: pickSources('woods2015'),
    paragraphs: [
      "キーボードテストツールは、各物理キーがOSおよびブラウザに正しい入力シグナルを送信しているかを検証します。キーを押下してもブラウザ側でキーコードが受信されない場合、そのキーはハードウェアまたはファームウェア的に認識されていません。",
      "キースイッチ、基板コントローラー、接続ケーブル、OSドライバーに至る入力経路の末端を確実に検出し、キー故障やチャタリングの有無を診断します。",
    ],
  },
  benchmarks: {
    title: 'キーボード・ロールオーバーおよび性能グレード基準',
    caption: 'マトリクス走査方式、スイッチデバウンス、USBポーリングレートに基づくハードウェア性能基準です。データはブラウザ内でのみ処理されます。',
    headers: ['段階 (Tier)', 'ハードウェア構造', '同時押し(Rollover)上限', 'アンチゴーストマトリクス', '標準スイッチ遅延', '診断・ゲーミング適性'],
    rows: [
      [
        'Tier 1',
        '完全Nキーロールオーバー NKRO (磁気ホール素子 / 光学式)',
        '真のN-Key (> 50キー同時)',
        'キー毎の独立ダイオード配線; ゴースト皆無',
        '1.0 ms未満 (8000 Hz / 1000 Hz ポーリング)',
        '競技プロ水準: ラピッドトリガー完全対応、同時入力抜けゼロ、チャタリングの物理的排除。',
      ],
      [
        'Tier 2',
        '6KRO / 10KRO メカニカルキーボード (機械式軸)',
        '6〜10キー同時認識',
        '主要アルファベットおよび装飾キーの分離設計',
        '2.0–5.0 ms (1000 Hz ポーリング, 接点デバウンス)',
        'ゲーミング標準: 複雑な移動キーとアクションキーの同時押しでも確実に入力を維持。',
      ],
      [
        'Tier 3',
        '最適化ゲーミングマトリクス (ハイブリッドメンブレン)',
        '4〜6キー同時認識 (WASD周辺)',
        '主要ゲームキー周辺のクラスターアンチゴースト',
        '8.0–15.0 ms (125–500 Hz ポーリング)',
        '標準ホビー用途: FPSの基本移動は問題ないが、遠隔キーとの同時押しで遮断が発生する場合あり。',
      ],
      [
        'Tier 4',
        '標準オフィスメンブレン (一般メンブレン)',
        '2〜3キー同時認識 (2KRO)',
        '回路共有マトリクス; 高頻度のゴースト遮断',
        '15.0–30.0 ms (125 Hz USB ポーリング)',
        '一般事務用途: 3キー以上の素早い同時打鍵でキー抜けや未入力キーの誤発動が発生。',
      ],
      [
        'Tier 5',
        'スイッチ故障 / チャタリング (接点劣化・異物混入)',
        '断続的認識不良 / 特定キー無反応',
        '接点酸化、バネ疲労、基板パターンの断線・腐食',
        '不規則な二重バウンス (> 35 ms ジッター)',
        'ハードウェア異常: 1回押下で2回文字が出るチャタリング、押したまま戻らないキー固着。',
      ],
    ],
  },
  faqs: {
    title: 'よくある質問 (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function JapaneseKeyboardTesterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <KeyboardTesterClient copy={JAPANESE_COPY} defaultLayout="jis" />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/keyboard-tester" />
      </div>
    </>
  );
}
