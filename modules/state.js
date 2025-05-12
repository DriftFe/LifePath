export let state = {
    age: 0,
    money: 1000,
    bank: 0,
    happiness: 70,
    health: 80,
    smarts: 60,
    looks: 55,
    log: [],
    alive: true,
    job: null,
    education: null,
    major: null,
    assets: [],
    criminalRecord: false,
    inJail: false,
    yearsInJail: 0,
    business: null
  };
  
  export function saveGame() {
    localStorage.setItem('bitlife_state', JSON.stringify(state));
  }
  export function loadGame() {
    const saved = localStorage.getItem('bitlife_state');
    if (saved) Object.assign(state, JSON.parse(saved));
  }
  export function resetGame() {
    Object.assign(state, {
      age: 0,
      money: 1000,
      bank: 0,
      happiness: 70,
      health: 80,
      smarts: 60,
      looks: 55,
      log: [],
      alive: true,
      job: null,
      education: null,
      major: null,
      assets: [],
      criminalRecord: false,
      inJail: false,
      yearsInJail: 0,
      business: null
    });
    saveGame();
  }
  