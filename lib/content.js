// Single source of truth for all editable site content.
// Edit these values to update the portfolio.

export const profile = {
  name: "Oliver Piechocki",
  firstName: "Oliver",
  role: "IT Student",
  tagline: "IT · Business · Finance",
  location: "Kanton Zürich, Switzerland",
  born: "July 2006",
  email: "oliverpiechocki1633@gmail.com",
  phone: "+41 78 635 88 43",
  linkedin: "https://www.linkedin.com/in/oliver-piechocki-092286382/",
  summary:
    "IT student at KSH Hottingen with a strong drive for technology, business and economics. I combine solid problem-solving skills with fast adaptability and a genuine eagerness to keep learning, on the screen and in the gym.",
};

export const highlights = [
  { value: "2023", label: "IMS School" },
  { value: "KSH", label: "Hottingen" },
  { value: "3+", label: "Core strengths" },
  { value: "24/7", label: "Open to learn" },
];

export const about = [
  "I'm an IT student based in Kanton Zürich, currently attending the IMS School alongside my studies at KSH Hottingen.",
  "My interests sit right at the intersection of information technology, business and economics, I like understanding not just how a system works, but why it matters commercially.",
  "Outside of tech I'm an ambitious, regularly active athlete. Discipline from the gym is the same discipline I bring to learning new tools and solving hard problems.",
];

export const skills = [
  {
    title: "Problem Solving",
    desc: "Breaking complex problems into clear, workable steps and following through to a solution.",
    icon: "puzzle",
  },
  {
    title: "Adaptability",
    desc: "Comfortable with change and new environments, I pick up unfamiliar tools quickly.",
    icon: "shuffle",
  },
  {
    title: "Eager to Learn",
    desc: "Continuously curious. I actively seek out new knowledge in IT, finance and beyond.",
    icon: "spark",
  },
  {
    title: "IT & Technology",
    desc: "Hands-on interest in modern IT systems, software and how technology drives value.",
    icon: "chip",
  },
  {
    title: "Business & Economy",
    desc: "Passionate about business and economics, bridging the technical and commercial.",
    icon: "chart",
  },
  {
    title: "Discipline",
    desc: "A committed, regularly active athlete, focus and consistency carry into my work.",
    icon: "flame",
  },
  {
    title: "People & Clients",
    desc: "I genuinely enjoy working with people and clients. I listen carefully, communicate clearly and stay patient to understand what each person really needs.",
    icon: "people",
  },
];

export const timeline = [
  {
    period: "Now",
    title: "IMS Informatikmittelschule",
    org: "KSH Hottingen",
    desc: "Following the IMS model at KSH Hottingen, a combined school and apprenticeship path that pairs an IT vocational diploma (EFZ) with a Berufsmaturität in economics and business.",
  },
  {
    period: "Next",
    title: "One-year internship",
    org: "IT Practicum",
    desc: "The practical year of the IMS programme, applying my IT and business foundation in a real company and turning classroom knowledge into hands-on experience.",
  },
  {
    period: "Then",
    title: "Studying Economics (BWL)",
    org: "University · Planned",
    desc: "After the internship I plan to study business economics (BWL) and build a career at the intersection of technology, business and finance.",
  },
  {
    period: "Throughout",
    title: "Athlete & self-learner",
    org: "Gym · Finance · IT",
    desc: "Alongside it all, training regularly and learning independently, carrying the same discipline into every stage of the path.",
  },
];

// Projects. `link` is optional (adds a clickable arrow + makes the card a link).
export const projects = [
  {
    title: "Mensa App",
    tag: "Full-stack · School",
    desc: "A cafeteria (Mensa) app for the Bildungszentrum Zürichsee in Horgen, letting students browse and manage meal offerings. Built with a Java backend and a modern Next.js frontend.",
    stack: ["TypeScript", "Next.js", "Java", "CSS"],
    image: "/projects/mensa.jpg",
    link: "https://github.com/im23b-piechockio/I2b-Mensa-app",
  },
  {
    title: "Creatine Info Page",
    tag: "Web · Health",
    desc: "An interactive, science-backed information site about creatine, featuring a weight-based dosage calculator, an AI chat assistant and an animated FAQ.",
    stack: ["JavaScript", "HTML", "CSS", "AI Chatbot"],
    image: "/projects/creatine.jpg",
    link: "https://github.com/im23b-piechockio/PrWr_creatine",
  },
  {
    title: "Enerlytics",
    tag: "Data · Python",
    desc: "A data-visualization tool that parses energy data (ESL and SDAT formats) and turns it into clear, interactive graphs through a Flask web interface.",
    stack: ["Python", "Flask", "Pandas", "HTML"],
    image: "/projects/enerlytics.jpg",
    link: "https://github.com/im23b-piechockio/Enerlytics",
  },
  {
    title: "This Portfolio",
    tag: "Web · Next.js",
    desc: "The site you're on, a responsive, animated single-page portfolio built with Next.js, React and Framer Motion.",
    stack: ["Next.js", "React", "Framer Motion"],
    image: "/projects/portfolio.jpg",
    link: "",
  },
];

export const interests = [
  "Information Technology",
  "Business & Economy",
  "Finance & Investing",
  "Health & Sports",
  "Fitness & Athletics",
  "Continuous Learning",
];
