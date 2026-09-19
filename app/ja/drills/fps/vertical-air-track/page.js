import VerticalAirTrackClient from '@/app/drills/fps/vertical-air-track/VerticalAirTrackClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (fps / vertical-air-track)
// PRIMARY DOMESTIC: "垂直 エイム 練習"          — High-intent genre target
//                   "縦 エイム"                — #1 Google Suggest hit ('ow 縦 エイム')
//                   "トラッキング エイム 練習"   — Confirmed high-volume category term
//                   "空中 トラッキング 練習"     — Technical airborne pursuit phrase
//                   "エイム 練習 ブラウザ"       — Platform intent
// SECONDARY / LSI:
//                   "縦エイム トレーニング"      — Direct skill phrase
//                   "FPS 垂直 エイム"           — High-intent genre term
//                   "apex 縦 エイム"           — Apex Legends specific search
//                   "エイムトレーナー 無料"      — Category broad search
// WINNER TITLE:     垂直 エイム 練習 – 無料ブラウザFPS縦エイム・空中トラッキングトレーナー | SkillDrills
// ============================================================

export const metadata = {
  title: "垂直 エイム 練習 – 無料ブラウザFPS縦エイム・空中トラッキングトレーナー | SkillDrills",
  description: "無料のブラウザFPS垂直エイム・空中トラッキング練習ツール。重力に従って放物線を描くターゲットの落下軌道予測、Y軸マウス操作、空中でのスムーズパシュートを強化。Apex LegendsやOverwatch 2の対空戦に最適。",
  keywords: [
    '垂直 エイム 練習',
    '縦 エイム',
    'トラッキング エイム 練習',
    '空中 トラッキング 練習',
    '縦エイム トレーニング',
    'FPS 垂直 エイム',
    'エイム 練習 ブラウザ',
    'apex 縦 エイム',
    'エイムトレーナー 無料',
    'Y軸 マウス操作',
    '空中戦 エイム練習',
    'オーバーウォッチ 対空エイム'
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/fps/vertical-air-track",
    languages: getAlternateLanguages('/drills/fps/vertical-air-track'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "垂直 エイム 練習 – 無料ブラウザFPS縦エイム・空中トラッキングトレーナー | SkillDrills",
    description: "無料のブラウザFPS垂直エイム・空中トラッキング練習ツール。重力に従って放物線を描くターゲットの落下軌道予測、Y軸マウス操作、空中でのスムーズパシュートを強化。Apex LegendsやOverwatch 2の対空戦に最適。",
    url: "https://skilldrills.online/ja/drills/fps/vertical-air-track",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "垂直 エイム 練習 – 無料ブラウザFPS縦エイム・空中トラッキングトレーナー | SkillDrills",
    description: "無料のブラウザFPS垂直エイム・空中トラッキング練習ツール。重力に従って放物線を描くターゲットの落下軌道予測、Y軸マウス操作、空中でのスムーズパシュートを強化。Apex LegendsやOverwatch 2の対空戦に最適。",
  },
};

export default function VerticalAirTrackPageJa() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "FPSドリル", "item": "https://skilldrills.online/ja/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "垂直 エイム 練習", "item": "https://skilldrills.online/ja/drills/fps/vertical-air-track" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "垂直 エイム 練習 (Vertical Aim Trainer)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "無料のブラウザFPS垂直エイム・空中トラッキング練習ツール。重力加速度に従う放物線ターゲットの追従とY軸マウスコントロールを鍛えるウォームアップアプリ。",
    "genre": "FPS Training / Vertical Tracking",
    "url": "https://skilldrills.online/ja/drills/fps/vertical-air-track",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "垂直 エイム 練習 (Vertical Aim Trainer)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "Pointer Lock API、JavaScript、HTML5 Canvas対応ブラウザ",
    "description": "無料のブラウザFPS垂直エイム・空中トラッキング練習ツール。重力加速度に従う放物線ターゲットの追従とY軸マウスコントロールを鍛えるウォームアップアプリ。",
    "url": "https://skilldrills.online/ja/drills/fps/vertical-air-track"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "垂直 エイム 練習 (Vertical Aim Trainer)",
    "url": "https://skilldrills.online/ja/drills/fps/vertical-air-track",
    "description": "無料のブラウザFPS垂直エイム・空中トラッキング練習ツール。重力加速度に従う放物線ターゲットの追従とY軸マウスコントロールを鍛えるウォームアップアプリ。",
    "dateModified": "2026-09-11",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Vertical Tracking"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-11",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "FPSにおける「垂直エイム（縦エイム）」練習とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "垂直エイム（縦エイム）練習とは、マウスのY軸（上下方向）の視覚追従およびコントロールを集中的に鍛えるトレーニングです。横方向の水平トラッキングに比べ、日常的に練習量が不足しがちな縦方向のエイムを特化して強化します。"
        }
      },
      {
        "@type": "Question",
        "name": "ポップコーントラッキングとは何ですか？このドリルで鍛えられますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ポップコーントラッキングとは、ポップコーンが弾けるように上空へ打ち上げられ重力で放物線を描いて落下するターゲットを追従する技術です。本ドリルはこの放物線運動を完全にシミュレートし、空中でのスムーズパシュート能力を養います。"
        }
      },
      {
        "@type": "Question",
        "name": "Apex Legendsにおいて縦エイムの練習が重要な理由は何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex Legendsにはオクタンのジャンプパッド、ホライゾンのグラビティリフト、パスファインダーのグラップル、ヴァルキリーのジェットパックなど空中機動スキルが豊富に存在します。縦エイムを鍛えることで、空中に逃げた敵を照準から外さず撃ち落とすことができます。"
        }
      },
      {
        "@type": "Question",
        "name": "競技FPSにおける「エレベーターピーク」とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ジップラインやロープ昇降、高所からの段差飛び降りによって、横ではなく縦方向から突然頭出し（ピーク）してくる動きを指します。本ドリルは不意の上下の出現に対して瞬時に照準を合わせる初動フリックと追従を鍛えます。"
        }
      },
      {
        "@type": "Question",
        "name": "なぜ縦方向のトラッキングは横方向よりも身体運動学的に難しいのですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "横トラッキングは肘の回旋や手首の自然な左右の屈曲で行えるのに対し、縦トラッキングは手首の過伸展や指の曲げ伸ばし、または前腕全体をマウスパッド上で滑らせる必要があり、静摩擦抵抗の変化が大きいためです。"
        }
      },
      {
        "@type": "Question",
        "name": "Overwatch 2（オーバーウォッチ2）の対空エイムに効果はありますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "極めて効果的です。ファラやエコー、マーシーの滑空、ダイブしてくるウィンストンやドゥームフィストなど、急激な上下移動を繰り返すヒーローに対して安定したヒットレートを維持できるようになります。"
        }
      },
      {
        "@type": "Question",
        "name": "Halo Infiniteなどのアリーナシューターでも活用できますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい。グラップルショットやリパルサージャンプ、マンキャノンによる高高度の移動に対して、空中での4バーストBRキルを狙うための正確なY軸コントロールが向上します。"
        }
      },
      {
        "@type": "Question",
        "name": "Vertical Air-Trackにおけるミス判定やペナルティはどうなっていますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ターゲットからレティクルが外れるとコンボ倍率がリセットされます。オプションのタイムペナルティ機能を有効にすると、ターゲットを破壊できずに画面下端へ落下させた場合に制限時間が0.6秒減点されます。"
        }
      },
      {
        "@type": "Question",
        "name": "縦エイム練習はどれくらいの頻度で行うべきですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1回あたり10〜15分、週に3〜4回継続することで、手首伸筋群の持久力が向上し、激しい撃ち合い時のY軸マウスブレ（ジッター）が大幅に軽減されます。"
        }
      },
      {
        "@type": "Question",
        "name": "この垂直エイムトレーナーは完全無料で利用できますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい、完全無料・登録不要・インストール不要です。PCブラウザを開くだけで、低遅延のRAWマウス入力環境ですぐに練習を開始できます。"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "垂直Y軸トラッキングエイムの練習方法",
    "description": "空中ターゲットの放物線落下軌道を予測し、滑らかな縦方向マウスコントロールを習得する4ステップ。",
        "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "センシ設定とポインターロックの有効化",
        "text": "普段プレイしているゲームの感度（DPI/ゲーム内感度）を合わせ、キャンバスをクリックしてマウスカーソルを画面中央に固定します。",
        "url": "https://skilldrills.online/ja/drills/fps/vertical-air-track#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "放物線の上昇速度と頂点での減速を一致させる",
        "text": "打ち上げられたターゲットを視覚追従し、軌道の最高到達点（アペックス）付近で垂直速度がゼロに近づく瞬間を予測してマウスを滑らかに制御します。",
        "url": "https://skilldrills.online/ja/drills/fps/vertical-air-track#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "重力加速に合わせた引き下げトラッキングの実行",
        "text": "頂点から重力によって加速しながら落下するターゲットに合わせて、手首と指先をリラックスさせながら真っ直ぐマウスを引き下げます。",
        "url": "https://skilldrills.online/ja/drills/fps/vertical-air-track#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "着地直前の迎撃完了とニュートラル姿勢への復帰",
        "text": "最下点に達する前に破壊ダメージを与え切り、余計な反動ブレを起こさずに素早く中央へレティクルを再配置して次の打ち上げに備えます。",
        "url": "https://skilldrills.online/ja/drills/fps/vertical-air-track#step-4"
      }
    ]
  };

  const verticalAirTrackGuide = {
    heading: "垂直 エイム 練習ガイド & 放物線滞空トラッキング理論",
    intro: [
      "垂直 エイム 練習（Vertical Air-Track）は、マウスのY軸追従精度、重力放物線の落下予測、空中迎撃コントロールを極限まで高めるために設計された高度なFPSモータースキル訓練ドリルです。Apex LegendsやOverwatch 2、Halo Infiniteなどの立体高速移動シューターでは、ジャンプパッドやフック、高低差地形を利用して水平のクロスヘア配置を崩す戦術が頻繁に用いられます。",
      "上下（垂直）方向のスムーズパシュート（滑動性眼球運動）の神経機構は、左右の水平運動とは大きく異なります。Richard J. Krauzlis（2004）の研究により、垂直方向の視覚追従は小脳虫部や脳幹の固有経路を介しており、手根骨・前腕骨格の非対称性から運動ブレ（ジッター）が生じやすいことが判明しています。またCyril Rashbass（1961）が証明したように、滑らかな追従運動はターゲットの位置誤差ではなく「速度誤差（網膜スリップ）」によって駆動されるため、カクカクしたフリックではなく連続的な速度一致が不可欠です。",
      "滞空する敵を確実に捉えるには、重力加速度（g = 9.81 m/s²）の物理挙動を身体感覚に落とし込む必要があります。Peter R. Cavanaghら（1984）およびMichael F. Land & Peter McLeod（2000）の分析によると、熟練した迎撃者はジャンプの最高到達点（頂点）での減速と、その後の急速な落下加速を事前に予測して眼球と四肢を先行連動させています。",
      "本ドリルは水平方向の補助を排除し純粋なY軸運動のみを分離。高精度なperformance.now()デジタル時間計測（Woods et al., 2015）によって、水平エイムと真の360度立体トラッキング能力の架け橋を築きます。",
      "測定精度について：すべてのイベントはブラウザのperformance.now()高精度クロックを使用し、外部サーバー通信なしで端末内でミリ秒単位で処理されます。Spectre緩和策により一般的なブラウザタイマーは約1msに丸められ、画面リフレッシュレート（60Hzで約16.7ms、144Hzで約6.9ms、240Hzで約4.1ms）に応じた量子化が発生します。5ms以内の微小な数値差は測定誤差として扱い、他者の異なるPC環境と比較するのではなく、ご自身の同一ハードウェア環境での成長指標として活用してください。"
    ],
    benchmarks: {
      title: "垂直スムーズパシュート & 空中追従ベンチマーク基準",
      headers: ["パフォーマンス階層", "滞空トラッキング率", "頂点切り返し遅延", "競技シーンにおける実戦力"],
      rows: [
        ["Tier 1（プレデター / グランドマスター / 空戦エース）", "82% 以上", "180 ms 未満", "ジャンパやグラップル中の敵に吸い付くようなレーザートラッキング。頂点減速から落下加速への移行が完璧"],
        ["Tier 2（マスター / セミプロ競技者）", "70% – 82%", "180 – 230 ms", "安定したY軸トラッキング。急激な初速発射時にわずかなブレが生じるが、空中ターゲットを確実に削り切る"],
        ["Tier 3（ダイヤ / アセンダント上位）", "56% – 70%", "230 – 290 ms", "規則的な放物線には十分対応可能。ターゲットが空中で微小ストレイフを入れた際に追従が遅れる"],
        ["Tier 4（ゴールド / プラチナ帯）", "40% – 56%", "290 – 360 ms", "重力落下時に照準がターゲットの後方に置き去りになり、慌てて過剰フリックして行き過ぎる傾向がある"],
        ["Tier 5（初級者 / ビギナー）", "40% 未満", "360 ms 以上", "激しいY軸マウスブレ。手首と腕の脱力ができておらず、放物線の頂点を過ぎると完全にターゲットを見失う"]
      ],
      note: "滞空トラッキング率は空中飛行時間のうちターゲット有効判定枠内にクロスヘアを留められた比率、頂点切り返し遅延はジャンプ頂点でのY軸移動方向反転にかかったミリ秒時間を指します（Woods et al., 2015）。"
    },
    techniques: {
      title: "垂直エイム精度を高める神経運動プロトコル",
      items: [
        {
          name: "手首伸展と指先関節の独立コントロール",
          desc: "マウスの上下移動は腕全体を固めて動かすのではなく、指先を曲げ伸ばしして微調整します（Fitts, 1954）。肩や前腕を力ませると横方向の揺れ（ウォブル）が混入します。",
          tips: "指を軽く縮めてマウスを下へスムーズに引き込み、指を伸ばして上方向へ押し出します。"
        },
        {
          name: "放物線頂点（アペックス）での速度スリップ適応",
          desc: "ジャンプの最高到達点では垂直方向の速度が一瞬ゼロに近づきます（Rashbass, 1961; Land & McLeod, 2000）。ターゲットが止まる直前にマウスの移動速度を自ら緩めてください。",
          tips: "頂点は最大のダメージチャンスです。軌道の一番高いところの直前でマウスの引き速度を抜きます。"
        },
        {
          name: "落下加速度に先行する中心視アンカー配置",
          desc: "ターゲットが降下し始めたら、視線をターゲットの下端へ素早く固定します。重力により落下速度は二次関数的に急増するため、下方に視線を先行させて引き下げを先導します。",
          tips: "落ちてくる敵の上側を見つめないでください。敵の底面に視線を落としてマウスを引き下げます。"
        },
        {
          name: "前腕の摩擦低減とマウスパッドグライド",
          desc: "机やマウスパッドと前腕の皮膚が引っかかると、下方向へのストローク時に突っかかりが生じます。静摩擦抵抗が高いと追従がカクつきます。",
          tips: "アームスリーブを着用するか、手首をパッドの滑りやすい位置に配置して摩擦ドラッグを排除してください。"
        }
      ]
    },
    steps: [
      "ゲーム内感度とマウスDPIを設定で普段のFPSと一致させ、キャンバスをクリックしてカーソルを固定。",
      "画面下部のターゲット射出ポイント付近にクロスヘアを構え、垂直打ち上げの初動に備える。",
      "上空への上昇軌道を滑らかに追い、指先の伸展を使って上昇速度にぴったり合わせる。",
      "頂点での減速に合わせ、マウスを落ち着かせて滞空中のボーナスタイムに最大ダメージを与える。",
      "重力による落下加速に合わせてマウスを真っ直ぐ下へ加速させ、着地前に完全に破壊する。"
    ],
    audience: "Apex Legends、Overwatch 2、Halo Infinite、VALORANTなどで空中ジャンパやエレベーターピーク、立体機動戦での撃ち合い勝率を高めたいFPS競技ゲーマー。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'fitts1954', 'rashbass1961', 'land2000'),
    related: [
      { href: "/ja/drills/fps/strafe-tracking", label: "追いエイム練習（ストレイフトラッキング）" },
      { href: "/ja/drills/fps/recoil-control", label: "リコイル制御練習（リコイルコントロール）" },
      { href: "/ja/drills/fps/angle-hold-trainer", label: "アングルホールド練習（置きエイム）" },
      { href: "/ja/drills/motor/hand-eye-coordination/aim-trainer", label: "エイムトレーナー（反復フリック）" },
      { href: "/ja/drills/reaction-speed/visual-tracking-speed-test", label: "視覚追従速度テスト" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <VerticalAirTrackClient
        copy={{
          h1Keyword: "垂直 エイム 練習",
          h1Suffix: " – 無料ブラウザFPS縦エイムトレーナー",
          statScore: "スコア",
          statTime: "制限時間",
          statAccuracy: "トラッキング命中率",
          statBestScore: "自己ベスト",
          statTargetsDestroyed: "破壊ターゲット数",
          statMaxCombo: "最大コンボ",
          statPeakLevel: "最高到達レベル",
          startTitle: "Vertical Air-Track",
          startSubtitle: "高精度RAWマウス入力 • エンドレス難易度進行",
          startButtonText: "トレーニング開始",
          playAgainText: "もう一度プレイ",
          shareText: "スコアを共有",
          exitText: "終了する",
          stageCaption: "重力加速度に従って放物線を描く空中ターゲットを追従し、滑らかな縦方向のトラッキング精度を養成。",
          rulesTitle: "ドリル操作方法 & スコア計算システム",
          aboutTitle: "垂直 エイム 練習（Vertical Air-Track）について",
          rulesItems: [
            {
              num: "1",
              text: "空中ターゲット追従",
              highlight: "破壊で +100 PTS / +0.4秒",
              result: "重力放物線の落下軌道をスムーズに追跡"
            },
            {
              num: "2",
              text: "高所ボーナス",
              highlight: "最大 +75 PTS",
              result: "高高度でターゲットを破壊するほど高得点"
            },
            {
              num: "3",
              text: "ミス判定・落下ペナルティ",
              highlight: "コンボリセット",
              result: "見失うとコンボ消滅（ペナルティON時は -0.6秒）"
            },
            {
              num: "4",
              text: "レベル進行システム",
              highlight: "1400 PTS毎にレベルアップ",
              result: "重力と飛翔速度が連続的にダイナミック上昇"
            }
          ]
        }}
      />
      <DrillGuide guide={verticalAirTrackGuide} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/vertical-air-track"
          locale="ja"
        />
      </div>
      <DrillFooter />
    </>
  );
}
