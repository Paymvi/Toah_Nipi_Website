import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const navItems = [
  { label: "Lodging", path: "/lodging" },
  { label: "Events", path: "/events" },
  { label: "Partner", path: "/partner" },
  { label: "Our Story", path: "/our-story" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
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

              <div className="dropdown">
                <Link to={`${item.path}/1`} onClick={() => setMenuOpen(false)}>
                  1
                </Link>
                <Link to={`${item.path}/2`} onClick={() => setMenuOpen(false)}>
                  2
                </Link>
                <Link to={`${item.path}/3`} onClick={() => setMenuOpen(false)}>
                  3
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav-actions">
        <a href="#" className="social-link" aria-label="Instagram">
          ◎
        </a>
        <a href="#" className="social-link" aria-label="Facebook">
          f
        </a>
        <a href="#" className="social-link" aria-label="LinkedIn">
          in
        </a>

        <Link to="/give" className="give-link">
          GIVE
        </Link>
      </div>
    </header>
  );
}