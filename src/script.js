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
  if (
    inputAmount.value === "" ||
    isNaN(inputAmount.value) ||
    inputAmount.value <= 0
  ) {
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
      conversionResult = data.conversion_rates[targetCurrency];
      getResultByAmount();
    })
    .catch((error) => console.error("Error", error));
}

function getResultByAmount() {
  finalResult = conversionResult * inputAmount.value;
  showResult();
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
    document.getElementById("dark-mode-button").src =
      "src/images/dark-mode-active.png";
    document.body.classList.toggle("body-dark-mode");
    const container = document.querySelector(".container");
    if (container) {
      container.classList.toggle("container-dark-mode");
    }
    const innerContainer = document.querySelector(".inner-container");
    if (innerContainer) {
      innerContainer.classList.toggle("inner-container-dark-mode");
    }
    const amountContainer = document.querySelector(".amount-container");
    if (amountContainer) {
      amountContainer.classList.toggle("amount-container-dark-mode");
    }
    const amountInput = document.querySelector(".amount-input");
    if (amountInput) {
      amountInput.classList.toggle("amount-input-dark-mode");
    }
    const fromContainer = document.querySelector(".from-container");
    if (fromContainer) {
      fromContainer.classList.toggle("from-container-dark-mode");
    }
    const fromSelect = document.querySelector(".from-select");
    if (fromSelect) {
      fromSelect.classList.toggle("select-dark-mode");
    }
    const toContainer = document.querySelector(".to-container");
    if (toContainer) {
      toContainer.classList.toggle("to-container-dark-mode");
    }
    const toSelect = document.querySelector(".to-select");
    if (toSelect) {
      toSelect.classList.toggle("select-dark-mode");
    }
    const convertButton = document.querySelector(".convert-button");
    if (convertButton) {
      convertButton.classList.toggle("convert-button-dark-mode");
    }
  } else {
    darkModeActive = false;
    document.getElementById("dark-mode-button").src =
      "src/images/dark-mode-inactive.png";
    document.body.classList.remove("body-dark-mode");
    const container = document.querySelector(".container");
    if (container) {
      container.classList.remove("container-dark-mode");
    }
    const innerContainer = document.querySelector(".inner-container");
    if (innerContainer) {
      innerContainer.classList.remove("inner-container-dark-mode");
    }
    const amountContainer = document.querySelector(".amount-container");
    if (amountContainer) {
      amountContainer.classList.remove("amount-container-dark-mode");
    }
    const amountInput = document.querySelector(".amount-input");
    if (amountInput) {
      amountInput.classList.toggle("amount-input-dark-mode");
    }
    const fromContainer = document.querySelector(".from-container");
    if (fromContainer) {
      fromContainer.classList.remove("from-container-dark-mode");
    }
    const fromSelect = document.querySelector(".from-select");
    if (fromSelect) {
      fromSelect.classList.remove("select-dark-mode");
    }
    const toContainer = document.querySelector(".to-container");
    if (toContainer) {
      toContainer.classList.remove("to-container-dark-mode");
    }
    const toSelect = document.querySelector(".to-select");
    if (toSelect) {
      toSelect.classList.remove("select-dark-mode");
    }
    const convertButton = document.querySelector(".convert-button");
    if (convertButton) {
      convertButton.classList.remove("convert-button-dark-mode");
    }
  }
};
