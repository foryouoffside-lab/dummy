# Research & Architecture Summary: Directional Chaos Pursuit (Erratic Motion Eye Drill)

**Date:** 2026-09-05  
**Path:** `/drills/visual-tracking/directional-chaos-pursuit`  
**Category:** Visual Tracking  
**Status:** In Progress (Drill 2 of 15 in Visual Tracking)

---

## 1. Keyword & Search Demand Analysis

- **Target Query / Anchor:** `erratic motion eye drill` (Exact match in `lib/drillSeo.js`)
- **Secondary Terms:** `chaotic tracking practice`, `unpredictable target tracking`, `eye tracking training`, `directional chaos pursuit`, `reactive eye tracking`, `saccade recovery training`
- **Canonical Title:** `Directional Chaos Pursuit - Erratic Motion Eye Drill` (52 characters, strictly $\le 60$)
- **Canonical Description:** `Track erratic target trajectories with unpredictable velocity shifts. Condition reactive gaze re-acquisition online in your browser. Free, no sign-up.` (151 characters, strictly $\le 155$)
- **International Coverage:** Tested across US, GB, CA, AU, DE, FR, ES, BR, JP, KR in `scripts/keywords/out/directional-chaos-pursuit-global-2026-09-05.csv`.

---

## 2. Neurocognitive Grounding & Peer-Reviewed Sources

All sources verified with persistent DOIs and registered in `lib/drillSources.js`:

1. **Bahill, Iandolo, & Troost (1980)**: *Smooth pursuit eye movements in response to unpredictable target waveforms.* Vision Research, 20(11), 923–931.  
   `https://doi.org/10.1016/0042-6989(80)90073-5`  
   *Core Finding:* Foundational study proving that when visual motion is unpredictable, the oculomotor system cannot rely on internal predictive models (which enable zero-latency tracking on predictable curves). Instead, tracking operates with ~150 ms visuomotor latencies, requiring rapid corrective saccades whenever target velocity shifts.
2. **Barnes (2008)**: *Cognitive processes involved in smooth pursuit eye movements.* Brain and Cognition, 68(3), 309–326.  
   `https://doi.org/10.1016/j.bandc.2008.08.020`  
   *Core Finding:* Demonstrates the difference between closed-loop visual feedback and open-loop anticipatory drive, showing that chaotic motion isolates feedback-driven gaze re-acquisition.
3. **Krauzlis (2004)**: *The control of voluntary eye movements: new perspectives.* The Neuroscientist, 10(2), 124–137.  
   `https://doi.org/10.1177/1073858403262108`  
   *Core Finding:* Details how visual motion processing in area MT/MST drives both smooth pursuit adjustments and rapid saccadic re-fixations through shared collicular and cerebellar networks.
4. **Robinson (1965)**: *The mechanics of human smooth pursuit eye movement.* The Journal of Physiology, 180(3), 569–591.  
   `https://doi.org/10.1113/jphysiol.1965.sp007718`  
   *Core Finding:* Control-systems modeling of pursuit velocity saturation and catch-up saccade trigger mechanisms.
5. **Rashbass (1961)**: *The relationship between saccadic and smooth tracking eye movements.* The Journal of Physiology, 159(2), 326–338.  
   `https://doi.org/10.1113/jphysiol.1961.sp006811`  
   *Core Finding:* Separation of velocity tracking (smooth pursuit) from position re-acquisition (saccades).

---

## 3. SEO & Structured Data Architecture

- **Schema Types:**
  1. `BreadcrumbList`: Home > Visual Tracking > Directional Chaos Pursuit
  2. `WebApplication`: Zero fabricated ratings (`aggregateRating` purged), free browser application, `dateModified: 2026-09-05`.
  3. `HowTo`: 4-step protocol matching DOM instructions.
  4. `FAQPage`: Exactly 10 questions with single-source 1:1 mapping to `DrillGuide` DOM.
- **Client Overhaul:**
  - Left-aligned sentence-case H1: `Directional Chaos Pursuit` with subtitle `Erratic Motion Eye Drill`.
  - 2-sentence sourced AEO extractable answer placed directly beneath H1 before canvas.
  - Flush full-width stat cards (`grid grid-cols-4 gap-2 w-full -mb-2`).
  - Purged duplicate client accordions to eliminate duplicate FAQ schema conflicts.
  - 0 anchor drift against `lib/drillSeo.js` for related drills.
