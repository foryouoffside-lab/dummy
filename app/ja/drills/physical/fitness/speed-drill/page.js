import SpeedDrillClient from '@/app/drills/physical/fitness/speed-drill/SpeedDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JP / JA)
// Primary Intent: クリック速度測定, クリック速度テスト, 連打 測定, クリック 連打 練習, エイム 反応速度
// Japanese Gaming Context: FPS(VALORANT, Apex, Overwatch)フリックショット速度＆高速タップ連打測定
// High-Demand, Low-Competition Target Keywords:
//   - "クリック速度測定" (Core high-intent click velocity query)
//   - "クリック速度テスト" (Standard click rate testing query)
//   - "連打 測定 サイト" (Online rapid tapping measurement query)
//   - "クリック 連打 練習" (Click tapping drill query)
//   - "エイム 速度 練習" (Aim velocity & acquisition practice)
//   - "エイム 反応速度" (Aim reaction speed test query)
//   - "反射神経 テスト クリック" (Browser reaction test clicking query)
//   - "動体視力 クリック テスト" (Dynamic visual acuity click test query)
//   - "フリック エイム 速度" (Ballistic flick aiming velocity query)
//   - "縮小ターゲット 迎撃" (Shrinking target boundary interception)
// ============================================================

export const metadata = {
  title: "クリック速度測定＆クリック連打テスト – 無料エイム反応速度練習 | SkillDrills",
  description: "無料オンラインクリック速度測定＆クリック連打テスト。縮小しながら高速移動するターゲットを瞬時に捕捉し、正確な高速タップ（連打）を撃ち込むことで、ミリ秒単位の神経反応性と弾道フリックエイム速度を科学的に鍛え上げます。",
  keywords: [
    "クリック速度測定",
    "クリック速度テスト",
    "連打 測定 サイト",
    "クリック 連打 練習",
    "エイム 速度 練習",
    "エイム 反応速度",
    "反射神経 テスト クリック",
    "動体視力 クリック テスト",
    "フリック エイム 速度",
    "縮小ターゲット 迎撃"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/fitness/speed-drill',
    languages: getAlternateLanguages('/drills/physical/fitness/speed-drill'),
  },
  openGraph: {
    title: "クリック速度測定＆クリック連打テスト – 無料エイム反応速度練習 | SkillDrills",
    description: "無料オンラインクリック速度測定＆クリック連打テスト。縮小しながら高速移動するターゲットを瞬時に捕捉し、正確な高速タップ（連打）を撃ち込むことで、ミリ秒単位の神経反応性と弾道フリックエイム速度を科学的に鍛え上げます。",
    url: 'https://skilldrills.online/ja/drills/physical/fitness/speed-drill',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "クリック速度測定＆クリック連打テスト – 無料エイム反応速度練習 | SkillDrills",
    description: "無料オンラインクリック速度測定＆クリック連打テスト。縮小しながら高速移動するターゲットを瞬時に捕捉し、正確な高速タップ（連打）を撃ち込むことで、ミリ秒単位の神経反応性と弾道フリックエイム速度を科学的に鍛え上げます。",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills ホーム",
      "item": "https://skilldrills.online/ja"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "身体機能トレーニングハブ",
      "item": "https://skilldrills.online/ja/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "俊敏性・フィットネス",
      "item": "https://skilldrills.online/ja/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "クリック速度測定・エイム反応速度ドリル",
      "item": "https://skilldrills.online/ja/drills/physical/fitness/speed-drill"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "クリック速度測定・エイム連打反応トレーナー",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "縮小する標的を迎撃し、クリック連打速度、弾道フリック反応時間、連打持続力を測定する無料ブラウザアプリ。",
  "url": "https://skilldrills.online/ja/drills/physical/fitness/speed-drill",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/ja"
  },
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "スピードドリル エイム反応測定ウェブアプリ",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvasおよびポインター入力対応の最新ブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/physical/fitness/speed-drill",
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "スピードドリル: 縮小標的クリック連打ゲーム (Speed Drill)",
  "url": "https://skilldrills.online/ja/drills/physical/fitness/speed-drill",
  "description": "加速・縮小するターゲットの消滅を防ぎ、連続迎撃を狙うアクション型反射神経ゲーム。",
  "genre": [
    "Action Game",
    "Aim Trainer",
    "Reflex Game",
    "Coordination"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "クリック速度測定ドリルにおけるターゲット縮小ギミックは、神経伝達速度の向上にどう寄与しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ターゲットが出現直後から連続的に半径を縮小（45pxから12px）させる構造は、フィッツの法則（Fitts's Law, 1954）における難易度指数（ID）を指数関数的に増大させます。消滅までの時間制限という切迫したプレッシャーは、大脳運動野の迷いによる感覚遅延を強制的に遮断し、ミリ秒単位の直感的開ループ（Open-Loop）弾道運動出力を促進します。"
      }
    },
    {
      "@type": "Question",
      "name": "ウッドワース（Woodworth, 1899）の2相運動制御モデルは、高速フリックエイムにどう作用しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ロバート・ウッドワースのモデルによれば、素早いエイミング動作は移動距離の約70〜80%を一気に跳躍する「初期弾道インパルス（Initial Ballistic Impulse）」と、標的境界内でカーソルを制動してクリックする「終末電流フィードバック制御（Current Control Deceleration）」の2段階から構成されます。本ドリルは終末減速にかける時間を極限まで圧縮し、初弾のフリック精度を高める能力を養います。"
      }
    },
    {
      "@type": "Question",
      "name": "トリーズマン（Treisman, 1980）の視覚的顕著性（Visual Saliency）と潜在的指向（Covert Orienting）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "アン・トリーズマンの特徴統合理論に基づき、高コントラストで移動する円形ターゲットは網膜周辺視野から上丘および頭頂葉経路を刺激し、ボトムアップ型のポップアウト現象を引き起こします。眼球運動が完了するよりも前に、脳がカーソルの跳躍軌道を無意識に先行セットアップする潜在的指向が働き、ターゲット捕捉の遅延を大幅に削減します。"
      }
    },
    {
      "@type": "Question",
      "name": "VALORANT、Apex Legends、OverwatchなどのFPSにおける単発タップ撃ちやフリックエイムにどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "実戦の突発的な撃ち合いでは、敵が視界に入った瞬間の初動エイム速度と、ヘッドショット判定内にクロスヘアを留めてクリックするタイミングが勝敗を決定づけます。ランダムな方向へ出現するターゲットを瞬時に捕捉する練習は、瞬時のフリックショット成功率と単発タップ撃ちの初弾精度を劇的に底上げします。"
      }
    },
    {
      "@type": "Question",
      "name": "レベル進行に伴うターゲット速度、縮小ペース、およびスコア算出の変化は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1,750点獲得ごとにレベルが進行し、最大レベル15以上まで上限なくスケールします。ターゲットの初期半径は45pxから12pxまで急縮小し、移動速度は等倍から最高3.8倍まで加速、さらに縮小速度係数も0.6から2.2倍以上へ引き上げられます。連続ヒット時はストリーク加熱（Streak Heat）機構が発動し、さらに高度な迎撃速度が要求されます。"
      }
    },
    {
      "@type": "Question",
      "name": "ターゲット命中時に付与される0.6秒の制限時間延長ボーナスの重要性とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "本ドリルの持ち時間は45秒でスタートしますが、ターゲットを1つ撃破するごとに残り時間が0.6秒加算されます。ミスなく素早く標的を仕留め続けることで、セッション時間を60秒、90秒と引き延ばし、最大3.0倍のコンボ倍率を維持しながら24,000点以上のエリートランクスコアを目指すための重要システムです。"
      }
    },
    {
      "@type": "Question",
      "name": "ターゲットの撃ち漏らし（ミス）や消滅時に科されるペナルティの内容は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ターゲットが半径ゼロまで縮小して消滅したり、空振りのクリックを犯すと、積み上げたコンボ倍率が即座に1.0倍にリセットされます。また設定でミス減点ペナルティを有効にしている場合、1回のミスにつき0.8秒の制限時間が削られるため、スピードと正確性の絶妙なバランス維持が必須となります。"
      }
    },
    {
      "@type": "Question",
      "name": "高速クリック連打と高精度フリックを両立するための推奨マウス持ち方とDPI設定は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "手のひら全体をベタ付けする「かぶせ持ち」よりも、指の関節をアーチ状に立てて弾性を活かす「つかみ持ち（Claw Grip）」または「つまみ持ち（Fingertip Grip）」が連打に適しています。DPIは800〜1600程度に調整し、手首の小刻みなスナップと人差し指の独立した高速打鍵を組み合わせ、マウス底面が浮かないよう安定させましょう。"
      }
    },
    {
      "@type": "Question",
      "name": "高リフレッシュレートモニター（144Hz/240Hz）とポーリングレートが連打測定に及ぼす影響は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hzモニターでは描画更新に約16.6msを要しますが、240Hz環境では4.16msごとにフレームが更新されます。縮小速度が2.2倍に達する過酷なターゲット迎撃において、高リフレッシュレートは残像を排除して精密な境界輪郭を映し出します。また1,000Hz以上のマウス入力は1ms単位でクリックを正確に拾い上げ、入力抜けを防ぎます (Woods et al., 2015)。"
      }
    },
    {
      "@type": "Question",
      "name": "このスピードドリルで計測されたクリック速度やスコアデータは外部に送信されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ、一切送信されません。クリック速度、命中率、平均反応時間、ベストコンボなどのトレーニング結果はすべてユーザーのブラウザ内LocalStorageにのみ安全に記録されます。外部サーバーへの個人情報送信やトラッキングは行われないため、安心して反復練習に集中していただけます。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "クリック速度向上＆高速ターゲット迎撃4段階科学的トレーニング法",
  "description": "ウッドワース2相モデルとフィッツの縮小境界制御を活用し、クリック速度とエイム反応時間を最大化する実戦プロトコル。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "周辺視野の開放と中央基準待機 (Peripheral Orienting)",
      "text": "視線を画面中央に柔らかく置き周辺視野を広げ、ターゲットが出現した瞬間にトリーズマンのポップアウト刺激を感知します。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/speed-drill#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "ウッドワース第1相 爆発的弾道フリック (Ballistic Impulse Snap)",
      "text": "標的の位置を捕捉した瞬間に迷わずマウスを振り抜き、移動距離の約75%を一気に飛び越えます。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/speed-drill#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "フィッツ縮小境界内への着弾と高速タップ (Boundary Interception & Tap)",
      "text": "標的が極小化する前に指先の微細なスナップで円形輪郭内にカーソルを収め、シャープにクリックを実行します。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/speed-drill#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "時間延長ボーナスの獲得とコンボ維持 (Bonus Time & Streak Heat)",
      "text": "命中時の+0.6秒を獲得してタイマーを伸ばし、最大3.0倍のコンボを維持して24,000点のエリートスコアに挑みます。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/speed-drill#step-4"
    }
  ]
};

const speedGuide = {
  heading: "クリック速度測定および高速ターゲット迎撃の神経生体力学ガイド",
  intro: {
    title: "神経筋反応速度と弾道フリックエイムの生体力学的メカニズム",
    paragraphs: [
      "スピードドリル（Speed Drill）は、画面上を自律的に移動しながら連続的に縮小していく円形ターゲットを迅速に捕捉し、正確に撃墜する高負荷エイム反応速度トレーニングシステムです。人間の素早いマウスクリック動作は、ロバート・ウッドワース（Woodworth, 1899）が提唱した2相運動制御モデルに準拠しています。第1相である開ループ（Open-loop）弾道インパルスが全跳躍距離の大半を一瞬で稼ぎ、第2相の閉ループ（Closed-loop）微小フィードバック制御によってターゲットの境界輪郭内へと最終着弾します。",
      "ターゲットが生成直後から半径を縮小させ続ける動的メカニズムは、フィッツの法則（Fitts's Law, 1954）が示す運動難易度指数（Index of Difficulty）を時間の経過とともに激増させます。ターゲットが直径45pxの初期段階でクリックするのと、12pxの極小段階で捉えるのとでは、要求される空間許容誤差に雲泥の差が生じます。したがって、出現を察知した瞬間に迷いなくマウスを振り抜く初動の決断力がハイスコアの鍵を握ります。",
      "不規則な位置に出現するターゲットは、アン・トリーズマン（Treisman & Gelade, 1980）の特徴統合理論に基づくボトムアップ型視覚的顕著性（Visual Saliency）を直撃します。高コントラストな円形刺激は網膜周辺視野から脳の上丘・頭頂葉回路へ伝達され、眼球の注視が到達する前に運動野がカーソルの射出準備を完了する潜在的指向（Covert Orienting）を作動させます。さらにデイビッド・リー（Lee, 1976）の光学的タウ（τ）演算により、標的の消滅までの限界猶予時間を直感的に割り出します。",
      "ミリ秒単位の極限クロノメトリーを実現するため、本システムはブラウザのperformance.now()高精度タイマーを採用しています。144Hzや240Hzの高リフレッシュレートモニターと1,000Hzのマウスポーリングレート環境では、描画遅延が4ms以下に抑制され、卓越した運動フィードバックを提供します（Woods et al., 2015）。なお、すべてのクリック速度や練習記録はプライバシー保護のため完全に端末ローカルに保存されます。"
    ]
  },
  benchmarks: {
    title: "クリック速度・エイム反応時間 5段階スキル評価基準表",
    headers: ["階層・ランク", "称号 (Rank Title)", "基準スコア", "命中精度＆反応速度", "総合評価", "神経生体力学プロファイル"],
    rows: [
      ["Tier 1: 頂点のスナイパー", "Apex Velocity Sniper", "24,000点以上", "95%以上 / < 160ms", "Grade S", "上位0.1%プロゲーマー水準。完成されたウッドワース弾道フリックと、極小12px標的への電光石火の迎撃能力 (Woodworth 1899; Fitts 1954)"],
      ["Tier 2: 精密ストライカー", "Precision Reflex Striker", "17,000 – 23,999点", "90 – 94% / 160 – 190ms", "Grade A", "上位3%準プロ水準。優れた潜在的視線誘導と、3.0倍高速移動標的に対する極めて安定したコンボ連打の持続"],
      ["Tier 3: 熟練インターセプター", "Rapid Target Interceptor", "11,000 – 16,999点", "82 – 89% / 191 – 230ms", "Grade B", "上位15%競技ゲーマー水準。安定した連打リズムと+0.6秒時間延長ボーナスを活かした長時間の生き残り能力"],
      ["Tier 4: 発展型タッピング練習生", "Developing Tapping Trainee", "6,000 – 10,999点", "70 – 81% / 231 – 280ms", "Grade C", "一般成人平均水準。ターゲット速度2.0倍超過時に終末制動の遅れによる外郭空振りとコンボ切れが多発"],
      ["Tier 5: 初級エイム入門者", "Novice Target Pointer", "6,000点未満", "< 70% / > 280ms", "Grade D", "初心者baseline。標的消滅直前の慌てた空振りが顕著。画面中央を基準に周辺視野を広げる意識の定着を推奨"]
    ],
    note: "ウッドワース運動分解モデル(Woodworth 1899)、フィッツ難易度法則(Fitts 1954)、トリーズマン視覚顕著性理論(Treisman 1980)に基づく客観的生体力学基準です。"
  },
  techniques: {
    title: "クリック速度＆弾道フリック反応速度極大化 4大実戦プロトコル",
    items: [
      {
        name: "ウッドワース第1相 弾道スナップフリック (Woodworth Ballistic Snap)",
        desc: "ターゲットが視界に入った際、ゆっくりとカーソルを誘導してはいけません。移動距離の75%を稲妻のような瞬発力で投げ出すように振り抜き、円形境界に突入する一瞬だけ指先で微小ブレーキをかけてください。",
        tips: "手首のスナップを活かし、マウスパッド上で初速を爆発的に高める意識を持ちましょう。"
      },
      {
        name: "フィッツ縮小境界の先手迎撃 (Fitts Boundary Pre-Interception)",
        desc: "標的が縮小するのを待つほど、難易度指数（ID）は跳ね上がります。出現直後の最も大きく膨らんでいる最初の150ms以内に思い切ってクリックを放ち、ミスリスクを最小化しましょう。",
        tips: "中心の1点にこだわりすぎず、縮小前の余裕ある外枠を素早く掠め取る感覚を磨いてください。"
      },
      {
        name: "トリーズマン周辺視野 潜在的指向 (Treisman Covert Peripheral Awareness)",
        desc: "画面の1点に視線を凝固させると、逆サイドに現れたターゲットに反応できません。中央付近に視線を柔らかく保ち、周辺視野の動きセンサーを常にオンにして、手が無意識に先行して動く状態を作ります。",
        tips: "眼球が完全にターゲットへ移動するのを待たず、視認とほぼ同時にマウスを射出する連携を意識しましょう。"
      },
      {
        name: "つかみ持ちによる高周波タッピング (Claw-Grip High-Frequency Tapping)",
        desc: "手のひらをマウス後部に固定した状態では指の連打ストロークが制限されます。指の関節をアーチ状に立てるつかみ持ちを維持し、マウススイッチの跳ね返り反発力を利用して最短ストロークで打鍵してください。",
        tips: "腕全体に力みを入れず、人差し指の付け根と第2関節のスプリング力だけで軽快にタップしましょう。"
      }
    ]
  },
  steps: [
    "正しい姿勢で座り、マウスカーソルを画面中央付近に待機させます。",
    "ターゲットが出現した瞬間に爆発的なフリックで標的の輪郭内へ飛び込みます。",
    "ターゲットが縮小消滅する前にシャープにクリックし、スコアと+0.6秒を獲得します。",
    "ノーミスでコンボ倍率を3.0倍まで高め、最高スコア24,000点以上の領域を目指します。"
  ],
  audience: "VALORANT、Apex、Overwatchなどでフリックエイムと単発タップ速度を極めたい競技プレイヤー、および反射神経と俊敏性を鍛えたい全ての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woodworth1899', 'fitts1954', 'treisman1980', 'lee1976', 'woods2015')
};

export default function LocalizedSpeedDrillPageJa() {
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
      <SpeedDrillClient
        copy={{
          title: "クリック速度測定＆クリック連打テスト",
          subtitle: "縮小ターゲット連続迎撃＆弾道フリック連打 • 15段階難易度スケーリング",
          hudLabels: {
            score: "スコア",
            time: "残り時間",
            bestScore: "自己ベスト",
            bestCombo: "最高コンボ"
          },
          rulesTitle: "ドリル進行ルールおよび採点システム",
          rulesItems: [
            { title: "ターゲット迎撃と制限時間延長", text: "ターゲットが消滅する前にクリックして撃破してください。命中ごとに100点（コンボおよびレベル倍率適用）と0.6秒の追加タイムが付与されます。" },
            { title: "コンボ倍率の増幅", text: "ミスなく連続迎撃を継続することで、コンボ倍率が最大3.0倍まで上昇します。" },
            { title: "難易度の連続スケーリング", text: "スコア1,750点獲得ごとにレベルが進行し、標的の移動速度と縮小ペースが段階的に加速します。" },
            { title: "消滅および空振りペナルティ", text: "ターゲットを見逃すか空振りをするとコンボが1.0倍にリセットされ、ペナルティ有効時は0.8秒のタイムロスが発生します。" }
          ],
          aboutTitle: "スピードドリルと神経筋反応の生体力学",
          aboutSections: [
            {
              title: "弾道モーターフリックとミリ秒ターゲット捕捉",
              subtitle: "ウッドワース（Woodworth, 1899）2相運動モデルの極限スピード実証",
              content: "高速なターゲット捕捉は初期の爆発的インパルスと終末の微小減速から成り立ちます。高難度になるほど減速猶予が削られ、直感的なフリック能力が試されます。"
            },
            {
              title: "縮小する空間境界とフィッツの法則（Fitts's Law）",
              subtitle: "ターゲット径縮小に伴う難易度指数（ID）の指数関数的跳ね上がり",
              content: "半径が45pxから12pxへ縮小するにつれ、許容される着弾範囲は極端に狭まります。出現初期に素早く仕留める決断力がハイスコアへの生命線です。"
            },
            {
              title: "視覚的顕著性と周辺視野ボトムアップ知覚",
              subtitle: "トリーズマン（Treisman, 1980）特徴統合理論に基づく潜在的指向",
              content: "高コントラスト刺激が周辺視野を刺激し、眼球移動に先んじて運動野のカーソル跳躍準備を整える迅速なターゲット捕捉を実現します。"
            },
            {
              title: "光学的タウ（τ）と標的消滅マージン",
              subtitle: "デイビッド・リー（Lee, 1976）網膜像縮小率に基づく時間算出",
              content: "脳は像の縮小率の逆数から消滅までの残り時間を直感的に計算し、早とちりの空振りや致命的なためらいを防ぎます。"
            }
          ]
        }}
      />
      <DrillGuide {...speedGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/fitness/speed-drill" />
    </>
  );
}
