# Research & Architecture Summary: Momentum Teleport Pursuit (Anticipatory Eye Tracking Drill)

**Date:** 2026-09-05  
**Path:** `/drills/visual-tracking/momentum-teleport-pursuit`  
**Category:** Visual Tracking  
**Status:** In Progress (Drill 6 of 15 in Visual Tracking)

---

## 1. Keyword & Search Demand Analysis

- **Target Query / Anchor:** `anticipatory eye tracking drill` (Exact match in `lib/drillSeo.js`)
- **Secondary Terms:** `momentum teleport pursuit`, `target reacquisition practice`, `momentum prediction drill`, `saccade recovery training`, `teleporting target tracking`, `visual re-acquisition drill`
- **Canonical Title:** `Momentum Teleport - Anticipatory Eye Tracking Drill` (51 characters, strictly $\le 60$)
- **Canonical Description:** `Predict target trajectory after instant teleportation jumps. Condition anticipatory smooth pursuit and rapid saccadic re-acquisition. Free, no sign-up.` (151 characters, strictly $\le 155$)
- **International Coverage:** Tested across US, GB, CA, AU, DE, FR, ES, BR, JP, KR in `scripts/keywords/out/momentum-teleport-pursuit-global-2026-09-05.csv`.

---

## 2. Neurocognitive Grounding & Peer-Reviewed Sources

All sources verified with persistent DOIs and registered in `lib/drillSources.js`:

1. **Rashbass (1961)**: *The relationship between saccadic and smooth tracking eye movements.* The Journal of Physiology, 159(2), 326–338.  
   `https://doi.org/10.1113/jphysiol.1961.sp006811`  
   *Core Finding:* Foundational psychophysics demonstrating that smooth pursuit and saccades respond to distinct stimulus dimensions (velocity vs. position displacement), showing how the oculomotor system interleaves rapid jumps with velocity matching.
2. **Bahill, Iandolo, & Troost (1980)**: *Smooth pursuit eye movements in response to unpredictable target waveforms.* Vision Research, 20(11), 923–931.  
   `https://doi.org/10.1016/0042-6989(80)90073-5`  
   *Core Finding:* Analyzes catch-up saccade execution and pursuit re-acceleration dynamics when targets undergo sudden unexpected spatial shifts.
3. **Findlay & Walker (1999)**: *A model of saccade generation based on parallel processing and competitive inhibition.* Behavioral and Brain Sciences, 22(4), 661–674.  
   `https://doi.org/10.1017/S0140525X99002150`  
   *Core Finding:* Models the dual 'where' and 'when' visual processing pathways governing rapid saccadic target re-acquisition during spatial jumps.
4. **Krauzlis (2004)**: *Recasting the smooth pursuit eye movement system.* Journal of Neurophysiology, 91(2), 591–603.  
   `https://doi.org/10.1152/jn.00801.2003`  
   *Core Finding:* Details cortical motion processing in area MT/MST and how superior colliculus coordinates continuous foveal selection across discontinuous target jumps.
5. **Barnes (2008)**: *Cognitive processes involved in smooth pursuit eye movements.* Brain and Cognition, 68(3), 309–326.  
   `https://doi.org/10.1016/j.bandc.2008.08.020`  
   *Core Finding:* Details how internal velocity memory and predictive forward models allow the oculomotor system to anticipate target trajectories across spatial occlusions and sudden displacements.

---

## 3. SEO & Structured Data Architecture

- **Schema Types:**
  1. `BreadcrumbList`: Home > Visual Tracking > Momentum Teleport Pursuit
  2. `WebApplication`: Zero fabricated ratings (`aggregateRating` purged), free browser application, `dateModified: 2026-09-05`, `applicationCategory: SportsApplication`.
  3. `HowTo`: 4-step protocol matching DOM instructions.
  4. `FAQPage`: Exactly 10 questions with single-source 1:1 mapping to `DrillGuide` DOM.
- **Client Overhaul:**
  - Left-aligned sentence-case H1: `Momentum Teleport Pursuit` with subtitle `Anticipatory Eye Tracking Drill`.
  - 2-sentence sourced AEO extractable answer placed directly beneath H1 before canvas.
  - Flush full-width stat cards (`grid grid-cols-4 gap-2 w-full -mb-2`).
  - Purged duplicate client accordions to eliminate duplicate FAQ schema conflicts.
  - 0 anchor drift against `lib/drillSeo.js` for related drills.
