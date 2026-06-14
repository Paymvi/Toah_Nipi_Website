import { Helmet } from "react-helmet-async";

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Toah Nipi Christian Retreat Center",
  url: "https://toah-nipi.vercel.app",
  logo: "https://toah-nipi.vercel.app/TN-Logo.png",
  image: "https://toah-nipi.vercel.app/camp-background-2.jpg",
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
  sameAs: [
    "https://www.facebook.com/ToahNipiRetreatCenter/",
    "https://www.instagram.com/toah_nipi/",
    "https://www.linkedin.com/company/91656401/",
  ],
};

export default function SiteSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}