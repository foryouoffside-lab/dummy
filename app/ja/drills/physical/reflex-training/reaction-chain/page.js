import ReactionChainClient from '@/app/drills/physical/reflex-training/reaction-chain/ReactionChainClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JA / JP)
// Primary Intent: マウス エイム ブレーキング 練習, 衝動 抑制 反射 トレーニング, マウス 停止 反応 テスト
// Japanese Gaming Context: VALORANT / Apex / CS2 オーバーフリック(Over-flicking)矯正, 初弾ヘッドショット静止力, 運動抑制神経ドリル
// High-Demand, Low-Competition Target Keywords:
//   - "衝動 抑制 反射 トレーニング" (Impulse inhibition reflex training)
//   - "マウス 停止 反応 テスト" (Mouse stop reaction test)
//   - "運動 抑制 反応 ドリル" (Motor inhibition reaction drill)
//   - "マウス エイム ブレーキング 練習" (Mouse aim braking practice)
//   - "オーバーフリック 矯正 マウス" (Over-flicking correction mouse)
//   - "マウス 減速 コントロール ゲーム" (Mouse deceleration control game)
//   - "マウス 精度 テスト" (Mouse precision test)
//   - "反応 速度 ゲーム" (Reaction speed game)
// ============================================================

export const metadata = {
  title: "マウス エイムブレーキング – 衝動抑制反射トレーニング | SkillDrills",
  description: "高速移動するノードを迎撃しカーソル慣性を瞬間ゼロ静止（Kinetic Arrest）させる神経生体力学ドリル。ローガン競走モデル（Logan & Cowan, 1984）に基づくオーバーフリック矯正訓練。",
  keywords: [
    "衝動 抑制 反射 トレーニング",
    "マウス 停止 反応 テスト",
    "運動 抑制 反応 ドリル",
    "マウス エイム ブレーキング 練習",
    "オーバーフリック 矯正 マウス",
    "マウス 減速 コントロール ゲーム",
    "マウス 精度 テスト",
    "反応 速度 ゲーム",
    "エイム ストッピング 練習",
    "マウス ブレーキ 測定"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/reflex-training/reaction-chain',
    languages: getAlternateLanguages('/drills/physical/reflex-training/reaction-chain'),
  },
  openGraph: {
    title: "マウス エイムブレーキング – 衝動抑制反射トレーニング | SkillDrills",
    description: "標的を迎撃した直後に慣性を急制動させる専門ドリル。オーバーフリックを根絶しVALORANTやCS2の初弾ストッピング精度を極限まで高めます。",
    url: 'https://skilldrills.online/ja/drills/physical/reflex-training/reaction-chain',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
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
      "name": "練習ドリル",
      "item": "https://skilldrills.online/ja/drills"
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
      "name": "リアクション・チェーン（エイムブレーキング）",
      "item": "https://skilldrills.online/ja/drills/physical/reflex-training/reaction-chain"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "マウス エイムブレーキング & 衝動抑制反射トレーニング (Reaction Chain)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "高速移動ノードのインターセプト直後にマウスカーソルの運動慣性を完全相殺（Kinetic Arrest）する運動抑制・減速制御トレーニングツール。",
  "url": "https://skilldrills.online/ja/drills/physical/reflex-training/reaction-chain",
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
  "name": "マウス エイムブレーキング – 衝動抑制反射トレーニング | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/physical/reflex-training/reaction-chain",
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "マウス エイムブレーキング & 衝動抑制反射トレーニング",
  "url": "https://skilldrills.online/ja/drills/physical/reflex-training/reaction-chain",
  "genre": ["Reflex Game", "Motor Control Trainer", "Esports Precision"],
  "playMode": "SinglePlayer",
  "description": "最大1,800 px/sの高速ノードを捉え、カーソル速度を1.5 px/フレーム以下へ瞬時に急停止させることでコンボを伸ばす本格エイムブレーキングゲーム。"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "なぜマウスを素早く加速するよりも、正確にピタッと止めるほうが神経学的に難しいのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "筋肉の加速は主動筋（アゴニスト）の単一の爆発的収縮で成立しますが、精密な停止は逆方向の拮抗筋（アンタゴニスト）がミリ秒単位で反動力を生み出し、運動エネルギーを正確に相殺しなければなりません。ウッドワース（Woodworth, 1899）の2相運動制御理論で示された通り、制動局面では視覚・体性感覚フィードバックの遅延（100〜150ms）が介在するため、ブレーキのタイミングが狂うと慣性による行き過ぎ（オーバーシュート）が発生します。"
      }
    },
    {
      "@type": "Question",
      "name": "ローガンとコーワン（Logan & Cowan, 1984）が提唱した「競走モデル（Race Model）」とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "競走モデルは、運動を開始する「Goプロセス」と、それを抑制・制動する「Stopプロセス」が大脳基底核内で互いに独立してフィニッシュラインを争うという神経科学理論です。停止シグナルが入力された際、StopプロセスがGoプロセスの慣性を先回りして遮断できた場合にのみ、筋肉収縮が抑止され標的枠内で完璧に静止できます。"
      }
    },
    {
      "@type": "Question",
      "name": "停止シグナル反応時間（SSRT: Stop-Signal Reaction Time）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SSRTは大脳右下前頭回（rIFG）および視床下核（STN）が、既にトリガーされた運動指令を急停止させるために要する純粋な神経潜時（通常180〜250ms）です（Verbruggen & Logan, 2008）。SSRTが短い選手ほど、敵の急な切り返しや誤ったフリックを瞬時にキャンセルし、正確なヘッドライン上でエイムを急停止させることができます。"
      }
    },
    {
      "@type": "Question",
      "name": "VALORANTやCS2でオーバーフリック（Over-flicking）が起きてしまう生体力学的要因は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "前腕屈筋群と伸筋群の共収縮（Co-contraction）バランスの崩れが主な原因です。スピードを意識しすぎて初動で過剰な運動エネルギーを与えると、マウスパッドの摩擦抵抗をマウスの慣性が突き破り標的を行き過ぎてしまいます。本ドリルは指先（フィンガーチップ）とマウス側面圧による機械的摩擦ブレーキを身体化します。"
      }
    },
    {
      "@type": "Question",
      "name": "フィッツの法則（Fitts, 1954）はノードの速度や縮小に対してどのように難易度を押し上げますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "フィッツの法則によれば、運動の難易度指数（ID）は移動距離（D）と標的幅（W）の比率の対数に比例します。ノードが1,800 px/sに加速し有効停止半径が小さくなると、許容される減速誤差ウィンドウが極限まで縮小し、視覚フィードバックに頼らない完璧な開ループ弾道制動が必須となります。"
      }
    },
    {
      "@type": "Question",
      "name": "キネティック・アレスト（Kinetic Arrest）判定の「1.5 px/フレーム以下」は何を意味していますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "標的をマウスでかすめながら通り過ぎる「スライススルー（Slice-through）」の不正判定を排除するための厳密なしきい値です。144Hz環境において1.5 px/フレームは秒速216px未満に相当し、筋肉が能動的なブレーキをかけ静摩擦状態に達したことを数学的に証明します。"
      }
    },
    {
      "@type": "Question",
      "name": "マウスパッドやソールの静摩擦係数はエイムブレーキングにどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "摩擦が極めて低いガラスパッドやスピード系布パッドは初動の軽快さに優れますが、制動時に拮抗筋へ極度の負担をかけオーバーシュートを招きやすくなります。制動制御の練習には、適度な動摩擦と確実な静摩擦を両立するコントロール系ハイブリッド布パッドが最適です。"
      }
    },
    {
      "@type": "Question",
      "name": "高リフレッシュレート（144Hz/240Hz）ディスプレイは運動抑制トレーニングになぜ不可欠ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Woods et al. (2015)の研究によると、60Hz環境（フレーム間隔16.6ms）ではノードの微小な減速タイミングが残像でぼやけ、網膜での光学的認識が遅れます。240Hz環境（4.1ms）ではサブピクセル単位で滑らかな減速軌道が描画され、大脳皮質が10ms以上素早くブレーキ指令を発令できます。"
      }
    },
    {
      "@type": "Question",
      "name": "1日の推奨トレーニング時間と神経疲労のケア方法は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "エイムブレーキングは脳の抑制性シナプスエネルギーを著しく消費するため、1日15〜20分（45秒ドリルを10〜15回、セット間45秒休憩）が推奨されます。疲労が蓄積するとブレーキ反応が鈍り手首に過剰な力みが生じるため、手首のこわばりを感じたら直ちに休憩してください。"
      }
    },
    {
      "@type": "Question",
      "name": "このドリルの成果を実際のFPS対戦へ効率よく還元する秘訣は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ゲーム内実効感度（eDPI）とマウスクリック時のグリップ姿勢を完全に一致させてください。ドリルを行う際、「標的をクリックする」意識ではなく「標的の中心でカーソルをピタッと静止固定する」感覚に集中することで、実戦での初弾ヘッドショット精度が劇的に向上します。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "マウス エイムブレーキング & 衝動抑制反射トレーニングの手順",
  "description": "飛来するノードを確実にインターセプトし、カーソルの物理的慣性をゼロに収束させる4段階のブレーキングプロトコル。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "ポインターロックの有効化と中心構え",
      "text": "画面をクリックしてマウスカーソルをゲーム領域にロックし、クロスヘアを中央に構えます。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "ノード迎撃と弾道フリックの展開",
      "text": "外周から現れるノードの飛行ベクトルを読み、距離の80%まで素早く鋭い1次フリックを繰り出します。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "拮抗筋急制動とキネティック・アレスト（Kinetic Arrest）",
      "text": "カーソルがノード境界内に入った瞬間、パッドへの下向き押し込みと指先のホールド力で速度を1.5 px/フレーム以下へ急停止させます。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "コンボ継続と高速スケーリングの攻略",
      "text": "ミスなく連続静止を成功させて最大3.0倍コンボを蓄積し、最大1,800 px/sの超高速ノードを攻略して15,000点突破を目指します。"
    }
  ]
};

const guideProps = {
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "衝動抑制の神経メカニズムとエイムブレーキング（Kinetic Arrest）の生体力学",
    paragraphs: [
      "マウスを標的に向けて素早く振り抜くことよりも、目標座標で1ピクセルも滑らせずにピタッと静止させることのほうが神経生体力学的に遥かに困難です。一般的なエイム練習ツールが標的をクリックする瞬間のみを重視するのに対し、リアクション・チェーンドリルは高速ノードを迎撃した直後にカーソルの運動慣性を強制停止させる最高峰の運動抑制（Motor Inhibition）能力を鍛え上げます。",
      "認知神経科学の金字塔であるローガンとコーワン（Logan & Cowan, 1984）の「競走モデル（Race Model）」によれば、運動を駆動する「Goプロセス」とそれを急停止させる「Stopプロセス」は大脳基底核内で並列に競い合っています。超高速で移動する標的上にカーソルを静止させるには、大脳右下前頭回（rIFG）および視床下核（STN）からの迅速な拮抗筋動員指令がGoプロセスの慣性に打ち勝たなければなりません（Verbruggen & Logan, 2008）。",
      "ウッドワース（Woodworth, 1899）の2相運動制御モデルが明かした通り、鋭いエイムは初動で大半の距離を詰める開ループ弾道インパルスと、終端での閉ループ微調整から成り立ちます。フィッツの法則（Fitts, 1954）に基づきノード速度が1,800 px/sに達すると視覚フィードバックを待つ時間猶予は完全に消失するため、小脳の内部モデルが予測した精密な減速タイミングのみがオーバーフリックを防ぐ防壁となります。",
      "本モジュールはブラウザのperformance.now()高精度タイマーを用い、カーソルの瞬間フレーム変位をリアルタイム監視して1.5 px/フレーム未満の制動達成を厳密に判定します。144Hzや240Hzの高リフレッシュレートモニターと1000Hzポーリングレートのマウスを用いることで、入力遅延を4ms未満に抑え最適な運動学習効果を引き出します（Woods et al., 2015）。"
    ]
  },
  benchmarks: {
    title: "エイムブレーキング・運動抑制 公式5段階ベンチマーク",
    headers: ["階層・ティア", "称号 (Rank Title)", "スコア基準値", "迎撃静止成功率", "総合グレード", "神経生体力学プロファイル"],
    rows: [
      ["Tier 1: 究極のエイム制動マスター", "Apex Kinetic Arrester", "15,000点以上", "95%以上 / 1500+ px/s", "Grade S", "上位0.1%水準の驚異的衝動抑制力。1,800 px/sの超高速ノードでもオーバーフリックを一切起こさず瞬時ゼロ静止を完遂（Logan 1984; Woodworth 1899）"],
      ["Tier 2: 精密キネティックスナイパー", "Precision Kinetic Sniper", "11,000 – 14,999点", "90 – 94% / 1200 – 1499 px/s", "Grade A", "上位3%プロゲーマー級の制動精度。鋭い初動フリック後も指先の摩擦力でカーソルを完璧にターゲット内にアンカー可能"],
      ["Tier 3: 熟練の弾道制御パイロット", "Skilled Deceleration Pilot", "7,500 – 10,999点", "82 – 89% / 900 – 1199 px/s", "Grade B", "上位15%競技ランク帯水準。安定した中速域制動力を誇るが、超高速域で稀にスライススルーが発生"],
      ["Tier 4: 発展途上のブレーキ練習生", "Developing Stopper", "4,000 – 7,499点", "70 – 81% / 600 – 899 px/s", "Grade C", "一般成人平均値。慣性に引きずられて標的を行き過ぎる傾向があり、手首の力み抜きとブレーキ感覚の習得が課題"],
      ["Tier 5: 減速初級訓練生", "Novice Arrester Trainee", "< 4,000点", "< 70% / < 600 px/s", "Grade D", "運動抑制の遅れによるミスが頻発。拮抗筋の動員とマウスパッドへの下向き摩擦ブレーキの基礎練習が必要"]
    ],
    note: "ローガン競走モデル（1984）、ウッドワース2相運動モデル（1899）、フィッツの法則（1954）に基づく標準測定基準です。"
  },
  techniques: {
    title: "エイムブレーキング実戦テクニック & プロトコル",
    items: [
      {
        name: "ローガン競走モデル制動（Logan Kinetic Brake）",
        desc: "ノードに接触してから止まろうとしても脳の神経遅延により必ずオーバーシュートします。ノード手前80%の距離に達した瞬間に脳内でStopプロセスを先発させ、進入と同時に速度をゼロへ落としてください。",
        tips: "ノードを「叩く」のではなく、ノードの中心へマウスを「突き刺して固定する」イメージで制動します。"
      },
      {
        name: "指先ダウンフォース摩擦制動（Fingertip Downforce Braking）",
        desc: "手首の関節筋力だけでマウスを止めようとしないでください。制動の瞬間に指先のグリップ圧を微小に強め、マウスセンサーをパッドへわずかに押し下げることでパッドの静摩擦力を機械的に活用します。",
        tips: "マウスパッドの適度なクッション性を沈み込ませ、マウスソールの摩擦抵抗を瞬間的に高めます。"
      },
      {
        name: "スライススルー（通り抜けミス）の完全根絶",
        desc: "ノードをかすめながらクリックする癖は実戦での弾道ブレを招きます。カーソルがノード枠内で完全に静止し「ARREST READY」の緑インジケーターが点灯する静止クオリティを最優先してください。",
        tips: "速度よりも、枠内で0.1秒確実に静止しきる丁寧さを徹底してください。"
      },
      {
        name: "3.0xコンボストリーク維持プロトコル",
        desc: "ミスや通り抜けが発生するとスコアは減点されませんがコンボ倍率が1.0xへリセットされます。低速の序盤レベルで100%の静止成功率を保ち、3.0倍の最大倍率を維持したまま高速レベルへ挑んでください。",
        tips: "トータルスコアの8割は3.0倍コンボ維持区間で爆発的に加算されます。"
      }
    ]
  },
  steps: [
    "マウスポインターを中央に揃え、安定したフィンガーチップまたはクローグリップを確認します。",
    "出現するノードに向けて鋭く力強い1次弾道フリックを展開します。",
    "ノード境界線へ到達する直前に拮抗筋と指先ダウンフォースで速度を1.5 px/フレーム以下へ急制動します。",
    "45秒間ノーミスで連続制動を完遂し、3.0倍コンボを維持して15,000点突破を達成します。"
  ],
  audience: "VALORANT、CS2、Overwatch 2、Apex Legendsなどで高難度フリックのオーバーシュートを矯正し、精密無比な初弾ヘッドショットストッピング力を身につけたいすべてのFPSゲーマー。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedReactionChainPageJa() {
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
      <ReactionChainClient
        copy={{
          title: "マウス エイムブレーキング & 衝動抑制トレーニング",
          subtitle: "キネティック・アレスト & 運動減速制御 • 15段階スピードスケーリング",
          badge: "衝動抑制反射トレーニング",
          description: "マウスを標的に向かって素早く加速させることよりも、目標座標でピタッと静止させることのほうが神経生体力学的に遥かに困難です。運動指令と停止指令は大脳基底核内で互いに独立して競走しており（Logan & Cowan, 1984）、終端の制動が遅れれば慣性によるオーバーフリックが発生します（Woodworth, 1899）。飛来するノードを迎撃し、カーソルを瞬時にゼロ静止させてオーバーフリックを根絶しましょう。",
          hudLabels: {
            score: "スコア",
            time: "残り時間",
            accuracy: "静止精度",
            bestScore: "最高記録",
            getReady: "準備してください"
          },
          pauseTitle: "トレーニング一時停止",
          pauseSubtitle: "画面をクリックするとカーソルロックが再開されます。",
          resultLabels: {
            newBest: "自己ベスト更新",
            points: "獲得ポイント",
            accuracy: "制動精度",
            totalArrests: "迎撃静止成功数",
            maxCombo: "最大コンボ",
            peakLevel: "到達レベル",
            playAgain: "もう一度挑戦"
          },
          rulesTitle: "ドリル規則 & スコアリングシステム",
          rulesItems: [
            { title: "キネティック・アレスト（+50点）", text: "飛来するノードを迎撃し、ノード枠内でカーソルを完全静止（ARREST READY）させると50点を獲得します。" },
            { title: "コンボマルチプライヤー（最大3.0x）", text: "ミスなく連続で迎撃静止を成功させるとコンボ倍率が上昇し、最大3.0倍までスコアが加速します。" },
            { title: "スライススルー & ミス警告", text: "静止せずにノードをかすめ通り抜けたり迎撃に失敗すると、コンボがリセットされます（減点はありません）。" },
            { title: "超高速スピードスケーリング", text: "スコアの上昇に伴いノード速度が最大1,800 px/sまで加速し、有効停止半径が縮小します。" }
          ],
          aboutTitle: "エイムブレーキング & 衝動抑制の神経生理学",
          aboutSections: [
            {
              title: "運動減速制御と反応抑制の神経生理学",
              content: "リアクション・チェーンはプレイヤーの減速制御力と運動抑制（Response Inhibition）能力を集中強化します。動く標的を単にクリックするだけでなく、飛来ノードを迎撃した直後に前腕の拮抗筋を強く収縮させ、カーソルの運動エネルギーをノード境界内で完全に相殺・吸収する必要があります。"
            },
            {
              title: "ローガン競走モデルと初弾ヘッドショット安定化",
              content: "規則的なキネティック・アレスト訓練は視床下核（STN）と運動皮質を再配線し、急速運動ブレーキ神経回路を強化します（Logan et al., 1984）。これにより実戦FPSで頻発するオーバーフリックを根本から矯正し、VALORANTやCS2における鋭利な初弾ストッピング精度を完成させます。"
            }
          ],
          aboutCards: [
            {
              title: "対象プレイヤー",
              desc: "オーバーフリックを根絶したいFPSゲーマーおよび迅速な神経筋運動静止力を求めるアスリート。",
              bgClass: "bg-blue-600/30",
              iconClass: "text-blue-400"
            },
            {
              title: "強化される能力",
              desc: "精密減速力、マウスパッド静摩擦コントロール、停止シグナル抑制（SSRT）、空間迎撃予測力。",
              bgClass: "bg-emerald-600/30",
              iconClass: "text-emerald-400"
            },
            {
              title: "キネティック制動",
              desc: "最大1,800 px/sのノードを1.5 px/フレーム以下へ急停止させ、3.0倍コンボを最大維持。",
              bgClass: "bg-purple-600/30",
              iconClass: "text-purple-400"
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/reaction-chain" />
    </>
  );
}
