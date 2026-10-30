import { useRef } from "react";

// Class names for each look. "event" cards appear on Home and Events; the
// larger "project" cards are the Support page's giving projects.
const variants = {
  event: {
    shell: "event-carousel-wrapper",
    button: "carousel-btn",
    buttonLabel: "Scroll",
    track: "event-carousel",
    card: "event-card",
    image: "event-card-image",
    content: "event-card-content",
  },
  project: {
    shell: "partner-carousel-shell",
    button: "partner-carousel-btn",
    buttonLabel: "Scroll project carousel",
    track: "partner-project-carousel",
    card: "partner-project-card",
    image: "partner-project-image",
    content: "partner-project-content",
  },
};

// Each item is { image, title, description, label? }. With
// showCaptions={false} only the photo shows, and the title becomes its alt text.
function EventCarousel({ items, variant = "event", showCaptions = true }) {
  const carouselRef = useRef(null);
  const classes = variants[variant];

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <div className={classes.shell}>
      <button
        className={`${classes.button} ${classes.button}-left`}
        onClick={() => scrollCarousel("left")}
        aria-label={`${classes.buttonLabel} left`}
        type="button"
      >
        ‹
      </button>

      <div className={classes.track} ref={carouselRef}>
        {items.map((item) => (
          <article className={classes.card} key={item.image}>
            <div className={classes.image}>
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            </div>

            <div className={classes.content}>
              {showCaptions ? (
                <>
                  {item.label && <span>{item.label}</span>}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </>
              ) : (
                <br />
              )}
            </div>
          </article>
        ))}
      </div>

      <button
        className={`${classes.button} ${classes.button}-right`}
        onClick={() => scrollCarousel("right")}
        aria-label={`${classes.buttonLabel} right`}
        type="button"
      >
        ›
      </button>
    </div>
  );
}

export default EventCarousel;
