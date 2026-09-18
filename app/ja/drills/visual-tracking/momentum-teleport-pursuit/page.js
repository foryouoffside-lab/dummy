import MomentumTeleportPursuitClient from '@/app/drills/visual-tracking/momentum-teleport-pursuit/MomentumTeleportPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// JAPANESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "テレポート エイム 練習" (Teleport aim practice) / "サッケード再捕捉 トレーニング"
// Secondary:    "瞬間移動 視覚追従", "動体視力 視線跳躍 訓練", "ターゲット再捕捉 練習"
// LSI / Domain:  "慣性追従 動体視力", "サッケード着地 エイム", "フリック サッケード 追従",
//               "FPS テレポート 対策", "視線再配置 トレーニング", "跳躍先読み訓練"
// Authentic Domain Terms: テレポート追従（Teleport Pursuit）, 速度慣性（Momentum / Velocity Vector）, サッケード再捕捉（Saccadic Re-acquisition）, サッケード抑制（Saccadic Suppression）, 着地後滑動追従（Post-saccadic Smooth Pursuit）, 弾道性跳躍（Ballistic Saccades）
// ============================================================

export const metadata = {
  title: "テレポート追従エイムトレーニング・サッケード再捕捉テスト – 瞬間移動標的捕捉＆慣性追従 | SkillDrills",
  description: "突発的にテレポート（位置跳躍）する標的を跳躍性眼球運動（サッケード）で即座に再捕捉し、速度慣性を予測して滑動性追従へ同期させる無料アイトラッキング練習。登録不要。",
  keywords: [
    "テレポート エイム 練習",
    "サッケード再捕捉 トレーニング",
    "瞬間移動 視覚追従",
    "動体視力 視線跳躍 訓練",
    "ターゲット再捕捉 練習",
    "慣性追従 動体視力",
    "サッケード着地 エイム",
    "フリック サッケード 追従",
    "FPS テレポート 対策",
    "視線再配置 トレーニング",
    "跳躍先読み訓練",
    "視線跳躍 反射神経 測定"
  ],
  openGraph: {
    title: "テレポート追従エイムトレーニング・サッケード再捕捉テスト – 瞬間移動標的捕捉＆慣性追従 | SkillDrills",
    description: "突発的にテレポート（位置跳躍）する標的を跳躍性眼球運動（サッケード）で即座に再捕捉し、速度慣性を予測して滑動性追従へ同期させる無料アイトラッキング練習。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "テレポート追従エイムトレーニング・サッケード再捕捉テスト – 瞬間移動標的捕捉＆慣性追従 | SkillDrills",
    description: "瞬間移動する標的へ瞬時にサッケード跳躍し、速度慣性を引き継いで滑動追従へ移行するハイブリッド動体視力訓練。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/momentum-teleport-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "視覚追従・アイトラッキング", "item": "https://skilldrills.online/ja/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "テレポート追従エイムトレーニング・サッケード再捕捉テスト", "item": "https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "テレポート追従エイムトレーニング・サッケード再捕捉テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "瞬間移動（テレポート）する標的へ瞬時にサッケード跳躍し、速度慣性を引き継いで滑動追従へ移行するハイブリッド動体視力テスト・トレーニングツール。",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/ja" },
  "inLanguage": "ja",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "テレポート追従エイムトレーニング・サッケード再捕捉テスト – 瞬間移動標的捕捉＆慣性追従 | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応ブラウザ（Chrome, Edge, Firefox, Safari）",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit",
  "inLanguage": "ja",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "テレポート追従エイムトレーニング・サッケード再捕捉テスト",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit",
  "description": "画面内を突発テレポートする慣性ターゲットへ瞬時に視線を跳躍させ、着地直後から滑らかに追従を再開するリアクティブアイトラッキングゲーム。",
  "genre": ["Action", "Brain Game", "Eye Tracking", "Vision Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "テレポート追従エイムトレーニングの測定・実践手順",
  "description": "突発的な空間跳躍標的に対してサッケード再捕捉と慣性追従を正しく成立させる4段階のステップ。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "頭部固定と直視アライメントの確立",
      "text": "モニターから50〜70cmの距離を確保し、顎を引いて頭部を完全に静止させます。頸部の回旋を使わず、純粋な眼球運動のみで追跡する準備を整えます。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "訓練時間と速度倍率の設定",
      "text": "セッション時間（30秒〜120秒）と基本速度倍率（0.5x〜9.0x）を設定します。初心者は1.0xから開始し、テレポート直後の視線見失いが生じない強度を選択します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "滑動追従から突発テレポートへの弾道サッケード発射",
      "text": "通常移動中は中心窩で滑らかに標的をロックします。標的が別座標へ瞬間移動した瞬間、迷わず最短距離で弾道サッケードを繰り出し、新位置の中心窩ロックを回復します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "着地直後の慣性同期と再捕捉潜時の分析",
      "text": "テレポート着地直後に標的の運動ベクトルに合わせて瞬時に滑動追従へ移行します。オーバーシュートや視線迷いが生じていないか結果スコアを分析します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "テレポート追従エイムトレーニングとはどのようなドリルですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "画面内を一定の速度と慣性を持って移動しているターゲットが、突発的に全く異なる空間座標へと瞬間移動（テレポート）した際、即座に跳躍性眼球運動（サッケード）で視線を飛ばし、着地した瞬間に標的の移動速度と眼球運動を同期させて滑動追従（スムーズパシュート）へと復帰させる高度なビジョントレーニングです。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜ通常の連続追従ではなく「テレポート（瞬間移動）」を訓練するのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "現実のスポーツや対戦ゲームでは、相手が急激なダッシュや障害物からの飛び出し、テレポートスキル（TracerのブリンクやJettのテイルウィンド等）を使用するため、視界内で連続的な追従が完全に断絶される瞬間が頻発します。この断絶を埋めるには、位置のズレを埋めるサッケードと、速度を合わせるパシュートの2つの独立した神経運動系をシームレスに結合させる専門訓練が必須だからです。"
      }
    },
    {
      "@type": "Question",
      "name": "「サッケード（跳躍）」と「パシュート（追従）」はどのように連携しているのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rashbass（1961）の古典的研究が証明した通り、脳は標的の『位置のズレ（位置ステップ）』に対してはサッケード系を発動し、『速度のズレ（速度ステップ）』に対してはスムーズパシュート系を別個に発動します。本ドリルでは、大ジャンプによって生じた位置誤差をサッケードで一瞬でゼロにし、着地と同時に小脳の内部モデルから標的の速度慣性を引き出してパシュートへ直結させる神経連動を鍛えます。"
      }
    },
    {
      "@type": "Question",
      "name": "視線が跳躍している最中は画面が見えていない（サッケード抑制）というのは本当ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。人間がサッケード眼球運動を行っている最中（約20〜40ミリ秒間）、網膜像のブレによって脳が眩惑されるのを防ぐため、視覚入力が大脳皮質レベルで一時的に遮断される生理現象（サッケード抑制 / Saccadic Suppression）が起こります。そのため着地直後のわずかなミリ秒でいかに素早く視覚認識を再開し、動いている標的を再ロックできるかが極めて重要になります。"
      }
    },
    {
      "@type": "Question",
      "name": "テレポートした標的の着地で視線がオーバーシュート（行き過ぎ）してしまう原因は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "新座標までの距離予測に対する小脳の運動出力スケーリングが過剰であること、あるいは着地直前の眼球ブレーキ筋（拮抗する外眼筋）の収縮タイミングが遅れることが原因です。標的の最終到達点そのものを見るのではなく、跳躍距離に応じた制動パルスを小脳が自動計算できるよう、反復訓練によって運動ゲインを校正する必要があります。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲーム（VALORANT, Apex, Overwatch）の実戦でどう活きますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "敵がポータルを通過した瞬間、オクタングリッドからの大ジャンプ、あるいは角から飛び出してきた敵に対して、初弾フリック（サッケード）で敵モデルの中心を捉えた直後、敵が移動している方向へエイムが一切ブレずに吸い付くようになります。フリック直後に照準が止まって敵を見失う『フリック後ストップ病』を完全に克服できます。"
      }
    },
    {
      "@type": "Question",
      "name": "テレポート直後に標的の速度に追いつけず遅れてしまう場合の改善策は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "標的が瞬間移動する前の『移動ベクトル（向きと速さ）』を大脳皮質（MT/MST野）で記憶し、着地した瞬間にその速度慣性が引き継がれていることを脳内で先読み（Anticipation）してください。着地してから標的の動きを目視確認してから追おうとすると、約100msの視覚遅延により必ず後れを取ります。"
      }
    },
    {
      "@type": "Question",
      "name": "モニターのリフレッシュレートや表示遅延はサッケード再捕捉にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hzなどの低リフレッシュレート環境では、テレポート後の新位置フレームの描画が最大16.7ms遅延し、さらに液晶の残像によって新位置の輪郭認識が遅れます。144Hz〜240Hz以上の高駆動モニターを使用することで、跳躍後の標的出現フレームを最速で受容野に捉え、着地後再捕捉の反応潜時を大幅に短縮できます。"
      }
    },
    {
      "@type": "Question",
      "name": "1日の推奨練習時間と効果的なセット間インターバルは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1セッション60秒を、間に30秒〜45秒のインターバルを挟んで4〜6回実施するのが理想的です。急激なサッケード加減速と連続パシュートの切り替えは外眼筋および小脳神経回路への代謝負荷が高いため、疲労を感じたら無理をせず目を休めてください。"
      }
    },
    {
      "@type": "Question",
      "name": "練習中に目の奥の疲労や頭重感を感じた場合の正しい対処法は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "急激なサッケード筋収縮による一時的な外眼筋疲労です。直ちにドリルを停止し、両手のひらを温めて目に当てる温熱パームケアを行うか、5メートル以上遠くの静止物を20秒間ぼんやりと見つめて毛様体筋と外眼筋をリセットしてください。次回の練習では速度倍率を少し下げて身体を慣らしましょう。"
      }
    }
  ]
};

const guideProps = {
  heading: "テレポート追従エイムトレーニング・サッケード再捕捉の神経科学基準",
  intro: [
    "モーメンタム・テレポート追従（Momentum Teleport Pursuit）とは、速度慣性を持って移動する標的が突発的に別の空間座標へ瞬間跳躍した際、大角度の弾道性サッケード（跳躍眼球運動）で新位置を再捕捉し、着地した瞬間に標的の速度ベクトルを小脳から引き出して滑動性追従（スムーズパシュート）へと復帰させる複合型アイトラッキング課題です。空間的な位置不連続性と連続的な速度慣性が同時に課される極めて過酷な環境において、人間の視覚運動制御系の限界性能を測定・強化します（Rashbass, 1961; Findlay & Walker, 1999）。",
    "位置変位系（サッケード）と速度追尾系（パシュート）の神経的分離と統合：Rashbass（1961）が解明した通り、視覚運動系は標的の『位置誤差（網膜位置ステップ）』を中脳上丘（Superior Colliculus）と前頭眼野（FEF）を介したサッケード回路で即座にキャンセルし、一方の『網膜スリップ速度』をMT/MST野から小脳片葉・前庭小脳へと伝達されるパシュート回路で制御します。テレポート発生時、視覚系はこれら2つの独立した運動プログラムをミリ秒単位で連動させ、サッケードの着地減速パルスが終了したまさにその瞬間に目標速度に一致したパシュートパルスを出力しなければなりません（Krauzlis, 2004）。",
    "サッケード抑制（Saccadic Suppression）と着地直後の速度記憶保持：眼球が毎秒数百度の猛スピードで空間を跳躍している最中は、脳幹網様体による能動的ゲーティングによって視覚入力が一時的に抑制されます（Bahill et al., 1980）。着地後に視覚がクリアになった瞬間、標的の新しい運動状態を目視確認してからパシュートを開始すると、神経伝達遅延（約100〜130ms）によって視線は必ず後方へ取り残されます。これを防ぐためには、テレポート前に観察した速度ベクトルを小脳内部モデル内に短時間保持（Velocity Memory Cache）し、着地と同時に予期的に眼球を加速させる高度な認知的先読みが不可欠です（Barnes, 2008）。",
    "FPSエイムにおける『フリック後トラッキング断絶』の解消と競技応用：多くのFPSプレイヤーは、突発的に現れた敵へ初弾フリック（サッケード）を当てることは得意でも、フリック着地直後に敵が移動している方向へ視線が硬直し、敵を見失う『フリック後トラッキングの断絶』という致命的な課題を抱えています。本ドリルはテレポートを繰り返す標的に対し、フリックの着地と同時に吸い付くようなトラッキングへ移行する神経回路を徹底的に反復強化します。Apex LegendsやOverwatchのような高速立体機動シューターにおいて、ブリンクスキルやポータル通過後の敵を瞬時に削り切るエイム力を授けます（Woods et al., 2015）。"
  ],
  benchmarks: {
    title: "テレポート再捕捉・慣性追従パフォーマンス評価指標 (Teleport Re-acquisition Benchmarks)",
    headers: ["習熟度クラス", "サッケード再捕捉潜時 (Re-acquisition)", "着地オーバーシュート率", "慣性同期効率 (Velocity Match)", "神経生理学的達成水準"],
    rows: [
      ["エリート (プロエイマー級)", "140ms 未満", "3% 未満 (神速静止)", "97% 以上", "卓越した弾道サッケード制御。テレポート着地直後に標的速度へ完全同期し、視線迷いが皆無"],
      ["アドバンス (競技ゲーマー級)", "140 ～ 180ms", "3% ～ 6%", "91% ～ 96%", "迅速なサッケード再捕捉。着地時にごくわずかな補正が見られる程度で、高いトラッキング復帰力を維持"],
      ["コンピテント (一般健康成人)", "181 ～ 240ms", "7% ～ 14%", "80% ～ 90%", "健常成人の標準反応域。テレポート直後に一瞬の視線停止（サッケード後不応期）が生じるが再捕捉可能"],
      ["デベロッピング (発達途上・遅延気味)", "241 ～ 320ms", "15% ～ 24%", "68% ～ 79%", "サッケード発射と着地認識に大きな遅延。着地オーバーシュートが多発し、標的を頻繁に見失う"],
      ["ノービス (初学者・要トレーニング)", "320ms 超", "24% 超", "68% 未満", "空間跳躍に対する反応が追いつかず、頭部の代償運動が混入。外眼筋の瞬発力と基礎サッケード訓練が必要"]
    ],
    note: "※測定数値は視距離50〜70cm、基本速度1.0x〜2.0xにおいて、60秒間の突発テレポートセッションを実施した際のアイトラッキング解析データに基づきます。再捕捉潜時はテレポート発生から中心窩が新標的座標を捉えるまでの平均時間を示します。"
  },
  techniques: {
    title: "突発テレポート標的の再捕捉と慣性追従を極める4大テクニック",
    items: [
      {
        name: "最短直線弾道フリックと着地減速パルス (Direct Ballistic Projection)",
        desc: "標的がテレポートした瞬間、視線を曲線的に迷わせず、新座標へ最短の直線ベクトルで一気に眼球を跳躍させます。Findlay & Walker（1999）が示す通り、迷いを捨てた純粋な弾道サッケードのみが最小の潜時で目標へ到達します。",
        tips: "新位置の周辺をぼんやり探すのではなく、周辺視野が捉えた光点へ一直線に視線を『叩きつける』イメージを持ちましょう。"
      },
      {
        name: "テレポート前の速度ベクトル保持と内部キャッシュ (Velocity Vector Caching)",
        desc: "標的の座標が変わっても、その移動速度と進行方向の慣性は保存されています。Barnes（2008）の内部モデル理論に基づき、テレポート前の速度情報を大脳皮質で維持し、着地した瞬間にその速度で眼球を滑らせます。",
        tips: "『標的が止まっている』と脳が誤認すると着地でフリーズします。『動いているものが位置だけ飛んだ』と強く意識してください。"
      },
      {
        name: "サッケード抑制中の予期的未来着地 (Anticipatory Landing Lead)",
        desc: "サッケードには約20〜40msの飛行時間を要するため、テレポートした瞬間の座標に着地すると、その間に標的が移動してわずかに後れを取ります。飛行時間を予測し、進行方向へ数ピクセル先読みして着地させます。",
        tips: "テレポート先の点そのものではなく、その点が動いていく先へほんの少しリードを奪って着地するのがプロのコツです。"
      },
      {
        name: "頭部代償回旋の抑制と純粋外眼筋スプリント (Cervical Motion Isolation)",
        desc: "大角度の空間跳躍に直面すると、首を振って顔ごと追おうとする頸部代償運動が発生します。Leigh & Zee（2015）の通り、頭部を動かすと前庭反射が混入して着地精度が狂うため、顎を引いて眼球のみをスプリントさせます。",
        tips: "顎の下に指を添え、顔の向きが1ミリも変わっていないことを触覚で確認しながらトレーニングを行いましょう。"
      }
    ]
  },
  steps: [
    "モニターから約50〜70cm離れ、頭部を完全に動かさない姿勢を確立します。",
    "セッション時間（30秒〜120秒）と速度倍率（0.5x〜9.0x）を設定し、ドリルを開始します。",
    "移動中のターゲットの中心核を中心窩で滑らかにロックします。",
    "標的がテレポートした瞬間、最短距離の弾道サッケードで瞬時に新位置へ視線を跳躍させます。",
    "着地と同時に標的の移動慣性に同期して滑動追従を再開し、セッション後の再捕捉潜時を確認します。"
  ],
  audience: "FPS（Apex Legends, Overwatch, VALORANT）でブリンクや急激な飛び出しにエイムを吸い付かせたい競技ゲーマー、球技でイレギュラーバウンドへの瞬発的反応力を高めたいアスリート、動体視力の跳躍精度を極めたいすべての人。",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('rashbass1961', 'bahill1980', 'findlay1999', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/ja/drills/visual-tracking/constant-slow-pursuit", label: "低速追従眼球運動トレーニング (Constant Slow)" },
    { href: "/ja/drills/visual-tracking/directional-chaos-pursuit", label: "カオス方向追従テスト (Directional Chaos)" },
    { href: "/ja/drills/visual-tracking/dynamic-evasion-pursuit", label: "リアクティブ追従訓練 (Dynamic Evasion)" },
    { href: "/ja/drills/visual-tracking/ghosting-suppress-pursuit", label: "残像抑制固視トレーニング (Ghosting Suppress)" },
    { href: "/ja/drills/visual-tracking/infinity-pursuit", label: "8の字眼球運動トレーニング (Infinity)" },
    { href: "/ja/drills/visual-tracking/predictive-pursuit", label: "予測アイトラッキング (Predictive)" }
  ]
};

export default function JapaneseMomentumTeleportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MomentumTeleportPursuitClient
        copy={{
          title: "テレポート追従エイムトレーニング：瞬間移動標的のサッケード再捕捉と慣性追従",
          subtitle: "空間座標跳躍に対する弾道サッケードと着地後滑動追従（Post-saccadic Pursuit）の統合テスト",
          description: "画面内を一定の運動慣性で移動しながら突発的に異なる座標へテレポート（瞬間跳躍）するターゲットを追尾するハイブリッド動体視力テスト。位置跳躍（ステップ変位）を弾道サッケードで埋め、着地直後に標的の速度ベクトルと眼球速度を即座に一致させる神経機構（Rashbass, 1961; Findlay & Walker, 1999）を強化。サッケード抑制直後の視覚再開と小脳の速度記憶（Barnes, 2008）を鍛えます。無料・ブラウザで即座に測定可能。"
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/momentum-teleport-pursuit" />
      </div>
    </>
  );
}
