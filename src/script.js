const btnConvert = document.getElementById("button-calculate");
let inputAmount = document.getElementById("input-amount");
let resultBox = document.getElementById("results-box");
let darkMode = document.getElementById("dark-mode-button");
let boxEmptyText = document.getElementById("box-empty-text");
const apiKey = "c3eff3653369cb8b3f9f0eaf";
const appState = {
  baseCurrency: "",
  targetCurrency: "",
  conversionResult: 0,
  finalResult: 0,
  darkModeActive: false,
};

class CurrencyData {
  constructor(base, date, rates) {
    this.base = base;
    this.rates = rates;
  }

  getRate(toCurrency) {
    return this.rates[toCurrency] || null;
  }

  convert(toCurrency, amount) {
    const rate = this.getRate(toCurrency);
    if (!rate || isNaN(amount)) return null;
    return rate * amount;
  }
}

function verifyCurrencies() {
  if (inputFrom === inputTo) {
    boxEmptyText.textContent = "The selected coins must be different.";
    return false;
  } else {
    boxEmptyText.textContent = "";
    return true;
  }
}

function verifyAmount() {
  if (inputAmount.value === "" || isNaN(inputAmount.value) || inputAmount.value <= 0) {
    boxEmptyText.textContent = "Please enter a valid amount.";
    return false;
  } else {
    boxEmptyText.textContent = "";
    return true;
  }
}

function refreshInputResults() {
  inputFrom = document.getElementById("opciones-from").value;
  inputTo = document.getElementById("opciones-to").value;
  inputAmount = document.getElementById("input-amount");
}

function refreshCurrencies() {
  appState.baseCurrency = inputFrom;
  appState.targetCurrency = inputTo;
}

function executeConversion() {
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${appState.baseCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      const currencyData = new CurrencyData(data.base_code, data.time_last_update_utc, data.conversion_rates);
      conversionResult = currencyData.getRate(appState.targetCurrency);
      finalResult = currencyData.convert(appState.targetCurrency, inputAmount.value);
      showResult();
    })
    .catch((error) => {
      console.error("Error", error);
      boxEmptyText.textContent = "Something went wrong. Please try again.";
    });
}

function cleanResultsBox() {
  resultBox.innerHTML = "";
}

function showResult() {
  cleanResultsBox();
  const baseCurrencyAmount = document.createElement("p");
  const finalResultAmount = document.createElement("p");
  baseCurrencyAmount.className = "base-currency-amount";
  finalResultAmount.className = "final-result-amount";
  baseCurrencyAmount.innerHTML = `${inputAmount.value} ${appState.baseCurrency} =`;
  finalResultAmount.innerHTML = `${finalResult.toFixed(2)} ${appState.targetCurrency}`;
  resultBox.appendChild(baseCurrencyAmount);
  resultBox.appendChild(finalResultAmount);
}

btnConvert.onclick = () => {
  refreshInputResults();
  if (!verifyAmount()) return;
  if (!verifyCurrencies()) return;
  refreshCurrencies();
  executeConversion();
};

darkMode.onclick = () => {
  appState.darkModeActive = !appState.darkModeActive;
  document.getElementById("dark-mode-button").src = appState.darkModeActive
    ? "src/images/dark-mode-active.png"
    : "src/images/dark-mode-inactive.png";

  const modeClasses = [
    { selector: "body", class: "body-dark-mode" },
    { selector: ".container", class: "container-dark-mode" },
    { selector: ".inner-container", class: "inner-container-dark-mode" },
    { selector: "#input-amount", class: "input-dark-mode" },
    { selector: "#opciones-from", class: "select-dark-mode" },
    { selector: "#opciones-to", class: "select-dark-mode" },
    { selector: "#button-calculate", class: "button-dark-mode" },
    { selector: "#results-box", class: "results-box-dark-mode" },
  ];

  modeClasses.forEach(({ selector, class: cls }) => {
    const el = document.querySelector(selector);
    if (el) el.classList.toggle(cls);
  });
};
