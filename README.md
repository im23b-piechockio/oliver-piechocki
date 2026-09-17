# Oliver Piechocki · Portfolio

Personal portfolio of an IMS graduate (Federal Vocational Baccalaureate in
Business), looking for the internship year in application development from
summer 2027.

Live: [oliver-piechocki.vercel.app](https://oliver-piechocki.vercel.app) (German) ·
[/en](https://oliver-piechocki.vercel.app/en) (English)

Built with **Next.js 15**, **React** and **Framer Motion**. Dark, minimal design.

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

## Structure

- `app/(de)/` serves German at `/`, `app/(en)/en/` serves English at `/en`.
  Each has its own root layout, so language, title and link preview come from
  the server.
- [`components/HomePage.jsx`](components/HomePage.jsx) assembles the sections:
  Hero, About, Skills, Projects, Certificates, Strengths, Journey, Contact.
- [`lib/content.js`](lib/content.js) holds **all text in both languages**:
  profile, skills, projects, certificates, timeline, contact details.
- [`lib/og.jsx`](lib/og.jsx) renders the link preview image at build time.

## Adding images & certificates

Drop files into these folders; the build-time pipeline
([`scripts/generate-manifest.mjs`](scripts/generate-manifest.mjs)) picks them up
on every `npm run dev` / `npm run build`:

- `content/photos/`: the first photo becomes the portrait.
- `content/projects/`: screenshots, referenced by the `image` field of each
  project in `lib/content.js`.
- `content/certificates/`: PDFs, shown as cards.

Photos and screenshots are turned into AVIF, WebP and JPEG in several widths.

For a **new certificate**:

1. Put the PDF into `content/certificates/`.
2. Run `npm run previews` to render its first page as a preview image
   (needs Playwright's Chromium once: `npx playwright install chromium`).
3. Add title, issuer, date and level for both languages under `certificates`
   in `lib/content.js`.

## Contact form

Messages are sent via Formspree. Set the endpoint in `.env.local`:

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/...
```

Without it, the form shows an error with the email address instead of sending.

## Deployment

Pushed to `main`, deployed automatically by Vercel.
