// Chroma-key the black background out of Logo.jpg → transparent PNG.
// Pixels below the "near-black" threshold become fully transparent.
// A short falloff makes edges soft so the green X doesn't get a black halo.

const sharp = require("sharp");
const path = require("path");

const INPUT = path.join(__dirname, "..", "public", "brand", "logo-black.jpg");
const OUTPUT = path.join(__dirname, "..", "public", "brand", "logo-clean.png");

(async () => {
  const { data, info } = await sharp(INPUT)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const HARD = 40;   // ≤ HARD luminance → fully transparent
  const SOFT = 110;  // between HARD and SOFT → partial alpha, edge is soft

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Perceived luminance
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (lum <= HARD) {
      data[i + 3] = 0;
    } else if (lum < SOFT) {
      // linear ramp from 0 (at HARD) to 255 (at SOFT)
      const a = Math.round(((lum - HARD) / (SOFT - HARD)) * 255);
      data[i + 3] = a;
      // premultiply to prevent dark fringing on light backgrounds
      const k = a / 255;
      data[i] = Math.round(r * k + (1 - k) * r);
      data[i + 1] = Math.round(g * k + (1 - k) * g);
      data[i + 2] = Math.round(b * k + (1 - k) * b);
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(OUTPUT);
  const stat = require("fs").statSync(OUTPUT);
  console.log(`✓ Wrote ${OUTPUT} (${width}x${height}, ${(stat.size / 1024).toFixed(1)} KB)`);
})();
