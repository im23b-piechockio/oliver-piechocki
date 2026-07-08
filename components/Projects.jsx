"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { Icon } from "./Icons";
import { useContent } from "../lib/LanguageProvider";

function ProjectCard({ p }) {
  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-panel to-ink">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-semibold text-white/10 group-hover:text-white/20 transition-colors">
                {p.title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
          </>
        )}
        <div className="absolute top-4 left-4 text-[11px] uppercase tracking-widest text-white glass rounded-full px-3 py-1 z-10">
          {p.tag}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-medium text-white">{p.title}</h3>
          {p.link && (
            <span className="text-steel group-hover:text-white transition-colors mt-1">
              <Icon name="arrow" className="w-4 h-4" />
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-steel leading-relaxed">{p.desc}</p>
        {p.stack?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="text-[11px] text-silver bg-white/5 border border-white/10 rounded-full px-2.5 py-1"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <motion.div
      variants={itemVariants}
      className="group glass rounded-2xl overflow-hidden card-glow"
    >
      {p.link ? (
        <a href={p.link} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <div>{inner}</div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const { projects, ui } = useContent();
  return (
    <section id="projects" className="relative py-28 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={ui.sections.projects.eyebrow}
          title={ui.sections.projects.title}
          sub={ui.sections.projects.sub}
        />
        <Stagger className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
