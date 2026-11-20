import { animate, scroll } from "../vendor/motion.js";
import { SELECTORS, shouldLimitMotion } from "./config.js";

// Efectos ligados al scroll con motion (ScrollTimeline del navegador cuando existe: no usan el hilo principal).
export function initMotionFx() {
  // Barra de lectura: informa de la posición, así que funciona también con movimiento reducido.
  const bar = document.querySelector(SELECTORS.progressBar);
  if (bar) scroll(animate(bar, { transform: ["scaleX(0)", "scaleX(1)"] }, { ease: "linear" }));

  if (shouldLimitMotion) return;

  // Hero: la foto baja más despacio que la página al salir (profundidad).
  const hero = document.querySelector(SELECTORS.hero);
  const heroImg = hero?.querySelector(".hero-slide.is-active img");
  if (heroImg) {
    // translate y no transform: legacy fija transform: none !important en esta foto.
    scroll(animate(heroImg, { translate: ["0px 0px", "0px 72px"] }, { ease: "linear" }), {
      target: hero,
      offset: ["start start", "end start"]
    });
  }

  // Mejores momentos: la línea de color avanza a medida que se recorre el año.
  const timeline = document.querySelector(".timeline");
  if (timeline) {
    const line = document.createElement("span");
    line.className = "timeline-progress";
    line.setAttribute("aria-hidden", "true");
    timeline.append(line); // al final, para no alterar :nth-child de los momentos
    timeline.classList.add("has-progress");
    scroll(animate(line, { transform: ["scaleY(0)", "scaleY(1)"] }, { ease: "linear" }), {
      target: timeline,
      offset: ["start 70%", "end 70%"]
    });
  }
}
