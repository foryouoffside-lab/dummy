import PeripheralPingPursuitClient from '@/app/drills/visual-tracking/peripheral-ping-pursuit/PeripheralPingPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// JAPANESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "周辺視野 トレーニング" (Peripheral vision training) / "中心視 周辺視 同時"
// Secondary:    "周辺視野 拡大", "視野拡大 トレーニング", "動体視力 周辺視野 テスト"
// LSI / Domain:  "視覚的注意 分配", "潜在的空間注意 訓練", "機能的視野 FFOV",
//               "トンネルビジョン 改善", "周辺視 索敵 エイム", "視線固定 周辺検知"
// Authentic Domain Terms: 周辺視野トレーニング（Peripheral Vision Training）, 潜在的空間注意（Covert Spatial Attention）, 機能的視野（Functional Field of View / FFOV）, 視覚的ズームレンズ（Visual Zoom Lens）, 網膜杆体細胞（Retinal Rods）, サッケード抑制（Saccadic Suppression）
// ============================================================

export const metadata = {
  title: "周辺視野ピン追従トレーニング・中心視周辺視統合テスト – 視野拡大＆潜在的空間注意 | SkillDrills",
  description: "中心標的を視線で捉え続けながら、周辺視野に生じる光パルスをサッケード跳躍なしに瞬時に検知する無料アイトラッキング練習。視野拡大と注意力分配を強化。登録不要。",
  keywords: [
    "周辺視野 トレーニング",
    "中心視 周辺視 同時",
    "周辺視野 拡大",
    "視野拡大 トレーニング",
    "動体視力 周辺視野 テスト",
    "視覚的注意 分配",
    "潜在的空間注意 訓練",
    "機能的視野 FFOV",
    "トンネルビジョン 改善",
    "周辺視 索敵 エイム",
    "視線固定 周辺検知",
    "広角視野 トレーニング"
  ],
  openGraph: {
    title: "周辺視野ピン追従トレーニング・中心視周辺視統合テスト – 視野拡大＆潜在的空間注意 | SkillDrills",
    description: "中心標的を視線で捉え続けながら、周辺視野に生じる光パルスをサッケード跳躍なしに瞬時に検知する無料アイトラッキング練習。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit",
    siteName: "SkillDrills",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "周辺視野ピン追従トレーニング・中心視周辺視統合テスト – 視野拡大＆潜在的空間注意 | SkillDrills",
    description: "中心標的を追従しながら周辺視野の光パルスを検知する無料オンライン潜在的注意ビジョントレーニング。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/peripheral-ping-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "視覚追従・アイトラッキング", "item": "https://skilldrills.online/ja/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "周辺視野ピン追従トレーニング・中心視周辺視統合テスト", "item": "https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "周辺視野ピン追従トレーニング・中心視周辺視統合テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "中心標的を中心窩で滑らかに追従しながら、周辺視野に出現するパルスピンを不随意サッケードを起こさずに検知する無料潜在的空間注意訓練ツール。",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/ja" },
  "inLanguage": "ja",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "周辺視野ピン追従トレーニング・中心視周辺視統合テスト – 視野拡大＆潜在的空間注意 | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応ブラウザ（Chrome, Edge, Firefox, Safari）",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit",
  "inLanguage": "ja",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "周辺視野ピン追従トレーニング・中心視周辺視統合テスト",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit",
  "description": "移動する中心ターゲットを視線固定で追従しながら、視野外周にフラッシュするピンを即座に検知・応答するブラウザビジョントレーニングゲーム。",
  "genre": ["Action", "Brain Game", "Eye Tracking", "Vision Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "周辺視野ピン追従トレーニングの測定・実践手順",
  "description": "中心視の固定安定性と周辺視野の潜在的注意検知を同時に両立させる4段階の実践ステップ。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "視距離の確保と視野角アライメント",
      "text": "ディスプレイから約50〜70cmの距離を確保し、画面全体が左右視野角約40〜60度の中に収まるように姿勢を整えます。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "セッション時間と速度倍率の選択",
      "text": "訓練目的に応じてセッション時間（30秒〜120秒）と速度倍率（0.5x〜9.0x）を設定します。初心者は1.0xから開始します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "中心窩ロックを維持したまま周辺ピンの検知",
      "text": "中心で移動するターゲットを中心窩で追尾し続けます。周辺部にパルスピンが点滅しても視線を向けず、周辺視野の意識だけで検知してキー入力（スペースキー等）を行います。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "検知反応潜時と中心視離脱エラーの分析",
      "text": "セッション完了後、周辺ピン検知の平均反応時間（ms）と、視線が中心から外れて周辺ピンに吸い寄せられたサッケードエラー率を評価します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "周辺視野ピン追従トレーニングとはどのようなドリルですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "画面の中央部を滑らかに移動するプライマリターゲットを中心窩で注視し続けながら、画面の四隅や外周部に突発的に点滅する『周辺パルスピン』を視線を動かさずに検知し、瞬時に応答するビジョントレーニングです。中心視のロックと周辺視野の広域空間監視を脳内で同時に成立させる能力を鍛えます。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜ周辺の光へ目を向けずに中心を見続けなければならないのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "周辺で発生した事象に対して毎回眼球を向ける（顕在的サッケード）と、跳躍の開始までに約200ミリ秒の潜時（Findlay & Walker, 1999）がかかり、さらに中心の標的から照準が外れてしまいます。視線を動かさずに注意の焦点だけを広げる『潜在的注意（Covert Attention）』を使えば、中心の標的を捉えたまま周辺の危険やチャンスをゼロ遅延で察知できるためです。"
      }
    },
    {
      "@type": "Question",
      "name": "「潜在的注意（Covert Attention）」と「顕在的注意（Overt Attention）」の違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "顕在的注意とは、興味のある対象に眼球や頭部を直接向けて中心窩で見る動作を指します。一方、潜在的注意とは、Posner（1980）が定義したように、視線は一点（中心の敵やボール）に固定したまま、意識のスポットライトだけを視野の斜めや外側へ向けて情報処理を行う高度な神経機能です。"
      }
    },
    {
      "@type": "Question",
      "name": "周辺で光が点滅した際、反射的に目がそちらへ動いてしまうのを防ぐには？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "突然の光刺激に対して中脳上丘が自動的にサッケードを引き起こそうとする原始的な視覚反射（視覚的捕捉）が働くためです。これを抑制するには、中心ターゲットの『色や微小な形状』に強く意識を縛り付け、周辺の光は『見る』のではなく『背景のチラつきとして感じる』感覚を掴むことが重要です。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲーム（VALORANT, Apex Legends, CS2）でどのような効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "クロスヘアを敵の頭部に合わせている最中に、画面端のミニマップの赤点、キルログの更新、あるいは画面の隅から飛び出してきた2人目の敵の影を瞬時に認知できるようになります。視野が狭窄して横からの奇襲に無防備になる『トンネルビジョン』を根本から解消できます。"
      }
    },
    {
      "@type": "Question",
      "name": "球技スポーツ（サッカー、バスケ）や車の運転にも効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "絶大な効果があります。ボールや前方の車を直視しながら、サイドから走り込んでくる味方の位置や歩行者の飛び出しを視野の端で同時に捕捉できるようになります。スポーツにおけるパスコースの視野拡大や、交通事故防止における危険予測能力の向上に直結します。"
      }
    },
    {
      "@type": "Question",
      "name": "緊張したり焦ると視野が狭くなる「トンネルビジョン」の原因は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "強いストレスや交感神経の過剰興奮により、大脳皮質の前頭頭頂ネットワークが機能的視野（FFOV）を狭めて直前の危機にのみリソースを集中させようとするためです。日頃から中心視と周辺視を同時に使うトレーニングを行うことで、緊迫した場面でも視野角を広く保つ耐性が身につきます。"
      }
    },
    {
      "@type": "Question",
      "name": "モニターのサイズや目との適切な距離はどう設定すべきですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "24〜27インチのモニターであれば、目から50〜65cm程度離れるのが理想的です。画面の端が視線中心から左右約25〜30度（全視野角約50〜60度）の角度に位置することで、網膜周辺部の杆体細胞受容野を最も効率的に刺激できます。"
      }
    },
    {
      "@type": "Question",
      "name": "1日の推奨練習時間と効果的なセッション頻度は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1セッション60秒を、間に30秒の目を閉じる休憩を挟んで3〜5セット（計5〜8分）行うのが適量です。潜在的注意の維持は前頭前野のワーキングメモリと注意リソースを激しく消費するため、集中力が途切れたと感じたらそれ以上の長時間は避けてください。"
      }
    },
    {
      "@type": "Question",
      "name": "練習中に目の奥の疲労や頭痛を感じた場合の対処法は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "中心窩を凝視しながら意識を外周へ広げる認知負荷による脳疲労です。直ちにドリルを中断し、目を閉じて深呼吸を行うか、窓の外の遠くの景色を眺めて眼筋の緊張を解いてください。次回は速度倍率を0.8xや0.6xに落として負荷を調節しましょう。"
      }
    }
  ]
};

const guideProps = {
  heading: "周辺視野ピン追従・潜在的空間注意の認知神経科学基準",
  intro: [
    "周辺視野ピン追従（Peripheral Ping Pursuit）とは、中央で連続移動するプライマリ標的を中心窩（Fovea）で高精度に追尾し続けながら、画面の周辺外角部に突発的に点滅するパルスピン刺激を視線を向けずに検知・応答する二重課題型（Dual-task）ビジョントレーニングです。中心視のロックを一切破綻させることなく、潜在的注意（Covert Spatial Attention）を視野全体へ動的に拡張する人間の機能的視野（Functional Field of View / FFOV）の限界能力を測定・強化します（Posner, 1980; Eriksen & St. James, 1986）。",
    "顕在的サッケードの抑制とPosnerの潜在的注意ネットワーク：周辺部に新たな視覚的過渡変化（ピンの点滅）が発生した際、中脳上丘（Superior Colliculus）は反射的に視線を光の発生源へ飛ばそうとする弾道サッケード信号を生成します（Findlay & Walker, 1999）。しかし、周辺目標に視線を向ける動作には約200ミリ秒の潜時を要し、中心の標的追従を完全に破壊してしまいます。前頭眼野（FEF）および後頭頂皮質から構成される背側注意ネットワークは、この不要なサッケード出力を能動的にブレーキ（抑制制御）し、視線を動かさずに意識のビームのみを周辺部へ割り振る『潜在的注意の解離』を成立させます（Posner, 1980）。",
    "視覚的ズームレンズモデル（Eriksen & St. James）と機能的視野（FFOV）の伸縮：Eriksen & St. James（1986）が提唱した注意のズームレンズモデルによれば、人間の視覚的注意野はカメラのズームレンズのように、狭い高解像度の中心領域から広い低解像度の全視野領域まで連続的に調節可能です。極限の緊張状態に陥ると注意野は中心数度に狭窄（トンネルビジョン）しますが、本ドリルの反復訓練により、中心窩の運動追跡解像度を100%維持したまま、ズームレンズを視野外周まで常に広角開放しておく前頭葉の配分制御力が向上します（Wolfe, 1994; Leigh & Zee, 2015）。",
    "FPS索敵・高速球技・危機回避における実戦応用：現代の競技eスポーツ（VALORANT, Apex Legends, Overwatch等）において、超一流選手が画面中央の敵に正確なクロスヘアを置きながら、画面端のミニマップや視界の隅を横切る敵のわずかな影に即座に反応できるのは、この潜在的注意システムが極限まで研ぎ澄まされているためです。また、サッカーやバスケットボールにおけるノートレックパスや、自動車運転時における死角からの飛び出し察知など、あらゆる高速判断シーンにおいて生存率とパフォーマンスを決定づける中核基礎能力となります（Woods et al., 2015）。"
  ],
  benchmarks: {
    title: "周辺視野ピン検知・潜在的空間注意評価指標 (Peripheral Detection Benchmarks)",
    headers: ["習熟度クラス", "周辺ピン検知成功率", "平均検知反応時間 (Latency)", "中心視離脱サッケード率", "神経生理学的達成水準"],
    rows: [
      ["エリート (プロアスリート級)", "96% 以上", "220ms 未満", "2% 未満 (完全中心固定)", "卓越した潜在的注意制御。中心窩ロックを維持しながら視野全域の輝度過渡変化に即座に反応"],
      ["アドバンス (競技ゲーマー級)", "90% ～ 95%", "220 ～ 270ms", "2% ～ 5%", "極めて広い機能的視野。周辺ピンに対する反射サッケードがほぼ完全に抑制され、安定検知を維持"],
      ["コンピテント (一般健康成人)", "80% ～ 89%", "271 ～ 340ms", "6% ～ 12%", "健常成人の標準視野水準。画面端の遠隔ピンでわずかな見落としや散発的な視線迷いが発生"],
      ["デベロッピング (視野狭窄傾向)", "68% ～ 79%", "341 ～ 420ms", "13% ～ 22%", "注意の偏重が顕著。中心追従に脳リソースを奪われ、周辺ピンに対する検知遅延や視線飛びが多発"],
      ["ノービス (要トレーニング・疲労)", "68% 未満", "420ms 超", "22% 超", "重度のトンネルビジョン状態。周辺刺激に反射的に視線が引っ張られ、中心標的を見失いやすい"]
    ],
    note: "※測定数値は視距離50〜70cm、基本速度1.0x〜2.0xにおいて、60秒間の周辺ピン追従セッションを実施した解析データに基づきます。検知反応時間は周辺ピン出現からキー入力までの平均ミリ秒です。"
  },
  techniques: {
    title: "中心窩ロックと広域周辺視野検知を両立する4大テクニック",
    items: [
      {
        name: "中心窩アンカーの死守と反射サッケードの能動的抑制 (Foveal Anchor Defense)",
        desc: "周辺部に光が点滅した際、眼球を動かして確認しようとする本能的反射を大脳皮質で強力に抑え込みます。Findlay & Walker（1999）のモデルに基づき、視線は中心のオーブの中心核に釘付けにしたまま、手元のキー入力だけで応答します。",
        tips: "『光を見た瞬間に負け』と意識し、視線が周辺ピンへ1ピクセルも飛びつかないよう自己制御してください。"
      },
      {
        name: "注意のズームレンズ広角開放プロトコル (Zoom-Lens Field Dilation)",
        desc: "Eriksen & St. James（1986）のズームレンズ理論を活用し、意識のフォーカスを中央の点だけに絞り込まず、モニターの四隅の外枠まで均一に注意の膜を広げるイメージを持ちます。",
        tips: "画面の中央を『点』で見るのではなく、画面全体を『空間の膜』として知覚する感覚を養いましょう。"
      },
      {
        name: "網膜周辺部・杆体細胞のチラつき知覚信頼 (Rod Photoreceptor Transient Reliance)",
        desc: "網膜の周辺部には色や微細な文字を判別する錐体細胞は少ないですが、明暗の変化や動きに極めて敏感な杆体細胞が高密度に分布しています（Wolfe, 1994）。光の形を確認しようとせず、周辺視野のチラつきを検知した瞬間に反射入力します。",
        tips: "形や文字を読もうとするとサッケードが起きます。『白く光った』という感覚だけでボタンを押してください。"
      },
      {
        name: "呼吸調律による交感神経性視野狭窄の解除 (Autonomic Field Stabilization)",
        desc: "焦りや力みで息を止めると、交感神経が急激に興奮して機能的視野（FFOV）が物理的に狭まります。Leigh & Zee（2015）の知見に基づき、深い腹式呼吸を続けながらリラックスした覚醒状態を維持します。",
        tips: "肩の力を抜き、ゆっくりと息を吐き出しながらセッションに臨むと、視野の端が自然と明るく見えてきます。"
      }
    ]
  },
  steps: [
    "モニターから約50〜70cmの距離を取り、画面全体が左右視野角内に収まる姿勢を作ります。",
    "セッション時間（30秒〜120秒）と速度倍率（0.5x〜9.0x）を設定し、ドリルを開始します。",
    "中心で移動するターゲットを中心窩で滑らかにロックし続けます。",
    "視野の隅や外周部にパルスピンが点滅しても絶対に目を向けず、周辺視野で感知してキーを押します。",
    "セッション完了後、周辺ピン検知率と平均反応時間を分析し、段階的に難易度を上げます。"
  ],
  audience: "FPSでミニマップ確認や角待ち索敵力を高めたい競技プレイヤー、サッカー・バスケ等で周囲の状況把握を広げたいスポーツ選手、長時間の画面凝視によるトンネルビジョンを解消したいすべてのユーザー。",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('posner1980', 'eriksen1986', 'wolfe1994', 'findlay1999', 'leigh2015', 'woods2015'),
  related: [
    { href: "/ja/drills/visual-tracking/constant-slow-pursuit", label: "低速追従眼球運動トレーニング (Constant Slow)" },
    { href: "/ja/drills/visual-tracking/directional-chaos-pursuit", label: "カオス方向追従テスト (Directional Chaos)" },
    { href: "/ja/drills/visual-tracking/dynamic-evasion-pursuit", label: "リアクティブ追従訓練 (Dynamic Evasion)" },
    { href: "/ja/drills/visual-tracking/ghosting-suppress-pursuit", label: "残像抑制固視トレーニング (Ghosting Suppress)" },
    { href: "/ja/drills/visual-tracking/infinity-pursuit", label: "8の字眼球運動トレーニング (Infinity)" },
    { href: "/ja/drills/visual-tracking/momentum-teleport-pursuit", label: "テレポート追従エイムトレーニング (Momentum Teleport)" }
  ]
};

export default function JapanesePeripheralPingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PeripheralPingPursuitClient
        copy={{
          title: "周辺視野ピン追従トレーニング：中心視・周辺視の統合と潜在的空間注意",
          subtitle: "中心窩追従を維持したまま視野周辺パルスを検知する機能的視野（FFOV）拡大テスト",
          description: "中心標的を中心窩で滑らかに捉え続けながら、周辺視野に突発出現する光パルスピンをサッケード跳躍なしに瞬時に検知する二重課題アイトラッキング練習。Posnerパラダイムに基づく潜在的空間注意（Covert Attention）と機能的視野（FFOV）を拡大し、ゲーム索敵や動体認知を極限まで強化します。無料・ブラウザで即座に測定可能。"
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/peripheral-ping-pursuit" />
      </div>
    </>
  );
}
