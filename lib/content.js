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
  chfCompass: {
    slug: "chf-compass",
    stack: ["Next.js", "React", "Recharts", "Framer Motion", "Financial Modeling"],
    image: "/projects/chf-compass.jpg",
    link: "https://github.com/im23b-piechockio/chf-compass",
    demo: "https://chf-compass.vercel.app",
  },
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
      role: "IMS Graduate · Business Baccalaureate",
      headline:
        "IMS graduate · Federal Vocational Baccalaureate in Business · seeking internship from summer 2027",
      tagline: "IT · Business · Finance",
      location: "Kanton Zürich, Switzerland",
      born: "July 2006",
      summary:
        "I completed the IMS programme at KSH Hottingen in July 2026 with a Federal Vocational Baccalaureate in Business. What's left is the twelve-month practical year that completes my IT vocational diploma (EFZ). I'm looking for that placement from summer 2027, ideally where IT meets business.",
    },
    highlights: [
      { value: "2026", label: "IMS completed" },
      { value: "BM", label: "Baccalaureate" },
      { value: "2027", label: "Internship year" },
      { value: "IT+", label: "Business focus" },
    ],
    about: [
      "I'm based in Kanton Zürich and completed the IMS Informatikmittelschule at KSH Hottingen in July 2026, earning the Federal Vocational Baccalaureate in Business (Berufsmaturität Wirtschaft) along the way.",
      "The school part is done; what remains is the twelve-month practical year that completes the IT vocational diploma (EFZ). I'm looking for that placement from summer 2027, and until then I'm working full-time rather than waiting around.",
      "My interests sit right at the intersection of information technology and business: requirements and business analysis, ERP environments such as ABACUS, IT in banking and insurance, project support, application support, data and reporting. I like understanding not just how a system works, but why it matters commercially.",
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
      { period: "Aug 2023 – July 2026", title: "IMS Informatikmittelschule", org: "KSH Hottingen · Completed", desc: "Completed the IMS model at KSH Hottingen, a combined school and vocational path pairing IT training with the Federal Vocational Baccalaureate in Business (Berufsmaturität Wirtschaft), which I earned in July 2026." },
      { period: "Aug 2026 – Summer 2027", title: "Working full-time", org: "Employment · Searching", desc: "Working full-time while searching for the right internship placement, preferably where IT meets business." },
      { period: "From summer 2027", title: "Practical year (12 months)", org: "IMS internship · EFZ", desc: "The twelve-month practical year of the IMS programme in a company, completing the IT vocational diploma (EFZ) and turning my IT and business foundation into hands-on experience." },
      { period: "Throughout", title: "Athlete & self-learner", org: "Gym · Finance · IT", desc: "Alongside it all, training regularly and learning independently, carrying the same discipline into every stage of the path." },
    ],
    projects: [
      { ...projectMeta.chfCompass, title: "CHF Compass", tag: "Fintech · Flagship", desc: "An investment analytics platform in Swiss francs, built and deployed end to end. Users build a portfolio from 11 real assets and backtest it on a decade of real market data, with Markowitz optimization, an efficient frontier, Monte Carlo simulations, historical crisis stress tests, VaR, and Swiss planning tools (pillar 3a, mortgage affordability, canton tax comparison). Zero invented numbers: a data pipeline converts Yahoo Finance prices to CHF and bundles them statically." },
      { ...projectMeta.mensa, title: "Mensa App", tag: "Full-stack · Team", desc: "A full-stack cafeteria app for the Bildungszentrum Zürichsee, built in a team. Students browse the daily menu, filter by diet (vegan, vegetarian, lactose-free), rate meals and save favourites. A Java backend serves a PostgreSQL database, with the frontend migrated from React to a modern Next.js / TypeScript app." },
      { ...projectMeta.creatine, title: "Creatine Info Page", tag: "Web · Team", desc: "An interactive, science-backed info site about creatine, built in a team and deployed live. It features a weight-based dosage calculator, an AI chat assistant for live questions, an animated FAQ and cited studies." },
      { ...projectMeta.enerlytics, title: "Enerlytics", tag: "Data · Team", desc: "A data-visualization tool, built in a team, that parses Swiss energy-metering data (the ESL and SDAT XML standards) with Python and turns it into clear, interactive charts through a Flask web app, with dedicated parsers per format and pandas-based processing." },
      { ...projectMeta.portfolio, title: "This Portfolio", tag: "Web · Next.js", desc: "The site you're on, a responsive, animated single-page portfolio built with Next.js, React and Framer Motion." },
    ],
    interests: ["Business Analysis & Requirements", "ERP & ABACUS", "Banking & Insurance IT", "Data & Reporting", "Finance & Investing", "Health & Sports"],
    aboutLead: "IMS graduate. Business Baccalaureate. Ready for the practical year.",
    // Certificates without a PDF yet — rendered as "awaiting upload" cards next to
    // the real documents in content/certificates. Drop the PDF in and remove the entry.
    pendingCertificates: [],
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
        contact: { eyebrow: "Contact", title: "Let's talk", sub: "Looking for the twelve-month IMS internship from summer 2027, at the intersection of IT and business. Reach out, I usually reply quickly." },
      },
      facts: { basedIn: "Based in", born: "Born", focus: "Focus", status: "Status", statusValue: "Seeking internship from summer 2027", focusValue: "IT · Business · Finance" },
      interestsLabel: "Interests",
      cert: { pdf: "PDF Document", document: "Document", image: "Image", awaiting: "Awaiting upload" },
      contactUi: { email: "Email", call: "Call", location: "Location", name: "Name", emailField: "Email", message: "Message", send: "Send message", sending: "Sending…", success: "Thanks! Your message has been sent.", error: "Something went wrong. Please email me directly.", sent: "Opening your mail app…", namePh: "Your name", emailPh: "you@example.com", messagePh: "Tell me a little about the opportunity…" },
      viewProject: "View details",
      backToProjects: "Back to projects",
      viewOnGithub: "View on GitHub",
      code: "Code",
      liveDemo: "Live demo",
      techStack: "Tech stack",
      bornPrefix: "Born",
    },
  },

  de: {
    profile: {
      ...neutral,
      role: "IMS-Absolvent · Berufsmaturität Wirtschaft",
      headline:
        "IMS-Absolvent · Berufsmaturität Wirtschaft · sucht Praktikum ab Sommer 2027",
      tagline: "IT · Business · Finanzen",
      location: "Kanton Zürich, Schweiz",
      born: "Juli 2006",
      summary:
        "Ich habe die IMS an der KSH Hottingen im Juli 2026 abgeschlossen und dabei die Berufsmaturität Wirtschaft erworben. Was noch fehlt, ist das zwölfmonatige Praktikumsjahr zum Informatik-EFZ. Diesen Platz suche ich ab Sommer 2027, am liebsten dort, wo IT und Wirtschaft zusammenkommen.",
    },
    highlights: [
      { value: "2026", label: "IMS abgeschlossen" },
      { value: "BM", label: "Berufsmaturität" },
      { value: "2027", label: "Praktikumsjahr" },
      { value: "IT+", label: "Wirtschaftsfokus" },
    ],
    about: [
      "Ich wohne im Kanton Zürich und habe die IMS Informatikmittelschule an der KSH Hottingen im Juli 2026 abgeschlossen, inklusive Berufsmaturität Wirtschaft.",
      "Der schulische Teil ist damit erledigt; es fehlt nur noch das zwölfmonatige Praktikumsjahr zum Informatik-EFZ. Diesen Platz suche ich ab Sommer 2027, bis dahin arbeite ich Vollzeit, statt zu warten.",
      "Meine Interessen liegen genau an der Schnittstelle von Informationstechnologie und Wirtschaft: Business- und Requirements-Analyse, ERP-Umfelder wie ABACUS, IT im Banken- und Versicherungsumfeld, Projektassistenz, Anwendungsbetreuung, Data & Reporting. Ich will nicht nur verstehen, wie ein System funktioniert, sondern auch, warum es wirtschaftlich relevant ist.",
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
      { period: "Aug 2023 – Juli 2026", title: "IMS Informatikmittelschule", org: "KSH Hottingen · Abgeschlossen", desc: "Abgeschlossenes IMS-Modell an der KSH Hottingen, ein kombinierter Schul- und Ausbildungsweg, der die Informatikausbildung mit der Berufsmaturität Wirtschaft verbindet, die ich im Juli 2026 erworben habe." },
      { period: "Aug 2026 – Sommer 2027", title: "Vollzeit-Erwerbstätigkeit", org: "Anstellung · Praktikumssuche", desc: "Vollzeit berufstätig und parallel auf der Suche nach dem passenden Praktikumsplatz, am liebsten dort, wo IT und Wirtschaft zusammenkommen." },
      { period: "Ab Sommer 2027", title: "Praktikumsjahr (12 Monate)", org: "IMS-Praktikum · EFZ", desc: "Das zwölfmonatige Praktikumsjahr des IMS-Programms in einem Unternehmen: Abschluss des Informatik-EFZ und der Schritt von der Ausbildung in die Praxis." },
      { period: "Durchgehend", title: "Sportler & Selbstlerner", org: "Gym · Finanzen · IT", desc: "Neben allem: regelmässiges Training und eigenständiges Lernen, mit derselben Disziplin in jeder Phase des Wegs." },
    ],
    projects: [
      { ...projectMeta.chfCompass, title: "CHF Compass", tag: "Fintech · Flaggschiff", desc: "Eine Investment-Analyse-Plattform in Schweizer Franken, von A bis Z entwickelt und deployt. Nutzer bauen ein Portfolio aus 11 echten Anlagen und testen es auf einem Jahrzehnt echter Marktdaten, mit Markowitz-Optimierung, Efficient Frontier, Monte-Carlo-Simulationen, historischen Krisen-Stresstests, VaR und Schweizer Planungstools (Säule 3a, Tragbarkeitsrechner, Kantonssteuervergleich). Keine erfundenen Zahlen: Eine Daten-Pipeline konvertiert Yahoo-Finance-Kurse in CHF und bündelt sie statisch." },
      { ...projectMeta.mensa, title: "Mensa-App", tag: "Full-Stack · Team", desc: "Eine Full-Stack-Mensa-App für das Bildungszentrum Zürichsee, im Team entwickelt. Schüler sehen das Tagesmenü, filtern nach Ernährung (vegan, vegetarisch, laktosefrei), bewerten Gerichte und speichern Favoriten. Ein Java-Backend bedient eine PostgreSQL-Datenbank; das Frontend wurde von React auf eine moderne Next.js-/TypeScript-App migriert." },
      { ...projectMeta.creatine, title: "Kreatin-Infoseite", tag: "Web · Team", desc: "Eine interaktive, wissenschaftlich fundierte Info-Seite über Kreatin, im Team entwickelt und live deployt. Mit gewichtsbasiertem Dosierungsrechner, KI-Chat-Assistent für Live-Fragen, animiertem FAQ und zitierten Studien." },
      { ...projectMeta.enerlytics, title: "Enerlytics", tag: "Daten · Team", desc: "Ein Datenvisualisierungs-Tool, im Team entwickelt, das Schweizer Energiemessdaten (die XML-Standards ESL und SDAT) mit Python einliest und über eine Flask-Web-App in klare, interaktive Diagramme umwandelt, mit eigenen Parsern pro Format und pandas-Datenverarbeitung." },
      { ...projectMeta.portfolio, title: "Dieses Portfolio", tag: "Web · Next.js", desc: "Die Seite, auf der du gerade bist. Ein responsives, animiertes One-Page-Portfolio, gebaut mit Next.js, React und Framer Motion." },
    ],
    interests: ["Business- & Requirements-Analyse", "ERP & ABACUS", "Banken- & Versicherungs-IT", "Data & Reporting", "Finanzen & Investieren", "Gesundheit & Sport"],
    aboutLead: "IMS-Absolvent. Berufsmaturität Wirtschaft. Bereit fürs Praktikumsjahr.",
    // Zertifikate ohne PDF — erscheinen als «Wartet auf Upload»-Karten neben den
    // echten Dokumenten. PDF in content/certificates ablegen und Eintrag entfernen.
    pendingCertificates: [],
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
        contact: { eyebrow: "Kontakt", title: "Sprechen wir", sub: "Ich suche das zwölfmonatige IMS-Praktikum ab Sommer 2027, an der Schnittstelle von IT und Wirtschaft. Melde dich, ich antworte meist schnell." },
      },
      facts: { basedIn: "Wohnort", born: "Geboren", focus: "Fokus", status: "Status", statusValue: "Sucht IMS-Praktikum ab Sommer 2027", focusValue: "IT · Business · Finanzen" },
      interestsLabel: "Interessen",
      cert: { pdf: "PDF-Dokument", document: "Dokument", image: "Bild", awaiting: "Wartet auf Upload" },
      contactUi: { email: "E-Mail", call: "Anrufen", location: "Standort", name: "Name", emailField: "E-Mail", message: "Nachricht", send: "Nachricht senden", sending: "Wird gesendet…", success: "Danke! Deine Nachricht wurde gesendet.", error: "Etwas ist schiefgelaufen. Bitte schreib mir direkt eine E-Mail.", sent: "Öffne deine Mail-App…", namePh: "Dein Name", emailPh: "du@beispiel.com", messagePh: "Erzähl mir kurz von der Gelegenheit…" },
      viewProject: "Details ansehen",
      backToProjects: "Zurück zu den Projekten",
      viewOnGithub: "Auf GitHub ansehen",
      code: "Code",
      liveDemo: "Live-Demo",
      techStack: "Tech-Stack",
      bornPrefix: "Geboren",
    },
  },
};

// Language-neutral profile for server-side metadata (English defaults).
export const profile = content.en.profile;
