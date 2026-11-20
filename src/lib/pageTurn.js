// Page-turn bookkeeping for ProjectBook. Pure so it can be tested in node.

export const clampPage = (page, count) => Math.min(Math.max(page, 0), count - 1);

// Turns happen one leaf at a time, so a jump of three pages flips three leaves.
export const stepToward = (from, target) => from + Math.sign(target - from);

// While a leaf turns between two pages, the lower page's photo stays on the
// left, the higher page's text sits on the right, and the leaf carries the
// lower page's text on its front and the higher page's photo on its back.
// That holds for both directions, so forward and backward share one leaf.
export function turnLayers(from, to) {
  const low = Math.min(from, to);
  const high = Math.max(from, to);

  return { low, high, forward: to > from };
}

// Quick flips while more pages are queued, a full turn for the last one.
export const turnDuration = (pagesLeft) => (pagesLeft > 1 ? 380 : 720);
