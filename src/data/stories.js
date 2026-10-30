// Stories shown on /new. Each one also gets its own page at /new/<slug>.
//
// To add a story, copy an entry and give it a new, unique `slug` (lowercase
// words joined by hyphens). The first entry is shown as the featured story.
//
// `draft: true` keeps the story out of search results and the sitemap while
// its text is still being written. Remove the line (or set it to false) once
// the real content is in place.
//
// Optional fields:
//   pdf / pdfTitle: show a PDF instead of `content`.
//   pdfBackground: pop-up color around the PDF (defaults to brown).
//   description: the search/link-preview summary (approved wording only).
//   socialImage: a 1200x630 preview image in /public/social.
const stories = [
  {
    slug: "apple-cider-2026",
    title: "Our First Batch of Homemade Apple Cider!",
    date: "September 24, 2026",
    dateTime: "2026-09-24",
    category: "Camp Update",
    image: "/optimized/Blog/Carina_apples.webp",
    imageAlt: "Our First Batch of Homemade Apple Cider!",
    socialImage: {
      src: "/social/story-apple-cider-2026.jpg",
      width: 810,
      height: 425,
    },
    excerpt:
      "As we enter the fall season and gather more and more apples from our very own orchard, Toah Nipi has pressed its very first batch of homemade apple cider!",
    description:
      "As we enter the fall season and gather more and more apples from our very own orchard, Toah Nipi has pressed its very first batch of homemade apple cider!",

    // Shown in place of the text content when set.
    pdf: "/Blog/Officially-Fall-at-Toah-Nipi.pdf",
    pdfTitle: "It’s Officially Fall at Toah Nipi",
  },

  {
    slug: "family-camp-2026",
    title: "Looking Back on Family Camp 2026",
    date: "August 15, 2026",
    dateTime: "2026-08-15",
    category: "Family Camp",
    image: "/optimized/Blog/Zoey+Raph.webp",
    imageAlt: "Looking Back on Family Camp 2026",
    socialImage: {
      src: "/social/story-family-camp-2026.jpg",
      width: 1200,
      height: 630,
    },
    excerpt:
      "God blessed us with another wonderful season filled with fellowship, laughter, great memories, and countless moments of seeing Him at work.",
    description:
      "God blessed us with another wonderful season filled with fellowship, laughter, great memories, and countless moments of seeing Him at work.",

    // Shown in place of the text content when set.
    pdf: "/Blog/Family_Camp_2026.pdf",
    pdfTitle: "Family Camp 2026: At the Table, We All Belong",
    pdfBackground: "#5f7237",
  },

  {
    slug: "whats-new-around-camp",
    draft: true,
    title: "What’s New Around Camp",
    date: "July 20, 2026",
    dateTime: "2026-07-20",
    category: "Projects",
    image: "/optimized/Blog/Ichthus_Trail_Update.webp",
    imageAlt: "What’s New Around Camp",
    socialImage: {
      src: "/social/story-whats-new-around-camp.jpg",
      width: 1080,
      height: 567,
    },
    excerpt:
      "See some of the projects, improvements, and behind-the-scenes work happening throughout the retreat center.",

    content: [
      "(Content Pending! Will release soon!)",
    ],
  },
];

export default stories;

export function getStory(slug) {
  return stories.find((story) => story.slug === slug);
}
