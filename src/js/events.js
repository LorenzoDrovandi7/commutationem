import { dom } from "./domElements.js";
import { appState } from "./appState.js";
import { verifyAmount, verifyCurrencies } from "./validators.js";
import { CurrencyData } from "./currencyData.js";
import { showResult, toggleDarkMode } from "./ui.js";

const apiKey = "c3eff3653369cb8b3f9f0eaf";

function executeConversion() {
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${appState.baseCurrency}`)
    .then((res) => res.json())
    .then((data) => {
      const currency = new CurrencyData(data.base_code, data.time_last_update_utc, data.conversion_rates);
      appState.conversionResult = currency.getRate(appState.targetCurrency);
      appState.finalResult = currency.convert(appState.targetCurrency, dom.inputAmount.value);
      showResult();
    })
    .catch((err) => {
      console.error("Error", err);
      dom.boxEmptyText.textContent = "Something went wrong. Please try again.";
    });
}

export function setupEventListeners() {
  dom.btnConvert.onclick = () => {
    const from = dom.inputFrom();
    const to = dom.inputTo();

    if (!verifyAmount() || !verifyCurrencies(from, to)) return;

    appState.baseCurrency = from;
    appState.targetCurrency = to;

    executeConversion();
  };

  dom.darkModeButton.onclick = toggleDarkMode;
}
