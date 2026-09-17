const base = "https://oliver-piechocki.vercel.app";

// Both language versions, linked to each other via hreflang alternates.
export default function sitemap() {
  const languages = { "de-CH": base, en: `${base}/en` };
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${base}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
  ];
}
