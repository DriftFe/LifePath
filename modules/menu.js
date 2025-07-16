import { businessSimulatorMenu } from './business.js';
import { crimeSimulatorMenu } from './crime.js';
import { showBankPanel } from './bank.js';
import { state, saveGame } from './state.js';
import { renderLog } from './log.js';

// --- Job and Side Job Data ---
const jobs = [
  { title: "Cashier", minAge: 14, pay: 1200, smarts: 0, looks: 0 },
  { title: "Barista", minAge: 16, pay: 1400, smarts: 10, looks: 0 },
  { title: "Retail Worker", minAge: 16, pay: 1300, smarts: 0, looks: 0 },
  { title: "Fast Food Worker", minAge: 14, pay: 1100, smarts: 0, looks: 0 },
  { title: "Intern", minAge: 18, pay: 1600, smarts: 20, looks: 0 },
  { title: "Junior Developer", minAge: 18, pay: 2500, smarts: 40, looks: 0 },
  { title: "Teacher", minAge: 22, pay: 3000, smarts: 50, looks: 0 },
  { title: "Nurse", minAge: 21, pay: 3200, smarts: 55, looks: 0 },
  { title: "Actor", minAge: 18, pay: 4000, smarts: 0, looks: 60 },
  { title: "Engineer", minAge: 22, pay: 4200, smarts: 70, looks: 0 },
  { title: "Doctor", minAge: 25, pay: 6000, smarts: 85, looks: 0 },
  { title: "Influencer", minAge: 16, pay: 2000, smarts: 0, looks: 70 },
  { title: "Musician", minAge: 16, pay: 1800, smarts: 0, looks: 40 },
  { title: "Athlete", minAge: 16, pay: 3500, smarts: 0, looks: 50 },
  { title: "Scientist", minAge: 24, pay: 5000, smarts: 80, looks: 0 },
  { title: "CEO", minAge: 30, pay: 10000, smarts: 90, looks: 60 }
];

const sideJobs = [
  { title: "Dog Walker", minAge: 14, pay: 300 },
  { title: "Babysitter", minAge: 14, pay: 400 },
  { title: "Lawn Mower", minAge: 14, pay: 350 },
  { title: "Freelance Writer", minAge: 16, pay: 500 },
  { title: "Delivery Driver", minAge: 18, pay: 600 },
  { title: "Tutoring", minAge: 16, pay: 550 }
];

const kidActivities = [
  { label: "Join Soccer Team", effect: () => { state.happiness += 4; state.health += 2; state.log.push("You joined the soccer team!"); } },
  { label: "Learn Piano", effect: () => { state.smarts += 2; state.happiness += 2; state.log.push("You started learning piano."); } },
  { label: "Read Books", effect: () => { state.smarts += 3; state.log.push("You read a lot of books this year."); } },
  { label: "Join Chess Club", effect: () => { state.smarts += 4; state.happiness += 1; state.log.push("You joined the chess club."); } },
  { label: "Take Art Classes", effect: () => { state.happiness += 3; state.log.push("You took art classes and made a masterpiece (in your mom's eyes)."); } },
  { label: "Scout Group", effect: () => { state.karma += 3; state.happiness += 2; state.log.push("You earned a badge in scouts!"); } }
];

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

  // Kid activities (ages 5-13)
  if (state.age >= 5 && state.age < 14) {
    addMenuBtn("Kid Activities", showKidActivities);
  }

  // Study available for ages 5+
  if (state.age >= 5) addMenuBtn("Study", doStudy);

  // Jobs and side jobs for ages 14+
  if (state.age >= 14) {
    addMenuBtn("Get a Job", showJobMenu);
    addMenuBtn("Get a Side Job", showSideJobMenu);
    if (state.job) addMenuBtn("Work Main Job", doWorkMainJob);
    if (state.sideJob) addMenuBtn("Work Side Job", doWorkSideJob);
    addMenuBtn("Go to Bank", showBankPanel);
    addMenuBtn("Take Out a Loan", showLoanMenu);
    addMenuBtn("View/Repay Loans", showRepayLoanMenu);
    addMenuBtn("Buy Asset", showBuyAssetMenu);
    addMenuBtn("Receive Gift", receiveGift);
    addMenuBtn("Start a Business", businessSimulatorMenu);
    addMenuBtn("Store", showStoreMenu);
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

// --- Store System ---
const storeItems = [
  { name: "Gold Watch", price: 500 },
  { name: "Laptop", price: 1000 },
  { name: "Diamond Ring", price: 2500 },
  { name: "Painting", price: 1500 },
  { name: "Car", price: 5000 }
];

function showStoreMenu() {
  const eventTextDiv = document.getElementById('event-text');
  const choicesDiv = document.getElementById('choices');
  eventTextDiv.innerHTML = 'Store: Purchase items to use as collateral.';
  choicesDiv.innerHTML = '';
  storeItems.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'menu-btn';
    btn.textContent = `${item.name} (${item.price})`;
    btn.onclick = () => {
      if (state.money >= item.price) {
        state.money -= item.price;
        if (!state.items) state.items = [];
        state.items.push(item.name);
        state.log.push(`Purchased ${item.name} for ${item.price}.`);
        saveGame();
        renderLog();
        showStoreMenu();
      } else {
        eventTextDiv.innerHTML = 'Not enough money to purchase this item.';
      }
    };
    choicesDiv.appendChild(btn);
  });
  const backBtn = document.createElement('button');
  backBtn.className = 'menu-btn';
  backBtn.textContent = 'Back';
  backBtn.onclick = renderMenu;
  choicesDiv.appendChild(backBtn);
}

// --- Kid Activities ---
function showKidActivities() {
  const eventTextDiv = document.getElementById('event-text');
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  eventTextDiv.innerHTML = 'Choose an activity:';
  kidActivities.forEach(activity => {
    const btn = document.createElement('button');
    btn.className = 'menu-btn';
    btn.textContent = activity.label;
    btn.onclick = () => {
      activity.effect();
      saveGame();
      renderLog();
      renderMenu();
    };
    choicesDiv.appendChild(btn);
  });
}

// --- Job System ---
function showJobMenu() {
  const eventTextDiv = document.getElementById('event-text');
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  eventTextDiv.innerHTML = 'Available Jobs:';
  jobs.forEach(job => {
    if (state.age >= job.minAge && (!job.smarts || state.smarts >= job.smarts) && (!job.looks || state.looks >= job.looks)) {
      const btn = document.createElement('button');
      btn.className = 'menu-btn';
      btn.textContent = `${job.title} ($${job.pay}/yr)`;
      btn.onclick = () => {
        state.job = job.title;
        state.log.push(`You got a job as a ${job.title}.`);
        saveGame();
        renderLog();
        renderMenu();
      };
      choicesDiv.appendChild(btn);
    }
  });
}

function showSideJobMenu() {
  const eventTextDiv = document.getElementById('event-text');
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  eventTextDiv.innerHTML = 'Available Side Jobs:';
  sideJobs.forEach(job => {
    if (state.age >= job.minAge) {
      const btn = document.createElement('button');
      btn.className = 'menu-btn';
      btn.textContent = `${job.title} ($${job.pay}/yr)`;
      btn.onclick = () => {
        state.sideJob = job.title;
        state.log.push(`You started a side job as a ${job.title}.`);
        saveGame();
        renderLog();
        renderMenu();
      };
      choicesDiv.appendChild(btn);
    }
  });
}

function doWorkMainJob() {
  const eventTextDiv = document.getElementById('event-text');
  const job = jobs.find(j => j.title === state.job);
  if (!job) {
    eventTextDiv.innerHTML = 'No main job found.';
    return;
  }
  state.money += job.pay;
  state.happiness += 2;
  state.log.push(`You worked as a ${job.title} and earned $${job.pay}.`);
  saveGame();
  renderLog();
  renderMenu();
}

function doWorkSideJob() {
  const eventTextDiv = document.getElementById('event-text');
  const job = sideJobs.find(j => j.title === state.sideJob);
  if (!job) {
    eventTextDiv.innerHTML = 'No side job found.';
    return;
  }
  state.money += job.pay;
  state.happiness += 1;
  state.log.push(`You worked your side job as a ${job.title} and earned $${job.pay}.`);
  saveGame();
  renderLog();
  renderMenu();
}

// --- Study and Socialize actions ---
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
  renderLog();
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
  renderLog();
}
