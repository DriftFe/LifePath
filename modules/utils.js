import { state, saveGame } from './state.js';
import { render } from '../main.js';

const randomEvents = [
  {
    text: "You found $20 on the street!",
    effect: () => { state.money += 20; state.karma += 2; }
  },
  {
    text: "You helped an old lady cross the road. (+karma)",
    effect: () => { state.karma += 5; state.happiness += 2; }
  },
  {
    text: "You got food poisoning from a dodgy taco.",
    effect: () => { state.health -= 10; state.karma -= 1; }
  },
  {
    text: "You aced a trivia night! (+smarts)",
    effect: () => { state.smarts += 3; state.happiness += 1; }
  },
  {
    text: "You tripped in public. Oops!",
    effect: () => { state.happiness -= 2; }
  },
  {
    text: "You donated to charity. (+karma)",
    effect: () => { state.karma += 7; state.money -= 10; }
  },
  {
    text: "You adopted a stray cat. (+happiness)",
    effect: () => { state.happiness += 5; state.karma += 2; }
  },
  {
    text: "You got a parking ticket. (-money)",
    effect: () => { state.money -= 30; }
  },
  {
    text: "You went viral on social media! (+looks)",
    effect: () => { state.looks += 4; state.happiness += 2; }
  },
  {
    text: "You lost your wallet. (-money)",
    effect: () => { state.money -= 50; state.karma -= 2; }
  },
  // --- New Events ---
  {
    text: "You won a small lottery prize! (+$100)",
    effect: () => { state.money += 100; state.happiness += 3; }
  },
  {
    text: "You accidentally sent a text to your boss meant for your friend. Awkward!",
    effect: () => { state.happiness -= 3; }
  },
  {
    text: "You rescued a puppy from the rain. (+karma, +happiness)",
    effect: () => { state.karma += 4; state.happiness += 3; }
  },
  {
    text: "You binge-watched an entire TV series in one weekend.",
    effect: () => { state.happiness += 2; state.smarts -= 1; }
  },
  {
    text: "You got a sunburn at the beach.",
    effect: () => { state.health -= 3; }
  },
  {
    text: "You made a new best friend! (+happiness)",
    effect: () => { state.happiness += 6; }
  },
  {
    text: "You lost a bet and had to wear a silly costume for a day.",
    effect: () => { state.happiness -= 1; state.karma += 1; }
  },
  {
    text: "You learned to cook a new dish. (+smarts)",
    effect: () => { state.smarts += 2; }
  },
  {
    text: "You accidentally dyed your hair green.",
    effect: () => { state.looks -= 2; state.happiness += 1; }
  },
  {
    text: "You found a four-leaf clover. (+karma)",
    effect: () => { state.karma += 3; }
  },
  {
    text: "You got caught in the rain without an umbrella.",
    effect: () => { state.happiness -= 2; }
  },
  {
    text: "You were photobombed by a celebrity! (+happiness)",
    effect: () => { state.happiness += 4; }
  },
  {
    text: "You broke your phone screen. (-money)",
    effect: () => { state.money -= 80; }
  },
  {
    text: "You got a compliment from a stranger. (+happiness)",
    effect: () => { state.happiness += 2; }
  },
  {
    text: "You accidentally locked yourself out of your house.",
    effect: () => { state.happiness -= 2; state.karma -= 1; }
  },
  {
    text: "You won a pie-eating contest! (+happiness, +health)",
    effect: () => { state.happiness += 3; state.health += 2; }
  },
  {
    text: "You got a mysterious letter in the mail. (+smarts)",
    effect: () => { state.smarts += 1; }
  },
  {
    text: "You accidentally broke a neighbor's window. (-karma, -money)",
    effect: () => { state.karma -= 3; state.money -= 40; }
  },
  {
    text: "You were mistaken for a famous person.",
    effect: () => { state.looks += 2; state.happiness += 1; }
  },
  {
    text: "You got food stuck in your teeth during a date.",
    effect: () => { state.happiness -= 2; }
  },
  {
    text: "You found a cool rock. (+happiness)",
    effect: () => { state.happiness += 1; }
  },
  {
    text: "You got a free coffee from a barista! (+happiness)",
    effect: () => { state.happiness += 2; }
  },
  {
    text: "You accidentally sent a meme to your teacher.",
    effect: () => { state.happiness -= 1; state.smarts -= 1; }
  }
];

function getRandomEvent() {
  return randomEvents[Math.floor(Math.random() * randomEvents.length)];
}

function getRandomDeathCause() {
  const causes = [
    "choked on a hotdog at a competitive eating contest.",
    "slipped on a banana peel in front of a crowd.",
    "laughed so hard at a meme you couldn't breathe.",
    "tried to pet a wild raccoon.",
    "mistook super glue for eye drops.",
    "got abducted by aliens (probably).",
    "became too powerful for this world.",
    "forgot how to breathe for a moment too long.",
    "was defeated by a rogue Roomba.",
    "tripped over your own shoelaces."
  ];
  return causes[Math.floor(Math.random() * causes.length)];
}

function getAfterlifeSummary() {
  let summary = `You lived to age ${state.age}.`;
  if (state.job) summary += ` You worked as a ${state.job}.`;
  if (state.education) summary += ` You studied ${state.education}.`;
  if (state.assets && state.assets.length > 0) summary += ` You owned: ${state.assets.join(", ")}.`;
  if (state.business) summary += ` You ran a business: ${state.business}.`;
  summary += ` Your karma was ${state.karma}.`;
  summary += `\n\nSilly legacy: `;
  const legacies = [
    "You will be remembered for your questionable dance moves.",
    "Your cat inherits your fortune.",
    "You set a world record for most naps taken.",
    "Your meme collection is now legendary.",
    "You never learned to whistle.",
    "You were banned from three buffets.",
    "You always put pineapple on pizza.",
    "You were a professional couch potato.",
    "You invented a new handshake nobody understood.",
    "You were the neighborhood's mysterious midnight snacker."
  ];
  summary += legacies[Math.floor(Math.random() * legacies.length)];
  return summary;
}

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

    if (state.assets && state.assets.length > 0) {
    state.assets.forEach(asset => {
      // Value can go up or down by up to 20%
      const change = 1 + (Math.random() * 0.4 - 0.2);
      asset.value = Math.max(10, Math.round(asset.value * change));
    });
  }

    if (state.loans && state.loans.length > 0) {
    state.loans.forEach(loan => {
      if (loan.repaid) return;
            const asset = state.assets && state.assets.find(a => a.name === loan.collateral);
      if (!asset) {
                state.happiness -= 10;
        state.karma -= 5;
        state.log.push(`You defaulted on a loan! The bank is after you for your missing ${loan.collateral}.`);
        loan.repaid = true;
        return;
      }
      if (asset.value < loan.amount) {
                state.happiness -= 8;
        state.karma -= 3;
        state.log.push(`Your ${asset.name} dropped in value below your loan! The bank repossessed it and your credit is hurt.`);
                state.assets = state.assets.filter(a => a !== asset);
        loan.repaid = true;
        return;
      }
            if (!loan.years) loan.years = 1; else loan.years++;
      if (loan.years > 3) {
        if (state.money >= loan.amount) {
          state.money -= loan.amount;
          state.log.push(`Your loan for ${loan.collateral} was auto-repaid after 3 years.`);
          loan.repaid = true;
        } else {
          state.happiness -= 12;
          state.karma -= 7;
          state.log.push(`You failed to repay your loan for ${loan.collateral} after 3 years. The bank sues you and your credit is ruined!`);
                    state.assets = state.assets.filter(a => a !== asset);
          loan.repaid = true;
        }
      }
    });
  }

  // Random event
  if (Math.random() < 0.7) { // 70% chance for a random event
    const event = getRandomEvent();
    event.effect();
    state.log.push(event.text);
  }

  // Random death check (affected by karma)
  const baseDeathChance = 0.01 + (state.age > 60 ? (state.age - 60) * 0.01 : 0); // Increases with age
  const karmaModifier = (50 - state.karma) * 0.0008; // Bad karma increases risk
  const deathChance = baseDeathChance + karmaModifier;
  if (Math.random() < deathChance) {
    state.alive = false;
    const cause = getRandomDeathCause();
    state.log.push(`You died: ${cause}`);
    state.log.push(getAfterlifeSummary());
    saveGame();
    render();
    return;
  }

  if (state.health <= 0 || state.happiness <= 0) {
    state.alive = false;
    state.log.push("You died.");
    state.log.push(getAfterlifeSummary());
    saveGame();
    render();
    return;
  }
  saveGame();
  render();
}
