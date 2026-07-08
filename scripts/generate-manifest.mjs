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

// Optional sharp — used to make optimized photo previews. Never fatal.
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
    } else if (sharp && ext === ".pdf") {
      // sharp can rasterize PDFs when built against a libvips with PDF support.
      try {
        const name = file.replace(/\.pdf$/i, "") + ".png";
        await sharp(path.join(CERT_SRC, file), { page: 0, density: 150 })
          .resize(800, null, { withoutEnlargement: true })
          .png()
          .toFile(path.join(PUB_CERT, name));
        preview = `/certificates/${name}`;
      } catch {
        preview = null; // fall back to a styled card in the UI
      }
    }

    out.push({
      title: prettify(file),
      file: `/certificates/${file}`,
      preview,
      type: ext === ".pdf" ? "pdf" : "image",
    });
  }
  return out;
}

async function processPhotos() {
  await ensureDir(PUB_PHOTO);
  const files = await listFiles(PHOTO_SRC);
  const out = [];
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    const dest = path.join(PUB_PHOTO, file);
    if (sharp) {
      try {
        await sharp(path.join(PHOTO_SRC, file))
          .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
          .toFile(dest);
      } catch {
        await fs.copyFile(path.join(PHOTO_SRC, file), dest);
      }
    } else {
      await fs.copyFile(path.join(PHOTO_SRC, file), dest);
    }
    out.push({ file: `/photos/${file}`, title: prettify(file) });
  }
  return out;
}

// Optimize project screenshots. Referenced by path in lib/content.js
// (e.g. image: "/projects/mensa.jpg"), so we just copy/optimize by filename.
async function processProjects() {
  await ensureDir(PUB_PROJECT);
  const files = await listFiles(PROJECT_SRC);
  const out = [];
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    const dest = path.join(PUB_PROJECT, file);
    if (sharp) {
      try {
        await sharp(path.join(PROJECT_SRC, file))
          .resize(1400, 1400, { fit: "inside", withoutEnlargement: true })
          .toFile(dest);
      } catch {
        await fs.copyFile(path.join(PROJECT_SRC, file), dest);
      }
    } else {
      await fs.copyFile(path.join(PROJECT_SRC, file), dest);
    }
    out.push(`/projects/${file}`);
  }
  return out;
}

async function main() {
  await ensureDir(path.join(root, "public"));
  await ensureDir(CERT_SRC);
  await ensureDir(PHOTO_SRC);
  await ensureDir(PROJECT_SRC);

  const [certificates, photos, projectImages] = await Promise.all([
    processCertificates(),
    processPhotos(),
    processProjects(),
  ]);

  const manifest = {
    generatedAt: new Date().toISOString(),
    certificates,
    photos,
    projectImages,
  };
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(
    `[assets] ${certificates.length} certificate(s), ${photos.length} photo(s), ${projectImages.length} project image(s) -> public/manifest.json`
  );
}

main().catch((err) => {
  console.error("[assets] failed:", err);
  process.exit(0); // never block the build
});
