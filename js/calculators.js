/* ==========================================================================
   FINANCE PULSE — CALCULATOR ENGINES (Compound Interest, Debt Payoff, Net Worth)
   ========================================================================== */

const Calculators = {
  // Compound Interest Calculation
  calculateCompoundInterest(principal, monthlyContribution, annualRate, years, compoundFrequency = 12) {
    const r = annualRate / 100;
    const n = compoundFrequency;
    const t = years;
    
    let balance = principal;
    let totalInvested = principal;
    const yearlyBreakdown = [];

    for (let yr = 1; yr <= t; yr++) {
      let interestEarnedThisYear = 0;
      for (let m = 1; m <= 12; m++) {
        const interestForMonth = balance * (r / n);
        balance += interestForMonth + monthlyContribution;
        interestEarnedThisYear += interestForMonth;
        totalInvested += monthlyContribution;
      }
      yearlyBreakdown.push({
        year: yr,
        totalBalance: Math.round(balance),
        totalInvested: Math.round(totalInvested),
        totalInterest: Math.round(balance - totalInvested)
      });
    }

    return {
      finalBalance: balance,
      totalInvested: totalInvested,
      totalInterest: balance - totalInvested,
      yearlyBreakdown
    };
  },

  // Debt Payoff (Snowball vs Avalanche)
  calculateDebtPayoff(debts, extraMonthlyPayment, strategy = 'avalanche') {
    // Clone debts to avoid mutation
    let list = debts.map(d => ({ ...d }));
    
    if (strategy === 'avalanche') {
      // Highest interest first
      list.sort((a, b) => b.rate - a.rate);
    } else {
      // Lowest balance first (Snowball)
      list.sort((a, b) => a.balance - b.balance);
    }

    let months = 0;
    let totalInterestPaid = 0;
    const maxMonths = 360; // 30-year cap safety

    while (list.some(d => d.balance > 0) && months < maxMonths) {
      months++;
      let extraAvailable = extraMonthlyPayment;

      for (let d of list) {
        if (d.balance <= 0) continue;

        // Interest for month
        const monthlyInterest = d.balance * (d.rate / 100 / 12);
        totalInterestPaid += monthlyInterest;
        d.balance += monthlyInterest;

        // Pay minimum
        let payment = Math.min(d.balance, d.minPayment);
        d.balance -= payment;

        // Apply extra payment to focus debt
        if (extraAvailable > 0 && d.balance > 0) {
          let extraPayment = Math.min(d.balance, extraAvailable);
          d.balance -= extraPayment;
          extraAvailable -= extraPayment;
        }
      }
    }

    return {
      totalMonths: months,
      years: (months / 12).toFixed(1),
      totalInterestPaid: totalInterestPaid
    };
  }
};
