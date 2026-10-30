import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Accessibility() {
  return (
    <main className="policy-page">
      <SEO path="/accessibility" />

      <article className="policy-content">
        <header className="policy-header">
          <p className="policy-eyebrow">Toah Nipi Christian Retreat Center</p>
          <h1>Accessibility Statement</h1>
          <p className="policy-updated">Last updated: October 2026</p>
          <p>
            We want everyone to be able to learn about Toah Nipi and plan a
            visit, including people who use assistive technology such as screen
            readers, keyboard navigation, or screen magnification.
          </p>
        </header>

        <section>
          <h2>Our Goal</h2>
          <p>
            We use the Web Content Accessibility Guidelines (WCAG) 2.2, Level
            AA, as the benchmark for this website. We are working toward that
            standard, and some parts of the site may not fully meet it yet. We
            review and improve the site as we find issues.
          </p>
        </section>

        <section>
          <h2>Known Limitations</h2>
          <ul>
            <li>
              Some downloadable documents, such as PDF forms, and some images,
              such as our camp map, may not be fully accessible.
            </li>
            <li>
              Some services we link to, including event registration, online
              donations, and social media, are run by other organizations and
              are outside our direct control.
            </li>
          </ul>
        </section>

        <section>
          <h2>Need Help?</h2>
          <p>
            If you have trouble using any part of this website, or need
            information in a different format, please let us know. Tell us
            which page or document you were using and what went wrong. We will
            try to provide the information another reasonable way, such as by
            email, over the phone, or in print.
          </p>
          <address className="policy-contact">
            <a href="mailto:contactus@toahnipi.org">contactus@toahnipi.org</a>
            <br />
            <a href="tel:16038995464">603-899-5464</a>
            <br />
            252 Old Ashburnham Road, Rindge, NH 03461
          </address>
          <p>
            See also our <Link to="/privacy">Privacy Notice</Link>.
          </p>
        </section>
      </article>

    </main>
  );
}
