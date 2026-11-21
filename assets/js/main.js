/*
  Interacciones principales de la portada (se carga con <script type="module">).

  - modules/config.js centraliza selectores, preferencias de movimiento y datos de contacto.
  - Cada módulo de modules/ configura una sola funcionalidad (init*).
  - Aquí se inicializan en un orden claro.
*/
import { initMenu } from "./modules/menu.js";
import { initActiveSection } from "./modules/active-section.js";
import { initReveal } from "./modules/reveal.js";
import { initContactForm } from "./modules/contact-form.js";
import { initTeamSlider } from "./modules/team-slider.js";
import { initLazyVideos } from "./modules/lazy-videos.js";
import { initEncaje } from "./modules/encaje.js";
import { initStoryBook } from "./modules/story-book.js";
import { initChatbot } from "./modules/chatbot.js";
import { initHistorias } from "./modules/historias.js";
import { initCompartir } from "./modules/compartir.js";
import { initEventos } from "./modules/eventos.js";
import { initCookies } from "./modules/cookies.js";
import { initPortada } from "./modules/portada.js";
import { initMovimiento } from "./modules/movimiento.js";

// Inicializacion general del sitio.
initMenu();
initActiveSection();
initReveal();
initContactForm();
initTeamSlider();
initEncaje();
initLazyVideos();
initStoryBook();
initChatbot();
initHistorias();
initCompartir();
initEventos();
initCookies();
initMovimiento();
initPortada();
