import TriangularPursuitClient from '@/app/drills/visual-tracking/triangular-pursuit/TriangularPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "三角形追従眼球運動テスト・多角形エイム練習 | SkillDrills",
  description: "三角形幾何学ベクトル軌道を追尾し鋭角コーナーでの補正サッケードを鍛えるアイトラッキング訓練。直線滑動追従と頂点再捕捉を総合強化。無料テスト。",
  keywords: [
    "三角形 追従眼球運動 練習",
    "多角形 エイム 練習",
    "頂点 再捕捉 サッケード",
    "急激な方向転換 視線追尾",
    "斜め方向 滑動性眼球運動",
    "網膜スリップ 補正 エイム",
    "動体視力 多角形テスト",
    "スポーツビジョン 視覚トレーニング",
    "反射神経 視線 移動 測定",
    "視覚認知 コーナリング エイム",
    "三角形 アイトラッキング 訓練",
    "オンライン 動体視力 反射テスト"
  ],
  openGraph: {
    title: "三角形追従眼球運動テスト・多角形エイム練習 | SkillDrills",
    description: "三角形幾何学ベクトル軌道を追尾し鋭角コーナーでの補正サッケードを鍛えるアイトラッキング訓練。直線滑動追従と頂点再捕捉を総合強化。無料テスト。",
    url: 'https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "三角形追従眼球運動テスト・多角形エイム練習 | SkillDrills",
    description: "三角形幾何学ベクトル軌道を追尾し鋭角コーナーでの補正サッケードを鍛えるアイトラッキング訓練。直線滑動追従と頂点再捕捉を総合強化。無料テスト。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit',
    languages: getAlternateLanguages('/drills/visual-tracking/triangular-pursuit'),
  },
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
      "name": "ビジョントレーニング一覧",
      "item": "https://skilldrills.online/ja/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "視覚追従・アイトラッキング",
      "item": "https://skilldrills.online/ja/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "三角形追従眼球運動テスト",
      "item": "https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "三角形追従眼球運動テスト・多角形エイム練習",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "三角形幾何学ベクトル軌道を追尾し鋭角コーナーでの補正サッケードを鍛えるアイトラッキング訓練。直線滑動追従と頂点再捕捉を強化。",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "三角形追従眼球運動テスト・多角形エイム練習",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応およびJavaScript有効なブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "三角形追従眼球運動テスト・多角形エイム練習",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit",
  "description": "三角形幾何学ベクトル軌道を追尾し鋭角コーナーでの補正サッケードを鍛えるアイトラッキング訓練。直線滑動追従と頂点再捕捉を強化。",
  "genre": [
    "アクション",
    "動体視力トレーニング",
    "エイム練習"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "三角形追従眼球運動ドリルの進め方",
  "description": "閉じた三角形軌道上で等速の直線追従と鋭角頂点での補正サッケードを連動させ、眼球運動の幾何学的追尾精度を極限まで高める手順。",
  "dateModified": "2026-09-15",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "トラッキングパラメータの設定",
      "text": "訓練セッション時間（30〜120秒）、目標の基準速度倍率、ターゲットサイズ、色を調整します。難易度を上げる場合は『Hide Line（軌道線非表示）』を有効化します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "斜め直線区間の等速滑動追従の確立",
      "text": "三角形の各辺を移動するターゲットの中心窩捕捉を維持し、水平筋と垂直筋を滑らかに連動させて視線のブレ（ジッター）を防ぎます。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "鋭角頂点における予測的減速と補正サッケードの実行",
      "text": "頂点（60度の鋭角コーナー）へ到達する瞬間、進行方向へのオーバーシュートを抑え、瞬時の補正サッケードで次の辺へと視線を即座に再固定します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "速度倍率とランダム挙動の段階的負荷向上",
      "text": "コーナーでの着地精度が安定したら、速度倍率を引き上げ、『Random Speed』をオンにして予測困難な加減速への適応力を強化します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "三角形追従眼球運動テストとはどのような訓練ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "正三角形の幾何学軌道に沿って移動するターゲットを中心窩で追尾し、斜め直線区間での滑動性追従眼球運動（Smooth Pursuit）と、3箇所の急峻な頂点（60度の鋭角）で発生する補正サッケード（Catch-up Saccade）を高度に統合する視覚運動訓練です（de Brouwer et al., 2002）。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜ円形や直線追従よりも三角形などの多角形追従が難しいのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "円形追従は曲率が一定で角速度が滑らかに連続変化しますが、三角形軌道は『一定速度の直線追従』と『頂点における不連続な急旋回』が交互に繰り返されます。眼球運動系は滑動追従から急速な跳躍運動（サッケード）へのモード切り替えを瞬時に強いられるため、神経負荷が格段に高くなります（Orban de Xivry & Lefèvre, 2007）。"
      }
    },
    {
      "@type": "Question",
      "name": "斜め方向の眼球運動は脳内でどのように制御されていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "斜め方向への視覚追従は、橋（PPRF）の水平注視中枢と中脳（riMLF）の垂直注視中枢が同時に比例発火することで成立します。小脳片葉および小脳虫部（第VI-VII葉）が両直交ベクトルの速度成分をミリ秒単位で合成し、一本の直線的な斜め追従軌道を作り出しています。"
      }
    },
    {
      "@type": "Question",
      "name": "鋭角コーナーを曲がる際、なぜ視線がショートカット（内回り）してしまうのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "脳が次の辺の軌道を予測しすぎてしまい、頂点に到達する前に早期サッケードを発火させてしまうためです（Bennett & Barnes, 2006）。このショートカット傾向を意識的に抑制し、正確に頂点ノードまで中心窩を運ぶことで、外眼筋の真の幾何学的制動力と空間制御力が養われます。"
      }
    },
    {
      "@type": "Question",
      "name": "コーナーで視線が外側へ飛び出してしまう（オーバーシュート）原因と対策は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "直線区間の追従慣性が強く、頂点での減速指令（前頭眼野および小脳からのブレーキ信号）が約100〜150msの神経伝達遅延により遅れることが原因です。頂点手前で視覚的注意を研ぎ澄まし、角を曲がる直前に追従利得を微小に引き下げる予測的ブレーキを意識することで解消されます。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲーム（VALORANT、Apex、CS2）のエイムにどう直結しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "障害物から飛び出す敵や、壁ジャンプ・スライディング等で斜めに急激な方向転換を行う標的を追尾する際、直線的なクロスヘア誘導から角での急停止・切り返しが要求されます。三角形追従ドリルはこの角切り返しエイムのブレを抑え、初弾捕捉精度を劇的に向上させます。"
      }
    },
    {
      "@type": "Question",
      "name": "球技スポーツ（スカッシュ、テニス、サッカー等）での動体視力向上にどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "壁や芝生でバウンドして急角度に軌道を変えるボールや、相手選手の鋭いカッティング動作に対し、視線が置き去りにされるのを防ぎます。急激なベクトル変化を最小限の補正サッケードで再捕捉できるようになります（Heinen et al., 2005）。"
      }
    },
    {
      "@type": "Question",
      "name": "効果的な1日の推奨トレーニングプロトコルは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1セット45〜60秒を2〜3セット、合計3〜5分間を目安に行います。頂点での急激な制動と再捕捉は外眼筋と前頭葉神経回路に強い負荷をかけるため、疲労で視線が泳ぎ始める前に適度なインターバルを挟むのが最も学習効果を高めます。"
      }
    },
    {
      "@type": "Question",
      "name": "高リフレッシュレートモニター（144Hz/240Hz）を使う利点は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "頂点旋回の瞬間のフレーム更新間隔が60Hz（約16.7ms）から144Hz（約6.9ms）、240Hz（約4.2ms）へと短縮され、角での目標位置の量子化誤差が劇的に減少します（Woods et al., 2015）。視覚系がより正確なタイミングで制動サッケードを発火できます。"
      }
    },
    {
      "@type": "Question",
      "name": "訓練を継続することで小脳や視覚運動系にどのような神経適応が起きますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "小脳プルキンエ細胞における長期抑圧（LTD）を介して順モデル（Internal Forward Model）の精度が向上します（Barnes, 2008）。これにより、ターゲットが鋭角に方向転換しても網膜スリップ（像のブレ）を発生させず、滑動追従の利得とサッケード振幅がミリ秒単位で最適化されます。"
      }
    }
  ]
};

const guide = {
  heading: "三角形追従眼球運動テスト・多角形エイム練習：鋭角旋回と制動サッケードの神経適応",
  intro: [
    "三角形などの閉じた幾何学多角形に沿って動く視覚目標を追従するタスクは、水平・垂直の外眼筋群に対して極めて高度な動的協調を要求します。正三角形の直線的な各辺をターゲットが移動する際、眼球運動系は非主軸（斜め方向）の滑動性追従眼球運動（Smooth Pursuit）を展開します。これには橋網様体傍正中核（PPRF）の水平シグナルと中脳内側縦束吻側間質核（riMLF）の垂直シグナルをミリ秒単位で厳密に等比率発火させ、小脳片葉で統合することが不可欠です（Orban de Xivry & Lefèvre, 2007）。",
    "この運動制御における最大の神経生理学的挑戦は、三角形の鋭角な頂点（60度コーナー）に到達した瞬間に生じます。直線走行から急激な角度変更が発生すると、進行方向の網膜スリップ速度が瞬時に崩壊し、位置誤差（Position Error）が急増します。de Brouwer et al. (2002)およびHeinen et al. (2005)の基礎研究が実証しているように、このような不連続点では前頭眼野（FEF）および補足眼野（SEF）の意思決定回路が作動し、位置誤差と瞬時スリップ速度の統合計算に基づいて補正サッケード（Catch-up Saccade）がトリガーされます。",
    "未訓練の被験者では、頂点に突入した際に視線が慣性によって外側へ飛び出すオーバーシュート（Overshoot）を起こすか、あるいは予測を焦って頂点の手前で内側にショートカットしてしまう現象が頻発します。いずれのケースでも中心窩から目標が逸脱し、複数回の微小探索サッケードが発生して視覚情報処理が一時的に中断されます。しかし、反復的な多角形追従訓練を行うことで、小脳の順モデル（Internal Forward Model）が活性化し、既知の頂点ノード手前で追従速度を予測的に減速させ、角を曲がった直後の新ベクトルへの正確無比な視線着地が可能になります（Bennett & Barnes, 2006; Barnes, 2008）。",
    "本『三角形追従（Triangular Pursuit）』ドリルは、この幾何学的アジリティをブラウザ上で徹底的に鍛え上げます。正三角形の軌道上を周回するターゲットを目で追い続けることで、直線区間の等速追従と角での急減速・再加速ダイナミクスを同時に習得できます。『Hide Line（軌道線非表示）』をオンにすることで視覚的なガイドラインを排除した純粋な感覚運動追従をテストでき、『Random Speed』により機械的なタイミング学習を排した臨場感あふれる適応訓練が可能です。",
    "ハードウェア遅延および計測仕様：表示の更新タイミングはディスプレイのリフレッシュレート（60Hzで約16.7ms、144Hzで約6.9ms、240Hzで約4.1ms）および入力デバイスのポーリング間隔（125Hzで約8ms、1000Hzで約1ms）による時間量子化を受けます（Woods et al., 2015）。なお、本テストで記録されたすべてのスコアや反応データはお使いのブラウザのローカルストレージ（localStorage）にのみ安全に保存され、外部サーバーへ送信されることはありません。"
  ],
  benchmarks: {
    title: "三角形追従パフォーマンス基準（推奨速度倍率・頂点再捕捉着地誤差）",
    headers: ["習熟度ティア", "推奨速度倍率", "頂点再捕捉着地誤差", "頂点サッケード潜時", "想定母集団比率"],
    rows: [
      ["プロ / 幾何学神経完全適応 (Elite)", "3.5x〜5.0x+", "ズレ < 12px (頂点にピタリと吸着)", "潜時 < 110ms (予測ブレーキ完璧)", "上位 1.5%"],
      ["マスター / 高度軌道制御 (Master)", "2.5x〜3.5x", "ズレ < 22px (微小補正のみ)", "潜時 < 140ms (高精度な角処理)", "上位 8%"],
      ["アドバンス / 実践レベル (Advanced)", "1.8x〜2.5x", "ズレ < 38px (短時間で再捕捉)", "潜時 < 180ms (一般的な競技者)", "上位 25%"],
      ["インターミディエイト / 基礎 (Intermediate)", "1.2x〜1.8x", "ズレ 38〜70px (内回りや微小飛び出し)", "潜時 180〜240ms (補正に複数サッケード)", "中位 45%"],
      ["ノービス / 未訓練 (Novice)", "0.5x〜1.2x", "ズレ > 70px (頂点完全見失い)", "潜時 > 250ms (大幅なオーバーシュート)", "入門レベル"]
    ],
    note: "評価基準はde Brouwer et al. (2002)の補正サッケード・スリップ速度解析およびHeinen et al. (2005)の急峻角追従潜時データに基づき策定されています。"
  },
  techniques: [
    {
      title: "斜め直線区間における水平・垂直外眼筋のベクトル均等協調",
      description: "三角形の各辺を斜めに進む際、水平方向の直筋と垂直方向の直筋・斜筋が均等なテンションで連動する必要があります。左右どちらか一方に力みがあると視線が波打ち、ターゲットから中心窩が外れてしまいます。",
      tips: [
        "視線をターゲットの『進行方向の先端』に固定し、直線を引くように滑らかに滑らせる",
        "頭部を固定し、首や顔を傾けずに眼球のみを動かすアイソレーションを意識する",
        "直線区間では瞬目（まばたき）を控え、連続的な網膜像フィードバックを維持する"
      ]
    },
    {
      title: "鋭角頂点手前における予測的減速とオーバーシュート制動",
      description: "60度の角を曲がる直前、小脳のブレーキ機構を作動させて追従速度を微小に落とします。慣性のまま頂点に突入すると視線が必ず外側に飛び出してしまうため、角の直前で制動をかける感覚を掴みます。",
      tips: [
        "頂点に到達する約30〜50ミリ秒前に、視覚的集中を目標の減速予兆にフォーカスする",
        "角を曲がる瞬間、視線が角を突き破らないよう『ノードで一度留まる』意識を持つ",
        "息を細く吐きながらコーナーを通過し、全身の無駄な筋緊張を緩和させる"
      ]
    },
    {
      title: "60度方向転換に伴う補正サッケード（キャッチアップ）の最小化",
      description: "方向が変わった瞬間、視線が遅れた場合は単一の素早いサッケードで目標の中心を即座に再捕捉します。探索的な複数回のバタつきサッケード（マルチサッケード）を出さないことが最重要です。",
      tips: [
        "角を曲がった直後は『視線を跳躍させて目標の真上に落とす』イメージを持つ",
        "角の内側をショートカットしてフライングしないよう、頂点通過を確認してから跳ぶ",
        "目標が新ベクトルに乗ったら、0.1秒以内に再び滑動追従モードへ移行させる"
      ]
    },
    {
      title: "Hide Line（軌道非表示）による内発的幾何学メンタルモデルの覚醒",
      description: "軌道線が見えている状態は視覚補助に依存しています。設定で『Hide Line』を有効化し、見えない正三角形の軌道を脳内でイメージしながら追従することで、脳幹・小脳の空間予測回路を限界まで鍛えます。",
      tips: [
        "画面の四隅や中心点を目安に、見えない三角形の3つの頂点位置を空間把握する",
        "ターゲットの速度からリズム（タン、タン、タン）を体感し、拍子に合わせて角を捉える",
        "ライン非表示下で頂点誤差が20px以下に収まるまで反復して練習を重ねる"
      ]
    }
  ],
  deviceCalibration: {
    title: "多角形追従・頂点サッケードのためのハードウェア・エルゴノミクス基準",
    points: [
      "ディスプレイリフレッシュレート：60度の鋭角旋回時のコマ落ちや位置ジッターを排除するため、144Hz以上の高駆動モニターを推奨。フレーム間隔を6.9ms以下に抑えることで正確な制動タイミングを視認可能（Woods et al., 2015）。",
      "ピクセル応答速度と残像感：急減速・急旋回時にターゲットの尾を引く残像（ゴースト）があると中心位置の誤認につながるため、応答速度1ms以下のゲーミングモニターが最適です。",
      "適切な視距離とアイレベル：画面全体が水平視野角40度前後に収まるよう、モニターから50〜65cmの距離を維持。三角形の頂点を見上げる角度にならないよう、目線の高さが画面中央やや上に来るよう調整します。",
      "コントラストと部屋の照明：背景色（漆黒 #050508）と目標色（サイバーレッド #ef4444）のコントラストを際立たせ、暗がりでも眩しすぎない適切な輝度設定（120〜150cd/m²）に設定します。"
    ]
  },
  faqs: [
    {
      "q": "三角形追従眼球運動テストとはどのような訓練ですか？",
      "a": "正三角形の幾何学軌道に沿って移動するターゲットを中心窩で追尾し、斜め直線区間での滑動性追従眼球運動（Smooth Pursuit）と、3箇所の急峻な頂点（60度の鋭角）で発生する補正サッケード（Catch-up Saccade）を高度に統合する視覚運動訓練です（de Brouwer et al., 2002）。"
    },
    {
      "q": "なぜ円形や直線追従よりも三角形などの多角形追従が難しいのですか？",
      "a": "円形追従は曲率が一定で角速度が滑らかに連続変化しますが、三角形軌道は『一定速度の直線追従』と『頂点における不連続な急旋回』が交互に繰り返されます。眼球運動系は滑動追従から急速な跳躍運動（サッケード）へのモード切り替えを瞬時に強いられるため、神経負荷が格段に高くなります（Orban de Xivry & Lefèvre, 2007）。"
    },
    {
      "q": "斜め方向の眼球運動は脳内でどのように制御されていますか？",
      "a": "斜め方向への視覚追従は、橋（PPRF）の水平注視中枢と中脳（riMLF）の垂直注視中枢が同時に比例発火することで成立します。小脳片葉および小脳虫部（第VI-VII葉）が両直交ベクトルの速度成分をミリ秒単位で合成し、一本の直線的な斜め追従軌道を作り出しています。"
    },
    {
      "q": "鋭角コーナーを曲がる際、なぜ視線がショートカット（内回り）してしまうのですか？",
      "a": "脳が次の辺の軌道を予測しすぎてしまい、頂点に到達する前に早期サッケードを発火させてしまうためです（Bennett & Barnes, 2006）。このショートカット傾向を意識的に抑制し、正確に頂点ノードまで中心窩を運ぶことで、外眼筋の真の幾何学的制動力と空間制御力が養われます。"
    },
    {
      "q": "コーナーで視線が外側へ飛び出してしまう（オーバーシュート）原因と対策は？",
      "a": "直線区間の追従慣性が強く、頂点での減速指令（前頭眼野および小脳からのブレーキ信号）が約100〜150msの神経伝達遅延により遅れることが原因です。頂点手前で視覚的注意を研ぎ澄まし、角を曲がる直前に追従利得を微小に引き下げる予測的ブレーキを意識することで解消されます。"
    },
    {
      "q": "FPSゲーム（VALORANT、Apex、CS2）のエイムにどう直結しますか？",
      "a": "障害物から飛び出す敵や、壁ジャンプ・スライディング等で斜めに急激な方向転換を行う標的を追尾する際、直線的なクロスヘア誘導から角での急停止・切り返しが要求されます。三角形追従ドリルはこの角切り返しエイムのブレを抑え、初弾捕捉精度を劇的に向上させます。"
    },
    {
      "q": "球技スポーツ（スカッシュ、テニス、サッカー等）での動体視力向上にどう役立ちますか？",
      "a": "壁や芝生でバウンドして急角度に軌道を変えるボールや、相手選手の鋭いカッティング動作に対し、視線が置き去りにされるのを防ぎます。急激なベクトル変化を最小限の補正サッケードで再捕捉できるようになります（Heinen et al., 2005）。"
    },
    {
      "q": "効果的な1日の推奨トレーニングプロトコルは？",
      "a": "1セット45〜60秒を2〜3セット、合計3〜5分間を目安に行います。頂点での急激な制動と再捕捉は外眼筋と前頭葉神経回路に強い負荷をかけるため、疲労で視線が泳ぎ始める前に適度なインターバルを挟むのが最も学習効果を高めます。"
    },
    {
      "q": "高リフレッシュレートモニター（144Hz/240Hz）を使う利点は何ですか？",
      "a": "頂点旋回の瞬間のフレーム更新間隔が60Hz（約16.7ms）から144Hz（約6.9ms）、240Hz（約4.2ms）へと短縮され、角での目標位置の量子化誤差が劇的に減少します（Woods et al., 2015）。視覚系がより正確なタイミングで制動サッケードを発火できます。"
    },
    {
      "q": "訓練を継続することで小脳や視覚運動系にどのような神経適応が起きますか？",
      "a": "小脳プルキンエ細胞における長期抑圧（LTD）を介して順モデル（Internal Forward Model）の精度が向上します（Barnes, 2008）。これにより、ターゲットが鋭角に方向転換しても網膜スリップ（像のブレ）を発生させず、滑動追従の利得とサッケード振幅がミリ秒単位で最適化されます。"
    }
  ],
  sources: pickSources('debrouwer2002', 'heinen2005', 'orbandexivry2007', 'bennett2006', 'barnes2008', 'woods2015'),
};

export default function LocalizedPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <TriangularPursuitClient copy={{
        title: "三角形追従眼球運動テスト (多角形鋭角トラッキング)",
        subtitle: "3頂点急旋回・直線滑動追従と補正サッケード統合訓練",
        description: "正三角形の幾何学軌道を周回するターゲットを注視し、斜め直線区間の等速滑動追従と3箇所の鋭角（60度）頂点における瞬時補正サッケード（キャッチアップ・サッケード）を連動させる眼球運動ドリルです。角速度の急変に対する小脳の順モデル制御と、頂点でのオーバーシュート抑制力を極限まで高めます（de Brouwer et al., 2002; Orban de Xivry & Lefèvre, 2007）。"
      }} />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/triangular-pursuit" />
      </div>
    </>
  );
}
