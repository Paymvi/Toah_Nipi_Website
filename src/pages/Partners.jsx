import Footer from "../components/Footer";
import { partnerGroups, getInitials } from "../data/partnerGroups";
import SiteFooter from "../components/SiteFooter";

const partnerGroupEyebrows = {
  "ministry-partners": "Shared Mission",
  "returning-retreat-groups": "Year After Year",
  "community-affiliations": "Local Connections",
};

export default function Partners() {
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
            organizations, and communities who gather here, serve here, and help
            carry the mission forward.
          </p>
        </div>
      </section>

      <section className="partners-intro-section reveal-group">
        <div className="partners-intro-copy">
          <p className="donors-eyebrow">Shared Mission</p>

          <h2>The relationships behind the retreat.</h2>
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

      <section className="partners-story-band reveal-group">
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
      </section>

      <SiteFooter/>

    </main>
  );
}
