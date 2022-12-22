class Budget {
  constructor() {
    this.budgetInformation = document.querySelector(".budget__info");
    this.expenseInformation = document.querySelector(".expense");
    this.formBudget = document.querySelector(".form__budget");
    this.inputBudget = document.querySelector(".input-budget");
    this.financeBudgetAmount = document.querySelector(".finance__budget");
    this.financeExpenseAmount = document.querySelector(".finance__expenses");
    this.balance = document.querySelector(".balance");
    this.financeBalanceAmount = document.querySelector(".finance__balance");
    this.formExpense = document.querySelector(".form__expense");
    this.inputExpense = document.querySelector(".input-expense");
    this.inputAmount = document.querySelector(".input-amount");
    this.listExpense = document.querySelector(".list__expense");
    this.listItem = [];
    this.item = 0;
  }

  // Submit the budget on command
  submitFormBudget() {
    const inputValue = this.inputBudget.value;
    if (inputValue === "" || inputValue < 0) {
      this.budgetInformation.classList.add("reveal-item");
      this.budgetInformation.innerHTML = `<p>Input must not be empty and less than zero.</p>`;

      const timeout = this;
      setTimeout(function () {
        timeout.budgetInformation.remove("reveal-item");
      }, 3000);
    } else {
      this.financeBudgetAmount.textContent = inputValue;
      this.inputBudget.value = "";
      this.displayBalance();
    }
  }

  // Display the balance
  displayBalance() {
    const valueExpense = this.totalBalance();
    const totalBalance =
      parseInt(this.financeBudgetAmount.textContent) - valueExpense;

    if (totalBalance < 0) {
      this.balance.classList.remove("reveal-green", "reveal-white");
      this.balance.classList.add("reveal-red");
    } else if (totalBalance > 0) {
      this.balance.classList.remove("reveal-red", "reveal-white");
      this.balance.classList.add("reveal-green");
    } else if (totalBalance === 0) {
      this.balance.classList.remove("reveal-red", "reveal-green");
      this.balance.classList.add("reveal-white");
    }
  }

  // Submit expenses
  submitFormExpense() {
    const valueExpense = this.inputExpense.value;
    const valueAmount = this.inputAmount.value;

    if (valueExpense === "" || valueAmount === "" || valueAmount < 0) {
      this.expenseInformation.classList.add("reveal-item");
      this.expenseInformation.innerHTML = `<p>Input values cannot be empty or less than zero.`;

      const timeout = this;
      setTimeout(function () {
        timeout.expenseInformation.classList.remove("reveal-item");
      }, 3000);
    } else {
      let amount = parseInt(valueAmount);
      this.inputExpense.value = "";
      this.inputAmount.value = "";

      let expense = {
        id: this.item,
        title: valueExpense,
        amount: amount,
      };

      this.item++;
      this.listItem.push(expense);
      this.addExpense(expense);
      this.displayBalance();
    }
  }

  // Add expenses
  addExpense(expense) {
    const divCreate = document.createElement("div");
    divCreate.add("expense-add");
    divCreate.innerHTML = `
    <div class="expenses__item">
    <h6 class="expense__title list-item">${expense - add.amount}</h6>
    <h5 class="expense__amount list-item">${expense - add.amount}</h5>
    <div class="expense-icons list-item">
     <a href="#" class="edit-icon mx-2" data-id="${expense - add.id}">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="${expense - add.id}">
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </div>`;
    this.listExpense.appendChild(divCreate);
  }

  // Total expenses
  totalExpense() {
    let total = 0;

    if (this.listItem.length > 0) {
      total = this.listItem.reduce(function (acc, cur) {
        acc += cur.amount;
        return acc;
      }, 0);
    }
    this.financeExpenseAmount.textContent = total;
    return total;
  }

  // Edit expenses
  modifyExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent =
      element.parentElement.parentElement.parentElement.parentElement;
    // Remove element
    this.listExpense.removeChild(parent);
    // Remove element from the list
    let expense = this.listItem.filter(function (item) {
      return item.id === id;
    });
    // Display values
    this.inputExpense.value = expense[0].title;
    this.inputAmount.value = expense[0].amount;
    // Remove element from the list
    let listTemp = this.listItem.filter(function (item) {
      return item.id !== id;
    });
    this.listItem = listTemp;
    this.displayBalance();
  }

  // Remove expenses
  removeExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent =
      element.parentElement.parentElement.parentElement.parentElement;
    // Remove element
    this.listExpense.removeChild(parent);
    // Remove element from the list
    let expense = this.listItem.filter(function (item) {
      return item.id === id;
    });

    // Remove element from the list
    let listTemp = this.listItem.filter(function (item) {
      return item.id !== id;
    });
    this.listItem = listTemp;
    this.displayBalance();
  }
}

// Implement the event listeners
function init() {
  const formBudget = document.querySelector(".form__budget");
  const formExpense = document.querySelector(".form__expense");
  const listExpense = document.querySelector(".list__expense");

  const budget = new Budget();

  // Submit budget form
  formBudget.addEventListener("submit", function (e) {
    e.preventDefault();
    budget.submitFormBudget();
  });

  // Submit expense form
  formExpense.addEventListener("submit", function (e) {
    e.preventDefault();
    budget.formExpense();
  });

  // Submit expense list
  listExpense.addEventListener("click", function (e) {
    if (e.target.parentElement.classList.contains("edit-icon")) {
      budget.modifyExpense(e.target.parentElement);
    } else if (e.target.parentElement.classList.contains("delete-icon")) {
      budget.removeExpense(e.target.parentElement);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});
