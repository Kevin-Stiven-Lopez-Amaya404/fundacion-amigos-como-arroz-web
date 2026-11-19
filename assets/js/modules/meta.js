import { SELECTORS } from "./config.js";

// Actualiza pequenos datos dinamicos, como el ano del footer.
export function initMeta() {
  const currentYear = document.querySelector(SELECTORS.currentYear);
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}
