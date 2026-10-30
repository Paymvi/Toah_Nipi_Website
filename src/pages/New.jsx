import { useEffect, useRef, useState } from "react";
import PdfPages from "../components/PdfPages";
import SEO from "../components/SEO";
import stories from "../data/stories";

// Story details live in src/data/stories.js. Each story also has its own
// page at /new/<slug> (src/pages/Story.jsx) for search results and shared
// links; on this page, "Read Story" opens it in the pop-up reader.
export default function News() {
  const featuredPost = stories[0];
  const remainingPosts = stories.slice(1);

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
      <SEO path="/new" />

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
              alt={featuredPost.imageAlt}
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

            <h2>{featuredPost.title}</h2>

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
            <article className="news-card" key={post.slug}>
              <div className="news-card-image">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  decoding="async"
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

                <h2>{post.title}</h2>

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
        className={`news-story-dialog${
          selectedPost?.pdf ? " news-story-dialog--pdf" : ""
        }`}
        style={
          selectedPost?.pdfBackground
            ? { "--pdf-background": selectedPost.pdfBackground }
            : undefined
        }
        aria-labelledby={
          selectedPost && !selectedPost.pdf ? "news-story-title" : undefined
        }
        aria-label={
          selectedPost?.pdf
            ? selectedPost.pdfTitle || selectedPost.title
            : undefined
        }
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
            {selectedPost.pdf ? (
              <button
                type="button"
                className="news-story-close news-story-close--floating"
                onClick={closeStory}
                aria-label="Close story"
              >
                Close
                <span aria-hidden="true">×</span>
              </button>
            ) : (
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
            )}

            {selectedPost.pdf ? (
              <PdfPages
                src={selectedPost.pdf}
                title={selectedPost.pdfTitle || selectedPost.title}
                fallback={
                  <div className="news-story-pdf-fallback">
                    <p>{selectedPost.excerpt}</p>

                    <a
                      className="news-read-more"
                      href={selectedPost.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open the story (PDF)
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                }
              />
            ) : (
              <article>
                <div className="news-story-image">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.imageAlt}
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
                      <p key={`${selectedPost.slug}-${index}`}>
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
            )}
          </>
        )}
      </dialog>

    </main>
  );
}
