"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useContent, useLang } from "../lib/LanguageProvider";

const linkDefs = [
  { href: "#about", key: "about" },
  { href: "#knowledge", key: "knowledge" },
  { href: "#projects", key: "projects" },
  { href: "#certificates", key: "certificates" },
  { href: "#skills", key: "skills" },
  { href: "#journey", key: "journey" },
  { href: "#contact", key: "contact" },
];

function LangToggle({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex items-center rounded-full glass p-0.5 text-xs ${className}`}>
      {["en", "de"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-3 py-1.5 min-w-[44px] min-h-[44px] lg:min-w-0 lg:min-h-0 rounded-full transition-colors ${
            lang === l ? "bg-white text-ink font-medium" : "text-steel hover:text-white"
          }`}
          aria-label={`Switch to ${l === "en" ? "English" : "German"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const c = useContent();
  const { base } = useLang();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  const reduceMotion = useReducedMotion();
  const progress = reduceMotion ? scrollYProgress : springProgress;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape, a tap outside it, or scrolling.
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (!headerRef.current?.contains(e.target)) setOpen(false);
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 10) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  // Highlight the section currently crossing the viewport's middle band.
  useEffect(() => {
    const ids = ["top", ...linkDefs.map((l) => l.href.slice(1))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          setActive(id === "top" ? "" : id);
          // Keep the address bar on the section in view, so a copied link shows what you see.
          // replaceState: no history entry per section, Back still leaves the page.
          const url = id === "top" ? location.pathname : `${location.pathname}#${id}`;
          if (url !== location.pathname + location.hash) {
            history.replaceState(history.state, "", url);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/80 via-silver to-steel z-[60] origin-left"
        style={{ scaleX: progress }}
      />
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <nav
          className={`mx-auto max-w-6xl px-5 flex items-center justify-between rounded-2xl transition-all duration-500 ${
            scrolled ? "glass py-2.5 mt-2" : "py-2"
          }`}
          style={scrolled ? { maxWidth: "72rem" } : {}}
        >
          <a href={`${base}#top`} className="font-semibold tracking-tight text-white">
            {c.profile.firstName}
            <span className="text-steel">.</span>
          </a>
          <div className="hidden lg:flex items-center gap-7 text-sm text-steel">
            {linkDefs.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={`${base}${l.href}`}
                  className={`relative transition-colors duration-300 ${
                    isActive ? "text-white" : "hover:text-white"
                  }`}
                >
                  {c.ui.nav[l.key]}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-white/70"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <LangToggle />
            <a
              href={`${base}#contact`}
              className="inline-flex text-sm px-4 py-1.5 rounded-full bg-white text-ink font-medium hover:bg-silver transition-colors"
            >
              {c.ui.getInTouch}
            </a>
          </div>
          <div className="lg:hidden flex items-center gap-3">
            <LangToggle />
            <button
              ref={menuButtonRef}
              className="text-steel hover:text-white w-11 h-11 flex items-center justify-center -mr-2"
              onClick={() => setOpen((o) => !o)}
              aria-label={c.ui.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-px bg-current" />
                <span className="block w-6 h-px bg-current" />
                <span className="block w-4 h-px bg-current" />
              </div>
            </button>
          </div>
        </nav>

        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mx-auto max-w-6xl px-5 mt-2"
          >
            <div className="rounded-2xl p-2 flex flex-col text-steel bg-[#101015] border border-white/10 shadow-2xl">
              {linkDefs.map((l) => (
                <a
                  key={l.href}
                  href={`${base}${l.href}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-[44px] px-3 rounded-xl hover:text-white hover:bg-white/5 transition-colors"
                >
                  {c.ui.nav[l.key]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}
