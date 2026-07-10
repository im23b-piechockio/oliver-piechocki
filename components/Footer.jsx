"use client";

import { useContent } from "../lib/LanguageProvider";
import { Icon } from "./Icons";

export default function Footer() {
  const { profile, ui } = useContent();
  return (
    <footer className="border-t border-line py-10 px-5">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-steel">
        <div className="font-medium text-white">
          {profile.firstName}
          <span className="text-steel">.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-white transition-colors inline-flex items-center gap-2 py-2"
          >
            <Icon name="mail" className="w-4 h-4" /> {ui.contactUi.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            className="hover:text-white transition-colors inline-flex items-center gap-2 py-2"
          >
            <Icon name="phone" className="w-4 h-4" /> {ui.contactUi.call}
          </a>
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-2 py-2"
            >
              <Icon name="linkedin" className="w-4 h-4" /> LinkedIn
            </a>
          )}
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-2 py-2"
            >
              <Icon name="github" className="w-4 h-4" /> GitHub
            </a>
          )}
        </div>
        <div className="text-steel/70">
          © {new Date().getFullYear()} {profile.name}
        </div>
      </div>
    </footer>
  );
}
