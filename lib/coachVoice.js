'use client';

import { getWeakestPillar, getProgressionTrend, getTrendDisplay, DRILL_METADATA, SKILL_PILLARS } from './performanceTelemetry';
import { getTierDisplay, TIERS } from './adaptiveDifficulty';

export const COACHES = [
  {
    id: 'athena',
    name: 'Athena AI',
    title: 'Next-Gen Biomechanics System',
    description: 'Analytical, objective, and metrics-focused. Isolates vector drift and structural motor errors.',
    gameFocus: 'All FPS Titles / General Calibration',
    avatarColor: 'from-cyan-600 to-blue-700',
    avatarText: '🤖',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    glowColor: 'shadow-cyan-500/10',
    voiceSettings: { pitch: 1.0, rate: 0.98, gender: 'female' }
  },
  {
    id: 'shroud',
    name: 'Shroud',
    title: 'The Human AimBot',
    description: 'Calm, confident, and highly experienced. Teaches smooth tracking, posture, and simple mechanics.',
    gameFocus: 'PUBG, Apex, & General Aiming',
    avatarColor: 'from-slate-700 to-slate-800',
    avatarText: '🎮',
    textColor: 'text-slate-300',
    borderColor: 'border-slate-500/30',
    glowColor: 'shadow-slate-500/10',
    voiceSettings: { pitch: 0.92, rate: 0.96, gender: 'male' }
  },
  {
    id: 'simple',
    name: 's1mple',
    title: 'CS2 Major MVP & G.O.A.T.',
    description: 'Intense, competitive, and uncompromising. Demands zero-error clicking and recoil patterns.',
    gameFocus: 'CS2, Tactical Shooters',
    avatarColor: 'from-yellow-600 to-amber-700',
    avatarText: '👑',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    glowColor: 'shadow-yellow-500/10',
    voiceSettings: { pitch: 0.88, rate: 1.0, gender: 'male' }
  },
  {
    id: 'tenz',
    name: 'TenZ',
    title: 'VCT Champion & Mechanics Specialist',
    description: 'High-energy, hyper-focused, and highly technical. Focuses on micro-flicking and rapid reactions.',
    gameFocus: 'Valorant, Speed Flicking',
    avatarColor: 'from-red-600 to-rose-700',
    avatarText: '⚡',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/30',
    glowColor: 'shadow-red-500/10',
    voiceSettings: { pitch: 1.05, rate: 1.08, gender: 'male' }
  },
  {
    id: 'tgltn',
    name: 'TGLTN',
    title: 'PUBG World Champion & DMR Legend',
    description: 'High-speed rhythm tapping specialist. Teaches vertical recoil compensation and lead timing.',
    gameFocus: 'PUBG, DMR & Parabolic Tracking',
    avatarColor: 'from-orange-500 to-amber-600',
    avatarText: '🇦🇺',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    glowColor: 'shadow-orange-500/10',
    voiceSettings: { pitch: 1.02, rate: 1.1, gender: 'male' }
  },
  {
    id: 'doc',
    name: 'DrDisrespect',
    title: 'Director of Violence & Momentum',
    description: 'Bombastic, intense, and loud. Demands extreme reflex speed, raw power, and high aggression.',
    gameFocus: 'COD Warzone, Kinetic Drills',
    avatarColor: 'from-red-700 to-red-950',
    avatarText: '🕶️',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/40',
    glowColor: 'shadow-red-500/20',
    voiceSettings: { pitch: 0.84, rate: 1.04, gender: 'male' }
  }
];

export function getActiveCoach() {
  if (typeof window === 'undefined') return COACHES[0];
  try {
    const coachId = localStorage.getItem('activeFpCoach') || 'athena';
    return COACHES.find(c => c.id === coachId) || COACHES[0];
  } catch (e) {
    return COACHES[0];
  }
}

// Global cache for Speech Synthesis Voices to optimize performance
let memoizedVoices = null;
function getVoicesSafe() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (memoizedVoices && memoizedVoices.length > 0) return memoizedVoices;
  try {
    memoizedVoices = window.speechSynthesis.getVoices();
  } catch (e) {
    return [];
  }
  return memoizedVoices || [];
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    window.speechSynthesis.onvoiceschanged = () => {
      memoizedVoices = window.speechSynthesis.getVoices();
    };
  } catch (e) {}
}

// Module-level persistent state for human-like mistake tracking
export const coachSession = {
  lastMistakeCategory: null,
  consecutiveMistakeCount: 0,
  lastSensAdjustmentTime: 0,
  consecutiveMisses: 0,
  lastSpokenCategory: null,
  lastSpokenTime: 0,
  // ── Speak-Once System ──
  // Each category is spoken at most ONCE per session. Resets on drill start.
  spokenCategories: new Set(),
  // 5-second observation window before first feedback
  observationStartTime: 0,
  // Track whether sensitivity adjustment has been announced this session
  sensAdjustmentAnnounced: false,
  // Track the last weakness the coach addressed (persisted to localStorage)
  lastAddressedWeakness: null
};

// Human-like response dialogues for repeating mistakes & auto-calibrations
export const COACH_HUMAN_DIALOGUES = {
  athena: {
    repeat: {
      recoil: "Correction failure. Recoil settle coefficient is still low. Reduce tapping rate to 3Hz to stabilize chamber rise.",
      drop: "Adjustment error. Bullet drop compensation remains insufficient. Raise crosshair 15 pixels above target centroid.",
      lead: "Trajectory error. Lead vector is still lagging. Predict target direction and aim ahead of velocity line.",
      movement: "Velocity error. Movement spread active. Depress opposite movement key to force zero-velocity threshold.",
      overshoot: "Overshot target again. Angular sweep exceeds target coordinates. Reduce hand acceleration.",
      undershoot: "Undershot target again. Speed lag detected. Increase arm translation velocity.",
      locked: "Pointer lock still inactive. Recapture cursor lock immediately.",
      miss: "Target whiff repeated. Reset hand position and stabilize visual tracking index."
    },
    adjust: {
      sens_down: (prev, next) => `Overshoot sequence confirmed. Automatically calibrating sensitivity down from ${prev} to ${next} to improve stability.`,
      sens_up: (prev, next) => `Undershoot sequence confirmed. Automatically calibrating sensitivity up from ${prev} to ${next} to improve response latency.`
    }
  },
  shroud: {
    repeat: {
      recoil: "You're still spamming the trigger, man. Let the gun settle for a split second, then click.",
      drop: "Missed low again. The bullet is dropping, just aim a little bit higher above his head.",
      lead: "You're shooting behind him again. He's moving fast, so put your crosshair in front of him.",
      movement: "You're still moving while shooting. Stop moving completely, then click. Otherwise it's random.",
      overshoot: "Sweeping past them again. Slow down your wrist flick, focus on a clean stop.",
      undershoot: "Dragging short again. Be a bit more aggressive with the swipe, let's catch up.",
      locked: "Click the screen, mouse lock is still open.",
      miss: "Whiffed again. It's fine, just relax your hand, reset your posture, and focus on the target."
    },
    adjust: {
      sens_down: (prev, next) => `You're overshooting again, so I've automatically adjusted your sens down from ${prev} to ${next}. Let's see if that feels smoother.`,
      sens_up: (prev, next) => `You're still dragging behind, so I've raised your sens from ${prev} to ${next} in the running drill. Try this to track faster.`
    }
  },
  simple: {
    repeat: {
      recoil: "Why you spam trigger again? Stop! Let recoil reset! Click, pause, click! Listen to me!",
      drop: "Low again! You are shooting dirt again! Aim above the head, come on!",
      lead: "Behind again! Lead him! You shoot where he was, not where he is! Aim in front!",
      movement: "You are still running and shooting! Stop moving! Stop! Then shoot!",
      overshoot: "You overshoot again! Calm down, don't shake mouse so much, make clean click!",
      undershoot: "Too slow again! Wake up! Flick faster, you are lagging behind!",
      locked: "Recapture cursor! Click screen now! Why are you waiting?",
      miss: "Whiff again! Focus on the head, no whiffs! This is easy shots!"
    },
    adjust: {
      sens_down: (prev, next) => `You overshoot too much! I adjusted your sensitivity down from ${prev} to ${next} in this drill. Control it now!`,
      sens_up: (prev, next) => `You lag behind! I adjusted your sensitivity up from ${prev} to ${next} for this run. Snap faster to target!`
    }
  },
  tenz: {
    repeat: {
      recoil: "Recoil is still stacking up! Just space your shots a tiny bit more, let the crosshair settle!",
      drop: "Aim higher! The drop is getting you again. Put that crosshair right above the head!",
      lead: "You're still under-leading! Aim slightly in front of his movement path!",
      movement: "You're clicking while moving! Make sure you tap the opposite key to stop before you fire!",
      overshoot: "Overshot again! Try to focus on the stopping power of your hand. Don't rush!",
      undershoot: "Undershot again! Try to flick a bit harder, or swipe a wider distance!",
      locked: "Mouse lock broke! Quick, click the canvas to lock it back!",
      miss: "Whiff again! No worries, just reset your grip, keep it light, and focus on the dots!"
    },
    adjust: {
      sens_down: (prev, next) => `Still overshooting, so I automatically lowered your sens from ${prev} to ${next} in the running drill! This should help you lock onto the target!`,
      sens_up: (prev, next) => `Still lagging behind, so I boosted your sens from ${prev} to ${next} right now! Try this, it'll make snapping way easier!`
    }
  },
  tgltn: {
    repeat: {
      recoil: "Spamming it again, mate! Pull down harder or let that gun bounce back, come on!",
      drop: "Still hitting low, mate! Bullet drop is real, aim high over his head!",
      lead: "Shooting in the past again, mate! Put that crosshair in front of him, lead the sprint!",
      movement: "Still sliding around while clicking! Get to zero speed, then tap, mate!",
      overshoot: "Swinging past again, mate! Smooth out that swipe, don't throw your arm!",
      undershoot: "Dragging short again, mate! Swipe a bit faster, get on the target!",
      locked: "Oi, recapture that mouse! Click the screen, mate!",
      miss: "Missed again! Reset your hand, take a breath, let's get the next one!"
    },
    adjust: {
      sens_down: (prev, next) => `Overshooting again, mate. I've automatically dropped your sens from ${prev} to ${next} for this run. Let's see if that tightens it up.`,
      sens_up: (prev, next) => `Still falling behind, mate. I've ticked your sens up from ${prev} to ${next} in the running drill. Track them now!`
    }
  },
  doc: {
    repeat: {
      recoil: "SPAMMING IT AGAIN! WHAT DID I SAY?! CONTROL THE RECOIL! TAP... RESET... TAP!",
      drop: "BULLET IN THE DIRT AGAIN! AIM HIGH! ABOVE THE HEAD! UNBELIEVABLE!",
      lead: "BEHIND HIM AGAIN! HE IS RUNNING! LEAD THE VECTOR! SHOOT IN FRONT!",
      movement: "STILL RUNNING AND SHOOTING like a chump! STOP! THEN FIRE!",
      overshoot: "OVERSHOOTING AGAIN! Calm the velocity down! Focus on the stopping snap!",
      undershoot: "LAGGING BEHIND AGAIN! SPEED IT UP! MORE POWER! SNAP TO TARGET!",
      locked: "RAW INPUT CAPTURE LOST AGAIN! CLICK THE ARENA SCREEN NOW!",
      miss: "WHIFFED AGAIN! WAKE UP! Visual focus! Speed! Momentum! Let's go!"
    },
    adjust: {
      sens_down: (prev, next) => `VELOCITY IS TOO WILD! I've automatically adjusted your sens down from ${prev} to ${next} inside this drill! Direct control! Let's go!`,
      sens_up: (prev, next) => `TOO SLOW! WE NEED MORE MOMENTUM! Adjusted your sens up from ${prev} to ${next} in the running drill! Speed it up! Double the dominance!`
    }
  },
  // ── Progression & Tier Dialogues ──
  progression: {
    athena: (prevArea, nextArea) => `Positive trajectory confirmed on ${prevArea}. Reallocating training vector to ${nextArea} — your current weakest coefficient.`,
    shroud: (prevArea, nextArea) => `Your ${prevArea} is looking way better now, nice work. Let's shift focus to ${nextArea}, that's where we'll get the most gains.`,
    simple: (prevArea, nextArea) => `Ok, your ${prevArea} is actually decent now. But your ${nextArea} is still garbage. We fix that next.`,
    tenz: (prevArea, nextArea) => `Dude, your ${prevArea} has improved so much! That's insane! Now let's work on your ${nextArea} — that's the next level up!`,
    tgltn: (prevArea, nextArea) => `Brilliant improvement on ${prevArea}, mate! Proper progress. Now let's get stuck into ${nextArea} — that's the weakest link.`,
    doc: (prevArea, nextArea) => `THE ${prevArea.toUpperCase()} IS NOW UNDER CONTROL! But the ${nextArea.toUpperCase()} is STILL WEAK! We fix that NOW!`
  },
  tierUp: {
    athena: (tier) => `Performance threshold exceeded. Difficulty tier promoted to ${tier}. Targets are now smaller and faster.`,
    shroud: (tier) => `Nice, you've earned a tier up to ${tier}. Targets are smaller and faster now. Let's see how you handle it.`,
    simple: (tier) => `You are promoted to ${tier}! Targets are now smaller. This is the real challenge. Show me you deserve it.`,
    tenz: (tier) => `Let's go! You're ${tier} tier now! Everything is harder — smaller targets, faster movement. You got this!`,
    tgltn: (tier) => `Promoted to ${tier}, mate! Targets are tighter and faster now. Let's see what you're made of!`,
    doc: (tier) => `TIER UP TO ${tier.toUpperCase()}! THE TARGETS ARE SMALLER! THE SPEED IS HIGHER! ONLY THE ELITE SURVIVE THIS!`
  },
  tierDown: {
    athena: (tier) => `Performance regression detected. Difficulty tier adjusted to ${tier} to rebuild fundamental motor patterns.`,
    shroud: (tier) => `I've dropped the difficulty back to ${tier}. No stress, let's get the fundamentals locked in first.`,
    simple: (tier) => `You are struggling. I dropped difficulty to ${tier}. Get the basics right first, then we go up again.`,
    tenz: (tier) => `I've adjusted down to ${tier} tier — totally fine! Let's nail the basics and work our way back up!`,
    tgltn: (tier) => `Dropped back to ${tier}, mate. No worries, let's sharpen the basics and climb back up.`,
    doc: (tier) => `DIFFICULTY ADJUSTED TO ${tier.toUpperCase()}! WE REBUILD! WE COME BACK STRONGER! THIS IS THE FOUNDATION!`
  },
  drillRecommend: {
    athena: (area, drillName) => `Weakness analysis complete. Primary deficit: ${area}. Prescribed training: ${drillName}.`,
    shroud: (area, drillName) => `Your weakest spot right now is ${area}. I'd recommend running ${drillName} next to work on that.`,
    simple: (area, drillName) => `Your ${area} is your biggest weakness. Go play ${drillName} right now. No excuses.`,
    tenz: (area, drillName) => `So your ${area} needs the most work! Jump into ${drillName} next — it'll make a huge difference!`,
    tgltn: (area, drillName) => `Your ${area} needs attention, mate. Give ${drillName} a crack next, it'll sort you out.`,
    doc: (area, drillName) => `THE ${area.toUpperCase()} IS THE WEAK LINK! GET INTO ${drillName.toUpperCase()} IMMEDIATELY! FIX IT!`
  }
};

export function getCoachResponse(coachId, eventType, drillName, extraData = {}) {
  const templates = {
    athena: {
      start: () => `${drillName} calibration initialized. Maintain optimal posture and scan targets.`,
      streak_5: () => `Performance index rising. Hit combo multiplier verified.`,
      miss: () => `Precision desync. Target coordinate deviation.`,
      warn_fast_recoil: () => `Warning: Recoil overflow. Reduce click frequency to let the chamber settle.`,
      warn_drop: () => `Gravity compensation alert. Adjust crosshair vertical offset higher.`,
      warn_lead: () => `Target velocity desync. Shift horizontal lead vector forward.`,
      warn_locked: () => `Mouse pointer capture lost. Recapture cursor control.`,
      sens_down: (d) => `Aim vector overshoot detected. Calibrating sensitivity down from ${d.prevSens} to ${d.newSens} to optimize motor coherence.`,
      sens_up: (d) => `Aim vector lag detected. Calibrating sensitivity up from ${d.prevSens} to ${d.newSens} to align angular velocity.`,
      gameover: (d) => {
        let text = `Evaluation complete. Final score: ${d.score} points. `;
        if (d.recoil < 75) {
          text += `Recoil settle index is deficient at ${d.recoil}%. Recommend 10 minutes in Recoil Control Lab to lock pull rates. `;
        }
        if (d.accuracy < 75) {
          text += `Accuracy is below benchmark at ${d.accuracy}%. Prescribed roadmap: Execute Bullet Lead and Drop training for 5 sets.`;
        } else {
          text += `Calibration index is nominal. Recommend proceeding to PUBG passenger drive-by training to benchmark high-speed vector compensation.`;
        }
        return text;
      }
    },
    shroud: {
      start: () => `Alright, starting up ${drillName}. Relax your wrist, let's get some clean clicks.`,
      streak_5: () => `Nice. You're tracking them perfectly. Easy.`,
      miss: () => `A bit off. Just take your time and adjust.`,
      warn_fast_recoil: () => `Whoa, you're clicking too fast. Let the gun settle down first.`,
      warn_drop: () => `Aim slightly higher, that bullet is dropping on you.`,
      warn_lead: () => `Lead them a bit more, they are running fast.`,
      warn_locked: () => `Lost mouse capture. Click the screen to lock it back.`,
      sens_down: (d) => `You're overshooting a bit. I've lowered your sensitivity from ${d.prevSens} to ${d.newSens} to help you smooth it out. Try this.`,
      sens_up: (d) => `You're dragging behind the targets. I've bumped up your sens from ${d.prevSens} to ${d.newSens} so you can catch up easier. Let's see.`,
      gameover: (d) => {
        let text = `Finished up with ${d.score} points. Accuracy is ${d.accuracy}%. That's not bad. `;
        if (d.recoil < 75) {
          text += `You were spamming the trigger a bit too fast, though. Try slow, clean taps in the DMR rhythm drill for a bit. `;
        }
        if (d.accuracy < 70) {
          text += `Aim was a little shaky. Practice your crosshair placement in the Angle Hold Trainer, then try again.`;
        } else {
          text += `Aim is looking really crisp. Go run the PUBG Drive-by drill next to warm up your vehicle tracking.`;
        }
        return text;
      }
    },
    simple: {
      start: () => `Ok, ${drillName} starting. You need to focus. Click the head, no whiffs. Let's go.`,
      streak_5: () => `Yes, nice! This is what I want to see. Too easy.`,
      miss: () => `What are you looking at? Focus on target!`,
      warn_fast_recoil: () => `Stop spamming trigger! Let recoil reset. Tap, reset, tap!`,
      warn_drop: () => `Aim higher! Sniper bullet is falling into dirt!`,
      warn_lead: () => `Shoot in front of him! You shoot behind! Come on!`,
      warn_locked: () => `Click screen! Mouse is unlocked. Why are you waiting?`,
      sens_down: (d) => `You are overshooting! Stop shaking! I have lowered your sensitivity from ${d.prevSens} to ${d.newSens}. Now click the head!`,
      sens_up: (d) => `Too slow, you lag behind target! I have increased your sensitivity from ${d.prevSens} to ${d.newSens}. Wake up and snap faster!`,
      gameover: (d) => {
        let text = `Game over, you got ${d.score} points. Accuracy is ${d.accuracy}%. This is not major league level. `;
        if (d.recoil < 75) {
          text += `Recoil control is bad. Settle index is ${d.recoil}%. You spam too fast like a recruit. Slow down click tempo. `;
        }
        if (d.accuracy < 75) {
          text += `Roadmap prescription: Go run Recoil Control Lab for 10 minutes to train vertical pull-down, then try again.`;
        } else {
          text += `Ok, aim is actually pretty good. Try the PUBG Drive-By drill next. Let's see if you can track from moving car.`;
        }
        return text;
      }
    },
    tenz: {
      start: () => `Let's go! ${drillName} starting. Hit those targets, keep it smooth and fast!`,
      streak_5: () => `Oh my gosh, you are literally aim botting right now! Insane combo!`,
      miss: () => `Ah, just a bit off. Micro-adjust slightly. You got this.`,
      warn_fast_recoil: () => `Whoa, click speed is too fast! The vertical recoil is stacking up!`,
      warn_drop: () => `Aim a bit higher! The gravity drop is catching you.`,
      warn_lead: () => `Lead the target! Bullet velocity takes a split second to travel!`,
      warn_locked: () => `Cursor unlocked! Quickly click the canvas to snap it back!`,
      sens_down: (d) => `Flick overshoot detected! I'm dropping your sensitivity down from ${d.prevSens} to ${d.newSens} to help with that stopping power. That should feel much better!`,
      sens_up: (d) => `Under-flicking slightly, so I've bumped your sensitivity up from ${d.prevSens} to ${d.newSens}. This will help you snap right onto the target coordinate!`,
      gameover: (d) => {
        let text = `Finished! Score is ${d.score} points with ${d.accuracy}% accuracy! Honestly, that's pretty clean! `;
        if (d.recoil < 75) {
          text += `Your recoil settle is a bit low at ${d.recoil}%. Try focusing on that 330ms cadence sweetspot next time. `;
        }
        if (d.accuracy < 75) {
          text += `Roadmap prescribed: Spend 10 minutes strictly tapping in DMR Rhythm to build tempo muscle memory, then try the Pixel Hold drill.`;
        } else {
          text += `You're ready for pro tier. Launch the PUBG Drive-by Tracking to practice motion vector compensation.`;
        }
        return text;
      }
    },
    tgltn: {
      start: () => `Oh mate! ${drillName} is live. Let's pull down on that recoil and get cracking.`,
      streak_5: () => `Sensational clicking! Look at you go, mate! Absolute laser beam!`,
      miss: () => `Aw, missed by a whisker! Reset your hand, let's go again.`,
      warn_fast_recoil: () => `Whoa, spamming too fast mate! Let the Mini14 spring bounce back!`,
      warn_drop: () => `Elevate! Bullet drop is hitting the legs. Aim higher on the head!`,
      warn_lead: () => `Lead that runner, mate! You're shooting behind the momentum!`,
      warn_locked: () => `Oi, recapture your mouse! Click the canvas!`,
      sens_down: (d) => `Whoa mate, you're swinging past them! I've dialed your sensitivity down from ${d.prevSens} to ${d.newSens} to tighten up that control. Give it a rip.`,
      sens_up: (d) => `You're falling behind the momentum, mate. I've ticked your sensitivity up from ${d.prevSens} to ${d.newSens} to help you sweep faster. Track them!`,
      gameover: (d) => {
        let text = `All done! Score is ${d.score} points. Accuracy is ${d.accuracy}%. Brilliant effort! `;
        if (d.recoil < 75) {
          text += `Your vertical recoil reset index is looking a bit low at ${d.recoil}%. Pull down harder or space your shots to 330ms. `;
        }
        if (d.accuracy < 70) {
          text += `A bit shaky on target landing. Spend 10 minutes in Recoil Control Lab before pulling sniper leads.`;
        } else {
          text += `Elite tracking! Let's jump into PUBG Drive-by Tracking and practice some pass-by drive-bys!`;
        }
        return text;
      }
    },
    doc: {
      start: () => `THE TWO-TIME IS IN THE ARENA! I want violence, speed, and momentum! Launch it!`,
      streak_5: () => `RAUL! Unstoppable! The velocity! The power! Look at them explode!`,
      miss: () => `WAKE UP! Complete whiff! Are you asleep at the mouse?!`,
      warn_fast_recoil: () => `DON'T SPAM LIKE A RECRUIT! Let it settle, then snap it!`,
      warn_drop: () => `THE BULLET IS IN THE DIRT! AIM HIGH! ABOVE THE HEAD! UNBELIEVABLE!`,
      warn_lead: () => `LEAD HIM! You're shooting in the past! He is in the future! Lead!`,
      warn_locked: () => `THE RAW INPUT CAPTURE HAS BROKEN! Click the screen immediately!`,
      sens_down: (d) => `THE VELOCITY IS TOO WILD! I've lowered the sensitivity from ${d.prevSens} to ${d.newSens} to harness the raw power of the Two-Time! Focus!`,
      sens_up: (d) => `TOO SLOW! WE NEED MORE MOMENTUM! Sensitivity is increased from ${d.prevSens} to ${d.newSens}! Double the speed, double the dominance!`,
      gameover: (d) => {
        let text = `GAME OVER! Final score is ${d.score} points with ${d.accuracy}% accuracy. I am looking at these stats, and they need more juice! `;
        if (d.recoil < 75) {
          text += `Your settle index is ${d.recoil}%. Too much spamming! We need controlled violence! Speed but with focus! `;
        }
        if (d.accuracy < 75) {
          text += `Roadmap prescribed: Spend 10 minutes in Recoil Control Lab. Get that mouse moving, build that speed, and let's dominate!`;
        } else {
          text += `Excellent momentum! Get straight into PUBG Drive-By drill. Let's show them how the Two-Time does vehicle snipes!`;
        }
        return text;
      }
    }
  };

  const coach = templates[coachId] || templates.athena;
  const responder = coach[eventType] || templates.athena[eventType];
  
  if (!responder) return { text: "Coaching alert.", subtitle: "Coach: Alert." };
  
  const text = responder(extraData);
  const subtitle = `${COACHES.find(c => c.id === coachId)?.name || 'Coach'}: "${text}"`;
  
  return { text, subtitle };
}

export function speakCoachText(coachId, text, voiceEnabled = true) {
  if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const coach = COACHES.find(c => c.id === coachId) || COACHES[0];
    const settings = coach.voiceSettings;
    
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    
    const voices = getVoicesSafe();
    
    let voice = null;
    if (settings.gender === 'female') {
      voice = voices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('hazel') || v.name.toLowerCase().includes('google us english') || v.name.toLowerCase().includes('natural')));
    } else {
      voice = voices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('mark') || v.name.toLowerCase().includes('microsoft') || v.name.toLowerCase().includes('google uk english male')));
    }
    
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith('en'));
    }
    
    if (voice) {
      utterance.voice = voice;
    }
    
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error("Speech Synthesis Error", e);
  }
}

// Centralized entrypoint to receive warnings and performance markers from drills
export function handleCoachFeedback(input, context) {
  if (typeof window === 'undefined') return;
  const {
    inGameSens,
    setInGameSens,
    gameType = 'valorant',
    dpi = 800,
    coachId = 'athena',
    voiceEnabled = true,
    extra = {},
    priority = false,
    setCoachSubtitle,
    setCoachSpeaking,
    setSensAdjustedAlert
  } = context;

  const now = performance.now();

  // Helper to trigger speech and update React state subtitles/speaking indicators
  const speakWithState = (textToSpeak) => {
    if (typeof setCoachSubtitle === 'function') {
      setCoachSubtitle(textToSpeak);
    }
    if (typeof setCoachSpeaking === 'function') {
      setCoachSpeaking(true);
      // Automatically reset speaking state after 3.5 seconds
      setTimeout(() => setCoachSpeaking(false), 3500);
    }
    speakCoachText(coachId, textToSpeak, voiceEnabled);
  };

  // 1. If it's a raw telemetry trigger from checkSensitivityAdjustment (hit, miss, tracking_tick)
  if (input === 'hit' || input === 'miss' || input === 'tracking_tick') {
    const isLocked = extra.isLocked;
    const dist = extra.dist || 0;
    const targetSize = extra.targetSize || 15;

    if (input === 'hit' || (input === 'tracking_tick' && isLocked !== false)) {
      coachSession.consecutiveMisses = 0;
      if (coachSession.consecutiveMistakeCount > 0) {
        coachSession.consecutiveMistakeCount--;
      }
      return;
    }

    coachSession.consecutiveMisses++;
    
    // Classify as overshoot or undershoot
    let currentMistake = 'undershoot';
    if (dist > targetSize + 30) {
      currentMistake = 'overshoot';
    } else {
      const ch = extra.virtualCrosshair?.current;
      const tgt = extra.target;
      if (ch && tgt) {
        const isMovingRight = tgt.vx > 0;
        if (isMovingRight) {
          currentMistake = (ch.x > tgt.x) ? 'overshoot' : 'undershoot';
        } else {
          currentMistake = (ch.x < tgt.x) ? 'overshoot' : 'undershoot';
        }
      }
    }

    if (coachSession.lastMistakeCategory === currentMistake) {
      coachSession.consecutiveMistakeCount++;
    } else {
      coachSession.lastMistakeCategory = currentMistake;
      coachSession.consecutiveMistakeCount = 1;
    }

    // Trigger auto-adjustment on 3 consecutive identical mistakes
    if (coachSession.consecutiveMistakeCount >= 3) {
      if (now - coachSession.lastSensAdjustmentTime > 10000) {
        const prevSens = inGameSens;
        let newSens = inGameSens;
        let adjusted = false;

        if (currentMistake === 'overshoot') {
          newSens = parseFloat((inGameSens * 0.92).toFixed(3));
          adjusted = true;
        } else {
          newSens = parseFloat((inGameSens * 1.08).toFixed(3));
          adjusted = true;
        }

        if (adjusted && newSens !== prevSens && typeof setInGameSens === 'function') {
          setInGameSens(newSens);
          try {
            localStorage.setItem('proSens', newSens.toString());
            if (gameType === 'pubg') {
              localStorage.setItem('pubgSens', newSens.toString());
            }
          } catch (e) {}
          
          coachSession.lastSensAdjustmentTime = now;
          coachSession.consecutiveMistakeCount = 0;

          // Set visual alert overlay in state if component has the setter
          if (typeof setSensAdjustedAlert === 'function') {
            setSensAdjustedAlert(currentMistake === 'overshoot'
              ? `AI Coach: Lowered sens from ${prevSens} to ${newSens} (overshooting)`
              : `AI Coach: Raised sens from ${prevSens} to ${newSens} (lagging behind)`);
            setTimeout(() => setSensAdjustedAlert(null), 4000);
          }

          const dialogueGroup = COACH_HUMAN_DIALOGUES[coachId] || COACH_HUMAN_DIALOGUES.athena;
          const speechText = currentMistake === 'overshoot'
            ? dialogueGroup.adjust.sens_down(prevSens, newSens)
            : dialogueGroup.adjust.sens_up(prevSens, newSens);

          speakWithState(speechText);
          coachSession.lastSpokenTime = now;
        }
      }
    }
    return;
  }

  // 2. Otherwise input is a text warning spoken by the game (e.g. speakText(text))
  const text = input;

  // Handle drill start session resets
  if (text.toLowerCase().includes('initialize') || text.toLowerCase().includes('starting') || text.toLowerCase().includes('live') || text === 'start') {
    coachSession.lastMistakeCategory = null;
    coachSession.consecutiveMistakeCount = 0;
    coachSession.consecutiveMisses = 0;
    coachSession.lastSpokenCategory = null;
    coachSession.lastSpokenTime = 0;
    coachSession.lastSensAdjustmentTime = 0;
    // Reset speak-once tracking for new session
    coachSession.spokenCategories = new Set();
    coachSession.observationStartTime = now;
    coachSession.sensAdjustmentAnnounced = false;
    
    speakWithState(text);
    return;
  }

  // Handle Game Over
  if (text.includes('complete') || text.includes('Score is') || text.includes('diagnostics') || text.includes('advice') || text.includes('gameover')) {
    speakWithState(text);
    return;
  }

  // Classify mistake category from warnings
  let category = null;
  if (text.includes('unlocked') || text.includes('cursor')) category = 'locked';
  else if (text.includes('overflow') || text.includes('fast') || text.includes('recoil') || text.includes('settle')) category = 'recoil';
  else if (text.includes('drop') || text.includes('gravity') || text.includes('higher') || text.includes('lower') || text.includes('drop')) category = 'drop';
  else if (text.includes('lead') || text.includes('ahead') || text.includes('behind')) category = 'lead';
  else if (text.includes('moving') || text.includes('movement')) category = 'movement';
  else if (text.includes('overshoot') || text.includes('sweep speed')) category = 'overshoot';
  else if (text.includes('undershoot') || text.includes('accelerate')) category = 'undershoot';
  else if (text.includes('miss') || text.includes('expired') || text.includes('whiff')) category = 'miss';

  // ── SPEAK-ONCE SYSTEM ──
  // Enforce 5-second observation window before any feedback
  if (coachSession.observationStartTime > 0 && (now - coachSession.observationStartTime) < 5000) {
    // Silently track mistakes during observation, but don't speak
    if (coachSession.lastMistakeCategory === category) {
      coachSession.consecutiveMistakeCount++;
    } else {
      coachSession.lastMistakeCategory = category;
      coachSession.consecutiveMistakeCount = 1;
    }
    return;
  }

  // If this category has already been spoken this session, stay silent
  // Exception: sensitivity adjustments always get through (but only once)
  if (coachSession.spokenCategories.has(category)) {
    // Still track consecutive count for sensitivity adjustment logic
    if (coachSession.lastMistakeCategory === category) {
      coachSession.consecutiveMistakeCount++;
    } else {
      coachSession.lastMistakeCategory = category;
      coachSession.consecutiveMistakeCount = 1;
    }
    
    // Allow sensitivity adjustment announcement even if category was spoken
    if (coachSession.consecutiveMistakeCount >= 3 && !coachSession.sensAdjustmentAnnounced) {
      const prevSens = inGameSens;
      let newSens = inGameSens;
      let adjusted = false;

      if (category === 'overshoot' || category === 'recoil') {
        newSens = parseFloat((inGameSens * 0.92).toFixed(3));
        adjusted = true;
      } else if (category === 'undershoot' || category === 'lead' || category === 'drop') {
        newSens = parseFloat((inGameSens * 1.08).toFixed(3));
        adjusted = true;
      }

      if (adjusted && newSens !== prevSens && typeof setInGameSens === 'function') {
        setInGameSens(newSens);
        try {
          localStorage.setItem('proSens', newSens.toString());
          if (gameType === 'pubg') localStorage.setItem('pubgSens', newSens.toString());
        } catch (e) {}

        coachSession.lastSensAdjustmentTime = now;
        coachSession.consecutiveMistakeCount = 0;
        coachSession.sensAdjustmentAnnounced = true;

        if (typeof setSensAdjustedAlert === 'function') {
          setSensAdjustedAlert(category === 'overshoot' || category === 'recoil'
            ? `AI Coach: Lowered sens from ${prevSens} to ${newSens} (overshooting)`
            : `AI Coach: Raised sens from ${prevSens} to ${newSens} (lagging behind)`);
          setTimeout(() => setSensAdjustedAlert(null), 4000);
        }

        const dialogueGroup = COACH_HUMAN_DIALOGUES[coachId] || COACH_HUMAN_DIALOGUES.athena;
        const speechText = (category === 'overshoot' || category === 'recoil')
          ? dialogueGroup.adjust.sens_down(prevSens, newSens)
          : dialogueGroup.adjust.sens_up(prevSens, newSens);
        speakWithState(speechText);
        coachSession.lastSpokenTime = now;
      }
    }
    return;
  }

  // ── First (and only) time speaking this category ──
  if (coachSession.lastMistakeCategory === category) {
    coachSession.consecutiveMistakeCount++;
  } else {
    coachSession.lastMistakeCategory = category;
    coachSession.consecutiveMistakeCount = 1;
  }

  const dialogueGroup = COACH_HUMAN_DIALOGUES[coachId] || COACH_HUMAN_DIALOGUES.athena;
  let spokenText = dialogueGroup.repeat[category] || text;

  // Mark category as spoken — won't repeat this session
  coachSession.spokenCategories.add(category);

  speakWithState(spokenText);
  coachSession.lastSpokenCategory = category;
  coachSession.lastSpokenTime = now;
}

// ============================================================================
// END-GAME ANALYSIS — Intelligent Post-Session Coach Feedback
// Called once at game-over. Analyzes the session, identifies the weakest area,
// checks progression, and provides a single targeted recommendation.
// Acknowledges improvement and moves to the next weakness area.
// ============================================================================

/**
 * Analyze a completed drill session and generate intelligent coach feedback.
 * This is the main entry point called by drills at game-over.
 * 
 * @param {string} drillId - The drill that just completed
 * @param {object} sessionMetrics - { score, accuracy, reactionTimeMs, trackingAccuracy, ... }
 * @param {string} coachId - Active coach persona
 * @param {object} [options] - { voiceEnabled, setCoachSubtitle, setCoachSpeaking }
 * @returns {{ feedback: string, recommendation: object|null, tierChange: object|null, progression: object|null }}
 */
export function coachEndGameAnalysis(drillId, sessionMetrics = {}, coachId = 'athena', options = {}) {
  if (typeof window === 'undefined') return { feedback: '', recommendation: null, tierChange: null, progression: null };

  const { voiceEnabled = true, setCoachSubtitle, setCoachSpeaking } = options;
  const result = { feedback: '', recommendation: null, tierChange: null, progression: null };
  const parts = [];

  // Helper to speak with state
  const speak = (text) => {
    if (typeof setCoachSubtitle === 'function') setCoachSubtitle(text);
    if (typeof setCoachSpeaking === 'function') {
      setCoachSpeaking(true);
      setTimeout(() => setCoachSpeaking(false), 5000);
    }
    speakCoachText(coachId, text, voiceEnabled);
  };

  // 1. Check progression — has the previously-targeted weakness improved?
  try {
    const prevTarget = localStorage.getItem('coachProgressionTarget');
    if (prevTarget) {
      const weakest = getWeakestPillar();
      // If the previous weakness is no longer the weakest, player improved
      if (weakest && weakest.pillar !== prevTarget) {
        const prevPillarLabel = SKILL_PILLARS[prevTarget]?.label || prevTarget;
        const newPillarLabel = weakest.pillarData?.label || weakest.pillar;
        
        const progressionDialogue = COACH_HUMAN_DIALOGUES.progression;
        const progressionFn = progressionDialogue[coachId] || progressionDialogue.athena;
        const progressionText = progressionFn(prevPillarLabel, newPillarLabel);
        parts.push(progressionText);
        
        result.progression = { 
          improved: prevTarget, 
          improvedLabel: prevPillarLabel, 
          newTarget: weakest.pillar, 
          newTargetLabel: newPillarLabel 
        };
        
        // Update the target to the new weakness
        localStorage.setItem('coachProgressionTarget', weakest.pillar);
      }
    }
  } catch (e) {}

  // 2. Analyze the just-completed session
  const accuracy = sessionMetrics.accuracy ?? sessionMetrics.trackingAccuracy ?? 0;
  const reactionMs = sessionMetrics.reactionTimeMs ?? 0;
  const score = sessionMetrics.score ?? 0;

  // 3. Find the weakest pillar and generate a recommendation
  try {
    const weakest = getWeakestPillar();
    if (weakest) {
      // Don't recommend the drill they just played
      let recDrill = weakest.recommendedDrill;
      if (recDrill && recDrill.id === drillId) {
        // Find next-weakest drill in the same pillar
        const pillarDef = SKILL_PILLARS[weakest.pillar];
        const altDrill = pillarDef?.drills.find(d => d !== drillId);
        if (altDrill && DRILL_METADATA[altDrill]) {
          recDrill = { id: altDrill, ...DRILL_METADATA[altDrill] };
        }
      }

      if (recDrill) {
        const recommendDialogue = COACH_HUMAN_DIALOGUES.drillRecommend;
        const recommendFn = recommendDialogue[coachId] || recommendDialogue.athena;
        const recommendText = recommendFn(weakest.pillarData.label, recDrill.name);
        parts.push(recommendText);

        result.recommendation = {
          pillar: weakest.pillar,
          pillarLabel: weakest.pillarData.label,
          drill: recDrill,
          score: weakest.score
        };

        // Persist the progression target
        try {
          localStorage.setItem('coachProgressionTarget', weakest.pillar);
        } catch (e) {}
      }
    }
  } catch (e) {}

  // 4. Combine and deliver feedback
  result.feedback = parts.join(' ');
  
  if (result.feedback) {
    speak(result.feedback);
  }

  return result;
}

export function getCoachDashboardRecommendation(coachId, scores) {
  const { recoil, strafe, tracking, reflex, angleHold, prioritization } = scores;
  
  let weakest = 'none';
  const allZero = [recoil, strafe, tracking, reflex, angleHold, prioritization].every(s => s === 0);
  if (!allZero) {
    const rPct = recoil > 0 ? (recoil / 25) * 100 : 0;
    const sPct = strafe > 0 ? (strafe / 15) * 100 : 0;
    const tPct = tracking > 0 ? (tracking / 30) * 100 : 0;
    const refPct = reflex > 0 ? (reflex / 60) * 100 : 0;
    const aPct = angleHold > 0 ? (angleHold / 25) * 100 : 0;
    const pPct = prioritization > 0 ? (prioritization / 100) * 100 : 0;
    
    const minVal = Math.min(rPct, sPct, tPct, refPct, aPct, pPct);
    if (minVal === rPct) weakest = 'recoil';
    else if (minVal === sPct) weakest = 'strafe';
    else if (minVal === tPct) weakest = 'tracking';
    else if (minVal === refPct) weakest = 'reflex';
    else if (minVal === aPct) weakest = 'angleHold';
    else weakest = 'prioritization';
  }

  const reports = {
    athena: {
      none: "Tactical training system online. Benchmarks required. Execute Recoil Control Lab (accuracy), Counter-Strafe Trainer (movement synchronization), and Pro Smooth Pursuit (tracking) to establish performance vectors.",
      recoil: `Diagnostic warning: Spray control coefficient is deficient (${recoil} kills). Recommend 10 minutes of vertical recoil calibration in Recoil Control Lab. Focus on stabilizing vertical compensation curves.`,
      strafe: `Diagnostic warning: Movement synchronization desync detected. Your counter-strafe timing is off-axis (${strafe} hits). Target: Counter-Strafe Sync Trainer to lock in 0-velocity click thresholds.`,
      tracking: `Diagnostic warning: Dynamic tracking pursuit efficiency is low (${tracking} pts). Recommend 15 minutes of smooth tracking in Pro Smooth Pursuit or Parabolic Air-Track to isolate motor drift.`,
      reflex: `Diagnostic warning: Synaptic response speed is below nominal benchmark (${reflex} reaction). Launch Instant Reflex Test to condition visual trigger responses.`,
      angleHold: `Diagnostic warning: Angle holding coherence is sub-optimal (${angleHold} score). Launch Angle Hold & Peek Trainer. Align crosshairs with corner boundaries.`,
      prioritization: `Diagnostic warning: Target switching cognitive routing is bottlenecked (${prioritization}% efficiency). Train in Target Prioritization Swarm to isolate priority nodes.`
    },
    shroud: {
      none: "Hey, welcome to the aim lab. We need some baseline scores to see where you're at. Go play a few rounds of Recoil Control or Smooth Pursuit, and we'll go from there. Keep it relaxed.",
      recoil: `So your recoil control is at ${recoil} kills, which is a bit low. I'd spend 10 minutes in the Recoil Control Lab. Try to keep your pull-down smooth and don't panic.`,
      strafe: `Your counter-strafing is sitting around ${strafe} hits. You're probably firing before you actually stop moving. Try the Counter-Strafe Trainer, focus on the timing.`,
      tracking: `Your tracking is around ${tracking} points. Symmetrical tracking needs to be a bit smoother. I'd hop into Pro Smooth Pursuit and just focus on making slow, clean adjustments.`,
      reflex: `Your reaction speed is at ${reflex}. Reflexes feel a bit slow today. Play some Instant Reflex Test, keep your eyes relaxed, and just snap to the targets.`,
      angleHold: `Your corner holds are at ${angleHold}. You might be holding too close to the wall. Practice with the Angle Hold & Peek Trainer and focus on reaction adjustments.`,
      prioritization: `Prioritization is sitting at ${prioritization}%. You're probably clicking the nearest target instead of the high-value ones. Spend some time in Target Prioritization Swarm.`
    },
    simple: {
      none: "Ok, why are you not playing any drills yet? I see zero scores. You want to be pro or what? Go play Recoil Control and Counter-Strafe Trainer, show me some numbers. Let's go.",
      recoil: `Listen to me, your recoil spray is garbage, only ${recoil} kills. What is this? Go play Recoil Control Lab for 15 minutes. AK-47 profile, control the spray pattern, don't let it climb.`,
      strafe: `Your counter-strafing is ${strafe} hits. This is terrible. You shoot while moving and bullets fly to the sky. Go run Counter-Strafe Trainer, shoot ONLY when fully stopped!`,
      tracking: `Your tracking is ${tracking} points. You are shaking mouse like crazy. Go play Pro Smooth Pursuit, keep cursor locked on green sphere. No shaking, smooth movement only!`,
      reflex: `Reflex index is ${reflex}. Very slow reaction, my grandmother reacts faster. Run Instant Reflex Test, click as soon as screen flashes. Focus, no excuses.`,
      angleHold: `Angle hold score is ${angleHold}. You hold angles like recruit. Run Angle Hold & Peek Trainer. Watch the corner, react instantly when they swing wide.`,
      prioritization: `Prioritization score is ${prioritization}%. You are clicking random targets. Run Target Prioritization Swarm. Yellow is decoy, red is critical. Kill red first!`
    },
    tenz: {
      none: "Hey! Welcome! I'm super excited to coach you. Let's get some initial benchmarks! Hop into Flick Shot Training or Pro Smooth Pursuit so we can see what your sensitivity profile looks like!",
      recoil: `Your recoil control is sitting at ${recoil} kills. It looks like you're losing control during long sprays. Spend 10 minutes in Recoil Control Lab to lock down that pull-down muscle memory.`,
      strafe: `Your counter-strafing is at ${strafe} hits. You're probably clicking a bit too early! Try Counter-Strafe Trainer. Focus on the exact micro-second you switch from A to D.`,
      tracking: `Your tracking is at ${tracking} points. Symmetrical pursuit is key. Launch Pro Smooth Pursuit or Parabolic Air-Track, and try to keep your mouse glide completely continuous!`,
      reflex: `Your reflex score is ${reflex}. Let's speed up those reactions! Hop into Instant Reflex Test or S+ Headshot Reflex. Relax your forearm and focus on fast, explosive wrist snaps!`,
      angleHold: `Your angle hold is at ${angleHold}. Try Angle Hold & Peek Trainer. Keep your crosshairs slightly off the corner to compensate for reaction time. It literally makes swings so much easier to hit!`,
      prioritization: `Your priority switching is at ${prioritization}%. You want to train your eyes to scan the red high-value targets first. Run Target Prioritization Swarm and speed it up!`
    },
    tgltn: {
      none: "Oh mate! Let's get this aim sorted. Play a couple of drills like Recoil Control or Strafe Tracking so we can get some numbers on the board. Let's see what we're working with!",
      recoil: `Your spray control is at ${recoil} kills, mate. We gotta work on that pull. Hit the Recoil Control Lab, pull down hard on the vertical climb, and let's get those numbers up.`,
      strafe: `Your counter-strafe sync is at ${strafe} hits. You're firing too early, mate! Try Counter-Strafe Trainer. Wait for the velocity to hit zero, then tap. Boom, dead center.`,
      tracking: `Your tracking is at ${tracking} points. You're a bit shaky on the horizontal adjustments. Hop into Unpredictable Strafe Tracking or Pro Smooth Pursuit and smooth it out.`,
      reflex: `Reflexes at ${reflex}. Reactions are a bit sluggish, mate. Launch Instant Reflex Test or S+ Headshot Reflex and snap those targets as soon as they spawn.`,
      angleHold: `Angle holding is at ${angleHold}. You gotta watch that pixel gap, mate! Hop into Angle Hold & Peek Trainer. Hold that angle tight and click the second they peek.`,
      prioritization: `Target switching is at ${prioritization}%. You're spamming the near ones, mate. Run Target Prioritization Swarm and focus on snapping those red criticals first.`
    },
    doc: {
      none: "THE TWO-TIME IS LOOKING AT AN EMPTY BOARD! NO BENCHMARKS?! WAKE UP! Play Recoil Control, play Counter-Strafe, show me some numbers! I need to see violence, speed, and momentum!",
      recoil: `Your recoil control is only ${recoil} kills. UNACCEPTABLE! We need controlled violence! Spend 10 minutes in Recoil Control Lab. Pull down that mouse, control the beast, and dominate!`,
      strafe: `Counter-strafing at ${strafe} hits? You're shooting like a chump while sliding around! Try Counter-Strafe Trainer. Stop, snap, fire! Maximum momentum at the deadzone!`,
      tracking: `Your tracking is at ${tracking} points. You're lagging behind the targets! Go run Pro Smooth Pursuit or Parabolic Air-Track! Keep the velocity matching, lock on, and shred!`,
      reflex: `Your reaction speed is ${reflex}. SLOW! I want visual explosions! Launch S+ Headshot Reflex and snap those targets at 180ms! Show me the speed!`,
      angleHold: `Angle holding is at ${angleHold}. You're letting them swing you! Play Angle Hold & Peek Trainer. Hold the line, lock your focus, and blast them off the screen!`,
      prioritization: `Prioritization is at ${prioritization}%. You're ignoring the red threats! Play Target Prioritization Swarm. Focus the critical targets, clear the screen with speed!`
    }
  };

  const coachReport = reports[coachId] || reports.athena;
  return coachReport[weakest] || coachReport.none;
}
