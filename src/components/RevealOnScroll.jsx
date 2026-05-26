import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RevealOnScroll() {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealElements = document.querySelectorAll(
      ".reveal-up, .reveal-image, .reveal-group"
    );

    if (prefersReducedMotion) {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    revealElements.forEach((element) => {
      element.classList.remove("is-visible");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);

      // Only reveal immediately if it is already ACTUALLY on screen
      const rect = element.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add("is-visible");
        observer.unobserve(element);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}