import { state, saveGame } from './state.js';
import { render } from '../main.js';

export function crimeSimulatorMenu() {
  if (state.age < 14) {
    alert("You are too young to commit crimes!");
    return;
  }
  const choicesDiv = document.getElementById('choices');
  const menuDiv = document.getElementById('menu');
  const eventTextDiv = document.getElementById('event-text');
  choicesDiv.innerHTML = '';
  menuDiv.innerHTML = '';
  eventTextDiv.innerHTML = "Choose a crime to commit:";
  [
    { label: "Pickpocket", risk: 0.15, reward: 200, jail: 1 },
    { label: "Robbery", risk: 0.35, reward: 1200, jail: 3 },
    { label: "Grand Theft Auto", risk: 0.45, reward: 4000, jail: 5 },
    { label: "Fraud", risk: 0.30, reward: 2500, jail: 4 },
    { label: "Organized Crime", risk: 0.55, reward: 8000, jail: 8 }
  ].forEach(crime => {
    addChoiceBtn(crime.label, () => doCrimeSim(crime));
  });
  addChoiceBtn("Back", render);
}

function addChoiceBtn(label, action) {
  const btn = document.createElement('button');
  btn.className = 'choice-btn';
  btn.textContent = label;
  btn.onclick = action;
  document.getElementById('choices').appendChild(btn);
}

function doCrimeSim(crime) {
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  let outcome = Math.random();
  if (outcome < crime.risk) {
    state.criminalRecord = true;
    state.inJail = true;
    state.yearsInJail = crime.jail;
    state.log.push(`You were caught committing ${crime.label} and sent to jail for ${crime.jail} years!`);
  } else {
    state.money += crime.reward;
    state.log.push(`You committed ${crime.label} and got away with $${crime.reward}!`);
  }
  saveGame();
  render();
}
