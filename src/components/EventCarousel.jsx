import { useRef } from "react";

function EventCarousel() {
  const carouselRef = useRef(null);

  const events = [
  {
    title: "30 Acre Spring Fed Pond",
    description:
      "Our pond has a mini beach and is a great place to cool off and relax.",
    image: "/optimized/card/SunsetLake.webp",
  },
  {
    title: "Woodland Hiking Trails",
    description:
      "Explore quiet trails surrounded by trees, fresh air, and peaceful views.",
    image: "/optimized/Trails.webp",
  },
  {
    title: "Firepits & Fireplaces",
    description:
      "Gather around the fire for conversation, warmth, worship, and late-night laughs.",
    image: "/optimized/Fireplace2.webp",
  },
  {
    title: "Sports Areas",
    description:
      "Basketball Court, volleyball court, large field. Suitable for tons of fun!",
    image: "/optimized/Sports2.webp",
  },
  {
    title: "Lake Activities",
    description:
      "Spend time near the water with relaxing views and outdoor adventure.",
    image: "/optimized/Canoe.webp",
  },
  {
    title: "Eating & Community",
    description:
      "Share meals, conversations, and time together around the table.",
    image: "/optimized/Eating.webp",
  },
  {
    title: "Stone Prayer Garden",
    description:
      "Find space to slow down, pray, journal, and reconnect with God.",
    image: "/optimized/card/May-2025-PrayerGarden.webp",
  },
  {
    title: "Broomball",
    description:
      "During the winter, our pond freezes over and becomes the perfect place for a fun game of broomball.",
    image: "/optimized/Broomball2.webp",
  },
  {
    title: "Tubing",
    description:
      "Enjoy snowy tubing hills, friendly races, and plenty of winter fun around camp.",
    image: "/optimized/Tubing.webp",
  },
  {
    title: "Rock Climbing Wall",
    description:
      "Challenge yourself, build confidence, and enjoy a fun climb.",
    image: "/optimized/RockClimbing.webp",
  },
  {
    title: "Snowshoeing",
    description:
      "Explore winter trails with snowshoes available courtesy of Toah Nipi.",
    image: "/optimized/Snow.webp",
  },
  {
    title: "Indoor Games",
    description:
      "Enjoy board games, group activities, and cozy indoor fun with friends.",
    image: "/optimized/Jun-2026-Fuzball.webp",
  },
];

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <div className="event-carousel-wrapper">
      <button
        className="carousel-btn carousel-btn-left"
        onClick={() => scrollCarousel("left")}
        aria-label="Scroll left"
      >
        ‹
      </button>

      <div className="event-carousel" ref={carouselRef}>
        {events.map((event, index) => (
          <article className="event-card" key={index}>
            <div className="event-card-image">
              <img src={event.image} alt={event.title} loading="lazy" decoding="async" />
            </div>

            <div className="event-card-content">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </article>
        ))}
      </div>

      <button
        className="carousel-btn carousel-btn-right"
        onClick={() => scrollCarousel("right")}
        aria-label="Scroll right"
      >
        ›
      </button>
    </div>
  );
}

export default EventCarousel;