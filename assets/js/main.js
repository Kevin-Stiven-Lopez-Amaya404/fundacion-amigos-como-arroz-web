/*
  Interacciones principales de la portada (se carga con <script type="module">).

  - modules/config.js centraliza selectores, preferencias de movimiento y datos de contacto.
  - Cada módulo de modules/ configura una sola funcionalidad (init*).
  - Aquí se inicializan en un orden claro.
*/
import { initHero } from "./modules/hero.js";
import { initMenu } from "./modules/menu.js";
import { initActiveSection } from "./modules/active-section.js";
import { initReveal } from "./modules/reveal.js";
import { initScrollState } from "./modules/scroll-state.js";
import { initContactForm } from "./modules/contact-form.js";
import { initTeamSlider } from "./modules/team-slider.js";
import { initLazyVideos } from "./modules/lazy-videos.js";
import { initStoryBook } from "./modules/story-book.js";
import { initChatbot } from "./modules/chatbot.js";
import { initMeta } from "./modules/meta.js";
import { initMotionFx } from "./modules/motion-fx.js";

// Inicializacion general del sitio.
const menuApi = initMenu();
initMeta();
initHero();
initActiveSection();
initReveal();
initScrollState(menuApi);
initContactForm();
initTeamSlider();
initLazyVideos();
initStoryBook();
initChatbot();
initMotionFx();
