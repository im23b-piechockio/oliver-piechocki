"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./Section";
import { Reveal } from "./Reveal";
import { Icon } from "./Icons";
import { useContent } from "../lib/LanguageProvider";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-steel">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-steel/50 outline-none focus:border-white/30 focus:bg-white/[0.05] transition-colors";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function Contact() {
  const { profile, ui } = useContent();
  const t = ui.contactUi;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // status: idle | sending | success | error | mailto
  const [status, setStatus] = useState("idle");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openMailto = () => {
    const subject = encodeURIComponent(`Portfolio contact, ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // No backend key configured yet -> open the user's mail app.
    if (!WEB3FORMS_KEY) {
      openMailto();
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact — ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={ui.sections.contact.eyebrow}
          title={ui.sections.contact.title}
          sub={ui.sections.contact.sub}
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          {/* Direct contact */}
          <div className="space-y-4">
            <Reveal>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 glass rounded-2xl p-5 card-glow group"
              >
                <span className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver group-hover:text-white transition-colors">
                  <Icon name="mail" className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-steel">
                    {t.email}
                  </span>
                  <span className="block text-white">{profile.email}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-4 glass rounded-2xl p-5 card-glow group"
              >
                <span className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver group-hover:text-white transition-colors">
                  <Icon name="phone" className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-steel">
                    {t.call}
                  </span>
                  <span className="block text-white">{profile.phone}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="flex items-center gap-4 glass rounded-2xl p-5">
                <span className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver">
                  <Icon name="pin" className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-steel">
                    {t.location}
                  </span>
                  <span className="block text-white">{profile.location}</span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="glass rounded-2xl p-7 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t.name}>
                  <input
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder={t.namePh}
                    className={inputClass}
                  />
                </Field>
                <Field label={t.emailField}>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder={t.emailPh}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label={t.message}>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder={t.messagePh}
                  className={inputClass + " resize-none"}
                />
              </Field>
              <div className="flex items-center gap-4 flex-wrap">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-white text-ink font-medium px-6 py-3 rounded-full hover:bg-silver transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? t.sending : t.send}
                  <Icon name="arrow" className="w-4 h-4" />
                </motion.button>
                {(status === "success" || status === "mailto") && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-1.5 text-sm text-emerald-400"
                  >
                    <Icon name="check" className="w-4 h-4" />
                    {status === "mailto" ? t.sent : t.success}
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-red-400"
                  >
                    {t.error}
                  </motion.span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
