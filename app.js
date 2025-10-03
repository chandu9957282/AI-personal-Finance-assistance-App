// Application Data
const appData = {
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "totalBalance": 15750.50,
      "monthlyIncome": 5500.00,
      "monthlyExpenses": 3200.00,
      "savingsGoal": 25000.00,
      "currentSavings": 8500.00
    }
  ],
  "accounts": [
    {
      "id": 1,
      "type": "Checking",
      "name": "Main Checking",
      "balance": 3250.75,
      "accountNumber": "****1234"
    },
    {
      "id": 2,
      "type": "Savings",
      "name": "Emergency Fund",
      "balance": 8500.00,
      "accountNumber": "****5678"
    },
    {
      "id": 3,
      "type": "Investment",
      "name": "Portfolio",
      "balance": 4000.25,
      "accountNumber": "****9012"
    }
  ],
  "transactions": [
    {
      "id": 1,
      "date": "2025-08-09",
      "description": "Grocery Store",
      "amount": -85.50,
      "category": "Food & Dining",
      "account": "Checking"
    },
    {
      "id": 2,
      "date": "2025-08-08",
      "description": "Salary Deposit",
      "amount": 2750.00,
      "category": "Income",
      "account": "Checking"
    },
    {
      "id": 3,
      "date": "2025-08-07",
      "description": "Electric Bill",
      "amount": -120.00,
      "category": "Utilities",
      "account": "Checking"
    },
    {
      "id": 4,
      "date": "2025-08-06",
      "description": "Gas Station",
      "amount": -45.20,
      "category": "Transportation",
      "account": "Checking"
    },
    {
      "id": 5,
      "date": "2025-08-05",
      "description": "Online Shopping",
      "amount": -199.99,
      "category": "Shopping",
      "account": "Checking"
    }
  ],
  "budgets": [
    {
      "category": "Food & Dining",
      "budgeted": 600.00,
      "spent": 425.50,
      "remaining": 174.50
    },
    {
      "category": "Transportation",
      "budgeted": 300.00,
      "spent": 245.20,
      "remaining": 54.80
    },
    {
      "category": "Utilities",
      "budgeted": 200.00,
      "spent": 175.00,
      "remaining": 25.00
    },
    {
      "category": "Shopping",
      "budgeted": 400.00,
      "spent": 350.99,
      "remaining": 49.01
    }
  ],
  "investments": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "shares": 10,
      "price": 180.50,
      "value": 1805.00,
      "change": 2.5
    },
    {
      "symbol": "GOOGL",
      "name": "Alphabet Inc.",
      "shares": 5,
      "price": 135.20,
      "value": 676.00,
      "change": -1.2
    },
    {
      "symbol": "MSFT",
      "name": "Microsoft Corp.",
      "shares": 8,
      "price": 340.75,
      "value": 2726.00,
      "change": 0.8
    }
  ],
  "bills": [
    {
      "id": 1,
      "name": "Rent",
      "amount": 1200.00,
      "dueDate": "2025-08-15",
      "status": "pending"
    },
    {
      "id": 2,
      "name": "Internet",
      "amount": 79.99,
      "dueDate": "2025-08-12",
      "status": "pending"
    },
    {
      "id": 3,
      "name": "Phone",
      "amount": 65.00,
      "dueDate": "2025-08-18",
      "status": "pending"
    }
  ],
  "chatResponses": {
    "balance": "Your current total balance across all accounts is $15,750.50. Your checking account has $3,250.75, savings has $8,500.00, and investments are worth $4,000.25.",
    "spending": "This month you've spent $3,200 out of your $5,500 income. Your top spending categories are: Food & Dining ($425.50), Shopping ($350.99), and Transportation ($245.20).",
    "budget": "You're doing well with your budget! You have $174.50 remaining for Food & Dining, $54.80 for Transportation, and $25.00 for Utilities. Consider reducing shopping expenses as you only have $49.01 left.",
    "savings": "Great progress on your savings goal! You've saved $8,500 out of your $25,000 target (34% complete). At your current rate, you could reach your goal in about 18 months.",
    "investments": "Your investment portfolio is worth $4,000.25. Apple is performing well (+2.5%), Microsoft is stable (+0.8%), but Google is down (-1.2%). Consider diversifying with index funds for long-term growth.",
    "bills": "You have 3 upcoming bills: Rent ($1,200) due Aug 15th, Internet ($79.99) due Aug 12th, and Phone ($65) due Aug 18th. Total: $1,344.99.",
    "help": "I can help you with: checking balances, analyzing spending, setting budgets, tracking investments, managing bills, setting financial goals, and providing personalized advice. What would you like to know?"
  }
};

// Global variables
let currentUser = appData.users[0];
let charts = {};

// Initialize application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initializeApp();
});

function initializeApp() {
  console.log('Initializing app...');
  setupEventListeners();
  showLoginScreen();
}

function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Login functionality - ensure elements exist before adding listeners
  const loginBtn = document.getElementById('loginBtn');
  const biometricBtn = document.getElementById('biometricBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Login button clicked');
      handleLogin();
    });
  }

  if (biometricBtn) {
    biometricBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Biometric button clicked');
      handleBiometricLogin();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleLogout();
    });
  }

  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = e.target.dataset.section;
      console.log('Navigating to:', section);
      navigateToSection(section);
    });
  });

  // AI Chatbot
  const sendChatBtn = document.getElementById('sendChatBtn');
  const chatInput = document.getElementById('chatInput');
  
  if (sendChatBtn) {
    sendChatBtn.addEventListener('click', sendChatMessage);
  }
  
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }

  // Quick questions
  document.querySelectorAll('.quick-q').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const query = e.target.dataset.query;
      handleQuickQuestion(query);
    });
  });

  // Expense tracking
  const addExpenseBtn = document.getElementById('addExpenseBtn');
  const scanReceiptBtn = document.getElementById('scanReceiptBtn');
  const saveExpenseBtn = document.getElementById('saveExpenseBtn');
  const cancelExpenseBtn = document.getElementById('cancelExpenseBtn');

  if (addExpenseBtn) {
    addExpenseBtn.addEventListener('click', showAddExpenseModal);
  }
  if (scanReceiptBtn) {
    scanReceiptBtn.addEventListener('click', simulateReceiptScan);
  }
  if (saveExpenseBtn) {
    saveExpenseBtn.addEventListener('click', saveExpense);
  }
  if (cancelExpenseBtn) {
    cancelExpenseBtn.addEventListener('click', hideAddExpenseModal);
  }

  // Modal handling
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      hideModal(modal);
    });
  });

  // Budget management
  const setBudgetBtn = document.getElementById('setBudgetBtn');
  if (setBudgetBtn) {
    setBudgetBtn.addEventListener('click', () => {
      alert('Budget setting feature would open a modal to create new budgets');
    });
  }

  // Bills management
  const addBillBtn = document.getElementById('addBillBtn');
  if (addBillBtn) {
    addBillBtn.addEventListener('click', () => {
      alert('Add bill feature would open a modal to add new bills');
    });
  }

  // Reports
  const downloadReportBtn = document.getElementById('downloadReportBtn');
  if (downloadReportBtn) {
    downloadReportBtn.addEventListener('click', downloadReport);
  }

  // Click outside modal to close
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      hideModal(e.target);
    }
  });
}

// Authentication functions
function showLoginScreen() {
  console.log('Showing login screen');
  const loginScreen = document.getElementById('loginScreen');
  const mainApp = document.getElementById('mainApp');
  
  if (loginScreen) {
    loginScreen.style.display = 'flex';
  }
  if (mainApp) {
    mainApp.classList.add('hidden');
  }
}

function handleLogin() {
  console.log('Handling login...');
  // Get form values
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  const email = emailInput ? emailInput.value : '';
  const password = passwordInput ? passwordInput.value : '';

  console.log('Email:', email, 'Password:', password);

  // Simple validation - in demo, just check if fields have values
  if (email && password) {
    console.log('Credentials valid, proceeding...');
    // Simulate 2FA
    alert('Two-factor authentication code sent to your device');
    
    // Use shorter timeout for demo
    setTimeout(() => {
      console.log('Showing main app...');
      showMainApp();
    }, 500);
  } else {
    alert('Please enter both email and password');
  }
}

function handleBiometricLogin() {
  console.log('Handling biometric login...');
  alert('Place your finger on the sensor...');
  setTimeout(() => {
    alert('Biometric authentication successful!');
    showMainApp();
  }, 1000);
}

function showMainApp() {
  console.log('Showing main application...');
  const loginScreen = document.getElementById('loginScreen');
  const mainApp = document.getElementById('mainApp');
  
  if (loginScreen) {
    loginScreen.style.display = 'none';
  }
  if (mainApp) {
    mainApp.classList.remove('hidden');
  }
  
  // Initialize dashboard and populate data
  setTimeout(() => {
    navigateToSection('dashboard');
    populateTransactions();
    populateBudgets();
    populateInvestments();
    populateBills();
    
    // Initialize charts after a short delay to ensure elements are visible
    setTimeout(initializeCharts, 200);
  }, 100);
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    clearCharts();
    showLoginScreen();
  }
}

// Navigation
function navigateToSection(sectionName) {
  console.log('Navigating to section:', sectionName);
  
  // Update navigation active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  const activeNavLink = document.querySelector(`[data-section="${sectionName}"]`);
  if (activeNavLink) {
    activeNavLink.classList.add('active');
  }

  // Show selected section
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Initialize section-specific content
  if (sectionName === 'dashboard' && Object.keys(charts).length === 0) {
    setTimeout(initializeCharts, 100);
  }
}

// AI Chatbot functions
function sendChatMessage() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  
  const message = input.value.trim();
  
  if (!message) return;

  addChatMessage(message, 'user');
  input.value = '';

  // Simulate AI processing
  setTimeout(() => {
    const response = generateAIResponse(message);
    addChatMessage(response, 'ai');
  }, 1000);
}

function handleQuickQuestion(query) {
  const response = appData.chatResponses[query] || appData.chatResponses.help;
  addChatMessage(response, 'ai');
}

function addChatMessage(message, sender) {
  const chatContainer = document.getElementById('chatContainer');
  if (!chatContainer) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}-message`;
  
  messageDiv.innerHTML = `
    <div class="message-content">${message}</div>
  `;
  
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('balance')) {
    return appData.chatResponses.balance;
  } else if (lowerMessage.includes('spend') || lowerMessage.includes('expense')) {
    return appData.chatResponses.spending;
  } else if (lowerMessage.includes('budget')) {
    return appData.chatResponses.budget;
  } else if (lowerMessage.includes('saving') || lowerMessage.includes('goal')) {
    return appData.chatResponses.savings;
  } else if (lowerMessage.includes('invest')) {
    return appData.chatResponses.investments;
  } else if (lowerMessage.includes('bill')) {
    return appData.chatResponses.bills;
  } else {
    return "I understand you're asking about your finances. Could you be more specific? I can help with balances, spending, budgets, investments, bills, or savings goals.";
  }
}

// Data population functions
function populateTransactions() {
  const container = document.getElementById('transactionsList');
  if (!container) return;

  container.innerHTML = appData.transactions.map(transaction => `
    <div class="transaction-item">
      <div class="transaction-info">
        <h4>${transaction.description}</h4>
        <p>${formatDate(transaction.date)} • ${transaction.category}</p>
      </div>
      <div class="transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}">
        ${formatCurrency(transaction.amount)}
      </div>
    </div>
  `).join('');
}

function populateBudgets() {
  const container = document.getElementById('budgetOverview');
  if (!container) return;

  container.innerHTML = appData.budgets.map(budget => {
    const percentage = (budget.spent / budget.budgeted) * 100;
    const status = percentage > 90 ? 'over-budget' : percentage > 75 ? 'warning' : 'on-track';
    const statusText = percentage > 90 ? 'Over Budget' : percentage > 75 ? 'Nearly Exceeded' : 'On Track';

    return `
      <div class="budget-item">
        <div class="budget-header">
          <h4>${budget.category}</h4>
          <span class="budget-status ${status}">${statusText}</span>
        </div>
        <div class="budget-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${Math.min(percentage, 100)}%"></div>
          </div>
        </div>
        <div class="budget-amounts">
          <span>Spent: ${formatCurrency(budget.spent)}</span>
          <span>Remaining: ${formatCurrency(budget.remaining)}</span>
        </div>
      </div>
    `;
  }).join('');
}

function populateInvestments() {
  const container = document.getElementById('investmentsList');
  if (!container) return;

  container.innerHTML = `
    <div class="investments-grid">
      ${appData.investments.map(investment => `
        <div class="investment-item">
          <div class="investment-header">
            <span class="investment-symbol">${investment.symbol}</span>
            <span class="investment-change ${investment.change > 0 ? 'positive' : 'negative'}">
              ${investment.change > 0 ? '+' : ''}${investment.change}%
            </span>
          </div>
          <div class="investment-name">${investment.name}</div>
          <div class="investment-details">
            <span>${investment.shares} shares @ ${formatCurrency(investment.price)}</span>
            <span class="investment-value">${formatCurrency(investment.value)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function populateBills() {
  const container = document.getElementById('billsList');
  if (!container) return;

  container.innerHTML = `
    <div class="bills-grid">
      ${appData.bills.map(bill => `
        <div class="bill-item">
          <div class="bill-header">
            <span class="bill-name">${bill.name}</span>
            <span class="bill-amount">${formatCurrency(bill.amount)}</span>
          </div>
          <div class="bill-due">Due: ${formatDate(bill.dueDate)}</div>
          <div class="bill-actions">
            <button class="btn btn--primary btn--sm" onclick="payBill(${bill.id})">Pay Now</button>
            <button class="btn btn--outline btn--sm" onclick="scheduleBill(${bill.id})">Schedule</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Chart initialization
function initializeCharts() {
  console.log('Initializing charts...');
  try {
    initializeSpendingChart();
    initializeBudgetChart();
    initializePortfolioChart();
    initializeTrendsChart();
  } catch (error) {
    console.error('Error initializing charts:', error);
  }
}

function initializeSpendingChart() {
  const ctx = document.getElementById('spendingChart');
  if (!ctx) {
    console.log('Spending chart canvas not found');
    return;
  }

  const categories = [...new Set(appData.transactions.map(t => t.category))].filter(c => c !== 'Income');
  const amounts = categories.map(category => 
    Math.abs(appData.transactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0))
  );

  charts.spendingChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function initializeBudgetChart() {
  const ctx = document.getElementById('budgetChart');
  if (!ctx) return;

  charts.budgetChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: appData.budgets.map(b => b.category),
      datasets: [
        {
          label: 'Budgeted',
          data: appData.budgets.map(b => b.budgeted),
          backgroundColor: '#1FB8CD'
        },
        {
          label: 'Spent',
          data: appData.budgets.map(b => b.spent),
          backgroundColor: '#B4413C'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value;
            }
          }
        }
      }
    }
  });
}

function initializePortfolioChart() {
  const ctx = document.getElementById('portfolioChart');
  if (!ctx) return;

  charts.portfolioChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: appData.investments.map(i => i.symbol),
      datasets: [{
        data: appData.investments.map(i => i.value),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function initializeTrendsChart() {
  const ctx = document.getElementById('trendsChart');
  if (!ctx) return;

  charts.trendsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Spending',
        data: [2800, 3200, 2900, 3100, 3300, 3200],
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value;
            }
          }
        }
      }
    }
  });
}

function clearCharts() {
  Object.values(charts).forEach(chart => {
    if (chart) chart.destroy();
  });
  charts = {};
}

// Expense tracking functions
function showAddExpenseModal() {
  const modal = document.getElementById('addExpenseModal');
  showModal(modal);
}

function hideAddExpenseModal() {
  const modal = document.getElementById('addExpenseModal');
  hideModal(modal);
}

function saveExpense() {
  const description = document.getElementById('expenseDescription').value;
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const category = document.getElementById('expenseCategory').value;

  if (!description || !amount || !category) {
    alert('Please fill in all fields');
    return;
  }

  // Add to transactions (in real app, would save to backend)
  const newTransaction = {
    id: appData.transactions.length + 1,
    date: new Date().toISOString().split('T')[0],
    description: description,
    amount: -Math.abs(amount),
    category: category,
    account: 'Checking'
  };

  appData.transactions.unshift(newTransaction);
  populateTransactions();

  // Clear form and close modal
  document.getElementById('expenseDescription').value = '';
  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseCategory').value = 'Food & Dining';
  hideAddExpenseModal();

  alert('Expense added successfully!');
}

function simulateReceiptScan() {
  alert('Camera activated... Scanning receipt...');
  setTimeout(() => {
    alert('Receipt scanned successfully! Extracted: Grocery Store - $45.67');
    // In real app, would populate the add expense form with OCR data
    document.getElementById('expenseDescription').value = 'Grocery Store (OCR)';
    document.getElementById('expenseAmount').value = '45.67';
    document.getElementById('expenseCategory').value = 'Food & Dining';
    showAddExpenseModal();
  }, 2000);
}

// Bill management functions
function payBill(billId) {
  const bill = appData.bills.find(b => b.id === billId);
  if (bill) {
    alert(`Processing payment for ${bill.name} - ${formatCurrency(bill.amount)}`);
    // In real app, would process payment
  }
}

function scheduleBill(billId) {
  const bill = appData.bills.find(b => b.id === billId);
  if (bill) {
    alert(`Scheduling automatic payment for ${bill.name}`);
    // In real app, would open scheduling modal
  }
}

// Reports function
function downloadReport() {
  alert('Generating financial report... Download will start shortly.');
  // In real app, would generate and download PDF report
}

// Modal functions
function showModal(modal) {
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function hideModal(modal) {
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}