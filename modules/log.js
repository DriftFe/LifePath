import { state } from './state.js';

export function renderLog() {
  document.getElementById('life-log').innerHTML = state.log.slice(-8).map(line => `<div class="log-flash">${line}</div>`).join('');
  setTimeout(() => {
    Array.from(document.getElementById('life-log').children).forEach(el => el.classList.remove('log-flash'));
  }, 1000);
}
