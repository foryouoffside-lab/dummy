import ConstantSlowPursuitClient from '@/app/drills/visual-tracking/constant-slow-pursuit/ConstantSlowPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// JAPANESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "追従眼球運動 トレーニング" / "眼球運動 トレーニング" (High-intent ocular motor query)
// Secondary:    "アイトラッキング 練習", "動体視力 トレーニング" (Massive gaming & athletics organic query)
// LSI / Domain:  "滑動性眼球運動 (スムーズパシュート)", "リサージュ曲線 視線追従",
//               "視線ブレ 抑制", "中心窩 視線保持", "サッケード跳躍 抑制", "エイム トラッキング 安定性"
// Authentic Domain Terms: 滑動性追従眼球運動（Smooth Pursuit）, サッケード（衝動性眼球運動）, 網膜スリップ（Retinal Slip）, 前庭動眼反射（VOR）, 小脳片葉・小節（Flocculus/Paraflocculus）
// ============================================================

export const metadata = {
  title: "追従眼球運動トレーニング・低速視覚追従 – 滑動性眼球運動＆リサージュ視線安定性測定 | SkillDrills",
  description: "リサージュ曲線に沿った低速滑動性追従運動（スムーズパシュート）を測定・鍛える無料オンライントレーニング。中心窩の視線保持力を高め、不要なサッケード（視線跳躍）を抑制して動体視力とエイム安定性を強化。登録不要。",
  keywords: [
    "追従眼球運動 トレーニング",
    "追従性眼球運動",
    "眼球運動 トレーニング",
    "アイトラッキング 練習",
    "動体視力 トレーニング",
    "滑動性追従運動",
    "スムーズパシュート",
    "リサージュ曲線 視覚追従",
    "視線ブレ 抑制",
    "サッケード 抑制",
    "エイム トラッキング 安定性",
    "視覚機能 強化"
  ],
  openGraph: {
    title: "追従眼球運動トレーニング・低速視覚追従 – 滑動性眼球運動＆リサージュ視線安定性測定 | SkillDrills",
    description: "リサージュ曲線に沿った低速滑動性追従運動（スムーズパシュート）を測定・鍛える無料オンライントレーニング。中心窩の視線保持力を高め、不要なサッケード（視線跳躍）を抑制して動体視力とエイム安定性を強化。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "追従眼球運動トレーニング・低速視覚追従 – 滑動性眼球運動＆リサージュ視線安定性測定 | SkillDrills",
    description: "滑動性追従眼球運動（スムーズパシュート）と低速視線保持力を測定・強化する無料オンライントレーニング。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/constant-slow-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "視覚追従・アイトラッキング", "item": "https://skilldrills.online/ja/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "追従眼球運動トレーニング (低速追従)", "item": "https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "追従眼球運動トレーニング・低速視覚追従 (Constant Slow Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "リサージュ幾何学曲線に沿って移動する低速ターゲットを滑動性眼球運動で捕捉し続ける、無料ブラウザ完結型アイトラッキング・視線安定化トレーニングアプリケーション。",
  "featureList": [
    "角のない滑らかなリサージュ調和曲線による途切れのない滑動性追従",
    "0.5倍速〜9.0倍速の無段階速度調整とランダム加減速シミュレーション",
    "軌跡ライン非表示・残像エフェクト・グロー表示の個別カスタマイズ",
    "完全クライアントサイド実行による視覚運動データの厳重なプライバシー保護"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "追従眼球運動トレーニング – 滑動性眼球運動 オンライントレーナー | SkillDrills",
  "alternateName": "Constant Slow Pursuit Japan",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit",
  "dateModified": "2026-09-15",
  "description": "無料オンライン眼球運動トレーニング。頭部を固定し眼球のみでターゲットを追尾することで、小脳のゲイン適応を促し、不要なサッケード（視線跳躍）を抑制します。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応の最新モダンウェブブラウザ",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "滑動性追従眼球運動（SPEM）, 中心窩視線保持, サッケード抑制, 前庭動眼反射の分離, 動体視力安定化"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "追従眼球運動トレーニング・低速視覚追従 (Constant Slow Pursuit)",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit",
  "description": "無料ビジュアルトラッキングゲーム。調和リサージュ曲線を滑らかに巡航するターゲットを眼球運動のみで追跡し、眼筋持久力と視覚安定性を向上させます。",
  "genre": ["Eye Tracking", "Visual Training", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "追従眼球運動（スムーズパシュート）の正しい練習手順",
  "dateModified": "2026-09-15",
  "description": "リサージュ曲線を活用して眼球運動の追従精度を高め、視線ブレのない滑らかな動体視力を養うための公式トレーニング手順。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "速度倍率とセッション時間の設定",
      "text": "最初は無理のない低速域（1.0倍速以下）を選択し、セッション時間を60秒または90秒に設定します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "頭部の静止と人間工学的ポジショニングの確立",
      "text": "画面から約50〜70cm離れ、頭部を完全に静止させます。首を振らず眼球のみを動かす姿勢を整えます。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "中心窩によるターゲット連続捕捉（滑動性追従）",
      "text": "「訓練開始」をクリックし、リサージュ曲線上を移動するターゲットの中心点に両眼の焦点をロックします。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "サッケード跳躍の抑制と速度の漸進的向上",
      "text": "視線がカクついて目標を追い越したり遅れたり（追いつきサッケード）しないよう滑らかさを意識し、慣れに応じて速度を引き上げます。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit#step-4"
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
      "name": "追従眼球運動（スムーズパシュート）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "追従眼球運動（Smooth Pursuit Eye Movement / SPEM）とは、動く視覚対象を中心窩（網膜の中心にある最も解像度の高い領域）に捉え続けるために行われる、随意的な滑らかな眼球の追従運動です。視点を瞬間的に跳躍させるサッケードとは異なり、網膜像の滑り（網膜スリップ速度）を大脳皮質視覚野と小脳が計算し、標的速度と一致するように眼球筋へ連続的な運動出力を送ることで成立します（Rashbass, 1961; Krauzlis, 2004）。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜ低速での追従眼球運動が重要で難しいのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "対象が低速で動く場合、眼球運動速度がわずかでも標的速度を下回ると網膜スリップが生じ、脳は遅れを補正するために不随意な跳躍運動（追いつきサッケード / Catch-up Saccade）を強制発動してしまいます（Robinson, 1965）。低速追従では運動の勢いに頼れないため、小脳片葉による持続的な高ゲイン運動制御が要求され、視線安定性の真の指標となります。"
      }
    },
    {
      "@type": "Question",
      "name": "リサージュ曲線（Lissajous Curve）を使用する理由は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "リサージュ曲線は、直交する水平・垂直方向の正弦波振動を異なる周波数比で合成した滑らかな無限幾何学曲線です。急激な角や反転ストップが存在しないため、眼球が減速・停止することなく、全方向（斜め・円周・S字）への連続的な滑動運動を途切れずに訓練できる理想的な運動軌跡です。"
      }
    },
    {
      "@type": "Question",
      "name": "この眼球運動トレーニングはFPSゲームやスポーツにどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apex Legends、Overwatch、VALORANTなどの競技FPSでは、レレレ移動（ストレイフ）する敵に対して視線がカクつくとクロスヘアが外れ弾が当たりません。追従眼球運動が洗練されると、視界ブレ（動体ボケ）を最小化して標的を鮮明に捉え続けられ、トラッキングエイムの命中率が飛躍的に向上します（Yang et al., 2025）。野球、テニス、卓球などの球技でも打球追尾の安定性に直結します。"
      }
    },
    {
      "@type": "Question",
      "name": "首や頭を動かしてターゲットを追ってはいけない理由は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "頭部を動かすと、内耳の三半規管が刺激されて「前庭動眼反射（VOR: Vestibulo-Ocular Reflex）」が主導権を握ってしまいます（Leigh & Zee, 2015）。VORは無意識の反射機構であるため、大脳皮質や小脳による精密な滑動性眼球運動系（SPEM）の回路が十分に刺激されません。眼球運動そのものを鍛えるには、頭部を完全に静止させ外眼筋のみで追従することが不可欠です。"
      }
    },
    {
      "@type": "Question",
      "name": "1日にどのくらいの時間練習するのが効果的ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1回60〜90秒のセッションをインターバルを挟みながら3〜5回、合計5〜10分程度行うのが最適です。外眼筋は非常に繊細なため、過度な長時間連続練習は眼精疲労や集中力低下を招きます。短時間の集中セッションを毎日継続することで、小脳の神経シナプス可塑性が定着します。"
      }
    },
    {
      "@type": "Question",
      "name": "目が疲れたり涙が出てきたりした場合はどうすればよいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "注視集中によって瞬目（まばたき）頻度が低下し、角膜表面が乾燥しているサインです。直ちにセッションを一時停止し、意識的に深いまばたきを数回行い、5メートル以上離れた遠くの景色を20〜30秒間眺めて毛様体筋と外眼筋をリラックスさせてください。"
      }
    },
    {
      "@type": "Question",
      "name": "ディスプレイのリフレッシュレート（Hz）は追従精度にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "標準的な60Hzモニターでは描画が約16.7msごとにしか更新されず、動く物体の輪郭に微小なコマ送り感（ストロボ効果）が生じます。144Hz（約6.9ms）や240Hz（約4.1ms）の高リフレッシュレート環境では、網膜に届く運動ベクトルが極めて滑らかになり、脳が速度計算を狂わせずに純粋な滑動追従を持続できます（Woods et al., 2015）。"
      }
    },
    {
      "@type": "Question",
      "name": "目標予測（Predictive Pursuit）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "周期的で規則的な軌跡を追従する際、人間の脳内内部モデル（小脳）は過去の運動パターンから未来の軌道を予測し、感覚遅延（約100msの視覚伝達ラグ）をゼロにして目標と完璧に同期した眼球運動を生成します（Barnes, 2008）。本ドリルを継続することで、視覚情報が届く前に対象の動きを先読みする予測追従能力が強化されます。"
      }
    },
    {
      "@type": "Question",
      "name": "この眼球運動トレーニングは無料ですか？データは安全ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、SkillDrillsの追従眼球運動トレーニングは完全無料で、登録や課金は一切ありません。セッション記録、選択設定、総試行回数などのデータはすべてユーザーの端末内（ブラウザのlocalStorage）にのみ暗号化保存され、外部サーバーへの通信は一切行われません。"
      }
    }
  ]
};

const guideProps = {
  heading: "滑動性追従眼球運動（SPEM）とリサージュ視線安定化の神経科学的基準",
  intro: [
    "追従眼球運動（Smooth Pursuit Eye Movement / SPEM）とは、視野内を移動する物体を中心窩（高解像度の中心視野）に安定して捉え続けるために発達した高度な動体視覚機能です。静止した目標間を高速で跳躍する衝動性眼球運動（サッケード）とは根本的に異なり、視覚野（MT野/MST野）による対象速度の算出と、網膜像のブレ（網膜スリップ）をゼロに近づける小脳片葉（Flocculus）の精密な運動ゲイン制御によって達成されます（Rashbass, 1961; Krauzlis, 2004）。",
    "低速域における視覚追従の特異性：ターゲットの移動速度が緩やかな場合、眼球運動の速度が標的の角速度と完全に一致しないと即座に視野遅れが生じます。脳はこの誤差を補うために、不随意な「追いつきサッケード（Catch-up Saccade）」を頻繁に介入させてしまい、視線がカクついて目標の微細な変化を見落とします（Robinson, 1965）。低速域でサッケードの乱入を完全に抑制し、連続的かつ滑らかな眼球運動を持続できる能力こそが、卓越した視覚運動神経の証です。",
    "リサージュ幾何学曲線による全方位トレーニング：直線的な往復運動では折り返し地点で必ず速度がゼロになり、慣性予測が容易になりすぎます。本ドリルが採用するリサージュ軌道（水平余弦波と垂直正弦波の位相合成）は、角や停止点を持たない無限の閉曲線を描き、上下左右・斜め方向の各外眼筋（内直筋・外直筋・上斜筋・下斜筋）を均等かつ複合的に稼働させます。競技FPSにおける左右ストレイフ戦（Yang et al., 2025）や球技における曲線軌道の見極め（Appelbaum & Erickson, 2018）に直結する運動協調性を養います。",
    "人間工学的セッティングと測定基準：効果的なトレーニングのためには、頭部を動かさず両眼のみで標的を追尾することが極めて重要です。頭部を振ってしまうと、内耳の三半規管が作動して前庭動眼反射（VOR）による代償が起き、大脳皮質・小脳の追従神経系が鍛えられません（Leigh & Zee, 2015）。また、フレーム飛びによる視覚ノイズを防ぐため、144Hz以上の滑らかなディスプレイ環境での実施を推奨します（Woods et al., 2015）。すべてのセッション設定と履歴はローカルに安全に保存されます。"
  ],
  benchmarks: {
    title: "追従眼球運動・視線安定性パフォーマンス基準（エディトリアルガイド）",
    headers: ["習熟度ティア", "設定速度帯 (Speed Multiplier)", "視線保持力・サッケード抑制特性", "神経眼球運動プロファイル"],
    rows: [
      ["ティア1：神速・絶対視線追従 (Apex Gaze Lock)", "2.0x 以上の高速域", "追いつきサッケード皆無。高速リサージュ曲線の急峻なカーブでも中心窩が目標に吸着。", "小脳の運動ゲインと予測制御（Barnes, 2008）が極限まで同期。プロeスポーツ選手や一流球技アスリート水準。"],
      ["ティア2：卓越・高精度滑動 (Superior Pursuit)", "1.4x – 1.9x 中高速域", "一貫した滑動性追従。偶発的な方向転換でも視線ブレが極めて少なく、微小サッケードのみで即時復帰。", "優れた外眼筋協調性と網膜スリップ検出力。動く標的の微細なディテールを完全に視認可能。"],
      ["ティア3：標準・健常成人基準 (Solid Baseline)", "1.0x – 1.3x 標準域", "標準速度での滑らかな追従。カーブの変曲点付近で時折小さな視線跳躍（カクつき）が混入。", "健康な若年成人の標準的眼球運動機能。一般的な日常生活やカジュアルゲームに十分なレベル。"],
      ["ティア4：視線跳躍混入・要反復 (Developing Pursuit)", "0.7x – 0.9x 低速域", "眼球運動が標的から遅れがちになり、ステップ状のサッケードで追従を補正する頻度が高い。", "低速域での運動ゲイン不足。頭部を固定したまま外眼筋だけで追尾する意識の定着が必要。"],
      ["ティア5：初期段階・眼筋疲労 (Extended Jitter)", "0.7x 未満", "視線が軌道から大きく逸脱。頭部が一緒に動いてしまっているか、重度の眼精疲労の兆候。", "まずは低速での軌道トレースから開始し、頭部静止とリラックスした中心窩固視を基礎から養成。"]
    ],
    note: "本基準値は眼球運動科学および神経眼科の古典的知見（Robinson, 1965; Rashbass, 1961; Krauzlis, 2004; Leigh & Zee, 2015）をもとに、リサージュ追従時の運動継続性を評価するために策定された編集基準です。"
  },
  techniques: {
    title: "追従眼球運動の安定性を極限まで高める4大メソッド",
    items: [
      {
        name: "頭部固定による前庭動眼反射（VOR）の完全分離",
        desc: "Leigh & Zee（2015）の神経眼科知見が示す通り、首を動かして目標を追うと内耳反射（VOR）が働き、大脳皮質追従系（SPEM）へのトレーニング負荷が消失してしまいます。",
        tips: "顎を軽く引き、頭部を完全に静止させた状態で、眼球の回転運動のみでターゲットを捉え続ける姿勢を保ちましょう。"
      },
      {
        name: "中心窩アンカリングと網膜スリップの意識的抑制",
        desc: "Krauzlis（2004）が解明したように、追従系を駆動する一次刺激は「網膜上の像の滑り速度」です。目標の中心点を網膜黄斑部中心窩に固定することで不要なサッケードを抑えられます。",
        tips: "ターゲットの球体全体をぼんやり見るのではなく、中央の核（コア）の一点に視線を突き刺すようにロックし続けます。"
      },
      {
        name: "リサージュ調和振動の予測制御（内的モデルの構築）",
        desc: "Barnes（2008）は、反復的な周期運動に対して小脳が予測信号を出力し、約100msの神経伝達遅延を相殺できることを証明しました。",
        tips: "次の軌道展開を頭の中で予見しながら眼球を先回りして滑らせる感覚を養うと、急カーブでも視線が遅れなくなります。"
      },
      {
        name: "高リフレッシュレート環境と定期的な瞬目（まばたき）リセット",
        desc: "Woods et al.（2015）の実験の通り、60Hzから144Hz/240Hzへの移行は表示のコマ落ちを大幅に削減し、滑動ゲインの維持を物理的に支援します。",
        tips: "高周波ゲーミングモニターを使用し、セッション合間には意識的に強めのまばたきを行って角膜の涙液層を修復してください。"
      }
    ]
  },
  steps: [
    "速度倍率（0.5x〜2.0x）と練習時間（60秒推奨）を選択してセッションを開始します。",
    "画面中央から約50〜70cmの距離を保ち、頭部を完全に静止させて姿勢を安定させます。",
    "リサージュ軌道上を滑らかに動き始めるターゲットの中心核に視線をフォーカスします。",
    "首を振らず、外眼筋のみを使ってターゲットの速度と完全に一致させて視線を滑らせます。",
    "途中で視線がカクつく（サッケード）感覚があれば、速度を少し下げて滑らかさを最優先に再調整します。"
  ],
  audience: "競技FPS（Apex/Overwatch/VALORANT）プレイヤー、野球・テニス・卓球・格闘技選手、動体視力と視線ブレ抑制を強化したいアスリート、PC作業による視機能低下をケアしたい方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('robinson1965', 'rashbass1961', 'krauzlis2004', 'barnes2008', 'leigh2015', 'yang2025', 'woods2015'),
  related: [
    { href: "/ja/drills/visual-tracking/sine-wave-pursuit", label: "正弦波追従トレーニング (Sine Wave)" },
    { href: "/ja/drills/visual-tracking/infinity-pursuit", label: "8の字ループ追従運動 (Infinity)" },
    { href: "/ja/drills/visual-tracking/directional-chaos-pursuit", label: "不規則方向転換追従 (Directional Chaos)" },
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
      <ConstantSlowPursuitClient
        copy={{
          title: "追従眼球運動トレーニング・低速視覚追従",
          subtitle: "滑動性眼球運動（スムーズパシュート）＆リサージュ視線安定化エクササイズ"
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/constant-slow-pursuit" />
      </div>
    </>
  );
}
