import { dom } from "./domElements.js";
import { appState } from "./appState.js";

export function showResult() {
  dom.resultBox.innerHTML = "";
  const base = document.createElement("p");
  const result = document.createElement("p");
  base.className = "base-currency-amount";
  result.className = "final-result-amount";
  base.innerHTML = `${dom.inputAmount.value} ${appState.baseCurrency} =`;
  result.innerHTML = `${appState.finalResult.toFixed(2)} ${appState.targetCurrency}`;
  dom.resultBox.appendChild(base);
  dom.resultBox.appendChild(result);
}

export function toggleDarkMode() {
  appState.darkModeActive = !appState.darkModeActive;
  dom.darkModeButton.src = appState.darkModeActive
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
}
