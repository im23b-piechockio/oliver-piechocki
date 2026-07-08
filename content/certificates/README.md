# Certificates & Diplomas

Drop your **PDF** files (or images) into this folder.

On the next `npm run dev` or `npm run build` they are automatically copied into
the site and shown in the **Certificates** section — no code changes needed.

- PDFs get a "View PDF" card (a preview image is generated if your `sharp`
  build supports PDF rasterization; otherwise an elegant fallback card is shown).
- The filename becomes the card title, so name files nicely, e.g.
  `Cisco-Networking-Basics.pdf` -> "Cisco Networking Basics".
