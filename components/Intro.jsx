"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../lib/content";

// Brief intro overlay on first visit of a session.
export default function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer;
    const seen = sessionStorage.getItem("introSeen");
    if (seen) {
      setShow(false);
      return;
    }
    sessionStorage.setItem("introSeen", "1");
    document.body.style.overflow = "hidden";
    timer = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-gradient"
            >
              {profile.name}
              <span className="text-steel">.</span>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 h-px w-40 mx-auto bg-gradient-to-r from-transparent via-steel to-transparent origin-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
