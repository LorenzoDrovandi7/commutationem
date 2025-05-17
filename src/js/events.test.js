/**
 * @jest-environment jsdom
 */

import { executeConversion } from "./events.js";

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});
