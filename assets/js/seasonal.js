/*
  Temporadas del sitio (Navidad y futuras campañas).

  CÓMO ENCENDER O APAGAR LA NAVIDAD
  ---------------------------------
  Cambia solo SEASON_CONFIG.mode:
    "auto" -> se activa sola entre las fechas de SEASON_CONFIG.window (recomendado).
    "on"   -> siempre activa.
    "off"  -> siempre apagada (el sitio queda exactamente como sin temporada).

  Para probar sin tocar el código, abre la página con:
    ?temporada=navidad   (fuerza la temporada)
    ?temporada=off       (la apaga)

  Este archivo se carga en el <head> SIN defer a propósito: así marca
  <html data-season="navidad"> antes de pintar y no hay parpadeo de estilos.
  Todo lo visual vive en assets/css/seasonal/navidad.css y solo se aplica
  cuando existe ese atributo.
*/
(function () {
  "use strict";

  const SEASON_CONFIG = {
    name: "navidad",
    mode: "auto",
    // Formato MM-DD. El rango puede cruzar el año (15 nov -> 6 ene).
    window: { from: "11-15", to: "01-06" },
    themeColor: "#9e1b32",
    // Copos simultáneos. En móvil se usa la versión reducida.
    snowflakes: { desktop: 14, mobile: 6 }, // pocos y tenues: decoran sin tapar el texto
    storageKey: "fac-nieve"
  };

  const root = document.documentElement;

  const isInWindow = (today, from, to) => {
    const md = (today.getMonth() + 1) * 100 + today.getDate();
    const toNum = (value) => {
      const [month, day] = value.split("-").map(Number);
      return month * 100 + day;
    };
    const start = toNum(from);
    const end = toNum(to);
    return start <= end ? md >= start && md <= end : md >= start || md <= end;
  };

  const resolveSeason = () => {
    let override = null;
    try {
      override = new URLSearchParams(window.location.search).get("temporada");
    } catch (error) {
      override = null;
    }

    if (override === "off") return null;
    if (override === SEASON_CONFIG.name) return SEASON_CONFIG.name;
    if (SEASON_CONFIG.mode === "on") return SEASON_CONFIG.name;
    if (SEASON_CONFIG.mode === "auto" && isInWindow(new Date(), SEASON_CONFIG.window.from, SEASON_CONFIG.window.to)) {
      return SEASON_CONFIG.name;
    }
    return null;
  };

  const season = resolveSeason();
  if (!season) return;

  root.dataset.season = season;

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute("content", SEASON_CONFIG.themeColor);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isSmall = window.matchMedia("(max-width: 760px)");

  const readSnowPreference = () => {
    try {
      return window.localStorage.getItem(SEASON_CONFIG.storageKey) !== "off";
    } catch (error) {
      return true;
    }
  };

  const saveSnowPreference = (isOn) => {
    try {
      window.localStorage.setItem(SEASON_CONFIG.storageKey, isOn ? "on" : "off");
    } catch (error) {
      /* Almacenamiento no disponible: la preferencia dura solo esta visita. */
    }
  };

  // Muestra los bloques marcados con data-season-only="navidad" (vienen con hidden en el HTML).
  const revealSeasonBlocks = () => {
    document.querySelectorAll(`[data-season-only="${season}"]`).forEach((element) => {
      element.hidden = false;
    });
  };

  // Guirnalda de luces bajo la barra superior. Decorativa: aria-hidden.
  const buildGarland = () => {
    const header = document.querySelector(".site-header, .program-detail-header");
    if (!header || header.querySelector(".xmas-garland")) return;

    const garland = document.createElement("div");
    garland.className = "xmas-garland";
    garland.setAttribute("aria-hidden", "true");

    const bulbs = Math.min(70, Math.ceil(window.screen.width / 46) + 1);
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < bulbs; index += 1) {
      const bulb = document.createElement("span");
      bulb.style.setProperty("--i", String(index));
      fragment.appendChild(bulb);
    }
    garland.appendChild(fragment);
    header.appendChild(garland);
  };

  // Nieve y destellos: solo transform/opacity (GPU), sin eventos de scroll.
  let snowLayer = null;

  const buildSnow = () => {
    if (snowLayer || reduceMotion.matches) return;

    snowLayer = document.createElement("div");
    snowLayer.className = "xmas-snow";
    snowLayer.setAttribute("aria-hidden", "true");

    const total = isSmall.matches ? SEASON_CONFIG.snowflakes.mobile : SEASON_CONFIG.snowflakes.desktop;
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < total; index += 1) {
      const flake = document.createElement("span");
      const isSparkle = index % 4 === 0;
      flake.className = isSparkle ? "xmas-flake xmas-flake--sparkle" : "xmas-flake";
      flake.style.setProperty("--x", `${Math.round(Math.random() * 100)}vw`);
      flake.style.setProperty("--size", `${(isSparkle ? 8 : 4) + Math.random() * 5}px`);
      flake.style.setProperty("--duration", `${11 + Math.random() * 12}s`);
      flake.style.setProperty("--delay", `${-Math.random() * 20}s`);
      flake.style.setProperty("--drift", `${Math.round(Math.random() * 80 - 40)}px`);
      flake.style.setProperty("--alpha", (0.35 + Math.random() * 0.3).toFixed(2));
      fragment.appendChild(flake);
    }

    snowLayer.appendChild(fragment);
    document.body.appendChild(snowLayer);
  };

  const removeSnow = () => {
    snowLayer?.remove();
    snowLayer = null;
  };

  // Botón para pausar la nieve (WCAG 2.2.2: todo movimiento de más de 5 s debe poder detenerse).
  const buildSnowToggle = () => {
    const shell = document.querySelector(".site-header .nav-shell, .program-detail-nav");
    if (!shell || reduceMotion.matches || shell.querySelector(".xmas-snow-toggle")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "xmas-snow-toggle";
    button.innerHTML =
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' +
      '<path d="M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17M9.2 3.6 12 5.8l2.8-2.2M9.2 20.4 12 18.2l2.8 2.2M3.6 10.4l2.9 1.6-2.9 1.6M20.4 10.4 17.5 12l2.9 1.6"/></svg>' +
      '<span class="xmas-snow-toggle-text"></span>';

    const render = (isOn) => {
      button.setAttribute("aria-pressed", String(isOn));
      button.setAttribute("aria-label", isOn ? "Pausar la nieve decorativa" : "Activar la nieve decorativa");
      button.querySelector(".xmas-snow-toggle-text").textContent = isOn ? "Nieve" : "Sin nieve";
    };

    button.addEventListener("click", () => {
      const isOn = !snowLayer;
      if (isOn) {
        buildSnow();
      } else {
        removeSnow();
      }
      saveSnowPreference(isOn);
      render(isOn);
    });

    render(Boolean(snowLayer));
    shell.prepend(button);
  };

  // Cuenta regresiva con la tradición colombiana: Novena (16-24 dic), Navidad y Año Nuevo.
  const updateCountdown = () => {
    const targets = document.querySelectorAll("[data-xmas-countdown]");
    if (!targets.length) return;

    const now = new Date();
    const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const novena = new Date(year, 11, 16);
    const christmas = new Date(year, 11, 25);
    const daysTo = (date) => Math.round((date - startOfDay) / 86400000);

    let text;
    if (now.getMonth() === 0) {
      text = "¡Feliz Año Nuevo! Gracias por sembrar oportunidades con nosotros.";
    } else if (startOfDay < novena) {
      const days = daysTo(novena);
      text = `Faltan ${days} ${days === 1 ? "día" : "días"} para la Novena de Aguinaldos.`;
    } else if (startOfDay < christmas) {
      const day = daysTo(novena) * -1 + 1;
      text = day <= 9 ? `Estamos en la Novena de Aguinaldos: día ${day} de 9.` : "¡Es Nochebuena!";
    } else if (daysTo(christmas) === 0) {
      text = "¡Feliz Navidad de parte de toda la familia Amigos Como Arroz!";
    } else {
      text = "Gracias por una Navidad llena de oportunidades. ¡Feliz Año Nuevo!";
    }

    targets.forEach((target) => {
      target.textContent = text;
    });
  };

  const init = () => {
    revealSeasonBlocks();
    buildGarland();
    // La nieve solo aparece si hay dónde poner su botón de pausa.
    const canPause = Boolean(document.querySelector(".site-header .nav-shell, .program-detail-nav"));
    if (canPause && readSnowPreference()) buildSnow();
    buildSnowToggle();
    updateCountdown();

    // Si el usuario activa "reducir movimiento" con la página abierta, se retira la nieve.
    reduceMotion.addEventListener?.("change", (event) => {
      if (event.matches) {
        removeSnow();
        document.querySelector(".xmas-snow-toggle")?.remove();
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
