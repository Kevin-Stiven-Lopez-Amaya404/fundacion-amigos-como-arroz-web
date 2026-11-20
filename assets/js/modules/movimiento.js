import { animate, scroll } from "../vendor/motion.js";
import { prefersLessMotion, shouldLimitMotion } from "./config.js";

// Movimiento al estilo de la presentación de marca: mismos tiempos y curvas que la referencia de diseño.
const EXPO = [0.16, 1, 0.3, 1];
const EN_VAIVEN = [0.65, 0, 0.35, 1];
const REVELAR = { duration: 0.5, ease: EXPO };
const INICIO = { duration: 1.2, ease: EXPO };

export function initMovimiento() {
  if (prefersLessMotion) return;
  initIntroInicio();
  initInicioAlBajar();
  initTitulos();
  initRebote();
  // Los efectos con desenfoque cuestan más: solo en equipos que van sobrados.
  if (shouldLimitMotion) return;
  initTextoSonador();
  initEspinal();
}

// Al cerrar la entrada: la foto crece y el texto sube por partes, como al arrancar la presentación.
function initIntroInicio() {
  const hero = document.querySelector(".hero");
  if (!hero || !document.documentElement.classList.contains("con-entrada")) return;
  const subir = (el, delay, desde = "0 30px", opciones = REVELAR) =>
    el && animate(el, { opacity: [0, 1], translate: [desde, "0 0"] }, { ...opciones, delay });

  document.addEventListener(
    "entrada:cerrada",
    () => {
      const fondo = hero.querySelector(".pantalla-fondo");
      animate(fondo, { scale: [0.6, 1] }, { ...INICIO, delay: 0.3 });
      animate(fondo.querySelectorAll("img"), { opacity: [0, 1] }, { ...REVELAR, delay: 0.3 });
      hero.querySelectorAll(".hero-title span").forEach((linea, i) => subir(linea, 0.9 + i * 0.12, "0 40px", INICIO));
      subir(hero.querySelector(".hero-badge"), 0.95, "0 -10px");
      subir(hero.querySelector(".hero-kicker"), 1.1);
      subir(hero.querySelector(".hero-description"), 1.1);
      subir(hero.querySelector(".hero-actions"), 1.2);
      animate(hero.querySelectorAll(".hero-sello, .siguiente"), { opacity: [0, 1] }, { ...REVELAR, delay: (i) => 1.2 + i * 0.15 });
    },
    { once: true }
  );
}

// Al bajar, la foto del inicio se aleja y se apaga.
function initInicioAlBajar() {
  const hero = document.querySelector(".hero");
  const fondo = hero?.querySelector(".pantalla-fondo");
  if (!fondo) return;
  scroll(animate(fondo, { transform: ["translateY(0) scale(1)", "translateY(90px) scale(0.94)"], opacity: [1, 0.3] }, { ease: "linear" }), {
    target: hero,
    offset: ["start start", "end start"]
  });
}

// Títulos de sección: se pintan de izquierda a derecha la primera vez que entran (máscara en CSS).
function initTitulos() {
  const titulos = document.querySelectorAll("main section h2");
  if (!("IntersectionObserver" in window)) return;
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        observador.unobserve(target);
        target.classList.add("barrido--listo");
        // Ya pintado: se quita la máscara para que el título quede como cualquier texto.
        target.addEventListener("transitionend", () => target.classList.remove("barrido", "barrido--listo"), { once: true });
      });
    },
    { threshold: 0.4 }
  );
  titulos.forEach((titulo) => {
    titulo.classList.add("barrido");
    observador.observe(titulo);
  });
}

// «Sigue» da dos saltitos si la persona lleva 5 segundos quieta arriba de la página.
function initRebote() {
  const sigue = document.querySelector(".siguiente");
  if (!sigue) return;
  let espera;
  const armar = () => {
    clearTimeout(espera);
    espera = setTimeout(() => {
      if (window.scrollY < 80 && !document.documentElement.classList.contains("con-entrada")) {
        animate(sigue, { translate: ["0 0", "0 -8px", "0 0", "0 -8px", "0 0"] }, { duration: 1.2, ease: EN_VAIVEN, times: [0, 0.25, 0.5, 0.75, 1] });
      }
      armar();
    }, 5000);
  };
  ["scroll", "pointermove", "keydown", "touchstart"].forEach((evento) => window.addEventListener(evento, armar, { passive: true }));
  armar();
}

// Intro de programas: cada línea aparece desde un desenfoque al llegar y se va igual al salir.
function initTextoSonador() {
  const intro = document.querySelector(".programas-intro");
  const encabezado = intro?.querySelector(".section-header");
  if (!encabezado) return;
  encabezado.classList.remove("reveal");
  const lineas = [encabezado.querySelector(".eyebrow"), encabezado.querySelector("h2"), encabezado.querySelector(".lead")].filter(Boolean);
  lineas.forEach((linea, i) => {
    const retraso = i * 0.04;
    const tramos = [0.12 + retraso, 0.38 + retraso, 0.62 - retraso, 0.88 - retraso];
    const efecto = animate(
      linea,
      {
        opacity: [0, 0, 1, 1, 0, 0],
        filter: ["blur(16px)", "blur(16px)", "blur(0px)", "blur(0px)", "blur(16px)", "blur(16px)"],
        translate: ["0 2.5rem", "0 2.5rem", "0 0", "0 0", "0 -2.5rem", "0 -2.5rem"]
      },
      { ease: "linear", times: [0, ...tramos, 1] }
    );
    scroll(efecto, { target: intro, offset: ["start end", "end start"] });
  });
}

// Sede Espinal: la foto se acerca a su sitio y ESPINAL aparece desde un desenfoque fuerte.
function initEspinal() {
  const sede = document.querySelector(".sede-espinal-section");
  if (!sede) return;
  const rango = { target: sede, offset: ["start end", "start start"] };
  const foto = sede.querySelector(".pantalla-fondo img");
  if (foto) scroll(animate(foto, { scale: [1.15, 1] }, { ease: "linear" }), rango);
  const palabra = sede.querySelector(".palabra-gigante");
  if (palabra) {
    scroll(
      animate(palabra, { opacity: [0, 0, 1], filter: ["blur(36px)", "blur(36px)", "blur(0px)"] }, { ease: "linear", times: [0, 0.45, 1] }),
      rango
    );
  }
}
