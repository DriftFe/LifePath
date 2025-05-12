import { state, saveGame } from './state.js';

const events = [
  {
    minAge: 0,
    maxAge: 4,
    text: "You learned to walk!",
    effect: (s) => { s.happiness += 2; }
  },
  {
    minAge: 5,
    maxAge: 12,
    text: "You made a new friend at school.",
    effect: (s) => { s.happiness += 3; }
  },
  {
    minAge: 13,
    maxAge: 18,
    text: "You got a great grade on your test.",
    effect: (s) => { s.smarts += 2; }
  },
  {
    minAge: 16,
    maxAge: 99,
    text: "You got into a minor accident, but you're okay.",
    effect: (s) => { s.health -= 5; }
  },
  {
    minAge: 10,
    maxAge: 99,
    text: "You found $20 on the street!",
    effect: (s) => { s.money += 20; }
  },
  {
    minAge: 18,
    maxAge: 99,
    text: "You volunteered at a charity event.",
    effect: (s) => { s.happiness += 4; }
  }
];

export function triggerRandomEvent() {
  // Find events for current age
  const possible = events.filter(e => state.age >= e.minAge && state.age <= e.maxAge);
  if (possible.length && Math.random() < 0.3) { // 30% chance per year
    const ev = possible[Math.floor(Math.random() * possible.length)];
    ev.effect(state);
    state.log.push(ev.text);
    saveGame();
    return ev.text;
  }
  return null;
}
