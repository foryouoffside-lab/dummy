import SineWavePursuitClient from '@/app/drills/visual-tracking/sine-wave-pursuit/SineWavePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// JAPANESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "サイン波 眼球運動" (Sine wave eye movement) / "波形 エイム 練習"
// Secondary:    "正弦波 追従 訓練", "滑動性追従眼球運動", "動体視力 上下運動", "位相遅れ 改善"
// LSI / Domain:  "ゼロ位相遅れ", "小脳 内部周期モデル", "折り返し速度勾配",
//               "調和オシレーション", "補正サッケード 抑制", "速度ゲイン 1.0"
// Authentic Domain Terms: サイン波追従（Sine Wave Pursuit）, 滑動性追従眼球運動（Smooth Pursuit Eye Movement）, 調和オシレーション（Harmonic Oscillation）, 位相遅れ（Phase Lag）, 追従利得（Pursuit Gain）, 補正サッケード（Catch-up Saccade）
// ============================================================

export const metadata = {
  title: "サイン波眼球運動トレーニング・波形追従 – 正弦波パシュート | SkillDrills",
  description: "水平および垂直の正弦波（サイン波）周期オシレーションに沿って滑らかに視線を走らせる無料アイトラッキング練習。折り返し地点の加減速制御と位相遅れ（ラグ）ゼロ化を鍛える。登録不要。",
  keywords: [
    "サイン波 眼球運動",
    "波形 エイム 練習",
    "正弦波 追従 訓練",
    "滑動性追従眼球運動",
    "動体視力 上下運動",
    "位相遅れ 改善",
    "ゼロ位相遅れ",
    "小脳 内部周期モデル",
    "折り返し速度勾配",
    "調和オシレーション",
    "補正サッケード 抑制",
    "正弦波 追従性眼球運動 練習"
  ],
  openGraph: {
    title: "サイン波眼球運動トレーニング・波形追従 – 正弦波パシュート | SkillDrills",
    description: "水平・垂直の正弦波運動に視線を同期させ、周期的な加減速と方向転換を滑らかに追従する無料オンラインビジョントレーニング。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual-tracking/sine-wave-pursuit",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "サイン波眼球運動トレーニング・波形追従 – 正弦波パシュート | SkillDrills",
    description: "正弦波の周期運動に小脳を同期させ、追従遅延（位相ラグ）をゼロに抑え込む科学的アイトラッキングドリル。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/sine-wave-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/sine-wave-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "視覚追従・アイトラッキング", "item": "https://skilldrills.online/ja/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "サイン波眼球運動トレーニング・波形追従エイムテスト", "item": "https://skilldrills.online/ja/drills/visual-tracking/sine-wave-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "サイン波眼球運動トレーニング・波形追従エイムテスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "正弦波オシレーション（調和波形運動）の加減速変化に視線を同調させ、折り返し時の不連続サッケードを排除して追従利得1.0を維持するブラウザアイトラッキングツール。",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/sine-wave-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/ja" },
  "inLanguage": "ja",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "サイン波パシュートトラッカー (SkillDrills Sine Wave Pursuit)",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応ブラウザ（Chrome, Edge, Firefox, Safari）",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/ja/drills/visual-tracking/sine-wave-pursuit",
  "inLanguage": "ja",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "サイン波追従エイムトレーニング (Sine Wave Pursuit)",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/sine-wave-pursuit",
  "description": "波打つ軌道を描いて飛び回るターゲットに対し、減速と加速の変曲点を完全に読み切ってクロスヘアを吸い付かせるFPSエイム訓練ゲーム。",
  "genre": ["Aim Trainer", "Eye Tracking", "Vision Training", "Esports Drill"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "サイン波眼球運動および波形追従エイムの訓練手順",
  "description": "周期的サイン波運動に対してゼロ位相遅れを実現し、滑動性追従利得を最大化する4段階のプロトコル。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "基本周期と振幅のキャリブレーション",
      "text": "標準速度（1.0x）で開始し、サイン波ターゲットの周期（1往復の時間）と上下または左右の最大振幅を目で把握します。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "中心通過時の最高速度に視線を同期",
      "text": "正弦波のゼロクロス点（中心軸通過時）は速度が最大化するため、小脳の運動指令を増幅して中心窩ロックを維持します。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "頂点折り返し（変曲点）の滑らかな減速・反転",
      "text": "振幅のピーク（頂点・最下点）で標的速度が瞬間ゼロになるタイミングを先読みし、不必要なサッケードを出さずに反転運動へ移行します。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "速度倍率の段階的向上と2軸への応用",
      "text": "安定して90%以上の追従精度を維持できるようになったら、速度倍率を1.5x〜2.5xへ引き上げ、高周波追従に対応させます。"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "サイン波追従（Sine Wave Pursuit）とは何ですか？直線追従と何が違いますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "等速直線追従では標的の速度が一定ですが、サイン波（正弦波）追従では速度が連続的に正弦曲線に従って変動します。中央通過時に速度が最大となり、両端の頂点（折り返し地点）で速度がゼロになります。この加減速と周期的な方向反転に視線を同期させるため、眼球運動系には高度な小脳内部周期モデルが要求されます（Robinson, 1965）。"
      }
    },
    {
      "@type": "Question",
      "name": "正弦波の周期運動に対して、なぜ人間の目は「遅れ（位相ラグ）」をゼロにできるのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Starkら（1962）の古典的研究により、標的の動きが予測可能な正弦波である場合、人間は最初の数周期で周期と周波数を小脳で学習し、約130〜150msの神経生理学的視覚遅延を完全に相殺して「ゼロ位相遅れ（Zero Phase Lag）」で追尾できることが証明されています。"
      }
    },
    {
      "@type": "Question",
      "name": "頂点（反転地点）で視線がブレたり飛び跳ねたり（サッケード）する原因は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "標的が頂点で減速・停止する際、眼球の慣性や予測の過剰によって視線が標的を追い越してしまう「オーバーシュート」が起きるためです。追い越した視線を戻そうとして補正サッケードが発生し、滑動性追従利得が低下します。頂点手前での緩やかなブレーキ感覚を養う必要があります（Bahill et al., 1980）。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲームにおける「波形エイム（曲がりくねる敵のトラッキング）」にどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apex LegendsやOverwatchなどでは、ジャンプやスライディング、ストレイフ移動によって敵の頭部や身体が上下左右の波形軌道を描きます。本ドリルで周期的な加減速の曲線を滑らかに捉え続ける訓練を行うことで、カクつきのない吸い付くようなトラッキングエイムが定着します。"
      }
    },
    {
      "@type": "Question",
      "name": "追従利得（Pursuit Gain）とは具体的にどのような指標ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "追従利得とは「眼球の回転角速度 ÷ 標的の角速度」で表される比率です。理想的な値は1.0（完全な速度一致）です。標的が速すぎたり予測が破綻すると利得が0.8未満に落ち込み、視線が標的に取り残されるため頻繁な補正サッケードが発生します（Rashbass, 1961）。"
      }
    },
    {
      "@type": "Question",
      "name": "水平方向（左右）と垂直方向（上下）のサイン波で追従難易度が違うのはなぜですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "人間の外眼筋の神経支配において、内直筋・外直筋による水平追従は日常の視覚探索で頻繁に使われるため制御が容易です。一方、上直筋・下直筋・斜筋群を用いる垂直追従は神経解剖学的に追従帯域が狭く、高周波では利得が低下しやすい特徴があります。そのため垂直波形の練習が特に重要です。"
      }
    },
    {
      "@type": "Question",
      "name": "野球やテニスなど球技スポーツのボール追従にもサイン波トレーニングは有効ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "非常に有効です。バウンドするボールや山なりの放物線を描くフライ球は重力と空気抵抗によって垂直方向の正弦波に近い加減速挙動を示します。反転頂点（バウンドの瞬間や最高到達点）を滑らかに捉え続ける眼筋力は、的確なミートに直結します。"
      }
    },
    {
      "@type": "Question",
      "name": "ディスプレイのリフレッシュレート（Hz）はサイン波追従の精度にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "正弦波は速度が滑らかに連続変化するため、60Hz環境では加速度の変化（ジャーク）がフレーム単位でカクついて知覚されます。144Hzや240Hzの高リフレッシュレートモニターを使用することで、変曲点付近の微細な速度変化が網膜へ連続的に伝達され、追従の平滑度が劇的に向上します（Woods et al., 2015）。"
      }
    },
    {
      "@type": "Question",
      "name": "効果的な1日のトレーニング頻度と時間はどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "連続的な外眼筋緊張を伴うため、1回60秒のセッションを3〜5回（合計3〜5分）程度、週3〜4日行うのが最適です。目の焦点が合わなくなったり、涙が出たりした場合は直ちに訓練を終了し、遠くを見て毛様体筋をリラックスさせてください。"
      }
    },
    {
      "@type": "Question",
      "name": "加齢や眼精疲労がサイン波追従に及ぼす影響はありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "眼精疲労や睡眠不足があると小脳の周期予測ループの精度が鈍り、位相遅れが急増してサッケード混入が増加します。定期的なサイン波アイトラッキングは加齢に伴う眼球運動機能の低下を予防し、滑らかな視線移動能力を長期にわたり若々しく保つ効果があります。"
      }
    }
  ]
};

const guideProps = {
  heading: "サイン波眼球運動トレーニングの科学的根拠と波形追従エイム実践ガイド",
  intro: [
    "人間の眼球運動系における滑動性追従（Smooth Pursuit）は、等速で直線移動する物体を追うときよりも、連続的に加減速を繰り返す周期運動を追うときにその真価が試されます。物理学における単振動（Simple Harmonic Motion）を模した正弦波（サイン波）の軌道では、物体の位置・速度・加速度が三角関数に従って絶え間なく変化します。中央の平衡点を通過するときに速度は最大となり、両端の折り返し頂点に近づくにつれて急減速して瞬間的に静止します。",
    "視覚生理学の草分けであるスターク（Stark et al., 1962）やロビンソン（Robinson, 1965）らの研究によれば、人間が未知のランダムな動きを追従するときは約130〜150msの神経伝達遅延（位相ラグ）が不可避です。しかし、標的が周期的な正弦波を描く場合、小脳（Cerebellum）の片葉（Flocculus）および腹側前頭眼野は数周期のうちに運動の周波数と振幅を学習し、フィードフォワード信号を生成して位相遅れをゼロに収束させることが実証されています（ゼロ位相遅れ現象）。",
    "しかし、周波数が高くなったり疲労が重なると、折り返し地点で眼球のブレーキが間に合わず標的を追い越す「オーバーシュート」や、中央通過時の最高速度に追いつけず視線が遅れる「アンダーシュート」が発生します。ラシュバス（Rashbass, 1961）やバーヒル（Bahill et al., 1980）が指摘するように、追従速度利得（Gain）が低下すると、脳は視線を強制的に標的に引き戻すため「補正サッケード（Catch-up Saccade）」を乱発せざるを得なくなり、そのたびにサッケード抑制によって視覚情報が瞬間遮断されます。",
    "本ドリル（Sine Wave Pursuit）は、水平および垂直方向の正弦波オシレーションを通じて、小脳の周期性同調回路と外眼筋の連続的な微細速度出力を鍛え上げるために設計されています。折り返し時の滑らかな加減速コントロールとブレない追従利得1.0を体得し、FPSにおける変則ストレイフの捕捉や球技における曲線軌道の完全掌握を実現してください。"
  ],
  benchmarks: {
    title: "正弦波追従利得および調和オシレーション精度ベンチマーク (Sinusoidal Pursuit Gain)",
    headers: ["習熟度クラス", "追従利得 (Velocity Gain)", "位相遅れ (Phase Lag)", "周期あたり補正サッケード数", "総合トラッキング判定"],
    rows: [
      ["エリート (Elite)", "0.96 ~ 1.02", "15ms 未満 (ほぼ完全同期)", "0 ~ 1 回 (滑らかな完全追従)", "完璧な小脳周期モデル、ゼロ位相遅れ"],
      ["マスター (Master)", "0.90 ~ 0.95", "15ms ~ 30ms", "2 ~ 3 回", "極めて高精度、折り返し時の乱れなし"],
      ["ダイヤモンド (Diamond)", "0.82 ~ 0.89", "31ms ~ 50ms", "4 ~ 5 回", "標準的波形追従、高速時に軽微な遅れ"],
      ["ゴールド (Gold)", "0.70 ~ 0.81", "51ms ~ 80ms", "6 ~ 8 回", "変曲点でブレ発生、補正サッケード頻発"],
      ["ビギナー (Beginner)", "0.70 未満", "80ms 超過", "9 回以上", "周期予測が破綻、後追いのサッケード跳躍"]
    ],
    note: "※ 本基準は1080p解像度、速度1.0x〜1.5xの標準サイン波設定における実測データに基づきます。眼球角速度と標的角速度の一致率（Gain）およびサッケード混入頻度を評価しています。"
  },
  techniques: {
    title: "波形軌道を完全掌握する4大スムーズパシュート技術",
    items: [
      {
        name: "調和オシレーションの位相ゼロ同期 (Harmonic Phase Locking)",
        desc: "最初の1〜2往復で波形の「リズム」を体感し、メトロノームのように小脳の内部発振器をターゲットの往復周期にチューニングします。視覚フィードバックを待たずに、周期リズムに合わせて先回りで眼筋を駆動します。",
        tips: "目だけで追うのではなく、頭の中で「1、2、1、2」と一定の拍子を意識すると位相遅れが激減します。"
      },
      {
        name: "折り返し頂点でのソフトブレーキ制御 (Apex Deceleration Cushioning)",
        desc: "標的が波の頂点（最高点・最下点）に近づくにつれて自然にブレーキをかけ、停止から反転へ移る変曲点で視線が跳ねないように滑らかに方向を切り替えます。",
        tips: "頂点で無理に止めようとせず、ブランコが最高点に達して自然に折り返すような重力的な脱力感をイメージしてください。"
      },
      {
        name: "中央ゼロクロス点でのピーク加速維持 (Zero-Crossing Acceleration Boost)",
        desc: "サイン波の中央線（平衡点）を通過する瞬間は標的の移動速度がピークに達します。ここで油断して速度が落ちると一気に遅れをとるため、最も集中して眼球速度出力を高めます。",
        tips: "波の中央を通過する瞬間だけ、意識的に視線の推進力を一段階押し上げる感覚を持ちましょう。"
      },
      {
        name: "追いつきサッケードの意識的抑制 (Suppression of Catch-up Saccades)",
        desc: "視線がわずかに標的から離れても、反射的にピクッと目を飛ばす（サッケード）のを我慢し、スムーズパシュートの速度を微増させて滑らかに距離を詰めます。",
        tips: "視線をカクつかせず、ゴム紐で引っ張られるようにジワッと目標の中心核へ戻す感覚を研ぎ澄ましてください。"
      }
    ]
  },
  steps: [
    "環境設定と姿勢: ディスプレイから約50〜70cmの視距離を確保し、画面中央が目の高さと一致するように姿勢を整えます。",
    "基準速度でのウォームアップ: まずは速度1.0xでセッションを開始し、サイン波の振幅幅と周期的な往復テンポを掴みます。",
    "周期リズムへの同調: 最初の数周期で小脳の予測回路を同期させ、ターゲットが中央を通過するタイミングと頂点で反転するタイミングを合わせます。",
    "60秒間の連続パシュート: 60秒間、一度もサッケードを挟まないことを目標に、滑らかな曲線追従を維持し続けます。",
    "結果スコアの確認: 終了後に表示される追従精度（Accuracy）と連続追従維持時間をチェックし、前回の記録と比較して成長度を測定します。"
  ],
  audience: "Apex・Overwatch等で上下のジャンプやジグザグストレイフを吸い付くように撃ち抜きたいFPSプレイヤー、野球・テニス等で放物線やバウンドボールの軌道を正確に追尾したいアスリート、動体視力の追従平滑度を高めたいすべてのユーザー。",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('stark1962', 'robinson1965', 'rashbass1961', 'bahill1980', 'barnes2008', 'woods2015'),
  related: [
    { href: "/ja/drills/visual-tracking/constant-slow-pursuit", label: "低速追従眼球運動トレーニング (Constant Slow)" },
    { href: "/ja/drills/visual-tracking/directional-chaos-pursuit", label: "カオス方向追従テスト (Directional Chaos)" },
    { href: "/ja/drills/visual-tracking/dynamic-evasion-pursuit", label: "リアクティブ追従訓練 (Dynamic Evasion)" },
    { href: "/ja/drills/visual-tracking/ghosting-suppress-pursuit", label: "残像抑制固視トレーニング (Ghosting Suppress)" },
    { href: "/ja/drills/visual-tracking/infinity-pursuit", label: "8の字眼球運動トレーニング (Infinity)" },
    { href: "/ja/drills/visual-tracking/predictive-pursuit", label: "遮蔽軌道予測テスト (Predictive Pursuit)" }
  ]
};

export default function JapaneseSineWavePursuitPage() {
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

      <SineWavePursuitClient
        copy={{
          title: "サイン波眼球運動トレーニング・波形追従エイムテスト：調和オシレーションとゼロ位相遅れ",
          subtitle: "正弦波の周期的な加減速と方向反転に小脳を同期させるスムーズパシュート訓練",
          description: "水平・垂直の正弦波（サイン波）周期オシレーションに沿って視線を滑らかに制御する無料アイトラッキング練習。中央通過時の最大速度と折り返し変曲点での減速を完全同期させ、130〜150msの神経生理学的位相遅れ（ラグ）をゼロに補正します。登録不要・ブラウザで即座に測定可能。"
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/sine-wave-pursuit" />
      </div>
    </>
  );
}
