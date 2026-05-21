import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const navItems = [
  {
    label: "Lodging",
    path: "/lodging",
    dropdown: [
      { label: "Cabins", path: "/lodging/cabins" },
      { label: "Retreat Houses", path: "/lodging/retreat-houses" },
      { label: "Group Lodging", path: "/lodging/group-lodging" },
    ],
  },
  {
    label: "Events",
    path: "/events",
    dropdown: [
      { label: "Upcoming Events", path: "/events/upcoming" },
      { label: "Family Camp", path: "/events/family-camp" },
      { label: "Volunteer Weekends", path: "/events/volunteer-weekends" },
    ],
  },
  {
    label: "Partner",
    path: "/partner",
    dropdown: [
      { label: "Ways to Give", path: "/partner/ways-to-give" },
      { label: "Volunteer", path: "/partner/volunteer" },
      { label: "Pray With Us", path: "/partner/pray" },
    ],
  },
  {
    label: "Our Story",
    path: "/our-story",
    dropdown: [
      { label: "History", path: "/our-story/history" },
      { label: "Mission", path: "/our-story/mission" },
      { label: "Staff", path: "/our-story/staff" },
    ],
  },
  {
    label: "Blog",
    path: "/blog",
    dropdown: [
      { label: "Latest Posts", path: "/blog" },
      { label: "Newsletters", path: "/blog/newsletters" },
    ],
  },
  {
    label: "Contact",
    path: "/contact",
    dropdown: [
      { label: "Contact Us", path: "/contact" },
      { label: "Directions", path: "/contact/directions" },
    ],
  },
];
export default function NavBar() {
  const [bgOpacity, setBgOpacity] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.min(window.scrollY / 160, 1);
      setBgOpacity(opacity);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolled = bgOpacity > 0.15;

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