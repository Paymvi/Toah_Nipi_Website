import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";

function Home() {
  return (
    <main className="page">
      <section className="home-hero">
        <div className="hero-content">
          <p className="eyebrow">Welcome to Toah Nipi</p>
          <h1>Header</h1>
          <p>
            This is temporary homepage content
          </p>
        </div>
      </section>

      <section className="content-section">
        <h2>Scroll Test Section</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, velit illo! Ullam omnis quam, quia magni rem rerum, sint fuga similique corrupti culpa possimus autem. Placeat dolore impedit eveniet ab.
        </p>
      </section>
    </main>
  );
}

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

        <Route path="/lodging" element={<PlaceholderPage title="Lodging" />} />
        <Route
          path="/lodging/:section"
          element={<PlaceholderPage title="Lodging" />}
        />

        <Route path="/events" element={<PlaceholderPage title="Events" />} />
        <Route
          path="/events/:section"
          element={<PlaceholderPage title="Events" />}
        />

        <Route path="/partner" element={<PlaceholderPage title="Partner" />} />
        <Route
          path="/partner/:section"
          element={<PlaceholderPage title="Partner" />}
        />

        <Route
          path="/our-story"
          element={<PlaceholderPage title="Our Story" />}
        />
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