import MicroCorrectionClient from '@/app/drills/fps/micro-correction-precision/MicroCorrectionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "マイクロフリック練習 – エイム微調整トレーナー | SkillDrills",
  description: "ブラウザで無料プレイできるマイクロフリック練習。初弾フリック後の微小なエイムズレの即時修正、指先による終末減速、ヘッドショット精度を科学的に強化します。",
  keywords: [
    "マイクロフリック 練習",
    "マイクロフリック",
    "エイム 微調整",
    "FPS 微調整",
    "ヘッドショット 精度 練習",
    "VALORANT マイクロフリック",
    "CS2 エイム微調整",
    "エイムトレーナー 無料",
    "微小エイム 補正",
    "ヘッドショット 微調整",
    "マウス 減速 コントロール",
    "指先 エイム コントロール"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/fps/micro-correction-precision",
    languages: getAlternateLanguages('/drills/fps/micro-correction-precision'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "マイクロフリック練習 – エイム微調整トレーナー | SkillDrills",
    description: "一次フリック直後の微小な位置ズレを瞬時に修正する無料ブラウザFPSエイムトレーナー。VALORANTやCS2のヘッドショット精度を劇的に向上させます。",
    url: "https://skilldrills.online/ja/drills/fps/micro-correction-precision",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "マイクロフリック練習 – エイム微調整トレーナー | SkillDrills",
    description: "一次フリック直後の微小な位置ズレを瞬時に修正する無料ブラウザFPSエイムトレーナー。VALORANTやCS2のヘッドショット精度を劇的に向上させます。",
  },
};

export default function MicroCorrectionJaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "FPSエイム練習", "item": "https://skilldrills.online/ja/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "マイクロフリック", "item": "https://skilldrills.online/ja/drills/fps/micro-correction-precision" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "マイクロフリック 練習",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "初期フリック後の微小な位置ズレ修正、指先減速制御、ヘッドショット精度を鍛える無料ブラウザFPSエイムトレーナー。",
    "genre": "FPS Training / Micro-Correction",
    "url": "https://skilldrills.online/ja/drills/fps/micro-correction-precision",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "マイクロフリック 練習",
    "url": "https://skilldrills.online/ja/drills/fps/micro-correction-precision",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "初期フリック後の微小な位置ズレ修正、指先減速制御、ヘッドショット精度を鍛える無料ブラウザFPSエイムトレーナー。"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "マイクロフリック 練習",
    "url": "https://skilldrills.online/ja/drills/fps/micro-correction-precision",
    "description": "初期フリック後の微小な位置ズレ修正、指先減速制御、ヘッドショット精度を鍛える無料ブラウザFPSエイムトレーナー。",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Micro Correction"],
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
        "name": "FPSエイムにおける「マウス減速制御（Deceleration Control）」とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "マウス減速制御とは、初期の弾道フリック後にマウスパッドの摩擦と指先の微小な下向き圧力を利用して、照準を行き過ぎ（オーバーシュート）させずにピタリと目標上で停止させる運動技能です。"
        }
      },
      {
        "@type": "Question",
        "name": "タクティカルシューターで標的を行き過ぎてしまう（オーバーフリック）主な原因は何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "初速の加速力に対して手首や指先の拮抗筋ブレーキが不足していること、または極端に高すぎるeDPIが原因です。目標の手前で意図的に減速をかける練習が必要です。"
        }
      },
      {
        "@type": "Question",
        "name": "二段階運動モデル（Two-Component Aiming Model）は微調整エイムをどう説明していますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Woodworth（1899）およびMeyerら（1988）が提唱した理論で、人間の照準運動は「距離の大部分を跳躍する一次弾道インパルス」と「着弾直前の視覚フィードバックによる微小修正」の二段階で完結します。"
        }
      },
      {
        "@type": "Question",
        "name": "VALORANTやCS2のプロ選手はマイクロフリックをどのように練習していますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "プロ選手はプリエイムからの数ピクセル〜数十ピクセルの微小なズレを指先（つまみ持ち・つかみ持ち）の関節屈伸のみで瞬時に補正する高密度なマイクロアジャスト訓練を日常的に行っています。"
        }
      },
      {
        "@type": "Question",
        "name": "射撃前の「標的確認（Target Confirmation）」とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "クロスヘアが標的中心（頭部）に合致したことを視覚的に確認してからクリックするプロセスです。確認を怠った早撃ちはアンダーシュートや無駄撃ちの原因になります。"
        }
      },
      {
        "@type": "Question",
        "name": "マイクロフリック訓練でヘッドショット率は向上しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "大幅に向上します。実戦の撃ち合いで初弾フリックが頭部から数ミリずれた際、即座に修正してワンタップをねじ込むリカバリー率が劇的に上がります。"
        }
      },
      {
        "@type": "Question",
        "name": "モニターのリフレッシュレートやマウスのポーリングレートは微調整に影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "極めて大きく影響します。高リフレッシュレート（144Hz/240Hz）と1000Hz以上のポーリングレートは入力遅延と表示カクつきを抑え、数ミリ秒単位の微細な指先補正を視覚的に正確に反映させます。"
        }
      },
      {
        "@type": "Question",
        "name": "マイクロフリックの練習頻度はどのくらいが最適ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "毎日15〜20分間、他のフリックやトラッキングドリルと組み合わせて行うのが最適です。神経系の疲労を避け、高い集中力で行うことが微細運動技能の定着に繋がります。"
        }
      },
      {
        "@type": "Question",
        "name": "マウスの持ち方（グリップスタイル）は指先微調整にどう影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "かぶせ持ち（Palm Grip）は手首と腕主導になり指先が固定されるため微調整が難しくなります。つかみ持ち（Claw）やつまみ持ち（Fingertip）は指の関節がフリーなため、微小なエイム修正に最も適しています。"
        }
      },
      {
        "@type": "Question",
        "name": "このドリルでミスやタイムアウトになるとコンボがリセットされるのはなぜですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "スピードだけでなく極限の正確性を強制するためです。ミスにペナルティを課すことで、実戦さながらの緊張感の中で冷静に照準を合わせる神経規律を養います。"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "エイム微調整・マイクロフリックの4段階練習手順",
    "description": "一次フリックの減速と指先による高精度な位置修正を習得するための科学的トレーニングステップ。",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "ゲーム内感度のキャリブレーション",
        "text": "普段プレイしているゲームのDPI・ゲーム内感度をセッション設定で一致させ、1:1の生入力を確保します。"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "アンカーターゲットへの一次フリック",
        "text": "大きく出現したアンカーターゲットへ素早く照準を飛ばしてクリックし、二次マイクロターゲットを出現させます。"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "パッド摩擦による急減速（ブレーキング）",
        "text": "アンカー周辺でマウスパッドの摩擦と下向き圧力を効かせ、マウスの慣性を急停止させて行き過ぎを防ぎます。"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "指先によるマイクロ微調整と着弾確認",
        "text": "指先の関節を微小に動かしてクロスヘアをマイクロターゲットの中心に吸い付かせ、確認してクリックします。"
      }
    ]
  };

  const microCorrectionGuide = {
    heading: "マイクロフリック 練習 実践マニュアル",
    subtitle: "一次フリック直後の微小な位置ズレ修正、終末摩擦減速、そしてヘッドショット精度を科学的プロトコルで極める",
    intro: [
      "マイクロフリック（Micro-Correction Aiming）は、初速のフリックが標的のわずか数ピクセル横に着弾した際、瞬時にその誤差を修正して頭部を撃ち抜くFPSの最重要リカバリースキルです。VALORANTやCS2などのタクティカルFPSでは、初弾のフリック精度以上に、ズレた照準をミリ秒単位で微調整する速度が勝敗を決定します。",
      "Robert S. Woodworth（1899）およびDavid E. Meyerら（1988）が提唱した目標指向運動の二段階モデルによれば、人間の腕運動は「距離を稼ぐ開ループ弾道インパルス」と「目標近傍での閉ループ視覚微調整」に明確に分かれます。さらにSusana Martinez-Condeら（2004）やMartin Rolfs（2009）の微小眼球運動（マイクロサッカード）研究が示すように、視覚情報が中心窩で確定する直前の神経フィードバックが不可欠です。",
      "Paul M. Fitts（1954）の運動難易度法則に照らすと、極小サイズのターゲットを狙う作業は難易度指数（ID）が跳ね上がります。本ドリルはアンカーとマイクロターゲットの二連続撃破を通じて、慣性を急停止させる終末減速ブレーキと指先関節の精密な独立制御を徹底的に鍛え上げます。",
      "計測精度について：本ドリルはブラウザの performance.now() 高分解能タイマーを用い、端末内で完結してミリ秒単位で処理されます。ディスプレイの表示更新周期（60Hz/144Hz/240Hz）による物理的表示差が生じるため、5ms未満の微小な誤差はハードウェア測定ノイズとして考慮してください。"
    ],
    benchmarks: {
      title: "マイクロ補正レイテンシ & 微調整精度 ベンチマーク基準",
      headers: ["スキル帯", "平均微修正時間", "マイクロ命中率", "実戦における競技的影響"],
      rows: [
        ["Tier 1（プロ・レディアント級）", "140 ms 未満", "95% – 99%+", "フリックと一体化した無意識の指先微修正；初弾ヘッドショット率の極大化"],
        ["Tier 2（イモータル・マスター級）", "140 – 190 ms", "88% – 95%", "卓越した減速制御；ズレたエイムを即座にリカバーして撃ち合いを制す"],
        ["Tier 3（ダイヤ・アセンダント級）", "190 – 250 ms", "80% – 88%", "堅実な微調整；手首の余計な力みにより数回に一度オーバーシュートが発生"],
        ["Tier 4（ゴールド・プラチナ級）", "250 – 340 ms", "70% – 80%", "減速が甘く目標を行き過ぎてから戻す「二重修正」による撃ち負け"],
        ["Tier 5（シルバー以下ビギナー）", "340 ms 以上", "70% 未満", "指先を使えず腕だけで微調整しようとするため微小ターゲットを外しやすい"]
      ],
      note: "平均微修正時間はアンカー着弾から二次マイクロターゲット有効打までの経過時間を示します（Woods et al., 2015）。"
    },
    techniques: {
      title: "マイクロフリック精度を最大化する生体力学テクニック",
      items: [
        {
          name: "指先関節を活用した微小ストローク（フィンガーチップ制御）",
          desc: "数ピクセルの微調整を手首や前腕で行おうとせず、マウスを把持する親指・薬指・小指の関節の伸縮でマウスを微妙にスライドさせます。",
          tips: "手のひらの後部をマウスパッドに軽くアンカーさせ、指先だけを自由に動かせる姿勢を保ちます。"
        },
        {
          name: "マウスパッド摩擦による能動的ブレーキング（摩擦減速）",
          desc: "アンカー着弾の直前、小指側または親指側にわずかな下向き圧力を加えてマウスソールとパッドの摩擦を急増させ、余計な慣性を遮断します。",
          tips: "力を入れすぎると次の微小修正が固まるため、0.1秒だけ軽くブレーキをかけてすぐに脱力します。"
        },
        {
          name: "着弾前の視覚的確信（ターゲットコンファメーション）",
          desc: "クロスヘアがマイクロターゲットの境界内に確実に入ったことを中心窩で捉えてからクリックする規律を徹底します（Rolfs, 2009）。",
          tips: "当たる前に反射で左クリックを押してしまう早撃ち癖を意識的に排除します。"
        },
        {
          name: "アンカー・マイクロ間の一定リズム確立",
          desc: "「タン・タン」という二拍子のリズムをメトロノームのように体内時計で刻み、運動ループの再現性を高めます。",
          tips: "リズムを一定に保つことで、過剰な緊張下でも筋肉の過緊張（フリーズ）を防げます。"
        }
      ]
    },
    steps: [
      "普段プレイしているゲームの感度・DPIを設定し、ポインターロックを有効化します。",
      "画面に出現する大きなアンカーターゲットへ素早くフリックしてクリックします。",
      "アンカー撃破と同時にマウスを急減速させ、隣に出現する小さなマイクロターゲットへ指先で照準を合わせます。",
      "中心点に合致したことを確認してクリックし、高得点ボーナスを獲得します。",
      "ミスによるコンボ途切れを防ぎながら、レベル進行による極小ターゲットへの対応力を磨きましょう。"
    ],
    audience: "VALORANT、Counter-Strike 2、Rainbow Six Siege、Apex Legendsなどで、ヘッドショット率を劇的に引き上げたいすべての競技FPSプレイヤー。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'martinezConde2004', 'rolfs2009', 'woodworth1899'),
    related: [
      { href: "/ja/drills/fps/flick-shot-training", label: "フリック エイム 練習" },
      { href: "/ja/drills/fps/target-acquisition", label: "ターゲット捕捉 エイム練習" },
      { href: "/ja/drills/fps/target-prioritization", label: "ターゲット優先度 エイム練習" },
      { href: "/ja/drills/fps/target-switching-swarm", label: "ターゲット スイッチング エイム練習" }
    ]
  };

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <MicroCorrectionClient
        copy={{
          h1Keyword: "マイクロフリック 練習",
          h1Suffix: " - エイム微調整・ヘッドショット精度トレーナー",
          statScore: "スコア",
          statTime: "残り時間",
          statAccuracy: "命中率",
          statBestScore: "自己ベスト",
          statAvgCorrection: "平均微修正",
          statMaxCombo: "最大コンボ",
          statPeakLevel: "最高レベル",
          startTitle: "マイクロフリック 練習",
          startSubtitle: "生入力キャリブレーション • エンドレス難易度進行",
          getReady: "準備完了",
          toggleFlash: "ミスフラッシュ切替",
          toggleSound: "効果音切替",
          pausedTitle: "一時停止中",
          pausedSubtitle: "クリックして再開 — カーソルロックが再適用されます",
          stageCaption: "アンカーターゲットをクリック後、瞬時に微小ターゲットへ照準を微調整して射撃してください。",
          rulesTitle: "ドリル手順 & スコアリングシステム",
          rulesItems: [
            { num: "1", text: "アンカーターゲット命中", highlight: "+10点 (+0.2秒)", result: "次のマイクロターゲットをアンロック" },
            { num: "2", text: "マイクロターゲット命中", highlight: "最大+585点 (+0.2秒)", result: "微調整精度とコンボ倍率でボーナス加算" },
            { num: "3", text: "レベル進行", highlight: "1,400点ごとに+1レベル", result: "ターゲットサイズが段階的に縮小" },
            { num: "4", text: "ミス / タイムアウト", highlight: "ペナルティ", result: "コンボがリセットされます" }
          ],
          aboutTitle: "マイクロフリック 練習について",
          aboutHeading: "マイクロフリック（微調整エイム）とは？",
          aboutText: "ほとんどのエイム動作は単一ではなく二段階で構成されます。初速の素早い弾道フリックと、着弾直前の微小な減速・位置修正動作です（Woodworth, 1899; Meyer et al., 1988）。本ドリルはこの勝敗を決定づける「第2フェーズ（微調整）」を集中的に鍛え上げます。"
        }}
      />

      <DrillGuide guide={microCorrectionGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/micro-correction-precision"
          locale="ja"
        />
      </div>
    </>
  );
}
