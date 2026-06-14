import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SiteFooter from "../components/SiteFooter";
import LodgingComparison from "../components/LodgingComparison";
import SEO from "../components/SEO";

const lodgingBuildings = [
  {
    id: "hebron",
    title: "Hebron: The Main Lodge",
    description:
      "Hebron is our main lodge for larger retreats, with dorm-style lodging, private rooms, and a central meeting space for group gatherings.",
    images: [
      {
        src: "/camp-background-2.jpg",
        alt: "Exterior view of Hebron Lodge",
      },
      {
        src: "/May-2025-Hebron.jpg",
        alt: "Front exterior view of Hebron Lodge",
      },
      {
        src: "/Hebron-Back.webp",
        alt: "Back exterior view of Hebron Lodge",
      },
      {
        src: "/Hebron-Dining.webp",
        alt: "Dining space inside Hebron Lodge",
      },
      {
        src: "/Hebron-TablesRoom-1.webp",
        alt: "Meeting room inside Hebron Lodge",
      },
      {
        src: "/Hebron-TablesRoom-2.webp",
        alt: "Large table room inside Hebron Lodge",
      },
      {
        src: "/Hebron-SessionRoom.webp",
        alt: "Session room inside Hebron Lodge",
      },
      {
        src: "/Hebron-Inside-Front.webp",
        alt: "Interior entrance of Hebron Lodge",
      },
    ],
    facts: [
      { label: "Sleeps", value: "66 guests" },
      { label: "Rooms", value: "2 dormitories + 5 private rooms" },
      { label: "Bathrooms", value: "Dorm bathrooms and showers" },
      { label: "Meeting Space", value: "Up to 200 guests" },
    ],
    details: [
      {
        id: "layout",
        title: "Layout",
        content: (
          <>
            <p>
              Hebron is a three-story lodge designed for larger overnight
              retreats and shared gathering space.
            </p>

            <p>
              The bottom level includes bunk-style dormitories, the second level
              offers a large meeting area, and the top level includes five
              private rooms.
            </p>
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
                <p>
                  26-person bunk-style dormitories, each with bathrooms and
                  showers
                </p>
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
              The second level includes a spacious meeting area for teaching,
              worship, meals, games, and group sessions.
            </p>
          </>
        ),
      },
    ],
  },

  {
    id: "bethel",
    title: "Bethel: Family Style",
    description:
      "Bethel is a three-level lodge with family-style bedrooms, private bathrooms, lake views, meeting rooms, a kitchenette, and an open fireplace.",
    images: [
      {
        src: "/Bethel.webp",
        alt: "Exterior view of Bethel Lodge",
      },
      {
        src: "/Bethel-2.webp",
        alt: "Exterior view of Bethel Lodge",
      },
      {
        src: "/Bethel-Back-2.webp",
        alt: "Exterior view of Bethel Lodge",
      },
      {
        src: "/Bethel-Common-Room.webp",
        alt: "Common room inside Bethel Lodge",
      },
      {
        src: "/Bethel-Top.webp",
        alt: "Lake view from Bethel Lodge",
      },
      {
        src: "/Bethel-Room.webp",
        alt: "Bedroom inside Bethel Lodge",
      },
      {
        src: "/Bethel-Room-2.webp",
        alt: "Bedroom inside Bethel Lodge",
      },
      {
        src: "/Bethel-Wood-Room.webp",
        alt: "Bedroom inside Bethel Lodge",
      },
      {
        src: "/Bethel-Hallway.webp",
        alt: "Hallway inside Bethel Lodge",
      },
      {
        src: "/Bethel-Mystery-Room.webp",
        alt: "Bedroom inside Bethel Lodge",
      },
      {
        src: "/Bethel-Bathroom.webp",
        alt: "Bathroom inside Bethel Lodge",
      },
    ],
    facts: [
      { label: "Sleeps", value: "72 guests" },
      { label: "Rooms", value: "10 family-style bedrooms" },
      { label: "Bathrooms", value: "Private bathrooms" },
      { label: "Features", value: "Lake views, kitchenette, fireplace" },
    ],
    details: [
      {
        id: "layout",
        title: "Layout",
        content: (
          <>
            <p>
              Bethel is a three-story lodge suited for families, large groups,
              and retreats that benefit from private bathrooms.
            </p>

            <p>
              The building includes family-style bedrooms, several meeting rooms,
              a kitchenette, and a shared fireplace area.
            </p>
          </>
        ),
      },
      {
        id: "guests",
        title: "Number of Guests",
        content: (
          <>
            <p>Bethel can host 72 overnight guests.</p>

            <div className="lodging-spec-list">
              <div>
                <span>10</span>
                <p>Family-style bedrooms, each with a private bathroom</p>
              </div>

              <div>
                <span>3</span>
                <p>Three levels of lodging and gathering space</p>
              </div>
            </div>
          </>
        ),
      },
      {
        id: "features",
        title: "Features",
        content: (
          <>
            <p>
              Bethel includes lake views, expansive windows, several meeting
              rooms, a kitchenette, and an open fireplace.
            </p>
          </>
        ),
      },
    ],
  },

  {
    id: "dothan",
    title: "Dothan: Small Groups",
    description:
      "Dothan is a pond-side lodge for smaller groups, with six bedrooms, shared common space, and a lower-level meeting room.",
    images: [
      {
        src: "/Dothan.webp",
        alt: "Exterior view of Dothan",
      },
      {
        src: "/Dothan-Porch.webp",
        alt: "Porch at Dothan",
      },
      {
        src: "/Dothan-Bedroom-Top.webp",
        alt: "Bedroom inside Dothan",
      },
      {
        src: "/Dothan-Bedroom-Top-2.webp",
        alt: "Bedroom inside Dothan",
      },
      {
        src: "/Dothan-Couches-Top.webp",
        alt: "Sitting room inside Dothan",
      },
      {
        src: "/Dothan-Couches-Middle.webp",
        alt: "Common space inside Dothan",
      },
      {
        src: "/Dothan-Room-Bottom.webp",
        alt: "Meeting room inside Dothan",
      },
      {
        src: "/Dothan-Bathroom.webp",
        alt: "Bathroom inside Dothan",
      },
    ],
    facts: [
      { label: "Sleeps", value: "22 guests" },
      { label: "Rooms", value: "6 bedrooms" },
      { label: "Bathrooms", value: "2 common bathrooms" },
      { label: "Meeting Space", value: "20–30 people" },
    ],
    details: [
      {
        id: "layout",
        title: "Layout",
        content: (
          <>
            <p>
              Dothan is a three-story building beside the pond, ideal for smaller
              groups and quieter retreats.
            </p>

            <p>
              The top level includes two bedrooms and a sitting room. The middle
              level includes four bunk-style bedrooms, two common bathrooms, and
              shared common space. The bottom level includes meeting space.
            </p>
          </>
        ),
      },
      {
        id: "guests",
        title: "Number of Guests",
        content: (
          <>
            <p>Dothan can host 22 overnight guests.</p>

            <div className="lodging-spec-list">
              <div>
                <span>2</span>
                <p>Two bedrooms with queen-sized beds</p>
              </div>

              <div>
                <span>4</span>
                <p>Four bunk-style bedrooms on the middle level</p>
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
              The bottom level includes meeting space for approximately 20–30
              people.
            </p>
          </>
        ),
      },
    ],
  },

  {
    id: "guest-house",
    title: "The Guest House",
    description:
      "The Guest House is a more private lodging option with a kitchen, dining room, living room, meeting spaces, and a library.",
    images: [
      {
        src: "/Guest-House.webp",
        alt: "Exterior view of the Guest House",
      },
      {
        src: "/Guest-House-Back.webp",
        alt: "Back exterior view of the Guest House",
      },
      {
        src: "/Guest-House-Kitchen.webp",
        alt: "Kitchen inside the Guest House",
      },
      {
        src: "/Guest-House-Livingroom.webp",
        alt: "Living room inside the Guest House",
      },
      {
        src: "/Guest-House-Master-Bedroom.webp",
        alt: "Bedroom inside the Guest House",
      },
      {
        src: "/Guest-House-Couches.webp",
        alt: "Seating area inside the Guest House",
      },
      {
        src: "/Guest-House-Bunks.webp",
        alt: "Bunk room inside the Guest House",
      },
      {
        src: "/Guest-House-Beds.webp",
        alt: "Bedroom inside the Guest House",
      },
      {
        src: "/Guest-House-Bathroom.webp",
        alt: "Bathroom inside the Guest House",
      },
      {
        src: "/Guest-House-Mystery-Room.webp",
        alt: "Room inside the Guest House",
      },
    ],
    facts: [
      { label: "Sleeps", value: "Up to 12 guests" },
      { label: "Kitchen", value: "Full kitchen" },
      { label: "Common Space", value: "Dining room and living room" },
      { label: "Features", value: "Library and meeting spaces" },
    ],
    details: [
      {
        id: "layout",
        title: "Layout",
        content: (
          <>
            <p>
              The Guest House is set apart from the main camp and includes a
              kitchen, dining room, living room, meeting spaces, and a library.
            </p>

            <p>
              Guests may choose to dine at the main dining room or manage their
              own meals.
            </p>
          </>
        ),
      },
      {
        id: "guests",
        title: "Number of Guests",
        content: (
          <>
            <p>The Guest House can host up to 12 overnight guests.</p>

            <div className="lodging-spec-list">
              <div>
                <span>1</span>
                <p>Queen bed</p>
              </div>

              <div>
                <span>2</span>
                <p>Twin beds</p>
              </div>

              <div>
                <span>2</span>
                <p>Queen futon beds</p>
              </div>

              <div>
                <span>2</span>
                <p>Bunk beds</p>
              </div>
            </div>
          </>
        ),
      },
      {
        id: "features",
        title: "Features",
        content: (
          <>
            <p>
              The Guest House is a good fit for sabbaticals, furloughs, church
              leader retreats, planning retreats, and other small gatherings.
            </p>
          </>
        ),
      },
    ],
  },

  {
    id: "rustic-cottages",
    title: "The Rustic Cottages",
    description:
      "Our rustic cottages offer quieter, simpler lodging for personal retreats, families, couples, and small groups.",
    images: [
      {
        src: "/Ajalon.png",
        alt: "Exterior view of a rustic cottage at Toah Nipi",
      },
      {
        src: "/Bezer.webp",
        alt: "Second rustic cottage at Toah Nipi",
      },
      {
        src: "/Capurnum.webp",
        alt: "Rustic cottage surrounded by trees",
      },
    ],
    facts: [
      { label: "Sleeps", value: "3–8 guests" },
      { label: "Style", value: "Independent cottages" },
      { label: "Layout", value: "Varies by cottage" },
      { label: "Best For", value: "Prayer, solitude, and simple stays" },
    ],
    details: [
      {
        id: "layout",
        title: "Layout",
        content: (
          <>
            <p>
              The rustic cottages are independent lodging spaces set apart from
              the larger lodge buildings.
            </p>

            <p>
              Each cottage has its own unique layout, making them a good fit for
              individuals, couples, families, or small groups.
            </p>
          </>
        ),
      },
      {
        id: "guests",
        title: "Number of Guests",
        content: (
          <>
            <p>
              The rustic cottages can host 3–8 overnight guests, depending on
              the cottage.
            </p>

            <div className="lodging-spec-list">
              <div>
                <span>3–8</span>
                <p>Overnight guests per cottage</p>
              </div>

              <div>
                <span>Several</span>
                <p>Independent cottage options available</p>
              </div>
            </div>
          </>
        ),
      },
      {
        id: "features",
        title: "Features",
        content: (
          <>
            <p>
              These cottages are especially well-suited for prayer, solitude,
              family stays, small retreats, and guests who want a more private
              lodging option.
            </p>
          </>
        ),
      },
    ],
  },
];

function LodgeSection({ building }) {
  const [activeImage, setActiveImage] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const detailsPanelId = `${building.id}-details-panel`;

  const goToPreviousImage = () => {
    setActiveImage((current) =>
      current === 0 ? building.images.length - 1 : current - 1
    );
  };

  const goToNextImage = () => {
    setActiveImage((current) =>
      current === building.images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="lodge-feature-section" id={building.id}>
      <div className="lodge-gallery reveal-image">
        <div className="lodge-main-image-wrap">
          <img
            src={building.images[activeImage].src}
            alt={building.images[activeImage].alt}
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
          {building.images.map((image, index) => (
            <button
              className={`lodge-thumbnail ${
                activeImage === index ? "lodge-thumbnail-active" : ""
              }`}
              type="button"
              key={`${building.id}-${image.src}-${index}`}
              onClick={() => setActiveImage(index)}
              aria-label={`View ${building.title} image ${index + 1}`}
            >
              <img src={image.src} alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="lodge-info">
        <div className="lodge-copy">
          <p className="lodge-section-label">Lodging Option</p>

          <h2>{building.title}</h2>

          <p>{building.description}</p>

          <div className="lodge-quick-facts">
            {building.facts.map((fact) => (
              <article className="lodge-quick-fact" key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </article>
            ))}
          </div>

          <div
            className={`lodge-more-details ${
              detailsOpen ? "lodge-more-details-open" : ""
            }`}
          >
            <button
              className="lodge-more-details-trigger"
              type="button"
              onClick={() => setDetailsOpen((current) => !current)}
              aria-expanded={detailsOpen}
              aria-controls={detailsPanelId}
            >
              <span>More details</span>
              <span className="lodge-more-details-icon" aria-hidden="true">
                {detailsOpen ? "−" : "+"}
              </span>
            </button>

            <div className="lodge-more-details-panel" id={detailsPanelId}>
              <div className="lodge-more-details-inner">
                {building.details.map((item) => (
                  <article className="lodge-more-details-block" key={item.id}>
                    <h3>{item.title}</h3>
                    <div>{item.content}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <Link to="/contact" className="lodge-inquiry-link">
            Ask about this space <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Lodging() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace("#", "");
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location]);

  return (
    <main className="lodging-page">

      <SEO
        title="Lodging for Retreats in New Hampshire"
        description="Stay at Toah Nipi in Rindge, NH with lodging for churches, families, ministries, and retreat groups, including Hebron, Bethel, Dothan, cottages, and the Guest House."
        path="/lodging"
      />

      <section className="lodging-hero">
        <div className="lodging-hero-overlay" />

        <div className="lodging-hero-content reveal-group">
          <p className="lodging-eyebrow lodging-eyebrow-light">Lodging</p>

          <h1>
            Stay at <span>Toah Nipi.</span>
          </h1>

          <p>
            Comfortable lodging spaces for retreats, families, churches, and
            groups gathering together in a peaceful camp setting.
          </p>

          <a
            href="/Paper-Map.png"
            download="Toah-Nipi-Camp-Map.png"
            className="lodging-map-button"
          >
            Download Camp Map
          </a>
        </div>
      </section>

      <LodgingComparison />

      {lodgingBuildings.map((building) => (
        <LodgeSection building={building} key={building.id} />
      ))}

      <section className="lake-section">
        <div className="lake-content">
          <div className="lake-heading-box">
            <div className="lake-heading-inner">
              <p className="lake-eyebrow">Ready to learn more?</p>

              <h2>We love hosting student groups, churches, and families.</h2>
            </div>
          </div>

          <p className="lake-text">
            We are committed to accommodating the{" "}
            <span className="bold-text">unique needs</span> and{" "}
            <span className="bold-text">special requests</span> of each group.
          </p>

          <Link to="/contact" className="lake-button">
            Connect with us
          </Link>
        </div>
      </section>

      <SiteFooter/>

    </main>
  );
}