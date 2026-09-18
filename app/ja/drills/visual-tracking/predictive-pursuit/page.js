import PredictivePursuitClient from '@/app/drills/visual-tracking/predictive-pursuit/PredictivePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// JAPANESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "偏差エイム 練習" (Lead shooting aim practice) / "予測エイム 練習"
// Secondary:    "動体視力 先読み", "遮蔽物 飛び出し 予測", "予測性追従眼球運動", "置きエイム 練習"
// LSI / Domain:  "内部モデル 小脳", "視覚ワーキングメモリ 軌道予測", "オクルージョン 遮蔽追従",
//               "フィードフォワード制御", "着地点 予測 視線", "動体追従 スムーズパシュート"
// Authentic Domain Terms: 偏差エイム（Lead Aiming / Deflection Shooting）, 予測性追従眼球運動（Predictive Smooth Pursuit）, 遮蔽（Visual Occlusion）, 内部順モデル（Internal Forward Model）, 視覚作業記憶（Visual Working Memory）, 網膜スリップ（Retinal Slip）
// ============================================================

export const metadata = {
  title: "偏差エイム練習・遮蔽軌道予測テスト – 予測性追従眼球運動＆先読み動体視力 | SkillDrills",
  description: "障害物や不可視区間で消失するターゲットの軌道を脳内内部モデルで先読みし、出現位置に正確に視線を先行待機させる無料アイトラッキング練習。視覚作業記憶とフィードフォワード制御を強化。登録不要。",
  keywords: [
    "偏差エイム 練習",
    "予測エイム 練習",
    "動体視力 先読み",
    "遮蔽物 飛び出し 予測",
    "予測性追従眼球運動",
    "置きエイム 練習",
    "内部モデル 小脳",
    "視覚ワーキングメモリ 軌道予測",
    "オクルージョン 遮蔽追従",
    "フィードフォワード制御",
    "着地点 予測 視線",
    "先行視線 アイトラッキング"
  ],
  openGraph: {
    title: "偏差エイム練習・遮蔽軌道予測テスト – 予測性追従眼球運動＆先読み動体視力 | SkillDrills",
    description: "消失するターゲットの軌道を脳内モデルで先読みし、着地点へ視線を同期させる無料オンライン予測エイム・動体視力トレーニング。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual-tracking/predictive-pursuit",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "偏差エイム練習・遮蔽軌道予測テスト – 予測性追従眼球運動＆先読み動体視力 | SkillDrills",
    description: "視覚フィードバック遅延（130〜150ms）を先読み内部モデルで克服する無料アイトラッキングドリル。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/predictive-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/predictive-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "視覚追従・アイトラッキング", "item": "https://skilldrills.online/ja/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "偏差エイム練習・遮蔽軌道予測テスト", "item": "https://skilldrills.online/ja/drills/visual-tracking/predictive-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "偏差エイム練習・遮蔽軌道予測テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "視覚フィードバックが途絶する遮蔽（オクルージョン）条件下で、小脳と前頭眼野の内部モデルを活用して標的軌道を外挿・先読み追従するアイトラッキング訓練ツール。",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/predictive-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/ja" },
  "inLanguage": "ja",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "偏差エイム・予測性追従トラッカー (SkillDrills Predictive Pursuit)",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応ブラウザ（Chrome, Edge, Firefox, Safari）",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/ja/drills/visual-tracking/predictive-pursuit",
  "inLanguage": "ja",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "予測追従エイムトレーニング (Predictive Pursuit)",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/predictive-pursuit",
  "description": "物陰に隠れるターゲットの速度ベクトルを計算し、再出現位置を先読みして撃ち抜く競技ゲーマー向けビジョントレーニングゲーム。",
  "genre": ["Aim Trainer", "Eye Tracking", "Vision Training", "Esports Drill"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "予測性追従と偏差エイムの訓練手順",
  "description": "視線追従の網膜スリップ遅延をゼロにし、小脳の内部モデルで先読み軌道を生成する4段階のプロトコル。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "初期軌道と速度ベクトルの捕捉",
      "text": "標的が射出された直後の動きを中心窩で捉え、その移動速度と方向角（ベクトル情報）を視覚作業記憶にロードします。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "軌道ライン非表示モード（オクルージョン）への適応",
      "text": "ガイド線が消去された状態、または標的が不可視領域を通過する間、頭の中で速度ベクトルを等速外挿します。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "出現予定位置（着地点）への先行視線移動",
      "text": "標的が再び現れるタイミングと幾何学的座標に合わせて視線を先行させ、出現と同時に中心窩でロックします。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "予測誤差のフィードバック修正",
      "text": "出現時の視線ズレ（位置誤差および速度誤差）を確認し、小脳の内部順モデルの予測パラメータを微調整します。"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "予測性追従（Predictive Smooth Pursuit）とは何ですか？リアクティブな追従とどう違いますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "人間の通常の視覚フィードバック制御には、光受容から眼球運動の出力まで約130〜150msの神経生理学的遅延（網膜スリップ）が存在します。受動的（リアクティブ）な追従では高速な動体に対して常に視線が後れを取ります。一方、予測性追従は脳内（小脳・前頭眼野・補足眼野）に蓄えられた速度記憶と運動内部モデルを用い、将来の位置を先回りして眼球を駆動するフィードフォワード制御です（Barnes, 2008）。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲームにおける「偏差エイム」や「置きエイム」にこのドリルはどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apex LegendsやVALORANTなどの対戦シューターでは、壁から飛び出す敵や高速スライディングするターゲットに対し、敵を見てから撃つリアクション撃ちでは弾着が遅れます。本ドリルで標的のベクトル外挿能力を鍛えることで、遮蔽物から飛び出してくる未来の座標にクロスヘアをピタリと配置する偏差撃ち（リードエイム）の精度が飛躍的に向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "標的が遮蔽物に隠れて見えなくなっても（オクルージョン）、なぜ目は追従を続けられるのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bennett & Barnes (2003)の研究により、前頭眼野（FEF）および補足眼野（SEF）には直前に見ていた物体の速度ベクトルを一時保持する「視覚作業記憶バッファ」が存在することが解明されています。ターゲットが視覚的に完全に消失しても、この記憶バッファから運動指令が外眼筋核へ持続的に送られるため、約1〜2秒間は高い精度で追従が維持されます。"
      }
    },
    {
      "@type": "Question",
      "name": "初心者が予測追従で犯しやすい最大のミスは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "最も多いミスは、標的が隠れた瞬間に予測を諦めて眼球を停止させ、標的が再出現したのを見てから慌ててサッケード（急速眼球運動）で追いつこうとすることです。これでは150ms以上の空白時間が生まれ、着地後の追従利得も大幅に乱れます。消失中も滑らかに視線を動かし続けることが重要です。"
      }
    },
    {
      "@type": "Question",
      "name": "小脳の「内部順モデル（Internal Forward Model）」とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "内部順モデルとは、運動指令の遠心性コピー（Efference Copy）に基づいて、自らの運動結果や物理環境の変化をシミュレートする神経回路です（Robinson, 1965; Krauzlis, 2004）。このモデルが高精度化すると、目で直に見ずとも物体の運動軌道が手に取るように予測できるようになります。"
      }
    },
    {
      "@type": "Question",
      "name": "ガイド線を表示した状態（Normal）と非表示（Hide Line）の訓練効果の違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ガイド線が見えている状態では、空間的な幾何学手掛かりに頼った視覚追従が行われます。一方「Hide Line（非表示）」モードでは、空間手掛かりが遮断されるため、大脳皮質と小脳が純粋な速度・方向ベクトルのみからメンタル軌道を生成する必要があり、実戦での偏差予測力と空間認識力を極限まで鍛え上げることができます。"
      }
    },
    {
      "@type": "Question",
      "name": "野球やテニス、サッカーなどの現実スポーツでもこの先読み能力は重要ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "極めて重要です。例えば時速150kmの野球ボールは投手の手から捕手まで約0.4秒で到達するため、打者は飛来するボールを途中で最後まで見ることはできず、リリースの初動情報からバット衝突位置を予測しています。予測性追従能力の高さは、トッププロアスリートの不可欠な条件です。"
      }
    },
    {
      "@type": "Question",
      "name": "モニターのリフレッシュレート（Hz）は予測追従の習得速度に影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。144Hzや240Hzなどの高リフレッシュレートモニターでは、標的が遮蔽される直前のフレーム情報が極めて細かく網膜に届きます。これにより小脳が初期速度ベクトルを正確に算出でき、消失中の軌道予測誤差を最小化できます（Woods et al., 2015）。"
      }
    },
    {
      "@type": "Question",
      "name": "1日の推奨トレーニング量と疲労管理の目安は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "高次の認知リソース（ワーキングメモリと運動前野）を消費するため、1回60秒のセッションを5〜8回（合計5〜10分）、週4〜5日が理想的です。予測のタイミングが狂い始めたり目の奥に重さを感じた場合は、セッションを打ち切り目を休ませてください。"
      }
    },
    {
      "@type": "Question",
      "name": "動体予測能力は年齢とともに衰えますか？訓練で維持できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "加齢に伴い単純な視覚反射神経はわずかに低下しますが、小脳の運動モデルや経験に基づく予測メカニズム（Kowler, 1989）は訓練によって長期間高く維持・強化できます。日常的なアイトラッキング練習により、若年層と同等以上の偏差精度を保つことが可能です。"
      }
    }
  ]
};

const guideProps = {
  heading: "偏差エイム・遮蔽軌道予測トレーニングの科学的根拠と実践ガイド",
  intro: [
    "人間の眼球運動系における最大の制約の一つが、網膜に像が結ばれてから大脳皮質視覚野を経て外眼筋へ神経伝達されるまでに生じる約130〜150ミリ秒の「感覚運動遅延（Sensorimotor Delay）」です。移動する物体を単なる受動的フィードバックのみで追尾しようとすると、視線は常に標的の後方を引きずる「網膜スリップ（Retinal Slip）」に陥ります。この遅延を相殺し、物体の将来位置を先読みしてスムーズに視線を同期させる神経メカニズムが「予測性追従眼球運動（Predictive Smooth Pursuit）」です。",
    "視覚運動制御の大家であるロビンソン（Robinson, 1965）やバーンズ（Barnes, 2008）らの生理学的研究によれば、小脳（Cerebellum）と前頭眼野（Frontal Eye Fields: FEF）は標的の初期運動から速度ベクトルを抽出し、脳内に「内部順モデル（Internal Forward Model）」を瞬時に構築します。このモデルが生成するフィードフォワード信号によって、眼球は実際の標的の動きに先行して駆動され、生理的遅延を完全に相殺することが可能になります。",
    "さらに実戦のゲーム環境やスポーツでは、標的が障害物（カバー、スモーク、建物）の背後を通過して一時的に視界から消える「遮蔽（オクルージョン）」が頻発します。ベネット＆バーンズ（Bennett & Barnes, 2003）の実験では、視覚的入力が完全にゼロになった瞬間にも、視覚作業記憶（Visual Working Memory）に保持された速度情報に基づき、被験者の眼球が約1〜2秒間は等速軌道を外挿して追尾し続けることが証明されています。この外挿利得を高めることこそが、物陰からの飛び出しを撃ち抜く「置きエイム」や「偏差撃ち」の真の正体です。",
    "本ドリル（Predictive Pursuit）は、直線および曲線軌道を描くターゲットの飛行予測、および軌道線非表示（Hide Line）による脳内シミュレーションを通じて、小脳の内部モデルと前頭葉の軌道外挿ネットワークを集中的に強化します。視覚情報が途絶してもブレない確固たる先読み視線を獲得し、対戦シューターや高速球技における圧倒的なアドバンテージを確立してください。"
  ],
  benchmarks: {
    title: "予測性軌道外挿および遮蔽追従精度ベンチマーク (Occlusion Tracking Gain)",
    headers: ["習熟度クラス", "軌道外挿精度 (Accuracy %)", "遮蔽再出現時 着地誤差", "追従ゲイン (Pursuit Gain)", "動体先読み適性判定"],
    rows: [
      ["エリート (Elite)", "94% 以上", "15px 未満 (完璧な着地)", "0.95 ~ 1.02", "完璧な小脳内部モデル構築とゼロ遅延偏差エイム"],
      ["マスター (Master)", "86% ~ 93%", "15px ~ 28px", "0.88 ~ 0.94", "優れた外挿能力、高難度飛び出しへの即応"],
      ["ダイヤモンド (Diamond)", "76% ~ 85%", "29px ~ 45px", "0.78 ~ 0.87", "標準的予測性追従、遮蔽時間が長いとわずかにズレ"],
      ["ゴールド (Gold)", "62% ~ 75%", "46px ~ 65px", "0.65 ~ 0.77", "受動的追従傾向、再出現後に補正サッケードが発生"],
      ["ビギナー (Beginner)", "62% 未満", "65px 超過", "0.65 未満", "遮蔽時に視線停止、出現を見てから反応する完全遅延型"]
    ],
    note: "※ 本基準は1080p解像度、標準速度1.0x〜1.5x、Hide Line（軌道非表示）環境における実測データに基づきます。再出現時の補正サッケードなしで中心窩捕捉できた割合を評価しています。"
  },
  techniques: {
    title: "先読み軌道外挿と偏差エイムを高める4大コア技術",
    items: [
      {
        name: "初期速度ベクトルの瞬間エンコーディング (Vector Encoding)",
        desc: "標的が発射された瞬間の最初の100〜200msに全神経を集中させ、移動速度と射出角度を中心窩で正確に読み取ります。この初期ベクトル情報が小脳内部モデルの入力データとなるため、初動の読み取り精度が外挿結果の成否を決定づけます。",
        tips: "ターゲットの形状を見るのではなく、背景の空間格子に対してどのくらいのスピードで流れているかを意識してください。"
      },
      {
        name: "メンタル軌道外挿と視線先行誘導 (Mental Vector Extrapolation)",
        desc: "標的が遮蔽物に入った瞬間に視線を止めるのではなく、頭の中で等速運動シミュレータを走らせ、視線（マウスポインタ）を消失点から出現予定位置へと一定のペースで滑らせます。",
        tips: "「消えた場所」を見るのではなく、「次に出現する予定の空空間」に視線の焦点を先行させましょう。"
      },
      {
        name: "遮蔽時の不随意サッケード抑制 (Saccadic Suppression Control)",
        desc: "視覚目標が消えると、脳は焦りからランダムなサッケード（急速眼球運動）を起こして周囲を探そうとします。サッケードが起きると視覚情報が遮断され内部モデルが崩壊するため、呼吸を落ち着かせて滑らかなパシュート速度を維持します。",
        tips: "目をキョロキョロ動かさず、レールの上を滑車が静かに走るような滑らかな視線移動を意識してください。"
      },
      {
        name: "再出現誤差のフィードフォワード補正 (Error Feedback Loop)",
        desc: "標的が再出現した瞬間に、自分の視線が標的の「前方に行き過ぎていたか」「後方に取り残されていたか」を瞬時に認知します。このミリ秒単位の誤差フィードバックを繰り返すことで、小脳シナプスの可塑的適応が急速に進みます。",
        tips: "ズレた時に落胆するのではなく、「速すぎた＝次回は少し抑える」「遅すぎた＝次回はもっと先行させる」と論理的に調整してください。"
      }
    ]
  },
  steps: [
    "環境設定: モニターとの距離を約50〜70cmに保ち、視野の中央にターゲット射出エリアが位置するように姿勢を整えます。",
    "難易度調整: 初めは速度1.0x、ガイド線表示（Visible）で開始し、軌道パターンの規則性と消失タイミングに慣れます。",
    "Hide Lineモードへの移行: 慣れてきたら設定からガイドラインを非表示にし、純粋な視覚作業記憶によるメンタル外挿に挑戦します。",
    "セッションの継続: 60秒間のセッション中、連続して出現するターゲットの軌道を先読みし、着地点でのロックを繰り返します。",
    "データ分析: 終了後に表示される追従精度（Accuracy）とセッション統計を確認し、小脳予測モデルの成長度を記録します。"
  ],
  audience: "Apex・VALORANT等で物陰からの飛び出し敵に偏差エイムを合わせたい競技ゲーマー、野球・テニス等の球技でボールの軌道を先読みしてミート率を高めたいアスリート、動体視力の先読み精度を高めたいすべてのユーザー。",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('barnes2008', 'bennett2003', 'kowler1989', 'krauzlis2004', 'robinson1965', 'woods2015'),
  related: [
    { href: "/ja/drills/visual-tracking/constant-slow-pursuit", label: "低速追従眼球運動トレーニング (Constant Slow)" },
    { href: "/ja/drills/visual-tracking/directional-chaos-pursuit", label: "カオス方向追従テスト (Directional Chaos)" },
    { href: "/ja/drills/visual-tracking/dynamic-evasion-pursuit", label: "リアクティブ追従訓練 (Dynamic Evasion)" },
    { href: "/ja/drills/visual-tracking/ghosting-suppress-pursuit", label: "残像抑制固視トレーニング (Ghosting Suppress)" },
    { href: "/ja/drills/visual-tracking/infinity-pursuit", label: "8の字眼球運動トレーニング (Infinity)" },
    { href: "/ja/drills/visual-tracking/momentum-teleport-pursuit", label: "テレポート追従エイムトレーニング (Momentum Teleport)" }
  ]
};

export default function JapanesePredictivePursuitPage() {
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

      <PredictivePursuitClient
        copy={{
          title: "偏差エイム練習・遮蔽軌道予測テスト：先読み視線とフィードフォワード制御",
          subtitle: "小脳内部モデルによる軌道外挿とオクルージョン予測性スムーズパシュート",
          description: "障害物や不可視区間で一時的に消失するターゲットの進行ベクトルを脳内内部モデルで先読みし、出現位置に視線を正確に先行待機させる無料アイトラッキング練習。130〜150msの神経生理学的視覚遅延をフィードフォワード制御で相殺し、FPS偏差撃ちや球技の動体先読みを劇的に高めます。登録不要・即座に開始可能。"
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/predictive-pursuit" />
      </div>
    </>
  );
}
