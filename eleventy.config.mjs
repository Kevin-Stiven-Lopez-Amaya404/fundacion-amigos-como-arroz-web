// Eleventy compila src/ en _site/. Los recursos se copian tal cual.
export default function (eleventyConfig) {
  for (const path of [".nojekyll", "assets", "informes", "robots.txt", "sitemap.xml", "site.webmanifest"]) {
    eleventyConfig.addPassthroughCopy(path);
  }
  // Mantener las URL actuales (programas/cosecha.html, no programas/cosecha/).
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  return {
    dir: { input: "src", output: "_site" },
    templateFormats: ["html", "njk"],
    htmlTemplateEngine: "njk",
  };
}
