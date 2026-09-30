import { useState } from "react";

import EventCarousel3 from "../components/EventCarousel3";
import SiteFooter from "../components/SiteFooter";
import SEO from "../components/SEO";

import {
  FiGift,
  FiTool,
  FiHeart,
  FiShare2,
} from "react-icons/fi";

import {
  relationships,
  relationshipCategories,
  getRelationshipInitials,
} from "../data/relationships";


const giveUrl =
  "https://cwngui.campwise.com/Apps/OnlineGuestDonations/Index.html?AppID=MKQ4U6RZOHHSNINZSCJV3VSRQQ3QHB&LocCde=CA0000";


const partnerWays = [
  {
    id: "ways-to-give",
    number: "01",
    title: "Make a Gift",
    kicker: "Give Financially",
    text: "Support projects, scholarships, facilities, and the ministry work happening at Toah Nipi.",
    linkText: "Explore giving",
    href: "#giving-projects",
    icon: FiGift,
    tone: "gift",
  },
  {
    id: "volunteer",
    number: "02",
    title: "Serve With Us",
    kicker: "Hands-On Help",
    text: "Use your time, skills, and energy to care for the grounds and bless guests throughout the year.",
    linkText: "Volunteer",
    href: "#serve-with-us",
    icon: FiTool,
    tone: "serve",
  },
  {
    id: "pray",
    number: "03",
    title: "Pray",
    kicker: "Spiritual Support",
    text: "Pray with us for revival, guests, staff, churches, families, and the work God is doing here.",
    linkText: "Pray with us",
    href: "#pray-with-us",
    icon: FiHeart,
    tone: "pray",
  },
  {
    id: "spread-word",
    number: "04",
    title: "Spread the Word",
    kicker: "Share the Mission",
    text: "Invite churches, families, students, and friends to experience Toah Nipi for themselves.",
    linkText: "Share Toah Nipi",
    href: "#spread-the-word",
    icon: FiShare2,
    tone: "share",
  },
];


const featureSections = [
  {
    id: "serve-with-us",
    eyebrow: "Serve",
    title: "Volunteer with us.",
    text: (
      <>
        <span className="bold-text">Volunteers play a vital role</span> in our
        ministry, and we are grateful. We have openings{" "}
        <span className="bold-text">year-round</span> for people willing to
        volunteer their time and talents!
        <br />
        <span className="bold-text">Room and board are provided.</span>
      </>
    ),
    secondText: (
      <>
        Check out our <span className="bold-text">volunteer needs</span> below
        or <span className="bold-text">share your unique skills</span> with us!
      </>
    ),
    needs: [
      "Trail Work",
      "Wood Splitting",
      "Building Beautification",
      "Landscaping / Gardening",
      "Hosting",
    ],
    image: "/May-2024-Volunteer.jpg",
    imageAlt: "Volunteers serving at Toah Nipi",
    imagePosition: "40% center",
    imageZoom: 1.08,
    linkText: "Contact Us",
    href: "/contact",
  },
  {
    id: "pray-with-us",
    eyebrow: "Pray",
    title: "Pray with us.",
    text: (
      <>
        Join us in seeking{" "}
        <span className="bold-text">revival for New England</span> through
        prayer. Pray for{" "}
        <span className="bold-text">the gospel to be proclaimed</span> and for
        Toah Nipi to continue to play a vital role in advancing God&apos;s kingdom
        on earth.
        <br />
        <br />
        As you pray for those who do not follow Jesus and for Toah Nipi, we
        invite you to{" "}
        <span className="bold-text">share your prayer requests</span> with us so
        we may have the privilege to pray for you as well.
      </>
    ),
    image: "/May-2025-PrayerGarden.jpg",
    imageAlt: "Prayer garden at Toah Nipi",
    imagePosition: "40% center",
    imageZoom: 1.08,
    linkText: "Request Prayer",
    href: "mailto:contactus@toahnipi.org?subject=Prayer Request",
  },
  {
    id: "spread-the-word",
    eyebrow: "Advocacy",
    title: "Spread the word about Toah Nipi.",
    text: (
      <>
        One of the simplest ways to partner with us is to{" "}
        <span className="bold-text">tell others</span>. Invite{" "}
        <span className="bold-text">
          churches, families, students, and friends
        </span>{" "}
        to experience Toah Nipi as a place to gather, rest, and reconnect with
        God.
      </>
    ),
    image: "/Oct-2024-Fire.jpg",
    imageAlt: "People gathered around a fire at Toah Nipi",
    imagePosition: "10% center",
    imageZoom: 1.23,
    linkText: "Contact Us",
    href: "/contact",
  },
];


const projectImpacts = [
  {
    id: "christmas-walk",
    title: "Christmas Light Walk",
    category: "Future Experience",
    status: "In Development",
    image: "/Hebron-Night-Lights.png",
    description:
      "A fully lighted Christmas walk experience designed to become a meaningful local tradition, sharing the story of Jesus’ birth through outdoor scenes, lights, and Scripture.",
  },
  {
    id: "woodland-trail",
    title: "Woodland Trail Around the Pond",
    category: "Land Stewardship",
    status: "In Progress",
    image: "/May-2025-Lake+Nature-2.jpg",
    description:
      "Improvements to the woodland trails around the pond will create peaceful, accessible pathways for prayer, reflection, walking, and time outdoors.",
  },
  {
    id: "outdoor-amphitheatre",
    title: "Outdoor Amphitheatre",
    category: "Gathering Space",
    status: "Planned",
    image: "/Outdoor-Theatre.png",
    description:
      "A new outdoor amphitheatre near the pond will provide a flexible space for worship, teaching, camp gatherings, concerts, and group events.",
  },
  {
    id: "trex-swings",
    title: "Trex Swings",
    category: "Outdoor Seating",
    status: "Planned",
    image: "/Trex-Swings.jpg",
    description:
      "New Trex swings will create a peaceful place for guests to sit, rest, and enjoy the beauty of Toah Nipi’s outdoor spaces. These durable swings will offer a welcoming spot for conversation, reflection, and quiet moments near camp.",
  },
];


const relationshipOrganizations = [...relationships].sort((a, b) => {
  if (b.rank !== a.rank) {
    return b.rank - a.rank;
  }

  return a.name.localeCompare(b.name);
});


const relationshipCategoryLabels =
  relationshipCategories.reduce((labels, category) => {
    if (category.id !== "all") {
      labels[category.id] = category.label;
    }

    return labels;
  }, {});


function ProjectBookPage({ project, index }) {
  const nextIndex = (index + 1) % projectImpacts.length;
  const nextProject = projectImpacts[nextIndex];

  return (
    <div className="partner-project-page-content">
      <div className="partner-project-page-body">
        <p className="partner-project-category">
          {project.category}
        </p>

        <h3>{project.title}</h3>

        <p>{project.description}</p>
      </div>

      <div className="partner-project-page-footer">
        <span className="partner-project-page-number">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(projectImpacts.length).padStart(2, "0")}
        </span>

        <span className="partner-project-next-label">
          Next: {nextProject.title}
          <strong aria-hidden="true">›</strong>
        </span>
      </div>
    </div>
  );
}


function Partner() {
  const [activeProject, setActiveProject] = useState(0);
  const [turningTo, setTurningTo] = useState(null);

  const [directoryRelationshipCategory, setDirectoryRelationshipCategory] =
    useState("all");

  const [relationshipSearch, setRelationshipSearch] = useState("");


  const selectedProject = projectImpacts[activeProject];

  const nextProjectIndex =
    (activeProject + 1) % projectImpacts.length;

  const isPageTurning = turningTo !== null;

  const revealedProjectIndex =
    turningTo ?? nextProjectIndex;

  const revealedProject =
    projectImpacts[revealedProjectIndex];


  const normalizedRelationshipSearch =
    relationshipSearch.trim().toLowerCase();

  const directoryVisibleRelationships =
    relationshipOrganizations.filter((organization) => {
      const matchesCategory =
        directoryRelationshipCategory === "all" ||
        organization.category === directoryRelationshipCategory;

      const matchesSearch =
        normalizedRelationshipSearch === "" ||
        organization.name
          .toLowerCase()
          .includes(normalizedRelationshipSearch);

      return matchesCategory && matchesSearch;
    });


  const handleCardClick = (event, href) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();

    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.pushState(null, "", href);
    }
  };


  const startPageTurn = (targetIndex) => {
    if (isPageTurning) return;
    if (targetIndex === activeProject) return;

    setTurningTo(targetIndex);
  };


  const turnToNextPage = () => {
    startPageTurn(nextProjectIndex);
  };


  const finishPageTurn = (event) => {
    if (event.target !== event.currentTarget) return;
    if (turningTo === null) return;

    setActiveProject(turningTo);
    setTurningTo(null);
  };


  return (
    <main className="partner-page">

      <SEO
        title="Partner With Toah Nipi"
        description="Partner with Toah Nipi through giving, volunteering, prayer, sharing the mission, and connecting with the churches, ministries, schools, organizations, and friends who make up the Toah Nipi community."
        path="/partner"
      />


      <section className="partner-hero">
        <div className="partner-hero-overlay" />

        <div className="partner-hero-content reveal-group">
          <p className="partner-eyebrow partner-eyebrow-light">
            Partner With Us
          </p>

          <h1>
            Help shape the future of{" "}
            <span>Toah Nipi.</span>
          </h1>

          <p className="partner-hero-text">
            Give, serve, pray, share the mission, or simply stay connected.
            Toah Nipi is strengthened by people and organizations who believe
            in creating a place for rest, renewal, community, and Christ-centered
            ministry.
          </p>

          <div className="partner-hero-actions">
            <a
              href={giveUrl}
              target="_blank"
              rel="noreferrer"
              className="partner-btn"
            >
              Make a Gift
            </a>

            <a
              href="#partner-ways"
              className="partner-btn partner-btn-secondary"
            >
              Explore Ways to Partner
            </a>
          </div>
        </div>
      </section>


      <section className="partner-ways-section" id="partner-ways">
        <div className="partner-section-heading reveal-group">
          <div>
            <p className="partner-eyebrow">
              Join the Mission
            </p>

            <h2>
              There is more than one way to be part of what happens here.
            </h2>
          </div>

          <p>
            Financial generosity matters, but partnership at Toah Nipi is also
            expressed through service, prayer, relationships, and simply helping
            more people discover this place.
          </p>
        </div>

        <div className="partner-ways-grid reveal-group">
          {partnerWays.map((way) => {
            const Icon = way.icon;

            return (
              <a
                className={`partner-way-card partner-way-card-${way.tone}`}
                id={way.id}
                key={way.title}
                href={way.href}
                onClick={(event) => handleCardClick(event, way.href)}
              >
                <div className="partner-way-logo-panel" aria-hidden="true">
                  <span className="partner-way-number">
                    {way.number}
                  </span>

                  <Icon className="partner-way-icon" />
                </div>

                <div className="partner-way-content">
                  <p className="partner-way-kicker">
                    {way.kicker}
                  </p>

                  <h3>{way.title}</h3>

                  <p>{way.text}</p>

                  <div className="partner-card-link">
                    {way.linkText}
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>


      <section className="partner-impact-band reveal-group">
        <div>
          <p className="partner-eyebrow partner-eyebrow-light">
            Why It Matters
          </p>

          <h2>
            Generosity creates room for ministry.
          </h2>
        </div>

        <p>
          From scholarships and facility improvements to volunteer projects,
          prayer support, and future vision, every act of partnership helps
          Toah Nipi continue serving students, families, churches, ministries,
          and retreat groups for years to come.
        </p>
      </section>


      <section
        id="giving-projects"
        className="partner-giving-projects"
      >
        <EventCarousel3 />
      </section>


      <section
        className="partner-project-section reveal-group"
        id="project-impact"
      >
        <div className="partner-project-header">
          <div>
            <p className="partner-eyebrow">
              Projects Made Possible
            </p>

            <h2>
              See what partnership is helping build.
            </h2>
          </div>

          <p>
            Giving is not only a transaction. It becomes trails, gathering
            spaces, places to rest, and experiences future guests will carry
            with them long after they leave.
          </p>
        </div>

        <div className="partner-project-layout">
          <div className="partner-project-tabs">
            {projectImpacts.map((project, index) => (
              <button
                type="button"
                key={project.id}
                className={activeProject === index ? "is-active" : ""}
                onClick={() => startPageTurn(index)}
                disabled={isPageTurning}
              >
                <span>{project.category}</span>
                {project.title}
              </button>
            ))}
          </div>

          <article
            className={`partner-project-book ${
              isPageTurning ? "is-turning" : ""
            }`}
          >
            <div className="partner-project-photo-page">
              {isPageTurning && (
                <img
                  className="partner-project-photo partner-project-photo-next"
                  src={revealedProject.image}
                  alt=""
                  aria-hidden="true"
                />
              )}

              <img
                className="partner-project-photo partner-project-photo-current"
                src={selectedProject.image}
                alt={selectedProject.title}
              />

              {isPageTurning && (
                <div className="partner-project-status partner-project-status-next">
                  {revealedProject.status}
                </div>
              )}

              <div className="partner-project-status partner-project-status-current">
                {selectedProject.status}
              </div>
            </div>

            <div className="partner-project-right-page">
              <div
                className="partner-project-page-under"
                aria-hidden={!isPageTurning}
              >
                <ProjectBookPage
                  project={revealedProject}
                  index={revealedProjectIndex}
                />
              </div>

              <div
                className={`partner-project-turning-page ${
                  isPageTurning ? "is-turning" : ""
                }`}
                role="button"
                tabIndex={isPageTurning ? -1 : 0}
                aria-label={`Turn page to ${
                  projectImpacts[nextProjectIndex].title
                }`}
                onClick={turnToNextPage}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    turnToNextPage();
                  }
                }}
                onAnimationEnd={finishPageTurn}
              >
                <div className="partner-project-page-face partner-project-page-front">
                  <ProjectBookPage
                    project={selectedProject}
                    index={activeProject}
                  />
                </div>

                <div
                  className="partner-project-page-face partner-project-page-back"
                  aria-hidden="true"
                >
                  <div className="partner-project-paper-back" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>


      <section className="partner-feature-stack">
        {featureSections.map((section, index) => (
          <article
            id={section.id}
            className={`partner-feature ${
              index % 2 === 1 ? "partner-feature-reverse" : ""
            }`}
            key={section.title}
          >
            <div className="partner-feature-image-wrap">
              <img
                src={section.image}
                alt={section.imageAlt}
                style={{
                  objectPosition: section.imagePosition || "center center",
                  transform: `scale(${section.imageZoom || 1})`,
                }}
              />
            </div>

            <div className="partner-feature-copy reveal-group">
              <p className="partner-eyebrow">
                {section.eyebrow}
              </p>

              <h2>{section.title}</h2>

              <p>{section.text}</p>

              {section.secondText && (
                <p>{section.secondText}</p>
              )}

              {section.needs && (
                <div className="volunteer-needs-wrap">
                  <p className="volunteer-needs-label">
                    Current Volunteer Needs
                  </p>

                  <div className="volunteer-needs-grid">
                    {section.needs.map((need) => (
                      <span key={need}>
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={section.href}
                className={`partner-text-link ${
                  section.id === "serve-with-us"
                    ? "volunteer-text-link"
                    : ""
                }`}
              >
                {section.linkText}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </section>


      <section className="partner-recognition-section">
        <div className="partner-recognition-image">
          <img
            src="/Dothan-Porch.webp"
            alt="A welcoming porch at Toah Nipi"
          />
        </div>

        <div className="partner-recognition-copy reveal-group">
          <p className="partner-eyebrow">
            Recognition Notes
          </p>

          <h2>
            Want to honor a donor, family, church, or loved one?
          </h2>

          <div className="partner-recognition-list">
            <article>
              <span>01</span>

              <div>
                <h3>In honor of..</h3>

                <p>
                  Recognize gifts given in honor of someone who loves Toah Nipi
                  or has been shaped by this ministry.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>

              <div>
                <h3>In memory of..</h3>

                <p>
                  Include memorial gifts that celebrate a life of faith,
                  generosity, and love for Christian retreat ministry.
                </p>
              </div>
            </article>

            <article>
              <span>03</span>

              <div>
                <h3>Project dedication</h3>

                <p>
                  Highlight major project gifts connected to specific buildings,
                  trails, gathering spaces, or guest experiences.
                </p>
              </div>
            </article>
          </div>

          <a
            href="/contact"
            className="partner-text-link"
          >
            Contact Us
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>


      <section className="partner-community-band reveal-group">
        <div>
          <p className="partner-eyebrow partner-eyebrow-light">
            Our Community
          </p>

          <h2>
            Partnership is also relationship.
          </h2>
        </div>

        <p>
          Toah Nipi is shaped by the churches, ministries, schools,
          organizations, families, and friends who gather here, serve here,
          give here, pray here, and help carry the mission forward.
        </p>
      </section>


      <section
        className="relationship-directory-section reveal-group"
        id="relationship-directory"
      >
        <div className="relationship-directory">
          <div className="relationship-directory-heading">
            <div>
              <p className="partner-eyebrow">
                Community Directory
              </p>

              <h2>
                Explore every relationship.
              </h2>
            </div>

            <p>
              Find churches, ministries, schools, and organizations connected
              to Toah Nipi.
            </p>
          </div>

          <div className="relationship-directory-tools">
            <label className="relationship-search">
              <span className="sr-only">
                Search relationships
              </span>

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                />

                <path d="M16 16L21 21" />
              </svg>

              <input
                type="search"
                value={relationshipSearch}
                onChange={(event) =>
                  setRelationshipSearch(event.target.value)
                }
                placeholder="Search organizations..."
              />
            </label>

            <div
              className="relationship-directory-filters"
              aria-label="Filter directory by category"
            >
              {relationshipCategories.map((category) => {
                const count =
                  category.id === "all"
                    ? relationshipOrganizations.length
                    : relationshipOrganizations.filter(
                        (organization) =>
                          organization.category === category.id
                      ).length;

                return (
                  <button
                    type="button"
                    key={category.id}
                    className={`relationship-filter ${
                      directoryRelationshipCategory === category.id
                        ? "is-active"
                        : ""
                    }`}
                    onClick={() =>
                      setDirectoryRelationshipCategory(category.id)
                    }
                    aria-pressed={
                      directoryRelationshipCategory === category.id
                    }
                  >
                    {category.id !== "all" && (
                      <span
                        className={`relationship-filter-dot relationship-filter-dot--${category.id}`}
                      />
                    )}

                    <span className="relationship-filter-label">
                      {category.label}
                    </span>

                    <span className="relationship-filter-count">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="relationship-directory-grid"
            role="list"
          >
            {directoryVisibleRelationships.map((organization) => {
              const DirectoryElement =
                organization.website ? "a" : "div";

              return (
                <DirectoryElement
                  className="relationship-directory-card"
                  href={
                    organization.website
                      ? organization.website
                      : undefined
                  }
                  target={
                    organization.website
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    organization.website
                      ? "noreferrer"
                      : undefined
                  }
                  role="listitem"
                  key={organization.name}
                >
                  <div className="relationship-directory-mark">
                    {organization.logo ? (
                      <img
                        src={organization.logo}
                        alt=""
                      />
                    ) : (
                      <strong>
                        {getRelationshipInitials(
                          organization.name
                        )}
                      </strong>
                    )}
                  </div>

                  <div className="relationship-directory-copy">
                    <span className="relationship-directory-category">
                      <i
                        className={`relationship-directory-dot relationship-directory-dot--${organization.category}`}
                      />

                      {relationshipCategoryLabels[
                        organization.category
                      ] || "Community"}
                    </span>

                    <h3>
                      {organization.name}
                    </h3>
                  </div>

                  {organization.website && (
                    <span
                      className="relationship-directory-arrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  )}
                </DirectoryElement>
              );
            })}
          </div>

          {directoryVisibleRelationships.length === 0 && (
            <p className="relationship-directory-empty">
              No organizations match that search.
            </p>
          )}
        </div>
      </section>


      <section className="donors-final-cta">
        <div className="donors-final-card reveal-group">
          <p className="donors-eyebrow donors-eyebrow-light">
            Thank You
          </p>

          <h2>
            To every partner, and friend
            <br />
            ...thank you.
          </h2>

          <p>
            Your generosity helps care for Toah Nipi today and prepares it for
            the guests, families, students, churches, and communities who will
            gather here tomorrow.
          </p>
        </div>
      </section>




      <SiteFooter />

    </main>
  );
}


export default Partner;
