import StoryTimeline from "../components/StoryTimeline";
import StatementOfFaith from "../components/StatementOfFaith";
import CoreValues from "../components/CoreValues";
import OurTeam from "../components/OurTeam";
import SiteFooter from "../components/SiteFooter";

export default function OurStory() {
  return (
    <main className="our-story-page">
      <StoryTimeline />
      <StatementOfFaith />
      <CoreValues />
      <OurTeam />

      <SiteFooter/>

    </main>


  );
}