import { businessSimulatorMenu } from './business.js';
import { crimeSimulatorMenu } from './crime.js';
import { showBankPanel } from './bank.js';
import { state, saveGame } from './state.js';

export function renderMenu() {
  const menuDiv = document.getElementById('menu');
  const choicesDiv = document.getElementById('choices');
  const eventTextDiv = document.getElementById('event-text');
  menuDiv.innerHTML = '';
  choicesDiv.innerHTML = '';
  eventTextDiv.innerHTML = "What would you like to do this year?";
  eventTextDiv.style.opacity = 0;
  setTimeout(() => eventTextDiv.style.opacity = 1, 50);

  if (state.inJail) {
    eventTextDiv.innerHTML = `You are in jail. Time remaining: ${state.yearsInJail} year${state.yearsInJail > 1 ? 's' : ''}.`;
    return;
  }

  // Socialize is always available
  addMenuBtn("Socialize", doSocialize);

  // Study available for ages 5+
  if (state.age >= 5) addMenuBtn("Study", doStudy);

  // The rest are available for ages 14+
  if (state.age >= 14) {
    addMenuBtn("Work", () => alert("Work system coming soon!"));
    addMenuBtn("Go to Bank", showBankPanel);
    addMenuBtn("Business Simulator", businessSimulatorMenu);
    addMenuBtn("Crime Simulator", crimeSimulatorMenu);
    addMenuBtn("Shop", () => alert("Shop system coming soon!"));
  }
}

export function addMenuBtn(label, action) {
  const btn = document.createElement('button');
  btn.className = 'menu-btn';
  btn.textContent = label;
  btn.onclick = action;
  btn.style.opacity = 0;
  document.getElementById('menu').appendChild(btn);
  setTimeout(() => { btn.style.opacity = 1; }, 50);
}

// --- New: Study and Socialize actions ---

function doStudy() {
  const eventTextDiv = document.getElementById('event-text');
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  // Effects: +smarts, -happiness, possible event
  let smartsGain = Math.floor(Math.random() * 3) + 2;
  let happinessLoss = Math.floor(Math.random() * 2) + 1;
  state.smarts = Math.min(100, state.smarts + smartsGain);
  state.happiness = Math.max(0, state.happiness - happinessLoss);
  state.log.push(`You studied hard this year. Smarts +${smartsGain}, Happiness -${happinessLoss}.`);
  eventTextDiv.innerHTML = `You spent the year studying.<br>Smarts +${smartsGain}, Happiness -${happinessLoss}.`;
  saveGame();
}

function doSocialize() {
  const eventTextDiv = document.getElementById('event-text');
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  // Effects: +happiness, small chance of event
  let happinessGain = Math.floor(Math.random() * 6) + 5;
  state.happiness = Math.min(100, state.happiness + happinessGain);
  let eventMsg = "";
  if (Math.random() < 0.15) {
    state.smarts = Math.max(0, state.smarts - 2);
    eventMsg = "<br>You partied a bit too hard. Smarts -2.";
    state.log.push("You partied a bit too hard. Smarts -2.");
  }
  state.log.push(`You socialized this year. Happiness +${happinessGain}.`);
  eventTextDiv.innerHTML = `You spent time socializing.<br>Happiness +${happinessGain}.${eventMsg}`;
  saveGame();
}
