import { state } from './state.js';

export function renderAfterlife() {
  let assetsText = state.assets && state.assets.length ? state.assets.join(", ") : "no assets";
  let criminalText = state.criminalRecord ? "had a criminal record" : "had a clean record";
  let jobText = state.job ? `worked as a <b>${state.job}</b>` : "was unemployed";
  let educationText = state.education ? state.education : "no formal education";
  let majorText = state.major ? state.major : "no major";

  document.getElementById('event-text').innerHTML = `
    <b>You died at age ${state.age}.</b><br><br>
    In your lifetime, you ${jobText},<br>
    studied <b>${majorText}</b> with <b>${educationText}</b>,<br>
    owned <b>${assetsText}</b>, and ${criminalText}.<br>
    You left behind <b>$${state.money}</b> in cash and <b>$${state.bank}</b> in the bank.<br><br>
    <span style="color:#38bdf8">Thank you for playing!</span><br>
    <span style="color:#a3e635">Click "Restart Life" to try again.</span>
  `;

  document.getElementById('choices').innerHTML = '';
  document.getElementById('menu').innerHTML = '';
  document.getElementById('age-btn').disabled = true;
  document.getElementById('bank-panel').style.display = 'none';
}
