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
  "Lodging",
  "Activities",
];


const galleryImages = [
  {
    src: "/Gallery/campus-1.jpg",
    alt: "Toah Nipi campus surrounded by trees",
    category: "Campus",
    title: "Around Toah Nipi",
  },
  {
    src: "/Gallery/campus-2.jpg",
    alt: "View across the Toah Nipi property",
    category: "Campus",
    title: "The Campus",
  },
  {
    src: "/Gallery/campus-3.jpg",
    alt: "Sunset over Toah Nipi",
    category: "Campus",
    title: "Evening at Camp",
  },


  {
    src: "/Gallery/camp-life-1.jpg",
    alt: "Guests spending time together at Toah Nipi",
    category: "Camp Life",
    title: "Time Together",
  },
  {
    src: "/Gallery/camp-life-2.jpg",
    alt: "Group gathering at Toah Nipi",
    category: "Camp Life",
    title: "Community",
  },
  {
    src: "/Gallery/camp-life-3.jpg",
    alt: "Guests enjoying camp together",
    category: "Camp Life",
    title: "Camp Life",
  },


  {
    src: "/Gallery/food-1.jpg",
    alt: "Meal prepared at Toah Nipi",
    category: "Food",
    title: "Around the Table",
  },
  {
    src: "/Gallery/food-2.jpg",
    alt: "Fresh food served at Toah Nipi",
    category: "Food",
    title: "Made at Camp",
  },
  {
    src: "/Gallery/food-3.jpg",
    alt: "Guests sharing a meal",
    category: "Food",
    title: "Meals Together",
  },


  {
    src: "/Gallery/lodging-1.jpg",
    alt: "Lodging building at Toah Nipi",
    category: "Lodging",
    title: "Places to Stay",
  },
  {
    src: "/Gallery/lodging-2.jpg",
    alt: "Guest room at Toah Nipi",
    category: "Lodging",
    title: "A Place to Rest",
  },
  {
    src: "/Gallery/lodging-3.jpg",
    alt: "Toah Nipi lodging surrounded by woods",
    category: "Lodging",
    title: "Stay in the Woods",
  },


  {
    src: "/Gallery/activity-1.jpg",
    alt: "Outdoor activity at Toah Nipi",
    category: "Activities",
    title: "Outdoor Adventures",
  },
  {
    src: "/Gallery/activity-2.jpg",
    alt: "Guests participating in an activity",
    category: "Activities",
    title: "Things to Do",
  },
  {
    src: "/Gallery/activity-3.jpg",
    alt: "Recreation at Toah Nipi",
    category: "Activities",
    title: "Explore Together",
  },
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