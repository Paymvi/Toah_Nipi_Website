# Toah Nipi Christian Retreat Center Website

This is the public website for **Toah Nipi Christian Retreat Center**, a year-round Christian retreat center on Pecker Pond in Rindge, New Hampshire. It helps churches, campus ministries, Christian schools, families, and individuals:

- learn what Toah Nipi is
- compare lodging
- find events
- support the ministry
- get in touch to plan a stay

**Live site:** [toahnipi.org](https://toahnipi.org)

![The Toah Nipi homepage: a lodge at dusk behind the words "Welcome to Toah Nipi" and a "Plan a Visit" button](docs/screenshots/home-desktop.jpg)

> **You don't need to install anything to view the website.** Just open [toahnipi.org](https://toahnipi.org) in any browser. You only need the setup steps in this README to change the website.

## Contents

1. [What visitors can do](#what-visitors-can-do)
2. [Visual tour](#visual-tour): [Home](#home) · [Lodging](#lodging) · [Events](#events) · [Our Story](#our-story) · [Support](#support) · [Gallery](#gallery) · [New!](#new-stories-and-updates) · [Contact](#contact) · [Shared header and footer](#shared-header-and-footer)
3. [On a phone](#on-a-phone)
4. [Updating content](#updating-content)
5. [For developers](#for-developers)

---

## What visitors can do

| Page | Address | What visitors find there |
| --- | --- | --- |
| [Home](#home) | `/` | A welcome, quick introductions, directions, activities, and a newsletter sign-up |
| [Lodging](#lodging) | `/lodging` | A side-by-side comparison of every building, photo galleries, and a downloadable camp map |
| [Events](#events) | `/events` | Family Camp dates, prices, and registration, plus Thanksgiving House Party, group retreats, and personal retreats |
| [Our Story](#our-story) | `/our-story` | History timeline, statement of faith, core values, mission and vision, and the team |
| [Support](#support) | `/support` | Ways to give, volunteer, and pray, current projects, and a directory of groups that have retreated here |
| [Gallery](#gallery) | `/gallery` | A filterable photo gallery with a full-screen viewer |
| [New!](#new-stories-and-updates) | `/new` | Stories and updates from camp. Each story also has its own page. |
| [Contact](#contact) | `/contact` | A retreat inquiry form, contact details, a staff application, and directions |

The footer also links to the **Privacy Notice** (`/privacy`) and the **Accessibility Statement** (`/accessibility`). Those are text-only pages, so the tour doesn't include screenshots of them.

**Where the website sends people.** The website has no shopping cart, booking system, or guest login. Visitors leave the site in these cases:

- **Give buttons** go to Toah Nipi's donation page on Qgiv.
- **Family Camp registration buttons** go to registration forms at `forms.toahnipi.org`.
- **Past newsletters** open on Flodesk.
- **"Open in Google Maps"** opens Google Maps.
- **Social icons** go to Instagram, Facebook, and LinkedIn.

The contact form and the newsletter sign-up email their details to Toah Nipi through a service called FormSubmit.

---

## Visual tour

The desktop screenshots are 1440 pixels wide. They were captured from this repository running locally. Click any image to see it full size.

### Home

The homepage is where most visitors arrive. It explains what Toah Nipi is and points visitors to lodging, events, and planning a visit.

![Homepage introduction reading "A year-round Christian retreat center in Rindge, NH" with View Lodging and Explore Events buttons, above three photo cards: Who we are, Our Values, and Retreats & Programs](docs/screenshots/home-intro-desktop.jpg)
*Below the welcome, a short introduction leads to Lodging and Events. Three cards open to give brief introductions to who Toah Nipi is, its values, and its retreats.*

![A dark green "What's waiting for you" section with a carousel of photo cards for the pond, hiking trails, firepits, and sports areas](docs/screenshots/home-activities-desktop.jpg)
*"What's waiting for you" is a carousel of things to do on the property. A "Find us in Rindge" panel with a Google Maps link sits just above it.*

![A "Start planning your visit" banner over a snowy bridge, followed by a newsletter sign-up form asking for first name, last name, and email](docs/screenshots/home-newsletter-desktop.jpg)
*The page ends with a "Plan your stay" button that goes to Contact, then a newsletter sign-up with links to past newsletters.*

### Lodging

The Lodging page helps a group leader choose where to stay.

![Lodging page header reading "Retreat lodging at Toah Nipi" with a Download Camp Map button](docs/screenshots/lodging-desktop.jpg)
*The header includes a **Download Camp Map** button.*

![A comparison table listing Hebron, Bethel, Dothan, the Guest House, and Rustic Cottages, with columns for who each suits, how many it sleeps, bathrooms, meeting space, and highlights](docs/screenshots/lodging-comparison-desktop.jpg)
*The comparison table lets visitors size up every option at once. Each **View** button jumps to that building's section. The note above the table explains that the rustic cottages are open May through October.*

![Hebron section with a large photo, a row of thumbnails, key facts in small cards, and an expanded "More details" panel describing the layout, number of guests, and meeting space](docs/screenshots/lodging-hebron-desktop.jpg)
*Each building has a photo gallery, key facts, an expandable **More details** panel (shown open here), and an **Ask about this space** link to the contact form. The page continues in this pattern for Bethel, Dothan, the Guest House, and two rustic cottages, Ajalon and Capernaum.*

### Events

The Events page covers Toah Nipi's own programs and explains how groups can plan their own retreats.

![Events page header reading "Gather, rest, and reconnect at Toah Nipi" with View Family Camp and Plan a Retreat buttons](docs/screenshots/events-desktop.jpg)

![Family Camp section with a photo of a family waving on a boardwalk, two week cards marked "Registration closed", a prices card, and a discounts card](docs/screenshots/events-family-camp-desktop.jpg)
*Family Camp lists each week, its prices, and its discounts. A week's registration button links to an outside form. After the week's last day, the button automatically changes to "Registration closed," as shown here. A photo carousel of Family Camp follows.*

![A "Customize the stay around your group" section with three numbered cards: Choose your spaces, Build your rhythm, and Add time outdoors](docs/screenshots/events-groups-desktop.jpg)
*Lower on the page, sections cover the Thanksgiving House Party, custom group retreats (shown), and personal retreats in the rustic cottages. Each has a button that leads to the contact form.*

### Our Story

Our Story introduces the people and beliefs behind Toah Nipi.

![Our Story page header reading "The Toah Nipi Story" over a winter sunset on the pond](docs/screenshots/our-story-desktop.jpg)

![A horizontal timeline of historic photos from the 1930s onward, followed by the Statement of Faith in a numbered list](docs/screenshots/our-story-timeline-desktop.jpg)
*A scrolling timeline tells the history of the property. The Statement of Faith follows.*

![Our Core Values section with cards for Christ-Centered, Gracious Hospitality, Intentional Presence, and Faithful Stewardship, each with a Bible verse](docs/screenshots/our-story-values-desktop.jpg)
*There are six core-value cards. Each includes a Bible verse and expands to show observable behaviors. Mission and Vision statements come next.*

![Our Team section listing the Board of Trustees in text cards, followed by staff photos](docs/screenshots/our-story-team-desktop.jpg)
*The page ends with the Board of Trustees and staff profiles.*

### Support

The Support page invites people to give, serve, pray, and spread the word.

![Support page header reading "Help shape the future of Toah Nipi" with Make a Gift and Explore Ways to Partner buttons](docs/screenshots/support-desktop.jpg)

![Four cards titled Make a Gift, Serve With Us, Pray, and Spread the Word, each with a button](docs/screenshots/support-ways-desktop.jpg)
*There are four ways to get involved. Each card jumps to its section further down the page.*

![A "Make a Gift" carousel of fundraising projects, including the Christmas Light Walk, Woodland Trail, Outdoor Amphitheatre, and Trex Swings](docs/screenshots/support-projects-desktop.jpg)
*Current giving projects. Below this, a tabbed "See what partnership is helping build" feature shows each project in more detail. Volunteer needs, prayer, and spread-the-word sections and a "Recognition notes" section about gifts given in honor or memory of someone follow.*

![A "Groups that have retreated with us" directory with a search box, category filters, and a grid of church and ministry logos](docs/screenshots/support-directory-desktop.jpg)
*The Community Directory can be searched and filtered by category. Each entry links to that organization's website. A thank-you note closes the page.*

### Gallery

![Gallery page with a header, filter buttons for All, Campus, Camp Life, and Food, and a grid of photos of the pond, lodges, and campers](docs/screenshots/gallery-desktop.jpg)
*Visitors can filter photos by category.*

![A photo of the beach and canoes enlarged in a dark full-screen viewer, captioned "Campus: Beach at Toah Nipi", with a close button](docs/screenshots/gallery-viewer-desktop.jpg)
*Selecting a photo opens it larger in a full-screen viewer with its title and category.*

### New! (stories and updates)

The menu labels this page **New!**. The page itself is titled **What's New?**.

![What's New page with a featured story about homemade apple cider and two smaller story cards below](docs/screenshots/news-desktop.jpg)
*The newest story is featured at the top, with the others beneath it. **Read story** opens the story in a pop-up reader on this page.*

![The "Looking Back on Family Camp 2026" story page, showing a designed newsletter-style layout with photos and text, and buttons to open the PDF and go back to all stories](docs/screenshots/news-story-desktop.jpg)
*Every story also has its own shareable page, such as `/new/family-camp-2026`. Some stories are designed PDFs, and the page displays them inline as shown here. Other stories use ordinary text and photos.*

### Contact

The Contact page is the main way to start planning a retreat.

![Contact page header reading "Let's start planning your time at Toah Nipi" over a pond in autumn](docs/screenshots/contact-desktop.jpg)

![Contact details on the left (physical address, mailing address, phone, email, and a New England map) and a retreat inquiry form on the right](docs/screenshots/contact-form-desktop.jpg)
*The retreat inquiry form asks for group size, dates, retreat type, and a message. The addresses, phone number, and email address appear alongside it.*

![A "Review your message" pop-up showing filled-in example details, with Edit Message and Send Message buttons](docs/screenshots/contact-review-desktop.jpg)
*Before anything is sent, visitors review their message and can go back to edit it. The details shown are fictional. Nothing was sent to make this screenshot.*

![An "Interested in joining our team?" section with a Download Application button, above a "Find us in Rindge, New Hampshire" directions banner](docs/screenshots/contact-directions-desktop.jpg)
*Lower on the page, people can download a staff application. The directions panel links to Google Maps.*

### Shared header and footer

![The desktop menu with the Lodging dropdown open, listing Hebron, Bethel, Dothan, Guest House, and Rustic Cottages](docs/screenshots/navigation-dropdown-desktop.jpg)
*On a computer, menu items with sections show a dropdown when visitors hover over them. The header also has social links and a **Give** button. On the homepage, the header starts transparent over the photo and turns solid as visitors scroll.*

![The site footer with the Toah Nipi logo, Plan a Visit and View Lodging buttons, Visit and Support link columns, contact details, and Privacy and Accessibility links](docs/screenshots/footer-desktop.jpg)
*Every page ends with this footer. It includes contact details, quick links, and links to the Privacy and Accessibility pages.*

---

## On a phone

These screenshots show a phone screen 390 pixels wide, a common size for current iPhones. The examples below are layouts that change on a phone. Other phones and tablets weren't individually tested.

<p>
  <img src="docs/screenshots/mobile-home.jpg" width="300" alt="Homepage on a phone: the Toah Nipi welcome over the lodge photo, with a menu button in the top corner">
  &nbsp;
  <img src="docs/screenshots/mobile-navigation.jpg" width="300" alt="Phone menu open, with the Lodging section expanded to show its five buildings, and Give and social buttons at the bottom">
</p>

*First: The homepage on a phone. Second: When the window is narrower than about 1180 pixels, the menu collapses behind a menu button. Tapping the arrow next to a section, such as Lodging, shows its sub-pages. The Give button and social links move to the bottom of the menu.*

<p>
  <img src="docs/screenshots/mobile-lodging.jpg" width="300" alt="Lodging comparison on a phone, where each building is a separate stacked card instead of a table row">
  &nbsp;
  <img src="docs/screenshots/mobile-events.jpg" width="300" alt="Family Camp on a phone, with the photo above the text and the week cards stacked">
</p>

*First: On a phone, the lodging comparison table turns into one card per building, so nothing needs to scroll sideways. Second: Family Camp stacks its photo, week cards, and prices in a single column.*

<p>
  <img src="docs/screenshots/mobile-contact-form.jpg" width="300" alt="Retreat inquiry form on a phone with full-width fields and a Review Message button">
</p>

*The inquiry form uses a single column on a phone, and it appears below the contact details.*

---

## Updating content

The website has **no admin dashboard or content management system**. All text, links, and photo lists are stored in this repository's files. To change something, a person edits a file, checks the change locally, and publishes it. Publishing happens through Vercel (see [Deployment](#deployment)).

Most content is kept in plainly labeled lists near the top of each file. You can often update it by copying an existing entry and changing its wording.

### Where things live

| To change… | Edit this |
| --- | --- |
| **Contact details** (phone, email, addresses) | Each copy separately: [SiteFooter.jsx](src/components/SiteFooter.jsx), [Contact.jsx](src/pages/Contact.jsx), the directions panel in [Home.jsx](src/pages/Home.jsx), and the search data in [head.js](src/seo/head.js). The phone and email also appear in [Privacy.jsx](src/pages/Privacy.jsx) and [Accessibility.jsx](src/pages/Accessibility.jsx). The phone also appears in the Contact description in [pages.js](src/seo/pages.js), and the email also appears in [Support.jsx](src/pages/Support.jsx). |
| **Directions / map link** | The Google Maps links in [Contact.jsx](src/pages/Contact.jsx) and [Home.jsx](src/pages/Home.jsx) |
| **Lodging descriptions, facts, and photos** | The `lodgingBuildings` list in [Lodging.jsx](src/pages/Lodging.jsx) |
| **Lodging comparison table** | The `lodgingOptions` list in [LodgingComparison.jsx](src/components/LodgingComparison.jsx). Keep it in step with Lodging.jsx. |
| **Lodging FAQ** | [lodgingFaq.js](src/data/lodgingFaq.js). The section stays hidden while this list is empty. |
| **Camp map download** | Replace [public/images/maps/camp-map.png](public/images/maps/camp-map.png) |
| **Family Camp dates, registration links, prices, discounts** | The `familyCampWeeks`, `prices`, and `discounts` lists in [Events.jsx](src/pages/Events.jsx) |
| **Other event sections** (Thanksgiving, group, and personal retreats) | The text in [Events.jsx](src/pages/Events.jsx) |
| **Homepage "What's waiting for you" cards** | The `activities` list in [Home.jsx](src/pages/Home.jsx) |
| **Stories on the New! page** | [stories.js](src/data/stories.js). Instructions are at the top of the file. |
| **Gallery photos** | The `galleryImages` list in [Gallery.jsx](src/pages/Gallery.jsx) |
| **Give / donation link** (every Give button) | `DONATION_URL` in [donation.js](src/data/donation.js) |
| **Giving projects and project details** | `givingProjects` and `projectImpacts` in [Support.jsx](src/pages/Support.jsx) |
| **Community Directory** | [relationships.js](src/data/relationships.js). Put logos in [public/images/partners/](public/images/partners/). |
| **History timeline** | [StoryTimeline.jsx](src/components/StoryTimeline.jsx) |
| **Statement of Faith / Core Values** | [StatementOfFaith.jsx](src/components/StatementOfFaith.jsx) / [CoreValues.jsx](src/components/CoreValues.jsx) |
| **Mission and Vision** | [MissionVision.jsx](src/components/MissionVision.jsx) |
| **Trustees and staff** | The `trustees` and `staff` lists in [OurTeam.jsx](src/components/OurTeam.jsx) |
| **Main menu and dropdowns** | `navItems` in [NavBar.jsx](src/components/NavBar.jsx). Social links are in `socialLinks` in the same file. |
| **Footer links** | [SiteFooter.jsx](src/components/SiteFooter.jsx) |
| **Staff application form** | Replace [public/documents/staff-application.pdf](public/documents/staff-application.pdf) |
| **Page titles and search descriptions** | [pages.js](src/seo/pages.js). Use only approved wording. |
| **Old web addresses that should redirect** | `redirects` in [vercel.json](vercel.json) |
| **Any photo or logo** | See [Where images go](#where-images-go) |

### Where images go

Every image the website shows is in [public/images/](public/images/), in one folder per kind of content:

| Folder | What goes there |
| --- | --- |
| `brand/` | Logos and brand graphics |
| `campus/` | Photos of the grounds used as page backgrounds or on more than one page |
| `activities/` | Home page "What's waiting for you" cards |
| `community/` | People and gatherings (Support page) |
| `events/` | Event photos. Family Camp photos go in `events/family-camp/`. |
| `lodging/<building>/` | One folder per building: `hebron`, `bethel`, `dothan`, `guest-house`, `ajalon`, `capernaum` |
| `gallery/` | Gallery page photos |
| `stories/` | Main images for stories on the New! page |
| `staff/` | Team portraits |
| `timeline/` | History timeline photos |
| `partners/` | Community Directory logos |
| `maps/` | The downloadable camp map and the New England location map |

If a photo only belongs to one building, event, or page, put it in that folder. If it's a general campus photo used in several places, put it in `campus/`.

**Full-size originals** go in [image-sources/](image-sources/), in the same folder as the web copy and with the same name. Examples are camera photos and PNG exports that the WebP copies were made from. Unused alternates are kept there too. This folder isn't published, so nothing in it can appear on the website. To use one of these images, save a web-sized copy in `public/images/`.

A few files stay where they are, because outside services or old links expect them there:

- `favicon.ico`, `apple-touch-icon.png`, and `TN-Logo.png` (the logo search engines show) in `public/`
- link-preview images in `public/social/`
- story PDFs in `public/Blog/`, and the staff application in `public/documents/`

**File names:**

- Use lowercase letters, numbers, and hyphens only, such as `hebron-dining.webp`. The live site treats `Photo.webp` and `photo.webp` as different files.
- Describe what's in the photo. For lodging, start with the building name. Dated photos follow the existing pattern, such as `may-2025-prayer-garden.webp`.
- Different sizes of the same photo share its name, add a suffix, and are saved next to it:

| File | Used for |
| --- | --- |
| `name.webp` | The main copy, about 1600 px on the long edge |
| `name-md.webp` | Gallery grid tiles, about 1024 px |
| `name-thumb.webp` | Gallery grid tiles (about 640 px) or lodging thumbnails (320 px) |
| `name-card.webp` | Smaller copy for a card, about 800 px |
| `name-mobile.webp` | Square background for phones (made by the image script) |
| `name-1600.webp` | A copy resized to that width |

**In the code**, write the path from `public/` onward, starting with `/images/`, for example `src: "/images/lodging/hebron/hebron-dining.webp"`. Copy the file name exactly, including capital letters.

**Checking paths:** `npm run check:images` runs as part of `npm run build`. It fails if a path in the code doesn't match a file exactly, if a gallery or lodging photo is missing its `-md` or `-thumb` copy, or if a file name in `public/images/` doesn't follow the rules above.

**Moving or renaming a published image:** update every reference, then add a redirect from the old address to the new one in [vercel.json](vercel.json). In November 2026, the old `/optimized/...` addresses were redirected this way when the images were reorganized.

The 2026 staff portraits were taken by D. Greco, and the originals in `image-sources/staff/` are © D. Greco.

### Adding a story

1. Put the story's main image in `public/images/stories/` as a `.webp` file. If the story is a designed PDF, put the PDF in `public/Blog/`.
2. In [stories.js](src/data/stories.js), copy an existing entry to the **top** of the list. The first story is featured. Give the copy a new, unique `slug`, such as `spring-retreat-2027`. The slug becomes the story's address, `/new/spring-retreat-2027`.
3. If the story's wording isn't final, add `draft: true`. That keeps the story out of search results and the sitemap. Remove it when the story is ready.

### Adding a gallery photo

Each gallery photo needs **three sizes** in `public/images/gallery/`:

| File | Used for | Typical size (long edge) |
| --- | --- | --- |
| `name.webp` | Full-screen viewer | about 1600 px |
| `name-md.webp` | Grid tiles. The browser picks this or the thumbnail, depending on tile size and screen. | about 1024 px |
| `name-thumb.webp` | Grid tiles (smaller version) | about 640 px |

Then add an entry to `galleryImages` in [Gallery.jsx](src/pages/Gallery.jsx). The `src` is the main copy, such as `/images/gallery/name.webp`. The site finds the `-md` and `-thumb` copies itself. Each entry needs `src`, `alt` (a short description for people who can't see the image), `category` (Campus, Camp Life, or Food), and `title`.

### Preparing photos

- **Use the WebP format** where you can, and make photos **about 1600 pixels on the long edge**. Most photos on the site follow that pattern.
- **Lodging photos also need a 320-pixel thumbnail** saved next to the photo with `-thumb` added to the name, such as `hebron-dining-thumb.webp`.
- **There's no script for the gallery and lodging sizes**, so make them with any image editor.
- **[scripts/generate-seo-images.py](scripts/generate-seo-images.py) makes a few special images:**
  - link-preview images in `public/social/`
  - square phone-sized hero backgrounds (`-mobile.webp`, saved next to the photo)
  - the favicons
  - a few resized images

  Run it only after changing one of the source images listed at the top of the script. See [Image and SEO scripts](#image-and-seo-scripts).
- **Keep the full-size original** in `image-sources/`. See [Where images go](#where-images-go).
- **Always write meaningful `alt` text.**

### Previewing a change before it goes live

1. Follow [Run it on your computer](#run-it-on-your-computer).
2. Open `http://localhost:5173`. Most changes appear in the browser as soon as you save a file.
3. Before publishing, run `npm run build`. If the build stops with an error, read the error message. It names the problem, such as a missing page title or a lint error.

---

## For developers

### Tech stack

| Part | Choice |
| --- | --- |
| UI | [React 19](https://react.dev) with the React Compiler (configured in [vite.config.js](vite.config.js)) |
| Routing | [React Router 7](https://reactrouter.com) (`BrowserRouter`) |
| Build tool | [Vite 8](https://vite.dev) |
| Icons | `react-icons` |
| PDF stories | `pdfjs-dist` ([PdfPages.jsx](src/components/PdfPages.jsx)) |
| Analytics | `@vercel/analytics` (page views) |
| Linting | ESLint 10 ([eslint.config.js](eslint.config.js)) |
| Hosting | Vercel ([vercel.json](vercel.json)) |

The project uses plain JavaScript and JSX. It has no TypeScript, CSS framework, or server code.

### Project structure

```text
├── index.html               Vite entry HTML (fonts, favicon)
├── vercel.json              Build command, redirects, and security headers
├── public/                  Static files served as-is: images, PDFs, fonts, robots.txt
│   ├── images/              Every image the site shows, by content (see "Where images go")
│   ├── social/              Link-preview images (generated)
│   ├── Blog/                Story PDFs
│   └── documents/           Downloadable PDFs (staff application)
├── image-sources/           Full-size originals and unused alternates (not published)
├── scripts/
│   ├── build-seo-pages.mjs  Writes one HTML file per page plus sitemap.xml and 404.html
│   ├── check-seo-build.mjs  Checks the built HTML for correct titles, tags, and links
│   └── generate-seo-images.py
└── src/
    ├── App.jsx              Routes, skip link, shared footer
    ├── pages/               One component per page
    ├── components/          Header, footer, and page sections
    ├── data/                Stories, donation link, directory, lodging FAQ
    ├── seo/                 Page list, titles and descriptions, structured data
    └── styles/              One stylesheet per page or area
```

### Run it on your computer

**Prerequisites:** [Node.js](https://nodejs.org) **20.19 or later, or 22.13 or later**, which Vite 8 and ESLint 10 require. npm comes with Node.

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the local site at http://localhost:5173
```

The development server updates the page as you edit files. It serves the app shell for every address, so it doesn't use the per-page HTML files that the build generates.

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local development server |
| `npm run build` | Runs the full production build: the image path check, `vite build`, then `scripts/build-seo-pages.mjs`, then the SEO check, then ESLint. Any failure stops the build. |
| `npm run check:images` | Checks that every image path in the code matches a file in `public/` exactly. See [Where images go](#where-images-go). |
| `npm run check:seo` | Rechecks an existing `dist/` folder. Run `npm run build` first. |
| `npm run lint` | Runs ESLint on the whole project |
| `npm run preview` | Serves the built `dist/` folder locally |

**Tests:** The project has no unit or browser test suite. `npm run build` is the full check. It covers the image path check, the SEO check of every generated page (title, description, canonical URL, link-preview tags, structured data, and sitemap) and lint.

### Environment variables

**None.** The code doesn't read any environment variables, and the project has no `.env` file. The donation link, form endpoint, and site address are set in source files:

- `DONATION_URL` in [donation.js](src/data/donation.js)
- the FormSubmit address in [Contact.jsx](src/pages/Contact.jsx) and [Home.jsx](src/pages/Home.jsx)
- `SITE_URL` in [pages.js](src/seo/pages.js)

### Forms

The contact form and newsletter sign-up post JSON directly from the browser to FormSubmit's AJAX endpoint. FormSubmit then emails the details to the site's contact address. Both forms:

- include a hidden "honeypot" field to catch spam
- give up after 45 seconds
- count a submission as successful only if FormSubmit explicitly reports success

The contact form also:

- shows a review step before sending
- tags each inquiry with an ID so repeated attempts can be matched up

When testing locally, **don't submit either form**, because that sends a real email. Test up to the review step, or block the request in your browser's developer tools.

### Routing and adding a page

[src/seo/pages.js](src/seo/pages.js) is the single list of public pages. Both the app and the build read it.

To add a page:

1. Add an entry to `pages` in [pages.js](src/seo/pages.js) with its path, title, and approved description.
2. Create the page component in `src/pages/`. Map the path to it in `pageComponents` in [App.jsx](src/App.jsx). The app refuses to start if a page in the list has no component.
3. Add a link in the main menu or footer if visitors need one.

Stories don't need these steps. Each one gets its route (`/new/:slug`) automatically from [stories.js](src/data/stories.js).

### SEO, metadata, and structured data

- **Per-page HTML:** Vite outputs a single `index.html`. [build-seo-pages.mjs](scripts/build-seo-pages.mjs) then writes a separate HTML file for each page and story, such as `dist/lodging.html` and `dist/new/<slug>.html`. Each file has that page's title, description, canonical URL, Open Graph and Twitter tags, structured data, and preloads for its hero image. That way, search engines and link previews see the right details without running JavaScript. Vercel's `cleanUrls` serves `dist/lodging.html` at `/lodging`.
- **No duplicate tags:** In the browser, [main.jsx](src/main.jsx) removes those build-time tags, and [SEO.jsx](src/components/SEO.jsx) renders live copies, so each tag appears only once.
- **Structured data:** [head.js](src/seo/head.js) builds Organization and WebSite data, with the address and coordinates, for the homepage. It builds BlogPosting data for stories.
- **Sitemap and robots:** `sitemap.xml` is generated at build time and leaves out draft stories. [public/robots.txt](public/robots.txt) points to it.
- **404 handling:** Unknown addresses get `dist/404.html`, which Vercel serves with a real 404 status. Old addresses such as `/give`, `/rooms`, and `/staff` redirect permanently, as set in [vercel.json](vercel.json).

### Accessibility and performance

- **Accessibility:**
  - There's a **Skip to main content** link, and each page has a single `<main>` landmark ([App.jsx](src/App.jsx)).
  - The mobile menu supports `aria-expanded`, closes with Escape, and returns focus to the menu button.
  - The contact review and the story reader use the native `<dialog>` element.
  - Scroll-reveal animations are turned off for visitors who set "reduce motion" ([RevealOnScroll.jsx](src/components/RevealOnScroll.jsx)).
  - The [Accessibility Statement](src/pages/Accessibility.jsx) is published at `/accessibility`.
- **Images:**
  - Images use WebP and are lazy-loaded below the fold.
  - Hero images are preloaded. A square crop is used on screens up to 480 pixels wide (`MOBILE_HERO_QUERY` in [pages.js](src/seo/pages.js)).
  - In the gallery grid, `srcset` and `sizes` choose between the 640-pixel and 1024-pixel versions. The full-size photo loads only in the viewer.
- **Fonts:** The display font is preloaded as WOFF2 ([index.html](index.html)).
- **Caching:** Vercel caches built `/assets/*` files for a year, because their names change with each build.

### Deployment

The site is hosted on **Vercel**. [vercel.json](vercel.json) sets:

- the build command (`npm run build`) and output folder (`dist`)
- clean URLs with no trailing slash
- security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `frame-ancestors` CSP, and `Permissions-Policy`)
- long-term caching for built assets
- the redirects

**Domain:** The production address is `https://toahnipi.org`. That address is set in `SITE_URL` and `robots.txt`. `vercel.json` permanently redirects requests to the default `toah-nipi.vercel.app` address to `toahnipi.org`.

**How a change goes live:** Vercel runs `npm run build` and publishes `dist/`. Because the SEO check and lint are part of the build, a failing check stops the deployment. The live site isn't touched. This repository doesn't record which branch or trigger the Vercel project deploys from, or how DNS is configured. Check the Vercel project settings for that information. No DNS or email-record guidance has been documented here.

> Running the site locally never changes the live site. Only a Vercel deployment does.

### Image and SEO scripts

[scripts/generate-seo-images.py](scripts/generate-seo-images.py) needs Python 3 and Pillow. To regenerate the WOFF2 font, it also needs `fontTools` and `brotli`. Run it from the repository root:

```bash
python scripts/generate-seo-images.py
```

It rebuilds:

- link-preview images in `public/social/`
- mobile hero crops (`-mobile.webp`, next to each hero photo)
- a few resized images
- `favicon.ico` and `apple-touch-icon.png`
- the WOFF2 font

It reads originals from `image-sources/` and web copies from `public/images/`. The outputs are committed. Run the script again only when one of the source images in its lists changes, or when you add a new preview image.

### Troubleshooting

| Problem | Likely cause and fix |
| --- | --- |
| `npm install` or `npm run dev` fails with an engine or syntax error | Node is too old. Install Node 20.19 or later, or 22.13 or later. |
| Blank page, and the browser console shows `Add a component for "/…" in App.jsx` | A page was added to [pages.js](src/seo/pages.js) without a matching entry in `pageComponents` in [App.jsx](src/App.jsx). |
| Build fails at `SEO check failed` | The message lists each problem, such as a missing description or a bad image path. Fix the entry in [pages.js](src/seo/pages.js) or [stories.js](src/data/stories.js). |
| Build fails at `eslint .` | Run `npm run lint` and fix the reported lines. |
| Vercel build fails with `eslint: not found` | The Vercel project may set `NODE_ENV=production`, which skips devDependencies. Remove that variable or make sure devDependencies are installed. |
| A photo is missing in the grid but shows in the viewer, or the reverse | One of the sizes (`name.webp`, `name-md.webp`, `name-thumb.webp`) is missing or misnamed. `npm run check:images` lists it. See [Adding a gallery photo](#adding-a-gallery-photo). |
| A Community Directory logo shows a generic icon | Some entries use Google's site-icon service as a temporary logo. Add a local file to `public/images/partners/` and point the entry at it. |
| Build fails at `Image check failed` | The message names each path that doesn't match a file. Fix the path or the file name. Capital letters count. See [Where images go](#where-images-go). |

### Updating these screenshots

The screenshots in [docs/screenshots/](docs/screenshots/) were captured from the local development server:

- **Desktop:** 1440 × 900 pixels
- **Phone:** 390 × 844 pixels at 2× pixel density
- **Motion:** reduced motion turned on, so scroll animations are already finished

They're saved as JPEG at quality 78. If the design changes noticeably, take new screenshots with the same settings and keep the file names, so the links in this README keep working. **Use fictional details in forms, and never actually submit them.**
