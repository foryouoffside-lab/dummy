import SplitScreenTrackingClient from '@/app/drills/visual-tracking/split-screen-tracking/SplitScreenTrackingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "画面分割アイトラッキング・分割性注意追従テスト | SkillDrills",
  description: "左右の視野で直交移動する2つの目標を同時に捉える画面分割アイトラッキング訓練。両半球の分割性注意と潜在的空間注意を強化し視野狭窄を防止。無料。",
  keywords: [
    "画面分割 アイトラッキング",
    "二重注意 視覚追従",
    "分割性注意 トレーニング",
    "両視野 並列視覚追尾",
    "マルチターゲット 視線分離",
    "周辺視野 動体視力",
    "視野狭窄 改善 トレーニング",
    "FPS ミニマップ 視線移動 練習",
    "複眼視覚 トレーニング",
    "大脳半球 視覚独立処理",
    "分割視野 視線制御",
    "画面分割 動体視力 テスト"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking",
    languages: getAlternateLanguages("/drills/visual-tracking/split-screen-tracking"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "画面分割アイトラッキング・分割性注意追従テスト | SkillDrills",
    description: "左右の視野で直交移動する2つの目標を同時に捉える画面分割アイトラッキング訓練。両半球の分割性注意と潜在的空間注意を強化し視野狭窄を防止。無料。",
    url: "https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking",
    siteName: "SkillDrills",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "画面分割アイトラッキング・分割性注意追従テスト | SkillDrills",
    description: "左右の視野で直交移動する2つの目標を同時に捉える画面分割アイトラッキング訓練。両半球の分割性注意と潜在的空間注意を強化し視野狭窄を防止。無料。",
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
      "name": "画面分割アイトラッキング",
      "item": "https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "画面分割アイトラッキング・分割性注意追従テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "左右の視野で直交移動する2つの目標を同時に捉える画面分割アイトラッキング訓練。両半球の分割性注意と潜在的空間注意を強化し視野狭窄を防止。",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking",
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
  "name": "画面分割アイトラッキング・分割性注意追従テスト",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応およびJavaScript有効なブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "画面分割アイトラッキング・分割性注意追従テスト",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking",
  "description": "左右の視野で直交移動する2つの目標を同時に捉える画面分割アイトラッキング訓練。両半球の分割性注意と潜在的空間注意を強化し視野狭窄を防止。",
  "genre": [
    "アクション",
    "ブレイントレーニング",
    "視覚認知訓練"
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
  "name": "画面分割アイトラッキング訓練の進め方",
  "description": "画面分割下で直交する二目標を同時に追従し、分割性視覚注意と潜在的視野拡大を最大化する4ステップ。",
  "dateModified": "2026-09-15",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "セッションパラメータの設定",
      "text": "訓練時間（30〜120秒）、基本移動速度倍率、ターゲットサイズを選択し、必要に応じてガイド線非表示（Hide Line）やランダム速度を設定します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "画面中央への視線アンカー配置",
      "text": "頭部を正面に固定し、左側の垂直移動領域と右側の水平移動領域の中間境界線に視線の基準アンカーを置きます。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "潜在的周辺視による直交ベクトル同時追跡",
      "text": "左右の目標間を急激なサッカード（跳躍眼球運動）で行き来せず、中央アンカーを維持したまま潜在的注意（Covert Attention）を左右視野へ二峰性に展開します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "半球間追従バランスと視野対称性の検証",
      "text": "セッション終了後に左右どちらかの目標を見失う偏り（半球優位性バイアス）がなかったかを分析し、徐々に速度倍率を高めて追尾容量を拡大します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "画面分割アイトラッキング訓練（Split-Screen Tracking）とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "画面中央で分割された2つの領域において、左側で垂直に往復する目標と右側で水平に往復する目標を同時に追従・監視する視覚神経トレーニングです。両眼の中心視野を一方に偏らせることなく、左右の大脳半球に分散する潜在的空間注意（Covert Spatial Attention）を動員し、並列的運動情報処理能力を鍛えます。"
      }
    },
    {
      "@type": "Question",
      "name": "人間の目は同時に2つの異なる物体を注視できるのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "中心窩（Fovea）の超高解像度領域は視角わずか1〜2度に限られるため、解剖学的に2つの物理的固視点を同時に中心視することは不可能です。しかし、Pylyshyn & Storm (1988)の視覚指標機構（FINST）理論やCavanagh & Alvarez (2005)の多焦点注意モデルが示す通り、大脳皮質は視線を中央に保ったまま周辺視野内の複数目標に注意焦点を分割して並列追跡することができます。"
      }
    },
    {
      "@type": "Question",
      "name": "左右を素早く視線移動（サッカード）させるのと、中央を注視し続けるのはどちらが有効ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "中央にアンカーを置き、潜在的注意を展開する戦略が遥かに優れています。目標間を往復する急激なサッカードには各回20〜50ミリ秒を要し、運動中には視覚感度が劇的に遮断されるサッカード抑制（Saccadic Suppression）が発生します。頻繁な視線跳躍は情報の欠損と再捕捉遅延を招くため、中央固定による周辺視追尾が最も安定的です。"
      }
    },
    {
      "@type": "Question",
      "name": "「両側視野優位性（Bilateral Hemifield Advantage）」とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alvarez & Cavanagh (2005)の研究により、視覚追尾のリソースは大脳半球ごとに独立して配分されることが実証されています。同一視野（例：右視野内のみ）で2つの目標を追う場合よりも、左視野（右半球処理）と右視野（左半球処理）に目標が1つずつ分かれている場合の方が、神経資源の競合が起きず追従限界速度と精度が大幅に高まる現象です。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜ左が垂直移動、右が水平移動という直交ベクトル設計になっているのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "両目標が同一方向に平行移動すると、ゲシュタルト心理学における「共通の運命の法則」が働き、脳が2つの目標を1つの単一オブジェクトとして群化（Binding）してしまいます。垂直軸と水平軸という直交する移動ベクトルを採用することで、視覚野は左右で完全に独立した2次元運動パラメータを並列計算せざるを得なくなります。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲームやeスポーツにおける具体的な実戦効果は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apex Legends、VALORANT、CS2などの対戦ゲームでは、クロスヘアによる敵への精密エイム（中心視）を維持しながら、画面隅のミニマップ、キルログ、弾薬ゲージ、周辺の敵の足音や射線を同時に認知する必要があります（Green & Bavelier, 2006）。この訓練により視野狭窄（トンネルビジョン）を防ぎ、クロスヘアを乱さず戦況情報を把握できるようになります。"
      }
    },
    {
      "@type": "Question",
      "name": "どちらか片方の目標ばかり見失ってしまう原因は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "多くの人間には利き目（優位眼）や優位半球に起因する視野の非対称性が存在します。右視野の目標を見失いやすい場合は左半球の注意配分不足、左視野を見失いやすい場合は右半球の注意配分不足が考えられます。意識的に注意が薄い側の目標への感度を引き上げることで、左右対称な視覚監視バランスを獲得できます。"
      }
    },
    {
      "@type": "Question",
      "name": "ガイド線非表示（Hide Line）モードの神経学的利点は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ガイド線を消去すると、軌道の外的な幾何学的補助線が消失します。これにより頭頂葉の空間認識回路は、目標の直前の速度と位置情報のみから内部モデル（フォワードモデル）を能動的に生成しなければならなくなり、内因性の軌道予測能力と空間的ワーキングメモリが高度に鍛えられます。"
      }
    },
    {
      "@type": "Question",
      "name": "推奨されるトレーニング時間とセット数はどれくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1セッション60秒を2〜3セット、1日合計5分程度が最適です。分割性注意トレーニングは前頭葉および頭頂葉の注意ネットワークに高密度の認知負荷をかけるため、疲労状態で漫然と行うよりも、極めて高い集中度を保てる短時間集中型の反復が最も定着率を高めます。"
      }
    },
    {
      "@type": "Question",
      "name": "高リフレッシュレート（144Hz/240Hz）ディスプレイは訓練効果にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "一般的な60Hz（フレーム更新間隔約16.7ms）に比べ、144Hz（約6.9ms）や240Hz（約4.2ms）のモニターでは直交移動する2目標の軌道が滑らかに描画され、運動ブラーや表示量子化遅延が極小化されます（Woods et al., 2015）。これにより網膜スリップエラーの誤認が減少し、純粋な脳神経レベルの注意分割訓練が可能となります。"
      }
    }
  ]
};

const guide = {
  heading: "画面分割アイトラッキング・分割性注意追従テスト：両半球並列追尾と視野分離監視",
  intro: [
    "人間の視覚系において中心窩（Fovea）の最高解像度領域は視角わずか1〜2度にとどまり、空間的に離れた2つの動目標を中心視で同時に捉え続けることは光学的に不可能です。視覚空間内で複数の重要事象が同時多発的に発生した場合、生体は急速なサッカード（跳躍眼球運動）で視線を交互に往復させるか、あるいは中心点に視線を固定したまま周辺視野へ注意を分散する潜在的空間注意（Covert Spatial Attention）を展開するかの選択を迫られます。",
    "認知神経科学における先駆的研究であるPylyshyn & Storm (1988)の複数目標追跡（Multiple Object Tracking: MOT）実験は、脳が連続的な走査なしに独立した複数オブジェクトを並列的に追跡する視覚指標機構（FINSTs）を備えていることを証明しました。さらにAlvarez & Cavanagh (2005)は、視覚追尾資源が大脳半球ごとに独立して割り振られている「両側視野優位性（Bilateral Hemifield Advantage）」を解明しました。左視野（右半球）と右視野（左半球）に分散配置された目標は、単一視野内で複数目標を追う場合に比べて神経資源の競合が著しく小さく、並列監視能力が最大化されます。",
    "目標間を視線が跳躍するたびに生じる神経生理学的コストは看過できません。サッカード運動自体に20〜50ミリ秒を要するだけでなく、運動中に視覚入力の処理感度が一時的に遮断されるサッカード抑制（Saccadic Suppression）が生じ、知覚情報に重大な欠損をもたらします。対照的に、中央に視線アンカーを固定しながら多焦点注意（Multifocal Attention; Awh & Pashler, 2000; Cavanagh & Alvarez, 2005）を左右に二峰性展開すれば、情報の途絶を起こすことなく両側運動ベクトルを連続的にモニタリングできます。この能力はアクションゲーム経験者において著しく発達していることが知られています（Green & Bavelier, 2006）。",
    "本画面分割アイトラッキング訓練は、左側に垂直振動、右側に水平振動という直交ベクトル運動を配置することで、視覚皮質のゲシュタルト的統合（共通の運命による一体化）を意図的に破綻させ、完全な直交独立運動方程式の並列解読を要求します。ディスプレイのリフレッシュレートによる時間量子化（60Hz時16.7ms、144Hz時6.9ms）や入力遅延特性（Woods et al., 2015）を念頭に置きつつ、日々の練習を積み重ねてください。計測データはすべてブラウザ内に安全に保持されます。"
  ],
  benchmarks: {
    title: "分割性注意追従パフォーマンス評価基準（運動速度・視野対称性）",
    headers: ["習熟度ティア", "推奨速度倍率", "視線アンカー安定性", "左右半球対称性", "想定母集団比率"],
    rows: [
      ["プロ / 神経適応完了 (Elite)", "3.5x〜5.0x+", "中央境界に完全固定・サッカードゼロ", "左右脱落率差 < 3% (完全並行処理)", "上位 1.5%"],
      ["マスター / 高度分割 (Master)", "2.5x〜3.5x", "中央アンカー維持・微小サッカード稀", "左右脱落率差 < 7% (安定追従)", "上位 8%"],
      ["アドバンス / 実践レベル (Advanced)", "1.8x〜2.5x", "ほぼ中央維持・速度変化時に微細跳躍", "左右脱落率差 < 12% (軽微な優位偏り)", "上位 25%"],
      ["インターミディエイト / 基礎 (Intermediate)", "1.2x〜1.8x", "左右への無意識な視線移動が散発", "片側視野の捕捉遅延が目立つ (15-25%)", "中位 45%"],
      ["ノービス / 未訓練 (Novice)", "0.5x〜1.2x", "左右の目標間を激しくサッカード往復", "片側目標の完全ロストが頻発 (> 25%)", "入門レベル"]
    ],
    note: "評価基準はPylyshyn & Storm (1988)のMOT限界速度モデルおよびAlvarez & Cavanagh (2005)の両側視野分割性注意追従指標に基づき設定されています。"
  },
  techniques: [
    {
      title: "中央境界線への固定アンカーと潜在的空間注意の二峰性展開",
      description: "左右どちらかの目標に直接視線を合わせようとすると、もう一方の目標が周辺視野の解像度低下によって即座にロストします。画面中央の仮想垂直線（境界線）に両眼の焦点を置き、意識（注意のスポットライト）のみを左右に広げる『軟焦視（Soft Focus）』を維持します。",
      tips: [
        "鼻梁の正面やや前方に焦点を合わせる意識を持ち、目線の力みを抜いて広角に空間を捉える",
        "目標の球体そのものを見るのではなく、目標が放つ光の軌跡や明滅を周辺視野の桿体細胞で捉える",
        "視線がどちらかの目標に引き寄せられそうになったら、即座に中央の境界線へ視線を戻すリセット動作を反復する"
      ]
    },
    {
      title: "直交運動ベクトルの独立デカップリング（垂直・水平の分離認識）",
      description: "左視野の垂直運動（Y軸）と右視野の水平運動（X軸）は、脳内で混ざり合うと斜めの合成ベクトルとして誤認されがちです。両半球の頭頂葉において、左手系垂直パラメータと右手系水平パラメータを明確に切り離して並列計算する認知的独立性を養います。",
      tips: [
        "左視野の上下端の反転タイミングと、右視野の左右端の反転タイミングが非同期であることを脳に受容させる",
        "反転の瞬間に発生する加速度変化を音のリズムのように直感的に感知する",
        "『Hide Line』オプションを有効化し、背景座標の視覚的手がかりを排除して純粋な運動ベクトル認知を強制する"
      ]
    },
    {
      title: "優位眼・優位半球バイアスの能動的キャリブレーション",
      description: "人間は通常、右利き・右目優位であれば左半球（右視野）への注意が強く、左視野の垂直目標を見落としやすくなります。セッション中に自分がどちらの目標を見失いやすいかを自己監視し、劣位側の視野に意識的な注意比率（例：左60%、右40%）を傾斜配分して平衡化します。",
      tips: [
        "訓練開始前の深呼吸時に、見失いやすい側の視野領域を意識的に強く意識づける",
        "劣位側の目標が反転する瞬間をトリガーとして、もう一方の目標の位置を即座に確認するクロスチェック習慣をつける",
        "左右の脱落頻度が均等になるまで、速度倍率を無理に上げず基礎速度で対称性を固める"
      ]
    },
    {
      title: "マイクロサッカードの抑制と瞬目（まばたき）同期制御",
      description: "60秒間の高負荷セッション中、不意のまばたきや微小な眼球振戦（マイクロサッカード）は目標の知覚断絶を引き起こします。目標が両端で同時に反転する瞬間など、視覚運動予測が最も安定するタイミングに合わせて瞬目を同期させます。",
      tips: [
        "目標が最も等速移動している中央通過点での瞬目を避け、端点到達時の予測可能区間で素早くまばたきする",
        "画面の明るさと部屋の照度差を減らし、眼球表面の乾燥を防ぐ適切な距離を保つ",
        "心拍数と呼吸を整え、緊張による首・肩の筋緊張が眼球運動神経に波及するのを防ぐ"
      ]
    }
  ],
  deviceCalibration: {
    title: "分割追従におけるハードウェア・エルゴノミクス最適化",
    points: [
      "ディスプレイリフレッシュレート：直交する2目標の位置更新精度を高めるため、144Hz以上の高駆動ゲーミングモニターを推奨。60Hz（16.7ms）比でフレーム遅延を6.9ms以下へ短縮。",
      "適正視距離と視野角の確保：画面全体が左右40〜50度の実視野内に収まるよう、モニターから50〜70cmの距離を維持。近すぎると周辺視の限界角を超え、遠すぎると空間分解能が低下します。",
      "バックライトとコントラスト設定：暗所モードまたは高コントラストターゲット色（サイバーレッド/ネオングリーン）を選択し、視野周辺部での網膜感度（フリッカー・コントラスト感度）を最大化。",
      "入力デバイスと着座姿勢：モニターの中央境界線が身体の正中面（正中矢状面）と完全に直交するよう頭部と椅子の位置を調整し、左右の視差・非対称性を排除。"
    ]
  },
  faqs: [
    {
      q: "画面分割アイトラッキング訓練（Split-Screen Tracking）とは何ですか？",
      a: "画面中央で分割された2つの領域において、左側で垂直に往復する目標と右側で水平に往復する目標を同時に追従・監視する視覚神経トレーニングです。両眼の中心視野を一方に偏らせることなく、左右の大脳半球に分散する潜在的空間注意（Covert Spatial Attention）を動員し、並列的運動情報処理能力を鍛えます。"
    },
    {
      q: "人間の目は同時に2つの異なる物体を注視できるのですか？",
      a: "中心窩（Fovea）の超高解像度領域は視角わずか1〜2度に限られるため、解剖学的に2つの物理的固視点を同時に中心視することは不可能です。しかし、Pylyshyn & Storm (1988)の視覚指標機構（FINST）理論やCavanagh & Alvarez (2005)の多焦点注意モデルが示す通り、大脳皮質は視線を中央に保ったまま周辺視野内の複数目標に注意焦点を分割して並列追跡することができます。"
    },
    {
      q: "左右を素早く視線移動（サッカード）させるのと、中央を注視し続けるのはどちらが有効ですか？",
      a: "中央にアンカーを置き、潜在的注意を展開する戦略が遥かに優れています。目標間を往復する急激なサッカードには各回20〜50ミリ秒を要し、運動中には視覚感度が劇的に遮断されるサッカード抑制（Saccadic Suppression）が発生します。頻繁な視線跳躍は情報の欠損と再捕捉遅延を招くため、中央固定による周辺視追尾が最も安定的です。"
    },
    {
      q: "「両側視野優位性（Bilateral Hemifield Advantage）」とは何ですか？",
      a: "Alvarez & Cavanagh (2005)の研究により、視覚追尾のリソースは大脳半球ごとに独立して配分されることが実証されています。同一視野（例：右視野内のみ）で2つの目標を追う場合よりも、左視野（右半球処理）と右視野（左半球処理）に目標が1つずつ分かれている場合の方が、神経資源の競合が起きず追従限界速度と精度が大幅に高まる現象です。"
    },
    {
      q: "なぜ左が垂直移動、右が水平移動という直交ベクトル設計になっているのですか？",
      a: "両目標が同一方向に平行移動すると、ゲシュタルト心理学における「共通の運命の法則」が働き、脳が2つの目標を1つの単一オブジェクトとして群化（Binding）してしまいます。垂直軸と水平軸という直交する移動ベクトルを採用することで、視覚野は左右で完全に独立した2次元運動パラメータを並列計算せざるを得なくなります。"
    },
    {
      q: "FPSゲームやeスポーツにおける具体的な実戦効果は何ですか？",
      a: "Apex Legends、VALORANT、CS2などの対戦ゲームでは、クロスヘアによる敵への精密エイム（中心視）を維持しながら、画面隅のミニマップ、キルログ、弾薬ゲージ、周辺の敵の足音や射線を同時に認知する必要があります（Green & Bavelier, 2006）。この訓練により視野狭窄（トンネルビジョン）を防ぎ、クロスヘアを乱さず戦況情報を把握できるようになります。"
    },
    {
      q: "どちらか片方の目標ばかり見失ってしまう原因は何ですか？",
      a: "多くの人間には利き目（優位眼）や優位半球に起因する視野の非対称性が存在します。右視野の目標を見失いやすい場合は左半球の注意配分不足、左視野を見失いやすい場合は右半球の注意配分不足が考えられます。意識的に注意が薄い側の目標への感度を引き上げることで、左右対称な視覚監視バランスを獲得できます。"
    },
    {
      q: "ガイド線非表示（Hide Line）モードの神経学的利点は何ですか？",
      a: "ガイド線を消去すると、軌道の外的な幾何学的補助線が消失します。これにより頭頂葉の空間認識回路は、目標の直前の速度と位置情報のみから内部モデル（フォワードモデル）を能動的に生成しなければならなくなり、内因性の軌道予測能力と空間的ワーキングメモリが高度に鍛えられます。"
    },
    {
      q: "推奨されるトレーニング時間とセット数はどれくらいですか？",
      a: "1セッション60秒を2〜3セット、1日合計5分程度が最適です。分割性注意トレーニングは前頭葉および頭頂葉の注意ネットワークに高密度の認知負荷をかけるため、疲労状態で漫然と行うよりも、極めて高い集中度を保てる短時間集中型の反復が最も定着率を高めます。"
    },
    {
      q: "高リフレッシュレート（144Hz/240Hz）ディスプレイは訓練効果にどう影響しますか？",
      a: "一般的な60Hz（フレーム更新間隔約16.7ms）に比べ、144Hz（約6.9ms）や240Hz（約4.2ms）のモニターでは直交移動する2目標の軌道が滑らかに描画され、運動ブラーや表示量子化遅延が極小化されます（Woods et al., 2015）。これにより網膜スリップエラーの誤認が減少し、純粋な脳神経レベルの注意分割訓練が可能となります。"
    }
  ],
  related: [
    { href: "/ja/drills/visual-tracking/peripheral-ping-pursuit", label: "周辺視野ピン追従トレーニング" },
    { href: "/ja/drills/visual-tracking/spatial-shift-pursuit", label: "視界ブレ・空間シフト追跡テスト" },
    { href: "/ja/drills/visual-tracking/predictive-pursuit", label: "偏差エイム練習・遮蔽軌道予測テスト" },
    { href: "/ja/drills/visual-tracking/directional-chaos-pursuit", label: "不規則方向変化・急制動追跡テスト" },
    { href: "/ja/drills/visual-tracking/constant-slow-pursuit", label: "滑動性追従・基礎アイエクササイズ" }
  ],
  sources: pickSources('pylyshyn1988', 'alvarez2005', 'awh2000', 'cavanagh2005', 'green2006', 'woods2015'),
};

export default function SplitScreenTrackingJaPage() {
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

      <SplitScreenTrackingClient
        copy={{
          title: "画面分割アイトラッキング",
          subtitle: "分割性注意追従テスト・両視野並列追尾",
          description: "画面中央で分割された領域において、直交する垂直・水平ベクトルで独立移動する二目標を同時に監視する画面分割アイトラッキング訓練。中心視野を固定したまま潜在的空間注意を両大脳半球へ均等に配分し、視野狭窄を防止しながら並列視覚情報処理を強化します。"
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/split-screen-tracking" />
      </div>
    </>
  );
}
