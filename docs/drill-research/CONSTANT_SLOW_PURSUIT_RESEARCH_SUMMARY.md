# Research & Architecture Summary: Constant Slow Pursuit (Smooth Pursuit Eye Exercise)

**Date:** 2026-09-05  
**Path:** `/drills/visual-tracking/constant-slow-pursuit`  
**Category:** Visual Tracking  
**Status:** In Progress (Drill 1 of 15 in Visual Tracking)

---

## 1. Keyword & Search Demand Analysis

- **Target Query / Anchor:** `smooth pursuit eye exercise` (Exact match in `lib/drillSeo.js`)
- **Secondary Terms:** `slow tracking drill`, `eye tracking training`, `gaze stability practice`, `ocular motor training`, `lissajous curve tracking`
- **Canonical Title:** `Constant Slow Pursuit - Smooth Pursuit Eye Exercise` (55 characters, strictly $\le 60$)
- **Canonical Description:** `Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.` (148 characters, strictly $\le 155$)
- **International Coverage:** Tested across US, GB, CA, AU, DE, FR, ES, BR, JP, KR in `scripts/keywords/out/constant-slow-pursuit-global-2026-09-05.csv`.

---

## 2. Neurocognitive Grounding & Peer-Reviewed Sources

All sources verified with persistent DOIs and registered in `lib/drillSources.js`:

1. **Robinson (1965)**: *The mechanics of human smooth pursuit eye movement.* The Journal of Physiology, 180(3), 569–591.  
   `https://doi.org/10.1113/jphysiol.1965.sp007718`  
   *Core Finding:* Foundational control-systems analysis demonstrating that human smooth pursuit maintains unit gain (eye velocity matching target velocity) primarily below 30–40°/s; higher speeds or velocity drops trigger involuntary catch-up saccades.
2. **Rashbass (1961)**: *The relationship between saccadic and smooth tracking eye movements.* The Journal of Physiology, 159(2), 326–338.  
   `https://doi.org/10.1113/jphysiol.1961.sp006811`  
   *Core Finding:* Introduced the step-ramp paradigm, proving that smooth pursuit and saccadic systems operate via independent neural pathways responding to retinal slip velocity versus retinal position error.
3. **Krauzlis (2004)**: *The control of voluntary eye movements: new perspectives.* The Neuroscientist, 10(2), 124–137.  
   `https://doi.org/10.1177/1073858403262108`  
   *Core Finding:* Details the cortico-cerebellar circuitry of smooth pursuit, showing that middle temporal (MT/MST) visual areas project through pontine nuclei to the cerebellar flocculus and frontal eye fields (FEF) for continuous target tracking.
4. **Barnes (2008)**: *Cognitive processes involved in smooth pursuit eye movements.* Brain and Cognition, 68(3), 309–326.  
   `https://doi.org/10.1016/j.bandc.2008.08.020`  
   *Core Finding:* Explores how cognitive predictive mechanisms, working memory, and extra-retinal signals interface with visual feedback to maintain pursuit stability across complex trajectories.

---

## 3. SEO & Structured Data Architecture

- **Schema Types:**
  1. `BreadcrumbList`: Home > Visual Tracking > Constant Slow Pursuit
  2. `WebApplication`: Zero fabricated ratings (`aggregateRating` purged), free browser application, `dateModified: 2026-09-05`.
  3. `HowTo`: 4-step protocol matching DOM instructions.
  4. `FAQPage`: Exactly 10 questions with single-source 1:1 mapping to `DrillGuide` DOM.
- **Client Overhaul:**
  - Left-aligned sentence-case H1: `Constant Slow Pursuit` with subtitle `Smooth Pursuit Eye Exercise`.
  - 2-sentence sourced AEO extractable answer placed directly beneath H1 before canvas.
  - Flush full-width stat cards (`grid grid-cols-4 gap-2 w-full -mb-2`).
  - Purged duplicate client accordions to eliminate duplicate FAQ schema conflicts.
  - 0 anchor drift against `lib/drillSeo.js` for related drills.
