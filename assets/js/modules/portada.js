import { scroll } from "../vendor/motion.js";
import { prefersLessMotion } from "./config.js";

// Efectos propios de la portada: la pantalla de entrada, la secuencia de palabras y el punto que sigue al cursor.
export function initPortada() {
  initEntrada();
  initCiclo();
  initCursor();
}

// Entrada: la decide un script en el <head> (clase con-entrada) para que no parpadee la página.
// Se cierra con el botón, con la rueda, deslizando o con el teclado, y no vuelve en la misma sesión.
function initEntrada() {
  const raiz = document.documentElement;
  const entrada = document.getElementById("entrada");
  if (!entrada || !raiz.classList.contains("con-entrada")) {
    entrada?.remove();
    return;
  }

  entrada.hidden = false;
  const resto = Array.from(document.body.children).filter((el) => el !== entrada && el.tagName !== "SCRIPT");
  resto.forEach((el) => (el.inert = true));
  const boton = entrada.querySelector(".entrada-boton");
  boton.focus({ preventScroll: true });

  const control = new AbortController();
  const cerrar = () => {
    control.abort();
    try {
      sessionStorage.setItem("entrada", "1");
    } catch {
      // Sin almacenamiento (modo privado): la entrada vuelve a salir en la próxima visita, nada más.
    }
    resto.forEach((el) => (el.inert = false));
    raiz.classList.remove("con-entrada");
    window.scrollTo(0, 0);
    const quitar = () => entrada.remove();
    if (prefersLessMotion) return quitar();
    entrada.classList.add("saliendo");
    entrada.addEventListener("transitionend", quitar, { once: true });
    setTimeout(quitar, 1000);
  };

  const opciones = { signal: control.signal, passive: true };
  boton.addEventListener("click", cerrar, { signal: control.signal });
  window.addEventListener("wheel", cerrar, opciones);
  window.addEventListener("touchmove", cerrar, opciones);
  document.addEventListener(
    "keydown",
    (evento) => {
      if (["Escape", "ArrowDown", "PageDown", "End"].includes(evento.key)) cerrar();
    },
    { signal: control.signal }
  );
}

// Secuencia de palabras: la pantalla queda fija mientras el scroll cambia la palabra (Educación, Liderazgo...).
function initCiclo() {
  const ciclo = document.querySelector(".ciclo");
  if (!ciclo) return;
  const palabras = Array.from(ciclo.querySelectorAll(".ciclo-palabras li"));
  const puntos = Array.from(ciclo.querySelectorAll(".ciclo-puntos span"));
  let actual = -1;

  const mostrar = (indice) => {
    if (indice === actual) return;
    actual = indice;
    palabras.forEach((p, i) => p.classList.toggle("activa", i === indice));
    puntos.forEach((p, i) => p.classList.toggle("activa", i === indice));
  };

  ciclo.classList.add("ciclo--vivo");
  mostrar(0);
  scroll((progreso) => mostrar(Math.min(palabras.length - 1, Math.floor(progreso * palabras.length))), {
    target: ciclo,
    offset: ["start start", "end end"]
  });
}

// Punto rosa que sigue al cursor (solo con mouse y sin preferencia de menos movimiento); crece sobre enlaces y botones.
function initCursor() {
  if (prefersLessMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const punto = document.createElement("div");
  punto.className = "cursor-punto";
  punto.setAttribute("aria-hidden", "true");
  document.body.append(punto);

  window.addEventListener(
    "pointermove",
    (evento) => {
      punto.style.transform = `translate(${evento.clientX}px, ${evento.clientY}px)`;
      punto.classList.add("visible");
    },
    { passive: true }
  );
  document.addEventListener("pointerover", (evento) => {
    punto.classList.toggle("sobre", Boolean(evento.target.closest?.("a, button, summary, [role='button']")));
  });
  document.documentElement.addEventListener("pointerleave", () => punto.classList.remove("visible"));
}
