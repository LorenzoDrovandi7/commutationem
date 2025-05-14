import { dom } from "./domElements.js";

export function verifyAmount() {
  const value = dom.inputAmount.value;
  if (value === "" || isNaN(value) || value <= 0) {
    dom.boxEmptyText.textContent = "Please enter a valid amount.";
    return false;
  }
  dom.boxEmptyText.textContent = "";
  return true;
}

export function verifyCurrencies(from, to) {
  if (from === to) {
    dom.boxEmptyText.textContent = "The selected coins must be different.";
    return false;
  }
  dom.boxEmptyText.textContent = "";
  return true;
}
