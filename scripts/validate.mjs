import { chromium } from "playwright";
import { promises as fs } from "node:fs";

const OUT = "scratch-shots";
const URL = process.env.URL || "http://localhost:3111";

const run = async () => {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const errors = [];
  const results = {};

  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["mobile", 390, 844],
  ]) {
    const ctx = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(`[${name}] ${m.text()}`);
    });
    page.on("pageerror", (e) => errors.push(`[${name}] PAGEERROR ${e.message}`));

    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    // full page screenshot
    await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });

    // content checks
    const text = await page.textContent("body");
    results[name] = {
      hasName: text.includes("Oliver Piechocki"),
      hasSkills: text.includes("What I bring"),
      hasCerts: text.includes("Diplomas & certificates"),
      hasContact: text.includes("Let's talk"),
      emailLink: (await page.locator('a[href^="mailto:"]').count()) > 0,
      telLink: (await page.locator('a[href^="tel:"]').count()) > 0,
      formFields: await page.locator("form input, form textarea").count(),
    };

    // scroll to contact for a focused shot
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${name}-contact.png` });

    await ctx.close();
  }

  await browser.close();
  console.log(JSON.stringify({ results, errors }, null, 2));
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
