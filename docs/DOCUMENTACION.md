# Documentacion del proyecto

Esta guia explica el sitio de la Fundacion Amigos Como Arroz de la forma mas directa posible: primero que hace cada archivo, despues como esta armada la pagina y al final como modificarla sin romper partes importantes.

## Resumen rapido

Sitio web estatico (HTML, CSS y JavaScript puro) que Eleventy compila. Para verlo en tu equipo:

```bash
npm install   # solo la primera vez
npm start     # abre http://localhost:8080 y se recarga al guardar
```

Abrir el HTML con doble clic ya no sirve: las paginas usan datos de plantilla y modulos de JavaScript.

- `src/index.html`: contenido de la pagina principal.
- `src/programas/` y `src/sede-espinal/`: paginas internas (solo su contenido; cabecera y pie salen de `src/_includes/layouts/interna.njk`).
- `src/_data/site.json`: WhatsApp, correo, redes y versiones de cache, escritos una sola vez.
- `assets/css/tokens.css` y `assets/css/styles.css`: colores, tamanos, animaciones y version movil.
- `assets/js/modules/`: interacciones, un archivo por funcionalidad (`main.js` los arranca).

La estructura completa de carpetas esta en [`GUIA_PROGRAMADOR.md`](GUIA_PROGRAMADOR.md).

## Como leer el proyecto

Piensa en la pagina como tres capas:

1. `src/index.html` es el esqueleto: textos, secciones, enlaces, imagenes, formularios y botones.
2. `assets/css/` es la presentacion: colores, distribucion, sombras, tamanos, movimiento y version movil.
3. `assets/js/modules/` es el comportamiento: acciones que pasan despues de hacer clic, scrollear, cargar la pagina o enviar el formulario.

Cuando quieras cambiar algo visual, ubica el elemento en `src/index.html` y luego busca su clase en `assets/css/styles.css`.

Cuando quieras cambiar una interaccion, busca el `id` o la clase en `assets/js/modules/config.js` (`SELECTORS`) y abre el modulo que la usa.

## Secciones del HTML

Todas las secciones principales estan dentro de `<main id="main">`.

| Seccion | ID | Para que sirve |
|---|---|---|
| Hero / Inicio | `inicio` | Primera pantalla con nombre de la fundacion y botones principales. |
| Fundacion | `fundacion` | Presenta la mision general y una imagen de apoyo. |
| Programas | `programas` | Muestra Semilla, Siembra, Cosecha y Acompanamiento Psicosocial. |
| Impacto | `impacto` | Muestra metricas con contadores animados. |
| Testimonios | `testimonios` | Incluye opiniones o historias de beneficiarios y comunidad. |
| Momentos | `momentos` | Linea de tiempo con hitos del ano. |
| Equipo | `equipo` | Carrusel horizontal de integrantes. |
| Videos | `videos` | Enlaces visuales a redes oficiales de la fundacion. |
| Contacto | `contacto` | Datos de contacto y formulario que abre WhatsApp. |
| Footer | sin ID principal | Enlaces finales y redes sociales. |

### Navegacion

El menu superior usa enlaces tipo ancla:

```html
<a class="nav-link" href="#programas">Programas</a>
```

El valor de `href` debe coincidir con el `id` de una seccion:

```html
<section class="section" id="programas">
```

Si agregas una seccion nueva y quieres que aparezca en el menu, debes hacer dos cosas:

1. Crear la seccion con un `id` unico.
2. Agregar un enlace en la lista `<ul class="nav-list" id="nav-list">`.

## Guia para editar contenido

### Cambiar textos principales

Archivo: `src/index.html`

Busca el titulo o texto actual y editalo directamente. Ejemplo:

```html
<h1 class="hero-title" id="hero-title">Amigos Como Arroz</h1>
```

### Cambiar programas

Archivo: `src/index.html`

Cada programa es una tarjeta:

```html
<article class="program-card reveal">
  <div class="program-icon" aria-hidden="true">🌱</div>
  <h3>Semilla</h3>
  <p>...</p>
  <a href="programas/semilla.html">Mas informacion</a>
</article>
```

Para agregar otro programa, copia una tarjeta completa y cambia icono, titulo, descripcion y enlace. Si el enlace apunta a `programas/nuevo-programa.html`, tambien debe existir `src/programas/nuevo-programa.html` (ver [`GUIA_PROGRAMADOR.md`](GUIA_PROGRAMADOR.md), seccion 6).

### Cambiar metricas de impacto

Archivo: `src/index.html`

Los numeros animados usan `data-counter`:

```html
<strong data-counter="4200">0</strong>
```

El numero final es el valor de `data-counter`. El `0` inicial se deja asi porque JavaScript lo anima hasta llegar al valor final.

### Cambiar integrantes del equipo

Archivo: `src/index.html`

Cada integrante esta dentro de:

```html
<article class="team-card-modern">
```

Edita la imagen, el nombre, el rol y los datos de `team-meta`. El carrusel se ajusta automaticamente porque `assets/js/modules/team-slider.js` detecta todas las tarjetas con la clase `.team-card-modern`.

### Cambiar redes visuales

Archivo: `src/index.html`

La seccion actual muestra tarjetas visuales que enlazan a los canales oficiales. Cada tarjeta usa una imagen local y un enlace externo:

```html
<a class="video-link-card" href="https://www.instagram.com/amigoscomoarroz">
```

Si mas adelante tienes videos oficiales, puedes reemplazar estos enlaces por botones `.video-lazy` con el ID real del video.

### Cambiar WhatsApp

Archivo: `src/_data/site.json`

```json
"whatsapp": "573187073308",
"whatsappLabel": "318 707 3308",
```

Con cambiarlo ahi se actualizan todos los enlaces de las paginas, el pie, el chatbot y el formulario. En el HTML los enlaces con mensaje se escriben asi:

```njk
{{ 'Hola, quiero más información.' | whatsapp }}
```

## Guia del CSS

Archivos: `assets/css/tokens.css` (variables y orden de capas) y `assets/css/styles.css` (estilos, dentro de `@layer legacy`).

### Variables globales

Los colores, tipografia, radios y sombras estan en `tokens.css`:

```css
--color-brand-500: #c96f4a;
--color-accent-500: #d96f84;
--shadow-1 / --shadow-2 / --shadow-3
```

Si quieres cambiar la identidad visual completa, empieza por esas variables. Los nombres antiguos (`--orange`, `--pink`…) son alias de los nuevos.

### Clases base importantes

| Clase | Uso |
|---|---|
| `.container` | Limita el ancho del contenido y lo centra. |
| `.section` | Da espacio vertical entre secciones. |
| `.section-header` | Agrupa titulo, etiqueta y descripcion de una seccion. |
| `.btn` | Estilo base de botones. |
| `.reveal` | Elementos que aparecen con animacion al hacer scroll. |
| `.visible` | Clase que JavaScript agrega cuando un elemento ya debe mostrarse. |

### Responsive

Para codigo nuevo usa solo tres puntos de corte: 560, 840 y 1080 px. El CSS historico todavia tiene otros (`max-width: 620px`, `980px`…); si algo se ve mal en celular, busca la clase y revisa sus `@media`.

### Importante sobre el CSS actual

`styles.css` ya se limpio en parte (declaraciones muertas, reglas repetidas fusionadas y `!important` sobrantes; ver [`AUDITORIA-ESTRUCTURA-2026-11.md`](AUDITORIA-ESTRUCTURA-2026-11.md)). Para codigo nuevo usa una capa posterior (`@layer components { … }`): le gana a `legacy` sin `!important`.

## Guia del JavaScript

`assets/js/main.js` es un modulo que arranca un archivo por funcionalidad de `assets/js/modules/` (menu, scroll, contadores, formulario, carrusel, videos, libro, chatbot y contacto flotante). La tabla de modulos y su orden estan en [`CODIGO.md`](CODIGO.md), seccion 5.

## Revision del codigo

### Lo que esta bien

- La pagina usa HTML semantico con `section`, `article`, `header`, `main`, `footer` y etiquetas descriptivas.
- Hay buenas bases de accesibilidad: `skip-link`, `aria-label`, `aria-live`, `aria-expanded`, `aria-controls` y textos alternativos en imagenes.
- El JavaScript esta separado del HTML, en un modulo por funcionalidad.
- Se respeta `prefers-reduced-motion`, lo cual mejora accesibilidad.
- El formulario evita envios vacios y codifica el mensaje antes de abrir WhatsApp.
- La compilacion es simple (Eleventy, sin framework) y Vercel la ejecuta sola.

### Riesgos o puntos a mejorar

1. CSS historico todavia grande.
   Ya se fusionaron las reglas repetidas, pero quedan 188 `!important` y varios puntos de corte antiguos. Un cambio visual en `styles.css` puede chocar con otra regla; el codigo nuevo debe ir en una capa posterior.

2. Abrir el HTML con doble clic no funciona.
   Hay que usar `npm start` (Eleventy y modulos de JavaScript).

3. Dependencia de recursos externos.
   Los enlaces a redes sociales necesitan internet, pero las imagenes principales del sitio ya son locales.

4. Datos de ejemplo en equipo.
   Conviene revisar que nombres, roles y fotos finales sean los correctos antes de publicar.

5. Formulario sin backend.
   El contacto abre WhatsApp, pero no guarda mensajes en una base de datos ni envia correo. Si se necesita historial, hay que conectar un backend, Formspree, Netlify Forms o servicio similar.

6. JavaScript asume que algunos elementos existen.
   Como la pagina actual si los tiene, funciona. Pero si en el futuro se elimina `#hero-content`, `#contact-form`, `#reading-progress-bar` o `.menu-toggle`, el script puede fallar. Para hacerlo mas robusto, se pueden agregar validaciones antes de usar esos elementos.

7. Formulario sin envio por correo real.
   Actualmente el formulario abre WhatsApp. Si se necesita envio automatico a correo, hay que conectar un servicio externo o backend.

## Como hacer cambios comunes

### Cambiar colores principales

Edita las variables `--color-*` en `assets/css/tokens.css` y sube `cache.tokens` en `src/_data/site.json`.

### Cambiar el telefono de contacto

Edita `whatsapp` y `whatsappLabel` en `src/_data/site.json`. Para comprobar que no quedo el numero viejo en otro lugar:

```bash
grep -rn "573187073308" src assets/js
```

### Agregar una seccion nueva

1. Crea un bloque `<section class="section" id="nuevo-id">` en `src/index.html`.
2. Agrega un enlace en el menu: `<a class="nav-link" href="#nuevo-id">Nombre</a>`.
3. Agrega estilos en `assets/css/styles.css` si necesita diseno especial.
4. Si quieres animacion, agrega la clase `reveal` a los elementos internos.

### Agregar una tarjeta con animacion

Agrega `reveal`:

```html
<article class="program-card reveal">
```

JavaScript la detectara automaticamente y el CSS aplicara la animacion.

### Cambiar imagenes

Reemplaza el atributo `src` de la imagen:

```html
<img src="URL_O_RUTA" alt="Descripcion clara" loading="lazy" />
```

Mantener `alt` es importante para accesibilidad.

## Recomendaciones de mantenimiento

- Mantener `assets/` para logo, imagenes propias y recursos locales.
- Seguir limpiando `assets/css/styles.css` seccion por seccion y moverlo a las capas `components`/`sections`.
- Despues de tocar un CSS o JS, subir su version en `cache` de `src/_data/site.json`.
- Reemplazar nombres e imagenes genericas del equipo por informacion real.
- Probar siempre en computador y celular despues de tocar header, hero, contacto o responsive.
- Si se va a publicar formalmente, revisar SEO basico: imagen social, favicon, titulo, descripcion y datos reales.

## Checklist antes de publicar

- [ ] El telefono de WhatsApp es correcto.
- [ ] El correo es correcto.
- [ ] Instagram y Facebook apuntan a perfiles reales.
- [ ] Los nombres del equipo son reales.
- [ ] Las imagenes tienen permiso de uso o son propias.
- [ ] Los videos son los oficiales.
- [ ] El sitio se ve bien en celular.
- [ ] El formulario abre WhatsApp con el mensaje correcto.
- [ ] Los textos no tienen errores de ortografia.
- [ ] El logo carga correctamente.

