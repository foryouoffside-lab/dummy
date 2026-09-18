import TargetPrioritizationClient from '@/app/drills/fps/target-prioritization/TargetPrioritizationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "ターゲット優先度 エイム練習 – 脅威度判定トレーナー | SkillDrills",
  description: "ブラウザで無料プレイできるターゲット優先度エイム練習。マルチターゲット交戦における脅威評価、注意フィルタリング、味方誤射の抑制制御（Go/No-Go）を科学的に鍛えます。",
  keywords: [
    "ターゲット優先度 エイム",
    "ターゲット優先度 エイム練習",
    "脅威判定 練習",
    "FPS 識別射撃",
    "VALORANT ターゲット選択",
    "CS2 優先順位 エイム",
    "射撃抑制 トレーニング",
    "誤射防止 エイム練習",
    "敵味方 識別 エイム",
    "エイムトレーナー 無料",
    "FPS ターゲット優先度",
    "索敵 射撃判断 練習"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/fps/target-prioritization",
    languages: getAlternateLanguages('/drills/fps/target-prioritization'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ターゲット優先度 エイム練習 – 脅威度判定トレーナー | SkillDrills",
    description: "マルチターゲット交戦での脅威評価スピード、視覚的注意フィルタリング、射撃抑制制御を鍛える無料ブラウザFPSエイムトレーナー。",
    url: "https://skilldrills.online/ja/drills/fps/target-prioritization",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ターゲット優先度 エイム練習 – 脅威度判定トレーナー | SkillDrills",
    description: "マルチターゲット交戦での脅威評価スピード、視覚的注意フィルタリング、射撃抑制制御を鍛える無料ブラウザFPSエイムトレーナー。",
  },
};

export default function TargetPrioritizationJaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "FPSエイム練習", "item": "https://skilldrills.online/ja/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "ターゲット優先度", "item": "https://skilldrills.online/ja/drills/fps/target-prioritization" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ターゲット優先度 エイム練習",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "乱戦時の脅威評価スピード、味方誤射の抑制、優先ターゲット選択能力を高める無料ブラウザFPSエイムトレーナー。",
    "genre": "FPS Training / Target Prioritization",
    "url": "https://skilldrills.online/ja/drills/fps/target-prioritization",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ターゲット優先度 エイム練習",
    "url": "https://skilldrills.online/ja/drills/fps/target-prioritization",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "乱戦時の脅威評価スピード、味方誤射の抑制、優先ターゲット選択能力を高める無料ブラウザFPSエイムトレーナー。"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "ターゲット優先度 エイム練習",
    "url": "https://skilldrills.online/ja/drills/fps/target-prioritization",
    "description": "乱戦時の脅威評価スピード、味方誤射の抑制、優先ターゲット選択能力を高める無料ブラウザFPSエイムトレーナー。",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Target Prioritization"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "競技FPSにおける「ターゲット優先度（Target Prioritization）」とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ターゲット優先度とは、画面上に複数の敵やオブジェクトが同時に出現した際、緊急度・危険度・役割を瞬時に評価し、最も高い脅威から順に射撃目標を選択する認知的判断プロセスです。"
        }
      },
      {
        "@type": "Question",
        "name": "集団戦でパニック射撃を起こして誤った目標を撃ってしまうのはなぜですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "視覚的過負荷と交戦ストレスにより、前頭前野の抑制制御機能が低下するためです。認知訓練を行っていないプレイヤーは、最も危険な敵ではなく、視野内で最も近くまたは大きく動いたオブジェクトに無意識に反応してしまいます。"
        }
      },
      {
        "@type": "Question",
        "name": "戦術シューターにおける「Go/No-Go」認知パラダイムとは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Go/No-Go課題とは、特定の刺激（敵）に対しては迅速に行動を起こし（Go）、別の刺激（味方やデコイ）に対しては射撃衝動を即座に停止する（No-Go）神経心理学的テストです。実戦での誤射防止と冷静なターゲット選択の基礎となります。"
        }
      },
      {
        "@type": "Question",
        "name": "FPSにおける停止信号反応時間（SSRT: Stop-Signal Reaction Time）とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SSRTとは、すでに準備または開始された運動動作（マウスクリックなど）を途中でキャンセルするのに要する潜時です。Logan & Cowan（1984）のレースモデルに基づき、SSRTが短いプレイヤーほど直前の状況変化に応じて射撃を瞬時にキャンセルできます。"
        }
      },
      {
        "@type": "Question",
        "name": "プロ選手はサイトラッシュ時に複数の敵の脅威度をどのようにランク付けしていますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "プロ選手は①自分にクロスヘアを向けている敵、②射撃中の敵や近接オフェンス役、③スキル発動中のサポート役、の順で瞬時にトリアージ（優先度判定）を行い、被弾リスクを最小化しながら撃破を進めます。"
        }
      },
      {
        "@type": "Question",
        "name": "認知視覚科学における「妨害刺激抑制（Distractor Suppression）」とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "注意を必要としないデコイや味方、環境エフェクトなどの非脅威視覚シグナルを脳内でアクティブに抑制・無視するメカニズムです。これにより限られた注意リソースを致命的脅威だけに集中させられます。"
        }
      },
      {
        "@type": "Question",
        "name": "VALORANTやCS2で味方やデコイを誤射するとラウンド勝率にどう影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "誤射は弾薬と時間を浪費するだけでなく、リコイルや次弾ディレイを発生させて真の脅威に対する反撃チャンスを失わせ、1vXシチュエーションでのラウンド勝率を致命的に低下させます。"
        }
      },
      {
        "@type": "Question",
        "name": "マウス感度はターゲット選択と脅威切り替えにどう影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "極端に高すぎる感度は微細なフリック停止と抑制ブレーキを困難にし、低すぎる感度は遠くの優先目標へのフリックを遅らせます。自身が正確にフリックをピタリと停止できる適正感度を見つけることが重要です。"
        }
      },
      {
        "@type": "Question",
        "name": "アドレナリンの高まりは戦術的判断スピードをなぜ低下させるのですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "過剰な覚醒状態は「トンネルビジョン（視野狭窄）」を引き起こし、視野周辺の状況把握や多角的判断を司る前頭葉機能を阻害するため、衝動的なパニック射撃を誘発します。"
        }
      },
      {
        "@type": "Question",
        "name": "ターゲット優先度ドリルはどのくらいの頻度で練習すべきですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "週に4〜5回、各セッション10〜15分間の集中訓練が理想的です。短時間の高負荷認知ドリルを継続することで、実戦の極度のプレッシャー下でも自動化された脅威トリアージを実行できるようになります。"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "ターゲット優先度と脅威度判定の練習ステップ",
    "description": "迅速な脅威判定、妨害刺激抑制、射撃衝動コントロールを習得するための4段階トレーニング手順。",
        "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "入力センシビリティの統一",
        "text": "セッション設定で普段のゲーム内感度とDPIを一致させ、1:1のマッスルメモリーを確保します。",
        "url": "https://skilldrills.online/ja/drills/fps/target-prioritization#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "最優先の赤（高脅威）ターゲットの瞬時特定",
        "text": "出現エリア全体を見渡し、制限時間内に赤ターゲットを捉えて最優先でフリック撃破します。",
        "url": "https://skilldrills.online/ja/drills/fps/target-prioritization#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "中脅威（黄）ターゲットへの切り替え",
        "text": "高脅威の赤を排除した直後、赤へ昇格する前に黄ターゲットへ素早くエイムをシフトして処理します。",
        "url": "https://skilldrills.online/ja/drills/fps/target-prioritization#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "味方（緑）ユニットへの射撃抑制",
        "text": "緑の味方ユニットに対しては運動抑制を働かせて射撃を完全にホールドし、コンボとタイマーを守ります。",
        "url": "https://skilldrills.online/ja/drills/fps/target-prioritization#step-4"
      }
    ]
  };

  const targetPrioritizationGuide = {
    heading: "ターゲット優先度 エイム練習 実践マニュアル",
    subtitle: "乱戦時の脅威評価スピード、妨害刺激抑制、そして冷静な射撃抑制制御を科学的プロトコルで極限まで高める",
    intro: [
      "ターゲット優先度（Target Prioritization）は、複数の敵やオブジェクトが入り乱れるFPSの集団戦において、どの脅威を最優先で撃破し、どの目標への射撃を抑制すべきかを瞬時に判断する認知的意思決定スキルです。VALORANTやCS2などのタクティカルFPSでは、視界に入った敵をただ撃つだけでは不十分であり、真の脅威を見極める冷静さが勝敗を分けます。",
      "Anne TreismanとGarry Gelade（1980）の特徴統合理論、およびMichael I. Posner（1990）の注意ネットワーク理論が示す通り、人間の視覚システムは空間的位置の把握と特徴の選別を異なる神経回路で行います。さらにGordon D. Logan & Philip E. Cowan（1984）のレースモデルによれば、射撃行動の開始プロセスと停止プロセス（Go/No-Go）は脳内で互いに競合しています。",
      "本ドリルでは、即座に排除すべき「高脅威（赤）」、時間経過で危険化する「中脅威（黄）」、そして絶対に撃ってはならない「味方（緑）」が混在する環境をシミュレート。F.C. Donders（1969）の選択反応時間論に基づき、視覚的判断と運動抑制の神経経路を徹底的に反復強化します。",
      "計測精度について：本ドリルはブラウザの performance.now() 高分解能タイマーを用い、端末内で完結してミリ秒単位で処理されます。ディスプレイの表示更新周期（60Hz/144Hz/240Hz）による物理的表示差が生じるため、5ms未満の微小な誤差はハードウェア測定ノイズとして考慮してください。"
    ],
    benchmarks: {
      title: "ターゲット優先度・脅威評価レイテンシ ベンチマーク基準",
      headers: ["スキル帯", "脅威評価反応時間", "抑制成功率（No-Go）", "実戦における競技的影響"],
      rows: [
        ["Tier 1（プロ・レディアント級）", "280 ms 未満", "98% – 100%", "瞬時かつ完璧な脅威トリアージ；味方誤射ゼロで複数敵ラッシュを単独制圧"],
        ["Tier 2（イモータル・マスター級）", "280 – 340 ms", "92% – 98%", "優れた判断力；混戦でも高脅威敵へ迷わず初弾を叩き込む"],
        ["Tier 3（ダイヤ・アセンダント級）", "340 – 420 ms", "85% – 92%", "堅実なターゲット選択；高密度な交戦時に50ms前後の判断躊躇が生じる"],
        ["Tier 4（ゴールド・プラチナ級）", "420 – 520 ms", "75% – 85%", "直近の敵に視線が引きずられ、奥の高脅威敵を放置して反撃を受ける傾向"],
        ["Tier 5（シルバー以下ビギナー）", "520 ms 以上", "75% 未満", "パニック射撃の頻発；味方やデコイへの無駄撃ちによるデスが多い"]
      ],
      note: "脅威評価反応時間は刺激出現から正しい高脅威目標への射撃入力までの所要時間を示します（Woods et al., 2015）。"
    },
    techniques: {
      title: "ターゲット優先度を高めるための科学的実践テクニック",
      items: [
        {
          name: "Go/No-Go 射撃抑制の神経回路強化",
          desc: "敵と味方の色識別を反射的に行い、緑ユニットを捉えた瞬間に人差し指のトリガー運動を急停止させるブレーキ制御を体得します（Logan & Cowan, 1984）。",
          tips: "緑ユニットが見えたら無理にフリックせず、照準を通過させるだけでクリックしない訓練を繰り返します。"
        },
        {
          name: "視野全体の脅威トリアージ（優先度選別）",
          desc: "視界内の目標を単一で追わず、赤（緊急）→黄（準緊急）の順序を無意識に構築する前注意フィルタを活用します（Treisman & Gelade, 1980）。",
          tips: "赤ターゲットが残っている間は、どんなに近くに黄や緑があっても赤以外にクロスヘアを動かさない規律を保ちます。"
        },
        {
          name: "妨害刺激（デコイ・味方）のアクティブ抑制",
          desc: "視覚的ノイズを脳内で能動的に無視するフィルタリング能力を高め、注意リソースの浪費を防ぎます（Posner, 1990）。",
          tips: "味方や無害なオブジェクトの動きに視線が引っ張られそうになったら、深呼吸して中央視野の焦点を保ちます。"
        },
        {
          name: "終末制動と素早いターゲット移行",
          desc: "赤ターゲット撃破後、マウスパッドの摩擦を活用して余計なオーバーシュートなく次の黄色目標へ鋭くフリックします。",
          tips: "撃破の手応えと同時に次の目標座標へ跳躍眼球運動（サッカード）を先行させます。"
        }
      ]
    },
    steps: [
      "感度設定を確認し、ポインターロックを有効化してドリルを開始します。",
      "出現するターゲット群の中から、最優先の「赤（高脅威）」を瞬時に見つけ出します。",
      "赤ターゲットを素早くフリック射撃して+100点（時間+0.4秒）を獲得します。",
      "続いて「黄（中脅威）」を処理し、赤への昇格を防ぎます。",
      "「緑（味方）」への射撃は絶対に控え、高い命中率とコンボ倍率を維持しましょう。"
    ],
    audience: "VALORANT、CS2、Apex Legends、Overwatch 2などで、集団戦の混乱下でも冷静に優先ターゲットを識別・撃破したいすべての競技FPSプレイヤー。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'posner1990', 'green2003', 'donders1969', 'treisman1980', 'logan1984'),
    related: [
      { href: "/ja/drills/fps/target-acquisition", label: "ターゲット捕捉 エイム練習" },
      { href: "/ja/drills/fps/target-switching-swarm", label: "ターゲット スイッチング エイム練習" },
      { href: "/ja/drills/fps/vertical-air-track", label: "垂直エイム トラッキング練習" },
      { href: "/ja/drills/fps/strafe-tracking", label: "ストレイフ トラッキング練習" },
      { href: "/ja/drills/fps/flick-shot-training", label: "フリックショット エイム練習" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <TargetPrioritizationClient
        copy={{
          h1Keyword: "ターゲット優先度 エイム練習",
          h1Suffix: " - 脅威度判定・射撃抑制エイムトレーナー",
          statScore: "スコア",
          statTime: "残り時間",
          statAccuracy: "命中率",
          statBestScore: "自己ベスト",
          statThreatsCleared: "撃破脅威数",
          statMaxCombo: "最大コンボ",
          statPeakLevel: "最高レベル",
          startTitle: "ターゲット優先度",
          startSubtitle: "脅威評価 & 認知フィルタリング • エンドレス難易度進行",
          getReady: "準備完了",
          toggleFlash: "ミスフラッシュ切替",
          toggleSound: "効果音切替",
          pausedTitle: "一時停止中",
          pausedSubtitle: "クリックして再開 — カーソルロックが再適用されます",
          stageCaption: "最優先の赤ターゲットを即座に撃破し、次に黄ターゲットを排除。味方（緑）への誤射は厳禁です。",
          rulesTitle: "ドリル手順 & スコアリングシステム",
          rulesItems: [
            { num: "1", text: "高脅威ターゲット", highlight: "赤 (+100点 / +0.4秒)", result: "最優先で即座に撃破必須" },
            { num: "2", text: "中脅威ターゲット", highlight: "黄 (+50点 / +0.4秒)", result: "時間経過で赤（高脅威）へ昇格" },
            { num: "3", text: "味方ユニット", highlight: "緑 (射撃厳禁)", result: "誤射・ミスでコンボリセット" },
            { num: "4", text: "レベル進行", highlight: "1,400点ごとに+1レベル", result: "ターゲット密度と速度がシームレスに上昇" }
          ],
          aboutTitle: "ターゲット優先度 エイム練習について",
          aboutHeading: "ターゲット優先度（Target Prioritization）とは？",
          aboutText: "ターゲット優先度とは、視界内の複数の目標から脅威度や役割に基づいて瞬時に撃つべき敵を選択し、同時に味方や不要なオブジェクトへの射撃を抑制する高度な認知運動能力です。開始した運動を途中で止める抑制制御は独自のレースモデル（Logan & Cowan, 1984）に基づき、射撃を実行すること以上に精密な神経制御が求められます。"
        }}
      />
      <DrillGuide guide={targetPrioritizationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-prioritization"
          locale="ja"
        />
      </div>
    </>
  );
}
