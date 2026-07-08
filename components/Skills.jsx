"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { Icon } from "./Icons";
import { useContent } from "../lib/LanguageProvider";

export default function Skills() {
  const { skills, ui } = useContent();
  return (
    <section id="skills" className="relative py-28 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={ui.sections.skills.eyebrow}
          title={ui.sections.skills.title}
          sub={ui.sections.skills.sub}
        />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              className="group glass rounded-2xl p-7 card-glow"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <Icon name={s.icon} className="w-6 h-6" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-steel leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
