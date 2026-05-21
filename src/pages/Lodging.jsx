import { useState } from "react";


const lodgeImages = [
  {
    // /hebron-main.jpg
    src: "camp-background-2.jpg",
    alt: "Exterior view of Hebron Lodge",
  },
  {
    // /hebron-main.jpg
    src: "Hebron-Front.jpeg",
    alt: "Exterior view of Hebron Lodge",
  },
  {
    src: "/Hebron-Back.webp",
    alt: "Bunk-style dormitory inside Hebron Lodge",
  },
  {
    src: "/Hebron-Dining.webp",
    alt: "Outdoor area near Hebron Lodge",
  },
  {
    src: "/Hebron-TablesRoom-1.webp",
    alt: "Bunk-style dormitory inside Hebron Lodge",
  },
  {
    src: "/Hebron-TablesRoom-2.webp",
    alt: "Bunk-style dormitory inside Hebron Lodge",
  },
  {
    src: "/Hebron-SessionRoom.webp",
    alt: "Bunk-style dormitory inside Hebron Lodge",
  },
  {
    src: "/Hebron-Inside-Front.webp",
    alt: "Dining or meeting space inside Hebron Lodge",
  },
  {
    src: "/hebron-meeting.jpg",
    alt: "Large meeting room inside Hebron Lodge",
  },
];

const accordionItems = [
  {
    id: "layout",
    title: "Layout",
    content: (
      <>
        <p>
          Hebron is a three-story main lodge designed for large groups,
          overnight retreats, and shared gathering space.
        </p>

        <p>
          The bottom level includes bunk-style dormitories, the second level
          offers meeting space for up to 200 guests, and the top level includes
          five private rooms.
        </p>

        <a href="#" className="lodging-link">
          View the floor plan
        </a>
      </>
    ),
  },
  {
    id: "guests",
    title: "Number of Guests",
    content: (
      <>
        <p>Hebron can host 66 overnight guests.</p>

        <div className="lodging-spec-list">
          <div>
            <span>2</span>
            <p>26-person bunk-style dormitories, each with bathrooms and showers</p>
          </div>

          <div>
            <span>5</span>
            <p>Private rooms located on the top level</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "meeting",
    title: "Meeting Space",
    content: (
      <>
        <p>
          The second level includes a spacious meeting area that can host up to
          200 people for teaching, worship, meals, games, and group sessions.
        </p>
      </>
    ),
  },
];

export default function Lodging() {
  const [activeImage, setActiveImage] = useState(0);
  const [openItem, setOpenItem] = useState("guests");

  const goToPreviousImage = () => {
    setActiveImage((current) =>
      current === 0 ? lodgeImages.length - 1 : current - 1
    );
  };

  const goToNextImage = () => {
    setActiveImage((current) =>
      current === lodgeImages.length - 1 ? 0 : current + 1
    );
  };

  return (
    <main className="lodging-page">
      <section className="lodging-intro">
        {/* <p className="lodging-eyebrow">Lodging</p>
        <h1>Hebron Lodge</h1>
        <p>
          A welcoming lodge space for overnight retreats, large groups, and
          meaningful time together at Toah Nipi.
        </p> */}
      </section>

      <section className="lodge-feature-section">
        <div className="lodge-gallery">
          <div className="lodge-main-image-wrap">
            <img
              src={lodgeImages[activeImage].src}
              alt={lodgeImages[activeImage].alt}
              className="lodge-main-image"
            />

            <button
              className="gallery-arrow gallery-arrow-left"
              type="button"
              onClick={goToPreviousImage}
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              className="gallery-arrow gallery-arrow-right"
              type="button"
              onClick={goToNextImage}
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          <div className="lodge-thumbnail-row">
            {lodgeImages.map((image, index) => (
              <button
                className={`lodge-thumbnail ${
                  activeImage === index ? "lodge-thumbnail-active" : ""
                }`}
                type="button"
                key={image.src}
                onClick={() => setActiveImage(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img src={image.src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="lodge-info">
          <div className="lodge-copy">
            <h2>Hebron: The Main Lodge</h2>

            <p>
              Retreat in Hebron, the main lodge, featuring two dormitories fully
              equipped with bathrooms and showers. The lodge includes spacious
              meeting areas, five private rooms, and flexible space for groups
              to gather throughout their stay.
            </p>
          </div>

          <div className="lodge-accordion">
            {accordionItems.map((item) => {
              const isOpen = openItem === item.id;

              return (
                <div
                  className={`lodge-accordion-item ${
                    isOpen ? "lodge-accordion-item-open" : ""
                  }`}
                  key={item.id}
                >
                  <button
                    className="lodge-accordion-trigger"
                    type="button"
                    onClick={() =>
                      setOpenItem((current) =>
                        current === item.id ? null : item.id
                      )
                    }
                    aria-expanded={isOpen}
                  >
                    <span>{item.title}</span>
                    <span className="lodge-accordion-icon">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div className="lodge-accordion-panel">
                    <div className="lodge-accordion-content">
                      {item.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}