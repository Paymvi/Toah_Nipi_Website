import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Routes, Route, useParams, Link } from "react-router-dom";

function Home() {
  return (
    <main className="page">
      <section className="home-hero">
        <div className="hero-content">
          <p className="eyebrow">Welcome to</p>
          {/* <h1>Toah Nipi</h1> */}

          <img
            src="/toah-nipi-logo-2.png"
            alt="Toah Nipi"
            className="hero-logo"
          />
          
          <p>
            Experience lakeside lodging, meaningful events, and a peaceful place
            to reconnect with God, creation, and community.
          </p>

          <div className="hero-buttons">
            <Link to="/contact" className="primary-button">
              Plan a Visit
            </Link>
          </div>
        </div>
      </section>

      <section className="intro-section">
        <div className="section-label">About the Camp</div>

        <div className="intro-grid">
          <h2>Quiet mornings, 
            <br/>meaningful conversations, 
            <br/>and room to breathe.</h2>

          <p>
            Toah Nipi is designed to feel set apart from the noise of everyday
            life. 
            <br/>
            Whether guests are visiting for a retreat, family gathering,
            leadership event, or a weekend away, the goal is simple: create space
            for <span className="bold-text">rest, connection, and renewal</span>..
          </p>
        </div>
      </section>

      <section className="quick-links-section">
        <Link to="/lodging" className="feature-card">
          {/* <span>01</span> */}
          <h3>Who we are</h3>
          <p>
            Toah Nipi serves as a gathering place for individuals and groups to reflect and experience the goodness of God amidst the beauty of His creation
            {/* Comfortable spaces for groups, families, retreats, and overnight
            stays. */}
          </p>
        </Link>

        <Link to="/events" className="feature-card">
          {/* <span>02</span> */}
          <h3>Where we are</h3>
          <p>
            Situated in the Monadnock Region of Southern New Hampshire
            {/* Host retreats, conferences, church gatherings, celebrations, and
            seasonal events. */}
          </p>
        </Link>

        <Link to="/partner" className="feature-card">
          {/* <span>03</span> */}
          <h3>Retreats & Programs</h3>
          <p>
            Learn how churches, ministries, businesses, and supporters can get
            involved.
          </p>
        </Link>
      </section>

      <section className="experience-section">
        <div className="experience-copy">
          <p className="eyebrow">The Experience</p>
          <h2>Built around peace, community, and the outdoors.</h2>
          <p>
            From lakeside walks to shared meals and evening conversations, the
            camp experience is meant to slow people down in the best way.
          </p>
        </div>

        <div className="experience-list">
          <div>
            <h3>Lakeside Setting</h3>
            <p>Beautiful natural surroundings that make the space feel calm.</p>
          </div>

          <div>
            <h3>Group Friendly</h3>
            <p>Flexible spaces for churches, schools, families, and retreats.</p>
          </div>

          <div>
            <h3>Purposeful Rest</h3>
            <p>A setting that encourages reflection, worship, and connection.</p>
          </div>
        </div>
      </section>

      <section className="split-section">
        <div className="split-image split-image-one" />

        <div className="split-content">
          <p className="eyebrow">Lodging</p>
          <h2>Stay for a night, a weekend, or a full retreat.</h2>
          <p>
            Create a section here that previews cabins, rooms, retreat housing,
            or whatever lodging options the camp offers.
          </p>

          <Link to="/lodging" className="text-link">
            View lodging options →
          </Link>
        </div>
      </section>

      <section className="events-preview-section">
        <div className="events-header">
          <p className="eyebrow">Events</p>
          <h2>Gatherings that feel intentional.</h2>
        </div>

        <div className="event-preview-grid">
          <article className="event-card">
            <h3>Retreats</h3>
            <p>
              A peaceful place for church groups, teams, and ministries to step
              away and reconnect.
            </p>
          </article>

          <article className="event-card">
            <h3>Family Events</h3>
            <p>
              Space for families and communities to celebrate, rest, and spend
              meaningful time together.
            </p>
          </article>

          <article className="event-card">
            <h3>Seasonal Programs</h3>
            <p>
              Highlight camps, summer events, special weekends, or recurring
              programs here.
            </p>
          </article>
        </div>
      </section>

      <section className="cta-section">
        <p className="eyebrow">Ready to learn more?</p>
        <h2>Start planning your visit.</h2>
        <p>
          This can become your homepage call-to-action section for booking,
          contacting the camp, or learning about donations.
        </p>

        <div className="cta-buttons">
          <Link to="/contact" className="primary-button">
            Contact Us
          </Link>
          <Link to="/give" className="secondary-button secondary-button-dark">
            Give
          </Link>
        </div>
      </section>
    </main>
  );
}

function PlaceholderPage({ title }) {
  const { section } = useParams();

  return (
    <main className="page">
      <section className="placeholder-page">
        <p className="eyebrow">
          {section ? `${title} dropdown item ${section}` : "Page coming soon"}
        </p>

        <h1>{title}</h1>

        <p>
          This route is set up. Later, you can replace this placeholder with the
          real {title.toLowerCase()} page.
        </p>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/lodging" element={<PlaceholderPage title="Lodging" />} />
        <Route
          path="/lodging/:section"
          element={<PlaceholderPage title="Lodging" />}
        />

        <Route path="/events" element={<PlaceholderPage title="Events" />} />
        <Route
          path="/events/:section"
          element={<PlaceholderPage title="Events" />}
        />

        <Route path="/partner" element={<PlaceholderPage title="Partner" />} />
        <Route
          path="/partner/:section"
          element={<PlaceholderPage title="Partner" />}
        />

        <Route
          path="/our-story"
          element={<PlaceholderPage title="Our Story" />}
        />
        <Route
          path="/our-story/:section"
          element={<PlaceholderPage title="Our Story" />}
        />

        <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
        <Route
          path="/blog/:section"
          element={<PlaceholderPage title="Blog" />}
        />

        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
        <Route
          path="/contact/:section"
          element={<PlaceholderPage title="Contact" />}
        />

        <Route path="/give" element={<PlaceholderPage title="Give" />} />
      </Routes>
    </BrowserRouter>
  );
}