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
    title: "Beach at Toah Nipi",
  },
  {
    src: "/Gallery/Back-Hebron.jpg",
    alt: "Back of Hebron",
    category: "Campus",
    title: "Back of Hebron",
  },
  {
    src: "/Gallery/Hebron-Sunset.jpg",
    alt: "Sunset over Toah Nipi",
    category: "Campus",
    title: "Hebron Sunset",
  },
  {
    src: "/Gallery/May-2024-Canoe.jpg",
    alt: "Lake with canoes",
    category: "Campus",
    title: "Canoes on the Lake",
  },
  {
    src: "/Gallery/Fall-Pic.jpeg",
    alt: "Scenery around Toah Nipi",
    category: "Campus",
    title: "Fall at Toah Nipi",
  },
  {
    src: "/Gallery/Sunset-ish.jpg",
    alt: "Sunset at Toah Nipi",
    category: "Campus",
    title: "Sunset at Toah Nipi",
  },
  {
    src: "/Gallery/Jun-2026-Sunny-Deck.jpg",
    alt: "Sunny deck at Toah Nipi",
    category: "Camp Life",
    title: "Sunny Deck",
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
    title: "Camp Group Photo",
  },
  {
    src: "/Gallery/Pre-Carnival.jpg",
    alt: "Group gathering before the carnival",
    category: "Camp Life",
    title: "Before the Carnival",
  },
  {
    src: "/Gallery/Fire-Gathering.jpg",
    alt: "Guests gathered around a fire",
    category: "Camp Life",
    title: "Fire Gathering",
  },
  {
    src: "/Gallery/May-2024-Dorm.jpg",
    alt: "Dorm Room",
    category: "Camp Life",
    title: "Bethel Room",
  },
  {
    src: "/Gallery/Haystack.jpeg",
    alt: "Haystack at Toah Nipi",
    category: "Camp Life",
    title: "Haystack",
  },
  {
    src: "/Gallery/May-2024-Austin-Lake-2.jpg",
    alt: "Austin Lake at Toah Nipi",
    category: "Camp Life",
    title: "Lake Life",
  },
  {
    src: "/Gallery/Volleyball.JPG",
    alt: "Guests playing volleyball",
    category: "Camp Life",
    title: "Volleyball",
  },
  {
    src: "/Gallery/Aahnix-Lesson.JPG",
    alt: "Aahnix lesson at Toah Nipi",
    category: "Camp Life",
    title: "Outdoor Classroom",
  },
  {
    src: "/Gallery/Teen-Cards.JPG",
    alt: "Teens playing cards",
    category: "Camp Life",
    title: "Card Games",
  },
  {
    src: "/Gallery/Carnival-Gathering.jpeg",
    alt: "Guests gathering at the carnival",
    category: "Camp Life",
    title: "Carnival Gathering",
  },
  {
    src: "/Gallery/Aahnix-seeds.png",
    alt: "Aahnix seed activity at Toah Nipi",
    category: "Camp Life",
    title: "Seed Activity",
  },
  {
    src: "/Gallery/Asian-Karaoke.png",
    alt: "People doing karaoke in the meeting space",
    category: "Camp Life",
    title: "Karaoke",
  },

  {
    src: "/Gallery/Tie-Dye-Boy.JPG",
    alt: "Boy doing a tie-dye activity",
    category: "Camp Life",
    title: "Tie-Dye",
  },
  {
    src: "/Gallery/Carina-Carnival.jpeg",
    alt: "Carina at the carnival",
    category: "Camp Life",
    title: "Carnival",
  },
  {
    src: "/Gallery/Human-Pyramid.jpeg",
    alt: "Guests making a human pyramid",
    category: "Camp Life",
    title: "Human Pyramid",
  },
  {
    src: "/Gallery/May-2024-Abi-Pose.jpg",
    alt: "Abi posing at Toah Nipi",
    category: "Camp Life",
    title: "Basketball",
  },
  // {
  //   src: "/Gallery/Frisbee.JPG",
  //   alt: "Activity at Toah Nipi",
  //   category: "Activities",
  //   title: "Outdoor Adventures",
  // },
  {
    src: "/Gallery/Leaf-Activity.JPG",
    alt: "Leaf activity at Toah Nipi",
    category: "Activities",
    title: "Leaf Activity",
  },
  {
    src: "/Gallery/Ollie-Drawing.JPG",
    alt: "Volunteer drawing on Chalkboard",
    category: "Activities",
    title: "Chalkboard Drawing",
  },





  // ======================================================
  // FOOD
  // ======================================================

  {
    src: "/Gallery/C+A-Apple-Cider.jpg",
    alt: "Apple Cider making",
    category: "Food",
    title: "Making Apple Cider",
  },
  {
    src: "/Gallery/Kitchen.JPG",
    alt: "Kitchen",
    category: "Food",
    title: "The Kitchen",
  },
  {
    src: "/Gallery/Char-Board-1.jpg",
    alt: "Charcuterie board",
    category: "Food",
    title: "Charcuterie Board",
  },
  {
    src: "/Gallery/Breakfast-Bar.JPG",
    alt: "Breakfast bar",
    category: "Food",
    title: "Breakfast Bar",
  },
  {
    src: "/Gallery/Beef-Bowl.jpg",
    alt: "Beef bowl",
    category: "Food",
    title: "Beef Bowl",
  },
  {
    src: "/Gallery/Abi-Apple-Cider.jpg",
    alt: "Staff member with finished Apple Cider",
    category: "Food",
    title: "Finished Apple Cider",
  },
  {
    src: "/Gallery/Meal-Ham-Bread-Corn.jpg",
    alt: "Meal with ham, bread, and corn",
    category: "Food",
    title: "Ham, Potatoes, Bread, Corn, and Gravy",
  },
  {
    src: "/Gallery/Grilling.JPG",
    alt: "Food being grilled",
    category: "Food",
    title: "The Grill",
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


          <p className="gallery-hero__description">
            A glimpse into the places, people,
            meals, and moments that make
            Toah Nipi special.
          </p>
        </div>
      </section>





      <section className="gallery-section">
        <div className="gallery-container">
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