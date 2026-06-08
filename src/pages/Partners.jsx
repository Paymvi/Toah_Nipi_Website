import Footer from "../components/Footer";
import { partnerGroups, getInitials } from "../data/partnerGroups";

export default function Partners() {
  return (
    <main className="partners-page">
      <section className="partners-hero">
        <div className="partners-hero-overlay" />

        <div className="partners-hero-content reveal-group">
          <p className="donors-eyebrow donors-eyebrow-light">
            Partnerships
          </p>

          <h1>
            Ministry partners, returning groups, and friends of{" "}
            <span>Toah Nipi.</span>
          </h1>

          <p>
            Toah Nipi is shaped not only by the land and facilities, but by the
            churches, ministries, schools, organizations, and communities who
            gather here, serve here, and help carry the mission forward.
          </p>
        </div>
      </section>

      <section className="partners-intro-section reveal-group">
        <div className="partners-intro-copy">
          <p className="donors-eyebrow">Shared Mission</p>

          <h2>
            Relationships that help make this place more than a retreat center.
          </h2>
        </div>

        <div className="partners-intro-text">
          <p>
            These organizations and groups represent ongoing relationships,
            shared values, returning retreat communities, and local connections.
            This page gives Toah Nipi space to tell those stories with logos,
            photos, descriptions, and links.
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
              <p className="donors-eyebrow">{group.title}</p>

              <h2>{group.description}</h2>

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

      <section className="partners-story-band reveal-group">
        <div>
          <p className="donors-eyebrow donors-eyebrow-light">
            A Place for Gathering
          </p>

          <h2>Every returning group adds to the story of Toah Nipi.</h2>
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
      </section>

      <section className="site-footer-section">
        <div className="footer-logo-area">
          <img
            src="/toah-nipi-logo-2.png"
            alt="Toah Nipi Christian Retreat Center"
            className="footer-logo-1"
          />

          <p></p>

          <img
            src="/Secondary-Logo.png"
            alt="Toah Nipi Christian Retreat Center"
            className="footer-logo-2"
          />
        </div>

        <Footer />
      </section>
    </main>
  );
}