import NavBar from "./components/NavBar";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Lodging from "./pages/Lodging";
import Events from "./pages/Events";
import Support from "./pages/Support";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import New from "./pages/New";
import Privacy from "./pages/Privacy";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";

import { Analytics } from "@vercel/analytics/react";

import ScrollToTop from "./components/ScrollToTop";
import RevealOnScroll from "./components/RevealOnScroll";

import SiteSchema from "./components/SiteSchema";

import "./styles/base.css";
import "./styles/components.css";
import "./styles/home.css";
import "./styles/lodging.css";
import "./styles/events.css";
import "./styles/support.css";
import "./styles/our-story.css";
import "./styles/donors.css";
import "./styles/contact.css";
import "./styles/footer.css";
import "./styles/animations.css";
import "./styles/policy.css";
import "./App.css";
import "./styles/New.css";


// Every page renders a single <main>, so the skip link targets it directly
// instead of each page needing its own id.
function SkipLink() {
  const handleClick = (event) => {
    const main = document.querySelector("main");
    if (!main) return;

    event.preventDefault();

    if (!main.hasAttribute("tabindex")) {
      main.setAttribute("tabindex", "-1");
    }

    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: "start" });
  };

  return (
    <a href="#main-content" className="skip-link" onClick={handleClick}>
      Skip to main content
    </a>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <SiteSchema />
      <RevealOnScroll />
      <ScrollToTop />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/lodging" element={<Lodging />} />


        <Route path="/events" element={<Events />} />


        <Route path="/gallery" element={<Gallery />} />


        <Route path="/new" element={<New />} />


        <Route path="/support" element={<Support />} />


        {/* Redirect old Partner / Partners / Give URLs to the Support page */}

        <Route
          path="/partner"
          element={<Navigate to="/support" replace />}
        />

        <Route
          path="/partners"
          element={<Navigate to="/support" replace />}
        />

        <Route
          path="/give"
          element={<Navigate to="/support" replace />}
        />


        <Route path="/our-story" element={<OurStory />} />


        <Route path="/contact" element={<Contact />} />


        <Route path="/privacy" element={<Privacy />} />


        <Route path="/accessibility" element={<Accessibility />} />


        <Route path="*" element={<NotFound />} />
      </Routes>

      <Analytics />
    </BrowserRouter>
  );
}
