"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../lib/content";

// Short name flash on the first visit of a session. Rendered only in the browser,
// never blocks scrolling and ignores clicks, so the page underneath stays usable.
// Skipped entirely when the visitor prefers reduced motion.
export default function Intro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer;
    try {
      if (sessionStorage.getItem("introSeen")) return;
      sessionStorage.setItem("introSeen", "1");
    } catch {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    timer = setTimeout(() => setShow(false), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] bg-ink flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-gradient"
          >
            {profile.name}
            <span className="text-steel">.</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
