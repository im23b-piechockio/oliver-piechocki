# Oliver Piechocki — Portfolio

A single-page, animated portfolio built with **Next.js 14**, **React** and
**Framer Motion**. Dark, minimal design in black / silver / grey / white.

## Run it

```bash
npm install      # first time only
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Editing content

All text lives in one file: [`lib/content.js`](lib/content.js) — name, summary,
skills, timeline, interests, **email and phone number**.

> The phone number is a placeholder (`+41 00 000 00 00`). Update it in
> `lib/content.js`.

## Adding photos & certificates (automatic)

Just drop files into these folders and rebuild — they are picked up
automatically by the build-time asset pipeline
([`scripts/generate-manifest.mjs`](scripts/generate-manifest.mjs)):

- `content/photos/` — images (`.jpg`, `.png`, `.webp`). The **first** photo
  becomes the hero portrait. Images are web-optimized via `sharp`.
- `content/certificates/` — PDFs (or images). Each becomes a clickable card in
  the Certificates section. A preview image is generated when your `sharp`
  build supports PDF rasterization; otherwise a clean document card is shown.

No code changes needed — the folders are scanned on every `npm run dev` /
`npm run build`.

## Testing

The site is validated with Playwright:

```bash
npm start                     # in one terminal (port 3111 used by scripts)
node scripts/validate.mjs     # content + console-error checks, screenshots
```

## Sections

Hero → About → Skills → Journey → Certificates → Contact (form + call/email
links) → Footer, with scroll-progress bar and reveal-on-scroll animations.

_Auto-deploy test: connected to GitHub via Vercel._
