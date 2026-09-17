"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const DURATION = 0.4;
const RISE = 12;

// Light fade-in on scroll. No blur: cheap on phones and no dark gap after a nav jump.
// Without JavaScript, globals.css keeps these elements visible (see html:not(.js)).
export function Reveal({ children, delay = 0, y = RISE, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: DURATION, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", stagger = 0.06 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const itemVariants = {
  hidden: { opacity: 0, y: RISE },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
};
