import StoryTimeline from "../components/StoryTimeline";
import StatementOfFaith from "../components/StatementOfFaith";
import CoreValues from "../components/CoreValues";
import OurTeam from "../components/OurTeam";
import SiteFooter from "../components/SiteFooter";
import { FaHistory } from "react-icons/fa";
import { LuWaypoints } from "react-icons/lu";

export default function OurStory() {
  return (
    <main className="our-story-page">

      <section
        className="our-story-hero"
        style={{
          "--our-story-hero-image": "url('/Winter-Orange.jpg')",
        }}
      >
        <div className="our-story-hero-overlay" />

        <div className="our-story-hero-content reveal-group">
          <p className="our-story-eyebrow">Our Story</p>

          <h1>
            The Toah Nipi Story
          </h1>

          <p>
          A place shaped by gift, stewardship, and renewal, where generations of retreat ministry tell a story of faithful care, 
          Christian community, and God’s creation shared with others.
          </p>
        </div>
      </section>

      <StoryTimeline />
      <StatementOfFaith />
      <CoreValues />
      <OurTeam />

      <SiteFooter/>

    </main>


  );
}