---
version: 1
slug: "src-index-html"
primary_target: "src/index.html"
related_targets: ["src/programas/index.html","src/programas/semilla.html","src/programas/siembra.html","src/programas/cosecha.html","src/programas/psicosocial.html","src/sede-espinal/index.html"]
---

## Scope

Sitio completo de la Fundación Amigos Como Arroz (portada, programas, 4 programas, Sede Espinal). Modo: Persuade. Público: todos por igual (familias y jóvenes, donantes y aliados, voluntarios). Se conserva todo el texto, todas las imágenes, el logo y la información de los programas.

## Direction contract

THESIS: La fundación contada como un feed vertical de historias reales: cada pantalla es una persona, un programa o un momento a sangre, con su leyenda abajo y la siguiente a un deslizamiento. Rechaza la portada de fundación (foto con titular centrado, fila de cifras, cuadrícula de tarjetas iguales).

OWN-WORLD: Fondo vacío casi negro (#0b0b0f) y grafitos; fotos reales a sangre con velo inferior; texto blanco; el rosa del logo como único color de estado (activo, campo en edición, acción primaria); amarillo del logo solo en cifras grandes y en el anillo de foco de teclado, que sobre fotos necesita más contraste que el rosa. Display en grotesca condensada alta en mayúsculas (Big Shoulders Display); cuerpo Schibsted Grotesk, ambas servidas desde el sitio. Interfaz de íconos SVG de trazo uniforme en una columna a la derecha. Indicador de historias segmentado arriba. Nada de cajas: el contenido se apoya en la imagen y el vacío.

STORY: El visitante ve en segundos quién es la fundación (fundadores y niños reales), baja pantalla a pantalla por programas, impacto, momentos, equipo e informes, y en cualquier pantalla tiene a un toque Donar, WhatsApp y el chat. Cada público reconoce su pantalla: familias en programas, donantes en impacto e informes, voluntarios en equipo y contacto.

FIRST VIEWPORT: Foto de los fundadores con niños a sangre ocupando toda la pantalla; abajo a la izquierda el logo como avatar, «Fundación · Neiva y Espinal», el nombre AMIGOS COMO ARROZ en display condensado enorme (2 líneas), el lema y los botones Quiero apoyar (rosa) y Escribir por WhatsApp; columna de acciones a la derecha (Donar, WhatsApp, Programas, Compartir); indicador segmentado de historias arriba; la siguiente pantalla asoma con su título. Excepción documentada: la única foto de los fundadores mide 868 × 606 px; en escritorio (≥ 900 px) va encajada a su tamaño a la derecha sobre su propia copia desenfocada (el recurso de los feeds para medios que no llenan la pantalla), porque a sangre en 1440 px se vería blanda. En celular va a sangre. Reemplazarla por un original de mayor resolución la devuelve a sangre en escritorio.

FORM: Una historia por pantalla (feed vertical), candidato 1 de la mano atrevida, asignado por el sorteo. seed:3ad841bd70385560. Raises: Psicosocial como franja transversal que cruza los programas (franjas de fiesta); el rosa como único color de estado (un solo rosa); jerarquía solo por escala, una cifra o nombre enorme por pantalla (muestrario); el chat como diálogo de primera clase (terminal).

SIGNATURE INTERACTION: El indicador segmentado de historias se llena con el scroll y cada segmento lleva a su pantalla; los carruseles muestran una pieza dominante con la siguiente asomando, y en las páginas de programa cada actividad despliega sus fotos en su sitio («Ver fotos»), sin modal; todas las leyendas de la portada se muestran completas. Motion grammar: entrada única de la leyenda desde abajo al llegar a cada pantalla; el resto quieto; sin movimiento con prefers-reduced-motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
