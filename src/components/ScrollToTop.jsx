import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// The one place that scrolls on navigation: to the #section in the URL, or
// to the top of a new page.
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  // Clicking the same section link twice keeps the hash but gets a new key,
  // so it should scroll again.
  const hashKey = hash ? key : "";

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");

      // Wait a moment so the new page has rendered its sections.
      const timeout = setTimeout(() => {
        const section = document.getElementById(id);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 80);

      return () => clearTimeout(timeout);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, hash, hashKey]);

  return null;
}
