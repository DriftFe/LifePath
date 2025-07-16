import { state } from './state.js';

export function renderStats() {
  document.getElementById('stats').innerHTML = `
    <div class="stat-item">Age: <b>${state.age}</b></div>
    <div class="stat-item">Money: <b>$${state.money}</b></div>
    <div class="stat-item">Bank: <b>$${state.bank}</b></div>
    <div class="stat-item">Happiness: <b>${state.happiness}</b></div>
    <div class="stat-item">Health: <b>${state.health}</b></div>
    <div class="stat-item">Smarts: <b>${state.smarts}</b></div>
    <div class="stat-item">Looks: <b>${state.looks}</b></div>
    <div class="stat-item">Job: <b>${state.job || "Unemployed"}</b></div>
    <div class="stat-item">Education: <b>${state.education || "None"}</b></div>
    <div class="stat-item">Assets: <b>${state.assets && state.assets.length ? state.assets.join(", ") : "None"}</b></div>
    <div class="stat-item">Criminal Record: <b>${state.criminalRecord ? "Yes" : "No"}</b></div>
    ${state.inJail ? `<div class="stat-item">In Jail (${state.yearsInJail} year${state.yearsInJail > 1 ? 's' : ''} left)</div>` : ""}
  `;
}
