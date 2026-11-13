import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import HomePage from './HomePage';
import './index.css';

const root = document.getElementById('root')!;
if (root.hasChildNodes()) {
  hydrateRoot(root, <HomePage />);
} else {
  createRoot(root).render(<HomePage />);
}
