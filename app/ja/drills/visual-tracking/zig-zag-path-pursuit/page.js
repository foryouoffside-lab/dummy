import ZigZagPathPursuitClient from '@/app/drills/visual-tracking/zig-zag-path-pursuit/ZigZagPathPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "ジグザグ追従眼球運動テスト・急反転エイム練習 | SkillDrills",
  description: "ジグザグ連続切り返し軌道を追随し高頻度な鋭角反転での補正サッケードと外眼筋制動力を鍛えるアイトラッキング訓練。鋸波エイム安定化を総合強化。無料テスト。",
  keywords: [
    "ジグザグ 追従眼球運動 練習",
    "ジグザグ エイム 練習",
    "急反転 コーナー トラッキング",
    "鋸波 軌道 追従",
    "頂点 制動力 トレーニング",
    "滑動性追従 屈折運動",
    "動体視力 ジグザグ",
    "補正サッケード 訓練",
    "FPS 急反転 エイム",
    "視覚運動協調 ジグザグ",
    "ジグザグ アイトラッキング 訓練",
    "オンライン 動体視力 反射テスト"
  ],
  openGraph: {
    title: "ジグザグ追従眼球運動テスト・急反転エイム練習 | SkillDrills",
    description: "ジグザグ連続切り返し軌道を追随し高頻度な鋭角反転での補正サッケードと外眼筋制動力を鍛えるアイトラッキング訓練。鋸波エイム安定化を総合強化。無料テスト。",
    url: 'https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ジグザグ追従眼球運動テスト・急反転エイム練習 | SkillDrills",
    description: "ジグザグ連続切り返し軌道を追随し高頻度な鋭角反転での補正サッケードと外眼筋制動力を鍛えるアイトラッキング訓練。鋸波エイム安定化を総合強化。無料テスト。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit',
    languages: getAlternateLanguages('/drills/visual-tracking/zig-zag-path-pursuit'),
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
      "name": "ジグザグ経路追従テスト",
      "item": "https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ジグザグ追従眼球運動テスト・急反転エイム練習",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "ジグザグ連続切り返し軌道を追随し高頻度な鋭角反転での補正サッケードと外眼筋制動力を鍛えるアイトラッキング訓練。鋸波エイム安定化。",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit",
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
  "name": "ジグザグ追従眼球運動テスト・急反転エイム練習",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas対応およびJavaScript有効なブラウザ",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "ジグザグ追従眼球運動テスト・急反転エイム練習",
  "url": "https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit",
  "description": "ジグザグ連続切り返し軌道を追随し高頻度な鋭角反転での補正サッケードと外眼筋制動力を鍛えるアイトラッキング訓練。鋸波エイム安定化。",
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
  "name": "ジグザグ経路追従訓練の進め方",
  "description": "多段ジグザグ軌道上を連続移動するターゲットを中心窩で追尾し、急激な反転屈曲点での外眼筋制動と補正サッケードを最適化する4ステップ。",
  "dateModified": "2026-09-15",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "ジグザグセッションの設定",
      "text": "訓練時間（30〜120秒）、目標の基準移動速度倍率、ターゲットサイズ、色を調整します。難度を極限まで高める場合は『Hide Line（軌道非表示）』を選択します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "直線区間の高速滑動追従の確立",
      "text": "ジグザグの各斜め直線区間を移動するターゲットに視線を吸着させ、ブレのない安定した滑動性追従眼球運動（Smooth Pursuit）を維持します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "屈曲点（変曲点）での急制動と補正サッケード",
      "text": "進行方向が激変するコーナー直前で視線の慣性を抑制（アンチオーバーシュート）し、瞬時の単一サッケードで次の進行ベクトルへ視線を再固定します。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "高頻度反転への神経適応と難度向上",
      "text": "速度倍率を徐々に引き上げ、『Random Speed』を併用して不規則な加減速に翻弄されない小脳の動的順モデルを鍛え上げます。",
      "url": "https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ジグザグ経路追従テストとはどのような訓練ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "連続するジグザグ（鋸波・折れ線）軌道に沿って移動するターゲットを中心窩で追尾し、斜め直線区間での滑動追従と、高頻度に現れる鋭角な変曲点での補正サッケードおよび急激な筋制動を統合する動体視力テストです（de Brouwer et al., 2002）。"
      }
    },
    {
      "@type": "Question",
      "name": "単一の多角形（三角形など）追従とジグザグ追従の最大の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "三角形は閉じたループを3回曲がりますが、ジグザグ追従は左右・上下の反転が高密度かつ連続的に発生します。眼球の拮抗筋（外直筋・内直筋、上直筋・下直筋）が休む間もなく交互に主動作筋と制動筋を入れ替えるため、神経疲労耐性と制動敏捷性が厳格に試されます（Krauzlis, 2004）。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜ連続する屈曲点で視線が外側へ飛び出してしまうのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "先行する直線区間で眼球運動の速度慣性が蓄積しているためです。約100〜150msの神経伝達遅延により、目標が急転換した視覚情報が脳幹に届く前に視線が突き抜けてしまいます。反復訓練により小脳が屈曲点の手前で先回りブレーキをかけるよう適応します（Barnes, 2008）。"
      }
    },
    {
      "@type": "Question",
      "name": "角を曲がる際に視線が内側にショートカットする原因は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "脳の予測機能が過剰に働き、目標が変曲点に達する前に次のベクトルへフライング跳躍してしまう現象です。このフライングを自制し、目標が角の先端に触れるまで視線を維持することで、真の追従精度とエイムの安定性が育ちます（Heinen et al., 2005）。"
      }
    },
    {
      "@type": "Question",
      "name": "FPSゲーム（CS2、VALORANT、Apex Legends）のストライフ戦にどう役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "相手プレイヤーが左右に細かくレレレ撃ち（ADストライフ）を行ったり、障害物をジグザグに回避しながら接近してくる際、照準が置き去りにされるのを防ぎます。反転時のクロスヘアの跳ねやブレを抑え、安定した連続ヒットが可能になります。"
      }
    },
    {
      "@type": "Question",
      "name": "球技や格闘技などのリアルスポーツにはどう応用されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "サッカーやバスケットボールのジグザグドリブル突破、バドミントンの高速ドロップやスマッシュの切り返し、ボクシングのスリップ・ウィービング動作など、連続して軌道を変える対象に対する視覚捕捉ラグを激減させます。"
      }
    },
    {
      "@type": "Question",
      "name": "推奨される1日の練習セット数とインターバルは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1回あたり45〜60秒のセッションを2〜3セット、トータル3〜5分間が理想的です。連続屈曲追従は眼球運動中枢への集中負荷が高いため、視線がブレ始めたら無理をせず数分間の休憩を挟んでください。"
      }
    },
    {
      "@type": "Question",
      "name": "Hide Line（軌道非表示）機能をオンにする効果は何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "画面上の補助線を消すことで、視覚的な誘導に頼らず、目標の瞬間角速度と変曲点の間隔から脳内に仮想のジグザグ空間座標を自律再構築させます。感覚運動の純粋な先読み能力が劇的に高まります（Orban de Xivry & Lefèvre, 2007）。"
      }
    },
    {
      "@type": "Question",
      "name": "高リフレッシュレート（144Hz/240Hz）ディスプレイはなぜ推奨されるのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "鋭角反転の瞬間におけるフレーム遅延を60Hzの約16.7msから144Hz（約6.9ms）、240Hz（約4.2ms）へと削減し、角の頂点位置を寸分の狂いもなく描写するためです（Woods et al., 2015）。制動サッケードの発火タイミングのズレを防ぎます。"
      }
    },
    {
      "@type": "Question",
      "name": "訓練の長期継続で脳のどの神経回路が強化されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "前頭眼野（FEF）、補足眼野（SEF）、および小脳虫部（第VI-VII葉）を結ぶ皮質-小脳ループが強化されます。拮抗筋の抑制タイミングがミリ秒単位で洗練され、不随意の視線振動（オキュラージッター）が恒久的に抑制されます（Krauzlis, 2004）。"
      }
    }
  ]
};

const guide = {
  heading: "ジグザグ追従眼球運動テスト・急反転エイム練習：連続変曲点における拮抗筋制動と追従適応",
  intro: [
    "連続する折れ線・鋸波状のジグザグ軌道に沿って移動する視覚刺激を追跡するタスクは、眼球運動系における『等速滑動追従』と『急激な方向反転制動』の極限テストです。直線区間をターゲットが斜めに走る際、網膜スリップを最小化するために水平・垂直の外眼筋群が協調して滑動性追従眼球運動（Smooth Pursuit）を展開します。しかし、鋭角な変曲点に衝突する瞬間、これまで主動作筋として働いていた筋群が瞬時に強力なブレーキ（制動筋）へと転換され、拮抗筋が爆発的に点火されます（Krauzlis, 2004）。",
    "この高頻度な切り返しにおける神経生理学的ボトルネックは、約100〜150msに及ぶ感覚運動フィードバック遅延にあります。目標が角で方向転換した情報が視覚野を経由して脳幹に到達する頃には、眼球の慣性によって視線が角を突き破る『オーバーシュート（Overshoot）』が発生してしまいます。de Brouwer et al. (2002)およびOrban de Xivry & Lefèvre (2007)の研究が示すように、脳はこの遅延を補償するために前頭眼野（FEF）および小脳前庭系から補正サッケード（Catch-up Saccade）を同期発火させ、滑動モードから跳躍モードへの緊急切り替えを行います。",
    "反復的なジグザグ追従トレーニングを積むことで、小脳の順モデル（Internal Forward Model）内に高精度な運動予測テーブルが構築されます（Bennett & Barnes, 2006; Barnes, 2008）。これにより、視覚システムは目標が変曲点へ到達する約30〜40ミリ秒前に先制的な減速指令を外眼筋へ送り、角の頂点に中心窩を吸着させた直後、単一の高精度サッケードで次の進行ベクトルへと視線を完璧に移行させることが可能になります。探索的な微小サッケードの乱発（ジッター）が消滅し、視覚解像度の低下が最小限に抑えられます。",
    "本『ジグザグ経路追従（Zig-Zag Path Pursuit）』ドリルは、ブラウザ上でこの高度な運動適応を促す専門トレーニングツールです。高頻度に連続する鋭角コーナーを正確にトレースすることで、エイムの切り返しにおける手ブレ・視線ブレを徹底的に排除します。『Hide Line』により視覚ガイドを遮断した純粋な空間予測を鍛え、『Random Speed』で変則的なリズムへの即応力を磨くことができます。",
    "ハードウェア遅延および計測仕様：表示の更新タイミングはディスプレイのリフレッシュレート（60Hzで約16.7ms、144Hzで約6.9ms、240Hzで約4.1ms）および入力デバイスのポーリング間隔（125Hzで約8ms、1000Hzで約1ms）による時間量子化を受けます（Woods et al., 2015）。なお、本テストで記録されたすべてのスコアや反応データはお使いのブラウザのローカルストレージ（localStorage）にのみ安全に保存され、外部サーバーへ送信されることはありません。"
  ],
  benchmarks: {
    title: "ジグザグ経路追従パフォーマンス基準（速度倍率・変曲点着地精度）",
    headers: ["習熟度ティア", "推奨速度倍率", "変曲点着地誤差", "切り返しサッケード潜時", "想定母集団比率"],
    rows: [
      ["プロ / 反転神経完全適応 (Elite)", "3.5x〜5.0x+", "ズレ < 12px (角に完全吸着)", "潜時 < 110ms (予測ブレーキ完璧)", "上位 1.5%"],
      ["マスター / 高度反転制御 (Master)", "2.5x〜3.5x", "ズレ < 22px (微小補正のみ)", "潜時 < 140ms (滑らかな切り返し)", "上位 8%"],
      ["アドバンス / 実践レベル (Advanced)", "1.8x〜2.5x", "ズレ < 38px (短時間で再固定)", "潜時 < 180ms (一般的な競技者)", "上位 25%"],
      ["インターミディエイト / 基礎 (Intermediate)", "1.2x〜1.8x", "ズレ 38〜70px (外側飛び出しや内回り)", "潜時 180〜240ms (複数サッケード発生)", "中位 45%"],
      ["ノービス / 未訓練 (Novice)", "0.5x〜1.2x", "ズレ > 70px (目標完全見失い)", "潜時 > 250ms (重度のオーバーシュート)", "入門レベル"]
    ],
    note: "評価基準はde Brouwer et al. (2002)の補正サッケード・スリップ速度モデルおよびKrauzlis (2004)の滑動追従制動潜時データに基づき設定されています。"
  },
  techniques: [
    {
      title: "直線区間における外眼筋テンションの均等保持と脱力",
      description: "ジグザグの各斜めラインを追従している間、眼球周辺の筋肉に過度な力みが入ると、次の角でのブレーキ反応が遅れてしまいます。リラックスした状態で中心窩を目標の先端に置きます。",
      tips: [
        "目標の『進む方向の前端部』を穏やかに見つめ、視線を直線上に滑らせる",
        "首や肩の力を抜き、頭部を動かさずに眼球のみを独立して動かす（眼球分離運動）",
        "直線区間では不必要なまばたきを避け、滑らかな網膜像入力を維持する"
      ]
    },
    {
      title: "変曲点直前の先回りブレーキ（アンチオーバーシュート）",
      description: "目標が角に達する直前、小脳の予測制御を作動させて追従速度を微小に抑えます。慣性に身を任せず、角の頂点に視線をピタリと止める感覚をマスターします。",
      tips: [
        "変曲点の直前30msで、目標の速度低下や方向転換の予兆に意識を集中させる",
        "角を通り過ぎて外側に突き抜けないよう『角のノードにピン留めする』イメージを持つ",
        "息を細く均等に吐きながらコーナーをクリアし、筋緊張の高まりを防ぐ"
      ]
    },
    {
      title: "急反転後の単一キャッチアップサッケードによる瞬時再固定",
      description: "方向が変わった直後、視線が遅れた場合はバタバタと複数回微小修正するのではなく、単一のシャープな補正サッケードで目標の中心を瞬時に再捕捉します。",
      tips: [
        "角を曲がった直後は『視線を目標の真上にスパッと飛び込ませる』意識を持つ",
        "角の内側をフライングしてショートカットしないよう、先端到達を確認してから跳ぶ",
        "サッケード着地後、0.1秒以内に即座に滑動追従モードへ滑らかに復帰させる"
      ]
    },
    {
      title: "Hide Line（軌道非表示）による内的幾何学リズムの確立",
      description: "軌道線が見えている状態から『Hide Line』をオンにして、見えないジグザグの折れ線パターンを脳内に描きます。目標のリズム（左右、左右）を体得し、内発的な追尾能力を磨きます。",
      tips: [
        "画面の左右幅と折り返しピッチから、次の変曲点座標を空間的に先読みする",
        "目標の一定速度からテンポを感じ取り、メトロノームのように等間隔で角を捉える",
        "ライン非表示下でも角での着地誤差が20px以下に保てるまで繰り返し練習する"
      ]
    }
  ],
  deviceCalibration: {
    title: "ジグザグ連続追従・反転エイムのためのハードウェア・エルゴノミクス基準",
    points: [
      "ディスプレイリフレッシュレート：連続する鋭角コーナーでの描画コマ飛びと入力遅延を最小化するため、144Hz以上の高駆動モニターを推奨。フレーム間隔6.9ms以下で正確な制動タイミングを視認（Woods et al., 2015）。",
      "ピクセル応答速度と残像感：高頻度な切り返し時に液晶の応答遅れ（ゴースト）があると角の位置を誤認するため、1ms以下の高速ゲーミングモニターが最適です。",
      "適切な視距離と水平配置：ジグザグ全体の振幅が視野角35〜40度以内に収まるよう、モニターから50〜65cmの距離を維持。画面の中心が目線のやや下に来るよう調整します。",
      "コントラストと照明設定：背景色（漆黒 #050508）と目標色（サイバーレッド #ef4444）のコントラストを最大化し、部屋の照明をやや落として視認性を最適化。"
    ]
  },
  faqs: [
    {
      "q": "ジグザグ経路追従テストとはどのような訓練ですか？",
      "a": "連続するジグザグ（鋸波・折れ線）軌道に沿って移動するターゲットを中心窩で追尾し、斜め直線区間での滑動追従と、高頻度に現れる鋭角な変曲点での補正サッケードおよび急激な筋制動を統合する動体視力テストです（de Brouwer et al., 2002）。"
    },
    {
      "q": "単一の多角形（三角形など）追従とジグザグ追従の最大の違いは何ですか？",
      "a": "三角形は閉じたループを3回曲がりますが、ジグザグ追従は左右・上下の反転が高密度かつ連続的に発生します。眼球の拮抗筋（外直筋・内直筋、上直筋・下直筋）が休む間もなく交互に主動作筋と制動筋を入れ替えるため、神経疲労耐性と制動敏捷性が厳格に試されます（Krauzlis, 2004）。"
    },
    {
      "q": "なぜ連続する屈曲点で視線が外側へ飛び出してしまうのですか？",
      "a": "先行する直線区間で眼球運動の速度慣性が蓄積しているためです。約100〜150msの神経伝達遅延により、目標が急転換した視覚情報が脳幹に届く前に視線が突き抜けてしまいます。反復訓練により小脳が屈曲点の手前で先回りブレーキをかけるよう適応します（Barnes, 2008）。"
    },
    {
      "q": "角を曲がる際に視線が内側にショートカットする原因は？",
      "a": "脳の予測機能が過剰に働き、目標が変曲点に達する前に次のベクトルへフライング跳躍してしまう現象です。このフライングを自制し、目標が角の先端に触れるまで視線を維持することで、真の追従精度とエイムの安定性が育ちます（Heinen et al., 2005）。"
    },
    {
      "q": "FPSゲーム（CS2、VALORANT、Apex Legends）のストライフ戦にどう役立ちますか？",
      "a": "相手プレイヤーが左右に細かくレレレ撃ち（ADストライフ）を行ったり、障害物をジグザグに回避しながら接近してくる際、照準が置き去りにされるのを防ぎます。反転時のクロスヘアの跳ねやブレを抑え、安定した連続ヒットが可能になります。"
    },
    {
      "q": "球技や格闘技などのリアルスポーツにはどう応用されますか？",
      "a": "サッカーやバスケットボールのジグザグドリブル突破、バドミントンの高速ドロップやスマッシュの切り返し、ボクシングのスリップ・ウィービング動作など、連続して軌道を変える対象に対する視覚捕捉ラグを激減させます。"
    },
    {
      "q": "推奨される1日の練習セット数とインターバルは？",
      "a": "1回あたり45〜60秒のセッションを2〜3セット、トータル3〜5分間が理想的です。連続屈曲追従は眼球運動中枢への集中負荷が高いため、視線がブレ始めたら無理をせず数分間の休憩を挟んでください。"
    },
    {
      "q": "Hide Line（軌道非表示）機能をオンにする効果は何ですか？",
      "a": "画面上の補助線を消すことで、視覚的な誘導に頼らず、目標の瞬間角速度と変曲点の間隔から脳内に仮想のジグザグ空間座標を自律再構築させます。感覚運動の純粋な先読み能力が劇的に高まります（Orban de Xivry & Lefèvre, 2007）。"
    },
    {
      "q": "高リフレッシュレート（144Hz/240Hz）ディスプレイはなぜ推奨されるのですか？",
      "a": "鋭角反転の瞬間におけるフレーム遅延を60Hzの約16.7msから144Hz（約6.9ms）、240Hz（約4.2ms）へと削減し、角の頂点位置を寸分の狂いもなく描写するためです（Woods et al., 2015）。制動サッケードの発火タイミングのズレを防ぎます。"
    },
    {
      "q": "訓練の長期継続で脳のどの神経回路が強化されますか？",
      "a": "前頭眼野（FEF）、補足眼野（SEF）、および小脳虫部（第VI-VII葉）を結ぶ皮質-小脳ループが強化されます。拮抗筋の抑制タイミングがミリ秒単位で洗練され、不随意の視線振動（オキュラージッター）が恒久的に抑制されます（Krauzlis, 2004）。"
    }
  ],
  sources: pickSources('debrouwer2002', 'heinen2005', 'orbandexivry2007', 'krauzlis2004', 'barnes2008', 'woods2015'),
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

      <ZigZagPathPursuitClient copy={{
        title: "ジグザグ追従眼球運動テスト (急反転エイム訓練)",
        subtitle: "多段ジグザグ急旋回・拮抗筋制動と補正サッケード統合訓練",
        description: "連続する折れ線ジグザグ軌道を往復するターゲットを中心窩で追従し、高頻度な鋭角変曲点での外眼筋制動力と瞬時補正サッケード（キャッチアップ・サッケード）を連動させる眼球運動ドリルです。急激な反転に対する小脳の運動適応とオーバーシュート抑制力を極限まで高めます（de Brouwer et al., 2002; Krauzlis, 2004）。"
      }} />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ja/drills/visual-tracking/zig-zag-path-pursuit" />
      </div>
    </>
  );
}
