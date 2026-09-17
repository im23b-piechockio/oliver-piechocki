import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "404 · Oliver Piechocki",
  robots: { index: false },
};

// With one root layout per language there is no shared layout for unknown URLs,
// so this page brings its own <html>. Bilingual on purpose: the language is unknown here.
export default function GlobalNotFound() {
  return (
    <html lang="de-CH" className={inter.variable}>
      <body>
        <main className="min-h-[100svh] flex items-center justify-center px-5 text-center">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-steel">404</div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-gradient">
              Seite nicht gefunden
            </h1>
            <p className="mt-2 text-steel">Page not found</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/"
                className="inline-flex items-center bg-white text-ink font-medium px-6 py-3 rounded-full hover:bg-silver transition-colors"
              >
                Zur Startseite
              </a>
              <a
                href="/en"
                className="inline-flex items-center glass px-6 py-3 rounded-full text-silver hover:text-white transition-colors"
              >
                English version
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
