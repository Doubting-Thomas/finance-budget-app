const btnLogin = document.querySelector(".btn--login");
const userLogin = document.querySelector(".login__user");
const pinLogin = document.querySelector(".login__pin");
const messageLogin = document.querySelector(".cta__text");
const userDisplay = document.querySelector(".container");
const formLogin = document.querySelector(".login__input");

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

  // Check for the PIN
  if (currentUserAccount?.password === Number(pinLogin.value)) {
    userDisplay.style.opacity = 100;

    messageLogin.textContent = `Welcome, ${currentUserAccount.username}!`;

    // Clear input fields
    userLogin.value = "";
    pinLogin.value = "";
    init();
  }
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
  }

  // Submit expenses
  submitFormExpense() {
    const valueAmount = this.inputAmount.value;

    if (valueAmount === "" || valueAmount < 0) {
      this.expenseInformation.classList.add("reveal-item");
      this.expenseInformation.innerHTML = `<p>Input values cannot be empty or less than zero.`;
      this.expenseInformation.style.color = "red";

      const timeout = this;
      setTimeout(function () {
        timeout.expenseInformation.classList.remove("reveal-item");
      }, 3000);
    } else {
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
