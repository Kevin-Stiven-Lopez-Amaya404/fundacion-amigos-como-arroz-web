# Checklist de despliegue

Usa esta lista antes de publicar la pagina.

## Antes de subir

- Reemplazar `G-XXXXXXXXXX` en `assets/js/analytics.js` por el ID real de Google Analytics 4.
- Confirmar que telefono, correo, Instagram y Facebook sean oficiales.
- Confirmar cifras de impacto: participantes, voluntarios, aliados, proyectos y permanencia.
- Confirmar nombres, roles y fotos del equipo.
- Confirmar que los dos videos de YouTube sean los videos que quieres mostrar.
- Revisar la pagina en computador y celular.
- Para que el chat responda con Claude: en Vercel, Settings → Environment Variables, crear `ANTHROPIC_API_KEY` (Production y Preview) con una clave de console.anthropic.com y volver a desplegar. Sin la clave, el chat sigue funcionando con sus respuestas fijas. Conviene ponerle un limite de gasto mensual a esa clave en la consola de Anthropic.

## Archivos importantes

- `src/index.html`: pagina principal.
- `src/programas/` y `src/sede-espinal/`: paginas internas.
- `eleventy.config.mjs` y `vercel.json`: compilacion y publicacion.
- `api/chat.mjs` y `api/_contexto.mjs`: asistente del chat con Claude (funcion de Vercel).
- `assets/css/styles.css`: estilos.
- `assets/js/main.js` y `assets/js/modules/`: interacciones.
- `src/_data/site.json`: WhatsApp, correo, redes y versiones de cache.
- `assets/js/analytics.js`: conteo de visitas y eventos.
- `robots.txt`: permisos para buscadores.
- `sitemap.xml`: mapa del sitio para buscadores.
- `site.webmanifest`: datos basicos de instalacion/icono.

## Publicacion

El sitio se compila con Eleventy (`npm run build`) y el resultado queda en `_site/`.

- **Vercel (actual):** lee `vercel.json`, ejecuta `npm run build` y publica `_site/`. Cada PR tiene vista previa; fusionar en `main` publica producción.
- **Otro hosting (GitHub Pages, Netlify, `public_html`):** ejecutar `npm run build` y subir el contenido de `_site/`.

`_site/` debe contener `index.html`, `assets/`, `programas/`, `sede-espinal/`, `informes/`, `robots.txt`, `sitemap.xml` y `site.webmanifest`.
