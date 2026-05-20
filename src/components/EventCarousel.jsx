import { useRef } from "react";

function EventCarousel() {
  const carouselRef = useRef(null);

  const events = [
    {
      title: "Woodland Hiking Trails",
      description:
        "Explore quiet trails surrounded by trees, fresh air, and peaceful views.",
      image: "/hiking-trails.jpg",
    },
    {
      title: "Firepits & Fireplaces",
      description:
        "Gather around the fire for conversation, warmth, worship, and late-night laughs.",
      image: "/firepit.jpg",
    },
    {
      title: "Indoor Games",
      description:
        "Enjoy board games, group activities, and cozy indoor fun with friends.",
      image: "/indoor-games.jpg",
    },
    {
      title: "Lake Activities",
      description:
        "Spend time near the water with relaxing views and outdoor adventure.",
      image: "/lake-activities.jpg",
    },
    {
      title: "Group Retreats",
      description:
        "Make space for reflection, connection, worship, and shared memories.",
      image: "/group-retreats.jpg",
    },
    {
      title: "Cabin Stays",
      description:
        "Rest in simple, peaceful cabins designed for comfort and connection.",
      image: "/cabin-stays.jpg",
    },
    {
      title: "Outdoor Worship",
      description:
        "Gather outside for meaningful worship in a quiet natural setting.",
      image: "/outdoor-worship.jpg",
    },
    {
      title: "Family Programs",
      description:
        "Join family-friendly programs designed for all ages to enjoy together.",
      image: "/family-programs.jpg",
    },
    {
      title: "Quiet Reflection",
      description:
        "Find space to slow down, pray, journal, and reconnect with God.",
      image: "/quiet-reflection.jpg",
    },
    {
      title: "Community Meals",
      description:
        "Share delicious meals and meaningful conversations around the table.",
      image: "/community-meals.jpg",
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