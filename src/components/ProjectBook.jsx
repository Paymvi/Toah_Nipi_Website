import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { clampPage, stepToward, turnDuration, turnLayers } from "../lib/pageTurn";

// Matches the single-page breakpoint in support.css.
const PHONE_QUERY = "(max-width: 760px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const SWIPE_MIN_PX = 48;

function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

const pad = (n) => String(n).padStart(2, "0");

function ProjectPhoto({ project, active = true }) {
  return (
    <div className={`partner-book-photo-item${active ? " is-active" : ""}`}>
      <img
        src={project.image}
        srcSet={`${project.imageSmall} 800w, ${project.image} 1400w`}
        sizes="(max-width: 760px) 100vw, 610px"
        alt={project.title}
        loading="lazy"
        decoding="async"
      />
      <span className="partner-book-status">{project.status}</span>
    </div>
  );
}

function ProjectText({ project, index, projects, active = true }) {
  const next = projects[index + 1];

  return (
    <div className={`partner-book-text-item${active ? " is-active" : ""}`}>
      <p className="partner-book-category">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="partner-book-description">{project.description}</p>

      <div className="partner-book-footer">
        <span className="partner-book-folio">
          {pad(index + 1)} / {pad(projects.length)}
        </span>
        <span className="partner-book-next">
          {next ? (
            <>
              Next: {next.title}
              <span aria-hidden="true">›</span>
            </>
          ) : (
            "Last project"
          )}
        </span>
      </div>
    </div>
  );
}

export default function ProjectBook({ projects }) {
  const count = projects.length;
  const [page, setPage] = useState(0);
  const [target, setTarget] = useState(0);
  const [turn, setTurn] = useState(null);

  const targetRef = useRef(0);
  const pagesRef = useRef(null);
  const leafRef = useRef(null);
  const frontShadeRef = useRef(null);
  const backShadeRef = useRef(null);
  const swipeRef = useRef(null);
  const lastSwipeRef = useRef(0);

  const isPhone = useMediaQuery(PHONE_QUERY);
  const reduceMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  const goTo = (requested) => {
    const next = clampPage(requested, count);
    targetRef.current = next;
    setTarget(next);

    // A running turn picks up the new target when it lands.
    if (turn || next === page) return;

    if (reduceMotion) {
      setPage(next);
      return;
    }

    setTurn({ from: page, to: stepToward(page, next) });
  };

  const goPrev = () => goTo(target - 1);
  const goNext = () => goTo(target + 1);

  // Layout effect so the leaf is posed before the first paint of each turn.
  useLayoutEffect(() => {
    if (!turn) return undefined;

    const closed = isPhone ? -90 : -180;
    const pagesLeft = Math.abs(targetRef.current - turn.from);
    const options = {
      duration: turnDuration(pagesLeft) * (isPhone ? 0.85 : 1),
      easing: EASE,
      fill: "both",
      direction: turn.to > turn.from ? "normal" : "reverse",
    };

    const leafTurn = leafRef.current.animate(
      [{ transform: "rotateY(0deg)" }, { transform: `rotateY(${closed}deg)` }],
      options
    );
    const shades = [
      frontShadeRef.current.animate(
        isPhone
          ? [{ opacity: 0 }, { opacity: 1 }]
          : [{ opacity: 0 }, { opacity: 1, offset: 0.5 }, { opacity: 1 }],
        options
      ),
      backShadeRef.current?.animate(
        [{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0 }],
        options
      ),
    ];

    leafTurn.onfinish = () => {
      const queued = targetRef.current;
      setPage(turn.to);
      setTurn(
        queued === turn.to ? null : { from: turn.to, to: stepToward(turn.to, queued) }
      );
    };

    return () => {
      leafTurn.onfinish = null;
      leafTurn.cancel();
      shades.forEach((shade) => shade?.cancel());
    };
  }, [turn, isPhone]);

  // Reduced motion: a short fade instead of a turn.
  useLayoutEffect(() => {
    if (!reduceMotion) return;
    pagesRef.current?.animate([{ opacity: 0.4 }, { opacity: 1 }], {
      duration: 200,
      easing: "ease-out",
    });
  }, [page, reduceMotion]);

  const handleKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  // Horizontal swipes turn pages; touch-action: pan-y leaves vertical scrolling
  // to the browser, which fires pointercancel when it takes over.
  const handlePointerDown = (event) => {
    swipeRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.4) return;

    lastSwipeRef.current = event.timeStamp;
    if (dx < 0) goNext();
    else goPrev();
  };

  // Clicking a page turns it, unless that click ended a swipe.
  const clickPage = (event, direction) => {
    if (event.timeStamp - lastSwipeRef.current < 400) return;
    if (direction < 0) goPrev();
    else goNext();
  };

  const layers = turn && turnLayers(turn.from, turn.to);
  const leftPage = layers ? (isPhone ? layers.high : layers.low) : page;
  const rightPage = layers ? layers.high : page;
  const canPrev = target > 0;
  const canNext = target < count - 1;

  return (
    <div className="partner-project-layout" onKeyDown={handleKeyDown}>
      <div className="partner-project-tabs" aria-label="Choose a project" role="group">
        {projects.map((project, index) => (
          <button
            type="button"
            key={project.id}
            aria-current={target === index ? "true" : undefined}
            onClick={() => goTo(index)}
          >
            <span>{project.category}</span>
            {project.title}
          </button>
        ))}
      </div>

      <div
        className={`partner-book${turn ? " is-turning" : ""}`}
        role="group"
        aria-roledescription="book"
        aria-label="Projects made possible"
      >
        <div className="partner-book-cover">
          <div
            className="partner-book-pages"
            ref={pagesRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              swipeRef.current = null;
            }}
          >
            <div
              className={`partner-book-page partner-book-page-left${
                (isPhone ? canNext : canPrev) ? " can-turn" : ""
              }`}
              onClick={(event) => clickPage(event, isPhone ? 1 : -1)}
            >
              <div className="partner-book-photo">
                {projects.map((project, index) => (
                  <ProjectPhoto key={project.id} project={project} active={index === leftPage} />
                ))}
              </div>
            </div>

            <div
              className={`partner-book-page partner-book-page-right${canNext ? " can-turn" : ""}`}
              onClick={(event) => clickPage(event, 1)}
            >
              <div className="partner-book-text">
                {projects.map((project, index) => (
                  <ProjectText
                    key={project.id}
                    project={project}
                    index={index}
                    projects={projects}
                    active={index === rightPage}
                  />
                ))}
              </div>
            </div>

            {layers && (
              <div className="partner-book-leaf" ref={leafRef} aria-hidden="true" inert>
                <div className="partner-book-face partner-book-face-front">
                  {isPhone && (
                    <div className="partner-book-face-photo">
                      <ProjectPhoto project={projects[layers.low]} />
                    </div>
                  )}
                  <ProjectText project={projects[layers.low]} index={layers.low} projects={projects} />
                  <span className="partner-book-shade" ref={frontShadeRef} />
                </div>

                {!isPhone && (
                  <div className="partner-book-face partner-book-face-back">
                    <ProjectPhoto project={projects[layers.high]} />
                    <span className="partner-book-shade" ref={backShadeRef} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="partner-book-controls">
          <button
            type="button"
            className="partner-book-btn"
            onClick={goPrev}
            aria-disabled={!canPrev}
            aria-label="Previous project"
          >
            <FiChevronLeft aria-hidden="true" />
            <span>Previous</span>
          </button>

          <div className="partner-book-progress" aria-hidden="true">
            <span className="partner-book-dots">
              {projects.map((project, index) => (
                <span key={project.id} className={index === target ? "is-active" : ""} />
              ))}
            </span>
            <span className="partner-book-count">
              {pad(target + 1)} / {pad(count)}
            </span>
          </div>

          <button
            type="button"
            className="partner-book-btn"
            onClick={goNext}
            aria-disabled={!canNext}
            aria-label="Next project"
          >
            <span>Next</span>
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {turn ? "" : `Project ${page + 1} of ${count}: ${projects[page].title}`}
        </p>
      </div>
    </div>
  );
}
