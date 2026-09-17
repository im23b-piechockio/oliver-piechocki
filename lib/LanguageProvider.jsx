"use client";

import { createContext, useContext, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { content } from "./content";

const LanguageContext = createContext(null);

// German is the default at "/", English lives at "/en".
const basePath = { de: "/", en: "/en" };
const SCROLL_KEY = "lang-switch-position";

export function LanguageProvider({ lang, children }) {
  // After a language switch, return to the same section the visitor was reading.
  useEffect(() => {
    let saved;
    try {
      saved = JSON.parse(sessionStorage.getItem(SCROLL_KEY));
      sessionStorage.removeItem(SCROLL_KEY);
    } catch {
      return;
    }
    const target = saved && document.getElementById(saved.id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY + saved.offset;
    window.scrollTo({ top, behavior: "instant" });
  }, []);

  const setLang = (next) => {
    if (next === lang) return;
    const sections = [...document.querySelectorAll("main section[id]")];
    const current = sections.filter((s) => s.getBoundingClientRect().top <= 1).pop();
    if (current) {
      const offset = -current.getBoundingClientRect().top;
      try {
        sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ id: current.id, offset }));
      } catch {}
    }
    window.location.assign(basePath[next]);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, base: basePath[lang], c: content[lang] }}>
      {/* "user": honour the OS "reduce motion" setting, keeping opacity fades only. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageContext.Provider>
  );
}

// Full active-language content tree.
export function useContent() {
  const ctx = useContext(LanguageContext);
  return ctx ? ctx.c : content.de;
}

// Language state, base path and switcher.
export function useLang() {
  const ctx = useContext(LanguageContext);
  return ctx || { lang: "de", base: "/", setLang: () => {} };
}
