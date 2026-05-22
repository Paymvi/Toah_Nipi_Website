

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
        </div>

        <div className="family-camp-content">
          <div className="family-camp-inner">
            <p className="events-eyebrow">Events</p>
            <h1>Family Camp</h1>

            <div className="family-camp-description">
              <p>
                Join us this Summer for Family Camp. Enjoy a full program
                designed for your family and hosted by the Toah Nipi staff.
              </p>

              <p>
                Gather with family and friends to enjoy time in God’s beautiful
                creation as we adventure, worship, and commune together.
              </p>
            </div>

            <div className="family-camp-details">
              <div className="family-camp-weeks">
                <article className="camp-week-card">
                  <div>
                    <h2>Family Camp Week 1</h2>
                    <p>June 28th - July 3rd</p>
                  </div>

                  <a href="#" className="camp-register-button">
                    Register
                  </a>
                </article>

                <article className="camp-week-card">
                  <div>
                    <h2>Family Camp Week 2</h2>
                    <p>July 5th - July 10th</p>
                  </div>

                  <a href="#" className="camp-register-button">
                    Register
                  </a>
                </article>
              </div>

              <aside className="family-camp-pricing">
                <div className="pricing-block">
                  <h2>Family Camp Prices</h2>

                  <ul>
                    <li>Adult (17+) - $515</li>
                    <li>Youth (3-17) - $375</li>
                    <li>Infant (12-36 months) - $185</li>
                    <li>Newborn (0-12 months) - $0</li>
                  </ul>
                </div>

                <div className="pricing-block">
                  <h2>Discounts</h2>

                  <ul>
                    <li>InterVarsity Staff - 20%</li>
                    <li>Full-time Ministry - 15%</li>
                    <li>First-time Family - 10%</li>
                    <li>Referred a Family - 10%</li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}