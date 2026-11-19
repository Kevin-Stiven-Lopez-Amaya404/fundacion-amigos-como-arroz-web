import { SELECTORS } from "./config.js";

// Carga videos solo cuando el usuario hace clic para evitar peso inicial innecesario.
export function initLazyVideos() {
  document.querySelectorAll(SELECTORS.localVideoLoader).forEach((button) => {
    button.addEventListener("click", () => {
      const videoSrc = button.dataset.videoSrc;
      if (!videoSrc) return;

      const video = document.createElement("video");
      video.className = button.className.replace("local-video-loader", "").trim();
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.poster = button.dataset.poster || "";
      video.setAttribute("aria-label", button.dataset.label || "Video");

      const source = document.createElement("source");
      source.src = videoSrc;
      source.type = "video/mp4";

      video.appendChild(source);
      video.append("Tu navegador no puede reproducir este video.");
      button.replaceWith(video);
      video.play().catch(() => {});
    });
  });
}
