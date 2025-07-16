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

    let loanHtml = '';
  if (!state.loans || state.loans.length === 0 || state.loans.every(l => l.repaid)) {
    loanHtml += '<div style="margin-top:10px;color:#a3e635">No active loans.</div>';
  } else {
    loanHtml += '<div style="margin-top:10px"><b>Loans:</b></div>';
    state.loans.forEach((loan, idx) => {
      if (loan.repaid) return;
      loanHtml += `<div style="margin:4px 0">${loan.amount} (collateral: ${loan.collateral})
        <button style="margin-left:8px" onclick="window.repayLoanFromBank(${idx})">Repay</button></div>`;
    });
  }
  loanHtml += '<div style="margin-top:16px"><button id="bank-loan-btn">Take Out Loan</button></div>';
  document.getElementById('bank-message').innerHTML = loanHtml;

    setTimeout(() => {
    const loanBtn = document.getElementById('bank-loan-btn');
    if (loanBtn) loanBtn.onclick = showBankLoanMenu;
  }, 10);
}

window.repayLoanFromBank = function(idx) {
  const loan = state.loans[idx];
  if (!loan || loan.repaid) return;
  if (state.money < loan.amount) {
    alert('Not enough money to repay this loan.');
    return;
  }
  state.money -= loan.amount;
  loan.repaid = true;
  state.log.push(`You repaid your ${loan.amount} loan and reclaimed your ${loan.collateral}.`);
  saveGame();
  showBankPanel();
};

function showBankLoanMenu() {
  const assets = state.assets || [];
  if (assets.length === 0) {
    alert('You have no assets to use as collateral.');
    return;
  }
  let msg = 'Select collateral for your loan:';
  assets.forEach((asset, idx) => {
    msg += `\n${idx + 1}. ${asset.name} (value ${asset.value})`;
  });
  const choice = prompt(msg + '\nEnter the number of the asset to use as collateral:');
  const idx = parseInt(choice) - 1;
  if (isNaN(idx) || idx < 0 || idx >= assets.length) {
    alert('Invalid selection.');
    return;
  }
  const asset = assets[idx];
  const amount = prompt(`How much do you want to borrow against your ${asset.name}? (Max ${asset.value})`);
  const amt = parseInt(amount);
  if (isNaN(amt) || amt <= 0 || amt > asset.value) {
    alert('Invalid amount.');
    return;
  }
  state.loans.push({ amount: amt, collateral: asset.name, repaid: false, originalValue: asset.value });
  state.money += amt;
  state.log.push(`You took out a loan of ${amt} using your ${asset.name} as collateral (bank).`);
  saveGame();
  showBankPanel();
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
