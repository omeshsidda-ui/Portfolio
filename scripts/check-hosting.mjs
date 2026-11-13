import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';

const origin = new URL(process.argv[2] ?? 'http://127.0.0.1:5000').origin;
const homepage = await fetch(origin);
assert.equal(homepage.status, 200);
assert.equal(homepage.headers.get('cache-control'), 'public, max-age=0, must-revalidate');
assert.equal(homepage.headers.get('x-content-type-options'), 'nosniff');
const html = await homepage.text();
assert.ok(html.includes('https://omeshsidda.me/'));
assert.ok(html.includes('A little about me'));
assert.ok(html.includes('ProfilePage'));

const assets = await readdir(new URL('../dist/assets/', import.meta.url));
for (const asset of assets) {
  const response = await fetch(`${origin}/assets/${asset}`);
  assert.equal(response.status, 200, asset);
  assert.equal(response.headers.get('cache-control'), 'public, max-age=31536000, immutable', asset);
}
const redirect = await fetch(`${origin}/about`, { redirect: 'manual' });
assert.equal(redirect.status, 301);
assert.equal(new URL(redirect.headers.get('location'), origin).href, `${origin}/#about`);
assert.equal((await fetch(`${origin}/missing-page`)).status, 404);
console.log('Hosting: prerendered HTML, cache policies, redirect, and 404 passed.');
