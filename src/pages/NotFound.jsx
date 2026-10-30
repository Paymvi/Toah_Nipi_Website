import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { notFoundPage } from "../seo/pages";

export default function NotFound() {
  return (
    <main className="page">
      <SEO route={notFoundPage} />

      <section className="placeholder-page">
        <p className="eyebrow">Page not found</p>

        <h1>We couldn’t find that page.</h1>

        <p>
          The page may have moved or no longer exists.{" "}
          <Link to="/">Return to the Toah Nipi home page</Link> or{" "}
          <Link to="/contact">contact us</Link> if you need help finding
          something.
        </p>
      </section>
    </main>
  );
}
