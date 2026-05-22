import EventCarousel3 from "../components/EventCarousel3";

const giveUrl =
  "https://cwngui.campwise.com/Apps/OnlineGuestDonations/Index.html?AppID=MKQ4U6RZOHHSNINZSCJV3VSRQQ3QHB&LocCde=CA0000";

const partnerWays = [
  {
    number: "01",
    title: "Make a Gift",
    text: "Support the facilities, programs, and ministry work that help guests encounter rest, renewal, and deeper connection with God.",
    linkText: "Give today",
    href: giveUrl,
  },
  {
    number: "02",
    title: "Serve With Us",
    text: "Use your time, skills, and hands-on help to care for the grounds, improve spaces, and bless the guests who come here.",
    linkText: "Volunteer",
    href: "/events",
  },
  {
    number: "03",
    title: "Pray",
    text: "Join us in praying for Toah Nipi, our guests, our staff, and the work God is doing through this place.",
    linkText: "Send a prayer request",
    href: "mailto:contactus@toahnipi.org?subject=Prayer",
  },
];

const featureSections = [
  {
    eyebrow: "Giving",
    title: "Help make the next chapter possible.",
    text: "Toah Nipi’s ministry depends on generous partners who believe in creating places of rest, worship, and community. Your giving helps us improve spaces, expand programs, and care well for every guest who arrives on the property.",
    image: "/Canoe.jpeg",
    imageAlt: "Canoes resting near the water at Toah Nipi",
    linkText: "Make a Gift",
    href: giveUrl,
  },
  {
    eyebrow: "Advocacy",
    title: "Spread the word about Toah Nipi.",
    text: "One of the simplest ways to partner with us is to tell others. Invite churches, families, students, and friends to experience Toah Nipi as a place to gather, rest, and reconnect with God.",
    image: "/sign.jpg",
    imageAlt: "Toah Nipi sign",
    linkText: "Share our mission",
    href: "/contact",
  },
  {
    eyebrow: "Prayer",
    title: "Pray with us for renewal.",
    text: "We believe prayer is a vital part of the ministry. Pray for our guests, staff, volunteers, facilities, and for the gospel to continue shaping lives across New England.",
    image: "/PrayerGarden4-abi.png",
    imageAlt: "Stone prayer garden at Toah Nipi",
    linkText: "Send a prayer request",
    href: "mailto:contactus@toahnipi.org?subject=Prayer",
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

      <section className="partner-intro" id="partner-ways">
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
      </section>

      <section className="partner-ways-grid">
        {partnerWays.map((way) => (
          <article className="partner-way-card" key={way.title}>
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

      <section className="partner-feature-stack">
        {featureSections.map((section, index) => (
          <article
            className={`partner-feature ${
              index % 2 === 1 ? "partner-feature-reverse" : ""
            }`}
            key={section.title}
          >
            <div className="partner-feature-image-wrap">
              <img src={section.image} alt={section.imageAlt} />
            </div>

            <div className="partner-feature-copy">
              <p className="partner-eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <p>{section.text}</p>

              <a
                href={section.href}
                target={section.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="partner-text-link"
              >
                {section.linkText} <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      <EventCarousel3 />

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