import { state, saveGame } from './state.js';

export function initRelationships() {
  if (!state.relationships) {
    state.relationships = [
      { type: "parent", name: "Alice", happiness: 80 },
      { type: "parent", name: "Bob", happiness: 75 }
    ];
    saveGame();
  }
}

export function makeFriend() {
  if (!state.relationships) initRelationships();
  const names = ["Charlie", "Dana", "Eli", "Frank", "Grace", "Harper"];
  const name = names[Math.floor(Math.random() * names.length)];
  state.relationships.push({ type: "friend", name, happiness: 60 + Math.floor(Math.random() * 21) });
  state.log.push(`You made a new friend: ${name}.`);
  saveGame();
}

export function loseFriend() {
  if (!state.relationships) initRelationships();
  const friends = state.relationships.filter(r => r.type === "friend");
  if (friends.length) {
    const idx = state.relationships.indexOf(friends[Math.floor(Math.random() * friends.length)]);
    const lost = state.relationships[idx].name;
    state.relationships.splice(idx, 1);
    state.log.push(`You lost a friend: ${lost}.`);
    saveGame();
  }
}

export function renderRelationships() {
  if (!state.relationships) initRelationships();
  const relDiv = document.createElement('div');
  relDiv.innerHTML = `<h3>Relationships</h3>`;
  state.relationships.forEach(r => {
    relDiv.innerHTML += `<div>${r.type === "parent" ? "👨‍👩‍👧" : "👫"} <b>${r.name}</b> (Happiness: ${r.happiness})</div>`;
  });
  return relDiv;
}
