import { useRef } from "react";

function EventCarousel() {
  const carouselRef = useRef(null);

  const events = [
  {
    title: "30 Acre Spring Fed Pond",
    description:
      "Our pond has a mini beach and is a great place to cool off and relax.",
    image: "/SunsetLake.jpg",
  },
  {
    title: "Woodland Hiking Trails",
    description:
      "Explore quiet trails surrounded by trees, fresh air, and peaceful views.",
    image: "/Trails.jpeg",
  },
  {
    title: "Firepits & Fireplaces",
    description:
      "Gather around the fire for conversation, warmth, worship, and late-night laughs.",
    image: "/Fireplace2.png",
  },
  {
    title: "Sports Areas",
    description:
      "Basketball Court, volleyball court, large field. Suitable for tons of fun!",
    image: "/Sports2.png",
  },
  {
    title: "Lake Activities",
    description:
      "Spend time near the water with relaxing views and outdoor adventure.",
    image: "/Canoe.jpeg",
  },
  {
    title: "Eating & Community",
    description:
      "Share meals, conversations, and time together around the table.",
    image: "/Eating.jpeg",
  },
  {
    title: "Stone Prayer Garden",
    description:
      "Find space to slow down, pray, journal, and reconnect with God.",
    image: "/May-2025-PrayerGarden.jpg",
  },
  {
    title: "Broomball",
    description:
      "During the winter, our pond freezes over and becomes the perfect place for a fun game of broomball.",
    image: "/Broomball2.png",
  },
  {
    title: "Tubing",
    description:
      "Enjoy snowy tubing hills, friendly races, and plenty of winter fun around camp.",
    image: "/Tubing.webp",
  },
  {
    title: "Rock Climbing Wall",
    description:
      "Challenge yourself, build confidence, and enjoy a fun climb.",
    image: "/RockClimbing.webp",
  },
  {
    title: "Snowshoeing",
    description:
      "Explore winter trails with snowshoes available courtesy of Toah Nipi.",
    image: "/Snow.png",
  },
  {
    title: "Indoor Games",
    description:
      "Enjoy board games, group activities, and cozy indoor fun with friends.",
    image: "/Uno.jpeg",
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
              <img src={event.image} alt={event.title} />
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