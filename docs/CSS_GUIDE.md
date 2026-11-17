# CSS guide

The site uses plain CSS files, with no framework or CSS modules. Every class is global. Vite bundles all the CSS into one stylesheet, so a rule in any file can affect any page. The conventions below keep that safe.

## Where styles live

```text
src/styles/
├── index.css            The only stylesheet JavaScript imports (in src/main.jsx). Sets the order.
├── foundations/
│   ├── tokens.css       @font-face and the :root custom properties (colors, layout, radii, shadows, fonts)
│   └── base.css         Reset, element defaults, focus ring, skip link, .sr-only, global reduced motion
├── shared/
│   ├── components.css   Patterns used on more than one page: .eyebrow, .primary-button,
│   │                    .secondary-button, .text-link, .bold-text, .highlight-text, .social-link
│   └── animations.css   Scroll-reveal states (.reveal-up, .reveal-image, .reveal-group)
├── components/          One file per component that appears on more than one page, or is large
│   ├── navbar.css       components/NavBar.jsx
│   ├── footer.css       components/SiteFooter.jsx
│   ├── core-values.css  components/CoreValues.jsx
│   └── event-carousel.css  components/EventCarousel.jsx and its .events-preview-section (Home, Events)
└── pages/               One file per page: home, lodging, events, support, our-story,
                         contact, gallery, news (the /new pages), policy (Privacy, Accessibility)
```

Use this to decide where a rule goes:

| The rule styles… | Put it in |
| --- | --- |
| A value used across the site, such as a brand color | `foundations/tokens.css` |
| A bare element such as `a`, `img`, or `button`, everywhere | `foundations/base.css` (rarely needed) |
| A class used on two or more pages | `shared/components.css`, or a file in `components/` if it belongs to one component |
| Something on one page only | That page's file in `pages/` |

Don't import CSS from components or pages. Add new files to `src/styles/index.css` instead, so the load order stays visible in one place.

## Load order

`index.css` imports the layers in this order: tokens, base, shared components, site-wide components, pages, then animations. When two rules have the same specificity, the later one wins. So:

- A page file can refine a shared pattern by scoping it, for example `.events-page .carousel-btn` in `pages/events.css`.
- `shared/animations.css` loads last, so the reveal states win over page styles that set `opacity` or `transform`.

The pages don't depend on each other's order. If moving a rule between page files changes how something looks, the rule is probably missing its page scope.

## Tokens

The shared tokens are in [`foundations/tokens.css`](../src/styles/foundations/tokens.css). Use them instead of retyping the value:

| Token | Use |
| --- | --- |
| `--tn-green`, `--tn-green-dark`, `--tn-green-soft` | Brand greens for dark sections and buttons |
| `--tn-paper`, `--tn-paper-soft`, `--tn-cream` | Light backgrounds, and text on dark sections |
| `--tn-text`, `--tn-text-deep`, `--tn-text-soft` | Body and heading text on light backgrounds |
| `--tn-light-muted`, `--tn-gold-muted` | Secondary text on dark sections, and accents |
| `--tn-section-x` | Standard horizontal section padding, `clamp(24px, 7vw, 96px)` |
| `--tn-radius-sm` … `--tn-radius-xl`, `--tn-radius-pill` | Corner radii |
| `--tn-shadow-soft`, `--tn-shadow-card`, `--tn-shadow-dark` | Shadows |
| `--font-cooper` (also `--tn-font-display`), `--tn-font-body` | The display and body fonts |

A component can keep its own tokens on its root selector, as `.core-values-section` does with `--cv-*`. Add a site-wide token only when a value means the same thing in several places. Many similar greens and creams (for example `#303614`, `#3c3d1f`) are still written as literals. They differ slightly from the tokens on purpose or by history, so swapping them would change colors.

## Naming and scoping

- **Prefix classes with their page or component**, for example `lodging-`, `partner-` (Support), `contact-`, `story-timeline-`, `core-value-`, `news-`, or `site-footer-`. Older prefixes reflect earlier page names. `partner-` is the Support page, and `donors-final-*` is the Support page's closing banner.
- **Start every page or component selector with a class** (or an id), never with a bare element. Write `.newsletter-copy h2`, not `h2` or `section h2`.
- **State classes** are `is-open`, `is-active`, `is-visible`, `is-turning`, and the BEM-style `--open` modifiers in the navigation. Always combine them with the component class, for example `.feature-card.is-open`, so they don't leak.
- **Some class names are built in JavaScript**, for example `` `${classes.button}-left` `` in EventCarousel.jsx and `relationship-filter-dot--${category.id}` in Support.jsx. A text search for `carousel-btn-left` doesn't find its use. Check for template strings before deleting a selector that looks unused.
- **Avoid `!important`.** It's used only for the global focus ring and the reduced-motion rule in `base.css`. To beat a more specific rule, match its specificity and place your rule after it. For example, `.team-member-content p.team-member-location` follows `.team-member-content p:not(.team-member-role)`.

## Responsive rules

- Breakpoints are written mostly as `max-width` queries. The navigation also uses `min-width: 1181px` for desktop-only rules, and a few short-screen fixes use `max-height: 560px`.
- The most common breakpoints are 1180px (navigation collapse, matched in `NavBar.jsx`), 1050px, 900px, 768px or 760px (tablet), 720px, 600px, 480px (mobile hero crops, matched by `MOBILE_HERO_QUERY` in `src/seo/pages.js`), and 430px (narrow phones). Some sections use one-off widths tuned to their own content. Reuse one of the common values for new work.
- Put a component's media queries right after its base rules, inside the same section of the file. Within a file, order queries from widest to narrowest, because the narrower rule must come later to win.
- `@media (max-width: 720px), (pointer: coarse)` is used for larger touch targets.
- `@media (prefers-reduced-motion: reduce)` in `base.css` shortens every animation and transition. Add a local reduced-motion block only when a component needs something more specific, such as showing a final state.

## Adding styles without duplicates

1. Search `src/styles` for the class first. If a rule already exists, edit it rather than adding a second block for the same selector later in the file. Most of the duplicate blocks removed in the 2026 cleanup started as "override" sections appended at the bottom.
2. Before creating a button, eyebrow, or link style, check `shared/components.css`.
3. Use a token when the value matches one.
4. Delete rules when you delete the markup that used them. Check JSX, data files, and dynamically built class names.
5. After a change, check the page at desktop (about 1440px), tablet (about 820px), and phone (about 375px) widths, and check that the page doesn't scroll sideways.
