import "./globals.css";
import { Inter } from "next/font/google";
import { profile } from "../lib/content";
import { AgentationProvider } from "../components/AgentationProvider";
import { LanguageProvider } from "../lib/LanguageProvider";
import Intro from "../components/Intro";
import CustomCursor from "../components/CustomCursor";
import ScrollToTop from "../components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  metadataBase: new URL("https://oliver-piechocki.vercel.app"),
  title: `${profile.name}, ${profile.role}`,
  description: profile.summary,
  authors: [{ name: profile.name }],
  keywords: [profile.name, "IT Student", "Portfolio", "KSH Hottingen", "Zürich"],
  openGraph: {
    title: `${profile.name}, ${profile.role}`,
    description: profile.summary,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name}, ${profile.role}`,
    description: profile.summary,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: "https://oliver-piechocki.vercel.app",
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
  knowsAbout: ["Information Technology", "Business", "Economics", "Finance"],
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <Intro />
        <CustomCursor />
        <ScrollToTop />
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === "development" && <AgentationProvider />}
      </body>
    </html>
  );
}
