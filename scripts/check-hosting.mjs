import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';

const origin = new URL(process.argv[2] ?? 'http://127.0.0.1:5000').origin;

async function fetchHtml(path, expectedStatus = 200) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, expectedStatus, `${path} status`);
  assert.equal(
    response.headers.get('cache-control'),
    'public, max-age=0, must-revalidate',
    `${path} cache-control`,
  );
  assert.equal(
    response.headers.get('x-content-type-options'),
    'nosniff',
    `${path} x-content-type-options`,
  );
  return response.text();
}

// Homepage checks
const homeHtml = await fetchHtml('/');
assert.ok(homeHtml.includes('https://omeshsidda.me/'), 'homepage canonical');
assert.ok(homeHtml.includes('A little about me'), 'homepage about section');
assert.ok(homeHtml.includes('ProfilePage'), 'homepage ProfilePage JSON-LD');
assert.ok(homeHtml.includes('/projects/gpcet-redesign'), 'homepage GPCET Redesign case study link');
assert.ok(homeHtml.includes('GPCET Redesign'), 'homepage GPCET Redesign title');
assert.ok(
  homeHtml.includes('https://www.linkedin.com/in/omesh-sidda-a51988343/'),
  'homepage LinkedIn link',
);
assert.ok(homeHtml.includes('https://x.com/omeshsidda'), 'homepage X link');
assert.ok(!/instagram/i.test(homeHtml), 'homepage must not contain Instagram');

// Canonical subpages
const subpages = [
  {
    path: '/about',
    canonical: 'https://omeshsidda.me/about',
    title: 'About Omesh Sidda (Omesh) — GPCET CSE, Linux &amp; AI Agents',
    heading: 'About Omesh',
    schemaTypes: ['ProfilePage', 'BreadcrumbList'],
  },
  {
    path: '/projects/mindgraph',
    canonical: 'https://omeshsidda.me/projects/mindgraph',
    title: 'MindGraph — 3-Level AI Mind Map Tool | Omesh Sidda',
    heading: 'MindGraph',
    schemaTypes: ['WebApplication', 'BreadcrumbList'],
  },
  {
    path: '/projects/pam-io',
    canonical: 'https://omeshsidda.me/projects/pam-io',
    title: 'pam.io — HTML5 Canvas Snake Arena Game | Omesh Sidda',
    heading: 'pam.io',
    schemaTypes: ['SoftwareApplication', 'BreadcrumbList'],
  },
  {
    path: '/projects/gpcet-redesign',
    canonical: 'https://omeshsidda.me/projects/gpcet-redesign',
    title: 'GPCET Redesign — Institutional Portal &amp; Pipeline | Omesh Sidda',
    heading: 'GPCET Redesign',
    schemaTypes: ['WebApplication', 'BreadcrumbList'],
  },
];

const seenTitles = new Set();
for (const page of subpages) {
  const html = await fetchHtml(page.path);
  assert.ok(
    html.includes(`<link rel="canonical" href="${page.canonical}">`),
    `${page.path} canonical`,
  );
  assert.ok(html.includes(`<title>${page.title}</title>`), `${page.path} title`);
  assert.ok(!seenTitles.has(page.title), `unique title for ${page.path}`);
  seenTitles.add(page.title);

  const rootMatch = html.match(/<div id="root">([\s\S]+?)<\/div>\s*(?:<script|<\/body)/i);
  assert.ok(rootMatch && rootMatch[1].trim().length > 0, `${page.path} non-empty #root`);
  assert.ok(rootMatch[1].includes('<main id="main"'), `${page.path} rendered main inside #root`);
  assert.ok(html.includes(page.heading), `${page.path} heading`);
  for (const schemaType of page.schemaTypes) {
    assert.ok(html.includes(schemaType), `${page.path} schema ${schemaType}`);
  }
  if (page.path.startsWith('/projects/')) {
    assert.ok(!html.includes('profile:first_name'), `${page.path} must not leak profile meta`);
  }
  assert.ok(!/instagram/i.test(html), `${page.path} must not contain Instagram`);
}

// Redirects
const redirectChecks = [
  { from: '/about/', expected: `${origin}/about` },
  { from: '/projects/mindgraph/', expected: `${origin}/projects/mindgraph` },
  { from: '/projects', expected: `${origin}/#projects` },
];
for (const check of redirectChecks) {
  const res = await fetch(`${origin}${check.from}`, { redirect: 'manual' });
  assert.equal(res.status, 301, `${check.from} redirect status`);
  assert.equal(
    new URL(res.headers.get('location'), origin).href,
    check.expected,
    `${check.from} redirect destination`,
  );
}

// Sitemap
const sitemapRes = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemapRes.status, 200, 'sitemap status');
const sitemapXml = await sitemapRes.text();
for (const loc of [
  'https://omeshsidda.me/',
  'https://omeshsidda.me/about',
  'https://omeshsidda.me/projects/mindgraph',
  'https://omeshsidda.me/projects/pam-io',
  'https://omeshsidda.me/projects/gpcet-redesign',
]) {
  assert.ok(sitemapXml.includes(`<loc>${loc}</loc>`), `sitemap includes ${loc}`);
}

// Project screenshots
for (const image of ['mindgraph.png', 'pam-io.png', 'gpcet-redesign.png']) {
  const imgRes = await fetch(`${origin}/projects/${image}`);
  assert.equal(imgRes.status, 200, `/projects/${image} status`);
}

// Hashed assets
const assets = await readdir(new URL('../dist/assets/', import.meta.url));
for (const asset of assets) {
  const response = await fetch(`${origin}/assets/${asset}`);
  assert.equal(response.status, 200, asset);
  assert.equal(response.headers.get('cache-control'), 'public, max-age=31536000, immutable', asset);
}

// 404 fallback
const missingRes = await fetch(`${origin}/missing-page`);
assert.equal(missingRes.status, 404, '404 status');
const missingHtml = await missingRes.text();
assert.ok(missingHtml.includes('noindex'), '404 includes noindex');

console.log('Hosting: all routes, canonicals, JSON-LD, redirects, sitemap, images, assets, and 404 passed.');
