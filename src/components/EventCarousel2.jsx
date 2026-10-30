import { useRef } from "react";

function EventCarousel2() {
  const carouselRef = useRef(null);

  const events = [
    {
      title: "Adult Canoe",
      image: "/optimized/FamilyCamp/FC-AdultCanoe.webp",
    },
    {
      title: "Carpet Ball",
      image: "/optimized/FamilyCamp/FC-CarpetBall.webp",
    },
    {
      title: "Face Painting",
      image: "/optimized/FamilyCamp/FC-FacePaint.webp",
    },
    {
      title: "Field Fun",
      image: "/optimized/FamilyCamp/FC-FieldFun.webp",
    },
    {
      title: "Hayride",
      image: "/optimized/FamilyCamp/FC-Hayride.webp",
    },
    {
      title: "Indoor Fun",
      image: "/optimized/FamilyCamp/FC-IndoorFun.webp",
    },
    {
      title: "Kids Canoe",
      image: "/optimized/FamilyCamp/FC-KidsCanoe.webp",
    },
    {
      title: "Kids in the Field",
      image: "/optimized/FamilyCamp/FC-KidsInField.webp",
    },
    {
      title: "Kids Trail",
      image: "/optimized/FamilyCamp/FC-KidsTrail.webp",
    },
    {
      title: "Kite Flying",
      image: "/optimized/FamilyCamp/FC-Kite.webp",
    },
    {
      title: "Pond Fun",
      image: "/optimized/FamilyCamp/FC-LakeFun.webp",
    },
    {
      title: "Pond Fun",
      image: "/optimized/FamilyCamp/FC-LakeFun2.webp",
    },
    {
      title: "Pond Fun",
      image: "/optimized/FamilyCamp/FC-LakeFun3.webp",
    },
    {
      title: "Potato Sack Race",
      image: "/optimized/FamilyCamp/FC-PotatoSack.webp",
    },
    {
      title: "Potato Sack Race",
      image: "/optimized/FamilyCamp/FC-PotatoSack2.webp",
    },
    {
      title: "Soccer",
      image: "/optimized/FamilyCamp/FC-Soccer.webp",
    },
    {
      title: "Soccer",
      image: "/optimized/FamilyCamp/FC-Soccer2.webp",
    },
    {
      title: "Tiger Face Paint",
      image: "/optimized/FamilyCamp/FC-Tiger.webp",
    },
    {
      title: "Tipping Canoe",
      image: "/optimized/FamilyCamp/FC-TippingCanoe.webp",
    },
    {
      title: "Women’s Gathering",
      image: "/optimized/FamilyCamp/FC-Women.webp",
    },
    {
      title: "Carnival",
      image: "/optimized/Carina_Carnival.webp",
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