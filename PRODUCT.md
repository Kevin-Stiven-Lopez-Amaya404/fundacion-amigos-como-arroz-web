# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Todos los públicos por igual (confirmado): familias, niños y jóvenes que buscan un programa, una beca o acompañamiento; donantes y aliados (personas y empresas) que evalúan si apoyar; voluntarios que quieren sumarse. La portada reparte la atención y deriva rápido a cada uno. Visitan sobre todo desde celular (Neiva, Huila y Espinal, Tolima), muchas veces llegando desde WhatsApp o redes.

## Product Purpose

Sitio institucional de la Fundación Amigos Como Arroz: explica quiénes son, qué programas ofrecen y con qué resultados, y lleva a la acción (escribir por WhatsApp para inscribirse, donar, ser voluntario o aliarse). Éxito: que cada público entienda en segundos qué hace la fundación y encuentre su camino de contacto.

## Positioning

19 años de trabajo (desde septiembre de 2007), nacida del compromiso social de la Organización Roa Florhuila e inspirada en el legado de don Aníbal Roa Villamil y doña Clara Inés Solano de Roa. Su ruta propia de programas con nombres agrícolas encadenados: Semilla (niños y familias), Siembra (becas de educación superior), Cosecha (liderazgo juvenil que devuelve a la comunidad) y Acompañamiento Psicosocial como eje transversal. Lema: "Sembrando esperanza, cosechando futuro". Sedes en Neiva y Espinal.

## Operating Context

Sitio estático (Eleventy) publicado en Vercel. El contacto real ocurre por WhatsApp (318 707 3308), correo (amigoscomoarroz@gmail.com), Instagram y Facebook. El formulario arma un mensaje de WhatsApp; no hay backend salvo la función del chat (`api/chat.mjs`). Temporada navideña activable (campaña, cuenta regresiva, nieve). Informes de gestión 2024 y 2025 y formulario 5245 en PDF como prueba de transparencia.

## Capabilities and Constraints

- 7 páginas: portada, programas (vista general, Semilla, Siembra, Cosecha, Psicosocial) y Sede Espinal. Las rutas y URL no cambian.
- Funciones que deben seguir: menú, chat (respuestas fijas + Claude), formulario a WhatsApp, carruseles (actividades, testimonios, equipo), libro de historia, videos que cargan al pulsar, contadores, temporada de Navidad, analítica por `data-analytics-*`.
- Datos de contacto y caché en `src/_data/site.json`; nada de esos datos escrito a mano.
- Sin dependencias de framework en el navegador; JavaScript en módulos ES.
- Pendiente de datos reales: página de donación con montos y medios de pago.

## Brand Commitments

- **Se conserva todo el contenido** (confirmado por el usuario): todos los textos, todas las imágenes, el logo y toda la información de los programas, "esa información es muy valiosa". El rediseño cambia presentación y organización, no lo que se dice.
- Logo: `assets/img/brand/logo-fundacion.jpg` (sin redibujar).
- Sin decidir: si los colores del logo (rosa, naranja, amarillo) son obligatorios como paleta, y qué haría sentir equivocado el resultado (no respondido).

## Evidence on Hand

- Fotos reales en `assets/img/opt/` (actividades de Semilla: fútbol, danza, inglés, patinaje, robótica; psicosocial; talleres; equipo; hero con los fundadores).
- 4 videos propios en `assets/videos/` (misión, momentos de impacto, dos testimonios).
- Cifras publicadas: 4.200 participantes, 180 voluntarios y mentores, 65 aliados, 38 proyectos, 92 % de permanencia.
- Informes de gestión 2024 y 2025 y formulario 5245 en `informes/`.
- Equipo con nombre: Moira Quintero (directora), Andrés Cabrera, Caren González; coordinación de programas.
- No existen: testimonios escritos con nombre, montos de donación, medios de pago publicados. No se inventan.

## Product Principles

1. El contenido de la fundación es el protagonista: el diseño lo ordena, no lo reemplaza.
2. Cada público encuentra su camino en un paso (programa, donar, voluntariado, aliarse).
3. Prueba antes que petición: años, cifras, informes y fotos reales respaldan cada llamado.
4. Funciona bien en un celular modesto con datos móviles.

## Accessibility & Inclusion

WCAG 2.2 AA (contraste, teclado, foco visible, áreas táctiles de 24 px o más), respeto de movimiento y datos reducidos. Público con celulares de gama media y conexiones móviles.
