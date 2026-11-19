import { SELECTORS, shouldLimitMotion } from "./config.js";

// Agrupa estados que dependen del scroll: progreso de lectura, header, boton subir y contacto rapido.
export function initScrollState(menuApi) {
  const progressBar = document.querySelector(SELECTORS.progressBar);
  const quickContact = document.querySelector(SELECTORS.quickContact);
  const contactSection = document.querySelector(SELECTORS.contactSection);
  const scrollTopButton = document.querySelector(SELECTORS.scrollTopButton);
  const siteHeader = menuApi?.siteHeader;
  const menuToggle = menuApi?.menuToggle;
  const navList = menuApi?.navList;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (quickContact && contactSection) {
      const contactTop = contactSection.getBoundingClientRect().top;
      quickContact.classList.toggle("is-hidden", contactTop < window.innerHeight * 0.65);
    }

    if (scrollTopButton) {
      scrollTopButton.classList.toggle("visible", scrollTop > 200);
    }

    if (siteHeader && menuToggle && navList) {
      const isScrollingDown = scrollTop > lastScrollY;
      const isNearTop = scrollTop < 120;
      const menuIsOpen = navList.classList.contains("open");

      if (isNearTop || !isScrollingDown || menuIsOpen) {
        siteHeader.classList.remove("is-hidden");
      } else {
        siteHeader.classList.add("is-hidden");
        menuApi.closeMenu();
      }
    }

    lastScrollY = Math.max(scrollTop, 0);
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    requestAnimationFrame(update);
    ticking = true;
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  update();

  scrollTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: shouldLimitMotion ? "auto" : "smooth" });
  });
}
