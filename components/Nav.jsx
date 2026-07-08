"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { profile } from "../lib/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
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
          <a href="#top" className="font-semibold tracking-tight text-white">
            {profile.firstName}
            <span className="text-steel">.</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm text-steel">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-white transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex text-sm px-4 py-1.5 rounded-full bg-white text-ink font-medium hover:bg-silver transition-colors"
          >
            Get in touch
          </a>
          <button
            className="md:hidden text-steel hover:text-white"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className="block w-6 h-px bg-current" />
              <span className="block w-6 h-px bg-current" />
              <span className="block w-4 h-px bg-current" />
            </div>
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mx-auto max-w-6xl px-5 mt-2"
          >
            <div className="glass rounded-2xl p-4 flex flex-col gap-3 text-steel">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}
