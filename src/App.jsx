import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Routes, Route, useParams, Link } from "react-router-dom";
import { useState } from "react";

import QuickLinks from "./components/QuickLinks";
import EventCarousel from "./components/EventCarousel";

import Home from "./pages/Home";
import Lodging from "./pages/Lodging";
import Events from "./pages/Events";
import Partner from "./pages/Partner";
import OurStory from "./pages/OurStory";

function PlaceholderPage({ title }) {
  const { section } = useParams();

  return (
    <main className="page">
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

        <Route path="/partner" element={<Partner />} />
        <Route
          path="/partner/:section"
          element={<PlaceholderPage title="Partner" />}
        />

        <Route path="/our-story" element={<OurStory />} />
        <Route
          path="/our-story/:section"
          element={<PlaceholderPage title="Our Story" />}
        />

        <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
        <Route
          path="/blog/:section"
          element={<PlaceholderPage title="Blog" />}
        />

        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
        <Route
          path="/contact/:section"
          element={<PlaceholderPage title="Contact" />}
        />

        <Route path="/give" element={<PlaceholderPage title="Give" />} />
      </Routes>
    </BrowserRouter>
  );
}