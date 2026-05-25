import { useRef } from "react";

const timelineItems = [
  {
    year: "1930s",
    title: "Life around the pond",
    image: "/Timeline-pond.webp",
    imageAlt: "Pond at Toah Nipi",
    text: "A neighbor in a dugout canoe fished out from the bottom of the pond, marking one of the earliest remembered stories of this place.",
  },
  {
    year: "1940s",
    title: "Families gathered here",
    image: "/Timeline-Families.webp",
    imageAlt: "Families gathered near the pond",
    text: "Generations of Finnish immigrants enjoyed the pond after settling in New England, making the land a place of rest, recreation, and community.",
  },
  {
    year: "1979",
    title: "A new vision for the land",
    image: "/Timeline-Land.webp",
    imageAlt: "Wooded land at Toah Nipi",
    text: "David Melville acquired the property for logging purposes, then decided it would be better enjoyed as a retreat center. He named only a shed for himself and gave the camp its current name: Toah Nipi.",
  },
  {
    year: "1980",
    title: "Given to the church",
    image: "/Timeline-Church.webp",
    imageAlt: "Church community at Toah Nipi",
    text: "Toah Nipi was given to David Melville’s church, Trinitarian Congregational in Wayland, Massachusetts. Church members and InterVarsity alumni Ernie and Lauraine Bauder began stewarding the camp as its first directors.",
  },
  {
    year: "1990s",
    title: "Growing the camp",
    image: "/Timeline-Construction.webp",
    imageAlt: "Camp construction and renovations",
    text: "The camp underwent multiple construction and renovation projects to increase facilities and housing for guest groups.",
  },
  {
    year: "1993",
    title: "Gifted to InterVarsity",
    image: "/Timeline-Retreat.webp",
    imageAlt: "Retreat gathering at Toah Nipi",
    text: "Toah Nipi was gifted to InterVarsity Christian Ministries, continuing its purpose as a place for Christian retreat, renewal, and community.",
  },
  {
    year: "2024",
    title: "An independent retreat center",
    image: "/Timeline-Today.webp",
    imageAlt: "Toah Nipi retreat center today",
    text: "InterVarsity gifted Toah Nipi to a new board of trustees, making the camp an independent Christian camping and retreat center.",
  },
  {
    year: "Today",
    title: "A continuing gift",
    image: "/camp-background-2.jpg",
    imageAlt: "Guests enjoying Toah Nipi today",
    text: "What began as a gift of God’s creation continues today as a gift to the Toah Nipi board, staff, and guests: a place to meet God, be renewed, and steward the camp for generations to come.",
  },
];

export default function StoryTimeline() {
  const timelineRef = useRef(null);

  const scrollTimeline = (direction) => {
    if (!timelineRef.current) return;

    const scrollAmount = 400;

    timelineRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="story-timeline-section" id="history">
      <div className="story-timeline-header">
        <p className="story-timeline-eyebrow">The Toah Nipi Story</p>

        <h2>
          A place shaped by{" "}
          <span className="story-timeline-highlight">gift, stewardship,</span>{" "}
          and renewal
        </h2>

        <p>
          From quiet days around the pond to generations of retreat ministry,
          Toah Nipi’s story is one of faithful care, community, and God’s
          creation being shared with others.
        </p>
      </div>

      <div className="story-timeline-wrapper">
        <button
          className="story-timeline-btn story-timeline-btn-left"
          type="button"
          aria-label="Scroll timeline left"
          onClick={() => scrollTimeline("left")}
        >
          ‹
        </button>

        <div className="story-timeline-track" ref={timelineRef}>
          {timelineItems.map((item, index) => (
            <article
              className="story-timeline-card"
              key={`${item.year}-${index}`}
            >
              <div className="story-timeline-image-wrap">
                {item.image ? (
                  <img src={item.image} alt={item.imageAlt} />
                ) : (
                  <div className="story-timeline-image-placeholder">
                    Add image
                  </div>
                )}
              </div>

              <div className="story-timeline-dot-wrap">
                <span className="story-timeline-dot" />
              </div>

              <div className="story-timeline-card-content">
                <p className="story-timeline-year">{item.year}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <button
          className="story-timeline-btn story-timeline-btn-right"
          type="button"
          aria-label="Scroll timeline right"
          onClick={() => scrollTimeline("right")}
        >
          ›
        </button>
      </div>

      <p className="story-timeline-hint">Scroll sideways to explore the story</p>
    </section>
  );
}