"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { Icon } from "./Icons";
import { useContent } from "../lib/LanguageProvider";

function Card({ icon, title, children }) {
  return (
    <motion.div variants={itemVariants} className="glass rounded-2xl p-7 card-glow">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver shrink-0">
          <Icon name={icon} className="w-5 h-5" />
        </span>
        <h3 className="text-base font-medium text-white">{title}</h3>
      </div>
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}

export default function Knowledge() {
  const { knowledge, ui } = useContent();
  const s = ui.sections.knowledge;

  return (
    <section id="knowledge" className="relative py-20 md:py-28 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow={s.eyebrow} title={s.title} sub={s.sub} />
        <Stagger className="grid sm:grid-cols-2 gap-5">
          {knowledge.groups.map((g) => (
            <Card key={g.title} icon={g.icon} title={g.title}>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm text-silver bg-white/5 border border-white/10 rounded-full px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
          <Card icon="people" title={knowledge.languagesTitle}>
            <dl className="divide-y divide-white/[0.06]">
              {knowledge.languages.map((l) => (
                <div key={l.name} className="flex items-baseline justify-between gap-4 py-2 first:pt-0 last:pb-0">
                  <dt className="text-white text-sm">{l.name}</dt>
                  <dd className="text-steel text-sm text-right">{l.level}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </Stagger>
      </div>
    </section>
  );
}
