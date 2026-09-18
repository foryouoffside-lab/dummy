# Drill #85: Drag and Drop Test (Mouse Steering, Isometric Hold & Deceleration)

- **Slug**: `motor/hand-eye-coordination/drag-and-drop`
- **Category**: Motor Control (`motor/`)
- **Subcategory**: Hand-Eye Coordination (`hand-eye-coordination/`)
- **Completion Date**: 2026-09-16
- **Routes Generated**: 7 locales (`en`, `de`, `ko`, `ja`, `pt`, `es`, `fr`)

---

## 1. Overview & Scientific Foundation

The **Drag and Drop Test** evaluates continuous fine motor steering, sustained isometric switch depression, and sensorimotor deceleration braking under adaptive spatiotemporal constraints. Users acquire dynamic payload orbs, transport them across unconstrained 2D vector trajectories, and release them accurately inside moving target containers.

### Key Literature & Theoretical Foundations:
- **Johnny Accot & Shumin Zhai (1997)**: *Beyond Fitts' Law: Models for trajectory-based HCI tasks* – Formulated the Steering Law defining movement time as proportional to the integral of trajectory length divided by tunnel width.
- **I. Scott MacKenzie, Abigail Sellen, & William Buxton (1991)**: *A comparison of input devices in element pointing and dragging tasks* – Demonstrated dragging incurs a 15% to 25% motor throughput penalty compared to simple pointing due to sustained digit co-contraction and elevated downward pad friction.
- **Paul M. Fitts (1954)**: *The information capacity of the human motor system in rapid aimed movements* – Foundation for target acquisition kinematics.
- **Digby Elliott et al. (2010)**: *Goal-directed aiming: Two components but multiple processes* – Antagonist muscle recruitment during terminal deceleration and boundary approach.
- **David L. Woods et al. (2015)**: Browser chronometry, high-resolution performance.now() timers, and display refresh quantization standards.

---

## 2. Localized Metadata & Keyword Architecture

| Locale | Title (chars) | Meta Description (chars) | Primary Native Search Queries |
| :--- | :--- | :--- | :--- |
| **EN** | `Drag and Drop Test – Mouse Control Drill \| SkillDrills` (54c) | `Train mouse dragging accuracy, cursor deceleration, and spatial release timing with this free online motor drill. Grounded in the Accot-Zhai Steering Law.` (154c) | `drag and drop test`, `drag and drop mouse trainer`, `drag and drop precision`, `mouse drag test` |
| **DE** | `Drag and Drop Test – Maus Präzision Training \| SkillDrills` (58c) | `Kostenloser Drag and Drop Test im Browser: Trainiere Mauspräzision, Zieh- und Haltekontrolle sowie präzises Loslassen nach dem Steering Law ohne Download.` (154c) | `drag and drop test`, `drag and drop test maus`, `maus praezision testen`, `maus ziehen uebung` |
| **KO** | `드래그 앤 드롭 연습・마우스 조작 트레이너 – 드래그 정밀도 및 속도 테스트 \| SkillDrills` (56c) | `무료 브라우저 드래그 앤 드롭 마우스 트레이닝 도구. 타깃 오브젝트를 클릭한 채로 끌어서 목표 지점에 정확히 놓는 정밀 드래그 속도와 제어력을 정밀 측정합니다.` (89c) | `드래그 앤 드롭 테스트`, `마우스 드래그 연습`, `드래그 정밀도 측정`, `마우스 조작 연습` |
| **JA** | `ドラッグ・ドロップ練習 – マウス操作精度測定ツール \| SkillDrills` (40c) | `ブラウザでできる無料のドラッグ＆ドロップ練習・マウストレーニングツール。ターゲットの長押し掴み、高速ドラッグ移動、目標枠への正確なドロップ精度と所要時間をミリ秒単位で測定診断。` (88c) | `ドラッグ アンド ドロップ 練習`, `マウス ドラッグ 練習`, `ドラッグ 操作 テスト`, `マウストレーナー` |
| **PT** | `Teste Drag and Drop – Precisão de Mouse \| SkillDrills` (53c) | `Teste de drag and drop online gratis no navegador: Treine a precisao ao arrastar o mouse, desaceleracao do cursor e liberacao espacial com a Lei de Accot-Zhai.` (159c) | `drag and drop test`, `teste de drag and drop`, `treino de mouse drag`, `arrastar e soltar teste` |
| **ES** | `Test de Drag and Drop – Precisión con el Ratón \| SkillDrills` (60c) | `Test de drag and drop online gratis: Entrena precision al arrastrar el raton, frenado del cursor y soltado espacial segun la Ley de Accot-Zhai en el navegador.` (159c) | `drag and drop test`, `test de drag and drop`, `entrenar arrastrar y soltar`, `precision raton arrastrar` |
| **FR** | `Test Drag and Drop – Précision de Souris \| SkillDrills` (54c) | `Test de drag and drop en ligne gratuit: Entrainez la precision de glisser-deposer a la souris, la deceleration du curseur et la loi de pilotage Accot-Zhai.` (155c) | `drag and drop test`, `test drag and drop souris`, `glisser deposer entrainement souris`, `precision souris glisser` |

---

## 3. Normative Benchmark Scale

| Tier | Classification | Level & Combo | Mean Steering Time | Release Accuracy | Neuromuscular Profile |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | Elite / Pro Designer | Lv. 12–15 (Combo > 18x) | < 420 ms | ≥ 98.0% | Smooth bell-shaped velocity profile, optimal deceleration braking, zero premature releases under high velocity. |
| **Tier 2** | Advanced / Competitive | Lv. 9–11 (Combo 12–17x) | 420–510 ms | 94.0%–97.9% | Controlled deceleration, tight boundary tracking, minor terminal micro-adjustments (< 35 ms). |
| **Tier 3** | Competent / Intermediate | Lv. 6–8 (Combo 7–11x) | 511–640 ms | 87.0%–93.9% | Slight trajectory overshooting during acceleration phase, noticeable velocity dips prior to container alignment. |
| **Tier 4** | Novice / Developing | Lv. 3–5 (Combo 3–6x) | 641–800 ms | 78.0%–86.9% | Jerky multi-impulse steering, excessive finger grip tension causing mousepad drag and boundary clip errors. |
| **Tier 5** | Baseline / Novice | Lv. 1–2 (Combo < 3x) | > 800 ms | < 78.0% | Sluggish transport velocity, frequent releases outside container rims, uncoordinated click-hold muscle fatigue. |

---

## 4. Verification Summary

- **Level 1 (AST Audit)**: PASSED across all 7 locales (Title 30–60c, Meta Desc 70–160c, 12 keywords, 10 FAQs, 5 benchmark tiers, valid syntax).
- **Level 2 (Build Audit)**: PASSED with Next.js static page generation.
- **Level 3 (HTML Audit)**: PASSED (Canonical tags, 8 hreflangs, JSON-LD schemas BreadcrumbList, FAQPage, HowTo, SoftwareApplication/WebApplication/VideoGame).
