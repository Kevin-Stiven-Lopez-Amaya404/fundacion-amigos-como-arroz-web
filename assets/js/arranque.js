// Se carga sin defer en el <head> de la portada, antes de pintar: decide la pantalla de entrada y la entrada
// animada del inicio (clases con-entrada e intro), para que no haya parpadeo.
// Entrada: solo en la primera visita de la sesión, nunca con movimiento reducido, ahorro de datos, robots
// ni si se llega con un enlace a una sección.
(function () {
  try {
    var html = document.documentElement;
    var reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ahorro = navigator.connection && navigator.connection.saveData;
    var robot = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp/i.test(navigator.userAgent);
    if (location.hash || reducido) return;
    if (!ahorro && !robot && sessionStorage.getItem("entrada") !== "1") html.classList.add("con-entrada");
    html.classList.add("intro");
  } catch (e) {
    /* Sin almacenamiento o sin matchMedia: la portada se muestra sin entrada. */
  }
})();
