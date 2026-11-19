import { lazy, Suspense } from "react";
import NavBar from "./components/NavBar";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home";
import Lodging from "./pages/Lodging";
import Events from "./pages/Events";
import Support from "./pages/Support";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import New from "./pages/New";
import Story from "./pages/Story";
import Privacy from "./pages/Privacy";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";

// Staff-only page; loaded on demand so visitors never download the sign-in code.
const StaffBlog = lazy(() => import("./pages/StaffBlog"));

import { Analytics } from "@vercel/analytics/react";

import ScrollToTop from "./components/ScrollToTop";
import RevealOnScroll from "./components/RevealOnScroll";
import SiteFooter from "./components/SiteFooter";

import { pages } from "./seo/pages";



// Each page listed in src/seo/pages.js needs a component here. Old
// addresses such as /partner and /give are redirected by vercel.json.
const pageComponents = {
  "/": Home,
  "/lodging": Lodging,
  "/events": Events,
  "/contact": Contact,
  "/our-story": OurStory,
  "/support": Support,
  "/gallery": Gallery,
  "/new": New,
  "/privacy": Privacy,
  "/accessibility": Accessibility,
};

for (const { path } of pages) {
  if (!pageComponents[path]) {
    throw new Error(`Add a component for "${path}" in App.jsx.`);
  }
}


// Pages render their own <main>; the shared footer follows it, outside the
// main landmark.
function PageWithFooter() {
  return (
    <>
      <Outlet />
      <SiteFooter />
    </>
  );
}


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
      <RevealOnScroll />
      <ScrollToTop />
      <NavBar />

      <Routes>
        <Route element={<PageWithFooter />}>
          {pages.map(({ path }) => {
            const Page = pageComponents[path];

            return <Route key={path} path={path} element={<Page />} />;
          })}

          <Route path="/new/:slug" element={<Story />} />

          <Route
            path="/staff/blog"
            element={
              <Suspense fallback={null}>
                <StaffBlog />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Analytics />
    </BrowserRouter>
  );
}
