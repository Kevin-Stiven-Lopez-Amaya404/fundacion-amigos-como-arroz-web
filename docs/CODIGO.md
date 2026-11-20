# Documentación técnica del código

Detalle de cómo funciona cada pieza. Para la vista general (carpetas, cambios comunes, flujo de trabajo) lee primero [`GUIA_PROGRAMADOR.md`](GUIA_PROGRAMADOR.md).

## 1. Compilación (Eleventy)

`eleventy.config.mjs`:

- **Entrada `src/`, salida `_site/`.** Solo se procesan `.html` y `.njk` (los `README.md` de `src/` no se publican).
- **Las páginas HTML se leen como plantillas Nunjucks**, así que pueden usar `{{ site.* }}`, filtros y `layout`.
- **`permalink` global `{{ page.filePathStem }}.html`** mantiene las URL con `.html` (`/programas/semilla.html`, `/sede-espinal/index.html`).
- **Se copian tal cual** `assets/`, `informes/`, `robots.txt`, `sitemap.xml`, `site.webmanifest` y `.nojekyll`.
- **Filtro `whatsapp`:** `{{ 'texto' | whatsapp }}` devuelve `https://wa.me/<número>?text=<texto codificado>`; sin texto, solo `https://wa.me/<número>`.

`vercel.json` le indica a Vercel `npm run build` y publicar `_site/`.

## 2. Portada: `src/index.html`

Orden del documento:

1. `<head>`: metadatos, `tokens.css`, `styles.css` y `navidad.css` (con `?v={{ site.cache.* }}`), precarga del hero, `seasonal.js` (debe ir en el `<head>` para marcar la temporada antes de pintar) y datos estructurados JSON-LD.
2. `.reading-progress`, `.site-header` (logo y menú) y `<main id="main">` con las secciones (`#inicio`, `#fundacion`, `#programas`, `#impacto`, `#testimonios` (con los videos institucionales), `#momentos`, `#equipo`, `#informes` y `#contacto`).
3. `.site-footer`, el botón flotante de WhatsApp (`#quick-contact`), el chatbot y el botón de subir.
4. Al final: `analytics.js`, el JSON `#site-data` (WhatsApp para el JS) y `main.js` como `type="module"`.

Cada sección del menú se enlaza por su `id` (`href="#programas"`); `active-section.js` depende de eso.

## 3. Páginas internas: `src/_includes/layouts/interna.njk`

Variables que lee del encabezado de cada página: `title`, `description`, `canonical` (ruta; la plantilla le antepone `site.url`), `bodyClass` (opcional) y `back.href` / `back.text`.

Estructura que genera:

```html
<body class="program-page {{ bodyClass }}">
  <header class="program-detail-header"> logo + <a class="program-back-link" href="{{ back.href }}">{{ back.text }}</a> </header>
  {{ content }}            ← el <main> de la página
  <footer> WhatsApp, correo, redes (de site.json) </footer>
```

Las páginas internas cargan `tokens.css`, `styles.css`, `navidad.css`, `seasonal.js` y `analytics.js`, pero no `main.js`.

## 4. CSS

### Archivos y capas

```css
@layer tokens, legacy, base, layout, components, sections, utilities;   /* en tokens.css */
```

| Archivo | Capa | Contenido |
|---|---|---|
| `tokens.css` | `tokens` | Variables de color, tipografía, radios, sombras y movimiento. Los nombres antiguos (`--orange`, `--pink`…) son alias. |
| `styles.css` | `legacy` | Todo el CSS histórico del sitio. |
| `seasonal/navidad.css` | `legacy` | Solo se aplica con `<html data-season="navidad">`. |

Una regla en una capa posterior (por ejemplo `components`) gana a cualquier regla de `legacy`, sin importar la especificidad. Por eso el código nuevo va en esas capas y no necesita `!important`.

### Estado de `styles.css`

Ya se hizo esta limpieza, cada paso verificado comparando el estilo calculado de todas las páginas (ver [`AUDITORIA-ESTRUCTURA-2026-11.md`](AUDITORIA-ESTRUCTURA-2026-11.md)):

- **Declaraciones muertas:** se borraron las que siempre quedaban pisadas.
- **Reglas repetidas:** se fusionaron las del mismo selector y contexto.
- **`!important`:** se quitaron los que no decidían nada; quedan 186.
- **Colores, radios y sombras:** pasaron a tokens.

El CSS histórico usa 13 valores de `max-width` (antes 23): 420, 560, 640, 720, 760, 768, 820, 840, 860, 900, 980, 1023 y 1079. Los que quedan no se pueden juntar sin cambiar el diseño en algún dispositivo común (por ejemplo 820 y 840 rodean al iPad Air de 834 px). Para código nuevo, usa solo 560, 840 y 1080 px.

### Bloques principales

- `.container`, `.section`, `.section-header`, `.btn`, `.reveal`/`.visible`: base.
- `.site-header`, `.nav-list`, `.menu-toggle`: cabecera y menú.
- `.hero`, `.hero-intro`: portada.
- `.program-card`, `.program-grid`: tarjetas de programas.
- `.program-detail-*`, `.program-timeline`: páginas de programas.
- `.team-*`: carrusel del equipo.
- `.contact-*`, `.contact-form`: contacto.
- `.chatbot-*`, `.story-book-*`, `.social-dock-*`: chatbot, libro y botón flotante de WhatsApp.
- Tres tipos de botón, sin variantes nuevas: `.btn-pink` para la acción principal de apoyo (una por bloque), `.btn-whatsapp` cuando el botón abre WhatsApp y `.btn-secondary` para todo lo demás.

## 5. JavaScript

### Carga

`main.js` es un módulo ES (`<script type="module">`): importa cada `init*` de `modules/` y los llama en orden:

```js
const menuApi = initMenu();
initMeta();
initHero();
initActiveSection();
initReveal();
initScrollState(menuApi);   // necesita saber si el menú está abierto
initContactForm();
initTeamSlider();
initLazyVideos();
initStoryBook();
initChatbot();
```

### `modules/config.js`

- **`CONTACT` y `WHATSAPP_URL`:** se leen de `#site-data`, que Eleventy genera a partir de `site.json`.
- **`SELECTORS`:** las clases e ids que usa el JS, para no repetirlos por todo el código.
- **`shouldLimitMotion`:** vale `true` si la persona pidió menos movimiento o menos datos, si la pantalla mide 760 px o menos, o si el equipo tiene poca memoria. En esos casos los módulos reducen las animaciones.

### Módulos

| Módulo | Detalle |
|---|---|
| `menu.js` | Abre/cierra el panel, fondo oscuro, Escape, cierre al pulsar un enlace, `aria-expanded`/`aria-label`. Al abrir lleva el foco a la primera entrada y Escape lo devuelve al botón (el botón va después de la lista en el HTML). Devuelve `menuApi`. |
| `meta.js` | Escribe el año actual en `#current-year`. |
| `hero.js` | Marca `#hero-content` como listo y mueve suavemente la imagen con el ratón (no si `shouldLimitMotion`). |
| `active-section.js` | Marca `.active` en el enlace de la sección visible. |
| `reveal.js` | Añade `.visible` a `.reveal` al entrar en pantalla y anima `data-counter="180"`. |
| `scroll-state.js` | Barra de progreso, header que se oculta al bajar, botón de subir. |
| `contact-form.js` | Valida campos con `aria-invalid` y mensajes de error; si todo está bien abre WhatsApp. |
| `team-slider.js` | Anterior/siguiente, puntos, avance automático que se pausa fuera de pantalla o con el cursor encima. |
| `lazy-videos.js` | Carga cada video local (`.local-video-loader`) solo al pulsarlo. |
| `story-book.js` | Páginas del libro de historias y su estado accesible. |
| `chatbot.js` | Preguntas rápidas y respuestas con enlaces (WhatsApp, programas, ubicación). |

Fuera de `modules/`:

- **`seasonal.js`:** enciende o apaga la Navidad. Se controla con `SEASON_CONFIG.mode`, y en la URL con `?temporada=off` o `?temporada=navidad` para probar.
- **`analytics.js`:** Google Analytics 4 opcional y eventos `data-analytics-*`.

## 6. Imágenes y videos

- **Imágenes:** las páginas usan las WebP de `assets/img/opt/`, de 480, 960 y 1600 px, con `srcset`. Los originales quedan en `brand/`, `hero/`, `content/` y `team/`.
- **Carga:** `loading="lazy"` y `decoding="async"` en todo lo que no aparece al abrir la página. La imagen del hero se precarga.
- **Videos:** viven en `assets/videos/` con su póster y solo se cargan al pulsarlos.

## 7. Formulario

```html
<form class="contact-form" id="contact-form" novalidate>
```

Cada campo tiene su mensaje de error enlazado con `aria-describedby="name-error"`. `contact-form.js` actualiza `aria-invalid`, el texto del error y `#form-status`. El envío abre WhatsApp. No hay backend.

## 8. Reglas para mantener el código limpio

1. El contenido va en `src/`, el aspecto en `assets/css/` y el comportamiento en `assets/js/modules/`.
2. No pongas JavaScript dentro del HTML. Los datos de contacto van en `site.json`.
3. El CSS nuevo va en una capa posterior a `legacy`, con tokens y sin `!important`.
4. Cuando una sección deba conectarse con el menú, dale un `id` claro.
5. Mantén `alt` en las imágenes y sube la versión de caché al tocar un CSS o JS.
