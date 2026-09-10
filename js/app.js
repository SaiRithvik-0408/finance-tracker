/* ==========================================================================
   FINANCE PULSE — CORE APPLICATION ENGINE & LOCAL STORAGE MANAGER
   ========================================================================== */

const STORAGE_KEYS = {
  TRANSACTIONS: 'fp_transactions',
  BUDGETS: 'fp_budgets',
  SAVINGS: 'fp_savings',
  DEBTS: 'fp_debts',
  INVESTMENTS: 'fp_investments',
  NETWORTH: 'fp_networth',
  SETTINGS: 'fp_settings'
};

// Seed sample data if first time
function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
    const sampleTransactions = [
      { id: '1', description: 'Tech Salary', amount: 5200, category: 'Income', type: 'income', date: '2026-09-01' },
      { id: '2', description: 'Apartment Rent', amount: 1400, category: 'Housing', type: 'expense', date: '2026-09-02' },
      { id: '3', description: 'Whole Foods Grocery', amount: 185.50, category: 'Food', type: 'expense', date: '2026-09-04' },
      { id: '4', description: 'Stock Dividend', amount: 140.20, category: 'Income', type: 'income', date: '2026-09-05' },
      { id: '5', description: 'Electric & Gas Bill', amount: 110, category: 'Utilities', type: 'expense', date: '2026-09-06' },
      { id: '6', description: 'Gym Membership', amount: 45, category: 'Health', type: 'expense', date: '2026-09-07' },
      { id: '7', description: 'Netflix & Spotify', amount: 28, category: 'Entertainment', type: 'expense', date: '2026-09-08' }
    ];
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(sampleTransactions));
  }

  if (!localStorage.getItem(STORAGE_KEYS.BUDGETS)) {
    const sampleBudgets = {
      Housing: 1500,
      Food: 600,
      Utilities: 200,
      Entertainment: 150,
      Health: 100,
      Transport: 300,
      Shopping: 250
    };
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(sampleBudgets));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SAVINGS)) {
    const sampleSavings = [
      { id: '1', name: 'Emergency Fund', target: 10000, current: 6400, icon: '🛡️' },
      { id: '2', name: 'Vacation to Japan', target: 4000, current: 2800, icon: '✈️' },
      { id: '3', name: 'New Mac Studio', target: 2500, current: 1900, icon: '💻' }
    ];
    localStorage.setItem(STORAGE_KEYS.SAVINGS, JSON.stringify(sampleSavings));
  }

  if (!localStorage.getItem(STORAGE_KEYS.DEBTS)) {
    const sampleDebts = [
      { id: '1', name: 'Car Loan', balance: 8500, rate: 4.5, minPayment: 250 },
      { id: '2', name: 'Student Loan', balance: 14200, rate: 3.8, minPayment: 180 },
      { id: '3', name: 'Credit Card', balance: 1200, rate: 18.9, minPayment: 75 }
    ];
    localStorage.setItem(STORAGE_KEYS.DEBTS, JSON.stringify(sampleDebts));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ currency: '$', theme: 'dark' }));
  }
}

// Data Helpers
const DataManager = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || null;
    } catch {
      return null;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  formatCurrency(val, symbol = '$') {
    const num = Number(val) || 0;
    return symbol + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
};

// Theme Controller
function setupTheme() {
  const settings = DataManager.get(STORAGE_KEYS.SETTINGS) || { theme: 'dark' };
  document.documentElement.setAttribute('data-theme', settings.theme);
  
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = settings.theme === 'dark' ? '☀️' : '🌙';
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      toggleBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
      settings.theme = newTheme;
      DataManager.set(STORAGE_KEYS.SETTINGS, settings);
    });
  }
}

// Global Nav Active Link Highlight
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  setupTheme();
  highlightActiveNav();
});
