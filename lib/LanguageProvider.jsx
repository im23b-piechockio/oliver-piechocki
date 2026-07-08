"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { content } from "./content";

const LanguageContext = createContext(null);
const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  // Restore saved choice, else fall back to the browser language once mounted.
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved === "en" || saved === "de") {
      setLangState(saved);
    } else if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("de")) {
      setLangState("de");
    }
  }, []);

  // Keep <html lang> and storage in sync.
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (l) => setLangState(l);
  const toggle = () => setLangState((l) => (l === "en" ? "de" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, c: content[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Full active-language content tree.
export function useContent() {
  const ctx = useContext(LanguageContext);
  return ctx ? ctx.c : content.en;
}

// Language state + switchers.
export function useLang() {
  const ctx = useContext(LanguageContext);
  return ctx || { lang: "en", setLang: () => {}, toggle: () => {} };
}
