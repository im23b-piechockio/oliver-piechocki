# Certificates & Diplomas

Drop **PDF** files (or images) into this folder. On the next `npm run dev` or
`npm run build` they are copied into the site and shown in the Certificates
section.

For a nice card:

1. Run `npm run previews` to render page 1 of each PDF into `previews/`
   (commit those images). Sideways scans can be rotated in
   `scripts/certificate-previews.mjs` (`ROTATE`).
2. Add the file under `certificates` in `lib/content.js` (both languages) with
   title, issuer, date and level. Listed certificates are shown in that order.

Files without an entry still appear, titled after their filename.
