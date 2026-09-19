import ProSmoothPursuitClient from '@/app/drills/fps/pro-smooth-pursuit/ProSmoothPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';

export const metadata = {
  title: "スムーズ トラッキング 練習 – 滑走性眼球運動 | SkillDrills",
  description: "ブラウザで無料プレイできるスムーズトラッキング（滑走性眼球運動）エイム練習。Apex LegendsやOverwatch 2の滑らかな曲線軌道や空中ターゲットに照準を吸い付かせ、手の震えを抑えます。",
  keywords: [
    "スムーズ トラッキング 練習",
    "スムース パシュート エイム",
    "滑走性眼球運動 トレーニング",
    "トラッキング エイム 練習",
    "Apex トラッキング 練習",
    "Overwatch2 エイム練習",
    "手首 ブレ 抑える エイム",
    "エイムトレーナー 無料",
    "曲線トラッキング",
    "手ブレ 抑える エイム",
    "視線追従 エイム",
    "滑走眼球運動 エイム"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/fps/pro-smooth-pursuit",
    languages: getAlternateLanguages('/drills/fps/pro-smooth-pursuit'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "スムーズ トラッキング 練習 – 滑走性眼球運動 | SkillDrills",
    description: "リサジュー曲線の不規則な軌道を滑らかに追従するスムースパシュート練習：手首の力みやブレを抑え吸い付くようなエイムを鍛えるFPSドリル。",
    url: "https://skilldrills.online/ja/drills/fps/pro-smooth-pursuit",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "スムーズ トラッキング 練習 – 滑走性眼球運動 | SkillDrills",
    description: "リサジュー曲線の不規則な軌道を滑らかに追従するスムースパシュート練習：手首の力みやブレを抑え吸い付くようなエイムを鍛えるFPSドリル。",
  },
};

export default function ProSmoothPursuitJaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "FPSエイム練習", "item": "https://skilldrills.online/ja/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "スムーズ トラッキング 練習", "item": "https://skilldrills.online/ja/drills/fps/pro-smooth-pursuit" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "スムーズ トラッキング 練習",
    "url": "https://skilldrills.online/ja/drills/fps/pro-smooth-pursuit",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "ブラウザで動作する無料スムーズトラッキング練習。リサジュー曲線による滑走性眼球運動と前腕安定化を鍛えます。"
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "スムーズ トラッキング 練習",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "不規則な曲線移動に滑らかに照準を同期させる無料ブラウザFPSスムーズトラッキング・エイムドリル。",
    "genre": "FPS Training / Smooth Pursuit Aim",
    "url": "https://skilldrills.online/ja/drills/fps/pro-smooth-pursuit",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "スムーズ トラッキング 練習",
    "url": "https://skilldrills.online/ja/drills/fps/pro-smooth-pursuit",
    "description": "不規則な曲線移動に滑らかに照準を同期させる無料ブラウザFPSスムーズトラッキング・エイムドリル。",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Smooth Pursuit"],
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
        "name": "FPSにおけるスムーズパシュート（滑走性眼球運動）訓練とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "スムーズパシュート訓練は、不規則な微小フリック（跳躍眼球運動）に頼ることなく、滑らかに移動する目標に対して視線とクロスヘアの速度を完全に同期させる神経筋トレーニングです。"
        }
      },
      {
        "@type": "Question",
        "name": "滑走性眼球運動とサッカード（跳躍運動）の神経学的な違いは？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rashbass（1961）の研究により、両者は異なる神経経路で制御されることが証明されています。サッカードは位置のズレに反応する開放ループ運動ですが、滑走性眼球運動はMT/V5野を通じた速度情報（網膜スリップ）によって継続的にフィードバック制御されます（Krauzlis, 2004）。"
        }
      },
      {
        "@type": "Question",
        "name": "トラッキング中にエイムがガクガクと震えてしまう原因は？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "前腕や手首の過度な力み、マウスパッドの静摩擦係数の高さ、そして『クロスヘアの点を見つめてしまう癖』が原因です。目標ではなくクロスヘアを見ると、脳が過剰な微修正指令を出し続けて手の震えが生じます。"
        }
      },
      {
        "@type": "Question",
        "name": "中心窩視線の先読み（Foveal Gaze Leading）とは？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Land & McLeod（2000）が発見したように、熟練者は目標の現在位置ではなく、進行方向のわずか前方（2〜5ピクセル先）に視線を固定します。これにより運動皮質が方向転換を先読みし、滑らかな追従が可能になります。"
        }
      },
      {
        "@type": "Question",
        "name": "ApexやOverwatch 2などの高TTKタイトルでなぜ重要ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "高TTKのゲームでは敵を倒すまでに数秒間の持続的な射撃が必要です。単発のフリック精度よりも、敵の立体機動（スライディング、ジャンプパッド等）に対して照準を外さない『ダメージアップタイム』が勝敗を直結します。"
        }
      },
      {
        "@type": "Question",
        "name": "なぜ練習にリサジュー曲線（Lissajous curve）が使われるのですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "リサジュー曲線は直交する正弦波が合成された幾何学軌道です。一定速度の直線運動と異なり、頂点での減速と中心での加速が常に滑らかに変化するため、真の速度追従適応力を養えます。"
        }
      },
      {
        "@type": "Question",
        "name": "モニターのリフレッシュレートやマウスのポーリングレートは影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "極めて大きく影響します。144Hz〜360Hzの高リフレッシュレートは網膜上の運動残像をなくし、1000Hz以上のポーリングレートは座標の飛び（カクつき）を排除して滑らかな入力伝達を実現します（Woods et al., 2015）。"
        }
      },
      {
        "@type": "Question",
        "name": "滑らかなトラッキングに最適なマウスの持ち方は？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "手のひらの基部をマウス後部に適度に預け、指先に余計な力を入れないリラックスしたつかみ持ちやハイブリッド持ちが最適です。肘を回転軸にして腕全体で滑らかにマウスを運びます。"
        }
      },
      {
        "@type": "Question",
        "name": "スムーズトラッキング練習はどのくらいの頻度で行うべきですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ランク戦前のウォーミングアップとして毎日10〜15分程度行うのが理想的です。前腕伸筋群の疲労を防ぐため、1回につき30分以上の連続練習は避けて休憩を挟んでください。"
        }
      },
      {
        "@type": "Question",
        "name": "ターゲットから外れるとコンボがリセットされる理由は？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "途切れない照準維持（ビーム規律）に高い報酬を与えるためです。設定で時間ペナルティを有効にしている場合、外れた時間に応じてラウンド制限時間も削られるため実戦さながらの集中力が鍛えられます。"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "スムーズトラッキング（滑走性眼球運動）の練習手順",
    "description": "リサジュー曲線の不規則な軌道に照準を滑らかに合わせ続けるステップバイステップ訓練法。",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "ゲーム感度を合わせる",
        "text": "セッション設定でプレイ中のゲーム感度とDPIを統一し、1:1のマッスルメモリーを確保します。",
        "url": "https://skilldrills.online/ja/drills/fps/pro-smooth-pursuit#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "RAWポインターロックを有効化",
        "text": "開始ボタンを押してフルスクリーン化し、OSのマウス加速を完全に排除します。",
        "url": "https://skilldrills.online/ja/drills/fps/pro-smooth-pursuit#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "視線をターゲットの進行方向先端に固定",
        "text": "クロスヘアを見つめるのではなく、移動するターゲットの進行方向エッジに視線を集中させます。",
        "url": "https://skilldrills.online/ja/drills/fps/pro-smooth-pursuit#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "腕の脱力を保ち速度を同調させる",
        "text": "肘を支点にリラックスしてマウスを滑らせ、曲線の加減速に合わせて照準を連続同期させます。",
        "url": "https://skilldrills.online/ja/drills/fps/pro-smooth-pursuit#step-4"
      }
    ]
  };

  const copy = {
    h1Keyword: "スムーズ トラッキング 練習",
    h1Suffix: " - 滑走性眼球運動エイムトレーナー",
    statScore: "スコア",
    statTime: "残り時間",
    statAccuracy: "トラッキング精度",
    statBestScore: "自己ベスト",
    startTitle: "スムーズ トラッキング 練習",
    startSubtitle: "リサジュー曲線追従 • 滑走性眼球運動 • エンドレス難易度",
    getReady: "準備完了",
    pausedTitle: "一時停止",
    pausedSubtitle: "クリックして再開（マウスロックが再有効化されます）",
    stageCaption: "画面上を滑らかに周回・振動するリサジュー曲線のターゲットに照準を乗せ続けます。",
    rulesTitle: "トレーニングルール & スコアリング",
    rulesItems: [
      { num: "1", text: "追従照準維持", highlight: "+50 PTS (+0.4s/s)", result: "×コンボ倍率" },
      { num: "2", text: "連続コンボ蓄積", highlight: "最大 3.0×", result: "最大倍率" },
      { num: "3", text: "レベル難易度進行", highlight: "+1 レベル / 1400 PTS", result: "適応型曲線" },
      { num: "4", text: "オフターゲット", highlight: "1.0秒離脱", result: "コンボリセット (-0.6s)" }
    ],
    aboutTitle: "スムーズトラッキング・滑走性眼球運動について",
  };

  const jaGuide = {
    heading: "スムーズトラッキング訓練のバイオメカニクスとベンチマーク",
    intro: [
      "スムーズトラッキング（Smooth Pursuit）訓練は、リサジュー曲線の調和振動に照準を同調させ、前腕の運動安定化と眼球の滑走運動を極限まで高める実証的感覚運動エイムドリルです。Apex Legends、Overwatch 2、The Finalsなどの撃ち合いでは、数秒間にわたり跳躍やスライディング、空中軌道を行う敵に照準を当て続けるダメージ維持率（Damage Uptime）が勝敗を決定づけます。",
      "滑走性眼球運動の神経基盤はKrauzlis（2004）によって解明されており、内側上側頭野（MST）、前頭眼野（FEF）、視覚運動野（MT/V5）の反復性皮質ループが目標の速度ベクトルをリアルタイムに計算して眼球筋を連続駆動します。この神経回路は受動的に反応するのではなく、標的の速度と位相を予測モデル化して眼球運動系を同期させます。",
      "Cyril Rashbass（1961）の古典的実験では、位置ズレに反応するサッカード（跳躍眼球運動）と速度変化（網膜スリップ）に反応するスムーズパシュートが解剖学的・機能的に独立した神経機構であることが証明されました。力んでフリックしようとしたり、マウスを握りしめすぎるとスムーズパシュート回路が破綻し、不随意の補正サッカードが混入してエイムの目立つカクつき（Aim Stutter）を引き起こします。",
      "本ドリルでは、リサジュー曲線による調和振動座標生成に、中心窩視線の先読み理論（Land & McLeod, 2000）、動的注意視覚の拡張（Green & Bavelier, 2003）、および高分解能デジタルクロノメトリ（Woods et al., 2015）を統合し、前腕の筋緊張を完全に排除して非線形曲線を氷上のように滑らかに追従するレーザービームエイムを確立します。",
      "測定方法とハードウェア遅延について：すべての追従判定はブラウザ内蔵のperformance.now()高精度クロックによってローカル環境でのみ計測され、外部へのデータ送信は一切行われません。ブラウザのタイマーはSpectre対策により約1ms単位で丸められており、モニターの垂直同期はフレームごとに視覚情報を量子化します（60Hzで約16.7ms、144Hzで6.9ms、240Hzで4.1ms、Woods et al., 2015）。マウスのポーリングレートは125Hzで約8ms、1000Hzで約1msの遅延差を生じさせます。5ms未満の差異は測定ノイズとして扱い、同一のハードウェア環境で継続的に自己記録の変化を追跡してください。"
    ],
    benchmarks: {
      title: "トラッキング維持率（Uptime）と実力ティア",
      headers: ["実力ランク", "目標追従率（%）", "神経筋・眼球運動の状態", "実戦ゲームでの戦闘力"],
      rows: [
        ["ティア1（Apexプレデター級）", "85% – 95%+", "完全な中心窩ロック：曲線の変曲点でもサッカードを起こさず吸い付くビームエイム", "ApexプレデターやOverwatchトップ500で相手を一瞬で溶かし切る究極のトラッキング"],
        ["ティア2（競技プロ・マスター）", "72% – 85%", "流暢な前腕制御：目標が軌道頂点で減速するタイミングを即座に補正して追従", "スライディングや遮蔽間移動を行う敵に対しても安定して高DPSを叩き出す"],
        ["ティア3（上級FPSプレイヤー）", "58% – 72%", "安定した直線追従：急激な非線形ベクトル反転時にわずかな遅延と10〜15%の脱落", "一般的な撃ち合いでは十分強力だが、グラップル等の立体高速機動相手に僅かに弾を外す"],
        ["ティア4（中級者）", "42% – 58%", "滑走ではなくフリックで追う傾向：力みによって定期的にマウスが震え目標を行き過ぎる", "高機動キャラクターに翻弄されやすく、マガジン全弾ヒットを維持できない"],
        ["ティア5（初級・エイムブレ）", "42%未満", "視覚処理の遅延が大きく、常に敵の後方を追いかけて大振りの修正フリックを連発", "近距離・中距離のトラッキングで弾が外れやすく、手首の緊張でエイムがガタつく"]
      ],
      note: "追従維持率は累計オンターゲット時間をセッション時間で除算して算出（Woods et al., 2015）。"
    },
    techniques: {
      title: "滑走性スムーズエイムを極める4つの実証プロトコル",
      items: [
        {
          name: "中心窩視線の先読み（Foveal Gaze Leading）",
          desc: "クロスヘア自体を見るのをやめ、動くターゲットの進行方向前端（2〜5ピクセル先）に視線を固定します（Land & McLeod, 2000）。",
          tips: "エイムがカクついたら深呼吸し、ターゲットの表面に意識を100%集中させてください。"
        },
        {
          name: "前腕の脱力と肘支点のストローク",
          desc: "手首を固めて指先だけで追おうとすると拮抗筋が反発して震えが生じます。前腕をマウスパッドに軽く預け、肘から滑らかに旋回させます。",
          tips: "マウスの握り込みの強さは最大握力の30〜40%程度に保ちます。"
        },
        {
          name: "リサジュー曲線の減速リズム予見",
          desc: "正弦波の物理特性として、軌道の外側頂点では減速し、中央を通過する際は加速します（Krauzlis, 2004）。",
          tips: "動きのリズムを感じ取り、頂点の手前で自然に速度を落とす意識を持ちます。"
        },
        {
          name: "修正サッカードの抑制（慌てて振らない）",
          desc: "照準が少し外れた際、パニックになって勢いよくマウスを振るとサッカード抑制によって視覚が一瞬遮断されます（Rashbass, 1961）。",
          tips: "急激に振るのではなく、滑らかに速度を上げて自然に目標の輪郭へ照準を戻します。"
        }
      ]
    },
    steps: [
      "セッション設定でゲーム感度とDPIを合わせ、ポインターロックでRAW入力を確保します。",
      "画面上をリサジュー軌道で巡回する光るターゲットに視線を合わせます。",
      "肘を支点にリラックスしてマウスを滑らせ、滑走速度を同調させます。",
      "連続追従時間を維持してコンボ倍率を最大3.0倍まで高め、1400点ごとにレベルアップします。",
      "セッション終了後の統計画面で追従精度とオフターゲット時間を確認し、弱点変曲点を把握します。"
    ],
    audience: "Apex Legends、Overwatch 2、The Finals、Warzoneなどで、中距離・近距離の持続射撃時に照準がブレて弾を外してしまうすべてのFPSプレイヤー。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'green2003', 'rashbass1961', 'land2000'),
    related: [
      { href: "/ja/drills/fps/anti-zigzag-movement-trainer", label: "ジグザグ移動 練習 (スライディング追従)" },
      { href: "/ja/drills/fps/anti-strafe-jitter-duel", label: "レレレ撃ち 練習 (ジッタートラッキング)" },
      { href: "/ja/drills/fps/flick-shot-training", label: "フリック エイム 練習" },
      { href: "/ja/drills/fps/micro-correction-precision", label: "マイクロフリック 練習" },
      { href: "/ja/drills/reaction-speed/reaction-time-test", label: "反射神経テスト" }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <ProSmoothPursuitClient copy={copy} />
      <div className="max-w-6xl mx-auto px-4 w-full">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/pro-smooth-pursuit" locale="ja" />
      </div>
      <DrillGuide guide={jaGuide} />
      <DrillFooter />
    </>
  );
}
