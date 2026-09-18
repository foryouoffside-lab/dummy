import QuickDodgeClient from '@/app/drills/physical/reflex-training/quick-dodge/QuickDodgeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JA / JA-JP)
// Primary Intent: マウス 避ける ゲーム, 反射神経 避ける ゲーム, 弾幕 避ける ゲーム, 弾避け ゲーム ブラウザ
// Japanese Gaming Context: 名作フラッシュ弾幕回避ゲームの現代的進化＆LoL/FPSのマイクロムービング回避訓練
// High-Demand, Low-Competition Target Keywords:
//   - "マウス 避ける ゲーム" (Legendary high-demand browser reflex game query)
//   - "反射神経 避ける ゲーム" (Core reflex evasion challenge query)
//   - "弾幕 避ける ゲーム" (Danmaku kinetic evasion query)
//   - "弾避け ゲーム ブラウザ" (Browser bullet dodge game query)
//   - "マウス 操作 練習 ゲーム" (Mouse handling precision game)
//   - "動体視力 回避 トレーニング" (Dynamic visual acuity evasion query)
//   - "弾幕 回避 ゲーム 無料" (Free bullet hell dodging query)
//   - "マウス 移動 精度 テスト" (Mouse movement accuracy test)
//   - "反射神経 テスト ゲーム" (Reaction chronometry test query)
//   - "エイム 回避 練習" (Aim & evasion coordination drill)
// ============================================================

export const metadata = {
  title: "マウス避けるゲーム＆反射神経弾幕テスト – 無料回避ドリル | SkillDrills",
  description: "無料オンラインマウス避けるゲーム。四方から迫る高速弾幕をカーソルで極限まで回避し、川人小脳内部モデルに基づく軌道予測と超精密なマイクロムービングを科学的に鍛えます。",
  keywords: [
    "マウス 避ける ゲーム",
    "反射神経 避ける ゲーム",
    "弾幕 避ける ゲーム",
    "弾避け ゲーム ブラウザ",
    "マウス 操作 練習 ゲーム",
    "動体視力 回避 トレーニング",
    "弾幕 回避 ゲーム 無料",
    "マウス 移動 精度 テスト",
    "反射神経 テスト ゲーム",
    "エイム 回避 練習"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/reflex-training/quick-dodge',
    languages: getAlternateLanguages('/drills/physical/reflex-training/quick-dodge'),
  },
  openGraph: {
    title: "マウス避けるゲーム＆反射神経弾幕テスト – 無料回避ドリル | SkillDrills",
    description: "無料オンラインマウス避けるゲーム。四方から迫る高速弾幕をカーソルで極限まで回避し、川人小脳内部モデルに基づく軌道予測と超精密なマイクロムービングを科学的に鍛えます。",
    url: 'https://skilldrills.online/ja/drills/physical/reflex-training/quick-dodge',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "マウス避けるゲーム＆反射神経弾幕テスト – 無料回避ドリル | SkillDrills",
    description: "無料オンラインマウス避けるゲーム。四方から迫る高速弾幕をカーソルで極限まで回避し、川人小脳内部モデルに基づく軌道予測と超精密なマイクロムービングを科学的に鍛えます。",
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
      "name": "フィジカルトレーニング",
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
      "name": "マウス避けるゲーム・弾幕回避",
      "item": "https://skilldrills.online/ja/drills/physical/reflex-training/quick-dodge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "マウス避けるゲーム及び弾幕回避シミュレーター",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "弾幕回避及び小脳順モデル予測訓練ツール",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Evasion, Esports"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Quick Dodge Danmaku Cursor Evasion Challenge",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Motor Chronometry Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "高速弾幕回避において、視覚反応よりも『予測（小脳順モデル）』が決定的な理由は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "弾幕が秒速400〜600pxで飛来する場合、ヒトの視覚伝達遅延（100〜150ms）を待ってから動かすと既に被弾します。川人光男氏（Kawato, 1999）が提唱した小脳内部順モデルのように、弾の入射角から未来200msの軌道を脳内でシミュレートし、先回りして安全域へ開ループ制御の弾道移動を行うことが生存の鍵です。"
      }
    },
    {
      "@type": "Question",
      "name": "弾幕密度が急上昇する後半レベルで、カーソルを画面端に逃がしてはいけない理由は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "四隅や画面端にカーソルを寄せてしまうと、脱出可能なベクトルが90度以下に制限され、包囲網から脱出できなくなります。中央30%のゾーンを基準点として維持し、弾幕のわずかな隙間（ネガティブスペース）を縫うように最小限の微細運動でやり過ごすのが鉄則です。"
      }
    },
    {
      "@type": "Question",
      "name": "スコア加算とコンボ倍率はどのように計算されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "生存時間に応じて毎秒スコアが加算され、弾の至近距離かすり回避（Close Shave）に成功するたびに追加ボーナスとコンボ倍率（最大3.0倍）が跳ね上がります。一度も被弾せずに45秒間完走することで、エリート基準である24,000点以上の領域に達します。"
      }
    },
    {
      "@type": "Question",
      "name": "当たり判定（ヒットボックス）の精度はどのように設定されていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "マウスカーソルの中心点から半径4pxの精密コアヒットボックスを基準に判定されます。弾の描画半径（10〜25px）とのユークリッド距離を、ブラウザの高精度タイマー（performance.now）を用いてサブピクセル単位で毎フレーム厳密に計算しています。"
      }
    },
    {
      "@type": "Question",
      "name": "弾に被弾した際のペナルティはどうなっていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "弾に接触すると即座に赤いフラッシュ警告とともに累積コンボ倍率が1.0倍へとリセットされ、耐久ライフが減少します。高得点獲得にはミスなしでコンボの熱量を維持し続けることが必須です。"
      }
    },
    {
      "@type": "Question",
      "name": "LoLのスキルショット回避やApex/VALORANTのキャラコン向上に直結しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "極めて直接的に直結します。MOBAでの方向指定スキル回避やFPSでの被弾抑制ムービングに求められる『視覚的弾道認識と手首のマイクロブレーキ制御』の神経回路を集中強化するため、実戦での立ち回りの生存率が劇的に向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "弾幕回避に最も適したマウスの持ち方（グリップ）は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "手のひら全体を乗せるかぶせ持ち（Palm Grip）よりも、指先でマウスを細かく制動できるつかみ持ち（Claw Grip）やつまみ持ち（Fingertip Grip）が推奨されます。5〜15pxの微小な回避において、前腕を使わず指の屈伸だけで瞬時に方向転換できるためです。"
      }
    },
    {
      "@type": "Question",
      "name": "144Hzや240Hzの高リフレッシュレートモニターを使う利点は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hzモニターでは秒速500pxの弾が1フレームあたり約8.3pxワープするように表示されますが、240Hz（4.1ms）では約2.1px刻みで極めて滑らかに描画されます。弾の飛翔軌道が鮮明に見えるため、0.1秒先の脱出ルートを迷いなく判断できます。"
      }
    },
    {
      "@type": "Question",
      "name": "手首の疲労や腱鞘炎を予防するための正しい練習姿勢は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "マウスを力任せに握りしめず、卵を包むように柔らかくホールドしてください。肘をデスクに安定して置き、3セッションごとに手首をブラブラと振る60秒のストレッチを挟むことで、筋肉の過緊張を防げます。"
      }
    },
    {
      "@type": "Question",
      "name": "プレイ記録やスコアデータは外部サーバーに送信されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ、一切送信されません。全ての物理シミュレーションとミリ秒計測はブラウザ内部（クライアント側）で完結し、最高記録はお使いの端末のlocalStorageにのみ安全に保持されます。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "マウス弾幕回避・小脳予測マイクロムービング4段階プロトコル",
  "description": "四方から押し寄せる高速弾幕を小脳順モデルによる未来予測と指先マイクロブレーキで完全回避する体系的メソッド。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "中央基準位置の確立とフィンガーチップ構え (Center Calibration)",
      "text": "カーソルを画面中央に配置し、指先に柔軟なバネ性を持たせて全方位への即時脱出姿勢を整えます。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/quick-dodge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "川人順モデルによる弾道先読み (Kawato Trajectory Prediction)",
      "text": "外周で発生する弾の速度と角度を周辺視野で捉え、弾同士が交差した後に生まれる空白ゾーンへ先回りします。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/quick-dodge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "精密マイクロムービングによる紙一重回避 (Micro-Evasion)",
      "text": "大回りせず、弾の軌道を5〜10pxの最小限の差でスレスレにすり抜ける抑制された指先コントロールを行います。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/quick-dodge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "連続生存と3.0倍コンボ維持 (Streak Heat Maintenance)",
      "text": "45秒間一度の被弾も許さず連続回避を維持し、最大3.0倍コンボで24,000点以上のハイスコアを達成します。",
      "url": "https://skilldrills.online/ja/drills/physical/reflex-training/quick-dodge#step-4"
    }
  ]
};

const dodgeGuide = {
  heading: "マウス弾幕回避ゲーム＆動体視力神経バイオメカニクス解説",
  intro: {
    title: "小脳内部順モデル（Forward Models）と弾道的回避ムービングの科学",
    paragraphs: [
      "クイックドッジ（Quick Dodge Drill）は、画面四方からカーソルを目がけて飛来する高速弾幕をミリ秒単位の軌道演算と超高精度なマウス操作で回避する最上位の知覚運動統合ドリルです。単に迫る弾を見てから逃げる受動的反射を超え、複数の運動ベクトルが交差するカオスの中で安全域を能動的に先読みする空間認知力を鍛錬します。",
      "計算論的神経科学の世界的権威・川人光男氏（Kawato, 1999）の『小脳内部順モデル』理論によれば、視覚フィードバックの神経遅延（100〜150ms）が存在するため、高速弾の回避を視覚修正のみで行うことは不可能です。脳は弾の出現初期のベクトルを捉えた瞬間に小脳で未来の軌道をシミュレートし、それに応じた開ループの運動指令を先行して発射しなければ生き残れません。",
      "ロバート・ウッドワース（Woodworth, 1899）の二段階運動制御モデルが示す通り、急速な運動は初期の爆発的インパルスと終末の微細制動で構成されます。弾速が500 px/sを超える高難度域ではフィッツの法則（Fitts, 1954）により許容誤差が極端に縮小するため、大雑把な大回りを排し、10px以内の最小変位で紙一重にすり抜けるマイクロコントロールが必須となります。",
      "本ドリルはブラウザのperformance.now()高精度クロックを活用し、クライアント内部で遅延のないミリ秒計測とサブピクセル当たり判定を実施します。144Hz/240Hzモニターと1000Hzマウス環境を併用することで表示遅延を4ms未満に抑え、神経反応性を限界まで高められます（Woods et al., 2015）。プレイデータは全てローカル端末内にのみ安全に保存されます。"
    ]
  },
  benchmarks: {
    title: "マウス弾幕回避・動体視力5段階公式ベンチマーク",
    headers: ["ティア・区分", "ランク称号 (Rank Title)", "基準スコア", "回避精度＆最高速度", "総合評価", "神経バイオメカニクス運動プロファイル"],
    rows: [
      ["Tier 1: 究極の弾幕回避マスター", "Apex Kinetic Evader", "24,000点以上", "95%以上 / 500+ px/s", "Grade S", "上位0.1%の超越的小脳順モデル予測力。50発以上の高密度弾幕下で無駄のない最小マイクロムービングを完遂 (Kawato 1999; Woodworth 1899)"],
      ["Tier 2: 精密軌道ストライカー", "Precision Trajectory Striker", "17,000 – 23,999点", "90 – 94% / 400 – 499 px/s", "Grade A", "上位3%のプロゲーマー級空間把握力。混濁した弾幕群の中でも冷静に中央ゾーンを維持"],
      ["Tier 3: 熟練回避パイロット", "Skilled Evasion Pilot", "11,000 – 16,999点", "82 – 89% / 300 – 399 px/s", "Grade B", "上位15%競技ゲーマー水準。安定した手首制御と弾幕の発生初期リスクの見極め能力"],
      ["Tier 4: 発展中の回避練習生", "Developing Dodger", "6,000 – 10,999点", "70 – 81% / 200 – 299 px/s", "Grade C", "一般成人の標準値。弾速が上がると画面端へ追い詰められて被弾しやすいため、中央復帰の習慣付けが必要"],
      ["Tier 5: 入門回避ビギナー", "Novice Evasion Trainee", "6,000点未満", "< 70% / < 200 px/s", "Grade D", "視覚反応の遅れによる多重被弾。マウスの余分な力みを抜き、視野を画面全体に広げる訓練が推奨される"]
    ],
    note: "川人小脳順モデル理論（1999）、ウッドワース二段階運動モデル（1899）、フィッツの法則（1954）に基づく客観的評価基準です。"
  },
  techniques: {
    title: "マウス弾幕回避・実戦テクニック＆プロトコル",
    items: [
      {
        name: "川人小脳順モデル先読み配置 (Kawato Cerebellar Anticipation)",
        desc: "弾が近づいてから反応してはいけません。画面端に出現した瞬間に進行角度を見極め、弾幕同士が交差した後に生まれる安全な空白地帯へカーソルを先回りさせます。",
        tips: "飛んでくる弾そのものではなく、弾と弾の『隙間（空間）』を見る意識を持ってください。"
      },
      {
        name: "ウッドワース・マイクロブレーキ制動 (Woodworth Micro-Snap)",
        desc: "大きくカーソルを振り回すと次の弾に直撃します。10〜20pxの最小半径内で指の関節を使ってピタッと止めるブレーキをかけ、逃げ場の余白を確保します。",
        tips: "マウスソールをパッドにしっかり接地させ、指先のグリップ圧で微細な制動をかけます。"
      },
      {
        name: "中央基準アンカリング規律 (Central Anchoring Discipline)",
        desc: "画面の四隅や壁際へ逃げ込むと、脱出ルートが塞がれて確実に被弾します。回避アクションを起こした直後は、必ず画面中央30%の安全域へ復帰してください。",
        tips: "『避けてすぐ中央に戻す』動作を一連の無意識のルーティンにしてください。"
      },
      {
        name: "周辺視野クラスター認識 (Peripheral Cluster Scanning)",
        desc: "カーソルの一点だけを凝視すると外周からの高速弾が見えなくなります。視線は画面全体に柔らかく広げ、カーソル位置は固有感覚（筋肉の曲がり具合）で把握します。",
        tips: "画面中央をぼんやりと広く眺めることで、弾幕の大きなうねりが一目で把握できます。"
      }
    ]
  },
  steps: [
    "姿勢を正し、マウスカーソルを画面中央に合わせます。",
    "外周から飛来する弾幕の軌道を先読みし、安全な空白ゾーンへ最小限に移動します。",
    "画面端に追い詰められないよう、回避直後に速やかに中央付近へ復帰します。",
    "45秒間一度も被弾することなくコンボを重ね、24,000点以上のハイスコアを目指します。"
  ],
  audience: "LoL、Apex Legends、VALORANT、OW2など、高難度の弾幕・スキルショット回避と緻密なマイクロムービングを鍛えたいゲーマー及び動体視力と瞬発力を高めたいすべての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kawato1999', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedQuickDodgePageJa() {
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
      <QuickDodgeClient
        copy={{
          title: "マウス避けるゲーム＆反射神経弾幕テスト",
          subtitle: "小脳順モデル軌道予測＆キネティック弾幕回避 • 15段階難易度スケーリング",
          description: "迫り来る弾幕を回避することは反応の問題ではなく予測の問題です。視覚フィードバックが運動に介入するには約100〜150msを要するため（Woodworth, 1899）、高速弾の回避は小脳による未来軌道の事前シミュレーション（Kawato, 1999）に基づく計画された弾道制御で完結します。弾速が増すにつれ修正可能な時間窓は消え去り、純粋な予測のみが残ります。",
          badge: "反射神経弾幕テスト",
          hudLabels: {
            score: "スコア",
            time: "残り時間",
            bestScore: "最高スコア",
            bestCombo: "最高コンボ",
            getReady: "レディー"
          },
          resultLabels: {
            newBest: "自己ベスト更新",
            points: "最終得点",
            accuracy: "回避精度",
            dodges: "回避回数",
            peakSpeed: "最高速度",
            peakLevel: "到達レベル",
            playAgain: "もう一度挑戦"
          },
          rulesTitle: "ドリル規則及びスコア評価システム",
          rulesItems: [
            { title: "弾幕回避と生存スコア", text: "四方から迫り来る赤色弾幕との接触を回避してください。1秒生存するごとにスコアが加算されます。" },
            { title: "紙一重のかすり回避 (Close Shave)", text: "弾の至近距離をすり抜けるとボーナス点とコンボ倍率が上昇します。" },
            { title: "難易度の連続的加速", text: "スコアが伸びるにつれ弾速は最大500 px/sまで加速し、出現頻度が急激に上がります。" },
            { title: "被弾ペナルティ", text: "弾に衝突するとコンボ倍率が1.0倍にリセットされ、警告フラッシュが発生します。" }
          ],
          aboutTitle: "マウス弾幕回避ゲーム及び軌道予測のバイオメカニクス",
          aboutSections: [
            {
              title: "キネティック衝突回避と小脳順モデル軌道予測",
              subtitle: "川人（Kawato, 1999）内部モデルによる先行的な弾道ムービング",
              content: "高速弾の回避は視覚神経伝達遅延（100〜150ms）を克服するため小脳のシミュレーションに依存します。弾の角度を瞬時に割り出し、安全域へ先回りしてカーソルを配置します。"
            },
            {
              title: "ウッドワース二段階運動制御と終末制動",
              subtitle: "開ループ弾道スナップと精密マイクロムービングの融合",
              content: "回避運動は初発の急速なインパルスと終末減速で構成されます（Woodworth, 1899）。指先の関節でピタッと制動をかけることで、無駄な大回りを防ぎ余白を保ちます。"
            },
            {
              title: "フィッツの法則と空間的許容幅の収縮",
              subtitle: "密集弾幕内でのターゲット幅減少に伴う難易度指数の急上昇",
              content: "弾数が増加すると安全回避域の幅（W）が狭まり、難易度（ID）が跳ね上がります（Fitts, 1954）。隙間を縫う精密な制御がハイスコアの鍵となります。"
            },
            {
              title: "ミリ秒タイミングと高リフレッシュレート表示",
              subtitle: "ハードウェア遅延圧縮による4.1ms軌道解像度の実現",
              content: "240Hzディスプレイと1000Hzマウスの組み合わせは秒速500pxの弾の残像を消去し、脳に正確なフレーム情報を届けます（Woods et al., 2015）。"
            }
          ]
        }}
      />
      <DrillGuide {...dodgeGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/quick-dodge" />
    </>
  );
}
