"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useContent, useLang } from "../lib/LanguageProvider";

const linkDefs = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#journey", key: "journey" },
  { href: "#projects", key: "projects" },
  { href: "#certificates", key: "certificates" },
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
          className={`px-2.5 py-1 rounded-full transition-colors ${
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
  const { scrollYProgress } = useScroll();
  const c = useContent();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently crossing the viewport's middle band.
  useEffect(() => {
    const ids = linkDefs.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
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
          <a href="/#top" className="font-semibold tracking-tight text-white">
            {c.profile.firstName}
            <span className="text-steel">.</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm text-steel">
            {linkDefs.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={`/${l.href}`}
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
          <div className="hidden md:flex items-center gap-3">
            <LangToggle />
            <a
              href="/#contact"
              className="inline-flex text-sm px-4 py-1.5 rounded-full bg-white text-ink font-medium hover:bg-silver transition-colors"
            >
              {c.ui.getInTouch}
            </a>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <LangToggle />
            <button
              className="text-steel hover:text-white"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mx-auto max-w-6xl px-5 mt-2"
          >
            <div className="glass rounded-2xl p-4 flex flex-col gap-3 text-steel">
              {linkDefs.map((l) => (
                <a
                  key={l.href}
                  href={`/${l.href}`}
                  onClick={() => setOpen(false)}
                  className="hover:text-white transition-colors"
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
