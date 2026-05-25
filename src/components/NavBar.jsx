import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const navItems = [
  {
    label: "Lodging",
    path: "/lodging",
    dropdown: [
      { label: "Hebron", path: "/lodging#hebron" },
      { label: "Bethel", path: "/lodging#bethel" },
      { label: "Dothan", path: "/lodging#dothan" },
      { label: "Guest House", path: "/lodging#guest-house" },
      { label: "Rustic Cottages", path: "/lodging#rustic-cottages" },
    ],
  },
  {
    label: "Events",
    path: "/events",
    dropdown: [
      { label: "Family Camp", path: "/events#family-camp" },
      { label: "Activities", path: "/events#activities" },
      { label: "Thanksgiving House Party", path: "/events#thanksgiving" },
      { label: "Custom Gatherings", path: "/events#custom-gatherings" },
      { label: "Personal Retreats", path: "/events#personal-retreats" },
    ],
  },
  {
    label: "Our Story",
    path: "/our-story",
    dropdown: [
      { label: "History", path: "/our-story#history" },
      { label: "Core Values", path: "/our-story#core-values" },
      { label: "Statement of Faith", path: "/our-story#statement-of-faith" },
      { label: "Our Team", path: "/our-story#our-team" },
    ],
  },
  {
    label: "Help Support",
    path: "/partner",
    dropdown: [
      { label: "Make a Gift", path: "/partner#giving-projects" },
      { label: "Serve With Us", path: "/partner#serve-with-us" },
      { label: "Pray", path: "/partner#pray-with-us" },
      { label: "Spread the Word", path: "/partner#spread-the-word" },
    ],
  },

  {
    label: "Donors",
    path: "/donors",
    dropdown: [
      { label: "Project Impact", path: "/donors#project-impact" },
      { label: "Donor Wall", path: "/donors#donor-wall" },
      { label: "Recognition Notes", path: "/donors#recognition-notes" },
    ],
  },
  {
    label: "Contact",
    path: "/contact",
    dropdown: [
      { label: "Contact Us", path: "/contact#contact-form" },
      { label: "Directions", path: "/contact#directions" },
    ],
  },
];

export default function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [bgOpacity, setBgOpacity] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setBgOpacity(1);
      return;
    }

    const handleScroll = () => {
      const opacity = Math.min(window.scrollY / 160, 1);
      setBgOpacity(opacity);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const isScrolled = bgOpacity > 0.15;

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace("#", "");

    const timeout = setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 80);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <header
      className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}
      style={{
        backgroundColor: `rgba(52, 56, 20, ${bgOpacity})`,
        backdropFilter: bgOpacity > 0.1 ? "blur(8px)" : "none",
      }}
    >
      <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
        <img src="/Primary-Logo.png" alt="Camp logo" />
      </Link>

      <button
        className="nav-toggle"
        onClick={() => setMenuOpen((current) => !current)}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={`nav-menu ${menuOpen ? "nav-menu--open" : ""}`}
        aria-label="Main navigation"
      >
        <ul className="nav-list">
          {navItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link--active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>

              {item.dropdown && item.dropdown.length > 0 && (
                <div className="dropdown">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.path}
                      to={dropdownItem.path}
                      onClick={() => setMenuOpen(false)}
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              )}

            </li>
          ))}
        </ul>
      </nav>

      <div className="nav-actions">
        <div className="social-links">
          <a
            href="https://www.instagram.com/"
            className="social-link"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/"
            className="social-link"
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.linkedin.com/"
            className="social-link"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>


        </div>

        <Link to="/give" className="give-link">
          GIVE
        </Link>
      </div>
    </header>
  );
}