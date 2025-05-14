import { appState } from "./appState.js";

describe("appState", () => {
  test("should have initial state values", () => {
    expect(appState.baseCurrency).toBe("");
    expect(appState.targetCurrency).toBe("");
    expect(appState.conversionResult).toBe(0);
    expect(appState.finalResult).toBe(0);
    expect(appState.darkModeActive).toBe(false);
  });

  test("should update base currency", () => {
    appState.baseCurrency = "USD";
    expect(appState.baseCurrency).toBe("USD");
  });

  test("should update target currency", () => {
    appState.targetCurrency = "EUR";
    expect(appState.targetCurrency).toBe("EUR");
  });

  test("should update conversion result", () => {
    appState.conversionResult = 100;
    expect(appState.conversionResult).toBe(100);
  });

  test("should update final result", () => {
    appState.finalResult = 200;
    expect(appState.finalResult).toBe(200);
  });

  test("should toggle dark mode", () => {
    appState.darkModeActive = true;
    expect(appState.darkModeActive).toBe(true);
  });
});
