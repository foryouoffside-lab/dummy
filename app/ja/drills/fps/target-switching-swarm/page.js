import TargetSwitchingSwarmClient from '@/app/drills/fps/target-switching-swarm/TargetSwitchingSwarmClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (fps / target-switching-swarm)
// PRIMARY DOMESTIC: "ターゲット スイッチング エイム"     — Core keyword target
//                   "ターゲットスイッチング"           — #1 Google Suggest hit
//                   "スイッチング エイム"              — Confirmed Google Suggest term
//                   "マルチターゲット エイム練習"      — High-intent practice term
//                   "FPS ターゲット切り替え"           — Functional search
// SECONDARY / LSI:
//                   "ターゲット スイッチング 練習"     — Extended phrase
//                   "VALORANT スイッチング エイム"     — Game specific query
//                   "エイム 練習 ブラウザ 無料"        — Broad platform intent
// WINNER TITLE:     ターゲット スイッチング エイム練習 – 無料ブラウザFPSマルチターゲットフリックトレーナー | SkillDrills
// ============================================================

export const metadata = {
  title: "ターゲット スイッチング エイム練習 – 無料FPSフリックトレーナー | SkillDrills",
  description: "無料のブラウザFPSターゲットスイッチング（切り替えエイム）練習ツール。動的スワーム群の高速フリック移行、ヒット確認ロス（確信躊躇）の排除、CS2やVALORANTのスプレーツランスファーを強化。",
  keywords: [
    'ターゲット スイッチング エイム',
    'ターゲットスイッチング',
    'スイッチング エイム',
    'マルチターゲット エイム練習',
    'ターゲット スイッチング 練習',
    'FPS ターゲット切り替え',
    'VALORANT スイッチング エイム',
    'エイム 練習 ブラウザ 無料',
    'スプレーツランスファー 練習',
    'CS2 エイム練習',
    'フリック エイム 移行',
    'エイム 反射神経 トレーニング'
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/fps/target-switching-swarm",
    languages: getAlternateLanguages('/drills/fps/target-switching-swarm'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'ターゲット スイッチング エイム練習 – 無料FPSフリックトレーナー | SkillDrills',
    description: "無料のブラウザFPSターゲットスイッチング（切り替えエイム）練習ツール。動的スワーム群の高速フリック移行、ヒット確認ロス（確信躊躇）の排除、CS2やVALORANTのスプレーツランスファーを強化。",
    url: "https://skilldrills.online/ja/drills/fps/target-switching-swarm",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ターゲット スイッチング エイム練習 – 無料FPSフリックトレーナー | SkillDrills',
    description: "無料のブラウザFPSターゲットスイッチング（切り替えエイム）練習ツール。動的スワーム群の高速フリック移行、ヒット確認ロス（確信躊躇）の排除、CS2やVALORANTのスプレーツランスファーを強化。",
  },
};

export default function TargetSwitchingSwarmPageJa() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "FPSドリル", "item": "https://skilldrills.online/ja/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "ターゲット スイッチング エイム練習", "item": "https://skilldrills.online/ja/drills/fps/target-switching-swarm" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ターゲット スイッチング エイム練習 (Target Switching Swarm)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "無料のブラウザFPSターゲットスイッチング練習アプリ。連続出現するスワームターゲットへの瞬時フリックとスプレーツランスファーを鍛えます。",
    "genre": "FPS Training / Target Switching",
    "url": "https://skilldrills.online/ja/drills/fps/target-switching-swarm",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ターゲット スイッチング エイム練習 (Target Switching Swarm)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "Pointer Lock API、JavaScript、HTML5 Canvas対応ブラウザ",
    "description": "無料のブラウザFPSターゲットスイッチング練習アプリ。連続出現するスワームターゲットへの瞬時フリックとスプレーツランスファーを鍛えます。",
    "url": "https://skilldrills.online/ja/drills/fps/target-switching-swarm"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "ターゲット スイッチング エイム練習 (Target Switching Swarm)",
    "url": "https://skilldrills.online/ja/drills/fps/target-switching-swarm",
    "description": "無料のブラウザFPSターゲットスイッチング練習アプリ。連続出現するスワームターゲットへの瞬時フリックとスプレーツランスファーを鍛えます。",
    "dateModified": "2026-09-11",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Target Switching"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-11",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "FPSにおける「ターゲットスイッチング（切り替えエイム）」とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ターゲットスイッチングとは、複数の敵ターゲット間を淀みなく連続してクロスヘアを移行させ、撃破後に減速躊躇なく次の敵へ即座に着弾させるエイム運動技術です。"
        }
      },
      {
        "@type": "Question",
        "name": "通常のフリック練習とターゲットスイッチングの違いは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "通常のフリック練習は単一の標的を撃った後クロスヘアを一旦中央に戻すことが多いのに対し、ターゲットスイッチングは画面上に群れ（スワーム）として存在する複数の標的を連続して流れるように撃ち抜くため、運動の連鎖性と視覚インデックス能力が試されます。"
        }
      },
      {
        "@type": "Question",
        "name": "スワーム（群れ）形式の練習はマルチキル能力にどう貢献しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1体の敵を倒しながら周辺視野で次の敵の位置を無意識に計算（視覚事前ルーティング）する脳の神経回路が強化され、実戦のサイト防衛やリテイク時における連続キル速度が劇的に向上します。"
        }
      },
      {
        "@type": "Question",
        "name": "敵を倒した後に次の標的へエイムが遅れる（躊躇する）のはなぜですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "敵が倒れたかどうかの「キル確認（視覚・聴覚フィードバック）」を無意識に待ってから次の動作を始めるためです。本ドリルを反復することで、クリック完了と同時に眼球サッケードを次の標的に飛ばす運動習慣が身につきます。"
        }
      },
      {
        "@type": "Question",
        "name": "CS2やVALORANTのスプレーツランスファー（リコイル移行）に役立ちますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい、極めて役立ちます。フルオート射撃中に隣接する敵へ素早くクロスヘアを移動させてピタッと止めるブレーキ制動力（終末減速）が鍛えられます。"
        }
      },
      {
        "@type": "Question",
        "name": "ターゲットスイッチングが最も重要となるゲームタイトルは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VALORANT、Counter-Strike 2、Apex Legends、Overwatch 2など、複数人が同時にエントリーしてくる状況で瞬時に連続ヘッドショットや確殺が求められるすべての競技シューターです。"
        }
      },
      {
        "@type": "Question",
        "name": "高速スイッチングに最適なマウスの持ち方はありますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "つかみ持ち（Claw Grip）や指先持ち（Fingertip Grip）が推奨されます。手首や指先の関節を脱力させて微調整できるため、急激なフリック停止時の衝撃を柔軟に吸収できます。"
        }
      },
      {
        "@type": "Question",
        "name": "フィッツの法則（Fitts' Law）と弾道運動はどう関係していますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "フィッツの法則では距離と標的サイズで移動時間が決まりますが、スイッチングは最初の高速な弾道運動（主移動で90%接近）と、直後の精密微修正（副移動）の最適組み合わせによって最速化されます（Meyer et al., 1988）。"
        }
      },
      {
        "@type": "Question",
        "name": "ターゲットスイッチングの練習頻度はどれくらいが理想ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1回あたり10〜15分、週に3〜4回または試合前のウォームアップルーティンとして取り入れることで、キル後の確認遅延が完全に排除されます。"
        }
      },
      {
        "@type": "Question",
        "name": "このターゲットスイッチングエイム練習は無料で利用できますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい、登録不要・インストール不要・完全無料です。PCブラウザ上で低遅延のRAWポインターロック入力により即座に練習できます。"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "ターゲット スイッチング エイムの練習手順",
    "description": "多目標スワームに対して高速フリックと瞬時移行を習得する4ステップ。",
        "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "感度設定とポインターロックの有効化",
        "text": "主力の競技FPSと同じDPIと感度を設定し、スタートボタンをクリックしてカーソルを固定します。",
        "url": "https://skilldrills.online/ja/drills/fps/target-switching-swarm#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "最寄りのスワームターゲットを素早く捕捉",
        "text": "出現したシアン色のターゲットの中で最も近く角度差の小さい標的に向けて素早くフリックし、クリックして破壊します。",
        "url": "https://skilldrills.online/ja/drills/fps/target-switching-swarm#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "キル確認の停止を挟まず即座に次へ移行",
        "text": "破壊アニメーションを待つことなく、クリック直後に次の隣接ターゲットへ弾道運動でクロスヘアを飛ばします。",
        "url": "https://skilldrills.online/ja/drills/fps/target-switching-swarm#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "脱力したフローリズムで連続キルストリークを維持",
        "text": "手首の緊張を解いて滑らかな運動連鎖を保ち、タイムリングが切れる前に連続撃破して高難度スワームを攻略します。",
        "url": "https://skilldrills.online/ja/drills/fps/target-switching-swarm#step-4"
      }
    ]
  };

  const targetSwitchingGuide = {
    heading: "ターゲット スイッチング エイム練習ガイド & マルチターゲット運動学",
    intro: [
      "ターゲット スイッチング スワーム（Target Switching Swarm）は、複数の敵対ターゲット間を一切の躊躇なく超高速で連続移行するための運動制御ドリルです。Counter-Strike 2やVALORANTのサイト防衛、Apex Legendsの混戦において、1対1の孤立したデュエルだけをこなしていてはクラッチに勝利できません。1体目の敵を倒した瞬間、キル確認の脳内ポーズを挟まずに2体目のカバー敵へ吸い付くようにエイムを移行させる能力が勝敗を分けます。",
      "ターゲットスイッチングの心理物理学は、フィッツの法則（Fitts, 1954）およびDavid E. Meyerら（1988）が提唱した「確率的最適化サブムーブメントモデル」に基づいています。照準動作は最初の高速弾道運動（主移動：距離の約90%をカバー）と、視覚フィードバックによる微修正（副移動）から構成されます。初心者は1キルごとに100〜250msもの時間を「倒せたかどうかの確認」に無駄遣いしますが、一流のエイマーは1体目の標的が弾け飛ぶ前に次の標的へ視覚サッケードを開始しています。",
      "密集したスワーム群からの標的選択には、特徴統合理論と前注意的視覚探索（Treisman & Gelade, 1980; Wolfe, 2007）が深く関与します。人間の視覚皮質は「視覚インデックス（FINST理論）」によって複数の空間位置を並列追跡可能であり、最短の角度移動で済む効率的な撃破ルートを瞬時に構築できます。",
      "測定精度について：すべてのイベントはブラウザのperformance.now()高精度クロックを使用し、外部サーバー通信なしで端末内でミリ秒単位で処理されます。Spectre緩和策により一般的なブラウザタイマーは約1msに丸められ、画面リフレッシュレート（60Hzで約16.7ms、144Hzで約6.9ms、240Hzで約4.1ms）に応じた量子化が発生します。5ms以内の微小な数値差は測定誤差として扱い、他者の異なるPC環境と比較するのではなく、ご自身の同一ハードウェア環境での成長指標として活用してください。"
    ],
    benchmarks: {
      title: "ターゲットスイッチング & 連続移行ベンチマーク基準",
      headers: ["パフォーマンス階層", "標的間移行時間", "毎分撃破ペース", "競技シーンにおける実戦力"],
      rows: [
        ["Tier 1（レディアント / Faceit Lv10 / プロ）", "210 ms 未満", "110+ 標的/分", "完璧なスプレーツランスファー。確認遅延ゼロ。1v3のサイト防衛やリテイクを単独で打開可能"],
        ["Tier 2（イモータル / Faceit 8-9 / マスター）", "210 – 260 ms", "92 – 110 標的/分", "極めてシャープな連続移行。広角スイッチ時にわずかな減速ブレがあるが、マルチキルを高い確率で成立"],
        ["Tier 3（アセンダント / ダイヤ上位）", "260 – 320 ms", "74 – 92 標的/分", "密集した標的群では素早い。画面の反対側へのワイドスイッチになると初動が遅れる"],
        ["Tier 4（プラチナ / ゴールド帯）", "320 – 400 ms", "56 – 74 標的/分", "キル後に100ms以上の確認躊躇が発生。次の標的に急激にフリックして行き過ぎるオーバーシュートが頻発"],
        ["Tier 5（シルバー / ブロンズ / 初級者）", "400 ms 以上", "56 標的/分 未満", "標的を倒すたびにマウスを完全に停止。手首が力んでおり、連続的な運動連鎖が成立しない"]
      ],
      note: "標的間移行時間は前の標的破壊から次の標的にクロスヘアが到達するまでのミリ秒間隔、毎分撃破ペースは制限時間内の継続的破壊処理レートを指します（Woods et al., 2015）。"
    },
    techniques: {
      title: "ターゲットスイッチングを極めるエビデンスベースのプロトコル",
      items: [
        {
          name: "サッケード先行ルーティングと視覚インデックス",
          desc: "1体目の標的の微調整が終わる直前、視線（中心視）だけを一足先に次の標的へとジャンプさせます（Treisman & Gelade, 1980; Wolfe, 2007）。眼球運動は手の運動より50〜80ms先行します。",
          tips: "クリックした後の標的を見つめ続けないでください。周辺視野で破壊を感知し、中心視は次の獲物に固定します。"
        },
        {
          name: "終末急制動と弾道サブムーブメントの最適化",
          desc: "フリック軌道の最後の10%で拮抗筋のカウンターテンションを素早く効かせ、標的中心でマウスをピタッと停止させます（Meyer et al., 1988）。行き過ぎによる往復振動を防ぎます。",
          tips: "マウスに油圧ブレーキがついているイメージを持ちましょう。初速は爆発的に、停止は鋭く行います。"
        },
        {
          name: "最短角距離のクラスタールーティング",
          desc: "画面中を無秩序に行ったり来たりするのではなく、角度差が最も小さい隣接標的のペアから順に処理していきます（Fitts, 1954）。",
          tips: "遠くの孤立ターゲットに飛びつく前に、近くの群れを確実に一層してから大移動します。"
        },
        {
          name: "グリップ脱力と微小調整の柔軟性維持",
          desc: "グリップの握力は10段階中「3」程度に保ち、最高速で移動した直後でも指先でミリ単位の修正ができる柔軟性を残します。",
          tips: "長時間のスイッチングで手が疲れたりエイムが突っかかる場合は、親指と小指の握り込みを意図的に緩めてください。"
        }
      ]
    },
    steps: [
      "ゲーム内感度とマウスDPIを設定で普段のFPSと一致させ、キャンバスをクリックしてカーソルを固定。",
      "出現したスワーム全体を視野に入れ、角度差の小さいターゲットの塊を素早く認識。",
      "最寄りの標的へ素早くフリックしてクリック破壊し、スコアと時間ボーナスを獲得。",
      "倒したかどうかの確認停止を入れず、即座に次の標的へ向かってマウスを滑らかに飛ばす。",
      "手首を力ませずに連続撃破を繋ぎ、コンボ倍率を高めて最高難度のスワーム密度に挑戦する。"
    ],
    audience: "VALORANT、Counter-Strike 2、Apex Legends、Overwatch 2などで複数人へのスプレーツランスファーや確殺速度を高め、クラッチ勝率を上げたいFPS競技ゲーマー。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/ja/drills/fps/vertical-air-track", label: "垂直 エイム 練習（縦エイム・空中トラッキング）" },
      { href: "/ja/drills/fps/strafe-tracking", label: "追いエイム練習（ストレイフトラッキング）" },
      { href: "/ja/drills/fps/recoil-control", label: "リコイル制御練習（リコイルコントロール）" },
      { href: "/ja/drills/motor/hand-eye-coordination/aim-trainer", label: "エイムトレーナー（反復フリック）" },
      { href: "/ja/drills/reaction-speed/reaction-game", label: "リアクションスピードテスト" }
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
      <TargetSwitchingSwarmClient
        copy={{
          h1Keyword: "ターゲット スイッチング エイム",
          h1Suffix: " – 無料ブラウザFPSマルチターゲットフリック練習",
          subtitle: "停止ディレイなしの高速連続フリック移行とスプレーツランスファー、視覚的インデックスを訓練。",
          statScore: "スコア",
          statTime: "制限時間",
          statAccuracy: "命中精度",
          statBestScore: "自己ベスト",
          statTargetsDestroyed: "破壊ターゲット数",
          statMaxCombo: "最大コンボ",
          statPeakLevel: "最高到達レベル",
          startTitle: "Target Switching Swarm",
          startSubtitle: "高精度RAWマウス入力 • エンドレス難易度進行",
          stageCaption: "制限時間が終了する前に、出現するターゲット群を高速フリックで連続破壊。",
          rulesTitle: "ドリル操作方法 & スコア計算システム",
          aboutTitle: "ターゲット スイッチング（Target Switching）について",
          rulesItems: [
            { num: "1", text: "ターゲット即時破壊", highlight: "シアン標的 (+100 PTS / +0.35秒)", result: "+100 PTS / +0.35秒" },
            { num: "2", text: "動的スワーム移行", highlight: "即時リスポーン", result: "持続スワーム" },
            { num: "3", text: "失敗ペナルティ", highlight: "ミス / 制限時間超過", result: "コンボリセット" },
            { num: "4", text: "レベル難易度上昇", highlight: "+1 レベル / 2100 PTS", result: "小型化 & 高速化" }
          ]
        }}
      />
      <DrillGuide guide={targetSwitchingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-switching-swarm"
          locale="ja"
        />
      </div>
      <DrillFooter />
    </>
  );
}
