"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { Icon } from "./Icons";
import { useContent } from "../lib/LanguageProvider";

// Shown when the drop-folder is empty so the section never looks broken.
const placeholders = [
  { title: "Diploma (Placeholder)", type: "pdf" },
  { title: "Certificate (Placeholder)", type: "pdf" },
  { title: "Certificate (Placeholder)", type: "pdf" },
];

function Card({ item, placeholder, cert }) {
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-panel to-ink flex items-center justify-center">
        {item.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.preview}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center px-6">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-silver">
              <Icon name="doc" className="w-7 h-7" />
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-widest text-steel">
              {placeholder ? cert.awaiting : cert.pdf}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      </div>
      <div className="p-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-white line-clamp-1">
            {item.title}
          </h3>
          <p className="text-xs text-steel mt-0.5 uppercase tracking-wider">
            {item.type === "image" ? cert.image : cert.document}
          </p>
        </div>
        {!placeholder && (
          <span className="text-steel group-hover:text-white transition-colors">
            <Icon name="arrow" className="w-4 h-4" />
          </span>
        )}
      </div>
    </>
  );

  return (
    <motion.div variants={itemVariants} className="group glass rounded-2xl overflow-hidden card-glow">
      {placeholder ? (
        <div>{body}</div>
      ) : (
        <a href={item.file} target="_blank" rel="noopener noreferrer">
          {body}
        </a>
      )}
    </motion.div>
  );
}

export default function Certificates({ certificates = [] }) {
  const { ui } = useContent();
  const s = ui.sections.certificates;
  const empty = certificates.length === 0;
  const items = empty ? placeholders : certificates;

  return (
    <section id="certificates" className="relative py-20 md:py-28 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={s.eyebrow}
          title={s.title}
          sub={empty ? s.subEmpty : s.subFilled}
        />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <Card key={i} item={item} placeholder={empty} cert={ui.cert} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
