import { promises as fs } from "node:fs";
import path from "node:path";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Knowledge from "./Knowledge";
import Skills from "./Skills";
import Timeline from "./Timeline";
import Projects from "./Projects";
import Certificates from "./Certificates";
import Contact from "./Contact";
import Footer from "./Footer";

async function getManifest() {
  try {
    const file = path.join(process.cwd(), "public", "manifest.json");
    return JSON.parse(await fs.readFile(file, "utf-8"));
  } catch {
    return { certificates: [], photos: [] };
  }
}

export default async function HomePage() {
  const manifest = await getManifest();
  const portrait = manifest.photos?.[0]?.file || null;

  return (
    <main className="relative">
      <Nav />
      <div id="main-content" tabIndex={-1} className="outline-none" />
      <Hero portrait={portrait} />
      <About />
      <Knowledge />
      <Projects />
      <Certificates certificates={manifest.certificates || []} />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
