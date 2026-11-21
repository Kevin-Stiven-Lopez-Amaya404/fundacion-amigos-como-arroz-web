// Funciones puras que usa eleventy.config.mjs (se prueban con node:test en test/).

export const MENSAJE_DONAR = "Hola, quiero hacer una donación a la Fundación Amigos Como Arroz.";

// Enlace a WhatsApp con el mensaje ya codificado.
export const whatsapp = (numero, texto) => `https://wa.me/${numero}` + (texto ? `?text=${encodeURIComponent(texto)}` : "");

// Prefijo relativo hasta la raíz según la URL de la página: "/index.html" → "", "/programas/semilla.html" → "../".
export const raiz = (url = "/") => "../".repeat(Math.max(0, String(url).split("/").length - 2));

// Hay página de donaciones si existe al menos un medio de pago o una pasarela.
export const hayDonacion = (site) => (site.donacion?.medios?.length ?? 0) > 0 || Boolean(site.donacion?.pasarela?.url);


// JSON-LD BreadcrumbList: Inicio → migas → página actual. migas: [{ nombre, url }] con url relativa a la raíz.
export const migasLd = (urlSitio, migas = [], nombre = "", canonical = "/") => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ nombre: "Inicio", url: "" }, ...(migas || []), { nombre, url: String(canonical).replace(/^\//, "") }].map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: m.nombre,
    item: `${urlSitio}/${m.url}`
  }))
});

// JSON-LD Place de una sede (por ciudad), con la fundación como dueña.
export const lugarLd = (site, ciudad) => {
  const s = (site.sedes || []).find((x) => x.ciudad === ciudad);
  if (!s) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${s.nombre} · ${site.name}`,
    address: { "@type": "PostalAddress", ...(s.direccion ? { streetAddress: s.direccion } : {}), addressLocality: s.ciudad, addressRegion: s.departamento, addressCountry: "CO" },
    ...(s.mapa ? { hasMap: s.mapa } : {}),
    ...(s.telefono ? { telephone: s.telefono } : {}),
    containedInPlace: { "@type": "AdministrativeArea", name: s.departamento }
  };
};

// JSON-LD de la fundación (NGO) para la portada, todo desde site.json. Lo vacío no se incluye.
export const ngoLd = (site) => {
  const lugar = (s) => ({
    "@type": "Place",
    name: s.nombre,
    address: {
      "@type": "PostalAddress",
      ...(s.direccion ? { streetAddress: s.direccion } : {}),
      addressLocality: s.ciudad,
      addressRegion: s.departamento,
      addressCountry: "CO"
    },
    ...(s.mapa ? { hasMap: s.mapa } : {})
  });
  const principal = (site.sedes || []).find((s) => s.direccion);
  const ld = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/assets/img/iconos/icon-512.png`,
    email: site.email,
    telephone: `+57 ${site.whatsappLabel}`,
    foundingDate: "2007-09",
    slogan: site.lema,
    areaServed: ["Huila", "Tolima"].map((name) => ({ "@type": "AdministrativeArea", name })),
    location: (site.sedes || []).map(lugar),
    sameAs: [site.instagram, site.facebook].filter(Boolean),
    contactPoint: { "@type": "ContactPoint", contactType: "atención al público", telephone: `+57 ${site.whatsappLabel}`, email: site.email, availableLanguage: "es" }
  };
  if (principal) ld.address = lugar(principal).address;
  if (site.legal?.razonSocial) ld.legalName = site.legal.razonSocial;
  if (site.legal?.nit) ld.taxID = site.legal.nit;
  return ld;
};

// Tamaño legible en español: 19517493 → «18,6 MB»; 462431 → «452 KB».
export const peso = (bytes) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

// Preguntas frecuentes de un programa; sin programa, todas.
export const faqDe = (faq = [], programa = "") => faq.filter((f) => (programa ? f.programa === programa : true));

// JSON-LD FAQPage, o null si no hay preguntas.
export const faqLd = (faq = []) =>
  faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.pregunta, acceptedAnswer: { "@type": "Answer", text: f.respuesta } }))
      }
    : null;

// Convocatorias abiertas a la fecha (AAAA-MM-DD), opcionalmente de un programa. Se ocultan solas al pasar el
// cierre: el sitio se compila en cada publicación (si hay convocatorias, conviene publicar cada día).
export const convocatoriasAbiertas = (lista = [], hoy = new Date().toISOString().slice(0, 10), programa = "") =>
  lista.filter((c) => (!c.abre || c.abre <= hoy) && (!c.cierra || hoy <= c.cierra) && (!programa || c.programa === programa));

// "2027-03-15" → «15 de marzo de 2027».
export const fechaLarga = (iso) => {
  const [a, m, d] = String(iso).split("-").map(Number);
  if (!a || !m || !d) return String(iso);
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  return `${d} de ${meses[m - 1]} de ${a}`;
};
