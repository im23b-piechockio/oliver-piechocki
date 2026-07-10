import { Reveal } from "./Reveal";

export function SectionHeader({ eyebrow, title, sub }) {
  return (
    <Reveal>
      <div className="mb-10 md:mb-14 max-w-2xl">
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.25em] text-steel mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-steel/50" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gradient">
          {title}
        </h2>
        {sub && <p className="mt-4 text-steel leading-relaxed">{sub}</p>}
      </div>
    </Reveal>
  );
}
