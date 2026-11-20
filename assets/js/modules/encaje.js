// Fotos sin recortar a nadie: en las cajas de forma fija la foto se muestra entera (object-fit: contain)
// y el espacio que sobra se rellena con la misma foto desenfocada, detrás. Sin JS la foto igual se ve entera.
const CAJAS = [
  ".historia:not(.timeline-item) > img", // tarjetas de talentos, historias y equipo
  ".historia-foto img", // foto de «Nuestra historia»
  ".local-video-loader img", // pósters de los videos
  ".pagina-portada > .pantalla-fondo img" // portada de las páginas internas
];

export function initEncaje() {
  document.querySelectorAll(CAJAS.join(",")).forEach((foto) => {
    const relleno = document.createElement("img");
    relleno.className = "encaje-relleno";
    relleno.alt = "";
    relleno.setAttribute("aria-hidden", "true");
    relleno.decoding = "async";
    relleno.loading = foto.loading || "lazy";
    // Para el desenfoque basta la versión más chica: es la primera del srcset.
    relleno.src = foto.getAttribute("srcset")?.split(",")[0].trim().split(" ")[0] || foto.currentSrc || foto.src;
    // En los videos el relleno va fuera del botón, para que siga detrás cuando el video reemplaza al botón.
    const boton = foto.closest(".local-video-loader");
    (boton || foto).before(relleno);
    foto.classList.add("encajada");
  });
}
