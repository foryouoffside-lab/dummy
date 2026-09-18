import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

export const metadata = {
  title: '無料エイム練習＆脳トレ82種・全ドリル一覧 | SkillDrills',
  description: '8大カテゴリー全82種の無料オンライン科学的トレーニングドリル一覧。VALORANT・Apex向けエイム練習、反射神経測定、動体視力、記憶力、認知機能向上テストをブラウザで即座に開始。',
  keywords: [
    '無料エイム練習サイト', 'エイム練習ゲーム', '反射神経テスト',
    '動体視力トレーニング', '脳トレゲーム無料', '記憶力テスト',
    '周辺視野トレーニング', 'cps測定', 'フリックエイム練習',
    '追いエイム練習', 'ストループテスト', 'シュルテテーブル',
    '深視力検査', 'ワーキングメモリテスト', 'スポーツビジョントレーニング'
  ],
  openGraph: {
    title: '無料エイム練習＆脳トレ82種・全ドリル一覧 | SkillDrills',
    description: '8大カテゴリー全82種の無料オンライン科学的トレーニングドリル一覧。VALORANT・Apex向けエイム練習、反射神経測定、動体視力、記憶力、認知機能向上テストをブラウザで即座に開始。',
    type: 'website',
    url: 'https://skilldrills.online/ja/drills',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'SkillDrills 全トレーニングドリル一覧',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '無料エイム練習＆脳トレ82種・全ドリル一覧 | SkillDrills',
    description: '8大分野82種以上の無料エイムトレーナー、反射神経、認知機能トレーニング。',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills',
    languages: getAlternateLanguages('/ja/drills'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills トップ", "item": "https://skilldrills.online/ja" },
    { "@type": "ListItem", "position": 2, "name": "全トレーニングドリル一覧", "item": "https://skilldrills.online/ja/drills" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "全エイム練習＆認知・身体トレーニングドリル一覧 (82種)",
  "url": "https://skilldrills.online/ja/drills",
  "description": "8大カテゴリー全82種の科学的インタラクティブ訓練ドリル集。エイムトレーナー、反応速度、動体視力追従、認知制御、記憶力検査。",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": DRILLS.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'ja', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/ja${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
      "description": loc.tagline || drill.description,
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "SkillDrillsの82種のトレーニングドリルはどのような科学的根拠で設計されていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrillsはフィッツの法則（Fitts's Law）、メンタルクロノメトリー（反応時間測定学）、バドリーのワーキングメモリモデル、そして視覚運動神経制御理論など、第一線の神経科学およびスポーツ生体力学の知見に基づいて開発されています。単なるゲーム感覚ではなく、受容器の視覚刺激入力から大脳皮質の情報処理、末梢筋収縮へと至る神経生理学的伝達ループを精密に刺激・最適化するアルゴリズムを採用しています。"
      }
    },
    {
      "@type": "Question",
      "name": "外部アプリやプラグインのインストールなしで、なぜミリ秒単位の高精度測定ができるのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrillsの全ドリルは、ブラウザ標準の performance.now() 高解像度タイマーAPIを使用し、端末ローカル環境で直接ミリ秒未満の高精度演算を行っています。Pointer Lock APIによる生の低遅延マウス入力（Raw Input）や、HTML5 Canvasによる60〜240Hz高リフレッシュレート描画に対応しているため、サーバー通信ラグや入力遅延の影響を受けることなく即座に訓練可能です。"
      }
    },
    {
      "@type": "Question",
      "name": "FPS（VALORANT、Apex Legends、CS2）の上達に最も推奨されるウォームアップ手順は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "実践前におすすめする15分間のウォームアップルーティンは次の4段階です：1）単純反応速度テスト（5回）で中枢神経系を覚醒、2）フリックショット練習でマウスパッドの摩擦制動力を補正、3）スムーズパシュート（滑動性眼球運動）で動く敵への吸い付きを安定化、4）ターゲットスイッチングで複数標的の優先順位付けと視線移動を整えてからランクマッチに挑むことです。"
      }
    },
    {
      "@type": "Question",
      "name": "脳トレ・記憶力ドリルは、仕事や学習など実生活の認知機能向上に役立ちますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、大きな効果が実証されています。N-Backテストやストループ効果テスト、注意分割ドリルは、背外側前頭前野（DLPFC）を継続的に活性化します。これにより、不要な雑音を遮断する抑制機能（インヒビション）、マルチタスク時のルール切り替え柔軟性、および作業記憶容量が拡張され、業務上の集中力や判断速度が向上します。"
      }
    },
    {
      "@type": "Question",
      "name": "モニターのリフレッシュレート（Hz）やマウス感度設定はスコアに影響しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "非常に大きく影響します。一般的な60Hzモニターは1フレームあたり約16.7msの表示遅延が発生しますが、144Hz（6.9ms）や240Hz（4.2ms）のゲーミングモニターは視覚フィードバックを素早く網膜に届けるため、微細な減速補正が正確に行えます。また、サイト内のグローバル感度スライダーを用いることで、普段プレイしているゲームの物理的振り向き距離（cm/360°）と完全に一致させることが可能です。"
      }
    },
    {
      "@type": "Question",
      "name": "1日の理想的な練習時間やセッション頻度はどのくらいが効果的ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "神経可塑性（脳と神経系の適応能力）を最大限に引き出すためには、疲労するまで長時間プレイするよりも、1回15〜25分の高い集中力を維持した短期分散トレーニングが最も有効です。末梢の筋肉や視神経に過度の疲労が溜まると運動学習効率が低下するため、セッション間に1〜2分の休憩を挟むことを推奨します。"
      }
    },
    {
      "@type": "Question",
      "name": "測定スコアや個人データが外部のサーバーに送信・収集されることはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ、一切ありません。SkillDrillsは完全なプライバシー保護方針のもとで運営されています。アカウント登録やログインは不要で、ハイスコアやマウス感度設定はすべてユーザーのブラウザ内（localStorage）にのみ暗号化保存されます。外部サーバーへ個人情報やプレイデータが送信されることはありません。"
      }
    },
    {
      "@type": "Question",
      "name": "スマートフォンやタブレットなどのモバイル端末でもプレイ可能ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "反応速度テスト、記憶力ゲーム、認知機能判定など、タッチ操作に適したドリルはスマートフォンやタブレットでも快適にプレイ可能です。ただし、マウスのポインター固定（Pointer Lock API）や精密なエイム操作を必要とするFPSエイムドリルや微細運動制御ドリルは、パソコン（デスクトップ/ノートPC）でのプレイが推奨されます。"
      }
    }
  ]
};

export default function LocalizedDrillsDirectoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DrillsDirectoryClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
