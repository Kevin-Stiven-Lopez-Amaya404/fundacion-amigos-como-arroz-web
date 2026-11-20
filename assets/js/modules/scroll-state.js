// Barra superior que se oculta al bajar y reaparece al subir (el indicador de historias está en historias.js).
export function initScrollState(menuApi) {
  const siteHeader = menuApi?.siteHeader;
  const menuToggle = menuApi?.menuToggle;
  const navList = menuApi?.navList;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const update = () => {
    const scrollTop = window.scrollY;

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
}
