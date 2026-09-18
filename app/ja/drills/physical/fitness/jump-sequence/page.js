import JumpSequenceClient from '@/app/drills/physical/fitness/jump-sequence/JumpSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JP / JA)
// Primary Intent: ジャンプ力 トレーニング 自宅, プライオメトリクス トレーニング, プライオメトリクス ジャンプ
// Japanese Context: バレー/バスケの垂直跳び強化＆FPSジャンプ撃ち・滞空エイム軌道予測
// High-Demand, Low-Competition Target Keywords:
//   - "ジャンプ力 トレーニング 自宅" (Home jump training high-intent search)
//   - "プライオメトリクス トレーニング" (Scientific explosive jump conditioning)
//   - "プライオメトリクス ジャンプ" (Plyometric jump exercise technique)
//   - "垂直跳び トレーニング" (Vertical jump measurement & power drill)
//   - "ジャンプ タイミング 練習" (Jump timing and cadence practice)
//   - "空中 軌道 制御" (Mid-air steering and flight trajectory)
//   - "放物線 迎撃 ドリル" (Parabolic aerial interception)
//   - "滞空時間 トレーニング" (Hang time and aerial control)
//   - "着地 反発 リズム" (Rebound cadence & kinetic energy transfer)
//   - "アジリティ ジャンプ 練習" (Agility jump drill)
// ============================================================

export const metadata = {
  title: "ジャンプ力トレーニング＆プライオメトリクス練習 – 無料滞空軌道迎撃ゲーム | SkillDrills",
  description: "無料オンラインのジャンプ力トレーニング＆プライオメトリクス練習ゲーム。クリックチャージによる垂直跳躍、滞空中の放物線軌道ステアリング、光学的タウ理論に基づく高速飛翔ターゲットの迎撃タイミングを科学的に鍛えます。",
  keywords: [
    "ジャンプ力 トレーニング 自宅",
    "プライオメトリクス トレーニング",
    "プライオメトリクス ジャンプ",
    "垂直跳び トレーニング",
    "ジャンプ タイミング 練習",
    "空中 軌道 制御",
    "放物線 迎撃 ドリル",
    "滞空時間 トレーニング",
    "着地 反発 リズム",
    "アジリティ ジャンプ 練習"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/fitness/jump-sequence',
    languages: getAlternateLanguages('/drills/physical/fitness/jump-sequence'),
  },
  openGraph: {
    title: "ジャンプ力トレーニング＆プライオメトリクス練習 – 無料滞空軌道迎撃ゲーム | SkillDrills",
    description: "無料オンラインのジャンプ力トレーニング＆プライオメトリクス練習ゲーム。クリックチャージによる垂直跳躍、滞空中の放物線軌道ステアリング、光学的タウ理論に基づく高速飛翔ターゲットの迎撃タイミングを科学的に鍛えます。",
    url: 'https://skilldrills.online/ja/drills/physical/fitness/jump-sequence',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ジャンプ力トレーニング＆プライオメトリクス練習 – 無料滞空軌道迎撃ゲーム | SkillDrills",
    description: "無料オンラインのジャンプ力トレーニング＆プライオメトリクス練習ゲーム。クリックチャージによる垂直跳躍、滞空中の放物線軌道ステアリング、光学的タウ理論に基づく高速飛翔ターゲットの迎撃タイミングを科学的に鍛えます。",
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
      "name": "身体機能トレーニング",
      "item": "https://skilldrills.online/ja/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "フィットネス＆敏捷性",
      "item": "https://skilldrills.online/ja/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "ジャンプ力トレーニング＆プライオメトリクス練習",
      "item": "https://skilldrills.online/ja/drills/physical/fitness/jump-sequence"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ジャンプ力トレーニング＆プライオメトリクス練習ドリル",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "垂直推進力チャージ、滞空中の放物線軌道予測、動的飛翔ターゲットの迎撃を科学的に鍛える無料オンラインドリル。",
  "url": "https://skilldrills.online/ja/drills/physical/fitness/jump-sequence",
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
  "name": "ジャンプシークエンス Web アプリケーション",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas およびポインター入力をサポートする最新ブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/physical/fitness/jump-sequence",
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "空中軌道迎撃ゲーム (Jump Sequence)",
  "url": "https://skilldrills.online/ja/drills/physical/fitness/jump-sequence",
  "description": "垂直跳躍チャージと空中ステアリングで高速飛行ターゲットを迎撃する無料ブラウザアクション。",
  "genre": [
    "Action Game",
    "Physics Game",
    "Timing Drill",
    "Coordination"
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
      "name": "画面上のクリックチャージと空中ステアリングが、実際のジャンプ力や滞空動作にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "本ドリルはパーヴォ・コミ（Paavo V. Komi, 2000）の伸張-短縮サイクル（SSC）理論をモデル化し、接地瞬間の筋腱複合体の弾性エネルギー蓄積と爆発的力発揮率（Rate of Force Development）を調節する神経回路を刺激します。空中で放物線軌道を左右に微調整する操作は、実戦における滞空時の空間認識能力や空中姿勢制御感覚を向上させます。"
      }
    },
    {
      "@type": "Question",
      "name": "川人光男（Kawato, 1999）の小脳内部順モデル（Internal Forward Models）と空中軌道予測とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "空中では地面からの反力を利用できないため、感覚フィードバック（100〜150msの伝達遅延）を待っていては正確な修正が間に合いません。小脳内部順モデルは、跳躍開始時の初速ベクトルと重力加速度から将来の飛行曲線を脳内で即座に事前シミュレーションし、ターゲットの進行方向へ先回りした微小ステアリング指令を運動器へ下達します。"
      }
    },
    {
      "@type": "Question",
      "name": "デイビッド・リー（Lee, 1976）の光学的タウ（Optical Tau, τ）理論と衝突予測時間（TTC）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "飛翔する物体と激突・迎撃する際、脳は距離や絶対速度を個別に数値計算しません。網膜上に映る対象の像の相対的膨張率の逆数である「光学的タウ（τ）」を視覚野が直接抽出し、衝突までの猶予時間（Time-to-Contact）を直感的に把握します。本ドリルで最高900 px/sに達するターゲットを迎撃する際、このタウ感知能力が研ぎ澄まされます。"
      }
    },
    {
      "@type": "Question",
      "name": "バレーボールのアタック、バスケのリバウンド、FPSのジャンプ撃ちエイムにどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "球技におけるジャンプ打点の頂点合わせや空中戦の競り合いは、放物線のピークとボール軌道の交差タイミングを予測する能力にかかっています。またAPEXやOverwatchなどのFPSにおいても、ジャンプパッドでの跳躍中や空中機動時に慣性を考慮しながら敵を狙い撃つ高精度の空中トラッキング感覚を鍛え上げます。"
      }
    },
    {
      "@type": "Question",
      "name": "レベル進行に伴うターゲット速度や球体サイズの縮小、採点システムの変化は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "スコア250点ごとにレベルが進行し、最大レベル15まで難易度が引き上げられます。ターゲットの移動速度は初期の120 px/sから最高900 px/sまで加速し、迎撃有効半径は35pxから12pxへと極小化します。上位レベルでは壁面での跳ね返り挙動が加わり、より緻密な先読み予測が不可欠となります。"
      }
    },
    {
      "@type": "Question",
      "name": "ターゲットを外し地面に着地した場合のペナルティはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "減点や45秒の制限時間ペナルティはありません。迎撃に失敗して着地した場合、コンボ倍率が1.0xにリセットされ赤い視覚警告フラッシュが表示されるのみです。躊躇せず積極的な高速チャージと大胆な空中フリックへ挑戦できるよう配慮されたルール設計です。"
      }
    },
    {
      "@type": "Question",
      "name": "空中微細ステアリングにおける推奨マウス感度（DPI）とグリップスタイルは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "跳躍後の上昇カーブにおいてわずか100ms以内で軌道修正を完遂させるため、腕全体よりも指先と手首の繊細なスナップ操作が可能な「つまみ持ち（Fingertip Grip）」または「つかみ持ち（Claw Grip）」が最適です。感度は半径12pxの微小標的に正確に飛び込める中低感度（eDPI 200〜350）を推奨します。"
      }
    },
    {
      "@type": "Question",
      "name": "着地直後に次のジャンプへ移行する反発リズム（リバウンドケイデンス）のコツは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "着地した瞬間に操作点が静止していてはリズムを維持できません。着地の直前から視線はすでに出現する次のターゲットの軌道を捉えておく必要があり、接地と同時に即座にクリックチャージを開始する「反発リバウンド（Rebound Rhythm）」を徹底することで最大3.0倍のコンボを死守できます。"
      }
    },
    {
      "@type": "Question",
      "name": "144Hz/240Hz高リフレッシュレートモニターが900 px/sの放物線迎撃に与える影響は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ターゲットが900 px/sで飛行する際、60Hzモニターではフレームごとに約15pxの表示飛びが生じ、12pxの標的をすり抜けて空振りする原因になります。240Hz高駆動ディスプレイ（フレーム時間4.1ms）なら表示のブレを3.75px単位まで微細化し、フィッツの法則（Fitts 1954）に基づく確実な交差打撃を可能にします。"
      }
    },
    {
      "@type": "Question",
      "name": "練習中にマウス軌道や個人データが外部サーバーへ送信されることはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ、一切ありません。SkillDrillsの物理演算、タイム計測（performance.now）、コンボ処理は100%クライアントのブラウザ内でローカル完結しています。ハイスコア等の記録はお使いの端末のlocalStorageにのみ安全に保管され、外部へのトラッキングや個人情報収集は存在しません。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "ジャンプシークエンス空中軌道迎撃 4段階科学的プロトコル",
  "description": "垂直推進力チャージ、放物線軌道シミュレーション、空中ステアリングにより高速標的を捉える実践手順。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "垂直推進力エネルギーの蓄積 (Charge Vertical Impulse)",
      "text": "ベースドット上にカーソルを合わせ、マウスクリックを長押しして目標高度に応じた適切な跳躍力をチャージゲージで調節します。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/jump-sequence#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "弾道跳躍と空中ステアリング (Ballistic Liftoff & Steering)",
      "text": "クリックを離して上昇を開始し、滞空中にマウスを左右へスライドさせて小脳順モデルに基づく空中軌道カーブを描きます。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/jump-sequence#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "光学的タウに基づく精密迎撃 (Optical Tau Interception)",
      "text": "ターゲットの膨張率（τ）を追跡しながら、重力による降下が始まる前に標的の中心核と自身のドットを完全に一致させます。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/jump-sequence#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "接地反発と連続コンボの維持 (Touchdown & Rebound)",
      "text": "着地と同時に間髪入れず次期ターゲットへの再チャージを開始し、3.0倍コンボ倍率を45秒間途切れさせずに維持します。",
      "url": "https://skilldrills.online/ja/drills/physical/fitness/jump-sequence#step-4"
    }
  ]
};

const jumpGuide = {
  heading: "垂直跳びタイミング及び滞空軌道迎撃生体力学ガイド",
  subtitle: "コミ伸張-短縮サイクル（SSC）、川人小脳内部順モデル、リー光学的タウ理論に基づく空中制御論",
  intro: [
    "ジャンプシークエンストレーニング（Jump Sequence Training）は、バレーボールのアタック、バスケットボールのリバウンド、サッカーのヘディング競り合いなど、空中戦が勝敗を決するスポーツに不可欠な「滞空中の精密迎撃能力」をモデル化した生体力学ドリルです。単に高く飛ぶ筋力だけでなく、地表で蓄積した垂直推進力で描く放物線上において、高速で飛来する標的と自らの軌道を完璧に交差させる知覚-運動統合スキルを鍛え上げます。",
    "世界的生体力学者パーヴォ・コミ（Paavo V. Komi, 2000）の「伸張-短縮サイクル（Stretch-Shortening Cycle, SSC）」理論によれば、筋肉は伸張局面から短縮局面へ素早く移行することで腱の弾性エネルギーを爆発的に解放します。本ドリルのチャージ＆ローンチ（Charge-and-Launch）操作はこのSSCプロセスを可視化し、標的の高度にぴったり見合った発射運動エネルギー（Impulse）を感覚的に割り出す神経適応を促進します。",
    "滞空中の軌道修正は、川人光男（Kawato, 1999）の提唱した「小脳内部順モデル（Cerebellar Forward Models）」によって司られます。空中では地面からの反力による修正が効かないため、視覚フィードバックの遅れを待たずに小脳のシミュレーションを通じて放物線とターゲットの合流点を先読みし、マウスで先制ステアリングを行う必要があります。さらにデイビッド・リー（Lee, 1976）の光学的タウ（Optical Tau, τ）理論が、飛翔標的との衝突予測時間（TTC）を誤差なく捉える鍵となります。",
    "測定精度およびハードウェアに関する注記: 本ドリルはブラウザのperformance.now()高解像度タイマーを利用し、クライアント端末内でミリ秒単位で計測されます。モニターのリフレッシュレート（60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms）やマウスのポーリングレート（125Hz vs 1000Hz）により物理的な遅延差が生じるため、5ms未満の微細な差は測定ノイズとしてご理解ください。すべてのスコアはブラウザ内にのみ安全に保持されます。"
  ],
  benchmarks: {
    title: "垂直跳びシークエンス＆軌道迎撃 5段階標準ベンチマーク",
    headers: ["階層・ランク", "称号 (Rank Title)", "基準スコア", "標的速度と迎撃精度", "総合グレード", "神経生体力学プロファイル"],
    rows: [
      ["Tier 1: 頂点軌道マスター", "Apex Trajectory Master", "17,000点以上", "92%以上 / 800 – 900 px/s", "Grade S", "上位0.1%水準の超人的SSC推進力演算、及び900 px/s極限飛行標的との完全な光学的タウ合流 (Komi 2000; Kawato 1999; Lee 1976)"],
      ["Tier 2: 精密エアリアルストライカー", "Precision Aerial Striker", "12,000 – 16,999点", "84 – 91% / 650 – 799 px/s", "Grade A", "上位3%水準の卓越した小脳空中ステアリング、15〜18px縮小球体への安定した放物線収束軌道の実現"],
      ["Tier 3: 熟練ジャンプインターセプター", "Skilled Jump Interceptor", "7,500 – 11,999点", "75 – 83% / 500 – 649 px/s", "Grade B", "競技ゲーマー及びアスリート水準、確かな推進力制御と接地反発の安定したリズム連係"],
      ["Tier 4: 放物線航法学習者", "Developing Parabola Navigator", "4,000 – 7,499点", "65 – 74% / 350 – 499 px/s", "Grade C", "一般的な成人の平均水準、速度500 px/s超過時に軌道予測の狂いによる着地ミスが頻発"],
      ["Tier 5: 初級跳躍訓練生", "Novice Liftoff Trainee", "4,000点未満", "< 65% / < 350 px/s", "Grade D", "過剰チャージによる飛び越しやステアリング遅延、チャージゲージの高度調節と予測操作の反復を推奨"]
    ],
    note: "伸張-短縮サイクル運動学(Komi 2000)、小脳順モデル(Kawato 1999)、光学的タウ予測理論(Lee 1976)に基づく統合評価指標です。"
  },
  techniques: {
    title: "垂直跳び滞空制御＆軌道迎撃実戦プロトコル",
    items: [
      {
        name: "コミSSC推進力プロポーショナルチャージ (Komi Impulse Potentiation)",
        desc: "チャージゲージを闇雲に100%まで溜めないでください。標的の通過高度を見極め、放物線の頂点が標的の軌道線にちょうど重なるだけの推進力を短くシャープに溜めて放出しましょう。",
        tips: "ボタンの押し離しを「筋肉のゴムパチンコをピンと弾くような感覚」で軽快に行ってください。"
      },
      {
        name: "川人小脳順モデル空中ステアリング (Cerebellar Parabolic Steering)",
        desc: "空中に飛び上がったら自分のドットを見るのではなく、先にある衝突予想空間へ視線を向けます。小脳の事前シミュレーションに従ってマウスを横へ滑らかにスライドさせてください。",
        tips: "ターゲットの後ろを追うのではなく、ターゲットがこれから通過する前方空間に体を投げ入れる先回り操作を徹底しましょう。"
      },
      {
        name: "リー光学的タウ終端迎撃微調整 (Optical Tau Final Interception)",
        desc: "標的球体と接触する直前の残り100msでは、標的の膨張スピード（τ）に意識を集中させ、指先の微細なスナップで誤差を最終収束させます。",
        tips: "標的の外枠を掠めるのではなく、中心核を真正面から突き抜けるイメージで突入してください。"
      },
      {
        name: "900 px/s超高速域での接地反発ケイデンス (Rebound Cadence Maintenance)",
        desc: "着地時に動きを止めてはいけません。床に足がついた瞬間に次期ターゲットへの再チャージを開始し、メトロノームのような均一なテンポを刻み続けてください。",
        tips: "着地と同時に次のターゲットの反対方向へマウスを即座に再配置する予備動作を身につけましょう。"
      }
    ]
  },
  steps: [
    "姿勢を整え、画面下部のベースドットにクロスヘアを配置します。",
    "ターゲットの高さと速度を読み取り、クリック維持で推進力を溜めて発射します。",
    "滞空中にマウスを左右へ操舵し、ターゲットの進行軌道へ放物線を収束させます。",
    "着地直後に間髪入れず次の跳躍へ繋ぎ、3.0倍コンボで45秒間の最高記録を目指します。"
  ],
  audience: "バレー、バスケ、サッカー、陸上でジャンプ力と空中打点のタイミングを極めたいアスリート、及びAPEXやOverwatchで空中戦のジャンプ撃ち精度を高めたいゲーマー。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('komi2000', 'kawato1999', 'lee1976', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function JumpSequencePageJa() {
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
      <JumpSequenceClient
        copy={{
          title: "ジャンプ力トレーニング＆プライオメトリクス練習",
          subtitle: "垂直推進力チャージ＆空中ステアリングドリル • 15段階",
          rulesTitle: "ジャンプシークエンスのルールと採点システム",
          rules: [
            { title: "跳躍チャージと垂直発射", text: "プレイヤードット上でクリックを長押しして推進力を溜め、離して垂直発射します。" },
            { title: "滞空中の空中軌道ステアリング", text: "空中にいる間にマウスを左右に動かし、飛来する動的ターゲットへ軌道を誘導します。" },
            { title: "連続迎撃コンボの蓄積", text: "床に落ちる前にターゲットを撃破するとコンボ倍率が最大3.0倍まで上昇し、高得点を得られます。" },
            { title: "着地ミス時のコンボリセット", text: "標的を捉えられず地面に着地するとコンボが1.0倍にリセットされますが、累積スコアは維持されます。" }
          ],
          aboutTitle: "ジャンプシークエンスについて",
          aboutHeading: "伸張-短縮サイクル（SSC）と滞空放物線制御の神経生体力学",
          aboutText: "ジャンプシークエンス（Jump Sequence）は、垂直推進力の蓄積、滞空放物線軌道のシミュレーション、そして飛翔標的との衝突予測能力を鍛える科学的ドリルです。パーヴォ・コミ（2000）の伸張-短縮サイクル（SSC）弾性理論と川人光男（1999）の小脳内部順モデルに基づいて開発され、120 px/sから900 px/sへと加速する標的をデイビッド・リー（1976）の光学的タウ理論に従って迎撃する神経回路を強化します。バレーやバスケの空中打点感覚とハイパーFPSでの空中エイム精度を飛躍的に向上させます。"
        }}
      />
      <DrillGuide guide={jumpGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/jump-sequence"
          locale="ja"
        />
      </div>
    </>
  );
}
