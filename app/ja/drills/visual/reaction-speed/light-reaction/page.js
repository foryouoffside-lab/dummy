import StrobeLatencyClient from '@/app/drills/visual/reaction-speed/light-reaction/StrobeLatencyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "光反応テスト: 視覚反射速度＆ミリ秒潜時計測 | SkillDrills",
  description: "白の閃光刺激に対する単純視覚反応時間（SRT）をミリ秒単位で高精度計測。網膜の光電変換から運動皮質までの伝達潜時を測る無料テスト。登録不要。",
  keywords: [
    "光 反応 テスト",
    "光反応測定",
    "視覚 反応速度 テスト",
    "反射神経 テスト",
    "単純反応時間 SRT",
    "ミリ秒 反応速度",
    "ピエロンの法則 反応時間",
    "光学 反射 テスト",
    "網膜 光電変換 伝達速度",
    "FPS 反射神経 トレーニング",
    "視覚 反射 ドリル",
    "オンライン 反応速度 測定"
  ],
  openGraph: {
    title: "光反応テスト: 視覚反射速度＆ミリ秒潜時計測 | SkillDrills",
    description: "白の光刺激に対する単純反応時間（SRT）をミリ秒（ms）単位で精確に測定する無料オンライン反射神経テスト。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "光反応テスト: 視覚反射速度＆ミリ秒潜時計測 | SkillDrills",
    description: "光刺激への単純視覚反応時間をミリ秒単位で計測・訓練する無料オンライントレーニング。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/light-reaction'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "ドリル一覧", "item": "https://skilldrills.online/ja/drills" },
    { "@type": "ListItem", "position": 3, "name": "ビジョントレーニング", "item": "https://skilldrills.online/ja/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "反応速度", "item": "https://skilldrills.online/ja/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "光反応テスト", "item": "https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "光反応テスト (視覚反射速度測定)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
  "description": "光の閃光刺激に対する単純視覚反応時間（SRT）および神経筋伝達潜時をミリ秒単位で計測する高精度神経認知ツール。",
  "featureList": [
    "performance.now() APIによるミリ秒(ms)精度の光学潜時計測",
    "300ms〜2,500msのランダム遅延による予測撃ちの完全排除",
    "不正連打（スパムクリック）検知による真正反射測定システム",
    "完全クライアントサイド実行によるローカルデータ保護"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "光反応テスト — 視覚反射速度測定 | SkillDrills",
  "alternateName": "Light Reaction Pro",
  "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction",
  "dateModified": "2026-09-05",
  "description": "無料オンライン視覚反射テスト。画面中央の白い閃光に最速で反応してクリックし、ミリ秒単位で反射神経を測定します。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応のモダンブラウザ。",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "単純視覚反応時間, 光学運動潜時, 神経筋反射速度, ピエロンの法則, 視覚的注意配分"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "光反応反射ドリル",
  "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction",
  "description": "光の閃光刺激に対する瞬間的な反応速度と反射神経を極限まで高めるオンライントレーニング。",
  "genre": ["Action", "Reaction Speed", "Reflex Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "光反応テストの実施手順",
  "dateModified": "2026-09-05",
  "description": "ストロボ光刺激プロトコルを通じて視覚反応時間と神経筋潜時を測定する4つのステップ。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "中央ターゲットに視線を固定",
      "text": "画面中央の暗い円形ターゲットに視線を静かに合わせ、不要な筋肉の緊張を緩めます。",
      "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "不規則な白の光点滅を待機",
      "text": "300msから2,500msのランダムな間隔の間、ヤマ勘でクリックせず高い集中力を維持します。",
      "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "白く光った瞬間最速でクリック",
      "text": "ターゲットが真っ白に閃光した刹那、画面をクリックまたはスペースバーを押します（+150点 × コンボ × レベル）。",
      "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "連打・予測タップを避ける",
      "text": "光る前にタップすると1.2秒のクールダウンが発生するため、真の神経反射で入力します。",
      "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "光反応テストとはどのような検査ですか？何が測定されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "光反応テストは単純視覚反応時間（Simple Reaction Time, SRT）を測定する高精度な心理物理学的評価プロトコルです。画面中央の視覚ターゲットが白く点滅した瞬間から指の運動が開始されるまでのミリ秒（ms）潜時を精確に計測します。"
      }
    },
    {
      "@type": "Question",
      "name": "成人の平均的な視覚反応速度は何ミリ秒ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "健康な若年成人の単純視覚反応時間は通常200ms〜250msの範囲です。訓練されたプロゲーマーや短距離走選手、格闘家は160ms〜190ms前後の驚異的な反応速度を記録します。"
      }
    },
    {
      "@type": "Question",
      "name": "光を見てからクリックするまでに体内ではどのような生理反応が起きていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "視覚反応は4つの段階を経ます：(1) 網膜ロドプシンによる光電変換（約20〜40ms）、(2) 視神経および外側膝状体を経由した視覚野V1への伝達（約30〜50ms）、(3) 頭頂葉および運動皮質における知覚と運動計画（約50〜80ms）、(4) 錐体路を通じた指の屈筋への運動指令伝達（約30〜50ms）。"
      }
    },
    {
      "@type": "Question",
      "name": "ピエロンの法則（Piéron's Law）とは何ですか？明るさは反応にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "刺激の輝度が高くなるほど、反応潜時が双曲線関数的に短縮するという精神物理学の法則です。暗い背景に対して純白のストロボ光を提示することで、網膜神経節細胞の脱分極速度が最大化され、感覚遅延が極小化されます。"
      }
    },
    {
      "@type": "Question",
      "name": "音に対する反応の方が光に対する反応よりも速いのはなぜですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "聴覚の反応速度は視覚よりも約30〜50ms速い（聴覚140〜160ms vs 視覚200〜250ms）です。蝸牛の有毛細胞による機械的変換はわずか1〜3msで完了するのに対し、網膜の光化学的変換には20〜40msを要するためです。"
      }
    },
    {
      "@type": "Question",
      "name": "単純視覚反応時間はトレーニングによって短縮できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。神経可塑性研究によると、計画的な反復トレーニングは皮質脊髄路の興奮性を高め、空間的注意定位を最適化することで大脳での運動計画時間を大幅に圧縮します（Dye et al., 2009）。"
      }
    },
    {
      "@type": "Question",
      "name": "ディスプレイのリフレッシュレート（60Hz、144Hz、240Hz）はスコアに影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "直接的な影響があります。60Hz画面では最大16.7msのフレーム遅延が生じますが、240Hzでは4.1msに削減されます。1,000Hzマウスと組み合わせることで物理的なハードウェア遅延を極小化できます。"
      }
    },
    {
      "@type": "Question",
      "name": "光が出る前にクリックするとクールダウンが発生するのはなぜですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "点滅前のフライングや秒間3回以上の不正連打はアンチスパム機構により検出されます。1.2秒間の点滅停止ペナルティを課すことで、ヤマ勘を排除し純粋な神経反射のみを記録します。"
      }
    },
    {
      "@type": "Question",
      "name": "睡眠不足、カフェイン、疲労はミリ秒反応潜時にどう影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "睡眠不足や脳疲労は前頭葉の覚醒度を下げ、反応時間を30〜80ms悪化させます。適量のカフェイン（100〜200mg）はアデノシン受容体を遮断し、反応時間を一時的に10〜20ms改善します。"
      }
    },
    {
      "@type": "Question",
      "name": "このテストは無料ですか？記録データは安全に保護されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。SkillDrillsの光反応テストは登録や課金なしで100%無料です。測定された反応時間やスコアはお使いのブラウザ（LocalStorage）にのみ安全に保存され、外部に送信されることはありません。"
      }
    }
  ]
};

const lightReactionGuide = {
  heading: "視覚反射時間測定学および単純反応時間（SRT）標準ガイド",
  intro: [
    "単純視覚反応時間（Simple Reaction Time, SRT）は、単一の光刺激が突発的に出現した瞬間から無条件の運動が開始されるまでの基礎精神運動潜時を表します。陸上短距離走のスタート、モータースポーツ、格闘技、そしてハイテンポなFPS eスポーツでは、わずか数ミリ秒の反射速度の差が勝敗を分けます。",
    "光刺激に対する神経筋の連鎖反応は4つの明確な生理学的段階を経由します：(1) 網膜ロドプシンの光異性化による光電変換（約20〜40 ms）、(2) 外側膝状体（LGN）を経た一次視覚野V1への求心性信号伝達（約30〜50 ms）、(3) 後頭頂葉および補足運動野での知覚と運動計画策定（約50〜80 ms）、(4) 錐体路（Pyramidal tract）を下行して手指屈筋を収縮させる遠心性指令伝達（約30〜50 ms）。これらを合算した健常成人の自然な基準域は約200〜250 msとなります（Kosinski, 2008; Jain et al., 2015; Shelton & Kumar, 2010）。",
    "ピエロンの法則（Piéron, 1952; Pins & Bonnet, 1996）によれば、刺激輝度が背景コントラストに対して高まるほど、反応潜時は双曲線関数的に短縮します。本ドリルは暗黒のキャンバスに超高コントラストな純白ストロボを照射し、網膜神経節細胞の脱分極速度を極限まで高めて感覚伝達遅延を最小化するよう設計されています。また、ポスナー（Posner, 1980）の潜在的注意定位理論やバベリア（Dye et al., 2009）のアクションゲーム研究は、意図的な集中訓練により大脳運動計画時間をさらに圧縮できることを示しています。",
    "計測基準とハードウェア調整：刺激提示と入力検知は、ブラウザ標準の超高精度 performance.now() API によってミリ秒単位で厳密に記録されます。垂直同期遅延やUSBポーリング間隔（Woods et al., 2015）を念頭に置きつつ、すべてのデータは端末ローカルに安全に保存されます。"
  ],
  benchmarks: {
    title: "単純視覚反応時間（SRT）パフォーマンス評価基準（科学的ミリ秒基準）",
    headers: ["習熟度ティア", "平均反応潜時 (ms)", "到達スコア・コンボ基準", "神経筋伝達・生理学的反射特性"],
    rows: [
      ["ティア1：神速・超覚醒反射 (Apex Neural)", "< 180 ms", "15,000点以上 | コンボ 28x+", "極限の運動皮質興奮性と最適化された錐体路伝導。トッププロゲーマーや五輪スプリンターに見られる最高峰の神経伝達水準。"],
      ["ティア2：上位・卓越視覚反射 (Superior Reflex)", "180 – 219 ms", "10,500 – 14,999点 | コンボ 18x+", "素早い光運動連関。220msを切る高精度な反応速度を長時間維持可能で、瞬発的判断力に優れたアスリートレベル。"],
      ["ティア3：標準・健常成人の基準 (Solid Baseline)", "220 – 259 ms", "6,000 – 10,499点 | コンボ 10x+", "健康な若年成人の標準的反応速度。一般的な神経伝達速度を持ち、疲労度によって軽微なばらつきが生じる基準値。"],
      ["ティア4：中度遅延・注意力低下 (Moderate Latency)", "260 – 319 ms", "2,500 – 5,999点 | コンボ 5x+", "感覚・運動の情報処理に遅れが生じている状態。ディスプレイ遅延、眼精疲労、集中力低下の影響を受けやすい段階。"],
      ["ティア5：未熟練・基礎段階 (Developing)", "> 320 ms", "< 2,500点 | コンボ < 5x", "大幅な感覚遅延。60Hz画面の表示遅れ、著しい身体疲労、または不適切な入力機器環境が疑われるレベル。"]
    ],
    note: "本基準値は精神時間測定学および視覚反応の精神物理学文献（Kosinski, 2008; Woods et al., 2015; Pins & Bonnet, 1996; Jain et al., 2015）に基づく指標です。覚醒度、カフェイン摂取、画面環境により変動します。"
  },
  techniques: {
    title: "視覚反射速度を極限まで高める実践テクニック",
    items: [
      {
        name: "中心窩の事前活性化と視線固定",
        desc: "中心窩（Fovea）をターゲット中心に完全に固定することで、視覚的注意移動に伴う20〜30msの遅延を削ぎ落とします（Posner, 1980）。",
        tips: "中央の暗い円形に視線を集中させ、待機中にHUDのタイマーやスコアへ視線を泳がせないようにしてください。"
      },
      {
        name: "ピエロン効果を活かしたコントラスト最適化",
        desc: "最大限の輝度コントラストは網膜神経節細胞の発火頻度を高め、感覚伝達時間を最短化します（Pins & Bonnet, 1996）。",
        tips: "部屋の照明を少し落とし、瞳孔を適度に開かせることで白ストロボのコントラスト刺激を最大限に受容します。"
      },
      {
        name: "指先の等尺性プレテンション保持",
        desc: "指が空中に浮いているとキーストロークやデバウンスにより不要な物理遅延が生じます（Woods et al., 2015）。",
        tips: "指先をマウスボタンやタッチ画面に軽く触れさせた状態を保ち、無駄なストロークなしに筋肉を即座に収縮させます。"
      },
      {
        name: "高リフレッシュレート環境による遅延排除",
        desc: "60Hz画面は最大16.7msの表示遅延を生みますが、240Hz画面はこれを4.1msまで圧縮します（Woods et al., 2015）。",
        tips: "144Hz〜240Hzの高リフレッシュレートモニターと1,000Hzポーリングレートのマウスを使用し、本物の反射神経を計測します。"
      }
    ]
  },
  steps: [
    "「ドリル開始」をクリックして45秒の光反応セッションを起動します。",
    "キャンバス中央の暗い円形ターゲットに視線を集中させます。",
    "300ms〜2,500msの不規則な待機時間中、ヤマ勘で押さずに待ちます。",
    "ターゲットが真っ白に点滅した瞬間、即座に画面をクリックします（+150点 × 倍率）。",
    "終了後に平均反応時間、到達最高レベル、総合評価ランクを確認します。"
  ],
  audience: "FPSなどのeスポーツ競技者、陸上短距離選手、格闘家、レーサー、パイロット、そして視覚運動反射の限界に挑むすべての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'pins1996', 'posner1980', 'jain2015', 'dye2009'),
  related: [
    { href: "/ja/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go 衝動制御テスト" },
    { href: "/ja/drills/visual/depth-perception/distance-judgment", label: "三桿法 深視力・距離判定検査" },
    { href: "/ja/drills/visual/tracking-accuracy/moving-target", label: "移動標的迎撃テスト" },
    { href: "/ja/drills/visual/tracking-accuracy/multiple-targets", label: "複数目標追跡 (MOT) 検査" },
    { href: "/ja/drills/visual/tracking-accuracy/pursuit-tracker", label: "滑動性眼球運動トラッカー" },
    { href: "/ja/drills/visual/visual-recognition/entropic-grid", label: "エントロピーグリッド探索テスト" }
  ]
};

export default function StrobeLatencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <StrobeLatencyClient copy={{ title: "光反応テスト: 視覚反射速度＆ミリ秒潜時計測" }} />
      <DrillGuide guide={lightReactionGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ja/drills/visual/reaction-speed/light-reaction" />
      </div>
    </>
  );
}
