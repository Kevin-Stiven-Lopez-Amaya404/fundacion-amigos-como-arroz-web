# Centro de documentacion

Esta carpeta reune la documentacion que debe leer cualquier programador antes de modificar el sitio.

## Orden recomendado de lectura

1. [`GUIA_PROGRAMADOR.md`](GUIA_PROGRAMADOR.md): entrada principal para entender la arquitectura, carpetas, rutas y flujo de trabajo.
2. [`DOCUMENTACION.md`](DOCUMENTACION.md): guia funcional del sitio, secciones visibles y cambios comunes.
3. [`PROGRAMAS.md`](PROGRAMAS.md): explicacion especifica del bloque de Programas y sus paginas individuales.
4. [`CODIGO.md`](CODIGO.md): detalle tecnico de la compilacion, plantillas, CSS, JavaScript, assets y reglas de mantenimiento.
5. [`DESPLIEGUE.md`](DESPLIEGUE.md): ramas, PR y publicacion en Vercel.

## Regla rapida

- Ver el sitio: `npm start` (no abrir el HTML con doble clic).
- Contenido principal: `src/index.html`.
- Programas individuales: `src/programas/`.
- WhatsApp, correo, redes y versiones de cache: `src/_data/site.json`.
- Estilos: `assets/css/sitio.css` (dirección visual en `DESIGN.md`).
- Interacciones: `assets/js/modules/`.
- Imagenes: `assets/img/brand`, `assets/img/hero`, `assets/img/content` y `assets/img/team`.

## README internos

Tambien hay archivos README pequenos dentro de carpetas clave:

- `assets/README.md`
- `assets/img/README.md`
- `src/programas/README.md`

Sirven para orientar rapidamente a quien navegue el proyecto desde el explorador de archivos.
