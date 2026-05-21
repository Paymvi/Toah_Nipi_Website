import { useState } from "react";
import { Link } from "react-router-dom";

import QuickLinks from "../components/QuickLinks";
import EventCarousel from "../components/EventCarousel";


export default function Home() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <main className="page">
      <section className="hero-sticky-wrap">
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
      </section>
      

      <section className="intro-section">
        <div className="section-label">About the Camp</div>

        <div className="intro-grid">
          <h2>
            Quiet mornings.
            <br />Meaningful conversations.
            <br />Room to breathe.
          </h2>

          <div className="intro-copy">
            <p>
              {/* Toah Nipi is designed to feel set apart from the noise of everyday
              life. */}
              {/* <br /> */}
              Whether guests are visiting for a retreat, family gathering,
              leadership event, or a weekend away, the goal is simple: create space
              for <span className="bold-text">rest, connection, and renewal</span>.
            </p>

            <div className="intro-buttons">
              <Link to="/lodging" className="intro-button intro-button-primary">
                Accommodations
              </Link>

              <Link to="/events" className="intro-button intro-button-secondary">
                Explore Activities
              </Link>
            </div>
          </div>
        </div>
        

      </section>

      <QuickLinks />

      {/* <section className="experience-section">
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
      </section> */}

      <section className="events-preview-section">
        <div className="events-header">
          <p className="eyebrow">Events</p>
          <h2>What's waiting for you</h2>
        </div>

        <EventCarousel />
        
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

      <section className="friends-cta-section">
        <div className="friends-cta-content">
          <p className="friends-cta-eyebrow">Ready to learn more?</p>

          <h2>Start planning your visit.</h2>

          <p className="friends-cta-text">
            Meet old and new friends at Toah Nipi!
          </p>

          <Link to="/contact" className="friends-cta-button">
            Plan Your Stay
          </Link>
        </div>
      </section>

      {/* <section className="events-preview-section">
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
      </section> */}

      {/* <section className="cta-section">
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
      </section> */}

      <section className="newsletter-section">
        <div className="newsletter-copy">
          <p className="newsletter-eyebrow">Newsletter</p>

          <h2>Stay connected with Toah Nipi.</h2>

          <p>
            Sign up to receive occasional updates, stories, events, and announcements
            from Toah Nipi Christian Retreat Center.
          </p>

          <div className="newsletter-archive-links">
            <a
              href="https://view.flodesk.com/emails/680bc7fbffcd011540d83bf1"
              target="_blank"
              rel="noreferrer"
            >
              View our Spring 2025 Newsletter
            </a>

            <span aria-hidden="true">•</span>

            <a
              href="https://view.flodesk.com/emails/672a82f4bb0d98073d2e4074"
              target="_blank"
              rel="noreferrer"
            >
              View our Fall 2024 Newsletter
            </a>
          </div>
        </div>

        <form className="newsletter-form">
          <div className="newsletter-form-row">
            <label>
              First name
              <input type="text" name="firstName" />
            </label>

            <label>
              Last name
              <input type="text" name="lastName" />
            </label>
          </div>

          <label>
            Email address
            <input type="email" name="email" />
          </label>

          <button type="submit">Subscribe</button>
        </form>
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

        <div className="footer-contact-grid">
          <div className="footer-contact-card">
            <p className="footer-label">Physical Address</p>
            <p>
              49 Fellowship Circle
              <br />
              Rindge, NH 03461
            </p>
          </div>

          <div className="footer-contact-card">
            <p className="footer-label">Mailing Address</p>
            <p>
              252 Old Ashburnham Road
              <br />
              Rindge, NH 03461
            </p>
          </div>

          <div className="footer-contact-card">
            <p className="footer-label">Phone</p>
            <p>
              <a href="tel:16038995464">(603) 899-5464</a>
            </p>
          </div>

          <div className="footer-contact-card">
            <p className="footer-label">Email</p>
            <p>
              <a href="mailto:info@toahnipi.org">contactus@toahnipi.org</a>
            </p>
          </div>
        </div>
      </section>


    </main>
  );
}