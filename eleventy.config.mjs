// Eleventy compila src/ en _site/. Los recursos se copian tal cual.
import { readFileSync } from "node:fs";

const site = JSON.parse(readFileSync("src/_data/site.json", "utf8"));

export default function (eleventyConfig) {
  for (const path of [".nojekyll", "assets", "informes", "robots.txt", "sitemap.xml", "site.webmanifest"]) {
    eleventyConfig.addPassthroughCopy(path);
  }
  // Mantener las URL actuales (programas/cosecha.html, no programas/cosecha/).
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // {{ "Hola, quiero…" | whatsapp }} → enlace a WhatsApp con el mensaje ya codificado.
  eleventyConfig.addFilter("whatsapp", (text) =>
    `https://wa.me/${site.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : ""));

  return {
    dir: { input: "src", output: "_site" },
    templateFormats: ["html", "njk"],
    htmlTemplateEngine: "njk",
  };
}
