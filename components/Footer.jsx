import { profile } from "../lib/content";
import { Icon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 px-5">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-steel">
        <div className="font-medium text-white">
          {profile.firstName}
          <span className="text-steel">.</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <Icon name="mail" className="w-4 h-4" /> Email
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            className="hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <Icon name="phone" className="w-4 h-4" /> Call
          </a>
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <Icon name="linkedin" className="w-4 h-4" /> LinkedIn
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
