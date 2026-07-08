import "./globals.css";
import { Inter } from "next/font/google";
import { profile } from "../lib/content";
import { AgentationProvider } from "../components/AgentationProvider";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === "development" && <AgentationProvider />}
      </body>
    </html>
  );
}
