import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/newsreader/wght.css';
import '@fontsource-variable/newsreader/wght-italic.css';
import HomePage from './HomePage';
import './index.css';

const root = document.getElementById('root')!;
if (root.hasChildNodes()) {
  hydrateRoot(root, <HomePage />);
} else {
  createRoot(root).render(<HomePage />);
}
