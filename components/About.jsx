"use client";

import { SectionHeader } from "./Section";
import { Reveal, Stagger, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { about, interests, profile } from "../lib/content";
import { Icon } from "./Icons";

const facts = [
  { label: "Based in", value: profile.location, icon: "pin" },
  { label: "Born", value: profile.born, icon: "spark" },
  { label: "Focus", value: "IT · Business · Finance", icon: "chip" },
  { label: "Status", value: "Open to opportunities", icon: "check" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="About" title="Who I am" />

        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16">
          {/* Narrative */}
          <div>
            {/* Lead statement with accent bar */}
            <Reveal>
              <div className="relative pl-6 mb-10">
                <span className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-white/70 via-steel to-transparent" />
                <p className="text-2xl sm:text-3xl font-medium leading-snug text-gradient">
                  IT student. Aspiring economist. Everyday athlete.
                </p>
              </div>
            </Reveal>

            <div className="space-y-6">
              {about.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-lg text-silver/90 leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Quick facts + interests card */}
          <div className="space-y-5">
            <Reveal>
              <div className="glass rounded-2xl p-6 divide-y divide-white/[0.06]">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                    <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-silver shrink-0">
                      <Icon name={f.icon} className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-widest text-steel">
                        {f.label}
                      </div>
                      <div className="text-white text-sm truncate">{f.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xs uppercase tracking-widest text-steel mb-4">
                  Interests
                </h3>
                <Stagger className="flex flex-wrap gap-2.5">
                  {interests.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={itemVariants}
                      className="rounded-full px-3.5 py-1.5 text-sm text-silver bg-white/[0.04] border border-white/10 hover:border-white/25 hover:text-white transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
