import RecoilControlClient from '@/app/drills/fps/recoil-control/RecoilControlClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (fps / recoil-control)
// PRIMARY DOMESTIC: "リコイル練習"               — High domestic intent
//                   "リコイル 練習 ブラウザ"      — #1 Google Suggest autocomplete query
//                   "リコイル制御"               — Core tactical terminology
//                   "リコイル 練習 apex"         — High-intent tracking/FPS shooter query
//                   "リコイル制御 マウス"         — Physical hardware input query
// SECONDARY / LSI:
//                   "FPS 反動制御"              — Broad game mechanic search
//                   "スプレーコントロール 練習"   — CS2 / VALORANT spray query
//                   "CS2 リコイル練習"           — Tactical shooter query
//                   "VALORANT リコイル"          — Deterministic vertical / bloom query
//                   "エイム練習 無料 ブラウザ"   — Category intent phrase
// WINNER TITLE:     リコイル練習 – ブラウザで無料FPS反動制御・スプレーパターントレーナー | SkillDrills
// ============================================================

export const metadata = {
  title: "リコイル練習 – FPS反動制御・スプレー練習 | SkillDrills",
  description: "無料のブラウザFPSリコイル練習ツール。マウスの垂直引き下げ速度やS字スプレーパターンの反動制御、初弾10発の集弾率を測定・強化。Apex Legends、VALORANT、CS2のウォームアップに最適。",
  keywords: [
    "リコイル練習",
    "リコイル 練習 ブラウザ",
    "リコイル制御",
    "リコイル 練習 apex",
    "リコイル制御 マウス",
    "FPS 反動制御",
    "スプレーコントロール 練習",
    "CS2 リコイル練習",
    "VALORANT リコイル",
    "エイム練習 無料 ブラウザ",
    "集弾率 向上 練習",
    "リコイル パターン 制御"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/fps/recoil-control",
    languages: getAlternateLanguages('/drills/fps/recoil-control'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "リコイル練習 – FPS反動制御・スプレー練習 | SkillDrills",
    description: "無料のブラウザFPSリコイル練習ツール。マウスの垂直引き下げ速度やS字スプレーパターンの反動制御、初弾10発の集弾率を測定・強化。Apex Legends、VALORANT、CS2のウォームアップに最適。",
    url: "https://skilldrills.online/ja/drills/fps/recoil-control",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "リコイル練習 – FPS反動制御・スプレー練習 | SkillDrills",
    description: "無料のブラウザFPSリコイル練習ツール。マウスの垂直引き下げ速度やS字スプレーパターンの反動制御、初弾10発の集弾率を測定・強化。Apex Legends、VALORANT、CS2のウォームアップに最適。",
  },
};

export default function RecoilControlPageJa() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPSトレーニング", "item": "https://skilldrills.online/ja/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "リコイル練習", "item": "https://skilldrills.online/ja/drills/fps/recoil-control" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "リコイル練習 (Recoil Control Trainer)",
    "url": "https://skilldrills.online/ja/drills/fps/recoil-control",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "ブラウザ上で実銃のスプレーパターンや垂直引き下げ速度、反動制御を反復トレーニングできる無料FPSリコイル練習ツール。"
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "リコイル練習 (Recoil Control Trainer)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "ブラウザ上で実銃のスプレーパターンや垂直引き下げ速度、反動制御を反復トレーニングできる無料FPSリコイル練習ツール。",
    "genre": "FPS Training / Recoil & Spray Control",
    "url": "https://skilldrills.online/ja/drills/fps/recoil-control",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "リコイル練習 (Recoil Control Trainer)",
    "url": "https://skilldrills.online/ja/drills/fps/recoil-control",
    "description": "ブラウザ上で実銃のスプレーパターンや垂直引き下げ速度、反動制御を反復トレーニングできる無料FPSリコイル練習ツール。",
    "dateModified": "2026-09-11",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Recoil Control"],
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
        "name": "FPSにおける「リコイル制御（反動制御）」とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "リコイル制御（反動補正 / スプレーコントロール）とは、フルオート連射時に銃身が物理的に跳ね上がる（マズルクライム）動きに対し、マウスを正確に逆方向および逆のタイミングで操作して着弾点を一点に集約させる運動制御技術です。"
        }
      },
      {
        "@type": "Question",
        "name": "初弾8〜10発の垂直引き下げが最も重要とされる理由は何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "アサルトライフル（AK-47やM4A1など）の初弾8〜10発は、左右のブレ（水平反動）がほぼ生じず、素直な直線的垂直上昇を示します。この初弾群は単純な一定速度の引き下げだけで集弾させることができ、敵を即座にキルするための最も高いダメージ変換率を誇るためです。"
        }
      },
      {
        "@type": "Question",
        "name": "Apex LegendsやVALORANT、CS2におけるリコイル特性の違いは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CS2はAK-47などに固定の幾何学的スプレーパターンが存在し、30発目まで決まった軌道を描きます。VALORANTは初弾5〜6発が固定垂直上昇で、以降は左右ランダムなスプレー拡散（ブルーム）に移行します。Apex Legendsは武器ごとに固有の反動軌道が存在し、ジッターエイムやリコイル平滑化（スムージング）といった移動追従型の反動相殺が有効です。"
        }
      },
      {
        "@type": "Question",
        "name": "一般化運動プログラム（GMP理論）はスプレー制御の筋肉記憶をどう説明しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "リチャード・A・シュミット（Schmidt & Lee, 2011）のGMP理論によれば、700ms未満で完結する10発の高速射撃は視覚フィードバックを待つ時間的余裕がないため、大脳皮質の運動野にあらかじめプログラムされた一定の相対タイミングと筋力パラメータを持つ「事前構造化された運動サブルーチン」として自動実行されます。"
        }
      },
      {
        "@type": "Question",
        "name": "スプレートランスファー（複数敵への連続射撃）のコツは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "スプレートランスファーとは、最初の敵を倒した後に射撃ボタンを離さず、そのまま連射を継続しながら次の敵へフリックして倒す高度技術です。マガジンの何発目を撃っているかによって照準の反動オフセット（ズレ幅）が異なるため、その時点のスプレー位置を空間的に把握したまま次の敵の頭部に重ね合わせる必要があります。"
        }
      },
      {
        "@type": "Question",
        "name": "マウス感度（センシ）やマウスパッドの摩擦はリコイル制御にどう影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ローセンシ（低感度）は前腕全体を使った大きな引き下げ動作を要求するため、物理的なブレが少なく高い再現性と安定性が得られます。また、動摩擦の高いコントロール系マウスパッドは急激な行き過ぎ（オーバーシュート）を抑え、垂直引き下げ時の手ブレを安定させる効果があります。"
        }
      },
      {
        "@type": "Question",
        "name": "垂直リコイル引き下げで手首と前腕をどう使い分けるべきですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "3〜7発の短いバースト射撃では指の屈曲と手首の下方スナップで素早く対応します。15〜30発のフルスプレーを行う場合は、手首を固定したまま肘を支点にして前腕全体をマウスパッド上で滑らかに後退（グライド）させることで、手首の可動域限界による引っ掛かりを防ぎます。"
        }
      },
      {
        "@type": "Question",
        "name": "スプレー拡散（ブルーム）とリコイルパターンの違いは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "リコイルパターンは銃身の跳ね上がりによる予測可能で再現性のある幾何学的軌道です。一方、スプレー拡散（ブルーム）は射撃継続やキャラクター移動によって弾が狙いからランダムに散る円錐状の不確定要素です。リコイルは手動で100%相殺できますが、拡散は射撃中断（リセット）でしか抑えられません。"
        }
      },
      {
        "@type": "Question",
        "name": "本リコイル練習ツールはブラウザ上で無料で使えますか？インストールは必要ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい。完全無料でご利用いただけます。Steamや外部アプリのダウンロード、アカウント登録、課金などは一切不要で、ChromeやEdgeなどのブラウザからアクセスするだけですぐに練習を開始できます。"
        }
      },
      {
        "@type": "Question",
        "name": "なぜマガジン命中率が40%を下回るとコンボがリセットされるのですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "無秩序にマガジンを撃ち尽くす「スプレーパニック」を矯正し、常にターゲットへ弾を集中させる射撃規律（ディシプリン）を養うためです。命中率が40%未満の場合は弾薬の浪費と判定され、コンボ倍率がリセットされます（タイムペナルティ設定時は残り時間も0.6秒減算）。"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "リコイル制御をマスターする4つのステップ",
    "description": "実銃のスプレーパターン補正、垂直引き下げ速度、および水平カウンターステアリングを習熟するための手順。",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "ゲーム感度と座標の整合性確保",
        "text": "セッション設定でプレイ中のFPSタイトル、DPI、ゲーム内感度を合わせ、ポインターロックを有効化します。",
        "url": "https://skilldrills.online/ja/drills/fps/recoil-control#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "継続射撃の開始",
        "text": "ターゲットに向かって左クリックを長押しし、フルオート射撃を開始します。",
        "url": "https://skilldrills.online/ja/drills/fps/recoil-control#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "垂直引き下げインパルスの実行",
        "text": "初弾8〜10発の間、銃身の上昇速度に合わせてマウスを滑らかに一定速度で真下に引き下げます。",
        "url": "https://skilldrills.online/ja/drills/fps/recoil-control#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "水平カウンターステアリングの適用",
        "text": "スプレーが左右に揺れ始めたら、銃が右に流れる時は左へ、左に流れる時は右へとマウスを微小に逆ハンドル操作します。",
        "url": "https://skilldrills.online/ja/drills/fps/recoil-control#step-4"
      }
    ]
  };

  const recoilGuideJa = {
    heading: "リコイル練習・反動制御（スプレーコントロール）完全攻略ガイド",
    intro: [
      "リコイル練習（Recoil Control Trainer）は、実戦FPSで銃器の反動パターン、垂直引き下げ速度、および左右の水平ブレ（スプレー揺れ）を相殺するための筋肉記憶を構築する感覚運動トレーニングツールです。Counter-Strike 2、VALORANT、Apex Legends、Rainbow Six Siegeなどの競技シューターでは、初弾のワンタップヘッドショットだけで決着がつかない状況が日常的に発生します。敵が激しい左右ストレイフで回避行動を取る中、フルオート連射で全弾を標的に集中させ続ける能力が勝敗を直接決定づけます。",
      "高速なリコイル制御の運動学習理論は、リチャード・A・シュミットとティモシー・D・リー（Schmidt & Lee, 2011）の「一般化運動プログラム（GMP理論）」によって裏付けられています。10発の弾がわずか700ミリ秒未満で発射されるような極限の高速運動では、着弾を目で見てからマウスを修正する視覚フィードバック（閉ループ制御）を行う時間的猶予がありません。あらかじめ大脳皮質の運動野に学習・固定化された、一定の力と相対タイミングを持つオープンループ運動プログラムが一挙に実行される必要があります。",
      "射撃時の運動制御プロセスには、ロバート・S・ウッドワースの二成分照準モデル（Woodworth, 1899）およびデイビッド・E・マイヤーの最適サブムーブメント理論（Meyer et al., 1988）が適用されます。射撃開始直後の「初弾10発の直線的垂直引き下げ」というオープンループ運動と、その後に生じる水平スプレーの揺れ戻しや敵の回避移動に対する「微小な閉ループ視覚追従補正」がシームレスに結合して初めて完璧な集弾が達成されます。",
      "運動速度と精度のトレードオフはフィッツの法則（Fitts, 1954）およびシュミットのインパルス変動モデル（Schmidt et al., 1979）に従います。マウスを過度に強く素早く引っ張りすぎると筋肉の出力ばらつきが増大し、かえって集弾が乱れます。本ドリルは高精度タイマーAPI（performance.now()）を活用してミリ秒単位の集弾判定を行い、プレイヤーが無駄な力みを捨てて一定の滑らかな引き下げ速度を定着させられるよう設計されています（Woods et al., 2015）。",
      "計測精度と表示ハードウェアについて：すべての射撃および命中判定はブラウザ内部のperformance.now()高分解能クロックを用いてデバイス内で完結処理されます。一般的な60Hzモニターでは約16.7msのフレーム更新間隔が生じますが、144Hz（約6.9ms）や240Hz（約4.1ms）の高リフレッシュレート環境ではスプレーの視覚的追従が滑らかになり、より精緻な微小修正が可能となります（Woods et al., 2015）。スコアや個人データが外部サーバーに送信されることはなく、プライバシーは完全に保護されます。"
    ],
    benchmarks: {
      title: "マガジン命中率およびリコイル制御スキル階層（エディトリアル基準）",
      headers: ["評価ティア", "マガジン命中率", "運動制御メカニズム", "実戦FPS（CS2 / Apex / VALORANT）での適応力"],
      rows: [
        ["ティア1 (Apex Laser)", "78% – 90%+", "完璧に近い垂直引き下げ一定速度。30発全弾にわたりサブピクセル精度の水平カウンター操作を行い、拡散範囲外への弾こぼしゼロ。", "CS2 Faceit Level 10、VALORANT レディアント、Apex プレデター帯で複数敵への連続スプレートランスファーを完遂可能。"],
        ["ティア2 (Competitive Pro)", "62% – 78%", "初弾10発のヘッドショット集弾が極めて精密。水平反動の切り替え時に素早く照準を再センタリングし、移動標的を安定捕捉。", "中距離ライフルデュエルで圧倒的な勝率を維持。隣接する敵への確実なスプレートランスファーを安定して成功させる。"],
        ["ティア3 (High-Skill FPS)", "48% – 62%", "初弾垂直引き下げは良好。12〜25発目の水平ブレ転換時にわずかなオーバーシュートや修正遅延が発生。", "近〜中距離のスプレーコントロールは実用的。遠距離では敵の肩口を超えて弾が数発抜ける傾向がある。"],
        ["ティア4 (Intermediate)", "35% – 48%", "引き下げ速度が一定せず、射撃開始7発目前後で迷いが生じて弾が頭上へ浮き上がる。", "スプレーデュエルで撃ち負けやすい。フルオートを避け、単発タップ撃ちや3発バースト射撃に依存しがちになる。"],
        ["ティア5 (Developing / Bloom Jitter)", "35% 未満", "腕や手首に過剰な力みが入り、垂直引き下げが乱雑。画面全体に弾が散乱してスプレーパニックに陥る。", "マガジン規律基準（40%）を維持できず、敵のヒットボックス外へ弾薬を大量に浪費してしまう状態。"]
      ],
      note: "命中率は1マガジン（30発）あたりに標的ゾーンへ着弾した弾数の割合をperformance.now()クロノメトリーで精密記録したものです（Woods et al., 2015）。"
    },
    techniques: {
      title: "科学的エビデンスに基づくリコイル制御4大プロトコル",
      items: [
        {
          name: "初弾10発の直線的垂直引き下げインパルス",
          desc: "アサルトライフルの初弾8〜10発は水平ブレがほぼ発生せず、真上への直線的な跳ね上がりを示します。この一定速度の引き下げ運動をオープンループ運動サブルーチンとして脳に記憶させます（Schmidt & Lee, 2011）。運動は力や速度が急変するほどブレが大きくなるため（Schmidt et al., 1979）、一定の滑らかな速度を保つことが最重要です。",
          tips: "画面上で弾が跳ね上がってから引くのではなく、射撃ボタンを押した瞬間に同時に一定速度でマウスを引き下げ始めます。"
        },
        {
          name: "逆S字パターンの水平カウンターステアリング",
          desc: "10発を超えると銃器は左右へ弧を描く逆S字パターンへ移行します。武器が右に跳ねる時は左へ、左に跳ねる時は右へと、鏡像関係の逆ハンドル操作（カウンターステアリング）を行って集弾を中央に維持します（Meyer et al., 1988）。",
          tips: "急激な手首の振りは禁物です。微小で滑らかなハンドリングを意識することで弾の散らばりを防ぎます。"
        },
        {
          name: "前腕グライドと手首安定性のデカップリング",
          desc: "3〜7発の短いバースト射撃では指の屈曲と手首の角度調整で対応できますが、15〜30発のフルスプレーでは手首の可動限界に達します。手首の角度を固定し、肘を支点にして前腕全体をマウスパッド上で滑らかに後退（グライド）させる技術を確立します。",
          tips: "前腕が机の角やパッドの端に引っかからないよう、腕の配置スペースと十分なマウスパッド縦幅を確保してください。"
        },
        {
          name: "スプレーリセットとバースト射撃規律",
          desc: "15発を超えて標的から完全に照準が外れた場合、そのまま撃ち続けてもランダムな拡散（ブルーム）で弾が当たる確率は極めて低くなります。即座にトリガーを200〜300ms離して拡散をリセットし、再び初弾から撃ち直す判断規律が実戦での生存率を高めます。",
          tips: "当たることを祈ってマガジンを空にするよりも、冷静なスプレーリセットを行う方がキルタイムを短縮できます。"
        }
      ]
    },
    steps: [
      "セッション設定でプレイ中のゲーム、DPI、ゲーム内感度を合わせ、ポインターロックを有効化します。",
      "移動するターゲットに向けてマウス左ボタンを長押しし、フルオート射撃を開始します。",
      "初弾の垂直上昇を相殺するため滑らかにマウスを引き下げ、弾をヘッド・チェストゾーンに集中させます。",
      "スプレーが左右に展開したら水平カウンターステアリングを行い、30発全弾にわたって追従を維持します。",
      "終了後のセッション分析でマガジン命中率、ヘッドショット数、スプレー規律スコアを確認します。"
    ],
    audience: "CS2、VALORANT、Apex Legends、Rainbow Six SiegeなどのFPSにおいて、レーザーのようにブレない集弾と確実なスプレートランスファーを身につけたいすべてのPCゲーマー。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'schmidtLee2011', 'schmidt1979', 'woodworth1899'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "フリックショット練習 (Flick Shot Trainer)" },
      { href: "/drills/fps/pro-smooth-pursuit", label: "スムーズパシュート練習 (Smooth Pursuit Trainer)" },
      { href: "/drills/fps/micro-correction-precision", label: "マイクロフリック練習 (Micro-Correction)" },
      { href: "/drills/fps/anti-strafe-jitter-duel", label: "対ストレイフジッター練習 (Anti-Strafe Jitter)" },
      { href: "/drills/fps/angle-hold-trainer", label: "置きエイム練習 (Angle Hold Trainer)" }
    ]
  };

  const copyJa = {
    h1Keyword: "リコイル練習",
    h1Suffix: " (Recoil Control Trainer)",
    caption: "リコイル制御は反動パターンを脳に記憶させて実行するオープンループ運動プログラムです。運動は速度や力が増すほど出力のばらつきが大きくなるため（Schmidt et al., 1979）、急激に引っ張るのではなく一定の滑らかな速度で引き下げることが集弾率向上の鍵となります。",
    statScore: "スコア",
    statTime: "残り時間",
    statAccuracy: "命中率",
    statBest: "自己ベスト",
    statAmmo: "残弾数",
    statReloading: "リロード中...",
    pausedTitle: "一時停止中",
    pausedPrompt: "画面をクリックしてカーソルを固定し、再開してください。",
    startTitle: "リコイル練習 Pro",
    startSubtitle: "実銃スプレーパターン & 運動補正トレーニング • エンドレス難易度進行",
    startButtonText: "トレーニング開始",
    getReady: "構えてください",
    statHeadshots: "ヘッドショット",
    statMaxCombo: "最大コンボ",
    statPeakLevel: "到達レベル",
    playAgainText: "もう一度挑戦",
    shareText: "スコアをシェア",
    exitText: "終了",
    bottomCaption: "射撃開始と同時にマウスを滑らかに引き下げ、銃身の上昇と左右のブレを相殺して標的に弾を集中させてください。",
    rulesTitle: "ドリルルールとスコア計算方式",
    rulesItems: [
      { num: "1", text: "ヘッドショット命中", highlight: "+100 PTS / +0.25秒", result: "最優先ターゲットゾーン" },
      { num: "2", text: "胴体・四肢ヒット", highlight: "+40 / +20 PTS", result: "コンボ継続" },
      { num: "3", text: "レベル進行", highlight: "+1レベル / 1400 PTS", result: "標的速度 & 反動倍率上昇" },
      { num: "4", text: "マガジン規律", highlight: "失敗ペナルティ", result: "マガジン命中率40%未満でコンボリセット（ペナルティ有効時 -0.6秒）" }
    ],
    aboutTitle: "リコイル練習トレーナーについて",
    whyMattersTitle: "なぜリコイル制御（反動補正）が重要なのか",
    whyMattersLead: "リコイル制御は反動パターンを脳に記憶させて実行するオープンループ運動プログラムです。運動は速度や力が増すほど出力のばらつきが大きくなるため（Schmidt et al., 1979）、急激に引っ張るのではなく一定の滑らかな速度で引き下げることが集弾率向上の鍵となります。",
    aboutIntro: [
      "リコイル練習は、フルオート射撃時に銃身の跳ね上がりに逆らってマウスを正確に動かし続けるための持続的な運動補正能力を養成します。単発タップ撃ちやフリック射撃が一瞬の微小修正であるのに対し、リコイル制御は銃器固有の反動パターンに応じた滑らかで持続的なマウス操作が求められます。",
      "初弾の垂直引き下げと後半の左右への揺れ戻し（カウンターステアリング）を運動野に刷り込むことで、Apex Legends、VALORANT、CS2などの実戦において意識せずとも完璧なフルオート集弾が可能になります。"
    ],
    aboutCards: [
      { iconBg: "bg-blue-600", title: "対象プレイヤー", text: "CS2、VALORANT、Apex Legends、CoDでスプレートランスファーや移動ターゲットへの追従集弾を向上させたいプレイヤー。" },
      { iconBg: "bg-red-600", title: "初弾5〜8発が勝負の鍵", text: "あらゆるスプレーパターンにおいて、初弾5〜8発は最も素直な垂直上昇を示します。この引き下げを完璧にすることで撃ち合いの勝率は劇的に跳ね上がります。" },
      { iconBg: "bg-orange-600", title: "スプレー規律の維持", text: "無目的にマガジンを撃ち尽くす癖を防ぎます。適切なバースト射撃と追従精度を維持することで弾薬の浪費とペナルティを回避します。" }
    ],
    aboutSections: [
      {
        title: "反動補正がエイムに与える決定的影響",
        paragraphs: [
          "タクティカルシューターやTTKの長いFPSでは、最初の標的捕捉（初弾エイム）と持続的な反動補正の組み合わせが必須です。この2つを両立させることで、敵がストレイフ（左右移動）で回避行動を取っていても確実に弾を当て続けることができます。",
          "滑らかな引き下げ動作は垂直の弾上がりを防ぎ、長時間の交戦でも水平方向の集弾散布界を極小に抑えます。"
        ]
      }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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

      <RecoilControlClient copy={copyJa} />

      <DrillGuide guide={recoilGuideJa} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/recoil-control" locale="ja" />
      </div>
    </>
  );
}
