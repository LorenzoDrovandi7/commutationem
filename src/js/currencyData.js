export class CurrencyData {
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
