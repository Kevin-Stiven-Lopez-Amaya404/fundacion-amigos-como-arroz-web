---
name: Fundación Amigos Como Arroz
description: La fundación presentada como una presentación de marca, capítulo por capítulo, con sus colores, su logo y sus fotos reales.
colors:
  vacio: "#060608"
  tinta: "#111116"
  grafito: "#1c1c23"
  niebla: "#2c2c36"
  linea: "rgb(255 255 255 / 0.12)"
  linea-fuerte: "rgb(255 255 255 / 0.3)"
  texto: "#f7f5f2"
  texto-2: "#c9c7d0"
  texto-3: "#9d9ba8"
  blanco: "#ffffff"
  rosa: "#e0245e"
  rosa-boton: "#c81d52"
  rosa-claro: "#ff7aa4"
  sol: "#f6c21c"
  crema: "#f2eee7"
  crema-texto: "#141418"
  crema-texto-2: "#4a4952"
typography:
  display:
    fontFamily: "Unbounded, Arial Black, sans-serif"
    fontSize: "clamp(2.2rem, 6.6vw, 6.4rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  display-2:
    fontFamily: "Unbounded, Arial Black, sans-serif"
    fontSize: "clamp(1.5rem, 5.4vw, 4rem)"
    fontWeight: 700
    lineHeight: 1
  headline:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 4.2vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.4vw, 1.9rem)"
    fontWeight: 600
    lineHeight: 1.12
  cifra:
    fontFamily: "Unbounded, Arial Black, sans-serif"
    fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 0.95
    fontFeature: "tnum"
  lead:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.04rem, 1.4vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Mono, ui-monospace, Consolas, monospace"
    fontSize: "0.76rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  foco: "4px"
  radio-s: "8px"
  pildora: "14px"
  radio: "16px"
  circulo: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "28px"
  margen: "clamp(18px, 5vw, 80px)"
  marco: "clamp(8px, 1.1vw, 16px)"
  pildora: "60px"
  contenedor: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.rosa-boton}"
    textColor: "{colors.blanco}"
    typography: "{typography.label}"
    rounded: "{rounded.radio-s}"
    padding: "0 22px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.rosa}"
  button-whatsapp:
    backgroundColor: "{colors.texto}"
    textColor: "{colors.vacio}"
    typography: "{typography.label}"
    rounded: "{rounded.radio-s}"
    padding: "0 22px"
    height: "50px"
  button-contorno:
    backgroundColor: "rgb(6 6 8 / 0.4)"
    textColor: "{colors.texto}"
    typography: "{typography.label}"
    rounded: "{rounded.radio-s}"
    padding: "0 22px"
    height: "50px"
  pildora:
    backgroundColor: "rgb(17 17 22 / 0.86)"
    textColor: "{colors.texto-2}"
    rounded: "{rounded.pildora}"
    padding: "7px"
    height: "60px"
  pildora-icono:
    backgroundColor: "transparent"
    textColor: "{colors.texto}"
    rounded: "{rounded.circulo}"
    size: "44px"
  entrada-boton:
    backgroundColor: "{colors.rosa-boton}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.circulo}"
    size: "clamp(104px, 11vw, 140px)"
  input:
    backgroundColor: "{colors.vacio}"
    textColor: "{colors.texto}"
    rounded: "{rounded.radio-s}"
    padding: "12px 14px"
    height: "50px"
  historia:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.texto}"
    rounded: "{rounded.radio}"
    padding: "clamp(20px, 2.6vw, 30px)"
    height: "min(68svh, 600px)"
    width: "min(78vw, 440px)"
---

# Design System: Fundación Amigos Como Arroz

## Overview

El sitio se presenta como una **presentación de marca**. Toma el ritmo de las webs de lanzamiento de las marcas de autos:
- pantalla de entrada con un botón central;
- foto enmarcada;
- palabras que cambian con el scroll;
- capítulos numerados;
- fotos a sangre con una palabra gigante;
- una sección clara;
- un cierre enorme.

La identidad sigue siendo la de la fundación: su logo, el rosa y el amarillo del logo, sus fotos reales y todos sus textos. El usuario eligió la referencia de estilo. De esa marca no se usa nada: ni el nombre, ni los logos, ni las imágenes.

Modo: Persuade. Público: todos por igual (familias y jóvenes, donantes y aliados, voluntarios). Se conserva todo el contenido.

## Colors

### Primary
**Rosa del logo**: `--rosa` #e0245e; en botones, `--rosa-boton` #c81d52; sobre fondo oscuro, `--rosa-claro` #ff7aa4. Se usa en:
- las acciones (Donar, Quiero apoyar, Enviar);
- el cuadrito de cada capítulo;
- el estado activo;
- el punto del cursor.

### Secondary
**Amarillo del logo** (`--sol` #f6c21c). Se usa en:
- las cifras grandes (19 años, impacto, años de los informes);
- el brillo de fondo, junto al rosa;
- el anillo de foco de teclado.

### Neutral
- `--vacio` #060608 (fondo), `--tinta` #111116 (tarjetas, panel del menú, chat, formulario), `--grafito`, `--niebla`.
- Texto `--texto` #f7f5f2, `--texto-2` #c9c7d0, `--texto-3` #9d9ba8.
- Sección clara (Momentos): `--crema` #f2eee7 con `--crema-texto` y `--crema-texto-2`.

### Brillo y velos
- `--brillo`: dos radiales suaves (rosa y amarillo) detrás de la secuencia de palabras, la intro de programas y el contacto.
- `--velo`: degradado inferior sobre fotos a sangre. Sede Espinal oscurece la franja del título para que el texto cumpla AA.

## Typography

- **Unbounded** (ancha, en mayúsculas), solo para los momentos grandes:
  - el nombre en la entrada y en el inicio;
  - la secuencia de palabras y ESPINAL;
  - los nombres de los programas;
  - los títulos «Acompañamiento para cada etapa», «Resultados que transforman» y «Sé parte de la misión»;
  - las cifras y los títulos de las páginas internas.
- **Schibsted Grotesk**: `h2` y `h3` en tono de conversación (minúscula, interlineado apretado) y todo el texto.
- **Space Mono** en mayúsculas espaciadas: etiquetas, capítulos, botones, enlaces de la barra, fechas y estados.

### Named Rules
- Una sola palabra o frase ancha por pantalla.
- Las frases largas nunca van en Unbounded, porque es muy ancha.

## Layout

- **Entrada** (`#entrada`): «AMIGOS (Entrar) COMO ARROZ» sobre un brillo que gira, con el logo arriba y el lema abajo.
  - Solo aparece con JS, una vez por sesión, y nunca si se llega con un enlace a una sección.
  - Se cierra con el botón, con la rueda, deslizando o con el teclado.
- **Inicio**: foto enmarcada (`--marco`) con esquinas redondeadas.
  - Arriba a la izquierda, el sello «Amigos Como Arroz / Fundación · Neiva y Espinal».
  - Abajo a la izquierda, el nombre, el texto y los botones; a la derecha, «Sigue» en vertical.
  - La foto de los fundadores mide 868 px: en escritorio va a la derecha sobre su copia desenfocada; en celular, arriba a todo el ancho.
- **Secuencia de palabras** (`.ciclo`): la pantalla queda fija mientras el scroll cambia Educación, Liderazgo, Bienestar y Comunidad. Repite la frase del inicio, así que es decorativa.
- **Capítulos**: cada sección abre con «■ 01 Nombre» en monoespaciada (contador CSS).
- **Composición por sección**:
  - Fundación y programas: texto a un lado y foto enmarcada al otro.
  - Historia: tarjeta con el visor y la foto.
  - Sede Espinal: foto a sangre con ESPINAL gigante.
  - Momentos: sección clara, con cuatro columnas en escritorio.
- **Barra flotante**: abajo al centro (`.site-header` en la portada, `.program-detail-header` en las internas).

## Elevation & Depth

La única sombra, `--sombra`, se usa en la píldora, en el panel del menú y en el chat. Todo lo demás es plano: líneas finas (`--linea`) separan las filas.

## Shapes

Radios de 8 px (botones, campos), 14 px (píldora) y 16 px (fotos, tarjetas). Círculos para los íconos de la barra y el botón de entrada.

## Components

### Barra flotante
- **Portada**: logo, enlaces de sección (Space Mono), Compartir, Donar (rosa), WhatsApp y el asistente.
- **Hasta 1079 px**: los enlaces se abren en un panel encima de la píldora; Donar, WhatsApp y el asistente siguen a la vista.
- **Páginas internas**: logo, volver, Donar, WhatsApp y Programas.

### Línea de progreso
`#historias`: tramos de 2 px arriba, uno por sección, que se llenan de rosa a amarillo con el scroll.

### Punto del cursor
Punto rosa que sigue al mouse y crece sobre enlaces y botones. Solo aparece con un mouse y si la persona no pidió menos movimiento.

### Carruseles
Tarjetas de 440 px de ancho máximo con esquinas redondeadas. La foto crece un poco al pasar el cursor.

### Inputs
Fondo `--vacio`, borde `--linea-fuerte` y contorno rosa al enfocar. Las etiquetas van en Space Mono.

### Movimiento
Mismos tiempos y curvas que la referencia: `--ease-expo` (0.16, 1, 0.3, 1) para lo que entra y `--ease-vaiven` (0.65, 0, 0.35, 1) para lo que se mueve en pantalla; duraciones de 0.5 s (revelar), 0.8 s (aparecer) y 1.2 s (inicio).
- Inicio: al entrar, la foto crece de 0.6 a 1 y el nombre sube línea a línea; al bajar, se aleja y se apaga.
- Secuencia: la frase se escribe con cursor y las palabras cambian con desenfoque; dos brillos se desplazan detrás.
- Títulos de sección: se pintan de izquierda a derecha una vez.
- Programas y Sede Espinal: texto y palabra gigante desde un desenfoque ligado al scroll.
- Impacto: filas escalonadas (0.18 s) y líneas que se dibujan.
- Con movimiento reducido no corre nada de esto; en celulares, sin desenfoques.

### Temporada de Navidad
La guirnalda va sobre la píldora y el botón de nieve es un ícono más de la barra.

## Do's and Don'ts

### Do:
- Conservar todo el texto, las imágenes, el logo y la información de los programas.
- Usar el rosa para acciones y el amarillo para cifras.
- Medir el contraste de cada texto sobre foto.

### Don't:
- No copiar nombres, logos ni imágenes de la marca de referencia.
- No poner frases largas en Unbounded.
- No bloquear al visitante: la entrada se salta con un enlace a una sección y no se repite en la sesión.
