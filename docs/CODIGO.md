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

**Librería de animación (`motion`).** El sitio no tiene empaquetador, así que `assets/js/vendor/motion.js` se genera una vez con esbuild y se guarda en Git (6,7 KB comprimido): `assets/js/vendor/motion-entry.js` dice qué funciones se incluyen (`animate` de `motion/mini` y `scroll`). Si cambias la versión de `motion` o necesitas otra función, edita esa entrada y ejecuta `npm run vendor:motion`. `motion` y `esbuild` son dependencias de desarrollo: Vercel no las usa para publicar.

## 2. Portada: `src/index.html`

Orden del documento:

1. `<head>`: metadatos, precarga de las dos fuentes, `sitio.css` y `navidad.css` (con `?v={{ site.cache.* }}`), precarga del hero, `seasonal.js` (debe ir en el `<head>` para marcar la temporada antes de pintar) y datos estructurados JSON-LD.
2. `#entrada` (pantalla de bienvenida), `#historias` (línea de progreso), `.site-header` (barra flotante abajo: logo, enlaces, Compartir, Donar, WhatsApp y el botón del asistente) y `<main id="main">` con las secciones (`#inicio`, la secuencia de palabras `.ciclo`, `#fundacion`, `#programas`, `#impacto`, `#testimonios` (con los videos institucionales), `#momentos`, `#equipo`, `#informes` y `#contacto`).
3. `.site-footer` y el panel del chat.
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

Las páginas internas cargan `sitio.css`, `navidad.css`, `seasonal.js` y `analytics.js`, pero no `main.js`. Su primera sección lleva `pagina-portada` y una foto propia en `.pantalla-fondo`; su barra flotante tiene el logo, volver, Donar, WhatsApp y Programas.

## 4. CSS

`assets/css/sitio.css` es la única hoja del sitio (más `seasonal/navidad.css`). La dirección visual y sus reglas están en [`../DESIGN.md`](../DESIGN.md).

```css
@layer reset, tokens, base, layout, components, sections, utilities;
```

| Capa | Contenido |
|---|---|
| `reset` | Márgenes, `box-sizing` y `[hidden]` (el único `!important` además del movimiento reducido). |
| `tokens` | Colores (`--vacio`, `--texto*`, `--rosa`, `--rosa-boton`, `--sol`), velos sobre fotos, tipos, márgenes (`--margen`, `--marco`, `--pildora`, `--pie-libre`), radios y la curva `--ease-out`. |
| `base` | Cuerpo, títulos (`h1` en Unbounded mayúscula; `h2` y `h3` en Schibsted Grotesk), enlaces, selección, foco (`--sol`) y barras de desplazamiento. |
| `layout` | `.pantalla`, `.pantalla-fondo` (y `--encaje` para fotos pequeñas), `.pantalla-cuerpo`, `.lead` y la línea de autor `.eyebrow`. |
| `components` | Botones, línea `.historias`, barra flotante (`.site-header`/`.program-detail-header`) y su menú, punto del cursor, chat, carruseles `.carrusel`/`.historia`, videos y listas. |
| `sections` | Cada sección de la portada y las páginas internas (`.program-detail-*`, galerías, Sede Espinal). `navidad.css` también va aquí. |
| `utilities` | Entrada de `.reveal` (solo con JavaScript: `html.js`, que pone `seasonal.js`), movimiento reducido e impresión. |

Botones: `.btn-pink` para apoyar/donar, `.btn-whatsapp` (blanco) cuando abre WhatsApp, `.btn-secondary` (contorno) para lo demás.

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
initHistorias();            // indicador segmentado y botón Compartir
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
| `active-section.js` | Marca `.active` en el enlace de la sección visible. |
| `reveal.js` | Añade `.visible` a `.reveal` al entrar en pantalla y anima `data-counter="180"`. Los que entran a la vez (por ejemplo las 4 tarjetas de programas) reciben `--delay` de 0, 70, 140… ms, hasta 280. Los contadores se animan también en celular; solo se saltan con movimiento o datos reducidos (`prefersLessMotion`). |
| `portada.js` | Pantalla de entrada (`#entrada`: la decide un script del `<head>`; se cierra con el botón, la rueda, deslizando o el teclado, y no vuelve en la sesión), secuencia de palabras `.ciclo` (fija con el scroll; `scroll()` de `motion`) y punto rosa que sigue al cursor (solo con mouse y sin movimiento reducido). |
| `contact-form.js` | Valida campos con `aria-invalid` y mensajes de error; si todo está bien abre WhatsApp. |
| `team-slider.js` | Anterior/siguiente, puntos, avance automático que se pausa fuera de pantalla o con el cursor encima. |
| `lazy-videos.js` | Carga cada video local (`.local-video-loader`) solo al pulsarlo. |
| `story-book.js` | Visor de la historia institucional: muestra una página a la vez (las demás con `hidden`), arma su indicador segmentado y anuncia «Página X de Y» en `role="status"`. |
| `chatbot.js` | Las preguntas rápidas responden al instante con textos fijos. Lo que la persona escribe va a `/api/chat` con las últimas 8 intervenciones; mientras tanto muestra «Escribiendo…» y bloquea el campo. La respuesta se arma con `textContent`, y solo las URL `https` de WhatsApp, Instagram, Facebook o el dominio de la fundación se convierten en enlace. Si la API falla o no existe (con `npm start` no hay funciones), responde con el texto fijo y no reenvía esa pregunta. |
| `historias.js` | Arma `#historias`: un enlace por `main > section[id]` visible, con el título de la sección como nombre accesible. Cada segmento se llena con `scroll()` de `motion` (ScrollTimeline del navegador) cuando su pantalla sale por arriba; el de la pantalla actual lleva `aria-current="true"`. También maneja el botón Compartir de la barra flotante (menú nativo o copia del enlace). |

Fuera de `modules/`:

- **`seasonal.js`:** enciende o apaga la Navidad. Se controla con `SEASON_CONFIG.mode`, y en la URL con `?temporada=off` o `?temporada=navidad` para probar.
- **`analytics.js`:** Google Analytics 4 opcional y eventos `data-analytics-*`.

## 6. Asistente con Claude (`api/`)

Vercel publica cada archivo de `api/` como una función; los que empiezan por `_` no se publican.

- **`api/chat.mjs`** (`POST /api/chat`) usa el SDK oficial `@anthropic-ai/sdk` con `claude-opus-5-5`, esfuerzo `low` (es un chat breve) y `max_tokens: 2048` como tope de gasto. Si el modelo rechaza la pregunta, `fallbacks: "default"` la reintenta en otro modelo. Si aun así la rechaza, responde con un mensaje amable.
- **Protecciones:** solo acepta `POST`, solo desde el dominio de la fundación, `landign*.vercel.app` y `localhost`, y como mucho 8 mensajes por minuto e IP. Ese límite vive en la memoria de cada instancia; si hay abuso, pasarlo a Upstash o Vercel KV. Cada mensaje tiene de 1 a 600 caracteres y la conversación como mucho 8 turnos. El historial lo manda el navegador, así que no es de fiar: va como texto dentro de un solo mensaje del usuario, nunca como turnos del asistente.
- **Errores:** usa las clases del SDK (`RateLimitError`, `AuthenticationError`, `APIError`) y devuelve 503/502/500 sin detalles. El navegador entonces usa la respuesta fija.
- **`api/_contexto.mjs`** tiene las reglas y los datos de la fundación. Lee WhatsApp, correo y redes de `site.json`; el resto está copiado del sitio. **Si cambias programas, cifras, equipo o contacto en la portada, cámbialo también aquí.** No pongas fechas ni nada variable, porque rompería la caché del prompt.
- **Clave:** la variable `ANTHROPIC_API_KEY` se configura en Vercel (Settings → Environment Variables). Nunca va en el código ni en el navegador.

## 7. Imágenes y videos

- **Imágenes:** las páginas usan las WebP de `assets/img/opt/`, de 480, 960 y 1600 px, con `srcset`. Los originales quedan en `brand/`, `hero/`, `content/` y `team/`.
- **Carga:** `loading="lazy"` y `decoding="async"` en todo lo que no aparece al abrir la página. La imagen del hero se precarga.
- **Videos:** viven en `assets/videos/` con su póster y solo se cargan al pulsarlos.

## 8. Formulario

```html
<form class="contact-form" id="contact-form" novalidate>
```

Cada campo tiene su mensaje de error enlazado con `aria-describedby="name-error"`. `contact-form.js` actualiza `aria-invalid`, el texto del error y `#form-status`. El envío abre WhatsApp. No hay backend.

## 9. Reglas para mantener el código limpio

1. El contenido va en `src/`, el aspecto en `assets/css/` y el comportamiento en `assets/js/modules/`.
2. No pongas JavaScript dentro del HTML. Los datos de contacto van en `site.json`.
3. El CSS nuevo va en una capa posterior a `legacy`, con tokens y sin `!important`.
4. Cuando una sección deba conectarse con el menú, dale un `id` claro.
5. Mantén `alt` en las imágenes y sube la versión de caché al tocar un CSS o JS.
