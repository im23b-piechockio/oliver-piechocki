import { chromium, devices } from "playwright";

const URL = process.env.URL || "http://localhost:4000";
const browser = await chromium.launch();

// Small (iPhone SE 375) and modern (iPhone 13 390)
const device = process.env.DEV === "se" ? { viewport: { width: 375, height: 667 }, userAgent: devices["iPhone SE"]?.userAgent, hasTouch: true, isMobile: true } : devices["iPhone 13"];
const ctx = await browser.newContext({ ...device });
const page = await ctx.newPage();
const issues = [];
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

// Tap target sizes for interactive elements
const smallTargets = await page.evaluate(() => {
  const els = [...document.querySelectorAll("a, button")];
  const bad = [];
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") continue;
    if (r.height < 40 || r.width < 40) {
      bad.push({ text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 25), w: Math.round(r.width), h: Math.round(r.height) });
    }
  }
  return bad.slice(0, 20);
});

// Input font sizes (iOS zooms if < 16px)
const inputSizes = await page.evaluate(() =>
  [...document.querySelectorAll("input, textarea")].map((el) => ({
    ph: el.placeholder?.slice(0, 15),
    fontSize: getComputedStyle(el).fontSize,
  }))
);

// theme-color meta
const themeColor = await page.evaluate(() => document.querySelector('meta[name="theme-color"]')?.content || null);

// Section vertical padding (top) to gauge spacing
const sectionPadding = await page.evaluate(() =>
  [...document.querySelectorAll("main section")].slice(1, 3).map((s) => ({ id: s.id, padTop: getComputedStyle(s).paddingTop }))
);

// Full-page screenshot
await page.screenshot({ path: `scratch-shots/audit-full-${process.env.DEV || "13"}.png`, fullPage: true });

// Per-section screenshots
for (const id of ["top", "about", "projects", "certificates", "skills", "journey", "contact"]) {
  await page.evaluate((i) => { const el = document.getElementById(i); el && el.scrollIntoView(); }, id);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `scratch-shots/audit-${id}.png` });
}

console.log(JSON.stringify({ smallTargets, inputSizes, themeColor, sectionPadding }, null, 2));
await browser.close();
