import {
  useEffect,
  useMemo,
  useState,
} from "react";

import SEO from "../components/SEO";

import "../styles/gallery.css";


const categories = [
  "All",
  "Campus",
  "Camp Life",
  "Food",
];


const galleryImages = [
  // ======================================================
  // CAMPUS
  // ======================================================

  {
    src: "/Gallery/Apr-2026-Beach.jpg",
    alt: "Toah Nipi lake area",
    category: "Campus",
    title: "Around Toah Nipi",
  },
  {
    src: "/Gallery/Back-Hebron.jpg",
    alt: "View across the Toah Nipi property",
    category: "Campus",
    title: "The Campus",
  },
  {
    src: "/Gallery/Hebron-Sunset.jpg",
    alt: "Sunset over Toah Nipi",
    category: "Campus",
    title: "Evening at Camp",
  },
  {
    src: "/Gallery/May-2024-Canoe.jpg",
    alt: "Lake with canoes",
    category: "Campus",
    title: "Around Camp",
  },
  {
    src: "/Gallery/Fall-Pic.jpeg",
    alt: "Scenery around Toah Nipi",
    category: "Campus",
    title: "Camp in the Woods",
  },
  {
    src: "/Gallery/Sunset-ish.jpg",
    alt: "Scenery around Toah Nipi",
    category: "Campus",
    title: "Camp in the Woods",
  },
  {
    src: "/Gallery/Jun-2026-Sunny-Deck.jpg",
    alt: "Group gathering at Toah Nipi",
    category: "Camp Life",
    title: "Community",
  },
  // {
  //   src: "/Gallery/Winter.jpg",
  //   alt: "Group gathering at Toah Nipi",
  //   category: "Camp Life",
  //   title: "Community",
  // },


  // ======================================================
  // CAMP LIFE
  // ======================================================

  {
    src: "/Gallery/Raph-Group-1.jpg",
    alt: "Guests spending time together at Toah Nipi",
    category: "Camp Life",
    title: "Time Together",
  },
  {
    src: "/Gallery/Pre-Carnival.jpg",
    alt: "Group gathering at Toah Nipi",
    category: "Camp Life",
    title: "Community",
  },
  {
    src: "/Gallery/Fire-Gathering.jpg",
    alt: "Guests enjoying camp together",
    category: "Camp Life",
    title: "Camp Life",
  },
  {
    src: "/Gallery/May-2024-Dorm.jpg",
    alt: "Dorm Room",
    category: "Camp Life",
    title: "Together at Camp",
  },
  {
    src: "/Gallery/Haystack.jpeg",
    alt: "Guests gathering outside at Toah Nipi",
    category: "Camp Life",
    title: "Gather Together",
  },
  {
    src: "/Gallery/May-2024-Austin-Lake-2.jpg",
    alt: "Guests enjoying time together",
    category: "Camp Life",
    title: "Shared Moments",
  },
  {
    src: "/Gallery/Volleyball.JPG",
    alt: "Community gathering at Toah Nipi",
    category: "Camp Life",
    title: "Life Together",
  },
  {
    src: "/Gallery/Aahnix-Lesson.JPG",
    alt: "Guests enjoying a retreat at Toah Nipi",
    category: "Camp Life",
    title: "Retreat Life",
  },
  {
    src: "/Gallery/Teen-Cards.JPG",
    alt: "Friends together during a retreat",
    category: "Camp Life",
    title: "Camp Memories",
  },
  {
    src: "/Gallery/Carnival-Gathering.jpeg",
    alt: "Guests spending time together around camp",
    category: "Camp Life",
    title: "Moments Together",
  },
  {
    src: "/Gallery/Aahnix-seeds.png",
    alt: "Group enjoying time together at Toah Nipi",
    category: "Camp Life",
    title: "Community at Camp",
  },
  {
    src: "/Gallery/Asian-Karaoke.png",
    alt: "People doing karaoke in the meeting space",
    category: "Camp Life",
    title: "A Day at Toah Nipi",
  },

  {
    src: "/Gallery/Tie-Dye-Boy.JPG",
    alt: "Activity at Toah Nipi",
    category: "Camp Life",
    title: "Outdoor Adventures",
  },
  {
    src: "/Gallery/Carina-Carnival.jpeg",
    alt: "Guests participating in an activity",
    category: "Camp Life",
    title: "Things to Do",
  },
  {
    src: "/Gallery/Human-Pyramid.jpeg",
    alt: "Recreation at Toah Nipi",
    category: "Camp Life",
    title: "Explore Together",
  },
  {
    src: "/Gallery/May-2024-Abi-Pose.jpg",
    alt: "Guests enjoying an outdoor activity",
    category: "Camp Life",
    title: "Outside Together",
  },
  // {
  //   src: "/Gallery/Frisbee.JPG",
  //   alt: "Activity at Toah Nipi",
  //   category: "Activities",
  //   title: "Outdoor Adventures",
  // },
  {
    src: "/Gallery/Leaf-Activity.JPG",
    alt: "Activity at Toah Nipi",
    category: "Activities",
    title: "Outdoor Adventures",
  },
  {
    src: "/Gallery/Ollie-Drawing.JPG",
    alt: "Volunteer drawing on Chalkboard",
    category: "Activities",
    title: "Something for Everyone",
  },


  // ======================================================
  // FOOD
  // ======================================================

  {
    src: "/Gallery/C+A-Apple-Cider.jpg",
    alt: "Apple Cider making",
    category: "Food",
    title: "Around the Table",
  },
  {
    src: "/Gallery/Kitchen.JPG",
    alt: "Kitchen",
    category: "Food",
    title: "Made at Camp",
  },
  {
    src: "/Gallery/Char-Board-1.jpg",
    alt: "Guests sharing a meal",
    category: "Food",
    title: "Meals Together",
  },
  {
    src: "/Gallery/Breakfast-Bar.JPG",
    alt: "Meal served",
    category: "Food",
    title: "Camp Meals",
  },
  {
    src: "/Gallery/Beef-Bowl.jpg",
    alt: "Meal served",
    category: "Food",
    title: "Gathered Around the Table",
  },
  {
    src: "/Gallery/Abi-Apple-Cider.jpg",
    alt: "Staff member with finished Apple Cider",
    category: "Food",
    title: "From the Kitchen",
  },
  {
    src: "/Gallery/Meal-Ham-Bread-Corn.jpg",
    alt: "Meal served",
    category: "Food",
    title: "Camp Meals",
  },
  {
    src: "/Gallery/Grilling.JPG",
    alt: "Meal served",
    category: "Food",
    title: "Camp Meals",
  },


  // // ======================================================
  // // LODGING
  // // ======================================================

  // {
  //   src: "/Gallery/lodging-1.jpg",
  //   alt: "Lodging building at Toah Nipi",
  //   category: "Lodging",
  //   title: "Places to Stay",
  // },
  // {
  //   src: "/Gallery/lodging-2.jpg",
  //   alt: "Guest room at Toah Nipi",
  //   category: "Lodging",
  //   title: "A Place to Rest",
  // },
  // {
  //   src: "/Gallery/lodging-3.jpg",
  //   alt: "Toah Nipi lodging surrounded by woods",
  //   category: "Lodging",
  //   title: "Stay in the Woods",
  // },
  // {
  //   src: "/Gallery/lodging-4.jpg",
  //   alt: "Guest lodging at Toah Nipi",
  //   category: "Lodging",
  //   title: "Your Home at Camp",
  // },
  // {
  //   src: "/Gallery/lodging-5.jpg",
  //   alt: "Inside one of the Toah Nipi lodging spaces",
  //   category: "Lodging",
  //   title: "Room to Rest",
  // },
  // {
  //   src: "/Gallery/lodging-6.jpg",
  //   alt: "Lodging surrounded by the Toah Nipi property",
  //   category: "Lodging",
  //   title: "Retreat in the Woods",
  // },


];


export default function Gallery() {
  const [
    activeCategory,
    setActiveCategory,
  ] = useState("All");

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);


  const filteredImages = useMemo(() => {
    if (activeCategory === "All") {
      return galleryImages;
    }

    return galleryImages.filter(
      (image) => image.category === activeCategory
    );
  }, [activeCategory]);


  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedImage]);


  return (
    <main className="gallery-page">
      <SEO
        title="Gallery"
        description="Explore photos from Toah Nipi Christian Retreat Center, including our campus, camp life, food, lodging, and activities."
        path="/gallery"
      />


      <section className="gallery-hero">
        <div className="gallery-hero__overlay" />

        <div className="gallery-hero__content">
          <p className="gallery-hero__eyebrow">
            Life at Toah Nipi
          </p>

          <h1>Gallery</h1>

          <p>
            A glimpse into the places, people,
            meals, and moments that make
            Toah Nipi special.
          </p>
        </div>
      </section>


      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-intro">
            <div>
              <p className="gallery-intro__eyebrow">
                Explore
              </p>

              <h2>
                See life around camp
              </h2>
            </div>

            <p className="gallery-intro__text">
              From quiet mornings in the woods
              to meals around the table and
              afternoons spent outside, explore
              some of our favorite moments from
              around Toah Nipi.
            </p>
          </div>


          <div
            className="gallery-filters"
            role="group"
            aria-label="Filter gallery by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`gallery-filter ${
                  activeCategory === category
                    ? "gallery-filter--active"
                    : ""
                }`}
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>
            ))}
          </div>


          <div
            className="gallery-grid"
            key={activeCategory}
          >
            {filteredImages.map(
              (image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  className="gallery-card"
                  onClick={() =>
                    setSelectedImage(image)
                  }
                  aria-label={`Open ${image.title}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />

                  <div className="gallery-card__overlay">
                    <div className="gallery-card__text">
                      <span>
                        {image.category}
                      </span>

                      <h3>
                        {image.title}
                      </h3>
                    </div>

                    <span
                      className="gallery-card__view"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </section>


      {selectedImage && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() =>
            setSelectedImage(null)
          }
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={() =>
              setSelectedImage(null)
            }
            aria-label="Close image"
          >
            ×
          </button>

          <div
            className="gallery-lightbox__content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
            />

            <div className="gallery-lightbox__caption">
              <span>
                {selectedImage.category}
              </span>

              <h2>
                {selectedImage.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}