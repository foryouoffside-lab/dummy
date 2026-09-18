import RhythmAnomalyClient from '@/app/drills/visual/visual-recognition/rhythm-anomaly/RhythmAnomalyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "視覚リズムテスト: 時間分解能・点滅弁別トレーニング | SkillDrills",
  description: "36マスの点滅グリッドから位相のズレた異常セルを最速検出する無料視覚リズムテスト。網膜マグノ細胞の時間分解能と動的フリッカー弁別能力を正確に測定・強化。",
  keywords: [
    "視覚リズムテスト",
    "時間分解能 測定",
    "フリッカー弁別テスト",
    "臨界フリッカー融合頻度 CFF",
    "点滅アノマリー 検知",
    "時間的位相差 検出",
    "マグノ細胞 視覚機能",
    "動的視覚タイミング 訓練",
    "時間知覚 テスト",
    "視覚周期性 識別"
],
  openGraph: {
    title: "視覚リズムテスト: 時間分解能・点滅弁別トレーニング | SkillDrills",
    description: "36マスの点滅グリッドから位相のズレた異常セルを最速検出する無料視覚リズムテスト。大細胞系M経路の時間分解能とフリッカー弁別能力をオンラインで測定・強化。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly",
    siteName: "SkillDrills",
  },
  twitter: {
    card: "summary_large_image",
    title: "視覚リズムテスト: 時間分解能・点滅弁別トレーニング | SkillDrills",
    description: "36マスの点滅グリッドから位相のズレた異常セルを最速検出する無料視覚リズムテスト。大細胞系M経路の時間分解能とフリッカー弁別能力をオンラインで測定・強化。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/rhythm-anomaly', 'ja'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja/" },
    { "@type": "ListItem", "position": 2, "name": "視覚トレーニング", "item": "https://skilldrills.online/ja/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "視覚認識", "item": "https://skilldrills.online/ja/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "視覚リズムアノマリーテスト – 時間分解能訓練", "item": "https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "視覚リズムアノマリーテスト – 時間分解能訓練",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "無料のオンライン視覚リズム＆時間分解能テスト。6x6の脈動する36セルから位相の狂った異常セルを素早く検出するタイムアタック測定。",
  "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "視覚リズム＆時間分解能アノマリーテスト",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly",
  "applicationCategory": "EducationalApplication",
  "dateModified": "2026-09-05"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "視覚リズムアノマリー弁別ゲーム",
  "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly",
  "description": "無料の視覚タイミング＆点滅周波数弁別ゲーム。脈動する光学グリッドから位相や周期の異なる異常セルを瞬時に見極めてタップ。",
  "genre": ["Action", "Brain Game", "Timing Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "視覚リズム弁別と異常点滅の検出能力を高めるトレーニング法",
  "description": "視覚心理物理学に基づき、網膜の大細胞系神経および大脳視覚野の時間分解能を極限まで引き上げる4段階の実践プロトコル。",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "脈動するグリッドの中心に視線を固定",
      "text": "6x6グリッドの中心に視線をリラックスさせて置き、36セル全体が同期して点滅する基準リズムを捉えます。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "基準パルスの周期的テンポを脳内に同調",
      "text": "視覚野を正弦波状の輝度変化に同調させ、脳内に安定した時間的ベースラインを構築します。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "位相が狂った異常パルス（アノマリー）を検出",
      "text": "同期する周囲のセルよりわずかに早くピークに達するか、異なる周期で脈動する単一の異常セルを特定します。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "電光石火のタップで反応レイテンシを記録",
      "text": "異常を察知した瞬間にクリックし、ミリ秒単位の時間分解能と正確性スコアを記録します。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "視覚リズムテスト（Rhythm Anomaly Drill）は何を測定しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "視覚的時間周波数の弁別力と時間分解能を測定します。36個の脈動セルの中から、位相や点滅周期がわずかにズレた異常セルを瞬時に見抜く能力を評価します。"
      }
    },
    {
      "@type": "Question",
      "name": "視覚系はどのように非同期リズムや時間的位相差を感知しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "網膜から伸びる大細胞系（M経路）を介して感知します。M細胞は急激な輝度変化に敏感に応答し、異常セルの位相先行が一次視覚野で直感的なポップアウトを引き起こします。"
      }
    },
    {
      "@type": "Question",
      "name": "大細胞系（M）と小細胞系（P）の根本的な違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "大細胞系は大きな受容野と高速な伝導速度を持ち、動き・点滅・時間変化の検出に特化しています。小細胞系は小さな受容野を持ち、色彩や静止した微細な形態の認識に優れています。"
      }
    },
    {
      "@type": "Question",
      "name": "臨界フリッカー融合頻度（CFF）と反応速度の関係は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CFFは断続的な点滅光が連続した光に見え始める境界周波数（通常35〜60Hz）です。CFF値が高い人ほど視覚の時間積分窓が短く、素早い動的反応が可能になります。"
      }
    },
    {
      "@type": "Question",
      "name": "45秒のテストで優秀とされるスコアはどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "初級者は50〜99点、経験者は100〜149点に達します。プロゲーマーやトップアスリートは150〜200点以上を獲得し、10回以上の連続正解ストリークを叩き出します。"
      }
    },
    {
      "@type": "Question",
      "name": "正解を重ねるとなぜグリッドの点滅が加速するのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "連続正解により基準点滅速度が引き上げられ、異常セルとの時間差（Delta-T）が狭まります。これにより視覚処理が神経生理学的な限界付近まで押し上げられます。"
      }
    },
    {
      "@type": "Question",
      "name": "途中で発生するランダムな閃光（エントロピーノイズ）の目的は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "瞬間的な明暗差だけで正解を見つける抜け道を塞ぐためです。脳に一過性のノイズと持続的な正弦波パルスを正確に分別させる役割があります。"
      }
    },
    {
      "@type": "Question",
      "name": "誤タップや時間切れに対するペナルティはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "点数の減点や残り時間の没収はありません。ミス時は赤い閃光が表示されて連続ストリークがリセットされるだけですので、積極的なタップが推奨されます。"
      }
    },
    {
      "@type": "Question",
      "name": "モニターのリフレッシュレート（60Hz vs 144Hz+）は影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "大きく影響します。60Hzは16.7msごとにしか更新されませんが、144Hz〜240Hzでは6.9〜4.2ms間隔で滑らかな正弦波が描画され、微細な位相差をより正確に視認できます。"
      }
    },
    {
      "@type": "Question",
      "name": "格闘ゲームやFPS、球技の選手に視覚リズム訓練が役立つ理由は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "敵の飛び出しモーション、アニメーションの発生フレーム、高速ボールの軌道変化などをコンマ数秒早く察知して反応する時間的直観力を研ぎ澄ますことができるからです。"
      }
    }
  ]
};

export default function RhythmAnomalyLocalePage() {
  const sources = pickSources('holcombe2009', 'kelly1961', 'delange1958', 'burr1980', 'posner1980', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <RhythmAnomalyClient copy={{ title: "視覚リズムアノマリー弁別ゲーム" }} />
      <DrillGuide
        eyebrow="時間心理物理学 & 視覚クロノメトリー"
        title="視覚リズム・フリッカー融合・時間周波数弁別の神経科学"
        sources={sources}
      >
        <p dangerouslySetInnerHTML={{ __html: `従来の視力検査は網膜上の細かいディテールを識別する『空間分解能』のみを測定しますが、実世界の反応速度や競技パフォーマンスは、連続する視覚事象を時間的に分離する<em>時間分解能（Temporal Resolution）</em>に強く制約されます。時速150kmの投球、テニスの高速ラリー、FPSゲームの飛び出し索敵など、あらゆる動的状況において重要なのは、視覚皮質が時間変化する輝度信号をどれほど高頻度でサンプリングできるかです (De Lange, 1958; Kelly, 1961; Holcombe, 2009)。` }} />

        <h3>時間的変調伝達関数と大細胞系（M経路）</h3>
        <p dangerouslySetInnerHTML={{ __html: `人間の視覚伝導路は、精細な形態や色彩を担う小細胞系（P経路）と、動き・点滅・低コントラスト変化を電光石火で伝える大細胞系（M経路）に分かれます。大細胞系ニューロンは太い有髄軸索を持ち、伝導遅延が極めて短いため、40〜50Hzに及ぶ高周波の明滅や位相のズレを捉えるのに最適化されています (De Lange, 1958; Holcombe, 2009)。36個のパルスセルの中で1マスだけ周期が先行すると、一次視覚野（V1）に明瞭な位相差信号が生じ、無意識的な『ポップアウト』を引き起こします (Kelly, 1961; Burr, 1980)。` }} />

        <h3>時間知覚の2つの限界：高速サンプリング vs 遅い統合バインディング</h3>
        <p dangerouslySetInnerHTML={{ __html: `Holcombe（2009）の研究は、人間の時間的視覚処理が2つの異なる生理学的天井を持つことを実証しました。網膜およびV1が明滅を分離する<strong>低次サンプリング限界（約40〜50Hz）</strong>と、物体の意味を識別して統合する<strong>高次皮質バインディング限界（約2〜5Hz）</strong>です。本ドリルはこれら2系統の連携を鍛えます。M経路のフリッカー検知を即座に注意ネットワークへ橋渡しし、パルス周期が終わる前に迅速な認知的判断を下す能力を高めます。` }} />

        <h3>時間積分窓（Temporal Integration Window）とエントロピーノイズ</h3>
        <p dangerouslySetInnerHTML={{ __html: `人間の視覚系は、約30〜100ミリ秒という短い時間窓（時間積分窓）の中で光を合算します (Burr, 1980; Woods et al., 2015)。この窓の中で生じた光は1つの連続した像として認識されます。ドリル中に散発する『エントロピー閃光』は、この積分窓にランダムなノイズを混入させます。これにより、単なる明るさの瞬きに惑わされず、真の正弦波的な周期変動を抽出する能力が強制的に強化されます (Burr, 1980; Posner, 1980)。` }} />

        <h3>視覚時間分解能 性能ベンチマーク（45秒脈動グリッド）</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">ランク</th>
                <th className="py-2.5 px-3 font-semibold">分類呼称</th>
                <th className="py-2.5 px-3 font-semibold">45秒スコア</th>
                <th className="py-2.5 px-3 font-semibold">速度レベル</th>
                <th className="py-2.5 px-3 font-semibold">弁別閾値（Delta-T）</th>
                <th className="py-2.5 px-3 font-semibold">時間知覚プロファイル</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">クロノ・マスター</td>
                <td className="py-2.5 px-3 tabular-nums">200+ PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 8+</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 60 ms</td>
                <td className="py-2.5 px-3">瞬間的な位相差捕捉；完璧なノイズ抑制；CFF限界付近の超高感度。</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">フェーズ・ディテクター</td>
                <td className="py-2.5 px-3 tabular-nums">150–199 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 6–7</td>
                <td className="py-2.5 px-3 tabular-nums">60–90 ms</td>
                <td className="py-2.5 px-3">極めて高い時間分解能；1〜2周期以内に異常セルを高速分離。</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">プロフィシェント</td>
                <td className="py-2.5 px-3 tabular-nums">100–149 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 4–5</td>
                <td className="py-2.5 px-3 tabular-nums">91–130 ms</td>
                <td className="py-2.5 px-3">安定したリズム弁別；テンポ加速時にわずかな確認遅延が生じる。</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">ディベロッパー</td>
                <td className="py-2.5 px-3 tabular-nums">50–99 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 2–3</td>
                <td className="py-2.5 px-3 tabular-nums">131–180 ms</td>
                <td className="py-2.5 px-3">順次探索に頼る傾向；エントロピー閃光による誤認が散見。</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">フェーズ・フュージョン</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 50 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 1</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 180 ms</td>
                <td className="py-2.5 px-3">広い時間積分による滲み；微小な周波数差の識別に苦戦。</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>時間分解能を最大化する実践トレーニングプロトコル</h3>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>大細胞系ソフトフォーカス:</strong> 1マスずつ順番に注視するのは禁物です。グリッドの中心に視線を落として視野全体をぼんやり広く捉えると、大細胞系の広い受容野が視野全体の明滅リズムを同時にモニタリングできます (Holcombe, 2009)。
          </li>
          <li>
            <strong>位相波面の比較法:</strong> 『わずかに先行する光』を探してください。異常セルは周波数が高いため、周囲のセルよりも数十ミリ秒早くピーク輝度に達し、目に見える位相の波面を作り出します (Kelly, 1961)。
          </li>
          <li>
            <strong>エントロピー閃光の除外:</strong> 一発だけの単発閃光（ノイズ）と、連続する周期的な脈動（ターゲット）を冷静に見分けます。150〜200msだけ観察して周期的な繰り返しを確認してからタップします (Burr, 1980)。
          </li>
          <li>
            <strong>レベル昇格時のテンポ再調整:</strong> 連続正解で速度レベルが上がったら、0.2秒ほど立ち止まって新しい基準テンポを脳内に馴染ませてください。テンポのズレによる誤タップを防止できます (De Lange, 1958)。
          </li>
        </ol>

        <h3>よくある質問 (FAQ)</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">視覚リズムテスト（Rhythm Anomaly Drill）は何を測定しますか？</h4>
            <p className="text-slate-300 mt-1">
              視覚的時間周波数の弁別力と時間分解能を測定します。36個の脈動セルの中から、位相や点滅周期がわずかにズレた異常セルを瞬時に見抜く能力を評価します。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">視覚系はどのように非同期リズムや時間的位相差を感知しますか？</h4>
            <p className="text-slate-300 mt-1">
              網膜から伸びる大細胞系（M経路）を介して感知します。M細胞は急激な輝度変化に敏感に応答し、異常セルの位相先行が一次視覚野で直感的なポップアウトを引き起こします。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">大細胞系（M）と小細胞系（P）の根本的な違いは何ですか？</h4>
            <p className="text-slate-300 mt-1">
              大細胞系は大きな受容野と高速な伝導速度を持ち、動き・点滅・時間変化の検出に特化しています。小細胞系は小さな受容野を持ち、色彩や静止した微細な形態の認識に優れています。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">臨界フリッカー融合頻度（CFF）と反応速度の関係は？</h4>
            <p className="text-slate-300 mt-1">
              CFFは断続的な点滅光が連続した光に見え始める境界周波数（通常35〜60Hz）です。CFF値が高い人ほど視覚の時間積分窓が短く、素早い動的反応が可能になります。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">45秒のテストで優秀とされるスコアはどのくらいですか？</h4>
            <p className="text-slate-300 mt-1">
              初級者は50〜99点、経験者は100〜149点に達します。プロゲーマーやトップアスリートは150〜200点以上を獲得し、10回以上の連続正解ストリークを叩き出します。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">正解を重ねるとなぜグリッドの点滅が加速するのですか？</h4>
            <p className="text-slate-300 mt-1">
              連続正解により基準点滅速度が引き上げられ、異常セルとの時間差（Delta-T）が狭まります。これにより視覚処理が神経生理学的な限界付近まで押し上げられます。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">途中で発生するランダムな閃光（エントロピーノイズ）の目的は？</h4>
            <p className="text-slate-300 mt-1">
              瞬間的な明暗差だけで正解を見つける抜け道を塞ぐためです。脳に一過性のノイズと持続的な正弦波パルスを正確に分別させる役割があります。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">誤タップや時間切れに対するペナルティはありますか？</h4>
            <p className="text-slate-300 mt-1">
              点数の減点や残り時間の没収はありません。ミス時は赤い閃光が表示されて連続ストリークがリセットされるだけですので、積極的なタップが推奨されます。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">モニターのリフレッシュレート（60Hz vs 144Hz+）は影響しますか？</h4>
            <p className="text-slate-300 mt-1">
              大きく影響します。60Hzは16.7msごとにしか更新されませんが、144Hz〜240Hzでは6.9〜4.2ms間隔で滑らかな正弦波が描画され、微細な位相差をより正確に視認できます。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">格闘ゲームやFPS、球技の選手に視覚リズム訓練が役立つ理由は？</h4>
            <p className="text-slate-300 mt-1">
              敵の飛び出しモーション、アニメーションの発生フレーム、高速ボールの軌道変化などをコンマ数秒早く察知して反応する時間的直観力を研ぎ澄ますことができるからです。
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ja/drills/visual/visual-recognition/rhythm-anomaly" />
      </div>
    </>
  );
}
