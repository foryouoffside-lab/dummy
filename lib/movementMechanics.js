'use client';

const COUNTER_STRAFE_ACCEL = 7.5;
const MOVEMENT_SPEED_MAX = 250;
const STOPPING_SPEED_THRESHOLD = 30;
const ACCURACY_RECOVERY_MS = 140;
const PEEK_EXPOSURE_WINDOW = 300;
const JIGGLE_PEEK_INTERVAL = 200;

export const MOVEMENT_STATES = {
  STATIONARY: 'stationary',
  MOVING_LEFT: 'moving_left',
  MOVING_RIGHT: 'moving_right',
  COUNTER_STRAFING: 'counter_strafing',
  JIGGLE_PEEKING: 'jiggle_peeking',
  WIDE_SWINGING: 'wide_swinging',
  CROUCHING: 'crouching'
};

export function createMovementTarget(initialX, initialY, canvasWidth) {
  return {
    x: initialX,
    y: initialY,
    vx: 0,
    vy: 0,
    state: MOVEMENT_STATES.STATIONARY,
    lastDirectionChange: 0,
    lastStateChange: 0,
    accuracyPenalty: 1.0,
    isAccurate: true,
    crouchFactor: 1.0,
    peekProgress: 0,
    peekDirection: 1,
    strafeTarget: 0,
    movementPhase: 'idle'
  };
}

export function updateMovementTarget(target, now, canvasWidth, mode) {
  const dt = Math.min(0.05, (now - (target._lastUpdate || now)) / 1000);
  target._lastUpdate = now;

  switch (mode) {
    case 'counter-strafe':
      updateCounterStrafe(target, now, canvasWidth, dt);
      break;
    case 'jiggle-peek':
      updateJigglePeek(target, now, canvasWidth, dt);
      break;
    case 'wide-swing':
      updateWideSwing(target, now, canvasWidth, dt);
      break;
    case 'crouch-spam':
      updateCrouchSpam(target, now, dt);
      break;
    case 'mixed-movement':
      updateMixedMovement(target, now, canvasWidth, dt);
      break;
    default:
      break;
  }

  target.x = Math.max(30, Math.min(canvasWidth - 30, target.x));
  return target;
}

function updateCounterStrafe(target, now, canvasWidth, dt) {
  const timeSinceChange = now - target.lastDirectionChange;

  if (timeSinceChange > 800 + Math.random() * 600) {
    target.strafeTarget = target.strafeTarget === 0 ? canvasWidth * 0.8 : canvasWidth * 0.2;
    target.lastDirectionChange = now;
  }

  const direction = target.strafeTarget > target.x ? 1 : -1;
  const distanceToTarget = Math.abs(target.strafeTarget - target.x);
  const stoppingDistance = (MOVEMENT_SPEED_MAX * MOVEMENT_SPEED_MAX) / (2 * COUNTER_STRAFE_ACCEL);

  if (distanceToTarget < stoppingDistance && Math.abs(target.vx) > STOPPING_SPEED_THRESHOLD) {
    target.vx -= direction * COUNTER_STRAFE_ACCEL * 2 * dt;
    target.state = MOVEMENT_STATES.COUNTER_STRAFING;
    target.isAccurate = true;
  } else if (Math.abs(target.vx) > STOPPING_SPEED_THRESHOLD) {
    target.isAccurate = false;
    target.accuracyPenalty = Math.min(3.0, 1.0 + Math.abs(target.vx) / MOVEMENT_SPEED_MAX * 2);
  } else {
    target.vx += direction * COUNTER_STRAFE_ACCEL * dt;
    target.vx = Math.max(-MOVEMENT_SPEED_MAX, Math.min(MOVEMENT_SPEED_MAX, target.vx));
    target.state = direction > 0 ? MOVEMENT_STATES.MOVING_RIGHT : MOVEMENT_STATES.MOVING_LEFT;
    target.isAccurate = false;
  }

  if (Math.abs(target.vx) < STOPPING_SPEED_THRESHOLD && distanceToTarget < 5) {
    target.vx = 0;
    target.state = MOVEMENT_STATES.STATIONARY;
    target.isAccurate = true;
    target.accuracyPenalty = 1.0;
  }

  target.x += target.vx * dt;
}

function updateJigglePeek(target, now, canvasWidth, dt) {
  const cycleTime = (now - (target._cycleStart || now)) % (JIGGLE_PEEK_INTERVAL * 2);
  target._cycleStart = target._cycleStart || now;

  if (cycleTime < JIGGLE_PEEK_INTERVAL * 0.4) {
    const progress = cycleTime / (JIGGLE_PEEK_INTERVAL * 0.4);
    target.x = canvasWidth * 0.15 + (canvasWidth * 0.35 - canvasWidth * 0.15) * progress;
    target.isAccurate = false;
    target.state = MOVEMENT_STATES.JIGGLE_PEEKING;
  } else if (cycleTime < JIGGLE_PEEK_INTERVAL * 0.5) {
    target.isAccurate = true;
    target.state = MOVEMENT_STATES.STATIONARY;
  } else if (cycleTime < JIGGLE_PEEK_INTERVAL * 0.9) {
    const progress = (cycleTime - JIGGLE_PEEK_INTERVAL * 0.5) / (JIGGLE_PEEK_INTERVAL * 0.4);
    target.x = canvasWidth * 0.35 - (canvasWidth * 0.35 - canvasWidth * 0.15) * progress;
    target.isAccurate = false;
  } else {
    target.isAccurate = false;
    target.state = MOVEMENT_STATES.STATIONARY;
  }
}

function updateWideSwing(target, now, canvasWidth, dt) {
  if (!target._swingInitiated) {
    target._swingInitiated = now;
    target._swingDirection = target.x < canvasWidth / 2 ? 1 : -1;
    target._swingStartX = target.x;
  }

  const elapsed = now - target._swingInitiated;
  const swingDuration = 400;
  const swingDistance = canvasWidth * 0.4;

  if (elapsed < swingDuration) {
    const progress = elapsed / swingDuration;
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    target.x = target._swingStartX + target._swingDirection * swingDistance * eased;
    target.isAccurate = progress > 0.7;
    target.state = MOVEMENT_STATES.WIDE_SWINGING;
  } else {
    target.isAccurate = true;
    target.state = MOVEMENT_STATES.STATIONARY;
    target._swingInitiated = null;
  }
}

function updateCrouchSpam(target, now, dt) {
  const cycle = Math.sin(now / 300) * 0.5 + 0.5;
  target.crouchFactor = 0.5 + cycle * 0.5;
  target.isAccurate = target.crouchFactor > 0.85;
  target.state = target.crouchFactor < 0.7 ? MOVEMENT_STATES.CROUCHING : MOVEMENT_STATES.STATIONARY;
}

function updateMixedMovement(target, now, canvasWidth, dt) {
  const phase = Math.floor(now / 2000) % 4;
  switch (phase) {
    case 0: updateCounterStrafe(target, now, canvasWidth, dt); break;
    case 1: updateJigglePeek(target, now, canvasWidth, dt); break;
    case 2: updateWideSwing(target, now, canvasWidth, dt); break;
    case 3: updateCrouchSpam(target, now, dt); break;
  }
}

export function getMovementAccuracyMultiplier(target) {
  if (target.isAccurate) return 1.0;
  return 1.0 / target.accuracyPenalty;
}

export function shouldPenalizeShot(target, shotTime) {
  if (target.isAccurate) return false;
  return target.accuracyPenalty > 1.5;
}