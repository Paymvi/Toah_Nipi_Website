import { useState } from "react";
import { Link } from "react-router-dom";

import QuickLinks from "../components/QuickLinks";
import EventCarousel from "../components/EventCarousel";
import SiteFooter from "../components/SiteFooter";
import SEO from "../components/SEO";

export default function Home() {

  return (
    <main className="page">

      <SEO
        title="Christian Retreat Center in Rindge, NH"
        description="Toah Nipi is a year-round Christian retreat center in Rindge, New Hampshire offering lakeside lodging, Family Camp, group retreats, and personal getaways."
        path="/"
      />

      <section className="hero-sticky-wrap">
        <section className="home-hero">
            <div className="hero-content">
              
              <div className="hero-title-strip reveal-group">
              <p className="eyebrow">Welcome to</p>
              {/* <h1>Toah Nipi</h1> */}

              <h1 className="sr-only">
                Toah Nipi Christian Retreat Center in Rindge, NH
              </h1>

              <img
                src="/toah-nipi-logo-2.png"
                alt="Toah Nipi"
                className="hero-logo"
              />
            
            
            <p>
              Experience lakeside lodging, meaningful events, and a peaceful place
              to reconnect with God, creation, and community.
            </p>

            </div>

            <div className="hero-buttons">
              <Link to="/contact" className="primary-button">
                Plan a Visit
              </Link>
            </div>
          </div>
        </section>
      </section>
      

      <section className="intro-section">
        <div className="section-label">What is Toah Nipi</div>

        <div className="intro-grid reveal-group">
          <h2>
            A <span className="highlight-text">year-round</span>
            <br/>
            Christian retreat center 
            <br/>in Rindge, NH.
          </h2>

          <div className="intro-copy">
            <p>
              Toah Nipi welcomes churches, campus ministries, families, retreat
              groups, and individuals for overnight stays, day events, meals, meeting spaces, and time
              set apart for{" "}
              <span className="bold-text">connection, and renewal</span>.
            </p>

            <div className="intro-buttons">
              <Link to="/lodging" className="intro-button intro-button-primary">
                View Lodging
              </Link>

              <Link to="/events" className="intro-button intro-button-secondary">
                Explore Events
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

      <section className="contact-directions-section" id="directions">
        <div className="contact-directions-card">
          <div className="contact-directions-text-strip">
            <p className="contact-eyebrow">Directions</p>

            <h2>Find us in Rindge, New Hampshire.</h2>

            <p>
              Toah Nipi Christian Retreat Center is located at
              <br />{" "}
              <span className="contact-directions-highlight">
                49 Fellowship Circle in Rindge, NH
              </span>
              .
              <br />
              {/* Guests can use the physical address for GPS directions. */}
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=49+Fellowship+Circle+Rindge+NH+03461"
              target="_blank"
              rel="noreferrer"
              className="contact-directions-button"
            >
              Open in Google Maps <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="events-preview-section">
        <div className="events-header reveal-group">
          <p className="eyebrow">Events</p>
          <h2>What's waiting for you</h2>
        </div>

        <EventCarousel />
        
      </section>

      <section className="split-section">
        <div className="split-image split-image-one" />

        <div className="split-content reveal-group">
          <p className="eyebrow">Lodging</p>
          <h2>Stay for a night, a weekend, or a full retreat.</h2>
          <p>
            From larger retreat lodges to quieter cottage stays, Toah Nipi offers
            flexible lodging for churches, families, student groups, and personal retreats.
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
        <div className="newsletter-copy reveal-group">
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

      <SiteFooter />


    </main>
  );
}