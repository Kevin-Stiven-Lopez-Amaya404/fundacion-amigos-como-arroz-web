---
name: Fundación Amigos Como Arroz
description: La fundación contada como un feed vertical de historias reales, una pantalla a la vez.
colors:
  vacio: "#0b0b0f"
  tinta: "#15151c"
  grafito: "#22222c"
  niebla: "#33333f"
  linea: "rgb(255 255 255 / 0.14)"
  linea-fuerte: "rgb(255 255 255 / 0.32)"
  texto: "#f7f6f3"
  texto-2: "#cfcdd6"
  texto-3: "#a3a1b0"
  blanco: "#ffffff"
  rosa: "#e0245e"
  rosa-boton: "#c81d52"
  rosa-claro: "#ff7aa4"
  sol: "#f6c21c"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(3.4rem, 10.5vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 7.6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(1.6rem, 3.6vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.005em"
  cifra:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 8vw, 4.6rem)"
    fontWeight: 900
    lineHeight: 0.9
    fontFeature: "tnum"
  lead:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.06rem, 1.6vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  autor:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 600
    letterSpacing: "0.04em"
  label:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 700
    letterSpacing: "0.1em"
rounded:
  barra: "2px"
  foco: "4px"
  radio-s: "10px"
  radio: "14px"
  panel: "20px"
  pildora: "999px"
spacing:
  segmento: "4px"
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  margen: "clamp(18px, 5vw, 72px)"
  carril: "76px"
  carril-movil: "52px"
  barra: "64px"
  contenedor: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.rosa-boton}"
    textColor: "{colors.blanco}"
    typography: "{typography.label}"
    rounded: "{rounded.radio-s}"
    padding: "0 24px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.rosa}"
  button-whatsapp:
    backgroundColor: "{colors.texto}"
    textColor: "{colors.vacio}"
    typography: "{typography.label}"
    rounded: "{rounded.radio-s}"
    padding: "0 24px"
    height: "50px"
  button-whatsapp-hover:
    backgroundColor: "{colors.blanco}"
  button-contorno:
    backgroundColor: "rgb(11 11 15 / 0.35)"
    textColor: "{colors.texto}"
    typography: "{typography.label}"
    rounded: "{rounded.radio-s}"
    padding: "0 24px"
    height: "50px"
  button-contorno-hover:
    backgroundColor: "rgb(255 255 255 / 0.1)"
  nav-donar:
    backgroundColor: "{colors.rosa-boton}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pildora}"
    padding: "0 18px"
    height: "44px"
  carril-disco:
    backgroundColor: "rgb(11 11 15 / 0.42)"
    textColor: "{colors.texto}"
    rounded: "{rounded.pildora}"
    size: "48px"
  carril-disco-donar:
    backgroundColor: "{colors.rosa-boton}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pildora}"
    size: "48px"
  input:
    backgroundColor: "{colors.vacio}"
    textColor: "{colors.texto}"
    rounded: "{rounded.radio-s}"
    padding: "12px 14px"
    height: "50px"
  historia:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.texto}"
    padding: "clamp(18px, 3vw, 36px)"
    height: "min(74svh, 680px)"
    width: "min(82vw, 880px)"
---

# Design System: Fundación Amigos Como Arroz

## Overview

**Creative North Star: "Una historia por pantalla"**

El sitio es un feed vertical de historias reales. Cada pantalla es una persona, un programa o un momento: una foto real a sangre, un velo que oscurece la parte de abajo y la leyenda apoyada abajo a la izquierda, con la siguiente pantalla a un deslizamiento. El suelo es un vacío casi negro con grafitos; el texto es blanco cálido; la jerarquía la da solo la escala: un nombre o una cifra enorme por pantalla, en grotesca condensada alta y en mayúsculas.

La interfaz se comporta como la de una app de historias: un indicador segmentado arriba que se llena con el scroll, una columna de acciones con íconos de trazo a la derecha (Donar, WhatsApp, Programas, Compartir, Asistente) y una línea de autor con el logo como avatar debajo de cada leyenda. No hay tarjetas ni cajas para el contenido: el texto se apoya en la imagen y en el vacío. El rosa del logo es el único color de estado y el amarillo del logo solo vive en las cifras grandes.

El movimiento es mínimo: la leyenda entra una vez desde abajo al llegar a su pantalla y el resto queda quieto; con `prefers-reduced-motion` no se mueve nada. Rechaza la portada clásica de fundación (foto con titular centrado, fila de cifras, cuadrícula de tarjetas iguales). Construido sin comps, desde el código, a partir de la tirada atrevida `seed:3ad841bd70385560`.

**Key Characteristics:**
- Fondo oscuro único (`color-scheme: dark`), sin modo claro.
- Fotos reales a sangre con velo inferior; nunca tintes de color sobre la foto.
- Display condensado en mayúsculas a escala de cartel; cuerpo grotesco legible.
- Un solo rosa para todo lo activo, primario y seleccionado; amarillo solo en cifras.
- Acciones fijas en un carril a la derecha; indicador segmentado fijo arriba.
- Nada de cajas: separadores de 1 px y vacío en lugar de tarjetas.

## Colors

Un vacío casi negro con tres grafitos, texto blanco cálido en tres intensidades y dos colores tomados del logo con funciones estrictas.

### Primary
- **Rosa del logo** (`rosa`): el color de estado. Segmento activo del indicador, subrayado del enlace activo, segmento actual del visor de historias, punto activo del equipo, contorno de foco en campos, selección de texto, subrayado de `highlight-text` y hover de los botones rosas.
- **Rosa botón** (`rosa-boton`): el mismo rosa un punto más profundo para fondos con texto blanco encima (botón primario, Donar del menú y del carril, mensaje del usuario en el chat, círculos de etapa y marcas de lista). Existe por contraste AA con blanco.
- **Rosa claro** (`rosa-claro`): el rosa en texto pequeño sobre negro: enlaces dentro del chat, errores de formulario, «Ver fotos», estado del informe más reciente, fecha del momento «próximamente», hover de enlaces del menú móvil, íconos de contacto, cursor de los campos.

### Secondary
- **Sol** (`sol`): el amarillo del logo, reservado a las cifras grandes en display (métricas de impacto, cifra mayor de la fundación y años de informes). También es el anillo de foco de teclado (`:focus-visible`, 3 px con 3 px de separación), porque sobre fotos el rosa no garantiza contraste.

### Neutral
- **Vacío** (`vacio`): fondo del documento, del menú móvil a pantalla completa y de los campos de formulario; base de todos los velos.
- **Tinta** (`tinta`): fondo de las historias del carrusel mientras carga la foto, del panel de chat y de las secciones suaves de páginas internas.
- **Grafito** (`grafito`): burbuja del asistente en el chat.
- **Niebla** (`niebla`): pulgar de la barra de desplazamiento.
- **Línea** (`linea`): separadores de 1 px entre filas (métricas, informes, etapas, pie) y bordes del chat.
- **Línea fuerte** (`linea-fuerte`): contorno de botones secundarios, campos, píldoras y discos; anillo del avatar.
- **Texto** (`texto`): titulares y texto principal; fondo del botón de WhatsApp.
- **Texto 2** (`texto-2`): leads, párrafos de leyenda y línea de autor.
- **Texto 3** (`texto-3`): metadatos y rótulos (etiquetas de contacto, estado de informes, marcadores de campos, pie).
- **Blanco** (`blanco`): solo texto sobre rosa y fondo del logo.

### Velos
Los velos son parte del color: degradados del vacío que hacen legible el texto sobre la foto.
- **Velo** (`linear-gradient(180deg, rgb(11 11 15 / 0.2) 0%, rgb(11 11 15 / 0.42) 32%, rgb(11 11 15 / 0.86) 62%, rgb(11 11 15 / 0.97) 100%)`): velo inferior por defecto de pantallas e historias.
- **Velo lado** (`linear-gradient(90deg, rgb(11 11 15 / 0.82) 0%, rgb(11 11 15 / 0.45) 45%, rgb(11 11 15 / 0) 72%)`): se suma al inferior desde 900 px, porque la leyenda vive a la izquierda.
- **Velo alto** (`linear-gradient(180deg, rgb(11 11 15 / 0.94) 0%, rgb(11 11 15 / 0.86) 58%, rgb(11 11 15 / 0) 100%)`): franja de 128 px bajo la barra superior.
- **Velo de celular** (`0.35 → 0.7 → 0.92 → 0.97` a 0/22/42/100 %): por debajo de 900 px el velo se oscurece antes porque la leyenda ocupa casi toda la pantalla.
- **Velo de programa** (`0.1 → 0 → 0.82 → 0.96` a 0/30/72/100 %): leyenda corta, la foto respira más.

### Named Rules
**The Un Solo Rosa Rule.** El rosa del logo es el único color de estado: activo, seleccionado, primario y enfocado en campos. Ningún otro matiz marca estado; si algo está «encendido», es rosa.

**The Sol en Cifras Rule.** El amarillo solo pinta cifras grandes en display. Nunca fondos, botones, íconos ni texto corrido. La única excepción es el anillo de foco de teclado.

**The Foto Sin Tinte Rule.** Las fotos se oscurecen solo con velos del vacío. Nunca duotonos, filtros de color ni superposiciones rosas o amarillas.

## Typography

**Display Font:** Big Shoulders Display (con Arial Narrow, sans-serif), variable 700–900, autoalojada en `assets/fonts` (latin y latin-ext).
**Body Font:** Schibsted Grotesk (con Segoe UI, system-ui, sans-serif), variable 400–700, autoalojada.

**Character:** Una grotesca condensada alta en mayúsculas que se lee como cartel de feria o titular de reel, contra una grotesca de texto sobria y cálida. El contraste es de escala, no de color.

### Hierarchy
- **Display** (900, `clamp(3.4rem, 10.5vw, 6rem)`, 0.92, mayúsculas): el h1 de cada página. En la portada el nombre sube a `clamp(3.6rem, 13vw, 6rem)` en dos líneas; en programas `clamp(2.6rem, 10.5vw, 6rem)` con interlineado 0.88.
- **Headline** (800, `clamp(2.6rem, 7.6vw, 5rem)`, 0.92, mayúsculas): el h2 de cada pantalla.
- **Title** (800, `clamp(1.6rem, 3.6vw, 2.25rem)`, 1, mayúsculas): h3 de filas, etapas y bloques. En una historia del carrusel sube a `clamp(2.2rem, 6vw, 4rem)`.
- **Cifra** (900, `clamp(3rem, 8vw, 4.6rem)`, 0.9, cifras tabulares, amarillo): métricas; la destacada llega a `clamp(4.4rem, 14vw, 6rem)` y la cifra mayor a `clamp(4.5rem, 16vw, 6rem)`.
- **Lead** (400, `clamp(1.06rem, 1.6vw, 1.25rem)`, 1.55, máximo 62ch): el párrafo de la leyenda.
- **Body** (400, 1rem, 1.6): texto corrido y párrafos de filas, a 52–64ch.
- **Autor** (600, 0.84rem, 0.04em, sin mayúsculas): la línea de autor bajo la leyenda.
- **Label** (700, 0.86rem, 0.1em, mayúsculas): botones, Donar y rótulos de acción. Los rótulos de metadatos usan 0.76–0.8rem, 700, 0.06–0.08em, mayúsculas, en `texto-3`.

Los titulares usan `text-wrap: balance`; los párrafos `text-wrap: pretty`.

### Named Rules
**The Una Cosa Enorme Rule.** Cada pantalla tiene un solo elemento a escala de cartel: un nombre o una cifra. La jerarquía se hace solo con tamaño, nunca con color ni con cajas.

**The Mayúsculas Solo en Display Rule.** El display va siempre en mayúsculas; el texto de lectura nunca. Las mayúsculas en Schibsted quedan para botones y rótulos cortos con tracking amplio.

## Layout

La unidad es la **pantalla**: una sección de al menos `100svh`, en rejilla con el contenido alineado abajo. El relleno es `barra + 32px` arriba, `margen + carril` a la derecha (el carril nunca pisa el texto), `clamp(36px, 7vh, 72px)` abajo y `margen` a la izquierda. La leyenda (`pantalla-cuerpo`) es una columna flex con 18px de separación y como máximo 46rem; en la portada se estrecha a `min(34rem, 34vw)` desde 900px. Las pantallas largas (carruseles, listas, contacto) alinean arriba con `barra + clamp(40px, 8vh, 96px)` y abajo `clamp(64px, 12vh, 140px)`.

El margen lateral es fluido (`clamp(18px, 5vw, 72px)`); el contenedor llega a 1240px. La barra superior mide 64px y se separa 22px del borde para dejar sitio al indicador. El carril mide 76px (52px por debajo de 760px, donde baja a la esquina inferior derecha y pierde Compartir).

El ritmo usa pasos cortos: 4px entre segmentos, 8–12px entre botones y píldoras, 14–18px dentro de la leyenda, 22–24px entre filas, y saltos de pantalla con `clamp` en vh.

**Puntos de corte observados:** 420px (se oculta el subtítulo de la marca), 480px (métricas en una columna), 560px (barra de páginas internas compacta), 640px (formularios en dos columnas), 760px (carril lateral, rejillas de tres), 900px (velo lateral, foto encajada, informes en tres columnas), 1000px (impacto y contacto en dos columnas), 1080px (navegación horizontal; por debajo, menú a pantalla completa).

### Named Rules
**The Leyenda Abajo Rule.** El texto de una pantalla vive abajo a la izquierda, sobre el velo. Nunca centrado sobre la foto.

**The Carril Reservado Rule.** Todo contenido deja libre la columna derecha del carril (`margen + carril`), también el pie.

## Elevation & Depth

El sistema es plano: la profundidad la dan la foto, el velo y el vacío, no las sombras. Hay una única sombra, para lo que flota de verdad sobre la escena (la foto encajada de los fundadores en escritorio y el panel de chat). El texto sobre foto en la portada lleva una sombra difusa del vacío para legibilidad, y las etiquetas del carril una más corta. Los discos del carril usan `backdrop-filter: blur(8px)` sobre un vacío al 42 %.

### Shadow Vocabulary
- **Sombra flotante** (`box-shadow: 0 18px 40px -18px rgb(0 0 0 / 0.8), 0 4px 12px rgb(0 0 0 / 0.35)`): foto encajada y panel de chat.
- **Halo de leyenda** (`text-shadow: 0 2px 18px rgb(11 11 15 / 0.65)`): texto de la leyenda de la portada.
- **Halo de carril** (`text-shadow: 0 1px 6px rgb(0 0 0 / 0.7)`): etiquetas bajo los discos.
- **Anillo de avatar** (`box-shadow: 0 0 0 2px var(--vacio), 0 0 0 3px var(--linea-fuerte)`): el logo en la línea de autor.

### Named Rules
**The Velo Antes Que Sombra Rule.** Si el texto no se lee sobre una foto, se ajusta el velo; no se agrega una caja ni una sombra.

## Shapes

Esquinas suaves y pocas. Los botones, campos y enlaces de informe usan un radio pequeño (10px); la foto encajada en escritorio y las fotos de galería, uno mediano (14px); el panel de chat, 20px. Todo lo circular es circular de verdad: discos del carril, avatar, botones de equipo, sociales, cierre del chat, círculos de etapa. Las píldoras (999px) quedan para Donar del menú, filtros rápidos del chat, píldoras de metadatos y el botón Volver. Las historias del carrusel y las pantallas van a sangre, sin radio. Los segmentos del indicador son trazos de 3px con extremos redondos.

Los separadores son líneas de 1px (`linea` o `linea-fuerte`) arriba o abajo de una fila, nunca un marco completo alrededor del contenido.

## Components

### Buttons
Rectángulos firmes en mayúsculas espaciadas; el color dice qué hacen.
- **Shape:** esquinas suaves (10px), alto mínimo 50px, relleno horizontal 24px, borde de 1.5px.
- **Rosa (apoyar / donar):** fondo `rosa-boton`, texto blanco. Hover: `rosa`.
- **Blanco (WhatsApp):** fondo `texto`, texto `vacio`. Hover: blanco puro.
- **Contorno (todo lo demás):** borde `linea-fuerte`, fondo del vacío al 35 %, texto `texto`. Hover: borde `texto` y fondo blanco al 10 %.
- **Hover / Focus / Active:** transición de color de 180ms; hover solo en punteros finos; al pulsar escala a 0.97 en 120ms con `cubic-bezier(0.23, 1, 0.32, 1)`; foco con anillo amarillo de 3px.
- **Enlace de texto** (`hero-link`): 700, subrayado de 1px que pasa a 2px en hover, flecha detrás.

### Carril de acciones
La columna derecha fija, como en una app de historias. Discos de 48px (44px en celular) sobre vacío al 42 % con borde `linea` y desenfoque de 8px, ícono SVG de trazo 1.75 a 24px y etiqueta de 0.75rem debajo. Donar es el único disco rosa relleno; un disco abierto (el chat con `aria-expanded`) también pasa a rosa. Hover: blanco al 16 %. Al pulsar el disco escala a 0.92. En escritorio va centrado en vertical; por debajo de 760px se apila abajo a la derecha.

### Indicador segmentado
Barra fija arriba de todo, un segmento por pantalla con 4px de separación. Cada segmento es un trazo de 3px blanco al 28 %, con un relleno blanco que crece con el scroll (`scaleX`); el segmento actual se llena de rosa. Cada segmento es un enlace de 14px de alto a su pantalla. El visor de historias y los puntos del equipo repiten el mismo trazo.

### Pantalla y pantalla-fondo
La foto ocupa toda la pantalla con `object-fit: cover` detrás del contenido, con el velo encima.
- **Variante encaje:** cuando la foto no llena la pantalla (los fundadores miden 868px), en escritorio va nítida a su tamaño a la derecha (`min(54vw, 868px)`, máximo 76svh, radio 14px, sombra flotante) sobre una copia de sí misma desenfocada (`blur(36px) brightness(0.55) saturate(1.1)`), con un velo lateral que la funde hacia la leyenda. A 899px o menos va de borde a borde arriba, bajo la barra, a `min(38svh, 72vw)` de alto, sin radio ni relleno desenfocado, encuadrada al 30 % vertical; se funde hacia el vacío y la leyenda empieza debajo, sin pisarla.
- **Portada de página interna:** en celular la foto va clara arriba (`barra + 24px + 44svh`) y la leyenda empieza donde se funde con el vacío; en escritorio la foto llena la pantalla con un velo lateral (0.88 → 0.55 → 0 a 0/42/68 %) y un velo vertical suave (0.2 → 0 → 0.85).

### Línea de autor
El logo como avatar circular de 30px (con anillo) y el nombre de la sección o el lugar en Schibsted 600 a 0.84rem en `texto-2`. Va **siempre debajo** de la leyenda (orden 20 en la columna), como la firma de una publicación; nunca encima del titular.

### Carrusel de historias
Una pieza dominante con la siguiente asomando: columnas de `min(82vw, 880px)`, 10px de separación, sangra hasta los bordes y frena por pieza (`scroll-snap-type: x mandatory`). Cada historia mide `min(74svh, 680px)` de alto, foto a sangre con velo, título en display abajo y sus metadatos (rol, fecha, estado) debajo del título. Los videos locales muestran un botón de reproducción circular de 68px con borde blanco que pasa a rosa en hover.

### Filas de prueba
Cifras, informes, etapas y servicios son filas separadas por líneas de 1px, no tarjetas: la cifra o el año en amarillo a la izquierda, la frase a la derecha. Las etapas de un programa llevan un círculo rosa de 48px con el número en display. El formulario de contacto, las galerías desplegables de actividades («Ver fotos») y las notas de programa también son bloques abiertos, delimitados solo por una línea de 1px arriba o abajo.

### Libro de historia
Una página a la vez, con segmentos de 3px (hechos en blanco, actual en rosa) y el estado «Página X de 6» en Schibsted 600 a 0.86rem; sin números de página en display. Botones Anterior y Siguiente de contorno, 48px.

### Inputs / Fields
- **Style:** fondo `vacio`, borde 1px `linea-fuerte`, radio 10px, alto 50px (textarea 140px), relleno 12px 14px; rótulo 0.84rem 600 en `texto-2` arriba.
- **Focus:** contorno rosa de 2px y borde transparente.
- **Error:** borde `rosa-claro` y mensaje 0.82rem 600 en `rosa-claro`.

### Navigation
Marca a la izquierda (logo circular de 44px con anillo blanco y el nombre en display 1.35rem), enlaces en Schibsted 600 a 0.86rem con hover de píldora blanca al 10 %; el enlace activo lleva un subrayado interior rosa de 2px. Donar es una píldora rosa de 44px. La barra se esconde al bajar (260ms) y vuelve al subir, sobre un velo alto. Por debajo de 1080px el menú es un botón circular de 48px que abre una lista a pantalla completa sobre el vacío, con enlaces en display `clamp(2.4rem, 11vw, 3.6rem)` que pasan a `rosa-claro` en hover.

### Chat
Diálogo de primera clase que abre desde el carril: panel de `min(400px, 100vw - 32px)` por `min(560px, 100svh - 120px)`, fondo `tinta`, borde `linea`, radio 20px y sombra flotante. Burbujas de radio 16px con la esquina de origen a 4px: asistente en `grafito`, usuario en `rosa-boton`. Respuestas rápidas en píldoras de contorno.

### Franja psicosocial
En el feed de programas, una franja rosa vertical de 28px (20px en celular) recorre el borde izquierdo de todas las pantallas de programa con el rótulo vertical en blanco, porque el acompañamiento psicosocial cruza los demás programas.

### Temporada de Navidad
Capa opcional activada por `html[data-season="navidad"]` que agrega rojo (#b3203b), dorado (#d4a64a) y verde (#2f7a52) solo dentro de sus piezas (insignia, pantalla de campaña, guirnalda, nieve). No toca los tokens del mundo y se apaga sin dejar rastro.

## Do's and Don'ts

### Do:
- **Do** contar cada sección como una pantalla de al menos `100svh` con foto real a sangre, velo del vacío y la leyenda abajo a la izquierda.
- **Do** usar `rosa` para todo estado (activo, actual, seleccionado, primario) y `rosa-boton` cuando lleva texto blanco encima.
- **Do** reservar `sol` para cifras grandes en display.
- **Do** poner la línea de autor (avatar del logo + nombre de sección) debajo de la leyenda.
- **Do** dar a cada pantalla una sola cosa enorme: un nombre o una cifra en Big Shoulders Display en mayúsculas.
- **Do** dejar libre la columna del carril (`margen + carril`) a la derecha de todo contenido.
- **Do** separar filas con líneas de 1px en lugar de tarjetas.
- **Do** usar la variante encaje cuando una foto no tiene resolución para ir a sangre en escritorio.
- **Do** limitar el movimiento a la entrada única de la leyenda (18px, 620ms, `cubic-bezier(0.23, 1, 0.32, 1)`) y anularlo con `prefers-reduced-motion`.

### Don't:
- **Don't** usar la portada clásica de fundación: foto con titular centrado, fila de cifras o cuadrícula de tarjetas iguales.
- **Don't** meter el contenido en cajas o tarjetas con fondo y borde; el texto se apoya en la imagen y en el vacío.
- **Don't** poner etiquetas, rótulos o líneas de autor encima de un titular.
- **Don't** teñir las fotos (duotonos, filtros de color, capas rosas o amarillas); solo velos del vacío.
- **Don't** usar el amarillo en botones, fondos, íconos o texto corrido.
- **Don't** introducir un segundo color de estado ni otro acento fuera del rosa y el amarillo del logo (la paleta de Navidad vive solo en su capa de temporada).
- **Don't** mezclar familias de íconos: son SVG de trazo uniforme 1.75; el único relleno es el corazón blanco del disco Donar.
- **Don't** abrir galerías en modales; cada actividad despliega sus fotos en su sitio.
