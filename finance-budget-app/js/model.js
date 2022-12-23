class Budget {
  constructor() {
    this.budgetInformation = document.querySelector(".budget__info");
    this.expenseInformation = document.querySelector(".expense__info");
    this.formBudget = document.querySelector(".form__budget");
    this.inputBudget = document.querySelector(".input-budget");
    this.financeBudgetAmount = document.querySelector(".finance__amount");
    this.financeExpenseAmount = document.querySelector(".finance__expense");
    this.financeBalanceAmount = document.querySelector(".finance__balance");
    this.balance = document.querySelector(".balance");
    this.formExpense = document.querySelector(".expense__form");
    //this.inputExpense = document.querySelector(".input-expense");
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

      // Make 'this' point to the Budget class
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
    const valueExpense = this.totalExpense();
    const totalBalance =
      parseInt(this.financeBudgetAmount.textContent) - valueExpense;
    this.financeBalanceAmount.textContent = totalBalance;
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
    //const valueExpense = this.inputExpense.value;
    const valueAmount = this.inputAmount.value;

    if (valueAmount === "" || valueAmount < 0) {
      this.expenseInformation.classList.add("reveal-item");
      this.expenseInformation.innerHTML = `<p>Input values cannot be empty or less than zero.`;

      const timeout = this;
      setTimeout(function () {
        timeout.expenseInformation.classList.remove("reveal-item");
      }, 3000);
    } else {
      this.displayBalance();
      this.totalExpense();
    }
    // } else {
    //   this.financeExpenseAmount.textContent = valueAmount;
    //   this.inputExpense.value = "";
    //   this.inputAmount.value = "";
    // this.displayBalance();
    //   let amount = parseInt(valueAmount);
    //   this.inputExpense.value = "";
    //   this.inputAmount.value = "";

    //   let expense = {
    //     id: this.item,
    //     title: valueExpense,
    //     amount: amount,
    //   };

    //   this.item++;
    //   this.listItem.push(expense);
    //   this.addExpense(expense);
    // this.displayBalance();
    // }
  }

  // Total expenses
  totalExpense() {
    // let total = 0;

    // if (this.listItem.length > 0) {
    //   total = this.listItem.reduce(function (acc, cur) {
    //     acc += cur.amount;
    //     return acc;
    //   }, 0);
    // }
    // this.financeExpenseAmount.textContent = total;
    // return total;
    let inputValue = this.inputAmount.value;
    // if (inputValue === "" || inputValue < 0) {
    //   this.expenseInformation.classList.add("reveal-item");
    //   this.expenseInformation.innerHTML = `<p>Input must not be empty and less than zero.</p>`;

    //   // Make 'this' point to the Budget class
    //   const timeout = this;
    //   setTimeout(function () {
    //     timeout.expenseInformation.remove("reveal-item");
    //   }, 3000);
    // }  {
    if (inputValue > 0) {
      this.financeExpenseAmount.textContent = inputValue;
      this.inputAmount.value = "";
      // return inputValue;
    }

    // this.displayBalance();
    return inputValue;
  }
}

// Implement the event listeners
function init() {
  const formBudget = document.querySelector(".form__budget");
  const formExpense = document.querySelector(".expense__form");
  // Grey out the below
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
    budget.submitFormExpense();
  });
}
init();
// document.addEventListener("DOMContentLoaded", function () {
//   init();
// });
