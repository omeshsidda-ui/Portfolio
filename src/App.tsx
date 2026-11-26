import HomePage from './HomePage';
import Footer from './components/Footer';
import Header from './components/Header';
import { getProjectByPath } from './data/projects';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectPage from './pages/ProjectPage';
import { RouterProvider, useRouter } from './router';

function RouteContent() {
  const { path } = useRouter();

  if (path === '/') {
    return <HomePage />;
  }
  if (path === '/about') {
    return <AboutPage />;
  }
  const project = getProjectByPath(path);
  if (project) {
    return <ProjectPage project={project} />;
  }
  return <NotFoundPage />;
}

export default function App({ initialPath }: { initialPath?: string }) {
  return (
    <RouterProvider initialPath={initialPath}>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header />
      <main id="main" className="shell" tabIndex={-1}>
        <RouteContent />
      </main>
      <Footer />
    </RouterProvider>
  );
}
