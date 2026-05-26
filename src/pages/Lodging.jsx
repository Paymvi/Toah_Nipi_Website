import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const lodgingBuildings = [
  {
    id: "hebron",
    title: "Hebron: The Main Lodge",
    description:
      "Retreat in Hebron, the main lodge, featuring two dormitories fully equipped with bathrooms and showers. The lodge includes spacious meeting areas, five private rooms, and flexible space for groups to gather throughout their stay.",
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
    accordionItems: [
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
              offers meeting space for up to 200 guests, and the top level
              includes five private rooms.
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
              The second level includes a spacious meeting area that can host up
              to 200 people for teaching, worship, meals, games, and group
              sessions.
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
      "Unwind in our three-level Bethel lodge, featuring 10 family-style bedrooms, each with a private bath. Enjoy expansive windows with relaxing lake views, several meeting rooms, a kitchenette, and an open fireplace.",
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
        alt: "Side exterior view of Bethel Lodge",
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
        alt: "Private bathroom inside Bethel Lodge",
      },
      {
        src: "/Bethel-Hallway.webp",
        alt: "Meeting room inside Bethel Lodge",
      },
      {
        src: "/Bethel-Mystery-Room.webp",
        alt: "Bedroom inside Bethel Lodge",
      },
      {
        src: "/Bethel-Bathroom.webp",
        alt: "Bedroom inside Bethel Lodge",
      },
    ],
    accordionItems: [
      {
        id: "layout",
        title: "Layout",
        content: (
          <>
            <p>
              Three story lodge, perfect for large groups and families. ADA accessible.
              The facility includes kitchenette and several meeting rooms... one featuring an open fireplace. 
            </p>

            <p>
              The building includes family-style bedrooms with private baths,
              several meeting rooms, a kitchenette, and a shared fireplace area.
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
            <p>Bethel can host 72 overnight guests:</p>

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
              Bethel includes relaxing lake views, expansive windows, several
              meeting rooms, a kitchenette, and an open fireplace.
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
    "One of our latest additions nestled beside the pond, just a stone's throw away from the water's edge. Relax with six cozy bedrooms, sitting room, and shared common space. Includes meeting space.",
  images: [
    {
      src: "/Dothan.webp",
      alt: "Exterior view of Building Three",
    },
    {
      src: "/Dothan-Porch.webp",
      alt: "Common area inside Building Three",
    },
    {
      src: "/Dothan-Bedroom-Top.webp",
      alt: "Side view of Building Three",
    },
    {
      src: "/Dothan-Bedroom-Top-2.webp",
      alt: "Bedroom inside Building Three",
    },
    {
      src: "/Dothan-Couches-Top.webp",
      alt: "Meeting space inside Building Three",
    },
    {
      src: "/Dothan-Couches-Middle.webp",
      alt: "Common area inside Building Three",
    },
    {
      src: "/Dothan-Room-Bottom.webp",
      alt: "Common area inside Building Three",
    },
    {
      src: "/Dothan-Bathroom.webp",
      alt: "Common area inside Building Three",
    },
  ],
  accordionItems: [
    {
      id: "layout",
      title: "Layout",
      content: (
        <>
          <p>
            Three story building, ideal for smaller groups.
          </p>

          <p>
            The top level includes two bedrooms and sitting room. The middle level features four bunk-style bedrooms, along with two common bathrooms and common space. The bottom level houses a meeting space accommodating 20-30 people.
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
          <p>Dothan can host 22 overnight guests:</p>

          <div className="lodging-spec-list">
            <div>
              <span>2</span>
              <p>2 bedrooms with queen sized beds</p>
            </div>

            <div>
              <span>2</span>
              <p>2 x 4-Person Bunk Bed Rooms</p>
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
            Add special features here, such as lake views, fireplace, kitchenette,
            lounge space, meeting room access, private bathrooms, or nearby
            outdoor spaces.
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
    "Nestled separately from the main camp, ideal for sabbatical lodging, furlough, church leader retreats, planning board retreats, and other small gatherings. Includes full kitchen, dining room, living room, meeting spaces, and a library. Of course, there’s an outdoor firepit and path down to the pond for those bold enough to venture.",
  images: [
    {
      src: "/Guest-House.webp",
      alt: "Exterior view of Building Four",
    },
    // {
    //   src: "/Guest-House-2.webp",
    //   alt: "Side view of Building Four",
    // },
    {
      src: "/Guest-House-Back.webp",
      alt: "Bedroom inside Building Four",
    },
    {
      src: "/Guest-House-Kitchen.webp",
      alt: "Meeting space inside Building Four",
    },
    {
      src: "/Guest-House-Livingroom.webp",
      alt: "Common area inside Building Four",
    },
    {
      src: "/Guest-House-Master-Bedroom.webp",
      alt: "Common area inside Building Four",
    },
    {
      src: "/Guest-House-Couches.webp",
      alt: "Common area inside Building Four",
    },
    {
      src: "/Guest-House-Bunks.webp",
      alt: "Common area inside Building Four",
    },
    {
      src: "/Guest-House-Beds.webp",
      alt: "Common area inside Building Four",
    },
    {
      src: "/Guest-House-Bathroom.webp",
      alt: "Common area inside Building Four",
    },
        {
      src: "/Guest-House-Mystery-Room.webp",
      alt: "Common area inside Building Four",
    },
  ],
  accordionItems: [
    {
      id: "layout",
      title: "Layout",
      content: (
        <>
          <p>
            This private site features a complete set of facilities, including a full kitchen, 
            dining room, living room, meeting spaces, and a library. 
          </p>

          <p>
            Guests can choose to dine at the main dining room or manage their own meals.
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
            <p>The Guest House can host up to 12 overnight guests:</p>

            <div className="lodging-spec-list">
              <div>
                <span>XX</span>
                <p>1 Queen Bed</p>
              </div>

              <div>
                <span>XX</span>
                <p>2 Twin Beds</p>
              </div>


              <div>
                <span>XX</span>
                <p>2 Queen Futon Beds</p>
              </div>

              <div>
                <span>XX</span>
                <p>2 Bunk Beds</p>
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
              Add key features here, such as peaceful views, gathering rooms,
              private bathrooms, porch access, fireplace, kitchenette, or nearby
              trails.
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
      "For those seeking prayerful solitude and reflection in the midst of God's beautiful creation, Toah Nipi offers several independent rustic cottages that fit 3–8 overnight guests. We will gladly assist you in choosing one of these unique housing spots tailored to your specific needs.",
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
    accordionItems: [
      {
        id: "layout",
        title: "Layout",
        content: (
          <>
            <p>
              The rustic cottages are independent lodging spaces set apart from
              the larger lodge buildings, offering a quieter and more private stay.
            </p>

            <p>
              Each cottage has its own unique layout, making them a good fit for
              individuals, couples, families, or small groups looking for a
              simple retreat setting.
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
            <p>The rustic cottages can host 3–8 overnight guests, depending on the cottage.</p>

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
              These cottages are ideal for guests seeking a quieter, more
              reflective stay surrounded by the natural beauty of Toah Nipi.
            </p>

            <p>
              They are especially well-suited for prayer, solitude, family stays,
              small retreats, and guests who want a more private lodging option.
            </p>
          </>
        ),
      },
    ],
  },


];

function LodgeSection({ building }) {
  const [activeImage, setActiveImage] = useState(0);
  const [openItem, setOpenItem] = useState(null);

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
          <h2>{building.title}</h2>

          <p>{building.description}</p>
        </div>

        <div className="lodge-accordion">
          {building.accordionItems.map((item) => {
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
                  <span className="lodge-accordion-icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div className="lodge-accordion-panel">
                  <div className="lodge-accordion-content">{item.content}</div>
                </div>
              </div>
            );
          })}
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
      <section className="lodging-intro reveal-group">
        <p className="lodging-eyebrow">Lodging</p>
        <h1>Stay at Toah Nipi</h1>
        <p>
          Comfortable lodging spaces for retreats, families, churches, and
          groups gathering together in a peaceful camp setting.
        </p>
      </section>

      {lodgingBuildings.map((building) => (
        <LodgeSection building={building} key={building.id} />
      ))}


      <section className="lake-section">
        <div className="lake-content">
          {/* <p className="lake-eyebrow">Ready to learn more?</p> */}

          <div className="lake-heading-box">
            <div className="lake-heading-inner">
              <p className="lake-eyebrow">Ready to learn more?</p>

              <h2>We love hosting student groups, orgs, churches, and families.</h2>
            </div>
          </div>

          <p className="lake-text">
            We are committed to accommodating the <span className="bold-text">unique tastes</span> and <span className="bold-text">special requests</span> of each group.
          </p>

          <Link to="/contact" className="lake-button">
            Connect with us
          </Link>
        </div>
      </section> 


      <section className="site-footer-section">
        <div className="footer-logo-area">
          <img
            src="/toah-nipi-logo-2.png"
            alt="Toah Nipi Christian Retreat Center"
            className="footer-logo-1"
          />

          <p>
            {/* A peaceful Christian retreat center for rest, connection, and renewal. */}
          </p>

          <img
            src="/Secondary-Logo.png"
            alt="Toah Nipi Christian Retreat Center"
            className="footer-logo-2"
          />

        </div>

        
        <Footer />

      </section>
      


    </main>
  );
}