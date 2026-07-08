"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./Section";
import { Reveal } from "./Reveal";
import { timeline } from "../lib/content";

export default function Timeline() {
  return (
    <section id="journey" className="relative py-28 px-5">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow="Journey" title="Education & path" />
        <div className="relative">
          <div className="absolute left-[7px] sm:left-1/2 top-0 bottom-0 w-px bg-line" />
          <div className="space-y-12">
            {timeline.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05}>
                <div
                  className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${
                    i % 2 === 0 ? "" : "sm:[&>*:first-child]:col-start-2"
                  }`}
                >
                  <motion.span
                    className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-1.5 w-3.5 h-3.5 rounded-full bg-white ring-4 ring-ink"
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  />
                  <div
                    className={`pl-8 sm:pl-0 ${
                      i % 2 === 0 ? "sm:text-right sm:pr-10" : "sm:col-start-2 sm:pl-10"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-widest text-steel">
                      {t.period}
                    </div>
                    <h3 className="mt-1 text-xl font-medium text-white">
                      {t.title}
                    </h3>
                    <div className="text-silver text-sm mt-0.5">{t.org}</div>
                    <p className="mt-2 text-sm text-steel leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
