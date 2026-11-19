import { SELECTORS } from "./config.js";

// Móvil: un solo botón despliega WhatsApp, redes y el asistente (en escritorio el CSS oculta el botón).
export function initFloatingContact() {
  const dock = document.querySelector(SELECTORS.quickContact);
  const toggle = document.querySelector(SELECTORS.dockToggle);
  if (!dock || !toggle) return;

  const setOpen = (isOpen) => {
    dock.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar opciones de contacto" : "Abrir opciones de contacto");
  };

  toggle.addEventListener("click", () => setOpen(!dock.classList.contains("is-open")));

  document.addEventListener("click", (event) => {
    if (!dock.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dock.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  dock.querySelector(SELECTORS.openChat)?.addEventListener("click", () => {
    setOpen(false);
    document.querySelector(SELECTORS.chatbotToggle)?.click();
  });
}
