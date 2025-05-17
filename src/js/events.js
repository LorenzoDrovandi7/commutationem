import { dom } from "./domElements.js";
import { appState } from "./appState.js";
import { verifyAmount, verifyCurrencies } from "./validators.js";
import { CurrencyData } from "./currencyData.js";
import { showResult, toggleDarkMode } from "./ui.js";

const apiKey = "c3eff3653369cb8b3f9f0eaf";

async function fetchConversionData() {
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${appState.baseCurrency}`);

  const data = await res.json();

  if (!res.ok || !data.conversion_rates) {
    handleError(data);
  }

  return data;
}

async function createCurrency() {
  const data = await fetchConversionData();
  return new CurrencyData(data.base_code, data.time_last_update_utc, data.conversion_rates);
}

async function updateAppState() {
  const currency = await createCurrency();
  appState.conversionResult = currency.getRate(appState.targetCurrency);
  appState.finalResult = currency.convert(appState.targetCurrency, dom.inputAmount.value);
}

function handleSuccess() {
  showResult();
  dom.boxEmptyText.textContent = "";
}

function handleError(data) {
  dom.boxEmptyText.textContent = "Something went wrong. Please try again.";
  console.error("API error:", data);
  throw new Error("Error during currency data fetch");
}

export async function executeConversion() {
  try {
    await updateAppState();
    handleSuccess();
  } catch (error) {}
}

export function setupEventListeners() {
  dom.btnConvert.onclick = handleConvertClick;
  dom.darkModeButton.onclick = handleDarkModeToggle;
}

function handleConvertClick() {
  const from = dom.inputFrom();
  const to = dom.inputTo();

  if (!verifyAmount() || !verifyCurrencies(from, to)) return;

  appState.baseCurrency = from;
  appState.targetCurrency = to;

  executeConversion();
}

function handleDarkModeToggle() {
  toggleDarkMode();
}
