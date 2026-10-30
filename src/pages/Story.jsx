import { Link, useParams } from "react-router-dom";
import PdfPages from "../components/PdfPages";
import SEO from "../components/SEO";
import { getStory } from "../data/stories";
import NotFound from "./NotFound";

const backLink = (
  <Link to="/new" className="news-read-more">
    <span aria-hidden="true">←</span>
    Back to all stories
  </Link>
);

// One story at /new/<slug>, laid out like the old pop-up reader.
export default function Story() {
  const { slug } = useParams();
  const story = getStory(slug);

  if (!story) {
    return <NotFound />;
  }

  const header = (
    <header>
      <div className="news-post-meta">
        <span className="news-category">{story.category}</span>

        <time dateTime={story.dateTime}>{story.date}</time>
      </div>

      <h1 className="news-story-title">{story.title}</h1>
    </header>
  );

  return (
    <main className="news-page news-story-page">
      <SEO path={`/new/${story.slug}`} />

      <article
        className={`news-story-sheet${
          story.pdf ? " news-story-sheet--pdf" : ""
        }`}
      >
        <div className="news-story-toolbar">
          <span>Stories from Toah Nipi</span>
        </div>

        {story.pdf ? (
          <>
            <div className="news-story-content news-story-pdf-header">
              {header}
            </div>

            <PdfPages
              src={story.pdf}
              title={story.pdfTitle || story.title}
              fallback={
                <div className="news-story-pdf-fallback">
                  <p>{story.excerpt}</p>
                </div>
              }
            />

            <div className="news-story-content news-story-pdf-footer">
              <a
                className="news-read-more"
                href={story.pdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the story (PDF)
                <span aria-hidden="true">↗</span>
              </a>

              <footer className="news-story-footer">{backLink}</footer>
            </div>
          </>
        ) : (
          <>
            <div className="news-story-image">
              <img src={story.image} alt={story.imageAlt} />
            </div>

            <div className="news-story-content">
              {header}

              <div className="news-story-body">
                {(story.content?.length ? story.content : [story.excerpt]).map(
                  (paragraph, index) => (
                    <p key={`${story.slug}-${index}`}>{paragraph}</p>
                  )
                )}
              </div>

              <footer className="news-story-footer">{backLink}</footer>
            </div>
          </>
        )}
      </article>
    </main>
  );
}
