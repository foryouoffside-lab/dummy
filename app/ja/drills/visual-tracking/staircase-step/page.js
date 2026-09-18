import StaircaseStepClient from '@/app/drills/visual-tracking/staircase-step/StaircaseStepClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "高低差エイム練習・垂直追従眼球運動テスト | SkillDrills",
  description: "階段状のジグザグ軌道を昇降する目標を追尾する垂直追従眼球運動トレーニング。中脳riMLF経路を刺激し、高低差エイムや上下視線移動の捕捉精度を強化。無料。",
  keywords: [
    "垂直追従眼球運動 練習",
    "高低差 エイム 練習",
    "上下 視線移動 トレーニング",
    "階段状 アイトラッキング",
    "垂直 サッケード 訓練",
    "中脳 riMLF 神経回路",
    "垂直滑動性追従眼球運動",
    "FPS 上下視線 追従",
    "跳躍目標 視覚捕捉",
    "外眼筋 垂直制御",
    "高低差 動体視力",
    "垂直視線 安定化 練習"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/staircase-step",
    languages: getAlternateLanguages("/drills/visual-tracking/staircase-step"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "高低差エイム練習・垂直追従眼球運動テスト | SkillDrills",
    description: "階段状のジグザグ軌道を昇降する目標を追尾する垂直追従眼球運動トレーニング。中脳riMLF経路を刺激し、高低差エイムや上下視線移動の捕捉精度を強化。無料。",
    url: "https://skilldrills.online/ja/drills/visual-tracking/staircase-step",
    siteName: "SkillDrills",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "高低差エイム練習・垂直追従眼球運動テスト | SkillDrills",
    description: "階段状のジグザグ軌道を昇降する目標を追尾する垂直追従眼球運動トレーニング。中脳riMLF経路を刺激し、高低差エイムや上下視線移動の捕捉精度を強化。無料。",
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
      "name": "視覚追従・アイトラッキング",
      "item": "https://skilldrills.online/ja/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "階段ステップ垂直追従",
      "item": "https://skilldrills.online/ja/drills/visual-tracking/staircase-step"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "高低差エイム練習・垂直追従眼球運動テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "階段状のジグザグ軌道を昇降する目標を追尾する垂直追従眼球運動トレーニング。中脳riMLF経路を刺激し高低差エイムを向上。",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/staircase-step",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "高低差エイム練習・垂直追従眼球運動テスト",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応およびJavaScript有効なブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/visual-tracking/staircase-step",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "高低差エイム練習・垂直追従眼球運動テスト",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/staircase-step",
  "description": "階段状のジグザグ軌道を昇降する目標を追尾する垂直追従眼球運動トレーニング。中脳riMLF経路を刺激し高低差エイムを向上。",
  "genre": [
    "アクション",
    "エイムトレーニング",
    "視覚追従訓練"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "階段ステップ垂直追従訓練の進め方",
  "description": "多段階段状の幾何学的軌道を昇降するターゲットを滑動性および捕捉サッケードで追従し、垂直動眼制御を鍛える4ステップ。",
  "dateModified": "2026-09-15",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "セッションパラメータの設定",
      "text": "セッション時間（30〜120秒）、目標の移動速度倍率、ターゲットサイズを選択します。軌道予測を排除したい場合はHide Lineを有効化します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/staircase-step#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "頭部の正対と頚部運動の完全固定",
      "text": "顎を引いて頭部を正面に固定します。首を上下に振ると垂直眼球運動が水平運動にすり替わってしまうため、眼球のみを独立して動かします。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/staircase-step#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "階段ステップ角における減速と再捕捉",
      "text": "ステップの直線部では滑動性追従（スムーズパシュート）を維持し、直角に折れ曲がるコーナー頂点では素早い捕捉サッケードで目標を再ロックします。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/staircase-step#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "上方向・下方向の非対称性の分析と速度向上",
      "text": "上昇フェーズと下降フェーズでの視線安定性を比較し、追従が乱れやすい方向を意識しながら段階的に速度倍率を高めていきます。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/staircase-step#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "階段ステップ垂直追従テスト（Staircase Step）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "画面上を階段状のジグザグ幾何学軌道に沿って昇降するターゲットを、頭部を固定したまま眼球のみで追従する視覚運動トレーニングです。直線的な斜面移動と直角コーナーでの急激な方向転換を組み合わせることで、日常で鍛えられにくい垂直方向の滑動性追従眼球運動と補正サッケードを徹底的に強化します。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜ水平方向のエイムや視線移動に比べ、垂直方向は難しいのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "解剖学的に水平眼球運動が橋（PPRF）の神経核で制御されるのに対し、垂直眼球運動は中脳の内側縦束吻側間質核（riMLF）およびカハール間質核という全く異なる独立した中枢で制御されるためです（Büttner-Ennever & Horn, 1997）。また現代人の生活習慣（読書、スマホ、横長ディスプレイ）は水平視線移動が圧倒的大多数を占め、垂直方向の神経シナプスが相対的に未発達であることが生理学的研究で判明しています（Rottach et al., 1996）。"
      }
    },
    {
      "@type": "Question",
      "name": "上方向への追従（上昇）と下方向（下降）で難しさに差があるのはなぜですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ke et al. (2013)の研究により、垂直追従眼球運動には顕著な方向非対称性が存在することが証明されています。上向きの視線移動は上直筋および下斜筋の複雑な筋力配分を要求し、下向き移動に比べて追従利得（ゲイン）が低く、網膜像のズレを補正するための補正サッケード（Catch-up Saccade）が頻発する傾向があります。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜ頭を動かさず首を固定することが決定的に重要なのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "頭部を傾けたり上下に頷くように動かしてしまうと、前庭動眼反射（VOR）が介入し、網膜上での垂直運動が容易な水平運動や眼球静止状態へと変換されてしまいます。中脳riMLFの神経経路と外眼筋の垂直運動線維を選択的に刺激するには、頭部を完全に静止させ、眼球のみを純粋に上下させる必要があります。"
      }
    },
    {
      "@type": "Question",
      "name": "階段の角（直角コーナー）を曲がる瞬間に視線が飛んでしまうのはなぜですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "目標が突然90度向きを変える瞬間、滑動性追従システムの運動予測エラーが極大化します。スムーズパシュート系は急激な方向変化に即座に適応できないため（応答潜時約100ms; Lisberger, 2010）、脳は一時的にサッケードシステムを起動して目標を再捕捉します。この切り替え時のラグを最小化することが本訓練の目的です。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSやバトルロイヤルゲーム（Apex、Overwatch等）でどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "近年の競技FPSでは、ジップライン、ジャンプパッド、空中ダッシュ、高低差のある立体地形での撃ち合いが頻発します。垂直追従を鍛えることで、空中に飛び出した敵の軌道をクロスヘアから外さず追尾でき、さらに垂直リコイル制御時の視覚的安定性も劇的に向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "バレーボールやテニスなど球技スポーツへの応用効果はありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "バレーのトスやスパイク、テニスのロブショット、バスケットボールのリバウンドなど、高く上がったボールの軌道を正確に空間把握するためには強靭な垂直追従動眼能力が不可欠です。垂直方向の追尾ゲインが向上することで、落下点予測と打点タイミングの精度が飛躍的に上がります。"
      }
    },
    {
      "@type": "Question",
      "name": "ガイド線非表示（Hide Line）モードのトレーニング効果は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "階段のステップ線が見えている状態では、脳が外部の幾何学的ガイドラインに視覚的手がかりを依存してしまいます。Hide Lineをオンにすると、小脳内部の運動予測モデルのみを頼りに次のステップ位置を予測・補間せざるを得なくなるため、フィードフォワード制御能力が飛躍的に高まります。"
      }
    },
    {
      "@type": "Question",
      "name": "1日の推奨練習頻度と時間はどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "45〜60秒のセッションを2〜3セット、1日合計3〜5分が理想的です。垂直外眼筋（上直筋・下直筋・上下斜筋）は水平筋に比べて筋疲労が早く蓄積するため、長時間の疲労練習よりも、鮮明な集中力を維持できる短時間の高密度トレーニングが効果的です。"
      }
    },
    {
      "@type": "Question",
      "name": "高リフレッシュレート（144Hz/240Hz）環境はなぜ垂直追従に不可欠ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hz（更新間隔約16.7ms）では階段ステップの直角変化点で目標像がジャダー（残像・カクつき）を起こし、正確な角の頂点位置を脳が誤認します。144Hz（約6.9ms）以上の環境では急峻な方向転換が極めてシャープに描画され、中脳バーストニューロンが正確な補正サッケードを発火できるようになります（Woods et al., 2015）。"
      }
    }
  ]
};

const guide = {
  heading: "高低差エイム練習・垂直追従眼球運動テスト：階段ステップ追尾と中脳動眼神経強化",
  intro: [
    "人間の眼球運動系（Oculomotor System）は、水平方向と垂直方向とで全く異なる神経解剖学的制御機構を有しています。水平方向の滑動性追従およびサッケード運動が橋（Pons）の傍正中橋網様体（PPRF）を中心とする回路で処理されるのに対し、垂直方向の運動制御は中脳（Midbrain）に局在する内側縦束吻側間質核（riMLF: rostral interstitial nucleus of the medial longitudinal fasciculus）およびカハール間質核によって排他的に統御されています（Büttner-Ennever & Horn, 1997）。",
    "精神物理学および眼球運動計測に関する先行研究（Rottach et al., 1996; Ke et al., 2013）は、垂直追従眼球運動が水平追従に比べて定常ゲイン（目標速度に対する眼球速度の比）が有意に低く、応答潜時が長く、位相遅れ（Phase Lag）が大きいことを実証しています。さらに、仰角方向（上向き）の追従は沈降方向（下向き）に比べて網膜スリップの知覚感度が低く、追従中に目標を見失って眼球が追いつくための補正サッケード（Catch-up Saccade）が高頻度で誘発されるという顕著な方向非対称性を示します。",
    "日常生活における読書やデジタル機器の利用は、大半が水平軸に沿った視覚走査であるため、現代人の垂直動眼回路は慢性的な運動刺激不足に陥っています。この未発達な神経経路は、競技FPSにおいて敵が高所から飛び降りたり空中へ跳躍した瞬間、あるいは球技スポーツにおいて高く舞い上がったボールを追尾する局面において、深刻なトラッキングの乱れや視覚的ブレとして表面化します。首の代償運動（頭部チルト）に依存せず眼球のみを垂直に動かす能力の養成が急務となります。",
    "本『階段ステップ追従（Staircase Step）』ドリルは、多段の階段状ジグザグ幾何学経路に沿って目標を移動させることで、対角線方向の滑動性追従と直角コーナー頂点における急激な減速・再捕捉サッケードを複合的に課します（Collewijn & Tamminga, 1984; Lisberger, 2010）。ディスプレイ表示の量子化遅延（60Hz時16.7ms、144Hz時6.9ms）や入力遅延（Woods et al., 2015）を最小化した環境で、中脳riMLF経路の神経可塑性を最大化してください。全記録はブラウザ内に安全に保持されます。"
  ],
  benchmarks: {
    title: "垂直階段追従パフォーマンス基準（追従速度倍率・視線安定性）",
    headers: ["習熟度ティア", "推奨速度倍率", "コーナー頂点再捕捉", "垂直追従ゲイン (推定)", "想定母集団比率"],
    rows: [
      ["プロ / 垂直神経完全適応 (Elite)", "3.5x〜5.0x+", "ステップ角でのオーバーシュート 0", "ゲイン 0.92〜0.98 (遅れなし)", "上位 1.5%"],
      ["マスター / 高度垂直制御 (Master)", "2.5x〜3.5x", "角で瞬時に微小サッケード再捕捉", "ゲイン 0.85〜0.92 (極めて安定)", "上位 8%"],
      ["アドバンス / 実践競技レベル (Advanced)", "1.8x〜2.5x", "斜面部は安定・急反転時に微小ズレ", "ゲイン 0.75〜0.85 (良好)", "上位 25%"],
      ["インターミディエイト / 基礎 (Intermediate)", "1.2x〜1.8x", "上向きステップで遅れ・首が動きがち", "ゲイン 0.60〜0.75 (補正多発)", "中位 45%"],
      ["ノービス / 未訓練 (Novice)", "0.5x〜1.2x", "ステップ角で目標完全ロスト・頭部連動", "ゲイン < 0.60 (激しい跳躍)", "入門レベル"]
    ],
    note: "評価基準はRottach et al. (1996)の垂直動眼ゲインデータおよびKe et al. (2013)の垂直非対称性モデルに基づき設定されています。"
  },
  techniques: [
    {
      title: "頭部・頚部の完全固定と外眼筋の純粋単離運動",
      description: "垂直移動する物体を追う際、人間は無意識に顎を上げ下げして首を動かしてしまいがちです。頭部を動かすと前庭動眼反射が作用して眼球運動神経への刺激が逃げてしまいます。顎を軽く引き、頭蓋骨を静止させたまま眼球のみを上下に動かす『アイ・アイソレーション』を徹底します。",
      tips: [
        "椅子の背もたれに後頭部を軽く密着させ、頭のぐらつきを物理的に検知できるようにする",
        "目線を上下に動かしても視界全体の傾きが変わらないよう、首周りの僧帽筋の脱力を意識する",
        "首がどうしても動いてしまう場合は、速度倍率を一度0.8xまで落として眼球のみで追う感覚を脳に刷り込む"
      ]
    },
    {
      title: "階段ステップ角（頂点）における先読み減速と再捕捉サッケード",
      description: "目標が直線的なステップから直角に向きを変える瞬間、等速のまま追従しようとすると視線が角を突き抜ける『オーバーシュート』が発生します。頂点の手前でわずかに視線を先行させ、反転の瞬間に極小のサッケードを発火させて瞬時に角の内側へ引き戻します。",
      tips: [
        "目標の球体を追うだけでなく、階段のグリッド線（角の配置間隔）を周辺視で捉えてリズムを予測する",
        "反転直後に生じる約100msのパシュート初期遅延（Lisberger, 2010）を、短時間の注視で相殺する",
        "『Hide Line』をオンにして練習し、外部の線に頼らず自分自身の内的な空間リズムでコーナーを予測する"
      ]
    },
    {
      title: "上向き（仰角）追従時のゲイン低下に対する能動的補正",
      description: "多くの人は上向き追従時に下向き追従よりも視線が遅れがちになります（Ke et al., 2013）。上昇ステップに入った際は、意識的に視線のフォーカスポイントを目標球体の上端（進行方向の前端）に置き、下垂しがちな視線位置を前進させます。",
      tips: [
        "上昇フェーズでは目標の『中心』ではなく『頭頂部』をやや上から引っ張り上げるイメージで凝視する",
        "下降フェーズでは重力方向と目の自然な下向き運動が一致するため、余分な力を抜いてスムーズに追従する",
        "上昇と下降の切り替わり時に呼吸を吐き出し、目元の眼輪筋の緊張をリセットする"
      ]
    },
    {
      title: "斜め複合ベクトルから純粋垂直成分の抽出認識",
      description: "ジグザグの階段ステップは水平成分（X軸）と垂直成分（Y軸）が連動した複合ベクトル運動です。水平筋（外直筋・内直筋）の動きに引きずられて垂直筋（上直筋・下直筋）の収縮がブレないよう、縦方向の変位量を主たる感覚軸として脳内にマッピングします。",
      tips: [
        "目標の『高さ（Y座標）』の変化に全意識の7割を向け、横の揺れは周辺視野に任せる感覚を掴む",
        "ステップが最上段および最下段に達した際の大きな折り返し時に、眼球が最大可動域まで届いているか確認する",
        "夜間モードや高コントラストターゲット色を活用し、垂直方向の軌跡エッジを網膜に強く焼き付ける"
      ]
    }
  ],
  deviceCalibration: {
    title: "垂直追従訓練におけるモニター・エルゴノミクス基準",
    points: [
      "モニターの垂直視野角と高さ：目線の高さがモニター画面の上端から1/3の水平線と一致するよう高さを調整。画面が高すぎると頸部伸展（首の反り）が生じ、低すぎると下向きの眼筋が過剰に圧迫されます。",
      "ディスプレイリフレッシュレート：ステップ角での瞬間的な方向転換を正確に視認するため、144Hz以上の高駆動モニターを推奨。60Hz（16.7ms）比でフレーム遅延を6.9ms以下へ低減（Woods et al., 2015）。",
      "視聴距離の確保：画面の垂直寸法が視角25〜30度前後に収まるよう、50〜65cmの距離を維持。距離が近すぎると垂直の眼球可動限界（上下各30度）を超え、首の代償運動が強制されます。",
      "ターゲット色と照明環境：黒背景にサイバーレッド（#ef4444）またはネオングリーンを選び、部屋の照明を間接照明にしてモニターへの映り込みを完全遮断。"
    ]
  },
  faqs: [
    {
      q: "階段ステップ垂直追従テスト（Staircase Step）とは何ですか？",
      a: "画面上を階段状のジグザグ幾何学軌道に沿って昇降するターゲットを、頭部を固定したまま眼球のみで追従する視覚運動トレーニングです。直線的な斜面移動と直角コーナーでの急激な方向転換を組み合わせることで、日常で鍛えられにくい垂直方向の滑動性追従眼球運動と補正サッケードを徹底的に強化します。"
    },
    {
      q: "なぜ水平方向のエイムや視線移動に比べ、垂直方向は難しいのですか？",
      a: "解剖学的に水平眼球運動が橋（PPRF）の神経核で制御されるのに対し、垂直眼球運動は中脳の内側縦束吻側間質核（riMLF）およびカハール間質核という全く異なる独立した中枢で制御されるためです（Büttner-Ennever & Horn, 1997）。また現代人の生活習慣（読書、スマホ、横長ディスプレイ）は水平視線移動が圧倒的大多数を占め、垂直方向の神経シナプスが相対的に未発達であることが生理学的研究で判明しています（Rottach et al., 1996）。"
    },
    {
      q: "上方向への追従（上昇）と下方向（下降）で難しさに差があるのはなぜですか？",
      a: "Ke et al. (2013)の研究により、垂直追従眼球運動には顕著な方向非対称性が存在することが証明されています。上向きの視線移動は上直筋および下斜筋の複雑な筋力配分を要求し、下向き移動に比べて追従利得（ゲイン）が低く、網膜像のズレを補正するための補正サッケード（Catch-up Saccade）が頻発する傾向があります。"
    },
    {
      q: "なぜ頭を動かさず首を固定することが決定的に重要なのですか？",
      a: "頭部を傾けたり上下に頷くように動かしてしまうと、前庭動眼反射（VOR）が介入し、網膜上での垂直運動が容易な水平運動や眼球静止状態へと変換されてしまいます。中脳riMLFの神経経路と外眼筋の垂直運動線維を選択的に刺激するには、頭部を完全に静止させ、眼球のみを純粋に上下させる必要があります。"
    },
    {
      q: "階段の角（直角コーナー）を曲がる瞬間に視線が飛んでしまうのはなぜですか？",
      a: "目標が突然90度向きを変える瞬間、滑動性追従システムの運動予測エラーが極大化します。スムーズパシュート系は急激な方向変化に即座に適応できないため（応答潜時約100ms; Lisberger, 2010）、脳は一時的にサッケードシステムを起動して目標を再捕捉します。この切り替え時のラグを最小化することが本訓練の目的です。"
    },
    {
      q: "FPSやバトルロイヤルゲーム（Apex、Overwatch等）でどう役立ちますか？",
      a: "近年の競技FPSでは、ジップライン、ジャンプパッド、空中ダッシュ、高低差のある立体地形での撃ち合いが頻発します。垂直追従を鍛えることで、空中に飛び出した敵の軌道をクロスヘアから外さず追尾でき、さらに垂直リコイル制御時の視覚的安定性も劇的に向上します。"
    },
    {
      q: "バレーボールやテニスなど球技スポーツへの応用効果はありますか？",
      a: "バレーのトスやスパイク、テニスのロブショット、バスケットボールのリバウンドなど、高く上がったボールの軌道を正確に空間把握するためには強靭な垂直追従動眼能力が不可欠です。垂直方向の追尾ゲインが向上することで、落下点予測と打点タイミングの精度が飛躍的に上がります。"
    },
    {
      q: "ガイド線非表示（Hide Line）モードのトレーニング効果は何ですか？",
      a: "階段のステップ線が見えている状態では、脳が外部の幾何学的ガイドラインに視覚的手がかりを依存してしまいます。Hide Lineをオンにすると、小脳内部の運動予測モデルのみを頼りに次のステップ位置を予測・補間せざるを得なくなるため、フィードフォワード制御能力が飛躍的に高まります。"
    },
    {
      q: "1日の推奨練習頻度と時間はどのくらいですか？",
      a: "45〜60秒のセッションを2〜3セット、1日合計3〜5分が理想的です。垂直外眼筋（上直筋・下直筋・上下斜筋）は水平筋に比べて筋疲労が早く蓄積するため、長時間の疲労練習よりも、鮮明な集中力を維持できる短時間の高密度トレーニングが効果的です。"
    },
    {
      q: "高リフレッシュレート（144Hz/240Hz）環境はなぜ垂直追従に不可欠ですか？",
      a: "60Hz（更新間隔約16.7ms）では階段ステップの直角変化点で目標像がジャダー（残像・カクつき）を起こし、正確な角の頂点位置を脳が誤認します。144Hz（約6.9ms）以上の環境では急峻な方向転換が極めてシャープに描画され、中脳バーストニューロンが正確な補正サッケードを発火できるようになります（Woods et al., 2015）。"
    }
  ],
  related: [
    { href: "/ja/drills/visual-tracking/split-screen-tracking", label: "画面分割アイトラッキング" },
    { href: "/ja/drills/visual-tracking/sine-wave-pursuit", label: "サイン波眼球運動トレーニング" },
    { href: "/ja/drills/visual-tracking/directional-chaos-pursuit", label: "不規則方向変化・急制動追跡テスト" },
    { href: "/ja/drills/visual-tracking/predictive-pursuit", label: "偏差エイム練習・遮蔽軌道予測テスト" },
    { href: "/ja/drills/visual-tracking/constant-slow-pursuit", label: "滑動性追従・基礎アイエクササイズ" }
  ],
  sources: pickSources('rottach1996', 'collewijn1984', 'ke2013', 'buttner1997', 'lisberger2010', 'woods2015'),
};

export default function StaircaseStepJaPage() {
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

      <StaircaseStepClient
        copy={{
          title: "階段ステップ垂直追従",
          subtitle: "高低差エイム練習・垂直追従眼球運動テスト",
          description: "階段状のジグザグ軌道を昇降するターゲットを追尾し、中脳riMLF経路を刺激する垂直追従眼球運動トレーニング。頭部を動かさず眼球のみを純粋に単離制御し、高低差エイムのブレを抑制しながらコーナー再捕捉サッケード精度を強化します。"
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/staircase-step" />
      </div>
    </>
  );
}
