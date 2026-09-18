import DropCatchClient from '@/app/drills/physical/reflex-training/drop-catch/DropCatchClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JP / JA)
// Primary Intent: 定規 落とし ゲーム, 反射神経 測定 ものさし, 物差し 反応速度, 選択反応時間 テスト
// Japanese Context: 学校や部活の「定規落としテスト」をデジタル高精度化・Go/No-Go判定＆赤色デコイ抑制
// High-Demand, Low-Competition Target Keywords:
//   - "定規 落とし ゲーム" (Classic viral school ruler drop query)
//   - "反射神経 測定 ものさし" (Ruler reflex measurement query)
//   - "物差し 反応速度" (Ruler reaction speed test query)
//   - "反射神経 測定 ゲーム" (Reflex measuring interactive game query)
//   - "反射神経 ゲーム 無料" (High-intent free reflex game query)
//   - "反射神経 ゲーム ブラウザ" (Browser-based reflex training query)
//   - "選択反応時間 テスト" (Donders Type C choice reaction time query)
//   - "落下 ターゲット 迎撃" (Falling target interception query)
//   - "動体視力 落下 テスト" (Dynamic visual acuity fall test)
//   - "衝動抑制 反射 トレーニング" (Impulse inhibition reflex training)
// ============================================================

export const metadata = {
  title: "定規落としゲーム＆反射神経測定テスト – 無料落下ドロップキャッチ練習 | SkillDrills",
  description: "無料オンライン定規落としゲーム＆反射神経測定テスト。重力加速度で落下する緑ターゲットを瞬時にキャッチし、赤いデコイの罠を衝動抑制することで、ドンデルスC型選択反応時間と動体視力を科学的に鍛え上げます。",
  keywords: [
    "定規 落とし ゲーム",
    "反射神経 測定 ものさし",
    "物差し 反応速度",
    "反射神経 測定 ゲーム",
    "反射神経 ゲーム 無料",
    "反射神経 ゲーム ブラウザ",
    "選択反応時間 テスト",
    "落下 ターゲット 迎撃",
    "動体視力 落下 テスト",
    "衝動抑制 反射 トレーニング"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/reflex-training/drop-catch',
    languages: getAlternateLanguages('/drills/physical/reflex-training/drop-catch'),
  },
  openGraph: {
    title: "定規落としゲーム＆反射神経測定テスト – 無料落下ドロップキャッチ練習 | SkillDrills",
    description: "無料オンライン定規落としゲーム＆反射神経測定テスト。重力加速度で落下する緑ターゲットを瞬時にキャッチし、赤いデコイの罠を衝動抑制することで、ドンデルスC型選択反応時間と動体視力を科学的に鍛え上げます。",
    url: 'https://skilldrills.online/ja/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "定規落としゲーム＆反射神経測定テスト – 無料落下ドロップキャッチ練習 | SkillDrills",
    description: "無料オンライン定規落としゲーム＆反射神経測定テスト。重力加速度で落下する緑ターゲットを瞬時にキャッチし、赤いデコイの罠を衝動抑制することで、ドンデルスC型選択反応時間と動体視力を科学的に鍛え上げます。",
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
      "name": "反射神経トレーニング",
      "item": "https://skilldrills.online/ja/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "定規落としゲーム・ドロップキャッチ反射測定",
      "item": "https://skilldrills.online/ja/drills/physical/reflex-training/drop-catch"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "定規落としゲーム・ドロップキャッチ反射トレーナー",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "重力落下する標的の捕捉と赤色デコイの衝動抑制を通じ、選択反応時間と視覚弁別能を測定する無料ブラウザアプリ。",
  "url": "https://skilldrills.online/ja/drills/physical/reflex-training/drop-catch",
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
  "name": "ドロップキャッチ反射速度測定ウェブアプリ",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvasおよびポインター入力対応の最新ブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/physical/reflex-training/drop-catch",
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "ドロップキャッチ: 落下標的迎撃＆衝動制御ゲーム (Drop Catch)",
  "url": "https://skilldrills.online/ja/drills/physical/reflex-training/drop-catch",
  "description": "重力加速度で落下する標的を瞬時にキャッチし、罠を回避するアクション反射神経ゲーム。",
  "genre": [
    "Action Game",
    "Reflex Game",
    "Aim Trainer",
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
      "name": "学校やスポーツ現場での「定規落としテスト」と本ドロップキャッチドリルの生体力学的違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "物差しを親指と人差し指で挟む従来の定規落としは、落下距離（d = 1/2gt²）を測定する単純反応（ドンデルスA型反応）です。一方、本ドリルは画面上部から400 px/s〜1250 px/sへ加速度落下する「緑の有効標的」と「赤の偽デコイ」を瞬時に見極める「ドンデルスC型選択弁別課題（Donders Type C）」であり、色弁別知覚と前頭前野の衝動抑制回路を同時に測定・強化します。"
      }
    },
    {
      "@type": "Question",
      "name": "デイビッド・リー（David N. Lee, 1976）の光学的タウ（Optical Tau, τ）理論は落下迎撃にどう働きますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "重力で加速しながら落下する物体に対し、人間の視覚野は距離や瞬間速度を数値計算しません。網膜上に投影される物体の垂直変位と拡大率の逆数である「光学的タウ（τ）」を抽出し、消滅ライン（画面最下部）に激突するまでの猶予時間（Time-to-Contact）を直感的に把握して、最も適切なタイミングでクリックを放ちます。"
      }
    },
    {
      "@type": "Question",
      "name": "ゴードン・ローガン（Logan, 1984）の競馬モデル（Horse-Race Model）と赤い罠デコイの抑制原理とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "標的が現れた瞬間、脳内では「クリックを押す（Go）」という無条件の運動衝動と、色を確認して「押すのを止める（Stop）」という前頭葉の抑制信号が同時にスタートを切る競馬（レース）が始まります。赤いデコイをクリックしないためには、Stop信号がGoの運動発火閾値を超える前に届かなければなりません。本ドリルはこの衝動抑制能を強力に鍛えます。"
      }
    },
    {
      "@type": "Question",
      "name": "VALORANT、Apex Legends、LoLなどのeスポーツにおける誤射防止やスキル回避にどう活きますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "乱戦の最中では、敵の重要スキルと味方の支援スキル、あるいは敵のフェイク（囮）を瞬時に識別しなければなりません。動く物体に対して無差別に反応せず、色とパターンを確認して指の反射を留める能力は、味方への誤射（Friendly Fire）や釣りのスキル浪費を防ぎ、冷静な判断力を保つために直結します。"
      }
    },
    {
      "@type": "Question",
      "name": "レベル上昇に伴う落下速度、ターゲットサイズ、および罠の出現頻度の変化は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "スコア1,750点ごとにレベルが上がり、最大15レベル以上まで無制限にスケールします。標的の基本落下速度は400 px/sから最高1250 px/sへと3倍以上加速し、出現間隔は0.8秒から0.18秒へと狭まります。さらに赤い偽デコイの出現確率が初期の15%から最大45%まで激増し、極限の神経弁別が求められます。"
      }
    },
    {
      "@type": "Question",
      "name": "緑のターゲットを撃破した際に付与される0.6秒の持ち時間延長ボーナスの役割は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "セッションは45秒の制限時間で開始しますが、緑の標的を仕留めるごとに残り時間が0.6秒加算されます。ノーミスでテンポよく迎撃を継続することで持ち時間を60秒、90秒と延長させ、最大3.0倍のコンボ倍率を長く維持して24,000点以上のエリートスコアを達成するための必須システムです。"
      }
    },
    {
      "@type": "Question",
      "name": "赤い罠をクリックしてしまった場合や緑の標的を見逃した場合のペナルティは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "緑の標的が底に落ちて消滅するか、赤いデコイをクリックすると、積み上げたコンボ倍率が即座に1.0倍にリセットされます。また設定でミス減点オプションを有効にしている場合は、1回のミスにつき0.8秒のタイムロスが発生し、ラウンド終了リスクが一気に高まります。"
      }
    },
    {
      "@type": "Question",
      "name": "垂直落下の迎撃に最適なマウスの持ち方（グリップ）と視線の固定ポイントは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "マウスの上下移動を軽快にするため、手のひらをパッドから浮かせた「つまみ持ち（Fingertip）」または「つかみ持ち（Claw）」が推奨されます。視線は画面最上部ではなく「上部3分の1」の高さに柔らかく置き、物体が出現した瞬間に色を識別して落下軌道の下へマウスを先行配置する待ち伏せスタイルが極めて有効です。"
      }
    },
    {
      "@type": "Question",
      "name": "144Hz/240Hz高リフレッシュレートモニターが1250 px/sの超高速落下迎撃に与える効果は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "秒速1250pxで急降下する物体は、60Hz環境では1フレームあたり約20.8pxもワープし、激しい残像を伴います。240Hzモニターではフレームごとの移動量が5.2pxへと極小化され、残像のない滑らかな輪郭と正確な色境界が保たれるため、視覚判断のミスを劇的に抑えられます (Woods et al., 2015)。"
      }
    },
    {
      "@type": "Question",
      "name": "このドロップキャッチテストで測定された反応時間やスコアは安全に保存されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "完全に安全です。計測された弁別反応時間、捕捉精度、最高コンボ、トラップ回避率などの全データは、お使いのブラウザ内LocalStorageにのみ暗号化されて安全に保管されます。外部サーバーへの個人情報送信やトラッキングは一切行われません。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "定規落とし＆重力落下ドロップキャッチ4段階科学的トレーニング法",
  "description": "ドンデルス弁別反応とローガン衝動抑制モデルを応用し、落下標的の迎撃速度と判断精度を極大化する実践プロトコル。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "画面上部1/3への視線配置と色弁別準備 (Visual Anchoring)",
      "text": "画面最上部ではなく上部1/3のラインに視線を置き、ターゲットが出現した最初の50ms以内に緑（有効）か赤（罠）かを高速弁別します。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/drop-catch#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "ローガン停止信号に基づく衝動抑制 (Logan Inhibitory Veto)",
      "text": "赤い偽デコイを察知した瞬間、前頭葉からStop信号を発火させ、指が反射的にクリックしようとする無条件の衝動を完全に拒絶します。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/drop-catch#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "光学的タウに基づく落下先回り迎撃 (Optical Tau Interception)",
      "text": "緑の有効標的の場合、加速する落下ベクトルを先読みして進行方向の下部へカーソルを先回り配置し、シャープに捉えます。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/drop-catch#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "時間延長ボーナスの蓄積とコンボ維持 (Bonus Time & Streak Heat)",
      "text": "命中時の+0.6秒を蓄積してセッション時間を伸ばし、最大3.0倍コンボを45秒以上維持して24,000点のエリート領域へ到達します。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/drop-catch#step-4"
    }
  ]
};

const dropGuide = {
  heading: "定規落とし反射テスト＆重力落下迎撃の神経生体力学ガイド",
  intro: {
    title: "重力加速度落下と視覚弁別・衝動抑制の神経科学的メカニズム",
    paragraphs: [
      "ドロップキャッチ（Drop Catch）は、画面上部から重力加速度を受けて急降下するターゲットをミリ秒単位で捕獲し、突如混ざる赤い偽デコイの罠を冷静に見送る高精度反射神経・衝動制御トレーニングです。学校やスポーツ測定でお馴染みの「定規落としテスト（Ruler Drop Test）」をデジタル高精度環境へと進化させ、単なる落下捕捉にとどまらず、フランシスクス・ドンデルス（Donders, 1868）のC型選択弁別反応時間（Discrimination Reaction Time）と認知抑制回路を複合的に評価します。",
      "重力による自由落下運動（y = 1/2gt²）において、標的の移動速度は秒速400pxから最大1250pxまで連続的に急加速します。デイビッド・リー（Lee, 1976）の光学的タウ（Optical Tau, τ）理論によれば、視覚野は網膜上の物体の相対的拡大率から衝突までの残り時間（Time-to-Contact）をダイレクトに算出します。落下の加速度を頭で計算しようとすると反応が遅れるため、タウ信号に合わせてカーソルを落下線上に先回り配置する待ち伏せ迎撃が極めて重要となります。",
      "本ドリル最大の認知的ハードルは、不規則に出現する赤い囮（Decoy）の存在です。ゴードン・ローガン（Logan et al., 1984）の競馬モデル（Horse-Race Model）が示す通り、刺激を視認した瞬間に指が動き出そうとする無条件の「Go」衝動と、色を識別して指を止める前頭葉の「Stop」抑制信号が脳内で激しい先着争いを繰り広げます。訓練を積むことで前頭前野のトップダウン抑制が強化され、本番の焦りによる誤射や誤爆を防止します。",
      "ミリ秒精度の厳密な計測を担保するため、本システムはブラウザのperformance.now()高解像度タイマーを使用しています。144Hzおよび240Hzの高リフレッシュレートモニター環境では、1250 px/sの高速落下時でも残像を排した鮮明な色彩弁別が可能です（Woods et al., 2015）。すべての計測結果とトレーニング履歴はプライバシー保護のため端末ローカルに安全に保存されます。"
    ]
  },
  benchmarks: {
    title: "定規落とし・落下弁別反応速度 5段階スキル評価基準表",
    headers: ["階層・ランク", "称号 (Rank Title)", "基準スコア", "弁別反応時間＆精度", "総合評価", "神経生体力学プロファイル"],
    rows: [
      ["Tier 1: 頂点重力迎撃マスター", "Apex Gravitational Interceptor", "24,000点以上", "< 190ms / 95%以上", "Grade S", "上位0.1%戦闘機パイロット・プロゲーマー水準。完成されたローガン抑制制御と1250 px/s極超音速標的の無欠点迎撃 (Lee 1976; Logan 1984)"],
      ["Tier 2: 精密衝動制御ストライカー", "Precision Reflex Striker", "17,000 – 23,999点", "195 – 240ms / 90 – 94%", "Grade A", "上位10%競技eスポーツ水準。卓越した光学的タウ予測と45%高密度デコイ下での安定した3.0倍コンボ維持"],
      ["Tier 3: 熟練落下キャッチャー", "Skilled Drop Catcher", "11,000 – 16,999点", "245 – 310ms / 82 – 89%", "Grade B", "上位35%一般ゲーマー水準。確かな目と手の協応反応性と+0.6秒ボーナスを活かした粘り強い生存力"],
      ["Tier 4: 発展型反射練習生", "Developing Reflex Trainee", "6,000 – 10,999点", "311 – 370ms / 70 – 81%", "Grade C", "一般成人平均水準。速度800 px/s超過時に色彩判定が追いつかず赤いデコイの誤クリックとコンボ消失が頻発"],
      ["Tier 5: 初級トラップ学習者", "Novice Decoy Learner", "6,000点未満", "> 370ms / < 70%", "Grade D", "初心者baseline。標的の急激な落下に慌てて赤デコイに指が釣られやすい。画面上部1/3への視線固定訓練を推奨"]
    ],
    note: "ドンデルスC型弁別反応時間(Donders 1868)、リーの光学的タウ衝突予測(Lee 1976)、ローガン抑制競馬モデル(Logan 1984)に基づく客観的生体力学基準です。"
  },
  techniques: {
    title: "定規落とし反応速度＆落下迎撃極大化 4大実戦プロトコル",
    items: [
      {
        name: "上部1/3ラインへの視覚的アンカリング (Upper Third Visual Anchoring)",
        desc: "視線を画面最上部や最下部に固定してはいけません。上部1/3の高さに視覚アンカーを置き、標的が生成された最初の50ms以内に色を識別して、落下線の下へマウスを先行して落とし込みましょう。",
        tips: "標的を追いかけるのではなく、標的がこれから通過する下側の空間にマウスを置いて待ち構える意識を持ちましょう。"
      },
      {
        name: "ローガン停止信号 前頭前野抑制 (Logan Stop-Signal Veto)",
        desc: "動くものを見たら無条件でクリックしてしまう指の反射を意図的にブロックしてください。赤が目に入った瞬間、指の力を完全に脱力させて標的をそのまま下へやり過ごします。",
        tips: "赤をクリックすることは1点失うだけでなく、3.0倍の特大コンボを吹き飛ばす致命的ミスであると認識しましょう。"
      },
      {
        name: "光学的タウに基づく重力先回り迎撃 (Optical Tau Gravitational Interception)",
        desc: "標的は下へ行くほど急加速します。網膜上の垂直変位の勢いを読み取り、標的が画面中央付近を通過する最も判定を拾いやすい安全エリアでシャープに叩き落としましょう。",
        tips: "底スレスレまで引っ張らず、操作に余裕のある画面中下部の交差点で鋭く捉えてください。"
      },
      {
        name: "つまみ持ちによる垂直方向の俊敏スライド (Fingertip Vertical Micro-Steering)",
        desc: "手のひらをマウスパッドにベタ付けすると上下の引き操作に摩擦抵抗が生じます。手のひらを浮かせたつまみ持ちを維持し、指の曲げ伸ばしだけでマウスを上下に素早くスライドさせましょう。",
        tips: "腕全体を大きく動かすのではなく、指先と手首のバネを活かして垂直軌道をコントロールしましょう。"
      }
    ]
  },
  steps: [
    "背筋を伸ばして着席し、マウスを画面中央に置いて上部1/3のラインを視野に入れます。",
    "ターゲットが落下を始めたら、最初の50ms以内に緑（有効）か赤（罠）かを瞬時に判定します。",
    "緑のターゲットは落下ベクトルを先読みして捕獲し、赤のデコイはクリックを我慢して見送ります。",
    "撃破ごとに+0.6秒を獲得して制限時間を伸ばし、3.0倍コンボを維持して24,000点以上を目指します。"
  ],
  audience: "定規落としテストのデジタル精密測定を行いたい方、およびFPSや格闘ゲームで誤射防止や刹那のスキル回避力を極めたいゲーマー。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'lee1976', 'logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedDropCatchPageJa() {
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
      <DropCatchClient
        copy={{
          title: "定規落としゲーム＆ドロップキャッチ",
          subtitle: "落下標的迎撃＆赤色デコイ衝動抑制 • 15段階難易度スケーリング",
          hudLabels: {
            score: "スコア",
            time: "残り時間",
            bestScore: "自己ベスト",
            bestCombo: "最高コンボ"
          },
          rulesTitle: "ドリル進行ルールおよび採点システム",
          rulesItems: [
            { title: "緑ターゲット捕獲と制限時間延長", text: "落下する緑の標的をクリックして100点（コンボおよびレベル倍率適用）を獲得し、制限時間を0.6秒延長します。" },
            { title: "コンボ倍率の増幅", text: "ミスなく連続迎撃を継続することで、コンボ倍率が最大3.0倍まで上昇します。" },
            { title: "難易度の連続スケーリング", text: "スコア1,750点ごとにレベルが上がり、落下速度（最大1250 px/s）と赤い罠の頻度（最大45%）が激増します。" },
            { title: "罠誤爆および見逃しペナルティ", text: "緑の標的を見逃すか赤い罠をクリックするとコンボが1.0倍にリセットされ（設定時0.8秒時間減点）、危険に晒されます。" }
          ],
          aboutTitle: "ドロップキャッチと落下反応の生体力学",
          aboutSections: [
            {
              title: "重力加速度と光学的タウ（τ）衝突予測",
              subtitle: "デイビッド・リー（Lee, 1976）非線形垂直加速の衝突猶予時間算出",
              content: "落下する標的は加速します。視覚野は網膜像の垂直変位と拡大率から衝突直前の安全な迎撃座標を先回りして割り出します。"
            },
            {
              title: "衝動制御とローガン停止信号競馬モデル",
              subtitle: "ゴードン・ローガン（Logan, 1984）前頭前野の抑制制御と誤射防止",
              content: "赤い罠は「押す（Go）」と「止める（Stop）」の脳内競争を引き起こします。焦る指の誤発火を抑え込むトップダウン制御を鍛えます。"
            },
            {
              title: "ドンデルスC型（Donders Type C）弁別反応時間",
              subtitle: "単なる反射を超えた刺激弁別と運動開始プロセス",
              content: "単一の刺激に反応するだけでなく、複数の刺激から正解を選び囮を見送る高度な認知的反応性を向上させます。"
            },
            {
              title: "ウッドワース弾道フリックと着弾減速力学",
              subtitle: "ウッドワース（1899）およびフィッツ法則（1954）に基づく最適化",
              content: "落下線の下へ85%以上の距離を一気に投げ出し、微小な光学的フィードバック減速でターゲット中心にカーソルを着弾させます。"
            }
          ]
        }}
      />
      <DrillGuide {...dropGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/drop-catch" />
    </>
  );
}
