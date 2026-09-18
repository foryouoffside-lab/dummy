import DynamicEvasionPursuitClient from '@/app/drills/visual-tracking/dynamic-evasion-pursuit/DynamicEvasionPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// JAPANESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "回避 追従 トレーニング" / "標的回避追従" (Evasive target pursuit tracking)
// Secondary:    "動体視力 回避運動", "リアクティブ エイム トレーニング", "ストレイフ 追従 エイム"
// LSI / Domain:  "急旋回 視線再捕捉", "サッケード反射 トレーニング", "動体視力 反射神経",
//               "エイム トラッキング 練習", "補正サッケード 速度", "中心窩 捕捉力", "FPS エイム 安定性"
// Authentic Domain Terms: 標的回避追従（Dynamic Evasion Pursuit）, 補正サッケード（Catch-up Saccade）, 滑動追従ゲイン（Pursuit Gain）, 網膜スリップ（Retinal Slip）, 前頭眼野（FEF）, 上丘（Superior Colliculus）
// ============================================================

export const metadata = {
  title: "標的回避追従トレーニング・動体視力テスト – 急旋回ターゲット再捕捉 | SkillDrills",
  description: "突発的に急旋回・回避行動を取る標的を瞬時に再捕捉するリアクティブ・アイトラッキング＆動体視力トレーニング。網膜スリップの即座検知と補正サッケード、滑動追従ゲイン復帰力を極限まで強化。無料・登録不要。",
  keywords: [
    "回避 追従 トレーニング",
    "標的回避追従",
    "動体視力 回避運動",
    "リアクティブ エイム トレーニング",
    "ストレイフ 追従 エイム",
    "急旋回 視線再捕捉",
    "サッケード反射 トレーニング",
    "動体視力 反射神経",
    "エイム トラッキング 練習",
    "補正サッケード 速度",
    "中心窩 捕捉力",
    "FPS エイム 安定性"
  ],
  openGraph: {
    title: "標的回避追従トレーニング・動体視力テスト – 急旋回ターゲット再捕捉 | SkillDrills",
    description: "突発的に急旋回・回避行動を取る標的を瞬時に再捕捉するリアクティブ・アイトラッキング＆動体視力トレーニング。網膜スリップの即座検知と補正サッケード、滑動追従ゲイン復帰力を極限まで強化。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "標的回避追従トレーニング・動体視力テスト – 急旋回ターゲット再捕捉 | SkillDrills",
    description: "突発的急旋回を繰り出す回避標的を眼球で瞬時に再捕捉する無料オンライン・リアクティブ動体視力ドリル。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/dynamic-evasion-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "視覚追従・アイトラッキング", "item": "https://skilldrills.online/ja/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "標的回避追従トレーニング (ダイナミック回避追従)", "item": "https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "標的回避追従トレーニング・動体視力リアクティブエイムテスト (Dynamic Evasion Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "直線移動から突発的に急旋回して照準を逃れる標的を眼球運動で瞬時に再捕捉する、無料ブラウザ完結型リアクティブ動体視力＆サッケードリカバリー測定ツール。",
  "featureList": [
    "直線等速巡航と突発的高角度回避ブレイクを融合したリアルタイム回避シミュレーション",
    "0.5倍速〜9.0倍速の可変スピード設定とミリ秒単位の視線捕捉保持タイマー",
    "ターゲット残像トレイル・CRTスキャンライン・グロー効果の視覚カスタマイズ",
    "外部サーバー通信一切なしの完全クライアントサイドローカルデータ管理"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "標的回避追従トレーニング – 動体視力リアクティブエイム オンライントレーナー | SkillDrills",
  "alternateName": "Dynamic Evasion Pursuit Japan",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit",
  "dateModified": "2026-09-15",
  "description": "無料オンライン動体視力・リアクティブ追従トレーニング。急激な回避旋回に対して即座に補正サッケードを発動し、中心窩ロックと追従ゲインを回復する反射神経ドリル。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応の最新モダンウェブブラウザ",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "回避運動追従, 補正サッケード, 滑動追従ゲイン復帰, 網膜スリップ抑制, リアクティブエイム"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "標的回避追従トレーニング・動体視力リアクティブエイムテスト (Dynamic Evasion Pursuit)",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit",
  "description": "無料リアクティブ追従ゲーム。急旋回・回避行動を繰り返すターゲットを視線と照準で捉え続け、視覚反射神経とリカバリー俊敏性を鍛えます。",
  "genre": ["Eye Tracking", "Visual Training", "Aim Trainer"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "標的回避追従・リアクティブ視線再捕捉の正しい練習手順",
  "dateModified": "2026-09-15",
  "description": "突発的に急旋回する回避標的に対して、視線を素早く引き戻し追従ゲインを回復するための公式トレーニング手順ガイド。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "基準速度とセッション時間の設定",
      "text": "最初は急旋回のタイミングを見極めるため、1.0倍速の標準速度と60秒のセッション時間を選択します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "頭部固定と直線軌道での滑動追従の確立",
      "text": "画面から約50〜70cmの距離を保ち、頭部を完全に静止させた状態で、標的が直線を進む間スムーズに追従します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "急激な回避旋回に対する鋭い補正サッケードの発動",
      "text": "標的が予告なく鋭角に方向転換した瞬間、無理に滑動追従を引っ張らず、瞬時の短い跳躍（サッケード）で標的を中心窩へ引き戻します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "着弾直後の新ベクトル滑動追従（ゲイン復帰）の維持",
      "text": "補正跳躍が着弾した直後に視線を止めず、標的の新しい進行速度と角度に即座に同調して滑動追従を再開します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit#step-4"
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
      "name": "標的回避追従テスト（Dynamic Evasion Pursuit）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "標的回避追従テストは、直線軌道を巡航する標的が突発的に高角度の急旋回（回避行動）を行う動的ターゲットを眼球運動のみで追跡し続けるアイトラッキング・ドリルです。連続的な予測追従が遮断されるため、網膜スリップの即時感知、補正サッケードの発動、そして新ベクトルへの滑動追従ゲイン復帰という一連の視覚運動ループを限界まで鍛錬します（Rashbass, 1961; Bahill et al., 1980）。"
      }
    },
    {
      "@type": "Question",
      "name": "通常のスムーズパシュート（円運動やリサージュ）と標的回避追従の決定的な違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "円運動やリサージュ曲線のような周期的追従では、小脳が内部前進モデルを構築して感覚遅延をほぼゼロにする「先読み追従」が可能になります（Robinson, 1965）。一方、標的回避追従では標的が不意に鋭角へブレイクするため先読みが破綻し、視覚フィードバックに基づく純粋な反応型の再捕捉反射が強制されます。"
      }
    },
    {
      "@type": "Question",
      "name": "回避急旋回時に発動する「補正サッケード（Catch-up Saccade）」のメカニズムは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "標的が急角度に曲がると、滑動追従の生理的限界速度（約30°/秒）を超過し、像が網膜中心窩から外れます。この位置誤差信号を受け取った前頭眼野（FEF）と上丘が、約150〜200msの遅延で目標位置へ視線を瞬間ジャンプさせて視界中心に捉え直す補正動作が「補正サッケード」です（Krauzlis, 2004; Barnes, 2008）。"
      }
    },
    {
      "@type": "Question",
      "name": "カオス方向追従（Directional Chaos Pursuit）と本ドリルの違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "カオス方向追従は毎フレーム微小なランダム加速度が加わる連続的曲線ドリフトであるのに対し、標的回避追従は明瞭な直線ベクトルと数周期ごとの離散的な高角度急旋回で構成されます。微小な手振れ補正ではなく、激しい方向切り返しに対するダイナミックな再捕捉速度に特化しています。"
      }
    },
    {
      "@type": "Question",
      "name": "競技FPS（Apex Legends, Overwatch 2, VALORANT）のストレイフ追従にどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "近接戦闘で敵が急激な左右屈伸・レレレ移動（ADAD Strafe）やスライディング回避を仕掛けてきた際、敵の切り返しに対してエイムが置き去りにされる「切り返しラグ」を大幅に削減できます。急旋回を検知してから補正サッケードを着弾させるまでの時間を短縮し、ヒットボックスへ即座に照準を復帰させられます（Yang et al., 2025）。"
      }
    },
    {
      "@type": "Question",
      "name": "テニス、サッカー、バスケ等の球技スポーツにおける動体視力にどう効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "相手ディフェンダーの急なフェイント・方向転換や、イレギュラーバウンドするボールに対して、視界ブレを瞬時に収束させて対象を再凝視する視覚敏捷性（アジリティ）が向上します（Appelbaum & Erickson, 2018）。"
      }
    },
    {
      "@type": "Question",
      "name": "頭部を動かさずに目だけで追う必要がある神経学的理由は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "頭部を激しく振ると前庭動眼反射（VOR）が介入し、外眼筋自体の運動制御系や大脳皮質・上丘の補正サッケード回路に十分な負荷がかかりません（Leigh & Zee, 2015）。独立した眼球運動の瞬発力を高めるため、頭部は固定して行う必要があります。"
      }
    },
    {
      "@type": "Question",
      "name": "1日の推奨練習時間とセッション頻度はどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1セッション60秒を、間に30秒の休憩を挟んで5〜8セット（計5〜10分）行うのが最適です。突発的な再捕捉は眼筋と中枢神経への負荷が非常に高いため、長時間の無理な連取は避け、日々の継続によって神経伝達を最適化することが推奨されます。"
      }
    },
    {
      "@type": "Question",
      "name": "回避転換が速すぎてターゲットを完全に見失ってしまう場合の調整法は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "設定パネルから速度倍率（Speed Multiplier）を0.6x〜0.8xに落とし、ターゲットサイズを24px以上に広げてください。旋回の初動ベクトルを落ち着いて捉えられるようになってから徐々に標準速度（1.0x以上）へ戻す段階的トレーニングが効果的です。"
      }
    },
    {
      "@type": "Question",
      "name": "モニターのリフレッシュレート（Hz）やマウスのポーリングレートは測定にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "高リフレッシュレート環境は急旋回知覚に極めて大きな差を生みます。60Hzモニターでは方向転換の初動が最大16.7ms遅れて表示されますが、144Hz〜240Hzであれば4ms前後で急転換フレームが網膜に届くため、サッケード発動が物理的に前倒しされます（Woods et al., 2015）。"
      }
    }
  ]
};

const guideProps = {
  heading: "標的回避運動追従とサッケードリカバリーの神経運動科学基準",
  intro: [
    "標的回避追従（Dynamic Evasion Pursuit）とは、直線軌道を移動する動的対象が不意に鋭角な回避旋回（Directional Break）を起こした際、視覚運動系がリアルタイムで即応して視線を再整合させる高度な動体視力課題です。直線や円運動のように予測可能な運動経路とは異なり、小脳の予測的内部モデル（Feedforward Model）を破綻させ、純粋な感覚フィードバックに基づく反応的再捕捉能力を極限まで鍛錬します（Bahill, Iandolo, & Troost, 1980; Robinson, 1965）。",
    "網膜スリップの発生と補正サッケード・追従ゲインの二重運動制御：標的が突然の回避角を曲がった瞬間、滑動性追従眼球運動の物理的追従速度限界（約30°/秒）を超過し、標的像が中心窩から急激に脱落します（網膜スリップ）。この位置誤差および速度誤差を受信した視覚前頭眼野（FEF）と上丘は、約150〜200msの潜時を経て目標位置へ視線を瞬間跳躍させる「補正サッケード（Catch-up Saccade）」を強制発動します（Rashbass, 1961; Krauzlis, 2004）。跳躍着弾直後に視界ブレを抑制し、即座に新しい進行方向への滑動追従ゲイン（Gain = 眼球速度 / 標的速度）を回復できるかが動体視力の敏捷性を決定づけます（Barnes, 2008）。",
    "競技eスポーツおよび対人スポーツにおける実戦応用：FPSにおける敵の突発的レレレ移動（ADAD Strafe）やスライディング回避、テニスやサッカーにおける急激な切り返しやボールの急変では、視覚的脱落時間をミリ秒単位で削減することが勝敗を分けます（Yang et al., 2025; Appelbaum & Erickson, 2018）。本ドリルは高角の急旋回を不規則に浴びせることで、外眼筋群の反射的協調と中枢視覚野の情報処理速度を飛躍的に向上させます。",
    "ハードウェア遅延と計測環境の標準化：急旋回知覚において、モニターのフレーム更新レートは極めて重要です。一般的な60Hzモニターではフレーム間隔が16.7msと長く、急転換の瞬間がブレて網膜に届きますが、144Hzまたは240Hzの高リフレッシュレート環境では4ms前後で急旋回の初動フレームを視認可能です（Woods et al., 2015）。また、頭部を静止させて前庭動眼反射（VOR）を抑えることで、純粋な外眼筋の瞬発力が鍛えられます（Leigh & Zee, 2015）。すべてのセッション記録はブラウザ内に安全にローカル保存されます。"
  ],
  benchmarks: {
    title: "標的回避追従・リアクティブ視線再捕捉評価基準（エディトリアルガイド）",
    headers: ["習熟度ティア", "設定速度帯 (Speed Multiplier)", "回避旋回時のサッケードリカバリー特性", "神経反応・動体視力プロファイル"],
    rows: [
      ["ティア1：神速・プロリアクティブ (Apex Reactive)", "2.0x 以上の超高速域", "回避転換直後に最短潜時（150ms未満）で補正サッケードが着弾し、オーバーシュートなく追従ゲインを即復帰。", "最高峰の視覚野-上丘伝達速度。プロeスポーツ選手およびトップアスリートの動体反射水準。"],
      ["ティア2：卓越・俊敏リカバリー (Superior Agility)", "1.4x – 1.9x 高速域", "急激な回避旋回に対しても1〜2フレームの遅延で視線を戻し、スムーズに追従を継続可能。", "優れた外眼筋瞬発力と網膜スリップ感知力。高ランク帯FPSの激しいストレイフ戦に十分対応。"],
      ["ティア3：標準・健常成人基準 (Solid Baseline)", "1.0x – 1.3x 標準域", "標準速度の回避運動を追従可能。急旋回時に一時的な視界の見失いや追いつき遅延が発生。", "一般的な若年成人の標準的視覚運動協調レベル。カジュアルゲームや日常スポーツに十分。"],
      ["ティア4：再捕捉遅延・要反復 (Developing Recovery)", "0.7x – 0.9x 低速域", "標的が回避行動を取るたびに視界からロストし、複数回のサッケードを要して復帰が遅れる。", "突発的な方向変化に対する神経伝達の遅延。低速域で素早く視線を跳躍させる反復練習が必要。"],
      ["ティア5：追尾困難・初学者 (High Latency)", "0.7x 未満", "標的の急転換に目がついていかず、画面の旧軌道上に視線が取り残されてしまう。", "まずは頭部を完全固定し、低速での急旋回標的を目だけで追う基礎からスタート。"]
    ],
    note: "本基準値は回避標的運動下のサッケード力学および追従ゲイン回復研究（Bahill et al., 1980; Rashbass, 1961; Krauzlis, 2004; Barnes, 2008）に基づき策定された編集基準です。"
  },
  techniques: {
    title: "回避標的の再捕捉精度と追従ゲインを高める4大テクニック",
    items: [
      {
        name: "頭部の完全固定によるVOR抑制と外眼筋の独立駆動",
        desc: "Leigh & Zee（2015）の知見の通り、突発的な急旋回に驚いて首を振ると前庭動眼反射（VOR）が混入し、皮質サッケード回路の強化が妨げられます。",
        tips: "顎を軽く引き、頭部を完全に静止させた状態で、眼球のみの独立した回転力で急転換を迎撃しましょう。"
      },
      {
        name: "回避初動の網膜スリップ検知と最短ショートサッケード",
        desc: "Krauzlis（2004）が示すように、急変時に無理に滑動追従を引き延ばそうとせず、短い跳躍サッケードで即座に位置誤差をリセットするのが最適解です。",
        tips: "標的が方向を変えた瞬間に粘らず、ピッと鋭く視線を飛ばして新軌道の中心へ跳躍させます。"
      },
      {
        name: "着弾直後の滑動追従ゲイン即時復帰（オーバーシュート抑制）",
        desc: "Rashbass（1961）およびBarnes（2008）が指摘するように、サッケード着弾後に視線を行き過ぎさせず、即座に標的速度と同調させることが鍵です。",
        tips: "跳躍直後に視線を固まらせず、そのまま標的の新しい進行速度へ滑らかに乗り継ぐ意識を持ちます。"
      },
      {
        name: "144Hz+ 高リフレッシュレート環境による旋回初動の視認",
        desc: "Woods et al.（2015）の通り、144Hz以上のディスプレイは方向転換の第1フレームを鮮明に描画し、脳の初動知覚を物理的に約10ms早めます。",
        tips: "ゲーミングモニターを使用し、適切な作業照明を維持して外眼筋の疲労をコントロールしてください。"
      }
    ]
  },
  steps: [
    "速度倍率（0.5x〜2.0x）とセッション時間（60秒）を設定し、ドリルを開始します。",
    "画面から約50〜70cm離れ、頭部を完全に動かさない姿勢を確立します。",
    "直線軌道を移動するターゲットを滑らかに追従します。",
    "ターゲットが急旋回・回避行動を起こした瞬間、即座に補正サッケードを発射して中心視野へ戻します。",
    "セッション終了後、回避旋回への即応性と視線保持率を振り返り、次回セッションに活かします。"
  ],
  audience: "競技FPS（Apex Legends, Overwatch, VALORANT）プレイヤー、格闘ゲーム選手、球技アスリート（テニス、卓球、サッカー、バスケットボール）、突発的な回避運動に対する動体視力と反射神経を高めたいすべての実践者。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'rashbass1961', 'krauzlis2004', 'robinson1965', 'barnes2008', 'woods2015'),
  related: [
    { href: "/ja/drills/visual-tracking/constant-slow-pursuit", label: "低速追従眼球運動トレーニング (Constant Slow)" },
    { href: "/ja/drills/visual-tracking/directional-chaos-pursuit", label: "カオス方向追従テスト (Directional Chaos)" },
    { href: "/ja/drills/visual-tracking/sine-wave-pursuit", label: "正弦波追従トレーニング (Sine Wave)" },
    { href: "/ja/drills/visual-tracking/infinity-pursuit", label: "8の字ループ追従運動 (Infinity)" },
    { href: "/ja/drills/visual-tracking/predictive-pursuit", label: "予測アイトラッキング (Predictive)" },
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
      <DynamicEvasionPursuitClient
        copy={{
          title: "標的回避追従トレーニング・動体視力リアクティブエイムテスト",
          subtitle: "急旋回ターゲット再捕捉＆サッケード反射訓練",
          description: "回避行動を取る標的の追従では、直線軌道中の滑動追従と、急激な方向ブレイク時の補正サッケード（Catch-up Saccade）の素早い切り替えが求められます（Rashbass, 1961）。標的が照準を逃れるように急転換した瞬間、約150〜200msの神経遅延を最小化して即座に中心窩へ引き戻し、追従ゲインを再確立します（Krauzlis, 2004; Barnes, 2008）。"
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/dynamic-evasion-pursuit" />
      </div>
    </>
  );
}
