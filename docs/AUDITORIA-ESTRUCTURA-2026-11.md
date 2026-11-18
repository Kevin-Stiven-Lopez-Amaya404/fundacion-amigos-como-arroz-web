# Auditoría de código, estructura y diseño · noviembre 2026

**Proyecto:** sitio web de la Fundación Amigos Como Arroz (7 páginas estáticas).
**Alcance:** `index.html`, `programas/*.html`, `sede-espinal/index.html`, `assets/` (CSS, JS, imágenes y videos), `docs/` e `informes/`.
**Método:** medición automática del código (selectores, duplicados, tokens, recursos), Chromium sin interfaz en 320, 390, 768, 1024 y 1440 px, axe-core (WCAG 2.1 A/AA) en todas las páginas, y revisión manual.

> Complementa a [AUDITORIA-2026-11.md](AUDITORIA-2026-11.md), que documenta las correcciones ya aplicadas y la temporada navideña. Las cifras de este informe se tomaron **después** de esas correcciones (v47).
>
> **Revisión del 18-11-2026:** se verificaron las cifras contra el código y en el navegador. Se corrigieron E4, H2, D8, J1 y la lista de reglas sin uso, y se añadieron 3 riesgos (sección 6.4). Lo aplicado en la versión v48 está en la sección 8.

---

## Veredicto

| Capa | ¿Escala? | Resumen |
|------|----------|---------|
| HTML (contenido y semántica) | 🟡 **Parcial** | Semántica buena, pero cabecera, pie y `<head>` están copiados a mano en 7 páginas, y cada página interna tiene una navegación distinta. |
| CSS | 🔴 **No** | La mitad de los bloques sobrescribe a otros, hay 545 `!important` y no existe un sistema de diseño real. Es el mayor freno. |
| JavaScript | 🟢 **Sí** | Bien modularizado en funciones `init*()`; solo necesita separarse en archivos y sacar datos a configuración. |
| Recursos (imágenes y video) | 🔴 **No** | Nombres sin convención, duplicados, imágenes 8 veces más grandes que su uso y ningún proceso de optimización. |
| Diseño visual | 🟡 **Parcial** | La identidad es coherente y cálida, pero se sostiene a mano: 127 colores hex, 160 sombras y 19 puntos de corte distintos. |
| Proceso (versionado, documentación) | 🔴 **No** | Esta copia no tiene historial de Git y la documentación describe una estructura que ya no existe. |

**Conclusión:** la base funciona hoy, pero **no escala**. Añadir una página, una sección o un cambio de marca cuesta cada vez más, porque cada ajuste se hace añadiendo CSS al final y copiando HTML entre páginas. No hace falta rehacer el sitio: el diseño, el contenido y el JavaScript se pueden conservar. Lo que hay que cambiar es **cómo se organiza** (sección 6).

---

## 1. Estructura del proyecto

### 1.1 Árbol actual y problemas

```text
landign-/
├── index.html                 1.566 líneas, 14 secciones
├── programas/                 5 páginas con cabecera propia, SIN pie ni main.js
├── sede-espinal/              1 página con cabecera de programa y pie propio
├── assets/
│   ├── css/styles.css         11.753 líneas · 239 KB (38 KB gzip)
│   ├── css/seasonal/          navidad.css (nuevo)
│   ├── js/                    main.js · analytics.js · seasonal.js
│   ├── img/{brand,hero,content,team,psicologia,"pantalla inicio"}
│   ├── semilla/{danza,futbol,ingles,patinaje,robotica,taekwondo}
│   ├── siembra/becados/       ← 4 archivos idénticos a assets/cosecha/
│   ├── cosecha/
│   ├── psicologia/            ← 2 archivos idénticos a assets/img/psicologia/
│   └── videos/                63 MB
├── informes/                  24 MB de PDF (uno de 19,5 MB)
└── docs/                      7 documentos Markdown
```

| # | Hallazgo | Evidencia | Por qué importa |
|---|----------|-----------|-----------------|
| E1 | **Dos criterios para organizar imágenes** | `assets/img/<tipo>/` convive con `assets/<programa>/` | No hay una regla clara de dónde va una foto nueva, y se duplican |
| E2 | **8 archivos duplicados** | Mismo hash MD5: `cosecha/*` = `siembra/becados/*`; `img/content/logro-cierre.jpg` = 2 copias; `duenos-hero-clean.jpg` ×2; `psicologia/1.jpg` = `img/psicologia/WhatsApp…` | Peso de despliegue y riesgo de actualizar una copia y no la otra |
| E3 | **5 archivos sin uso (0,9 MB)** | `img/pantalla inicio/dueños.jpg` (382 KB), `duenos-foto.jpg`, `duenos-hero-full.jpg` y las 2 fotos de `img/psicologia/` | Ninguna página, CSS ni JS las referencia |
| E4 | **26 archivos con espacios o tildes (22 `.jpeg` y 4 `.jpg`)** | `WhatsApp Image 2026-06-14 at 10.42.04 AM.jpeg`, carpeta `pantalla inicio`, `dueños.jpg`, `drirectora.jpg` | Las URL quedan con `%20`; las tildes y eñes fallan en algunos servidores; no se sabe qué muestra cada foto |
| E5 | **Esta copia no tiene historial de Git** | `.git/` está vacía (la carpeta está en `Descargas/Comprimidos`: parece un ZIP del repositorio) | Sin historial no hay vuelta atrás. Aplica los cambios en el clon real del repositorio, no en esta copia |
| E6 | **La documentación está desactualizada** | El árbol de `README.md` y `docs/CODIGO.md` no incluye `sede-espinal/`, `informes/`, `assets/semilla/`, `videos/` ni el chatbot | Quien llegue nuevo trabajará sobre un mapa equivocado |

### 1.2 Las páginas no comparten una plantilla

| Página | Cabecera | Menú a otras secciones | Pie | `main.js` | Google Fonts |
|--------|----------|------------------------|-----|-----------|--------------|
| `index.html` | `.site-header` (logo centrado, menú hamburguesa) | ✅ 13 enlaces | ✅ | ✅ | ✅ |
| `programas/index.html` | `.program-detail-header` (logo y "Volver") | ❌ | ❌ | ❌ | ❌ **(usa otra fuente)** |
| `programas/{semilla,siembra,cosecha,psicosocial}.html` | `.program-detail-header` | ❌ | ❌ | ❌ | ✅ |
| `sede-espinal/index.html` | `.program-detail-header` | ❌ | ✅ (distinto) | ❌ | ✅ |

**Consecuencias:**

- Cambiar el menú, el teléfono o el pie implica editar hasta 7 archivos a mano.
- Las páginas internas son **callejones sin salida**: sin pie, sin redes y sin WhatsApp. Sus botones ("Quiero participar") llevan de vuelta a `index.html#contacto` en lugar de dejar actuar desde ahí.
- `programas/index.html` no carga Google Fonts, así que sus títulos se ven con otra tipografía.
- En `sede-espinal/` el enlace superior dice "Volver a Sede Espinal": lleva a la sección de la sede en la portada, pero el texto hace pensar que se queda en la misma página.

---

## 2. Código

### 2.1 HTML

**Bien hecho**
- Una `h1` por página, secciones con `aria-labelledby`, enlace para saltar al contenido, `label` en todos los campos y `width`/`height` en las imágenes.
- SEO técnico completo: canonical, Open Graph, JSON-LD `NGO`, `sitemap.xml` (con las 7 URL) y `robots.txt`.
- `semilla.html` usa `<details>`/`<summary>` para las galerías: accesible y sin JavaScript.

**Para mejorar**

| # | Hallazgo | Detalle |
|---|----------|---------|
| H1 | Contenido de datos escrito dentro del maquetado | Equipo (4 tarjetas), informes (3 filas), línea de tiempo (4 hitos) y métricas: para añadir un informe hay que copiar unas 25 líneas de HTML y editar 6 sitios. Son datos, no diseño. |
| H2 | Número de WhatsApp repetido | 9 veces en `index.html`, 4 en `main.js` y 1 en `sede-espinal/` (14 en total). |
| H3 | Iconos SVG repetidos | Los SVG de WhatsApp, Instagram y Facebook están copiados en el pie y en los botones flotantes (unos 4 KB duplicados). |
| H4 | Iconos de programas con emoji | 🌱📚🏆🧠: cambian de aspecto según el sistema operativo y no siguen la marca. |

### 2.2 CSS: el problema central

Medido sobre `assets/css/styles.css`:

| Métrica | Valor | Referencia sana |
|---------|-------|-----------------|
| Líneas / peso | 11.753 / 239 KB (38 KB gzip) | Menos de 3.000 líneas para un sitio de 7 páginas |
| Bloques de reglas | 1.749 | — |
| Selectores distintos | 872 | — |
| **Bloques que redefinen un selector ya existente** | **877 (50 %)** | Cerca de 0 |
| Selectores más redefinidos | `.nav-list` ×30, `.logo-mark` ×27, `.nav-shell` ×25, `.hero` ×25, `.contact-card` ×24, `.menu-toggle` ×18 | 1–3 (base y variantes responsive) |
| `!important` | 545 | Menos de 10 (utilidades) |
| Reglas que no aplican a ningún elemento de ninguna página | 225 (14 %, unos 28 KB): `.hero-gallery-dots`, los selectores `img[src*="pantalla inicio"]`, `.report-card*`, `.team-grid`, `.trust-strip-card`… | 0 |
| Bloques `:root` | 5 (más la capa v47) | 1 |
| Variables definidas / usos de `var()` | 42 / 489 | — |
| Colores hex distintos | **127** | 15–25 en un sistema |
| `rgba()` distintos | **unos 360** (356–376 según cómo se normalicen los espacios) | — |
| `box-shadow` distintos | **unas 130–160** (las sombras de varias líneas se cuentan distinto) | 3–5 niveles |
| `border-radius` distintos | **45** | 3–4 |
| `font-size` distintos | **128** | Escala de 8–10 pasos |
| Puntos de corte (`@media`) | 105 consultas con **19 anchos distintos** (420, 480, 520, 560, 620, 640, 680, 700, 720, 760, 768, 820, 840, 860, 900, 960, 980, 1080, 1120) | 3–4 |
| Niveles de `z-index` | **26** (de −2 a 1230) | 6–8 con nombre |

**Cómo se llegó a esto:** los comentarios lo cuentan ("Navegación final…", "Navegación con presencia…", "Corrección de capas del menú…", "Pulido adaptivo final…"). Cada cambio se añadió al final para ganar la cascada, a veces con `!important`, en lugar de editar la regla original. Por eso hoy, para saber cómo se ve el menú, hay que leer 30 bloques repartidos en unas 7.000 líneas.

**Riesgos concretos**
- Cualquier cambio puede no verse porque otra regla posterior con `!important` gana. Eso empuja a añadir otro `!important` y el ciclo sigue.
- Cambiar el color de marca no es posible desde un único sitio: solo 42 variables frente a 503 colores escritos a mano.
- Las 6 páginas internas descargan los 239 KB completos, que incluyen chatbot, carrusel, libro 3D y formulario, aunque no los usan.

### 2.3 JavaScript

**Bien hecho**
- `SELECTORS` centralizado, una función `init*()` por funcionalidad y salidas tempranas si falta el elemento.
- `IntersectionObserver` para revelar elementos y para el menú activo; `requestAnimationFrame` para el scroll; listeners `passive`.
- Respeta "reducir movimiento" y "ahorro de datos", y limita las animaciones en equipos con poca memoria.
- Es seguro: el chatbot inserta el texto del usuario con `textContent` (sin riesgo de XSS).
- Analítica opcional y desactivada hasta poner un ID real.

**Para mejorar**

| # | Hallazgo | Detalle |
|---|----------|---------|
| J1 | Código muerto | `initHeroGallery()` (se ejecuta, pero no hace nada porque el hero tiene 1 sola foto; `.hero-slide` sí se usa), `SELECTORS.heroGalleryDots` y `SELECTORS.lazyVideo` (`.video-lazy` no existe), y la rama de `iframe` en `initLazyVideos()`. |
| J2 | Datos dentro de la lógica | Las respuestas del chatbot (teléfono, dirección, programas) están escritas en `main.js`: si cambia el número, hay que editarlo en JS y en HTML. |
| J3 | Un solo archivo para todo | Las 887 líneas de `main.js` cargan solo en la portada. Las páginas internas no cargan nada, así que si algún día necesitan el menú o el chatbot habrá que duplicar código. |
| J4 | Accesibilidad del libro de historia | `renderBook()` reemplaza todo el contenido dentro de un `aria-live="polite"`, así que el lector de pantalla vuelve a leer páginas enteras en cada clic. Además, las caras traseras ocultas siguen en el árbol de accesibilidad. |
| J5 | Puntos del carrusel de equipo de 12 × 9 px | Por debajo del mínimo de 24 × 24 px para tocar (WCAG 2.5.8). |

---

## 3. Diseño

### 3.1 Lo que funciona

- Identidad cálida y coherente con el logo: terracota, rosa, dorado y crema, más el contraste de Cormorant Garamond (títulos) con una sans legible (texto).
- Componentes reconocibles y repetidos: etiqueta pequeña, título y entradilla en cada sección; tarjetas de programa; línea de tiempo numerada en las páginas de programa.
- Sin desbordes horizontales en 390, 768, 1024 y 1440 px. El contenido se reorganiza bien en tablet.
- Después de las correcciones v47, axe no reporta errores en la portada, Programas ni Semilla.

### 3.2 Problemas

| # | Área | Hallazgo | Recomendación |
|---|------|----------|---------------|
| D1 | Jerarquía | En escritorio el primer pantallazo es **solo la foto**: nombre, propuesta de valor y botones quedan debajo del pliegue. | Foto a unos 60 % de la altura con el título superpuesto sobre un degradado, o una cuadrícula foto/texto 50/50. |
| D2 | Navegación | En 1440 px el menú sigue escondido tras la hamburguesa, y tiene 13 enlaces. | En escritorio, menú visible con 5–6 entradas (Fundación, Programas, Impacto, Transparencia, Contacto) y botón "Donar". Hamburguesa solo por debajo de unos 1024 px. |
| D3 | Longitud | 14 secciones: unos 15.900 px en escritorio y unos 19.500 px en móvil. "Testimonios" y "Videos" son ambas de video; "Actividades" y "Momentos" son ambas galerías. | Unir Testimonios con Videos ("Historias") y Actividades con Momentos, o mover una a una página interna. |
| D4 | Sistema visual | Ver la tabla 2.2: 127 colores, 130–160 sombras, 45 radios, 128 tamaños de letra. A simple vista se nota en radios de 4, 8, 12, 18, 20, 22, 24, 32 y 34 px entre tarjetas similares. | Definir tokens (sección 6.2) y usar solo esos. |
| D5 | Elementos flotantes | En móvil hay 4 botones fijos a la vez (chatbot, WhatsApp, Instagram y Facebook), más la flecha de volver arriba, que tapan contenido y botones. | Un solo botón "Contacto" que despliegue WhatsApp, redes y chat. |
| D6 | Páginas internas | Sin pie ni redes, y su CTA lleva a otra página. | Plantilla común con pie y un CTA directo a WhatsApp con mensaje según el programa. |
| D7 | Contraste en `sede-espinal/` | El texto del pie (`.footer-copy`) tiene 2,83:1 (mínimo 4,5:1). | Usar el mismo pie que la portada. |
| D8 | 320 px | No aparece scroll horizontal porque `.program-page` y el `body` tienen `overflow: hidden`, pero **el contenido se recorta sin aviso**: `.sede-espinal-visual` (4/3 con alto mínimo de 240 px, o sea 320 px de ancho) y `.timeline-media--portrait` en la portada; `.sede-info-grid` (+41 px) y `.program-detail-card` (+63 px) en la sede. | Quitar `aspect-ratio` cuando hay alto mínimo y poner `min-width: 0` en los hijos de la cuadrícula. |
| D9 | Iconografía | Emojis en programas y contacto. | Un set SVG propio de trazo uniforme. |

---

## 4. Rendimiento

| Métrica | Valor medido | Comentario |
|---------|--------------|------------|
| Carga inicial de la portada (sin fuentes) | **13 peticiones · unos 2,2 MB** | Las 5 fotos de "Actividades" se descargan al inicio por estar cerca del hero |
| Tras recorrer toda la portada | 26 peticiones · unos 3,2 MB | Sin contar videos, que se cargan al pulsar |
| Imágenes más de 2 veces más grandes que su tamaño en pantalla | **15–16** | Las de actividades miden 1800 px y se muestran a 223–320 px (unas 8 veces más) |
| Imágenes JPEG de más de 300 KB | 7 (hasta 636 KB) | — |
| CSS que bloquea el pintado | 239 KB (38 KB gzip) en un solo archivo, también en las páginas que no usan ni un 20 % | — |
| Fuentes | 8 archivos (Cormorant ×3 pesos, Inter ×5 pesos) | Bastan unos 4: Cormorant 600 y 700, Inter 400 y 700 |
| Videos | 63 MB (`conoce-nuestra-mision.mp4` 24 MB) | Bien cargados bajo demanda, pero conviene comprimir a unos 2–4 Mbps |
| Informes | `INFORME-…-2025.pdf` de 19,5 MB | Pesado para móvil: comprimir o enlazar una versión ligera |

**Ganancia estimada al optimizar imágenes:** generar versiones de 480, 800 y 1200 px en WebP con `srcset` bajaría la carga inicial de unos 2,2 MB a unos 400 KB.

---

## 5. Lo que ya está bien y hay que conservar

1. La organización de `main.js` en funciones `init*()` con `SELECTORS`.
2. La carga diferida de videos con póster y botón.
3. Las galerías con `<details>` de Semilla.
4. El SEO técnico y los datos estructurados.
5. La paleta, las fuentes y el tono cálido de los textos.
6. El sistema de temporadas (`seasonal.js` + `seasonal/navidad.css`): ya sigue el patrón al que debería migrar el resto (archivo aislado, activado por un atributo y sin `!important` salvo para ganar a la deuda existente).

---

## 6. Arquitectura recomendada

### 6.1 Estructura objetivo

Para un sitio de 7–15 páginas mantenido por pocas personas, la opción más sencilla que resuelve la duplicación es un **generador de sitios estáticos** con plantillas parciales. **Eleventy (11ty)** encaja mejor que un framework: el HTML sigue siendo HTML, no hay JavaScript en el navegador por usarlo y el resultado se publica igual en GitHub Pages. Astro es una buena alternativa si se prefiere trabajar con componentes.

```text
fundacion/
├── src/
│   ├── _data/                   ← CONTENIDO como datos
│   │   ├── site.json            nombre, WhatsApp, correo, dirección, redes (UNA vez)
│   │   ├── programas.json       Semilla, Siembra, Cosecha, Psicosocial
│   │   ├── equipo.json
│   │   ├── informes.json        añadir un informe = 4 líneas
│   │   └── momentos.json
│   ├── _includes/
│   │   ├── layouts/base.njk     <head>, header, footer, scripts (UNA vez)
│   │   ├── layouts/programa.njk plantilla de las 4 páginas de programa
│   │   └── partials/            header, footer, social-dock, chatbot, cta-whatsapp, icon
│   ├── index.njk
│   ├── programas/*.njk
│   └── sede-espinal.njk
├── assets/
│   ├── css/
│   │   ├── main.css             @layer tokens, base, layout, components, sections, utilities, seasonal;
│   │   ├── tokens.css           único :root
│   │   ├── base.css             reset, tipografía, foco, .sr-only, .container
│   │   ├── layout/              header.css, footer.css, section.css, grid.css
│   │   ├── components/          button, card, badge, carousel, form, timeline, chatbot…
│   │   ├── sections/            hero, historia, impacto, informes, contacto…
│   │   └── seasonal/navidad.css
│   ├── js/
│   │   ├── main.js              importa y arranca módulos según la página
│   │   ├── modules/             menu.js, reveal.js, scroll-state.js, team-slider.js,
│   │   │                        story-book.js, chatbot.js, lazy-video.js, contact-form.js
│   │   ├── seasonal.js
│   │   └── analytics.js
│   ├── img/                     originales con nombres descriptivos (kebab-case, sin tildes)
│   │   └── programas/semilla/futbol-entrenamiento-01.jpg …
│   └── icons/sprite.svg         WhatsApp, Instagram, Facebook e iconos de programas
├── informes/
└── .eleventy.js                 + plugin de imágenes: WebP/AVIF y srcset automáticos
```

**Qué se gana:**

| Tarea | Hoy | Con la estructura objetivo |
|-------|-----|----------------------------|
| Cambiar el número de WhatsApp | 14 ediciones en 3 archivos | 1 línea en `site.json` |
| Añadir un informe | Copiar unas 25 líneas de HTML | 4 líneas en `informes.json` |
| Cambiar el menú o el pie | Hasta 7 archivos | 1 parcial |
| Añadir un programa | Copiar una página y adaptar las rutas `../` | 1 entrada de datos más la plantilla `programa.njk` |
| Saber cómo se ve un botón | Buscar `.btn` en 11.700 líneas | `components/button.css` |
| Cambiar el color de marca | Imposible desde un sitio | 1 token |
| Optimizar fotos | Manual | Automático al compilar |

> Si no se quiere añadir un generador todavía, el paso intermedio es aplicar la parte CSS y JS de esta estructura (6.2 y 6.3) y mantener el HTML a mano.

### 6.2 Sistema de diseño (tokens)

> **Implementado en `assets/css/tokens.css` (v50, HU5)** con los valores que hoy se aplican, que son los de los 6 `:root` antiguos fusionados (el último gana). Difiere de esta propuesta en `--color-accent-700` (`#bb5369`), en los radios (`--radius-sm` 8, `--radius-md` 12, `--radius-lg` 32 + `--radius-pill`) y en que mantiene alias para los nombres antiguos (`--orange`, `--pink`…).

Un único `:root`, en una capa de cascada, con solo lo necesario:

```css
@layer tokens {
  :root {
    /* Color: marca */
    --color-brand-500: #c96f4a;  --color-brand-700: #a75435;   /* terracota (botones: 700) */
    --color-accent-500: #d96f84; --color-accent-700: #b84a62;  /* rosa */
    --color-gold-400: #e5b85c;
    /* Color: neutros */
    --color-ink: #24211f; --color-muted: #68625d;
    --color-surface: #ffffff; --color-surface-warm: #fffaf3; --color-line: rgb(0 0 0 / .08);
    /* Color: estados */
    --color-whatsapp: #15803d;

    /* Tipografía */
    --font-title: "Cormorant Garamond", Georgia, serif;
    --font-body: "Inter", "Segoe UI", system-ui, sans-serif;
    --text-xs: .75rem; --text-sm: .875rem; --text-base: 1rem; --text-lg: 1.125rem;
    --text-xl: clamp(1.25rem, 1.6vw, 1.5rem);
    --text-2xl: clamp(1.75rem, 3vw, 2.25rem);
    --text-3xl: clamp(2.25rem, 4.5vw, 3.5rem);
    --text-4xl: clamp(2.75rem, 6vw, 4.75rem);

    /* Espaciado (escala de 4 px) */
    --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-6: 24px;
    --space-8: 32px; --space-12: 48px; --space-16: 64px; --section-y: clamp(56px, 8vw, 104px);

    /* Forma y profundidad */
    --radius-sm: 8px; --radius-md: 14px; --radius-lg: 24px; --radius-pill: 999px;
    --shadow-1: 0 4px 14px rgb(56 37 24 / .07);
    --shadow-2: 0 14px 34px rgb(56 37 24 / .10);
    --shadow-3: 0 28px 64px rgb(56 37 24 / .16);

    /* Capas */
    --z-base: 1; --z-sticky: 100; --z-float: 500; --z-overlay: 900; --z-header: 1200; --z-modal: 1300;
  }
}
/* Puntos de corte (en @media no se pueden usar variables; documentarlos y usar SOLO estos):
   sm 560px · md 840px · lg 1080px */
```

Los 19 puntos de corte pasan a 3; los 26 niveles de `z-index`, a 6 con nombre; las 130–160 sombras, a 3; los 45 radios, a 4.

### 6.3 JavaScript en módulos

```js
// assets/js/main.js  (cargar con <script type="module">)
import { initMenu } from "./modules/menu.js";
import { initReveal } from "./modules/reveal.js";
// …
const modules = {
  "#nav-list": () => initMenu(),
  ".reveal": () => initReveal(),
  "[data-story-book]": () => import("./modules/story-book.js").then((m) => m.initStoryBook()),
  "#chatbotToggle": () => import("./modules/chatbot.js").then((m) => m.initChatbot())
};
// Cada página arranca solo lo que contiene; lo pesado se carga bajo demanda.
Object.entries(modules).forEach(([selector, init]) => document.querySelector(selector) && init());
```

Las respuestas del chatbot y el teléfono se leen de un `<script type="application/json" id="site-data">` generado desde `site.json`.

### 6.4 Riesgos de la migración

| # | Riesgo | Cómo evitarlo |
|---|--------|---------------|
| R1 | **Las capas `@layer` pierden contra el CSS sin capa.** Durante la migración, el `styles.css` antiguo seguirá sin capa y ganará siempre a todo lo nuevo. Además, dentro de las capas los `!important` invierten la prioridad. | Envolver el CSS antiguo en `@layer legacy` con este orden: `@layer tokens, legacy, base, layout, components, sections, utilities;`. **`tokens` va antes de `legacy`**: si fuera después, sus variables anularían las que redefine la temporada navideña (`--pink`, `--yellow`). `navidad.css` va en la misma capa `legacy` hasta retirar sus `!important`. Ir sacando bloques de `legacy` a su capa. ✅ Hecho en v50. |
| R4 | **Navegadores sin `@layer`** (Chrome < 99, Safari < 15.4, de 2022) ignoran todo lo que está dentro de una capa: verían el sitio sin estilos. | Riesgo aceptado: son menos del 1 % del tráfico web. Si la analítica muestra lo contrario, quitar la envoltura `@layer legacy` (no cambia nada visible). |
| R2 | **Los módulos ES no funcionan abriendo el archivo con doble clic.** `<script type="module">` no carga en `file://`, y Eleventy añade un paso de compilación. | Indicar en el README que hace falta un servidor local (`npx serve`) y publicar con un GitHub Action que compile. |
| R3 | **`innerHTML` con datos editables.** Las respuestas del bot se pintan con `innerHTML`, que hoy es seguro porque son texto fijo. Si pasan a un JSON que edita otra persona, se podría inyectar código. | Construir los enlaces del bot con nodos DOM (`createElement` + `textContent`) antes de mover las respuestas a datos. |

---

## 7. Hoja de ruta priorizada

Impacto: **A**lto, **M**edio, **B**ajo. Esfuerzo: **S** (horas), **M** (1–2 días), **L** (varios días).

### Fase 0 · Preparar (antes de tocar nada)

| # | Acción | Impacto | Esfuerzo |
|---|--------|---------|----------|
| 0.1 | Trabajar en el **clon con Git** del repositorio (esta copia no tiene historial) y crear una rama `refactor/estructura` | A | S |
| 0.2 | Capturas de referencia de las 7 páginas en 390, 768 y 1440 px para comparar después de cada paso | A | S |

### Fase 1 · Ganancias rápidas (sin cambiar la arquitectura)

| # | Acción | Impacto | Esfuerzo |
|---|--------|---------|----------|
| 1.1 | Optimizar imágenes: WebP de 480, 800 y 1200 px con `srcset`/`sizes` (carga inicial de unos 2,2 MB a unos 400 KB) | A | S |
| 1.2 | Renombrar recursos sin espacios ni tildes, borrar los 8 duplicados y los 5 sin uso (unos 1,5 MB) | M | S |
| 1.3 | Comprimir el PDF de 2025 (19,5 MB) y los videos | M | S |
| 1.4 | Cargar Google Fonts en `programas/index.html` y reducir a 4 pesos | M | S |
| 1.5 | Corregir el contraste del pie de la sede, el contenido recortado en 320 px y los puntos del carrusel de 24 px | M | S |
| 1.8 | Accesibilidad del libro de historia (J4, antes 3.6): anunciar solo "Página X de Y" y ocultar con `inert` las caras no visibles | M | S |
| 1.6 | Borrar el JS muerto (J1) y las 225 reglas CSS sin uso | B | S |
| 1.7 | Actualizar `README.md` y `docs/CODIGO.md` con la estructura real | M | S |

### Fase 2 · Diseño y conversión

| # | Acción | Impacto | Esfuerzo |
|---|--------|---------|----------|
| 2.1 | Hero con mensaje y CTA visibles en el primer pantallazo (D1) | A | M |
| 2.2 | Menú visible en escritorio con 5–6 entradas y botón "Donar" (D2) | A | M |
| 2.3 | Pie y CTA de WhatsApp por programa en las páginas internas (D6) | A | S |
| 2.4 | Agrupar los botones flotantes en móvil (D5) | M | M |
| 2.5 | Unir secciones redundantes de la portada (D3) | M | M |
| 2.6 | Iconos SVG propios en lugar de emojis (D9) | B | M |

### Fase 3 · Estructura escalable

| # | Acción | Impacto | Esfuerzo |
|---|--------|---------|----------|
| 3.1 | Crear `tokens.css` con el sistema 6.2 y reemplazar colores, sombras y radios sueltos | A | M |
| 3.2 | Dividir `styles.css` por componente/sección con `@layer`, empezando por `@layer legacy` (ver R1). Por cada selector repetido, conservar solo el valor que hoy se ve y borrar el resto, sección por sección, comparando con las capturas de 0.2 | A | L |
| 3.3 | Eliminar los `!important` a medida que cada bloque queda consolidado (objetivo: menos de 10) | A | (incluido en 3.2) |
| 3.4 | Separar `main.js` en módulos ES (6.3) y sacar los datos de contacto a configuración | M | M |
| 3.5 | Migrar a Eleventy: `base.njk`, parciales y `_data/*.json` (6.1) | A | L |

**Orden sugerido:** 0 → 1 → 2.1–2.3 → 3.1 → 3.2 (por secciones, empezando por header/menú, que es lo más fragmentado) → 3.4 → 3.5 → resto.

**Criterios para dar la refactorización por terminada:**
- `styles.css` dividido; ningún selector definido más de 2 veces (base y una consulta `@media`).
- Menos de 10 `!important`; solo 3 puntos de corte.
- WhatsApp, teléfono, correo y dirección definidos en un único archivo.
- Capturas antes y después sin diferencias visuales no buscadas.
- axe sin errores en las 7 páginas.

---

## 8. Estado de aplicación (v48)

Aplicado el 18-11-2026 sobre esta copia. Respaldo previo en `_respaldo-2026-11-18-v47/` (HTML, CSS, JS y docs) y archivos retirados en `_respaldo-2026-11-18-v47/assets-retirados/`.

| # | Estado | Qué se hizo |
|---|--------|-------------|
| 1.1 | ✅ | 53 imágenes únicas convertidas a WebP (480, 960 y 1600 px como máximo) en `assets/img/opt/`, con `srcset` y `sizes` medidos en 72 etiquetas `<img>` y en los fondos del CSS. Carga inicial de la portada: **2,2 MB → unos 800 KB** en escritorio y **unos 600 KB** en móvil, fuentes incluidas. Los originales se conservan como fuente; `og:image` y el favicon siguen en JPEG. |
| 1.2 | 🟡 | Retirados los 5 archivos sin uso y la copia de `pantalla inicio/` (0,9 MB). Las páginas ya usan nombres limpios de `assets/img/opt/`; los originales con espacios quedan solo como fuente. `cosecha/` y `siembra/becados/` comparten ahora un único WebP. |
| 1.3 | ❌ | Sin hacer: no hay herramientas de compresión de PDF ni de video en este equipo (Ghostscript, ffmpeg). |
| 1.4 | 🟡 | Google Fonts añadido a `programas/index.html`. **No** se redujeron los pesos: el CSS usa 500 y 800 y quitarlos cambiaría el aspecto; hacerlo junto con 3.1. |
| 1.5 | ✅ | Pie de las páginas internas con contraste 11,7:1; recortes de 320 px corregidos; área táctil de 24 × 24 px en los puntos del carrusel. |
| 1.6 | 🟡 | JS muerto borrado (`initHeroGallery`, `heroGalleryDots`, `lazyVideo` y la rama de `iframe`). Las 225 reglas CSS sin uso quedan para 3.2. |
| 1.7 | ✅ | `README.md` actualizado. |
| 1.8 | ✅ | Libro de historia: "Página X de Y" es el único anuncio (`role="status"`) y solo las 2 caras visibles son accesibles (`inert` en el resto). |
| 2.1 | ✅ | Desde 1024 px el hero mide `clamp(340px, 42svh, 500px)`: en 1440 × 900 el título y los botones entran en el primer pantallazo, y la foto ya no se amplía por encima de su tamaño real. |
| 2.3 | ✅ | Las 5 páginas de programas y la sede tienen pie común (Fundación, Programas, Transparencia, Contacto y WhatsApp). Sus CTA abren WhatsApp con un mensaje según el programa y registran un evento de analítica. "Volver a Sede Espinal" pasa a "Volver a la portada". |
| H2/J2 | 🟡 | En `main.js` el número está en una sola constante `CONTACT`. En el HTML sigue repetido hasta tener plantillas (3.5). |
| 2.2 | ✅ (v49, HU4) | Desde 1080 px el menú queda visible con 6 entradas (Fundación, Sede Espinal, Programas, Impacto, Contacto, Informes) y botón "Donar" a WhatsApp; el logo pasa a la izquierda. Por debajo sigue la hamburguesa con los 13 apartados y "Donar" al final. |
| 2.4 | ✅ (v49, HU4) | En móvil, un solo botón de contacto despliega WhatsApp, Instagram, Facebook y el asistente; se cierra con Escape o al tocar fuera. El dock oculto junto a Contacto ya no recibe foco (`visibility: hidden`). |
| 3.1 | 🟡 (v50, HU5) | `tokens.css` con un único `:root`: los 6 bloques `:root` de `styles.css` se unificaron con sus valores finales; los nombres antiguos quedan como alias. 84 `border-radius: 999px` pasan a `var(--radius-pill)`. Falta reemplazar los 127 colores y las sombras sueltas. |
| 3.2 | 🟡 (v50, HU5) | Primer paso hecho: `styles.css` y `navidad.css` dentro de `@layer legacy` (R1). Verificado: el estilo calculado de cada elemento y pseudo-elemento de las 7 páginas (390/1440 px, con y sin Navidad) es idéntico al de antes. Falta mover bloques a sus capas y borrar duplicados. |
| 3.1 | 🟡 (v51, HU6) | Colores y radios escritos a mano que coinciden **exactamente** con un token pasan a `var()`: 48 colores hex y 37 `border-radius` (8, 12 y 32 px). Nuevo token `--color-white` para texto e iconos sobre fondos de color. Quedan 108 colores hex distintos (183 usos), los `rgba()` y las sombras sin token: unificarlos cambia el aspecto y hay que decidirlo con capturas. |
| 3.2 | 🟡 (v51, HU6) | Borradas **1.347 declaraciones muertas** (siempre pisadas por una regla posterior con el mismo selector, el mismo contexto `@media`/`@supports` y la misma o mayor importancia) y las 307 reglas que quedaron vacías. Se conservan los duplicados dentro de una misma regla y los que usan `svh`/`dvh`, `color-mix()` o `env()`, porque suelen ser alternativas para navegadores antiguos. `styles.css`: 11.916 → 9.524 líneas, 578 → 416 `!important`. |
| A11y | ✅ (v51, HU6) | axe-core 4.10 (WCAG 2.1 A/AA) vuelto a ejecutar en las 7 páginas. Corregidos: los carruseles de actividades y del equipo no se podían desplazar con el teclado (`role="region" tabindex="0"`), y `aria-label` no permitido en `#site-chatbot` (`role="region"`). Los avisos de contraste en los `.eyebrow` son falsos positivos de la animación de entrada: con las animaciones terminadas no aparecen. |
| 2.5, 2.6, 3.3–3.5 | ⏳ | Pendientes. 2.5 (unir secciones) es una decisión de contenido de la fundación. |

**Verificación:** las 7 páginas en Chromium a 320, 390 y 1440 px, con y sin temporada: sin errores de JavaScript, sin imágenes rotas y sin contenido fuera de pantalla. Libro, chatbot y CTA probados. **axe no se volvió a ejecutar en v48** (sí en v51, HU6).

**Verificación v51 (HU6):** se cargaron el CSS de `dev` y el de `hu6` sobre las mismas páginas y se comparó el estilo calculado (colores, fondos, bordes, radios, sombras, fuente, tamaño y medidas, también de `::before` y `::after`) de los 5.627 elementos de las 7 páginas, a 390 y 1440 px, con y sin Navidad, y en 3 estados: al cargar, con la página desplazada y con el menú abierto. **No hay diferencias**, salvo la animación de pulso de `.hero-badge-dot` y variaciones de ±0,016 px en el ancho del texto, que son ruido de rasterización (también aparecen al comparar `dev` consigo mismo). Sin errores de JavaScript, sin imágenes rotas y sin desborde horizontal a 320, 390 y 1440 px.
