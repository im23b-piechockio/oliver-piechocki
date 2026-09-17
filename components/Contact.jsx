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

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export default function Contact() {
  const { profile, ui } = useContent();
  const t = ui.contactUi;
  const [form, setForm] = useState({ name: "", email: "", message: "", gotcha: "" });
  // status: idle | sending | success | error
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  // Typing again clears a previous success message, so "sent" never sits next to an unsent draft.
  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (status === "success") setStatus("idle");
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(`${form.message}\n\n${form.name}\n${form.email}`);
      setCopied(true);
    } catch {
      // Clipboard API blocked (locked-down work PCs): select the message and use the
      // legacy copy command, so it is at least highlighted for Ctrl+C.
      const field = document.querySelector('#contact textarea[name="message"]');
      field?.focus();
      field?.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {}
      setCopied(ok);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setCopied(false);

    // Without a configured endpoint nothing can be sent: say so instead of pretending.
    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("message", form.message);
      fd.append("_subject", `Portfolio contact: ${form.name}`);
      // Formspree honeypot: bots fill every field, people never see this one.
      fd.append("_gotcha", form.gotcha);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", gotcha: "" });
      } else {
        setStatus("error"); // keep the text so it can be copied
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 px-5">
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
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-widest text-steel">
                    {t.email}
                  </span>
                  <span className="block text-white text-sm sm:text-base break-all">
                    {profile.email}
                  </span>
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
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.gotcha}
                onChange={update("gotcha")}
                className="hidden"
              />
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t.name}>
                  <input
                    required
                    name="name"
                    autoComplete="name"
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
                    name="email"
                    autoComplete="email"
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
                  name="message"
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
                {status === "success" && (
                  <motion.span
                    role="status"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-1.5 text-sm text-emerald-400"
                  >
                    <Icon name="check" className="w-4 h-4" />
                    {t.success}
                  </motion.span>
                )}
              </div>
              {status === "error" && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-400/30 bg-red-400/[0.06] p-4 text-sm"
                >
                  <p className="text-red-300 font-medium">{t.errorTitle}</p>
                  <p className="mt-1 text-silver">
                    {t.errorBody}{" "}
                    <a href={`mailto:${profile.email}`} className="text-white underline underline-offset-2 break-all">
                      {profile.email}
                    </a>
                  </p>
                  <button
                    type="button"
                    onClick={copyMessage}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 min-h-[44px] text-silver hover:text-white hover:border-white/30 transition-colors"
                  >
                    {copied && <Icon name="check" className="w-4 h-4 text-emerald-400" />}
                    {copied ? t.copied : t.copy}
                  </button>
                </motion.div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
