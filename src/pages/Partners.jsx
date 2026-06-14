import { useState } from "react";
import { partnerGroups, getInitials } from "../data/partnerGroups";
import SiteFooter from "../components/SiteFooter";

const partnerGroupEyebrows = {
  "ministry-partners": "Shared Mission",
  "returning-retreat-groups": "Year After Year",
  "community-affiliations": "Local Connections",
};

const projectImpacts = [
  {
    id: "christmas-walk",
    title: "Christmas Light Walk",
    category: "Future Experience",
    status: "In Development",
    image: "/Hebron-Night-Lights.png",
    description:
      "A fully lighted Christmas walk experience designed to become a meaningful local tradition, sharing the story of Jesus’ birth through outdoor scenes, lights, and Scripture.",
    donorNote: "Add description here",
    fundedBy: ["Add donor name", "Add donor name", "Anonymous Donor"],
  },
  {
    id: "woodland-trail",
    title: "Woodland Trail Around the Pond",
    category: "Land Stewardship",
    status: "In Progress",
    image: "/May-2025-Lake+Nature-2.jpg",
    description:
      "Improvements to the woodland trails around the pond will create peaceful, accessible pathways for prayer, reflection, walking, and time outdoors.",
    donorNote:
      "These gifts help preserve the natural beauty of Toah Nipi while making the land easier for guests to enjoy.",
    fundedBy: ["Add donor name", "Add donor name", "Anonymous Donor"],
  },
  {
    id: "outdoor-amphitheatre",
    title: "Outdoor Amphitheatre",
    category: "Gathering Space",
    status: "Planned",
    image: "/Outdoor-Theatre.png",
    description:
      "A new outdoor amphitheatre near the pond will provide a flexible space for worship, teaching, camp gatherings, concerts, and group events.",
    donorNote:
      "Donor support is helping create a space where future guests can gather, worship, and make lasting memories.",
    fundedBy: ["Add donor name", "Add donor name", "Anonymous Donor"],
  },
  {
    id: "trex-swings",
    title: "Trex Swings",
    category: "Outdoor Seating",
    status: "Planned",
    image: "/Trex-Swings.jpg",
    description:
      "New Trex swings will create a peaceful place for guests to sit, rest, and enjoy the beauty of Toah Nipi’s outdoor spaces. These durable swings will offer a welcoming spot for conversation, reflection, and quiet moments near camp.",
    donorNote:
      "Donor support is helping provide long-lasting outdoor seating where guests can slow down, connect with others, and enjoy God’s creation.",
    fundedBy: ["Add donor name", "Add donor name", "Anonymous Donor"],
  },
];

const donorGroups = [
  {
    title: "Founding Supporters",
    description:
      "Donors who helped strengthen Toah Nipi during its transition into an independent Christian retreat center.",
    names: [
      "Add donor name",
      "Add donor name",
      "Add donor name",
      "Anonymous Supporter",
    ],
  },
  {
    title: "Project Champions",
    description:
      "Donors who gave toward specific improvements, future projects, facilities, and guest experiences.",
    names: [
      "Add donor name",
      "Add donor name",
      "Add donor name",
      "Anonymous Supporter",
    ],
  },
  {
    title: "Sustaining Friends",
    description:
      "Recurring and ongoing partners whose generosity helps keep Toah Nipi welcoming, beautiful, and ready for ministry.",
    names: [
      "Add donor name",
      "Add donor name",
      "Add donor name",
      "Anonymous Supporter",
    ],
  },
];

const impactStats = [
  {
    number: "03",
    label: "Projects highlighted",
  },
  {
    number: "100%",
    label: "Grateful for every gift",
  },
  {
    number: "∞",
    label: "Stories still unfolding",
  },
];

export default function Partners() {
  const [activeProject, setActiveProject] = useState(0);

  const selectedProject = projectImpacts[activeProject];

  return (
    <main className="partners-page">
      <section className="partners-hero">
        <div className="partners-hero-overlay" />

        <div className="partners-hero-content reveal-group">
          <p className="donors-eyebrow donors-eyebrow-light">Partnerships</p>

          <h1>
            Partners and friends of <span>Toah Nipi.</span>
          </h1>

          <p>
            Toah Nipi is shaped by the churches, ministries, schools,
            organizations, families, and friends who gather here, serve here,
            give here, and help carry the mission forward.
          </p>
        </div>
      </section>

      {/* =========================================================
          SUPPORT / DONOR MATERIAL MOVED FROM DONORS PAGE
      ========================================================= */}

      {/* <section className="donors-intro-section reveal-group">
        <div className="donors-intro-copy">
          <p className="donors-eyebrow">Partner Impact</p>

          <h2>
            <span className="highlight-text">It becomes...</span>
            <br />
            trails walked,
            <br />
            spaces renewed,
            <br />
            meals shared,
            <br />
            and stories remembered.
          </h2>
        </div>

        <div className="donors-intro-text">
          <p>
            Toah Nipi is <span className="bold-text">deeply grateful</span> for
            the individuals, families, churches, and partners who give toward
            the care and future of this place.
            <br />
            From practical improvements to major vision projects, generosity{" "}
            <span className="bold-text">helps make ministry possible.</span>
          </p>

          <div className="donors-stat-grid">
            {impactStats.map((stat) => (
              <article className="donors-stat-card" key={stat.label}>
                <strong>{stat.number}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      <section
        className="donors-project-section reveal-group"
        id="project-impact"
      >
        <div className="donors-project-header">
          <div>
            <p className="donors-eyebrow">Projects Made Possible</p>
            <h2>See what generosity is helping build.</h2>
          </div>

          <p>
            Use the tabs below to explore featured projects and the partners
            helping bring them to life.
          </p>
        </div>

        <div className="donors-project-layout">
          <div className="donors-project-tabs">
            {projectImpacts.map((project, index) => (
              <button
                type="button"
                key={project.id}
                className={activeProject === index ? "is-active" : ""}
                onClick={() => setActiveProject(index)}
              >
                <span>{project.category}</span>
                {project.title}
              </button>
            ))}
          </div>

          <article className="donors-featured-project">
            <div className="donors-featured-image">
              <img src={selectedProject.image} alt={selectedProject.title} />

              <div className="donors-project-status">
                {selectedProject.status}
              </div>
            </div>

            <div className="donors-featured-content">
              <p className="donors-project-category">
                {selectedProject.category}
              </p>

              <h3>{selectedProject.title}</h3>

              <p>{selectedProject.description}</p>

              {/* Keep this commented out for now if it feels redundant. */}
              {/* <div className="donors-project-note">
                <span>Why it matters</span>
                <p>{selectedProject.donorNote}</p>
              </div> */}

              <div className="donors-funded-by">
                <span>Supported by</span>

                <div>
                  {selectedProject.fundedBy.map((donor, index) => (
                    <p key={`${selectedProject.id}-${donor}-${index}`}>
                      {donor}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="donor-wall-section reveal-group" id="donor-wall">
        <div className="donor-wall-header">
          <p className="donors-eyebrow">Partner Recognition</p>
          <h2>With thanks to our supporters.</h2>

          <p>
            This recognition wall can be updated as new donors, churches,
            families, and project partners are added.
          </p>
        </div>

        <div className="donor-wall-grid">
          {donorGroups.map((group) => (
            <article className="donor-wall-card" key={group.title}>
              <div className="donor-wall-card-header">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>

              <div className="donor-name-list">
                {group.names.map((name, index) => (
                  <span key={`${group.title}-${name}-${index}`}>{name}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="donors-story-band reveal-group">
        <div>
          <p className="donors-eyebrow donors-eyebrow-light">
            A Continuing Story
          </p>

          <h2>Every project is more than a project.</h2>
        </div>

        <p>
          A trail becomes a quiet walk with God. A gathering space becomes a
          worship night. A renovated building becomes a retreat home for a group
          that needed rest. Thank you for helping make these moments possible.
        </p>
      </section>

      <section className="donors-recognition-section" id="recognition-notes">
        <div className="donors-recognition-image">
          <img src="/Dothan-Porch.webp" alt="A welcoming porch at Toah Nipi" />
        </div>

        <div className="donors-recognition-copy reveal-group">
          <p className="donors-eyebrow">Recognition Notes</p>

          <h2>Want to honor a donor, family, church, or loved one?</h2>

          {/* <p>
            This page can also include special recognition gifts, memorial
            gifts, church partners, project dedications, and anonymous donors.
          </p> */}

          <div className="recognition-detail-list">
            <article>
              <span>01</span>

              <div>
                <h3>In honor of</h3>

                <p>
                  Recognize gifts given in honor of someone who loves Toah Nipi
                  or has been shaped by this ministry.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>

              <div>
                <h3>In memory of</h3>

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
        </div>
      </section>



      {/* =========================================================
          ORIGINAL PARTNERS PAGE MATERIAL
      ========================================================= */}

      <section className="partners-intro-section reveal-group">
        <div className="partners-intro-copy">
          <p className="donors-eyebrow">Shared Mission</p>

          <h2>The <span className="highlight-text">relationships</span> behind the retreat.</h2>
        </div>

        <div className="partners-intro-text">
          <p>
            These partners and returning groups represent ongoing relationships,
            shared values, local connections, and communities who continue to
            make Toah Nipi part of their story.
          </p>
        </div>
      </section>

      <section className="partners-feature-section reveal-group">
        {partnerGroups.map((group, index) => (
          <article
            className={`partners-feature-row ${
              index % 2 === 1 ? "partners-feature-row--reverse" : ""
            }`}
            key={group.id}
            id={group.id}
          >
            <div className="partners-feature-image">
              <img src={group.image} alt={group.title} />
            </div>

            <div className="partners-feature-copy">
              <p className="donors-eyebrow">
                {partnerGroupEyebrows[group.id] || "Partners"}
              </p>

              <h2>{group.title}</h2>

              <p className="partners-feature-description">
                {group.description}
              </p>

              <div className="partners-logo-grid">
                {group.organizations.map((organization, orgIndex) => (
                  <a
                    className={`partners-logo-card ${
                      organization.website ? "" : "partners-logo-card--disabled"
                    }`}
                    href={organization.website || undefined}
                    target={organization.website ? "_blank" : undefined}
                    rel={organization.website ? "noreferrer" : undefined}
                    key={`${group.id}-${organization.name}-${orgIndex}`}
                  >
                    <div className="partners-logo-mark">
                      {organization.logo ? (
                        <img
                          src={organization.logo}
                          alt={`${organization.name} logo`}
                        />
                      ) : (
                        <strong>{getInitials(organization.name)}</strong>
                      )}
                    </div>

                    <div>
                      <h3>{organization.name}</h3>
                      <p>{organization.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* <section className="partners-story-band reveal-group">
        <div>
          <p className="donors-eyebrow donors-eyebrow-light">
            A Place for Gathering
          </p>

          <h2>Every group adds to the story.</h2>
        </div>

        <p>
          From student retreats and church weekends to ministry training,
          prayer, worship, service, and rest, these relationships help keep Toah
          Nipi connected to the wider Christian community.
        </p>
      </section>

      <section className="partners-final-section reveal-group">
        <div className="partners-final-card">
          <p className="donors-eyebrow">Interested in partnering?</p>

          <h2>Bring your group to Toah Nipi.</h2>

          <p>
            Churches, ministries, schools, and organizations are invited to
            connect with us about retreats, service opportunities, recurring
            gatherings, and future partnerships.
          </p>

          <a href="/contact" className="partners-contact-link">
            Contact us
          </a>
        </div>
      </section> */}

      <section className="donors-final-cta">
        <div className="donors-final-card reveal-group">
          <p className="donors-eyebrow donors-eyebrow-light">Thank You</p>

          <h2>To every partner, and friend
            <br/>...thank you.</h2>

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