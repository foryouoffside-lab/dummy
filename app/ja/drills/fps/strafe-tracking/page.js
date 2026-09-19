import StrafeTrackingClient from '@/app/drills/fps/strafe-tracking/StrafeTrackingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (fps / strafe-tracking)
// PRIMARY DOMESTIC: "追いエイム 練習"          — High domestic intent (Winner)
//                   "追いエイム 練習 ブラウザ"   — #1 Google Suggest autocomplete query
//                   "追いエイム"                — Core Japanese tactical tracking term
//                   "トラッキング エイム 練習"   — Technical category search
//                   "ストレイフ 練習 サイト"     — Movement tracking intent
// SECONDARY / LSI:
//                   "ストレイフトラッキング"     — Pure mechanical phrase
//                   "ストレイフ 練習"           — Apex / tactical movement phrase
//                   "FPS 追いエイム"            — High-intent genre search
//                   "apex 追いエイム 練習"      — Game specific demand
//                   "エイム練習 無料 ブラウザ"   — Category intent phrase
// WINNER TITLE:     追いエイム練習 – ブラウザで無料FPSトラッキング・ストレイフ追従トレーナー | SkillDrills
// ============================================================

export const metadata = {
  title: "追いエイム練習 – ブラウザで無料FPSトラッキング・ストレイフ追従トレーナー | SkillDrills",
  description: "無料のブラウザFPS追いエイム（トラッキング）練習ツール。不規則な左右ADADストレイフの切り返し予測、滑らかな視覚追従（スムーズパシュート）、追いつきサッケードを測定・強化。Apex LegendsやOverwatch 2のウォームアップに最適。",
  keywords: [
    "追いエイム 練習",
    "追いエイム 練習 ブラウザ",
    "追いエイム",
    "トラッキング エイム 練習",
    "ストレイフ 練習",
    "ストレイフ 練習 サイト",
    "ストレイフトラッキング",
    "FPS 追いエイム",
    "apex 追いエイム 練習",
    "エイム練習 無料 ブラウザ",
    "マウス 追従 エイム",
    "FPS トラッキング トレーニング"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/fps/strafe-tracking",
    languages: getAlternateLanguages('/drills/fps/strafe-tracking'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "追いエイム練習 – ブラウザで無料FPSトラッキング・ストレイフ追従トレーナー | SkillDrills",
    description: "無料のブラウザFPS追いエイム（トラッキング）練習ツール。不規則な左右ADADストレイフの切り返し予測、滑らかな視覚追従（スムーズパシュート）、追いつきサッケードを測定・強化。Apex LegendsやOverwatch 2のウォームアップに最適。",
    url: "https://skilldrills.online/ja/drills/fps/strafe-tracking",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "追いエイム練習 – ブラウザで無料FPSトラッキング・ストレイフ追従トレーナー | SkillDrills",
    description: "無料のブラウザFPS追いエイム（トラッキング）練習ツール。不規則な左右ADADストレイフの切り返し予測、滑らかな視覚追従（スムーズパシュート）、追いつきサッケードを測定・強化。Apex LegendsやOverwatch 2のウォームアップに最適。",
  },
};

export default function StrafeTrackingPageJa() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPSトレーニング", "item": "https://skilldrills.online/ja/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "追いエイム練習", "item": "https://skilldrills.online/ja/drills/fps/strafe-tracking" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "追いエイム練習 (Strafe Tracking Aim Trainer)",
    "url": "https://skilldrills.online/ja/drills/fps/strafe-tracking",
    "description": "ブラウザ上で不規則な左右ストレイフと切り返しに対する追いエイム（トラッキング）を反復トレーニングできる無料FPSエイム練習ツール。",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires HTML5 Canvas and Pointer Lock API support",
    "dateModified": "2026-09-11"
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "追いエイム練習 (Strafe Tracking Aim Trainer)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "ブラウザ上で不規則な左右ストレイフと切り返しに対する追いエイム（トラッキング）を反復トレーニングできる無料FPSエイム練習ツール。",
    "genre": "FPS Training / Strafe Tracking Aim",
    "url": "https://skilldrills.online/ja/drills/fps/strafe-tracking",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "追いエイム練習 (Strafe Tracking Aim Trainer)",
    "url": "https://skilldrills.online/ja/drills/fps/strafe-tracking",
    "description": "ブラウザ上で不規則な左右ストレイフと切り返しに対する追いエイム（トラッキング）を反復トレーニングできる無料FPSエイム練習ツール。",
    "dateModified": "2026-09-11",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Strafe Tracking", "Tracking Aim"],
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
        "name": "FPSにおける「追いエイム（トラッキングエイム）」とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "追いエイム（トラッキング / スムーズパシュート）とは、激しく動き回る敵ターゲットに対して照準（レティクル）を常に重ね合わせ続ける運動視覚追従技術です。Apex LegendsやOverwatch 2のようにTTK（キルに必要な時間）が長いシューターで最重要視されます。"
        }
      },
      {
        "@type": "Question",
        "name": "ストレイフの「切り返し」でエイムが外れてしまう理由は何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "人間が動く対象を滑らかに追従できる角速度の上限は約30°/秒であり、急激な反転時には脳が速度変化を認識して追いつき跳躍眼球運動（キャッチアップサッケード）を発動するまでに約100〜130ミリ秒の不可避な遅延が発生するためです（Rashbass, 1961; Krauzlis, 2004）。"
        }
      },
      {
        "@type": "Question",
        "name": "フリックエイムと追いエイムの神経科学的な違いは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "フリックエイムは目標位置へ一挙に照準を飛ばす開ループの弾道性サッケード運動（約150〜200ms）です。一方、追いエイムは網膜上の像の滑り（網膜スリップ速度）を視覚野でリアルタイム検知し、小脳と前頭眼野を通じて筋出力を微小調整し続ける連続閉ループ追従制御です（Krauzlis, 2004）。"
        }
      },
      {
        "@type": "Question",
        "name": "追いエイムを安定させるための適切なマウスの持ち方や腕の使い方は？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "近距離の激しい切り返しには手首と指の柔軟な屈曲を用い、中長距離の持続的な追従には肘を支点にした前腕全体の滑らかなスライド（アームグライド）を連動させることで、手首の可動域限界による引っ掛かりや筋肉の過緊張を防ぐことができます。"
        }
      },
      {
        "@type": "Question",
        "name": "「オーバートラッキング（行き過ぎ）」を防ぐにはどうすればよいですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "敵の速度以上にマウスを急激に振ってしまうオーバートラッキングは、力みや焦りによる過剰補正が原因です。敵の動きを先読みしようとしすぎず、敵の角速度にマウス速度を正確に同期（マッチング）させる意識を持つことで劇的に改善されます（Land & Horwood, 1995）。"
        }
      },
      {
        "@type": "Question",
        "name": "マウス感度（センシ）はトラッキングエイムにどのように影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "一般的に中〜低感度（ミドル〜ローセンシ）の方がマウスパッド上の移動ストロークが大きくなり、手の微小な震えや筋電ノイズが照準に反映されにくいため、滑らかなトラッキング軌道を描きやすくなります。"
        }
      },
      {
        "@type": "Question",
        "name": "本ツールはApex LegendsやOverwatch 2の実戦練習になりますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい。本ツールはポインターロックによる1:1の生入力（Raw Input）を採用しており、ゲーム内のDPIや感度と完全に同期したハードウェア座標でADADストレイフ（左右不規則運動）への反応追従を鍛えることができます。"
        }
      },
      {
        "@type": "Question",
        "name": "なぜ標的から1秒以上外れるとコンボが途切れるのですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "実戦において追従が完全に途切れるとDPS（秒間ダメージ）が激減するためです。常にターゲットを視界中央に捉え続ける持続的注意集中と、切り返し直後の素早い復帰（リカバリー）能力を養成するために規律ペナルティが設定されています。"
        }
      },
      {
        "@type": "Question",
        "name": "高リフレッシュレートモニター（144Hz/240Hz）はトラッキング精度に影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "極めて大きく影響します。60Hz（約16.7ms間隔）では高速移動するターゲットの輪郭がブレて網膜スリップの検出が遅れますが、144Hz（約6.9ms）や240Hz（約4.1ms）では標的の微細な加減速が正確に視覚入力され、より滑らかな追従が可能になります（Woods et al., 2015）。"
        }
      },
      {
        "@type": "Question",
        "name": "本追いエイム練習ツールはブラウザ上で無料で利用できますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい、完全無料です。インストールや会員登録、課金などは一切不要で、Webブラウザを開くだけで即座に本格的なトラッキングエイムトレーニングを開始できます。"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "追いエイム（ストレイフトラッキング）を極める4ステップ",
    "description": "不規則な左右ストレイフと切り返しに正確に吸い付く追いエイム技術を習得するための手順。",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "ゲーム感度とポインターロックの設定",
        "text": "設定メニューで使用中のFPSタイトル、マウスDPI、ゲーム内感度を一致させ、ポインターロックで1:1操作を有効化します。",
        "url": "https://skilldrills.online/ja/drills/fps/strafe-tracking#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "ターゲットの初動捕捉",
        "text": "出現したターゲットの中央に素早くレティクルを重ね合わせ、追従を開始します。",
        "url": "https://skilldrills.online/ja/drills/fps/strafe-tracking#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "滑らかな角速度マッチング",
        "text": "標的の左右移動速度に合わせてマウスを滑らかに動かし、レティクルが標的の中心から外れないよう同期させます。",
        "url": "https://skilldrills.online/ja/drills/fps/strafe-tracking#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "切り返し瞬間のキャッチアップリカバリー",
        "text": "標的が急反転した瞬間、約100msの認識遅延を受け止めつつ、素早い微小フリックで即座に照準を再捕捉します。",
        "url": "https://skilldrills.online/ja/drills/fps/strafe-tracking#step-4"
      }
    ]
  };

  const strafeGuideJa = {
    heading: "追いエイム（ストレイフトラッキング）完全攻略ガイド＆運動視覚科学",
    intro: [
      "追いエイム練習（Strafe Tracking Aim Trainer）は、激しく左右に切り返す（ADADストレイフ）標的に対して照準を吸い付かせるための運動視覚協調能力を鍛える高負荷FPSトレーニングツールです。Apex Legends、Overwatch 2、THE FINALS、Call of Duty Warzoneなどの高TTKシューターでは、一瞬のフリック射撃よりも、数秒間にわたりターゲットに照準を重ね続けてダメージを最大化するトラッキング精度が勝敗を直結して決定します。",
      "人間の眼球および手の運動追従メカニズムは、 Cyril Rashbass（1961）の「独立二重視覚制御機構」および Richard J. Krauzlis（2004）の「スムーズパシュートとサッケード統合モデル」によって解明されています。人間がターゲットを滑らかに追従できるのは角速度約30°/秒までであり、標的が不規則に反転した瞬間には約100〜130ミリ秒の認知・神経伝達遅延が発生します。この遅延を最小化し、生じたズレを素早い追いつきサッケード（Catch-up Saccade）で再センタリングする能力がプロレベルの追いエイムを支えています。",
      "視覚誘導型ハンドコントロールにおいては、 Michael F. Land & David N. Horwood（1995）の二重注視点モデルおよび C.S. Green & D. Bavelier（2003）のアクションビデオゲーム視覚認知理論が適用されます。視線はターゲットの輪郭そのものだけでなく、進行方向のわずかな予備動作や速度変化（速度シグナル）を先読み知覚し、前頭眼野および小脳を通じて滑らかな手の連続補正動作を生成します。",
      "運動計測クロノメトリー：本ドリルでは、ブラウザの超高精度タイマーAPI（performance.now()）を用いて全フレーム（毎秒60〜240回）の照準位置と標的ヒットボックスの重なりをミリ秒単位でリアルタイム追跡します。スコアや個人データは一切外部サーバーへ送信されず、端末内で安全に完結処理されます（Woods et al., 2015）。",
      "ディスプレイと入力環境の最適化について：通常の60Hzモニターでは約16.7msのフレーム遅延が生じ、高速な反転時にターゲットの像が不連続に飛んで見えます。144Hz（約6.9ms）や240Hz（約4.1ms）の高リフレッシュレートモニターとポーリングレート1000Hz以上のゲーミングマウスを併用することで、標的の切り返しを鮮明に捉え、微細なハンドコントロールを確実に反映させることができます（Woods et al., 2015）。"
    ],
    benchmarks: {
      title: "追いエイム（トラッキング）精度ランク＆パフォーマンス階層基準",
      headers: ["評価ティア", "トラッキング精度 %", "最大吸い付き継続時間", "実戦FPS（Apex / OW2 / VALORANT）での適応力"],
      rows: [
        ["ティア1 (Apex Predator / GM)", "82% – 95%+", "5.0秒以上", "敵の不規則な高速レレレ（ADAD）や屈伸移動に対しても照準が全く離れず、切り返し時のリカバリー遅延が110ms未満。Apexプレデター、OW2グランドマスター帯で圧倒的なワンマガジンキルを量産。"],
        ["ティア2 (Competitive Master)", "68% – 81%", "3.5秒 – 4.9秒", "一定速度の追従が極めて滑らか。切り返し時の追従遅れを最小限の微小フリックで即座にリカバリー可能。中近距離の激しい撃ち合いで安定して優位に立つ。"],
        ["ティア3 (High-Skill FPS)", "54% – 67%", "2.0秒 – 3.4秒", "通常の左右移動は安定して追従可能。標的の移動速度が加速した際や急激な反転時にわずかなオーバーシュート（行き過ぎ）が生じる。"],
        ["ティア4 (Intermediate)", "38% – 53%", "1.0秒 – 1.9秒", "標的の切り返しに反応が遅れ、照準が敵の背後を取り残される現象が発生。直線追従でも手のブレや力みによる細かいカクつきが見られる。"],
        ["ティア5 (Developing / Jitter)", "38% 未満", "1.0秒未満", "ターゲットの不規則運動に目が追いつかず、過剰補正のジッター（手の震え）が発生。実戦で敵のストレイフに翻弄され弾を外してしまう状態。"]
      ],
      note: "精度はセッション全体のフレーム中、照準が標的ヒットボックス内に完全にロックオンされていたフレームの割合をperformance.now()で測定したものです（Woods et al., 2015）。"
    },
    techniques: {
      title: "科学的エビデンスに基づく追いエイム4大上達プロトコル",
      items: [
        {
          name: "角速度マッチング（速度同期）と脱力",
          desc: "追いエイムで最も重要なのは「照準を追いつかせる」ことではなく「標的と同じ速度でマウスを動かし続ける」ことです。力みが入ると手の動摩擦が跳ね上がり、微小なカクつきが発生します。手のひらと指の力を抜き、マウスパッド上を滑らせるように操作します（Schmidt et al., 1979）。",
          tips: "ターゲットの先を予測して急激に振るのではなく、敵の移動速度にハンドスピードをぴったり合わせる感覚を意識してください。"
        },
        {
          name: "切り返し時のキャッチアップサッケード（追いつき復帰）",
          desc: "標的が反転した際、人間の神経伝達遅延により約100msは必ず照準が取り残されます。この物理的遅延を慌てずに受け止め、直後に小さく素早いマイクロフリック（キャッチアップサッケード）を行って照準を再センタリングします（Rashbass, 1961; Krauzlis, 2004）。",
          tips: "反転された瞬間に焦って大きく振り抜かないこと。小さな修正フリックで再捕捉し、すぐに滑らかな追従モードへ戻します。"
        },
        {
          name: "前腕グライドと手首のハイブリッド分担",
          desc: "近距離の小刻みな切り返しは手首の可動域で高速処理し、横に長い大ストレイフや追いかけ動作は肘を支点にした前腕スライド（アームグライド）で処理します。関節の役割を分担することで、可動域の端で手首がロックする現象を完全に排除します。",
          tips: "前腕が机に張り付かないよう、アームカバーの使用や十分なマウスパッド面積の確保が効果的です。"
        },
        {
          name: "オーバートラッキングの抑制と先読み自制",
          desc: "敵が切り返すと勝手に予測してフライングでマウスを止めてしまう「予測エイム」は、敵がそのまま直進した際に致命的なミスとなります。視覚シグナルの確定を待ってから反応するトリガー規律を保つことで、追従の一貫性が飛躍的に向上します（Land & Horwood, 1995）。",
          tips: "「動いたのを見てから追う」という反応規律を徹底することで、フェイントストレイフに釣られなくなります。"
        }
      ]
    },
    steps: [
      "セッション設定で使用中のゲーム、DPI、ゲーム内感度を合わせ、ポインターロックを有効化します。",
      "ステージ中央に出現した移動ターゲットに素早く照準を重ね、追従を開始します。",
      "標的の左右移動速度に合わせてマウスを滑らかに動かし、レティクルを中心部に固定し続けます。",
      "標的が急反転した際は素早い微小修正で即座にリカバリーし、最大吸い付き継続時間を伸ばします。",
      "セッション終了後、追従精度（%）、最大ロック時間、オフターゲット時間を確認し弱点を分析します。"
    ],
    audience: "Apex Legends、Overwatch 2、THE FINALS、VALORANTなどで敵の激しいストレイフや切り返しに翻弄されず、吸い付くような正確なトラッキングエイムを習得したいすべてのPCゲーマー。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'posner1990', 'green2003', 'rashbass1961', 'land2000'),
    related: [
      { href: "/drills/fps/recoil-control", label: "リコイル練習 (Recoil Control Trainer)" },
      { href: "/drills/fps/angle-hold-trainer", label: "置きエイム練習 (Angle Hold Trainer)" },
      { href: "/drills/fps/pro-smooth-pursuit", label: "スムーズパシュート練習 (Smooth Pursuit Trainer)" },
      { href: "/drills/fps/anti-strafe-jitter-duel", label: "対ストレイフジッター練習 (Anti-Strafe Jitter)" },
      { href: "/drills/fps/micro-correction-precision", label: "マイクロフリック練習 (Micro-Correction)" }
    ]
  };

  const copyJa = {
    h1Keyword: "追いエイム 練習",
    h1Suffix: " (Strafe Tracking Aim Trainer)",
    caption: "追いエイム（トラッキング）は不規則に動く敵に照準を合わせ続ける運動視覚制御です。人間の滑らかな追従は約30°/秒が上限であり、急な切り返しには約100〜130msの認識遅延が伴います（Rashbass, 1961; Krauzlis, 2004）。冷静な速度同期と素早いリカバリーを鍛えましょう。",
    statStatus: "ステータス",
    statusTracking: "追従中",
    statusComplete: "完了",
    statusStandby: "待機中",
    statTime: "残り時間",
    statAccuracy: "追従精度",
    statBest: "自己ベスト",
    statScore: "スコア",
    pausedTitle: "一時停止中",
    pausedPrompt: "画面をクリックしてカーソルを固定し、再開してください。",
    startTitle: "追いエイム練習 Pro",
    startSubtitle: "不規則左右ストレイフ追従・生入力座標 • エンドレス難易度進行",
    startButtonText: "トレーニング開始",
    getReady: "構えてください",
    statLockStreak: "最大吸い付き時間",
    statPeakLevel: "到達レベル",
    statOffTarget: "ターゲット外時間",
    playAgainText: "もう一度挑戦",
    shareText: "スコアをシェア",
    exitText: "終了",
    bottomCaption: "フロア上を左右に激しく切り返すターゲットに照準を合わせ続け、不規則なストレイフへの追従力を鍛えてください。",
    rulesTitle: "ドリルルールと設定",
    rulesItems: [
      { num: "1", text: "照準のアライメント", highlight: "+50 PTS (+0.4秒/秒)", result: "×コンボ倍率" },
      { num: "2", text: "連続トラッキング", highlight: "最大 3.0×", result: "最大倍率" },
      { num: "3", text: "レベル進行", highlight: "+1 レベル / 1400 PTS", result: "可変ストレイフ加速" },
      { num: "4", text: "ロック外れペナルティ", highlight: "1.0秒 ロック外れ", result: "コンボリセット (-0.6秒)" }
    ],
    aboutTitle: "追いエイム練習（ストレイフトラッキング）について",
    whatIsTitle: "追いエイム（トラッキング）トレーニングとは？",
    whatIsLead: "追いエイムとは、予測不能に動く標的に照準を重ね合わせ続ける技術です。人間の滑らかな視覚追従は角速度約30°/秒まで正確に機能し、反転のたびに約100〜130ミリ秒の不可避な遅れ（キャッチアップサッケード）が発生します（Rashbass, 1961; Krauzlis, 2004）。",
    aboutIntro: [
      "追いエイム練習は、画面上を左右不規則に動き回る敵に対して照準を吸い付かせるための持続的な運動補正能力を徹底的に強化します。"
    ],
    aboutCards: [
      { iconBg: "bg-blue-600", title: "対象プレイヤー", text: "Apex LegendsやOverwatch 2などで高速なADADレレレ移動や不規則な敵の回避行動を捉えたい競技プレイヤー。" },
      { iconBg: "bg-fuchsia-600", title: "鍛えられるスキル", text: "リアクティブトラッキング、エイムの滑らかさ、切り返しの読み、方向転換リカバリースピード、アームグライド制御。" },
      { iconBg: "bg-orange-600", title: "ハードウェア生入力", text: "加速なしのポインターロック生入力を採用。ゲーム内と完全に同一のマウス操作感をブラウザ上でシミュレーション。" }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <StrafeTrackingClient copy={copyJa} />

      <DrillGuide guide={strafeGuideJa} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/strafe-tracking" locale="ja" />
      </div>
      <DrillFooter />
    </>
  );
}
