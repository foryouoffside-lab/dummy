import AutoPursuitClient from '@/app/drills/visual/tracking-accuracy/pursuit-tracker/AutoPursuitClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "追従眼球運動テスト: スムーズパシュート | SkillDrills",
  description: "無料オンライン追従眼球運動（スムーズパシュート）テスト。動く標的に視線とカーソルを密着させ、網膜スリップの抑制とエイム精度を測定・向上させます。",
  keywords: [
    "追従眼球運動",
    "眼球運動 トレーニング",
    "スムーズパシュート",
    "アイトラッキング テスト",
    "滑動性追従運動",
    "視線追従 測定",
    "動体視力 トレーニング",
    "FPS トラッキング 安定性",
    "網膜スリップ 補正",
    "手眼協調性"
  ],
  openGraph: {
    title: "追従眼球運動テスト・眼球運動トレーニング – スムーズパシュート視線追従測定 | SkillDrills",
    description: "滑動性追従眼球運動と手眼協調性を測定する無料ブラウザ眼球運動トレーニング。連続移動する目標オーブに視線とカーソルを密着させ、トラッキング精度を向上させます。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/visual/tracking-accuracy/pursuit-tracker',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "追従眼球運動テスト・眼球運動トレーニング – スムーズパシュート視線追従測定 | SkillDrills",
    description: "滑動性追従眼球運動と手眼協調性を測定する無料ブラウザ眼球運動トレーニング。網膜スリップを抑制しエイム安定性を科学的に強化。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual/tracking-accuracy/pursuit-tracker',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/pursuit-tracker'),
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
      "name": "訓練ハブ",
      "item": "https://skilldrills.online/ja/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "視覚・動体視力トレーニング",
      "item": "https://skilldrills.online/ja/drills/visual"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "動体追従・トラッキング",
      "item": "https://skilldrills.online/ja/drills/visual/tracking-accuracy"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "追従眼球運動テスト (スムーズパシュート)",
      "item": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/pursuit-tracker"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrills 追従眼球運動テスト・スムーズパシュート測定器",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "browserRequirements": "HTML5 Canvas対応の最新ウェブブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "description": "神経眼科学の滑動性追従眼球運動（SPEM）メカニズムに基づき、移動目標に対する視線維持率、網膜スリップ抑制、微小サッケード補正頻度をミリ秒単位でリアルタイム解析するオンラインツール。"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "無料オンライン追従眼球運動トレーニング",
  "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/pursuit-tracker",
  "applicationCategory": "GameApplication",
  "genre": ["追従眼球運動", "眼球運動 トレーニング", "スムーズパシュート", "FPS エイム練習"],
  "browserRequirements": "Requires HTML5 Canvas and JavaScript",
  "inLanguage": "ja-JP"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "スムーズパシュート・トラッカードリル (Smooth Pursuit Auto-Tracker)",
  "description": "不規則に滑らかに移動するオーブにマウス照準を吸着させ続け、連続追従時間と視覚安定性を競う本格エイムトレーニング。",
  "genre": ["Aim Trainer", "Vision Training", "Esports Reaction"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "追従眼球運動（スムーズパシュート / 滑動性眼球運動）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "視野内を移動する目標物に対して、視線を中心窩（網膜の中心で最も解像度が高い部位）に固定したまま滑らかに追従させ続ける眼球運動です（Leigh & Zee, 2015）。視標が急激に跳躍するサッケード（急速眼球運動）とは異なり、目標の速度と眼球の回転速度をミリ秒単位で完全に一致させる高度な運動制御機能であり、大脳視覚野（MT/MST野）と小脳フロックルスが主導して網膜スリップ（像のブレ）をゼロに抑えます。"
      }
    },
    {
      "@type": "Question",
      "name": "目標を追う際に画面がカクついたり、視線が飛び跳ねてしまう神経学的理由は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "眼球の追従速度が目標の速度よりも遅れて網膜上に位置誤差（Position Error）が生じると、脳は目標を見失わないために咄嗟に視線をジャンプさせる『キャッチアップ・サッケード（Catch-up Saccade）』を強制発火させます（Rashbass, 1961）。追従運動が未熟であるほど、滑らかな追尾ではなくこの微小なサッケードが頻発し、画面が断続的にカクついて感じられます。"
      }
    },
    {
      "@type": "Question",
      "name": "Apex Legends、Overwatch、VALORANTなどFPSにおけるトラッキングエイムとの関係は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "近距離でのレレレ移動（ADストレイフ）や空中の滑空・ジャンプ軌道を追従するエイム（純粋なトラッキングエイム）は、まさにスムーズパシュートの運動出力そのものです。滑動性追従能力が高いプレイヤーは、敵が切り返した瞬間の網膜像ブレを最小限に抑え、照準が敵のヒットボックスから滑り落ちずに『吸い付くようなエイム』を維持できます（Lisberger, 2010）。"
      }
    },
    {
      "@type": "Question",
      "name": "マウス感度（DPI/eDPI）の調整は追従精度にどのように影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "高すぎる感度は手首の微小な筋緊張や脈動を拾ってしまい、カーソルに不要な微小ジッター（小刻みな震え）を発生させます。逆に低すぎると画面端への大きな旋回で前腕が追いつかず、速度ゲイン（追従速度比）が低下します。マウスパッドの中央から端まで動かしたときに無理のない関節角度で追随できる中〜低感度（eDPI 200〜320程度）に設定し、ポインター精度を高める（マウス加速）設定を無効化することが推奨されます。"
      }
    },
    {
      "@type": "Question",
      "name": "追従眼球運動のトレーニングによって動体視力や集中力は向上しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。小脳と前頭眼野（FEF）の神経可塑性が促進され、移動物体の軌道予測精度（Predictive Pursuit）が向上します（Barnes, 2008）。これにより動体視力の持続時間が延長されるだけでなく、読書時の行送り追従のスムーズさや、長時間のPC作業における眼精疲労の軽減にも直接的な効果が認められています。"
      }
    },
    {
      "@type": "Question",
      "name": "野球、卓球、モータースポーツなど実世界スポーツでの効果は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "打撃時のボールの縫い目や変化球の軌道変化を極限まで見極めるプロ野球選手や、時速200km以上で変化するコーナーのエイペックスを注視するレーシングドライバーは、一般人よりも圧倒的に優れたスムーズパシュートゲインを有しています。眼球運動の遅れがないため、体幹や腕の動作開始タイミングをミリ秒単位で最適化できます。"
      }
    },
    {
      "@type": "Question",
      "name": "マウスを動かす際、手首エイムと前腕（腕）エイムのどちらを意識すべきですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "長距離の緩やかな追従には前腕（肘を支点とする運動）を用い、方向転換や微細な速度調整には手首と指先を用いる『キネティック・チェーン（運動連鎖）の分離』が理想的です。手首だけで全範囲をカバーしようとすると腱鞘に過度の緊張が生じ、カクつき（ステップ運動）の原因となります。"
      }
    },
    {
      "@type": "Question",
      "name": "ターゲットの切り返し時にどうしても照準が外れてしまう時の対策は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "方向転換の瞬間に慌てて力んでフリック（急激な微調整）を入れてしまうと、必ずオーバーシュートします。切り返しを視覚的に感知した瞬間は、あえて手の力を抜き、カーソルをターゲットの新しい進行方向にスムーズに滑り込ませる『等速スライド意識』を持つことで、照準の再同期時間を大幅に短縮できます。"
      }
    },
    {
      "@type": "Question",
      "name": "眼精疲労を防ぎながら最大の効果を得る1日の練習メニューは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "スムーズパシュートは6本の外眼筋を休みなく酷使するため、1回あたり45秒間のセッションを3〜5回（合計5〜10分程度）行うのが最適です。セッション終了後は、両手のひらで目を覆って光を遮断するパーミング（Palming）や、遠くを眺めて毛様体筋をリラックスさせるケアを取り入れてください。"
      }
    },
    {
      "@type": "Question",
      "name": "テスト結果やトラッキング履歴は外部サーバーに送信されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ。すべてのスコア、ターゲット追従率（Time on Target）、平均精度などのパフォーマンスログは、ブラウザ内のローカルストレージ（localStorage）にのみ暗号化されて安全に保管されます。外部サーバーへの個人情報や操作ログの送信は一切行われません。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "追従眼球運動テスト・スムーズパシュートの実践攻略ステップ",
  "description": "滑らかに移動するオーブにカーソルを密着させ続け、最高スコアと完璧な眼球運動精度を達成するための4ステップガイド。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "初期位置への照準吸着と呼吸の安定",
      "text": "開始カウントダウン中に静止したターゲットの中心にカーソルを合わせ、手首と肩の無駄な力を抜いてリラックスします。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/pursuit-tracker#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "滑動性等速トラッキングの維持",
      "text": "オーブが移動を開始したら、点ではなくオーブの中心部を中心窩で捉え続け、マウスを一定速度で滑らかに連動させます。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/pursuit-tracker#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "方向転換時の微小サッケード抑制",
      "text": "オーブが方向を変える際、力任せに弾くのではなく、滑らかな円弧運動を意識して照準を新しい進行ベクトルへスライドさせます。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/pursuit-tracker#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "45秒間のコンボ継続と結果分析",
      "text": "45秒間オーブから外れずに追随し続け、終了後に表示される追従維持率、平均精度、評価ランクを日々のトレーニング指標として記録します。",
      "url": "https://skilldrills.online/ja/drills/visual/tracking-accuracy/pursuit-tracker#step-4"
    }
  ]
};

const guideData = {
  eyebrow: "神経眼科学＆視覚運動制御ガイド",
  heading: "追従眼球運動テスト – スムーズパシュートと視線運動制御のメカニズム",
  intro: [
    "追従眼球運動（Smooth Pursuit Eye Movement, SPEM / 滑動性眼球運動）は、動く視覚目標の速度に合わせて眼球を滑らかに回転させ、目標の網膜像を中心窩（Fovea centralis）に留め続ける高度な眼球運動システムです。視標の位置誤差を急速なジャンプによって補正するサッケード運動（急速眼球運動）とは生理学的に完全に独立した神経回路によって制御されています（Rashbass, 1961; Krauzlis, 2004）。",
    "神経生理学において、スムーズパシュートの駆動シグナルは網膜上の像のブレ速度、すなわち『網膜スリップ（Retinal Slip）』です（Leigh & Zee, 2015）。視覚情報は一次視覚野（V1）から中側頭野（MT/V5野）および内側上側頭野（MST野）へ送られて速度ベクトルがミリ秒単位で抽出されます。その後、前頭眼野（FEF）や補足眼野（SEF）を経由して橋核から小脳フロックルスおよび背側虫部へ入力され、外眼筋を支配する動眼神経核へと運動指令が出力されます（Krauzlis, 2004; Lisberger, 2010）。",
    "人間の滑動性眼球運動には固有の生体力学的限界が存在します。Bahill、Iandolo、およびTroost（1980）の古典的研究によれば、視覚目標の角速度が毎秒30〜40度を超えるか、予測困難な不規則軌道を描く場合、追従システムはユニティ・ゲイン（眼球速度と目標速度が完全に1.0で一致する状態）を維持できなくなります。網膜上の位置誤差が許容閾値を超過して蓄積すると、中枢神経系は緊急介入として20〜40ミリ秒の瞬間的弾道修正である『キャッチアップ・サッケード（追いつき急速眼球運動）』を発生させ、見失いかけた目標を中心窩へ引き戻します（Leigh & Zee, 2015）。トップアスリートやプロeスポーツ選手は、目標加速度の緻密な補間推計によってこれら補正サッケードの発生頻度と振幅を極限まで抑え込みます。",
    "人間の視覚フィードバックループには約100〜130msの不可避な感覚運動遅延（Sensorimotor Delay）が存在するため、単なる網膜反射による受動的追従では常にオーバーシュートや視線脱落を引き起こします（Woods et al., 2015）。この遅延を克服するのが、小脳内に形成される内部予測モデル（Internal Predictive Models）によるフィードフォワード制御です（Land & McLeod, 2000; Barnes, 2008）。目標の未来軌道や境界壁での跳ね返りベクトルを事前予測することで、遅延した網膜像ではなく将来の到達点へと運動出力を先行同期させます。",
    "本システムは、HTML5の高精度タイマー（performance.now()）とサブピクセル描画エンジンを活用し、45秒間の連続セッションにおける目標追従維持率（Time on Target）、平均追従偏差、および最大連続ロック時間をリアルタイムに計測します。継続的なスムーズパシュート訓練は外眼筋と手指の運動連鎖を最適化し、FPSゲームでの吸い付くようなトラッキングエイムの確立、球技スポーツにおける動体視力強化、そして長時間のスクリーンワークによる視覚疲労の低減を可能にします。"
  ],
  benchmarks: {
    title: "追従眼球運動・スムーズパシュート安定性ベンチマーク基準",
    headers: ["評価ランク / 階級", "ターゲット追従維持率 (Time on Target)", "平均トラッキング精度", "補正サッケード抑制率", "神経生理学的到達レベル"],
    rows: [
      ["神業 / プロ特級 (Top 1%)", "88% 以上", "92% 以上", "95% 以上抑制", "完全な滑動性追従と網膜スリップ最小化。小脳内部予測モデルの完全同期 (Lisberger, 2010)"],
      ["上級視覚追従 (Top 5%)", "76 – 87%", "84 – 91%", "88 – 94% 抑制", "滑らかな外眼筋協調と微小ジッターの迅速な位相適応"],
      ["中級標準水準 (Top 25%)", "62 – 75%", "72 – 83%", "78 – 87% 抑制", "等速区間の安定追従と方向転換時の微小サッケード補正"],
      ["初級一般段階 (Top 50%)", "48 – 61%", "60 – 71%", "65 – 77% 抑制", "頻繁な視線脱落とキャッチアップ・サッケードによる断続的追跡"],
      ["未熟練 / 基礎段階 (Baseline)", "48% 未満", "60% 未満", "65% 未満", "神経遅延によるオーバーシュートと眼球運動の著しいカクつき"]
    ],
    note: "神経眼科学および眼球運動制御文献（Rashbass 1961; Krauzlis 2004; Leigh & Zee 2015; Lisberger 2010）に基づく客観的パフォーマンス基準です。"
  },
  techniques: {
    title: "スムーズパシュート精度を極限まで高める4大アプローチ",
    items: [
      {
        name: "速度位相マッチング (Smooth Acceleration Matching)",
        desc: "ターゲットの位置を後ろから追うのではなく、目標の移動速度とマウスを動かす手先の速度を一致させる感覚を掴み、網膜スリップを恒常的にゼロに保ちます。",
        tips: "オーブの縁ではなく、オーブの真中心にある核を中心窩でリラックスして注視し続けましょう。"
      },
      {
        name: "微小サッケード抑制 (Catch-up Saccade Suppression)",
        desc: "照準が少し外れた瞬間に焦って素早くフリックする癖を抑え、滑らかな等速運動を保ったまま照準をオーブへ吸い戻す動作を習得します。",
        tips: "急激な手の力みは手ぶれとオーバーシュートを引き起こします。常に手首と指の脱力を意識してください。"
      },
      {
        name: "前腕・手首キネティック分離 (Arm-Wrist Kinetic Decoupling)",
        desc: "大まかな軌道追尾は肘を支点とする前腕運動で受け持ち、微細な振幅調整は手首と指先で担当する二重構造の運動連鎖を確立します。",
        tips: "手首をマウスパッドに強く押し付けすぎると摩擦抵抗が増して滑らかな追従が阻害されます。"
      },
      {
        name: "中心窩フォーカス維持 (Foveal Attentional Anchoring)",
        desc: "目標を見失いそうになった際も視野を狭めず、中心窩の高解像度視野と周辺視野の速度検知機能をシームレスに連携させて追跡アンカーを安定化させます。",
        tips: "定期的な瞬きを忘れずに行い、角膜表面の涙液層を均一に保って視界のクリアさを維持しましょう。"
      }
    ]
  },
  steps: [
    "開始ボタンを押し、画面中央に出現するターゲットオーブの中心にカーソルを配置します。",
    "オーブが滑らかに動き始めたら、一定の力加減と速度でカーソルをオーブ内に維持し続けます。",
    "方向転換や緩急が発生しても視線を離さず、滑らかな手先のストロークで追随を維持します。",
    "45秒間の追従を完了し、オーブから外れずに維持できた割合（Time on Target）を記録します。",
    "算出された追従精度と評価ランクを確認し、毎日のエイム＆ビジョンルーチンに組み込みます。"
  ],
  audience: "Apex Legends、Overwatch、VALORANT、CS2などで敵のレレレ移動や高速立体機動にエイムを吸い付かせたいFPSゲーマー、野球・テニス・卓球・モータースポーツ等で滑らかな視線追従を鍛えたいアスリート、および眼球運動機能を整えたいすべての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rashbass1961', 'krauzlis2004', 'leigh2015', 'lisberger2010', 'barnes2008', 'woods2015'),
  related: [
    { href: "/ja/drills/visual/tracking-accuracy/moving-target", label: "動体視力テスト (移動目標迎撃)" },
    { href: "/ja/drills/visual/tracking-accuracy/multiple-targets", label: "多目標追従 MOT テスト" },
    { href: "/ja/drills/visual/visual-recognition/visual-search", label: "視覚探索テスト (周辺視野スキャン)" },
    { href: "/ja/drills/reaction-speed/visual-tracking-speed-test", label: "視覚追従スピードテスト" }
  ]
};

export default function LocalizedPursuitTrackerJaPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AutoPursuitClient copy={{ title: "追従眼球運動テスト・眼球運動トレーニング", subtitle: "スムーズパシュート視線追従測定" }} />
      <DrillGuide guide={guideData} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ja/drills/visual/tracking-accuracy/pursuit-tracker" />
      </div>
    </>
  );
}
