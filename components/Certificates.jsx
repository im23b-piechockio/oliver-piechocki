"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { Icon } from "./Icons";
import { useContent } from "../lib/LanguageProvider";

// Shown when the drop-folder is empty so the section never looks broken.
const placeholders = [
  { title: "Diploma (Placeholder)" },
  { title: "Certificate (Placeholder)" },
  { title: "Certificate (Placeholder)" },
];

// Joins the PDFs found at build time with the translated metadata from content.js.
// Listed certificates come first, in their listed order; unknown files follow.
function mergeCertificates(files, meta) {
  const byName = new Map(files.map((f) => [f.name, f]));
  const listed = meta
    .filter((m) => byName.has(m.file))
    .map((m) => ({ ...byName.get(m.file), ...m, file: byName.get(m.file).file }));
  const known = new Set(meta.map((m) => m.file));
  const rest = files.filter((f) => !known.has(f.name));
  return [...listed, ...rest];
}

function Card({ item, placeholder, cert }) {
  const details = [item.issuer, item.date, item.level].filter(Boolean).join(" · ");
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-panel to-ink flex items-center justify-center">
        {item.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.preview}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="text-center px-6">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-silver">
              <Icon name="doc" className="w-7 h-7" />
            </div>
            {placeholder && (
              <div className="mt-3 text-[11px] uppercase tracking-widest text-steel">
                {cert.awaiting}
              </div>
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>
      <div className="p-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-white leading-snug">{item.title}</h3>
          {details && <p className="text-xs text-steel mt-1 leading-snug">{details}</p>}
        </div>
        {!placeholder && (
          <span className="text-steel group-hover:text-white transition-colors mt-0.5 shrink-0">
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
        <a
          href={item.file}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.title}, ${cert.open}`}
          className="block h-full"
        >
          {body}
        </a>
      )}
    </motion.div>
  );
}

export default function Certificates({ certificates = [] }) {
  const { ui, certificates: meta = [], pendingCertificates = [] } = useContent();
  const s = ui.sections.certificates;
  const empty = certificates.length === 0;
  const items = empty ? placeholders : mergeCertificates(certificates, meta);

  return (
    <section id="certificates" className="relative py-20 md:py-28 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={s.eyebrow}
          title={s.title}
          sub={empty ? s.subEmpty : s.subFilled}
        />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <Card key={i} item={item} placeholder={empty} cert={ui.cert} />
          ))}
          {/* Documents not uploaded yet, shown so the record stays complete. */}
          {!empty &&
            pendingCertificates.map((item, i) => (
              <Card key={`pending-${i}`} item={{ ...item, issuer: item.meta }} placeholder cert={ui.cert} />
            ))}
        </Stagger>
      </div>
    </section>
  );
}
