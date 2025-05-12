import { state, saveGame } from './state.js';
import { render } from '../main.js';

const bankPanel = document.getElementById('bank-panel');
const bankBalanceSpan = document.getElementById('bank-balance');
const bankAmountInput = document.getElementById('bank-amount');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const closeBankBtn = document.getElementById('close-bank-btn');
const bankMessageDiv = document.getElementById('bank-message');

export function showBankPanel() {
  if (state.age < 14) {
    alert("You are too young to use the bank!");
    return;
  }
  bankPanel.style.display = "flex";
  bankPanel.style.animation = "slideDown 0.5s";
  bankBalanceSpan.textContent = state.bank;
  bankAmountInput.value = "";
  bankMessageDiv.textContent = "";
}

depositBtn.onclick = function() {
  const amt = parseInt(bankAmountInput.value, 10);
  if (amt > 0 && amt <= state.money) {
    state.money -= amt;
    state.bank += amt;
    bankBalanceSpan.textContent = state.bank;
    bankMessageDiv.textContent = `Deposited $${amt}.`;
    bankMessageDiv.style.color = "#a3e635";
    saveGame();
    render();
  } else {
    bankMessageDiv.textContent = "Invalid amount.";
    bankMessageDiv.style.color = "#ef4444";
  }
};
withdrawBtn.onclick = function() {
  const amt = parseInt(bankAmountInput.value, 10);
  if (amt > 0 && amt <= state.bank) {
    state.money += amt;
    state.bank -= amt;
    bankBalanceSpan.textContent = state.bank;
    bankMessageDiv.textContent = `Withdrew $${amt}.`;
    bankMessageDiv.style.color = "#a3e635";
    saveGame();
    render();
  } else {
    bankMessageDiv.textContent = "Invalid amount.";
    bankMessageDiv.style.color = "#ef4444";
  }
};
closeBankBtn.onclick = function() {
  bankPanel.style.display = "none";
  render();
};
