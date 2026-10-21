import assert from "node:assert/strict";
import test from "node:test";
import { StepperGutterGesture } from "../src/components/stepperGesture.ts";

test("continuous momentum cannot advance a second card", () => {
  const gesture = new StepperGutterGesture();
  assert.equal(gesture.start(0, 100, 2), 2);
  gesture.consume(0);
  for (const [time, delta] of [
    [16, 120],
    [32, 80],
    [48, 40],
    [64, 20],
    [80, 8],
  ]) {
    assert.equal(gesture.start(time, delta, 3), null);
  }
  assert.equal(gesture.start(300, 30, 3), 3);
});

test("light input is not discarded before the page reaches a step boundary", () => {
  const gesture = new StepperGutterGesture();
  assert.equal(gesture.start(0, 4, 0), 0);
  assert.equal(gesture.start(16, 5, 0), 0);
  assert.equal(gesture.start(300, 4, 0), 0);
  assert.equal(gesture.start(600, 5, 0), 0);
});

test("separate mouse-wheel notches do not require a long pause", () => {
  const gesture = new StepperGutterGesture();
  assert.equal(gesture.start(0, 100, 2), 2);
  gesture.consume(0);
  assert.equal(gesture.start(100, 100, 3), 3);
});

function coast(gesture) {
  assert.equal(gesture.start(0, 80, 2), 2);
  gesture.consume(0);
  for (const [time, delta] of [
    [16, 40],
    [32, 20],
    [48, 10],
    [64, 6],
    [80, 3],
    [96, 2],
    [128, 1],
  ]) {
    assert.equal(gesture.start(time, delta, 3), null);
  }
}

test("a sustained new push can restart while the old momentum is tailing off", () => {
  const gesture = new StepperGutterGesture();
  coast(gesture);
  assert.equal(gesture.start(144, 16, 3), null);
  assert.equal(gesture.start(160, 18, 3), 3);
});

test("an isolated momentum spike does not restart the gesture", () => {
  const gesture = new StepperGutterGesture();
  coast(gesture);
  assert.equal(gesture.start(144, 16, 3), null);
  assert.equal(gesture.start(160, 1, 3), null);
  assert.equal(gesture.start(176, 1, 3), null);
});

test("small rebound events are held, but deliberate reverse input is accepted", () => {
  const gesture = new StepperGutterGesture();
  coast(gesture);
  assert.equal(gesture.start(144, -1, 3), null);
  assert.equal(gesture.start(160, 1, 3), null);
  assert.equal(gesture.start(176, -8, 3), null);
  assert.equal(gesture.start(192, -8, 3), 3);
});

test("entering a reading card resets the gutter gesture", () => {
  const gesture = new StepperGutterGesture();
  coast(gesture);
  gesture.reset();
  assert.equal(gesture.start(144, 8, 3), 3);
});
