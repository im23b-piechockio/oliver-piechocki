"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useContent } from "../lib/LanguageProvider";
import { Icon } from "./Icons";

export default function Hero({ portrait }) {
  const c = useContent();
  const { profile, highlights, ui } = c;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-grid" />
      <motion.div
        style={{ scale }}
        className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-white/[0.06] to-transparent blur-3xl"
      />
      <motion.div
        style={{ scale }}
        className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-steel/10 to-transparent blur-3xl"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-6xl px-5 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center w-full"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-steel glass rounded-full px-4 py-1.5 mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {profile.tagline}
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.98]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="block text-gradient"
            >
              {profile.name}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="block text-steel text-2xl sm:text-3xl lg:text-4xl mt-4 font-normal"
            >
              {profile.role} {ui.atKsh}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-7 max-w-xl text-steel leading-relaxed"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-white text-ink font-medium px-6 py-3 rounded-full hover:bg-silver transition-colors"
            >
              {ui.getInTouch}
              <Icon
                name="arrow"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-silver hover:text-white transition-colors"
            >
              {ui.exploreProfile}
              <Icon name="down" className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-line/60 rounded-2xl overflow-hidden glass"
          >
            {highlights.map((h) => (
              <div key={h.label} className="bg-ink/40 p-4 text-center">
                <div className="text-xl font-semibold text-white">{h.value}</div>
                <div className="text-[11px] uppercase tracking-wider text-steel mt-1">
                  {h.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass card-glow">
            {portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={portrait}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-panel to-ink">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 flex items-center justify-center text-4xl font-semibold text-silver">
                  {profile.firstName[0]}
                  {profile.name.split(" ")[1]?.[0]}
                </div>
                <p className="mt-5 text-xs text-steel tracking-wider uppercase">
                  {ui.portraitPlaceholder}
                </p>
                <p className="mt-1 text-[11px] text-steel/60 px-6 text-center">
                  {ui.portraitHint}
                </p>
              </div>
            )}
          </div>
          <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 text-sm">
            <div className="text-white font-medium">{profile.location}</div>
            <div className="text-steel text-xs">{ui.bornPrefix} {profile.born}</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-steel"
      >
        <Icon name="down" className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
