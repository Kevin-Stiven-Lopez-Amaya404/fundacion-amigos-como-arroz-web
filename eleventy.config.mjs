// Eleventy compila src/ en _site/. Los recursos se copian tal cual.
import { readFileSync } from "node:fs";

import { whatsapp as armarWhatsapp, raiz, hayDonacion, migasLd, MENSAJE_DONAR } from "./lib/sitio.mjs";

// SITIO_DATOS: carpeta de datos alternativa (solo la usa npm run build:ejemplo; ver scripts/ejemplo.mjs).
const DATOS = process.env.SITIO_DATOS || "src/_data";
const site = JSON.parse(readFileSync(`${DATOS}/site.json`, "utf8"));
const whatsapp = (texto) => armarWhatsapp(site.whatsapp, texto);

export default function (eleventyConfig) {
  for (const path of [".nojekyll", "assets", "informes", "robots.txt", "sitemap.xml", "site.webmanifest", "favicon.ico"]) {
    eleventyConfig.addPassthroughCopy(path);
  }
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
    templateFormats: ["html", "njk"],
    htmlTemplateEngine: "njk",
  };
}
