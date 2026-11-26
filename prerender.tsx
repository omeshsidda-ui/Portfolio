import React from 'react';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToString } from 'react-dom/server';
import App from './src/App';
import { projects } from './src/data/projects';
import { renderRouteHead } from './src/seo';

const distDir = fileURLToPath(new URL('../dist', import.meta.url));
const templatePath = resolve(distDir, 'index.html');
const template = readFileSync(templatePath, 'utf8');

const shell = '<div id="root"></div>';
const seoStart = '<!-- seo:start -->';
const seoEnd = '<!-- seo:end -->';

if (!template.includes(shell)) {
  throw new Error('The portfolio HTML is missing its React root.');
}
const startIndex = template.indexOf(seoStart);
const endIndex = template.indexOf(seoEnd);
if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
  throw new Error('The portfolio HTML is missing <!-- seo:start --> / <!-- seo:end --> markers.');
}

const headBefore = template.slice(0, startIndex);
const headAfter = template.slice(endIndex + seoEnd.length);

interface RouteTarget {
  path: string;
  outFile: string;
}

const routes: RouteTarget[] = [
  { path: '/', outFile: 'index.html' },
  { path: '/about', outFile: 'about/index.html' },
  ...projects.map((project) => ({
    path: project.path,
    outFile: `${project.path.slice(1)}/index.html`,
  })),
  { path: '/404', outFile: '404.html' },
];

for (const route of routes) {
  const seoBlock = `${seoStart}\n${renderRouteHead(route.path)}\n  ${seoEnd}`;
  const withHead = `${headBefore}${seoBlock}${headAfter}`;
  const renderedApp = renderToString(<App initialPath={route.path} />);
  const html = withHead.replace(shell, () => `<div id="root">${renderedApp}</div>`);
  const destination = resolve(distDir, route.outFile);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, html, 'utf8');
}
