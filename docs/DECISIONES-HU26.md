# Decisiones HU26

Decisiones tomadas sin consultar durante HU26: qué se decidió, por qué y cómo revertirlo.

| # | Decisión | Por qué | Cómo revertirlo |
|---|---|---|---|
| 1 | La rama de trabajo se llama `hu27`, no `hu26`. | `hu26` ya existía: se usó para los ajustes de movimiento y está fusionada en `dev` y `main`. Reusar el nombre mezclaría dos trabajos distintos. | Renombrar la rama antes del PR: `git branch -m hu27 <nombre>`. |
| 2 | Commits pequeños en una sola rama, sin fusionar ni publicar. | Lo pide el encargo; reemplaza la regla habitual de 2 a 5 commits por bloque. | No aplica. |
| 3 | El botón «Nieve» de la portada va dentro del menú, con el estilo de «Compartir» (ícono en escritorio, fila con texto en el menú del celular). En las páginas internas es un ícono redondo de 44 px. | La píldora ya va justa; un botón más la desbordaba. Su nombre accesible es «Nieve» con `aria-pressed`, así el texto visible coincide con el nombre. | Volver a `shell.prepend(button)` en `seasonal.js`. |
| 4 | La píldora usa `width: max-content`. | Con `left: 50%`, el ancho disponible era media pantalla y la píldora se encogía por debajo de su contenido (el último ícono quedaba cortado en todos los anchos). | Quitar la línea en `.site-header` de `sitio.css`. |
| 5 | La nieve cae solo sobre la foto del inicio, la campaña de Navidad y la foto de portada de las páginas internas, detrás del texto. | El encargo pide que no tape texto ni formularios. | `SNOW_AREAS` en `seasonal.js`. |
| 6 | La entrada es decorativa (`aria-hidden`, su botón fuera del orden de tabulación): se cierra sola a los 1,2 s o con el primer gesto, y por CSS a los 3 s si el JS falla. | Ya no bloquea ni recibe foco; cualquier tecla, clic, toque o scroll la cierra. | `initEntrada()` en `portada.js`. |
| 7 | La foto del inicio ya no aparece desde cero: se pinta desde el primer momento y solo «se asienta» (escala 1,12 → 1). | Para que el LCP sea la foto y no el texto de la entrada. | `introInicio()` en `movimiento.js`. |
| 8 | Momentos usa `object-fit: cover` en 4:3 con encuadre por foto (`--encuadre`). | Lo pide el encargo (antes se veían enteras con franjas). La foto vertical se encuadra en las caras (50 % 75 %). | Volver a `object-fit: contain`. |
| 9 | El año del pie y los años de trayectoria se calculan al compilar (`src/_data/fechas.js`); se retiró `meta.js`. | El sitio se compila en cada publicación; así funciona sin JS. | Restaurar `meta.js`. |
| 10 | El equipo vive en `site.equipo` con `nombre`, `cargo`, `descripcion`, `etiquetas`, `foto` (`src`, `srcset`, `ancho`, `alto`), `alt` y `pendiente`. No se agregó `area`: hoy el sitio no tiene ese dato aparte del cargo. | No inventar datos. `pendiente` documenta qué falta confirmar (nombre de coordinación, rol de Caren). | Volver a escribir las tarjetas en `index.html`. |
| 11 | La pastilla de Navidad sube al lugar de la insignia en celular. | En celular el texto del inicio llena la pantalla y la barra fija quedaría encima de la pastilla. | Quitar la regla `order: -2` de `navidad.css`. |
| 12 | Las respuestas fijas del chat pasaron a `assets/js/modules/respuestas.js` (sin DOM) y leen `site.json` por `#site-data`. Ante horarios, requisitos, costos, edades o inscripciones sin pregunta frecuente que las responda, remiten al equipo con la pregunta escrita en el mensaje de WhatsApp. | Probable con `node:test`; nunca inventa un dato. | Restaurar `getAnswer` en `chatbot.js`. |
| 13 | La entrada no sale para robots (`bot`, `crawl`, `spider`, vistas previas de enlaces). Lighthouse **no** se excluye. | El encargo pide ocultarla a los robots; excluir a Lighthouse sería maquillar la medición. | Quitar la prueba `r=` del script del `<head>`. |
| 14 | Se corrigieron 8 `alt` que no describían la foto (por ejemplo, «taller educativo» en una foto de cinco adultos con una camiseta). Las fotos de fondo (`aria-hidden`) siguen con `alt=""`. | Lo que se ve es lo que se describe. | Revertir el commit de la Fase 1. |
