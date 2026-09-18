import InstantResponseClient from '@/app/drills/fps/instant-response/InstantResponseClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "FPS 反応速度 テスト – クリック反射神経測定 | SkillDrills",
  description: "ブラウザで無料測定できるFPS反応速度テスト。視覚刺激検知からクリックまでの反射神経潜時（ms）をミリ秒単位で精密測定し、フェイントを見極める射撃自制心と置きエイム反応を科学的に強化します。",
  keywords: [
    "FPS 反応速度 テスト",
    "反応速度 テスト FPS",
    "エイム 反応速度 測定",
    "反射神経 テスト ゲーム",
    "VALORANT 反応速度 テスト",
    "CS2 反応速度",
    "クリック 反応速度",
    "エイムトレーナー 無料",
    "トリガー 反応速度",
    "FPS 反射速度 測定",
    "インスタント エイム",
    "置きエイム 反応速度"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/fps/instant-response",
    languages: getAlternateLanguages('/drills/fps/instant-response'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FPS 反応速度 テスト – クリック反射神経測定 | SkillDrills",
    description: "視覚刺激に対する反射神経とクリック反応速度をミリ秒単位で測定。置きエイムと飛び出し反応を高める無料ブラウザFPS反射神経トレーナー。",
    url: "https://skilldrills.online/ja/drills/fps/instant-response",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "FPS 反応速度 テスト – クリック反射神経測定 | SkillDrills",
    description: "視覚刺激に対する反射神経とクリック反応速度をミリ秒単位で測定。置きエイムと飛び出し反応を高める無料ブラウザFPS反射神経トレーナー。",
  },
};

export default function InstantResponseJaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "FPSエイム練習", "item": "https://skilldrills.online/ja/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "FPS 反応速度 テスト", "item": "https://skilldrills.online/ja/drills/fps/instant-response" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FPS 反応速度 テスト",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "視覚刺激認知、神経伝達潜時、クリック反射速度をミリ秒単位で高精度測定・訓練する無料ブラウザFPS反射神経ドリル。",
    "genre": "FPS Training / Reaction Speed",
    "url": "https://skilldrills.online/ja/drills/fps/instant-response",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FPS 反応速度 テスト",
    "url": "https://skilldrills.online/ja/drills/fps/instant-response",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "ブラウザ上で動作する高精度FPS反応速度測定テスト。フェイント刺激を見極めつつ最速クリック反応を鍛えます。"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "FPS 反応速度 テスト",
    "url": "https://skilldrills.online/ja/drills/fps/instant-response",
    "description": "視覚刺激認知、神経伝達潜時、クリック反射速度をミリ秒単位で高精度測定・訓練する無料ブラウザFPS反射神経ドリル。",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Reaction Trainer", "Aim Trainer"],
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
        "name": "FPSにおける反応速度（リアクションタイム）とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "画面上に敵が出現してからマウスをクリックするまでの時間差（ミリ秒）です。網膜での光刺激受容、視神経伝達、視覚野および運動野での情報処理、運動ニューロン伝達、指のスイッチ押下までの神経筋全行程を含みます。"
        }
      },
      {
        "@type": "Question",
        "name": "プロゲーマーの平均反応速度はどのくらいですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "一般成人の単純視覚反応速度が220〜260ms程度であるのに対し、高リフレッシュレート環境（144Hz〜360Hz）で鍛錬を積んだFPSプロ選手は165〜195msを安定して記録します。高度に集中した状態では160ms未満に達することもあります。"
        }
      },
      {
        "@type": "Question",
        "name": "反応速度はトレーニングによって短縮できますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい。生来の神経伝達速度そのものは大きく変わりませんが、視覚刺激に対する脳内シナプス経路の強化や、迷いを排除する運動準備電位の最適化により、20〜40ms前後の反応速度短縮が可能です。"
        }
      },
      {
        "@type": "Question",
        "name": "単純反応時間と選択反応時間の違いは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1868年にドンデルスが提唱した分類で、単一の刺激に対して単一の決まった動作を行うのが単純反応時間（Type A）です。複数の刺激を識別して判断を挟む選択反応時間（Type B）は、ヒックの法則に従って判断遅延が加わります。"
        }
      },
      {
        "@type": "Question",
        "name": "人間の視覚反応速度の生物学的限界は何ミリ秒ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "網膜光受容（30〜50ms）、皮質刺激評価（50〜70ms）、皮質脊髄伝達（20〜30ms）、筋肉の電気機械遅延（約30ms）の生理学的制約により、無予測状態での人間の生物学的限界は約130〜150msとされています。"
        }
      },
      {
        "@type": "Question",
        "name": "モニターのリフレッシュレートやマウスポーリングレートは影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "極めて大きく影響します。60Hzモニターのフレーム表示間隔は約16.7msですが、240Hzでは約4.16msとなりハードウェア遅延が12.5ms短縮されます。また、1000Hzのマウスは1msごとに座標更新を行うため、入力ジッターが最小限に抑えられます (Woods et al., 2015)。"
        }
      },
      {
        "@type": "Question",
        "name": "早期射撃（ヤマ張り・プリファイア）はなぜ減点されるのですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "視覚認知を待たずにタイミング予測だけでクリックすると、実戦で敵のフェイントや飛び出しのタイミングのズレに対応できなくなります。本ドリルではランダムな待機時間と薄いフェイント光を導入し、確実な視認後クリックを徹底させています。"
        }
      },
      {
        "@type": "Question",
        "name": "睡眠不足や疲労は反応速度にどれほど悪影響を及ぼしますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "睡眠不足や認知疲労はノルアドレナリン神経系を鈍化させ、反応潜時を40〜80ms程度悪化させます。これは中程度の飲酒状態に匹敵するパフォーマンス低下です。"
        }
      },
      {
        "@type": "Question",
        "name": "VALORANTやCS2の「置きエイム」で勝つためのコツは？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "角から飛び出してくる敵には「飛び出し側有利（Peeker's Advantage）」が働くため、自分の反応速度に合わせてクロスヘアを壁から少し離して置く（オフセット配置）ことが勝率を安定させる極意です。"
        }
      },
      {
        "@type": "Question",
        "name": "試合前の最も効果的な反射神経ウォーミングアップは？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "指先と手首の軽いストレッチ3分、本ドリルでの単純反射刺激ウォームアップ5分、その後の実戦マイクロフリック2分という10分間のルーティンが最も神経系を目覚めさせます。"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "FPS反応速度の正確な測定・訓練方法",
    "description": "視覚反応速度とトリガー反射を正確に測定・強化するステップバイステップ手順。",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "感度設定とポインタロックの固定",
        "text": "セッション設定でゲーム感度を合わせ、「ドリル開始」をクリックしてPointer Lockを有効化します。"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "中心レティクルへの視線固定と脱力",
        "text": "前腕の余計な筋緊張を抜き、中心の照準レティクルへ集中した柔らかい視線を置きます。"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "トリガースイッチへの指先プリロード",
        "text": "人差し指をクリックボタンの作動直前位置に軽く触れさせ、キーストロークの空走距離をゼロにします。"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "真のフラッシュ視認時のみ即座にクリック",
        "text": "ランダムな待機時間後の緑色点灯を捉えた瞬間にクリックし、薄いフェイント光には動じない自制心を保ちます。"
      }
    ]
  };

  const instantResponseGuide = {
    heading: "FPS 反応速度 テスト ガイド & 精神時間測定指標",
    intro: [
      "FPS 反応速度 テストは、FPSにおける純粋な感覚運動反射潜時（Mental Chronometry）を客観測定・研ぎ澄ますための科学的トレーニングドリルです。VALORANTやCS2などのタクティカルシューターにおいて、置きエイムの勝敗はコンマ数秒の反応速度で決します。",
      "精神時間測定学の基礎はオランダの眼科医フランシスクス・ドンデルス (1868) の減算法によって確立されました。単一の刺激に対して反射的に指を動かす「単純反応時間（Type A）」は、人間の大脳皮質および中枢神経系が持つ純粋な情報伝達帯域幅をダイレクトに反映します。",
      "本ドリルはHTML5 Pointer Lock API配下でブラウザの performance.now() 高精度タイムスタンプを用いて計測されます (Woods et al., 2015)。照準の移動距離を伴うフリック練習とは異なり、純粋な視覚検知から運動出力までの神経潜時を単離し、ランダム待機時間とフェイント刺激によってヤマ張り（プリファイア）を徹底的に排除します。",
      "測定仕様について：すべてのイベントはお使いの端末の performance.now() 高分解能クロックによって完全にローカルで記録され、外部へスコアが送信されることはありません。ブラウザのタイマー解像度制限（Spectre対策で通常約1ms）およびディスプレイのリフレッシュ間隔（60Hzで約16.7ms、144Hzで約6.9ms、240Hzで約4.1ms）による量子化誤差が生じるため、5ms未満の微小な差異は測定誤差として扱い、他者の環境との比較よりも同一環境での自己記録の推移を重視してください (Woods et al., 2015)。"
    ],
    benchmarks: {
      title: "反応速度 & 感覚運動潜時パフォーマンスティア",
      headers: ["パフォーマンスティア", "測定反応速度 (ms)", "神経筋・生理学的状態", "競技FPSにおける実戦的影響"],
      rows: [
        ["ティア 1 (頂点反射神経)", "130 – 165 ms", "生物学的限界水準：網膜光受容最適化、準備電位の完全確立、超低遅延機器", "標準的な角待ち・置きエイム勝負で飛び出し側の敵をほぼ100%返り討ちにするレベル"],
        ["ティア 2 (競技プロ水準)", "165 – 195 ms", "研ぎ澄まされた覚醒水準、高リフレッシュレート環境（240Hz+）、自動化された運動射撃", "VALORANTレディアント、CS2 Faceit Level 10の上位競技者基準値"],
        ["ティア 3 (上級FPSゲーマー)", "195 – 225 ms", "安定した感覚運動協調、一般的なゲーミング機器（144Hz）、迷いのないクリック判断", "適切なクロスヘア配置により中距離〜遠距離の防衛戦で高いキルレートを維持"],
        ["ティア 4 (平均的ゲーマー)", "225 – 265 ms", "訓練されていない一般成人の基準値、60Hz〜144Hz環境、わずかな認知躊躇", "飛び出し側有利（Peeker's Advantage）に対して角を狭く取らないと撃ち負けやすい"],
        ["ティア 5 (疲労 / 入力遅延)", "265 – 330+ ms", "累積疲労、睡眠不足、高い入力遅延、または不適切な筋緊張", "敵の視認からクリックまでの遅れが目立ち、実戦で先に撃ち抜かれる場面が増加"]
      ],
      note: "数値はドンデルスの単純反応時間モデル（1868）およびデジタルクロノメトリー基準（Woods et al., 2015）に基づく客観的データです。"
    },
    techniques: {
      title: "トリガー反応速度を極限まで高めるための実践プロトコル",
      items: [
        {
          name: "視線集中と中心視野アンカー",
          desc: "画面周辺を漫然と眺めるのではなく、刺激が現れる中央のレティクルへ視線をピンポイントで集中させます。ポズナーの研究 (1990) によれば、空間的注意を集中させることで視覚野の信号統合が15〜25ms高速化します。",
          tips: "目のピントをガチガチに固めず、リラックスした状態で中心を見つめるのがコツです。"
        },
        {
          name: "人差し指のプリトラベル（遊び）除去",
          desc: "クリックする前に人差し指をマウスマイクロスイッチの作動点ギリギリまであらかじめ軽く押し当てておきます。物理的な指の空走距離をなくすことで、20〜35msの機械的遅延を削減できます。",
          tips: "前腕全体に力を入れると逆に初動が遅れるため、指先の第1関節のみを脱力して準備してください。"
        },
        {
          name: "ハードウェア遅延の徹底排除",
          desc: "高リフレッシュレートモニター（144Hz〜360Hz）を使用し、マウスポーリングレートを1000Hz以上に設定、垂直同期（V-Sync）をオフにしてください。ゲーム内のNVIDIA ReflexやAMD Anti-Lagを有効化してレンダリング待ちをゼロにします。",
          tips: "ディスプレイのスケーリング設定をGPUではなくディスプレイ側に任せることで入力遅延を減らせる場合があります。"
        },
        {
          name: "呼吸調整による覚醒水準のコントロール",
          desc: "過度の緊張はフェイントへの誤爆（早期射撃）を引き起こします。ヤーキーズ・ドットソンの法則に基づき、鼻からの深呼吸で自律神経を整え、最適な覚醒ゾーンを維持してください。",
          tips: "光る前に指が勝手に動いてしまう場合は、一度深呼吸して焦りをリセットしましょう。"
        }
      ]
    },
    steps: [
      "セッション設定でお好みの感度を合わせ、入力座標の均一性を確保します。",
      "「ドリル開始」をクリックして全画面表示とPointer Lockを有効化します。",
      "中央の照準レティクルへ集中を保ちながら、指先をスイッチ作動点へ軽く構えます。",
      "緑色フラッシュを視認した瞬間に電光石火のクリックを行い、ランダムな待機時間中の早期射撃を抑えます。",
      "ドリル終了後に平均反応速度（ms）、標準偏差、コンボ継続数を確認し、自己ベストの更新を目指します。"
    ],
    audience: "VALORANTやCS2などで置きエイムの勝率を上げたいプレイヤー、自身の反射神経をミリ秒単位で正確に計測したいゲーマー、そして神経系の瞬発力を磨きたいすべてのシューター競技者。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'posner1990', 'donders1969', 'hick1952'),
    related: [
      { href: "/drills/fps/angle-hold-trainer", label: "置きエイム練習 (クロスヘアプレイスメント)" },
      { href: "/drills/fps/flick-shot-training", label: "フリック エイム 練習" },
      { href: "/drills/fps/180-degree-awareness", label: "180度 振り向き 練習" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "反応速度測定テスト" },
      { href: "/drills/reaction-speed/reflex-training-drill", label: "反射神経トレーニング" }
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
      <InstantResponseClient
        copy={{
          h1Keyword: "FPS 反応速度 テスト",
          h1Suffix: " - 反射神経・クリック反応速度測定",
          statScore: "スコア",
          statTime: "残り時間",
          statAccuracy: "命中率",
          statBestScore: "自己ベスト",
          startTitle: "FPS 反応速度 テスト",
          startSubtitle: "視覚反射潜時 & トリガー速度 • エンドレス難易度進行",
          getReady: "準備完了",
          pausedTitle: "一時停止中",
          pausedSubtitle: "クリックして再開 — カーソルロックが再適用されます",
          stageCaption: "中央ターゲットが緑色にフラッシュした瞬間にクリックしてください。フェイントを見極める自制心が求められます。",
          rulesTitle: "ドリル手順 & スコアリングシステム",
          rulesItems: [
            { num: "1", text: "フラッシュ反応命中", highlight: "+100点", result: "フラッシュ点灯直後に素早くクリック" },
            { num: "2", text: "スピードボーナス", highlight: "最大+150点", result: "150ms未満の超高速反応" },
            { num: "3", text: "レベル難易度進行", highlight: "1,400点ごとに+1レベル", result: "フラッシュ露出時間が段階的に短縮" },
            { num: "4", text: "フェイント & 早期射撃", highlight: "ペナルティ", result: "コンボがリセットされます（設定有効時は-0.8秒）" }
          ],
          aboutTitle: "FPS 反応速度 テストについて",
          aboutHeading: "FPS反応速度トレーニングとは？"
        }}
      />
      <DrillGuide guide={instantResponseGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/instant-response"
          locale="ja"
        />
      </div>
    </>
  );
}
