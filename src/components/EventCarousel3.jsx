import { useRef } from "react";

function EventCarousel3() {
  const carouselRef = useRef(null);

  const projects = [
    {
      label: "Seasonal Experience",
      title: "Christmas Light Walk",
      description:
        "A fully lighted Christmas walk through snowy New England woods, with scenes depicting the story of Jesus’ birth and the hope of creating a meaningful local tradition for generations to come.",
      image: "/ChristmasWalk.jpg",
    },
    {
      label: "Trails",
      title: "Woodland Trail Around the Pond",
      description:
        "Help transform the current woodland trails into well-maintained, easy-to-navigate pathways for peaceful walks around the pond.",
      image: "/Trails.jpeg",
    },
    {
      label: "Gathering Space",
      title: "Outdoor Amphitheatre",
      description:
        "Support a new outdoor amphitheatre between the office and the pond, creating a cost-effective space for conferences, meetings, worship, and teaching in a beautiful natural setting.",
      image: "/OutdoorAmphitheatre.jpg",
    },
    {
      label: "Rest & Reflection",
      title: "Trex Swings",
      description:
        "Help place durable Trex swings throughout Toah Nipi as an invitation to pause, connect with friends, and enjoy the beauty of creation.",
      image: "/TrexSwings.jpg",
    },
    {
      label: "Ongoing Support",
      title: "General Fund",
      description:
        "Help us continue to build, maintain, and care for Toah Nipi so future generations can come meet with God and one another.",
      image: "/SunsetLake.jpg",
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
    <section className="partner-projects-section" id="partner-projects">
      <div className="partner-projects-header">
        <div>
          <p className="partner-eyebrow">Projects & Priorities</p>
          <h2>Support the next chapter of Toah Nipi.</h2>
        </div>

        <p>
          These projects represent practical ways to help care for the property,
          expand ministry opportunities, and create meaningful experiences for
          guests for years to come.
        </p>
      </div>

      <div className="partner-carousel-shell">
        <button
          className="partner-carousel-btn partner-carousel-btn-left"
          onClick={() => scrollCarousel("left")}
          aria-label="Scroll project carousel left"
          type="button"
        >
          ‹
        </button>

        <div className="partner-project-carousel" ref={carouselRef}>
          {projects.map((project) => (
            <article className="partner-project-card" key={project.title}>
              <div className="partner-project-image">
                <img src={project.image} alt={project.title} />
              </div>

              <div className="partner-project-content">
                <span>{project.label}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>

        <button
          className="partner-carousel-btn partner-carousel-btn-right"
          onClick={() => scrollCarousel("right")}
          aria-label="Scroll project carousel right"
          type="button"
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default EventCarousel3;