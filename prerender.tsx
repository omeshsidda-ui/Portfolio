import React from 'react';
import { readFileSync, writeFileSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import HomePage from './src/HomePage';

const path = new URL('../dist/index.html', import.meta.url);
const html = readFileSync(path, 'utf8');
const shell = '<div id="root"></div>';

if (!html.includes(shell)) {
  throw new Error('The portfolio HTML is missing its React root.');
}

writeFileSync(path, html.replace(shell, () => `<div id="root">${renderToString(<HomePage />)}</div>`));
