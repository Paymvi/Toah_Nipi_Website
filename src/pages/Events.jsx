import EventCarousel from "../components/EventCarousel2";


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

    </main>
  );
}