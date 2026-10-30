import EventCarousel from "../components/EventCarousel";
import SEO from "../components/SEO";

const familyCampPhotos = [
  {
    title: "Adult Canoe",
    image: "/optimized/FamilyCamp/FC-AdultCanoe.webp",
  },
  {
    title: "Carpet Ball",
    image: "/optimized/FamilyCamp/FC-CarpetBall.webp",
  },
  {
    title: "Face Painting",
    image: "/optimized/FamilyCamp/FC-FacePaint.webp",
  },
  {
    title: "Field Fun",
    image: "/optimized/FamilyCamp/FC-FieldFun.webp",
  },
  {
    title: "Hayride",
    image: "/optimized/FamilyCamp/FC-Hayride.webp",
  },
  {
    title: "Indoor Fun",
    image: "/optimized/FamilyCamp/FC-IndoorFun.webp",
  },
  {
    title: "Kids Canoe",
    image: "/optimized/FamilyCamp/FC-KidsCanoe.webp",
  },
  {
    title: "Kids in the Field",
    image: "/optimized/FamilyCamp/FC-KidsInField.webp",
  },
  {
    title: "Kids Trail",
    image: "/optimized/FamilyCamp/FC-KidsTrail.webp",
  },
  {
    title: "Kite Flying",
    image: "/optimized/FamilyCamp/FC-Kite.webp",
  },
  {
    title: "Pond Fun",
    image: "/optimized/FamilyCamp/FC-LakeFun.webp",
  },
  {
    title: "Pond Fun",
    image: "/optimized/FamilyCamp/FC-LakeFun2.webp",
  },
  {
    title: "Pond Fun",
    image: "/optimized/FamilyCamp/FC-LakeFun3.webp",
  },
  {
    title: "Potato Sack Race",
    image: "/optimized/FamilyCamp/FC-PotatoSack.webp",
  },
  {
    title: "Potato Sack Race",
    image: "/optimized/FamilyCamp/FC-PotatoSack2.webp",
  },
  {
    title: "Soccer",
    image: "/optimized/FamilyCamp/FC-Soccer.webp",
  },
  {
    title: "Soccer",
    image: "/optimized/FamilyCamp/FC-Soccer2.webp",
  },
  {
    title: "Tiger Face Paint",
    image: "/optimized/FamilyCamp/FC-Tiger.webp",
  },
  {
    title: "Tipping Canoe",
    image: "/optimized/FamilyCamp/FC-TippingCanoe.webp",
  },
  {
    title: "Women’s Gathering",
    image: "/optimized/FamilyCamp/FC-Women.webp",
  },
  {
    title: "Carnival",
    image: "/optimized/Carina_Carnival.webp",
  },
];

// Dates match the linked 2026 registration forms.
const familyCampWeeks = [
  {
    title: "Family Camp: Week 1",
    date: "June 28 – July 3, 2026",
    endDate: "2026-07-03",
    href: "https://forms.toahnipi.org/r/A7KVOz",
  },
  {
    title: "Family Camp: Week 2",
    date: "July 5 – July 10, 2026",
    endDate: "2026-07-10",
    href: "https://forms.toahnipi.org/r/OD4DBa",
  },
];

// Checked once when the page script loads. A week counts as past once its
// last day has ended in Eastern time, so we stop offering registration for it.
const loadedAt = Date.now();

function hasWeekEnded(week) {
  return loadedAt > new Date(`${week.endDate}T23:59:59-04:00`).getTime();
}

const allWeeksEnded = familyCampWeeks.every(hasWeekEnded);

const prices = [
  "Adult 17+: $515",
  "Youth 3-17: $375",
  "Infant 12-36 months: $185",
  "Newborn 0-12 months: $0",
];

const discounts = [
  "InterVarsity Staff: 20%",
  "Full-time Ministry: 15%",
  "First-time Family: 10%",
  "Referred a Family: 10%",
];

export default function Events() {
  return (
    <main className="events-page">

      <SEO path="/events" />

      <section className="events-hero">
        <div className="events-hero-overlay" />

        <div className="events-hero-content">
          <p className="events-hero-eyebrow">Events & Retreats</p>

          <h1>
            Gather, rest, and reconnect at <span>Toah Nipi.</span>
          </h1>

          <p>
            From Family Camp and Thanksgiving House Party to custom retreats and
            personal getaways, Toah Nipi offers space for groups, families, and
            individuals to slow down and be renewed.
          </p>

          <div className="events-hero-actions">
            <a href="#family-camp" className="events-hero-button">
              View Family Camp
            </a>

            <a
              href="#custom-gatherings"
              className="events-hero-button events-hero-button-secondary"
            >
              Plan a Retreat
            </a>
          </div>
        </div>
      </section>

      <section className="family-camp-section" id="family-camp">
        <div className="family-camp-image-wrap">
          <img
            src="/optimized/FamilyCamp-New/Carina_Outside.webp"
            alt="A young woman and two children waving on a wooden boardwalk trail in the woods"
            className="family-camp-image"
            loading="lazy"
            decoding="async"
          />

          {/* Optional image label */}
          {/* <div className="family-camp-image-label">
            <span>Summer 2026</span>
          </div> */}
        </div>

        <div className="family-camp-content">
          <div className="family-camp-inner reveal-group">
            <p className="events-eyebrow">Summer</p>

            <h2 className="family-camp-title">Family Camp</h2>

            <div className="family-camp-description">
              <p>
                Family Camp is a full family camp program hosted by the Toah
                Nipi staff.
              </p>

              <p>
                Gather with family and friends for worship, adventure, rest,
                and meaningful time together in God’s beautiful creation.
              </p>
            </div>

            <div className="family-camp-week-grid">
              {familyCampWeeks.map((week) => {
                const ended = hasWeekEnded(week);

                return (
                  <article className="camp-week-card" key={week.title}>
                    <div>
                      <p className="camp-week-label">
                        {ended ? "Past Week" : "Available Week"}
                      </p>
                      <h3>{week.title}</h3>
                      <p className="camp-week-date">{week.date}</p>
                    </div>

                    {ended ? (
                      <p className="camp-week-closed">Registration closed</p>
                    ) : (
                      <a href={week.href} className="camp-register-button">
                        Register
                      </a>
                    )}
                  </article>
                );
              })}
            </div>

            {allWeeksEnded && (
              <p className="family-camp-next-note">
                Dates for the next Family Camp haven’t been posted yet.{" "}
                <a href="/contact">Contact us</a> to ask about future dates.{" "}
                <a href="/#newsletter">Sign up for our newsletter</a> to hear
                when dates are announced.
              </p>
            )}

            <div className="family-camp-info-grid">
              <aside className="pricing-block">
                <h3>Family Camp Prices</h3>

                <ul>
                  {prices.map((price) => (
                    <li key={price}>{price}</li>
                  ))}
                </ul>

                <p className="pricing-block-note">
                  Registration requires a $500 security deposit. Invoices for
                  the total amount due are sent within 14 business days of
                  registration, and final payment is due within 14 business
                  days of the last day of Family Camp.
                </p>
              </aside>

              <aside className="pricing-block pricing-block-muted">
                <h3>Discounts</h3>

                <ul>
                  {discounts.map((discount) => (
                    <li key={discount}>{discount}</li>
                  ))}
                </ul>

                <p className="pricing-block-note">
                  Discounts are applied to the total after registration.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>

        
      <section className="events-preview-section" id="activities">
        <div className="events-header reveal-group">
          <p className="eyebrow">Events</p>
          <h2>What's waiting for you</h2>
        </div>

        <EventCarousel items={familyCampPhotos} showCaptions={false} />
      </section>

      <section className="thanksgiving-section" id="thanksgiving">
        <div className="thanksgiving-image-wrap">
          <img
            src="/optimized/TN-Thankgiving-Clear.webp"
            alt="Guests gathered around tables during Thanksgiving House Party"
            className="thanksgiving-image"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="thanksgiving-content">
          <div className="thanksgiving-inner reveal-group">
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


      <section className="custom-gathering-section" id="custom-gatherings">
        <div className="custom-gathering-inner reveal-group">
          <div className="custom-gathering-copy ">
            <p className="custom-gathering-eyebrow">For groups</p>

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
                src="/optimized/card/camp-background-2.webp"
                alt="Toah Nipi lodging and meeting space"
                className="custom-gathering-item-image"
                loading="lazy"
                decoding="async"
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
                src="/optimized/card/TN-Thankgiving-Clear.webp"
                alt="Guests sharing a meal at Toah Nipi"
                className="custom-gathering-item-image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </article>

          <article className="custom-gathering-item">
            <div className="custom-gathering-item-content">
              <span>03</span>

              <div>
                <h3>Add time outdoors</h3>
                <p>
                  Include trails, time on Pecker Pond, firepits, recreation, and simple
                  time away from the noise.
                </p>
              </div>
            </div>

            <div className="custom-gathering-item-image-wrap">
              <img
                src="/optimized/card/Lake-Fall.webp"
                alt="Pond and outdoor space at Toah Nipi"
                className="custom-gathering-item-image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </article>
        </div>
          
      </div>
      </section>




      <section className="personal-retreat-section" id="personal-retreats">
        <div className="personal-retreat-inner reveal-group">
          <div className="personal-retreat-image-card">
            <img
              src="/optimized/Field-Sunset.webp"
              alt="Sunset over a building and lawn at Toah Nipi"
              className="personal-retreat-image"
              loading="lazy"
              decoding="async"
            />

            {/* <div className="personal-retreat-image-note">
              <span>Quiet space</span>
              <p>For solitude, reflection, and rest.</p>
            </div> */}
          </div>

          <div className="personal-retreat-copy">
            <p className="personal-retreat-eyebrow">For individuals or small groups</p>

            <h2>Personal Retreats</h2>

            <p>
              Toah Nipi offers Rustic Cottages for personal and small group retreats,
              creating space for solitude, prayer, reflection, and unhurried time away.
            </p>

            <div className="personal-retreat-detail-list">
              <article className="personal-retreat-detail">
                <span>01</span>
                <div>
                  <h3>Simple cottage stays</h3>
                  <p>
                    Stay apart from the busyness of the main camp in a quieter,
                    more personal setting.
                  </p>
                </div>
              </article>

              <article className="personal-retreat-detail">
                <span>02</span>
                <div>
                  <h3>Meals your way</h3>
                  <p>
                    Bring your own food, or ask about joining camp meals in the
                    Hebron dining room.
                  </p>
                </div>
              </article>

              <article className="personal-retreat-detail">
                <span>03</span>
                <div>
                  <h3>Seasonal availability</h3>
                  <p>
                    Retreat options vary by season, so reach out and we’ll help you
                    find what works.
                  </p>
                </div>
              </article>
            </div>

            <a href="/contact" className="personal-retreat-button">
              Inquire Now <span>→</span>
            </a>
          </div>
        </div>
      </section>



    </main>
  );
}