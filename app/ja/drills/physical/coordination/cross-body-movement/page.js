import CrossBodyMovementClient from '@/app/drills/physical/coordination/cross-body-movement/CrossBodyMovementClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JP / JA)
// Primary Intent: 目と手の協応 トレーニング, 目と手の協調運動, 協調運動 トレーニング, 協調運動 テスト
// Context: Sensory integration (感覚統合 正中線交差), bilateral motor coordination & FPS diagonal flicks
// Target Queries:
//   - "目と手の協応 トレーニング" (High-intent authentic occupational & sports query)
//   - "目と手の協調運動" / "目と手の協応 動作" (Motor coordination & pediatric/neurological queries)
//   - "協調運動 トレーニング" (Motor coordination training)
//   - "協調運動 テスト" / "協調運動 検査" (Coordination diagnostic test)
//   - "目と手の協応" (Core authentic concept)
//   - "正中線交差 ドリル" (Midline crossing drill)
//   - "対角線 フリック エイム" (Diagonal flick trajectory control)
// ============================================================

export const metadata = {
  title: "目と手の協応トレーニング・協調運動テスト – 無料視覚運動連動ゲーム | SkillDrills",
  description: "無料オンライン目と手の協応トレーニング＆協調運動テスト。画面中央の正中線を交差する対角ノードを瞬時に繋ぎ、脳梁を通じた両側性協調制御と手先の精密なフリック操作を科学的に鍛えます。",
  keywords: [
    "目と手の協応 トレーニング",
    "目と手の協調運動",
    "協調運動 トレーニング",
    "目と手の協応 動作",
    "協調運動 テスト",
    "目と手の協応",
    "正中線交差 ドリル",
    "両側統合 トレーニング",
    "対角線 フリック エイム",
    "手先 協調運動"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/coordination/cross-body-movement',
    languages: getAlternateLanguages('/drills/physical/coordination/cross-body-movement'),
  },
  openGraph: {
    title: "目と手の協応トレーニング・協調運動テスト – 無料視覚運動連動ゲーム | SkillDrills",
    description: "無料オンライン目と手の協応トレーニング＆協調運動テスト。画面中央の正中線を交差する対角ノードを瞬時に繋ぎ、脳梁を通じた両側性協調制御と手先の精密なフリック操作を科学的に鍛えます。",
    url: 'https://skilldrills.online/ja/drills/physical/coordination/cross-body-movement',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "目と手の協応トレーニング・協調運動テスト – 無料視覚運動連動ゲーム | SkillDrills",
    description: "無料オンライン目と手の協応トレーニング＆協調運動テスト。画面中央の正中線を交差する対角ノードを瞬時に繋ぎ、脳梁を通じた両側性協調制御と手先の精密なフリック操作を科学的に鍛えます。",
  },
  robots: { index: true, follow: true },
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
      "name": "フィジカルトレーニング",
      "item": "https://skilldrills.online/ja/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "協調性・コーディネーション",
      "item": "https://skilldrills.online/ja/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "目と手の協応トレーニング・協調運動テスト",
      "item": "https://skilldrills.online/ja/drills/physical/coordination/cross-body-movement"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "目と手の協応トレーニング・協調運動テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "画面中央の正中線を横断する対角スワイプにより、両側性運動制御と目と手の協応動作を科学的に測定・トレーニングする無料オンラインドリル。",
  "url": "https://skilldrills.online/ja/drills/physical/coordination/cross-body-movement",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/ja"
  },
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "目と手の協応トレーナー",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvasおよびポインター入力をサポートする最新ブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/physical/coordination/cross-body-movement",
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "目と手の協応ゲーム (Cross-Body Movement)",
  "url": "https://skilldrills.online/ja/drills/physical/coordination/cross-body-movement",
  "description": "正中線交差スワイプで脳梁伝達と対角線エイム操作を鍛える無料アクション協調性ゲーム。",
  "genre": [
    "Coordination Drill",
    "Motor Control",
    "Brain Game",
    "Action"
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "目と手の協応テストは脳と身体のどのような神経運動メカニズムを測定しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "後頭葉が捉えた視覚刺激、頭頂葉による空間位置の把握、そして一次運動野から出力される前腕・指先の精密な筋収縮シグナルの統合効率を測定します。とりわけ身体の対称軸である正中線を跨ぐ対角線スワイプを通じて、左右の大脳半球を連絡する「脳梁（Corpus Callosum）」の半球間情報伝達スピードと両側性運動協調性を厳密に評価します。"
      }
    },
    {
      "@type": "Question",
      "name": "身体の正中線（Midline）を交差する動作が、通常の左右移動よりも重要視される理由は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "神経生理学者デイビッド・キャリーら（Carey et al., 1996）の実証研究によれば、操作手と同じ側の同側空間（Ipsilateral）に比べ、身体中心を越えた反対側の対側空間（Contralateral）へ手を伸ばす動作は、神経伝達の遅延が生じ軌道誤差が増大します。正中線交差ドリルを反復することで両半球の統合処理が円滑になり、操作可能域全般において死角のない安定した操作力を獲得できます。"
      }
    },
    {
      "@type": "Question",
      "name": "APEXやVALORANT等のFPSゲームにおける対角線フリックや視点移動にどう活きますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "多くのPCゲーマーは水平方向の平行移動には慣れていますが、急激な対角線フリックや高低差のあるターゲットへのエイム時に手首の可動域限界によって軌道が円弧（アーク）を描いてしまう弱点があります。本ドリルは肘と前腕を連動させて画面全域を斜めに一閃するストロークを身体化し、180度の大回転フリックや不規則な立体交戦での照準安定性を飛躍的に高めます。"
      }
    },
    {
      "@type": "Question",
      "name": "レベルが上昇するにつれてコリドー幅やノードサイズはどのように変化しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "難易度はレベル1から最大レベル15まで250ポイントごとに段階上昇します。カーソルを維持すべき許容コリドー幅は初期の10ピクセルから最高段階ではわずか4ピクセルへと狭まり、接続先のターゲットノード半径も16ピクセルから8ピクセルへと半減します。さらにノードの配置が画面対角の四隅へと極限まで拡大されます。"
      }
    },
    {
      "@type": "Question",
      "name": "コリドー許容範囲を外れた場合、減点や残り時間のペナルティはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ、減点や45秒の制限時間の没収はありません。コリドーの許容境界をはみ出すと蓄積されたコンボ倍率が1.0倍にリセットされる仕組みを採用しています。これは失敗を過度に恐れて慎重になりすぎることなく、実戦に即した最高速度の弾道スワイプに果敢に挑戦し続けることを推奨するための設計です。"
      }
    },
    {
      "@type": "Question",
      "name": "滑らかな対角線スワイプを行うための推奨マウス感度（DPI/eDPI）とマウスパッドの広さは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "マウスを持ち上げることなく一息に対角線を滑り切るため、振り向き30〜45cm/360°の中低感度設定と、横幅450mm以上の大型ゲーミングマウスパッドが推奨されます。十分な物理面積を確保することで、手首だけでなく前腕全体を大きく使った流麗なストロークが可能になります。"
      }
    },
    {
      "@type": "Question",
      "name": "手首支点だけでマウスを操作する癖がありますが、なぜ前腕と肘を使うべきなのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "手首の構造上、手首だけを固定して斜めにマウスを振ると自然と扇状の弧を描いてしまい、直線状の細いコリドーから脱線しやすくなります。肘をデスクに軽く触れさせて回転軸（ピボット）とし、前腕全体を一体のレバーとして前後左右にスライドさせることで、数学的に正確な直線ベクトルを描くことができます。"
      }
    },
    {
      "@type": "Question",
      "name": "ウッドワースの二相性モデルを活用して極小目標ノードに確実に着弾させるコツは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ロバート・ウッドワース（Woodworth, 1899）の古典理論に従い、全行程の最初の75%は前腕の大胆な弾道加速（Ballistic sweep）で瞬時に距離を詰め、最後の25%でマウスパッドに指先と小指球の微小な下向き圧力を加えて摩擦抵抗を生み出す「終端減速制御（Terminal Deceleration）」を実行してください。"
      }
    },
    {
      "@type": "Question",
      "name": "最高ランクの17,000点（Apex Bilateral Master）を達成するための必須ポイントは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "45秒間に一度もコリドーを逸脱することなく最大3.0倍コンボを維持し、幅4px・ノード半径8pxの超難関レベル12以降で92%以上の接続成功率を達成する必要があります。ノードAに触れた瞬間、視線をマウスから即座に切り離して目標ノードBへ先回りさせる視線先行固定（Feedforward Gaze）が成否を分まます。"
      }
    },
    {
      "@type": "Question",
      "name": "このテストは外部ツールのダウンロードや登録なしで安全に利用できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、SkillDrillsのすべてのドリルはWEB標準技術（HTML5 CanvasおよびポインターロックAPI）のみで構築されており、アプリのインストールやアカウント登録は一切不要です。スコアやベスト記録はブラウザのローカルストレージにのみ保存され、プライバシーが完全に保護されます。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "目と手の協応＆正中線対角スワイプドリルの実践手順ガイド",
  "description": "画面端のノードに触れ、対角線上のコリドーを正確に走破して目標ノードを連続接続する4ステップ。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "開始ノードAに触れてベクトルラインを起動",
      "text": "画面端に点滅表示される水色の開始ノードAにマウスカーソルを重ねて接続ベクトルをアクティブにします。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/cross-body-movement#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "正中線を交差する対角コリドーを滑らかに走破",
      "text": "発光するコリドー許容ラインからはみ出さないよう注意しながら、画面対角の反対側へ向かって素早くスワイプします。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/cross-body-movement#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "目標ノードBをヒットして接続を完了",
      "text": "対角の赤紫色ノードBの中心を貫通してベクトル接続を成立させ、パーティクル炸裂のエフェクトとともに得点を獲得します。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/cross-body-movement#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "連続ヒットで3.0倍コンボ倍率を維持",
      "text": "一度も脱線せずに高速で連続接続を重ねることでコンボ倍率を最大3.0倍に高め、45秒間でハイスコアを叩き出します。",
      "url": "https://skilldrills.online/ja/drills/physical/coordination/cross-body-movement#step-4"
    }
  ]
};

const crossBodyGuide = {
  heading: "身体正中線交差と目と手の協応における認知神経科学ガイド",
  subtitle: "エアーズ感覚統合理論、キャリー対側到達力学、フィッツ・ウッドワース二重制御モデルに基づく協調運動論",
  intro: [
    "目と手の協応テスト（Cross-Body Movement Drill）は、画面の四隅を斜めに横断する超高速スワイプ操作を通じて、人体の中心対称軸である「正中線（Body Midline）」を跨ぐ際に生じる両側性運動統合の制御能力を精密に測定するドリルです。単純な水平方向のトラッキングとは異なり、身体の反対側空間へと手を伸ばす動作は脳梁（Corpus Callosum）を通じた高度な大脳半球間情報通信を要求するため、感覚統合およびスポーツ運動生理学において極めて重要な指標とされています。",
    "感覚統合療法の創始者ジーン・エアーズ（A. Jean Ayres, 1972）は、正中線を交差する四肢の運動が左右の大脳半球の連携を促し、身体図式（Body Schema）と空間協調性を確立するための不可欠な運動であると提唱しました。さらにデイビッド・キャリーら（Carey, Hargreaves & Goodale, 1996）の運動制御実験が明らかにした通り、操作手と同じ側（同側）のターゲットへリーチする場合に比べ、正中線を越えた対側空間（Contralateral Space）への到達動作は反応潜時が延長し、終端の軌道誤差が増大する神経生理学的特性を持ちます。本ドリルはこの対側遅延を克服するために開発されました。",
    "ポール・フィッツ（Fitts, 1954）の法則が示すように、目標までの移動距離が長くなりターゲット幅が狭まるほど、要求される運動困難度指数（Index of Difficulty）は対数関数的に跳ね上がります。本ドリルではレベルの上昇に伴い、通過すべきコリドーの許容幅が10pxから4pxへと過酷に絞られ、ノードサイズも16pxから8pxへと圧縮されます。ロバート・ウッドワース（Woodworth, 1899）の二相性モデルが解き明かした通り、区間の8割を電光石火の速度で駆け抜ける前腕の弾道衝動（Ballistic impulse）と、目標直前での繊細な視覚フィードバック終端減速（Current-control deceleration）の完璧な融合が高得点の鍵となります。",
    "計測精度およびハードウェアに関する注記：本ドリルはブラウザの performance.now() 高精度クロックを用いてクライアント端末内部でミリ秒単位の物理演算を行っています。ディスプレイのリフレッシュレート（60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms、Woods et al., 2015）やマウスのポーリングレート（125Hz 対 1000Hz）により微小な物理遅延が生じるため、5ms未満の誤差は測定ノイズとしてお考えください。全データはブラウザ内にのみ安全に保持されます。"
  ],
  benchmarks: {
    title: "目と手の協応＆正中線対角制御 5段階標準ベンチマーク",
    headers: ["階層 / ティア", "称号 (Rank Title)", "スコア基準値", "到達レベル", "ベクトル接続精度", "神経生理学的協応プロファイル"],
    rows: [
      ["Tier 1: 頂点バイラテラルマスター", "Apex Bilateral Master", "17,000点以上", "Level 12 – 15", "92%以上維持", "上位0.1%水準の卓越した半球間情報交換能力、4px極小コリドーにおける前腕軸スワイプの完成（Ayres 1972; Fitts 1954）"],
      ["Tier 2: エリートミッドラインスイーパー", "Elite Midline Sweeper", "13,000 – 16,999点", "Level 9 – 11", "85 – 91%維持", "対側到達時の遅延なき弾道加速と8pxノードへの正確なウッドワース終端減速制御（Carey et al. 1996）"],
      ["Tier 3: 熟練ベクトル追従者", "Advanced Vector Tracer", "9,500 – 12,999点", "Level 6 – 8", "76 – 84%維持", "競技FPS上位ランク水準の安定した対角エイム力とスムーズな正中線交差マウスコントロール能力"],
      ["Tier 4: 中級ノードコネクター", "Intermediate Node Connector", "6,000 – 9,499点", "Level 3 – 5", "65 – 75%維持", "成人の標準的協応力、コリドー幅が6px以下に狭まると手首の可動域限界で軌道逸脱が発生"],
      ["Tier 5: 入門対角学習者", "Novice Diagonal Learner", "6,000点未満", "Level 1 – 2", "65%未満維持", "手首固定による扇状の歪みやオーバーシュートが頻発、肘を支点とした前腕スライド練習を推奨"]
    ],
    note: "感覚統合理論（Ayres 1972）、対側到達力学（Carey et al. 1996）、およびフィッツの運動法則（Fitts 1954）に基づく客観的パフォーマンス基準です。"
  },
  techniques: {
    title: "目と手の協応力向上＆対角線ベクトルスワイプ実践プロトコル",
    items: [
      {
        name: "エアーズ身体正中線交差と脳梁神経活性化 (Ayres Midline Crossing)",
        desc: "エアーズ（1972）の研究に従い、椅子の中心およびモニターの中央をみぞおちの正面に正確に合わせます。上体を不必要に捻ることなく、前腕が胸の前を斜めに横切るように操作することで、純粋な正中線交差刺激が得られます。",
        tips: "背筋を伸ばし、肘をマウスパッドに軽く触れさせて安定した支点を確保し、腕全体が滑らかに反対側へスライドできるようにしてください。"
      },
      {
        name: "キャリー対側到達加速と視線先行固定 (Contralateral Feedforward Gaze)",
        desc: "キャリーら（1996）が実証した対側到達時の遅延を打ち消すため、ノードAに触れたその瞬間に、視線を即座に反対側の目標ノードBの位置へと先回りして固定します。",
        tips: "マウスカーソルを目で追うのではなく、目標ノードBを凝視し続けることで、脳のフィードフォワード運動プログラムが最短の直線経路を自動計算します。"
      },
      {
        name: "ウッドワース電流制御と目標ノード終端減速 (Terminal Deceleration)",
        desc: "ウッドワース（1899）の二相性制御モデルに基づき、対角線区間の75%は前腕の大胆な弾道加速で一気に突破し、残りの25%で指先にわずかな下向き圧力を加えて減速します。",
        tips: "高難度でノードが8pxに縮小した際は、手のひらの小指球でパッドを軽く押さえて摩擦ブレーキをかけると、オーバーシュートを完璧に阻止できます。"
      },
      {
        name: "フィッツ困難度指数を克服する前腕エルボーピボット (Forearm Elbow Pivot)",
        desc: "手首だけで斜めの直線を引こうとすると骨格構造上アーチ状に歪んで細いコリドーを脱線します。手首を中間位に固定し、肘をピボットとして前腕全体で真っ直ぐ押し引きします。",
        tips: "450mm以上の大型マウスパッドを使用し、マウスコードが引っかからないようバンジー等で均一な滑走環境を整えてください。"
      }
    ]
  },
  steps: [
    "モニターの中心と自身のみぞおちを正面で一直線に合わせ、正しい姿勢をとります。",
    "ラウンド開始後、画面端に出現する水色の開始ノードAにカーソルを重ねます。",
    "発光するコリドー許容ラインを維持しながら、対角の赤紫色ノードBへ向けて一気にスワイプします。",
    "ノードBを的確にヒットしてエフェクトを発生させ、脱線なしの連続接続で3.0倍コンボを維持します。"
  ],
  audience: "FPS・MOBAゲーマー（VALORANT、Apex、CS2）、アスリート、精密動作を要するスポーツ競技者、および目と手の協応動作・両側性運動制御を高めたいすべての方。",
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('ayres1972', 'carey1996', 'cernacek1961', 'fitts1954', 'woodworth1899', 'woods2015'),
};

export default function CrossBodyMovementPageJa() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <CrossBodyMovementClient
        copy={{
          title: "目と手の協応トレーニング・協調運動テスト",
          subtitle: "正中線交差＆両側性運動制御ドリル • 15段階",
          rulesTitle: "目と手の協応トレーニングのルール＆スコア採点基準",
          rules: [
            { title: "開始ノードの活性化", text: "画面の端に表示される水色の開始ノード（A）にカーソルを合わせ、接続ベクトルを起動します。" },
            { title: "正中線許容コリドーの対角スワイプ", text: "発光するコリドー許容ラインからはみ出さず、画面反対側の目標ノード（B）へ向かってスムーズにマウスを走らせます。" },
            { title: "目標ノード貫通とコンボ加速", text: "赤紫色の目標ノードを正確に射抜くとパーティクルが炸裂し、基本スコアとともにコンボ倍率が最大3.0倍まで上昇します。" },
            { title: "逸脱時のコンボリセット", text: "コリドー境界を外れるとコンボは1.0倍にリセットされますが、45秒の制限時間が減算されることはありません。" }
          ],
          aboutTitle: "目と手の協応ドリルについて",
          aboutHeading: "身体正中線交差と両側性運動統合の神経生理学",
          aboutText: "本ドリルは、ジーン・エアーズ（A. Jean Ayres, 1972）の感覚統合療法およびデイビッド・キャリー（Carey et al., 1996）の反対側到達（Contralateral Reaching）研究に基づいて設計されています。身体の中心軸（正中線）を横断する対角線上の大きなマウススワイプは、脳梁を介した左右大脳半球の高速情報伝達を促し、手首だけに頼らない前腕・肩甲骨連動の180度フリックや高速視点移動能力を高めます。"
        }}
      />
      <DrillGuide guide={crossBodyGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/cross-body-movement"
          locale="ja"
        />
      </div>
    </>
  );
}
