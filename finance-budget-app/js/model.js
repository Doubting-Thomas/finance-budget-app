import {
  btnLogin,
  btnLogout,
  userLogin,
  pinLogin,
  messageLogin,
  userDisplay,
  logoutText,
} from "./config.js";

// Account details for login
const firstAccount = {
  username: "John Doe",
  password: 5467,
};

const userAccounts = [firstAccount];

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  let currentUserAccount;

  // Find the username
  currentUserAccount = userAccounts.find(function (acc) {
    return acc.username;
  });

  // Check for the username and PIN
  if (currentUserAccount?.password === +pinLogin.value) {
    userDisplay.style.opacity = 100;

    messageLogin.textContent = `Welcome, ${currentUserAccount.username}!`;

    userLogin.value = "";
    pinLogin.value = "";
    btnLogout.classList.remove("hidden");
    init();
  } else {
    messageLogin.textContent = "Wrong username or password.";
  }
});

btnLogout.addEventListener("click", function (e) {
  e.preventDefault();
  userDisplay.style.opacity = 0;
  logoutText.textContent = "Please visit us again to get started.";
  btnLogout.classList.add("hidden");

  // Target values from the class
  const budget = new Budget();
  const inputBudget = budget.inputBudget;
  const inputExpenses = budget.inputAmount;

  inputBudget.value = "";
  inputExpenses.value = "";
});

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
    this.inputAmount = document.querySelector(".input-amount");
  }

  // Submit the budget on command
  submitFormBudget() {
    const inputValue = this.inputBudget.value;
    if (inputValue === "" || inputValue < 0) {
      this.budgetInformation.classList.add("reveal-item");
      this.budgetInformation.innerHTML = `<p>Input must not be empty or less than zero.</p>`;
      this.budgetInformation.style.color = "#f9035e";

      // Make 'this' point to the Budget class
      const timeout = this;
      setTimeout(function () {
        timeout.budgetInformation.remove("reveal-item");
      }, 3000);
    } else {
      this.budgetInformation.innerHTML = `<p>Successfully added!</p>`;
      this.budgetInformation.style.color = "#30c67c";

      const timeout = this;

      setTimeout(function () {
        setTimeout(function () {
          timeout.budgetInformation.remove("reveal-item");
        }, 3000);
      });

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
  }

  // Submit expenses
  submitFormExpense() {
    const valueAmount = this.inputAmount.value;

    if (valueAmount === "" || valueAmount < 0) {
      this.expenseInformation.classList.add("reveal-item");
      this.expenseInformation.innerHTML = `<p>Input values cannot be empty or less than zero.</p>`;
      this.expenseInformation.style.color = "#f9035e";

      const timeout = this;
      setTimeout(function () {
        timeout.expenseInformation.remove("reveal-item");
      }, 3000);
    } else {
      this.expenseInformation.innerHTML = `<p>Successfully added!</p>`;
      this.expenseInformation.style.color = "#30c67c";

      const timeout = this;

      setTimeout(function () {
        setTimeout(function () {
          timeout.expenseInformation.remove("reveal-item");
        }, 3000);
      });

      this.displayBalance();
      this.totalExpense();
    }
  }

  // Total expenses
  totalExpense() {
    let inputValue = this.inputAmount.value;
    if (inputValue > 0) {
      this.financeExpenseAmount.textContent = inputValue;
      this.inputAmount.value = "";
    }
    return inputValue;
  }
}

// Implement the event listeners
function init() {
  const formBudget = document.querySelector(".form__budget");
  const formExpense = document.querySelector(".expense__form");

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
