import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="page empty-state">
      <h1>Page not found</h1>
      <p>The page you opened does not exist.</p>
      <Link className="button" to="/">
        Back to Home
      </Link>
    </main>
  );
}
