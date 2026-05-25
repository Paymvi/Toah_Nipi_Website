import EventCarousel3 from "../components/EventCarousel3";

const giveUrl =
  "https://cwngui.campwise.com/Apps/OnlineGuestDonations/Index.html?AppID=MKQ4U6RZOHHSNINZSCJV3VSRQQ3QHB&LocCde=CA0000";

const partnerWays = [
  {
    id: "ways-to-give",
    number: "01",
    title: "Make a Gift",
    // text: "Support the facilities, programs, and ministry work that help guests encounter rest, renewal, and deeper connection with God.",
    linkText: "Give today",
    href: "#giving-projects",
  },
  {
    id: "volunteer",
    number: "02",
    title: "Serve With Us",
    // text: "Use your time, skills, and hands-on help to care for the grounds, improve spaces, and bless the guests who come here.",
    // text: "Volunteers play a vital role in our ministry. Join a Volunteer weekend or our year-round openings!",
    linkText: "Volunteer",
    href: "#serve-with-us",
  },
  {
    id: "pray",
    number: "03",
    title: "Pray",
    // text: "Join us in praying for Toah Nipi, our guests, our staff, and the work God is doing through this place.",
    linkText: "Send a prayer request",
    href: "#pray-with-us",
  },
    {
    id: "spread-word",
    number: "04",
    title: "Spread the Word",
    // text: "Join us in praying for Toah Nipi, our guests, our staff, and the work God is doing through this place.",
    linkText: "Send a prayer request",
    href: "#spread-the-word",
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
        ministry, and we are grateful. We have openings <span className="bold-text">year-round</span>{" "}
        for people willing to volunteer their time and talents!{" "}
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
    highlightTitle: "Volunteer Weekend",
    highlightText: (
      <>
        {/* Take part in <span className="bold-text">Volunteer Weekend</span> at
        Toah Nipi! We cover <span className="bold-text">room and board</span>{" "}
        while you invest in Toah Nipi through trail clearing, gardening, wood
        splitting, and more. */}
      </>
    ),
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
    title: "Pray",
    text: (
      <>
        Join us in seeking{" "}
        <span className="bold-text">revival for New England</span> through
        prayer. Pray for{" "}
        <span className="bold-text">the gospel to be proclaimed</span> and for
        Toah Nipi to continue to play a vital role in advancing God's kingdom on
        earth. 
        <br /><br />
        As you pray for those who do not follow Jesus and for Toah Nipi,
        we invite you to{" "}
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
    linkText: "Share our mission",
    href: "/contact",
  },
];

function Partner() {
  return (
    <main className="partner-page">
      <section className="partner-hero">
        <div className="partner-hero-overlay" />

        <div className="partner-hero-content">
          <p className="partner-eyebrow partner-eyebrow-light">Partner With Us</p>

          <h1>
            Help shape the future of{" "}
            <span className="partner-hero-highlight">Toah Nipi.</span>
          </h1>

          <p className="partner-hero-text">
            Whether through financial generosity, hands-on service, or faithful
            prayer, we would love to have you join us as part of the Toah Nipi
            community.
          </p>

          <div className="partner-hero-actions">
            <a href={giveUrl} target="_blank" rel="noreferrer" className="partner-btn">
              Make a Gift
            </a>

            <a href="#partner-ways" className="partner-btn partner-btn-secondary">
              Explore Ways to Partner
            </a>
          </div>
        </div>
      </section>

      {/* <section className="partner-intro" id="partner-ways">
        <div className="partner-intro-copy">
          <p className="partner-eyebrow">Join the Mission</p>

          <h2>
            Partnering with Toah Nipi is more than supporting a place. It is
            investing in what happens here.
          </h2>
        </div>

        <div className="partner-intro-text">
          <p>
            Every retreat, meal, conversation, worship night, quiet walk, and
            lakeside moment is made possible by people who believe in this
            ministry. Your partnership helps create space for guests to rest,
            reflect, reconnect, and grow.
          </p>
        </div>
      </section> */}

      <div style={{ height: "80px" }} />

      <section className="partner-ways-grid" id="partner-ways">
        {partnerWays.map((way) => (
          <article className="partner-way-card" id={way.id} key={way.title}>
            <span>{way.number}</span>
            <h3>{way.title}</h3>
            <p>{way.text}</p>

            <a href={way.href} target={way.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {way.linkText} <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </section>

      <section className="partner-impact-band">
        <div>
          <p className="partner-eyebrow partner-eyebrow-light">Why It Matters</p>
          <h2>Generosity creates room for ministry.</h2>
        </div>

        <p>
          From facility improvements to scholarships, volunteer projects, and
          prayer support, every act of partnership helps Toah Nipi continue
          serving students, families, churches, and groups for years to come.
        </p>
      </section>

      <EventCarousel3 />

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

            <div className="partner-feature-copy">
              <p className="partner-eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>

              <p>{section.text}</p>

              {section.secondText && <p>{section.secondText}</p>}

              {section.needs && (
                <div className="volunteer-needs-wrap">
                  <p className="volunteer-needs-label">Current Volunteer Needs</p>

                  <div className="volunteer-needs-grid">
                    {section.needs.map((need) => (
                      <span key={need}>{need}</span>
                    ))}
                  </div>
                </div>
              )}

              {section.highlightTitle && (
                <div className="volunteer-weekend-card">
                  <span>Featured Opportunity</span>
                  <h3>{section.highlightTitle}</h3>
                  <p>{section.highlightText}</p>
                </div>
              )}

              <a
                href={section.href}
                target={section.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={`partner-text-link ${
                  section.id === "serve-with-us" ? "volunteer-text-link" : ""
                }`}
              >
                {section.linkText} <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      

      <section className="partner-final-cta">
        <div className="partner-final-card">
          <p className="partner-eyebrow partner-eyebrow-light">Ready to Partner?</p>

          <h2>Your support helps keep Toah Nipi welcoming, beautiful, and ready for ministry.</h2>

          <p>
            Whether you give, serve, pray, or simply help others discover this
            place, you are part of the story God is writing here.
          </p>

          <div className="partner-final-actions">
            <a href={giveUrl} target="_blank" rel="noreferrer" className="partner-btn">
              Make a Gift
            </a>

            <a href="/contact" className="partner-btn partner-btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Partner;