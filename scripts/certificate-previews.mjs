// Renders page 1 of every PDF in content/certificates to a JPEG preview in
// content/certificates/previews/. Run once after adding a certificate:
//   npm run previews
// The previews are committed, so the Vercel build does not need a browser.
// Uses Playwright's Chromium to run pdf.js, because Node has no canvas.

import { promises as fs } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CERT_SRC = path.join(root, "content", "certificates");
const OUT = path.join(CERT_SRC, "previews");
const PDFJS = path.join(root, "node_modules", "pdfjs-dist", "build");
const WIDTH = 800;
// Scans that were fed into the scanner sideways, rotated clockwise in degrees.
const ROTATE = { "Sprachaufenthalt Global Village Hawaii.pdf": 90 };

const types = { ".mjs": "text/javascript", ".pdf": "application/pdf", ".html": "text/html" };

// Serves pdf.js and the certificate PDFs to the headless browser.
const server = http.createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = url.startsWith("/pdfjs/")
    ? path.join(PDFJS, url.slice(7))
    : url.startsWith("/pdf/")
      ? path.join(CERT_SRC, url.slice(5))
      : null;
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end("<!doctype html><canvas></canvas>");
  }
  try {
    const body = await fs.readFile(file);
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

await fs.mkdir(OUT, { recursive: true });
const pdfs = (await fs.readdir(CERT_SRC)).filter((f) => f.toLowerCase().endsWith(".pdf"));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(base);

for (const file of pdfs) {
  const dataUrl = await page.evaluate(
    async ({ base, file, width, rotation }) => {
      const pdfjs = await import(`${base}/pdfjs/pdf.mjs`);
      pdfjs.GlobalWorkerOptions.workerSrc = `${base}/pdfjs/pdf.worker.mjs`;
      const doc = await pdfjs.getDocument(`${base}/pdf/${encodeURIComponent(file)}`).promise;
      const pdfPage = await doc.getPage(1);
      const scale = width / pdfPage.getViewport({ scale: 1, rotation }).width;
      const viewport = pdfPage.getViewport({ scale, rotation });
      const canvas = document.querySelector("canvas");
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      await pdfPage.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      return canvas.toDataURL("image/jpeg", 0.82);
    },
    { base, file, width: WIDTH, rotation: ROTATE[file] || 0 }
  );
  const name = file.replace(/\.pdf$/i, ".jpg");
  await fs.writeFile(path.join(OUT, name), Buffer.from(dataUrl.split(",")[1], "base64"));
  console.log(`[previews] ${file} -> previews/${name}`);
}

await browser.close();
server.close();
