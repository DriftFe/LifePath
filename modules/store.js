import { state, saveGame } from './state.js';
import { renderLog } from './log.js';

const storeItems = [
  { name: 'Laptop', value: 900, type: 'Electronics' },
  { name: 'Smartphone', value: 700, type: 'Electronics' },
  { name: 'Tablet', value: 400, type: 'Electronics' },
  { name: 'Gaming Console', value: 500, type: 'Electronics' },
  { name: 'TV', value: 800, type: 'Electronics' },
  { name: 'Headphones', value: 150, type: 'Electronics' },
  { name: 'Camera', value: 350, type: 'Electronics' },
  { name: 'Bicycle', value: 250, type: 'Vehicle' },
  { name: 'Scooter', value: 300, type: 'Vehicle' },
  { name: 'Motorcycle', value: 2500, type: 'Vehicle' },
  { name: 'Car', value: 12000, type: 'Vehicle' },
  { name: 'Sports Car', value: 35000, type: 'Vehicle' },
  { name: 'Luxury Car', value: 80000, type: 'Vehicle' },
  { name: 'Boat', value: 20000, type: 'Vehicle' },
  { name: 'Yacht', value: 250000, type: 'Vehicle' },
  { name: 'Sofa', value: 600, type: 'Furniture' },
  { name: 'Bed', value: 400, type: 'Furniture' },
  { name: 'Dining Table', value: 700, type: 'Furniture' },
  { name: 'Wardrobe', value: 350, type: 'Furniture' },
  { name: 'Bookshelf', value: 200, type: 'Furniture' },
  { name: 'Painting', value: 1500, type: 'Collectible' },
  { name: 'Rare Coin', value: 800, type: 'Collectible' },
  { name: 'Antique Vase', value: 2200, type: 'Collectible' },
  { name: 'Designer Watch', value: 3000, type: 'Luxury' },
  { name: 'Diamond Ring', value: 5000, type: 'Luxury' },
  { name: 'Gold Necklace', value: 2500, type: 'Luxury' },
  { name: 'Perfume', value: 120, type: 'Luxury' },
  { name: 'Guitar', value: 400, type: 'Hobby' },
  { name: 'Piano', value: 3500, type: 'Hobby' },
  { name: 'Drum Set', value: 900, type: 'Hobby' },
  { name: 'Telescope', value: 600, type: 'Hobby' },
  { name: 'Board Game', value: 60, type: 'Hobby' },
  { name: 'Book', value: 40, type: 'Hobby' },
  { name: 'Pet Dog', value: 800, type: 'Pet' },
  { name: 'Pet Cat', value: 600, type: 'Pet' },
  { name: 'Parrot', value: 350, type: 'Pet' },
  { name: 'Hamster', value: 80, type: 'Pet' },
  { name: 'Fish Tank', value: 200, type: 'Pet' },
  { name: 'Mountain Bike', value: 700, type: 'Vehicle' },
  { name: 'Electric Scooter', value: 900, type: 'Vehicle' },
  { name: 'VR Headset', value: 400, type: 'Electronics' },
  { name: 'Smartwatch', value: 250, type: 'Electronics' },
  { name: 'Tablet Pro', value: 900, type: 'Electronics' },
  { name: 'E-Reader', value: 120, type: 'Electronics' },
  { name: 'Designer Bag', value: 1800, type: 'Luxury' },
  { name: 'Sculpture', value: 2200, type: 'Collectible' },
  { name: 'Electric Guitar', value: 700, type: 'Hobby' },
  { name: 'Skateboard', value: 150, type: 'Hobby' },
  { name: 'Rollerblades', value: 120, type: 'Hobby' }
];

export function showStoreMenu() {
  const menuDiv = document.getElementById('menu');
  const choicesDiv = document.getElementById('choices');
  const eventTextDiv = document.getElementById('event-text');
  menuDiv.innerHTML = '';
  choicesDiv.innerHTML = '';
  eventTextDiv.innerHTML = 'Welcome to the Store! Select an item to buy:';
  storeItems.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = 'menu-btn';
    btn.textContent = `${item.name} ($${item.value}) [${item.type}]`;
    btn.onclick = () => {
      if (state.money < item.value) {
        eventTextDiv.innerHTML = `Not enough money for ${item.name}.`;
        return;
      }
      state.money -= item.value;
      state.assets.push({ name: item.name, value: item.value });
      state.log.push(`You bought a ${item.name} for $${item.value}.`);
      saveGame();
      renderLog();
      showStoreMenu();
    };
    choicesDiv.appendChild(btn);
  });
}
