import DirectionalChaosPursuitClient from '@/app/drills/visual-tracking/directional-chaos-pursuit/DirectionalChaosPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// JAPANESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "不規則 追従性眼球運動" / "カオス眼球運動" (Erratic ocular motor tracking)
// Secondary:    "サッケードリカバリー", "アイトラッキング 反射" (Gaze re-acquisition & esports reflex)
// LSI / Domain:  "突発的視覚追従", "動体視力 不規則", "予測不能 ターゲット追跡",
//               "FPS レレレ エイム", "ストレイフ 視線再補足", "中心窩 捕捉"
// Authentic Domain Terms: 衝動性眼球運動（Saccade）, 追いつきサッケード（Catch-up Saccade）, 網膜スリップ（Retinal Slip）, リアルタイム視覚フィードバック（Reactive Feedback）
// ============================================================

export const metadata = {
  title: "不規則方向追従トレーニング・カオス動体視力テスト – サッケードリカバリー＆反応型眼球運動 | SkillDrills",
  description: "予測不能な急激な方向転換と速度変化を繰り返す標的を素早く再捕捉するサッケードリカバリー＆反応型アイトラッキング練習。動体視力の俊敏性とエイムの跳躍復帰力を極限まで強化。無料・登録不要。",
  keywords: [
    "不規則 追従性眼球運動",
    "カオス眼球運動",
    "サッケードリカバリー",
    "突発的視覚追従",
    "アイトラッキング 反射",
    "動体視力 不規則",
    "予測不能 ターゲット追跡",
    "FPS レレレ エイム",
    "ストレイフ 視線再捕捉",
    "眼球運動 俊敏性",
    "視線ブレ 抑制",
    "動体視力 反応速度"
  ],
  openGraph: {
    title: "不規則方向追従トレーニング・カオス動体視力テスト – サッケードリカバリー＆反応型眼球運動 | SkillDrills",
    description: "予測不能な急激な方向転換と速度変化を繰り返す標的を素早く再捕捉するサッケードリカバリー＆反応型アイトラッキング練習。動体視力の俊敏性とエイムの跳躍復帰力を極限まで強化。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "不規則方向追従トレーニング・カオス動体視力テスト – サッケードリカバリー＆反応型眼球運動 | SkillDrills",
    description: "予測不能なカオス運動標的に対するサッケードリカバリーと反応型アイトラッキングを鍛える無料オンライントレーニング。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/directional-chaos-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "視覚追従・アイトラッキング", "item": "https://skilldrills.online/ja/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "不規則方向追従トレーニング (カオス追従)", "item": "https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "不規則方向追従トレーニング・カオス動体視力テスト (Directional Chaos Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "予測不能な急激なベクトル転換を繰り返すターゲットを眼球運動で瞬時に再捕捉する、無料ブラウザ完結型サッケードリカバリー＆反射的アイトラッキング測定ツール。",
  "featureList": [
    "確率的アルゴリズムによる完全に予測不能な多方向カオス運動シミュレーション",
    "0.5倍速〜9.0倍速の可変スピード設定とランダム加速度シフト機能",
    "残像トレイル・CRTスキャンライン・グローエフェクトの表示カスタマイズ",
    "外部サーバー通信一切なしの完全クライアントサイドローカルデータ管理"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "不規則方向追従トレーニング – サッケードリカバリー オンライントレーナー | SkillDrills",
  "alternateName": "Directional Chaos Pursuit Japan",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit",
  "dateModified": "2026-09-15",
  "description": "無料オンライン動体視力・眼球運動トレーニング。予測が通じないカオスな動きに対して、リアルタイムの視覚フィードバックと補正サッケードを駆使してターゲットを捕捉し続ける反射神経ドリル。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応の最新モダンウェブブラウザ",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "不規則追従眼球運動, サッケードリカバリー, リアルタイム視覚補正, 中心窩再捕捉, 動体視力俊敏性"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "不規則方向追従トレーニング・カオス動体視力テスト (Directional Chaos Pursuit)",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit",
  "description": "無料カオスアイトラッキングゲーム。不規則に方向転換するターゲットを眼球で捕捉し続け、視覚反射神経と動体追従の持久力を鍛えます。",
  "genre": ["Eye Tracking", "Visual Training", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "カオス方向追従・サッケードリカバリーの正しい練習手順",
  "dateModified": "2026-09-15",
  "description": "予測不能な突発的ターゲット移動に対して、視線を素早く引き戻し追従を維持するための公式トレーニング手順ガイド。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "適切なベース速度と練習時間の設定",
      "text": "最初は予測不能な動きに目を慣らすため、1.0倍速前後の標準速度と60秒のセッション時間を選択します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "頭部の完全静止と広角注視姿勢の保持",
      "text": "頭部を動かさず両眼の外眼筋のみで追従できるよう、画面から約50〜70cmの距離を保って姿勢を固定します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "突発的な方向転換に対する素早い補正サッケードの発動",
      "text": "ターゲットが突然急旋回して視界中心から外れた瞬間、瞬時に短いサッケード（跳躍）でターゲットを視野中心へ引き戻します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "再捕捉後の即時滑動追従（追従ゲイン復帰）の維持",
      "text": "補正跳躍で捉えた直後に視線を止めず、そのまま滑動追従へ移行してターゲットの新たな進行方向をロックし続けます。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-15",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "カオス方向追従テスト（Directional Chaos Pursuit）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "カオス方向追従テストは、進行方向と速度がランダムかつ確率的に急変するターゲットを眼球運動のみで追跡し続けるアイトラッキング・トレーニングです。規則的な周期運動とは異なり事前の予測が効かないため、網膜スリップをリアルタイムで検知し、瞬時に補正サッケードを発動して滑動追従（スムーズパシュート）へ復帰する神経回路の俊敏性を鍛えます（Bahill et al., 1980）。"
      }
    },
    {
      "@type": "Question",
      "name": "サッケードリカバリー（視線再捕捉）とはどのような神経メカニズムですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ターゲットが急激な方向転換を行うと、追従眼球運動の物理的限界（約30°/秒以上の角速度）を超えて目標が中心窩から外れます。このとき大脳後頭葉の視覚野と上丘・前頭眼野（FEF）が即座に位置誤差を計算し、約150〜200msの遅延で目標位置へ視線を瞬間跳躍させて視野中心へ戻す補正反射が「サッケードリカバリー（Catch-up Saccade）」です（Krauzlis, 2004; Barnes, 2008）。"
      }
    },
    {
      "@type": "Question",
      "name": "規則的な追従（リサージュ等）と不規則なカオス追従の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "リサージュ曲線のような規則的運動では小脳の内部モデルが作動し、感覚遅延をゼロにする「予測的追従（Predictive Pursuit）」が可能になります。しかし本ドリルのようなカオス運動では過去の軌跡から未来を予測できないため、常に実際の視覚変化に即座に反応する「純粋な反射型リアルタイムフィードバック追従」が強制されます（Robinson, 1965）。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲームでのトラッキングエイムやレレレ撃ち対策にどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apex LegendsやOverwatchなどで敵が不規則な左右屈伸・レレレ移動（ADAD Strafe）を仕掛けてきた際、敵の切り返しに対してエイムが置き去りにされる「切り返しラグ」を大幅に削減できます。サッケードリカバリーが鍛えられることで、敵が急反転した瞬間に素早く照準を引き戻し、命中率を維持できます（Yang et al., 2025）。"
      }
    },
    {
      "@type": "Question",
      "name": "頭を動かさずに目だけで追う必要があるのはなぜですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "頭部を激しく振ると前庭動眼反射（VOR）が発動し、眼球自体の外眼筋制御系や大脳皮質・小脳の補正サッケード回路に十分な負荷がかかりません（Leigh & Zee, 2015）。眼球のみを独立して俊敏に動かす神経協調性を養うため、頭部は固定して行う必要があります。"
      }
    },
    {
      "@type": "Question",
      "name": "1日にどのくらいの時間を練習するのが理想的ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1セッション60秒を、間に30秒程度のインターバルを挟んで3〜5セット（計5〜8分）行うのが最適です。突発的な追従は通常の追従よりも眼筋や脳の神経疲労が大きいため、長時間の無理な連取は避け、日々の継続によって神経伝達の即応性を高めるのが効果的です。"
      }
    },
    {
      "@type": "Question",
      "name": "ターゲットを見失ってしまう場合の対処法は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "設定パネルから速度倍率（Speed Multiplier）を0.5x〜0.8xに下げ、ターゲットサイズを少し大きく（24px〜32px）設定してください。慣れてきたら徐々にサイズを標準（16px）に戻し、速度を引き上げていく段階的負荷が推奨されます。"
      }
    },
    {
      "@type": "Question",
      "name": "ディスプレイのリフレッシュレートはカオス追従にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "不規則な急転換ではフレームレートの重要性が極めて高くなります。60Hzモニターでは方向転換の瞬間が最大16.7ms遅れて表示され、像のブレも激しくなりますが、144Hz〜240Hzゲーミングモニターであれば急転換の初動ベクトルを4ms前後で鮮明に視認でき、より素早いリカバリーが可能になります（Woods et al., 2015）。"
      }
    },
    {
      "@type": "Question",
      "name": "サッカーやバスケ、テニスなどの実世界スポーツにも効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。イレギュラーバウンドするテニスボールや相手ディフェンダーの急なフェイント・方向転換を瞬時に視界に捉え直す能力は、アスリートの敏捷性（アジリティ）を支える決定的な視覚要因です（Appelbaum & Erickson, 2018）。"
      }
    },
    {
      "@type": "Question",
      "name": "このカオス追従テストは完全無料ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、SkillDrillsのすべての動体視力ドリルと同様に完全無料で利用できます。登録やアプリ導入は不要で、練習ログや設定はお使いのブラウザ（localStorage）にのみ暗号化保存され、プライバシーは完全に守られます。"
      }
    }
  ]
};

const guideProps = {
  heading: "不規則動体視力とサッケードリカバリーの神経運動科学基準",
  intro: [
    "不規則方向追従（Directional Chaos Pursuit）とは、速度ベクトルと進行角度が確率的に急変する動的刺激に対して、視覚運動系がリアルタイムで即応する高度な動体視力課題です。直線や円運動のように進行方向が予測できる課題とは異なり、予測的内部モデル（小脳の先読み機能）を遮断し、視覚フィードバックのみに基づく純粋な反応型トラッキング能力を限界まで追い込みます（Bahill, Iandolo, & Troost, 1980）。",
    "サッケードリカバリーと追従ゲインの二重運動制御：ターゲットが急激な方向反転を行った瞬間、追従眼球運動（滑動性追従）の物理的追従速度限界（約30°/秒）を突破して標的像が網膜の中心窩から脱落します。このとき網膜スリップ信号を受信した視覚前頭眼野（FEF）と上丘は、約150〜200msの潜時で目標位置へ視線を跳躍させる「補正サッケード（Catch-up Saccade）」を強制発射します（Rashbass, 1961; Krauzlis, 2004）。跳躍後にいかに早く視線を停止させ、即座に滑動追従へ移行できるかが動体視力の俊敏性を決定づけます。",
    "競技FPSおよび対人スポーツにおける実戦応用：FPSにおける敵の高速切り返し（ADADレレレ移動）や、バスケットボール・テニスにおける不規則な方向転換では、視界ブレを最小限に抑えて素早く中心視野を回復する能力が勝敗を分けます（Yang et al., 2025; Appelbaum & Erickson, 2018）。本ドリルは急激な方向転換を無作為に浴びせることで、眼球筋群の反射的協調運動と視覚中枢の処理スピードを飛躍的に高めます。",
    "測定基準とディスプレイハードウェアの影響：本ドリルでは視線追従の滑らかさと急激な方向転換への即応性を判定します。通常の60Hzモニターではフレーム更新間隔が約16.7msと長いため、急転換の瞬間がコマ落ちして網膜に届きます。突発的なベクトル変化を正確に知覚するためには、144Hzまたは240Hzの高リフレッシュレート環境での練習が推奨されます（Woods et al., 2015）。すべてのセッション設定と記録はローカルブラウザ内に安全に保管されます。"
  ],
  benchmarks: {
    title: "不規則方向追従・サッケードリカバリー評価基準（エディトリアルガイド）",
    headers: ["習熟度ティア", "設定速度帯 (Speed Multiplier)", "サッケードリカバリー速度・視線保持特性", "神経反応・眼球運動プロファイル"],
    rows: [
      ["ティア1：神速・絶対反射追従 (Apex Reactive)", "2.0x 以上の超高速域", "方向転換直後に瞬時に補正サッケードが着弾し、ブレることなく新ベクトルに即座に吸着。", "極めて研ぎ澄まされた視覚野・上丘伝達速度。プロeスポーツ選手や一流球技選手の反射神経水準。"],
      ["ティア2：卓越・俊敏追従 (Superior Recovery)", "1.4x – 1.9x 高速域", "急激な反転でも速やかに視線を再捕捉可能。追従ゲインへの復帰が非常に滑らか。", "優れた外眼筋の瞬発力と網膜スリップ検知力。対人ゲームの激しいレレレ移動にも十分対応可能。"],
      ["ティア3：標準・健常成人基準 (Solid Baseline)", "1.0x – 1.3x 標準域", "標準速度での不規則運動を追従可能。急旋回時にわずかな視界の見失いや追従遅延が発生。", "健康な若年成人の標準的視覚反射レベル。日常のスポーツやカジュアルゲームに十分な水準。"],
      ["ティア4：再補足遅延・要反復 (Developing Reflex)", "0.7x – 0.9x 低速域", "方向転換のたびにターゲットを見失い、数回の補正サッケードを経てようやく追いつく状態。", "突発的な視覚刺激に対する神経反応遅延。低速域で素早く目標へ視線を戻す反復練習が必要。"],
      ["ティア5：追尾困難・初学者 (High Latency)", "0.7x 未満", "ターゲットの不規則な動きに視線が追いつかず、画面全体を無秩序に視線が泳いでしまう。", "まずは低速での方向転換に慣れ、頭部を動かさず眼球のみを素早く動かす基礎からスタート。"]
    ],
    note: "本基準値は不規則運動下での眼球追従およびサッケード力学研究（Bahill et al., 1980; Barnes, 2008; Krauzlis, 2004; Robinson, 1965）に基づき策定された編集基準です。"
  },
  techniques: {
    title: "不規則カオス追従の再捕捉精度を高める4大テクニック",
    items: [
      {
        name: "頭部の完全固定と外眼筋の反射的分離",
        desc: "Leigh & Zee（2015）の知見の通り、突発的な動きに驚いて頭を振ると前庭動眼反射（VOR）が混入し、大脳皮質のサッケード制御回路が鍛えられません。",
        tips: "顎を引き、首を完全に固定した状態で、眼球の独立した回転力のみで急転換を迎撃しましょう。"
      },
      {
        name: "切り返し初動ベクトルの瞬間感知とショートサッケード",
        desc: "Krauzlis（2004）が示すように、急変時は追従を無理に続けようとせず、短い跳躍（サッケード）で即座に位置誤差をゼロにするのが正解です。",
        tips: "標的が方向を変えた瞬間に粘らず、ピッと鋭く視線を飛ばして目標の中心に飛び乗る意識を持ちます。"
      },
      {
        name: "予測の完全排除とリアルタイム視覚フィードバック集中",
        desc: "Bahill et al.（1980）が証明したように、カオス運動下で山勘予測を行うと逆方向に視線が跳んで致命的な遅延を招きます。",
        tips: "『次にどこへ行くか』を推理するのをやめ、現実にターゲットが動いた瞬間だけに反射で即応してください。"
      },
      {
        name: "高リフレッシュレートモニターによる初動フレームの可視化",
        desc: "Woods et al.（2015）の通り、144Hz以上のディスプレイは方向転換の瞬間を滑らかに描画し、脳の初動検知を物理的に約10ms早めます。",
        tips: "ゲーミングモニターを使用し、室内を適度な明るさに保って眼筋の緊張と疲労をコントロールしてください。"
      }
    ]
  },
  steps: [
    "速度倍率（0.5x〜2.0x）と時間（60秒）を設定し、ドリルを開始します。",
    "画面から約50〜70cm離れ、頭部を完全に動かさない姿勢を確立します。",
    "画面内を不規則に縦横無尽に急旋回するターゲットに視線を向けます。",
    "方向が変わるたびに瞬時のショートサッケードで視線を引き戻し、すぐに滑動追従へ復帰します。",
    "セッション終了後、設定速度における視線保持の安定度を振り返り、次回セッションに活かします。"
  ],
  audience: "競技FPS（Apex Legends, Overwatch, VALORANT）プレイヤー、格闘ゲーム選手、球技アスリート（テニス、卓球、サッカー）、不規則な動体視力と反射神経を高めたいすべてのトレーニング実践者。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'barnes2008', 'krauzlis2004', 'robinson1965', 'rashbass1961', 'woods2015'),
  related: [
    { href: "/ja/drills/visual-tracking/constant-slow-pursuit", label: "低速追従眼球運動トレーニング (Constant Slow)" },
    { href: "/ja/drills/visual-tracking/sine-wave-pursuit", label: "正弦波追従トレーニング (Sine Wave)" },
    { href: "/ja/drills/visual-tracking/infinity-pursuit", label: "8の字ループ追従運動 (Infinity)" },
    { href: "/ja/drills/visual-tracking/predictive-pursuit", label: "予測アイトラッキング (Predictive)" },
    { href: "/ja/drills/visual-tracking/dynamic-evasion-pursuit", label: "リアクティブ追従訓練 (Dynamic Evasion)" },
    { href: "/ja/drills/visual-tracking/ghosting-suppress-pursuit", label: "視線固視安定性トレーニング (Ghosting Suppress)" }
  ]
};

export default function LocalizedPage() {
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
      <DirectionalChaosPursuitClient
        copy={{
          title: "不規則方向追従トレーニング・カオス動体視力テスト",
          subtitle: "サッケードリカバリー＆突発的アイトラッキング練習",
          description: "カオス運動標的の追跡では、脳の予測的内部モデルに頼ることができず、リアルタイムの視覚フィードバック制御が強制されます（Bahill et al., 1980）。予測不能な速度・方向転換によって標的が中心窩から外れた瞬間、眼球運動系は瞬時に補正サッケードを発射して視線をリカバリーし、滑動追従ゲインを復帰させます（Barnes, 2008; Krauzlis, 2004）。"
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/directional-chaos-pursuit" />
      </div>
    </>
  );
}
