/* ==========================================================================
   FINANCE PULSE — CURRENCY CONVERTER API INTEGRATION
   ========================================================================== */

const CurrencyAPI = {
  // Exchange rates fallback + live fetch from free API
  fallbackRates: {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.78,
    CAD: 1.36,
    AUD: 1.52,
    JPY: 154.5,
    INR: 83.9,
    CHF: 0.90,
    CNY: 7.24,
    BRL: 5.65
  },

  async getRates(base = 'USD') {
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      if (res.ok) {
        const data = await res.json();
        return data.rates;
      }
    } catch (e) {
      console.warn('Using fallback currency rates due to network state.');
    }
    return this.fallbackRates;
  },

  convert(amount, fromRate, toRate) {
    return (amount / fromRate) * toRate;
  }
};
