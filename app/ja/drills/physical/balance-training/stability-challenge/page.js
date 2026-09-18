import StabilityChallengeClient from '@/app/drills/physical/balance-training/stability-challenge/StabilityChallengeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Japan (JP / JA)
// Primary Intent: エイム 安定させる, マウス 安定性 テスト, エイム ぶれ 矯正, リコイル 練習 ブラウザ
// Target Queries:
//   - "エイム 安定 練習 ブラウザ" (Aim stability browser practice)
//   - "マウス 安定性 テスト" (Mouse stability test online)
//   - "エイム ぶれ 矯正 トレーニング" (Aim shake correction training)
//   - "リコイル 反動制御 練習" (Recoil control practice)
//   - "マウス 手ブレ 補正 訓練" (Hand tremor compensation drill)
//   - "平衡感覚 テスト オンライン" (Sense of balance test online)
// ============================================================

export const metadata = {
  title: "エイム安定化・マウスブレ矯正テスト – 無料姿勢制御＆反動制御練習 | SkillDrills",
  description: "無料オンラインマウス安定性テスト。不規則な風圧・外力ベクトルに抗してレティクルを中央サークル内に維持し、FPSの反動制御（リコイル）と手ブレ抑制・平衡感覚を科学的に鍛えます。",
  keywords: [
    "エイム 安定 練習 ブラウザ",
    "マウス 安定性 テスト",
    "エイム ぶれ 矯正",
    "valorant エイム 安定",
    "リコイル 練習 ブラウザ",
    "マウス 手ブレ 補正 fps",
    "平衡感覚 テスト オンライン",
    "反動制御 練習",
    "エイム 安定させる",
    "外力抵抗 エイム練習"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/physical/balance-training/stability-challenge',
    languages: getAlternateLanguages('/drills/physical/balance-training/stability-challenge'),
  },
  openGraph: {
    title: "エイム安定化・マウスブレ矯正テスト – 無料姿勢制御＆反動制御練習 | SkillDrills",
    description: "無料オンラインマウス安定性テスト。不規則な風圧・外力ベクトルに抗してレティクルを中央サークル内に維持し、FPSの反動制御（リコイル）と手ブレ抑制・平衡感覚を科学的に鍛えます。",
    url: 'https://skilldrills.online/ja/drills/physical/balance-training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "エイム安定化・マウスブレ矯正テスト – 無料姿勢制御＆反動制御練習 | SkillDrills",
    description: "無料オンラインマウス安定性テスト。不規則な風圧・外力ベクトルに抗してレティクルを中央サークル内に維持し、FPSの反動制御（リコイル）と手ブレ抑制・平衡感覚を科学的に鍛えます。",
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
      "name": "身体・運動訓練ハブ",
      "item": "https://skilldrills.online/ja/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "バランストレーニング",
      "item": "https://skilldrills.online/ja/drills/physical/balance-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "エイム安定化・マウスブレ矯正テスト",
      "item": "https://skilldrills.online/ja/drills/physical/balance-training/stability-challenge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "エイム安定化・マウスブレ矯正テスト",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "不規則な外力ベクトルや風圧抵抗に抗してレティクルを中央リング内に安定維持する、無料のブラウザ型エイム安定化・姿勢平衡測定ツール。",
  "url": "https://skilldrills.online/ja/drills/physical/balance-training/stability-challenge",
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
  "name": "エイム安定化・マウスブレ矯正トレーナー",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser with Pointer Lock support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/physical/balance-training/stability-challenge",
  "inLanguage": "ja",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "スタビリティチャレンジ - マウスブレ矯正ゲーム",
  "url": "https://skilldrills.online/ja/drills/physical/balance-training/stability-challenge",
  "description": "ランダムな外力ベクトルに抗して照準を中央サークルに保持し続ける、精密マウス制御＆FPSリコイル安定化ゲーム。",
  "genre": [
    "Action",
    "Precision Drill",
    "Balance Training",
    "Motor Control"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop"
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
      "name": "エイム安定化・マウスブレ矯正テストではどのような能力を測定しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "外乱ベクトルに抗してカーソルを一定範囲内に維持する姿勢平衡制御能（Postural Equilibrium）、前腕の拮抗筋共収縮（Co-contraction）、および150〜200ms周期で発生する閉ループ視覚フィードバック微細修正能力を総合的に測定します。"
      }
    },
    {
      "@type": "Question",
      "name": "ドリル内の動的な風圧外力ベクトルはどのように作用しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "セッション中、ランダムな方向と強さを持つ加速度ベクトルが照準を中心に押し出そうと作用し続けます。プレイヤーはこの外力を相殺するため、反対方向へ滑らかで均一な逆補正マウス入力を継続する必要があります。"
      }
    },
    {
      "@type": "Question",
      "name": "姿勢平衡感覚と外乱抵抗の生体力学的メカニズムとは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ナシュナーとマッカラム（Nashner & McCollum, 1985）の姿勢シナジーモデル、およびデビッド・ウィンター（Winter, 1995）の平衡力学に基づきます。中枢神経系は予期せぬ外乱が生じた際、関節トルクをミリ秒単位で調節して重心の逸脱を防ぎます。"
      }
    },
    {
      "@type": "Question",
      "name": "レベル進行に伴いセーフサークルと外力強度はどのように変化しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "250ポイント獲得ごとにレベルが上昇します。中央セーフゾーンの半径は初期の45pxから最小20pxまで縮小し、外力の推進力は250単位から最大850単位まで激化して極限のマイクロエイム制御が要求されます。"
      }
    },
    {
      "@type": "Question",
      "name": "レティクルがセーフゾーンから外れた場合、どのようなペナルティがありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "リング外へ逸脱すると画面外周に赤い警告フラッシュが点滅し、累積していたコンボ倍率が即座に1.0倍へリセットされます。ただし獲得スコアの減点や制限時間（45秒）の減少はないため、即座に中央へリカバリー可能です。"
      }
    },
    {
      "@type": "Question",
      "name": "ウッドワースの閉ループ制御モデルは継続的なエイム維持にどう応用されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ロバート・ウッドワース（Woodworth, 1899）は、標的運動が初期の弾道的インパルスとそれに続く連続的な視覚的フィードバック（Current Control）で完結すると提唱しました。本ドリルでは常に微細誤差を検知して修正する閉ループ制御が鍛えられます。"
      }
    },
    {
      "@type": "Question",
      "name": "この練習はVALORANTやApex、CS2のリコイル制御に効果がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "極めて高い効果があります。FPSの銃撃反動（スプレーパターン）はレティクルを一定のベクトルで跳ね上げます。絶え間ない外力に抗して滑らかにマウスを引き下げる練習は、ブレのないリコイル制御マッスルメモリーを定着させます。"
      }
    },
    {
      "@type": "Question",
      "name": "外力に抗して安定したエイムを保つための最適なマウス感度（DPI）と持ち方は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "400〜800 DPI基準の中低感度（振り向き30〜45cm）が推奨されます。低感度は外力急変時の手ブレや過剰修正（オーバーシュート）を物理的に抑制し、手首だけでなく前腕全体をマウスパッドに接地させるかぶせ持ち・つかみ持ちが安定します。"
      }
    },
    {
      "@type": "Question",
      "name": "高負荷の外力抵抗時に前腕の疲労や筋肉の力みを防ぐコツは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "マウスを過度に握り込まず、前腕の屈筋と伸筋に適度なバランス張力を保つことが大切です。手首関節を過度に曲げず、マウスパッドの表面摩擦（ストッピング力）を利用して静止ブレーキをかける技術を意識してください。"
      }
    },
    {
      "@type": "Question",
      "name": "本テストは完全無料で、個人データの送信や登録は不要ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。SkillDrillsのスタビリティテストは登録不要・完全無料です。すべてのスコアと測定結果はブラウザのlocalStorage内でのみ安全に保持され、外部サーバーへ送信されることは一切ありません。"
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "マウス安定化＆外乱抵抗 4ステップ実践トレーニングガイド",
  "description": "動的な外力ベクトルを相殺しセーフゾーン内でコンボ倍率を最大化する科学的エイム安定化手順。",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "ポインターロック有効化とレティクルの中央配置",
      "text": "開始ボタンをクリックしてポインターロックを有効化し、照準を緑色の中央セーフリング内に静止させます。",
      "url": "https://skilldrills.online/ja/drills/physical/balance-training/stability-challenge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "外力ベクトルの知覚と逆方向カウンターグライド",
      "text": "風圧が照準を押し流す方向と強さを視覚的に捉え、真逆の方向へ均一な力でマウスを引き寄せて中央を維持します。",
      "url": "https://skilldrills.online/ja/drills/physical/balance-training/stability-challenge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "中央維持の継続による最大3.0倍コンボの構築",
      "text": "リング外へ逸脱することなくセーフサークル内に滞在し続けることで、コンボ倍率を最大3.0倍まで上昇させてハイスコアを狙います。",
      "url": "https://skilldrills.online/ja/drills/physical/balance-training/stability-challenge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "サークル縮小と突風加速に対応する微細ブレーキング",
      "text": "後半のレベル12以上でサークルが20pxに狭まり外力が850単位まで強まった際、指先の垂直摩擦圧を利用してオーバーシュートを抑えます。",
      "url": "https://skilldrills.online/ja/drills/physical/balance-training/stability-challenge#step-4"
    }
  ]
};

const stabilityGuideJa = {
  heading: "マウスエイム安定化＆外力抵抗 生体力学ベンチマークガイド",
  subtitle: "姿勢シナジー、閉ループ微細逆補正、そして手ブレを抑制する拮抗筋共収縮の科学",
  intro: [
    "スタビリティチャレンジ（Stability Challenge）は、画面中心からレティクルを絶え間なく押し流そうとする動的外乱（外力ベクトル）に対し、照準を中心部に正確に固定し続けるフィードバック連続修正トレーニングです。単発的なフリックショットとは異なり、45秒間にわたり変化し続ける力の方向と大きさを大脳の視覚・運動野でリアルタイムに相殺する必要があります。",
    "生体運動学において、人間の目標追従運動はロバート・ウッドワース（Woodworth, 1899）の『2段階モデル』に従います。初期の弾道的インパルスの後、150〜200ms周期の閉ループ（Closed-loop）視覚フィードバックにより微細な誤差修正が完結します。ナシュナーとマッカラム（Nashner & McCollum, 1985）の姿勢シナジー理論およびデビッド・ウィンター（Winter, 1995）の関節トルク制御力学によれば、不規則な外乱に動じないためには主動筋と拮抗筋のバランスの取れた共収縮（Co-contraction）が不可欠です。",
    "ポール・フィッツ（Fitts, 1954）の運動困難度法則（Fitts's Law）が示す通り、目標エリアの直径が半減すると要求される神経筋制御難易度は対数関数的に跳ね上がります。本ドリルはレベル進行に伴いセーフサークルを45pxから20pxまで段階的に絞り込み、押し出す外力を250から850単位まで加速させることで、FPSプロレベルの微細制動力と盤石なリコイル抑制マッスルメモリーを構築します。",
    "測定精度およびハードウェア案内: 本ドリルはブラウザの高解像度タイマー performance.now() を使用し、ミリ秒単位で内部計算されています。ディスプレイのリフレッシュレート（60Hzで16.7ms / 144Hzで6.9ms / 240Hzで4.1ms）やマウスのポーリングレート（125Hz vs 1000Hz）により微小な物理遅延が生じるため、5ms未満の差異は測定ノイズとしてご理解ください。すべての記録はブラウザ内にのみ安全に保存されます。"
  ],
  benchmarks: {
    title: "マウス安定性＆姿勢平衡制御 5段階ベンチマーク基準",
    headers: ["ティア・ランク", "称号 (Rank)", "目標スコア", "到達レベル", "セーフゾーン維持率", "神経筋安定性プロファイル"],
    rows: [
      ["Tier 1: 頂点スタビライザー", "Apex Stabilizer", "15,300点以上", "Level 12 – 15", "94%以上 維持", "プロ級の拮抗筋共収縮とミリ秒単位の微細制動ブレーキ完成 (Nashner & McCollum, 1985)"],
      ["Tier 2: マスターアンカー", "Master Anchor", "12,000 – 15,299点", "Level 9 – 11", "86 – 93% 維持", "優れた外力相殺反応速度とブレのない中心レティクル保持力 (Winter, 1995)"],
      ["Tier 3: 熟練カウンター", "Proficient Counterer", "9,500 – 11,999点", "Level 6 – 8", "75 – 85% 維持", "一般的な競技ランク上位相当の平衡感覚と良好な軌道復帰力"],
      ["Tier 4: 中級コア", "Intermediate Core", "6,000 – 9,499点", "Level 3 – 5", "60 – 74% 維持", "外力急変時に一時的なレティクル逸脱が発生、前腕ブレーキ強化を推奨"],
      ["Tier 5: 入門・ブレ発生", "Novice Perturbed", "6,000点未満", "Level 1 – 2", "60%未満 維持", "手首の力みや過剰修正（オーバーシュート）が頻発、感度・持ち方の見直しが必要"]
    ],
    note: "姿勢外乱制御力学（Nashner & McCollum 1985; Winter 1995）および閉ループ運動制御研究（Woodworth 1899; Woods et al. 2015）を統合したエイム安定性標準規格です。"
  },
  techniques: {
    title: "エイムのブレを抑制し制動力を最大化する実践プロトコル",
    items: [
      {
        name: "前腕拮抗筋の共収縮 (Antagonist Co-contraction)",
        desc: "ナシュナーとマッカラム（1985）のシナジーモデルによれば、不規則な外力を受け止めるには前腕の屈筋と伸筋の双方に適度な張力を与え、手首の剛性を高めることが効果的です。",
        tips: "マウスを指先だけで握り込まず、前腕全体に20〜30%の軽やかな緊張感を保つことで外乱の衝撃を吸収してください。"
      },
      {
        name: "閉ループ視覚フィードバック制御 (Closed-loop Visual Current Control)",
        desc: "ウッドワース（1899）が解明した通り、レティクルを一定位置に留める動作は1回限りの判定ではなく、150〜200ms周期の連続的な誤差修正です。",
        tips: "照準の点だけを凝視するのではなく、中央サークルと照準の『隙間の幅』を意識してわずかな逸脱を瞬時に検知してください。"
      },
      {
        name: "中低感度(eDPI)による物理的安定性の確保",
        desc: "高感度は手ブレや筋肉の微小振動（Tremor）を画面上に増幅させ、外力への過剰反応（オーバーシュート）を招きます。",
        tips: "400〜800 DPI基準で振り向き30〜45cmの低めの感度を設定し、前腕とパッドの接触面積を広げて摩擦安定性を得てください。"
      },
      {
        name: "マウスパッドの垂直摩擦制動 (Vertical Downward Braking)",
        desc: "外力が激化する高レベル帯では、腕の水平移動力だけで瞬時にピタッと止めることは困難です。",
        tips: "方向転換の瞬間、手のひらの付け根や指先でマウスをマウスパッドに向けて軽く押し下げ、摩擦抵抗を利用して瞬時に制動をかけてください。"
      }
    ]
  },
  steps: [
    "ゲーム内の実戦感度とDPIを統一し、ポインターロックをオンにします。",
    "画面中央の緑色セーフサークル内にレティクルを安定して構えます。",
    "風圧外力が照準を押し流す瞬間、流される方向と正反対へマウスを優しく引き戻して相殺します。",
    "サークル内に照準を留め続け、コンボ倍率を最大3.0倍まで上昇させてスコアを加速させます。",
    "サークル縮小と突風が激化する終盤は、パッドへの押し付け摩擦ブレーキを活かして離脱を防ぎます。"
  ],
  audience: "VALORANT、Apex Legends、CS2でリコイルが安定しない方、マウスの微細な手ブレに悩むプレイヤー、および精密な手の安定性と平衡感覚を高めたいすべてのゲーマー。",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('nashner1985', 'winter1995', 'woodworth1899', 'fitts1954', 'woods2015'),
  related: [
    { href: "/ja/drills/physical/coordination/complex-pattern", label: "複合パターン運動協調ドリル" },
    { href: "/ja/drills/physical/coordination/cross-body-movement", label: "クロスボディ運動協調ドリル" },
    { href: "/ja/drills/physical/reflex-training/reaction-chain", label: "連続反射神経・インパルス停止ドリル" },
    { href: "/ja/drills/physical/reflex-training/quick-dodge", label: "瞬間回避・反射スピードドリル" }
  ]
};

export default function StabilityChallengeJaPage() {
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
      <StabilityChallengeClient
        copy={{
          title: "エイム安定化・マウスブレ矯正テスト",
          subtitle: "外力ベクトル相殺＆レティクル微細制動トレーニング",
          rules: [
            { title: "中央セーフゾーンの死守", text: "ランダムに押し寄せる外力（風圧抵抗）に抗い、照準を中央のセーフリング内に維持してください。" },
            { title: "コンボ倍率加速システム", text: "セーフゾーン内でブレずに維持するほどコンボ倍率が最大3.0倍まで上昇し、スコアが加速します。" },
            { title: "動的難易度スケール", text: "250点ごとにレベルが上昇し、セーフサークルが縮小しながら外力の推進力が段階的に強化されます。" },
            { title: "逸脱時のコンボリセット", text: "ゾーン外へ押し出されるとコンボは即座に1.0倍へリセットされますが、制限時間やスコアの減点はありません。" }
          ],
          aboutTitle: "スタビリティチャレンジの概要",
          aboutHeading: "マウスエイムのブレ矯正と姿勢平衡制御",
          aboutText: "本ドリルは、照準を中心から押し流そうとする動的外力ベクトルを瞬時に知覚し、正確に反対方向へ逆補正入力を加えてレティクルを固定する神経筋制御トレーニングです。VALORANT、Apex Legends、CS2のリコイル制御や手ブレ防止に直結します。"
        }}
      />
      <DrillGuide guide={stabilityGuideJa} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/balance-training/stability-challenge"
          locale="ja"
        />
      </div>
    </>
  );
}
