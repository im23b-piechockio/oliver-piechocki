import "./globals.css";
import { Inter } from "next/font/google";
import { profile } from "../lib/content";
import { AgentationProvider } from "../components/AgentationProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <AgentationProvider />}
      </body>
    </html>
  );
}
