// node --test tests/page-turn.test.mjs
import assert from "node:assert/strict";
import { test } from "node:test";
import { clampPage, stepToward, turnLayers, turnDuration } from "../src/lib/pageTurn.js";

test("clampPage keeps requests inside the book", () => {
  assert.equal(clampPage(-1, 4), 0);
  assert.equal(clampPage(4, 4), 3);
  assert.equal(clampPage(2, 4), 2);
});

test("stepToward turns one leaf at a time in either direction", () => {
  assert.equal(stepToward(0, 3), 1);
  assert.equal(stepToward(3, 0), 2);
  assert.equal(stepToward(2, 2), 2);
});

test("a queued jump visits every page and ends on the target", () => {
  const visited = [];
  for (let page = 0; page !== 3; page = stepToward(page, 3)) visited.push(page);
  assert.deepEqual(visited, [0, 1, 2]);
});

test("turnLayers gives the same faces for a forward and backward turn", () => {
  assert.deepEqual(turnLayers(1, 2), { low: 1, high: 2, forward: true });
  assert.deepEqual(turnLayers(2, 1), { low: 1, high: 2, forward: false });
});

test("queued flips are quicker than the final turn", () => {
  assert.ok(turnDuration(3) < turnDuration(1));
});
