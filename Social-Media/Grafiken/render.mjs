/**
 * PayPoint – HTML→PNG Renderer
 * Rendert alle .html-Vorlagen aus ./Vorlagen-HTML als PNG nach ./PNG.
 *
 * Einmalig vorbereiten:
 *   npm install puppeteer        (oder: npx -y puppeteer browsers install chrome)
 * Dann rendern:
 *   node render.mjs
 *
 * Größe wird automatisch aus der .frame-Klasse erkannt:
 *   .post  -> 1080 x 1080   (Instagram/Facebook Feed)
 *   .story -> 1080 x 1920   (Instagram/Facebook/TikTok Story)
 */
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "Vorlagen-HTML");
const OUT = join(__dirname, "PNG");

const SIZES = { post: { w: 1080, h: 1080 }, story: { w: 1080, h: 1920 } };

const files = (await readdir(SRC)).filter((f) => f.endsWith(".html"));
if (!files.length) { console.error("Keine .html-Dateien in", SRC); process.exit(1); }

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

for (const file of files) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });
  await page.goto("file://" + join(SRC, file), { waitUntil: "networkidle0" });

  const kind = await page.evaluate(() => {
    const f = document.querySelector(".frame");
    return f?.classList.contains("story") ? "story" : "post";
  });
  const { w, h } = SIZES[kind];
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });

  const out = join(OUT, file.replace(/\.html$/, ".png"));
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: w, height: h } });
  console.log(`✓ ${file}  ->  PNG/${file.replace(/\.html$/, ".png")}  (${w}x${h} @2x)`);
  await page.close();
}

await browser.close();
console.log("\nFertig. PNGs liegen in ./PNG");
