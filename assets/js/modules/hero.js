import { SELECTORS, shouldLimitMotion } from "./config.js";

// Prepara la imagen principal y aplica un movimiento sutil solo en equipos con mouse.
export function initHero() {
  const hero = document.querySelector(SELECTORS.hero);
  const heroContent = document.querySelector(SELECTORS.heroContent);

  requestAnimationFrame(() => {
    heroContent?.classList.add("is-ready");
  });

  if (!hero || shouldLimitMotion || !window.matchMedia("(pointer: fine)").matches) return;

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    hero.style.setProperty("--hero-x", `${48 + (x - 50) * 0.04}%`);
    hero.style.setProperty("--hero-y", `${50 + (y - 50) * 0.04}%`);
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.setProperty("--hero-x", "50%");
    hero.style.setProperty("--hero-y", "50%");
  });
}
