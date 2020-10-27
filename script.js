const des = document.getElementsByClassName("add_description")[0];
const taarikh = document.getElementsByClassName("add_date")[0];
const amt = document.getElementsByClassName("add_value")[0];
const balance = document.getElementsByClassName("budget_value")[0];
const plus = document.getElementsByClassName("budget_income_value")[0];
const minus = document.getElementsByClassName("budget_expenses_value")[0];
const plus_list = document.getElementsByClassName("income_list")[0];
const minus_list = document.getElementsByClassName("expenses_list")[0];

function month() {
  var now = new Date();

  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  var month = now.getMonth();
  var year = now.getFullYear();
  document.getElementsByClassName("budget_title_month")[0].innerHTML = months[month] + " " + year;
}

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction() {
  const tranx = {
    id: generateRandomID(),
    date: taarikh.value,
    text: des.value,
    amount: +amt.value,
  };
  transactions.push(tranx);
  addTransactionDOM(tranx);

  updateValues();
  updateLocalStorage();
  
  taarikh.value = "1";
  des.value = "";
  amt.value = "";
}

function generateRandomID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(tranx) {
  const listEl = tranx.amount < 0 ? minus_list : plus_list;

  const item = document.createElement("div");
  item.classList.add("item");
  item.classList.add("clearfix");

  item.innerHTML = `<div class="item_description"> ${tranx.text} (Date : ${tranx.date}) </div><div class="right clearfix"><div class="item_value">${tranx.amount}</div></div>`;

  listEl.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map((tranx) => tranx.amount);
  const id = transactions.map((tranx) => tranx.id);
  console.log(amounts)
  console.log(id)

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  console.log(total);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  console.log(income);

  const expense = (
    amounts
      .filter((items) => items < 0)
      .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);
  console.log(expense);

  balance.innerText = total;
  plus.innerText = income;
  minus.innerText = expense;
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
  plus_list.innerHTML = "";
  minus_list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
month();