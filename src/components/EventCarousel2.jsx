import { useRef } from "react";

function EventCarousel2() {
  const carouselRef = useRef(null);

  const events = [
    {
      title: "Adult Canoe",
      image: "/FamilyCamp/FC-AdultCanoe.webp",
    },
    {
      title: "Carpet Ball",
      image: "/FamilyCamp/FC-CarpetBall.webp",
    },
    {
      title: "Face Painting",
      image: "/FamilyCamp/FC-FacePaint.webp",
    },
    {
      title: "Field Fun",
      image: "/FamilyCamp/FC-FieldFun.webp",
    },
    {
      title: "Hayride",
      image: "/FamilyCamp/FC-Hayride.webp",
    },
    {
      title: "Indoor Fun",
      image: "/FamilyCamp/FC-IndoorFun.webp",
    },
    {
      title: "Kids Canoe",
      image: "/FamilyCamp/FC-KidsCanoe.webp",
    },
    {
      title: "Kids in the Field",
      image: "/FamilyCamp/FC-KidsInField.webp",
    },
    {
      title: "Kids Trail",
      image: "/FamilyCamp/FC-KidsTrail.webp",
    },
    {
      title: "Kite Flying",
      image: "/FamilyCamp/FC-Kite.webp",
    },
    {
      title: "Lake Fun",
      image: "/FamilyCamp/FC-LakeFun.webp",
    },
    {
      title: "Lake Fun",
      image: "/FamilyCamp/FC-LakeFun2.webp",
    },
    {
      title: "Lake Fun",
      image: "/FamilyCamp/FC-LakeFun3.webp",
    },
    {
      title: "Potato Sack Race",
      image: "/FamilyCamp/FC-PotatoSack.webp",
    },
    {
      title: "Potato Sack Race",
      image: "/FamilyCamp/FC-PotatoSack2.webp",
    },
    {
      title: "Soccer",
      image: "/FamilyCamp/FC-Soccer.webp",
    },
    {
      title: "Soccer",
      image: "/FamilyCamp/FC-Soccer2.webp",
    },
    {
      title: "Tiger Face Paint",
      image: "/FamilyCamp/FC-Tiger.webp",
    },
    {
      title: "Tipping Canoe",
      image: "/FamilyCamp/FC-TippingCanoe.webp",
    },
    {
      title: "Women’s Gathering",
      image: "/FamilyCamp/FC-Women.webp",
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
              {/* <h3>{event.title}</h3> */}
              <br/>
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

export default EventCarousel2;