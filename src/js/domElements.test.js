/**
 * @jest-environment jsdom
 */

import { dom } from "./domElements.js";

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});

beforeEach(() => {
  document.body.innerHTML = `
    <button id="button-calculate"></button>
    <input id="input-amount" />
    <div id="results-box"></div>
    <button id="dark-mode-button"></button>
    <div id="box-empty-text"></div>
    <select id="opciones-from"><option value="USD" selected>USD</option></select>
    <select id="opciones-to"><option value="EUR" selected>EUR</option></select>
  `;
});

describe("dom", () => {
  test("should correctly reference DOM elements", () => {
    expect(document.getElementById("button-calculate")).not.toBeNull();
    expect(document.getElementById("input-amount")).not.toBeNull();
    expect(document.getElementById("results-box")).not.toBeNull();
    expect(document.getElementById("dark-mode-button")).not.toBeNull();
  });

  test("should return selected values from selects", () => {
    expect(dom.inputFrom()).toBe("USD");
    expect(dom.inputTo()).toBe("EUR");
  });
});
