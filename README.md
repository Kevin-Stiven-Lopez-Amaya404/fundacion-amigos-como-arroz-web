# Fundación Amigos Como Arroz

Página web institucional para la Fundación Amigos Como Arroz. Es un sitio estático hecho con HTML, CSS y JavaScript puro, que [Eleventy](https://www.11ty.dev/) arma a partir de las páginas de `src/`.

## Cómo abrirlo

Necesitas Node.js 18 o superior.

```bash
npm install      # solo la primera vez
npm start        # compila y abre un servidor en http://localhost:8080 que se recarga al guardar
npm run build    # solo compila: el sitio listo para publicar queda en _site/
```

Edita siempre los archivos de `src/` y `assets/`. `_site/` se genera y no se sube a Git.

## Estructura

```text
fundacion/
  src/                          Páginas (Eleventy las copia a _site/ con la misma ruta)
    _data/site.json             WhatsApp, correo, redes y versiones de caché (una sola vez)
    _includes/layouts/interna.njk   Cabecera, <head> y pie de las 6 páginas internas
    index.html                  Página principal (14 secciones)
    programas/
      index.html                Vista general de los 4 programas
      semilla.html · siembra.html · cosecha.html · psicosocial.html
    sede-espinal/index.html     Página de la sede Espinal
  eleventy.config.mjs           Configuración de Eleventy (qué se copia tal cual)
  vercel.json                   Vercel ejecuta npm run build y publica _site/
  assets/
    css/sitio.css               Todo el estilo: tokens, pantallas, carril y secciones en @layer
    fonts/                      Big Shoulders Display y Schibsted Grotesk (servidas desde el sitio)
    css/seasonal/navidad.css    Estilos de temporada (solo con <html data-season="navidad">)
    js/main.js                  Arranca las interacciones de la portada (<script type="module">)
    js/modules/                 Un archivo por funcionalidad (menu, chatbot, contact-form…);
                                config.js = selectores y contacto (leído de site.json)
    js/seasonal.js              Enciende/apaga la Navidad (SEASON_CONFIG.mode)
    js/analytics.js             Google Analytics 4 opcional
    img/opt/                    Imágenes WebP optimizadas (480/960/1600 px) que usan las páginas
    img/{brand,hero,content,team}/   Originales
    semilla/ siembra/ cosecha/ psicologia/   Fotos originales por programa
    videos/                     Videos y pósteres (se cargan al pulsar)
  informes/                     Informes de gestión en PDF
  docs/                         Documentación y auditorías (ver docs/README.md)
  sitemap.xml · robots.txt · site.webmanifest
```

**Fotos nuevas:** guarda el original en su carpeta y crea sus versiones WebP en `assets/img/opt/`
(480, 960 y 1600 px de ancho como máximo, calidad 80 %). En el HTML usa `src` con la de 960 px y `srcset` con las tres.

## Qué incluye

- Diseño responsivo.
- Menú móvil.
- Animaciones al hacer scroll.
- Contadores animados.
- Barra de progreso de lectura y efectos ligados al scroll con `motion` (foto del hero y línea de «Mejores momentos»).
- Carrusel del equipo.
- Videos incrustados.
- Formulario que abre WhatsApp con el mensaje armado.
- Botón flotante de WhatsApp (Instagram y Facebook están en el pie).
- Botón para volver al inicio.
- Analítica opcional para contar visitas reales con Google Analytics 4.

## Contador de visitas

El sitio ya queda preparado para contar personas y visitas reales con Google Analytics 4.

Para activarlo:

1. Crea una propiedad web en Google Analytics 4.
2. Copia el ID de medición, normalmente con formato `G-XXXXXXXXXX`.
3. En `assets/js/analytics.js`, busca:

```js
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

4. Reemplaza `G-XXXXXXXXXX` por tu ID real y publica la pagina.

Cuando publiques la página, Google Analytics empezará a mostrar usuarios, visitas, páginas vistas y clics importantes como WhatsApp, donar y voluntariado.

## Despliegue

Vercel compila y publica el sitio solo: cada PR genera una vista previa y cada fusión en `main` publica producción. Para otro hosting, ejecuta `npm run build` y sube el contenido de `_site/`.

Antes de publicar, revisa [docs/DESPLIEGUE.md](docs/DESPLIEGUE.md).

## Documentación principal

La explicación completa está en:

[docs/DOCUMENTACION.md](docs/DOCUMENTACION.md)

También quedan guías específicas en:

- [docs/README.md](docs/README.md)
- [docs/GUIA_PROGRAMADOR.md](docs/GUIA_PROGRAMADOR.md)
- [docs/PROGRAMAS.md](docs/PROGRAMAS.md)
- [docs/CODIGO.md](docs/CODIGO.md)

Ahí encontrarás:

- Qué hace cada archivo.
- Cómo está organizada cada sección.
- Cómo cambiar textos, imágenes, videos, programas, equipo y contacto.
- Cómo funciona el JavaScript.
- Cómo leer el CSS.
- Revisión del código con puntos fuertes y riesgos.
- Checklist antes de publicar.

## Temporadas (Navidad)

La decoración navideña se enciende y apaga sola (15 nov – 6 ene). Para forzarla o apagarla, cambia `mode` en `assets/js/seasonal.js` (`"auto"`, `"on"` u `"off"`). Vista previa: `index.html?temporada=navidad` o `?temporada=off`. Detalles en [docs/AUDITORIA-2026-11.md](docs/AUDITORIA-2026-11.md).

## Mantenimiento rápido

- Cambios de contenido: edita `src/index.html`.
- Cambios visuales: edita `assets/css/sitio.css` (dirección visual en `DESIGN.md`).
- Cambios de interacción: edita el módulo de `assets/js/modules/` (y regístralo en `assets/js/main.js` si es nuevo). Los módulos no cargan abriendo el HTML con doble clic: usa `npm start`.
- Cambios de programas: edita los archivos dentro de `src/programas/`.
- Cambios de WhatsApp, correo o redes: edita solo `src/_data/site.json` (el HTML y el JavaScript lo leen de ahí).
- Enlace de WhatsApp con mensaje: `{{ 'Hola, quiero…' | whatsapp }}` (el filtro codifica el texto).
- Después de cambiar un CSS o JS, sube su número en `cache` de `src/_data/site.json`.
- Página interna nueva: copia una de `src/programas/` y cambia su encabezado `---` (título, descripción, ruta canónica y enlace de volver).

## Recomendación

Antes de publicar, revisa especialmente nombres reales del equipo, teléfono, correo, redes sociales, videos oficiales e imágenes definitivas.
