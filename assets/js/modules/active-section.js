import { SELECTORS } from "./config.js";

// Marca automaticamente el enlace activo del menu segun la seccion visible en pantalla.
export function initActiveSection() {
  const navLinks = document.querySelectorAll(SELECTORS.navLinks);
  const sections = document.querySelectorAll(SELECTORS.sections);

  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeId = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });
      });
    },
    {
      threshold: 0.35,
      rootMargin: "-18% 0px -58% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
}
