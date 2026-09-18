import ChromaSyncClient from '@/app/drills/visual/reaction-speed/go/no-go/ChromaSyncClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Go/No-Goテスト: 反応抑制＆衝動制御測定 | SkillDrills",
  description: "緑のGo刺激に最速反応し、赤のNo-Go刺激を瞬間静止する無料ゴーノーゴー課題テスト。右下前頭皮質と視床下核の運動ブレーキ、衝動制御、トリガーディシプリンを測定。",
  keywords: [
    "ゴーノーゴー 課題",
    "Go/No-Go テスト",
    "反応抑制 テスト",
    "衝動制御 検査",
    "運動抑制 課題",
    "前頭前野 実行機能",
    "トリガーディシプリン",
    "ストップシグナル 課題",
    "SART 持続的注意反応検査",
    "コミッションエラー",
    "誤反応 抑制 訓練",
    "反射神経 抑制 トレーニング"
  ],
  openGraph: {
    title: "Go/No-Goテスト: 反応抑制＆衝動制御測定 | SkillDrills",
    description: "緑に反応し、赤で踏みとどまる！運動抑制力と前頭葉ブレーキを科学的に測定・強化するオンラインGo/No-Go課題。",
    type: 'article',
    url: 'https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Go/No-Goテスト: 反応抑制＆衝動制御測定 | SkillDrills",
    description: "衝動制御とFPSトリガーディシプリンを鍛える無料オンラインGo/No-Go神経認知テスト。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/go/no-go'),
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
    { "@type": "ListItem", "position": 5, "name": "Go/No-Go 衝動制御テスト", "item": "https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Go/No-Go 反応抑制測定テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
  "description": "右下前頭皮質(rIFC)と視床下核による運動ブレーキ機能、衝動制御、誤反応率をミリ秒単位で測定する神経認知検査ツール。",
  "featureList": [
    "performance.now() APIによるミリ秒(ms)精度の反応潜時計測",
    "難易度上昇に伴う提示時間の動的短縮（最短100ms）",
    "コミッションエラー（誤反応）とオミッションエラー（見落とし）の分離記録",
    "完全クライアントサイド実行によるローカルデータ保護"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Go/No-Go 反応抑制テスト | SkillDrills",
  "alternateName": "Go/No-Go Pro",
  "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go",
  "dateModified": "2026-09-05",
  "description": "無料オンラインGo/No-Go衝動制御テスト。緑のGo刺激に反応し、赤のNo-Go刺激でタップを抑制する反射制御トレーニング。",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応のモダンブラウザ。",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "反応抑制, 衝動制御, 運動ブレーキ, トリガーディシプリン, 実行機能"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Go/No-Go 反応抑制トレーニング",
  "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go",
  "description": "運動抑制力とトリガーディシプリンを高める神経認知アクションゲーム。",
  "genre": ["Action", "Brain Game", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Go/No-Go テストの実施手順",
  "dateModified": "2026-09-05",
  "description": "Go/No-Goプロトコルに従い、運動抑制と衝動制御を測定・強化する4つのステップ。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "中央レティクルに視線を固定",
      "text": "刺激ターゲットが出現するキャンバス中央の照準に視線を静かに合わせ、リラックスして構えます。",
      "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "緑のGo刺激が出たら最速タップ",
      "text": "エメラルドグリーンの円が出現したら、反射的に画面クリックまたはスペースバーを押します（+150点 × コンボ）。",
      "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "赤のNo-Go刺激が出たら指を静止",
      "text": "真紅の円が出現したら、動きかけた指を瞬時に静止させ、入力を完全に抑制します（+100点）。",
      "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "高速加速下でトリガーディシプリンを維持",
      "text": "コンボが伸びると提示時間が100msまで短縮されるため、最高峰の前頭葉ブレーキを発揮し続けます。",
      "url": "https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go#step-4"
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
      "name": "Go/No-Goテスト（ゴーノーゴー課題）とはどのような検査ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ゴーノーゴー課題は、頻繁に現れるGo刺激には素早く反応し、稀に出現するNo-Go刺激では準備された行動を急停止させる、認知心理学の代表的な反応抑制評価テストです。"
      }
    },
    {
      "@type": "Question",
      "name": "コミッションエラー（誤反応）とオミッションエラー（見落とし）の違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "コミッションエラー（Commission Error）は赤のNo-Go刺激を我慢できずに押してしまう「衝動抑制の失敗」であり、オミッションエラー（Omission Error）は緑のGo刺激を押し忘れる「持続的注意の途切れ」を表します。"
      }
    },
    {
      "@type": "Question",
      "name": "反応抑制の「競馬モデル（Horse-Race Model）」とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Loganら（1984）が提唱した理論で、運動を実行するGoプロセスと運動を止めるStopプロセスが脳内でレースのように競い合っており、Stopプロセスが先に閾値へ達した時だけ行動が抑止されます。"
      }
    },
    {
      "@type": "Question",
      "name": "赤だと分かっているのに、なぜ反射的に指が動いてクリックしてしまうのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "連続するGo刺激によって運動皮質が「先行活性化（Prepotent Priming）」されるためです。視覚野で色情報が判別される前に、輝度変化に反応して脊髄へ発射指令が先行してしまう生理的現象です。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲーム（VALORANT、CS2、レインボーシックス）における「トリガーディシプリン」との関係は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "画面の動きに反射的に射撃してしまうと、敵のスモーク抜けや味方のクロス展開で位置を露呈します。Go/No-Goトレーニングは、視覚検知と人差し指のトリガー引きを意識的に切り離す能力を養います。"
      }
    },
    {
      "@type": "Question",
      "name": "脳のどの部位がこの運動ブレーキ（抑制機能）をコントロールしていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "右下前頭皮質（rIFC）、前補足運動野（preSMA）、そして大脳基底核の視床下核（STN）を結ぶ「超直接路（Hyperdirect Pathway）」が緊急ブレーキとして運動指令を遮断します（Aron et al., 2014）。"
      }
    },
    {
      "@type": "Question",
      "name": "反応抑制能力や衝動制御力はトレーニングによって向上しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。神経可塑性の研究により、計画的な抑制トレーニングは前頭葉-基底核ネットワークを強化し、ストップシグナル反応時間（SSRT）を短縮させることが実証されています。"
      }
    },
    {
      "@type": "Question",
      "name": "ディスプレイのリフレッシュレートやマウスのポーリングレートはスコアに影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "極めて大きな影響を与えます。60Hzの画面では最大16.7msの表示遅延が発生しますが、240Hzでは4.1msに低減します。1,000Hzマウスと併用することで色判別の猶予が生まれ、誤反応が劇的に減ります。"
      }
    },
    {
      "@type": "Question",
      "name": "最高の運動抑制能力を発揮するための1日の推奨練習ルーチンは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1日1〜2回、1回3〜5分のセッションが推奨されます。長時間の連続プレイは前頭葉疲労を引き起こし、かえって誤反応率が増加します。"
      }
    },
    {
      "@type": "Question",
      "name": "テスト中に記録された反応時間や誤反応データは外部サーバーに送信されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ。すべてのスコアと詳細データはお使いのブラウザ内部（LocalStorage）にのみ安全に保持され、外部への通信は一切行われません。"
      }
    }
  ]
};

const goNoGoGuide = {
  heading: "神経認知反応抑制・運動ブレーキ標準ガイド",
  intro: [
    "反応抑制（Response Inhibition）とは、不適切または不利になった行動を瞬間的に取り消し、保留する人間の最重要実行機能です。格闘技、eスポーツ、高速運転など極限の現場では、単に速く動くこと以上に「誤った動作を踏みとどまる力」が勝敗を決定づけます。",
    "本テストの歴史は、1868年にオランダの生理学者フランシスカス・ドンデルス（Franciscus Cornelis Donders）が考案した精神時間測定法「C反応」に由来します。ドンデルスは二つの刺激のうち一方のみに反応する課題において、単純反応よりも付加的な選択・抑制時間が必要であることを示しました。",
    "1984年にはローガン（Logan）らが、行動発動のGoプロセスと抑制のStopプロセスが脳内で競合する「競馬モデル（Horse-Race Model）」を確立。近年のfMRI研究（Aron et al., 2014）により、このブレーキ指令が右下前頭皮質（rIFC）と視床下核（STN）を結ぶ超直接路で執行されることが解明されました。",
    "計測基準とハードウェア調整：刺激提示とクリック入力は、ブラウザ標準の超高精度 performance.now() API でリアルタイム測定されます。ディスプレイの垂直同期遅延やUSBポーリング遅延（Woods et al., 2015）を念頭に置きつつ、すべてのデータは端末ローカルに安全に保存されます。"
  ],
  benchmarks: {
    title: "反応抑制力・衝動制御ベンチマーク基準表",
    headers: ["評価ランク / 階級", "誤反応率 (CER)", "基準スコア & コンボ", "神経筋および前頭葉抑制プロファイル"],
    rows: [
      ["Tier 1: 神業 / プロ特級", "< 2.0% CER", "16,000点+ | コンボ 30回+", "完璧なrIFC-STN超高速ブレーキ；視覚の閃光と手指の収縮反射を完全に切り離す超人的制御。"],
      ["Tier 2: 上級抑制制御", "2.0% – 4.9% CER", "11,000 – 15,999点 | コンボ 20回+", "卓越したトリガーディシプリン；色の切り替わりにも惑わされず最小限の先読み誤差で静止。"],
      ["Tier 3: 成人標準水準", "5.0% – 9.9% CER", "6,500 – 10,999点 | コンボ 12回+", "信頼できるGoターゲット処理；高速テンポ化に伴い稀にNo-Goへの誤反応が混ざる一般基準。"],
      ["Tier 4: 軽度衝動性段階", "10.0% – 18.0% CER", "3,000 – 6,499点 | コンボ 6回+", "先行活性化の影響が強く、色の完全判別前に画面の変化に対して反射的に指が動いてしまう。"],
      ["Tier 5: 先行プライミング優勢 (基礎)", "> 18.0% CER", "< 3,000点 | コンボ < 6回", "顕著な行動衝動性；赤のNo-Goが出現しても加速したタップ運動を止めることが困難。"]
    ],
    note: "本基準値は反応抑制および精神時間測定の文献（Donders, 1868; Logan et al., 1984; Robertson et al., 1997; Aron et al., 2014）に基づく指標です。覚醒度、カフェイン摂取、画面環境により変動します。"
  },
  techniques: {
    title: "衝動制御・運動抑制力を高める実践メソッド",
    items: [
      {
        name: "運動発動前の色彩確認プロセス",
        desc: "輝度や動きの過渡信号は、色彩を詳細に処理するV4野よりも早く視覚野へ届きます（Donders, 1868）。",
        tips: "画面が点滅した瞬間に指を動かさず、エメラルドグリーンが網膜で確定する極小の刹那を待ってからタップします。"
      },
      {
        name: "競馬モデルに基づく抑制リセット",
        desc: "Goプロセスの活動電位が閾値に達する前にStop信号が届けば、脊髄で筋収縮が防がれます（Logan et al., 1984）。",
        tips: "マウス上で指を突っ張らず、軽く浮かせてニュートラルを保ちます。屈筋の無駄な緊張を解くことがブレーキの成功率を上げます。"
      },
      {
        name: "自動化リズムの意図的打破",
        desc: "連続するGo刺激により脳が無意識の一定テンポで叩くオートパイロット状態に陥り、誤反応が跳ね上がります（Robertson et al., 1997）。",
        tips: "各試行を完全に独立した新規の視覚イベントとして扱い、刺激と刺激の間は中央のレティクルに深く集中します。"
      },
      {
        name: "高リフレッシュレートによる遅延排除",
        desc: "160msの短い提示ウィンドウでは、60Hz画面の16.7msの遅延が致命的な誤反応を誘発します（Woods et al., 2015）。",
        tips: "144Hz〜240Hzの高リフレッシュレートモニターと1,000Hzポーリングレートのマウスを使用し、物理的遅延を削ぎ落とします。"
      }
    ]
  },
  steps: [
    "「ドリル開始」をクリックして45秒のGo/No-Goセッションを起動します。",
    "刺激ディスクが出現する画面中央の照準に視線を集中させます。",
    "緑のGoディスクが出たら即座にクリックし、ポイントとコンボを獲得します。",
    "赤のNo-Goディスクが出たら指を完全に静止させ、自制ポイントを獲得します。",
    "セッション終了後、誤反応率、平均反応速度、評価ランクを確認します。"
  ],
  audience: "VALORANTやCS2などのタクティカルFPSプレイヤー、格闘ゲーム競技者、モータースポーツ選手、衝動制御や前頭前野の実行機能を高めたいすべての方。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'logan1984', 'robertson1997', 'aron2014', 'woods2015'),
  related: [
    { href: "/ja/drills/visual/reaction-speed/light-reaction", label: "閃光反応速度テスト" },
    { href: "/ja/drills/visual/depth-perception/distance-judgment", label: "三桿法 深視力・距離判定検査" },
    { href: "/ja/drills/visual/tracking-accuracy/moving-target", label: "移動標的迎撃テスト" },
    { href: "/ja/drills/visual/tracking-accuracy/multiple-targets", label: "複数目標追跡 (MOT) 検査" },
    { href: "/ja/drills/visual/tracking-accuracy/pursuit-tracker", label: "滑動性眼球運動トラッカー" },
    { href: "/ja/drills/visual/visual-recognition/entropic-grid", label: "エントロピーグリッド探索テスト" }
  ]
};

export default function ChromaSyncPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <ChromaSyncClient copy={{ title: "Go/No-Go 反応抑制＆衝動制御測定" }} />
      <DrillGuide guide={goNoGoGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ja/drills/visual/reaction-speed/go/no-go" />
      </div>
    </>
  );
}
