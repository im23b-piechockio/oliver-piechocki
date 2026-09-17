// Build-time asset pipeline.
// Scans the drop-folders (content/certificates, content/photos), copies files
// into /public, generates web-optimized previews where possible, and writes a
// manifest the site reads. Just drop PDFs / images into the folders and rebuild.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const CERT_SRC = path.join(root, "content", "certificates");
const PHOTO_SRC = path.join(root, "content", "photos");
const PROJECT_SRC = path.join(root, "content", "projects");
const PUB_CERT = path.join(root, "public", "certificates");
const PUB_PHOTO = path.join(root, "public", "photos");
const PUB_PROJECT = path.join(root, "public", "projects");
const MANIFEST = path.join(root, "public", "manifest.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function listFiles(dir) {
  try {
    return (await fs.readdir(dir)).filter((f) => !f.startsWith("."));
  } catch {
    return [];
  }
}

// Optional sharp, used for responsive image variants. Never fatal.
let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  sharp = null;
}

function prettify(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

async function processCertificates() {
  await ensureDir(PUB_CERT);
  const files = await listFiles(CERT_SRC);
  const out = [];
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext !== ".pdf" && !IMAGE_EXT.has(ext)) continue;
    await fs.copyFile(path.join(CERT_SRC, file), path.join(PUB_CERT, file));

    let preview = null;
    if (IMAGE_EXT.has(ext)) {
      preview = `/certificates/${file}`;
    } else {
      // Committed page-1 renders from `npm run previews` (content/certificates/previews).
      const name = file.replace(/\.pdf$/i, ".jpg");
      try {
        await ensureDir(path.join(PUB_CERT, "previews"));
        await fs.copyFile(path.join(CERT_SRC, "previews", name), path.join(PUB_CERT, "previews", name));
        preview = `/certificates/previews/${name}`;
      } catch {
        preview = null; // no preview yet: the UI falls back to a styled card
      }
    }

    out.push({
      name: file,
      title: prettify(file),
      file: `/certificates/${file}`,
      preview,
      type: ext === ".pdf" ? "pdf" : "image",
    });
  }
  return out;
}

// Responsive variants: every source image becomes AVIF, WebP and JPEG in a few
// widths. The site picks them via <picture>/srcset (components/ResponsiveImage),
// so phones download small files and only the portrait loads right away.
const FORMATS = [
  ["avif", (img) => img.avif({ quality: 55 })],
  ["webp", (img) => img.webp({ quality: 75 })],
  ["jpg", (img) => img.jpeg({ quality: 80, mozjpeg: true })],
];

async function processImageSet(srcDir, pubDir, urlBase, widths) {
  await ensureDir(pubDir);
  const files = await listFiles(srcDir);
  const images = {};
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    const src = path.join(srcDir, file);
    const key = `${urlBase}/${file}`;

    if (!sharp) {
      await fs.copyFile(src, path.join(pubDir, file));
      images[key] = { src: key };
      continue;
    }

    const meta = await sharp(src).metadata();
    const largest = Math.min(meta.width, widths[widths.length - 1]);
    const steps = [...new Set([...widths.filter((w) => w < largest), largest])];
    const base = file.replace(/\.[^.]+$/, "");
    const entry = { width: steps[steps.length - 1], height: 0 };

    for (const [fmt, encode] of FORMATS) {
      const srcset = [];
      for (const w of steps) {
        const name = `${base}-${w}.${fmt}`;
        const info = await encode(sharp(src).resize(w)).toFile(path.join(pubDir, name));
        if (w === entry.width) entry.height = info.height;
        srcset.push(`${urlBase}/${name} ${w}w`);
      }
      entry[fmt] = srcset.join(", ");
    }
    entry.src = `${urlBase}/${base}-${entry.width}.jpg`;

    // Keep the original filename available too (used by the link preview image).
    await sharp(src).resize(entry.width).jpeg({ quality: 82 }).toFile(path.join(pubDir, file));
    images[key] = entry;
  }
  return images;
}

async function main() {
  await ensureDir(path.join(root, "public"));
  await ensureDir(CERT_SRC);
  await ensureDir(PHOTO_SRC);
  await ensureDir(PROJECT_SRC);

  const [certificates, photoImages, projectImages] = await Promise.all([
    processCertificates(),
    processImageSet(PHOTO_SRC, PUB_PHOTO, "/photos", [400, 800]),
    processImageSet(PROJECT_SRC, PUB_PROJECT, "/projects", [480, 960, 1400]),
  ]);
  const photos = Object.keys(photoImages).map((file) => ({ file, title: prettify(path.basename(file)) }));

  const manifest = {
    generatedAt: new Date().toISOString(),
    certificates,
    photos,
    images: { ...photoImages, ...projectImages },
  };
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(
    `[assets] ${certificates.length} certificate(s), ${photos.length} photo(s), ${Object.keys(projectImages).length} project image(s) -> public/manifest.json`
  );
}

main().catch((err) => {
  console.error("[assets] failed:", err);
  process.exit(0); // never block the build
});
