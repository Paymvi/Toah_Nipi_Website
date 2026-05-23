import StoryTimeline from "../components/StoryTimeline";
import StatementOfFaith from "../components/StatementOfFaith";
import CoreValues from "../components/CoreValues";
import OurTeam from "../components/OurTeam";
import Footer from "../components/Footer";

export default function OurStory() {
  return (
    <main className="our-story-page">
      <StoryTimeline />
      <StatementOfFaith />
      <CoreValues />
      <OurTeam />

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