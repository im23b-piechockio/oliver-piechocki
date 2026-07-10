import { chromium, devices } from "playwright";

const URL = process.env.URL || "http://localhost:3950";
const iphone = devices["iPhone 13"];
const bugs = [];
const errors = [];

const browser = await chromium.launch();
const ctx = await browser.newContext({ ...iphone });
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error" && !m.text().includes("404")) errors.push("CONSOLE: " + m.text().slice(0, 140));
});

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2200); // let intro finish

const shot = (n) => page.screenshot({ path: `scratch-shots/m-${n}.png` });
await shot("01-hero");

// --- 1. Language toggle (mobile, in header) — target VISIBLE toggle ---
const deBtn = page.locator("header button:has-text('DE'):visible").first();
const enBtn = page.locator("header button:has-text('EN'):visible").first();
const navText = async () => (await page.textContent("header")) || "";

const beforeLang = await navText();
await deBtn.click();
await page.waitForTimeout(700);
const afterDe = await navText();
if (!afterDe.includes("Über mich")) bugs.push("Language: clicking DE did not switch nav to German");
await shot("02-de");

await enBtn.click();
await page.waitForTimeout(700);
const afterEn = await navText();
if (!afterEn.includes("About")) bugs.push("Language: clicking EN did not switch nav back to English");

// --- 2. Mobile hamburger menu ---
const burger = page.locator("header button[aria-label='Toggle menu']");
const burgerVisible = await burger.isVisible().catch(() => false);
if (!burgerVisible) bugs.push("Mobile menu: hamburger button not visible on mobile");
else {
  await burger.click();
  await page.waitForTimeout(500);
  await shot("03-menu-open");
  // menu links should be visible
  const menuLinks = await page.locator("header a[href*='#']").count();
  if (menuLinks === 0) bugs.push("Mobile menu: no links visible after opening");
  // click a menu link -> should navigate & close
  const projLink = page.locator("header a:has-text('Projekte'):visible, header a:has-text('Projects'):visible").last();
  if (await projLink.count()) {
    await projLink.click();
    await page.waitForTimeout(1200);
    const scrolled = await page.evaluate(() => window.scrollY > 300);
    if (!scrolled) bugs.push("Mobile menu: clicking a nav link did not scroll to the section");
    // menu should close after click
    const stillOpen = await page.locator("header a:has-text('Kontakt'), header a:has-text('Contact')").last().isVisible().catch(() => false);
    // (can't reliably assert closed; informational)
  }
}
await shot("04-after-nav");

// --- 3. Scroll through and screenshot sections ---
for (const id of ["about", "skills", "journey", "projects", "certificates", "contact"]) {
  const exists = await page.evaluate((i) => !!document.getElementById(i), id);
  if (!exists) { bugs.push(`Section #${id} missing from DOM`); continue; }
  await page.evaluate((i) => document.getElementById(i).scrollIntoView(), id);
  await page.waitForTimeout(600);
}
await shot("05-contact");

// --- 4. Horizontal overflow check (common mobile bug) ---
const overflow = await page.evaluate(() => ({
  scrollW: document.documentElement.scrollWidth,
  clientW: document.documentElement.clientWidth,
}));
if (overflow.scrollW > overflow.clientW + 2) {
  bugs.push(`Horizontal overflow: page is ${overflow.scrollW}px wide vs viewport ${overflow.clientW}px (causes sideways scroll)`);
}

// --- 5. Contact form fill ---
try {
  await page.evaluate(() => document.getElementById("contact").scrollIntoView());
  await page.waitForTimeout(400);
  const inputs = await page.locator("form input").all();
  if (inputs.length >= 2) {
    await inputs[0].fill("Mobile Test");
    await inputs[1].fill("test@example.com");
    await page.fill("form textarea", "Test");
  } else {
    bugs.push("Contact form: fewer than 2 inputs found");
  }
} catch (e) {
  bugs.push("Contact form: interaction failed — " + e.message);
}

// --- 6. Back-to-top button ---
const backTop = page.locator("button[aria-label='Back to top']");
const btVisible = await backTop.isVisible().catch(() => false);
if (!btVisible) bugs.push("Back-to-top button not visible after scrolling down on mobile");

await browser.close();
console.log(JSON.stringify({ bugs, errors, overflow }, null, 2));
