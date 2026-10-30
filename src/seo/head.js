// Builds a page's <head> tags and structured data from its entry in pages.js.
// The same output is rendered by React (src/components/SEO.jsx) and written
// into the static HTML files at build time, so the two can't drift apart.
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  fullTitle,
  previewImage,
} from "./pages.js";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Each tag is { tag, attrs } or, for <title>, { tag: "title", text }.
export function getHeadTags(route) {
  const title = fullTitle(route);
  const image = previewImage(route);
  const imageUrl = absoluteUrl(image.src);
  const url = route.path ? absoluteUrl(route.path) : undefined;
  const isArticle = Boolean(route.story);

  const meta = (key, name, content) =>
    content === undefined ? null : { tag: "meta", attrs: { [key]: name, content } };

  return [
    { tag: "title", text: title },
    meta("name", "description", route.description),
    route.noindex ? meta("name", "robots", "noindex") : null,
    !route.noindex && url ? { tag: "link", attrs: { rel: "canonical", href: url } } : null,

    meta("property", "og:type", isArticle ? "article" : "website"),
    meta("property", "og:site_name", SITE_NAME),
    meta("property", "og:title", title),
    meta("property", "og:description", route.description),
    meta("property", "og:url", url),
    meta("property", "og:image", imageUrl),
    meta("property", "og:image:width", String(image.width)),
    meta("property", "og:image:height", String(image.height)),
    meta("property", "og:image:alt", image.alt),
    isArticle
      ? meta("property", "article:published_time", route.story.dateTime)
      : null,

    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", title),
    meta("name", "twitter:description", route.description),
    meta("name", "twitter:image", imageUrl),
    meta("name", "twitter:image:alt", image.alt),
  ].filter(Boolean);
}

const organization = {
  // A lodging business: groups and individuals book overnight stays directly.
  "@type": "LodgingBusiness",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  alternateName: ["Toah Nipi", "Toah Nipi Retreat Center"],
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/TN-Logo.png`,
    width: 500,
    height: 500,
  },
  image: absoluteUrl("/social/default.jpg"),
  telephone: "+1-603-899-5464",
  email: "contactus@toahnipi.org",
  address: {
    "@type": "PostalAddress",
    streetAddress: "49 Fellowship Circle",
    addressLocality: "Rindge",
    addressRegion: "NH",
    postalCode: "03461",
    addressCountry: "US",
  },
  // Hebron, the main lodge at 49 Fellowship Circle, from OpenStreetMap.
  // Not yet checked against the Google Business Profile pin.
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.71415,
    longitude: -71.96,
  },
  sameAs: [
    "https://www.facebook.com/ToahNipiRetreatCenter/",
    "https://www.instagram.com/toah_nipi/",
    "https://www.linkedin.com/company/91656401/",
  ],
};

const publisher = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: organization.logo,
};

export function getStructuredData(route) {
  if (route.schema === "home") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        organization,
        {
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          name: SITE_NAME,
          alternateName: "Toah Nipi",
          url: `${SITE_URL}/`,
          publisher: { "@id": ORGANIZATION_ID },
        },
      ],
    };
  }

  if (route.story && !route.noindex) {
    const { story } = route;

    // No author yet: the questionnaire gave two different bylines.
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: story.title,
      datePublished: story.dateTime,
      image: [absoluteUrl(story.image)],
      url: absoluteUrl(route.path),
      mainEntityOfPage: absoluteUrl(route.path),
      publisher,
    };
  }

  return null;
}
