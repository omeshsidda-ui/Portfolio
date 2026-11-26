import Icon from '../components/Icon';
import { Link } from '../router';

export default function NotFoundPage() {
  return (
    <section className="page-hero not-found" aria-labelledby="not-found-title">
      <p className="online">
        <span />
        HTTP 404 · Route not found
      </p>
      <h1 id="not-found-title" className="page-title">
        Page not <em>found<span aria-hidden="true">.</span></em>
      </h1>
      <p className="page-lead">
        This workbench URL does not exist or has moved. You can head back to the portfolio homepage, read more about Omesh Sidda, or jump straight to the project case studies.
      </p>
      <div className="page-actions">
        <Link className="button primary" href="/">
          Return home
        </Link>
        <Link className="button-link" href="/about">
          About Omesh <Icon name="diagonal" />
        </Link>
        <Link className="button-link" href="/#projects">
          View projects <Icon name="diagonal" />
        </Link>
      </div>
    </section>
  );
}
