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

const secondAccount = {
  username: "Mary Potter",
  password: 3421,
};

const userAccounts = [firstAccount, secondAccount];

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  let currentUserAccount;
  // Find the username
  currentUserAccount = userAccounts.find(function (acc) {
    return acc.username === "John Doe";
  });
  console.log(currentUserAccount);

  // Check for the PIN
  if (currentUserAccount?.password === Number(pinLogin.value)) {
    userDisplay.style.opacity = 100;

    messageLogin.textContent = `Welcome, ${currentUserAccount.username}`;

    // Clear input fields
    userLogin.value = "";
    pinLogin.value = "";
    init();
  }
});

// // Find the username
// currentUserAccount = userAccounts.find(function (cur) {
//   cur.username === this.userLogin.value;
// });

// // Check for the PIN
// if (currentUserAccount?.pin === Number(this.pinLogin.value)) {
//   this.userDisplay.style.opacity = 100;

//   this.messageLogin.textContent = `Welcome, ${
//     currentUserAccount.username.split("")[0]
//   }`;

//   // Clear input fields
//   this.userLogin.value = this.pinLogin.value = "";

class Budget {
  constructor() {
    // this.userLogin = document.querySelector(".login__user");
    // this.pinLogin = document.querySelector(".login__pin");
    // this.btnLogin = document.querySelector(".btn--login");
    // this.messageLogin = document.querySelector(".cta__text");
    // this.userDisplay = document.querySelector(".container");
    // this.formLogin = document.querySelector(".login__input");

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

  // Login functionality
  // loginProcess() {
  //   let currentUserAccount;

  //   const firstAccount = {
  //     username: "John Doe",
  //     password: 5467,
  //   };

  //   const secondAccount = {
  //     username: "Mary Potter",
  //     password: 3421,
  //   };

  //   const userAccounts = [firstAccount, secondAccount];

  //   // Find the username
  //   currentUserAccount = userAccounts.find(function (cur) {
  //     cur.username === this.userLogin.value;
  //   });

  //   // Check for the PIN
  //   if (currentUserAccount?.pin === Number(this.pinLogin.value)) {
  //     this.userDisplay.style.opacity = 100;

  //     this.messageLogin.textContent = `Welcome, ${
  //       currentUserAccount.username.split("")[0]
  //     }`;

  //     // Clear input fields
  //     this.userLogin.value = this.pinLogin.value = "";
  //   }
  // }

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
  const formLogin = document.querySelector(".login__input");

  const budget = new Budget();

  // formLogin.addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   budget.loginProcess();
  // });

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

// const btnLogin = document.querySelector(".btn--login");
// const formLogin = document.querySelector(".login__input");

// function loginUser() {
//   const budget = new Budget();
//   budget.loginProcess();
// }

// function formLoginProcess() {
//   const budget = new Budget();
//   budget.loginProcess();
// }

// formLogin.addEventListener("submit", function (e) {
//   e.preventDefault();
//   formLoginProcess();
// });

// btnLogin.addEventListener("click", function (e) {
//   e.preventDefault();
//   loginUser();
// });
// function loginUser() {
//   const budget = new Budget();
//   budget.loginProcess();
// }
