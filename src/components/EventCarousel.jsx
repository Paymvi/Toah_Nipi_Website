import { useRef } from "react";

function EventCarousel() {
  const carouselRef = useRef(null);

  const events = [
    {
      title: "30 Acre Spring Fed Pond",
      description:
        "Join family-friendly programs designed for all ages to enjoy together.",
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
      image: "/Fireplace.jpeg",
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
      title: "Broomball",
      description:
        "Make space for reflection, connection, worship, and shared memories.",
      image: "/Broomball2.png",
    },
    {
      title: "Tubing",
      description:
        "Rest in simple, peaceful cabins designed for comfort and connection.",
      image: "/Tubing.webp",
    },
    {
      title: "Rock Climbing Wall",
      description:
        "Gather outside for meaningful worship in a quiet natural setting.",
      image: "RockClimbing.webp",
    },
    
    {
      title: "Stone Prayer Garden",
      description:
        "Find space to slow down, pray, journal, and reconnect with God.",
      image: "/PrayerGarden3.png",
    },
    {
      title: "Snowshoeing",
      description:
        "Share delicious meals and meaningful conversations around the table.",
      image: "/Snow.png",
    },
    {
      title: "Eating & Community",
      description:
        "Basketball Court, volleyball court, large field. Suitable for tons of fun!",
      image: "/Eating.jpeg",
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