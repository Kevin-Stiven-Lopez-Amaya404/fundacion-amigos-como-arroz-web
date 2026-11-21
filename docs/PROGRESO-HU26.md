# Progreso HU26 · Sitio completo y profesional

Lista de trabajo del encargo HU26. Si la sesión se corta, se sigue desde la primera casilla sin marcar.
`[x]` hecho · `[ ]` pendiente · `[!]` bloqueado (con el motivo al lado).

Rama de trabajo: `hu27` (la rama `hu26` ya existía y estaba fusionada; ver `DECISIONES-HU26.md`).

## Fase 0 · Línea base
- [x] 0.1 `npm install` y `npm run build`
- [x] 0.2 Capturas 390 y 1440, Lighthouse móvil (portada, Semilla, Sede Espinal) y axe por página en `docs/auditoria-hu26/antes/` (capturas fuera de Git, resumen en Markdown)

## Fase 1 · Errores visibles
- [x] 1.1 Barra flotante sin desbordes de 320 a 1920 px (botón Nieve)
- [x] 1.2 Pastilla de Navidad del inicio libre en celular
- [x] 1.3 Pantalla de entrada que no bloquea (1,2 s, primer gesto; nunca con movimiento reducido, Save-Data, ancla ni bots)
- [x] 1.4 GSAP: texto de programas siempre visible y ESPINAL sin cortes (1024, 1280, 1440, 1920 y 1280×650)
- [x] 1.5 Informes: textos del 2025 y del formulario 5245
- [x] 1.6 Equipo desde `site.json`, cargo sin nombre y rol de Caren pendiente
- [x] 1.7 Momentos con proporción fija y encuadre
- [x] 1.8 Fechas automáticas (años, pie, «próximamente», Navidad hasta el 6 de enero)
- [x] 1.9 Respuestas fijas del chat (remitir al equipo, nuevas respuestas desde `site.json`)
- [x] 1.10 Decoración de Navidad: sin tapar, solo inicio y campaña, Save-Data, contraste
- [x] 1.11 Nombres de archivo (`drirectora`, `testimoni1`)
- [x] 1.12 Textos alternativos

## Fase 2 · Navegación y estructura
- [ ] 2.1 Navegación completa en páginas internas con menú móvil (reutiliza `menu.js`)
- [ ] 2.2 Migas de pan visibles y `BreadcrumbList`
- [ ] 2.3 «Otros programas» y bloque de acción en cada programa
- [ ] 2.4 Pie común (include)
- [ ] 2.5 `<head>` común (include)
- [ ] 2.6 Rutas relativas en raíz y subcarpetas
- [ ] 2.7 Enlaces internos canónicos
- [ ] 2.8 Compartir con Web Share API o copia anunciada, también en internas

## Fase 3 · Legal y datos personales
- [ ] 3.1 `privacidad.html` (aviso de revisión legal, `noindex` hasta `politicaRevisada`)
- [ ] 3.2 `terminos.html`
- [ ] 3.3 Formulario: autorización, aviso de menores, resumen de errores
- [ ] 3.4 Línea fija de privacidad en el chat
- [ ] 3.5 Aviso de cookies (GA solo si acepta; preferencias en el pie; sin aviso si no hay ID)
- [ ] 3.6 ID de GA4 en `site.json` vía `#site-data`
- [ ] 3.7 Política y términos en el pie y en el sitemap

## Fase 4 · Donaciones, voluntariado y alianzas
- [ ] 4.1 `donar.html`
- [ ] 4.2 Botones «Donar» con destino global
- [ ] 4.3 `voluntariado.html`
- [ ] 4.4 `aliados.html` y franja de logos
- [ ] 4.5 Eventos de analítica nuevos

## Fase 5 · Confianza e información institucional
- [ ] 5.1 Bloque `legal`
- [ ] 5.2 Pie con todo el contenido institucional
- [ ] 5.3 Sedes en `site.json`, Contacto y Sede Espinal con «Cómo llegar»
- [ ] 5.4 `transparencia.html` desde `documentos`
- [ ] 5.5 Cifras de impacto en `site.json` con corte y fuente
- [ ] 5.6 Quiénes somos (misión, visión, valores, junta)
- [ ] 5.7 Preguntas frecuentes con `FAQPage`
- [ ] 5.8 Convocatorias
- [ ] 5.9 Testimonios en video (subtítulos, transcripción, datos)
- [ ] 5.10 Noticias (estructura lista)
- [ ] 5.11 Correo desde `site.email`
- [ ] 5.12 Página 404

## Fase 6 · SEO
- [ ] 6.1 Open Graph y Twitter en todas las páginas, imágenes 1200×630
- [ ] 6.2 Títulos y descripciones únicos
- [ ] 6.3 Íconos y `site.webmanifest`
- [ ] 6.4 JSON-LD (NGO, programas, Breadcrumb, FAQ, DonateAction, Place) y su validación
- [ ] 6.5 Sitemap automático
- [ ] 6.6 `robots.txt` con `Disallow: /api/`
- [ ] 6.7 Verificación de Search Console
- [ ] 6.8 Redirecciones en `vercel.json`

## Fase 7 · Rendimiento
- [ ] 7.1 Objetivos Lighthouse
- [ ] 7.2 Publicar solo lo que se usa y verificar referencias
- [ ] 7.3 Minificación y huellas automáticas
- [ ] 7.4 `npm run imagenes`
- [ ] 7.5 GSAP solo con lo usado y diferido
- [ ] 7.6 CSS crítico (solo si mejora el LCP)
- [ ] 7.7 `content-visibility`
- [ ] 7.8 Fuentes
- [ ] 7.9 PDF comprimidos y peso visible
- [ ] 7.10 Videos comprimidos y pósteres
- [ ] 7.11 Temporada diferida y liviana

## Fase 8 · Accesibilidad
- [ ] 8.1 Carruseles (teclado, botones, posición anunciada)
- [ ] 8.2 Libro de historia
- [ ] 8.3 Menú móvil y chat como diálogos
- [ ] 8.4 «Saltar al contenido» cierra la entrada
- [ ] 8.5 Contraste
- [ ] 8.6 Zoom 200 % y 400 %
- [ ] 8.7 Encabezados, landmarks y nombres de enlaces
- [ ] 8.8 Aviso de pestaña nueva
- [ ] 8.9 `lang="es-CO"`

## Fase 9 · Seguridad y chat
- [ ] 9.1 Encabezados de seguridad y CSP sin violaciones
- [ ] 9.2 Caché en `vercel.json`
- [ ] 9.3 `api/chat.mjs` (Haiku, 400 tokens, `CHAT_ACTIVO`, tamaño del cuerpo, registros sin texto)
- [ ] 9.4 `api/_contexto.mjs` desde `site.json`
- [ ] 9.5 `security.txt`
- [ ] 9.6 `rel="noopener noreferrer"` en enlaces externos

## Fase 10 · Pruebas e integración continua
- [ ] 10.1 `npm test`, `test:e2e`, `check`, `lighthouse`, `lint`
- [ ] 10.2 GitHub Actions
- [ ] 10.3 Node fijo (`engines`, `.nvmrc`)
- [ ] 10.4 Errores de las herramientas corregidos

## Fase 11 · Documentación
- [ ] 11.1 README y docs al día
- [ ] 11.2 Auditorías anteriores marcadas como históricas y `AUDITORIA-HU26.md`
- [ ] 11.3 `GUIA-CONTENIDO.md`
- [ ] 11.4 `DATOS-PENDIENTES.md`

## Verificación final
- [ ] V.1 build, test, check, lint y e2e en verde
- [ ] V.2 Capturas de todas las páginas en 7 anchos, con y sin Navidad, revisadas
- [ ] V.3 Lighthouse móvil y escritorio
- [ ] V.4 axe sin errores serios ni críticos
- [ ] V.5 Sin JS, movimiento reducido, zoom, teclado, datos vacíos y de ejemplo
- [ ] V.6 Comparación automática de textos antes y después
- [ ] V.7 Push y PR hacia `dev`
