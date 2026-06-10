import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const visitLinks = [
  { label: "Lodging", href: "/lodging" },
  { label: "Events", href: "/events" },
  { label: "Our Story", href: "/our-story" },
  { label: "Partners", href: "/partners" },
];

const supportLinks = [
  { label: "Give", href: "/partner" },
  { label: "Volunteer", href: "/partner#serve-with-us" },
  { label: "Pray With Us", href: "/partner#pray-with-us" },
  { label: "Contact Us", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer-section">
      <div className="site-footer-brand">
        <Link to="/" className="site-footer-logo-link">
          <img
            src="/toah-nipi-logo-2.png"
            alt="Toah Nipi Christian Retreat Center"
            className="site-footer-logo-main"
          />
        </Link>

        {/* <p>
          A Christian retreat center in Rindge, NH
        </p> */}

        <div className="site-footer-actions">
          <Link to="/contact" className="site-footer-primary-link">
            Plan a Visit
          </Link>

          <Link to="/lodging" className="site-footer-secondary-link">
            View Lodging
          </Link>
        </div>
      </div>

      <div className="site-footer-content">
        <div className="site-footer-columns">
          <nav className="site-footer-column" aria-label="Visit links">
            <h2>Visit</h2>

            {visitLinks.map((link) => (
              <Link to={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="site-footer-column" aria-label="Support links">
            <h2>Support</h2>

            {supportLinks.map((link) => (
              <Link to={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="site-footer-column site-footer-contact">
            <h2>Contact</h2>

            <p>
              <strong>Physical Address</strong>
              <br />
              49 Fellowship Circle
              <br />
              Rindge, NH 03461
            </p>

            <p>
              <strong>Mailing Address</strong>
              <br />
              252 Old Ashburnham Road
              <br />
              Rindge, NH 03461
            </p>

            <a href="tel:16038995464">603-899-5464</a>
            <a href="mailto:contactus@toahnipi.org">
              contactus@toahnipi.org
            </a>
          </div>
        </div>

        <div className="site-footer-bottom">
          <img
            src="/Secondary-Logo.png"
            alt=""
            aria-hidden="true"
            className="site-footer-logo-secondary"
          />

          <p>
            © {new Date().getFullYear()} Toah Nipi Christian Retreat Center.
            <br/>All rights reserved.
          </p>

          <div className="site-footer-socials" aria-label="Social media links">
            <a
              href="https://www.facebook.com/ToahNipiRetreatCenter/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/toah_nipi/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/company/91656401/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}