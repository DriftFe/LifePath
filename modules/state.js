export let state = {
    age: 0,
    money: 0,
    bank: 0,
    happiness: 70,
    health: 80,
    smarts: 60,
    looks: 55,
    karma: 50,
    stress: 10,
    depression: 0,
    log: [],
    alive: true,
    job: null,
    sideJob: null,
    education: null,
    major: null,
    grades: null,
    degree: null,
    assets: [],
    car: null,
    house: null,
    pets: [],
    criminalRecord: false,
    inJail: false,
    yearsInJail: 0,
    business: null,
    spouse: null,
    children: [],
    friends: [],
    parents: ["Mom", "Dad"],
    relationshipStatus: "Single",
    jobSatisfaction: 50,
    unemployedYears: 0,
    insurance: false,
    loans: [],
    investments: [],
    rent: 0,
    taxes: 0,
    bankrupt: false,
    worldEvents: [],
    achievements: [],
    inheritance: 0
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
      karma: 50,
      log: [],
      alive: true,
      job: null,
      sideJob: null,
      education: null,
      major: null,
      assets: [],
      loans: [],
      criminalRecord: false,
      inJail: false,
      yearsInJail: 0,
      business: null
    });
    saveGame();
  }
  
