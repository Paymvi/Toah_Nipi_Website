import EventCarousel from "../components/EventCarousel2";
import Footer from "../components/Footer";

const familyCampWeeks = [
  {
    title: "Family Camp: Week 1",
    date: "June 28th - July 3rd",
    href: "#",
  },
  {
    title: "Family Camp: Week 2",
    date: "July 5th - July 10th",
    href: "#",
  },
];

const prices = [
  "Adult 17+ — $515",
  "Youth 3-17 — $375",
  "Infant 12-36 months — $185",
  "Newborn 0-12 months — $0",
];

const discounts = [
  "InterVarsity Staff — 20%",
  "Full-time Ministry — 15%",
  "First-time Family — 10%",
  "Referred a Family — 10%",
];

export default function Events() {
  return (
    <main className="events-page">
      <section className="family-camp-section">
        <div className="family-camp-image-wrap">
          <img
            src="/Family-Camp.webp"
            alt="Family camp by the lake"
            className="family-camp-image"
          />

          {/* Optional image label */}
          {/* <div className="family-camp-image-label">
            <span>Summer 2026</span>
          </div> */}
        </div>

        <div className="family-camp-content">
          <div className="family-camp-inner">
            <p className="events-eyebrow">Events</p>

            <h1>Family Camp</h1>

            <div className="family-camp-description">
              <p>
                Join us this summer for a full family camp program hosted by
                the Toah Nipi staff.
              </p>

              <p>
                Gather with family and friends for worship, adventure, rest,
                and meaningful time together in God’s beautiful creation.
              </p>
            </div>

            <div className="family-camp-week-grid">
              {familyCampWeeks.map((week) => (
                <article className="camp-week-card" key={week.title}>
                  <div>
                    <p className="camp-week-label">Available Week</p>
                    <h2>{week.title}</h2>
                    <p className="camp-week-date">{week.date}</p>
                  </div>

                  <a href={week.href} className="camp-register-button">
                    Register
                  </a>
                </article>
              ))}
            </div>

            <div className="family-camp-info-grid">
              <aside className="pricing-block">
                <h2>Family Camp Prices</h2>

                <ul>
                  {prices.map((price) => (
                    <li key={price}>{price}</li>
                  ))}
                </ul>
              </aside>

              <aside className="pricing-block pricing-block-muted">
                <h2>Discounts</h2>

                <ul>
                  {discounts.map((discount) => (
                    <li key={discount}>{discount}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>

        
      <section className="events-preview-section">
        <div className="events-header">
          <p className="eyebrow">Events</p>
          <h2>What's waiting for you</h2>
        </div>

        <EventCarousel />
      </section>

      <section className="thanksgiving-section">
        <div className="thanksgiving-image-wrap">
          <img
            src="/TN-Thankgiving-Clear.png"
            alt="Guests gathered around tables during Thanksgiving House Party"
            className="thanksgiving-image"
          />
        </div>

        <div className="thanksgiving-content">
          <div className="thanksgiving-inner">
            <h2><span className="highlight-text">Thanksgiving</span> House Party</h2>

            <p>
              We welcome you to join us for our cozy International Student
              Thanksgiving House Party, where we gather together with families
              from all traditions and languages to celebrate.
            </p>

            <a href="/contact" className="thanksgiving-link">
              Inquire Now <span>→</span>
            </a>
          </div>
        </div>
      </section>


      <section className="custom-gathering-section">
        <div className="custom-gathering-inner">
          <div className="custom-gathering-copy">
            <p className="custom-gathering-eyebrow">Custom Gatherings</p>

            <h2><span className="highlight-text">Customize</span> the stay around your group</h2>

            <p>
              Not every retreat follows the same rhythm. Whether you are planning a
              church weekend, student retreat, family gathering, leadership event, or
              day visit, <span className="bold-text">our team can help you think through lodging, meals, meeting
              spaces, and time outdoors.</span>
            </p>

            <a href="/contact" className="custom-gathering-button">
              Start Planning <span>→</span>
            </a>
          </div>

          
        <div className="custom-gathering-list">
          <article className="custom-gathering-item">
            <div className="custom-gathering-item-content">
              <span>01</span>

              <div>
                <h3>Choose your spaces</h3>
                <p>
                  Find lodging, meeting rooms, and gathering areas that fit the size
                  and feel of your group.
                </p>
              </div>
            </div>

            <div className="custom-gathering-item-image-wrap">
              <img
                src="/Hebron-Front.jpeg"
                alt="Toah Nipi lodging and meeting space"
                className="custom-gathering-item-image"
              />
            </div>
          </article>

          <article className="custom-gathering-item">
            <div className="custom-gathering-item-content">
              <span>02</span>

              <div>
                <h3>Build your rhythm</h3>
                <p>
                  Make room for sessions, shared meals, worship, quiet time,
                  conversation, and rest.
                </p>
              </div>
            </div>

            <div className="custom-gathering-item-image-wrap">
              <img
                src="/TN-Thankgiving-Clear.png"
                alt="Guests sharing a meal at Toah Nipi"
                className="custom-gathering-item-image"
              />
            </div>
          </article>

          <article className="custom-gathering-item">
            <div className="custom-gathering-item-content">
              <span>03</span>

              <div>
                <h3>Add time outdoors</h3>
                <p>
                  Include trails, lakefront space, firepits, recreation, and simple
                  time away from the noise.
                </p>
              </div>
            </div>

            <div className="custom-gathering-item-image-wrap">
              <img
                src="/Lake-Fall.webp"
                alt="Lake and outdoor space at Toah Nipi"
                className="custom-gathering-item-image"
              />
            </div>
          </article>
        </div>
          
      </div>
      </section>

      <section className="site-footer-section">
        <div className="footer-logo-area">
          <img
            src="/toah-nipi-logo-2.png"
            alt="Toah Nipi Christian Retreat Center"
            className="footer-logo-1"
          />

          <p>
            {/* A peaceful Christian retreat center for rest, connection, and renewal. */}
          </p>

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