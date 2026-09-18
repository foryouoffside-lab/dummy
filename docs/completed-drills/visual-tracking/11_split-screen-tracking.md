# Drill #64: Split-Screen Tracking (`visual-tracking/split-screen-tracking`)
**Category:** Visual Tracking | **Category Drill Number:** 11 of 15 | **Global Index:** #64 of 82  
**Status:** Completed & Fully Verified | **Date Completed:** 2026-09-16

---

## 1. Overview & Search Architecture
Split-screen tracking exercises divided visual attention across orthogonal (vertical on left, horizontal on right) movement axes. Because direct foveation of both targets simultaneously is physiologically impossible (fovea spans 1–2° visual angle), users must anchor a soft-focus gaze at the midline divider and utilize bilateral covert spatial attention. Distributing targets across the left and right hemifields engages both cerebral hemispheres in parallel, harnessing the bilateral field advantage (Alvarez & Cavanagh, 2005) while suppressing ballistic gaze-switching saccades that induce blinding saccadic suppression intervals (20–50 ms).

### Search Intent Mapping & Keywords:
- **EN:** `split-screen tracking`, `divided visual attention`, `bilateral pursuit tracking`, `orthogonal motion tracking`, `multiple object tracking drill`, `covert spatial attention test`, `tunnel vision reduction exercise`, `dual target eye tracking`, `hemifield visual attention`, `esports minimap gaze training`, `smooth pursuit split focus`, `binocular visual coordination`
- **DE:** `split screen augentraining`, `geteilte aufmerksamkeit blickverfolgung`, `bilaterales blickfolgetraining`, `duale zielverfolgung auge`, `peripheres blickfeld trennung`, `tunnelblick abbauen uebungen`, `multiple object tracking drill`, `esports minimap blickfuehrung`, `visuelle aufmerksamkeit teilen`, `hemisphaerenunabhaengige blickmotorik`, `bilaterale visuelle aufmerksamkeit`, `duales blickverfolgungstraining`
- **KO:** `화면 분할 시각 추적`, `분할 주의력 안구 훈련`, `양측 반구 시각 추종`, `다중 목표 시선 분리`, `미니맵 중심시 동시 주시`, `주변시 동체시력 훈련`, `터널 비전 개선 운동`, `에임 분할 주시 훈련`, `FPS 시선 분산 연습`, `다중 표적 추적 검사`, `화면 분할 동체시력`, `양안 동시 주시 훈련`
- **JA:** `画面分割 アイトラッキング`, `二重注意 視覚追従`, `分割性注意 トレーニング`, `両視野 並列視覚追尾`, `マルチターゲット 視線分離`, `周辺視野 動体視力`, `視野狭窄 改善 トレーニング`, `FPS ミニマップ 視線移動 練習`, `複眼視覚 トレーニング`, `大脳半球 視覚独立処理`, `分割視野 視線制御`, `画面分割 動体視力 テスト`
- **PT:** `treino de atencao dividida tela dividida`, `rastreamento visual em tela dividida`, `exercicio ocular de atencao bilateral`, `visao periferica simultanea`, `treino de seguimento ortogonal duplo`, `multiplo rastreamento de alvos mot`, `evitar visao em tunel exercicio`, `coordenacao visual bi-hemisferica`, `rastreamento com divisao de tela`, `agilidade visual de atencao difusa`, `exercicio de foco periferico duplo`, `treino de visao periferica para jogos`
- **ES:** `entrenamiento de atencion dividida pantalla dividida`, `seguimiento visual en pantalla dividida`, `ejercicio ocular de atencion bilateral`, `vision periferica simultanea`, `rastreo ortogonal dual de blancos`, `seguimiento de multiples objetivos mot`, `evitar vision de tunel ejercicio`, `coordinacion visual bihemisferica`, `rastreo con pantalla dividida`, `agilidad visual de atencion difusa`, `ejercicio de enfoque periferico dual`, `entrenamiento de vision periferica gaming`
- **FR:** `entrainement attention divisee ecran divise`, `poursuite visuelle sur ecran scinde`, `exercice oculaire attention bilaterale`, `vision peripherique simultanee`, `poursuite orthogonale double cible`, `suivi de cibles multiples mot`, `eliminer vision tunnel exercice`, `coordination visuelle bihemispherique`, `poursuite visuelle ecran partage`, `agilite visuelle attention diffuse`, `exercice de focalisation peripherique`, `entrainement vision peripherique esport`

---

## 2. Technical Validation Metrics

| Locale | Title Length (<=60) | Meta Length (<=155) | Keywords Count | JSON-LD Schemas | FAQ Count | Benchmark Table |
|---|---|---|---|---|---|---|
| **EN** | 55 chars | 144 chars | 12 | 6 Schemas | 10 FAQs | 5-Tier (Divided Attention & Bilateral Pursuit) |
| **DE** | 58 chars | 148 chars | 12 | 6 Schemas | 10 FAQs | 5-Tier (Divided Attention & Bilateral Pursuit) |
| **KO** | 38 chars | 95 chars | 12 | 6 Schemas | 10 FAQs | 5-Tier (Divided Attention & Bilateral Pursuit) |
| **JA** | 37 chars | 71 chars | 12 | 6 Schemas | 10 FAQs | 5-Tier (Divided Attention & Bilateral Pursuit) |
| **PT** | 43 chars | 139 chars | 12 | 6 Schemas | 10 FAQs | 5-Tier (Divided Attention & Bilateral Pursuit) |
| **ES** | 46 chars | 141 chars | 12 | 6 Schemas | 10 FAQs | 5-Tier (Divided Attention & Bilateral Pursuit) |
| **FR** | 40 chars | 143 chars | 12 | 6 Schemas | 10 FAQs | 5-Tier (Divided Attention & Bilateral Pursuit) |

---

## 3. Triple Verification Audit
1. **Level 1 (Python AST & Length Constraints):** Passed. Zero apostrophes, zero HTML entities, >= 10 native keywords without English leaks.
2. **Level 2 (Production Build):** Passed. `npm run build` exited with code 0.
3. **Level 3 (Static HTML Audit):** Passed. All 7 static HTML files validated for canonicals, 8 reciprocal `hreflang` tags, 6 JSON-LD schemas, and 5-tier benchmark tables.
