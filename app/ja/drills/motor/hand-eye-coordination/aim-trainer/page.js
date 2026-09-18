import AimTrainerClient from '@/app/drills/motor/hand-eye-coordination/aim-trainer/AimTrainerClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (motor / hand-eye-coordination / aim-trainer)
// PRIMARY DOMESTIC: "エイム練習" — 1,379 exact / 1,706 broad Bing searches/mo (Domestic #1 winner)
//                   "エイム練習 無料 ブラウザ" — 255 exact searches/mo
//                   "置きエイム" — 699 exact searches/mo
// SECONDARY / LSI:
//                   "aim練習" — 119 exact searches/mo
//                   "エイムラボ 無料 ブラウザ" — 82 exact searches/mo
//                   "aim trainer" — 93 exact / 347 broad searches/mo
//                   "valorant 置きエイム 練習" — 183 searches/mo
// WINNER TITLE:     エイム練習 – 無料ブラウザFPSエイムトレーナー・マウス精度測定 | SkillDrills
// ============================================================

export const metadata = {
  title: 'エイム練習 – 無料ブラウザFPSエイムトレーナー・マウス精度測定 | SkillDrills',
  description:
    '登録不要・ブラウザで今すぐできる無料FPSエイム練習ツール。小さくなる動的ターゲットを連続撃破し、マイクロフリック精度と初弾捕捉速度をフィッツの法則に基づき強化。VALORANT、Apex Legends、CS2のウォームアップに最適。',
  keywords: ['エイム練習', 'エイムトレーナー', 'fps エイム 練習', 'マウス 精度 テスト', 'エイム練習 無料 ブラウザ', 'フリックショット 練習', 'フィッツの法則 エイム', 'valorant エイム練習', '初弾 命中率 トレーニング', '反動制御 エイム 練習', 'apex ウォームアップ エイム', 'エイム 反応速度 測定'],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/aim-trainer',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/aim-trainer'),
  },
  openGraph: {
    title: 'エイム練習 – 無料ブラウザFPSエイムトレーナー・マウス精度測定 | SkillDrills',
    description:
      '無料オンラインFPSエイム練習。動くターゲットを素早く正確にクリックしてマウス精度とフリック速度を測定・強化。インストール不要。',
    url: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/aim-trainer',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'エイム練習 – 無料ブラウザFPSエイムトレーナー・マウス精度測定 | SkillDrills',
    description:
      '無料ブラウザFPSエイム練習。マイクロフリックと初弾マウス精度を鍛える動的エイムトレーナー。',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: '訓練ハブ', item: 'https://skilldrills.online/ja/drills' },
    { '@type': 'ListItem', position: 3, name: '運動制御・マウス操作', item: 'https://skilldrills.online/ja/drills/motor' },
    { '@type': 'ListItem', position: 4, name: '手と目の協調性', item: 'https://skilldrills.online/ja/drills/motor' },
    { '@type': 'ListItem', position: 5, name: 'エイム練習', item: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/aim-trainer' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'エイム練習 – 無料ブラウザFPSエイムトレーナー',
  alternateName: ['エイム練習', 'FPSエイムトレーナー', 'マウス精度テスト', 'Aim Trainer Online'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description:
    'ブラウザ上で動くターゲットを狙ってクリックし、マウス精度、マイクロフリック速度、手と目の協調性を測定・訓練する無料エイム練習ツール。',
  browserRequirements: 'JavaScriptおよびPointer Lock対応の最新Webブラウザ（Chrome, Edge, Safari, Firefox）',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'エイム練習 — 無料オンラインFPSエイムトレーナー | SkillDrills',
  url: 'https://skilldrills.online/ja/drills/motor/hand-eye-coordination/aim-trainer',
  description:
    '無料ブラウザFPSエイム練習ツール。動くターゲットを正確に捉え、フィッツの法則に基づいた難易度上昇でエイム力を極限まで引き上げます。',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'JavaScriptおよびPointer Lock API対応の最新ブラウザ。',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'エイム精度, マイクロフリック, マウスコントロール, 手と目の協調性, 弾道移動制御',
};


const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "エイム練習 (Aim Trainer)",
  "url": "https://skilldrills.online/ja/drills/motor/hand-eye-coordination/aim-trainer",
  "description": "Free online browser-based 2D aim trainer for FPS gamers. Practice target acquisition, mouse accuracy, and click timing.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Aim Trainer", "FPS Training", "Hand-Eye Coordination", "Reaction Speed"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'ブラウザでのエイム練習方法と手順',
  description: 'SkillDrillsの無料エイム練習ツールを使ってマウス精度とフリック速度を鍛える手順。',
  step: [
    {
      '@type': 'HowToStep',
      "position": 1,
      "url": "https://skilldrills.online/ja/drills/motor/hand-eye-coordination/aim-trainer#step-1",
      
      name: 'エイム練習の開始',
      text: '「トレーニング開始」をクリックして全画面のエイム測定ステージに入り、マウスカーソルを固定します。',
    },
    {
      '@type': 'HowToStep',
      "position": 2,
      "url": "https://skilldrills.online/ja/drills/motor/hand-eye-coordination/aim-trainer#step-2",
      
      name: '出現したターゲットの視認',
      text: '画面内に出現して移動・縮小するターゲットへ素早く視線を合わせます。',
    },
    {
      '@type': 'HowToStep',
      "position": 3,
      "url": "https://skilldrills.online/ja/drills/motor/hand-eye-coordination/aim-trainer#step-3",
      
      name: '初期弾道フリックと微小減速クリック',
      text: 'マウスをターゲット方向へ素早く移動させ、消滅する前に目標中心を正確にクリックします。',
    },
    {
      '@type': 'HowToStep',
      "position": 4,
      "url": "https://skilldrills.online/ja/drills/motor/hand-eye-coordination/aim-trainer#step-4",
      
      name: 'コンボの継続とレベルアップ',
      text: 'ミスを避け連続で撃破し、3.0倍のコンボボーナスと高難易度レベルへの到達を目指します。',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'エイム練習（Aim Trainer）とはどのようなツールですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'エイム練習は、マウスカーソルを画面上のターゲットへ素早く正確に移動させ、クリックする能力を測定・強化するブラウザツールです。動的ターゲットの縮小と移動速度上昇により、実戦のFPSに必要な初弾精度を鍛えます。',
      },
    },
    {
      '@type': 'Question',
      name: 'フィッツの法則（Fitts\'s Law）はエイム練習にどう関係していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'フィッツの法則は、目標に到達する移動時間が目標までの距離と目標サイズの比率に対数比例することを示します。ターゲットが小さくなるほど難易度指数（ID）が急上昇し、高度な微細運動制御が求められます。',
      },
    },
    {
      '@type': 'Question',
      name: '2成分モデル（弾道移動とフィードバック制御）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'エイム動作は、距離の80〜90%を一気に詰める「初期弾道インパルス（オープンループ）」と、着弾直前に視覚情報を使って微調整する「終末減速制御（クローズドループ）」の2段階で構成されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'このエイム練習はVALORANTやApex Legendsの実戦に役立ちますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。VALORANTにおけるヘッドショット初弾精度や、Apex Legendsにおける近接戦闘でのマイクロフリックは、まさにこのドリルが鍛える10〜15度の微小弾道修正能力に直結しています。',
      },
    },
    {
      '@type': 'Question',
      name: 'エイム練習で良いスコアの目安はどれくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '初級者は8,000点未満、中級者は18,000〜31,999点（レベル6〜8）、上級競技者は32,000点以上、競技プロ・エリート層は48,000点以上（レベル12以上、精度95%超）が目安です。',
      },
    },
    {
      '@type': 'Question',
      name: '難易度はどのように上がっていきますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1,750ポイント獲得ごとにレベルが上昇します。ターゲットの半径が26pxから8pxまで縮小し、移動速度が80px/sから370px/sへ加速し、消滅までの猶予時間が2.8秒から0.40秒まで短縮されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'クリックを空振りしたり見逃すとどうなりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '空振りや消滅見逃しが発生すると、コンボ倍率が1.0倍にリセットされます。これにより、やみくもな連打を防ぎ、一撃必中の丁寧なマウスコントロールが習慣化されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'ゲームごとのマウス感度と一致させることはできますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。Pointer Lock APIによるRawマウス入力に対応しており、訓練ハブ共通のマウス感度設定と連動して普段のゲームと同じ振り向きcm数で練習できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'モニターのリフレッシュレートやポーリングレートは影響しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '大きく影響します。144Hzや240Hzの高リフレッシュレートモニターと1000Hz以上のマウスを使用すると、視覚遅延が大幅に短縮され、終末減速フェーズでの修正が格段に正確になります。',
      },
    },
    {
      '@type': 'Question',
      name: '効果的な毎日のウォームアップ方法は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '試合前に10〜15分間、無理に急がず確実な初弾命中（精度90%以上）を意識して練習することで、運動皮質の興奮性が高まり、試合中のエイムが劇的に安定します。',
      },
    },
  ],
};

export default function AimTrainerJapanesePage() {
  const sources = pickSources('fitts1954', 'mackenzie1992', 'elliott2010', 'woodworth1899', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <AimTrainerClient
        copy={{
          title: 'エイム練習 (Aim Trainer)',
          subtitle: '動くターゲットへの瞬時エイム・クリック精度測定・無制限レベル進行',
          caption: '小さくなりながら移動するターゲットを消滅前に素早く正確にクリック。フィッツの法則に基づく動的難易度調整。',
        }}
      />

      <DrillGuide
        eyebrow="運動制御・精神物理学・ヒューマンコンピュータインタラクション (HCI)"
        title="エイム練習の科学：フィッツの法則と2成分運動モデルによるマウス精度向上"
        sources={sources}
      >
        <p>
          マウスを用いたターゲット捕捉（Aiming）は、人間とコンピュータの相互作用（HCI）およびスポーツ精神物理学において最も過酷な微細運動協調課題の一つです。タクティカルFPSでの交戦や外科手術ロボットの操作、精密な視覚運動検査において、ヒトの神経筋システムは2次元の視覚座標を、手・手首・前腕のサブミリ単位の急速な筋収縮へと変換しなければなりません（Fitts, 1954; MacKenzie, 1992）。
        </p>

        <h3>フィッツの法則（Fitts&apos;s Law）と難易度指数（Index of Difficulty）</h3>
        <p>
          1954年にポール・M・フィッツが提唱した定式によれば、ある目標領域へ迅速に移動するために必要な運動時間（\(MT\)）は、目標までの距離（\(D\)）と目標の幅や直径（\(W\)）によって数学的に決定されます：
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 my-3 text-center font-mono text-sm text-cyan-300">
          MT = a + b · log₂(2D / W) = a + b · ID
        </div>
        <p>
          この対数項は<strong>難易度指数（ID: Index of Difficulty）</strong>と呼ばれ、ビット単位で表されます。SkillDrillsの<em>エイム練習</em>では、スコアレベルが上昇するにつれてターゲットの直径（\(W\)）が26ピクセルから8ピクセルへと縮小し、かつ広範な距離（\(D\)）へ高速移動します。これにより難易度指数が急激に上昇し、プレイヤーの情報処理能力と運動制御能力に最大負荷をかけます（Fitts, 1954; MacKenzie, 1992）。
        </p>

        <h3>目標志向型エイムの2成分モデル（Woodworth 1899; Elliott et al. 2010）</h3>
        <p>
          高速なマウスエイムは、単一の連続的な動きではありません。ウッドワース（1899）の先駆的研究およびエリオットら（2010）の現代神経筋統合モデルによって、目標志向型エイム動作は2つの明確な生理学的フェーズで構成されることが立証されています：
        </p>
        <ol className="list-decimal pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>初期弾道インパルス（オープンループ期）：</strong> 中枢神経系が事前にプログラムした神経筋バーストを発令し、移動距離の80〜90%を一気にカバーします。この弾道フェーズは約120〜180ミリ秒で完了するため、視覚フィードバックによる軌道修正は間に合いません。
          </li>
          <li>
            <strong>終末減速・微小フィードバック制御（クローズドループ期）：</strong> クロスヘアがターゲット外縁に接近すると、網膜スリップ誤差が小脳および運動皮質へ送られ、着弾直前のサブミリ単位の微修正が行われてクリックが実行されます。
          </li>
        </ol>
        <p>
          未熟なプレイヤーは「オーバーフリック（勢い余って行き過ぎ、左右に揺れ戻す）」や「アンダーフリック（手前で止まり、這うように目標に近づく）」に陥りがちです。熟練プレイヤーは弾道インパルスを目標の真上に正確に着地させ、終末修正を最小限に抑えることで超高速かつ確実な命中を実現します（Elliott et al., 2010; Woods et al., 2015）。
        </p>

        <h3>入力ポーリング・表示更新と知覚遅延の最適化</h3>
        <p>
          正確なクリックタイミングには、システム全体の入力遅延低減が不可欠です。ウッズら（2015）の報告にあるように、ヒトの神経伝達遅延は網膜受容（30〜50ms）、大脳皮質処理（60〜80ms）、皮質脊髄路運動伝達（40〜60ms）で構成されます。60Hzディスプレイの更新間隔は16.7msですが、144Hzでは6.9ms、240Hzでは4.1msに短縮され、終末減速フェーズにおける視覚的修正精度が飛躍的に向上します。
        </p>

        <h3>エイム練習 パフォーマンス指標・実力目安表</h3>
        <p>
          以下のテーブルは、SkillDrillsにおける45秒間セッションスコア、命中精度、最大コンボに基づく実力指標です。日々の練習成果の判定にご活用ください。
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left border-collapse border border-white/10 text-xs sm:text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-200">
                <th className="p-2.5 border border-white/10 font-bold">ランク</th>
                <th className="p-2.5 border border-white/10 font-bold">セッションスコア</th>
                <th className="p-2.5 border border-white/10 font-bold">到達レベル</th>
                <th className="p-2.5 border border-white/10 font-bold">命中精度</th>
                <th className="p-2.5 border border-white/10 font-bold">競技クラス判定</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-emerald-400">Tier 1 (エリート)</td>
                <td className="p-2.5 border border-white/10">&gt; 48,000 PTS</td>
                <td className="p-2.5 border border-white/10">Level 12+</td>
                <td className="p-2.5 border border-white/10">&gt; 95% (コンボ25+)</td>
                <td className="p-2.5 border border-white/10">FPSプロ競技者・最高峰マークスマン</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-cyan-400">Tier 2 (エキスパート)</td>
                <td className="p-2.5 border border-white/10">32,000 – 47,999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 9–11</td>
                <td className="p-2.5 border border-white/10">88% – 94% (コンボ18–24)</td>
                <td className="p-2.5 border border-white/10">上級ランク常連・高精度フラッガー</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-blue-400">Tier 3 (中級)</td>
                <td className="p-2.5 border border-white/10">18,000 – 31,999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 6–8</td>
                <td className="p-2.5 border border-white/10">78% – 87% (コンボ12–17)</td>
                <td className="p-2.5 border border-white/10">一般的なFPS愛好者・安定したエイム力</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-amber-400">Tier 4 (初級)</td>
                <td className="p-2.5 border border-white/10">8,000 – 17,999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 3–5</td>
                <td className="p-2.5 border border-white/10">65% – 77% (コンボ6–11)</td>
                <td className="p-2.5 border border-white/10">エイム習得段階・ブレや空振り傾向あり</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-rose-400">Tier 5 (入門)</td>
                <td className="p-2.5 border border-white/10">&lt; 8,000 PTS</td>
                <td className="p-2.5 border border-white/10">Level 1–2</td>
                <td className="p-2.5 border border-white/10">&lt; 65% (コンボ&lt;6)</td>
                <td className="p-2.5 border border-white/10">高ジッター・焦りによる連打過多</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>エイム練習を最大効率化する4つの科学的メソッド</h3>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>初期弾道インパルスの強化（Woodworth, 1899）：</strong> ターゲットまでの距離の大部分をためらわずに一撃で振り切る感覚を反復します。途中でマウスを迷わせず、一息の動作で目標の真近まで運ぶことが重要です。
          </li>
          <li>
            <strong>終末減速とマイクロアジャストの調和（Fitts, 1954）：</strong> 目標の手前で手首や指先の微小制御へスムーズに移行し、惰性による行き過ぎを抑えて目標中心を捉えます。
          </li>
          <li>
            <strong>感度（振り向きcm）の統一（MacKenzie, 1992）：</strong> 普段プレイしているゲームと同じ回転比率にマウス感度を揃え、神経筋記憶の干渉を排除します。
          </li>
          <li>
            <strong>クリック時の指先脱力とグリップ安定（Woods et al., 2015）：</strong> マウスをクリックする瞬間に力んでカーソルがブレないよう、リラックスしたグリップを保ち、独立したクリック指の動作を意識します。
          </li>
        </ul>

        <h3>よくある質問（FAQ）</h3>
        <div className="space-y-4 my-4">
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">エイム練習（Aim Trainer）とはどのようなツールですか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              エイム練習は、マウスカーソルを画面上のターゲットへ素早く正確に移動させ、クリックする能力を測定・強化するブラウザツールです。動的ターゲットの縮小と移動速度上昇により、実戦のFPSに必要な初弾精度を鍛えます。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">フィッツの法則（Fitts&apos;s Law）はエイム練習にどう関係していますか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              フィッツの法則は、目標に到達する移動時間が目標までの距離と目標サイズの比率に対数比例することを示します。ターゲットが小さくなるほど難易度指数（ID）が急上昇し、高度な微細運動制御が求められます。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">2成分モデル（弾道移動とフィードバック制御）とは何ですか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              エイム動作は、距離の80〜90%を一気に詰める「初期弾道インパルス（オープンループ）」と、着弾直前に視覚情報を使って微調整する「終末減速制御（クローズドループ）」の2段階で構成されます。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">このエイム練習はVALORANTやApex Legendsの実戦に役立ちますか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              はい。VALORANTにおけるヘッドショット初弾精度や、Apex Legendsにおける近接戦闘でのマイクロフリックは、まさにこのドリルが鍛える10〜15度の微小弾道修正能力に直結しています。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">エイム練習で良いスコアの目安はどれくらいですか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              初級者は8,000点未満、中級者は18,000〜31,999点（レベル6〜8）、上級競技者は32,000点以上、競技プロ・エリート層は48,000点以上（レベル12以上、精度95%超）が目安です。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">難易度はどのように上がっていきますか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              1,750ポイント獲得ごとにレベルが上昇します。ターゲットの半径が26pxから8pxまで縮小し、移動速度が80px/sから370px/sへ加速し、消滅までの猶予時間が2.8秒から0.40秒まで短縮されます。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">クリックを空振りしたり見逃すとどうなりますか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              空振りや消滅見逃しが発生すると、コンボ倍率が1.0倍にリセットされます。これにより、やみくもな連打を防ぎ、一撃必中の丁寧なマウスコントロールが習慣化されます。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">ゲームごとのマウス感度と一致させることはできますか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              はい。Pointer Lock APIによるRawマウス入力に対応しており、訓練ハブ共通のマウス感度設定と連動して普段のゲームと同じ振り向きcm数で練習できます。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">モニターのリフレッシュレートやポーリングレートは影響しますか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              大きく影響します。144Hzや240Hzの高リフレッシュレートモニターと1000Hz以上のマウスを使用すると、視覚遅延が大幅に短縮され、終末減速フェーズでの修正が格段に正確になります。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">効果的な毎日のウォームアップ方法は？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              試合前に10〜15分間、無理に急がず確実な初弾命中（精度90%以上）を意識して練習することで、運動皮質の興奮性が高まり、試合中のエイムが劇的に安定します。
            </p>
          </div>
        </div>
      </DrillGuide>
    </>
  );
}
