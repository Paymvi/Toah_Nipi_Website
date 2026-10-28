import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const giveUrl = "https://secure.qgiv.com/for/toahnipichristianretreatcenter/";

// Matches the breakpoint in NavBar.css where the menu collapses.
const mobileMenuQuery = "(max-width: 1180px)";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/toah_nipi/", Icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/ToahNipiRetreatCenter/", Icon: FaFacebookF },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/91656401/", Icon: FaLinkedinIn },
];

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
    label: "Support",
    path: "/support",
    dropdown: [
      { label: "Make a Gift", path: "/support#giving-projects" },
      { label: "Projects Made Possible", path: "/support#project-impact" },
      { label: "Serve With Us", path: "/support#serve-with-us" },
      { label: "Pray", path: "/support#pray-with-us" },
      { label: "Spread the Word", path: "/support#spread-the-word" },
      { label: "Community Directory", path: "/support#relationship-directory" },
    ],
  },

  // {
  //   label: "Donors",
  //   path: "/donors",
  //   dropdown: [
  //     { label: "Project Impact", path: "/donors#project-impact" },
  //     { label: "Donor Wall", path: "/donors#donor-wall" },
  //     { label: "Recognition Notes", path: "/donors#recognition-notes" },
  //   ],
  // },

  {
    label: "Gallery",
    path: "/gallery",
  },

  {
    label: "New!",
    path: "/new",
    highlight: true,
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
  // Which section's sub-links are expanded in the mobile menu
  const [openSection, setOpenSection] = useState(null);
  const [menuLocationKey, setMenuLocationKey] = useState(location.key);
  const toggleRef = useRef(null);

  // Close the menu on any navigation, including the browser back button
  if (menuLocationKey !== location.key) {
    setMenuLocationKey(location.key);
    setMenuOpen(false);
    setOpenSection(null);
  }

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenSection(null);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const mobileMenu = window.matchMedia(mobileMenuQuery);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setOpenSection(null);
        toggleRef.current?.focus();
      }
    };

    // Resizing up to the desktop layout leaves no visible toggle to close it
    const handleBreakpointChange = (event) => {
      if (!event.matches) {
        setMenuOpen(false);
        setOpenSection(null);
      }
    };

    // Keep the page behind the open menu from scrolling
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);
    mobileMenu.addEventListener("change", handleBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      mobileMenu.removeEventListener("change", handleBreakpointChange);
    };
  }, [menuOpen]);

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

  // The open menu sits under the header, so the header goes solid with it
  const headerOpacity = menuOpen ? 1 : bgOpacity;
  const isScrolled = headerOpacity > 0.15;

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
        backgroundColor: `rgba(52, 56, 20, ${headerOpacity})`,
        backdropFilter: headerOpacity > 0.1 ? "blur(8px)" : "none",
      }}
    >
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <img src="/optimized/Secondary-Logo-3-256.png" alt="Toah Nipi logo" />
      </Link>

      <button
        ref={toggleRef}
        className={`nav-toggle ${menuOpen ? "nav-toggle--open" : ""}`}
        type="button"
        onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
        aria-label="Main menu"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="main-navigation"
        className={`nav-menu ${menuOpen ? "nav-menu--open" : ""}`}
        aria-label="Main navigation"
      >
        <ul className="nav-list">
          {navItems.map((item) => {
            const hasDropdown = item.dropdown && item.dropdown.length > 0;
            const sectionOpen = openSection === item.path;
            const dropdownId = `nav-dropdown-${item.path.slice(1)}`;

            return (
              <li
                className={`nav-item ${sectionOpen ? "nav-item--expanded" : ""}`}
                key={item.path}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link--active" : ""} ${
                      item.highlight ? "nav-link--new" : ""
                    }`
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>

                {hasDropdown && (
                  <>
                    {/* Mobile only: desktop opens dropdowns on hover/focus */}
                    <button
                      type="button"
                      className="nav-subtoggle"
                      aria-expanded={sectionOpen}
                      aria-controls={dropdownId}
                      aria-label={`${item.label} sections`}
                      onClick={() =>
                        setOpenSection(sectionOpen ? null : item.path)
                      }
                    >
                      <FiChevronDown aria-hidden="true" />
                    </button>

                    <div className="dropdown" id={dropdownId}>
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.path}
                          to={dropdownItem.path}
                          onClick={closeMenu}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile only: the header actions are hidden once the menu collapses */}
        <div className="nav-menu-actions">
          <a href={giveUrl} className="nav-menu-give">
            Give
          </a>

          <div className="nav-menu-socials">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="nav-actions">
        <div className="social-links">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              className="social-link"
              aria-label={label}
              target="_blank"
              rel="noreferrer"
            >
              <Icon />
            </a>
          ))}
        </div>

        <a href={giveUrl} className="give-link">
          GIVE
        </a>
      </div>
    </header>
  );
}
