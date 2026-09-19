import AntiStrafeJitterClient from '@/app/drills/fps/anti-strafe-jitter-duel/AntiStrafeJitterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "レレレ撃ち 練習 – ジッタートラッキング | SkillDrills",
  description: "ブラウザで無料プレイできるレレレ撃ち（ADAD移動）トラッキング練習。ApexやOverwatchの至近距離での高頻度な切り返しムーブやジッター移動に照準を吸い付かせるリアクティブトラッキングを科学的に鍛えます。",
  keywords: [
    "レレレ撃ち 練習",
    "トラッキング エイム 練習",
    "ジッターエイム 練習",
    "近距離 トラッキング",
    "VALORANT レレレ撃ち",
    "Apex レレレ撃ち 練習",
    "Overwatch2 トラッキング",
    "リアクティブ トラッキング",
    "切り返し エイム練習",
    "近距離 エイム 合わせ方",
    "ADAD 移動 エイム",
    "エイムトレーナー 無料"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/fps/anti-strafe-jitter-duel",
    languages: getAlternateLanguages('/drills/fps/anti-strafe-jitter-duel'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "レレレ撃ち 練習 – ジッタートラッキング | SkillDrills",
    description: "ブラウザで無料プレイできるレレレ撃ち（ADAD移動）トラッキング練習。ApexやOverwatchの至近距離での高頻度な切り返しムーブやジッター移動に照準を吸い付かせるリアクティブトラッキングを科学的に鍛えます。",
    url: "https://skilldrills.online/ja/drills/fps/anti-strafe-jitter-duel",
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "レレレ撃ち 練習 – ジッタートラッキング | SkillDrills",
    description: "ブラウザで無料プレイできるレレレ撃ち（ADAD移動）トラッキング練習。ApexやOverwatchの至近距離での高頻度な切り返しムーブやジッター移動に照準を吸い付かせるリアクティブトラッキングを科学的に鍛えます。",
  },
};

export default function AntiStrafeJitterJaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja" },
      { "@type": "ListItem", "position": 2, "name": "FPSエイム練習", "item": "https://skilldrills.online/ja/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "レレレ撃ち 練習", "item": "https://skilldrills.online/ja/drills/fps/anti-strafe-jitter-duel" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "レレレ撃ち 練習",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "急激な左右ADAD切り返し移動（レレレ撃ち）に対するリアクティブトラッキングと微小修正能力を向上させる無料ブラウザFPSエイムドリル。",
    "genre": "FPS Training / Anti-Strafe",
    "url": "https://skilldrills.online/ja/drills/fps/anti-strafe-jitter-duel",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "レレレ撃ち 練習",
    "url": "https://skilldrills.online/ja/drills/fps/anti-strafe-jitter-duel",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "ブラウザで動作する無料レレレ撃ちエイム練習。近距離ADAD移動に対するリアクティブトラッキングを極限まで強化します。"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "レレレ撃ち 練習",
    "url": "https://skilldrills.online/ja/drills/fps/anti-strafe-jitter-duel",
    "description": "急激な左右ADAD切り返し移動（レレレ撃ち）に対するリアクティブトラッキングと微小修正能力を向上させる無料ブラウザFPSエイムドリル。",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Reactive Tracking"],
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
        "name": "FPSにおけるリアクティブトラッキング（反応追従）とは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不規則かつ予測不能に移動方向を反転させる標的に対し、視覚的な網膜スリップ（位置ズレ）をリアルタイムに検知して照準を追従させ続ける高度なエイム技術です。"
        }
      },
      {
        "@type": "Question",
        "name": "高速なADAD移動（レレレ撃ち）を正確に追跡するコツは？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "前腕と手首の筋肉をリラックスさせ、照準線ではなく敵キャラクターの中心（胴体）に視線を固定します。大振りのフリックで追うのではなく、敵の移動速度に合わせた滑らかな微小反転を行うことが重要です。"
        }
      },
      {
        "@type": "Question",
        "name": "ジッタートラッキング中にエイムがガタつく（震える）原因は何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "マウスを強く握り込みすぎる「デスグリップ」と、屈筋と伸筋（拮抗筋）の過度な同時収縮が原因です。力みがあると方向転換のたびに筋肉同士が反発し、滑らかな追従が阻害されてしまいます。"
        }
      },
      {
        "@type": "Question",
        "name": "スムーズパースート（滑動性眼球運動）とリアクティブトラッキングの違いは？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "スムーズパースートは等速で一定方向に動く予測可能な標的を追う運動です。一方、リアクティブトラッキングは突然の切り返しに対応するため、脳の予測が働かず純粋な視覚反射によって修正されます。"
        }
      },
      {
        "@type": "Question",
        "name": "Apex Legendsのプロ選手はどのようにトラッキングを鍛えていますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "プロ選手は近距離での切り返し練習を反復し、敵の腰や足元の傾き（慣性減速フレーム）から切り返しの予兆を読み取る訓練を行っています。"
        }
      },
      {
        "@type": "Question",
        "name": "レレレ撃ち対策にはどのマウスマウス持ち方が最適ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "手首や指先の可動域を広く活用できるリラックスした「つかみ持ち（Claw）」や「つまみ持ち（Fingertip）」が推奨されます。手のひらを固定しないことで高頻度な微小反転を素早く処理できます。"
        }
      },
      {
        "@type": "Question",
        "name": "オーバーウォッチ2の高速切り返しにどう対応すべきですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "オーバーウォッチ2は加速フレームが存在せず慣性なしで即座に切り返せるため、ヤマを張らずに反転を目視した瞬間の減速ブレーキ反射を徹底的に磨く必要があります。"
        }
      },
      {
        "@type": "Question",
        "name": "マウスポーリングレートはトラッキングに影響しますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい。1000Hz以上の高ポーリングレートはミリ秒単位で位置座標を送信するため、ジッター微調整時の入力カクつきを抑え、滑らかなトラッキング軌道を実現します。"
        }
      },
      {
        "@type": "Question",
        "name": "脳が敵の切り返しを認識して方向転換するまでに何秒かかりますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "網膜での刺激検知に約160〜210ms、運動野からの筋収縮指令・減速反転実行に約80〜130msかかるため、無予測の切り返しには生理学的に約240〜340msの遅延が生じます。"
        }
      },
      {
        "@type": "Question",
        "name": "このドリルは近距離のショットガンやSMG撃ち合いに有効ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "極めて有効です。近距離戦闘は画面内の角速度が最も高くなるため、本ドリルで動体視力と脱力追従を身につけることで至近距離での命中率が飛躍的に向上します。"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "レレレ撃ち・ジッタートラッキングの練習方法",
    "description": "高速ADAD移動に対するリアクティブトラッキングを鍛えるステップバイステップ手順。",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "感度設定の確認とマッピング",
        "text": "セッション設定でプレイ中のゲーム感度と一致させ、1:1の筋肉記憶伝達を保証します。"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "ポインタロックの有効化",
        "text": "「ドリル開始」をクリックして全画面表示とPointer Lockを有効にし、OS加速を完全に排除します。"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "標的球体への中心視野アンカー",
        "text": "クロスヘアを見つめるのではなく、激しく左右に切り返す標的そのものへ視線を強く固定します。"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "脱力した手首・指先による微小反転追従",
        "text": "グリップの力みを抜き、急激な方向転換に対して大振りのフリックを行わず、速度を合わせた滑らかな切り返しで照準を吸い付かせます。"
      }
    ]
  };

  const antiStrafeGuide = {
    heading: "レレレ撃ち（アンチストラフ）練習ガイド & 反応追従バイオメカニクス",
    intro: [
      "至近距離の激しい撃ち合いにおいて、勝敗を決定づけるのはADAD切り返し移動（レレレ撃ち）、屈伸連打、そして瞬間的な速度反転に対するトラッキング精度です。一定方向に進む標的を滑らかに追尾するスムーズパースート（Krauzlis, 2004）とは異なり、リアクティブトラッキングは連続的な網膜スリップ誤差の検出と素早い筋力反転を要求します (Rashbass, 1961)。アクションゲーマーは優れた視覚注意と時間的追従帯域幅を有していますが (Green & Bavelier, 2003)、敵の予測不能な方向転換には常に神経生理学的な処理遅延が伴います。",
      "標的が急激に進行方向を反転させた瞬間、視覚情報が網膜の中心窩から外れる「網膜スリップ」が発生します。脳は反転を予知できないため、減速検知、皮質指令、手の制動ブレーキ、そして逆方向への運動加速というサイクルをミリ秒単位で処理しなければなりません。Apex LegendsやOverwatch 2のようにTTK（Time to Kill）が長いゲームでは、単発のフリックよりも標的への継続照準時間（Uptime）が直接的な勝率を決定します。",
      "本ドリルはHTML5 Pointer Lock API配下で1:1ハードウェア変換と performance.now() 高分解能タイマーを用いて動作します (Woods et al., 2015)。USBポーリングのジッターやブラウザの補間遅延を排除し、力みを抑制した拮抗筋の滑らかな制御と、切り返し時の行き過ぎ（オーバーシュート）防止を徹底的に鍛え上げます。",
      "測定仕様について：すべてのイベントはお使いの端末の performance.now() 高分解能クロックによって完全にローカルで記録され、外部へスコアが送信されることはありません。ブラウザのタイマー解像度制限（Spectre対策で通常約1ms）およびディスプレイのリフレッシュ間隔（60Hzで約16.7ms、144Hzで約6.9ms、240Hzで約4.1ms）による量子化誤差が生じるため、5ms未満の微小な差異は測定誤差として扱い、他者の環境との比較よりも同一環境での自己記録の推移を重視してください (Woods et al., 2015)。"
    ],
    benchmarks: {
      title: "リアクティブトラッキング & 切り返し反応潜時指標",
      headers: ["処理段階 / 潜時ティア", "標準レイテンシ範囲", "神経経路 & 生体力学的機能", "実戦FPSへの影響"],
      rows: [
        ["切り返し視覚検知潜時", "160 – 210 ms", "網膜スリップ信号が一次視覚野(V1)およびMT/V5運動野で処理される時間", "敵の反転を目視で知覚するまでの初期知覚遅延"],
        ["運動反転出力潜時", "80 – 130 ms", "皮質脊髄路から前腕屈筋・伸筋への伝達と拮抗筋ブレーキ", "クロスヘアの流れを停止させマウスを逆転させるまでの物理時間"],
        ["終末微小リアルタイム補正", "60 – 100 ms", "微小中心窩センタリングと閾値下での精密位置合わせ", "行き過ぎを解消し標的中心へクロスヘアを再吸着させる補正"],
        ["総無予測再捕捉ウィンドウ", "300 – 440 ms", "視覚検知、運動反転、終末補正を合算した全累積遅延", "予測不能な切り返しを受けた際に発生する標準的な人間遅延"],
        ["エリート脱力リアクティブ追従", "210 – 290 ms", "力みのない拮抗筋抑制と予兆読みによる高速制動", "Apexプレデターやプロ競技者が至近距離で見せる超高精度トラッキング"]
      ],
      note: "数値は眼球運動科学文献 (Rashbass 1961; Krauzlis 2004; Green & Bavelier 2003; Woods et al. 2015) に基づく客観的基準です。"
    },
    techniques: {
      title: "レレレ撃ち追従と照準ブレ克服のための実践テクニック",
      items: [
        {
          name: "拮抗筋の脱力（デスグリップの排除）",
          desc: "切り返し時に最も多いミスは、マウスを強く握りしめることです。屈筋と伸筋が同時に緊張すると手首が硬直してガタつきが発生し、方向転換で大きく行き過ぎてしまいます。",
          tips: "軽く添える程度のリラックスしたグリップを保ち、指先と手首で高頻度な微小振動を吸収してください。"
        },
        {
          name: "標的中心への視線アンカー固定",
          desc: "自分のクロスヘアを見つめるのをやめ、標的の胴体や中心モデルに視線をピン留めしてください。網膜の動き検出機能が働き、移動ベクトルの変化を無意識に計算できます。",
          tips: "エイムが遅れると感じたら、意識の100%を相手キャラクターの腰周辺に集中させましょう。"
        },
        {
          name: "滑らかな速度同調（オーバーフリックの抑止）",
          desc: "標的が左から右へ反転した際、焦って急激に右へフリックすると必ず行き過ぎます。フリックではなく、スムーズに減速して滑らかに標的の移動速度と同調させてください。",
          tips: "切り返しを「2回のフリック」ではなく「1つの減速・加速サイクル」として滑らかに捉えましょう。"
        },
        {
          name: "腰の向きと減速フレームの予兆読取",
          desc: "ApexやWarzoneなど慣性物理のあるゲームでは、切り返す直前にキャラクターモデルがわずかに減速・傾斜します。この予兆フレームを見逃さないことで反応を30〜50ms短縮できます。",
          tips: "モデルの足元や傾きに注目し、反転の予兆を捉える感覚を身につけましょう。"
        }
      ]
    },
    steps: [
      "セッション設定でお使いの感度を合わせ、1:1の筋肉記憶伝達を確保します。",
      "「ドリル開始」をクリックして全画面表示とPointer Lockを有効化します。",
      "激しく左右に切り返すターゲット球体へ視線を集中させます。",
      "力みを抜いた手首と指先で微小反転を吸収し、照準接触時間を最大化します。",
      "セッション終了後にトラッキング精度（%）、照準外れ時間、最大コンボを確認し、脱力制御の上達を評価します。"
    ],
    audience: "Apex Legends、Overwatch 2、Call of Duty、THE FINALSなどの高速近距離戦でレレレ撃ちに対処したいすべてのFPSプレイヤー、手首のエイムのガタつきをなくしたいゲーマー。",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'green2003', 'rashbass1961'),
    related: [
      { href: "/drills/fps/vertical-air-track", label: "空中垂直トラッキング" },
      { href: "/drills/fps/pro-smooth-pursuit", label: "スムーズパースート・エイム練習" },
      { href: "/drills/fps/flick-shot-training", label: "フリック エイム 練習" },
      { href: "/drills/fps/180-degree-awareness", label: "180度 振り向き 練習" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "反応速度測定テスト" }
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
      <AntiStrafeJitterClient
        copy={{
          h1Keyword: "レレレ撃ち 練習",
          h1Suffix: " - 近距離ジッタートラッキング",
          statScore: "スコア",
          statTime: "残り時間",
          statAccuracy: "追従精度",
          statBestScore: "自己ベスト",
          startTitle: "レレレ撃ち 練習 (ジッタートラッキング)",
          startSubtitle: "リアクティブ敵動作読取 • エンドレス難易度進行",
          getReady: "準備完了",
          pausedTitle: "一時停止中",
          pausedSubtitle: "クリックして再開 — カーソルロックが再適用されます",
          stageCaption: "急激に左右切り返し（レレレ撃ち）を繰り返す近距離ターゲットに照準を維持し続けてください。",
          rulesTitle: "ドリル手順 & スコアリングシステム",
          rulesItems: [
            { num: "1", text: "照準のアライメント", highlight: "+50 PTS (+0.4秒/秒)", result: "×コンボ倍率" },
            { num: "2", text: "連続トラッキング", highlight: "最大 3.0×", result: "最大倍率" },
            { num: "3", text: "レベル進行", highlight: "+1 レベル / 1400 PTS", result: "可変ジッター加速" },
            { num: "4", text: "ロック外れペナルティ", highlight: "1.0秒 ロック外れ", result: "コンボリセット (-0.6秒)" }
          ],
          aboutTitle: "レレレ撃ち 練習について",
          aboutHeading: "リアクティブトラッキング（レレレ撃ち追従）とは？"
        }}
      />
      <DrillGuide guide={antiStrafeGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/anti-strafe-jitter-duel"
          locale="ja"
        />
      </div>
      <DrillFooter />
    </>
  );
}
