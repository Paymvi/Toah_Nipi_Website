import NavBar from "./components/NavBar";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import Home from "./pages/Home";
import Lodging from "./pages/Lodging";
import Events from "./pages/Events";
import Support from "./pages/Support";
import OurStory from "./pages/OurStory";
import Donors from "./pages/Donors";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import New from "./pages/New";

import ScrollToTop from "./components/ScrollToTop";
import RevealOnScroll from "./components/RevealOnScroll";

import SiteSchema from "./components/SiteSchema";
import SEO from "./components/SEO";

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
import "./App.css";
import "./styles/New.css";


function PlaceholderPage({ title }) {
  const { section } = useParams();

  return (
    <main className="page">
      <SEO
        title={`${title} Coming Soon`}
        description={`${title} page coming soon.`}
        path=""
        noindex
      />

      <section className="placeholder-page">
        <p className="eyebrow">
          {section ? `${title} dropdown item ${section}` : "Page coming soon"}
        </p>

        <h1>{title}</h1>

        <p>
          This route is set up. Later, you can replace this placeholder with the
          real {title.toLowerCase()} page.
        </p>
      </section>
    </main>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <SiteSchema />
      <RevealOnScroll />
      <ScrollToTop />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/lodging" element={<Lodging />} />

        <Route
          path="/lodging/:section"
          element={<PlaceholderPage title="Lodging" />}
        />


        <Route path="/events" element={<Events />} />

        <Route
          path="/events/:section"
          element={<PlaceholderPage title="Events" />}
        />


        <Route path="/gallery" element={<Gallery />} />


        <Route path="/new" element={<New />} />


        <Route path="/support" element={<Support />} />

        <Route
          path="/support/:section"
          element={<PlaceholderPage title="Support" />}
        />


        {/* Redirect old Partner / Partners URLs to the new combined page */}

        <Route
          path="/partner"
          element={<Navigate to="/support" replace />}
        />

        <Route
          path="/partners"
          element={<Navigate to="/support" replace />}
        />


        <Route path="/our-story" element={<OurStory />} />

        <Route
          path="/our-story/:section"
          element={<PlaceholderPage title="Our Story" />}
        />


        <Route path="/donors" element={<Donors />} />

        <Route
          path="/donors/:section"
          element={<PlaceholderPage title="Donors" />}
        />


        <Route path="/contact" element={<Contact />} />

        <Route
          path="/contact/:section"
          element={<PlaceholderPage title="Contact" />}
        />


        <Route
          path="/give"
          element={<PlaceholderPage title="Give" />}
        />
      </Routes>
    </BrowserRouter>
  );
}