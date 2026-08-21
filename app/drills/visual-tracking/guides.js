// Per-drill long-form copy rendered on the server by <DrillGuide>.
//
// Each entry has to be genuinely drill-specific. The 15 visual-tracking pages
// previously shared a single title suffix and ~150 words of near-identical
// prose, measuring 0.77 mean pairwise similarity, and every one of them was
// stuck at "Discovered - currently not indexed" in Search Console. Keep new
// entries concrete about the motion pattern, the ocular mechanism and the
// sport or game it transfers to; generic "train your eyes" filler re-creates
// the duplication problem this file exists to solve.

const VT = '/drills/visual-tracking';

export const GUIDES = {
  'constant-slow-pursuit': {
    heading: 'Smooth pursuit eye exercise at low velocity',
    intro: [
      'Smooth pursuit is the one eye movement you cannot fake. Your eyes can only glide steadily across a scene when something real is moving for them to lock onto, and the slower that target moves, the harder the system has to work to stay smooth instead of breaking into a series of small corrective jumps. This drill runs a target along a continuous Lissajous curve at deliberately low speed to expose exactly that failure point.',
      'When pursuit gain drops, the eye falls behind the target and the brain fires a catch-up saccade. You feel it as a flicker or a stutter rather than a glide. Training at low velocity teaches the pursuit system to hold gain close to the target speed, which is the difference between reading a slow-strafing enemy in a shooter and losing them every half second.',
    ],
    steps: [
      'Start at the slowest speed setting. Low velocity is harder than it looks, and rushing to a fast setting hides the exact stutter you are here to fix.',
      'Keep your head still and let your eyes do the work. If your neck is moving, you are training the vestibulo-ocular reflex instead of smooth pursuit.',
      'Watch for the moment the target seems to jump rather than glide. That flicker is a catch-up saccade and it marks the edge of your current pursuit quality.',
      'Run five to ten minutes, then raise the speed only once you can complete a full curve with no perceived stutter.',
    ],
    audience: 'Competitive shooter players who lose slow-strafing targets, racket and ball-sport athletes tracking a ball through its slow phase, and anyone working through a vision-therapy programme where smooth pursuit quality is the measured outcome.',
    faqs: [
      { q: 'Why is slow tracking harder than fast tracking?', a: 'Fast targets recruit a strong pursuit response automatically. Slow targets sit near the threshold where the system under-responds, so the eye repeatedly falls behind and has to correct with a small saccade.' },
      { q: 'What is a Lissajous curve?', a: 'A path traced by combining two perpendicular oscillations. It produces a continuous looping shape with no corners, which keeps the drill purely about smooth pursuit rather than direction changes.' },
      { q: 'Should my eyes water during this?', a: 'Mild watering usually means you are blinking less than normal while concentrating. Blink deliberately between rounds, and stop if you get genuine eye strain.' },
    ],
    related: [
      { label: 'Sine Wave Pursuit', href: `${VT}/sine-wave-pursuit` },
      { label: 'Infinity Pursuit', href: `${VT}/infinity-pursuit` },
      { label: 'Predictive Pursuit', href: `${VT}/predictive-pursuit` },
    ],
  },

  'directional-chaos-pursuit': {
    heading: 'Eye tracking under erratic, unpredictable motion',
    intro: [
      'Most tracking practice uses predictable paths, which quietly lets you cheat. Once a path repeats, your brain stops tracking and starts predicting, and your measured accuracy improves without your actual pursuit ability changing at all. This drill removes that shortcut by applying continuous random velocity nudges to the target so no two seconds of motion are ever the same.',
      'What you are training here is recovery time, not steady-state tracking. Every nudge throws your gaze off the target, and the useful skill is how fast you re-acquire and settle rather than how long you can hold a smooth glide. That maps directly onto tracking an opponent who is deliberately moving unpredictably to break your aim.',
    ],
    steps: [
      'Resist the urge to guess where the target is going. Guessing on a genuinely random path costs you more time than it saves.',
      'Aim your gaze slightly behind rather than ahead of the target. On chaotic motion, trailing recovery is faster than over-committed leading.',
      'Count your losses rather than your holds. Improvement shows up as fewer complete losses of the target, not longer perfect streaks.',
      'Alternate short chaos sets with a predictable drill so you can feel the difference between tracking and predicting.',
    ],
    audience: 'FPS players facing strafe-jiggle and erratic movement, goalkeepers and defenders reading deceptive body movement, and anyone whose tracking looks good in practice but falls apart against a real opponent.',
    faqs: [
      { q: 'Why does my accuracy drop compared with other drills?', a: 'That is expected and it is the point. Predictable drills let prediction inflate your score. A chaotic path measures pursuit and recovery closer to their true level.' },
      { q: 'Is random motion actually trainable?', a: 'The randomness itself is not, but your recovery latency after losing the target is. That latency is the skill this drill improves.' },
      { q: 'How does this differ from the evasion drill?', a: 'Dynamic Evasion uses sharp deliberate turns at intervals. This drill applies continuous small random nudges, so the target is never briefly stable.' },
    ],
    related: [
      { label: 'Dynamic Evasion Pursuit', href: `${VT}/dynamic-evasion-pursuit` },
      { label: 'Spatial Shift Pursuit', href: `${VT}/spatial-shift-pursuit` },
      { label: 'Momentum Teleport Pursuit', href: `${VT}/momentum-teleport-pursuit` },
    ],
  },

  'dynamic-evasion-pursuit': {
    heading: 'Reactive eye tracking against sudden evasive turns',
    intro: [
      'A target moving in a straight line asks almost nothing of your visual system. The cost lands at the turn. This drill holds the target on a readable heading just long enough for your pursuit to settle, then cuts it hard in a new direction, which forces a rapid re-acquisition under exactly the conditions that break aim in a real match.',
      'The measurable skill is the gap between the target changing direction and your gaze arriving on its new heading. Trained players close that gap by reacting to the turn itself rather than to the displacement that follows it, which is a perceptual change rather than a reflex change.',
    ],
    steps: [
      'Fix your attention on the target itself, not the space ahead of it. Leading a target that is about to cut costs you the full width of the turn.',
      'Learn the tell. Most direction changes are preceded by a brief velocity change, and catching that is faster than catching the new heading.',
      'Do not chase with your head. Head movement adds latency on sharp cuts because the neck is far slower than the eye.',
      'Work in sets of sixty to ninety seconds. Reactive tracking degrades quickly with fatigue and long sets just train the tired version of the skill.',
    ],
    audience: 'Players tracking dodging opponents in arena shooters, defenders in football, basketball and hockey reading a cut, and anyone whose crosshair consistently overshoots when a target changes direction.',
    faqs: [
      { q: 'Why do I always overshoot after a turn?', a: 'You committed velocity to the old heading. The correction is to reduce how far you lead the target, so a direction change costs less to recover.' },
      { q: 'Should I use a lower mouse sensitivity for this?', a: 'This drill is gaze-based rather than aim-based, so sensitivity does not apply. Transfer to aim happens through faster visual re-acquisition.' },
      { q: 'How often should I run it?', a: 'Five to ten minutes as a warm-up before playing is more useful than long isolated sessions, because reactive tracking responds to frequency more than volume.' },
    ],
    related: [
      { label: 'Directional Chaos Pursuit', href: `${VT}/directional-chaos-pursuit` },
      { label: 'Zig-Zag Path Pursuit', href: `${VT}/zig-zag-path-pursuit` },
      { label: 'Spatial Shift Pursuit', href: `${VT}/spatial-shift-pursuit` },
    ],
  },

  'ghosting-suppress-pursuit': {
    heading: 'Eye fixation stability against motion blur and afterimages',
    intro: [
      'When a bright target moves quickly across a dark screen it leaves a visual trail: partly display persistence, partly an afterimage on your retina. Your visual system has to decide which of those signals is the real target. Lock onto the trail instead of the object and your gaze sits permanently behind where the target actually is.',
      'This drill deliberately generates that ghosting and asks you to hold fixation on the true leading edge. The skill it builds is suppression, which means learning to discard a strong but misleading visual signal. That transfers to any high-contrast, fast-moving environment where trails and smear are part of what you see.',
    ],
    steps: [
      'Fixate on the leading edge of the target, never its centre and never its trail. The leading edge is the only part that reports the true position.',
      'Blink deliberately between rounds. Afterimages accumulate, and a blink resets the retinal signal.',
      'Run this drill in a dimly lit room. Ghosting is strongest against a dark surround, which is exactly the condition you want to train against.',
      'If the trail starts to feel like the target, stop and rest for a minute. Pushing through builds the wrong association.',
    ],
    audience: 'Players on high-refresh displays who see smear on fast flicks, sim racers tracking objects at speed, and anyone whose aim consistently lands just behind a fast-moving target.',
    faqs: [
      { q: 'Is ghosting my monitor or my eyes?', a: 'Both contribute. Display persistence adds a real trail and retinal afterimage adds a perceived one. This drill trains the perceptual half, which is the half you can change.' },
      { q: 'Will this help on a 60Hz monitor?', a: 'Yes, and arguably more. Lower refresh rates produce longer visible trails, so the suppression skill matters more.' },
      { q: 'Why does the target smear more as I get tired?', a: 'Fatigue reduces fixation stability, so your gaze drifts across the trail rather than holding the edge. It is a reliable signal to end the session.' },
    ],
    related: [
      { label: 'Strobe Prediction Pursuit', href: `${VT}/strobe-prediction-pursuit` },
      { label: 'Constant Slow Pursuit', href: `${VT}/constant-slow-pursuit` },
      { label: 'Peripheral Ping Pursuit', href: `${VT}/peripheral-ping-pursuit` },
    ],
  },

  'infinity-pursuit': {
    heading: 'Figure-8 eye tracking exercise',
    intro: [
      'The figure-8, or lemniscate, is the standard shape in vision training for one specific reason: it crosses the midline twice per cycle. Every crossing hands control of the movement from one side of your visual field to the other, and any weakness in that handoff shows up as a stumble at the centre of the pattern.',
      'Unlike a circle, the figure-8 also reverses curvature at each loop, so your pursuit system has to decelerate, reverse and re-accelerate smoothly rather than settling into one constant rotation. That combination of midline crossing and curvature reversal is why the shape survives in both sports vision and clinical vision therapy.',
    ],
    steps: [
      'Watch the centre crossing specifically. If you have a weak point it will be there, not out at the loops.',
      'Keep your head fixed. The temptation to rotate your head through the loops removes the midline challenge entirely.',
      'Run the pattern in both directions. The handoff is not symmetrical and most people are noticeably worse one way.',
      'Build to ten minutes gradually. Midline work is more tiring than it feels in the first minute.',
    ],
    audience: 'Anyone following a sports-vision or vision-therapy programme where figure-8 tracking is prescribed, plus gamers and athletes who notice their tracking degrades specifically when a target crosses in front of them.',
    faqs: [
      { q: 'Why is the centre of the pattern the hard part?', a: 'It is where control passes between the left and right visual fields. Any asymmetry between the two shows up as a stutter at that handoff.' },
      { q: 'Is a figure-8 better than a circle?', a: 'For this purpose yes, because a circle never crosses the midline or reverses curvature, so it trains a narrower slice of pursuit.' },
      { q: 'Should I do it in both directions?', a: 'Yes. Most people track noticeably better one way, and training only the strong direction widens the gap.' },
    ],
    related: [
      { label: 'Constant Slow Pursuit', href: `${VT}/constant-slow-pursuit` },
      { label: 'Sine Wave Pursuit', href: `${VT}/sine-wave-pursuit` },
      { label: 'Triangular Pursuit', href: `${VT}/triangular-pursuit` },
    ],
  },

  'momentum-teleport-pursuit': {
    heading: 'Anticipatory eye tracking after sudden position jumps',
    intro: [
      'This drill breaks a rule your visual system relies on. The target keeps its velocity but its position jumps instantly to somewhere else on screen, so everything you learned about where it was going stays valid while everything you knew about where it is becomes wrong.',
      'That separation is the whole exercise. You have to carry the heading forward while discarding the position, which is the same problem you face when an opponent disappears behind cover and reappears elsewhere, or when a ball is briefly occluded and emerges on a different part of the pitch. The players who handle it well re-acquire on the predicted heading rather than searching the whole screen.',
    ],
    steps: [
      'After a jump, look along the heading the target already had rather than scanning outward from where it vanished.',
      'Note the direction of travel consciously during the stable phase. You cannot carry forward a heading you never registered.',
      'Accept a brief loss after each teleport. Trying to eliminate it entirely produces frantic scanning that is slower overall.',
      'Track your re-acquisition time across sessions rather than raw score. That latency is the thing actually improving.',
    ],
    audience: 'Shooter players dealing with opponents rotating through cover, team-sport athletes tracking players through occlusion, and anyone who loses the plot completely when a target briefly leaves view.',
    faqs: [
      { q: 'What does momentum mean here?', a: 'The target keeps its speed and direction across the jump. Only its position changes, so the heading you observed before the jump is still correct after it.' },
      { q: 'Is this just a reaction-time test?', a: 'No. Reaction time is fixed within a session. What improves is where you choose to look first, which is a prediction skill.' },
      { q: 'Why does scanning outward feel faster but score worse?', a: 'Outward scanning covers area without using information you already have. Following the known heading searches a much smaller region.' },
    ],
    related: [
      { label: 'Predictive Pursuit', href: `${VT}/predictive-pursuit` },
      { label: 'Strobe Prediction Pursuit', href: `${VT}/strobe-prediction-pursuit` },
      { label: 'Spatial Shift Pursuit', href: `${VT}/spatial-shift-pursuit` },
    ],
  },

  'peripheral-ping-pursuit': {
    heading: 'Free peripheral vision training exercise',
    intro: [
      'Peripheral vision is not blurry central vision. It is a separate system, poor at detail and colour but extremely good at detecting motion and change, and it only works while your eyes are still. The moment you turn to look at something in the periphery, you have stopped using peripheral vision and started using central vision on a new fixation.',
      'This drill enforces that distinction. You hold fixation on a centre crosshair while transient targets appear at the edges, and you register them without breaking fixation. Almost everyone fails the same way at first: the eyes snap to each new target automatically. Learning to suppress that reflex is what actually widens your usable field.',
    ],
    steps: [
      'Keep your gaze pinned to the centre crosshair for the whole round. Every glance outward is a repetition of the habit you are trying to break.',
      'Detect, do not identify. Peripheral vision reports that something changed and roughly where. Asking it for detail forces a saccade.',
      'Start with targets close to centre and let them move outward as you improve, rather than starting at the widest spacing.',
      'Stop when you notice yourself glancing. Once fixation control degrades, further repetitions train the wrong response.',
    ],
    audience: 'Shooter players who want to notice flanks without sweeping their crosshair, team-sport athletes tracking off-ball movement while watching the play, and drivers or riders working on hazard awareness.',
    faqs: [
      { q: 'Can peripheral vision actually be improved?', a: 'The physical extent of your visual field is fixed, but how much of it you attend to is not. Most gains come from attention and fixation control rather than optics.' },
      { q: 'Why do my eyes keep jumping to the targets?', a: 'That is a reflexive orienting response and it is normal. Suppressing it deliberately is the trained skill, and it takes repetition.' },
      { q: 'Should I sit closer to the screen?', a: 'Yes. Sitting closer pushes the targets further into your periphery in angular terms, which makes the drill harder and more useful.' },
    ],
    related: [
      { label: 'Split-Screen Tracking', href: `${VT}/split-screen-tracking` },
      { label: 'Ghosting Suppress Pursuit', href: `${VT}/ghosting-suppress-pursuit` },
      { label: 'Strobe Prediction Pursuit', href: `${VT}/strobe-prediction-pursuit` },
    ],
  },

  'predictive-pursuit': {
    heading: 'Predictive eye tracking and trajectory interpolation',
    intro: [
      'Pure reactive tracking always runs late. There is an unavoidable delay between light hitting your retina and your eyes responding, so if you only ever react, your gaze permanently trails the target. Skilled tracking closes that gap by placing the eyes where the target is about to be, using the trajectory you have already observed.',
      'This drill trains that interpolation directly. You watch a target travel a readable path and shift your gaze ahead of it rather than onto it, then verify whether your prediction was correct as it arrives. Over-predicting is as costly as under-predicting, so the drill is really about calibrating how far ahead to commit.',
    ],
    steps: [
      'Deliberately place your gaze ahead of the target and let it come to you. Following it directly trains the reactive pattern you already have.',
      'Calibrate the size of your lead. Too far ahead and you lose the target entirely on any direction change.',
      'Observe for a full second before committing. Prediction needs an established trajectory to work from.',
      'Alternate with a chaotic drill so you learn when prediction is worth using and when it is a liability.',
    ],
    audience: 'Shooter players learning to lead moving targets, ball-sport athletes moving to an interception point rather than to the ball, and anyone whose tracking is accurate but consistently a fraction late.',
    faqs: [
      { q: 'Is predicting the same as guessing?', a: 'No. Prediction extrapolates an observed trajectory. Guessing ignores the evidence. On a readable path prediction is measurably more accurate than reacting.' },
      { q: 'How far ahead should I look?', a: 'Far enough that the target arrives at your gaze rather than passing it, which depends on speed. Calibrating that distance is the drill.' },
      { q: 'Does this hurt me against unpredictable targets?', a: 'It can if you predict indiscriminately. Pair this with a chaos or evasion drill so you learn to switch strategies based on how readable the motion is.' },
    ],
    related: [
      { label: 'Momentum Teleport Pursuit', href: `${VT}/momentum-teleport-pursuit` },
      { label: 'Directional Chaos Pursuit', href: `${VT}/directional-chaos-pursuit` },
      { label: 'Constant Slow Pursuit', href: `${VT}/constant-slow-pursuit` },
    ],
  },

  'sine-wave-pursuit': {
    heading: 'Smooth pursuit eye training on a rhythmic path',
    intro: [
      'A sine wave is the cleanest possible test of pursuit quality. The path is continuous, the speed varies smoothly and predictably, and there are no corners to hide behind, so any break in your tracking is immediately visible as a stutter rather than being masked by a direction change.',
      'The interesting part is the turn at each peak and trough, where the target decelerates to zero and reverses. Most people track the fast middle section well and lose quality at the reversals, because that is where the pursuit system has to unwind its velocity and rebuild it in the opposite direction.',
    ],
    steps: [
      'Judge yourself at the peaks and troughs, not in the fast middle section. The reversals are where pursuit quality actually shows.',
      'Let your gaze decelerate with the target rather than holding speed into the turn and overshooting.',
      'Use the rhythm. A sine wave has a steady period, and syncing to it produces noticeably smoother tracking than reacting frame by frame.',
      'Increase frequency before amplitude. Faster reversals stress the system more than a wider path does.',
    ],
    audience: 'Anyone starting visual tracking training who wants a clean baseline, athletes tracking a bouncing or oscillating ball, and players building the foundation before moving to erratic drills.',
    faqs: [
      { q: 'Why does the turn feel harder than the straight?', a: 'At each peak the target decelerates to zero and reverses. Your pursuit system has to unwind its velocity and rebuild it the other way, which is more demanding than holding a constant glide.' },
      { q: 'Is this a good drill to start with?', a: 'Yes. Predictable rhythmic motion gives a clean baseline before you add chaos, occlusion or teleporting.' },
      { q: 'Should I increase speed or amplitude first?', a: 'Frequency first. Faster reversals stress pursuit more directly than simply making the path wider.' },
    ],
    related: [
      { label: 'Constant Slow Pursuit', href: `${VT}/constant-slow-pursuit` },
      { label: 'Infinity Pursuit', href: `${VT}/infinity-pursuit` },
      { label: 'Vertical Zig-Zag Pursuit', href: `${VT}/staircase-step` },
    ],
  },

  'spatial-shift-pursuit': {
    heading: 'Adaptive eye tracking against changing trajectories',
    intro: [
      'This drill sits between predictable and chaotic motion. The target bounces along a readable path long enough for you to build an expectation, then randomly shifts both its speed and its direction, invalidating that expectation without warning. The result is a repeated cycle of commit, discover you were wrong, and re-commit.',
      'What improves here is not tracking accuracy so much as how quickly you abandon a prediction that has stopped being true. Players who hold onto a stale expectation stay wrong for a long time. Players who drop it fast lose the target briefly and recover. That flexibility is the trained outcome.',
    ],
    steps: [
      'Commit to the readable phase properly. Half-committing to avoid being wrong makes your tracking worse in both phases.',
      'When the shift happens, drop your prediction immediately rather than trying to reconcile it with what you are seeing.',
      'Watch for speed changes as well as direction changes. Speed shifts are subtler and are what most people miss.',
      'Measure recovery rather than streaks. Fewer prolonged losses is the improvement, not longer perfect runs.',
    ],
    audience: 'Players facing opponents who mix predictable movement with sudden changes, athletes reading a ball that deflects or changes pace, and anyone who tracks well until something unexpected happens.',
    faqs: [
      { q: 'How is this different from the chaos drill?', a: 'Chaos never gives you a stable phase. This drill deliberately does, so you build an expectation and then have to discard it, which trains flexibility rather than pure recovery.' },
      { q: 'Should I stop predicting to avoid being caught out?', a: 'No. Refusing to predict makes you late on every readable phase. The goal is fast abandonment of a prediction, not avoidance of prediction.' },
      { q: 'Why do speed shifts catch me more than direction shifts?', a: 'A direction change is visually obvious. A speed change preserves the heading, so it registers only as a growing positional error.' },
    ],
    related: [
      { label: 'Directional Chaos Pursuit', href: `${VT}/directional-chaos-pursuit` },
      { label: 'Dynamic Evasion Pursuit', href: `${VT}/dynamic-evasion-pursuit` },
      { label: 'Predictive Pursuit', href: `${VT}/predictive-pursuit` },
    ],
  },

  'split-screen-tracking': {
    heading: 'Divided attention eye tracking test',
    intro: [
      'You have one fovea, so you can only look at one thing at a time. When two targets have to be tracked at once, your visual system has three options: alternate fixation between them, pull back to a wider view and track both peripherally, or track one and lose the other. This drill runs two targets on separate axes so you have to pick a strategy and live with its cost.',
      'The strategy that works is usually the second one. Pulling your gaze back to a point between the targets and tracking both with peripheral motion detection beats rapid alternation, because every alternation costs a saccade plus the time to re-acquire. Discovering that for yourself is most of the value here.',
    ],
    steps: [
      'Try alternating fixation for one round so you can feel how expensive each switch is.',
      'Then try holding a point between the targets and tracking both peripherally. Compare the scores honestly.',
      'Notice which target you drop when you fail. Most people have a consistent side bias worth knowing about.',
      'Keep sets short. Divided attention degrades faster than single-target tracking and long sets just log the tired version.',
    ],
    audience: 'Team-sport athletes watching the ball and an opponent simultaneously, shooter players holding an angle while monitoring a flank, and anyone testing whether their multitasking claim survives measurement.',
    faqs: [
      { q: 'Can I really track two things at once?', a: 'Not with detail vision. You can monitor two moving objects using peripheral motion detection while fixating between them, which is usually better than alternating fixation.' },
      { q: 'Which strategy scores higher?', a: 'For most people, holding a central fixation and using peripheral tracking. Alternation costs a saccade and a re-acquisition every switch.' },
      { q: 'Why do I always lose the same target?', a: 'Side bias in visual attention is common. Knowing which side you drop tells you which side to consciously check in real situations.' },
    ],
    related: [
      { label: 'Peripheral Ping Pursuit', href: `${VT}/peripheral-ping-pursuit` },
      { label: 'Directional Chaos Pursuit', href: `${VT}/directional-chaos-pursuit` },
      { label: 'Dynamic Evasion Pursuit', href: `${VT}/dynamic-evasion-pursuit` },
    ],
  },

  'staircase-step': {
    heading: 'Vertical eye tracking exercise',
    intro: [
      'Almost all tracking practice is horizontal, because almost all screen motion is horizontal. That leaves vertical tracking comparatively untrained, and it uses a different set of extraocular muscles with a different control pathway. This drill runs the target along a vertical multi-segment zig-zag so the work stays in the axis you normally neglect.',
      'Most people find vertical pursuit noticeably rougher than horizontal, and upward tracking harder than downward. That asymmetry is normal and it responds to training. It matters anywhere targets move in elevation: verticality in shooters, high balls in sport, and reading tasks that require controlled vertical scanning.',
    ],
    steps: [
      'Keep your chin level. Tilting your head converts the drill back into a horizontal one relative to your eyes.',
      'Compare upward against downward tracking. Most people are clearly worse going up and it is worth knowing by how much.',
      'Focus on the direction changes at each step corner, which is where vertical pursuit breaks down first.',
      'Keep sessions short at first. Vertical work fatigues faster than horizontal because these muscles get less everyday use.',
    ],
    audience: 'Shooter players dealing with vertical angles and elevation changes, athletes tracking high balls and lobs, and anyone who has trained horizontal tracking and found their vertical noticeably weaker.',
    faqs: [
      { q: 'Why is vertical tracking harder?', a: 'It uses a different muscle group and a different control pathway from horizontal tracking, and it gets far less everyday practice because most motion you watch is horizontal.' },
      { q: 'Is upward really harder than downward?', a: 'For most people yes. Upward gaze works against a slightly less favourable mechanical arrangement and is used less often.' },
      { q: 'Can I tilt my head to make it easier?', a: 'You can, but it defeats the purpose. Tilting turns vertical motion into horizontal motion relative to your eyes.' },
    ],
    related: [
      { label: 'Zig-Zag Path Pursuit', href: `${VT}/zig-zag-path-pursuit` },
      { label: 'Sine Wave Pursuit', href: `${VT}/sine-wave-pursuit` },
      { label: 'Triangular Pursuit', href: `${VT}/triangular-pursuit` },
    ],
  },

  'strobe-prediction-pursuit': {
    heading: 'Strobe vision training with cyclic occlusion',
    intro: [
      'Strobe training is a well-established sports-vision method: intermittently remove the visual signal so the athlete has to fill the gaps from prediction rather than continuous observation. Physical versions use shutter glasses. This drill does the same thing in software by cycling the target through brief occlusion intervals.',
      'When the target vanishes, you have no new information, so your only option is to continue its trajectory internally and be ready where it should reappear. The gaps force you to build and maintain a running model of the motion instead of passively following pixels, and that model is what keeps working when a real target is briefly hidden.',
    ],
    steps: [
      'During each blackout, keep moving your gaze along the predicted path rather than freezing where the target disappeared.',
      'Use the visible intervals to update your model of speed and heading, not just to re-find the target.',
      'Start with short occlusion intervals and lengthen them as your predictions get more accurate.',
      'Ten minutes is plenty. Strobe work is cognitively heavy and long sessions produce diminishing returns.',
    ],
    audience: 'Athletes using strobe or occlusion training as part of a sports-vision programme, shooter players tracking opponents through cover, and anyone who freezes when a target briefly disappears.',
    faqs: [
      { q: 'Is this the same as strobe glasses?', a: 'The principle is the same, which is intermittent visual information forcing prediction. Software occlusion targets one object rather than dimming your whole field.' },
      { q: 'Should I freeze my gaze during the blackout?', a: 'No. Freezing means the target reappears somewhere you are not looking. Keep moving along the predicted trajectory.' },
      { q: 'How long should the occlusion be?', a: 'Start short enough that you can predict successfully most of the time, then lengthen it. Gaps you cannot bridge just train guessing.' },
    ],
    related: [
      { label: 'Momentum Teleport Pursuit', href: `${VT}/momentum-teleport-pursuit` },
      { label: 'Predictive Pursuit', href: `${VT}/predictive-pursuit` },
      { label: 'Ghosting Suppress Pursuit', href: `${VT}/ghosting-suppress-pursuit` },
    ],
  },

  'triangular-pursuit': {
    heading: 'Eye tracking accuracy on sharp angular paths',
    intro: [
      'A triangle gives you three long readable edges separated by three abrupt corners. That structure isolates something a curved path cannot: the cost of an instantaneous direction change with no deceleration to warn you it is coming. On a curve your eyes get a gradual heading change. At a vertex they get none.',
      'The useful measurement is what happens in the first fraction of a second after each corner. Well-trained tracking re-establishes the new heading almost immediately. Untrained tracking continues briefly along the old edge before correcting, which is visible as an overshoot past every vertex.',
    ],
    steps: [
      'Watch your behaviour at the corners specifically. The edges are easy and tell you very little.',
      'Do not lead the target along an edge. Leading guarantees an overshoot when the vertex arrives.',
      'Turn off the guide lines once you are comfortable. Visible path lines let you pre-plan the corner instead of reacting to it.',
      'Run the triangle in both rotational directions, since corner handling is rarely symmetrical.',
    ],
    audience: 'Players tracking opponents who move in sharp angular patterns, athletes reading cuts and changes of direction, and anyone whose gaze consistently overshoots at direction changes.',
    faqs: [
      { q: 'Why turn off the guide lines?', a: 'With the path visible you can pre-plan each corner, which trains route memorisation instead of reactive tracking. Hidden lines force you to respond to the target itself.' },
      { q: 'Why do I overshoot every corner?', a: 'You are carrying velocity from the previous edge. Reducing how far you lead the target along each edge cuts the overshoot directly.' },
      { q: 'How does this compare to the zig-zag drill?', a: 'A triangle returns to a closed repeating loop with three fixed corners. The zig-zag drill uses an open path with varied segment lengths, so it is less predictable.' },
    ],
    related: [
      { label: 'Zig-Zag Path Pursuit', href: `${VT}/zig-zag-path-pursuit` },
      { label: 'Infinity Pursuit', href: `${VT}/infinity-pursuit` },
      { label: 'Dynamic Evasion Pursuit', href: `${VT}/dynamic-evasion-pursuit` },
    ],
  },

  'zig-zag-path-pursuit': {
    heading: 'Eye tracking coordination across sharp corners',
    intro: [
      'A zig-zag is an open path made of straight segments joined by sharp corners, with segment lengths that vary so you cannot settle into a rhythm. That combination trains corner handling without letting you memorise the route, which is the main weakness of any closed repeating shape.',
      'Each corner is a small, self-contained test: arrive with the right amount of lead, register the new heading, and re-establish smooth tracking before the segment ends. Because segment lengths vary, you also cannot rely on timing, so every corner has to be handled on visual evidence alone.',
    ],
    steps: [
      'Track the target rather than the drawn path. Following the line is route memorisation, not pursuit.',
      'Reduce your lead as you approach each corner and restore it once the new heading is established.',
      'Pay attention to short segments in particular, since they give you the least time to settle before the next corner.',
      'Once corners feel comfortable, hide the guide line so nothing telegraphs the next direction change.',
    ],
    audience: 'Shooter players tracking opponents through irregular movement, athletes reading repeated changes of direction, and anyone who has worked through the triangle drill and wants the same skill without a predictable loop.',
    faqs: [
      { q: 'How is this different from Triangular Pursuit?', a: 'The triangle is a closed loop with three fixed corners you eventually memorise. The zig-zag is open with varying segment lengths, so the timing of each corner stays unpredictable.' },
      { q: 'Why do short segments feel so much harder?', a: 'They give you less time to re-establish smooth tracking after a corner, so you meet the next one before you have fully settled.' },
      { q: 'Should I follow the drawn line or the target?', a: 'The target. Following the line means you are reading a route rather than tracking an object, which does not transfer.' },
    ],
    related: [
      { label: 'Triangular Pursuit', href: `${VT}/triangular-pursuit` },
      { label: 'Vertical Zig-Zag Pursuit', href: `${VT}/staircase-step` },
      { label: 'Dynamic Evasion Pursuit', href: `${VT}/dynamic-evasion-pursuit` },
    ],
  },
};

export default GUIDES;
