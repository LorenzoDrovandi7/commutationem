describe("Currency Converter Tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  it("should display an error for invalid amount input", () => {
    cy.get("#opciones-from").select("USD");
    cy.get("#opciones-to").select("EUR");
    cy.get("#button-calculate").click();
    cy.get("#box-empty-text").should(
      "have.text",
      "Please enter a valid amount."
    );
  });

  it("should display an error when selecting the same currency", () => {
    cy.get("#input-amount").type("100");
    cy.get("#opciones-from").select("USD");
    cy.get("#opciones-to").select("USD");
    cy.get("#button-calculate").click();
    cy.get("#box-empty-text").should(
      "have.text",
      "The selected coins must be different."
    );
  });

  it("should perform a currency conversion", () => {
    cy.intercept("GET", "https://v6.exchangerate-api.com/v6/*/latest/USD", {
      statusCode: 200,
      body: {
        conversion_rates: { EUR: 0.85 },
      },
    }).as("getConversionRate");

    cy.get("#input-amount").type("100");
    cy.get("#opciones-from").select("USD");
    cy.get("#opciones-to").select("EUR");

    cy.get("#button-calculate").click();

    cy.wait("@getConversionRate");

    cy.get(".base-currency-amount").should("contain.text", "100 USD =");
    cy.get(".final-result-amount").should("contain.text", "85.00 EUR");
  });

  it("should toggle dark mode", () => {
    cy.get("body").should("not.have.class", "body-dark-mode");

    cy.get("#dark-mode-button").click();

    cy.get("body").should("have.class", "body-dark-mode");

    cy.get("#dark-mode-button").click();

    cy.get("body").should("not.have.class", "body-dark-mode");
  });
});
