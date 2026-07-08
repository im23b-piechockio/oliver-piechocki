import { promises as fs } from "node:fs";
import path from "node:path";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Timeline from "../components/Timeline";
import Projects from "../components/Projects";
import Certificates from "../components/Certificates";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

async function getManifest() {
  try {
    const file = path.join(process.cwd(), "public", "manifest.json");
    return JSON.parse(await fs.readFile(file, "utf-8"));
  } catch {
    return { certificates: [], photos: [] };
  }
}

export default async function Home() {
  const manifest = await getManifest();
  const portrait = manifest.photos?.[0]?.file || null;

  return (
    <main className="relative">
      <Nav />
      <Hero portrait={portrait} />
      <About />
      <Skills />
      <Timeline />
      <Projects />
      <Certificates certificates={manifest.certificates || []} />
      <Contact />
      <Footer />
    </main>
  );
}
