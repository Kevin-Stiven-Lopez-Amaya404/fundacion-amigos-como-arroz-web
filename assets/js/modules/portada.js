import { gsap, ScrollTrigger } from "../vendor/gsap.js";
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
    document.dispatchEvent(new Event("entrada:cerrada"));
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

// Secuencia de palabras: la pantalla queda fija; con el scroll primero se escribe la frase y luego cambia la palabra.
function initCiclo() {
  const ciclo = document.querySelector(".ciclo");
  if (!ciclo) return;
  const palabras = Array.from(ciclo.querySelectorAll(".ciclo-palabras li"));
  const puntos = Array.from(ciclo.querySelectorAll(".ciclo-puntos span"));
  const frase = ciclo.querySelector(".ciclo-frase");
  const letras = Array.from(frase.textContent, (letra) => {
    const span = document.createElement("span");
    span.textContent = letra;
    return span;
  });
  const cursor = document.createElement("span");
  cursor.className = "ciclo-cursor";
  frase.replaceChildren(...letras);
  // Un tramo para escribir la frase y uno por palabra.
  const tramos = palabras.length + 1;
  let escritas = -1;
  let actual = -2;

  const escribir = (cuantas) => {
    if (cuantas === escritas) return;
    escritas = cuantas;
    letras.forEach((letra, i) => letra.classList.toggle("oculta", i >= cuantas));
    if (cuantas > 0 && cuantas < letras.length) frase.insertBefore(cursor, letras[cuantas]);
    else cursor.remove();
  };
  const mostrar = (indice) => {
    if (indice === actual) return;
    actual = indice;
    palabras.forEach((p, i) => p.classList.toggle("activa", i === indice));
    puntos.forEach((p, i) => p.classList.toggle("activa", i === indice));
  };
  const avanzar = (progreso) => {
    const tramo = progreso * tramos;
    if (tramo < 1 && !prefersLessMotion) {
      escribir(Math.round(Math.min(1, tramo * 1.15) * letras.length));
      mostrar(-1);
    } else {
      escribir(letras.length);
      mostrar(Math.max(0, Math.min(palabras.length - 1, Math.floor(tramo - 1))));
    }
  };

  ciclo.classList.add("ciclo--vivo");
  avanzar(0);
  // Empieza a escribir mientras la pantalla va subiendo: al quedar fija, la frase ya está casi completa.
  ScrollTrigger.create({ trigger: ciclo, start: "top 60%", end: "bottom bottom", onUpdate: (self) => avanzar(self.progress) });
}

// Punto rosa que sigue al cursor (solo con mouse y sin preferencia de menos movimiento).
// Crece sobre enlaces y botones y, sobre las zonas con data-cursor (carruseles, videos), se vuelve una píldora con texto.
function initCursor() {
  if (prefersLessMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const punto = document.createElement("div");
  punto.className = "cursor-punto";
  punto.setAttribute("aria-hidden", "true");
  const texto = document.createElement("span");
  punto.append(texto);
  document.body.append(punto);
  // quickTo reutiliza un solo tween por eje: el punto llega con un pequeño retraso suave.
  const irX = gsap.quickTo(punto, "x", { duration: 0.35, ease: "power3" });
  const irY = gsap.quickTo(punto, "y", { duration: 0.35, ease: "power3" });

  window.addEventListener(
    "pointermove",
    (evento) => {
      irX(evento.clientX);
      irY(evento.clientY);
      punto.classList.add("visible");
    },
    { passive: true }
  );
  document.addEventListener("pointerover", (evento) => {
    const zona = evento.target.closest?.("[data-cursor]");
    texto.textContent = zona?.dataset.cursor || "";
    punto.classList.toggle("con-texto", Boolean(zona));
    punto.classList.toggle("sobre", !zona && Boolean(evento.target.closest?.("a, button, summary, [role='button']")));
  });
  document.documentElement.addEventListener("pointerleave", () => punto.classList.remove("visible"));
}
