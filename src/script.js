const btnConvert = document.getElementById("button-calculate");
let inputAmount = document.getElementById("input-amount");
let inputFrom = document.getElementById("opciones-from").value;
let inputTo = document.getElementById("opciones-to").value;
let resultBox = document.getElementById("results-box");
let darkMode = document.getElementById("dark-mode-button");
let boxEmptyText = document.getElementById("box-empty-text");
const apiKey = "c3eff3653369cb8b3f9f0eaf";
let baseCurrency = "";
let targetCurrency = "";
let conversionResult = 0;
let finalResult = 0;
let darkModeActive = false;
let invalidNumber = false;
let sameCurrency = false;

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
    sameCurrency = true;
    ("");
  } else {
    sameCurrency = false;
    boxEmptyText.textContent = "";
  }
}

function verifyAmount() {
  if (inputAmount.value === "" || isNaN(inputAmount.value) || inputAmount.value <= 0) {
    boxEmptyText.textContent = "Please enter a valid amount.";
    invalidNumber = true;
  } else {
    invalidNumber = false;
    boxEmptyText.textContent = "";
  }
}

function refreshInputResults() {
  inputFrom = document.getElementById("opciones-from").value;
  inputTo = document.getElementById("opciones-to").value;
  inputAmount = document.getElementById("input-amount");
}

function refreshCurrencies() {
  baseCurrency = inputFrom;
  targetCurrency = inputTo;
}

function excecuteConversion() {
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      const currencyData = new CurrencyData(data.base_code, data.time_last_update_utc, data.conversion_rates);
      conversionResult = currencyData.getRate(targetCurrency);
      finalResult = currencyData.convert(targetCurrency, inputAmount.value);
      showResult();
    })
    .catch((error) => console.error("Error", error));
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
  baseCurrencyAmount.innerHTML = `${inputAmount.value} ${baseCurrency} =`;
  finalResultAmount.innerHTML = `${finalResult.toFixed(2)} ${targetCurrency}`;
  resultBox.appendChild(baseCurrencyAmount);
  resultBox.appendChild(finalResultAmount);
}

btnConvert.onclick = () => {
  verifyAmount();
  if (invalidNumber === true) {
    return;
  } else {
    refreshInputResults();
    verifyCurrencies();
    if (sameCurrency === true) {
      return;
    } else {
      refreshCurrencies();
      excecuteConversion();
    }
  }
};

darkMode.onclick = () => {
  if (darkModeActive === false) {
    darkModeActive = true;
    document.getElementById("dark-mode-button").src = "src/images/dark-mode-active.png";
    document.body.classList.toggle("body-dark-mode");
    const container = document.querySelector(".container");
    if (container) {
      container.classList.toggle("container-dark-mode");
    }
    const innerContainer = document.querySelector(".inner-container");
    if (innerContainer) {
      innerContainer.classList.toggle("inner-container-dark-mode");
    }
    const inputAmount = document.getElementById("input-amount");
    if (inputAmount) {
      inputAmount.classList.toggle("input-dark-mode");
    }
    const opcionesFrom = document.getElementById("opciones-from");
    if (opcionesFrom) {
      opcionesFrom.classList.toggle("select-dark-mode");
    }
    const opcionesTo = document.getElementById("opciones-to");
    if (opcionesTo) {
      opcionesTo.classList.toggle("select-dark-mode");
    }
    const button = document.getElementById("button-calculate");
    if (button) {
      button.classList.toggle("button-dark-mode");
    }
    const resultsBox = document.getElementById("results-box");
    if (resultsBox) {
      resultsBox.classList.toggle("results-box-dark-mode");
    }
  } else {
    darkModeActive = false;
    document.getElementById("dark-mode-button").src = "src/images/dark-mode-inactive.png";
    document.body.classList.remove("body-dark-mode");
    const container = document.querySelector(".container");
    if (container) {
      container.classList.remove("container-dark-mode");
    }
    const innerContainer = document.querySelector(".inner-container");
    if (innerContainer) {
      innerContainer.classList.remove("inner-container-dark-mode");
    }
    const inputAmount = document.getElementById("input-amount");
    if (inputAmount) {
      inputAmount.classList.remove("input-dark-mode");
    }
    const opcionesFrom = document.getElementById("opciones-from");
    if (opcionesFrom) {
      opcionesFrom.classList.remove("select-dark-mode");
    }
    const opcionesTo = document.getElementById("opciones-to");
    if (opcionesTo) {
      opcionesTo.classList.remove("select-dark-mode");
    }
    const button = document.getElementById("button-calculate");
    if (button) {
      button.classList.remove("button-dark-mode");
    }
    const resultsBox = document.getElementById("results-box");
    if (resultsBox) {
      resultsBox.classList.remove("results-box-dark-mode");
    }
  }
};
