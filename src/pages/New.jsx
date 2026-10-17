import { useEffect, useRef, useState } from "react";

// Draft copy: edit the strings in each content array below.
// Bracketed paragraphs mark details to fill in.
const newsPosts = [
  {
    id: 1,
    title: "Our First Batch of Homemade Apple Cider!",
    date: "September 24, 2026",
    dateTime: "2026-09-24",
    category: "Camp Update",
    image: "/Blog/Carina_apples.jpg",
    excerpt:
      "As we enter the fall season and gather more and more apples from our very own orchard, Toah Nipi has pressed its very first batch of homemade apple cider!",

    content: [
      "(Content Pending! Will release soon!)",
    ],
  },

  {
    id: 2,
    title: "Looking Back on Family Camp 2026",
    date: "August 15, 2026",
    dateTime: "2026-08-15",
    category: "Family Camp",
    image: "/Blog/Zoey+Raph.png",
    excerpt:
      "A look back at another meaningful time of community, outdoor adventure, and time together at Toah Nipi.",

    content: [
      "(Content Pending! Will release soon!)",
    ],
  },

  {
    id: 3,
    title: "What’s New Around Camp",
    date: "July 20, 2026",
    dateTime: "2026-07-20",
    category: "Projects",
    image: "/Blog/Ichthus_Trail_Update.png",
    excerpt:
      "See some of the projects, improvements, and behind-the-scenes work happening throughout the retreat center.",

    content: [
      "(Content Pending! Will release soon!)",
    ],
  },
];

export default function News() {
  const featuredPost = newsPosts[0];
  const remainingPosts = newsPosts.slice(1);

  const [selectedPost, setSelectedPost] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const backdropPointerDownRef = useRef(false);

  useEffect(() => {
    if (!selectedPost) {
      return undefined;
    }

    const dialog = dialogRef.current;

    if (!dialog) {
      return undefined;
    }

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = Math.max(
      0,
      window.innerWidth - document.documentElement.clientWidth
    );

    if (scrollbarWidth > 0) {
      const bodyPadding = Number.parseFloat(
        window.getComputedStyle(body).paddingRight
      ) || 0;

      body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`;
    }

    body.style.overflow = "hidden";

    if (!dialog.open) {
      dialog.showModal();
    }

    dialog.scrollTop = 0;

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      backdropPointerDownRef.current = false;

      if (triggerRef.current?.isConnected) {
        triggerRef.current.focus({ preventScroll: true });
      }
    };
  }, [selectedPost]);

  const openStory = (post, event) => {
    triggerRef.current = event.currentTarget;
    setSelectedPost(post);
  };

  const closeStory = () => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }

    setSelectedPost(null);
  };

  const isOutsideDialog = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    return (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    );
  };

  const handleDialogPointerDown = (event) => {
    backdropPointerDownRef.current =
      event.target === event.currentTarget && isOutsideDialog(event);
  };

  const handleDialogClick = (event) => {
    const clickedBackdrop =
      backdropPointerDownRef.current &&
      event.target === event.currentTarget &&
      isOutsideDialog(event);

    backdropPointerDownRef.current = false;

    if (clickedBackdrop) {
      closeStory();
    }
  };

  return (
    <main className="news-page">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="news-hero">
        <div className="news-hero-overlay" />

        <div className="news-hero-content">
          <p className="news-eyebrow">
            Stories from Toah Nipi
          </p>

          <h1>What's New?</h1>

          <p className="news-hero-description">
            Updates, stories, projects, and moments from life
            around Toah Nipi.
          </p>
        </div>
      </section>


      {/* =====================================================
          FEATURED ARTICLE
      ===================================================== */}
      <section className="news-section news-latest-section">
        <div className="news-section-heading">
          <p>Latest Story</p>
        </div>

        <article className="news-featured">
          <div className="news-featured-image">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
            />
          </div>

          <div className="news-featured-content">
            <div className="news-post-meta">
              <span className="news-category">
                {featuredPost.category}
              </span>

              <time dateTime={featuredPost.dateTime}>
                {featuredPost.date}
              </time>
            </div>

            <h3>{featuredPost.title}</h3>

            <p>{featuredPost.excerpt}</p>

            <button
              type="button"
              className="news-read-more"
              aria-haspopup="dialog"
              aria-controls="news-story-dialog"
              aria-label={`Read story: ${featuredPost.title}`}
              onClick={(event) => openStory(featuredPost, event)}
            >
              Read Story
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </section>


      {/* =====================================================
          MORE NEWS
      ===================================================== */}
      <section className="news-section news-more-section">
        <div className="news-section-heading">
          <p>More Stories</p>
        </div>

        <div className="news-grid">
          {remainingPosts.map((post) => (
            <article className="news-card" key={post.id}>
              <div className="news-card-image">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                />
              </div>

              <div className="news-card-content">
                <div className="news-post-meta">
                  <span className="news-category">
                    {post.category}
                  </span>

                  <time dateTime={post.dateTime}>
                    {post.date}
                  </time>
                </div>

                <h3>{post.title}</h3>

                <p>{post.excerpt}</p>

                <button
                  type="button"
                  className="news-card-link"
                  aria-haspopup="dialog"
                  aria-controls="news-story-dialog"
                  aria-label={`Read story: ${post.title}`}
                  onClick={(event) => openStory(post, event)}
                >
                  Read Story
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* =====================================================
          STORY READER
      ===================================================== */}
      <dialog
        ref={dialogRef}
        id="news-story-dialog"
        className="news-story-dialog"
        aria-labelledby={selectedPost ? "news-story-title" : undefined}
        onPointerDown={handleDialogPointerDown}
        onClick={handleDialogClick}
        onCancel={(event) => {
          event.preventDefault();
          closeStory();
        }}
        onClose={(event) => {
          // Ignore an old close event if Strict Mode has reopened the dialog.
          if (!event.currentTarget.open) {
            setSelectedPost(null);
          }
        }}
      >
        {selectedPost && (
          <>
            <div className="news-story-toolbar">
              <span>Stories from Toah Nipi</span>

              <button
                type="button"
                className="news-story-close"
                onClick={closeStory}
                aria-label="Close story"
              >
                Close
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <article>
              <div className="news-story-image">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                />
              </div>

              <div className="news-story-content">
                <header>
                  <div className="news-post-meta">
                    <span className="news-category">
                      {selectedPost.category}
                    </span>

                    <time dateTime={selectedPost.dateTime}>
                      {selectedPost.date}
                    </time>
                  </div>

                  <h2 id="news-story-title" className="news-story-title">
                    {selectedPost.title}
                  </h2>
                </header>

                <div className="news-story-body">
                  {(selectedPost.content?.length
                    ? selectedPost.content
                    : [selectedPost.excerpt]
                  ).map((paragraph, index) => (
                    <p key={`${selectedPost.id}-${index}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <footer className="news-story-footer">
                  <button
                    type="button"
                    className="news-read-more"
                    onClick={closeStory}
                  >
                    <span aria-hidden="true">←</span>
                    Back to all stories
                  </button>
                </footer>
              </div>
            </article>
          </>
        )}
      </dialog>
    </main>
  );
}
