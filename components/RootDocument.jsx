import "../app/globals.css";
import { Inter } from "next/font/google";
import { content } from "../lib/content";
import { AgentationProvider } from "./AgentationProvider";
import { LanguageProvider } from "../lib/LanguageProvider";
import Intro from "./Intro";
import ScrollToTop from "./ScrollToTop";
import SkipLink from "./SkipLink";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const SITE_URL = "https://oliver-piechocki.vercel.app";

// Each language lives on its own URL: German is the default at "/", English at "/en".
export const langPath = { de: "/", en: "/en" };

export function buildMetadata(lang) {
  const profile = content[lang].profile;
  const title = `${profile.name}, ${profile.role}`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: profile.summary,
    authors: [{ name: profile.name }],
    keywords: [
      profile.name,
      "IMS Absolvent",
      "Praktikum 2027",
      "Berufsmaturität Wirtschaft",
      "Applikationsentwicklung",
      "Portfolio",
      "KSH Hottingen",
      "Zürich",
    ],
    alternates: {
      canonical: langPath[lang],
      languages: { "de-CH": langPath.de, en: langPath.en, "x-default": langPath.de },
    },
    openGraph: {
      title,
      description: profile.summary,
      siteName: profile.name,
      type: "website",
      locale: lang === "de" ? "de_CH" : "en_US",
      url: langPath[lang],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: profile.summary,
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

function personSchema(lang) {
  const profile = content[lang].profile;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: `${SITE_URL}${lang === "de" ? "" : langPath.en}`,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Kanton Zürich",
      addressCountry: "CH",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "KSH Hottingen",
    },
    knowsAbout: ["Application development", "Web development", "Business", "Finance"],
    sameAs: [profile.linkedin, profile.github],
  };
}

// Marks the document as JS-capable before first paint, so reveal animations may
// start hidden. Without JS the class is missing and globals.css keeps content visible.
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootDocument({ lang, children }) {
  return (
    <html lang={lang === "de" ? "de-CH" : "en"} className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(lang)) }}
        />
      </head>
      <body>
        <LanguageProvider lang={lang}>
          <SkipLink />
          <Intro />
          {children}
          <ScrollToTop />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === "development" && <AgentationProvider />}
      </body>
    </html>
  );
}
