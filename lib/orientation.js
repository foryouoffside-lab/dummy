// lib/orientation.js
export async function lockLandscape() {
  try {
    if (typeof window !== 'undefined' && window.screen && window.screen.orientation && window.screen.orientation.lock) {
      await window.screen.orientation.lock('landscape').catch(() => {});
      return true;
    }
  } catch (e) {}
  return false;
}

export async function lockPortrait() {
  try {
    if (typeof window !== 'undefined' && window.screen && window.screen.orientation && window.screen.orientation.lock) {
      await window.screen.orientation.lock('portrait').catch(() => {});
      return true;
    }
  } catch (e) {}
  return false;
}

export async function unlockOrientation() {
  try {
    if (typeof window !== 'undefined' && window.screen && window.screen.orientation && window.screen.orientation.unlock) {
      window.screen.orientation.unlock();
      return true;
    }
  } catch (e) {}
  return false;
}
