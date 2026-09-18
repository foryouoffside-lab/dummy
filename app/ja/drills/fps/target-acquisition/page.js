import TargetAcquisitionClient from '@/app/drills/fps/target-acquisition/TargetAcquisitionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "ターゲット捕捉 エイム練習 – 初弾精度トレーナー | SkillDrills",
  description: "ブラウザで無料プレイできるターゲット捕捉エイム練習。視覚的な敵識別スピード、脅威判別、プレッシャー下での初弾フリック精度を科学的に強化します。",
  keywords: [
    "ターゲット捕捉 エイム",
    "初弾 エイム 練習",
    "ターゲット捕捉 エイム練習",
    "初弾 精度 練習",
    "ターゲット アクジション",
    "FPS 索敵練習",
    "VALORANT 初弾ヘッドショット",
    "CS2 索敵 エイム",
    "エイムトレーナー 無料",
    "初弾 エイム 速度",
    "ターゲット 識別 練習",
    "VALORANT 初弾 練習"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/fps/target-acquisition",
    languages: getAlternateLanguages('/drills/fps/target-acquisition'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ターゲット捕捉 エイム練習 – 初弾精度トレーナー | SkillDrills",
    description: "視覚的なターゲット捕捉速度、特徴対比の識別能力、高精度な初弾フリックエイムを鍛える無料ブラウザFPSエイムトレーナー。",
    url: "https://skilldrills.online/ja/drills/fps/target-acquisition",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ターゲット捕捉 エイム練習 – 初弾精度トレーナー | SkillDrills",
    description: "視覚的なターゲット捕捉速度、特徴対比の識別能力、高精度な初弾フリックエイムを鍛える無料ブラウザFPSエイムトレーナー。",
  },
};

export default function TargetAcquisitionJaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "FPSエイム練習", "item": "https://skilldrills.online/ja/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "ターゲット捕捉", "item": "https://skilldrills.online/ja/drills/fps/target-acquisition" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ターゲット捕捉 エイム練習",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "視覚的ターゲット識別速度、脅威の優先順位判定、初弾ヘッドショット精度を鍛える無料ブラウザFPSエイムトレーナー。",
    "genre": "FPS Training / Target Acquisition",
    "url": "https://skilldrills.online/ja/drills/fps/target-acquisition",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ターゲット捕捉 エイム練習",
    "url": "https://skilldrills.online/ja/drills/fps/target-acquisition",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "視覚的ターゲット識別速度、脅威の優先順位判定、初弾ヘッドショット精度を鍛える無料ブラウザFPSエイムトレーナー。"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "ターゲット捕捉 エイム練習",
    "url": "https://skilldrills.online/ja/drills/fps/target-acquisition",
    "description": "視覚的ターゲット識別速度、脅威の優先順位判定、初弾ヘッドショット精度を鍛える無料ブラウザFPSエイムトレーナー。",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Target Acquisition"],
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
        "name": "競技FPSにおける「ターゲット捕捉（Target Acquisition）」とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ターゲット捕捉とは、視界内の背景や遮蔽物から敵を視覚的に検出し、味方や無害なオブジェクトと瞬時に識別した上で運動軌道を策定し、初弾を命中させる一連の認知・運動シーケンスです。"
        }
      },
      {
        "@type": "Question",
        "name": "ターゲット捕捉は単純な反応速度とどう違いますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "単純反応速度は単一の予測可能な刺激に対するクリック遅延のみを測定します。ターゲット捕捉は視覚探索、選択的空間注意、特徴識別（輝度や輪郭差）、および時間的制約下での精密なポインティング運動を包括します。"
        }
      },
      {
        "@type": "Question",
        "name": "ターゲット検出における特徴統合理論（Feature-Integration Theory）とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anne TreismanとGarry Gelade（1980）が提唱した理論で、輝度・色・傾きなどの基本視覚特徴は視野全体で前注意的かつ並列に処理され、その後に空間的注意が結合されて個別ターゲットとして認識されます。"
        }
      },
      {
        "@type": "Question",
        "name": "なぜプロゲーマーはアマチュアよりも速くターゲットを認識して撃てるのですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "プロ選手はガイド探索機構（Wolfe, 2007）と周辺視野のコントラスト感度を高度に発達させており、シリアルな視線走査を行わずに最も脅威度の高いターゲットへ一撃でサッカード（跳躍眼球運動）とフリックを連動させられるからです。"
        }
      },
      {
        "@type": "Question",
        "name": "VALORANTやCS2などのタクティカルシューターにおいて、初弾精度は撃ち合いの勝敗にどう影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "低TTK（Time to Kill）ゲームでは初弾ヘッドショットが交戦結果をほぼ100%決定づけます。初弾の捕捉が遅れたりミスショットしたりすると、相手の反撃を受けるかリコイル制御中に撃破されるリスクが跳ね上がります。"
        }
      },
      {
        "@type": "Question",
        "name": "敵の位置を特定する際、中心視野と周辺視野のどちらを重視すべきですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "初期の敵検出には高感度な周辺視野を活用し（ソフトフォーカス）、位置を捉えた瞬間に中心窩（フォーカルビジョン）へサッカードを飛ばして微細な照準修正を完結させるのが理想的です。"
        }
      },
      {
        "@type": "Question",
        "name": "視界内のオブジェクト密度やクラッター（散乱要素）は捕捉速度をどう低下させますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "クラッターが増えると前注意的なポップアウト効果が阻害され、脳がシリアル（直列的）な視線スキャンを強いられるため、目標特定までの認知的潜時が100〜200ms以上延長します。"
        }
      },
      {
        "@type": "Question",
        "name": "高速な複数ターゲット捕捉に最適なマウスの持ち方はどれですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "クローグリップ（つかみ持ち）やつまみ持ち（フィンガーティップ）が適しています。指先と手首の関節の自由度が高く、初弾の急速なフリック停止と微小な終末減速をマウスパッドの摩擦と合わせて精密に行えるためです。"
        }
      },
      {
        "@type": "Question",
        "name": "OSのマウス加速オフ（生入力）はターゲット捕捉の一貫性にどう寄与しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "マウス加速を排除して1:1の生入力を維持することで、手の移動距離と画面上のクロスヘア移動量が完全に一致し、運動記憶（マッスルメモリー）に基づいた正確な初弾フリックが可能になります。"
        }
      },
      {
        "@type": "Question",
        "name": "ターゲット捕捉ドリルは毎日どのくらいの時間練習すべきですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "毎日15〜20分間の高集中セッションが最適です。視覚疲労が蓄積する前のクリアな状態で短時間反復することが、運動皮質と視覚野のシナプス可塑性を最も効率的に促進します。"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "ターゲット捕捉エイムの効率的練習手順",
    "description": "視覚的識別スピードと初弾フリック精度を最大化するための4段階トレーニングステップ。",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "センシビリティのキャリブレーション",
        "text": "普段プレイしているゲームのDPI・ゲーム内感度を合わせ、ポインターロックを有効化して画面との1:1比率を確立します。"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "ソフトフォーカス（中央注視）の維持",
        "text": "画面中央に視線をリラックスさせて置き、周辺視野全体で高輝度ターゲットのポップアウトを待ち受けます。"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "最高優先度ターゲットのコントラスト識別",
        "text": "クラスタ出現時に並列視覚フィルタを働かせ、最も明るく不透明度の高いターゲットを瞬時に特定します。"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "弾道フリックとパッドブレーキングの実行",
        "text": "目標中心点へ鋭くフリックし、マウスパッドの摩擦と指先の制動でクロスヘアをピタリと止めてクリックします。"
      }
    ]
  };

  const targetAcquisitionGuide = {
    title: "ターゲット捕捉 エイム練習 実践マニュアル",
    subtitle: "視覚識別スピード、特徴対比の判別力、そして初弾ヘッドショット精度を科学的プロトコルで極限まで高める",
    intro: [
      "ターゲット捕捉（Target Acquisition）は、視野内の雑多なビジュアル情報から瞬時に敵の姿を拾い上げ、照準を合わせて初弾を撃ち込むFPSの最重要基礎技術です。Anne TreismanとGarry Gelade（1980）の特徴統合理論が示すように、輝度や輪郭といった基本視覚特徴は、意識的な視線走査を行わずとも視野全体で並列に処理されます。",
      "さらにJeremy M. Wolfe（1994, 2007）のガイド探索モデル（Guided Search）によると、トップダウンの予測とボトムアップの知覚的顕著性が融合することで、注意の配分が決定されます。本ドリルでターゲットの明暗コントラスト識別を反復することにより、背景のノイズを瞬時に遮断し、敵を発見してから射撃を開始するまでの脳内ディレイを大幅に短縮できます。",
      "Paul M. Fitts（1954）の運動制御法則、David E. Meyerら（1988）の最適化副運動理論、および高分解能デジタル時間計測（Woods et al., 2015）を統合し、実戦の緊張下でも迷わず初弾を命中させるエイム力を養います。",
      "計測精度について：本ドリルはブラウザの performance.now() 高分解能タイマーを用い、デバイス上で完結して測定されます。ディスプレイのリフレッシュレート（60Hzなら約16.7ms、144Hzなら約6.9ms、240Hzなら約4.1ms）による表示遅延が生じるため、5ms未満の微小なブレはハードウェア起因の測定ノイズとして扱い、同一環境での推移を比較してください。"
    ],
    benchmarks: {
      title: "ターゲット捕捉・識別レイテンシ ベンチマーク基準",
      headers: ["スキル帯", "捕捉レイテンシ", "初弾命中率", "実戦における競技的影響"],
      rows: [
        ["Tier 1（レディアント・プロ級）", "260 ms 未満", "95% – 99%+", "前注意的で瞬時な敵検出；迷いのない初弾ワンタップヘッドショットの実現"],
        ["Tier 2（イモータル・マスター級）", "260 – 320 ms", "88% – 95%", "卓越した索敵スピード；視覚ノイズに惑わされず優先ターゲットを素早く撃破"],
        ["Tier 3（ダイヤ・アセンダント級）", "320 – 400 ms", "80% – 88%", "堅実な初弾精度；複数ターゲットが密集した際に50〜80ms程度の認識遅延が発生"],
        ["Tier 4（ゴールド・プラチナ級）", "400 – 500 ms", "70% – 80%", "シリアル（直列的）な視線走査に依存；優先順位の低い目標を誤って撃つ傾向"],
        ["Tier 5（ビギナー・シルバー以下）", "500 ms 以上", "70% 未満", "視覚クラッターによる混乱；初弾の撃ち合いで反応負けすることが多い"]
      ],
      note: "捕捉レイテンシはクラスタ出現から最優先ターゲットがクリックされるまでの経過時間を示します（Woods et al., 2015）。"
    },
    techniques: {
      title: "ターゲット捕捉を高めるための科学的実践テクニック",
      items: [
        {
          name: "周辺視野を活用した並列スキャン（ソフトフォーカス）",
          desc: "画面の各ゾーンを目で追うシリアル走査を避け、画面中央付近に視線を緩やかに固定したまま、周辺視野で最も輝度の高いターゲットの出現を感知します（Treisman & Gelade, 1980）。",
          tips: "目を凝らしすぎず、画面全体をぼんやり捉えることで、視覚皮質のポップアウト検出を最大限に引き出します。"
        },
        {
          name: "サッカード・モーター結合による初弾スナップ",
          desc: "視線と手の動きを協調させます。まず跳躍眼球運動（サッカード）でターゲットの中心点を捉え、その眼球ベクトルに追従させるようにマウスを鋭くフリックします。",
          tips: "クロスヘアが到着する30〜50ms前に視線がターゲットに着弾している状態を意識してください。"
        },
        {
          name: "コントラスト識別の閾値コントロール",
          desc: "暗いターゲット（低脅威）に目移りせず、最も高輝度な目標のみを選択的に抽出する識別フィルターを脳内に構築します。",
          tips: "最高輝度のターゲットが消えるまでは、他のターゲットを視覚的に完全に無視する訓練を徹底します。"
        },
        {
          name: "パッド摩擦による終末制動（ブレーキング）",
          desc: "初速の弾道フリックに対し、目標直前でマウスパッドの摩擦と指先の微調整を用いてピタリと停止させます（Meyer et al., 1988）。",
          tips: "フリックの終わり際に手のひらや小指へわずかに下向きの力を加え、行き過ぎ（オーバーシュート）を防ぎます。"
        }
      ]
    },
    steps: [
      "設定メニューで普段のゲーム感度・DPIを正確に設定し、ポインターロックを開始します。",
      "画面中央に視線を置き、ターゲットクラスタの出現に備えます。",
      "並列視覚フィルタを働かせ、最も明るい優先ターゲットを瞬時に見分けます。",
      "目標の中心に向けて素早くフリックし、クリックして+100点（時間+0.4秒ボーナス）を獲得します。",
      "残りのターゲットを輝度順に連続処理して、+400点×レベルのセットボーナスを狙いましょう。"
    ],
    audience: "VALORANT、Counter-Strike 2、Apex Legends、Overwatch 2などで、初弾のヘッドショット精度と索敵反応速度を劇的に向上させたいFPSプレイヤー。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/ja/drills/fps/target-switching-swarm", label: "ターゲット スイッチング エイム練習" },
      { href: "/ja/drills/fps/vertical-air-track", label: "垂直エイム トラッキング練習" },
      { href: "/ja/drills/fps/strafe-tracking", label: "ストレイフ トラッキング練習" },
      { href: "/ja/drills/fps/recoil-control", label: "リコイル コントロール練習" }
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
      <TargetAcquisitionClient
        copy={{
          h1Keyword: "ターゲット捕捉 エイム練習",
          h1Suffix: " - 初弾精度・索敵エイムトレーナー",
          statScore: "スコア",
          statTime: "残り時間",
          statAccuracy: "命中率",
          statBestScore: "自己ベスト",
          statSetsCleared: "クリアセット",
          statMaxCombo: "最大コンボ",
          statPeakLevel: "最高レベル",
          startTitle: "ターゲット捕捉 Pro",
          startSubtitle: "視覚識別スピード • エンドレス難易度進行",
          getReady: "準備完了",
          toggleFlash: "ミスフラッシュ切替",
          toggleSound: "効果音切替",
          pausedTitle: "一時停止中",
          pausedSubtitle: "クリックして再開 — カーソルロックが再適用されます",
          stageCaption: "各クラスタ内で最も輝度（不透明度）の高いターゲットを素早く見極めて正確に撃ち抜いてください。",
          rulesTitle: "ドリル手順 & スコアリングシステム",
          rulesItems: [
            { title: "ターゲット命中 (+100点 / +0.4秒)", text: "最も明るいターゲットから順に射撃。コンボ倍率とレベルボーナスが加算されます。" },
            { title: "セットクリアボーナス (+400点 × レベル)", text: "セット内の全ターゲットを処理すると次のターゲット群が瞬時に出現。" },
            { title: "レベル進行 (1,400点ごと)", text: "ターゲット密度の上昇、縮小、および微細な明度差へと難易度がシームレスに深化。" },
            { title: "誤クリック・ミス減点", text: "誤ったターゲットのクリックや枠外ミスでコンボが0にリセットされます。" }
          ],
          aboutTitle: "ターゲット捕捉 エイム練習について",
          aboutHeading: "ターゲット捕捉（Target Acquisition）とは？",
          aboutText: "ターゲット捕捉とは、視野内の乱雑な情報から瞬時に敵を特定し、照準を合わせる一連の視覚認知・運動プロセスです。色や輝度などの基本特徴は並列処理（Treisman & Gelade, 1980）されるため、明暗差の識別訓練を重ねることで索敵ディレイを極限まで削ぎ落とせます。"
        }}
      />
      <DrillGuide guide={targetAcquisitionGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-acquisition"
          locale="ja"
        />
      </div>
    </>
  );
}
