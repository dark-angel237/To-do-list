// Select elements
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const themeToggle = document.getElementById('theme-toggle');
const filterButtons = document.querySelectorAll('.filter-btn');

// Load from localStorage or empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add Transaction
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = document.getElementById('desc').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (!desc || isNaN(amount)) return;

    const transaction = {
        id: Date.now(),
        desc,
        amount,
        type
    };

    transactions.push(transaction);
    saveAndRender();
    transactionForm.reset();
});

// Delete Transaction
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveAndRender();
}

// Render Transactions
function renderTransactions(filter = 'all') {
    transactionList.innerHTML = '';

    const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

    filtered.forEach(t => {
        const li = document.createElement('li');
        li.classList.add(t.type);
        li.innerHTML = `
            ${t.desc} <span>${t.type === 'expense' ? '-' : '+'}$${t.amount.toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${t.id})">❌</button>
        `;
        transactionList.appendChild(li);
    });

    updateDashboard();
}

// Update Dashboard
function updateDashboard() {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expense;

    balanceEl.textContent = `$${balance.toFixed(2)}`;
    incomeEl.textContent = `$${income.toFixed(2)}`;
    expenseEl.textContent = `$${expense.toFixed(2)}`;
}

// Save & Render
function saveAndRender() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions(currentFilter);
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Filter
let currentFilter = 'all';
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        renderTransactions(currentFilter);
    });
});

// Initial render
renderTransactions();
