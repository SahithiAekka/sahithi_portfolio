const { test, expect } = require('@playwright/test');

const SITE_URL = 'http://localhost:8080';

// ── STRUCTURE ──

test('page loads without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  await page.goto(SITE_URL);
  expect(errors).toEqual([]);
});

test('all 6 sections exist', async ({ page }) => {
  await page.goto(SITE_URL);
  const sections = ['hero', 'about', 'certs', 'projects', 'experience', 'contact'];
  for (const id of sections) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test('page title is correct', async ({ page }) => {
  await page.goto(SITE_URL);
  await expect(page).toHaveTitle(/Sahithi Aekka/);
});

// ── NAVIGATION ──

test('nav has 5 links in correct order', async ({ page }) => {
  await page.goto(SITE_URL);
  const navLinks = page.locator('nav .nav-link');
  await expect(navLinks).toHaveCount(5);
  const expectedOrder = ['About', 'Certs', 'Projects', 'Experience', 'Contact'];
  for (let i = 0; i < expectedOrder.length; i++) {
    await expect(navLinks.nth(i)).toHaveText(expectedOrder[i]);
  }
});

test('nav anchor links point to correct sections', async ({ page }) => {
  await page.goto(SITE_URL);
  const expected = { '#about': 'About', '#certs': 'Certs', '#projects': 'Projects', '#experience': 'Experience', '#contact': 'Contact' };
  for (const [href, text] of Object.entries(expected)) {
    await expect(page.locator(`nav a.nav-link[href="${href}"]`)).toHaveText(text);
  }
});

// ── LINKS ──

test('resume links (3) point to resume.pdf', async ({ page }) => {
  await page.goto(SITE_URL);
  const resumeLinks = page.locator('a[href="resume.pdf"]');
  const count = await resumeLinks.count();
  expect(count).toBeGreaterThanOrEqual(3);
});

test('email links use mailto', async ({ page }) => {
  await page.goto(SITE_URL);
  const mailtoLinks = page.locator('a[href="mailto:sahithiaekka@gmail.com"]');
  const count = await mailtoLinks.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

test('no broken cloudflare email protection links', async ({ page }) => {
  await page.goto(SITE_URL);
  const cfLinks = page.locator('a[href*="cdn-cgi/l/email-protection"]');
  await expect(cfLinks).toHaveCount(0);
});

test('GitHub link exists', async ({ page }) => {
  await page.goto(SITE_URL);
  const ghLinks = page.locator('a[href*="github.com/SahithiAekka"]');
  const count = await ghLinks.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

test('LinkedIn link exists', async ({ page }) => {
  await page.goto(SITE_URL);
  const liLinks = page.locator('a[href*="linkedin.com/in/sahithiaekka"]');
  const count = await liLinks.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

test('CloudFront project link exists', async ({ page }) => {
  await page.goto(SITE_URL);
  const cfLinks = page.locator('a[href*="d14m79rqbppspq.cloudfront.net"]');
  const count = await cfLinks.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

// ── COLORS ──

test('body has dark background by default', async ({ page }) => {
  await page.goto(SITE_URL);
  const bg = await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bg).toBe('rgb(10, 10, 10)');
});

test('badge dot has emerald color', async ({ page }) => {
  await page.goto(SITE_URL);
  const dot = page.locator('.bdot');
  const bg = await dot.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bg).toBe('rgb(16, 185, 129)');
});

test('primary button has emerald background', async ({ page }) => {
  await page.goto(SITE_URL);
  const btn = page.locator('.btn-p').first();
  const bg = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bg).toBe('rgb(16, 185, 129)');
});

test('section numbers use emerald color', async ({ page }) => {
  await page.goto(SITE_URL);
  // Check the "01 /" label in the about section
  const label = page.locator('#about span').filter({ hasText: '01 /' });
  const color = await label.evaluate(el => getComputedStyle(el).color);
  expect(color).toBe('rgb(16, 185, 129)');
});

// ── THEME TOGGLE ──

test('theme toggle button exists', async ({ page }) => {
  await page.goto(SITE_URL);
  await expect(page.locator('#theme-toggle')).toBeVisible();
});

test('clicking toggle switches to light theme', async ({ page }) => {
  await page.goto(SITE_URL);
  // Default: no .light class
  const htmlBefore = await page.locator('html').getAttribute('class');
  expect(htmlBefore || '').not.toContain('light');

  // Click toggle
  await page.locator('#theme-toggle').click();
  const htmlAfter = await page.locator('html').getAttribute('class');
  expect(htmlAfter).toContain('light');
});

test('clicking toggle twice reverts to dark theme', async ({ page }) => {
  await page.goto(SITE_URL);
  await page.locator('#theme-toggle').click();
  await page.locator('#theme-toggle').click();
  const htmlClass = await page.locator('html').getAttribute('class');
  expect(htmlClass || '').not.toContain('light');
});

// ── RESPONSIVE ──

test('mobile layout: cert grid becomes single column at 768px', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(SITE_URL);
  const certGrid = page.locator('.cert-grid');
  const columns = await certGrid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
  // Single column means one value (not "repeat(3, ...)" or "Xpx Xpx Xpx")
  const columnCount = columns.split(/\s+/).filter(c => c !== '').length;
  expect(columnCount).toBe(1);
});

test('mobile layout: about grid becomes single column at 768px', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(SITE_URL);
  const aboutGrid = page.locator('.about-grid');
  const columns = await aboutGrid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
  const columnCount = columns.split(/\s+/).filter(c => c !== '').length;
  expect(columnCount).toBe(1);
});

// ── CONTENT ──

test('hero headline contains key text', async ({ page }) => {
  await page.goto(SITE_URL);
  const headline = page.locator('.display');
  await expect(headline).toContainText('Cloud');
});

test('stat cards exist with numbers', async ({ page }) => {
  await page.goto(SITE_URL);
  const stats = page.locator('.snum');
  const count = await stats.count();
  expect(count).toBeGreaterThanOrEqual(4);
});

test('3 certification cards exist', async ({ page }) => {
  await page.goto(SITE_URL);
  const certCards = page.locator('#certs a[href*="credly.com"]');
  await expect(certCards).toHaveCount(3);
});
