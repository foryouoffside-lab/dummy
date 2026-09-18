import KineticInterceptClient from '@/app/drills/visual/tracking-accuracy/moving-target/KineticInterceptClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "動体視力テスト: 移動標的の弾道予測＆迎撃 | SkillDrills",
  description: "無料オンライン動体視力テスト。加速・反射バウンドする移動ターゲットの軌跡を予測し迎撃。滑動性眼球運動と手と目の協調性を高精度測定。",
  keywords: [
    "動体視力テスト",
    "動体視力 トレーニング",
    "動体視力 ゲーム",
    "動体視力テスト 無料",
    "動体視力 鍛え方",
    "移動標的 迎撃",
    "滑動性眼球運動 スムースパシュート",
    "リードショット 練習",
    "視覚 追従 トレーニング",
    "FPS エイム 移動ターゲット",
    "手と目の協調性 テスト",
    "動体視力 測定 アプリ"
  ],
  openGraph: {
    title: "動体視力テスト: 移動標的の弾道予測＆迎撃 | SkillDrills",
    description: "加速・バウンドする移動標的の弾道を予測迎撃し、動体視力と滑動性眼球運動を測定する無料オンライントレーニング。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "動体視力テスト: 移動標的の弾道予測＆迎撃 | SkillDrills",
    description: "移動ターゲットの迎撃精度と軌道予測能力を科学的に測定・強化する無料動体視力ドリル。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/moving-target'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "ビジョントレーニング", "item": "https://skilldrills.online/ja/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "追従精度", "item": "https://skilldrills.online/ja/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "移動標的迎撃テスト", "item": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "動体視力標的迎撃テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
  "description": "不規則加速と壁面反射を伴う移動ターゲットの弾道を予測迎撃し、動体視力と滑動性眼球運動をミリ秒単位で測定する視覚訓練ツール。",
  "featureList": [
    "境界衝突反発ベクトル物理演算を備えた動的ターゲット",
    "ミリ秒単位の命中判定とコンボ倍率スコアリング",
    "レベル上昇に伴う標的加速と当たり判定の縮小",
    "完全クライアントサイド実行によるローカルデータ保護"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "動体視力標的迎撃テスト — 視覚追従トレーニング | SkillDrills",
  "alternateName": "Moving Target Pro",
  "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target",
  "dateModified": "2026-09-05",
  "description": "無料オンライン動体視力トレーニング。画面内を高速でバウンドする移動球体を滑らかな視線追従とリードショットで迎撃します。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応のモダンブラウザ。",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "滑動性眼球運動, 動体視力, 軌道予測外挿, 弾道迎撃, 閉ループ運動補正"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "移動標的迎撃動体視力ゲーム",
  "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target",
  "description": "移動する標的を正確に追従・予測迎撃して動体視力を鍛えるオンライントレーニング。",
  "genre": ["Action", "Aim Trainer", "Visual Tracking"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "動体視力移動標的迎撃テストの実施手順",
  "dateModified": "2026-09-05",
  "description": "移動標的迎撃プロトコルに従い、動体視力と滑動性追従能力を高める4つのステップ。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "移動ターゲットの中心窩捕捉",
      "text": "出現した移動球体の中心に視線の中心窩を素早く合わせ、滑らかな追従眼球運動を開始します。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "進行軌道と壁面反射角を予測",
      "text": "球体の前進速度と境界壁に当たる反射角を瞬時に計算し、標的のわずかに前方を狙います。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "正確な弾道迎撃クリックの執行",
      "text": "移動インターバルが終了する前に球体を正確にクリックして撃破します（+150点 × コンボ × レベル、+0.6秒延長）。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "加速下でのコンボ維持",
      "text": "レベルが上がって速度が増しサイズが縮小しても、焦らず照準を重ねてからクリックしコンボを守ります。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "移動標的迎撃テスト（動体視力テスト）とはどのような検査ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "移動標的迎撃テストは、加速・バウンドする動的ターゲットを目で滑らかに追い続ける「滑動性眼球運動（スムースパシュート）」、軌道の空間的外挿予測、そして手と目の協調迎撃精度を高精度に測定・訓練する視覚心理物理学テストです。"
      }
    },
    {
      "@type": "Question",
      "name": "脳は動く視覚対象をどのように追跡し迎撃しているのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "網膜神経節細胞が捉えた運動信号は中側頭野（MT/V5）へ送られ、速度と方向ベクトルが計算されます。前頭眼野（FEF）と小脳が眼球筋を調整して視線速度を目標物に同調させ、頭頂葉が手の弾道学的迎撃動作を計画します。"
      }
    },
    {
      "@type": "Question",
      "name": "滑動性眼球運動（パシュート）とサッケード（跳躍性眼球運動）の違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rashbass（1961）が示した通り、両者は異なる制御機構を持ちます。パシュートは移動物を中心窩に留めるための連続的な追従運動（秒速30〜40度まで）であり、サッケードは離れた対象に視線を素早く飛ばす弾道学的ジャンプ（秒速最大900度）です。"
      }
    },
    {
      "@type": "Question",
      "name": "動く標的を撃つ際、なぜ「リードショット（偏差撃ち）」が必須なのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "人間の知覚から指のクリック入力までには不可避的に150〜220msの神経伝達遅延が存在します。秒速500pxで動く物体はその間に100px以上進むため、現在位置ではなく未来の到達点を狙わなければ命中しません（Land & McLeod, 2000）。"
      }
    },
    {
      "@type": "Question",
      "name": "人間の滑動性眼球運動（パシュート）の追従速度限界はどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "人間の目は角速度秒速約30度未満の動きに対してパシュートを安定維持します（Bahill et al., 1980; Krauzlis, 2004）。それを超えるか急激に変向すると追従ゲインが1.0を割り込み、追いつきサッケード（Catch-up Saccade）で補正する必要があります。"
      }
    },
    {
      "@type": "Question",
      "name": "動体視力や移動ターゲットのエイム精度はトレーニングで鍛えられますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。継続的な追従練習により、大脳MT/V5野の運動情報処理が洗練され、小脳のフィードバック補正速度が向上することで、動体視力と迎撃精度が飛躍的に向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "ディスプレイのリフレッシュレート（60Hz、144Hz、240Hz）の影響は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hz画面は16.7msごとに位置が更新されるため像が断続的になり、知覚誤差が増大します。144Hz（6.9ms）や240Hz（4.1ms）では連続的な滑らかさが得られ、眼球追従の疲労軽減と命中率向上に直結します（Woods et al., 2015）。"
      }
    },
    {
      "@type": "Question",
      "name": "標的の急加速や壁面バウンドは命中率にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "等速直線運動は高い精度で予測できますが、壁に当たって跳ね返る瞬間は従来の予測モデルがリセットされます。新しい軌道を再計算して視線を追従させるまでに150〜200msの遅延が生じます。"
      }
    },
    {
      "@type": "Question",
      "name": "開ループ（Open-loop）と閉ループ（Closed-loop）視覚運動制御の違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "移動標的を迎撃する最初の約100msはフィードバックなしで初期推定に基づく「開ループ」動作です。その後、目と手の位置誤差をリアルタイムで修正しながら命中させる「閉ループ」動作へと移行します。"
      }
    },
    {
      "@type": "Question",
      "name": "このテストは無料ですか？スコアデータは保護されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。SkillDrillsの動体視力テストは登録不要で100%無料です。測定されたスコアや詳細データはお使いのブラウザ（LocalStorage）にのみ安全に保持されます。"
      }
    }
  ]
};

const movingTargetGuide = {
  heading: "キネティック視覚追従・弾道迎撃科学標準ガイド",
  intro: [
    "動的ターゲットの迎撃は、球技スポーツ、モータースポーツ、格闘技、航空操縦、そして競技型eスポーツ全般における最重要知覚運動能力です。加速し不規則に反射する物体を正確にヒットするには、滑動性眼球運動（Smooth Pursuit）、未来の空間軌道外挿、そして精密な閉ループ運動タイミングの統合が不可欠です。",
    "視覚運動追従の神経生理学的基盤は、中側頭視覚野（MT/V5）および内側上側頭野（MST）の方向選択性ニューロンにあります。これらの皮質領域が速度と方向ベクトルを計算し、前頭眼野（FEF）や脳橋核へフィードフォワード信号を送ることで、小脳プルキンエ細胞が眼球追従ゲインを制御します（Krauzlis, 2004）。",
    "Rashbass（1961）の古典的研究によれば、滑動性眼球運動とサッケードは独立した制御機構を持ちます。パシュートは網膜スリップ速度誤差によって調節され、サッケードは位置のズレを矯正します。標的が秒速30〜40度を超えて加速するか境界でバウンドすると追従ゲインが低下し、急激な補正サッケードが発生します（Bahill et al., 1980）。",
    "さらにLand & McLeod（2000）のアスリート研究によると、熟練者は物体を目で受動的に追い続けるのではなく、未来のバウンド地点や打撃ポイントへ視線をあらかじめ飛ばす「予測的サッケード（Anticipatory Saccade）」を駆使します。本ドリルはこの高度な空間予測能力をミリ秒単位のプレッシャー下で鍛え上げます。"
  ],
  benchmarks: {
    title: "動体視力・軌道迎撃パフォーマンス評価基準",
    headers: ["習熟度ティア", "目標ペーシング時間", "到達スコア・コンボ基準", "視覚追従・迎撃プロファイル"],
    rows: [
      ["ティア1：神業キネティック迎撃 (Apex)", "< 0.25秒 ペーシング", "16,000点以上 | コンボ 25x+", "プロ級滑動性追従；補正サッケード遅延が皆無の完璧な速度ベクトル外挿。トップFPSプロや戦闘機パイロット水準。"],
      ["ティア2：上位動的トラッカー (Advanced)", "0.25 – 0.45秒 ペーシング", "10,500 – 15,999点 | コンボ 16x+", "滑らかな眼球追随；加速する標的に対してオーバーシュートなく迅速な閉ループ運動補正を実行可能なエリート。"],
      ["ティア3：標準的視覚追従 (Competent)", "0.46 – 0.70秒 ペーシング", "6,000 – 10,499点 | コンボ 9x+", "信頼できる標準基準；直線軌道の迎撃は安定しているが、急激な壁面バウンド時に一時的な捕捉遅延が発生。"],
      ["ティア4：発展段階トラッカー (Developing)", "0.71 – 1.00秒 ペーシング", "2,500 – 5,999点 | コンボ 4x+", "予測的パシュートより反射的サッケードへの依存度が高い；高速加速時に視線追従の明らかな躊躇が見られる。"],
      ["ティア5：追従不安定・基礎段階 (Baseline)", "> 1.00秒 ペーシング", "< 2,500点 | コンボ < 4x", "著しい照準オーバーシュート；移動物体を中心窩に捉え続ける基礎的な眼球安定化トレーニングが必要。"]
    ],
    note: "本基準値は滑動性眼球運動の精神物理学および動的迎撃時間測定の文献（Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000; Bahill et al., 1980; Woods et al., 2015）に基づく指標です。画面環境により変動します。"
  },
  techniques: {
    title: "動体視力と迎撃精度を極限まで高める実践メソッド",
    items: [
      {
        name: "予測的ベクトルリーディング (Rashbass速度適合)",
        desc: "知覚からクリックまで150〜220msの遅延があるため、現在の位置をクリックすると後方を叩いて空振りを起こします（Rashbass, 1961）。",
        tips: "球体の速度ベクトルを外挿し、進行方向の5〜15ピクセル先を狙ってリードショットを放ちます。"
      },
      {
        name: "境界バウンドの予測的先回り (Land & McLeodサッケード)",
        desc: "優れた打者は物体が壁に当たるまで追わず、反射して跳ね返る予測地点へ視線を先回りさせます（Land & McLeod, 2000）。",
        tips: "球体が壁に近づいたら壁を追うのをやめ、跳ね返りの反射角となる空間へクロスヘアを先回りさせて待ち構えます。"
      },
      {
        name: "網膜像のブレ防止固定 (Krauzlisパシュートループ)",
        desc: "鮮明な視界を保つには、目の動きを標的速度に同期させて網膜上の像を中心窩に固定する必要があります（Krauzlis, 2004）。",
        tips: "マウスを止めて標的が通過するのを待つのではなく、目とカーソルを標的と滑らかに滑動させて追尾します。"
      },
      {
        name: "機械的リズムの打破と引き金規律",
        desc: "不規則な軌道変化はサッケードを誘発するため、闇雲な連打はコンボを途絶えさせます（Bahill et al., 1980）。",
        tips: "一定のリズムでクリックせず、照準と球体の重なりが網膜で確認された刹那にのみ引き金を引きます。"
      }
    ]
  },
  steps: [
    "「ドリル開始」をクリックして45秒のキネティック迎撃セッションを起動します。",
    "出現した移動球体を素早く目で捉え、滑らかな視線追従を確立します。",
    "進行ベクトルと壁面反射角を予測し、球体の少し前方をリードします。",
    "制限時間内に球体を正確にクリックして撃破します（+150点 × 倍率、+0.6秒延長）。",
    "終了後に総迎撃数、最高コンボ、動体視力評価ランクを確認します。"
  ],
  audience: "VALORANTやApexなどのFPSプレイヤー、野球やテニス等の球技競技者、格闘家、レーサー、パイロット、動体視力を高めたいすべての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rashbass1961', 'krauzlis2004', 'land2000', 'bahill1980', 'woods2015'),
  related: [
    { href: "/ja/drills/visual/tracking-accuracy/multiple-targets", label: "複数目標追跡 (MOT) 検査" },
    { href: "/ja/drills/visual/tracking-accuracy/pursuit-tracker", label: "滑動性眼球運動トラッカー" },
    { href: "/ja/drills/visual/reaction-speed/light-reaction", label: "閃光反応速度テスト" },
    { href: "/ja/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go 衝動制御テスト" },
    { href: "/ja/drills/visual/depth-perception/distance-judgment", label: "三桿法 深視力・距離判定検査" },
    { href: "/ja/drills/visual/visual-recognition/entropic-grid", label: "エントロピーグリッド探索テスト" }
  ]
};

export default function KineticInterceptPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <KineticInterceptClient copy={{ title: "動体視力テスト: 移動標的の弾道予測＆迎撃" }} />
      <DrillGuide guide={movingTargetGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ja/drills/visual/tracking-accuracy/moving-target" />
      </div>
    </>
  );
}
