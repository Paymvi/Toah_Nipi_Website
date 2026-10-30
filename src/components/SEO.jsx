import { Helmet } from "react-helmet-async";
import { getRoute } from "../seo/pages";
import { getHeadTags, getStructuredData } from "../seo/head";

// Page titles, descriptions, and preview images live in src/seo/pages.js.
// Pass `path` for a listed page, or a full `route` object (e.g. Not Found).
export default function SEO({ path, route }) {
  const page = route || getRoute(path);

  if (!page) {
    throw new Error(`No SEO entry for "${path}". Add it to src/seo/pages.js.`);
  }

  const structuredData = getStructuredData(page);

  return (
    <Helmet>
      {getHeadTags(page).map(({ tag: Tag, attrs, text }, index) =>
        text === undefined ? (
          <Tag key={index} {...attrs} />
        ) : (
          <Tag key={index}>{text}</Tag>
        )
      )}

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
