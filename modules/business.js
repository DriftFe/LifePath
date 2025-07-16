import { state, saveGame } from './state.js';
import { render } from '../main.js';

export function businessSimulatorMenu() {
  if (state.age < 14) {
    alert("You are too young to start or run a business!");
    return;
  }
  const choicesDiv = document.getElementById('choices');
  const menuDiv = document.getElementById('menu');
  const eventTextDiv = document.getElementById('event-text');
  choicesDiv.innerHTML = '';
  menuDiv.innerHTML = '';
  if (!state.business) {
    eventTextDiv.innerHTML = "You don't own a business. Would you like to start one?";
    addChoiceBtn("Start Business", startBusiness);
    addChoiceBtn("Back", render);
  } else {
    const b = state.business;
    eventTextDiv.innerHTML = `
      <b>${b.name}</b> (${b.industry})<br>
      Employees: ${b.employees} | Price: $${b.price} | Revenue: $${b.revenue} | Expenses: $${b.expenses}<br>
      Value: $${b.value} | Years: ${b.years}
    `;
    addChoiceBtn("Operate for 1 Year", operateBusiness);
    addChoiceBtn("Invest $1000", investBusiness);
    addChoiceBtn("Hire Employee ($500)", hireEmployee);
    addChoiceBtn("Set Price", setBusinessPrice);
    addChoiceBtn("Sell Business", sellBusiness);
    addChoiceBtn("Back", render);
  }
}

function addChoiceBtn(label, action) {
  const btn = document.createElement('button');
  btn.className = 'choice-btn';
  btn.textContent = label;
  btn.onclick = action;
  document.getElementById('choices').appendChild(btn);
}

function startBusiness() {
  const choicesDiv = document.getElementById('choices');
  const eventTextDiv = document.getElementById('event-text');
  choicesDiv.innerHTML = '';
  eventTextDiv.innerHTML = "Choose your industry:";
  ["Retail", "Food", "Tech", "Services", "Manufacturing"].forEach(ind => {
    addChoiceBtn(ind, () => {
      state.business = {
        name: prompt("Business Name?") || ind + " Co.",
        industry: ind,
        employees: 1,
        price: 50,
        revenue: 0,
        expenses: 0,
        value: 1000,
        years: 0,
        cashInvested: 1000
      };
      state.money -= 1000;
      state.log.push(`Started a ${ind} business: ${state.business.name}`);
      saveGame();
      render();
    });
  });
  addChoiceBtn("Back", render);
}

function operateBusiness() {
  let b = state.business;
  b.years++;
  let base = 500 + b.employees * 100 + Math.floor(Math.random() * 200);
  b.revenue = Math.floor(base * (b.price / 50));
  b.expenses = 300 + b.employees * 100;
  let profit = b.revenue - b.expenses;
  state.money += profit;
  b.value += profit * 0.5;
  let rand = Math.random();
  if (rand < 0.08) {
    let loss = Math.floor(Math.random() * 500);
    b.value -= loss;
    state.log.push("Business lawsuit! Lost $" + loss);
  } else if (rand > 0.92) {
    let gain = Math.floor(Math.random() * 700);
    b.value += gain;
    state.log.push("Business boom! Gained $" + gain);
  }
  state.log.push(`Business operated for a year. Profit: $${profit}`);
  saveGame();
  render();
}

function investBusiness() {
  if (state.money < 1000) {
    state.log.push("Not enough money to invest.");
  } else {
    state.money -= 1000;
    state.business.value += 1200;
    state.business.cashInvested += 1000;
    state.log.push("Invested $1000 in your business.");
  }
  saveGame();
  render();
}

function hireEmployee() {
  if (state.money < 500) {
    state.log.push("Not enough money to hire.");
  } else {
    state.money -= 500;
    state.business.employees += 1;
    state.business.value += 400;
    state.log.push("Hired an employee.");
  }
  saveGame();
  render();
}

function setBusinessPrice() {
  let newPrice = parseInt(prompt("Set new price per item/service (current: $" + state.business.price + "):"), 10);
  if (isNaN(newPrice) || newPrice < 10 || newPrice > 1000) {
    state.log.push("Invalid price.");
  } else {
    state.business.price = newPrice;
    state.log.push("Set business price to $" + newPrice);
  }
  saveGame();
  render();
}

function sellBusiness() {
  state.money += Math.max(0, Math.floor(state.business.value));
  state.log.push(`Sold your business for $${Math.floor(state.business.value)}.`);
  state.business = null;
  saveGame();
  render();
}
