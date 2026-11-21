// Eleventy compila src/ en _site/. Los recursos se copian tal cual.
import { readFileSync, statSync } from "node:fs";

import { whatsapp as armarWhatsapp, raiz, hayDonacion, migasLd, ngoLd, lugarLd, peso, faqDe, faqLd, convocatoriasAbiertas, fechaLarga, programaLd, indexable, MENSAJE_DONAR } from "./lib/sitio.mjs";

// SITIO_DATOS: carpeta de datos alternativa (solo la usa npm run build:ejemplo; ver scripts/ejemplo.mjs).
const DATOS = process.env.SITIO_DATOS || "src/_data";
const site = JSON.parse(readFileSync(`${DATOS}/site.json`, "utf8"));
const whatsapp = (texto) => armarWhatsapp(site.whatsapp, texto);

export default function (eleventyConfig) {
  for (const path of [".nojekyll", "assets", "informes", "robots.txt", "site.webmanifest", "favicon.ico"]) {
    eleventyConfig.addPassthroughCopy(path);
  }
  // Los README de las carpetas son documentación, no páginas.
  eleventyConfig.ignores.add("src/**/README.md");

  // lastmod del sitemap: la fecha del último commit de cada archivo (las noticias usan su propia fecha).
  eleventyConfig.addGlobalData("date", "git Last Modified");

  // Mantener las URL actuales (programas/cosecha.html, no programas/cosecha/).
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // {{ 4200 | numero }} → «4.200» (formato de Colombia).
  eleventyConfig.addFilter("numero", (n) => Number(n).toLocaleString("es-CO"));

  // {{ "Hola, quiero…" | whatsapp }} → enlace a WhatsApp con el mensaje ya codificado.
  eleventyConfig.addFilter("whatsapp", whatsapp);

  // {{ page.url | raiz }} → prefijo relativo hasta la raíz del sitio ("" en la raíz, "../" en programas/…).
  eleventyConfig.addFilter("raiz", raiz);

  // {{ migas | migasLd(nombre, canonical) }} → objeto BreadcrumbList para JSON-LD.
  eleventyConfig.addFilter("migasLd", (migas, nombre, canonical) => migasLd(site.url, migas, nombre, canonical));

  // {{ site | ngoLd }} → JSON-LD de la fundación para la portada.
  eleventyConfig.addFilter("ngoLd", ngoLd);
  eleventyConfig.addFilter("lugarLd", lugarLd);
  eleventyConfig.addFilter("faqDe", faqDe);
  eleventyConfig.addFilter("esIndexable", indexable);
  eleventyConfig.addFilter("programaLd", (site, pagina, descripcion) => programaLd(site, pagina, descripcion));
  // Páginas del sitemap: las que se publican y se indexan (sin la 404 ni las que llevan noindex).
  eleventyConfig.addFilter("paraSitemap", (paginas) => paginas.filter((p) => p.url && p.outputPath?.endsWith(".html") && indexable(p.data)));
  eleventyConfig.addFilter("faqLd", faqLd);
  eleventyConfig.addFilter("fechaLarga", fechaLarga);
  eleventyConfig.addFilter("convocatoriasAbiertas", (lista, hoy, programa) => convocatoriasAbiertas(lista, hoy, programa));

  // {{ "informes/archivo.pdf" | peso }} → «19,5 MB» (tamaño real del archivo al compilar; vacío si no existe).
  eleventyConfig.addFilter("peso", (ruta) => {
    try {
      return peso(statSync(ruta).size);
    } catch {
      return "";
    }
  });

  // {{ datos | json }} → JSON seguro dentro de <script> (un "</script>" en un dato no puede cerrar la etiqueta).
  eleventyConfig.addFilter("json", (valor) => JSON.stringify(valor).replace(/</g, "\\u003c"));

  // Donar: si hay al menos un medio de pago o una pasarela en site.json, los botones llevan a donar.html;
  // si no, abren WhatsApp como siempre. La condición vive solo aquí.
  eleventyConfig.addGlobalData("donar", { pagina: hayDonacion(site) });
  // "production" en la publicación de Vercel; "preview" en las vistas previas; "local" en tu computador.
  eleventyConfig.addGlobalData("entorno", process.env.VERCEL_ENV || "local");
  // <a {% donarAtributos raiz %} …>: href (y target/rel cuando es WhatsApp).
  eleventyConfig.addShortcode("donarAtributos", (prefijo = "", mensaje = MENSAJE_DONAR) =>
    hayDonacion(site)
      ? `href="${prefijo}donar.html"`
      : `href="${whatsapp(mensaje)}" target="_blank" rel="noopener noreferrer"`);

  return {
    dir: { input: "src", output: "_site", data: process.env.SITIO_DATOS ? `../${process.env.SITIO_DATOS}` : "_data" },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
  };
}
