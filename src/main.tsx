import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/newsreader/wght.css';
import '@fontsource-variable/newsreader/wght-italic.css';
import App from './App';
import './index.css';

const root = document.getElementById('root')!;
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
