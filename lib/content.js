// Single source of truth for all editable site content — bilingual (EN / DE).
// Access the active language via the useContent() hook (lib/LanguageProvider).

// Language-neutral values, shared across both languages.
const neutral = {
  name: "Oliver Piechocki",
  firstName: "Oliver",
  email: "oliverpiechocki1633@gmail.com",
  phone: "+41 78 635 88 43",
  linkedin: "https://www.linkedin.com/in/oliver-piechocki-092286382/",
  github: "https://github.com/im23b-piechockio",
};

// Per-project neutral metadata (slug used for detail pages).
const projectMeta = {
  mensa: {
    slug: "mensa",
    stack: ["TypeScript", "Next.js", "Java", "PostgreSQL"],
    image: "/projects/mensa.jpg",
    link: "https://github.com/im23b-piechockio/I2b-Mensa-app",
  },
  creatine: {
    slug: "creatine",
    stack: ["JavaScript", "HTML", "CSS", "AI Chatbot"],
    image: "/projects/creatine.jpg",
    link: "https://github.com/im23b-piechockio/PrWr_creatine",
    demo: "https://im23b-citrand.github.io/PrWR_Kreatin/",
  },
  enerlytics: {
    slug: "enerlytics",
    stack: ["Python", "Flask", "Pandas", "lxml"],
    image: "/projects/enerlytics.jpg",
    link: "https://github.com/im23b-piechockio/Enerlytics",
  },
  portfolio: {
    slug: "portfolio",
    stack: ["Next.js", "React", "Framer Motion"],
    image: "/projects/portfolio.jpg",
    link: "https://github.com/im23b-piechockio/oliver-piechocki",
  },
};

export const content = {
  en: {
    profile: {
      ...neutral,
      role: "IT Student",
      tagline: "IT · Business · Finance",
      location: "Kanton Zürich, Switzerland",
      born: "July 2006",
      summary:
        "IT student at KSH Hottingen with a strong drive for technology, business and economics. I combine solid problem-solving skills with fast adaptability and a genuine eagerness to keep learning, on the screen and in the gym.",
    },
    highlights: [
      { value: "2023", label: "IMS School" },
      { value: "KSH", label: "Hottingen" },
      { value: "3+", label: "Core strengths" },
      { value: "24/7", label: "Open to learn" },
    ],
    about: [
      "I'm an IT student based in Kanton Zürich, currently attending the IMS School alongside my studies at KSH Hottingen.",
      "My interests sit right at the intersection of information technology, business and economics, I like understanding not just how a system works, but why it matters commercially.",
      "Outside of tech I'm an ambitious, regularly active athlete. Discipline from the gym is the same discipline I bring to learning new tools and solving hard problems.",
    ],
    skills: [
      { title: "Problem Solving", desc: "Breaking complex problems into clear, workable steps and following through to a solution.", icon: "puzzle" },
      { title: "Adaptability", desc: "Comfortable with change and new environments, I pick up unfamiliar tools quickly.", icon: "shuffle" },
      { title: "Eager to Learn", desc: "Continuously curious. I actively seek out new knowledge in IT, finance and beyond.", icon: "spark" },
      { title: "Discipline", desc: "A committed, regularly active athlete, focus and consistency carry into my work.", icon: "flame" },
      { title: "People & Clients", desc: "I genuinely enjoy working with people and clients. I listen carefully, communicate clearly and stay patient to understand what each person really needs.", icon: "people" },
    ],
    timeline: [
      { period: "Now", title: "IMS Informatikmittelschule", org: "KSH Hottingen", desc: "Following the IMS model at KSH Hottingen, a combined school and apprenticeship path that pairs an IT vocational diploma (EFZ) with a Berufsmaturität in economics and business." },
      { period: "Next", title: "One-year internship", org: "IT Practicum", desc: "The practical year of the IMS programme, applying my IT and business foundation in a real company and turning classroom knowledge into hands-on experience." },
      { period: "Then", title: "Studying Economics (BWL)", org: "University · Planned", desc: "After the internship I plan to study business economics (BWL) and build a career at the intersection of technology, business and finance." },
      { period: "Throughout", title: "Athlete & self-learner", org: "Gym · Finance · IT", desc: "Alongside it all, training regularly and learning independently, carrying the same discipline into every stage of the path." },
    ],
    projects: [
      { ...projectMeta.mensa, title: "Mensa App", tag: "Full-stack · Team", desc: "A full-stack cafeteria app for the Bildungszentrum Zürichsee, built in a team. Students browse the daily menu, filter by diet (vegan, vegetarian, lactose-free), rate meals and save favourites. A Java backend serves a PostgreSQL database, with the frontend migrated from React to a modern Next.js / TypeScript app." },
      { ...projectMeta.creatine, title: "Creatine Info Page", tag: "Web · Team", desc: "An interactive, science-backed info site about creatine, built in a team and deployed live. It features a weight-based dosage calculator, an AI chat assistant for live questions, an animated FAQ and cited studies." },
      { ...projectMeta.enerlytics, title: "Enerlytics", tag: "Data · Team", desc: "A data-visualization tool, built in a team, that parses Swiss energy-metering data (the ESL and SDAT XML standards) with Python and turns it into clear, interactive charts through a Flask web app — with dedicated parsers per format and pandas-based processing." },
      { ...projectMeta.portfolio, title: "This Portfolio", tag: "Web · Next.js", desc: "The site you're on, a responsive, animated single-page portfolio built with Next.js, React and Framer Motion." },
    ],
    interests: ["Information Technology", "Business & Economy", "Finance & Investing", "Health & Sports", "Fitness & Athletics", "Eager to Learn"],
    aboutLead: "IT student. Aspiring economist. Everyday athlete.",
    ui: {
      nav: { about: "About", skills: "Skills", journey: "Journey", projects: "Projects", certificates: "Certificates", contact: "Contact" },
      getInTouch: "Get in touch",
      exploreProfile: "Explore profile",
      portraitPlaceholder: "Portrait placeholder",
      portraitHint: "Drop a photo in content/photos",
      sections: {
        about: { eyebrow: "About", title: "Who I am" },
        skills: { eyebrow: "Strengths", title: "What I bring", sub: "A blend of technical curiosity, commercial thinking and the discipline of an athlete." },
        journey: { eyebrow: "Journey", title: "Education & path" },
        projects: { eyebrow: "Work", title: "Projects", sub: "A selection of things I've built and explored, hands-on practice across IT, web and finance." },
        certificates: { eyebrow: "Credentials", title: "Diplomas & certificates", subFilled: "Official documents, click any card to open the full PDF.", subEmpty: "Placeholders shown below. Drop PDFs into content/certificates and they appear here automatically on the next build." },
        contact: { eyebrow: "Contact", title: "Let's talk", sub: "Open to internships and opportunities in IT and business. Reach out, I usually reply quickly." },
      },
      facts: { basedIn: "Based in", born: "Born", focus: "Focus", status: "Status", statusValue: "Open to opportunities", focusValue: "IT · Business · Finance" },
      interestsLabel: "Interests",
      cert: { pdf: "PDF Document", document: "Document", image: "Image", awaiting: "Awaiting upload" },
      contactUi: { email: "Email", call: "Call", location: "Location", name: "Name", emailField: "Email", message: "Message", send: "Send message", sending: "Sending…", success: "Thanks! Your message has been sent.", error: "Something went wrong. Please email me directly.", sent: "Opening your mail app…", namePh: "Your name", emailPh: "you@example.com", messagePh: "Tell me a little about the opportunity…" },
      viewProject: "View details",
      backToProjects: "Back to projects",
      viewOnGithub: "View on GitHub",
      code: "Code",
      liveDemo: "Live demo",
      techStack: "Tech stack",
      atKsh: "at KSH Hottingen",
      bornPrefix: "Born",
    },
  },

  de: {
    profile: {
      ...neutral,
      role: "IT-Student",
      tagline: "IT · Business · Finanzen",
      location: "Kanton Zürich, Schweiz",
      born: "Juli 2006",
      summary:
        "IT-Student an der KSH Hottingen mit einer starken Leidenschaft für Technologie, Wirtschaft und Ökonomie. Ich verbinde solide Problemlösungsfähigkeiten mit schneller Anpassungsfähigkeit und echter Lernbereitschaft, am Bildschirm wie im Gym.",
    },
    highlights: [
      { value: "2023", label: "IMS Schule" },
      { value: "KSH", label: "Hottingen" },
      { value: "3+", label: "Kernstärken" },
      { value: "24/7", label: "Lernbereit" },
    ],
    about: [
      "Ich bin IT-Student und wohne im Kanton Zürich. Aktuell besuche ich die IMS an der KSH Hottingen.",
      "Meine Interessen liegen genau an der Schnittstelle von Informationstechnologie, Wirtschaft und Ökonomie. Ich will nicht nur verstehen, wie ein System funktioniert, sondern auch, warum es wirtschaftlich relevant ist.",
      "Neben der Technik bin ich ein ehrgeiziger, regelmässig aktiver Sportler. Die Disziplin aus dem Gym bringe ich genauso ins Lernen neuer Tools und ins Lösen kniffliger Probleme ein.",
    ],
    skills: [
      { title: "Problemlösung", desc: "Komplexe Probleme in klare, umsetzbare Schritte zerlegen und konsequent bis zur Lösung verfolgen.", icon: "puzzle" },
      { title: "Anpassungsfähigkeit", desc: "Ich komme gut mit Veränderungen und neuen Umgebungen zurecht und arbeite mich schnell in unbekannte Tools ein.", icon: "shuffle" },
      { title: "Lernbereitschaft", desc: "Ständig neugierig. Ich suche aktiv nach neuem Wissen in IT, Finanzen und darüber hinaus.", icon: "spark" },
      { title: "Disziplin", desc: "Ein engagierter, regelmässig aktiver Sportler. Fokus und Konstanz nehme ich mit in meine Arbeit.", icon: "flame" },
      { title: "Menschen & Kunden", desc: "Ich arbeite wirklich gerne mit Menschen und Kunden. Ich höre genau zu, kommuniziere klar und bleibe geduldig, um zu verstehen, was jede Person wirklich braucht.", icon: "people" },
    ],
    timeline: [
      { period: "Jetzt", title: "IMS Informatikmittelschule", org: "KSH Hottingen", desc: "Ich absolviere das IMS-Modell an der KSH Hottingen, einen kombinierten Schul- und Ausbildungsweg, der ein Informatik-EFZ mit einer Berufsmaturität in Wirtschaft verbindet." },
      { period: "Danach", title: "Einjähriges Praktikum", org: "IT-Praktikum", desc: "Das praktische Jahr des IMS-Programms: Ich wende mein IT- und Wirtschaftswissen in einem echten Unternehmen an und mache aus Schulwissen praktische Erfahrung." },
      { period: "Später", title: "Studium der Betriebswirtschaft (BWL)", org: "Universität · Geplant", desc: "Nach dem Praktikum plane ich ein BWL-Studium und eine Laufbahn an der Schnittstelle von Technologie, Wirtschaft und Finanzen." },
      { period: "Durchgehend", title: "Sportler & Selbstlerner", org: "Gym · Finanzen · IT", desc: "Neben allem: regelmässiges Training und eigenständiges Lernen, mit derselben Disziplin in jeder Phase des Wegs." },
    ],
    projects: [
      { ...projectMeta.mensa, title: "Mensa-App", tag: "Full-Stack · Team", desc: "Eine Full-Stack-Mensa-App für das Bildungszentrum Zürichsee, im Team entwickelt. Schüler sehen das Tagesmenü, filtern nach Ernährung (vegan, vegetarisch, laktosefrei), bewerten Gerichte und speichern Favoriten. Ein Java-Backend bedient eine PostgreSQL-Datenbank; das Frontend wurde von React auf eine moderne Next.js-/TypeScript-App migriert." },
      { ...projectMeta.creatine, title: "Kreatin-Infoseite", tag: "Web · Team", desc: "Eine interaktive, wissenschaftlich fundierte Info-Seite über Kreatin, im Team entwickelt und live deployt. Mit gewichtsbasiertem Dosierungsrechner, KI-Chat-Assistent für Live-Fragen, animiertem FAQ und zitierten Studien." },
      { ...projectMeta.enerlytics, title: "Enerlytics", tag: "Daten · Team", desc: "Ein Datenvisualisierungs-Tool, im Team entwickelt, das Schweizer Energiemessdaten (die XML-Standards ESL und SDAT) mit Python einliest und über eine Flask-Web-App in klare, interaktive Diagramme umwandelt — mit eigenen Parsern pro Format und pandas-Datenverarbeitung." },
      { ...projectMeta.portfolio, title: "Dieses Portfolio", tag: "Web · Next.js", desc: "Die Seite, auf der du gerade bist. Ein responsives, animiertes One-Page-Portfolio, gebaut mit Next.js, React und Framer Motion." },
    ],
    interests: ["Informationstechnologie", "Wirtschaft & Ökonomie", "Finanzen & Investieren", "Gesundheit & Sport", "Fitness & Athletik", "Lernbereitschaft"],
    aboutLead: "IT-Student. Angehender Ökonom. Sportler aus Leidenschaft.",
    ui: {
      nav: { about: "Über mich", skills: "Stärken", journey: "Werdegang", projects: "Projekte", certificates: "Zertifikate", contact: "Kontakt" },
      getInTouch: "Kontakt aufnehmen",
      exploreProfile: "Profil ansehen",
      portraitPlaceholder: "Portrait-Platzhalter",
      portraitHint: "Foto in content/photos ablegen",
      sections: {
        about: { eyebrow: "Über mich", title: "Wer ich bin" },
        skills: { eyebrow: "Stärken", title: "Was ich mitbringe", sub: "Eine Mischung aus technischer Neugier, kaufmännischem Denken und der Disziplin eines Sportlers." },
        journey: { eyebrow: "Werdegang", title: "Ausbildung & Weg" },
        projects: { eyebrow: "Arbeit", title: "Projekte", sub: "Eine Auswahl an Dingen, die ich gebaut und ausprobiert habe. Praxis quer durch IT, Web und Finanzen." },
        certificates: { eyebrow: "Nachweise", title: "Diplome & Zertifikate", subFilled: "Offizielle Dokumente, klick auf eine Karte, um das vollständige PDF zu öffnen.", subEmpty: "Unten siehst du Platzhalter. Lege PDFs in content/certificates ab, dann erscheinen sie beim nächsten Build automatisch." },
        contact: { eyebrow: "Kontakt", title: "Sprechen wir", sub: "Offen für Praktika und Chancen in IT und Wirtschaft. Melde dich, ich antworte meist schnell." },
      },
      facts: { basedIn: "Wohnort", born: "Geboren", focus: "Fokus", status: "Status", statusValue: "Offen für Chancen", focusValue: "IT · Business · Finanzen" },
      interestsLabel: "Interessen",
      cert: { pdf: "PDF-Dokument", document: "Dokument", image: "Bild", awaiting: "Wartet auf Upload" },
      contactUi: { email: "E-Mail", call: "Anrufen", location: "Standort", name: "Name", emailField: "E-Mail", message: "Nachricht", send: "Nachricht senden", sending: "Wird gesendet…", success: "Danke! Deine Nachricht wurde gesendet.", error: "Etwas ist schiefgelaufen. Bitte schreib mir direkt eine E-Mail.", sent: "Öffne deine Mail-App…", namePh: "Dein Name", emailPh: "du@beispiel.com", messagePh: "Erzähl mir kurz von der Gelegenheit…" },
      viewProject: "Details ansehen",
      backToProjects: "Zurück zu den Projekten",
      viewOnGithub: "Auf GitHub ansehen",
      code: "Code",
      liveDemo: "Live-Demo",
      techStack: "Tech-Stack",
      atKsh: "an der KSH Hottingen",
      bornPrefix: "Geboren",
    },
  },
};

// Language-neutral profile for server-side metadata (English defaults).
export const profile = content.en.profile;
