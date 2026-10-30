import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";

// Each page's HTML file carries build-time copies of its title, meta tags,
// and structured data for crawlers and link previews that don't run
// JavaScript (scripts/build-seo-pages.mjs). React renders the live versions,
// so remove the copies first to keep exactly one of each.
document
  .querySelectorAll("[data-static-head]")
  .forEach((element) => element.remove());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);