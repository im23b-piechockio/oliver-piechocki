import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:3222", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// Agentation injects a floating toolbar; detect any of its likely hooks.
const found = await page.evaluate(() => {
  const hit = document.querySelector(
    '[class*="agentation" i], [id*="agentation" i], [data-agentation]'
  );
  const shadowHosts = [...document.querySelectorAll("*")].filter(
    (el) => el.shadowRoot
  ).length;
  return { hit: !!hit, shadowHosts, bodyChildren: document.body.children.length };
});

await page.screenshot({ path: "scratch-shots/dev-agentation.png" });
await browser.close();
console.log(JSON.stringify({ found, errors }, null, 2));
