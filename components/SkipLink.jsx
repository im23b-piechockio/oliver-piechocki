"use client";

import { useContent } from "../lib/LanguageProvider";

// First tab stop on the page; invisible until focused. Jumps past the navigation.
export default function SkipLink() {
  const { ui } = useContent();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-white focus:text-ink focus:font-medium focus:px-4 focus:py-3 focus:rounded-full"
    >
      {ui.skipToContent}
    </a>
  );
}
