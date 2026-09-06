# Research & Architecture Summary: Dynamic Evasion Pursuit (Reactive Eye Tracking Drill)

**Date:** 2026-09-05  
**Path:** `/drills/visual-tracking/dynamic-evasion-pursuit`  
**Category:** Visual Tracking  
**Status:** In Progress (Drill 3 of 15 in Visual Tracking)

---

## 1. Keyword & Search Demand Analysis

- **Target Query / Anchor:** `reactive eye tracking drill` (Exact match in `lib/drillSeo.js`)
- **Secondary Terms:** `dynamic evasion pursuit`, `evasive target pursuit`, `reaction tracking exercise`, `visual tracking games online`, `smooth pursuit training`, `saccade recovery training`
- **Canonical Title:** `Dynamic Evasion Pursuit - Reactive Eye Tracking Drill` (53 characters, strictly $\le 60$)
- **Canonical Description:** `Train reactive visual pursuit against sudden evasive directional turns. Condition fast gaze re-acquisition online in your browser. Free, no sign-up.` (152 characters, strictly $\le 155$)
- **International Coverage:** Tested across US, GB, CA, AU, DE, FR, ES, BR, JP, KR in `scripts/keywords/out/dynamic-evasion-pursuit-global-2026-09-05.csv`.

---

## 2. Neurocognitive Grounding & Peer-Reviewed Sources

All sources verified with persistent DOIs and registered in `lib/drillSources.js`:

1. **Bahill, Iandolo, & Troost (1980)**: *Smooth pursuit eye movements in response to unpredictable target waveforms.* Vision Research, 20(11), 923–931.  
   `https://doi.org/10.1016/0042-6989(80)90073-5`  
   *Core Finding:* Foundational evidence that unexpected target velocity and heading cuts disable anticipatory motor prediction, producing instantaneous retinal position and velocity slip that must be resolved with ~150 ms visuomotor latencies.
2. **Rashbass (1961)**: *The relationship between saccadic and smooth tracking eye movements.* The Journal of Physiology, 159(2), 326–338.  
   `https://doi.org/10.1113/jphysiol.1961.sp006811`  
   *Core Finding:* The step-ramp stimulus framework establishing that smooth pursuit responds to target velocity, whereas sudden positional offsets caused by evasive turns trigger an independent catch-up saccade to reposition the fovea.
3. **Krauzlis (2004)**: *The control of voluntary eye movements: new perspectives.* The Neuroscientist, 10(2), 124–137.  
   `https://doi.org/10.1177/1073858403262108`  
   *Core Finding:* Illustrates how area MT/MST and superior colliculus interact dynamically to transition from pursuit velocity tracking to saccadic re-fixation and back.
4. **Robinson (1965)**: *The mechanics of human smooth pursuit eye movement.* The Journal of Physiology, 180(3), 569–591.  
   `https://doi.org/10.1113/jphysiol.1965.sp007718`  
   *Core Finding:* Quantitative analysis of extraocular muscle firing, pursuit saturation limits, and corrective saccade latency dynamics.
5. **Barnes (2008)**: *Cognitive processes involved in smooth pursuit eye movements.* Brain and Cognition, 68(3), 309–326.  
   `https://doi.org/10.1016/j.bandc.2008.08.020`  
   *Core Finding:* Evaluates the transition between feedforward predictive control and reactive feedback regulation under evasive heading changes.

---

## 3. SEO & Structured Data Architecture

- **Schema Types:**
  1. `BreadcrumbList`: Home > Visual Tracking > Dynamic Evasion Pursuit
  2. `WebApplication`: Zero fabricated ratings (`aggregateRating` purged), free browser application, `dateModified: 2026-09-05`.
  3. `HowTo`: 4-step protocol matching DOM instructions.
  4. `FAQPage`: Exactly 10 questions with single-source 1:1 mapping to `DrillGuide` DOM.
- **Client Overhaul:**
  - Left-aligned sentence-case H1: `Dynamic Evasion Pursuit` with subtitle `Reactive Eye Tracking Drill`.
  - 2-sentence sourced AEO extractable answer placed directly beneath H1 before canvas.
  - Flush full-width stat cards (`grid grid-cols-4 gap-2 w-full -mb-2`).
  - Purged duplicate client accordions to eliminate duplicate FAQ schema conflicts.
  - 0 anchor drift against `lib/drillSeo.js` for related drills.
