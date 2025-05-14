import { CurrencyData } from "./currencyData.js";

describe("CurrencyData", () => {
  const rates = { USD: 1, EUR: 0.9, GBP: 0.8 };
  const currency = new CurrencyData("USD", "2025-01-01", rates);

  test("should return correct rate", () => {
    expect(currency.getRate("EUR")).toBe(0.9);
    expect(currency.getRate("INR")).toBe(null);
  });

  test("should convert correctly", () => {
    expect(currency.convert("EUR", 100)).toBe(90);
  });

  test("should return null for invalid amount", () => {
    expect(currency.convert("EUR", "abc")).toBe(null);
  });
});
