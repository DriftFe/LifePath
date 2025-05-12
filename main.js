import { state, resetGame, saveGame, loadGame } from './modules/state.js';
import { renderStats } from './modules/stats.js';
import { renderLog } from './modules/log.js';
import { renderMenu } from './modules/menu.js';
import { showBankPanel } from './modules/bank.js';
import { renderAfterlife } from './modules/afterlife.js';
import { ageUp } from './modules/utils.js';

// DOM elements
export const statsDiv = document.getElementById('stats');
export const logDiv = document.getElementById('life-log');
export const eventTextDiv = document.getElementById('event-text');
export const menuDiv = document.getElementById('menu');
export const choicesDiv = document.getElementById('choices');
export const ageBtn = document.getElementById('age-btn');
export const resetBtn = document.getElementById('reset-btn');
export const bankPanel = document.getElementById('bank-panel');

// Main render
export function render() {
  renderStats();
  renderLog();
  if (!state.alive) {
    renderAfterlife();
    return;
  }
  renderMenu();
  ageBtn.disabled = !state.alive;
  bankPanel.style.display = "none";
}

// Age up
ageBtn.onclick = () => {
  ageUp();
  render();
};

resetBtn.onclick = () => {
  if (confirm("Restart your life?")) {
    resetGame();
    render();
  }
};

// Initial load
loadGame();
render();
