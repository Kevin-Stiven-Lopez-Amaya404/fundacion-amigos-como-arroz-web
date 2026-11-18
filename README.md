# Fundación Amigos Como Arroz

Página web institucional para la Fundación Amigos Como Arroz. Es un sitio estático hecho con HTML, CSS y JavaScript puro.

## Cómo abrirlo

Abre `index.html` directamente en el navegador.

Si prefieres levantarlo con servidor local, puedes usar cualquier servidor estático sencillo desde esta carpeta.

## Estructura

```text
fundacion/
  index.html                    Página principal (14 secciones)
  programas/
    index.html                  Vista general de los 4 programas
    semilla.html · siembra.html · cosecha.html · psicosocial.html
  sede-espinal/index.html       Página de la sede Espinal
  assets/
    css/styles.css              Estilos (capas de corrección v47 y v48 al final)
    css/seasonal/navidad.css    Estilos de temporada (solo con <html data-season="navidad">)
    js/main.js                  Interacciones de la portada (CONTACT = número de WhatsApp)
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
- Barra de progreso de lectura.
- Carrusel del equipo.
- Videos incrustados.
- Formulario que abre WhatsApp con el mensaje armado.
- Dock flotante de redes sociales.
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

El sitio es estatico. Para publicarlo, sube la carpeta completa a tu hosting o conecta este repositorio a GitHub Pages, Netlify, Vercel u otro servicio de sitios estaticos.

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

- Cambios de contenido: edita `index.html`.
- Cambios visuales: edita `assets/css/styles.css`.
- Cambios de interacción: edita `assets/js/main.js`.
- Cambios de programas: edita los archivos dentro de `programas/`.
- Cambios de WhatsApp: en `assets/js/main.js` cambia `CONTACT.whatsapp`; en el HTML busca `573187073308` (portada, programas y sede).

## Recomendación

Antes de publicar, revisa especialmente nombres reales del equipo, teléfono, correo, redes sociales, videos oficiales e imágenes definitivas.
