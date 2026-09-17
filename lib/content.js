// Single source of truth for all editable site content, bilingual (EN / DE).
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

// Per-project neutral metadata. Projects where Oliver did not write the code
// get role tags per language instead of a tech stack (see content below).
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
    image: "/projects/mensa.jpg",
  },
  enerlytics: {
    slug: "enerlytics",
    image: "/projects/enerlytics.jpg",
  },
  portfolio: {
    slug: "portfolio",
    stack: ["Next.js", "React", "Framer Motion"],
    image: "/projects/portfolio.jpg",
    link: "https://github.com/im23b-piechockio/oliver-piechocki",
  },
};

// Tech tags are language-neutral; group titles and language levels are translated below.
const techOwn = ["HTML", "CSS", "JavaScript", "React", "Next.js", "Git", "Vercel"];
const techSchool = ["SQL", "PostgreSQL", "Python", "Java", "TypeScript"];

export const content = {
  en: {
    profile: {
      ...neutral,
      role: "IMS Graduate · Business Baccalaureate",
      headline:
        "IMS graduate · Federal Vocational Baccalaureate in Business · seeking internship from summer 2027",
      tagline: "Development · Business",
      location: "Kanton Zürich, Switzerland",
      born: "July 2006",
      summary:
        "I completed the IMS at KSH Hottingen in July 2026 with a Federal Vocational Baccalaureate in Business. For the vocational diploma (EFZ) in application development, all that's left is the internship year, which I'm looking for from summer 2027. I build web applications and also understand what a business needs them for.",
    },
    highlights: [
      { value: "2027", label: "Internship" },
      { value: "C1", label: "English" },
      { value: "4", label: "Projects" },
      { value: "4", label: "Certificates" },
    ],
    aboutLead: "Web applications with an eye for the business side.",
    about: [
      "I'm interested not only in how an application works, but also in why it pays off for a company. That's why I deliberately built up the business side: with the Baccalaureate in Business, the ABACUS certificate in financial accounting and CHF Compass, a finance application I realised as my own project.",
      "In team projects I have also taken on the organisational side. In the Mensa project I was Product Owner first and Scrum Master later.",
      "Outside of IT I've been training four to five times a week since 2023. I bring that same consistency to my work.",
    ],
    knowledge: {
      groups: [
        { title: "Used in my own projects", icon: "chip", items: techOwn },
        { title: "From my training", icon: "spark", items: techSchool },
        { title: "Methods & business software", icon: "chart", items: ["Scrum", "IPERKA", "ABACUS Financial Accounting"] },
      ],
      languagesTitle: "Languages",
      languages: [
        { name: "German", level: "Native" },
        { name: "Polish", level: "Native" },
        { name: "English", level: "C1 · Cambridge C1 Advanced" },
        { name: "French", level: "A2+ · Basic knowledge" },
      ],
    },
    skills: [
      { title: "Understanding requirements", desc: "As Product Owner in the Mensa project I gathered the client's requirements, prioritised them and passed them on to the team.", icon: "puzzle" },
      { title: "Coordination", desc: "In the second half of the same project I kept the team's workflow on track as Scrum Master.", icon: "chart" },
      { title: "Helping people", desc: "At BAUHAUS I helped customers at the self-checkout tills: listen, narrow down the problem, solve it on the spot, even with a queue waiting.", icon: "people" },
      { title: "Seeing things through", desc: "I took CHF Compass from the first idea all the way to a live application.", icon: "flame" },
    ],
    timeline: [
      { period: "Aug 2023 – July 2026", title: "IMS Informatikmittelschule", org: "KSH Hottingen · Completed", desc: "IT training in application development with the Federal Vocational Baccalaureate in Business. Vocational school at Bildungszentrum Zürichsee, inter-company courses at ZLI." },
      { period: "Aug 2026 – Summer 2027", title: "Gap year", org: "Internship search", desc: "Application phase for the twelve-month internship year in application development." },
      { period: "From summer 2027", title: "Internship year (12 months)", org: "IMS internship · EFZ", desc: "Twelve months of application development at a company, concluding with the IPA and the vocational diploma (EFZ)." },
    ],
    projects: [
      { ...projectMeta.chfCompass, title: "CHF Compass", tag: "Fintech · Flagship", desc: "An investment analytics platform in Swiss francs, realised as my own project and live in operation. You put together a portfolio from 11 real assets and test it on ten years of market data, including Monte Carlo simulation and Value at Risk. A dedicated data pipeline converts all prices into Swiss francs." },
      { ...projectMeta.mensa, title: "Mensa App", tag: "Scrum · Team", stack: ["Scrum", "Product Owner", "Scrum Master", "Requirements"], desc: "A cafeteria app for Bildungszentrum Zürichsee, built as a team: daily menu, diet filters, ratings and favourites. In the first half of the project I was Product Owner, gathering the client's requirements, prioritising them and passing them on to the team. In the second half I coordinated the workflow as Scrum Master." },
      { ...projectMeta.enerlytics, title: "Enerlytics", tag: "Data · Team", stack: ["Documentation", "Data visualisation", "Team"], desc: "A tool that reads Swiss energy metering data from XML files and displays it as interactive charts in the browser, built as a team. My role was the project documentation." },
      { ...projectMeta.portfolio, title: "This Portfolio", tag: "Web · Next.js", desc: "The site you're on: a responsive, animated one-page portfolio in German and English, realised with Next.js, React and Framer Motion." },
    ],
    // Certificates without a PDF yet, rendered as "awaiting upload" cards next to
    // the real documents in content/certificates. Drop the PDF in and remove the entry.
    // Metadata per PDF in content/certificates, in display order. Files not listed
    // here still appear (after these) with a title derived from the filename.
    certificates: [
      { file: "Cambridge Certificate.pdf", title: "Cambridge C1 Advanced", issuer: "Cambridge English", date: "March 2026", level: "C1" },
      { file: "Zertifikat_Abacus.pdf", title: "User certificate in financial accounting", issuer: "ABACUS Research AG", date: "June 2025" },
      { file: "Sprachaufenthalt Global Village Hawaii.pdf", title: "Language stay, General English", issuer: "Global Village, Hawaii", date: "July 2025", level: "C1" },
      { file: "Sprachkurs alpha-b Nizza.pdf", title: "French intensive course", issuer: "alpha.b, Nice", date: "February 2025", level: "A2+" },
    ],
    pendingCertificates: [],
    ui: {
      skipToContent: "Skip to content",
      menu: "Menu",
      nav: { about: "About", knowledge: "Skills", skills: "Strengths", journey: "Journey", projects: "Projects", certificates: "Certificates", contact: "Contact" },
      getInTouch: "Get in touch",
      exploreProfile: "Explore profile",
      portraitPlaceholder: "Portrait placeholder",
      portraitHint: "Drop a photo in content/photos",
      sections: {
        about: { eyebrow: "About", title: "Who I am" },
        knowledge: { eyebrow: "Skills", title: "What I work with", sub: "The first group I've used in my own projects. The second I know from the modules of my training." },
        skills: { eyebrow: "Strengths", title: "What I bring", sub: "Four strengths, each with the place where I showed it." },
        journey: { eyebrow: "Journey", title: "Education & path" },
        projects: { eyebrow: "Work", title: "Projects", sub: "A selection of projects from my training and free time, each with my role." },
        certificates: { eyebrow: "Credentials", title: "Diplomas & certificates", subFilled: "Official documents. Click a card to open the PDF.", subEmpty: "Placeholders shown below. Drop PDFs into content/certificates and they appear here automatically on the next build." },
        contact: { eyebrow: "Contact", title: "Let's talk", sub: "I'm looking for the twelve-month IMS internship in application development from summer 2027. Feel free to write to me, I usually reply quickly." },
      },
      facts: { basedIn: "Based in", born: "Born", focus: "Focus", status: "Status", statusValue: "Seeking internship from summer 2027", focusValue: "Development · Business" },
      cert: { open: "Open PDF", awaiting: "Awaiting upload" },
      contactUi: { email: "Email", call: "Call", location: "Location", name: "Name", emailField: "Email", message: "Message", send: "Send message", sending: "Sending…", success: "Thank you! Your message has been sent.", errorTitle: "Your message could not be sent.", errorBody: "Please write to me directly at", copy: "Copy message", copied: "Copied", namePh: "Your name", emailPh: "name@company.com", messagePh: "What is it about?" },
      code: "Code",
      liveDemo: "Live demo",
      bornPrefix: "Born",
    },
  },

  de: {
    profile: {
      ...neutral,
      role: "IMS-Absolvent · Berufsmaturität Wirtschaft",
      headline:
        "IMS-Absolvent · Berufsmaturität Wirtschaft · sucht Praktikum ab Sommer 2027",
      tagline: "Entwicklung · Wirtschaft",
      location: "Kanton Zürich, Schweiz",
      born: "Juli 2006",
      summary:
        "Ich habe die IMS an der KSH Hottingen im Juli 2026 abgeschlossen, mit Berufsmaturität Wirtschaft. Für das EFZ in Applikationsentwicklung fehlt mir noch das Praktikumsjahr, das ich ab Sommer 2027 suche. Ich entwickle Webanwendungen und verstehe dabei auch, wofür ein Unternehmen sie braucht.",
    },
    highlights: [
      { value: "2027", label: "Praktikum" },
      { value: "C1", label: "Englisch" },
      { value: "4", label: "Projekte" },
      { value: "4", label: "Zertifikate" },
    ],
    aboutLead: "Webanwendungen mit Blick fürs Geschäft.",
    about: [
      "Mich interessiert nicht nur, wie eine Anwendung funktioniert, sondern auch, warum sie sich für ein Unternehmen rechnet. Deshalb habe ich mir die wirtschaftliche Seite gezielt aufgebaut: mit der Berufsmaturität Wirtschaft, dem ABACUS-Zertifikat in Finanzbuchhaltung und CHF Compass, einer Finanzanwendung, die ich als eigenes Projekt umgesetzt habe.",
      "In Teamprojekten habe ich auch die organisatorische Seite übernommen. Im Mensa-Projekt war ich zuerst Product Owner und später Scrum Master.",
      "Neben der IT trainiere ich seit 2023 vier- bis fünfmal pro Woche. Diese Beständigkeit nehme ich auch in die Arbeit mit.",
    ],
    knowledge: {
      groups: [
        { title: "In eigenen Projekten eingesetzt", icon: "chip", items: techOwn },
        { title: "Aus der Ausbildung", icon: "spark", items: techSchool },
        { title: "Methoden & Business-Software", icon: "chart", items: ["Scrum", "IPERKA", "ABACUS Finanzbuchhaltung"] },
      ],
      languagesTitle: "Sprachen",
      languages: [
        { name: "Deutsch", level: "Muttersprache" },
        { name: "Polnisch", level: "Muttersprache" },
        { name: "Englisch", level: "C1 · Cambridge C1 Advanced" },
        { name: "Französisch", level: "A2+ · Grundkenntnisse" },
      ],
    },
    skills: [
      { title: "Anforderungen verstehen", desc: "Als Product Owner im Mensa-Projekt habe ich die Anforderungen beim Auftraggeber abgeholt, priorisiert und ans Team weitergegeben.", icon: "puzzle" },
      { title: "Koordination", desc: "In der zweiten Hälfte desselben Projekts habe ich als Scrum Master den Ablauf im Team gesteuert.", icon: "chart" },
      { title: "Menschen helfen", desc: "Bei BAUHAUS habe ich Kundinnen und Kunden an den Selbstbedienungskassen geholfen: zuhören, das Problem eingrenzen, vor Ort lösen, auch wenn eine Schlange wartet.", icon: "people" },
      { title: "Dranbleiben", desc: "CHF Compass habe ich von der ersten Idee bis zur laufenden Anwendung durchgezogen.", icon: "flame" },
    ],
    timeline: [
      { period: "Aug 2023 – Juli 2026", title: "IMS Informatikmittelschule", org: "KSH Hottingen · Abgeschlossen", desc: "Informatikausbildung in Applikationsentwicklung mit Berufsmaturität Wirtschaft. Berufsfachschule am Bildungszentrum Zürichsee, überbetriebliche Kurse beim ZLI." },
      { period: "Aug 2026 – Sommer 2027", title: "Zwischenjahr", org: "Praktikumssuche", desc: "Bewerbungsphase für das zwölfmonatige Praktikumsjahr in der Applikationsentwicklung." },
      { period: "Ab Sommer 2027", title: "Praktikumsjahr (12 Monate)", org: "IMS-Praktikum · EFZ", desc: "Zwölf Monate Applikationsentwicklung in einem Unternehmen, mit der IPA als Abschluss des EFZ." },
    ],
    projects: [
      { ...projectMeta.chfCompass, title: "CHF Compass", tag: "Fintech · Flaggschiff", desc: "Eine Investment-Analyse-Plattform in Schweizer Franken, als eigenes Projekt umgesetzt und live in Betrieb. Man stellt ein Portfolio aus 11 echten Anlagen zusammen und testet es auf zehn Jahren Marktdaten, inklusive Monte-Carlo-Simulation und Value at Risk. Eine eigene Datenpipeline rechnet alle Kurse in Franken um." },
      { ...projectMeta.mensa, title: "Mensa-App", tag: "Scrum · Team", stack: ["Scrum", "Product Owner", "Scrum Master", "Anforderungen"], desc: "Eine Mensa-App für das Bildungszentrum Zürichsee, im Team umgesetzt: Tagesmenü, Filter nach Ernährungsform, Bewertungen und Favoriten. In der ersten Projekthälfte war ich Product Owner und habe die Anforderungen beim Auftraggeber abgeholt, priorisiert und ans Team weitergegeben. In der zweiten Hälfte habe ich als Scrum Master den Ablauf koordiniert." },
      { ...projectMeta.enerlytics, title: "Enerlytics", tag: "Daten · Team", stack: ["Dokumentation", "Datenvisualisierung", "Team"], desc: "Ein Tool, das Schweizer Energiemessdaten aus XML-Dateien einliest und im Browser als interaktive Diagramme darstellt, im Team umgesetzt. Meine Rolle war die Dokumentation des Projekts." },
      { ...projectMeta.portfolio, title: "Dieses Portfolio", tag: "Web · Next.js", desc: "Die Seite, auf der Sie gerade sind: ein responsives, animiertes One-Page-Portfolio in Deutsch und Englisch, umgesetzt mit Next.js, React und Framer Motion." },
    ],
    // Zertifikate ohne PDF erscheinen als «Wartet auf Upload»-Karten neben den
    // echten Dokumenten. PDF in content/certificates ablegen und Eintrag entfernen.
    certificates: [
      { file: "Cambridge Certificate.pdf", title: "Cambridge C1 Advanced", issuer: "Cambridge English", date: "März 2026", level: "C1" },
      { file: "Zertifikat_Abacus.pdf", title: "Anwenderzertifikat Finanzbuchhaltung", issuer: "ABACUS Research AG", date: "Juni 2025" },
      { file: "Sprachaufenthalt Global Village Hawaii.pdf", title: "Sprachaufenthalt General English", issuer: "Global Village, Hawaii", date: "Juli 2025", level: "C1" },
      { file: "Sprachkurs alpha-b Nizza.pdf", title: "Französisch Intensivkurs", issuer: "alpha.b, Nizza", date: "Februar 2025", level: "A2+" },
    ],
    pendingCertificates: [],
    ui: {
      skipToContent: "Zum Inhalt springen",
      menu: "Menü",
      nav: { about: "Über mich", knowledge: "Kenntnisse", skills: "Stärken", journey: "Werdegang", projects: "Projekte", certificates: "Zertifikate", contact: "Kontakt" },
      getInTouch: "Kontakt aufnehmen",
      exploreProfile: "Profil ansehen",
      portraitPlaceholder: "Portrait-Platzhalter",
      portraitHint: "Foto in content/photos ablegen",
      sections: {
        about: { eyebrow: "Über mich", title: "Wer ich bin" },
        knowledge: { eyebrow: "Kenntnisse", title: "Womit ich arbeite", sub: "Die erste Gruppe habe ich in eigenen Projekten eingesetzt. Die zweite kenne ich aus den Modulen der Ausbildung." },
        skills: { eyebrow: "Stärken", title: "Was ich mitbringe", sub: "Vier Stärken, jeweils mit dem Ort, an dem ich sie gezeigt habe." },
        journey: { eyebrow: "Werdegang", title: "Ausbildung & Weg" },
        projects: { eyebrow: "Arbeit", title: "Projekte", sub: "Eine Auswahl an Projekten aus Ausbildung und Freizeit, jeweils mit meiner Rolle." },
        certificates: { eyebrow: "Nachweise", title: "Diplome & Zertifikate", subFilled: "Offizielle Dokumente. Ein Klick auf eine Karte öffnet das PDF.", subEmpty: "Unten stehen Platzhalter. PDFs in content/certificates ablegen, dann erscheinen sie beim nächsten Build automatisch." },
        contact: { eyebrow: "Kontakt", title: "Sprechen wir", sub: "Ich suche das zwölfmonatige IMS-Praktikum in der Applikationsentwicklung ab Sommer 2027. Schreiben Sie mir gerne, ich antworte in der Regel schnell." },
      },
      facts: { basedIn: "Wohnort", born: "Geboren", focus: "Fokus", status: "Status", statusValue: "Sucht IMS-Praktikum ab Sommer 2027", focusValue: "Entwicklung · Wirtschaft" },
      cert: { open: "PDF öffnen", awaiting: "Wartet auf Upload" },
      contactUi: { email: "E-Mail", call: "Anrufen", location: "Standort", name: "Name", emailField: "E-Mail", message: "Nachricht", send: "Nachricht senden", sending: "Wird gesendet…", success: "Danke! Ihre Nachricht wurde gesendet.", errorTitle: "Die Nachricht konnte nicht gesendet werden.", errorBody: "Bitte schreiben Sie mir direkt an", copy: "Nachricht kopieren", copied: "Kopiert", namePh: "Ihr Name", emailPh: "name@firma.ch", messagePh: "Worum geht es?" },
      code: "Code",
      liveDemo: "Live-Demo",
      bornPrefix: "Geboren",
    },
  },
};

// Language-neutral profile for server-side metadata (English defaults).
export const profile = content.en.profile;
