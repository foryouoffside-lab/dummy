import DragAndDropClient from '@/app/drills/motor/hand-eye-coordination/drag-and-drop/DragAndDropClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'ドラッグ・ドロップ練習 – マウス操作精度測定ツール | SkillDrills',
  description: 'ブラウザでできる無料のドラッグ＆ドロップ練習・マウストレーニングツール。ターゲットの長押し掴み、高速ドラッグ移動、目標枠への正確なドロップ精度と所要時間をミリ秒単位で測定診断。',
  keywords: [
    'ドラッグ アンド ドロップ 練習',
    'マウス ドラッグ 練習',
    'ドラッグ 操作 テスト',
    'マウストレーナー',
    'マウス 操作 練習',
    'ドラッグ 精度 テスト',
    'マウス 手首 練習',
    'ドラッグ ドロップ ゲーム',
    'UI 操作 練習',
    'マウス 練習 ツール',
    'マウス 制御 トレーニング',
    'エイム 減速 練習',
  ],
  openGraph: {
    title: 'ドラッグ・ドロップ練習 – マウス操作精度測定ツール | SkillDrills',
    description: 'ブラウザでできる無料のドラッグ＆ドロップ練習・マウストレーニングツール。ターゲットの長押し掴み、高速ドラッグ移動、目標枠への正確なドロップ精度と所要時間をミリ秒単位で測定診断。',
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/drag-and-drop',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ドラッグ・ドロップ練習 – マウス操作精度測定ツール | SkillDrills',
    description: 'ブラウザでできる無料のドラッグ＆ドロップ練習・マウストレーニングツール。ターゲットの長押し掴み、高速ドラッグ移動、目標枠への正確なドロップ精度と所要時間をミリ秒単位で測定診断。',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/drag-and-drop',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/drag-and-drop'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'SkillDrills トップ',
      item: 'https://skilldrills.online/ja',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '運動神経トレーニング',
      item: 'https://skilldrills.online/ja/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '手と目の協調性',
      item: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'ドラッグ＆ドロップ練習',
      item: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/drag-and-drop',
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ドラッグ＆ドロップ練習・マウス精度測定ツール',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description: 'ブラウザ上で即座に実行できるドラッグ＆ドロップ精度測定ツール。アコット・チャイ操縦則に基づく減速・放出制御診断。',
  url: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/drag-and-drop',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ドラッグ＆ドロップマウストレーナー',
  browserRequirements: 'HTML5 CanvasおよびJavaScript対応ブラウザ',
  url: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/drag-and-drop',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'ドラッグ＆ドロップマウストレーニングゲーム',
  url: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/drag-and-drop',
  description: 'オブジェクトを長押しして素早く運び、移動目標枠に正確に落とすマウススキル向上ゲーム。',
  genre: ['精度ゲーム', 'アクション', 'eスポーツトレーニング'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-16',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'ドラッグ＆ドロップ練習（Drag and Drop Test）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ターゲットを掴んで移動させる搬送動作、目標付近での減速コントロール、そして適切な瞬間に指を離すリリースタイミングを総合的に評価・強化する運動ドリルです。',
      },
    },
    {
      '@type': 'Question',
      name: '通常のマウスクリックとドラッグ操作の運動学的な違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '通常クリックは瞬時の一打点運動ですが、ドラッグ操作は人差し指の等尺性筋緊張を維持したまま、手首と前腕を協調させてカーソルを誘導する持続的な運動制御が要求されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'マッケンジーらの研究（MacKenzie et al., 1991）におけるドラッグの知見は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ドラッグ操作はターゲットをクリックして選択する動作よりも運動時間が大幅に長くなり、スループットが15〜25％低下することが証明されています。押し込みによる摩擦増加が主な原因です。',
      },
    },
    {
      '@type': 'Question',
      name: 'アコットとチャイの操縦の法則（Accot & Zhai, 1997）とは？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '限られた幅のトンネル内をポインターが通過する際の所要時間を定式化した法則です。ドラッグ搬送において軌道を外れないよう絶え間なく視覚フィードバックを行うプロセスに一致します。',
      },
    },
    {
      '@type': 'Question',
      name: 'ドラッグ操作の速度と精度を高めるためのフォームは？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'スイッチを押す指の力を最小限にとどめ、手首や前腕の脱力を意識します。過度に力を入れるとパッドとの摩擦が増加し、微細なエイム制御が乱れます。',
      },
    },
    {
      '@type': 'Question',
      name: 'ドロップ目標ゾーンに正確に入れるためのタイミングは？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '動くターゲット枠の中心に入る直前（約30〜50ミリ秒前）に前腕の拮抗筋で減速ブレーキをかけ、枠の中心軸上で滑らかにボタンを離します。',
      },
    },
    {
      '@type': 'Question',
      name: 'このトレーニングはどのようなゲームや作業に役立ちますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RTSやMOBAにおけるユニットの範囲指定枠操作、バトロワFPS（Apex Legends等）での高速デスボックス漁りやアーマースワップ、動画編集ソフトのタイムライン操作に直結します。',
      },
    },
    {
      '@type': 'Question',
      name: 'レベル上昇に伴いどのような難易度変化が発生しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'オブジェクトおよび受け皿スロットのサイズが縮小し、スロットの移動速度が高速化します。同時に許容搬送時間が短縮されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'マウスハードウェアやマウスパッドの推奨設定は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Windowsの「ポインターの精度を高める」を無効化し、800〜1600 DPI、1000Hz以上のポーリングレート、適度な摩擦感を持つ布製コントロールパッドが最適です。',
      },
    },
    {
      '@type': 'Question',
      name: 'スマートフォンやタブレットのタッチ操作でも有効ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'タッチ画面でも指先搬送とリリースタイミングの練習は可能ですが、マウスのメカニカルスイッチ押下と摩擦制御を想定したPCデスクトップ環境で最大の効果が得られます。',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'ドラッグ＆ドロップマウス操作精度トレーニング',
  description: 'マウスポインターの減速制御、搬送軌道の最適化、リリースタイミング習得のための4ステップ。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'オブジェクトの確実なホバーと把持',
      text: '出現したオブジェクトの中心に素早くカーソルを合わせ、マウス左ボタンをしっかり押し込んで掴みます。',
      url: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/drag-and-drop#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '滑らかな軌道での高速ドラッグ移動',
      text: 'ボタンを押した状態を保ちながら、目標のドロップスロットに向けて最短直線距離でカーソルを動かします。',
      url: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/drag-and-drop#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '目標枠内での精密なアライメント',
      text: 'ドロップゾーンの境界内にオブジェクトが完全に重なるよう、手首の微小筋で位置を微調整します。',
      url: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/drag-and-drop#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '正確なリリースクリック',
      text: '目標枠内で確実にボタンを離し、ミリ秒単位の搬送完了時間と高スコアを獲得します。',
      url: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/drag-and-drop#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'mackenzie1991', 'fitts1954', 'elliott2010', 'woods2015'),
  intro: {
    title: 'ドラッグ、操縦軌道および感覚運動減速の生体力学的原理',
    paragraphs: [
      'ヒューマンコンピュータインタラクション（HCI）において、継続的なドラッグ＆ドロップ操作は単なるポイント＆クリック操作とは神経運動学的に根本から異なります。離散的なポインティング動作がフィッツの法則（Fitts, 1954）に支配されるのに対し、ドラッグは人差し指の屈筋による等尺性筋収縮を維持したまま、マウスパッド上で腕と手首の多軸並進運動を精密に同期させる必要があります。',
      'MacKenzie, Sellen, Buxton（1991）の代表的な実証実験では、ドラッグ作業は単純なポインティングと比較して情報処理スループットが15〜25%本質的に低下することが示されました。スイッチを押し続ける下向きの荷重がマウスソールとパッド間の動摩擦係数を変化させ、微細な指の関節運動を拘束して神経運動ノイズを増大させるためです。',
      'さらにJohnny AccotとShumin Zhai（1997）は、軌道拘束下での運動能力を数学的に記述する「操縦の法則（Steering Law）」を打ち立てました。動的なドラッグ課題においてユーザーは、前進推進の勢いと移動する目標枠内での確実な減速制動（Elliott et al., 2010）を常に調和させ、オーバーシュートを防ぐ必要があります。',
      'ブラウザ計測の分解能と前提条件：時間の測定にはブラウザのperformance.now()高精度クロックが使用されます。ディスプレイのリフレッシュレート（60Hzで約16.7ms、144Hzで約6.9ms）やポーリングレートによる時間量子化が存在します（Woods et al., 2015）。SkillDrillsはスコアをブラウザ内にのみ保存し外部収集を行わないため、同一環境での自己記録推移の把握に最適です。',
    ],
  },
  benchmarks: {
    title: 'ドラッグ精度と減速制動の標準ベンチマーク',
    caption: 'Accot & Zhai（1997）の操縦モデルおよびMacKenzie et al.（1991）の比較研究に基づく評価基準。SkillDrillsは外部集計を行いません。',
    headers: ['段階 (Tier)', '分類・評価ランク', '到達レベル・コンボ', '平均搬送時間', 'ドロップ成功率', '神経運動プロファイル'],
    rows: [
      [
        'Tier 1',
        'エリート / プロ水準',
        'Lv. 12–15 (コンボ > 18回)',
        '< 420 ms',
        '≥ 98.0%',
        '滑らかな釣り鐘型速度分布、理想的な拮抗筋制動、高速下でのフライング放出エラー皆無。',
      ],
      [
        'Tier 2',
        '上級 / 競技プレイヤー',
        'Lv. 9–11 (コンボ 12–17回)',
        '420–510 ms',
        '94.0%–97.9%',
        '安定した減速コントロール、タイトな軌道保持、終末期の微小修正時間は35ms未満。',
      ],
      [
        'Tier 3',
        '中級 / 一般実力派',
        'Lv. 6–8 (コンボ 7–11回)',
        '511–640 ms',
        '87.0%–93.9%',
        '加速期にわずかな軌道オーバーシュート、目標枠侵入直前に一時的な速度低下が見られる。',
      ],
      [
        'Tier 4',
        '初級 / 基礎育成段階',
        'Lv. 3–5 (コンボ 3–6回)',
        '641–800 ms',
        '78.0%–86.9%',
        '断続的な多段階衝動操作、過度な握り込みによるパッド引っ掛かりと枠外ドロップが発生。',
      ],
      [
        'Tier 5',
        '入門 / ビギナー',
        'Lv. 1–2 (コンボ < 3回)',
        '> 800 ms',
        '< 78.0%',
        '搬送速度の遅延、枠外での誤ったリリース頻発、長押し維持による前腕筋の早期疲労。',
      ],
    ],
  },
  protocols: {
    title: 'マウス操作精度を高める4大トレーニングプロトコル',
    items: [
      {
        title: 'プロトコル1: 等尺性スイッチ保持力の適正化（レベル1–4）',
        description: 'マウス移動中、スイッチが切れない最小限の力で押し続ける脱力感覚を養います。過剰な握力は手首屈筋を硬直させ、高周波の筋震戦（ブレ）を引き起こします。',
      },
      {
        title: 'プロトコル2: アコット・チャイ操縦トンネルの直線化（レベル5–8）',
        description: 'オブジェクトのピックアップ座標と目標枠の中心を結ぶ仮想の直線トンネルをイメージし、横方向のカーブや蛇行修正を排除して最短時間での搬送を目指します。',
      },
      {
        title: 'プロトコル3: 拮抗筋減速制動とリリースタイミング（レベル9–12）',
        description: '移動枠へ突入する約50ms前に前腕伸筋群を意識的に作動させ、勢いを殺しながら枠の中心軸に重なった瞬間ピンポイントでボタンを離します。',
      },
      {
        title: 'プロトコル4: 動的リード角による未来位置捕捉（レベル13–15）',
        description: '高速移動する目標枠の現在位置ではなく、数ミリ秒後の予測到達点に向けてカーソルを先行させ、枠の運動ベクトルに合わせて滑らかにドロップします。',
      },
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

const copyJa = {
  title: "ドラッグ・ドロップ練習 – マウス操作精度測定ツール",
  subtitle: "空間ドラッグ＆ドロップ照準・15段階レベル進行",
  startButtonText: "訓練開始",
  playAgainText: "もう一度挑戦",
  shareText: "スコアを共有",
  exitText: "終了",
  accuracyLabel: "精度",
  targetDropsLabel: "ターゲット投入",
  maxComboLabel: "最大コンボ",
  peakLevelLabel: "到達レベル",
  rulesTitle: "操作方法・スコア獲得ルール",
  rulesItems: [
    { num: "1", text: "ターゲット投入", highlight: "+100点 × コンボ", result: "ボールをドラッグして動く枠内にリリース" },
    { num: "2", text: "連続コンボ", highlight: "最大3.0倍倍率", result: "連続投入成功でボーナス倍率獲得" },
    { num: "3", text: "レベル難易度進行", highlight: "250点毎に+1レベル", result: "容器の縮小と移動速度の上昇" },
    { num: "4", text: "ミス・時間切れ", highlight: "コンボリセット", result: "枠外へのドロップで倍率リセット" }
  ],
};

export default function DragAndDropPage() {
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
      <DragAndDropClient copy={copyJa} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="motor"
          currentHref="/drills/motor/hand-eye-coordination/drag-and-drop"
          locale="ja"
        />
      </div>
      <DrillFooter />
    </>
  );
}
