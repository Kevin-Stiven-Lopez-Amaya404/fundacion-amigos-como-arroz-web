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
