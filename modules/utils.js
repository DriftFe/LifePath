import { state, saveGame } from './state.js';
import { render } from '../main.js';

export function ageUp() {
  if (!state.alive) return;
  if (state.inJail) {
    state.yearsInJail -= 1;
    state.happiness -= 10;
    state.health -= 5;
    if (state.yearsInJail <= 0) {
      state.inJail = false;
      state.log.push("You were released from jail.");
    } else {
      state.log.push("You spent a year in jail.");
    }
    saveGame();
    render();
    return;
  }
  state.age += 1;
  state.log.push(`You turned ${state.age} years old.`);
  if (state.health <= 0 || state.happiness <= 0) {
    state.alive = false;
    state.log.push("You died.");
    saveGame();
    render();
    return;
  }
  saveGame();
  render();
}
