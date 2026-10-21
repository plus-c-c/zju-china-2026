import assert from "node:assert/strict";
import test from "node:test";
import {
  getStepperEntryIndex,
  StepperWheelGesture,
} from "../src/components/stepperGesture.ts";

test("a long page gesture stops at the first card instead of skipping the deck", () => {
  assert.equal(
    getStepperEntryIndex({
      top: 2310,
      bottom: 4410,
      pinTop: 82,
      viewportHeight: 900,
      delta: 4500,
      count: 6,
    }),
    0,
  );
});

test("reverse entry from below stops at the last card", () => {
  assert.equal(
    getStepperEntryIndex({
      top: -3000,
      bottom: -900,
      pinTop: 0,
      viewportHeight: 900,
      delta: -4500,
      count: 6,
    }),
    5,
  );
});

test("normal scrolling outside a deck and movement inside it are not entry", () => {
  const bounds = {
    top: 2310,
    bottom: 4410,
    pinTop: 82,
    viewportHeight: 900,
    count: 6,
  };
  assert.equal(getStepperEntryIndex({ ...bounds, delta: 100 }), null);
  assert.equal(getStepperEntryIndex({ ...bounds, delta: -4500 }), null);
  assert.equal(
    getStepperEntryIndex({ ...bounds, top: -400, bottom: 1700, delta: 4500 }),
    null,
  );
});

test("a long gutter gesture and its inertia advance only one card", () => {
  const gesture = new StepperWheelGesture();
  assert.equal(gesture.move(0, 4500, true), "advance");
  for (const [time, delta] of [
    [16, 120],
    [32, 80],
    [48, 40],
    [64, 20],
    [80, 8],
  ]) {
    assert.equal(gesture.move(time, delta, true), "hold");
  }
});

test("sparse momentum and renewed peaks cannot reopen the old 80ms Model guard", () => {
  const gesture = new StepperWheelGesture();
  assert.equal(gesture.move(0, 80, true), "advance");
  for (const [time, delta] of [
    [100, 40],
    [240, 15],
    [400, 100],
    [570, 120],
  ]) {
    assert.equal(gesture.move(time, delta, true), "hold");
  }
  assert.equal(gesture.move(751, 80, true), "advance");
});

test("light trackpad input accumulates intent before changing a card", () => {
  const gesture = new StepperWheelGesture();
  for (const [time, delta] of [
    [0, 8],
    [16, 16],
    [32, 20],
  ]) {
    assert.equal(gesture.move(time, delta, true), "hold");
  }
  assert.equal(gesture.move(48, 20, true), "advance");
});

test("entry consumes the incoming swipe until a fresh gesture", () => {
  const gesture = new StepperWheelGesture();
  gesture.consume(0, 4500);
  assert.equal(gesture.move(100, 300, true), "hold");
  assert.equal(gesture.move(260, 90, true), "hold");
  assert.equal(gesture.move(441, 90, true), "advance");
});

test("inertia cannot exit at the last card but a fresh outward gesture can", () => {
  const gesture = new StepperWheelGesture();
  assert.equal(gesture.move(0, 100, true), "advance");
  assert.equal(gesture.move(100, 2000, false), "hold");
  assert.equal(gesture.move(281, 100, false), "release");
  gesture.consume(400, -4500);
  assert.equal(gesture.move(500, -100, false), "hold");
  assert.equal(gesture.move(681, -100, false), "release");
});

test("deliberate reverse input can return to the previous card", () => {
  const gesture = new StepperWheelGesture();
  assert.equal(gesture.move(0, 100, true), "advance");
  assert.equal(gesture.move(100, -32, true), "hold");
  assert.equal(gesture.move(116, -32, true), "advance");
});

test("reading inside the card resets the outside gesture", () => {
  const gesture = new StepperWheelGesture();
  assert.equal(gesture.move(0, 100, true), "advance");
  gesture.reset();
  assert.equal(gesture.move(100, 80, true), "advance");
});
