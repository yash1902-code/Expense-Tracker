const expenseForm = document.getElementById("expenseForm");
const expenseTable = document.getElementById("expenseTable");
const emptyMessage = document.getElementById("emptyMessage");

const totalExpense = document.getElementById("totalExpense");
const foodTotal = document.getElementById("foodTotal");
const travelTotal = document.getElementById("travelTotal");
const shoppingTotal = document.getElementById("shoppingTotal");
const educationTotal = document.getElementById("educationTotal");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
localStorage.setItem("expenses", JSON.stringify(expenses));
}

function formatCurrency(amount) {
return `₹${amount.toFixed(2)}`;
}

function updateSummary() {
let total = 0;

```
const categoryTotals = {
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Education: 0
};

expenses.forEach(expense => {
    total += expense.amount;
    categoryTotals[expense.category] += expense.amount;
});

totalExpense.textContent = formatCurrency(total);
foodTotal.textContent = formatCurrency(categoryTotals.Food);
travelTotal.textContent = formatCurrency(categoryTotals.Travel);
shoppingTotal.textContent = formatCurrency(categoryTotals.Shopping);
educationTotal.textContent = formatCurrency(categoryTotals.Education);
```

}

function displayExpenses() {
expenseTable.innerHTML = "";

```
if (expenses.length === 0) {
    emptyMessage.style.display = "block";
} else {
    emptyMessage.style.display = "none";
}

expenses.forEach((expense, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td>${formatCurrency(expense.amount)}</td>
        <td>
            <button class="delete-btn" onclick="deleteExpense(${index})">
                Delete
            </button>
        </td>
    `;

    expenseTable.appendChild(row);
});

updateSummary();
```

}

expenseForm.addEventListener("submit", function(event) {
event.preventDefault();

```
const name = document.getElementById("expenseName").value.trim();
const amount = Number(document.getElementById("expenseAmount").value);
const category = document.getElementById("expenseCategory").value;
const date = document.getElementById("expenseDate").value;

if (!name || amount <= 0 || !category || !date) {
    alert("Please enter valid expense details.");
    return;
}

const expense = {
    name: name,
    amount: amount,
    category: category,
    date: date
};

expenses.push(expense);

saveExpenses();
displayExpenses();

expenseForm.reset();
```

});

function deleteExpense(index) {
expenses.splice(index, 1);

```
saveExpenses();
displayExpenses();
```

}

displayExpenses();
